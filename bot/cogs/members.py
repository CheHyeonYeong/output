import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.database import (
    add_member, get_member, get_all_active_members,
    deactivate_member, get_member_stats, set_profile, get_profile
)
import os


class Members(commands.Cog):
    """멤버 관리 기능"""

    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.admin_role_id = int(os.getenv("ADMIN_ROLE_ID", 0))
        # 산출물 유형별 역할 ID
        self.role_map = {
            "algorithm": int(os.getenv("ROLE_ALGORITHM_ID", 0)),
            "project": int(os.getenv("ROLE_PROJECT_ID", 0)),
            "resume": int(os.getenv("ROLE_RESUME_ID", 0)),
            "all": int(os.getenv("ROLE_ALL_ID", 0)),
        }
        # 멤버 역할 ID 목록 (운영진 포함)
        self.member_role_ids = set(self.role_map.values())
        self.member_role_ids.add(self.admin_role_id)

    def is_admin(self, interaction: discord.Interaction) -> bool:
        if interaction.user.guild_permissions.administrator:
            return True
        return any(role.id == self.admin_role_id for role in interaction.user.roles)

    def is_study_member(self, member: discord.Member) -> bool:
        """역할 기반으로 스터디 멤버인지 확인"""
        return any(role.id in self.member_role_ids for role in member.roles)

    def get_member_output_type(self, member: discord.Member) -> str:
        """멤버의 산출물 유형 반환"""
        for output_type, role_id in self.role_map.items():
            if any(role.id == role_id for role in member.roles):
                return output_type
        return None

    @app_commands.command(name="join", description="스터디 가입을 요청합니다")
    @app_commands.describe(
        output_type="주로 제출할 산출물 유형",
        status="현재 취준 상황을 간단히 설명해주세요"
    )
    @app_commands.choices(output_type=[
        app_commands.Choice(name="알고리즘/코테 (주 7문제)", value="algorithm"),
        app_commands.Choice(name="사이드 프로젝트 (PR 5개)", value="project"),
        app_commands.Choice(name="이력서/포폴", value="resume"),
        app_commands.Choice(name="다하고싶은사람", value="all"),
    ])
    async def join(
        self,
        interaction: discord.Interaction,
        output_type: app_commands.Choice[str],
        status: str
    ):
        # 이미 멤버인 경우
        if self.is_study_member(interaction.user):
            await interaction.response.send_message(
                "이미 스터디 멤버입니다! 🐰", ephemeral=True
            )
            return

        # 운영진에게 알림 보내기
        admin_role = interaction.guild.get_role(self.admin_role_id) if interaction.guild else None

        embed = discord.Embed(
            title="📬 새로운 가입 요청!",
            description=f"**{interaction.user.mention}**님이 스터디 가입을 요청했습니다.",
            color=discord.Color.blue()
        )
        embed.add_field(name="📝 희망 산출물", value=output_type.name, inline=True)
        embed.add_field(name="💼 현재 상황", value=status, inline=False)

        role_id = self.role_map.get(output_type.value)
        if role_id:
            embed.add_field(name="🏷️ 부여할 역할", value=f"<@&{role_id}>", inline=False)

        embed.set_footer(text="운영진이 역할을 부여하면 자동으로 멤버가 됩니다!")

        # 공지 채널에 전송
        announce_channel_id = int(os.getenv("ANNOUNCEMENT_CHANNEL_ID", 0))
        if announce_channel_id and interaction.guild:
            channel = interaction.guild.get_channel(announce_channel_id)
            if channel:
                admin_mention = admin_role.mention if admin_role else "운영진"
                await channel.send(f"{admin_mention}", embed=embed)

        # 요청자에게 응답
        await interaction.response.send_message(
            "✅ 가입 요청이 운영진에게 전달되었습니다!\n역할을 받으면 자동으로 스터디 멤버가 됩니다 🐰",
            ephemeral=True
        )

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
        # 역할 기반 멤버 확인
        if not self.is_study_member(interaction.user):
            await interaction.response.send_message(
                "스터디 멤버가 아닙니다. 역할을 받으면 자동으로 멤버가 됩니다!",
                ephemeral=True
            )
            return

        output_type = self.get_member_output_type(interaction.user)
        output_names = {
            "algorithm": "알고리즘/코테",
            "project": "사이드 프로젝트",
            "resume": "이력서/포폴",
            "all": "다하고싶은사람"
        }

        stats = await get_member_stats(interaction.user.id)

        embed = discord.Embed(
            title=f"🐰 {interaction.user.display_name}의 스터디 정보",
            color=discord.Color.blue()
        )
        embed.add_field(name="📝 주력 산출물", value=output_names.get(output_type, "-"), inline=True)
        embed.add_field(
            name="⚠️ 스트라이크",
            value=f"{'🔴' * stats['strikes']}{'⚪' * (3 - stats['strikes'])} ({stats['strikes']}/3)",
            inline=True
        )
        embed.add_field(name="📊 총 제출 수", value=str(stats["total_submissions"]), inline=True)
        embed.add_field(name="✅ 총 출석 수", value=str(stats["total_attendance"]), inline=True)

        if stats["submission_types"]:
            type_str = "\n".join(f"- {k}: {v}회" for k, v in stats["submission_types"].items())
            embed.add_field(name="📁 제출 유형별", value=type_str, inline=False)

        await interaction.response.send_message(embed=embed, ephemeral=True)

    @app_commands.command(name="members", description="활성 멤버 목록을 확인합니다")
    async def member_list(self, interaction: discord.Interaction):
        # 역할 기반으로 멤버 목록 가져오기
        if not interaction.guild:
            return

        output_names = {
            "algorithm": "알고리즘/코테",
            "project": "프로젝트",
            "resume": "이력서/포폴",
            "all": "다하고싶은사람"
        }

        members_by_type = {k: [] for k in self.role_map.keys()}

        for member in interaction.guild.members:
            if member.bot:
                continue
            for output_type, role_id in self.role_map.items():
                if any(role.id == role_id for role in member.roles):
                    members_by_type[output_type].append(member.display_name)
                    break

        total_count = sum(len(m) for m in members_by_type.values())

        embed = discord.Embed(
            title="🐰 스터디 멤버 목록",
            description=f"총 {total_count}명",
            color=discord.Color.blue()
        )

        for output_type, names in members_by_type.items():
            if names:
                embed.add_field(
                    name=f"{output_names.get(output_type, output_type)} ({len(names)}명)",
                    value=", ".join(names) or "-",
                    inline=False
                )

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="profile", description="프로필을 확인합니다")
    @app_commands.describe(member="확인할 멤버 (미입력시 본인)")
    async def view_profile(
        self,
        interaction: discord.Interaction,
        member: discord.Member = None
    ):
        target = member or interaction.user

        # 역할 기반 멤버 확인
        if not self.is_study_member(target):
            await interaction.response.send_message(
                "해당 멤버는 스터디 멤버가 아닙니다.",
                ephemeral=True
            )
            return

        profile = await get_profile(target.id)
        output_type = self.get_member_output_type(target)
        output_names = {
            "algorithm": "알고리즘/코테",
            "project": "사이드 프로젝트",
            "resume": "이력서/포폴",
            "all": "다하고싶은사람"
        }

        embed = discord.Embed(
            title=f"📇 {target.display_name}의 프로필",
            color=discord.Color.purple()
        )
        embed.set_thumbnail(url=target.display_avatar.url)

        # 기본 정보
        embed.add_field(name="🏷️ 산출물 유형", value=output_names.get(output_type, "-"), inline=True)

        if profile:
            if profile.get("intro"):
                embed.add_field(name="💬 자기소개", value=profile["intro"], inline=False)
            if profile.get("tech_stack"):
                embed.add_field(name="🛠️ 기술 스택", value=profile["tech_stack"], inline=False)
            if profile.get("goal"):
                embed.add_field(name="🎯 목표", value=profile["goal"], inline=False)

            links = []
            if profile.get("github"):
                links.append(f"[GitHub]({profile['github']})")
            if profile.get("blog"):
                links.append(f"[블로그]({profile['blog']})")
            if links:
                embed.add_field(name="🔗 링크", value=" | ".join(links), inline=False)
        else:
            embed.add_field(
                name="📝",
                value="`/profile-set`으로 프로필을 설정해보세요!",
                inline=False
            )

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="profile-set", description="프로필을 설정합니다")
    @app_commands.describe(
        github="GitHub 프로필 URL",
        blog="블로그 URL",
        intro="한 줄 자기소개",
        tech_stack="기술 스택 (예: Python, Java, Spring)",
        goal="이번 스터디 목표"
    )
    async def set_profile_cmd(
        self,
        interaction: discord.Interaction,
        github: str = None,
        blog: str = None,
        intro: str = None,
        tech_stack: str = None,
        goal: str = None
    ):
        # 역할 기반 멤버 확인
        if not self.is_study_member(interaction.user):
            await interaction.response.send_message(
                "스터디 멤버만 프로필을 설정할 수 있습니다.",
                ephemeral=True
            )
            return

        # 최소 하나는 입력해야 함
        if not any([github, blog, intro, tech_stack, goal]):
            await interaction.response.send_message(
                "최소 하나의 항목을 입력해주세요!",
                ephemeral=True
            )
            return

        await set_profile(
            user_id=interaction.user.id,
            github=github,
            blog=blog,
            intro=intro,
            tech_stack=tech_stack,
            goal=goal
        )

        embed = discord.Embed(
            title="✅ 프로필 업데이트 완료!",
            color=discord.Color.green()
        )

        if github:
            embed.add_field(name="GitHub", value=github, inline=False)
        if blog:
            embed.add_field(name="블로그", value=blog, inline=False)
        if intro:
            embed.add_field(name="자기소개", value=intro, inline=False)
        if tech_stack:
            embed.add_field(name="기술 스택", value=tech_stack, inline=False)
        if goal:
            embed.add_field(name="목표", value=goal, inline=False)

        embed.set_footer(text="/profile 로 내 프로필을 확인하세요!")

        await interaction.response.send_message(embed=embed, ephemeral=True)


async def setup(bot: commands.Bot):
    await bot.add_cog(Members(bot))
