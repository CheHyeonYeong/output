import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.database import (
    add_resource, get_resource, delete_resource,
    search_resources, get_user_resources, get_all_categories,
    get_resource_stats
)
import os


# 카테고리 목록
CATEGORIES = [
    ("article", "아티클/블로그"),
    ("video", "영상/강의"),
    ("book", "책/문서"),
    ("tool", "도구/사이트"),
    ("github", "GitHub 레포"),
    ("etc", "기타"),
]

CATEGORY_CHOICES = [
    app_commands.Choice(name=name, value=value)
    for value, name in CATEGORIES
]

CATEGORY_NAMES = {value: name for value, name in CATEGORIES}


class Resources(commands.Cog):
    """자료실 - 유용한 자료 공유"""

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

    @app_commands.command(name="자료등록", description="유용한 자료를 공유합니다")
    @app_commands.describe(
        title="자료 제목",
        category="카테고리",
        url="URL (선택)",
        description="설명 (선택)",
        tags="태그 (쉼표로 구분, 예: java,spring,백엔드)"
    )
    @app_commands.choices(category=CATEGORY_CHOICES)
    async def add_resource_cmd(
        self,
        interaction: discord.Interaction,
        title: str,
        category: app_commands.Choice[str],
        url: str = None,
        description: str = None,
        tags: str = None
    ):
        if not self.is_study_member(interaction.user):
            await interaction.response.send_message(
                "스터디 멤버만 자료를 등록할 수 있습니다.",
                ephemeral=True
            )
            return

        resource_id = await add_resource(
            user_id=interaction.user.id,
            title=title,
            category=category.value,
            url=url,
            description=description,
            tags=tags
        )

        embed = discord.Embed(
            title="자료 등록 완료",
            color=discord.Color.green()
        )
        embed.add_field(name="제목", value=title, inline=False)
        embed.add_field(name="카테고리", value=category.name, inline=True)
        embed.add_field(name="ID", value=f"`{resource_id}`", inline=True)

        if url:
            embed.add_field(name="URL", value=url, inline=False)
        if description:
            embed.add_field(name="설명", value=description, inline=False)
        if tags:
            embed.add_field(name="태그", value=tags, inline=False)

        embed.set_footer(text=f"등록자: {interaction.user.display_name}")

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="자료검색", description="자료를 검색합니다")
    @app_commands.describe(
        keyword="검색어 (제목, 설명, 태그에서 검색)",
        category="카테고리 필터 (선택)"
    )
    @app_commands.choices(category=CATEGORY_CHOICES)
    async def search_resource_cmd(
        self,
        interaction: discord.Interaction,
        keyword: str = None,
        category: app_commands.Choice[str] = None
    ):
        if not keyword and not category:
            await interaction.response.send_message(
                "검색어 또는 카테고리를 입력해주세요.",
                ephemeral=True
            )
            return

        await interaction.response.defer()

        results = await search_resources(
            keyword=keyword,
            category=category.value if category else None,
            limit=15
        )

        if not results:
            await interaction.followup.send(
                "검색 결과가 없습니다.",
                ephemeral=True
            )
            return

        search_desc = []
        if keyword:
            search_desc.append(f"검색어: `{keyword}`")
        if category:
            search_desc.append(f"카테고리: {category.name}")

        embed = discord.Embed(
            title=f"자료 검색 결과 ({len(results)}건)",
            description=" | ".join(search_desc),
            color=discord.Color.blue()
        )

        for r in results[:10]:
            cat_name = CATEGORY_NAMES.get(r["category"], r["category"])
            value_parts = []

            if r.get("url"):
                value_parts.append(f"[링크]({r['url']})")
            if r.get("description"):
                desc = r["description"][:50] + "..." if len(r["description"]) > 50 else r["description"]
                value_parts.append(desc)
            if r.get("tags"):
                value_parts.append(f"`{r['tags']}`")

            value_parts.append(f"by {r.get('username', '알 수 없음')}")

            embed.add_field(
                name=f"[{cat_name}] {r['title']} (#{r['id']})",
                value=" | ".join(value_parts) if value_parts else "-",
                inline=False
            )

        if len(results) > 10:
            embed.set_footer(text=f"외 {len(results) - 10}건 더 있음")

        await interaction.followup.send(embed=embed)

    @app_commands.command(name="자료보기", description="자료 상세 정보를 확인합니다")
    @app_commands.describe(resource_id="자료 ID")
    async def view_resource_cmd(
        self,
        interaction: discord.Interaction,
        resource_id: int
    ):
        resource = await get_resource(resource_id)

        if not resource:
            await interaction.response.send_message(
                "해당 자료를 찾을 수 없습니다.",
                ephemeral=True
            )
            return

        cat_name = CATEGORY_NAMES.get(resource["category"], resource["category"])

        embed = discord.Embed(
            title=resource["title"],
            color=discord.Color.blue()
        )
        embed.add_field(name="카테고리", value=cat_name, inline=True)
        embed.add_field(name="등록자", value=resource.get("username", "알 수 없음"), inline=True)
        embed.add_field(name="등록일", value=resource["created_at"][:10], inline=True)

        if resource.get("url"):
            embed.add_field(name="URL", value=resource["url"], inline=False)
        if resource.get("description"):
            embed.add_field(name="설명", value=resource["description"], inline=False)
        if resource.get("tags"):
            embed.add_field(name="태그", value=resource["tags"], inline=False)

        embed.set_footer(text=f"ID: {resource_id}")

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="내자료", description="내가 등록한 자료 목록을 확인합니다")
    async def my_resources_cmd(self, interaction: discord.Interaction):
        resources = await get_user_resources(interaction.user.id)

        if not resources:
            await interaction.response.send_message(
                "등록한 자료가 없습니다. `/자료등록`으로 자료를 공유해보세요!",
                ephemeral=True
            )
            return

        embed = discord.Embed(
            title=f"{interaction.user.display_name}의 자료 ({len(resources)}건)",
            color=discord.Color.purple()
        )

        for r in resources[:15]:
            cat_name = CATEGORY_NAMES.get(r["category"], r["category"])
            value = f"[{cat_name}]"
            if r.get("url"):
                value += f" [링크]({r['url']})"

            embed.add_field(
                name=f"#{r['id']} {r['title']}",
                value=value,
                inline=False
            )

        await interaction.response.send_message(embed=embed, ephemeral=True)

    @app_commands.command(name="자료삭제", description="내가 등록한 자료를 삭제합니다")
    @app_commands.describe(resource_id="삭제할 자료 ID")
    async def delete_resource_cmd(
        self,
        interaction: discord.Interaction,
        resource_id: int
    ):
        success = await delete_resource(resource_id, interaction.user.id)

        if success:
            await interaction.response.send_message(
                f"자료 #{resource_id}가 삭제되었습니다.",
                ephemeral=True
            )
        else:
            await interaction.response.send_message(
                "삭제할 수 없습니다. 본인이 등록한 자료만 삭제할 수 있습니다.",
                ephemeral=True
            )

    @app_commands.command(name="자료통계", description="자료실 통계를 확인합니다")
    async def resource_stats_cmd(self, interaction: discord.Interaction):
        stats = await get_resource_stats()

        embed = discord.Embed(
            title="자료실 통계",
            color=discord.Color.gold()
        )

        embed.add_field(name="총 자료 수", value=f"{stats['total']}건", inline=True)
        embed.add_field(name="기여자 수", value=f"{stats['contributors']}명", inline=True)

        if stats["by_category"]:
            cat_text = "\n".join(
                f"• {CATEGORY_NAMES.get(cat, cat)}: {count}건"
                for cat, count in sorted(stats["by_category"].items(), key=lambda x: -x[1])
            )
            embed.add_field(name="카테고리별", value=cat_text, inline=False)

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="자료목록", description="카테고리별 자료 목록을 확인합니다")
    @app_commands.describe(category="카테고리")
    @app_commands.choices(category=CATEGORY_CHOICES)
    async def list_by_category_cmd(
        self,
        interaction: discord.Interaction,
        category: app_commands.Choice[str]
    ):
        await interaction.response.defer()

        results = await search_resources(category=category.value, limit=20)

        if not results:
            await interaction.followup.send(
                f"{category.name} 카테고리에 등록된 자료가 없습니다.",
                ephemeral=True
            )
            return

        embed = discord.Embed(
            title=f"{category.name} 자료 ({len(results)}건)",
            color=discord.Color.blue()
        )

        for r in results[:15]:
            value_parts = []
            if r.get("url"):
                value_parts.append(f"[링크]({r['url']})")
            if r.get("tags"):
                value_parts.append(f"`{r['tags']}`")
            value_parts.append(f"by {r.get('username', '?')}")

            embed.add_field(
                name=f"#{r['id']} {r['title']}",
                value=" | ".join(value_parts),
                inline=False
            )

        if len(results) > 15:
            embed.set_footer(text=f"외 {len(results) - 15}건")

        await interaction.followup.send(embed=embed)


async def setup(bot: commands.Bot):
    await bot.add_cog(Resources(bot))
