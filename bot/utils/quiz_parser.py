"""
quizData.js 파싱 유틸리티

JavaScript 파일에서 퀴즈 데이터를 파싱하여 Python 객체로 변환합니다.
"""
import json
import re
import random
from datetime import datetime
from pathlib import Path
from typing import Optional, List, Dict, Any

# quizData 디렉토리 경로 (프로젝트 루트 기준)
QUIZ_DATA_DIR = Path(__file__).parent.parent.parent / "quizData"

# 캐시
_quiz_cache: List[Dict[str, Any]] = []
_categories_cache: List[Dict[str, Any]] = []
_sections_cache: Dict[str, str] = {}
_cache_loaded: bool = False


def _parse_js_array(content: str, var_name: str) -> List[Dict[str, Any]]:
    """JavaScript 배열을 파싱하여 Python 리스트로 변환"""
    # const varName = [ ... ]; 패턴 찾기
    pattern = rf'const\s+{var_name}\s*=\s*(\[[\s\S]*?\]);?\s*(?:const|if|$)'
    match = re.search(pattern, content)

    if not match:
        # 파일 끝까지 배열인 경우
        pattern2 = rf'const\s+{var_name}\s*=\s*(\[[\s\S]*\])\s*;?\s*$'
        match = re.search(pattern2, content)

    if not match:
        return []

    json_str = match.group(1)

    # JavaScript 문법을 JSON으로 변환
    # 트레일링 콤마 제거
    json_str = re.sub(r',(\s*[\]\}])', r'\1', json_str)

    try:
        return json.loads(json_str)
    except json.JSONDecodeError:
        return []


def _parse_js_object(content: str, var_name: str) -> Dict[str, Any]:
    """JavaScript 객체를 파싱하여 Python 딕셔너리로 변환"""
    pattern = rf'const\s+{var_name}\s*=\s*(\{{[\s\S]*?\}});?'
    match = re.search(pattern, content)

    if not match:
        return {}

    json_str = match.group(1)

    # JavaScript 문법을 JSON으로 변환
    json_str = re.sub(r',(\s*[\]\}])', r'\1', json_str)

    try:
        return json.loads(json_str)
    except json.JSONDecodeError:
        return {}


def _load_quiz_data() -> None:
    """모든 퀴즈 데이터 파일을 로드하고 캐시"""
    global _quiz_cache, _categories_cache, _sections_cache, _cache_loaded

    if _cache_loaded:
        return

    _quiz_cache = []
    _categories_cache = []
    _sections_cache = {}

    # 각 데이터 파일 로드
    data_files = {
        'cs.js': 'csData',
        'specific_db.js': 'specific_dbData',
        'etc.js': 'etcData',
        'pl.js': 'plData',
        'framework.js': 'frameworkData',
        'infra.js': 'infraData',
    }

    for filename, var_name in data_files.items():
        filepath = QUIZ_DATA_DIR / filename
        if filepath.exists():
            content = filepath.read_text(encoding='utf-8')
            data = _parse_js_array(content, var_name)
            _quiz_cache.extend(data)

    # quizData.js에서 categories와 sectionNames 로드
    main_file = QUIZ_DATA_DIR.parent / 'quizData.js'
    if main_file.exists():
        content = main_file.read_text(encoding='utf-8')
        _categories_cache = _parse_js_array(content, 'categories')
        _sections_cache = _parse_js_object(content, 'sectionNames')

    _cache_loaded = True


def reload_quiz_data() -> None:
    """퀴즈 데이터를 다시 로드 (캐시 갱신)"""
    global _cache_loaded
    _cache_loaded = False
    _load_quiz_data()


def get_all_quizzes() -> List[Dict[str, Any]]:
    """모든 퀴즈 데이터 반환"""
    _load_quiz_data()
    return _quiz_cache.copy()


def get_categories() -> List[Dict[str, Any]]:
    """카테고리 목록 반환"""
    _load_quiz_data()
    return _categories_cache.copy()


def get_section_names() -> Dict[str, str]:
    """섹션 이름 매핑 반환"""
    _load_quiz_data()
    return _sections_cache.copy()


