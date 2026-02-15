import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.database import (
    add_member, get_member, get_all_active_members,
    deactivate_member, get_member_stats
)
import os


class Members(commands.Cog):
    """멤버 관리 기능"""

    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.admin_role_id = int(os.getenv("ADMIN_ROLE_ID", 0))

    def is_admin(self, interaction: discord.Interaction) -> bool:
        if interaction.user.guild_permissions.administrator:
            return True
        return any(role.id == self.admin_role_id for role in interaction.user.roles)

    @app_commands.command(name="join", description="스터디에 가입합니다")
    @app_commands.describe(
        output_type="주로 제출할 산출물 유형",
        status="현재 취준 상황을 간단히 설명해주세요"
    )
    @app_commands.choices(output_type=[
        app_commands.Choice(name="코딩테스트 (주 7문제)", value="coding"),
        app_commands.Choice(name="과제/PR (주 7개)", value="project"),
        app_commands.Choice(name="이력서/포트폴리오", value="resume"),
        app_commands.Choice(name="스터디 정리", value="notes"),
    ])
    async def join(
        self,
        interaction: discord.Interaction,
        output_type: app_commands.Choice[str],
        status: str
    ):
        existing = await get_member(interaction.user.id)
        if existing and existing["is_active"]:
            await interaction.response.send_message(
                "이미 스터디에 가입되어 있습니다.", ephemeral=True
            )
            return

        await add_member(
            user_id=interaction.user.id,
            username=interaction.user.display_name,
            main_output=output_type.value,
            current_status=status
        )

        embed = discord.Embed(
            title="스터디 가입 완료",
            description=f"**{interaction.user.display_name}**님, 환영합니다!",
            color=discord.Color.green()
        )
        embed.add_field(name="주력 산출물", value=output_type.name, inline=True)
        embed.add_field(name="현재 상황", value=status, inline=False)
        embed.set_footer(text="삼진 아웃 제도가 적용됩니다. /rules 로 규칙을 확인하세요!")

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="leave", description="스터디를 탈퇴합니다")
    async def leave(self, interaction: discord.Interaction):
        member = await get_member(interaction.user.id)
        if not member or not member["is_active"]:
            await interaction.response.send_message(
                "스터디에 가입되어 있지 않습니다.", ephemeral=True
            )
            return

        await deactivate_member(interaction.user.id)
        await interaction.response.send_message(
            f"**{interaction.user.display_name}**님이 스터디를 탈퇴했습니다. 수고하셨습니다!"
        )

    @app_commands.command(name="me", description="내 스터디 정보를 확인합니다")
    async def my_info(self, interaction: discord.Interaction):
        member = await get_member(interaction.user.id)
        if not member:
            await interaction.response.send_message(
                "스터디에 가입되어 있지 않습니다. `/join` 명령어로 가입해주세요.",
                ephemeral=True
            )
            return

        stats = await get_member_stats(interaction.user.id)

        embed = discord.Embed(
            title=f"{interaction.user.display_name}의 스터디 정보",
            color=discord.Color.blue()
        )
        embed.add_field(name="주력 산출물", value=member.get("main_output", "-"), inline=True)
        embed.add_field(name="현재 상황", value=member.get("current_status", "-"), inline=True)
        embed.add_field(
            name="스트라이크",
            value=f"{'⚠️' * stats['strikes']}{'⚪' * (3 - stats['strikes'])} ({stats['strikes']}/3)",
            inline=True
        )
        embed.add_field(name="총 제출 수", value=str(stats["total_submissions"]), inline=True)
        embed.add_field(name="총 출석 수", value=str(stats["total_attendance"]), inline=True)

        if stats["submission_types"]:
            type_str = "\n".join(f"- {k}: {v}회" for k, v in stats["submission_types"].items())
            embed.add_field(name="제출 유형별", value=type_str, inline=False)

        await interaction.response.send_message(embed=embed, ephemeral=True)

    @app_commands.command(name="members", description="활성 멤버 목록을 확인합니다")
    async def member_list(self, interaction: discord.Interaction):
        members = await get_all_active_members()

        if not members:
            await interaction.response.send_message("등록된 멤버가 없습니다.", ephemeral=True)
            return

        embed = discord.Embed(
            title="스터디 멤버 목록",
            description=f"총 {len(members)}명",
            color=discord.Color.blue()
        )

        for m in members:
            strikes = "⚠️" * m["strike_count"] + "⚪" * (3 - m["strike_count"])
            embed.add_field(
                name=m["username"],
                value=f"주력: {m.get('main_output', '-')} | {strikes}",
                inline=True
            )

        await interaction.response.send_message(embed=embed)


async def setup(bot: commands.Bot):
    await bot.add_cog(Members(bot))
