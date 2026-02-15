import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.database import check_attendance, get_member, get_attendance_stats


class Attendance(commands.Cog):
    """출석 관리"""

    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @app_commands.command(name="attend", description="오늘 세션에 출석체크합니다")
    @app_commands.describe(session="출석할 세션 유형")
    @app_commands.choices(session=[
        app_commands.Choice(name="모각작 (주중)", value="cowork"),
        app_commands.Choice(name="리뷰/점검 (주말)", value="review"),
    ])
    async def attend(
        self,
        interaction: discord.Interaction,
        session: app_commands.Choice[str]
    ):
        member = await get_member(interaction.user.id)
        if not member or not member["is_active"]:
            await interaction.response.send_message(
                "스터디에 가입되어 있지 않습니다.",
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
        member = await get_member(interaction.user.id)
        if not member:
            await interaction.response.send_message(
                "스터디에 가입되어 있지 않습니다.",
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


async def setup(bot: commands.Bot):
    await bot.add_cog(Attendance(bot))
