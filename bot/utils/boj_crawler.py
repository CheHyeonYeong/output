"""
백준 문제집 크롤러
- 문제집에서 문제 번호 추출
- 문제 추천 기능
"""
import aiohttp
import random
from datetime import datetime
from bs4 import BeautifulSoup
from typing import Optional
import re

# 삼성 SW 역량 테스트 기출 문제집
SAMSUNG_WORKBOOK_URL = "https://www.acmicpc.net/workbook/view/4349"

# 캐시 (문제 목록)
_problem_cache: dict = {}
_cache_time: Optional[datetime] = None
CACHE_DURATION_HOURS = 24


async def fetch_workbook_problems(workbook_url: str = SAMSUNG_WORKBOOK_URL) -> list[dict]:
    """
    백준 문제집에서 문제 목록 크롤링

    Returns:
        [{"number": 14499, "title": "주사위 굴리기"}, ...]
    """
    global _problem_cache, _cache_time

    # 캐시 확인
    cache_key = workbook_url
    if cache_key in _problem_cache and _cache_time:
        cache_age = (datetime.now() - _cache_time).total_seconds() / 3600
        if cache_age < CACHE_DURATION_HOURS:
            return _problem_cache[cache_key]

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
    }

    problems = []

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(workbook_url, headers=headers) as response:
                if response.status != 200:
                    # 크롤링 실패 시 하드코딩된 목록 반환
                    return get_fallback_samsung_problems()

                html = await response.text()
                soup = BeautifulSoup(html, "html.parser")

                # 문제 테이블 찾기
                table = soup.find("table", {"id": "problemset"})
                if not table:
                    table = soup.find("table", class_="table")

                if table:
                    rows = table.find_all("tr")[1:]  # 헤더 제외
                    for row in rows:
                        cols = row.find_all("td")
                        if len(cols) >= 2:
                            # 문제 번호
                            number_cell = cols[0]
                            number_link = number_cell.find("a")
                            if number_link:
                                number = number_link.get_text(strip=True)
                            else:
                                number = number_cell.get_text(strip=True)

                            # 문제 제목
                            title_cell = cols[1]
                            title_link = title_cell.find("a")
                            if title_link:
                                title = title_link.get_text(strip=True)
                            else:
                                title = title_cell.get_text(strip=True)

                            if number.isdigit():
                                problems.append({
                                    "number": int(number),
                                    "title": title
                                })

                # 캐시 저장
                if problems:
                    _problem_cache[cache_key] = problems
                    _cache_time = datetime.now()
                    return problems

    except Exception as e:
        print(f"백준 크롤링 실패: {e}")

    # 실패 시 폴백
    return get_fallback_samsung_problems()


def get_fallback_samsung_problems() -> list[dict]:
    """
    크롤링 실패 시 사용할 삼성 SW 역량테스트 기출 문제 목록
    (2024년 기준 주요 문제들)
    """
    return [
        {"number": 13460, "title": "구슬 탈출 2"},
        {"number": 12100, "title": "2048 (Easy)"},
        {"number": 3190, "title": "뱀"},
        {"number": 13458, "title": "시험 감독"},
        {"number": 14499, "title": "주사위 굴리기"},
        {"number": 14500, "title": "테트로미노"},
        {"number": 14501, "title": "퇴사"},
        {"number": 14502, "title": "연구소"},
        {"number": 14503, "title": "로봇 청소기"},
        {"number": 14888, "title": "연산자 끼워넣기"},
        {"number": 14889, "title": "스타트와 링크"},
        {"number": 14890, "title": "경사로"},
        {"number": 14891, "title": "톱니바퀴"},
        {"number": 15683, "title": "감시"},
        {"number": 15684, "title": "사다리 조작"},
        {"number": 15685, "title": "드래곤 커브"},
        {"number": 15686, "title": "치킨 배달"},
        {"number": 16234, "title": "인구 이동"},
        {"number": 16235, "title": "나무 재테크"},
        {"number": 16236, "title": "아기 상어"},
        {"number": 17140, "title": "이차원 배열과 연산"},
        {"number": 17141, "title": "연구소 2"},
        {"number": 17142, "title": "연구소 3"},
        {"number": 17143, "title": "낚시왕"},
        {"number": 17144, "title": "미세먼지 안녕!"},
        {"number": 17779, "title": "게리맨더링 2"},
        {"number": 17780, "title": "새로운 게임"},
        {"number": 17822, "title": "원판 돌리기"},
        {"number": 17825, "title": "주사위 윷놀이"},
        {"number": 17837, "title": "새로운 게임 2"},
        {"number": 19235, "title": "모노미노도미노"},
        {"number": 19236, "title": "청소년 상어"},
        {"number": 19237, "title": "어른 상어"},
        {"number": 19238, "title": "스타트 택시"},
        {"number": 20055, "title": "컨베이어 벨트 위의 로봇"},
        {"number": 20056, "title": "마법사 상어와 파이어볼"},
        {"number": 20057, "title": "마법사 상어와 토네이도"},
        {"number": 20058, "title": "마법사 상어와 파이어스톰"},
        {"number": 20061, "title": "모노미노도미노 2"},
        {"number": 21608, "title": "상어 초등학교"},
        {"number": 21609, "title": "상어 중학교"},
        {"number": 21610, "title": "마법사 상어와 비바라기"},
        {"number": 21611, "title": "마법사 상어와 블리자드"},
        {"number": 23288, "title": "주사위 굴리기 2"},
        {"number": 23289, "title": "온풍기 안녕!"},
        {"number": 23290, "title": "마법사 상어와 복제"},
        {"number": 23291, "title": "어항 정리"},
    ]


