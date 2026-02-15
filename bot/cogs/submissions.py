import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.database import (
    submit_output, get_weekly_submissions, get_missing_submissions,
    get_member, add_strike, deactivate_member
)


class Submissions(commands.Cog):
    """산출물 제출 관리"""

    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @app_commands.command(name="submit", description="이번 주 산출물을 제출합니다")
    @app_commands.describe(
        output_type="산출물 유형",
        description="산출물에 대한 간단한 설명 (인사이트, 의사결정 포함)"
    )
    @app_commands.choices(output_type=[
        app_commands.Choice(name="코딩테스트 7문제", value="coding"),
        app_commands.Choice(name="과제 PR 7개", value="project"),
        app_commands.Choice(name="이력서/포트폴리오 수정", value="resume"),
        app_commands.Choice(name="스터디 내용 정리", value="notes"),
    ])
    async def submit(
        self,
        interaction: discord.Interaction,
        output_type: app_commands.Choice[str],
        description: str
    ):
        member = await get_member(interaction.user.id)
        if not member or not member["is_active"]:
            await interaction.response.send_message(
                "스터디에 가입되어 있지 않습니다. `/join` 명령어로 가입해주세요.",
                ephemeral=True
            )
            return

        message_link = f"https://discord.com/channels/{interaction.guild_id}/{interaction.channel_id}"

        success = await submit_output(
            user_id=interaction.user.id,
            submission_type=output_type.value,
            description=description,
            message_link=message_link
        )

        if success:
            embed = discord.Embed(
                title="산출물 제출 완료",
                color=discord.Color.green()
            )
            embed.add_field(name="제출자", value=interaction.user.display_name, inline=True)
            embed.add_field(name="유형", value=output_type.name, inline=True)
            embed.add_field(name="설명", value=description, inline=False)
            embed.set_footer(text="모든 산출물은 설명 가능해야 합니다!")

            await interaction.response.send_message(embed=embed)
        else:
            await interaction.response.send_message(
                "이번 주에 이미 제출했습니다. 주 1회만 제출 가능합니다.",
                ephemeral=True
            )

    @app_commands.command(name="status", description="이번 주 제출 현황을 확인합니다")
    async def submission_status(self, interaction: discord.Interaction):
        submissions = await get_weekly_submissions()
        missing = await get_missing_submissions()

        embed = discord.Embed(
            title="이번 주 제출 현황",
            color=discord.Color.blue()
        )

        if submissions:
            submitted_list = []
            for s in submissions:
                submitted_list.append(f"**{s['username']}** - {s['submission_type']}")
            embed.add_field(
                name=f"제출 완료 ({len(submissions)}명)",
                value="\n".join(submitted_list) or "없음",
                inline=False
            )
        else:
            embed.add_field(name="제출 완료", value="아직 제출한 멤버가 없습니다.", inline=False)

        if missing:
            missing_list = [m["username"] for m in missing]
            embed.add_field(
                name=f"미제출 ({len(missing)}명)",
                value=", ".join(missing_list),
                inline=False
            )
        else:
            embed.add_field(name="미제출", value="모든 멤버가 제출 완료!", inline=False)

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="check-missing", description="[관리자] 미제출자에게 스트라이크를 부여합니다")
    @app_commands.default_permissions(administrator=True)
    async def check_missing(self, interaction: discord.Interaction):
        missing = await get_missing_submissions()

        if not missing:
            await interaction.response.send_message(
                "모든 멤버가 제출 완료했습니다!", ephemeral=True
            )
            return

        results = []
        for m in missing:
            strike_count = await add_strike(
                user_id=m["user_id"],
                reason="주간 산출물 미제출",
                issued_by=interaction.user.id
            )

            if strike_count >= 3:
                await deactivate_member(m["user_id"])
                results.append(f"**{m['username']}**: 3아웃 - 스터디 제외")
            else:
                results.append(f"**{m['username']}**: {strike_count}/3 스트라이크")

        embed = discord.Embed(
            title="미제출 스트라이크 부여 완료",
            description="\n".join(results),
            color=discord.Color.red()
        )

        await interaction.response.send_message(embed=embed)


async def setup(bot: commands.Bot):
    await bot.add_cog(Submissions(bot))
