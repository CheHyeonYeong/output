const infraData = [
  {
    "id": "DOCKER-001",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker란 무엇이며, 컨테이너 기술이 등장하게 된 배경을 설명해 주세요.",
    "answer": "Docker는 애플리케이션을 컨테이너라는 격리된 환경에서 실행할 수 있게 해주는 오픈소스 플랫폼입니다.\r\n\r\n**컨테이너 기술 등장 배경:**\r\n- **환경 불일치 문제**: \"내 컴퓨터에서는 되는데\" 문제 해결 필요\r\n- **리소스 효율성**: VM의 무거운 오버헤드 대비 경량화된 가상화 필요\r\n- **배포 속도**: 빠른 애플리케이션 배포 및 스케일링 요구 증가\r\n- **마이크로서비스**: 서비스 단위 독립적 배포 및 관리 필요성",
    "references": [
      {
        "title": "Docker Overview",
        "url": "https://docs.docker.com/get-started/overview/"
      }
    ]
  },
  {
    "id": "DOCKER-002",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너와 가상 머신(VM)의 차이점을 아키텍처 관점에서 설명해 주세요.",
    "answer": "| 구분 | 컨테이너 | 가상 머신 |\r\n|------|----------|-----------|\r\n| **가상화 레벨** | OS 레벨 (커널 공유) | 하드웨어 레벨 |\r\n| **Guest OS** | 불필요 | 각 VM마다 필요 |\r\n| **크기** | MB 단위 | GB 단위 |\r\n| **시작 시간** | 초 단위 | 분 단위 |\r\n| **격리 수준** | 프로세스 격리 | 완전한 격리 |\r\n| **성능** | 네이티브에 가까움 | 하이퍼바이저 오버헤드 |\r\n\r\n**트레이드오프:**\r\n- **컨테이너 장점**: 빠른 시작, 적은 리소스, 높은 밀도, 이식성\r\n- **컨테이너 단점**: 커널 공유로 인한 보안 경계가 VM보다 약함, 다른 OS 커널(예: Linux 컨테이너를 Windows에서 직접 실행) 불가\r\n- **VM 장점**: 완전한 하드웨어 격리, 다른 OS 실행 가능, 강력한 보안 경계\r\n- **VM 단점**: 무거운 오버헤드, 느린 부팅, 리소스 비효율\r\n\r\n**실무 고려사항**: 멀티테넌트 환경에서 강력한 격리가 필요하면 VM이나 gVisor/Kata Containers 같은 샌드박스 런타임 고려. 단일 조직 내 마이크로서비스라면 컨테이너가 효율적.",
    "references": [
      {
        "title": "What is a Container?",
        "url": "https://docs.docker.com/get-started/overview/#docker-objects"
      }
    ]
  },
  {
    "id": "DOCKER-003",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이미지와 컨테이너의 차이점을 설명해 주세요.",
    "answer": "**Docker 이미지:**\r\n- 읽기 전용 템플릿\r\n- 애플리케이션 실행에 필요한 모든 것(코드, 런타임, 라이브러리, 설정) 포함\r\n- 여러 레이어로 구성\r\n- 불변(Immutable)\r\n\r\n**Docker 컨테이너:**\r\n- 이미지의 실행 가능한 인스턴스\r\n- 이미지 위에 쓰기 가능한 레이어 추가\r\n- 생성, 시작, 중지, 삭제 가능\r\n- 격리된 프로세스로 실행\r\n\r\n비유하면, 이미지는 \"클래스\"이고 컨테이너는 \"인스턴스\"입니다.",
    "references": [
      {
        "title": "Images and Containers",
        "url": "https://docs.docker.com/get-started/overview/#images"
      }
    ]
  },
  {
    "id": "DOCKER-004",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이미지의 레이어(Layer) 시스템이란 무엇이며, 어떤 장점이 있나요?",
    "answer": "Docker 이미지는 여러 개의 읽기 전용 레이어로 구성됩니다. Dockerfile의 각 명령어(FROM, RUN, COPY 등)가 새로운 레이어를 생성합니다.\r\n\r\n**장점:**\r\n- **공간 효율성**: 동일한 베이스 이미지를 사용하는 이미지들이 레이어를 공유\r\n- **빌드 속도 향상**: 변경되지 않은 레이어는 캐시에서 재사용\r\n- **배포 효율성**: 변경된 레이어만 전송하면 됨\r\n- **버전 관리**: 각 레이어가 변경 이력을 나타냄\r\n\r\n**트레이드오프 및 주의점:**\r\n- **레이어 수 증가의 단점**: 너무 많은 레이어는 이미지 pull/push 시 오버헤드 발생, 일부 스토리지 드라이버에서 성능 저하 (overlay2는 최대 128개 레이어 제한)\r\n- **Copy-on-Write(CoW) 비용**: 컨테이너에서 파일 수정 시 전체 파일을 복사 후 수정하므로 대용량 파일 수정에 비효율적\r\n- **삭제된 파일의 레이어 잔존**: 이전 레이어에서 생성된 파일을 삭제해도 이미지 크기는 줄지 않음 (whiteout 파일로 숨김 처리만 됨)\r\n\r\n컨테이너 실행 시 최상위에 쓰기 가능한 레이어가 추가됩니다(Copy-on-Write). 쓰기 작업이 빈번한 데이터는 볼륨 사용 권장.",
    "references": [
      {
        "title": "About storage drivers",
        "url": "https://docs.docker.com/storage/storagedriver/"
      }
    ]
  },
  {
    "id": "DOCKER-005",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너 격리를 구현하는 Linux 커널 기술인 namespace와 cgroups에 대해 설명해 주세요.",
    "answer": "**Namespace (격리):**\r\n- **PID namespace**: 프로세스 ID 격리\r\n- **NET namespace**: 네트워크 인터페이스 격리\r\n- **MNT namespace**: 파일 시스템 마운트 포인트 격리\r\n- **UTS namespace**: 호스트명, 도메인명 격리\r\n- **IPC namespace**: 프로세스 간 통신 격리\r\n- **USER namespace**: 사용자/그룹 ID 격리\r\n\r\n**cgroups (리소스 제한):**\r\n- CPU, 메모리, 디스크 I/O, 네트워크 대역폭 등 리소스 사용량 제한\r\n- 리소스 사용량 모니터링\r\n- 프로세스 그룹 단위로 관리\r\n\r\nNamespace는 \"무엇을 볼 수 있는지\", cgroups는 \"얼마나 사용할 수 있는지\"를 제어합니다.\r\n\r\n**중요한 보안 함정 - 커널 공유의 의미:**\r\n- 모든 컨테이너가 호스트 커널을 공유하므로, 커널 취약점은 모든 컨테이너에 영향\r\n- Namespace는 \"격리\"가 아닌 \"가시성 제한\"에 가까움 - 커널 레벨 공격에는 취약\r\n- 이것이 컨테이너가 VM보다 보안 경계가 약한 이유\r\n- **완화 방법**: 커널 업데이트, seccomp/AppArmor/SELinux 적용, User Namespace 활성화, gVisor/Kata Containers 같은 샌드박스 런타임 사용",
    "references": [
      {
        "title": "Docker and Linux Kernel",
        "url": "https://docs.docker.com/get-started/overview/#the-underlying-technology"
      }
    ]
  },
  {
    "id": "DOCKER-006",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 데몬(Docker Daemon)의 역할과 Docker 클라이언트와의 통신 방식을 설명해 주세요.",
    "answer": "**Docker Daemon (dockerd):**\r\n- Docker API 요청을 수신하고 처리\r\n- 이미지, 컨테이너, 네트워크, 볼륨 등 Docker 객체 관리\r\n- 다른 데몬과 통신하여 Docker 서비스 관리\r\n\r\n**통신 방식:**\r\n- **Unix 소켓**: `/var/run/docker.sock` (기본값, 로컬 통신)\r\n- **TCP 소켓**: 원격 API 접근 시 사용 (TLS 권장)\r\n- **fd**: systemd 소켓 활성화\r\n\r\n**아키텍처:**\r\n```\r\nDocker CLI → REST API → Docker Daemon → containerd → runc → 컨테이너\r\n```",
    "references": [
      {
        "title": "Docker Architecture",
        "url": "https://docs.docker.com/get-started/overview/#docker-architecture"
      }
    ]
  },
  {
    "id": "DOCKER-007",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이미지 레이어를 구현하는 Union File System(UnionFS)이란 무엇이며, Docker에서 어떻게 활용되나요?",
    "answer": "**UnionFS란:**\r\n여러 개의 파일 시스템(레이어)을 하나의 통합된 뷰로 마운트하는 파일 시스템입니다.\r\n\r\n**Docker에서의 활용:**\r\n- 여러 읽기 전용 이미지 레이어를 하나의 파일 시스템으로 표현\r\n- 최상위에 쓰기 가능한 컨테이너 레이어 추가\r\n- Copy-on-Write(CoW) 전략으로 효율적인 스토리지 사용\r\n\r\n**주요 구현체:**\r\n- **overlay2**: 현재 Docker 기본 스토리지 드라이버 (권장, Linux 커널 4.0+ 필요)\r\n- **fuse-overlayfs**: Rootless 모드에서 사용\r\n- **btrfs**, **zfs**: 해당 파일 시스템 사용 시 선택\r\n- **vfs**: 테스트용, CoW 미지원으로 매우 비효율적\r\n\r\n**스토리지 드라이버 선택 트레이드오프:**\r\n- **overlay2**: 대부분의 경우 최선, 하지만 XFS에서 d_type=true 필요\r\n- **btrfs/zfs**: 스냅샷 기능 우수하나 설정 복잡성 증가\r\n- 운영 환경에서는 backing 파일시스템과 호환성 확인 필수",
    "references": [
      {
        "title": "Use the OverlayFS storage driver",
        "url": "https://docs.docker.com/storage/storagedriver/overlayfs-driver/"
      }
    ]
  },
  {
    "id": "DOCKER-008",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker Hub와 프라이빗 레지스트리의 차이점과 각각의 사용 시나리오를 설명해 주세요.",
    "answer": "**Docker Hub:**\r\n- Docker 공식 퍼블릭 레지스트리\r\n- 공식 이미지, 커뮤니티 이미지 제공\r\n- 무료 플랜: 퍼블릭 무제한, 프라이빗 제한\r\n- 자동 빌드, 취약점 스캔 기능\r\n\r\n**프라이빗 레지스트리:**\r\n- 자체 호스팅 또는 클라우드 제공 (ECR, GCR, ACR 등)\r\n- 완전한 접근 제어\r\n- 내부 네트워크에서 빠른 이미지 전송\r\n- 규정 준수 및 보안 요구사항 충족\r\n\r\n**사용 시나리오:**\r\n- **Docker Hub**: 오픈소스 프로젝트, 공개 이미지 배포, 개인 학습\r\n- **프라이빗**: 기업 내부 애플리케이션, 민감한 코드, 규정 준수 필요 시",
    "references": [
      {
        "title": "Docker Hub",
        "url": "https://docs.docker.com/docker-hub/"
      }
    ]
  },
  {
    "id": "DOCKER-009",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "OCI(Open Container Initiative)란 무엇이며, Docker와의 관계를 설명해 주세요.",
    "answer": "**OCI(Open Container Initiative):**\r\nLinux Foundation 산하의 프로젝트로, 컨테이너 포맷과 런타임에 대한 개방형 표준을 정의합니다.\r\n\r\n**주요 표준:**\r\n- **Runtime Specification**: 컨테이너 런타임 표준 (runc가 참조 구현)\r\n- **Image Specification**: 이미지 포맷 표준\r\n- **Distribution Specification**: 이미지 배포 표준\r\n\r\n**Docker와의 관계:**\r\n- Docker가 OCI 설립에 참여하고 초기 기술 기여\r\n- Docker의 컨테이너 런타임(runc)을 OCI에 기증\r\n- Docker 이미지는 OCI 이미지 스펙과 호환\r\n- 이로 인해 Docker 이미지를 다른 OCI 호환 런타임(containerd, CRI-O 등)에서 실행 가능",
    "references": [
      {
        "title": "Open Container Initiative",
        "url": "https://opencontainers.org/"
      }
    ]
  },
  {
    "id": "DOCKER-010",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 아키텍처에서 containerd와 runc의 역할과 위치를 설명해 주세요.",
    "answer": "**아키텍처 흐름:**\r\n```\r\nDocker CLI → Docker Daemon → containerd → runc → 컨테이너\r\n```\r\n\r\n**containerd:**\r\n- 고수준 컨테이너 런타임\r\n- 이미지 전송 및 저장 관리\r\n- 컨테이너 실행 및 감독\r\n- 네트워크, 스토리지 관리\r\n- CNCF 졸업 프로젝트\r\n\r\n**runc:**\r\n- 저수준 컨테이너 런타임 (OCI 참조 구현)\r\n- 실제로 컨테이너 프로세스 생성 및 실행\r\n- namespace, cgroups 설정\r\n- 컨테이너 시작 후 종료됨\r\n\r\nDocker는 이 계층 구조를 통해 모듈화되어 있으며, Kubernetes도 containerd를 직접 사용할 수 있습니다.",
    "references": [
      {
        "title": "containerd",
        "url": "https://containerd.io/"
      }
    ]
  },
  {
    "id": "DOCKER-011",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Dockerfile의 주요 명령어(FROM, RUN, CMD, ENTRYPOINT, COPY, ADD)의 역할과 차이점을 설명해 주세요.",
    "answer": "| 명령어 | 역할 | 특징 |\r\n|--------|------|------|\r\n| **FROM** | 베이스 이미지 지정 | Dockerfile 시작점, 멀티스테이지 가능 |\r\n| **RUN** | 빌드 시 명령 실행 | 새 레이어 생성, 패키지 설치 등 |\r\n| **CMD** | 컨테이너 실행 시 기본 명령 | docker run 인자로 덮어쓰기 가능 |\r\n| **ENTRYPOINT** | 컨테이너 실행 시 고정 명령 | CMD와 조합 가능, `--entrypoint`로 덮어쓰기 가능 |\r\n| **COPY** | 파일/디렉토리 복사 | 로컬 파일만, 단순하고 명확 |\r\n| **ADD** | 파일 복사 + 추가 기능 | URL 다운로드, tar 자동 추출 |\r\n\r\n**권장 사항:**\r\n- 단순 복사는 COPY 사용 (명확성)\r\n- ADD는 tar 추출 필요 시에만 사용",
    "references": [
      {
        "title": "Dockerfile reference",
        "url": "https://docs.docker.com/reference/dockerfile/"
      }
    ]
  },
  {
    "id": "DOCKER-012",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Dockerfile의 CMD와 ENTRYPOINT 명령어의 차이점을 설명하고, 언제 어떤 것을 사용해야 하는지 예시를 들어 설명해 주세요.",
    "answer": "**차이점:**\r\n\r\n| 구분 | CMD | ENTRYPOINT |\r\n|------|-----|------------|\r\n| 덮어쓰기 | `docker run` 인자로 쉽게 덮어씀 | `--entrypoint` 옵션 필요 |\r\n| 역할 | 기본 인자 제공 | 고정 실행 명령 |\r\n| 조합 | ENTRYPOINT의 기본 인자로 사용 가능 | CMD와 함께 사용 가능 |\r\n\r\n**사용 예시:**\r\n\r\n```dockerfile\r\n# 1. CMD만 사용 - 범용 이미지\r\nCMD [\"python\", \"app.py\"]\r\n\r\n# 2. ENTRYPOINT만 사용 - 실행 파일 컨테이너\r\nENTRYPOINT [\"nginx\", \"-g\", \"daemon off;\"]\r\n\r\n# 3. 조합 사용 - 유연한 CLI 도구\r\nENTRYPOINT [\"curl\"]\r\nCMD [\"--help\"]  # docker run image google.com 으로 덮어쓰기 가능\r\n```",
    "references": [
      {
        "title": "ENTRYPOINT",
        "url": "https://docs.docker.com/reference/dockerfile/#entrypoint"
      }
    ]
  },
  {
    "id": "DOCKER-013",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Dockerfile의 COPY와 ADD 명령어의 차이점은 무엇이며, 어떤 상황에서 각각을 사용해야 하나요?",
    "answer": "**COPY:**\r\n- 로컬 파일/디렉토리를 이미지로 복사\r\n- 단순하고 명확한 동작\r\n- **권장**: 대부분의 경우 COPY 사용\r\n\r\n**ADD:**\r\n- COPY의 모든 기능 포함\r\n- URL에서 파일 다운로드 가능\r\n- tar 아카이브 자동 추출\r\n\r\n**사용 지침:**\r\n\r\n```dockerfile\r\n# COPY 사용 - 일반적인 파일 복사\r\nCOPY package.json ./\r\nCOPY src/ ./src/\r\n\r\n# ADD 사용 - tar 추출이 필요할 때\r\nADD app.tar.gz /app/\r\n```\r\n\r\n**ADD 주의점:**\r\n- URL 다운로드보다 `RUN curl` 또는 `RUN wget` 권장 (레이어 최적화, 캐시 무효화 제어 가능)\r\n- 예상치 못한 tar 추출 발생 가능 (의도치 않은 파일 추출로 보안 위험)\r\n- ADD로 URL에서 다운로드 시 파일 권한을 600으로 설정하며 실행 권한 없음\r\n\r\n**Best Practice**: Docker 공식 문서에서는 대부분의 경우 COPY 사용을 권장하며, ADD는 로컬 tar 아카이브 자동 추출이 필요한 경우에만 사용하도록 권고",
    "references": [
      {
        "title": "COPY vs ADD",
        "url": "https://docs.docker.com/reference/dockerfile/#copy"
      }
    ]
  },
  {
    "id": "DOCKER-014",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "멀티스테이지 빌드(Multi-stage Build)란 무엇이며, 어떤 장점이 있나요?",
    "answer": "**멀티스테이지 빌드:**\r\n하나의 Dockerfile에서 여러 FROM 문을 사용하여 빌드 단계를 분리하고, 최종 이미지에는 필요한 결과물만 포함시키는 기법입니다.\r\n\r\n```dockerfile\r\n# 빌드 스테이지\r\nFROM golang:1.21 AS builder\r\nWORKDIR /app\r\nCOPY . .\r\nRUN go build -o myapp\r\n\r\n# 실행 스테이지\r\nFROM alpine:3.18\r\nCOPY --from=builder /app/myapp /myapp\r\nCMD [\"/myapp\"]\r\n```\r\n\r\n**장점:**\r\n- **이미지 크기 감소**: 빌드 도구, 소스코드 제외\r\n- **보안 향상**: 불필요한 파일 미포함\r\n- **Dockerfile 단순화**: 하나의 파일로 빌드/실행 환경 관리\r\n- **빌드 캐시 활용**: 각 스테이지별 캐시",
    "references": [
      {
        "title": "Multi-stage builds",
        "url": "https://docs.docker.com/build/building/multi-stage/"
      }
    ]
  },
  {
    "id": "DOCKER-015",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 멀티스테이지 빌드를 사용하여 Go 또는 Java 애플리케이션의 이미지 크기를 줄이는 방법을 설명해 주세요.",
    "answer": "**Go 예시:**\r\n```dockerfile\r\n# 빌드 스테이지 (약 800MB)\r\nFROM golang:1.21-alpine AS builder\r\nWORKDIR /app\r\nCOPY go.mod go.sum ./\r\nRUN go mod download\r\nCOPY . .\r\nRUN CGO_ENABLED=0 go build -ldflags=\"-s -w\" -o app\r\n\r\n# 실행 스테이지 (약 10MB)\r\nFROM scratch\r\nCOPY --from=builder /app/app /app\r\nENTRYPOINT [\"/app\"]\r\n```\r\n\r\n**Java 예시:**\r\n```dockerfile\r\n# 빌드 스테이지 (약 500MB)\r\nFROM maven:3.9-eclipse-temurin-17 AS builder\r\nWORKDIR /app\r\nCOPY pom.xml .\r\nRUN mvn dependency:go-offline\r\nCOPY src ./src\r\nRUN mvn package -DskipTests\r\n\r\n# 실행 스테이지 (약 200MB)\r\nFROM eclipse-temurin:17-jre-alpine\r\nCOPY --from=builder /app/target/*.jar app.jar\r\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]\r\n```\r\n\r\n**핵심 포인트:**\r\n- Go: scratch 또는 distroless 사용 가능 (정적 빌드)\r\n- Java: JDK 대신 JRE 사용, Alpine 기반 선택",
    "references": [
      {
        "title": "Multi-stage builds",
        "url": "https://docs.docker.com/build/building/multi-stage/"
      }
    ]
  },
  {
    "id": "DOCKER-016",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": ".dockerignore 파일의 역할과 사용법을 설명해 주세요.",
    "answer": "**.dockerignore 역할:**\r\nDocker 빌드 시 빌드 컨텍스트에서 제외할 파일/디렉토리를 지정합니다.\r\n\r\n**장점:**\r\n- 빌드 컨텍스트 크기 감소 → 빌드 속도 향상\r\n- 불필요한 파일이 이미지에 포함되는 것 방지\r\n- 민감한 정보(credentials, .env) 제외\r\n\r\n**예시:**\r\n```\r\n# 버전 관리\r\n.git\r\n.gitignore\r\n\r\n# 의존성\r\nnode_modules\r\nvendor\r\n\r\n# 빌드 결과물\r\ndist\r\nbuild\r\n*.log\r\n\r\n# 환경 설정\r\n.env\r\n.env.*\r\n*.pem\r\n\r\n# IDE\r\n.idea\r\n.vscode\r\n\r\n# Docker 관련\r\nDockerfile*\r\ndocker-compose*\r\n```",
    "references": [
      {
        "title": ".dockerignore file",
        "url": "https://docs.docker.com/build/building/context/#dockerignore-files"
      }
    ]
  },
  {
    "id": "DOCKER-017",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Dockerfile에서 ENV와 ARG의 차이점을 설명해 주세요.",
    "answer": "| 구분 | ARG | ENV |\r\n|------|-----|-----|\r\n| **사용 시점** | 빌드 시에만 | 빌드 + 런타임 |\r\n| **설정 방법** | `--build-arg` | `-e` 또는 `docker run` |\r\n| **이미지 포함** | 값은 미포함, 이력에 노출 가능 | 이미지에 포함 |\r\n| **기본값** | Dockerfile에서 지정 가능 | Dockerfile에서 지정 가능 |\r\n| **스코프** | FROM 이후 해당 빌드 스테이지 내에서만 | 모든 스테이지와 런타임에서 |\r\n\r\n**예시:**\r\n```dockerfile\r\n# ARG - 빌드 시 버전 지정 (FROM 앞에서 선언 가능)\r\nARG NODE_VERSION=18\r\nFROM node:${NODE_VERSION}\r\n\r\n# 주의: FROM 이후에는 ARG를 다시 선언해야 사용 가능\r\nARG NODE_VERSION  # 재선언 필요, 기본값 없이 이전 값 상속\r\n\r\n# ENV - 런타임 환경 변수\r\nENV NODE_ENV=production\r\nENV PORT=3000\r\n```\r\n\r\n**ARG 스코프 함정 (자주 틀리는 부분):**\r\n```dockerfile\r\nARG VERSION=1.0\r\nFROM alpine\r\n\r\n# 오류! VERSION이 여기서 비어있음 - FROM 이후 스코프가 리셋됨\r\nRUN echo $VERSION  # 빈 값\r\n\r\n# 올바른 사용법\r\nARG VERSION  # FROM 이후 재선언\r\nRUN echo $VERSION  # 1.0\r\n```\r\n\r\n**빌드 명령:**\r\n```bash\r\ndocker build --build-arg NODE_VERSION=20 -t myapp .\r\n```\r\n\r\n**보안 주의사항 (함정 질문):**\r\n- ARG로 민감한 정보(비밀번호 등)를 전달하면 `docker history`로 노출됨\r\n- ENV도 마찬가지로 `docker inspect`로 노출됨\r\n- **해결책**: 빌드 시 secrets가 필요하면 BuildKit의 `--mount=type=secret` 사용\r\n```dockerfile\r\n# BuildKit secret mount (권장)\r\nRUN --mount=type=secret,id=mysecret cat /run/secrets/mysecret\r\n```\r\n- 런타임 secrets는 Docker Swarm secrets나 외부 시크릿 관리 도구 사용",
    "references": [
      {
        "title": "ARG",
        "url": "https://docs.docker.com/reference/dockerfile/#arg"
      }
    ]
  },
  {
    "id": "DOCKER-018",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Dockerfile의 WORKDIR 명령어의 역할과 사용 시 주의점을 설명해 주세요.",
    "answer": "**WORKDIR 역할:**\r\n- 이후 명령어(RUN, CMD, ENTRYPOINT, COPY, ADD)의 작업 디렉토리 설정\r\n- 디렉토리가 없으면 자동 생성\r\n- 절대/상대 경로 모두 사용 가능\r\n\r\n**예시:**\r\n```dockerfile\r\nWORKDIR /app\r\nCOPY package.json .       # /app/package.json\r\nRUN npm install           # /app에서 실행\r\nWORKDIR /app/src          # 하위 디렉토리로 이동\r\nCOPY . .                  # /app/src로 복사\r\n```\r\n\r\n**주의점:**\r\n- `RUN cd /path`보다 WORKDIR 사용 권장 (명확성, 유지보수)\r\n- 절대 경로 사용 권장 (예측 가능한 동작)\r\n- 여러 번 사용 가능, 상대 경로는 이전 WORKDIR 기준\r\n\r\n**Bad Practice:**\r\n```dockerfile\r\nRUN cd /app && npm install  # 피해야 함\r\n```",
    "references": [
      {
        "title": "WORKDIR",
        "url": "https://docs.docker.com/reference/dockerfile/#workdir"
      }
    ]
  },
  {
    "id": "DOCKER-019",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Dockerfile에서 USER 명령어를 사용하는 이유와 보안상의 이점을 설명해 주세요.",
    "answer": "**USER 명령어:**\r\n이후 명령어(RUN, CMD, ENTRYPOINT)를 실행할 사용자/그룹을 지정합니다.\r\n\r\n**예시:**\r\n```dockerfile\r\nFROM node:18-alpine\r\nWORKDIR /app\r\n\r\n# 사용자 생성\r\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\r\n\r\nCOPY --chown=appuser:appgroup . .\r\nRUN npm ci --only=production\r\n\r\n# 비root 사용자로 전환\r\nUSER appuser\r\nCMD [\"node\", \"app.js\"]\r\n```\r\n\r\n**보안상 이점:**\r\n- **최소 권한 원칙**: 컨테이너 탈출 시 피해 최소화\r\n- **호스트 보호**: root 권한으로 호스트 파일 시스템 접근 방지\r\n- **취약점 완화**: 권한 상승 공격 어려움\r\n- **규정 준수**: 많은 보안 정책에서 non-root 실행 요구\r\n\r\n**주의 및 실무 고려사항:**\r\n- 일부 작업(포트 1024 이하 바인딩)은 `CAP_NET_BIND_SERVICE` capability 필요\r\n- 많은 공식 이미지(nginx, redis 등)는 이미 non-root 사용자 지원\r\n- 파일 권한 문제: 볼륨 마운트 시 호스트와 컨테이너의 UID/GID 불일치 주의\r\n- Kubernetes에서는 `runAsNonRoot: true`로 강제 가능",
    "references": [
      {
        "title": "USER",
        "url": "https://docs.docker.com/reference/dockerfile/#user"
      }
    ]
  },
  {
    "id": "DOCKER-020",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "HEALTHCHECK 명령어의 역할과 설정 옵션에 대해 설명해 주세요.",
    "answer": "**HEALTHCHECK 역할:**\r\n컨테이너 내 애플리케이션의 상태를 주기적으로 확인합니다.\r\n\r\n**문법:**\r\n```dockerfile\r\nHEALTHCHECK [OPTIONS] CMD command\r\n\r\n# 예시\r\nHEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\\r\n  CMD curl -f http://localhost:8080/health || exit 1\r\n```\r\n\r\n**옵션:**\r\n| 옵션 | 기본값 | 설명 |\r\n|------|--------|------|\r\n| `--interval` | 30s | 헬스체크 간격 |\r\n| `--timeout` | 30s | 타임아웃 |\r\n| `--start-period` | 0s | 시작 후 대기 시간 |\r\n| `--retries` | 3 | 실패 허용 횟수 |\r\n\r\n**상태:**\r\n- `starting`: 시작 중 (start-period 내)\r\n- `healthy`: 정상 (exit 0)\r\n- `unhealthy`: 비정상 (retries 초과)\r\n\r\n**활용:** Docker Swarm, Compose에서 서비스 상태 관리 및 재시작 정책에 활용됩니다.",
    "references": [
      {
        "title": "HEALTHCHECK",
        "url": "https://docs.docker.com/reference/dockerfile/#healthcheck"
      }
    ]
  },
  {
    "id": "DOCKER-021",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이미지 레이어 수를 줄이고 이미지 크기를 최적화하는 Dockerfile 작성 방법을 설명해 주세요.",
    "answer": "**레이어 수 줄이기:**\r\n```dockerfile\r\n# Bad - 3개 레이어\r\nRUN apt-get update\r\nRUN apt-get install -y curl\r\nRUN rm -rf /var/lib/apt/lists/*\r\n\r\n# Good - 1개 레이어\r\nRUN apt-get update && \\\r\n    apt-get install -y curl && \\\r\n    rm -rf /var/lib/apt/lists/*\r\n```\r\n\r\n**이미지 크기 최적화:**\r\n\r\n1. **경량 베이스 이미지 사용**\r\n   - `alpine`, `slim`, `distroless` 선택\r\n\r\n2. **불필요한 파일 정리**\r\n   - 패키지 캐시 삭제\r\n   - 빌드 의존성 제거\r\n\r\n3. **멀티스테이지 빌드 활용**\r\n\r\n4. **.dockerignore 사용**\r\n\r\n5. **레이어 순서 최적화**\r\n   - 자주 변경되는 파일은 마지막에 COPY\r\n\r\n```dockerfile\r\nCOPY package.json .        # 덜 변경됨\r\nRUN npm install\r\nCOPY . .                   # 자주 변경됨\r\n```",
    "references": [
      {
        "title": "Best practices for Dockerfile",
        "url": "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/"
      }
    ]
  },
  {
    "id": "DOCKER-022",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이미지 빌드 시 빌드 캐시가 무효화되는 조건과 캐시를 효율적으로 활용하는 방법을 설명해 주세요.",
    "answer": "**캐시 무효화 조건:**\r\n- Dockerfile 명령어 변경\r\n- COPY/ADD 대상 파일 내용 변경 (체크섬 비교)\r\n- 이전 레이어의 캐시가 무효화됨\r\n- `--no-cache` 옵션 사용\r\n- ARG 값 변경 (해당 ARG 사용하는 명령어부터)\r\n\r\n**캐시 효율적 활용:**\r\n\r\n1. **변경 빈도 순서로 명령어 배치**\r\n```dockerfile\r\n# 덜 변경되는 것 먼저\r\nCOPY package.json package-lock.json ./\r\nRUN npm ci\r\n\r\n# 자주 변경되는 것 나중에\r\nCOPY src/ ./src/\r\n```\r\n\r\n2. **의존성 파일 분리**\r\n```dockerfile\r\n# 의존성 정의 파일만 먼저 복사\r\nCOPY go.mod go.sum ./\r\nRUN go mod download\r\nCOPY . .\r\n```\r\n\r\n3. **RUN 명령어 통합 여부 고려**\r\n   - 자주 변경되는 명령은 분리\r\n   - 관련 명령은 통합",
    "references": [
      {
        "title": "Leverage build cache",
        "url": "https://docs.docker.com/build/cache/"
      }
    ]
  },
  {
    "id": "DOCKER-023",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이미지를 빌드하는 과정과 주요 옵션들을 설명해 주세요.",
    "answer": "**빌드 과정:**\r\n1. 빌드 컨텍스트(현재 디렉토리) 전송\r\n2. Dockerfile 파싱\r\n3. 각 명령어 순차 실행, 레이어 생성\r\n4. 캐시 활용 (가능한 경우)\r\n5. 최종 이미지 생성\r\n\r\n**기본 명령:**\r\n```bash\r\ndocker build -t myapp:1.0 .\r\n```\r\n\r\n**주요 옵션:**\r\n| 옵션 | 설명 |\r\n|------|------|\r\n| `-t, --tag` | 이미지 이름:태그 지정 |\r\n| `-f, --file` | Dockerfile 경로 지정 |\r\n| `--build-arg` | ARG 값 전달 |\r\n| `--no-cache` | 캐시 미사용 |\r\n| `--target` | 멀티스테이지 특정 단계까지만 빌드 |\r\n| `--platform` | 대상 플랫폼 (linux/amd64 등) |\r\n| `--progress` | 출력 형식 (plain, tty, auto) |\r\n\r\n```bash\r\ndocker build \\\r\n  -t myapp:1.0 \\\r\n  -f docker/Dockerfile.prod \\\r\n  --build-arg NODE_ENV=production \\\r\n  --target runtime \\\r\n  .\r\n```",
    "references": [
      {
        "title": "docker build",
        "url": "https://docs.docker.com/reference/cli/docker/image/build/"
      }
    ]
  },
  {
    "id": "DOCKER-024",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이미지 태깅 전략과 버전 관리 방법에 대해 설명해 주세요.",
    "answer": "**태깅 전략:**\r\n\r\n1. **Semantic Versioning**\r\n```bash\r\nmyapp:1.0.0\r\nmyapp:1.0\r\nmyapp:1\r\n```\r\n\r\n2. **Git 기반**\r\n```bash\r\nmyapp:abc1234        # commit hash\r\nmyapp:main-abc1234   # branch + hash\r\nmyapp:v1.2.3         # git tag\r\n```\r\n\r\n3. **환경/날짜 기반**\r\n```bash\r\nmyapp:prod-20240115\r\nmyapp:staging\r\n```\r\n\r\n**권장 사항:**\r\n- `latest` 태그는 프로덕션에서 피하기 (불명확)\r\n- 불변 태그 사용 (commit hash, 버전)\r\n- 다중 태그 적용\r\n\r\n```bash\r\ndocker build -t myapp:1.0.0 -t myapp:1.0 -t myapp:latest .\r\n```\r\n\r\n**이미지 다이제스트:**\r\n```bash\r\n# 완전히 불변한 참조\r\nmyapp@sha256:abc123...\r\n```",
    "references": [
      {
        "title": "Tagging best practices",
        "url": "https://docs.docker.com/develop/develop-images/guidelines/"
      }
    ]
  },
  {
    "id": "DOCKER-025",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이미지를 프라이빗 레지스트리에 푸시하고 풀하는 과정을 설명해 주세요.",
    "answer": "**1. 레지스트리 로그인:**\r\n```bash\r\ndocker login registry.example.com\r\n# 또는\r\ndocker login -u username -p password registry.example.com\r\n```\r\n\r\n**2. 이미지 태깅:**\r\n```bash\r\n# 레지스트리 주소를 포함하여 태그\r\ndocker tag myapp:1.0 registry.example.com/myproject/myapp:1.0\r\n```\r\n\r\n**3. 이미지 푸시:**\r\n```bash\r\ndocker push registry.example.com/myproject/myapp:1.0\r\n```\r\n\r\n**4. 이미지 풀:**\r\n```bash\r\ndocker pull registry.example.com/myproject/myapp:1.0\r\n```\r\n\r\n**클라우드 레지스트리 예시:**\r\n```bash\r\n# AWS ECR\r\naws ecr get-login-password | docker login --username AWS --password-stdin 123456789.dkr.ecr.ap-northeast-2.amazonaws.com\r\n\r\n# GCP GCR\r\ngcloud auth configure-docker\r\ndocker push gcr.io/myproject/myapp:1.0\r\n```",
    "references": [
      {
        "title": "docker push",
        "url": "https://docs.docker.com/reference/cli/docker/image/push/"
      }
    ]
  },
  {
    "id": "DOCKER-026",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "dangling 이미지란 무엇이며, 이를 정리하는 방법을 설명해 주세요.",
    "answer": "**Dangling 이미지란:**\r\n태그가 없는 이미지로, `<none>:<none>`으로 표시됩니다. 주로 새 이미지 빌드 시 기존 태그가 새 이미지로 이동하면서 발생합니다.\r\n\r\n**확인 방법:**\r\n```bash\r\n# dangling 이미지 목록\r\ndocker images -f \"dangling=true\"\r\n\r\n# 또는\r\ndocker images | grep \"<none>\"\r\n```\r\n\r\n**정리 방법:**\r\n```bash\r\n# dangling 이미지만 삭제\r\ndocker image prune\r\n\r\n# 확인 없이 삭제\r\ndocker image prune -f\r\n\r\n# 사용하지 않는 모든 이미지 삭제\r\ndocker image prune -a\r\n```\r\n\r\n**전체 정리:**\r\n```bash\r\n# 중지된 컨테이너, 네트워크, dangling 이미지, 캐시 모두 삭제\r\ndocker system prune\r\n\r\n# 볼륨 포함\r\ndocker system prune --volumes\r\n```",
    "references": [
      {
        "title": "docker image prune",
        "url": "https://docs.docker.com/reference/cli/docker/image/prune/"
      }
    ]
  },
  {
    "id": "DOCKER-027",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이미지의 히스토리를 확인하고 각 레이어의 크기를 분석하는 방법을 설명해 주세요.",
    "answer": "**이미지 히스토리 확인:**\r\n```bash\r\ndocker history myapp:1.0\r\n\r\n# 전체 명령어 표시\r\ndocker history --no-trunc myapp:1.0\r\n\r\n# 특정 형식으로 출력\r\ndocker history --format \"{{.CreatedBy}}: {{.Size}}\" myapp:1.0\r\n```\r\n\r\n**출력 예시:**\r\n```\r\nIMAGE          CREATED       CREATED BY                                      SIZE\r\nabc123         2 hours ago   CMD [\"node\" \"app.js\"]                           0B\r\ndef456         2 hours ago   COPY . . # buildkit                             15MB\r\nghi789         2 hours ago   RUN npm install # buildkit                      150MB\r\n...\r\n```\r\n\r\n**상세 분석 도구:**\r\n```bash\r\n# dive - 이미지 레이어 분석 도구\r\ndive myapp:1.0\r\n\r\n# docker inspect\r\ndocker inspect myapp:1.0 --format '{{.RootFS.Layers}}'\r\n```\r\n\r\n**최적화 포인트:**\r\n- 큰 레이어 식별 후 최적화\r\n- 불필요한 파일 제거 확인\r\n- 캐시 정리 여부 확인",
    "references": [
      {
        "title": "docker history",
        "url": "https://docs.docker.com/reference/cli/docker/image/history/"
      }
    ]
  },
  {
    "id": "DOCKER-028",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker base 이미지를 선택할 때 고려해야 할 요소들을 설명해 주세요. (alpine, slim, scratch 등)",
    "answer": "| 이미지 | 크기 | 특징 | 사용 사례 |\r\n|--------|------|------|-----------|\r\n| **scratch** | 0B | 완전히 비어있음, CA 인증서 없음 | 정적 바이너리 (Go, Rust) |\r\n| **distroless** | ~2-20MB | Google 제공, 쉘 없음, 언어별 런타임만 | 프로덕션 보안 중시 |\r\n| **alpine** | ~5MB | musl libc, busybox, apk | 경량 컨테이너, 쉘 필요 시 |\r\n| **slim** | ~80MB | Debian 최소 설치, glibc | glibc 필요한 라이브러리 |\r\n| **기본** | ~100MB+ | 전체 OS 패키지 | 디버깅, 개발 환경 |\r\n\r\n**트레이드오프 상세 (함정 질문 빈출):**\r\n\r\n1. **Alpine의 musl libc 이슈:**\r\n   - 일부 C 라이브러리(특히 glibc 전용)와 비호환\r\n   - Python의 일부 패키지, Node.js native addon에서 문제 발생 가능\r\n   - DNS 해석 동작이 glibc와 다름 (특히 `/etc/hosts` 처리)\r\n\r\n2. **scratch의 제약:**\r\n   - CA 인증서 없음 → HTTPS 호출 실패 (직접 복사 필요)\r\n   - 쉘 없음 → `docker exec` 디버깅 불가\r\n   - 사용자/그룹 없음 → USER 명령어 제한적\r\n\r\n3. **distroless 권장 이유:**\r\n   - 공격 표면 최소화 (쉘, 패키지 매니저 없음)\r\n   - CVE 스캔 시 취약점 적음\r\n   - 언어별 런타임(Java, Python, Node.js 등) 제공\r\n\r\n**실무 권장:**\r\n- 보안 최우선: distroless 또는 scratch\r\n- 범용/디버깅 필요: alpine (단, musl 이슈 테스트 필수)\r\n- 복잡한 네이티브 의존성: slim\r\n- Node.js에서 native addon 사용 시: slim 권장 (alpine은 추가 빌드 도구 필요)",
    "references": [
      {
        "title": "Best practices for Dockerfile",
        "url": "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#from"
      }
    ]
  },
  {
    "id": "DOCKER-029",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이미지를 파일로 저장(save)하고 로드(load)하는 방법과 사용 시나리오를 설명해 주세요.",
    "answer": "**이미지 저장 (save):**\r\n```bash\r\n# 단일 이미지\r\ndocker save -o myapp.tar myapp:1.0\r\n\r\n# 여러 이미지\r\ndocker save -o images.tar myapp:1.0 nginx:latest\r\n\r\n# gzip 압축\r\ndocker save myapp:1.0 | gzip > myapp.tar.gz\r\n```\r\n\r\n**이미지 로드 (load):**\r\n```bash\r\ndocker load -i myapp.tar\r\n\r\n# gzip 압축 해제 및 로드\r\ngunzip -c myapp.tar.gz | docker load\r\n```\r\n\r\n**사용 시나리오:**\r\n1. **에어갭 환경**: 인터넷 없는 폐쇄망에 이미지 전달\r\n2. **백업**: 중요 이미지 아카이브\r\n3. **오프라인 배포**: USB 등으로 물리적 전달\r\n4. **CI/CD 아티팩트**: 빌드 결과물 저장\r\n\r\n**export/import와 차이:**\r\n- `save/load`: 이미지 전체 (레이어, 메타데이터 포함)\r\n- `export/import`: 컨테이너 파일시스템 (단일 레이어)",
    "references": [
      {
        "title": "docker save",
        "url": "https://docs.docker.com/reference/cli/docker/image/save/"
      }
    ]
  },
  {
    "id": "DOCKER-030",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker Content Trust란 무엇이며, 이미지 서명의 중요성을 설명해 주세요.",
    "answer": "**Docker Content Trust (DCT):**\r\n이미지 게시자의 신원을 검증하고, 이미지 무결성을 보장하는 보안 기능입니다. Notary 프로젝트 기반으로 구현되었습니다.\r\n\r\n**활성화:**\r\n```bash\r\nexport DOCKER_CONTENT_TRUST=1\r\n\r\n# 또는 명령어별\r\ndocker pull --disable-content-trust=false myimage\r\n```\r\n\r\n**이미지 서명:**\r\n```bash\r\n# 서명된 이미지 푸시\r\ndocker push registry.example.com/myapp:1.0\r\n# 자동으로 서명됨 (DCT 활성화 시)\r\n```\r\n\r\n**이미지 서명의 중요성:**\r\n1. **무결성**: 이미지가 변조되지 않았음을 보장\r\n2. **신뢰성**: 이미지 게시자 신원 확인\r\n3. **공급망 보안**: 중간자 공격 방지\r\n4. **규정 준수**: 보안 정책 요구사항 충족\r\n\r\n**동작 원리:**\r\n- 오프라인 키: root key (안전하게 보관)\r\n- 온라인 키: 이미지 서명용",
    "references": [
      {
        "title": "Content trust in Docker",
        "url": "https://docs.docker.com/engine/security/trust/"
      }
    ]
  },
  {
    "id": "DOCKER-031",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker의 기본 네트워크 드라이버 종류(bridge, host, none, overlay)와 각각의 특징을 설명해 주세요.",
    "answer": "| 드라이버 | 특징 | 사용 사례 |\r\n|----------|------|-----------|\r\n| **bridge** | 기본값, 가상 브릿지 네트워크, NAT 사용 | 단일 호스트, 독립 컨테이너 |\r\n| **host** | 호스트 네트워크 스택 직접 사용, 격리 없음 | 네트워크 성능 중요 시 (Linux만) |\r\n| **none** | 네트워크 비활성화, loopback만 존재 | 완전한 네트워크 격리 |\r\n| **overlay** | 다중 호스트 간 네트워크, VXLAN 사용 | Docker Swarm, 클러스터 |\r\n| **macvlan** | 컨테이너에 고유 MAC 주소 할당 | 레거시 앱, 물리 네트워크 직접 연결 |\r\n| **ipvlan** | macvlan과 유사, MAC 공유 | macvlan 제약이 있는 환경 |\r\n\r\n**네트워크 드라이버 선택 트레이드오프:**\r\n- **bridge**: 가장 안전하고 범용적이나 NAT 오버헤드 있음\r\n- **host**: 성능 최적이나 포트 충돌 위험, 보안 경계 약화\r\n- **overlay**: 멀티호스트에 필수이나 VXLAN 캡슐화로 약간의 성능 저하\r\n- **macvlan**: 외부 네트워크와 직접 통신 가능하나 호스트와 컨테이너 간 통신 복잡\r\n\r\n**예시:**\r\n```bash\r\n# bridge (기본)\r\ndocker run -d --network bridge nginx\r\n\r\n# host\r\ndocker run -d --network host nginx\r\n\r\n# none\r\ndocker run -d --network none nginx\r\n\r\n# 사용자 정의 네트워크\r\ndocker network create mynet\r\ndocker run -d --network mynet nginx\r\n```",
    "references": [
      {
        "title": "Network drivers",
        "url": "https://docs.docker.com/network/drivers/"
      }
    ]
  },
  {
    "id": "DOCKER-032",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker bridge 네트워크의 동작 원리와 컨테이너 간 통신 방식을 설명해 주세요.",
    "answer": "**동작 원리:**\r\n1. Docker가 호스트에 가상 브릿지(`docker0`) 생성\r\n2. 각 컨테이너에 veth(가상 이더넷) 페어 생성\r\n3. 한쪽은 컨테이너 내 eth0, 다른 쪽은 브릿지에 연결\r\n4. 컨테이너는 브릿지를 통해 통신\r\n\r\n**네트워크 구조:**\r\n```\r\n호스트\r\n├── docker0 (172.17.0.1)\r\n│   ├── vethXXX ── 컨테이너A (172.17.0.2)\r\n│   └── vethYYY ── 컨테이너B (172.17.0.3)\r\n```\r\n\r\n**컨테이너 간 통신:**\r\n```bash\r\n# 기본 bridge - IP로 통신 (DNS 미지원)\r\ndocker run -d --name web nginx\r\ndocker run -it alpine ping 172.17.0.2\r\n\r\n# 사용자 정의 bridge - 컨테이너 이름으로 통신 (DNS 지원)\r\ndocker network create mynet\r\ndocker run -d --name web --network mynet nginx\r\ndocker run -it --network mynet alpine ping web\r\n```\r\n\r\n**외부 통신:**\r\n- NAT(MASQUERADE)를 통해 호스트 IP로 외부 통신",
    "references": [
      {
        "title": "Bridge network driver",
        "url": "https://docs.docker.com/network/drivers/bridge/"
      }
    ]
  },
  {
    "id": "DOCKER-033",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker host 네트워크 모드의 특징과 사용 시 주의점을 설명해 주세요.",
    "answer": "**특징:**\r\n- 컨테이너가 호스트의 네트워크 스택을 직접 사용\r\n- 네트워크 격리 없음 (network namespace 공유)\r\n- 포트 매핑 불필요 (컨테이너 포트 = 호스트 포트)\r\n- NAT 오버헤드 없음 → 성능 향상\r\n\r\n**사용 예시:**\r\n```bash\r\ndocker run -d --network host nginx\r\n# nginx가 호스트의 80번 포트에 직접 바인딩\r\n```\r\n\r\n**장점:**\r\n- 네트워크 성능 최적화 (NAT 오버헤드 제거, 지연 시간 감소)\r\n- 포트 매핑 복잡성 제거\r\n- 많은 포트 사용 시 편리\r\n\r\n**주의점 (중요한 트레이드오프):**\r\n1. **포트 충돌**: 호스트와 같은 포트 사용 시 충돌 발생\r\n2. **보안 위험**: 네트워크 격리 없음 - 컨테이너가 호스트의 모든 네트워크 인터페이스 접근 가능\r\n3. **이식성 감소**: 호스트 네트워크 환경에 종속\r\n4. **Linux 전용**: macOS/Windows의 Docker Desktop은 VM 내에서 동작하므로 host 네트워크가 실제 호스트가 아닌 VM의 네트워크를 의미\r\n5. **컨테이너 간 통신**: localhost로 다른 컨테이너 접근 가능하여 의도치 않은 노출 위험\r\n\r\n**사용 사례:**\r\n- 네트워크 모니터링 도구\r\n- 고성능 네트워크 애플리케이션",
    "references": [
      {
        "title": "Host network driver",
        "url": "https://docs.docker.com/network/drivers/host/"
      }
    ]
  },
  {
    "id": "DOCKER-034",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker overlay 네트워크란 무엇이며, 어떤 상황에서 사용하나요?",
    "answer": "**Overlay 네트워크:**\r\n여러 Docker 호스트에 걸쳐 있는 분산 네트워크로, 서로 다른 호스트의 컨테이너가 같은 네트워크에 있는 것처럼 통신할 수 있게 합니다.\r\n\r\n**동작 원리:**\r\n- VXLAN(Virtual Extensible LAN) 기술 사용\r\n- L2 over L3 터널링\r\n- 각 호스트의 Docker 데몬이 협력\r\n\r\n**생성 및 사용:**\r\n```bash\r\n# Swarm 모드에서 생성\r\ndocker network create -d overlay myoverlay\r\n\r\n# 서비스에 연결\r\ndocker service create --network myoverlay --name web nginx\r\n```\r\n\r\n**사용 상황:**\r\n1. **Docker Swarm**: 멀티 노드 클러스터\r\n2. **마이크로서비스**: 여러 호스트에 분산된 서비스 간 통신\r\n3. **서비스 디스커버리**: 내장 DNS로 서비스 이름 해석\r\n\r\n**특징:**\r\n- 자동 암호화 옵션 (`--opt encrypted`)\r\n- 내장 로드 밸런싱\r\n- 서비스 메시 라우팅",
    "references": [
      {
        "title": "Overlay network driver",
        "url": "https://docs.docker.com/network/drivers/overlay/"
      }
    ]
  },
  {
    "id": "DOCKER-035",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker의 내장 DNS 서비스는 어떻게 동작하며, 컨테이너 이름으로 통신하는 원리를 설명해 주세요.",
    "answer": "**Docker 내장 DNS:**\r\n사용자 정의 네트워크에서 컨테이너 이름, 서비스 이름, 네트워크 별칭을 IP 주소로 해석해주는 DNS 서버입니다.\r\n\r\n**동작 원리:**\r\n1. 컨테이너의 `/etc/resolv.conf`에 내장 DNS 서버(127.0.0.11) 설정\r\n2. 컨테이너 이름으로 DNS 쿼리 시 Docker DNS가 응답\r\n3. 외부 도메인은 호스트 DNS로 포워딩\r\n\r\n**예시:**\r\n```bash\r\n# 사용자 정의 네트워크 생성\r\ndocker network create mynet\r\n\r\n# 컨테이너 실행\r\ndocker run -d --name db --network mynet postgres\r\ndocker run -d --name web --network mynet nginx\r\n\r\n# web 컨테이너에서 db로 접근\r\ndocker exec web ping db  # db의 IP로 해석됨\r\n```\r\n\r\n**네트워크 별칭:**\r\n```bash\r\ndocker run -d --name db --network mynet --network-alias database postgres\r\n# database로도 접근 가능\r\n```\r\n\r\n**주의:**\r\n- 기본 bridge 네트워크는 DNS 미지원\r\n- 반드시 사용자 정의 네트워크 사용",
    "references": [
      {
        "title": "Networking with standalone containers",
        "url": "https://docs.docker.com/network/network-tutorial-standalone/"
      }
    ]
  },
  {
    "id": "DOCKER-036",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너의 포트 매핑(-p 옵션)과 포트 노출(EXPOSE)의 차이점을 설명해 주세요.",
    "answer": "**EXPOSE (Dockerfile):**\r\n- 문서화 목적 (컨테이너가 사용하는 포트 명시)\r\n- 실제로 포트를 열지 않음\r\n- 이미지 메타데이터에 기록\r\n\r\n```dockerfile\r\nEXPOSE 80\r\nEXPOSE 443\r\n```\r\n\r\n**-p 옵션 (docker run):**\r\n- 실제 포트 매핑 수행\r\n- 호스트 포트 ↔ 컨테이너 포트 연결\r\n- 외부에서 접근 가능하게 함\r\n\r\n```bash\r\n# 호스트:컨테이너\r\ndocker run -p 8080:80 nginx\r\n\r\n# 특정 IP만\r\ndocker run -p 127.0.0.1:8080:80 nginx\r\n\r\n# 호스트 포트 자동 할당\r\ndocker run -p 80 nginx\r\ndocker run -P nginx  # EXPOSE 포트 모두 자동 매핑\r\n```\r\n\r\n**비교:**\r\n| 구분 | EXPOSE | -p |\r\n|------|--------|-----|\r\n| 위치 | Dockerfile | docker run |\r\n| 효과 | 문서화 | 실제 매핑 |\r\n| 외부 접근 | 불가 | 가능 |",
    "references": [
      {
        "title": "EXPOSE",
        "url": "https://docs.docker.com/reference/dockerfile/#expose"
      }
    ]
  },
  {
    "id": "DOCKER-037",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker에서 사용자 정의 네트워크(user-defined network)를 생성하고 사용하는 이유와 장점을 설명해 주세요.",
    "answer": "**생성 방법:**\r\n```bash\r\ndocker network create mynet\r\n\r\n# 옵션 지정\r\ndocker network create \\\r\n  --driver bridge \\\r\n  --subnet 192.168.100.0/24 \\\r\n  --gateway 192.168.100.1 \\\r\n  mynet\r\n```\r\n\r\n**사용:**\r\n```bash\r\ndocker run -d --name web --network mynet nginx\r\ndocker run -d --name db --network mynet postgres\r\n```\r\n\r\n**장점 (기본 bridge 대비):**\r\n\r\n1. **자동 DNS 해석**\r\n   - 컨테이너 이름으로 통신 가능\r\n   - 기본 bridge는 IP만 사용 가능\r\n\r\n2. **더 나은 격리**\r\n   - 네트워크별 컨테이너 격리\r\n   - 명시적으로 연결된 컨테이너만 통신\r\n\r\n3. **동적 연결/해제**\r\n   ```bash\r\n   docker network connect mynet container1\r\n   docker network disconnect mynet container1\r\n   ```\r\n\r\n4. **설정 유연성**\r\n   - 서브넷, 게이트웨이 직접 설정\r\n   - IP 범위 지정 가능\r\n\r\n5. **환경 변수 공유**\r\n   - `--link` 없이도 서비스 디스커버리",
    "references": [
      {
        "title": "docker network create",
        "url": "https://docs.docker.com/reference/cli/docker/network/create/"
      }
    ]
  },
  {
    "id": "DOCKER-038",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 네트워크에서 컨테이너 간 통신을 제한하는 방법을 설명해 주세요.",
    "answer": "**1. ICC(Inter-Container Communication) 비활성화:**\r\n```bash\r\n# 네트워크 생성 시 컨테이너 간 통신 차단\r\ndocker network create --opt com.docker.network.bridge.enable_icc=false isolated_net\r\n```\r\n\r\n**2. 별도 네트워크 분리:**\r\n```bash\r\n# 프론트엔드 네트워크\r\ndocker network create frontend\r\n\r\n# 백엔드 네트워크\r\ndocker network create backend\r\n\r\n# 웹서버는 frontend만\r\ndocker run -d --name web --network frontend nginx\r\n\r\n# DB는 backend만\r\ndocker run -d --name db --network backend postgres\r\n\r\n# API는 양쪽 연결 (중개자 역할)\r\ndocker run -d --name api --network frontend nginx\r\ndocker network connect backend api\r\n```\r\n\r\n**3. none 네트워크:**\r\n```bash\r\ndocker run -d --network none isolated_container\r\n```\r\n\r\n**4. 방화벽 규칙 (iptables):**\r\n```bash\r\n# Docker가 생성한 규칙 커스터마이즈\r\niptables -I DOCKER-USER -s 172.18.0.2 -d 172.18.0.3 -j DROP\r\n```\r\n\r\n**5. Docker Compose에서:**\r\n```yaml\r\nservices:\r\n  web:\r\n    networks:\r\n      - frontend\r\n  db:\r\n    networks:\r\n      - backend\r\n```",
    "references": [
      {
        "title": "Networking overview",
        "url": "https://docs.docker.com/network/"
      }
    ]
  },
  {
    "id": "DOCKER-039",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker에서 데이터를 영속화하는 세 가지 방법(volumes, bind mounts, tmpfs)의 차이점을 설명해 주세요.",
    "answer": "| 구분 | Volumes | Bind Mounts | tmpfs |\r\n|------|---------|-------------|-------|\r\n| **저장 위치** | Docker 관리 영역 (/var/lib/docker/volumes/) | 호스트 파일 시스템 임의 경로 | 메모리 (RAM) |\r\n| **관리** | Docker CLI로 관리 | 직접 관리 | - |\r\n| **영속성** | 컨테이너 독립적 | 컨테이너 독립적 | 휘발성 (컨테이너 종료 시 삭제) |\r\n| **성능 (Linux)** | 좋음 | 좋음 | 매우 빠름 |\r\n| **성능 (Mac/Win)** | 좋음 (VM 내부) | 느림 (osxfs/grpcfuse 오버헤드) | 좋음 |\r\n| **이식성** | 높음 | 낮음 (경로 의존) | Linux 전용 |\r\n| **초기 데이터** | 이미지 데이터 자동 복사 | 호스트 데이터 그대로 사용 | 비어있음 |\r\n\r\n**트레이드오프 상세:**\r\n- **Bind Mounts의 macOS/Windows 성능 문제**: Docker Desktop에서 호스트-VM 간 파일 동기화로 인해 node_modules 같은 많은 파일 접근 시 매우 느림. 해결책: 의존성은 볼륨에, 소스만 bind mount\r\n- **보안**: Bind mounts는 호스트 파일시스템에 직접 접근하므로 컨테이너가 민감한 파일 수정 가능\r\n\r\n**사용 예시:**\r\n```bash\r\n# Volume\r\ndocker run -v mydata:/app/data nginx\r\ndocker run --mount type=volume,src=mydata,dst=/app/data nginx\r\n\r\n# Bind Mount\r\ndocker run -v /host/path:/container/path nginx\r\ndocker run --mount type=bind,src=/host/path,dst=/container/path nginx\r\n\r\n# tmpfs\r\ndocker run --tmpfs /app/temp nginx\r\ndocker run --mount type=tmpfs,dst=/app/temp nginx\r\n```\r\n\r\n**선택 기준:**\r\n- **Volumes**: 프로덕션 데이터, DB 저장소\r\n- **Bind Mounts**: 개발 환경, 설정 파일 공유\r\n- **tmpfs**: 민감한 임시 데이터, 캐시",
    "references": [
      {
        "title": "Manage data in Docker",
        "url": "https://docs.docker.com/storage/"
      }
    ]
  },
  {
    "id": "DOCKER-040",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker Named Volume이란 무엇이며, 바인드 마운트 대비 선호되는 이유를 설명해 주세요.",
    "answer": "**Named Volume 장점:**\r\n\r\n1. **Docker가 관리**\r\n   - 생성, 삭제, 목록 조회 가능\r\n   ```bash\r\n   docker volume create mydata\r\n   docker volume ls\r\n   docker volume inspect mydata\r\n   ```\r\n\r\n2. **이식성**\r\n   - 호스트 경로에 의존하지 않음\r\n   - 다른 환경에서 동일하게 동작\r\n\r\n3. **볼륨 드라이버 지원**\r\n   - 클라우드 스토리지, NFS 등 연동 가능\r\n   ```bash\r\n   docker volume create --driver=nfs myvolume\r\n   ```\r\n\r\n4. **백업 및 마이그레이션 용이**\r\n   ```bash\r\n   docker run --rm -v mydata:/data -v $(pwd):/backup \\\r\n     alpine tar cvf /backup/backup.tar /data\r\n   ```\r\n\r\n5. **초기 데이터 복사**\r\n   - 이미지의 데이터를 볼륨으로 자동 복사\r\n\r\n6. **Linux/Mac/Windows 호환**\r\n   - 플랫폼 독립적\r\n\r\n**바인드 마운트 사용 시:**\r\n- 개발 환경에서 소스 코드 실시간 반영\r\n- 특정 호스트 파일/디렉토리 접근 필요 시",
    "references": [
      {
        "title": "Volumes",
        "url": "https://docs.docker.com/storage/volumes/"
      }
    ]
  },
  {
    "id": "DOCKER-041",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 바인드 마운트(Bind Mount)란 무엇이며, 개발 환경에서 어떻게 활용할 수 있나요?",
    "answer": "**특징:**\r\n- 호스트의 특정 경로를 컨테이너에 마운트\r\n- 양방향 동기화 (호스트 변경 ↔ 컨테이너 반영)\r\n- Docker 외부에서 관리\r\n- 절대 경로 필요\r\n\r\n**개발 환경 활용:**\r\n\r\n1. **소스 코드 실시간 반영:**\r\n```bash\r\ndocker run -v $(pwd)/src:/app/src node:18 npm run dev\r\n```\r\n\r\n2. **핫 리로드 개발:**\r\n```yaml\r\n# docker-compose.yml\r\nservices:\r\n  app:\r\n    build: .\r\n    volumes:\r\n      - ./src:/app/src\r\n      - ./package.json:/app/package.json\r\n    command: npm run dev\r\n```\r\n\r\n3. **설정 파일 주입:**\r\n```bash\r\ndocker run -v ./config/nginx.conf:/etc/nginx/nginx.conf:ro nginx\r\n```\r\n\r\n4. **로그 접근:**\r\n```bash\r\ndocker run -v ./logs:/var/log/app myapp\r\n```\r\n\r\n**주의점:**\r\n- Windows/Mac은 파일 시스템 성능 이슈 가능\r\n- `:ro` 플래그로 읽기 전용 설정 권장\r\n- 호스트 경로 의존으로 이식성 낮음",
    "references": [
      {
        "title": "Bind mounts",
        "url": "https://docs.docker.com/storage/bind-mounts/"
      }
    ]
  },
  {
    "id": "DOCKER-042",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker tmpfs 마운트란 무엇이며, 어떤 상황에서 사용하나요?",
    "answer": "**tmpfs 마운트란:**\r\n호스트의 메모리(RAM)에 데이터를 저장하는 마운트 방식입니다. 컨테이너 종료 시 데이터가 삭제됩니다.\r\n\r\n**사용 방법:**\r\n```bash\r\n# 기본 사용\r\ndocker run --tmpfs /app/temp myapp\r\n\r\n# 옵션 지정\r\ndocker run --mount type=tmpfs,dst=/app/temp,tmpfs-size=100m,tmpfs-mode=1777 myapp\r\n```\r\n\r\n**옵션:**\r\n- `tmpfs-size`: 최대 크기 (바이트)\r\n- `tmpfs-mode`: 파일 모드 (권한)\r\n\r\n**사용 상황:**\r\n\r\n1. **민감한 임시 데이터**\r\n   - 비밀번호, 토큰 등 디스크에 남기면 안 되는 정보\r\n\r\n2. **고성능 캐시**\r\n   - 빠른 읽기/쓰기가 필요한 임시 캐시\r\n\r\n3. **빌드 아티팩트**\r\n   - 빌드 중 생성되는 임시 파일\r\n\r\n4. **세션 데이터**\r\n   - 영속화 불필요한 세션 정보\r\n\r\n**특징:**\r\n- 매우 빠른 I/O\r\n- Linux 호스트에서만 사용 가능\r\n- Swarm 서비스에서 사용 가능",
    "references": [
      {
        "title": "tmpfs mounts",
        "url": "https://docs.docker.com/storage/tmpfs/"
      }
    ]
  },
  {
    "id": "DOCKER-043",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 볼륨의 생명주기와 컨테이너 삭제 시 볼륨 처리 방법을 설명해 주세요.",
    "answer": "**볼륨 생명주기:**\r\n- 볼륨은 컨테이너와 독립적\r\n- 컨테이너 삭제 후에도 볼륨 유지\r\n- 명시적으로 삭제해야 제거됨\r\n\r\n**볼륨 생성/삭제:**\r\n```bash\r\n# 생성\r\ndocker volume create mydata\r\n\r\n# 삭제\r\ndocker volume rm mydata\r\n\r\n# 사용하지 않는 볼륨 모두 삭제\r\ndocker volume prune\r\n```\r\n\r\n**컨테이너 삭제 시 볼륨 처리:**\r\n\r\n```bash\r\n# 컨테이너만 삭제 (볼륨 유지)\r\ndocker rm mycontainer\r\n\r\n# 컨테이너와 익명 볼륨 함께 삭제\r\ndocker rm -v mycontainer\r\n\r\n# Docker Compose\r\ndocker-compose down           # 볼륨 유지\r\ndocker-compose down -v        # 볼륨 삭제\r\ndocker-compose down --volumes # 동일\r\n```\r\n\r\n**익명 볼륨 vs Named 볼륨:**\r\n```bash\r\n# 익명 볼륨 - docker rm -v로 삭제됨\r\ndocker run -v /data myapp\r\n\r\n# Named 볼륨 - 명시적 삭제 필요\r\ndocker run -v mydata:/data myapp\r\n```",
    "references": [
      {
        "title": "Volumes",
        "url": "https://docs.docker.com/storage/volumes/"
      }
    ]
  },
  {
    "id": "DOCKER-044",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 볼륨 드라이버란 무엇이며, 외부 스토리지와 연동하는 방법을 설명해 주세요.",
    "answer": "**볼륨 드라이버:**\r\nDocker 볼륨을 다양한 스토리지 백엔드와 연동할 수 있게 해주는 플러그인입니다.\r\n\r\n**기본 드라이버:**\r\n- `local`: 로컬 파일 시스템 (기본값)\r\n\r\n**주요 서드파티 드라이버:**\r\n- `nfs`: NFS 스토리지\r\n- `azure-file`: Azure File Storage\r\n- `cloudstor`: AWS EBS, EFS\r\n- `convoy`: 분산 스토리지\r\n\r\n**NFS 볼륨 예시:**\r\n```bash\r\ndocker volume create \\\r\n  --driver local \\\r\n  --opt type=nfs \\\r\n  --opt o=addr=192.168.1.1,rw \\\r\n  --opt device=:/path/to/dir \\\r\n  nfs-volume\r\n```\r\n\r\n**플러그인 설치 및 사용:**\r\n```bash\r\n# 플러그인 설치\r\ndocker plugin install vieux/sshfs\r\n\r\n# 볼륨 생성\r\ndocker volume create -d vieux/sshfs \\\r\n  -o sshcmd=user@host:/path \\\r\n  -o password=secret \\\r\n  sshvolume\r\n```\r\n\r\n**Docker Compose:**\r\n```yaml\r\nvolumes:\r\n  nfs-data:\r\n    driver: local\r\n    driver_opts:\r\n      type: nfs\r\n      o: addr=192.168.1.1,rw\r\n      device: \":/exported/path\"\r\n```",
    "references": [
      {
        "title": "Volume plugins",
        "url": "https://docs.docker.com/engine/extend/plugins_volume/"
      }
    ]
  },
  {
    "id": "DOCKER-045",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker에서 읽기 전용 볼륨 마운트의 사용 시나리오와 설정 방법을 설명해 주세요.",
    "answer": "**설정 방법:**\r\n```bash\r\n# -v 옵션\r\ndocker run -v mydata:/app/data:ro nginx\r\ndocker run -v /host/config:/etc/app:ro nginx\r\n\r\n# --mount 옵션\r\ndocker run --mount type=volume,src=mydata,dst=/app/data,readonly nginx\r\n```\r\n\r\n**Docker Compose:**\r\n```yaml\r\nservices:\r\n  app:\r\n    volumes:\r\n      - ./config:/app/config:ro\r\n      - data:/app/data:ro\r\n```\r\n\r\n**사용 시나리오:**\r\n\r\n1. **설정 파일 주입**\r\n   ```bash\r\n   docker run -v ./nginx.conf:/etc/nginx/nginx.conf:ro nginx\r\n   ```\r\n\r\n2. **인증서/키 파일**\r\n   ```bash\r\n   docker run -v ./certs:/etc/ssl/certs:ro myapp\r\n   ```\r\n\r\n3. **공유 데이터 보호**\r\n   - 여러 컨테이너가 같은 데이터 참조 시 변경 방지\r\n\r\n4. **보안 강화**\r\n   - 컨테이너 탈취 시 데이터 변조 방지\r\n\r\n5. **불변 인프라**\r\n   - 컨테이너가 외부 데이터를 수정하지 못하게 보장",
    "references": [
      {
        "title": "Use volumes",
        "url": "https://docs.docker.com/storage/volumes/#use-a-read-only-volume"
      }
    ]
  },
  {
    "id": "DOCKER-046",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker Compose란 무엇이며, 단일 docker run 명령어 대비 장점을 설명해 주세요.",
    "answer": "**Docker Compose:**\r\nYAML 파일로 멀티 컨테이너 Docker 애플리케이션을 정의하고 실행하는 도구입니다.\r\n\r\n**장점:**\r\n\r\n1. **선언적 설정**\r\n   - 인프라를 코드로 관리 (IaC)\r\n   - 버전 관리 가능\r\n\r\n2. **일관된 환경**\r\n   - 개발, 테스트, 운영 환경 동일\r\n\r\n3. **간편한 명령어**\r\n   ```bash\r\n   docker-compose up -d    # 전체 시작\r\n   docker-compose down     # 전체 종료\r\n   docker-compose logs -f  # 로그 확인\r\n   ```\r\n\r\n4. **서비스 간 의존성 관리**\r\n   ```yaml\r\n   services:\r\n     web:\r\n       depends_on:\r\n         - db\r\n   ```\r\n\r\n5. **네트워크 자동 구성**\r\n   - 기본 네트워크 생성\r\n   - 서비스명으로 DNS 해석\r\n\r\n6. **환경 변수 관리**\r\n   - `.env` 파일 지원\r\n\r\n**docker run vs compose:**\r\n```bash\r\n# docker run (복잡)\r\ndocker run -d --name web -p 80:80 --network mynet -e DB_HOST=db nginx\r\n\r\n# docker-compose.yml (명확)\r\nservices:\r\n  web:\r\n    image: nginx\r\n    ports: [\"80:80\"]\r\n    environment:\r\n      DB_HOST: db\r\n```",
    "references": [
      {
        "title": "Docker Compose overview",
        "url": "https://docs.docker.com/compose/"
      }
    ]
  },
  {
    "id": "DOCKER-047",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "docker-compose.yml 파일의 주요 구성 요소(version, services, networks, volumes)를 설명해 주세요.",
    "answer": "```yaml\r\n# version: Compose 파일 버전 (최신 Compose에서는 선택사항)\r\nversion: \"3.9\"\r\n\r\n# services: 컨테이너 정의\r\nservices:\r\n  web:\r\n    image: nginx:alpine\r\n    build: ./web\r\n    ports:\r\n      - \"80:80\"\r\n    environment:\r\n      - NODE_ENV=production\r\n    depends_on:\r\n      - db\r\n    networks:\r\n      - frontend\r\n    volumes:\r\n      - ./html:/usr/share/nginx/html\r\n\r\n  db:\r\n    image: postgres:15\r\n    environment:\r\n      POSTGRES_PASSWORD: secret\r\n    networks:\r\n      - backend\r\n    volumes:\r\n      - db-data:/var/lib/postgresql/data\r\n\r\n# networks: 사용자 정의 네트워크\r\nnetworks:\r\n  frontend:\r\n    driver: bridge\r\n  backend:\r\n    driver: bridge\r\n    internal: true  # 외부 접근 차단\r\n\r\n# volumes: Named 볼륨 정의\r\nvolumes:\r\n  db-data:\r\n    driver: local\r\n```\r\n\r\n**주요 구성 요소:**\r\n- **services**: 애플리케이션을 구성하는 컨테이너들\r\n- **networks**: 서비스 간 통신을 위한 네트워크\r\n- **volumes**: 데이터 영속화를 위한 볼륨\r\n- **configs/secrets**: 설정 및 민감 정보 (Swarm)",
    "references": [
      {
        "title": "Compose file reference",
        "url": "https://docs.docker.com/compose/compose-file/"
      }
    ]
  },
  {
    "id": "DOCKER-048",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker Compose에서 서비스 간 의존성(depends_on)을 설정하는 방법과 한계점을 설명해 주세요.",
    "answer": "**기본 설정:**\r\n```yaml\r\nservices:\r\n  web:\r\n    depends_on:\r\n      - db\r\n      - redis\r\n  db:\r\n    image: postgres\r\n  redis:\r\n    image: redis\r\n```\r\n\r\n**조건부 의존성 (v2.1+):**\r\n```yaml\r\nservices:\r\n  web:\r\n    depends_on:\r\n      db:\r\n        condition: service_healthy\r\n      redis:\r\n        condition: service_started\r\n\r\n  db:\r\n    image: postgres\r\n    healthcheck:\r\n      test: [\"CMD-SHELL\", \"pg_isready\"]\r\n      interval: 10s\r\n      timeout: 5s\r\n      retries: 5\r\n```\r\n\r\n**조건 옵션:**\r\n- `service_started`: 컨테이너 시작됨 (기본)\r\n- `service_healthy`: healthcheck 통과\r\n- `service_completed_successfully`: 성공적으로 종료\r\n\r\n**한계점 (함정 질문 - 매우 중요):**\r\n\r\n1. **시작 순서만 보장, \"준비\" 상태는 보장 안 함**\r\n   - `depends_on` 기본값은 컨테이너 \"시작\"만 기다림\r\n   - DB 컨테이너 시작 ≠ DB가 연결 받을 준비 완료\r\n   - 이것이 가장 흔한 Docker Compose 관련 문제\r\n\r\n2. **해결 방법 (우선순위 순):**\r\n   - `condition: service_healthy` + healthcheck 조합 (가장 권장)\r\n   - 애플리케이션 레벨에서 연결 재시도 로직 구현 (탄력성 확보)\r\n   - wait-for-it.sh, dockerize 같은 헬퍼 스크립트 (임시 해결책)\r\n\r\n3. **실무 Best Practice:**\r\n   - 애플리케이션은 항상 의존 서비스 장애에 대비해야 함\r\n   - depends_on만으로는 충분하지 않음을 인지\r\n\r\n```yaml\r\ncommand: [\"./wait-for-it.sh\", \"db:5432\", \"--\", \"npm\", \"start\"]\r\n```",
    "references": [
      {
        "title": "depends_on",
        "url": "https://docs.docker.com/compose/compose-file/05-services/#depends_on"
      }
    ]
  },
  {
    "id": "DOCKER-049",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker Compose에서 환경 변수를 관리하는 방법(.env 파일, environment, env_file)을 설명해 주세요.",
    "answer": "**1. environment (인라인):**\r\n```yaml\r\nservices:\r\n  web:\r\n    environment:\r\n      - NODE_ENV=production\r\n      - DB_HOST=db\r\n      # 또는 맵 형식\r\n      NODE_ENV: production\r\n      DB_HOST: db\r\n```\r\n\r\n**2. env_file (외부 파일):**\r\n```yaml\r\nservices:\r\n  web:\r\n    env_file:\r\n      - .env\r\n      - .env.local\r\n```\r\n\r\n```\r\n# .env\r\nNODE_ENV=production\r\nDB_PASSWORD=secret\r\n```\r\n\r\n**3. .env (Compose 변수 치환):**\r\n```\r\n# .env (docker-compose.yml과 같은 디렉토리)\r\nTAG=1.0\r\nPORT=8080\r\n```\r\n\r\n```yaml\r\nservices:\r\n  web:\r\n    image: myapp:${TAG}\r\n    ports:\r\n      - \"${PORT}:80\"\r\n```\r\n\r\n**우선순위 (높음 → 낮음):**\r\n1. `docker-compose run -e`로 전달\r\n2. 셸 환경 변수\r\n3. `.env` 파일\r\n4. `env_file` 지정 파일\r\n5. Dockerfile의 ENV\r\n\r\n**보안 팁:**\r\n- `.env`는 `.gitignore`에 추가\r\n- 민감 정보는 Docker secrets 사용 고려",
    "references": [
      {
        "title": "Environment variables",
        "url": "https://docs.docker.com/compose/environment-variables/"
      }
    ]
  },
  {
    "id": "DOCKER-050",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker Compose에서 서비스를 스케일링하는 방법과 주의점을 설명해 주세요.",
    "answer": "**스케일링 방법:**\r\n\r\n```bash\r\n# 명령어로 스케일링\r\ndocker-compose up -d --scale web=3\r\n\r\n# 또는\r\ndocker-compose scale web=3  # deprecated\r\n```\r\n\r\n**Compose 파일에서 정의:**\r\n```yaml\r\nservices:\r\n  web:\r\n    image: nginx\r\n    deploy:\r\n      replicas: 3  # Swarm 모드 또는 compose v3\r\n```\r\n\r\n**주의점:**\r\n\r\n1. **포트 충돌**\r\n   ```yaml\r\n   # Bad - 모두 같은 포트 사용 시도\r\n   ports:\r\n     - \"80:80\"\r\n\r\n   # Good - 호스트 포트 자동 할당\r\n   ports:\r\n     - \"80\"\r\n   ```\r\n\r\n2. **컨테이너 이름 중복**\r\n   - 자동으로 `_1`, `_2` 등 접미사 추가\r\n\r\n3. **볼륨 공유**\r\n   - 모든 인스턴스가 같은 볼륨 사용 시 충돌 가능\r\n\r\n4. **로드 밸런싱**\r\n   - Compose 자체는 로드 밸런서 미제공\r\n   - 별도 nginx, traefik 등 필요\r\n\r\n**로드 밸런서 예시:**\r\n```yaml\r\nservices:\r\n  nginx:\r\n    image: nginx\r\n    ports:\r\n      - \"80:80\"\r\n    depends_on:\r\n      - web\r\n  web:\r\n    image: myapp\r\n    # 포트 노출하지 않음, nginx에서 접근\r\n```",
    "references": [
      {
        "title": "docker-compose up",
        "url": "https://docs.docker.com/reference/cli/docker/compose/up/"
      }
    ]
  },
  {
    "id": "DOCKER-051",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker Compose의 네트워크 구성과 서비스 간 통신 방식을 설명해 주세요.",
    "answer": "**기본 동작:**\r\n- Compose가 프로젝트별 기본 네트워크 자동 생성\r\n- 네트워크 이름: `{프로젝트명}_default`\r\n- 모든 서비스가 이 네트워크에 연결\r\n\r\n**서비스 간 통신:**\r\n```yaml\r\nservices:\r\n  web:\r\n    image: nginx\r\n  db:\r\n    image: postgres\r\n```\r\n\r\n```bash\r\n# web 컨테이너에서 db로 접근\r\nping db\r\npsql -h db -U postgres\r\n```\r\n\r\n**사용자 정의 네트워크:**\r\n```yaml\r\nservices:\r\n  frontend:\r\n    networks:\r\n      - front-tier\r\n  backend:\r\n    networks:\r\n      - front-tier\r\n      - back-tier\r\n  db:\r\n    networks:\r\n      - back-tier\r\n\r\nnetworks:\r\n  front-tier:\r\n  back-tier:\r\n    internal: true  # 외부 접근 차단\r\n```\r\n\r\n**네트워크 별칭:**\r\n```yaml\r\nservices:\r\n  db:\r\n    networks:\r\n      default:\r\n        aliases:\r\n          - database\r\n          - postgres\r\n```\r\n\r\n**외부 네트워크 사용:**\r\n```yaml\r\nnetworks:\r\n  existing-network:\r\n    external: true\r\n```",
    "references": [
      {
        "title": "Networking in Compose",
        "url": "https://docs.docker.com/compose/networking/"
      }
    ]
  },
  {
    "id": "DOCKER-052",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker Compose에서 여러 compose 파일을 오버라이드하여 사용하는 방법을 설명해 주세요.",
    "answer": "**기본 오버라이드:**\r\n```bash\r\n# 자동 병합 (docker-compose.yml + docker-compose.override.yml)\r\ndocker-compose up\r\n\r\n# 명시적 파일 지정\r\ndocker-compose -f docker-compose.yml -f docker-compose.prod.yml up\r\n```\r\n\r\n**파일 구조 예시:**\r\n\r\n```yaml\r\n# docker-compose.yml (기본)\r\nservices:\r\n  web:\r\n    image: myapp\r\n    ports:\r\n      - \"80\"\r\n\r\n# docker-compose.override.yml (개발용, 자동 적용)\r\nservices:\r\n  web:\r\n    build: .\r\n    volumes:\r\n      - ./src:/app/src\r\n    environment:\r\n      - DEBUG=true\r\n\r\n# docker-compose.prod.yml (프로덕션)\r\nservices:\r\n  web:\r\n    image: myapp:${TAG}\r\n    environment:\r\n      - DEBUG=false\r\n    deploy:\r\n      replicas: 3\r\n```\r\n\r\n**병합 규칙:**\r\n- 단일 값: 후순위 파일이 덮어씀\r\n- 리스트: 병합됨\r\n- 맵: 재귀적으로 병합\r\n\r\n**환경별 사용:**\r\n```bash\r\n# 개발\r\ndocker-compose up\r\n\r\n# 프로덕션\r\ndocker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d\r\n```",
    "references": [
      {
        "title": "Share Compose configurations",
        "url": "https://docs.docker.com/compose/multiple-compose-files/"
      }
    ]
  },
  {
    "id": "DOCKER-053",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker Compose의 healthcheck 설정과 서비스 시작 순서 제어 방법을 설명해 주세요.",
    "answer": "**healthcheck 설정:**\r\n```yaml\r\nservices:\r\n  db:\r\n    image: postgres:15\r\n    healthcheck:\r\n      test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]\r\n      interval: 10s      # 체크 간격\r\n      timeout: 5s        # 타임아웃\r\n      retries: 5         # 재시도 횟수\r\n      start_period: 30s  # 초기 유예 시간\r\n```\r\n\r\n**서비스 시작 순서 제어:**\r\n```yaml\r\nservices:\r\n  web:\r\n    build: .\r\n    depends_on:\r\n      db:\r\n        condition: service_healthy\r\n      redis:\r\n        condition: service_started\r\n\r\n  db:\r\n    image: postgres:15\r\n    healthcheck:\r\n      test: [\"CMD-SHELL\", \"pg_isready\"]\r\n      interval: 5s\r\n      timeout: 5s\r\n      retries: 5\r\n\r\n  redis:\r\n    image: redis:7\r\n    healthcheck:\r\n      test: [\"CMD\", \"redis-cli\", \"ping\"]\r\n      interval: 5s\r\n      timeout: 3s\r\n      retries: 3\r\n```\r\n\r\n**일반적인 healthcheck 예시:**\r\n```yaml\r\n# HTTP 엔드포인트\r\ntest: [\"CMD\", \"curl\", \"-f\", \"http://localhost:8080/health\"]\r\n\r\n# MySQL\r\ntest: [\"CMD\", \"mysqladmin\", \"ping\", \"-h\", \"localhost\"]\r\n\r\n# MongoDB\r\ntest: [\"CMD\", \"mongosh\", \"--eval\", \"db.adminCommand('ping')\"]\r\n```",
    "references": [
      {
        "title": "healthcheck",
        "url": "https://docs.docker.com/compose/compose-file/05-services/#healthcheck"
      }
    ]
  },
  {
    "id": "DOCKER-054",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker Compose에서 서비스 간 볼륨을 공유하는 방법과 volumes_from의 대안을 설명해 주세요.",
    "answer": "**Named 볼륨 공유 (권장):**\r\n```yaml\r\nservices:\r\n  app:\r\n    volumes:\r\n      - shared-data:/app/data\r\n\r\n  worker:\r\n    volumes:\r\n      - shared-data:/worker/data\r\n\r\nvolumes:\r\n  shared-data:\r\n```\r\n\r\n**바인드 마운트 공유:**\r\n```yaml\r\nservices:\r\n  app:\r\n    volumes:\r\n      - ./shared:/app/shared\r\n\r\n  worker:\r\n    volumes:\r\n      - ./shared:/worker/shared\r\n```\r\n\r\n**volumes_from 대안:**\r\n\r\n`volumes_from`은 v3에서 제거되었습니다. 대안:\r\n\r\n```yaml\r\n# v2 (deprecated)\r\nservices:\r\n  web:\r\n    volumes_from:\r\n      - data-container\r\n\r\n# v3+ 대안 - Named 볼륨 사용\r\nservices:\r\n  web:\r\n    volumes:\r\n      - app-data:/var/www\r\n\r\n  data-container:\r\n    volumes:\r\n      - app-data:/var/www\r\n\r\nvolumes:\r\n  app-data:\r\n```\r\n\r\n**볼륨 드라이버 옵션:**\r\n```yaml\r\nvolumes:\r\n  shared-data:\r\n    driver: local\r\n    driver_opts:\r\n      type: none\r\n      o: bind\r\n      device: /host/path\r\n```",
    "references": [
      {
        "title": "Volumes in Compose",
        "url": "https://docs.docker.com/compose/compose-file/07-volumes/"
      }
    ]
  },
  {
    "id": "DOCKER-055",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너의 보안 위험 요소와 이를 완화하는 방법을 설명해 주세요.",
    "answer": "**주요 보안 위험 (함정 질문 - 컨테이너 보안의 오해):**\r\n\r\n| 위험 | 완화 방법 |\r\n|------|-----------|\r\n| root 권한 실행 | non-root 사용자 사용, User Namespace |\r\n| 취약한 이미지 | 이미지 스캐닝, 신뢰할 수 있는 베이스 이미지, 정기 업데이트 |\r\n| 과도한 권한 | capabilities 제한 (--cap-drop ALL 후 필요한 것만 추가) |\r\n| 민감 정보 노출 | Docker secrets, 외부 시크릿 관리 도구 (환경변수 사용 주의) |\r\n| 컨테이너 탈출 | 커널 업데이트, seccomp/AppArmor/SELinux, gVisor/Kata Containers |\r\n| Docker 소켓 노출 | /var/run/docker.sock 마운트 금지 (마운트 시 호스트 root 획득 가능) |\r\n\r\n**자주 오해하는 점:**\r\n- 컨테이너 != 가상 머신: 컨테이너 격리는 VM보다 약함\r\n- root in container = 잠재적 위험: User Namespace 없이 컨테이너 root는 호스트 root와 동일한 UID\r\n- `--privileged` 플래그는 모든 보안 장치 해제 - 프로덕션에서 절대 사용 금지\r\n\r\n**완화 방법:**\r\n\r\n1. **non-root 실행:**\r\n```dockerfile\r\nUSER 1000:1000\r\n```\r\n\r\n2. **읽기 전용 파일시스템:**\r\n```bash\r\ndocker run --read-only myapp\r\n```\r\n\r\n3. **capabilities 제한:**\r\n```bash\r\ndocker run --cap-drop ALL --cap-add NET_BIND_SERVICE myapp\r\n```\r\n\r\n4. **리소스 제한:**\r\n```bash\r\ndocker run --memory=512m --cpus=1 myapp\r\n```\r\n\r\n5. **이미지 스캐닝:**\r\n```bash\r\ndocker scout cves myimage\r\ntrivy image myimage\r\n```\r\n\r\n6. **네트워크 분리:**\r\n```bash\r\ndocker network create --internal backend\r\n```",
    "references": [
      {
        "title": "Docker security",
        "url": "https://docs.docker.com/engine/security/"
      }
    ]
  },
  {
    "id": "DOCKER-056",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker에서 루트리스(rootless) 모드란 무엇이며, 어떤 보안상의 이점이 있나요?",
    "answer": "**Rootless 모드:**\r\nDocker 데몬과 컨테이너를 root 권한 없이 일반 사용자로 실행하는 모드입니다.\r\n\r\n**설치 및 실행:**\r\n```bash\r\n# 설치\r\ndockerd-rootless-setuptool.sh install\r\n\r\n# 실행\r\nsystemctl --user start docker\r\nexport DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock\r\n```\r\n\r\n**보안 이점:**\r\n\r\n1. **데몬 탈취 방지**\r\n   - 데몬 취약점 악용 시에도 root 권한 획득 불가\r\n\r\n2. **컨테이너 탈출 완화**\r\n   - 호스트에서도 일반 사용자 권한만 가짐\r\n\r\n3. **User Namespace 활용**\r\n   - 컨테이너 내 root = 호스트 일반 사용자\r\n\r\n4. **다중 사용자 환경**\r\n   - 각 사용자가 독립된 Docker 인스턴스 운영\r\n\r\n**제한사항 (트레이드오프):**\r\n- cgroups v2 필요 (cgroups v1 환경에서는 추가 설정 필요)\r\n- 일부 네트워크 기능 제한 (ping 등 raw socket 사용 기능)\r\n- 1024 미만 포트 바인딩 제한 (slirp4netns 사용으로 우회 가능)\r\n- overlay2 스토리지 드라이버 제한 (fuse-overlayfs 사용)\r\n- AppArmor/SELinux 프로필 적용 방식 다름\r\n- Docker Swarm 모드 미지원\r\n\r\n**언제 사용해야 하나:**\r\n- 공유 시스템에서 각 사용자가 독립적으로 Docker 사용 시\r\n- 보안이 최우선인 환경\r\n- CI/CD 러너에서 Docker-in-Docker 대안으로\r\n\r\n**vs 일반 모드:**\r\n| 구분 | 일반 모드 | Rootless |\r\n|------|-----------|----------|\r\n| 데몬 권한 | root | 사용자 |\r\n| 보안 | 낮음 | 높음 |\r\n| 기능 | 완전 | 일부 제한 |",
    "references": [
      {
        "title": "Rootless mode",
        "url": "https://docs.docker.com/engine/security/rootless/"
      }
    ]
  },
  {
    "id": "DOCKER-057",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너를 non-root 사용자로 실행해야 하는 이유와 설정 방법을 설명해 주세요.",
    "answer": "**이유:**\r\n\r\n1. **최소 권한 원칙**\r\n   - 필요한 최소한의 권한만 부여\r\n   - 공격 표면 감소\r\n\r\n2. **컨테이너 탈출 시 피해 최소화**\r\n   - 취약점으로 탈출해도 일반 사용자 권한만 가짐\r\n   - 호스트 시스템 보호\r\n\r\n3. **파일 권한 보호**\r\n   - 마운트된 볼륨의 파일 변조 방지\r\n   - 호스트 파일 시스템 보호\r\n\r\n4. **규정 준수**\r\n   - PCI-DSS, SOC2 등 보안 정책 요구사항\r\n\r\n**구현 방법:**\r\n\r\n```dockerfile\r\nFROM node:18-alpine\r\n\r\n# 사용자 생성\r\nRUN addgroup -S appgroup && adduser -S appuser -G appgroup\r\n\r\nWORKDIR /app\r\nCOPY --chown=appuser:appgroup . .\r\n\r\n# 사용자 전환\r\nUSER appuser\r\n\r\nCMD [\"node\", \"app.js\"]\r\n```\r\n\r\n**실행 시 지정:**\r\n```bash\r\ndocker run --user 1000:1000 myapp\r\ndocker run --user nobody myapp\r\n```\r\n\r\n**주의점:**\r\n- 일부 작업은 root 필요 (패키지 설치 등)\r\n- 빌드 시 root로 작업, 런타임에 non-root\r\n- 포트 1024 미만 바인딩 시 capabilities 설정 필요",
    "references": [
      {
        "title": "USER instruction",
        "url": "https://docs.docker.com/reference/dockerfile/#user"
      }
    ]
  },
  {
    "id": "DOCKER-058",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker secrets를 사용하여 민감한 정보를 관리하는 방법을 설명해 주세요.",
    "answer": "**Docker Secrets (Swarm):**\r\n```bash\r\n# Secret 생성\r\necho \"my_password\" | docker secret create db_password -\r\ndocker secret create ssl_cert ./server.crt\r\n\r\n# Secret 목록\r\ndocker secret ls\r\n\r\n# 서비스에서 사용\r\ndocker service create \\\r\n  --name web \\\r\n  --secret db_password \\\r\n  myapp\r\n```\r\n\r\n**컨테이너 내 접근:**\r\n```bash\r\n# /run/secrets/에 파일로 마운트됨\r\ncat /run/secrets/db_password\r\n```\r\n\r\n**Docker Compose (개발용):**\r\n```yaml\r\nservices:\r\n  db:\r\n    image: postgres\r\n    secrets:\r\n      - db_password\r\n    environment:\r\n      POSTGRES_PASSWORD_FILE: /run/secrets/db_password\r\n\r\nsecrets:\r\n  db_password:\r\n    file: ./secrets/db_password.txt\r\n```\r\n\r\n**환경 변수 vs Secrets (중요한 보안 트레이드오프):**\r\n| 구분 | 환경 변수 | Secrets |\r\n|------|-----------|---------|\r\n| 저장 | 프로세스 환경 (메모리) | tmpfs 파일 (메모리) |\r\n| 암호화 | X | O (Swarm에서 전송/저장 시 암호화) |\r\n| 노출 위험 | `docker inspect`, `/proc/PID/environ`로 노출 | 권한 있는 컨테이너만 접근 |\r\n| 로그 노출 | 애플리케이션 로그에 실수로 출력되기 쉬움 | 파일이라 로그 출력 위험 낮음 |\r\n| 용도 | 일반 설정 | 비밀번호, API 키, 인증서 |\r\n\r\n**Best Practice:**\r\n- `_FILE` 접미사 패턴 사용 (예: `POSTGRES_PASSWORD_FILE`)\r\n- 환경 변수에 직접 비밀번호 넣지 않기\r\n- Compose의 secrets는 파일 기반이라 Swarm처럼 암호화되지 않음에 주의\r\n- 프로덕션에서는 HashiCorp Vault, AWS Secrets Manager 등 외부 시크릿 관리 도구 권장",
    "references": [
      {
        "title": "Manage sensitive data",
        "url": "https://docs.docker.com/engine/swarm/secrets/"
      }
    ]
  },
  {
    "id": "DOCKER-059",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이미지 취약점 스캐닝의 중요성과 사용 가능한 도구들을 설명해 주세요.",
    "answer": "**중요성:**\r\n- 알려진 CVE 취약점 조기 발견\r\n- 공급망 보안 강화\r\n- 규정 준수 (PCI-DSS, HIPAA 등)\r\n- 프로덕션 배포 전 보안 검증\r\n\r\n**주요 스캐닝 도구:**\r\n\r\n| 도구 | 특징 |\r\n|------|------|\r\n| **Docker Scout** | Docker 공식, Docker Hub 통합 |\r\n| **Trivy** | 오픈소스, 빠름, 포괄적 |\r\n| **Snyk** | 개발자 친화적, CI/CD 통합 |\r\n| **Clair** | 오픈소스, 레지스트리 통합 |\r\n| **Anchore** | 정책 기반 스캐닝 |\r\n\r\n**사용 예시:**\r\n```bash\r\n# Docker Scout\r\ndocker scout cves myimage:tag\r\ndocker scout quickview myimage:tag\r\n\r\n# Trivy\r\ntrivy image myimage:tag\r\ntrivy image --severity HIGH,CRITICAL myimage:tag\r\n\r\n# Snyk\r\nsnyk container test myimage:tag\r\n```\r\n\r\n**CI/CD 통합 (GitHub Actions):**\r\n```yaml\r\n- name: Scan image\r\n  uses: aquasecurity/trivy-action@master\r\n  with:\r\n    image-ref: myimage:${{ github.sha }}\r\n    severity: 'CRITICAL,HIGH'\r\n    exit-code: '1'\r\n```",
    "references": [
      {
        "title": "Docker Scout",
        "url": "https://docs.docker.com/scout/"
      }
    ]
  },
  {
    "id": "DOCKER-060",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너 보안을 위한 seccomp, AppArmor, SELinux 프로필의 역할과 설정 방법을 설명해 주세요.",
    "answer": "**seccomp (Secure Computing Mode):**\r\n- 시스템 콜 필터링\r\n- 컨테이너가 사용할 수 있는 syscall 제한\r\n\r\n```bash\r\n# 기본 프로필 사용 (기본값)\r\ndocker run --security-opt seccomp=default.json myapp\r\n\r\n# 커스텀 프로필\r\ndocker run --security-opt seccomp=custom.json myapp\r\n\r\n# 비활성화 (비권장)\r\ndocker run --security-opt seccomp=unconfined myapp\r\n```\r\n\r\n**AppArmor:**\r\n- MAC (Mandatory Access Control)\r\n- 파일, 네트워크, 프로세스 접근 제어\r\n- Ubuntu/Debian 기본\r\n\r\n```bash\r\n# 프로필 적용\r\ndocker run --security-opt apparmor=docker-default myapp\r\n\r\n# 커스텀 프로필\r\ndocker run --security-opt apparmor=my-profile myapp\r\n```\r\n\r\n**SELinux:**\r\n- MAC 시스템\r\n- RHEL/CentOS/Fedora 기본\r\n\r\n```bash\r\n# 라벨 지정\r\ndocker run --security-opt label=level:s0:c100,c200 myapp\r\n\r\n# SELinux 비활성화\r\ndocker run --security-opt label=disable myapp\r\n```\r\n\r\n**비교 및 트레이드오프:**\r\n| 구분 | seccomp | AppArmor | SELinux |\r\n|------|---------|----------|---------|\r\n| 대상 | syscall 필터링 | 파일/네트워크/capability | 전체 시스템 리소스 |\r\n| 복잡도 | 중간 | 낮음 | 높음 |\r\n| 배포판 | 전체 (커널 3.17+) | Ubuntu/Debian | RHEL/CentOS/Fedora |\r\n| 디버깅 | 어려움 (syscall 추적 필요) | 로그 기반 | audit 로그 기반 |\r\n| 성능 영향 | 매우 낮음 | 낮음 | 낮음~중간 |\r\n\r\n**실무 권장사항:**\r\n- Docker 기본 seccomp 프로필은 300개 이상의 위험한 syscall 차단 - 대부분의 경우 기본값 유지\r\n- 커스텀 프로필 필요 시: 먼저 기본 프로필로 테스트 후 필요한 syscall만 추가\r\n- `--security-opt seccomp=unconfined`는 디버깅 시에만, 프로덕션에서는 절대 사용 금지",
    "references": [
      {
        "title": "Seccomp security profiles",
        "url": "https://docs.docker.com/engine/security/seccomp/"
      }
    ]
  },
  {
    "id": "DOCKER-061",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Linux Capabilities란 무엇이며, Docker 컨테이너에서 이를 제한하는 방법과 이유를 설명해 주세요.",
    "answer": "**Linux Capabilities:**\r\nroot 권한을 세분화한 권한 단위입니다. 전체 root 권한 대신 필요한 capability만 부여할 수 있습니다.\r\n\r\n**제한하는 이유:**\r\n- 최소 권한 원칙 적용\r\n- 컨테이너 탈출 시 피해 최소화\r\n- 불필요한 시스템 접근 차단\r\n\r\n**기본 capabilities (Docker):**\r\n`CHOWN`, `DAC_OVERRIDE`, `FSETID`, `FOWNER`, `MKNOD`, `NET_RAW`, `SETGID`, `SETUID`, `SETFCAP`, `SETPCAP`, `NET_BIND_SERVICE`, `SYS_CHROOT`, `KILL`, `AUDIT_WRITE`\r\n\r\n**설정 방법:**\r\n```bash\r\n# 모든 capabilities 제거\r\ndocker run --cap-drop ALL myapp\r\n\r\n# 필요한 것만 추가\r\ndocker run --cap-drop ALL --cap-add NET_BIND_SERVICE myapp\r\n\r\n# 특정 capability 추가\r\ndocker run --cap-add SYS_PTRACE myapp\r\n```\r\n\r\n**주요 capabilities:**\r\n| Capability | 설명 |\r\n|------------|------|\r\n| `NET_BIND_SERVICE` | 1024 미만 포트 바인딩 |\r\n| `SYS_ADMIN` | 다양한 관리 작업 (위험) |\r\n| `NET_ADMIN` | 네트워크 설정 변경 |\r\n| `SYS_PTRACE` | 프로세스 디버깅 |\r\n\r\n**권장 설정:**\r\n```bash\r\ndocker run --cap-drop ALL \\\r\n  --cap-add CHOWN \\\r\n  --cap-add SETGID \\\r\n  --cap-add SETUID \\\r\n  myapp\r\n```",
    "references": [
      {
        "title": "Runtime privilege and capabilities",
        "url": "https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities"
      }
    ]
  },
  {
    "id": "DOCKER-062",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker에서 신뢰할 수 있는 베이스 이미지를 선택하고 관리하는 방법을 설명해 주세요.",
    "answer": "**신뢰할 수 있는 이미지 선택:**\r\n\r\n1. **공식 이미지 사용**\r\n```bash\r\n# Docker Official Images\r\ndocker pull nginx\r\ndocker pull node:18-alpine\r\n```\r\n\r\n2. **Verified Publisher 확인**\r\n   - Docker Hub에서 인증 마크 확인\r\n\r\n3. **이미지 다이제스트로 고정**\r\n```dockerfile\r\nFROM node:18-alpine@sha256:abc123...\r\n```\r\n\r\n**이미지 관리 방법:**\r\n\r\n1. **정기적인 업데이트**\r\n```bash\r\ndocker pull myimage:latest\r\n```\r\n\r\n2. **취약점 스캐닝**\r\n```bash\r\ndocker scout cves myimage\r\ntrivy image myimage\r\n```\r\n\r\n3. **베이스 이미지 추적**\r\n```yaml\r\n# Dependabot 설정 (.github/dependabot.yml)\r\nversion: 2\r\nupdates:\r\n  - package-ecosystem: docker\r\n    directory: \"/\"\r\n    schedule:\r\n      interval: weekly\r\n```\r\n\r\n4. **내부 레지스트리 미러링**\r\n   - 외부 이미지를 내부 레지스트리로 복제\r\n   - 버전 관리 및 스캔 후 사용\r\n\r\n5. **Golden Image 정책**\r\n   - 승인된 베이스 이미지 목록 관리\r\n   - CI에서 허용 이미지만 빌드 가능",
    "references": [
      {
        "title": "Docker Official Images",
        "url": "https://docs.docker.com/trusted-content/official-images/"
      }
    ]
  },
  {
    "id": "DOCKER-063",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너의 CPU 사용량을 제한하는 방법과 옵션들을 설명해 주세요.",
    "answer": "**CPU 제한 옵션:**\r\n\r\n| 옵션 | 설명 | 예시 |\r\n|------|------|------|\r\n| `--cpus` | 사용할 CPU 개수 | `--cpus=1.5` |\r\n| `--cpu-shares` | 상대적 가중치 (1024 기준) | `--cpu-shares=512` |\r\n| `--cpu-period` | CFS 주기 (마이크로초) | `--cpu-period=100000` |\r\n| `--cpu-quota` | CFS 할당량 (마이크로초) | `--cpu-quota=50000` |\r\n| `--cpuset-cpus` | 특정 CPU 코어 지정 | `--cpuset-cpus=0,1` |\r\n\r\n**사용 예시:**\r\n```bash\r\n# CPU 1.5개 사용 제한\r\ndocker run --cpus=1.5 myapp\r\n\r\n# 상대적 가중치 (경쟁 시에만 적용)\r\ndocker run --cpu-shares=512 myapp\r\n\r\n# 특정 코어만 사용\r\ndocker run --cpuset-cpus=\"0,2\" myapp\r\n\r\n# period/quota로 50% 제한\r\ndocker run --cpu-period=100000 --cpu-quota=50000 myapp\r\n```\r\n\r\n**Docker Compose:**\r\n```yaml\r\nservices:\r\n  app:\r\n    deploy:\r\n      resources:\r\n        limits:\r\n          cpus: '1.5'\r\n        reservations:\r\n          cpus: '0.5'\r\n```\r\n\r\n**--cpus vs --cpu-shares (중요한 개념 차이):**\r\n- `--cpus`: 절대적 제한 - 1.5면 최대 1.5 CPU만 사용 가능 (CFS quota 기반)\r\n- `--cpu-shares`: 상대적 가중치 - CPU 경쟁이 있을 때만 적용, 유휴 CPU는 더 사용 가능\r\n  - 예: 컨테이너 A(shares=1024), B(shares=512)가 경쟁 시 A는 2/3, B는 1/3 할당\r\n  - 다른 컨테이너가 없으면 B도 100% CPU 사용 가능\r\n\r\n**실무 선택 기준:**\r\n- 예측 가능한 성능이 필요하면 `--cpus` 사용\r\n- 리소스 효율성을 원하면 `--cpu-shares` 사용\r\n- 둘 다 조합 가능",
    "references": [
      {
        "title": "Runtime options with Memory, CPUs",
        "url": "https://docs.docker.com/config/containers/resource_constraints/"
      }
    ]
  },
  {
    "id": "DOCKER-064",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너의 메모리 사용량을 제한하는 방법과 OOM(Out of Memory) 처리 방식을 설명해 주세요.",
    "answer": "**메모리 제한 옵션:**\r\n\r\n| 옵션 | 설명 |\r\n|------|------|\r\n| `--memory (-m)` | 메모리 제한 |\r\n| `--memory-swap` | 메모리 + 스왑 합계 |\r\n| `--memory-reservation` | 소프트 제한 (보장 메모리) |\r\n| `--oom-kill-disable` | OOM Killer 비활성화 |\r\n| `--oom-score-adj` | OOM 우선순위 조정 |\r\n\r\n**사용 예시:**\r\n```bash\r\n# 512MB 메모리 제한\r\ndocker run --memory=512m myapp\r\n\r\n# 메모리 512MB, 스왑 1GB (총 1.5GB)\r\ndocker run --memory=512m --memory-swap=1536m myapp\r\n\r\n# 스왑 비활성화\r\ndocker run --memory=512m --memory-swap=512m myapp\r\n\r\n# 소프트 제한\r\ndocker run --memory=1g --memory-reservation=512m myapp\r\n```\r\n\r\n**OOM 처리:**\r\n```bash\r\n# OOM Killer 비활성화 (--memory와 함께 사용)\r\ndocker run --memory=512m --oom-kill-disable myapp\r\n\r\n# OOM 우선순위 조정 (-1000 ~ 1000)\r\ndocker run --oom-score-adj=500 myapp\r\n```\r\n\r\n**Docker Compose:**\r\n```yaml\r\nservices:\r\n  app:\r\n    deploy:\r\n      resources:\r\n        limits:\r\n          memory: 512M\r\n        reservations:\r\n          memory: 256M\r\n```\r\n\r\n**OOM 발생 시 동작 (함정 질문):**\r\n- 기본: OOM Killer가 컨테이너 내 프로세스 중 점수가 높은 것 종료\r\n- 종료 코드 137 (128 + SIGKILL 9)\r\n- `--oom-kill-disable`: 메모리 부족 시 프로세스가 대기 상태로 빠져 시스템 hang 가능 - **프로덕션에서 절대 권장하지 않음**\r\n- `--memory` 없이 `--oom-kill-disable` 사용 시 경고 발생\r\n\r\n**실무 권장사항:**\r\n- 메모리 제한은 애플리케이션 실제 사용량의 1.5~2배로 설정\r\n- JVM 같은 경우 힙 메모리(-Xmx)와 컨테이너 메모리 제한 조율 필요\r\n- `--memory-reservation`은 소프트 리밋으로, 시스템 메모리 압박 시에만 적용",
    "references": [
      {
        "title": "Memory constraints",
        "url": "https://docs.docker.com/config/containers/resource_constraints/#memory"
      }
    ]
  },
  {
    "id": "DOCKER-065",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Linux cgroups(Control Groups)란 무엇이며, Docker에서 컨테이너 리소스 제한에 어떻게 활용되나요?",
    "answer": "**cgroups (Control Groups):**\r\nLinux 커널 기능으로, 프로세스 그룹에 대한 리소스(CPU, 메모리, I/O 등) 사용량을 제한, 계정, 격리합니다.\r\n\r\n**cgroups 기능:**\r\n\r\n1. **리소스 제한 (Resource Limiting)**\r\n   - 그룹이 사용할 수 있는 리소스 상한 설정\r\n\r\n2. **우선순위 (Prioritization)**\r\n   - 리소스 경쟁 시 우선순위 설정\r\n\r\n3. **계정 (Accounting)**\r\n   - 리소스 사용량 측정 및 보고\r\n\r\n4. **제어 (Control)**\r\n   - 그룹 프로세스 동결, 재개, 체크포인트\r\n\r\n**Docker에서의 활용:**\r\n```bash\r\n# 각 컨테이너가 cgroup에 매핑\r\ndocker run --memory=512m --cpus=1.5 myapp\r\n\r\n# cgroup 확인\r\ncat /sys/fs/cgroup/docker/<container_id>/memory.max\r\n```\r\n\r\n**cgroups v1 vs v2:**\r\n| 구분 | v1 | v2 |\r\n|------|-----|-----|\r\n| 구조 | 계층별 분리 | 통합 계층 |\r\n| 관리 | 복잡 | 단순 |\r\n| 지원 | 레거시 | 현재 권장 |\r\n\r\n**Docker 리소스 매핑:**\r\n- `--memory` → `memory.max`\r\n- `--cpus` → `cpu.max`\r\n- `--pids-limit` → `pids.max`",
    "references": [
      {
        "title": "Configure cgroups",
        "url": "https://docs.docker.com/config/containers/resource_constraints/"
      }
    ]
  },
  {
    "id": "DOCKER-066",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너의 I/O 성능을 제한하는 방법을 설명해 주세요.",
    "answer": "**I/O 제한 옵션:**\r\n\r\n| 옵션 | 설명 |\r\n|------|------|\r\n| `--blkio-weight` | 상대적 I/O 가중치 (10-1000) |\r\n| `--device-read-bps` | 디바이스 읽기 속도 제한 |\r\n| `--device-write-bps` | 디바이스 쓰기 속도 제한 |\r\n| `--device-read-iops` | 초당 읽기 작업 수 제한 |\r\n| `--device-write-iops` | 초당 쓰기 작업 수 제한 |\r\n\r\n**사용 예시:**\r\n```bash\r\n# 상대적 I/O 가중치\r\ndocker run --blkio-weight=300 myapp\r\n\r\n# 읽기 속도 제한 (1MB/s)\r\ndocker run --device-read-bps /dev/sda:1mb myapp\r\n\r\n# 쓰기 속도 제한 (5MB/s)\r\ndocker run --device-write-bps /dev/sda:5mb myapp\r\n\r\n# IOPS 제한\r\ndocker run --device-read-iops /dev/sda:100 myapp\r\ndocker run --device-write-iops /dev/sda:100 myapp\r\n```\r\n\r\n**Docker Compose (제한적 지원):**\r\n```yaml\r\nservices:\r\n  app:\r\n    blkio_config:\r\n      weight: 300\r\n      device_read_bps:\r\n        - path: /dev/sda\r\n          rate: '1mb'\r\n```\r\n\r\n**주의사항 (함정 질문):**\r\n- 블록 디바이스 경로 필요 (볼륨 경로 아님)\r\n- **Direct I/O에만 적용** - 버퍼링된 I/O(일반적인 파일 작업)는 제한되지 않음\r\n  - 대부분의 애플리케이션은 버퍼 I/O 사용하므로 이 옵션이 효과 없을 수 있음\r\n  - O_DIRECT 플래그로 열린 파일에만 적용\r\n- cgroups v2에서는 `io.max`로 통합 관리\r\n- 실제 I/O 제한이 필요하면 cgroups v2 사용 권장\r\n\r\n**확인:**\r\n```bash\r\ndocker stats  # I/O 사용량 모니터링\r\n```",
    "references": [
      {
        "title": "Block IO constraints",
        "url": "https://docs.docker.com/config/containers/resource_constraints/#block-io-bandwidth-blkio-constraint"
      }
    ]
  },
  {
    "id": "DOCKER-067",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너의 PID 제한과 fork bomb 방지 방법을 설명해 주세요.",
    "answer": "**Fork Bomb이란:**\r\n무한히 프로세스를 생성하여 시스템 리소스를 고갈시키는 공격입니다.\r\n\r\n```bash\r\n# 예: :(){ :|:& };:\r\n```\r\n\r\n**PID 제한 설정:**\r\n```bash\r\n# 최대 100개 프로세스\r\ndocker run --pids-limit=100 myapp\r\n\r\n# 제한 없음 (기본값, 위험)\r\ndocker run --pids-limit=-1 myapp\r\n```\r\n\r\n**Docker Compose:**\r\n```yaml\r\nservices:\r\n  app:\r\n    deploy:\r\n      resources:\r\n        limits:\r\n          pids: 100\r\n```\r\n\r\n**데몬 수준 기본값 설정:**\r\n```json\r\n// /etc/docker/daemon.json\r\n{\r\n  \"default-pids-limit\": 100\r\n}\r\n```\r\n\r\n**확인:**\r\n```bash\r\n# 컨테이너 PID 확인\r\ndocker top <container>\r\n\r\n# 또는\r\ndocker exec <container> ps aux | wc -l\r\n```\r\n\r\n**권장사항:**\r\n- 프로덕션 환경에서 항상 설정\r\n- 애플리케이션 특성에 맞게 값 조정\r\n- 너무 낮으면 정상 동작 방해\r\n\r\n**다른 보호 수단:**\r\n- ulimit 설정: `docker run --ulimit nproc=100`\r\n- seccomp 프로필로 fork 제한",
    "references": [
      {
        "title": "Runtime options",
        "url": "https://docs.docker.com/engine/reference/run/#runtime-constraints-on-resources"
      }
    ]
  },
  {
    "id": "DOCKER-068",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 리소스 사용량을 실시간으로 모니터링하는 방법(docker stats)을 설명해 주세요.",
    "answer": "**docker stats 기본 사용:**\r\n```bash\r\n# 모든 실행 중인 컨테이너\r\ndocker stats\r\n\r\n# 특정 컨테이너\r\ndocker stats container1 container2\r\n\r\n# 한 번만 출력 (스크립트용)\r\ndocker stats --no-stream\r\n```\r\n\r\n**출력 정보:**\r\n| 항목 | 설명 |\r\n|------|------|\r\n| CPU % | CPU 사용률 |\r\n| MEM USAGE/LIMIT | 메모리 사용량/제한 |\r\n| MEM % | 메모리 사용률 |\r\n| NET I/O | 네트워크 입출력 |\r\n| BLOCK I/O | 디스크 입출력 |\r\n| PIDS | 프로세스 수 |\r\n\r\n**포맷 지정:**\r\n```bash\r\ndocker stats --format \"table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}\"\r\n\r\n# JSON 출력\r\ndocker stats --no-stream --format \"{{json .}}\"\r\n```\r\n\r\n**주요 포맷 키:**\r\n- `.Container`, `.Name`, `.ID`\r\n- `.CPUPerc`, `.MemUsage`, `.MemPerc`\r\n- `.NetIO`, `.BlockIO`, `.PIDs`\r\n\r\n**활용 예시:**\r\n```bash\r\n# 메모리 사용량 정렬\r\ndocker stats --no-stream --format \"{{.Name}}: {{.MemUsage}}\" | sort -k2 -h\r\n\r\n# 모니터링 스크립트\r\nwhile true; do\r\n  docker stats --no-stream\r\n  sleep 5\r\ndone\r\n```",
    "references": [
      {
        "title": "docker stats",
        "url": "https://docs.docker.com/reference/cli/docker/container/stats/"
      }
    ]
  },
  {
    "id": "DOCKER-069",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker의 로깅 드라이버 종류와 각각의 특징을 설명해 주세요.",
    "answer": "**주요 로깅 드라이버:**\r\n\r\n| 드라이버 | 설명 | 특징 |\r\n|----------|------|------|\r\n| **json-file** | JSON 파일 저장 (기본값) | docker logs 지원 |\r\n| **local** | 최적화된 로컬 저장 | 압축, 로테이션 지원 |\r\n| **syslog** | Syslog 서버 전송 | 중앙집중식 로깅 |\r\n| **journald** | systemd journal | systemd 통합 |\r\n| **fluentd** | Fluentd 전송 | 유연한 로그 라우팅 |\r\n| **awslogs** | AWS CloudWatch | AWS 통합 |\r\n| **gcplogs** | Google Cloud Logging | GCP 통합 |\r\n| **splunk** | Splunk 전송 | 엔터프라이즈 로깅 |\r\n| **none** | 로깅 비활성화 | 성능 최적화 |\r\n\r\n**설정 방법:**\r\n```bash\r\n# 컨테이너별 설정\r\ndocker run --log-driver=fluentd --log-opt fluentd-address=localhost:24224 myapp\r\n\r\n# 데몬 기본값 설정 (/etc/docker/daemon.json)\r\n{\r\n  \"log-driver\": \"json-file\",\r\n  \"log-opts\": {\r\n    \"max-size\": \"10m\",\r\n    \"max-file\": \"3\"\r\n  }\r\n}\r\n```\r\n\r\n**Docker Compose:**\r\n```yaml\r\nservices:\r\n  app:\r\n    logging:\r\n      driver: json-file\r\n      options:\r\n        max-size: \"10m\"\r\n        max-file: \"3\"\r\n```",
    "references": [
      {
        "title": "Configure logging drivers",
        "url": "https://docs.docker.com/config/containers/logging/configure/"
      }
    ]
  },
  {
    "id": "DOCKER-070",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너 로그를 확인하고 관리하는 방법(docker logs)을 설명해 주세요.",
    "answer": "**기본 사용:**\r\n```bash\r\n# 로그 출력\r\ndocker logs <container>\r\n\r\n# 실시간 추적\r\ndocker logs -f <container>\r\n\r\n# 마지막 N줄\r\ndocker logs --tail 100 <container>\r\n\r\n# 타임스탬프 포함\r\ndocker logs -t <container>\r\n\r\n# 특정 시간 이후\r\ndocker logs --since 2024-01-01T00:00:00 <container>\r\ndocker logs --since 10m <container>\r\n\r\n# 특정 시간까지\r\ndocker logs --until 2024-01-01T12:00:00 <container>\r\n```\r\n\r\n**옵션 조합:**\r\n```bash\r\n# 최근 100줄을 실시간으로 타임스탬프와 함께\r\ndocker logs -f --tail 100 -t <container>\r\n```\r\n\r\n**Docker Compose:**\r\n```bash\r\n# 모든 서비스 로그\r\ndocker-compose logs\r\n\r\n# 특정 서비스\r\ndocker-compose logs -f web\r\n\r\n# 여러 서비스\r\ndocker-compose logs web db\r\n```\r\n\r\n**로그 위치 (json-file 드라이버):**\r\n```bash\r\n/var/lib/docker/containers/<container_id>/<container_id>-json.log\r\n```\r\n\r\n**주의사항 (중요한 트레이드오프):**\r\n- 일부 로깅 드라이버(fluentd, awslogs, splunk 등)는 `docker logs` 미지원\r\n  - 이 경우 로그는 외부 시스템에서만 확인 가능\r\n  - 디버깅 시 불편 → `local` 또는 `json-file` + 외부 로그 수집기 조합 고려\r\n- 로그 크기 관리 필요 - 기본 json-file은 로테이션 없음 → 디스크 가득 참 문제\r\n- Docker 19.03+에서 `local` 드라이버 권장 (압축, 로테이션 기본 제공, docker logs 지원)",
    "references": [
      {
        "title": "docker logs",
        "url": "https://docs.docker.com/reference/cli/docker/container/logs/"
      }
    ]
  },
  {
    "id": "DOCKER-071",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 로그 로테이션을 설정하는 방법과 중요성을 설명해 주세요.",
    "answer": "**중요성:**\r\n- 디스크 공간 고갈 방지\r\n- 로그 파일 관리 용이\r\n- 시스템 안정성 유지\r\n- 성능 저하 방지 (대용량 로그 파일)\r\n\r\n**설정 방법:**\r\n\r\n**1. 컨테이너별 설정:**\r\n```bash\r\ndocker run \\\r\n  --log-driver json-file \\\r\n  --log-opt max-size=10m \\\r\n  --log-opt max-file=3 \\\r\n  myapp\r\n```\r\n\r\n**2. 데몬 기본값 설정:**\r\n```json\r\n// /etc/docker/daemon.json\r\n{\r\n  \"log-driver\": \"json-file\",\r\n  \"log-opts\": {\r\n    \"max-size\": \"10m\",\r\n    \"max-file\": \"5\",\r\n    \"compress\": \"true\"\r\n  }\r\n}\r\n```\r\n```bash\r\nsudo systemctl restart docker\r\n```\r\n\r\n**3. Docker Compose:**\r\n```yaml\r\nservices:\r\n  app:\r\n    logging:\r\n      driver: json-file\r\n      options:\r\n        max-size: \"10m\"\r\n        max-file: \"3\"\r\n```\r\n\r\n**옵션 설명:**\r\n| 옵션 | 설명 | 예시 |\r\n|------|------|------|\r\n| `max-size` | 로그 파일 최대 크기 | 10m, 1g |\r\n| `max-file` | 보관할 로그 파일 수 | 3, 5 |\r\n| `compress` | gzip 압축 | true |\r\n\r\n**local 드라이버 (권장):**\r\n```json\r\n{\r\n  \"log-driver\": \"local\",\r\n  \"log-opts\": {\r\n    \"max-size\": \"10m\"\r\n  }\r\n}\r\n```",
    "references": [
      {
        "title": "JSON File logging driver",
        "url": "https://docs.docker.com/config/containers/logging/json-file/"
      }
    ]
  },
  {
    "id": "DOCKER-072",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너의 메트릭을 수집하고 모니터링하는 방법을 설명해 주세요.",
    "answer": "**내장 도구:**\r\n```bash\r\n# docker stats\r\ndocker stats --format \"table {{.Name}}\\t{{.CPUPerc}}\\t{{.MemUsage}}\"\r\n```\r\n\r\n**Docker API:**\r\n```bash\r\n# 컨테이너 메트릭 API\r\ncurl --unix-socket /var/run/docker.sock \\\r\n  http://localhost/containers/<id>/stats\r\n```\r\n\r\n**cAdvisor:**\r\n```bash\r\ndocker run -d \\\r\n  --name=cadvisor \\\r\n  -p 8080:8080 \\\r\n  -v /:/rootfs:ro \\\r\n  -v /var/run:/var/run:ro \\\r\n  -v /sys:/sys:ro \\\r\n  -v /var/lib/docker:/var/lib/docker:ro \\\r\n  gcr.io/cadvisor/cadvisor\r\n```\r\n\r\n**Prometheus + Grafana 스택:**\r\n```yaml\r\n# docker-compose.yml\r\nservices:\r\n  prometheus:\r\n    image: prom/prometheus\r\n    volumes:\r\n      - ./prometheus.yml:/etc/prometheus/prometheus.yml\r\n    ports:\r\n      - \"9090:9090\"\r\n\r\n  grafana:\r\n    image: grafana/grafana\r\n    ports:\r\n      - \"3000:3000\"\r\n\r\n  cadvisor:\r\n    image: gcr.io/cadvisor/cadvisor\r\n    ports:\r\n      - \"8080:8080\"\r\n    volumes:\r\n      - /:/rootfs:ro\r\n      - /var/run:/var/run:ro\r\n      - /sys:/sys:ro\r\n      - /var/lib/docker:/var/lib/docker:ro\r\n```\r\n\r\n**수집 가능한 메트릭:**\r\n- CPU 사용량, 메모리 사용량\r\n- 네트워크 I/O, 디스크 I/O\r\n- 컨테이너 수, 프로세스 수",
    "references": [
      {
        "title": "Collect Docker metrics with Prometheus",
        "url": "https://docs.docker.com/config/daemon/prometheus/"
      }
    ]
  },
  {
    "id": "DOCKER-073",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이벤트를 모니터링하는 방법(docker events)과 활용 사례를 설명해 주세요.",
    "answer": "**기본 사용:**\r\n```bash\r\n# 실시간 이벤트 스트림\r\ndocker events\r\n\r\n# 특정 시간 이후\r\ndocker events --since '2024-01-01'\r\ndocker events --since '10m'\r\n\r\n# 특정 시간까지\r\ndocker events --until '2024-01-01T12:00:00'\r\n```\r\n\r\n**필터링:**\r\n```bash\r\n# 특정 컨테이너\r\ndocker events --filter container=myapp\r\n\r\n# 특정 이벤트 타입\r\ndocker events --filter event=start\r\ndocker events --filter event=die\r\n\r\n# 특정 이미지\r\ndocker events --filter image=nginx\r\n\r\n# 타입별\r\ndocker events --filter type=container\r\ndocker events --filter type=image\r\ndocker events --filter type=network\r\n```\r\n\r\n**포맷:**\r\n```bash\r\ndocker events --format '{{.Time}} {{.Type}} {{.Action}} {{.Actor.Attributes.name}}'\r\n\r\n# JSON\r\ndocker events --format '{{json .}}'\r\n```\r\n\r\n**주요 이벤트:**\r\n- **container**: create, start, stop, die, kill, pause, unpause\r\n- **image**: pull, push, delete, tag\r\n- **network**: create, connect, disconnect, destroy\r\n\r\n**활용 사례:**\r\n1. **자동 복구**: die 이벤트 감지 후 알림/재시작\r\n2. **감사 로그**: 컨테이너 생성/삭제 기록\r\n3. **모니터링 연동**: 이벤트 기반 알림\r\n4. **CI/CD**: 배포 상태 추적\r\n\r\n```bash\r\n# 컨테이너 종료 시 알림\r\ndocker events --filter event=die | while read event; do\r\n  echo \"Container died: $event\" | mail -s \"Alert\" admin@example.com\r\ndone\r\n```",
    "references": [
      {
        "title": "docker events",
        "url": "https://docs.docker.com/reference/cli/docker/system/events/"
      }
    ]
  },
  {
    "id": "DOCKER-074",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Prometheus와 Grafana를 사용하여 Docker 컨테이너를 모니터링하는 방법을 설명해 주세요.",
    "answer": "**아키텍처:**\r\n```\r\nDocker → cAdvisor → Prometheus → Grafana\r\n```\r\n\r\n**1. Docker 데몬 메트릭 활성화:**\r\n```json\r\n// /etc/docker/daemon.json\r\n{\r\n  \"metrics-addr\": \"0.0.0.0:9323\",\r\n  \"experimental\": true\r\n}\r\n```\r\n\r\n**2. docker-compose.yml:**\r\n```yaml\r\nservices:\r\n  prometheus:\r\n    image: prom/prometheus:latest\r\n    volumes:\r\n      - ./prometheus.yml:/etc/prometheus/prometheus.yml\r\n    ports:\r\n      - \"9090:9090\"\r\n\r\n  grafana:\r\n    image: grafana/grafana:latest\r\n    ports:\r\n      - \"3000:3000\"\r\n    environment:\r\n      - GF_SECURITY_ADMIN_PASSWORD=admin\r\n\r\n  cadvisor:\r\n    image: gcr.io/cadvisor/cadvisor:latest\r\n    volumes:\r\n      - /:/rootfs:ro\r\n      - /var/run:/var/run:ro\r\n      - /sys:/sys:ro\r\n      - /var/lib/docker:/var/lib/docker:ro\r\n    ports:\r\n      - \"8080:8080\"\r\n```\r\n\r\n**3. prometheus.yml:**\r\n```yaml\r\nglobal:\r\n  scrape_interval: 15s\r\n\r\nscrape_configs:\r\n  - job_name: 'cadvisor'\r\n    static_configs:\r\n      - targets: ['cadvisor:8080']\r\n\r\n  - job_name: 'docker'\r\n    static_configs:\r\n      - targets: ['host.docker.internal:9323']\r\n```\r\n\r\n**4. Grafana 설정:**\r\n- Data Source: Prometheus 추가\r\n- Dashboard: Docker 대시보드 임포트 (ID: 893, 11600)\r\n\r\n**주요 메트릭:**\r\n- `container_cpu_usage_seconds_total`\r\n- `container_memory_usage_bytes`\r\n- `container_network_receive_bytes_total`",
    "references": [
      {
        "title": "Docker metrics with Prometheus",
        "url": "https://docs.docker.com/config/daemon/prometheus/"
      }
    ]
  },
  {
    "id": "DOCKER-075",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너가 시작되지 않을 때 디버깅하는 방법을 설명해 주세요.",
    "answer": "**1. 로그 확인:**\r\n```bash\r\n# 컨테이너 로그 (종료된 컨테이너도 가능)\r\ndocker logs <container>\r\ndocker logs --tail 50 <container>\r\n```\r\n\r\n**2. 컨테이너 상태 확인:**\r\n```bash\r\ndocker ps -a  # 종료 코드 확인\r\ndocker inspect <container> | grep -A 10 \"State\"\r\n```\r\n\r\n**3. 종료 코드 분석:**\r\n| 코드 | 의미 |\r\n|------|------|\r\n| 0 | 정상 종료 |\r\n| 1 | 애플리케이션 오류 |\r\n| 137 | OOM Killer (128+9) |\r\n| 139 | 세그멘테이션 폴트 |\r\n| 143 | SIGTERM으로 종료 |\r\n\r\n**4. 인터랙티브 모드로 디버깅:**\r\n```bash\r\n# 셸로 진입하여 확인\r\ndocker run -it --entrypoint /bin/sh myimage\r\n\r\n# 명령어 변경하여 실행\r\ndocker run -it myimage /bin/sh\r\n```\r\n\r\n**5. 이미지 검사:**\r\n```bash\r\ndocker history myimage\r\ndocker inspect myimage\r\n```\r\n\r\n**6. 리소스 확인:**\r\n```bash\r\ndocker system df\r\ndf -h\r\nfree -m\r\n```\r\n\r\n**7. 이벤트 확인:**\r\n```bash\r\ndocker events --since '5m' --filter container=<container>\r\n```\r\n\r\n**일반적인 원인:**\r\n- 잘못된 CMD/ENTRYPOINT\r\n- 필요한 파일/환경 변수 누락\r\n- 포트 충돌\r\n- 리소스 부족\r\n- 권한 문제",
    "references": [
      {
        "title": "Docker troubleshoot",
        "url": "https://docs.docker.com/config/daemon/troubleshoot/"
      }
    ]
  },
  {
    "id": "DOCKER-076",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "실행 중인 Docker 컨테이너에 접속하여 디버깅하는 방법(docker exec)을 설명해 주세요.",
    "answer": "**기본 사용:**\r\n```bash\r\n# 셸 접속\r\ndocker exec -it <container> /bin/bash\r\ndocker exec -it <container> /bin/sh  # Alpine 등\r\n\r\n# 명령어 실행\r\ndocker exec <container> ls -la /app\r\ndocker exec <container> cat /etc/hosts\r\n```\r\n\r\n**주요 옵션:**\r\n| 옵션 | 설명 |\r\n|------|------|\r\n| `-i` | 표준 입력 유지 |\r\n| `-t` | TTY 할당 |\r\n| `-u` | 사용자 지정 |\r\n| `-w` | 작업 디렉토리 |\r\n| `-e` | 환경 변수 |\r\n\r\n**디버깅 명령어 예시:**\r\n```bash\r\n# 프로세스 확인\r\ndocker exec <container> ps aux\r\n\r\n# 네트워크 확인\r\ndocker exec <container> netstat -tlnp\r\ndocker exec <container> cat /etc/resolv.conf\r\n\r\n# 환경 변수 확인\r\ndocker exec <container> env\r\n\r\n# 파일 시스템 확인\r\ndocker exec <container> df -h\r\n\r\n# 로그 파일 확인\r\ndocker exec <container> tail -f /var/log/app.log\r\n```\r\n\r\n**root로 접속:**\r\n```bash\r\ndocker exec -it -u root <container> /bin/bash\r\n```\r\n\r\n**디버깅 도구 설치 (임시):**\r\n```bash\r\ndocker exec -it <container> apt-get update && apt-get install -y curl\r\ndocker exec -it <container> apk add --no-cache curl  # Alpine\r\n```\r\n\r\n**주의:** 프로덕션 컨테이너는 최소한의 도구만 포함하므로 디버깅 도구가 없을 수 있음",
    "references": [
      {
        "title": "docker exec",
        "url": "https://docs.docker.com/reference/cli/docker/container/exec/"
      }
    ]
  },
  {
    "id": "DOCKER-077",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너의 파일 시스템 변경 사항을 확인하는 방법(docker diff)을 설명해 주세요.",
    "answer": "**docker diff:**\r\n컨테이너 시작 이후 파일 시스템에서 변경된 파일과 디렉토리를 표시합니다.\r\n\r\n**사용법:**\r\n```bash\r\ndocker diff <container>\r\n```\r\n\r\n**출력 표시:**\r\n| 기호 | 의미 |\r\n|------|------|\r\n| A | 추가됨 (Added) |\r\n| C | 변경됨 (Changed) |\r\n| D | 삭제됨 (Deleted) |\r\n\r\n**출력 예시:**\r\n```bash\r\n$ docker diff mycontainer\r\nA /app/data/newfile.txt\r\nC /var/log/app.log\r\nC /tmp\r\nD /app/temp/cache.dat\r\n```\r\n\r\n**활용 사례:**\r\n\r\n1. **디버깅:**\r\n   - 애플리케이션이 예상치 못한 파일 생성/수정 확인\r\n\r\n2. **보안 감사:**\r\n   - 컨테이너 내 파일 변조 감지\r\n\r\n3. **이미지 최적화:**\r\n   - 불필요한 파일 생성 확인 후 Dockerfile 개선\r\n\r\n4. **커밋 전 확인:**\r\n```bash\r\n# 변경 사항 확인 후 새 이미지 생성\r\ndocker diff mycontainer\r\ndocker commit mycontainer myimage:modified\r\n```\r\n\r\n**주의사항:**\r\n- 실행 중이거나 정지된 컨테이너에서 사용 가능\r\n- 볼륨 마운트된 경로는 표시되지 않음",
    "references": [
      {
        "title": "docker diff",
        "url": "https://docs.docker.com/reference/cli/docker/container/diff/"
      }
    ]
  },
  {
    "id": "DOCKER-078",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너와 호스트 간 파일을 복사하는 방법(docker cp)을 설명해 주세요.",
    "answer": "**기본 문법:**\r\n```bash\r\n# 호스트 → 컨테이너\r\ndocker cp <src_path> <container>:<dest_path>\r\n\r\n# 컨테이너 → 호스트\r\ndocker cp <container>:<src_path> <dest_path>\r\n```\r\n\r\n**사용 예시:**\r\n```bash\r\n# 파일 복사 (호스트 → 컨테이너)\r\ndocker cp ./config.json mycontainer:/app/config.json\r\n\r\n# 디렉토리 복사\r\ndocker cp ./data/ mycontainer:/app/data/\r\n\r\n# 파일 복사 (컨테이너 → 호스트)\r\ndocker cp mycontainer:/var/log/app.log ./logs/\r\n\r\n# 디렉토리 복사 (컨테이너 → 호스트)\r\ndocker cp mycontainer:/app/data ./backup/\r\n```\r\n\r\n**옵션:**\r\n| 옵션 | 설명 |\r\n|------|------|\r\n| `-a, --archive` | 모든 uid/gid 정보 보존 |\r\n| `-L, --follow-link` | 심볼릭 링크 따라가기 |\r\n\r\n```bash\r\ndocker cp -a mycontainer:/app/data ./backup/\r\n```\r\n\r\n**활용 사례:**\r\n1. **설정 파일 주입:** 실행 중 컨테이너에 설정 업데이트\r\n2. **로그 추출:** 디버깅을 위한 로그 파일 추출\r\n3. **백업:** 컨테이너 데이터 백업\r\n4. **디버깅:** 문제 분석을 위한 파일 추출\r\n\r\n**주의사항:**\r\n- 실행 중/정지된 컨테이너 모두 가능\r\n- 볼륨에 쓰는 것보다 비효율적 (임시 용도)\r\n- 심볼릭 링크 처리 주의",
    "references": [
      {
        "title": "docker cp",
        "url": "https://docs.docker.com/reference/cli/docker/container/cp/"
      }
    ]
  },
  {
    "id": "DOCKER-079",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이미지와 컨테이너를 정리하여 디스크 공간을 확보하는 방법(docker system prune)을 설명해 주세요.",
    "answer": "**디스크 사용량 확인:**\r\n```bash\r\ndocker system df\r\ndocker system df -v  # 상세 정보\r\n```\r\n\r\n**정리 명령어:**\r\n\r\n```bash\r\n# 기본 정리 (중지된 컨테이너, 미사용 네트워크, dangling 이미지, 빌드 캐시)\r\ndocker system prune\r\n\r\n# 확인 없이 실행\r\ndocker system prune -f\r\n\r\n# 볼륨 포함\r\ndocker system prune --volumes\r\n\r\n# 미사용 이미지 모두 포함\r\ndocker system prune -a\r\n```\r\n\r\n**개별 정리:**\r\n```bash\r\n# 중지된 컨테이너\r\ndocker container prune\r\n\r\n# dangling 이미지\r\ndocker image prune\r\n\r\n# 미사용 이미지 (dangling + 컨테이너 없는)\r\ndocker image prune -a\r\n\r\n# 미사용 볼륨\r\ndocker volume prune\r\n\r\n# 미사용 네트워크\r\ndocker network prune\r\n\r\n# 빌드 캐시\r\ndocker builder prune\r\n```\r\n\r\n**필터링:**\r\n```bash\r\n# 24시간 이상 된 것만\r\ndocker system prune --filter \"until=24h\"\r\n\r\n# 특정 라벨 제외\r\ndocker image prune --filter \"label!=keep\"\r\n```\r\n\r\n**주의사항:**\r\n- `prune -a`는 현재 사용 중이지 않은 모든 이미지 삭제\r\n- 볼륨 삭제는 데이터 손실 주의\r\n- CI/CD에서 정기적 실행 권장",
    "references": [
      {
        "title": "docker system prune",
        "url": "https://docs.docker.com/reference/cli/docker/system/prune/"
      }
    ]
  },
  {
    "id": "DOCKER-080",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 네트워크 문제를 진단하고 해결하는 방법을 설명해 주세요.",
    "answer": "**진단 도구:**\r\n\r\n**1. 네트워크 상태 확인:**\r\n```bash\r\ndocker network ls\r\ndocker network inspect <network>\r\n```\r\n\r\n**2. 컨테이너 네트워크 설정 확인:**\r\n```bash\r\ndocker inspect <container> --format '{{json .NetworkSettings.Networks}}'\r\n```\r\n\r\n**3. 컨테이너 내부에서 진단:**\r\n```bash\r\n# DNS 확인\r\ndocker exec <container> cat /etc/resolv.conf\r\ndocker exec <container> nslookup other-container\r\n\r\n# 연결 테스트\r\ndocker exec <container> ping other-container\r\ndocker exec <container> curl http://other-container:8080\r\n\r\n# 포트 확인\r\ndocker exec <container> netstat -tlnp\r\n```\r\n\r\n**일반적인 문제와 해결:**\r\n\r\n| 문제 | 원인 | 해결 |\r\n|------|------|------|\r\n| 컨테이너 간 통신 불가 | 다른 네트워크 | 같은 네트워크에 연결 |\r\n| DNS 해석 실패 | 기본 bridge 사용 | 사용자 정의 네트워크 사용 |\r\n| 외부 접근 불가 | 포트 미노출 | `-p` 옵션으로 포트 매핑 |\r\n| 호스트 접근 불가 | 네트워크 격리 | `host.docker.internal` 사용 |\r\n\r\n**디버깅 컨테이너:**\r\n```bash\r\n# 네트워크 도구가 포함된 컨테이너\r\ndocker run -it --network <network> nicolaka/netshoot\r\n\r\n# 컨테이너 네트워크 네임스페이스에서 실행\r\ndocker run -it --network container:<target> nicolaka/netshoot\r\n```",
    "references": [
      {
        "title": "Networking overview",
        "url": "https://docs.docker.com/network/"
      }
    ]
  },
  {
    "id": "DOCKER-081",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너의 재시작 정책(restart policy)과 각 옵션의 차이점을 설명해 주세요.",
    "answer": "**재시작 정책 옵션:**\r\n\r\n| 정책 | 설명 |\r\n|------|------|\r\n| `no` | 재시작 안 함 (기본값) |\r\n| `on-failure[:max-retries]` | 비정상 종료 시 재시작 |\r\n| `always` | 항상 재시작 (수동 중지 포함) |\r\n| `unless-stopped` | 수동 중지 전까지 재시작 |\r\n\r\n**사용법:**\r\n```bash\r\n# always\r\ndocker run --restart always nginx\r\n\r\n# on-failure (최대 3회)\r\ndocker run --restart on-failure:3 myapp\r\n\r\n# unless-stopped\r\ndocker run --restart unless-stopped nginx\r\n```\r\n\r\n**Docker Compose:**\r\n```yaml\r\nservices:\r\n  web:\r\n    image: nginx\r\n    restart: unless-stopped\r\n```\r\n\r\n**always vs unless-stopped:**\r\n```bash\r\n# always: Docker 데몬 재시작 시에도 컨테이너 시작\r\n# unless-stopped: 수동으로 stop한 경우 데몬 재시작 후 시작 안 함\r\n```\r\n\r\n| 상황 | always | unless-stopped |\r\n|------|--------|----------------|\r\n| 컨테이너 비정상 종료 | 재시작 | 재시작 |\r\n| Docker 데몬 재시작 | 재시작 | 재시작 |\r\n| `docker stop` 후 데몬 재시작 | 재시작 | 시작 안 함 |\r\n\r\n**실행 중인 컨테이너 정책 변경:**\r\n```bash\r\ndocker update --restart unless-stopped <container>\r\n```",
    "references": [
      {
        "title": "Start containers automatically",
        "url": "https://docs.docker.com/config/containers/start-containers-automatically/"
      }
    ]
  },
  {
    "id": "DOCKER-082",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너가 예기치 않게 종료되었을 때 원인을 분석하는 방법을 설명해 주세요.",
    "answer": "**1. 종료 코드 확인:**\r\n```bash\r\ndocker ps -a --filter \"name=<container>\"\r\ndocker inspect <container> --format '{{.State.ExitCode}}'\r\n```\r\n\r\n**주요 종료 코드:**\r\n| 코드 | 의미 |\r\n|------|------|\r\n| 0 | 정상 종료 |\r\n| 1 | 애플리케이션 오류 |\r\n| 137 | SIGKILL (128+9), OOM 가능성 |\r\n| 139 | 세그멘테이션 폴트 (128+11) |\r\n| 143 | SIGTERM (128+15) |\r\n\r\n**2. 로그 확인:**\r\n```bash\r\ndocker logs <container>\r\ndocker logs --tail 100 <container>\r\n```\r\n\r\n**3. OOM 확인:**\r\n```bash\r\ndocker inspect <container> --format '{{.State.OOMKilled}}'\r\n\r\n# 시스템 로그\r\ndmesg | grep -i \"killed process\"\r\njournalctl -k | grep -i \"killed\"\r\n```\r\n\r\n**4. 이벤트 확인:**\r\n```bash\r\ndocker events --since '1h' --filter container=<container>\r\n```\r\n\r\n**5. 상세 상태:**\r\n```bash\r\ndocker inspect <container> | jq '.[] | .State'\r\n```\r\n\r\n**6. 분석 체크리스트:**\r\n- 메모리 제한 확인 (`--memory`)\r\n- 리소스 사용량 (`docker stats`)\r\n- 애플리케이션 로그\r\n- healthcheck 상태\r\n- 의존 서비스 상태\r\n\r\n**자동 재시작 정책 확인:**\r\n```bash\r\ndocker inspect <container> --format '{{.HostConfig.RestartPolicy}}'\r\n```",
    "references": [
      {
        "title": "Troubleshoot containers",
        "url": "https://docs.docker.com/config/containers/runmetrics/"
      }
    ]
  },
  {
    "id": "DOCKER-083",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이미지 크기를 최소화하기 위한 베스트 프랙티스를 설명해 주세요.",
    "answer": "**1. 경량 베이스 이미지 사용:**\r\n```dockerfile\r\n# Bad\r\nFROM ubuntu:22.04  # ~77MB\r\n\r\n# Good\r\nFROM alpine:3.18   # ~5MB\r\nFROM scratch       # 0MB (정적 바이너리)\r\n```\r\n\r\n**2. 멀티스테이지 빌드:**\r\n```dockerfile\r\nFROM node:18 AS builder\r\nWORKDIR /app\r\nCOPY package*.json ./\r\nRUN npm ci\r\nCOPY . .\r\nRUN npm run build\r\n\r\nFROM node:18-alpine\r\nCOPY --from=builder /app/dist ./dist\r\nCOPY --from=builder /app/node_modules ./node_modules\r\nCMD [\"node\", \"dist/index.js\"]\r\n```\r\n\r\n**3. RUN 명령 최적화:**\r\n```dockerfile\r\n# Bad\r\nRUN apt-get update\r\nRUN apt-get install -y curl\r\nRUN rm -rf /var/lib/apt/lists/*\r\n\r\n# Good\r\nRUN apt-get update && \\\r\n    apt-get install -y --no-install-recommends curl && \\\r\n    rm -rf /var/lib/apt/lists/*\r\n```\r\n\r\n**4. .dockerignore 활용:**\r\n```\r\nnode_modules\r\n.git\r\n*.log\r\n```\r\n\r\n**5. 불필요한 파일 제거:**\r\n- 패키지 캐시 삭제\r\n- 문서, 맨페이지 제외\r\n- 개발 의존성 제외\r\n\r\n**6. 특수 빌드 옵션:**\r\n```dockerfile\r\n# Go 정적 빌드\r\nRUN CGO_ENABLED=0 go build -ldflags=\"-s -w\" -o app\r\n```",
    "references": [
      {
        "title": "Best practices for Dockerfile",
        "url": "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/"
      }
    ]
  },
  {
    "id": "DOCKER-084",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 빌드 시간을 단축하기 위한 캐시 활용 전략을 설명해 주세요.",
    "answer": "**캐시 원리:**\r\n- 각 명령어가 레이어 생성\r\n- 명령어와 파일 체크섬이 같으면 캐시 사용\r\n- 한 레이어가 변경되면 이후 모든 레이어 재빌드\r\n\r\n**1. 의존성 파일 먼저 복사:**\r\n```dockerfile\r\n# 의존성 정의만 먼저\r\nCOPY package.json package-lock.json ./\r\nRUN npm ci\r\n\r\n# 소스코드는 나중에\r\nCOPY . .\r\n```\r\n\r\n**2. 자주 변경되는 것은 마지막에:**\r\n```dockerfile\r\nFROM node:18\r\nWORKDIR /app\r\n\r\n# 거의 변경 안 됨\r\nCOPY package*.json ./\r\nRUN npm ci\r\n\r\n# 자주 변경됨\r\nCOPY src/ ./src/\r\nCOPY tsconfig.json ./\r\n\r\nRUN npm run build\r\n```\r\n\r\n**3. BuildKit 캐시 마운트:**\r\n```dockerfile\r\n# syntax=docker/dockerfile:1\r\nRUN --mount=type=cache,target=/root/.npm \\\r\n    npm ci\r\n\r\nRUN --mount=type=cache,target=/root/.cache/go-build \\\r\n    go build -o app\r\n```\r\n\r\n**4. 외부 캐시 (CI/CD):**\r\n```bash\r\n# 캐시 내보내기/가져오기\r\ndocker build --cache-from myimage:cache -t myimage .\r\ndocker build --cache-to type=inline -t myimage .\r\n```\r\n\r\n**5. 멀티스테이지에서 특정 단계만:**\r\n```bash\r\ndocker build --target builder .\r\n```",
    "references": [
      {
        "title": "Build cache",
        "url": "https://docs.docker.com/build/cache/"
      }
    ]
  },
  {
    "id": "DOCKER-085",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker의 BuildKit이란 무엇이며, 기존 빌더 대비 어떤 장점이 있나요?",
    "answer": "**BuildKit:**\r\nDocker의 차세대 빌드 엔진으로, Docker 23.0+에서 기본값입니다.\r\n\r\n**활성화:**\r\n```bash\r\n# 환경 변수\r\nexport DOCKER_BUILDKIT=1\r\n\r\n# 또는 daemon.json\r\n{\r\n  \"features\": { \"buildkit\": true }\r\n}\r\n```\r\n\r\n**장점:**\r\n\r\n1. **병렬 빌드:**\r\n   - 독립적인 스테이지 동시 빌드\r\n   - 빌드 시간 단축\r\n\r\n2. **캐시 마운트:**\r\n```dockerfile\r\n# syntax=docker/dockerfile:1\r\nRUN --mount=type=cache,target=/root/.npm npm ci\r\nRUN --mount=type=cache,target=/var/cache/apt apt-get install -y curl\r\n```\r\n\r\n3. **시크릿 마운트:**\r\n```dockerfile\r\nRUN --mount=type=secret,id=mysecret cat /run/secrets/mysecret\r\n```\r\n\r\n4. **SSH 마운트:**\r\n```dockerfile\r\nRUN --mount=type=ssh git clone git@github.com:repo/private.git\r\n```\r\n\r\n5. **출력 최적화:**\r\n   - 진행률 표시 개선\r\n   - 불필요한 레이어 전송 최소화\r\n\r\n6. **외부 캐시:**\r\n```bash\r\ndocker build --cache-to type=registry,ref=myrepo/cache \\\r\n             --cache-from type=registry,ref=myrepo/cache .\r\n```\r\n\r\n**Dockerfile 문법:**\r\n```dockerfile\r\n# syntax=docker/dockerfile:1\r\n```",
    "references": [
      {
        "title": "Build with BuildKit",
        "url": "https://docs.docker.com/build/buildkit/"
      }
    ]
  },
  {
    "id": "DOCKER-086",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 컨테이너의 시작 시간을 최적화하는 방법을 설명해 주세요.",
    "answer": "**1. 이미지 크기 최소화:**\r\n- 작은 이미지 = 빠른 pull/load\r\n- Alpine, distroless 사용\r\n- 멀티스테이지 빌드\r\n\r\n**2. 이미지 사전 배포:**\r\n```bash\r\n# 노드에 이미지 미리 pull\r\ndocker pull myapp:latest\r\n\r\n# 레지스트리 미러링\r\n```\r\n\r\n**3. 애플리케이션 최적화:**\r\n```dockerfile\r\n# JVM 예: 클래스 데이터 공유\r\nENV JAVA_OPTS=\"-Xshare:on -XX:SharedArchiveFile=/app/app.jsa\"\r\n```\r\n\r\n**4. 느린 초기화 피하기:**\r\n- 무거운 DB 마이그레이션 분리\r\n- Lazy loading 활용\r\n- 사전 컴파일/빌드\r\n\r\n**5. 헬스체크 최적화:**\r\n```yaml\r\nhealthcheck:\r\n  start_period: 30s  # 초기 유예 시간\r\n  interval: 5s\r\n```\r\n\r\n**6. 리소스 할당:**\r\n```bash\r\ndocker run --cpus=2 --memory=2g myapp\r\n```\r\n\r\n**7. 스토리지 드라이버:**\r\n- overlay2 사용 (권장)\r\n\r\n**8. 로컬 레지스트리:**\r\n- 네트워크 지연 감소\r\n\r\n**측정:**\r\n```bash\r\ntime docker run --rm myapp echo \"started\"\r\n\r\n# 또는 컨테이너 내 측정\r\ndocker run myapp sh -c 'echo $(($(date +%s%N) - $(cat /proc/1/stat | cut -d\" \" -f22) * 10000000))'\r\n```",
    "references": [
      {
        "title": "Optimize container startup",
        "url": "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/"
      }
    ]
  },
  {
    "id": "DOCKER-087",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 레이어 최적화를 통해 이미지 풀/푸시 시간을 단축하는 방법을 설명해 주세요.",
    "answer": "**레이어 공유 원리:**\r\n- 동일한 레이어는 한 번만 전송\r\n- 베이스 이미지 공유 시 효율적\r\n\r\n**1. 일관된 베이스 이미지:**\r\n```dockerfile\r\n# 모든 서비스에서 같은 베이스 사용\r\nFROM node:18-alpine\r\n```\r\n\r\n**2. 변경 빈도별 레이어 분리:**\r\n```dockerfile\r\n# 거의 변경 안 됨 (공유 가능)\r\nFROM node:18-alpine\r\nRUN apk add --no-cache tini\r\n\r\n# 가끔 변경 (의존성)\r\nCOPY package*.json ./\r\nRUN npm ci --only=production\r\n\r\n# 자주 변경 (소스코드)\r\nCOPY . .\r\n```\r\n\r\n**3. 불필요한 레이어 방지:**\r\n```dockerfile\r\n# Bad - 여러 레이어\r\nRUN apt-get update\r\nRUN apt-get install -y curl\r\nRUN apt-get clean\r\n\r\n# Good - 하나의 레이어\r\nRUN apt-get update && \\\r\n    apt-get install -y curl && \\\r\n    apt-get clean && \\\r\n    rm -rf /var/lib/apt/lists/*\r\n```\r\n\r\n**4. 레이어 크기 균형:**\r\n- 너무 큰 레이어: 부분 변경에도 전체 재전송\r\n- 너무 작은 레이어: 오버헤드 증가\r\n\r\n**5. 캐시 활용:**\r\n```bash\r\n# 빌드 시 캐시 푸시\r\ndocker build --cache-to type=registry,ref=myrepo/cache:latest .\r\n\r\n# 풀 시 캐시 사용\r\ndocker build --cache-from type=registry,ref=myrepo/cache:latest .\r\n```",
    "references": [
      {
        "title": "Optimize layers",
        "url": "https://docs.docker.com/build/cache/"
      }
    ]
  },
  {
    "id": "DOCKER-088",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker Distroless 이미지란 무엇이며, 보안과 성능 관점에서의 장점을 설명해 주세요.",
    "answer": "**Distroless 이미지란:**\r\nGoogle에서 제공하는 최소한의 런타임만 포함된 이미지입니다. 패키지 관리자, 셸, 기타 프로그램이 없습니다.\r\n\r\n**사용 가능한 이미지:**\r\n- `gcr.io/distroless/static` - 정적 바이너리용\r\n- `gcr.io/distroless/base` - libc 필요 시\r\n- `gcr.io/distroless/java` - Java 애플리케이션\r\n- `gcr.io/distroless/nodejs` - Node.js 애플리케이션\r\n- `gcr.io/distroless/python3` - Python 애플리케이션\r\n\r\n**사용 예시:**\r\n```dockerfile\r\nFROM golang:1.21 AS builder\r\nWORKDIR /app\r\nCOPY . .\r\nRUN CGO_ENABLED=0 go build -o server\r\n\r\nFROM gcr.io/distroless/static\r\nCOPY --from=builder /app/server /\r\nCMD [\"/server\"]\r\n```\r\n\r\n**보안 장점:**\r\n- 셸 없음 → RCE 공격 어려움\r\n- 패키지 관리자 없음 → 악성 패키지 설치 불가\r\n- 최소 공격 표면\r\n- CVE 취약점 감소\r\n\r\n**성능 장점:**\r\n- 이미지 크기 최소화 (2-20MB)\r\n- 빠른 pull/push\r\n- 빠른 컨테이너 시작\r\n\r\n**제한사항 및 트레이드오프:**\r\n- 디버깅 어려움 (셸 없음) - 운영 중 문제 분석이 복잡해짐\r\n- CA 인증서 업데이트를 위한 별도 빌드 필요\r\n- 특정 런타임만 지원 (범용성 제한)\r\n- debug 태그 버전으로 busybox 포함 가능 (개발/테스트용)\r\n  ```dockerfile\r\n  FROM gcr.io/distroless/static:debug\r\n  ```\r\n- **대안**: `kubectl debug`나 ephemeral containers로 런타임 디버깅 가능",
    "references": [
      {
        "title": "GoogleContainerTools/distroless",
        "url": "https://github.com/GoogleContainerTools/distroless"
      }
    ]
  },
  {
    "id": "DOCKER-089",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "CI/CD 파이프라인에서 Docker 이미지를 빌드하고 배포하는 일반적인 워크플로우를 설명해 주세요.",
    "answer": "**일반적인 워크플로우:**\r\n\r\n```\r\n코드 푸시 → 빌드 → 테스트 → 이미지 빌드 → 스캔 → 푸시 → 배포\r\n```\r\n\r\n**상세 단계:**\r\n\r\n1. **코드 변경 감지:**\r\n   - Git push, PR 이벤트\r\n\r\n2. **빌드 및 테스트:**\r\n```bash\r\nnpm install\r\nnpm test\r\nnpm run build\r\n```\r\n\r\n3. **Docker 이미지 빌드:**\r\n```bash\r\ndocker build -t myapp:$COMMIT_SHA .\r\n```\r\n\r\n4. **보안 스캔:**\r\n```bash\r\ntrivy image myapp:$COMMIT_SHA\r\ndocker scout cves myapp:$COMMIT_SHA\r\n```\r\n\r\n5. **레지스트리 푸시:**\r\n```bash\r\ndocker tag myapp:$COMMIT_SHA registry.example.com/myapp:$COMMIT_SHA\r\ndocker push registry.example.com/myapp:$COMMIT_SHA\r\n```\r\n\r\n6. **배포:**\r\n```bash\r\n# Kubernetes\r\nkubectl set image deployment/myapp myapp=registry.example.com/myapp:$COMMIT_SHA\r\n\r\n# Docker Compose\r\ndocker-compose pull && docker-compose up -d\r\n```\r\n\r\n**예시 (GitHub Actions):**\r\n```yaml\r\njobs:\r\n  build-and-deploy:\r\n    steps:\r\n      - uses: actions/checkout@v4\r\n      - name: Build and test\r\n        run: npm ci && npm test\r\n      - name: Build image\r\n        run: docker build -t myapp:${{ github.sha }} .\r\n      - name: Push to registry\r\n        run: |\r\n          docker tag myapp:${{ github.sha }} ghcr.io/${{ github.repository }}:${{ github.sha }}\r\n          docker push ghcr.io/${{ github.repository }}:${{ github.sha }}\r\n```",
    "references": [
      {
        "title": "CI/CD with Docker",
        "url": "https://docs.docker.com/build/ci/"
      }
    ]
  },
  {
    "id": "DOCKER-090",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "GitHub Actions에서 Docker 이미지를 빌드하고 레지스트리에 푸시하는 방법을 설명해 주세요.",
    "answer": "**GitHub Container Registry (ghcr.io) 사용:**\r\n\r\n```yaml\r\n# .github/workflows/docker.yml\r\nname: Build and Push Docker Image\r\n\r\non:\r\n  push:\r\n    branches: [main]\r\n  pull_request:\r\n    branches: [main]\r\n\r\njobs:\r\n  build:\r\n    runs-on: ubuntu-latest\r\n    permissions:\r\n      contents: read\r\n      packages: write\r\n\r\n    steps:\r\n      - name: Checkout\r\n        uses: actions/checkout@v4\r\n\r\n      - name: Set up Docker Buildx\r\n        uses: docker/setup-buildx-action@v3\r\n\r\n      - name: Login to GitHub Container Registry\r\n        uses: docker/login-action@v3\r\n        with:\r\n          registry: ghcr.io\r\n          username: ${{ github.actor }}\r\n          password: ${{ secrets.GITHUB_TOKEN }}\r\n\r\n      - name: Extract metadata\r\n        id: meta\r\n        uses: docker/metadata-action@v5\r\n        with:\r\n          images: ghcr.io/${{ github.repository }}\r\n          tags: |\r\n            type=sha\r\n            type=ref,event=branch\r\n            type=semver,pattern={{version}}\r\n\r\n      - name: Build and push\r\n        uses: docker/build-push-action@v5\r\n        with:\r\n          context: .\r\n          push: ${{ github.event_name != 'pull_request' }}\r\n          tags: ${{ steps.meta.outputs.tags }}\r\n          labels: ${{ steps.meta.outputs.labels }}\r\n          cache-from: type=gha\r\n          cache-to: type=gha,mode=max\r\n```\r\n\r\n**Docker Hub 사용 시:**\r\n```yaml\r\n- name: Login to Docker Hub\r\n  uses: docker/login-action@v3\r\n  with:\r\n    username: ${{ secrets.DOCKERHUB_USERNAME }}\r\n    password: ${{ secrets.DOCKERHUB_TOKEN }}\r\n```",
    "references": [
      {
        "title": "Build and push Docker images",
        "url": "https://github.com/docker/build-push-action"
      }
    ]
  },
  {
    "id": "DOCKER-091",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이미지 태깅 전략(semantic versioning, git commit hash)과 CI/CD에서의 적용 방법을 설명해 주세요.",
    "answer": "**주요 태깅 전략:**\r\n\r\n| 전략 | 형식 | 특징 |\r\n|------|------|------|\r\n| Semantic Version | v1.2.3 | 명확한 버전 관리 |\r\n| Git SHA | abc1234 | 불변, 추적 가능 |\r\n| Branch | main, develop | 환경별 배포 |\r\n| Build Number | build-123 | CI/CD 추적 |\r\n\r\n**CI/CD에서 적용:**\r\n\r\n```yaml\r\n# GitHub Actions\r\n- name: Extract metadata\r\n  id: meta\r\n  uses: docker/metadata-action@v5\r\n  with:\r\n    images: myrepo/myapp\r\n    tags: |\r\n      # Git SHA (짧은 형식)\r\n      type=sha,prefix=\r\n      # Git 태그 (v1.2.3)\r\n      type=semver,pattern={{version}}\r\n      type=semver,pattern={{major}}.{{minor}}\r\n      type=semver,pattern={{major}}\r\n      # 브랜치명\r\n      type=ref,event=branch\r\n      # PR 번호\r\n      type=ref,event=pr\r\n      # latest (기본 브랜치)\r\n      type=raw,value=latest,enable=${{ github.ref == 'refs/heads/main' }}\r\n```\r\n\r\n**스크립트 예시:**\r\n```bash\r\n# Git 정보 기반 태그\r\nVERSION=$(git describe --tags --always)\r\nCOMMIT=$(git rev-parse --short HEAD)\r\nBRANCH=$(git rev-parse --abbrev-ref HEAD)\r\n\r\ndocker build \\\r\n  -t myapp:${VERSION} \\\r\n  -t myapp:${COMMIT} \\\r\n  -t myapp:${BRANCH}-${COMMIT} \\\r\n  .\r\n```\r\n\r\n**권장 사항 (함정 질문 - latest 태그의 위험성):**\r\n- 프로덕션: Semantic Version + SHA 조합\r\n- **`latest` 태그의 문제점:**\r\n  - 어떤 버전인지 알 수 없음 (재현성 부족)\r\n  - 같은 태그가 다른 이미지를 가리킬 수 있음\r\n  - 롤백 시 어떤 버전으로 돌아가야 하는지 불명확\r\n  - Kubernetes의 `imagePullPolicy: Always`와 조합 시 예측 불가능한 배포\r\n- 이미지 다이제스트(`myapp@sha256:abc...`)로 완전한 불변성 보장\r\n- 프로덕션에서는 명시적 버전 태그 필수",
    "references": [
      {
        "title": "docker/metadata-action",
        "url": "https://github.com/docker/metadata-action"
      }
    ]
  },
  {
    "id": "DOCKER-092",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker를 사용한 테스트 환경 구성과 테스트 컨테이너(Testcontainers) 활용 방법을 설명해 주세요.",
    "answer": "**Docker Compose로 테스트 환경:**\r\n```yaml\r\n# docker-compose.test.yml\r\nservices:\r\n  app:\r\n    build: .\r\n    depends_on:\r\n      db:\r\n        condition: service_healthy\r\n    environment:\r\n      DATABASE_URL: postgres://user:pass@db:5432/test\r\n\r\n  db:\r\n    image: postgres:15\r\n    environment:\r\n      POSTGRES_PASSWORD: pass\r\n    healthcheck:\r\n      test: [\"CMD\", \"pg_isready\"]\r\n```\r\n\r\n```bash\r\ndocker-compose -f docker-compose.test.yml run app npm test\r\n```\r\n\r\n**Testcontainers:**\r\n테스트 코드에서 Docker 컨테이너를 프로그래밍 방식으로 관리하는 라이브러리입니다.\r\n\r\n**Java 예시:**\r\n```java\r\n@Container\r\nstatic PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>(\"postgres:15\")\r\n    .withDatabaseName(\"test\")\r\n    .withUsername(\"user\")\r\n    .withPassword(\"pass\");\r\n\r\n@Test\r\nvoid testDatabaseConnection() {\r\n    String jdbcUrl = postgres.getJdbcUrl();\r\n    // 테스트 수행\r\n}\r\n```\r\n\r\n**Node.js 예시:**\r\n```javascript\r\nconst { GenericContainer } = require(\"testcontainers\");\r\n\r\ndescribe(\"Database tests\", () => {\r\n  let container;\r\n\r\n  beforeAll(async () => {\r\n    container = await new GenericContainer(\"postgres:15\")\r\n      .withEnvironment({ POSTGRES_PASSWORD: \"pass\" })\r\n      .withExposedPorts(5432)\r\n      .start();\r\n  });\r\n\r\n  afterAll(async () => {\r\n    await container.stop();\r\n  });\r\n});\r\n```\r\n\r\n**장점:**\r\n- 실제 서비스로 통합 테스트\r\n- 테스트 격리 보장\r\n- CI/CD 환경 동일성",
    "references": [
      {
        "title": "Testcontainers",
        "url": "https://testcontainers.com/"
      }
    ]
  },
  {
    "id": "DOCKER-093",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker 이미지의 보안 스캔을 CI/CD 파이프라인에 통합하는 방법을 설명해 주세요.",
    "answer": "**GitHub Actions - Trivy:**\r\n```yaml\r\n- name: Run Trivy vulnerability scanner\r\n  uses: aquasecurity/trivy-action@master\r\n  with:\r\n    image-ref: myapp:${{ github.sha }}\r\n    format: 'sarif'\r\n    output: 'trivy-results.sarif'\r\n    severity: 'CRITICAL,HIGH'\r\n    exit-code: '1'  # 취약점 발견 시 실패\r\n\r\n- name: Upload Trivy scan results\r\n  uses: github/codeql-action/upload-sarif@v2\r\n  with:\r\n    sarif_file: 'trivy-results.sarif'\r\n```\r\n\r\n**Docker Scout:**\r\n```yaml\r\n- name: Docker Scout\r\n  uses: docker/scout-action@v1\r\n  with:\r\n    command: cves\r\n    image: myapp:${{ github.sha }}\r\n    only-severities: critical,high\r\n    exit-code: true\r\n```\r\n\r\n**Snyk:**\r\n```yaml\r\n- name: Run Snyk to check for vulnerabilities\r\n  uses: snyk/actions/docker@master\r\n  env:\r\n    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}\r\n  with:\r\n    image: myapp:${{ github.sha }}\r\n    args: --severity-threshold=high\r\n```\r\n\r\n**통합 워크플로우:**\r\n```yaml\r\njobs:\r\n  build-scan-push:\r\n    steps:\r\n      - name: Build\r\n        run: docker build -t myapp:${{ github.sha }} .\r\n\r\n      - name: Scan\r\n        uses: aquasecurity/trivy-action@master\r\n        with:\r\n          image-ref: myapp:${{ github.sha }}\r\n          exit-code: '1'\r\n          severity: 'CRITICAL'\r\n\r\n      - name: Push (스캔 통과 시에만)\r\n        if: success()\r\n        run: docker push myapp:${{ github.sha }}\r\n```",
    "references": [
      {
        "title": "Docker Scout in CI",
        "url": "https://docs.docker.com/scout/integrations/ci/"
      }
    ]
  },
  {
    "id": "DOCKER-094",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker layer caching을 CI/CD 환경에서 활용하여 빌드 시간을 단축하는 방법을 설명해 주세요.",
    "answer": "**문제:**\r\nCI/CD 환경은 매번 새로운 러너에서 실행되어 로컬 캐시가 없습니다.\r\n\r\n**해결 방법:**\r\n\r\n**1. GitHub Actions Cache:**\r\n```yaml\r\n- name: Set up Docker Buildx\r\n  uses: docker/setup-buildx-action@v3\r\n\r\n- name: Build and push\r\n  uses: docker/build-push-action@v5\r\n  with:\r\n    context: .\r\n    cache-from: type=gha\r\n    cache-to: type=gha,mode=max\r\n```\r\n\r\n**2. 레지스트리 캐시:**\r\n```yaml\r\n- name: Build and push\r\n  uses: docker/build-push-action@v5\r\n  with:\r\n    context: .\r\n    cache-from: type=registry,ref=myrepo/myapp:cache\r\n    cache-to: type=registry,ref=myrepo/myapp:cache,mode=max\r\n```\r\n\r\n**3. 인라인 캐시:**\r\n```bash\r\ndocker build \\\r\n  --cache-from myrepo/myapp:latest \\\r\n  --build-arg BUILDKIT_INLINE_CACHE=1 \\\r\n  -t myrepo/myapp:latest .\r\n```\r\n\r\n**4. 로컬 캐시 (self-hosted runner):**\r\n```yaml\r\n- name: Build\r\n  uses: docker/build-push-action@v5\r\n  with:\r\n    context: .\r\n    cache-from: type=local,src=/tmp/.buildx-cache\r\n    cache-to: type=local,dest=/tmp/.buildx-cache-new,mode=max\r\n\r\n- name: Move cache\r\n  run: |\r\n    rm -rf /tmp/.buildx-cache\r\n    mv /tmp/.buildx-cache-new /tmp/.buildx-cache\r\n```\r\n\r\n**캐시 모드:**\r\n- `min`: 최종 이미지 레이어만\r\n- `max`: 모든 중간 레이어 포함 (권장)",
    "references": [
      {
        "title": "Cache backends",
        "url": "https://docs.docker.com/build/cache/backends/"
      }
    ]
  },
  {
    "id": "DOCKER-095",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Blue-Green 배포와 Rolling 배포 전략에서 Docker는 어떤 역할을 하나요?",
    "answer": "**Blue-Green 배포:**\r\n두 개의 동일한 환경을 유지하고 트래픽을 전환합니다.\r\n\r\n```yaml\r\n# docker-compose.yml\r\nservices:\r\n  blue:\r\n    image: myapp:1.0\r\n    ports:\r\n      - \"8080:80\"\r\n\r\n  green:\r\n    image: myapp:2.0\r\n    ports:\r\n      - \"8081:80\"\r\n\r\n  nginx:\r\n    image: nginx\r\n    volumes:\r\n      - ./nginx.conf:/etc/nginx/nginx.conf\r\n    ports:\r\n      - \"80:80\"\r\n```\r\n\r\n```bash\r\n# 배포: green에 새 버전 배포 후 nginx 설정 변경\r\ndocker-compose pull green\r\ndocker-compose up -d green\r\n# nginx 설정에서 upstream을 green으로 변경\r\ndocker-compose exec nginx nginx -s reload\r\n```\r\n\r\n**Rolling 배포:**\r\n인스턴스를 순차적으로 업데이트합니다.\r\n\r\n```bash\r\n# Docker Swarm\r\ndocker service update \\\r\n  --image myapp:2.0 \\\r\n  --update-parallelism 1 \\\r\n  --update-delay 10s \\\r\n  myservice\r\n```\r\n\r\n**Docker의 역할:**\r\n1. **이미지 불변성**: 버전별 독립적 이미지\r\n2. **빠른 롤백**: 이전 이미지로 즉시 전환\r\n3. **환경 일관성**: 테스트된 이미지 그대로 배포\r\n4. **컨테이너 오케스트레이션**: Swarm/K8s와 연동\r\n5. **헬스체크**: 배포 성공 여부 확인\r\n\r\n**롤백:**\r\n```bash\r\n# 이전 이미지로 롤백\r\ndocker service update --rollback myservice\r\n```",
    "references": [
      {
        "title": "Deploy services",
        "url": "https://docs.docker.com/engine/swarm/services/"
      }
    ]
  },
  {
    "id": "DOCKER-096",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker와 Kubernetes의 관계와 각각의 역할을 설명해 주세요.",
    "answer": "**Docker의 역할:**\r\n- 컨테이너 이미지 빌드\r\n- 단일 호스트에서 컨테이너 실행\r\n- 컨테이너 런타임 제공\r\n- 이미지 레지스트리 (Docker Hub)\r\n\r\n**Kubernetes의 역할:**\r\n- 컨테이너 오케스트레이션\r\n- 멀티 노드 클러스터 관리\r\n- 자동 스케일링, 로드 밸런싱\r\n- 서비스 디스커버리\r\n- 롤링 업데이트, 롤백\r\n- 셀프 힐링\r\n\r\n**관계:**\r\n```\r\n개발자 → Docker (빌드) → Registry → Kubernetes (배포/운영)\r\n```\r\n\r\n| 구분 | Docker | Kubernetes |\r\n|------|--------|------------|\r\n| 범위 | 단일 호스트 | 클러스터 |\r\n| 초점 | 컨테이너 생성 | 컨테이너 관리 |\r\n| 스케일 | 수동 | 자동 |\r\n| 고가용성 | 제한적 | 내장 |\r\n\r\n**현재 상태:**\r\n- Kubernetes는 containerd, CRI-O 등 다양한 런타임 지원\r\n- Kubernetes 1.24부터 Docker 직접 지원 제거 (dockershim 제거)\r\n- 그러나 Docker로 빌드한 이미지는 여전히 K8s에서 실행 가능 (OCI 표준)\r\n\r\n**요약:**\r\nDocker = 컨테이너 빌드/실행 도구\r\nKubernetes = 컨테이너 오케스트레이션 플랫폼",
    "references": [
      {
        "title": "Kubernetes Overview",
        "url": "https://kubernetes.io/docs/concepts/overview/"
      }
    ]
  },
  {
    "id": "DOCKER-097",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker Swarm과 Kubernetes의 차이점과 각각의 사용 시나리오를 설명해 주세요.",
    "answer": "**비교:**\r\n\r\n| 구분 | Docker Swarm | Kubernetes |\r\n|------|--------------|------------|\r\n| **복잡도** | 낮음 | 높음 |\r\n| **학습 곡선** | 완만 | 가파름 |\r\n| **설치** | Docker 내장 | 별도 설치 필요 |\r\n| **확장성** | 중소 규모 | 대규모 |\r\n| **기능** | 기본적 | 풍부함 |\r\n| **생태계** | 제한적 | 매우 활발 |\r\n| **자동 스케일링** | 제한적 | 강력 (HPA, VPA) |\r\n| **로드 밸런싱** | 내장 | 내장 + Ingress |\r\n\r\n**Docker Swarm 사용 시나리오:**\r\n- 소규모 클러스터 (5-10 노드)\r\n- 빠른 구축 필요\r\n- Docker 생태계에 익숙한 팀\r\n- 복잡한 기능 불필요\r\n- 리소스 제한 환경\r\n\r\n**Kubernetes 사용 시나리오:**\r\n- 대규모 클러스터\r\n- 복잡한 마이크로서비스\r\n- 자동 스케일링 필수\r\n- 멀티 클라우드/하이브리드\r\n- 풍부한 에코시스템 활용\r\n\r\n**예시:**\r\n\r\n```bash\r\n# Docker Swarm\r\ndocker swarm init\r\ndocker service create --replicas 3 nginx\r\n\r\n# Kubernetes\r\nkubectl create deployment nginx --image=nginx --replicas=3\r\n```\r\n\r\n**결론:**\r\n- 단순함과 빠른 시작: Swarm\r\n- 확장성과 기능: Kubernetes",
    "references": [
      {
        "title": "Docker Swarm overview",
        "url": "https://docs.docker.com/engine/swarm/"
      }
    ]
  },
  {
    "id": "DOCKER-098",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker in Docker(DinD)란 무엇이며, 사용 시 고려사항을 설명해 주세요.",
    "answer": "**Docker in Docker (DinD):**\r\nDocker 컨테이너 내부에서 Docker 데몬을 실행하여 컨테이너 안에서 컨테이너를 빌드/실행하는 방식입니다.\r\n\r\n**사용 방법:**\r\n```bash\r\n# DinD 컨테이너 실행\r\ndocker run --privileged -d docker:dind\r\n\r\n# 또는 호스트 소켓 마운트 (DooD)\r\ndocker run -v /var/run/docker.sock:/var/run/docker.sock docker\r\n```\r\n\r\n**DinD vs DooD:**\r\n| 구분 | DinD | DooD (Docker outside of Docker) |\r\n|------|------|----------------------------------|\r\n| 방식 | 컨테이너 내 Docker 데몬 | 호스트 Docker 소켓 마운트 |\r\n| 격리 | 완전 격리 | 호스트와 공유 |\r\n| 성능 | 오버헤드 있음 | 네이티브 |\r\n| 보안 | `--privileged` 필요 | 소켓 접근 권한만 |\r\n\r\n**사용 시나리오:**\r\n- CI/CD 파이프라인에서 Docker 이미지 빌드\r\n- 개발/테스트 환경\r\n\r\n**고려사항:**\r\n\r\n1. **보안 위험:**\r\n   - `--privileged` 플래그는 호스트 전체 접근 권한 부여\r\n   - 프로덕션에서는 피해야 함\r\n\r\n2. **스토리지 드라이버:**\r\n   - DinD 내부 overlay와 외부 overlay 충돌 가능\r\n   - vfs 드라이버 사용 권장 (느림)\r\n\r\n3. **캐시 공유:**\r\n   - DinD는 매번 새로운 캐시\r\n   - 볼륨으로 캐시 공유 필요\r\n\r\n**권장:**\r\n- 가능하면 DooD 또는 Kaniko 사용\r\n- CI/CD: Kaniko, Buildah 등 대안 고려",
    "references": [
      {
        "title": "Docker in Docker",
        "url": "https://hub.docker.com/_/docker"
      }
    ]
  },
  {
    "id": "DOCKER-099",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker의 storage driver 종류(overlay2, aufs, btrfs 등)와 선택 기준을 설명해 주세요.",
    "answer": "**주요 Storage Driver:**\r\n\r\n| 드라이버 | 특징 | 권장 환경 |\r\n|----------|------|-----------|\r\n| **overlay2** | 현재 기본값, 안정적 | 대부분의 Linux |\r\n| **fuse-overlayfs** | Rootless 모드용 | Rootless Docker |\r\n| **btrfs** | CoW 파일 시스템 | btrfs 파티션 |\r\n| **zfs** | 스냅샷, 압축 지원 | zfs 파티션 |\r\n| **vfs** | 간단, 비효율적 | 테스트, 다른 드라이버 불가 시 |\r\n| **aufs** | 레거시 | Ubuntu 이전 버전 |\r\n| **devicemapper** | 레거시 | CentOS/RHEL 이전 버전 |\r\n\r\n**overlay2 (권장):**\r\n```\r\nHost Filesystem\r\n├── /var/lib/docker/overlay2/\r\n│   ├── <layer-id>/\r\n│   │   ├── diff/      # 레이어 내용\r\n│   │   ├── link       # 짧은 ID\r\n│   │   └── lower      # 하위 레이어 참조\r\n│   └── <container-id>/\r\n│       ├── diff/      # 쓰기 레이어\r\n│       ├── merged/    # 통합 뷰\r\n│       └── work/      # 작업 디렉토리\r\n```\r\n\r\n**선택 기준:**\r\n1. **커널 버전:** overlay2는 4.0+ 필요\r\n2. **파일 시스템:** backing filesystem 호환성\r\n3. **워크로드:** 쓰기 집약적 → 직접 마운트 볼륨 권장\r\n4. **Rootless:** fuse-overlayfs 필요\r\n\r\n**확인 및 변경:**\r\n```bash\r\n# 현재 드라이버 확인\r\ndocker info | grep \"Storage Driver\"\r\n\r\n# daemon.json으로 변경\r\n{\r\n  \"storage-driver\": \"overlay2\"\r\n}\r\n```",
    "references": [
      {
        "title": "Docker storage drivers",
        "url": "https://docs.docker.com/storage/storagedriver/select-storage-driver/"
      }
    ]
  },
  {
    "id": "DOCKER-100",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "마이크로서비스 아키텍처에서 Docker를 활용할 때의 장점과 주의점을 설명해 주세요.",
    "answer": "**장점:**\r\n\r\n1. **서비스 독립성:**\r\n   - 각 서비스를 독립적인 컨테이너로 패키징\r\n   - 서로 다른 기술 스택 사용 가능\r\n\r\n2. **일관된 환경:**\r\n   - 개발, 테스트, 운영 환경 동일\r\n   - \"내 컴퓨터에서는 되는데\" 문제 해결\r\n\r\n3. **빠른 배포:**\r\n   - 서비스별 독립 배포\r\n   - 롤백 용이\r\n\r\n4. **확장성:**\r\n   - 서비스별 수평 확장\r\n   - 리소스 효율적 사용\r\n\r\n5. **격리:**\r\n   - 서비스 간 영향 최소화\r\n   - 장애 전파 방지\r\n\r\n**주의점:**\r\n\r\n1. **네트워크 복잡성:**\r\n   - 서비스 간 통신 관리\r\n   - 서비스 디스커버리 필요\r\n\r\n2. **데이터 관리:**\r\n   - 볼륨 전략 수립\r\n   - 데이터 일관성\r\n\r\n3. **모니터링:**\r\n   - 분산 로깅 필요\r\n   - 트레이싱 구현\r\n\r\n4. **보안:**\r\n   - 컨테이너 간 통신 암호화\r\n   - 이미지 취약점 관리\r\n\r\n5. **오케스트레이션:**\r\n   - 많은 컨테이너 관리를 위해 K8s/Swarm 고려\r\n\r\n**구조 예시:**\r\n```yaml\r\nservices:\r\n  api-gateway:\r\n    image: gateway:1.0\r\n  user-service:\r\n    image: user-svc:1.0\r\n  order-service:\r\n    image: order-svc:1.0\r\n  db:\r\n    image: postgres:15\r\n```",
    "references": [
      {
        "title": "Docker and Microservices",
        "url": "https://docs.docker.com/get-started/overview/"
      }
    ]
  },
  {
    "id": "K8S-001",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes의 전체 아키텍처를 설명하고, Control Plane과 Worker Node의 역할 차이를 설명해주세요.",
    "answer": "**Control Plane**: 클러스터 상태 관리 및 의사결정 담당 (kube-apiserver, etcd, scheduler, controller-manager)\r\n\r\n**Worker Node**: 실제 Pod 실행 담당 (kubelet, kube-proxy, Container Runtime)\r\n\r\n**핵심 차이**: Control Plane은 \"결정\", Worker Node는 \"실행\"",
    "references": [
      {
        "title": "Kubernetes Components",
        "url": "https://kubernetes.io/docs/concepts/overview/components/"
      }
    ]
  },
  {
    "id": "K8S-002",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Control Plane의 kube-apiserver의 역할과 동작 방식에 대해 설명해주세요. 다른 컴포넌트들과 어떻게 통신하나요?",
    "answer": "**역할**: Kubernetes API를 노출하는 Control Plane의 프론트엔드. 모든 컴포넌트 간 통신의 중심점.\r\n\r\n**동작 방식**:\r\n- RESTful API 제공 (kubectl, 다른 컴포넌트 요청 처리)\r\n- 인증, 인가, Admission Control 수행\r\n- etcd와 직접 통신하는 유일한 컴포넌트\r\n\r\n**통신 방식**: 다른 컴포넌트들은 API Server를 통해서만 상호작용 (Hub-and-Spoke 패턴)",
    "references": [
      {
        "title": "kube-apiserver",
        "url": "https://kubernetes.io/docs/concepts/overview/components/#kube-apiserver"
      }
    ]
  },
  {
    "id": "K8S-003",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes의 etcd의 역할과 중요성에 대해 설명해주세요. 왜 etcd의 백업이 중요한가요?",
    "answer": "**역할**: 클러스터의 모든 상태 데이터를 저장하는 분산 키-값 저장소\r\n\r\n**중요성**:\r\n- 모든 클러스터 설정, Pod/Service 정보, Secret 등 저장\r\n- 고가용성을 위해 Raft 합의 알고리즘 사용\r\n- 강력한 일관성 보장 (linearizable reads)\r\n\r\n**백업이 중요한 이유**: etcd 손실 = 클러스터 전체 상태 손실. 재해 복구를 위해 정기적 백업 필수\r\n\r\n**운영 시 주의사항**:\r\n- 홀수 개 노드 권장 (3, 5, 7) - 쿼럼 유지 위해\r\n- 디스크 I/O 성능 중요 (SSD 권장)\r\n- 네트워크 지연에 민감 (같은 데이터센터 권장)\r\n- API Server만 etcd에 직접 접근해야 함\r\n\r\n**흔한 함정**:\r\n- etcd 복구 시 모든 Control Plane 노드에서 동시 수행 필요\r\n- 스냅샷 복원 후 클러스터 멤버십 재구성 필요할 수 있음\r\n- 백업 없이 업그레이드 시도 (항상 먼저 백업)",
    "references": [
      {
        "title": "etcd",
        "url": "https://kubernetes.io/docs/concepts/overview/components/#etcd"
      }
    ]
  },
  {
    "id": "K8S-004",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes kube-scheduler의 스케줄링 과정을 단계별로 설명해주세요. Filtering과 Scoring 단계는 무엇인가요?",
    "answer": "**스케줄링 과정**:\r\n1. **Filtering (Predicates)**: Pod 실행 가능한 노드 필터링 (리소스, nodeSelector, taint/toleration 등 확인)\r\n2. **Scoring (Priorities)**: 필터링된 노드들에 점수 부여 (리소스 균형, affinity 등 고려)\r\n3. 최고 점수 노드에 Pod 배정 (동점 시 랜덤)\r\n\r\n**Filtering**: \"실행 가능한가?\" - 불가능한 노드 제외\r\n- PodFitsResources, PodFitsHostPorts, MatchNodeSelector 등\r\n\r\n**Scoring**: \"어디가 최적인가?\" - 적합도 점수 계산 (0-100)\r\n- LeastRequestedPriority, BalancedResourceAllocation, NodeAffinityPriority 등\r\n\r\n**흔한 함정**:\r\n| 상황 | 결과 |\r\n|------|------|\r\n| Filtering 통과 노드 0개 | Pod Pending (Unschedulable) |\r\n| 모든 노드 동점 | 랜덤 선택 (예측 불가) |\r\n| nodeSelector 오타 | Filtering 실패로 Pending |\r\n\r\n**디버깅 팁**: `kubectl describe pod`에서 Events의 FailedScheduling 메시지 확인",
    "references": [
      {
        "title": "Kubernetes Scheduler",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/"
      }
    ]
  },
  {
    "id": "K8S-005",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes kube-controller-manager에 포함된 주요 컨트롤러들과 각각의 역할에 대해 설명해주세요.",
    "answer": "**주요 컨트롤러**:\r\n- **Node Controller**: 노드 상태 모니터링, 장애 감지\r\n- **Replication Controller**: ReplicaSet의 Pod 수 유지\r\n- **Endpoints Controller**: Service와 Pod 연결 관리\r\n- **ServiceAccount Controller**: 네임스페이스별 기본 ServiceAccount 생성\r\n- **Deployment Controller**: Deployment 상태 관리\r\n\r\n모든 컨트롤러는 현재 상태를 원하는 상태로 수렴시키는 제어 루프 실행",
    "references": [
      {
        "title": "kube-controller-manager",
        "url": "https://kubernetes.io/docs/concepts/overview/components/#kube-controller-manager"
      }
    ]
  },
  {
    "id": "K8S-006",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes cloud-controller-manager의 역할과 클라우드 프로바이더와의 통합 방식에 대해 설명해주세요.",
    "answer": "**역할**: 클라우드 공급자 전용 로직을 Kubernetes 코어에서 분리하여 관리\r\n\r\n**주요 컨트롤러**:\r\n- **Node Controller**: 클라우드에서 노드 삭제 시 감지\r\n- **Route Controller**: 클라우드 인프라 라우트 설정\r\n- **Service Controller**: LoadBalancer 타입 Service 생성 시 클라우드 로드밸런서 프로비저닝\r\n\r\n**통합 방식**: 각 클라우드 벤더(AWS, GCP, Azure)가 자체 cloud-controller-manager 구현 제공",
    "references": [
      {
        "title": "Cloud Controller Manager",
        "url": "https://kubernetes.io/docs/concepts/overview/components/#cloud-controller-manager"
      }
    ]
  },
  {
    "id": "K8S-007",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Worker Node의 kubelet의 역할과 동작 방식에 대해 설명해주세요. Pod의 상태를 어떻게 관리하나요?",
    "answer": "**역할**: 각 노드에서 실행되며 Pod와 컨테이너 실행을 담당하는 에이전트\r\n\r\n**동작 방식**:\r\n- API Server로부터 PodSpec 수신\r\n- Container Runtime을 통해 컨테이너 생성/관리\r\n- Pod 상태를 주기적으로 API Server에 보고\r\n\r\n**Pod 상태 관리**:\r\n- Liveness/Readiness Probe 실행\r\n- 컨테이너 재시작 정책 적용\r\n- 리소스 사용량 모니터링",
    "references": [
      {
        "title": "kubelet",
        "url": "https://kubernetes.io/docs/concepts/overview/components/#kubelet"
      }
    ]
  },
  {
    "id": "K8S-008",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Worker Node의 kube-proxy의 역할과 iptables/IPVS 모드의 차이점에 대해 설명해주세요.",
    "answer": "**역할**: 노드의 네트워크 규칙 관리, Service의 가상 IP를 통한 Pod 접근 구현\r\n\r\n**iptables 모드** (기본값):\r\n- 리눅스 iptables 규칙으로 트래픽 라우팅\r\n- 랜덤 방식 로드밸런싱\r\n- 규칙이 많아지면 성능 저하 (O(n) 복잡도)\r\n\r\n**IPVS 모드**:\r\n- 커널 레벨 로드밸런서 사용\r\n- 다양한 로드밸런싱 알고리즘 지원 (rr, lc, sh, dh, sed, nq)\r\n- 대규모 클러스터에서 더 나은 성능 (O(1) 복잡도)\r\n\r\n**트레이드오프 비교**:\r\n| 관점 | iptables | IPVS |\r\n|------|----------|------|\r\n| 성능 (Service 수 증가) | 저하됨 | 일정 유지 |\r\n| 설정 복잡도 | 단순 | 추가 커널 모듈 필요 |\r\n| 로드밸런싱 알고리즘 | 랜덤만 | 다양한 선택 |\r\n| 디버깅 용이성 | 익숙함 | 별도 도구 필요 |\r\n| 기본 지원 | 모든 환경 | 커널 지원 확인 필요 |\r\n\r\n**IPVS 권장 상황**:\r\n- 1,000개 이상 Service\r\n- 세션 어피니티 필요 (sh 알고리즘)\r\n- 균등 분배 외 알고리즘 필요\r\n\r\n**주의**: IPVS 모드 사용 시 ipset, ip_vs 커널 모듈 필요",
    "references": [
      {
        "title": "kube-proxy",
        "url": "https://kubernetes.io/docs/concepts/overview/components/#kube-proxy"
      }
    ]
  },
  {
    "id": "K8S-009",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes의 Container Runtime Interface(CRI)란 무엇이며, containerd와 CRI-O의 차이점은 무엇인가요?",
    "answer": "**CRI**: kubelet과 컨테이너 런타임 간의 표준 인터페이스. 다양한 런타임을 플러그인 방식으로 사용 가능\r\n\r\n**containerd**:\r\n- Docker에서 분리된 런타임 (CNCF graduated)\r\n- 범용적, 다양한 기능 제공\r\n- Docker 이미지 호환\r\n- Docker Desktop, EKS, GKE 기본 런타임\r\n\r\n**CRI-O**:\r\n- Kubernetes 전용으로 설계 (CNCF incubating)\r\n- 경량화, 최소 기능만 제공\r\n- OCI 표준 준수에 집중\r\n- OpenShift 기본 런타임\r\n\r\n**공통점**: 둘 다 OCI 표준 준수, Kubernetes와 호환\r\n\r\n**트레이드오프**:\r\n| 관점 | containerd | CRI-O |\r\n|------|-----------|-------|\r\n| 기능 범위 | 광범위 (Docker 생태계) | Kubernetes 필수만 |\r\n| 리소스 사용 | 약간 더 많음 | 더 적음 |\r\n| 커뮤니티 | 더 큼 | Red Hat 중심 |\r\n| 디버깅 도구 | ctr, nerdctl | crictl |\r\n\r\n**참고**: Docker는 Kubernetes 1.24부터 직접 지원 중단 (containerd 사용)",
    "references": [
      {
        "title": "Container Runtime",
        "url": "https://kubernetes.io/docs/setup/production-environment/container-runtimes/"
      }
    ]
  },
  {
    "id": "K8S-010",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes에서 사용되는 CNI(Container Network Interface)란 무엇이며, 주요 CNI 플러그인들을 비교해주세요.",
    "answer": "**CNI**: 컨테이너 네트워크 설정을 위한 표준 인터페이스\r\n\r\n**주요 플러그인 비교**:\r\n| CNI | 특징 | 적합한 환경 |\r\n|-----|------|------------|\r\n| **Calico** | NetworkPolicy, BGP, eBPF 옵션 | 대규모, 보안 중시 |\r\n| **Flannel** | 단순, VXLAN 오버레이 | 소규모, 학습용 |\r\n| **Cilium** | eBPF 기반, L7 정책, 관찰성 | 고성능, 보안 중시 |\r\n| **Weave Net** | 암호화 기본, 간편 설정 | 멀티클라우드 |\r\n| **AWS VPC CNI** | 네이티브 VPC IP | AWS EKS |\r\n| **Azure CNI** | Azure VNET 통합 | AKS |\r\n\r\n**선택 기준**:\r\n- **NetworkPolicy 필요**: Flannel 제외\r\n- **대규모 (1000+ 노드)**: Calico, Cilium\r\n- **L7 정책/관찰성**: Cilium\r\n- **클라우드 네이티브**: 해당 클라우드 CNI\r\n- **단순함 우선**: Flannel (NetworkPolicy 불필요 시)\r\n\r\n**주의**: CNI 변경은 클러스터 재구성 필요 (운영 중 변경 어려움)",
    "references": [
      {
        "title": "Cluster Networking",
        "url": "https://kubernetes.io/docs/concepts/cluster-administration/networking/"
      }
    ]
  },
  {
    "id": "K8S-011",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Pod란 무엇이며, 왜 컨테이너 대신 Pod 단위로 관리하나요?",
    "answer": "**Pod**: Kubernetes에서 배포 가능한 가장 작은 단위. 하나 이상의 컨테이너 그룹\r\n\r\n**Pod 단위 관리 이유**:\r\n- **공유 리소스**: 같은 Pod 내 컨테이너는 네트워크(localhost), 스토리지 공유\r\n- **공동 스케줄링**: 밀접하게 연관된 컨테이너를 같은 노드에 배치\r\n- **생명주기 관리**: 함께 시작/종료되어야 하는 컨테이너 그룹화\r\n- **Sidecar 패턴**: 메인 앱 + 보조 컨테이너 조합 가능",
    "references": [
      {
        "title": "Pods",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/"
      }
    ]
  },
  {
    "id": "K8S-012",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Pod의 생명주기(Lifecycle) 단계(Pending, Running, Succeeded, Failed, Unknown)에 대해 각각 설명해주세요.",
    "answer": "**Pod Phase**:\r\n- **Pending**: Pod 생성됨, 컨테이너 아직 실행 안됨 (이미지 다운로드, 스케줄링 대기)\r\n- **Running**: 최소 하나의 컨테이너 실행 중\r\n- **Succeeded**: 모든 컨테이너 성공적 종료 (exit 0), 재시작 안됨\r\n- **Failed**: 모든 컨테이너 종료, 하나 이상 실패 (exit non-zero)\r\n- **Unknown**: Pod 상태 확인 불가 (노드 통신 문제)",
    "references": [
      {
        "title": "Pod Lifecycle",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/"
      }
    ]
  },
  {
    "id": "K8S-013",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Pod의 재시작 정책(restartPolicy)인 Always, OnFailure, Never의 차이점과 사용 시나리오를 설명해주세요.",
    "answer": "**restartPolicy**:\r\n- **Always** (기본값): 항상 재시작. Deployment, ReplicaSet용\r\n- **OnFailure**: 실패(exit code != 0) 시만 재시작. Job용\r\n- **Never**: 재시작 안함. 일회성 작업용\r\n\r\n**사용 시나리오**:\r\n- Always: 웹 서버, API 서버 등 상시 운영 앱\r\n- OnFailure: 배치 작업, 실패 시 재시도 필요한 Job\r\n- Never: 디버깅, 로그 분석 등 일회성 작업",
    "references": [
      {
        "title": "Pod Lifecycle - Restart Policy",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy"
      }
    ]
  },
  {
    "id": "K8S-014",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Pod가 Pending 상태에 머무는 원인들과 해결 방법을 설명해주세요.",
    "answer": "**주요 원인과 해결 방법**:\r\n- **리소스 부족**: 노드 추가 또는 리소스 요청량 조정\r\n- **nodeSelector/affinity 불일치**: 레이블 확인 및 수정\r\n- **Taint 미허용**: Toleration 추가\r\n- **PVC 바인딩 실패**: PV 확인, StorageClass 점검\r\n- **이미지 다운로드 지연**: 이미지 경로/권한 확인\r\n\r\n**디버깅 순서**:\r\n1. `kubectl describe pod <pod-name>` - Events 섹션 확인\r\n2. `kubectl get events --sort-by='.lastTimestamp'` - 최근 이벤트 확인\r\n3. Conditions 섹션의 상세 메시지 확인\r\n\r\n**흔한 함정**:\r\n| 증상 | 실제 원인 | 확인 방법 |\r\n|------|----------|----------|\r\n| Pending 지속 | Scheduler가 없음 | kube-scheduler Pod 확인 |\r\n| Pending + 이벤트 없음 | resourceQuota 초과 | kubectl describe resourcequota |\r\n| ImagePullBackOff와 혼동 | 이미지 문제는 Pending이 아님 | Events에서 구분 |\r\n\r\n**팁**: `kubectl get pod <name> -o yaml | grep -A 5 conditions` 로 상세 조건 확인",
    "references": [
      {
        "title": "Debugging Pods",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/"
      }
    ]
  },
  {
    "id": "K8S-015",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes의 Pod Phase와 Container State의 차이점은 무엇인가요?",
    "answer": "**Pod Phase**: Pod 전체의 상태 (Pending, Running, Succeeded, Failed, Unknown)\r\n\r\n**Container State**: 개별 컨테이너의 상태\r\n- **Waiting**: 시작 대기 (이미지 pull, 볼륨 마운트 등)\r\n- **Running**: 실행 중\r\n- **Terminated**: 종료됨 (성공/실패)\r\n\r\n**차이점**:\r\n- Pod Phase는 상위 레벨 요약\r\n- Container State는 각 컨테이너의 세부 상태\r\n- Pod Running이어도 일부 컨테이너는 Waiting/Terminated일 수 있음",
    "references": [
      {
        "title": "Container States",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-states"
      }
    ]
  },
  {
    "id": "K8S-016",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Sidecar 패턴이란 무엇이며, 어떤 상황에서 사용하나요? 구체적인 예시를 들어주세요.",
    "answer": "**Sidecar 패턴**: 메인 컨테이너와 함께 보조 기능을 수행하는 컨테이너를 같은 Pod에 배치\r\n\r\n**사용 상황**:\r\n- 로깅: 로그 수집/전송 (Fluentd sidecar)\r\n- 모니터링: 메트릭 수집 (Prometheus exporter)\r\n- 프록시: 서비스 메시 (Envoy sidecar)\r\n- 설정 동기화: ConfigMap 변경 감지\r\n\r\n**예시**: 웹 서버 + 로그 수집기\r\n- 메인: nginx 컨테이너\r\n- Sidecar: fluentd 컨테이너 (로그 파일 읽어서 전송)\r\n- 공유 볼륨으로 로그 파일 공유",
    "references": [
      {
        "title": "Sidecar Containers",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/"
      }
    ]
  },
  {
    "id": "K8S-017",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes의 Ambassador 패턴이란 무엇이며, 프록시 역할을 하는 컨테이너의 활용 사례를 설명해주세요.",
    "answer": "**Ambassador 패턴**: 외부 서비스 접근을 대리하는 프록시 컨테이너 패턴\r\n\r\n**역할**: 메인 컨테이너가 localhost로 통신하면, Ambassador가 외부 서비스로 연결\r\n\r\n**활용 사례**:\r\n- **DB 연결 프록시**: 메인앱 -> localhost:5432 -> Ambassador -> 실제 DB 클러스터\r\n- **API Gateway**: 인증, 속도 제한 처리\r\n- **서비스 디스커버리**: 복잡한 라우팅 로직 캡슐화\r\n- **레거시 시스템 연동**: 프로토콜 변환\r\n\r\n**장점**: 메인 앱 코드 변경 없이 외부 연결 로직 분리",
    "references": [
      {
        "title": "Multi-container Pods",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/#how-pods-manage-multiple-containers"
      }
    ]
  },
  {
    "id": "K8S-018",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes의 Adapter 패턴이란 무엇이며, 로그 포맷 변환 등의 활용 사례를 설명해주세요.",
    "answer": "**Adapter 패턴**: 메인 컨테이너의 출력을 표준 형식으로 변환하는 컨테이너 패턴\r\n\r\n**역할**: 다양한 형식의 데이터를 통일된 인터페이스로 변환\r\n\r\n**활용 사례**:\r\n- **로그 포맷 변환**: 앱별 로그 형식 -> 표준 JSON 형식\r\n- **메트릭 변환**: 앱 메트릭 -> Prometheus 형식\r\n- **데이터 정규화**: 레거시 시스템 출력 변환\r\n- **프로토콜 변환**: XML -> JSON\r\n\r\n**예시**: 로그 어댑터\r\n- 메인: 자체 로그 형식 출력\r\n- Adapter: 로그 파일 읽어서 표준 JSON으로 변환 후 출력",
    "references": [
      {
        "title": "Multi-container Pods",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/#how-pods-manage-multiple-containers"
      }
    ]
  },
  {
    "id": "K8S-019",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Init Container의 역할과 일반 컨테이너와의 차이점을 설명해주세요.",
    "answer": "**역할**: Pod 내 메인 컨테이너 시작 전에 초기화 작업 수행\r\n\r\n**일반 컨테이너와의 차이점**:\r\n| 구분 | Init Container | 일반 컨테이너 |\r\n|------|----------------|---------------|\r\n| 실행 시점 | 메인 컨테이너 전 | Init 완료 후 |\r\n| 실행 방식 | 순차적 (하나씩) | 동시 (병렬) |\r\n| 완료 조건 | 반드시 성공 종료 | 계속 실행 |\r\n| Probe | 지원 안함 | 지원 |\r\n| 리소스 계산 | 가장 큰 것만 | 합계 |\r\n\r\n**사용 예시**:\r\n- DB 연결 대기 (의존성 확인)\r\n- 설정 파일 다운로드\r\n- 권한/스키마 초기화\r\n- 보안 검사, 인증서 설정\r\n\r\n**Kubernetes 1.28+ Sidecar Container**:\r\n- `restartPolicy: Always`를 가진 Init Container\r\n- Init 완료 후에도 계속 실행\r\n- 기존 Sidecar 패턴의 공식 지원\r\n\r\n**흔한 함정**:\r\n- Init Container 무한 루프 시 Pod 시작 불가\r\n- 외부 의존성 timeout 미설정 시 무한 대기\r\n- Init Container도 imagePullPolicy 적용됨",
    "references": [
      {
        "title": "Init Containers",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/init-containers/"
      }
    ]
  },
  {
    "id": "K8S-020",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Init Container의 실행 순서와 실패 시 동작에 대해 설명해주세요.",
    "answer": "**실행 순서**:\r\n1. Init Container들이 정의된 순서대로 순차 실행\r\n2. 각 Init Container는 이전 것이 성공해야 시작\r\n3. 모든 Init Container 성공 후 메인 컨테이너 시작\r\n\r\n**실패 시 동작**:\r\n- Init Container 실패 -> Pod 재시작 (restartPolicy에 따라)\r\n- restartPolicy: Always/OnFailure -> Init Container부터 재실행\r\n- restartPolicy: Never -> Pod Failed 상태\r\n\r\n**주의사항**:\r\n- Init Container 실패 시 Pod는 Pending 상태 유지\r\n- 무한 재시도로 CrashLoopBackOff 발생 가능",
    "references": [
      {
        "title": "Init Containers",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/init-containers/#detailed-behavior"
      }
    ]
  },
  {
    "id": "K8S-021",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Deployment의 역할과 ReplicaSet과의 관계에 대해 설명해주세요.",
    "answer": "**Deployment 역할**:\r\n- 선언적 Pod 업데이트 관리\r\n- 롤링 업데이트, 롤백 지원\r\n- 배포 이력 관리\r\n\r\n**ReplicaSet과의 관계**:\r\n- Deployment는 ReplicaSet을 생성하고 관리\r\n- ReplicaSet은 Pod 복제본 수 유지\r\n- 업데이트 시 새 ReplicaSet 생성, 기존 것은 스케일 다운\r\n\r\n**구조**: `Deployment -> ReplicaSet -> Pod`\r\n\r\n**직접 ReplicaSet 사용하지 않는 이유**: Deployment가 버전 관리, 롤백 등 추가 기능 제공",
    "references": [
      {
        "title": "Deployments",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
      }
    ]
  },
  {
    "id": "K8S-022",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Deployment의 배포 전략(RollingUpdate, Recreate)을 비교하고, 각각의 사용 시나리오를 설명해주세요.",
    "answer": "**RollingUpdate** (기본값):\r\n- 점진적으로 새 버전 배포\r\n- 다운타임 없음\r\n- 두 버전이 동시에 존재하는 시간 있음\r\n\r\n**Recreate**:\r\n- 기존 Pod 모두 종료 후 새 Pod 생성\r\n- 다운타임 발생\r\n- 버전 혼재 없음\r\n\r\n**트레이드오프 비교**:\r\n| 관점 | RollingUpdate | Recreate |\r\n|------|--------------|----------|\r\n| 다운타임 | 없음 | 있음 (수초~수분) |\r\n| 리소스 사용 | 일시적 증가 (신/구 공존) | 일정 |\r\n| 버전 호환성 | 두 버전 공존 처리 필요 | 불필요 |\r\n| 롤백 속도 | 빠름 (이전 ReplicaSet 유지) | 느림 (재배포) |\r\n| 데이터 마이그레이션 | 복잡 (양방향 호환 필요) | 단순 |\r\n\r\n**사용 시나리오**:\r\n- RollingUpdate: 일반적인 웹 서비스, API 서버\r\n- Recreate:\r\n  - RWO 볼륨을 단일 Pod만 사용해야 할 때\r\n  - 버전 간 호환성 문제가 있을 때 (DB 스키마 변경)\r\n  - 개발/테스트 환경\r\n  - 리소스 여유가 없을 때\r\n\r\n**주의**: RollingUpdate 시 API 버전 호환성 (backward/forward compatibility) 설계 필수",
    "references": [
      {
        "title": "Deployment Strategy",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#strategy"
      }
    ]
  },
  {
    "id": "K8S-023",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes RollingUpdate 전략에서 maxSurge와 maxUnavailable 설정의 의미와 적절한 값 설정 방법을 설명해주세요.",
    "answer": "**maxSurge**: 원하는 Pod 수 대비 최대 초과 생성 가능 수\r\n- 예: replicas=10, maxSurge=25% -> 최대 12개까지 존재 가능\r\n\r\n**maxUnavailable**: 업데이트 중 최대 사용 불가 Pod 수\r\n- 예: replicas=10, maxUnavailable=25% -> 최소 7개는 항상 가용\r\n\r\n**적절한 설정**:\r\n- 빠른 배포: maxSurge 높게, maxUnavailable 높게\r\n- 안정적 배포: maxSurge 낮게, maxUnavailable=0\r\n- 리소스 제한: maxSurge=0, maxUnavailable 활용\r\n\r\n**기본값**: 둘 다 25%",
    "references": [
      {
        "title": "Rolling Update Deployment",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update-deployment"
      }
    ]
  },
  {
    "id": "K8S-024",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Deployment의 롤백(rollback) 방법과 revision history 관리에 대해 설명해주세요.",
    "answer": "**롤백 방법**:\r\n```bash\r\n# 이전 버전으로 롤백\r\nkubectl rollout undo deployment/<name>\r\n\r\n# 특정 리비전으로 롤백\r\nkubectl rollout undo deployment/<name> --to-revision=2\r\n\r\n# 이력 확인\r\nkubectl rollout history deployment/<name>\r\n```\r\n\r\n**Revision History 관리**:\r\n- `revisionHistoryLimit`: 보관할 ReplicaSet 수 (기본값 10)\r\n- 각 업데이트마다 새 ReplicaSet 생성, 기존 것은 보관\r\n- 이력에서 롤백 가능",
    "references": [
      {
        "title": "Rolling Back a Deployment",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment"
      }
    ]
  },
  {
    "id": "K8S-025",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Blue-Green 배포와 Canary 배포를 Kubernetes에서 구현하는 방법을 설명해주세요.",
    "answer": "**Blue-Green 배포**:\r\n1. 두 개의 Deployment 생성 (blue, green)\r\n2. Service selector로 하나만 활성화\r\n3. 전환 시 Service selector 변경\r\n```yaml\r\n# Service selector를 version: green으로 변경\r\nselector:\r\n  app: myapp\r\n  version: green\r\n```\r\n\r\n**Canary 배포**:\r\n1. 기존 Deployment + 새 버전 Deployment (적은 replicas)\r\n2. 동일한 label로 Service가 둘 다 선택\r\n3. 점진적으로 새 버전 replicas 증가\r\n\r\n**고급 방법**: Istio VirtualService로 트래픽 비율 제어",
    "references": [
      {
        "title": "Deployments",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
      }
    ]
  },
  {
    "id": "K8S-026",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "StatefulSet이란 무엇이며, Deployment와의 차이점을 설명해주세요.",
    "answer": "**StatefulSet**: 상태를 가진 애플리케이션을 위한 워크로드 리소스\r\n\r\n**Deployment와의 차이점**:\r\n| 구분 | StatefulSet | Deployment |\r\n|------|-------------|------------|\r\n| Pod 이름 | 고정 (app-0, app-1) | 랜덤 |\r\n| 네트워크 ID | 고정 (Headless Service) | 변경 가능 |\r\n| 스토리지 | Pod별 PVC 유지 | 공유 또는 없음 |\r\n| 배포 순서 | 순차적 | 병렬 |\r\n| 삭제 순서 | 역순 | 무관 |\r\n\r\n**트레이드오프 고려사항**:\r\n| 관점 | StatefulSet 선택 | Deployment 선택 |\r\n|------|-----------------|----------------|\r\n| 복잡도 | 높음 (Headless Service, PVC 관리) | 낮음 |\r\n| 스케일링 속도 | 느림 (순차적) | 빠름 (병렬) |\r\n| 복구 시간 | 느림 (순서 보장) | 빠름 |\r\n| 데이터 지속성 | 보장 (PVC 유지) | 별도 설계 필요 |\r\n\r\n**StatefulSet 사용 시 주의점**:\r\n- Headless Service 필수 (clusterIP: None)\r\n- StatefulSet 삭제해도 PVC는 자동 삭제 안됨 (데이터 보호)\r\n- 롤링 업데이트 시 역순(N-1 → 0)으로 진행\r\n- Pod 재생성 시 같은 노드 보장 안됨 (PV 접근 가능해야 함)\r\n\r\n**사용 사례**: 데이터베이스, 분산 시스템 (Kafka, ZooKeeper, Elasticsearch)",
    "references": [
      {
        "title": "StatefulSets",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/"
      }
    ]
  },
  {
    "id": "K8S-027",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes StatefulSet에서 Pod 이름과 네트워크 ID의 안정성(stable identity)은 어떻게 보장되나요?",
    "answer": "**Pod 이름 안정성**:\r\n- 형식: `<statefulset-name>-<ordinal>` (예: mysql-0, mysql-1)\r\n- Pod 재생성 시에도 동일한 이름 유지\r\n- ordinal은 0부터 순차 증가\r\n\r\n**네트워크 ID 안정성**:\r\n- Headless Service와 함께 사용\r\n- DNS: `<pod-name>.<service-name>.<namespace>.svc.cluster.local`\r\n- 예: `mysql-0.mysql.default.svc.cluster.local`\r\n\r\n**보장 방법**:\r\n- StatefulSet Controller가 ordinal 기반 관리\r\n- Pod 삭제/재생성 시 동일 이름과 PVC 재연결",
    "references": [
      {
        "title": "Stable Network ID",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-network-id"
      }
    ]
  },
  {
    "id": "K8S-028",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes StatefulSet의 순차적 배포(ordered deployment)와 병렬 배포(parallel deployment) 방식의 차이를 설명해주세요.",
    "answer": "**podManagementPolicy 설정**:\r\n\r\n**OrderedReady** (기본값):\r\n- Pod를 순서대로 생성 (0 -> 1 -> 2)\r\n- 이전 Pod가 Ready 상태여야 다음 생성\r\n- 삭제는 역순 (2 -> 1 -> 0)\r\n- 사용: 마스터-슬레이브 DB, 리더 선출 시스템\r\n\r\n**Parallel**:\r\n- 모든 Pod 동시 생성/삭제\r\n- 순서 보장 불필요 시 사용\r\n- 더 빠른 스케일링\r\n\r\n```yaml\r\nspec:\r\n  podManagementPolicy: Parallel  # 또는 OrderedReady\r\n```",
    "references": [
      {
        "title": "Pod Management Policies",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#pod-management-policies"
      }
    ]
  },
  {
    "id": "K8S-029",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes StatefulSet에서 PersistentVolumeClaim 템플릿의 역할과 동작 방식을 설명해주세요.",
    "answer": "**역할**: 각 Pod에 대해 개별 PVC 자동 생성\r\n\r\n**동작 방식**:\r\n1. Pod 생성 시 volumeClaimTemplates 기반으로 PVC 생성\r\n2. PVC 이름: `<template-name>-<statefulset-name>-<ordinal>`\r\n3. Pod와 PVC 영구 연결\r\n\r\n**특징**:\r\n- Pod 삭제 시 PVC는 유지됨\r\n- Pod 재생성 시 기존 PVC 재연결\r\n- StatefulSet 삭제 시에도 PVC 수동 삭제 필요\r\n\r\n```yaml\r\nvolumeClaimTemplates:\r\n- metadata:\r\n    name: data\r\n  spec:\r\n    accessModes: [\"ReadWriteOnce\"]\r\n    resources:\r\n      requests:\r\n        storage: 10Gi\r\n```",
    "references": [
      {
        "title": "Stable Storage",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-storage"
      }
    ]
  },
  {
    "id": "K8S-030",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes StatefulSet 사용 시 Headless Service가 필요한 이유를 설명해주세요.",
    "answer": "**Headless Service**: ClusterIP가 None인 Service\r\n\r\n**필요한 이유**:\r\n1. **개별 Pod 접근**: 각 Pod에 고유 DNS 이름 부여\r\n   - 일반 Service: 로드밸런싱으로 임의 Pod 접근\r\n   - Headless: 특정 Pod 직접 접근 가능\r\n\r\n2. **DNS 레코드 생성**:\r\n   - `pod-name.service-name.namespace.svc.cluster.local`\r\n   - 클라이언트가 특정 인스턴스에 연결 필요 시 사용\r\n\r\n3. **상태 저장 앱 요구사항**:\r\n   - DB 복제 시 마스터/슬레이브 구분 필요\r\n   - 클러스터 멤버 간 직접 통신",
    "references": [
      {
        "title": "Headless Services",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/#headless-services"
      }
    ]
  },
  {
    "id": "K8S-031",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "DaemonSet의 역할과 사용 사례(로그 수집, 모니터링 에이전트 등)를 설명해주세요.",
    "answer": "**역할**: 모든(또는 특정) 노드에서 Pod를 하나씩 실행하도록 보장\r\n\r\n**동작**:\r\n- 노드 추가 시 자동으로 Pod 생성\r\n- 노드 삭제 시 자동으로 Pod 제거\r\n\r\n**사용 사례**:\r\n- **로그 수집**: Fluentd, Filebeat (각 노드 로그 수집)\r\n- **모니터링**: Node Exporter, Datadog Agent\r\n- **네트워킹**: CNI 플러그인 (Calico, Weave)\r\n- **스토리지**: CSI 드라이버\r\n- **보안**: 보안 에이전트, 안티바이러스",
    "references": [
      {
        "title": "DaemonSet",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/"
      }
    ]
  },
  {
    "id": "K8S-032",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes DaemonSet에서 특정 노드에만 Pod를 배포하는 방법을 설명해주세요.",
    "answer": "**방법 1: nodeSelector**\r\n```yaml\r\nspec:\r\n  template:\r\n    spec:\r\n      nodeSelector:\r\n        disk: ssd\r\n```\r\n\r\n**방법 2: Node Affinity**\r\n```yaml\r\nspec:\r\n  template:\r\n    spec:\r\n      affinity:\r\n        nodeAffinity:\r\n          requiredDuringSchedulingIgnoredDuringExecution:\r\n            nodeSelectorTerms:\r\n            - matchExpressions:\r\n              - key: node-type\r\n                operator: In\r\n                values: [\"worker\"]\r\n```\r\n\r\n**방법 3: Toleration** (Taint된 노드에 배포)\r\n```yaml\r\nspec:\r\n  template:\r\n    spec:\r\n      tolerations:\r\n      - key: \"node-role\"\r\n        operator: \"Equal\"\r\n        value: \"special\"\r\n        effect: \"NoSchedule\"\r\n```",
    "references": [
      {
        "title": "DaemonSet on specific Nodes",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/#running-pods-on-select-nodes"
      }
    ]
  },
  {
    "id": "K8S-033",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Job 리소스의 역할과 completions, parallelism 설정의 의미를 설명해주세요.",
    "answer": "**역할**: 하나 이상의 Pod를 생성하고 지정된 수만큼 성공적으로 완료되도록 보장\r\n\r\n**설정값**:\r\n- **completions**: 성공해야 하는 Pod 수 (기본값: 1)\r\n- **parallelism**: 동시에 실행할 Pod 수 (기본값: 1)\r\n\r\n**예시**:\r\n```yaml\r\nspec:\r\n  completions: 5    # 5개 작업 완료 필요\r\n  parallelism: 2    # 동시에 2개씩 실행\r\n```\r\n\r\n**동작 패턴**:\r\n- completions=1, parallelism=1: 단일 작업\r\n- completions=N, parallelism=1: 순차 실행\r\n- completions=N, parallelism=M: 병렬 배치",
    "references": [
      {
        "title": "Jobs",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/job/"
      }
    ]
  },
  {
    "id": "K8S-034",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Job의 backoffLimit와 activeDeadlineSeconds 설정의 역할을 설명해주세요.",
    "answer": "**backoffLimit**:\r\n- Job 실패 시 재시도 횟수 (기본값: 6)\r\n- 재시도 간격: 지수 백오프 (10s, 20s, 40s... 최대 6분)\r\n- 초과 시 Job Failed 상태\r\n\r\n**activeDeadlineSeconds**:\r\n- Job의 최대 실행 시간 (초)\r\n- 시간 초과 시 모든 Pod 종료, Job Failed\r\n- backoffLimit보다 우선\r\n\r\n```yaml\r\nspec:\r\n  backoffLimit: 4           # 4번 재시도\r\n  activeDeadlineSeconds: 600 # 최대 10분\r\n```\r\n\r\n**사용 시나리오**:\r\n- 무한 루프 방지\r\n- SLA 준수를 위한 타임아웃 설정",
    "references": [
      {
        "title": "Job Termination",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/job/#job-termination-and-cleanup"
      }
    ]
  },
  {
    "id": "K8S-035",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes CronJob의 역할과 스케줄 표현식, concurrencyPolicy 설정에 대해 설명해주세요.",
    "answer": "**역할**: 지정된 스케줄에 따라 Job을 반복 생성\r\n\r\n**스케줄 표현식** (Cron 형식):\r\n```\r\n분 시 일 월 요일\r\n*/5 * * * *    # 5분마다\r\n0 2 * * *      # 매일 2시\r\n0 0 1 * *      # 매월 1일 자정\r\n```\r\n\r\n**concurrencyPolicy**:\r\n- **Allow** (기본값): 동시 실행 허용\r\n- **Forbid**: 이전 Job 실행 중이면 새 Job 건너뜀\r\n- **Replace**: 이전 Job 취소하고 새 Job 시작\r\n\r\n```yaml\r\nspec:\r\n  schedule: \"0 * * * *\"\r\n  concurrencyPolicy: Forbid\r\n  successfulJobsHistoryLimit: 3\r\n  failedJobsHistoryLimit: 1\r\n```",
    "references": [
      {
        "title": "CronJob",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/"
      }
    ]
  },
  {
    "id": "K8S-036",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Service의 역할과 필요성에 대해 설명해주세요.",
    "answer": "**역할**: Pod 집합에 대한 단일 접근점 제공 및 로드밸런싱\r\n\r\n**필요성**:\r\n1. **Pod IP 변동성**: Pod 재생성 시 IP 변경됨\r\n2. **서비스 디스커버리**: 안정적인 DNS 이름 제공\r\n3. **로드밸런싱**: 여러 Pod에 트래픽 분산\r\n4. **추상화**: 백엔드 Pod 변경에도 클라이언트 영향 없음\r\n\r\n**동작 방식**:\r\n- Label Selector로 대상 Pod 그룹 지정\r\n- ClusterIP (가상 IP) 할당\r\n- kube-proxy가 트래픽 라우팅 규칙 관리",
    "references": [
      {
        "title": "Service",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/"
      }
    ]
  },
  {
    "id": "K8S-037",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes ClusterIP 타입 Service의 동작 방식과 사용 시나리오를 설명해주세요.",
    "answer": "**동작 방식**:\r\n- 클러스터 내부에서만 접근 가능한 가상 IP 할당\r\n- kube-proxy가 ClusterIP로 오는 트래픽을 Pod로 라우팅\r\n- DNS: `<service-name>.<namespace>.svc.cluster.local`\r\n\r\n**특징**:\r\n- 기본 Service 타입\r\n- 외부에서 직접 접근 불가\r\n- 클러스터 내 Pod 간 통신용\r\n\r\n**장점**:\r\n- 가장 단순하고 안전한 옵션\r\n- 외부 노출이 없어 보안에 유리\r\n- 리소스 오버헤드 최소\r\n\r\n**단점/제한**:\r\n- 외부 접근 불가 (kubectl port-forward로 디버깅 가능)\r\n- 클러스터 외부 클라이언트는 사용 불가\r\n\r\n**사용 시나리오**:\r\n- 내부 마이크로서비스 간 통신\r\n- 백엔드 DB 접근\r\n- 캐시 서버 (Redis) 접근\r\n- 내부 API 서비스",
    "references": [
      {
        "title": "ClusterIP",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/#type-clusterip"
      }
    ]
  },
  {
    "id": "K8S-038",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes NodePort 타입 Service의 동작 방식과 포트 범위 제한에 대해 설명해주세요.",
    "answer": "**동작 방식**:\r\n1. ClusterIP 기능 포함\r\n2. 모든 노드의 특정 포트에서 Service 노출\r\n3. `<NodeIP>:<NodePort>`로 외부 접근 가능\r\n4. 트래픽: NodePort -> ClusterIP -> Pod\r\n\r\n**포트 범위**:\r\n- 기본: 30000-32767\r\n- kube-apiserver `--service-node-port-range` 플래그로 변경 가능\r\n\r\n**장점**:\r\n- 클라우드 로드밸런서 없이 외부 노출 가능\r\n- 비용 없음 (추가 인프라 불필요)\r\n- 온프레미스 환경에서 유용\r\n\r\n**단점/제한**:\r\n- 노드 IP 직접 노출 (보안 위험)\r\n- 노드당 하나의 포트만 사용 가능\r\n- 노드 장애 시 해당 노드로의 접근 불가 (클라이언트가 다른 노드 IP 알아야 함)\r\n- 포트 범위 제한 (30000-32767)\r\n- Well-known 포트 (80, 443) 사용 불가\r\n\r\n**사용 시나리오**:\r\n- 개발/테스트 환경\r\n- 로드밸런서 없는 온프레미스 환경\r\n- 외부 로드밸런서와 연동\r\n\r\n**실제 운영 고려사항**:\r\n- 프로덕션에서는 앞단에 로드밸런서 배치 권장\r\n- externalTrafficPolicy: Local 설정 시 클라이언트 IP 보존 가능 (단, 트래픽 불균형 가능)",
    "references": [
      {
        "title": "NodePort",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport"
      }
    ]
  },
  {
    "id": "K8S-039",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes LoadBalancer 타입 Service의 동작 방식과 클라우드 환경에서의 프로비저닝 과정을 설명해주세요.",
    "answer": "**동작 방식**:\r\n1. NodePort 기능 포함\r\n2. 클라우드 로드밸런서 자동 프로비저닝\r\n3. 외부 IP 할당\r\n4. 트래픽: External LB -> NodePort -> ClusterIP -> Pod\r\n\r\n**프로비저닝 과정**:\r\n1. Service 생성 시 cloud-controller-manager가 감지\r\n2. 클라우드 API 호출하여 LB 생성 (AWS ELB, GCP LB 등)\r\n3. LB가 NodePort로 트래픽 전달하도록 설정\r\n4. External IP가 Service에 할당\r\n\r\n**장점**:\r\n- 단일 외부 IP로 서비스 노출\r\n- 클라우드 네이티브 로드밸런싱 (헬스체크, SSL 종료 등)\r\n- 노드 장애에도 자동 페일오버\r\n- Well-known 포트 (80, 443) 사용 가능\r\n\r\n**단점/제한**:\r\n- Service당 로드밸런서 1개 = 비용 증가\r\n- 클라우드 환경 의존적\r\n- 프로비저닝 시간 필요 (수십 초 ~ 수 분)\r\n- L4 로드밸런서 (HTTP 라우팅 불가)\r\n\r\n**비용 최적화 팁**:\r\n- 여러 서비스 노출 시 Ingress 사용 권장 (LB 1개로 여러 서비스)\r\n- 내부 전용 서비스는 ClusterIP 사용\r\n\r\n**주의사항**:\r\n- 클라우드 환경에서만 동작\r\n- LB당 비용 발생\r\n- 온프레미스는 MetalLB 등 별도 솔루션 필요",
    "references": [
      {
        "title": "LoadBalancer",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer"
      }
    ]
  },
  {
    "id": "K8S-040",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes ExternalName 타입 Service의 역할과 사용 사례를 설명해주세요.",
    "answer": "**역할**: 외부 DNS 이름을 클러스터 내부 Service 이름으로 매핑 (CNAME 레코드)\r\n\r\n**동작 방식**:\r\n- ClusterIP 할당 없음\r\n- DNS 쿼리 시 외부 도메인으로 CNAME 반환\r\n- 프록시나 포워딩 없이 DNS 레벨 리디렉션\r\n\r\n```yaml\r\napiVersion: v1\r\nkind: Service\r\nmetadata:\r\n  name: external-db\r\nspec:\r\n  type: ExternalName\r\n  externalName: db.example.com\r\n```\r\n\r\n**사용 사례**:\r\n- 외부 데이터베이스 연결 (RDS, Cloud SQL)\r\n- 외부 API 서비스 추상화\r\n- 마이그레이션 중 외부 서비스 참조\r\n- 환경별 외부 서비스 전환",
    "references": [
      {
        "title": "ExternalName",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/#externalname"
      }
    ]
  },
  {
    "id": "K8S-041",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Headless Service란 무엇이며, StatefulSet과 함께 사용되는 이유를 설명해주세요.",
    "answer": "**Headless Service**: `clusterIP: None`으로 설정된 Service\r\n\r\n**특징**:\r\n- ClusterIP 할당 없음\r\n- DNS 쿼리 시 Pod IP들 직접 반환\r\n- 로드밸런싱 없이 개별 Pod 접근\r\n\r\n**StatefulSet과 함께 사용하는 이유**:\r\n1. **개별 Pod DNS**: `pod-name.service.namespace.svc.cluster.local`\r\n2. **안정적 네트워크 ID**: Pod 이름 기반 DNS로 재시작 후에도 동일\r\n3. **직접 통신**: 클러스터 멤버 간 피어 통신 필요 (DB 복제)\r\n4. **클라이언트 제어**: 클라이언트가 특정 인스턴스 선택 가능\r\n\r\n**예**: Kafka 브로커, MySQL 마스터/슬레이브 구분",
    "references": [
      {
        "title": "Headless Services",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/#headless-services"
      }
    ]
  },
  {
    "id": "K8S-042",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Ingress의 역할과 Service와의 차이점을 설명해주세요.",
    "answer": "**Ingress 역할**: HTTP/HTTPS 트래픽을 클러스터 내부 Service로 라우팅하는 API 객체\r\n\r\n**Service와의 차이점**:\r\n| 구분 | Ingress | Service (LB) |\r\n|------|---------|--------------|\r\n| 프로토콜 | HTTP/HTTPS | L4 (TCP/UDP) |\r\n| 라우팅 | 호스트/경로 기반 | 포트 기반 |\r\n| SSL 종료 | 지원 | 별도 설정 필요 |\r\n| 단일 진입점 | 여러 Service 통합 | Service당 하나 |\r\n| 비용 | LB 하나로 여러 서비스 | Service마다 LB |\r\n\r\n**Ingress 기능**:\r\n- 경로 기반 라우팅 (`/api`, `/web`)\r\n- 호스트 기반 라우팅 (`api.example.com`)\r\n- TLS/SSL 종료\r\n\r\n**트레이드오프 - Ingress vs LoadBalancer Service**:\r\n| 상황 | Ingress 선택 | LoadBalancer 선택 |\r\n|------|-------------|------------------|\r\n| HTTP/HTTPS 서비스 | O | - |\r\n| TCP/UDP 서비스 (DB, gRPC) | X | O |\r\n| 여러 서비스 통합 | O | - |\r\n| 단일 서비스 노출 | - | O (단순) |\r\n| 비용 최적화 | O | - |\r\n| L4 기능 필요 | - | O |\r\n\r\n**주의사항**:\r\n- Ingress 리소스만으로는 동작 안함 - Ingress Controller 필수\r\n- 비-HTTP 프로토콜은 Ingress로 처리 불가",
    "references": [
      {
        "title": "Ingress",
        "url": "https://kubernetes.io/docs/concepts/services-networking/ingress/"
      }
    ]
  },
  {
    "id": "K8S-043",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Ingress Controller의 역할과 주요 구현체(NGINX, Traefik, HAProxy 등)를 비교해주세요.",
    "answer": "**역할**: Ingress 리소스를 감시하고 실제 라우팅 규칙을 구현하는 컨트롤러\r\n\r\n**주요 구현체 비교**:\r\n| 구현체 | 특징 |\r\n|--------|------|\r\n| **NGINX** | 가장 널리 사용, 안정적, 풍부한 기능 |\r\n| **Traefik** | 자동 설정, Let's Encrypt 통합, 경량 |\r\n| **HAProxy** | 고성능, 엔터프라이즈급 로드밸런싱 |\r\n| **Contour** | Envoy 기반, 멀티테넌트 지원 |\r\n| **AWS ALB** | AWS 통합, 네이티브 ALB 사용 |\r\n\r\n**선택 기준**:\r\n- 성능 요구사항\r\n- 필요한 기능 (mTLS, 속도 제한)\r\n- 클라우드 환경\r\n- 운영 복잡도",
    "references": [
      {
        "title": "Ingress Controllers",
        "url": "https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/"
      }
    ]
  },
  {
    "id": "K8S-044",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Ingress에서 호스트 기반 라우팅과 경로 기반 라우팅을 설정하는 방법을 설명해주세요.",
    "answer": "**호스트 기반 라우팅**:\r\n```yaml\r\nspec:\r\n  rules:\r\n  - host: api.example.com\r\n    http:\r\n      paths:\r\n      - path: /\r\n        pathType: Prefix\r\n        backend:\r\n          service:\r\n            name: api-service\r\n            port:\r\n              number: 80\r\n  - host: web.example.com\r\n    http:\r\n      paths:\r\n      - backend:\r\n          service:\r\n            name: web-service\r\n```\r\n\r\n**경로 기반 라우팅**:\r\n```yaml\r\nspec:\r\n  rules:\r\n  - host: example.com\r\n    http:\r\n      paths:\r\n      - path: /api\r\n        pathType: Prefix\r\n        backend:\r\n          service:\r\n            name: api-service\r\n            port:\r\n              number: 80\r\n      - path: /web\r\n        pathType: Prefix\r\n        backend:\r\n          service:\r\n            name: web-service\r\n```\r\n\r\n**pathType**: Exact, Prefix, ImplementationSpecific",
    "references": [
      {
        "title": "Ingress Rules",
        "url": "https://kubernetes.io/docs/concepts/services-networking/ingress/#ingress-rules"
      }
    ]
  },
  {
    "id": "K8S-045",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Ingress에서 TLS/SSL 인증서를 설정하는 방법과 cert-manager와의 연동에 대해 설명해주세요.",
    "answer": "**수동 TLS 설정**:\r\n```yaml\r\napiVersion: v1\r\nkind: Secret\r\nmetadata:\r\n  name: tls-secret\r\ntype: kubernetes.io/tls\r\ndata:\r\n  tls.crt: <base64-cert>\r\n  tls.key: <base64-key>\r\n---\r\napiVersion: networking.k8s.io/v1\r\nkind: Ingress\r\nspec:\r\n  tls:\r\n  - hosts:\r\n    - example.com\r\n    secretName: tls-secret\r\n```\r\n\r\n**cert-manager 연동**:\r\n```yaml\r\napiVersion: networking.k8s.io/v1\r\nkind: Ingress\r\nmetadata:\r\n  annotations:\r\n    cert-manager.io/cluster-issuer: letsencrypt-prod\r\nspec:\r\n  tls:\r\n  - hosts:\r\n    - example.com\r\n    secretName: example-tls  # 자동 생성\r\n```\r\n\r\ncert-manager가 Let's Encrypt 인증서 자동 발급/갱신",
    "references": [
      {
        "title": "Ingress TLS",
        "url": "https://kubernetes.io/docs/concepts/services-networking/ingress/#tls"
      }
    ]
  },
  {
    "id": "K8S-046",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Ingress의 annotations을 활용한 설정(rate limiting, rewrites 등) 방법을 설명해주세요.",
    "answer": "**annotations**: Ingress Controller별 추가 설정 (NGINX Ingress 예시)\r\n\r\n**Rate Limiting**:\r\n```yaml\r\nmetadata:\r\n  annotations:\r\n    nginx.ingress.kubernetes.io/limit-rps: \"10\"\r\n    nginx.ingress.kubernetes.io/limit-connections: \"5\"\r\n```\r\n\r\n**URL Rewrite**:\r\n```yaml\r\nmetadata:\r\n  annotations:\r\n    nginx.ingress.kubernetes.io/rewrite-target: /$2\r\nspec:\r\n  rules:\r\n  - http:\r\n      paths:\r\n      - path: /api(/|$)(.*)\r\n```\r\n\r\n**기타 유용한 annotations**:\r\n- `ssl-redirect`: HTTP -> HTTPS 리디렉션\r\n- `proxy-body-size`: 요청 바디 크기 제한\r\n- `proxy-read-timeout`: 타임아웃 설정\r\n- `whitelist-source-range`: IP 화이트리스트",
    "references": [
      {
        "title": "NGINX Ingress Annotations",
        "url": "https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/"
      }
    ]
  },
  {
    "id": "K8S-047",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "PersistentVolume(PV)과 PersistentVolumeClaim(PVC)의 개념과 관계를 설명해주세요.",
    "answer": "**PersistentVolume (PV)**:\r\n- 클러스터 레벨의 스토리지 리소스\r\n- 관리자가 프로비저닝 (또는 동적 생성)\r\n- 실제 스토리지 (NFS, EBS, PD 등)를 추상화\r\n\r\n**PersistentVolumeClaim (PVC)**:\r\n- 사용자의 스토리지 요청\r\n- 필요한 크기, 접근 모드 명시\r\n- Pod에서 볼륨으로 마운트\r\n\r\n**관계**:\r\n```\r\n사용자 -> PVC 생성 -> PV와 바인딩 -> Pod에서 사용\r\n```\r\n\r\n- PVC는 조건 맞는 PV에 바인딩\r\n- 1:1 관계 (하나의 PVC = 하나의 PV)\r\n- PVC 삭제 시 PV는 reclaimPolicy에 따라 처리",
    "references": [
      {
        "title": "Persistent Volumes",
        "url": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/"
      }
    ]
  },
  {
    "id": "K8S-048",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes PV의 접근 모드(ReadWriteOnce, ReadOnlyMany, ReadWriteMany)의 차이점을 설명해주세요.",
    "answer": "**접근 모드**:\r\n| 모드 | 약어 | 설명 |\r\n|------|------|------|\r\n| ReadWriteOnce | RWO | 단일 노드에서 읽기/쓰기 |\r\n| ReadOnlyMany | ROX | 여러 노드에서 읽기 전용 |\r\n| ReadWriteMany | RWX | 여러 노드에서 읽기/쓰기 |\r\n| ReadWriteOncePod | RWOP | 단일 Pod에서만 읽기/쓰기 |\r\n\r\n**스토리지 타입별 지원**:\r\n- AWS EBS: RWO만 지원\r\n- NFS: RWO, ROX, RWX 모두 지원\r\n- GCP PD: RWO, ROX 지원\r\n\r\n**사용 시나리오**:\r\n- RWO: 일반 DB, 단일 인스턴스 앱\r\n- ROX: 공유 설정 파일, 정적 콘텐츠\r\n- RWX: 여러 Pod가 공유하는 업로드 디렉토리",
    "references": [
      {
        "title": "Access Modes",
        "url": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes"
      }
    ]
  },
  {
    "id": "K8S-049",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes PV의 Reclaim Policy(Retain, Delete, Recycle)의 차이점과 사용 시나리오를 설명해주세요.",
    "answer": "**Reclaim Policy**: PVC 삭제 후 PV 처리 방법\r\n\r\n| 정책 | 동작 | 사용 시나리오 |\r\n|------|------|---------------|\r\n| **Retain** | PV와 데이터 유지, 수동 정리 필요 | 중요 데이터, 프로덕션 DB |\r\n| **Delete** | PV와 외부 스토리지 함께 삭제 | 임시 데이터, 동적 프로비저닝 |\r\n| **Recycle** | 데이터 삭제 후 PV 재사용 (deprecated) | 사용 권장 안함 |\r\n\r\n**Retain 후 재사용 절차**:\r\n1. PVC 삭제\r\n2. PV에서 claimRef 제거\r\n3. 필요시 데이터 정리\r\n4. 새 PVC로 바인딩\r\n\r\n**기본값**: StorageClass에 따라 다름 (동적 프로비저닝은 보통 Delete)",
    "references": [
      {
        "title": "Reclaim Policy",
        "url": "https://kubernetes.io/docs/concepts/storage/persistent-volumes/#reclaiming"
      }
    ]
  },
  {
    "id": "K8S-050",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes StorageClass의 역할과 동적 프로비저닝(Dynamic Provisioning)의 동작 방식을 설명해주세요.",
    "answer": "**StorageClass 역할**: 스토리지 \"클래스\" 정의 - 프로비저너, 파라미터, 정책 지정\r\n\r\n**동적 프로비저닝 동작**:\r\n1. PVC 생성 시 storageClassName 지정\r\n2. Provisioner가 PVC 감지\r\n3. 자동으로 PV 생성 및 외부 스토리지 프로비저닝\r\n4. PVC와 PV 자동 바인딩\r\n\r\n```yaml\r\napiVersion: storage.k8s.io/v1\r\nkind: StorageClass\r\nmetadata:\r\n  name: fast\r\nprovisioner: kubernetes.io/aws-ebs\r\nparameters:\r\n  type: gp3\r\nreclaimPolicy: Delete\r\nvolumeBindingMode: WaitForFirstConsumer\r\n```\r\n\r\n**volumeBindingMode 트레이드오프**:\r\n| 모드 | 장점 | 단점 |\r\n|------|------|------|\r\n| Immediate | PVC 생성 즉시 볼륨 확보 | 잘못된 Zone에 생성 가능 |\r\n| WaitForFirstConsumer | Pod와 같은 Zone 보장 | Pod 스케줄링까지 대기 필요 |\r\n\r\n**WaitForFirstConsumer 권장 상황**:\r\n- 멀티 Zone 클러스터\r\n- Zone 제약 있는 스토리지 (EBS, PD)\r\n\r\n**흔한 함정**:\r\n- Immediate + Zone 스토리지 → Pod가 다른 Zone에 스케줄되면 마운트 실패\r\n- StorageClass 없이 PVC 생성 → default StorageClass 필요\r\n- reclaimPolicy: Delete인데 데이터 보존 기대",
    "references": [
      {
        "title": "Storage Classes",
        "url": "https://kubernetes.io/docs/concepts/storage/storage-classes/"
      }
    ]
  },
  {
    "id": "K8S-051",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes CSI(Container Storage Interface)의 역할과 주요 CSI 드라이버들에 대해 설명해주세요.",
    "answer": "**CSI 역할**: 스토리지 시스템과 Kubernetes 간 표준 인터페이스\r\n\r\n**장점**:\r\n- 스토리지 벤더 독립적\r\n- Kubernetes 코어와 분리된 개발/배포\r\n- 플러그인 방식으로 새 스토리지 추가\r\n\r\n**주요 CSI 드라이버**:\r\n| 드라이버 | 스토리지 |\r\n|----------|----------|\r\n| aws-ebs-csi-driver | AWS EBS |\r\n| gcp-pd-csi-driver | GCP Persistent Disk |\r\n| azuredisk-csi-driver | Azure Disk |\r\n| csi-driver-nfs | NFS |\r\n| secrets-store-csi-driver | Secret 관리 |\r\n| ceph-csi | Ceph RBD/CephFS |\r\n\r\n**구성 요소**: Controller Plugin, Node Plugin",
    "references": [
      {
        "title": "CSI",
        "url": "https://kubernetes.io/docs/concepts/storage/volumes/#csi"
      }
    ]
  },
  {
    "id": "K8S-052",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes의 emptyDir, hostPath, configMap, secret 볼륨 타입의 차이점과 사용 사례를 설명해주세요.",
    "answer": "| 볼륨 타입 | 생명주기 | 사용 사례 |\r\n|-----------|----------|-----------|\r\n| **emptyDir** | Pod와 함께 (임시) | 컨테이너 간 데이터 공유, 캐시 |\r\n| **hostPath** | 노드에 영구 저장 | 로그 수집, 시스템 파일 접근 |\r\n| **configMap** | ConfigMap 수명 | 설정 파일, 환경변수 |\r\n| **secret** | Secret 수명 | 민감 정보 (패스워드, 키) |\r\n\r\n**emptyDir**: Pod 삭제 시 데이터 손실\r\n```yaml\r\nvolumes:\r\n- name: cache\r\n  emptyDir: {}\r\n```\r\n\r\n**hostPath**: 노드 종속적, 보안 주의\r\n```yaml\r\nvolumes:\r\n- name: logs\r\n  hostPath:\r\n    path: /var/log\r\n```\r\n\r\n**configMap/secret**: 읽기 전용, 자동 업데이트 가능",
    "references": [
      {
        "title": "Volumes",
        "url": "https://kubernetes.io/docs/concepts/storage/volumes/"
      }
    ]
  },
  {
    "id": "K8S-053",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "ConfigMap의 역할과 생성 방법(literal, file, directory)에 대해 설명해주세요.",
    "answer": "**역할**: 설정 데이터를 키-값 쌍으로 저장, 컨테이너와 설정 분리\r\n\r\n**생성 방법**:\r\n\r\n**Literal (키-값)**:\r\n```bash\r\nkubectl create configmap my-config --from-literal=key1=value1\r\n```\r\n\r\n**File (파일 내용)**:\r\n```bash\r\nkubectl create configmap my-config --from-file=config.properties\r\n```\r\n\r\n**Directory (디렉토리 전체)**:\r\n```bash\r\nkubectl create configmap my-config --from-file=./configs/\r\n```\r\n\r\n**YAML로 직접 생성**:\r\n```yaml\r\napiVersion: v1\r\nkind: ConfigMap\r\nmetadata:\r\n  name: my-config\r\ndata:\r\n  key1: value1\r\n  config.properties: |\r\n    setting1=value\r\n```",
    "references": [
      {
        "title": "ConfigMaps",
        "url": "https://kubernetes.io/docs/concepts/configuration/configmap/"
      }
    ]
  },
  {
    "id": "K8S-054",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes ConfigMap을 Pod에 주입하는 방법(환경변수, 볼륨 마운트)의 차이점을 설명해주세요.",
    "answer": "**환경변수 방식**:\r\n```yaml\r\nenv:\r\n- name: MY_VAR\r\n  valueFrom:\r\n    configMapKeyRef:\r\n      name: my-config\r\n      key: key1\r\n```\r\n- Pod 시작 시 값 고정\r\n- ConfigMap 변경 시 Pod 재시작 필요\r\n- 단순 키-값에 적합\r\n\r\n**볼륨 마운트 방식**:\r\n```yaml\r\nvolumes:\r\n- name: config\r\n  configMap:\r\n    name: my-config\r\nvolumeMounts:\r\n- name: config\r\n  mountPath: /etc/config\r\n```\r\n- 파일로 마운트\r\n- ConfigMap 변경 시 자동 업데이트 (지연 있음)\r\n- 설정 파일 형태에 적합\r\n\r\n**차이점 요약**:\r\n| 방식 | 업데이트 | 형태 |\r\n|------|----------|------|\r\n| 환경변수 | 재시작 필요 | 키-값 |\r\n| 볼륨 | 자동 (수초~분) | 파일 |",
    "references": [
      {
        "title": "Configure Pod ConfigMap",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/"
      }
    ]
  },
  {
    "id": "K8S-055",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Secret의 역할과 ConfigMap과의 차이점을 설명해주세요. Secret은 정말 안전한가요?",
    "answer": "**역할**: 민감한 데이터 (패스워드, 토큰, 키) 저장\r\n\r\n**ConfigMap과의 차이**:\r\n| 구분 | Secret | ConfigMap |\r\n|------|--------|-----------|\r\n| 용도 | 민감 데이터 | 일반 설정 |\r\n| 저장 | Base64 인코딩 | 평문 |\r\n| 메모리 | tmpfs에 저장 (볼륨 마운트 시) | 일반 저장 |\r\n| 크기 제한 | 1MB | 1MB |\r\n| kubectl 출력 | 기본적으로 숨김 | 표시됨 |\r\n\r\n**Secret은 정말 안전한가?**\r\n- **기본적으로 안전하지 않음**: Base64는 암호화가 아닌 인코딩\r\n- etcd에 평문 저장 (기본 설정)\r\n- API 접근 권한이 있으면 누구나 디코딩 가능\r\n- kubectl get secret -o yaml로 노출 가능\r\n\r\n**기본 제공 보안 기능**:\r\n- etcd 통신 TLS 암호화 (전송 중)\r\n- RBAC로 접근 제어 가능\r\n- Audit 로그로 접근 추적 가능\r\n\r\n**보안 강화 방법 (프로덕션 필수)**:\r\n1. **etcd 암호화 활성화** (EncryptionConfiguration) - 저장 시 암호화\r\n2. **RBAC로 접근 제한** - 필요한 ServiceAccount/User만 허용\r\n3. **외부 시크릿 관리자 사용** (Vault, AWS Secrets Manager)\r\n4. **Sealed Secrets 사용** - Git에 암호화된 상태로 저장\r\n5. **Secret 자동 회전** - 정기적으로 갱신\r\n\r\n**흔한 실수**:\r\n- Secret을 Git에 커밋 (Base64는 쉽게 디코딩됨)\r\n- 모든 Pod에 default ServiceAccount 사용\r\n- Secret 접근 로그 미확인",
    "references": [
      {
        "title": "Secrets",
        "url": "https://kubernetes.io/docs/concepts/configuration/secret/"
      }
    ]
  },
  {
    "id": "K8S-056",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Secret의 타입(Opaque, kubernetes.io/dockerconfigjson, kubernetes.io/tls 등)에 대해 설명해주세요.",
    "answer": "**주요 Secret 타입**:\r\n\r\n| 타입 | 용도 |\r\n|------|------|\r\n| **Opaque** | 기본 타입, 임의의 사용자 데이터 |\r\n| **kubernetes.io/dockerconfigjson** | Docker 레지스트리 인증 |\r\n| **kubernetes.io/tls** | TLS 인증서 (tls.crt, tls.key) |\r\n| **kubernetes.io/basic-auth** | 기본 인증 (username, password) |\r\n| **kubernetes.io/ssh-auth** | SSH 인증 (ssh-privatekey) |\r\n| **kubernetes.io/service-account-token** | ServiceAccount 토큰 |\r\n\r\n**생성 예시**:\r\n```bash\r\n# Docker 레지스트리\r\nkubectl create secret docker-registry regcred \\\r\n  --docker-server=registry.io \\\r\n  --docker-username=user \\\r\n  --docker-password=pass\r\n\r\n# TLS\r\nkubectl create secret tls tls-secret \\\r\n  --cert=cert.pem --key=key.pem\r\n```",
    "references": [
      {
        "title": "Secret Types",
        "url": "https://kubernetes.io/docs/concepts/configuration/secret/#secret-types"
      }
    ]
  },
  {
    "id": "K8S-057",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "외부 시크릿 관리 도구(Vault, AWS Secrets Manager)와 Kubernetes Secret의 연동 방법을 설명해주세요.",
    "answer": "**연동 방법**:\r\n\r\n**1. External Secrets Operator**:\r\n- 외부 시크릿을 Kubernetes Secret으로 동기화\r\n- AWS Secrets Manager, Vault, GCP Secret Manager 지원\r\n```yaml\r\napiVersion: external-secrets.io/v1beta1\r\nkind: ExternalSecret\r\nspec:\r\n  secretStoreRef:\r\n    name: aws-secrets-manager\r\n  target:\r\n    name: my-secret\r\n  data:\r\n  - secretKey: password\r\n    remoteRef:\r\n      key: prod/db-password\r\n```\r\n\r\n**2. Secrets Store CSI Driver**:\r\n- CSI 볼륨으로 시크릿 마운트\r\n- Pod에서 파일로 접근\r\n\r\n**3. Vault Agent Injector**:\r\n- Sidecar로 Vault 시크릿 주입\r\n- 자동 갱신 지원\r\n\r\n**장점**: 중앙 집중 관리, 감사 로그, 자동 회전",
    "references": [
      {
        "title": "External Secrets Operator",
        "url": "https://external-secrets.io/"
      }
    ]
  },
  {
    "id": "K8S-058",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes ConfigMap/Secret 변경 시 Pod에 자동으로 반영되지 않는 이유와 해결 방법을 설명해주세요.",
    "answer": "**자동 반영되지 않는 이유**:\r\n- 환경변수: Pod 시작 시 값이 고정됨\r\n- 볼륨 마운트: 자동 업데이트되나 앱이 파일 변경 감지 필요\r\n- 앱 재시작 없이 설정 리로드 로직 필요\r\n\r\n**해결 방법**:\r\n\r\n**1. Pod 재시작 (롤아웃)**:\r\n```bash\r\nkubectl rollout restart deployment/<name>\r\n```\r\n\r\n**2. Reloader 사용** (stakater/Reloader):\r\n- ConfigMap/Secret 변경 감지 후 자동 롤아웃\r\n```yaml\r\nmetadata:\r\n  annotations:\r\n    reloader.stakater.com/auto: \"true\"\r\n```\r\n\r\n**3. 해시 기반 업데이트**:\r\n- ConfigMap 해시를 annotation에 포함\r\n- 변경 시 Deployment 스펙 변경 -> 자동 롤아웃\r\n\r\n**4. 앱 레벨 핫 리로드 구현**",
    "references": [
      {
        "title": "ConfigMap",
        "url": "https://kubernetes.io/docs/concepts/configuration/configmap/"
      }
    ]
  },
  {
    "id": "K8S-059",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes에서 nodeSelector를 사용한 Pod 스케줄링 방법과 한계점을 설명해주세요.",
    "answer": "**nodeSelector 사용법**:\r\n```yaml\r\nspec:\r\n  nodeSelector:\r\n    disktype: ssd\r\n    zone: us-west-1a\r\n```\r\n노드에 해당 레이블이 있어야 스케줄링됨\r\n\r\n**노드 레이블 추가**:\r\n```bash\r\nkubectl label nodes node1 disktype=ssd\r\n```\r\n\r\n**한계점**:\r\n1. **단순 일치만 가능**: OR, NOT 조건 불가\r\n2. **Hard 제약만**: 조건 불일치 시 스케줄링 실패\r\n3. **Soft 선호 불가**: \"가능하면\" 조건 표현 못함\r\n4. **복잡한 표현식 불가**: In, NotIn, Exists 등 미지원\r\n\r\n**대안**: Node Affinity 사용\r\n- 더 풍부한 표현식\r\n- Soft/Hard 제약 모두 지원",
    "references": [
      {
        "title": "Assigning Pods to Nodes",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/"
      }
    ]
  },
  {
    "id": "K8S-060",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Node Affinity와 nodeSelector의 차이점, requiredDuringSchedulingIgnoredDuringExecution와 preferredDuringSchedulingIgnoredDuringExecution의 차이를 설명해주세요.",
    "answer": "**nodeSelector vs Node Affinity**:\r\n| 구분 | nodeSelector | Node Affinity |\r\n|------|--------------|---------------|\r\n| 표현력 | 단순 일치 | In, NotIn, Exists 등 |\r\n| 제약 타입 | Hard만 | Hard + Soft |\r\n| 가중치 | 불가 | 지원 |\r\n\r\n**requiredDuringSchedulingIgnoredDuringExecution** (Hard):\r\n- 반드시 충족해야 스케줄링\r\n- 조건 불일치 시 Pending 상태\r\n\r\n**preferredDuringSchedulingIgnoredDuringExecution** (Soft):\r\n- 가능하면 충족, 불가시 다른 노드 선택\r\n- weight로 우선순위 지정 (1-100)\r\n\r\n```yaml\r\naffinity:\r\n  nodeAffinity:\r\n    requiredDuringSchedulingIgnoredDuringExecution:\r\n      nodeSelectorTerms:\r\n      - matchExpressions:\r\n        - key: zone\r\n          operator: In\r\n          values: [us-west-1a]\r\n    preferredDuringSchedulingIgnoredDuringExecution:\r\n    - weight: 80\r\n      preference:\r\n        matchExpressions:\r\n        - key: disktype\r\n          operator: In\r\n          values: [ssd]\r\n```",
    "references": [
      {
        "title": "Node Affinity",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#node-affinity"
      }
    ]
  },
  {
    "id": "K8S-061",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Pod Affinity와 Pod Anti-Affinity의 개념과 사용 사례를 설명해주세요.",
    "answer": "**Pod Affinity**: 특정 Pod와 같은 위치에 스케줄링\r\n**Pod Anti-Affinity**: 특정 Pod와 다른 위치에 스케줄링\r\n\r\n**사용 사례**:\r\n\r\n**Pod Affinity**:\r\n- 웹 서버와 캐시 서버를 같은 노드에 배치 (지연 감소)\r\n- 관련 서비스 Co-location\r\n\r\n**Pod Anti-Affinity**:\r\n- 동일 앱 Pod를 다른 노드에 분산 (고가용성)\r\n- 리소스 경합 방지\r\n\r\n```yaml\r\naffinity:\r\n  podAntiAffinity:\r\n    requiredDuringSchedulingIgnoredDuringExecution:\r\n    - labelSelector:\r\n        matchLabels:\r\n          app: web\r\n      topologyKey: kubernetes.io/hostname\r\n```\r\n-> 같은 app=web Pod가 있는 노드 피함",
    "references": [
      {
        "title": "Inter-pod Affinity",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity"
      }
    ]
  },
  {
    "id": "K8S-062",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes의 topologyKey의 역할과 topology spread constraints의 활용 방법을 설명해주세요.",
    "answer": "**topologyKey**: Pod Affinity/Anti-Affinity의 범위 정의\r\n- `kubernetes.io/hostname`: 노드 단위\r\n- `topology.kubernetes.io/zone`: 가용영역 단위\r\n- `topology.kubernetes.io/region`: 리전 단위\r\n\r\n**Topology Spread Constraints**: Pod를 토폴로지 도메인에 균등 분산\r\n\r\n```yaml\r\ntopologySpreadConstraints:\r\n- maxSkew: 1\r\n  topologyKey: topology.kubernetes.io/zone\r\n  whenUnsatisfiable: DoNotSchedule\r\n  labelSelector:\r\n    matchLabels:\r\n      app: web\r\n```\r\n\r\n**설정값**:\r\n- **maxSkew**: 최대 불균형 허용치\r\n- **topologyKey**: 분산 기준 도메인\r\n- **whenUnsatisfiable**: DoNotSchedule / ScheduleAnyway\r\n\r\n**활용**: 가용영역 간 균등 분산으로 고가용성 확보",
    "references": [
      {
        "title": "Topology Spread Constraints",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/"
      }
    ]
  },
  {
    "id": "K8S-063",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Taint와 Toleration의 개념과 동작 방식을 설명해주세요.",
    "answer": "**Taint**: 노드에 적용, Pod 배치 제한 (노드가 Pod를 밀어냄)\r\n**Toleration**: Pod에 적용, 특정 Taint 허용 (Pod가 Taint 용인)\r\n\r\n**동작 방식**:\r\n1. 노드에 Taint 설정\r\n2. 해당 Taint를 Toleration하는 Pod만 스케줄링 가능\r\n\r\n**Taint 적용**:\r\n```bash\r\nkubectl taint nodes node1 key=value:NoSchedule\r\n```\r\n\r\n**Toleration 설정**:\r\n```yaml\r\ntolerations:\r\n- key: \"key\"\r\n  operator: \"Equal\"\r\n  value: \"value\"\r\n  effect: \"NoSchedule\"\r\n```\r\n\r\n**operator**:\r\n- `Equal`: key와 value 모두 일치\r\n- `Exists`: key만 일치 (value 무시)\r\n\r\n**사용 사례**: 전용 노드 (GPU, 특정 팀용)",
    "references": [
      {
        "title": "Taints and Tolerations",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/"
      }
    ]
  },
  {
    "id": "K8S-064",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Taint의 effect(NoSchedule, PreferNoSchedule, NoExecute)의 차이점을 설명해주세요.",
    "answer": "**Taint Effect 종류**:\r\n\r\n| Effect | 새 Pod 스케줄링 | 기존 Pod |\r\n|--------|-----------------|----------|\r\n| **NoSchedule** | 차단 | 영향 없음 |\r\n| **PreferNoSchedule** | 가능하면 피함 | 영향 없음 |\r\n| **NoExecute** | 차단 | 제거됨 |\r\n\r\n**상세 설명**:\r\n- **NoSchedule**: Toleration 없으면 절대 스케줄링 안됨\r\n- **PreferNoSchedule**: Soft 제약, 다른 노드 없으면 스케줄링됨\r\n- **NoExecute**: 기존 실행 중인 Pod도 제거 (tolerationSeconds로 유예 가능)\r\n\r\n```yaml\r\ntolerations:\r\n- key: \"key\"\r\n  effect: \"NoExecute\"\r\n  tolerationSeconds: 3600  # 1시간 후 제거\r\n```\r\n\r\n**사용 시나리오**:\r\n- NoSchedule: 전용 노드 분리\r\n- PreferNoSchedule: 가능하면 분리\r\n- NoExecute: 노드 유지보수, 장애 처리",
    "references": [
      {
        "title": "Taint Effects",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/#concepts"
      }
    ]
  },
  {
    "id": "K8S-065",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Master/Control Plane 노드에 Pod가 스케줄되지 않는 이유와 이를 허용하는 방법을 설명해주세요.",
    "answer": "**스케줄되지 않는 이유**:\r\nControl Plane 노드에 기본 Taint 적용됨:\r\n```\r\nnode-role.kubernetes.io/control-plane:NoSchedule\r\nnode-role.kubernetes.io/master:NoSchedule  # 구버전\r\n```\r\n\r\n**허용 방법 1: Toleration 추가**\r\n```yaml\r\ntolerations:\r\n- key: \"node-role.kubernetes.io/control-plane\"\r\n  operator: \"Exists\"\r\n  effect: \"NoSchedule\"\r\n```\r\n\r\n**허용 방법 2: Taint 제거** (권장하지 않음)\r\n```bash\r\nkubectl taint nodes <master-node> \\\r\n  node-role.kubernetes.io/control-plane:NoSchedule-\r\n```\r\n\r\n**주의사항**:\r\n- 프로덕션에서는 Control Plane 분리 권장\r\n- 단일 노드 클러스터 (개발용)에서만 허용 고려\r\n- Control Plane 리소스 경합 위험",
    "references": [
      {
        "title": "Taints and Tolerations",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/"
      }
    ]
  },
  {
    "id": "K8S-066",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Node에 문제가 생겼을 때 자동으로 적용되는 Taint(node.kubernetes.io/not-ready 등)에 대해 설명해주세요.",
    "answer": "**자동 적용 Taint** (Node Controller가 관리):\r\n\r\n| Taint | 상황 |\r\n|-------|------|\r\n| `node.kubernetes.io/not-ready` | 노드 Ready 조건 False |\r\n| `node.kubernetes.io/unreachable` | 노드 통신 불가 |\r\n| `node.kubernetes.io/memory-pressure` | 메모리 부족 |\r\n| `node.kubernetes.io/disk-pressure` | 디스크 부족 |\r\n| `node.kubernetes.io/pid-pressure` | PID 부족 |\r\n| `node.kubernetes.io/network-unavailable` | 네트워크 미설정 |\r\n| `node.kubernetes.io/unschedulable` | cordon 적용됨 |\r\n\r\n**기본 Toleration**:\r\nDaemonSet Pod는 기본적으로 이러한 Taint를 Toleration함\r\n\r\n**tolerationSeconds**:\r\n- not-ready, unreachable: 기본 300초 유예 후 제거\r\n- 설정으로 조정 가능",
    "references": [
      {
        "title": "Taint based Evictions",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/#taint-based-evictions"
      }
    ]
  },
  {
    "id": "K8S-067",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes에서 컨테이너의 resource requests와 limits의 차이점과 역할을 설명해주세요.",
    "answer": "**Requests**:\r\n- 스케줄링에 사용되는 최소 보장 리소스\r\n- 노드 선택 시 이 값 기준으로 용량 확인\r\n- 컨테이너에 보장되는 리소스\r\n\r\n**Limits**:\r\n- 컨테이너가 사용할 수 있는 최대 리소스\r\n- 이 값 초과 시 제한됨 (CPU: throttle, Memory: OOM Kill)\r\n\r\n```yaml\r\nresources:\r\n  requests:\r\n    memory: \"256Mi\"\r\n    cpu: \"250m\"\r\n  limits:\r\n    memory: \"512Mi\"\r\n    cpu: \"500m\"\r\n```\r\n\r\n**차이점 요약**:\r\n| 구분 | Requests | Limits |\r\n|------|----------|--------|\r\n| 용도 | 스케줄링 | 제한 |\r\n| 보장 | 항상 보장 | 최대값 |\r\n| 초과 시 | - | 제한/종료 |",
    "references": [
      {
        "title": "Resource Management",
        "url": "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"
      }
    ]
  },
  {
    "id": "K8S-068",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes에서 CPU와 Memory 리소스 단위(millicore, Mi, Gi)에 대해 설명해주세요.",
    "answer": "**CPU 단위**:\r\n- `1`: 1 CPU 코어 (1000m)\r\n- `500m`: 0.5 CPU (millicore)\r\n- `100m`: 0.1 CPU\r\n- 클라우드 1 vCPU = 1 코어\r\n\r\n**Memory 단위**:\r\n| 단위 | 의미 | 값 |\r\n|------|------|------|\r\n| Ki | Kibibyte | 1024 bytes |\r\n| Mi | Mebibyte | 1024 Ki |\r\n| Gi | Gibibyte | 1024 Mi |\r\n| K | Kilobyte | 1000 bytes |\r\n| M | Megabyte | 1000 K |\r\n| G | Gigabyte | 1000 M |\r\n\r\n**예시**:\r\n```yaml\r\nresources:\r\n  requests:\r\n    cpu: \"250m\"      # 0.25 코어\r\n    memory: \"128Mi\"  # 128 Mebibytes\r\n  limits:\r\n    cpu: \"1\"         # 1 코어\r\n    memory: \"1Gi\"    # 1 Gibibyte\r\n```",
    "references": [
      {
        "title": "Resource Units",
        "url": "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes"
      }
    ]
  },
  {
    "id": "K8S-069",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes에서 requests만 설정했을 때와 limits만 설정했을 때의 동작 차이를 설명해주세요.",
    "answer": "**requests만 설정**:\r\n- limits: 무제한 (노드 전체 리소스 사용 가능)\r\n- QoS: Burstable\r\n- 스케줄링 시 requests 기준으로 노드 선택\r\n- **위험**: 다른 Pod 리소스를 빼앗을 수 있음\r\n\r\n**limits만 설정**:\r\n- requests: limits와 동일 값으로 자동 설정\r\n- QoS: Guaranteed\r\n- 스케줄링 시 limits 값 기준\r\n\r\n```yaml\r\n# limits만 설정\r\nresources:\r\n  limits:\r\n    cpu: \"500m\"\r\n    memory: \"256Mi\"\r\n# 결과: requests도 동일하게 설정됨\r\n```\r\n\r\n**흔한 실수와 함정**:\r\n| 설정 | 문제점 |\r\n|------|--------|\r\n| requests만 높게 | 스케줄링은 되지만 실제 사용량 적으면 리소스 낭비 |\r\n| requests만 낮게 | 과도한 오버커밋으로 노드 리소스 부족 |\r\n| limits만 설정 | requests=limits가 되어 burst 불가, 리소스 낭비 가능 |\r\n| 둘 다 미설정 | QoS BestEffort로 가장 먼저 eviction 대상 |\r\n\r\n**권장 사항**:\r\n- 항상 requests와 limits 둘 다 설정\r\n- requests <= limits (burst 허용)\r\n- requests = limits (안정성 우선, Guaranteed QoS)\r\n- 프로덕션에서는 실제 사용량 측정 후 설정 (kubectl top, Prometheus)\r\n\r\n**LimitRange로 기본값 강제**: 네임스페이스에 기본 requests/limits 설정 권장",
    "references": [
      {
        "title": "Resource Management",
        "url": "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"
      }
    ]
  },
  {
    "id": "K8S-070",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes에서 Memory limits을 초과했을 때와 CPU limits을 초과했을 때의 동작 차이를 설명해주세요.",
    "answer": "**Memory Limits 초과**:\r\n- OOM (Out of Memory) Kill 발생\r\n- 컨테이너 종료, restartPolicy에 따라 재시작\r\n- 압축 불가능한 리소스 (반환 불가)\r\n\r\n**CPU Limits 초과**:\r\n- CPU Throttling 발생\r\n- 컨테이너는 계속 실행\r\n- 처리 속도만 제한됨\r\n- 압축 가능한 리소스 (일시적 제한)\r\n\r\n**비교**:\r\n| 리소스 | 초과 시 동작 | 특성 |\r\n|--------|-------------|------|\r\n| Memory | OOM Kill | 압축 불가 |\r\n| CPU | Throttle | 압축 가능 |\r\n\r\n**모니터링**:\r\n- Memory: container_memory_working_set_bytes\r\n- CPU Throttle: container_cpu_cfs_throttled_seconds_total",
    "references": [
      {
        "title": "Resource Management",
        "url": "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"
      }
    ]
  },
  {
    "id": "K8S-071",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Pod의 QoS(Quality of Service) 클래스(Guaranteed, Burstable, BestEffort)의 결정 기준과 의미를 설명해주세요.",
    "answer": "**QoS 클래스 결정 기준**:\r\n\r\n| QoS | 조건 | Eviction 우선순위 |\r\n|-----|------|------------------|\r\n| **Guaranteed** | 모든 컨테이너: requests = limits (CPU, Memory 모두) | 최후 |\r\n| **Burstable** | 최소 하나의 requests 또는 limits 설정, Guaranteed 아님 | 중간 |\r\n| **BestEffort** | requests/limits 모두 없음 | 최우선 |\r\n\r\n**의미**:\r\n- 노드 리소스 부족 시 Eviction 순서 결정\r\n- BestEffort -> Burstable -> Guaranteed 순으로 제거\r\n- 같은 QoS 내에서는 메모리 사용량 초과 비율로 결정\r\n\r\n**확인 방법**:\r\n```bash\r\nkubectl get pod <name> -o jsonpath='{.status.qosClass}'\r\n```\r\n\r\n**흔한 함정**:\r\n| 설정 | 예상 QoS | 실제 QoS |\r\n|------|----------|----------|\r\n| CPU만 requests=limits | Guaranteed | Burstable (Memory 미설정) |\r\n| 일부 컨테이너만 설정 | Guaranteed | Burstable |\r\n| limits만 설정 | Burstable | Guaranteed (자동으로 requests=limits) |\r\n\r\n**권장 사항**:\r\n- 중요 워크로드: Guaranteed (안정성)\r\n- 일반 워크로드: Burstable (효율성)\r\n- 개발/테스트: BestEffort 허용 가능\r\n- **프로덕션 Best Practice**: 최소 requests는 반드시 설정",
    "references": [
      {
        "title": "Pod QoS Classes",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/"
      }
    ]
  },
  {
    "id": "K8S-072",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes LimitRange의 역할과 설정 방법(default, defaultRequest, min, max)을 설명해주세요.",
    "answer": "**역할**: 네임스페이스 내 개별 컨테이너/Pod의 리소스 제약 정의\r\n\r\n**설정 항목**:\r\n| 항목 | 설명 |\r\n|------|------|\r\n| **default** | limits 미지정 시 기본값 |\r\n| **defaultRequest** | requests 미지정 시 기본값 |\r\n| **min** | 최소 리소스 |\r\n| **max** | 최대 리소스 |\r\n| **maxLimitRequestRatio** | limits/requests 최대 비율 |\r\n\r\n```yaml\r\napiVersion: v1\r\nkind: LimitRange\r\nmetadata:\r\n  name: cpu-mem-limits\r\nspec:\r\n  limits:\r\n  - type: Container\r\n    default:\r\n      cpu: \"500m\"\r\n      memory: \"256Mi\"\r\n    defaultRequest:\r\n      cpu: \"100m\"\r\n      memory: \"128Mi\"\r\n    min:\r\n      cpu: \"50m\"\r\n    max:\r\n      cpu: \"2\"\r\n```\r\n\r\n**적용 대상**: Container, Pod, PersistentVolumeClaim",
    "references": [
      {
        "title": "LimitRange",
        "url": "https://kubernetes.io/docs/concepts/policy/limit-range/"
      }
    ]
  },
  {
    "id": "K8S-073",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes ResourceQuota의 역할과 네임스페이스 단위 리소스 제한 방법을 설명해주세요.",
    "answer": "**역할**: 네임스페이스 전체의 리소스 총량 제한\r\n\r\n**제한 가능 항목**:\r\n- 컴퓨팅: requests.cpu, limits.memory 등\r\n- 스토리지: requests.storage, persistentvolumeclaims\r\n- 오브젝트 수: pods, services, configmaps 등\r\n\r\n```yaml\r\napiVersion: v1\r\nkind: ResourceQuota\r\nmetadata:\r\n  name: team-quota\r\n  namespace: team-a\r\nspec:\r\n  hard:\r\n    requests.cpu: \"10\"\r\n    requests.memory: \"20Gi\"\r\n    limits.cpu: \"20\"\r\n    limits.memory: \"40Gi\"\r\n    pods: \"50\"\r\n    services: \"10\"\r\n```\r\n\r\n**확인**:\r\n```bash\r\nkubectl describe resourcequota -n team-a\r\n```\r\n\r\n**주의**: ResourceQuota 적용 시 Pod에 반드시 requests/limits 필요 (LimitRange와 함께 사용)",
    "references": [
      {
        "title": "ResourceQuota",
        "url": "https://kubernetes.io/docs/concepts/policy/resource-quotas/"
      }
    ]
  },
  {
    "id": "K8S-074",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes PriorityClass의 역할과 Pod 우선순위 기반 스케줄링/프리엠션에 대해 설명해주세요.",
    "answer": "**역할**: Pod 간 우선순위 정의, 스케줄링 순서와 프리엠션 결정\r\n\r\n**PriorityClass 정의**:\r\n```yaml\r\napiVersion: scheduling.k8s.io/v1\r\nkind: PriorityClass\r\nmetadata:\r\n  name: high-priority\r\nvalue: 1000000\r\nglobalDefault: false\r\npreemptionPolicy: PreemptLowerPriority\r\n```\r\n\r\n**Pod에 적용**:\r\n```yaml\r\nspec:\r\n  priorityClassName: high-priority\r\n```\r\n\r\n**프리엠션(Preemption)**:\r\n- 고우선순위 Pod 스케줄 불가 시 저우선순위 Pod 제거\r\n- preemptionPolicy: PreemptLowerPriority / Never\r\n\r\n**스케줄링**:\r\n- 우선순위 높은 Pod 먼저 스케줄링\r\n\r\n**기본 PriorityClass**:\r\n- system-cluster-critical (2000000000)\r\n- system-node-critical (2000001000)",
    "references": [
      {
        "title": "Pod Priority and Preemption",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/"
      }
    ]
  },
  {
    "id": "K8S-075",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "HPA(Horizontal Pod Autoscaler)의 동작 원리와 설정 방법을 설명해주세요.",
    "answer": "**동작 원리**:\r\n1. metrics-server에서 Pod 메트릭 수집\r\n2. HPA Controller가 주기적으로 (15초) 메트릭 확인\r\n3. 목표값과 현재값 비교하여 replicas 조정\r\n\r\n**설정 방법**:\r\n```bash\r\nkubectl autoscale deployment nginx --cpu-percent=50 --min=1 --max=10\r\n```\r\n\r\n```yaml\r\napiVersion: autoscaling/v2\r\nkind: HorizontalPodAutoscaler\r\nspec:\r\n  scaleTargetRef:\r\n    apiVersion: apps/v1\r\n    kind: Deployment\r\n    name: nginx\r\n  minReplicas: 1\r\n  maxReplicas: 10\r\n  metrics:\r\n  - type: Resource\r\n    resource:\r\n      name: cpu\r\n      target:\r\n        type: Utilization\r\n        averageUtilization: 50\r\n```\r\n\r\n**스케일링 공식**: `replicas = ceil(현재 메트릭 / 목표 메트릭 * 현재 replicas)`",
    "references": [
      {
        "title": "Horizontal Pod Autoscaler",
        "url": "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/"
      }
    ]
  },
  {
    "id": "K8S-076",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes HPA에서 CPU/Memory 기반 스케일링과 Custom Metrics 기반 스케일링의 차이를 설명해주세요.",
    "answer": "**CPU/Memory 기반** (Resource Metrics):\r\n- metrics-server에서 제공\r\n- 기본 제공, 설정 간단\r\n- 제한: CPU/Memory만 가능\r\n\r\n```yaml\r\nmetrics:\r\n- type: Resource\r\n  resource:\r\n    name: cpu\r\n    target:\r\n      type: Utilization\r\n      averageUtilization: 80\r\n```\r\n\r\n**Custom Metrics 기반**:\r\n- Prometheus Adapter 등 필요\r\n- 비즈니스 메트릭 사용 가능 (RPS, Queue 길이 등)\r\n\r\n```yaml\r\nmetrics:\r\n- type: Pods\r\n  pods:\r\n    metric:\r\n      name: http_requests_per_second\r\n    target:\r\n      type: AverageValue\r\n      averageValue: 1000\r\n```\r\n\r\n**External Metrics**: 외부 시스템 메트릭 (AWS SQS 등)\r\n\r\n**선택 기준**:\r\n- CPU 바운드 앱: CPU 메트릭\r\n- I/O 바운드 앱: Custom Metrics 권장",
    "references": [
      {
        "title": "HPA Custom Metrics",
        "url": "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#autoscaling-on-multiple-metrics-and-custom-metrics"
      }
    ]
  },
  {
    "id": "K8S-077",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes HPA의 스케일링 알고리즘과 stabilizationWindowSeconds 설정의 역할을 설명해주세요.",
    "answer": "**스케일링 알고리즘**:\r\n```\r\ndesiredReplicas = ceil[currentReplicas * (currentMetric / desiredMetric)]\r\n```\r\n- 여러 메트릭 사용 시 가장 큰 값 선택\r\n- tolerance (기본 10%): 0.9 ~ 1.1 범위는 스케일링 안함\r\n\r\n**stabilizationWindowSeconds**:\r\n급격한 스케일링 방지를 위한 안정화 기간\r\n\r\n```yaml\r\nbehavior:\r\n  scaleDown:\r\n    stabilizationWindowSeconds: 300  # 5분\r\n    policies:\r\n    - type: Percent\r\n      value: 10\r\n      periodSeconds: 60\r\n  scaleUp:\r\n    stabilizationWindowSeconds: 0    # 즉시\r\n    policies:\r\n    - type: Pods\r\n      value: 4\r\n      periodSeconds: 60\r\n```\r\n\r\n**역할**:\r\n- scaleDown 기본값: 300초 (급격한 축소 방지)\r\n- scaleUp 기본값: 0초 (빠른 확장)\r\n- 윈도우 내 최대/최소값 기준 스케일링",
    "references": [
      {
        "title": "HPA Algorithm",
        "url": "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#algorithm-details"
      }
    ]
  },
  {
    "id": "K8S-078",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes HPA 사용 시 주의사항과 Best Practice를 설명해주세요.",
    "answer": "**주의사항**:\r\n1. **requests 필수**: HPA는 requests 기준으로 사용률 계산 (requests 없으면 동작 안함)\r\n2. **metrics-server 필요**: 설치되어 있어야 메트릭 수집\r\n3. **Deployment 권장**: ReplicaSet 직접 사용 비권장\r\n4. **minReplicas**: 최소 2개 이상 (고가용성)\r\n\r\n**Best Practice**:\r\n- **적절한 target 설정**: CPU 50-80% 권장\r\n- **충분한 minReplicas**: 트래픽 급증 대비\r\n- **scaleDown 안정화**: 기본 300초 유지\r\n- **여러 메트릭 조합**: CPU + 커스텀 메트릭\r\n- **Readiness Probe 설정**: 준비된 Pod만 트래픽 수신\r\n\r\n```yaml\r\nspec:\r\n  minReplicas: 2\r\n  maxReplicas: 20\r\n  behavior:\r\n    scaleDown:\r\n      stabilizationWindowSeconds: 300\r\n```\r\n\r\n**흔한 함정과 실수**:\r\n| 상황 | 문제 | 해결 |\r\n|------|------|------|\r\n| HPA + VPA 동시 사용 | CPU/Memory 충돌로 진동 | VPA는 Off 모드로만 |\r\n| target 50% + requests 과소 설정 | 실제 부하 낮아도 스케일업 | 실측 기반 requests 설정 |\r\n| maxReplicas 너무 높음 | 비용 폭발 | 리소스 quota와 연계 |\r\n| 콜드 스타트 미고려 | 새 Pod 준비 전 부하 증가 | 여유있는 minReplicas |\r\n\r\n**모니터링**: HPA 상태 주기적 확인\r\n```bash\r\nkubectl get hpa\r\nkubectl describe hpa <name>  # 상세 이벤트 확인\r\n```",
    "references": [
      {
        "title": "HPA",
        "url": "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/"
      }
    ]
  },
  {
    "id": "K8S-079",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "VPA(Vertical Pod Autoscaler)의 동작 원리와 HPA와의 차이점을 설명해주세요.",
    "answer": "**VPA 동작 원리**:\r\n1. Recommender: 리소스 사용량 분석, 권장값 계산\r\n2. Updater: 권장값과 현재값 차이 확인, Pod 재시작 트리거\r\n3. Admission Controller: 새 Pod 생성 시 권장 리소스 적용\r\n\r\n**HPA와의 차이**:\r\n| 구분 | HPA | VPA |\r\n|------|-----|-----|\r\n| 스케일링 방향 | 수평 (Pod 수) | 수직 (리소스) |\r\n| 적용 방식 | 즉시 | Pod 재시작 필요 |\r\n| 사용 사례 | Stateless 앱 | Stateful, 단일 Pod |\r\n| 함께 사용 | 가능 (권장 안함) | 메모리만 조절 시 |\r\n\r\n**제한사항**:\r\n- HPA와 동일 리소스(CPU/Memory) 동시 사용 불가\r\n- Pod 재시작 발생 가능",
    "references": [
      {
        "title": "Vertical Pod Autoscaler",
        "url": "https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler"
      }
    ]
  },
  {
    "id": "K8S-080",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes VPA의 updateMode(Off, Initial, Auto)의 차이점을 설명해주세요.",
    "answer": "**updateMode 종류**:\r\n\r\n| 모드 | 동작 |\r\n|------|------|\r\n| **Off** | 권장값만 계산, 적용 안함 (관찰 모드) |\r\n| **Initial** | 새 Pod 생성 시만 적용, 기존 Pod 변경 안함 |\r\n| **Auto** | 권장값 자동 적용, 필요시 Pod 재시작 |\r\n| **Recreate** | Auto와 동일 (deprecated) |\r\n\r\n```yaml\r\napiVersion: autoscaling.k8s.io/v1\r\nkind: VerticalPodAutoscaler\r\nspec:\r\n  targetRef:\r\n    apiVersion: apps/v1\r\n    kind: Deployment\r\n    name: my-app\r\n  updatePolicy:\r\n    updateMode: \"Auto\"\r\n```\r\n\r\n**사용 시나리오**:\r\n- **Off**: 권장값 확인 후 수동 적용\r\n- **Initial**: 재시작 최소화, 새 Pod에만 적용\r\n- **Auto**: 완전 자동화 (다운타임 허용 시)",
    "references": [
      {
        "title": "VPA Update Modes",
        "url": "https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler#quick-start"
      }
    ]
  },
  {
    "id": "K8S-081",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Cluster Autoscaler의 동작 원리와 노드 추가/삭제 조건을 설명해주세요.",
    "answer": "**동작 원리**:\r\n- 클라우드 API와 연동하여 노드 그룹(ASG, MIG 등) 조정\r\n- 주기적으로 스케줄 불가 Pod 확인\r\n\r\n**노드 추가 조건 (Scale Up)**:\r\n- Pending 상태 Pod 존재\r\n- 리소스(CPU/Memory) 부족으로 스케줄링 불가\r\n- nodeSelector/affinity 조건 만족하는 노드 부재\r\n\r\n**노드 삭제 조건 (Scale Down)**:\r\n- 노드 활용률 < 50% (기본, 설정 가능)\r\n- 해당 노드의 모든 Pod가 다른 노드로 이동 가능\r\n- 10분간 (기본) 유휴 상태 유지\r\n- PDB 위반 없음\r\n\r\n**삭제 제외 조건**:\r\n- `cluster-autoscaler.kubernetes.io/safe-to-evict: \"false\"`\r\n- 로컬 스토리지 사용\r\n- PDB로 보호된 Pod",
    "references": [
      {
        "title": "Cluster Autoscaler",
        "url": "https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler"
      }
    ]
  },
  {
    "id": "K8S-082",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes HPA, VPA, Cluster Autoscaler를 함께 사용할 때의 고려사항을 설명해주세요.",
    "answer": "**조합 사용 시 고려사항**:\r\n\r\n**HPA + Cluster Autoscaler** (권장):\r\n- HPA가 Pod 수 증가 -> Pending Pod 발생 -> CA가 노드 추가\r\n- 잘 동작하는 조합\r\n\r\n**VPA + Cluster Autoscaler**:\r\n- VPA가 리소스 증가 -> 노드 리소스 부족 -> CA가 노드 추가\r\n- Pod 재시작 주의\r\n\r\n**HPA + VPA** (주의 필요):\r\n- 동일 리소스(CPU) 동시 사용 불가 -> 충돌\r\n- 해결: VPA는 Memory만, HPA는 CPU만 (또는 커스텀 메트릭)\r\n\r\n**Best Practice**:\r\n```\r\nHPA (수평 확장) + Cluster Autoscaler (노드 확장)\r\nVPA는 Off 모드로 권장값만 참고\r\n```\r\n\r\n**권장 구성**:\r\n- Stateless 앱: HPA + CA\r\n- Stateful 앱: VPA + CA\r\n- 리소스 최적화: VPA(Off) + HPA + CA",
    "references": [
      {
        "title": "Autoscaling in Kubernetes",
        "url": "https://kubernetes.io/docs/concepts/cluster-administration/cluster-autoscaling/"
      }
    ]
  },
  {
    "id": "K8S-083",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "RBAC(Role-Based Access Control)의 개념과 구성 요소(Role, ClusterRole, RoleBinding, ClusterRoleBinding)를 설명해주세요.",
    "answer": "**RBAC 개념**: 역할 기반으로 Kubernetes API 접근 권한 관리\r\n\r\n**구성 요소**:\r\n\r\n| 구성 요소 | 범위 | 설명 |\r\n|-----------|------|------|\r\n| **Role** | 네임스페이스 | 특정 네임스페이스 내 권한 정의 |\r\n| **ClusterRole** | 클러스터 | 클러스터 전체 권한 정의 |\r\n| **RoleBinding** | 네임스페이스 | Role을 주체에 연결 |\r\n| **ClusterRoleBinding** | 클러스터 | ClusterRole을 주체에 연결 |\r\n\r\n**예시**:\r\n```yaml\r\napiVersion: rbac.authorization.k8s.io/v1\r\nkind: Role\r\nmetadata:\r\n  namespace: default\r\n  name: pod-reader\r\nrules:\r\n- apiGroups: [\"\"]\r\n  resources: [\"pods\"]\r\n  verbs: [\"get\", \"list\", \"watch\"]\r\n---\r\nkind: RoleBinding\r\nmetadata:\r\n  name: read-pods\r\nsubjects:\r\n- kind: User\r\n  name: jane\r\nroleRef:\r\n  kind: Role\r\n  name: pod-reader\r\n```",
    "references": [
      {
        "title": "RBAC",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      }
    ]
  },
  {
    "id": "K8S-084",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes RBAC에서 Role과 ClusterRole의 차이점, RoleBinding과 ClusterRoleBinding의 차이점을 설명해주세요.",
    "answer": "**Role vs ClusterRole**:\r\n| 구분 | Role | ClusterRole |\r\n|------|------|-------------|\r\n| 범위 | 특정 네임스페이스 | 클러스터 전체 |\r\n| 비네임스페이스 리소스 | 불가 | 가능 (nodes, PV 등) |\r\n| 여러 NS 재사용 | 불가 | 가능 (RoleBinding으로) |\r\n\r\n**RoleBinding vs ClusterRoleBinding**:\r\n| 구분 | RoleBinding | ClusterRoleBinding |\r\n|------|-------------|-------------------|\r\n| 범위 | 특정 네임스페이스 | 클러스터 전체 |\r\n| Role 참조 | 같은 NS의 Role | ClusterRole만 |\r\n| ClusterRole 참조 | 해당 NS에만 적용 | 전체 NS에 적용 |\r\n\r\n**활용 패턴**:\r\n- ClusterRole + RoleBinding: 재사용 가능한 권한을 특정 NS에만 적용\r\n- ClusterRole + ClusterRoleBinding: 클러스터 전체 권한",
    "references": [
      {
        "title": "RBAC",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      }
    ]
  },
  {
    "id": "K8S-085",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes RBAC에서 verbs(get, list, watch, create, update, patch, delete)의 의미를 설명해주세요.",
    "answer": "**verbs 의미**:\r\n\r\n| Verb | HTTP 메서드 | 설명 |\r\n|------|------------|------|\r\n| **get** | GET | 단일 리소스 조회 |\r\n| **list** | GET | 리소스 목록 조회 |\r\n| **watch** | GET (watch) | 리소스 변경 감시 |\r\n| **create** | POST | 리소스 생성 |\r\n| **update** | PUT | 리소스 전체 수정 |\r\n| **patch** | PATCH | 리소스 부분 수정 |\r\n| **delete** | DELETE | 단일 리소스 삭제 |\r\n| **deletecollection** | DELETE | 여러 리소스 삭제 |\r\n\r\n**특수 verbs**:\r\n- `*`: 모든 동작 허용\r\n- `use`: PodSecurityPolicy 사용\r\n- `bind`: RoleBinding 생성\r\n- `escalate`: Role 권한 상승\r\n\r\n**예시**:\r\n```yaml\r\nrules:\r\n- apiGroups: [\"\"]\r\n  resources: [\"pods\"]\r\n  verbs: [\"get\", \"list\", \"watch\"]  # 읽기 전용\r\n```",
    "references": [
      {
        "title": "RBAC verbs",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/authorization/#determine-the-request-verb"
      }
    ]
  },
  {
    "id": "K8S-086",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes RBAC에서 최소 권한 원칙(Principle of Least Privilege)을 적용하는 방법을 설명해주세요.",
    "answer": "**최소 권한 원칙 적용 방법**:\r\n\r\n1. **필요한 리소스만 지정**:\r\n```yaml\r\nresources: [\"pods\"]  # 전체 대신 특정 리소스\r\n```\r\n\r\n2. **필요한 verbs만 부여**:\r\n```yaml\r\nverbs: [\"get\", \"list\"]  # \"*\" 대신 구체적 동작\r\n```\r\n\r\n3. **resourceNames로 특정 리소스 제한**:\r\n```yaml\r\nresources: [\"secrets\"]\r\nresourceNames: [\"my-secret\"]  # 특정 시크릿만\r\n```\r\n\r\n4. **Role 대신 ClusterRole 지양**: 필요한 NS에만 권한 부여\r\n\r\n5. **기본 ServiceAccount 사용 지양**: 앱별 전용 ServiceAccount 생성\r\n\r\n6. **정기적 감사**:\r\n```bash\r\nkubectl auth can-i --list --as=system:serviceaccount:ns:sa\r\n```\r\n\r\n7. **와일드카드(*) 사용 금지**",
    "references": [
      {
        "title": "RBAC Good Practices",
        "url": "https://kubernetes.io/docs/concepts/security/rbac-good-practices/"
      }
    ]
  },
  {
    "id": "K8S-087",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "ServiceAccount의 역할과 Pod에서의 사용 방법을 설명해주세요.",
    "answer": "**역할**: Pod 내 프로세스가 Kubernetes API에 인증하기 위한 ID\r\n\r\n**기본 동작**:\r\n- 각 네임스페이스에 `default` ServiceAccount 자동 생성\r\n- Pod 생성 시 자동으로 ServiceAccount 연결\r\n- 토큰이 Pod에 자동 마운트\r\n\r\n**Pod에서 사용**:\r\n```yaml\r\napiVersion: v1\r\nkind: Pod\r\nspec:\r\n  serviceAccountName: my-service-account\r\n  containers:\r\n  - name: app\r\n    image: myapp\r\n```\r\n\r\n**ServiceAccount 생성**:\r\n```bash\r\nkubectl create serviceaccount my-sa\r\n```\r\n\r\n**토큰 위치** (Pod 내):\r\n```\r\n/var/run/secrets/kubernetes.io/serviceaccount/token\r\n```\r\n\r\n**RBAC 연동**: RoleBinding으로 ServiceAccount에 권한 부여",
    "references": [
      {
        "title": "Service Accounts",
        "url": "https://kubernetes.io/docs/concepts/security/service-accounts/"
      }
    ]
  },
  {
    "id": "K8S-088",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes ServiceAccount 토큰의 자동 마운트와 이를 비활성화하는 방법을 설명해주세요.",
    "answer": "**자동 마운트**:\r\n- 기본적으로 ServiceAccount 토큰이 Pod에 자동 마운트\r\n- 경로: `/var/run/secrets/kubernetes.io/serviceaccount/`\r\n- 파일: token, ca.crt, namespace\r\n\r\n**비활성화 방법**:\r\n\r\n**1. Pod 레벨**:\r\n```yaml\r\napiVersion: v1\r\nkind: Pod\r\nspec:\r\n  automountServiceAccountToken: false\r\n```\r\n\r\n**2. ServiceAccount 레벨**:\r\n```yaml\r\napiVersion: v1\r\nkind: ServiceAccount\r\nmetadata:\r\n  name: my-sa\r\nautomountServiceAccountToken: false\r\n```\r\n\r\n**비활성화 권장 상황**:\r\n- API 서버 접근 불필요한 Pod\r\n- 보안 강화 필요 시\r\n- 외부에서 자격증명 주입 시\r\n\r\n**우선순위**: Pod 설정 > ServiceAccount 설정",
    "references": [
      {
        "title": "Configure Service Accounts",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/"
      }
    ]
  },
  {
    "id": "K8S-089",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes API 서버의 인증(Authentication) 방식들(X.509, Bearer Token, OIDC 등)을 설명해주세요.",
    "answer": "**주요 인증 방식**:\r\n\r\n| 방식 | 설명 | 사용 사례 |\r\n|------|------|----------|\r\n| **X.509 Client Cert** | 클라이언트 인증서 | kubeconfig, 관리자 |\r\n| **Bearer Token** | 정적 토큰 파일 | 서비스 계정 |\r\n| **ServiceAccount Token** | JWT 토큰 | Pod 내 앱 |\r\n| **OIDC** | OpenID Connect | SSO, 기업 인증 |\r\n| **Webhook** | 외부 인증 서비스 | 커스텀 인증 |\r\n\r\n**X.509 인증서**:\r\n- CN(Common Name): 사용자 이름\r\n- O(Organization): 그룹\r\n\r\n**OIDC 장점**:\r\n- 기존 IdP(Okta, Azure AD) 연동\r\n- 짧은 수명 토큰\r\n- 그룹 기반 권한 관리\r\n\r\n**여러 인증 방식 조합 가능**: 하나만 성공하면 인증 통과",
    "references": [
      {
        "title": "Authentication",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/authentication/"
      }
    ]
  },
  {
    "id": "K8S-090",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes kubeconfig 파일의 구조와 contexts, clusters, users 설정에 대해 설명해주세요.",
    "answer": "**kubeconfig 구조**:\r\n\r\n```yaml\r\napiVersion: v1\r\nkind: Config\r\ncurrent-context: dev-context\r\n\r\nclusters:\r\n- name: dev-cluster\r\n  cluster:\r\n    server: https://dev.example.com:6443\r\n    certificate-authority: /path/to/ca.crt\r\n\r\nusers:\r\n- name: dev-user\r\n  user:\r\n    client-certificate: /path/to/cert.crt\r\n    client-key: /path/to/key.key\r\n\r\ncontexts:\r\n- name: dev-context\r\n  context:\r\n    cluster: dev-cluster\r\n    user: dev-user\r\n    namespace: default\r\n```\r\n\r\n**구성 요소**:\r\n- **clusters**: API 서버 주소, CA 인증서\r\n- **users**: 인증 정보 (인증서, 토큰 등)\r\n- **contexts**: cluster + user + namespace 조합\r\n- **current-context**: 현재 사용 중인 context\r\n\r\n**명령어**:\r\n```bash\r\nkubectl config get-contexts\r\nkubectl config use-context prod\r\nkubectl config set-context --current --namespace=app\r\n```",
    "references": [
      {
        "title": "Organizing Cluster Access",
        "url": "https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/"
      }
    ]
  },
  {
    "id": "K8S-091",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "NetworkPolicy의 역할과 Ingress/Egress 규칙 설정 방법을 설명해주세요.",
    "answer": "**역할**: Pod 간 네트워크 트래픽 제어 (방화벽 규칙)\r\n\r\n**기본 동작**: NetworkPolicy 없으면 모든 트래픽 허용\r\n\r\n**예시**:\r\n```yaml\r\napiVersion: networking.k8s.io/v1\r\nkind: NetworkPolicy\r\nmetadata:\r\n  name: api-policy\r\nspec:\r\n  podSelector:\r\n    matchLabels:\r\n      app: api\r\n  policyTypes:\r\n  - Ingress\r\n  - Egress\r\n  ingress:\r\n  - from:\r\n    - podSelector:\r\n        matchLabels:\r\n          app: frontend\r\n    ports:\r\n    - port: 8080\r\n  egress:\r\n  - to:\r\n    - podSelector:\r\n        matchLabels:\r\n          app: database\r\n    ports:\r\n    - port: 5432\r\n```\r\n\r\n**규칙 조합**:\r\n- **podSelector**: 같은 NS의 특정 Pod\r\n- **namespaceSelector**: 특정 NS의 Pod\r\n- **ipBlock**: CIDR 범위",
    "references": [
      {
        "title": "Network Policies",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      }
    ]
  },
  {
    "id": "K8S-092",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes NetworkPolicy가 적용되지 않는 경우(CNI 미지원 등)와 기본 정책에 대해 설명해주세요.",
    "answer": "**NetworkPolicy 미적용 상황**:\r\n\r\n1. **CNI 미지원**:\r\n   - Flannel (기본): 지원 안함\r\n   - 지원 CNI: Calico, Cilium, Weave Net\r\n   - NetworkPolicy 생성해도 무시됨 (오류 없이 무시!)\r\n\r\n2. **HostNetwork Pod**: `hostNetwork: true` Pod는 영향 안받음\r\n\r\n3. **시스템 네임스페이스**: kube-system의 Pod는 보통 제외\r\n\r\n**기본 정책**:\r\n- NetworkPolicy 없음: 모든 트래픽 허용 (default allow)\r\n- NetworkPolicy 적용 시: 해당 Pod는 명시적 허용만 가능 (default deny)\r\n\r\n**흔한 함정**:\r\n| 상황 | 예상 | 실제 |\r\n|------|------|------|\r\n| Flannel + NetworkPolicy | 트래픽 차단 | 아무 효과 없음 |\r\n| Ingress만 정의 | Egress 차단? | Egress는 모두 허용 |\r\n| podSelector: {} | 아무것도 선택 안함? | 네임스페이스 전체 Pod |\r\n| namespaceSelector + podSelector | AND 조건? | 같은 from/to 내 AND, 다른 from/to 간 OR |\r\n\r\n**전체 거부 정책** (Zero Trust 시작점):\r\n```yaml\r\napiVersion: networking.k8s.io/v1\r\nkind: NetworkPolicy\r\nmetadata:\r\n  name: deny-all\r\nspec:\r\n  podSelector: {}\r\n  policyTypes:\r\n  - Ingress\r\n  - Egress\r\n```\r\n\r\n**주의**: DNS 통신 (kube-dns:53) Egress 허용 필요할 수 있음",
    "references": [
      {
        "title": "Network Policies",
        "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
      }
    ]
  },
  {
    "id": "K8S-093",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Pod Security Standards(Privileged, Baseline, Restricted)의 차이점을 설명해주세요.",
    "answer": "**Pod Security Standards (PSS)**:\r\n\r\n| 레벨 | 설명 | 사용 사례 |\r\n|------|------|----------|\r\n| **Privileged** | 제한 없음, 모든 권한 허용 | 시스템 컴포넌트, 신뢰된 워크로드 |\r\n| **Baseline** | 최소 제한, 알려진 위험 차단 | 일반 워크로드 |\r\n| **Restricted** | 최대 제한, 보안 Best Practice | 보안 중요 워크로드 |\r\n\r\n**주요 제한 항목**:\r\n| 항목 | Baseline | Restricted |\r\n|------|----------|------------|\r\n| hostNetwork | 차단 | 차단 |\r\n| hostPID/IPC | 차단 | 차단 |\r\n| privileged | 차단 | 차단 |\r\n| runAsNonRoot | - | 필수 |\r\n| readOnlyRootFilesystem | - | 권장 |\r\n| capabilities | 일부 허용 | 거의 없음 |",
    "references": [
      {
        "title": "Pod Security Standards",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      }
    ]
  },
  {
    "id": "K8S-094",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Pod Security Admission Controller의 역할과 enforce, audit, warn 모드의 차이를 설명해주세요.",
    "answer": "**역할**: 네임스페이스 레벨에서 Pod Security Standards 적용\r\n\r\n**모드 차이**:\r\n| 모드 | 동작 | 사용 목적 |\r\n|------|------|----------|\r\n| **enforce** | 위반 시 Pod 생성 거부 | 프로덕션 |\r\n| **audit** | 위반 감사 로그 기록, 허용 | 모니터링 |\r\n| **warn** | 위반 경고 메시지, 허용 | 전환 준비 |\r\n\r\n**네임스페이스 레이블 설정**:\r\n```yaml\r\napiVersion: v1\r\nkind: Namespace\r\nmetadata:\r\n  name: my-namespace\r\n  labels:\r\n    pod-security.kubernetes.io/enforce: restricted\r\n    pod-security.kubernetes.io/enforce-version: latest\r\n    pod-security.kubernetes.io/audit: restricted\r\n    pod-security.kubernetes.io/warn: restricted\r\n```\r\n\r\n**권장 전략**:\r\n1. warn/audit로 시작하여 영향 파악\r\n2. 점진적으로 enforce 적용",
    "references": [
      {
        "title": "Pod Security Admission",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-admission/"
      }
    ]
  },
  {
    "id": "K8S-095",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes 컨테이너의 securityContext 설정(runAsUser, runAsNonRoot, readOnlyRootFilesystem 등)에 대해 설명해주세요.",
    "answer": "**주요 securityContext 설정**:\r\n\r\n```yaml\r\nsecurityContext:\r\n  runAsUser: 1000           # 실행 UID\r\n  runAsGroup: 3000          # 실행 GID\r\n  runAsNonRoot: true        # root 실행 금지\r\n  readOnlyRootFilesystem: true  # 루트 FS 읽기 전용\r\n  allowPrivilegeEscalation: false  # 권한 상승 금지\r\n  capabilities:\r\n    drop:\r\n      - ALL                 # 모든 capability 제거\r\n    add:\r\n      - NET_BIND_SERVICE    # 필요한 것만 추가\r\n```\r\n\r\n**설정 범위**:\r\n- Pod 레벨: `spec.securityContext`\r\n- Container 레벨: `spec.containers[].securityContext`\r\n- Container 설정이 Pod 설정보다 우선\r\n\r\n**권장 설정**:\r\n- runAsNonRoot: true\r\n- readOnlyRootFilesystem: true\r\n- allowPrivilegeEscalation: false\r\n- capabilities.drop: ALL",
    "references": [
      {
        "title": "Security Context",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/security-context/"
      }
    ]
  },
  {
    "id": "K8S-096",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Liveness Probe의 역할과 설정 방법(httpGet, tcpSocket, exec)을 설명해주세요.",
    "answer": "**역할**: 컨테이너가 살아있는지 확인, 실패 시 컨테이너 재시작\r\n\r\n**설정 방법**:\r\n\r\n**httpGet**:\r\n```yaml\r\nlivenessProbe:\r\n  httpGet:\r\n    path: /healthz\r\n    port: 8080\r\n  initialDelaySeconds: 15\r\n  periodSeconds: 10\r\n```\r\n\r\n**tcpSocket**:\r\n```yaml\r\nlivenessProbe:\r\n  tcpSocket:\r\n    port: 3306\r\n  initialDelaySeconds: 15\r\n```\r\n\r\n**exec**:\r\n```yaml\r\nlivenessProbe:\r\n  exec:\r\n    command:\r\n    - cat\r\n    - /tmp/healthy\r\n  initialDelaySeconds: 5\r\n```\r\n\r\n**성공 조건**:\r\n- httpGet: 200-399 응답\r\n- tcpSocket: 연결 성공\r\n- exec: exit code 0",
    "references": [
      {
        "title": "Configure Liveness Probes",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/"
      }
    ]
  },
  {
    "id": "K8S-097",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Readiness Probe의 역할과 Liveness Probe와의 차이점을 설명해주세요.",
    "answer": "**Readiness Probe 역할**: 컨테이너가 트래픽 수신 준비 되었는지 확인\r\n\r\n**Liveness vs Readiness**:\r\n| 구분 | Liveness | Readiness |\r\n|------|----------|-----------|\r\n| 목적 | 살아있는지 확인 | 준비됐는지 확인 |\r\n| 실패 시 | 컨테이너 재시작 | Service에서 제외 |\r\n| 사용 시점 | 데드락 감지 | 시작 준비, 일시적 불가 |\r\n\r\n**Readiness 실패 시**:\r\n- Service Endpoints에서 제거\r\n- 트래픽 수신 안함\r\n- 컨테이너는 계속 실행\r\n\r\n**사용 예시**:\r\n```yaml\r\nreadinessProbe:\r\n  httpGet:\r\n    path: /ready\r\n    port: 8080\r\n  initialDelaySeconds: 5\r\n  periodSeconds: 5\r\n```\r\n\r\n**흔한 실수와 함정**:\r\n| 실수 | 문제점 | 해결책 |\r\n|------|--------|--------|\r\n| Liveness = Readiness 동일 엔드포인트 | 일시적 과부하에 불필요한 재시작 | 분리된 엔드포인트 사용 |\r\n| Liveness에서 외부 의존성 체크 | DB 장애 시 모든 Pod 재시작 | 외부 의존성은 Readiness에서만 |\r\n| 너무 짧은 timeout | 정상 Pod도 실패 판정 | 충분한 여유 확보 |\r\n| Readiness 미설정 | 준비 안된 Pod로 트래픽 유입 | 반드시 설정 |\r\n\r\n**Best Practice**:\r\n- 둘 다 설정 권장\r\n- 다른 엔드포인트 사용 (/healthz vs /ready)\r\n- Liveness는 앱 자체 상태만 체크 (외부 의존성 X)\r\n- Readiness는 모든 의존성 포함 (DB, 캐시 연결 등)",
    "references": [
      {
        "title": "Readiness Probes",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-readiness-probes"
      }
    ]
  },
  {
    "id": "K8S-098",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Startup Probe의 역할과 느린 시작 애플리케이션에서의 활용 방법을 설명해주세요.",
    "answer": "**역할**: 애플리케이션 시작 완료 확인, 성공할 때까지 Liveness/Readiness 비활성화\r\n\r\n**필요성**:\r\n- 시작 시간이 긴 앱 (레거시, JVM 앱)\r\n- Liveness의 initialDelaySeconds를 과도하게 늘리지 않아도 됨\r\n\r\n**활용 방법**:\r\n```yaml\r\nstartupProbe:\r\n  httpGet:\r\n    path: /healthz\r\n    port: 8080\r\n  failureThreshold: 30    # 30번 재시도\r\n  periodSeconds: 10       # 10초 간격\r\n  # 총 5분(30*10초) 동안 시작 대기\r\nlivenessProbe:\r\n  httpGet:\r\n    path: /healthz\r\n    port: 8080\r\n  periodSeconds: 10\r\n```\r\n\r\n**동작**:\r\n1. Startup Probe 성공할 때까지 Liveness/Readiness 실행 안함\r\n2. Startup 성공 후 Liveness/Readiness 시작\r\n3. Startup 실패 (failureThreshold 초과) 시 컨테이너 재시작",
    "references": [
      {
        "title": "Startup Probes",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-startup-probes"
      }
    ]
  },
  {
    "id": "K8S-099",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes Probe 설정값(initialDelaySeconds, periodSeconds, timeoutSeconds, failureThreshold)의 의미와 적절한 설정 방법을 설명해주세요.",
    "answer": "**설정값 의미**:\r\n| 설정 | 의미 | 기본값 |\r\n|------|------|--------|\r\n| **initialDelaySeconds** | 첫 Probe 전 대기 | 0 |\r\n| **periodSeconds** | Probe 간격 | 10 |\r\n| **timeoutSeconds** | 응답 대기 시간 | 1 |\r\n| **failureThreshold** | 연속 실패 허용 횟수 | 3 |\r\n| **successThreshold** | 연속 성공 필요 횟수 | 1 |\r\n\r\n**적절한 설정**:\r\n```yaml\r\nlivenessProbe:\r\n  httpGet:\r\n    path: /healthz\r\n    port: 8080\r\n  initialDelaySeconds: 30  # 앱 시작 시간 고려\r\n  periodSeconds: 10        # 너무 빈번하면 오버헤드\r\n  timeoutSeconds: 5        # 네트워크 지연 고려\r\n  failureThreshold: 3      # 일시적 오류 허용\r\n  successThreshold: 1\r\n```\r\n\r\n**설정 팁**:\r\n- 실패 감지 시간 = periodSeconds * failureThreshold\r\n- timeoutSeconds < periodSeconds\r\n- Startup Probe 활용으로 initialDelaySeconds 최소화",
    "references": [
      {
        "title": "Configure Probes",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes"
      }
    ]
  },
  {
    "id": "K8S-100",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "잘못된 Kubernetes Probe 설정으로 인한 문제(CrashLoopBackOff, 서비스 불가 등)와 해결 방법을 설명해주세요.",
    "answer": "**일반적인 문제와 해결**:\r\n\r\n**1. CrashLoopBackOff**:\r\n- 원인: Liveness 실패로 계속 재시작\r\n- 해결: initialDelaySeconds 증가, Startup Probe 사용\r\n\r\n**2. 서비스 불가 (트래픽 수신 안함)**:\r\n- 원인: Readiness 계속 실패\r\n- 해결: 엔드포인트/포트 확인, threshold 조정\r\n\r\n**3. 느린 응답으로 인한 재시작**:\r\n- 원인: timeoutSeconds 너무 짧음\r\n- 해결: timeoutSeconds 증가 (기본 1초)\r\n\r\n**4. 잦은 재시작**:\r\n- 원인: failureThreshold 너무 낮음\r\n- 해결: 일시적 오류 고려하여 증가\r\n\r\n**디버깅**:\r\n```bash\r\nkubectl describe pod <name>  # Events 확인\r\nkubectl logs <name> --previous  # 이전 로그\r\n```\r\n\r\n**Best Practice**:\r\n- Liveness/Readiness 다른 엔드포인트 사용\r\n- Liveness는 보수적으로 (재시작 최소화)\r\n- Readiness는 엄격하게 (준비된 Pod만)",
    "references": [
      {
        "title": "Probes",
        "url": "https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/"
      }
    ]
  },
  {
    "id": "K8S-101",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "kubectl logs 명령어의 다양한 옵션(-f, --previous, -c, --since)을 설명해주세요.",
    "answer": "**주요 옵션**:\r\n\r\n| 옵션 | 설명 |\r\n|------|------|\r\n| `-f, --follow` | 실시간 로그 스트리밍 |\r\n| `--previous` | 이전 컨테이너 로그 (재시작 전) |\r\n| `-c <container>` | 특정 컨테이너 지정 (멀티컨테이너) |\r\n| `--since=1h` | 지난 1시간 로그 |\r\n| `--since-time` | 특정 시간 이후 |\r\n| `--tail=100` | 마지막 100줄 |\r\n| `--timestamps` | 타임스탬프 포함 |\r\n\r\n**사용 예시**:\r\n```bash\r\n# 실시간 로그\r\nkubectl logs -f pod-name\r\n\r\n# 이전 컨테이너 로그 (crash 분석)\r\nkubectl logs pod-name --previous\r\n\r\n# 멀티컨테이너 Pod에서 특정 컨테이너\r\nkubectl logs pod-name -c sidecar\r\n\r\n# 최근 1시간, 마지막 50줄\r\nkubectl logs pod-name --since=1h --tail=50\r\n\r\n# 레이블로 여러 Pod 로그\r\nkubectl logs -l app=nginx --all-containers\r\n```",
    "references": [
      {
        "title": "kubectl logs",
        "url": "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/"
      }
    ]
  },
  {
    "id": "K8S-102",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes에서의 로깅 아키텍처와 노드 레벨/클러스터 레벨 로깅의 차이를 설명해주세요.",
    "answer": "**로깅 아키텍처**:\r\n- 컨테이너 stdout/stderr -> 컨테이너 런타임 -> 노드 파일시스템\r\n- 경로: `/var/log/containers/`, `/var/log/pods/`\r\n\r\n**노드 레벨 로깅**:\r\n- 각 노드에서 로그 로테이션\r\n- kubelet이 관리 (logrotate)\r\n- 제한: Pod 삭제 시 로그 손실\r\n\r\n**클러스터 레벨 로깅**:\r\n- 중앙 집중식 로그 수집/저장\r\n- Pod 삭제 후에도 로그 보존\r\n\r\n**클러스터 레벨 구현 방법**:\r\n| 방법 | 설명 |\r\n|------|------|\r\n| Node-level agent | DaemonSet으로 Fluentd/Filebeat |\r\n| Sidecar | 앱과 함께 로그 수집기 |\r\n| Direct push | 앱에서 직접 로그 서비스로 전송 |\r\n\r\n**일반적 스택**: Fluentd + Elasticsearch + Kibana (EFK)",
    "references": [
      {
        "title": "Logging Architecture",
        "url": "https://kubernetes.io/docs/concepts/cluster-administration/logging/"
      }
    ]
  },
  {
    "id": "K8S-103",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "metrics-server의 역할과 kubectl top 명령어 사용 방법을 설명해주세요.",
    "answer": "**metrics-server 역할**:\r\n- 클러스터 내 리소스 메트릭 수집 (CPU, Memory)\r\n- kubelet에서 메트릭 수집\r\n- HPA, VPA, kubectl top에 메트릭 제공\r\n- Metrics API 노출 (`metrics.k8s.io`)\r\n\r\n**설치**:\r\n```bash\r\nkubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml\r\n```\r\n\r\n**kubectl top 사용**:\r\n```bash\r\n# 노드 리소스 사용량\r\nkubectl top nodes\r\n\r\n# Pod 리소스 사용량\r\nkubectl top pods\r\n\r\n# 특정 네임스페이스\r\nkubectl top pods -n kube-system\r\n\r\n# 컨테이너별 사용량\r\nkubectl top pods --containers\r\n\r\n# 정렬\r\nkubectl top pods --sort-by=cpu\r\nkubectl top pods --sort-by=memory\r\n```\r\n\r\n**주의**: 실시간 메트릭이 아닌 짧은 기간 평균값",
    "references": [
      {
        "title": "metrics-server",
        "url": "https://github.com/kubernetes-sigs/metrics-server"
      }
    ]
  },
  {
    "id": "K8S-104",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Prometheus를 활용한 Kubernetes 모니터링 구성 방법을 설명해주세요.",
    "answer": "**구성 요소**:\r\n- Prometheus Server: 메트릭 수집/저장\r\n- Node Exporter: 노드 메트릭\r\n- kube-state-metrics: K8s 오브젝트 상태\r\n- Alertmanager: 알림 관리\r\n- Grafana: 시각화\r\n\r\n**설치 방법** (kube-prometheus-stack):\r\n```bash\r\nhelm repo add prometheus-community https://prometheus-community.github.io/helm-charts\r\nhelm install prometheus prometheus-community/kube-prometheus-stack\r\n```\r\n\r\n**서비스 디스커버리**:\r\n- Prometheus가 K8s API로 타겟 자동 발견\r\n- Pod annotation으로 스크래핑 설정\r\n```yaml\r\nmetadata:\r\n  annotations:\r\n    prometheus.io/scrape: \"true\"\r\n    prometheus.io/port: \"9090\"\r\n```\r\n\r\n**주요 메트릭 소스**:\r\n- kubelet `/metrics`: 컨테이너 메트릭\r\n- API server `/metrics`: API 메트릭\r\n- Node exporter: 노드 OS 메트릭",
    "references": [
      {
        "title": "Prometheus Operator",
        "url": "https://prometheus-operator.dev/"
      }
    ]
  },
  {
    "id": "K8S-105",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes에서 수집해야 하는 주요 메트릭(Node, Pod, Container 레벨)을 설명해주세요.",
    "answer": "**Node 레벨**:\r\n- CPU 사용률: `node_cpu_seconds_total`\r\n- 메모리: `node_memory_MemAvailable_bytes`\r\n- 디스크: `node_filesystem_avail_bytes`\r\n- 네트워크: `node_network_receive_bytes_total`\r\n\r\n**Pod/Container 레벨**:\r\n- CPU: `container_cpu_usage_seconds_total`\r\n- 메모리: `container_memory_working_set_bytes`\r\n- 재시작 횟수: `kube_pod_container_status_restarts_total`\r\n- 상태: `kube_pod_status_phase`\r\n\r\n**Kubernetes 오브젝트**:\r\n- Deployment replicas: `kube_deployment_status_replicas_available`\r\n- PVC 상태: `kube_persistentvolumeclaim_status_phase`\r\n- Job 상태: `kube_job_status_succeeded`\r\n\r\n**알림 권장 메트릭**:\r\n- Pod CrashLoopBackOff\r\n- Node NotReady\r\n- PVC Pending\r\n- CPU/Memory 임계치 초과\r\n- HPA 최대 replicas 도달",
    "references": [
      {
        "title": "kube-state-metrics",
        "url": "https://github.com/kubernetes/kube-state-metrics"
      }
    ]
  },
  {
    "id": "K8S-106",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Helm의 역할과 Chart, Release, Repository의 개념을 설명해주세요.",
    "answer": "**Helm 역할**: Kubernetes 패키지 관리자, 앱 배포/관리 간소화\r\n\r\n**핵심 개념**:\r\n\r\n| 개념 | 설명 |\r\n|------|------|\r\n| **Chart** | Kubernetes 리소스 패키지 (템플릿 + 설정) |\r\n| **Release** | Chart의 설치 인스턴스 |\r\n| **Repository** | Chart 저장소 |\r\n\r\n**예시**:\r\n```bash\r\n# Repository 추가\r\nhelm repo add bitnami https://charts.bitnami.com/bitnami\r\n\r\n# Chart 검색\r\nhelm search repo nginx\r\n\r\n# Chart 설치 (Release 생성)\r\nhelm install my-nginx bitnami/nginx\r\n\r\n# Release 목록\r\nhelm list\r\n\r\n# Release 삭제\r\nhelm uninstall my-nginx\r\n```\r\n\r\n**특징**:\r\n- 버전 관리: Chart와 Release 모두 버전화\r\n- 롤백 지원: `helm rollback`\r\n- 값 오버라이드: `--set`, `-f values.yaml`",
    "references": [
      {
        "title": "Helm Documentation",
        "url": "https://helm.sh/docs/"
      }
    ]
  },
  {
    "id": "K8S-107",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Helm Chart의 구조(Chart.yaml, values.yaml, templates/)를 설명해주세요.",
    "answer": "**Chart 디렉토리 구조**:\r\n```\r\nmychart/\r\n├── Chart.yaml        # Chart 메타데이터\r\n├── values.yaml       # 기본 설정값\r\n├── charts/           # 의존성 Chart\r\n├── templates/        # K8s 매니페스트 템플릿\r\n│   ├── deployment.yaml\r\n│   ├── service.yaml\r\n│   ├── _helpers.tpl  # 템플릿 헬퍼\r\n│   └── NOTES.txt     # 설치 후 안내문\r\n└── .helmignore       # 무시할 파일\r\n```\r\n\r\n**Chart.yaml**:\r\n```yaml\r\napiVersion: v2\r\nname: mychart\r\nversion: 1.0.0\r\nappVersion: \"1.16.0\"\r\ndescription: A Helm chart\r\ndependencies:\r\n  - name: postgresql\r\n    version: \"11.x.x\"\r\n    repository: \"https://charts.bitnami.com/bitnami\"\r\n```\r\n\r\n**values.yaml**:\r\n```yaml\r\nreplicaCount: 3\r\nimage:\r\n  repository: nginx\r\n  tag: \"1.19\"\r\n```\r\n\r\n**templates/deployment.yaml**:\r\n```yaml\r\nreplicas: {{ .Values.replicaCount }}\r\nimage: {{ .Values.image.repository }}:{{ .Values.image.tag }}\r\n```",
    "references": [
      {
        "title": "Chart Template Guide",
        "url": "https://helm.sh/docs/chart_template_guide/"
      }
    ]
  },
  {
    "id": "K8S-108",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Helm의 템플릿 함수와 values.yaml을 통한 설정 오버라이드 방법을 설명해주세요.",
    "answer": "**주요 템플릿 함수**:\r\n```yaml\r\n# 기본값 설정\r\n{{ .Values.name | default \"default-name\" }}\r\n\r\n# 조건문\r\n{{ if .Values.enabled }}\r\n...\r\n{{ end }}\r\n\r\n# 반복문\r\n{{ range .Values.items }}\r\n- {{ . }}\r\n{{ end }}\r\n\r\n# 들여쓰기\r\n{{ .Values.config | toYaml | nindent 4 }}\r\n\r\n# 필수값 검증\r\n{{ required \"name is required\" .Values.name }}\r\n```\r\n\r\n**설정 오버라이드 방법**:\r\n\r\n**1. --set 플래그**:\r\n```bash\r\nhelm install my-app ./chart --set replicaCount=5\r\nhelm install my-app ./chart --set image.tag=v2\r\n```\r\n\r\n**2. values 파일**:\r\n```bash\r\nhelm install my-app ./chart -f production-values.yaml\r\n```\r\n\r\n**3. 여러 파일 조합** (뒤가 우선):\r\n```bash\r\nhelm install my-app ./chart -f values.yaml -f override.yaml\r\n```\r\n\r\n**우선순위**: --set > -f (마지막) > 기본 values.yaml",
    "references": [
      {
        "title": "Helm Values",
        "url": "https://helm.sh/docs/chart_template_guide/values_files/"
      }
    ]
  },
  {
    "id": "K8S-109",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Helm의 Release 관리(install, upgrade, rollback, uninstall)와 Revision에 대해 설명해주세요.",
    "answer": "**Release 관리 명령어**:\r\n\r\n```bash\r\n# 설치 (Revision 1 생성)\r\nhelm install my-app ./chart\r\n\r\n# 업그레이드 (새 Revision 생성)\r\nhelm upgrade my-app ./chart --set replicas=5\r\n\r\n# 롤백 (이전 Revision으로)\r\nhelm rollback my-app 1\r\n\r\n# 삭제\r\nhelm uninstall my-app\r\n\r\n# 히스토리 조회\r\nhelm history my-app\r\n```\r\n\r\n**Revision 개념**:\r\n- 각 install/upgrade마다 Revision 번호 증가\r\n- 이전 Revision 상태 저장 (롤백용)\r\n- Secret으로 저장 (release.* 레이블)\r\n\r\n**유용한 옵션**:\r\n```bash\r\n# 업그레이드 또는 없으면 설치\r\nhelm upgrade --install my-app ./chart\r\n\r\n# Dry-run (실제 적용 안함)\r\nhelm upgrade my-app ./chart --dry-run\r\n\r\n# 변경사항 확인\r\nhelm diff upgrade my-app ./chart\r\n```",
    "references": [
      {
        "title": "Helm Release Management",
        "url": "https://helm.sh/docs/intro/using_helm/"
      }
    ]
  },
  {
    "id": "K8S-110",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Helm Hooks의 역할과 pre-install, post-install 등의 사용 사례를 설명해주세요.",
    "answer": "**Hook 역할**: 릴리스 라이프사이클 특정 시점에 작업 실행\r\n\r\n**Hook 종류**:\r\n| Hook | 실행 시점 |\r\n|------|----------|\r\n| pre-install | 템플릿 렌더링 후, 리소스 생성 전 |\r\n| post-install | 모든 리소스 생성 후 |\r\n| pre-upgrade | 업그레이드 전 |\r\n| post-upgrade | 업그레이드 후 |\r\n| pre-delete | 삭제 요청 후, 리소스 삭제 전 |\r\n| post-delete | 모든 리소스 삭제 후 |\r\n| pre-rollback | 롤백 전 |\r\n| post-rollback | 롤백 후 |\r\n\r\n**설정 예시**:\r\n```yaml\r\napiVersion: batch/v1\r\nkind: Job\r\nmetadata:\r\n  annotations:\r\n    \"helm.sh/hook\": pre-install\r\n    \"helm.sh/hook-weight\": \"-5\"\r\n    \"helm.sh/hook-delete-policy\": hook-succeeded\r\n```\r\n\r\n**사용 사례**:\r\n- pre-install: DB 스키마 마이그레이션\r\n- post-install: 초기 데이터 로드\r\n- pre-upgrade: 백업 생성\r\n- post-delete: 정리 작업",
    "references": [
      {
        "title": "Helm Hooks",
        "url": "https://helm.sh/docs/topics/charts_hooks/"
      }
    ]
  },
  {
    "id": "K8S-111",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes 클러스터 버전 업그레이드 절차와 주의사항을 설명해주세요.",
    "answer": "**업그레이드 절차**:\r\n1. 릴리스 노트 확인 (deprecation, breaking changes)\r\n2. etcd 백업\r\n3. Control Plane 업그레이드 (순차적)\r\n4. Worker Node 업그레이드 (하나씩)\r\n5. 검증\r\n\r\n**주의사항**:\r\n- **버전 스킵 금지**: 한 번에 한 마이너 버전만 (1.25 -> 1.26, 1.25 -> 1.27 불가)\r\n- **버전 차이 제한** (Skew Policy):\r\n  - kube-apiserver: 모든 Control Plane이 동일 버전 권장\r\n  - kubelet: API server보다 최대 2 마이너 버전 낮을 수 있음\r\n  - kube-proxy, kubectl: API server와 +/-1 버전\r\n- **API 변경 확인**: deprecated API 미리 대응\r\n- **애드온 호환성**: CNI, CSI, Ingress Controller 등 버전 확인\r\n\r\n**업그레이드 전 체크리스트**:\r\n1. etcd 백업 완료\r\n2. Release Notes의 Breaking Changes 확인\r\n3. deprecated API 사용 여부 확인: `kubectl deprecations`\r\n4. 충분한 노드 리소스 (drain 시 Pod 이동 공간)\r\n5. PodDisruptionBudget 확인\r\n\r\n**kubeadm 업그레이드 (예시)**:\r\n```bash\r\n# Control Plane\r\nkubeadm upgrade plan\r\nkubeadm upgrade apply v1.27.0\r\n\r\n# Node\r\nkubectl drain node1 --ignore-daemonsets\r\napt-get upgrade kubelet kubectl\r\nsystemctl restart kubelet\r\nkubectl uncordon node1\r\n```\r\n\r\n**롤백**: kubeadm은 자동 롤백 미지원, etcd 스냅샷으로 복구",
    "references": [
      {
        "title": "Upgrading kubeadm clusters",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/"
      }
    ]
  },
  {
    "id": "K8S-112",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Control Plane 업그레이드와 Worker Node 업그레이드의 순서와 방법을 설명해주세요.",
    "answer": "**순서**: Control Plane 먼저 -> Worker Node\r\n\r\n**Control Plane 업그레이드**:\r\n```bash\r\n# 1. kubeadm 업그레이드\r\napt-get update && apt-get install -y kubeadm=1.27.0-00\r\n\r\n# 2. 업그레이드 계획 확인\r\nkubeadm upgrade plan\r\n\r\n# 3. 첫 번째 Control Plane 노드\r\nkubeadm upgrade apply v1.27.0\r\n\r\n# 4. 나머지 Control Plane 노드\r\nkubeadm upgrade node\r\n\r\n# 5. kubelet, kubectl 업그레이드\r\napt-get install -y kubelet=1.27.0-00 kubectl=1.27.0-00\r\nsystemctl restart kubelet\r\n```\r\n\r\n**Worker Node 업그레이드**:\r\n```bash\r\n# 1. 노드 drain (워크로드 이동)\r\nkubectl drain node1 --ignore-daemonsets --delete-emptydir-data\r\n\r\n# 2. kubeadm 업그레이드\r\nkubeadm upgrade node\r\n\r\n# 3. kubelet 업그레이드\r\napt-get install -y kubelet=1.27.0-00\r\nsystemctl restart kubelet\r\n\r\n# 4. 노드 활성화\r\nkubectl uncordon node1\r\n```\r\n\r\n**HA 고려**: Control Plane 하나씩 순차적으로",
    "references": [
      {
        "title": "Upgrade worker nodes",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/upgrading-linux-nodes/"
      }
    ]
  },
  {
    "id": "K8S-113",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "etcd 백업과 복구 방법을 설명해주세요.",
    "answer": "**etcd 백업**:\r\n```bash\r\nETCDCTL_API=3 etcdctl snapshot save snapshot.db \\\r\n  --endpoints=https://127.0.0.1:2379 \\\r\n  --cacert=/etc/kubernetes/pki/etcd/ca.crt \\\r\n  --cert=/etc/kubernetes/pki/etcd/server.crt \\\r\n  --key=/etc/kubernetes/pki/etcd/server.key\r\n\r\n# 백업 확인 (무결성 검증)\r\nETCDCTL_API=3 etcdctl snapshot status snapshot.db --write-out=table\r\n```\r\n\r\n**etcd 복구** (단일 노드 예시):\r\n```bash\r\n# 1. 모든 Control Plane에서 kube-apiserver, etcd 중지\r\nmv /etc/kubernetes/manifests/kube-apiserver.yaml /tmp/\r\nmv /etc/kubernetes/manifests/etcd.yaml /tmp/\r\n\r\n# 2. 스냅샷 복구 (새 클러스터로)\r\nETCDCTL_API=3 etcdctl snapshot restore snapshot.db \\\r\n  --data-dir=/var/lib/etcd-restore \\\r\n  --name=master \\\r\n  --initial-cluster=master=https://127.0.0.1:2380 \\\r\n  --initial-advertise-peer-urls=https://127.0.0.1:2380\r\n\r\n# 3. etcd 데이터 디렉토리 교체\r\nmv /var/lib/etcd /var/lib/etcd-backup\r\nmv /var/lib/etcd-restore /var/lib/etcd\r\n\r\n# 4. etcd, kube-apiserver 재시작\r\nmv /tmp/etcd.yaml /etc/kubernetes/manifests/\r\nmv /tmp/kube-apiserver.yaml /etc/kubernetes/manifests/\r\n```\r\n\r\n**HA 클러스터 복구 시 주의**:\r\n- 모든 etcd 노드에서 동시에 복구 수행\r\n- initial-cluster에 모든 멤버 포함\r\n- 복구 후 멤버십 확인: `etcdctl member list`\r\n\r\n**백업 권장 사항**:\r\n- 정기적 자동 백업 (cronjob) - 최소 1시간 간격\r\n- 오프사이트 저장 (S3, GCS) - 암호화 필수\r\n- 복구 테스트 정기 수행 - 분기별 권장\r\n- 클러스터 업그레이드 전 반드시 백업\r\n\r\n**흔한 실수**:\r\n- 복구 시 --data-dir를 기존 경로로 지정 (덮어쓰기 실패)\r\n- 멀티노드에서 한 노드만 복구 (클러스터 불일치)",
    "references": [
      {
        "title": "Operating etcd",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/"
      }
    ]
  },
  {
    "id": "K8S-114",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "kubectl drain과 cordon 명령어의 역할과 차이점을 설명해주세요.",
    "answer": "**cordon**:\r\n- 노드를 스케줄 불가(Unschedulable)로 표시\r\n- 기존 Pod는 계속 실행\r\n- 새 Pod만 스케줄링 안됨\r\n\r\n```bash\r\nkubectl cordon node1\r\nkubectl uncordon node1  # 해제\r\n```\r\n\r\n**drain**:\r\n- cordon + 기존 Pod 제거 (eviction)\r\n- Pod를 다른 노드로 이동\r\n- DaemonSet Pod는 기본적으로 무시\r\n\r\n```bash\r\nkubectl drain node1 --ignore-daemonsets --delete-emptydir-data\r\n```\r\n\r\n**차이점**:\r\n| 명령어 | 새 Pod 스케줄 | 기존 Pod |\r\n|--------|--------------|----------|\r\n| cordon | 차단 | 유지 |\r\n| drain | 차단 | 제거/이동 |\r\n\r\n**drain 옵션**:\r\n- `--ignore-daemonsets`: DaemonSet Pod 무시\r\n- `--delete-emptydir-data`: emptyDir 볼륨 Pod 삭제\r\n- `--force`: RC 없는 Pod 강제 삭제",
    "references": [
      {
        "title": "Safely Drain a Node",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/"
      }
    ]
  },
  {
    "id": "K8S-115",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "노드 유지보수 시 Pod 안전하게 이동시키는 방법과 PodDisruptionBudget의 역할을 설명해주세요.",
    "answer": "**안전한 Pod 이동 절차**:\r\n1. PDB 설정 확인/생성\r\n2. `kubectl drain` 실행\r\n3. 유지보수 작업\r\n4. `kubectl uncordon` 실행\r\n\r\n**PodDisruptionBudget (PDB)**:\r\n자발적 중단 시 최소 가용 Pod 수 보장\r\n\r\n```yaml\r\napiVersion: policy/v1\r\nkind: PodDisruptionBudget\r\nmetadata:\r\n  name: app-pdb\r\nspec:\r\n  minAvailable: 2        # 최소 2개 유지\r\n  # 또는\r\n  # maxUnavailable: 1    # 최대 1개만 중단\r\n  selector:\r\n    matchLabels:\r\n      app: myapp\r\n```\r\n\r\n**PDB 동작**:\r\n- drain 시 PDB 조건 만족해야 eviction 진행\r\n- 조건 불만족 시 eviction 대기\r\n- 강제 삭제(`--force`)는 PDB 무시\r\n\r\n**트레이드오프 - minAvailable vs maxUnavailable**:\r\n| 설정 | 장점 | 단점 |\r\n|------|------|------|\r\n| minAvailable: N | 최소 N개 보장 명확 | 스케일 다운 시 조정 필요 |\r\n| maxUnavailable: N | 스케일 변경에 유연 | 작은 replicas에서 위험 |\r\n\r\n**흔한 함정**:\r\n- replicas=2, minAvailable=2 → drain 불가\r\n- replicas=1 → PDB 의미 없음\r\n- PDB 미설정 → drain이 모든 Pod 한번에 종료 가능\r\n- 비자발적 중단 (노드 장애) → PDB 적용 안됨\r\n\r\n**Best Practice**:\r\n- 프로덕션 워크로드에 PDB 필수\r\n- minAvailable 또는 maxUnavailable 중 하나만 설정\r\n- replicas 수 고려하여 설정 (minAvailable < replicas)",
    "references": [
      {
        "title": "PodDisruptionBudget",
        "url": "https://kubernetes.io/docs/concepts/workloads/pods/disruptions/"
      }
    ]
  },
  {
    "id": "K8S-116",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Pod가 CrashLoopBackOff 상태일 때의 원인 분석과 해결 방법을 설명해주세요.",
    "answer": "**CrashLoopBackOff**: 컨테이너가 반복적으로 시작 실패, 재시작 대기\r\n\r\n**주요 원인**:\r\n1. 애플리케이션 오류 (코드 버그, 설정 오류)\r\n2. 리소스 부족 (OOM Kill)\r\n3. 잘못된 command/args\r\n4. 의존성 문제 (DB 연결 실패)\r\n5. Liveness Probe 실패\r\n6. 권한 문제\r\n\r\n**분석 방법**:\r\n```bash\r\n# 이벤트 확인\r\nkubectl describe pod <name>\r\n\r\n# 현재/이전 로그\r\nkubectl logs <name>\r\nkubectl logs <name> --previous\r\n\r\n# 컨테이너 상태\r\nkubectl get pod <name> -o jsonpath='{.status.containerStatuses}'\r\n```\r\n\r\n**해결 방법**:\r\n- 로그 분석으로 원인 파악\r\n- OOM: 메모리 limits 증가\r\n- 의존성: Init Container로 대기\r\n- Liveness: Probe 설정 조정\r\n- 임시 디버깅: `command: [\"sleep\", \"3600\"]`",
    "references": [
      {
        "title": "Debug Pods",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/"
      }
    ]
  },
  {
    "id": "K8S-117",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Pod가 ImagePullBackOff 상태일 때의 원인과 해결 방법을 설명해주세요.",
    "answer": "**ImagePullBackOff**: 이미지 다운로드 반복 실패\r\n\r\n**주요 원인**:\r\n1. 이미지 이름/태그 오타\r\n2. 이미지 존재하지 않음\r\n3. Private registry 인증 실패\r\n4. 네트워크 문제\r\n5. Registry 접근 불가\r\n\r\n**분석 방법**:\r\n```bash\r\nkubectl describe pod <name>\r\n# Events에서 상세 오류 확인\r\n# \"Failed to pull image\" 메시지\r\n```\r\n\r\n**해결 방법**:\r\n\r\n**이미지 확인**:\r\n```bash\r\ndocker pull <image>  # 로컬에서 테스트\r\n```\r\n\r\n**Private registry 인증**:\r\n```bash\r\n# Secret 생성\r\nkubectl create secret docker-registry regcred \\\r\n  --docker-server=<registry> \\\r\n  --docker-username=<user> \\\r\n  --docker-password=<password>\r\n\r\n# Pod에 적용\r\nspec:\r\n  imagePullSecrets:\r\n  - name: regcred\r\n```\r\n\r\n**이미지 정책 확인**:\r\n- `imagePullPolicy: Always` -> 항상 pull\r\n- `imagePullPolicy: IfNotPresent` -> 없을 때만",
    "references": [
      {
        "title": "Images",
        "url": "https://kubernetes.io/docs/concepts/containers/images/"
      }
    ]
  },
  {
    "id": "K8S-118",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "kubectl describe, kubectl logs, kubectl exec를 활용한 디버깅 방법을 설명해주세요.",
    "answer": "**kubectl describe**:\r\n리소스 상세 정보와 이벤트 확인\r\n```bash\r\nkubectl describe pod <name>\r\nkubectl describe node <name>\r\nkubectl describe service <name>\r\n\r\n# 확인할 내용: Events, Conditions, Status\r\n```\r\n\r\n**kubectl logs**:\r\n컨테이너 로그 확인\r\n```bash\r\nkubectl logs <pod>\r\nkubectl logs <pod> -c <container>  # 특정 컨테이너\r\nkubectl logs <pod> --previous      # 이전 컨테이너\r\nkubectl logs <pod> -f              # 실시간\r\nkubectl logs -l app=nginx          # 레이블로 여러 Pod\r\n```\r\n\r\n**kubectl exec**:\r\n컨테이너 내부 명령 실행\r\n```bash\r\nkubectl exec <pod> -- ls /app\r\nkubectl exec -it <pod> -- /bin/sh  # 대화형 셸\r\nkubectl exec <pod> -c <container> -- cat /etc/config\r\n\r\n# 네트워크 디버깅\r\nkubectl exec <pod> -- curl localhost:8080\r\nkubectl exec <pod> -- nslookup kubernetes\r\n```\r\n\r\n**디버깅 순서**:\r\n1. describe로 이벤트 확인\r\n2. logs로 애플리케이션 로그 확인\r\n3. exec로 내부 상태 확인",
    "references": [
      {
        "title": "Debug Running Pods",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/"
      }
    ]
  },
  {
    "id": "K8S-119",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "kubectl debug 명령어를 활용한 ephemeral container 디버깅 방법을 설명해주세요.",
    "answer": "**kubectl debug**: 실행 중인 Pod에 디버깅 컨테이너 추가\r\n\r\n**Ephemeral Container 사용**:\r\n```bash\r\n# 디버깅 컨테이너 추가\r\nkubectl debug -it <pod> --image=busybox --target=<container>\r\n\r\n# 기존 컨테이너와 프로세스 네임스페이스 공유\r\nkubectl debug -it <pod> --image=ubuntu --share-processes\r\n```\r\n\r\n**Pod 복사본으로 디버깅**:\r\n```bash\r\n# 수정된 복사본 생성\r\nkubectl debug <pod> -it --copy-to=debug-pod --container=debugger --image=ubuntu\r\n\r\n# 다른 command로 복사\r\nkubectl debug <pod> --copy-to=debug-pod --set-image=*=ubuntu -- sleep 3600\r\n```\r\n\r\n**노드 디버깅**:\r\n```bash\r\nkubectl debug node/<node-name> -it --image=ubuntu\r\n# 노드 파일시스템: /host\r\n```\r\n\r\n**장점**:\r\n- Distroless 이미지 디버깅 가능\r\n- 실행 중인 Pod 변경 없이 디버깅\r\n- 네트워크/프로세스 네임스페이스 공유",
    "references": [
      {
        "title": "Debug with Ephemeral Containers",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/#ephemeral-container"
      }
    ]
  },
  {
    "id": "K8S-120",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Service에 연결되지 않는 Pod 문제 해결 방법(selector, endpoints 확인 등)을 설명해주세요.",
    "answer": "**문제 분석 단계**:\r\n\r\n**1. Service selector 확인**:\r\n```bash\r\nkubectl get svc <name> -o yaml\r\n# spec.selector 확인\r\n```\r\n\r\n**2. Pod 레이블 확인**:\r\n```bash\r\nkubectl get pods --show-labels\r\n# Service selector와 일치하는지 확인\r\n```\r\n\r\n**3. Endpoints 확인**:\r\n```bash\r\nkubectl get endpoints <service-name>\r\n# Pod IP가 등록되어 있는지 확인\r\n# 비어있으면 selector 불일치 또는 Pod 없음\r\n```\r\n\r\n**4. Pod 상태 확인**:\r\n```bash\r\nkubectl get pods\r\n# Running 상태인지, Readiness Probe 통과했는지\r\n```\r\n\r\n**5. 포트 확인**:\r\n```bash\r\n# Service targetPort = Container port\r\nkubectl describe svc <name>\r\nkubectl describe pod <name>\r\n```\r\n\r\n**일반적인 원인**:\r\n- selector 오타\r\n- 레이블 불일치\r\n- Readiness Probe 실패\r\n- Pod가 Running이 아님\r\n- 포트 번호 불일치\r\n\r\n**테스트**:\r\n```bash\r\nkubectl run test --image=busybox -it --rm -- wget -O- <service>:<port>\r\n```",
    "references": [
      {
        "title": "Debug Services",
        "url": "https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/"
      }
    ]
  },
  {
    "id": "K8S-121",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "DNS 관련 문제 해결 방법(CoreDNS 확인, nslookup 테스트 등)을 설명해주세요.",
    "answer": "**DNS 문제 진단**:\r\n\r\n**1. CoreDNS 상태 확인**:\r\n```bash\r\nkubectl get pods -n kube-system -l k8s-app=kube-dns\r\nkubectl logs -n kube-system -l k8s-app=kube-dns\r\n```\r\n\r\n**2. Pod 내부에서 DNS 테스트**:\r\n```bash\r\nkubectl run test --image=busybox:1.28 -it --rm -- nslookup kubernetes\r\nkubectl run test --image=busybox:1.28 -it --rm -- nslookup <service>.<namespace>\r\n```\r\n\r\n**3. resolv.conf 확인**:\r\n```bash\r\nkubectl exec <pod> -- cat /etc/resolv.conf\r\n# nameserver가 CoreDNS ClusterIP인지 확인\r\n```\r\n\r\n**4. CoreDNS ConfigMap 확인**:\r\n```bash\r\nkubectl get configmap coredns -n kube-system -o yaml\r\n```\r\n\r\n**일반적인 원인**:\r\n- CoreDNS Pod 장애\r\n- NetworkPolicy로 DNS 차단\r\n- 잘못된 Service/Namespace 이름\r\n- 노드 DNS 설정 문제\r\n\r\n**DNS 형식**:\r\n- Service: `<svc>.<ns>.svc.cluster.local`\r\n- Pod: `<pod-ip>.<ns>.pod.cluster.local`",
    "references": [
      {
        "title": "Debugging DNS Resolution",
        "url": "https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/"
      }
    ]
  },
  {
    "id": "K8S-122",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "서비스 메시(Service Mesh)의 개념과 필요성에 대해 설명해주세요.",
    "answer": "**서비스 메시 개념**: 마이크로서비스 간 통신을 관리하는 인프라 계층\r\n\r\n**구성**:\r\n- Data Plane: Sidecar 프록시 (Envoy)로 트래픽 처리\r\n- Control Plane: 정책 관리, 설정 배포\r\n\r\n**필요성**:\r\n\r\n| 기능 | 설명 |\r\n|------|------|\r\n| **트래픽 관리** | 로드밸런싱, 라우팅, A/B 테스트, Canary |\r\n| **보안** | mTLS 암호화, 인증/인가 |\r\n| **관찰성** | 분산 추적, 메트릭, 로그 |\r\n| **복원력** | 재시도, 타임아웃, 서킷브레이커 |\r\n\r\n**없을 때 문제점**:\r\n- 각 서비스에서 직접 구현 필요\r\n- 언어/프레임워크별 다른 구현\r\n- 일관성 없는 보안/모니터링\r\n\r\n**적합한 상황**:\r\n- 많은 마이크로서비스\r\n- 복잡한 서비스 간 통신\r\n- 강화된 보안 요구사항",
    "references": [
      {
        "title": "Service Mesh",
        "url": "https://istio.io/latest/about/service-mesh/"
      }
    ]
  },
  {
    "id": "K8S-123",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Sidecar Proxy 패턴과 서비스 메시에서의 트래픽 제어 방식을 설명해주세요.",
    "answer": "**Sidecar Proxy 패턴**:\r\n- 각 Pod에 프록시 컨테이너 (Envoy) 주입\r\n- 모든 인바운드/아웃바운드 트래픽이 프록시 경유\r\n- 애플리케이션 코드 수정 없이 기능 추가\r\n\r\n**트래픽 흐름**:\r\n```\r\nApp A -> Envoy(A) -> Envoy(B) -> App B\r\n```\r\n\r\n**트래픽 제어 방식**:\r\n\r\n**1. 로드밸런싱**:\r\n- Round Robin, Least Connection, Random\r\n- 가중치 기반 분배\r\n\r\n**2. 트래픽 분할**:\r\n```yaml\r\n# 90% v1, 10% v2 (Canary)\r\nroute:\r\n- destination:\r\n    host: myapp\r\n    subset: v1\r\n  weight: 90\r\n- destination:\r\n    host: myapp\r\n    subset: v2\r\n  weight: 10\r\n```\r\n\r\n**3. 재시도/타임아웃**:\r\n```yaml\r\nretries:\r\n  attempts: 3\r\ntimeout: 5s\r\n```\r\n\r\n**4. 서킷브레이커**:\r\n- 연속 실패 시 요청 차단\r\n- 서비스 장애 전파 방지",
    "references": [
      {
        "title": "Istio Traffic Management",
        "url": "https://istio.io/latest/docs/concepts/traffic-management/"
      }
    ]
  },
  {
    "id": "K8S-124",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Istio의 아키텍처와 주요 컴포넌트(Envoy, Istiod)에 대해 설명해주세요.",
    "answer": "**Istio 아키텍처**:\r\n\r\n**Data Plane**:\r\n- **Envoy Proxy**: 각 Pod의 Sidecar로 배포\r\n  - L4/L7 프록시\r\n  - 트래픽 라우팅, 로드밸런싱\r\n  - TLS 종료, 인증\r\n  - 메트릭 수집\r\n\r\n**Control Plane**:\r\n- **Istiod**: 통합 컨트롤 플레인 (Pilot + Citadel + Galley 통합)\r\n  - Pilot: 서비스 디스커버리, 트래픽 정책\r\n  - Citadel: 인증서 관리, mTLS\r\n  - Galley: 설정 검증, 배포\r\n\r\n**설치**:\r\n```bash\r\nistioctl install --set profile=demo\r\nkubectl label namespace default istio-injection=enabled\r\n```\r\n\r\n**CRD**:\r\n- VirtualService: 트래픽 라우팅 규칙\r\n- DestinationRule: 로드밸런싱, 서킷브레이커\r\n- Gateway: Ingress/Egress 설정\r\n- AuthorizationPolicy: 접근 제어",
    "references": [
      {
        "title": "Istio Architecture",
        "url": "https://istio.io/latest/docs/ops/deployment/architecture/"
      }
    ]
  },
  {
    "id": "K8S-125",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Istio의 트래픽 관리 기능(VirtualService, DestinationRule)에 대해 설명해주세요.",
    "answer": "**VirtualService**: 요청 라우팅 규칙 정의\r\n\r\n```yaml\r\napiVersion: networking.istio.io/v1beta1\r\nkind: VirtualService\r\nmetadata:\r\n  name: reviews\r\nspec:\r\n  hosts:\r\n  - reviews\r\n  http:\r\n  - match:\r\n    - headers:\r\n        end-user:\r\n          exact: jason\r\n    route:\r\n    - destination:\r\n        host: reviews\r\n        subset: v2\r\n  - route:\r\n    - destination:\r\n        host: reviews\r\n        subset: v1\r\n```\r\n\r\n**DestinationRule**: 목적지 정책 정의\r\n\r\n```yaml\r\napiVersion: networking.istio.io/v1beta1\r\nkind: DestinationRule\r\nmetadata:\r\n  name: reviews\r\nspec:\r\n  host: reviews\r\n  trafficPolicy:\r\n    connectionPool:\r\n      tcp:\r\n        maxConnections: 100\r\n    outlierDetection:\r\n      consecutive5xxErrors: 5\r\n      interval: 30s\r\n  subsets:\r\n  - name: v1\r\n    labels:\r\n      version: v1\r\n  - name: v2\r\n    labels:\r\n      version: v2\r\n```\r\n\r\n**주요 기능**:\r\n- 트래픽 분할 (Canary, A/B)\r\n- 헤더 기반 라우팅\r\n- 재시도, 타임아웃\r\n- 서킷브레이커",
    "references": [
      {
        "title": "Istio Traffic Management",
        "url": "https://istio.io/latest/docs/concepts/traffic-management/"
      }
    ]
  },
  {
    "id": "K8S-126",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Istio의 보안 기능(mTLS, Authorization Policy)에 대해 설명해주세요.",
    "answer": "**mTLS (Mutual TLS)**:\r\n서비스 간 양방향 TLS 인증/암호화\r\n\r\n```yaml\r\napiVersion: security.istio.io/v1beta1\r\nkind: PeerAuthentication\r\nmetadata:\r\n  name: default\r\n  namespace: istio-system\r\nspec:\r\n  mtls:\r\n    mode: STRICT  # 모든 트래픽 mTLS 강제\r\n```\r\n\r\n**모드**:\r\n- STRICT: mTLS만 허용\r\n- PERMISSIVE: mTLS와 평문 모두 허용 (마이그레이션용)\r\n- DISABLE: mTLS 비활성화\r\n\r\n**Authorization Policy**:\r\n서비스 간 접근 제어\r\n\r\n```yaml\r\napiVersion: security.istio.io/v1beta1\r\nkind: AuthorizationPolicy\r\nmetadata:\r\n  name: httpbin-policy\r\nspec:\r\n  selector:\r\n    matchLabels:\r\n      app: httpbin\r\n  action: ALLOW\r\n  rules:\r\n  - from:\r\n    - source:\r\n        principals: [\"cluster.local/ns/default/sa/frontend\"]\r\n    to:\r\n    - operation:\r\n        methods: [\"GET\"]\r\n        paths: [\"/api/*\"]\r\n```\r\n\r\n**기능**: ServiceAccount 기반 인증, HTTP 메서드/경로 기반 인가",
    "references": [
      {
        "title": "Istio Security",
        "url": "https://istio.io/latest/docs/concepts/security/"
      }
    ]
  },
  {
    "id": "K8S-127",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Linkerd의 특징과 Istio와의 비교를 설명해주세요.",
    "answer": "**Linkerd 특징**:\r\n- 경량화, 단순성 중시\r\n- Rust로 작성된 프록시 (linkerd2-proxy)\r\n- 빠른 설치, 낮은 리소스 사용\r\n- CNCF graduated 프로젝트\r\n\r\n**Istio vs Linkerd 비교**:\r\n\r\n| 항목 | Istio | Linkerd |\r\n|------|-------|---------|\r\n| 프록시 | Envoy (C++) | linkerd2-proxy (Rust) |\r\n| 복잡도 | 높음 | 낮음 |\r\n| 리소스 | 더 많이 사용 | 경량 |\r\n| 기능 | 풍부 | 핵심 기능 집중 |\r\n| 학습 곡선 | 가파름 | 완만 |\r\n| 커뮤니티 | 더 큼 | 성장 중 |\r\n\r\n**선택 기준**:\r\n- **Istio**: 복잡한 트래픽 관리, 풍부한 기능 필요\r\n- **Linkerd**: 단순함, 낮은 오버헤드 우선\r\n\r\n**Linkerd 설치**:\r\n```bash\r\nlinkerd install | kubectl apply -f -\r\nlinkerd inject deployment.yaml | kubectl apply -f -\r\n```",
    "references": [
      {
        "title": "Linkerd",
        "url": "https://linkerd.io/"
      }
    ]
  },
  {
    "id": "K8S-128",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "CRD(Custom Resource Definition)의 개념과 Kubernetes 확장 방법을 설명해주세요.",
    "answer": "**CRD 개념**: Kubernetes API를 확장하여 사용자 정의 리소스 타입 생성\r\n\r\n**CRD 정의 예시**:\r\n```yaml\r\napiVersion: apiextensions.k8s.io/v1\r\nkind: CustomResourceDefinition\r\nmetadata:\r\n  name: myapps.example.com\r\nspec:\r\n  group: example.com\r\n  versions:\r\n  - name: v1\r\n    served: true\r\n    storage: true\r\n    schema:\r\n      openAPIV3Schema:\r\n        type: object\r\n        properties:\r\n          spec:\r\n            type: object\r\n            properties:\r\n              replicas:\r\n                type: integer\r\n  scope: Namespaced\r\n  names:\r\n    plural: myapps\r\n    singular: myapp\r\n    kind: MyApp\r\n```\r\n\r\n**Custom Resource 사용**:\r\n```yaml\r\napiVersion: example.com/v1\r\nkind: MyApp\r\nmetadata:\r\n  name: my-application\r\nspec:\r\n  replicas: 3\r\n```\r\n\r\n**확장 방법**:\r\n1. CRD로 리소스 타입 정의\r\n2. Custom Controller로 리소스 관리 로직 구현\r\n3. Operator 패턴으로 운영 자동화",
    "references": [
      {
        "title": "Custom Resources",
        "url": "https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/"
      }
    ]
  },
  {
    "id": "K8S-129",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Custom Resource와 Custom Controller의 관계를 설명해주세요.",
    "answer": "**관계**: Custom Resource는 \"원하는 상태\", Controller는 \"실제 구현\"\r\n\r\n**Custom Resource (CR)**:\r\n- 사용자가 정의한 Kubernetes 오브젝트\r\n- 원하는 상태(spec)를 선언\r\n- etcd에 저장됨\r\n\r\n**Custom Controller**:\r\n- CR을 감시(watch)\r\n- 현재 상태와 원하는 상태 비교\r\n- 차이를 해소하는 동작 수행 (Reconciliation Loop)\r\n\r\n**동작 흐름**:\r\n```\r\n1. 사용자가 CR 생성/수정\r\n2. Controller가 변경 감지\r\n3. Reconcile 함수 실행\r\n   - 현재 상태 조회\r\n   - 원하는 상태와 비교\r\n   - 필요한 작업 수행 (Pod 생성 등)\r\n4. CR status 업데이트\r\n```\r\n\r\n**예시**:\r\n```\r\nCRD: Database (종류 정의)\r\nCR: my-postgres (인스턴스)\r\nController: PostgreSQL Operator (실제 DB 생성/관리)\r\n```",
    "references": [
      {
        "title": "Controller Pattern",
        "url": "https://kubernetes.io/docs/concepts/architecture/controller/"
      }
    ]
  },
  {
    "id": "K8S-130",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Operator 패턴이란 무엇이며, 어떤 상황에서 사용하나요?",
    "answer": "**Operator 패턴**: CRD + Custom Controller로 복잡한 애플리케이션 운영 자동화\r\n\r\n**핵심 개념**:\r\n- 운영자(Operator)의 지식을 코드화\r\n- 도메인 전문 지식을 Kubernetes 리소스로 표현\r\n- 자동 복구, 스케일링, 업그레이드 등 자동화\r\n\r\n**사용 상황**:\r\n1. **Stateful 애플리케이션**: 데이터베이스, 메시지 큐\r\n2. **복잡한 설정**: 클러스터링, 복제 설정\r\n3. **운영 자동화**: 백업, 복구, 업그레이드\r\n4. **도메인 지식 필요**: 특정 애플리케이션의 운영 노하우\r\n\r\n**예시**:\r\n```yaml\r\napiVersion: postgresql.cnpg.io/v1\r\nkind: Cluster\r\nmetadata:\r\n  name: my-postgres\r\nspec:\r\n  instances: 3\r\n  storage:\r\n    size: 10Gi\r\n# Operator가 자동으로:\r\n# - 3개 인스턴스 생성\r\n# - 복제 설정\r\n# - 페일오버 처리\r\n```\r\n\r\n**Operator vs Helm**:\r\n- Helm: 설치/업그레이드 시점만\r\n- Operator: 전체 라이프사이클 관리",
    "references": [
      {
        "title": "Operator Pattern",
        "url": "https://kubernetes.io/docs/concepts/extend-kubernetes/operator/"
      }
    ]
  },
  {
    "id": "K8S-131",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Operator Framework(Operator SDK, Kubebuilder)를 활용한 Operator 개발 방법을 설명해주세요.",
    "answer": "**주요 프레임워크**:\r\n\r\n| 프레임워크 | 특징 |\r\n|-----------|------|\r\n| **Kubebuilder** | Go 기반, CNCF 프로젝트 |\r\n| **Operator SDK** | Go/Ansible/Helm 지원, Red Hat |\r\n\r\n**Kubebuilder 개발 흐름**:\r\n```bash\r\n# 프로젝트 초기화\r\nkubebuilder init --domain example.com\r\n\r\n# API 생성 (CRD + Controller)\r\nkubebuilder create api --group app --version v1 --kind MyApp\r\n\r\n# 구현\r\n# - api/v1/myapp_types.go (리소스 스키마)\r\n# - controllers/myapp_controller.go (Reconcile 로직)\r\n\r\n# CRD 설치 및 실행\r\nmake install\r\nmake run\r\n```\r\n\r\n**Reconcile 함수 예시**:\r\n```go\r\nfunc (r *MyAppReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {\r\n    // 1. CR 조회\r\n    var myapp appv1.MyApp\r\n    if err := r.Get(ctx, req.NamespacedName, &myapp); err != nil {\r\n        return ctrl.Result{}, client.IgnoreNotFound(err)\r\n    }\r\n\r\n    // 2. 원하는 상태로 조정\r\n    // Deployment 생성/업데이트 등\r\n\r\n    return ctrl.Result{}, nil\r\n}\r\n```",
    "references": [
      {
        "title": "Kubebuilder Book",
        "url": "https://book.kubebuilder.io/"
      }
    ]
  },
  {
    "id": "K8S-132",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "유명한 Operator 사례(Prometheus Operator, MySQL Operator 등)와 그 장점을 설명해주세요.",
    "answer": "**주요 Operator 사례**:\r\n\r\n| Operator | 용도 | 장점 |\r\n|----------|------|------|\r\n| **Prometheus Operator** | 모니터링 | ServiceMonitor CRD로 자동 타겟 설정 |\r\n| **Cert-Manager** | 인증서 관리 | Let's Encrypt 자동 발급/갱신 |\r\n| **Strimzi** | Kafka | 클러스터 자동 관리, 업그레이드 |\r\n| **Zalando PostgreSQL** | PostgreSQL | HA, 자동 페일오버 |\r\n| **Elastic Operator** | Elasticsearch | 클러스터 관리, 스케일링 |\r\n| **ArgoCD** | GitOps | 자동 배포, 동기화 |\r\n\r\n**Prometheus Operator 예시**:\r\n```yaml\r\napiVersion: monitoring.coreos.com/v1\r\nkind: ServiceMonitor\r\nmetadata:\r\n  name: my-app\r\nspec:\r\n  selector:\r\n    matchLabels:\r\n      app: my-app\r\n  endpoints:\r\n  - port: metrics\r\n# 자동으로 Prometheus 타겟에 추가\r\n```\r\n\r\n**Operator 장점**:\r\n- 복잡한 운영 작업 자동화\r\n- 일관된 배포/업그레이드\r\n- 도메인 전문 지식 캡슐화\r\n- 자가 치유 (self-healing)",
    "references": [
      {
        "title": "OperatorHub.io",
        "url": "https://operatorhub.io/"
      }
    ]
  },
  {
    "id": "K8S-133",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Kubernetes 클러스터 내 Pod 간 통신 원리를 설명해주세요.",
    "answer": "**Kubernetes 네트워크 모델 요구사항**:\r\n1. 모든 Pod는 NAT 없이 다른 Pod와 통신 가능\r\n2. 모든 노드는 NAT 없이 모든 Pod와 통신 가능\r\n3. Pod가 보는 자신의 IP = 다른 Pod가 보는 IP\r\n\r\n**Pod 간 통신 방식**:\r\n\r\n**같은 노드 내**:\r\n```\r\nPod A -> veth -> bridge (cbr0) -> veth -> Pod B\r\n```\r\n- 가상 이더넷 쌍 (veth)\r\n- 리눅스 브릿지로 연결\r\n\r\n**다른 노드 간**:\r\n```\r\nPod A -> veth -> bridge -> CNI (오버레이/라우팅) -> Node B -> bridge -> Pod B\r\n```\r\n\r\n**CNI 구현 방식**:\r\n- **오버레이**: VXLAN 터널 (Flannel, Weave)\r\n- **라우팅**: BGP 기반 (Calico)\r\n- **eBPF**: 커널 레벨 라우팅 (Cilium)\r\n\r\n**Pod IP 할당**:\r\n- 노드별 Pod CIDR 범위 할당\r\n- CNI가 Pod에 IP 할당",
    "references": [
      {
        "title": "Cluster Networking",
        "url": "https://kubernetes.io/docs/concepts/cluster-administration/networking/"
      }
    ]
  },
  {
    "id": "K8S-134",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Service의 ClusterIP가 동작하는 원리(kube-proxy, iptables/IPVS)를 설명해주세요.",
    "answer": "**ClusterIP 동작 원리**:\r\nClusterIP는 가상 IP로, 실제 인터페이스에 바인딩되지 않음\r\n\r\n**kube-proxy 역할**:\r\n- API Server에서 Service/Endpoints 변경 감지\r\n- 노드에 트래픽 라우팅 규칙 설정\r\n\r\n**iptables 모드**:\r\n```\r\nClient -> ClusterIP:port\r\n-> iptables DNAT (목적지 변경)\r\n-> Pod IP:targetPort\r\n```\r\n- Service당 iptables 규칙 생성\r\n- 랜덤 Pod 선택 (확률 기반)\r\n- 규칙 많아지면 성능 저하\r\n\r\n**IPVS 모드**:\r\n```\r\nClient -> ClusterIP:port\r\n-> IPVS 가상 서버\r\n-> Pod IP:targetPort\r\n```\r\n- 커널 레벨 로드밸런서\r\n- 해시 테이블 기반 (O(1) 조회)\r\n- 다양한 알고리즘 (rr, lc, sh, dh)\r\n- 대규모 클러스터에 적합\r\n\r\n**확인**:\r\n```bash\r\niptables-save | grep <service-name>\r\nipvsadm -Ln\r\n```",
    "references": [
      {
        "title": "Virtual IPs and Service Proxies",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies"
      }
    ]
  },
  {
    "id": "K8S-135",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Pod에서 외부 서비스로 통신할 때의 네트워크 흐름을 설명해주세요.",
    "answer": "**네트워크 흐름**:\r\n```\r\nPod -> CNI 네트워크 -> 노드 -> SNAT -> 외부 서비스\r\n```\r\n\r\n**상세 단계**:\r\n1. **Pod에서 요청 발생**\r\n   - 소스: Pod IP, 목적지: 외부 IP\r\n\r\n2. **CNI 네트워크 통과**\r\n   - Pod -> veth -> bridge -> 노드 eth0\r\n\r\n3. **SNAT (Source NAT)**\r\n   - 소스 IP: Pod IP -> 노드 IP로 변환\r\n   - 외부에서 응답 가능하도록\r\n\r\n4. **외부로 전송**\r\n   - 노드의 기본 라우팅 테이블 사용\r\n\r\n5. **응답 수신**\r\n   - 역SNAT: 노드 IP -> Pod IP\r\n   - Pod로 전달\r\n\r\n**Egress 제어**:\r\n- NetworkPolicy: 아웃바운드 트래픽 제한\r\n- NAT Gateway: 클라우드 환경에서 고정 IP 사용\r\n\r\n**ExternalName Service**:\r\n```yaml\r\nkind: Service\r\nspec:\r\n  type: ExternalName\r\n  externalName: api.external.com\r\n```",
    "references": [
      {
        "title": "Cluster Networking",
        "url": "https://kubernetes.io/docs/concepts/cluster-administration/networking/"
      }
    ]
  },
  {
    "id": "K8S-136",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Gateway API의 개념과 Ingress와의 차이점을 설명해주세요.",
    "answer": "**Gateway API**: 차세대 Ingress API, Kubernetes SIG-Network에서 개발\r\n\r\n**주요 리소스**:\r\n- **GatewayClass**: 인프라 공급자 정의 (클러스터 관리자)\r\n- **Gateway**: 로드밸런서 인스턴스 (인프라 관리자)\r\n- **HTTPRoute**: 라우팅 규칙 (앱 개발자)\r\n\r\n**Ingress와의 차이**:\r\n\r\n| 항목 | Ingress | Gateway API |\r\n|------|---------|-------------|\r\n| 프로토콜 | HTTP/HTTPS | HTTP, TCP, UDP, gRPC |\r\n| 역할 분리 | 없음 | GatewayClass/Gateway/Route |\r\n| 확장성 | annotations | 명시적 CRD |\r\n| 표준화 | 느슨함 | 엄격한 스펙 |\r\n| 트래픽 분할 | 미지원 | 기본 지원 |\r\n\r\n**예시**:\r\n```yaml\r\napiVersion: gateway.networking.k8s.io/v1\r\nkind: HTTPRoute\r\nmetadata:\r\n  name: my-route\r\nspec:\r\n  parentRefs:\r\n  - name: my-gateway\r\n  rules:\r\n  - matches:\r\n    - path:\r\n        value: /api\r\n    backendRefs:\r\n    - name: api-service\r\n      port: 80\r\n      weight: 90\r\n    - name: api-service-v2\r\n      port: 80\r\n      weight: 10\r\n```",
    "references": [
      {
        "title": "Gateway API",
        "url": "https://gateway-api.sigs.k8s.io/"
      }
    ]
  },
  {
    "id": "K8S-137",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "멀티 클러스터 관리의 필요성과 주요 고려사항을 설명해주세요.",
    "answer": "**필요성**:\r\n- **고가용성**: 리전/가용영역 장애 대비\r\n- **지연 최소화**: 사용자 가까운 리전에 배포\r\n- **규정 준수**: 데이터 지역성 요구사항\r\n- **격리**: 환경별, 팀별 분리\r\n- **스케일**: 단일 클러스터 한계 극복\r\n\r\n**주요 고려사항**:\r\n\r\n| 영역 | 고려사항 |\r\n|------|----------|\r\n| **네트워킹** | 클러스터 간 통신, Service mesh |\r\n| **데이터** | 상태 동기화, 데이터 복제 |\r\n| **배포** | 일관된 배포 전략, GitOps |\r\n| **보안** | 통합 인증/인가, Secret 관리 |\r\n| **모니터링** | 중앙 집중식 관찰성 |\r\n| **관리** | 클러스터 프로비저닝 자동화 |\r\n\r\n**도구**:\r\n- Rancher, OpenShift\r\n- Cluster API\r\n- Liqo, Submariner (네트워킹)\r\n- Istio (서비스 메시)",
    "references": [
      {
        "title": "Multi-cluster",
        "url": "https://kubernetes.io/docs/concepts/cluster-administration/"
      }
    ]
  },
  {
    "id": "K8S-138",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Federation의 개념과 멀티 클러스터 배포 전략을 설명해주세요.",
    "answer": "**Federation 개념**: 여러 클러스터를 단일 논리적 단위로 관리\r\n\r\n**KubeFed (Kubernetes Federation v2)**:\r\n- 중앙 제어 플레인에서 여러 클러스터 관리\r\n- FederatedDeployment 등 Federated 리소스\r\n- 클러스터별 오버라이드 지원\r\n\r\n```yaml\r\napiVersion: types.kubefed.io/v1beta1\r\nkind: FederatedDeployment\r\nspec:\r\n  template:\r\n    spec:\r\n      replicas: 3\r\n  placement:\r\n    clusters:\r\n    - name: cluster1\r\n    - name: cluster2\r\n  overrides:\r\n  - clusterName: cluster2\r\n    clusterOverrides:\r\n    - path: /spec/replicas\r\n      value: 5\r\n```\r\n\r\n**멀티 클러스터 배포 전략**:\r\n\r\n| 전략 | 설명 |\r\n|------|------|\r\n| **Active-Active** | 모든 클러스터에서 트래픽 처리 |\r\n| **Active-Passive** | 장애 시 대기 클러스터 활성화 |\r\n| **Follow-the-Sun** | 시간대별 활성 클러스터 변경 |\r\n| **Sharding** | 데이터/사용자별 클러스터 분리 |\r\n\r\n**도구**: KubeFed, Cluster API, ArgoCD ApplicationSet",
    "references": [
      {
        "title": "KubeFed",
        "url": "https://github.com/kubernetes-sigs/kubefed"
      }
    ]
  },
  {
    "id": "K8S-139",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "GitOps의 개념과 ArgoCD를 활용한 Kubernetes 배포 방법을 설명해주세요.",
    "answer": "**GitOps 개념**:\r\n- Git을 Single Source of Truth로 사용\r\n- 선언적 인프라/앱 정의\r\n- 자동화된 동기화 (Git -> 클러스터)\r\n\r\n**GitOps 원칙**:\r\n1. 선언적 시스템\r\n2. Git에 버전 관리\r\n3. 자동 적용\r\n4. 지속적 검증 및 동기화\r\n\r\n**ArgoCD 설치**:\r\n```bash\r\nkubectl create namespace argocd\r\nkubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml\r\n```\r\n\r\n**Application 정의**:\r\n```yaml\r\napiVersion: argoproj.io/v1alpha1\r\nkind: Application\r\nmetadata:\r\n  name: my-app\r\n  namespace: argocd\r\nspec:\r\n  project: default\r\n  source:\r\n    repoURL: https://github.com/org/repo\r\n    path: k8s\r\n    targetRevision: main\r\n  destination:\r\n    server: https://kubernetes.default.svc\r\n    namespace: production\r\n  syncPolicy:\r\n    automated:\r\n      prune: true\r\n      selfHeal: true\r\n```\r\n\r\n**워크플로우**:\r\nGit Push -> ArgoCD 감지 -> Sync -> 클러스터 배포",
    "references": [
      {
        "title": "ArgoCD",
        "url": "https://argo-cd.readthedocs.io/"
      }
    ]
  },
  {
    "id": "K8S-140",
    "category": "kubernetes",
    "categoryName": "Kubernetes",
    "section": "infra",
    "question": "Flux와 ArgoCD의 비교 및 선택 기준을 설명해주세요.",
    "answer": "**ArgoCD vs Flux 비교**:\r\n\r\n| 항목 | ArgoCD | Flux |\r\n|------|--------|------|\r\n| **UI** | 웹 UI 기본 제공 | 별도 설치 필요 |\r\n| **아키텍처** | 중앙 집중식 | 분산형 (에이전트) |\r\n| **리소스 사용** | 더 많음 | 경량 |\r\n| **멀티테넌시** | Project로 지원 | 네임스페이스 기반 |\r\n| **Helm 지원** | 네이티브 | Helm Controller |\r\n| **학습 곡선** | 완만 | 조금 가파름 |\r\n| **CNCF** | Incubating | Graduated |\r\n\r\n**ArgoCD 선택 시**:\r\n- 웹 UI 필요\r\n- 팀 단위 접근 제어 필요\r\n- 시각적 상태 확인 중요\r\n\r\n**Flux 선택 시**:\r\n- 경량 솔루션 선호\r\n- CLI 중심 워크플로우\r\n- 엣지/소규모 클러스터\r\n- Kustomize 활용 많음\r\n\r\n**공통점**:\r\n- Git 기반 배포\r\n- 자동 동기화\r\n- Kubernetes 네이티브",
    "references": [
      {
        "title": "Flux",
        "url": "https://fluxcd.io/"
      },
      {
        "title": "ArgoCD",
        "url": "https://argo-cd.readthedocs.io/"
      }
    ]
  },
  {
    "id": "CDC-001",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium CDC의 기본 개념과 작동 원리에 대해 설명해주세요.",
    "answer": "**Debezium**은 데이터베이스의 변경 사항을 실시간으로 캡처하여 이벤트 스트림으로 변환하는 오픈소스 분산 CDC(Change Data Capture) 플랫폼입니다.\r\n\r\n**핵심 작동 원리:**\r\n1. **로그 기반 CDC**: 데이터베이스의 트랜잭션 로그(MySQL의 binlog, PostgreSQL의 WAL 등)를 읽어 변경 사항을 캡처\r\n2. **Kafka Connect 기반**: Source Connector로 동작하며, 변경 이벤트를 Kafka 토픽으로 발행\r\n3. **비침투적 방식**: 애플리케이션 코드 수정 없이 데이터베이스 레벨에서 변경 캡처\r\n\r\n**아키텍처 구성:**\r\n```\r\n[Source DB] → [DB Transaction Log] → [Debezium Connector] → [Kafka] → [Sink Connector] → [Target System]\r\n```\r\n\r\n**트레이드오프 - CDC 방식 비교:**\r\n\r\n| 방식 | 장점 | 단점 |\r\n|------|------|------|\r\n| **로그 기반 CDC (Debezium)** | 낮은 오버헤드, 모든 변경 캡처, 삭제 이벤트 포함 | DB별 커넥터 필요, 로그 설정 필요 |\r\n| **쿼리 기반 CDC** | 구현 단순, DB 독립적 | 폴링 오버헤드, 삭제 감지 어려움 |\r\n| **트리거 기반 CDC** | 즉각적 캡처 | DB 성능 영향, 유지보수 복잡 |\r\n| **타임스탬프 기반** | 간단한 구현 | 삭제 감지 불가, 시간 동기화 필요 |\r\n\r\n**운영 환경 고려사항:**\r\n- 초기 스냅샷 시 소스 DB 부하 고려\r\n- Kafka 클러스터의 처리 용량 산정\r\n- 스키마 레지스트리 도입 여부 결정\r\n- 오프셋 저장소(Kafka 토픽) 관리",
    "references": [
      {
        "title": "Debezium Documentation - Architecture",
        "url": "https://debezium.io/documentation/reference/stable/architecture.html"
      },
      {
        "title": "Debezium FAQ",
        "url": "https://debezium.io/documentation/faq/"
      }
    ]
  },
  {
    "id": "CDC-002",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium이 CDC(Change Data Capture)를 구현하는 방식은 무엇인가요?",
    "answer": "Debezium은 **로그 기반 CDC(Log-based CDC)** 방식을 사용하여 데이터베이스 변경을 캡처합니다.\r\n\r\n**데이터베이스별 로그 활용:**\r\n\r\n| 데이터베이스 | 트랜잭션 로그 | 특징 |\r\n|-------------|--------------|------|\r\n| MySQL | Binary Log (binlog) | ROW 포맷 필수, GTID 권장 |\r\n| PostgreSQL | Write-Ahead Log (WAL) | Logical Replication 사용 |\r\n| MongoDB | Oplog / Change Streams | Change Streams 권장 (4.0+) |\r\n| SQL Server | Transaction Log | CDC 또는 CT 기능 활성화 필요 |\r\n| Oracle | LogMiner / Xstream | 라이선스 고려 필요 |\r\n\r\n**CDC 구현 단계:**\r\n1. **커넥터 시작**: Kafka Connect에서 Debezium 커넥터 배포\r\n2. **초기 스냅샷** (선택적): 기존 데이터의 일관된 스냅샷 생성\r\n3. **스트리밍 모드**: 트랜잭션 로그를 지속적으로 읽어 변경 캡처\r\n4. **이벤트 변환**: 변경 사항을 표준화된 이벤트 포맷으로 변환\r\n5. **Kafka 발행**: 테이블별 토픽으로 이벤트 발행\r\n\r\n**함정 질문 - \"쿼리 기반 CDC와 동일한가요?\":**\r\n아닙니다. 로그 기반 CDC는 쿼리 기반과 근본적으로 다릅니다:\r\n- **쿼리 기반**: 주기적 SELECT로 변경 감지 → 폴링 오버헤드, 삭제 감지 어려움\r\n- **로그 기반**: 트랜잭션 로그 스트리밍 → 실시간, 모든 변경(DELETE 포함) 캡처\r\n\r\n**이벤트 구조:**\r\n```json\r\n{\r\n  \"before\": { \"id\": 1, \"name\": \"old\" },  // 변경 전 상태\r\n  \"after\": { \"id\": 1, \"name\": \"new\" },   // 변경 후 상태\r\n  \"source\": {\r\n    \"connector\": \"mysql\",\r\n    \"ts_ms\": 1234567890,\r\n    \"gtid\": \"xxx:1\"\r\n  },\r\n  \"op\": \"u\"  // c=create, u=update, d=delete, r=read(snapshot)\r\n}\r\n```",
    "references": [
      {
        "title": "Debezium - How it works",
        "url": "https://debezium.io/documentation/reference/stable/architecture.html"
      }
    ]
  },
  {
    "id": "CDC-003",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "MySQL에서 Debezium 커넥터를 설정할 때 고려해야 할 주요 요소는 무엇인가요?",
    "answer": "**MySQL Debezium 커넥터 설정 시 주요 고려 요소:**\r\n\r\n**1. MySQL 서버 설정 (필수):**\r\n```ini\r\n# my.cnf\r\nserver-id=1                    # 고유 서버 ID\r\nlog_bin=mysql-bin              # binlog 활성화\r\nbinlog_format=ROW              # ROW 포맷 필수!\r\nbinlog_row_image=FULL          # 전체 row 이미지 권장\r\nexpire_logs_days=3             # binlog 보관 기간\r\ngtid_mode=ON                   # GTID 사용 권장\r\nenforce_gtid_consistency=ON    # GTID 일관성 강제\r\n```\r\n\r\n**2. 사용자 권한:**\r\n```sql\r\nCREATE USER 'debezium'@'%' IDENTIFIED BY 'password';\r\nGRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'debezium'@'%';\r\n-- 스키마 히스토리를 위해 추가 권한 필요\r\nGRANT LOCK TABLES ON mydb.* TO 'debezium'@'%';\r\n```\r\n\r\n**3. 커넥터 설정:**\r\n```json\r\n{\r\n  \"name\": \"mysql-connector\",\r\n  \"config\": {\r\n    \"connector.class\": \"io.debezium.connector.mysql.MySqlConnector\",\r\n    \"database.hostname\": \"mysql-host\",\r\n    \"database.port\": \"3306\",\r\n    \"database.user\": \"debezium\",\r\n    \"database.password\": \"password\",\r\n    \"database.server.id\": \"1\",\r\n    \"topic.prefix\": \"dbserver1\",\r\n    \"database.include.list\": \"mydb\",\r\n    \"table.include.list\": \"mydb.users,mydb.orders\",\r\n    \"schema.history.internal.kafka.bootstrap.servers\": \"kafka:9092\",\r\n    \"schema.history.internal.kafka.topic\": \"schema-changes.mydb\"\r\n  }\r\n}\r\n```\r\n\r\n**트레이드오프 - 주요 설정 옵션:**\r\n\r\n| 설정 | 선택지 | 트레이드오프 |\r\n|------|--------|-------------|\r\n| `snapshot.mode` | initial / schema_only / never | 초기 데이터 필요 vs 빠른 시작 |\r\n| `binlog_row_image` | FULL / MINIMAL | 완전한 데이터 vs 저장 공간 |\r\n| `decimal.handling.mode` | precise / double / string | 정확도 vs 처리 편의성 |\r\n| `time.precision.mode` | adaptive / connect | 정밀도 vs 호환성 |\r\n\r\n**운영 환경 체크리스트:**\r\n- [ ] binlog 보관 기간이 스냅샷 시간보다 긴지 확인\r\n- [ ] Read Replica 사용 시 binlog 활성화 여부 확인\r\n- [ ] 네트워크 지연 및 타임아웃 설정 검토\r\n- [ ] SSL/TLS 연결 설정 (프로덕션 환경)",
    "references": [
      {
        "title": "Debezium MySQL Connector Documentation",
        "url": "https://debezium.io/documentation/reference/stable/connectors/mysql.html"
      }
    ]
  },
  {
    "id": "CDC-004",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium MySQL 커넥터에서 binlog를 활용하여 데이터를 캡처하는 원리에 대해 설명해주세요.",
    "answer": "**MySQL Binlog 기반 CDC 원리:**\r\n\r\n**Binlog란?**\r\nMySQL의 Binary Log는 데이터베이스에 대한 모든 변경 사항(DDL, DML)을 순차적으로 기록하는 로그 파일입니다. 원래 복제(Replication)를 위해 설계되었습니다.\r\n\r\n**Debezium의 Binlog 캡처 과정:**\r\n\r\n```\r\n1. Connector 시작\r\n       ↓\r\n2. MySQL에 Replica로 연결 (SHOW MASTER STATUS)\r\n       ↓\r\n3. 현재 binlog 위치 확인 (file, position 또는 GTID)\r\n       ↓\r\n4. [Optional] 스냅샷 수행 (일관된 읽기)\r\n       ↓\r\n5. Binlog 스트리밍 시작 (SHOW BINLOG EVENTS)\r\n       ↓\r\n6. 이벤트 파싱 → Kafka 이벤트 변환 → 토픽 발행\r\n       ↓\r\n7. 오프셋 저장 (binlog file:position 또는 GTID)\r\n```\r\n\r\n**Binlog 이벤트 타입:**\r\n- `WRITE_ROWS_EVENT`: INSERT 작업\r\n- `UPDATE_ROWS_EVENT`: UPDATE 작업\r\n- `DELETE_ROWS_EVENT`: DELETE 작업\r\n- `QUERY_EVENT`: DDL 문장 (CREATE, ALTER 등)\r\n- `TABLE_MAP_EVENT`: 테이블 메타데이터\r\n\r\n**GTID vs File:Position:**\r\n\r\n| 방식 | 장점 | 단점 |\r\n|------|------|------|\r\n| **GTID** | 장애 복구 용이, 자동 위치 추적 | MySQL 5.6.5+ 필요, 설정 복잡 |\r\n| **File:Position** | 단순, 모든 버전 지원 | 수동 위치 관리, 장애 시 복잡 |\r\n\r\n**함정 질문 - \"Binlog를 직접 파일로 읽나요?\":**\r\n아닙니다! Debezium은 MySQL Replication Protocol을 사용하여 binlog를 스트리밍으로 받습니다. 마치 Replica 서버처럼 동작하여:\r\n- 네트워크를 통해 실시간으로 이벤트 수신\r\n- 파일 접근 권한 불필요\r\n- MySQL 서버의 binlog 관리에 의존\r\n\r\n**운영 시 주의사항:**\r\n1. **Binlog 만료 전 커넥터 재시작**: binlog가 삭제되면 스냅샷부터 다시 시작해야 함\r\n2. **GTID 사용 권장**: 장애 복구 및 페일오버 시 자동 위치 추적\r\n3. **server-id 고유성**: 다른 Replica와 충돌하지 않도록 설정",
    "references": [
      {
        "title": "MySQL Binary Log",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/binary-log.html"
      },
      {
        "title": "Debezium MySQL Connector - How it works",
        "url": "https://debezium.io/documentation/reference/stable/connectors/mysql.html#how-the-mysql-connector-works"
      }
    ]
  },
  {
    "id": "CDC-005",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium과 Elasticsearch 간 데이터 동기화 아키텍처는 어떻게 구성되나요?",
    "answer": "**Debezium-Elasticsearch 동기화 아키텍처:**\r\n\r\n```\r\n┌─────────────┐    ┌──────────────┐    ┌─────────┐    ┌────────────────┐    ┌───────────────┐\r\n│  Source DB  │───▶│   Debezium   │───▶│  Kafka  │───▶│  Sink Connector│───▶│ Elasticsearch │\r\n│  (MySQL)    │    │  (Source)    │    │         │    │  (ES Sink)     │    │               │\r\n└─────────────┘    └──────────────┘    └─────────┘    └────────────────┘    └───────────────┘\r\n```\r\n\r\n**아키텍처 구성 옵션:**\r\n\r\n**1. Kafka Connect Elasticsearch Sink:**\r\n```json\r\n{\r\n  \"name\": \"es-sink-connector\",\r\n  \"config\": {\r\n    \"connector.class\": \"io.confluent.connect.elasticsearch.ElasticsearchSinkConnector\",\r\n    \"topics\": \"dbserver1.mydb.users\",\r\n    \"connection.url\": \"http://elasticsearch:9200\",\r\n    \"type.name\": \"_doc\",\r\n    \"key.ignore\": \"false\",\r\n    \"schema.ignore\": \"true\",\r\n    \"transforms\": \"unwrap\",\r\n    \"transforms.unwrap.type\": \"io.debezium.transforms.ExtractNewRecordState\"\r\n  }\r\n}\r\n```\r\n\r\n**2. 대안적 아키텍처:**\r\n\r\n| 방식 | 장점 | 단점 | 적합한 경우 |\r\n|------|------|------|------------|\r\n| **Kafka Connect ES Sink** | 관리 용이, 자동 재시도 | 복잡한 변환 제한 | 단순 동기화 |\r\n| **Kafka Streams 중간 처리** | 복잡한 변환 가능 | 개발 필요 | 데이터 가공 필요 |\r\n| **Logstash** | 유연한 필터링 | 추가 인프라 | 기존 ELK 스택 활용 |\r\n| **커스텀 Consumer** | 완전한 제어 | 개발/운영 부담 | 특수 요구사항 |\r\n\r\n**SMT(Single Message Transform) 활용:**\r\n```json\r\n{\r\n  \"transforms\": \"unwrap,route,filter\",\r\n  \"transforms.unwrap.type\": \"io.debezium.transforms.ExtractNewRecordState\",\r\n  \"transforms.unwrap.drop.tombstones\": \"true\",\r\n  \"transforms.route.type\": \"org.apache.kafka.connect.transforms.RegexRouter\",\r\n  \"transforms.route.regex\": \"([^.]+)\\\\.([^.]+)\\\\.([^.]+)\",\r\n  \"transforms.route.replacement\": \"es-$3\"\r\n}\r\n```\r\n\r\n**DELETE 이벤트 처리:**\r\n- `ExtractNewRecordState`의 `delete.handling.mode` 설정\r\n  - `drop`: 삭제 이벤트 무시\r\n  - `rewrite`: `__deleted` 필드 추가\r\n  - `none`: tombstone 이벤트 전달\r\n\r\n**운영 환경 고려사항:**\r\n1. **인덱스 매핑**: 사전 매핑 정의로 타입 불일치 방지\r\n2. **Bulk 설정**: `batch.size`, `linger.ms` 튜닝\r\n3. **Dead Letter Queue**: 실패 메시지 처리 전략\r\n4. **인덱스 라이프사이클**: ILM 정책과 연계",
    "references": [
      {
        "title": "Confluent Elasticsearch Sink Connector",
        "url": "https://docs.confluent.io/kafka-connectors/elasticsearch/current/overview.html"
      },
      {
        "title": "Debezium SMT - ExtractNewRecordState",
        "url": "https://debezium.io/documentation/reference/stable/transformations/event-flattening.html"
      }
    ]
  },
  {
    "id": "CDC-006",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium 커넥터의 주요 구성 요소와 각 요소의 역할에 대해 설명해주세요.",
    "answer": "**Debezium 커넥터 주요 구성 요소:**\r\n\r\n**1. Kafka Connect Framework:**\r\n```\r\n┌────────────────────────────────────────────────┐\r\n│                Kafka Connect                    │\r\n│  ┌──────────────┐    ┌──────────────────────┐  │\r\n│  │   Worker     │    │      Worker          │  │\r\n│  │  ┌────────┐  │    │  ┌────────────────┐  │  │\r\n│  │  │Debezium│  │    │  │  ES Sink       │  │  │\r\n│  │  │Connector│ │    │  │  Connector     │  │  │\r\n│  │  └────────┘  │    │  └────────────────┘  │  │\r\n│  └──────────────┘    └──────────────────────┘  │\r\n└────────────────────────────────────────────────┘\r\n```\r\n\r\n**2. 핵심 구성 요소:**\r\n\r\n| 구성 요소 | 역할 | 저장 위치 |\r\n|----------|------|----------|\r\n| **Connector** | 커넥터 설정, 태스크 관리 | Kafka Connect 설정 토픽 |\r\n| **Task** | 실제 데이터 캡처 수행 | Worker 프로세스 |\r\n| **Offset Storage** | 처리 위치 추적 | Kafka 토픽 (connect-offsets) |\r\n| **Schema History** | DDL 변경 이력 | Kafka 토픽 (schema-history) |\r\n| **Schema Registry** | 스키마 버전 관리 | 별도 서비스 (선택) |\r\n\r\n**3. Debezium 내부 구성:**\r\n\r\n```\r\nDebezium Connector\r\n├── SnapshotReader      # 초기 스냅샷 수행\r\n├── BinlogReader        # 스트리밍 변경 캡처 (MySQL)\r\n├── SchemaHistory       # 스키마 변경 이력 관리\r\n├── TopicSelector       # 토픽 이름 결정\r\n├── ChangeEventMaker    # 이벤트 구조 생성\r\n└── Transforms (SMT)    # 메시지 변환\r\n```\r\n\r\n**4. Schema History의 중요성:**\r\n- DDL 문(CREATE, ALTER)을 기록\r\n- 과거 시점의 테이블 구조 재구성에 필요\r\n- 커넥터 재시작 시 스키마 복원\r\n\r\n```json\r\n{\r\n  \"schema.history.internal.kafka.bootstrap.servers\": \"kafka:9092\",\r\n  \"schema.history.internal.kafka.topic\": \"schema-history.mydb\",\r\n  \"schema.history.internal.store.only.captured.tables.ddl\": \"true\"\r\n}\r\n```\r\n\r\n**5. Offset의 구조 (MySQL):**\r\n```json\r\n{\r\n  \"file\": \"mysql-bin.000003\",\r\n  \"pos\": 12345,\r\n  \"gtid\": \"xxx:1-100\",\r\n  \"server_id\": 1\r\n}\r\n```\r\n\r\n**함정 질문 - \"Kafka 없이 Debezium을 사용할 수 있나요?\":**\r\n예, 가능합니다! Debezium은 여러 배포 모드를 지원합니다:\r\n- **Kafka Connect 모드**: 표준 방식, 프로덕션 권장\r\n- **Debezium Server**: Kafka 없이 직접 타겟으로 전송 (Pulsar, Kinesis, Redis 등)\r\n- **Embedded Engine**: 애플리케이션 내장 사용",
    "references": [
      {
        "title": "Debezium Architecture",
        "url": "https://debezium.io/documentation/reference/stable/architecture.html"
      },
      {
        "title": "Debezium Server",
        "url": "https://debezium.io/documentation/reference/stable/operations/debezium-server.html"
      }
    ]
  },
  {
    "id": "CDC-007",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium CDC를 활용해 데이터 일관성을 유지하는 방법에는 어떤 것들이 있나요?",
    "answer": "**Debezium 데이터 일관성 보장 메커니즘:**\r\n\r\n**1. 스냅샷 일관성:**\r\n- **Snapshot Isolation**: 트랜잭션 격리 수준을 활용한 일관된 읽기\r\n- MySQL: `REPEATABLE READ` + `LOCK TABLES` (선택적)\r\n- PostgreSQL: 트랜잭션 스냅샷 사용\r\n\r\n```json\r\n{\r\n  \"snapshot.mode\": \"initial\",\r\n  \"snapshot.locking.mode\": \"minimal\"  // none, minimal, extended\r\n}\r\n```\r\n\r\n**2. 이벤트 순서 보장:**\r\n- **파티션 키**: 동일 레코드는 동일 파티션으로 전송 → 순서 보장\r\n- **토픽 파티셔닝**: 테이블 PK 기반 파티션 할당\r\n\r\n```\r\n테이블: users (id=1,2,3...)\r\n  └─ Partition 0: id % 3 == 0\r\n  └─ Partition 1: id % 3 == 1\r\n  └─ Partition 2: id % 3 == 2\r\n```\r\n\r\n**3. Exactly-Once 의미론:**\r\n\r\n| 레벨 | 보장 수준 | 설정 |\r\n|------|----------|------|\r\n| Debezium → Kafka | At-least-once | 기본값 |\r\n| Kafka → Consumer | 설정에 따라 다름 | 트랜잭션 사용 가능 |\r\n| End-to-End | At-least-once | 멱등성 구현 필요 |\r\n\r\n**4. 트랜잭션 메타데이터:**\r\n```json\r\n{\r\n  \"transaction\": {\r\n    \"id\": \"file=mysql-bin.000003,pos=12345\",\r\n    \"total_order\": 1,\r\n    \"data_collection_order\": 1\r\n  }\r\n}\r\n```\r\n\r\n**5. Outbox 패턴과의 결합:**\r\n```\r\n┌─────────────────────────────────────────────────┐\r\n│ 애플리케이션 트랜잭션                             │\r\n│   1. 비즈니스 테이블 UPDATE                      │\r\n│   2. Outbox 테이블 INSERT (같은 트랜잭션)        │\r\n└─────────────────────────────────────────────────┘\r\n                    ↓ Debezium 캡처\r\n┌─────────────────────────────────────────────────┐\r\n│ Outbox 이벤트만 Kafka로 발행                     │\r\n│   - 메시지 순서 보장                             │\r\n│   - 트랜잭션 원자성 활용                         │\r\n└─────────────────────────────────────────────────┘\r\n```\r\n\r\n**함정 질문 - \"Debezium이 Exactly-Once를 보장하나요?\":**\r\n기본적으로 **At-Least-Once**입니다. Exactly-Once를 위해서는:\r\n1. Consumer 측에서 **멱등성** 구현 (PK 기반 upsert)\r\n2. Kafka Transactions 활용 (제한적)\r\n3. 메시지 중복 제거 로직 구현\r\n\r\n**운영 환경 체크리스트:**\r\n- [ ] Consumer 멱등성 처리 구현\r\n- [ ] Dead Letter Queue 설정\r\n- [ ] 재처리 시나리오 테스트\r\n- [ ] 순서 의존성 분석",
    "references": [
      {
        "title": "Debezium - Data consistency",
        "url": "https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-topic-names"
      },
      {
        "title": "Outbox Pattern",
        "url": "https://debezium.io/blog/2019/02/19/reliable-microservices-data-exchange-with-the-outbox-pattern/"
      }
    ]
  },
  {
    "id": "CDC-008",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium이 스키마 변경(schema evolution)을 감지하고 처리하는 방식은 무엇인가요?",
    "answer": "**Debezium 스키마 변경 처리 메커니즘:**\r\n\r\n**1. 스키마 히스토리 저장:**\r\n```json\r\n{\r\n  \"schema.history.internal.kafka.topic\": \"schema-changes.inventory\",\r\n  \"schema.history.internal.kafka.bootstrap.servers\": \"kafka:9092\"\r\n}\r\n```\r\n\r\n**2. DDL 이벤트 캡처:**\r\nMySQL binlog에서 DDL 문장을 감지하고 스키마 히스토리에 저장:\r\n```json\r\n{\r\n  \"source\": { \"server\": \"dbserver1\" },\r\n  \"position\": { \"file\": \"mysql-bin.000003\", \"pos\": 12345 },\r\n  \"databaseName\": \"inventory\",\r\n  \"ddl\": \"ALTER TABLE products ADD COLUMN weight DECIMAL(10,2)\",\r\n  \"tableChanges\": [...]\r\n}\r\n```\r\n\r\n**3. 스키마 진화 호환성:**\r\n\r\n| 변경 유형 | Avro 호환성 | 처리 방법 |\r\n|----------|------------|----------|\r\n| 컬럼 추가 (기본값 있음) | Backward | 자동 처리 |\r\n| 컬럼 추가 (기본값 없음) | Forward | 주의 필요 |\r\n| 컬럼 삭제 | Forward | 주의 필요 |\r\n| 컬럼 타입 변경 | 비호환 | 수동 개입 필요 |\r\n| 컬럼 이름 변경 | 비호환 | 수동 개입 필요 |\r\n\r\n**4. Schema Registry 연동:**\r\n```json\r\n{\r\n  \"key.converter\": \"io.confluent.connect.avro.AvroConverter\",\r\n  \"key.converter.schema.registry.url\": \"http://schema-registry:8081\",\r\n  \"value.converter\": \"io.confluent.connect.avro.AvroConverter\",\r\n  \"value.converter.schema.registry.url\": \"http://schema-registry:8081\"\r\n}\r\n```\r\n\r\n**5. 스키마 변경 전략:**\r\n\r\n**트레이드오프:**\r\n| 전략 | 장점 | 단점 |\r\n|------|------|------|\r\n| **In-place 변경** | 단순, 연속성 유지 | 비호환 변경 시 Consumer 영향 |\r\n| **새 토픽 생성** | 완전한 격리 | 마이그레이션 복잡 |\r\n| **버전 필드 추가** | 유연한 처리 | Consumer 로직 복잡 |\r\n\r\n**함정 질문 - \"스키마 변경 시 커넥터가 자동으로 처리하나요?\":**\r\n부분적으로 그렇습니다:\r\n- **호환 가능한 변경** (컬럼 추가): 자동 처리\r\n- **비호환 변경** (타입 변경, 이름 변경): Consumer 오류 가능\r\n- **테이블 삭제/재생성**: 커넥터 재시작 필요할 수 있음\r\n\r\n**운영 시 권장 사항:**\r\n1. Schema Registry 사용하여 호환성 검증\r\n2. DDL 변경 전 Consumer 영향도 분석\r\n3. Blue-Green 배포로 안전한 스키마 마이그레이션\r\n4. 스키마 히스토리 토픽 백업\r\n\r\n```bash\r\n# 스키마 호환성 확인\r\ncurl -X POST -H \"Content-Type: application/vnd.schemaregistry.v1+json\" \\\r\n  --data '{\"schema\": \"...\"}' \\\r\n  http://schema-registry:8081/compatibility/subjects/topic-value/versions/latest\r\n```",
    "references": [
      {
        "title": "Debezium - Schema History",
        "url": "https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-schema-history-topic"
      },
      {
        "title": "Schema Registry Compatibility",
        "url": "https://docs.confluent.io/platform/current/schema-registry/avro.html"
      }
    ]
  },
  {
    "id": "CDC-009",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "MySQL binlog의 형식(ROW, STATEMENT, MIXED)과 Debezium CDC 캡처와의 관계에 대해 설명해주세요.",
    "answer": "**MySQL Binlog 형식 비교:**\r\n\r\n| 형식 | 저장 내용 | 예시 |\r\n|------|----------|------|\r\n| **STATEMENT** | SQL 문장 자체 | `UPDATE users SET age=30 WHERE id=1` |\r\n| **ROW** | 변경된 행 데이터 | `before: {id:1, age:20}, after: {id:1, age:30}` |\r\n| **MIXED** | 상황에 따라 자동 선택 | 비결정적 함수 시 ROW, 그 외 STATEMENT |\r\n\r\n**Debezium과 Binlog 형식 관계:**\r\n\r\n**ROW 형식이 필수인 이유:**\r\n```\r\nSTATEMENT 형식의 문제:\r\n  UPDATE users SET updated_at = NOW() WHERE status = 'active'\r\n\r\n  → Replica에서 NOW()가 다른 시간을 반환할 수 있음\r\n  → Debezium은 실제 변경된 값을 알 수 없음\r\n\r\nROW 형식의 장점:\r\n  → 실제 변경된 데이터 값 포함\r\n  → before/after 상태 모두 캡처 가능\r\n  → 결정적(deterministic) 결과\r\n```\r\n\r\n**binlog_row_image 설정:**\r\n\r\n| 설정 | before 이미지 | after 이미지 | 용도 |\r\n|------|--------------|-------------|------|\r\n| **FULL** | 모든 컬럼 | 모든 컬럼 | Debezium 권장 |\r\n| **MINIMAL** | PK만 | 변경된 컬럼만 | 저장 공간 절약 |\r\n| **NOBLOB** | BLOB 제외 | BLOB 제외 | 대용량 BLOB 제외 |\r\n\r\n**설정 확인 및 변경:**\r\n```sql\r\n-- 현재 설정 확인\r\nSHOW VARIABLES LIKE 'binlog_format';\r\nSHOW VARIABLES LIKE 'binlog_row_image';\r\n\r\n-- 설정 변경 (서버 재시작 필요)\r\nSET GLOBAL binlog_format = 'ROW';\r\nSET GLOBAL binlog_row_image = 'FULL';\r\n```\r\n\r\n**함정 질문 - \"MIXED 형식을 사용해도 되나요?\":**\r\n**사용하지 않는 것이 좋습니다.** 이유:\r\n1. 비결정적 함수가 있을 때만 ROW로 전환\r\n2. 일부 이벤트가 STATEMENT로 기록될 수 있음\r\n3. Debezium이 STATEMENT 이벤트를 처리하지 못함\r\n4. 데이터 누락 위험\r\n\r\n**트레이드오프 - ROW 형식의 비용:**\r\n\r\n| 고려사항 | ROW | STATEMENT |\r\n|---------|-----|-----------|\r\n| **저장 공간** | 더 큼 (각 행 저장) | 더 작음 (SQL만 저장) |\r\n| **네트워크 대역폭** | 더 많음 | 더 적음 |\r\n| **CDC 호환성** | 완전 호환 | 비호환 |\r\n| **Replica 일관성** | 보장 | 비결정적 함수 시 불일치 가능 |\r\n\r\n**운영 환경 권장 설정:**\r\n```ini\r\n[mysqld]\r\nbinlog_format = ROW\r\nbinlog_row_image = FULL\r\nexpire_logs_days = 3\r\nmax_binlog_size = 100M\r\n```",
    "references": [
      {
        "title": "MySQL Binary Log Formats",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/binary-log-formats.html"
      },
      {
        "title": "Debezium MySQL Prerequisites",
        "url": "https://debezium.io/documentation/reference/stable/connectors/mysql.html#setting-up-mysql"
      }
    ]
  },
  {
    "id": "CDC-010",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium 설정에서 snapshot 옵션의 역할과 관련 설정 방법에 대해 설명해주세요.",
    "answer": "**Debezium Snapshot 모드:**\r\n\r\n**스냅샷의 목적:**\r\n커넥터 시작 시 기존 데이터의 일관된 복사본을 생성하여, 이후 실시간 CDC 스트리밍으로 전환\r\n\r\n**주요 Snapshot 모드:**\r\n\r\n| 모드 | 동작 | 사용 시나리오 |\r\n|------|------|--------------|\r\n| **initial** (기본) | 최초 시작 시 스냅샷, 이후 스트리밍 | 새로운 CDC 파이프라인 구축 |\r\n| **initial_only** | 스냅샷만 수행, 스트리밍 안 함 | 일회성 데이터 마이그레이션 |\r\n| **when_needed** | 오프셋 없거나 binlog 만료 시 스냅샷 | 자동 복구 필요 시 |\r\n| **schema_only** | 스키마만 캡처, 데이터 스냅샷 없음 | 신규 데이터만 필요 시 |\r\n| **schema_only_recovery** | 스키마 복구용 | 스키마 히스토리 손상 시 |\r\n| **never** | 스냅샷 절대 안 함 | binlog 위치 직접 지정 시 |\r\n| **no_data** | 스키마만 (initial 완료 후) | 재시작 시 데이터 스킵 |\r\n\r\n**트레이드오프 - Snapshot 모드 선택:**\r\n\r\n```\r\n                    ┌─────────────────────────────────┐\r\n                    │     기존 데이터가 필요한가?      │\r\n                    └───────────────┬─────────────────┘\r\n                           ├── Yes ──┐\r\n                           │         ↓\r\n                           │   ┌─────────────────────┐\r\n                           │   │ 대용량 테이블인가?   │\r\n                           │   └──────────┬──────────┘\r\n                           │         ├── Yes → incremental snapshot 고려\r\n                           │         └── No  → initial\r\n                           │\r\n                           └── No ───→ schema_only\r\n```\r\n\r\n**Snapshot 설정 옵션:**\r\n```json\r\n{\r\n  \"snapshot.mode\": \"initial\",\r\n  \"snapshot.locking.mode\": \"minimal\",\r\n  \"snapshot.fetch.size\": 10240,\r\n  \"snapshot.max.threads\": 1,\r\n  \"snapshot.select.statement.overrides\": \"mydb.large_table\"\r\n}\r\n```\r\n\r\n**Locking 모드:**\r\n\r\n| 모드 | 동작 | 트레이드오프 |\r\n|------|------|-------------|\r\n| **minimal** | 스키마 읽기 시만 짧은 락 | 권장, 대부분 상황에 적합 |\r\n| **extended** | 스냅샷 전체 기간 락 | 완벽한 일관성, 쓰기 차단 |\r\n| **none** | 락 없음 | 일관성 보장 안 됨 |\r\n\r\n**Incremental Snapshot (Debezium 1.6+):**\r\n대용량 테이블을 청크 단위로 스냅샷:\r\n```json\r\n{\r\n  \"signal.data.collection\": \"mydb.debezium_signal\",\r\n  \"incremental.snapshot.chunk.size\": 1024\r\n}\r\n```\r\n\r\n**스냅샷 트리거 신호:**\r\n```sql\r\nINSERT INTO debezium_signal (id, type, data) VALUES\r\n('ad-hoc-1', 'execute-snapshot', '{\"data-collections\": [\"mydb.users\"]}');\r\n```\r\n\r\n**함정 질문 - \"스냅샷 중에 변경된 데이터는 어떻게 되나요?\":**\r\nDebezium은 이를 처리합니다:\r\n1. 스냅샷 시작 시 binlog 위치 기록\r\n2. 스냅샷 완료 후 해당 위치부터 스트리밍\r\n3. 중복 이벤트 가능 → Consumer 멱등성 필요",
    "references": [
      {
        "title": "Debezium Snapshots",
        "url": "https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-snapshots"
      },
      {
        "title": "Incremental Snapshots",
        "url": "https://debezium.io/documentation/reference/stable/configuration/signalling.html"
      }
    ]
  },
  {
    "id": "CDC-011",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium 사용 시 snapshot 및 CDC 캡처 과정에서 발생할 수 있는 데이터 지연(latency) 문제와 해결 방법은 무엇인가요?",
    "answer": "**Debezium 지연 발생 원인과 해결책:**\r\n\r\n**1. 스냅샷 단계 지연:**\r\n\r\n| 원인 | 해결책 |\r\n|------|--------|\r\n| 대용량 테이블 | Incremental Snapshot 사용 |\r\n| 전체 테이블 락 | `snapshot.locking.mode=minimal` |\r\n| 느린 SELECT | `snapshot.fetch.size` 조정 |\r\n| 단일 스레드 처리 | `snapshot.max.threads` 증가 |\r\n\r\n```json\r\n{\r\n  \"snapshot.fetch.size\": 10240,\r\n  \"snapshot.max.threads\": 4,\r\n  \"snapshot.locking.mode\": \"minimal\"\r\n}\r\n```\r\n\r\n**2. 스트리밍 단계 지연:**\r\n\r\n| 원인 | 해결책 |\r\n|------|--------|\r\n| Kafka Producer 배치 | `max.batch.size`, `linger.ms` 조정 |\r\n| 네트워크 지연 | 지역 근접성 확보 |\r\n| 변환 처리 오버헤드 | SMT 최소화 |\r\n| 스키마 레지스트리 지연 | 캐싱 설정 |\r\n\r\n**3. Consumer 단계 지연:**\r\n\r\n```\r\n┌──────────┐    ┌───────┐    ┌──────────┐    ┌────────┐\r\n│ Debezium │───▶│ Kafka │───▶│ Consumer │───▶│ Target │\r\n└──────────┘    └───────┘    └──────────┘    └────────┘\r\n     ↑              ↑              ↑              ↑\r\n   ~10ms        ~1-5ms         ~10-100ms      ~10-50ms\r\n\r\n총 End-to-End: 30-200ms (정상)\r\n```\r\n\r\n**지연 모니터링 메트릭:**\r\n```\r\n# Debezium JMX 메트릭\r\ndebezium.mysql.connector.MilliSecondsBehindSource\r\ndebezium.mysql.connector.NumberOfEventsFiltered\r\ndebezium.mysql.connector.SourceEventPosition\r\n\r\n# Kafka Consumer Lag\r\nkafka-consumer-groups.sh --describe --group my-consumer\r\n```\r\n\r\n**트레이드오프 - 지연 vs 처리량:**\r\n\r\n| 설정 | 낮은 지연 | 높은 처리량 |\r\n|------|----------|------------|\r\n| `max.batch.size` | 작게 (1-10) | 크게 (1000+) |\r\n| `linger.ms` | 0-5ms | 50-200ms |\r\n| `poll.interval.ms` | 작게 (100ms) | 크게 (1000ms) |\r\n\r\n**Heartbeat 설정:**\r\n유휴 테이블에서도 오프셋 업데이트:\r\n```json\r\n{\r\n  \"heartbeat.interval.ms\": 10000,\r\n  \"heartbeat.topics.prefix\": \"__debezium-heartbeat\"\r\n}\r\n```\r\n\r\n**함정 질문 - \"실시간(Real-time)을 보장하나요?\":**\r\n**Near Real-time**입니다. 완전한 실시간은 아닙니다:\r\n- 네트워크 지연\r\n- Kafka 배치 처리\r\n- Consumer 처리 시간\r\n- 일반적으로 100ms-1s 수준의 지연\r\n\r\n**운영 환경 체크리스트:**\r\n- [ ] MilliSecondsBehindSource 메트릭 모니터링\r\n- [ ] Consumer Lag 알림 설정\r\n- [ ] Heartbeat 설정으로 유휴 테이블 오프셋 관리\r\n- [ ] 대용량 트랜잭션 분리",
    "references": [
      {
        "title": "Debezium Monitoring",
        "url": "https://debezium.io/documentation/reference/stable/operations/monitoring.html"
      }
    ]
  },
  {
    "id": "CDC-012",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium을 통한 MySQL과 Elasticsearch 간 동기화 과정에서 발생할 수 있는 데이터 정합성 이슈는 무엇이며, 이를 어떻게 해결할 수 있나요?",
    "answer": "**MySQL-Elasticsearch 동기화 정합성 이슈:**\r\n\r\n**1. 이벤트 순서 역전:**\r\n```\r\nMySQL: INSERT(id=1) → UPDATE(id=1)\r\nKafka: 파티션 분산으로 순서 역전 가능\r\nES: UPDATE 먼저 처리 → 실패 또는 데이터 불일치\r\n```\r\n\r\n**해결책:**\r\n```json\r\n{\r\n  \"transforms\": \"extractKey\",\r\n  \"transforms.extractKey.type\": \"org.apache.kafka.connect.transforms.ExtractField$Key\",\r\n  \"transforms.extractKey.field\": \"id\"\r\n}\r\n```\r\n- 동일 키는 동일 파티션으로 라우팅\r\n\r\n**2. 중복 이벤트 처리:**\r\n```\r\nAt-least-once 전달 → 동일 이벤트 중복 수신 가능\r\n```\r\n\r\n**해결책:**\r\n- ES의 문서 ID를 PK로 설정 → 자연스러운 멱등성\r\n```json\r\n{\r\n  \"key.ignore\": \"false\",\r\n  \"transforms.unwrap.type\": \"io.debezium.transforms.ExtractNewRecordState\"\r\n}\r\n```\r\n\r\n**3. 스키마 불일치:**\r\n\r\n| 문제 | 원인 | 해결책 |\r\n|------|------|--------|\r\n| 타입 불일치 | MySQL DATETIME → ES date | ES 매핑 사전 정의 |\r\n| 필드 누락 | nullable 컬럼 | dynamic mapping 또는 기본값 |\r\n| 중첩 구조 | 관계형 → 문서형 | SMT로 변환 또는 Kafka Streams |\r\n\r\n**4. DELETE 이벤트 처리:**\r\n```json\r\n// Debezium DELETE 이벤트\r\n{\r\n  \"before\": { \"id\": 1, \"name\": \"test\" },\r\n  \"after\": null,\r\n  \"op\": \"d\"\r\n}\r\n```\r\n\r\n**해결책:**\r\n```json\r\n{\r\n  \"transforms.unwrap.delete.handling.mode\": \"rewrite\",\r\n  \"transforms.unwrap.drop.tombstones\": \"false\"\r\n}\r\n```\r\n\r\n**5. 동기화 지연으로 인한 읽기 불일치:**\r\n```\r\n사용자: MySQL INSERT → 즉시 ES 검색 → 결과 없음 (아직 동기화 안 됨)\r\n```\r\n\r\n**해결책:**\r\n- Read-your-writes: 쓰기 후 MySQL 직접 조회\r\n- 최종 일관성 UI/UX 설계\r\n- ES refresh 설정 조정 (trade-off: 성능)\r\n\r\n**6. 참조 무결성:**\r\n```\r\norders 테이블 → users 테이블 FK\r\nusers DELETE 이벤트가 orders보다 먼저 처리되면?\r\n```\r\n\r\n**해결책:**\r\n- ES에서 참조 무결성 포기 (비정규화)\r\n- 또는 Kafka Streams로 조인 후 발행\r\n\r\n**정합성 검증 전략:**\r\n```sql\r\n-- 주기적 카운트 비교\r\nSELECT COUNT(*) FROM mysql.users;\r\n-- vs\r\nGET /users/_count\r\n```",
    "references": [
      {
        "title": "Debezium - Handling failures",
        "url": "https://debezium.io/documentation/reference/stable/operations/openshift.html"
      }
    ]
  },
  {
    "id": "CDC-013",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium에서 사용되는 메시지 포맷(예: JSON, Avro 등)에 대해 설명해주세요.",
    "answer": "**Debezium 지원 메시지 포맷:**\r\n\r\n**1. JSON (기본):**\r\n```json\r\n{\r\n  \"schema\": { ... },  // 스키마 정보 (선택)\r\n  \"payload\": {\r\n    \"before\": { \"id\": 1, \"name\": \"old\" },\r\n    \"after\": { \"id\": 1, \"name\": \"new\" },\r\n    \"source\": {\r\n      \"version\": \"2.4.0\",\r\n      \"connector\": \"mysql\",\r\n      \"name\": \"dbserver1\",\r\n      \"ts_ms\": 1234567890,\r\n      \"db\": \"inventory\",\r\n      \"table\": \"products\"\r\n    },\r\n    \"op\": \"u\",\r\n    \"ts_ms\": 1234567891\r\n  }\r\n}\r\n```\r\n\r\n**2. Avro:**\r\n```json\r\n{\r\n  \"key.converter\": \"io.confluent.connect.avro.AvroConverter\",\r\n  \"key.converter.schema.registry.url\": \"http://schema-registry:8081\",\r\n  \"value.converter\": \"io.confluent.connect.avro.AvroConverter\",\r\n  \"value.converter.schema.registry.url\": \"http://schema-registry:8081\"\r\n}\r\n```\r\n\r\n**3. Protobuf:**\r\n```json\r\n{\r\n  \"value.converter\": \"io.confluent.connect.protobuf.ProtobufConverter\",\r\n  \"value.converter.schema.registry.url\": \"http://schema-registry:8081\"\r\n}\r\n```\r\n\r\n**포맷 비교:**\r\n\r\n| 특성 | JSON | Avro | Protobuf |\r\n|------|------|------|----------|\r\n| **가독성** | 높음 | 낮음 (바이너리) | 낮음 |\r\n| **크기** | 큼 | 작음 | 매우 작음 |\r\n| **스키마 진화** | 없음 | 강력함 | 강력함 |\r\n| **처리 속도** | 느림 | 빠름 | 매우 빠름 |\r\n| **Schema Registry 필요** | 선택 | 필수 | 필수 |\r\n\r\n**트레이드오프 - 포맷 선택:**\r\n\r\n```\r\n개발/디버깅 편의성    ←──────────────────→    프로덕션 효율성\r\n      JSON                                    Avro/Protobuf\r\n\r\n스키마 유연성        ←──────────────────→    스키마 엄격성\r\n      JSON                                    Avro/Protobuf\r\n```\r\n\r\n**JSON 옵션:**\r\n```json\r\n{\r\n  \"value.converter.schemas.enable\": \"false\",  // 스키마 제외 (크기 절약)\r\n  \"key.converter.schemas.enable\": \"false\"\r\n}\r\n```\r\n\r\n**CloudEvents 형식:**\r\n```json\r\n{\r\n  \"transforms\": \"outbox\",\r\n  \"transforms.outbox.type\": \"io.debezium.transforms.outbox.EventRouter\",\r\n  \"transforms.outbox.table.expand.json.payload\": \"true\"\r\n}\r\n```\r\n\r\n**함정 질문 - \"JSON이 가장 좋은 선택인가요?\":**\r\n상황에 따라 다릅니다:\r\n- **개발/테스트**: JSON (디버깅 용이)\r\n- **프로덕션 고처리량**: Avro/Protobuf (효율성)\r\n- **다양한 Consumer**: JSON (범용성)\r\n- **강력한 스키마 관리**: Avro (Schema Registry)\r\n\r\n**메시지 구조 단순화 (SMT):**\r\n```json\r\n{\r\n  \"transforms\": \"unwrap\",\r\n  \"transforms.unwrap.type\": \"io.debezium.transforms.ExtractNewRecordState\",\r\n  \"transforms.unwrap.drop.tombstones\": \"false\",\r\n  \"transforms.unwrap.delete.handling.mode\": \"rewrite\"\r\n}\r\n```\r\n\r\n변환 전:\r\n```json\r\n{ \"before\": {...}, \"after\": {...}, \"source\": {...}, \"op\": \"u\" }\r\n```\r\n\r\n변환 후:\r\n```json\r\n{ \"id\": 1, \"name\": \"new\", \"__deleted\": false }\r\n```",
    "references": [
      {
        "title": "Debezium Serialization",
        "url": "https://debezium.io/documentation/reference/stable/configuration/avro.html"
      }
    ]
  },
  {
    "id": "CDC-014",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Elasticsearch에 실시간 데이터 인덱싱을 수행할 때 주의해야 할 점은 무엇인가요?",
    "answer": "**Elasticsearch 실시간 인덱싱 주의사항:**\r\n\r\n**1. Refresh 간격 설정:**\r\n```json\r\nPUT /my-index/_settings\r\n{\r\n  \"index\": {\r\n    \"refresh_interval\": \"5s\"  // 기본 1s, 처리량 증가 시 늘림\r\n  }\r\n}\r\n```\r\n\r\n| 설정 | 검색 가시성 | 인덱싱 성능 |\r\n|------|------------|------------|\r\n| 1s (기본) | 빠름 | 낮음 |\r\n| 5-30s | 느림 | 높음 |\r\n| -1 (비활성) | 수동 refresh | 최고 |\r\n\r\n**2. Bulk API 활용:**\r\n```json\r\n// Kafka Connect ES Sink 설정\r\n{\r\n  \"batch.size\": 2000,\r\n  \"linger.ms\": 100,\r\n  \"max.in.flight.requests\": 5\r\n}\r\n```\r\n\r\n**3. 매핑 사전 정의:**\r\n```json\r\nPUT /products\r\n{\r\n  \"mappings\": {\r\n    \"properties\": {\r\n      \"id\": { \"type\": \"keyword\" },\r\n      \"name\": { \"type\": \"text\" },\r\n      \"price\": { \"type\": \"scaled_float\", \"scaling_factor\": 100 },\r\n      \"created_at\": { \"type\": \"date\", \"format\": \"epoch_millis\" }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**4. 문서 ID 전략:**\r\n```\r\nMySQL PK → ES _id\r\n  - 자연스러운 멱등성\r\n  - 업데이트/삭제 시 조회 없이 직접 처리\r\n```\r\n\r\n**트레이드오프 - 인덱싱 전략:**\r\n\r\n| 전략 | 장점 | 단점 |\r\n|------|------|------|\r\n| **개별 인덱싱** | 즉각적 가시성 | 오버헤드 큼 |\r\n| **Bulk 배치** | 효율적 | 지연 발생 |\r\n| **Ingest Pipeline** | 전처리 가능 | 추가 지연 |\r\n\r\n**5. 인덱스 라이프사이클 관리 (ILM):**\r\n```json\r\nPUT _ilm/policy/cdc-policy\r\n{\r\n  \"policy\": {\r\n    \"phases\": {\r\n      \"hot\": {\r\n        \"actions\": {\r\n          \"rollover\": {\r\n            \"max_size\": \"50GB\",\r\n            \"max_age\": \"30d\"\r\n          }\r\n        }\r\n      },\r\n      \"delete\": {\r\n        \"min_age\": \"90d\",\r\n        \"actions\": { \"delete\": {} }\r\n      }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**6. 에러 처리:**\r\n```json\r\n{\r\n  \"errors.tolerance\": \"all\",\r\n  \"errors.deadletterqueue.topic.name\": \"dlq-es-sink\",\r\n  \"errors.deadletterqueue.context.headers.enable\": true\r\n}\r\n```\r\n\r\n**함정 질문 - \"실시간 검색이 가능한가요?\":**\r\n**Near Real-time**입니다:\r\n- ES의 refresh_interval만큼 지연\r\n- Segment merge로 인한 추가 지연\r\n- 진정한 실시간이 필요하면 다른 솔루션 고려\r\n\r\n**운영 체크리스트:**\r\n- [ ] 매핑 사전 정의 (dynamic mapping 최소화)\r\n- [ ] 적절한 샤드 수 설정\r\n- [ ] Refresh interval 튜닝\r\n- [ ] Bulk size 최적화\r\n- [ ] DLQ 설정 및 모니터링",
    "references": [
      {
        "title": "Elasticsearch Indexing Performance",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-indexing-speed.html"
      }
    ]
  },
  {
    "id": "CDC-015",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium 커넥터의 장애 복구 및 재시작 시 동작 방식에 대해 설명해주세요.",
    "answer": "**Debezium 장애 복구 메커니즘:**\r\n\r\n**1. 오프셋 기반 복구:**\r\n```\r\n커넥터 중단\r\n    ↓\r\n마지막 커밋된 오프셋 확인 (Kafka 토픽: connect-offsets)\r\n    ↓\r\n해당 binlog 위치부터 재개\r\n    ↓\r\nAt-least-once 보장 (중복 가능)\r\n```\r\n\r\n**2. 오프셋 저장 구조:**\r\n```json\r\n// connect-offsets 토픽\r\n{\r\n  \"connector\": \"mysql-connector\",\r\n  \"server\": \"dbserver1\"\r\n}\r\n→\r\n{\r\n  \"file\": \"mysql-bin.000003\",\r\n  \"pos\": 12345,\r\n  \"gtid\": \"xxx:1-100\",\r\n  \"ts_sec\": 1234567890\r\n}\r\n```\r\n\r\n**3. 장애 시나리오별 복구:**\r\n\r\n| 시나리오 | 동작 | 주의사항 |\r\n|---------|------|---------|\r\n| **커넥터 재시작** | 오프셋부터 재개 | 중복 이벤트 가능 |\r\n| **Binlog 만료** | 스냅샷 필요 | when_needed 모드 권장 |\r\n| **스키마 히스토리 손상** | 복구 필요 | schema_only_recovery 모드 |\r\n| **Kafka Connect 장애** | Worker 페일오버 | 분산 모드 권장 |\r\n\r\n**4. 분산 모드 장점:**\r\n```\r\n┌──────────────┐    ┌──────────────┐    ┌──────────────┐\r\n│   Worker 1   │    │   Worker 2   │    │   Worker 3   │\r\n│  [Connector] │    │              │    │              │\r\n└──────────────┘    └──────────────┘    └──────────────┘\r\n        ↓ Worker 1 장애 발생\r\n┌──────────────┐    ┌──────────────┐    ┌──────────────┐\r\n│   Worker 1   │    │   Worker 2   │    │   Worker 3   │\r\n│     (down)   │    │  [Connector] │    │              │\r\n└──────────────┘    └──────────────┘    └──────────────┘\r\n                    (자동 리밸런싱)\r\n```\r\n\r\n**5. Binlog 만료 대응:**\r\n```json\r\n{\r\n  \"snapshot.mode\": \"when_needed\",\r\n  // binlog 위치를 찾을 수 없으면 자동 스냅샷\r\n}\r\n```\r\n\r\n**트레이드오프 - 복구 전략:**\r\n\r\n| 전략 | 장점 | 단점 |\r\n|------|------|------|\r\n| **when_needed** | 자동 복구 | 예상치 못한 스냅샷 |\r\n| **never** | 스냅샷 없음 | 수동 개입 필요 |\r\n| **GTID 사용** | 쉬운 위치 추적 | MySQL 5.6.5+ 필요 |\r\n\r\n**6. 수동 오프셋 조정:**\r\n```bash\r\n# 오프셋 확인\r\nkafka-console-consumer.sh --topic connect-offsets \\\r\n  --bootstrap-server kafka:9092 --from-beginning\r\n\r\n# 오프셋 수동 설정 (주의 필요!)\r\nkafka-console-producer.sh --topic connect-offsets \\\r\n  --bootstrap-server kafka:9092 \\\r\n  --property \"parse.key=true\" \\\r\n  --property \"key.separator=|\"\r\n```\r\n\r\n**함정 질문 - \"Exactly-once 복구가 가능한가요?\":**\r\n기본적으로 **At-least-once**입니다:\r\n- 커넥터 실패 후 재시작 시 중복 발생 가능\r\n- Consumer 측 멱등성으로 해결\r\n\r\n**운영 권장사항:**\r\n- [ ] 분산 모드 Kafka Connect 사용\r\n- [ ] GTID 활성화 (MySQL)\r\n- [ ] Binlog 보관 기간 충분히 설정\r\n- [ ] 오프셋/스키마 히스토리 토픽 백업",
    "references": [
      {
        "title": "Debezium - Fault Tolerance",
        "url": "https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-snapshots"
      }
    ]
  },
  {
    "id": "CDC-016",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "MySQL 테이블 변경 감지 시 Debezium이 binlog를 기반으로 이벤트를 처리하는 전체 과정을 설명해주세요.",
    "answer": "**Debezium MySQL 이벤트 처리 전체 흐름:**\r\n\r\n**1. 전체 아키텍처:**\r\n```\r\n┌────────────────────────────────────────────────────────────────────┐\r\n│                         MySQL Server                               │\r\n│  ┌──────────┐    ┌──────────────┐    ┌─────────────────────────┐  │\r\n│  │  Table   │───▶│  Binlog      │───▶│  Replication Stream     │  │\r\n│  │  (InnoDB)│    │  (ROW format)│    │  (Binary Log Dump)      │  │\r\n│  └──────────┘    └──────────────┘    └───────────┬─────────────┘  │\r\n└────────────────────────────────────────────────────│───────────────┘\r\n                                                     │\r\n                                                     ▼\r\n┌────────────────────────────────────────────────────────────────────┐\r\n│                      Debezium Connector                            │\r\n│  ┌───────────────┐    ┌───────────────┐    ┌──────────────────┐   │\r\n│  │ BinlogReader  │───▶│ EventDeserializer│─▶│ ChangeEventMaker│   │\r\n│  │ (MySQL Client)│    │ (ROW → Object)   │  │ (Object → Event)│   │\r\n│  └───────────────┘    └───────────────────┘ └───────┬──────────┘   │\r\n└──────────────────────────────────────────────────────│─────────────┘\r\n                                                       ▼\r\n┌────────────────────────────────────────────────────────────────────┐\r\n│                        Kafka Connect                               │\r\n│  ┌─────────────┐    ┌───────────────┐    ┌────────────────────┐   │\r\n│  │ Transforms  │───▶│ Converter     │───▶│ Kafka Producer     │   │\r\n│  │ (SMT)       │    │ (JSON/Avro)   │    │ (Send to Broker)   │   │\r\n│  └─────────────┘    └───────────────┘    └────────────────────┘   │\r\n└────────────────────────────────────────────────────────────────────┘\r\n```\r\n\r\n**2. 상세 처리 단계:**\r\n\r\n**Step 1: MySQL 트랜잭션 발생**\r\n```sql\r\nBEGIN;\r\nUPDATE users SET name = 'new_name' WHERE id = 1;\r\nCOMMIT;\r\n```\r\n\r\n**Step 2: Binlog 기록**\r\n```\r\nEvent: UPDATE_ROWS_EVENT\r\nTable: users\r\nBefore: {id: 1, name: 'old_name', updated_at: '2024-01-01'}\r\nAfter:  {id: 1, name: 'new_name', updated_at: '2024-01-02'}\r\n```\r\n\r\n**Step 3: Debezium Binlog Reader**\r\n```java\r\n// MySQL Replication Protocol로 이벤트 수신\r\nBinaryLogClient client = new BinaryLogClient(host, port, user, password);\r\nclient.registerEventListener(event -> processEvent(event));\r\n```\r\n\r\n**Step 4: Event Deserialization**\r\n```\r\nBinary Event → Java Object\r\n  - TableMapEvent: 테이블 메타데이터\r\n  - WriteRowsEvent: INSERT\r\n  - UpdateRowsEvent: UPDATE\r\n  - DeleteRowsEvent: DELETE\r\n```\r\n\r\n**Step 5: Change Event 생성**\r\n```json\r\n{\r\n  \"before\": {\"id\": 1, \"name\": \"old_name\"},\r\n  \"after\": {\"id\": 1, \"name\": \"new_name\"},\r\n  \"source\": {\r\n    \"version\": \"2.4.0\",\r\n    \"connector\": \"mysql\",\r\n    \"name\": \"dbserver1\",\r\n    \"ts_ms\": 1704153600000,\r\n    \"db\": \"mydb\",\r\n    \"table\": \"users\",\r\n    \"file\": \"mysql-bin.000003\",\r\n    \"pos\": 12345,\r\n    \"gtid\": \"xxx:100\"\r\n  },\r\n  \"op\": \"u\",\r\n  \"ts_ms\": 1704153600100\r\n}\r\n```\r\n\r\n**Step 6: SMT 적용 (선택)**\r\n```\r\nExtractNewRecordState → {\"id\": 1, \"name\": \"new_name\"}\r\n```\r\n\r\n**Step 7: Kafka 발행**\r\n```\r\nTopic: dbserver1.mydb.users\r\nKey: {\"id\": 1}\r\nValue: {change event}\r\n```\r\n\r\n**Step 8: 오프셋 커밋**\r\n```json\r\n// connect-offsets 토픽에 저장\r\n{\"file\": \"mysql-bin.000003\", \"pos\": 12400}\r\n```\r\n\r\n**함정 질문 - \"모든 binlog 이벤트를 처리하나요?\":**\r\n아닙니다:\r\n- `table.include.list`로 필터링\r\n- `column.exclude.list`로 컬럼 제외\r\n- DDL 이벤트는 스키마 히스토리에만 저장 (별도 토픽 발행 선택)",
    "references": [
      {
        "title": "Debezium MySQL Connector - How it works",
        "url": "https://debezium.io/documentation/reference/stable/connectors/mysql.html#how-the-mysql-connector-works"
      }
    ]
  },
  {
    "id": "CDC-017",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium의 offset 커밋 메커니즘과 장애 복구 시 데이터 지속성 보장 방법은 무엇인가요?",
    "answer": "**Debezium Offset 관리 메커니즘:**\r\n\r\n**1. Offset 구조:**\r\n```json\r\n// Key\r\n[\"mysql-connector\", {\"server\": \"dbserver1\"}]\r\n\r\n// Value (MySQL)\r\n{\r\n  \"ts_sec\": 1704153600,\r\n  \"file\": \"mysql-bin.000003\",\r\n  \"pos\": 12345,\r\n  \"gtid\": \"3E11FA47-71CA-11E1-9E33-C80AA9429562:1-100\",\r\n  \"snapshot\": false\r\n}\r\n```\r\n\r\n**2. Offset 저장 위치:**\r\n\r\n| 모드 | 저장 위치 | 용도 |\r\n|------|----------|------|\r\n| **분산 모드** | Kafka 토픽 (connect-offsets) | 프로덕션 권장 |\r\n| **단독 모드** | 로컬 파일 | 개발/테스트 |\r\n| **Embedded** | 커스텀 스토어 | 애플리케이션 내장 |\r\n\r\n**3. Offset 커밋 흐름:**\r\n```\r\nBinlog 이벤트 읽기\r\n       ↓\r\nChange Event 생성\r\n       ↓\r\nKafka Producer Send\r\n       ↓\r\nProducer Ack 수신\r\n       ↓\r\nOffset 커밋 (비동기/주기적)\r\n       ↓\r\nconnect-offsets 토픽에 저장\r\n```\r\n\r\n**4. Offset 커밋 설정:**\r\n```json\r\n{\r\n  \"offset.flush.interval.ms\": 60000,      // 커밋 주기 (기본 60초)\r\n  \"offset.flush.timeout.ms\": 5000,        // 커밋 타임아웃\r\n  \"offset.storage.partitions\": 25,        // 파티션 수\r\n  \"offset.storage.replication.factor\": 3  // 복제 팩터\r\n}\r\n```\r\n\r\n**트레이드오프 - 커밋 주기:**\r\n\r\n| 설정 | 짧은 주기 (1-5초) | 긴 주기 (60초+) |\r\n|------|------------------|----------------|\r\n| **데이터 손실** | 최소화 | 장애 시 더 많은 중복 |\r\n| **성능** | 오버헤드 증가 | 효율적 |\r\n| **복구 시간** | 빠름 | 더 많은 재처리 |\r\n\r\n**5. 장애 시나리오:**\r\n\r\n```\r\n정상 처리:\r\n  Event A → Kafka Send ✓ → Offset Commit A ✓\r\n  Event B → Kafka Send ✓ → Offset Commit B ✓\r\n\r\n장애 발생 (커밋 전):\r\n  Event C → Kafka Send ✓ → (장애) → Offset Commit C ✗\r\n\r\n재시작:\r\n  마지막 커밋된 오프셋 B부터 재개\r\n  Event C 중복 발행 (At-least-once)\r\n```\r\n\r\n**6. GTID vs File:Position:**\r\n\r\n| 방식 | 장점 | 단점 |\r\n|------|------|------|\r\n| **GTID** | 자동 위치 추적, 페일오버 지원 | MySQL 5.6.5+ |\r\n| **File:Position** | 단순, 모든 버전 지원 | 수동 관리 필요 |\r\n\r\n**7. 스냅샷 중 Offset:**\r\n```json\r\n{\r\n  \"snapshot\": true,\r\n  \"snapshot_completed\": false,\r\n  \"ts_sec\": 0,\r\n  \"file\": \"mysql-bin.000003\",\r\n  \"pos\": 12345\r\n}\r\n```\r\n- 스냅샷 시작 시 binlog 위치 기록\r\n- 스냅샷 완료 후 해당 위치부터 스트리밍\r\n\r\n**함정 질문 - \"Offset만 있으면 복구 가능한가요?\":**\r\nOffset과 함께 **스키마 히스토리**도 필요합니다:\r\n- 과거 시점의 테이블 구조 정보\r\n- DDL 변경 이력\r\n- 없으면 이벤트 파싱 실패\r\n\r\n**운영 권장사항:**\r\n- [ ] GTID 사용 권장\r\n- [ ] offset.flush.interval.ms 적절히 설정\r\n- [ ] connect-offsets 토픽 replication factor 3+\r\n- [ ] 스키마 히스토리 토픽과 함께 백업",
    "references": [
      {
        "title": "Kafka Connect Offset Management",
        "url": "https://docs.confluent.io/platform/current/connect/concepts.html#connect-offsets"
      }
    ]
  },
  {
    "id": "CDC-018",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "CDC 구현 시 데이터 일관성을 위한 트랜잭션 처리 방식과 Debezium의 역할에 대해 설명해주세요.",
    "answer": "**CDC 트랜잭션 처리 방식:**\r\n\r\n**1. 트랜잭션 메타데이터:**\r\nDebezium은 트랜잭션 경계 정보를 제공합니다:\r\n```json\r\n{\r\n  \"source\": {\r\n    \"ts_ms\": 1704153600000,\r\n    \"gtid\": \"xxx:100\"\r\n  },\r\n  \"transaction\": {\r\n    \"id\": \"file=mysql-bin.000003,pos=12345\",\r\n    \"total_order\": 1,      // 트랜잭션 내 전체 순서\r\n    \"data_collection_order\": 1  // 테이블 내 순서\r\n  }\r\n}\r\n```\r\n\r\n**2. 트랜잭션 경계 토픽:**\r\n```json\r\n{\r\n  \"provide.transaction.metadata\": \"true\",\r\n  \"transaction.topic\": \"dbserver1.transaction\"\r\n}\r\n```\r\n\r\n트랜잭션 시작/종료 이벤트:\r\n```json\r\n// BEGIN\r\n{\"status\": \"BEGIN\", \"id\": \"xxx:100\", \"event_count\": null}\r\n\r\n// END\r\n{\"status\": \"END\", \"id\": \"xxx:100\", \"event_count\": 5}\r\n```\r\n\r\n**3. 트랜잭션 일관성 패턴:**\r\n\r\n**패턴 1: Outbox 패턴**\r\n```\r\n┌─────────────────────────────────────────────┐\r\n│ 애플리케이션 트랜잭션                        │\r\n│   1. orders 테이블 INSERT                   │\r\n│   2. outbox 테이블 INSERT                   │\r\n│   (같은 트랜잭션 - 원자성 보장)              │\r\n└─────────────────────────────────────────────┘\r\n               ↓ Debezium\r\n┌─────────────────────────────────────────────┐\r\n│ outbox 이벤트만 캡처 → Kafka 발행           │\r\n│ (EventRouter SMT 사용)                      │\r\n└─────────────────────────────────────────────┘\r\n```\r\n\r\n```json\r\n{\r\n  \"transforms\": \"outbox\",\r\n  \"transforms.outbox.type\": \"io.debezium.transforms.outbox.EventRouter\",\r\n  \"transforms.outbox.table.field.event.id\": \"id\",\r\n  \"transforms.outbox.table.field.event.key\": \"aggregate_id\",\r\n  \"transforms.outbox.table.field.event.type\": \"event_type\",\r\n  \"transforms.outbox.table.field.event.payload\": \"payload\"\r\n}\r\n```\r\n\r\n**패턴 2: 트랜잭션 버퍼링 (Consumer)**\r\n```\r\nConsumer에서 트랜잭션 경계까지 버퍼링:\r\n  1. BEGIN 수신 → 버퍼 시작\r\n  2. 이벤트들 버퍼에 저장\r\n  3. END 수신 → 버퍼 일괄 처리 → 커밋\r\n```\r\n\r\n**트레이드오프:**\r\n\r\n| 접근 방식 | 장점 | 단점 |\r\n|----------|------|------|\r\n| **이벤트별 처리** | 단순, 낮은 지연 | 트랜잭션 경계 무시 |\r\n| **트랜잭션 버퍼링** | 원자성 보장 | 메모리 사용, 지연 증가 |\r\n| **Outbox 패턴** | 명시적 이벤트 설계 | 추가 테이블 필요 |\r\n\r\n**4. 대용량 트랜잭션 처리:**\r\n```json\r\n{\r\n  \"max.batch.size\": 2048,\r\n  \"max.queue.size\": 8192,\r\n  \"max.queue.size.in.bytes\": 0  // 무제한\r\n}\r\n```\r\n\r\n주의: 매우 큰 트랜잭션은 메모리 문제 유발 가능\r\n\r\n**함정 질문 - \"Debezium이 트랜잭션 원자성을 보장하나요?\":**\r\n**부분적입니다:**\r\n- 동일 트랜잭션 이벤트는 순서대로 발행\r\n- 하지만 Kafka에서 Consumer가 일부만 처리하고 실패할 수 있음\r\n- Consumer 측에서 트랜잭션 경계 처리 필요\r\n\r\n**운영 권장사항:**\r\n- [ ] 중요 이벤트는 Outbox 패턴 사용\r\n- [ ] 트랜잭션 메타데이터 활성화\r\n- [ ] 대용량 트랜잭션 모니터링",
    "references": [
      {
        "title": "Debezium Transaction Metadata",
        "url": "https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-transaction-metadata"
      },
      {
        "title": "Outbox Pattern",
        "url": "https://debezium.io/blog/2019/02/19/reliable-microservices-data-exchange-with-the-outbox-pattern/"
      }
    ]
  },
  {
    "id": "CDC-019",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium CDC 도입 시 데이터 중복 문제가 발생할 수 있는데, 이를 해결하는 방법은 무엇인가요?",
    "answer": "**Debezium 데이터 중복 발생 원인:**\r\n\r\n**1. 중복 발생 시나리오:**\r\n```\r\n시나리오 1: 커넥터 재시작\r\n  Event A 발행 → Kafka Ack 수신 → (장애) → Offset 커밋 실패\r\n  재시작 후 → Event A 재발행 (중복)\r\n\r\n시나리오 2: 스냅샷-스트리밍 전환\r\n  스냅샷 중 binlog 변경 발생\r\n  스냅샷 완료 후 해당 binlog부터 재개 → 중복 가능\r\n\r\n시나리오 3: Kafka Producer 재시도\r\n  네트워크 타임아웃 → 재시도 → 실제로는 첫 시도 성공했을 수 있음\r\n```\r\n\r\n**2. 중복 해결 전략:**\r\n\r\n**전략 1: Consumer 멱등성 (권장)**\r\n```sql\r\n-- Upsert 패턴\r\nINSERT INTO target_table (id, name, updated_at)\r\nVALUES (?, ?, ?)\r\nON DUPLICATE KEY UPDATE name = VALUES(name), updated_at = VALUES(updated_at);\r\n```\r\n\r\n```json\r\n// Elasticsearch - 문서 ID로 PK 사용\r\nPUT /products/_doc/1\r\n{\r\n  \"id\": 1,\r\n  \"name\": \"product\"\r\n}\r\n// 동일 ID는 덮어쓰기 → 자연스러운 멱등성\r\n```\r\n\r\n**전략 2: Kafka Producer 멱등성**\r\n```json\r\n{\r\n  \"producer.override.enable.idempotence\": \"true\",\r\n  \"producer.override.max.in.flight.requests.per.connection\": 5,\r\n  \"producer.override.acks\": \"all\"\r\n}\r\n```\r\n\r\n**전략 3: 중복 제거 로직**\r\n```java\r\n// 이벤트 ID 기반 중복 확인\r\nString eventId = record.source().get(\"gtid\") + \":\" + record.source().get(\"pos\");\r\nif (processedEvents.contains(eventId)) {\r\n    return; // 중복 스킵\r\n}\r\nprocessedEvents.add(eventId);\r\nprocess(record);\r\n```\r\n\r\n**전략 4: 트랜잭션 아웃박스**\r\n```java\r\n// 아웃박스 테이블에 이벤트 ID 포함\r\nINSERT INTO outbox (event_id, aggregate_id, event_type, payload)\r\nVALUES (UUID(), ?, ?, ?);\r\n// Consumer에서 event_id로 중복 확인\r\n```\r\n\r\n**3. 중복 제거 레벨:**\r\n\r\n| 레벨 | 방법 | 트레이드오프 |\r\n|------|------|-------------|\r\n| **Kafka** | 멱등성 Producer | 순서 제한 (max 5) |\r\n| **Consumer** | 멱등성 처리 | 구현 필요 |\r\n| **Storage** | Upsert/문서ID | DB 지원 필요 |\r\n| **Application** | 이벤트 ID 추적 | 상태 관리 필요 |\r\n\r\n**4. 중복 추적 구현 예시:**\r\n```java\r\n// Redis 기반 중복 추적\r\nString eventKey = \"processed:\" + gtid;\r\nif (redis.setnx(eventKey, \"1\", Duration.ofHours(24))) {\r\n    // 새 이벤트 - 처리\r\n    processEvent(event);\r\n} else {\r\n    // 중복 이벤트 - 스킵\r\n    log.debug(\"Duplicate event: {}\", gtid);\r\n}\r\n```\r\n\r\n**함정 질문 - \"Exactly-once를 보장하나요?\":**\r\n**기본적으로 At-least-once입니다:**\r\n- Debezium + Kafka = At-least-once\r\n- Exactly-once는 Consumer 구현에 따라 달성 가능\r\n- Kafka Transactions + 멱등성 Consumer = Effectively Exactly-once\r\n\r\n**운영 권장사항:**\r\n- [ ] 모든 Consumer에 멱등성 로직 구현\r\n- [ ] Primary Key 기반 Upsert 사용\r\n- [ ] 이벤트 ID(GTID 등)로 중복 추적\r\n- [ ] 중복 이벤트 모니터링",
    "references": [
      {
        "title": "Debezium - Handling duplicates",
        "url": "https://debezium.io/blog/2020/02/10/event-sourcing-vs-cdc/"
      }
    ]
  },
  {
    "id": "CDC-020",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium 커넥터에서 특정 테이블이나 이벤트만 필터링하는 기능에 대해 설명해주세요.",
    "answer": "**Debezium 필터링 기능:**\r\n\r\n**1. 테이블/데이터베이스 필터링:**\r\n```json\r\n{\r\n  // 데이터베이스 필터링\r\n  \"database.include.list\": \"inventory,sales\",\r\n  \"database.exclude.list\": \"test,staging\",\r\n\r\n  // 테이블 필터링 (정규식 지원)\r\n  \"table.include.list\": \"inventory.products,inventory.orders\",\r\n  \"table.exclude.list\": \"inventory.audit_.*,inventory.temp_.*\"\r\n}\r\n```\r\n\r\n**2. 컬럼 필터링:**\r\n```json\r\n{\r\n  // 특정 컬럼 제외\r\n  \"column.exclude.list\": \"inventory.users.password,inventory.users.ssn\",\r\n\r\n  // 특정 컬럼만 포함\r\n  \"column.include.list\": \"inventory.products.id,inventory.products.name,inventory.products.price\"\r\n}\r\n```\r\n\r\n**3. 컬럼 마스킹:**\r\n```json\r\n{\r\n  // 해시 마스킹\r\n  \"column.mask.hash.SHA-256.with.salt.my_salt\": \"inventory.users.email\",\r\n\r\n  // 고정값 마스킹\r\n  \"column.mask.with.0.chars\": \"inventory.users.phone\"\r\n}\r\n```\r\n\r\n**4. 이벤트 타입 필터링 (SMT):**\r\n```json\r\n{\r\n  \"transforms\": \"filter\",\r\n  \"transforms.filter.type\": \"io.debezium.transforms.Filter\",\r\n  \"transforms.filter.language\": \"jsr223.groovy\",\r\n  \"transforms.filter.condition\": \"value.op == 'c' || value.op == 'u'\"\r\n}\r\n```\r\n\r\n**5. 조건부 필터링:**\r\n```json\r\n{\r\n  // Groovy 스크립트로 조건 필터링\r\n  \"transforms\": \"filter\",\r\n  \"transforms.filter.type\": \"io.debezium.transforms.Filter\",\r\n  \"transforms.filter.language\": \"jsr223.groovy\",\r\n  \"transforms.filter.condition\": \"value.after.status == 'active'\"\r\n}\r\n```\r\n\r\n**6. 토픽 라우팅:**\r\n```json\r\n{\r\n  \"transforms\": \"route\",\r\n  \"transforms.route.type\": \"io.debezium.transforms.ByLogicalTableRouter\",\r\n  \"transforms.route.topic.regex\": \"(.*)orders(.*)\",\r\n  \"transforms.route.topic.replacement\": \"all-orders\",\r\n  \"transforms.route.key.field.name\": \"shard_id\"\r\n}\r\n```\r\n\r\n**필터링 레벨 비교:**\r\n\r\n| 레벨 | 적용 시점 | 장점 | 단점 |\r\n|------|----------|------|------|\r\n| **DB 레벨** | binlog 읽기 전 | 가장 효율적 | MySQL 서버 설정 필요 |\r\n| **Connector 레벨** | 이벤트 생성 전 | 간편한 설정 | 일부 오버헤드 |\r\n| **SMT 레벨** | Kafka 발행 전 | 유연한 조건 | 처리 오버헤드 |\r\n| **Consumer 레벨** | 소비 후 | 가장 유연 | 불필요한 데이터 전송 |\r\n\r\n**트레이드오프:**\r\n```\r\n┌─────────────────────────────────────────────────────────────┐\r\n│  효율성                                           유연성    │\r\n│    │                                                 │      │\r\n│  DB 레벨 ── Connector 레벨 ── SMT 레벨 ── Consumer 레벨   │\r\n│    │                                                 │      │\r\n│  (설정 복잡)                                   (오버헤드)   │\r\n└─────────────────────────────────────────────────────────────┘\r\n```\r\n\r\n**함정 질문 - \"필터링하면 binlog 읽기도 줄어드나요?\":**\r\n**아닙니다:**\r\n- Debezium은 모든 binlog 이벤트를 읽음\r\n- 필터링은 Kafka 발행 전에 적용\r\n- binlog 읽기 자체의 부하는 동일\r\n- 예외: 데이터베이스 필터링은 일부 최적화 가능\r\n\r\n**운영 권장사항:**\r\n- [ ] 가능한 상위 레벨(테이블/DB)에서 필터링\r\n- [ ] 민감 데이터는 마스킹 적용\r\n- [ ] 필터 조건 테스트 철저히\r\n- [ ] 필터링 성능 영향 모니터링",
    "references": [
      {
        "title": "Debezium Topic Routing",
        "url": "https://debezium.io/documentation/reference/stable/transformations/topic-routing.html"
      },
      {
        "title": "Debezium Filtering",
        "url": "https://debezium.io/documentation/reference/stable/transformations/filtering.html"
      }
    ]
  },
  {
    "id": "CDC-021",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Kafka Connect와 Debezium의 연계 동작 방식에 대해 설명해주세요.",
    "answer": "**Kafka Connect와 Debezium 아키텍처:**\r\n\r\n**1. Kafka Connect 개요:**\r\n```\r\n┌──────────────────────────────────────────────────────────────┐\r\n│                    Kafka Connect Cluster                     │\r\n│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │\r\n│  │   Worker 1   │  │   Worker 2   │  │   Worker 3   │       │\r\n│  │ ┌──────────┐ │  │ ┌──────────┐ │  │ ┌──────────┐ │       │\r\n│  │ │Debezium  │ │  │ │ES Sink   │ │  │ │S3 Sink   │ │       │\r\n│  │ │MySQL     │ │  │ │Connector │ │  │ │Connector │ │       │\r\n│  │ └──────────┘ │  │ └──────────┘ │  │ └──────────┘ │       │\r\n│  └──────────────┘  └──────────────┘  └──────────────┘       │\r\n└──────────────────────────────────────────────────────────────┘\r\n                           │\r\n                    ┌──────┴──────┐\r\n                    │    Kafka    │\r\n                    │   Cluster   │\r\n                    └─────────────┘\r\n```\r\n\r\n**2. 동작 방식:**\r\n\r\n| 구성 요소 | 역할 |\r\n|----------|------|\r\n| **Worker** | 커넥터 실행 환경 (JVM 프로세스) |\r\n| **Connector** | 작업 정의 및 Task 관리 |\r\n| **Task** | 실제 데이터 복사 수행 |\r\n| **Converter** | 데이터 직렬화/역직렬화 |\r\n| **Transform** | 메시지 변환 (SMT) |\r\n\r\n**3. 배포 모드:**\r\n\r\n| 모드 | 특징 | 사용 시나리오 |\r\n|------|------|--------------|\r\n| **Standalone** | 단일 프로세스, 로컬 오프셋 | 개발/테스트 |\r\n| **Distributed** | 클러스터, Kafka 오프셋 | 프로덕션 |\r\n\r\n**4. REST API:**\r\n```bash\r\n# 커넥터 목록\r\nGET /connectors\r\n\r\n# 커넥터 생성\r\nPOST /connectors\r\n{\r\n  \"name\": \"mysql-connector\",\r\n  \"config\": {\r\n    \"connector.class\": \"io.debezium.connector.mysql.MySqlConnector\",\r\n    ...\r\n  }\r\n}\r\n\r\n# 커넥터 상태\r\nGET /connectors/mysql-connector/status\r\n\r\n# 커넥터 재시작\r\nPOST /connectors/mysql-connector/restart\r\n\r\n# 커넥터 일시 중지\r\nPUT /connectors/mysql-connector/pause\r\n\r\n# 커넥터 삭제\r\nDELETE /connectors/mysql-connector\r\n```\r\n\r\n**5. 내부 토픽:**\r\n\r\n| 토픽 | 용도 |\r\n|------|------|\r\n| `connect-configs` | 커넥터 설정 저장 |\r\n| `connect-offsets` | 오프셋 저장 |\r\n| `connect-status` | 커넥터 상태 저장 |\r\n| `schema-changes.*` | 스키마 히스토리 (Debezium) |\r\n\r\n**6. 분산 모드 설정:**\r\n```properties\r\n# connect-distributed.properties\r\nbootstrap.servers=kafka:9092\r\ngroup.id=connect-cluster\r\nkey.converter=org.apache.kafka.connect.json.JsonConverter\r\nvalue.converter=org.apache.kafka.connect.json.JsonConverter\r\n\r\nconfig.storage.topic=connect-configs\r\nconfig.storage.replication.factor=3\r\n\r\noffset.storage.topic=connect-offsets\r\noffset.storage.replication.factor=3\r\n\r\nstatus.storage.topic=connect-status\r\nstatus.storage.replication.factor=3\r\n```\r\n\r\n**트레이드오프 - 태스크 수:**\r\n```json\r\n{\r\n  \"tasks.max\": 1  // Debezium은 일반적으로 1\r\n}\r\n```\r\n- Debezium: 소스당 1 Task (binlog는 단일 스트림)\r\n- Sink Connector: 병렬 처리 가능 (여러 Task)\r\n\r\n**함정 질문 - \"Debezium 없이 CDC가 가능한가요?\":**\r\nKafka Connect 자체는 CDC 기능이 없습니다:\r\n- JDBC Source Connector: 쿼리 기반 (진정한 CDC 아님)\r\n- Debezium: 로그 기반 CDC\r\n- 다른 CDC 커넥터: Oracle CDC, Attunity 등",
    "references": [
      {
        "title": "Kafka Connect Documentation",
        "url": "https://kafka.apache.org/documentation/#connect"
      },
      {
        "title": "Debezium Deployment",
        "url": "https://debezium.io/documentation/reference/stable/operations/kubernetes.html"
      }
    ]
  },
  {
    "id": "CDC-022",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium 기반 데이터 파이프라인을 모니터링하고 관리하는 방법은 무엇인가요?",
    "answer": "**Debezium 모니터링 전략:**\r\n\r\n**1. JMX 메트릭:**\r\n\r\n| 메트릭 | 의미 | 임계값 예시 |\r\n|--------|------|------------|\r\n| `MilliSecondsBehindSource` | 소스 대비 지연 시간 | > 60000ms 경고 |\r\n| `NumberOfEventsFiltered` | 필터링된 이벤트 수 | 비정상 증가 모니터링 |\r\n| `TotalNumberOfEventsSeen` | 처리된 총 이벤트 | 처리량 추적 |\r\n| `NumberOfDisconnects` | 연결 끊김 횟수 | > 0 조사 필요 |\r\n| `QueueTotalCapacity` | 큐 용량 | 사용률 모니터링 |\r\n| `QueueRemainingCapacity` | 남은 큐 용량 | < 20% 경고 |\r\n\r\n**2. Prometheus + Grafana 설정:**\r\n```yaml\r\n# Kafka Connect JMX Exporter 설정\r\nlowercaseOutputLabelNames: true\r\nlowercaseOutputName: true\r\nrules:\r\n  - pattern: \"debezium.([^:]+)<type=connector-metrics, context=([^,]+), server=([^,]+)><>([^:]+)\"\r\n    name: \"debezium_$1_$4\"\r\n    labels:\r\n      context: \"$2\"\r\n      server: \"$3\"\r\n```\r\n\r\n**3. 알림 규칙 예시:**\r\n```yaml\r\n# Prometheus AlertManager\r\ngroups:\r\n  - name: debezium\r\n    rules:\r\n      - alert: DebeziumLag\r\n        expr: debezium_mysql_MilliSecondsBehindSource > 60000\r\n        for: 5m\r\n        labels:\r\n          severity: warning\r\n        annotations:\r\n          summary: \"Debezium lag is high\"\r\n\r\n      - alert: DebeziumDisconnected\r\n        expr: debezium_mysql_Connected == 0\r\n        for: 1m\r\n        labels:\r\n          severity: critical\r\n        annotations:\r\n          summary: \"Debezium disconnected from MySQL\"\r\n```\r\n\r\n**4. Kafka Connect REST API 모니터링:**\r\n```bash\r\n# 커넥터 상태 확인\r\ncurl http://connect:8083/connectors/mysql-connector/status\r\n\r\n# 응답 예시\r\n{\r\n  \"name\": \"mysql-connector\",\r\n  \"connector\": { \"state\": \"RUNNING\", \"worker_id\": \"connect:8083\" },\r\n  \"tasks\": [\r\n    { \"id\": 0, \"state\": \"RUNNING\", \"worker_id\": \"connect:8083\" }\r\n  ]\r\n}\r\n```\r\n\r\n**5. Consumer Lag 모니터링:**\r\n```bash\r\n# Kafka Consumer Lag\r\nkafka-consumer-groups.sh --bootstrap-server kafka:9092 \\\r\n  --describe --group my-consumer-group\r\n\r\n# 결과\r\nTOPIC           PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG\r\ndbserver1.mydb  0          1000            1050            50\r\n```\r\n\r\n**6. 로그 모니터링:**\r\n```\r\n주요 로그 패턴:\r\n- ERROR: 즉시 조사 필요\r\n- \"Snapshot completed\": 스냅샷 완료 확인\r\n- \"Streaming changes\": 스트리밍 모드 전환\r\n- \"Connection refused\": 연결 문제\r\n```\r\n\r\n**7. 대시보드 구성:**\r\n```\r\n┌─────────────────────────────────────────────────────────────┐\r\n│ Debezium Dashboard                                          │\r\n├────────────────┬────────────────┬────────────────┬──────────┤\r\n│ Connector      │ Lag (ms)       │ Events/sec     │ Status   │\r\n│ mysql-conn     │ 150            │ 1,250          │ RUNNING  │\r\n│ postgres-conn  │ 5,230          │ 890            │ RUNNING  │\r\n├────────────────┴────────────────┴────────────────┴──────────┤\r\n│ [Lag Graph over time]                                       │\r\n├─────────────────────────────────────────────────────────────┤\r\n│ [Throughput Graph]                                          │\r\n└─────────────────────────────────────────────────────────────┘\r\n```\r\n\r\n**함정 질문 - \"MilliSecondsBehindSource가 0이면 문제없나요?\":**\r\n반드시 그렇지 않습니다:\r\n- 소스에 변경이 없으면 0일 수 있음\r\n- Heartbeat 설정으로 유휴 상태에서도 업데이트 필요\r\n- Consumer Lag도 함께 확인해야 함\r\n\r\n**운영 체크리스트:**\r\n- [ ] JMX Exporter 설정\r\n- [ ] Grafana 대시보드 구성\r\n- [ ] 알림 규칙 설정 (Lag, 연결 상태)\r\n- [ ] 로그 수집 (ELK/Loki)\r\n- [ ] Consumer Lag 모니터링",
    "references": [
      {
        "title": "Debezium Monitoring",
        "url": "https://debezium.io/documentation/reference/stable/operations/monitoring.html"
      }
    ]
  },
  {
    "id": "CDC-023",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Elasticsearch 동기화를 위해 Debezium과 함께 사용할 수 있는 오픈 소스 도구에는 어떤 것들이 있나요?",
    "answer": "**Debezium + Elasticsearch 연동 도구:**\r\n\r\n**1. Kafka Connect Elasticsearch Sink (권장):**\r\n```json\r\n{\r\n  \"name\": \"es-sink-connector\",\r\n  \"config\": {\r\n    \"connector.class\": \"io.confluent.connect.elasticsearch.ElasticsearchSinkConnector\",\r\n    \"topics\": \"dbserver1.inventory.products\",\r\n    \"connection.url\": \"http://elasticsearch:9200\",\r\n    \"type.name\": \"_doc\",\r\n    \"key.ignore\": \"false\",\r\n    \"transforms\": \"unwrap,extractKey\",\r\n    \"transforms.unwrap.type\": \"io.debezium.transforms.ExtractNewRecordState\",\r\n    \"transforms.extractKey.type\": \"org.apache.kafka.connect.transforms.ExtractField$Key\",\r\n    \"transforms.extractKey.field\": \"id\"\r\n  }\r\n}\r\n```\r\n\r\n| 장점 | 단점 |\r\n|------|------|\r\n| Kafka Connect 생태계 통합 | 복잡한 변환 제한 |\r\n| 자동 재시도, DLQ | 학습 곡선 |\r\n| 관리 도구 통합 | Confluent 라이선스 고려 |\r\n\r\n**2. Logstash:**\r\n```ruby\r\ninput {\r\n  kafka {\r\n    bootstrap_servers => \"kafka:9092\"\r\n    topics => [\"dbserver1.inventory.products\"]\r\n    codec => json\r\n    consumer_threads => 3\r\n  }\r\n}\r\n\r\nfilter {\r\n  json {\r\n    source => \"message\"\r\n  }\r\n  mutate {\r\n    rename => { \"[after][id]\" => \"id\" }\r\n    rename => { \"[after][name]\" => \"name\" }\r\n  }\r\n}\r\n\r\noutput {\r\n  elasticsearch {\r\n    hosts => [\"elasticsearch:9200\"]\r\n    index => \"products\"\r\n    document_id => \"%{id}\"\r\n  }\r\n}\r\n```\r\n\r\n| 장점 | 단점 |\r\n|------|------|\r\n| 유연한 필터링 | 추가 인프라 |\r\n| ELK 스택 통합 | 리소스 사용량 |\r\n| 풍부한 플러그인 | 복잡한 파이프라인 관리 |\r\n\r\n**3. Kafka Streams (커스텀):**\r\n```java\r\nStreamsBuilder builder = new StreamsBuilder();\r\nbuilder.stream(\"dbserver1.inventory.products\")\r\n    .mapValues(value -> extractAfterState(value))\r\n    .foreach((key, value) -> indexToElasticsearch(key, value));\r\n```\r\n\r\n| 장점 | 단점 |\r\n|------|------|\r\n| 완전한 제어 | 개발 필요 |\r\n| 복잡한 변환 가능 | 운영 부담 |\r\n| 상태 관리 가능 | 직접 구현 |\r\n\r\n**4. Debezium Server (Kafka 없이):**\r\n```json\r\n{\r\n  \"debezium.source.connector.class\": \"io.debezium.connector.mysql.MySqlConnector\",\r\n  \"debezium.source.database.hostname\": \"mysql\",\r\n  \"debezium.sink.type\": \"http\",\r\n  \"debezium.sink.http.url\": \"http://elasticsearch:9200/_bulk\"\r\n}\r\n```\r\n\r\n| 장점 | 단점 |\r\n|------|------|\r\n| Kafka 불필요 | 내구성 감소 |\r\n| 단순한 아키텍처 | 확장성 제한 |\r\n| 빠른 시작 | 복잡한 라우팅 어려움 |\r\n\r\n**5. 도구 비교:**\r\n\r\n| 도구 | 복잡도 | 유연성 | 운영 부담 | 추천 시나리오 |\r\n|------|--------|--------|----------|--------------|\r\n| **ES Sink Connector** | 낮음 | 중간 | 낮음 | 프로덕션 권장 |\r\n| **Logstash** | 중간 | 높음 | 중간 | 기존 ELK 사용 시 |\r\n| **Kafka Streams** | 높음 | 매우 높음 | 높음 | 복잡한 변환 필요 |\r\n| **Debezium Server** | 낮음 | 낮음 | 낮음 | 소규모/테스트 |\r\n\r\n**함정 질문 - \"어떤 도구가 가장 좋은가요?\":**\r\n상황에 따라 다릅니다:\r\n- **단순 동기화**: ES Sink Connector\r\n- **복잡한 데이터 가공**: Kafka Streams\r\n- **기존 ELK 환경**: Logstash\r\n- **Kafka 없는 환경**: Debezium Server",
    "references": [
      {
        "title": "Confluent Elasticsearch Connector",
        "url": "https://docs.confluent.io/kafka-connectors/elasticsearch/current/overview.html"
      },
      {
        "title": "Debezium Server",
        "url": "https://debezium.io/documentation/reference/stable/operations/debezium-server.html"
      }
    ]
  },
  {
    "id": "CDC-024",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium의 snapshot 모드 사용 시 발생할 수 있는 문제와 그 해결 방안은 무엇인가요?",
    "answer": "**Debezium Snapshot 문제와 해결 방안:**\r\n\r\n**1. 대용량 테이블 스냅샷 시간:**\r\n\r\n| 문제 | 해결 방안 |\r\n|------|----------|\r\n| 스냅샷 완료까지 수 시간 소요 | Incremental Snapshot 사용 |\r\n| Kafka Producer 타임아웃 | `producer.override.*` 조정 |\r\n| 메모리 부족 | `snapshot.fetch.size` 조정 |\r\n\r\n```json\r\n{\r\n  \"snapshot.mode\": \"initial\",\r\n  \"snapshot.fetch.size\": 10240,\r\n  \"signal.data.collection\": \"mydb.debezium_signal\",\r\n  \"incremental.snapshot.chunk.size\": 1024\r\n}\r\n```\r\n\r\n**2. 테이블 락 문제:**\r\n```\r\n문제: 스냅샷 중 쓰기 작업 차단\r\n\r\n해결:\r\n- snapshot.locking.mode = minimal (기본값)\r\n- 또는 none (일관성 trade-off)\r\n```\r\n\r\n| 모드 | 락 범위 | 일관성 |\r\n|------|--------|--------|\r\n| **extended** | 전체 스냅샷 동안 | 완벽 |\r\n| **minimal** | 스키마 읽기 시만 | 대부분 충분 |\r\n| **none** | 락 없음 | 일관성 보장 안 됨 |\r\n\r\n**3. Binlog 만료:**\r\n```\r\n문제: 스냅샷 중 binlog 만료 → 일부 변경 유실\r\n\r\n해결:\r\n- expire_logs_days 충분히 설정 (스냅샷 예상 시간 * 2)\r\n- 또는 snapshot.mode = when_needed\r\n```\r\n\r\n**4. 스냅샷 중단 후 재시작:**\r\n```\r\n문제: 스냅샷 50% 진행 후 중단 → 처음부터 다시 시작\r\n\r\n해결 (Debezium 1.6+):\r\n- Incremental Snapshot으로 청크 단위 재개\r\n- 각 청크 완료 시 오프셋 저장\r\n```\r\n\r\n**5. 스키마 변경 중 스냅샷:**\r\n```\r\n문제: 스냅샷 중 ALTER TABLE 실행 → 불일치 가능\r\n\r\n해결:\r\n- 스냅샷 완료 전 DDL 변경 자제\r\n- 또는 schema_only_recovery 후 재시작\r\n```\r\n\r\n**6. OOM (Out of Memory):**\r\n```json\r\n{\r\n  \"snapshot.fetch.size\": 2048,      // 기본 10240보다 줄임\r\n  \"snapshot.max.threads\": 1,        // 병렬 처리 제한\r\n  \"max.queue.size\": 4096            // 큐 크기 제한\r\n}\r\n```\r\n\r\n**7. Consumer 처리 속도:**\r\n```\r\n문제: 스냅샷 데이터 대량 발행 → Consumer 뒤처짐\r\n\r\n해결:\r\n- Consumer 병렬 처리 증가\r\n- 스냅샷 속도 제한 (snapshot.delay.ms)\r\n- 배치 처리 최적화\r\n```\r\n\r\n**트레이드오프 - 스냅샷 전략:**\r\n\r\n| 전략 | 장점 | 단점 |\r\n|------|------|------|\r\n| **전체 스냅샷** | 단순, 일관성 보장 | 시간 소요, 리소스 사용 |\r\n| **스키마만** | 빠른 시작 | 기존 데이터 없음 |\r\n| **증분 스냅샷** | 중단 재개 가능 | 설정 복잡 |\r\n\r\n**Incremental Snapshot 시그널:**\r\n```sql\r\n-- 스냅샷 시작\r\nINSERT INTO debezium_signal (id, type, data) VALUES\r\n('ad-hoc-1', 'execute-snapshot',\r\n '{\"data-collections\": [\"mydb.large_table\"], \"type\": \"incremental\"}');\r\n\r\n-- 스냅샷 중단\r\nINSERT INTO debezium_signal (id, type, data) VALUES\r\n('ad-hoc-2', 'stop-snapshot',\r\n '{\"data-collections\": [\"mydb.large_table\"], \"type\": \"incremental\"}');\r\n```\r\n\r\n**함정 질문 - \"스냅샷 없이 시작할 수 있나요?\":**\r\n가능하지만 주의 필요:\r\n- `snapshot.mode = never`: binlog 위치 직접 지정 필요\r\n- `snapshot.mode = schema_only`: 스키마만 캡처, 기존 데이터 없음\r\n- 기존 데이터가 필요하면 스냅샷 필수",
    "references": [
      {
        "title": "Debezium Incremental Snapshots",
        "url": "https://debezium.io/documentation/reference/stable/configuration/signalling.html"
      }
    ]
  },
  {
    "id": "CDC-025",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "MySQL 데이터베이스 스키마 변경 시 Debezium은 어떻게 감지하고 대응하나요?",
    "answer": "**Debezium MySQL 스키마 변경 처리:**\r\n\r\n**1. 스키마 변경 감지 원리:**\r\n```\r\nMySQL Binlog에서 DDL 이벤트 캡처:\r\n  - CREATE TABLE\r\n  - ALTER TABLE\r\n  - DROP TABLE\r\n  - RENAME TABLE\r\n\r\n→ 스키마 히스토리 토픽에 저장\r\n→ 인메모리 스키마 모델 업데이트\r\n```\r\n\r\n**2. 스키마 히스토리 토픽:**\r\n```json\r\n// 스키마 변경 이벤트\r\n{\r\n  \"source\": {\r\n    \"server\": \"dbserver1\"\r\n  },\r\n  \"position\": {\r\n    \"file\": \"mysql-bin.000003\",\r\n    \"pos\": 12345,\r\n    \"gtid\": \"xxx:100\"\r\n  },\r\n  \"databaseName\": \"inventory\",\r\n  \"ddl\": \"ALTER TABLE products ADD COLUMN weight DECIMAL(10,2) DEFAULT 0\",\r\n  \"tableChanges\": [\r\n    {\r\n      \"type\": \"ALTER\",\r\n      \"id\": \"inventory.products\",\r\n      \"table\": {\r\n        \"columns\": [...]\r\n      }\r\n    }\r\n  ]\r\n}\r\n```\r\n\r\n**3. 변경 유형별 대응:**\r\n\r\n| 변경 유형 | Debezium 동작 | 주의사항 |\r\n|----------|--------------|---------|\r\n| **컬럼 추가** | 자동 반영 | 새 컬럼 포함된 이벤트 발행 |\r\n| **컬럼 삭제** | 자동 반영 | 이전 이벤트와 구조 다름 |\r\n| **컬럼 타입 변경** | 자동 반영 | Consumer 영향 가능 |\r\n| **테이블 삭제** | 이벤트 중단 | 관련 토픽 처리 필요 |\r\n| **테이블 이름 변경** | 새 토픽 생성 | 라우팅 설정 필요 |\r\n\r\n**4. 스키마 레지스트리와 호환성:**\r\n```json\r\n{\r\n  \"key.converter\": \"io.confluent.connect.avro.AvroConverter\",\r\n  \"value.converter\": \"io.confluent.connect.avro.AvroConverter\",\r\n  \"value.converter.schema.registry.url\": \"http://schema-registry:8081\"\r\n}\r\n```\r\n\r\n**호환성 규칙:**\r\n| 호환성 모드 | 허용 변경 |\r\n|------------|----------|\r\n| BACKWARD | 컬럼 삭제, 기본값 있는 추가 |\r\n| FORWARD | 컬럼 추가 |\r\n| FULL | 기본값 있는 추가만 |\r\n| NONE | 모든 변경 허용 (주의) |\r\n\r\n**5. 문제 시나리오와 해결:**\r\n\r\n**시나리오 1: 비호환 스키마 변경**\r\n```\r\n문제: ALTER TABLE products MODIFY price VARCHAR(50);  -- INT → VARCHAR\r\n해결: Schema Registry 호환성 우회 또는 새 토픽 사용\r\n```\r\n\r\n**시나리오 2: 스키마 히스토리 손상**\r\n```json\r\n{\r\n  \"snapshot.mode\": \"schema_only_recovery\"\r\n}\r\n// 현재 스키마로 히스토리 재구축\r\n```\r\n\r\n**시나리오 3: 과거 스키마 필요**\r\n```\r\n커넥터 재시작 시 과거 binlog 재생 필요\r\n→ 스키마 히스토리에서 해당 시점 스키마 조회\r\n→ 올바른 스키마로 이벤트 파싱\r\n```\r\n\r\n**6. DDL 이벤트 발행 (선택):**\r\n```json\r\n{\r\n  \"include.schema.changes\": \"true\"\r\n}\r\n// 별도 토픽으로 DDL 이벤트 발행\r\n// 토픽: dbserver1 (서버 이름)\r\n```\r\n\r\n**트레이드오프 - 스키마 관리 전략:**\r\n\r\n| 전략 | 장점 | 단점 |\r\n|------|------|------|\r\n| **자동 진화** | 간편 | 비호환 변경 시 문제 |\r\n| **버전 관리** | 명시적 제어 | 운영 복잡 |\r\n| **토픽 분리** | 격리 | 마이그레이션 필요 |\r\n\r\n**함정 질문 - \"DDL 변경이 바로 반영되나요?\":**\r\nbinlog에 기록된 후 반영됩니다:\r\n- DDL 문 실행 → binlog 기록 → Debezium 캡처\r\n- 약간의 지연 존재\r\n- DDL 직후 DML은 올바른 스키마로 처리됨\r\n\r\n**운영 권장사항:**\r\n- [ ] DDL 변경 전 Consumer 영향 분석\r\n- [ ] Schema Registry 호환성 모드 설정\r\n- [ ] 스키마 히스토리 토픽 백업\r\n- [ ] DDL 변경 알림 설정",
    "references": [
      {
        "title": "Debezium Schema History",
        "url": "https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-schema-history-topic"
      }
    ]
  },
  {
    "id": "CDC-026",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium CDC 도입 프로젝트에서 발생할 수 있는 장애와 이를 예방하기 위한 모범 사례는 무엇인가요?",
    "answer": "**Debezium CDC 장애 유형과 예방:**\r\n\r\n**1. 연결 관련 장애:**\r\n\r\n| 장애 | 원인 | 예방 방법 |\r\n|------|------|----------|\r\n| MySQL 연결 끊김 | 네트워크, 서버 재시작 | 자동 재연결, 타임아웃 설정 |\r\n| 인증 실패 | 비밀번호 변경, 권한 변경 | 모니터링, 알림 |\r\n| Kafka 연결 실패 | 브로커 장애 | 클러스터 구성, 재시도 |\r\n\r\n```json\r\n{\r\n  \"database.connectionTimeZone\": \"UTC\",\r\n  \"database.connection.timeout.ms\": 30000,\r\n  \"connect.keep.alive\": \"true\",\r\n  \"connect.keep.alive.interval.ms\": 60000\r\n}\r\n```\r\n\r\n**2. Binlog 관련 장애:**\r\n\r\n| 장애 | 원인 | 예방 방법 |\r\n|------|------|----------|\r\n| Binlog 만료 | 보관 기간 초과 | 충분한 expire_logs_days |\r\n| Binlog 누락 | GTID 미사용 | GTID 활성화 |\r\n| 위치 추적 실패 | 오프셋 손상 | 정기 백업 |\r\n\r\n```ini\r\n# MySQL 설정\r\nexpire_logs_days = 7\r\ngtid_mode = ON\r\nenforce_gtid_consistency = ON\r\n```\r\n\r\n**3. 스냅샷 장애:**\r\n\r\n| 장애 | 원인 | 예방 방법 |\r\n|------|------|----------|\r\n| OOM | 대용량 테이블 | fetch.size 조정 |\r\n| 타임아웃 | 긴 스냅샷 시간 | Incremental Snapshot |\r\n| 락 충돌 | 프로덕션 쓰기 차단 | minimal locking |\r\n\r\n**4. 스키마 변경 장애:**\r\n\r\n| 장애 | 원인 | 예방 방법 |\r\n|------|------|----------|\r\n| Consumer 오류 | 비호환 변경 | Schema Registry |\r\n| 파싱 실패 | 스키마 히스토리 손상 | 백업, recovery 모드 |\r\n\r\n**5. 장애 대응 체크리스트:**\r\n```\r\n□ 연결 상태 모니터링 (JMX: Connected)\r\n□ 지연 모니터링 (MilliSecondsBehindSource)\r\n□ 오프셋 정기 백업\r\n□ 스키마 히스토리 백업\r\n□ Consumer Lag 모니터링\r\n□ Dead Letter Queue 설정\r\n□ 알림 규칙 설정\r\n```\r\n\r\n**6. 고가용성 구성:**\r\n```\r\n┌────────────────────────────────────────────────────────────┐\r\n│                   프로덕션 아키텍처                         │\r\n│                                                            │\r\n│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐     │\r\n│  │  MySQL   │    │  Kafka       │    │  Kafka       │     │\r\n│  │  Primary │    │  Connect     │    │  Cluster     │     │\r\n│  │          │    │  (분산 모드)  │    │  (3+ 브로커) │     │\r\n│  └──────────┘    └──────────────┘    └──────────────┘     │\r\n│       │                │                    │              │\r\n│  ┌──────────┐    ┌──────────────┐                         │\r\n│  │  MySQL   │    │  Kafka       │    (자동 페일오버)       │\r\n│  │  Replica │    │  Connect     │                         │\r\n│  │  (대기)  │    │  Worker 2    │                         │\r\n│  └──────────┘    └──────────────┘                         │\r\n└────────────────────────────────────────────────────────────┘\r\n```\r\n\r\n**7. 모범 사례:**\r\n\r\n```\r\n설계 단계:\r\n□ 충분한 binlog 보관 기간 설정\r\n□ GTID 활성화\r\n□ 분산 모드 Kafka Connect 사용\r\n□ 멱등성 Consumer 설계\r\n\r\n운영 단계:\r\n□ 자동화된 모니터링/알림\r\n□ 정기 백업 (오프셋, 스키마 히스토리)\r\n□ 장애 복구 절차 문서화\r\n□ 정기 DR 훈련\r\n```\r\n\r\n**함정 질문 - \"Debezium만 모니터링하면 되나요?\":**\r\n아닙니다. 전체 파이프라인 모니터링 필요:\r\n- MySQL (복제 지연, binlog)\r\n- Debezium (연결, 지연)\r\n- Kafka (브로커 상태, 토픽)\r\n- Consumer (Lag, 처리율)\r\n- Target (ES 등 - 인덱싱 상태)",
    "references": [
      {
        "title": "Debezium Operations Guide",
        "url": "https://debezium.io/documentation/reference/stable/operations/index.html"
      }
    ]
  },
  {
    "id": "CDC-027",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium 커넥터를 구성하기 위한 최소 요구 사항과 권장 설정은 무엇인가요?",
    "answer": "**Debezium MySQL 커넥터 요구 사항:**\r\n\r\n**1. MySQL 서버 요구 사항:**\r\n\r\n| 항목 | 최소 | 권장 |\r\n|------|------|------|\r\n| MySQL 버전 | 5.6+ | 8.0+ |\r\n| Binlog 형식 | ROW | ROW |\r\n| Binlog Row Image | FULL | FULL |\r\n| GTID | 선택 | ON (권장) |\r\n\r\n```ini\r\n# my.cnf 필수 설정\r\n[mysqld]\r\nserver-id = 1\r\nlog_bin = mysql-bin\r\nbinlog_format = ROW\r\nbinlog_row_image = FULL\r\n\r\n# 권장 설정\r\ngtid_mode = ON\r\nenforce_gtid_consistency = ON\r\nexpire_logs_days = 3\r\n```\r\n\r\n**2. 사용자 권한:**\r\n```sql\r\n-- 최소 권한\r\nCREATE USER 'debezium'@'%' IDENTIFIED BY 'password';\r\nGRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'debezium'@'%';\r\n\r\n-- 스냅샷 락 사용 시 추가\r\nGRANT LOCK TABLES ON mydb.* TO 'debezium'@'%';\r\n\r\n-- 스키마 변경 DDL 캡처 시\r\nGRANT SUPER ON *.* TO 'debezium'@'%';  -- MySQL 5.x\r\n-- 또는\r\nGRANT FLUSH_TABLES ON *.* TO 'debezium'@'%';  -- MySQL 8.0+\r\n```\r\n\r\n**3. Kafka Connect 요구 사항:**\r\n\r\n| 항목 | 최소 | 권장 |\r\n|------|------|------|\r\n| Java | 11+ | 17+ |\r\n| Kafka | 2.0+ | 3.0+ |\r\n| 메모리 | 1GB | 4GB+ |\r\n| CPU | 1 코어 | 2+ 코어 |\r\n\r\n**4. 최소 커넥터 설정:**\r\n```json\r\n{\r\n  \"name\": \"mysql-connector\",\r\n  \"config\": {\r\n    \"connector.class\": \"io.debezium.connector.mysql.MySqlConnector\",\r\n    \"tasks.max\": \"1\",\r\n    \"database.hostname\": \"mysql-host\",\r\n    \"database.port\": \"3306\",\r\n    \"database.user\": \"debezium\",\r\n    \"database.password\": \"password\",\r\n    \"database.server.id\": \"1\",\r\n    \"topic.prefix\": \"dbserver1\",\r\n    \"database.include.list\": \"mydb\",\r\n    \"schema.history.internal.kafka.bootstrap.servers\": \"kafka:9092\",\r\n    \"schema.history.internal.kafka.topic\": \"schema-history.dbserver1\"\r\n  }\r\n}\r\n```\r\n\r\n**5. 권장 추가 설정:**\r\n```json\r\n{\r\n  // 스냅샷 설정\r\n  \"snapshot.mode\": \"initial\",\r\n  \"snapshot.locking.mode\": \"minimal\",\r\n\r\n  // 성능 설정\r\n  \"max.batch.size\": 2048,\r\n  \"max.queue.size\": 8192,\r\n\r\n  // 안정성 설정\r\n  \"heartbeat.interval.ms\": 10000,\r\n  \"database.history.kafka.recovery.attempts\": 4,\r\n\r\n  // 모니터링\r\n  \"provide.transaction.metadata\": \"true\",\r\n\r\n  // 컨버터\r\n  \"key.converter\": \"org.apache.kafka.connect.json.JsonConverter\",\r\n  \"value.converter\": \"org.apache.kafka.connect.json.JsonConverter\"\r\n}\r\n```\r\n\r\n**6. 네트워크 요구 사항:**\r\n\r\n| 연결 | 포트 | 용도 |\r\n|------|------|------|\r\n| MySQL | 3306 | 데이터베이스 연결 |\r\n| Kafka | 9092 | 메시지 발행 |\r\n| Schema Registry | 8081 | 스키마 관리 (선택) |\r\n\r\n**7. 토픽 설정:**\r\n```bash\r\n# 사전 생성 권장\r\nkafka-topics.sh --create --topic dbserver1.mydb.users \\\r\n  --partitions 6 --replication-factor 3\r\n\r\nkafka-topics.sh --create --topic schema-history.dbserver1 \\\r\n  --partitions 1 --replication-factor 3 \\\r\n  --config cleanup.policy=delete \\\r\n  --config retention.ms=-1\r\n```\r\n\r\n**트레이드오프 - 리소스 할당:**\r\n\r\n| 워크로드 | 메모리 | 코어 | 비고 |\r\n|----------|--------|------|------|\r\n| 소규모 (< 100 TPS) | 2GB | 1 | 개발/테스트 |\r\n| 중규모 (< 1000 TPS) | 4GB | 2 | 소규모 프로덕션 |\r\n| 대규모 (> 1000 TPS) | 8GB+ | 4+ | 대규모 프로덕션 |\r\n\r\n**함정 질문 - \"ROW 형식 대신 MIXED 써도 되나요?\":**\r\n**안 됩니다.** Debezium은 ROW 형식만 지원:\r\n- STATEMENT: SQL 문만 기록 → 실제 데이터 없음\r\n- MIXED: 일부 STATEMENT → 일부 이벤트 캡처 불가\r\n- ROW: 모든 변경 데이터 포함 → 필수",
    "references": [
      {
        "title": "Debezium MySQL Prerequisites",
        "url": "https://debezium.io/documentation/reference/stable/connectors/mysql.html#setting-up-mysql"
      }
    ]
  },
  {
    "id": "CDC-028",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium의 메시지 처리 방식과 실패 시 offset 기반 재처리 메커니즘에 대해 설명해주세요.",
    "answer": "**Debezium 재처리 메커니즘:**\r\n\r\n**1. 오프셋 기반 재처리:**\r\n```\r\n정상 처리 흐름:\r\n  Binlog 읽기 → 이벤트 생성 → Kafka 발행 → 오프셋 커밋\r\n\r\n장애 발생 시:\r\n  Binlog 읽기 → 이벤트 생성 → (장애) → 오프셋 커밋 X\r\n\r\n재시작:\r\n  마지막 커밋된 오프셋부터 재개 → 중복 발생 가능\r\n```\r\n\r\n**2. 재처리 시나리오:**\r\n\r\n| 시나리오 | 재처리 범위 | 영향 |\r\n|---------|------------|------|\r\n| 커넥터 재시작 | 마지막 오프셋 이후 | 최소 중복 |\r\n| Binlog 만료 | 전체 스냅샷 | 대량 재처리 |\r\n| 스키마 히스토리 손상 | 스키마 복구 후 | 설정에 따라 다름 |\r\n\r\n**3. 수동 오프셋 조정:**\r\n```bash\r\n# 현재 오프셋 확인\r\nkafka-console-consumer.sh --bootstrap-server kafka:9092 \\\r\n  --topic connect-offsets --from-beginning \\\r\n  --property print.key=true\r\n\r\n# 오프셋 수동 설정 (주의 필요!)\r\necho '[\"mysql-connector\",{\"server\":\"dbserver1\"}]|{\"file\":\"mysql-bin.000005\",\"pos\":1000}' | \\\r\n  kafka-console-producer.sh --bootstrap-server kafka:9092 \\\r\n  --topic connect-offsets \\\r\n  --property \"parse.key=true\" \\\r\n  --property \"key.separator=|\"\r\n```\r\n\r\n**4. Ad-hoc 스냅샷 (재처리):**\r\n```sql\r\n-- 특정 테이블 재스냅샷 (Debezium 1.6+)\r\nINSERT INTO debezium_signal (id, type, data) VALUES\r\n('resync-1', 'execute-snapshot',\r\n '{\"data-collections\": [\"mydb.users\"], \"type\": \"incremental\"}');\r\n```\r\n\r\n**5. 전체 재동기화:**\r\n```bash\r\n# 1. 커넥터 삭제\r\ncurl -X DELETE http://connect:8083/connectors/mysql-connector\r\n\r\n# 2. 오프셋 삭제 (토픽에서 해당 커넥터 오프셋 tombstone 발행)\r\n# 또는 새 connector name 사용\r\n\r\n# 3. 커넥터 재생성 (initial 스냅샷)\r\ncurl -X POST http://connect:8083/connectors \\\r\n  -H \"Content-Type: application/json\" \\\r\n  -d @connector-config.json\r\n```\r\n\r\n**6. Consumer 측 재처리:**\r\n```bash\r\n# Consumer Group 오프셋 리셋\r\nkafka-consumer-groups.sh --bootstrap-server kafka:9092 \\\r\n  --group my-consumer --reset-offsets \\\r\n  --topic dbserver1.mydb.users --to-earliest --execute\r\n```\r\n\r\n**7. 재처리 전략:**\r\n\r\n| 전략 | 방법 | 사용 시나리오 |\r\n|------|------|--------------|\r\n| **부분 재처리** | 오프셋 조정 | 특정 시점 이후 |\r\n| **테이블 재동기화** | Incremental Snapshot | 특정 테이블만 |\r\n| **전체 재동기화** | 커넥터 재생성 | 심각한 불일치 |\r\n\r\n**트레이드오프 - 재처리 방식:**\r\n\r\n| 방식 | 장점 | 단점 |\r\n|------|------|------|\r\n| **오프셋 조정** | 빠름, 부분적 | 정확한 위치 찾기 어려움 |\r\n| **Incremental Snapshot** | 유연, 안전 | 설정 필요 |\r\n| **전체 재시작** | 확실함 | 시간 소요 |\r\n\r\n**8. 재처리 시 주의사항:**\r\n```\r\n□ Consumer 멱등성 확인 (중복 처리 대비)\r\n□ 대상 시스템 부하 고려\r\n□ 처리 순서 의존성 확인\r\n□ 재처리 범위 최소화\r\n```\r\n\r\n**함정 질문 - \"오프셋만 조정하면 재처리 가능한가요?\":**\r\n스키마 히스토리도 고려해야 합니다:\r\n- 과거 오프셋으로 돌아가면 해당 시점의 스키마 필요\r\n- 스키마 히스토리에 해당 시점 정보가 있어야 함\r\n- 없으면 스키마 불일치로 파싱 실패\r\n\r\n**운영 권장사항:**\r\n- [ ] 정기적 오프셋 백업\r\n- [ ] 스키마 히스토리 백업\r\n- [ ] Incremental Snapshot 설정\r\n- [ ] 재처리 절차 문서화",
    "references": [
      {
        "title": "Debezium Incremental Snapshots",
        "url": "https://debezium.io/documentation/reference/stable/configuration/signalling.html"
      }
    ]
  },
  {
    "id": "CDC-029",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium을 통해 Elasticsearch에 데이터를 동기화할 때 인덱싱 성능을 최적화하는 방법은 무엇인가요?",
    "answer": "**Debezium → Elasticsearch 인덱싱 최적화:**\r\n\r\n**1. Kafka Connect ES Sink 설정:**\r\n```json\r\n{\r\n  \"name\": \"es-sink-connector\",\r\n  \"config\": {\r\n    \"connector.class\": \"io.confluent.connect.elasticsearch.ElasticsearchSinkConnector\",\r\n    \"topics\": \"dbserver1.mydb.users\",\r\n    \"connection.url\": \"http://elasticsearch:9200\",\r\n\r\n    // 배치 설정\r\n    \"batch.size\": 2000,\r\n    \"linger.ms\": 100,\r\n    \"max.buffered.records\": 20000,\r\n    \"flush.timeout.ms\": 180000,\r\n\r\n    // 병렬 처리\r\n    \"max.in.flight.requests\": 5,\r\n    \"tasks.max\": 4,\r\n\r\n    // 재시도 설정\r\n    \"max.retries\": 5,\r\n    \"retry.backoff.ms\": 100\r\n  }\r\n}\r\n```\r\n\r\n**2. Elasticsearch 인덱스 설정:**\r\n```json\r\nPUT /products\r\n{\r\n  \"settings\": {\r\n    \"index\": {\r\n      \"refresh_interval\": \"5s\",      // 기본 1s → 늘림\r\n      \"number_of_replicas\": 0,       // 초기 로드 시 0\r\n      \"translog.durability\": \"async\",\r\n      \"translog.sync_interval\": \"5s\"\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**3. 최적화 영역별 설정:**\r\n\r\n| 영역 | 설정 | 효과 |\r\n|------|------|------|\r\n| **배치 크기** | batch.size 증가 | Bulk API 효율 |\r\n| **지연 시간** | linger.ms 증가 | 배치 채움 |\r\n| **Refresh** | refresh_interval 증가 | 세그먼트 생성 감소 |\r\n| **Replica** | 초기 로드 시 0 | 복제 오버헤드 제거 |\r\n| **Translog** | async 모드 | fsync 감소 |\r\n\r\n**4. 인덱싱 성능 비교:**\r\n```\r\n설정 전: ~500 docs/sec\r\n  ↓\r\n배치 최적화: ~2,000 docs/sec\r\n  ↓\r\nRefresh 조정: ~5,000 docs/sec\r\n  ↓\r\nReplica 0: ~10,000 docs/sec\r\n```\r\n\r\n**5. 스냅샷 시 최적화:**\r\n```bash\r\n# 1. 스냅샷 전 인덱스 설정\r\nPUT /products/_settings\r\n{\r\n  \"index\": {\r\n    \"refresh_interval\": \"-1\",\r\n    \"number_of_replicas\": 0\r\n  }\r\n}\r\n\r\n# 2. 스냅샷 데이터 인덱싱\r\n# (Debezium → Kafka → ES Sink)\r\n\r\n# 3. 스냅샷 후 설정 복원\r\nPUT /products/_settings\r\n{\r\n  \"index\": {\r\n    \"refresh_interval\": \"1s\",\r\n    \"number_of_replicas\": 1\r\n  }\r\n}\r\n\r\n# 4. Force merge (선택)\r\nPOST /products/_forcemerge?max_num_segments=1\r\n```\r\n\r\n**6. 트레이드오프:**\r\n\r\n| 최적화 | 이점 | 비용 |\r\n|--------|------|------|\r\n| **Refresh 증가** | 처리량 증가 | 검색 지연 |\r\n| **Replica 0** | 쓰기 2배 빠름 | 내구성 감소 |\r\n| **Translog async** | 쓰기 빠름 | 데이터 유실 위험 |\r\n| **Batch 증가** | 효율성 | 메모리 사용 |\r\n\r\n**7. 모니터링 메트릭:**\r\n```\r\n# Elasticsearch\r\nindexing_rate: 인덱싱 속도\r\nrefresh_time: Refresh 시간\r\nmerge_time: Segment merge 시간\r\ngc_time: GC 시간\r\n\r\n# Kafka Consumer\r\nconsumer_lag: 처리 지연\r\nrecords_consumed_rate: 소비 속도\r\n```\r\n\r\n**8. 문서 구조 최적화:**\r\n```json\r\n// Debezium → ES 변환 (SMT)\r\n{\r\n  \"transforms\": \"unwrap,flatten\",\r\n  \"transforms.unwrap.type\": \"io.debezium.transforms.ExtractNewRecordState\",\r\n  \"transforms.flatten.type\": \"org.apache.kafka.connect.transforms.Flatten$Value\",\r\n  \"transforms.flatten.delimiter\": \"_\"\r\n}\r\n```\r\n\r\n**함정 질문 - \"배치 크기를 무한정 늘리면 좋은가요?\":**\r\n아닙니다:\r\n- 너무 큰 배치: 메모리 부족, 타임아웃\r\n- ES Bulk API 권장: 5-15MB\r\n- 문서 크기에 따라 batch.size 조정\r\n\r\n**운영 권장사항:**\r\n- [ ] 초기 로드 vs 스트리밍 설정 분리\r\n- [ ] Refresh interval 워크로드에 맞게 조정\r\n- [ ] 인덱싱 속도 모니터링\r\n- [ ] Bulk 실패 시 DLQ 설정",
    "references": [
      {
        "title": "Elasticsearch Indexing Speed",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-indexing-speed.html"
      },
      {
        "title": "Confluent ES Connector Config",
        "url": "https://docs.confluent.io/kafka-connectors/elasticsearch/current/configuration_options.html"
      }
    ]
  },
  {
    "id": "CDC-030",
    "category": "debezium",
    "categoryName": "CDC/Debezium",
    "section": "infra",
    "question": "Debezium을 활용한 MySQL-Elasticsearch 연동 프로젝트에서 겪은 경험과 주요 교훈에 대해 공유해주세요.",
    "answer": "**Debezium MySQL-ES 프로젝트 경험과 교훈:**\r\n\r\n**1. 프로젝트 개요 (예시 시나리오):**\r\n```\r\n요구사항: 상품 데이터 실시간 검색\r\n- MySQL: 원본 데이터 (products, categories, inventory)\r\n- Elasticsearch: 검색 인덱스\r\n- 목표: Near Real-time 동기화 (< 3초)\r\n```\r\n\r\n**2. 주요 문제와 해결:**\r\n\r\n**문제 1: 초기 스냅샷 너무 오래 걸림**\r\n```\r\n상황: 1억 건 테이블 스냅샷 → 12시간 소요\r\n원인: 전체 테이블 락, 단일 스레드\r\n\r\n해결:\r\n- Incremental Snapshot 도입 (Debezium 1.6+)\r\n- snapshot.fetch.size 조정 (10240 → 5000)\r\n- 비즈니스 시간 외 수행\r\n```\r\n\r\n**문제 2: Binlog 만료로 커넥터 실패**\r\n```\r\n상황: 주말 후 커넥터 재시작 → binlog 없음\r\n원인: expire_logs_days = 1\r\n\r\n해결:\r\n- expire_logs_days = 7 (스냅샷 시간 * 2)\r\n- snapshot.mode = when_needed\r\n- 모니터링 알림 추가\r\n```\r\n\r\n**문제 3: 스키마 변경 후 Consumer 오류**\r\n```\r\n상황: ALTER TABLE ADD COLUMN → ES Sink 실패\r\n원인: 새 필드가 매핑에 없음\r\n\r\n해결:\r\n- Schema Registry 도입\r\n- ES 매핑 사전 정의 + dynamic: true (신규 필드)\r\n- DDL 변경 프로세스 수립\r\n```\r\n\r\n**문제 4: 데이터 불일치**\r\n```\r\n상황: MySQL 100만 건, ES 99.8만 건\r\n원인: 중복 처리 시 일부 누락, DELETE 처리 오류\r\n\r\n해결:\r\n- 정기 카운트 비교 스크립트\r\n- Consumer 멱등성 강화\r\n- DELETE 이벤트 처리 로직 수정\r\n```\r\n\r\n**3. 아키텍처 발전:**\r\n```\r\nv1 (초기):\r\n  MySQL → Debezium → Kafka → ES Sink → ES\r\n  문제: 단순하지만 변환 제한\r\n\r\nv2 (개선):\r\n  MySQL → Debezium → Kafka → Kafka Streams → Kafka → ES Sink → ES\r\n  장점: 복잡한 변환 가능, 조인 처리\r\n\r\nv3 (현재):\r\n  MySQL → Debezium → Kafka → [SMT 변환] → ES Sink → ES\r\n                         → [별도 Consumer] → 알림 서비스\r\n  장점: SMT로 대부분 처리, 필요시 별도 Consumer\r\n```\r\n\r\n**4. 교훈 정리:**\r\n\r\n| 영역 | 교훈 |\r\n|------|------|\r\n| **설계** | 처음부터 멱등성 고려, 스키마 관리 계획 |\r\n| **운영** | 모니터링 필수, 백업 자동화 |\r\n| **스냅샷** | 대용량 테이블은 Incremental 필수 |\r\n| **스키마** | 변경 전 영향도 분석, Registry 사용 |\r\n| **테스트** | 장애 시나리오 테스트 중요 |\r\n\r\n**5. 성능 결과:**\r\n```\r\nBefore (쿼리 기반 동기화):\r\n- 동기화 지연: 5-15분\r\n- DB 부하: 높음 (주기적 SELECT)\r\n- 누락: DELETE 감지 불가\r\n\r\nAfter (Debezium CDC):\r\n- 동기화 지연: 1-3초\r\n- DB 부하: 낮음 (binlog만 읽음)\r\n- 누락: 없음 (DELETE 포함)\r\n```\r\n\r\n**6. 체크리스트 (프로젝트 시작 시):**\r\n```\r\n□ MySQL binlog 설정 확인 (ROW, FULL)\r\n□ GTID 활성화 여부\r\n□ 테이블 크기 및 스냅샷 전략\r\n□ 스키마 변경 빈도 및 관리 방안\r\n□ 목표 지연 시간 정의\r\n□ 장애 복구 절차 수립\r\n□ 모니터링/알림 설계\r\n```\r\n\r\n**함정 질문 - \"CDC가 모든 동기화 문제를 해결하나요?\":**\r\n아닙니다. 여전히 고려할 점이 있습니다:\r\n- 참조 무결성 (FK 관계)\r\n- 집계/조인 데이터\r\n- 최종 일관성 수용\r\n- Consumer 장애 처리",
    "references": [
      {
        "title": "Debezium Best Practices",
        "url": "https://debezium.io/documentation/reference/stable/operations/index.html"
      },
      {
        "title": "Debezium FAQ",
        "url": "https://debezium.io/documentation/faq/"
      }
    ]
  },
  {
    "id": "KAFKA-001",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka의 기본 아키텍처와 주요 컴포넌트(Producer, Broker, Consumer, Topic 등)에 대해 설명해주세요.",
    "answer": "Kafka는 분산 스트리밍 플랫폼으로, 다음과 같은 주요 컴포넌트로 구성됩니다:\r\n\r\n- **Producer**: 메시지를 생성하여 Topic에 발행하는 클라이언트\r\n- **Broker**: 메시지를 저장하고 관리하는 Kafka 서버. 클러스터는 여러 Broker로 구성됨\r\n- **Consumer**: Topic에서 메시지를 읽어 처리하는 클라이언트\r\n- **Topic**: 메시지가 저장되는 논리적 채널. 카테고리 또는 피드 이름과 유사\r\n- **Partition**: Topic을 물리적으로 분할한 단위. 병렬 처리와 확장성을 제공\r\n- **ZooKeeper/KRaft**: 클러스터 메타데이터 관리 및 Controller 선출 담당 (KRaft는 Kafka 3.3+에서 프로덕션 사용 가능, 4.0에서 ZooKeeper 제거 예정)\r\n\r\n메시지 흐름: Producer → Broker(Topic/Partition) → Consumer\r\n\r\n**핵심 설계 원칙**\r\n- 메시지는 파티션에 순차적으로 추가되는 불변 로그(immutable log) 형태로 저장\r\n- Consumer는 Pull 방식으로 메시지를 가져옴 (Broker가 Push하지 않음)",
    "references": [
      {
        "title": "Apache Kafka Documentation",
        "url": "https://kafka.apache.org/documentation/#gettingStarted"
      }
    ]
  },
  {
    "id": "KAFKA-002",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka 아키텍처에서 Broker의 역할과 주요 기능은 무엇인가요?",
    "answer": "Kafka Broker는 Kafka 클러스터의 핵심 서버로, 다음과 같은 역할을 수행합니다:\r\n\r\n- **메시지 저장**: Producer로부터 받은 메시지를 디스크에 영구 저장\r\n- **메시지 전달**: Consumer 요청 시 저장된 메시지를 전달\r\n- **파티션 관리**: 각 파티션의 리더 또는 팔로워 역할 수행\r\n- **복제 관리**: 데이터 복제를 통한 내결함성 보장\r\n- **클라이언트 요청 처리**: Producer/Consumer의 메타데이터 요청 처리\r\n\r\nBroker는 Controller로 선출되어 파티션 리더 선출, 브로커 장애 감지 등 클러스터 관리 작업을 수행할 수 있습니다.",
    "references": [
      {
        "title": "Apache Kafka Documentation - Design",
        "url": "https://kafka.apache.org/documentation/#design"
      }
    ]
  },
  {
    "id": "KAFKA-003",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka에서 Producer와 Consumer의 차이점 및 역할에 대해 설명해 주세요.",
    "answer": "**Producer (생산자)**\r\n- 메시지를 생성하여 Kafka Topic에 발행\r\n- 파티션 선택 전략 결정 (라운드 로빈, 키 기반 해싱 등)\r\n- 배치 전송, 압축, 재시도 등 설정 가능\r\n- ACK 설정으로 전송 신뢰성 조절\r\n\r\n**Consumer (소비자)**\r\n- Topic에서 메시지를 구독하고 처리\r\n- Offset을 관리하여 처리 위치 추적\r\n- Consumer Group에 속하여 병렬 처리 가능\r\n- Pull 방식으로 메시지를 가져옴 (Consumer가 능동적으로 요청)\r\n\r\n**핵심 차이점**: Producer는 데이터를 밀어넣고(push), Consumer는 데이터를 당겨옴(pull)",
    "references": [
      {
        "title": "Apache Kafka Documentation - Producers",
        "url": "https://kafka.apache.org/documentation/#theproducer"
      }
    ]
  },
  {
    "id": "KAFKA-004",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka에서 Partition과 Offset의 개념 및 활용 방법은 무엇인가요?",
    "answer": "**Partition (파티션)**\r\n- Topic을 물리적으로 분할한 단위\r\n- 각 파티션은 순서가 보장된 불변의 메시지 시퀀스\r\n- 병렬 처리의 기본 단위 (파티션 수 = 최대 Consumer 병렬성)\r\n- 파티션 키를 통해 관련 메시지를 같은 파티션에 저장 가능\r\n\r\n**Offset (오프셋)**\r\n- 파티션 내 각 메시지의 고유 식별자 (순차 증가하는 정수)\r\n- Consumer가 어디까지 읽었는지 추적하는 위치 표시\r\n- 자동/수동 커밋을 통해 관리\r\n- `__consumer_offsets` 토픽에 저장됨\r\n\r\n**활용**: 파티션 수를 늘려 처리량 확장, Offset을 조절하여 메시지 재처리 가능",
    "references": [
      {
        "title": "Apache Kafka Documentation - Topics and Logs",
        "url": "https://kafka.apache.org/documentation/#intro_topics"
      }
    ]
  },
  {
    "id": "KAFKA-005",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka의 메시지 보존 정책(retention policy)은 어떻게 작동하나요?",
    "answer": "Kafka는 두 가지 메시지 보존 정책을 제공합니다:\r\n\r\n**시간 기반 보존 (Time-based)**\r\n- `log.retention.hours/minutes/ms`: 메시지 보존 기간 설정\r\n- 기본값: 7일 (168시간)\r\n- 설정된 시간이 지나면 자동 삭제\r\n\r\n**크기 기반 보존 (Size-based)**\r\n- `log.retention.bytes`: 파티션당 최대 로그 크기\r\n- 크기 초과 시 오래된 세그먼트부터 삭제\r\n\r\n**세그먼트 관리**\r\n- `log.segment.bytes`: 세그먼트 파일 크기 (기본 1GB)\r\n- `log.segment.ms`: 세그먼트 롤링 주기\r\n- 삭제는 세그먼트 단위로 수행됨\r\n\r\n두 정책 모두 설정 시, 먼저 도달하는 조건에 따라 삭제됩니다.",
    "references": [
      {
        "title": "Apache Kafka Documentation - Log Retention",
        "url": "https://kafka.apache.org/documentation/#brokerconfigs_log.retention.hours"
      }
    ]
  },
  {
    "id": "KAFKA-006",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka에서 Consumer Group의 개념과 이를 통해 메시지 병렬 처리를 어떻게 구현하는지 설명해주세요.",
    "answer": "**Consumer Group 개념**\r\n- 동일한 `group.id`를 공유하는 Consumer들의 논리적 그룹\r\n- 그룹 내 각 Consumer는 서로 다른 파티션을 담당\r\n- 하나의 파티션은 그룹 내 하나의 Consumer만 소비 가능\r\n\r\n**병렬 처리 구현**\r\n1. Topic의 파티션 수 설정 (예: 6개)\r\n2. Consumer Group 생성 후 여러 Consumer 추가\r\n3. Kafka가 자동으로 파티션을 Consumer에 분배 (Rebalancing)\r\n4. 각 Consumer가 할당된 파티션을 독립적으로 처리\r\n\r\n**주의사항**\r\n- Consumer 수 > 파티션 수일 경우, 유휴 Consumer 발생\r\n- 최적 병렬성: Consumer 수 = 파티션 수\r\n- 서로 다른 Consumer Group은 같은 메시지를 독립적으로 소비 가능\r\n\r\n**파티션 수 결정 시 트레이드오프**\r\n- 파티션 증가: 병렬성/처리량 향상, 하지만 브로커 메모리 사용량 증가, 리밸런스 시간 증가, 리더 선출 시간 증가\r\n- 파티션 감소: 운영 간소화, 하지만 병렬 처리 제한\r\n- 경험적 가이드라인: (목표 처리량) / (단일 파티션 처리량) 또는 (Consumer 인스턴스 수)의 배수로 설정\r\n- 파티션은 추가만 가능하고 삭제 불가능하므로 초기 설계 시 신중히 결정",
    "references": [
      {
        "title": "Apache Kafka Documentation - Consumer Groups",
        "url": "https://kafka.apache.org/documentation/#intro_consumers"
      }
    ]
  },
  {
    "id": "KAFKA-007",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka에서 리플리케이션(replication)의 필요성과 설정 방법은 무엇인가요?",
    "answer": "**리플리케이션의 필요성**\r\n- 브로커 장애 시 데이터 손실 방지\r\n- 고가용성(High Availability) 보장\r\n- 무중단 서비스 운영 가능\r\n\r\n**설정 방법**\r\n- `replication.factor`: 토픽 생성 시 복제본 수 지정 (권장: 3)\r\n- `default.replication.factor`: 기본 복제 계수 설정\r\n- `min.insync.replicas`: 최소 동기화 복제본 수 (권장: 2)\r\n\r\n**동작 방식**\r\n- 각 파티션에는 1개의 Leader와 N-1개의 Follower\r\n- Producer/Consumer는 기본적으로 Leader와 통신 (Kafka 2.4+에서는 `replica.selector.class` 설정으로 Follower 읽기 가능)\r\n- Follower는 Leader로부터 데이터를 복제 (Pull 방식)\r\n- Leader 장애 시 ISR 중 하나가 새 Leader로 선출\r\n\r\n**Follower Fetching (Kafka 2.4+)**\r\n- `replica.selector.class=org.apache.kafka.common.replica.RackAwareReplicaSelector` 설정으로 같은 랙의 복제본에서 읽기 가능\r\n- 지리적으로 분산된 클러스터에서 읽기 지연 시간 감소\r\n\r\n```bash\r\nkafka-topics.sh --create --topic my-topic \\\r\n  --partitions 3 --replication-factor 3\r\n```",
    "references": [
      {
        "title": "Apache Kafka Documentation - Replication",
        "url": "https://kafka.apache.org/documentation/#replication"
      }
    ]
  },
  {
    "id": "KAFKA-008",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka의 리플리케이션 구조에서 장애 복구(failover) 메커니즘은 어떻게 동작하나요?",
    "answer": "**Leader 선출 과정**\r\n1. Controller가 브로커 장애 감지 (ZooKeeper/KRaft 통해)\r\n2. 장애 브로커가 담당하던 파티션의 ISR 목록 확인\r\n3. ISR 중 하나를 새로운 Leader로 선출\r\n4. 메타데이터 업데이트 및 클라이언트에 전파\r\n\r\n**Failover 설정**\r\n- `unclean.leader.election.enable`: ISR 외 복제본의 리더 승격 허용 여부 (기본: false, Kafka 0.11+)\r\n- `leader.imbalance.check.interval.seconds`: 리더 재분배 주기\r\n- `controlled.shutdown.enable`: 정상 종료 시 리더 이전 여부\r\n\r\n**트레이드오프: unclean.leader.election.enable**\r\n- `false` (기본값, 권장): 데이터 일관성 우선. ISR이 모두 장애 시 파티션 불가용\r\n- `true`: 가용성 우선. 데이터 손실 가능하지만 서비스 중단 최소화\r\n- 결정 기준: 데이터 손실 vs 서비스 중단 중 어떤 것이 더 치명적인지에 따라 선택\r\n\r\n**클라이언트 복구**\r\n- Producer: 재시도 로직으로 새 Leader에 재전송\r\n- Consumer: 새 Leader로부터 이어서 소비\r\n\r\n**중요**: `unclean.leader.election.enable=true`는 데이터 손실 가능성이 있음\r\n- ISR 외의 복제본이 리더가 되면 복제되지 않은 메시지 손실\r\n- 가용성 vs 데이터 일관성의 트레이드오프에서 가용성을 선택하는 경우에만 활성화",
    "references": [
      {
        "title": "Apache Kafka Documentation - Leader Election",
        "url": "https://kafka.apache.org/documentation/#design_replicatedlog"
      }
    ]
  },
  {
    "id": "KAFKA-009",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka Connect의 역할과 이를 활용한 데이터 파이프라인 구축 방법은 무엇인가요?",
    "answer": "**Kafka Connect 역할**\r\n- 외부 시스템과 Kafka 간 데이터 스트리밍을 위한 프레임워크\r\n- 코드 작성 없이 설정만으로 데이터 파이프라인 구축\r\n- Source Connector: 외부 → Kafka로 데이터 수집\r\n- Sink Connector: Kafka → 외부로 데이터 전송\r\n\r\n**데이터 파이프라인 구축 방법**\r\n1. Connect 클러스터 설정 (standalone/distributed 모드)\r\n2. Connector 플러그인 설치 (JDBC, S3, Elasticsearch 등)\r\n3. Connector 설정 JSON 작성\r\n4. REST API로 Connector 배포\r\n\r\n```json\r\n{\r\n  \"name\": \"mysql-source\",\r\n  \"config\": {\r\n    \"connector.class\": \"io.confluent.connect.jdbc.JdbcSourceConnector\",\r\n    \"connection.url\": \"jdbc:mysql://localhost:3306/mydb\",\r\n    \"topic.prefix\": \"mysql-\",\r\n    \"poll.interval.ms\": \"1000\"\r\n  }\r\n}\r\n```",
    "references": [
      {
        "title": "Apache Kafka Documentation - Connect",
        "url": "https://kafka.apache.org/documentation/#connect"
      }
    ]
  },
  {
    "id": "KAFKA-010",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka 생태계의 스트림 처리 도구인 Kafka Streams와 KSQL의 차이점 및 각각의 사용 사례에 대해 설명해주세요.",
    "answer": "**Kafka Streams**\r\n- Java/Scala 라이브러리 (별도 클러스터 불필요)\r\n- 복잡한 스트림 처리 로직 구현 가능\r\n- 마이크로서비스에 내장하여 사용\r\n- 사용 사례: 실시간 데이터 변환, 집계, 조인\r\n\r\n**KSQL (ksqlDB)**\r\n- SQL 기반 스트리밍 쿼리 엔진\r\n- 별도의 KSQL 서버 클러스터 필요\r\n- 코드 없이 SQL만으로 스트림 처리\r\n- 사용 사례: 빠른 프로토타이핑, 데이터 분석, 간단한 ETL\r\n\r\n**주요 차이점**\r\n| 구분 | Kafka Streams | KSQL |\r\n|------|---------------|------|\r\n| 언어 | Java/Scala | SQL |\r\n| 배포 | 애플리케이션 내장 | 별도 클러스터 |\r\n| 복잡도 | 높은 유연성 | 낮은 진입 장벽 |\r\n| 적합 대상 | 개발자 | 데이터 분석가 |",
    "references": [
      {
        "title": "Apache Kafka Documentation - Streams",
        "url": "https://kafka.apache.org/documentation/streams/"
      }
    ]
  },
  {
    "id": "KAFKA-011",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka에서 Exactly-Once Semantics를 구현하는 방법에 대해 설명해주세요.",
    "answer": "**Exactly-Once Semantics (EOS) 구현 방법**\r\n\r\n**1. Idempotent Producer**\r\n- `enable.idempotence=true` 설정 (Kafka 3.0+에서는 기본값 true)\r\n- Producer ID와 시퀀스 번호로 중복 메시지 방지\r\n- 단일 파티션 내에서 exactly-once 보장\r\n- 요구사항: `acks=all`, `retries > 0`, `max.in.flight.requests.per.connection <= 5`\r\n\r\n**트레이드오프**: Exactly-once는 추가적인 메타데이터 교환과 트랜잭션 오버헤드로 인해 처리량이 약 3-20% 감소할 수 있음. 지연 시간에 민감하거나 처리량이 최우선인 경우 at-least-once + 멱등성 처리가 더 적합할 수 있음\r\n\r\n**2. Transactional API**\r\n- 여러 파티션에 걸친 원자적 쓰기\r\n- `transactional.id` 설정 필요\r\n```java\r\nproducer.initTransactions();\r\nproducer.beginTransaction();\r\nproducer.send(record1);\r\nproducer.send(record2);\r\nproducer.commitTransaction();\r\n```\r\n\r\n**3. Consumer 설정**\r\n- `isolation.level=read_committed`: 커밋된 트랜잭션만 읽기\r\n- 수동 오프셋 커밋으로 처리 완료 후 커밋\r\n\r\n**Kafka Streams**\r\n- `processing.guarantee=exactly_once_v2` 설정으로 자동 EOS 지원 (Kafka 2.5+에서 v2 권장, 이전 exactly_once는 deprecated)\r\n\r\n**주의사항**\r\n- Exactly-once는 Kafka 내부에서만 보장됨. 외부 시스템과의 연동 시에는 해당 시스템도 트랜잭션을 지원해야 완전한 EOS 달성 가능\r\n- Consumer의 `isolation.level=read_committed` 설정 필수",
    "references": [
      {
        "title": "Apache Kafka Documentation - Transactions",
        "url": "https://kafka.apache.org/documentation/#semantics"
      }
    ]
  },
  {
    "id": "KAFKA-012",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka Producer 측에서 발생할 수 있는 메시지 중복 문제를 Exactly-Once Semantics 관점에서 어떻게 해결할 수 있나요?",
    "answer": "**중복 발생 원인**\r\n- 네트워크 오류로 ACK 미수신 후 재전송\r\n- Producer 재시작 후 동일 메시지 재전송\r\n- 브로커 장애 복구 과정에서의 중복\r\n\r\n**해결 방법**\r\n\r\n**1. Idempotent Producer 활성화**\r\n```properties\r\nenable.idempotence=true  # Kafka 3.0+에서는 기본값 true\r\nacks=all                 # 필수 조건\r\nretries=Integer.MAX_VALUE\r\nmax.in.flight.requests.per.connection=5  # 1~5 사이 값 필수\r\n```\r\n- PID(Producer ID) + Sequence Number로 중복 감지 및 무시\r\n- `max.in.flight.requests.per.connection`이 5 이하일 때만 순서 보장과 함께 멱등성 동작\r\n\r\n**2. Transactional Producer 사용**\r\n- 트랜잭션 단위로 원자적 전송 보장\r\n- 장애 복구 시에도 중복 방지\r\n\r\n**3. Consumer 측 멱등성 처리**\r\n- 메시지에 고유 ID 포함\r\n- 처리 전 중복 체크 (DB unique constraint, Redis 등)\r\n- 멱등한 처리 로직 설계",
    "references": [
      {
        "title": "Apache Kafka Documentation - Idempotent Producer",
        "url": "https://kafka.apache.org/documentation/#producerconfigs_enable.idempotence"
      }
    ]
  },
  {
    "id": "KAFKA-013",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka Consumer가 재시작될 때 오프셋(offset) 관리를 어떻게 수행하며, 메시지 전달 보장은 어떻게 유지하나요?",
    "answer": "**Offset 저장 위치**\r\n- 내부 토픽 `__consumer_offsets`에 저장\r\n- Consumer Group ID와 Topic-Partition 별로 관리\r\n\r\n**재시작 시 동작**\r\n1. Consumer가 Group에 조인\r\n2. 마지막 커밋된 Offset 조회\r\n3. 해당 Offset부터 메시지 소비 재개\r\n\r\n**Offset Reset 정책 (auto.offset.reset)**\r\n- `earliest`: 가장 처음 Offset부터 시작 (토픽의 모든 데이터 재처리)\r\n- `latest`: 가장 최근 Offset부터 시작 (기본값, 새 메시지만 처리)\r\n- `none`: Offset 없으면 예외 발생 (명시적 오프셋 관리 필요 시)\r\n\r\n**트레이드오프**\r\n- `earliest`: 데이터 손실 없음, 하지만 대량 재처리로 인한 Consumer Lag 발생 가능\r\n- `latest`: 빠른 시작, 하지만 Consumer 중단 기간의 메시지 손실 가능\r\n\r\n**커밋 전략**\r\n```properties\r\n# 자동 커밋\r\nenable.auto.commit=true\r\nauto.commit.interval.ms=5000\r\n\r\n# 수동 커밋 (권장)\r\nenable.auto.commit=false\r\n```\r\n\r\n**수동 커밋 방식**\r\n- `commitSync()`: 동기 커밋 (블로킹)\r\n- `commitAsync()`: 비동기 커밋 (논블로킹)",
    "references": [
      {
        "title": "Apache Kafka Documentation - Consumer Configs",
        "url": "https://kafka.apache.org/documentation/#consumerconfigs"
      }
    ]
  },
  {
    "id": "KAFKA-014",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka 로그 컴팩션(log compaction)이란 무엇이며, 어떤 상황에서 사용되나요?",
    "answer": "**Log Compaction 개념**\r\n- 동일한 키를 가진 메시지 중 최신 값만 유지하는 보존 정책\r\n- 키-값 저장소처럼 각 키의 최종 상태만 보관\r\n- 삭제가 아닌 압축을 통해 로그 크기 감소\r\n\r\n**설정 방법**\r\n```properties\r\ncleanup.policy=compact          # 컴팩션 활성화\r\ncleanup.policy=compact,delete   # 둘 다 적용\r\nmin.cleanable.dirty.ratio=0.5   # 컴팩션 트리거 비율\r\n```\r\n\r\n**사용 사례**\r\n- **CDC (Change Data Capture)**: DB 변경 이벤트 저장\r\n- **상태 저장소**: 사용자 설정, 세션 정보\r\n- **Kafka Streams State Store**: 내부 상태 복원\r\n- **Consumer Offset 토픽**: `__consumer_offsets`\r\n\r\n**Tombstone 레코드**\r\n- 키에 null 값을 전송하면 해당 키 삭제 표시\r\n- `delete.retention.ms` 후 완전 삭제 (기본값: 24시간)\r\n\r\n**Log Compaction 트레이드오프**\r\n- 장점: 스토리지 절약, 빠른 복구(최종 상태만 필요)\r\n- 단점: 이력 조회 불가, 컴팩션 중 CPU/I/O 사용량 증가\r\n- `min.cleanable.dirty.ratio`: 낮을수록 자주 컴팩션 (CPU 사용량 증가), 높을수록 스토리지 사용량 증가\r\n\r\n**주의사항**\r\n- 키가 null인 메시지는 컴팩션 대상이 아니며 일반 retention 정책 적용\r\n- 컴팩션은 active segment가 아닌 이전 segment에만 적용됨",
    "references": [
      {
        "title": "Apache Kafka Documentation - Log Compaction",
        "url": "https://kafka.apache.org/documentation/#compaction"
      }
    ]
  },
  {
    "id": "KAFKA-015",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka 성능 튜닝을 위한 주요 고려 사항에는 어떤 것들이 있나요?",
    "answer": "**Producer 튜닝**\r\n- `batch.size`: 배치 크기 증가 (기본 16KB → 64KB 이상)\r\n- `linger.ms`: 배치 대기 시간 (0 → 5-100ms)\r\n- `compression.type`: 압축 활성화 (lz4, snappy)\r\n- `buffer.memory`: 버퍼 메모리 확대\r\n\r\n**Consumer 튜닝**\r\n- `fetch.min.bytes`: 최소 fetch 크기 증가\r\n- `fetch.max.wait.ms`: 대기 시간 조정\r\n- `max.poll.records`: 폴링당 레코드 수 조정\r\n\r\n**Broker 튜닝**\r\n- `num.io.threads`: I/O 스레드 수 (디스크 수에 맞게)\r\n- `num.network.threads`: 네트워크 스레드 수\r\n- `socket.send.buffer.bytes/socket.receive.buffer.bytes`: 소켓 버퍼 크기\r\n- `log.flush.interval.messages`: 디스크 플러시 간격\r\n\r\n**일반 고려사항**\r\n- 파티션 수 적정 설계 (브로커당 2,000~4,000개 이하 권장)\r\n- JVM 힙 설정 (6-8GB 권장, 과도한 힙은 GC 지연 유발)\r\n- 페이지 캐시를 위한 OS 메모리 확보 (Kafka 성능의 핵심)\r\n\r\n**성능 튜닝의 트레이드오프**\r\n- `batch.size` 증가: 처리량 향상 vs 지연시간 증가\r\n- `linger.ms` 증가: 배치 효율 vs 첫 메시지 지연\r\n- `compression.type`: 네트워크 절약 vs CPU 사용량 증가\r\n- `acks=all`: 데이터 안정성 vs 지연시간 증가\r\n\r\n**권장 접근법**: 기본값으로 시작하여 모니터링 기반으로 병목 지점을 식별한 후 점진적 튜닝",
    "references": [
      {
        "title": "Apache Kafka Documentation - Configuration",
        "url": "https://kafka.apache.org/documentation/#configuration"
      }
    ]
  },
  {
    "id": "KAFKA-016",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka 클러스터 성능 튜닝을 위해 네트워크 및 하드웨어 설정에서 고려해야 할 점은 무엇인가요?",
    "answer": "**네트워크 설정**\r\n- 브로커 간 전용 네트워크 대역폭 확보 (10Gbps 권장)\r\n- 클라이언트-브로커 간 낮은 레이턴시 네트워크\r\n- `socket.send.buffer.bytes`, `socket.receive.buffer.bytes` 튜닝\r\n- TCP 설정 최적화 (net.core.rmem_max 등)\r\n\r\n**스토리지**\r\n- SSD 권장 (처리량 향상)\r\n- RAID 10 또는 JBOD 구성\r\n- 여러 디스크에 로그 디렉토리 분산 (`log.dirs`)\r\n- XFS 파일시스템 권장\r\n\r\n**메모리**\r\n- JVM 힙: 6-8GB (과도한 GC 방지)\r\n- 나머지는 OS 페이지 캐시용으로 확보\r\n- 총 메모리: 32-64GB 권장\r\n\r\n**CPU**\r\n- 압축 사용 시 CPU 코어 중요\r\n- 최소 8코어 이상 권장\r\n\r\n**파티션/브로커 비율**\r\n- 브로커당 파티션 수 제한 (ZooKeeper: 4,000개 이하 권장, KRaft: 더 많은 파티션 지원)\r\n- 리더 파티션 균등 분배\r\n- 전체 클러스터 파티션 수도 고려 (ZooKeeper 모드: 수십만 개 한계, KRaft: 수백만 개 가능)\r\n\r\n**하드웨어 선택 트레이드오프**\r\n- **SSD vs HDD**: SSD는 랜덤 I/O 성능 향상, 하지만 Kafka는 순차 I/O 중심이므로 HDD도 적합. 비용 대비 용량이 중요하면 HDD 고려\r\n- **메모리**: JVM 힙보다 페이지 캐시용 메모리가 더 중요. 총 메모리의 절반 이상을 OS에 남겨둘 것\r\n- **네트워크**: 복제 팩터와 Consumer 수에 따라 필요 대역폭이 배수로 증가",
    "references": [
      {
        "title": "Apache Kafka Documentation - Hardware and OS",
        "url": "https://kafka.apache.org/documentation/#hwandos"
      }
    ]
  },
  {
    "id": "KAFKA-017",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka에서 성능 튜닝과 함께 데이터 손실을 방지하기 위한 전략은 무엇인가요?",
    "answer": "**Producer 설정**\r\n- `acks=all`: 모든 ISR 복제 완료 후 ACK\r\n- `retries`: 충분한 재시도 횟수 설정\r\n- `enable.idempotence=true`: 멱등성 활성화\r\n\r\n**Broker 설정**\r\n- `replication.factor=3`: 3개 이상 복제본\r\n- `min.insync.replicas=2`: 최소 2개 동기화 필수\r\n- `unclean.leader.election.enable=false`: 비동기 복제본의 리더 승격 방지\r\n- `default.replication.factor=3`: 기본 복제 계수\r\n\r\n**Consumer 설정**\r\n- `enable.auto.commit=false`: 수동 오프셋 커밋\r\n- 처리 완료 후 커밋 (at-least-once 보장)\r\n\r\n**운영 전략**\r\n- 다중 데이터센터 복제 (MirrorMaker 2)\r\n- 정기적인 백업 및 복구 테스트\r\n- 모니터링: Under-replicated partitions 감시\r\n\r\n**조합 예시**\r\n```properties\r\nacks=all\r\nmin.insync.replicas=2\r\nreplication.factor=3\r\n```\r\n→ 최대 1개 브로커 장애까지 쓰기 가능, 데이터 손실 없음\r\n\r\n**함정 주의**\r\n- `min.insync.replicas=2`, `replication.factor=3`일 때 2개 브로커 장애 시 쓰기 불가 (읽기는 가능)\r\n- `acks=all`이지만 `min.insync.replicas=1`이면 Leader 한 대만으로 쓰기 성공 가능\r\n\r\n**데이터 손실 방지 vs 가용성 트레이드오프**\r\n| 설정 | 허용 가능한 브로커 장애 (쓰기) | 데이터 안정성 |\r\n|------|------------------------------|--------------|\r\n| RF=3, ISR=1 | 2개 | 낮음 |\r\n| RF=3, ISR=2 | 1개 | 높음 |\r\n| RF=3, ISR=3 | 0개 | 최고 (하지만 가용성 낮음) |",
    "references": [
      {
        "title": "Apache Kafka Documentation - Durability",
        "url": "https://kafka.apache.org/documentation/#design_ha"
      }
    ]
  },
  {
    "id": "KAFKA-018",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka의 ACL(Access Control List) 및 보안 설정 방법에 대해 설명해주세요.",
    "answer": "**ACL 개념**\r\n- 리소스(Topic, Consumer Group 등)에 대한 접근 권한 제어\r\n- Principal(사용자/서비스)별로 허용/거부 규칙 정의\r\n\r\n**ACL 구성 요소**\r\n- **Principal**: 접근 주체 (User:alice)\r\n- **Resource**: 대상 리소스 (Topic:orders)\r\n- **Operation**: 허용 작업 (Read, Write, Create 등)\r\n- **Permission**: Allow 또는 Deny\r\n\r\n**설정 방법**\r\n\r\n1. **Broker 설정**\r\n```properties\r\nauthorizer.class.name=kafka.security.authorizer.AclAuthorizer\r\nsuper.users=User:admin\r\nallow.everyone.if.no.acl.found=false\r\n```\r\n\r\n2. **ACL 추가**\r\n```bash\r\nkafka-acls.sh --bootstrap-server localhost:9092 \\\r\n  --add --allow-principal User:producer \\\r\n  --operation Write --topic orders\r\n\r\nkafka-acls.sh --bootstrap-server localhost:9092 \\\r\n  --add --allow-principal User:consumer \\\r\n  --operation Read --topic orders --group my-group\r\n```\r\n\r\n3. **ACL 조회**\r\n```bash\r\nkafka-acls.sh --bootstrap-server localhost:9092 --list\r\n```",
    "references": [
      {
        "title": "Apache Kafka Documentation - Authorization",
        "url": "https://kafka.apache.org/documentation/#security_authz"
      }
    ]
  },
  {
    "id": "KAFKA-019",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka에서 ACL 기반 접근 제어와 함께 SSL/TLS 및 SASL을 사용한 암호화 및 인증 구성 방법에 대해 설명해주세요.",
    "answer": "**SSL/TLS (전송 암호화)**\r\n\r\n1. **인증서 생성** (keytool 사용)\r\n```bash\r\nkeytool -genkey -keystore kafka.server.keystore.jks \\\r\n  -alias localhost -validity 365 -keyalg RSA\r\n```\r\n\r\n2. **Broker 설정**\r\n```properties\r\nlisteners=SSL://0.0.0.0:9093\r\nssl.keystore.location=/var/ssl/kafka.server.keystore.jks\r\nssl.keystore.password=password\r\nssl.key.password=password\r\nssl.truststore.location=/var/ssl/kafka.server.truststore.jks\r\nssl.truststore.password=password\r\n```\r\n\r\n**SASL (인증)**\r\n\r\n1. **SASL/PLAIN** (간단한 사용자/비밀번호)\r\n```properties\r\nlisteners=SASL_SSL://0.0.0.0:9094\r\nsasl.enabled.mechanisms=PLAIN\r\n```\r\n\r\n2. **SASL/SCRAM** (안전한 비밀번호 저장)\r\n```bash\r\nkafka-configs.sh --zookeeper localhost:2181 --alter \\\r\n  --add-config 'SCRAM-SHA-256=[password=secret]' \\\r\n  --entity-type users --entity-name alice\r\n```\r\n\r\n3. **SASL/GSSAPI** (Kerberos)\r\n- 엔터프라이즈 환경에서 주로 사용\r\n- Kerberos KDC 연동 필요\r\n\r\n**권장 조합**: SASL_SSL (인증 + 암호화)",
    "references": [
      {
        "title": "Apache Kafka Documentation - Security",
        "url": "https://kafka.apache.org/documentation/#security"
      }
    ]
  },
  {
    "id": "KAFKA-020",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka Broker 재시작 시 클러스터 안정성을 유지하는 방법은 무엇인가요?",
    "answer": "**Rolling Restart 절차**\r\n1. 브로커의 `controlled.shutdown.enable=true` 확인\r\n2. 한 번에 하나의 브로커만 재시작\r\n3. ISR이 복구될 때까지 대기 후 다음 브로커 진행\r\n\r\n**안정성 유지 설정**\r\n```properties\r\n# Broker 설정\r\ncontrolled.shutdown.enable=true\r\ncontrolled.shutdown.max.retries=3\r\nmin.insync.replicas=2\r\n\r\n# Topic 설정\r\nreplication.factor=3\r\n```\r\n\r\n**재시작 전 확인 사항**\r\n```bash\r\n# Under-replicated 파티션 확인\r\nkafka-topics.sh --describe --under-replicated-partitions\r\n\r\n# ISR 상태 확인\r\nkafka-topics.sh --describe --topic my-topic\r\n```\r\n\r\n**모범 사례**\r\n- 피크 시간 외 재시작 수행\r\n- 리더 재분배 자동화 (`auto.leader.rebalance.enable=true`)\r\n- 모니터링 알림 설정\r\n- 충분한 복제본 수 유지 (3개 이상)",
    "references": [
      {
        "title": "Apache Kafka Documentation - Broker Configs",
        "url": "https://kafka.apache.org/documentation/#brokerconfigs"
      }
    ]
  },
  {
    "id": "KAFKA-021",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka 리플리케이션에서 In-Sync Replica(ISR)의 역할과 브로커 재시작 시 클러스터 안정성에 미치는 영향은 무엇인가요?",
    "answer": "**ISR (In-Sync Replica) 개념**\r\n- Leader와 동기화된 Replica들의 집합\r\n- Leader를 포함한 \"충분히 최신 상태\"인 복제본들\r\n- `replica.lag.time.max.ms` 내에 복제된 복제본만 ISR에 포함\r\n\r\n**ISR의 역할**\r\n1. **리더 선출 후보**: Leader 장애 시 ISR 중에서 새 Leader 선출\r\n2. **ACK 대상**: `acks=all` 시 ISR 모두에 복제 완료 후 응답\r\n3. **데이터 일관성**: 동기화된 복제본만 서비스 참여\r\n\r\n**중요성**\r\n- ISR 크기가 `min.insync.replicas` 미만이면 Producer 쓰기 실패 (`NotEnoughReplicasException`)\r\n- ISR 축소는 데이터 손실 위험 신호\r\n- Under-replicated 파티션 모니터링 필수\r\n\r\n**ISR 관련 함정 주의**\r\n- ISR은 \"완전히 동기화된\" 복제본이 아니라 \"충분히 최신\" 복제본을 의미\r\n- `replica.lag.time.max.ms` 내에 복제 요청을 보낸 복제본은 ISR에 포함됨\r\n- 따라서 ISR 내 복제본도 약간의 지연이 있을 수 있음\r\n\r\n**관련 설정**\r\n```properties\r\nmin.insync.replicas=2           # 최소 ISR 수\r\nreplica.lag.time.max.ms=30000   # ISR 판단 기준 (기본 30초)\r\n```\r\n\r\n**모니터링 지표**\r\n- `kafka.server:type=ReplicaManager,name=UnderReplicatedPartitions`\r\n- 0이 아니면 즉시 조사 필요",
    "references": [
      {
        "title": "Apache Kafka Documentation - ISR",
        "url": "https://kafka.apache.org/documentation/#design_replicatedlog"
      }
    ]
  },
  {
    "id": "KAFKA-022",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka에서 메시지의 순서를 보장하는 방법은 무엇인가요?",
    "answer": "**파티션 내 순서 보장**\r\n- Kafka는 **단일 파티션 내에서만** 메시지 순서 보장\r\n- 파티션 간에는 순서 보장 없음\r\n\r\n**순서 보장 방법**\r\n\r\n1. **파티션 키 사용**\r\n```java\r\n// 같은 키를 가진 메시지는 같은 파티션으로 전송\r\nproducer.send(new ProducerRecord<>(\"topic\", \"userId-123\", message));\r\n```\r\n\r\n2. **단일 파티션 토픽** (처리량 제한됨)\r\n```bash\r\nkafka-topics.sh --create --topic ordered-topic --partitions 1\r\n```\r\n\r\n3. **Producer 설정**\r\n```properties\r\n# 멱등성 활성화 시 순서 보장 (실패 시에도)\r\nenable.idempotence=true\r\nmax.in.flight.requests.per.connection=5  # 1~5 사이: 멱등성과 함께 순서 보장\r\n```\r\n\r\n**주의사항**\r\n- `max.in.flight.requests.per.connection > 1`이고 멱등성 비활성화 시, 재시도로 인해 순서 역전 가능\r\n- 멱등성 활성화 시에도 `max.in.flight.requests.per.connection > 5`이면 순서 보장 불가\r\n- Consumer는 단일 스레드로 파티션 처리 권장\r\n\r\n**함정 주의**: \"Kafka는 순서를 보장한다\"는 부분적으로만 맞음\r\n- 정확히는 \"단일 파티션 내에서, 올바른 Producer 설정 시에만\" 순서 보장\r\n- 파티션 간 순서 보장 필요 시 단일 파티션 사용 또는 애플리케이션 레벨 타임스탬프 기반 정렬 필요",
    "references": [
      {
        "title": "Apache Kafka Documentation - Message Ordering",
        "url": "https://kafka.apache.org/documentation/#design_quotasandguarantees"
      }
    ]
  },
  {
    "id": "KAFKA-023",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka Producer의 ACK 설정 옵션(0, 1, all)이 메시지 순서 보장과 신뢰성에 미치는 영향에 대해 설명해주세요.",
    "answer": "**ACK 설정 옵션**\r\n\r\n**acks=0**\r\n- Producer는 브로커 응답을 기다리지 않음\r\n- 가장 빠른 전송 속도\r\n- 메시지 손실 가능성 높음\r\n- 사용 사례: 로그, 메트릭 등 손실 허용 데이터\r\n\r\n**acks=1**\r\n- Leader가 로컬 로그에 기록 후 응답\r\n- Leader 장애 시 데이터 손실 가능 (Follower 복제 전)\r\n- 적절한 성능과 신뢰성 균형\r\n- 사용 사례: 일반적인 애플리케이션\r\n\r\n**acks=all (또는 -1)**\r\n- 모든 ISR이 복제 완료 후 응답\r\n- 가장 높은 내구성 보장\r\n- 가장 느린 전송 속도\r\n- `min.insync.replicas`와 함께 사용 권장\r\n- 사용 사례: 금융 데이터, 주문 등 중요 데이터\r\n\r\n**비교 요약**\r\n| ACK | 속도 | 내구성 | 손실 위험 |\r\n|-----|------|--------|-----------|\r\n| 0 | 최고 | 없음 | 높음 |\r\n| 1 | 중간 | Leader만 | 중간 |\r\n| all | 낮음 | ISR 전체 | 낮음 |\r\n\r\n**운영 환경 트레이드오프 가이드**\r\n- **acks=0**: 로그, 메트릭 등 손실 허용 가능한 대량 데이터에 적합. 처리량 최대화가 목표일 때\r\n- **acks=1**: 대부분의 일반 애플리케이션에 적합. 처리량과 내구성의 균형\r\n- **acks=all + min.insync.replicas=2**: 금융, 주문 등 데이터 손실이 허용되지 않는 경우. 지연시간 증가 감수\r\n\r\n**주의**: `acks=all`이라도 `min.insync.replicas=1`이면 Leader 한 대만으로도 쓰기 성공 가능하므로 실질적으로 acks=1과 동일한 내구성",
    "references": [
      {
        "title": "Apache Kafka Documentation - Producer Configs",
        "url": "https://kafka.apache.org/documentation/#producerconfigs_acks"
      }
    ]
  },
  {
    "id": "KAFKA-024",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka와 RabbitMQ 같은 다른 메시징 시스템의 주요 차이점은 무엇인가요?",
    "answer": "**아키텍처 차이**\r\n\r\n| 구분 | Kafka | RabbitMQ |\r\n|------|-------|----------|\r\n| 모델 | 로그 기반 | 메시지 브로커 |\r\n| 메시지 저장 | 영구 저장 (retention) | 소비 후 삭제 |\r\n| 소비 방식 | Pull (Consumer가 가져감) | Push (Broker가 전달) |\r\n| 프로토콜 | 자체 프로토콜 | AMQP |\r\n\r\n**주요 차이점**\r\n\r\n1. **메시지 재처리**\r\n   - Kafka: Offset 조정으로 재처리 가능 (메시지는 retention 기간 동안 보관)\r\n   - RabbitMQ: 기본적으로 소비 후 삭제 (Dead Letter Queue로 재처리 가능)\r\n\r\n2. **처리량**\r\n   - Kafka: 높은 처리량에 최적화 (초당 수백만 건), 순차 I/O 활용\r\n   - RabbitMQ: 중간 처리량, 낮은 지연시간 (밀리초 단위)\r\n\r\n3. **Consumer 확장**\r\n   - Kafka: 파티션 기반 병렬 처리 (파티션 수가 병렬성 상한)\r\n   - RabbitMQ: 큐 경쟁 방식 (Consumer 수에 제한 없음)\r\n\r\n4. **사용 사례**\r\n   - Kafka: 로그 수집, 이벤트 스트리밍, 데이터 파이프라인, 이벤트 소싱\r\n   - RabbitMQ: 작업 큐, RPC, 복잡한 라우팅, 마이크로서비스 통신\r\n\r\n**선택 기준**\r\n- 대용량 스트리밍, 이벤트 재처리, 장기 보관 → Kafka\r\n- 복잡한 라우팅, 유연한 메시징 패턴, 낮은 지연시간 우선 → RabbitMQ\r\n- 둘 다 필요한 경우: Kafka + RabbitMQ 혼합 아키텍처도 고려\r\n\r\n**함정 주의**: \"Kafka가 RabbitMQ보다 항상 좋다\"는 잘못된 일반화\r\n- 단순한 작업 큐나 RPC 패턴에는 RabbitMQ가 더 적합할 수 있음\r\n- 운영 복잡도, 팀 경험, 기존 인프라도 고려 필요",
    "references": [
      {
        "title": "Apache Kafka Documentation - Introduction",
        "url": "https://kafka.apache.org/documentation/#introduction"
      }
    ]
  },
  {
    "id": "KAFKA-025",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka 클러스터의 Zero Downtime 배포 전략에 대해 설명해주세요.",
    "answer": "**Rolling Upgrade 전략**\r\n\r\n1. **사전 준비**\r\n   - 복제 계수 3 이상 확인\r\n   - `min.insync.replicas=2` 설정\r\n   - Under-replicated 파티션 없음 확인\r\n\r\n2. **브로커 업그레이드 절차**\r\n```bash\r\n# 1. 한 브로커 정상 종료\r\nkafka-server-stop.sh\r\n\r\n# 2. 새 버전 설치 및 설정\r\n\r\n# 3. 브로커 시작\r\nkafka-server-start.sh config/server.properties\r\n\r\n# 4. ISR 복구 확인 후 다음 브로커 진행\r\n```\r\n\r\n3. **클라이언트 호환성**\r\n   - `inter.broker.protocol.version` 점진적 업그레이드\r\n   - `log.message.format.version` 설정 유지 후 변경\r\n\r\n**설정 예시**\r\n```properties\r\n# 업그레이드 중 (이전 버전 유지)\r\ninter.broker.protocol.version=3.0\r\nlog.message.format.version=3.0\r\n\r\n# 모든 브로커 업그레이드 후 제거\r\n```\r\n\r\n**모니터링**\r\n- ISR 상태 지속 확인\r\n- Consumer lag 모니터링\r\n- 클라이언트 에러 확인",
    "references": [
      {
        "title": "Apache Kafka Documentation - Upgrading",
        "url": "https://kafka.apache.org/documentation/#upgrade"
      }
    ]
  },
  {
    "id": "KAFKA-026",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka Streams를 활용한 스트림 처리와 배치 처리의 차이점은 무엇인가요?",
    "answer": "**배치 처리 (Batch Processing)**\r\n- 일정 기간 데이터를 모아서 한 번에 처리\r\n- 높은 처리량, 높은 지연시간\r\n- Kafka 활용: Consumer가 주기적으로 대량 데이터 소비\r\n\r\n**스트림 처리 (Stream Processing)**\r\n- 데이터 도착 즉시 실시간 처리\r\n- 낮은 지연시간, 연속적인 처리\r\n- Kafka 활용: Kafka Streams, KSQL\r\n\r\n**Kafka에서의 차이**\r\n\r\n| 구분 | 배치 처리 | 스트림 처리 |\r\n|------|----------|-------------|\r\n| 도구 | Consumer + Spark/Flink | Kafka Streams, KSQL |\r\n| 지연 | 분~시간 | 밀리초~초 |\r\n| 윈도우 | 고정 시간 범위 | 텀블링/슬라이딩/세션 |\r\n| 상태 | 외부 저장소 | State Store (RocksDB) |\r\n\r\n**Kafka Streams의 스트림 처리 특징**\r\n```java\r\nStreamsBuilder builder = new StreamsBuilder();\r\nbuilder.stream(\"input-topic\")\r\n    .filter((k, v) -> v.contains(\"important\"))\r\n    .mapValues(v -> v.toUpperCase())\r\n    .to(\"output-topic\");\r\n```\r\n\r\n**Lambda 아키텍처**\r\n- Kafka를 중심으로 배치 + 스트림 동시 처리\r\n- 배치 레이어: 정확한 결과\r\n- 스피드 레이어: 실시간 근사 결과",
    "references": [
      {
        "title": "Apache Kafka Documentation - Streams Concepts",
        "url": "https://kafka.apache.org/documentation/streams/core-concepts"
      }
    ]
  },
  {
    "id": "KAFKA-027",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka에서 ACL 기반 접근 제어와 Quota 설정을 활용하여 멀티 테넌시(Multi-Tenancy)를 어떻게 지원하나요?",
    "answer": "**멀티 테넌시 구현 방법**\r\n\r\n1. **토픽 네이밍 컨벤션**\r\n```\r\ntenant-a.orders\r\ntenant-b.orders\r\n```\r\n\r\n2. **ACL 기반 접근 제어**\r\n```bash\r\n# 테넌트 A는 자신의 토픽만 접근 가능\r\nkafka-acls.sh --add --allow-principal User:tenant-a \\\r\n  --operation All --topic 'tenant-a.*' --resource-pattern-type prefixed\r\n```\r\n\r\n3. **Quota 설정**\r\n```bash\r\n# 테넌트별 처리량 제한\r\nkafka-configs.sh --alter --add-config 'producer_byte_rate=10485760,consumer_byte_rate=20971520' \\\r\n  --entity-type users --entity-name tenant-a\r\n```\r\n\r\n**Quota 종류**\r\n- `producer_byte_rate`: 초당 Producer 전송량 제한\r\n- `consumer_byte_rate`: 초당 Consumer 수신량 제한\r\n- `request_percentage`: CPU 사용률 제한\r\n\r\n**격리 수준**\r\n| 방식 | 격리 수준 | 운영 복잡도 |\r\n|------|----------|-------------|\r\n| 네이밍 컨벤션 | 낮음 | 낮음 |\r\n| ACL + Quota | 중간 | 중간 |\r\n| 별도 클러스터 | 높음 | 높음 |\r\n\r\n**모범 사례**\r\n- 테넌트별 전용 Consumer Group\r\n- 모니터링 대시보드 분리\r\n- 네트워크 격리 (VLAN/VPC)",
    "references": [
      {
        "title": "Apache Kafka Documentation - Quotas",
        "url": "https://kafka.apache.org/documentation/#design_quotas"
      }
    ]
  },
  {
    "id": "KAFKA-028",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka 클러스터 모니터링을 위한 주요 지표와 사용 도구에는 어떤 것들이 있나요?",
    "answer": "**주요 모니터링 지표**\r\n\r\n**Broker 지표**\r\n- `UnderReplicatedPartitions`: 복제 지연 파티션 수 (0이어야 함)\r\n- `ActiveControllerCount`: 활성 컨트롤러 수 (클러스터당 1)\r\n- `OfflinePartitionsCount`: 오프라인 파티션 수 (0이어야 함)\r\n- `RequestsPerSec`: 초당 요청 수\r\n- `BytesInPerSec/BytesOutPerSec`: 네트워크 처리량\r\n\r\n**Producer 지표**\r\n- `record-send-rate`: 초당 전송 레코드 수\r\n- `record-error-rate`: 전송 실패율\r\n- `request-latency-avg`: 평균 요청 지연시간\r\n\r\n**Consumer 지표**\r\n- `records-lag-max`: 최대 Consumer Lag\r\n- `records-consumed-rate`: 초당 소비 레코드 수\r\n- `commit-latency-avg`: 오프셋 커밋 지연시간\r\n\r\n**모니터링 도구**\r\n- **JMX**: Kafka 기본 메트릭 노출\r\n- **Prometheus + Grafana**: 시계열 메트릭 수집 및 시각화\r\n- **Kafka Manager/CMAK**: 클러스터 관리 UI\r\n- **Confluent Control Center**: 상용 모니터링 솔루션\r\n- **Burrow**: Consumer Lag 전문 모니터링",
    "references": [
      {
        "title": "Apache Kafka Documentation - Monitoring",
        "url": "https://kafka.apache.org/documentation/#monitoring"
      }
    ]
  },
  {
    "id": "KAFKA-029",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka Consumer Group의 Rebalance 과정과 이를 최적화하기 위한 방법은 무엇인가요?",
    "answer": "**Rebalance 발생 조건**\r\n- Consumer 그룹에 새 Consumer 참여/이탈\r\n- Consumer가 heartbeat 미전송 (세션 타임아웃)\r\n- 토픽 파티션 수 변경\r\n- 정규식 구독 토픽 변경\r\n\r\n**Rebalance 과정**\r\n1. Group Coordinator가 리밸런스 트리거\r\n2. 모든 Consumer가 파티션 할당 해제 (Stop-the-World)\r\n3. Consumer Leader가 새 파티션 할당 계획 수립\r\n4. 각 Consumer에 파티션 재할당\r\n5. 소비 재개\r\n\r\n**최적화 방법**\r\n\r\n1. **Cooperative Rebalancing (증분 리밸런스)**\r\n```properties\r\npartition.assignment.strategy=org.apache.kafka.clients.consumer.CooperativeStickyAssignor\r\n```\r\n- 전체 중단 없이 점진적 재할당\r\n\r\n2. **Static Membership**\r\n```properties\r\ngroup.instance.id=consumer-1\r\nsession.timeout.ms=300000\r\n```\r\n- Consumer 재시작 시 즉시 파티션 복구\r\n\r\n3. **세션 타임아웃 최적화**\r\n```properties\r\nsession.timeout.ms=45000\r\nheartbeat.interval.ms=15000\r\nmax.poll.interval.ms=300000\r\n```\r\n\r\n4. **poll() 처리 시간 단축**\r\n- `max.poll.records` 조정\r\n- 처리 로직 최적화\r\n\r\n**Rebalance 관련 트레이드오프**\r\n- `session.timeout.ms` 짧게: 빠른 장애 감지 vs 네트워크 지연으로 인한 불필요한 리밸런스\r\n- `session.timeout.ms` 길게: 안정적 vs 실제 장애 시 늦은 감지\r\n- `max.poll.interval.ms`: 긴 처리 허용 vs 느린 hang 감지\r\n- Static Membership: 리밸런스 감소 vs 실제 장애 Consumer 감지 지연\r\n\r\n**실제 운영 팁**\r\n- 배포 시 Consumer를 점진적으로 재시작하여 동시 리밸런스 방지\r\n- Kubernetes 환경에서는 PodDisruptionBudget과 함께 사용",
    "references": [
      {
        "title": "Apache Kafka Documentation - Consumer Rebalance",
        "url": "https://kafka.apache.org/documentation/#consumerconfigs_partition.assignment.strategy"
      }
    ]
  },
  {
    "id": "KAFKA-030",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Producer 성능 병목 현상 발생 시 해결 전략은 무엇인가요?",
    "answer": "**병목 진단 지표**\r\n- `record-queue-time-avg`: 배치 대기 시간\r\n- `request-latency-avg`: 요청 응답 시간\r\n- `buffer-available-bytes`: 사용 가능 버퍼\r\n\r\n**해결 전략**\r\n\r\n1. **배치 최적화**\r\n```properties\r\nbatch.size=65536           # 64KB로 증가\r\nlinger.ms=10               # 배치 대기 시간\r\nbuffer.memory=67108864     # 64MB 버퍼\r\n```\r\n\r\n2. **압축 활성화**\r\n```properties\r\ncompression.type=lz4       # 또는 snappy, zstd\r\n```\r\n\r\n3. **병렬 처리 증가**\r\n```properties\r\nmax.in.flight.requests.per.connection=5\r\n```\r\n\r\n4. **비동기 전송**\r\n```java\r\nproducer.send(record, (metadata, exception) -> {\r\n    if (exception != null) handleError(exception);\r\n});\r\n```\r\n\r\n5. **파티션 수 증가**\r\n- 더 많은 브로커에 부하 분산\r\n\r\n6. **ACK 수준 조정** (내구성 트레이드오프 - 마지막 수단)\r\n```properties\r\nacks=1  # all에서 1로 변경 (데이터 손실 가능성 증가)\r\n```\r\n\r\n**하드웨어 개선**\r\n- 네트워크 대역폭 확장\r\n- 브로커 디스크 I/O 개선 (SSD)\r\n- 브로커 수 증가\r\n\r\n**병목 진단 권장 순서**\r\n1. 모니터링 지표로 병목 위치 파악 (Producer 버퍼? 브로커 I/O? 네트워크?)\r\n2. 해당 영역의 설정 먼저 조정 (batch.size, linger.ms, compression 등)\r\n3. 내구성 관련 설정(acks)은 데이터 손실 허용 가능한 경우에만 최후 수단으로 변경",
    "references": [
      {
        "title": "Apache Kafka Documentation - Producer Performance",
        "url": "https://kafka.apache.org/documentation/#producerconfigs"
      }
    ]
  },
  {
    "id": "KAFKA-031",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "ZooKeeper의 역할과 KRaft 모드의 차이점에 대해 설명해주세요.",
    "answer": "**ZooKeeper의 역할**\r\n- 클러스터 메타데이터 저장 (토픽, 파티션, 브로커 정보)\r\n- Controller 선출\r\n- 브로커 상태 감지 (Ephemeral 노드)\r\n- ACL 및 설정 저장\r\n\r\n**KRaft (Kafka Raft) 모드**\r\n- Kafka 자체 내장 메타데이터 관리 (ZooKeeper 제거)\r\n- Raft 합의 프로토콜 사용\r\n- Kafka 3.3부터 프로덕션 준비 완료 (KIP-833)\r\n- Kafka 3.5+에서 ZooKeeper에서 KRaft로 무중단 마이그레이션 지원\r\n- **Kafka 4.0에서 ZooKeeper 모드 완전 제거 예정** (KIP-833)\r\n\r\n**주요 차이점**\r\n\r\n| 구분 | ZooKeeper 모드 | KRaft 모드 |\r\n|------|---------------|------------|\r\n| 의존성 | ZooKeeper 클러스터 필요 | Kafka만으로 운영 |\r\n| 메타데이터 | ZooKeeper에 저장 | 내부 토픽에 저장 |\r\n| 확장성 | 파티션 수 제한 (수만 개) | 수백만 파티션 가능 |\r\n| 운영 | 두 시스템 관리 | 단일 시스템 |\r\n| 복구 | 느린 컨트롤러 페일오버 | 빠른 복구 |\r\n\r\n**KRaft 설정 예시**\r\n```properties\r\nprocess.roles=broker,controller\r\nnode.id=1\r\ncontroller.quorum.voters=1@localhost:9093\r\n```\r\n\r\n**마이그레이션**: ZooKeeper → KRaft 무중단 전환 도구 제공",
    "references": [
      {
        "title": "Apache Kafka Documentation - KRaft",
        "url": "https://kafka.apache.org/documentation/#kraft"
      }
    ]
  },
  {
    "id": "KAFKA-032",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka의 메시지 압축 옵션(gzip, snappy, lz4 등)의 장단점은 무엇인가요?",
    "answer": "**압축 옵션 비교**\r\n\r\n| 압축 방식 | 압축률 | 속도 | CPU 사용량 | 권장 사용 |\r\n|----------|--------|------|-----------|----------|\r\n| gzip | 높음 | 느림 | 높음 | 네트워크 대역폭 제한 |\r\n| snappy | 중간 | 빠름 | 낮음 | 일반적 사용 |\r\n| lz4 | 중간 | 매우 빠름 | 낮음 | 고성능 권장 |\r\n| zstd | 높음 | 빠름 | 중간 | 균형 잡힌 선택 |\r\n\r\n**설정 방법**\r\n```properties\r\n# Producer 설정\r\ncompression.type=lz4\r\n\r\n# Broker 설정 (선택)\r\ncompression.type=producer  # Producer 설정 유지\r\n```\r\n\r\n**장단점 상세**\r\n\r\n**gzip**\r\n- 장점: 최고 압축률, 범용 호환성\r\n- 단점: CPU 집약적, 지연시간 증가\r\n\r\n**snappy**\r\n- 장점: 빠른 압축/해제, 낮은 CPU\r\n- 단점: 압축률 상대적으로 낮음\r\n\r\n**lz4**\r\n- 장점: 가장 빠른 속도, 매우 낮은 CPU\r\n- 단점: gzip보다 낮은 압축률\r\n- 권장: 대부분의 프로덕션 환경\r\n\r\n**zstd**\r\n- 장점: 높은 압축률 + 적절한 속도\r\n- 단점: 구버전 호환성 이슈",
    "references": [
      {
        "title": "Apache Kafka Documentation - Compression",
        "url": "https://kafka.apache.org/documentation/#producerconfigs_compression.type"
      }
    ]
  },
  {
    "id": "KAFKA-033",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "메시지 처리 중 오류가 발생했을 때의 처리 전략(예: DLQ 도입 등)에 대해 설명해주세요.",
    "answer": "**에러 처리 전략**\r\n\r\n1. **재시도 (Retry)**\r\n```java\r\n// 지수 백오프로 재시도\r\nint retries = 3;\r\nwhile (retries-- > 0) {\r\n    try {\r\n        process(record);\r\n        break;\r\n    } catch (RetryableException e) {\r\n        Thread.sleep(backoff);\r\n    }\r\n}\r\n```\r\n\r\n2. **Dead Letter Queue (DLQ)**\r\n```java\r\ntry {\r\n    process(record);\r\n} catch (Exception e) {\r\n    // DLQ 토픽으로 전송\r\n    producer.send(new ProducerRecord<>(\"dlq-topic\",\r\n        record.key(), record.value()));\r\n    consumer.commitSync();\r\n}\r\n```\r\n\r\n3. **에러 토픽 분리**\r\n- 재시도 가능 에러 → retry-topic\r\n- 영구 실패 → dlq-topic\r\n\r\n4. **Skip/Ignore**\r\n- 로깅 후 다음 메시지 처리\r\n- 중요도 낮은 데이터에 적용\r\n\r\n**DLQ 구현 모범 사례**\r\n- 원본 메시지 + 에러 정보 저장\r\n- 헤더에 원본 토픽, 파티션, 오프셋 포함\r\n- DLQ 모니터링 및 알림 설정\r\n- 재처리 도구 준비\r\n\r\n**Spring Kafka 예시**\r\n```java\r\n@KafkaListener(topics = \"my-topic\")\r\n@RetryableTopic(attempts = \"3\", backoff = @Backoff(delay = 1000))\r\npublic void listen(String message) {\r\n    // 자동 재시도 및 DLQ 전송\r\n}\r\n```",
    "references": [
      {
        "title": "Apache Kafka Documentation - Error Handling",
        "url": "https://kafka.apache.org/documentation/#consumerconfigs"
      }
    ]
  },
  {
    "id": "KAFKA-034",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka 클러스터 확장(Scale-out) 시 고려해야 할 모범 사례는 무엇인가요?",
    "answer": "**브로커 추가 시 고려사항**\r\n\r\n1. **파티션 재분배**\r\n```bash\r\n# 재분배 계획 생성\r\nkafka-reassign-partitions.sh --generate \\\r\n  --topics-to-move-json-file topics.json \\\r\n  --broker-list \"1,2,3,4\" \\\r\n  --bootstrap-server localhost:9092\r\n\r\n# 재분배 실행\r\nkafka-reassign-partitions.sh --execute \\\r\n  --reassignment-json-file plan.json\r\n```\r\n\r\n2. **점진적 확장**\r\n- 한 번에 하나의 브로커 추가\r\n- 네트워크 및 디스크 I/O 모니터링\r\n- 재분배 스로틀링 적용\r\n\r\n3. **스로틀 설정**\r\n```bash\r\nkafka-reassign-partitions.sh --execute \\\r\n  --throttle 50000000 \\  # 50MB/s 제한\r\n  --reassignment-json-file plan.json\r\n```\r\n\r\n**파티션 수 증가**\r\n- 운영 중 파티션 추가 가능 (감소 불가)\r\n- **함정 주의**: 키 기반 파티셔닝 시 파티션 추가하면 동일 키가 다른 파티션으로 라우팅됨\r\n  - 기존 데이터는 이전 파티션에, 새 데이터는 새 파티션에 저장\r\n  - 키별 순서 보장이 필요한 경우 파티션 추가 전 신중히 검토\r\n\r\n**모범 사례**\r\n- 충분한 초기 파티션 수 계획 (예상 최대 처리량의 2배 이상)\r\n- `auto.create.topics.enable=false` 권장 (의도치 않은 토픽 생성 방지)\r\n- Rack-awareness 설정으로 장애 도메인 분리 (`broker.rack`)\r\n- Leader 재분배 자동화 (`auto.leader.rebalance.enable=true`)\r\n\r\n**확장 전 체크리스트**\r\n- [ ] 디스크 용량 계획\r\n- [ ] 네트워크 대역폭 확인\r\n- [ ] ZooKeeper/KRaft 부하 검토\r\n- [ ] 클라이언트 연결 수 확인",
    "references": [
      {
        "title": "Apache Kafka Documentation - Adding Brokers",
        "url": "https://kafka.apache.org/documentation/#basic_ops_cluster_expansion"
      }
    ]
  },
  {
    "id": "KAFKA-035",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka에서 ZooKeeper 모드에서 KRaft 모드로 전환 시 고려해야 할 사항은 무엇인가요?",
    "answer": "**KRaft 전환 전 확인사항**\r\n- Kafka 버전 3.3 이상 (프로덕션 권장 3.5+ 마이그레이션, 3.6+ 신규 클러스터)\r\n- 모든 클라이언트 호환성 확인 (특히 AdminClient 버전)\r\n- 현재 ZooKeeper 클러스터 상태 정상 확인\r\n- 일부 기능은 KRaft에서 아직 미지원될 수 있으므로 사용 중인 기능 확인 필요\r\n\r\n**마이그레이션 절차**\r\n\r\n1. **메타데이터 스냅샷 생성**\r\n```bash\r\nkafka-metadata.sh --snapshot /path/to/snapshot \\\r\n  --cluster-id <cluster-id>\r\n```\r\n\r\n2. **KRaft Controller 구성**\r\n```properties\r\nprocess.roles=controller\r\nnode.id=100\r\ncontroller.quorum.voters=100@controller1:9093,101@controller2:9093\r\n```\r\n\r\n3. **점진적 전환**\r\n- 브로커를 하나씩 KRaft 모드로 재시작\r\n- Controller 쿼럼 구성\r\n- 마지막으로 ZooKeeper 연결 해제\r\n\r\n**고려사항**\r\n- **롤백 계획**: 전환 전 백업 필수\r\n- **다운타임**: 무중단 전환 도구 제공되나 테스트 필요\r\n- **기능 차이**: 일부 기능은 KRaft에서 다르게 동작\r\n- **모니터링**: 새로운 KRaft 관련 메트릭 추가\r\n\r\n**KRaft 장점**\r\n- 운영 단순화 (ZooKeeper 제거)\r\n- 빠른 컨트롤러 페일오버\r\n- 향상된 확장성 (수백만 파티션)\r\n\r\n**주의사항**\r\n- 기존 ACL, Config 마이그레이션 확인\r\n- 클라이언트 라이브러리 버전 호환성\r\n- 프로덕션 전 충분한 테스트",
    "references": [
      {
        "title": "Apache Kafka Documentation - ZooKeeper to KRaft Migration",
        "url": "https://kafka.apache.org/documentation/#kraft_zk_migration"
      }
    ]
  },
  {
    "id": "KAFKA-036",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka 메시지 전송 지연(latency)을 최소화하는 방법에는 어떤 것들이 있나요?",
    "answer": "**Producer 지연 최소화**\r\n```properties\r\nlinger.ms=0              # 즉시 전송 (배치 대기 없음)\r\nbatch.size=16384         # 작은 배치\r\nacks=1                   # Leader만 확인 (트레이드오프)\r\ncompression.type=none    # 압축 비활성화 (CPU 절약)\r\n```\r\n\r\n**Consumer 지연 최소화**\r\n```properties\r\nfetch.min.bytes=1                   # 즉시 fetch\r\nfetch.max.wait.ms=100               # 대기 시간 최소화\r\nmax.poll.records=100                # 빠른 처리 사이클\r\n```\r\n\r\n**Broker 튜닝**\r\n```properties\r\nnum.io.threads=8                    # I/O 스레드 증가\r\nnum.network.threads=3               # 네트워크 스레드\r\nsocket.send.buffer.bytes=102400\r\nsocket.receive.buffer.bytes=102400\r\n```\r\n\r\n**인프라 최적화**\r\n- SSD 스토리지 사용\r\n- Producer/Broker 네트워크 근접 배치\r\n- 낮은 레이턴시 네트워크 (10Gbps+)\r\n\r\n**파티션 전략**\r\n- 파티션 수 적정 유지 (과도한 파티션은 오버헤드)\r\n- 리더 균등 분배\r\n\r\n**모니터링 지표**\r\n- `produce-throttle-time`: Producer 스로틀링\r\n- `fetch-latency-avg`: Consumer fetch 지연\r\n- `request-latency-avg`: 전체 요청 지연\r\n\r\n**트레이드오프 요약**\r\n| 목표 | 희생되는 것 | 주요 설정 |\r\n|------|------------|----------|\r\n| 낮은 지연 | 처리량, 내구성 | linger.ms=0, acks=1 |\r\n| 높은 처리량 | 지연시간 | linger.ms=50+, batch.size 증가 |\r\n| 높은 내구성 | 지연시간, 처리량 | acks=all, min.insync.replicas=2 |\r\n\r\n**실제 운영 팁**\r\n- 지연시간 요구사항을 먼저 정의 (P99 < 10ms? 100ms?)\r\n- 요구사항 달성 후 처리량 최적화\r\n- 내구성은 데이터 중요도에 따라 결정",
    "references": [
      {
        "title": "Apache Kafka Documentation - Performance",
        "url": "https://kafka.apache.org/documentation/#configuration"
      }
    ]
  },
  {
    "id": "KAFKA-037",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka Producer의 Sync와 Async 전송 방식이 지연 및 성능에 미치는 영향과 각각의 장단점은 무엇인가요?",
    "answer": "**동기 전송 (Sync)**\r\n```java\r\n// 전송 완료까지 블로킹\r\nRecordMetadata metadata = producer.send(record).get();\r\nSystem.out.println(\"Sent to partition: \" + metadata.partition());\r\n```\r\n\r\n**장점**\r\n- 전송 성공/실패 즉시 확인\r\n- 순서 보장 용이\r\n- 에러 처리 직관적\r\n\r\n**단점**\r\n- 낮은 처리량 (매 전송마다 대기)\r\n- 네트워크 지연에 민감\r\n\r\n**비동기 전송 (Async)**\r\n```java\r\nproducer.send(record, (metadata, exception) -> {\r\n    if (exception != null) {\r\n        // 에러 처리\r\n        logger.error(\"Send failed\", exception);\r\n    } else {\r\n        // 성공 처리\r\n        logger.info(\"Sent to: \" + metadata.offset());\r\n    }\r\n});\r\n```\r\n\r\n**장점**\r\n- 높은 처리량 (병렬 전송)\r\n- 논블로킹으로 리소스 효율적\r\n- 배치 최적화 활용 가능\r\n\r\n**단점**\r\n- 에러 처리 복잡\r\n- 메모리 관리 필요 (버퍼 초과 시)\r\n- 순서 보장 어려움\r\n\r\n**선택 기준**\r\n| 상황 | 권장 방식 |\r\n|------|----------|\r\n| 고처리량 필요 | Async |\r\n| 엄격한 순서 보장 | Sync |\r\n| 실시간 에러 처리 | Sync |\r\n| 대량 데이터 전송 | Async + Callback |",
    "references": [
      {
        "title": "Apache Kafka Documentation - Producer API",
        "url": "https://kafka.apache.org/documentation/#producerapi"
      }
    ]
  },
  {
    "id": "KAFKA-038",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka 클러스터 운영 시 예상할 수 있는 장애와 그에 대한 대응 방안은 무엇인가요?",
    "answer": "**주요 장애 유형 및 대응**\r\n\r\n**1. 브로커 장애**\r\n- 증상: UnderReplicatedPartitions 증가\r\n- 대응:\r\n  - ISR에서 자동 리더 선출 확인\r\n  - 브로커 복구 또는 대체 브로커 투입\r\n  - `min.insync.replicas` 설정 확인\r\n\r\n**2. 디스크 장애**\r\n- 증상: 로그 쓰기 실패, 브로커 비정상\r\n- 대응:\r\n  - JBOD 구성 시 해당 디스크만 격리\r\n  - 파티션 재분배로 데이터 복구\r\n  - 디스크 교체 후 브로커 재시작\r\n\r\n**3. 네트워크 파티션**\r\n- 증상: 브로커 간 통신 실패, ISR 축소\r\n- 대응:\r\n  - 네트워크 장비 점검\r\n  - `unclean.leader.election.enable=false` 유지\r\n  - 분할 복구 후 데이터 정합성 확인\r\n\r\n**4. ZooKeeper/Controller 장애**\r\n- 증상: 메타데이터 업데이트 불가\r\n- 대응:\r\n  - ZooKeeper 앙상블 복구\r\n  - Controller 재선출 대기\r\n  - KRaft 전환 고려\r\n\r\n**5. Consumer Lag 급증**\r\n- 원인: 처리 병목, 파티션 불균형\r\n- 대응:\r\n  - Consumer 스케일 아웃\r\n  - 파티션 재분배\r\n  - 처리 로직 최적화\r\n\r\n**장애 대비 체크리스트**\r\n- [ ] 복제 계수 3 이상\r\n- [ ] 다중 AZ/랙 분산\r\n- [ ] 모니터링/알림 설정\r\n- [ ] 정기 DR 훈련",
    "references": [
      {
        "title": "Apache Kafka Documentation - Operations",
        "url": "https://kafka.apache.org/documentation/#operations"
      }
    ]
  },
  {
    "id": "KAFKA-039",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka Consumer Lag(지연) 모니터링 방법과 이를 해결하기 위한 전략은 무엇인가요?",
    "answer": "**Consumer Lag 개념**\r\n- 마지막 생산된 Offset과 마지막 소비된 Offset의 차이\r\n- Lag이 증가하면 Consumer가 Producer를 따라잡지 못함\r\n\r\n**모니터링 방법**\r\n\r\n1. **kafka-consumer-groups 명령**\r\n```bash\r\nkafka-consumer-groups.sh --bootstrap-server localhost:9092 \\\r\n  --describe --group my-consumer-group\r\n```\r\n\r\n2. **JMX 메트릭**\r\n- `records-lag-max`: 최대 Lag\r\n- `records-lag`: 파티션별 Lag\r\n\r\n3. **모니터링 도구**\r\n- Burrow (LinkedIn 오픈소스)\r\n- Prometheus + kafka_exporter\r\n- Confluent Control Center\r\n\r\n**Lag 해결 전략**\r\n\r\n1. **Consumer 확장**\r\n```bash\r\n# 파티션 수 = Consumer 수 확인\r\n# Consumer 인스턴스 추가\r\n```\r\n\r\n2. **처리 최적화**\r\n```properties\r\nmax.poll.records=500      # 배치 크기 조정\r\nfetch.max.bytes=52428800  # 50MB\r\n```\r\n\r\n3. **병렬 처리**\r\n```java\r\n// 메시지 처리를 스레드풀로 병렬화\r\nexecutor.submit(() -> process(record));\r\n```\r\n\r\n4. **파티션 증가**\r\n- 병렬 처리 단위 확대\r\n- Consumer 추가 여유 확보\r\n\r\n5. **일시적 해결 (주의 필요)**\r\n- Consumer Group 리셋 (건너뛴 메시지는 처리되지 않으므로 데이터 손실 가능)\r\n- `auto.offset.reset=latest`로 재시작\r\n\r\n**알림 설정 권장값**\r\n- Warning: Lag > 10,000 또는 지속적 증가 추세\r\n- Critical: Lag > 100,000 또는 처리량 대비 Lag 증가율이 높을 때\r\n\r\n**Lag 모니터링 함정 주의**\r\n- Lag 절대값보다 **추세**가 더 중요 (Lag이 높아도 감소 추세면 괜찮음)\r\n- 배포/재시작 직후 일시적 Lag 증가는 정상\r\n- 파티션별 Lag을 확인하여 특정 파티션 병목 식별 필요\r\n\r\n**근본 원인 해결**\r\n- 단순 Consumer 추가보다 처리 로직 최적화가 효과적인 경우도 많음\r\n- 외부 시스템(DB, API) 호출이 병목일 수 있음",
    "references": [
      {
        "title": "Apache Kafka Documentation - Consumer Lag",
        "url": "https://kafka.apache.org/documentation/#basic_ops_consumer_lag"
      }
    ]
  },
  {
    "id": "KAFKA-040",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka에서 데이터 일관성을 보장하는 방법은 무엇인가요?",
    "answer": "**일관성 보장 메커니즘**\r\n\r\n**1. 복제와 ISR**\r\n```properties\r\nreplication.factor=3\r\nmin.insync.replicas=2\r\n```\r\n- 최소 ISR 수 만족 시에만 쓰기 허용\r\n- Leader 장애 시 최신 데이터를 가진 복제본이 승격\r\n\r\n**2. Producer ACK 설정**\r\n```properties\r\nacks=all                    # 모든 ISR 복제 완료 확인\r\nenable.idempotence=true     # 중복 방지\r\n```\r\n\r\n**3. 트랜잭션**\r\n```java\r\nproducer.initTransactions();\r\ntry {\r\n    producer.beginTransaction();\r\n    producer.send(record1);\r\n    producer.send(record2);\r\n    producer.sendOffsetsToTransaction(offsets, consumerGroupId);\r\n    producer.commitTransaction();\r\n} catch (Exception e) {\r\n    producer.abortTransaction();\r\n}\r\n```\r\n\r\n**4. Consumer 격리 수준**\r\n```properties\r\nisolation.level=read_committed  # 커밋된 트랜잭션만 읽기\r\n```\r\n\r\n**5. 순서 보장**\r\n- 단일 파티션 내 순서 보장\r\n- 키 기반 파티셔닝으로 관련 메시지 동일 파티션\r\n\r\n**일관성 vs 가용성 트레이드오프 (CAP 정리 관점)**\r\n\r\nKafka는 네트워크 파티션(P) 발생 시 일관성(C)과 가용성(A) 사이에서 선택해야 합니다.\r\n\r\n| 설정 | 일관성 | 가용성 | 선택 권장 상황 |\r\n|------|--------|--------|----------------|\r\n| acks=all, min.insync.replicas=2 | 높음 | 중간 | 금융, 주문 등 데이터 손실 불가 |\r\n| acks=1 | 중간 | 높음 | 일반 애플리케이션 |\r\n| unclean.leader.election=true | 낮음 | 높음 | 가용성이 데이터 일관성보다 중요한 경우 |\r\n\r\n**실제 운영에서의 고려사항**\r\n- 모든 설정을 최고 수준(acks=all, ISR=2, RF=3)으로 하면 비용과 지연시간 증가\r\n- 데이터 중요도에 따라 토픽별로 다른 설정 적용 가능\r\n- 장애 시나리오별 영향 분석 후 결정",
    "references": [
      {
        "title": "Apache Kafka Documentation - Semantics",
        "url": "https://kafka.apache.org/documentation/#semantics"
      }
    ]
  },
  {
    "id": "KAFKA-041",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Producer의 배치 전송(batch sending) 설정이 성능에 미치는 영향에 대해 설명해주세요.",
    "answer": "**배치 관련 설정**\r\n\r\n```properties\r\nbatch.size=16384      # 배치 최대 크기 (bytes)\r\nlinger.ms=0           # 배치 대기 시간 (ms)\r\nbuffer.memory=33554432 # 전체 버퍼 메모리\r\n```\r\n\r\n**성능 영향**\r\n\r\n**batch.size 증가**\r\n- 장점: 네트워크 오버헤드 감소, 높은 처리량\r\n- 단점: 메모리 사용량 증가, 첫 메시지 지연\r\n- 권장: 64KB ~ 256KB\r\n\r\n**linger.ms 증가**\r\n- 장점: 배치 채움률 향상, 압축 효율 증가\r\n- 단점: 지연 시간 증가\r\n- 권장: 5ms ~ 100ms (처리량 중시)\r\n\r\n**조합 예시**\r\n\r\n| 시나리오 | batch.size | linger.ms | 효과 |\r\n|----------|------------|-----------|------|\r\n| 저지연 | 16KB | 0 | 즉시 전송 |\r\n| 고처리량 | 128KB | 50ms | 배치 최적화 |\r\n| 균형 | 64KB | 10ms | 적절한 균형 |\r\n\r\n**압축과의 연계**\r\n```properties\r\ncompression.type=lz4   # 배치 단위 압축\r\n```\r\n- 큰 배치 + 압축 = 높은 네트워크 효율\r\n\r\n**모니터링 지표**\r\n- `batch-size-avg`: 평균 배치 크기\r\n- `record-queue-time-avg`: 배치 대기 시간\r\n- `compression-rate-avg`: 압축률",
    "references": [
      {
        "title": "Apache Kafka Documentation - Producer Batching",
        "url": "https://kafka.apache.org/documentation/#producerconfigs_batch.size"
      }
    ]
  },
  {
    "id": "KAFKA-042",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka Consumer의 오프셋 커밋 전략(자동 vs 수동 커밋)과 메시지 처리 보장 수준에 대해 설명해주세요.",
    "answer": "**자동 커밋 (Auto Commit)**\r\n```properties\r\nenable.auto.commit=true\r\nauto.commit.interval.ms=5000\r\n```\r\n\r\n**장점**\r\n- 구현 간단\r\n- 개발자 관리 부담 없음\r\n\r\n**단점**\r\n- 메시지 손실 위험 (처리 전 커밋)\r\n- 중복 처리 가능 (커밋 후 처리 실패)\r\n\r\n**수동 커밋 (Manual Commit)**\r\n```properties\r\nenable.auto.commit=false\r\n```\r\n\r\n**동기 커밋**\r\n```java\r\nconsumer.poll(Duration.ofMillis(100));\r\nprocess(records);\r\nconsumer.commitSync();  // 블로킹\r\n```\r\n\r\n**비동기 커밋**\r\n```java\r\nconsumer.commitAsync((offsets, exception) -> {\r\n    if (exception != null) {\r\n        log.error(\"Commit failed\", exception);\r\n    }\r\n});\r\n```\r\n\r\n**혼합 전략 (권장)**\r\n```java\r\ntry {\r\n    while (running) {\r\n        ConsumerRecords records = consumer.poll(Duration.ofMillis(100));\r\n        process(records);\r\n        consumer.commitAsync();  // 일반적으로 비동기\r\n    }\r\n} finally {\r\n    consumer.commitSync();  // 종료 시 동기\r\n    consumer.close();\r\n}\r\n```\r\n\r\n**커밋 전략 비교**\r\n| 전략 | 메시지 손실 | 중복 처리 | 성능 |\r\n|------|-----------|----------|------|\r\n| 자동 커밋 | 가능 | 가능 | 높음 |\r\n| 처리 후 커밋 | 없음 | 가능 | 중간 |\r\n| 커밋 후 처리 | 가능 | 없음 | 중간 |\r\n\r\n**운영 환경 권장사항**\r\n- **at-least-once 보장 (대부분의 경우)**: 처리 완료 후 커밋 + Consumer 측 멱등성 처리\r\n- **at-most-once 보장 (드문 경우)**: 커밋 후 처리. 중복보다 손실이 나은 경우에만\r\n- **exactly-once 보장**: Kafka Transactions 사용 또는 Kafka Streams의 `exactly_once_v2`\r\n\r\n**함정 주의**: 자동 커밋은 `poll()` 호출 시 이전 `poll()`의 오프셋을 커밋함. 따라서 `poll()` 직후 장애 시 아직 처리되지 않은 메시지의 오프셋이 커밋될 수 있음",
    "references": [
      {
        "title": "Apache Kafka Documentation - Offset Management",
        "url": "https://kafka.apache.org/documentation/#consumerconfigs_enable.auto.commit"
      }
    ]
  },
  {
    "id": "KAFKA-043",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka에서 에러 처리를 위한 Dead Letter Queue(DLQ) 패턴을 구현하는 방법은 무엇인가요?",
    "answer": "**DLQ 구현 패턴**\r\n\r\n**1. 기본 DLQ 구현**\r\n```java\r\nwhile (true) {\r\n    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));\r\n    for (ConsumerRecord<String, String> record : records) {\r\n        try {\r\n            processMessage(record);\r\n        } catch (Exception e) {\r\n            // DLQ로 전송\r\n            ProducerRecord<String, String> dlqRecord = new ProducerRecord<>(\r\n                \"my-topic.DLQ\",\r\n                record.key(),\r\n                record.value()\r\n            );\r\n            // 원본 정보를 헤더에 추가\r\n            dlqRecord.headers()\r\n                .add(\"original-topic\", record.topic().getBytes())\r\n                .add(\"original-partition\", String.valueOf(record.partition()).getBytes())\r\n                .add(\"original-offset\", String.valueOf(record.offset()).getBytes())\r\n                .add(\"error-message\", e.getMessage().getBytes());\r\n\r\n            dlqProducer.send(dlqRecord);\r\n        }\r\n    }\r\n    consumer.commitSync();\r\n}\r\n```\r\n\r\n**2. 재시도 토픽 + DLQ 패턴**\r\n```\r\nmain-topic → retry-topic-1 → retry-topic-2 → DLQ\r\n              (1분 후)        (5분 후)      (최종 실패)\r\n```\r\n\r\n**3. Spring Kafka 활용**\r\n```java\r\n@KafkaListener(topics = \"my-topic\")\r\n@RetryableTopic(\r\n    attempts = \"4\",\r\n    backoff = @Backoff(delay = 1000, multiplier = 2),\r\n    dltTopicSuffix = \".DLQ\"\r\n)\r\npublic void listen(String message) {\r\n    process(message);\r\n}\r\n\r\n@DltHandler\r\npublic void handleDlt(String message) {\r\n    log.error(\"DLQ received: \" + message);\r\n}\r\n```\r\n\r\n**DLQ 운영 모범 사례**\r\n- DLQ 토픽 별도 모니터링 및 알림 (DLQ에 메시지가 쌓이면 즉시 인지)\r\n- 메시지 원본 정보 보존 (헤더에 원본 토픽, 오프셋, 에러 메시지, 타임스탬프 포함)\r\n- DLQ 메시지 재처리 도구 준비 (수동 재처리, 자동 재시도 등)\r\n- DLQ 보존 기간 충분히 설정 (원본 토픽보다 길게)\r\n\r\n**DLQ vs 재시도 토픽 트레이드오프**\r\n- 재시도 토픽 사용: 자동 복구 가능, 하지만 무한 재시도로 리소스 낭비 가능\r\n- DLQ 직행: 수동 개입 필요, 하지만 일시적 오류도 DLQ로 이동\r\n- 권장: 제한된 횟수 재시도 후 DLQ로 이동 (예: 3회 재시도 후 DLQ)\r\n\r\n**함정 주의**: DLQ 메시지 재처리 시 순서가 보장되지 않음. 순서가 중요한 경우 별도 처리 필요",
    "references": [
      {
        "title": "Apache Kafka Documentation - Error Handling",
        "url": "https://kafka.apache.org/documentation/"
      }
    ]
  },
  {
    "id": "KAFKA-044",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka 메시지 스키마 관리(Schema Registry)의 역할과 필요성은 무엇인가요?",
    "answer": "**Schema Registry 역할**\r\n- 메시지 스키마(Avro, Protobuf, JSON Schema)를 중앙 저장소에서 관리\r\n- Producer/Consumer 간 스키마 호환성 보장\r\n- 스키마 버전 관리 및 진화 지원\r\n\r\n**필요성**\r\n1. **데이터 계약**: Producer/Consumer 간 명확한 데이터 형식 정의\r\n2. **호환성 검증**: 스키마 변경 시 하위/상위 호환성 자동 검증\r\n3. **효율적 직렬화**: 스키마 ID만 전송하여 페이로드 크기 감소\r\n4. **스키마 진화**: 필드 추가/삭제 시 기존 Consumer 영향 최소화\r\n\r\n**호환성 모드**\r\n| 모드 | 설명 | 허용되는 변경 |\r\n|------|------|--------------|\r\n| BACKWARD | 새 스키마로 이전 데이터 읽기 가능 | 필드 삭제, default 있는 필드 추가 |\r\n| FORWARD | 이전 스키마로 새 데이터 읽기 가능 | 필드 추가, default 있는 필드 삭제 |\r\n| FULL | 양방향 호환 | default 있는 필드 추가/삭제만 가능 |\r\n| NONE | 호환성 검사 없음 | 모든 변경 가능 (위험) |\r\n\r\n**트레이드오프**\r\n- BACKWARD (기본값, 권장): Consumer를 먼저 업데이트해야 함, 안전한 배포\r\n- FORWARD: Producer를 먼저 업데이트해야 함\r\n- FULL: 가장 안전하지만 변경 제약이 큼\r\n- NONE: 유연하지만 런타임 오류 위험\r\n\r\n**사용 예시 (Avro)**\r\n```java\r\n// Producer\r\nprops.put(\"schema.registry.url\", \"http://localhost:8081\");\r\nprops.put(\"value.serializer\", KafkaAvroSerializer.class);\r\n\r\nGenericRecord record = new GenericData.Record(schema);\r\nrecord.put(\"name\", \"John\");\r\nproducer.send(new ProducerRecord<>(\"users\", record));\r\n```\r\n\r\n**모범 사례**\r\n- BACKWARD 또는 FULL 호환성 사용\r\n- 필드 삭제 시 default 값 설정\r\n- CI/CD에서 스키마 호환성 테스트",
    "references": [
      {
        "title": "Confluent Schema Registry Documentation",
        "url": "https://docs.confluent.io/platform/current/schema-registry/"
      }
    ]
  },
  {
    "id": "KAFKA-045",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka와 NoSQL 데이터베이스를 연동할 때 고려해야 할 사항은 무엇인가요?",
    "answer": "**연동 방식**\r\n\r\n1. **Kafka Connect 활용**\r\n```json\r\n{\r\n  \"name\": \"mongodb-sink\",\r\n  \"config\": {\r\n    \"connector.class\": \"com.mongodb.kafka.connect.MongoSinkConnector\",\r\n    \"connection.uri\": \"mongodb://localhost:27017\",\r\n    \"database\": \"mydb\",\r\n    \"collection\": \"events\",\r\n    \"topics\": \"my-topic\"\r\n  }\r\n}\r\n```\r\n\r\n2. **Consumer 직접 구현**\r\n```java\r\nwhile (true) {\r\n    ConsumerRecords records = consumer.poll(Duration.ofMillis(100));\r\n    List<Document> batch = new ArrayList<>();\r\n    for (ConsumerRecord record : records) {\r\n        batch.add(Document.parse(record.value()));\r\n    }\r\n    mongoCollection.insertMany(batch);  // 배치 삽입\r\n    consumer.commitSync();\r\n}\r\n```\r\n\r\n**고려사항**\r\n\r\n**1. 일관성**\r\n- 트랜잭션 미지원 NoSQL: 멱등성 설계 필수\r\n- 중복 메시지 처리 로직 (upsert 활용)\r\n\r\n**2. 성능**\r\n- 배치 쓰기로 처리량 향상\r\n- 인덱스 설계 최적화\r\n- 백프레셔 처리\r\n\r\n**3. 스키마 관리**\r\n- Schema Registry로 데이터 형식 관리\r\n- NoSQL 유연한 스키마와의 조화\r\n\r\n**4. 에러 처리**\r\n- 재시도 로직 구현\r\n- DLQ 활용\r\n- 커넥션 풀 관리\r\n\r\n**5. 확장성**\r\n- 파티션 수와 Consumer 병렬성\r\n- NoSQL 샤딩 전략과 조화\r\n\r\n**데이터베이스별 권장 Connector**\r\n- MongoDB: MongoDB Kafka Connector\r\n- Cassandra: DataStax Connector\r\n- Elasticsearch: Confluent Elasticsearch Sink\r\n- Redis: Redis Sink Connector",
    "references": [
      {
        "title": "Apache Kafka Documentation - Connect",
        "url": "https://kafka.apache.org/documentation/#connect"
      }
    ]
  },
  {
    "id": "KAFKA-046",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka Streams의 상태 저장소(State Store) 관리 방식에 대해 설명해주세요.",
    "answer": "**State Store 개념**\r\n- Kafka Streams에서 상태가 필요한 연산(집계, 조인 등)을 위한 로컬 저장소\r\n- 기본적으로 RocksDB 사용 (in-memory 옵션도 가능)\r\n\r\n**State Store 유형**\r\n1. **KeyValueStore**: 키-값 저장\r\n2. **WindowStore**: 시간 윈도우별 키-값 저장\r\n3. **SessionStore**: 세션 기반 키-값 저장\r\n\r\n**내부 동작 방식**\r\n```\r\nInput Topic → State Store (RocksDB) ← Changelog Topic\r\n                    ↓\r\n              Output Topic\r\n```\r\n\r\n**Changelog Topic**\r\n- State Store 변경사항을 Kafka 토픽에 기록\r\n- 장애 복구 시 상태 재구축에 사용\r\n- 자동 생성됨 (application.id-storename-changelog)\r\n\r\n**설정 예시**\r\n```java\r\nStreamsBuilder builder = new StreamsBuilder();\r\nbuilder.stream(\"input-topic\")\r\n    .groupByKey()\r\n    .count(Materialized.<String, Long, KeyValueStore<Bytes, byte[]>>as(\"count-store\")\r\n        .withKeySerde(Serdes.String())\r\n        .withValueSerde(Serdes.Long()));\r\n```\r\n\r\n**관리 방법**\r\n```properties\r\n# State 디렉토리 설정\r\nstate.dir=/var/kafka-streams\r\n\r\n# Standby 복제본 (빠른 복구)\r\nnum.standby.replicas=1\r\n```\r\n\r\n**상태 복구**\r\n1. Changelog 토픽에서 상태 재구축\r\n2. Standby 복제본이 있으면 빠른 복구\r\n\r\n**모범 사례**\r\n- 충분한 로컬 디스크 공간 확보\r\n- Standby 복제본 설정으로 복구 시간 단축\r\n- State Store 크기 모니터링",
    "references": [
      {
        "title": "Apache Kafka Documentation - Streams State",
        "url": "https://kafka.apache.org/documentation/streams/developer-guide/processor-api#state-stores"
      }
    ]
  },
  {
    "id": "KAFKA-047",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka를 활용한 마이크로서비스 아키텍처 설계 사례에 대해 설명해주세요.",
    "answer": "**이벤트 기반 마이크로서비스 패턴**\r\n\r\n**1. 이벤트 소싱 (Event Sourcing)**\r\n```\r\n주문 서비스 → order-events 토픽 → 재고 서비스\r\n                              → 결제 서비스\r\n                              → 알림 서비스\r\n```\r\n- 모든 상태 변경을 이벤트로 저장\r\n- 이벤트 재생으로 상태 복원 가능\r\n\r\n**2. CQRS (Command Query Responsibility Segregation)**\r\n```\r\n명령(Write) → Command Topic → Write Service → Event Topic\r\n                                                   ↓\r\n조회(Read) ← Read Service ← Materialized View ←───┘\r\n```\r\n- 쓰기와 읽기 모델 분리\r\n- 읽기 최적화된 뷰 구성\r\n\r\n**3. Saga 패턴 (분산 트랜잭션)**\r\n```\r\nOrder Created → Payment Processed → Inventory Reserved → Order Completed\r\n      ↓ (실패 시)        ↓ (실패 시)         ↓ (실패 시)\r\nOrder Cancelled ← Payment Refunded ← Inventory Released\r\n```\r\n- 보상 트랜잭션으로 일관성 유지\r\n\r\n**토픽 설계**\r\n```\r\nservices/\r\n├── order-events        # 도메인 이벤트\r\n├── order-commands      # 명령 메시지\r\n├── order-dlq           # 실패 메시지\r\n└── order-notifications # 알림 이벤트\r\n```\r\n\r\n**구현 예시**\r\n```java\r\n// 주문 서비스\r\n@KafkaListener(topics = \"order-commands\")\r\npublic void handleOrder(OrderCommand cmd) {\r\n    Order order = processOrder(cmd);\r\n    kafkaTemplate.send(\"order-events\", new OrderCreatedEvent(order));\r\n}\r\n\r\n// 재고 서비스\r\n@KafkaListener(topics = \"order-events\")\r\npublic void onOrderCreated(OrderCreatedEvent event) {\r\n    inventoryService.reserve(event.getItems());\r\n}\r\n```\r\n\r\n**모범 사례**\r\n- 이벤트 스키마 버전 관리 (Schema Registry 활용)\r\n- 멱등성 처리 필수 (동일 이벤트 재처리해도 결과 동일)\r\n- 서비스별 Consumer Group 분리\r\n- 이벤트 순서 의존성 최소화 설계\r\n\r\n**마이크로서비스에서의 Kafka 트레이드오프**\r\n- **이벤트 기반**: 느슨한 결합, 확장성 우수 vs 디버깅 어려움, 최종 일관성만 보장\r\n- **동기 API 호출**: 단순함, 강한 일관성 vs 높은 결합도, 장애 전파\r\n- Saga 패턴: 분산 트랜잭션 대안 vs 구현 복잡도 증가\r\n\r\n**실제 운영 고려사항**\r\n- 이벤트 재처리로 인한 부작용 방지 (멱등한 핸들러 설계)\r\n- 서비스 간 이벤트 스키마 계약 관리\r\n- 장애 시 보상 트랜잭션 설계",
    "references": [
      {
        "title": "Apache Kafka Documentation - Use Cases",
        "url": "https://kafka.apache.org/documentation/#uses"
      }
    ]
  },
  {
    "id": "KAFKA-048",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka 클러스터에 새로운 브로커를 추가할 때 고려해야 할 주요 요소는 무엇인가요?",
    "answer": "**브로커 추가 절차**\r\n\r\n1. **새 브로커 설정**\r\n```properties\r\nbroker.id=4                    # 고유 ID\r\nlog.dirs=/var/kafka-logs\r\nzookeeper.connect=zk1:2181,zk2:2181,zk3:2181\r\n# 또는 KRaft 모드\r\ncontroller.quorum.voters=1@controller1:9093\r\n```\r\n\r\n2. **브로커 시작**\r\n```bash\r\nkafka-server-start.sh config/server.properties\r\n```\r\n\r\n3. **파티션 재분배** (선택)\r\n```bash\r\n# 재분배 계획 생성\r\nkafka-reassign-partitions.sh --generate \\\r\n  --topics-to-move-json-file topics.json \\\r\n  --broker-list \"1,2,3,4\"\r\n\r\n# 실행\r\nkafka-reassign-partitions.sh --execute \\\r\n  --reassignment-json-file plan.json \\\r\n  --throttle 50000000\r\n```\r\n\r\n**고려 요소**\r\n\r\n**1. 하드웨어 일관성**\r\n- 기존 브로커와 동일한 사양 권장\r\n- 디스크 용량, 네트워크 대역폭 확인\r\n\r\n**2. 네트워크 구성**\r\n- 기존 브로커와 동일 네트워크 세그먼트\r\n- 방화벽 규칙 확인 (9092, 9093 포트)\r\n\r\n**3. 파티션 재분배**\r\n- 자동 분배되지 않음 (수동 재분배 필요)\r\n- 스로틀링으로 성능 영향 최소화\r\n- 피크 시간 외 수행\r\n\r\n**4. Rack Awareness**\r\n```properties\r\nbroker.rack=rack1\r\n```\r\n- 장애 도메인 분산\r\n\r\n**5. 모니터링**\r\n- 새 브로커 메트릭 수집 확인\r\n- 리더 분배 균형 확인\r\n- Under-replicated 파티션 없음 확인",
    "references": [
      {
        "title": "Apache Kafka Documentation - Adding Servers",
        "url": "https://kafka.apache.org/documentation/#basic_ops_cluster_expansion"
      }
    ]
  },
  {
    "id": "KAFKA-049",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka 커넥터(Connector) 개발 및 커스터마이징 방법에 대해 설명해주세요.",
    "answer": "**커넥터 유형**\r\n- **Source Connector**: 외부 시스템 → Kafka\r\n- **Sink Connector**: Kafka → 외부 시스템\r\n\r\n**Source Connector 개발**\r\n```java\r\npublic class MySourceConnector extends SourceConnector {\r\n    @Override\r\n    public void start(Map<String, String> props) {\r\n        // 설정 초기화\r\n    }\r\n\r\n    @Override\r\n    public Class<? extends Task> taskClass() {\r\n        return MySourceTask.class;\r\n    }\r\n\r\n    @Override\r\n    public List<Map<String, String>> taskConfigs(int maxTasks) {\r\n        // 태스크 설정 분배\r\n        return configs;\r\n    }\r\n}\r\n\r\npublic class MySourceTask extends SourceTask {\r\n    @Override\r\n    public List<SourceRecord> poll() {\r\n        // 외부 시스템에서 데이터 읽기\r\n        return Arrays.asList(\r\n            new SourceRecord(\r\n                sourcePartition, sourceOffset,\r\n                \"target-topic\", Schema.STRING_SCHEMA, value\r\n            )\r\n        );\r\n    }\r\n}\r\n```\r\n\r\n**Sink Connector 개발**\r\n```java\r\npublic class MySinkTask extends SinkTask {\r\n    @Override\r\n    public void put(Collection<SinkRecord> records) {\r\n        for (SinkRecord record : records) {\r\n            // 외부 시스템에 데이터 쓰기\r\n            externalSystem.write(record.value());\r\n        }\r\n    }\r\n\r\n    @Override\r\n    public void flush(Map<TopicPartition, OffsetAndMetadata> offsets) {\r\n        // 버퍼 플러시\r\n    }\r\n}\r\n```\r\n\r\n**커스터마이징 포인트**\r\n1. **변환 (SMT - Single Message Transform)**\r\n```json\r\n{\r\n  \"transforms\": \"addTimestamp\",\r\n  \"transforms.addTimestamp.type\": \"org.apache.kafka.connect.transforms.InsertField$Value\",\r\n  \"transforms.addTimestamp.timestamp.field\": \"processed_at\"\r\n}\r\n```\r\n\r\n2. **에러 처리**\r\n```json\r\n{\r\n  \"errors.tolerance\": \"all\",\r\n  \"errors.deadletterqueue.topic.name\": \"my-dlq\"\r\n}\r\n```\r\n\r\n**배포**\r\n```bash\r\n# JAR 파일을 플러그인 디렉토리에 배치\r\nplugin.path=/usr/share/kafka-connect-plugins\r\n```",
    "references": [
      {
        "title": "Apache Kafka Documentation - Connect Development",
        "url": "https://kafka.apache.org/documentation/#connect_development"
      }
    ]
  },
  {
    "id": "KAFKA-050",
    "category": "kafka",
    "categoryName": "Kafka",
    "section": "infra",
    "question": "Kafka 운영 시 모니터링과 경보 시스템 설정 시 중요한 핵심 지표는 무엇인가요?",
    "answer": "**브로커 핵심 지표**\r\n\r\n| 지표 | 설명 | 임계값 |\r\n|------|------|--------|\r\n| UnderReplicatedPartitions | 복제 지연 파티션 | > 0 경고 |\r\n| OfflinePartitionsCount | 오프라인 파티션 | > 0 위험 |\r\n| ActiveControllerCount | 활성 컨트롤러 | != 1 위험 |\r\n| RequestsPerSec | 요청 처리량 | 용량 대비 |\r\n| NetworkProcessorAvgIdlePercent | 네트워크 스레드 유휴율 | < 30% 경고 |\r\n| RequestHandlerAvgIdlePercent | 요청 핸들러 유휴율 | < 30% 경고 |\r\n\r\n**Producer 지표**\r\n| 지표 | 설명 | 임계값 |\r\n|------|------|--------|\r\n| record-error-rate | 전송 실패율 | > 0 경고 |\r\n| record-send-rate | 전송 처리량 | 모니터링 |\r\n| request-latency-avg | 평균 지연시간 | > 100ms 경고 |\r\n\r\n**Consumer 지표**\r\n| 지표 | 설명 | 임계값 |\r\n|------|------|--------|\r\n| records-lag-max | 최대 Consumer Lag | 증가 추세 경고 |\r\n| fetch-rate | 소비 처리량 | 모니터링 |\r\n| commit-latency-avg | 커밋 지연시간 | > 50ms 경고 |\r\n\r\n**시스템 지표**\r\n- CPU 사용률 (< 70%)\r\n- 메모리 사용률\r\n- 디스크 사용률 (< 80%)\r\n- 네트워크 I/O\r\n\r\n**알림 설정 예시 (Prometheus)**\r\n```yaml\r\ngroups:\r\n- name: kafka\r\n  rules:\r\n  - alert: KafkaUnderReplicatedPartitions\r\n    expr: kafka_server_replicamanager_underreplicatedpartitions > 0\r\n    for: 5m\r\n    labels:\r\n      severity: warning\r\n\r\n  - alert: KafkaConsumerLagHigh\r\n    expr: kafka_consumer_group_lag > 10000\r\n    for: 10m\r\n    labels:\r\n      severity: warning\r\n```",
    "references": [
      {
        "title": "Apache Kafka Documentation - Monitoring",
        "url": "https://kafka.apache.org/documentation/#monitoring"
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { infraData };
}
