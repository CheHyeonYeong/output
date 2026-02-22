import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.database import (
    create_team, get_team, get_team_by_name, get_all_teams,
    delete_team, assign_team_member, get_user_team, get_team_members,
    get_all_teams_with_members, clear_all_team_members
)
import os
import random


class Teams(commands.Cog):
    """팀 배정 시스템"""

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

    def get_study_members(self, guild: discord.Guild) -> list[discord.Member]:
        """스터디 멤버 목록 가져오기"""
        members = []
        for member in guild.members:
            if member.bot:
                continue
            if self.is_study_member(member):
                members.append(member)
        return members

    async def team_autocomplete(
        self,
        interaction: discord.Interaction,
        current: str
    ) -> list[app_commands.Choice[str]]:
        """팀 이름 자동완성"""
        teams = await get_all_teams()
        return [
            app_commands.Choice(name=team["name"], value=team["name"])
            for team in teams
            if current.lower() in team["name"].lower()
        ][:25]

    @app_commands.command(name="team-create", description="[관리자] 새로운 팀을 생성합니다")
    @app_commands.describe(name="팀 이름")
    @app_commands.default_permissions(administrator=True)
    async def team_create(
        self,
        interaction: discord.Interaction,
        name: str
    ):
        team_id = await create_team(name)

        if team_id is None:
            await interaction.response.send_message(
                f"'{name}' 팀이 이미 존재합니다.",
                ephemeral=True
            )
            return

        embed = discord.Embed(
            title="팀 생성 완료",
            description=f"**{name}** 팀이 생성되었습니다.",
            color=discord.Color.green()
        )
        embed.add_field(name="팀 ID", value=str(team_id), inline=True)

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="team-assign", description="[관리자] 멤버를 팀에 배정합니다")
    @app_commands.describe(
        member="팀에 배정할 멤버",
        team="배정할 팀 이름"
    )
    @app_commands.autocomplete(team=team_autocomplete)
    @app_commands.default_permissions(administrator=True)
    async def team_assign(
        self,
        interaction: discord.Interaction,
        member: discord.Member,
        team: str
    ):
        # 스터디 멤버 확인
        if not self.is_study_member(member):
            await interaction.response.send_message(
                "해당 멤버는 스터디 멤버가 아닙니다.",
                ephemeral=True
            )
            return

        # 팀 존재 확인
        team_info = await get_team_by_name(team)
        if not team_info:
            await interaction.response.send_message(
                f"'{team}' 팀이 존재하지 않습니다.",
                ephemeral=True
            )
            return

        # 기존 팀 확인
        old_team = await get_user_team(member.id)

        # 팀 배정
        await assign_team_member(member.id, team_info["id"])

        embed = discord.Embed(
            title="팀 배정 완료",
            color=discord.Color.blue()
        )
        embed.add_field(name="멤버", value=member.display_name, inline=True)
        embed.add_field(name="팀", value=team, inline=True)

        if old_team:
            embed.add_field(
                name="이전 팀",
                value=f"~~{old_team['name']}~~ -> {team}",
                inline=False
            )

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="team-random", description="[관리자] 활성 멤버를 랜덤으로 팀에 배정합니다")
    @app_commands.describe(team_count="생성할 팀 수")
    @app_commands.default_permissions(administrator=True)
    async def team_random(
        self,
        interaction: discord.Interaction,
        team_count: int
    ):
        if team_count < 2:
            await interaction.response.send_message(
                "팀 수는 최소 2개 이상이어야 합니다.",
                ephemeral=True
            )
            return

        if not interaction.guild:
            return

        # 스터디 멤버 목록 가져오기
        members = self.get_study_members(interaction.guild)

        if len(members) < team_count:
            await interaction.response.send_message(
                f"멤버 수({len(members)}명)가 팀 수({team_count}개)보다 적습니다.",
                ephemeral=True
            )
            return

        await interaction.response.defer()

        # 기존 팀 멤버 초기화
        await clear_all_team_members()

        # 기존 팀 확인 및 생성
        existing_teams = await get_all_teams()
        existing_team_names = {t["name"] for t in existing_teams}

        team_ids = []
        for i in range(1, team_count + 1):
            team_name = f"Team {i}"
            if team_name not in existing_team_names:
                team_id = await create_team(team_name)
            else:
                team_info = await get_team_by_name(team_name)
                team_id = team_info["id"]
            team_ids.append((team_id, team_name))

        # 멤버 셔플 후 균등 배분
        random.shuffle(members)

        # 멤버를 팀에 균등하게 배분
        team_assignments = {team_id: [] for team_id, _ in team_ids}

        for idx, member in enumerate(members):
            team_id, team_name = team_ids[idx % team_count]
            await assign_team_member(member.id, team_id)
            team_assignments[team_id].append(member.display_name)

        # 결과 임베드 생성
        embed = discord.Embed(
            title="랜덤 팀 배정 완료",
            description=f"총 {len(members)}명이 {team_count}개 팀에 배정되었습니다.",
            color=discord.Color.gold()
        )

        for team_id, team_name in team_ids:
            member_names = team_assignments[team_id]
            embed.add_field(
                name=f"{team_name} ({len(member_names)}명)",
                value=", ".join(member_names) if member_names else "-",
                inline=False
            )

        await interaction.followup.send(embed=embed)

    @app_commands.command(name="team-list", description="팀 목록 및 멤버를 확인합니다")
    async def team_list(self, interaction: discord.Interaction):
        teams = await get_all_teams_with_members()

        if not teams:
            await interaction.response.send_message(
                "등록된 팀이 없습니다.",
                ephemeral=True
            )
            return

        embed = discord.Embed(
            title="팀 목록",
            color=discord.Color.blue()
        )

        for team in teams:
            members = team.get("members", [])
            if members:
                # Discord 멤버 정보 가져오기
                member_list = []
                for m in members:
                    if interaction.guild:
                        discord_member = interaction.guild.get_member(m["user_id"])
                        if discord_member:
                            member_list.append(discord_member.display_name)
                        elif m.get("username"):
                            member_list.append(m["username"])
                        else:
                            member_list.append(f"ID:{m['user_id']}")
                    else:
                        member_list.append(m.get("username", f"ID:{m['user_id']}"))

                member_str = ", ".join(member_list)
            else:
                member_str = "(멤버 없음)"

            embed.add_field(
                name=f"{team['name']} ({len(members)}명)",
                value=member_str,
                inline=False
            )

        total_members = sum(len(t.get("members", [])) for t in teams)
        embed.set_footer(text=f"총 {len(teams)}개 팀, {total_members}명 배정됨")

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="my-team", description="내가 속한 팀을 확인합니다")
    async def my_team(self, interaction: discord.Interaction):
        # 스터디 멤버 확인
        if not self.is_study_member(interaction.user):
            await interaction.response.send_message(
                "스터디 멤버가 아닙니다.",
                ephemeral=True
            )
            return

        team = await get_user_team(interaction.user.id)

        if not team:
            await interaction.response.send_message(
                "아직 팀에 배정되지 않았습니다.",
                ephemeral=True
            )
            return

        # 팀 멤버 목록 가져오기
        members = await get_team_members(team["id"])

        embed = discord.Embed(
            title=f"내 팀: {team['name']}",
            color=discord.Color.green()
        )

        # 팀원 목록
        if members:
            member_list = []
            for m in members:
                if interaction.guild:
                    discord_member = interaction.guild.get_member(m["user_id"])
                    if discord_member:
                        if discord_member.id == interaction.user.id:
                            member_list.append(f"**{discord_member.display_name}** (나)")
                        else:
                            member_list.append(discord_member.display_name)
                    elif m.get("username"):
                        member_list.append(m["username"])
                    else:
                        member_list.append(f"ID:{m['user_id']}")
                else:
                    member_list.append(m.get("username", f"ID:{m['user_id']}"))

            embed.add_field(
                name=f"팀원 ({len(members)}명)",
                value="\n".join(member_list),
                inline=False
            )
        else:
            embed.add_field(name="팀원", value="(없음)", inline=False)

        # 배정 날짜
        if team.get("assigned_at"):
            assigned_date = team["assigned_at"][:10]
            embed.set_footer(text=f"배정일: {assigned_date}")

        await interaction.response.send_message(embed=embed, ephemeral=True)


async def setup(bot: commands.Bot):
    await bot.add_cog(Teams(bot))