def get_sections() -> List[str]:
    """유효한 섹션 목록 반환"""
    _load_quiz_data()
    return list(_sections_cache.keys())


def get_quizzes_by_section(section: str) -> List[Dict[str, Any]]:
    """특정 섹션의 퀴즈 목록 반환"""
    _load_quiz_data()
    return [q for q in _quiz_cache if q.get('section') == section]


def get_quizzes_by_category(category: str) -> List[Dict[str, Any]]:
    """특정 카테고리의 퀴즈 목록 반환"""
    _load_quiz_data()
    return [q for q in _quiz_cache if q.get('category') == category]


def get_random_quiz(section: Optional[str] = None) -> Optional[Dict[str, Any]]:
    """랜덤 퀴즈 반환"""
    _load_quiz_data()

    if section:
        quizzes = get_quizzes_by_section(section)
    else:
        quizzes = _quiz_cache

    if not quizzes:
        return None

    return random.choice(quizzes)


def get_daily_quiz(section: Optional[str] = None) -> Optional[Dict[str, Any]]:
    """오늘의 퀴즈 반환 (날짜 기반 시드)"""
    _load_quiz_data()

    if section:
        quizzes = get_quizzes_by_section(section)
    else:
        quizzes = _quiz_cache

    if not quizzes:
        return None

    # 날짜 기반 시드로 일관된 랜덤 선택
    today = datetime.now().strftime('%Y-%m-%d')
    seed = hash(today + (section or ''))
    random.seed(seed)
    quiz = random.choice(quizzes)
    random.seed()  # 시드 리셋

    return quiz


def get_quiz_by_id(quiz_id: str) -> Optional[Dict[str, Any]]:
    """ID로 특정 퀴즈 조회"""
    _load_quiz_data()

    for quiz in _quiz_cache:
        if quiz.get('id') == quiz_id:
            return quiz

    return None


def extract_keywords(answer: str, max_keywords: int = 5) -> List[str]:
    """답변에서 핵심 키워드 추출 (간단한 휴리스틱)"""
    # 굵은 글씨나 특정 패턴에서 키워드 추출
    keywords = []

    # **keyword** 패턴
    bold_pattern = r'\*\*([^*]+)\*\*'
    bold_matches = re.findall(bold_pattern, answer)
    keywords.extend(bold_matches)

    # 콜론 앞의 용어 (예: "ALU: 산술 연산...")
    colon_pattern = r'([가-힣A-Za-z0-9\s\-]+)\s*[:：]'
    colon_matches = re.findall(colon_pattern, answer)
    for match in colon_matches:
        term = match.strip()
        if 2 <= len(term) <= 30:  # 적절한 길이의 용어만
            keywords.append(term)

    # 괄호 안의 약어 (예: "(Garbage First)")
    paren_pattern = r'\(([A-Z][A-Za-z\s]+)\)'
    paren_matches = re.findall(paren_pattern, answer)
    keywords.extend(paren_matches)

    # 중복 제거 및 제한
    seen = set()
    unique_keywords = []
    for kw in keywords:
        kw_lower = kw.lower().strip()
        if kw_lower not in seen and len(kw.strip()) >= 2:
            seen.add(kw_lower)
            unique_keywords.append(kw.strip())

    return unique_keywords[:max_keywords]


def format_answer_for_discord(quiz: Dict[str, Any]) -> str:
    """Discord 메시지용으로 답변 포맷팅"""
    answer = quiz.get('answer', '')
    references = quiz.get('references', [])

    # 답변 길이 제한 (Discord 임베드 제한 고려)
    if len(answer) > 1500:
        answer = answer[:1500] + '...'

    # 참고자료 추가
    if references:
        answer += '\n\n**참고자료**'
        for ref in references[:3]:  # 최대 3개
            title = ref.get('title', 'Link')
            url = ref.get('url', '')
            if url:
                answer += f'\n- [{title}]({url})'

    return answer


def get_quiz_count() -> Dict[str, int]:
    """섹션별 퀴즈 개수 반환"""
    _load_quiz_data()

    counts = {}
    for quiz in _quiz_cache:
        section = quiz.get('section', 'unknown')
        counts[section] = counts.get(section, 0) + 1

    return counts
