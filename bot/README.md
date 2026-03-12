# 뽀삐 (Poppy) Discord Bot

Output Study 운영을 위한 Discord 봇입니다.

## 기능 목록

### 멤버 관리 (`members.py`)
| 명령어 | 권한 | 설명 |
|--------|------|------|
| `/join` | 모두 | 스터디 가입 요청 |
| `/leave` | 모두 | 스터디 탈퇴 |
| `/me` | 멤버 | 내 스터디 정보 확인 |
| `/members` | 모두 | 활성 멤버 목록 |
| `/profile` | 멤버 | 프로필 확인 |
| `/profile-set` | 멤버 | 프로필 설정 (GitHub, 블로그, 기술스택 등) |

### 산출물 제출 (`submissions.py`)
| 명령어 | 권한 | 설명 |
|--------|------|------|
| `/submit` | 멤버 | 주간 산출물 제출 (주 1회) |
| `/status` | 모두 | 이번 주 제출 현황 |
| `/check-missing` | 관리자 | 미제출자 스트라이크 부여 |

**산출물 유형**:
- 알고리즘/코테 (7문제)
- 사이드 프로젝트 (PR 5개)
- 블로깅 (1,500자 이상)
- 이력서/포폴 업데이트

### 출석 관리 (`attendance.py`)
| 명령어 | 권한 | 설명 |
|--------|------|------|
| `/attend` | 멤버 | 세션 출석체크 |
| `/attendance` | 멤버 | 내 출석 통계 |
| `/dm-missing` | 관리자 | 미참석자 일괄 DM |
| `/dm-user` | 관리자 | 특정 멤버에게 DM |

**세션 유형**:
- 온라인 모각작
- 토요 회고 모임

### 스트라이크 (`strikes.py`)
| 명령어 | 권한 | 설명 |
|--------|------|------|
| `/strikes` | 멤버 | 스트라이크 기록 확인 |

**규칙**:
- 3회 누적 시 제명 대상
- 자동 제명 X → 운영진에게 알림 후 수동 처리
- 운영진은 스트라이크 면제

### 팀 관리 (`teams.py`)
| 명령어 | 권한 | 설명 |
|--------|------|------|
| `/team-list` | 모두 | 팀 목록 확인 |
| `/my-team` | 멤버 | 내 팀 확인 |

### 피드백 (`feedback.py`)
| 명령어 | 권한 | 설명 |
|--------|------|------|
| `/feedback` | 모두 | 익명 피드백 전송 |
| `/feedbacks` | 관리자 | 최근 피드백 조회 |

### 통계/리포트 (`reports.py`)
| 명령어 | 권한 | 설명 |
|--------|------|------|
| `/report` | 모두 | 주간 리포트 |
| `/stats` | 모두 | 전체 통계 |

### CS 퀴즈 (`quiz.py`)
| 명령어 | 권한 | 설명 |
|--------|------|------|
| `/quiz` | 모두 | 랜덤 CS 퀴즈 |
| `/quiz category:<섹션>` | 모두 | 특정 섹션 퀴즈 |
| `/quiz daily:True` | 모두 | 오늘의 문제 |
| `/quiz-stats` | 모두 | 섹션별 문제 수 |

**섹션**:
- `cs` - CS 기초 (Network, OS, 자료구조 등)
- `pl` - 프로그래밍 언어
- `framework` - Spring, Ktor 등
- `infra` - Docker, Kubernetes, Kafka 등
- `specific_db` - Redis, MongoDB, Elasticsearch 등
- `etc` - 기타

### 자동 스케줄러 (`scheduler.py`)
| 시간 | 작업 |
|------|------|
| 토요일 07:30 | 리뷰 세션 30분 전 알림 |
| 금요일 20:00 | 산출물 제출 리마인더 |

---

## 설치 및 실행

### 1. 의존성 설치
```bash
pip install -r requirements.txt
```

