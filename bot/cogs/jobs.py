import discord
from discord import app_commands
from discord.ext import commands, tasks
from bot.utils.job_crawler import (
    fetch_all_jobs, fetch_rallit_jobs, fetch_incruit_jobs,
    fetch_zighang_jobs, fetch_jumpit_jobs,
    get_job_categories, is_selenium_available
)
import os
from datetime import datetime


# 카테고리 선택지
CATEGORY_CHOICES = [
    app_commands.Choice(name="백엔드", value="backend"),
    app_commands.Choice(name="프론트엔드", value="frontend"),
    app_commands.Choice(name="풀스택", value="fullstack"),
    app_commands.Choice(name="데이터", value="data"),
    app_commands.Choice(name="DevOps", value="devops"),
    app_commands.Choice(name="AI/ML", value="ai"),
]

# 소스 선택지
SOURCE_CHOICES = [
    app_commands.Choice(name="전체", value="all"),
    app_commands.Choice(name="랠릿", value="rallit"),
    app_commands.Choice(name="인크루트", value="incruit"),
    app_commands.Choice(name="직행", value="zighang"),
    app_commands.Choice(name="점핏", value="jumpit"),
]


class Jobs(commands.Cog):
    """채용공고 크롤링"""

    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.job_channel_id = int(os.getenv("JOB_CHANNEL_ID", 0))
        self.admin_role_id = int(os.getenv("ADMIN_ROLE_ID", 0))

    def is_admin(self, member: discord.Member) -> bool:
        return any(role.id == self.admin_role_id for role in member.roles)

    @app_commands.command(name="jobs", description="채용공고를 검색합니다")
    @app_commands.describe(
        category="직군 (기본: 백엔드)",
        source="사이트 (기본: 전체)",
        count="표시할 개수 (기본: 10)"
    )
    @app_commands.choices(category=CATEGORY_CHOICES, source=SOURCE_CHOICES)
    async def jobs_command(
        self,
        interaction: discord.Interaction,
        category: app_commands.Choice[str] = None,
        source: app_commands.Choice[str] = None,
        count: int = 10
    ):
        await interaction.response.defer()

        cat = category.value if category else "backend"
        cat_name = category.name if category else "백엔드"
        src = source.value if source else "all"
        count = min(max(count, 1), 20)

        # 소스 목록
        sources = None if src == "all" else [src]

        # 채용공고 수집
        try:
            jobs = await fetch_all_jobs(category=cat, sources=sources)
        except Exception as e:
            await interaction.followup.send(f"크롤링 중 오류가 발생했습니다: {e}", ephemeral=True)
            return

        if not jobs:
            selenium_msg = "" if is_selenium_available() else "\n(Selenium 미설치로 직행/점핏 제외)"
            await interaction.followup.send(
                f"**{cat_name}** 채용공고를 찾을 수 없습니다.{selenium_msg}",
                ephemeral=True
            )
            return

        # 결과 표시
        jobs = jobs[:count]

        embed = discord.Embed(
            title=f"💼 {cat_name} 채용공고 ({len(jobs)}건)",
            description=f"소스: {source.name if source else '전체'}",
            color=discord.Color.green(),
            timestamp=datetime.now()
        )

        for job in jobs:
            source_emoji = {
                '랠릿': '🟢',
                '인크루트': '🔵',
                '직행': '🟠',
                '점핏': '🟣'
            }.get(job['source'], '⚪')

            title = f"{source_emoji} [{job['source']}] {job['company']}"
            value_parts = [job['title']]

            if job.get('tech_stack'):
                value_parts.append(f"기술: {', '.join(job['tech_stack'][:3])}")

            if job.get('url'):
                value_parts.append(f"[상세보기]({job['url']})")

            embed.add_field(
                name=title[:256],
                value="\n".join(value_parts)[:1024],
                inline=False
            )

        selenium_status = "✅" if is_selenium_available() else "❌ (직행/점핏 제외)"
        embed.set_footer(text=f"Selenium: {selenium_status}")

        await interaction.followup.send(embed=embed)

    @app_commands.command(name="job-status", description="채용공고 크롤러 상태를 확인합니다")
    async def job_status_command(self, interaction: discord.Interaction):
        embed = discord.Embed(
            title="📊 채용공고 크롤러 상태",
            color=discord.Color.blue()
        )

        # Selenium 상태
        selenium_status = "✅ 사용 가능" if is_selenium_available() else "❌ 미설치"
        embed.add_field(name="Selenium", value=selenium_status, inline=True)

        # 지원 사이트
        sites = []
        sites.append("✅ 랠릿 (rallit.com)")
        sites.append("✅ 인크루트 (incruit.com)")

        if is_selenium_available():
            sites.append("✅ 직행 (zighang.com)")
            sites.append("✅ 점핏 (jumpit.co.kr)")
        else:
            sites.append("❌ 직행 (Selenium 필요)")
            sites.append("❌ 점핏 (Selenium 필요)")

        embed.add_field(name="지원 사이트", value="\n".join(sites), inline=False)

        # 카테고리
        categories = get_job_categories()
        cat_list = ", ".join(categories.values())
        embed.add_field(name="카테고리", value=cat_list, inline=False)

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="job-post", description="[관리자] 채용공고를 채널에 게시합니다")
    @app_commands.describe(
        category="직군",
        count="게시할 개수 (기본: 5)"
    )
    @app_commands.choices(category=CATEGORY_CHOICES)
    async def job_post_command(
        self,
        interaction: discord.Interaction,
        category: app_commands.Choice[str] = None,
        count: int = 5
    ):
        if not self.is_admin(interaction.user):
            await interaction.response.send_message(
                "관리자만 사용할 수 있습니다.",
                ephemeral=True
            )
            return

        await interaction.response.defer()

        cat = category.value if category else "backend"
        cat_name = category.name if category else "백엔드"
        count = min(max(count, 1), 10)

        # 채용공고 수집
        try:
            jobs = await fetch_all_jobs(category=cat)
        except Exception as e:
            await interaction.followup.send(f"크롤링 오류: {e}", ephemeral=True)
            return

        if not jobs:
            await interaction.followup.send("채용공고를 찾을 수 없습니다.", ephemeral=True)
            return

        # 채널에 게시
        channel = self.bot.get_channel(self.job_channel_id)
        if not channel:
            channel = interaction.channel

        jobs = jobs[:count]

        embed = discord.Embed(
            title=f"📢 오늘의 {cat_name} 채용공고",
            description=f"총 {len(jobs)}건의 새로운 공고를 찾았습니다!",
            color=discord.Color.gold(),
            timestamp=datetime.now()
        )

        for job in jobs:
            source_emoji = {
                '랠릿': '🟢',
                '인크루트': '🔵',
                '직행': '🟠',
                '점핏': '🟣'
            }.get(job['source'], '⚪')

            title = f"{source_emoji} {job['company']}"
            value = f"**{job['title']}**"

            if job.get('tech_stack'):
                value += f"\n`{' '.join(job['tech_stack'][:3])}`"

            if job.get('url'):
                value += f"\n[지원하기]({job['url']})"

            embed.add_field(name=title, value=value, inline=False)

        embed.set_footer(text="Output Study | 채용공고")

        await channel.send(embed=embed)
        await interaction.followup.send(f"✅ {len(jobs)}건의 채용공고가 게시되었습니다.", ephemeral=True)


async def setup(bot: commands.Bot):
    await bot.add_cog(Jobs(bot))
