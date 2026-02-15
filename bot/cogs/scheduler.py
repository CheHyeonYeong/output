import discord
from discord.ext import commands, tasks
from datetime import datetime, time
import os
from bot.utils.database import get_missing_submissions, get_all_active_members


class Scheduler(commands.Cog):
    """자동 알림 스케줄러"""

    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.announcement_channel_id = int(os.getenv("ANNOUNCEMENT_CHANNEL_ID", 0))

    @commands.Cog.listener()
    async def on_ready(self):
        if not self.weekly_reminder.is_running():
            self.weekly_reminder.start()
        if not self.submission_reminder.is_running():
            self.submission_reminder.start()

    def cog_unload(self):
        self.weekly_reminder.cancel()
        self.submission_reminder.cancel()

    @tasks.loop(time=time(hour=22, minute=30))  # UTC 22:30 = KST 07:30
    async def weekly_reminder(self):
        """주말 리뷰 세션 30분 전 알림 (토요일)"""
        now = datetime.now()
        if now.weekday() != 5:
            return

        channel = self.bot.get_channel(self.announcement_channel_id)
        if not channel:
            return

        embed = discord.Embed(
            title="리뷰/점검 세션 알림",
            description="30분 후 리뷰 세션이 시작됩니다!",
            color=discord.Color.blue()
        )
        embed.add_field(name="시간", value="오전 8:00", inline=True)
        embed.add_field(
            name="안내",
            value="• 이번 주 산출물을 준비해주세요\n• `/attend` 명령어로 출석체크 해주세요",
            inline=False
        )

        await channel.send("@here", embed=embed)

    @tasks.loop(time=time(hour=11, minute=0))  # UTC 11:00 = KST 20:00
    async def submission_reminder(self):
        """금요일 저녁 제출 마감 리마인더"""
        now = datetime.now()
        if now.weekday() != 4:
            return

        channel = self.bot.get_channel(self.announcement_channel_id)
        if not channel:
            return

        missing = await get_missing_submissions()

        if not missing:
            return

        embed = discord.Embed(
            title="주간 산출물 제출 리마인더",
            description="아직 이번 주 산출물을 제출하지 않은 멤버가 있습니다!",
            color=discord.Color.orange()
        )

        missing_mentions = []
        for m in missing:
            try:
                member = await self.bot.fetch_user(m["user_id"])
                missing_mentions.append(member.mention)
            except:
                missing_mentions.append(f"**{m['username']}**")

        embed.add_field(
            name=f"미제출자 ({len(missing)}명)",
            value=", ".join(missing_mentions),
            inline=False
        )
        embed.add_field(
            name="제출 방법",
            value="`/submit` 명령어를 사용해주세요",
            inline=False
        )
        embed.set_footer(text="미제출시 스트라이크가 부여됩니다!")

        await channel.send(embed=embed)


async def setup(bot: commands.Bot):
    await bot.add_cog(Scheduler(bot))
