import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.database import (
    add_strike, get_strikes, get_member_stats, get_members_with_3_strikes
)
import os


class Strikes(commands.Cog):
    """스트라이크(삼진 아웃) 관리"""

    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.admin_role_id = int(os.getenv("ADMIN_ROLE_ID", 0))
        self.announcement_channel_id = int(os.getenv("ANNOUNCEMENT_CHANNEL_ID", 0))
        # 멤버 역할 ID 목록 (운영진 포함)
        self.member_role_ids = {
            int(os.getenv("ROLE_ALGORITHM_ID", 0)),
            int(os.getenv("ROLE_PROJECT_ID", 0)),
            int(os.getenv("ROLE_RESUME_ID", 0)),
            int(os.getenv("ROLE_ALL_ID", 0)),
            self.admin_role_id,
        }

    def is_study_member(self, member: discord.Member) -> bool:
        """역할 기반으로 스터디 멤버인지 확인"""
        return any(role.id in self.member_role_ids for role in member.roles)

    def is_admin(self, member: discord.Member) -> bool:
        """운영진인지 확인"""
        return any(role.id == self.admin_role_id for role in member.roles)

    async def notify_admins_3strikes(self, member: discord.Member, interaction: discord.Interaction):
        """스트라이크 3회 도달 시 운영진에게 알림"""
        # 공지 채널에 알림
        if self.announcement_channel_id and interaction.guild:
            channel = interaction.guild.get_channel(self.announcement_channel_id)
            if channel:
                admin_role = interaction.guild.get_role(self.admin_role_id)
                admin_mention = admin_role.mention if admin_role else "@운영진"

                embed = discord.Embed(
                    title="🚨 제명 대상자 발생",
                    description=f"**{member.display_name}**님이 스트라이크 3회에 도달했습니다.",
                    color=discord.Color.red()
                )
                embed.add_field(
                    name="조치 필요",
                    value="운영진이 확인 후 제명 처리해주세요.\n`/strike-candidates` 명령어로 전체 대상자를 확인할 수 있습니다.",
                    inline=False
                )
                embed.set_footer(text=f"대상자: {member.name} (ID: {member.id})")

                await channel.send(f"{admin_mention}", embed=embed)

    @app_commands.command(name="strike", description="[관리자] 멤버에게 스트라이크를 부여합니다")
    @app_commands.describe(
        member="스트라이크를 부여할 멤버",
        reason="스트라이크 사유"
    )
    @app_commands.default_permissions(administrator=True)
    async def give_strike(
        self,
        interaction: discord.Interaction,
        member: discord.Member,
        reason: str
    ):
        # 역할 기반 멤버 확인
        if not self.is_study_member(member):
            await interaction.response.send_message(
                "해당 멤버는 스터디 멤버가 아닙니다.",
                ephemeral=True
            )
            return

        # 운영진은 스트라이크 제외
        if self.is_admin(member):
            await interaction.response.send_message(
                "🛡️ 운영진에게는 스트라이크를 부여할 수 없습니다!",
                ephemeral=True
            )
            return

        strike_count = await add_strike(
            user_id=member.id,
            reason=reason,
            issued_by=interaction.user.id
        )

        embed = discord.Embed(
            title="⚠️ 스트라이크 부여",
            color=discord.Color.orange()
        )
        embed.add_field(name="대상", value=member.display_name, inline=True)
        embed.add_field(
            name="스트라이크",
            value=f"{'🔴' * strike_count}{'⚪' * (3 - strike_count)} ({strike_count}/3)",
            inline=True
        )
        embed.add_field(name="사유", value=reason, inline=False)

        if strike_count >= 3:
            embed.add_field(
                name="🚨 삼진 아웃",
                value=f"**{member.display_name}**님이 제명 대상입니다.\n운영진 확인 후 처리가 필요합니다.",
                inline=False
            )
            embed.color = discord.Color.red()

        await interaction.response.send_message(embed=embed)

        # 3회 도달 시 운영진에게 별도 알림
        if strike_count >= 3:
            await self.notify_admins_3strikes(member, interaction)

    @app_commands.command(name="strikes", description="스트라이크 기록을 확인합니다")
    @app_commands.describe(member="확인할 멤버 (미입력시 본인)")
    async def strike_history(
        self,
        interaction: discord.Interaction,
        member: discord.Member = None
    ):
        target = member or interaction.user

        # 역할 기반 멤버 확인
        if not self.is_study_member(target):
            await interaction.response.send_message(
                "해당 멤버는 스터디 멤버가 아닙니다.",
                ephemeral=True
            )
            return

        strikes = await get_strikes(target.id)
        stats = await get_member_stats(target.id)
        current_count = stats.get("strikes", 0)

        embed = discord.Embed(
            title=f"⚠️ {target.display_name}의 스트라이크 기록",
            color=discord.Color.orange() if strikes else discord.Color.green()
        )

        embed.add_field(
            name="현재 상태",
            value=f"{'🔴' * current_count}{'⚪' * (3 - current_count)} ({current_count}/3)",
            inline=False
        )

        if strikes:
            for i, s in enumerate(strikes[:10], 1):
                issued_at = s["issued_at"][:10]
                embed.add_field(
                    name=f"#{i} - {issued_at}",
                    value=s["reason"],
                    inline=False
                )
        else:
            embed.add_field(name="기록", value="🎉 스트라이크 기록이 없습니다!", inline=False)

        await interaction.response.send_message(embed=embed, ephemeral=True)

    @app_commands.command(name="strike-candidates", description="[관리자] 제명 대상자 목록을 확인합니다")
    @app_commands.default_permissions(administrator=True)
    async def strike_candidates(self, interaction: discord.Interaction):
        """스트라이크 3회 이상인 멤버 목록"""
        candidates = await get_members_with_3_strikes()

        embed = discord.Embed(
            title="🚨 제명 대상자 목록",
            description="스트라이크 3회 이상인 멤버입니다.",
            color=discord.Color.red() if candidates else discord.Color.green()
        )

        if candidates:
            for c in candidates:
                user_id = c["user_id"]
                username = c.get("username", "알 수 없음")
                strike_count = c.get("strike_count", 3)

                # Discord 멤버 정보 가져오기
                member = interaction.guild.get_member(user_id) if interaction.guild else None
                mention = member.mention if member else f"**{username}**"

                embed.add_field(
                    name=f"{username}",
                    value=f"{mention}\n스트라이크: {'🔴' * strike_count} ({strike_count}회)\nID: `{user_id}`",
                    inline=True
                )

            embed.set_footer(text="제명 처리: 해당 멤버의 역할을 제거해주세요.")
        else:
            embed.add_field(
                name="✅ 없음",
                value="현재 제명 대상자가 없습니다.",
                inline=False
            )

        await interaction.response.send_message(embed=embed, ephemeral=True)


async def setup(bot: commands.Bot):
    await bot.add_cog(Strikes(bot))
