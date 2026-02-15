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
> **컨텍스트**: 이전 질문과의 연관성 설명 (선택사항)

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

## 참고용 답변 시스템

채점 기능 없이 참고용 답변만 제공:
- 사용자가 답변 작성 후 참고용 답변 확인
- 핵심 키워드 표시
- 참고자료 링크 제공

## 배포

- **GitHub Pages**: https://chehyeonyeong.github.io/output/
- **자동 빌드**: docs 변경 시 GitHub Actions가 quizData.js 자동 업데이트

## 카테고리 섹션

| 섹션 | 카테고리 |
|------|---------|
| CS 기초 | Network, OS, Database, 자료구조, 아키텍처, 개발 상식 |
| 데이터베이스 | Database, Redis, Elasticsearch, MongoDB |
| Framework | Spring, Ktor, NestJS |
| 인프라 & 메시징 | Docker, Kubernetes, Kafka, CDC/Debezium |
| Java | Java 관련 질문 (pl.md에서 분리) |
| JavaScript/TypeScript | JS/TS 관련 질문 (pl.md에서 분리) |
| Python | Python 관련 질문 (pl.md에서 분리) |
| Go | Go 관련 질문 (pl.md에서 분리) |
| 기타 | WebSocket, 시스템 설계, CRDT |

## 주의사항

- `quizData.js`는 직접 수정하지 말 것 (빌드로 덮어씀)
- 문제 추가/수정은 `docs/` 폴더의 마크다운 파일에서
- NestJS(`docs/Framework/nest.md`)는 답변이 없어 빌드에서 제외됨
- pl.md의 질문은 ID prefix(JAVA-, JS-, PY-, GO-)에 따라 언어별 섹션으로 자동 분리

## 최근 작업 컨텍스트 (2024년)

### 완료된 작업
1. **채점 → 참고용 답변 변경**: TF-IDF 점수 표시 제거, "참고용 답변" 방식으로 변경
2. **질문 컨텍스트 추가**: 연관 질문에 `> **컨텍스트**: ...` 형식 추가
3. **10자 제한 제거**: 답변 길이 제한 없음
4. **Priority → Section 변경**: P1~P9 → 섹션 이름 기반으로 변경
5. **프로그래밍 언어 분리**: pl.md를 Java, JS/TS, Python, Go로 분리
6. **로고 클릭 시 홈 이동**: 제목 클릭으로 메인화면 복귀

### 섹션 분류 기준
- `cs`: Network, OS, 자료구조, 아키텍처, 개발 상식
- `database`: Database, Redis, Elasticsearch, MongoDB
- `framework`: Spring, Ktor, NestJS
- `infra`: Docker, Kubernetes, Kafka, CDC/Debezium
- `java`, `javascript`, `python`, `go`: 각 언어별 (pl.md에서 분리)
- `etc`: WebSocket, 시스템 설계, CRDT

### 파일별 수정 사항
- `index.html`: 채점 UI 제거, section 기반 분류, 로고 클릭 홈 이동
- `build-quiz.js`: priority → section, PREFIX_CATEGORY_MAP 추가
- `docs/*.md`: 연관 질문에 컨텍스트 블록 추가
