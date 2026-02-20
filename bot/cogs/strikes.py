import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.database import (
    add_strike, get_strikes, get_member_stats, deactivate_member
)
import os


class Strikes(commands.Cog):
    """스트라이크(삼진 아웃) 관리"""

    def __init__(self, bot: commands.Bot):
        self.bot = bot
        # 멤버 역할 ID 목록 (운영진 포함)
        self.member_role_ids = {
            int(os.getenv("ROLE_ALGORITHM_ID", 0)),
            int(os.getenv("ROLE_PROJECT_ID", 0)),
            int(os.getenv("ROLE_RESUME_ID", 0)),
            int(os.getenv("ROLE_ALL_ID", 0)),
            int(os.getenv("ADMIN_ROLE_ID", 0)),
        }

    def is_study_member(self, member: discord.Member) -> bool:
        """역할 기반으로 스터디 멤버인지 확인"""
        return any(role.id in self.member_role_ids for role in member.roles)

    def is_admin(self, member: discord.Member) -> bool:
        """운영진인지 확인"""
        admin_role_id = int(os.getenv("ADMIN_ROLE_ID", 0))
        return any(role.id == admin_role_id for role in member.roles)

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
            title="스트라이크 부여",
            color=discord.Color.orange()
        )
        embed.add_field(name="대상", value=member.display_name, inline=True)
        embed.add_field(
            name="스트라이크",
            value=f"{'⚠️' * strike_count}{'⚪' * (3 - strike_count)} ({strike_count}/3)",
            inline=True
        )
        embed.add_field(name="사유", value=reason, inline=False)

        if strike_count >= 3:
            await deactivate_member(member.id)
            embed.add_field(
                name="삼진 아웃",
                value=f"**{member.display_name}**님이 스터디에서 제외되었습니다.",
                inline=False
            )
            embed.color = discord.Color.red()

        await interaction.response.send_message(embed=embed)

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


async def setup(bot: commands.Bot):
    await bot.add_cog(Strikes(bot))
