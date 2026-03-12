import os

import discord
from discord import app_commands
from discord.ext import commands

from bot.utils.database import get_member_stats, get_strikes


class Strikes(commands.Cog):
    """스트라이크 조회 기능."""

    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.member_role_ids = {
            int(os.getenv("ROLE_ALGORITHM_ID", 0)),
            int(os.getenv("ROLE_PROJECT_ID", 0)),
            int(os.getenv("ROLE_RESUME_ID", 0)),
            int(os.getenv("ROLE_ALL_ID", 0)),
            int(os.getenv("ADMIN_ROLE_ID", 0)),
        }

    def is_study_member(self, member: discord.Member) -> bool:
        return any(role.id in self.member_role_ids for role in member.roles)

    @app_commands.command(name="strikes", description="스트라이크 기록을 확인합니다")
    @app_commands.describe(member="확인할 멤버 (미입력시 본인)")
    async def strike_history(
        self,
        interaction: discord.Interaction,
        member: discord.Member = None,
    ):
        target = member or interaction.user

        if not self.is_study_member(target):
            await interaction.response.send_message(
                "해당 멤버는 스터디 멤버가 아닙니다.",
                ephemeral=True,
            )
            return

        strikes = await get_strikes(target.id)
        stats = await get_member_stats(target.id)
        current_count = stats.get("strikes", 0)

        embed = discord.Embed(
            title=f"⚠️ {target.display_name}의 스트라이크 기록",
            color=discord.Color.orange() if strikes else discord.Color.green(),
        )
        embed.add_field(
            name="현재 상태",
            value=f"{'🧨' * current_count}{'⬜' * max(0, 3 - current_count)} ({current_count}/3)",
            inline=False,
        )

        if strikes:
            for index, strike in enumerate(strikes[:10], 1):
                embed.add_field(
                    name=f"#{index} - {strike['issued_at'][:10]}",
                    value=strike["reason"],
                    inline=False,
                )
        else:
            embed.add_field(
                name="기록",
                value="현재 스트라이크 기록이 없습니다.",
                inline=False,
            )

        await interaction.response.send_message(embed=embed, ephemeral=True)


async def setup(bot: commands.Bot):
    await bot.add_cog(Strikes(bot))
