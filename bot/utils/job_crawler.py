"""
채용공고 크롤러

지원 사이트:
- 랠릿 (rallit.com) - requests
- 인크루트 (incruit.com) - requests
- 직행 (zighang.com) - Selenium
- 점핏 (jumpit.saramin.co.kr) - Selenium
"""
import asyncio
import aiohttp
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
from typing import Optional
import json
import re

# Selenium imports (optional - for SPA sites)
try:
    from selenium import webdriver
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.chrome.service import Service
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    SELENIUM_AVAILABLE = True
except ImportError:
    SELENIUM_AVAILABLE = False

# 캐시 (1시간)
_job_cache: dict = {}
_cache_time: Optional[datetime] = None
CACHE_DURATION = timedelta(hours=1)


def _get_chrome_driver():
    """Headless Chrome 드라이버 생성"""
    if not SELENIUM_AVAILABLE:
        return None

    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-gpu')
    options.add_argument('--window-size=1920,1080')
    options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

    try:
        driver = webdriver.Chrome(options=options)
        driver.set_page_load_timeout(30)
        return driver
    except Exception as e:
        print(f"Chrome driver 생성 실패: {e}")
        return None


async def fetch_rallit_jobs(
    category: str = "backend",
    min_career: int = 0,
    max_career: int = 10
) -> list[dict]:
    """
    랠릿 채용공고 크롤링

    category: backend, frontend, fullstack, data, ai, devops, etc
    """
    jobs = []
    url = f"https://www.rallit.com/positions?category={category}"

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, timeout=30) as response:
                if response.status != 200:
                    return jobs

                html = await response.text()
                soup = BeautifulSoup(html, 'html.parser')

                # 채용공고 카드 찾기
                job_cards = soup.select('a[href^="/positions/"]')

                for card in job_cards[:20]:  # 최대 20개
                    try:
                        href = card.get('href', '')
                        job_id = href.split('/')[-1] if href else ''

                        # 회사명, 제목 추출
                        company = card.select_one('span, div')
                        title_elem = card.select_one('h2, h3, strong')

                        company_name = company.get_text(strip=True) if company else '회사명 없음'
                        title = title_elem.get_text(strip=True) if title_elem else '제목 없음'

                        # 기술스택 추출
                        tech_tags = card.select('span[class*="tag"], div[class*="skill"]')
                        tech_stack = [tag.get_text(strip=True) for tag in tech_tags[:5]]

                        jobs.append({
                            'source': '랠릿',
                            'company': company_name,
                            'title': title,
                            'url': f"https://www.rallit.com{href}",
                            'tech_stack': tech_stack,
                            'category': category
                        })
                    except Exception:
                        continue

    except Exception as e:
        print(f"랠릿 크롤링 에러: {e}")

    return jobs


async def fetch_incruit_jobs(
    job_type: str = "IT",
    career: str = "0-10"
) -> list[dict]:
    """
    인크루트 채용공고 크롤링

    job_type: IT, 개발, 백엔드, 프론트엔드 등
    """
    jobs = []

    # 인크루트 검색 URL
    search_keyword = "백엔드" if job_type == "backend" else "프론트엔드" if job_type == "frontend" else job_type
    url = f"https://search.incruit.com/list/search.asp?col=job&kw={search_keyword}"

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, timeout=30) as response:
                if response.status != 200:
                    return jobs

                html = await response.text()
                soup = BeautifulSoup(html, 'html.parser')

                # 채용공고 목록
                job_items = soup.select('.c_col, .listDefault li, .jobs-item')

                for item in job_items[:20]:
                    try:
                        # 회사명
                        company_elem = item.select_one('.co_name, .company-name, a[href*="company"]')
                        company = company_elem.get_text(strip=True) if company_elem else '회사명 없음'

                        # 제목
                        title_elem = item.select_one('.job_tit, .title, h2 a, h3 a')
                        title = title_elem.get_text(strip=True) if title_elem else '제목 없음'

                        # URL
                        link = item.select_one('a[href*="jobpost"]')
                        job_url = link.get('href', '') if link else ''
                        if job_url and not job_url.startswith('http'):
                            job_url = f"https://www.incruit.com{job_url}"

                        if title and title != '제목 없음':
                            jobs.append({
                                'source': '인크루트',
                                'company': company,
                                'title': title,
                                'url': job_url,
                                'tech_stack': [],
                                'category': job_type
                            })
                    except Exception:
                        continue

    except Exception as e:
        print(f"인크루트 크롤링 에러: {e}")

    return jobs


def fetch_zighang_jobs_sync(
    category: str = "backend",
    min_career: int = 0,
    max_career: int = 10
) -> list[dict]:
    """
    직행 채용공고 크롤링 (Selenium 필요)
    """
    jobs = []

    if not SELENIUM_AVAILABLE:
        print("Selenium이 설치되지 않았습니다.")
        return jobs

    driver = _get_chrome_driver()
    if not driver:
        return jobs

    try:
        # 직행 채용 페이지
        url = "https://zighang.com/recruitment"
        driver.get(url)

        # 페이지 로딩 대기
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'a[href*="/recruitment/"], div[class*="card"], article'))
        )

        # 추가 로딩 대기
        asyncio.sleep(2)

        # 채용공고 카드 찾기
        cards = driver.find_elements(By.CSS_SELECTOR, 'a[href*="/recruitment/"], div[class*="job"], article[class*="job"]')

        for card in cards[:20]:
            try:
                # 텍스트 추출
                text = card.text.strip()
                lines = text.split('\n')

                if len(lines) >= 2:
                    company = lines[0] if lines else '회사명 없음'
                    title = lines[1] if len(lines) > 1 else '제목 없음'

                    # URL
                    href = card.get_attribute('href') or ''
                    if not href:
                        link = card.find_elements(By.TAG_NAME, 'a')
                        if link:
                            href = link[0].get_attribute('href') or ''

                    jobs.append({
                        'source': '직행',
                        'company': company[:30],
                        'title': title[:50],
                        'url': href,
                        'tech_stack': [],
                        'category': category
                    })
            except Exception:
                continue

    except Exception as e:
        print(f"직행 크롤링 에러: {e}")
    finally:
        driver.quit()

    return jobs


