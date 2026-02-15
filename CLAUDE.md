# CLAUDE.md

이 파일은 Claude가 이 프로젝트를 이해하는 데 도움이 되는 가이드입니다.

## 프로젝트 개요

CS 면접 주관식 퀴즈 사이트 + Discord 스터디 봇

## 주요 구성

### 퀴즈 사이트

| 파일 | 설명 |
|-----|------|
| `index.html` | 메인 퀴즈 사이트 (정적 HTML/JS) |
| `quizData.js` | 빌드된 문제 데이터 (자동 생성) |
| `build-quiz.js` | docs → quizData.js 변환 스크립트 |
| `docs/` | 원본 마크다운 문제 파일 |

### 문제 파일 형식 (docs/*.md)

```markdown
# 카테고리명

### XXX-001
질문 내용

<details>
<summary>답변</summary>

답변 내용

**참고자료**
- [제목](URL)

</details>
```

지원하는 문제 ID 형식:
- `### XXX-001` (기본)
- `### K8S-001` (숫자 포함)
- `### 1. 질문` (숫자형)

## 빌드 명령어

```bash
# 퀴즈 데이터 빌드
node build-quiz.js

# 로컬 서버 실행
npx serve .
```

## 채점 알고리즘

TF-IDF 코사인 유사도 기반:
- 코사인 유사도: 40%
- 키워드 매칭: 40%
- 답변 길이 보너스: 20%

## 배포

- **GitHub Pages**: https://chehyeonyeong.github.io/output/
- **자동 빌드**: docs 변경 시 GitHub Actions가 quizData.js 자동 업데이트

## 카테고리 우선순위

| 우선순위 | 카테고리 |
|---------|---------|
| P1 | Network, OS, Database, 자료구조, 아키텍처, Spring |
| P2 | Redis, Kafka, Docker, Kubernetes |
| P3 | Elasticsearch, MongoDB, WebSocket, 시스템 설계, CRDT |
| P4 | Ktor, 프로그래밍 언어 |

## 주의사항

- `quizData.js`는 직접 수정하지 말 것 (빌드로 덮어씀)
- 문제 추가/수정은 `docs/` 폴더의 마크다운 파일에서
- NestJS(`docs/Framework/nest.md`)는 답변이 없어 빌드에서 제외됨
