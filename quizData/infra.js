const infraData = [
  {
    "id": "DOCKER-001",
    "category": "docker",
    "categoryName": "Docker",
    "section": "infra",
    "question": "Docker란 무엇이며, 컨테이너 기술이 등장하게 된 배경을 설명해 주세요.",
    "answer": "Docker는 애플리케이션을 컨테이너라는 격리된 환경에서 실행할 수 있게 해주는 오픈소스 플랫폼입니다.\n\n컨테이너 기술 등장 배경:\n환경 불일치 문제: \"내 컴퓨터에서는 되는데\" 문제 해결 필요\n리소스 효율성: VM의 무거운 오버헤드 대비 경량화된 가상화 필요\n배포 속도: 빠른 애플리케이션 배포 및 스케일링 요구 증가\n마이크로서비스: 서비스 단위 독립적 배포 및 관리 필요성",
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
    "answer": "구분   컨테이너   가상 머신\n\n가상화 레벨   OS 레벨 (커널 공유)   하드웨어 레벨\nGuest OS   불필요   각 VM마다 필요\n크기   MB 단위   GB 단위\n시작 시간   초 단위   분 단위\n격리 수준   프로세스 격리   완전한 격리\n성능   네이티브에 가까움   하이퍼바이저 오버헤드\n\n트레이드오프:\n컨테이너 장점: 빠른 시작, 적은 리소스, 높은 밀도, 이식성\n컨테이너 단점: 커널 공유로 인한 보안 경계가 VM보다 약함, 다른 OS 커널(예: Linux 컨테이너를 Windows에서 직접 실행) 불가\nVM 장점: 완전한 하드웨어 격리, 다른 OS 실행 가능, 강력한 보안 경계\nVM 단점: 무거운 오버헤드, 느린 부팅, 리소스 비효율\n\n실무 고려사항: 멀티테넌트 환경에서 강력한 격리가 필요하면 VM이나 gVisor/Kata Containers 같은 샌드박스 런타임 고려. 단일 조직 내 마이크로서비스라면 컨테이너가 효율적.",
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
    "answer": "Docker 이미지:\n읽기 전용 템플릿\n애플리케이션 실행에 필요한 모든 것(코드, 런타임, 라이브러리, 설정) 포함\n여러 레이어로 구성\n불변(Immutable)\n\nDocker 컨테이너:\n이미지의 실행 가능한 인스턴스\n이미지 위에 쓰기 가능한 레이어 추가\n생성, 시작, 중지, 삭제 가능\n격리된 프로세스로 실행\n\n비유하면, 이미지는 \"클래스\"이고 컨테이너는 \"인스턴스\"입니다.",
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
    "answer": "Docker 이미지는 여러 개의 읽기 전용 레이어로 구성됩니다. Dockerfile의 각 명령어(FROM, RUN, COPY 등)가 새로운 레이어를 생성합니다.\n\n장점:\n공간 효율성: 동일한 베이스 이미지를 사용하는 이미지들이 레이어를 공유\n빌드 속도 향상: 변경되지 않은 레이어는 캐시에서 재사용\n배포 효율성: 변경된 레이어만 전송하면 됨\n버전 관리: 각 레이어가 변경 이력을 나타냄\n\n트레이드오프 및 주의점:\n레이어 수 증가의 단점: 너무 많은 레이어는 이미지 pull/push 시 오버헤드 발생, 일부 스토리지 드라이버에서 성능 저하 (overlay2는 최대 128개 레이어 제한)\nCopy-on-Write(CoW) 비용: 컨테이너에서 파일 수정 시 전체 파일을 복사 후 수정하므로 대용량 파일 수정에 비효율적\n삭제된 파일의 레이어 잔존: 이전 레이어에서 생성된 파일을 삭제해도 이미지 크기는 줄지 않음 (whiteout 파일로 숨김 처리만 됨)\n\n컨테이너 실행 시 최상위에 쓰기 가능한 레이어가 추가됩니다(Copy-on-Write). 쓰기 작업이 빈번한 데이터는 볼륨 사용 권장.",
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
    "answer": "Namespace (격리):\nPID namespace: 프로세스 ID 격리\nNET namespace: 네트워크 인터페이스 격리\nMNT namespace: 파일 시스템 마운트 포인트 격리\nUTS namespace: 호스트명, 도메인명 격리\nIPC namespace: 프로세스 간 통신 격리\nUSER namespace: 사용자/그룹 ID 격리\n\ncgroups (리소스 제한):\nCPU, 메모리, 디스크 I/O, 네트워크 대역폭 등 리소스 사용량 제한\n리소스 사용량 모니터링\n프로세스 그룹 단위로 관리\n\nNamespace는 \"무엇을 볼 수 있는지\", cgroups는 \"얼마나 사용할 수 있는지\"를 제어합니다.\n\n중요한 보안 함정 - 커널 공유의 의미:\n모든 컨테이너가 호스트 커널을 공유하므로, 커널 취약점은 모든 컨테이너에 영향\nNamespace는 \"격리\"가 아닌 \"가시성 제한\"에 가까움 - 커널 레벨 공격에는 취약\n이것이 컨테이너가 VM보다 보안 경계가 약한 이유\n완화 방법: 커널 업데이트, seccomp/AppArmor/SELinux 적용, User Namespace 활성화, gVisor/Kata Containers 같은 샌드박스 런타임 사용",
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
    "answer": "Docker Daemon (dockerd):\nDocker API 요청을 수신하고 처리\n이미지, 컨테이너, 네트워크, 볼륨 등 Docker 객체 관리\n다른 데몬과 통신하여 Docker 서비스 관리\n\n통신 방식:\nUnix 소켓: /var/run/docker.sock (기본값, 로컬 통신)\nTCP 소켓: 원격 API 접근 시 사용 (TLS 권장)\nfd: systemd 소켓 활성화\n\n아키텍처:",
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
    "answer": "UnionFS란:\n여러 개의 파일 시스템(레이어)을 하나의 통합된 뷰로 마운트하는 파일 시스템입니다.\n\nDocker에서의 활용:\n여러 읽기 전용 이미지 레이어를 하나의 파일 시스템으로 표현\n최상위에 쓰기 가능한 컨테이너 레이어 추가\nCopy-on-Write(CoW) 전략으로 효율적인 스토리지 사용\n\n주요 구현체:\noverlay2: 현재 Docker 기본 스토리지 드라이버 (권장, Linux 커널 4.0+ 필요)\nfuse-overlayfs: Rootless 모드에서 사용\nbtrfs, zfs: 해당 파일 시스템 사용 시 선택\nvfs: 테스트용, CoW 미지원으로 매우 비효율적\n\n스토리지 드라이버 선택 트레이드오프:\noverlay2: 대부분의 경우 최선, 하지만 XFS에서 d_type=true 필요\nbtrfs/zfs: 스냅샷 기능 우수하나 설정 복잡성 증가\n운영 환경에서는 backing 파일시스템과 호환성 확인 필수",
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
    "answer": "Docker Hub:\nDocker 공식 퍼블릭 레지스트리\n공식 이미지, 커뮤니티 이미지 제공\n무료 플랜: 퍼블릭 무제한, 프라이빗 제한\n자동 빌드, 취약점 스캔 기능\n\n프라이빗 레지스트리:\n자체 호스팅 또는 클라우드 제공 (ECR, GCR, ACR 등)\n완전한 접근 제어\n내부 네트워크에서 빠른 이미지 전송\n규정 준수 및 보안 요구사항 충족\n\n사용 시나리오:\nDocker Hub: 오픈소스 프로젝트, 공개 이미지 배포, 개인 학습\n프라이빗: 기업 내부 애플리케이션, 민감한 코드, 규정 준수 필요 시",
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
    "answer": "OCI(Open Container Initiative):\nLinux Foundation 산하의 프로젝트로, 컨테이너 포맷과 런타임에 대한 개방형 표준을 정의합니다.\n\n주요 표준:\nRuntime Specification: 컨테이너 런타임 표준 (runc가 참조 구현)\nImage Specification: 이미지 포맷 표준\nDistribution Specification: 이미지 배포 표준\n\nDocker와의 관계:\nDocker가 OCI 설립에 참여하고 초기 기술 기여\nDocker의 컨테이너 런타임(runc)을 OCI에 기증\nDocker 이미지는 OCI 이미지 스펙과 호환\n이로 인해 Docker 이미지를 다른 OCI 호환 런타임(containerd, CRI-O 등)에서 실행 가능",
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
    "answer": "아키텍처 흐름:\n\ncontainerd:\n고수준 컨테이너 런타임\n이미지 전송 및 저장 관리\n컨테이너 실행 및 감독\n네트워크, 스토리지 관리\nCNCF 졸업 프로젝트\n\nrunc:\n저수준 컨테이너 런타임 (OCI 참조 구현)\n실제로 컨테이너 프로세스 생성 및 실행\nnamespace, cgroups 설정\n컨테이너 시작 후 종료됨\n\nDocker는 이 계층 구조를 통해 모듈화되어 있으며, Kubernetes도 containerd를 직접 사용할 수 있습니다.",
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
    "answer": "명령어   역할   특징\n\nFROM   베이스 이미지 지정   Dockerfile 시작점, 멀티스테이지 가능\nRUN   빌드 시 명령 실행   새 레이어 생성, 패키지 설치 등\nCMD   컨테이너 실행 시 기본 명령   docker run 인자로 덮어쓰기 가능\nENTRYPOINT   컨테이너 실행 시 고정 명령   CMD와 조합 가능, --entrypoint로 덮어쓰기 가능\nCOPY   파일/디렉토리 복사   로컬 파일만, 단순하고 명확\nADD   파일 복사 + 추가 기능   URL 다운로드, tar 자동 추출\n\n권장 사항:\n단순 복사는 COPY 사용 (명확성)\nADD는 tar 추출 필요 시에만 사용",
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
    "answer": "차이점:\n\n구분   CMD   ENTRYPOINT\n\n덮어쓰기   docker run 인자로 쉽게 덮어씀   --entrypoint 옵션 필요\n역할   기본 인자 제공   고정 실행 명령\n조합   ENTRYPOINT의 기본 인자로 사용 가능   CMD와 함께 사용 가능\n\n사용 예시:",
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
    "answer": "COPY:\n로컬 파일/디렉토리를 이미지로 복사\n단순하고 명확한 동작\n권장: 대부분의 경우 COPY 사용\n\nADD:\nCOPY의 모든 기능 포함\nURL에서 파일 다운로드 가능\ntar 아카이브 자동 추출\n\n사용 지침:\n\nADD 주의점:\nURL 다운로드보다 RUN curl 또는 RUN wget 권장 (레이어 최적화, 캐시 무효화 제어 가능)\n예상치 못한 tar 추출 발생 가능 (의도치 않은 파일 추출로 보안 위험)\nADD로 URL에서 다운로드 시 파일 권한을 600으로 설정하며 실행 권한 없음\n\nBest Practice: Docker 공식 문서에서는 대부분의 경우 COPY 사용을 권장하며, ADD는 로컬 tar 아카이브 자동 추출이 필요한 경우에만 사용하도록 권고",
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
    "answer": "멀티스테이지 빌드:\n하나의 Dockerfile에서 여러 FROM 문을 사용하여 빌드 단계를 분리하고, 최종 이미지에는 필요한 결과물만 포함시키는 기법입니다.\n\n장점:\n이미지 크기 감소: 빌드 도구, 소스코드 제외\n보안 향상: 불필요한 파일 미포함\nDockerfile 단순화: 하나의 파일로 빌드/실행 환경 관리\n빌드 캐시 활용: 각 스테이지별 캐시",
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
    "answer": "Go 예시:\n\nJava 예시:\n\n핵심 포인트:\nGo: scratch 또는 distroless 사용 가능 (정적 빌드)\nJava: JDK 대신 JRE 사용, Alpine 기반 선택",
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
    "answer": ".dockerignore 역할:\nDocker 빌드 시 빌드 컨텍스트에서 제외할 파일/디렉토리를 지정합니다.\n\n장점:\n빌드 컨텍스트 크기 감소 → 빌드 속도 향상\n불필요한 파일이 이미지에 포함되는 것 방지\n민감한 정보(credentials, .env) 제외\n\n예시:",
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
    "answer": "구분   ARG   ENV\n\n사용 시점   빌드 시에만   빌드 + 런타임\n설정 방법   --build-arg   -e 또는 docker run\n이미지 포함   값은 미포함, 이력에 노출 가능   이미지에 포함\n기본값   Dockerfile에서 지정 가능   Dockerfile에서 지정 가능\n스코프   FROM 이후 해당 빌드 스테이지 내에서만   모든 스테이지와 런타임에서\n\n예시:\n\nARG 스코프 함정 (자주 틀리는 부분):\n\n빌드 명령:\n\n보안 주의사항 (함정 질문):\nARG로 민감한 정보(비밀번호 등)를 전달하면 docker history로 노출됨\nENV도 마찬가지로 docker inspect로 노출됨\n해결책: 빌드 시 secrets가 필요하면 BuildKit의 --mount=type=secret 사용\n런타임 secrets는 Docker Swarm secrets나 외부 시크릿 관리 도구 사용",
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
    "answer": "WORKDIR 역할:\n이후 명령어(RUN, CMD, ENTRYPOINT, COPY, ADD)의 작업 디렉토리 설정\n디렉토리가 없으면 자동 생성\n절대/상대 경로 모두 사용 가능\n\n예시:\n\n주의점:\nRUN cd /path보다 WORKDIR 사용 권장 (명확성, 유지보수)\n절대 경로 사용 권장 (예측 가능한 동작)\n여러 번 사용 가능, 상대 경로는 이전 WORKDIR 기준\n\nBad Practice:",
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
    "answer": "USER 명령어:\n이후 명령어(RUN, CMD, ENTRYPOINT)를 실행할 사용자/그룹을 지정합니다.\n\n예시:\n\n보안상 이점:\n최소 권한 원칙: 컨테이너 탈출 시 피해 최소화\n호스트 보호: root 권한으로 호스트 파일 시스템 접근 방지\n취약점 완화: 권한 상승 공격 어려움\n규정 준수: 많은 보안 정책에서 non-root 실행 요구\n\n주의 및 실무 고려사항:\n일부 작업(포트 1024 이하 바인딩)은 CAPNETBIND_SERVICE capability 필요\n많은 공식 이미지(nginx, redis 등)는 이미 non-root 사용자 지원\n파일 권한 문제: 볼륨 마운트 시 호스트와 컨테이너의 UID/GID 불일치 주의\nKubernetes에서는 runAsNonRoot: true로 강제 가능",
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
    "answer": "HEALTHCHECK 역할:\n컨테이너 내 애플리케이션의 상태를 주기적으로 확인합니다.\n\n문법:\n\n옵션:\n옵션   기본값   설명\n\n--interval   30s   헬스체크 간격\n--timeout   30s   타임아웃\n--start-period   0s   시작 후 대기 시간\n--retries   3   실패 허용 횟수\n\n상태:\nstarting: 시작 중 (start-period 내)\nhealthy: 정상 (exit 0)\nunhealthy: 비정상 (retries 초과)\n\n활용: Docker Swarm, Compose에서 서비스 상태 관리 및 재시작 정책에 활용됩니다.",
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
    "answer": "레이어 수 줄이기:\n\n이미지 크기 최적화:\n경량 베이스 이미지 사용\nalpine, slim, distroless 선택\n불필요한 파일 정리\n패키지 캐시 삭제\n빌드 의존성 제거\n멀티스테이지 빌드 활용\n.dockerignore 사용\n레이어 순서 최적화\n자주 변경되는 파일은 마지막에 COPY",
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
    "answer": "캐시 무효화 조건:\nDockerfile 명령어 변경\nCOPY/ADD 대상 파일 내용 변경 (체크섬 비교)\n이전 레이어의 캐시가 무효화됨\n--no-cache 옵션 사용\nARG 값 변경 (해당 ARG 사용하는 명령어부터)\n\n캐시 효율적 활용:\n변경 빈도 순서로 명령어 배치\n의존성 파일 분리\nRUN 명령어 통합 여부 고려\n자주 변경되는 명령은 분리\n관련 명령은 통합",
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
    "answer": "빌드 과정:\n빌드 컨텍스트(현재 디렉토리) 전송\nDockerfile 파싱\n각 명령어 순차 실행, 레이어 생성\n캐시 활용 (가능한 경우)\n최종 이미지 생성\n\n기본 명령:\n\n주요 옵션:\n옵션   설명\n\n-t, --tag   이미지 이름:태그 지정\n-f, --file   Dockerfile 경로 지정\n--build-arg   ARG 값 전달\n--no-cache   캐시 미사용\n--target   멀티스테이지 특정 단계까지만 빌드\n--platform   대상 플랫폼 (linux/amd64 등)\n--progress   출력 형식 (plain, tty, auto)",
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
    "answer": "태깅 전략:\nSemantic Versioning\nGit 기반\n환경/날짜 기반\n\n권장 사항:\nlatest 태그는 프로덕션에서 피하기 (불명확)\n불변 태그 사용 (commit hash, 버전)\n다중 태그 적용\n\n이미지 다이제스트:",
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
    "answer": "레지스트리 로그인:\n이미지 태깅:\n이미지 푸시:\n이미지 풀:\n\n클라우드 레지스트리 예시:",
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
    "answer": "Dangling 이미지란:\n태그가 없는 이미지로, <none>:<none>으로 표시됩니다. 주로 새 이미지 빌드 시 기존 태그가 새 이미지로 이동하면서 발생합니다.\n\n확인 방법:\n\n정리 방법:\n\n전체 정리:",
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
    "answer": "이미지 히스토리 확인:\n\n출력 예시:\n\n상세 분석 도구:\n\n최적화 포인트:\n큰 레이어 식별 후 최적화\n불필요한 파일 제거 확인\n캐시 정리 여부 확인",
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
    "answer": "이미지   크기   특징   사용 사례\n\nscratch   0B   완전히 비어있음, CA 인증서 없음   정적 바이너리 (Go, Rust)\ndistroless   ~2-20MB   Google 제공, 쉘 없음, 언어별 런타임만   프로덕션 보안 중시\nalpine   ~5MB   musl libc, busybox, apk   경량 컨테이너, 쉘 필요 시\nslim   ~80MB   Debian 최소 설치, glibc   glibc 필요한 라이브러리\n기본   ~100MB+   전체 OS 패키지   디버깅, 개발 환경\n\n트레이드오프 상세 (함정 질문 빈출):\nAlpine의 musl libc 이슈:\n일부 C 라이브러리(특히 glibc 전용)와 비호환\nPython의 일부 패키지, Node.js native addon에서 문제 발생 가능\nDNS 해석 동작이 glibc와 다름 (특히 /etc/hosts 처리)\nscratch의 제약:\nCA 인증서 없음 → HTTPS 호출 실패 (직접 복사 필요)\n쉘 없음 → docker exec 디버깅 불가\n사용자/그룹 없음 → USER 명령어 제한적\ndistroless 권장 이유:\n공격 표면 최소화 (쉘, 패키지 매니저 없음)\nCVE 스캔 시 취약점 적음\n언어별 런타임(Java, Python, Node.js 등) 제공\n\n실무 권장:\n보안 최우선: distroless 또는 scratch\n범용/디버깅 필요: alpine (단, musl 이슈 테스트 필수)\n복잡한 네이티브 의존성: slim\nNode.js에서 native addon 사용 시: slim 권장 (alpine은 추가 빌드 도구 필요)",
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
    "answer": "이미지 저장 (save):\n\n이미지 로드 (load):\n\n사용 시나리오:\n에어갭 환경: 인터넷 없는 폐쇄망에 이미지 전달\n백업: 중요 이미지 아카이브\n오프라인 배포: USB 등으로 물리적 전달\nCI/CD 아티팩트: 빌드 결과물 저장\n\nexport/import와 차이:\nsave/load: 이미지 전체 (레이어, 메타데이터 포함)\nexport/import: 컨테이너 파일시스템 (단일 레이어)",
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
    "answer": "Docker Content Trust (DCT):\n이미지 게시자의 신원을 검증하고, 이미지 무결성을 보장하는 보안 기능입니다. Notary 프로젝트 기반으로 구현되었습니다.\n\n활성화:\n\n이미지 서명:\n\n이미지 서명의 중요성:\n무결성: 이미지가 변조되지 않았음을 보장\n신뢰성: 이미지 게시자 신원 확인\n공급망 보안: 중간자 공격 방지\n규정 준수: 보안 정책 요구사항 충족\n\n동작 원리:\n오프라인 키: root key (안전하게 보관)\n온라인 키: 이미지 서명용",
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
    "answer": "드라이버   특징   사용 사례\n\nbridge   기본값, 가상 브릿지 네트워크, NAT 사용   단일 호스트, 독립 컨테이너\nhost   호스트 네트워크 스택 직접 사용, 격리 없음   네트워크 성능 중요 시 (Linux만)\nnone   네트워크 비활성화, loopback만 존재   완전한 네트워크 격리\noverlay   다중 호스트 간 네트워크, VXLAN 사용   Docker Swarm, 클러스터\nmacvlan   컨테이너에 고유 MAC 주소 할당   레거시 앱, 물리 네트워크 직접 연결\nipvlan   macvlan과 유사, MAC 공유   macvlan 제약이 있는 환경\n\n네트워크 드라이버 선택 트레이드오프:\nbridge: 가장 안전하고 범용적이나 NAT 오버헤드 있음\nhost: 성능 최적이나 포트 충돌 위험, 보안 경계 약화\noverlay: 멀티호스트에 필수이나 VXLAN 캡슐화로 약간의 성능 저하\nmacvlan: 외부 네트워크와 직접 통신 가능하나 호스트와 컨테이너 간 통신 복잡\n\n예시:",
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
    "answer": "동작 원리:\nDocker가 호스트에 가상 브릿지(docker0) 생성\n각 컨테이너에 veth(가상 이더넷) 페어 생성\n한쪽은 컨테이너 내 eth0, 다른 쪽은 브릿지에 연결\n컨테이너는 브릿지를 통해 통신\n\n네트워크 구조:\n\n컨테이너 간 통신:\n\n외부 통신:\nNAT(MASQUERADE)를 통해 호스트 IP로 외부 통신",
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
    "answer": "특징:\n컨테이너가 호스트의 네트워크 스택을 직접 사용\n네트워크 격리 없음 (network namespace 공유)\n포트 매핑 불필요 (컨테이너 포트 = 호스트 포트)\nNAT 오버헤드 없음 → 성능 향상\n\n사용 예시:\n\n장점:\n네트워크 성능 최적화 (NAT 오버헤드 제거, 지연 시간 감소)\n포트 매핑 복잡성 제거\n많은 포트 사용 시 편리\n\n주의점 (중요한 트레이드오프):\n포트 충돌: 호스트와 같은 포트 사용 시 충돌 발생\n보안 위험: 네트워크 격리 없음 - 컨테이너가 호스트의 모든 네트워크 인터페이스 접근 가능\n이식성 감소: 호스트 네트워크 환경에 종속\nLinux 전용: macOS/Windows의 Docker Desktop은 VM 내에서 동작하므로 host 네트워크가 실제 호스트가 아닌 VM의 네트워크를 의미\n컨테이너 간 통신: localhost로 다른 컨테이너 접근 가능하여 의도치 않은 노출 위험\n\n사용 사례:\n네트워크 모니터링 도구\n고성능 네트워크 애플리케이션",
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
    "answer": "Overlay 네트워크:\n여러 Docker 호스트에 걸쳐 있는 분산 네트워크로, 서로 다른 호스트의 컨테이너가 같은 네트워크에 있는 것처럼 통신할 수 있게 합니다.\n\n동작 원리:\nVXLAN(Virtual Extensible LAN) 기술 사용\nL2 over L3 터널링\n각 호스트의 Docker 데몬이 협력\n\n생성 및 사용:\n\n사용 상황:\nDocker Swarm: 멀티 노드 클러스터\n마이크로서비스: 여러 호스트에 분산된 서비스 간 통신\n서비스 디스커버리: 내장 DNS로 서비스 이름 해석\n\n특징:\n자동 암호화 옵션 (--opt encrypted)\n내장 로드 밸런싱\n서비스 메시 라우팅",
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
    "answer": "Docker 내장 DNS:\n사용자 정의 네트워크에서 컨테이너 이름, 서비스 이름, 네트워크 별칭을 IP 주소로 해석해주는 DNS 서버입니다.\n\n동작 원리:\n컨테이너의 /etc/resolv.conf에 내장 DNS 서버(127.0.0.11) 설정\n컨테이너 이름으로 DNS 쿼리 시 Docker DNS가 응답\n외부 도메인은 호스트 DNS로 포워딩\n\n예시:\n\n네트워크 별칭:\n\n주의:\n기본 bridge 네트워크는 DNS 미지원\n반드시 사용자 정의 네트워크 사용",
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
    "answer": "EXPOSE (Dockerfile):\n문서화 목적 (컨테이너가 사용하는 포트 명시)\n실제로 포트를 열지 않음\n이미지 메타데이터에 기록\n\n-p 옵션 (docker run):\n실제 포트 매핑 수행\n호스트 포트 ↔ 컨테이너 포트 연결\n외부에서 접근 가능하게 함\n\n비교:\n구분   EXPOSE   -p\n\n위치   Dockerfile   docker run\n효과   문서화   실제 매핑\n외부 접근   불가   가능",
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
    "answer": "생성 방법:\n\n사용:\n\n장점 (기본 bridge 대비):\n자동 DNS 해석\n컨테이너 이름으로 통신 가능\n기본 bridge는 IP만 사용 가능\n더 나은 격리\n네트워크별 컨테이너 격리\n명시적으로 연결된 컨테이너만 통신\n동적 연결/해제\n설정 유연성\n서브넷, 게이트웨이 직접 설정\nIP 범위 지정 가능\n환경 변수 공유\n--link 없이도 서비스 디스커버리",
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
    "answer": "ICC(Inter-Container Communication) 비활성화:\n별도 네트워크 분리:\nnone 네트워크:\n방화벽 규칙 (iptables):\nDocker Compose에서:",
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
    "answer": "구분   Volumes   Bind Mounts   tmpfs\n\n저장 위치   Docker 관리 영역 (/var/lib/docker/volumes/)   호스트 파일 시스템 임의 경로   메모리 (RAM)\n관리   Docker CLI로 관리   직접 관리   -\n영속성   컨테이너 독립적   컨테이너 독립적   휘발성 (컨테이너 종료 시 삭제)\n성능 (Linux)   좋음   좋음   매우 빠름\n성능 (Mac/Win)   좋음 (VM 내부)   느림 (osxfs/grpcfuse 오버헤드)   좋음\n이식성   높음   낮음 (경로 의존)   Linux 전용\n초기 데이터   이미지 데이터 자동 복사   호스트 데이터 그대로 사용   비어있음\n\n트레이드오프 상세:\nBind Mounts의 macOS/Windows 성능 문제: Docker Desktop에서 호스트-VM 간 파일 동기화로 인해 node_modules 같은 많은 파일 접근 시 매우 느림. 해결책: 의존성은 볼륨에, 소스만 bind mount\n보안: Bind mounts는 호스트 파일시스템에 직접 접근하므로 컨테이너가 민감한 파일 수정 가능\n\n사용 예시:\n\n선택 기준:\nVolumes: 프로덕션 데이터, DB 저장소\nBind Mounts: 개발 환경, 설정 파일 공유\ntmpfs: 민감한 임시 데이터, 캐시",
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
    "answer": "Named Volume 장점:\nDocker가 관리\n생성, 삭제, 목록 조회 가능\n이식성\n호스트 경로에 의존하지 않음\n다른 환경에서 동일하게 동작\n볼륨 드라이버 지원\n클라우드 스토리지, NFS 등 연동 가능\n백업 및 마이그레이션 용이\n초기 데이터 복사\n이미지의 데이터를 볼륨으로 자동 복사\nLinux/Mac/Windows 호환\n플랫폼 독립적\n\n바인드 마운트 사용 시:\n개발 환경에서 소스 코드 실시간 반영\n특정 호스트 파일/디렉토리 접근 필요 시",
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
    "answer": "특징:\n호스트의 특정 경로를 컨테이너에 마운트\n양방향 동기화 (호스트 변경 ↔ 컨테이너 반영)\nDocker 외부에서 관리\n절대 경로 필요\n\n개발 환경 활용:\n소스 코드 실시간 반영:\n핫 리로드 개발:\n설정 파일 주입:\n로그 접근:\n\n주의점:\nWindows/Mac은 파일 시스템 성능 이슈 가능\n:ro 플래그로 읽기 전용 설정 권장\n호스트 경로 의존으로 이식성 낮음",
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
    "answer": "tmpfs 마운트란:\n호스트의 메모리(RAM)에 데이터를 저장하는 마운트 방식입니다. 컨테이너 종료 시 데이터가 삭제됩니다.\n\n사용 방법:\n\n옵션:\ntmpfs-size: 최대 크기 (바이트)\ntmpfs-mode: 파일 모드 (권한)\n\n사용 상황:\n민감한 임시 데이터\n비밀번호, 토큰 등 디스크에 남기면 안 되는 정보\n고성능 캐시\n빠른 읽기/쓰기가 필요한 임시 캐시\n빌드 아티팩트\n빌드 중 생성되는 임시 파일\n세션 데이터\n영속화 불필요한 세션 정보\n\n특징:\n매우 빠른 I/O\nLinux 호스트에서만 사용 가능\nSwarm 서비스에서 사용 가능",
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
    "answer": "볼륨 생명주기:\n볼륨은 컨테이너와 독립적\n컨테이너 삭제 후에도 볼륨 유지\n명시적으로 삭제해야 제거됨\n\n볼륨 생성/삭제:\n\n컨테이너 삭제 시 볼륨 처리:\n\n익명 볼륨 vs Named 볼륨:",
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
    "answer": "볼륨 드라이버:\nDocker 볼륨을 다양한 스토리지 백엔드와 연동할 수 있게 해주는 플러그인입니다.\n\n기본 드라이버:\nlocal: 로컬 파일 시스템 (기본값)\n\n주요 서드파티 드라이버:\nnfs: NFS 스토리지\nazure-file: Azure File Storage\ncloudstor: AWS EBS, EFS\nconvoy: 분산 스토리지\n\nNFS 볼륨 예시:\n\n플러그인 설치 및 사용:\n\nDocker Compose:",
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
    "answer": "설정 방법:\n\nDocker Compose:\n\n사용 시나리오:\n설정 파일 주입\n인증서/키 파일\n공유 데이터 보호\n여러 컨테이너가 같은 데이터 참조 시 변경 방지\n보안 강화\n컨테이너 탈취 시 데이터 변조 방지\n불변 인프라\n컨테이너가 외부 데이터를 수정하지 못하게 보장",
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
    "answer": "Docker Compose:\nYAML 파일로 멀티 컨테이너 Docker 애플리케이션을 정의하고 실행하는 도구입니다.\n\n장점:\n선언적 설정\n인프라를 코드로 관리 (IaC)\n버전 관리 가능\n일관된 환경\n개발, 테스트, 운영 환경 동일\n간편한 명령어\n서비스 간 의존성 관리\n네트워크 자동 구성\n기본 네트워크 생성\n서비스명으로 DNS 해석\n환경 변수 관리\n.env 파일 지원\n\ndocker run vs compose:",
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
    "answer": "주요 구성 요소:\nservices: 애플리케이션을 구성하는 컨테이너들\nnetworks: 서비스 간 통신을 위한 네트워크\nvolumes: 데이터 영속화를 위한 볼륨\nconfigs/secrets: 설정 및 민감 정보 (Swarm)",
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
    "answer": "기본 설정:\n\n조건부 의존성 (v2.1+):\n\n조건 옵션:\nservicestarted: 컨테이너 시작됨 (기본)\nservicehealthy: healthcheck 통과\nservicecompletedsuccessfully: 성공적으로 종료\n\n한계점 (함정 질문 - 매우 중요):\n시작 순서만 보장, \"준비\" 상태는 보장 안 함\ndependson 기본값은 컨테이너 \"시작\"만 기다림\nDB 컨테이너 시작 ≠ DB가 연결 받을 준비 완료\n이것이 가장 흔한 Docker Compose 관련 문제\n해결 방법 (우선순위 순):\ncondition: servicehealthy + healthcheck 조합 (가장 권장)\n애플리케이션 레벨에서 연결 재시도 로직 구현 (탄력성 확보)\nwait-for-it.sh, dockerize 같은 헬퍼 스크립트 (임시 해결책)\n실무 Best Practice:\n애플리케이션은 항상 의존 서비스 장애에 대비해야 함\ndependson만으로는 충분하지 않음을 인지",
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
    "answer": "environment (인라인):\nenvfile (외부 파일):\n.env (Compose 변수 치환):\n\n우선순위 (높음 → 낮음):\ndocker-compose run -e로 전달\n셸 환경 변수\n.env 파일\nenv_file 지정 파일\nDockerfile의 ENV\n\n보안 팁:\n.env는 .gitignore에 추가\n민감 정보는 Docker secrets 사용 고려",
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
    "answer": "스케일링 방법:\n\nCompose 파일에서 정의:\n\n주의점:\n포트 충돌\n컨테이너 이름 중복\n자동으로 1, 2 등 접미사 추가\n볼륨 공유\n모든 인스턴스가 같은 볼륨 사용 시 충돌 가능\n로드 밸런싱\nCompose 자체는 로드 밸런서 미제공\n별도 nginx, traefik 등 필요\n\n로드 밸런서 예시:",
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
    "answer": "기본 동작:\nCompose가 프로젝트별 기본 네트워크 자동 생성\n네트워크 이름: {프로젝트명}_default\n모든 서비스가 이 네트워크에 연결\n\n서비스 간 통신:\n\n사용자 정의 네트워크:\n\n네트워크 별칭:\n\n외부 네트워크 사용:",
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
    "answer": "기본 오버라이드:\n\n파일 구조 예시:\n\n병합 규칙:\n단일 값: 후순위 파일이 덮어씀\n리스트: 병합됨\n맵: 재귀적으로 병합\n\n환경별 사용:",
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
    "answer": "healthcheck 설정:\n\n서비스 시작 순서 제어:\n\n일반적인 healthcheck 예시:",
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
    "answer": "Named 볼륨 공유 (권장):\n\n바인드 마운트 공유:\n\nvolumesfrom 대안:\n\nvolumesfrom은 v3에서 제거되었습니다. 대안:\n\n볼륨 드라이버 옵션:",
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
    "answer": "주요 보안 위험 (함정 질문 - 컨테이너 보안의 오해):\n\n위험   완화 방법\n\nroot 권한 실행   non-root 사용자 사용, User Namespace\n취약한 이미지   이미지 스캐닝, 신뢰할 수 있는 베이스 이미지, 정기 업데이트\n과도한 권한   capabilities 제한 (--cap-drop ALL 후 필요한 것만 추가)\n민감 정보 노출   Docker secrets, 외부 시크릿 관리 도구 (환경변수 사용 주의)\n컨테이너 탈출   커널 업데이트, seccomp/AppArmor/SELinux, gVisor/Kata Containers\nDocker 소켓 노출   /var/run/docker.sock 마운트 금지 (마운트 시 호스트 root 획득 가능)\n\n자주 오해하는 점:\n컨테이너 != 가상 머신: 컨테이너 격리는 VM보다 약함\nroot in container = 잠재적 위험: User Namespace 없이 컨테이너 root는 호스트 root와 동일한 UID\n--privileged 플래그는 모든 보안 장치 해제 - 프로덕션에서 절대 사용 금지\n\n완화 방법:\nnon-root 실행:\n읽기 전용 파일시스템:\ncapabilities 제한:\n리소스 제한:\n이미지 스캐닝:\n네트워크 분리:",
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
    "answer": "Rootless 모드:\nDocker 데몬과 컨테이너를 root 권한 없이 일반 사용자로 실행하는 모드입니다.\n\n설치 및 실행:\n\n보안 이점:\n데몬 탈취 방지\n데몬 취약점 악용 시에도 root 권한 획득 불가\n컨테이너 탈출 완화\n호스트에서도 일반 사용자 권한만 가짐\nUser Namespace 활용\n컨테이너 내 root = 호스트 일반 사용자\n다중 사용자 환경\n각 사용자가 독립된 Docker 인스턴스 운영\n\n제한사항 (트레이드오프):\ncgroups v2 필요 (cgroups v1 환경에서는 추가 설정 필요)\n일부 네트워크 기능 제한 (ping 등 raw socket 사용 기능)\n1024 미만 포트 바인딩 제한 (slirp4netns 사용으로 우회 가능)\noverlay2 스토리지 드라이버 제한 (fuse-overlayfs 사용)\nAppArmor/SELinux 프로필 적용 방식 다름\nDocker Swarm 모드 미지원\n\n언제 사용해야 하나:\n공유 시스템에서 각 사용자가 독립적으로 Docker 사용 시\n보안이 최우선인 환경\nCI/CD 러너에서 Docker-in-Docker 대안으로\n\nvs 일반 모드:\n구분   일반 모드   Rootless\n\n데몬 권한   root   사용자\n보안   낮음   높음\n기능   완전   일부 제한",
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
    "answer": "이유:\n최소 권한 원칙\n필요한 최소한의 권한만 부여\n공격 표면 감소\n컨테이너 탈출 시 피해 최소화\n취약점으로 탈출해도 일반 사용자 권한만 가짐\n호스트 시스템 보호\n파일 권한 보호\n마운트된 볼륨의 파일 변조 방지\n호스트 파일 시스템 보호\n규정 준수\nPCI-DSS, SOC2 등 보안 정책 요구사항\n\n구현 방법:\n\n실행 시 지정:\n\n주의점:\n일부 작업은 root 필요 (패키지 설치 등)\n빌드 시 root로 작업, 런타임에 non-root\n포트 1024 미만 바인딩 시 capabilities 설정 필요",
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
    "answer": "Docker Secrets (Swarm):\n\n컨테이너 내 접근:\n\nDocker Compose (개발용):\n\n환경 변수 vs Secrets (중요한 보안 트레이드오프):\n구분   환경 변수   Secrets\n\n저장   프로세스 환경 (메모리)   tmpfs 파일 (메모리)\n암호화   X   O (Swarm에서 전송/저장 시 암호화)\n노출 위험   docker inspect, /proc/PID/environ로 노출   권한 있는 컨테이너만 접근\n로그 노출   애플리케이션 로그에 실수로 출력되기 쉬움   파일이라 로그 출력 위험 낮음\n용도   일반 설정   비밀번호, API 키, 인증서\n\nBest Practice:\nFILE 접미사 패턴 사용 (예: POSTGRESPASSWORDFILE)\n환경 변수에 직접 비밀번호 넣지 않기\nCompose의 secrets는 파일 기반이라 Swarm처럼 암호화되지 않음에 주의\n프로덕션에서는 HashiCorp Vault, AWS Secrets Manager 등 외부 시크릿 관리 도구 권장",
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
    "answer": "중요성:\n알려진 CVE 취약점 조기 발견\n공급망 보안 강화\n규정 준수 (PCI-DSS, HIPAA 등)\n프로덕션 배포 전 보안 검증\n\n주요 스캐닝 도구:\n\n도구   특징\n\nDocker Scout   Docker 공식, Docker Hub 통합\nTrivy   오픈소스, 빠름, 포괄적\nSnyk   개발자 친화적, CI/CD 통합\nClair   오픈소스, 레지스트리 통합\nAnchore   정책 기반 스캐닝\n\n사용 예시:\n\nCI/CD 통합 (GitHub Actions):",
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
    "answer": "seccomp (Secure Computing Mode):\n시스템 콜 필터링\n컨테이너가 사용할 수 있는 syscall 제한\n\nAppArmor:\nMAC (Mandatory Access Control)\n파일, 네트워크, 프로세스 접근 제어\nUbuntu/Debian 기본\n\nSELinux:\nMAC 시스템\nRHEL/CentOS/Fedora 기본\n\n비교 및 트레이드오프:\n구분   seccomp   AppArmor   SELinux\n\n대상   syscall 필터링   파일/네트워크/capability   전체 시스템 리소스\n복잡도   중간   낮음   높음\n배포판   전체 (커널 3.17+)   Ubuntu/Debian   RHEL/CentOS/Fedora\n디버깅   어려움 (syscall 추적 필요)   로그 기반   audit 로그 기반\n성능 영향   매우 낮음   낮음   낮음~중간\n\n실무 권장사항:\nDocker 기본 seccomp 프로필은 300개 이상의 위험한 syscall 차단 - 대부분의 경우 기본값 유지\n커스텀 프로필 필요 시: 먼저 기본 프로필로 테스트 후 필요한 syscall만 추가\n--security-opt seccomp=unconfined는 디버깅 시에만, 프로덕션에서는 절대 사용 금지",
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
    "answer": "Linux Capabilities:\nroot 권한을 세분화한 권한 단위입니다. 전체 root 권한 대신 필요한 capability만 부여할 수 있습니다.\n\n제한하는 이유:\n최소 권한 원칙 적용\n컨테이너 탈출 시 피해 최소화\n불필요한 시스템 접근 차단\n\n기본 capabilities (Docker):\nCHOWN, DACOVERRIDE, FSETID, FOWNER, MKNOD, NETRAW, SETGID, SETUID, SETFCAP, SETPCAP, NETBINDSERVICE, SYSCHROOT, KILL, AUDITWRITE\n\n설정 방법:\n\n주요 capabilities:\nCapability   설명\n\nNETBINDSERVICE   1024 미만 포트 바인딩\nSYSADMIN   다양한 관리 작업 (위험)\nNETADMIN   네트워크 설정 변경\nSYSPTRACE   프로세스 디버깅\n\n권장 설정:",
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
    "answer": "신뢰할 수 있는 이미지 선택:\n공식 이미지 사용\nVerified Publisher 확인\nDocker Hub에서 인증 마크 확인\n이미지 다이제스트로 고정\n\n이미지 관리 방법:\n정기적인 업데이트\n취약점 스캐닝\n베이스 이미지 추적\n내부 레지스트리 미러링\n외부 이미지를 내부 레지스트리로 복제\n버전 관리 및 스캔 후 사용\nGolden Image 정책\n승인된 베이스 이미지 목록 관리\nCI에서 허용 이미지만 빌드 가능",
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
    "answer": "CPU 제한 옵션:\n\n옵션   설명   예시\n\n--cpus   사용할 CPU 개수   --cpus=1.5\n--cpu-shares   상대적 가중치 (1024 기준)   --cpu-shares=512\n--cpu-period   CFS 주기 (마이크로초)   --cpu-period=100000\n--cpu-quota   CFS 할당량 (마이크로초)   --cpu-quota=50000\n--cpuset-cpus   특정 CPU 코어 지정   --cpuset-cpus=0,1\n\n사용 예시:\n\nDocker Compose:\n\n--cpus vs --cpu-shares (중요한 개념 차이):\n--cpus: 절대적 제한 - 1.5면 최대 1.5 CPU만 사용 가능 (CFS quota 기반)\n--cpu-shares: 상대적 가중치 - CPU 경쟁이 있을 때만 적용, 유휴 CPU는 더 사용 가능\n예: 컨테이너 A(shares=1024), B(shares=512)가 경쟁 시 A는 2/3, B는 1/3 할당\n다른 컨테이너가 없으면 B도 100% CPU 사용 가능\n\n실무 선택 기준:\n예측 가능한 성능이 필요하면 --cpus 사용\n리소스 효율성을 원하면 --cpu-shares 사용\n둘 다 조합 가능",
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
    "answer": "메모리 제한 옵션:\n\n옵션   설명\n\n--memory (-m)   메모리 제한\n--memory-swap   메모리 + 스왑 합계\n--memory-reservation   소프트 제한 (보장 메모리)\n--oom-kill-disable   OOM Killer 비활성화\n--oom-score-adj   OOM 우선순위 조정\n\n사용 예시:\n\nOOM 처리:\n\nDocker Compose:\n\nOOM 발생 시 동작 (함정 질문):\n기본: OOM Killer가 컨테이너 내 프로세스 중 점수가 높은 것 종료\n종료 코드 137 (128 + SIGKILL 9)\n--oom-kill-disable: 메모리 부족 시 프로세스가 대기 상태로 빠져 시스템 hang 가능 - 프로덕션에서 절대 권장하지 않음\n--memory 없이 --oom-kill-disable 사용 시 경고 발생\n\n실무 권장사항:\n메모리 제한은 애플리케이션 실제 사용량의 1.5~2배로 설정\nJVM 같은 경우 힙 메모리(-Xmx)와 컨테이너 메모리 제한 조율 필요\n--memory-reservation은 소프트 리밋으로, 시스템 메모리 압박 시에만 적용",
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
    "answer": "cgroups (Control Groups):\nLinux 커널 기능으로, 프로세스 그룹에 대한 리소스(CPU, 메모리, I/O 등) 사용량을 제한, 계정, 격리합니다.\n\ncgroups 기능:\n리소스 제한 (Resource Limiting)\n그룹이 사용할 수 있는 리소스 상한 설정\n우선순위 (Prioritization)\n리소스 경쟁 시 우선순위 설정\n계정 (Accounting)\n리소스 사용량 측정 및 보고\n제어 (Control)\n그룹 프로세스 동결, 재개, 체크포인트\n\nDocker에서의 활용:\n\ncgroups v1 vs v2:\n구분   v1   v2\n\n구조   계층별 분리   통합 계층\n관리   복잡   단순\n지원   레거시   현재 권장\n\nDocker 리소스 매핑:\n--memory → memory.max\n--cpus → cpu.max\n--pids-limit → pids.max",
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
    "answer": "I/O 제한 옵션:\n\n옵션   설명\n\n--blkio-weight   상대적 I/O 가중치 (10-1000)\n--device-read-bps   디바이스 읽기 속도 제한\n--device-write-bps   디바이스 쓰기 속도 제한\n--device-read-iops   초당 읽기 작업 수 제한\n--device-write-iops   초당 쓰기 작업 수 제한\n\n사용 예시:\n\nDocker Compose (제한적 지원):\n\n주의사항 (함정 질문):\n블록 디바이스 경로 필요 (볼륨 경로 아님)\nDirect I/O에만 적용 - 버퍼링된 I/O(일반적인 파일 작업)는 제한되지 않음\n대부분의 애플리케이션은 버퍼 I/O 사용하므로 이 옵션이 효과 없을 수 있음\nODIRECT 플래그로 열린 파일에만 적용\ncgroups v2에서는 io.max로 통합 관리\n실제 I/O 제한이 필요하면 cgroups v2 사용 권장\n\n확인:",
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
    "answer": "Fork Bomb이란:\n무한히 프로세스를 생성하여 시스템 리소스를 고갈시키는 공격입니다.\n\nPID 제한 설정:\n\nDocker Compose:\n\n데몬 수준 기본값 설정:\n\n확인:\n\n권장사항:\n프로덕션 환경에서 항상 설정\n애플리케이션 특성에 맞게 값 조정\n너무 낮으면 정상 동작 방해\n\n다른 보호 수단:\nulimit 설정: docker run --ulimit nproc=100\nseccomp 프로필로 fork 제한",
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
    "answer": "docker stats 기본 사용:\n\n출력 정보:\n항목   설명\n\nCPU %   CPU 사용률\nMEM USAGE/LIMIT   메모리 사용량/제한\nMEM %   메모리 사용률\nNET I/O   네트워크 입출력\nBLOCK I/O   디스크 입출력\nPIDS   프로세스 수\n\n포맷 지정:\n\n주요 포맷 키:\n.Container, .Name, .ID\n.CPUPerc, .MemUsage, .MemPerc\n.NetIO, .BlockIO, .PIDs\n\n활용 예시:",
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
    "answer": "주요 로깅 드라이버:\n\n드라이버   설명   특징\n\njson-file   JSON 파일 저장 (기본값)   docker logs 지원\nlocal   최적화된 로컬 저장   압축, 로테이션 지원\nsyslog   Syslog 서버 전송   중앙집중식 로깅\njournald   systemd journal   systemd 통합\nfluentd   Fluentd 전송   유연한 로그 라우팅\nawslogs   AWS CloudWatch   AWS 통합\ngcplogs   Google Cloud Logging   GCP 통합\nsplunk   Splunk 전송   엔터프라이즈 로깅\nnone   로깅 비활성화   성능 최적화\n\n설정 방법:\n\nDocker Compose:",
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
    "answer": "기본 사용:\n\n옵션 조합:\n\nDocker Compose:\n\n로그 위치 (json-file 드라이버):\n\n주의사항 (중요한 트레이드오프):\n일부 로깅 드라이버(fluentd, awslogs, splunk 등)는 docker logs 미지원\n이 경우 로그는 외부 시스템에서만 확인 가능\n디버깅 시 불편 → local 또는 json-file + 외부 로그 수집기 조합 고려\n로그 크기 관리 필요 - 기본 json-file은 로테이션 없음 → 디스크 가득 참 문제\nDocker 19.03+에서 local 드라이버 권장 (압축, 로테이션 기본 제공, docker logs 지원)",
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
    "answer": "중요성:\n디스크 공간 고갈 방지\n로그 파일 관리 용이\n시스템 안정성 유지\n성능 저하 방지 (대용량 로그 파일)\n\n설정 방법:\n컨테이너별 설정:\n데몬 기본값 설정:\nDocker Compose:\n\n옵션 설명:\n옵션   설명   예시\n\nmax-size   로그 파일 최대 크기   10m, 1g\nmax-file   보관할 로그 파일 수   3, 5\ncompress   gzip 압축   true\n\nlocal 드라이버 (권장):",
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
    "answer": "내장 도구:\n\nDocker API:\n\ncAdvisor:\n\nPrometheus + Grafana 스택:\n\n수집 가능한 메트릭:\nCPU 사용량, 메모리 사용량\n네트워크 I/O, 디스크 I/O\n컨테이너 수, 프로세스 수",
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
    "answer": "기본 사용:\n\n필터링:\n\n포맷:\n\n주요 이벤트:\ncontainer: create, start, stop, die, kill, pause, unpause\nimage: pull, push, delete, tag\nnetwork: create, connect, disconnect, destroy\n\n활용 사례:\n자동 복구: die 이벤트 감지 후 알림/재시작\n감사 로그: 컨테이너 생성/삭제 기록\n모니터링 연동: 이벤트 기반 알림\nCI/CD: 배포 상태 추적",
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
    "answer": "아키텍처:\nDocker 데몬 메트릭 활성화:\ndocker-compose.yml:\nprometheus.yml:\nGrafana 설정:\nData Source: Prometheus 추가\nDashboard: Docker 대시보드 임포트 (ID: 893, 11600)\n\n주요 메트릭:\ncontainercpuusagesecondstotal\ncontainermemoryusagebytes\ncontainernetworkreceivebytestotal",
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
    "answer": "로그 확인:\n컨테이너 상태 확인:\n종료 코드 분석:\n코드   의미\n\n0   정상 종료\n1   애플리케이션 오류\n137   OOM Killer (128+9)\n139   세그멘테이션 폴트\n143   SIGTERM으로 종료\n인터랙티브 모드로 디버깅:\n이미지 검사:\n리소스 확인:\n이벤트 확인:\n\n일반적인 원인:\n잘못된 CMD/ENTRYPOINT\n필요한 파일/환경 변수 누락\n포트 충돌\n리소스 부족\n권한 문제",
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
    "answer": "기본 사용:\n\n주요 옵션:\n옵션   설명\n\n-i   표준 입력 유지\n-t   TTY 할당\n-u   사용자 지정\n-w   작업 디렉토리\n-e   환경 변수\n\n디버깅 명령어 예시:\n\nroot로 접속:\n\n디버깅 도구 설치 (임시):\n\n주의: 프로덕션 컨테이너는 최소한의 도구만 포함하므로 디버깅 도구가 없을 수 있음",
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
    "answer": "docker diff:\n컨테이너 시작 이후 파일 시스템에서 변경된 파일과 디렉토리를 표시합니다.\n\n사용법:\n\n출력 표시:\n기호   의미\n\nA   추가됨 (Added)\nC   변경됨 (Changed)\nD   삭제됨 (Deleted)\n\n출력 예시:\n\n활용 사례:\n디버깅:\n애플리케이션이 예상치 못한 파일 생성/수정 확인\n보안 감사:\n컨테이너 내 파일 변조 감지\n이미지 최적화:\n불필요한 파일 생성 확인 후 Dockerfile 개선\n커밋 전 확인:\n\n주의사항:\n실행 중이거나 정지된 컨테이너에서 사용 가능\n볼륨 마운트된 경로는 표시되지 않음",
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
    "answer": "기본 문법:\n\n사용 예시:\n\n옵션:\n옵션   설명\n\n-a, --archive   모든 uid/gid 정보 보존\n-L, --follow-link   심볼릭 링크 따라가기\n\n활용 사례:\n설정 파일 주입: 실행 중 컨테이너에 설정 업데이트\n로그 추출: 디버깅을 위한 로그 파일 추출\n백업: 컨테이너 데이터 백업\n디버깅: 문제 분석을 위한 파일 추출\n\n주의사항:\n실행 중/정지된 컨테이너 모두 가능\n볼륨에 쓰는 것보다 비효율적 (임시 용도)\n심볼릭 링크 처리 주의",
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
    "answer": "디스크 사용량 확인:\n\n정리 명령어:\n\n개별 정리:\n\n필터링:\n\n주의사항:\nprune -a는 현재 사용 중이지 않은 모든 이미지 삭제\n볼륨 삭제는 데이터 손실 주의\nCI/CD에서 정기적 실행 권장",
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
    "answer": "진단 도구:\n네트워크 상태 확인:\n컨테이너 네트워크 설정 확인:\n컨테이너 내부에서 진단:\n\n일반적인 문제와 해결:\n\n문제   원인   해결\n\n컨테이너 간 통신 불가   다른 네트워크   같은 네트워크에 연결\nDNS 해석 실패   기본 bridge 사용   사용자 정의 네트워크 사용\n외부 접근 불가   포트 미노출   -p 옵션으로 포트 매핑\n호스트 접근 불가   네트워크 격리   host.docker.internal 사용\n\n디버깅 컨테이너:",
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
    "answer": "재시작 정책 옵션:\n\n정책   설명\n\nno   재시작 안 함 (기본값)\non-failure[:max-retries]   비정상 종료 시 재시작\nalways   항상 재시작 (수동 중지 포함)\nunless-stopped   수동 중지 전까지 재시작\n\n사용법:\n\nDocker Compose:\n\nalways vs unless-stopped:\n\n상황   always   unless-stopped\n\n컨테이너 비정상 종료   재시작   재시작\nDocker 데몬 재시작   재시작   재시작\ndocker stop 후 데몬 재시작   재시작   시작 안 함\n\n실행 중인 컨테이너 정책 변경:",
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
    "answer": "종료 코드 확인:\n\n주요 종료 코드:\n코드   의미\n\n0   정상 종료\n1   애플리케이션 오류\n137   SIGKILL (128+9), OOM 가능성\n139   세그멘테이션 폴트 (128+11)\n143   SIGTERM (128+15)\n로그 확인:\nOOM 확인:\n이벤트 확인:\n상세 상태:\n분석 체크리스트:\n메모리 제한 확인 (--memory)\n리소스 사용량 (docker stats)\n애플리케이션 로그\nhealthcheck 상태\n의존 서비스 상태\n\n자동 재시작 정책 확인:",
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
    "answer": "경량 베이스 이미지 사용:\n멀티스테이지 빌드:\nRUN 명령 최적화:\n.dockerignore 활용:\n불필요한 파일 제거:\n패키지 캐시 삭제\n문서, 맨페이지 제외\n개발 의존성 제외\n특수 빌드 옵션:",
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
    "answer": "캐시 원리:\n각 명령어가 레이어 생성\n명령어와 파일 체크섬이 같으면 캐시 사용\n한 레이어가 변경되면 이후 모든 레이어 재빌드\n의존성 파일 먼저 복사:\n자주 변경되는 것은 마지막에:\nBuildKit 캐시 마운트:\n외부 캐시 (CI/CD):\n멀티스테이지에서 특정 단계만:",
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
    "answer": "BuildKit:\nDocker의 차세대 빌드 엔진으로, Docker 23.0+에서 기본값입니다.\n\n활성화:\n\n장점:\n병렬 빌드:\n독립적인 스테이지 동시 빌드\n빌드 시간 단축\n캐시 마운트:\n시크릿 마운트:\nSSH 마운트:\n출력 최적화:\n진행률 표시 개선\n불필요한 레이어 전송 최소화\n외부 캐시:\n\nDockerfile 문법:",
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
    "answer": "이미지 크기 최소화:\n작은 이미지 = 빠른 pull/load\nAlpine, distroless 사용\n멀티스테이지 빌드\n이미지 사전 배포:\n애플리케이션 최적화:\n느린 초기화 피하기:\n무거운 DB 마이그레이션 분리\nLazy loading 활용\n사전 컴파일/빌드\n헬스체크 최적화:\n리소스 할당:\n스토리지 드라이버:\noverlay2 사용 (권장)\n로컬 레지스트리:\n네트워크 지연 감소\n\n측정:",
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
    "answer": "레이어 공유 원리:\n동일한 레이어는 한 번만 전송\n베이스 이미지 공유 시 효율적\n일관된 베이스 이미지:\n변경 빈도별 레이어 분리:\n불필요한 레이어 방지:\n레이어 크기 균형:\n너무 큰 레이어: 부분 변경에도 전체 재전송\n너무 작은 레이어: 오버헤드 증가\n캐시 활용:",
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
    "answer": "Distroless 이미지란:\nGoogle에서 제공하는 최소한의 런타임만 포함된 이미지입니다. 패키지 관리자, 셸, 기타 프로그램이 없습니다.\n\n사용 가능한 이미지:\ngcr.io/distroless/static - 정적 바이너리용\ngcr.io/distroless/base - libc 필요 시\ngcr.io/distroless/java - Java 애플리케이션\ngcr.io/distroless/nodejs - Node.js 애플리케이션\ngcr.io/distroless/python3 - Python 애플리케이션\n\n사용 예시:\n\n보안 장점:\n셸 없음 → RCE 공격 어려움\n패키지 관리자 없음 → 악성 패키지 설치 불가\n최소 공격 표면\nCVE 취약점 감소\n\n성능 장점:\n이미지 크기 최소화 (2-20MB)\n빠른 pull/push\n빠른 컨테이너 시작\n\n제한사항 및 트레이드오프:\n디버깅 어려움 (셸 없음) - 운영 중 문제 분석이 복잡해짐\nCA 인증서 업데이트를 위한 별도 빌드 필요\n특정 런타임만 지원 (범용성 제한)\ndebug 태그 버전으로 busybox 포함 가능 (개발/테스트용)\n대안: kubectl debug나 ephemeral containers로 런타임 디버깅 가능",
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
    "answer": "일반적인 워크플로우:\n\n상세 단계:\n코드 변경 감지:\nGit push, PR 이벤트\n빌드 및 테스트:\nDocker 이미지 빌드:\n보안 스캔:\n레지스트리 푸시:\n배포:\n\n예시 (GitHub Actions):",
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
    "answer": "GitHub Container Registry (ghcr.io) 사용:\n\nDocker Hub 사용 시:",
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
    "answer": "주요 태깅 전략:\n\n전략   형식   특징\n\nSemantic Version   v1.2.3   명확한 버전 관리\nGit SHA   abc1234   불변, 추적 가능\nBranch   main, develop   환경별 배포\nBuild Number   build-123   CI/CD 추적\n\nCI/CD에서 적용:\n\n스크립트 예시:\n\n권장 사항 (함정 질문 - latest 태그의 위험성):\n프로덕션: Semantic Version + SHA 조합\nlatest 태그의 문제점:\n어떤 버전인지 알 수 없음 (재현성 부족)\n같은 태그가 다른 이미지를 가리킬 수 있음\n롤백 시 어떤 버전으로 돌아가야 하는지 불명확\nKubernetes의 imagePullPolicy: Always와 조합 시 예측 불가능한 배포\n이미지 다이제스트(myapp@sha256:abc...)로 완전한 불변성 보장\n프로덕션에서는 명시적 버전 태그 필수",
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
    "answer": "Docker Compose로 테스트 환경:\n\nTestcontainers:\n테스트 코드에서 Docker 컨테이너를 프로그래밍 방식으로 관리하는 라이브러리입니다.\n\nJava 예시:\n\nNode.js 예시:\n\n장점:\n실제 서비스로 통합 테스트\n테스트 격리 보장\nCI/CD 환경 동일성",
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
    "answer": "GitHub Actions - Trivy:\n\nDocker Scout:\n\nSnyk:\n\n통합 워크플로우:",
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
    "answer": "문제:\nCI/CD 환경은 매번 새로운 러너에서 실행되어 로컬 캐시가 없습니다.\n\n해결 방법:\nGitHub Actions Cache:\n레지스트리 캐시:\n인라인 캐시:\n로컬 캐시 (self-hosted runner):\n\n캐시 모드:\nmin: 최종 이미지 레이어만\nmax: 모든 중간 레이어 포함 (권장)",
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
    "answer": "Blue-Green 배포:\n두 개의 동일한 환경을 유지하고 트래픽을 전환합니다.\n\nRolling 배포:\n인스턴스를 순차적으로 업데이트합니다.\n\nDocker의 역할:\n이미지 불변성: 버전별 독립적 이미지\n빠른 롤백: 이전 이미지로 즉시 전환\n환경 일관성: 테스트된 이미지 그대로 배포\n컨테이너 오케스트레이션: Swarm/K8s와 연동\n헬스체크: 배포 성공 여부 확인\n\n롤백:",
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
    "answer": "Docker의 역할:\n컨테이너 이미지 빌드\n단일 호스트에서 컨테이너 실행\n컨테이너 런타임 제공\n이미지 레지스트리 (Docker Hub)\n\nKubernetes의 역할:\n컨테이너 오케스트레이션\n멀티 노드 클러스터 관리\n자동 스케일링, 로드 밸런싱\n서비스 디스커버리\n롤링 업데이트, 롤백\n셀프 힐링\n\n관계:\n\n구분   Docker   Kubernetes\n\n범위   단일 호스트   클러스터\n초점   컨테이너 생성   컨테이너 관리\n스케일   수동   자동\n고가용성   제한적   내장\n\n현재 상태:\nKubernetes는 containerd, CRI-O 등 다양한 런타임 지원\nKubernetes 1.24부터 Docker 직접 지원 제거 (dockershim 제거)\n그러나 Docker로 빌드한 이미지는 여전히 K8s에서 실행 가능 (OCI 표준)\n\n요약:\nDocker = 컨테이너 빌드/실행 도구\nKubernetes = 컨테이너 오케스트레이션 플랫폼",
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
    "answer": "비교:\n\n구분   Docker Swarm   Kubernetes\n\n복잡도   낮음   높음\n학습 곡선   완만   가파름\n설치   Docker 내장   별도 설치 필요\n확장성   중소 규모   대규모\n기능   기본적   풍부함\n생태계   제한적   매우 활발\n자동 스케일링   제한적   강력 (HPA, VPA)\n로드 밸런싱   내장   내장 + Ingress\n\nDocker Swarm 사용 시나리오:\n소규모 클러스터 (5-10 노드)\n빠른 구축 필요\nDocker 생태계에 익숙한 팀\n복잡한 기능 불필요\n리소스 제한 환경\n\nKubernetes 사용 시나리오:\n대규모 클러스터\n복잡한 마이크로서비스\n자동 스케일링 필수\n멀티 클라우드/하이브리드\n풍부한 에코시스템 활용\n\n예시:\n\n결론:\n단순함과 빠른 시작: Swarm\n확장성과 기능: Kubernetes",
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
    "answer": "Docker in Docker (DinD):\nDocker 컨테이너 내부에서 Docker 데몬을 실행하여 컨테이너 안에서 컨테이너를 빌드/실행하는 방식입니다.\n\n사용 방법:\n\nDinD vs DooD:\n구분   DinD   DooD (Docker outside of Docker)\n\n방식   컨테이너 내 Docker 데몬   호스트 Docker 소켓 마운트\n격리   완전 격리   호스트와 공유\n성능   오버헤드 있음   네이티브\n보안   --privileged 필요   소켓 접근 권한만\n\n사용 시나리오:\nCI/CD 파이프라인에서 Docker 이미지 빌드\n개발/테스트 환경\n\n고려사항:\n보안 위험:\n--privileged 플래그는 호스트 전체 접근 권한 부여\n프로덕션에서는 피해야 함\n스토리지 드라이버:\nDinD 내부 overlay와 외부 overlay 충돌 가능\nvfs 드라이버 사용 권장 (느림)\n캐시 공유:\nDinD는 매번 새로운 캐시\n볼륨으로 캐시 공유 필요\n\n권장:\n가능하면 DooD 또는 Kaniko 사용\nCI/CD: Kaniko, Buildah 등 대안 고려",
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
    "answer": "주요 Storage Driver:\n\n드라이버   특징   권장 환경\n\noverlay2   현재 기본값, 안정적   대부분의 Linux\nfuse-overlayfs   Rootless 모드용   Rootless Docker\nbtrfs   CoW 파일 시스템   btrfs 파티션\nzfs   스냅샷, 압축 지원   zfs 파티션\nvfs   간단, 비효율적   테스트, 다른 드라이버 불가 시\naufs   레거시   Ubuntu 이전 버전\ndevicemapper   레거시   CentOS/RHEL 이전 버전\n\noverlay2 (권장):\n\n선택 기준:\n커널 버전: overlay2는 4.0+ 필요\n파일 시스템: backing filesystem 호환성\n워크로드: 쓰기 집약적 → 직접 마운트 볼륨 권장\nRootless: fuse-overlayfs 필요\n\n확인 및 변경:",
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
    "answer": "장점:\n서비스 독립성:\n각 서비스를 독립적인 컨테이너로 패키징\n서로 다른 기술 스택 사용 가능\n일관된 환경:\n개발, 테스트, 운영 환경 동일\n\"내 컴퓨터에서는 되는데\" 문제 해결\n빠른 배포:\n서비스별 독립 배포\n롤백 용이\n확장성:\n서비스별 수평 확장\n리소스 효율적 사용\n격리:\n서비스 간 영향 최소화\n장애 전파 방지\n\n주의점:\n네트워크 복잡성:\n서비스 간 통신 관리\n서비스 디스커버리 필요\n데이터 관리:\n볼륨 전략 수립\n데이터 일관성\n모니터링:\n분산 로깅 필요\n트레이싱 구현\n보안:\n컨테이너 간 통신 암호화\n이미지 취약점 관리\n오케스트레이션:\n많은 컨테이너 관리를 위해 K8s/Swarm 고려\n\n구조 예시:",
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
    "answer": "Control Plane: 클러스터 상태 관리 및 의사결정 담당 (kube-apiserver, etcd, scheduler, controller-manager)\n\nWorker Node: 실제 Pod 실행 담당 (kubelet, kube-proxy, Container Runtime)\n\n핵심 차이: Control Plane은 \"결정\", Worker Node는 \"실행\"",
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
    "answer": "역할: Kubernetes API를 노출하는 Control Plane의 프론트엔드. 모든 컴포넌트 간 통신의 중심점.\n\n동작 방식:\nRESTful API 제공 (kubectl, 다른 컴포넌트 요청 처리)\n인증, 인가, Admission Control 수행\netcd와 직접 통신하는 유일한 컴포넌트\n\n통신 방식: 다른 컴포넌트들은 API Server를 통해서만 상호작용 (Hub-and-Spoke 패턴)",
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
    "answer": "역할: 클러스터의 모든 상태 데이터를 저장하는 분산 키-값 저장소\n\n중요성:\n모든 클러스터 설정, Pod/Service 정보, Secret 등 저장\n고가용성을 위해 Raft 합의 알고리즘 사용\n강력한 일관성 보장 (linearizable reads)\n\n백업이 중요한 이유: etcd 손실 = 클러스터 전체 상태 손실. 재해 복구를 위해 정기적 백업 필수\n\n운영 시 주의사항:\n홀수 개 노드 권장 (3, 5, 7) - 쿼럼 유지 위해\n디스크 I/O 성능 중요 (SSD 권장)\n네트워크 지연에 민감 (같은 데이터센터 권장)\nAPI Server만 etcd에 직접 접근해야 함\n\n흔한 함정:\netcd 복구 시 모든 Control Plane 노드에서 동시 수행 필요\n스냅샷 복원 후 클러스터 멤버십 재구성 필요할 수 있음\n백업 없이 업그레이드 시도 (항상 먼저 백업)",
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
    "answer": "스케줄링 과정:\nFiltering (Predicates): Pod 실행 가능한 노드 필터링 (리소스, nodeSelector, taint/toleration 등 확인)\nScoring (Priorities): 필터링된 노드들에 점수 부여 (리소스 균형, affinity 등 고려)\n최고 점수 노드에 Pod 배정 (동점 시 랜덤)\n\nFiltering: \"실행 가능한가?\" - 불가능한 노드 제외\nPodFitsResources, PodFitsHostPorts, MatchNodeSelector 등\n\nScoring: \"어디가 최적인가?\" - 적합도 점수 계산 (0-100)\nLeastRequestedPriority, BalancedResourceAllocation, NodeAffinityPriority 등\n\n흔한 함정:\n상황   결과\n\nFiltering 통과 노드 0개   Pod Pending (Unschedulable)\n모든 노드 동점   랜덤 선택 (예측 불가)\nnodeSelector 오타   Filtering 실패로 Pending\n\n디버깅 팁: kubectl describe pod에서 Events의 FailedScheduling 메시지 확인",
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
    "answer": "주요 컨트롤러:\nNode Controller: 노드 상태 모니터링, 장애 감지\nReplication Controller: ReplicaSet의 Pod 수 유지\nEndpoints Controller: Service와 Pod 연결 관리\nServiceAccount Controller: 네임스페이스별 기본 ServiceAccount 생성\nDeployment Controller: Deployment 상태 관리\n\n모든 컨트롤러는 현재 상태를 원하는 상태로 수렴시키는 제어 루프 실행",
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
    "answer": "역할: 클라우드 공급자 전용 로직을 Kubernetes 코어에서 분리하여 관리\n\n주요 컨트롤러:\nNode Controller: 클라우드에서 노드 삭제 시 감지\nRoute Controller: 클라우드 인프라 라우트 설정\nService Controller: LoadBalancer 타입 Service 생성 시 클라우드 로드밸런서 프로비저닝\n\n통합 방식: 각 클라우드 벤더(AWS, GCP, Azure)가 자체 cloud-controller-manager 구현 제공",
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
    "answer": "역할: 각 노드에서 실행되며 Pod와 컨테이너 실행을 담당하는 에이전트\n\n동작 방식:\nAPI Server로부터 PodSpec 수신\nContainer Runtime을 통해 컨테이너 생성/관리\nPod 상태를 주기적으로 API Server에 보고\n\nPod 상태 관리:\nLiveness/Readiness Probe 실행\n컨테이너 재시작 정책 적용\n리소스 사용량 모니터링",
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
    "answer": "역할: 노드의 네트워크 규칙 관리, Service의 가상 IP를 통한 Pod 접근 구현\n\niptables 모드 (기본값):\n리눅스 iptables 규칙으로 트래픽 라우팅\n랜덤 방식 로드밸런싱\n규칙이 많아지면 성능 저하 (O(n) 복잡도)\n\nIPVS 모드:\n커널 레벨 로드밸런서 사용\n다양한 로드밸런싱 알고리즘 지원 (rr, lc, sh, dh, sed, nq)\n대규모 클러스터에서 더 나은 성능 (O(1) 복잡도)\n\n트레이드오프 비교:\n관점   iptables   IPVS\n\n성능 (Service 수 증가)   저하됨   일정 유지\n설정 복잡도   단순   추가 커널 모듈 필요\n로드밸런싱 알고리즘   랜덤만   다양한 선택\n디버깅 용이성   익숙함   별도 도구 필요\n기본 지원   모든 환경   커널 지원 확인 필요\n\nIPVS 권장 상황:\n1,000개 이상 Service\n세션 어피니티 필요 (sh 알고리즘)\n균등 분배 외 알고리즘 필요\n\n주의: IPVS 모드 사용 시 ipset, ip_vs 커널 모듈 필요",
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
    "answer": "CRI: kubelet과 컨테이너 런타임 간의 표준 인터페이스. 다양한 런타임을 플러그인 방식으로 사용 가능\n\ncontainerd:\nDocker에서 분리된 런타임 (CNCF graduated)\n범용적, 다양한 기능 제공\nDocker 이미지 호환\nDocker Desktop, EKS, GKE 기본 런타임\n\nCRI-O:\nKubernetes 전용으로 설계 (CNCF incubating)\n경량화, 최소 기능만 제공\nOCI 표준 준수에 집중\nOpenShift 기본 런타임\n\n공통점: 둘 다 OCI 표준 준수, Kubernetes와 호환\n\n트레이드오프:\n관점   containerd   CRI-O\n\n기능 범위   광범위 (Docker 생태계)   Kubernetes 필수만\n리소스 사용   약간 더 많음   더 적음\n커뮤니티   더 큼   Red Hat 중심\n디버깅 도구   ctr, nerdctl   crictl\n\n참고: Docker는 Kubernetes 1.24부터 직접 지원 중단 (containerd 사용)",
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
    "answer": "CNI: 컨테이너 네트워크 설정을 위한 표준 인터페이스\n\n주요 플러그인 비교:\nCNI   특징   적합한 환경\n\nCalico   NetworkPolicy, BGP, eBPF 옵션   대규모, 보안 중시\nFlannel   단순, VXLAN 오버레이   소규모, 학습용\nCilium   eBPF 기반, L7 정책, 관찰성   고성능, 보안 중시\nWeave Net   암호화 기본, 간편 설정   멀티클라우드\nAWS VPC CNI   네이티브 VPC IP   AWS EKS\nAzure CNI   Azure VNET 통합   AKS\n\n선택 기준:\nNetworkPolicy 필요: Flannel 제외\n대규모 (1000+ 노드): Calico, Cilium\nL7 정책/관찰성: Cilium\n클라우드 네이티브: 해당 클라우드 CNI\n단순함 우선: Flannel (NetworkPolicy 불필요 시)\n\n주의: CNI 변경은 클러스터 재구성 필요 (운영 중 변경 어려움)",
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
    "answer": "Pod: Kubernetes에서 배포 가능한 가장 작은 단위. 하나 이상의 컨테이너 그룹\n\nPod 단위 관리 이유:\n공유 리소스: 같은 Pod 내 컨테이너는 네트워크(localhost), 스토리지 공유\n공동 스케줄링: 밀접하게 연관된 컨테이너를 같은 노드에 배치\n생명주기 관리: 함께 시작/종료되어야 하는 컨테이너 그룹화\nSidecar 패턴: 메인 앱 + 보조 컨테이너 조합 가능",
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
    "answer": "Pod Phase:\nPending: Pod 생성됨, 컨테이너 아직 실행 안됨 (이미지 다운로드, 스케줄링 대기)\nRunning: 최소 하나의 컨테이너 실행 중\nSucceeded: 모든 컨테이너 성공적 종료 (exit 0), 재시작 안됨\nFailed: 모든 컨테이너 종료, 하나 이상 실패 (exit non-zero)\nUnknown: Pod 상태 확인 불가 (노드 통신 문제)",
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
    "answer": "restartPolicy:\nAlways (기본값): 항상 재시작. Deployment, ReplicaSet용\nOnFailure: 실패(exit code != 0) 시만 재시작. Job용\nNever: 재시작 안함. 일회성 작업용\n\n사용 시나리오:\nAlways: 웹 서버, API 서버 등 상시 운영 앱\nOnFailure: 배치 작업, 실패 시 재시도 필요한 Job\nNever: 디버깅, 로그 분석 등 일회성 작업",
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
    "answer": "주요 원인과 해결 방법:\n리소스 부족: 노드 추가 또는 리소스 요청량 조정\nnodeSelector/affinity 불일치: 레이블 확인 및 수정\nTaint 미허용: Toleration 추가\nPVC 바인딩 실패: PV 확인, StorageClass 점검\n이미지 다운로드 지연: 이미지 경로/권한 확인\n\n디버깅 순서:\nkubectl describe pod <pod-name> - Events 섹션 확인\nkubectl get events --sort-by='.lastTimestamp' - 최근 이벤트 확인\nConditions 섹션의 상세 메시지 확인\n\n흔한 함정:\n증상   실제 원인   확인 방법\n\nPending 지속   Scheduler가 없음   kube-scheduler Pod 확인\nPending + 이벤트 없음   resourceQuota 초과   kubectl describe resourcequota\nImagePullBackOff와 혼동   이미지 문제는 Pending이 아님   Events에서 구분\n\n팁: kubectl get pod <name> -o yaml | grep -A 5 conditions 로 상세 조건 확인",
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
    "answer": "Pod Phase: Pod 전체의 상태 (Pending, Running, Succeeded, Failed, Unknown)\n\nContainer State: 개별 컨테이너의 상태\nWaiting: 시작 대기 (이미지 pull, 볼륨 마운트 등)\nRunning: 실행 중\nTerminated: 종료됨 (성공/실패)\n\n차이점:\nPod Phase는 상위 레벨 요약\nContainer State는 각 컨테이너의 세부 상태\nPod Running이어도 일부 컨테이너는 Waiting/Terminated일 수 있음",
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
    "answer": "Sidecar 패턴: 메인 컨테이너와 함께 보조 기능을 수행하는 컨테이너를 같은 Pod에 배치\n\n사용 상황:\n로깅: 로그 수집/전송 (Fluentd sidecar)\n모니터링: 메트릭 수집 (Prometheus exporter)\n프록시: 서비스 메시 (Envoy sidecar)\n설정 동기화: ConfigMap 변경 감지\n\n예시: 웹 서버 + 로그 수집기\n메인: nginx 컨테이너\nSidecar: fluentd 컨테이너 (로그 파일 읽어서 전송)\n공유 볼륨으로 로그 파일 공유",
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
    "answer": "Ambassador 패턴: 외부 서비스 접근을 대리하는 프록시 컨테이너 패턴\n\n역할: 메인 컨테이너가 localhost로 통신하면, Ambassador가 외부 서비스로 연결\n\n활용 사례:\nDB 연결 프록시: 메인앱 -> localhost:5432 -> Ambassador -> 실제 DB 클러스터\nAPI Gateway: 인증, 속도 제한 처리\n서비스 디스커버리: 복잡한 라우팅 로직 캡슐화\n레거시 시스템 연동: 프로토콜 변환\n\n장점: 메인 앱 코드 변경 없이 외부 연결 로직 분리",
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
    "answer": "Adapter 패턴: 메인 컨테이너의 출력을 표준 형식으로 변환하는 컨테이너 패턴\n\n역할: 다양한 형식의 데이터를 통일된 인터페이스로 변환\n\n활용 사례:\n로그 포맷 변환: 앱별 로그 형식 -> 표준 JSON 형식\n메트릭 변환: 앱 메트릭 -> Prometheus 형식\n데이터 정규화: 레거시 시스템 출력 변환\n프로토콜 변환: XML -> JSON\n\n예시: 로그 어댑터\n메인: 자체 로그 형식 출력\nAdapter: 로그 파일 읽어서 표준 JSON으로 변환 후 출력",
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
    "answer": "역할: Pod 내 메인 컨테이너 시작 전에 초기화 작업 수행\n\n일반 컨테이너와의 차이점:\n구분   Init Container   일반 컨테이너\n\n실행 시점   메인 컨테이너 전   Init 완료 후\n실행 방식   순차적 (하나씩)   동시 (병렬)\n완료 조건   반드시 성공 종료   계속 실행\nProbe   지원 안함   지원\n리소스 계산   가장 큰 것만   합계\n\n사용 예시:\nDB 연결 대기 (의존성 확인)\n설정 파일 다운로드\n권한/스키마 초기화\n보안 검사, 인증서 설정\n\nKubernetes 1.28+ Sidecar Container:\nrestartPolicy: Always를 가진 Init Container\nInit 완료 후에도 계속 실행\n기존 Sidecar 패턴의 공식 지원\n\n흔한 함정:\nInit Container 무한 루프 시 Pod 시작 불가\n외부 의존성 timeout 미설정 시 무한 대기\nInit Container도 imagePullPolicy 적용됨",
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
    "answer": "실행 순서:\nInit Container들이 정의된 순서대로 순차 실행\n각 Init Container는 이전 것이 성공해야 시작\n모든 Init Container 성공 후 메인 컨테이너 시작\n\n실패 시 동작:\nInit Container 실패 -> Pod 재시작 (restartPolicy에 따라)\nrestartPolicy: Always/OnFailure -> Init Container부터 재실행\nrestartPolicy: Never -> Pod Failed 상태\n\n주의사항:\nInit Container 실패 시 Pod는 Pending 상태 유지\n무한 재시도로 CrashLoopBackOff 발생 가능",
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
    "answer": "Deployment 역할:\n선언적 Pod 업데이트 관리\n롤링 업데이트, 롤백 지원\n배포 이력 관리\n\nReplicaSet과의 관계:\nDeployment는 ReplicaSet을 생성하고 관리\nReplicaSet은 Pod 복제본 수 유지\n업데이트 시 새 ReplicaSet 생성, 기존 것은 스케일 다운\n\n구조: Deployment -> ReplicaSet -> Pod\n\n직접 ReplicaSet 사용하지 않는 이유: Deployment가 버전 관리, 롤백 등 추가 기능 제공",
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
    "answer": "RollingUpdate (기본값):\n점진적으로 새 버전 배포\n다운타임 없음\n두 버전이 동시에 존재하는 시간 있음\n\nRecreate:\n기존 Pod 모두 종료 후 새 Pod 생성\n다운타임 발생\n버전 혼재 없음\n\n트레이드오프 비교:\n관점   RollingUpdate   Recreate\n\n다운타임   없음   있음 (수초~수분)\n리소스 사용   일시적 증가 (신/구 공존)   일정\n버전 호환성   두 버전 공존 처리 필요   불필요\n롤백 속도   빠름 (이전 ReplicaSet 유지)   느림 (재배포)\n데이터 마이그레이션   복잡 (양방향 호환 필요)   단순\n\n사용 시나리오:\nRollingUpdate: 일반적인 웹 서비스, API 서버\nRecreate:\nRWO 볼륨을 단일 Pod만 사용해야 할 때\n버전 간 호환성 문제가 있을 때 (DB 스키마 변경)\n개발/테스트 환경\n리소스 여유가 없을 때\n\n주의: RollingUpdate 시 API 버전 호환성 (backward/forward compatibility) 설계 필수",
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
    "answer": "maxSurge: 원하는 Pod 수 대비 최대 초과 생성 가능 수\n예: replicas=10, maxSurge=25% -> 최대 12개까지 존재 가능\n\nmaxUnavailable: 업데이트 중 최대 사용 불가 Pod 수\n예: replicas=10, maxUnavailable=25% -> 최소 7개는 항상 가용\n\n적절한 설정:\n빠른 배포: maxSurge 높게, maxUnavailable 높게\n안정적 배포: maxSurge 낮게, maxUnavailable=0\n리소스 제한: maxSurge=0, maxUnavailable 활용\n\n기본값: 둘 다 25%",
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
    "answer": "롤백 방법:\n\nRevision History 관리:\nrevisionHistoryLimit: 보관할 ReplicaSet 수 (기본값 10)\n각 업데이트마다 새 ReplicaSet 생성, 기존 것은 보관\n이력에서 롤백 가능",
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
    "answer": "Blue-Green 배포:\n두 개의 Deployment 생성 (blue, green)\nService selector로 하나만 활성화\n전환 시 Service selector 변경\n\nCanary 배포:\n기존 Deployment + 새 버전 Deployment (적은 replicas)\n동일한 label로 Service가 둘 다 선택\n점진적으로 새 버전 replicas 증가\n\n고급 방법: Istio VirtualService로 트래픽 비율 제어",
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
    "answer": "StatefulSet: 상태를 가진 애플리케이션을 위한 워크로드 리소스\n\nDeployment와의 차이점:\n구분   StatefulSet   Deployment\n\nPod 이름   고정 (app-0, app-1)   랜덤\n네트워크 ID   고정 (Headless Service)   변경 가능\n스토리지   Pod별 PVC 유지   공유 또는 없음\n배포 순서   순차적   병렬\n삭제 순서   역순   무관\n\n트레이드오프 고려사항:\n관점   StatefulSet 선택   Deployment 선택\n\n복잡도   높음 (Headless Service, PVC 관리)   낮음\n스케일링 속도   느림 (순차적)   빠름 (병렬)\n복구 시간   느림 (순서 보장)   빠름\n데이터 지속성   보장 (PVC 유지)   별도 설계 필요\n\nStatefulSet 사용 시 주의점:\nHeadless Service 필수 (clusterIP: None)\nStatefulSet 삭제해도 PVC는 자동 삭제 안됨 (데이터 보호)\n롤링 업데이트 시 역순(N-1 → 0)으로 진행\nPod 재생성 시 같은 노드 보장 안됨 (PV 접근 가능해야 함)\n\n사용 사례: 데이터베이스, 분산 시스템 (Kafka, ZooKeeper, Elasticsearch)",
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
    "answer": "Pod 이름 안정성:\n형식: <statefulset-name>-<ordinal> (예: mysql-0, mysql-1)\nPod 재생성 시에도 동일한 이름 유지\nordinal은 0부터 순차 증가\n\n네트워크 ID 안정성:\nHeadless Service와 함께 사용\nDNS: <pod-name>.<service-name>.<namespace>.svc.cluster.local\n예: mysql-0.mysql.default.svc.cluster.local\n\n보장 방법:\nStatefulSet Controller가 ordinal 기반 관리\nPod 삭제/재생성 시 동일 이름과 PVC 재연결",
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
    "answer": "podManagementPolicy 설정:\n\nOrderedReady (기본값):\nPod를 순서대로 생성 (0 -> 1 -> 2)\n이전 Pod가 Ready 상태여야 다음 생성\n삭제는 역순 (2 -> 1 -> 0)\n사용: 마스터-슬레이브 DB, 리더 선출 시스템\n\nParallel:\n모든 Pod 동시 생성/삭제\n순서 보장 불필요 시 사용\n더 빠른 스케일링",
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
    "answer": "역할: 각 Pod에 대해 개별 PVC 자동 생성\n\n동작 방식:\nPod 생성 시 volumeClaimTemplates 기반으로 PVC 생성\nPVC 이름: <template-name>-<statefulset-name>-<ordinal>\nPod와 PVC 영구 연결\n\n특징:\nPod 삭제 시 PVC는 유지됨\nPod 재생성 시 기존 PVC 재연결\nStatefulSet 삭제 시에도 PVC 수동 삭제 필요",
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
    "answer": "Headless Service: ClusterIP가 None인 Service\n\n필요한 이유:\n개별 Pod 접근: 각 Pod에 고유 DNS 이름 부여\n일반 Service: 로드밸런싱으로 임의 Pod 접근\nHeadless: 특정 Pod 직접 접근 가능\nDNS 레코드 생성:\npod-name.service-name.namespace.svc.cluster.local\n클라이언트가 특정 인스턴스에 연결 필요 시 사용\n상태 저장 앱 요구사항:\nDB 복제 시 마스터/슬레이브 구분 필요\n클러스터 멤버 간 직접 통신",
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
    "answer": "역할: 모든(또는 특정) 노드에서 Pod를 하나씩 실행하도록 보장\n\n동작:\n노드 추가 시 자동으로 Pod 생성\n노드 삭제 시 자동으로 Pod 제거\n\n사용 사례:\n로그 수집: Fluentd, Filebeat (각 노드 로그 수집)\n모니터링: Node Exporter, Datadog Agent\n네트워킹: CNI 플러그인 (Calico, Weave)\n스토리지: CSI 드라이버\n보안: 보안 에이전트, 안티바이러스",
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
    "answer": "방법 1: nodeSelector\n\n방법 2: Node Affinity\n\n방법 3: Toleration (Taint된 노드에 배포)",
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
    "answer": "역할: 하나 이상의 Pod를 생성하고 지정된 수만큼 성공적으로 완료되도록 보장\n\n설정값:\ncompletions: 성공해야 하는 Pod 수 (기본값: 1)\nparallelism: 동시에 실행할 Pod 수 (기본값: 1)\n\n예시:\n\n동작 패턴:\ncompletions=1, parallelism=1: 단일 작업\ncompletions=N, parallelism=1: 순차 실행\ncompletions=N, parallelism=M: 병렬 배치",
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
    "answer": "backoffLimit:\nJob 실패 시 재시도 횟수 (기본값: 6)\n재시도 간격: 지수 백오프 (10s, 20s, 40s... 최대 6분)\n초과 시 Job Failed 상태\n\nactiveDeadlineSeconds:\nJob의 최대 실행 시간 (초)\n시간 초과 시 모든 Pod 종료, Job Failed\nbackoffLimit보다 우선\n\n사용 시나리오:\n무한 루프 방지\nSLA 준수를 위한 타임아웃 설정",
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
    "answer": "역할: 지정된 스케줄에 따라 Job을 반복 생성\n\n스케줄 표현식 (Cron 형식):\n\nconcurrencyPolicy:\nAllow (기본값): 동시 실행 허용\nForbid: 이전 Job 실행 중이면 새 Job 건너뜀\nReplace: 이전 Job 취소하고 새 Job 시작",
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
    "answer": "역할: Pod 집합에 대한 단일 접근점 제공 및 로드밸런싱\n\n필요성:\nPod IP 변동성: Pod 재생성 시 IP 변경됨\n서비스 디스커버리: 안정적인 DNS 이름 제공\n로드밸런싱: 여러 Pod에 트래픽 분산\n추상화: 백엔드 Pod 변경에도 클라이언트 영향 없음\n\n동작 방식:\nLabel Selector로 대상 Pod 그룹 지정\nClusterIP (가상 IP) 할당\nkube-proxy가 트래픽 라우팅 규칙 관리",
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
    "answer": "동작 방식:\n클러스터 내부에서만 접근 가능한 가상 IP 할당\nkube-proxy가 ClusterIP로 오는 트래픽을 Pod로 라우팅\nDNS: <service-name>.<namespace>.svc.cluster.local\n\n특징:\n기본 Service 타입\n외부에서 직접 접근 불가\n클러스터 내 Pod 간 통신용\n\n장점:\n가장 단순하고 안전한 옵션\n외부 노출이 없어 보안에 유리\n리소스 오버헤드 최소\n\n단점/제한:\n외부 접근 불가 (kubectl port-forward로 디버깅 가능)\n클러스터 외부 클라이언트는 사용 불가\n\n사용 시나리오:\n내부 마이크로서비스 간 통신\n백엔드 DB 접근\n캐시 서버 (Redis) 접근\n내부 API 서비스",
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
    "answer": "동작 방식:\nClusterIP 기능 포함\n모든 노드의 특정 포트에서 Service 노출\n<NodeIP>:<NodePort>로 외부 접근 가능\n트래픽: NodePort -> ClusterIP -> Pod\n\n포트 범위:\n기본: 30000-32767\nkube-apiserver --service-node-port-range 플래그로 변경 가능\n\n장점:\n클라우드 로드밸런서 없이 외부 노출 가능\n비용 없음 (추가 인프라 불필요)\n온프레미스 환경에서 유용\n\n단점/제한:\n노드 IP 직접 노출 (보안 위험)\n노드당 하나의 포트만 사용 가능\n노드 장애 시 해당 노드로의 접근 불가 (클라이언트가 다른 노드 IP 알아야 함)\n포트 범위 제한 (30000-32767)\nWell-known 포트 (80, 443) 사용 불가\n\n사용 시나리오:\n개발/테스트 환경\n로드밸런서 없는 온프레미스 환경\n외부 로드밸런서와 연동\n\n실제 운영 고려사항:\n프로덕션에서는 앞단에 로드밸런서 배치 권장\nexternalTrafficPolicy: Local 설정 시 클라이언트 IP 보존 가능 (단, 트래픽 불균형 가능)",
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
    "answer": "동작 방식:\nNodePort 기능 포함\n클라우드 로드밸런서 자동 프로비저닝\n외부 IP 할당\n트래픽: External LB -> NodePort -> ClusterIP -> Pod\n\n프로비저닝 과정:\nService 생성 시 cloud-controller-manager가 감지\n클라우드 API 호출하여 LB 생성 (AWS ELB, GCP LB 등)\nLB가 NodePort로 트래픽 전달하도록 설정\nExternal IP가 Service에 할당\n\n장점:\n단일 외부 IP로 서비스 노출\n클라우드 네이티브 로드밸런싱 (헬스체크, SSL 종료 등)\n노드 장애에도 자동 페일오버\nWell-known 포트 (80, 443) 사용 가능\n\n단점/제한:\nService당 로드밸런서 1개 = 비용 증가\n클라우드 환경 의존적\n프로비저닝 시간 필요 (수십 초 ~ 수 분)\nL4 로드밸런서 (HTTP 라우팅 불가)\n\n비용 최적화 팁:\n여러 서비스 노출 시 Ingress 사용 권장 (LB 1개로 여러 서비스)\n내부 전용 서비스는 ClusterIP 사용\n\n주의사항:\n클라우드 환경에서만 동작\nLB당 비용 발생\n온프레미스는 MetalLB 등 별도 솔루션 필요",
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
    "answer": "역할: 외부 DNS 이름을 클러스터 내부 Service 이름으로 매핑 (CNAME 레코드)\n\n동작 방식:\nClusterIP 할당 없음\nDNS 쿼리 시 외부 도메인으로 CNAME 반환\n프록시나 포워딩 없이 DNS 레벨 리디렉션\n\n사용 사례:\n외부 데이터베이스 연결 (RDS, Cloud SQL)\n외부 API 서비스 추상화\n마이그레이션 중 외부 서비스 참조\n환경별 외부 서비스 전환",
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
    "answer": "Headless Service: clusterIP: None으로 설정된 Service\n\n특징:\nClusterIP 할당 없음\nDNS 쿼리 시 Pod IP들 직접 반환\n로드밸런싱 없이 개별 Pod 접근\n\nStatefulSet과 함께 사용하는 이유:\n개별 Pod DNS: pod-name.service.namespace.svc.cluster.local\n안정적 네트워크 ID: Pod 이름 기반 DNS로 재시작 후에도 동일\n직접 통신: 클러스터 멤버 간 피어 통신 필요 (DB 복제)\n클라이언트 제어: 클라이언트가 특정 인스턴스 선택 가능\n\n예: Kafka 브로커, MySQL 마스터/슬레이브 구분",
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
    "answer": "Ingress 역할: HTTP/HTTPS 트래픽을 클러스터 내부 Service로 라우팅하는 API 객체\n\nService와의 차이점:\n구분   Ingress   Service (LB)\n\n프로토콜   HTTP/HTTPS   L4 (TCP/UDP)\n라우팅   호스트/경로 기반   포트 기반\nSSL 종료   지원   별도 설정 필요\n단일 진입점   여러 Service 통합   Service당 하나\n비용   LB 하나로 여러 서비스   Service마다 LB\n\nIngress 기능:\n경로 기반 라우팅 (/api, /web)\n호스트 기반 라우팅 (api.example.com)\nTLS/SSL 종료\n\n트레이드오프 - Ingress vs LoadBalancer Service:\n상황   Ingress 선택   LoadBalancer 선택\n\nHTTP/HTTPS 서비스   O   -\nTCP/UDP 서비스 (DB, gRPC)   X   O\n여러 서비스 통합   O   -\n단일 서비스 노출   -   O (단순)\n비용 최적화   O   -\nL4 기능 필요   -   O\n\n주의사항:\nIngress 리소스만으로는 동작 안함 - Ingress Controller 필수\n비-HTTP 프로토콜은 Ingress로 처리 불가",
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
    "answer": "역할: Ingress 리소스를 감시하고 실제 라우팅 규칙을 구현하는 컨트롤러\n\n주요 구현체 비교:\n구현체   특징\n\nNGINX   가장 널리 사용, 안정적, 풍부한 기능\nTraefik   자동 설정, Let's Encrypt 통합, 경량\nHAProxy   고성능, 엔터프라이즈급 로드밸런싱\nContour   Envoy 기반, 멀티테넌트 지원\nAWS ALB   AWS 통합, 네이티브 ALB 사용\n\n선택 기준:\n성능 요구사항\n필요한 기능 (mTLS, 속도 제한)\n클라우드 환경\n운영 복잡도",
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
    "answer": "호스트 기반 라우팅:\n\n경로 기반 라우팅:\n\npathType: Exact, Prefix, ImplementationSpecific",
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
    "answer": "수동 TLS 설정:\n\ncert-manager 연동:\n\ncert-manager가 Let's Encrypt 인증서 자동 발급/갱신",
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
    "answer": "annotations: Ingress Controller별 추가 설정 (NGINX Ingress 예시)\n\nRate Limiting:\n\nURL Rewrite:\n\n기타 유용한 annotations:\nssl-redirect: HTTP -> HTTPS 리디렉션\nproxy-body-size: 요청 바디 크기 제한\nproxy-read-timeout: 타임아웃 설정\nwhitelist-source-range: IP 화이트리스트",
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
    "answer": "PersistentVolume (PV):\n클러스터 레벨의 스토리지 리소스\n관리자가 프로비저닝 (또는 동적 생성)\n실제 스토리지 (NFS, EBS, PD 등)를 추상화\n\nPersistentVolumeClaim (PVC):\n사용자의 스토리지 요청\n필요한 크기, 접근 모드 명시\nPod에서 볼륨으로 마운트\n\n관계:\nPVC는 조건 맞는 PV에 바인딩\n1:1 관계 (하나의 PVC = 하나의 PV)\nPVC 삭제 시 PV는 reclaimPolicy에 따라 처리",
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
    "answer": "접근 모드:\n모드   약어   설명\n\nReadWriteOnce   RWO   단일 노드에서 읽기/쓰기\nReadOnlyMany   ROX   여러 노드에서 읽기 전용\nReadWriteMany   RWX   여러 노드에서 읽기/쓰기\nReadWriteOncePod   RWOP   단일 Pod에서만 읽기/쓰기\n\n스토리지 타입별 지원:\nAWS EBS: RWO만 지원\nNFS: RWO, ROX, RWX 모두 지원\nGCP PD: RWO, ROX 지원\n\n사용 시나리오:\nRWO: 일반 DB, 단일 인스턴스 앱\nROX: 공유 설정 파일, 정적 콘텐츠\nRWX: 여러 Pod가 공유하는 업로드 디렉토리",
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
    "answer": "Reclaim Policy: PVC 삭제 후 PV 처리 방법\n\n정책   동작   사용 시나리오\n\nRetain   PV와 데이터 유지, 수동 정리 필요   중요 데이터, 프로덕션 DB\nDelete   PV와 외부 스토리지 함께 삭제   임시 데이터, 동적 프로비저닝\nRecycle   데이터 삭제 후 PV 재사용 (deprecated)   사용 권장 안함\n\nRetain 후 재사용 절차:\nPVC 삭제\nPV에서 claimRef 제거\n필요시 데이터 정리\n새 PVC로 바인딩\n\n기본값: StorageClass에 따라 다름 (동적 프로비저닝은 보통 Delete)",
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
    "answer": "StorageClass 역할: 스토리지 \"클래스\" 정의 - 프로비저너, 파라미터, 정책 지정\n\n동적 프로비저닝 동작:\nPVC 생성 시 storageClassName 지정\nProvisioner가 PVC 감지\n자동으로 PV 생성 및 외부 스토리지 프로비저닝\nPVC와 PV 자동 바인딩\n\nvolumeBindingMode 트레이드오프:\n모드   장점   단점\n\nImmediate   PVC 생성 즉시 볼륨 확보   잘못된 Zone에 생성 가능\nWaitForFirstConsumer   Pod와 같은 Zone 보장   Pod 스케줄링까지 대기 필요\n\nWaitForFirstConsumer 권장 상황:\n멀티 Zone 클러스터\nZone 제약 있는 스토리지 (EBS, PD)\n\n흔한 함정:\nImmediate + Zone 스토리지 → Pod가 다른 Zone에 스케줄되면 마운트 실패\nStorageClass 없이 PVC 생성 → default StorageClass 필요\nreclaimPolicy: Delete인데 데이터 보존 기대",
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
    "answer": "CSI 역할: 스토리지 시스템과 Kubernetes 간 표준 인터페이스\n\n장점:\n스토리지 벤더 독립적\nKubernetes 코어와 분리된 개발/배포\n플러그인 방식으로 새 스토리지 추가\n\n주요 CSI 드라이버:\n드라이버   스토리지\n\naws-ebs-csi-driver   AWS EBS\ngcp-pd-csi-driver   GCP Persistent Disk\nazuredisk-csi-driver   Azure Disk\ncsi-driver-nfs   NFS\nsecrets-store-csi-driver   Secret 관리\nceph-csi   Ceph RBD/CephFS\n\n구성 요소: Controller Plugin, Node Plugin",
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
    "answer": "볼륨 타입   생명주기   사용 사례\n\nemptyDir   Pod와 함께 (임시)   컨테이너 간 데이터 공유, 캐시\nhostPath   노드에 영구 저장   로그 수집, 시스템 파일 접근\nconfigMap   ConfigMap 수명   설정 파일, 환경변수\nsecret   Secret 수명   민감 정보 (패스워드, 키)\n\nemptyDir: Pod 삭제 시 데이터 손실\n\nhostPath: 노드 종속적, 보안 주의\n\nconfigMap/secret: 읽기 전용, 자동 업데이트 가능",
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
    "answer": "역할: 설정 데이터를 키-값 쌍으로 저장, 컨테이너와 설정 분리\n\n생성 방법:\n\nLiteral (키-값):\n\nFile (파일 내용):\n\nDirectory (디렉토리 전체):\n\nYAML로 직접 생성:",
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
    "answer": "환경변수 방식:\nPod 시작 시 값 고정\nConfigMap 변경 시 Pod 재시작 필요\n단순 키-값에 적합\n\n볼륨 마운트 방식:\n파일로 마운트\nConfigMap 변경 시 자동 업데이트 (지연 있음)\n설정 파일 형태에 적합\n\n차이점 요약:\n방식   업데이트   형태\n\n환경변수   재시작 필요   키-값\n볼륨   자동 (수초~분)   파일",
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
    "answer": "역할: 민감한 데이터 (패스워드, 토큰, 키) 저장\n\nConfigMap과의 차이:\n구분   Secret   ConfigMap\n\n용도   민감 데이터   일반 설정\n저장   Base64 인코딩   평문\n메모리   tmpfs에 저장 (볼륨 마운트 시)   일반 저장\n크기 제한   1MB   1MB\nkubectl 출력   기본적으로 숨김   표시됨\n\nSecret은 정말 안전한가?\n기본적으로 안전하지 않음: Base64는 암호화가 아닌 인코딩\netcd에 평문 저장 (기본 설정)\nAPI 접근 권한이 있으면 누구나 디코딩 가능\nkubectl get secret -o yaml로 노출 가능\n\n기본 제공 보안 기능:\netcd 통신 TLS 암호화 (전송 중)\nRBAC로 접근 제어 가능\nAudit 로그로 접근 추적 가능\n\n보안 강화 방법 (프로덕션 필수):\netcd 암호화 활성화 (EncryptionConfiguration) - 저장 시 암호화\nRBAC로 접근 제한 - 필요한 ServiceAccount/User만 허용\n외부 시크릿 관리자 사용 (Vault, AWS Secrets Manager)\nSealed Secrets 사용 - Git에 암호화된 상태로 저장\nSecret 자동 회전 - 정기적으로 갱신\n\n흔한 실수:\nSecret을 Git에 커밋 (Base64는 쉽게 디코딩됨)\n모든 Pod에 default ServiceAccount 사용\nSecret 접근 로그 미확인",
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
    "answer": "주요 Secret 타입:\n\n타입   용도\n\nOpaque   기본 타입, 임의의 사용자 데이터\nkubernetes.io/dockerconfigjson   Docker 레지스트리 인증\nkubernetes.io/tls   TLS 인증서 (tls.crt, tls.key)\nkubernetes.io/basic-auth   기본 인증 (username, password)\nkubernetes.io/ssh-auth   SSH 인증 (ssh-privatekey)\nkubernetes.io/service-account-token   ServiceAccount 토큰\n\n생성 예시:",
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
    "answer": "연동 방법:\nExternal Secrets Operator:\n외부 시크릿을 Kubernetes Secret으로 동기화\nAWS Secrets Manager, Vault, GCP Secret Manager 지원\nSecrets Store CSI Driver:\nCSI 볼륨으로 시크릿 마운트\nPod에서 파일로 접근\nVault Agent Injector:\nSidecar로 Vault 시크릿 주입\n자동 갱신 지원\n\n장점: 중앙 집중 관리, 감사 로그, 자동 회전",
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
    "answer": "자동 반영되지 않는 이유:\n환경변수: Pod 시작 시 값이 고정됨\n볼륨 마운트: 자동 업데이트되나 앱이 파일 변경 감지 필요\n앱 재시작 없이 설정 리로드 로직 필요\n\n해결 방법:\nPod 재시작 (롤아웃):\nReloader 사용 (stakater/Reloader):\nConfigMap/Secret 변경 감지 후 자동 롤아웃\n해시 기반 업데이트:\nConfigMap 해시를 annotation에 포함\n변경 시 Deployment 스펙 변경 -> 자동 롤아웃\n앱 레벨 핫 리로드 구현",
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
    "answer": "nodeSelector 사용법:\n\n노드에 해당 레이블이 있어야 스케줄링됨\n\n노드 레이블 추가:\n\n한계점:\n단순 일치만 가능: OR, NOT 조건 불가\nHard 제약만: 조건 불일치 시 스케줄링 실패\nSoft 선호 불가: \"가능하면\" 조건 표현 못함\n복잡한 표현식 불가: In, NotIn, Exists 등 미지원\n\n대안: Node Affinity 사용\n더 풍부한 표현식\nSoft/Hard 제약 모두 지원",
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
    "answer": "nodeSelector vs Node Affinity:\n구분   nodeSelector   Node Affinity\n\n표현력   단순 일치   In, NotIn, Exists 등\n제약 타입   Hard만   Hard + Soft\n가중치   불가   지원\n\nrequiredDuringSchedulingIgnoredDuringExecution (Hard):\n반드시 충족해야 스케줄링\n조건 불일치 시 Pending 상태\n\npreferredDuringSchedulingIgnoredDuringExecution (Soft):\n가능하면 충족, 불가시 다른 노드 선택\nweight로 우선순위 지정 (1-100)",
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
    "answer": "Pod Affinity: 특정 Pod와 같은 위치에 스케줄링\nPod Anti-Affinity: 특정 Pod와 다른 위치에 스케줄링\n\n사용 사례:\n\nPod Affinity:\n웹 서버와 캐시 서버를 같은 노드에 배치 (지연 감소)\n관련 서비스 Co-location\n\nPod Anti-Affinity:\n동일 앱 Pod를 다른 노드에 분산 (고가용성)\n리소스 경합 방지\n\n-> 같은 app=web Pod가 있는 노드 피함",
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
    "answer": "topologyKey: Pod Affinity/Anti-Affinity의 범위 정의\nkubernetes.io/hostname: 노드 단위\ntopology.kubernetes.io/zone: 가용영역 단위\ntopology.kubernetes.io/region: 리전 단위\n\nTopology Spread Constraints: Pod를 토폴로지 도메인에 균등 분산\n\n설정값:\nmaxSkew: 최대 불균형 허용치\ntopologyKey: 분산 기준 도메인\nwhenUnsatisfiable: DoNotSchedule / ScheduleAnyway\n\n활용: 가용영역 간 균등 분산으로 고가용성 확보",
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
    "answer": "Taint: 노드에 적용, Pod 배치 제한 (노드가 Pod를 밀어냄)\nToleration: Pod에 적용, 특정 Taint 허용 (Pod가 Taint 용인)\n\n동작 방식:\n노드에 Taint 설정\n해당 Taint를 Toleration하는 Pod만 스케줄링 가능\n\nTaint 적용:\n\nToleration 설정:\n\noperator:\nEqual: key와 value 모두 일치\nExists: key만 일치 (value 무시)\n\n사용 사례: 전용 노드 (GPU, 특정 팀용)",
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
    "answer": "Taint Effect 종류:\n\nEffect   새 Pod 스케줄링   기존 Pod\n\nNoSchedule   차단   영향 없음\nPreferNoSchedule   가능하면 피함   영향 없음\nNoExecute   차단   제거됨\n\n상세 설명:\nNoSchedule: Toleration 없으면 절대 스케줄링 안됨\nPreferNoSchedule: Soft 제약, 다른 노드 없으면 스케줄링됨\nNoExecute: 기존 실행 중인 Pod도 제거 (tolerationSeconds로 유예 가능)\n\n사용 시나리오:\nNoSchedule: 전용 노드 분리\nPreferNoSchedule: 가능하면 분리\nNoExecute: 노드 유지보수, 장애 처리",
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
    "answer": "스케줄되지 않는 이유:\nControl Plane 노드에 기본 Taint 적용됨:\n\n허용 방법 1: Toleration 추가\n\n허용 방법 2: Taint 제거 (권장하지 않음)\n\n주의사항:\n프로덕션에서는 Control Plane 분리 권장\n단일 노드 클러스터 (개발용)에서만 허용 고려\nControl Plane 리소스 경합 위험",
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
    "answer": "자동 적용 Taint (Node Controller가 관리):\n\nTaint   상황\n\nnode.kubernetes.io/not-ready   노드 Ready 조건 False\nnode.kubernetes.io/unreachable   노드 통신 불가\nnode.kubernetes.io/memory-pressure   메모리 부족\nnode.kubernetes.io/disk-pressure   디스크 부족\nnode.kubernetes.io/pid-pressure   PID 부족\nnode.kubernetes.io/network-unavailable   네트워크 미설정\nnode.kubernetes.io/unschedulable   cordon 적용됨\n\n기본 Toleration:\nDaemonSet Pod는 기본적으로 이러한 Taint를 Toleration함\n\ntolerationSeconds:\nnot-ready, unreachable: 기본 300초 유예 후 제거\n설정으로 조정 가능",
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
    "answer": "Requests:\n스케줄링에 사용되는 최소 보장 리소스\n노드 선택 시 이 값 기준으로 용량 확인\n컨테이너에 보장되는 리소스\n\nLimits:\n컨테이너가 사용할 수 있는 최대 리소스\n이 값 초과 시 제한됨 (CPU: throttle, Memory: OOM Kill)\n\n차이점 요약:\n구분   Requests   Limits\n\n용도   스케줄링   제한\n보장   항상 보장   최대값\n초과 시   -   제한/종료",
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
    "answer": "CPU 단위:\n1: 1 CPU 코어 (1000m)\n500m: 0.5 CPU (millicore)\n100m: 0.1 CPU\n클라우드 1 vCPU = 1 코어\n\nMemory 단위:\n단위   의미   값\n\nKi   Kibibyte   1024 bytes\nMi   Mebibyte   1024 Ki\nGi   Gibibyte   1024 Mi\nK   Kilobyte   1000 bytes\nM   Megabyte   1000 K\nG   Gigabyte   1000 M\n\n예시:",
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
    "answer": "requests만 설정:\nlimits: 무제한 (노드 전체 리소스 사용 가능)\nQoS: Burstable\n스케줄링 시 requests 기준으로 노드 선택\n위험: 다른 Pod 리소스를 빼앗을 수 있음\n\nlimits만 설정:\nrequests: limits와 동일 값으로 자동 설정\nQoS: Guaranteed\n스케줄링 시 limits 값 기준\n\n흔한 실수와 함정:\n설정   문제점\n\nrequests만 높게   스케줄링은 되지만 실제 사용량 적으면 리소스 낭비\nrequests만 낮게   과도한 오버커밋으로 노드 리소스 부족\nlimits만 설정   requests=limits가 되어 burst 불가, 리소스 낭비 가능\n둘 다 미설정   QoS BestEffort로 가장 먼저 eviction 대상\n\n권장 사항:\n항상 requests와 limits 둘 다 설정\nrequests <= limits (burst 허용)\nrequests = limits (안정성 우선, Guaranteed QoS)\n프로덕션에서는 실제 사용량 측정 후 설정 (kubectl top, Prometheus)\n\nLimitRange로 기본값 강제: 네임스페이스에 기본 requests/limits 설정 권장",
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
    "answer": "Memory Limits 초과:\nOOM (Out of Memory) Kill 발생\n컨테이너 종료, restartPolicy에 따라 재시작\n압축 불가능한 리소스 (반환 불가)\n\nCPU Limits 초과:\nCPU Throttling 발생\n컨테이너는 계속 실행\n처리 속도만 제한됨\n압축 가능한 리소스 (일시적 제한)\n\n비교:\n리소스   초과 시 동작   특성\n\nMemory   OOM Kill   압축 불가\nCPU   Throttle   압축 가능\n\n모니터링:\nMemory: containermemoryworkingsetbytes\nCPU Throttle: containercpucfsthrottledseconds_total",
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
    "answer": "QoS 클래스 결정 기준:\n\nQoS   조건   Eviction 우선순위\n\nGuaranteed   모든 컨테이너: requests = limits (CPU, Memory 모두)   최후\nBurstable   최소 하나의 requests 또는 limits 설정, Guaranteed 아님   중간\nBestEffort   requests/limits 모두 없음   최우선\n\n의미:\n노드 리소스 부족 시 Eviction 순서 결정\nBestEffort -> Burstable -> Guaranteed 순으로 제거\n같은 QoS 내에서는 메모리 사용량 초과 비율로 결정\n\n확인 방법:\n\n흔한 함정:\n설정   예상 QoS   실제 QoS\n\nCPU만 requests=limits   Guaranteed   Burstable (Memory 미설정)\n일부 컨테이너만 설정   Guaranteed   Burstable\nlimits만 설정   Burstable   Guaranteed (자동으로 requests=limits)\n\n권장 사항:\n중요 워크로드: Guaranteed (안정성)\n일반 워크로드: Burstable (효율성)\n개발/테스트: BestEffort 허용 가능\n프로덕션 Best Practice: 최소 requests는 반드시 설정",
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
    "answer": "역할: 네임스페이스 내 개별 컨테이너/Pod의 리소스 제약 정의\n\n설정 항목:\n항목   설명\n\ndefault   limits 미지정 시 기본값\ndefaultRequest   requests 미지정 시 기본값\nmin   최소 리소스\nmax   최대 리소스\nmaxLimitRequestRatio   limits/requests 최대 비율\n\n적용 대상: Container, Pod, PersistentVolumeClaim",
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
    "answer": "역할: 네임스페이스 전체의 리소스 총량 제한\n\n제한 가능 항목:\n컴퓨팅: requests.cpu, limits.memory 등\n스토리지: requests.storage, persistentvolumeclaims\n오브젝트 수: pods, services, configmaps 등\n\n확인:\n\n주의: ResourceQuota 적용 시 Pod에 반드시 requests/limits 필요 (LimitRange와 함께 사용)",
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
    "answer": "역할: Pod 간 우선순위 정의, 스케줄링 순서와 프리엠션 결정\n\nPriorityClass 정의:\n\nPod에 적용:\n\n프리엠션(Preemption):\n고우선순위 Pod 스케줄 불가 시 저우선순위 Pod 제거\npreemptionPolicy: PreemptLowerPriority / Never\n\n스케줄링:\n우선순위 높은 Pod 먼저 스케줄링\n\n기본 PriorityClass:\nsystem-cluster-critical (2000000000)\nsystem-node-critical (2000001000)",
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
    "answer": "동작 원리:\nmetrics-server에서 Pod 메트릭 수집\nHPA Controller가 주기적으로 (15초) 메트릭 확인\n목표값과 현재값 비교하여 replicas 조정\n\n설정 방법:\n\n스케일링 공식: replicas = ceil(현재 메트릭 / 목표 메트릭 * 현재 replicas)",
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
    "answer": "CPU/Memory 기반 (Resource Metrics):\nmetrics-server에서 제공\n기본 제공, 설정 간단\n제한: CPU/Memory만 가능\n\nCustom Metrics 기반:\nPrometheus Adapter 등 필요\n비즈니스 메트릭 사용 가능 (RPS, Queue 길이 등)\n\nExternal Metrics: 외부 시스템 메트릭 (AWS SQS 등)\n\n선택 기준:\nCPU 바운드 앱: CPU 메트릭\nI/O 바운드 앱: Custom Metrics 권장",
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
    "answer": "스케일링 알고리즘:\n여러 메트릭 사용 시 가장 큰 값 선택\ntolerance (기본 10%): 0.9 ~ 1.1 범위는 스케일링 안함\n\nstabilizationWindowSeconds:\n급격한 스케일링 방지를 위한 안정화 기간\n\n역할:\nscaleDown 기본값: 300초 (급격한 축소 방지)\nscaleUp 기본값: 0초 (빠른 확장)\n윈도우 내 최대/최소값 기준 스케일링",
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
    "answer": "주의사항:\nrequests 필수: HPA는 requests 기준으로 사용률 계산 (requests 없으면 동작 안함)\nmetrics-server 필요: 설치되어 있어야 메트릭 수집\nDeployment 권장: ReplicaSet 직접 사용 비권장\nminReplicas: 최소 2개 이상 (고가용성)\n\nBest Practice:\n적절한 target 설정: CPU 50-80% 권장\n충분한 minReplicas: 트래픽 급증 대비\nscaleDown 안정화: 기본 300초 유지\n여러 메트릭 조합: CPU + 커스텀 메트릭\nReadiness Probe 설정: 준비된 Pod만 트래픽 수신\n\n흔한 함정과 실수:\n상황   문제   해결\n\nHPA + VPA 동시 사용   CPU/Memory 충돌로 진동   VPA는 Off 모드로만\ntarget 50% + requests 과소 설정   실제 부하 낮아도 스케일업   실측 기반 requests 설정\nmaxReplicas 너무 높음   비용 폭발   리소스 quota와 연계\n콜드 스타트 미고려   새 Pod 준비 전 부하 증가   여유있는 minReplicas\n\n모니터링: HPA 상태 주기적 확인",
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
    "answer": "VPA 동작 원리:\nRecommender: 리소스 사용량 분석, 권장값 계산\nUpdater: 권장값과 현재값 차이 확인, Pod 재시작 트리거\nAdmission Controller: 새 Pod 생성 시 권장 리소스 적용\n\nHPA와의 차이:\n구분   HPA   VPA\n\n스케일링 방향   수평 (Pod 수)   수직 (리소스)\n적용 방식   즉시   Pod 재시작 필요\n사용 사례   Stateless 앱   Stateful, 단일 Pod\n함께 사용   가능 (권장 안함)   메모리만 조절 시\n\n제한사항:\nHPA와 동일 리소스(CPU/Memory) 동시 사용 불가\nPod 재시작 발생 가능",
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
    "answer": "updateMode 종류:\n\n모드   동작\n\nOff   권장값만 계산, 적용 안함 (관찰 모드)\nInitial   새 Pod 생성 시만 적용, 기존 Pod 변경 안함\nAuto   권장값 자동 적용, 필요시 Pod 재시작\nRecreate   Auto와 동일 (deprecated)\n\n사용 시나리오:\nOff: 권장값 확인 후 수동 적용\nInitial: 재시작 최소화, 새 Pod에만 적용\nAuto: 완전 자동화 (다운타임 허용 시)",
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
    "answer": "동작 원리:\n클라우드 API와 연동하여 노드 그룹(ASG, MIG 등) 조정\n주기적으로 스케줄 불가 Pod 확인\n\n노드 추가 조건 (Scale Up):\nPending 상태 Pod 존재\n리소스(CPU/Memory) 부족으로 스케줄링 불가\nnodeSelector/affinity 조건 만족하는 노드 부재\n\n노드 삭제 조건 (Scale Down):\n노드 활용률 < 50% (기본, 설정 가능)\n해당 노드의 모든 Pod가 다른 노드로 이동 가능\n10분간 (기본) 유휴 상태 유지\nPDB 위반 없음\n\n삭제 제외 조건:\ncluster-autoscaler.kubernetes.io/safe-to-evict: \"false\"\n로컬 스토리지 사용\nPDB로 보호된 Pod",
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
    "answer": "조합 사용 시 고려사항:\n\nHPA + Cluster Autoscaler (권장):\nHPA가 Pod 수 증가 -> Pending Pod 발생 -> CA가 노드 추가\n잘 동작하는 조합\n\nVPA + Cluster Autoscaler:\nVPA가 리소스 증가 -> 노드 리소스 부족 -> CA가 노드 추가\nPod 재시작 주의\n\nHPA + VPA (주의 필요):\n동일 리소스(CPU) 동시 사용 불가 -> 충돌\n해결: VPA는 Memory만, HPA는 CPU만 (또는 커스텀 메트릭)\n\nBest Practice:\n\n권장 구성:\nStateless 앱: HPA + CA\nStateful 앱: VPA + CA\n리소스 최적화: VPA(Off) + HPA + CA",
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
    "answer": "RBAC 개념: 역할 기반으로 Kubernetes API 접근 권한 관리\n\n구성 요소:\n\n구성 요소   범위   설명\n\nRole   네임스페이스   특정 네임스페이스 내 권한 정의\nClusterRole   클러스터   클러스터 전체 권한 정의\nRoleBinding   네임스페이스   Role을 주체에 연결\nClusterRoleBinding   클러스터   ClusterRole을 주체에 연결\n\n예시:",
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
    "answer": "Role vs ClusterRole:\n구분   Role   ClusterRole\n\n범위   특정 네임스페이스   클러스터 전체\n비네임스페이스 리소스   불가   가능 (nodes, PV 등)\n여러 NS 재사용   불가   가능 (RoleBinding으로)\n\nRoleBinding vs ClusterRoleBinding:\n구분   RoleBinding   ClusterRoleBinding\n\n범위   특정 네임스페이스   클러스터 전체\nRole 참조   같은 NS의 Role   ClusterRole만\nClusterRole 참조   해당 NS에만 적용   전체 NS에 적용\n\n활용 패턴:\nClusterRole + RoleBinding: 재사용 가능한 권한을 특정 NS에만 적용\nClusterRole + ClusterRoleBinding: 클러스터 전체 권한",
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
    "answer": "verbs 의미:\n\nVerb   HTTP 메서드   설명\n\nget   GET   단일 리소스 조회\nlist   GET   리소스 목록 조회\nwatch   GET (watch)   리소스 변경 감시\ncreate   POST   리소스 생성\nupdate   PUT   리소스 전체 수정\npatch   PATCH   리소스 부분 수정\ndelete   DELETE   단일 리소스 삭제\ndeletecollection   DELETE   여러 리소스 삭제\n\n특수 verbs:\n*: 모든 동작 허용\nuse: PodSecurityPolicy 사용\nbind: RoleBinding 생성\nescalate: Role 권한 상승\n\n예시:",
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
    "answer": "최소 권한 원칙 적용 방법:\n필요한 리소스만 지정:\n필요한 verbs만 부여:\nresourceNames로 특정 리소스 제한:\nRole 대신 ClusterRole 지양: 필요한 NS에만 권한 부여\n기본 ServiceAccount 사용 지양: 앱별 전용 ServiceAccount 생성\n정기적 감사:\n와일드카드() 사용 금지**",
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
    "answer": "역할: Pod 내 프로세스가 Kubernetes API에 인증하기 위한 ID\n\n기본 동작:\n각 네임스페이스에 default ServiceAccount 자동 생성\nPod 생성 시 자동으로 ServiceAccount 연결\n토큰이 Pod에 자동 마운트\n\nPod에서 사용:\n\nServiceAccount 생성:\n\n토큰 위치 (Pod 내):\n\nRBAC 연동: RoleBinding으로 ServiceAccount에 권한 부여",
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
    "answer": "자동 마운트:\n기본적으로 ServiceAccount 토큰이 Pod에 자동 마운트\n경로: /var/run/secrets/kubernetes.io/serviceaccount/\n파일: token, ca.crt, namespace\n\n비활성화 방법:\nPod 레벨:\nServiceAccount 레벨:\n\n비활성화 권장 상황:\nAPI 서버 접근 불필요한 Pod\n보안 강화 필요 시\n외부에서 자격증명 주입 시\n\n우선순위: Pod 설정 > ServiceAccount 설정",
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
    "answer": "주요 인증 방식:\n\n방식   설명   사용 사례\n\nX.509 Client Cert   클라이언트 인증서   kubeconfig, 관리자\nBearer Token   정적 토큰 파일   서비스 계정\nServiceAccount Token   JWT 토큰   Pod 내 앱\nOIDC   OpenID Connect   SSO, 기업 인증\nWebhook   외부 인증 서비스   커스텀 인증\n\nX.509 인증서:\nCN(Common Name): 사용자 이름\nO(Organization): 그룹\n\nOIDC 장점:\n기존 IdP(Okta, Azure AD) 연동\n짧은 수명 토큰\n그룹 기반 권한 관리\n\n여러 인증 방식 조합 가능: 하나만 성공하면 인증 통과",
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
    "answer": "kubeconfig 구조:\n\n구성 요소:\nclusters: API 서버 주소, CA 인증서\nusers: 인증 정보 (인증서, 토큰 등)\ncontexts: cluster + user + namespace 조합\ncurrent-context: 현재 사용 중인 context\n\n명령어:",
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
    "answer": "역할: Pod 간 네트워크 트래픽 제어 (방화벽 규칙)\n\n기본 동작: NetworkPolicy 없으면 모든 트래픽 허용\n\n예시:\n\n규칙 조합:\npodSelector: 같은 NS의 특정 Pod\nnamespaceSelector: 특정 NS의 Pod\nipBlock: CIDR 범위",
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
    "answer": "NetworkPolicy 미적용 상황:\nCNI 미지원:\nFlannel (기본): 지원 안함\n지원 CNI: Calico, Cilium, Weave Net\nNetworkPolicy 생성해도 무시됨 (오류 없이 무시!)\nHostNetwork Pod: hostNetwork: true Pod는 영향 안받음\n시스템 네임스페이스: kube-system의 Pod는 보통 제외\n\n기본 정책:\nNetworkPolicy 없음: 모든 트래픽 허용 (default allow)\nNetworkPolicy 적용 시: 해당 Pod는 명시적 허용만 가능 (default deny)\n\n흔한 함정:\n상황   예상   실제\n\nFlannel + NetworkPolicy   트래픽 차단   아무 효과 없음\nIngress만 정의   Egress 차단?   Egress는 모두 허용\npodSelector: {}   아무것도 선택 안함?   네임스페이스 전체 Pod\nnamespaceSelector + podSelector   AND 조건?   같은 from/to 내 AND, 다른 from/to 간 OR\n\n전체 거부 정책 (Zero Trust 시작점):\n\n주의: DNS 통신 (kube-dns:53) Egress 허용 필요할 수 있음",
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
    "answer": "Pod Security Standards (PSS):\n\n레벨   설명   사용 사례\n\nPrivileged   제한 없음, 모든 권한 허용   시스템 컴포넌트, 신뢰된 워크로드\nBaseline   최소 제한, 알려진 위험 차단   일반 워크로드\nRestricted   최대 제한, 보안 Best Practice   보안 중요 워크로드\n\n주요 제한 항목:\n항목   Baseline   Restricted\n\nhostNetwork   차단   차단\nhostPID/IPC   차단   차단\nprivileged   차단   차단\nrunAsNonRoot   -   필수\nreadOnlyRootFilesystem   -   권장\ncapabilities   일부 허용   거의 없음",
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
    "answer": "역할: 네임스페이스 레벨에서 Pod Security Standards 적용\n\n모드 차이:\n모드   동작   사용 목적\n\nenforce   위반 시 Pod 생성 거부   프로덕션\naudit   위반 감사 로그 기록, 허용   모니터링\nwarn   위반 경고 메시지, 허용   전환 준비\n\n네임스페이스 레이블 설정:\n\n권장 전략:\nwarn/audit로 시작하여 영향 파악\n점진적으로 enforce 적용",
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
    "answer": "주요 securityContext 설정:\n\n설정 범위:\nPod 레벨: spec.securityContext\nContainer 레벨: spec.containers[].securityContext\nContainer 설정이 Pod 설정보다 우선\n\n권장 설정:\nrunAsNonRoot: true\nreadOnlyRootFilesystem: true\nallowPrivilegeEscalation: false\ncapabilities.drop: ALL",
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
    "answer": "역할: 컨테이너가 살아있는지 확인, 실패 시 컨테이너 재시작\n\n설정 방법:\n\nhttpGet:\n\ntcpSocket:\n\nexec:\n\n성공 조건:\nhttpGet: 200-399 응답\ntcpSocket: 연결 성공\nexec: exit code 0",
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
    "answer": "Readiness Probe 역할: 컨테이너가 트래픽 수신 준비 되었는지 확인\n\nLiveness vs Readiness:\n구분   Liveness   Readiness\n\n목적   살아있는지 확인   준비됐는지 확인\n실패 시   컨테이너 재시작   Service에서 제외\n사용 시점   데드락 감지   시작 준비, 일시적 불가\n\nReadiness 실패 시:\nService Endpoints에서 제거\n트래픽 수신 안함\n컨테이너는 계속 실행\n\n사용 예시:\n\n흔한 실수와 함정:\n실수   문제점   해결책\n\nLiveness = Readiness 동일 엔드포인트   일시적 과부하에 불필요한 재시작   분리된 엔드포인트 사용\nLiveness에서 외부 의존성 체크   DB 장애 시 모든 Pod 재시작   외부 의존성은 Readiness에서만\n너무 짧은 timeout   정상 Pod도 실패 판정   충분한 여유 확보\nReadiness 미설정   준비 안된 Pod로 트래픽 유입   반드시 설정\n\nBest Practice:\n둘 다 설정 권장\n다른 엔드포인트 사용 (/healthz vs /ready)\nLiveness는 앱 자체 상태만 체크 (외부 의존성 X)\nReadiness는 모든 의존성 포함 (DB, 캐시 연결 등)",
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
    "answer": "역할: 애플리케이션 시작 완료 확인, 성공할 때까지 Liveness/Readiness 비활성화\n\n필요성:\n시작 시간이 긴 앱 (레거시, JVM 앱)\nLiveness의 initialDelaySeconds를 과도하게 늘리지 않아도 됨\n\n활용 방법:\n\n동작:\nStartup Probe 성공할 때까지 Liveness/Readiness 실행 안함\nStartup 성공 후 Liveness/Readiness 시작\nStartup 실패 (failureThreshold 초과) 시 컨테이너 재시작",
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
    "answer": "설정값 의미:\n설정   의미   기본값\n\ninitialDelaySeconds   첫 Probe 전 대기   0\nperiodSeconds   Probe 간격   10\ntimeoutSeconds   응답 대기 시간   1\nfailureThreshold   연속 실패 허용 횟수   3\nsuccessThreshold   연속 성공 필요 횟수   1\n\n적절한 설정:\n\n설정 팁:\n실패 감지 시간 = periodSeconds * failureThreshold\ntimeoutSeconds < periodSeconds\nStartup Probe 활용으로 initialDelaySeconds 최소화",
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
    "answer": "일반적인 문제와 해결:\nCrashLoopBackOff:\n원인: Liveness 실패로 계속 재시작\n해결: initialDelaySeconds 증가, Startup Probe 사용\n서비스 불가 (트래픽 수신 안함):\n원인: Readiness 계속 실패\n해결: 엔드포인트/포트 확인, threshold 조정\n느린 응답으로 인한 재시작:\n원인: timeoutSeconds 너무 짧음\n해결: timeoutSeconds 증가 (기본 1초)\n잦은 재시작:\n원인: failureThreshold 너무 낮음\n해결: 일시적 오류 고려하여 증가\n\n디버깅:\n\nBest Practice:\nLiveness/Readiness 다른 엔드포인트 사용\nLiveness는 보수적으로 (재시작 최소화)\nReadiness는 엄격하게 (준비된 Pod만)",
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
    "answer": "주요 옵션:\n\n옵션   설명\n\n-f, --follow   실시간 로그 스트리밍\n--previous   이전 컨테이너 로그 (재시작 전)\n-c <container>   특정 컨테이너 지정 (멀티컨테이너)\n--since=1h   지난 1시간 로그\n--since-time   특정 시간 이후\n--tail=100   마지막 100줄\n--timestamps   타임스탬프 포함\n\n사용 예시:",
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
    "answer": "로깅 아키텍처:\n컨테이너 stdout/stderr -> 컨테이너 런타임 -> 노드 파일시스템\n경로: /var/log/containers/, /var/log/pods/\n\n노드 레벨 로깅:\n각 노드에서 로그 로테이션\nkubelet이 관리 (logrotate)\n제한: Pod 삭제 시 로그 손실\n\n클러스터 레벨 로깅:\n중앙 집중식 로그 수집/저장\nPod 삭제 후에도 로그 보존\n\n클러스터 레벨 구현 방법:\n방법   설명\n\nNode-level agent   DaemonSet으로 Fluentd/Filebeat\nSidecar   앱과 함께 로그 수집기\nDirect push   앱에서 직접 로그 서비스로 전송\n\n일반적 스택: Fluentd + Elasticsearch + Kibana (EFK)",
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
    "answer": "metrics-server 역할:\n클러스터 내 리소스 메트릭 수집 (CPU, Memory)\nkubelet에서 메트릭 수집\nHPA, VPA, kubectl top에 메트릭 제공\nMetrics API 노출 (metrics.k8s.io)\n\n설치:\n\nkubectl top 사용:\n\n주의: 실시간 메트릭이 아닌 짧은 기간 평균값",
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
    "answer": "구성 요소:\nPrometheus Server: 메트릭 수집/저장\nNode Exporter: 노드 메트릭\nkube-state-metrics: K8s 오브젝트 상태\nAlertmanager: 알림 관리\nGrafana: 시각화\n\n설치 방법 (kube-prometheus-stack):\n\n서비스 디스커버리:\nPrometheus가 K8s API로 타겟 자동 발견\nPod annotation으로 스크래핑 설정\n\n주요 메트릭 소스:\nkubelet /metrics: 컨테이너 메트릭\nAPI server /metrics: API 메트릭\nNode exporter: 노드 OS 메트릭",
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
    "answer": "Node 레벨:\nCPU 사용률: nodecpusecondstotal\n메모리: nodememoryMemAvailablebytes\n디스크: nodefilesystemavailbytes\n네트워크: nodenetworkreceivebytestotal\n\nPod/Container 레벨:\nCPU: containercpuusagesecondstotal\n메모리: containermemoryworkingsetbytes\n재시작 횟수: kubepodcontainerstatusrestartstotal\n상태: kubepodstatusphase\n\nKubernetes 오브젝트:\nDeployment replicas: kubedeploymentstatusreplicasavailable\nPVC 상태: kubepersistentvolumeclaimstatusphase\nJob 상태: kubejobstatus_succeeded\n\n알림 권장 메트릭:\nPod CrashLoopBackOff\nNode NotReady\nPVC Pending\nCPU/Memory 임계치 초과\nHPA 최대 replicas 도달",
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
    "answer": "Helm 역할: Kubernetes 패키지 관리자, 앱 배포/관리 간소화\n\n핵심 개념:\n\n개념   설명\n\nChart   Kubernetes 리소스 패키지 (템플릿 + 설정)\nRelease   Chart의 설치 인스턴스\nRepository   Chart 저장소\n\n예시:\n\n특징:\n버전 관리: Chart와 Release 모두 버전화\n롤백 지원: helm rollback\n값 오버라이드: --set, -f values.yaml",
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
    "answer": "Chart 디렉토리 구조:\n\nChart.yaml:\n\nvalues.yaml:\n\ntemplates/deployment.yaml:",
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
    "answer": "주요 템플릿 함수:\n\n설정 오버라이드 방법:\n--set 플래그:\nvalues 파일:\n여러 파일 조합 (뒤가 우선):\n\n우선순위: --set > -f (마지막) > 기본 values.yaml",
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
    "answer": "Release 관리 명령어:\n\nRevision 개념:\n각 install/upgrade마다 Revision 번호 증가\n이전 Revision 상태 저장 (롤백용)\nSecret으로 저장 (release.* 레이블)\n\n유용한 옵션:",
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
    "answer": "Hook 역할: 릴리스 라이프사이클 특정 시점에 작업 실행\n\nHook 종류:\nHook   실행 시점\n\npre-install   템플릿 렌더링 후, 리소스 생성 전\npost-install   모든 리소스 생성 후\npre-upgrade   업그레이드 전\npost-upgrade   업그레이드 후\npre-delete   삭제 요청 후, 리소스 삭제 전\npost-delete   모든 리소스 삭제 후\npre-rollback   롤백 전\npost-rollback   롤백 후\n\n설정 예시:\n\n사용 사례:\npre-install: DB 스키마 마이그레이션\npost-install: 초기 데이터 로드\npre-upgrade: 백업 생성\npost-delete: 정리 작업",
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
    "answer": "업그레이드 절차:\n릴리스 노트 확인 (deprecation, breaking changes)\netcd 백업\nControl Plane 업그레이드 (순차적)\nWorker Node 업그레이드 (하나씩)\n검증\n\n주의사항:\n버전 스킵 금지: 한 번에 한 마이너 버전만 (1.25 -> 1.26, 1.25 -> 1.27 불가)\n버전 차이 제한 (Skew Policy):\nkube-apiserver: 모든 Control Plane이 동일 버전 권장\nkubelet: API server보다 최대 2 마이너 버전 낮을 수 있음\nkube-proxy, kubectl: API server와 +/-1 버전\nAPI 변경 확인: deprecated API 미리 대응\n애드온 호환성: CNI, CSI, Ingress Controller 등 버전 확인\n\n업그레이드 전 체크리스트:\netcd 백업 완료\nRelease Notes의 Breaking Changes 확인\ndeprecated API 사용 여부 확인: kubectl deprecations\n충분한 노드 리소스 (drain 시 Pod 이동 공간)\nPodDisruptionBudget 확인\n\nkubeadm 업그레이드 (예시):\n\n롤백: kubeadm은 자동 롤백 미지원, etcd 스냅샷으로 복구",
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
    "answer": "순서: Control Plane 먼저 -> Worker Node\n\nControl Plane 업그레이드:\n\nWorker Node 업그레이드:\n\nHA 고려: Control Plane 하나씩 순차적으로",
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
    "answer": "etcd 백업:\n\netcd 복구 (단일 노드 예시):\n\nHA 클러스터 복구 시 주의:\n모든 etcd 노드에서 동시에 복구 수행\ninitial-cluster에 모든 멤버 포함\n복구 후 멤버십 확인: etcdctl member list\n\n백업 권장 사항:\n정기적 자동 백업 (cronjob) - 최소 1시간 간격\n오프사이트 저장 (S3, GCS) - 암호화 필수\n복구 테스트 정기 수행 - 분기별 권장\n클러스터 업그레이드 전 반드시 백업\n\n흔한 실수:\n복구 시 --data-dir를 기존 경로로 지정 (덮어쓰기 실패)\n멀티노드에서 한 노드만 복구 (클러스터 불일치)",
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
    "answer": "cordon:\n노드를 스케줄 불가(Unschedulable)로 표시\n기존 Pod는 계속 실행\n새 Pod만 스케줄링 안됨\n\ndrain:\ncordon + 기존 Pod 제거 (eviction)\nPod를 다른 노드로 이동\nDaemonSet Pod는 기본적으로 무시\n\n차이점:\n명령어   새 Pod 스케줄   기존 Pod\n\ncordon   차단   유지\ndrain   차단   제거/이동\n\ndrain 옵션:\n--ignore-daemonsets: DaemonSet Pod 무시\n--delete-emptydir-data: emptyDir 볼륨 Pod 삭제\n--force: RC 없는 Pod 강제 삭제",
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
    "answer": "안전한 Pod 이동 절차:\nPDB 설정 확인/생성\nkubectl drain 실행\n유지보수 작업\nkubectl uncordon 실행\n\nPodDisruptionBudget (PDB):\n자발적 중단 시 최소 가용 Pod 수 보장\n\nPDB 동작:\ndrain 시 PDB 조건 만족해야 eviction 진행\n조건 불만족 시 eviction 대기\n강제 삭제(--force)는 PDB 무시\n\n트레이드오프 - minAvailable vs maxUnavailable:\n설정   장점   단점\n\nminAvailable: N   최소 N개 보장 명확   스케일 다운 시 조정 필요\nmaxUnavailable: N   스케일 변경에 유연   작은 replicas에서 위험\n\n흔한 함정:\nreplicas=2, minAvailable=2 → drain 불가\nreplicas=1 → PDB 의미 없음\nPDB 미설정 → drain이 모든 Pod 한번에 종료 가능\n비자발적 중단 (노드 장애) → PDB 적용 안됨\n\nBest Practice:\n프로덕션 워크로드에 PDB 필수\nminAvailable 또는 maxUnavailable 중 하나만 설정\nreplicas 수 고려하여 설정 (minAvailable < replicas)",
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
    "answer": "CrashLoopBackOff: 컨테이너가 반복적으로 시작 실패, 재시작 대기\n\n주요 원인:\n애플리케이션 오류 (코드 버그, 설정 오류)\n리소스 부족 (OOM Kill)\n잘못된 command/args\n의존성 문제 (DB 연결 실패)\nLiveness Probe 실패\n권한 문제\n\n분석 방법:\n\n해결 방법:\n로그 분석으로 원인 파악\nOOM: 메모리 limits 증가\n의존성: Init Container로 대기\nLiveness: Probe 설정 조정\n임시 디버깅: command: [\"sleep\", \"3600\"]",
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
    "answer": "ImagePullBackOff: 이미지 다운로드 반복 실패\n\n주요 원인:\n이미지 이름/태그 오타\n이미지 존재하지 않음\nPrivate registry 인증 실패\n네트워크 문제\nRegistry 접근 불가\n\n분석 방법:\n\n해결 방법:\n\n이미지 확인:\n\nPrivate registry 인증:\n\n이미지 정책 확인:\nimagePullPolicy: Always -> 항상 pull\nimagePullPolicy: IfNotPresent -> 없을 때만",
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
    "answer": "kubectl describe:\n리소스 상세 정보와 이벤트 확인\n\nkubectl logs:\n컨테이너 로그 확인\n\nkubectl exec:\n컨테이너 내부 명령 실행\n\n디버깅 순서:\ndescribe로 이벤트 확인\nlogs로 애플리케이션 로그 확인\nexec로 내부 상태 확인",
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
    "answer": "kubectl debug: 실행 중인 Pod에 디버깅 컨테이너 추가\n\nEphemeral Container 사용:\n\nPod 복사본으로 디버깅:\n\n노드 디버깅:\n\n장점:\nDistroless 이미지 디버깅 가능\n실행 중인 Pod 변경 없이 디버깅\n네트워크/프로세스 네임스페이스 공유",
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
    "answer": "문제 분석 단계:\nService selector 확인:\nPod 레이블 확인:\nEndpoints 확인:\nPod 상태 확인:\n포트 확인:\n\n일반적인 원인:\nselector 오타\n레이블 불일치\nReadiness Probe 실패\nPod가 Running이 아님\n포트 번호 불일치\n\n테스트:",
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
    "answer": "DNS 문제 진단:\nCoreDNS 상태 확인:\nPod 내부에서 DNS 테스트:\nresolv.conf 확인:\nCoreDNS ConfigMap 확인:\n\n일반적인 원인:\nCoreDNS Pod 장애\nNetworkPolicy로 DNS 차단\n잘못된 Service/Namespace 이름\n노드 DNS 설정 문제\n\nDNS 형식:\nService: <svc>.<ns>.svc.cluster.local\nPod: <pod-ip>.<ns>.pod.cluster.local",
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
    "answer": "서비스 메시 개념: 마이크로서비스 간 통신을 관리하는 인프라 계층\n\n구성:\nData Plane: Sidecar 프록시 (Envoy)로 트래픽 처리\nControl Plane: 정책 관리, 설정 배포\n\n필요성:\n\n기능   설명\n\n트래픽 관리   로드밸런싱, 라우팅, A/B 테스트, Canary\n보안   mTLS 암호화, 인증/인가\n관찰성   분산 추적, 메트릭, 로그\n복원력   재시도, 타임아웃, 서킷브레이커\n\n없을 때 문제점:\n각 서비스에서 직접 구현 필요\n언어/프레임워크별 다른 구현\n일관성 없는 보안/모니터링\n\n적합한 상황:\n많은 마이크로서비스\n복잡한 서비스 간 통신\n강화된 보안 요구사항",
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
    "answer": "Sidecar Proxy 패턴:\n각 Pod에 프록시 컨테이너 (Envoy) 주입\n모든 인바운드/아웃바운드 트래픽이 프록시 경유\n애플리케이션 코드 수정 없이 기능 추가\n\n트래픽 흐름:\n\n트래픽 제어 방식:\n로드밸런싱:\nRound Robin, Least Connection, Random\n가중치 기반 분배\n트래픽 분할:\n재시도/타임아웃:\n서킷브레이커:\n연속 실패 시 요청 차단\n서비스 장애 전파 방지",
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
    "answer": "Istio 아키텍처:\n\nData Plane:\nEnvoy Proxy: 각 Pod의 Sidecar로 배포\nL4/L7 프록시\n트래픽 라우팅, 로드밸런싱\nTLS 종료, 인증\n메트릭 수집\n\nControl Plane:\nIstiod: 통합 컨트롤 플레인 (Pilot + Citadel + Galley 통합)\nPilot: 서비스 디스커버리, 트래픽 정책\nCitadel: 인증서 관리, mTLS\nGalley: 설정 검증, 배포\n\n설치:\n\nCRD:\nVirtualService: 트래픽 라우팅 규칙\nDestinationRule: 로드밸런싱, 서킷브레이커\nGateway: Ingress/Egress 설정\nAuthorizationPolicy: 접근 제어",
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
    "answer": "VirtualService: 요청 라우팅 규칙 정의\n\nDestinationRule: 목적지 정책 정의\n\n주요 기능:\n트래픽 분할 (Canary, A/B)\n헤더 기반 라우팅\n재시도, 타임아웃\n서킷브레이커",
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
    "answer": "mTLS (Mutual TLS):\n서비스 간 양방향 TLS 인증/암호화\n\n모드:\nSTRICT: mTLS만 허용\nPERMISSIVE: mTLS와 평문 모두 허용 (마이그레이션용)\nDISABLE: mTLS 비활성화\n\nAuthorization Policy:\n서비스 간 접근 제어\n\n기능: ServiceAccount 기반 인증, HTTP 메서드/경로 기반 인가",
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
    "answer": "Linkerd 특징:\n경량화, 단순성 중시\nRust로 작성된 프록시 (linkerd2-proxy)\n빠른 설치, 낮은 리소스 사용\nCNCF graduated 프로젝트\n\nIstio vs Linkerd 비교:\n\n항목   Istio   Linkerd\n\n프록시   Envoy (C++)   linkerd2-proxy (Rust)\n복잡도   높음   낮음\n리소스   더 많이 사용   경량\n기능   풍부   핵심 기능 집중\n학습 곡선   가파름   완만\n커뮤니티   더 큼   성장 중\n\n선택 기준:\nIstio: 복잡한 트래픽 관리, 풍부한 기능 필요\nLinkerd: 단순함, 낮은 오버헤드 우선\n\nLinkerd 설치:",
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
    "answer": "CRD 개념: Kubernetes API를 확장하여 사용자 정의 리소스 타입 생성\n\nCRD 정의 예시:\n\nCustom Resource 사용:\n\n확장 방법:\nCRD로 리소스 타입 정의\nCustom Controller로 리소스 관리 로직 구현\nOperator 패턴으로 운영 자동화",
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
    "answer": "관계: Custom Resource는 \"원하는 상태\", Controller는 \"실제 구현\"\n\nCustom Resource (CR):\n사용자가 정의한 Kubernetes 오브젝트\n원하는 상태(spec)를 선언\netcd에 저장됨\n\nCustom Controller:\nCR을 감시(watch)\n현재 상태와 원하는 상태 비교\n차이를 해소하는 동작 수행 (Reconciliation Loop)\n\n동작 흐름:\n\n예시:",
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
    "answer": "Operator 패턴: CRD + Custom Controller로 복잡한 애플리케이션 운영 자동화\n\n핵심 개념:\n운영자(Operator)의 지식을 코드화\n도메인 전문 지식을 Kubernetes 리소스로 표현\n자동 복구, 스케일링, 업그레이드 등 자동화\n\n사용 상황:\nStateful 애플리케이션: 데이터베이스, 메시지 큐\n복잡한 설정: 클러스터링, 복제 설정\n운영 자동화: 백업, 복구, 업그레이드\n도메인 지식 필요: 특정 애플리케이션의 운영 노하우\n\n예시:\n\nOperator vs Helm:\nHelm: 설치/업그레이드 시점만\nOperator: 전체 라이프사이클 관리",
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
    "answer": "주요 프레임워크:\n\n프레임워크   특징\n\nKubebuilder   Go 기반, CNCF 프로젝트\nOperator SDK   Go/Ansible/Helm 지원, Red Hat\n\nKubebuilder 개발 흐름:\n\nReconcile 함수 예시:",
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
    "answer": "주요 Operator 사례:\n\nOperator   용도   장점\n\nPrometheus Operator   모니터링   ServiceMonitor CRD로 자동 타겟 설정\nCert-Manager   인증서 관리   Let's Encrypt 자동 발급/갱신\nStrimzi   Kafka   클러스터 자동 관리, 업그레이드\nZalando PostgreSQL   PostgreSQL   HA, 자동 페일오버\nElastic Operator   Elasticsearch   클러스터 관리, 스케일링\nArgoCD   GitOps   자동 배포, 동기화\n\nPrometheus Operator 예시:\n\nOperator 장점:\n복잡한 운영 작업 자동화\n일관된 배포/업그레이드\n도메인 전문 지식 캡슐화\n자가 치유 (self-healing)",
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
    "answer": "Kubernetes 네트워크 모델 요구사항:\n모든 Pod는 NAT 없이 다른 Pod와 통신 가능\n모든 노드는 NAT 없이 모든 Pod와 통신 가능\nPod가 보는 자신의 IP = 다른 Pod가 보는 IP\n\nPod 간 통신 방식:\n\n같은 노드 내:\n가상 이더넷 쌍 (veth)\n리눅스 브릿지로 연결\n\n다른 노드 간:\n\nCNI 구현 방식:\n오버레이: VXLAN 터널 (Flannel, Weave)\n라우팅: BGP 기반 (Calico)\neBPF: 커널 레벨 라우팅 (Cilium)\n\nPod IP 할당:\n노드별 Pod CIDR 범위 할당\nCNI가 Pod에 IP 할당",
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
    "answer": "ClusterIP 동작 원리:\nClusterIP는 가상 IP로, 실제 인터페이스에 바인딩되지 않음\n\nkube-proxy 역할:\nAPI Server에서 Service/Endpoints 변경 감지\n노드에 트래픽 라우팅 규칙 설정\n\niptables 모드:\nService당 iptables 규칙 생성\n랜덤 Pod 선택 (확률 기반)\n규칙 많아지면 성능 저하\n\nIPVS 모드:\n커널 레벨 로드밸런서\n해시 테이블 기반 (O(1) 조회)\n다양한 알고리즘 (rr, lc, sh, dh)\n대규모 클러스터에 적합\n\n확인:",
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
    "answer": "네트워크 흐름:\n\n상세 단계:\nPod에서 요청 발생\n소스: Pod IP, 목적지: 외부 IP\nCNI 네트워크 통과\nPod -> veth -> bridge -> 노드 eth0\nSNAT (Source NAT)\n소스 IP: Pod IP -> 노드 IP로 변환\n외부에서 응답 가능하도록\n외부로 전송\n노드의 기본 라우팅 테이블 사용\n응답 수신\n역SNAT: 노드 IP -> Pod IP\nPod로 전달\n\nEgress 제어:\nNetworkPolicy: 아웃바운드 트래픽 제한\nNAT Gateway: 클라우드 환경에서 고정 IP 사용\n\nExternalName Service:",
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
    "answer": "Gateway API: 차세대 Ingress API, Kubernetes SIG-Network에서 개발\n\n주요 리소스:\nGatewayClass: 인프라 공급자 정의 (클러스터 관리자)\nGateway: 로드밸런서 인스턴스 (인프라 관리자)\nHTTPRoute: 라우팅 규칙 (앱 개발자)\n\nIngress와의 차이:\n\n항목   Ingress   Gateway API\n\n프로토콜   HTTP/HTTPS   HTTP, TCP, UDP, gRPC\n역할 분리   없음   GatewayClass/Gateway/Route\n확장성   annotations   명시적 CRD\n표준화   느슨함   엄격한 스펙\n트래픽 분할   미지원   기본 지원\n\n예시:",
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
    "answer": "필요성:\n고가용성: 리전/가용영역 장애 대비\n지연 최소화: 사용자 가까운 리전에 배포\n규정 준수: 데이터 지역성 요구사항\n격리: 환경별, 팀별 분리\n스케일: 단일 클러스터 한계 극복\n\n주요 고려사항:\n\n영역   고려사항\n\n네트워킹   클러스터 간 통신, Service mesh\n데이터   상태 동기화, 데이터 복제\n배포   일관된 배포 전략, GitOps\n보안   통합 인증/인가, Secret 관리\n모니터링   중앙 집중식 관찰성\n관리   클러스터 프로비저닝 자동화\n\n도구:\nRancher, OpenShift\nCluster API\nLiqo, Submariner (네트워킹)\nIstio (서비스 메시)",
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
    "answer": "Federation 개념: 여러 클러스터를 단일 논리적 단위로 관리\n\nKubeFed (Kubernetes Federation v2):\n중앙 제어 플레인에서 여러 클러스터 관리\nFederatedDeployment 등 Federated 리소스\n클러스터별 오버라이드 지원\n\n멀티 클러스터 배포 전략:\n\n전략   설명\n\nActive-Active   모든 클러스터에서 트래픽 처리\nActive-Passive   장애 시 대기 클러스터 활성화\nFollow-the-Sun   시간대별 활성 클러스터 변경\nSharding   데이터/사용자별 클러스터 분리\n\n도구: KubeFed, Cluster API, ArgoCD ApplicationSet",
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
    "answer": "GitOps 개념:\nGit을 Single Source of Truth로 사용\n선언적 인프라/앱 정의\n자동화된 동기화 (Git -> 클러스터)\n\nGitOps 원칙:\n선언적 시스템\nGit에 버전 관리\n자동 적용\n지속적 검증 및 동기화\n\nArgoCD 설치:\n\nApplication 정의:\n\n워크플로우:\nGit Push -> ArgoCD 감지 -> Sync -> 클러스터 배포",
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
    "answer": "ArgoCD vs Flux 비교:\n\n항목   ArgoCD   Flux\n\nUI   웹 UI 기본 제공   별도 설치 필요\n아키텍처   중앙 집중식   분산형 (에이전트)\n리소스 사용   더 많음   경량\n멀티테넌시   Project로 지원   네임스페이스 기반\nHelm 지원   네이티브   Helm Controller\n학습 곡선   완만   조금 가파름\nCNCF   Incubating   Graduated\n\nArgoCD 선택 시:\n웹 UI 필요\n팀 단위 접근 제어 필요\n시각적 상태 확인 중요\n\nFlux 선택 시:\n경량 솔루션 선호\nCLI 중심 워크플로우\n엣지/소규모 클러스터\nKustomize 활용 많음\n\n공통점:\nGit 기반 배포\n자동 동기화\nKubernetes 네이티브",
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
    "answer": "Debezium은 데이터베이스의 변경 사항을 실시간으로 캡처하여 이벤트 스트림으로 변환하는 오픈소스 분산 CDC(Change Data Capture) 플랫폼입니다.\n\n핵심 작동 원리:\n로그 기반 CDC: 데이터베이스의 트랜잭션 로그(MySQL의 binlog, PostgreSQL의 WAL 등)를 읽어 변경 사항을 캡처\nKafka Connect 기반: Source Connector로 동작하며, 변경 이벤트를 Kafka 토픽으로 발행\n비침투적 방식: 애플리케이션 코드 수정 없이 데이터베이스 레벨에서 변경 캡처\n\n아키텍처 구성:\n\n트레이드오프 - CDC 방식 비교:\n\n방식   장점   단점\n\n로그 기반 CDC (Debezium)   낮은 오버헤드, 모든 변경 캡처, 삭제 이벤트 포함   DB별 커넥터 필요, 로그 설정 필요\n쿼리 기반 CDC   구현 단순, DB 독립적   폴링 오버헤드, 삭제 감지 어려움\n트리거 기반 CDC   즉각적 캡처   DB 성능 영향, 유지보수 복잡\n타임스탬프 기반   간단한 구현   삭제 감지 불가, 시간 동기화 필요\n\n운영 환경 고려사항:\n초기 스냅샷 시 소스 DB 부하 고려\nKafka 클러스터의 처리 용량 산정\n스키마 레지스트리 도입 여부 결정\n오프셋 저장소(Kafka 토픽) 관리",
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
    "answer": "Debezium은 로그 기반 CDC(Log-based CDC) 방식을 사용하여 데이터베이스 변경을 캡처합니다.\n\n데이터베이스별 로그 활용:\n\n데이터베이스   트랜잭션 로그   특징\n\nMySQL   Binary Log (binlog)   ROW 포맷 필수, GTID 권장\nPostgreSQL   Write-Ahead Log (WAL)   Logical Replication 사용\nMongoDB   Oplog / Change Streams   Change Streams 권장 (4.0+)\nSQL Server   Transaction Log   CDC 또는 CT 기능 활성화 필요\nOracle   LogMiner / Xstream   라이선스 고려 필요\n\nCDC 구현 단계:\n커넥터 시작: Kafka Connect에서 Debezium 커넥터 배포\n초기 스냅샷 (선택적): 기존 데이터의 일관된 스냅샷 생성\n스트리밍 모드: 트랜잭션 로그를 지속적으로 읽어 변경 캡처\n이벤트 변환: 변경 사항을 표준화된 이벤트 포맷으로 변환\nKafka 발행: 테이블별 토픽으로 이벤트 발행\n\n함정 질문 - \"쿼리 기반 CDC와 동일한가요?\":\n아닙니다. 로그 기반 CDC는 쿼리 기반과 근본적으로 다릅니다:\n쿼리 기반: 주기적 SELECT로 변경 감지 → 폴링 오버헤드, 삭제 감지 어려움\n로그 기반: 트랜잭션 로그 스트리밍 → 실시간, 모든 변경(DELETE 포함) 캡처\n\n이벤트 구조:",
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
    "answer": "MySQL Debezium 커넥터 설정 시 주요 고려 요소:\nMySQL 서버 설정 (필수):\n사용자 권한:\n커넥터 설정:\n\n트레이드오프 - 주요 설정 옵션:\n\n설정   선택지   트레이드오프\n\nsnapshot.mode   initial / schemaonly / never   초기 데이터 필요 vs 빠른 시작\nbinlogrowimage   FULL / MINIMAL   완전한 데이터 vs 저장 공간\ndecimal.handling.mode   precise / double / string   정확도 vs 처리 편의성\ntime.precision.mode   adaptive / connect   정밀도 vs 호환성\n\n운영 환경 체크리스트:\n[ ] binlog 보관 기간이 스냅샷 시간보다 긴지 확인\n[ ] Read Replica 사용 시 binlog 활성화 여부 확인\n[ ] 네트워크 지연 및 타임아웃 설정 검토\n[ ] SSL/TLS 연결 설정 (프로덕션 환경)",
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
    "answer": "MySQL Binlog 기반 CDC 원리:\n\nBinlog란?\nMySQL의 Binary Log는 데이터베이스에 대한 모든 변경 사항(DDL, DML)을 순차적으로 기록하는 로그 파일입니다. 원래 복제(Replication)를 위해 설계되었습니다.\n\nDebezium의 Binlog 캡처 과정:\n\nBinlog 이벤트 타입:\nWRITEROWSEVENT: INSERT 작업\nUPDATEROWSEVENT: UPDATE 작업\nDELETEROWSEVENT: DELETE 작업\nQUERYEVENT: DDL 문장 (CREATE, ALTER 등)\nTABLEMAP_EVENT: 테이블 메타데이터\n\nGTID vs File:Position:\n\n방식   장점   단점\n\nGTID   장애 복구 용이, 자동 위치 추적   MySQL 5.6.5+ 필요, 설정 복잡\nFile:Position   단순, 모든 버전 지원   수동 위치 관리, 장애 시 복잡\n\n함정 질문 - \"Binlog를 직접 파일로 읽나요?\":\n아닙니다! Debezium은 MySQL Replication Protocol을 사용하여 binlog를 스트리밍으로 받습니다. 마치 Replica 서버처럼 동작하여:\n네트워크를 통해 실시간으로 이벤트 수신\n파일 접근 권한 불필요\nMySQL 서버의 binlog 관리에 의존\n\n운영 시 주의사항:\nBinlog 만료 전 커넥터 재시작: binlog가 삭제되면 스냅샷부터 다시 시작해야 함\nGTID 사용 권장: 장애 복구 및 페일오버 시 자동 위치 추적\nserver-id 고유성: 다른 Replica와 충돌하지 않도록 설정",
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
    "answer": "Debezium-Elasticsearch 동기화 아키텍처:\n\n아키텍처 구성 옵션:\nKafka Connect Elasticsearch Sink:\n대안적 아키텍처:\n\n방식   장점   단점   적합한 경우\n\nKafka Connect ES Sink   관리 용이, 자동 재시도   복잡한 변환 제한   단순 동기화\nKafka Streams 중간 처리   복잡한 변환 가능   개발 필요   데이터 가공 필요\nLogstash   유연한 필터링   추가 인프라   기존 ELK 스택 활용\n커스텀 Consumer   완전한 제어   개발/운영 부담   특수 요구사항\n\nSMT(Single Message Transform) 활용:\n\nDELETE 이벤트 처리:\nExtractNewRecordState의 delete.handling.mode 설정\ndrop: 삭제 이벤트 무시\nrewrite: _deleted 필드 추가\nnone: tombstone 이벤트 전달\n\n운영 환경 고려사항:\n인덱스 매핑: 사전 매핑 정의로 타입 불일치 방지\nBulk 설정: batch.size, linger.ms 튜닝\nDead Letter Queue: 실패 메시지 처리 전략\n인덱스 라이프사이클: ILM 정책과 연계",
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
    "answer": "Debezium 커넥터 주요 구성 요소:\nKafka Connect Framework:\n핵심 구성 요소:\n\n구성 요소   역할   저장 위치\n\nConnector   커넥터 설정, 태스크 관리   Kafka Connect 설정 토픽\nTask   실제 데이터 캡처 수행   Worker 프로세스\nOffset Storage   처리 위치 추적   Kafka 토픽 (connect-offsets)\nSchema History   DDL 변경 이력   Kafka 토픽 (schema-history)\nSchema Registry   스키마 버전 관리   별도 서비스 (선택)\nDebezium 내부 구성:\nSchema History의 중요성:\nDDL 문(CREATE, ALTER)을 기록\n과거 시점의 테이블 구조 재구성에 필요\n커넥터 재시작 시 스키마 복원\nOffset의 구조 (MySQL):\n\n함정 질문 - \"Kafka 없이 Debezium을 사용할 수 있나요?\":\n예, 가능합니다! Debezium은 여러 배포 모드를 지원합니다:\nKafka Connect 모드: 표준 방식, 프로덕션 권장\nDebezium Server: Kafka 없이 직접 타겟으로 전송 (Pulsar, Kinesis, Redis 등)\nEmbedded Engine: 애플리케이션 내장 사용",
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
    "answer": "Debezium 데이터 일관성 보장 메커니즘:\n스냅샷 일관성:\nSnapshot Isolation: 트랜잭션 격리 수준을 활용한 일관된 읽기\nMySQL: REPEATABLE READ + LOCK TABLES (선택적)\nPostgreSQL: 트랜잭션 스냅샷 사용\n이벤트 순서 보장:\n파티션 키: 동일 레코드는 동일 파티션으로 전송 → 순서 보장\n토픽 파티셔닝: 테이블 PK 기반 파티션 할당\nExactly-Once 의미론:\n\n레벨   보장 수준   설정\n\nDebezium → Kafka   At-least-once   기본값\nKafka → Consumer   설정에 따라 다름   트랜잭션 사용 가능\nEnd-to-End   At-least-once   멱등성 구현 필요\n트랜잭션 메타데이터:\nOutbox 패턴과의 결합:\n\n함정 질문 - \"Debezium이 Exactly-Once를 보장하나요?\":\n기본적으로 At-Least-Once입니다. Exactly-Once를 위해서는:\nConsumer 측에서 멱등성 구현 (PK 기반 upsert)\nKafka Transactions 활용 (제한적)\n메시지 중복 제거 로직 구현\n\n운영 환경 체크리스트:\n[ ] Consumer 멱등성 처리 구현\n[ ] Dead Letter Queue 설정\n[ ] 재처리 시나리오 테스트\n[ ] 순서 의존성 분석",
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
    "answer": "Debezium 스키마 변경 처리 메커니즘:\n스키마 히스토리 저장:\nDDL 이벤트 캡처:\nMySQL binlog에서 DDL 문장을 감지하고 스키마 히스토리에 저장:\n스키마 진화 호환성:\n\n변경 유형   Avro 호환성   처리 방법\n\n컬럼 추가 (기본값 있음)   Backward   자동 처리\n컬럼 추가 (기본값 없음)   Forward   주의 필요\n컬럼 삭제   Forward   주의 필요\n컬럼 타입 변경   비호환   수동 개입 필요\n컬럼 이름 변경   비호환   수동 개입 필요\nSchema Registry 연동:\n스키마 변경 전략:\n\n트레이드오프:\n전략   장점   단점\n\nIn-place 변경   단순, 연속성 유지   비호환 변경 시 Consumer 영향\n새 토픽 생성   완전한 격리   마이그레이션 복잡\n버전 필드 추가   유연한 처리   Consumer 로직 복잡\n\n함정 질문 - \"스키마 변경 시 커넥터가 자동으로 처리하나요?\":\n부분적으로 그렇습니다:\n호환 가능한 변경 (컬럼 추가): 자동 처리\n비호환 변경 (타입 변경, 이름 변경): Consumer 오류 가능\n테이블 삭제/재생성: 커넥터 재시작 필요할 수 있음\n\n운영 시 권장 사항:\nSchema Registry 사용하여 호환성 검증\nDDL 변경 전 Consumer 영향도 분석\nBlue-Green 배포로 안전한 스키마 마이그레이션\n스키마 히스토리 토픽 백업",
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
    "answer": "MySQL Binlog 형식 비교:\n\n형식   저장 내용   예시\n\nSTATEMENT   SQL 문장 자체   UPDATE users SET age=30 WHERE id=1\nROW   변경된 행 데이터   before: {id:1, age:20}, after: {id:1, age:30}\nMIXED   상황에 따라 자동 선택   비결정적 함수 시 ROW, 그 외 STATEMENT\n\nDebezium과 Binlog 형식 관계:\n\nROW 형식이 필수인 이유:\n\nbinlogrowimage 설정:\n\n설정   before 이미지   after 이미지   용도\n\nFULL   모든 컬럼   모든 컬럼   Debezium 권장\nMINIMAL   PK만   변경된 컬럼만   저장 공간 절약\nNOBLOB   BLOB 제외   BLOB 제외   대용량 BLOB 제외\n\n설정 확인 및 변경:\n\n함정 질문 - \"MIXED 형식을 사용해도 되나요?\":\n사용하지 않는 것이 좋습니다. 이유:\n비결정적 함수가 있을 때만 ROW로 전환\n일부 이벤트가 STATEMENT로 기록될 수 있음\nDebezium이 STATEMENT 이벤트를 처리하지 못함\n데이터 누락 위험\n\n트레이드오프 - ROW 형식의 비용:\n\n고려사항   ROW   STATEMENT\n\n저장 공간   더 큼 (각 행 저장)   더 작음 (SQL만 저장)\n네트워크 대역폭   더 많음   더 적음\nCDC 호환성   완전 호환   비호환\nReplica 일관성   보장   비결정적 함수 시 불일치 가능\n\n운영 환경 권장 설정:",
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
    "answer": "Debezium Snapshot 모드:\n\n스냅샷의 목적:\n커넥터 시작 시 기존 데이터의 일관된 복사본을 생성하여, 이후 실시간 CDC 스트리밍으로 전환\n\n주요 Snapshot 모드:\n\n모드   동작   사용 시나리오\n\ninitial (기본)   최초 시작 시 스냅샷, 이후 스트리밍   새로운 CDC 파이프라인 구축\ninitialonly   스냅샷만 수행, 스트리밍 안 함   일회성 데이터 마이그레이션\nwhenneeded   오프셋 없거나 binlog 만료 시 스냅샷   자동 복구 필요 시\nschemaonly   스키마만 캡처, 데이터 스냅샷 없음   신규 데이터만 필요 시\nschemaonlyrecovery   스키마 복구용   스키마 히스토리 손상 시\nnever   스냅샷 절대 안 함   binlog 위치 직접 지정 시\nnodata   스키마만 (initial 완료 후)   재시작 시 데이터 스킵\n\n트레이드오프 - Snapshot 모드 선택:\n\nSnapshot 설정 옵션:\n\nLocking 모드:\n\n모드   동작   트레이드오프\n\nminimal   스키마 읽기 시만 짧은 락   권장, 대부분 상황에 적합\nextended   스냅샷 전체 기간 락   완벽한 일관성, 쓰기 차단\nnone   락 없음   일관성 보장 안 됨\n\nIncremental Snapshot (Debezium 1.6+):\n대용량 테이블을 청크 단위로 스냅샷:\n\n스냅샷 트리거 신호:\n\n함정 질문 - \"스냅샷 중에 변경된 데이터는 어떻게 되나요?\":\nDebezium은 이를 처리합니다:\n스냅샷 시작 시 binlog 위치 기록\n스냅샷 완료 후 해당 위치부터 스트리밍\n중복 이벤트 가능 → Consumer 멱등성 필요",
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
    "answer": "Debezium 지연 발생 원인과 해결책:\n스냅샷 단계 지연:\n\n원인   해결책\n\n대용량 테이블   Incremental Snapshot 사용\n전체 테이블 락   snapshot.locking.mode=minimal\n느린 SELECT   snapshot.fetch.size 조정\n단일 스레드 처리   snapshot.max.threads 증가\n스트리밍 단계 지연:\n\n원인   해결책\n\nKafka Producer 배치   max.batch.size, linger.ms 조정\n네트워크 지연   지역 근접성 확보\n변환 처리 오버헤드   SMT 최소화\n스키마 레지스트리 지연   캐싱 설정\nConsumer 단계 지연:\n\n지연 모니터링 메트릭:\n\n트레이드오프 - 지연 vs 처리량:\n\n설정   낮은 지연   높은 처리량\n\nmax.batch.size   작게 (1-10)   크게 (1000+)\nlinger.ms   0-5ms   50-200ms\npoll.interval.ms   작게 (100ms)   크게 (1000ms)\n\nHeartbeat 설정:\n유휴 테이블에서도 오프셋 업데이트:\n\n함정 질문 - \"실시간(Real-time)을 보장하나요?\":\nNear Real-time입니다. 완전한 실시간은 아닙니다:\n네트워크 지연\nKafka 배치 처리\nConsumer 처리 시간\n일반적으로 100ms-1s 수준의 지연\n\n운영 환경 체크리스트:\n[ ] MilliSecondsBehindSource 메트릭 모니터링\n[ ] Consumer Lag 알림 설정\n[ ] Heartbeat 설정으로 유휴 테이블 오프셋 관리\n[ ] 대용량 트랜잭션 분리",
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
    "answer": "MySQL-Elasticsearch 동기화 정합성 이슈:\n이벤트 순서 역전:\n\n해결책:\n동일 키는 동일 파티션으로 라우팅\n중복 이벤트 처리:\n\n해결책:\nES의 문서 ID를 PK로 설정 → 자연스러운 멱등성\n스키마 불일치:\n\n문제   원인   해결책\n\n타입 불일치   MySQL DATETIME → ES date   ES 매핑 사전 정의\n필드 누락   nullable 컬럼   dynamic mapping 또는 기본값\n중첩 구조   관계형 → 문서형   SMT로 변환 또는 Kafka Streams\nDELETE 이벤트 처리:\n\n해결책:\n동기화 지연으로 인한 읽기 불일치:\n\n해결책:\nRead-your-writes: 쓰기 후 MySQL 직접 조회\n최종 일관성 UI/UX 설계\nES refresh 설정 조정 (trade-off: 성능)\n참조 무결성:\n\n해결책:\nES에서 참조 무결성 포기 (비정규화)\n또는 Kafka Streams로 조인 후 발행\n\n정합성 검증 전략:",
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
    "answer": "Debezium 지원 메시지 포맷:\nJSON (기본):\nAvro:\nProtobuf:\n\n포맷 비교:\n\n특성   JSON   Avro   Protobuf\n\n가독성   높음   낮음 (바이너리)   낮음\n크기   큼   작음   매우 작음\n스키마 진화   없음   강력함   강력함\n처리 속도   느림   빠름   매우 빠름\nSchema Registry 필요   선택   필수   필수\n\n트레이드오프 - 포맷 선택:\n\nJSON 옵션:\n\nCloudEvents 형식:\n\n함정 질문 - \"JSON이 가장 좋은 선택인가요?\":\n상황에 따라 다릅니다:\n개발/테스트: JSON (디버깅 용이)\n프로덕션 고처리량: Avro/Protobuf (효율성)\n다양한 Consumer: JSON (범용성)\n강력한 스키마 관리: Avro (Schema Registry)\n\n메시지 구조 단순화 (SMT):\n\n변환 전:\n\n변환 후:",
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
    "answer": "Elasticsearch 실시간 인덱싱 주의사항:\nRefresh 간격 설정:\n\n설정   검색 가시성   인덱싱 성능\n\n1s (기본)   빠름   낮음\n5-30s   느림   높음\n-1 (비활성)   수동 refresh   최고\nBulk API 활용:\n매핑 사전 정의:\n문서 ID 전략:\n\n트레이드오프 - 인덱싱 전략:\n\n전략   장점   단점\n\n개별 인덱싱   즉각적 가시성   오버헤드 큼\nBulk 배치   효율적   지연 발생\nIngest Pipeline   전처리 가능   추가 지연\n인덱스 라이프사이클 관리 (ILM):\n에러 처리:\n\n함정 질문 - \"실시간 검색이 가능한가요?\":\nNear Real-time입니다:\nES의 refreshinterval만큼 지연\nSegment merge로 인한 추가 지연\n진정한 실시간이 필요하면 다른 솔루션 고려\n\n운영 체크리스트:\n[ ] 매핑 사전 정의 (dynamic mapping 최소화)\n[ ] 적절한 샤드 수 설정\n[ ] Refresh interval 튜닝\n[ ] Bulk size 최적화\n[ ] DLQ 설정 및 모니터링",
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
    "answer": "Debezium 장애 복구 메커니즘:\n오프셋 기반 복구:\n오프셋 저장 구조:\n장애 시나리오별 복구:\n\n시나리오   동작   주의사항\n\n커넥터 재시작   오프셋부터 재개   중복 이벤트 가능\nBinlog 만료   스냅샷 필요   whenneeded 모드 권장\n스키마 히스토리 손상   복구 필요   schemaonlyrecovery 모드\nKafka Connect 장애   Worker 페일오버   분산 모드 권장\n분산 모드 장점:\nBinlog 만료 대응:\n\n트레이드오프 - 복구 전략:\n\n전략   장점   단점\n\nwhenneeded   자동 복구   예상치 못한 스냅샷\nnever   스냅샷 없음   수동 개입 필요\nGTID 사용   쉬운 위치 추적   MySQL 5.6.5+ 필요\n수동 오프셋 조정:\n\n함정 질문 - \"Exactly-once 복구가 가능한가요?\":\n기본적으로 At-least-once입니다:\n커넥터 실패 후 재시작 시 중복 발생 가능\nConsumer 측 멱등성으로 해결\n\n운영 권장사항:\n[ ] 분산 모드 Kafka Connect 사용\n[ ] GTID 활성화 (MySQL)\n[ ] Binlog 보관 기간 충분히 설정\n[ ] 오프셋/스키마 히스토리 토픽 백업",
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
    "answer": "Debezium MySQL 이벤트 처리 전체 흐름:\n전체 아키텍처:\n상세 처리 단계:\n\nStep 1: MySQL 트랜잭션 발생\n\nStep 2: Binlog 기록\n\nStep 3: Debezium Binlog Reader\n\nStep 4: Event Deserialization\n\nStep 5: Change Event 생성\n\nStep 6: SMT 적용 (선택)\n\nStep 7: Kafka 발행\n\nStep 8: 오프셋 커밋\n\n함정 질문 - \"모든 binlog 이벤트를 처리하나요?\":\n아닙니다:\ntable.include.list로 필터링\ncolumn.exclude.list로 컬럼 제외\nDDL 이벤트는 스키마 히스토리에만 저장 (별도 토픽 발행 선택)",
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
    "answer": "Debezium Offset 관리 메커니즘:\nOffset 구조:\nOffset 저장 위치:\n\n모드   저장 위치   용도\n\n분산 모드   Kafka 토픽 (connect-offsets)   프로덕션 권장\n단독 모드   로컬 파일   개발/테스트\nEmbedded   커스텀 스토어   애플리케이션 내장\nOffset 커밋 흐름:\nOffset 커밋 설정:\n\n트레이드오프 - 커밋 주기:\n\n설정   짧은 주기 (1-5초)   긴 주기 (60초+)\n\n데이터 손실   최소화   장애 시 더 많은 중복\n성능   오버헤드 증가   효율적\n복구 시간   빠름   더 많은 재처리\n장애 시나리오:\nGTID vs File:Position:\n\n방식   장점   단점\n\nGTID   자동 위치 추적, 페일오버 지원   MySQL 5.6.5+\nFile:Position   단순, 모든 버전 지원   수동 관리 필요\n스냅샷 중 Offset:\n스냅샷 시작 시 binlog 위치 기록\n스냅샷 완료 후 해당 위치부터 스트리밍\n\n함정 질문 - \"Offset만 있으면 복구 가능한가요?\":\nOffset과 함께 스키마 히스토리도 필요합니다:\n과거 시점의 테이블 구조 정보\nDDL 변경 이력\n없으면 이벤트 파싱 실패\n\n운영 권장사항:\n[ ] GTID 사용 권장\n[ ] offset.flush.interval.ms 적절히 설정\n[ ] connect-offsets 토픽 replication factor 3+\n[ ] 스키마 히스토리 토픽과 함께 백업",
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
    "answer": "CDC 트랜잭션 처리 방식:\n트랜잭션 메타데이터:\nDebezium은 트랜잭션 경계 정보를 제공합니다:\n트랜잭션 경계 토픽:\n\n트랜잭션 시작/종료 이벤트:\n트랜잭션 일관성 패턴:\n\n패턴 1: Outbox 패턴\n\n패턴 2: 트랜잭션 버퍼링 (Consumer)\n\n트레이드오프:\n\n접근 방식   장점   단점\n\n이벤트별 처리   단순, 낮은 지연   트랜잭션 경계 무시\n트랜잭션 버퍼링   원자성 보장   메모리 사용, 지연 증가\nOutbox 패턴   명시적 이벤트 설계   추가 테이블 필요\n대용량 트랜잭션 처리:\n\n주의: 매우 큰 트랜잭션은 메모리 문제 유발 가능\n\n함정 질문 - \"Debezium이 트랜잭션 원자성을 보장하나요?\":\n부분적입니다:\n동일 트랜잭션 이벤트는 순서대로 발행\n하지만 Kafka에서 Consumer가 일부만 처리하고 실패할 수 있음\nConsumer 측에서 트랜잭션 경계 처리 필요\n\n운영 권장사항:\n[ ] 중요 이벤트는 Outbox 패턴 사용\n[ ] 트랜잭션 메타데이터 활성화\n[ ] 대용량 트랜잭션 모니터링",
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
    "answer": "Debezium 데이터 중복 발생 원인:\n중복 발생 시나리오:\n중복 해결 전략:\n\n전략 1: Consumer 멱등성 (권장)\n\n전략 2: Kafka Producer 멱등성\n\n전략 3: 중복 제거 로직\n\n전략 4: 트랜잭션 아웃박스\n중복 제거 레벨:\n\n레벨   방법   트레이드오프\n\nKafka   멱등성 Producer   순서 제한 (max 5)\nConsumer   멱등성 처리   구현 필요\nStorage   Upsert/문서ID   DB 지원 필요\nApplication   이벤트 ID 추적   상태 관리 필요\n중복 추적 구현 예시:\n\n함정 질문 - \"Exactly-once를 보장하나요?\":\n기본적으로 At-least-once입니다:\nDebezium + Kafka = At-least-once\nExactly-once는 Consumer 구현에 따라 달성 가능\nKafka Transactions + 멱등성 Consumer = Effectively Exactly-once\n\n운영 권장사항:\n[ ] 모든 Consumer에 멱등성 로직 구현\n[ ] Primary Key 기반 Upsert 사용\n[ ] 이벤트 ID(GTID 등)로 중복 추적\n[ ] 중복 이벤트 모니터링",
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
    "answer": "Debezium 필터링 기능:\n테이블/데이터베이스 필터링:\n컬럼 필터링:\n컬럼 마스킹:\n이벤트 타입 필터링 (SMT):\n조건부 필터링:\n토픽 라우팅:\n\n필터링 레벨 비교:\n\n레벨   적용 시점   장점   단점\n\nDB 레벨   binlog 읽기 전   가장 효율적   MySQL 서버 설정 필요\nConnector 레벨   이벤트 생성 전   간편한 설정   일부 오버헤드\nSMT 레벨   Kafka 발행 전   유연한 조건   처리 오버헤드\nConsumer 레벨   소비 후   가장 유연   불필요한 데이터 전송\n\n트레이드오프:\n\n함정 질문 - \"필터링하면 binlog 읽기도 줄어드나요?\":\n아닙니다:\nDebezium은 모든 binlog 이벤트를 읽음\n필터링은 Kafka 발행 전에 적용\nbinlog 읽기 자체의 부하는 동일\n예외: 데이터베이스 필터링은 일부 최적화 가능\n\n운영 권장사항:\n[ ] 가능한 상위 레벨(테이블/DB)에서 필터링\n[ ] 민감 데이터는 마스킹 적용\n[ ] 필터 조건 테스트 철저히\n[ ] 필터링 성능 영향 모니터링",
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
    "answer": "Kafka Connect와 Debezium 아키텍처:\nKafka Connect 개요:\n동작 방식:\n\n구성 요소   역할\n\nWorker   커넥터 실행 환경 (JVM 프로세스)\nConnector   작업 정의 및 Task 관리\nTask   실제 데이터 복사 수행\nConverter   데이터 직렬화/역직렬화\nTransform   메시지 변환 (SMT)\n배포 모드:\n\n모드   특징   사용 시나리오\n\nStandalone   단일 프로세스, 로컬 오프셋   개발/테스트\nDistributed   클러스터, Kafka 오프셋   프로덕션\nREST API:\n내부 토픽:\n\n토픽   용도\n\nconnect-configs   커넥터 설정 저장\nconnect-offsets   오프셋 저장\nconnect-status   커넥터 상태 저장\nschema-changes.*   스키마 히스토리 (Debezium)\n분산 모드 설정:\n\n트레이드오프 - 태스크 수:\nDebezium: 소스당 1 Task (binlog는 단일 스트림)\nSink Connector: 병렬 처리 가능 (여러 Task)\n\n함정 질문 - \"Debezium 없이 CDC가 가능한가요?\":\nKafka Connect 자체는 CDC 기능이 없습니다:\nJDBC Source Connector: 쿼리 기반 (진정한 CDC 아님)\nDebezium: 로그 기반 CDC\n다른 CDC 커넥터: Oracle CDC, Attunity 등",
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
    "answer": "Debezium 모니터링 전략:\nJMX 메트릭:\n\n메트릭   의미   임계값 예시\n\nMilliSecondsBehindSource   소스 대비 지연 시간   > 60000ms 경고\nNumberOfEventsFiltered   필터링된 이벤트 수   비정상 증가 모니터링\nTotalNumberOfEventsSeen   처리된 총 이벤트   처리량 추적\nNumberOfDisconnects   연결 끊김 횟수   > 0 조사 필요\nQueueTotalCapacity   큐 용량   사용률 모니터링\nQueueRemainingCapacity   남은 큐 용량   < 20% 경고\nPrometheus + Grafana 설정:\n알림 규칙 예시:\nKafka Connect REST API 모니터링:\nConsumer Lag 모니터링:\n로그 모니터링:\n대시보드 구성:\n\n함정 질문 - \"MilliSecondsBehindSource가 0이면 문제없나요?\":\n반드시 그렇지 않습니다:\n소스에 변경이 없으면 0일 수 있음\nHeartbeat 설정으로 유휴 상태에서도 업데이트 필요\nConsumer Lag도 함께 확인해야 함\n\n운영 체크리스트:\n[ ] JMX Exporter 설정\n[ ] Grafana 대시보드 구성\n[ ] 알림 규칙 설정 (Lag, 연결 상태)\n[ ] 로그 수집 (ELK/Loki)\n[ ] Consumer Lag 모니터링",
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
    "answer": "Debezium + Elasticsearch 연동 도구:\nKafka Connect Elasticsearch Sink (권장):\n\n장점   단점\n\nKafka Connect 생태계 통합   복잡한 변환 제한\n자동 재시도, DLQ   학습 곡선\n관리 도구 통합   Confluent 라이선스 고려\nLogstash:\n\n장점   단점\n\n유연한 필터링   추가 인프라\nELK 스택 통합   리소스 사용량\n풍부한 플러그인   복잡한 파이프라인 관리\nKafka Streams (커스텀):\n\n장점   단점\n\n완전한 제어   개발 필요\n복잡한 변환 가능   운영 부담\n상태 관리 가능   직접 구현\nDebezium Server (Kafka 없이):\n\n장점   단점\n\nKafka 불필요   내구성 감소\n단순한 아키텍처   확장성 제한\n빠른 시작   복잡한 라우팅 어려움\n도구 비교:\n\n도구   복잡도   유연성   운영 부담   추천 시나리오\n\nES Sink Connector   낮음   중간   낮음   프로덕션 권장\nLogstash   중간   높음   중간   기존 ELK 사용 시\nKafka Streams   높음   매우 높음   높음   복잡한 변환 필요\nDebezium Server   낮음   낮음   낮음   소규모/테스트\n\n함정 질문 - \"어떤 도구가 가장 좋은가요?\":\n상황에 따라 다릅니다:\n단순 동기화: ES Sink Connector\n복잡한 데이터 가공: Kafka Streams\n기존 ELK 환경: Logstash\nKafka 없는 환경: Debezium Server",
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
    "answer": "Debezium Snapshot 문제와 해결 방안:\n대용량 테이블 스냅샷 시간:\n\n문제   해결 방안\n\n스냅샷 완료까지 수 시간 소요   Incremental Snapshot 사용\nKafka Producer 타임아웃   producer.override. 조정\n메모리 부족   snapshot.fetch.size 조정\n테이블 락 문제:\n\n모드   락 범위   일관성\n\nextended   전체 스냅샷 동안   완벽\nminimal   스키마 읽기 시만   대부분 충분\nnone   락 없음   일관성 보장 안 됨\nBinlog 만료:\n스냅샷 중단 후 재시작:\n스키마 변경 중 스냅샷:\nOOM (Out of Memory):\nConsumer 처리 속도:\n\n트레이드오프 - 스냅샷 전략:\n\n전략   장점   단점\n\n전체 스냅샷   단순, 일관성 보장   시간 소요, 리소스 사용\n스키마만   빠른 시작   기존 데이터 없음\n증분 스냅샷   중단 재개 가능   설정 복잡\n\nIncremental Snapshot 시그널:\n\n함정 질문 - \"스냅샷 없이 시작할 수 있나요?\":\n가능하지만 주의 필요:\nsnapshot.mode = never: binlog 위치 직접 지정 필요\nsnapshot.mode = schema_only: 스키마만 캡처, 기존 데이터 없음\n기존 데이터가 필요하면 스냅샷 필수",
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
    "answer": "Debezium MySQL 스키마 변경 처리:\n스키마 변경 감지 원리:\n스키마 히스토리 토픽:\n변경 유형별 대응:\n\n변경 유형   Debezium 동작   주의사항\n\n컬럼 추가   자동 반영   새 컬럼 포함된 이벤트 발행\n컬럼 삭제   자동 반영   이전 이벤트와 구조 다름\n컬럼 타입 변경   자동 반영   Consumer 영향 가능\n테이블 삭제   이벤트 중단   관련 토픽 처리 필요\n테이블 이름 변경   새 토픽 생성   라우팅 설정 필요\n스키마 레지스트리와 호환성:\n\n호환성 규칙:\n호환성 모드   허용 변경\n\nBACKWARD   컬럼 삭제, 기본값 있는 추가\nFORWARD   컬럼 추가\nFULL   기본값 있는 추가만\nNONE   모든 변경 허용 (주의)\n문제 시나리오와 해결:\n\n시나리오 1: 비호환 스키마 변경\n\n시나리오 2: 스키마 히스토리 손상\n\n시나리오 3: 과거 스키마 필요\nDDL 이벤트 발행 (선택):\n\n트레이드오프 - 스키마 관리 전략:\n\n전략   장점   단점\n\n자동 진화   간편   비호환 변경 시 문제\n버전 관리   명시적 제어   운영 복잡\n토픽 분리   격리   마이그레이션 필요\n\n함정 질문 - \"DDL 변경이 바로 반영되나요?\":\nbinlog에 기록된 후 반영됩니다:\nDDL 문 실행 → binlog 기록 → Debezium 캡처\n약간의 지연 존재\nDDL 직후 DML은 올바른 스키마로 처리됨\n\n운영 권장사항:\n[ ] DDL 변경 전 Consumer 영향 분석\n[ ] Schema Registry 호환성 모드 설정\n[ ] 스키마 히스토리 토픽 백업\n[ ] DDL 변경 알림 설정",
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
    "answer": "Debezium CDC 장애 유형과 예방:\n연결 관련 장애:\n\n장애   원인   예방 방법\n\nMySQL 연결 끊김   네트워크, 서버 재시작   자동 재연결, 타임아웃 설정\n인증 실패   비밀번호 변경, 권한 변경   모니터링, 알림\nKafka 연결 실패   브로커 장애   클러스터 구성, 재시도\nBinlog 관련 장애:\n\n장애   원인   예방 방법\n\nBinlog 만료   보관 기간 초과   충분한 expirelogsdays\nBinlog 누락   GTID 미사용   GTID 활성화\n위치 추적 실패   오프셋 손상   정기 백업\n스냅샷 장애:\n\n장애   원인   예방 방법\n\nOOM   대용량 테이블   fetch.size 조정\n타임아웃   긴 스냅샷 시간   Incremental Snapshot\n락 충돌   프로덕션 쓰기 차단   minimal locking\n스키마 변경 장애:\n\n장애   원인   예방 방법\n\nConsumer 오류   비호환 변경   Schema Registry\n파싱 실패   스키마 히스토리 손상   백업, recovery 모드\n장애 대응 체크리스트:\n고가용성 구성:\n모범 사례:\n\n함정 질문 - \"Debezium만 모니터링하면 되나요?\":\n아닙니다. 전체 파이프라인 모니터링 필요:\nMySQL (복제 지연, binlog)\nDebezium (연결, 지연)\nKafka (브로커 상태, 토픽)\nConsumer (Lag, 처리율)\nTarget (ES 등 - 인덱싱 상태)",
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
    "answer": "Debezium MySQL 커넥터 요구 사항:\nMySQL 서버 요구 사항:\n\n항목   최소   권장\n\nMySQL 버전   5.6+   8.0+\nBinlog 형식   ROW   ROW\nBinlog Row Image   FULL   FULL\nGTID   선택   ON (권장)\n사용자 권한:\nKafka Connect 요구 사항:\n\n항목   최소   권장\n\nJava   11+   17+\nKafka   2.0+   3.0+\n메모리   1GB   4GB+\nCPU   1 코어   2+ 코어\n최소 커넥터 설정:\n권장 추가 설정:\n네트워크 요구 사항:\n\n연결   포트   용도\n\nMySQL   3306   데이터베이스 연결\nKafka   9092   메시지 발행\nSchema Registry   8081   스키마 관리 (선택)\n토픽 설정:\n\n트레이드오프 - 리소스 할당:\n\n워크로드   메모리   코어   비고\n\n소규모 (< 100 TPS)   2GB   1   개발/테스트\n중규모 (< 1000 TPS)   4GB   2   소규모 프로덕션\n대규모 (> 1000 TPS)   8GB+   4+   대규모 프로덕션\n\n함정 질문 - \"ROW 형식 대신 MIXED 써도 되나요?\":\n안 됩니다. Debezium은 ROW 형식만 지원:\nSTATEMENT: SQL 문만 기록 → 실제 데이터 없음\nMIXED: 일부 STATEMENT → 일부 이벤트 캡처 불가\nROW: 모든 변경 데이터 포함 → 필수",
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
    "answer": "Debezium 재처리 메커니즘:\n오프셋 기반 재처리:\n재처리 시나리오:\n\n시나리오   재처리 범위   영향\n\n커넥터 재시작   마지막 오프셋 이후   최소 중복\nBinlog 만료   전체 스냅샷   대량 재처리\n스키마 히스토리 손상   스키마 복구 후   설정에 따라 다름\n수동 오프셋 조정:\nAd-hoc 스냅샷 (재처리):\n전체 재동기화:\nConsumer 측 재처리:\n재처리 전략:\n\n전략   방법   사용 시나리오\n\n부분 재처리   오프셋 조정   특정 시점 이후\n테이블 재동기화   Incremental Snapshot   특정 테이블만\n전체 재동기화   커넥터 재생성   심각한 불일치\n\n트레이드오프 - 재처리 방식:\n\n방식   장점   단점\n\n오프셋 조정   빠름, 부분적   정확한 위치 찾기 어려움\nIncremental Snapshot   유연, 안전   설정 필요\n전체 재시작   확실함   시간 소요\n재처리 시 주의사항:\n\n함정 질문 - \"오프셋만 조정하면 재처리 가능한가요?\":\n스키마 히스토리도 고려해야 합니다:\n과거 오프셋으로 돌아가면 해당 시점의 스키마 필요\n스키마 히스토리에 해당 시점 정보가 있어야 함\n없으면 스키마 불일치로 파싱 실패\n\n운영 권장사항:\n[ ] 정기적 오프셋 백업\n[ ] 스키마 히스토리 백업\n[ ] Incremental Snapshot 설정\n[ ] 재처리 절차 문서화",
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
    "answer": "Debezium → Elasticsearch 인덱싱 최적화:\nKafka Connect ES Sink 설정:\nElasticsearch 인덱스 설정:\n최적화 영역별 설정:\n\n영역   설정   효과\n\n배치 크기   batch.size 증가   Bulk API 효율\n지연 시간   linger.ms 증가   배치 채움\nRefresh   refreshinterval 증가   세그먼트 생성 감소\nReplica   초기 로드 시 0   복제 오버헤드 제거\nTranslog   async 모드   fsync 감소\n인덱싱 성능 비교:\n스냅샷 시 최적화:\n트레이드오프:\n\n최적화   이점   비용\n\nRefresh 증가   처리량 증가   검색 지연\nReplica 0   쓰기 2배 빠름   내구성 감소\nTranslog async   쓰기 빠름   데이터 유실 위험\nBatch 증가   효율성   메모리 사용\n모니터링 메트릭:\n문서 구조 최적화:\n\n함정 질문 - \"배치 크기를 무한정 늘리면 좋은가요?\":\n아닙니다:\n너무 큰 배치: 메모리 부족, 타임아웃\nES Bulk API 권장: 5-15MB\n문서 크기에 따라 batch.size 조정\n\n운영 권장사항:\n[ ] 초기 로드 vs 스트리밍 설정 분리\n[ ] Refresh interval 워크로드에 맞게 조정\n[ ] 인덱싱 속도 모니터링\n[ ] Bulk 실패 시 DLQ 설정",
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
    "answer": "Debezium MySQL-ES 프로젝트 경험과 교훈:\n프로젝트 개요 (예시 시나리오):\n주요 문제와 해결:\n\n문제 1: 초기 스냅샷 너무 오래 걸림\n\n문제 2: Binlog 만료로 커넥터 실패\n\n문제 3: 스키마 변경 후 Consumer 오류\n\n문제 4: 데이터 불일치\n아키텍처 발전:\n교훈 정리:\n\n영역   교훈\n\n설계   처음부터 멱등성 고려, 스키마 관리 계획\n운영   모니터링 필수, 백업 자동화\n스냅샷   대용량 테이블은 Incremental 필수\n스키마   변경 전 영향도 분석, Registry 사용\n테스트   장애 시나리오 테스트 중요\n성능 결과:\n체크리스트 (프로젝트 시작 시):\n\n함정 질문 - \"CDC가 모든 동기화 문제를 해결하나요?\":\n아닙니다. 여전히 고려할 점이 있습니다:\n참조 무결성 (FK 관계)\n집계/조인 데이터\n최종 일관성 수용\nConsumer 장애 처리",
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
    "answer": "Kafka는 분산 스트리밍 플랫폼으로, 다음과 같은 주요 컴포넌트로 구성됩니다:\nProducer: 메시지를 생성하여 Topic에 발행하는 클라이언트\nBroker: 메시지를 저장하고 관리하는 Kafka 서버. 클러스터는 여러 Broker로 구성됨\nConsumer: Topic에서 메시지를 읽어 처리하는 클라이언트\nTopic: 메시지가 저장되는 논리적 채널. 카테고리 또는 피드 이름과 유사\nPartition: Topic을 물리적으로 분할한 단위. 병렬 처리와 확장성을 제공\nZooKeeper/KRaft: 클러스터 메타데이터 관리 및 Controller 선출 담당 (KRaft는 Kafka 3.3+에서 프로덕션 사용 가능, 4.0에서 ZooKeeper 제거 예정)\n\n메시지 흐름: Producer → Broker(Topic/Partition) → Consumer\n\n핵심 설계 원칙\n메시지는 파티션에 순차적으로 추가되는 불변 로그(immutable log) 형태로 저장\nConsumer는 Pull 방식으로 메시지를 가져옴 (Broker가 Push하지 않음)",
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
    "answer": "Kafka Broker는 Kafka 클러스터의 핵심 서버로, 다음과 같은 역할을 수행합니다:\n메시지 저장: Producer로부터 받은 메시지를 디스크에 영구 저장\n메시지 전달: Consumer 요청 시 저장된 메시지를 전달\n파티션 관리: 각 파티션의 리더 또는 팔로워 역할 수행\n복제 관리: 데이터 복제를 통한 내결함성 보장\n클라이언트 요청 처리: Producer/Consumer의 메타데이터 요청 처리\n\nBroker는 Controller로 선출되어 파티션 리더 선출, 브로커 장애 감지 등 클러스터 관리 작업을 수행할 수 있습니다.",
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
    "answer": "Producer (생산자)\n메시지를 생성하여 Kafka Topic에 발행\n파티션 선택 전략 결정 (라운드 로빈, 키 기반 해싱 등)\n배치 전송, 압축, 재시도 등 설정 가능\nACK 설정으로 전송 신뢰성 조절\n\nConsumer (소비자)\nTopic에서 메시지를 구독하고 처리\nOffset을 관리하여 처리 위치 추적\nConsumer Group에 속하여 병렬 처리 가능\nPull 방식으로 메시지를 가져옴 (Consumer가 능동적으로 요청)\n\n핵심 차이점: Producer는 데이터를 밀어넣고(push), Consumer는 데이터를 당겨옴(pull)",
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
    "answer": "Partition (파티션)\nTopic을 물리적으로 분할한 단위\n각 파티션은 순서가 보장된 불변의 메시지 시퀀스\n병렬 처리의 기본 단위 (파티션 수 = 최대 Consumer 병렬성)\n파티션 키를 통해 관련 메시지를 같은 파티션에 저장 가능\n\nOffset (오프셋)\n파티션 내 각 메시지의 고유 식별자 (순차 증가하는 정수)\nConsumer가 어디까지 읽었는지 추적하는 위치 표시\n자동/수동 커밋을 통해 관리\n_consumeroffsets 토픽에 저장됨\n\n활용: 파티션 수를 늘려 처리량 확장, Offset을 조절하여 메시지 재처리 가능",
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
    "answer": "Kafka는 두 가지 메시지 보존 정책을 제공합니다:\n\n시간 기반 보존 (Time-based)\nlog.retention.hours/minutes/ms: 메시지 보존 기간 설정\n기본값: 7일 (168시간)\n설정된 시간이 지나면 자동 삭제\n\n크기 기반 보존 (Size-based)\nlog.retention.bytes: 파티션당 최대 로그 크기\n크기 초과 시 오래된 세그먼트부터 삭제\n\n세그먼트 관리\nlog.segment.bytes: 세그먼트 파일 크기 (기본 1GB)\nlog.segment.ms: 세그먼트 롤링 주기\n삭제는 세그먼트 단위로 수행됨\n\n두 정책 모두 설정 시, 먼저 도달하는 조건에 따라 삭제됩니다.",
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
    "answer": "Consumer Group 개념\n동일한 group.id를 공유하는 Consumer들의 논리적 그룹\n그룹 내 각 Consumer는 서로 다른 파티션을 담당\n하나의 파티션은 그룹 내 하나의 Consumer만 소비 가능\n\n병렬 처리 구현\nTopic의 파티션 수 설정 (예: 6개)\nConsumer Group 생성 후 여러 Consumer 추가\nKafka가 자동으로 파티션을 Consumer에 분배 (Rebalancing)\n각 Consumer가 할당된 파티션을 독립적으로 처리\n\n주의사항\nConsumer 수 > 파티션 수일 경우, 유휴 Consumer 발생\n최적 병렬성: Consumer 수 = 파티션 수\n서로 다른 Consumer Group은 같은 메시지를 독립적으로 소비 가능\n\n파티션 수 결정 시 트레이드오프\n파티션 증가: 병렬성/처리량 향상, 하지만 브로커 메모리 사용량 증가, 리밸런스 시간 증가, 리더 선출 시간 증가\n파티션 감소: 운영 간소화, 하지만 병렬 처리 제한\n경험적 가이드라인: (목표 처리량) / (단일 파티션 처리량) 또는 (Consumer 인스턴스 수)의 배수로 설정\n파티션은 추가만 가능하고 삭제 불가능하므로 초기 설계 시 신중히 결정",
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
    "answer": "리플리케이션의 필요성\n브로커 장애 시 데이터 손실 방지\n고가용성(High Availability) 보장\n무중단 서비스 운영 가능\n\n설정 방법\nreplication.factor: 토픽 생성 시 복제본 수 지정 (권장: 3)\ndefault.replication.factor: 기본 복제 계수 설정\nmin.insync.replicas: 최소 동기화 복제본 수 (권장: 2)\n\n동작 방식\n각 파티션에는 1개의 Leader와 N-1개의 Follower\nProducer/Consumer는 기본적으로 Leader와 통신 (Kafka 2.4+에서는 replica.selector.class 설정으로 Follower 읽기 가능)\nFollower는 Leader로부터 데이터를 복제 (Pull 방식)\nLeader 장애 시 ISR 중 하나가 새 Leader로 선출\n\nFollower Fetching (Kafka 2.4+)\nreplica.selector.class=org.apache.kafka.common.replica.RackAwareReplicaSelector 설정으로 같은 랙의 복제본에서 읽기 가능\n지리적으로 분산된 클러스터에서 읽기 지연 시간 감소",
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
    "answer": "Leader 선출 과정\nController가 브로커 장애 감지 (ZooKeeper/KRaft 통해)\n장애 브로커가 담당하던 파티션의 ISR 목록 확인\nISR 중 하나를 새로운 Leader로 선출\n메타데이터 업데이트 및 클라이언트에 전파\n\nFailover 설정\nunclean.leader.election.enable: ISR 외 복제본의 리더 승격 허용 여부 (기본: false, Kafka 0.11+)\nleader.imbalance.check.interval.seconds: 리더 재분배 주기\ncontrolled.shutdown.enable: 정상 종료 시 리더 이전 여부\n\n트레이드오프: unclean.leader.election.enable\nfalse (기본값, 권장): 데이터 일관성 우선. ISR이 모두 장애 시 파티션 불가용\ntrue: 가용성 우선. 데이터 손실 가능하지만 서비스 중단 최소화\n결정 기준: 데이터 손실 vs 서비스 중단 중 어떤 것이 더 치명적인지에 따라 선택\n\n클라이언트 복구\nProducer: 재시도 로직으로 새 Leader에 재전송\nConsumer: 새 Leader로부터 이어서 소비\n\n중요: unclean.leader.election.enable=true는 데이터 손실 가능성이 있음\nISR 외의 복제본이 리더가 되면 복제되지 않은 메시지 손실\n가용성 vs 데이터 일관성의 트레이드오프에서 가용성을 선택하는 경우에만 활성화",
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
    "answer": "Kafka Connect 역할\n외부 시스템과 Kafka 간 데이터 스트리밍을 위한 프레임워크\n코드 작성 없이 설정만으로 데이터 파이프라인 구축\nSource Connector: 외부 → Kafka로 데이터 수집\nSink Connector: Kafka → 외부로 데이터 전송\n\n데이터 파이프라인 구축 방법\nConnect 클러스터 설정 (standalone/distributed 모드)\nConnector 플러그인 설치 (JDBC, S3, Elasticsearch 등)\nConnector 설정 JSON 작성\nREST API로 Connector 배포",
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
    "answer": "Kafka Streams\nJava/Scala 라이브러리 (별도 클러스터 불필요)\n복잡한 스트림 처리 로직 구현 가능\n마이크로서비스에 내장하여 사용\n사용 사례: 실시간 데이터 변환, 집계, 조인\n\nKSQL (ksqlDB)\nSQL 기반 스트리밍 쿼리 엔진\n별도의 KSQL 서버 클러스터 필요\n코드 없이 SQL만으로 스트림 처리\n사용 사례: 빠른 프로토타이핑, 데이터 분석, 간단한 ETL\n\n주요 차이점\n구분   Kafka Streams   KSQL\n\n언어   Java/Scala   SQL\n배포   애플리케이션 내장   별도 클러스터\n복잡도   높은 유연성   낮은 진입 장벽\n적합 대상   개발자   데이터 분석가",
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
    "answer": "Exactly-Once Semantics (EOS) 구현 방법\nIdempotent Producer\nenable.idempotence=true 설정 (Kafka 3.0+에서는 기본값 true)\nProducer ID와 시퀀스 번호로 중복 메시지 방지\n단일 파티션 내에서 exactly-once 보장\n요구사항: acks=all, retries > 0, max.in.flight.requests.per.connection <= 5\n\n트레이드오프: Exactly-once는 추가적인 메타데이터 교환과 트랜잭션 오버헤드로 인해 처리량이 약 3-20% 감소할 수 있음. 지연 시간에 민감하거나 처리량이 최우선인 경우 at-least-once + 멱등성 처리가 더 적합할 수 있음\nTransactional API\n여러 파티션에 걸친 원자적 쓰기\ntransactional.id 설정 필요\nConsumer 설정\nisolation.level=readcommitted: 커밋된 트랜잭션만 읽기\n수동 오프셋 커밋으로 처리 완료 후 커밋\n\nKafka Streams\nprocessing.guarantee=exactlyoncev2 설정으로 자동 EOS 지원 (Kafka 2.5+에서 v2 권장, 이전 exactlyonce는 deprecated)\n\n주의사항\nExactly-once는 Kafka 내부에서만 보장됨. 외부 시스템과의 연동 시에는 해당 시스템도 트랜잭션을 지원해야 완전한 EOS 달성 가능\nConsumer의 isolation.level=read_committed 설정 필수",
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
    "answer": "중복 발생 원인\n네트워크 오류로 ACK 미수신 후 재전송\nProducer 재시작 후 동일 메시지 재전송\n브로커 장애 복구 과정에서의 중복\n\n해결 방법\nIdempotent Producer 활성화\nPID(Producer ID) + Sequence Number로 중복 감지 및 무시\nmax.in.flight.requests.per.connection이 5 이하일 때만 순서 보장과 함께 멱등성 동작\nTransactional Producer 사용\n트랜잭션 단위로 원자적 전송 보장\n장애 복구 시에도 중복 방지\nConsumer 측 멱등성 처리\n메시지에 고유 ID 포함\n처리 전 중복 체크 (DB unique constraint, Redis 등)\n멱등한 처리 로직 설계",
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
    "answer": "Offset 저장 위치\n내부 토픽 _consumeroffsets에 저장\nConsumer Group ID와 Topic-Partition 별로 관리\n\n재시작 시 동작\nConsumer가 Group에 조인\n마지막 커밋된 Offset 조회\n해당 Offset부터 메시지 소비 재개\n\nOffset Reset 정책 (auto.offset.reset)\nearliest: 가장 처음 Offset부터 시작 (토픽의 모든 데이터 재처리)\nlatest: 가장 최근 Offset부터 시작 (기본값, 새 메시지만 처리)\nnone: Offset 없으면 예외 발생 (명시적 오프셋 관리 필요 시)\n\n트레이드오프\nearliest: 데이터 손실 없음, 하지만 대량 재처리로 인한 Consumer Lag 발생 가능\nlatest: 빠른 시작, 하지만 Consumer 중단 기간의 메시지 손실 가능\n\n커밋 전략\n\n수동 커밋 방식\ncommitSync(): 동기 커밋 (블로킹)\ncommitAsync(): 비동기 커밋 (논블로킹)",
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
    "answer": "Log Compaction 개념\n동일한 키를 가진 메시지 중 최신 값만 유지하는 보존 정책\n키-값 저장소처럼 각 키의 최종 상태만 보관\n삭제가 아닌 압축을 통해 로그 크기 감소\n\n설정 방법\n\n사용 사례\nCDC (Change Data Capture): DB 변경 이벤트 저장\n상태 저장소: 사용자 설정, 세션 정보\nKafka Streams State Store: 내부 상태 복원\nConsumer Offset 토픽: _consumeroffsets\n\nTombstone 레코드\n키에 null 값을 전송하면 해당 키 삭제 표시\ndelete.retention.ms 후 완전 삭제 (기본값: 24시간)\n\nLog Compaction 트레이드오프\n장점: 스토리지 절약, 빠른 복구(최종 상태만 필요)\n단점: 이력 조회 불가, 컴팩션 중 CPU/I/O 사용량 증가\nmin.cleanable.dirty.ratio: 낮을수록 자주 컴팩션 (CPU 사용량 증가), 높을수록 스토리지 사용량 증가\n\n주의사항\n키가 null인 메시지는 컴팩션 대상이 아니며 일반 retention 정책 적용\n컴팩션은 active segment가 아닌 이전 segment에만 적용됨",
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
    "answer": "Producer 튜닝\nbatch.size: 배치 크기 증가 (기본 16KB → 64KB 이상)\nlinger.ms: 배치 대기 시간 (0 → 5-100ms)\ncompression.type: 압축 활성화 (lz4, snappy)\nbuffer.memory: 버퍼 메모리 확대\n\nConsumer 튜닝\nfetch.min.bytes: 최소 fetch 크기 증가\nfetch.max.wait.ms: 대기 시간 조정\nmax.poll.records: 폴링당 레코드 수 조정\n\nBroker 튜닝\nnum.io.threads: I/O 스레드 수 (디스크 수에 맞게)\nnum.network.threads: 네트워크 스레드 수\nsocket.send.buffer.bytes/socket.receive.buffer.bytes: 소켓 버퍼 크기\nlog.flush.interval.messages: 디스크 플러시 간격\n\n일반 고려사항\n파티션 수 적정 설계 (브로커당 2,000~4,000개 이하 권장)\nJVM 힙 설정 (6-8GB 권장, 과도한 힙은 GC 지연 유발)\n페이지 캐시를 위한 OS 메모리 확보 (Kafka 성능의 핵심)\n\n성능 튜닝의 트레이드오프\nbatch.size 증가: 처리량 향상 vs 지연시간 증가\nlinger.ms 증가: 배치 효율 vs 첫 메시지 지연\ncompression.type: 네트워크 절약 vs CPU 사용량 증가\nacks=all: 데이터 안정성 vs 지연시간 증가\n\n권장 접근법: 기본값으로 시작하여 모니터링 기반으로 병목 지점을 식별한 후 점진적 튜닝",
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
    "answer": "네트워크 설정\n브로커 간 전용 네트워크 대역폭 확보 (10Gbps 권장)\n클라이언트-브로커 간 낮은 레이턴시 네트워크\nsocket.send.buffer.bytes, socket.receive.buffer.bytes 튜닝\nTCP 설정 최적화 (net.core.rmem_max 등)\n\n스토리지\nSSD 권장 (처리량 향상)\nRAID 10 또는 JBOD 구성\n여러 디스크에 로그 디렉토리 분산 (log.dirs)\nXFS 파일시스템 권장\n\n메모리\nJVM 힙: 6-8GB (과도한 GC 방지)\n나머지는 OS 페이지 캐시용으로 확보\n총 메모리: 32-64GB 권장\n\nCPU\n압축 사용 시 CPU 코어 중요\n최소 8코어 이상 권장\n\n파티션/브로커 비율\n브로커당 파티션 수 제한 (ZooKeeper: 4,000개 이하 권장, KRaft: 더 많은 파티션 지원)\n리더 파티션 균등 분배\n전체 클러스터 파티션 수도 고려 (ZooKeeper 모드: 수십만 개 한계, KRaft: 수백만 개 가능)\n\n하드웨어 선택 트레이드오프\nSSD vs HDD: SSD는 랜덤 I/O 성능 향상, 하지만 Kafka는 순차 I/O 중심이므로 HDD도 적합. 비용 대비 용량이 중요하면 HDD 고려\n메모리: JVM 힙보다 페이지 캐시용 메모리가 더 중요. 총 메모리의 절반 이상을 OS에 남겨둘 것\n네트워크: 복제 팩터와 Consumer 수에 따라 필요 대역폭이 배수로 증가",
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
    "answer": "Producer 설정\nacks=all: 모든 ISR 복제 완료 후 ACK\nretries: 충분한 재시도 횟수 설정\nenable.idempotence=true: 멱등성 활성화\n\nBroker 설정\nreplication.factor=3: 3개 이상 복제본\nmin.insync.replicas=2: 최소 2개 동기화 필수\nunclean.leader.election.enable=false: 비동기 복제본의 리더 승격 방지\ndefault.replication.factor=3: 기본 복제 계수\n\nConsumer 설정\nenable.auto.commit=false: 수동 오프셋 커밋\n처리 완료 후 커밋 (at-least-once 보장)\n\n운영 전략\n다중 데이터센터 복제 (MirrorMaker 2)\n정기적인 백업 및 복구 테스트\n모니터링: Under-replicated partitions 감시\n\n조합 예시\n\n→ 최대 1개 브로커 장애까지 쓰기 가능, 데이터 손실 없음\n\n함정 주의\nmin.insync.replicas=2, replication.factor=3일 때 2개 브로커 장애 시 쓰기 불가 (읽기는 가능)\nacks=all이지만 min.insync.replicas=1이면 Leader 한 대만으로 쓰기 성공 가능\n\n데이터 손실 방지 vs 가용성 트레이드오프\n설정   허용 가능한 브로커 장애 (쓰기)   데이터 안정성\n\nRF=3, ISR=1   2개   낮음\nRF=3, ISR=2   1개   높음\nRF=3, ISR=3   0개   최고 (하지만 가용성 낮음)",
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
    "answer": "ACL 개념\n리소스(Topic, Consumer Group 등)에 대한 접근 권한 제어\nPrincipal(사용자/서비스)별로 허용/거부 규칙 정의\n\nACL 구성 요소\nPrincipal: 접근 주체 (User:alice)\nResource: 대상 리소스 (Topic:orders)\nOperation: 허용 작업 (Read, Write, Create 등)\nPermission: Allow 또는 Deny\n\n설정 방법\nBroker 설정\nACL 추가\nACL 조회",
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
    "answer": "SSL/TLS (전송 암호화)\n인증서 생성 (keytool 사용)\nBroker 설정\n\nSASL (인증)\nSASL/PLAIN (간단한 사용자/비밀번호)\nSASL/SCRAM (안전한 비밀번호 저장)\nSASL/GSSAPI (Kerberos)\n엔터프라이즈 환경에서 주로 사용\nKerberos KDC 연동 필요\n\n권장 조합: SASLSSL (인증 + 암호화)",
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
    "answer": "Rolling Restart 절차\n브로커의 controlled.shutdown.enable=true 확인\n한 번에 하나의 브로커만 재시작\nISR이 복구될 때까지 대기 후 다음 브로커 진행\n\n안정성 유지 설정\n\n재시작 전 확인 사항\n\n모범 사례\n피크 시간 외 재시작 수행\n리더 재분배 자동화 (auto.leader.rebalance.enable=true)\n모니터링 알림 설정\n충분한 복제본 수 유지 (3개 이상)",
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
    "answer": "ISR (In-Sync Replica) 개념\nLeader와 동기화된 Replica들의 집합\nLeader를 포함한 \"충분히 최신 상태\"인 복제본들\nreplica.lag.time.max.ms 내에 복제된 복제본만 ISR에 포함\n\nISR의 역할\n리더 선출 후보: Leader 장애 시 ISR 중에서 새 Leader 선출\nACK 대상: acks=all 시 ISR 모두에 복제 완료 후 응답\n데이터 일관성: 동기화된 복제본만 서비스 참여\n\n중요성\nISR 크기가 min.insync.replicas 미만이면 Producer 쓰기 실패 (NotEnoughReplicasException)\nISR 축소는 데이터 손실 위험 신호\nUnder-replicated 파티션 모니터링 필수\n\nISR 관련 함정 주의\nISR은 \"완전히 동기화된\" 복제본이 아니라 \"충분히 최신\" 복제본을 의미\nreplica.lag.time.max.ms 내에 복제 요청을 보낸 복제본은 ISR에 포함됨\n따라서 ISR 내 복제본도 약간의 지연이 있을 수 있음\n\n관련 설정\n\n모니터링 지표\nkafka.server:type=ReplicaManager,name=UnderReplicatedPartitions\n0이 아니면 즉시 조사 필요",
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
    "answer": "파티션 내 순서 보장\nKafka는 단일 파티션 내에서만 메시지 순서 보장\n파티션 간에는 순서 보장 없음\n\n순서 보장 방법\n파티션 키 사용\n단일 파티션 토픽 (처리량 제한됨)\nProducer 설정\n\n주의사항\nmax.in.flight.requests.per.connection > 1이고 멱등성 비활성화 시, 재시도로 인해 순서 역전 가능\n멱등성 활성화 시에도 max.in.flight.requests.per.connection > 5이면 순서 보장 불가\nConsumer는 단일 스레드로 파티션 처리 권장\n\n함정 주의: \"Kafka는 순서를 보장한다\"는 부분적으로만 맞음\n정확히는 \"단일 파티션 내에서, 올바른 Producer 설정 시에만\" 순서 보장\n파티션 간 순서 보장 필요 시 단일 파티션 사용 또는 애플리케이션 레벨 타임스탬프 기반 정렬 필요",
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
    "answer": "ACK 설정 옵션\n\nacks=0\nProducer는 브로커 응답을 기다리지 않음\n가장 빠른 전송 속도\n메시지 손실 가능성 높음\n사용 사례: 로그, 메트릭 등 손실 허용 데이터\n\nacks=1\nLeader가 로컬 로그에 기록 후 응답\nLeader 장애 시 데이터 손실 가능 (Follower 복제 전)\n적절한 성능과 신뢰성 균형\n사용 사례: 일반적인 애플리케이션\n\nacks=all (또는 -1)\n모든 ISR이 복제 완료 후 응답\n가장 높은 내구성 보장\n가장 느린 전송 속도\nmin.insync.replicas와 함께 사용 권장\n사용 사례: 금융 데이터, 주문 등 중요 데이터\n\n비교 요약\nACK   속도   내구성   손실 위험\n\n0   최고   없음   높음\n1   중간   Leader만   중간\nall   낮음   ISR 전체   낮음\n\n운영 환경 트레이드오프 가이드\nacks=0: 로그, 메트릭 등 손실 허용 가능한 대량 데이터에 적합. 처리량 최대화가 목표일 때\nacks=1: 대부분의 일반 애플리케이션에 적합. 처리량과 내구성의 균형\nacks=all + min.insync.replicas=2: 금융, 주문 등 데이터 손실이 허용되지 않는 경우. 지연시간 증가 감수\n\n주의: acks=all이라도 min.insync.replicas=1이면 Leader 한 대만으로도 쓰기 성공 가능하므로 실질적으로 acks=1과 동일한 내구성",
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
    "answer": "아키텍처 차이\n\n구분   Kafka   RabbitMQ\n\n모델   로그 기반   메시지 브로커\n메시지 저장   영구 저장 (retention)   소비 후 삭제\n소비 방식   Pull (Consumer가 가져감)   Push (Broker가 전달)\n프로토콜   자체 프로토콜   AMQP\n\n주요 차이점\n메시지 재처리\nKafka: Offset 조정으로 재처리 가능 (메시지는 retention 기간 동안 보관)\nRabbitMQ: 기본적으로 소비 후 삭제 (Dead Letter Queue로 재처리 가능)\n처리량\nKafka: 높은 처리량에 최적화 (초당 수백만 건), 순차 I/O 활용\nRabbitMQ: 중간 처리량, 낮은 지연시간 (밀리초 단위)\nConsumer 확장\nKafka: 파티션 기반 병렬 처리 (파티션 수가 병렬성 상한)\nRabbitMQ: 큐 경쟁 방식 (Consumer 수에 제한 없음)\n사용 사례\nKafka: 로그 수집, 이벤트 스트리밍, 데이터 파이프라인, 이벤트 소싱\nRabbitMQ: 작업 큐, RPC, 복잡한 라우팅, 마이크로서비스 통신\n\n선택 기준\n대용량 스트리밍, 이벤트 재처리, 장기 보관 → Kafka\n복잡한 라우팅, 유연한 메시징 패턴, 낮은 지연시간 우선 → RabbitMQ\n둘 다 필요한 경우: Kafka + RabbitMQ 혼합 아키텍처도 고려\n\n함정 주의: \"Kafka가 RabbitMQ보다 항상 좋다\"는 잘못된 일반화\n단순한 작업 큐나 RPC 패턴에는 RabbitMQ가 더 적합할 수 있음\n운영 복잡도, 팀 경험, 기존 인프라도 고려 필요",
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
    "answer": "Rolling Upgrade 전략\n사전 준비\n복제 계수 3 이상 확인\nmin.insync.replicas=2 설정\nUnder-replicated 파티션 없음 확인\n브로커 업그레이드 절차\n클라이언트 호환성\ninter.broker.protocol.version 점진적 업그레이드\nlog.message.format.version 설정 유지 후 변경\n\n설정 예시\n\n모니터링\nISR 상태 지속 확인\nConsumer lag 모니터링\n클라이언트 에러 확인",
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
    "answer": "배치 처리 (Batch Processing)\n일정 기간 데이터를 모아서 한 번에 처리\n높은 처리량, 높은 지연시간\nKafka 활용: Consumer가 주기적으로 대량 데이터 소비\n\n스트림 처리 (Stream Processing)\n데이터 도착 즉시 실시간 처리\n낮은 지연시간, 연속적인 처리\nKafka 활용: Kafka Streams, KSQL\n\nKafka에서의 차이\n\n구분   배치 처리   스트림 처리\n\n도구   Consumer + Spark/Flink   Kafka Streams, KSQL\n지연   분~시간   밀리초~초\n윈도우   고정 시간 범위   텀블링/슬라이딩/세션\n상태   외부 저장소   State Store (RocksDB)\n\nKafka Streams의 스트림 처리 특징\n\nLambda 아키텍처\nKafka를 중심으로 배치 + 스트림 동시 처리\n배치 레이어: 정확한 결과\n스피드 레이어: 실시간 근사 결과",
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
    "answer": "멀티 테넌시 구현 방법\n토픽 네이밍 컨벤션\nACL 기반 접근 제어\nQuota 설정\n\nQuota 종류\nproducerbyterate: 초당 Producer 전송량 제한\nconsumerbyterate: 초당 Consumer 수신량 제한\nrequest_percentage: CPU 사용률 제한\n\n격리 수준\n방식   격리 수준   운영 복잡도\n\n네이밍 컨벤션   낮음   낮음\nACL + Quota   중간   중간\n별도 클러스터   높음   높음\n\n모범 사례\n테넌트별 전용 Consumer Group\n모니터링 대시보드 분리\n네트워크 격리 (VLAN/VPC)",
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
    "answer": "주요 모니터링 지표\n\nBroker 지표\nUnderReplicatedPartitions: 복제 지연 파티션 수 (0이어야 함)\nActiveControllerCount: 활성 컨트롤러 수 (클러스터당 1)\nOfflinePartitionsCount: 오프라인 파티션 수 (0이어야 함)\nRequestsPerSec: 초당 요청 수\nBytesInPerSec/BytesOutPerSec: 네트워크 처리량\n\nProducer 지표\nrecord-send-rate: 초당 전송 레코드 수\nrecord-error-rate: 전송 실패율\nrequest-latency-avg: 평균 요청 지연시간\n\nConsumer 지표\nrecords-lag-max: 최대 Consumer Lag\nrecords-consumed-rate: 초당 소비 레코드 수\ncommit-latency-avg: 오프셋 커밋 지연시간\n\n모니터링 도구\nJMX: Kafka 기본 메트릭 노출\nPrometheus + Grafana: 시계열 메트릭 수집 및 시각화\nKafka Manager/CMAK: 클러스터 관리 UI\nConfluent Control Center: 상용 모니터링 솔루션\nBurrow: Consumer Lag 전문 모니터링",
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
    "answer": "Rebalance 발생 조건\nConsumer 그룹에 새 Consumer 참여/이탈\nConsumer가 heartbeat 미전송 (세션 타임아웃)\n토픽 파티션 수 변경\n정규식 구독 토픽 변경\n\nRebalance 과정\nGroup Coordinator가 리밸런스 트리거\n모든 Consumer가 파티션 할당 해제 (Stop-the-World)\nConsumer Leader가 새 파티션 할당 계획 수립\n각 Consumer에 파티션 재할당\n소비 재개\n\n최적화 방법\nCooperative Rebalancing (증분 리밸런스)\n전체 중단 없이 점진적 재할당\nStatic Membership\nConsumer 재시작 시 즉시 파티션 복구\n세션 타임아웃 최적화\npoll() 처리 시간 단축\nmax.poll.records 조정\n처리 로직 최적화\n\nRebalance 관련 트레이드오프\nsession.timeout.ms 짧게: 빠른 장애 감지 vs 네트워크 지연으로 인한 불필요한 리밸런스\nsession.timeout.ms 길게: 안정적 vs 실제 장애 시 늦은 감지\nmax.poll.interval.ms: 긴 처리 허용 vs 느린 hang 감지\nStatic Membership: 리밸런스 감소 vs 실제 장애 Consumer 감지 지연\n\n실제 운영 팁\n배포 시 Consumer를 점진적으로 재시작하여 동시 리밸런스 방지\nKubernetes 환경에서는 PodDisruptionBudget과 함께 사용",
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
    "answer": "병목 진단 지표\nrecord-queue-time-avg: 배치 대기 시간\nrequest-latency-avg: 요청 응답 시간\nbuffer-available-bytes: 사용 가능 버퍼\n\n해결 전략\n배치 최적화\n압축 활성화\n병렬 처리 증가\n비동기 전송\n파티션 수 증가\n더 많은 브로커에 부하 분산\nACK 수준 조정 (내구성 트레이드오프 - 마지막 수단)\n\n하드웨어 개선\n네트워크 대역폭 확장\n브로커 디스크 I/O 개선 (SSD)\n브로커 수 증가\n\n병목 진단 권장 순서\n모니터링 지표로 병목 위치 파악 (Producer 버퍼? 브로커 I/O? 네트워크?)\n해당 영역의 설정 먼저 조정 (batch.size, linger.ms, compression 등)\n내구성 관련 설정(acks)은 데이터 손실 허용 가능한 경우에만 최후 수단으로 변경",
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
    "answer": "ZooKeeper의 역할\n클러스터 메타데이터 저장 (토픽, 파티션, 브로커 정보)\nController 선출\n브로커 상태 감지 (Ephemeral 노드)\nACL 및 설정 저장\n\nKRaft (Kafka Raft) 모드\nKafka 자체 내장 메타데이터 관리 (ZooKeeper 제거)\nRaft 합의 프로토콜 사용\nKafka 3.3부터 프로덕션 준비 완료 (KIP-833)\nKafka 3.5+에서 ZooKeeper에서 KRaft로 무중단 마이그레이션 지원\nKafka 4.0에서 ZooKeeper 모드 완전 제거 예정 (KIP-833)\n\n주요 차이점\n\n구분   ZooKeeper 모드   KRaft 모드\n\n의존성   ZooKeeper 클러스터 필요   Kafka만으로 운영\n메타데이터   ZooKeeper에 저장   내부 토픽에 저장\n확장성   파티션 수 제한 (수만 개)   수백만 파티션 가능\n운영   두 시스템 관리   단일 시스템\n복구   느린 컨트롤러 페일오버   빠른 복구\n\nKRaft 설정 예시\n\n마이그레이션: ZooKeeper → KRaft 무중단 전환 도구 제공",
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
    "answer": "압축 옵션 비교\n\n압축 방식   압축률   속도   CPU 사용량   권장 사용\n\ngzip   높음   느림   높음   네트워크 대역폭 제한\nsnappy   중간   빠름   낮음   일반적 사용\nlz4   중간   매우 빠름   낮음   고성능 권장\nzstd   높음   빠름   중간   균형 잡힌 선택\n\n설정 방법\n\n장단점 상세\n\ngzip\n장점: 최고 압축률, 범용 호환성\n단점: CPU 집약적, 지연시간 증가\n\nsnappy\n장점: 빠른 압축/해제, 낮은 CPU\n단점: 압축률 상대적으로 낮음\n\nlz4\n장점: 가장 빠른 속도, 매우 낮은 CPU\n단점: gzip보다 낮은 압축률\n권장: 대부분의 프로덕션 환경\n\nzstd\n장점: 높은 압축률 + 적절한 속도\n단점: 구버전 호환성 이슈",
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
    "answer": "에러 처리 전략\n재시도 (Retry)\nDead Letter Queue (DLQ)\n에러 토픽 분리\n재시도 가능 에러 → retry-topic\n영구 실패 → dlq-topic\nSkip/Ignore\n로깅 후 다음 메시지 처리\n중요도 낮은 데이터에 적용\n\nDLQ 구현 모범 사례\n원본 메시지 + 에러 정보 저장\n헤더에 원본 토픽, 파티션, 오프셋 포함\nDLQ 모니터링 및 알림 설정\n재처리 도구 준비\n\nSpring Kafka 예시",
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
    "answer": "브로커 추가 시 고려사항\n파티션 재분배\n점진적 확장\n한 번에 하나의 브로커 추가\n네트워크 및 디스크 I/O 모니터링\n재분배 스로틀링 적용\n스로틀 설정\n\n파티션 수 증가\n운영 중 파티션 추가 가능 (감소 불가)\n함정 주의: 키 기반 파티셔닝 시 파티션 추가하면 동일 키가 다른 파티션으로 라우팅됨\n기존 데이터는 이전 파티션에, 새 데이터는 새 파티션에 저장\n키별 순서 보장이 필요한 경우 파티션 추가 전 신중히 검토\n\n모범 사례\n충분한 초기 파티션 수 계획 (예상 최대 처리량의 2배 이상)\nauto.create.topics.enable=false 권장 (의도치 않은 토픽 생성 방지)\nRack-awareness 설정으로 장애 도메인 분리 (broker.rack)\nLeader 재분배 자동화 (auto.leader.rebalance.enable=true)\n\n확장 전 체크리스트\n[ ] 디스크 용량 계획\n[ ] 네트워크 대역폭 확인\n[ ] ZooKeeper/KRaft 부하 검토\n[ ] 클라이언트 연결 수 확인",
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
    "answer": "KRaft 전환 전 확인사항\nKafka 버전 3.3 이상 (프로덕션 권장 3.5+ 마이그레이션, 3.6+ 신규 클러스터)\n모든 클라이언트 호환성 확인 (특히 AdminClient 버전)\n현재 ZooKeeper 클러스터 상태 정상 확인\n일부 기능은 KRaft에서 아직 미지원될 수 있으므로 사용 중인 기능 확인 필요\n\n마이그레이션 절차\n메타데이터 스냅샷 생성\nKRaft Controller 구성\n점진적 전환\n브로커를 하나씩 KRaft 모드로 재시작\nController 쿼럼 구성\n마지막으로 ZooKeeper 연결 해제\n\n고려사항\n롤백 계획: 전환 전 백업 필수\n다운타임: 무중단 전환 도구 제공되나 테스트 필요\n기능 차이: 일부 기능은 KRaft에서 다르게 동작\n모니터링: 새로운 KRaft 관련 메트릭 추가\n\nKRaft 장점\n운영 단순화 (ZooKeeper 제거)\n빠른 컨트롤러 페일오버\n향상된 확장성 (수백만 파티션)\n\n주의사항\n기존 ACL, Config 마이그레이션 확인\n클라이언트 라이브러리 버전 호환성\n프로덕션 전 충분한 테스트",
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
    "answer": "Producer 지연 최소화\n\nConsumer 지연 최소화\n\nBroker 튜닝\n\n인프라 최적화\nSSD 스토리지 사용\nProducer/Broker 네트워크 근접 배치\n낮은 레이턴시 네트워크 (10Gbps+)\n\n파티션 전략\n파티션 수 적정 유지 (과도한 파티션은 오버헤드)\n리더 균등 분배\n\n모니터링 지표\nproduce-throttle-time: Producer 스로틀링\nfetch-latency-avg: Consumer fetch 지연\nrequest-latency-avg: 전체 요청 지연\n\n트레이드오프 요약\n목표   희생되는 것   주요 설정\n\n낮은 지연   처리량, 내구성   linger.ms=0, acks=1\n높은 처리량   지연시간   linger.ms=50+, batch.size 증가\n높은 내구성   지연시간, 처리량   acks=all, min.insync.replicas=2\n\n실제 운영 팁\n지연시간 요구사항을 먼저 정의 (P99 < 10ms? 100ms?)\n요구사항 달성 후 처리량 최적화\n내구성은 데이터 중요도에 따라 결정",
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
    "answer": "동기 전송 (Sync)\n\n장점\n전송 성공/실패 즉시 확인\n순서 보장 용이\n에러 처리 직관적\n\n단점\n낮은 처리량 (매 전송마다 대기)\n네트워크 지연에 민감\n\n비동기 전송 (Async)\n\n장점\n높은 처리량 (병렬 전송)\n논블로킹으로 리소스 효율적\n배치 최적화 활용 가능\n\n단점\n에러 처리 복잡\n메모리 관리 필요 (버퍼 초과 시)\n순서 보장 어려움\n\n선택 기준\n상황   권장 방식\n\n고처리량 필요   Async\n엄격한 순서 보장   Sync\n실시간 에러 처리   Sync\n대량 데이터 전송   Async + Callback",
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
    "answer": "주요 장애 유형 및 대응\n브로커 장애\n증상: UnderReplicatedPartitions 증가\n대응:\nISR에서 자동 리더 선출 확인\n브로커 복구 또는 대체 브로커 투입\nmin.insync.replicas 설정 확인\n디스크 장애\n증상: 로그 쓰기 실패, 브로커 비정상\n대응:\nJBOD 구성 시 해당 디스크만 격리\n파티션 재분배로 데이터 복구\n디스크 교체 후 브로커 재시작\n네트워크 파티션\n증상: 브로커 간 통신 실패, ISR 축소\n대응:\n네트워크 장비 점검\nunclean.leader.election.enable=false 유지\n분할 복구 후 데이터 정합성 확인\nZooKeeper/Controller 장애\n증상: 메타데이터 업데이트 불가\n대응:\nZooKeeper 앙상블 복구\nController 재선출 대기\nKRaft 전환 고려\nConsumer Lag 급증\n원인: 처리 병목, 파티션 불균형\n대응:\nConsumer 스케일 아웃\n파티션 재분배\n처리 로직 최적화\n\n장애 대비 체크리스트\n[ ] 복제 계수 3 이상\n[ ] 다중 AZ/랙 분산\n[ ] 모니터링/알림 설정\n[ ] 정기 DR 훈련",
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
    "answer": "Consumer Lag 개념\n마지막 생산된 Offset과 마지막 소비된 Offset의 차이\nLag이 증가하면 Consumer가 Producer를 따라잡지 못함\n\n모니터링 방법\nkafka-consumer-groups 명령\nJMX 메트릭\nrecords-lag-max: 최대 Lag\nrecords-lag: 파티션별 Lag\n모니터링 도구\nBurrow (LinkedIn 오픈소스)\nPrometheus + kafka_exporter\nConfluent Control Center\n\nLag 해결 전략\nConsumer 확장\n처리 최적화\n병렬 처리\n파티션 증가\n병렬 처리 단위 확대\nConsumer 추가 여유 확보\n일시적 해결 (주의 필요)\nConsumer Group 리셋 (건너뛴 메시지는 처리되지 않으므로 데이터 손실 가능)\nauto.offset.reset=latest로 재시작\n\n알림 설정 권장값\nWarning: Lag > 10,000 또는 지속적 증가 추세\nCritical: Lag > 100,000 또는 처리량 대비 Lag 증가율이 높을 때\n\nLag 모니터링 함정 주의\nLag 절대값보다 추세가 더 중요 (Lag이 높아도 감소 추세면 괜찮음)\n배포/재시작 직후 일시적 Lag 증가는 정상\n파티션별 Lag을 확인하여 특정 파티션 병목 식별 필요\n\n근본 원인 해결\n단순 Consumer 추가보다 처리 로직 최적화가 효과적인 경우도 많음\n외부 시스템(DB, API) 호출이 병목일 수 있음",
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
    "answer": "일관성 보장 메커니즘\n복제와 ISR\n최소 ISR 수 만족 시에만 쓰기 허용\nLeader 장애 시 최신 데이터를 가진 복제본이 승격\nProducer ACK 설정\n트랜잭션\nConsumer 격리 수준\n순서 보장\n단일 파티션 내 순서 보장\n키 기반 파티셔닝으로 관련 메시지 동일 파티션\n\n일관성 vs 가용성 트레이드오프 (CAP 정리 관점)\n\nKafka는 네트워크 파티션(P) 발생 시 일관성(C)과 가용성(A) 사이에서 선택해야 합니다.\n\n설정   일관성   가용성   선택 권장 상황\n\nacks=all, min.insync.replicas=2   높음   중간   금융, 주문 등 데이터 손실 불가\nacks=1   중간   높음   일반 애플리케이션\nunclean.leader.election=true   낮음   높음   가용성이 데이터 일관성보다 중요한 경우\n\n실제 운영에서의 고려사항\n모든 설정을 최고 수준(acks=all, ISR=2, RF=3)으로 하면 비용과 지연시간 증가\n데이터 중요도에 따라 토픽별로 다른 설정 적용 가능\n장애 시나리오별 영향 분석 후 결정",
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
    "answer": "배치 관련 설정\n\n성능 영향\n\nbatch.size 증가\n장점: 네트워크 오버헤드 감소, 높은 처리량\n단점: 메모리 사용량 증가, 첫 메시지 지연\n권장: 64KB ~ 256KB\n\nlinger.ms 증가\n장점: 배치 채움률 향상, 압축 효율 증가\n단점: 지연 시간 증가\n권장: 5ms ~ 100ms (처리량 중시)\n\n조합 예시\n\n시나리오   batch.size   linger.ms   효과\n\n저지연   16KB   0   즉시 전송\n고처리량   128KB   50ms   배치 최적화\n균형   64KB   10ms   적절한 균형\n\n압축과의 연계\n큰 배치 + 압축 = 높은 네트워크 효율\n\n모니터링 지표\nbatch-size-avg: 평균 배치 크기\nrecord-queue-time-avg: 배치 대기 시간\ncompression-rate-avg: 압축률",
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
    "answer": "자동 커밋 (Auto Commit)\n\n장점\n구현 간단\n개발자 관리 부담 없음\n\n단점\n메시지 손실 위험 (처리 전 커밋)\n중복 처리 가능 (커밋 후 처리 실패)\n\n수동 커밋 (Manual Commit)\n\n동기 커밋\n\n비동기 커밋\n\n혼합 전략 (권장)\n\n커밋 전략 비교\n전략   메시지 손실   중복 처리   성능\n\n자동 커밋   가능   가능   높음\n처리 후 커밋   없음   가능   중간\n커밋 후 처리   가능   없음   중간\n\n운영 환경 권장사항\nat-least-once 보장 (대부분의 경우): 처리 완료 후 커밋 + Consumer 측 멱등성 처리\nat-most-once 보장 (드문 경우): 커밋 후 처리. 중복보다 손실이 나은 경우에만\nexactly-once 보장: Kafka Transactions 사용 또는 Kafka Streams의 exactlyoncev2\n\n함정 주의: 자동 커밋은 poll() 호출 시 이전 poll()의 오프셋을 커밋함. 따라서 poll() 직후 장애 시 아직 처리되지 않은 메시지의 오프셋이 커밋될 수 있음",
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
    "answer": "DLQ 구현 패턴\n기본 DLQ 구현\n재시도 토픽 + DLQ 패턴\nSpring Kafka 활용\n\nDLQ 운영 모범 사례\nDLQ 토픽 별도 모니터링 및 알림 (DLQ에 메시지가 쌓이면 즉시 인지)\n메시지 원본 정보 보존 (헤더에 원본 토픽, 오프셋, 에러 메시지, 타임스탬프 포함)\nDLQ 메시지 재처리 도구 준비 (수동 재처리, 자동 재시도 등)\nDLQ 보존 기간 충분히 설정 (원본 토픽보다 길게)\n\nDLQ vs 재시도 토픽 트레이드오프\n재시도 토픽 사용: 자동 복구 가능, 하지만 무한 재시도로 리소스 낭비 가능\nDLQ 직행: 수동 개입 필요, 하지만 일시적 오류도 DLQ로 이동\n권장: 제한된 횟수 재시도 후 DLQ로 이동 (예: 3회 재시도 후 DLQ)\n\n함정 주의: DLQ 메시지 재처리 시 순서가 보장되지 않음. 순서가 중요한 경우 별도 처리 필요",
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
    "answer": "Schema Registry 역할\n메시지 스키마(Avro, Protobuf, JSON Schema)를 중앙 저장소에서 관리\nProducer/Consumer 간 스키마 호환성 보장\n스키마 버전 관리 및 진화 지원\n\n필요성\n데이터 계약: Producer/Consumer 간 명확한 데이터 형식 정의\n호환성 검증: 스키마 변경 시 하위/상위 호환성 자동 검증\n효율적 직렬화: 스키마 ID만 전송하여 페이로드 크기 감소\n스키마 진화: 필드 추가/삭제 시 기존 Consumer 영향 최소화\n\n호환성 모드\n모드   설명   허용되는 변경\n\nBACKWARD   새 스키마로 이전 데이터 읽기 가능   필드 삭제, default 있는 필드 추가\nFORWARD   이전 스키마로 새 데이터 읽기 가능   필드 추가, default 있는 필드 삭제\nFULL   양방향 호환   default 있는 필드 추가/삭제만 가능\nNONE   호환성 검사 없음   모든 변경 가능 (위험)\n\n트레이드오프\nBACKWARD (기본값, 권장): Consumer를 먼저 업데이트해야 함, 안전한 배포\nFORWARD: Producer를 먼저 업데이트해야 함\nFULL: 가장 안전하지만 변경 제약이 큼\nNONE: 유연하지만 런타임 오류 위험\n\n사용 예시 (Avro)\n\n모범 사례\nBACKWARD 또는 FULL 호환성 사용\n필드 삭제 시 default 값 설정\nCI/CD에서 스키마 호환성 테스트",
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
    "answer": "연동 방식\nKafka Connect 활용\nConsumer 직접 구현\n\n고려사항\n일관성\n트랜잭션 미지원 NoSQL: 멱등성 설계 필수\n중복 메시지 처리 로직 (upsert 활용)\n성능\n배치 쓰기로 처리량 향상\n인덱스 설계 최적화\n백프레셔 처리\n스키마 관리\nSchema Registry로 데이터 형식 관리\nNoSQL 유연한 스키마와의 조화\n에러 처리\n재시도 로직 구현\nDLQ 활용\n커넥션 풀 관리\n확장성\n파티션 수와 Consumer 병렬성\nNoSQL 샤딩 전략과 조화\n\n데이터베이스별 권장 Connector\nMongoDB: MongoDB Kafka Connector\nCassandra: DataStax Connector\nElasticsearch: Confluent Elasticsearch Sink\nRedis: Redis Sink Connector",
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
    "answer": "State Store 개념\nKafka Streams에서 상태가 필요한 연산(집계, 조인 등)을 위한 로컬 저장소\n기본적으로 RocksDB 사용 (in-memory 옵션도 가능)\n\nState Store 유형\nKeyValueStore: 키-값 저장\nWindowStore: 시간 윈도우별 키-값 저장\nSessionStore: 세션 기반 키-값 저장\n\n내부 동작 방식\n\nChangelog Topic\nState Store 변경사항을 Kafka 토픽에 기록\n장애 복구 시 상태 재구축에 사용\n자동 생성됨 (application.id-storename-changelog)\n\n설정 예시\n\n관리 방법\n\n상태 복구\nChangelog 토픽에서 상태 재구축\nStandby 복제본이 있으면 빠른 복구\n\n모범 사례\n충분한 로컬 디스크 공간 확보\nStandby 복제본 설정으로 복구 시간 단축\nState Store 크기 모니터링",
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
    "answer": "이벤트 기반 마이크로서비스 패턴\n이벤트 소싱 (Event Sourcing)\n모든 상태 변경을 이벤트로 저장\n이벤트 재생으로 상태 복원 가능\nCQRS (Command Query Responsibility Segregation)\n쓰기와 읽기 모델 분리\n읽기 최적화된 뷰 구성\nSaga 패턴 (분산 트랜잭션)\n보상 트랜잭션으로 일관성 유지\n\n토픽 설계\n\n구현 예시\n\n모범 사례\n이벤트 스키마 버전 관리 (Schema Registry 활용)\n멱등성 처리 필수 (동일 이벤트 재처리해도 결과 동일)\n서비스별 Consumer Group 분리\n이벤트 순서 의존성 최소화 설계\n\n마이크로서비스에서의 Kafka 트레이드오프\n이벤트 기반: 느슨한 결합, 확장성 우수 vs 디버깅 어려움, 최종 일관성만 보장\n동기 API 호출: 단순함, 강한 일관성 vs 높은 결합도, 장애 전파\nSaga 패턴: 분산 트랜잭션 대안 vs 구현 복잡도 증가\n\n실제 운영 고려사항\n이벤트 재처리로 인한 부작용 방지 (멱등한 핸들러 설계)\n서비스 간 이벤트 스키마 계약 관리\n장애 시 보상 트랜잭션 설계",
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
    "answer": "브로커 추가 절차\n새 브로커 설정\n브로커 시작\n파티션 재분배 (선택)\n\n고려 요소\n하드웨어 일관성\n기존 브로커와 동일한 사양 권장\n디스크 용량, 네트워크 대역폭 확인\n네트워크 구성\n기존 브로커와 동일 네트워크 세그먼트\n방화벽 규칙 확인 (9092, 9093 포트)\n파티션 재분배\n자동 분배되지 않음 (수동 재분배 필요)\n스로틀링으로 성능 영향 최소화\n피크 시간 외 수행\nRack Awareness\n장애 도메인 분산\n모니터링\n새 브로커 메트릭 수집 확인\n리더 분배 균형 확인\nUnder-replicated 파티션 없음 확인",
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
    "answer": "커넥터 유형\nSource Connector: 외부 시스템 → Kafka\nSink Connector: Kafka → 외부 시스템\n\nSource Connector 개발\n\nSink Connector 개발\n\n커스터마이징 포인트\n변환 (SMT - Single Message Transform)\n에러 처리\n\n배포",
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
    "answer": "브로커 핵심 지표\n\n지표   설명   임계값\n\nUnderReplicatedPartitions   복제 지연 파티션   > 0 경고\nOfflinePartitionsCount   오프라인 파티션   > 0 위험\nActiveControllerCount   활성 컨트롤러   != 1 위험\nRequestsPerSec   요청 처리량   용량 대비\nNetworkProcessorAvgIdlePercent   네트워크 스레드 유휴율   < 30% 경고\nRequestHandlerAvgIdlePercent   요청 핸들러 유휴율   < 30% 경고\n\nProducer 지표\n지표   설명   임계값\n\nrecord-error-rate   전송 실패율   > 0 경고\nrecord-send-rate   전송 처리량   모니터링\nrequest-latency-avg   평균 지연시간   > 100ms 경고\n\nConsumer 지표\n지표   설명   임계값\n\nrecords-lag-max   최대 Consumer Lag   증가 추세 경고\nfetch-rate   소비 처리량   모니터링\ncommit-latency-avg   커밋 지연시간   > 50ms 경고\n\n시스템 지표\nCPU 사용률 (< 70%)\n메모리 사용률\n디스크 사용률 (< 80%)\n네트워크 I/O\n\n알림 설정 예시 (Prometheus)",
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
