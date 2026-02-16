# Docker 면접 질문지

> **카테고리**: DevOps / 컨테이너 기술
> **난이도**: 초급 ~ 고급
> **총 문항**: 60문항

[목록으로 돌아가기](../README.md)

---

## 📌 Docker 기본 개념

### DOCKER-001
Docker란 무엇이며, 컨테이너 기술이 등장하게 된 배경을 설명해 주세요.

<details>
<summary>답변</summary>

Docker는 애플리케이션을 컨테이너라는 격리된 환경에서 실행할 수 있게 해주는 오픈소스 플랫폼입니다.

**컨테이너 기술 등장 배경:**
- **환경 불일치 문제**: "내 컴퓨터에서는 되는데" 문제 해결 필요
- **리소스 효율성**: VM의 무거운 오버헤드 대비 경량화된 가상화 필요
- **배포 속도**: 빠른 애플리케이션 배포 및 스케일링 요구 증가
- **마이크로서비스**: 서비스 단위 독립적 배포 및 관리 필요성

**참고자료**
- [Docker Overview](https://docs.docker.com/get-started/overview/)[^1]

</details>

[^1]: Docker 공식 문서 - Docker 개요

### DOCKER-002
Docker 컨테이너와 가상 머신(VM)의 차이점을 아키텍처 관점에서 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | 컨테이너 | 가상 머신 |
|------|----------|-----------|
| **가상화 레벨** | OS 레벨 (커널 공유) | 하드웨어 레벨 |
| **Guest OS** | 불필요 | 각 VM마다 필요 |
| **크기** | MB 단위 | GB 단위 |
| **시작 시간** | 초 단위 | 분 단위 |
| **격리 수준** | 프로세스 격리 | 완전한 격리 |
| **성능** | 네이티브에 가까움 | 하이퍼바이저 오버헤드 |

**트레이드오프:**
- **컨테이너 장점**: 빠른 시작, 적은 리소스, 높은 밀도, 이식성
- **컨테이너 단점**: 커널 공유로 인한 보안 경계가 VM보다 약함, 다른 OS 커널(예: Linux 컨테이너를 Windows에서 직접 실행) 불가
- **VM 장점**: 완전한 하드웨어 격리, 다른 OS 실행 가능, 강력한 보안 경계
- **VM 단점**: 무거운 오버헤드, 느린 부팅, 리소스 비효율

**실무 고려사항**: 멀티테넌트 환경에서 강력한 격리가 필요하면 VM이나 gVisor/Kata Containers 같은 샌드박스 런타임 고려. 단일 조직 내 마이크로서비스라면 컨테이너가 효율적.

**참고자료**
- [What is a Container?](https://docs.docker.com/get-started/overview/#docker-objects)[^2]

</details>

[^2]: Docker 공식 문서 - Docker 객체

### DOCKER-003
Docker 이미지와 컨테이너의 차이점을 설명해 주세요.

<details>
<summary>답변</summary>

**Docker 이미지:**
- 읽기 전용 템플릿
- 애플리케이션 실행에 필요한 모든 것(코드, 런타임, 라이브러리, 설정) 포함
- 여러 레이어로 구성
- 불변(Immutable)

**Docker 컨테이너:**
- 이미지의 실행 가능한 인스턴스
- 이미지 위에 쓰기 가능한 레이어 추가
- 생성, 시작, 중지, 삭제 가능
- 격리된 프로세스로 실행

비유하면, 이미지는 "클래스"이고 컨테이너는 "인스턴스"입니다.

**참고자료**
- [Images and Containers](https://docs.docker.com/get-started/overview/#images)[^3]

</details>

[^3]: Docker 공식 문서 - 이미지

### DOCKER-004
Docker 이미지의 레이어(Layer) 시스템이란 무엇이며, 어떤 장점이 있나요?

<details>
<summary>답변</summary>

Docker 이미지는 여러 개의 읽기 전용 레이어로 구성됩니다. Dockerfile의 각 명령어(FROM, RUN, COPY 등)가 새로운 레이어를 생성합니다.

**장점:**
- **공간 효율성**: 동일한 베이스 이미지를 사용하는 이미지들이 레이어를 공유
- **빌드 속도 향상**: 변경되지 않은 레이어는 캐시에서 재사용
- **배포 효율성**: 변경된 레이어만 전송하면 됨
- **버전 관리**: 각 레이어가 변경 이력을 나타냄

**트레이드오프 및 주의점:**
- **레이어 수 증가의 단점**: 너무 많은 레이어는 이미지 pull/push 시 오버헤드 발생, 일부 스토리지 드라이버에서 성능 저하 (overlay2는 최대 128개 레이어 제한)
- **Copy-on-Write(CoW) 비용**: 컨테이너에서 파일 수정 시 전체 파일을 복사 후 수정하므로 대용량 파일 수정에 비효율적
- **삭제된 파일의 레이어 잔존**: 이전 레이어에서 생성된 파일을 삭제해도 이미지 크기는 줄지 않음 (whiteout 파일로 숨김 처리만 됨)

컨테이너 실행 시 최상위에 쓰기 가능한 레이어가 추가됩니다(Copy-on-Write). 쓰기 작업이 빈번한 데이터는 볼륨 사용 권장.

**참고자료**
- [About storage drivers](https://docs.docker.com/storage/storagedriver/)[^4]

</details>

[^4]: Docker 공식 문서 - 스토리지 드라이버

### DOCKER-005
Docker 컨테이너 격리를 구현하는 Linux 커널 기술인 namespace와 cgroups에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Namespace (격리):**
- **PID namespace**: 프로세스 ID 격리
- **NET namespace**: 네트워크 인터페이스 격리
- **MNT namespace**: 파일 시스템 마운트 포인트 격리
- **UTS namespace**: 호스트명, 도메인명 격리
- **IPC namespace**: 프로세스 간 통신 격리
- **USER namespace**: 사용자/그룹 ID 격리

**cgroups (리소스 제한):**
- CPU, 메모리, 디스크 I/O, 네트워크 대역폭 등 리소스 사용량 제한
- 리소스 사용량 모니터링
- 프로세스 그룹 단위로 관리

Namespace는 "무엇을 볼 수 있는지", cgroups는 "얼마나 사용할 수 있는지"를 제어합니다.

**중요한 보안 함정 - 커널 공유의 의미:**
- 모든 컨테이너가 호스트 커널을 공유하므로, 커널 취약점은 모든 컨테이너에 영향
- Namespace는 "격리"가 아닌 "가시성 제한"에 가까움 - 커널 레벨 공격에는 취약
- 이것이 컨테이너가 VM보다 보안 경계가 약한 이유
- **완화 방법**: 커널 업데이트, seccomp/AppArmor/SELinux 적용, User Namespace 활성화, gVisor/Kata Containers 같은 샌드박스 런타임 사용

**참고자료**
- [Docker and Linux Kernel](https://docs.docker.com/get-started/overview/#the-underlying-technology)[^5]

</details>

[^5]: Docker 공식 문서 - 기반 기술

### DOCKER-006
Docker 데몬(Docker Daemon)의 역할과 Docker 클라이언트와의 통신 방식을 설명해 주세요.

<details>
<summary>답변</summary>

**Docker Daemon (dockerd):**
- Docker API 요청을 수신하고 처리
- 이미지, 컨테이너, 네트워크, 볼륨 등 Docker 객체 관리
- 다른 데몬과 통신하여 Docker 서비스 관리

**통신 방식:**
- **Unix 소켓**: `/var/run/docker.sock` (기본값, 로컬 통신)
- **TCP 소켓**: 원격 API 접근 시 사용 (TLS 권장)
- **fd**: systemd 소켓 활성화

**아키텍처:**
```
Docker CLI → REST API → Docker Daemon → containerd → runc → 컨테이너
```

**참고자료**
- [Docker Architecture](https://docs.docker.com/get-started/overview/#docker-architecture)[^6]

</details>

[^6]: Docker 공식 문서 - Docker 아키텍처

### DOCKER-007
Docker 이미지 레이어를 구현하는 Union File System(UnionFS)이란 무엇이며, Docker에서 어떻게 활용되나요?

<details>
<summary>답변</summary>

**UnionFS란:**
여러 개의 파일 시스템(레이어)을 하나의 통합된 뷰로 마운트하는 파일 시스템입니다.

**Docker에서의 활용:**
- 여러 읽기 전용 이미지 레이어를 하나의 파일 시스템으로 표현
- 최상위에 쓰기 가능한 컨테이너 레이어 추가
- Copy-on-Write(CoW) 전략으로 효율적인 스토리지 사용

**주요 구현체:**
- **overlay2**: 현재 Docker 기본 스토리지 드라이버 (권장, Linux 커널 4.0+ 필요)
- **fuse-overlayfs**: Rootless 모드에서 사용
- **btrfs**, **zfs**: 해당 파일 시스템 사용 시 선택
- **vfs**: 테스트용, CoW 미지원으로 매우 비효율적

**스토리지 드라이버 선택 트레이드오프:**
- **overlay2**: 대부분의 경우 최선, 하지만 XFS에서 d_type=true 필요
- **btrfs/zfs**: 스냅샷 기능 우수하나 설정 복잡성 증가
- 운영 환경에서는 backing 파일시스템과 호환성 확인 필수

**참고자료**
- [Use the OverlayFS storage driver](https://docs.docker.com/storage/storagedriver/overlayfs-driver/)[^7]

</details>

[^7]: Docker 공식 문서 - OverlayFS 스토리지 드라이버

### DOCKER-008
Docker Hub와 프라이빗 레지스트리의 차이점과 각각의 사용 시나리오를 설명해 주세요.

<details>
<summary>답변</summary>

**Docker Hub:**
- Docker 공식 퍼블릭 레지스트리
- 공식 이미지, 커뮤니티 이미지 제공
- 무료 플랜: 퍼블릭 무제한, 프라이빗 제한
- 자동 빌드, 취약점 스캔 기능

**프라이빗 레지스트리:**
- 자체 호스팅 또는 클라우드 제공 (ECR, GCR, ACR 등)
- 완전한 접근 제어
- 내부 네트워크에서 빠른 이미지 전송
- 규정 준수 및 보안 요구사항 충족

**사용 시나리오:**
- **Docker Hub**: 오픈소스 프로젝트, 공개 이미지 배포, 개인 학습
- **프라이빗**: 기업 내부 애플리케이션, 민감한 코드, 규정 준수 필요 시

**참고자료**
- [Docker Hub](https://docs.docker.com/docker-hub/)[^8]

</details>

[^8]: Docker 공식 문서 - Docker Hub

### DOCKER-009
OCI(Open Container Initiative)란 무엇이며, Docker와의 관계를 설명해 주세요.

<details>
<summary>답변</summary>

**OCI(Open Container Initiative):**
Linux Foundation 산하의 프로젝트로, 컨테이너 포맷과 런타임에 대한 개방형 표준을 정의합니다.

**주요 표준:**
- **Runtime Specification**: 컨테이너 런타임 표준 (runc가 참조 구현)
- **Image Specification**: 이미지 포맷 표준
- **Distribution Specification**: 이미지 배포 표준

**Docker와의 관계:**
- Docker가 OCI 설립에 참여하고 초기 기술 기여
- Docker의 컨테이너 런타임(runc)을 OCI에 기증
- Docker 이미지는 OCI 이미지 스펙과 호환
- 이로 인해 Docker 이미지를 다른 OCI 호환 런타임(containerd, CRI-O 등)에서 실행 가능

**참고자료**
- [Open Container Initiative](https://opencontainers.org/)[^9]

</details>

[^9]: OCI 공식 사이트

### DOCKER-010
Docker 아키텍처에서 containerd와 runc의 역할과 위치를 설명해 주세요.

<details>
<summary>답변</summary>

**아키텍처 흐름:**
```
Docker CLI → Docker Daemon → containerd → runc → 컨테이너
```

**containerd:**
- 고수준 컨테이너 런타임
- 이미지 전송 및 저장 관리
- 컨테이너 실행 및 감독
- 네트워크, 스토리지 관리
- CNCF 졸업 프로젝트

**runc:**
- 저수준 컨테이너 런타임 (OCI 참조 구현)
- 실제로 컨테이너 프로세스 생성 및 실행
- namespace, cgroups 설정
- 컨테이너 시작 후 종료됨

Docker는 이 계층 구조를 통해 모듈화되어 있으며, Kubernetes도 containerd를 직접 사용할 수 있습니다.

**참고자료**
- [containerd](https://containerd.io/)[^10]

</details>

[^10]: containerd 공식 사이트

---

## 📌 Dockerfile

### DOCKER-011
Dockerfile의 주요 명령어(FROM, RUN, CMD, ENTRYPOINT, COPY, ADD)의 역할과 차이점을 설명해 주세요.

<details>
<summary>답변</summary>

| 명령어 | 역할 | 특징 |
|--------|------|------|
| **FROM** | 베이스 이미지 지정 | Dockerfile 시작점, 멀티스테이지 가능 |
| **RUN** | 빌드 시 명령 실행 | 새 레이어 생성, 패키지 설치 등 |
| **CMD** | 컨테이너 실행 시 기본 명령 | docker run 인자로 덮어쓰기 가능 |
| **ENTRYPOINT** | 컨테이너 실행 시 고정 명령 | CMD와 조합 가능, `--entrypoint`로 덮어쓰기 가능 |
| **COPY** | 파일/디렉토리 복사 | 로컬 파일만, 단순하고 명확 |
| **ADD** | 파일 복사 + 추가 기능 | URL 다운로드, tar 자동 추출 |

**권장 사항:**
- 단순 복사는 COPY 사용 (명확성)
- ADD는 tar 추출 필요 시에만 사용

**참고자료**
- [Dockerfile reference](https://docs.docker.com/reference/dockerfile/)[^11]

</details>

[^11]: Docker 공식 문서 - Dockerfile 레퍼런스

### DOCKER-012
Dockerfile의 CMD와 ENTRYPOINT 명령어의 차이점을 설명하고, 언제 어떤 것을 사용해야 하는지 예시를 들어 설명해 주세요.

<details>
<summary>답변</summary>

**차이점:**

| 구분 | CMD | ENTRYPOINT |
|------|-----|------------|
| 덮어쓰기 | `docker run` 인자로 쉽게 덮어씀 | `--entrypoint` 옵션 필요 |
| 역할 | 기본 인자 제공 | 고정 실행 명령 |
| 조합 | ENTRYPOINT의 기본 인자로 사용 가능 | CMD와 함께 사용 가능 |

**사용 예시:**

```dockerfile
# 1. CMD만 사용 - 범용 이미지
CMD ["python", "app.py"]

# 2. ENTRYPOINT만 사용 - 실행 파일 컨테이너
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# 3. 조합 사용 - 유연한 CLI 도구
ENTRYPOINT ["curl"]
CMD ["--help"]  # docker run image google.com 으로 덮어쓰기 가능
```

**참고자료**
- [ENTRYPOINT](https://docs.docker.com/reference/dockerfile/#entrypoint)[^12]

</details>

[^12]: Docker 공식 문서 - ENTRYPOINT

### DOCKER-013
Dockerfile의 COPY와 ADD 명령어의 차이점은 무엇이며, 어떤 상황에서 각각을 사용해야 하나요?

<details>
<summary>답변</summary>

**COPY:**
- 로컬 파일/디렉토리를 이미지로 복사
- 단순하고 명확한 동작
- **권장**: 대부분의 경우 COPY 사용

**ADD:**
- COPY의 모든 기능 포함
- URL에서 파일 다운로드 가능
- tar 아카이브 자동 추출

**사용 지침:**

```dockerfile
# COPY 사용 - 일반적인 파일 복사
COPY package.json ./
COPY src/ ./src/

# ADD 사용 - tar 추출이 필요할 때
ADD app.tar.gz /app/
```

**ADD 주의점:**
- URL 다운로드보다 `RUN curl` 또는 `RUN wget` 권장 (레이어 최적화, 캐시 무효화 제어 가능)
- 예상치 못한 tar 추출 발생 가능 (의도치 않은 파일 추출로 보안 위험)
- ADD로 URL에서 다운로드 시 파일 권한을 600으로 설정하며 실행 권한 없음

**Best Practice**: Docker 공식 문서에서는 대부분의 경우 COPY 사용을 권장하며, ADD는 로컬 tar 아카이브 자동 추출이 필요한 경우에만 사용하도록 권고

**참고자료**
- [COPY vs ADD](https://docs.docker.com/reference/dockerfile/#copy)[^13]

</details>

[^13]: Docker 공식 문서 - COPY

### DOCKER-014
멀티스테이지 빌드(Multi-stage Build)란 무엇이며, 어떤 장점이 있나요?

<details>
<summary>답변</summary>

**멀티스테이지 빌드:**
하나의 Dockerfile에서 여러 FROM 문을 사용하여 빌드 단계를 분리하고, 최종 이미지에는 필요한 결과물만 포함시키는 기법입니다.

```dockerfile
# 빌드 스테이지
FROM golang:1.21 AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp

# 실행 스테이지
FROM alpine:3.18
COPY --from=builder /app/myapp /myapp
CMD ["/myapp"]
```

**장점:**
- **이미지 크기 감소**: 빌드 도구, 소스코드 제외
- **보안 향상**: 불필요한 파일 미포함
- **Dockerfile 단순화**: 하나의 파일로 빌드/실행 환경 관리
- **빌드 캐시 활용**: 각 스테이지별 캐시

**참고자료**
- [Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)[^14]

</details>

[^14]: Docker 공식 문서 - 멀티스테이지 빌드

### DOCKER-015
Docker 멀티스테이지 빌드를 사용하여 Go 또는 Java 애플리케이션의 이미지 크기를 줄이는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**Go 예시:**
```dockerfile
# 빌드 스테이지 (약 800MB)
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o app

# 실행 스테이지 (약 10MB)
FROM scratch
COPY --from=builder /app/app /app
ENTRYPOINT ["/app"]
```

**Java 예시:**
```dockerfile
# 빌드 스테이지 (약 500MB)
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# 실행 스테이지 (약 200MB)
FROM eclipse-temurin:17-jre-alpine
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**핵심 포인트:**
- Go: scratch 또는 distroless 사용 가능 (정적 빌드)
- Java: JDK 대신 JRE 사용, Alpine 기반 선택

**참고자료**
- [Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)[^15]

</details>

[^15]: Docker 공식 문서 - 멀티스테이지 빌드

### DOCKER-016
.dockerignore 파일의 역할과 사용법을 설명해 주세요.

<details>
<summary>답변</summary>

**.dockerignore 역할:**
Docker 빌드 시 빌드 컨텍스트에서 제외할 파일/디렉토리를 지정합니다.

**장점:**
- 빌드 컨텍스트 크기 감소 → 빌드 속도 향상
- 불필요한 파일이 이미지에 포함되는 것 방지
- 민감한 정보(credentials, .env) 제외

**예시:**
```
# 버전 관리
.git
.gitignore

# 의존성
node_modules
vendor

# 빌드 결과물
dist
build
*.log

# 환경 설정
.env
.env.*
*.pem

# IDE
.idea
.vscode

# Docker 관련
Dockerfile*
docker-compose*
```

**참고자료**
- [.dockerignore file](https://docs.docker.com/build/building/context/#dockerignore-files)[^16]

</details>

[^16]: Docker 공식 문서 - .dockerignore 파일

### DOCKER-017
Dockerfile에서 ENV와 ARG의 차이점을 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | ARG | ENV |
|------|-----|-----|
| **사용 시점** | 빌드 시에만 | 빌드 + 런타임 |
| **설정 방법** | `--build-arg` | `-e` 또는 `docker run` |
| **이미지 포함** | 값은 미포함, 이력에 노출 가능 | 이미지에 포함 |
| **기본값** | Dockerfile에서 지정 가능 | Dockerfile에서 지정 가능 |
| **스코프** | FROM 이후 해당 빌드 스테이지 내에서만 | 모든 스테이지와 런타임에서 |

**예시:**
```dockerfile
# ARG - 빌드 시 버전 지정 (FROM 앞에서 선언 가능)
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}

# 주의: FROM 이후에는 ARG를 다시 선언해야 사용 가능
ARG NODE_VERSION  # 재선언 필요, 기본값 없이 이전 값 상속

# ENV - 런타임 환경 변수
ENV NODE_ENV=production
ENV PORT=3000
```

**ARG 스코프 함정 (자주 틀리는 부분):**
```dockerfile
ARG VERSION=1.0
FROM alpine

# 오류! VERSION이 여기서 비어있음 - FROM 이후 스코프가 리셋됨
RUN echo $VERSION  # 빈 값

# 올바른 사용법
ARG VERSION  # FROM 이후 재선언
RUN echo $VERSION  # 1.0
```

**빌드 명령:**
```bash
docker build --build-arg NODE_VERSION=20 -t myapp .
```

**보안 주의사항 (함정 질문):**
- ARG로 민감한 정보(비밀번호 등)를 전달하면 `docker history`로 노출됨
- ENV도 마찬가지로 `docker inspect`로 노출됨
- **해결책**: 빌드 시 secrets가 필요하면 BuildKit의 `--mount=type=secret` 사용
```dockerfile
# BuildKit secret mount (권장)
RUN --mount=type=secret,id=mysecret cat /run/secrets/mysecret
```
- 런타임 secrets는 Docker Swarm secrets나 외부 시크릿 관리 도구 사용

**참고자료**
- [ARG](https://docs.docker.com/reference/dockerfile/#arg)[^17]

</details>

[^17]: Docker 공식 문서 - ARG

### DOCKER-018
Dockerfile의 WORKDIR 명령어의 역할과 사용 시 주의점을 설명해 주세요.

<details>
<summary>답변</summary>

**WORKDIR 역할:**
- 이후 명령어(RUN, CMD, ENTRYPOINT, COPY, ADD)의 작업 디렉토리 설정
- 디렉토리가 없으면 자동 생성
- 절대/상대 경로 모두 사용 가능

**예시:**
```dockerfile
WORKDIR /app
COPY package.json .       # /app/package.json
RUN npm install           # /app에서 실행
WORKDIR /app/src          # 하위 디렉토리로 이동
COPY . .                  # /app/src로 복사
```

**주의점:**
- `RUN cd /path`보다 WORKDIR 사용 권장 (명확성, 유지보수)
- 절대 경로 사용 권장 (예측 가능한 동작)
- 여러 번 사용 가능, 상대 경로는 이전 WORKDIR 기준

**Bad Practice:**
```dockerfile
RUN cd /app && npm install  # 피해야 함
```

**참고자료**
- [WORKDIR](https://docs.docker.com/reference/dockerfile/#workdir)[^18]

</details>

[^18]: Docker 공식 문서 - WORKDIR

### DOCKER-019
Dockerfile에서 USER 명령어를 사용하는 이유와 보안상의 이점을 설명해 주세요.

<details>
<summary>답변</summary>

**USER 명령어:**
이후 명령어(RUN, CMD, ENTRYPOINT)를 실행할 사용자/그룹을 지정합니다.

**예시:**
```dockerfile
FROM node:18-alpine
WORKDIR /app

# 사용자 생성
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --chown=appuser:appgroup . .
RUN npm ci --only=production

# 비root 사용자로 전환
USER appuser
CMD ["node", "app.js"]
```

**보안상 이점:**
- **최소 권한 원칙**: 컨테이너 탈출 시 피해 최소화
- **호스트 보호**: root 권한으로 호스트 파일 시스템 접근 방지
- **취약점 완화**: 권한 상승 공격 어려움
- **규정 준수**: 많은 보안 정책에서 non-root 실행 요구

**주의 및 실무 고려사항:**
- 일부 작업(포트 1024 이하 바인딩)은 `CAP_NET_BIND_SERVICE` capability 필요
- 많은 공식 이미지(nginx, redis 등)는 이미 non-root 사용자 지원
- 파일 권한 문제: 볼륨 마운트 시 호스트와 컨테이너의 UID/GID 불일치 주의
- Kubernetes에서는 `runAsNonRoot: true`로 강제 가능

**참고자료**
- [USER](https://docs.docker.com/reference/dockerfile/#user)[^19]

</details>

[^19]: Docker 공식 문서 - USER

### DOCKER-020
HEALTHCHECK 명령어의 역할과 설정 옵션에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**HEALTHCHECK 역할:**
컨테이너 내 애플리케이션의 상태를 주기적으로 확인합니다.

**문법:**
```dockerfile
HEALTHCHECK [OPTIONS] CMD command

# 예시
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1
```

**옵션:**
| 옵션 | 기본값 | 설명 |
|------|--------|------|
| `--interval` | 30s | 헬스체크 간격 |
| `--timeout` | 30s | 타임아웃 |
| `--start-period` | 0s | 시작 후 대기 시간 |
| `--retries` | 3 | 실패 허용 횟수 |

**상태:**
- `starting`: 시작 중 (start-period 내)
- `healthy`: 정상 (exit 0)
- `unhealthy`: 비정상 (retries 초과)

**활용:** Docker Swarm, Compose에서 서비스 상태 관리 및 재시작 정책에 활용됩니다.

**참고자료**
- [HEALTHCHECK](https://docs.docker.com/reference/dockerfile/#healthcheck)[^20]

</details>

[^20]: Docker 공식 문서 - HEALTHCHECK

### DOCKER-021
Docker 이미지 레이어 수를 줄이고 이미지 크기를 최적화하는 Dockerfile 작성 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**레이어 수 줄이기:**
```dockerfile
# Bad - 3개 레이어
RUN apt-get update
RUN apt-get install -y curl
RUN rm -rf /var/lib/apt/lists/*

# Good - 1개 레이어
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*
```

**이미지 크기 최적화:**

1. **경량 베이스 이미지 사용**
   - `alpine`, `slim`, `distroless` 선택

2. **불필요한 파일 정리**
   - 패키지 캐시 삭제
   - 빌드 의존성 제거

3. **멀티스테이지 빌드 활용**

4. **.dockerignore 사용**

5. **레이어 순서 최적화**
   - 자주 변경되는 파일은 마지막에 COPY

```dockerfile
COPY package.json .        # 덜 변경됨
RUN npm install
COPY . .                   # 자주 변경됨
```

**참고자료**
- [Best practices for Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)[^21]

</details>

[^21]: Docker 공식 문서 - Dockerfile 베스트 프랙티스

### DOCKER-022
Docker 이미지 빌드 시 빌드 캐시가 무효화되는 조건과 캐시를 효율적으로 활용하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**캐시 무효화 조건:**
- Dockerfile 명령어 변경
- COPY/ADD 대상 파일 내용 변경 (체크섬 비교)
- 이전 레이어의 캐시가 무효화됨
- `--no-cache` 옵션 사용
- ARG 값 변경 (해당 ARG 사용하는 명령어부터)

**캐시 효율적 활용:**

1. **변경 빈도 순서로 명령어 배치**
```dockerfile
# 덜 변경되는 것 먼저
COPY package.json package-lock.json ./
RUN npm ci

# 자주 변경되는 것 나중에
COPY src/ ./src/
```

2. **의존성 파일 분리**
```dockerfile
# 의존성 정의 파일만 먼저 복사
COPY go.mod go.sum ./
RUN go mod download
COPY . .
```

3. **RUN 명령어 통합 여부 고려**
   - 자주 변경되는 명령은 분리
   - 관련 명령은 통합

**참고자료**
- [Leverage build cache](https://docs.docker.com/build/cache/)[^22]

</details>

[^22]: Docker 공식 문서 - 빌드 캐시 활용

---

## 📌 Docker 이미지 관리

### DOCKER-023
Docker 이미지를 빌드하는 과정과 주요 옵션들을 설명해 주세요.

<details>
<summary>답변</summary>

**빌드 과정:**
1. 빌드 컨텍스트(현재 디렉토리) 전송
2. Dockerfile 파싱
3. 각 명령어 순차 실행, 레이어 생성
4. 캐시 활용 (가능한 경우)
5. 최종 이미지 생성

**기본 명령:**
```bash
docker build -t myapp:1.0 .
```

**주요 옵션:**
| 옵션 | 설명 |
|------|------|
| `-t, --tag` | 이미지 이름:태그 지정 |
| `-f, --file` | Dockerfile 경로 지정 |
| `--build-arg` | ARG 값 전달 |
| `--no-cache` | 캐시 미사용 |
| `--target` | 멀티스테이지 특정 단계까지만 빌드 |
| `--platform` | 대상 플랫폼 (linux/amd64 등) |
| `--progress` | 출력 형식 (plain, tty, auto) |

```bash
docker build \
  -t myapp:1.0 \
  -f docker/Dockerfile.prod \
  --build-arg NODE_ENV=production \
  --target runtime \
  .
```

**참고자료**
- [docker build](https://docs.docker.com/reference/cli/docker/image/build/)[^23]

</details>

[^23]: Docker 공식 문서 - docker build

### DOCKER-024
Docker 이미지 태깅 전략과 버전 관리 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**태깅 전략:**

1. **Semantic Versioning**
```bash
myapp:1.0.0
myapp:1.0
myapp:1
```

2. **Git 기반**
```bash
myapp:abc1234        # commit hash
myapp:main-abc1234   # branch + hash
myapp:v1.2.3         # git tag
```

3. **환경/날짜 기반**
```bash
myapp:prod-20240115
myapp:staging
```

**권장 사항:**
- `latest` 태그는 프로덕션에서 피하기 (불명확)
- 불변 태그 사용 (commit hash, 버전)
- 다중 태그 적용

```bash
docker build -t myapp:1.0.0 -t myapp:1.0 -t myapp:latest .
```

**이미지 다이제스트:**
```bash
# 완전히 불변한 참조
myapp@sha256:abc123...
```

**참고자료**
- [Tagging best practices](https://docs.docker.com/develop/develop-images/guidelines/)[^24]

</details>

[^24]: Docker 공식 문서 - 이미지 작성 가이드라인

### DOCKER-025
Docker 이미지를 프라이빗 레지스트리에 푸시하고 풀하는 과정을 설명해 주세요.

<details>
<summary>답변</summary>

**1. 레지스트리 로그인:**
```bash
docker login registry.example.com
# 또는
docker login -u username -p password registry.example.com
```

**2. 이미지 태깅:**
```bash
# 레지스트리 주소를 포함하여 태그
docker tag myapp:1.0 registry.example.com/myproject/myapp:1.0
```

**3. 이미지 푸시:**
```bash
docker push registry.example.com/myproject/myapp:1.0
```

**4. 이미지 풀:**
```bash
docker pull registry.example.com/myproject/myapp:1.0
```

**클라우드 레지스트리 예시:**
```bash
# AWS ECR
aws ecr get-login-password | docker login --username AWS --password-stdin 123456789.dkr.ecr.ap-northeast-2.amazonaws.com

# GCP GCR
gcloud auth configure-docker
docker push gcr.io/myproject/myapp:1.0
```

**참고자료**
- [docker push](https://docs.docker.com/reference/cli/docker/image/push/)[^25]

</details>

[^25]: Docker 공식 문서 - docker push

### DOCKER-026
dangling 이미지란 무엇이며, 이를 정리하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**Dangling 이미지란:**
태그가 없는 이미지로, `<none>:<none>`으로 표시됩니다. 주로 새 이미지 빌드 시 기존 태그가 새 이미지로 이동하면서 발생합니다.

**확인 방법:**
```bash
# dangling 이미지 목록
docker images -f "dangling=true"

# 또는
docker images | grep "<none>"
```

**정리 방법:**
```bash
# dangling 이미지만 삭제
docker image prune

# 확인 없이 삭제
docker image prune -f

# 사용하지 않는 모든 이미지 삭제
docker image prune -a
```

**전체 정리:**
```bash
# 중지된 컨테이너, 네트워크, dangling 이미지, 캐시 모두 삭제
docker system prune

# 볼륨 포함
docker system prune --volumes
```

**참고자료**
- [docker image prune](https://docs.docker.com/reference/cli/docker/image/prune/)[^26]

</details>

[^26]: Docker 공식 문서 - docker image prune

### DOCKER-027
Docker 이미지의 히스토리를 확인하고 각 레이어의 크기를 분석하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**이미지 히스토리 확인:**
```bash
docker history myapp:1.0

# 전체 명령어 표시
docker history --no-trunc myapp:1.0

# 특정 형식으로 출력
docker history --format "{{.CreatedBy}}: {{.Size}}" myapp:1.0
```

**출력 예시:**
```
IMAGE          CREATED       CREATED BY                                      SIZE
abc123         2 hours ago   CMD ["node" "app.js"]                           0B
def456         2 hours ago   COPY . . # buildkit                             15MB
ghi789         2 hours ago   RUN npm install # buildkit                      150MB
...
```

**상세 분석 도구:**
```bash
# dive - 이미지 레이어 분석 도구
dive myapp:1.0

# docker inspect
docker inspect myapp:1.0 --format '{{.RootFS.Layers}}'
```

**최적화 포인트:**
- 큰 레이어 식별 후 최적화
- 불필요한 파일 제거 확인
- 캐시 정리 여부 확인

**참고자료**
- [docker history](https://docs.docker.com/reference/cli/docker/image/history/)[^27]

</details>

[^27]: Docker 공식 문서 - docker history

### DOCKER-028
Docker base 이미지를 선택할 때 고려해야 할 요소들을 설명해 주세요. (alpine, slim, scratch 등)

<details>
<summary>답변</summary>

| 이미지 | 크기 | 특징 | 사용 사례 |
|--------|------|------|-----------|
| **scratch** | 0B | 완전히 비어있음, CA 인증서 없음 | 정적 바이너리 (Go, Rust) |
| **distroless** | ~2-20MB | Google 제공, 쉘 없음, 언어별 런타임만 | 프로덕션 보안 중시 |
| **alpine** | ~5MB | musl libc, busybox, apk | 경량 컨테이너, 쉘 필요 시 |
| **slim** | ~80MB | Debian 최소 설치, glibc | glibc 필요한 라이브러리 |
| **기본** | ~100MB+ | 전체 OS 패키지 | 디버깅, 개발 환경 |

**트레이드오프 상세 (함정 질문 빈출):**

1. **Alpine의 musl libc 이슈:**
   - 일부 C 라이브러리(특히 glibc 전용)와 비호환
   - Python의 일부 패키지, Node.js native addon에서 문제 발생 가능
   - DNS 해석 동작이 glibc와 다름 (특히 `/etc/hosts` 처리)

2. **scratch의 제약:**
   - CA 인증서 없음 → HTTPS 호출 실패 (직접 복사 필요)
   - 쉘 없음 → `docker exec` 디버깅 불가
   - 사용자/그룹 없음 → USER 명령어 제한적

3. **distroless 권장 이유:**
   - 공격 표면 최소화 (쉘, 패키지 매니저 없음)
   - CVE 스캔 시 취약점 적음
   - 언어별 런타임(Java, Python, Node.js 등) 제공

**실무 권장:**
- 보안 최우선: distroless 또는 scratch
- 범용/디버깅 필요: alpine (단, musl 이슈 테스트 필수)
- 복잡한 네이티브 의존성: slim
- Node.js에서 native addon 사용 시: slim 권장 (alpine은 추가 빌드 도구 필요)

**참고자료**
- [Best practices for Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#from)[^28]

</details>

[^28]: Docker 공식 문서 - FROM 베스트 프랙티스

### DOCKER-029
Docker 이미지를 파일로 저장(save)하고 로드(load)하는 방법과 사용 시나리오를 설명해 주세요.

<details>
<summary>답변</summary>

**이미지 저장 (save):**
```bash
# 단일 이미지
docker save -o myapp.tar myapp:1.0

# 여러 이미지
docker save -o images.tar myapp:1.0 nginx:latest

# gzip 압축
docker save myapp:1.0 | gzip > myapp.tar.gz
```

**이미지 로드 (load):**
```bash
docker load -i myapp.tar

# gzip 압축 해제 및 로드
gunzip -c myapp.tar.gz | docker load
```

**사용 시나리오:**
1. **에어갭 환경**: 인터넷 없는 폐쇄망에 이미지 전달
2. **백업**: 중요 이미지 아카이브
3. **오프라인 배포**: USB 등으로 물리적 전달
4. **CI/CD 아티팩트**: 빌드 결과물 저장

**export/import와 차이:**
- `save/load`: 이미지 전체 (레이어, 메타데이터 포함)
- `export/import`: 컨테이너 파일시스템 (단일 레이어)

**참고자료**
- [docker save](https://docs.docker.com/reference/cli/docker/image/save/)[^29]

</details>

[^29]: Docker 공식 문서 - docker save

### DOCKER-030
Docker Content Trust란 무엇이며, 이미지 서명의 중요성을 설명해 주세요.

<details>
<summary>답변</summary>

**Docker Content Trust (DCT):**
이미지 게시자의 신원을 검증하고, 이미지 무결성을 보장하는 보안 기능입니다. Notary 프로젝트 기반으로 구현되었습니다.

**활성화:**
```bash
export DOCKER_CONTENT_TRUST=1

# 또는 명령어별
docker pull --disable-content-trust=false myimage
```

**이미지 서명:**
```bash
# 서명된 이미지 푸시
docker push registry.example.com/myapp:1.0
# 자동으로 서명됨 (DCT 활성화 시)
```

**이미지 서명의 중요성:**
1. **무결성**: 이미지가 변조되지 않았음을 보장
2. **신뢰성**: 이미지 게시자 신원 확인
3. **공급망 보안**: 중간자 공격 방지
4. **규정 준수**: 보안 정책 요구사항 충족

**동작 원리:**
- 오프라인 키: root key (안전하게 보관)
- 온라인 키: 이미지 서명용

**참고자료**
- [Content trust in Docker](https://docs.docker.com/engine/security/trust/)[^30]

</details>

[^30]: Docker 공식 문서 - Docker Content Trust

---

## 📌 Docker 네트워크

### DOCKER-031
Docker의 기본 네트워크 드라이버 종류(bridge, host, none, overlay)와 각각의 특징을 설명해 주세요.

<details>
<summary>답변</summary>

| 드라이버 | 특징 | 사용 사례 |
|----------|------|-----------|
| **bridge** | 기본값, 가상 브릿지 네트워크, NAT 사용 | 단일 호스트, 독립 컨테이너 |
| **host** | 호스트 네트워크 스택 직접 사용, 격리 없음 | 네트워크 성능 중요 시 (Linux만) |
| **none** | 네트워크 비활성화, loopback만 존재 | 완전한 네트워크 격리 |
| **overlay** | 다중 호스트 간 네트워크, VXLAN 사용 | Docker Swarm, 클러스터 |
| **macvlan** | 컨테이너에 고유 MAC 주소 할당 | 레거시 앱, 물리 네트워크 직접 연결 |
| **ipvlan** | macvlan과 유사, MAC 공유 | macvlan 제약이 있는 환경 |

**네트워크 드라이버 선택 트레이드오프:**
- **bridge**: 가장 안전하고 범용적이나 NAT 오버헤드 있음
- **host**: 성능 최적이나 포트 충돌 위험, 보안 경계 약화
- **overlay**: 멀티호스트에 필수이나 VXLAN 캡슐화로 약간의 성능 저하
- **macvlan**: 외부 네트워크와 직접 통신 가능하나 호스트와 컨테이너 간 통신 복잡

**예시:**
```bash
# bridge (기본)
docker run -d --network bridge nginx

# host
docker run -d --network host nginx

# none
docker run -d --network none nginx

# 사용자 정의 네트워크
docker network create mynet
docker run -d --network mynet nginx
```

**참고자료**
- [Network drivers](https://docs.docker.com/network/drivers/)[^31]

</details>

[^31]: Docker 공식 문서 - 네트워크 드라이버

### DOCKER-032
Docker bridge 네트워크의 동작 원리와 컨테이너 간 통신 방식을 설명해 주세요.

<details>
<summary>답변</summary>

**동작 원리:**
1. Docker가 호스트에 가상 브릿지(`docker0`) 생성
2. 각 컨테이너에 veth(가상 이더넷) 페어 생성
3. 한쪽은 컨테이너 내 eth0, 다른 쪽은 브릿지에 연결
4. 컨테이너는 브릿지를 통해 통신

**네트워크 구조:**
```
호스트
├── docker0 (172.17.0.1)
│   ├── vethXXX ── 컨테이너A (172.17.0.2)
│   └── vethYYY ── 컨테이너B (172.17.0.3)
```

**컨테이너 간 통신:**
```bash
# 기본 bridge - IP로 통신 (DNS 미지원)
docker run -d --name web nginx
docker run -it alpine ping 172.17.0.2

# 사용자 정의 bridge - 컨테이너 이름으로 통신 (DNS 지원)
docker network create mynet
docker run -d --name web --network mynet nginx
docker run -it --network mynet alpine ping web
```

**외부 통신:**
- NAT(MASQUERADE)를 통해 호스트 IP로 외부 통신

**참고자료**
- [Bridge network driver](https://docs.docker.com/network/drivers/bridge/)[^32]

</details>

[^32]: Docker 공식 문서 - Bridge 네트워크

### DOCKER-033
Docker host 네트워크 모드의 특징과 사용 시 주의점을 설명해 주세요.

<details>
<summary>답변</summary>

**특징:**
- 컨테이너가 호스트의 네트워크 스택을 직접 사용
- 네트워크 격리 없음 (network namespace 공유)
- 포트 매핑 불필요 (컨테이너 포트 = 호스트 포트)
- NAT 오버헤드 없음 → 성능 향상

**사용 예시:**
```bash
docker run -d --network host nginx
# nginx가 호스트의 80번 포트에 직접 바인딩
```

**장점:**
- 네트워크 성능 최적화 (NAT 오버헤드 제거, 지연 시간 감소)
- 포트 매핑 복잡성 제거
- 많은 포트 사용 시 편리

**주의점 (중요한 트레이드오프):**
1. **포트 충돌**: 호스트와 같은 포트 사용 시 충돌 발생
2. **보안 위험**: 네트워크 격리 없음 - 컨테이너가 호스트의 모든 네트워크 인터페이스 접근 가능
3. **이식성 감소**: 호스트 네트워크 환경에 종속
4. **Linux 전용**: macOS/Windows의 Docker Desktop은 VM 내에서 동작하므로 host 네트워크가 실제 호스트가 아닌 VM의 네트워크를 의미
5. **컨테이너 간 통신**: localhost로 다른 컨테이너 접근 가능하여 의도치 않은 노출 위험

**사용 사례:**
- 네트워크 모니터링 도구
- 고성능 네트워크 애플리케이션

**참고자료**
- [Host network driver](https://docs.docker.com/network/drivers/host/)[^33]

</details>

[^33]: Docker 공식 문서 - Host 네트워크

### DOCKER-034
Docker overlay 네트워크란 무엇이며, 어떤 상황에서 사용하나요?

<details>
<summary>답변</summary>

**Overlay 네트워크:**
여러 Docker 호스트에 걸쳐 있는 분산 네트워크로, 서로 다른 호스트의 컨테이너가 같은 네트워크에 있는 것처럼 통신할 수 있게 합니다.

**동작 원리:**
- VXLAN(Virtual Extensible LAN) 기술 사용
- L2 over L3 터널링
- 각 호스트의 Docker 데몬이 협력

**생성 및 사용:**
```bash
# Swarm 모드에서 생성
docker network create -d overlay myoverlay

# 서비스에 연결
docker service create --network myoverlay --name web nginx
```

**사용 상황:**
1. **Docker Swarm**: 멀티 노드 클러스터
2. **마이크로서비스**: 여러 호스트에 분산된 서비스 간 통신
3. **서비스 디스커버리**: 내장 DNS로 서비스 이름 해석

**특징:**
- 자동 암호화 옵션 (`--opt encrypted`)
- 내장 로드 밸런싱
- 서비스 메시 라우팅

**참고자료**
- [Overlay network driver](https://docs.docker.com/network/drivers/overlay/)[^34]

</details>

[^34]: Docker 공식 문서 - Overlay 네트워크

### DOCKER-035
Docker의 내장 DNS 서비스는 어떻게 동작하며, 컨테이너 이름으로 통신하는 원리를 설명해 주세요.

<details>
<summary>답변</summary>

**Docker 내장 DNS:**
사용자 정의 네트워크에서 컨테이너 이름, 서비스 이름, 네트워크 별칭을 IP 주소로 해석해주는 DNS 서버입니다.

**동작 원리:**
1. 컨테이너의 `/etc/resolv.conf`에 내장 DNS 서버(127.0.0.11) 설정
2. 컨테이너 이름으로 DNS 쿼리 시 Docker DNS가 응답
3. 외부 도메인은 호스트 DNS로 포워딩

**예시:**
```bash
# 사용자 정의 네트워크 생성
docker network create mynet

# 컨테이너 실행
docker run -d --name db --network mynet postgres
docker run -d --name web --network mynet nginx

# web 컨테이너에서 db로 접근
docker exec web ping db  # db의 IP로 해석됨
```

**네트워크 별칭:**
```bash
docker run -d --name db --network mynet --network-alias database postgres
# database로도 접근 가능
```

**주의:**
- 기본 bridge 네트워크는 DNS 미지원
- 반드시 사용자 정의 네트워크 사용

**참고자료**
- [Networking with standalone containers](https://docs.docker.com/network/network-tutorial-standalone/)[^35]

</details>

[^35]: Docker 공식 문서 - 독립 컨테이너 네트워킹

### DOCKER-036
Docker 컨테이너의 포트 매핑(-p 옵션)과 포트 노출(EXPOSE)의 차이점을 설명해 주세요.

<details>
<summary>답변</summary>

**EXPOSE (Dockerfile):**
- 문서화 목적 (컨테이너가 사용하는 포트 명시)
- 실제로 포트를 열지 않음
- 이미지 메타데이터에 기록

```dockerfile
EXPOSE 80
EXPOSE 443
```

**-p 옵션 (docker run):**
- 실제 포트 매핑 수행
- 호스트 포트 ↔ 컨테이너 포트 연결
- 외부에서 접근 가능하게 함

```bash
# 호스트:컨테이너
docker run -p 8080:80 nginx

# 특정 IP만
docker run -p 127.0.0.1:8080:80 nginx

# 호스트 포트 자동 할당
docker run -p 80 nginx
docker run -P nginx  # EXPOSE 포트 모두 자동 매핑
```

**비교:**
| 구분 | EXPOSE | -p |
|------|--------|-----|
| 위치 | Dockerfile | docker run |
| 효과 | 문서화 | 실제 매핑 |
| 외부 접근 | 불가 | 가능 |

**참고자료**
- [EXPOSE](https://docs.docker.com/reference/dockerfile/#expose)[^36]

</details>

[^36]: Docker 공식 문서 - EXPOSE

### DOCKER-037
Docker에서 사용자 정의 네트워크(user-defined network)를 생성하고 사용하는 이유와 장점을 설명해 주세요.

<details>
<summary>답변</summary>

**생성 방법:**
```bash
docker network create mynet

# 옵션 지정
docker network create \
  --driver bridge \
  --subnet 192.168.100.0/24 \
  --gateway 192.168.100.1 \
  mynet
```

**사용:**
```bash
docker run -d --name web --network mynet nginx
docker run -d --name db --network mynet postgres
```

**장점 (기본 bridge 대비):**

1. **자동 DNS 해석**
   - 컨테이너 이름으로 통신 가능
   - 기본 bridge는 IP만 사용 가능

2. **더 나은 격리**
   - 네트워크별 컨테이너 격리
   - 명시적으로 연결된 컨테이너만 통신

3. **동적 연결/해제**
   ```bash
   docker network connect mynet container1
   docker network disconnect mynet container1
   ```

4. **설정 유연성**
   - 서브넷, 게이트웨이 직접 설정
   - IP 범위 지정 가능

5. **환경 변수 공유**
   - `--link` 없이도 서비스 디스커버리

**참고자료**
- [docker network create](https://docs.docker.com/reference/cli/docker/network/create/)[^37]

</details>

[^37]: Docker 공식 문서 - docker network create

### DOCKER-038
Docker 네트워크에서 컨테이너 간 통신을 제한하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**1. ICC(Inter-Container Communication) 비활성화:**
```bash
# 네트워크 생성 시 컨테이너 간 통신 차단
docker network create --opt com.docker.network.bridge.enable_icc=false isolated_net
```

**2. 별도 네트워크 분리:**
```bash
# 프론트엔드 네트워크
docker network create frontend

# 백엔드 네트워크
docker network create backend

# 웹서버는 frontend만
docker run -d --name web --network frontend nginx

# DB는 backend만
docker run -d --name db --network backend postgres

# API는 양쪽 연결 (중개자 역할)
docker run -d --name api --network frontend nginx
docker network connect backend api
```

**3. none 네트워크:**
```bash
docker run -d --network none isolated_container
```

**4. 방화벽 규칙 (iptables):**
```bash
# Docker가 생성한 규칙 커스터마이즈
iptables -I DOCKER-USER -s 172.18.0.2 -d 172.18.0.3 -j DROP
```

**5. Docker Compose에서:**
```yaml
services:
  web:
    networks:
      - frontend
  db:
    networks:
      - backend
```

**참고자료**
- [Networking overview](https://docs.docker.com/network/)[^38]

</details>

[^38]: Docker 공식 문서 - 네트워킹 개요

---

## 📌 Docker 볼륨

### DOCKER-039
Docker에서 데이터를 영속화하는 세 가지 방법(volumes, bind mounts, tmpfs)의 차이점을 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | Volumes | Bind Mounts | tmpfs |
|------|---------|-------------|-------|
| **저장 위치** | Docker 관리 영역 (/var/lib/docker/volumes/) | 호스트 파일 시스템 임의 경로 | 메모리 (RAM) |
| **관리** | Docker CLI로 관리 | 직접 관리 | - |
| **영속성** | 컨테이너 독립적 | 컨테이너 독립적 | 휘발성 (컨테이너 종료 시 삭제) |
| **성능 (Linux)** | 좋음 | 좋음 | 매우 빠름 |
| **성능 (Mac/Win)** | 좋음 (VM 내부) | 느림 (osxfs/grpcfuse 오버헤드) | 좋음 |
| **이식성** | 높음 | 낮음 (경로 의존) | Linux 전용 |
| **초기 데이터** | 이미지 데이터 자동 복사 | 호스트 데이터 그대로 사용 | 비어있음 |

**트레이드오프 상세:**
- **Bind Mounts의 macOS/Windows 성능 문제**: Docker Desktop에서 호스트-VM 간 파일 동기화로 인해 node_modules 같은 많은 파일 접근 시 매우 느림. 해결책: 의존성은 볼륨에, 소스만 bind mount
- **보안**: Bind mounts는 호스트 파일시스템에 직접 접근하므로 컨테이너가 민감한 파일 수정 가능

**사용 예시:**
```bash
# Volume
docker run -v mydata:/app/data nginx
docker run --mount type=volume,src=mydata,dst=/app/data nginx

# Bind Mount
docker run -v /host/path:/container/path nginx
docker run --mount type=bind,src=/host/path,dst=/container/path nginx

# tmpfs
docker run --tmpfs /app/temp nginx
docker run --mount type=tmpfs,dst=/app/temp nginx
```

**선택 기준:**
- **Volumes**: 프로덕션 데이터, DB 저장소
- **Bind Mounts**: 개발 환경, 설정 파일 공유
- **tmpfs**: 민감한 임시 데이터, 캐시

**참고자료**
- [Manage data in Docker](https://docs.docker.com/storage/)[^39]

</details>

[^39]: Docker 공식 문서 - Docker 데이터 관리

### DOCKER-040
Docker Named Volume이란 무엇이며, 바인드 마운트 대비 선호되는 이유를 설명해 주세요.

<details>
<summary>답변</summary>

**Named Volume 장점:**

1. **Docker가 관리**
   - 생성, 삭제, 목록 조회 가능
   ```bash
   docker volume create mydata
   docker volume ls
   docker volume inspect mydata
   ```

2. **이식성**
   - 호스트 경로에 의존하지 않음
   - 다른 환경에서 동일하게 동작

3. **볼륨 드라이버 지원**
   - 클라우드 스토리지, NFS 등 연동 가능
   ```bash
   docker volume create --driver=nfs myvolume
   ```

4. **백업 및 마이그레이션 용이**
   ```bash
   docker run --rm -v mydata:/data -v $(pwd):/backup \
     alpine tar cvf /backup/backup.tar /data
   ```

5. **초기 데이터 복사**
   - 이미지의 데이터를 볼륨으로 자동 복사

6. **Linux/Mac/Windows 호환**
   - 플랫폼 독립적

**바인드 마운트 사용 시:**
- 개발 환경에서 소스 코드 실시간 반영
- 특정 호스트 파일/디렉토리 접근 필요 시

**참고자료**
- [Volumes](https://docs.docker.com/storage/volumes/)[^40]

</details>

[^40]: Docker 공식 문서 - Volumes

### DOCKER-041
Docker 바인드 마운트(Bind Mount)란 무엇이며, 개발 환경에서 어떻게 활용할 수 있나요?

<details>
<summary>답변</summary>

**특징:**
- 호스트의 특정 경로를 컨테이너에 마운트
- 양방향 동기화 (호스트 변경 ↔ 컨테이너 반영)
- Docker 외부에서 관리
- 절대 경로 필요

**개발 환경 활용:**

1. **소스 코드 실시간 반영:**
```bash
docker run -v $(pwd)/src:/app/src node:18 npm run dev
```

2. **핫 리로드 개발:**
```yaml
# docker-compose.yml
services:
  app:
    build: .
    volumes:
      - ./src:/app/src
      - ./package.json:/app/package.json
    command: npm run dev
```

3. **설정 파일 주입:**
```bash
docker run -v ./config/nginx.conf:/etc/nginx/nginx.conf:ro nginx
```

4. **로그 접근:**
```bash
docker run -v ./logs:/var/log/app myapp
```

**주의점:**
- Windows/Mac은 파일 시스템 성능 이슈 가능
- `:ro` 플래그로 읽기 전용 설정 권장
- 호스트 경로 의존으로 이식성 낮음

**참고자료**
- [Bind mounts](https://docs.docker.com/storage/bind-mounts/)[^41]

</details>

[^41]: Docker 공식 문서 - Bind mounts

### DOCKER-042
Docker tmpfs 마운트란 무엇이며, 어떤 상황에서 사용하나요?

<details>
<summary>답변</summary>

**tmpfs 마운트란:**
호스트의 메모리(RAM)에 데이터를 저장하는 마운트 방식입니다. 컨테이너 종료 시 데이터가 삭제됩니다.

**사용 방법:**
```bash
# 기본 사용
docker run --tmpfs /app/temp myapp

# 옵션 지정
docker run --mount type=tmpfs,dst=/app/temp,tmpfs-size=100m,tmpfs-mode=1777 myapp
```

**옵션:**
- `tmpfs-size`: 최대 크기 (바이트)
- `tmpfs-mode`: 파일 모드 (권한)

**사용 상황:**

1. **민감한 임시 데이터**
   - 비밀번호, 토큰 등 디스크에 남기면 안 되는 정보

2. **고성능 캐시**
   - 빠른 읽기/쓰기가 필요한 임시 캐시

3. **빌드 아티팩트**
   - 빌드 중 생성되는 임시 파일

4. **세션 데이터**
   - 영속화 불필요한 세션 정보

**특징:**
- 매우 빠른 I/O
- Linux 호스트에서만 사용 가능
- Swarm 서비스에서 사용 가능

**참고자료**
- [tmpfs mounts](https://docs.docker.com/storage/tmpfs/)[^42]

</details>

[^42]: Docker 공식 문서 - tmpfs mounts

### DOCKER-043
Docker 볼륨의 생명주기와 컨테이너 삭제 시 볼륨 처리 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**볼륨 생명주기:**
- 볼륨은 컨테이너와 독립적
- 컨테이너 삭제 후에도 볼륨 유지
- 명시적으로 삭제해야 제거됨

**볼륨 생성/삭제:**
```bash
# 생성
docker volume create mydata

# 삭제
docker volume rm mydata

# 사용하지 않는 볼륨 모두 삭제
docker volume prune
```

**컨테이너 삭제 시 볼륨 처리:**

```bash
# 컨테이너만 삭제 (볼륨 유지)
docker rm mycontainer

# 컨테이너와 익명 볼륨 함께 삭제
docker rm -v mycontainer

# Docker Compose
docker-compose down           # 볼륨 유지
docker-compose down -v        # 볼륨 삭제
docker-compose down --volumes # 동일
```

**익명 볼륨 vs Named 볼륨:**
```bash
# 익명 볼륨 - docker rm -v로 삭제됨
docker run -v /data myapp

# Named 볼륨 - 명시적 삭제 필요
docker run -v mydata:/data myapp
```

**참고자료**
- [Volumes](https://docs.docker.com/storage/volumes/)[^43]

</details>

[^43]: Docker 공식 문서 - Volumes

### DOCKER-044
Docker 볼륨 드라이버란 무엇이며, 외부 스토리지와 연동하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**볼륨 드라이버:**
Docker 볼륨을 다양한 스토리지 백엔드와 연동할 수 있게 해주는 플러그인입니다.

**기본 드라이버:**
- `local`: 로컬 파일 시스템 (기본값)

**주요 서드파티 드라이버:**
- `nfs`: NFS 스토리지
- `azure-file`: Azure File Storage
- `cloudstor`: AWS EBS, EFS
- `convoy`: 분산 스토리지

**NFS 볼륨 예시:**
```bash
docker volume create \
  --driver local \
  --opt type=nfs \
  --opt o=addr=192.168.1.1,rw \
  --opt device=:/path/to/dir \
  nfs-volume
```

**플러그인 설치 및 사용:**
```bash
# 플러그인 설치
docker plugin install vieux/sshfs

# 볼륨 생성
docker volume create -d vieux/sshfs \
  -o sshcmd=user@host:/path \
  -o password=secret \
  sshvolume
```

**Docker Compose:**
```yaml
volumes:
  nfs-data:
    driver: local
    driver_opts:
      type: nfs
      o: addr=192.168.1.1,rw
      device: ":/exported/path"
```

**참고자료**
- [Volume plugins](https://docs.docker.com/engine/extend/plugins_volume/)[^44]

</details>

[^44]: Docker 공식 문서 - 볼륨 플러그인

### DOCKER-045
Docker에서 읽기 전용 볼륨 마운트의 사용 시나리오와 설정 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**설정 방법:**
```bash
# -v 옵션
docker run -v mydata:/app/data:ro nginx
docker run -v /host/config:/etc/app:ro nginx

# --mount 옵션
docker run --mount type=volume,src=mydata,dst=/app/data,readonly nginx
```

**Docker Compose:**
```yaml
services:
  app:
    volumes:
      - ./config:/app/config:ro
      - data:/app/data:ro
```

**사용 시나리오:**

1. **설정 파일 주입**
   ```bash
   docker run -v ./nginx.conf:/etc/nginx/nginx.conf:ro nginx
   ```

2. **인증서/키 파일**
   ```bash
   docker run -v ./certs:/etc/ssl/certs:ro myapp
   ```

3. **공유 데이터 보호**
   - 여러 컨테이너가 같은 데이터 참조 시 변경 방지

4. **보안 강화**
   - 컨테이너 탈취 시 데이터 변조 방지

5. **불변 인프라**
   - 컨테이너가 외부 데이터를 수정하지 못하게 보장

**참고자료**
- [Use volumes](https://docs.docker.com/storage/volumes/#use-a-read-only-volume)[^45]

</details>

[^45]: Docker 공식 문서 - 읽기 전용 볼륨

---

## 📌 Docker Compose

### DOCKER-046
Docker Compose란 무엇이며, 단일 docker run 명령어 대비 장점을 설명해 주세요.

<details>
<summary>답변</summary>

**Docker Compose:**
YAML 파일로 멀티 컨테이너 Docker 애플리케이션을 정의하고 실행하는 도구입니다.

**장점:**

1. **선언적 설정**
   - 인프라를 코드로 관리 (IaC)
   - 버전 관리 가능

2. **일관된 환경**
   - 개발, 테스트, 운영 환경 동일

3. **간편한 명령어**
   ```bash
   docker-compose up -d    # 전체 시작
   docker-compose down     # 전체 종료
   docker-compose logs -f  # 로그 확인
   ```

4. **서비스 간 의존성 관리**
   ```yaml
   services:
     web:
       depends_on:
         - db
   ```

5. **네트워크 자동 구성**
   - 기본 네트워크 생성
   - 서비스명으로 DNS 해석

6. **환경 변수 관리**
   - `.env` 파일 지원

**docker run vs compose:**
```bash
# docker run (복잡)
docker run -d --name web -p 80:80 --network mynet -e DB_HOST=db nginx

# docker-compose.yml (명확)
services:
  web:
    image: nginx
    ports: ["80:80"]
    environment:
      DB_HOST: db
```

**참고자료**
- [Docker Compose overview](https://docs.docker.com/compose/)[^46]

</details>

[^46]: Docker 공식 문서 - Docker Compose 개요

### DOCKER-047
docker-compose.yml 파일의 주요 구성 요소(version, services, networks, volumes)를 설명해 주세요.

<details>
<summary>답변</summary>

```yaml
# version: Compose 파일 버전 (최신 Compose에서는 선택사항)
version: "3.9"

# services: 컨테이너 정의
services:
  web:
    image: nginx:alpine
    build: ./web
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
    networks:
      - frontend
    volumes:
      - ./html:/usr/share/nginx/html

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    networks:
      - backend
    volumes:
      - db-data:/var/lib/postgresql/data

# networks: 사용자 정의 네트워크
networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true  # 외부 접근 차단

# volumes: Named 볼륨 정의
volumes:
  db-data:
    driver: local
```

**주요 구성 요소:**
- **services**: 애플리케이션을 구성하는 컨테이너들
- **networks**: 서비스 간 통신을 위한 네트워크
- **volumes**: 데이터 영속화를 위한 볼륨
- **configs/secrets**: 설정 및 민감 정보 (Swarm)

**참고자료**
- [Compose file reference](https://docs.docker.com/compose/compose-file/)[^47]

</details>

[^47]: Docker 공식 문서 - Compose 파일 레퍼런스

### DOCKER-048
Docker Compose에서 서비스 간 의존성(depends_on)을 설정하는 방법과 한계점을 설명해 주세요.

<details>
<summary>답변</summary>

**기본 설정:**
```yaml
services:
  web:
    depends_on:
      - db
      - redis
  db:
    image: postgres
  redis:
    image: redis
```

**조건부 의존성 (v2.1+):**
```yaml
services:
  web:
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started

  db:
    image: postgres
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 10s
      timeout: 5s
      retries: 5
```

**조건 옵션:**
- `service_started`: 컨테이너 시작됨 (기본)
- `service_healthy`: healthcheck 통과
- `service_completed_successfully`: 성공적으로 종료

**한계점 (함정 질문 - 매우 중요):**

1. **시작 순서만 보장, "준비" 상태는 보장 안 함**
   - `depends_on` 기본값은 컨테이너 "시작"만 기다림
   - DB 컨테이너 시작 ≠ DB가 연결 받을 준비 완료
   - 이것이 가장 흔한 Docker Compose 관련 문제

2. **해결 방법 (우선순위 순):**
   - `condition: service_healthy` + healthcheck 조합 (가장 권장)
   - 애플리케이션 레벨에서 연결 재시도 로직 구현 (탄력성 확보)
   - wait-for-it.sh, dockerize 같은 헬퍼 스크립트 (임시 해결책)

3. **실무 Best Practice:**
   - 애플리케이션은 항상 의존 서비스 장애에 대비해야 함
   - depends_on만으로는 충분하지 않음을 인지

```yaml
command: ["./wait-for-it.sh", "db:5432", "--", "npm", "start"]
```

**참고자료**
- [depends_on](https://docs.docker.com/compose/compose-file/05-services/#depends_on)[^48]

</details>

[^48]: Docker 공식 문서 - depends_on

### DOCKER-049
Docker Compose에서 환경 변수를 관리하는 방법(.env 파일, environment, env_file)을 설명해 주세요.

<details>
<summary>답변</summary>

**1. environment (인라인):**
```yaml
services:
  web:
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      # 또는 맵 형식
      NODE_ENV: production
      DB_HOST: db
```

**2. env_file (외부 파일):**
```yaml
services:
  web:
    env_file:
      - .env
      - .env.local
```

```
# .env
NODE_ENV=production
DB_PASSWORD=secret
```

**3. .env (Compose 변수 치환):**
```
# .env (docker-compose.yml과 같은 디렉토리)
TAG=1.0
PORT=8080
```

```yaml
services:
  web:
    image: myapp:${TAG}
    ports:
      - "${PORT}:80"
```

**우선순위 (높음 → 낮음):**
1. `docker-compose run -e`로 전달
2. 셸 환경 변수
3. `.env` 파일
4. `env_file` 지정 파일
5. Dockerfile의 ENV

**보안 팁:**
- `.env`는 `.gitignore`에 추가
- 민감 정보는 Docker secrets 사용 고려

**참고자료**
- [Environment variables](https://docs.docker.com/compose/environment-variables/)[^49]

</details>

[^49]: Docker 공식 문서 - 환경 변수

### DOCKER-050
Docker Compose에서 서비스를 스케일링하는 방법과 주의점을 설명해 주세요.

<details>
<summary>답변</summary>

**스케일링 방법:**

```bash
# 명령어로 스케일링
docker-compose up -d --scale web=3

# 또는
docker-compose scale web=3  # deprecated
```

**Compose 파일에서 정의:**
```yaml
services:
  web:
    image: nginx
    deploy:
      replicas: 3  # Swarm 모드 또는 compose v3
```

**주의점:**

1. **포트 충돌**
   ```yaml
   # Bad - 모두 같은 포트 사용 시도
   ports:
     - "80:80"

   # Good - 호스트 포트 자동 할당
   ports:
     - "80"
   ```

2. **컨테이너 이름 중복**
   - 자동으로 `_1`, `_2` 등 접미사 추가

3. **볼륨 공유**
   - 모든 인스턴스가 같은 볼륨 사용 시 충돌 가능

4. **로드 밸런싱**
   - Compose 자체는 로드 밸런서 미제공
   - 별도 nginx, traefik 등 필요

**로드 밸런서 예시:**
```yaml
services:
  nginx:
    image: nginx
    ports:
      - "80:80"
    depends_on:
      - web
  web:
    image: myapp
    # 포트 노출하지 않음, nginx에서 접근
```

**참고자료**
- [docker-compose up](https://docs.docker.com/reference/cli/docker/compose/up/)[^50]

</details>

[^50]: Docker 공식 문서 - docker-compose up

### DOCKER-051
Docker Compose의 네트워크 구성과 서비스 간 통신 방식을 설명해 주세요.

<details>
<summary>답변</summary>

**기본 동작:**
- Compose가 프로젝트별 기본 네트워크 자동 생성
- 네트워크 이름: `{프로젝트명}_default`
- 모든 서비스가 이 네트워크에 연결

**서비스 간 통신:**
```yaml
services:
  web:
    image: nginx
  db:
    image: postgres
```

```bash
# web 컨테이너에서 db로 접근
ping db
psql -h db -U postgres
```

**사용자 정의 네트워크:**
```yaml
services:
  frontend:
    networks:
      - front-tier
  backend:
    networks:
      - front-tier
      - back-tier
  db:
    networks:
      - back-tier

networks:
  front-tier:
  back-tier:
    internal: true  # 외부 접근 차단
```

**네트워크 별칭:**
```yaml
services:
  db:
    networks:
      default:
        aliases:
          - database
          - postgres
```

**외부 네트워크 사용:**
```yaml
networks:
  existing-network:
    external: true
```

**참고자료**
- [Networking in Compose](https://docs.docker.com/compose/networking/)[^51]

</details>

[^51]: Docker 공식 문서 - Compose 네트워킹

### DOCKER-052
Docker Compose에서 여러 compose 파일을 오버라이드하여 사용하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**기본 오버라이드:**
```bash
# 자동 병합 (docker-compose.yml + docker-compose.override.yml)
docker-compose up

# 명시적 파일 지정
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

**파일 구조 예시:**

```yaml
# docker-compose.yml (기본)
services:
  web:
    image: myapp
    ports:
      - "80"

# docker-compose.override.yml (개발용, 자동 적용)
services:
  web:
    build: .
    volumes:
      - ./src:/app/src
    environment:
      - DEBUG=true

# docker-compose.prod.yml (프로덕션)
services:
  web:
    image: myapp:${TAG}
    environment:
      - DEBUG=false
    deploy:
      replicas: 3
```

**병합 규칙:**
- 단일 값: 후순위 파일이 덮어씀
- 리스트: 병합됨
- 맵: 재귀적으로 병합

**환경별 사용:**
```bash
# 개발
docker-compose up

# 프로덕션
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

**참고자료**
- [Share Compose configurations](https://docs.docker.com/compose/multiple-compose-files/)[^52]

</details>

[^52]: Docker 공식 문서 - 여러 Compose 파일 사용

### DOCKER-053
Docker Compose의 healthcheck 설정과 서비스 시작 순서 제어 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**healthcheck 설정:**
```yaml
services:
  db:
    image: postgres:15
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s      # 체크 간격
      timeout: 5s        # 타임아웃
      retries: 5         # 재시도 횟수
      start_period: 30s  # 초기 유예 시간
```

**서비스 시작 순서 제어:**
```yaml
services:
  web:
    build: .
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started

  db:
    image: postgres:15
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 3
```

**일반적인 healthcheck 예시:**
```yaml
# HTTP 엔드포인트
test: ["CMD", "curl", "-f", "http://localhost:8080/health"]

# MySQL
test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]

# MongoDB
test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
```

**참고자료**
- [healthcheck](https://docs.docker.com/compose/compose-file/05-services/#healthcheck)[^53]

</details>

[^53]: Docker 공식 문서 - healthcheck

### DOCKER-054
Docker Compose에서 서비스 간 볼륨을 공유하는 방법과 volumes_from의 대안을 설명해 주세요.

<details>
<summary>답변</summary>

**Named 볼륨 공유 (권장):**
```yaml
services:
  app:
    volumes:
      - shared-data:/app/data

  worker:
    volumes:
      - shared-data:/worker/data

volumes:
  shared-data:
```

**바인드 마운트 공유:**
```yaml
services:
  app:
    volumes:
      - ./shared:/app/shared

  worker:
    volumes:
      - ./shared:/worker/shared
```

**volumes_from 대안:**

`volumes_from`은 v3에서 제거되었습니다. 대안:

```yaml
# v2 (deprecated)
services:
  web:
    volumes_from:
      - data-container

# v3+ 대안 - Named 볼륨 사용
services:
  web:
    volumes:
      - app-data:/var/www

  data-container:
    volumes:
      - app-data:/var/www

volumes:
  app-data:
```

**볼륨 드라이버 옵션:**
```yaml
volumes:
  shared-data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /host/path
```

**참고자료**
- [Volumes in Compose](https://docs.docker.com/compose/compose-file/07-volumes/)[^54]

</details>

[^54]: Docker 공식 문서 - Compose 볼륨

---

## 📌 Docker 보안

### DOCKER-055
Docker 컨테이너의 보안 위험 요소와 이를 완화하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**주요 보안 위험 (함정 질문 - 컨테이너 보안의 오해):**

| 위험 | 완화 방법 |
|------|-----------|
| root 권한 실행 | non-root 사용자 사용, User Namespace |
| 취약한 이미지 | 이미지 스캐닝, 신뢰할 수 있는 베이스 이미지, 정기 업데이트 |
| 과도한 권한 | capabilities 제한 (--cap-drop ALL 후 필요한 것만 추가) |
| 민감 정보 노출 | Docker secrets, 외부 시크릿 관리 도구 (환경변수 사용 주의) |
| 컨테이너 탈출 | 커널 업데이트, seccomp/AppArmor/SELinux, gVisor/Kata Containers |
| Docker 소켓 노출 | /var/run/docker.sock 마운트 금지 (마운트 시 호스트 root 획득 가능) |

**자주 오해하는 점:**
- 컨테이너 != 가상 머신: 컨테이너 격리는 VM보다 약함
- root in container = 잠재적 위험: User Namespace 없이 컨테이너 root는 호스트 root와 동일한 UID
- `--privileged` 플래그는 모든 보안 장치 해제 - 프로덕션에서 절대 사용 금지

**완화 방법:**

1. **non-root 실행:**
```dockerfile
USER 1000:1000
```

2. **읽기 전용 파일시스템:**
```bash
docker run --read-only myapp
```

3. **capabilities 제한:**
```bash
docker run --cap-drop ALL --cap-add NET_BIND_SERVICE myapp
```

4. **리소스 제한:**
```bash
docker run --memory=512m --cpus=1 myapp
```

5. **이미지 스캐닝:**
```bash
docker scout cves myimage
trivy image myimage
```

6. **네트워크 분리:**
```bash
docker network create --internal backend
```

**참고자료**
- [Docker security](https://docs.docker.com/engine/security/)[^55]

</details>

[^55]: Docker 공식 문서 - Docker 보안

### DOCKER-056
Docker에서 루트리스(rootless) 모드란 무엇이며, 어떤 보안상의 이점이 있나요?

<details>
<summary>답변</summary>

**Rootless 모드:**
Docker 데몬과 컨테이너를 root 권한 없이 일반 사용자로 실행하는 모드입니다.

**설치 및 실행:**
```bash
# 설치
dockerd-rootless-setuptool.sh install

# 실행
systemctl --user start docker
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock
```

**보안 이점:**

1. **데몬 탈취 방지**
   - 데몬 취약점 악용 시에도 root 권한 획득 불가

2. **컨테이너 탈출 완화**
   - 호스트에서도 일반 사용자 권한만 가짐

3. **User Namespace 활용**
   - 컨테이너 내 root = 호스트 일반 사용자

4. **다중 사용자 환경**
   - 각 사용자가 독립된 Docker 인스턴스 운영

**제한사항 (트레이드오프):**
- cgroups v2 필요 (cgroups v1 환경에서는 추가 설정 필요)
- 일부 네트워크 기능 제한 (ping 등 raw socket 사용 기능)
- 1024 미만 포트 바인딩 제한 (slirp4netns 사용으로 우회 가능)
- overlay2 스토리지 드라이버 제한 (fuse-overlayfs 사용)
- AppArmor/SELinux 프로필 적용 방식 다름
- Docker Swarm 모드 미지원

**언제 사용해야 하나:**
- 공유 시스템에서 각 사용자가 독립적으로 Docker 사용 시
- 보안이 최우선인 환경
- CI/CD 러너에서 Docker-in-Docker 대안으로

**vs 일반 모드:**
| 구분 | 일반 모드 | Rootless |
|------|-----------|----------|
| 데몬 권한 | root | 사용자 |
| 보안 | 낮음 | 높음 |
| 기능 | 완전 | 일부 제한 |

**참고자료**
- [Rootless mode](https://docs.docker.com/engine/security/rootless/)[^56]

</details>

[^56]: Docker 공식 문서 - Rootless 모드

### DOCKER-057
Docker 컨테이너를 non-root 사용자로 실행해야 하는 이유와 설정 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**이유:**

1. **최소 권한 원칙**
   - 필요한 최소한의 권한만 부여
   - 공격 표면 감소

2. **컨테이너 탈출 시 피해 최소화**
   - 취약점으로 탈출해도 일반 사용자 권한만 가짐
   - 호스트 시스템 보호

3. **파일 권한 보호**
   - 마운트된 볼륨의 파일 변조 방지
   - 호스트 파일 시스템 보호

4. **규정 준수**
   - PCI-DSS, SOC2 등 보안 정책 요구사항

**구현 방법:**

```dockerfile
FROM node:18-alpine

# 사용자 생성
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
COPY --chown=appuser:appgroup . .

# 사용자 전환
USER appuser

CMD ["node", "app.js"]
```

**실행 시 지정:**
```bash
docker run --user 1000:1000 myapp
docker run --user nobody myapp
```

**주의점:**
- 일부 작업은 root 필요 (패키지 설치 등)
- 빌드 시 root로 작업, 런타임에 non-root
- 포트 1024 미만 바인딩 시 capabilities 설정 필요

**참고자료**
- [USER instruction](https://docs.docker.com/reference/dockerfile/#user)[^57]

</details>

[^57]: Docker 공식 문서 - USER

### DOCKER-058
Docker secrets를 사용하여 민감한 정보를 관리하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**Docker Secrets (Swarm):**
```bash
# Secret 생성
echo "my_password" | docker secret create db_password -
docker secret create ssl_cert ./server.crt

# Secret 목록
docker secret ls

# 서비스에서 사용
docker service create \
  --name web \
  --secret db_password \
  myapp
```

**컨테이너 내 접근:**
```bash
# /run/secrets/에 파일로 마운트됨
cat /run/secrets/db_password
```

**Docker Compose (개발용):**
```yaml
services:
  db:
    image: postgres
    secrets:
      - db_password
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt
```

**환경 변수 vs Secrets (중요한 보안 트레이드오프):**
| 구분 | 환경 변수 | Secrets |
|------|-----------|---------|
| 저장 | 프로세스 환경 (메모리) | tmpfs 파일 (메모리) |
| 암호화 | X | O (Swarm에서 전송/저장 시 암호화) |
| 노출 위험 | `docker inspect`, `/proc/PID/environ`로 노출 | 권한 있는 컨테이너만 접근 |
| 로그 노출 | 애플리케이션 로그에 실수로 출력되기 쉬움 | 파일이라 로그 출력 위험 낮음 |
| 용도 | 일반 설정 | 비밀번호, API 키, 인증서 |

**Best Practice:**
- `_FILE` 접미사 패턴 사용 (예: `POSTGRES_PASSWORD_FILE`)
- 환경 변수에 직접 비밀번호 넣지 않기
- Compose의 secrets는 파일 기반이라 Swarm처럼 암호화되지 않음에 주의
- 프로덕션에서는 HashiCorp Vault, AWS Secrets Manager 등 외부 시크릿 관리 도구 권장

**참고자료**
- [Manage sensitive data](https://docs.docker.com/engine/swarm/secrets/)[^58]

</details>

[^58]: Docker 공식 문서 - Secrets 관리

### DOCKER-059
Docker 이미지 취약점 스캐닝의 중요성과 사용 가능한 도구들을 설명해 주세요.

<details>
<summary>답변</summary>

**중요성:**
- 알려진 CVE 취약점 조기 발견
- 공급망 보안 강화
- 규정 준수 (PCI-DSS, HIPAA 등)
- 프로덕션 배포 전 보안 검증

**주요 스캐닝 도구:**

| 도구 | 특징 |
|------|------|
| **Docker Scout** | Docker 공식, Docker Hub 통합 |
| **Trivy** | 오픈소스, 빠름, 포괄적 |
| **Snyk** | 개발자 친화적, CI/CD 통합 |
| **Clair** | 오픈소스, 레지스트리 통합 |
| **Anchore** | 정책 기반 스캐닝 |

**사용 예시:**
```bash
# Docker Scout
docker scout cves myimage:tag
docker scout quickview myimage:tag

# Trivy
trivy image myimage:tag
trivy image --severity HIGH,CRITICAL myimage:tag

# Snyk
snyk container test myimage:tag
```

**CI/CD 통합 (GitHub Actions):**
```yaml
- name: Scan image
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: myimage:${{ github.sha }}
    severity: 'CRITICAL,HIGH'
    exit-code: '1'
```

**참고자료**
- [Docker Scout](https://docs.docker.com/scout/)[^59]

</details>

[^59]: Docker 공식 문서 - Docker Scout

### DOCKER-060
Docker 컨테이너 보안을 위한 seccomp, AppArmor, SELinux 프로필의 역할과 설정 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**seccomp (Secure Computing Mode):**
- 시스템 콜 필터링
- 컨테이너가 사용할 수 있는 syscall 제한

```bash
# 기본 프로필 사용 (기본값)
docker run --security-opt seccomp=default.json myapp

# 커스텀 프로필
docker run --security-opt seccomp=custom.json myapp

# 비활성화 (비권장)
docker run --security-opt seccomp=unconfined myapp
```

**AppArmor:**
- MAC (Mandatory Access Control)
- 파일, 네트워크, 프로세스 접근 제어
- Ubuntu/Debian 기본

```bash
# 프로필 적용
docker run --security-opt apparmor=docker-default myapp

# 커스텀 프로필
docker run --security-opt apparmor=my-profile myapp
```

**SELinux:**
- MAC 시스템
- RHEL/CentOS/Fedora 기본

```bash
# 라벨 지정
docker run --security-opt label=level:s0:c100,c200 myapp

# SELinux 비활성화
docker run --security-opt label=disable myapp
```

**비교 및 트레이드오프:**
| 구분 | seccomp | AppArmor | SELinux |
|------|---------|----------|---------|
| 대상 | syscall 필터링 | 파일/네트워크/capability | 전체 시스템 리소스 |
| 복잡도 | 중간 | 낮음 | 높음 |
| 배포판 | 전체 (커널 3.17+) | Ubuntu/Debian | RHEL/CentOS/Fedora |
| 디버깅 | 어려움 (syscall 추적 필요) | 로그 기반 | audit 로그 기반 |
| 성능 영향 | 매우 낮음 | 낮음 | 낮음~중간 |

**실무 권장사항:**
- Docker 기본 seccomp 프로필은 300개 이상의 위험한 syscall 차단 - 대부분의 경우 기본값 유지
- 커스텀 프로필 필요 시: 먼저 기본 프로필로 테스트 후 필요한 syscall만 추가
- `--security-opt seccomp=unconfined`는 디버깅 시에만, 프로덕션에서는 절대 사용 금지

**참고자료**
- [Seccomp security profiles](https://docs.docker.com/engine/security/seccomp/)[^60]

</details>

[^60]: Docker 공식 문서 - Seccomp 보안 프로필

### DOCKER-061
Linux Capabilities란 무엇이며, Docker 컨테이너에서 이를 제한하는 방법과 이유를 설명해 주세요.

<details>
<summary>답변</summary>

**Linux Capabilities:**
root 권한을 세분화한 권한 단위입니다. 전체 root 권한 대신 필요한 capability만 부여할 수 있습니다.

**제한하는 이유:**
- 최소 권한 원칙 적용
- 컨테이너 탈출 시 피해 최소화
- 불필요한 시스템 접근 차단

**기본 capabilities (Docker):**
`CHOWN`, `DAC_OVERRIDE`, `FSETID`, `FOWNER`, `MKNOD`, `NET_RAW`, `SETGID`, `SETUID`, `SETFCAP`, `SETPCAP`, `NET_BIND_SERVICE`, `SYS_CHROOT`, `KILL`, `AUDIT_WRITE`

**설정 방법:**
```bash
# 모든 capabilities 제거
docker run --cap-drop ALL myapp

# 필요한 것만 추가
docker run --cap-drop ALL --cap-add NET_BIND_SERVICE myapp

# 특정 capability 추가
docker run --cap-add SYS_PTRACE myapp
```

**주요 capabilities:**
| Capability | 설명 |
|------------|------|
| `NET_BIND_SERVICE` | 1024 미만 포트 바인딩 |
| `SYS_ADMIN` | 다양한 관리 작업 (위험) |
| `NET_ADMIN` | 네트워크 설정 변경 |
| `SYS_PTRACE` | 프로세스 디버깅 |

**권장 설정:**
```bash
docker run --cap-drop ALL \
  --cap-add CHOWN \
  --cap-add SETGID \
  --cap-add SETUID \
  myapp
```

**참고자료**
- [Runtime privilege and capabilities](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities)[^61]

</details>

[^61]: Docker 공식 문서 - 런타임 권한 및 capabilities

### DOCKER-062
Docker에서 신뢰할 수 있는 베이스 이미지를 선택하고 관리하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**신뢰할 수 있는 이미지 선택:**

1. **공식 이미지 사용**
```bash
# Docker Official Images
docker pull nginx
docker pull node:18-alpine
```

2. **Verified Publisher 확인**
   - Docker Hub에서 인증 마크 확인

3. **이미지 다이제스트로 고정**
```dockerfile
FROM node:18-alpine@sha256:abc123...
```

**이미지 관리 방법:**

1. **정기적인 업데이트**
```bash
docker pull myimage:latest
```

2. **취약점 스캐닝**
```bash
docker scout cves myimage
trivy image myimage
```

3. **베이스 이미지 추적**
```yaml
# Dependabot 설정 (.github/dependabot.yml)
version: 2
updates:
  - package-ecosystem: docker
    directory: "/"
    schedule:
      interval: weekly
```

4. **내부 레지스트리 미러링**
   - 외부 이미지를 내부 레지스트리로 복제
   - 버전 관리 및 스캔 후 사용

5. **Golden Image 정책**
   - 승인된 베이스 이미지 목록 관리
   - CI에서 허용 이미지만 빌드 가능

**참고자료**
- [Docker Official Images](https://docs.docker.com/trusted-content/official-images/)[^62]

</details>

[^62]: Docker 공식 문서 - Docker Official Images

---

## 📌 Docker 리소스 관리

### DOCKER-063
Docker 컨테이너의 CPU 사용량을 제한하는 방법과 옵션들을 설명해 주세요.

<details>
<summary>답변</summary>

**CPU 제한 옵션:**

| 옵션 | 설명 | 예시 |
|------|------|------|
| `--cpus` | 사용할 CPU 개수 | `--cpus=1.5` |
| `--cpu-shares` | 상대적 가중치 (1024 기준) | `--cpu-shares=512` |
| `--cpu-period` | CFS 주기 (마이크로초) | `--cpu-period=100000` |
| `--cpu-quota` | CFS 할당량 (마이크로초) | `--cpu-quota=50000` |
| `--cpuset-cpus` | 특정 CPU 코어 지정 | `--cpuset-cpus=0,1` |

**사용 예시:**
```bash
# CPU 1.5개 사용 제한
docker run --cpus=1.5 myapp

# 상대적 가중치 (경쟁 시에만 적용)
docker run --cpu-shares=512 myapp

# 특정 코어만 사용
docker run --cpuset-cpus="0,2" myapp

# period/quota로 50% 제한
docker run --cpu-period=100000 --cpu-quota=50000 myapp
```

**Docker Compose:**
```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1.5'
        reservations:
          cpus: '0.5'
```

**--cpus vs --cpu-shares (중요한 개념 차이):**
- `--cpus`: 절대적 제한 - 1.5면 최대 1.5 CPU만 사용 가능 (CFS quota 기반)
- `--cpu-shares`: 상대적 가중치 - CPU 경쟁이 있을 때만 적용, 유휴 CPU는 더 사용 가능
  - 예: 컨테이너 A(shares=1024), B(shares=512)가 경쟁 시 A는 2/3, B는 1/3 할당
  - 다른 컨테이너가 없으면 B도 100% CPU 사용 가능

**실무 선택 기준:**
- 예측 가능한 성능이 필요하면 `--cpus` 사용
- 리소스 효율성을 원하면 `--cpu-shares` 사용
- 둘 다 조합 가능

**참고자료**
- [Runtime options with Memory, CPUs](https://docs.docker.com/config/containers/resource_constraints/)[^63]

</details>

[^63]: Docker 공식 문서 - 리소스 제약

### DOCKER-064
Docker 컨테이너의 메모리 사용량을 제한하는 방법과 OOM(Out of Memory) 처리 방식을 설명해 주세요.

<details>
<summary>답변</summary>

**메모리 제한 옵션:**

| 옵션 | 설명 |
|------|------|
| `--memory (-m)` | 메모리 제한 |
| `--memory-swap` | 메모리 + 스왑 합계 |
| `--memory-reservation` | 소프트 제한 (보장 메모리) |
| `--oom-kill-disable` | OOM Killer 비활성화 |
| `--oom-score-adj` | OOM 우선순위 조정 |

**사용 예시:**
```bash
# 512MB 메모리 제한
docker run --memory=512m myapp

# 메모리 512MB, 스왑 1GB (총 1.5GB)
docker run --memory=512m --memory-swap=1536m myapp

# 스왑 비활성화
docker run --memory=512m --memory-swap=512m myapp

# 소프트 제한
docker run --memory=1g --memory-reservation=512m myapp
```

**OOM 처리:**
```bash
# OOM Killer 비활성화 (--memory와 함께 사용)
docker run --memory=512m --oom-kill-disable myapp

# OOM 우선순위 조정 (-1000 ~ 1000)
docker run --oom-score-adj=500 myapp
```

**Docker Compose:**
```yaml
services:
  app:
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
```

**OOM 발생 시 동작 (함정 질문):**
- 기본: OOM Killer가 컨테이너 내 프로세스 중 점수가 높은 것 종료
- 종료 코드 137 (128 + SIGKILL 9)
- `--oom-kill-disable`: 메모리 부족 시 프로세스가 대기 상태로 빠져 시스템 hang 가능 - **프로덕션에서 절대 권장하지 않음**
- `--memory` 없이 `--oom-kill-disable` 사용 시 경고 발생

**실무 권장사항:**
- 메모리 제한은 애플리케이션 실제 사용량의 1.5~2배로 설정
- JVM 같은 경우 힙 메모리(-Xmx)와 컨테이너 메모리 제한 조율 필요
- `--memory-reservation`은 소프트 리밋으로, 시스템 메모리 압박 시에만 적용

**참고자료**
- [Memory constraints](https://docs.docker.com/config/containers/resource_constraints/#memory)[^64]

</details>

[^64]: Docker 공식 문서 - 메모리 제약

### DOCKER-065
Linux cgroups(Control Groups)란 무엇이며, Docker에서 컨테이너 리소스 제한에 어떻게 활용되나요?

<details>
<summary>답변</summary>

**cgroups (Control Groups):**
Linux 커널 기능으로, 프로세스 그룹에 대한 리소스(CPU, 메모리, I/O 등) 사용량을 제한, 계정, 격리합니다.

**cgroups 기능:**

1. **리소스 제한 (Resource Limiting)**
   - 그룹이 사용할 수 있는 리소스 상한 설정

2. **우선순위 (Prioritization)**
   - 리소스 경쟁 시 우선순위 설정

3. **계정 (Accounting)**
   - 리소스 사용량 측정 및 보고

4. **제어 (Control)**
   - 그룹 프로세스 동결, 재개, 체크포인트

**Docker에서의 활용:**
```bash
# 각 컨테이너가 cgroup에 매핑
docker run --memory=512m --cpus=1.5 myapp

# cgroup 확인
cat /sys/fs/cgroup/docker/<container_id>/memory.max
```

**cgroups v1 vs v2:**
| 구분 | v1 | v2 |
|------|-----|-----|
| 구조 | 계층별 분리 | 통합 계층 |
| 관리 | 복잡 | 단순 |
| 지원 | 레거시 | 현재 권장 |

**Docker 리소스 매핑:**
- `--memory` → `memory.max`
- `--cpus` → `cpu.max`
- `--pids-limit` → `pids.max`

**참고자료**
- [Configure cgroups](https://docs.docker.com/config/containers/resource_constraints/)[^65]

</details>

[^65]: Docker 공식 문서 - 리소스 제약 설정

### DOCKER-066
Docker 컨테이너의 I/O 성능을 제한하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**I/O 제한 옵션:**

| 옵션 | 설명 |
|------|------|
| `--blkio-weight` | 상대적 I/O 가중치 (10-1000) |
| `--device-read-bps` | 디바이스 읽기 속도 제한 |
| `--device-write-bps` | 디바이스 쓰기 속도 제한 |
| `--device-read-iops` | 초당 읽기 작업 수 제한 |
| `--device-write-iops` | 초당 쓰기 작업 수 제한 |

**사용 예시:**
```bash
# 상대적 I/O 가중치
docker run --blkio-weight=300 myapp

# 읽기 속도 제한 (1MB/s)
docker run --device-read-bps /dev/sda:1mb myapp

# 쓰기 속도 제한 (5MB/s)
docker run --device-write-bps /dev/sda:5mb myapp

# IOPS 제한
docker run --device-read-iops /dev/sda:100 myapp
docker run --device-write-iops /dev/sda:100 myapp
```

**Docker Compose (제한적 지원):**
```yaml
services:
  app:
    blkio_config:
      weight: 300
      device_read_bps:
        - path: /dev/sda
          rate: '1mb'
```

**주의사항 (함정 질문):**
- 블록 디바이스 경로 필요 (볼륨 경로 아님)
- **Direct I/O에만 적용** - 버퍼링된 I/O(일반적인 파일 작업)는 제한되지 않음
  - 대부분의 애플리케이션은 버퍼 I/O 사용하므로 이 옵션이 효과 없을 수 있음
  - O_DIRECT 플래그로 열린 파일에만 적용
- cgroups v2에서는 `io.max`로 통합 관리
- 실제 I/O 제한이 필요하면 cgroups v2 사용 권장

**확인:**
```bash
docker stats  # I/O 사용량 모니터링
```

**참고자료**
- [Block IO constraints](https://docs.docker.com/config/containers/resource_constraints/#block-io-bandwidth-blkio-constraint)[^66]

</details>

[^66]: Docker 공식 문서 - Block I/O 제약

### DOCKER-067
Docker 컨테이너의 PID 제한과 fork bomb 방지 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**Fork Bomb이란:**
무한히 프로세스를 생성하여 시스템 리소스를 고갈시키는 공격입니다.

```bash
# 예: :(){ :|:& };:
```

**PID 제한 설정:**
```bash
# 최대 100개 프로세스
docker run --pids-limit=100 myapp

# 제한 없음 (기본값, 위험)
docker run --pids-limit=-1 myapp
```

**Docker Compose:**
```yaml
services:
  app:
    deploy:
      resources:
        limits:
          pids: 100
```

**데몬 수준 기본값 설정:**
```json
// /etc/docker/daemon.json
{
  "default-pids-limit": 100
}
```

**확인:**
```bash
# 컨테이너 PID 확인
docker top <container>

# 또는
docker exec <container> ps aux | wc -l
```

**권장사항:**
- 프로덕션 환경에서 항상 설정
- 애플리케이션 특성에 맞게 값 조정
- 너무 낮으면 정상 동작 방해

**다른 보호 수단:**
- ulimit 설정: `docker run --ulimit nproc=100`
- seccomp 프로필로 fork 제한

**참고자료**
- [Runtime options](https://docs.docker.com/engine/reference/run/#runtime-constraints-on-resources)[^67]

</details>

[^67]: Docker 공식 문서 - 런타임 리소스 제약

### DOCKER-068
Docker 리소스 사용량을 실시간으로 모니터링하는 방법(docker stats)을 설명해 주세요.

<details>
<summary>답변</summary>

**docker stats 기본 사용:**
```bash
# 모든 실행 중인 컨테이너
docker stats

# 특정 컨테이너
docker stats container1 container2

# 한 번만 출력 (스크립트용)
docker stats --no-stream
```

**출력 정보:**
| 항목 | 설명 |
|------|------|
| CPU % | CPU 사용률 |
| MEM USAGE/LIMIT | 메모리 사용량/제한 |
| MEM % | 메모리 사용률 |
| NET I/O | 네트워크 입출력 |
| BLOCK I/O | 디스크 입출력 |
| PIDS | 프로세스 수 |

**포맷 지정:**
```bash
docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"

# JSON 출력
docker stats --no-stream --format "{{json .}}"
```

**주요 포맷 키:**
- `.Container`, `.Name`, `.ID`
- `.CPUPerc`, `.MemUsage`, `.MemPerc`
- `.NetIO`, `.BlockIO`, `.PIDs`

**활용 예시:**
```bash
# 메모리 사용량 정렬
docker stats --no-stream --format "{{.Name}}: {{.MemUsage}}" | sort -k2 -h

# 모니터링 스크립트
while true; do
  docker stats --no-stream
  sleep 5
done
```

**참고자료**
- [docker stats](https://docs.docker.com/reference/cli/docker/container/stats/)[^68]

</details>

[^68]: Docker 공식 문서 - docker stats

---

## 📌 Docker 로깅 및 모니터링

### DOCKER-069
Docker의 로깅 드라이버 종류와 각각의 특징을 설명해 주세요.

<details>
<summary>답변</summary>

**주요 로깅 드라이버:**

| 드라이버 | 설명 | 특징 |
|----------|------|------|
| **json-file** | JSON 파일 저장 (기본값) | docker logs 지원 |
| **local** | 최적화된 로컬 저장 | 압축, 로테이션 지원 |
| **syslog** | Syslog 서버 전송 | 중앙집중식 로깅 |
| **journald** | systemd journal | systemd 통합 |
| **fluentd** | Fluentd 전송 | 유연한 로그 라우팅 |
| **awslogs** | AWS CloudWatch | AWS 통합 |
| **gcplogs** | Google Cloud Logging | GCP 통합 |
| **splunk** | Splunk 전송 | 엔터프라이즈 로깅 |
| **none** | 로깅 비활성화 | 성능 최적화 |

**설정 방법:**
```bash
# 컨테이너별 설정
docker run --log-driver=fluentd --log-opt fluentd-address=localhost:24224 myapp

# 데몬 기본값 설정 (/etc/docker/daemon.json)
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

**Docker Compose:**
```yaml
services:
  app:
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
```

**참고자료**
- [Configure logging drivers](https://docs.docker.com/config/containers/logging/configure/)[^69]

</details>

[^69]: Docker 공식 문서 - 로깅 드라이버 설정

### DOCKER-070
Docker 컨테이너 로그를 확인하고 관리하는 방법(docker logs)을 설명해 주세요.

<details>
<summary>답변</summary>

**기본 사용:**
```bash
# 로그 출력
docker logs <container>

# 실시간 추적
docker logs -f <container>

# 마지막 N줄
docker logs --tail 100 <container>

# 타임스탬프 포함
docker logs -t <container>

# 특정 시간 이후
docker logs --since 2024-01-01T00:00:00 <container>
docker logs --since 10m <container>

# 특정 시간까지
docker logs --until 2024-01-01T12:00:00 <container>
```

**옵션 조합:**
```bash
# 최근 100줄을 실시간으로 타임스탬프와 함께
docker logs -f --tail 100 -t <container>
```

**Docker Compose:**
```bash
# 모든 서비스 로그
docker-compose logs

# 특정 서비스
docker-compose logs -f web

# 여러 서비스
docker-compose logs web db
```

**로그 위치 (json-file 드라이버):**
```bash
/var/lib/docker/containers/<container_id>/<container_id>-json.log
```

**주의사항 (중요한 트레이드오프):**
- 일부 로깅 드라이버(fluentd, awslogs, splunk 등)는 `docker logs` 미지원
  - 이 경우 로그는 외부 시스템에서만 확인 가능
  - 디버깅 시 불편 → `local` 또는 `json-file` + 외부 로그 수집기 조합 고려
- 로그 크기 관리 필요 - 기본 json-file은 로테이션 없음 → 디스크 가득 참 문제
- Docker 19.03+에서 `local` 드라이버 권장 (압축, 로테이션 기본 제공, docker logs 지원)

**참고자료**
- [docker logs](https://docs.docker.com/reference/cli/docker/container/logs/)[^70]

</details>

[^70]: Docker 공식 문서 - docker logs

### DOCKER-071
Docker 로그 로테이션을 설정하는 방법과 중요성을 설명해 주세요.

<details>
<summary>답변</summary>

**중요성:**
- 디스크 공간 고갈 방지
- 로그 파일 관리 용이
- 시스템 안정성 유지
- 성능 저하 방지 (대용량 로그 파일)

**설정 방법:**

**1. 컨테이너별 설정:**
```bash
docker run \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  myapp
```

**2. 데몬 기본값 설정:**
```json
// /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "5",
    "compress": "true"
  }
}
```
```bash
sudo systemctl restart docker
```

**3. Docker Compose:**
```yaml
services:
  app:
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
```

**옵션 설명:**
| 옵션 | 설명 | 예시 |
|------|------|------|
| `max-size` | 로그 파일 최대 크기 | 10m, 1g |
| `max-file` | 보관할 로그 파일 수 | 3, 5 |
| `compress` | gzip 압축 | true |

**local 드라이버 (권장):**
```json
{
  "log-driver": "local",
  "log-opts": {
    "max-size": "10m"
  }
}
```

**참고자료**
- [JSON File logging driver](https://docs.docker.com/config/containers/logging/json-file/)[^71]

</details>

[^71]: Docker 공식 문서 - JSON File 로깅 드라이버

### DOCKER-072
Docker 컨테이너의 메트릭을 수집하고 모니터링하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**내장 도구:**
```bash
# docker stats
docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

**Docker API:**
```bash
# 컨테이너 메트릭 API
curl --unix-socket /var/run/docker.sock \
  http://localhost/containers/<id>/stats
```

**cAdvisor:**
```bash
docker run -d \
  --name=cadvisor \
  -p 8080:8080 \
  -v /:/rootfs:ro \
  -v /var/run:/var/run:ro \
  -v /sys:/sys:ro \
  -v /var/lib/docker:/var/lib/docker:ro \
  gcr.io/cadvisor/cadvisor
```

**Prometheus + Grafana 스택:**
```yaml
# docker-compose.yml
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"

  cadvisor:
    image: gcr.io/cadvisor/cadvisor
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker:/var/lib/docker:ro
```

**수집 가능한 메트릭:**
- CPU 사용량, 메모리 사용량
- 네트워크 I/O, 디스크 I/O
- 컨테이너 수, 프로세스 수

**참고자료**
- [Collect Docker metrics with Prometheus](https://docs.docker.com/config/daemon/prometheus/)[^72]

</details>

[^72]: Docker 공식 문서 - Prometheus로 Docker 메트릭 수집

### DOCKER-073
Docker 이벤트를 모니터링하는 방법(docker events)과 활용 사례를 설명해 주세요.

<details>
<summary>답변</summary>

**기본 사용:**
```bash
# 실시간 이벤트 스트림
docker events

# 특정 시간 이후
docker events --since '2024-01-01'
docker events --since '10m'

# 특정 시간까지
docker events --until '2024-01-01T12:00:00'
```

**필터링:**
```bash
# 특정 컨테이너
docker events --filter container=myapp

# 특정 이벤트 타입
docker events --filter event=start
docker events --filter event=die

# 특정 이미지
docker events --filter image=nginx

# 타입별
docker events --filter type=container
docker events --filter type=image
docker events --filter type=network
```

**포맷:**
```bash
docker events --format '{{.Time}} {{.Type}} {{.Action}} {{.Actor.Attributes.name}}'

# JSON
docker events --format '{{json .}}'
```

**주요 이벤트:**
- **container**: create, start, stop, die, kill, pause, unpause
- **image**: pull, push, delete, tag
- **network**: create, connect, disconnect, destroy

**활용 사례:**
1. **자동 복구**: die 이벤트 감지 후 알림/재시작
2. **감사 로그**: 컨테이너 생성/삭제 기록
3. **모니터링 연동**: 이벤트 기반 알림
4. **CI/CD**: 배포 상태 추적

```bash
# 컨테이너 종료 시 알림
docker events --filter event=die | while read event; do
  echo "Container died: $event" | mail -s "Alert" admin@example.com
done
```

**참고자료**
- [docker events](https://docs.docker.com/reference/cli/docker/system/events/)[^73]

</details>

[^73]: Docker 공식 문서 - docker events

### DOCKER-074
Prometheus와 Grafana를 사용하여 Docker 컨테이너를 모니터링하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**아키텍처:**
```
Docker → cAdvisor → Prometheus → Grafana
```

**1. Docker 데몬 메트릭 활성화:**
```json
// /etc/docker/daemon.json
{
  "metrics-addr": "0.0.0.0:9323",
  "experimental": true
}
```

**2. docker-compose.yml:**
```yaml
services:
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker:/var/lib/docker:ro
    ports:
      - "8080:8080"
```

**3. prometheus.yml:**
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']

  - job_name: 'docker'
    static_configs:
      - targets: ['host.docker.internal:9323']
```

**4. Grafana 설정:**
- Data Source: Prometheus 추가
- Dashboard: Docker 대시보드 임포트 (ID: 893, 11600)

**주요 메트릭:**
- `container_cpu_usage_seconds_total`
- `container_memory_usage_bytes`
- `container_network_receive_bytes_total`

**참고자료**
- [Docker metrics with Prometheus](https://docs.docker.com/config/daemon/prometheus/)[^74]

</details>

[^74]: Docker 공식 문서 - Prometheus로 Docker 메트릭 수집

---

## 📌 Docker 운영 및 트러블슈팅

### DOCKER-075
Docker 컨테이너가 시작되지 않을 때 디버깅하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**1. 로그 확인:**
```bash
# 컨테이너 로그 (종료된 컨테이너도 가능)
docker logs <container>
docker logs --tail 50 <container>
```

**2. 컨테이너 상태 확인:**
```bash
docker ps -a  # 종료 코드 확인
docker inspect <container> | grep -A 10 "State"
```

**3. 종료 코드 분석:**
| 코드 | 의미 |
|------|------|
| 0 | 정상 종료 |
| 1 | 애플리케이션 오류 |
| 137 | OOM Killer (128+9) |
| 139 | 세그멘테이션 폴트 |
| 143 | SIGTERM으로 종료 |

**4. 인터랙티브 모드로 디버깅:**
```bash
# 셸로 진입하여 확인
docker run -it --entrypoint /bin/sh myimage

# 명령어 변경하여 실행
docker run -it myimage /bin/sh
```

**5. 이미지 검사:**
```bash
docker history myimage
docker inspect myimage
```

**6. 리소스 확인:**
```bash
docker system df
df -h
free -m
```

**7. 이벤트 확인:**
```bash
docker events --since '5m' --filter container=<container>
```

**일반적인 원인:**
- 잘못된 CMD/ENTRYPOINT
- 필요한 파일/환경 변수 누락
- 포트 충돌
- 리소스 부족
- 권한 문제

**참고자료**
- [Docker troubleshoot](https://docs.docker.com/config/daemon/troubleshoot/)[^75]

</details>

[^75]: Docker 공식 문서 - 트러블슈팅

### DOCKER-076
실행 중인 Docker 컨테이너에 접속하여 디버깅하는 방법(docker exec)을 설명해 주세요.

<details>
<summary>답변</summary>

**기본 사용:**
```bash
# 셸 접속
docker exec -it <container> /bin/bash
docker exec -it <container> /bin/sh  # Alpine 등

# 명령어 실행
docker exec <container> ls -la /app
docker exec <container> cat /etc/hosts
```

**주요 옵션:**
| 옵션 | 설명 |
|------|------|
| `-i` | 표준 입력 유지 |
| `-t` | TTY 할당 |
| `-u` | 사용자 지정 |
| `-w` | 작업 디렉토리 |
| `-e` | 환경 변수 |

**디버깅 명령어 예시:**
```bash
# 프로세스 확인
docker exec <container> ps aux

# 네트워크 확인
docker exec <container> netstat -tlnp
docker exec <container> cat /etc/resolv.conf

# 환경 변수 확인
docker exec <container> env

# 파일 시스템 확인
docker exec <container> df -h

# 로그 파일 확인
docker exec <container> tail -f /var/log/app.log
```

**root로 접속:**
```bash
docker exec -it -u root <container> /bin/bash
```

**디버깅 도구 설치 (임시):**
```bash
docker exec -it <container> apt-get update && apt-get install -y curl
docker exec -it <container> apk add --no-cache curl  # Alpine
```

**주의:** 프로덕션 컨테이너는 최소한의 도구만 포함하므로 디버깅 도구가 없을 수 있음

**참고자료**
- [docker exec](https://docs.docker.com/reference/cli/docker/container/exec/)[^76]

</details>

[^76]: Docker 공식 문서 - docker exec

### DOCKER-077
Docker 컨테이너의 파일 시스템 변경 사항을 확인하는 방법(docker diff)을 설명해 주세요.

<details>
<summary>답변</summary>

**docker diff:**
컨테이너 시작 이후 파일 시스템에서 변경된 파일과 디렉토리를 표시합니다.

**사용법:**
```bash
docker diff <container>
```

**출력 표시:**
| 기호 | 의미 |
|------|------|
| A | 추가됨 (Added) |
| C | 변경됨 (Changed) |
| D | 삭제됨 (Deleted) |

**출력 예시:**
```bash
$ docker diff mycontainer
A /app/data/newfile.txt
C /var/log/app.log
C /tmp
D /app/temp/cache.dat
```

**활용 사례:**

1. **디버깅:**
   - 애플리케이션이 예상치 못한 파일 생성/수정 확인

2. **보안 감사:**
   - 컨테이너 내 파일 변조 감지

3. **이미지 최적화:**
   - 불필요한 파일 생성 확인 후 Dockerfile 개선

4. **커밋 전 확인:**
```bash
# 변경 사항 확인 후 새 이미지 생성
docker diff mycontainer
docker commit mycontainer myimage:modified
```

**주의사항:**
- 실행 중이거나 정지된 컨테이너에서 사용 가능
- 볼륨 마운트된 경로는 표시되지 않음

**참고자료**
- [docker diff](https://docs.docker.com/reference/cli/docker/container/diff/)[^77]

</details>

[^77]: Docker 공식 문서 - docker diff

### DOCKER-078
Docker 컨테이너와 호스트 간 파일을 복사하는 방법(docker cp)을 설명해 주세요.

<details>
<summary>답변</summary>

**기본 문법:**
```bash
# 호스트 → 컨테이너
docker cp <src_path> <container>:<dest_path>

# 컨테이너 → 호스트
docker cp <container>:<src_path> <dest_path>
```

**사용 예시:**
```bash
# 파일 복사 (호스트 → 컨테이너)
docker cp ./config.json mycontainer:/app/config.json

# 디렉토리 복사
docker cp ./data/ mycontainer:/app/data/

# 파일 복사 (컨테이너 → 호스트)
docker cp mycontainer:/var/log/app.log ./logs/

# 디렉토리 복사 (컨테이너 → 호스트)
docker cp mycontainer:/app/data ./backup/
```

**옵션:**
| 옵션 | 설명 |
|------|------|
| `-a, --archive` | 모든 uid/gid 정보 보존 |
| `-L, --follow-link` | 심볼릭 링크 따라가기 |

```bash
docker cp -a mycontainer:/app/data ./backup/
```

**활용 사례:**
1. **설정 파일 주입:** 실행 중 컨테이너에 설정 업데이트
2. **로그 추출:** 디버깅을 위한 로그 파일 추출
3. **백업:** 컨테이너 데이터 백업
4. **디버깅:** 문제 분석을 위한 파일 추출

**주의사항:**
- 실행 중/정지된 컨테이너 모두 가능
- 볼륨에 쓰는 것보다 비효율적 (임시 용도)
- 심볼릭 링크 처리 주의

**참고자료**
- [docker cp](https://docs.docker.com/reference/cli/docker/container/cp/)[^78]

</details>

[^78]: Docker 공식 문서 - docker cp

### DOCKER-079
Docker 이미지와 컨테이너를 정리하여 디스크 공간을 확보하는 방법(docker system prune)을 설명해 주세요.

<details>
<summary>답변</summary>

**디스크 사용량 확인:**
```bash
docker system df
docker system df -v  # 상세 정보
```

**정리 명령어:**

```bash
# 기본 정리 (중지된 컨테이너, 미사용 네트워크, dangling 이미지, 빌드 캐시)
docker system prune

# 확인 없이 실행
docker system prune -f

# 볼륨 포함
docker system prune --volumes

# 미사용 이미지 모두 포함
docker system prune -a
```

**개별 정리:**
```bash
# 중지된 컨테이너
docker container prune

# dangling 이미지
docker image prune

# 미사용 이미지 (dangling + 컨테이너 없는)
docker image prune -a

# 미사용 볼륨
docker volume prune

# 미사용 네트워크
docker network prune

# 빌드 캐시
docker builder prune
```

**필터링:**
```bash
# 24시간 이상 된 것만
docker system prune --filter "until=24h"

# 특정 라벨 제외
docker image prune --filter "label!=keep"
```

**주의사항:**
- `prune -a`는 현재 사용 중이지 않은 모든 이미지 삭제
- 볼륨 삭제는 데이터 손실 주의
- CI/CD에서 정기적 실행 권장

**참고자료**
- [docker system prune](https://docs.docker.com/reference/cli/docker/system/prune/)[^79]

</details>

[^79]: Docker 공식 문서 - docker system prune

### DOCKER-080
Docker 네트워크 문제를 진단하고 해결하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**진단 도구:**

**1. 네트워크 상태 확인:**
```bash
docker network ls
docker network inspect <network>
```

**2. 컨테이너 네트워크 설정 확인:**
```bash
docker inspect <container> --format '{{json .NetworkSettings.Networks}}'
```

**3. 컨테이너 내부에서 진단:**
```bash
# DNS 확인
docker exec <container> cat /etc/resolv.conf
docker exec <container> nslookup other-container

# 연결 테스트
docker exec <container> ping other-container
docker exec <container> curl http://other-container:8080

# 포트 확인
docker exec <container> netstat -tlnp
```

**일반적인 문제와 해결:**

| 문제 | 원인 | 해결 |
|------|------|------|
| 컨테이너 간 통신 불가 | 다른 네트워크 | 같은 네트워크에 연결 |
| DNS 해석 실패 | 기본 bridge 사용 | 사용자 정의 네트워크 사용 |
| 외부 접근 불가 | 포트 미노출 | `-p` 옵션으로 포트 매핑 |
| 호스트 접근 불가 | 네트워크 격리 | `host.docker.internal` 사용 |

**디버깅 컨테이너:**
```bash
# 네트워크 도구가 포함된 컨테이너
docker run -it --network <network> nicolaka/netshoot

# 컨테이너 네트워크 네임스페이스에서 실행
docker run -it --network container:<target> nicolaka/netshoot
```

**참고자료**
- [Networking overview](https://docs.docker.com/network/)[^80]

</details>

[^80]: Docker 공식 문서 - 네트워킹 개요

### DOCKER-081
Docker 컨테이너의 재시작 정책(restart policy)과 각 옵션의 차이점을 설명해 주세요.

<details>
<summary>답변</summary>

**재시작 정책 옵션:**

| 정책 | 설명 |
|------|------|
| `no` | 재시작 안 함 (기본값) |
| `on-failure[:max-retries]` | 비정상 종료 시 재시작 |
| `always` | 항상 재시작 (수동 중지 포함) |
| `unless-stopped` | 수동 중지 전까지 재시작 |

**사용법:**
```bash
# always
docker run --restart always nginx

# on-failure (최대 3회)
docker run --restart on-failure:3 myapp

# unless-stopped
docker run --restart unless-stopped nginx
```

**Docker Compose:**
```yaml
services:
  web:
    image: nginx
    restart: unless-stopped
```

**always vs unless-stopped:**
```bash
# always: Docker 데몬 재시작 시에도 컨테이너 시작
# unless-stopped: 수동으로 stop한 경우 데몬 재시작 후 시작 안 함
```

| 상황 | always | unless-stopped |
|------|--------|----------------|
| 컨테이너 비정상 종료 | 재시작 | 재시작 |
| Docker 데몬 재시작 | 재시작 | 재시작 |
| `docker stop` 후 데몬 재시작 | 재시작 | 시작 안 함 |

**실행 중인 컨테이너 정책 변경:**
```bash
docker update --restart unless-stopped <container>
```

**참고자료**
- [Start containers automatically](https://docs.docker.com/config/containers/start-containers-automatically/)[^81]

</details>

[^81]: Docker 공식 문서 - 컨테이너 자동 시작

### DOCKER-082
Docker 컨테이너가 예기치 않게 종료되었을 때 원인을 분석하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**1. 종료 코드 확인:**
```bash
docker ps -a --filter "name=<container>"
docker inspect <container> --format '{{.State.ExitCode}}'
```

**주요 종료 코드:**
| 코드 | 의미 |
|------|------|
| 0 | 정상 종료 |
| 1 | 애플리케이션 오류 |
| 137 | SIGKILL (128+9), OOM 가능성 |
| 139 | 세그멘테이션 폴트 (128+11) |
| 143 | SIGTERM (128+15) |

**2. 로그 확인:**
```bash
docker logs <container>
docker logs --tail 100 <container>
```

**3. OOM 확인:**
```bash
docker inspect <container> --format '{{.State.OOMKilled}}'

# 시스템 로그
dmesg | grep -i "killed process"
journalctl -k | grep -i "killed"
```

**4. 이벤트 확인:**
```bash
docker events --since '1h' --filter container=<container>
```

**5. 상세 상태:**
```bash
docker inspect <container> | jq '.[] | .State'
```

**6. 분석 체크리스트:**
- 메모리 제한 확인 (`--memory`)
- 리소스 사용량 (`docker stats`)
- 애플리케이션 로그
- healthcheck 상태
- 의존 서비스 상태

**자동 재시작 정책 확인:**
```bash
docker inspect <container> --format '{{.HostConfig.RestartPolicy}}'
```

**참고자료**
- [Troubleshoot containers](https://docs.docker.com/config/containers/runmetrics/)[^82]

</details>

[^82]: Docker 공식 문서 - 컨테이너 런타임 메트릭

---

## 📌 Docker 성능 최적화

### DOCKER-083
Docker 이미지 크기를 최소화하기 위한 베스트 프랙티스를 설명해 주세요.

<details>
<summary>답변</summary>

**1. 경량 베이스 이미지 사용:**
```dockerfile
# Bad
FROM ubuntu:22.04  # ~77MB

# Good
FROM alpine:3.18   # ~5MB
FROM scratch       # 0MB (정적 바이너리)
```

**2. 멀티스테이지 빌드:**
```dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
```

**3. RUN 명령 최적화:**
```dockerfile
# Bad
RUN apt-get update
RUN apt-get install -y curl
RUN rm -rf /var/lib/apt/lists/*

# Good
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*
```

**4. .dockerignore 활용:**
```
node_modules
.git
*.log
```

**5. 불필요한 파일 제거:**
- 패키지 캐시 삭제
- 문서, 맨페이지 제외
- 개발 의존성 제외

**6. 특수 빌드 옵션:**
```dockerfile
# Go 정적 빌드
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o app
```

**참고자료**
- [Best practices for Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)[^83]

</details>

[^83]: Docker 공식 문서 - Dockerfile 베스트 프랙티스

### DOCKER-084
Docker 빌드 시간을 단축하기 위한 캐시 활용 전략을 설명해 주세요.

<details>
<summary>답변</summary>

**캐시 원리:**
- 각 명령어가 레이어 생성
- 명령어와 파일 체크섬이 같으면 캐시 사용
- 한 레이어가 변경되면 이후 모든 레이어 재빌드

**1. 의존성 파일 먼저 복사:**
```dockerfile
# 의존성 정의만 먼저
COPY package.json package-lock.json ./
RUN npm ci

# 소스코드는 나중에
COPY . .
```

**2. 자주 변경되는 것은 마지막에:**
```dockerfile
FROM node:18
WORKDIR /app

# 거의 변경 안 됨
COPY package*.json ./
RUN npm ci

# 자주 변경됨
COPY src/ ./src/
COPY tsconfig.json ./

RUN npm run build
```

**3. BuildKit 캐시 마운트:**
```dockerfile
# syntax=docker/dockerfile:1
RUN --mount=type=cache,target=/root/.npm \
    npm ci

RUN --mount=type=cache,target=/root/.cache/go-build \
    go build -o app
```

**4. 외부 캐시 (CI/CD):**
```bash
# 캐시 내보내기/가져오기
docker build --cache-from myimage:cache -t myimage .
docker build --cache-to type=inline -t myimage .
```

**5. 멀티스테이지에서 특정 단계만:**
```bash
docker build --target builder .
```

**참고자료**
- [Build cache](https://docs.docker.com/build/cache/)[^84]

</details>

[^84]: Docker 공식 문서 - 빌드 캐시

### DOCKER-085
Docker의 BuildKit이란 무엇이며, 기존 빌더 대비 어떤 장점이 있나요?

<details>
<summary>답변</summary>

**BuildKit:**
Docker의 차세대 빌드 엔진으로, Docker 23.0+에서 기본값입니다.

**활성화:**
```bash
# 환경 변수
export DOCKER_BUILDKIT=1

# 또는 daemon.json
{
  "features": { "buildkit": true }
}
```

**장점:**

1. **병렬 빌드:**
   - 독립적인 스테이지 동시 빌드
   - 빌드 시간 단축

2. **캐시 마운트:**
```dockerfile
# syntax=docker/dockerfile:1
RUN --mount=type=cache,target=/root/.npm npm ci
RUN --mount=type=cache,target=/var/cache/apt apt-get install -y curl
```

3. **시크릿 마운트:**
```dockerfile
RUN --mount=type=secret,id=mysecret cat /run/secrets/mysecret
```

4. **SSH 마운트:**
```dockerfile
RUN --mount=type=ssh git clone git@github.com:repo/private.git
```

5. **출력 최적화:**
   - 진행률 표시 개선
   - 불필요한 레이어 전송 최소화

6. **외부 캐시:**
```bash
docker build --cache-to type=registry,ref=myrepo/cache \
             --cache-from type=registry,ref=myrepo/cache .
```

**Dockerfile 문법:**
```dockerfile
# syntax=docker/dockerfile:1
```

**참고자료**
- [Build with BuildKit](https://docs.docker.com/build/buildkit/)[^85]

</details>

[^85]: Docker 공식 문서 - BuildKit

### DOCKER-086
Docker 컨테이너의 시작 시간을 최적화하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**1. 이미지 크기 최소화:**
- 작은 이미지 = 빠른 pull/load
- Alpine, distroless 사용
- 멀티스테이지 빌드

**2. 이미지 사전 배포:**
```bash
# 노드에 이미지 미리 pull
docker pull myapp:latest

# 레지스트리 미러링
```

**3. 애플리케이션 최적화:**
```dockerfile
# JVM 예: 클래스 데이터 공유
ENV JAVA_OPTS="-Xshare:on -XX:SharedArchiveFile=/app/app.jsa"
```

**4. 느린 초기화 피하기:**
- 무거운 DB 마이그레이션 분리
- Lazy loading 활용
- 사전 컴파일/빌드

**5. 헬스체크 최적화:**
```yaml
healthcheck:
  start_period: 30s  # 초기 유예 시간
  interval: 5s
```

**6. 리소스 할당:**
```bash
docker run --cpus=2 --memory=2g myapp
```

**7. 스토리지 드라이버:**
- overlay2 사용 (권장)

**8. 로컬 레지스트리:**
- 네트워크 지연 감소

**측정:**
```bash
time docker run --rm myapp echo "started"

# 또는 컨테이너 내 측정
docker run myapp sh -c 'echo $(($(date +%s%N) - $(cat /proc/1/stat | cut -d" " -f22) * 10000000))'
```

**참고자료**
- [Optimize container startup](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)[^86]

</details>

[^86]: Docker 공식 문서 - Dockerfile 베스트 프랙티스

### DOCKER-087
Docker 레이어 최적화를 통해 이미지 풀/푸시 시간을 단축하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**레이어 공유 원리:**
- 동일한 레이어는 한 번만 전송
- 베이스 이미지 공유 시 효율적

**1. 일관된 베이스 이미지:**
```dockerfile
# 모든 서비스에서 같은 베이스 사용
FROM node:18-alpine
```

**2. 변경 빈도별 레이어 분리:**
```dockerfile
# 거의 변경 안 됨 (공유 가능)
FROM node:18-alpine
RUN apk add --no-cache tini

# 가끔 변경 (의존성)
COPY package*.json ./
RUN npm ci --only=production

# 자주 변경 (소스코드)
COPY . .
```

**3. 불필요한 레이어 방지:**
```dockerfile
# Bad - 여러 레이어
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get clean

# Good - 하나의 레이어
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

**4. 레이어 크기 균형:**
- 너무 큰 레이어: 부분 변경에도 전체 재전송
- 너무 작은 레이어: 오버헤드 증가

**5. 캐시 활용:**
```bash
# 빌드 시 캐시 푸시
docker build --cache-to type=registry,ref=myrepo/cache:latest .

# 풀 시 캐시 사용
docker build --cache-from type=registry,ref=myrepo/cache:latest .
```

**참고자료**
- [Optimize layers](https://docs.docker.com/build/cache/)[^87]

</details>

[^87]: Docker 공식 문서 - 빌드 캐시

### DOCKER-088
Docker Distroless 이미지란 무엇이며, 보안과 성능 관점에서의 장점을 설명해 주세요.

<details>
<summary>답변</summary>

**Distroless 이미지란:**
Google에서 제공하는 최소한의 런타임만 포함된 이미지입니다. 패키지 관리자, 셸, 기타 프로그램이 없습니다.

**사용 가능한 이미지:**
- `gcr.io/distroless/static` - 정적 바이너리용
- `gcr.io/distroless/base` - libc 필요 시
- `gcr.io/distroless/java` - Java 애플리케이션
- `gcr.io/distroless/nodejs` - Node.js 애플리케이션
- `gcr.io/distroless/python3` - Python 애플리케이션

**사용 예시:**
```dockerfile
FROM golang:1.21 AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o server

FROM gcr.io/distroless/static
COPY --from=builder /app/server /
CMD ["/server"]
```

**보안 장점:**
- 셸 없음 → RCE 공격 어려움
- 패키지 관리자 없음 → 악성 패키지 설치 불가
- 최소 공격 표면
- CVE 취약점 감소

**성능 장점:**
- 이미지 크기 최소화 (2-20MB)
- 빠른 pull/push
- 빠른 컨테이너 시작

**제한사항 및 트레이드오프:**
- 디버깅 어려움 (셸 없음) - 운영 중 문제 분석이 복잡해짐
- CA 인증서 업데이트를 위한 별도 빌드 필요
- 특정 런타임만 지원 (범용성 제한)
- debug 태그 버전으로 busybox 포함 가능 (개발/테스트용)
  ```dockerfile
  FROM gcr.io/distroless/static:debug
  ```
- **대안**: `kubectl debug`나 ephemeral containers로 런타임 디버깅 가능

**참고자료**
- [GoogleContainerTools/distroless](https://github.com/GoogleContainerTools/distroless)[^88]

</details>

[^88]: Google Distroless 이미지 GitHub

---

## 📌 Docker와 CI/CD 연동

### DOCKER-089
CI/CD 파이프라인에서 Docker 이미지를 빌드하고 배포하는 일반적인 워크플로우를 설명해 주세요.

<details>
<summary>답변</summary>

**일반적인 워크플로우:**

```
코드 푸시 → 빌드 → 테스트 → 이미지 빌드 → 스캔 → 푸시 → 배포
```

**상세 단계:**

1. **코드 변경 감지:**
   - Git push, PR 이벤트

2. **빌드 및 테스트:**
```bash
npm install
npm test
npm run build
```

3. **Docker 이미지 빌드:**
```bash
docker build -t myapp:$COMMIT_SHA .
```

4. **보안 스캔:**
```bash
trivy image myapp:$COMMIT_SHA
docker scout cves myapp:$COMMIT_SHA
```

5. **레지스트리 푸시:**
```bash
docker tag myapp:$COMMIT_SHA registry.example.com/myapp:$COMMIT_SHA
docker push registry.example.com/myapp:$COMMIT_SHA
```

6. **배포:**
```bash
# Kubernetes
kubectl set image deployment/myapp myapp=registry.example.com/myapp:$COMMIT_SHA

# Docker Compose
docker-compose pull && docker-compose up -d
```

**예시 (GitHub Actions):**
```yaml
jobs:
  build-and-deploy:
    steps:
      - uses: actions/checkout@v4
      - name: Build and test
        run: npm ci && npm test
      - name: Build image
        run: docker build -t myapp:${{ github.sha }} .
      - name: Push to registry
        run: |
          docker tag myapp:${{ github.sha }} ghcr.io/${{ github.repository }}:${{ github.sha }}
          docker push ghcr.io/${{ github.repository }}:${{ github.sha }}
```

**참고자료**
- [CI/CD with Docker](https://docs.docker.com/build/ci/)[^89]

</details>

[^89]: Docker 공식 문서 - CI/CD 빌드

### DOCKER-090
GitHub Actions에서 Docker 이미지를 빌드하고 레지스트리에 푸시하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**GitHub Container Registry (ghcr.io) 사용:**

```yaml
# .github/workflows/docker.yml
name: Build and Push Docker Image

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }}
          tags: |
            type=sha
            type=ref,event=branch
            type=semver,pattern={{version}}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

**Docker Hub 사용 시:**
```yaml
- name: Login to Docker Hub
  uses: docker/login-action@v3
  with:
    username: ${{ secrets.DOCKERHUB_USERNAME }}
    password: ${{ secrets.DOCKERHUB_TOKEN }}
```

**참고자료**
- [Build and push Docker images](https://github.com/docker/build-push-action)[^90]

</details>

[^90]: docker/build-push-action GitHub

### DOCKER-091
Docker 이미지 태깅 전략(semantic versioning, git commit hash)과 CI/CD에서의 적용 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**주요 태깅 전략:**

| 전략 | 형식 | 특징 |
|------|------|------|
| Semantic Version | v1.2.3 | 명확한 버전 관리 |
| Git SHA | abc1234 | 불변, 추적 가능 |
| Branch | main, develop | 환경별 배포 |
| Build Number | build-123 | CI/CD 추적 |

**CI/CD에서 적용:**

```yaml
# GitHub Actions
- name: Extract metadata
  id: meta
  uses: docker/metadata-action@v5
  with:
    images: myrepo/myapp
    tags: |
      # Git SHA (짧은 형식)
      type=sha,prefix=
      # Git 태그 (v1.2.3)
      type=semver,pattern={{version}}
      type=semver,pattern={{major}}.{{minor}}
      type=semver,pattern={{major}}
      # 브랜치명
      type=ref,event=branch
      # PR 번호
      type=ref,event=pr
      # latest (기본 브랜치)
      type=raw,value=latest,enable=${{ github.ref == 'refs/heads/main' }}
```

**스크립트 예시:**
```bash
# Git 정보 기반 태그
VERSION=$(git describe --tags --always)
COMMIT=$(git rev-parse --short HEAD)
BRANCH=$(git rev-parse --abbrev-ref HEAD)

docker build \
  -t myapp:${VERSION} \
  -t myapp:${COMMIT} \
  -t myapp:${BRANCH}-${COMMIT} \
  .
```

**권장 사항 (함정 질문 - latest 태그의 위험성):**
- 프로덕션: Semantic Version + SHA 조합
- **`latest` 태그의 문제점:**
  - 어떤 버전인지 알 수 없음 (재현성 부족)
  - 같은 태그가 다른 이미지를 가리킬 수 있음
  - 롤백 시 어떤 버전으로 돌아가야 하는지 불명확
  - Kubernetes의 `imagePullPolicy: Always`와 조합 시 예측 불가능한 배포
- 이미지 다이제스트(`myapp@sha256:abc...`)로 완전한 불변성 보장
- 프로덕션에서는 명시적 버전 태그 필수

**참고자료**
- [docker/metadata-action](https://github.com/docker/metadata-action)[^91]

</details>

[^91]: docker/metadata-action GitHub

### DOCKER-092
Docker를 사용한 테스트 환경 구성과 테스트 컨테이너(Testcontainers) 활용 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**Docker Compose로 테스트 환경:**
```yaml
# docker-compose.test.yml
services:
  app:
    build: .
    depends_on:
      db:
        condition: service_healthy
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/test

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: pass
    healthcheck:
      test: ["CMD", "pg_isready"]
```

```bash
docker-compose -f docker-compose.test.yml run app npm test
```

**Testcontainers:**
테스트 코드에서 Docker 컨테이너를 프로그래밍 방식으로 관리하는 라이브러리입니다.

**Java 예시:**
```java
@Container
static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
    .withDatabaseName("test")
    .withUsername("user")
    .withPassword("pass");

@Test
void testDatabaseConnection() {
    String jdbcUrl = postgres.getJdbcUrl();
    // 테스트 수행
}
```

**Node.js 예시:**
```javascript
const { GenericContainer } = require("testcontainers");

describe("Database tests", () => {
  let container;

  beforeAll(async () => {
    container = await new GenericContainer("postgres:15")
      .withEnvironment({ POSTGRES_PASSWORD: "pass" })
      .withExposedPorts(5432)
      .start();
  });

  afterAll(async () => {
    await container.stop();
  });
});
```

**장점:**
- 실제 서비스로 통합 테스트
- 테스트 격리 보장
- CI/CD 환경 동일성

**참고자료**
- [Testcontainers](https://testcontainers.com/)[^92]

</details>

[^92]: Testcontainers 공식 사이트

### DOCKER-093
Docker 이미지의 보안 스캔을 CI/CD 파이프라인에 통합하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**GitHub Actions - Trivy:**
```yaml
- name: Run Trivy vulnerability scanner
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: myapp:${{ github.sha }}
    format: 'sarif'
    output: 'trivy-results.sarif'
    severity: 'CRITICAL,HIGH'
    exit-code: '1'  # 취약점 발견 시 실패

- name: Upload Trivy scan results
  uses: github/codeql-action/upload-sarif@v2
  with:
    sarif_file: 'trivy-results.sarif'
```

**Docker Scout:**
```yaml
- name: Docker Scout
  uses: docker/scout-action@v1
  with:
    command: cves
    image: myapp:${{ github.sha }}
    only-severities: critical,high
    exit-code: true
```

**Snyk:**
```yaml
- name: Run Snyk to check for vulnerabilities
  uses: snyk/actions/docker@master
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
  with:
    image: myapp:${{ github.sha }}
    args: --severity-threshold=high
```

**통합 워크플로우:**
```yaml
jobs:
  build-scan-push:
    steps:
      - name: Build
        run: docker build -t myapp:${{ github.sha }} .

      - name: Scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: myapp:${{ github.sha }}
          exit-code: '1'
          severity: 'CRITICAL'

      - name: Push (스캔 통과 시에만)
        if: success()
        run: docker push myapp:${{ github.sha }}
```

**참고자료**
- [Docker Scout in CI](https://docs.docker.com/scout/integrations/ci/)[^93]

</details>

[^93]: Docker 공식 문서 - Docker Scout CI 통합

### DOCKER-094
Docker layer caching을 CI/CD 환경에서 활용하여 빌드 시간을 단축하는 방법을 설명해 주세요.

<details>
<summary>답변</summary>

**문제:**
CI/CD 환경은 매번 새로운 러너에서 실행되어 로컬 캐시가 없습니다.

**해결 방법:**

**1. GitHub Actions Cache:**
```yaml
- name: Set up Docker Buildx
  uses: docker/setup-buildx-action@v3

- name: Build and push
  uses: docker/build-push-action@v5
  with:
    context: .
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

**2. 레지스트리 캐시:**
```yaml
- name: Build and push
  uses: docker/build-push-action@v5
  with:
    context: .
    cache-from: type=registry,ref=myrepo/myapp:cache
    cache-to: type=registry,ref=myrepo/myapp:cache,mode=max
```

**3. 인라인 캐시:**
```bash
docker build \
  --cache-from myrepo/myapp:latest \
  --build-arg BUILDKIT_INLINE_CACHE=1 \
  -t myrepo/myapp:latest .
```

**4. 로컬 캐시 (self-hosted runner):**
```yaml
- name: Build
  uses: docker/build-push-action@v5
  with:
    context: .
    cache-from: type=local,src=/tmp/.buildx-cache
    cache-to: type=local,dest=/tmp/.buildx-cache-new,mode=max

- name: Move cache
  run: |
    rm -rf /tmp/.buildx-cache
    mv /tmp/.buildx-cache-new /tmp/.buildx-cache
```

**캐시 모드:**
- `min`: 최종 이미지 레이어만
- `max`: 모든 중간 레이어 포함 (권장)

**참고자료**
- [Cache backends](https://docs.docker.com/build/cache/backends/)[^94]

</details>

[^94]: Docker 공식 문서 - 캐시 백엔드

### DOCKER-095
Blue-Green 배포와 Rolling 배포 전략에서 Docker는 어떤 역할을 하나요?

<details>
<summary>답변</summary>

**Blue-Green 배포:**
두 개의 동일한 환경을 유지하고 트래픽을 전환합니다.

```yaml
# docker-compose.yml
services:
  blue:
    image: myapp:1.0
    ports:
      - "8080:80"

  green:
    image: myapp:2.0
    ports:
      - "8081:80"

  nginx:
    image: nginx
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    ports:
      - "80:80"
```

```bash
# 배포: green에 새 버전 배포 후 nginx 설정 변경
docker-compose pull green
docker-compose up -d green
# nginx 설정에서 upstream을 green으로 변경
docker-compose exec nginx nginx -s reload
```

**Rolling 배포:**
인스턴스를 순차적으로 업데이트합니다.

```bash
# Docker Swarm
docker service update \
  --image myapp:2.0 \
  --update-parallelism 1 \
  --update-delay 10s \
  myservice
```

**Docker의 역할:**
1. **이미지 불변성**: 버전별 독립적 이미지
2. **빠른 롤백**: 이전 이미지로 즉시 전환
3. **환경 일관성**: 테스트된 이미지 그대로 배포
4. **컨테이너 오케스트레이션**: Swarm/K8s와 연동
5. **헬스체크**: 배포 성공 여부 확인

**롤백:**
```bash
# 이전 이미지로 롤백
docker service update --rollback myservice
```

**참고자료**
- [Deploy services](https://docs.docker.com/engine/swarm/services/)[^95]

</details>

[^95]: Docker 공식 문서 - 서비스 배포

---

## 📌 심화 질문

### DOCKER-096
Docker와 Kubernetes의 관계와 각각의 역할을 설명해 주세요.

<details>
<summary>답변</summary>

**Docker의 역할:**
- 컨테이너 이미지 빌드
- 단일 호스트에서 컨테이너 실행
- 컨테이너 런타임 제공
- 이미지 레지스트리 (Docker Hub)

**Kubernetes의 역할:**
- 컨테이너 오케스트레이션
- 멀티 노드 클러스터 관리
- 자동 스케일링, 로드 밸런싱
- 서비스 디스커버리
- 롤링 업데이트, 롤백
- 셀프 힐링

**관계:**
```
개발자 → Docker (빌드) → Registry → Kubernetes (배포/운영)
```

| 구분 | Docker | Kubernetes |
|------|--------|------------|
| 범위 | 단일 호스트 | 클러스터 |
| 초점 | 컨테이너 생성 | 컨테이너 관리 |
| 스케일 | 수동 | 자동 |
| 고가용성 | 제한적 | 내장 |

**현재 상태:**
- Kubernetes는 containerd, CRI-O 등 다양한 런타임 지원
- Kubernetes 1.24부터 Docker 직접 지원 제거 (dockershim 제거)
- 그러나 Docker로 빌드한 이미지는 여전히 K8s에서 실행 가능 (OCI 표준)

**요약:**
Docker = 컨테이너 빌드/실행 도구
Kubernetes = 컨테이너 오케스트레이션 플랫폼

**참고자료**
- [Kubernetes Overview](https://kubernetes.io/docs/concepts/overview/)[^96]

</details>

[^96]: Kubernetes 공식 문서 - 개요

### DOCKER-097
Docker Swarm과 Kubernetes의 차이점과 각각의 사용 시나리오를 설명해 주세요.

<details>
<summary>답변</summary>

**비교:**

| 구분 | Docker Swarm | Kubernetes |
|------|--------------|------------|
| **복잡도** | 낮음 | 높음 |
| **학습 곡선** | 완만 | 가파름 |
| **설치** | Docker 내장 | 별도 설치 필요 |
| **확장성** | 중소 규모 | 대규모 |
| **기능** | 기본적 | 풍부함 |
| **생태계** | 제한적 | 매우 활발 |
| **자동 스케일링** | 제한적 | 강력 (HPA, VPA) |
| **로드 밸런싱** | 내장 | 내장 + Ingress |

**Docker Swarm 사용 시나리오:**
- 소규모 클러스터 (5-10 노드)
- 빠른 구축 필요
- Docker 생태계에 익숙한 팀
- 복잡한 기능 불필요
- 리소스 제한 환경

**Kubernetes 사용 시나리오:**
- 대규모 클러스터
- 복잡한 마이크로서비스
- 자동 스케일링 필수
- 멀티 클라우드/하이브리드
- 풍부한 에코시스템 활용

**예시:**

```bash
# Docker Swarm
docker swarm init
docker service create --replicas 3 nginx

# Kubernetes
kubectl create deployment nginx --image=nginx --replicas=3
```

**결론:**
- 단순함과 빠른 시작: Swarm
- 확장성과 기능: Kubernetes

**참고자료**
- [Docker Swarm overview](https://docs.docker.com/engine/swarm/)[^97]

</details>

[^97]: Docker 공식 문서 - Swarm 모드 개요

### DOCKER-098
Docker in Docker(DinD)란 무엇이며, 사용 시 고려사항을 설명해 주세요.

<details>
<summary>답변</summary>

**Docker in Docker (DinD):**
Docker 컨테이너 내부에서 Docker 데몬을 실행하여 컨테이너 안에서 컨테이너를 빌드/실행하는 방식입니다.

**사용 방법:**
```bash
# DinD 컨테이너 실행
docker run --privileged -d docker:dind

# 또는 호스트 소켓 마운트 (DooD)
docker run -v /var/run/docker.sock:/var/run/docker.sock docker
```

**DinD vs DooD:**
| 구분 | DinD | DooD (Docker outside of Docker) |
|------|------|----------------------------------|
| 방식 | 컨테이너 내 Docker 데몬 | 호스트 Docker 소켓 마운트 |
| 격리 | 완전 격리 | 호스트와 공유 |
| 성능 | 오버헤드 있음 | 네이티브 |
| 보안 | `--privileged` 필요 | 소켓 접근 권한만 |

**사용 시나리오:**
- CI/CD 파이프라인에서 Docker 이미지 빌드
- 개발/테스트 환경

**고려사항:**

1. **보안 위험:**
   - `--privileged` 플래그는 호스트 전체 접근 권한 부여
   - 프로덕션에서는 피해야 함

2. **스토리지 드라이버:**
   - DinD 내부 overlay와 외부 overlay 충돌 가능
   - vfs 드라이버 사용 권장 (느림)

3. **캐시 공유:**
   - DinD는 매번 새로운 캐시
   - 볼륨으로 캐시 공유 필요

**권장:**
- 가능하면 DooD 또는 Kaniko 사용
- CI/CD: Kaniko, Buildah 등 대안 고려

**참고자료**
- [Docker in Docker](https://hub.docker.com/_/docker)[^98]

</details>

[^98]: Docker Hub - docker 이미지

### DOCKER-099
Docker의 storage driver 종류(overlay2, aufs, btrfs 등)와 선택 기준을 설명해 주세요.

<details>
<summary>답변</summary>

**주요 Storage Driver:**

| 드라이버 | 특징 | 권장 환경 |
|----------|------|-----------|
| **overlay2** | 현재 기본값, 안정적 | 대부분의 Linux |
| **fuse-overlayfs** | Rootless 모드용 | Rootless Docker |
| **btrfs** | CoW 파일 시스템 | btrfs 파티션 |
| **zfs** | 스냅샷, 압축 지원 | zfs 파티션 |
| **vfs** | 간단, 비효율적 | 테스트, 다른 드라이버 불가 시 |
| **aufs** | 레거시 | Ubuntu 이전 버전 |
| **devicemapper** | 레거시 | CentOS/RHEL 이전 버전 |

**overlay2 (권장):**
```
Host Filesystem
├── /var/lib/docker/overlay2/
│   ├── <layer-id>/
│   │   ├── diff/      # 레이어 내용
│   │   ├── link       # 짧은 ID
│   │   └── lower      # 하위 레이어 참조
│   └── <container-id>/
│       ├── diff/      # 쓰기 레이어
│       ├── merged/    # 통합 뷰
│       └── work/      # 작업 디렉토리
```

**선택 기준:**
1. **커널 버전:** overlay2는 4.0+ 필요
2. **파일 시스템:** backing filesystem 호환성
3. **워크로드:** 쓰기 집약적 → 직접 마운트 볼륨 권장
4. **Rootless:** fuse-overlayfs 필요

**확인 및 변경:**
```bash
# 현재 드라이버 확인
docker info | grep "Storage Driver"

# daemon.json으로 변경
{
  "storage-driver": "overlay2"
}
```

**참고자료**
- [Docker storage drivers](https://docs.docker.com/storage/storagedriver/select-storage-driver/)[^99]

</details>

[^99]: Docker 공식 문서 - 스토리지 드라이버 선택

### DOCKER-100
마이크로서비스 아키텍처에서 Docker를 활용할 때의 장점과 주의점을 설명해 주세요.

<details>
<summary>답변</summary>

**장점:**

1. **서비스 독립성:**
   - 각 서비스를 독립적인 컨테이너로 패키징
   - 서로 다른 기술 스택 사용 가능

2. **일관된 환경:**
   - 개발, 테스트, 운영 환경 동일
   - "내 컴퓨터에서는 되는데" 문제 해결

3. **빠른 배포:**
   - 서비스별 독립 배포
   - 롤백 용이

4. **확장성:**
   - 서비스별 수평 확장
   - 리소스 효율적 사용

5. **격리:**
   - 서비스 간 영향 최소화
   - 장애 전파 방지

**주의점:**

1. **네트워크 복잡성:**
   - 서비스 간 통신 관리
   - 서비스 디스커버리 필요

2. **데이터 관리:**
   - 볼륨 전략 수립
   - 데이터 일관성

3. **모니터링:**
   - 분산 로깅 필요
   - 트레이싱 구현

4. **보안:**
   - 컨테이너 간 통신 암호화
   - 이미지 취약점 관리

5. **오케스트레이션:**
   - 많은 컨테이너 관리를 위해 K8s/Swarm 고려

**구조 예시:**
```yaml
services:
  api-gateway:
    image: gateway:1.0
  user-service:
    image: user-svc:1.0
  order-service:
    image: order-svc:1.0
  db:
    image: postgres:15
```

**참고자료**
- [Docker and Microservices](https://docs.docker.com/get-started/overview/)[^100]

</details>

[^100]: Docker 공식 문서 - Docker 개요
