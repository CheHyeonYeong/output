import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.quiz_parser import (
    get_random_quiz, get_daily_quiz, get_sections, get_section_names,
    extract_keywords, format_answer_for_discord, get_quiz_count
)
from typing import Optional


class AnswerButton(discord.ui.View):
    """답변 보기 버튼 View"""

    def __init__(self, quiz: dict, timeout: float = 300):
        super().__init__(timeout=timeout)
        self.quiz = quiz
        self.answered = False

    @discord.ui.button(label="답변 보기", style=discord.ButtonStyle.primary, emoji="📖")
    async def show_answer(self, interaction: discord.Interaction, button: discord.ui.Button):
        if self.answered:
            await interaction.response.send_message(
                "이미 답변이 공개되었습니다.", ephemeral=True
            )
            return

        self.answered = True
        button.disabled = True
        button.label = "답변 공개됨"
        button.style = discord.ButtonStyle.secondary

        # 답변 임베드 생성
        answer_embed = self._create_answer_embed()

        await interaction.response.edit_message(view=self)
        await interaction.followup.send(embed=answer_embed)

    def _create_answer_embed(self) -> discord.Embed:
        """답변 임베드 생성"""
        answer = format_answer_for_discord(self.quiz)
        keywords = extract_keywords(self.quiz.get('answer', ''))

        embed = discord.Embed(
            title="참고용 답변",
            description=answer,
            color=discord.Color.green()
        )

        # 핵심 키워드 표시
        if keywords:
            keywords_str = " | ".join(f"`{kw}`" for kw in keywords)
            embed.add_field(name="핵심 키워드", value=keywords_str, inline=False)

        embed.set_footer(text=f"문제 ID: {self.quiz.get('id', 'N/A')}")

        return embed


class Quiz(commands.Cog):
    """CS 면접 퀴즈 기능"""

    def __init__(self, bot: commands.Bot):
        self.bot = bot

    def _create_quiz_embed(self, quiz: dict, mode: str = "random") -> discord.Embed:
        """퀴즈 문제 임베드 생성"""
        section_names = get_section_names()
        section = quiz.get('section', '')
        section_display = section_names.get(section, section)

        # 모드별 제목
        titles = {
            "random": "랜덤 퀴즈",
            "daily": "오늘의 퀴즈",
            "section": f"{section_display} 퀴즈"
        }

        embed = discord.Embed(
            title=f"📝 {titles.get(mode, '퀴즈')}",
            color=discord.Color.blue()
        )

        # 카테고리 정보
        category_name = quiz.get('categoryName', quiz.get('category', ''))
        embed.add_field(
            name="카테고리",
            value=f"{section_display} > {category_name}",
            inline=True
        )
        embed.add_field(
            name="문제 ID",
            value=quiz.get('id', 'N/A'),
            inline=True
        )

        # 질문
        question = quiz.get('question', '질문이 없습니다.')
        # 질문이 너무 길면 잘라내기
        if len(question) > 1000:
            question = question[:1000] + '...'

        embed.add_field(
            name="질문",
            value=question,
            inline=False
        )

        embed.set_footer(text="아래 버튼을 눌러 답변을 확인하세요")

        return embed

    async def section_autocomplete(
        self,
        interaction: discord.Interaction,
        current: str
    ) -> list[app_commands.Choice[str]]:
        """섹션 자동완성"""
        sections = get_sections()
        section_names = get_section_names()

        choices = []
        for section in sections:
            display_name = section_names.get(section, section)
            # 입력값으로 필터링
            if current.lower() in section.lower() or current.lower() in display_name.lower():
                choices.append(
                    app_commands.Choice(name=display_name, value=section)
                )

        return choices[:25]  # Discord 자동완성 제한

    @app_commands.command(name="quiz", description="CS 면접 퀴즈를 풀어봅니다")
    @app_commands.describe(
        category="퀴즈 섹션 선택 (미입력 시 랜덤)",
        daily="오늘의 문제 출제 (매일 같은 문제)"
    )
    @app_commands.autocomplete(category=section_autocomplete)
    async def quiz(
        self,
        interaction: discord.Interaction,
        category: Optional[str] = None,
        daily: Optional[bool] = False
    ):
        """퀴즈 출제"""
        # 퀴즈 가져오기
        if daily:
            quiz = get_daily_quiz(section=category)
            mode = "daily"
        elif category:
            quiz = get_random_quiz(section=category)
            mode = "section"
        else:
            quiz = get_random_quiz()
            mode = "random"

        if not quiz:
            section_names = get_section_names()
            available = ", ".join(
                f"`{section_names.get(s, s)}`" for s in get_sections()
            )
            await interaction.response.send_message(
                f"퀴즈를 찾을 수 없습니다.\n\n**사용 가능한 섹션:**\n{available}",
                ephemeral=True
            )
            return

        # 임베드 및 버튼 생성
        embed = self._create_quiz_embed(quiz, mode)
        view = AnswerButton(quiz)

        await interaction.response.send_message(embed=embed, view=view)

    @app_commands.command(name="quiz-stats", description="퀴즈 통계를 확인합니다")
    async def quiz_stats(self, interaction: discord.Interaction):
        """퀴즈 통계"""
        counts = get_quiz_count()
        section_names = get_section_names()

        embed = discord.Embed(
            title="퀴즈 통계",
            description="섹션별 문제 수",
            color=discord.Color.purple()
        )

        total = 0
        for section, count in sorted(counts.items(), key=lambda x: -x[1]):
            display_name = section_names.get(section, section)
            embed.add_field(
                name=display_name,
                value=f"{count}문제",
                inline=True
            )
            total += count

        embed.set_footer(text=f"총 {total}문제")

        await interaction.response.send_message(embed=embed, ephemeral=True)


async def setup(bot: commands.Bot):
    await bot.add_cog(Quiz(bot))
