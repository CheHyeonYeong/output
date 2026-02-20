import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.database import (
    submit_output, get_weekly_submissions,
    add_strike, deactivate_member
)
import os


class Submissions(commands.Cog):
    """산출물 제출 관리"""

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

    @app_commands.command(name="submit", description="이번 주 산출물을 제출합니다")
    @app_commands.describe(
        output_type="산출물 유형",
        description="산출물에 대한 간단한 설명 (인사이트, 의사결정 포함)"
    )
    @app_commands.choices(output_type=[
        app_commands.Choice(name="알고리즘/코테 (7문제)", value="algorithm"),
        app_commands.Choice(name="사이드 프로젝트 (PR 5개)", value="project"),
        app_commands.Choice(name="블로깅 (1,500자 이상)", value="blog"),
        app_commands.Choice(name="이력서/포폴 업데이트", value="resume"),
    ])
    async def submit(
        self,
        interaction: discord.Interaction,
        output_type: app_commands.Choice[str],
        description: str
    ):
        # 역할 기반 멤버 확인
        if not self.is_study_member(interaction.user):
            await interaction.response.send_message(
                "스터디 멤버가 아닙니다. 역할을 받으면 자동으로 멤버가 됩니다!",
                ephemeral=True
            )
            return

        message_link = f"https://discord.com/channels/{interaction.guild_id}/{interaction.channel_id}"

        success = await submit_output(
            user_id=interaction.user.id,
            submission_type=output_type.value,
            description=description,
            message_link=message_link
        )

        if success:
            embed = discord.Embed(
                title="산출물 제출 완료",
                color=discord.Color.green()
            )
            embed.add_field(name="제출자", value=interaction.user.display_name, inline=True)
            embed.add_field(name="유형", value=output_type.name, inline=True)
            embed.add_field(name="설명", value=description, inline=False)
            embed.set_footer(text="모든 산출물은 설명 가능해야 합니다!")

            await interaction.response.send_message(embed=embed)
        else:
            await interaction.response.send_message(
                "이번 주에 이미 제출했습니다. 주 1회만 제출 가능합니다.",
                ephemeral=True
            )

    @app_commands.command(name="status", description="이번 주 제출 현황을 확인합니다")
    async def submission_status(self, interaction: discord.Interaction):
        submissions = await get_weekly_submissions()

        # 역할 기반으로 전체 멤버 목록 가져오기
        all_members = []
        if interaction.guild:
            for member in interaction.guild.members:
                if not member.bot and self.is_study_member(member):
                    all_members.append(member)

        # 제출자 ID 목록
        submitted_ids = {s['user_id'] for s in submissions}

        # 미제출자 계산
        missing_members = [m for m in all_members if m.id not in submitted_ids]

        embed = discord.Embed(
            title="📊 이번 주 제출 현황",
            color=discord.Color.blue()
        )

        if submissions:
            submitted_list = []
            for s in submissions:
                submitted_list.append(f"✅ **{s['username']}** - {s['submission_type']}")
            embed.add_field(
                name=f"제출 완료 ({len(submissions)}명)",
                value="\n".join(submitted_list[:15]) or "없음",  # 최대 15명까지만 표시
                inline=False
            )
        else:
            embed.add_field(name="제출 완료", value="아직 제출한 멤버가 없습니다.", inline=False)

        if missing_members:
            missing_list = [f"❌ {m.display_name}" for m in missing_members[:15]]
            embed.add_field(
                name=f"미제출 ({len(missing_members)}명)",
                value="\n".join(missing_list),
                inline=False
            )
        else:
            embed.add_field(name="미제출", value="🎉 모든 멤버가 제출 완료!", inline=False)

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="check-missing", description="[관리자] 미제출자에게 스트라이크를 부여합니다")
    @app_commands.default_permissions(administrator=True)
    async def check_missing(self, interaction: discord.Interaction):
        missing = await get_missing_submissions()

        if not missing:
            await interaction.response.send_message(
                "모든 멤버가 제출 완료했습니다!", ephemeral=True
            )
            return

        results = []
        for m in missing:
            strike_count = await add_strike(
                user_id=m["user_id"],
                reason="주간 산출물 미제출",
                issued_by=interaction.user.id
            )

            if strike_count >= 3:
                await deactivate_member(m["user_id"])
                results.append(f"**{m['username']}**: 3아웃 - 스터디 제외")
            else:
                results.append(f"**{m['username']}**: {strike_count}/3 스트라이크")

        embed = discord.Embed(
            title="미제출 스트라이크 부여 완료",
            description="\n".join(results),
            color=discord.Color.red()
        )

        await interaction.response.send_message(embed=embed)


async def setup(bot: commands.Bot):
    await bot.add_cog(Submissions(bot))
