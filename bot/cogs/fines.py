import discord
from discord import app_commands
from discord.ext import commands
from bot.utils.database import (
    add_fine, get_fines, get_user_fine_summary, get_all_fines_summary, pay_fine
)
import os


class Fines(commands.Cog):
    """벌금 관리 시스템"""

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

    def format_amount(self, amount: int) -> str:
        """금액 포맷팅 (원 단위)"""
        return f"{amount:,}원"

    @app_commands.command(name="fine", description="[관리자] 멤버에게 벌금을 부과합니다")
    @app_commands.describe(
        member="벌금을 부과할 멤버",
        amount="벌금 금액 (원)",
        reason="벌금 부과 사유"
    )
    @app_commands.default_permissions(administrator=True)
    async def issue_fine(
        self,
        interaction: discord.Interaction,
        member: discord.Member,
        amount: int,
        reason: str
    ):
        # 역할 기반 멤버 확인
        if not self.is_study_member(member):
            await interaction.response.send_message(
                "해당 멤버는 스터디 멤버가 아닙니다.",
                ephemeral=True
            )
            return

        # 금액 유효성 검사
        if amount <= 0:
            await interaction.response.send_message(
                "벌금 금액은 0원보다 커야 합니다.",
                ephemeral=True
            )
            return

        # 벌금 부과
        fine_id = await add_fine(
            user_id=member.id,
            amount=amount,
            reason=reason,
            issued_by=interaction.user.id
        )

        # 현재 벌금 요약 조회
        summary = await get_user_fine_summary(member.id)

        embed = discord.Embed(
            title="벌금 부과",
            color=discord.Color.red()
        )
        embed.add_field(name="대상", value=member.display_name, inline=True)
        embed.add_field(name="부과 금액", value=self.format_amount(amount), inline=True)
        embed.add_field(name="사유", value=reason, inline=False)
        embed.add_field(
            name="누적 미납 벌금",
            value=f"{self.format_amount(summary['unpaid_amount'])} ({summary['unpaid_count']}건)",
            inline=False
        )
        embed.set_footer(text=f"벌금 ID: {fine_id}")

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="fine-status", description="내 벌금 현황을 확인합니다")
    async def fine_status(self, interaction: discord.Interaction):
        user_id = interaction.user.id

        # 벌금 요약 조회
        summary = await get_user_fine_summary(user_id)
        fines = await get_fines(user_id)

        embed = discord.Embed(
            title=f"{interaction.user.display_name}님의 벌금 현황",
            color=discord.Color.orange() if summary["unpaid_amount"] > 0 else discord.Color.green()
        )

        # 요약 정보
        embed.add_field(
            name="총 벌금",
            value=self.format_amount(summary["total_amount"]),
            inline=True
        )
        embed.add_field(
            name="납부 완료",
            value=self.format_amount(summary["paid_amount"]),
            inline=True
        )
        embed.add_field(
            name="미납 잔액",
            value=f"{self.format_amount(summary['unpaid_amount'])} ({summary['unpaid_count']}건)",
            inline=True
        )

        # 최근 벌금 기록 (최대 5건)
        if fines:
            records = []
            for f in fines[:5]:
                status = "납부 완료" if f["is_paid"] else "미납"
                issued_date = f["issued_at"][:10]
                records.append(
                    f"[{status}] {issued_date} - {self.format_amount(f['amount'])}\n  └ {f['reason']}"
                )
            embed.add_field(
                name="최근 벌금 기록",
                value="\n".join(records),
                inline=False
            )
        else:
            embed.add_field(
                name="벌금 기록",
                value="벌금 기록이 없습니다!",
                inline=False
            )

        await interaction.response.send_message(embed=embed, ephemeral=True)

    @app_commands.command(name="fine-list", description="[관리자] 전체 벌금 현황을 확인합니다")
    @app_commands.default_permissions(administrator=True)
    async def fine_list(self, interaction: discord.Interaction):
        # 전체 벌금 현황 조회
        all_fines = await get_all_fines_summary()

        if not all_fines:
            await interaction.response.send_message(
                "등록된 벌금 기록이 없습니다.",
                ephemeral=True
            )
            return

        embed = discord.Embed(
            title="전체 벌금 현황",
            color=discord.Color.gold()
        )

        # 총계 계산
        total_unpaid = sum(f["unpaid_amount"] for f in all_fines)
        total_paid = sum(f["paid_amount"] for f in all_fines)

        embed.add_field(
            name="전체 미납 합계",
            value=self.format_amount(total_unpaid),
            inline=True
        )
        embed.add_field(
            name="전체 납부 합계",
            value=self.format_amount(total_paid),
            inline=True
        )
        embed.add_field(name="\u200b", value="\u200b", inline=True)

        # 미납 벌금이 있는 멤버 목록
        unpaid_members = [f for f in all_fines if f["unpaid_amount"] > 0]
        if unpaid_members:
            member_list = []
            for f in unpaid_members[:15]:  # 최대 15명
                username = f["username"] or f"<@{f['user_id']}>"
                member_list.append(
                    f"**{username}**: {self.format_amount(f['unpaid_amount'])} ({f['unpaid_count']}건)"
                )
            embed.add_field(
                name="미납 현황",
                value="\n".join(member_list),
                inline=False
            )

            if len(unpaid_members) > 15:
                embed.set_footer(text=f"...외 {len(unpaid_members) - 15}명")
        else:
            embed.add_field(
                name="미납 현황",
                value="모든 벌금이 납부 완료되었습니다!",
                inline=False
            )

        await interaction.response.send_message(embed=embed, ephemeral=True)

    @app_commands.command(name="fine-paid", description="[관리자] 벌금 납부를 처리합니다")
    @app_commands.describe(
        member="납부한 멤버",
        amount="납부 금액 (원)"
    )
    @app_commands.default_permissions(administrator=True)
    async def mark_fine_paid(
        self,
        interaction: discord.Interaction,
        member: discord.Member,
        amount: int
    ):
        # 금액 유효성 검사
        if amount <= 0:
            await interaction.response.send_message(
                "납부 금액은 0원보다 커야 합니다.",
                ephemeral=True
            )
            return

        # 납부 전 요약 조회
        before_summary = await get_user_fine_summary(member.id)

        if before_summary["unpaid_amount"] == 0:
            await interaction.response.send_message(
                f"{member.display_name}님은 미납 벌금이 없습니다.",
                ephemeral=True
            )
            return

        # 납부 처리
        paid_amount = await pay_fine(member.id, amount)

        if paid_amount == 0:
            await interaction.response.send_message(
                "납부 처리할 벌금이 없습니다.",
                ephemeral=True
            )
            return

        # 납부 후 요약 조회
        after_summary = await get_user_fine_summary(member.id)

        embed = discord.Embed(
            title="벌금 납부 처리",
            color=discord.Color.green()
        )
        embed.add_field(name="대상", value=member.display_name, inline=True)
        embed.add_field(name="납부 금액", value=self.format_amount(paid_amount), inline=True)
        embed.add_field(
            name="납부 전 미납 잔액",
            value=self.format_amount(before_summary["unpaid_amount"]),
            inline=True
        )
        embed.add_field(
            name="납부 후 미납 잔액",
            value=self.format_amount(after_summary["unpaid_amount"]),
            inline=True
        )

        if after_summary["unpaid_amount"] == 0:
            embed.add_field(
                name="완납",
                value="모든 벌금이 납부 완료되었습니다!",
                inline=False
            )

        await interaction.response.send_message(embed=embed, ephemeral=True)


async def setup(bot: commands.Bot):
    await bot.add_cog(Fines(bot))