def fetch_jumpit_jobs_sync(
    category: str = "backend",
    min_career: int = 0,
    max_career: int = 10
) -> list[dict]:
    """
    점핏 채용공고 크롤링 (Selenium 필요)
    """
    jobs = []

    if not SELENIUM_AVAILABLE:
        print("Selenium이 설치되지 않았습니다.")
        return jobs

    driver = _get_chrome_driver()
    if not driver:
        return jobs

    try:
        # 점핏 채용 페이지 (백엔드)
        job_category = "1" if category == "backend" else "2" if category == "frontend" else ""
        url = f"https://www.jumpit.co.kr/positions?jobCategory={job_category}"
        driver.get(url)

        # 페이지 로딩 대기
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'a[href*="/position/"], div[class*="position"]'))
        )

        # 스크롤 다운 (더 많은 공고 로드)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight / 2);")
        asyncio.sleep(1)

        # 채용공고 카드 찾기
        cards = driver.find_elements(By.CSS_SELECTOR, 'a[href*="/position/"]')

        for card in cards[:20]:
            try:
                href = card.get_attribute('href') or ''
                text = card.text.strip()
                lines = text.split('\n')

                # 제목, 회사명 파싱
                title = lines[0] if lines else '제목 없음'
                company = lines[1] if len(lines) > 1 else '회사명 없음'

                # 기술스택 (보통 3번째 줄 이후)
                tech_stack = []
                for line in lines[2:]:
                    if any(tech in line.lower() for tech in ['java', 'python', 'spring', 'react', 'vue', 'node', 'kotlin', 'go']):
                        tech_stack.append(line.strip())

                jobs.append({
                    'source': '점핏',
                    'company': company[:30],
                    'title': title[:50],
                    'url': href,
                    'tech_stack': tech_stack[:5],
                    'category': category
                })
            except Exception:
                continue

    except Exception as e:
        print(f"점핏 크롤링 에러: {e}")
    finally:
        driver.quit()

    return jobs


async def fetch_zighang_jobs(category: str = "backend", min_career: int = 0, max_career: int = 10) -> list[dict]:
    """비동기 래퍼"""
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, fetch_zighang_jobs_sync, category, min_career, max_career)


async def fetch_jumpit_jobs(category: str = "backend", min_career: int = 0, max_career: int = 10) -> list[dict]:
    """비동기 래퍼"""
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, fetch_jumpit_jobs_sync, category, min_career, max_career)


async def fetch_all_jobs(
    category: str = "backend",
    min_career: int = 0,
    max_career: int = 10,
    sources: list[str] = None
) -> list[dict]:
    """
    모든 사이트에서 채용공고 수집

    category: backend, frontend
    sources: ['rallit', 'incruit', 'zighang', 'jumpit'] 또는 None (전체)
    """
    global _job_cache, _cache_time

    cache_key = f"{category}_{min_career}_{max_career}"

    # 캐시 확인
    if _cache_time and datetime.now() - _cache_time < CACHE_DURATION:
        if cache_key in _job_cache:
            return _job_cache[cache_key]

    all_jobs = []
    sources = sources or ['rallit', 'incruit', 'zighang', 'jumpit']

    tasks = []

    if 'rallit' in sources:
        tasks.append(fetch_rallit_jobs(category, min_career, max_career))
    if 'incruit' in sources:
        job_type = "백엔드" if category == "backend" else "프론트엔드"
        tasks.append(fetch_incruit_jobs(job_type))
    if 'zighang' in sources and SELENIUM_AVAILABLE:
        tasks.append(fetch_zighang_jobs(category, min_career, max_career))
    if 'jumpit' in sources and SELENIUM_AVAILABLE:
        tasks.append(fetch_jumpit_jobs(category, min_career, max_career))

    results = await asyncio.gather(*tasks, return_exceptions=True)

    for result in results:
        if isinstance(result, list):
            all_jobs.extend(result)

    # 중복 제거 (회사명 + 제목 기준)
    seen = set()
    unique_jobs = []
    for job in all_jobs:
        key = f"{job['company']}_{job['title']}"
        if key not in seen:
            seen.add(key)
            unique_jobs.append(job)

    # 캐시 저장
    _job_cache[cache_key] = unique_jobs
    _cache_time = datetime.now()

    return unique_jobs


def get_job_categories() -> dict[str, str]:
    """카테고리 목록"""
    return {
        'backend': '백엔드',
        'frontend': '프론트엔드',
        'fullstack': '풀스택',
        'data': '데이터',
        'devops': 'DevOps',
        'ai': 'AI/ML',
    }


def is_selenium_available() -> bool:
    """Selenium 사용 가능 여부"""
    return SELENIUM_AVAILABLE
