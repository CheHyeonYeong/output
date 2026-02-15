import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.database import (
    get_weekly_report, get_member_stats, get_all_active_members,
    get_weekly_submissions
)


class Reports(commands.Cog):
    """통계 및 리포트"""

    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @app_commands.command(name="report", description="이번 주 스터디 리포트를 확인합니다")
    async def weekly_report(self, interaction: discord.Interaction):
        report = await get_weekly_report()

        embed = discord.Embed(
            title=f"주간 리포트 (Week {report['week_number']}, {report['year']})",
            color=discord.Color.gold()
        )

        embed.add_field(
            name="제출률",
            value=f"{report['submitted_count']}/{report['total_members']}명 ({report['submission_rate']:.1f}%)",
            inline=True
        )

        if report["submissions_by_type"]:
            type_str = "\n".join(f"- {k}: {v}건" for k, v in report["submissions_by_type"].items())
            embed.add_field(name="유형별 제출", value=type_str, inline=True)

        if report["attendance_by_type"]:
            att_str = "\n".join(f"- {k}: {v}명" for k, v in report["attendance_by_type"].items())
            embed.add_field(name="출석 현황", value=att_str, inline=True)

        submissions = await get_weekly_submissions()
        if submissions:
            sub_list = []
            for s in submissions[:10]:
                sub_list.append(f"• **{s['username']}** - {s['submission_type']}")
            embed.add_field(
                name="이번 주 제출 내역",
                value="\n".join(sub_list),
                inline=False
            )

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="ranking", description="멤버별 활동 랭킹을 확인합니다")
    @app_commands.describe(criteria="랭킹 기준")
    @app_commands.choices(criteria=[
        app_commands.Choice(name="제출 수", value="submissions"),
        app_commands.Choice(name="출석 수", value="attendance"),
    ])
    async def ranking(
        self,
        interaction: discord.Interaction,
        criteria: app_commands.Choice[str]
    ):
        members = await get_all_active_members()

        if not members:
            await interaction.response.send_message("등록된 멤버가 없습니다.", ephemeral=True)
            return

        member_stats = []
        for m in members:
            stats = await get_member_stats(m["user_id"])
            member_stats.append({
                "username": m["username"],
                "total_submissions": stats["total_submissions"],
                "total_attendance": stats["total_attendance"],
                "strikes": stats["strikes"]
            })

        if criteria.value == "submissions":
            member_stats.sort(key=lambda x: x["total_submissions"], reverse=True)
            value_key = "total_submissions"
            value_label = "제출"
        else:
            member_stats.sort(key=lambda x: x["total_attendance"], reverse=True)
            value_key = "total_attendance"
            value_label = "출석"

        embed = discord.Embed(
            title=f"스터디 랭킹 ({criteria.name})",
            color=discord.Color.gold()
        )

        medals = ["🥇", "🥈", "🥉"]
        ranking_text = []

        for i, m in enumerate(member_stats[:10]):
            medal = medals[i] if i < 3 else f"{i+1}."
            strikes = "⚠️" * m["strikes"]
            ranking_text.append(
                f"{medal} **{m['username']}** - {m[value_key]}회 {value_label} {strikes}"
            )

        embed.description = "\n".join(ranking_text) if ranking_text else "데이터가 없습니다."

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="stats", description="스터디 전체 통계를 확인합니다")
    async def overall_stats(self, interaction: discord.Interaction):
        members = await get_all_active_members()
        report = await get_weekly_report()

        total_submissions = 0
        total_attendance = 0
        total_strikes = 0

        for m in members:
            stats = await get_member_stats(m["user_id"])
            total_submissions += stats["total_submissions"]
            total_attendance += stats["total_attendance"]
            total_strikes += stats["strikes"]

        embed = discord.Embed(
            title="스터디 전체 통계",
            color=discord.Color.blue()
        )

        embed.add_field(name="활성 멤버", value=f"{len(members)}명", inline=True)
        embed.add_field(name="총 제출 수", value=f"{total_submissions}건", inline=True)
        embed.add_field(name="총 출석 수", value=f"{total_attendance}회", inline=True)
        embed.add_field(name="현재 스트라이크", value=f"{total_strikes}개", inline=True)
        embed.add_field(
            name="이번 주 제출률",
            value=f"{report['submission_rate']:.1f}%",
            inline=True
        )

        type_totals = {}
        for m in members:
            stats = await get_member_stats(m["user_id"])
            for t, count in stats["submission_types"].items():
                type_totals[t] = type_totals.get(t, 0) + count

        if type_totals:
            type_str = "\n".join(f"- {k}: {v}건" for k, v in sorted(type_totals.items(), key=lambda x: -x[1]))
            embed.add_field(name="유형별 총 제출", value=type_str, inline=False)

        await interaction.response.send_message(embed=embed)


async def setup(bot: commands.Bot):
    await bot.add_cog(Reports(bot))
