import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.database import add_feedback, get_recent_feedbacks, get_member
import os


class Feedback(commands.Cog):
    """익명 피드백 시스템"""

    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.feedback_channel_id = int(os.getenv("FEEDBACK_CHANNEL_ID", 0))

    @app_commands.command(name="feedback", description="익명으로 피드백을 전달합니다")
    @app_commands.describe(
        content="피드백 내용 (완전히 익명으로 전달됩니다)",
        target="특정 멤버에게 전달할 경우 선택 (선택사항)"
    )
    async def send_feedback(
        self,
        interaction: discord.Interaction,
        content: str,
        target: discord.Member = None
    ):
        await interaction.response.defer(ephemeral=True)

        target_id = target.id if target else None
        feedback_id = await add_feedback(content=content, target_user_id=target_id)

        if self.feedback_channel_id:
            channel = self.bot.get_channel(self.feedback_channel_id)
            if channel:
                embed = discord.Embed(
                    title="새로운 익명 피드백",
                    description=content,
                    color=discord.Color.purple()
                )
                if target:
                    embed.add_field(name="대상", value=target.display_name, inline=True)
                embed.set_footer(text=f"피드백 #{feedback_id}")

                await channel.send(embed=embed)

        await interaction.followup.send(
            "피드백이 익명으로 전달되었습니다. 감사합니다!",
            ephemeral=True
        )

    @app_commands.command(name="feedbacks", description="[관리자] 최근 피드백을 확인합니다")
    @app_commands.describe(limit="조회할 피드백 수 (기본 10개)")
    @app_commands.default_permissions(administrator=True)
    async def list_feedbacks(
        self,
        interaction: discord.Interaction,
        limit: int = 10
    ):
        feedbacks = await get_recent_feedbacks(limit=limit)

        if not feedbacks:
            await interaction.response.send_message(
                "아직 피드백이 없습니다.", ephemeral=True
            )
            return

        embed = discord.Embed(
            title="최근 피드백 목록",
            color=discord.Color.purple()
        )

        for f in feedbacks:
            created = f["created_at"][:10]
            target = f.get("target_username") or "전체"
            content = f["content"][:100] + "..." if len(f["content"]) > 100 else f["content"]

            embed.add_field(
                name=f"#{f['id']} - {created} (대상: {target})",
                value=content,
                inline=False
            )

        await interaction.response.send_message(embed=embed, ephemeral=True)


async def setup(bot: commands.Bot):
    await bot.add_cog(Feedback(bot))
