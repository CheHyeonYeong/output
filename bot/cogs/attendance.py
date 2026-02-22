import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.database import check_attendance, get_attendance_stats, get_session_attendees
import os
import asyncio
from datetime import datetime


class Attendance(commands.Cog):
    """출석 관리"""

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

    @app_commands.command(name="attend", description="오늘 세션에 출석체크합니다")
    @app_commands.describe(session="출석할 세션 유형")
    @app_commands.choices(session=[
        app_commands.Choice(name="온라인 모각작", value="cowork"),
        app_commands.Choice(name="토요 회고 모임", value="retrospect"),
    ])
    async def attend(
        self,
        interaction: discord.Interaction,
        session: app_commands.Choice[str]
    ):
        # 역할 기반 멤버 확인
        if not self.is_study_member(interaction.user):
            await interaction.response.send_message(
                "스터디 멤버가 아닙니다. 역할을 받으면 자동으로 멤버가 됩니다!",
                ephemeral=True
            )
            return

        success = await check_attendance(
            user_id=interaction.user.id,
            session_type=session.value
        )

        if success:
            embed = discord.Embed(
                title="출석 완료",
                description=f"**{interaction.user.display_name}**님, {session.name} 출석체크 완료!",
                color=discord.Color.green()
            )

            stats = await get_attendance_stats(interaction.user.id)
            if stats:
                stat_str = " | ".join(f"{k}: {v}회" for k, v in stats.items())
                embed.add_field(name="누적 출석", value=stat_str, inline=False)

            await interaction.response.send_message(embed=embed)
        else:
            await interaction.response.send_message(
                "오늘 이 세션에 이미 출석했습니다.",
                ephemeral=True
            )

    @app_commands.command(name="attendance", description="내 출석 통계를 확인합니다")
    async def attendance_stats(self, interaction: discord.Interaction):
        # 역할 기반 멤버 확인
        if not self.is_study_member(interaction.user):
            await interaction.response.send_message(
                "스터디 멤버가 아닙니다. 역할을 받으면 자동으로 멤버가 됩니다!",
                ephemeral=True
            )
            return

        stats = await get_attendance_stats(interaction.user.id)

        embed = discord.Embed(
            title=f"{interaction.user.display_name}의 출석 통계",
            color=discord.Color.blue()
        )

        if stats:
            for session_type, count in stats.items():
                embed.add_field(name=session_type, value=f"{count}회", inline=True)

            total = sum(stats.values())
            embed.add_field(name="총 출석", value=f"{total}회", inline=False)
        else:
            embed.description = "아직 출석 기록이 없습니다."

        await interaction.response.send_message(embed=embed, ephemeral=True)

    # ============ 관리자 DM 기능 ============

    @app_commands.command(name="dm-missing", description="[관리자] 특정 세션 미참석자에게 일괄 DM 전송")
    @app_commands.describe(
        session="대상 세션 유형",
        date="세션 날짜 (YYYY-MM-DD, 기본값: 오늘)",
        message="전송할 메시지 (기본 메시지 사용 가능)"
    )
    @app_commands.choices(session=[
        app_commands.Choice(name="온라인 모각작", value="cowork"),
        app_commands.Choice(name="토요 회고 모임", value="retrospect"),
    ])
    @app_commands.default_permissions(administrator=True)
    async def dm_missing(
        self,
        interaction: discord.Interaction,
        session: app_commands.Choice[str],
        date: str = None,
        message: str = None
    ):
        await interaction.response.defer(ephemeral=True)

        # 날짜 파싱
        if date:
            try:
                session_date = datetime.strptime(date, "%Y-%m-%d").strftime("%Y-%m-%d")
            except ValueError:
                await interaction.followup.send(
                    "날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식으로 입력해주세요.",
                    ephemeral=True
                )
                return
        else:
            session_date = datetime.now().strftime("%Y-%m-%d")

        # 출석자 목록 조회
        attendees = await get_session_attendees(session.value, session_date)
        attendee_ids = set(attendees)

        # 스터디 멤버 중 미참석자 찾기
        guild = interaction.guild
        missing_members = []
        for member in guild.members:
            if member.bot:
                continue
            if self.is_study_member(member) and member.id not in attendee_ids:
                missing_members.append(member)

        if not missing_members:
            await interaction.followup.send(
                f"{session.name} ({session_date}) 미참석자가 없습니다.",
                ephemeral=True
            )
            return

        # 기본 메시지
        if not message:
            message = (
                f"안녕하세요! 뽀삐 스터디입니다.\n\n"
                f"**{session.name}** ({session_date}) 세션에 출석하지 않으셨습니다.\n"
                f"참석이 어려우신 경우 운영진에게 사전 연락 부탁드립니다.\n\n"
                f"문의사항이 있으시면 편하게 연락해주세요!"
            )

        # DM 전송
        success_count = 0
        failed_members = []

        for member in missing_members:
            try:
                await member.send(message)
                success_count += 1
                await asyncio.sleep(0.5)  # Rate limit 방지
            except discord.Forbidden:
                failed_members.append(f"{member.display_name} (DM 차단)")
            except discord.HTTPException as e:
                failed_members.append(f"{member.display_name} (오류: {e})")

        # 결과 리포트
        embed = discord.Embed(
            title="DM 전송 결과",
            description=f"**{session.name}** ({session_date}) 미참석자 DM 전송 완료",
            color=discord.Color.green() if not failed_members else discord.Color.orange()
        )
        embed.add_field(name="전송 성공", value=f"{success_count}명", inline=True)
        embed.add_field(name="전송 실패", value=f"{len(failed_members)}명", inline=True)
        embed.add_field(name="총 미참석자", value=f"{len(missing_members)}명", inline=True)

        if failed_members:
            failed_list = "\n".join(failed_members[:10])
            if len(failed_members) > 10:
                failed_list += f"\n... 외 {len(failed_members) - 10}명"
            embed.add_field(name="실패 목록", value=failed_list, inline=False)

        await interaction.followup.send(embed=embed, ephemeral=True)

    @app_commands.command(name="dm-user", description="[관리자] 특정 멤버에게 DM 전송")
    @app_commands.describe(
        member="DM을 보낼 멤버",
        message="전송할 메시지"
    )
    @app_commands.default_permissions(administrator=True)
    async def dm_user(
        self,
        interaction: discord.Interaction,
        member: discord.Member,
        message: str
    ):
        await interaction.response.defer(ephemeral=True)

        try:
            await member.send(message)
            embed = discord.Embed(
                title="DM 전송 성공",
                description=f"**{member.display_name}**님에게 메시지를 전송했습니다.",
                color=discord.Color.green()
            )
            embed.add_field(name="전송 내용", value=message[:1024], inline=False)
            await interaction.followup.send(embed=embed, ephemeral=True)

        except discord.Forbidden:
            await interaction.followup.send(
                f"{member.display_name}님이 DM을 차단했거나 받을 수 없는 상태입니다.",
                ephemeral=True
            )
        except discord.HTTPException as e:
            await interaction.followup.send(
                f"DM 전송 중 오류가 발생했습니다: {e}",
                ephemeral=True
            )


async def setup(bot: commands.Bot):
    await bot.add_cog(Attendance(bot))
