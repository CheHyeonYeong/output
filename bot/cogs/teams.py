import os

import discord
from discord import app_commands
from discord.ext import commands

from bot.utils.database import get_all_teams_with_members, get_team_members, get_user_team


class Teams(commands.Cog):
    """팀 조회 기능."""

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

    @app_commands.command(name="team-list", description="팀 목록 및 멤버를 확인합니다")
    async def team_list(self, interaction: discord.Interaction):
        teams = await get_all_teams_with_members()

        if not teams:
            await interaction.response.send_message(
                "등록된 팀이 없습니다.",
                ephemeral=True,
            )
            return

        embed = discord.Embed(title="팀 목록", color=discord.Color.blue())

        for team in teams:
            members = team.get("members", [])
            if members:
                names = []
                for member in members:
                    if interaction.guild:
                        discord_member = interaction.guild.get_member(member["user_id"])
                        if discord_member:
                            names.append(discord_member.display_name)
                        elif member.get("username"):
                            names.append(member["username"])
                        else:
                            names.append(f"ID:{member['user_id']}")
                    else:
                        names.append(member.get("username", f"ID:{member['user_id']}"))
                member_text = ", ".join(names)
            else:
                member_text = "(멤버 없음)"

            embed.add_field(
                name=f"{team['name']} ({len(members)}명)",
                value=member_text,
                inline=False,
            )

        total_members = sum(len(team.get("members", [])) for team in teams)
        embed.set_footer(text=f"총 {len(teams)}개 팀, {total_members}명 배정")

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="my-team", description="내가 속한 팀을 확인합니다")
    async def my_team(self, interaction: discord.Interaction):
        if not self.is_study_member(interaction.user):
            await interaction.response.send_message(
                "스터디 멤버가 아닙니다.",
                ephemeral=True,
            )
            return

        team = await get_user_team(interaction.user.id)
        if not team:
            await interaction.response.send_message(
                "아직 팀이 배정되지 않았습니다.",
                ephemeral=True,
            )
            return

        members = await get_team_members(team["id"])

        embed = discord.Embed(
            title=f"내 팀: {team['name']}",
            color=discord.Color.green(),
        )

        if members:
            names = []
            for member in members:
                if interaction.guild:
                    discord_member = interaction.guild.get_member(member["user_id"])
                    if discord_member:
                        if discord_member.id == interaction.user.id:
                            names.append(f"**{discord_member.display_name}** (나)")
                        else:
                            names.append(discord_member.display_name)
                    elif member.get("username"):
                        names.append(member["username"])
                    else:
                        names.append(f"ID:{member['user_id']}")
                else:
                    names.append(member.get("username", f"ID:{member['user_id']}"))

            embed.add_field(
                name=f"팀원 ({len(members)}명)",
                value="\n".join(names),
                inline=False,
            )
        else:
            embed.add_field(name="팀원", value="(없음)", inline=False)

        if team.get("assigned_at"):
            embed.set_footer(text=f"배정일: {team['assigned_at'][:10]}")

        await interaction.response.send_message(embed=embed, ephemeral=True)


async def setup(bot: commands.Bot):
    await bot.add_cog(Teams(bot))
