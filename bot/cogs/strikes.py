import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.database import (
    add_strike, get_strikes, get_member, deactivate_member
)


class Strikes(commands.Cog):
    """스트라이크(삼진 아웃) 관리"""

    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @app_commands.command(name="strike", description="[관리자] 멤버에게 스트라이크를 부여합니다")
    @app_commands.describe(
        member="스트라이크를 부여할 멤버",
        reason="스트라이크 사유"
    )
    @app_commands.default_permissions(administrator=True)
    async def give_strike(
        self,
        interaction: discord.Interaction,
        member: discord.Member,
        reason: str
    ):
        db_member = await get_member(member.id)
        if not db_member or not db_member["is_active"]:
            await interaction.response.send_message(
                "해당 멤버는 스터디에 가입되어 있지 않습니다.",
                ephemeral=True
            )
            return

        strike_count = await add_strike(
            user_id=member.id,
            reason=reason,
            issued_by=interaction.user.id
        )

        embed = discord.Embed(
            title="스트라이크 부여",
            color=discord.Color.orange()
        )
        embed.add_field(name="대상", value=member.display_name, inline=True)
        embed.add_field(
            name="스트라이크",
            value=f"{'⚠️' * strike_count}{'⚪' * (3 - strike_count)} ({strike_count}/3)",
            inline=True
        )
        embed.add_field(name="사유", value=reason, inline=False)

        if strike_count >= 3:
            await deactivate_member(member.id)
            embed.add_field(
                name="삼진 아웃",
                value=f"**{member.display_name}**님이 스터디에서 제외되었습니다.",
                inline=False
            )
            embed.color = discord.Color.red()

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="strikes", description="스트라이크 기록을 확인합니다")
    @app_commands.describe(member="확인할 멤버 (미입력시 본인)")
    async def strike_history(
        self,
        interaction: discord.Interaction,
        member: discord.Member = None
    ):
        target = member or interaction.user
        db_member = await get_member(target.id)

        if not db_member:
            await interaction.response.send_message(
                "해당 멤버는 스터디에 가입되어 있지 않습니다.",
                ephemeral=True
            )
            return

        strikes = await get_strikes(target.id)

        embed = discord.Embed(
            title=f"{target.display_name}의 스트라이크 기록",
            color=discord.Color.orange() if strikes else discord.Color.green()
        )

        current_count = db_member["strike_count"]
        embed.add_field(
            name="현재 상태",
            value=f"{'⚠️' * current_count}{'⚪' * (3 - current_count)} ({current_count}/3)",
            inline=False
        )

        if strikes:
            for i, s in enumerate(strikes[:10], 1):
                issued_at = s["issued_at"][:10]
                embed.add_field(
                    name=f"#{i} - {issued_at}",
                    value=s["reason"],
                    inline=False
                )
        else:
            embed.add_field(name="기록", value="스트라이크 기록이 없습니다!", inline=False)

        await interaction.response.send_message(embed=embed, ephemeral=True)


async def setup(bot: commands.Bot):
    await bot.add_cog(Strikes(bot))