### 2. 환경변수 설정
`.env` 파일 생성:
```env
# 필수
DISCORD_TOKEN=your_bot_token
GUILD_ID=your_guild_id

# 역할 ID
ADMIN_ROLE_ID=123456789
ROLE_ALGORITHM_ID=123456789
ROLE_PROJECT_ID=123456789
ROLE_RESUME_ID=123456789
ROLE_ALL_ID=123456789

# 채널 ID
ANNOUNCEMENT_CHANNEL_ID=123456789
FEEDBACK_CHANNEL_ID=123456789

# 데이터베이스
DB_PATH=study.db
```

### 3. 실행
```bash
python main.py
```

---

## 파일 구조

```
bot/
├── cogs/                    # 명령어 모듈
│   ├── members.py          # 멤버 관리
│   ├── submissions.py      # 산출물 제출
│   ├── attendance.py       # 출석 관리
│   ├── strikes.py          # 스트라이크
│   ├── teams.py            # 팀 관리
│   ├── feedback.py         # 익명 피드백
│   ├── reports.py          # 통계/리포트
│   ├── scheduler.py        # 자동 알림
│   ├── quiz.py             # CS 퀴즈
│   └── poppi.py            # 뽀삐
├── utils/                   # 유틸리티
│   ├── database.py         # DB 관리 (SQLite)
│   ├── quiz_parser.py      # quizData.js 파싱
│   └── logger.py           # 로깅
├── README.md               # 이 파일
└── plan.md                 # 개발 계획
```

---

## 데이터베이스 스키마

### members
| 컬럼 | 타입 | 설명 |
|------|------|------|
| user_id | INTEGER | Discord 사용자 ID (PK) |
| username | TEXT | 사용자명 |
| join_date | TEXT | 가입일 |
| strike_count | INTEGER | 스트라이크 수 |
| is_active | INTEGER | 활성 상태 |
| main_output | TEXT | 주력 산출물 유형 |

### submissions
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | INTEGER | PK |
| user_id | INTEGER | 제출자 ID |
| week_number | INTEGER | 주차 |
| year | INTEGER | 연도 |
| submission_type | TEXT | 산출물 유형 |
| description | TEXT | 설명 |
| submitted_at | TEXT | 제출 시간 |

### attendance
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | INTEGER | PK |
| user_id | INTEGER | 사용자 ID |
| session_type | TEXT | 세션 유형 |
| session_date | TEXT | 날짜 |
| checked_at | TEXT | 체크 시간 |

### strikes
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | INTEGER | PK |
| user_id | INTEGER | 대상자 ID |
| reason | TEXT | 사유 |
| issued_at | TEXT | 부과 시간 |
| issued_by | INTEGER | 부과자 ID |

### teams / team_members
| 테이블 | 컬럼 | 설명 |
|--------|------|------|
| teams | id, name, created_at | 팀 정보 |
| team_members | user_id, team_id, assigned_at | 팀 배정 |

### profiles
| 컬럼 | 타입 | 설명 |
|------|------|------|
| user_id | INTEGER | PK |
| github | TEXT | GitHub URL |
| blog | TEXT | 블로그 URL |
| intro | TEXT | 자기소개 |
| tech_stack | TEXT | 기술 스택 |
| goal | TEXT | 목표 |

### feedbacks
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | INTEGER | PK |
| target_user_id | INTEGER | 대상자 (NULL=전체) |
| content | TEXT | 내용 |
| created_at | TEXT | 작성 시간 |

---

## 권한 체계

| 권한 | 설명 |
|------|------|
| 모두 | 누구나 사용 가능 |
| 멤버 | 스터디 역할 보유자 |
| 관리자 | `ADMIN_ROLE_ID` 역할 보유자 |

**멤버 역할**: `ROLE_ALGORITHM_ID`, `ROLE_PROJECT_ID`, `ROLE_RESUME_ID`, `ROLE_ALL_ID`, `ADMIN_ROLE_ID` 중 하나 이상 보유 시 멤버로 인정

---

## 연동 데이터

### CS 퀴즈
- 소스: `quizData.js` (빌드된 퀴즈 데이터)
- 위치: 프로젝트 루트 (`../quizData.js`)

### 코테 문제
- 소스: 백준 문제집 크롤링
- 캐시: 24시간
- Fallback: 하드코딩된 기출 목록
