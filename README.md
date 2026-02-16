# Output Study

취준 스터디를 위한 도구 모음

## CS 면접 주관식 퀴즈

**[퀴즈 사이트 바로가기](https://chehyeonyeong.github.io/output/)**

백엔드 개발자를 위한 기술 면접 대비 주관식 퀴즈 사이트입니다.

> 원본 질문 출처: [fru1tworld/cs-basic](https://github.com/fru1tworld/cs-basic/blob/main/interview/interview.md)

### 주요 기능

- **1,303개 문제** - 22개 카테고리의 CS 기초 및 백엔드 기술 문제
- **참고용 답변 제공** - 사용자가 답변 작성 후 참고용 답변 확인
- **섹션별 학습** - 6개 섹션으로 분류된 체계적인 학습
- **참고자료 링크** - 공식 문서 및 RFC 기반 참고자료

### 카테고리

| 섹션 | 카테고리 |
|------|---------|
| **CS 기초** | Network (104), OS (122), Database (70), 자료구조 (63), 컴퓨터 구조 (60) |
| **특정 데이터베이스** | Elasticsearch (50), MongoDB (80), Redis (30) |
| **Framework** | Spring (51), Ktor (38) |
| **인프라 & 메시징** | Docker (100), Kubernetes (140), Kafka (50), CDC/Debezium (30) |
| **프로그래밍 언어** | Java (75), JavaScript/TypeScript (30), Python (25), Go (15), 프로그래밍 언어 (15) |
| **기타** | 시스템 설계 (95), WebSocket (30), CRDT (30) |

### 학습 방식

1. 섹션 및 카테고리 선택
2. 문제를 읽고 본인의 답변 작성
3. "참고용 답변 보기" 버튼으로 모범 답안 확인
4. 핵심 키워드 및 참고자료로 추가 학습

### 문제 추가/수정

```bash
# docs/ 폴더의 마크다운 파일 수정 후
node build-quiz.js
```

---

## Discord 스터디 봇

취준 스터디 운영을 위한 Discord 봇

## 기능

- **멤버 관리**: 가입, 탈퇴, 정보 조회
- **산출물 제출**: 주 1회 필수 제출 관리
- **출석 체크**: 모각작/리뷰 세션 출석
- **삼진 아웃**: 규칙 미준수시 스트라이크 자동 관리
- **익명 피드백**: 익명으로 피드백 전달
- **통계/리포트**: 주간 리포트, 랭킹, 전체 통계

## 명령어

| 명령어 | 설명 |
|--------|------|
| `/join` | 스터디 가입 |
| `/leave` | 스터디 탈퇴 |
| `/me` | 내 정보 확인 |
| `/members` | 멤버 목록 |
| `/submit` | 주간 산출물 제출 |
| `/status` | 제출 현황 확인 |
| `/attend` | 세션 출석체크 |
| `/attendance` | 내 출석 통계 |
| `/feedback` | 익명 피드백 전달 |
| `/report` | 주간 리포트 |
| `/ranking` | 활동 랭킹 |
| `/stats` | 전체 통계 |
| `/strikes` | 스트라이크 확인 |
| `/help` | 봇 사용법 |
| `/rules` | 스터디 규칙 |

### 관리자 명령어

| 명령어 | 설명 |
|--------|------|
| `/strike` | 스트라이크 부여 |
| `/check-missing` | 미제출자 일괄 스트라이크 |
| `/feedbacks` | 피드백 조회 |

## Oracle Cloud 배포 (Docker)

### 1. Oracle Cloud 인스턴스 생성

1. [Oracle Cloud](https://cloud.oracle.com) 접속
2. Compute > Instances > Create Instance
3. Image: Oracle Linux 8 또는 Ubuntu
4. Shape: VM.Standard.E2.1.Micro (Always Free)
5. SSH 키 추가 후 생성

### 2. 서버 접속 및 Docker 설치

```bash
# SSH 접속
ssh -i <your-key.pem> ubuntu@<public-ip>

# Docker 설치 (Ubuntu)
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

# 재접속
exit
ssh -i <your-key.pem> ubuntu@<public-ip>
```

### 3. 봇 배포

```bash
# 프로젝트 클론
git clone <your-repo-url> output-study-bot
cd output-study-bot

# 환경변수 설정
cp .env.example .env
nano .env  # 토큰 및 채널 ID 입력

# 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 재시작
docker-compose restart

# 중지
docker-compose down
```

### 4. 자동 재시작 설정

Docker의 `restart: unless-stopped` 정책으로 서버 재부팅시에도 자동 시작됩니다.

## 로컬 개발

```bash
# 가상환경 생성
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 환경변수 설정
cp .env.example .env
# .env 파일 편집

# 실행
python main.py
```

## Discord 봇 생성

1. [Discord Developer Portal](https://discord.com/developers/applications) 접속
2. "New Application" 클릭
3. Bot 탭 > "Add Bot"
4. **Privileged Gateway Intents** 활성화:
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT
5. Token 복사 → `.env`에 입력
6. OAuth2 > URL Generator:
   - Scopes: `bot`, `applications.commands`
   - Bot Permissions: `Send Messages`, `Embed Links`, `Use Slash Commands`
7. 생성된 URL로 서버에 봇 초대

## 환경변수

```env
DISCORD_TOKEN=봇_토큰
GUILD_ID=서버_ID
ANNOUNCEMENT_CHANNEL_ID=공지_채널_ID
FEEDBACK_CHANNEL_ID=피드백_채널_ID
ADMIN_ROLE_ID=관리자_역할_ID
```
