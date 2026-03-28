import discord
from discord import app_commands
from discord.ext import commands
import random
from datetime import datetime, timedelta
from typing import Optional
import asyncio

# 뽀삐 상태 저장 (서버별)
poppi_states = {}


def get_poppi_state(guild_id: int) -> dict:
    """서버별 뽀삐 상태 가져오기"""
    if guild_id not in poppi_states:
        poppi_states[guild_id] = {
            "hunger": 50,  # 배고픔 (0~100, 높을수록 배고픔)
            "happiness": 70,  # 행복도 (0~100)
            "energy": 80,  # 에너지 (0~100)
            "last_fed": None,
            "last_pet": None,
            "last_walk": None,
        }
    return poppi_states[guild_id]


def get_mood_emoji(state: dict) -> str:
    """뽀삐 기분에 따른 이모지"""
    avg = (100 - state["hunger"] + state["happiness"] + state["energy"]) / 3
    if avg >= 80:
        return "🐶✨"
    elif avg >= 60:
        return "🐶"
    elif avg >= 40:
        return "🐕"
    else:
        return "🐕💦"


class Poppi(commands.Cog):
    """뽀삐 인터랙션 기능"""

    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @app_commands.command(name="뽀삐", description="뽀삐 상태를 확인해요")
    async def poppi_status(self, interaction: discord.Interaction):
        """뽀삐 상태 확인"""
        state = get_poppi_state(interaction.guild_id)
        mood = get_mood_emoji(state)

        # 배고픔 바
        hunger_bar = self._create_bar(100 - state["hunger"])
        happy_bar = self._create_bar(state["happiness"])
        energy_bar = self._create_bar(state["energy"])

        embed = discord.Embed(
            title=f"{mood} 뽀삐 상태",
            description="안녕! 나는 뽀삐야!",
            color=discord.Color.pink()
        )

        embed.add_field(
            name="🍖 배부름",
            value=hunger_bar,
            inline=False
        )
        embed.add_field(
            name="💖 행복도",
            value=happy_bar,
            inline=False
        )
        embed.add_field(
            name="⚡ 에너지",
            value=energy_bar,
            inline=False
        )

        # 뽀삐 한마디
        comments = self._get_poppi_comment(state)
        embed.set_footer(text=comments)

        await interaction.response.send_message(embed=embed)

    def _create_bar(self, value: int) -> str:
        """상태바 생성"""
        filled = int(value / 10)
        empty = 10 - filled
        return f"{'█' * filled}{'░' * empty} {value}%"

    def _get_poppi_comment(self, state: dict) -> str:
        """상태에 따른 뽀삐 코멘트"""
        if state["hunger"] >= 70:
            return "뽀삐: 배고파... 밥줘... 🥺"
        elif state["happiness"] <= 30:
            return "뽀삐: 심심해... 쓰담쓰담해줘..."
        elif state["energy"] <= 30:
            return "뽀삐: 졸려... zzZ"
        elif state["happiness"] >= 80 and state["hunger"] <= 30:
            return "뽀삐: 기분 최고! 💕"
        else:
            return "뽀삐: 헤헤 😊"

    @app_commands.command(name="짖어", description="뽀삐가 짖어요")
    async def bark(self, interaction: discord.Interaction):
        """뽀삐 짖기"""
        state = get_poppi_state(interaction.guild_id)

        barks = [
            "멍멍! 🐶",
            "왈왈! 왈왈왈!",
            "멍! 멍멍멍!",
            "왈! (꼬리 흔들흔들)",
            "멍멍! (신남)",
            "...왈? (갸우뚱)",
            "멍! 멍! 멍! (흥분)",
            "으르르... 멍! (장난)",
        ]

        # 상태에 따른 특별 반응
        if state["hunger"] >= 80:
            response = "...멍... (힘없이) 배고파..."
        elif state["happiness"] >= 90:
            response = "멍멍멍멍멍!!! (미친듯이 꼬리 흔듦) 💕✨"
        elif state["energy"] <= 20:
            response = "...멍... zzZ (졸림)"
        else:
            response = random.choice(barks)

        embed = discord.Embed(
            description=f"🐶 **뽀삐**: {response}",
            color=discord.Color.gold()
        )

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="밥줘", description="뽀삐에게 밥을 줘요")
    async def feed(self, interaction: discord.Interaction):
        """뽀삐 밥주기"""
        state = get_poppi_state(interaction.guild_id)
        now = datetime.now()

        # 쿨타임 체크 (1분)
        if state["last_fed"]:
            diff = now - state["last_fed"]
            if diff < timedelta(minutes=1):
                remaining = 60 - diff.seconds
                await interaction.response.send_message(
                    f"🐶 뽀삐: 아직 배불러... ({remaining}초 후에 다시 줘!)",
                    ephemeral=True
                )
                return

        # 밥 먹기
        old_hunger = state["hunger"]
        state["hunger"] = max(0, state["hunger"] - 30)
        state["happiness"] = min(100, state["happiness"] + 10)
        state["last_fed"] = now

        reactions = [
            "냠냠냠! 맛있다! 🍖",
            "와! 밥이다! 냠냠냠 (허겁지겁)",
            "고마워! 냠냠 (꼬리 흔듦)",
            "헤헤 밥 최고! 냠냠냠~",
            "(입 주변에 밥풀 묻히며) 냠냠!",
        ]

        if old_hunger >= 70:
            reaction = "드디어 밥이다!!! 냠냠냠냠냠!!! (급하게 먹음) 🍖✨"
        else:
            reaction = random.choice(reactions)

        embed = discord.Embed(
            title="🍖 밥 타임!",
            description=f"**뽀삐**: {reaction}",
            color=discord.Color.orange()
        )
        embed.add_field(
            name="배부름",
            value=f"{'█' * int((100-state['hunger'])/10)}{'░' * (10-int((100-state['hunger'])/10))}",
            inline=False
        )

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="쓰담", description="뽀삐를 쓰다듬어요")
    async def pet(self, interaction: discord.Interaction):
        """뽀삐 쓰다듬기"""
        state = get_poppi_state(interaction.guild_id)
        now = datetime.now()

        # 쿨타임 체크 (30초)
        if state["last_pet"]:
            diff = now - state["last_pet"]
            if diff < timedelta(seconds=30):
                remaining = 30 - diff.seconds
                await interaction.response.send_message(
                    f"🐶 뽀삐: 잠깐만! 털 정리 중... ({remaining}초 후에!)",
                    ephemeral=True
                )
                return

        state["happiness"] = min(100, state["happiness"] + 15)
        state["last_pet"] = now

        reactions = [
            "(눈 감고 기분 좋아함) 흐흐흐...",
            "(꼬리 살랑살랑) 좋아좋아~",
            "헤헤... 더 쓰담쓰담해줘...",
            "(배 보여주며 드러눕기) ...",
            "(기분 좋아서 발 동동) 💕",
            "(눈 초롱초롱) 나 예뻐?",
            "으앙 기분 좋아!! (뒹굴뒹굴)",
        ]

        embed = discord.Embed(
            description=f"✋🐶 *쓰담쓰담*\n\n**뽀삐**: {random.choice(reactions)}",
            color=discord.Color.pink()
        )
        embed.add_field(name="행복도", value=f"+15 💖 (현재 {state['happiness']}%)", inline=False)

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="간식", description="뽀삐에게 간식을 줘요")
    async def treat(self, interaction: discord.Interaction):
        """뽀삐 간식주기"""
        state = get_poppi_state(interaction.guild_id)

        state["hunger"] = max(0, state["hunger"] - 10)
        state["happiness"] = min(100, state["happiness"] + 20)

        treats = ["🦴 뼈다귀", "🥕 당근", "🍪 쿠키", "🧀 치즈", "🍖 육포"]
        chosen_treat = random.choice(treats)

        reactions = [
            f"와! {chosen_treat}다!! (눈 반짝반짝)",
            f"(침 흘리며) {chosen_treat}... 줘...줘!!",
            f"(냠냠) {chosen_treat} 맛있어!! 💕",
            f"(꼬리 마구 흔듦) {chosen_treat}!!!!!",
            f"헤헤 {chosen_treat} 최고야~",
        ]

        embed = discord.Embed(
            title="🦴 간식 타임!",
            description=f"**뽀삐**: {random.choice(reactions)}",
            color=discord.Color.purple()
        )

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="산책", description="뽀삐와 산책해요")
    async def walk(self, interaction: discord.Interaction):
        """뽀삐 산책"""
        state = get_poppi_state(interaction.guild_id)
        now = datetime.now()

        # 쿨타임 체크 (3분)
        if state["last_walk"]:
            diff = now - state["last_walk"]
            if diff < timedelta(minutes=3):
                remaining = 180 - diff.seconds
                mins = remaining // 60
                secs = remaining % 60
                await interaction.response.send_message(
                    f"🐶 뽀삐: 아직 지쳤어... ({mins}분 {secs}초 후에 가자!)",
                    ephemeral=True
                )
                return

        # 에너지 체크
        if state["energy"] < 20:
            await interaction.response.send_message(
                "🐶 뽀삐: 너무 피곤해... 좀 쉬고 가자... 💦",
                ephemeral=True
            )
            return

        state["energy"] = max(0, state["energy"] - 20)
        state["happiness"] = min(100, state["happiness"] + 25)
        state["hunger"] = min(100, state["hunger"] + 15)  # 운동하면 배고파짐
        state["last_walk"] = now

        events = [
            "🌳 공원에서 다람쥐를 발견했다! (쫓아가려다 멈춤)",
            "🦋 나비를 잡으려고 뛰어다녔다!",
            "🐕 다른 강아지 친구를 만났다! (꼬리 흔들흔들)",
            "🌸 꽃밭에서 뒹굴었다!",
            "💨 신나게 뛰어다녔다!",
            "🦆 오리를 구경했다! (궁금해함)",
            "🎾 공놀이를 했다! (물어오기 성공!)",
        ]

        embed = discord.Embed(
            title="🚶 산책 타임!",
            description=f"뽀삐와 산책을 다녀왔어요!\n\n{random.choice(events)}",
            color=discord.Color.green()
        )
        embed.add_field(name="행복도", value=f"+25 💖", inline=True)
        embed.add_field(name="에너지", value=f"-20 ⚡", inline=True)
        embed.add_field(name="배고픔", value=f"+15 🍖", inline=True)

        embed.set_footer(text="뽀삐: 산책 재밌었어! 💕")

        await interaction.response.send_message(embed=embed)

    @app_commands.command(name="재워", description="뽀삐를 재워요")
    async def sleep(self, interaction: discord.Interaction):
        """뽀삐 재우기"""
        state = get_poppi_state(interaction.guild_id)

        if state["energy"] >= 80:
            await interaction.response.send_message(
                "🐶 뽀삐: 안 졸려! 놀자! (뛰어다님)",
                ephemeral=True
            )
            return

        old_energy = state["energy"]
        state["energy"] = min(100, state["energy"] + 40)

        sleep_msgs = [
            "(동글동글 말려서 잠듦) zzZ...",
            "(발 씰룩씰룩) 꿈 꾸는 중... zzZ",
            "(코 골며 잠듦) 크... zzZ...",
            "(배 보이며 뻗어서 잠듦) zzZ...",
            "(가끔 귀 씰룩) ...zzZ...",
        ]

        embed = discord.Embed(
            title="😴 취침 타임!",
            description=f"**뽀삐**: {random.choice(sleep_msgs)}",
            color=discord.Color.dark_blue()
        )
        embed.add_field(
            name="에너지 회복",
            value=f"{old_energy}% → {state['energy']}% ⚡",
            inline=False
        )

        await interaction.response.send_message(embed=embed)

    # ============ 관리자 유틸리티 ============

    @app_commands.command(name="청소", description="[관리자] 메시지를 삭제합니다")
    @app_commands.describe(
        count="삭제할 메시지 수 (1~100)",
        user="특정 유저의 메시지만 삭제 (선택사항)"
    )
    @app_commands.default_permissions(manage_messages=True)
    async def purge(
        self,
        interaction: discord.Interaction,
        count: int,
        user: discord.Member = None
    ):
        """메시지 일괄 삭제"""
        if count < 1 or count > 100:
            await interaction.response.send_message(
                "1~100 사이의 숫자를 입력해주세요.",
                ephemeral=True
            )
            return

        await interaction.response.defer(ephemeral=True)

        channel = interaction.channel

        # 메시지 삭제
        if user:
            # 특정 유저의 메시지만 삭제
            deleted = []
            async for message in channel.history(limit=100):
                if message.author.id == user.id and len(deleted) < count:
                    deleted.append(message)

            if deleted:
                await channel.delete_messages(deleted)
            deleted_count = len(deleted)
        else:
            # 모든 메시지 삭제
            deleted = await channel.purge(limit=count)
            deleted_count = len(deleted)

        # 결과 메시지
        embed = discord.Embed(
            title="🧹 청소 완료!",
            description=f"**{deleted_count}개**의 메시지를 삭제했습니다.",
            color=discord.Color.green()
        )
        if user:
            embed.add_field(name="대상", value=user.mention, inline=True)

        embed.set_footer(text="뽀삐: 깨끗해졌다! ✨")

        await interaction.followup.send(embed=embed, ephemeral=True)

    @app_commands.command(name="purge", description="[Admin] Delete messages")
    @app_commands.describe(
        count="Number of messages to delete (1~100)",
        user="Delete only this user's messages (optional)"
    )
    @app_commands.default_permissions(manage_messages=True)
    async def purge_en(
        self,
        interaction: discord.Interaction,
        count: int,
        user: discord.Member = None
    ):
        """English alias for purge command"""
        await self.purge.callback(self, interaction, count, user)


async def setup(bot: commands.Bot):
    await bot.add_cog(Poppi(bot))
