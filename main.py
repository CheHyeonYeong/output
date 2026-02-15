import discord
from discord.ext import commands
import os
import asyncio
from dotenv import load_dotenv
from bot.utils.database import init_db

load_dotenv()

intents = discord.Intents.default()
intents.message_content = True
intents.members = True

bot = commands.Bot(
    command_prefix="!",
    intents=intents,
    help_command=None
)

COGS = [
    "bot.cogs.members",
    "bot.cogs.submissions",
    "bot.cogs.attendance",
    "bot.cogs.strikes",
    "bot.cogs.feedback",
    "bot.cogs.reports",
    "bot.cogs.scheduler",
]


@bot.event
async def on_ready():
    print(f"=== {bot.user.name} 봇 시작 ===")
    print(f"ID: {bot.user.id}")
    print(f"서버 수: {len(bot.guilds)}")

    await init_db()
    print("데이터베이스 초기화 완료")

    try:
        guild_id = os.getenv("GUILD_ID")
        if guild_id:
            guild = discord.Object(id=int(guild_id))
            synced = await bot.tree.sync(guild=guild)
            print(f"길드에 {len(synced)}개의 명령어 동기화 완료")
        else:
            synced = await bot.tree.sync()
            print(f"전역에 {len(synced)}개의 명령어 동기화 완료")
    except Exception as e:
        print(f"명령어 동기화 실패: {e}")

    await bot.change_presence(
        activity=discord.Activity(
            type=discord.ActivityType.watching,
            name="Output Study | /help"
        )
    )


@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.CommandNotFound):
        return
    print(f"Error: {error}")


@bot.tree.command(name="help", description="봇 사용법을 확인합니다")
async def help_command(interaction: discord.Interaction):
    embed = discord.Embed(
        title="Output Study 봇 도움말",
        description="취준 스터디 운영을 위한 봇입니다.",
        color=discord.Color.blue()
    )

    embed.add_field(
        name="멤버 관리",
        value="""
`/join` - 스터디 가입
`/leave` - 스터디 탈퇴
`/me` - 내 정보 확인
`/members` - 멤버 목록
        """,
        inline=False
    )

    embed.add_field(
        name="산출물 제출",
        value="""
`/submit` - 주간 산출물 제출
`/status` - 제출 현황 확인
        """,
        inline=False
    )

    embed.add_field(
        name="출석",
        value="""
`/attend` - 세션 출석체크
`/attendance` - 내 출석 통계
        """,
        inline=False
    )

    embed.add_field(
        name="피드백 & 통계",
        value="""
`/feedback` - 익명 피드백 전달
`/report` - 주간 리포트
`/ranking` - 활동 랭킹
`/stats` - 전체 통계
        """,
        inline=False
    )

    embed.add_field(
        name="스트라이크",
        value="""
`/strikes` - 스트라이크 확인
        """,
        inline=False
    )

    embed.set_footer(text="삼진 아웃 제도: 규칙 미준수 3회시 스터디 제외")

    await interaction.response.send_message(embed=embed)


@bot.tree.command(name="rules", description="스터디 규칙을 확인합니다")
async def rules_command(interaction: discord.Interaction):
    embed = discord.Embed(
        title="Output Study 규칙",
        color=discord.Color.gold()
    )

    embed.add_field(
        name="진행 방식",
        value="""
• **주중 1회**: 모각작 (각자 할 일 정해서 진행)
• **주말 1회**: 오전 8시 리뷰/점검
• 회당 최대 2시간
        """,
        inline=False
    )

    embed.add_field(
        name="주 1회 필수 산출물 (택 1 이상)",
        value="""
• 코딩테스트 7문제 풀이
• 과제 PR 7개
• 이력서/포트폴리오 수정본
• 스터디 내용 정리
→ 모든 내용은 **설명 가능**해야 함
        """,
        inline=False
    )

    embed.add_field(
        name="산출물 권장사항",
        value="""
• 인사이트가 드러나면 좋음
• 의사결정 트레이드오프가 드러나면 좋음
• 형식은 자유
        """,
        inline=False
    )

    embed.add_field(
        name="삼진 아웃 제도",
        value="규칙 중 하나라도 미준수 시 **즉시 스트라이크**\n3 스트라이크 = 스터디 제외",
        inline=False
    )

    await interaction.response.send_message(embed=embed)


async def load_cogs():
    for cog in COGS:
        try:
            await bot.load_extension(cog)
            print(f"로드 완료: {cog}")
        except Exception as e:
            print(f"로드 실패 ({cog}): {e}")


async def main():
    async with bot:
        await load_cogs()
        token = os.getenv("DISCORD_TOKEN")
        if not token:
            print("Error: DISCORD_TOKEN이 설정되지 않았습니다.")
            print(".env 파일에 DISCORD_TOKEN을 설정해주세요.")
            return
        await bot.start(token)


if __name__ == "__main__":
    asyncio.run(main())
