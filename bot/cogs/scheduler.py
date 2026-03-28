import discord
from discord import app_commands
from discord.ext import commands, tasks
from datetime import datetime, time
import os
from bot.utils.database import (
    get_missing_submissions, get_all_active_members,
    get_setting, set_setting, init_settings_table
)


class Scheduler(commands.Cog):
    """자동 알림 스케줄러"""

    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.announcement_channel_id = int(os.getenv("ANNOUNCEMENT_CHANNEL_ID", 0))
        self.last_meeting_alert = None  # 중복 알림 방지

    @commands.Cog.listener()
    async def on_ready(self):
        await init_settings_table()
        if not self.check_meeting_time.is_running():
            self.check_meeting_time.start()
        if not self.submission_reminder.is_running():
            self.submission_reminder.start()

    def cog_unload(self):
        self.check_meeting_time.cancel()
        self.submission_reminder.cancel()

    @tasks.loop(minutes=1)
    async def check_meeting_time(self):
        """매 분마다 회고 모임 시간 체크"""
        now = datetime.now()
        today_key = now.strftime("%Y-%m-%d")

        # 오늘 이미 알림을 보냈으면 스킵
        if self.last_meeting_alert == today_key:
            return

        # 설정된 요일 확인 (기본: 토요일=5)
        meeting_day = await get_setting("meeting_day", "5")
        if now.weekday() != int(meeting_day):
            return

        # 설정된 시간 확인 (기본: 08:00)
        meeting_time = await get_setting("meeting_time", "08:00")
        try:
            meeting_hour, meeting_minute = map(int, meeting_time.split(":"))
        except:
            meeting_hour, meeting_minute = 8, 0

        # 30분 전 알림
        alert_hour = meeting_hour if meeting_minute >= 30 else meeting_hour - 1
        alert_minute = meeting_minute - 30 if meeting_minute >= 30 else meeting_minute + 30

        if now.hour == alert_hour and now.minute == alert_minute:
            await self._send_meeting_reminder(meeting_time)
            self.last_meeting_alert = today_key

    async def _send_meeting_reminder(self, meeting_time: str):
        """회고 모임 알림 전송"""
        channel = self.bot.get_channel(self.announcement_channel_id)
        if not channel:
            return

        embed = discord.Embed(
            title="📢 회고 모임 알림",
            description="30분 후 회고 모임이 시작됩니다!",
            color=discord.Color.blue()
        )
        embed.add_field(name="⏰ 시간", value=meeting_time, inline=True)
        embed.add_field(
            name="📋 안내",
            value="• 이번 주 산출물을 준비해주세요\n• `/attend` 명령어로 출석체크 해주세요",
            inline=False
        )

        await channel.send("@here", embed=embed)

    @app_commands.command(name="set-meeting", description="[관리자] 주간 회고 모임 시간을 설정합니다")
    @app_commands.describe(
        day="요일 (0=월, 1=화, 2=수, 3=목, 4=금, 5=토, 6=일)",
        time_str="시간 (HH:MM 형식, 예: 08:00, 14:30)"
    )
    @app_commands.choices(day=[
        app_commands.Choice(name="월요일", value=0),
        app_commands.Choice(name="화요일", value=1),
        app_commands.Choice(name="수요일", value=2),
        app_commands.Choice(name="목요일", value=3),
        app_commands.Choice(name="금요일", value=4),
        app_commands.Choice(name="토요일", value=5),
        app_commands.Choice(name="일요일", value=6),
    ])
    @app_commands.default_permissions(administrator=True)
    async def set_meeting(
        self,
        interaction: discord.Interaction,
        day: app_commands.Choice[int],
        time_str: str
    ):
        # 시간 형식 검증
        try:
            hour, minute = map(int, time_str.split(":"))
            if not (0 <= hour <= 23 and 0 <= minute <= 59):
                raise ValueError
        except:
            await interaction.response.send_message(
                "시간 형식이 올바르지 않습니다. HH:MM 형식으로 입력해주세요. (예: 08:00, 14:30)",
                ephemeral=True
            )
            return

        # 설정 저장
        await set_setting("meeting_day", str(day.value))
        await set_setting("meeting_time", time_str)

        # 알림 리셋 (오늘 다시 알림 가능하도록)
        self.last_meeting_alert = None

        embed = discord.Embed(
            title="✅ 회고 모임 시간 설정 완료",
            color=discord.Color.green()
        )
        embed.add_field(name="요일", value=day.name, inline=True)
        embed.add_field(name="시간", value=time_str, inline=True)
        embed.add_field(
            name="알림",
            value=f"매주 {day.name} {time_str} 30분 전에 알림이 전송됩니다.",
            inline=False
        )

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="meeting-info", description="현재 설정된 회고 모임 시간을 확인합니다")
    async def meeting_info(self, interaction: discord.Interaction):
        day_names = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"]

        meeting_day = await get_setting("meeting_day", "5")
        meeting_time = await get_setting("meeting_time", "08:00")

        embed = discord.Embed(
            title="📅 회고 모임 정보",
            color=discord.Color.blue()
        )
        embed.add_field(name="요일", value=day_names[int(meeting_day)], inline=True)
        embed.add_field(name="시간", value=meeting_time, inline=True)

        await interaction.response.send_message(embed=embed, ephemeral=True)

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
