# 뽀삐 Discord Bot 🐰
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

    # 등록된 명령어 확인
    print(f"등록된 트리 명령어 수: {len(bot.tree.get_commands())}")

    try:
        guild_id = os.getenv("GUILD_ID")
        if guild_id:
            guild = discord.Object(id=int(guild_id))
            # 길드에 명령어 복사 후 동기화
            bot.tree.copy_global_to(guild=guild)
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
        title="🐰 뽀삐 도움말",
        description="Output Study 운영을 도와주는 봇이에요!",
        color=discord.Color.blue()
    )

    embed.add_field(
        name="👋 멤버 관리",
        value="""
`/join` - 스터디 가입 요청
`/leave` - 스터디 탈퇴
`/me` - 내 정보 확인
`/members` - 멤버 목록
        """,
        inline=False
    )

    embed.add_field(
        name="📇 프로필",
        value="""
`/profile` - 내 프로필 보기
`/profile @멤버` - 멤버 프로필 보기
`/profile-set` - 프로필 설정 (GitHub, 블로그 등)
        """,
        inline=False
    )

    embed.add_field(
        name="📝 산출물 제출",
        value="""
`/submit` - 주간 산출물 제출
`/status` - 제출 현황 확인
        """,
        inline=False
    )

    embed.add_field(
        name="✅ 출석",
        value="""
`/attend` - 모각작/회고 출석체크
`/attendance` - 내 출석 통계
        """,
        inline=False
    )

    embed.add_field(
        name="💬 피드백 & 통계",
        value="""
`/feedback` - 익명 피드백 전달
`/report` - 주간 리포트
`/ranking` - 활동 랭킹
        """,
        inline=False
    )

    embed.add_field(
        name="⚠️ 스트라이크",
        value="`/strikes` - 내 스트라이크 확인",
        inline=False
    )

    embed.set_footer(text="📋 /rules 로 스터디 규칙 확인!")

    await interaction.response.send_message(embed=embed)


@bot.tree.command(name="rules", description="스터디 규칙을 확인합니다")
async def rules_command(interaction: discord.Interaction):
    embed = discord.Embed(
        title="🚀 Output Study 규칙",
        color=discord.Color.gold()
    )

    embed.add_field(
        name="📋 기본 규칙 (Weekly Mission)",
        value="""
💻 **온라인 모각작**: 주 2회 이상 참여 필수
📅 **토요 회고 모임**: 매주 토요일 오전 8시 (3~5명 팀)
📝 **산출물 제출**: 회고 모임 전까지 완료
        """,
        inline=False
    )

    embed.add_field(
        name="📝 산출물 유형 (택 1)",
        value="""
• **알고리즘/코테**: 주 7문제 이상 풀이
• **사이드 프로젝트**: PR 5개 이상
• **개인 공부 블로깅**: 1개 이상 (1,500자 이상 권장)
        """,
        inline=False
    )

    embed.add_field(
        name="✍️ 회고록 작성 가이드 (KPT)",
        value="""
• **Keep**: 만족스러웠던 점, 계속 유지할 부분
• **Problem**: 아쉬웠던 점, 발생한 문제
• **Try**: 문제 해결을 위해 다음 주에 시도해 볼 점
        """,
        inline=False
    )

    embed.add_field(
        name="☕ 커피챗",
        value="주 1회, 1~2명씩 운영진과 소규모 대화\n운영진에게 DM으로 신청!",
        inline=False
    )

    embed.set_footer(text="함께 끝까지 완주해 봅시다! 파이팅! 🔥")

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
