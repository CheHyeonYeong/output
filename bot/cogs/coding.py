import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.boj_crawler import (
    fetch_all_samsung_problems,
    get_random_problem,
    get_daily_problem,
    get_problem_url,
)


class Coding(commands.Cog):
    """코딩테스트 문제 추천"""

    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @app_commands.command(name="boj", description="백준 코딩테스트 문제를 추천합니다")
    @app_commands.describe(
        count="추천받을 문제 수 (1~5, 기본 1)",
        daily="오늘의 문제 (매일 같은 문제)"
    )
    async def recommend_problem(
        self,
        interaction: discord.Interaction,
        count: int = 1,
        daily: bool = False
    ):
        await interaction.response.defer()

        # 문제 목록 가져오기 (두 문제집 합침)
        problems = await fetch_all_samsung_problems()

        if not problems:
            await interaction.followup.send(
                "문제 목록을 가져오는데 실패했습니다.",
                ephemeral=True
            )
            return

        if daily:
            # 오늘의 문제
            problem = get_daily_problem(problems)
            if not problem:
                await interaction.followup.send("문제를 찾을 수 없습니다.", ephemeral=True)
                return

            embed = discord.Embed(
                title="📅 오늘의 코테 문제",
                description="삼성 SW 역량테스트 기출",
                color=discord.Color.gold()
            )
            embed.add_field(
                name=f"#{problem['number']}",
                value=f"**{problem['title']}**\n{get_problem_url(problem['number'])}",
                inline=False
            )
            embed.set_footer(text="매일 같은 문제가 추천됩니다!")

        else:
            # 랜덤 문제 추천
            count = max(1, min(count, 5))  # 1~5개 제한
            selected = get_random_problem(problems, count)

            embed = discord.Embed(
                title=f"🎯 코테 문제 추천 ({count}문제)",
                description="삼성 SW 역량테스트 기출",
                color=discord.Color.blue()
            )

            for p in selected:
                embed.add_field(
                    name=f"#{p['number']} {p['title']}",
                    value=get_problem_url(p['number']),
                    inline=False
                )

        embed.add_field(
            name="💡 TIP",
            value="문제를 풀고 `/submit`으로 산출물을 제출하세요!",
            inline=False
        )

        await interaction.followup.send(embed=embed)

    @app_commands.command(name="boj-list", description="삼성 SW 역량테스트 기출 문제 목록을 확인합니다")
    async def problem_list(self, interaction: discord.Interaction):
        await interaction.response.defer(ephemeral=True)

        problems = await fetch_all_samsung_problems()

        if not problems:
            await interaction.followup.send(
                "문제 목록을 가져오는데 실패했습니다.",
                ephemeral=True
            )
            return

        # 페이지당 15문제씩
        pages = []
        page_size = 15
        for i in range(0, len(problems), page_size):
            page_problems = problems[i:i + page_size]
            page_text = "\n".join(
                f"`{p['number']}` {p['title']}"
                for p in page_problems
            )
            pages.append(page_text)

        embed = discord.Embed(
            title="📋 삼성 SW 역량테스트 기출 문제",
            description=f"총 {len(problems)}문제\n\n{pages[0]}",
            color=discord.Color.blue()
        )
        embed.set_footer(text=f"페이지 1/{len(pages)}")

        if len(pages) > 1:
            # 페이지네이션 뷰
            view = ProblemListView(pages, embed)
            await interaction.followup.send(embed=embed, view=view, ephemeral=True)
        else:
            await interaction.followup.send(embed=embed, ephemeral=True)

    @app_commands.command(name="boj-stats", description="코테 문제 통계를 확인합니다")
    async def problem_stats(self, interaction: discord.Interaction):
        problems = await fetch_all_samsung_problems()

        embed = discord.Embed(
            title="📊 코테 문제 통계",
            color=discord.Color.green()
        )

        embed.add_field(
            name="삼성 SW 역량테스트",
            value=f"총 {len(problems)}문제 (2개 문제집 통합)",
            inline=True
        )
        embed.add_field(
            name="문제집 링크",
            value="[기출1](https://www.acmicpc.net/workbook/view/4349) | [기출2](https://www.acmicpc.net/workbook/view/4344)",
            inline=True
        )

        # 문제 번호 범위
        if problems:
            numbers = [p["number"] for p in problems]
            embed.add_field(
                name="문제 번호 범위",
                value=f"{min(numbers)} ~ {max(numbers)}",
                inline=True
            )

        await interaction.response.send_message(embed=embed)


class ProblemListView(discord.ui.View):
    """문제 목록 페이지네이션"""

    def __init__(self, pages: list[str], embed: discord.Embed):
        super().__init__(timeout=300)
        self.pages = pages
        self.embed = embed
        self.current_page = 0

    @discord.ui.button(label="◀ 이전", style=discord.ButtonStyle.secondary)
    async def prev_button(self, interaction: discord.Interaction, button: discord.ui.Button):
        if self.current_page > 0:
            self.current_page -= 1
            self.embed.description = f"총 문제\n\n{self.pages[self.current_page]}"
            self.embed.set_footer(text=f"페이지 {self.current_page + 1}/{len(self.pages)}")
            await interaction.response.edit_message(embed=self.embed, view=self)
        else:
            await interaction.response.defer()

    @discord.ui.button(label="다음 ▶", style=discord.ButtonStyle.secondary)
    async def next_button(self, interaction: discord.Interaction, button: discord.ui.Button):
        if self.current_page < len(self.pages) - 1:
            self.current_page += 1
            self.embed.description = f"총 문제\n\n{self.pages[self.current_page]}"
            self.embed.set_footer(text=f"페이지 {self.current_page + 1}/{len(self.pages)}")
            await interaction.response.edit_message(embed=self.embed, view=self)
        else:
            await interaction.response.defer()


async def setup(bot: commands.Bot):
    await bot.add_cog(Coding(bot))
