import discord
from discord import app_commands
from discord.ext import commands

from bot.utils.database import (
    get_all_active_members,
    get_member_stats,
    get_weekly_report,
    get_weekly_submissions,
)


class Reports(commands.Cog):
    """통계와 리포트."""

    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @app_commands.command(name="report", description="이번 주 스터디 리포트를 확인합니다")
    async def weekly_report(self, interaction: discord.Interaction):
        report = await get_weekly_report()

        embed = discord.Embed(
            title=f"주간 리포트 (Week {report['week_number']}, {report['year']})",
            color=discord.Color.gold(),
        )
        embed.add_field(
            name="제출률",
            value=f"{report['submitted_count']}/{report['total_members']}명 ({report['submission_rate']:.1f}%)",
            inline=True,
        )

        if report["submissions_by_type"]:
            embed.add_field(
                name="유형별 제출",
                value="\n".join(
                    f"- {name}: {count}건"
                    for name, count in report["submissions_by_type"].items()
                ),
                inline=True,
            )

        if report["attendance_by_type"]:
            embed.add_field(
                name="출석 현황",
                value="\n".join(
                    f"- {name}: {count}명"
                    for name, count in report["attendance_by_type"].items()
                ),
                inline=True,
            )

        submissions = await get_weekly_submissions()
        if submissions:
            embed.add_field(
                name="이번 주 제출 내역",
                value="\n".join(
                    f"• **{submission['username']}** - {submission['submission_type']}"
                    for submission in submissions[:10]
                ),
                inline=False,
            )

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="stats", description="스터디 전체 통계를 확인합니다")
    async def overall_stats(self, interaction: discord.Interaction):
        members = await get_all_active_members()
        report = await get_weekly_report()

        total_submissions = 0
        total_attendance = 0
        total_strikes = 0
        submission_type_totals = {}

        for member in members:
            stats = await get_member_stats(member["user_id"])
            total_submissions += stats["total_submissions"]
            total_attendance += stats["total_attendance"]
            total_strikes += stats["strikes"]
            for submission_type, count in stats["submission_types"].items():
                submission_type_totals[submission_type] = (
                    submission_type_totals.get(submission_type, 0) + count
                )

        embed = discord.Embed(title="스터디 전체 통계", color=discord.Color.blue())
        embed.add_field(name="활성 멤버", value=f"{len(members)}명", inline=True)
        embed.add_field(name="총 제출 수", value=f"{total_submissions}건", inline=True)
        embed.add_field(name="총 출석 수", value=f"{total_attendance}회", inline=True)
        embed.add_field(name="현재 스트라이크", value=f"{total_strikes}개", inline=True)
        embed.add_field(
            name="이번 주 제출률",
            value=f"{report['submission_rate']:.1f}%",
            inline=True,
        )

        if submission_type_totals:
            embed.add_field(
                name="유형별 총 제출",
                value="\n".join(
                    f"- {name}: {count}건"
                    for name, count in sorted(
                        submission_type_totals.items(),
                        key=lambda item: -item[1],
                    )
                ),
                inline=False,
            )

        await interaction.response.send_message(embed=embed)


async def setup(bot: commands.Bot):
    await bot.add_cog(Reports(bot))