def get_random_problem(problems: list[dict], count: int = 1) -> list[dict]:
    """랜덤 문제 추천"""
    if not problems:
        return []
    count = min(count, len(problems))
    return random.sample(problems, count)


def get_daily_problem(problems: list[dict]) -> dict:
    """오늘의 문제 (날짜 기반 시드)"""
    if not problems:
        return None

    today = datetime.now().strftime("%Y-%m-%d")
    seed = int(today.replace("-", ""))
    random.seed(seed)
    problem = random.choice(problems)
    random.seed()  # 시드 초기화
    return problem


def get_problem_url(problem_number: int) -> str:
    """문제 URL 생성"""
    return f"https://www.acmicpc.net/problem/{problem_number}"


# 추가 문제집 URL들
WORKBOOK_URLS = {
    "samsung": "https://www.acmicpc.net/workbook/view/4349",      # 삼성 SW 역량테스트 기출
    "samsung2": "https://www.acmicpc.net/workbook/view/4344",     # 삼성 A형 기출
    "kakao": "https://www.acmicpc.net/workbook/view/1152",        # 카카오 기출
    "line": "https://www.acmicpc.net/workbook/view/1153",         # 라인 기출
}


def get_fallback_samsung2_problems() -> list[dict]:
    """
    삼성 A형 기출 문제 목록 (4344 문제집)
    """
    return [
        {"number": 13460, "title": "구슬 탈출 2"},
        {"number": 12100, "title": "2048 (Easy)"},
        {"number": 3190, "title": "뱀"},
        {"number": 14499, "title": "주사위 굴리기"},
        {"number": 14500, "title": "테트로미노"},
        {"number": 14501, "title": "퇴사"},
        {"number": 14502, "title": "연구소"},
        {"number": 14503, "title": "로봇 청소기"},
        {"number": 14888, "title": "연산자 끼워넣기"},
        {"number": 14889, "title": "스타트와 링크"},
        {"number": 14890, "title": "경사로"},
        {"number": 14891, "title": "톱니바퀴"},
        {"number": 15683, "title": "감시"},
        {"number": 15684, "title": "사다리 조작"},
        {"number": 15685, "title": "드래곤 커브"},
        {"number": 15686, "title": "치킨 배달"},
        {"number": 16234, "title": "인구 이동"},
        {"number": 16235, "title": "나무 재테크"},
        {"number": 16236, "title": "아기 상어"},
        {"number": 17140, "title": "이차원 배열과 연산"},
        {"number": 17143, "title": "낚시왕"},
        {"number": 17144, "title": "미세먼지 안녕!"},
        {"number": 17779, "title": "게리맨더링 2"},
        {"number": 17822, "title": "원판 돌리기"},
        {"number": 17825, "title": "주사위 윷놀이"},
        {"number": 17837, "title": "새로운 게임 2"},
        {"number": 19236, "title": "청소년 상어"},
        {"number": 19237, "title": "어른 상어"},
        {"number": 19238, "title": "스타트 택시"},
        {"number": 20055, "title": "컨베이어 벨트 위의 로봇"},
        {"number": 20056, "title": "마법사 상어와 파이어볼"},
        {"number": 20057, "title": "마법사 상어와 토네이도"},
        {"number": 20058, "title": "마법사 상어와 파이어스톰"},
        {"number": 21608, "title": "상어 초등학교"},
        {"number": 21609, "title": "상어 중학교"},
        {"number": 21610, "title": "마법사 상어와 비바라기"},
        {"number": 21611, "title": "마법사 상어와 블리자드"},
        {"number": 23288, "title": "주사위 굴리기 2"},
        {"number": 23289, "title": "온풍기 안녕!"},
        {"number": 23290, "title": "마법사 상어와 복제"},
    ]


async def fetch_all_samsung_problems() -> list[dict]:
    """두 개의 삼성 문제집을 합쳐서 반환 (중복 제거)"""
    problems1 = await fetch_workbook_problems(WORKBOOK_URLS["samsung"])
    problems2 = await fetch_workbook_problems(WORKBOOK_URLS["samsung2"])

    # 중복 제거 (문제 번호 기준)
    seen = set()
    merged = []
    for p in problems1 + problems2:
        if p["number"] not in seen:
            seen.add(p["number"])
            merged.append(p)

    return sorted(merged, key=lambda x: x["number"])
