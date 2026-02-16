const csData = [
  {
    "id": "ARCH-001",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "CPU의 구조와 주요 구성 요소(ALU, 제어 유닛, 레지스터)에 대해 설명해주세요.",
    "answer": "CPU는 컴퓨터의 두뇌로서 세 가지 핵심 구성 요소로 이루어져 있습니다.\n\nALU (Arithmetic Logic Unit)\n산술 연산(덧셈, 뺄셈 등)과 논리 연산(AND, OR, NOT 등)을 수행\n비교 연산을 통해 조건 분기 결정에 필요한 플래그 생성\n\n제어 유닛 (Control Unit)\n명령어를 해독하고 실행 순서를 제어\n다른 구성 요소들에 제어 신호를 전송하여 동작을 조정\n\n레지스터 (Register)\nCPU 내부의 초고속 임시 저장 공간\n프로그램 카운터(PC), 명령어 레지스터(IR), 범용 레지스터 등으로 구분\n메모리보다 수십 배 빠른 접근 속도 제공",
    "references": [
      {
        "title": "Intel 64 and IA-32 Architectures Software Developer's Manual",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-002",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "CPU가 하나의 명령어를 처리하는 명령어 사이클(Instruction Cycle)의 단계(Fetch, Decode, Execute)에 대해 설명해주세요.",
    "answer": "명령어 사이클은 CPU가 하나의 명령어를 처리하는 과정입니다.\n\nFetch (인출)\n프로그램 카운터(PC)가 가리키는 메모리 주소에서 명령어를 가져옴\n명령어를 명령어 레지스터(IR)에 저장\nPC를 다음 명령어 주소로 증가\n\nDecode (해독)\n명령어 레지스터의 명령어를 해석\n연산 종류, 피연산자, 주소 지정 방식 등을 파악\n필요한 데이터를 레지스터나 메모리에서 준비\n\nExecute (실행)\nALU에서 실제 연산 수행\n결과를 레지스터나 메모리에 저장\n필요시 플래그 레지스터 갱신",
    "references": [
      {
        "title": "Intel 64 and IA-32 Architectures Software Developer's Manual, Vol.1",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-003",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "CPU 파이프라이닝(Pipelining)이 무엇이고, 어떻게 CPU 성능을 향상시키나요?",
    "answer": "파이프라이닝은 명령어 처리 단계를 중첩시켜 동시에 여러 명령어를 처리하는 기법입니다.\n\n동작 원리\n각 명령어 사이클 단계(Fetch, Decode, Execute 등)를 독립적인 스테이지로 분리\n한 명령어가 다음 단계로 넘어가면, 이전 단계에서 새 명령어 처리 시작\n세탁기-건조기를 동시에 돌리는 것과 유사\n\n성능 향상\n이상적으로 n단계 파이프라인은 n배 처리량(throughput) 증가\n단일 명령어 지연 시간(latency)은 동일하지만, 전체 처리량 향상\n현대 CPU는 14-20단계 이상의 파이프라인 사용\n\n한계와 트레이드오프\n파이프라인 해저드로 인한 스톨(stall) 발생 가능\n분기 명령어에서 파이프라인 플러시 발생 가능\n깊은 파이프라인의 트레이드오프:\n장점: 클럭 속도 향상 가능 (각 스테이지 단순화)\n단점: 분기 실패 시 페널티 증가, 전력 소모 증가\nIntel Pentium 4는 31단계까지 확장했으나, 분기 페널티와 전력 문제로 현대 CPU는 14-20단계로 회귀",
    "references": [
      {
        "title": "Intel Optimization Reference Manual",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-004",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "CPU 파이프라인 해저드(Pipeline Hazard)의 종류와 해결 방법에 대해 설명해주세요.",
    "answer": "파이프라인 해저드는 파이프라인의 정상적인 실행을 방해하는 상황입니다.\n\n구조적 해저드 (Structural Hazard)\n하드웨어 자원 충돌 (예: 메모리 동시 접근)\n해결: 자원 복제, 분리된 명령어/데이터 캐시 사용\n\n데이터 해저드 (Data Hazard)\n명령어 간 데이터 의존성 (RAW, WAR, WAW)\n해결: 포워딩(Forwarding), 스톨 삽입, 레지스터 리네이밍\n\n제어 해저드 (Control Hazard)\n분기 명령어로 인한 다음 명령어 불확실성\n해결: 분기 예측, 지연 분기, 투기적 실행",
    "references": [
      {
        "title": "ARM Cortex-A Series Programmer's Guide",
        "url": "https://developer.arm.com/documentation"
      }
    ]
  },
  {
    "id": "ARCH-005",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "CPU의 분기 예측(Branch Prediction)이 무엇이고 왜 중요한가요?",
    "answer": "분기 예측은 조건 분기 명령어의 결과를 미리 예측하여 파이프라인 효율을 높이는 기법입니다.\n\n중요성\n분기 결과를 기다리면 파이프라인이 멈춤 (스톨)\n현대 CPU는 깊은 파이프라인으로 분기 패널티가 큼 (10-20 사이클)\n예측 실패 시 파이프라인 플러시 필요\n\n분기 예측 기법\n정적 예측: 항상 분기/비분기 예측, 또는 backward taken/forward not taken\n동적 예측: 과거 분기 이력 기반 (2-bit 카운터, 히스토리 테이블)\n현대 기법: 신경망 기반 예측기, TAGE 예측기 등\n\n성능 영향\n현대 CPU의 분기 예측 정확도: 95% 이상\n루프 최적화, 분기 없는 코드 작성으로 예측 실패 최소화 가능",
    "references": [
      {
        "title": "Intel Optimization Reference Manual - Branch Prediction",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-006",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "CPU의 Out-of-Order Execution(비순차 실행)이 무엇이고, 어떤 이점이 있나요?",
    "answer": "Out-of-Order Execution(OoOE)은 명령어를 프로그램 순서와 다르게 실행하여 성능을 높이는 기법입니다.\n\n동작 원리\n명령어를 디코딩 후 리오더 버퍼(ROB)에 저장\n피연산자가 준비된 명령어부터 실행 (데이터 흐름 순서)\n결과는 프로그램 순서대로 커밋하여 정확성 보장\n\n이점\n캐시 미스나 데이터 의존성으로 대기 중에도 다른 명령어 실행\n파이프라인 유휴 시간 최소화\nIPC(Instructions Per Cycle) 향상\n\n관련 기술\n레지스터 리네이밍: WAR, WAW 해저드 제거\n투기적 실행(Speculative Execution): 분기 결과 전에 실행 시작\n리오더 버퍼(ROB): 순서대로 커밋 보장\n\n보안 관련 함정 (Spectre/Meltdown)\n투기적 실행은 보안 취약점의 원인이 됨\nSpectre: 분기 예측 오류 시 사이드 채널로 정보 유출\n하드웨어/소프트웨어 완화 조치로 성능 저하 (5-30%)\n면접 포인트: OoOE의 성능 이점과 보안 트레이드오프 설명 필요",
    "references": [
      {
        "title": "Intel 64 Architecture - Out-of-Order Execution",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-007",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "CISC와 RISC 아키텍처의 차이점에 대해 설명해주세요.",
    "answer": "CISC와 RISC는 CPU 명령어 집합 설계 철학의 두 가지 접근 방식입니다.\n\nCISC (Complex Instruction Set Computer)\n복잡하고 다양한 명령어 제공\n하나의 명령어로 여러 작업 수행 가능\n가변 길이 명령어\n메모리-레지스터 연산 지원\n예: x86, x86-64\n\nRISC (Reduced Instruction Set Computer)\n단순하고 적은 수의 명령어\n각 명령어가 한 사이클에 실행되도록 설계\n고정 길이 명령어\n로드/스토어 아키텍처 (메모리 접근은 전용 명령어만)\n예: ARM, RISC-V, MIPS\n\n현대적 관점 - CISC vs RISC는 함정 질문\n현대 x86 CPU는 내부적으로 RISC 마이크로 연산(micro-ops)으로 변환\n두 방식의 장점을 결합한 하이브리드 설계가 일반적\n실무적 관점: 순수한 CISC/RISC 구분은 더 이상 의미 없음\nARM도 복잡한 명령어 추가 (NEON, SVE)\nx86도 내부적으로 RISC-like 실행\n진정한 차이점은 ISA(명령어 집합)의 철학과 생태계\n선택 기준: 성능보다는 소프트웨어 호환성, 전력 효율, 라이선스 모델이 더 중요",
    "references": [
      {
        "title": "ARM Architecture Reference Manual",
        "url": "https://developer.arm.com/documentation"
      }
    ]
  },
  {
    "id": "ARCH-008",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "x86 아키텍처와 ARM 아키텍처의 차이점은 무엇인가요?",
    "answer": "x86과 ARM은 각각 대표적인 CISC와 RISC 아키텍처입니다.\n\nx86 (Intel/AMD)\nCISC 기반, 복잡한 명령어 세트\n높은 단일 스레드 성능\n전력 소모가 상대적으로 높음\n데스크톱, 서버 시장 주도\n후방 호환성 중시\n\nARM\nRISC 기반, 단순한 명령어 세트\n전력 효율성이 뛰어남 (와트당 성능 우수)\n모바일, 임베디드 시장 주도\n최근 서버/데스크톱 진출 (Apple M시리즈, AWS Graviton)\n라이선스 모델로 다양한 구현 가능\n\n성능 비교와 선택 기준\nx86: 고성능 컴퓨팅, 레거시 애플리케이션, 소프트웨어 호환성 중시\nARM: 모바일, IoT, 전력 효율 중요한 서버\n\n실제 선택 시 고려사항\n요소   x86 유리   ARM 유리\n\n소프트웨어 호환성   레거시 Windows/Linux 앱   컨테이너화된 워크로드\n전력 비용   -   데이터센터 규모 운영\n단일 스레드 성능   일부 HPC 워크로드   Apple M 시리즈 (데스크톱)\n비용   -   AWS Graviton 등 클라우드\n개발 생태계   성숙한 도구 체인   빠르게 성장 중",
    "references": [
      {
        "title": "ARM Developer Documentation",
        "url": "https://developer.arm.com/documentation"
      },
      {
        "title": "Intel Architecture Documentation",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-009",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "메모리 계층 구조(Memory Hierarchy)에 대해 설명해주세요.",
    "answer": "메모리 계층 구조는 속도, 용량, 비용의 트레이드오프를 최적화하기 위한 설계입니다.\n\n계층 구조 (위에서 아래로)\n레지스터: CPU 내부, 가장 빠름, 수십 개\nL1 캐시: 코어당 32-64KB, 1-4 사이클\nL2 캐시: 코어당 256KB-1MB, 10-20 사이클\nL3 캐시: 공유, 수 MB-수십 MB, 30-50 사이클\n메인 메모리 (RAM): GB 단위, 100-300 사이클\n보조 기억장치 (SSD/HDD): TB 단위, 수만-수백만 사이클\n\n설계 원칙\n상위 계층: 빠르지만 작고 비쌈\n하위 계층: 느리지만 크고 저렴\n지역성(locality) 원리를 활용하여 효율적인 데이터 접근",
    "references": [
      {
        "title": "Intel Optimization Manual - Memory Hierarchy",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-010",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "레지스터, 캐시, 메인 메모리, 보조 기억장치의 속도와 용량을 비교해주세요.",
    "answer": "구분   용량   접근 시간   대역폭   비고\n\n레지스터   ~1KB   <1ns (0 사이클)   -   CPU 내부\nL1 캐시   32-64KB   ~1ns (4-5 사이클)   ~1TB/s   코어당\nL2 캐시   256KB-2MB   ~3-10ns (12-20 사이클)   ~500GB/s   코어당\nL3 캐시   4-128MB   ~10-30ns (30-50 사이클)   ~200GB/s   공유\nRAM (DDR5)   16-256GB+   ~70-100ns   ~50-80GB/s (채널당)   시스템\nNVMe SSD   1-8TB+   ~10-100us   최대 14GB/s (PCIe 5.0)   영구 저장\nHDD   1-20TB+   ~5-10ms   ~200MB/s   순차 읽기\n\n핵심 포인트\n각 계층 간 속도 차이는 약 10배 이상\n레지스터에서 HDD까지 속도 차이는 약 100만 배\n용량은 반대로 상위에서 하위로 갈수록 증가",
    "references": [
      {
        "title": "Intel Memory Latency Checker",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/tool/intelr-memory-latency-checker.html"
      }
    ]
  },
  {
    "id": "ARCH-011",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "캐시 메모리가 왜 필요하고, 어떤 원리로 동작하나요?",
    "answer": "캐시 메모리는 CPU와 메인 메모리 간의 속도 차이를 해소하기 위해 필요합니다.\n\n필요성\nCPU는 매 사이클마다 데이터가 필요하지만, RAM 접근은 100사이클 이상 소요\n속도 격차(Memory Wall) 해소를 위한 중간 버퍼 역할\n자주 사용하는 데이터를 빠르게 접근 가능한 곳에 저장\n\n동작 원리\nCPU가 데이터 요청\n캐시에서 먼저 검색 (캐시 히트 시 바로 반환)\n캐시 미스 시 메인 메모리에서 가져와 캐시에 저장\n캐시 라인 단위(64바이트)로 데이터 이동\n\n효율성의 핵심\n지역성(Locality) 원리 활용\n히트율 90% 이상 달성 시 평균 접근 시간 크게 감소",
    "references": [
      {
        "title": "Intel 64 and IA-32 Architectures Optimization Reference Manual",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-012",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "캐시 메모리에서 활용하는 지역성(Locality) 원리에 대해 설명해주세요.",
    "answer": "지역성 원리는 프로그램이 특정 시간에 특정 메모리 영역에 집중적으로 접근하는 경향입니다.\n\n시간 지역성 (Temporal Locality)\n최근 접근한 데이터는 다시 접근할 가능성이 높음\n예: 루프 변수, 자주 호출되는 함수\n\n공간 지역성 (Spatial Locality)\n접근한 데이터 주변의 데이터도 곧 접근할 가능성이 높음\n예: 배열 순차 접근, 구조체 멤버 접근\n\n캐시 설계에의 적용\n시간 지역성: 최근 사용 데이터를 캐시에 유지 (LRU 교체 정책)\n공간 지역성: 캐시 라인 단위(64바이트)로 데이터 로드\n\n프로그래밍 시 활용\n배열을 행 우선 순서로 접근\n관련 데이터를 메모리상 가깝게 배치\n루프 내 데이터 재사용 극대화",
    "references": [
      {
        "title": "Intel Optimization Manual - Data Access Optimization",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-013",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "시간 지역성(Temporal Locality)과 공간 지역성(Spatial Locality)의 차이는 무엇인가요?",
    "answer": "시간 지역성 (Temporal Locality)\n정의: 한 번 접근한 데이터는 가까운 미래에 다시 접근할 가능성이 높음\n예시:\n루프 카운터 변수 i\n자주 호출되는 함수의 코드\n전역 설정 변수\n캐시 활용: 최근 사용 데이터를 캐시에 유지\n\n공간 지역성 (Spatial Locality)\n정의: 접근한 메모리 주소 근처의 데이터도 곧 접근할 가능성이 높음\n예시:\n배열 순차 순회: arr[0], arr[1], arr[2]...\n구조체 멤버 연속 접근\n순차적 명령어 실행\n캐시 활용: 캐시 라인 단위로 인접 데이터 함께 로드\n\n비교\n구분   시간 지역성   공간 지역성\n\n관점   시간적 재사용   공간적 인접성\n캐시 정책   교체 알고리즘 (LRU)   캐시 라인 크기",
    "references": [
      {
        "title": "ARM Cortex-A Programmer's Guide - Cache",
        "url": "https://developer.arm.com/documentation"
      }
    ]
  },
  {
    "id": "ARCH-014",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "캐시 라인(Cache Line)이 무엇이고, 크기가 성능에 어떤 영향을 미치나요?",
    "answer": "캐시 라인은 캐시와 메인 메모리 간 데이터 전송의 최소 단위입니다.\n\n캐시 라인 특성\n일반적인 크기: 64바이트 (x86, ARM)\n메모리 주소는 캐시 라인 경계에 정렬\n1바이트만 필요해도 전체 캐시 라인 로드\n\n크기가 성능에 미치는 영향\n\n큰 캐시 라인\n장점: 공간 지역성 활용 극대화, 순차 접근에 유리\n단점: 메모리 대역폭 낭비 (불필요한 데이터 로드), False Sharing 증가\n\n작은 캐시 라인\n장점: 메모리 대역폭 효율적 사용\n단점: 공간 지역성 활용 감소, 태그 오버헤드 증가\n\n프로그래밍 고려사항\n자주 함께 사용하는 데이터는 같은 캐시 라인에 배치\n멀티스레드에서 독립 데이터는 다른 캐시 라인에 배치 (False Sharing 방지)",
    "references": [
      {
        "title": "Intel 64 and IA-32 Architectures Optimization Reference Manual",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-015",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "캐시 히트(Cache Hit)와 캐시 미스(Cache Miss)에 대해 설명해주세요.",
    "answer": "캐시 히트 (Cache Hit)\nCPU가 요청한 데이터가 캐시에 존재하는 경우\n빠른 응답 (L1: 1-4 사이클)\n히트율 = 히트 횟수 / 전체 접근 횟수\n\n캐시 미스 (Cache Miss)\n요청한 데이터가 캐시에 없는 경우\n하위 메모리 계층에서 데이터를 가져와야 함\n성능 저하 원인\n\n캐시 미스의 종류 (3C)\nCompulsory Miss (필수 미스): 최초 접근 시 발생, 피할 수 없음\nCapacity Miss (용량 미스): 캐시 용량 부족으로 발생\nConflict Miss (충돌 미스): 같은 캐시 세트에 매핑되어 발생\n\n평균 메모리 접근 시간",
    "references": [
      {
        "title": "Intel Optimization Manual - Cache Optimization",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-016",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "캐시 매핑 방식(Direct Mapped, Fully Associative, Set Associative)의 차이점을 설명해주세요.",
    "answer": "캐시 매핑 방식은 메모리 주소를 캐시 위치에 대응시키는 방법입니다.\n\nDirect Mapped (직접 매핑)\n각 메모리 블록이 하나의 캐시 라인에만 매핑\n장점: 하드웨어 구현 단순, 빠른 검색\n단점: 충돌 미스 빈번 발생\n\nFully Associative (완전 연관)\n메모리 블록이 어떤 캐시 라인에도 저장 가능\n장점: 충돌 미스 최소화\n단점: 모든 라인 검색 필요, 하드웨어 복잡\n\nSet Associative (세트 연관)\nn-way: 캐시를 세트로 나누고, 각 세트 내 n개 라인 중 선택\nDirect Mapped와 Fully Associative의 절충안\n현대 CPU에서 가장 많이 사용 (8-way, 16-way 등)\n\n방식   검색 복잡도   충돌 미스   사용 예\n\nDirect   O(1)   많음   초기 캐시\nFully   O(n)   적음   TLB\nSet Assoc   O(k)   중간   L1, L2, L3",
    "references": [
      {
        "title": "ARM Cache Organization",
        "url": "https://developer.arm.com/documentation"
      }
    ]
  },
  {
    "id": "ARCH-017",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "캐시 교체 정책(LRU, LFU, FIFO 등)에 대해 설명해주세요.",
    "answer": "캐시가 가득 찼을 때 어떤 데이터를 제거할지 결정하는 정책입니다.\n\nLRU (Least Recently Used)\n가장 오래전에 사용된 데이터를 교체\n시간 지역성 활용에 효과적\n구현 복잡도가 높아 의사 LRU(Pseudo-LRU) 또는 Tree-PLRU 사용\n함정 포인트: 현대 CPU는 순수 LRU가 아닌 변형 알고리즘 사용\nIntel: Adaptive Replacement 등 워크로드 적응형\n스캔 저항성(scan resistance) 문제 해결을 위해 개선\n\nLFU (Least Frequently Used)\n사용 빈도가 가장 낮은 데이터를 교체\n장기적 패턴 반영\n최근 로드된 데이터가 불리함\n\nFIFO (First In First Out)\n가장 먼저 들어온 데이터를 교체\n구현이 단순\n지역성을 고려하지 않아 성능 낮음\n\nRandom\n무작위로 교체 대상 선택\n구현 매우 단순\n평균적으로 합리적인 성능",
    "references": [
      {
        "title": "Intel Optimization Manual - Cache Replacement",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-018",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "Write-Through와 Write-Back 캐시 쓰기 정책의 차이점은 무엇인가요?",
    "answer": "캐시 쓰기 정책은 데이터 수정 시 메모리 갱신 시점을 결정합니다.\n\nWrite-Through\n캐시와 메모리를 동시에 갱신\n장점: 데이터 일관성 유지 쉬움, 간단한 구현, 장애 복구 용이\n단점: 매 쓰기마다 메모리 접근으로 느림\n사용: Write Buffer로 지연 시간 완화\n적합한 상황: 안정성 중시, 쓰기 빈도 낮음\n\nWrite-Back\n캐시만 갱신, 메모리는 나중에 갱신 (캐시 라인 교체 시)\nDirty bit로 수정 여부 표시\n장점: 쓰기 성능 우수, 메모리 대역폭 절약\n단점: 일관성 관리 복잡, 캐시 미스 시 추가 쓰기 필요, 정전 시 데이터 손실 위험\n현대 CPU의 대부분 캐시에서 사용\n적합한 상황: 성능 중시, 쓰기 빈도 높음\n\n트레이드오프 요약\n정책   일관성   성능   복잡도   장애 복구\n\nWrite-Through   강함   낮음   단순   용이\nWrite-Back   약함   높음   복잡   어려움\n\nWrite Miss 정책\nWrite-Allocate: 미스 시 캐시 라인 할당 후 쓰기\nNo-Write-Allocate: 미스 시 메모리에 직접 쓰기\n\n일반적 조합: Write-Back + Write-Allocate",
    "references": [
      {
        "title": "ARM Cortex-A Cache Policies",
        "url": "https://developer.arm.com/documentation"
      }
    ]
  },
  {
    "id": "ARCH-019",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "L1, L2, L3 캐시의 차이점과 각각의 역할에 대해 설명해주세요.",
    "answer": "멀티레벨 캐시는 속도와 용량의 균형을 맞추기 위한 계층 구조입니다.\n\nL1 캐시\n가장 빠름 (1-4 사이클)\n코어당 32-64KB\n명령어(I-Cache)와 데이터(D-Cache) 분리\n히트율 최우선, 지연 시간 최소화\n\nL2 캐시\n중간 속도 (10-20 사이클)\n코어당 256KB-1MB\n통합 캐시 (명령어 + 데이터)\nL1 미스 백업\n\nL3 캐시 (LLC: Last Level Cache)\n가장 느리지만 가장 큼 (30-50 사이클)\n전체 코어 공유, 4-64MB\n멀티코어 간 데이터 공유 지원\n메인 메모리 접근 최소화\n\n포함 관계\nInclusive: 상위 캐시가 하위 캐시 내용 포함\nExclusive: 각 레벨에 데이터가 한 번만 존재\nNon-inclusive: 혼합 방식",
    "references": [
      {
        "title": "Intel Cache Architecture",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-020",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "캐시 일관성(Cache Coherence) 문제와 해결 방법에 대해 설명해주세요.",
    "answer": "캐시 일관성은 멀티코어 시스템에서 각 코어의 캐시가 동일한 데이터의 일관된 뷰를 유지하는 것입니다.\n\n문제 상황\n코어 A가 데이터 X를 수정 (A의 캐시에만 반영)\n코어 B가 같은 데이터 X 읽기 시 구버전 데이터 참조\n데이터 불일치로 프로그램 오류 발생\n\n해결 방법: 스누핑 프로토콜\n각 캐시가 버스를 모니터링 (스누핑)\n다른 코어의 메모리 요청 감지 시 자신의 캐시 상태 갱신\n\nMESI 프로토콜\nModified: 수정됨, 유일한 복사본\nExclusive: 배타적, 수정되지 않음\nShared: 공유됨, 여러 캐시에 존재\nInvalid: 무효, 사용 불가\n\n디렉토리 기반 프로토콜\n대규모 시스템에서 사용\n중앙 디렉토리가 캐시 상태 추적\nNUMA 시스템에서 효과적",
    "references": [
      {
        "title": "Intel MESI Protocol",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-021",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "가상 메모리(Virtual Memory)가 무엇이고 왜 필요한가요?",
    "answer": "가상 메모리는 물리 메모리를 추상화하여 각 프로세스에 독립적인 주소 공간을 제공하는 기법입니다.\n\n필요성\n메모리 보호: 프로세스 간 메모리 침범 방지\n메모리 확장: 물리 RAM보다 큰 프로그램 실행 가능\n메모리 관리 단순화: 연속적인 가상 주소 공간 제공\n공유 메모리: 같은 물리 페이지를 여러 프로세스가 공유\n\n동작 원리\n프로세스는 가상 주소 사용\nMMU(Memory Management Unit)가 가상 주소를 물리 주소로 변환\n필요한 페이지가 메모리에 없으면 디스크에서 로드 (페이지 폴트)\n\n장점\n프로세스 격리 및 보안 강화\n효율적인 물리 메모리 사용\n프로그래밍 모델 단순화",
    "references": [
      {
        "title": "Intel 64 and IA-32 Architectures - Paging",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-022",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "물리 주소(Physical Address)와 논리 주소(Logical Address, 가상 주소)의 차이는 무엇인가요?",
    "answer": "논리 주소 (가상 주소)\n프로세스가 사용하는 주소\n프로세스마다 독립적인 주소 공간 (0부터 시작)\n컴파일/링크 시점에 결정\nCPU가 생성하는 주소\n\n물리 주소\n실제 메모리(RAM)의 위치\n시스템 전체에서 유일\n메모리 버스에서 사용되는 실제 주소\n\n변환 과정\n\n변환 방법\n논리 주소 = 페이지 번호 + 페이지 오프셋\n페이지 테이블에서 페이지 번호로 프레임 번호 조회\n물리 주소 = 프레임 번호 + 페이지 오프셋\n\n장점\n프로세스 격리 (서로의 메모리 접근 불가)\n유연한 메모리 할당\n메모리 보호 구현 가능",
    "references": [
      {
        "title": "ARM Memory Management",
        "url": "https://developer.arm.com/documentation"
      }
    ]
  },
  {
    "id": "ARCH-023",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "가상 메모리에서 사용하는 페이지 테이블(Page Table)의 역할과 구조에 대해 설명해주세요.",
    "answer": "페이지 테이블은 가상 주소를 물리 주소로 변환하는 매핑 테이블입니다.\n\n역할\n가상 페이지 번호 → 물리 프레임 번호 매핑\n페이지별 접근 권한 관리 (읽기/쓰기/실행)\n페이지 존재 여부 표시 (Present bit)\n\n페이지 테이블 엔트리(PTE) 구조\n프레임 번호 (물리 주소)\nPresent/Valid bit: 메모리에 존재 여부\nDirty bit: 수정 여부\nAccessed bit: 접근 여부 (LRU용)\nPermission bits: R/W/X 권한\n\n계층적 페이지 테이블 (x86-64)\n4단계: PML4 → PDPT → PD → PT (48비트 주소)\n5단계: PML5 추가 (57비트 주소, 최신 CPU)\n페이지 크기: 4KB (기본), 2MB, 1GB (Huge Page)\n희소 주소 공간에서 메모리 절약\n\nHuge Page 트레이드오프\n페이지 크기   TLB 커버리지   내부 단편화   적합한 용도\n\n4KB   낮음   낮음   일반 애플리케이션\n2MB   높음   중간   데이터베이스, JVM\n1GB   매우 높음   높음   대규모 인메모리 DB",
    "references": [
      {
        "title": "Intel 64 Page Tables",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-024",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "TLB(Translation Lookaside Buffer)가 무엇이고 왜 필요한가요?",
    "answer": "TLB는 최근 사용된 페이지 테이블 엔트리를 캐싱하는 하드웨어 캐시입니다.\n\n필요성\n페이지 테이블 조회는 메모리 접근 필요 (4단계 = 4번 접근)\n매 메모리 접근마다 변환 필요 → 심각한 성능 저하\nTLB로 주소 변환을 고속화\n\n특성\nCPU 내부에 위치, 매우 빠른 접근 (1 사이클)\n작은 크기 (64-1024 엔트리)\nFully Associative 또는 고연관도 구조\nITLB(명령어용), DTLB(데이터용) 분리\n\nTLB 미스 처리\n하드웨어가 페이지 테이블 워크 수행\n해당 PTE를 TLB에 로드\n페이지 폴트 시 OS 개입\n\nTLB 플러시\n컨텍스트 스위칭 시 발생 가능\nASID(Address Space ID)로 프로세스 구분하여 플러시 최소화",
    "references": [
      {
        "title": "ARM TLB Architecture",
        "url": "https://developer.arm.com/documentation"
      }
    ]
  },
  {
    "id": "ARCH-025",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "페이지 폴트(Page Fault)가 무엇이고, 발생 시 처리 과정을 설명해주세요.",
    "answer": "페이지 폴트는 접근하려는 페이지가 물리 메모리에 없을 때 발생하는 예외입니다.\n\n처리 과정\n예외 발생: MMU가 페이지 테이블에서 Present bit = 0 확인\nCPU 상태 저장: 현재 실행 상태를 스택에 저장\nOS 핸들러 호출: 페이지 폴트 핸들러 실행\n주소 유효성 검사: 유효한 접근인지 확인 (아니면 Segmentation Fault)\n페이지 로드: 디스크(스왑)에서 페이지를 메모리로 로드\n프레임 할당: 빈 프레임이 없으면 페이지 교체 수행\n페이지 테이블 갱신: 새 매핑 정보 기록\n명령어 재실행: 폴트 발생 명령어부터 재개\n\n페이지 폴트 종류\nMinor (Soft): 페이지가 메모리에 있지만 매핑만 없음 (빠름, ~1us)\nCopy-on-Write, 공유 라이브러리 첫 접근\nMajor (Hard): 디스크에서 로드 필요 (느림, ~1-10ms)\n스왑에서 복구, 메모리 맵 파일 첫 접근\n실무 영향: Major 폴트는 SSD에서도 수천 배 느림, 성능 병목 원인",
    "references": [
      {
        "title": "Intel Exception Handling - Page Fault",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-026",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "메모리 단편화(Fragmentation)의 종류와 해결 방법은 무엇인가요?",
    "answer": "메모리 단편화는 사용 가능한 메모리가 있지만 할당할 수 없는 상태입니다.\n\n외부 단편화 (External Fragmentation)\n할당된 메모리 사이에 작은 빈 공간들이 흩어져 있음\n총 빈 공간은 충분하지만 연속 공간 부족으로 할당 실패\n해결 방법:\n압축(Compaction): 메모리 재배치 (비용 큼)\n페이징: 연속 할당 불필요\n\n내부 단편화 (Internal Fragmentation)\n할당된 메모리 블록 내부의 사용되지 않는 공간\n고정 크기 블록/페이지 할당에서 발생\n해결 방법:\n다양한 크기의 블록 사용\n슬랩 할당자(Slab Allocator) 사용\n객체 풀(Object Pool) 패턴\n\n페이징의 장점\n물리 메모리를 고정 크기 프레임으로 관리\n외부 단편화 완전 해결\n내부 단편화는 마지막 페이지에서만 발생",
    "references": [
      {
        "title": "Linux Memory Management",
        "url": "https://www.kernel.org/doc/html/latest/admin-guide/mm/"
      }
    ]
  },
  {
    "id": "ARCH-027",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "DMA(Direct Memory Access)가 무엇이고 어떤 장점이 있나요?",
    "answer": "DMA는 CPU 개입 없이 I/O 장치와 메모리 간 직접 데이터 전송을 수행하는 기술입니다.\n\n동작 원리\nCPU가 DMA 컨트롤러에 전송 정보 설정 (소스, 목적지, 크기)\nDMA 컨트롤러가 버스 제어권 획득\n데이터 전송 수행 (CPU 무관)\n전송 완료 시 인터럽트로 CPU에 알림\n\n장점\nCPU 부하 감소: 데이터 전송 중 CPU가 다른 작업 가능\n높은 전송 속도: CPU를 거치지 않아 오버헤드 감소\n효율적 대용량 전송: 디스크, 네트워크 I/O에 필수\n\nDMA 전송 모드\nBurst Mode: 전체 블록을 한 번에 전송\nCycle Stealing: 한 번에 한 워드씩 전송, CPU와 버스 공유\nTransparent: CPU가 버스 미사용 시에만 전송\n\n사용 예\n디스크 I/O, NVMe SSD\n네트워크 카드 (NIC)\nGPU 메모리 전송",
    "references": [
      {
        "title": "Intel DMA Remapping Architecture",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-028",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "메모리 버스(Memory Bus)와 대역폭(Bandwidth)에 대해 설명해주세요.",
    "answer": "메모리 버스\nCPU와 메인 메모리를 연결하는 통신 경로\n주소 버스, 데이터 버스, 제어 버스로 구성\n현대 시스템: 메모리 컨트롤러가 CPU 내장\n\n메모리 대역폭\n단위 시간당 전송 가능한 데이터량 (GB/s)\n계산: 버스 폭 x 클럭 x 채널 수 x 전송률\n\nDDR 메모리 대역폭 예시 (이론적 최대)\nDDR4-3200: 25.6 GB/s (단일 채널)\nDDR5-4800: 38.4 GB/s (단일 채널)\nDDR5-6400: 51.2 GB/s (단일 채널)\n듀얼 채널 시 2배, 쿼드 채널 시 4배\n실제 대역폭: 이론값의 70-85% 수준 (메모리 컨트롤러 효율)\n\n대역폭 영향 요소\n버스 폭: 64비트 (채널당)\n클럭 속도: MHz 단위\n채널 수: 듀얼, 쿼드, 옥타 채널\nDDR 배수: DDR = 2배, DDR5 = 추가 버스트\n\n성능 고려사항\n메모리 집약적 작업: 대역폭이 병목\n캐시 효율 높이면 대역폭 의존도 감소\nNUMA에서는 로컬 메모리 접근이 중요",
    "references": [
      {
        "title": "Intel Memory Bandwidth Analysis",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/tool/intelr-memory-latency-checker.html"
      }
    ]
  },
  {
    "id": "ARCH-029",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "멀티코어 프로세서가 무엇이고, 싱글코어와 비교했을 때 어떤 장점이 있나요?",
    "answer": "멀티코어 프로세서는 하나의 CPU 칩에 여러 개의 독립적인 처리 코어를 통합한 것입니다.\n\n멀티코어 구조\n각 코어는 독립적인 ALU, 제어 유닛, L1/L2 캐시 보유\nL3 캐시는 코어 간 공유\n메모리 컨트롤러 공유\n\n싱글코어 대비 장점\n병렬 처리: 여러 스레드/프로세스 동시 실행\n전력 효율: 클럭 높이기보다 코어 추가가 효율적\n응답성: 한 코어가 바빠도 다른 코어가 응답 가능\n처리량: 전체 시스템 throughput 증가\n\n한계\n암달의 법칙: 순차 부분이 병렬화 이점 제한\n캐시 일관성 오버헤드\n소프트웨어 병렬화 필요\n\n현대 서버 CPU (2024-2025 기준)\nAMD EPYC (Genoa/Bergamo): 최대 128 코어 (Bergamo는 최대 192 코어)\nIntel Xeon (Emerald Rapids): 최대 64 코어\nARM Ampere Altra Max: 최대 128 코어\nAWS Graviton4: 96 코어\n\n싱글코어 vs 멀티코어 선택 트레이드오프\n워크로드   권장\n\n단일 쿼리 지연 시간 중시   높은 클럭의 적은 코어\n처리량(throughput) 중시   많은 코어\n레거시 단일 스레드 앱   높은 IPC 코어\n컨테이너/마이크로서비스   많은 코어",
    "references": [
      {
        "title": "Intel Multi-Core Architecture",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-030",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "하이퍼스레딩(Hyper-Threading, SMT)이 무엇인가요?",
    "answer": "하이퍼스레딩(HT)은 Intel의 SMT(Simultaneous Multi-Threading) 구현으로, 하나의 물리 코어가 두 개의 논리 코어처럼 동작하는 기술입니다.\n\n동작 원리\n각 코어에 2세트의 아키텍처 상태(레지스터, PC 등) 유지\n실행 유닛(ALU, FPU 등)은 공유\n한 스레드가 대기 중일 때 다른 스레드가 실행 유닛 활용\n\n장점\n파이프라인 유휴 시간 감소\n캐시 미스, 분기 실패 시 다른 스레드 실행\n추가 실리콘 면적 5% 미만으로 성능 15-30% 향상\n\n단점\n캐시, 대역폭, 실행 유닛 경쟁으로 100% 성능 향상은 불가 (실제 15-30%)\n일부 워크로드에서 성능 저하 가능 (캐시 경쟁 심한 경우)\n보안 취약점 (Spectre, MDS 등 사이드 채널 공격)\n\n사용 시 고려사항 (트레이드오프)\n워크로드   SMT 효과   이유\n\nI/O 바운드   좋음   한 스레드 대기 시 다른 스레드 활용\n메모리 바운드   보통~좋음   캐시 미스 중 다른 스레드 실행\nCPU 바운드   제한적   실행 유닛 경쟁\n캐시 집약적   나쁨   L1/L2 경쟁으로 미스 증가\n보안 민감 환경: Spectre 계열 취약점으로 비활성화 권장\n벤치마크 필수: 워크로드별로 실측 후 결정",
    "references": [
      {
        "title": "Intel Hyper-Threading Technology",
        "url": "https://www.intel.com/content/www/us/en/architecture-and-technology/hyper-threading/hyper-threading-technology.html"
      }
    ]
  },
  {
    "id": "ARCH-031",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "병렬 처리(Parallel Processing)와 동시성(Concurrency)의 차이는 무엇인가요?",
    "answer": "동시성 (Concurrency)\n여러 작업을 번갈아가며 처리하는 논리적 개념\n단일 코어에서도 구현 가능 (시분할)\n작업들이 겹치는 시간대에 진행 중\n예: 싱글 코어에서 멀티태스킹\n\n병렬 처리 (Parallelism)\n여러 작업을 동시에 실행하는 물리적 개념\n멀티코어/멀티프로세서 필요\n실제로 같은 순간에 여러 작업 실행\n예: 4코어 CPU에서 4개 스레드 동시 실행\n\n비유\n동시성: 한 요리사가 여러 요리를 번갈아 조리 (한 사람이 여러 일 관리)\n병렬 처리: 여러 요리사가 각자 요리를 동시에 조리 (여러 사람이 동시 실행)\n\n관계 (Rob Pike의 정의)\n동시성은 병렬성이 아니다 - 이것은 중요한 함정 질문\n동시성 = 독립적으로 실행 가능한 컴포넌트들을 다루는 구조(Structure)\n병렬성 = 계산을 동시에 실행(Execution)하는 것\n동시성 프로그램은 단일 코어에서도 동작 (시분할)\n병렬 실행은 동시성 설계를 필요로 하지만, 동시성이 병렬성을 보장하지 않음\n\n실용적 예시\nNode.js: 동시성 있음 (이벤트 루프), 병렬성 없음 (단일 스레드)\n멀티스레드 Java: 동시성 + 병렬성 가능 (멀티코어에서)",
    "references": [
      {
        "title": "Go Concurrency Patterns",
        "url": "https://go.dev/blog/pipelines"
      }
    ]
  },
  {
    "id": "ARCH-032",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "대칭형 멀티프로세싱(SMP)과 비대칭형 멀티프로세싱(AMP)의 차이는 무엇인가요?",
    "answer": "SMP (Symmetric Multi-Processing)\n모든 프로세서가 동등한 역할\n어떤 CPU도 모든 작업 실행 가능\n단일 OS가 모든 CPU 관리\n메모리, I/O 자원 공유\n현대 서버, PC의 표준 방식\n\nAMP (Asymmetric Multi-Processing)\n프로세서마다 다른 역할 할당\n마스터-슬레이브 구조 (마스터가 작업 분배)\n특정 CPU가 특정 작업 전담\n예: 하나는 OS, 다른 하나는 I/O 처리\n\n비교\n특성   SMP   AMP\n\n로드 밸런싱   자동 (OS 스케줄러)   수동 설계 필요\n유연성   높음   낮음\n복잡성   OS 복잡   하드웨어/소프트웨어 단순\n사용 예   범용 서버, PC   임베디드, 실시간 시스템\n\n현대 하이브리드 아키텍처 (중요 트렌드)\nbig.LITTLE (ARM): 고성능 + 저전력 코어 조합\nP-core + E-core (Intel Alder Lake 이후): 성능 + 효율 코어 조합\nAMD Zen 5: 아직 균일 코어 유지, 향후 하이브리드 가능\n\n하이브리드 아키텍처 고려사항\nOS 스케줄러가 작업 특성에 따라 코어 할당\n소프트웨어 호환성: 일부 앱이 코어 차이를 인지 못함\n벤치마크 해석 주의: E-core 포함 여부에 따라 결과 상이",
    "references": [
      {
        "title": "ARM big.LITTLE Technology",
        "url": "https://developer.arm.com/documentation"
      }
    ]
  },
  {
    "id": "ARCH-033",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "캐시 일관성 프로토콜(MESI, MOESI 등)에 대해 설명해주세요.",
    "answer": "캐시 일관성 프로토콜은 멀티코어 시스템에서 각 캐시의 데이터 일관성을 유지합니다.\n\nMESI 프로토콜 (Intel)\nModified: 수정됨, 유일한 복사본, 메모리와 불일치\nExclusive: 배타적, 유일한 복사본, 메모리와 일치\nShared: 공유됨, 여러 캐시에 존재, 읽기 전용\nInvalid: 무효, 사용 불가\n\n상태 전이 예시\n읽기 미스: Invalid → Shared/Exclusive\n쓰기 미스: Invalid → Modified (다른 캐시 무효화)\n다른 코어 쓰기 감지: Shared → Invalid\n\nMOESI 프로토콜 (AMD)\nMESI + Owned 상태 추가\nOwned: 수정됨, 공유 가능, 메모리 쓰기 책임\n더티 데이터를 캐시 간 직접 전달 가능\n\nMESIF 프로토콜 (Intel QPI)\nMESI + Forward 상태 추가\n공유 데이터 요청에 응답하는 캐시 지정\n다중 응답 방지로 효율성 향상",
    "references": [
      {
        "title": "Intel Cache Coherence",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-034",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "멀티코어 환경에서 False Sharing이 무엇이고, 어떻게 성능에 영향을 미치나요?",
    "answer": "False Sharing은 서로 다른 데이터가 같은 캐시 라인에 있어 불필요한 캐시 무효화가 발생하는 현상입니다.\n\n발생 상황\ncounta와 countb가 같은 64바이트 캐시 라인에 위치\n스레드 A가 counta 수정 → 스레드 B의 캐시 라인 무효화\n스레드 B가 countb 수정 → 스레드 A의 캐시 라인 무효화\n실제 공유 데이터가 아닌데 캐시 무효화 발생\n\n성능 영향\n캐시 라인 핑퐁 (코어 간 MESI 상태 전환 반복)\n심각한 성능 저하 (10-100배 느려질 수 있음)\n멀티스레드 확장성 저해\n코어 수 증가할수록 문제 악화\n\n해결 방법\n캐시 라인 크기로 패딩 추가 (64바이트, 일부 시스템 128바이트)\nalignas(64) 또는 _cachelinealigned 사용\n스레드별 독립 데이터 구조 분리\n패딩의 트레이드오프: 메모리 사용 증가 vs 성능 향상\n\n진단 방법\nperf c2c (Linux): 캐시 라인 경쟁 분석\nIntel VTune: False Sharing 탐지\n멀티스레드 성능이 코어 수에 비례하지 않으면 의심",
    "references": [
      {
        "title": "Intel Avoiding False Sharing",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-035",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "NUMA(Non-Uniform Memory Access) 아키텍처에 대해 설명해주세요.",
    "answer": "NUMA는 메모리 접근 시간이 메모리 위치에 따라 달라지는 멀티프로세서 아키텍처입니다.\n\n구조\n시스템을 여러 노드로 분할\n각 노드: CPU + 로컬 메모리\n인터커넥트로 노드 간 연결 (QPI, Infinity Fabric)\n\n메모리 접근\n로컬 메모리: 빠름 (같은 노드)\n원격 메모리: 느림 (다른 노드, 1.5-2배 지연)\n\nSMP vs NUMA\nSMP(UMA): 모든 메모리 접근 시간 동일\nNUMA: 메모리 위치에 따라 접근 시간 다름\n\n성능 최적화\n데이터와 처리 스레드를 같은 노드에 배치\nnumactl, libnuma로 메모리 정책 설정\nNUMA-aware 메모리 할당자 사용\n\n사용 환경\n대규모 서버 (2소켓 이상)\n고성능 컴퓨팅 (HPC)\n대용량 메모리 시스템\n\nNUMA 최적화 전략과 트레이드오프\n전략   장점   단점\n\nLocal Allocation   낮은 지연   메모리 불균형 가능\nInterleave   대역폭 분산   평균 지연 증가\nBind   예측 가능한 성능   유연성 감소\n\n주의사항 (함정 포인트)\n단일 소켓 서버도 내부적으로 NUMA일 수 있음 (AMD의 CCD 구조)\n가상화 환경에서 vNUMA 설정 확인 필요\n컨테이너는 기본적으로 NUMA 인지하지 않음",
    "references": [
      {
        "title": "Intel NUMA Architecture",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-036",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "I/O 처리 방식(Programmed I/O, Interrupt-driven I/O, DMA)의 차이점을 설명해주세요.",
    "answer": "Programmed I/O (폴링)\nCPU가 I/O 장치 상태를 계속 확인 (폴링)\nCPU가 직접 데이터 전송\n단점: CPU 시간 낭비, 비효율적\n용도: 단순한 임베디드 시스템\n\nInterrupt-driven I/O\nI/O 장치가 준비되면 인터럽트 발생\nCPU는 인터럽트 발생 전까지 다른 작업 수행\n데이터 전송은 여전히 CPU가 수행\n폴링보다 효율적이지만 대용량에는 부적합\n\nDMA (Direct Memory Access)\nDMA 컨트롤러가 메모리-I/O 장치 간 직접 전송\nCPU는 전송 시작/완료만 관여\n전송 완료 시 인터럽트로 통보\n대용량 데이터 전송에 최적\n\n비교\n방식   CPU 사용률   적합한 용도\n\nProgrammed I/O   매우 높음   간단한 I/O\nInterrupt I/O   중간   소량 데이터\nDMA   낮음   대용량 전송",
    "references": [
      {
        "title": "Intel I/O Architecture",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-037",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "인터럽트(Interrupt)의 동작 원리와 종류에 대해 설명해주세요.",
    "answer": "인터럽트는 CPU의 정상 실행 흐름을 중단하고 특정 이벤트를 처리하는 메커니즘입니다.\n\n동작 원리\n인터럽트 발생 (하드웨어/소프트웨어)\n현재 명령어 완료 후 CPU 상태 저장\n인터럽트 벡터 테이블에서 핸들러 주소 조회\n인터럽트 서비스 루틴(ISR) 실행\n저장된 상태 복원 후 원래 작업 재개\n\n종류\n\n하드웨어 인터럽트\n외부 장치가 발생 (키보드, 네트워크, 디스크 등)\n마스커블(Maskable): 비활성화 가능\n논마스커블(NMI): 비활성화 불가 (치명적 오류)\n\n소프트웨어 인터럽트 (트랩)\n프로그램이 의도적으로 발생 (시스템 콜)\n예외(Exception): 오류 상황 (0으로 나누기, 페이지 폴트)\n\n인터럽트 우선순위\nAPIC(Advanced PIC)로 우선순위 관리\n높은 우선순위 인터럽트가 낮은 것을 선점 가능",
    "references": [
      {
        "title": "Intel Interrupt and Exception Handling",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-038",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "I/O 처리에서 폴링(Polling) 방식과 인터럽트(Interrupt) 방식의 장단점을 비교해주세요.",
    "answer": "폴링 (Polling)\nCPU가 주기적으로 장치 상태 확인\n\n장점   단점\n\n구현 단순   CPU 시간 낭비\n예측 가능한 지연 시간   이벤트 빈도 낮으면 비효율\n인터럽트 오버헤드 없음   다른 작업 블로킹\n실시간 시스템에 유리   확장성 낮음\n\n인터럽트 (Interrupt)\n장치가 이벤트 발생 시 CPU에 알림\n\n장점   단점\n\nCPU 효율적 사용   컨텍스트 스위칭 오버헤드\n빠른 응답 가능   구현 복잡\n여러 장치 동시 처리   인터럽트 폭주(Interrupt Storm) 가능\n확장성 좋음   우선순위 관리 필요\n\n적합한 사용 상황 (트레이드오프)\n폴링 선호: 이벤트 매우 빈번 (고속 네트워크, NVMe SSD), 지연 시간 일관성 중요\n인터럽트 선호: 이벤트 드묾, 긴 대기, CPU 효율 중시\n핵심 기준: 폴링 간격 < 평균 이벤트 간격이면 인터럽트가 효율적\n\n현대적 접근: 하이브리드 (Interrupt Coalescing)\nNAPI (Linux 네트워크): 인터럽트로 시작, 폴링으로 처리, 유휴 시 인터럽트로 복귀\nNVMe SSD: Interrupt Coalescing으로 다수 완료를 묶어서 알림\n이유: 고속 장치에서 순수 인터럽트는 CPU 부하 과다, 순수 폴링은 유휴 시 낭비",
    "references": [
      {
        "title": "Linux NAPI - Interrupt Coalescing",
        "url": "https://www.kernel.org/doc/html/latest/networking/napi.html"
      }
    ]
  },
  {
    "id": "ARCH-039",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "I/O 버퍼링(Buffering)이 무엇이고 왜 사용하나요?",
    "answer": "I/O 버퍼링은 데이터 전송 시 중간 저장 공간(버퍼)을 사용하는 기법입니다.\n\n사용 이유\n속도 차이 해소: 빠른 CPU와 느린 I/O 장치 간 속도 차이 완화\n데이터 단위 불일치: 바이트 단위 vs 블록 단위 전송\n프로세스-장치 비동기화: 프로세스가 I/O 완료를 기다리지 않아도 됨\n\n버퍼링 종류\nSingle Buffering: 버퍼 1개, 입출력 중 프로세스 대기\nDouble Buffering: 버퍼 2개, 하나 사용 중 다른 하나 채움\nCircular Buffering: 다중 버퍼를 순환 사용\n\n버퍼링 vs 캐싱\n버퍼링: 데이터 임시 저장, 전송 후 삭제\n캐싱: 재사용을 위해 데이터 유지\n\n예시\n디스크 I/O: 블록 단위로 버퍼링\n네트워크: TCP 소켓 버퍼\n키보드: 라인 버퍼링",
    "references": [
      {
        "title": "Linux Kernel I/O Buffering",
        "url": "https://www.kernel.org/doc/html/latest/"
      }
    ]
  },
  {
    "id": "ARCH-040",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "메모리 맵 I/O(Memory-Mapped I/O)와 포트 맵 I/O(Port-Mapped I/O)의 차이는 무엇인가요?",
    "answer": "Memory-Mapped I/O (MMIO)\nI/O 장치 레지스터를 메모리 주소 공간에 매핑\n일반 메모리 접근 명령어로 I/O 수행 (MOV, LOAD, STORE)\n장치 접근이 메모리 접근과 동일\n현대 시스템의 주요 방식\n\nPort-Mapped I/O (PMIO)\nI/O 장치를 별도의 I/O 주소 공간에 배치\n전용 명령어 사용 (x86: IN, OUT)\n메모리와 I/O 주소 공간 분리\nx86 레거시 장치에서 사용\n\n비교\n특성   Memory-Mapped   Port-Mapped\n\n주소 공간   메모리와 공유   별도 I/O 공간\n명령어   일반 메모리 명령   전용 I/O 명령\n유연성   높음   낮음\n보호   페이지 단위 보호 가능   권한 레벨만\n캐싱   주의 필요 (비캐시 설정)   캐시 안됨\n\n현대 시스템\n대부분 MMIO 사용 (PCIe, GPU 등)\nPMIO는 레거시 호환 (키보드 컨트롤러 등)",
    "references": [
      {
        "title": "Intel I/O Address Space",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-041",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "CPU 성능을 측정하는 지표(Clock Speed, IPC, CPI 등)에 대해 설명해주세요.",
    "answer": "Clock Speed (클럭 속도)\nCPU가 1초에 수행하는 사이클 수 (Hz)\n예: 3.5GHz = 초당 35억 사이클\n단독으로는 성능 지표로 부족\n\nIPC (Instructions Per Cycle)\n사이클당 실행하는 명령어 수\n높을수록 효율적인 파이프라인/마이크로아키텍처\n현대 CPU: 2-4 IPC\n\nCPI (Cycles Per Instruction)\n명령어 하나 실행에 필요한 평균 사이클 수\nCPI = 1/IPC\n낮을수록 좋음\n\nCPU 성능 공식\n\n기타 지표\nFLOPS: 초당 부동소수점 연산 수\nMIPS: 초당 백만 명령어 (현재는 비추천)\nThroughput: 단위 시간당 처리량",
    "references": [
      {
        "title": "Intel Performance Monitoring",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-042",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "IPC(Instructions Per Cycle)가 무엇이고 왜 중요한가요?",
    "answer": "IPC는 CPU가 한 클럭 사이클에 평균적으로 실행하는 명령어 수입니다.\n\n중요성\n클럭 속도만으로는 실제 성능 판단 불가\n같은 클럭이라도 IPC가 높으면 더 빠름\n아키텍처 효율성의 핵심 지표\n\nIPC에 영향을 미치는 요소\n파이프라인 효율: 해저드, 스톨 최소화\n분기 예측 정확도: 예측 실패 시 IPC 감소\n캐시 히트율: 미스 시 파이프라인 스톨\n명령어 수준 병렬성: 슈퍼스칼라, OoO 실행\n데이터 의존성: 명령어 간 의존성이 적을수록 유리\n\n세대별 IPC 향상\n같은 클럭에서 신세대 CPU가 더 빠른 이유\nIntel 12세대 → 13세대: ~10% IPC 향상\nAMD Zen3 → Zen4: ~13% IPC 향상\n\n측정 방법\n성능 카운터 사용 (perf, VTune)\nIPC = instructions / cycles",
    "references": [
      {
        "title": "Intel VTune Profiler - IPC Analysis",
        "url": "https://www.intel.com/content/www/us/en/developer/tools/oneapi/vtune-profiler.html"
      }
    ]
  },
  {
    "id": "ARCH-043",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "Amdahl의 법칙에 대해 설명하고, 병렬화의 한계를 설명해주세요.",
    "answer": "Amdahl의 법칙은 병렬화로 얻을 수 있는 최대 성능 향상의 한계를 설명합니다.\n\n공식\n\n예시\n90% 병렬화 가능한 프로그램\n무한대 프로세서 사용 시: 최대 10배 속도 향상\n10개 프로세서: 5.26배 향상\n100개 프로세서: 9.17배 향상\n\n핵심 통찰\n순차 부분(1-P)이 병렬화 이점 제한\n프로세서 수 증가 효과는 체감\n작은 순차 부분도 큰 영향 (5% 순차 = 최대 20배 속도 향상 한계)\n\n병렬화의 실제 한계\n동기화 오버헤드 (락, 배리어)\n통신 비용 (코어 간, 노드 간)\n메모리 대역폭 병목\n로드 밸런싱 불균형\n캐시 일관성 트래픽\n\nGustafson의 법칙 (Amdahl의 보완)\n문제 크기를 프로세서 수에 비례해 키우면 병렬화 이점 유지\nScaled Speedup = N + (1-N) x S (S: 순차 비율, N: 프로세서 수)\n약한 확장성(Weak Scaling) 관점\n실무적 의미: 빅데이터 처리에서는 Gustafson이 더 현실적\n데이터 크기가 커지면 병렬 부분 비율도 증가\nAmdahl은 고정 크기 문제에 대한 비관적 한계\n\nAmdahl vs Gustafson 선택\n상황   적용 법칙\n\n고정 크기 문제 (지연 시간 최적화)   Amdahl\n가변 크기 문제 (처리량 최적화)   Gustafson",
    "references": [
      {
        "title": "Computer Architecture: A Quantitative Approach",
        "url": "https://www.elsevier.com/books/computer-architecture/hennessy/978-0-12-811905-1"
      }
    ]
  },
  {
    "id": "ARCH-044",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "벤치마크(Benchmark)의 종류와 성능 측정 방법에 대해 설명해주세요.",
    "answer": "벤치마크는 시스템 성능을 측정하고 비교하기 위한 표준화된 테스트입니다.\n\n벤치마크 종류\n\n마이크로벤치마크\n특정 컴포넌트 측정 (캐시, 메모리, 분기 예측)\n예: lmbench, cachebench\n\n매크로벤치마크\n실제 애플리케이션 또는 전체 시스템 성능\n예: SPEC CPU, Geekbench\n\n주요 벤치마크\n벤치마크   측정 대상   용도\n\nSPEC CPU   CPU 정수/부동소수점   서버/데스크톱 CPU\nCinebench   멀티스레드 렌더링   콘텐츠 제작\nTPC-C/TPC-H   데이터베이스   OLTP/OLAP\nSPECjbb   Java 비즈니스 로직   엔터프라이즈\nsysbench   DB, CPU, 메모리   범용 서버\n\n성능 측정 방법\n실행 시간 측정\n처리량(Throughput) 측정\n지연 시간(Latency) 측정\n자원 사용률 모니터링\n\n주의사항 (벤치마크 함정)\n실제 워크로드와 유사한 벤치마크 선택\n여러 번 실행하여 평균/분산/백분위수(p99) 확인\n벤치마크 최적화 함정: 벤더가 벤치마크에 특화 최적화하는 경우 많음\nGoodhart의 법칙: 측정 지표가 목표가 되면 좋은 지표 역할을 못함\n캐시 워밍, JIT 컴파일 등 워밍업 고려\n다른 프로세스 영향, 전력 상태(터보 부스트) 일관성 확인",
    "references": [
      {
        "title": "SPEC - Standard Performance Evaluation Corporation",
        "url": "https://www.spec.org/"
      }
    ]
  },
  {
    "id": "ARCH-045",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "프로그램 성능 최적화 시 컴퓨터 구조적 관점에서 고려해야 할 사항은 무엇인가요?",
    "answer": "캐시 최적화\n데이터 지역성 극대화 (시간적, 공간적)\n캐시 친화적 데이터 구조 사용\n행 우선 순서로 배열 접근 (C/C++)\n캐시 라인 크기 고려 (64바이트)\n\n메모리 접근 최적화\n메모리 정렬 (alignment)\n프리페칭 활용\nFalse Sharing 방지\nNUMA 지역성 고려\n\n분기 최적화\n분기 예측 친화적 코드 작성\n분기 없는 코드 (branchless) 고려\n루프 언롤링\n\n명령어 수준 병렬성\n데이터 의존성 최소화\nSIMD 명령어 활용 (SSE, AVX)\n루프 벡터화\n\n병렬 처리 최적화\n적절한 스레드 수 선택\n동기화 오버헤드 최소화\n로드 밸런싱\n\n측정 도구 활용\n프로파일러 (perf, VTune, Instruments)\n성능 카운터 분석\n병목 지점 식별",
    "references": [
      {
        "title": "Intel Optimization Reference Manual",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-046",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "백엔드 서버에서 CPU 캐시를 효율적으로 활용하는 방법은 무엇인가요?",
    "answer": "데이터 구조 최적화\n자주 접근하는 데이터를 연속 메모리에 배치\n객체 크기를 캐시 라인(64바이트)에 맞춤\n핫 데이터와 콜드 데이터 분리\n\n메모리 접근 패턴\n순차 접근 선호 (배열 > 연결 리스트)\n포인터 체이싱 최소화\n데이터 지역성 고려한 알고리즘 선택\n\n객체 풀링\n자주 생성/삭제되는 객체 재사용\n메모리 단편화 방지\n캐시 워밍 효과\n\n멀티스레드 고려\n스레드별 데이터 분리 (False Sharing 방지)\n읽기 전용 데이터는 공유 가능\nNUMA 인지 메모리 할당\n\n실용적 예시",
    "references": [
      {
        "title": "Intel Developer Guide - Cache Optimization",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-047",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "데이터베이스 쿼리 성능에 CPU 캐시가 미치는 영향에 대해 설명해주세요.",
    "answer": "캐시가 중요한 이유\n데이터베이스는 대량의 데이터를 메모리에서 처리\n캐시 효율이 쿼리 처리 속도에 직접 영향\n인덱스 검색, 조인, 정렬 모두 캐시 의존적\n\n캐시 영향 사례\n\n인덱스 스캔\nB+ 트리 노드가 캐시 라인에 맞으면 효율적\n클러스터드 인덱스: 관련 데이터가 물리적으로 인접\n\n해시 조인\n해시 테이블 크기가 캐시에 맞으면 빠름\n캐시 초과 시 성능 급격히 저하\n\n컬럼 지향 저장\n필요한 컬럼만 캐시에 로드\n분석 쿼리(OLAP)에 유리\n압축으로 캐시 효율 향상\n\n최적화 기법\n워킹 셋을 캐시 크기 내로 유지\n인덱스 구조 최적화 (노드 크기)\n버퍼 풀 프리페칭\nSIMD 활용한 벡터화 처리",
    "references": [
      {
        "title": "MySQL Performance Schema",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/performance-schema.html"
      }
    ]
  },
  {
    "id": "ARCH-048",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "멀티스레드 환경에서 False Sharing을 방지하는 구체적인 방법은 무엇인가요?",
    "answer": "패딩을 사용한 분리\n\n스레드 로컬 데이터 사용\n각 스레드가 독립적인 데이터 유지\n주기적으로 결과 병합\n\n데이터 구조 재설계\n핫 데이터와 콜드 데이터 분리\n스레드별로 다른 배열 인덱스 사용\n\n실용적 패턴\n\n프레임워크 지원\nJDK @Contended 어노테이션\nC++ alignas() 키워드\nGo 구조체 필드 정렬",
    "references": [
      {
        "title": "Intel Threading Building Blocks Guide",
        "url": "https://www.intel.com/content/www/us/en/developer/tools/oneapi/onetbb.html"
      }
    ]
  },
  {
    "id": "ARCH-049",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "메모리 정렬(Memory Alignment)이 성능에 미치는 영향을 설명해주세요.",
    "answer": "메모리 정렬이란\n데이터를 특정 바이트 경계에 배치하는 것\nN바이트 데이터는 N의 배수 주소에 배치\n예: 8바이트 double은 8의 배수 주소\n\n성능 영향\n\n정렬된 접근\n단일 메모리 접근으로 데이터 로드\n캐시 라인 효율적 사용\nSIMD 명령어 최적 활용\n\n비정렬 접근\n두 번의 메모리 접근 필요할 수 있음\n일부 아키텍처에서 예외 발생 (ARM)\nx86에서는 성능 저하 (2-3배 느림)\n\n자동 패딩\n\n최적화 방법\n크기가 큰 멤버부터 선언\n#pragma pack 사용 시 주의 (성능 저하)\n캐시 라인 정렬: alignas(64)\n\nSIMD 정렬 요구사항\nSSE: 16바이트 정렬\nAVX: 32바이트 정렬\nAVX-512: 64바이트 정렬",
    "references": [
      {
        "title": "Intel Data Alignment Guide",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-050",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "NUMA 시스템에서 백엔드 애플리케이션 성능을 최적화하는 방법은 무엇인가요?",
    "answer": "NUMA 인지 메모리 할당\n스레드가 사용할 데이터를 로컬 노드에 할당\nLinux: numactl, libnuma 활용\nJVM: -XX:+UseNUMA 옵션\n\n프로세스/스레드 배치\n\n스레드 풀 설계\nNUMA 노드별로 스레드 풀 분리\n워커 스레드를 특정 코어에 바인딩\n노드 간 작업 이동 최소화\n\n데이터 구조 파티셔닝\n대용량 데이터를 노드별로 분할\n각 파티션을 해당 노드 스레드가 처리\n\n데이터베이스 최적화\n버퍼 풀을 NUMA 인지하도록 설정\n연결당 전용 스레드를 같은 노드에 유지\n쿼리 실행 시 데이터 로컬리티 고려\n\n모니터링",
    "references": [
      {
        "title": "Linux NUMA Documentation",
        "url": "https://www.kernel.org/doc/html/latest/admin-guide/mm/numa_memory_policy.html"
      }
    ]
  },
  {
    "id": "ARCH-051",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "큰 데이터를 처리할 때 메모리 계층을 고려한 최적화 전략은 무엇인가요?",
    "answer": "블록 단위 처리 (Blocking/Tiling)\n데이터를 캐시 크기에 맞는 블록으로 분할\n각 블록을 완전히 처리 후 다음 블록\n캐시 재사용 극대화\n\n스트리밍 처리\n데이터를 한 번만 순차적으로 읽음\n프리페칭 효과 극대화\nNon-temporal 저장으로 캐시 오염 방지\n\n데이터 압축\n캐시에 더 많은 데이터 적재\n압축/해제 비용 vs 메모리 접근 비용 트레이드오프\n\n외부 정렬/병합\n메모리보다 큰 데이터 처리\n디스크 I/O 최소화하는 다단계 병합\n\n컬럼 지향 처리\n필요한 컬럼만 메모리에 로드\n벡터화 처리 용이\n분석 워크로드에 효과적\n\n메모리 맵 파일\n대용량 파일을 가상 메모리에 매핑\nOS의 페이지 캐시 활용",
    "references": [
      {
        "title": "Intel Memory Optimization Guide",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "ARCH-052",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "CPU 바운드(CPU-bound) 작업과 I/O 바운드(I/O-bound) 작업의 차이와 최적화 방법은 무엇인가요?",
    "answer": "CPU 바운드 작업\nCPU 연산이 병목\n예: 암호화, 압축, 과학 계산, 이미지 처리\n\n최적화 방법\n코어 수만큼 스레드 사용\nSIMD 명령어 활용 (SSE, AVX)\n알고리즘 최적화\n캐시 효율 개선\n비동기 I/O로 CPU 유휴 방지\n\nI/O 바운드 작업\nI/O 대기가 병목 (디스크, 네트워크, DB)\n예: 웹 서버, 파일 처리, API 호출\n\n최적화 방법\n비동기 I/O (async/await, NIO)\n이벤트 기반 아키텍처 (epoll, kqueue)\n코어 수보다 많은 스레드/코루틴 사용\nI/O 멀티플렉싱\n캐싱으로 I/O 횟수 감소\n\n스레드 풀 크기 (Brian Goetz 공식)\n작업 유형   스레드 수   근거\n\nCPU 바운드   CPU 코어 수 (N) 또는 N+1   코어 활용 최대화, +1은 페이지 폴트 대비\nI/O 바운드   N x (1 + W/C)   W=대기시간, C=처리시간\n혼합   CPU 사용률 목표에 따라 조정   프로파일링 필수\n\n실무적 고려사항\n위 공식은 출발점일 뿐, 실제 성능 테스트로 튜닝 필요\n가상화 환경에서는 할당된 vCPU 기준\n컨테이너에서는 cgroup 제한 확인 필요\n\n혼합 워크로드 전략\nCPU 작업과 I/O 작업용 스레드 풀 분리\nJava: ForkJoinPool (CPU) + CachedThreadPool (I/O)\n비동기 I/O 활용으로 스레드 수 최소화",
    "references": [
      {
        "title": "Java Concurrency in Practice",
        "url": "https://jcip.net/"
      }
    ]
  },
  {
    "id": "ARCH-053",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "백엔드 시스템에서 메모리 대역폭이 성능에 미치는 영향은 무엇인가요?",
    "answer": "메모리 대역폭 병목 상황\n대용량 데이터 처리 (분석, 집계)\n캐시 미스 빈번한 워크로드\n다수 코어가 동시에 메모리 접근\n스트리밍 데이터 처리\n\n영향\nCPU가 데이터 대기로 유휴 상태\n코어 수 증가해도 성능 향상 제한\n메모리 집약적 쿼리 처리 지연\n\n대역폭 계산\n\n최적화 방법\n\n데이터 크기 감소\n압축 활용\n적절한 데이터 타입 선택 (int vs long)\n컬럼 지향 저장\n\n메모리 채널 활용\n듀얼/쿼드 채널 메모리 구성\nNUMA에서 대역폭 분산\n\n캐시 효율 향상\n블로킹 기법으로 캐시 재사용\n프리페칭 활용\n비순차 접근 최소화\n\nNon-Temporal 접근\n재사용 없는 데이터는 캐시 우회\nmmstream_si128 등 사용",
    "references": [
      {
        "title": "Intel Memory Bandwidth Analysis",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/tool/intelr-memory-latency-checker.html"
      }
    ]
  },
  {
    "id": "ARCH-054",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "컨텍스트 스위칭 비용을 줄이기 위한 하드웨어적/소프트웨어적 방법은 무엇인가요?",
    "answer": "하드웨어적 방법\n\n레지스터 세트 복제\n하이퍼스레딩: 스레드별 아키텍처 상태 유지\n빠른 컨텍스트 전환\n\nTLB 최적화\nASID/PCID: 프로세스별 TLB 엔트리 구분\n컨텍스트 스위칭 시 TLB 플러시 회피\n\n캐시 유지\n스위칭 후에도 캐시 데이터 유효\n웜 캐시로 빠른 재개\n\n소프트웨어적 방법\n\n경량 스레드/코루틴\n유저 공간에서 스위칭 (syscall 없음)\nGo 고루틴, Kotlin 코루틴, Java 가상 스레드\n\n스레드 수 최적화\nCPU 코어 수에 맞게 스레드 제한\n불필요한 스위칭 감소\n\nCPU 어피니티\n스레드를 특정 코어에 바인딩\n캐시 친화성 유지\n\n배치 처리\n작은 작업들을 모아서 처리\n스위칭 빈도 감소\n\nLock-free 자료구조\n블로킹 최소화\n스레드가 대기 없이 진행",
    "references": [
      {
        "title": "Linux Context Switching",
        "url": "https://www.kernel.org/doc/html/latest/scheduler/"
      }
    ]
  },
  {
    "id": "ARCH-055",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "서버 하드웨어 선택 시 컴퓨터 구조 관점에서 고려해야 할 사항은 무엇인가요?",
    "answer": "CPU 선택\n코어 수 vs 클럭: 워크로드 특성에 따라 결정\n병렬화 용이: 많은 코어\n순차적 처리: 높은 클럭\n캐시 크기: L3 캐시가 워킹 셋 수용 가능한지\n메모리 채널 수: 메모리 대역폭 요구사항\n\n메모리 구성\n용량: 워킹 셋 + 버퍼/캐시 충분히\n대역폭: 채널 수, DDR 세대\nNUMA 구성: 대규모 시스템에서 중요\n\n스토리지\nNVMe SSD: 고성능 I/O 필요시\nIOPS vs 처리량: 워크로드 패턴에 따라\n캐시 계층: 핫 데이터용 빠른 스토리지\n\n네트워크\n대역폭: 10G, 25G, 100G\n지연 시간: RDMA, 커널 바이패스\n\n아키텍처 선택\nx86: 범용, 소프트웨어 호환성\nARM: 전력 효율, 코어 수 우위\n전용 가속기: GPU, TPU, FPGA\n\n확장성 고려\n수직 확장 여유 (슬롯, 전원)\n수평 확장 용이성",
    "references": [
      {
        "title": "Intel Server Platform Guide",
        "url": "https://www.intel.com/content/www/us/en/products/details/servers.html"
      }
    ]
  },
  {
    "id": "ARCH-056",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "최근 서버용 CPU의 발전 트렌드(코어 수 증가, 특수 명령어 등)에 대해 설명해주세요.",
    "answer": "코어 수 증가 (2024-2025 기준)\nAMD EPYC (Genoa): 96 코어, (Bergamo): 192 코어 (E-core)\nIntel Xeon (Emerald Rapids): 64 코어, (Granite Rapids): 최대 128 코어 예정\nAmpere Altra Max: 128 코어\n칩렛(Chiplet) 아키텍처로 확장 용이 (AMD의 선도)\n\n메모리 대역폭 향상\nDDR5 지원 (대역폭 2배)\n메모리 채널 수 증가 (12채널)\nCXL(Compute Express Link) 도입\n\n특수 명령어 및 가속기\nAVX-512: 벡터 처리 성능 향상\nAMX (Intel): 행렬 연산 가속\n암호화 가속 (AES-NI, SHA-NI)\nAI 추론 가속\n\n전력 효율\n칩렛 + 고급 공정 (5nm, 3nm)\n다이나믹 전력 관리\nARM 서버 CPU 성장\n\n보안 기능\n메모리 암호화 (TME, SME)\n신뢰 실행 환경 (SGX, SEV)\n사이드 채널 공격 완화\n\nI/O 발전\nPCIe 5.0 (64 GT/s)\nCXL 메모리 확장\n고속 네트워크 통합",
    "references": [
      {
        "title": "AMD EPYC Processors",
        "url": "https://www.amd.com/en/processors/epyc-server-cpu-family"
      },
      {
        "title": "Intel Xeon Scalable",
        "url": "https://www.intel.com/content/www/us/en/products/details/processors/xeon.html"
      }
    ]
  },
  {
    "id": "ARCH-057",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "AVX(Advanced Vector Extensions) 명령어가 무엇이고, 어떤 작업에 유용한가요?",
    "answer": "AVX란\nIntel/AMD의 SIMD 확장 명령어 세트\n하나의 명령어로 여러 데이터 동시 처리\nSSE(128비트) → AVX(256비트) → AVX-512(512비트)\n\nAVX 버전별 특징\n버전   레지스터 크기   동시 처리\n\nAVX   256비트   8 x float, 4 x double\nAVX2   256비트   정수 연산 강화\nAVX-512   512비트   16 x float, 8 x double\n\n유용한 작업\n과학 계산: 행렬 연산, 시뮬레이션\n미디어 처리: 이미지/비디오 인코딩\n머신러닝: 신경망 추론\n암호화: 대량 데이터 암/복호화\n데이터베이스: 벡터화된 쿼리 처리\n\n사용 방법\n\n주의사항 (중요한 트레이드오프)\nAVX-512 클럭 다운: Intel CPU에서 AVX-512 사용 시 코어 주파수 10-20% 하락\n연산 집약적 구간에서만 사용, 지속적 사용 시 오히려 느려질 수 있음\n멀티테넌트 환경에서 다른 워크로드에 영향\n전력 소모 증가 (TDP 초과 가능)\n모든 CPU 지원하지 않음 (Intel 일부 소비자 CPU에서 비활성화)\n실무 가이드: 라이브러리(MKL, OpenBLAS) 활용이 직접 구현보다 효율적",
    "references": [
      {
        "title": "Intel Intrinsics Guide",
        "url": "https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html"
      }
    ]
  },
  {
    "id": "ARCH-058",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "ARM 서버 CPU(예: AWS Graviton)가 x86 대비 어떤 장점이 있나요?",
    "answer": "전력 효율\n와트당 성능 우수 (Graviton3 기준 x86 대비 최대 60% 향상 주장)\n발열 감소로 냉각 비용 절감\nTCO(총소유비용) 절감\n\n비용 효율 (2024-2025 기준)\nAWS Graviton3/4: x86 대비 20-40% 가격 우위\n동일 예산으로 더 많은 컴퓨팅 가능\n\n코어 밀도\nGraviton3: 64 코어, Graviton4: 96 코어\nAmpere Altra Max: 128 코어\n병렬 워크로드에 유리\n\n커스텀 설계\n클라우드 워크로드에 최적화\n불필요한 레거시 기능 제거\nDDR5, PCIe 5.0 조기 도입\n\n적합한 워크로드\n웹 서버, API 서버 (Java, Go, Node.js 등)\n컨테이너, 마이크로서비스\n데이터베이스 (읽기 중심, PostgreSQL/MySQL ARM 빌드 성숙)\n빌드/CI 파이프라인\nAI 추론 (경량 모델)\n\n고려사항 (함정 포인트)\nx86 전용 소프트웨어 호환성 문제\n바이너리 호환 불가 (재컴파일 또는 에뮬레이션 필요)\n일부 상용 소프트웨어 ARM 미지원\n성능 벤치마크의 함정\n벤더 발표 수치는 특정 워크로드에 최적화\n실제 워크로드로 직접 테스트 필수\nJIT 컴파일 언어(Java, .NET)는 대체로 호환\n마이그레이션 전략: 새 워크로드부터 ARM 적용, 레거시는 점진적",
    "references": [
      {
        "title": "AWS Graviton Processors",
        "url": "https://aws.amazon.com/ec2/graviton/"
      },
      {
        "title": "Ampere Computing",
        "url": "https://amperecomputing.com/"
      }
    ]
  },
  {
    "id": "ARCH-059",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "SIMD(Single Instruction Multiple Data)가 무엇이고 어떻게 활용할 수 있나요?",
    "answer": "SIMD란\n하나의 명령어로 여러 데이터를 동시에 처리\n데이터 수준 병렬성 활용\nFlynn의 분류 중 하나\n\n동작 원리\n\n활용 방법\n컴파일러 자동 벡터화\nIntrinsic 함수\n라이브러리 활용\nIntel MKL, OpenBLAS\nnumpy, TensorFlow 내부적으로 사용\n\n적합한 작업\n배열 연산, 행렬 계산\n이미지/신호 처리\n암호화/해싱\n문자열 검색\n\n최적화 팁\n메모리 정렬 (16/32/64바이트)\n루프 언롤링\n데이터 레이아웃 최적화 (SoA vs AoS)",
    "references": [
      {
        "title": "Intel SIMD Programming Guide",
        "url": "https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html"
      }
    ]
  },
  {
    "id": "ARCH-060",
    "category": "architecture",
    "categoryName": "컴퓨터 구조",
    "section": "cs",
    "question": "컴퓨터 구조 관점에서 클라우드 인프라의 특징과 고려사항은 무엇인가요?",
    "answer": "가상화 오버헤드\n하이퍼바이저 계층 추가\nVM exit/enter 비용 (민감 명령어 트랩)\n해결: 하드웨어 가상화(VT-x, VT-d), SR-IOV\n현대 클라우드는 오버헤드 5% 미만으로 최소화\n\n공유 자원 경쟁 (중요한 트레이드오프)\n멀티테넌트 환경에서 CPU, 캐시(LLC), 메모리 대역폭 공유\n노이지 네이버(Noisy Neighbor) 문제: 이웃 VM의 캐시/대역폭 독점\n해결책과 비용:\n  해결책   비용 증가   효과\n  \n  전용 인스턴스   높음   완전 격리\n  전용 호스트   매우 높음   물리 서버 전용\n  스팟 인스턴스   낮음   변동성 수용\n  성능 보장 인스턴스   중간   일정 성능 보장\n\nNUMA 인지 필요성\n대형 VM은 여러 NUMA 노드 걸칠 수 있음\n메모리 지역성 고려한 배치 필요\n클라우드 제공자의 vNUMA 정책 이해 필요\n\n네트워크 성능\n물리 네트워크 공유로 지연 변동\nSR-IOV, DPDK로 커널 바이패스 (10-100배 지연 감소)\n배치 그룹(Placement Group)으로 인접 배치\n\n스토리지 특성과 트레이드오프\n스토리지   지연   지속성   비용\n\n로컬 NVMe   낮음   휘발성   인스턴스 포함\n네트워크 SSD (EBS gp3)   중간   영구   중간\n네트워크 SSD (EBS io2)   낮음   영구   높음\n\n비용 최적화 전략\n적절한 인스턴스 타입 선택 (실측 기반)\nARM 인스턴스 활용 (Graviton): 20-40% 비용 절감\n스팟/프리엠티블 인스턴스: 최대 90% 절감 (중단 허용 워크로드)\n예약 인스턴스/Savings Plans: 장기 워크로드",
    "references": [
      {
        "title": "AWS EC2 Instance Types",
        "url": "https://aws.amazon.com/ec2/instance-types/"
      },
      {
        "title": "Google Cloud Machine Types",
        "url": "https://cloud.google.com/compute/docs/machine-types"
      }
    ]
  },
  {
    "id": "DB-001",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "Key (기본키, 후보키, 슈퍼키 등등...) 에 대해 설명해 주세요.",
    "answer": "슈퍼키(Super Key): 튜플을 유일하게 식별할 수 있는 속성들의 집합입니다.\n\n후보키(Candidate Key): 슈퍼키 중 최소성을 만족하는 키입니다.\n\n기본키(Primary Key): 후보키 중 선택된 대표 키로, NULL을 허용하지 않습니다.\n\n대체키(Alternate Key): 기본키로 선택되지 않은 후보키입니다.\n\n외래키(Foreign Key): 다른 테이블의 기본키를 참조하는 속성입니다.",
    "references": [
      {
        "title": "MySQL PRIMARY KEY",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/constraint-primary-key.html"
      }
    ]
  },
  {
    "id": "DB-002",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "기본키(Primary Key)는 수정이 가능한가요?",
    "answer": "기술적으로 기본키 수정은 가능합니다. 그러나 권장되지 않습니다.\n\n문제점:\n외래키로 참조하는 모든 테이블의 데이터도 함께 수정 필요\nCASCADE 설정 시 연쇄 업데이트 발생으로 성능 저하\n인덱스 재구성 비용 발생\n\n대안: Surrogate Key(대리키)를 사용하여 자연키 변경에 영향받지 않게 설계합니다.",
    "references": [
      {
        "title": "MySQL Foreign Key Constraints",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html"
      }
    ]
  },
  {
    "id": "DB-003",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "MySQL(InnoDB)에서 기본키를 설정하지 않아도 테이블이 만들어집니다. 어떻게 이게 가능한 걸까요?",
    "answer": "InnoDB는 기본키가 없으면 내부적으로 GENCLUSTINDEX라는 숨겨진 클러스터드 인덱스를 생성합니다.\n\n6바이트 크기의 Row ID를 자동 생성하여 각 행을 식별합니다. 하지만 이 값은 사용자가 접근할 수 없어 쿼리 최적화에 활용할 수 없습니다.\n\n권장사항: 명시적으로 기본키를 설정하는 것이 성능과 관리 측면에서 좋습니다.",
    "references": [
      {
        "title": "InnoDB Clustered Index",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html"
      }
    ]
  },
  {
    "id": "DB-004",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "외래키(Foreign Key) 값은 NULL이 들어올 수 있나요?",
    "answer": "네, 가능합니다. 외래키 컬럼에 NOT NULL 제약이 없다면 NULL 값을 가질 수 있습니다.\n\n이는 선택적 관계(Optional Relationship)를 표현할 때 유용합니다. 예를 들어, 직원 테이블에서 부서가 아직 배정되지 않은 경우 부서_id가 NULL일 수 있습니다.",
    "references": [
      {
        "title": "MySQL Foreign Keys",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html"
      }
    ]
  },
  {
    "id": "DB-005",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "어떤 칼럼에 UNIQUE 제약조건이 설정되어 있다고 가정해 봅시다. 이 칼럼을 활용한 쿼리의 성능은 그렇지 않은 것과 비교해서 어떻게 다를까요?",
    "answer": "UNIQUE 제약조건이 설정되면 해당 컬럼에 자동으로 인덱스가 생성됩니다.\n\n성능 향상:\nWHERE 절에서 해당 컬럼 조회 시 인덱스 스캔 가능\n정렬 연산 시 인덱스 활용 가능\n\n추가 비용:\nINSERT/UPDATE 시 중복 체크를 위한 인덱스 검색 발생\n인덱스 유지 비용 증가",
    "references": [
      {
        "title": "MySQL UNIQUE Constraints",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/constraint-unique.html"
      }
    ]
  },
  {
    "id": "DB-006",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "RDB와 NoSQL의 차이에 대해 설명해 주세요.",
    "answer": "구분   RDB   NoSQL\n\n스키마   고정 스키마   유연한 스키마\n확장   수직 확장(Scale-up)   수평 확장(Scale-out)\n트랜잭션   ACID 보장   BASE 특성 (일부 ACID 지원)\n관계   JOIN으로 테이블 연결   비정규화/임베딩\n사용 사례   복잡한 쿼리, 정합성 중요   대용량, 유연한 데이터",
    "references": [
      {
        "title": "MongoDB vs RDBMS",
        "url": "https://www.mongodb.com/docs/manual/reference/sql-comparison/"
      }
    ]
  },
  {
    "id": "DB-007",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "NoSQL의 강점과 약점이 무엇인가요?",
    "answer": "강점:\n수평 확장(Sharding)이 용이\n유연한 스키마로 빠른 개발\n대용량 데이터 처리에 적합\n다양한 데이터 모델 지원 (Document, Key-Value, Graph 등)\n\n약점:\n복잡한 JOIN 연산 어려움\nACID 트랜잭션 지원 제한적\n데이터 일관성 보장이 어려울 수 있음\n표준화된 쿼리 언어 부재",
    "references": [
      {
        "title": "MongoDB Data Modeling",
        "url": "https://www.mongodb.com/docs/manual/core/data-modeling-introduction/"
      }
    ]
  },
  {
    "id": "DB-008",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "RDB의 어떠한 특징 때문에 NoSQL에 비해 부하가 많이 걸릴 \"수\" 있을까요? (주의: 무조건 NoSQL이 RDB보다 빠르다고 생각하면 큰일 납니다!)",
    "answer": "JOIN 연산: 여러 테이블을 조인하면 I/O와 CPU 비용 증가\n\nACID 트랜잭션: 락과 로그 기록으로 오버헤드 발생\n\n정규화된 스키마: 데이터 분산으로 여러 테이블 접근 필요\n\n스키마 변경: ALTER TABLE은 테이블 잠금과 재구성 필요\n\n하지만 NoSQL도 복잡한 쿼리나 일관성이 필요한 경우 RDB보다 느릴 수 있습니다.",
    "references": [
      {
        "title": "MySQL JOIN Optimization",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/join-optimization.html"
      }
    ]
  },
  {
    "id": "DB-009",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "NoSQL을 활용한 경험이 있나요? 있다면, 왜 RDB를 선택하지 않고 해당 DB를 선택했는지 설명해 주세요.",
    "answer": "예시 답변 (Redis 사용 경험):\n\n세션 저장소와 캐시 레이어로 Redis를 사용했습니다.\n\n선택 이유:\n메모리 기반으로 빠른 읽기/쓰기 성능\nTTL 기능으로 세션 만료 자동 관리\nKey-Value 구조가 세션 데이터에 적합\nRDB의 불필요한 오버헤드 회피\n\n예시 답변 (MongoDB 사용 경험):\n스키마가 자주 변경되는 프로토타입 개발\n비정형 로그 데이터 저장",
    "references": [
      {
        "title": "Redis Use Cases",
        "url": "https://redis.io/docs/get-started/"
      }
    ]
  },
  {
    "id": "DB-010",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "트랜잭션이 무엇이고, ACID 원칙에 대해 설명해 주세요.",
    "answer": "트랜잭션: 하나의 논리적 작업 단위를 구성하는 연산들의 집합입니다.\n\nACID 원칙:\nAtomicity(원자성): 트랜잭션의 모든 연산이 완전히 수행되거나, 전혀 수행되지 않아야 합니다.\nConsistency(일관성): 트랜잭션 전후로 데이터베이스가 일관된 상태를 유지해야 합니다.\nIsolation(격리성): 동시에 실행되는 트랜잭션들이 서로 영향을 주지 않아야 합니다.\nDurability(지속성): 완료된 트랜잭션의 결과는 영구적으로 보존되어야 합니다.",
    "references": [
      {
        "title": "MySQL ACID Model",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/mysql-acid.html"
      }
    ]
  },
  {
    "id": "DB-011",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "ACID의 Atomicity(원자성)는 DBMS에서 어떻게 보장되나요? (e.g., Undo/Redo 로그)",
    "answer": "Undo 로그를 통해 원자성을 보장합니다.\n\n트랜잭션 실행 중 변경 전 데이터를 Undo 로그에 기록합니다. 트랜잭션이 실패하거나 ROLLBACK되면 Undo 로그를 사용해 변경 사항을 되돌립니다.\n\n동작 과정:\n변경 전 데이터를 Undo 로그에 기록\n실제 데이터 변경 수행\n실패 시 Undo 로그로 원복",
    "references": [
      {
        "title": "InnoDB Undo Logs",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-undo-logs.html"
      }
    ]
  },
  {
    "id": "DB-012",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "ACID의 Consistency(일관성)는 어떻게 보장되나요?",
    "answer": "일관성은 제약조건과 트리거를 통해 보장됩니다.\n\nDBMS 수준:\nPRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK 제약조건\nNOT NULL 제약조건\n트리거를 통한 비즈니스 규칙 검증\n\n애플리케이션 수준:\n비즈니스 로직에서 데이터 유효성 검증\n트랜잭션 내 모든 연산이 규칙 준수하도록 설계\n\n일관성은 DBMS와 애플리케이션의 협력으로 보장됩니다.",
    "references": [
      {
        "title": "MySQL Data Integrity",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/constraint-foreign-key.html"
      }
    ]
  },
  {
    "id": "DB-013",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "ACID의 Isolation(고립성)은 DBMS에서 어떻게 보장되나요? (e.g., Lock, MVCC)",
    "answer": "Lock 기반:\n공유 락(S-Lock): 읽기 시 사용\n배타 락(X-Lock): 쓰기 시 사용\n락으로 동시 접근 제어\n\nMVCC (Multi-Version Concurrency Control):\n데이터의 여러 버전을 유지\n읽기 작업은 락 없이 스냅샷 읽기\n쓰기와 읽기 간 블로킹 최소화\n\nInnoDB는 MVCC와 락을 함께 사용하여 격리성을 보장합니다.",
    "references": [
      {
        "title": "InnoDB Locking and MVCC",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-multi-versioning.html"
      }
    ]
  },
  {
    "id": "DB-014",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "ACID의 Durability(지속성)를 DBMS는 어떻게 보장하나요? (e.g., WAL, Redo 로그)",
    "answer": "WAL (Write-Ahead Logging) 방식으로 지속성을 보장합니다.\n\n데이터 변경 전 Redo 로그에 먼저 기록합니다. 커밋 시 로그를 디스크에 동기화(fsync)합니다.\n\n장애 복구:\n시스템 장애 발생\n재시작 시 Redo 로그 확인\n커밋된 트랜잭션은 Redo 로그로 재적용\n데이터 일관성 복구",
    "references": [
      {
        "title": "InnoDB Redo Log",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-redo-log.html"
      }
    ]
  },
  {
    "id": "DB-015",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "트랜잭션을 사용해 본 경험이 있나요? 어떤 경우에 사용할 수 있나요?",
    "answer": "사용 사례:\n계좌 이체: A 계좌 출금과 B 계좌 입금이 모두 성공하거나 모두 실패해야 함\n주문 처리: 주문 생성, 재고 감소, 결제 처리가 하나의 단위로 처리\n회원 가입: 사용자 정보 저장, 프로필 생성, 이메일 인증 토큰 생성",
    "references": [
      {
        "title": "MySQL Transaction Statements",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/commit.html"
      }
    ]
  },
  {
    "id": "DB-016",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "읽기(SELECT) 작업에는 트랜잭션을 걸지 않아도 될까요?",
    "answer": "상황에 따라 다릅니다.\n\n트랜잭션이 필요한 경우:\n일관된 스냅샷 읽기가 필요할 때\n여러 SELECT 간 데이터 일관성이 필요할 때\nSELECT 후 UPDATE하는 경우 (SELECT FOR UPDATE)\n\n트랜잭션 없이 가능한 경우:\n단일 SELECT 문\n실시간 최신 데이터가 필요한 경우\n일관성보다 성능이 중요한 경우\n\nMySQL InnoDB는 기본적으로 각 SELECT를 자체 트랜잭션으로 실행합니다(autocommit).",
    "references": [
      {
        "title": "MySQL Consistent Read",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-consistent-read.html"
      }
    ]
  },
  {
    "id": "DB-017",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "트랜잭션 격리 레벨(Isolation Level)에 대해 설명해 주세요.",
    "answer": "격리 수준   Dirty Read   Non-Repeatable Read   Phantom Read\n\nREAD UNCOMMITTED   O   O   O\nREAD COMMITTED   X   O   O\nREPEATABLE READ   X   X   O (InnoDB는 조건부 방지)\nSERIALIZABLE   X   X   X\nDirty Read: 커밋되지 않은 데이터 읽기\nNon-Repeatable Read: 같은 쿼리가 다른 결과 반환\nPhantom Read: 조건에 맞는 행이 추가/삭제됨\n\nMySQL InnoDB 기본값은 REPEATABLE READ입니다.\n\nInnoDB REPEATABLE READ의 Phantom Read 방지 메커니즘:\nConsistent Read (일반 SELECT): 트랜잭션 시작 시점의 스냅샷을 읽어 같은 결과 보장\nLocking Read (SELECT FOR UPDATE/SHARE, UPDATE, DELETE): Gap Lock과 Next-Key Lock으로 범위 내 삽입 차단\n주의: Consistent Read와 Locking Read를 혼용하면 예상치 못한 결과 발생 가능. 완전한 직렬화가 필요하면 SERIALIZABLE 사용 권장",
    "references": [
      {
        "title": "MySQL Transaction Isolation Levels",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-isolation-levels.html"
      }
    ]
  },
  {
    "id": "DB-018",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "모든 DBMS가 4개의 격리 레벨(READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE)을 모두 구현하고 있나요? 그렇지 않다면 그 이유는 무엇일까요?",
    "answer": "아니요, DBMS마다 다릅니다.\nPostgreSQL: READ UNCOMMITTED 요청 시 READ COMMITTED로 동작 (MVCC 아키텍처상 Dirty Read 불가능하므로 별도 구현 불필요)\nOracle: READ COMMITTED와 SERIALIZABLE만 지원 (READ UNCOMMITTED, REPEATABLE READ 미지원)\nSQL Server: 4개 모두 지원 + SNAPSHOT Isolation 추가\nMySQL InnoDB: 4개 모두 지원\n\n이유:\nDBMS별 MVCC 구현 방식 차이로 특정 격리 수준 구현이 불필요하거나 불가능\nPostgreSQL의 경우 MVCC로 인해 항상 커밋된 데이터만 읽으므로 READ UNCOMMITTED의 Dirty Read가 구조적으로 발생하지 않음\n성능과 구현 복잡도 트레이드오프 고려",
    "references": [
      {
        "title": "PostgreSQL Transaction Isolation",
        "url": "https://www.postgresql.org/docs/current/transaction-iso.html"
      }
    ]
  },
  {
    "id": "DB-019",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "MySQL InnoDB 스토리지 엔진에서 Undo 영역과 Redo 영역에 대해 설명해 주세요.",
    "answer": "Undo 영역:\n변경 전 데이터를 저장\nROLLBACK 시 원래 데이터로 복구\nMVCC에서 과거 버전 데이터 제공\n시스템 테이블스페이스 또는 별도 Undo 테이블스페이스에 저장\n\nRedo 영역:\n변경 후 데이터를 순차적으로 기록\nWAL 방식으로 커밋 전 디스크에 기록\n장애 복구 시 커밋된 트랜잭션 재적용\nib_logfile 파일에 저장",
    "references": [
      {
        "title": "InnoDB Undo Logs",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-undo-logs.html"
      }
    ]
  },
  {
    "id": "DB-020",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "MVCC(Multi-Version Concurrency Control)가 무엇이며, InnoDB 스토리지 엔진은 Undo 로그를 사용해 이를 어떻게 구현하나요?",
    "answer": "MVCC: 동시성 제어 기법으로, 데이터의 여러 버전을 유지하여 읽기와 쓰기가 서로 블로킹하지 않게 합니다.\n\nInnoDB 구현:\n\nInnoDB는 각 행에 3개의 숨겨진 필드를 추가합니다:\nDBTRXID (6바이트): 마지막으로 행을 수정한 트랜잭션 ID\nDBROLLPTR (7바이트): Undo 로그의 이전 버전을 가리키는 롤백 포인터\nDBROWID (6바이트): 자동 증가 Row ID (명시적 PK가 없을 때 사용)\n\n동작 과정:\nUPDATE 시 새 버전 생성, 이전 버전은 Undo 로그에 보관\nDBROLLPTR이 이전 버전들을 연결 리스트로 연결\nSELECT 시 트랜잭션의 스냅샷 시점 기준으로 적절한 버전 선택\n트랜잭션 완료 후 불필요한 Undo 로그는 Purge 스레드가 정리\n\n주의: 장시간 트랜잭션은 Undo 로그 정리를 방해하여 롤백 세그먼트 비대화 유발",
    "references": [
      {
        "title": "InnoDB Multi-Versioning",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-multi-versioning.html"
      }
    ]
  },
  {
    "id": "DB-021",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "MySQL에서 스토리지 엔진이 정확히 무엇을 하는 건가요?",
    "answer": "스토리지 엔진: 데이터의 저장, 검색, 업데이트를 담당하는 DBMS의 컴포넌트입니다.\n\n주요 역할:\n데이터를 디스크에 저장하고 읽기\n인덱스 관리\n트랜잭션 처리 (ACID 보장)\n락 관리\n버퍼 관리\n\nMySQL 스토리지 엔진:\nInnoDB: 트랜잭션, 외래키 지원 (기본값)\nMyISAM: 빠른 읽기, 트랜잭션 미지원\nMemory: 메모리 기반, 임시 데이터용",
    "references": [
      {
        "title": "MySQL Storage Engines",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/storage-engines.html"
      }
    ]
  },
  {
    "id": "DB-022",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "인덱스가 무엇이고, 언제 사용하는지 설명해 주세요.",
    "answer": "인덱스: 테이블의 검색 속도를 향상시키기 위한 자료구조입니다. 책의 색인처럼 원하는 데이터의 위치를 빠르게 찾을 수 있게 합니다.\n\n장점 (읽기 성능):\nWHERE 조건 검색 속도 향상 (O(N) -> O(log N))\nJOIN 성능 향상\nORDER BY/GROUP BY 정렬 비용 제거\n커버링 인덱스로 테이블 접근 없이 쿼리 완료 가능\n\n단점 (쓰기 비용):\nINSERT: 데이터 + 인덱스 추가, B-Tree 분할 가능\nUPDATE: 인덱스 키 변경 시 삭제 + 추가 발생\nDELETE: 인덱스 엔트리 삭제 (실제로는 delete-mark)\n추가 저장 공간 필요\n\n인덱스 사용이 효과적인 경우:\n카디널리티(고유값 수)가 높은 컬럼\n선택도(Selectivity)가 낮은 조건 (소수의 행만 반환)\n읽기가 쓰기보다 빈번한 테이블\n\n인덱스가 비효율적인 경우:\n데이터가 매우 적은 테이블 (Full Scan이 더 빠름)\nINSERT/UPDATE/DELETE가 매우 빈번한 테이블\n카디널리티가 낮은 컬럼 (성별 등)",
    "references": [
      {
        "title": "MySQL Index Optimization",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html"
      }
    ]
  },
  {
    "id": "DB-023",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "일반적으로 인덱스는 수정(INSERT, UPDATE, DELETE)이 잦은 테이블에선 사용하지 않기를 권합니다. 왜 그럴까요?",
    "answer": "인덱스 유지 비용이 발생하기 때문입니다.\nINSERT: 새 데이터에 대한 인덱스 엔트리 추가, B-Tree 재조정 가능\nUPDATE: 인덱스 키 값 변경 시 기존 엔트리 삭제 + 새 엔트리 추가\nDELETE: 인덱스 엔트리 삭제, B-Tree 재조정 가능\n\n인덱스가 많을수록 쓰기 작업의 오버헤드가 증가합니다. 읽기 성능 향상과 쓰기 성능 저하 간 트레이드오프를 고려해야 합니다.",
    "references": [
      {
        "title": "MySQL Index Maintenance",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-online-ddl-operations.html"
      }
    ]
  },
  {
    "id": "DB-024",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "인덱스가 없는 컬럼을 수정할 때도 INSERT/UPDATE/DELETE 시 인덱스 유지 비용이 발생하나요?",
    "answer": "부분적으로 맞습니다. 해당 컬럼에 대한 인덱스 유지 비용은 없지만, 다른 비용이 발생할 수 있습니다.\n\n인덱스가 없는 컬럼 수정 시:\n해당 컬럼에 대한 B-Tree 재조정 불필요\n해당 컬럼에 대한 인덱스 I/O 없음\n\n그러나 발생할 수 있는 비용:\nINSERT: 다른 인덱스들(PK, FK 등)의 유지 비용은 여전히 발생\nUPDATE: 행 자체를 찾기 위해 다른 인덱스나 Full Scan 필요\nClustered Index(InnoDB PK): 데이터가 PK 순서로 저장되므로 행 위치 변경 시 이동 비용 발생 가능\n\n핵심 포인트:\n\"인덱스가 없는 컬럼\"의 수정은 그 컬럼에 대한 인덱스 비용만 없음\n테이블의 다른 인덱스 유지 비용은 INSERT/DELETE 시 여전히 발생\n인덱스 설계 시 읽기/쓰기 패턴을 분석하여 적절한 균형 필요",
    "references": [
      {
        "title": "MySQL Query Optimization",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/query-optimization.html"
      }
    ]
  },
  {
    "id": "DB-025",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "ORDER BY / GROUP BY 연산의 동작 과정을 인덱스의 존재 여부와 연관지어서 설명해 주세요.",
    "answer": "인덱스가 있는 경우:\n이미 정렬된 인덱스를 순회하여 결과 반환\n추가 정렬 작업 불필요 (Filesort 회피)\n메모리와 CPU 사용 최소화\n\n인덱스가 없는 경우:\n전체 데이터를 읽어 메모리에서 정렬 (Filesort)\n데이터가 크면 디스크 임시 파일 사용\n성능 저하 발생\n\nEXPLAIN으로 \"Using filesort\"가 표시되면 인덱스를 활용하지 못한 것입니다.",
    "references": [
      {
        "title": "MySQL ORDER BY Optimization",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/order-by-optimization.html"
      }
    ]
  },
  {
    "id": "DB-026",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "기본키는 인덱스라고 할 수 있을까요? 그렇지 않다면, 인덱스와 기본키는 어떤 차이가 있나요?",
    "answer": "기본키는 자동으로 인덱스가 생성됩니다.\n\n차이점:\n\n구분   기본키   인덱스\n\n목적   행 식별   검색 속도 향상\nNULL   불가   가능 (UNIQUE 제외)\n개수   테이블당 1개   여러 개 가능\n종류   Clustered Index   Non-Clustered 가능\n\nInnoDB에서 기본키는 Clustered Index로, 데이터가 기본키 순서로 물리적으로 저장됩니다.",
    "references": [
      {
        "title": "InnoDB Clustered Index",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html"
      }
    ]
  },
  {
    "id": "DB-027",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "외래키에도 인덱스가 자동으로 생성되나요?",
    "answer": "네, InnoDB는 외래키 컬럼에 인덱스가 없으면 자동으로 생성합니다.\n\nMySQL 공식 문서에 따르면: \"MySQL requires indexes on foreign keys and referenced keys so that foreign key checks can be fast and not require a table scan.\"\n\n자동 생성 조건:\n외래키 컬럼이 인덱스의 첫 번째 컬럼으로 포함되어야 함\n이미 적합한 인덱스가 있으면 새로 생성하지 않음\n나중에 더 적합한 인덱스가 생성되면 자동 생성된 인덱스는 삭제될 수 있음\n\n인덱스가 필요한 이유:\n참조 무결성 검사 시 부모 테이블 조회 필요\nON DELETE/UPDATE CASCADE 처리 시 빠른 검색\n인덱스 없이는 Full Table Scan 발생",
    "references": [
      {
        "title": "MySQL Foreign Key Constraints",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html"
      }
    ]
  },
  {
    "id": "DB-028",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "인덱스가 데이터의 물리적 저장에도 영향을 미치나요? (e.g., Clustered Index vs Non-Clustered Index)",
    "answer": "Clustered Index는 물리적 저장에 영향을 미칩니다.\n\nClustered Index:\n테이블 데이터가 인덱스 키 순서로 물리적으로 저장\n테이블당 1개만 존재\nInnoDB에서 기본키가 Clustered Index\n\nNon-Clustered Index (Secondary Index):\n별도 공간에 인덱스 저장\n실제 데이터 위치를 가리키는 포인터 보유\n여러 개 생성 가능\n\nInnoDB의 Secondary Index는 기본키 값을 저장하여 Clustered Index를 다시 탐색합니다.",
    "references": [
      {
        "title": "InnoDB Index Types",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html"
      }
    ]
  },
  {
    "id": "DB-029",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "NoSQL(ex. Redis, MongoDB 등)도 인덱스를 갖고 있나요? 만약 있다면, RDB의 인덱스와는 어떤 차이가 있을까요?",
    "answer": "네, NoSQL도 인덱스를 지원합니다.\n\nMongoDB:\nB-Tree 인덱스 사용 (RDB와 유사)\n복합 인덱스, 해시 인덱스, 지리공간 인덱스 지원\n문서의 중첩 필드에도 인덱스 가능\n\nRedis:\nKey 자체가 해시 기반 인덱스\nSorted Set으로 범위 쿼리용 인덱스 구현\nSecondary Index는 직접 구현 필요\n\n차이점:\nNoSQL은 스키마리스로 인덱스 설계가 유연\n분산 환경에서 인덱스 관리 방식 다름",
    "references": [
      {
        "title": "MongoDB Indexes",
        "url": "https://www.mongodb.com/docs/manual/indexes/"
      }
    ]
  },
  {
    "id": "DB-030",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "(A, B) 컬럼 순서로 복합 인덱스를 설정한 테이블에서, WHERE A=... 조건 없이 WHERE B=... 조건만 사용하여 쿼리를 요청했습니다. 해당 쿼리는 인덱스를 탈까요?",
    "answer": "일반적으로 효율적인 인덱스 사용이 불가능합니다.\n\n복합 인덱스는 첫 번째 컬럼부터 순차적으로 정렬됩니다. (A, B) 인덱스는 A로 먼저 정렬되고, 같은 A 값 내에서 B로 정렬됩니다.\n\nWHERE B=... 만 사용하면:\nB 값이 여러 A 값에 분산되어 있음\n인덱스 Range Scan 불가능\n옵티마이저 선택:\nIndex Full Scan: 인덱스 전체를 순회 (테이블보다 작으면 유리)\nFull Table Scan: 인덱스 무시\n\n함정 주의:\n\"인덱스를 탄다/안 탄다\"는 이분법적 표현보다 \"어떻게 사용되는지\"가 중요합니다.\nIndex Full Scan도 기술적으로는 \"인덱스를 사용\"하지만 Range Scan만큼 효율적이지 않음\n\n해결책:\nB 컬럼만을 위한 별도 인덱스 생성\n쿼리 패턴에 맞게 (B, A) 순서의 복합 인덱스 추가",
    "references": [
      {
        "title": "MySQL Multiple-Column Indexes",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/multiple-column-indexes.html"
      }
    ]
  },
  {
    "id": "DB-031",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "복합 컬럼 인덱스(Composite Index)의 작동 방식은 무엇이며, 어떤 컬럼을 인덱스의 앞 순서로 두는 것이 성능에 유리할까요?",
    "answer": "작동 방식:\nB-Tree에서 첫 번째 컬럼으로 정렬 후, 같은 값 내에서 두 번째 컬럼으로 정렬됩니다. (A, B, C) 인덱스는 A → B → C 순으로 다단계 정렬됩니다.\n\n앞 순서에 두면 유리한 컬럼:\n동등 조건(=)으로 자주 검색되는 컬럼\n카디널리티가 높은 컬럼 (고유값이 많은 컬럼)\n범위 조건은 뒤에 배치 (범위 이후 컬럼은 인덱스 활용 불가)\n\n예시: WHERE status = 'active' AND createdat > '2024-01-01'\n→ (status, createdat) 순서가 효율적",
    "references": [
      {
        "title": "MySQL Composite Index",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/multiple-column-indexes.html"
      }
    ]
  },
  {
    "id": "DB-032",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "B-Tree와 B+Tree에 대해 설명해 주세요.",
    "answer": "B-Tree:\n균형 잡힌 트리 구조로 모든 리프 노드가 같은 깊이\n각 노드에 키와 데이터를 함께 저장\n검색, 삽입, 삭제 모두 O(log N)\n\nB+Tree:\nB-Tree의 변형으로 데이터는 리프 노드에만 저장\n내부 노드는 키만 저장 → 더 많은 키 저장 가능\n리프 노드가 연결 리스트로 연결 → 범위 검색 효율적\n대부분의 RDBMS가 B+Tree 사용",
    "references": [
      {
        "title": "InnoDB Index Structures",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-physical-structure.html"
      }
    ]
  },
  {
    "id": "DB-033",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "데이터베이스 인덱스에서 B+Tree가 B-Tree에 비해 반드시 좋다고 할 수 있나요? 그렇지 않다면 어떤 단점이 있나요?",
    "answer": "B+Tree의 단점:\n단일 키 검색 시 추가 I/O: 데이터가 리프에만 있어 항상 리프까지 탐색 필요 (B-Tree는 중간에서 찾을 수 있음)\n저장 공간: 키가 내부 노드와 리프에 중복 저장될 수 있음\n삽입/삭제 복잡도: 리프 노드 연결 리스트 유지 비용\n\nB-Tree가 유리한 경우:\n특정 키를 정확히 찾는 단일 검색이 대부분인 경우\n메모리 기반 인덱스 (디스크 I/O 고려 불필요)",
    "references": [
      {
        "title": "Database Index Structures",
        "url": "https://use-the-index-luke.com/sql/anatomy/the-tree"
      }
    ]
  },
  {
    "id": "DB-034",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "DB 인덱스에서 Red-Black Tree를 사용하지 않고, B-Tree/B+Tree를 사용하는 이유가 있을까요?",
    "answer": "디스크 I/O 최적화 때문입니다.\n\nRed-Black Tree:\n이진 트리로 노드당 자식 2개\n트리 높이가 높음 → 디스크 접근 횟수 증가\n메모리 기반 자료구조에 적합\n\nB-Tree/B+Tree:\n다진 트리로 노드당 자식 수백~수천 개\n트리 높이가 낮음 (보통 3~4)\n한 번의 디스크 읽기로 많은 키 비교 가능\n디스크 블록 크기에 최적화\n\n100만 건 데이터: Red-Black Tree는 20번, B+Tree는 3~4번 디스크 접근",
    "references": [
      {
        "title": "Why B-Tree for Databases",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-physical-structure.html"
      }
    ]
  },
  {
    "id": "DB-035",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "오름차순으로 정렬된 B-Tree/B+Tree 인덱스가 있을 때, ORDER BY ... DESC(내림차순) 정렬을 시도할 경우 성능이 어떻게 될까요?",
    "answer": "역방향 스캔(Backward Index Scan)으로 처리되어 filesort 없이 가능합니다.\n\nInnoDB의 B+Tree 리프 노드는 양방향 연결 리스트로 구성되어 있어:\n오름차순: 왼쪽 → 오른쪽 순회\n내림차순: 오른쪽 → 왼쪽 순회 (Backward Index Scan)\n\nEXPLAIN에서 확인: Extra 컬럼에 Backward index scan 표시\n\n성능 고려사항:\n역방향 스캔은 정방향보다 약간 느릴 수 있음 (CPU 캐시 프리페칭 효율 저하)\n대부분의 경우 성능 차이는 미미함\n\n복합 인덱스 주의사항:\n(A ASC, B ASC) 인덱스에서 ORDER BY A DESC, B DESC는 역방향 스캔으로 가능\nORDER BY A DESC, B ASC는 방향이 혼합되어 인덱스 활용 불가\nMySQL 8.0 해결책: Descending Index 지원으로 (A DESC, B ASC) 형태로 인덱스 정의 가능",
    "references": [
      {
        "title": "MySQL Descending Indexes",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/descending-indexes.html"
      }
    ]
  },
  {
    "id": "DB-036",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "위도, 경도와 같은 2D/3D 공간 좌표(Spatial Data)는 B-Tree로 인덱싱하기 어렵습니다. 이런 데이터는 어떤 자료구조(e.g., R-Tree, Geohash)를 사용하며 어떻게 동작하나요?",
    "answer": "R-Tree:\n다차원 공간 데이터를 위한 트리 구조\n최소 경계 사각형(MBR)으로 공간 객체 그룹화\n\"반경 N km 내 검색\" 같은 쿼리에 효율적\nMySQL SPATIAL INDEX가 R-Tree 사용\n\nGeohash:\n2D 좌표를 1D 문자열로 인코딩\n가까운 위치는 유사한 prefix를 가짐\nB-Tree 인덱스로 범위 검색 가능\nRedis, MongoDB 등에서 활용",
    "references": [
      {
        "title": "MySQL Spatial Indexes",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/creating-spatial-indexes.html"
      }
    ]
  },
  {
    "id": "DB-037",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "DB Join이 무엇인지 설명하고, 각각의 종류(INNER, LEFT/RIGHT OUTER, FULL OUTER 등)에 대해 설명해 주세요.",
    "answer": "JOIN: 두 개 이상의 테이블을 연결하여 데이터를 조회하는 연산입니다.\n\n종류:\nINNER JOIN: 양쪽 테이블에서 조건이 일치하는 행만 반환\nLEFT OUTER JOIN: 왼쪽 테이블의 모든 행 + 오른쪽 매칭 행 (없으면 NULL)\nRIGHT OUTER JOIN: 오른쪽 테이블의 모든 행 + 왼쪽 매칭 행 (없으면 NULL)\nFULL OUTER JOIN: 양쪽 테이블의 모든 행 반환 (MySQL은 UNION으로 구현)\nCROSS JOIN: 카테시안 곱, 모든 조합 반환",
    "references": [
      {
        "title": "MySQL JOIN Syntax",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/join.html"
      }
    ]
  },
  {
    "id": "DB-038",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "조인(JOIN) 시 드라이빙 테이블(Driving Table)과 드리븐 테이블(Driven Table)은 무엇이며, 옵티마이저는 이 순서를 어떻게 결정하나요?",
    "answer": "드라이빙 테이블: JOIN에서 먼저 접근하는 테이블 (외부 루프)\n드리븐 테이블: 드라이빙 테이블의 각 행에 대해 조회되는 테이블 (내부 루프)\n\n옵티마이저 결정 기준:\n테이블 크기 (작은 테이블을 드라이빙으로)\n인덱스 유무 (드리븐 테이블에 인덱스가 있으면 유리)\nWHERE 조건으로 필터링 가능한 행 수\n통계 정보 기반 비용 계산\n\n힌트로 제어:",
    "references": [
      {
        "title": "MySQL Join Optimization",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/nested-loop-joins.html"
      }
    ]
  },
  {
    "id": "DB-039",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "JOIN은 시간이 오래 걸릴 수 있어 내부적으로 다양한 물리적 조인(Physical Join) 방식을 사용합니다. Nested Loop Join, Sort Merge Join, Hash Join에 대해 설명해 주세요.",
    "answer": "Nested Loop Join:\n외부 테이블의 각 행에 대해 내부 테이블 전체 스캔\n인덱스가 있으면 효율적\n소규모 테이블이나 인덱스 있을 때 적합\n\nSort Merge Join:\n양쪽 테이블을 조인 키로 정렬\n정렬된 데이터를 순차적으로 병합\n이미 정렬된 대용량 데이터에 효율적\n\nHash Join:\n작은 테이블로 해시 테이블 생성 (Build Phase)\n큰 테이블을 스캔하며 해시 테이블 조회 (Probe Phase)\n인덱스 없는 대용량 동등 조인에 효율적\nMySQL 8.0.18부터 지원, 8.0.20부터 Block Nested Loop 대체\n메모리 초과 시 디스크로 스필(spill)\n\nMySQL 8.0.20 이후:\nEqui-join뿐 아니라 non-equi-join, outer join, semijoin, antijoin에도 Hash Join 적용\nEXPLAIN에서 Using join buffer (hash join) 확인",
    "references": [
      {
        "title": "MySQL Hash Join",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/hash-joins.html"
      }
    ]
  },
  {
    "id": "DB-040",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "JOIN의 성능도 인덱스의 유무에 영향을 받나요? 특히 Nested Loop Join과 연관지어 설명해 주세요.",
    "answer": "네, 인덱스는 JOIN 성능에 큰 영향을 미칩니다.\n\nNested Loop Join에서:\n\n인덱스 없는 경우:\n드라이빙 테이블 N행 × 드리븐 테이블 M행 = N×M 비교\n시간 복잡도: O(N×M)\n\n인덱스 있는 경우:\n드라이빙 테이블 N행 × 인덱스 탐색 O(log M)\n시간 복잡도: O(N × log M)\n\n권장사항:\n드리븐 테이블의 조인 컬럼에 인덱스 생성\n외래키 컬럼에 인덱스 필수",
    "references": [
      {
        "title": "MySQL Index for JOIN",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/table-scan-avoidance.html"
      }
    ]
  },
  {
    "id": "DB-041",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "3중 조인부터는 동작 방식이 약간 바뀝니다. 어떻게 동작하는지, 그리고 그 방식이 성능에 어떠한 영향을 주는지 설명해 주세요.",
    "answer": "3중 이상 조인의 동작:\n첫 번째 테이블(A)과 두 번째 테이블(B) 조인\n결과와 세 번째 테이블(C) 조인\n각 단계에서 중간 결과셋 생성\n\n성능 영향:\n조인 순서가 중요: 조인 순서에 따라 중간 결과 크기가 달라짐\n옵티마이저의 역할: N개 테이블 조인 시 N! 가지 순서를 비용 기반으로 선택\n중간 결과 최소화: 필터링이 잘 되는 테이블을 먼저 조인\n\n최적화:\n조인 순서 힌트 사용\n각 조인 컬럼에 인덱스 확보\n서브쿼리보다 JOIN 선호",
    "references": [
      {
        "title": "MySQL Optimizing Multi-Join",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/multiple-table-optimization.html"
      }
    ]
  },
  {
    "id": "DB-042",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "트랜잭션 상황에서의 Deadlock (교착 상태) 상황과, 이를 해결하기 위한 방법에 대해 설명해 주세요.",
    "answer": "Deadlock: 두 개 이상의 트랜잭션이 서로가 가진 락을 기다리며 무한 대기하는 상태\n\n예시:\nT1: A 락 획득 → B 락 대기\nT2: B 락 획득 → A 락 대기\n\n해결 방법:\n예방: 락 획득 순서를 일관되게 정의\n탐지: DBMS가 주기적으로 대기 그래프 검사\n해제: Deadlock 발견 시 한 트랜잭션을 ROLLBACK\n타임아웃: 일정 시간 대기 후 포기\n\nInnoDB는 자동으로 Deadlock을 탐지하고 비용이 적은 트랜잭션을 롤백합니다.",
    "references": [
      {
        "title": "InnoDB Deadlocks",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-deadlocks.html"
      }
    ]
  },
  {
    "id": "DB-043",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "DB Locking에 대해 설명해 주세요.",
    "answer": "Locking: 동시성 제어를 위해 데이터에 대한 접근을 제한하는 메커니즘\n\n락 단위:\n테이블 락: 테이블 전체 잠금 (MyISAM)\n행 락: 특정 행만 잠금 (InnoDB)\n페이지 락: 디스크 페이지 단위 잠금\n\n락 유형:\n공유 락(S): 읽기 허용, 쓰기 차단\n배타 락(X): 읽기/쓰기 모두 차단\n\nInnoDB 특수 락:\nRecord Lock: 특정 인덱스 레코드만 잠금\nGap Lock: 인덱스 레코드 사이의 \"간격\"만 잠금 (삽입 방지용, 순수하게 억제적)\nNext-Key Lock: Record Lock + Gap Lock 조합 (레코드 + 그 앞의 간격)\n\nNext-Key Lock 동작 예시:\n인덱스에 10, 11, 13, 20 값이 있을 때 Next-Key Lock 범위:\n(-inf, 10], (10, 11], (11, 13], (13, 20], (20, +inf)\n\nREPEATABLE READ에서 기본적으로 Next-Key Lock을 사용하여 Phantom Read 방지",
    "references": [
      {
        "title": "InnoDB Locking",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html"
      }
    ]
  },
  {
    "id": "DB-044",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "공유 락(Shared Lock, S-Lock)과 배타 락(Exclusive Lock, X-Lock)의 차이점은 무엇이며, 언제 각각 사용되나요?",
    "answer": "공유 락(S-Lock):\n다른 트랜잭션의 읽기 허용\n다른 트랜잭션의 쓰기 차단\nSELECT ... FOR SHARE 또는 LOCK IN SHARE MODE\n데이터를 읽으면서 변경 방지할 때 사용\n\n배타 락(X-Lock):\n다른 트랜잭션의 읽기/쓰기 모두 차단\nSELECT ... FOR UPDATE, INSERT, UPDATE, DELETE\n데이터 변경 시 사용\n\n요청/보유   S-Lock   X-Lock\n\nS-Lock   호환   충돌\nX-Lock   충돌   충돌",
    "references": [
      {
        "title": "InnoDB Lock Modes",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-lock-modes.html"
      }
    ]
  },
  {
    "id": "DB-045",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "Optimistic Lock(낙관적 락)과 Pessimistic Lock(비관적 락)에 대해 설명해 주세요.",
    "answer": "비관적 락(Pessimistic Lock):\n충돌이 발생할 것이라 가정\n데이터 접근 시 즉시 락 획득\nSELECT FOR UPDATE 사용\n충돌이 잦은 환경에 적합\n\n낙관적 락(Optimistic Lock):\n충돌이 드물다고 가정\n락 없이 작업 후 커밋 시 충돌 검사\nversion 컬럼이나 timestamp로 구현\n충돌 시 재시도 필요\n\n트레이드오프:\n\n관점   비관적 락   낙관적 락\n\n동시성   낮음 (블로킹)   높음 (논블로킹)\n충돌 처리   미리 방지   사후 감지\n적합 상황   충돌 빈번   충돌 드묾\n데드락   가능성 있음   없음\n구현   DB 수준   애플리케이션 수준",
    "references": [
      {
        "title": "JPA Optimistic Locking",
        "url": "https://docs.oracle.com/javaee/7/tutorial/persistence-locking.htm"
      }
    ]
  },
  {
    "id": "DB-046",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "물리적인 Lock을 건 상태에서, 요청에 문제가 생겨 비정상 종료되면 Lock이 영원히 해제되지 않는 문제가 생길 수 있습니다. DB는 이를 위한 해결책이 있나요?",
    "answer": "DBMS의 해결책:\n커넥션 타임아웃: 비정상 연결 감지 시 자동 롤백 및 락 해제\n락 타임아웃: innodblockwait_timeout 설정으로 대기 시간 제한\n트랜잭션 롤백: 비정상 종료 시 자동 롤백으로 락 해제\nDeadlock Detection: 교착 상태 감지 시 자동 해제\n\n애플리케이션 레벨:\n트랜잭션 타임아웃 설정\ntry-finally로 명시적 롤백/커밋 보장\nConnection Pool의 유효성 검사",
    "references": [
      {
        "title": "MySQL Lock Wait Timeout",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/innodb-parameters.html#sysvar_innodb_lock_wait_timeout"
      }
    ]
  },
  {
    "id": "DB-047",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "DB 옵티마이저의 RBO(Rule-Based Optimizer)와 CBO(Cost-Based Optimizer) 의 차이점은 무엇인가요?",
    "answer": "RBO (Rule-Based Optimizer):\n미리 정의된 규칙에 따라 실행 계획 결정\n인덱스가 있으면 무조건 사용\n통계 정보 미사용\n예측 가능하지만 유연성 부족\n현재 대부분 사용하지 않음\n\nCBO (Cost-Based Optimizer):\n통계 정보 기반 비용 계산\n여러 실행 계획 중 최소 비용 선택\n테이블 크기, 인덱스 선택도 등 고려\nMySQL, PostgreSQL, Oracle 모두 CBO 사용\n\nCBO의 판단 요소:\n디스크 I/O 비용\nCPU 비용\n네트워크 비용",
    "references": [
      {
        "title": "MySQL Query Optimizer",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/query-optimization.html"
      }
    ]
  },
  {
    "id": "DB-048",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "쿼리가 어떤 조인 방식이나 인덱스를 사용하는지(실행 계획) 어떻게 알 수 있나요? (e.g., EXPLAIN)",
    "answer": "EXPLAIN 명령어를 사용합니다.\n\n주요 출력 항목:\ntype: 접근 방식 (ALL, index, range, ref, const)\npossible_keys: 사용 가능한 인덱스\nkey: 실제 사용된 인덱스\nrows: 예상 검색 행 수\nExtra: 추가 정보 (Using index, Using filesort 등)\n\nEXPLAIN FORMAT=JSON: 더 상세한 정보 제공",
    "references": [
      {
        "title": "MySQL EXPLAIN Output",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/explain-output.html"
      }
    ]
  },
  {
    "id": "DB-049",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "쿼리 실행 계획을 볼 때 EXPLAIN과 ANALYZE(혹은 EXPLAIN ANALYZE)의 차이점은 무엇인가요?",
    "answer": "EXPLAIN:\n실제 쿼리를 실행하지 않음\n옵티마이저의 예상 실행 계획 표시\n예상 행 수, 예상 비용 제공\n빠르게 확인 가능\n\nEXPLAIN ANALYZE:\n실제 쿼리를 실행\n실제 실행 시간, 실제 행 수 표시\n예상과 실제의 차이 확인 가능\n성능 병목 정확히 파악\n\nMySQL 8.0.18부터 지원, PostgreSQL은 오래전부터 지원",
    "references": [
      {
        "title": "MySQL EXPLAIN ANALYZE",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/explain.html#explain-analyze"
      }
    ]
  },
  {
    "id": "DB-050",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "Table Full Scan과 Index Range Scan에 대해 설명해 주세요.",
    "answer": "Table Full Scan:\n테이블의 모든 행을 순차적으로 읽음\n인덱스를 사용하지 않음\nEXPLAIN에서 type: ALL\n대용량 테이블에서 성능 저하\n\nIndex Range Scan:\n인덱스의 특정 범위만 스캔\nWHERE 절의 범위 조건 (<, >, BETWEEN, LIKE 'abc%')\nEXPLAIN에서 type: range\n필요한 데이터만 읽어 효율적\n\n그 외 스캔 방식:\nIndex Full Scan: 인덱스 전체 스캔\nIndex Unique Scan: 유일한 값 검색 (type: const, eq_ref)",
    "references": [
      {
        "title": "MySQL EXPLAIN Type",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/explain-output.html#explain-join-types"
      }
    ]
  },
  {
    "id": "DB-051",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "인덱스가 존재하는 컬럼을 조건으로 사용했음에도 옵티마이저가 Table Full Scan을 선택하는 경우가 있습니다. 왜 그럴까요?",
    "answer": "옵티마이저가 Full Scan이 더 효율적이라고 판단하기 때문입니다.\n\n주요 원인:\n선택도가 낮은 경우: 전체 데이터의 많은 비율(보통 20% 이상)을 읽어야 할 때\n테이블이 작은 경우: 인덱스 탐색 비용이 Full Scan보다 클 때\n통계 정보 부정확: ANALYZE TABLE로 갱신 필요\n인덱스 컬럼에 함수 적용: WHERE YEAR(created_at) = 2024\n타입 불일치: 암시적 형변환 발생\n\n확인 방법: EXPLAIN으로 type과 rows 확인",
    "references": [
      {
        "title": "MySQL Index Hints",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/index-hints.html"
      }
    ]
  },
  {
    "id": "DB-052",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "COUNT(개수를 세는 쿼리)는 어떻게 동작하나요? COUNT(1), COUNT(*), COUNT(column)의 동작 과정에는 차이가 있나요?",
    "answer": "*COUNT(\\):\n모든 행의 개수를 셈 (NULL 포함)\n옵티마이저가 가장 작은 인덱스 선택하여 효율화\nInnoDB는 실제 행을 카운트 (MyISAM과 다름)\n\nCOUNT(1):*\nCOUNT()와 완전히 동일하게 동작\nMySQL 공식 문서: \"InnoDB handles SELECT COUNT(\\) and SELECT COUNT(1) operations in the same way. There is no performance difference.\"\n\nCOUNT(column):\n해당 컬럼이 NULL이 아닌 행만 카운트\nNULL 체크 로직이 추가되어 COUNT(\\)보다 느릴 수 있음\n해당 컬럼에 인덱스가 있으면 활용\n\n성능 비교: COUNT(\\) = COUNT(1) >= COUNT(column)\n\nMyISAM vs InnoDB:\nMyISAM: 테이블의 행 수를 메타데이터로 저장하여 WHERE 없는 COUNT(\\*)가 O(1)\nInnoDB: MVCC로 인해 트랜잭션별로 보이는 행이 다르므로 실제 스캔 필요",
    "references": [
      {
        "title": "MySQL COUNT Function",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_count"
      }
    ]
  },
  {
    "id": "DB-053",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "RDBMS, NoSQL에서의 클러스터링/레플리케이션 방식에 대해 설명해 주세요.",
    "answer": "RDBMS:\nMaster-Slave 레플리케이션: Master에서 쓰기, Slave에서 읽기\nMaster-Master: 양쪽에서 쓰기 가능 (충돌 관리 필요)\nMySQL Group Replication: 동기식 복제\n\nNoSQL:\nMongoDB Replica Set: Primary-Secondary 구조, 자동 failover\nRedis Cluster: 데이터 샤딩 + 레플리케이션\nCassandra: 링 구조, 모든 노드가 동등\n\n차이점:\nRDBMS: 일관성 중시, 동기/비동기 복제\nNoSQL: 가용성 중시, 최종적 일관성 허용",
    "references": [
      {
        "title": "MySQL Replication",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/replication.html"
      }
    ]
  },
  {
    "id": "DB-054",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "분산 환경에서 트랜잭션을 어떻게 관리할 수 있을까요? (e.g., 2PC, Saga)",
    "answer": "2PC (Two-Phase Commit):\nPrepare 단계: 코디네이터가 모든 참여자에게 커밋 준비 요청\nCommit 단계: 모든 참여자가 준비되면 커밋, 하나라도 실패하면 롤백\n강한 일관성 보장\n\n2PC 단점:\n블로킹 문제: Prepare 후 코디네이터 장애 시 참여자들이 무한 대기\n성능 저하 (동기식 처리)\n단일 장애점(코디네이터)\n\nSaga Pattern:\n로컬 트랜잭션들의 연속\n실패 시 보상 트랜잭션(Compensating Transaction) 실행\nChoreography: 이벤트 기반, 각 서비스가 독립적으로 반응\nOrchestration: 중앙 조정자(Orchestrator)가 흐름 제어\n\nSaga 단점:\n보상 트랜잭션 설계 복잡\n최종적 일관성(Eventual Consistency)만 보장\n롤백이 비즈니스 로직 수준 (완벽한 원복 어려울 수 있음)\n\n선택 기준:\n\n요구사항   권장 방식\n\n강한 일관성 필수   2PC\n높은 가용성/성능   Saga\n마이크로서비스   Saga (선호)\n단일 DB 연결   로컬 트랜잭션",
    "references": [
      {
        "title": "MySQL XA Transactions",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/xa.html"
      }
    ]
  },
  {
    "id": "DB-055",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "레플리케이션 환경에서 슬레이브 데이터 동기화 전까지의 데이터 정합성을 지키는 방법은 무엇이 있을까요?",
    "answer": "방법:\n동기식 복제(Semi-Sync Replication):\n최소 하나의 Slave가 로그 수신 확인 후 커밋\n약간의 지연 발생하지만 데이터 손실 방지\nRead-After-Write 라우팅:\n쓰기 직후 읽기는 Master로 라우팅\n일정 시간 후 Slave로 라우팅\nGTID 기반 읽기:\nGlobal Transaction ID로 복제 위치 추적\n특정 트랜잭션이 복제될 때까지 대기\nProxySQL 등 프록시 활용:\n복제 지연 모니터링\n지연이 큰 Slave 제외",
    "references": [
      {
        "title": "MySQL Semi-Sync Replication",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/replication-semisync.html"
      }
    ]
  },
  {
    "id": "DB-056",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "DB를 분산해서 관리해야 한다면, 레플리케이션 방식과 샤딩 방식 중 어떤 것을 선택하겠습니까? 각 방식의 특징과 적합한 상황을 설명해 주세요.",
    "answer": "상황에 따라 선택합니다.\n\n레플리케이션 선택:\n읽기 트래픽이 많고 쓰기가 적을 때\n고가용성이 중요할 때\n데이터 크기가 단일 서버에 적합할 때\n구현/운영이 간단함\n\n샤딩 선택:\n데이터 크기가 단일 서버 용량 초과\n쓰기 트래픽이 많을 때\n수평 확장이 필요할 때\n복잡하지만 확장성 높음\n\n실무에서:\n먼저 레플리케이션으로 시작하고, 한계에 도달하면 샤딩 도입. 레플리케이션 + 샤딩 조합도 가능합니다.",
    "references": [
      {
        "title": "MySQL Partitioning",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/partitioning.html"
      }
    ]
  },
  {
    "id": "DB-057",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "정규화가 무엇인가요?",
    "answer": "정규화: 데이터 중복을 최소화하고 데이터 무결성을 보장하기 위해 테이블을 분리하는 과정입니다.\n\n목적:\n데이터 중복 제거\n이상현상(Anomaly) 방지\n데이터 무결성 유지\n저장 공간 효율화\n\n정규화 단계:\n1NF → 2NF → 3NF → BCNF → 4NF → 5NF\n\n실무에서는 보통 3NF 또는 BCNF까지 적용합니다.",
    "references": [
      {
        "title": "Database Normalization",
        "url": "https://en.wikipedia.org/wiki/Database_normalization"
      }
    ]
  },
  {
    "id": "DB-058",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "정규화를 하지 않을 경우 발생할 수 있는 이상현상(Anomaly)에 대해 설명해 주세요.",
    "answer": "삽입 이상(Insertion Anomaly):\n불필요한 데이터 없이는 원하는 데이터를 삽입할 수 없음\n예: 수강 테이블에 학생 정보를 넣으려면 과목도 필요\n\n갱신 이상(Update Anomaly):\n중복 데이터 중 일부만 수정되어 불일치 발생\n예: 학과명 변경 시 여러 행을 모두 수정해야 함\n\n삭제 이상(Deletion Anomaly):\n원하는 데이터 삭제 시 다른 필요한 데이터도 삭제됨\n예: 마지막 수강 기록 삭제 시 학생 정보도 삭제",
    "references": [
      {
        "title": "Database Anomalies",
        "url": "https://en.wikipedia.org/wiki/Database_normalization#Normal_forms"
      }
    ]
  },
  {
    "id": "DB-059",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "각 정규화(1NF, 2NF, 3NF, BCNF)에 대해, 정규화 전/후의 테이블 변화에 대해 설명해 주세요.",
    "answer": "1NF (제1정규형):\n조건: 모든 속성이 원자값\n변화: 다중 값을 가진 컬럼을 별도 행으로 분리\n예: 전화번호1, 전화번호2 → 전화번호 테이블 분리\n\n2NF (제2정규형):\n조건: 1NF + 부분 함수 종속 제거\n변화: 복합키의 일부에만 종속된 컬럼 분리\n예: (학번, 과목코드) → 과목명은 과목 테이블로\n\n3NF (제3정규형):\n조건: 2NF + 이행적 함수 종속 제거\n변화: A→B→C 관계에서 B→C를 별도 테이블로\n예: 학번→학과코드→학과명 → 학과 테이블 분리\n\nBCNF:\n조건: 모든 결정자가 후보키\n변화: 후보키가 아닌 결정자를 분리",
    "references": [
      {
        "title": "Normal Forms",
        "url": "https://en.wikipedia.org/wiki/Database_normalization"
      }
    ]
  },
  {
    "id": "DB-060",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "데이터베이스 정규화가 무조건 좋은가요? 그렇지 않다면, 어떤 상황에서 역정규화(비정규화)를 하는 게 좋은지 설명해 주세요.",
    "answer": "정규화 vs 비정규화 트레이드오프:\n\n관점   정규화   비정규화\n\n데이터 중복   최소화   의도적 허용\n쓰기 성능   좋음 (한 곳만 수정)   나쁨 (여러 곳 수정)\n읽기 성능   JOIN 필요   JOIN 감소\n일관성   보장   애플리케이션에서 관리 필요\n저장 공간   효율적   비효율적\n\n정규화의 단점:\nJOIN 증가로 조회 성능 저하\n쿼리 복잡도 증가\n자주 함께 조회되는 데이터가 분산\n\n역정규화(Denormalization)가 필요한 경우:\n읽기 성능이 중요한 경우: 리포트, 대시보드, 분석 쿼리\n빈번한 JOIN 제거: 조회가 많고 변경이 적은 데이터\n계산 값 저장: 집계 결과를 미리 저장 (댓글 수, 좋아요 수)\n히스토리 데이터: 변경 시점의 스냅샷 저장 (주문 시점 상품 정보)\n분산 시스템: JOIN이 어려운 NoSQL이나 마이크로서비스 환경\n\n예시:\n주문 테이블에 상품명 중복 저장 (상품명 변경과 무관하게 주문 시점 정보 유지)\n게시글에 댓글 수 저장 (매번 COUNT 쿼리 회피)\n\n실무 전략:\n먼저 3NF까지 정규화 후, 성능 이슈 발생 시 선택적으로 비정규화",
    "references": [
      {
        "title": "Denormalization",
        "url": "https://en.wikipedia.org/wiki/Denormalization"
      }
    ]
  },
  {
    "id": "DB-061",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "View가 무엇이고, 언제 사용할 수 있나요?",
    "answer": "View: 하나 이상의 테이블에서 유도된 가상 테이블로, 실제 데이터를 저장하지 않고 쿼리 결과를 제공합니다.\n\n사용 사례:\n보안: 민감한 컬럼을 제외한 뷰 제공\n복잡한 쿼리 단순화: 자주 사용하는 JOIN 쿼리를 뷰로 정의\n데이터 추상화: 테이블 구조 변경 시 뷰만 수정\n권한 관리: 테이블 대신 뷰에 권한 부여",
    "references": [
      {
        "title": "MySQL CREATE VIEW",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/create-view.html"
      }
    ]
  },
  {
    "id": "DB-062",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "데이터베이스 View의 값을 수정해도 실제 테이블에는 반영되지 않나요?",
    "answer": "아니요, 조건을 만족하면 View를 통해 실제 테이블이 수정됩니다! 이것은 흔한 오해입니다.\n\nUpdatable View 조건 (수정 가능):\n단일 테이블 기반\n집계 함수 미사용 (SUM, COUNT 등)\nGROUP BY, HAVING, DISTINCT 미사용\nUNION 미사용\n서브쿼리 미사용 (일부 예외)\n\n수정 불가능한 View:\n여러 테이블 JOIN\n집계 결과를 보여주는 View\n계산된 컬럼 (표현식)\nWITH CHECK OPTION으로 제한된 경우",
    "references": [
      {
        "title": "MySQL Updatable Views",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/view-updatability.html"
      }
    ]
  },
  {
    "id": "DB-063",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "트래픽이 높아질 때, DB는 어떻게 관리를 할 수 있을까요? (Scale-up vs Scale-out)",
    "answer": "Scale-up (수직 확장):\nCPU, 메모리, 디스크 등 하드웨어 업그레이드\n장점: 구현 간단, 애플리케이션 변경 불필요\n단점: 비용 급증, 물리적 한계 존재\n\nScale-out (수평 확장):\n서버 수를 늘려 부하 분산\n방법: 레플리케이션, 샤딩, 파티셔닝\n장점: 이론적으로 무한 확장 가능\n단점: 구현 복잡, 분산 트랜잭션 어려움\n\n전략:\n먼저 쿼리 최적화, 인덱싱\n캐시 레이어 추가 (Redis)\nRead Replica 추가\n샤딩 도입",
    "references": [
      {
        "title": "MySQL Scaling",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/optimization.html"
      }
    ]
  },
  {
    "id": "DB-064",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "DB 서버를 분산하지 않고(Scale-out 없이) 높은 트래픽을 감당할 수 있는 방법에는 무엇이 있나요?",
    "answer": "방법:\n쿼리 최적화:\n인덱스 튜닝\n실행 계획 분석 및 개선\n불필요한 컬럼 조회 제거\n캐싱:\n애플리케이션 레벨 캐시 (Redis, Memcached)\n쿼리 캐시\nORM 2차 캐시\n커넥션 풀 최적화:\n적정 커넥션 수 설정\n커넥션 재사용\n하드웨어 업그레이드:\nSSD 사용\n메모리 증설 (버퍼 풀 확대)\n비동기 처리:\n쓰기 작업 큐잉\n배치 처리",
    "references": [
      {
        "title": "MySQL Performance Tuning",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/optimization.html"
      }
    ]
  },
  {
    "id": "DB-065",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "Schema가 무엇인가요?",
    "answer": "Schema: 데이터베이스의 구조와 제약조건을 정의한 것입니다.\n\n포함 내용:\n테이블 정의 (컬럼명, 데이터 타입)\n관계 정의 (외래키)\n제약조건 (PRIMARY KEY, UNIQUE, NOT NULL, CHECK)\n인덱스\n뷰, 프로시저, 트리거\n\nMySQL에서:\nSchema = Database (동일 개념)\nCREATE SCHEMA와 CREATE DATABASE는 동의어",
    "references": [
      {
        "title": "MySQL CREATE DATABASE",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/create-database.html"
      }
    ]
  },
  {
    "id": "DB-066",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "데이터베이스 3계층 스키마(외부/개념/내부 스키마)에 대해 설명해 주세요.",
    "answer": "ANSI/SPARC 3계층 아키텍처:\n\n외부 스키마 (External Schema):\n사용자/애플리케이션 관점\n각 사용자가 보는 데이터 구조\nView로 구현\n\n개념 스키마 (Conceptual Schema):\n전체 데이터베이스의 논리적 구조\n테이블, 관계, 제약조건 정의\n일반적으로 \"스키마\"라고 하면 이것\n\n내부 스키마 (Internal Schema):\n물리적 저장 구조\n인덱스, 파일 구조, 저장 방식\nDBA 관점\n\n데이터 독립성:\n하위 스키마 변경이 상위 스키마에 영향 최소화",
    "references": [
      {
        "title": "Three-Schema Architecture",
        "url": "https://en.wikipedia.org/wiki/Three-schema_approach"
      }
    ]
  },
  {
    "id": "DB-067",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "DB의 Connection Pool에 대해 설명해 주세요.",
    "answer": "Connection Pool: 미리 생성된 DB 연결을 재사용하는 기법입니다.\n\n필요 이유:\nDB 연결 생성은 비용이 큼 (TCP 핸드셰이크, 인증)\n매 요청마다 연결 생성/해제는 비효율적\n\n동작 방식:\n애플리케이션 시작 시 N개의 연결 미리 생성\n요청 시 풀에서 연결 획득\n작업 완료 후 연결을 풀에 반환 (연결 유지)\n모든 연결 사용 중이면 대기 또는 새 연결 생성\n\n주요 설정:\n최소/최대 커넥션 수\n유휴 타임아웃\n최대 대기 시간\n\n구현체: HikariCP, DBCP, c3p0",
    "references": [
      {
        "title": "HikariCP",
        "url": "https://github.com/brettwooldridge/HikariCP"
      }
    ]
  },
  {
    "id": "DB-068",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "Client가 DB Connection을 어떻게 구성하는지 설명해 주세요.",
    "answer": "연결 과정:\nTCP 연결 수립:\n클라이언트가 DB 서버 IP:Port로 TCP 연결\n3-way handshake\n인증:\n사용자명, 비밀번호 전송\nDB 서버가 권한 확인\n세션 설정:\n문자셋, 타임존 등 설정\n연결별 설정 적용\n쿼리 실행:\nSQL 문 전송\n결과 수신\n연결 종료:\n명시적 close() 또는 타임아웃\n\nJDBC 예시:",
    "references": [
      {
        "title": "MySQL Connection Phase",
        "url": "https://dev.mysql.com/doc/dev/mysql-server/latest/page_protocol_connection_phase.html"
      }
    ]
  },
  {
    "id": "DB-069",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "SQL Injection에 대해 설명해 주세요.",
    "answer": "SQL Injection: 사용자 입력에 악의적인 SQL 코드를 삽입하여 DB를 조작하는 공격입니다.\n\n예시:\n\n위험:\n데이터 유출\n데이터 변조/삭제\n인증 우회\n시스템 명령 실행 (일부 DB)\n\n방지 방법:\nPrepared Statement 사용\n입력값 검증\n최소 권한 원칙\nWAF 사용",
    "references": [
      {
        "title": "OWASP SQL Injection",
        "url": "https://owasp.org/www-community/attacks/SQL_Injection"
      }
    ]
  },
  {
    "id": "DB-070",
    "category": "database",
    "categoryName": "Database",
    "section": "cs",
    "question": "서버 개발에서 사용하는 DB 라이브러리(e.g., ORM, JDBC)들은 SQL Injection 문제를 어떻게 해결할까요? (e.g., Prepared Statement)",
    "answer": "Prepared Statement (Parameterized Query):\n\nSQL 구조와 데이터를 분리하여 처리합니다.\n\n동작 방식:\nSQL 템플릿을 먼저 DB에 전송 (컴파일)\n파라미터 값을 별도로 전송\nDB가 파라미터를 데이터로만 처리 (SQL로 해석 안 함)\n\nORM에서:\nJPA/Hibernate: 기본적으로 Prepared Statement 사용\n네이티브 쿼리 사용 시 주의 필요\n\n추가 방어:\n입력값 화이트리스트 검증\n이스케이프 처리 (권장하지 않음)",
    "references": [
      {
        "title": "JDBC PreparedStatement",
        "url": "https://docs.oracle.com/javase/tutorial/jdbc/basics/prepared.html"
      }
    ]
  },
  {
    "id": "DS-001",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "스택 2개로 큐 만들기",
    "answer": "두 개의 스택(inStack, outStack)을 사용하여 큐를 구현합니다.\n\nEnqueue: inStack에 push - O(1)\n\nDequeue: outStack이 비어있으면 inStack의 모든 요소를 outStack으로 이동 후 pop - 분할상환 O(1)",
    "references": [
      {
        "title": "Stack (Java SE 21)",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Stack.html"
      }
    ]
  },
  {
    "id": "DS-002",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "큐 2개로 스택 만들기",
    "answer": "두 개의 큐(q1, q2)를 사용하여 스택을 구현합니다.\n\nPush: q1에 enqueue - O(1)\n\nPop: q1의 마지막 요소를 제외한 모든 요소를 q2로 이동, 마지막 요소 반환 후 q1과 q2 교환 - O(n)",
    "references": [
      {
        "title": "Queue (Java SE 21)",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Queue.html"
      }
    ]
  },
  {
    "id": "DS-003",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "Prefix, Infix, Postfix 에 대해 설명하고, 이를 스택을 활용해서 계산/하는 방법에 대해 설명해 주세요.",
    "answer": "표기법 종류\nInfix: 연산자가 피연산자 사이에 위치 (예: A + B)\nPrefix: 연산자가 피연산자 앞에 위치 (예: + A B)\nPostfix: 연산자가 피연산자 뒤에 위치 (예: A B +)\n\nPostfix 계산 (스택 활용)\n피연산자면 스택에 push\n연산자면 스택에서 두 개를 pop하여 연산 후 결과를 push\n최종적으로 스택에 남은 값이 결과\n\nInfix → Postfix 변환\n피연산자는 바로 출력\n연산자는 스택의 top보다 우선순위가 높으면 push, 아니면 pop 후 push\n여는 괄호는 push, 닫는 괄호는 여는 괄호까지 pop",
    "references": [
      {
        "title": "Expression Evaluation - GeeksforGeeks",
        "url": "https://www.geeksforgeeks.org/expression-evaluation/"
      }
    ]
  },
  {
    "id": "DS-004",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "(C++ 한정) Deque의 Random Access 시간복잡도는 O(1) 입니다. 이게 어떻게 가능한걸까요?",
    "answer": "C++ deque는 청크(chunk) 기반 구조로 구현됩니다.\n\n구조\n고정 크기의 청크 배열들과 이를 가리키는 포인터 배열(map)로 구성\n각 청크는 연속된 메모리 블록\n\nRandom Access 원리\nindex를 청크 크기로 나누어 어떤 청크인지 계산 - O(1)\n나머지로 청크 내 위치 계산 - O(1)\nmap 배열에서 해당 청크 포인터 접근 - O(1)",
    "references": [
      {
        "title": "std::deque - cppreference",
        "url": "https://en.cppreference.com/w/cpp/container/deque"
      }
    ]
  },
  {
    "id": "DS-005",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "해시 자료구조에 대해 설명해 주세요.",
    "answer": "해시 테이블은 키(Key)를 해시 함수를 통해 인덱스로 변환하여 값(Value)을 저장하는 자료구조입니다.\n\n구성 요소\n해시 함수: 키를 고정 크기의 해시값으로 변환\n버킷/슬롯: 실제 데이터가 저장되는 공간\n충돌 처리: 같은 해시값을 가진 키들을 처리하는 방법\n\n시간복잡도\n평균: 삽입, 삭제, 검색 모두 O(1)\n최악(모든 키가 충돌): O(n)\n공간복잡도: O(n)\n\n해시 테이블 vs 배열 vs BST\n연산   배열 (정렬)   해시 테이블   BST (균형)\n\n검색   O(log n)   O(1) 평균   O(log n)\n삽입   O(n)   O(1) 평균   O(log n)\n순서 유지   O   X   O\n범위 검색   O(log n + k)   O(n)   O(log n + k)",
    "references": [
      {
        "title": "HashMap (Java SE 21)",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html"
      }
    ]
  },
  {
    "id": "DS-006",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "값이 주어졌을 때, 어떻게 하면 충돌이 최대한 적은 해시 함수를 설계할 수 있을까요?",
    "answer": "좋은 해시 함수의 조건\n균등 분포: 해시값이 버킷 전체에 고르게 분포\n결정적: 같은 입력에 항상 같은 출력\n빠른 계산: O(1) 시간 내 계산 가능\n\n설계 기법\n나눗셈법: h(k) = k mod m (m은 소수 권장)\n곱셈법: h(k) = floor(m  (k  A mod 1)) (A는 황금비 등)\n문자열: 다항식 해싱 h = s[0]p^(n-1) + s[1]p^(n-2) + ...\n\n실용적 팁\n테이블 크기를 소수로 설정\n입력 데이터의 특성 분석 후 적합한 함수 선택",
    "references": [
      {
        "title": "Hash function - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Hash_function"
      }
    ]
  },
  {
    "id": "DS-007",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "해시 테이블에서 해시값이 충돌했을 때 어떤 방식으로 처리할 수 있나요?",
    "answer": "체이닝 (Chaining)\n각 버킷에 연결 리스트(또는 트리)를 두어 충돌 요소들을 연결\n장점: 구현 간단, 삭제 용이\n단점: 추가 메모리 필요\n개방 주소법 (Open Addressing)\n선형 탐사: 충돌 시 다음 버킷으로 이동 h(k, i) = (h(k) + i) mod m\n이차 탐사: h(k, i) = (h(k) + c1i + c2i^2) mod m\n이중 해싱: h(k, i) = (h1(k) + i*h2(k)) mod m\n\n방식   클러스터링   캐시 성능   삭제   적합한 상황\n\n체이닝   없음   낮음 (포인터 추적)   쉬움   Load Factor 높을 때, 삭제 빈번\n선형 탐사   심함 (1차 클러스터링)   높음   어려움 (Tombstone 필요)   캐시 효율 중요, 삭제 적을 때\n이중 해싱   적음   중간   어려움 (Tombstone 필요)   균등 분포 필요, 클러스터링 방지\n\n트레이드오프 정리\n체이닝: 메모리 오버헤드(포인터) vs 구현 단순성 및 삭제 용이성\n개방 주소법: 메모리 효율 vs Load Factor 증가 시 성능 급락 (보통 0.7 이하 유지)",
    "references": [
      {
        "title": "Hash table - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Hash_table#Collision_resolution"
      }
    ]
  },
  {
    "id": "DS-008",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "본인이 사용하는 프로그래밍 언어에서는 해시 충돌을 어떤 방식으로 처리하나요?",
    "answer": "Java (HashMap)\n체이닝 방식 사용\nJava 8 이후: 버킷 내 요소가 8개 이상이면 연결 리스트를 Red-Black Tree로 변환\n6개 이하로 줄어들면 다시 연결 리스트로 변환\n이를 통해 최악의 경우에도 O(log n) 보장\n\nPython (dict)\n개방 주소법 사용 (Python 3.6+: Compact dict)\n랜덤 탐사(pseudo-random probing) 방식으로 충돌 해결\n삽입 순서 유지 (Python 3.7+에서 언어 스펙으로 보장)\n\nC++ (unordered_map)\n체이닝 방식 사용\n연결 리스트로 충돌 처리",
    "references": [
      {
        "title": "HashMap (Java SE 21)",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html"
      }
    ]
  },
  {
    "id": "DS-009",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "개방 주소법의 Double Hashing 방식에서 장점과 단점을 설명하고, 단점을 어떻게 해결할 수 있는지 설명해 주세요.",
    "answer": "Double Hashing: h(k, i) = (h1(k) + i * h2(k)) mod m\n\n장점\n1차/2차 클러스터링 문제 해결\n선형/이차 탐사보다 균등한 분포\n테이블 전체를 효율적으로 활용\n\n단점\n해시 함수 2개 계산으로 오버헤드 증가\nh2(k)가 0이 되면 무한 루프 발생 가능\n캐시 지역성이 떨어짐\n\n해결 방법\nh2(k)가 0이 되지 않도록 설계: h2(k) = 1 + (k mod (m-1))\n테이블 크기 m을 소수로 설정하여 모든 슬롯 탐사 보장\n캐시 문제는 클러스터 단위 탐사로 완화 가능",
    "references": [
      {
        "title": "Double hashing - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Double_hashing"
      }
    ]
  },
  {
    "id": "DS-010",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "Load Factor에 대해 설명해 주세요. 본인이 사용하는 언어에서의 해시 자료구조는 Load Factor에 관련한 정책이 어떻게 구성되어 있나요?",
    "answer": "Load Factor (적재율) = 저장된 요소 수 / 버킷 수\n\nLoad Factor가 높아지면 충돌 확률이 증가하여 성능이 저하됩니다.\n\nJava HashMap 정책\n기본 Load Factor: 0.75\n기본 초기 용량: 16\nLoad Factor 초과 시 용량을 2배로 확장 (rehashing)\n생성자에서 초기 용량과 Load Factor 지정 가능\n\nPython dict\nLoad Factor 약 2/3 (0.67) 유지\n초과 시 4배 또는 2배로 확장\n\nC++ unorderedmap\n기본 maxloadfactor: 1.0\nmaxload_factor() 메서드로 조정 가능",
    "references": [
      {
        "title": "HashMap (Java SE 21)",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html"
      }
    ]
  },
  {
    "id": "DS-011",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "다른 자료구조와 비교하여, 해시 테이블은 멀티스레드 환경에서 심각한 수준의 Race Condition 문제에 빠질 위험이 있습니다. 성능 감소를 최소화 한 채로 해당 문제를 해결할 수 있는 방법을 설계해 보세요.",
    "answer": "문제점: rehashing, 체이닝 수정 등에서 Race Condition 발생\n\n해결 방법\n세분화된 락 (Lock Striping)\n전체 테이블이 아닌 버킷 그룹별로 락 적용\nJava 7 ConcurrentHashMap: Segment 기반 락\nJava 8+ ConcurrentHashMap: Node 단위 CAS + synchronized (더 세분화됨)\n동시에 다른 세그먼트 접근 가능\nLock-Free 구조\nCAS(Compare-And-Swap) 연산 활용\n체이닝의 연결 리스트를 atomic하게 수정\nCopy-on-Write\n수정 시 새 버킷 배열 생성\n읽기 작업이 많은 경우 효율적\nRead-Write Lock\n읽기는 동시에, 쓰기는 배타적으로\nReentrantReadWriteLock 활용\n\nJava ConcurrentHashMap 특징\n세분화된 락 + CAS 조합\n읽기는 락 없이 수행\nputIfAbsent, computeIfAbsent 등 원자적 연산 제공",
    "references": [
      {
        "title": "ConcurrentHashMap (Java SE 21)",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html"
      }
    ]
  },
  {
    "id": "DS-012",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "트리와 이진트리, 이진탐색트리에 대해 설명해 주세요.",
    "answer": "트리 (Tree)\n노드와 간선으로 구성된 계층적 자료구조\n사이클이 없는 연결 그래프\n루트 노드에서 모든 노드로 유일한 경로 존재\n\n이진 트리 (Binary Tree)\n각 노드가 최대 2개의 자식을 가지는 트리\n왼쪽 자식, 오른쪽 자식으로 구분\n종류: 완전 이진 트리, 포화 이진 트리, 편향 이진 트리\n\n이진 탐색 트리 (BST)\n이진 트리에 정렬 속성 추가\n왼쪽 서브트리: 현재 노드보다 작은 값\n오른쪽 서브트리: 현재 노드보다 큰 값\n중복 허용 여부는 구현에 따라 다름",
    "references": [
      {
        "title": "Binary search tree - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Binary_search_tree"
      }
    ]
  },
  {
    "id": "DS-013",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "이진탐색트리에서 중위 순회(Inorder Traversal)를 하면 어떤 결과를 얻을 수 있나요?",
    "answer": "중위 순회 (Inorder Traversal): 왼쪽 → 현재 → 오른쪽\n\nBST에서 중위 순회를 수행하면 오름차순으로 정렬된 결과를 얻습니다.\n\n이유\nBST 속성상 왼쪽 서브트리의 모든 값 < 현재 노드 < 오른쪽 서브트리의 모든 값\n중위 순회는 왼쪽을 먼저 방문하므로 작은 값부터 출력\n\n활용\nBST가 올바르게 구성되었는지 검증\nk번째 작은/큰 원소 찾기\n정렬된 데이터 출력",
    "references": [
      {
        "title": "Tree traversal - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Tree_traversal#In-order"
      }
    ]
  },
  {
    "id": "DS-014",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "이진탐색트리의 주요 연산(검색, 삽입, 삭제)에 대한 시간복잡도를 설명하고, 왜 그런 시간복잡도가 도출되는지 설명해 주세요.",
    "answer": "시간복잡도\n연산   평균   최악   공간복잡도\n\n검색   O(log n)   O(n)   O(1)\n삽입   O(log n)   O(n)   O(1)\n삭제   O(log n)   O(n)   O(1)\n\n평균 O(log n) 이유\n균형 잡힌 BST의 높이는 log n\n각 연산은 루트에서 리프까지 한 경로만 탐색\n각 단계에서 탐색 범위가 절반으로 감소\n\n최악 O(n) 이유\n편향 트리(Skewed Tree)인 경우\n예: 1, 2, 3, 4, 5 순서로 삽입하면 오른쪽으로만 편향\n높이가 n이 되어 연결 리스트와 동일한 성능\n\n함정 질문 대비: 왜 해시 테이블 대신 BST를 쓰나요?\n순서 유지: BST는 정렬된 순회 가능 (중위 순회 O(n))\n범위 쿼리: k1~k2 사이 값 검색 가능\n최소/최대값: O(log n)에 접근 가능\n해시 테이블은 이런 연산에 O(n) 필요",
    "references": [
      {
        "title": "Binary search tree - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Binary_search_tree#Time_complexity"
      }
    ]
  },
  {
    "id": "DS-015",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "이진탐색트리의 한계점에 대해 설명해 주세요.",
    "answer": "편향 문제\n삽입 순서에 따라 한쪽으로 치우칠 수 있음\n최악의 경우 연결 리스트와 동일한 O(n) 성능\n균형 유지 불가\n기본 BST는 자체적으로 균형을 맞추지 않음\n삽입/삭제 시 균형이 깨질 수 있음\n재균형 비용\n균형을 맞추려면 추가 작업(회전 등) 필요\nAVL, Red-Black Tree 등 별도 자료구조 필요\n중복 처리 복잡\n중복 키 처리 정책이 필요\n왼쪽/오른쪽 어디에 넣을지, 또는 카운트 방식 등\n\n해결책: AVL Tree, Red-Black Tree 등 자가 균형 BST 사용\n\n면접 팁: \"BST의 한계\"를 물을 때 \"랜덤 삽입의 평균은 O(log n)\"이라고 보완 설명 가능. 실제로 랜덤 순서 삽입 시 평균 높이는 약 1.39 log n으로 좋은 성능을 보임.",
    "references": [
      {
        "title": "Self-balancing binary search tree - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree"
      }
    ]
  },
  {
    "id": "DS-016",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "이진탐색트리의 값 삽입, 삭제 방법에 대해 설명하고, 어떤 순서로 값을 삽입하면 편향이 발생하나요?",
    "answer": "삽입\n루트부터 시작하여 값을 비교\n작으면 왼쪽, 크면 오른쪽으로 이동\nnull 위치에 도달하면 새 노드 삽입\n\n삭제\n리프 노드: 단순히 삭제\n자식 1개: 자식을 현재 위치로 이동\n자식 2개:\n오른쪽 서브트리의 최솟값(후속자) 또는 왼쪽 서브트리의 최댓값(선행자)을 찾음\n해당 값으로 현재 노드 대체 후 그 노드 삭제\n\n편향 발생 케이스\n정렬된 데이터 삽입: 1, 2, 3, 4, 5 -> 오른쪽 편향 (연결 리스트화)\n역순 정렬 데이터: 5, 4, 3, 2, 1 -> 왼쪽 편향\n특정 패턴: 1, 10, 2, 9, 3, 8 -> 지그재그 편향\n\n삭제 시 주의사항\n후속자(오른쪽 서브트리 최솟값) 대신 선행자(왼쪽 서브트리 최댓값)를 일관되게 사용하면 편향 가능\n랜덤하게 선택하면 균형 유지에 도움",
    "references": [
      {
        "title": "Binary search tree operations",
        "url": "https://en.wikipedia.org/wiki/Binary_search_tree#Operations"
      }
    ]
  },
  {
    "id": "DS-017",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "이진탐색트리와 동일한 로직을 사용해서 삼진탐색트리도 정의할 수 있나요? 안 된다면 그 이유를 설명해 주세요.",
    "answer": "단순 확장은 불가능합니다.\n\n이유\n\n이진탐색트리는 2개의 자식과 1개의 기준값으로 \"작다/크다\"를 명확히 구분합니다. 삼진탐색트리로 확장하려면:\n기준값 2개 필요: 3개의 자식을 구분하려면 2개의 키 값이 필요\n구간 정의: 작음 / 사이 / 큼 으로 3구간 분할\n\n이는 2-3 Tree와 유사한 구조가 됩니다:\n각 노드에 1~2개의 키\n2개의 키가 있으면 3개의 자식\n\n결론\n단순히 자식 수만 3개로 늘리는 것은 불가능하며, B-Tree 계열처럼 노드 내 키 개수도 함께 늘려야 합니다. 이 경우 구현 복잡도가 증가하고, 실질적인 이점이 적어 실제로는 거의 사용되지 않습니다.",
    "references": [
      {
        "title": "2-3 tree - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/2%E2%80%933_tree"
      }
    ]
  },
  {
    "id": "DS-018",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "힙에 대해 설명해 주세요.",
    "answer": "힙 (Heap)은 완전 이진 트리 형태의 자료구조로, 힙 속성을 만족합니다.\n\n종류\n최대 힙 (Max Heap): 부모 >= 자식\n최소 힙 (Min Heap): 부모 <= 자식\n\n시간복잡도\n연산   시간복잡도\n\n삽입 (insert)   O(log n)\n삭제 (extract-min/max)   O(log n)\n최솟값/최댓값 조회 (peek)   O(1)\n힙 구성 (heapify)   O(n)\n임의 원소 삭제   O(n) - 탐색 필요\ndecrease-key (인덱스 알 때)   O(log n)\n\n특징\n루트에 최댓값(최대 힙) 또는 최솟값(최소 힙) 위치\n완전 이진 트리이므로 배열로 효율적 구현 가능\n형제 노드 간에는 순서 관계 없음 (BST와 다름)\n\n활용\n우선순위 큐 구현\n힙 정렬\n다익스트라 알고리즘 (최소 힙)\n중앙값 찾기 (최대 힙 + 최소 힙)\nTop-K 문제 (크기 K 힙 유지)",
    "references": [
      {
        "title": "PriorityQueue (Java SE 21)",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/PriorityQueue.html"
      }
    ]
  },
  {
    "id": "DS-019",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "힙을 배열로 구현한다고 가정하면, 어떻게 값을 저장하고 부모/자식 관계를 표현할 수 있나요?",
    "answer": "완전 이진 트리의 특성을 활용하여 배열에 레벨 순서로 저장합니다.\n\n인덱스 관계 (0-based)\n부모: (i - 1) / 2\n왼쪽 자식: 2  i + 1\n오른쪽 자식: 2  i + 2\n\n인덱스 관계 (1-based)\n부모: i / 2\n왼쪽 자식: 2  i\n오른쪽 자식: 2  i + 1\n\n장점\n포인터 없이 인덱스 연산으로 부모/자식 접근 O(1)\n메모리 효율적 (노드 포인터 불필요)\n캐시 지역성 우수",
    "references": [
      {
        "title": "Binary heap - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Binary_heap#Heap_implementation"
      }
    ]
  },
  {
    "id": "DS-020",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "힙(Heap)의 삽입, 삭제 방식에 대해 설명하고, 이진탐색트리(BST)와 달리 힙에서 편향이 발생하지 않는 이유를 설명해 주세요.",
    "answer": "삽입 (Insert)\n배열의 맨 끝(마지막 레벨의 가장 오른쪽)에 삽입\nHeapify-up: 부모와 비교하여 힙 속성 위반 시 교환, 루트까지 반복\n\n삭제 (Delete Root)\n루트와 마지막 요소 교환\n마지막 요소 제거\nHeapify-down: 자식과 비교하여 힙 속성 위반 시 교환, 리프까지 반복\n\n편향이 발생하지 않는 이유\n\n힙은 완전 이진 트리를 항상 유지합니다:\n삽입: 항상 마지막 위치에 추가\n삭제: 마지막 요소로 대체\n\n따라서 트리의 높이는 항상 log n으로 유지되며, BST처럼 삽입 순서에 따라 편향될 수 없습니다.",
    "references": [
      {
        "title": "Binary heap operations",
        "url": "https://en.wikipedia.org/wiki/Binary_heap#Insert"
      }
    ]
  },
  {
    "id": "DS-021",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "힙 정렬(Heap Sort)의 시간복잡도는 어떻게 되고, Stable 정렬인가요?",
    "answer": "시간복잡도\n힙 구성: O(n) - Bottom-up heapify (Floyd's method)\n정렬: O(n log n) - n개 요소 각각 O(log n) 삭제\n전체: O(n log n) - 최선, 평균, 최악 모두 동일\n\n공간복잡도: O(1) - 제자리 정렬 (In-place)\n\nStable 여부: 아니오 (Unstable)\n\n같은 값을 가진 요소들의 상대적 순서가 보장되지 않습니다.\n\n예시\n\n힙 연산 중 루트와 마지막 요소 교환 과정에서 원래 순서가 깨집니다.\n\n힙 정렬의 트레이드오프\n장점   단점\n\n최악 O(n log n) 보장   Unstable\nIn-place O(1) 공간   캐시 지역성 낮음 (부모-자식 접근 패턴)\n최댓값/최솟값 빠른 추출   실제 성능은 Quick Sort보다 느림\n\n실무 사용: 대부분 Intro Sort의 fallback으로 사용됨 (재귀 깊이 초과 시)",
    "references": [
      {
        "title": "Heapsort - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Heapsort"
      }
    ]
  },
  {
    "id": "DS-022",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "BBST (Balanced Binary Search Tree) 와, 그 종류에 대해 설명해 주세요.",
    "answer": "BBST (균형 이진 탐색 트리)는 삽입/삭제 시 자동으로 균형을 유지하여 O(log n) 성능을 보장하는 BST입니다.\n\n주요 종류\n\n종류   균형 조건   특징\n\nAVL Tree   좌우 높이 차이 <= 1   엄격한 균형, 검색 빠름\nRed-Black Tree   색상 규칙 4가지   삽입/삭제 빠름, 실무 많이 사용\n2-3 Tree   모든 리프 같은 깊이   B-Tree의 기초\n2-3-4 Tree   노드당 2~4개 자식   Red-Black Tree와 동치\nB-Tree   디스크 최적화   데이터베이스에서 사용\nSplay Tree   최근 접근 노드를 루트로   분할상환 O(log n)",
    "references": [
      {
        "title": "Self-balancing BST - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree"
      }
    ]
  },
  {
    "id": "DS-023",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "Red-Black Tree는 어떻게 균형을 유지하나요?",
    "answer": "Red-Black Tree는 색상 규칙과 회전 연산을 통해 균형을 유지합니다.\n\n균형 유지 방법\n삽입 시\n새 노드를 RED로 삽입\n규칙 위반 시 다음 연산 수행:\nRecoloring: 부모/삼촌이 RED면 색상 변경\nRotation: 부모가 RED, 삼촌이 BLACK이면 회전\n삽입 시 최대 회전 횟수: 2회 (O(1))\n삭제 시\nBLACK 노드 삭제 시 \"이중 흑색\" 문제 발생\n형제 노드의 색상에 따라 회전 및 재색칠\n삭제 시 최대 회전 횟수: 3회 (O(1))\n\n회전 연산\nLeft Rotation: 오른쪽 자식을 부모로 올림\nRight Rotation: 왼쪽 자식을 부모로 올림\n\n이 규칙들로 인해 가장 긴 경로가 가장 짧은 경로의 2배를 넘지 않아 균형이 유지됩니다.\n\n함정 질문: 왜 삽입 노드를 RED로?\nBLACK으로 삽입하면 Black Height가 즉시 깨짐 (성질 5 위반)\nRED로 삽입하면 성질 4(No Double Red)만 위반 가능 - 복구가 더 쉬움",
    "references": [
      {
        "title": "Red-black tree - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Insertion"
      }
    ]
  },
  {
    "id": "DS-024",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "Red-Black Tree의 주요 성질에 대해 설명해 주세요.",
    "answer": "Red-Black Tree의 5가지 성질 (주요 4가지 + 1)\n모든 노드는 RED 또는 BLACK\n루트 노드는 BLACK\n모든 리프(NIL)는 BLACK\n실제 데이터가 없는 NIL 노드도 BLACK으로 취급\nRED 노드의 자식은 모두 BLACK (No Double Red)\nRED 노드가 연속으로 나타날 수 없음\nBlack Height 일관성\n임의의 노드에서 리프까지의 모든 경로에서 BLACK 노드 수가 동일\n\n이 성질들의 결과\n가장 긴 경로(RED-BLACK 교대) <= 2  가장 짧은 경로(BLACK만)\n높이가 최대 2  log(n+1)로 제한\n모든 연산이 O(log n) 보장",
    "references": [
      {
        "title": "Red-black tree properties",
        "url": "https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Properties"
      }
    ]
  },
  {
    "id": "DS-025",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "균형 이진 탐색 트리로 AVL Tree, 2-3-4 Tree 등도 있는데, 왜 Red-Black Tree가 실무에서 많이 사용되나요?",
    "answer": "Red-Black Tree의 장점\n삽입/삭제 성능\nAVL Tree보다 회전 횟수가 적음\n삽입: 최대 2회 회전, 삭제: 최대 3회 회전\nAVL은 삭제 시 O(log n)회 회전 가능 (경로를 따라 올라가며)\n구현 단순성\n2-3-4 Tree보다 구현이 간단 (노드 타입이 하나)\n2-3-4 Tree는 노드 분할/병합 로직 복잡\n균형 유지 비용\n트리   삽입 회전   삭제 회전   높이   검색 성능\n\nAVL   O(1) 회전, O(log n) 균형 조정   O(log n)   <= 1.44 log n   더 빠름\nRed-Black   O(1)   O(1)   <= 2 log n   약간 느림\n실제 사용 사례\nJava: TreeMap, TreeSet\nC++ STL: map, set\nLinux: CFS 스케줄러, 메모리 관리\n\nAVL이 나은 경우: 검색이 삽입/삭제보다 훨씬 많은 경우 (더 엄격한 균형 = 낮은 높이 = 빠른 검색)\n\n면접 핵심: \"왜 Java/C++에서 RB Tree?\"\n삽입/삭제가 빈번한 일반적인 사용 패턴에 적합\n회전 횟수 상한이 상수이므로 예측 가능한 성능",
    "references": [
      {
        "title": "TreeMap (Java SE 21)",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/TreeMap.html"
      }
    ]
  },
  {
    "id": "DS-026",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "정렬 알고리즘에 대해 설명해 주세요.",
    "answer": "정렬 알고리즘은 데이터를 특정 순서로 재배열하는 알고리즘입니다.\n\n분류\n\n알고리즘   평균   최악   공간   Stable\n\nBubble Sort   O(n^2)   O(n^2)   O(1)   Yes\nSelection Sort   O(n^2)   O(n^2)   O(1)   No\nInsertion Sort   O(n^2)   O(n^2)   O(1)   Yes\nMerge Sort   O(n log n)   O(n log n)   O(n)   Yes\nQuick Sort   O(n log n)   O(n^2)   O(log n)   No\nHeap Sort   O(n log n)   O(n log n)   O(1)   No\nCounting Sort   O(n+k)   O(n+k)   O(k)   Yes\nRadix Sort   O(d(n+k))   O(d(n+k))   O(n+k)   Yes\n\n비교 기반 정렬의 하한: O(n log n)\n\n비교 기반 정렬은 결정 트리로 모델링되며, 최소 n!개의 리프가 필요하므로 높이는 최소 log(n!) = O(n log n)",
    "references": [
      {
        "title": "Sorting algorithm - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Sorting_algorithm"
      }
    ]
  },
  {
    "id": "DS-027",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "Quick Sort와 Merge Sort를 비교해 주세요.",
    "answer": "항목   Quick Sort   Merge Sort\n\n평균 시간   O(n log n)   O(n log n)\n최악 시간   O(n^2)   O(n log n)\n공간   O(log n) 스택   O(n) 추가 배열\nStable   No   Yes\n방식   분할 정복 (In-place)   분할 정복\n캐시 효율   좋음 (연속 메모리 접근)   보통 (병합 시 복사)\n\nQuick Sort 장점\nIn-place로 메모리 효율적\n캐시 지역성이 좋아 실제로 더 빠름\n평균적으로 상수 계수가 작음 (약 1.39n log n vs 2n log n)\n\nMerge Sort 장점\n최악에도 O(n log n) 보장\nStable 정렬\n연결 리스트 정렬에 적합 (O(1) 공간으로 구현 가능)\n병렬화 용이 (분할된 작업이 독립적)\n외부 정렬에 적합\n\n선택 기준\n일반적인 경우 (배열): Quick Sort\n안정성 필요: Merge Sort\n최악 보장 필요: Merge Sort 또는 Heap Sort\n연결 리스트: Merge Sort\n외부 정렬: Merge Sort 기반\n\n실무 참고: 대부분의 표준 라이브러리는 Intro Sort (Quick + Heap + Insertion) 또는 Tim Sort (Merge + Insertion) 사용",
    "references": [
      {
        "title": "Quicksort - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Quicksort"
      }
    ]
  },
  {
    "id": "DS-028",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "Quick Sort에서 O(N^2)이 걸리는 예시를 들고, 이를 개선할 수 있는 방법에 대해 설명해 주세요.",
    "answer": "O(n^2) 발생 예시\n이미 정렬된 배열에서 첫 번째/마지막 요소를 피벗으로 선택\n매번 1개와 n-1개로 분할 → n + (n-1) + ... + 1 = O(n^2)\n\n개선 방법\nRandomized Pivot\n피벗을 무작위로 선택\n최악 확률이 매우 낮아짐\nMedian of Three\n첫 번째, 중간, 마지막 중 중앙값을 피벗으로 선택\n정렬/역정렬 데이터에서 효과적\nIntro Sort\nQuick Sort + Heap Sort 혼합\n재귀 깊이가 2*log(n) 초과 시 Heap Sort로 전환\nC++ STL sort가 사용\n3-way Partitioning\n중복이 많은 데이터에 효과적\n피벗보다 작은/같은/큰 세 그룹으로 분할",
    "references": [
      {
        "title": "Quicksort - Worst case",
        "url": "https://en.wikipedia.org/wiki/Quicksort#Worst-case_analysis"
      }
    ]
  },
  {
    "id": "DS-029",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "Stable Sort가 무엇이고, 어떤 정렬 알고리즘이 Stable 한지 설명해 주세요.",
    "answer": "Stable Sort: 같은 키를 가진 요소들의 상대적 순서가 정렬 후에도 유지되는 정렬\n\n예시\n\nStable 알고리즘\nBubble Sort\nInsertion Sort\nMerge Sort\nCounting Sort\nRadix Sort\nTim Sort\n\nUnstable 알고리즘\nSelection Sort\nQuick Sort\nHeap Sort\n\n중요성\n다중 키 정렬: 먼저 2차 키로 정렬 후 1차 키로 Stable 정렬\n데이터베이스: 기존 순서 유지 필요 시",
    "references": [
      {
        "title": "Sorting algorithm stability",
        "url": "https://en.wikipedia.org/wiki/Sorting_algorithm#Stability"
      }
    ]
  },
  {
    "id": "DS-030",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "Merge Sort를 재귀를 사용하지 않고 반복문으로 구현할 수 있나요?",
    "answer": "네, Bottom-Up 방식으로 반복문을 사용하여 구현할 수 있습니다.\n\nBottom-Up Merge Sort\n크기 1인 부분 배열부터 시작\n인접한 부분 배열들을 병합\n부분 배열 크기를 2배씩 늘려가며 반복\n\n장점\n스택 오버플로우 위험 없음\n호출 스택 오버헤드 없음\n연결 리스트에서 특히 효율적 (O(1) 공간 - 노드 재연결만 필요)\n\n단점\nTop-Down보다 코드가 약간 복잡\n캐시 효율이 약간 낮을 수 있음 (메모리 접근 패턴)\n\n면접 팁: \"모든 재귀는 반복문으로 변환 가능\"의 좋은 예시",
    "references": [
      {
        "title": "Merge sort - Bottom-up",
        "url": "https://en.wikipedia.org/wiki/Merge_sort#Bottom-up_implementation"
      }
    ]
  },
  {
    "id": "DS-031",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "Radix Sort에 대해 설명해 주세요.",
    "answer": "Radix Sort는 자릿수별로 정렬을 반복하는 비교 기반이 아닌 정렬 알고리즘입니다.\n\n종류\nLSD (Least Significant Digit): 가장 작은 자릿수부터 정렬 - 고정 길이 키에 적합\nMSD (Most Significant Digit): 가장 큰 자릿수부터 정렬 - 가변 길이 문자열에 적합\n\nLSD Radix Sort 과정\n\n시간복잡도: O(d  (n + k))\nd: 최대 자릿수 (정수의 경우 logk(maxvalue))\nn: 요소 개수\nk: 기수 (10진법이면 10, 256이면 바이트 단위)\n\n공간복잡도: O(n + k)\n\n특징\nStable (Counting Sort 사용 시)\n정수, 문자열 정렬에 적합\n음수 처리 시 추가 로직 필요\n\n비교 정렬과의 비교\n비교 정렬 하한: O(n log n)\nRadix Sort: O(d  n) - d가 상수이면 O(n)\n단, d = O(log n)이면 O(n log n)과 동일\n\n실제 사용 사례: 정수 정렬, 문자열 정렬, 부동소수점 정렬 (비트 조작 후)",
    "references": [
      {
        "title": "Radix sort - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Radix_sort"
      }
    ]
  },
  {
    "id": "DS-032",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "Bubble Sort, Selection Sort, Insertion Sort의 성능을 비교해 주세요.",
    "answer": "알고리즘   최선   평균   최악   비교 횟수   교환 횟수\n\nBubble   O(n)   O(n^2)   O(n^2)   O(n^2)   O(n^2)\nSelection   O(n^2)   O(n^2)   O(n^2)   O(n^2)   O(n)\nInsertion   O(n)   O(n^2)   O(n^2)   O(n^2)   O(n^2)\n\n실제 성능 (일반적인 경우)\n\nInsertion Sort > Bubble Sort > Selection Sort\n\n이유\nInsertion Sort: 정렬된 부분에서 이진 탐색 가능, 교환 대신 시프트 사용\nSelection Sort: 비교는 항상 O(n^2), 교환은 O(n)으로 적음\nBubble Sort: 비교와 교환 모두 많음\n\nSelection Sort가 나은 경우\n쓰기 비용이 매우 높은 경우 (교환 횟수 O(n))\n예: 플래시 메모리",
    "references": [
      {
        "title": "Comparison of sorting algorithms",
        "url": "https://en.wikipedia.org/wiki/Sorting_algorithm#Comparison_of_algorithms"
      }
    ]
  },
  {
    "id": "DS-033",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "데이터가 거의 정렬되어 있거나 완전히 정렬되어 있을 때, Bubble Sort, Selection Sort, Insertion Sort 각각의 성능은 어떻게 달라지나요?",
    "answer": "예, 크게 달라집니다.\n\n거의/완전 정렬된 데이터의 성능\n\n알고리즘   시간복잡도   이유\n\nInsertion Sort   O(n)   각 요소가 거의 제자리이므로 이동이 적음\nBubble Sort   O(n)   Early termination 적용 시\nSelection Sort   O(n^2)   항상 전체 탐색 필요\n\nInsertion Sort가 가장 효율적인 이유\n이미 정렬된 부분은 비교 1번으로 통과\n완전 정렬 시 n-1번 비교로 종료\n\nBubble Sort (최적화 버전)\n한 패스에서 교환이 없으면 종료\n완전 정렬 시 O(n)\n\nSelection Sort\n항상 남은 요소 중 최솟값을 찾아야 함\n데이터 상태와 무관하게 O(n^2)\n\n결론: 거의 정렬된 데이터에는 Insertion Sort가 최적",
    "references": [
      {
        "title": "Insertion sort - Best case",
        "url": "https://en.wikipedia.org/wiki/Insertion_sort#Best,_worst,_and_average_cases"
      }
    ]
  },
  {
    "id": "DS-034",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "본인이 사용하고 있는 언어에선, 어떤 정렬 알고리즘을 사용하여 정렬 함수를 제공하고 있을까요?",
    "answer": "Java\nArrays.sort() (primitive): Dual-Pivot Quick Sort\nArrays.sort() (Object): Tim Sort\nCollections.sort(): Tim Sort\n\nPython\nsorted(), list.sort(): Tim Sort\n\nC++\nstd::sort(): Intro Sort (Quick Sort + Heap Sort + Insertion Sort)\nstd::stable_sort(): Merge Sort\n\nJavaScript\nArray.sort(): 엔진마다 다름 (V8: Tim Sort)\n\nTim Sort 특징\nMerge Sort + Insertion Sort 혼합\n실제 데이터의 부분 정렬을 활용 (Run 탐지)\nStable, O(n log n), 최선 O(n)\n\nDual-Pivot Quick Sort\n피벗 2개 사용하여 3분할\n기존 Quick Sort보다 평균 성능 향상",
    "references": [
      {
        "title": "Arrays.sort (Java SE 21)",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html#sort(int%5B%5D"
      }
    ]
  },
  {
    "id": "DS-035",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "정렬해야 하는 데이터는 50G 인데, 메모리가 4G라면, 어떤 방식으로 정렬을 진행할 수 있을까요?",
    "answer": "외부 정렬 (External Sort)를 사용합니다.\n\nK-way Merge Sort 방식\n\n1단계: 분할 및 내부 정렬 (Run 생성)\n데이터를 메모리에 맞는 청크로 분할 (예: 3.5GB씩)\n각 청크를 메모리에서 정렬 (Quick Sort 등 내부 정렬 사용)\n정렬된 청크(run)를 임시 파일로 저장\n50GB / 3.5GB = 약 15개의 정렬된 파일(run) 생성\n\n2단계: K-way Merge\n각 파일에서 일부를 버퍼로 읽음 (버퍼 크기 고려)\n최소 힙으로 각 파일의 최솟값 관리\n힙에서 최솟값 추출 -> 출력 버퍼로\n해당 파일에서 다음 값 읽어 힙에 삽입\n모든 파일이 끝날 때까지 반복\n\n최적화 기법\nReplacement Selection: 초기 런 길이를 평균 2배로 늘림\nDouble Buffering: 읽기/쓰기를 병렬화하여 I/O 대기 감소\nSSD 활용: 랜덤 읽기 성능 향상, HDD보다 효율적\n\n시간복잡도 분석\n각 요소는 읽기/쓰기를 O(log(파일 수)) 번 수행\n전체: O(n log n) 비교 + O(n/B * log_M(n/M)) I/O (B: 블록 크기, M: 메모리)\n\n실무 도구: Unix sort 명령어, Hadoop MapReduce",
    "references": [
      {
        "title": "External sorting - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/External_sorting"
      }
    ]
  },
  {
    "id": "DS-036",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "그래프 자료구조에 대해 설명하고, 이를 구현할 수 있는 두 방법에 대해 설명해 주세요.",
    "answer": "그래프는 정점(Vertex)과 간선(Edge)으로 구성된 자료구조입니다.\n\n종류: 방향/무방향, 가중치/비가중치, 순환/비순환\n\n구현 방법\n인접 행렬 (Adjacency Matrix)\n2차원 배열 사용\nmatrix[i][j] = 1이면 i→j 간선 존재\n인접 리스트 (Adjacency List)\n각 정점마다 연결된 정점들의 리스트 저장\n\n항목   인접 행렬   인접 리스트\n\n공간   O(V^2)   O(V + E)\n간선 확인   O(1)   O(degree)\n모든 간선 순회   O(V^2)   O(V + E)\n정점 추가   O(V^2) 재할당   O(1)\n간선 추가   O(1)   O(1)\n\n언제 어떤 것을 사용?\n인접 행렬: 밀집 그래프 (E가 V^2에 가까울 때), 간선 존재 확인이 빈번한 경우\n인접 리스트: 희소 그래프 (E << V^2), 그래프 순회가 주 연산인 경우, 메모리 제약이 있는 경우",
    "references": [
      {
        "title": "Graph (data structure) - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Graph_(abstract_data_type"
      }
    ]
  },
  {
    "id": "DS-037",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "인접 행렬과 인접 리스트 각각에 대해, \"두 정점의 연결 여부 확인\", \"한 정점의 모든 인접 정점 탐색\"의 시간복잡도와 공간복잡도를 비교해 주세요.",
    "answer": "V = 정점 수, E = 간선 수, d = 특정 정점의 차수(degree)\n\n연산   인접 행렬   인접 리스트\n\n두 정점 연결 확인   O(1)   O(d)\n한 정점의 모든 인접 정점   O(V)   O(d)\n공간복잡도   O(V^2)   O(V + E)\n\n상세 설명\n\n인접 행렬\n연결 확인: matrix[u][v] 직접 접근 → O(1)\n인접 정점: 행 전체 탐색 필요 → O(V)\n공간: V x V 배열 → O(V^2)\n\n인접 리스트\n연결 확인: u의 리스트에서 v 검색 → O(d)\n정렬/해시 사용 시 O(log d) 또는 O(1) 가능\n인접 정점: 리스트 순회 → O(d)\n공간: 각 간선이 리스트에 저장 → O(V + E)\n\n선택 기준\n밀집 그래프 (E ≈ V^2): 인접 행렬\n희소 그래프 (E << V^2): 인접 리스트",
    "references": [
      {
        "title": "Adjacency list - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Adjacency_list#Trade-offs"
      }
    ]
  },
  {
    "id": "DS-038",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "정점의 개수가 N개이고 간선의 개수가 N^3개인 매우 밀집된 그래프라면, 인접 행렬과 인접 리스트 중 어떤 방식이 효율적인가요?",
    "answer": "인접 행렬이 더 효율적입니다.\n\n분석\n정점: N개\n간선: N^3개 (매우 밀집된 그래프, 다중 간선 가능)\n\n공간복잡도 비교\n인접 행렬: O(N^2)\n인접 리스트: O(N + N^3) = O(N^3)\n\n인접 행렬이 유리한 이유\n공간 효율: N^2 < N^3 (N > 1일 때)\n간선 접근 속도: O(1) vs O(N^3/N) = O(N^2)\n캐시 효율: 연속된 메모리 접근\n\n단, 다중 간선 고려 시\n같은 정점 쌍 사이에 여러 간선이 있다면\n인접 행렬에 개수나 리스트를 저장하는 방식 필요\n이 경우에도 기본 구조는 행렬이 효율적\n\n결론: 간선이 N^3개로 매우 많은 밀집 그래프에서는 인접 행렬이 공간과 시간 모두에서 효율적",
    "references": [
      {
        "title": "Dense graph - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Dense_graph"
      }
    ]
  },
  {
    "id": "DS-039",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "사이클이 없는 그래프는 모두 트리인가요? 그렇지 않다면, 예시를 들어주세요.",
    "answer": "아니오, 사이클이 없는 그래프가 모두 트리는 아닙니다.\n\n트리의 정의\n트리는 다음 조건을 모두 만족해야 합니다:\n사이클이 없음\n연결되어 있음 (모든 정점 쌍 사이에 경로 존재)\n간선 수 = 정점 수 - 1\n\n반례: 포레스트 (Forest)\n사이클 없음\n연결되어 있지 않음 (두 개의 분리된 컴포넌트)\n트리가 아님\n\n반례: 방향 비순환 그래프 (DAG)\n사이클 없음 (방향 고려)\n무방향으로 보면 사이클 존재\n트리가 아님\n\n정리\n사이클 없음 + 연결됨 = 트리\n사이클 없음 + 연결 안 됨 = 포레스트 (트리들의 집합)",
    "references": [
      {
        "title": "Tree (graph theory) - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Tree_(graph_theory"
      }
    ]
  },
  {
    "id": "DS-040",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "그래프에서, 최단거리를 구하는 방법에 대해 설명해 주세요.",
    "answer": "상황별 최단 거리 알고리즘\n\n조건   알고리즘   시간복잡도   공간복잡도\n\n가중치 없음   BFS   O(V + E)   O(V)\n가중치 양수 (단일 출발)   Dijkstra   O((V+E) log V)   O(V)\n음수 가중치 (단일 출발)   Bellman-Ford   O(VE)   O(V)\n모든 쌍   Floyd-Warshall   O(V^3)   O(V^2)\n음수 사이클 탐지   Bellman-Ford   O(VE)   O(V)\nDAG   위상정렬 + DP   O(V + E)   O(V)\n가중치 0 또는 1   0-1 BFS (Deque)   O(V + E)   O(V)\n\n주요 알고리즘\n\nBFS: 가중치 없는(또는 동일한) 그래프에서 최단 경로\n\nDijkstra: 우선순위 큐로 최소 거리 정점 선택, 음수 가중치 불가\n힙 사용: O((V+E) log V), 희소 그래프에 유리\n배열 사용: O(V^2), 밀집 그래프에 유리\n\nBellman-Ford: 모든 간선을 V-1번 완화, 음수 가중치 가능\nV번째 반복에서 갱신 발생 시 음수 사이클 존재\n\nFloyd-Warshall: DP로 모든 쌍 최단 거리, d[i][j] = min(d[i][j], d[i][k] + d[k][j])\nk를 경유지로 고려, 음수 간선 가능 (음수 사이클 제외)",
    "references": [
      {
        "title": "Shortest path problem - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Shortest_path_problem"
      }
    ]
  },
  {
    "id": "DS-041",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "트리에서 두 노드 간의 최단거리를 구하는 방법을 설명해 주세요. (일반 그래프 알고리즘 외에 트리 특성을 활용한 방법)",
    "answer": "트리의 특성: 두 정점 사이에 유일한 경로가 존재\n\n방법 1: LCA (Lowest Common Ancestor) 활용\n전처리: O(n log n) 또는 O(n)\n쿼리: O(log n) 또는 O(1)\n\n방법 2: 단순 DFS/BFS\n한 정점에서 시작하여 목표 정점까지 탐색\n시간: O(n)\n유일한 경로이므로 최단 거리 보장\n\n방법 3: Euler Tour + Sparse Table\nEuler Tour로 트리를 배열로 변환\nRMQ(Range Minimum Query)로 LCA 계산\n전처리: O(n log n), 쿼리: O(1)\n\n가중치 트리\ndist[x]: 루트에서 x까지의 거리",
    "references": [
      {
        "title": "Lowest common ancestor - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Lowest_common_ancestor"
      }
    ]
  },
  {
    "id": "DS-042",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "다익스트라 알고리즘에서 힙을 사용하지 않고 구현한다면 시간복잡도가 어떻게 변화하나요?",
    "answer": "힙 사용 시: O((V + E) log V)\n\n힙 미사용 시: O(V^2)\n\n힙 미사용 구현\n\n시간복잡도 분석\n최소 정점 찾기: V번 × O(V) = O(V^2)\n거리 갱신: 총 O(E)\n전체: O(V^2 + E) = O(V^2)\n\n언제 힙 미사용이 유리한가?\n밀집 그래프 (E ≈ V^2)인 경우\n힙 사용: O(V^2 log V)\n힙 미사용: O(V^2)\n희소 그래프 (E << V^2)에서는 힙이 유리",
    "references": [
      {
        "title": "Dijkstra's algorithm - Running time",
        "url": "https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Running_time"
      }
    ]
  },
  {
    "id": "DS-043",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "정점의 개수가 N개이고 간선의 개수가 N^3개인 밀집 그래프에서 최단거리를 구할 때, 어떤 알고리즘이 효율적인가요?",
    "answer": "단일 출발점: 힙 없는 Dijkstra - O(N^2)\n\n모든 쌍: Floyd-Warshall - O(N^3)\n\n분석\n\n알고리즘   시간복잡도   E = N^3일 때\n\nDijkstra (힙)   O((V+E) log V)   O(N^3 log N)\nDijkstra (배열)   O(V^2)   O(N^2)\nBellman-Ford   O(VE)   O(N^4)\nFloyd-Warshall   O(V^3)   O(N^3)\n\n단일 출발점 최단 경로\n힙 없는 Dijkstra가 O(N^2)로 가장 효율적\n힙 사용 시 O(N^3 log N)으로 오히려 느림\n\n모든 쌍 최단 경로\nFloyd-Warshall: O(N^3)\nDijkstra N번: O(N^3) (힙 없는 버전)\n둘 다 비슷하지만 Floyd-Warshall이 구현 간단\n\n결론: 매우 밀집된 그래프에서는 힙의 오버헤드가 역효과를 내므로, 단순한 O(V^2) 구현이 효율적",
    "references": [
      {
        "title": "Floyd-Warshall algorithm - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm"
      }
    ]
  },
  {
    "id": "DS-044",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "A\\* 알고리즘에 대해 설명해 주세요. 이 알고리즘은 다익스트라와 비교해서 어떤 성능을 낼까요?",
    "answer": "*A\\ 알고리즘은 휴리스틱을 사용한 최단 경로 알고리즘입니다.\n\n핵심 공식\ng(n): 시작점에서 n까지의 실제 비용\nh(n): n에서 목표점까지의 추정 비용 (휴리스틱)\nf(n): 총 예상 비용\n\n휴리스틱 조건\nAdmissible: h(n) <= 실제 비용 (과대평가 금지) → 최단 경로 보장\nConsistent (Monotonic): h(n) <= cost(n, m) + h(m) → 효율성 향상, 재방문 불필요\n\n일반적인 휴리스틱 함수\n2D 그리드 (4방향): 맨해튼 거리\n2D 그리드 (8방향): 체비셰프 거리 또는 옥타일 거리\n유클리드 거리: 항상 admissible하지만 계산 비용 높음\n\n다익스트라와 비교*\n\n항목   Dijkstra   A\n\n휴리스틱   없음 (h=0)   있음\n탐색 방향   모든 방향 (동심원)   목표 방향 (타원형)\n탐색 노드 수   많음   적음 (좋은 h일수록)\n최적성   항상 최적   admissible h면 최적\n적용 대상   일반 그래프   목표가 명확한 경우\n\n성능\n좋은 휴리스틱: 다익스트라보다 훨씬 빠름\nh=0이면 다익스트라와 동일\nh=실제비용 (완벽한 휴리스틱)이면 최적 경로만 탐색\n최악: 다익스트라와 같은 O((V+E) log V)\n\n주의: 음수 가중치가 있으면 A*도 사용 불가",
    "references": [
      {
        "title": "A* search algorithm - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/A*_search_algorithm"
      }
    ]
  },
  {
    "id": "DS-045",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "음수 간선이 있을 때와, 음수 사이클이 있을 때 각각 어떤 최단거리 알고리즘을 사용해야 하는지 설명해 주세요.",
    "answer": "음수 간선이 있을 때 (음수 사이클 없음)\n\n알고리즘   사용 가능   시간복잡도\n\nDijkstra   불가   -\nBellman-Ford   가능   O(VE)\nSPFA   가능   평균 O(E), 최악 O(VE)\nFloyd-Warshall   가능   O(V^3)\n\nDijkstra가 불가능한 이유\n한 번 확정된 최단 거리가 나중에 더 짧아질 수 있음\nGreedy 접근이 실패\n\n음수 사이클이 있을 때\n\n최단 거리가 정의되지 않음 (무한히 작아질 수 있음)\n\n대응 방법\nBellman-Ford로 음수 사이클 탐지\nV번째 반복에서도 갱신이 발생하면 음수 사이클 존재\nFloyd-Warshall로 탐지\nd[i][i] < 0이면 음수 사이클 존재",
    "references": [
      {
        "title": "Bellman-Ford algorithm - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm"
      }
    ]
  },
  {
    "id": "DS-046",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "재귀함수에 대해 설명해 주세요.",
    "answer": "재귀함수는 자기 자신을 호출하는 함수입니다.\n\n구성 요소\nBase Case (기저 조건): 재귀를 멈추는 조건\nRecursive Case: 자기 자신을 호출하는 부분\n문제 축소: 각 호출마다 문제 크기가 감소\n\n예시: 팩토리얼\n\n장점\n코드가 간결하고 이해하기 쉬움\n분할 정복, 트리 탐색 등에 자연스러움\n\n단점\n호출 스택 오버헤드\nStack Overflow 위험\n반복문보다 느릴 수 있음\n\n활용\n트리/그래프 탐색 (DFS)\n분할 정복 (Merge Sort, Quick Sort)\n동적 계획법 (메모이제이션)\n백트래킹",
    "references": [
      {
        "title": "Recursion (computer science) - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Recursion_(computer_science"
      }
    ]
  },
  {
    "id": "DS-047",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "재귀 함수의 동작 과정을 Call Stack을 활용해서 설명해 주세요.",
    "answer": "Call Stack: 함수 호출 정보를 저장하는 스택 자료구조\n\n저장 정보\n반환 주소 (Return Address)\n지역 변수\n매개변수\n이전 스택 프레임 포인터\n\nfactorial(4) 호출 과정\n\nStack Overflow\n스택 크기는 제한적 (보통 1MB)\n재귀 깊이가 너무 깊으면 오버플로우 발생",
    "references": [
      {
        "title": "Call stack - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Call_stack"
      }
    ]
  },
  {
    "id": "DS-048",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "프로그래밍 언어에 따라 재귀함수의 최적화를 진행해주는 경우가 있습니다. 어떤 경우에 재귀함수의 최적화가 가능하며, 이를 어떻게 최적화하나요?",
    "answer": "꼬리 재귀 최적화 (Tail Call Optimization, TCO)\n\n꼬리 재귀 조건\n재귀 호출이 함수의 마지막 연산이어야 함\n재귀 호출 결과를 그대로 반환\n\n최적화 방법\n컴파일러가 재귀를 반복문으로 변환\n스택 프레임을 재사용하여 O(1) 공간\n\n언어별 지원\n언어   TCO 지원\n\nScheme, Haskell   필수 (스펙)\nScala, Kotlin   지원 (@tailrec)\nJavaScript   ES6 스펙 (구현은 제한적)\nJava, Python   미지원\nC/C++   컴파일러 최적화로 가능",
    "references": [
      {
        "title": "Tail call - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Tail_call"
      }
    ]
  },
  {
    "id": "DS-049",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "MST가 무엇이고, 어떻게 구할 수 있을지 설명해 주세요.",
    "answer": "MST (최소 신장 트리)는 그래프의 모든 정점을 연결하면서 간선 가중치 합이 최소인 트리입니다.\n\n특징\n정점 V개, 간선 V-1개\n사이클 없음\n연결 그래프\n\n구하는 알고리즘\nKruskal 알고리즘\n모든 간선을 가중치 순으로 정렬\n가장 작은 간선부터 선택\n사이클이 생기면 건너뜀 (Union-Find로 확인)\nV-1개 간선 선택 시 종료\n\n시간복잡도: O(E log E)\nPrim 알고리즘\n임의의 정점에서 시작\n현재 트리와 연결된 간선 중 최소 가중치 선택\n새 정점을 트리에 추가\n모든 정점 포함 시 종료\n\n시간복잡도: O(E log V) (힙 사용)",
    "references": [
      {
        "title": "Minimum spanning tree - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Minimum_spanning_tree"
      }
    ]
  },
  {
    "id": "DS-050",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "Kruskal 알고리즘에서 사용하는 Union-Find 자료구조에 대해 설명해 주세요.",
    "answer": "Union-Find (Disjoint Set Union, DSU)는 서로소 집합을 관리하는 자료구조입니다.\n\n주요 연산\nFind(x): x가 속한 집합의 대표(루트) 반환\nUnion(x, y): x와 y가 속한 집합을 합침\n\n최적화 기법\nPath Compression (경로 압축)\nFind 시 모든 노드를 루트에 직접 연결\nUnion by Rank/Size\n작은 트리를 큰 트리에 붙임\n\n시간복잡도\n두 최적화 적용 시: 분할상환 O(α(n)) ≈ 실질적으로 O(1)\nα: 아커만 함수의 역함수 (n이 우주의 원자 수여도 5 미만)\n단일 연산 최악: O(log n), 하지만 연속 m개 연산은 O(m * α(n))",
    "references": [
      {
        "title": "Disjoint-set data structure - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Disjoint-set_data_structure"
      }
    ]
  },
  {
    "id": "DS-051",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "MST를 구하는 Kruskal 알고리즘과 Prim 알고리즘 중, 어떤 것이 더 빠를까요?",
    "answer": "상황에 따라 다릅니다.\n\n알고리즘   시간복잡도   적합한 경우\n\nKruskal   O(E log E) = O(E log V)   희소 그래프\nPrim (힙)   O(E log V)   중간~밀집 그래프\nPrim (배열)   O(V^2)   매우 밀집된 그래프\n\n비교 분석\n\n희소 그래프 (E ~ V)\nKruskal: O(V log V)\nPrim (힙): O(V log V)\n비슷하지만 Kruskal이 구현 간단하고 간선 리스트로 바로 사용 가능\n\n밀집 그래프 (E ~ V^2)\nKruskal: O(V^2 log V)\nPrim (힙): O(V^2 log V)\nPrim (배열): O(V^2)\nPrim (배열)이 유리\n\n추가 고려사항\nKruskal: 간선 정렬 필요, Union-Find 오버헤드, 간선 리스트 형태 입력에 적합\nPrim: 시작점 필요, 우선순위 큐 관리, 인접 행렬/리스트 입력에 적합\n\n결론\nE < V log V (희소): Kruskal 선호\nE > V log V (밀집): Prim 선호\n입력 형태에 따라 선택 (간선 리스트 vs 인접 행렬)",
    "references": [
      {
        "title": "Prim's algorithm - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Prim%27s_algorithm"
      }
    ]
  },
  {
    "id": "DS-052",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "MST를 구하는 Kruskal과 Prim 알고리즘을 통해 얻어진 결과물은 무조건 트리인가요? 그렇다면 증명하고, 그렇지 않다면 반례를 설명해 주세요.",
    "answer": "예, 항상 트리입니다. (연결 그래프가 입력인 경우)\n\n트리의 조건\n사이클이 없음\n연결되어 있음\n간선 수 = 정점 수 - 1\n\nKruskal 증명\n사이클 없음: Union-Find로 사이클 형성 간선을 명시적으로 제외\n연결성: 연결 그래프에서 V-1개 간선 선택 시 모든 정점 연결\n간선 수: 정확히 V-1개 선택하면 종료\n\nPrim 증명\n사이클 없음: 항상 트리에 포함되지 않은 정점으로 확장\n이미 트리에 있는 정점으로 간선을 추가하지 않음\n연결성: 시작점에서 확장하므로 모든 선택된 정점이 연결됨\n간선 수: V개 정점 모두 포함 시 V-1개 간선\n\n비연결 그래프인 경우\n최소 신장 포레스트가 생성됨\n각 연결 요소에 대해 별도의 트리",
    "references": [
      {
        "title": "Kruskal's algorithm correctness",
        "url": "https://en.wikipedia.org/wiki/Kruskal%27s_algorithm#Correctness"
      }
    ]
  },
  {
    "id": "DS-053",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "Thread Safe 한 자료구조가 있나요? 있다면 어떤 것이 있고, 일반 자료구조를 Thread Safe 하게 만들려면 어떻게 해야 하나요?",
    "answer": "Thread Safe 자료구조 존재합니다.\n\nJava 제공 Thread Safe 자료구조\nConcurrentHashMap\nCopyOnWriteArrayList\nBlockingQueue (LinkedBlockingQueue 등)\nConcurrentLinkedQueue\nCollections.synchronizedXxx()\n\nThread Safe 구성 방법\n동기화 (Synchronization)\nLock 사용\nAtomic 연산\nImmutable 객체\n불변 객체는 본질적으로 Thread Safe\nThread Local\n각 스레드가 독립된 복사본 보유",
    "references": [
      {
        "title": "ConcurrentHashMap (Java SE 21)",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html"
      }
    ]
  },
  {
    "id": "DS-054",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "배열의 길이를 알고 있을 때, 전체 배열에 하나의 락을 거는 것보다 더 효율적인 Thread Safe 연산을 구현할 수 있나요?",
    "answer": "예, 분할 잠금(Lock Striping)을 사용할 수 있습니다.\n\n방법 1: 세그먼트별 락\n배열을 여러 세그먼트로 분할\n각 세그먼트에 별도의 락\n서로 다른 세그먼트는 동시 접근 가능\n\n방법 2: 인덱스별 락 (Fine-grained)\n각 인덱스마다 독립된 락\n최대 병렬성, 메모리 오버헤드 큼\n\n방법 3: Lock-Free with CAS\n\n방법 4: 읽기 최적화\nReadWriteLock: 읽기는 동시에, 쓰기만 배타적\nStampedLock: 낙관적 읽기 지원\n\n최적 선택: 접근 패턴에 따라 세그먼트 수 조정",
    "references": [
      {
        "title": "AtomicReferenceArray (Java SE 21)",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/atomic/AtomicReferenceArray.html"
      }
    ]
  },
  {
    "id": "DS-055",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "사용하고 있는 언어의 자료구조는 Thread Safe 한가요? 그렇지 않다면, Thread Safe 한 Wrapped Data Structure 를 제공하고 있나요?",
    "answer": "Java 기본 컬렉션: Thread Safe 하지 않음\n\nArrayList, HashMap, HashSet 등은 동기화되지 않음\n\nThread Safe 대안\nCollections.synchronizedXxx()\n모든 메서드를 synchronized로 래핑\n단순하지만 성능 저하 (전체 락)\njava.util.concurrent 패키지\n기본   Thread Safe\n\nHashMap   ConcurrentHashMap\nArrayList   CopyOnWriteArrayList\nLinkedList   ConcurrentLinkedQueue\nTreeMap   ConcurrentSkipListMap\nHashSet   ConcurrentHashMap.newKeySet()\n레거시 Thread Safe 컬렉션\nVector (ArrayList 대신)\nHashtable (HashMap 대신)\n성능이 낮아 권장하지 않음\n\nPython: GIL로 인해 일부 연산은 atomic하지만, 완전한 Thread Safe는 아님. queue.Queue 등 제공",
    "references": [
      {
        "title": "Collections.synchronizedList (Java SE 21)",
        "url": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collections.html#synchronizedList(java.util.List"
      }
    ]
  },
  {
    "id": "DS-056",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "문자열을 저장하고, 처리하는 주요 자료구조 및 알고리즘 (Trie, KMP, Rabin Karp 등) 에 대해 설명해 주세요.",
    "answer": "자료구조\n\nTrie (Prefix Tree)\n문자열을 문자 단위로 트리에 저장\n접두사 검색에 최적화\n시간: 삽입/검색 O(m), m = 문자열 길이\n공간: O(알파벳 크기 * 총 노드 수) - 포인터 오버헤드 큼\n활용: 자동완성, 사전, IP 라우팅 테이블\n트레이드오프: 메모리 많이 사용 vs 접두사 연산 효율적\n\n압축 Trie (Radix Tree / Patricia Trie)\n자식이 하나인 노드들을 압축\n공간 효율 개선\n\nSuffix Tree / Suffix Array\n모든 접미사를 저장\n부분 문자열 검색 O(m)\n공간: Suffix Array가 더 효율적\n\n알고리즘 (패턴 매칭)\n\n알고리즘   시간복잡도   특징\n\nNaive   O(nm)   단순 비교\nKMP   O(n+m)   실패 함수로 불필요한 비교 스킵\nRabin-Karp   O(n+m) 평균   해시 기반, 다중 패턴에 유리\nBoyer-Moore   O(n/m) 최선   뒤에서부터 비교\n\nKMP: 접두사=접미사 정보를 활용하여 불일치 시 패턴을 효율적으로 이동\n\nRabin-Karp: 롤링 해시로 윈도우 해시값을 O(1)에 갱신, 해시 일치 시 실제 비교",
    "references": [
      {
        "title": "Trie - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Trie"
      }
    ]
  },
  {
    "id": "DS-057",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "이진탐색이 무엇인지 설명하고, 시간복잡도를 증명해 보세요.",
    "answer": "이진 탐색: 정렬된 배열에서 중간값과 비교하여 탐색 범위를 절반씩 줄여나가는 알고리즘\n\n알고리즘\n\n시간복잡도: O(log n)\n\n증명\n각 단계에서 탐색 범위가 절반으로 감소\nk번째 단계의 탐색 범위: n / 2^k\n탐색 종료 조건: n / 2^k <= 1\n따라서: 2^k >= n → k >= log₂n\n최대 반복 횟수: O(log n)\n\n점화식 증명",
    "references": [
      {
        "title": "Binary search algorithm - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Binary_search_algorithm"
      }
    ]
  },
  {
    "id": "DS-058",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "Lower Bound, Upper Bound 는 무엇이고, 이를 어떻게 구현할 수 있을까요?",
    "answer": "정의 (정렬된 배열에서)\nLower Bound: target 이상인 첫 번째 위치\nUpper Bound: target 초과인 첫 번째 위치\n\n예시: [1, 2, 2, 2, 3, 4]에서 target=2\nLower Bound: index 1 (첫 번째 2)\nUpper Bound: index 4 (첫 번째 3)\n2의 개수 = Upper - Lower = 4 - 1 = 3\n\n구현\n\n차이점: < vs <= 부등호 하나 차이\n\n활용: 특정 값의 개수, 범위 쿼리, 삽입 위치 찾기",
    "references": [
      {
        "title": "std::lower_bound - cppreference",
        "url": "https://en.cppreference.com/w/cpp/algorithm/lower_bound"
      }
    ]
  },
  {
    "id": "DS-059",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "이진탐색의 논리를 적용하여 삼진탐색을 작성한다고 가정한다면, 시간복잡도는 어떻게 변화할까요? (실제 존재하는 삼진탐색 알고리즘은 무시하세요!)",
    "answer": "삼진 탐색 (가상): 배열을 3등분하여 탐색\n\n시간복잡도: O(log₃n) = O(log n)\n\n분석\n각 단계에서 범위가 1/3로 감소\n최대 반복 횟수: log₃n\n밑 변환: log₃n = log₂n / log₂3 ≈ 0.63  log₂n\n\n비교 횟수 분석\n이진 탐색: 단계당 1~2번 비교, 총 log₂n 단계\n삼진 탐색: 단계당 2번 비교 필요, 총 log₃n 단계\n\n총 비교 횟수\n이진: 약 log₂n ≈ 1.0  log₂n 비교\n삼진: 약 2  log₃n ≈ 2  0.63  log₂n ≈ 1.26  log₂n 비교\n\n결론\n빅오 표기법: 동일한 O(log n)\n실제 비교 횟수: 이진 탐색이 더 적음\n분기를 늘려도 비교 횟수 증가로 이점 상쇄\n캐시 효율도 이진 탐색이 유리",
    "references": [
      {
        "title": "Ternary search - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Ternary_search"
      }
    ]
  },
  {
    "id": "DS-060",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "이진탐색 구현에서 비교 부등호나 루프 조건의 부등호가 바뀌면 어떤 영향이 있나요?",
    "answer": "부등호 변경은 탐색 결과와 종료 조건에 큰 영향을 줍니다.\n\n주요 변경 포인트\n비교 부등호 (< vs <=)\n루프 조건 (< vs <=)\nright 초기값\n\n잘못된 부등호의 결과\n무한 루프: mid 계산과 범위 갱신이 맞지 않을 때\nOff-by-one 에러: 정확히 하나 벗어난 결과\n경계 누락: 첫 번째/마지막 요소 탐색 실패\n\n안전한 패턴",
    "references": [
      {
        "title": "Binary search - Implementation issues",
        "url": "https://en.wikipedia.org/wiki/Binary_search_algorithm#Implementation_issues"
      }
    ]
  },
  {
    "id": "DS-061",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "그리디 알고리즘과 동적 계획법을 비교해 주세요.",
    "answer": "항목   그리디   동적 계획법 (DP)\n\n접근법   현재 최선의 선택   모든 경우 고려\n최적 보장   특정 조건 시만   항상 보장\n시간복잡도   일반적으로 낮음   상태 수에 비례\n공간복잡도   O(1) 가능   상태 저장 필요\n되돌림   없음 (한번 선택하면 끝)   있음 (서브문제 재활용)\n증명   귀류법/교환 논증 필요   점화식 정의로 자연스럽게\n\n그리디 알고리즘\n각 단계에서 지역 최적해 선택\n탐욕 선택 속성: 지역 최적이 전역 최적으로 이어짐\n최적 부분 구조: 부분 문제의 최적해로 전체 최적해 구성\n예: 거스름돈 (특정 화폐 단위), 활동 선택, Huffman 코딩, MST, Dijkstra\n\n함정 질문: 거스름돈 문제는 항상 그리디로 풀 수 있나요?\n아니오. 화폐 단위가 [1, 3, 4]이고 6원을 거슬러 줄 때\n그리디: 4 + 1 + 1 = 3개\n최적: 3 + 3 = 2개\n일반적인 화폐 시스템에서는 DP 필요\n\n동적 계획법\n중복 부분 문제: 같은 부분 문제가 반복\n최적 부분 구조: 부분 문제의 최적해로 전체 최적해 구성\n메모이제이션 또는 타뷸레이션으로 중복 계산 방지\n예: 피보나치, 배낭 문제, 최장 공통 부분 수열",
    "references": [
      {
        "title": "Greedy algorithm - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Greedy_algorithm"
      }
    ]
  },
  {
    "id": "DS-062",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "그리디 알고리즘과 동적 계획법은 각각 어떤 경우에 사용할 수 있나요?",
    "answer": "그리디를 사용할 수 있는 경우\n\n조건\n탐욕 선택 속성: 현재 최선이 전체 최선으로 이어짐\n최적 부분 구조: 부분 문제의 최적해가 전체 최적해 구성\n\n대표 문제\n거스름돈 (특정 화폐 단위)\n활동 선택 (회의실 배정)\n최소 신장 트리 (Kruskal, Prim)\n다익스트라 최단 경로\nHuffman 인코딩\n\nDP를 사용해야 하는 경우\n\n조건\n중복 부분 문제: 같은 계산이 반복\n최적 부분 구조: 있지만 그리디로 안 됨\n선택이 미래에 영향을 미침\n\n대표 문제\n0/1 배낭 문제 (그리디 불가)\n최장 공통 부분 수열 (LCS)\n편집 거리\n행렬 체인 곱셈\n동전 교환 (일반적인 화폐 단위)\n\n판단 기준",
    "references": [
      {
        "title": "Dynamic programming - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Dynamic_programming"
      }
    ]
  },
  {
    "id": "DS-063",
    "category": "ds",
    "categoryName": "자료구조",
    "section": "cs",
    "question": "동적 계획법(DP)으로 풀 수 있는 모든 문제는 재귀로 변환하여 풀 수 있나요?",
    "answer": "예, 가능합니다.\n\nDP와 재귀(메모이제이션)는 수학적으로 동치입니다.\n\n두 가지 접근법\nTop-Down (재귀 + 메모이제이션)\nBottom-Up (타뷸레이션)\n\n차이점\n\n항목   Top-Down   Bottom-Up\n\n구현   직관적   상태 순서 고려 필요\n필요한 상태만   계산   모두 계산\n스택 오버플로우   가능   없음\n공간 최적화   어려움   용이\n\n결론: 모든 DP 문제는 재귀로 표현 가능하며, 메모이제이션을 추가하면 동일한 시간복잡도 달성",
    "references": [
      {
        "title": "Memoization - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Memoization"
      }
    ]
  },
  {
    "id": "NET-001",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP에 대해 설명해 주세요.",
    "answer": "HTTP(HyperText Transfer Protocol)는 웹에서 클라이언트와 서버 간 데이터를 주고받는 애플리케이션 계층 프로토콜입니다. 요청-응답 모델 기반이며, Stateless 특성을 가집니다.\n\n주요 특징:\n요청-응답 모델: 클라이언트가 요청하고 서버가 응답 (서버가 먼저 푸시 불가, HTTP/2 Server Push 제외)\nStateless: 각 요청이 독립적, 이전 요청 정보를 서버가 유지하지 않음\n텍스트 기반 (HTTP/1.x): 사람이 읽을 수 있는 형태, 디버깅 용이",
    "references": [
      {
        "title": "RFC 9110 - HTTP Semantics",
        "url": "https://www.rfc-editor.org/rfc/rfc9110"
      }
    ]
  },
  {
    "id": "NET-002",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP의 특성인 Stateless에 대해 설명해 주세요.",
    "answer": "Stateless란 서버가 클라이언트의 이전 요청 상태를 저장하지 않는 특성입니다. 각 요청은 독립적으로 처리되며, 필요한 모든 정보를 요청에 포함해야 합니다. 이로 인해 서버 확장이 용이합니다.",
    "references": [
      {
        "title": "RFC 9110 Section 3.3",
        "url": "https://www.rfc-editor.org/rfc/rfc9110#section-3.3"
      }
    ]
  },
  {
    "id": "NET-003",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP의 Stateless와 Connectionless 특성의 차이점에 대해 설명해 주세요.",
    "answer": "Stateless: 서버가 클라이언트 상태를 저장하지 않음. 각 요청이 독립적\nConnectionless: 요청-응답 후 연결을 끊음. HTTP/1.0의 기본 동작\n\nStateless는 \"상태 비저장\", Connectionless는 \"연결 비유지\"를 의미합니다.",
    "references": [
      {
        "title": "RFC 9110",
        "url": "https://www.rfc-editor.org/rfc/rfc9110"
      }
    ]
  },
  {
    "id": "NET-004",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "왜 HTTP는 Stateless 구조를 채택하고 있을까요?",
    "answer": "서버 확장성: 상태를 저장하지 않아 어떤 서버든 요청 처리 가능\n단순성: 서버 구현이 단순해지고 리소스 절약\n장애 복구: 서버 장애 시에도 다른 서버가 바로 대체 가능",
    "references": [
      {
        "title": "RFC 9110 Section 3.3",
        "url": "https://www.rfc-editor.org/rfc/rfc9110#section-3.3"
      }
    ]
  },
  {
    "id": "NET-005",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP의 Connectionless 특성으로 인해 매 요청마다 연결을 새로 수립해야 해서 성능이 좋지 않을 것으로 보이는데, 해결 방법이 있을까요?",
    "answer": "HTTP/1.1부터 Keep-Alive(Persistent Connection)를 도입하여 해결합니다. 하나의 TCP 연결로 여러 요청/응답을 처리하여 연결 설정 오버헤드를 줄입니다.",
    "references": [
      {
        "title": "RFC 9112 Section 9.3",
        "url": "https://www.rfc-editor.org/rfc/rfc9112#section-9.3"
      }
    ]
  },
  {
    "id": "NET-006",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP의 keep-alive와 HTTP의 keep-alive의 차이는 무엇인가요?",
    "answer": "TCP Keep-Alive: 연결이 살아있는지 확인하는 프로브 패킷. 유휴 연결 감지 목적\nHTTP Keep-Alive: 하나의 TCP 연결로 여러 HTTP 요청/응답을 처리. 성능 최적화 목적\n\nTCP는 \"연결 상태 확인\", HTTP는 \"연결 재사용\"이 목적입니다.",
    "references": [
      {
        "title": "RFC 9112",
        "url": "https://www.rfc-editor.org/rfc/rfc9112"
      }
    ]
  },
  {
    "id": "NET-007",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP/1.1과 HTTP/2의 차이점은 무엇인가요?",
    "answer": "구분   HTTP/1.1   HTTP/2\n\n전송 방식   텍스트   바이너리 프레임\n다중화   불가 (순차 처리)   멀티플렉싱 지원\n헤더   중복 전송   HPACK 압축\n서버 푸시   미지원   지원",
    "references": [
      {
        "title": "RFC 9113 - HTTP/2",
        "url": "https://www.rfc-editor.org/rfc/rfc9113"
      }
    ]
  },
  {
    "id": "NET-008",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP에서 발생하는 HOL(Head-of-Line) Blocking에 대해 설명해 주세요.",
    "answer": "HOL(Head-of-Line) Blocking은 앞선 요청이 완료될 때까지 뒤의 요청이 대기하는 현상입니다.\nHTTP/1.1: 파이프라이닝에서 앞 응답 지연 시 뒤 응답도 지연\nHTTP/2: 애플리케이션 레벨 HOL은 해결, TCP 레벨 HOL은 존재\nHTTP/3: QUIC 사용으로 TCP HOL도 해결",
    "references": [
      {
        "title": "RFC 9113 Section 1",
        "url": "https://www.rfc-editor.org/rfc/rfc9113#section-1"
      }
    ]
  },
  {
    "id": "NET-009",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP/3.0의 주요 특징에 대해 설명해 주세요.",
    "answer": "QUIC 프로토콜: UDP 기반으로 TCP의 HOL Blocking 해결\n0-RTT 연결: 이전 연결 정보로 빠른 재연결 (단, Replay Attack 취약점 존재)\n연결 마이그레이션: IP 변경 시에도 연결 유지 (Connection ID 사용, 모바일 환경에서 유용)\n내장 TLS 1.3: 보안이 기본 포함, 암호화되지 않은 HTTP/3는 존재하지 않음\n\n트레이드오프:\n장점: 지연시간 감소, HOL Blocking 해결, 연결 이동성\n단점: UDP 기반으로 일부 방화벽/네트워크에서 차단될 수 있음, CPU 사용량 증가 가능",
    "references": [
      {
        "title": "RFC 9114 - HTTP/3",
        "url": "https://www.rfc-editor.org/rfc/rfc9114"
      }
    ]
  },
  {
    "id": "NET-010",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "왜 HTTP는 TCP를 사용하나요?",
    "answer": "HTTP는 신뢰성 있는 데이터 전송이 필요하기 때문입니다.\n웹 페이지, 파일 등은 데이터 손실 없이 정확하게 전달되어야 함\nTCP는 순서 보장, 재전송, 흐름/혼잡 제어 제공\nUDP는 이런 기능이 없어 애플리케이션에서 직접 구현 필요\n\n역사적 맥락: HTTP가 설계될 당시(1991년)에는 TCP가 신뢰성 있는 전송의 유일한 선택지였습니다. 이후 HTTP/3에서 QUIC이 등장하며 UDP 위에서 신뢰성을 구현하는 방식으로 전환됩니다.",
    "references": [
      {
        "title": "RFC 9110 Section 3.3",
        "url": "https://www.rfc-editor.org/rfc/rfc9110#section-3.3"
      }
    ]
  },
  {
    "id": "NET-011",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP는 신뢰성을 위해 TCP를 사용하는데, 왜 HTTP/3에서는 UDP를 사용하나요? UDP의 신뢰성 문제가 해결되었나요?",
    "answer": "QUIC 프로토콜이 UDP 위에서 TCP의 기능을 직접 구현합니다.\n신뢰성: QUIC이 재전송, 순서 보장, 흐름/혼잡 제어 직접 구현\nTCP HOL 해결: 스트림 단위 독립 처리로 한 스트림 손실이 다른 스트림에 영향 없음\nUDP 선택 이유:\n커널 수정 없이 사용자 공간에서 빠른 개선 가능 (TCP는 OS 커널에 구현)\n중간 장치(NAT, 방화벽)가 TCP를 수정하는 문제 회피 (ossification 문제)\nUDP는 이미 널리 지원됨\n\n결론: UDP가 신뢰성이 생긴 것이 아니라, QUIC이라는 새 프로토콜이 UDP를 전송 수단으로 사용하는 것입니다.",
    "references": [
      {
        "title": "RFC 9000 - QUIC",
        "url": "https://www.rfc-editor.org/rfc/rfc9000"
      }
    ]
  },
  {
    "id": "NET-012",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP/2는 TCP를, HTTP/3는 UDP를 사용하는데, 브라우저는 서버가 어떤 프로토콜을 사용하는지 어떻게 알 수 있나요?",
    "answer": "Alt-Svc(Alternative Services) 헤더를 통해 알 수 있습니다.\n브라우저는 먼저 TCP(HTTP/1.1 또는 HTTP/2)로 연결\n서버가 Alt-Svc: h3=\":443\" 헤더로 HTTP/3 지원 알림\n브라우저가 다음 요청부터 QUIC(UDP) 사용",
    "references": [
      {
        "title": "RFC 7838 - HTTP Alternative Services",
        "url": "https://www.rfc-editor.org/rfc/rfc7838"
      }
    ]
  },
  {
    "id": "NET-013",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP 응답코드에 대해 설명해 주세요.",
    "answer": "HTTP 응답코드는 3자리 숫자로 요청 처리 결과를 나타냅니다.\n\n범위   의미   예시\n\n1xx   정보   100 Continue\n2xx   성공   200 OK, 201 Created\n3xx   리다이렉션   301 Moved, 304 Not Modified\n4xx   클라이언트 오류   400 Bad Request, 404 Not Found\n5xx   서버 오류   500 Internal Server Error",
    "references": [
      {
        "title": "RFC 9110 Section 15",
        "url": "https://www.rfc-editor.org/rfc/rfc9110#section-15"
      }
    ]
  },
  {
    "id": "NET-014",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP 응답코드 401 (Unauthorized)과 403 (Forbidden)은 의미적으로 어떤 차이가 있나요?",
    "answer": "401 Unauthorized: 인증(Authentication) 필요 또는 실패. 유효한 자격 증명이 없음\n403 Forbidden: 인가(Authorization) 실패. 서버가 요청을 이해했으나 수행 거부\n\n주의: 401은 이름이 \"Unauthorized\"이지만 실제로는 인증(Authentication)에 관한 것입니다.\n\n예: 관리자 페이지 접근 시\n비로그인 사용자 -> 401 + WWW-Authenticate 헤더\n일반 사용자 (로그인했지만 권한 없음) -> 403\n\n함정 질문 대비: 403은 \"존재는 확인됨\"을 암시할 수 있어, 리소스 존재 자체를 숨기려면 404를 반환하기도 합니다.",
    "references": [
      {
        "title": "RFC 9110 Section 15.5.2, 15.5.4",
        "url": "https://www.rfc-editor.org/rfc/rfc9110#section-15.5.2"
      }
    ]
  },
  {
    "id": "NET-015",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP 응답코드 200 (OK)과 201 (Created)의 차이에 대해 설명해 주세요.",
    "answer": "200 OK: 요청이 성공적으로 처리됨 (일반적인 성공)\n201 Created: 요청 결과로 새로운 리소스가 생성됨\n\n주로 POST 요청에서 리소스 생성 시 201을, GET/PUT/DELETE 등에서는 200을 사용합니다. 201 응답에는 Location 헤더로 생성된 리소스 URI를 포함할 수 있습니다.",
    "references": [
      {
        "title": "RFC 9110 Section 15.3.1, 15.3.2",
        "url": "https://www.rfc-editor.org/rfc/rfc9110#section-15.3.1"
      }
    ]
  },
  {
    "id": "NET-016",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP 응답코드를 직접 정의해서 사용할 수 있을까요? 예를 들어 285번처럼요.",
    "answer": "기술적으로 가능하지만 권장하지 않습니다.\n클라이언트가 해당 코드를 이해하지 못할 수 있음\n표준을 따르지 않아 호환성 문제 발생\n미등록 코드는 같은 클래스(2xx면 성공)로 해석됨\n\n대신 표준 코드 + 응답 본문에 상세 정보를 포함하는 방식을 권장합니다.",
    "references": [
      {
        "title": "RFC 9110 Section 15",
        "url": "https://www.rfc-editor.org/rfc/rfc9110#section-15"
      }
    ]
  },
  {
    "id": "NET-017",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP Method 에 대해 설명해 주세요.",
    "answer": "HTTP Method는 리소스에 대해 수행할 동작을 정의합니다.\n\nMethod   설명   멱등성   안전\n\nGET   리소스 조회   O   O\nPOST   리소스 생성   X   X\nPUT   리소스 전체 수정   O   X\nPATCH   리소스 부분 수정   구현에 따라 다름   X\nDELETE   리소스 삭제   O   X\nHEAD   헤더만 조회   O   O\nOPTIONS   지원 메서드 확인   O   O\n\nPATCH 멱등성 참고: RFC 5789에 따르면 PATCH는 멱등하지 않을 수 있으나, 구현 방식에 따라 멱등하게 만들 수 있습니다. 예를 들어 {\"name\": \"John\"}처럼 최종 상태를 지정하면 멱등하고, {\"$inc\": {\"count\": 1}}처럼 연산을 지정하면 비멱등합니다.",
    "references": [
      {
        "title": "RFC 9110 Section 9",
        "url": "https://www.rfc-editor.org/rfc/rfc9110#section-9"
      }
    ]
  },
  {
    "id": "NET-018",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP Method의 멱등성에 대해 설명해 주세요.",
    "answer": "멱등성(Idempotency)은 동일한 요청을 여러 번 보내도 서버 상태가 같은 특성입니다 (응답 코드는 다를 수 있음).\n멱등 메서드: GET, PUT, DELETE, HEAD, OPTIONS\n비멱등 메서드: POST\n조건부: PATCH (구현에 따라 다름)\n\n예: DELETE /users/1을 여러 번 호출하면 첫 번째는 200/204, 이후는 404를 반환할 수 있지만, 서버 상태(해당 유저 삭제됨)는 동일하므로 멱등합니다.\n\n주의: 멱등성은 \"응답이 같다\"가 아니라 \"서버 상태가 같다\"입니다.",
    "references": [
      {
        "title": "RFC 9110 Section 9.2.2",
        "url": "https://www.rfc-editor.org/rfc/rfc9110#section-9.2.2"
      }
    ]
  },
  {
    "id": "NET-019",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP Method 중 GET과 POST의 차이는 무엇인가요?",
    "answer": "구분   GET   POST\n\n목적   리소스 조회   리소스 생성/처리\n데이터 위치   URL 쿼리스트링   Request Body\n캐싱   가능   불가\n멱등성   O   X\n북마크   가능   불가\n데이터 길이   URL 길이 제한   제한 없음",
    "references": [
      {
        "title": "RFC 9110 Section 9.3.1, 9.3.3",
        "url": "https://www.rfc-editor.org/rfc/rfc9110#section-9.3.1"
      }
    ]
  },
  {
    "id": "NET-020",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP Method 중 POST와 PUT, PATCH의 차이는 무엇인가요?",
    "answer": "메서드   용도   멱등성   URI 결정\n\nPOST   리소스 생성, 또는 정의되지 않은 작업   X   서버\nPUT   리소스 전체 교체 (없으면 생성)   O   클라이언트\nPATCH   리소스 부분 수정   구현에 따라 다름   클라이언트\nPUT: 전체 리소스를 보내 완전히 대체. 누락된 필드는 삭제될 수 있음\nPATCH: 변경할 필드만 전송. JSON Patch, JSON Merge Patch 등 형식 사용\n\nPUT과 POST의 핵심 차이: PUT은 같은 요청을 여러 번 보내도 결과가 같음(멱등), POST는 여러 리소스가 생성될 수 있음(비멱등)",
    "references": [
      {
        "title": "RFC 9110 Section 9.3.3, 9.3.4",
        "url": "https://www.rfc-editor.org/rfc/rfc9110#section-9.3.3"
      }
    ]
  },
  {
    "id": "NET-021",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP 1.1 이후로 GET 요청에도 Body에 데이터를 실을 수 있게 되었습니다. 그럼에도 불구하고 왜 아직도 이런 방식을 지양하는 것일까요?",
    "answer": "캐싱 문제: 캐시는 URL 기반으로 동작, Body는 캐시 키에 포함 안 됨\n호환성: 일부 서버/프록시/라이브러리가 GET Body를 무시하거나 오류 발생\n의미론 위반: GET은 \"조회\"의 의미, Body는 \"데이터 전송\"의 의미\n로깅/디버깅 어려움: URL만 로그에 남으면 요청 재현 불가\n\nRFC 9110 참고: \"GET 요청 메시지 내의 콘텐츠는 정의된 의미가 없으며, 요청의 의미나 대상을 변경할 수 없다. 일부 구현은 콘텐츠가 포함된 GET 요청을 거부할 수 있다.\"\n\n대안: 복잡한 조회 조건이 필요하면 POST를 사용하거나, GraphQL처럼 별도 쿼리 언어를 활용합니다.",
    "references": [
      {
        "title": "RFC 9110 Section 9.3.1",
        "url": "https://www.rfc-editor.org/rfc/rfc9110#section-9.3.1"
      }
    ]
  },
  {
    "id": "NET-022",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "쿠키와 세션의 차이에 대해 설명해 주세요.",
    "answer": "구분   쿠키   세션\n\n저장 위치   클라이언트 (브라우저)   서버 (메모리, DB, Redis 등)\n보안   상대적으로 취약 (탈취 가능)   상대적으로 안전 (서버 보관)\n용량   약 4KB 제한 (도메인당)   서버 리소스 의존\n만료   Expires/Max-Age로 설정   서버 설정 타임아웃\n속도   빠름 (로컬)   서버 조회 필요\n확장성   좋음 (Stateless)   서버 확장 시 동기화 필요\n\n쿠키 보안 옵션:\nHttpOnly: JavaScript에서 접근 불가 (XSS 방지)\nSecure: HTTPS에서만 전송\nSameSite: CSRF 방지 (Strict/Lax/None)\n\n실제 사용: 세션도 세션 ID를 쿠키에 저장하여 전달합니다. 쿠키와 세션은 대립 개념이 아닌 함께 사용되는 기술입니다.",
    "references": [
      {
        "title": "RFC 6265 - HTTP State Management",
        "url": "https://www.rfc-editor.org/rfc/rfc6265"
      }
    ]
  },
  {
    "id": "NET-023",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "세션 방식의 로그인 과정에 대해 설명해 주세요.",
    "answer": "클라이언트가 ID/PW로 로그인 요청\n서버가 인증 후 세션 ID 생성, 서버 메모리/DB에 저장\n서버가 Set-Cookie 헤더로 세션 ID를 클라이언트에 전달\n클라이언트는 이후 요청마다 Cookie 헤더에 세션 ID 포함\n서버가 세션 ID로 사용자 정보 조회하여 인증 처리",
    "references": [
      {
        "title": "RFC 6265 - HTTP Cookies",
        "url": "https://www.rfc-editor.org/rfc/rfc6265"
      }
    ]
  },
  {
    "id": "NET-024",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTP는 Stateless 프로토콜인데, 서버에 사용자 상태를 저장하는 세션 기반 인증 방식은 HTTP의 Stateless 원칙에 위배되는 것 아닌가요?",
    "answer": "맞습니다. 엄밀히 말하면 세션은 서버에 상태를 저장하므로 HTTP의 Stateless 원칙에 위배됩니다.\n\n그러나 이는 의도된 트레이드오프입니다:\nHTTP Stateless는 프로토콜 레벨의 특성 (각 요청이 독립적으로 처리 가능)\n세션은 애플리케이션 레벨에서 상태 관리 (인증, 사용자 경험을 위해 필요)\n\n세션의 장단점:\n장점: 민감 정보를 서버에 보관, 세션 무효화 즉시 가능\n단점: 서버 메모리 사용, 확장 시 세션 동기화 필요, 서버 장애 시 세션 유실\n\nJWT의 장단점:\n장점: Stateless 유지, 서버 확장 용이\n단점: 토큰 탈취 시 만료 전까지 무효화 어려움, 토큰 크기가 큼\n\n실무: 요구사항에 따라 선택. 보안이 중요하면 세션 + Redis, 확장성이 중요하면 JWT + Refresh Token 조합을 많이 사용합니다.",
    "references": [
      {
        "title": "RFC 7519 - JWT",
        "url": "https://www.rfc-editor.org/rfc/rfc7519"
      }
    ]
  },
  {
    "id": "NET-025",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "서버가 여러 대로 확장된 분산 환경에서 세션을 어떻게 관리할 수 있을까요?",
    "answer": "Sticky Session (Session Affinity):\n로드밸런서가 같은 사용자를 같은 서버로 라우팅\n단점: 서버 장애 시 세션 유실, 부하 불균형 가능\n세션 클러스터링:\n서버 간 세션 복제 (Tomcat Session Replication)\n단점: 서버 수 증가 시 복제 오버헤드 증가 (N^2)\n세션 스토리지 (가장 권장):\nRedis, Memcached 등 외부 저장소에 세션 저장\n장점: 서버 무관하게 세션 접근, 장애 복구 용이\n단점: 외부 스토리지 의존, 네트워크 지연\n토큰 방식 (JWT):\nStateless하게 전환, 서버에 세션 저장 안 함\n단점: 토큰 무효화 어려움, 토큰 크기\n\n실무 선택 기준: 보안 중시 -> Redis 세션, 확장성 중시 -> JWT + Refresh Token",
    "references": [
      {
        "title": "MDN - HTTP Session",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Session"
      }
    ]
  },
  {
    "id": "NET-026",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "공개키와 대칭키에 대해 설명해 주세요.",
    "answer": "대칭키 암호화 (Symmetric):\n암호화/복호화에 동일한 키 사용\n빠른 속도 (공개키 대비 100~1000배)\n키 교환 문제 존재 (어떻게 안전하게 키를 전달할 것인가?)\n예: AES-256 (권장), ChaCha20, ~~DES~~ (취약, 사용 금지)\n\n공개키(비대칭키) 암호화 (Asymmetric):\n공개키로 암호화 -> 개인키로 복호화 (기밀성)\n개인키로 서명 -> 공개키로 검증 (무결성, 부인방지)\n느린 속도, 안전한 키 교환 가능\n예: RSA (키 교환), ECDSA (서명), ECDH (키 합의)\n\nHTTPS 동작 (TLS 1.3):\n공개키 암호화로 키 합의 (ECDHE)\n합의된 대칭키로 실제 데이터 암호화 (AES-GCM)\n하이브리드 방식으로 성능과 보안 모두 확보",
    "references": [
      {
        "title": "RFC 8446 - TLS 1.3",
        "url": "https://www.rfc-editor.org/rfc/rfc8446"
      }
    ]
  },
  {
    "id": "NET-027",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "HTTPS Handshake 과정에서 공개키만 교환하면 될 것 같은데, 왜 인증서를 사용하는 것일까요?",
    "answer": "중간자 공격(MITM) 방지를 위해서입니다.\n\n공개키만으로는 해당 키가 진짜 서버의 것인지 확인할 수 없습니다. 인증서는:\n신뢰할 수 있는 CA(인증기관)가 서버 신원을 보증\n서버의 공개키가 변조되지 않았음을 증명\n도메인 소유권 확인",
    "references": [
      {
        "title": "RFC 8446 Section 4.4.2",
        "url": "https://www.rfc-editor.org/rfc/rfc8446#section-4.4.2"
      }
    ]
  },
  {
    "id": "NET-028",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "SSL과 TLS의 차이는 무엇인가요?",
    "answer": "TLS는 SSL의 후속 버전입니다.\nSSL 1.0~3.0: Netscape에서 개발, 모든 버전 보안 취약점으로 사용 중단\nSSL 3.0: POODLE 공격 취약 (2014년)\nTLS 1.0~1.1: IETF에서 표준화, 현재는 deprecated (RFC 8996, 2021년)\nTLS 1.2: 현재 널리 사용, 안전함\nTLS 1.3: 최신 표준 (RFC 8446, 2018년), 핸드셰이크 단축, 취약 암호 제거\n\n실무 권장: TLS 1.2 이상만 허용, TLS 1.3 우선 사용\n\n용어 혼동: \"SSL 인증서\"라고 부르지만 실제로는 TLS를 사용합니다. 관용적 표현입니다.",
    "references": [
      {
        "title": "RFC 8446 - TLS 1.3",
        "url": "https://www.rfc-editor.org/rfc/rfc8446"
      }
    ]
  },
  {
    "id": "NET-029",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "XSS에 대해서 설명해 주세요.",
    "answer": "XSS(Cross-Site Scripting)는 공격자가 웹페이지에 악성 스크립트를 삽입하여 다른 사용자의 브라우저에서 실행되게 하는 공격입니다.\n\n유형:\nStored XSS: DB에 저장된 악성 스크립트가 페이지 로드 시 실행 (가장 위험)\nReflected XSS: URL 파라미터의 스크립트가 응답에 즉시 반영되어 실행\nDOM-based XSS: 서버 응답이 아닌 클라이언트 측 JS에서 DOM 조작 시 발생\n\n방지 (다층 방어 필수):\n출력 인코딩: HTML 컨텍스트에 맞게 이스케이프 (< -> &lt;)\n입력값 검증: 허용된 패턴만 허용 (화이트리스트)\nCSP 헤더: Content-Security-Policy로 인라인 스크립트 차단\nHttpOnly 쿠키: JS로 쿠키 접근 방지\n\n함정: 입력값 검증만으로는 부족합니다. 출력 시점에 컨텍스트에 맞는 인코딩이 핵심입니다.",
    "references": [
      {
        "title": "OWASP XSS Prevention",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
      }
    ]
  },
  {
    "id": "NET-030",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "CSRF와 XSS는 어떤 차이가 있나요?",
    "answer": "구분   XSS   CSRF\n\n공격 대상   사용자 브라우저   서버 (사용자 세션 이용)\n공격 방식   악성 스크립트를 피해자 브라우저에서 실행   피해자가 의도치 않은 요청을 보내게 함\n신뢰 악용   사용자가 사이트를 신뢰   서버가 사용자(브라우저)를 신뢰\n목적   쿠키 탈취, 세션 하이재킹, 키로깅   비밀번호 변경, 송금 등 사용자 모르게 행위 수행\n방지   출력 인코딩, CSP, HttpOnly   CSRF 토큰, SameSite 쿠키, Referer 검증\n\n핵심 차이: XSS는 \"악성 코드 삽입\", CSRF는 \"정상 요청을 속여서 보냄\"",
    "references": [
      {
        "title": "OWASP CSRF Prevention",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html"
      }
    ]
  },
  {
    "id": "NET-031",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "XSS(Cross-Site Scripting) 공격은 프론트엔드에서만 방어할 수 있나요?",
    "answer": "아닙니다. 백엔드에서도 반드시 방어해야 합니다.\n백엔드: 입력값 검증/필터링, 출력 시 HTML 인코딩\n프론트엔드: innerHTML 대신 textContent 사용, sanitize 라이브러리\nHTTP 헤더: Content-Security-Policy(CSP), X-XSS-Protection\n\n프론트엔드만으로는 API 직접 호출 등을 막을 수 없어 다층 방어가 필수입니다.",
    "references": [
      {
        "title": "MDN CSP",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP"
      }
    ]
  },
  {
    "id": "NET-032",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "SOP 정책에 대해 설명해 주세요.",
    "answer": "SOP(Same-Origin Policy)는 브라우저 보안 정책으로, 다른 출처의 리소스 접근을 제한합니다.\n\n동일 출처 조건 (모두 일치해야 함):\n프로토콜 (http/https)\n호스트 (domain)\n포트\n\n예: https://example.com:443과 https://example.com:8080은 다른 출처입니다.",
    "references": [
      {
        "title": "MDN Same-Origin Policy",
        "url": "https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy"
      }
    ]
  },
  {
    "id": "NET-033",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "SOP(Same-Origin Policy)의 제한을 우회하는 CORS 정책이 무엇인가요?",
    "answer": "CORS(Cross-Origin Resource Sharing)는 SOP를 우회하여 다른 출처의 리소스를 안전하게 요청할 수 있게 하는 메커니즘입니다.\n\n서버가 응답 헤더로 허용할 출처를 지정합니다:\nAccess-Control-Allow-Origin: 허용할 출처\nAccess-Control-Allow-Methods: 허용할 HTTP 메서드\nAccess-Control-Allow-Headers: 허용할 헤더",
    "references": [
      {
        "title": "MDN CORS",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
      }
    ]
  },
  {
    "id": "NET-034",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "CORS에서 사용하는 Preflight 요청에 대해 설명해 주세요.",
    "answer": "Preflight 요청은 실제 요청 전에 서버가 해당 요청을 허용하는지 확인하는 OPTIONS 요청입니다.\n\n발생 조건 (Simple Request가 아닌 경우):\nGET/POST/HEAD 외의 메서드\n커스텀 헤더 포함\nContent-Type이 application/json 등\n\n과정:\n브라우저가 OPTIONS 요청 전송\n서버가 CORS 헤더로 허용 여부 응답\n허용 시 실제 요청 전송",
    "references": [
      {
        "title": "MDN Preflight Request",
        "url": "https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request"
      }
    ]
  },
  {
    "id": "NET-035",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP와 UDP의 차이에 대해 설명해 주세요.",
    "answer": "구분   TCP   UDP\n\n연결   연결 지향 (3-way handshake)   비연결 (Connectionless)\n신뢰성   순서 보장, 재전송, 중복 제거   보장 안 함\n속도   오버헤드로 상대적으로 느림   빠름 (헤더 8바이트)\n흐름/혼잡 제어   있음   없음\n데이터 단위   스트림 (바이트 흐름)   데이터그램 (메시지 경계 유지)\n용도   HTTP, 파일 전송, 이메일   스트리밍, DNS, VoIP, 게임\n\n언제 무엇을 선택?:\nTCP: 데이터 무결성이 중요, 모든 바이트가 도착해야 함\nUDP: 실시간성 중요, 일부 손실 허용, 또는 직접 신뢰성 구현할 때 (QUIC, WebRTC)",
    "references": [
      {
        "title": "RFC 9293 - TCP",
        "url": "https://www.rfc-editor.org/rfc/rfc9293"
      }
    ]
  },
  {
    "id": "NET-036",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP/UDP에서 사용하는 Checksum이 무엇인가요?",
    "answer": "Checksum은 데이터 전송 중 오류를 감지하기 위한 값입니다.\n송신자: 데이터를 계산하여 체크섬 값 생성 후 함께 전송\n수신자: 받은 데이터로 체크섬 재계산, 일치 여부 확인\n\n일치하지 않으면 데이터가 손상된 것으로 판단합니다. 오류 \"감지\"만 가능하고 \"정정\"은 불가합니다.",
    "references": [
      {
        "title": "RFC 9293 Section 3.1",
        "url": "https://www.rfc-editor.org/rfc/rfc9293#section-3.1"
      }
    ]
  },
  {
    "id": "NET-037",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP와 UDP 중 어느 프로토콜이 Checksum(데이터 무결성 검증)을 수행할까요?",
    "answer": "둘 다 Checksum을 수행합니다.\nTCP: 필수 (헤더 + 데이터 + 의사 헤더)\nUDP: IPv4에서는 선택, IPv6에서는 필수\n\nUDP는 IPv4에서 체크섬을 0으로 설정하여 생략할 수 있지만, IPv6에서는 IP 헤더에 체크섬이 없어 UDP 체크섬이 필수입니다.",
    "references": [
      {
        "title": "RFC 768 - UDP",
        "url": "https://www.rfc-editor.org/rfc/rfc768"
      }
    ]
  },
  {
    "id": "NET-038",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP/UDP에서 사용하는 Checksum을 통해 데이터 오류를 정정할 수 있나요?",
    "answer": "아니요, Checksum은 오류 감지(Detection)만 가능하고 정정(Correction)은 불가합니다.\n\n오류 발견 시:\nTCP: 해당 세그먼트 폐기 후 재전송 요청\nUDP: 해당 데이터그램 폐기 (재전송 없음)\n\n오류 정정이 필요하면 FEC(Forward Error Correction) 같은 별도 메커니즘이 필요합니다.",
    "references": [
      {
        "title": "RFC 9293",
        "url": "https://www.rfc-editor.org/rfc/rfc9293"
      }
    ]
  },
  {
    "id": "NET-039",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP가 신뢰성을 보장하는 방법에 대해 설명해 주세요.",
    "answer": "순서 번호(Sequence Number): 데이터 순서 보장\n확인 응답(ACK): 수신 확인, 미수신 시 재전송\n체크섬: 데이터 무결성 검증\n타임아웃 재전송: ACK 미수신 시 재전송\n흐름 제어(Flow Control): 수신자 버퍼 오버플로우 방지\n혼잡 제어(Congestion Control): 네트워크 혼잡 시 전송량 조절",
    "references": [
      {
        "title": "RFC 9293",
        "url": "https://www.rfc-editor.org/rfc/rfc9293"
      }
    ]
  },
  {
    "id": "NET-040",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP의 혼잡 제어 처리 방법에 대해 설명해 주세요.",
    "answer": "Slow Start: 지수적으로 윈도우 크기 증가 (1 -> 2 -> 4 -> 8...) ssthresh까지\nCongestion Avoidance: ssthresh 도달 후 선형 증가 (AIMD: Additive Increase)\nFast Retransmit: 3개의 중복 ACK 수신 시 타임아웃 기다리지 않고 즉시 재전송\nFast Recovery: 손실 후 ssthresh를 cwnd/2로 설정, Slow Start 대신 Congestion Avoidance로 복구\n\n손실 감지 방식에 따른 차이:\n타임아웃: cwnd = 1 MSS, ssthresh = cwnd/2 (심각한 혼잡으로 판단)\n3 중복 ACK: ssthresh = cwnd/2, cwnd = ssthresh (네트워크는 동작 중으로 판단)\n\n현대 알고리즘: CUBIC (Linux 기본), BBR (Google) 등이 기존 Reno/NewReno를 대체",
    "references": [
      {
        "title": "RFC 5681 - TCP Congestion Control",
        "url": "https://www.rfc-editor.org/rfc/rfc5681"
      }
    ]
  },
  {
    "id": "NET-041",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "새로운 통신 프로토콜을 TCP나 UDP 위에 구현한다고 할 때, 어떤 기준으로 프로토콜을 선택하시겠어요?",
    "answer": "TCP 선택 시:\n데이터 손실이 치명적인 경우 (파일 전송, 금융 거래)\n순서가 중요한 경우\n신뢰성이 최우선인 경우\n\nUDP 선택 시:\n실시간성이 중요한 경우 (게임, 스트리밍, VoIP)\n일부 손실이 허용되는 경우\n직접 신뢰성 메커니즘을 구현할 경우 (QUIC처럼)",
    "references": [
      {
        "title": "RFC 9293",
        "url": "https://www.rfc-editor.org/rfc/rfc9293"
      }
    ]
  },
  {
    "id": "NET-042",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "3-Way Handshake에 대해 설명해 주세요.",
    "answer": "TCP 연결 수립을 위한 3단계 과정입니다.\nSYN: 클라이언트 -> 서버 (연결 요청, seq=x)\nSYN-ACK: 서버 -> 클라이언트 (요청 수락, seq=y, ack=x+1)\nACK: 클라이언트 -> 서버 (연결 확립, ack=y+1)\n\n이 과정으로 양방향 통신 준비와 초기 순서 번호 교환이 완료됩니다.",
    "references": [
      {
        "title": "RFC 9293 Section 3.5",
        "url": "https://www.rfc-editor.org/rfc/rfc9293#section-3.5"
      }
    ]
  },
  {
    "id": "NET-043",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP 3-Way Handshake에서 ACK, SYN 같은 정보는 어떻게 전달하는 것일까요?",
    "answer": "TCP 헤더의 플래그 비트를 통해 전달합니다.\n\nTCP 헤더에는 제어 플래그들이 있습니다 (RFC 9293 기준 9개):\nCWR: Congestion Window Reduced (혼잡 윈도우 축소)\nECE: ECN-Echo (명시적 혼잡 알림)\nURG: 긴급 데이터\nACK: 확인 응답\nPSH: 데이터 즉시 전달\nRST: 연결 리셋\nSYN: 연결 요청\nFIN: 연결 종료\n(NS: Nonce Sum - 실험적)\n\n기존 RFC 793에서는 6개(URG, ACK, PSH, RST, SYN, FIN)였으나, ECN(RFC 3168) 추가로 현재는 더 많습니다. 각 플래그는 1비트로, 설정(1) 또는 해제(0) 상태입니다.",
    "references": [
      {
        "title": "RFC 9293 Section 3.1",
        "url": "https://www.rfc-editor.org/rfc/rfc9293#section-3.1"
      }
    ]
  },
  {
    "id": "NET-044",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP에서 2-Way Handshaking이 아닌 3-Way Handshaking을 사용하는 이유에 대해 설명해 주세요.",
    "answer": "양방향 통신 준비 확인이 불가능하기 때문입니다.\n\n2-Way의 문제:\n클라이언트는 서버의 수신 능력만 확인\n서버는 클라이언트의 수신 능력 확인 불가\n이전 연결의 지연된 SYN 패킷이 새 연결로 오인될 수 있음\n\n3-Way로 양쪽 모두 송수신 가능함을 확인하고, 초기 순서 번호를 안전하게 교환합니다.",
    "references": [
      {
        "title": "RFC 9293 Section 3.5",
        "url": "https://www.rfc-editor.org/rfc/rfc9293#section-3.5"
      }
    ]
  },
  {
    "id": "NET-045",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP에서 두 호스트가 동시에 연결을 시도하면, 연결이 가능한가요? 가능하다면 어떻게 통신 연결을 수행하나요?",
    "answer": "가능합니다. 이를 Simultaneous Open이라 합니다.\n\n과정:\nA -> B: SYN\nB -> A: SYN (동시에)\nA: B의 SYN 수신, SYN-ACK 전송\nB: A의 SYN 수신, SYN-ACK 전송\n양쪽 모두 SYN-ACK 수신하여 연결 수립\n\n결과적으로 4개의 세그먼트로 연결이 수립됩니다.",
    "references": [
      {
        "title": "RFC 9293 Section 3.5",
        "url": "https://www.rfc-editor.org/rfc/rfc9293#section-3.5"
      }
    ]
  },
  {
    "id": "NET-046",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP 3-Way Handshake를 악용한 SYN Flooding 공격에 대해 설명해 주세요.",
    "answer": "SYN Flooding은 TCP 3-way handshake를 악용한 DoS 공격입니다.\n\n공격 방식:\n공격자가 위조된 IP로 대량의 SYN 패킷 전송\n서버가 SYN-ACK 전송 후 ACK 대기 (half-open 상태)\n대기 큐(backlog)가 가득 차 정상 연결 불가\n\n방어 방법:\nSYN Cookie: 상태를 저장하지 않고 SYN-ACK의 시퀀스 번호에 정보 인코딩. ACK 수신 시 쿠키 검증으로 연결 수립 (Linux: net.ipv4.tcpsyncookies=1)\nSYN Proxy: 방화벽이 먼저 3-way handshake 완료 후 실제 서버에 연결\nRate Limiting: 동일 IP의 SYN 패킷 수 제한\nBacklog 큐 증가: net.ipv4.tcpmaxsynbacklog 조정\n\nSYN Cookie 트레이드오프: 일부 TCP 옵션(window scaling 등)이 제한될 수 있음",
    "references": [
      {
        "title": "RFC 4987 - TCP SYN Flooding Attacks",
        "url": "https://www.rfc-editor.org/rfc/rfc4987"
      }
    ]
  },
  {
    "id": "NET-047",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP 3-Way Handshake는 연결 수립에 시간이 걸리는데, 왕복 시간을 줄이는 0-RTT(Zero Round-Trip Time) 기법은 어떤 방식으로 동작하나요?",
    "answer": "TLS 1.3과 QUIC에서 0-RTT를 지원합니다.\n\n원리:\n최초 연결 시 서버가 Session Ticket/PSK(Pre-Shared Key) 발급\n재연결 시 저장된 키로 첫 패킷부터 암호화된 데이터 전송 (Early Data)\nHandshake와 데이터 전송이 동시에 진행\n\n보안 트레이드오프:\nReplay Attack 취약: 공격자가 0-RTT 데이터를 캡처하여 재전송 가능\nForward Secrecy 없음: PSK가 유출되면 0-RTT 데이터 복호화 가능\n\n안전한 사용:\n멱등한 요청(GET)에만 0-RTT 사용\n서버에서 중복 요청 탐지 로직 구현\n민감한 작업(로그인, 결제)은 0-RTT 사용 금지",
    "references": [
      {
        "title": "RFC 8446 Section 2.3",
        "url": "https://www.rfc-editor.org/rfc/rfc8446#section-2.3"
      }
    ]
  },
  {
    "id": "NET-048",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP 4-Way Handshake(연결 종료 과정)에 대해 설명해 주세요.",
    "answer": "TCP 연결 종료를 위한 4단계 과정입니다 (정상 종료 시).\nFIN: Active Close측 -> Passive Close측 (종료 요청, 더 이상 보낼 데이터 없음)\nACK: Passive Close측 -> Active Close측 (FIN 수신 확인)\nFIN: Passive Close측 -> Active Close측 (자신도 종료 준비 완료)\nACK: Active Close측 -> Passive Close측 (종료 확인, TIME_WAIT 진입)\n\n왜 4단계인가?: TCP는 전이중(Full-Duplex) 통신이므로 각 방향을 독립적으로 종료합니다.\n클라이언트가 FIN을 보내도 서버는 아직 데이터를 보낼 수 있음 (Half-Close)\n서버가 모든 데이터를 보낸 후 자신의 FIN을 전송\n\n3-Way로 줄어드는 경우: 서버가 ACK와 FIN을 동시에 보내면 3단계로 단축 가능 (Delayed ACK)",
    "references": [
      {
        "title": "RFC 9293 Section 3.6",
        "url": "https://www.rfc-editor.org/rfc/rfc9293#section-3.6"
      }
    ]
  },
  {
    "id": "NET-049",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP에서 수신한 패킷이 연결 종료(4-Way Handshake) 목적인지 어떻게 파악할 수 있을까요?",
    "answer": "TCP 헤더의 FIN 플래그로 파악합니다.\nFIN 플래그가 설정된 세그먼트 = 연결 종료 요청\n현재 연결 상태(ESTABLISHED, FIN_WAIT 등)와 함께 판단\n\nTCP는 상태 기계(State Machine)로 동작하며, 현재 상태와 받은 플래그 조합으로 다음 동작을 결정합니다.",
    "references": [
      {
        "title": "RFC 9293 Section 3.6",
        "url": "https://www.rfc-editor.org/rfc/rfc9293#section-3.6"
      }
    ]
  },
  {
    "id": "NET-050",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP 연결을 정상적인 4-Way Handshake 없이 즉시 종료해야 할 경우 어떻게 할 수 있을까요?",
    "answer": "RST(Reset) 플래그를 사용하여 즉시 종료합니다.\n\nRST 세그먼트를 보내면:\n상대방에게 즉시 연결 종료 통보\nTIME_WAIT 상태 없이 바로 종료\n송수신 버퍼 데이터 폐기\n\n사용 예: 존재하지 않는 포트로 연결 시도, 비정상 상황, 강제 종료",
    "references": [
      {
        "title": "RFC 9293 Section 3.5.2",
        "url": "https://www.rfc-editor.org/rfc/rfc9293#section-3.5.2"
      }
    ]
  },
  {
    "id": "NET-051",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP 연결 중에 한쪽 호스트가 강제로 종료된다면, 상대방은 이를 어떻게 인식할 수 있을까요?",
    "answer": "TCP Keep-Alive: 주기적으로 프로브 패킷 전송, 응답 없으면 연결 종료\n타임아웃: 재전송 타임아웃 초과 시 연결 종료로 판단\n애플리케이션 레벨: 자체 heartbeat 메커니즘 구현\n\nOS의 Keep-Alive는 기본 2시간으로 설정되어 있어, 빠른 감지가 필요하면 애플리케이션에서 별도 구현합니다.",
    "references": [
      {
        "title": "RFC 9293 Section 3.8.4",
        "url": "https://www.rfc-editor.org/rfc/rfc9293#section-3.8.4"
      }
    ]
  },
  {
    "id": "NET-052",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "TCP 연결 종료(4-Way Handshake) 이후 왜 연결이 바로 끝나지 않고, TIME_WAIT 상태로 대기하는 것일까요?",
    "answer": "지연된 패킷 처리: 네트워크에 남아있는 이전 연결의 패킷이 새 연결에 영향 주지 않도록\n마지막 ACK 손실 대비: 상대방이 FIN을 재전송하면 ACK를 다시 보낼 수 있도록\n\nTIMEWAIT 시간은 2MSL(Maximum Segment Lifetime)입니다.\nLinux 기본: 60초 (MSL=30초)\n이 시간 동안 같은 5-tuple(src IP, src Port, dst IP, dst Port, Protocol)로 새 연결 불가\n\nTIMEWAIT가 많으면?:\n서버 측: 클라이언트 포트가 다르므로 큰 문제 없음\n클라이언트 측: ephemeral port 고갈 가능\n해결: SOREUSEADDR, tcptwreuse, 커넥션 풀 사용\n\n주의: tcptw_recycle은 NAT 환경에서 문제를 일으켜 Linux 4.12에서 제거됨",
    "references": [
      {
        "title": "RFC 9293 Section 3.6.1",
        "url": "https://www.rfc-editor.org/rfc/rfc9293#section-3.6.1"
      }
    ]
  },
  {
    "id": "NET-053",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "웹소켓과 소켓 통신의 차이에 대해 설명해 주세요.",
    "answer": "구분   소켓(TCP/UDP)   웹소켓\n\n계층   Transport Layer (L4)   Application Layer (L7)\n프로토콜   TCP/UDP 직접 사용   HTTP Upgrade 후 WS 프로토콜 (TCP 위)\n환경   모든 애플리케이션   주로 웹 브라우저 (서버 간도 가능)\n연결 수립   3-way handshake (TCP)   HTTP Handshake + Upgrade\n데이터 형식   바이트 스트림   메시지 기반 프레임 (텍스트/바이너리)\n방화벽   별도 포트 오픈 필요   80/443 사용으로 방화벽 친화적\n\n웹소켓의 장점:\n브라우저에서 양방향 실시간 통신 가능\nHTTP와 같은 포트 사용으로 프록시/방화벽 통과 용이\n연결 유지 후 오버헤드 적음 (헤더가 작음)\n\n웹소켓 vs 일반 소켓: 웹소켓은 일반 TCP 소켓을 웹 환경에서 사용하기 위해 HTTP로 감싼 것",
    "references": [
      {
        "title": "RFC 6455 - WebSocket Protocol",
        "url": "https://www.rfc-editor.org/rfc/rfc6455"
      }
    ]
  },
  {
    "id": "NET-054",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "소켓과 포트의 차이가 무엇인가요?",
    "answer": "포트(Port): 16비트 숫자(0-65535)로 프로세스를 식별하는 논리적 주소\n소켓(Socket): (IP주소 + 포트 + 프로토콜)의 조합으로 네트워크 통신 끝점(Endpoint)\n\n포트는 \"문 번호\"이고, 소켓은 \"실제 통신 채널\"입니다. 하나의 포트에 여러 소켓이 존재할 수 있습니다.",
    "references": [
      {
        "title": "RFC 9293",
        "url": "https://www.rfc-editor.org/rfc/rfc9293"
      }
    ]
  },
  {
    "id": "NET-055",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "여러 소켓이 있다고 할 때, 그 소켓의 포트 번호는 모두 다른가요?",
    "answer": "아니요, 같은 포트를 공유할 수 있습니다.\n\n소켓은 5-tuple로 구분됩니다:\n(출발 IP, 출발 Port, 목적 IP, 목적 Port, 프로토콜)\n\n예: 웹서버 80번 포트에 여러 클라이언트 연결 시, 각 연결은 클라이언트의 IP/Port가 다르므로 서로 다른 소켓입니다.",
    "references": [
      {
        "title": "RFC 9293 Section 3.1",
        "url": "https://www.rfc-editor.org/rfc/rfc9293#section-3.1"
      }
    ]
  },
  {
    "id": "NET-056",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "사용자의 요청이 무수히 많아지면, 소켓도 무수히 생성되나요?",
    "answer": "기본적으로 그렇습니다. 하지만 제한이 있습니다:\n\n제한 요소:\n파일 디스크립터 제한 (ulimit)\n포트 번호 범위 (ephemeral port)\n메모리\n\n해결 방법:\nConnection Pooling\nKeep-Alive로 연결 재사용\n비동기 I/O (epoll, kqueue)\n로드밸런싱",
    "references": [
      {
        "title": "RFC 9293",
        "url": "https://www.rfc-editor.org/rfc/rfc9293"
      }
    ]
  },
  {
    "id": "NET-057",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "멀티플렉싱과 디멀티플렉싱에 대해 설명해 주세요.",
    "answer": "멀티플렉싱 (Multiplexing):\n여러 소켓의 데이터를 모아 하나의 네트워크 링크로 전송\n송신 측에서 발생\n\n디멀티플렉싱 (Demultiplexing):\n수신된 세그먼트를 올바른 소켓으로 분배\n수신 측에서 발생\nTCP는 4-tuple, UDP는 2-tuple(목적 IP/Port)로 구분",
    "references": [
      {
        "title": "RFC 9293",
        "url": "https://www.rfc-editor.org/rfc/rfc9293"
      }
    ]
  },
  {
    "id": "NET-058",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "전송 계층(Transport Layer)에서 수신된 데이터를 올바른 소켓으로 분배하는 디멀티플렉싱(Demultiplexing) 과정에 대해 설명해 주세요.",
    "answer": "세그먼트가 Transport Layer에 도착\n헤더에서 목적 포트 번호 확인\nUDP: (목적 IP, 목적 Port)로 소켓 식별\nTCP: (출발 IP, 출발 Port, 목적 IP, 목적 Port)로 소켓 식별\n해당 소켓의 버퍼로 데이터 전달\n애플리케이션이 버퍼에서 데이터 읽음",
    "references": [
      {
        "title": "RFC 9293",
        "url": "https://www.rfc-editor.org/rfc/rfc9293"
      }
    ]
  },
  {
    "id": "NET-059",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "IP 주소는 무엇이며, 어떤 기능을 하고 있나요?",
    "answer": "IP 주소는 네트워크에서 장치를 식별하는 논리적 주소입니다.\n\n기능:\n주소 지정(Addressing): 네트워크상 장치 고유 식별\n라우팅: 패킷이 목적지까지 경로 설정\n네트워크/호스트 구분: 서브넷 마스크로 네트워크와 호스트 부분 구분\n\nIPv4는 32비트(4바이트), IPv6는 128비트(16바이트)입니다.",
    "references": [
      {
        "title": "RFC 791 - IPv4",
        "url": "https://www.rfc-editor.org/rfc/rfc791"
      }
    ]
  },
  {
    "id": "NET-060",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "IPv6는 IPv4의 주소 고갈 문제를 해결하기 위해 만들어졌지만, 아직도 수많은 기기가 IPv4를 사용하고 있습니다. IPv4 주소 고갈 문제를 어떻게 해결하고 있을까요?",
    "answer": "NAT(Network Address Translation): 사설 IP를 공인 IP로 변환, 하나의 공인 IP로 여러 기기 사용\nCIDR(Classless Inter-Domain Routing): 클래스 기반 할당 대신 유연한 서브넷 할당\n사설 IP 주소: 10.x.x.x, 172.16-31.x.x, 192.168.x.x 대역 내부 사용\nDHCP: 동적 IP 할당으로 효율적 사용",
    "references": [
      {
        "title": "RFC 1918 - Private IP",
        "url": "https://www.rfc-editor.org/rfc/rfc1918"
      }
    ]
  },
  {
    "id": "NET-061",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "IPv4와 IPv6의 차이에 대해 설명해 주세요.",
    "answer": "구분   IPv4   IPv6\n\n주소 길이   32비트   128비트\n주소 개수   약 43억 개   약 3.4 x 10^38 개\n표기법   점으로 구분 (192.168.0.1)   콜론으로 구분 (2001:db8::1)\n헤더 크기   가변 (20-60바이트)   고정 (40바이트)\n체크섬   있음   없음 (상위 계층에서 처리)\nIPSec   선택   권장 (초기에는 필수였으나 RFC 6434에서 권장으로 변경)\n브로드캐스트   지원   미지원 (멀티캐스트로 대체)",
    "references": [
      {
        "title": "RFC 8200 - IPv6",
        "url": "https://www.rfc-editor.org/rfc/rfc8200"
      }
    ]
  },
  {
    "id": "NET-062",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "ISP로부터 유동 공인 IP를 할당받더라도 공유기 내부에서는 특정 기기에 고정 IP를 할당할 수 있습니다. NAT와 사설 IP를 활용해 어떻게 가능한 것인가요?",
    "answer": "내부 네트워크(사설 IP)와 외부 네트워크(공인 IP)를 구분하기 때문입니다.\n공유기 내부: DHCP로 사설 IP 할당 (192.168.x.x)\nMAC 주소 기반으로 특정 기기에 항상 같은 사설 IP 할당 가능 (DHCP Reservation)\n외부로 나갈 때: NAT로 공인 IP로 변환\n\n즉, \"내부 고정 IP\"와 \"외부 유동 IP\"는 별개입니다.",
    "references": [
      {
        "title": "RFC 2131 - DHCP",
        "url": "https://www.rfc-editor.org/rfc/rfc2131"
      }
    ]
  },
  {
    "id": "NET-063",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "IPv4를 사용하는 장비와 IPv6를 사용하는 장비가 같은 네트워크 내에서 통신이 가능한가요? 가능하다면 어떤 방법을 사용하나요?",
    "answer": "직접 통신은 불가능하지만 전환 기술로 가능합니다:\nDual Stack: 장비가 IPv4/IPv6 모두 지원\n터널링(Tunneling): IPv6 패킷을 IPv4로 캡슐화 (6to4, Teredo)\nNAT64/DNS64: IPv6 전용 네트워크에서 IPv4 서버 접근\n번역(Translation): 프로토콜 변환\n\n가장 일반적인 방법은 Dual Stack입니다.",
    "references": [
      {
        "title": "RFC 4213 - IPv6 Transition",
        "url": "https://www.rfc-editor.org/rfc/rfc4213"
      }
    ]
  },
  {
    "id": "NET-064",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "IP 프로토콜이 송신자에서 수신자로 데이터가 정확하게 전송되는 것을 보장해 주나요?",
    "answer": "아니요, IP는 Best Effort 서비스입니다.\n\nIP가 보장하지 않는 것:\n패킷 전달 보장 (손실 가능)\n순서 보장 (순서 바뀜 가능)\n중복 방지 (중복 수신 가능)\n무결성 (손상 가능)\n\n신뢰성이 필요하면 상위 계층(TCP)에서 처리합니다.",
    "references": [
      {
        "title": "RFC 791",
        "url": "https://www.rfc-editor.org/rfc/rfc791"
      }
    ]
  },
  {
    "id": "NET-065",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "IP 계층의 Checksum과 TCP 계층의 Checksum은 어떤 차이가 있나요?",
    "answer": "구분   IPv4 Checksum   TCP Checksum\n\n범위   IP 헤더만   헤더 + 데이터 + 의사 헤더\n목적   라우팅 정보 무결성   전체 세그먼트 무결성\n재계산   매 홉마다 (TTL 변경)   종단 간 1회\nIPv6   제거됨   필수\n\nIPv6에서 IP 체크섬이 제거된 이유: 상위 계층에서 이미 검증하므로 중복 제거.",
    "references": [
      {
        "title": "RFC 791",
        "url": "https://www.rfc-editor.org/rfc/rfc791"
      }
    ]
  },
  {
    "id": "NET-066",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "IP 헤더의 TTL(Time To Live) 필드는 무엇이며, 어떤 역할을 하나요?",
    "answer": "TTL(Time To Live)은 패킷이 네트워크에서 존재할 수 있는 최대 홉 수입니다.\n각 라우터 통과 시 TTL 1 감소\nTTL이 0이 되면 패킷 폐기, ICMP 오류 메시지 전송\n라우팅 루프로 인한 무한 순환 방지\n\nIPv6에서는 Hop Limit으로 명칭 변경. 일반적으로 64, 128, 255로 설정합니다.",
    "references": [
      {
        "title": "RFC 791 Section 3.2",
        "url": "https://www.rfc-editor.org/rfc/rfc791#section-3.2"
      }
    ]
  },
  {
    "id": "NET-067",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "IP 주소와 MAC 주소의 차이에 대해 설명해 주세요.",
    "answer": "구분   IP 주소   MAC 주소\n\n계층   Network Layer (L3)   Data Link Layer (L2)\n유형   논리적 주소   물리적 주소\n할당   네트워크 관리자/DHCP   제조사 (NIC에 고정)\n변경   가능 (위치에 따라)   불변 (하드웨어 고유)\n길이   32비트(IPv4) / 128비트(IPv6)   48비트\n\nIP는 \"최종 목적지\", MAC은 \"다음 홉\"을 식별합니다.",
    "references": [
      {
        "title": "RFC 826 - ARP",
        "url": "https://www.rfc-editor.org/rfc/rfc826"
      }
    ]
  },
  {
    "id": "NET-068",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "DHCP가 무엇인지 설명해 주세요.",
    "answer": "DHCP(Dynamic Host Configuration Protocol)는 네트워크 장치에 IP 주소 및 네트워크 설정을 자동으로 할당하는 프로토콜입니다.\n\n제공 정보:\nIP 주소\n서브넷 마스크\n기본 게이트웨이\nDNS 서버 주소\n\n관리자가 수동으로 IP를 설정할 필요 없이 자동화됩니다.",
    "references": [
      {
        "title": "RFC 2131 - DHCP",
        "url": "https://www.rfc-editor.org/rfc/rfc2131"
      }
    ]
  },
  {
    "id": "NET-069",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "DHCP는 몇 계층 프로토콜인가요?",
    "answer": "Application Layer (7계층) 프로토콜입니다.\nTransport Layer: UDP 사용 (포트 67-서버, 68-클라이언트)\n클라이언트가 IP를 받기 전에 통신해야 하므로 브로드캐스트 사용\n연결 설정 없이 빠르게 동작해야 하므로 UDP 선택",
    "references": [
      {
        "title": "RFC 2131",
        "url": "https://www.rfc-editor.org/rfc/rfc2131"
      }
    ]
  },
  {
    "id": "NET-070",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "DHCP는 어떻게 동작하나요?",
    "answer": "DORA 과정으로 동작합니다:\nDiscover: 클라이언트가 브로드캐스트로 DHCP 서버 탐색\nOffer: 서버가 사용 가능한 IP 주소 제안\nRequest: 클라이언트가 제안된 IP 사용 요청\nAcknowledge: 서버가 IP 할당 확인 및 임대 정보 전달\n\n모든 과정이 UDP 브로드캐스트로 진행됩니다.",
    "references": [
      {
        "title": "RFC 2131 Section 3",
        "url": "https://www.rfc-editor.org/rfc/rfc2131#section-3"
      }
    ]
  },
  {
    "id": "NET-071",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "DHCP에서 UDP를 사용하는 이유가 무엇인가요?",
    "answer": "브로드캐스트 필요: TCP는 연결 지향이라 브로드캐스트 불가\nIP 없는 상태: TCP 연결에는 IP가 필요하지만, DHCP는 IP 할당 전에 동작\n단순성: 4개의 메시지만 교환하므로 TCP 오버헤드 불필요\n속도: 빠른 IP 할당을 위해 연결 설정 과정 생략",
    "references": [
      {
        "title": "RFC 2131",
        "url": "https://www.rfc-editor.org/rfc/rfc2131"
      }
    ]
  },
  {
    "id": "NET-072",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "DHCP에서 IP 주소 말고 추가로 제공해주는 정보가 있나요?",
    "answer": "예, DHCP는 다양한 네트워크 설정을 제공합니다:\n서브넷 마스크: 네트워크 범위 정의\n기본 게이트웨이: 외부 네트워크 접근용 라우터\nDNS 서버 주소: 도메인 이름 해석\n임대 시간(Lease Time): IP 사용 가능 기간\n도메인 이름: 네트워크 도메인\nNTP 서버: 시간 동기화 서버",
    "references": [
      {
        "title": "RFC 2132 - DHCP Options",
        "url": "https://www.rfc-editor.org/rfc/rfc2132"
      }
    ]
  },
  {
    "id": "NET-073",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "DHCP에서 할당받은 IP 주소의 유효기간(Lease Time)은 얼마나 긴가요?",
    "answer": "서버 설정에 따라 다릅니다. 일반적으로:\n가정용: 24시간 ~ 7일\n기업 환경: 8시간 ~ 24시간\n공공 Wi-Fi: 1~2시간\n\n클라이언트는 임대 시간의 50%(T1)에 갱신 시도, 87.5%(T2)에 재바인딩을 시도합니다. 만료 시 IP를 반납하고 새로 할당받습니다.",
    "references": [
      {
        "title": "RFC 2131 Section 4.4",
        "url": "https://www.rfc-editor.org/rfc/rfc2131#section-4.4"
      }
    ]
  },
  {
    "id": "NET-074",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "DNS에 대해 설명해 주세요.",
    "answer": "DNS(Domain Name System)는 도메인 이름을 IP 주소로 변환하는 분산 데이터베이스 시스템입니다.\n\n구성 요소:\nRoot DNS: 최상위, TLD 서버 정보 보유\nTLD DNS: .com, .kr 등 관리\nAuthoritative DNS: 실제 도메인 레코드 보유\nRecursive Resolver: 클라이언트 대신 질의 수행\n\n사람이 기억하기 쉬운 이름으로 네트워크 접근을 가능하게 합니다.",
    "references": [
      {
        "title": "RFC 1035 - DNS",
        "url": "https://www.rfc-editor.org/rfc/rfc1035"
      }
    ]
  },
  {
    "id": "NET-075",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "DNS는 몇 계층 프로토콜인가요?",
    "answer": "Application Layer (7계층) 프로토콜입니다.\n기본적으로 UDP 포트 53 사용\n응답이 512바이트 초과 시 TCP 사용\nZone Transfer(영역 전송) 시 TCP 사용\n\nDNS over HTTPS(DoH), DNS over TLS(DoT) 등 보안 DNS도 애플리케이션 계층에서 동작합니다.",
    "references": [
      {
        "title": "RFC 1035",
        "url": "https://www.rfc-editor.org/rfc/rfc1035"
      }
    ]
  },
  {
    "id": "NET-076",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "DNS는 UDP와 TCP 중 어떤 전송 프로토콜을 사용하나요?",
    "answer": "둘 다 사용합니다.\n\nUDP 사용 (기본):\n일반적인 DNS 질의/응답\n빠른 응답 필요\n메시지 크기가 512바이트 이하\n\nTCP 사용:\n응답이 512바이트 초과 (EDNS로 확장 가능)\nZone Transfer (AXFR/IXFR)\nDNS over TLS (DoT)",
    "references": [
      {
        "title": "RFC 1035 Section 4.2",
        "url": "https://www.rfc-editor.org/rfc/rfc1035#section-4.2"
      }
    ]
  },
  {
    "id": "NET-077",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "DNS Recursive Query와 Iterative Query가 무엇인가요?",
    "answer": "Recursive Query:\n클라이언트가 DNS 서버에 완전한 답변 요청\n서버가 다른 서버에 질의하여 최종 결과 반환\n클라이언트 -> Resolver 간 사용\n\nIterative Query:\n서버가 알고 있는 정보만 반환 (다음 질의할 서버 힌트)\n질의자가 직접 다음 서버에 질의\nResolver -> 다른 DNS 서버 간 사용",
    "references": [
      {
        "title": "RFC 1035 Section 4.3",
        "url": "https://www.rfc-editor.org/rfc/rfc1035#section-4.3"
      }
    ]
  },
  {
    "id": "NET-078",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "DNS는 UDP를 사용하는데, DNS 쿼리 과정에서 패킷 손실이 발생한다면 어떻게 처리하나요?",
    "answer": "DNS 클라이언트(Resolver)가 재전송을 처리합니다:\n타임아웃: 일정 시간 내 응답 없으면 재전송\n재시도: 보통 2-5회 재시도\n대체 서버: 실패 시 다른 DNS 서버로 질의\nTCP 폴백: UDP 실패 시 TCP로 재시도\n\nUDP 자체는 신뢰성을 보장하지 않으므로 애플리케이션 레벨에서 처리합니다.",
    "references": [
      {
        "title": "RFC 1035 Section 4.2.1",
        "url": "https://www.rfc-editor.org/rfc/rfc1035#section-4.2.1"
      }
    ]
  },
  {
    "id": "NET-079",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "DNS 캐시에 잘못된 IP 정보가 저장되어 있을 경우 어떻게 보정할 수 있나요?",
    "answer": "이미 캐시된 잘못된 정보 처리:\nTTL 만료 대기: 캐시된 레코드는 TTL 후 자동 삭제, 새로 질의\n캐시 플러시: 수동으로 DNS 캐시 삭제\nWindows: ipconfig /flushdns\nLinux: systemd-resolve --flush-caches 또는 sudo systemctl restart systemd-resolved\nmacOS: sudo dscacheutil -flushcache\n\n잘못된 정보 유입 방지 (DNS Cache Poisoning 대응):\nDNSSEC: DNS 응답에 디지털 서명 추가하여 위변조 감지\n소스 포트 랜덤화: 예측 가능한 포트 사용 방지\n트랜잭션 ID 랜덤화: 응답 위조 어렵게 함\nDNS over HTTPS/TLS: 암호화로 중간자 공격 방지\n\n주의: DNSSEC은 무결성과 출처는 검증하지만, 기밀성(암호화)은 제공하지 않습니다.",
    "references": [
      {
        "title": "RFC 4033 - DNSSEC",
        "url": "https://www.rfc-editor.org/rfc/rfc4033"
      }
    ]
  },
  {
    "id": "NET-080",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "DNS 레코드 타입 중 A, CNAME, AAAA의 차이에 대해서 설명해 주세요.",
    "answer": "레코드   설명   예시\n\nA   도메인 -> IPv4 주소   example.com -> 192.168.1.1\nAAAA   도메인 -> IPv6 주소   example.com -> 2001:db8::1\nCNAME   도메인 -> 다른 도메인 (별칭)   www.example.com -> example.com\n\nCNAME은 실제 IP를 가진 도메인을 가리키며, 최종적으로 A/AAAA 레코드로 해석됩니다.",
    "references": [
      {
        "title": "RFC 1035 Section 3.2.2",
        "url": "https://www.rfc-editor.org/rfc/rfc1035#section-3.2.2"
      }
    ]
  },
  {
    "id": "NET-081",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "hosts 파일은 어떤 역할을 하나요? DNS와 비교하였을 때 어떤 것이 우선순위가 더 높나요?",
    "answer": "hosts 파일은 로컬에서 도메인-IP 매핑을 정의하는 텍스트 파일입니다.\n위치: Windows(C:\\Windows\\System32\\drivers\\etc\\hosts), Linux/Mac(/etc/hosts)\nDNS 쿼리 전에 먼저 참조됨\n\n우선순위: hosts 파일 > DNS\n\n용도: 로컬 개발 환경 설정, 특정 도메인 차단, 테스트",
    "references": [
      {
        "title": "RFC 952 - DoD Hostnames",
        "url": "https://www.rfc-editor.org/rfc/rfc952"
      }
    ]
  },
  {
    "id": "NET-082",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "OSI 7계층에 대해 설명해 주세요.",
    "answer": "계층   이름   역할   프로토콜/장비\n\n7   Application   사용자 인터페이스   HTTP, FTP, DNS\n6   Presentation   데이터 변환, 암호화   SSL/TLS, JPEG\n5   Session   세션 관리   NetBIOS\n4   Transport   종단 간 통신   TCP, UDP\n3   Network   라우팅   IP, 라우터\n2   Data Link   물리 주소 지정   Ethernet, 스위치\n1   Physical   전기 신호 전송   케이블, 허브",
    "references": [
      {
        "title": "ISO/IEC 7498-1",
        "url": "https://www.iso.org/standard/20269.html"
      }
    ]
  },
  {
    "id": "NET-083",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "OSI 모델에서 Transport Layer와 Network Layer의 차이에 대해 설명해 주세요.",
    "answer": "구분   Network Layer (L3)   Transport Layer (L4)\n\n주소   IP 주소 (호스트)   포트 번호 (프로세스)\n통신 단위   패킷   세그먼트\n범위   호스트 간   프로세스 간 (End-to-End)\n신뢰성   Best Effort   TCP는 신뢰성 보장\n프로토콜   IP, ICMP   TCP, UDP\n\nNetwork Layer는 \"어디로\", Transport Layer는 \"누구에게, 어떻게\"를 담당합니다.",
    "references": [
      {
        "title": "RFC 1122",
        "url": "https://www.rfc-editor.org/rfc/rfc1122"
      }
    ]
  },
  {
    "id": "NET-084",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "L3 Switch와 Router의 차이에 대해 설명해 주세요.",
    "answer": "구분   L3 Switch   Router\n\n처리   하드웨어 (ASIC)   소프트웨어\n속도   매우 빠름   상대적으로 느림\n기능   기본 라우팅   NAT, 방화벽, VPN 등\n용도   LAN 내부   WAN 연결, 인터넷\n포트   많음 (24-48개)   적음 (2-8개)\n\nL3 Switch는 \"라우팅 가능한 스위치\", Router는 \"다양한 네트워크 기능 장비\"입니다.",
    "references": [
      {
        "title": "RFC 1812 - Router Requirements",
        "url": "https://www.rfc-editor.org/rfc/rfc1812"
      }
    ]
  },
  {
    "id": "NET-085",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "OSI 7계층 모델에서 각 계층의 데이터 단위(PDU)를 무엇이라고 부르나요?",
    "answer": "계층   PDU (Protocol Data Unit)\n\nApplication (L7)   Data / Message\nTransport (L4)   Segment (TCP) / Datagram (UDP)\nNetwork (L3)   Packet\nData Link (L2)   Frame\nPhysical (L1)   Bit\n\n각 계층에서 헤더가 추가되며, 이를 캡슐화(Encapsulation)라 합니다.",
    "references": [
      {
        "title": "ISO/IEC 7498-1",
        "url": "https://www.iso.org/standard/20269.html"
      }
    ]
  },
  {
    "id": "NET-086",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "OSI 7계층 모델에서 데이터가 전송될 때 각 계층별 헤더가 붙는 캡슐화(Encapsulation) 순서에 대해 설명해 주세요.",
    "answer": "캡슐화(송신) 순서:\n\n역캡슐화(수신) 순서: 역순으로 헤더 제거\n\n각 계층은 상위 계층의 전체를 데이터로 취급하고 자신의 헤더를 붙입니다.",
    "references": [
      {
        "title": "RFC 1122",
        "url": "https://www.rfc-editor.org/rfc/rfc1122"
      }
    ]
  },
  {
    "id": "NET-087",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "IP 주소를 MAC 주소로 변환하는 ARP(Address Resolution Protocol)에 대해 설명해 주세요.",
    "answer": "ARP(Address Resolution Protocol)는 IP 주소를 MAC 주소로 변환하는 프로토콜입니다.\n\n동작 과정:\nARP Request: \"이 IP의 MAC 주소가 뭐야?\" (브로드캐스트)\nARP Reply: \"내 MAC 주소는 이거야\" (유니캐스트)\nARP 테이블에 캐싱\n\n같은 네트워크 내에서만 동작하며, 다른 네트워크는 게이트웨이의 MAC 주소를 사용합니다.",
    "references": [
      {
        "title": "RFC 826 - ARP",
        "url": "https://www.rfc-editor.org/rfc/rfc826"
      }
    ]
  },
  {
    "id": "NET-088",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "라우터 내의 포워딩 과정에 대해 설명해 주세요.",
    "answer": "패킷 수신: 입력 포트에서 프레임 수신, 역캡슐화\n목적지 확인: IP 헤더에서 목적지 IP 추출\n테이블 검색: 포워딩 테이블에서 최장 접두어 매칭 (Longest Prefix Match)\nTTL 감소: TTL 1 감소, 0이면 폐기\n출력 포트 결정: 매칭된 엔트리의 출력 포트로 전달\n재캡슐화: 새로운 L2 헤더 추가 후 전송",
    "references": [
      {
        "title": "RFC 1812 Section 5",
        "url": "https://www.rfc-editor.org/rfc/rfc1812#section-5"
      }
    ]
  },
  {
    "id": "NET-089",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "라우팅과 포워딩의 차이는 무엇인가요?",
    "answer": "구분   라우팅 (Routing)   포워딩 (Forwarding)\n\n역할   경로 결정   패킷 전달\n시점   사전 계산 (Control Plane)   실시간 처리 (Data Plane)\n결과물   포워딩 테이블 생성   실제 패킷 이동\n프로토콜   OSPF, BGP, RIP   -\n\n라우팅은 \"지도 그리기\", 포워딩은 \"지도 보고 이동\"입니다.",
    "references": [
      {
        "title": "RFC 1812",
        "url": "https://www.rfc-editor.org/rfc/rfc1812"
      }
    ]
  },
  {
    "id": "NET-090",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "라우팅 알고리즘에 대해 설명해 주세요.",
    "answer": "Link State (링크 상태):\n전체 네트워크 토폴로지 파악\n다익스트라 알고리즘으로 최단 경로 계산\n예: OSPF, IS-IS\n\nDistance Vector (거리 벡터):\n이웃에게 자신의 라우팅 테이블 공유\n벨만-포드 알고리즘\n예: RIP, BGP (Path Vector)\n\n경로 결정 기준: 홉 수, 대역폭, 지연, 비용 등",
    "references": [
      {
        "title": "RFC 2328 - OSPF",
        "url": "https://www.rfc-editor.org/rfc/rfc2328"
      }
    ]
  },
  {
    "id": "NET-091",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "포워딩 테이블의 구조에 대해 설명해 주세요.",
    "answer": "포워딩 테이블의 기본 구조:\n\n목적지 네트워크   서브넷 마스크   다음 홉   출력 인터페이스   메트릭\n\n192.168.1.0   /24   10.0.0.1   eth0   10\n0.0.0.0   /0   10.0.0.254   eth1   1\nLongest Prefix Match: 가장 구체적인 경로 선택\nDefault Route: 0.0.0.0/0으로 매칭되지 않는 모든 트래픽 처리",
    "references": [
      {
        "title": "RFC 1812 Section 5.2",
        "url": "https://www.rfc-editor.org/rfc/rfc1812#section-5.2"
      }
    ]
  },
  {
    "id": "NET-092",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "로드밸런서가 무엇인가요?",
    "answer": "로드밸런서는 들어오는 트래픽을 여러 서버에 분산시키는 장치/소프트웨어입니다.\n\n목적:\n부하 분산으로 성능 향상\n고가용성 (서버 장애 시 다른 서버로 라우팅)\n확장성 (서버 추가/제거 용이)\n\n종류: 하드웨어(F5), 소프트웨어(Nginx, HAProxy), 클라우드(AWS ALB/NLB)",
    "references": [
      {
        "title": "RFC 7098 - Load Balancing",
        "url": "https://www.rfc-editor.org/rfc/rfc7098"
      }
    ]
  },
  {
    "id": "NET-093",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "L4 로드밸런서와 L7 로드밸런서의 차이에 대해 설명해 주세요.",
    "answer": "구분   L4 로드밸런서   L7 로드밸런서\n\n계층   Transport (TCP/UDP)   Application (HTTP/HTTPS)\n분산 기준   IP, Port   URL, Header, Cookie, Host\n속도   빠름 (패킷 수준 처리)   상대적으로 느림 (요청 파싱 필요)\n기능   단순 분산, TCP/UDP 모두 지원   콘텐츠 기반 라우팅, SSL 종료, 캐싱\n연결 방식   DSR, NAT   Proxy (클라이언트-LB, LB-서버 별개 연결)\n예시   AWS NLB, HAProxy (L4 모드)   AWS ALB, Nginx, HAProxy (L7 모드)\n\n선택 기준:\nL4: 고성능 필요, 비HTTP 프로토콜, 단순한 분산\nL7: URL 기반 라우팅, A/B 테스팅, SSL 오프로딩, WebSocket 등\n\n트레이드오프: L7은 기능이 많지만 처리 오버헤드가 있고, L4는 빠르지만 HTTP 인식 기능 없음",
    "references": [
      {
        "title": "RFC 7098",
        "url": "https://www.rfc-editor.org/rfc/rfc7098"
      }
    ]
  },
  {
    "id": "NET-094",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "로드밸런서 알고리즘에 대해 설명해 주세요.",
    "answer": "정적 알고리즘:\nRound Robin: 순차적으로 분배\nWeighted Round Robin: 가중치에 따라 분배\nIP Hash: 클라이언트 IP 해시로 서버 결정\n\n동적 알고리즘:\nLeast Connection: 연결 수가 가장 적은 서버로\nLeast Response Time: 응답 시간이 가장 빠른 서버로\nResource Based: 서버 리소스 상태 기반",
    "references": [
      {
        "title": "RFC 7098 Section 4",
        "url": "https://www.rfc-editor.org/rfc/rfc7098#section-4"
      }
    ]
  },
  {
    "id": "NET-095",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "로드밸런서에서 장애가 발생한 백엔드 서버로 요청을 보내지 않도록 하려면 어떻게 해야 할까요?",
    "answer": "Health Check (헬스 체크)를 사용합니다.\n\n방식:\nTCP Check: 포트 연결 가능 여부 확인\nHTTP Check: 특정 URL 요청 후 200 응답 확인\nCustom Script: 사용자 정의 스크립트 실행\n\n동작:\n주기적으로 헬스 체크 수행 (예: 10초마다)\n연속 실패 시 해당 서버를 풀에서 제외\n복구 확인 시 다시 풀에 추가",
    "references": [
      {
        "title": "AWS ELB Health Checks",
        "url": "https://docs.aws.amazon.com/elasticloadbalancing/"
      }
    ]
  },
  {
    "id": "NET-096",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "로드밸런서 장치를 사용하지 않고, DNS를 활용해서 유사하게 로드밸런싱을 하는 방법에 대해 설명해 주세요.",
    "answer": "DNS Round Robin을 사용합니다.\n\n방법:\n하나의 도메인에 여러 A 레코드(IP) 등록\nDNS 서버가 질의마다 IP 순서를 바꿔 응답\n\n장점: 구현 간단, 추가 장비 불필요, 비용 없음\n\n단점:\n헬스 체크 불가 (장애 서버로도 라우팅 - 치명적)\nDNS 캐싱으로 균등 분산 어려움 (TTL 동안 같은 IP)\n세밀한 제어 불가 (가중치, 세션 유지 등)\n빠른 장애 대응 어려움 (TTL 만료 대기)\n\n개선된 DNS 기반 로드밸런싱 (AWS Route 53 등):\n헬스 체크 + 자동 장애 조치 (Failover)\n가중치 기반 라우팅 (Weighted)\n지연시간 기반 라우팅 (Latency-based)\n지리적 라우팅 (Geolocation)",
    "references": [
      {
        "title": "RFC 1794 - DNS Round Robin",
        "url": "https://www.rfc-editor.org/rfc/rfc1794"
      }
    ]
  },
  {
    "id": "NET-097",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "서브넷 마스크와, 게이트웨이에 대해 설명해 주세요.",
    "answer": "서브넷 마스크:\nIP 주소에서 네트워크/호스트 부분을 구분\n예: 255.255.255.0 (/24) -> 앞 24비트가 네트워크\n같은 네트워크인지 판단하는 데 사용\n\n게이트웨이 (Default Gateway):\n다른 네트워크로 나가는 출구 (라우터)\n목적지가 같은 서브넷이 아니면 게이트웨이로 전송\n일반적으로 서브넷의 첫 번째 또는 마지막 IP",
    "references": [
      {
        "title": "RFC 950 - Subnetting",
        "url": "https://www.rfc-editor.org/rfc/rfc950"
      }
    ]
  },
  {
    "id": "NET-098",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "사설 IP와 공인 IP 간 변환을 담당하는 NAT(Network Address Translation)에 대해 설명해 주세요.",
    "answer": "NAT(Network Address Translation)은 사설 IP를 공인 IP로 변환하는 기술입니다.\n\n종류:\nStatic NAT: 1:1 고정 매핑 (서버 공개용)\nDynamic NAT: 공인 IP 풀에서 동적 할당\nPAT/NAPT (Port Address Translation): 포트 번호까지 변환 (가장 일반적, 1:N)\n\n장점:\nIPv4 주소 절약 (하나의 공인 IP로 여러 기기 인터넷 사용)\n내부 네트워크 구조 은폐 (보안상 이점)\n\n단점:\nEnd-to-End 연결성 저해: 외부에서 내부로 직접 연결 불가\nP2P 통신 어려움: 양쪽 모두 NAT 뒤에 있으면 연결 복잡 (STUN/TURN/ICE 필요)\n일부 프로토콜 호환 문제: FTP Active 모드, SIP 등\n포트 고갈: 동시 연결 수 제한 (약 65,000개 포트)\n\nNAT Traversal 기법: STUN, TURN, ICE, UPnP 등으로 NAT 뒤 기기 간 통신 해결",
    "references": [
      {
        "title": "RFC 3022 - NAT",
        "url": "https://www.rfc-editor.org/rfc/rfc3022"
      }
    ]
  },
  {
    "id": "NET-099",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "서브넷 마스크의 표현 방식에 대해 설명해 주세요.",
    "answer": "점 표기법 (Dotted Decimal):\n예: 255.255.255.0\n각 옥텟을 10진수로 표현\nCIDR 표기법 (Prefix Length):\n예: /24\n네트워크 비트 수만 표시\n192.168.1.0/24 = 192.168.1.0 ~ 192.168.1.255\n\nCIDR   서브넷 마스크   호스트 수\n\n/24   255.255.255.0   254\n/16   255.255.0.0   65,534",
    "references": [
      {
        "title": "RFC 4632 - CIDR",
        "url": "https://www.rfc-editor.org/rfc/rfc4632"
      }
    ]
  },
  {
    "id": "NET-100",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "255.0.255.0 같은 형태의 서브넷 마스크도 가능한가요?",
    "answer": "이론적으로 불가능합니다.\n\n서브넷 마스크는 연속된 1비트 뒤에 연속된 0비트가 와야 합니다.\n유효: 11111111.11111111.11111111.00000000 (255.255.255.0)\n무효: 11111111.00000000.11111111.00000000 (255.0.255.0)\n\n비연속 마스크는 라우팅 테이블 최적화와 주소 관리를 복잡하게 만들어 표준에서 허용하지 않습니다.",
    "references": [
      {
        "title": "RFC 4632",
        "url": "https://www.rfc-editor.org/rfc/rfc4632"
      }
    ]
  },
  {
    "id": "NET-101",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "www.github.com을 브라우저에 입력하고 엔터를 쳤을 때, 네트워크 상 어떤 일이 일어나는지 최대한 자세하게 설명해 주세요.",
    "answer": "URL 파싱: 프로토콜(https), 도메인(www.github.com) 추출\nDNS 조회: 로컬 캐시 -> hosts -> DNS 서버로 IP 획득\nTCP 연결: 3-way handshake로 연결 수립\nTLS 핸드셰이크: 인증서 검증, 대칭키 교환\nHTTP 요청: GET / HTTP/1.1 요청 전송\n서버 처리: 웹서버/WAS가 요청 처리\nHTTP 응답: HTML, CSS, JS 등 응답\n렌더링: 브라우저가 DOM 파싱, 화면 표시\n연결 종료: Keep-Alive 또는 4-way handshake",
    "references": [
      {
        "title": "MDN - How the Web Works",
        "url": "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works"
      }
    ]
  },
  {
    "id": "NET-102",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "대규모 웹 서비스에서 DNS 쿼리를 통해 얻어진 IP 주소는 일반적으로 어떤 장치를 가리키고 있나요?",
    "answer": "일반적으로 실제 서버가 아닌 중간 장치를 가리킵니다:\nCDN 엣지 서버: CloudFlare, Akamai 등 (가장 가까운 캐시 서버)\n로드밸런서: 트래픽을 분산하는 진입점\n리버스 프록시: Nginx 등 프론트 서버\n방화벽/WAF: 보안 장비\n\n실제 애플리케이션 서버는 내부 네트워크에 있고, 외부에 직접 노출되지 않는 것이 일반적입니다.",
    "references": [
      {
        "title": "RFC 1035",
        "url": "https://www.rfc-editor.org/rfc/rfc1035"
      }
    ]
  },
  {
    "id": "NET-103",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "Web Server와 Web Application Server(WAS)의 차이에 대해 설명해 주세요.",
    "answer": "구분   Web Server   WAS (Web Application Server)\n\n역할   정적 콘텐츠 제공   동적 콘텐츠 생성\n처리   HTML, CSS, 이미지   비즈니스 로직, DB 연동\n예시   Nginx, Apache   Tomcat, Node.js, Spring\n프로토콜   HTTP   HTTP + 애플리케이션 프로토콜\n\n일반적으로 Web Server가 앞단에서 정적 파일/리버스 프록시 역할을 하고, WAS가 실제 로직을 처리합니다.",
    "references": [
      {
        "title": "MDN - Web Server",
        "url": "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server"
      }
    ]
  },
  {
    "id": "NET-104",
    "category": "network",
    "categoryName": "Network",
    "section": "cs",
    "question": "URL, URI, URN은 어떤 차이가 있나요?",
    "answer": "URI (Uniform Resource Identifier):\n리소스를 식별하는 가장 큰 개념\nURL과 URN을 포함\n\nURL (Uniform Resource Locator):\n리소스의 위치를 나타냄\n예: https://example.com/page.html\n\nURN (Uniform Resource Name):\n리소스의 이름을 나타냄 (위치 독립적)\n예: urn:isbn:0451450523\n\n관계: URI = URL + URN (URL과 URN은 URI의 하위 집합)",
    "references": [
      {
        "title": "RFC 3986 - URI",
        "url": "https://www.rfc-editor.org/rfc/rfc3986"
      }
    ]
  },
  {
    "id": "OS-001",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "시스템 콜이 무엇인지 설명해 주세요.",
    "answer": "시스템 콜은 사용자 프로그램이 운영체제 커널의 서비스를 요청하기 위한 프로그래밍 인터페이스입니다. 사용자 모드에서 실행되는 프로세스가 파일 읽기/쓰기, 프로세스 생성, 네트워크 통신 등 커널 권한이 필요한 작업을 수행할 때 시스템 콜을 통해 커널 모드로 전환하여 해당 서비스를 요청합니다.",
    "references": [
      {
        "title": "Linux man-pages: syscalls",
        "url": "https://man7.org/linux/man-pages/man2/syscalls.2.html"
      }
    ]
  },
  {
    "id": "OS-002",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "시스템 콜의 구체적인 예시를 들어주세요.",
    "answer": "프로세스 제어: fork(), exec(), exit(), wait()\n파일 조작: open(), read(), write(), close()\n장치 관리: ioctl(), read(), write()\n정보 유지: getpid(), alarm(), sleep()\n통신: pipe(), socket(), connect(), accept()\n메모리 관리: mmap(), brk(), sbrk()",
    "references": [
      {
        "title": "Linux man-pages: syscalls",
        "url": "https://man7.org/linux/man-pages/man2/syscalls.2.html"
      }
    ]
  },
  {
    "id": "OS-003",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "시스템 콜이 운영체제에서 어떤 과정으로 실행되는지 설명해 주세요.",
    "answer": "사용자 프로그램이 시스템 콜 래퍼 함수 호출\n시스템 콜 번호를 레지스터에 저장\n소프트웨어 인터럽트(trap) 발생 (x86: int 0x80 또는 syscall 명령어)\nCPU가 커널 모드로 전환\n커널의 시스템 콜 핸들러가 시스템 콜 테이블에서 해당 함수 찾아 실행\n결과를 레지스터에 저장하고 사용자 모드로 복귀",
    "references": [
      {
        "title": "Linux Kernel Documentation: Adding a New System Call",
        "url": "https://www.kernel.org/doc/html/latest/process/adding-syscalls.html"
      }
    ]
  },
  {
    "id": "OS-004",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "시스템 콜의 유형에 대해 설명해 주세요.",
    "answer": "프로세스 제어: 프로세스 생성/종료, 실행, 대기 (fork, exec, exit, wait)\n파일 관리: 파일 생성/삭제, 열기/닫기, 읽기/쓰기 (open, close, read, write)\n장치 관리: 장치 요청/해제, 읽기/쓰기 (ioctl, read, write)\n정보 유지: 시간/날짜, 시스템 데이터 (time, getpid, uname)\n통신: 연결 생성/삭제, 메시지 송수신 (socket, send, recv, pipe)\n보호: 권한 설정/확인 (chmod, chown, umask)",
    "references": [
      {
        "title": "POSIX.1-2017 System Interfaces",
        "url": "https://pubs.opengroup.org/onlinepubs/9699919799/"
      }
    ]
  },
  {
    "id": "OS-005",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "운영체제의 Dual Mode 에 대해 설명해 주세요.",
    "answer": "Dual Mode는 CPU가 사용자 모드(User Mode)와 커널 모드(Kernel Mode) 두 가지 실행 모드를 가지는 것입니다.\n사용자 모드: 일반 애플리케이션이 실행되며, 하드웨어 직접 접근이나 특권 명령어 실행이 제한됨\n커널 모드: OS 커널이 실행되며, 모든 명령어와 하드웨어에 접근 가능\n\n모드 비트(Mode bit)로 현재 모드를 구분하며, 시스템 콜이나 인터럽트 발생 시 커널 모드로 전환됩니다.",
    "references": [
      {
        "title": "Intel SDM Vol.3: Protected Mode",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "OS-006",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Dual Mode에서 유저모드와 커널모드를 구분해야 하는 이유는 무엇인가요?",
    "answer": "시스템 보호: 사용자 프로그램이 커널 메모리나 다른 프로세스의 메모리에 접근하는 것을 방지\n안정성: 잘못된 사용자 프로그램이 시스템 전체를 손상시키는 것을 방지\n보안: 악의적인 프로그램이 하드웨어를 직접 제어하거나 민감한 데이터에 접근하는 것을 차단\n자원 관리: OS가 하드웨어 자원을 중앙에서 관리하여 공정한 분배 가능",
    "references": [
      {
        "title": "Linux Kernel Documentation: Memory Protection",
        "url": "https://www.kernel.org/doc/html/latest/admin-guide/mm/"
      }
    ]
  },
  {
    "id": "OS-007",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "운영체제에서 서로 다른 시스템 콜을 어떻게 구분하나요?",
    "answer": "시스템 콜 번호(System Call Number)를 통해 구분합니다.\n각 시스템 콜은 고유한 번호가 할당됨 (예: Linux x86-64에서 read=0, write=1, open=2)\n시스템 콜 호출 시 해당 번호를 레지스터(x86-64: rax)에 저장\n커널은 시스템 콜 테이블(syscalltable)에서 번호에 해당하는 핸들러 함수를 찾아 실행\n이 테이블은 커널 컴파일 시 정적으로 생성됨",
    "references": [
      {
        "title": "Linux syscall table",
        "url": "https://github.com/torvalds/linux/blob/master/arch/x86/entry/syscalls/syscall_64.tbl"
      }
    ]
  },
  {
    "id": "OS-008",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "인터럽트가 무엇인지 설명해 주세요.",
    "answer": "인터럽트는 CPU가 현재 실행 중인 작업을 일시 중단하고, 특정 이벤트를 처리하도록 알리는 신호입니다.\n하드웨어 인터럽트: 외부 장치(키보드, 마우스, 디스크 등)에서 발생\n소프트웨어 인터럽트(트랩): 프로그램에서 의도적으로 발생 (시스템 콜, 예외 등)\n\n인터럽트 발생 시 CPU는 현재 상태를 저장하고, 인터럽트 서비스 루틴(ISR)을 실행한 후 원래 작업으로 복귀합니다.",
    "references": [
      {
        "title": "Linux Kernel Documentation: Interrupts",
        "url": "https://www.kernel.org/doc/html/latest/core-api/genericirq.html"
      }
    ]
  },
  {
    "id": "OS-009",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "인터럽트가 발생했을 때 처리 과정을 설명해 주세요.",
    "answer": "인터럽트 발생: 하드웨어 또는 소프트웨어에서 인터럽트 신호 발생\n현재 상태 저장: CPU는 현재 실행 중인 명령어의 PC, 레지스터 등을 스택에 저장\n인터럽트 벡터 참조: 인터럽트 번호로 IDT(Interrupt Descriptor Table)에서 핸들러 주소 확인\nISR 실행: 해당 인터럽트 서비스 루틴(Interrupt Service Routine) 실행\n상태 복원: 저장했던 상태를 복원하고 원래 작업으로 복귀",
    "references": [
      {
        "title": "Intel SDM Vol.3: Interrupt and Exception Handling",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "OS-010",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Polling 방식에 대해 설명해 주세요.",
    "answer": "Polling은 CPU가 주기적으로 장치의 상태를 확인하여 이벤트 발생 여부를 검사하는 방식입니다.\n\n장점:\n구현이 단순함\n인터럽트 오버헤드가 없음 (컨텍스트 저장/복원, ISR 호출 등)\n예측 가능한 응답 시간 (실시간 시스템에서 중요)\n짧은 대기 시간에서 효율적\n\n단점:\nCPU 자원 낭비 (busy waiting)\n이벤트가 없어도 계속 확인해야 함\n응답 지연 가능성 (폴링 주기에 따라)\n\nPolling vs Interrupt 선택 기준:\n\n상황   권장 방식   이유\n\n이벤트 빈도 높음   Polling   인터럽트 오버헤드가 누적됨\n이벤트 빈도 낮음   Interrupt   CPU를 다른 작업에 사용 가능\n대기 시간 짧음   Polling   인터럽트 처리 시간보다 빠름\n대기 시간 김   Interrupt   CPU 낭비 방지\n실시간 요구사항   Polling   예측 가능한 지연시간\n\n실무 예시:\n고속 NVMe SSD: 폴링 모드 지원 (지연시간 최소화)\n네트워크 카드(NAPI): 하이브리드 (인터럽트로 시작, 폴링으로 처리)",
    "references": [
      {
        "title": "Linux Kernel Documentation: Device Drivers",
        "url": "https://www.kernel.org/doc/html/latest/driver-api/"
      }
    ]
  },
  {
    "id": "OS-011",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "HW / SW 인터럽트에 대해 설명해 주세요.",
    "answer": "하드웨어 인터럽트 (Hardware Interrupt):\n외부 장치(키보드, 마우스, 네트워크 카드, 타이머 등)에서 발생\n비동기적: 언제든지 발생 가능\n인터럽트 컨트롤러(PIC/APIC)를 통해 CPU에 전달\n예: 키보드 입력, 디스크 I/O 완료, 타이머 틱\n\n소프트웨어 인터럽트 (Software Interrupt/Trap):\n프로그램 실행 중 의도적으로 발생\n동기적: 특정 명령어 실행 시 발생\n시스템 콜, 예외(Exception), 오류 처리에 사용\n예: int 0x80, syscall 명령어, divide by zero",
    "references": [
      {
        "title": "Linux Kernel: Hardware Interrupts",
        "url": "https://www.kernel.org/doc/html/latest/core-api/genericirq.html"
      }
    ]
  },
  {
    "id": "OS-012",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "동시에 두 개 이상의 인터럽트가 발생하면, 어떻게 처리해야 하나요?",
    "answer": "인터럽트 우선순위(Interrupt Priority)를 통해 처리합니다.\n우선순위 기반 처리: 각 인터럽트에 우선순위가 할당되며, 높은 우선순위 인터럽트가 먼저 처리됨\n중첩 인터럽트(Nested Interrupt): 낮은 우선순위 ISR 실행 중 높은 우선순위 인터럽트가 발생하면 선점 가능\n인터럽트 마스킹: 중요한 작업 중 특정 인터럽트를 비활성화\n인터럽트 컨트롤러(APIC): 우선순위 관리 및 중재 담당\n\n일반적 우선순위: 전원 > 기계 오류 > 타이머 > 디스크 I/O > 네트워크 > 키보드",
    "references": [
      {
        "title": "Intel APIC Documentation",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "OS-013",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "프로세스가 무엇인가요?",
    "answer": "프로세스는 실행 중인 프로그램입니다. 프로그램이 메모리에 적재되어 CPU를 할당받아 실행되는 상태를 말합니다.\n\n프로세스는 다음을 포함합니다:\n코드 영역: 실행할 프로그램 코드\n데이터 영역: 전역 변수, 정적 변수\n힙 영역: 동적 할당 메모리\n스택 영역: 함수 호출, 지역 변수\nPCB: 프로세스 상태 정보\n\n각 프로세스는 독립적인 주소 공간을 가지며, OS가 자원 할당 및 스케줄링의 단위로 관리합니다.",
    "references": [
      {
        "title": "Linux Kernel: Process Management",
        "url": "https://www.kernel.org/doc/html/latest/scheduler/"
      }
    ]
  },
  {
    "id": "OS-014",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "프로그램과 프로세스, 스레드의 차이에 대해 설명해 주세요.",
    "answer": "구분   프로그램   프로세스   스레드\n\n정의   디스크에 저장된 실행 파일   실행 중인 프로그램   프로세스 내 실행 단위\n상태   정적 (passive)   동적 (active)   동적\n메모리   없음   독립적 주소 공간   프로세스 주소 공간 공유\n자원   없음   OS로부터 할당   프로세스 자원 공유\n생성 비용   -   높음   낮음\n통신   -   IPC 필요   공유 메모리로 직접 통신\n\n스레드는 코드, 데이터, 힙을 공유하고 각자의 스택과 레지스터를 가집니다.",
    "references": [
      {
        "title": "POSIX Threads (pthreads)",
        "url": "https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/pthread.h.html"
      }
    ]
  },
  {
    "id": "OS-015",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "PCB가 무엇인가요?",
    "answer": "PCB(Process Control Block)는 운영체제가 프로세스를 관리하기 위해 유지하는 자료구조입니다. Linux에서는 task_struct로 구현됩니다.\n\nPCB에 저장되는 정보:\n프로세스 상태: Ready, Running, Waiting 등\n프로그램 카운터(PC): 다음 실행할 명령어 주소\nCPU 레지스터: 컨텍스트 스위칭 시 저장/복원\n스케줄링 정보: 우선순위, 스케줄링 큐 포인터\n메모리 관리 정보: 페이지 테이블, 세그먼트 테이블\nI/O 상태 정보: 열린 파일 목록, I/O 장치\n계정 정보: PID, CPU 사용 시간",
    "references": [
      {
        "title": "Linux Kernel: task_struct",
        "url": "https://github.com/torvalds/linux/blob/master/include/linux/sched.h"
      }
    ]
  },
  {
    "id": "OS-016",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "스레드도 PCB(Process Control Block)를 갖고 있나요?",
    "answer": "Linux에서는 스레드도 자체 PCB(taskstruct)를 가집니다.\n\nLinux는 프로세스와 스레드를 구분하지 않고 모두 taskstruct로 관리합니다. 다만 스레드들은:\n같은 메모리 공간(mm_struct)을 공유\n같은 파일 디스크립터 테이블 공유\n같은 시그널 핸들러 공유\n각자의 스택, 레지스터, PC는 별도 유지\n\n다른 OS에서는 TCB(Thread Control Block)라는 별도 구조체를 사용하기도 합니다. TCB는 PCB보다 작으며 스레드별 정보(스택 포인터, 레지스터, 상태)만 저장합니다.",
    "references": [
      {
        "title": "Linux Kernel: clone() system call",
        "url": "https://man7.org/linux/man-pages/man2/clone.2.html"
      }
    ]
  },
  {
    "id": "OS-017",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "리눅스에서, 프로세스와 스레드는 각각 어떻게 생성될까요?",
    "answer": "프로세스 생성: fork() 시스템 콜\n부모 프로세스의 복사본 생성\nCopy-on-Write로 메모리 효율적 복사\n새로운 PID 할당, 별도의 주소 공간\n\n스레드 생성: clone() 시스템 콜 (내부적으로 pthreadcreate가 사용)\nCLONEVM: 메모리 공간 공유\nCLONEFILES: 파일 디스크립터 공유\nCLONEFS: 파일 시스템 정보 공유\nCLONE_SIGHAND: 시그널 핸들러 공유\n\nLinux에서는 프로세스와 스레드 모두 clone()을 기반으로 하며, 플래그에 따라 공유 범위가 결정됩니다.",
    "references": [
      {
        "title": "Linux man-pages: fork(2)",
        "url": "https://man7.org/linux/man-pages/man2/fork.2.html"
      },
      {
        "title": "Linux man-pages: clone(2)",
        "url": "https://man7.org/linux/man-pages/man2/clone.2.html"
      }
    ]
  },
  {
    "id": "OS-018",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "자식 프로세스가 상태를 알리지 않고 죽거나, 부모 프로세스가 먼저 죽게 되면 어떻게 처리하나요?",
    "answer": "좀비 프로세스 (Zombie Process):\n자식 프로세스가 종료되었지만 부모가 wait()를 호출하지 않은 상태\nPCB(task_struct)가 메모리에 남아 종료 상태 정보 유지\n부모가 wait()를 호출하면 자원 회수\n부모가 종료되면 init(PID 1)이 입양하여 처리\n\n고아 프로세스 (Orphan Process):\n부모 프로세스가 먼저 종료된 자식 프로세스\ninit 프로세스(systemd)가 새로운 부모가 됨\ninit은 주기적으로 wait()를 호출하여 고아 프로세스 정리",
    "references": [
      {
        "title": "Linux man-pages: wait(2)",
        "url": "https://man7.org/linux/man-pages/man2/wait.2.html"
      }
    ]
  },
  {
    "id": "OS-019",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "리눅스에서, 데몬프로세스에 대해 설명해 주세요.",
    "answer": "데몬(Daemon) 프로세스는 백그라운드에서 실행되며 특정 서비스를 제공하는 프로세스입니다.\n\n특징:\n터미널과 분리되어 실행 (controlling terminal 없음)\n보통 시스템 부팅 시 시작되어 계속 실행\n이름이 'd'로 끝나는 경우가 많음 (sshd, httpd, mysqld)\n부모 프로세스가 init(PID 1)\n\n데몬 생성 과정:\nfork()로 자식 생성 후 부모 종료\nsetsid()로 새 세션 생성\n작업 디렉토리를 /로 변경\n파일 디스크립터(stdin, stdout, stderr) 닫기\n로그 파일 또는 syslog로 출력 리디렉션",
    "references": [
      {
        "title": "Linux man-pages: daemon(7)",
        "url": "https://man7.org/linux/man-pages/man7/daemon.7.html"
      }
    ]
  },
  {
    "id": "OS-020",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "리눅스는 프로세스가 일종의 트리를 형성하고 있습니다. 이 트리의 루트 노드에 위치하는 프로세스에 대해 설명해 주세요.",
    "answer": "init 프로세스 (PID 1)가 프로세스 트리의 루트입니다. 현대 Linux에서는 주로 systemd가 이 역할을 합니다.\n\n특징:\n커널 부팅 후 가장 먼저 실행되는 사용자 공간 프로세스\n모든 프로세스의 조상 (직/간접적 부모)\n고아 프로세스를 입양하여 좀비 방지\n시스템 종료 시 모든 프로세스 정리\n\n역할:\n시스템 초기화 스크립트 실행\n데몬 프로세스 시작 및 관리\n런레벨/타겟 관리\n고아 프로세스 회수\n\npstree 명령어로 프로세스 트리 구조를 확인할 수 있습니다.",
    "references": [
      {
        "title": "systemd Documentation",
        "url": "https://www.freedesktop.org/wiki/Software/systemd/"
      }
    ]
  },
  {
    "id": "OS-021",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "프로세스 주소공간에 대해 설명해 주세요.",
    "answer": "프로세스 주소공간은 프로세스가 사용하는 가상 메모리 영역으로, 다음과 같이 구성됩니다:\n\n영역   설명   특성\n\nText(Code)   실행 코드   읽기 전용\nData   초기화된 전역/정적 변수   읽기/쓰기\nBSS   초기화되지 않은 전역/정적 변수   읽기/쓰기, 0으로 초기화\nHeap   동적 할당 메모리 (malloc)   낮은 주소 -> 높은 주소로 증가\nStack   함수 호출, 지역 변수   높은 주소 -> 낮은 주소로 증가\n\nHeap과 Stack 사이에는 공유 라이브러리, mmap 영역이 위치합니다.",
    "references": [
      {
        "title": "Linux Kernel: Memory Layout",
        "url": "https://www.kernel.org/doc/html/latest/admin-guide/mm/"
      }
    ]
  },
  {
    "id": "OS-022",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "초기화 하지 않은 변수들은 어디에 저장될까요?",
    "answer": "BSS(Block Started by Symbol) 영역에 저장됩니다.\n초기화되지 않은 전역 변수와 정적 변수가 위치\n프로그램 로드 시 운영체제가 자동으로 0으로 초기화\n실행 파일에는 크기 정보만 저장 (실제 데이터 X) -> 파일 크기 절약\nData 영역과 달리 초기값을 저장할 필요가 없음",
    "references": [
      {
        "title": "ELF Format Specification",
        "url": "https://refspecs.linuxfoundation.org/elf/elf.pdf"
      }
    ]
  },
  {
    "id": "OS-023",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "일반적인 주소공간 그림처럼, Stack과 Heap의 크기는 매우 크다고 할 수 있을까요? 그렇지 않다면, 그 크기는 언제 결정될까요?",
    "answer": "Stack과 Heap은 고정 크기가 아니며, 실제로는 제한적입니다.\n\nStack:\n기본 크기: Linux에서 보통 8MB (ulimit -s로 확인)\n컴파일 시 또는 실행 시 설정 가능\n초과 시 Stack Overflow 발생\n\nHeap:\n이론상 가상 주소 공간까지 확장 가능\n실제로는 물리 메모리 + 스왑 공간으로 제한\nbrk(), sbrk() 시스템 콜로 동적 확장\n큰 할당은 mmap()으로 별도 영역 사용\n\n그림에서는 Heap과 Stack이 서로 향해 자라는 것처럼 보이지만, 실제로는 경계가 명확히 관리됩니다.",
    "references": [
      {
        "title": "Linux man-pages: getrlimit(2)",
        "url": "https://man7.org/linux/man-pages/man2/getrlimit.2.html"
      }
    ]
  },
  {
    "id": "OS-024",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Stack과 Heap 공간 중 접근 속도가 더 빠른 공간은 어디이고, 그 이유는 무엇인가요?",
    "answer": "Stack이 일반적으로 더 빠릅니다.\n\nStack이 빠른 이유:\n캐시 지역성: Stack은 연속적으로 사용되어 캐시 히트율이 높음\n단순한 할당/해제: 스택 포인터(SP)만 이동하면 됨 (O(1))\n메모리 관리 오버헤드 없음: 별도의 메타데이터 관리 불필요\n\nHeap이 느린 이유:\n복잡한 할당 알고리즘: free list 탐색, 단편화 처리 필요\n캐시 지역성 낮음: 할당된 메모리가 분산될 수 있음\n동기화 오버헤드: 멀티스레드 환경에서 락 필요\n시스템 콜 가능성: brk(), mmap() 호출 필요할 수 있음",
    "references": [
      {
        "title": "glibc malloc internals",
        "url": "https://sourceware.org/glibc/wiki/MallocInternals"
      }
    ]
  },
  {
    "id": "OS-025",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "프로세스 주소 공간을 Code, Data, Heap, Stack 영역으로 분할하는 이유는 무엇인가요?",
    "answer": "메모리 영역 분할의 이유:\n보안 및 보호\nCode 영역을 읽기 전용으로 설정하여 코드 변조 방지\n각 영역에 적절한 권한(읽기/쓰기/실행) 부여 가능\n메모리 효율성\nCode 영역: 여러 프로세스가 공유 가능 (같은 프로그램)\nBSS 영역: 실행 파일에 실제 데이터 저장 불필요\n관리 용이성\n각 영역의 특성에 맞는 관리 방식 적용\nStack: LIFO 방식의 단순한 관리\nHeap: 동적 할당을 위한 복잡한 관리\n확장성\nStack과 Heap이 반대 방향으로 성장하여 공간 활용 최적화",
    "references": [
      {
        "title": "Linux Kernel: Virtual Memory Areas",
        "url": "https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html"
      }
    ]
  },
  {
    "id": "OS-026",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "스레드의 주소공간은 어떻게 구성되어 있을까요?",
    "answer": "스레드는 프로세스의 주소공간을 공유하되, 일부 영역은 개별적으로 가집니다.\n\n공유하는 영역:\nCode(Text) 영역\nData 영역\nBSS 영역\nHeap 영역\n열린 파일 디스크립터\n시그널 핸들러\n\n개별적인 영역:\nStack: 각 스레드마다 별도의 스택 (기본 2MB 정도)\n레지스터: PC, SP 등 CPU 레지스터\nTLS(Thread Local Storage): 스레드별 전역 변수\n스레드 ID\n\n이러한 구조 덕분에 스레드 간 통신이 빠르지만, 동기화 문제에 주의해야 합니다.",
    "references": [
      {
        "title": "POSIX Threads: Thread Local Storage",
        "url": "https://pubs.opengroup.org/onlinepubs/9699919799/functions/pthread_key_create.html"
      }
    ]
  },
  {
    "id": "OS-027",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "\"스택\"영역과 \"힙\"영역은 정말 자료구조의 스택/힙과 연관이 있는 걸까요? 만약 그렇다면, 각 주소공간의 동작과정과 연계해서 설명해 주세요.",
    "answer": "Stack 영역 - 자료구조 스택과 직접 연관:\nLIFO(Last In First Out) 방식으로 동작\n함수 호출 시 스택 프레임 push, 반환 시 pop\n스택 포인터(SP)가 가리키는 위치로 관리\n함수 호출 순서의 역순으로 반환되어야 하므로 스택 구조가 적합\n\nHeap 영역 - 자료구조 힙과 무관:\n자료구조 힙(우선순위 큐)과는 관계 없음\n\"heap\"은 단순히 \"더미, 무더기\"라는 의미\n비순차적으로 할당/해제 가능한 메모리 풀\n다양한 알고리즘으로 관리 (free list, buddy system 등)\n\n힙 영역은 할당 순서와 무관하게 해제할 수 있어야 하므로 스택 구조가 아닌 동적 메모리 관리 방식을 사용합니다.",
    "references": [
      {
        "title": "Computer Systems: A Programmer's Perspective",
        "url": "https://csapp.cs.cmu.edu/"
      }
    ]
  },
  {
    "id": "OS-028",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "IPC의 Shared Memory 기법은 프로세스 주소공간의 어디에 들어가나요? 그런 이유가 있을까요?",
    "answer": "Heap과 Stack 사이의 mmap 영역에 위치합니다.\n\n이유:\n유연한 크기 할당: mmap 영역은 동적으로 크기 조절 가능\n주소 충돌 방지: Heap/Stack 성장과 독립적인 영역\n커널 관리 용이: 페이지 단위로 매핑/해제 가능\n공유 설정: 여러 프로세스의 가상 주소를 같은 물리 페이지에 매핑\n\n매핑 방식:\n\n공유 메모리는 각 프로세스에서 다른 가상 주소를 가질 수 있지만, 같은 물리 메모리를 참조합니다.",
    "references": [
      {
        "title": "Linux man-pages: mmap(2)",
        "url": "https://man7.org/linux/man-pages/man2/mmap.2.html"
      }
    ]
  },
  {
    "id": "OS-029",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "스택과 힙영역의 크기는 언제 결정되나요? 프로그램 개발자가 아닌, 사용자가 이 공간의 크기를 수정할 수 있나요?",
    "answer": "Stack 크기 결정 시점:\n프로세스 시작 시 OS 기본값 적용 (Linux 기본 8MB)\n컴파일 시 링커 옵션으로 설정 가능\n실행 전 ulimit -s 명령으로 수정 가능\n\nHeap 크기 결정 시점:\n런타임에 동적으로 결정\nmalloc/free 호출에 따라 확장/축소\n시스템 메모리 한도까지 확장 가능\n\n사용자가 수정하는 방법:\n\n프로그램 실행 시 환경 변수나 런타임 옵션으로도 조정 가능합니다.",
    "references": [
      {
        "title": "Linux man-pages: ulimit",
        "url": "https://man7.org/linux/man-pages/man3/ulimit.3.html"
      }
    ]
  },
  {
    "id": "OS-030",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "단기, 중기, 장기 스케쥴러에 대해 설명해 주세요.",
    "answer": "장기 스케줄러 (Long-term Scheduler / Job Scheduler):\n디스크의 작업을 메모리에 적재할지 결정\ndegree of multiprogramming 제어\nI/O bound와 CPU bound 프로세스의 적절한 혼합 유지\n\n중기 스케줄러 (Medium-term Scheduler):\n메모리에서 프로세스를 일시적으로 제거 (swapping)\n메모리 부족 시 프로세스를 디스크로 스왑 아웃\n메모리 확보 후 다시 스왑 인\n\n단기 스케줄러 (Short-term Scheduler / CPU Scheduler):\nReady 큐에서 어떤 프로세스에게 CPU를 할당할지 결정\n매우 빈번하게 실행 (밀리초 단위)\n가장 빠른 성능이 요구됨",
    "references": [
      {
        "title": "Linux Kernel: Scheduler",
        "url": "https://www.kernel.org/doc/html/latest/scheduler/"
      }
    ]
  },
  {
    "id": "OS-031",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "현대 OS에서는 단기, 중기, 장기 스케줄러를 모두 사용하고 있나요?",
    "answer": "현대 OS는 주로 단기 스케줄러만 사용합니다.\n\n장기 스케줄러 - 거의 사용 안 함:\n과거 배치 시스템에서 사용\n현대 시분할 시스템에서는 프로세스가 즉시 메모리에 적재\n가상 메모리로 대체됨\n\n중기 스케줄러 - 제한적 사용:\nSwapping 개념은 존재하나 다른 방식으로 구현\nLinux의 OOM Killer: 메모리 부족 시 프로세스 종료\n페이지 단위 스왑이 프로세스 단위 스왑을 대체\n\n단기 스케줄러 - 핵심적으로 사용:\nLinux CFS (Completely Fair Scheduler)\n실시간 스케줄러 (SCHEDFIFO, SCHEDRR)",
    "references": [
      {
        "title": "Linux CFS Scheduler",
        "url": "https://www.kernel.org/doc/html/latest/scheduler/sched-design-CFS.html"
      }
    ]
  },
  {
    "id": "OS-032",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "프로세스의 스케쥴링 상태에 대해 설명해 주세요.",
    "answer": "5가지 기본 프로세스 상태:\n\n상태   설명\n\nNew   프로세스 생성 중\nReady   실행 대기 중, CPU 할당만 기다림\nRunning   CPU에서 실행 중\nWaiting (Blocked)   I/O나 이벤트 완료 대기\nTerminated   실행 완료\n\n상태 전이:\nNew -> Ready: 프로세스 생성 완료\nReady -> Running: CPU 할당 (dispatch)\nRunning -> Ready: 타임 슬라이스 만료, 선점\nRunning -> Waiting: I/O 요청, 이벤트 대기\nWaiting -> Ready: I/O 완료, 이벤트 발생\nRunning -> Terminated: 실행 완료, exit()",
    "references": [
      {
        "title": "Linux Kernel: Process States",
        "url": "https://github.com/torvalds/linux/blob/master/include/linux/sched.h"
      }
    ]
  },
  {
    "id": "OS-033",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "선점(preemptive) 스케줄링과 비선점(non-preemptive) 스케줄링에서 존재할 수 없는 상태 전이가 있나요?",
    "answer": "비선점(Non-preemptive) 스케줄링에서 불가능한 상태 전이:\n\nRunning -> Ready 전이가 타이머 인터럽트에 의해 발생할 수 없습니다.\n\n비선점 스케줄링에서는 프로세스가 자발적으로 CPU를 반납할 때만 전이 가능:\nI/O 요청 (Running -> Waiting)\n프로세스 종료 (Running -> Terminated)\nyield() 호출 (Running -> Ready)\n\n선점(Preemptive) 스케줄링에서는 모든 상태 전이 가능:\n타이머 인터럽트로 강제 전이\n높은 우선순위 프로세스에 의한 선점\n\n비선점 방식에서는 한 프로세스가 CPU를 독점하면 다른 프로세스가 기아 상태에 빠질 수 있습니다.",
    "references": [
      {
        "title": "Operating System Concepts - Silberschatz",
        "url": "https://www.os-book.com/"
      }
    ]
  },
  {
    "id": "OS-034",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Memory가 부족할 경우, Process는 어떠한 상태로 변화할까요?",
    "answer": "Suspended (중단) 상태로 전이될 수 있습니다.\n\nSuspended Ready:\nReady 상태에서 메모리 부족으로 스왑 아웃\n메모리에 없지만 실행 준비 완료\n메모리 확보 시 Ready 상태로 복귀\n\nSuspended Waiting (Suspended Blocked):\nWaiting 상태에서 스왑 아웃\nI/O 완료 시 Suspended Ready로 전이\n메모리 확보 후 Ready 상태로 복귀\n\n현대 Linux의 처리 방식:\n프로세스 단위 스왑보다 페이지 단위 스왑 사용\nOOM Killer: 극심한 메모리 부족 시 프로세스 종료\ncgroups: 메모리 사용량 제한",
    "references": [
      {
        "title": "Linux OOM Killer",
        "url": "https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html"
      }
    ]
  },
  {
    "id": "OS-035",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "컨텍스트 스위칭 시에는 어떤 일들이 일어나나요?",
    "answer": "컨텍스트 스위칭 과정:\n현재 프로세스 상태 저장\nCPU 레지스터 (범용, PC, SP, 상태 레지스터)\nPCB에 저장\n커널 모드 진입\n인터럽트 또는 시스템 콜에 의해 발생\n권한 레벨 변경\n스케줄러 실행\n다음 실행할 프로세스 선택\nReady 큐에서 프로세스 선택\n새 프로세스 상태 복원\n새 프로세스의 PCB에서 레지스터 복원\n메모리 매핑 변경 (페이지 테이블 교체)\nTLB 플러시 또는 ASID 변경\n사용자 모드 복귀\n새 프로세스 실행 시작\n\n컨텍스트 스위칭은 순수한 오버헤드이므로 최소화가 중요합니다.",
    "references": [
      {
        "title": "Linux Kernel: Context Switching",
        "url": "https://www.kernel.org/doc/html/latest/scheduler/"
      }
    ]
  },
  {
    "id": "OS-036",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "프로세스 컨텍스트 스위칭과 스레드 컨텍스트 스위칭의 차이점은 무엇인가요?",
    "answer": "프로세스 컨텍스트 스위칭 (비용 높음):\nCPU 레지스터 저장/복원\n페이지 테이블 교체 (CR3 레지스터 변경)\nTLB 전체 플러시 필요 (PCID 미사용 시)\n캐시 미스 증가 가능성\n메모리 매핑 정보 변경\n\n스레드 컨텍스트 스위칭 (같은 프로세스 내, 비용 낮음):\nCPU 레지스터 저장/복원\n스택 포인터 변경\n페이지 테이블 유지 (주소 공간 공유)\nTLB 유지 가능\n캐시 히트율 높음\n\n구분   프로세스 스위칭   스레드 스위칭\n\n페이지 테이블   교체 필요   유지\nTLB   플러시   유지\n캐시 효율   낮음   높음\n비용   높음   낮음",
    "references": [
      {
        "title": "Linux Kernel: Thread Switching",
        "url": "https://www.kernel.org/doc/html/latest/scheduler/"
      }
    ]
  },
  {
    "id": "OS-037",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "컨텍스트 스위칭이 발생할 때, 기존의 프로세스 정보는 커널스택에 어떠한 형식으로 저장되나요?",
    "answer": "커널 스택에 저장되는 정보 (스택 프레임 형태):\n\n인터럽트/트랩 발생 시 하드웨어가 자동 저장:\n\n커널이 추가 저장 (ptregs 구조체):\n\n전체 컨텍스트는 PCB(taskstruct)의 thread_struct에 저장되며, 커널 스택은 프로세스마다 별도로 존재합니다.",
    "references": [
      {
        "title": "Linux Kernel: pt_regs structure",
        "url": "https://github.com/torvalds/linux/blob/master/arch/x86/include/asm/ptrace.h"
      }
    ]
  },
  {
    "id": "OS-038",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "컨텍스트 스위칭은 언제 일어날까요?",
    "answer": "컨텍스트 스위칭이 발생하는 경우:\n타이머 인터럽트\n타임 슬라이스(quantum) 만료\n선점형 스케줄링에서 주기적 발생\nI/O 요청\n프로세스가 I/O를 요청하여 Waiting 상태로 전환\n다른 Ready 프로세스에게 CPU 할당\n시스템 콜\n특정 시스템 콜 후 스케줄러 호출\nsleep(), yield() 등\n인터럽트 처리 후\n하드웨어 인터럽트 처리 완료 후\n더 높은 우선순위 프로세스가 Ready 상태가 된 경우\n프로세스 종료/생성\nexit() 호출 시\nfork() 후 자식에게 CPU 할당\n동기화 대기\nmutex, semaphore 획득 실패 시",
    "references": [
      {
        "title": "Linux Kernel: Scheduling Points",
        "url": "https://www.kernel.org/doc/html/latest/scheduler/"
      }
    ]
  },
  {
    "id": "OS-039",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "프로세스 스케줄링 알고리즘에는 어떤 것들이 있나요?",
    "answer": "알고리즘   설명   선점 여부\n\nFCFS (FIFO)   먼저 도착한 순서대로 실행   비선점\nSJF   실행 시간이 짧은 작업 우선   비선점\nSRTF   남은 시간이 짧은 작업 우선   선점\nPriority   우선순위가 높은 작업 우선   둘 다 가능\nRound Robin   타임 슬라이스만큼 순환 실행   선점\nMLQ   여러 큐에 우선순위별 배치   선점\nMLFQ   동적 우선순위 조정   선점\n\nLinux CFS (Completely Fair Scheduler):\n가상 런타임 기반의 공정한 스케줄링\nRed-Black Tree로 프로세스 관리\nO(log n) 복잡도",
    "references": [
      {
        "title": "Linux CFS Scheduler",
        "url": "https://www.kernel.org/doc/html/latest/scheduler/sched-design-CFS.html"
      }
    ]
  },
  {
    "id": "OS-040",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "RR을 사용할 때, Time Slice에 따른 trade-off를 설명해 주세요.",
    "answer": "Time Slice(Quantum)가 너무 작을 때:\n장점: 응답 시간 향상, 대화형 프로세스에 유리\n단점: 컨텍스트 스위칭 오버헤드 증가\n극단적으로 작으면 대부분의 시간을 스위칭에 소비\n\nTime Slice가 너무 클 때:\n장점: 컨텍스트 스위칭 오버헤드 감소\n단점: 응답 시간 증가, FCFS와 유사해짐\n대화형 프로세스의 반응성 저하\n\n적절한 Time Slice 결정 기준:\n컨텍스트 스위칭 시간보다 충분히 커야 함 (보통 10~100ms)\n대화형 시스템: 작은 값 선호 (10~20ms)\n배치 시스템: 큰 값 선호 (100~200ms)\n\n일반적으로 컨텍스트 스위칭 시간의 100배 이상이 적절합니다.",
    "references": [
      {
        "title": "Linux Kernel: Scheduler Tuning",
        "url": "https://www.kernel.org/doc/html/latest/scheduler/sched-design-CFS.html"
      }
    ]
  },
  {
    "id": "OS-041",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "싱글 스레드 CPU 에서 상시로 돌아가야 하는 프로세스가 있다면, 어떤 스케쥴링 알고리즘을 사용하는 것이 좋을까요? 또 왜 그럴까요?",
    "answer": "우선순위 기반 선점 스케줄링 (Priority Preemptive) 또는 실시간 스케줄링 (SCHEDFIFO, SCHEDRR)이 적합합니다.\n\n이유:\n높은 우선순위 부여: 상시 실행 프로세스에 최고 우선순위 할당\n선점 보장: 다른 프로세스가 실행 중이어도 즉시 CPU 획득\n예측 가능한 실행: 응답 시간 보장\n\nLinux 실시간 스케줄링:\n\n주의사항:\n다른 프로세스의 기아(starvation) 가능성\n상시 프로세스가 CPU를 독점하지 않도록 적절한 sleep 필요\nWatchdog 같은 시스템 프로세스에 적합",
    "references": [
      {
        "title": "Linux man-pages: sched(7)",
        "url": "https://man7.org/linux/man-pages/man7/sched.7.html"
      }
    ]
  },
  {
    "id": "OS-042",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "동시성과 병렬성의 차이에 대해 설명해 주세요.",
    "answer": "동시성 (Concurrency):\n여러 작업이 논리적으로 동시에 진행되는 것처럼 보임\n싱글 코어에서도 가능 (시분할, 컨텍스트 스위칭)\n작업들이 번갈아가며 실행\n예: 한 명의 요리사가 여러 요리를 번갈아 진행\n\n병렬성 (Parallelism):\n여러 작업이 물리적으로 동시에 실행\n멀티 코어/프로세서 필요\n실제로 같은 시점에 여러 작업 수행\n예: 여러 요리사가 각자 요리를 동시에 진행\n\n구분   동시성   병렬성\n\n실행   논리적 동시   물리적 동시\n코어   싱글 코어 가능   멀티 코어 필요\n목적   응답성 향상   처리량 향상\n관계   병렬성 포함 가능   동시성 포함",
    "references": [
      {
        "title": "Go Blog: Concurrency is not Parallelism",
        "url": "https://go.dev/blog/waza-talk"
      }
    ]
  },
  {
    "id": "OS-043",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "타 스케쥴러와 비교하여, Multi-level Feedback Queue는 어떤 문제점들을 해결한다고 볼 수 있을까요?",
    "answer": "MLFQ가 해결하는 문제점들:\nSJF의 실행 시간 예측 문제\nSJF는 실행 시간을 미리 알아야 함\nMLFQ는 과거 행동을 기반으로 동적 판단\n우선순위 스케줄링의 기아(Starvation) 문제\n낮은 우선순위 프로세스가 영원히 대기\nMLFQ는 주기적 부스팅(aging)으로 해결\nRR의 응답성 vs 처리량 딜레마\nI/O bound: 높은 우선순위 큐 (짧은 quantum)\nCPU bound: 낮은 우선순위 큐 (긴 quantum)\n프로세스 특성 변화 대응\n프로세스의 I/O/CPU bound 특성이 실행 중 변할 수 있음\n동적으로 큐 이동하여 적응\n\nMLFQ 규칙:\n새 프로세스는 최상위 큐에서 시작\n타임 슬라이스 소진 시 하위 큐로 이동\n주기적으로 모든 프로세스를 최상위로 부스팅",
    "references": [
      {
        "title": "OSTEP: Multi-level Feedback Queue",
        "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf"
      }
    ]
  },
  {
    "id": "OS-044",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "FIFO 스케쥴러는 정말 쓸모가 없는 친구일까요? 어떤 시나리오에 사용하면 좋을까요?",
    "answer": "FIFO(FCFS)가 적합한 시나리오:\n배치 처리 시스템\n야간 배치 작업, 데이터 처리 파이프라인\n응답 시간보다 처리 순서가 중요\n비슷한 실행 시간의 작업들\n모든 작업의 실행 시간이 유사할 때\nConvoy Effect가 발생하지 않음\n실시간 시스템에서 같은 우선순위 작업\nLinux SCHED_FIFO: 같은 우선순위 내에서 FIFO\n선점되지 않는 한 완료까지 실행\n단순함이 중요한 시스템\n구현 및 디버깅이 쉬움\n오버헤드가 거의 없음\n임베디드 시스템, 리소스 제한 환경\n\n장점:\n구현 단순, 오버헤드 최소\n기아 없음 (모든 작업 순서대로 실행)\n예측 가능한 실행 순서",
    "references": [
      {
        "title": "Linux man-pages: SCHED_FIFO",
        "url": "https://man7.org/linux/man-pages/man7/sched.7.html"
      }
    ]
  },
  {
    "id": "OS-045",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "우리는 스케줄링 알고리즘을 \"프로세스\" 스케줄링 알고리즘이라고 부릅니다. 스레드는 다른 방식으로 스케줄링을 하나요?",
    "answer": "Linux에서는 프로세스와 스레드를 동일하게 스케줄링합니다.\n\nLinux 커널은 프로세스와 스레드를 모두 task_struct로 관리하며, 스케줄러 관점에서 동등하게 취급합니다. 스케줄링의 기본 단위는 \"task\"입니다.\n\n스케줄링 모델에 따른 차이:\n\n모델   스케줄링 주체   특징\n\n1:1 (커널 스레드)   커널   Linux 기본, 모든 스레드가 커널에 의해 스케줄링\nN:1 (유저 스레드)   유저 라이브러리   커널은 프로세스만 인식, 라이브러리가 스레드 스케줄링\nM:N (하이브리드)   둘 다   유저/커널 스레드 매핑, Go goroutine 등\n\n현대 Linux(NPTL)는 1:1 모델을 사용하므로, 각 스레드가 독립적인 커널 스케줄링 대상입니다.",
    "references": [
      {
        "title": "Linux NPTL",
        "url": "https://man7.org/linux/man-pages/man7/nptl.7.html"
      }
    ]
  },
  {
    "id": "OS-046",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "유저 스레드와 커널 스레드의 스케쥴링 알고리즘은 똑같을까요?",
    "answer": "다릅니다. 각각 다른 스케줄러에 의해 관리됩니다.\n\n커널 스레드 스케줄링:\nOS 커널의 스케줄러가 담당\nCFS, 실시간 스케줄러 등 사용\n시스템 전체 관점에서 공정성 보장\n하드웨어 타이머 기반 선점\n\n유저 스레드 스케줄링:\n유저 공간 라이브러리/런타임이 담당\n애플리케이션별 맞춤 알고리즘 가능\n협력적(cooperative) 스케줄링이 일반적\n컨텍스트 스위칭 비용 낮음\n\n예시:\nGo goroutine: Go 런타임의 M:N 스케줄러\nJava Virtual Threads: JVM의 협력적 스케줄링\nPython greenlet: 유저 레벨 협력적 스케줄링\n\n유저 스레드의 장점은 커스터마이징과 낮은 오버헤드, 단점은 멀티코어 활용 제한(N:1 모델)입니다.",
    "references": [
      {
        "title": "Go Scheduler Design",
        "url": "https://golang.org/src/runtime/proc.go"
      }
    ]
  },
  {
    "id": "OS-047",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "뮤텍스와 세마포어의 차이점은 무엇인가요?",
    "answer": "구분   뮤텍스 (Mutex)   세마포어 (Semaphore)\n\n값   이진 (0 또는 1)   정수 (0 이상)\n소유권   있음 (lock한 스레드만 unlock 가능)   없음\n용도   상호 배제 (mutual exclusion)   자원 카운팅, 동기화\n해제   소유자만 가능   누구나 가능\n\n뮤텍스:\n한 번에 하나의 스레드만 임계 영역 접근\n잠금을 획득한 스레드만 해제 가능\nPriority Inheritance 지원 가능\n\n세마포어:\nN개의 스레드가 동시 접근 가능 (counting semaphore)\n생산자-소비자 문제 해결에 적합\n신호(signaling) 메커니즘으로 사용 가능",
    "references": [
      {
        "title": "POSIX Threads: pthread_mutex",
        "url": "https://pubs.opengroup.org/onlinepubs/9699919799/functions/pthread_mutex_lock.html"
      }
    ]
  },
  {
    "id": "OS-048",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "이진 세마포어(Binary Semaphore)와 뮤텍스(Mutex)의 차이점을 설명해 주세요.",
    "answer": "둘 다 값이 0 또는 1이지만 중요한 차이가 있습니다.\n\n구분   이진 세마포어   뮤텍스\n\n소유권   없음   있음\n해제   아무나 가능   소유자만 가능\n용도   시그널링, 동기화   상호 배제\nPriority Inheritance   미지원   지원 가능\n재귀 잠금   불가   지원 가능 (recursive mutex)\n\n예시 차이점:\n\n핵심 차이: 뮤텍스는 \"소유권\" 개념이 있어 잠금을 획득한 스레드만 해제할 수 있지만, 이진 세마포어는 다른 스레드가 해제할 수 있습니다.",
    "references": [
      {
        "title": "Linux man-pages: sem_overview",
        "url": "https://man7.org/linux/man-pages/man7/sem_overview.7.html"
      }
    ]
  },
  {
    "id": "OS-049",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Lock을 얻기 위해 대기하는 프로세스들은 Spin Lock 기법을 사용할 수 있습니다. 이 방법의 장단점은 무엇인가요? 단점을 해결할 방법은 없을까요?",
    "answer": "Spin Lock: 락 획득까지 루프를 돌며 계속 확인 (busy waiting)\n\n장점:\n컨텍스트 스위칭 오버헤드 없음\n짧은 대기 시간에 효율적\n구현이 단순함\n멀티코어에서 효과적\n\n단점:\nCPU 자원 낭비 (busy waiting)\n싱글 코어에서 비효율적 (락 소유자 실행 불가)\n대기 시간이 길면 심각한 낭비\nPriority Inversion 문제 가능\n\n해결 방법:\nAdaptive Spin Lock: 일정 횟수 스핀 후 sleep\nHybrid Lock: 짧은 스핀 후 블로킹 대기로 전환\nExponential Backoff: 스핀 간격을 점차 증가\nMCS/CLH Lock: 공정성을 보장하는 큐 기반 스핀락",
    "references": [
      {
        "title": "Linux Kernel: Spinlocks",
        "url": "https://www.kernel.org/doc/html/latest/locking/spinlocks.html"
      }
    ]
  },
  {
    "id": "OS-050",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "뮤텍스와 세마포어 모두 커널이 관리하기 때문에, Lock을 얻고 방출하는 과정에서 시스템 콜을 호출해야 합니다. 이 방법의 장단점이 있을까요? 단점을 해결할 수 있는 방법은 없을까요?",
    "answer": "장점:\n커널이 대기 큐 관리 -> 공정성 보장\n프로세스 간 동기화 가능\n블로킹 대기로 CPU 낭비 없음\n우선순위 상속 등 고급 기능 지원\n\n단점:\n시스템 콜 오버헤드 (모드 전환 비용)\n경쟁이 없는 경우에도 오버헤드 발생\n빈번한 락 사용 시 성능 저하\n\n해결 방법:\nFutex (Fast Userspace Mutex):\n경쟁이 없으면 유저 공간에서만 처리\n경쟁 발생 시에만 커널 호출\nLinux pthread_mutex의 실제 구현\nLock-Free 자료구조:\nCAS 등 원자적 연산 사용\n락 자체를 사용하지 않음\nUser-space Spin Lock:\n짧은 임계 영역에서 효과적\n커널 개입 없음",
    "references": [
      {
        "title": "Linux man-pages: futex(7)",
        "url": "https://man7.org/linux/man-pages/man7/futex.7.html"
      }
    ]
  },
  {
    "id": "OS-051",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Deadlock 에 대해 설명해 주세요.",
    "answer": "교착 상태(Deadlock)는 두 개 이상의 프로세스가 서로 상대방이 점유한 자원을 기다리며 무한히 대기하는 상태입니다.\n\n예시:\n\n특징:\n모든 프로세스가 영원히 진행 불가\n자원 낭비 (점유된 자원 사용 불가)\n외부 개입 없이 해결 불가\n\n실생활 비유:\n좁은 골목에서 두 차가 마주침. 양쪽 다 상대가 빠지기를 기다리며 이동 불가.\n\n데이터베이스에서:\n트랜잭션 A가 row1 잠금, row2 대기\n트랜잭션 B가 row2 잠금, row1 대기",
    "references": [
      {
        "title": "Linux Kernel: Lockdep",
        "url": "https://www.kernel.org/doc/html/latest/locking/lockdep-design.html"
      }
    ]
  },
  {
    "id": "OS-052",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Deadlock이 발생하기 위한 4가지 필요조건에 대해 설명해 주세요.",
    "answer": "교착 상태는 다음 4가지 조건이 모두 충족될 때 발생합니다:\n상호 배제 (Mutual Exclusion)\n자원은 한 번에 하나의 프로세스만 사용 가능\n예: 프린터, 뮤텍스\n점유 대기 (Hold and Wait)\n자원을 점유한 상태에서 다른 자원을 기다림\n하나 이상의 자원을 가진 채로 추가 자원 요청\n비선점 (No Preemption)\n점유된 자원을 강제로 빼앗을 수 없음\n프로세스가 자발적으로 반납해야 함\n순환 대기 (Circular Wait)\n프로세스들이 순환 형태로 자원을 대기\nP1 -> P2 -> P3 -> P1 형태의 대기 사이클\n\n이 4가지 조건이 동시에 성립해야 데드락 발생. 하나라도 깨면 데드락 방지 가능.",
    "references": [
      {
        "title": "Coffman conditions - Operating System Concepts",
        "url": "https://www.os-book.com/"
      }
    ]
  },
  {
    "id": "OS-053",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Deadlock의 4가지 조건 중 3가지만 충족하면 왜 Deadlock이 발생하지 않나요?",
    "answer": "각 조건이 빠졌을 때 데드락이 발생하지 않는 이유:\n\n상호 배제가 없는 경우:\n자원을 동시에 공유 가능\n대기할 필요 없이 모두 접근 가능\n예: 읽기 전용 파일\n\n점유 대기가 없는 경우:\n모든 자원을 한 번에 요청하거나\n자원 요청 전 점유 자원 모두 반납\n순환 대기가 형성될 수 없음\n\n비선점이 없는 경우:\n필요시 다른 프로세스의 자원을 빼앗을 수 있음\n순환 대기를 강제로 깨뜨릴 수 있음\n예: 메모리 페이지 교체\n\n순환 대기가 없는 경우:\n자원에 순서 부여하고 순서대로만 요청\n선형 대기만 존재 -> 사이클 형성 불가\n예: 자원 번호 오름차순으로만 요청\n\n4가지 조건은 필요조건이므로 하나라도 없으면 데드락 불가능.",
    "references": [
      {
        "title": "OSTEP: Deadlock",
        "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf"
      }
    ]
  },
  {
    "id": "OS-054",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Deadlock을 예방하거나 해결하는 방법에는 무엇이 있나요?",
    "answer": "예방 (Prevention) - 4가지 조건 중 하나 제거:\n상호 배제 제거: 가능하면 공유 자원 사용 (실용적이지 않음)\n점유 대기 제거: 모든 자원 한 번에 요청, 또는 자원 없이 요청\n비선점 허용: 자원 선점 가능하게 설계\n순환 대기 제거: 자원에 순서 부여, 오름차순 요청만 허용\n회피 (Avoidance) - 안전 상태 유지:\nBanker's Algorithm: 자원 요청 시 안전 상태 검사\n안전하지 않으면 요청 거부\n탐지 및 복구 (Detection & Recovery):\n주기적으로 자원 할당 그래프 검사\n데드락 발견 시: 프로세스 종료 또는 자원 선점\n무시 (Ostrich Algorithm):\n데드락을 무시하고 발생 시 재시작\n현대 대부분의 OS가 채택 (빈도가 낮고 비용이 높음)",
    "references": [
      {
        "title": "Banker's Algorithm",
        "url": "https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/"
      }
    ]
  },
  {
    "id": "OS-055",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "현대 운영체제(Linux, Windows 등)에서 Deadlock을 적극적으로 처리하지 않는 이유는 무엇인가요?",
    "answer": "현대 OS(Linux, Windows 등)는 Ostrich Algorithm을 채택합니다.\n\n데드락 처리를 하지 않는 이유:\n발생 빈도가 낮음\n대부분의 애플리케이션에서 드물게 발생\n비용 대비 효과가 낮음\n처리 비용이 높음\n탐지: 주기적인 그래프 검사 오버헤드\n예방: 자원 활용률 저하, 기아 가능성\n회피: Banker's Algorithm의 높은 계산 비용\n복구가 어려움\n어떤 프로세스를 종료할지 결정 어려움\n자원 선점 시 일관성 문제\n사용자가 해결 가능\n프로세스 강제 종료\n시스템 재시작\n\n대신 사용하는 방법:\n타임아웃 기반 처리\n애플리케이션 레벨에서 데드락 방지 설계\n데이터베이스: 데드락 탐지 및 트랜잭션 롤백",
    "references": [
      {
        "title": "Operating System Concepts - Silberschatz",
        "url": "https://www.os-book.com/"
      }
    ]
  },
  {
    "id": "OS-056",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Wait Free와 Lock Free를 비교해 주세요.",
    "answer": "둘 다 락 없이 동시성을 보장하는 비차단(non-blocking) 알고리즘입니다.\n\n구분   Lock-Free   Wait-Free\n\n보장   시스템 전체 진행 보장   개별 스레드 진행 보장\n기아   가능   불가능\n구현   상대적으로 쉬움   매우 어려움\n성능   일반적으로 좋음   오버헤드 있을 수 있음\n\nLock-Free:\n최소 하나의 스레드는 항상 진행\n다른 스레드에 의해 지연될 수 있음\nCAS 기반 자료구조에서 흔함\n\nWait-Free:\n모든 스레드가 유한 단계 내 완료 보장\n어떤 스레드도 무한 대기 없음\n실시간 시스템에 적합",
    "references": [
      {
        "title": "The Art of Multiprocessor Programming",
        "url": "https://www.elsevier.com/books/the-art-of-multiprocessor-programming"
      }
    ]
  },
  {
    "id": "OS-057",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "프로그램이 컴파일 되어, 실행되는 과정을 간략하게 설명해 주세요.",
    "answer": "전처리 (Preprocessing)\n매크로 확장 (#define)\n헤더 파일 포함 (#include)\n조건부 컴파일 처리\n출력: .i 파일\n컴파일 (Compilation)\n소스 코드 -> 어셈블리 코드 변환\n문법 검사, 최적화\n출력: .s 파일\n어셈블 (Assembly)\n어셈블리 코드 -> 기계어(오브젝트 코드) 변환\n출력: .o 파일\n링킹 (Linking)\n여러 오브젝트 파일과 라이브러리 결합\n심볼 해결, 주소 결정\n출력: 실행 파일\n로딩 (Loading)\n실행 파일을 메모리에 적재\n주소 재배치 (동적 링킹 시)\n프로세스 생성 및 실행 시작",
    "references": [
      {
        "title": "GCC Compilation Process",
        "url": "https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html"
      }
    ]
  },
  {
    "id": "OS-058",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "링커와, 로더의 차이에 대해 설명해 주세요.",
    "answer": "구분   링커 (Linker)   로더 (Loader)\n\n시점   컴파일 타임   런타임\n입력   오브젝트 파일들 (.o)   실행 파일\n출력   실행 파일   메모리에 적재된 프로세스\n역할   심볼 해결, 파일 결합   메모리 적재, 주소 바인딩\n\n링커의 역할:\n여러 오브젝트 파일을 하나로 결합\n외부 심볼 참조 해결 (함수, 변수)\n라이브러리 연결 (정적/동적)\n재배치 정보 생성\n\n로더의 역할:\n실행 파일을 메모리에 적재\n메모리 주소 할당\n동적 라이브러리 로드 (동적 링킹 시)\n재배치 수행\n프로세스 초기화 및 시작점으로 점프\n\n동적 링커/로더 (ld-linux.so):\n런타임에 공유 라이브러리 로드\n링커와 로더의 역할을 동시에 수행",
    "references": [
      {
        "title": "Linux man-pages: ld-linux(8)",
        "url": "https://man7.org/linux/man-pages/man8/ld-linux.8.html"
      }
    ]
  },
  {
    "id": "OS-059",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "컴파일 언어와 인터프리터 언어의 차이에 대해 설명해 주세요.",
    "answer": "구분   컴파일 언어   인터프리터 언어\n\n변환 시점   실행 전 전체 변환   실행 중 한 줄씩 변환\n실행 속도   빠름   느림\n개발 속도   느림 (컴파일 필요)   빠름 (즉시 실행)\n오류 발견   컴파일 타임   런타임\n이식성   낮음 (플랫폼별 컴파일)   높음\n예시   C, C++, Rust, Go   Python, JavaScript, Ruby\n\n컴파일 언어:\n소스 코드 -> 기계어로 완전 변환\n실행 파일 생성\n최적화 적용 용이\n\n인터프리터 언어:\n실행 시 한 줄씩 해석\n별도 실행 파일 없음\n동적 타이핑, 리플렉션 용이\n\n하이브리드 방식:\nJava: 바이트코드 컴파일 + JVM 인터프리터/JIT\nPython: 바이트코드 컴파일 + PVM 인터프리터",
    "references": [
      {
        "title": "LLVM Documentation",
        "url": "https://llvm.org/docs/"
      }
    ]
  },
  {
    "id": "OS-060",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "JIT에 대해 설명해 주세요.",
    "answer": "JIT (Just-In-Time) 컴파일은 프로그램 실행 중에 바이트코드를 기계어로 컴파일하는 기술입니다.\n\n동작 방식:\n소스 코드 -> 바이트코드 (사전 컴파일)\n실행 시작: 인터프리터로 바이트코드 실행\n핫스팟 탐지: 자주 실행되는 코드 식별\nJIT 컴파일: 핫스팟을 기계어로 컴파일\n이후 해당 코드는 컴파일된 버전 실행\n\n장점:\n인터프리터보다 빠른 실행 속도\n런타임 정보 기반 최적화 가능\n플랫폼 독립성 유지\n\n단점:\n초기 실행 시 워밍업 시간 필요\n메모리 사용량 증가\n컴파일 오버헤드\n\n사용 예시:\nJava HotSpot VM\nJavaScript V8 엔진\n.NET CLR\nPyPy",
    "references": [
      {
        "title": "JVM JIT Compiler",
        "url": "https://docs.oracle.com/en/java/javase/17/vm/java-hotspot-virtual-machine-performance-enhancements.html"
      }
    ]
  },
  {
    "id": "OS-061",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "본인이 사용하는 언어는, 어떤식으로 컴파일 및 실행되는지 설명해 주세요.",
    "answer": "[Java의 경우]\njavac: .java -> .class (바이트코드)\nJVM 로딩: 클래스 로더가 바이트코드 로드\n바이트코드 검증\n인터프리터 실행 + JIT 컴파일 (HotSpot)\nGC가 메모리 관리\n\n[Python의 경우]\n.py -> .pyc (바이트코드, 자동 캐싱)\nPVM(Python Virtual Machine)이 바이트코드 인터프리팅\nGIL(Global Interpreter Lock) 하에서 실행\n\n[C/C++의 경우]\n전처리 -> 컴파일 -> 어셈블 -> 링킹\n네이티브 실행 파일 생성\n로더가 메모리에 적재 후 실행\n\n[JavaScript의 경우]\n파싱: AST 생성\nV8: 바이트코드 생성 (Ignition)\n핫 코드 JIT 컴파일 (TurboFan)\n\n면접 시 본인이 주로 사용하는 언어에 맞게 설명하세요.",
    "references": [
      {
        "title": "JVM Specification",
        "url": "https://docs.oracle.com/javase/specs/jvms/se17/html/"
      }
    ]
  },
  {
    "id": "OS-062",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Python 같은 언어는 CPython, Jython, PyPy등의 다양한 구현체가 있습니다. 각각은 어떤 차이가 있을까요? 또한, 실행되는 과정 또한 다를까요?",
    "answer": "구현체   구현 언어   실행 환경   특징\n\nCPython   C   자체 PVM   기본 구현체, GIL 존재\nJython   Java   JVM   Java 라이브러리 사용 가능\nPyPy   Python   자체   JIT 컴파일, 빠른 속도\nIronPython   C#   .NET CLR   .NET 통합\n\nCPython:\n.py -> 바이트코드(.pyc) -> PVM 인터프리팅\nC 확장 모듈 지원\nGIL로 인한 멀티스레딩 제한\n\nJython:\n.py -> JVM 바이트코드(.class)\nJVM에서 실행\nJava 클래스 직접 사용 가능\nGIL 없음\n\nPyPy:\n.py -> 바이트코드 -> JIT 컴파일\nRPython으로 작성된 인터프리터\nCPython보다 평균 4~5배 빠름\nC 확장 호환성 제한",
    "references": [
      {
        "title": "PyPy Documentation",
        "url": "https://doc.pypy.org/"
      }
    ]
  },
  {
    "id": "OS-063",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "우리는 흔히 fork(), exec() 시스템 콜을 사용하여 프로세스를 적재할 수 있다고 배웠습니다. 로더의 역할은 이 시스템 콜과 상관있는 걸까요? 아니면 다른 방식으로 프로세스를 적재할 수 있는 건가요?",
    "answer": "로더와 시스템 콜의 관계:\n\nexec() 시스템 콜이 로더 역할을 수행합니다.\n\nexec() 호출 시 커널 내부에서:\n실행 파일 포맷 확인 (ELF)\n현재 프로세스의 주소 공간 해제\n새 프로그램의 코드, 데이터 로드\n스택, 힙 초기화\n동적 링커(ld-linux.so) 로드 (필요시)\n프로그램 진입점(entry point)으로 점프\n\nfork()와 exec()의 역할:\nfork(): 프로세스 복제 (메모리 공간 복사)\nexec(): 새 프로그램 로드 (로더 역할)\n\n로더의 구현 위치:\n\n쉘에서 프로그램 실행 시: fork() -> exec() 조합 사용.",
    "references": [
      {
        "title": "Linux man-pages: execve(2)",
        "url": "https://man7.org/linux/man-pages/man2/execve.2.html"
      }
    ]
  },
  {
    "id": "OS-064",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "IPC가 무엇이고, 어떤 종류가 있는지 설명해 주세요.",
    "answer": "IPC (Inter-Process Communication)는 프로세스 간 데이터를 주고받는 메커니즘입니다.\n\n방식   특징   사용 사례\n\nPipe   단방향, 부모-자식 간   쉘 파이프 (\\ )\nNamed Pipe (FIFO)   단방향, 무관계 프로세스   파일 시스템 기반\nMessage Queue   비동기, 메시지 단위   작업 큐\nShared Memory   가장 빠름, 동기화 필요   대용량 데이터 공유\nSemaphore   동기화 도구   자원 접근 제어\nSocket   네트워크 통신 가능   클라이언트-서버\nSignal   비동기 알림   이벤트 통지\nMemory-mapped File   파일 기반 공유 메모리   대용량 파일 처리\n\n선택 기준:\n데이터 크기: 작음(파이프) vs 큼(공유 메모리)\n프로세스 관계: 부모-자식(파이프) vs 무관계(소켓)\n동기/비동기: 동기(파이프) vs 비동기(메시지 큐)",
    "references": [
      {
        "title": "Linux man-pages: ipc(7)",
        "url": "https://man7.org/linux/man-pages/man7/sysvipc.7.html"
      }
    ]
  },
  {
    "id": "OS-065",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Shared Memory가 무엇이며, 사용할 때 유의해야 할 점에 대해 설명해 주세요.",
    "answer": "Shared Memory는 여러 프로세스가 동일한 물리 메모리 영역을 공유하는 IPC 방식입니다.\n\n특징:\n가장 빠른 IPC (커널 개입 최소화)\n데이터 복사 없이 직접 접근\n대용량 데이터 공유에 적합\n\n사용 방법 (POSIX):\n\n유의사항:\n동기화 필수\n여러 프로세스의 동시 접근 -> Race Condition\n세마포어, 뮤텍스로 보호 필요\n메모리 정리\n사용 후 명시적으로 해제 (shm_unlink)\n그렇지 않으면 시스템 재시작까지 유지\n크기 제한\n/proc/sys/kernel/shmmax로 확인\n포인터 주의\n각 프로세스의 가상 주소가 다를 수 있음",
    "references": [
      {
        "title": "Linux man-pages: shm_open(3)",
        "url": "https://man7.org/linux/man-pages/man3/shm_open.3.html"
      }
    ]
  },
  {
    "id": "OS-066",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "IPC에서 메시지 큐(Message Queue)는 단방향 통신만 가능한가요?",
    "answer": "아니요, 메시지 큐는 양방향 통신이 가능합니다.\n\n메시지 큐의 특성:\n하나의 큐로 여러 프로세스가 송수신 가능\n메시지 타입(mtype)으로 선택적 수신 가능\n파이프와 달리 방향 제한 없음\n\n양방향 통신 방법:\n단일 큐 사용:\n메시지 타입으로 구분\n프로세스 A: type 1 송신, type 2 수신\n프로세스 B: type 2 송신, type 1 수신\n두 개의 큐 사용:\n큐 1: A -> B\n큐 2: B -> A\n더 명확한 구조\n\n파이프와의 비교:\n구분   Pipe   Message Queue\n\n방향   단방향   양방향 가능\n데이터   바이트 스트림   메시지 단위\n선택 수신   불가   타입별 가능\n수명   프로세스 종료 시   명시적 삭제까지",
    "references": [
      {
        "title": "Linux man-pages: mq_overview(7)",
        "url": "https://man7.org/linux/man-pages/man7/mq_overview.7.html"
      }
    ]
  },
  {
    "id": "OS-067",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Thread Safe 하다는 것은 어떤 의미인가요?",
    "answer": "Thread Safe란 여러 스레드가 동시에 접근해도 프로그램이 올바르게 동작하는 것을 의미합니다.\n\nThread Safe 조건:\n공유 데이터 접근 시 올바른 결과 보장\nRace Condition 없음\n데이터 일관성 유지\n데드락 없음\n\nThread Safe가 아닌 예시:\n\nThread Safe 구현 방법:\n상호 배제: 뮤텍스, 세마포어\n원자적 연산: atomic 변수\n불변 객체: 상태 변경 불가\nThread Local Storage: 스레드별 데이터\nLock-Free 자료구조: CAS 기반\n\nThread Safe한 코드는 멀티스레드 환경에서 안전하게 호출할 수 있습니다.",
    "references": [
      {
        "title": "POSIX Thread Safety",
        "url": "https://pubs.opengroup.org/onlinepubs/9699919799/functions/V2_chap02.html"
      }
    ]
  },
  {
    "id": "OS-068",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Thread Safe를 보장하기 위해 어떤 방법들을 사용할 수 있나요?",
    "answer": "상호 배제 (Mutual Exclusion)\n원자적 연산 (Atomic Operations)\nThread Local Storage (TLS)\n불변 객체 (Immutable Objects)\n생성 후 상태 변경 불가\n공유해도 안전\n읽기-쓰기 락 (Read-Write Lock)\n조건 변수 (Condition Variable)\n특정 조건까지 대기/통지\nLock-Free 자료구조\nCAS 기반 구현\n락 없이 동시성 보장\n\n선택 기준: 성능 vs 구현 복잡도 트레이드오프",
    "references": [
      {
        "title": "C11 Atomic Operations",
        "url": "https://en.cppreference.com/w/c/atomic"
      }
    ]
  },
  {
    "id": "OS-069",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Peterson's Algorithm 이 무엇이며, 한계점에 대해 설명해 주세요.",
    "answer": "Peterson's Algorithm은 두 프로세스 간 상호 배제를 소프트웨어적으로 구현한 알고리즘입니다.\n\n특징:\n상호 배제, 진행, 한정 대기 모두 만족\n하드웨어 지원 없이 구현\n\n한계점:\n두 프로세스만 가능\nN개로 확장하려면 복잡해짐 (Bakery Algorithm)\nBusy Waiting\nwhile 루프로 CPU 낭비\n현대 CPU에서 동작 안 함\n컴파일러/CPU의 명령어 재배치 (out-of-order)\n메모리 가시성 문제\nMemory Barrier 필요\n캐시 일관성 문제\n멀티코어에서 캐시 동기화 필요",
    "references": [
      {
        "title": "Peterson's Algorithm - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Peterson%27s_algorithm"
      }
    ]
  },
  {
    "id": "OS-070",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Race Condition 이 무엇인가요?",
    "answer": "Race Condition은 여러 스레드/프로세스가 공유 자원에 동시 접근할 때, 실행 순서에 따라 결과가 달라지는 상황입니다.\n\n예시:\n\n발생 조건:\n공유 자원 존재\n동시 접근 가능\n최소 하나의 쓰기 연산\n동기화 부재\n\n유형:\nRead-Modify-Write: 위 예시\nCheck-Then-Act: if 체크 후 동작 사이 변경\nTOCTOU: Time of Check to Time of Use\n\n해결: 원자적 연산, 락, 동기화 메커니즘",
    "references": [
      {
        "title": "CWE-362: Race Condition",
        "url": "https://cwe.mitre.org/data/definitions/362.html"
      }
    ]
  },
  {
    "id": "OS-071",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Thread Safe를 구현하기 위해 반드시 락을 사용해야 하나요? 락 없이 Thread Safe를 구현하는 방법이 있다면 설명해 주세요.",
    "answer": "아니요, 락 없이도 Thread Safe를 구현할 수 있습니다.\n\n락 없는 방법들:\n원자적 연산 (Atomic Operations)\nLock-Free 자료구조\n불변 객체 (Immutable)\n생성 후 상태 변경 불가\n읽기만 하므로 동기화 불필요\nThread Local Storage\n메시지 패싱\n공유 상태 대신 메시지로 통신\nActor 모델, CSP\nCopy-on-Write\n쓰기 시에만 복사본 생성\n읽기는 동시 접근 허용\n\n선택 기준: 복잡도, 성능, 확장성 고려",
    "references": [
      {
        "title": "Lock-Free Programming",
        "url": "https://www.1024cores.net/home/lock-free-algorithms"
      }
    ]
  },
  {
    "id": "OS-072",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Thread Pool, Monitor, Fork-Join에 대해 설명해 주세요.",
    "answer": "Thread Pool:\n미리 생성된 스레드 집합\n작업 큐에서 작업을 가져와 처리\n스레드 생성/소멸 오버헤드 감소\n동시 스레드 수 제한 가능\n\nMonitor:\n상호 배제와 조건 동기화를 결합한 고수준 동기화 도구\n하나의 스레드만 모니터 내부 코드 실행\nwait(), notify(), notifyAll() 제공\nJava의 synchronized 블록이 모니터 구현\n\nFork-Join:\n분할 정복 병렬 처리 프레임워크\nFork: 작업을 작은 단위로 분할\nJoin: 결과를 합침\nWork-Stealing으로 부하 분산",
    "references": [
      {
        "title": "Java Concurrency Utilities",
        "url": "https://docs.oracle.com/javase/tutorial/essential/concurrency/"
      }
    ]
  },
  {
    "id": "OS-073",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Thread Pool의 스레드 수는 어떤 기준으로 결정하나요?",
    "answer": "작업 유형에 따른 스레드 수 결정:\n\nCPU Bound 작업:\nCPU를 최대한 활용\n너무 많으면 컨텍스트 스위칭 오버헤드\n\nI/O Bound 작업:\nI/O 대기 중 다른 스레드 실행\n대기 시간이 길수록 더 많은 스레드\n\n혼합 작업:\n\n실무 가이드라인:\n시작: 코어 수의 2배로 시작\n측정: 실제 부하 테스트로 튜닝\n모니터링: CPU 사용률, 큐 대기 시간 확인\n동적 조정: 자동 스케일링 고려\n\n주의사항:\n메모리: 스레드당 스택 메모리 (기본 1MB)\n연결 풀: DB 연결 수 제한 고려",
    "references": [
      {
        "title": "Java Concurrency in Practice",
        "url": "https://jcip.net/"
      }
    ]
  },
  {
    "id": "OS-074",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "어떤 데이터를 정렬 하려고 합니다. 어떤 방식의 전략을 사용하는 것이 가장 안전하면서도 좋은 성능을 낼 수 있을까요?",
    "answer": "Fork-Join 패턴을 활용한 병렬 정렬이 안전하고 효율적입니다.\n\n권장 전략: 병렬 Merge Sort\n\n안전한 이유:\n공유 상태 최소화: 분할된 영역만 처리\n경쟁 조건 없음: 각 스레드가 독립적인 영역 담당\n락 불필요: 데이터 분할로 동기화 필요 없음\n\n성능 최적화:\n적절한 THRESHOLD 설정 (1000~10000)\nWork-Stealing으로 부하 균형\n캐시 지역성 고려\n\n대안:\nJava: Arrays.parallelSort()\nC++: std::sort with parallel execution policy",
    "references": [
      {
        "title": "Java ForkJoinPool",
        "url": "https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ForkJoinPool.html"
      }
    ]
  },
  {
    "id": "OS-075",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "캐시 메모리 및 메모리 계층성에 대해 설명해 주세요.",
    "answer": "메모리 계층 구조 (위로 갈수록 빠르고 비쌈):\n\n계층   용량   속도   예시\n\n레지스터   ~KB   ~1ns   CPU 내부\nL1 캐시   32-64KB   ~1-2ns   코어당\nL2 캐시   256KB-1MB   ~3-10ns   코어당\nL3 캐시   8-32MB   ~10-20ns   공유\n메인 메모리   GB   ~50-100ns   DRAM\nSSD   TB   ~100us   플래시\nHDD   TB   ~10ms   자기 디스크\n\n캐시 메모리:\nCPU와 메인 메모리 사이의 고속 버퍼\n자주 사용하는 데이터를 임시 저장\n메모리 접근 지연 시간 단축\n\n작동 원리:\n지역성(Locality) 원리 활용\n캐시 히트: 데이터가 캐시에 있음 (빠름)\n캐시 미스: 메인 메모리에서 가져옴 (느림)",
    "references": [
      {
        "title": "Intel Optimization Manual",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "OS-076",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "캐시 메모리(L1, L2, L3)는 물리적으로 어디에 위치해 있나요?",
    "answer": "캐시 메모리는 CPU 칩 내부에 위치합니다.\n\n물리적 위치:\n\n캐시별 위치:\nL1 캐시: 각 코어 내부, 가장 가까움\nL1I (명령어 캐시)\nL1D (데이터 캐시)\nL2 캐시: 각 코어에 전용 (또는 두 코어 공유)\nL3 캐시: 모든 코어가 공유 (Last Level Cache)\n\nSRAM(Static RAM)으로 구현되어 DRAM보다 빠르지만 비쌈.",
    "references": [
      {
        "title": "CPU Cache Architecture",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "OS-077",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "L1 캐시와 L2 캐시의 특징과 차이점을 설명해 주세요.",
    "answer": "L1 캐시 (Level 1):\n위치: 각 CPU 코어 내부\n크기: 32-64KB (명령어/데이터 각각)\n속도: 1-2 사이클 (가장 빠름)\n구조:\nL1I (Instruction): 명령어 캐시\nL1D (Data): 데이터 캐시\n특징: Split cache (분리 캐시)\n\nL2 캐시 (Level 2):\n위치: 각 코어에 전용 (현대 CPU)\n크기: 256KB - 1MB\n속도: 3-10 사이클\n구조: Unified (명령어+데이터 통합)\n특징: L1 미스 시 참조\n\nL1 vs L2 비교:\n\n항목   L1   L2\n\n용량   작음   큼\n속도   빠름   느림\n히트율   ~95%   ~80%\n연관도   낮음 (8-way)   높음 (16-way)\n\nL1 미스 -> L2 확인 -> L2 미스 -> L3 확인 -> 메인 메모리",
    "references": [
      {
        "title": "Intel Architecture Optimization",
        "url": "https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html"
      }
    ]
  },
  {
    "id": "OS-078",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "캐시에 저장되는 데이터는 어떻게 관리되나요? (캐시 라인, 쓰기 정책, 교체 정책 등)",
    "answer": "캐시 라인 단위로 관리됩니다 (보통 64바이트).\n\n캐시 라인 구조:\n\n캐시 관리 요소:\n태그 (Tag): 메모리 주소 식별\n유효 비트 (Valid bit): 데이터 유효 여부\n더티 비트 (Dirty bit): 수정 여부 (Write-Back용)\nLRU 비트: 교체 정책용\n\n쓰기 정책:\n\n정책   설명\n\nWrite-Through   캐시와 메모리에 동시 기록, 일관성 좋음\nWrite-Back   캐시에만 기록, 교체 시 메모리 기록, 성능 좋음\n\n교체 정책:\nLRU: 가장 오래 사용 안 한 라인 교체\nFIFO: 가장 오래된 라인 교체\nRandom: 무작위 선택\n\n할당 정책:\nWrite-Allocate: 쓰기 미스 시 캐시에 할당\nNo-Write-Allocate: 메모리에만 기록",
    "references": [
      {
        "title": "Computer Architecture: Cache Design",
        "url": "https://csapp.cs.cmu.edu/"
      }
    ]
  },
  {
    "id": "OS-079",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "멀티코어 환경에서 각 코어의 캐시 간 동기화(캐시 일관성)는 어떻게 이루어지나요?",
    "answer": "캐시 일관성 프로토콜을 통해 동기화됩니다.\n\nMESI 프로토콜 (가장 널리 사용):\n\n상태   설명\n\nM (Modified)   수정됨, 이 캐시만 최신, 메모리와 불일치\nE (Exclusive)   독점, 이 캐시만 가지고 있음, 메모리와 일치\nS (Shared)   공유, 다른 캐시에도 있음, 읽기만 가능\nI (Invalid)   무효, 사용 불가\n\n동작 방식:\n코어 A가 데이터 수정 (M 상태)\n코어 B가 같은 데이터 읽기 시도\n스누핑: B의 요청을 A가 감지\nA가 데이터를 B에게 전달, 둘 다 S 상태로 전환\n필요시 메모리 업데이트\n\n캐시 일관성 유지 방법:\n스누핑 (Snooping): 버스 모니터링 (작은 시스템)\n디렉토리 기반: 중앙 디렉토리 관리 (대규모 시스템)",
    "references": [
      {
        "title": "Intel Cache Coherency",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "OS-080",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "캐시 메모리의 Mapping 방식에 대해 설명해 주세요.",
    "answer": "직접 매핑 (Direct Mapping)\n각 메모리 블록은 정해진 캐시 위치에만 저장\n구현 단순, 충돌 미스 많음\n완전 연관 매핑 (Fully Associative)\n메모리 블록이 캐시의 어느 위치에나 저장 가능\n충돌 미스 최소, 검색 비용 높음 (모든 라인 비교)\n하드웨어 비용 높음\n집합 연관 매핑 (Set Associative)\nN-way set associative: 각 집합에 N개 라인\n직접 매핑과 완전 연관의 절충\n현대 CPU에서 주로 사용 (8-way, 16-way)\n\n방식   장점   단점\n\n직접   단순, 빠름   충돌 많음\n완전 연관   충돌 적음   비용 높음\n집합 연관   균형   적절한 복잡도",
    "references": [
      {
        "title": "Cache Organization",
        "url": "https://csapp.cs.cmu.edu/"
      }
    ]
  },
  {
    "id": "OS-081",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "캐시의 지역성에 대해 설명해 주세요.",
    "answer": "지역성 (Locality)은 프로그램이 메모리에 접근하는 패턴의 특성입니다.\n시간적 지역성 (Temporal Locality)\n최근 접근한 데이터는 곧 다시 접근될 가능성 높음\n예: 루프 변수, 자주 호출되는 함수\n공간적 지역성 (Spatial Locality)\n접근한 주소 근처의 데이터도 곧 접근될 가능성 높음\n예: 배열 순차 접근, 구조체 멤버 접근\n\n캐시가 지역성을 활용하는 방법:\n시간적 지역성: 접근한 데이터를 캐시에 유지\n공간적 지역성: 캐시 라인 단위(64B)로 가져옴\n\n지역성이 좋은 코드 작성 원칙:\n배열은 순차적으로 접근\n자주 함께 사용하는 데이터는 가깝게 배치",
    "references": [
      {
        "title": "Locality of Reference",
        "url": "https://csapp.cs.cmu.edu/"
      }
    ]
  },
  {
    "id": "OS-082",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "이차원 배열을 행 우선(가로)으로 탐색할 때와 열 우선(세로)으로 탐색할 때의 성능 차이를 캐시 지역성 관점에서 설명해 주세요.",
    "answer": "행 우선(가로) 탐색이 훨씬 빠릅니다.\n\n메모리 레이아웃 (C/C++ 행 우선):\n\n행 우선 탐색 (좋음):\n캐시 라인(64B)에 여러 요소 포함\n높은 캐시 히트율\n공간적 지역성 최대 활용\n\n열 우선 탐색 (나쁨):\n매 접근마다 캐시 미스 가능\n캐시 라인 낭비\n성능 10~100배 차이 가능\n\n성능 차이 원인:\n행: stride-1 접근 (연속)\n열: stride-N 접근 (불연속, 캐시 라인 건너뜀)",
    "references": [
      {
        "title": "Memory Access Patterns",
        "url": "https://csapp.cs.cmu.edu/"
      }
    ]
  },
  {
    "id": "OS-083",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "캐시의 공간 지역성은 하드웨어에서 어떻게 구현되나요?",
    "answer": "캐시 라인(Cache Line) 단위 저장으로 공간 지역성을 구현합니다.\n\n캐시 라인:\n일반적으로 64바이트 (현대 CPU)\n데이터 접근 시 해당 바이트뿐 아니라 전체 캐시 라인을 가져옴\n\n공간 지역성 구현 원리:\n\n예시:\n\n하드웨어 프리페칭:\nCPU가 접근 패턴 감지\n다음 캐시 라인을 미리 로드\n순차 접근 패턴에서 효과적",
    "references": [
      {
        "title": "Intel Prefetch",
        "url": "https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html"
      }
    ]
  },
  {
    "id": "OS-084",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "연속할당 방식 세 가지를 설명해주세요. (first-fit, best-fit, worst-fit)",
    "answer": "가용 메모리 공간(hole)에서 프로세스를 할당할 위치를 결정하는 알고리즘입니다.\n\nFirst-Fit (최초 적합):\n충분한 크기의 첫 번째 가용 공간에 할당\n장점: 탐색 시간 짧음\n단점: 앞쪽에 단편화 집중\n\nBest-Fit (최적 적합):\n요청 크기에 가장 근접한 가용 공간에 할당\n장점: 메모리 낭비 최소화\n단점: 전체 탐색 필요, 작은 조각 많이 생성\n\nWorst-Fit (최악 적합):\n가장 큰 가용 공간에 할당\n장점: 큰 남은 공간 유지\n단점: 전체 탐색 필요, 큰 프로세스 할당 어려움\n\n알고리즘   탐색 시간   메모리 활용   단편화\n\nFirst-Fit   O(n) 최선   보통   앞쪽 집중\nBest-Fit   O(n)   좋음   작은 조각\nWorst-Fit   O(n)   나쁨   큰 조각",
    "references": [
      {
        "title": "Operating System Concepts - Memory Management",
        "url": "https://www.os-book.com/"
      }
    ]
  },
  {
    "id": "OS-085",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Worst-fit 방식이 유용한 상황이 있나요? 있다면 어떤 경우인가요?",
    "answer": "Worst-Fit이 유용한 상황:\n중간 크기 할당 요청이 많을 때\n큰 hole에서 할당 후에도 충분한 공간 남음\n남은 공간이 다음 요청 수용 가능\n작은 단편화 조각을 피하고 싶을 때\nBest-Fit은 딱 맞는 공간 찾아 작은 조각 생성\nWorst-Fit은 큰 공간 유지로 작은 조각 감소\n할당 크기가 균일할 때\n비슷한 크기의 요청이 반복되면\n큰 공간을 균등하게 분할 가능\n\n실제로는 거의 사용되지 않는 이유:\n큰 프로세스 할당 시 공간 부족\nBest-Fit이나 First-Fit보다 일반적으로 성능 낮음\n시뮬레이션에서 평균 성능 최하위\n\n실무에서:\nglibc malloc: 다양한 전략 조합\nBuddy System, Slab Allocator 등 다른 방식 사용",
    "references": [
      {
        "title": "Memory Allocation Strategies",
        "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-freespace.pdf"
      }
    ]
  },
  {
    "id": "OS-086",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "First-fit, Best-fit, Worst-fit 중 일반적으로 성능이 가장 좋은 알고리즘은 무엇인가요?",
    "answer": "일반적으로 First-Fit이 가장 좋은 성능을 보입니다.\n\n시뮬레이션 연구 결과:\nFirst-Fit과 Best-Fit은 비슷한 메모리 활용률\nFirst-Fit은 탐색 시간이 짧아 전체 성능 우수\nWorst-Fit은 대체로 가장 낮은 성능\n\nFirst-Fit의 장점:\n빠른 할당: 첫 번째 적합 공간에서 중단\n단순한 구현: 복잡한 비교 불필요\n합리적인 메모리 활용: Best-Fit과 큰 차이 없음\n\n그러나 \"최고\"는 상황에 따라 다름:\n\n상황   권장 알고리즘\n\n다양한 크기 요청   First-Fit\n메모리 절약 중요   Best-Fit\n실시간 시스템   First-Fit (예측 가능)\n\n현대 시스템:\n단순 연속 할당은 잘 사용하지 않음\n페이징으로 외부 단편화 해결\nSlab, Buddy 등 전문 할당자 사용",
    "references": [
      {
        "title": "OSTEP: Free Space Management",
        "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-freespace.pdf"
      }
    ]
  },
  {
    "id": "OS-087",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Thrashing 이란 무엇인가요?",
    "answer": "Thrashing은 시스템이 실제 작업보다 페이지 스왑에 더 많은 시간을 소비하는 상태입니다.\n\n발생 과정:\n메모리 부족 -> 페이지 폴트 증가\n페이지 교체 빈번 -> I/O 대기 증가\nCPU 사용률 감소 -> OS가 더 많은 프로세스 실행\n메모리 경쟁 심화 -> 더 많은 페이지 폴트\n악순환 반복 -> 시스템 거의 멈춤\n\n증상:\n높은 페이지 폴트율\n높은 디스크 I/O\n낮은 CPU 사용률\n시스템 응답 없음\n\n원인:\n물리 메모리 부족\n너무 많은 프로세스 실행\nWorking Set이 메모리보다 큼\n잘못된 페이지 교체 알고리즘\n\n지표:\nPFF(Page Fault Frequency) 급증\n스왑 I/O 급증",
    "references": [
      {
        "title": "Linux Kernel: Memory Overcommit",
        "url": "https://www.kernel.org/doc/html/latest/admin-guide/mm/overcommit-accounting.html"
      }
    ]
  },
  {
    "id": "OS-088",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Thrashing이 발생했을 때 어떻게 완화할 수 있나요?",
    "answer": "즉각적 대응:\n프로세스 수 감소\n일부 프로세스 중단 (suspend)\n스왑 아웃으로 메모리 확보\n메모리 추가\n물리 메모리 확장\n스왑 공간 확대 (임시 방편)\n\n시스템 레벨 해결책:\nWorking Set 모델\n각 프로세스의 Working Set 크기 추적\nWorking Set을 수용할 수 없으면 프로세스 중단\n지역성 원리 활용\nPFF (Page Fault Frequency) 알고리즘\n페이지 폴트 빈도 모니터링\n높으면: 프레임 추가 할당\n낮으면: 프레임 회수\n프로세스 우선순위 조정\n중요 프로세스에 메모리 우선 할당\n\nLinux 대응책:\nOOM Killer: 메모리 최다 사용 프로세스 종료\nswappiness 조정: 스왑 사용 빈도 제어\ncgroups: 프로세스별 메모리 제한",
    "references": [
      {
        "title": "Linux OOM Killer",
        "url": "https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html"
      }
    ]
  },
  {
    "id": "OS-089",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "가상 메모리란 무엇인가요?",
    "answer": "가상 메모리는 각 프로세스에게 독립적이고 격리된 주소 공간을 제공하는 메모리 관리 기법입니다.\n\n핵심 목적 (우선순위 순):\n프로세스 격리 (Isolation): 각 프로세스가 독립적인 주소 공간을 가져 다른 프로세스의 메모리에 접근 불가\n메모리 보호 (Protection): 커널 영역 보호, 읽기/쓰기/실행 권한 제어\n주소 공간 추상화: 프로세스는 물리 메모리 레이아웃을 알 필요 없이 연속된 주소 공간 사용\n효율적 메모리 관리: Demand Paging, Copy-on-Write, 공유 라이브러리 등 가능\n\n부가적 이점:\n물리 메모리보다 큰 주소 공간 제공 (스왑 활용)\n메모리 맵 파일, 공유 메모리 등 고급 기능 지원\n\n> 주의: \"더 큰 메모리를 사용하기 위함\"은 가상 메모리의 부가적 이점이지, 핵심 목적이 아닙니다. 스왑 없이도 가상 메모리는 프로세스 격리와 보호를 위해 필수적입니다.\n\n동작 원리:\n각 프로세스는 독립적인 가상 주소 공간 사용\nMMU가 가상 주소 -> 물리 주소 변환\n페이지 테이블로 매핑 관리\n필요한 부분만 물리 메모리에 로드 (Demand Paging)\n\n구성 요소:\n페이지 테이블: 가상-물리 주소 매핑 및 권한 정보\nMMU: 하드웨어 주소 변환 및 보호 검사\nTLB: 주소 변환 캐시",
    "references": [
      {
        "title": "Linux Virtual Memory",
        "url": "https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html"
      }
    ]
  },
  {
    "id": "OS-090",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "가상 메모리가 가능한 이유(원리)는 무엇인가요?",
    "answer": "가상 메모리는 하드웨어(MMU)와 소프트웨어(OS)의 협력으로 가능합니다.\n\n핵심 기술적 기반:\nMMU (Memory Management Unit)\nCPU 내장 하드웨어로 주소 변환 수행\n가상 주소 -> 물리 주소 변환을 매 메모리 접근마다 처리\n페이지 테이블 참조 및 권한 검사\n페이지 테이블\n프로세스별 가상-물리 주소 매핑 정보 저장\nValid bit, 권한 비트 등 보호 정보 포함\nOS의 메모리 관리\n페이지 테이블 생성 및 관리\n페이지 폴트 핸들러로 필요 시 페이지 로드\n프로세스 간 격리 보장\n\nDemand Paging이 효율적인 이유 - 지역성 원리:\n\n가상 메모리의 \"필요한 부분만 로드\" 기능이 효율적인 이유는 지역성 원리(Locality of Reference) 때문입니다:\n프로그램은 특정 시간에 일부 코드/데이터만 집중적으로 사용\nWorking Set: 특정 시점에 필요한 페이지 집합이 전체보다 훨씬 작음\n\n> 구분: 가상 메모리는 MMU 하드웨어로 \"가능\"하고, 지역성 원리 덕분에 \"효율적\"입니다.",
    "references": [
      {
        "title": "OSTEP: Beyond Physical Memory",
        "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys.pdf"
      }
    ]
  },
  {
    "id": "OS-091",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Page Fault가 발생했을 때 처리 과정을 설명해 주세요.",
    "answer": "Page Fault 처리 과정:\n페이지 폴트 발생\nCPU가 가상 주소 접근 시도\nMMU가 페이지 테이블 확인\nValid bit = 0 (메모리에 없음) -> 트랩 발생\n커널 모드 전환\n페이지 폴트 핸들러 실행\n프로세스 상태 저장\n주소 유효성 검사\n유효한 가상 주소인가?\n접근 권한이 있는가?\n불법 접근이면 -> Segmentation Fault\n빈 프레임 확보\nFree frame list에서 할당\n없으면 페이지 교체 알고리즘 실행\n페이지 로드\n디스크(스왑)에서 해당 페이지 읽기\n빈 프레임에 적재 (I/O 작업)\n페이지 테이블 업데이트\nValid bit = 1로 설정\n프레임 번호 기록\n프로세스 재개\n폴트 발생 명령어부터 다시 실행",
    "references": [
      {
        "title": "Linux Page Fault Handler",
        "url": "https://www.kernel.org/doc/html/latest/admin-guide/mm/"
      }
    ]
  },
  {
    "id": "OS-092",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "페이지 크기에 대한 Trade-Off를 설명해 주세요.",
    "answer": "작은 페이지 크기:\n장점   단점\n\n내부 단편화 감소   페이지 테이블 크기 증가\n메모리 세밀한 관리   페이지 폴트 빈번\nWorking Set 정확히 반영   TLB 미스 증가\n\n큰 페이지 크기:\n장점   단점\n\n페이지 테이블 크기 감소   내부 단편화 증가\nTLB 히트율 향상   메모리 낭비\nI/O 효율 증가   공유 어려움\n페이지 폴트 감소\n\n일반적인 페이지 크기:\nx86: 4KB (기본), 2MB/1GB (Huge Pages)\nARM: 4KB, 16KB, 64KB\n\nHuge Pages 사용 사례:\n대용량 데이터베이스\n가상화 환경\n메모리 집약적 애플리케이션",
    "references": [
      {
        "title": "Linux Huge Pages",
        "url": "https://www.kernel.org/doc/html/latest/admin-guide/mm/hugetlbpage.html"
      }
    ]
  },
  {
    "id": "OS-093",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "페이지 크기가 커지면 페이지 폴트가 더 많이 발생하나요, 아니면 감소하나요?",
    "answer": "아니요, 일반적으로 페이지 크기가 커지면 페이지 폴트가 감소합니다.\n\n페이지 폴트 감소 이유:\n한 번의 폴트로 더 많은 데이터 로드\n공간적 지역성 활용 증가\n프리페칭 효과 자연 발생\n\n예시:\n\n그러나 예외 상황:\n희소한 접근 패턴: 큰 페이지에서 일부만 사용\n메모리 압박: 큰 페이지는 교체 시 더 많은 데이터 스왑\nWorking Set 초과: 큰 페이지로 가용 프레임 수 감소\n\n결론:\n지역성이 좋은 접근: 큰 페이지 유리 (폴트 감소)\n무작위 접근: 큰 페이지가 불리할 수 있음",
    "references": [
      {
        "title": "Page Size and Performance",
        "url": "https://www.kernel.org/doc/html/latest/admin-guide/mm/"
      }
    ]
  },
  {
    "id": "OS-094",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "세그멘테이션 방식을 사용하고 있다면, 가상 메모리를 사용할 수 없을까요?",
    "answer": "사용할 수 있습니다. 세그멘테이션에서도 가상 메모리 구현이 가능합니다.\n\n세그멘테이션 기반 가상 메모리:\n세그먼트 단위로 스왑 인/아웃\n세그먼트 테이블에 present bit 추가\n메모리에 없는 세그먼트 접근 시 폴트 발생\n\n단점:\n세그먼트 크기가 가변적 -> 스왑 공간 관리 복잡\n외부 단편화 발생\n큰 세그먼트는 스왑 비용 높음\n\n페이지드 세그멘테이션 (Paged Segmentation):\n세그멘테이션 + 페이징 결합\n논리적으로 세그먼트 분리\n물리적으로 페이지 단위 관리\n외부 단편화 해결\n\n현대 시스템:\nx86-64: 세그멘테이션 거의 사용 안 함 (flat memory model)\n페이징이 표준\n보호 기능만 세그멘테이션 활용",
    "references": [
      {
        "title": "Intel Segmentation",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "OS-095",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "세그멘테이션과 페이징의 차이점은 무엇인가요?",
    "answer": "구분   세그멘테이션   페이징\n\n분할 단위   가변 크기 (논리적 단위)   고정 크기 (물리적 단위)\n사용자 관점   인식함 (코드, 데이터, 스택)   투명함\n주소 구조   세그먼트 번호 + 오프셋   페이지 번호 + 오프셋\n단편화   외부 단편화   내부 단편화\n보호   세그먼트별 권한 설정 용이   페이지별 권한 설정\n공유   논리적 단위로 공유   페이지 단위로 공유\n\n세그멘테이션:\n\n페이징:\n\n현대 시스템:\n페이징이 주류 (외부 단편화 없음)\n세그멘테이션은 보호 목적으로만 사용\nx86-64: 사실상 순수 페이징",
    "references": [
      {
        "title": "OSTEP: Segmentation",
        "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-segmentation.pdf"
      }
    ]
  },
  {
    "id": "OS-096",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "페이지와 프레임의 차이에 대해 설명해 주세요.",
    "answer": "페이지 (Page):\n가상 메모리의 고정 크기 블록\n논리적 주소 공간의 단위\n프로세스 관점의 메모리 블록\n연속적인 가상 주소\n\n프레임 (Frame):\n물리 메모리의 고정 크기 블록\n물리적 주소 공간의 단위\n실제 RAM의 메모리 블록\n연속적인 물리 주소\n\n관계:\n\n특징:\n페이지와 프레임은 같은 크기 (보통 4KB)\n페이지 테이블: 페이지 -> 프레임 매핑\n연속 페이지가 연속 프레임에 매핑될 필요 없음\n이로 인해 외부 단편화 없음",
    "references": [
      {
        "title": "OSTEP: Paging",
        "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-paging.pdf"
      }
    ]
  },
  {
    "id": "OS-097",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "내부 단편화와, 외부 단편화에 대해 설명해 주세요.",
    "answer": "내부 단편화 (Internal Fragmentation):\n할당된 메모리 블록 내부에 사용되지 않는 공간\n고정 크기 할당에서 발생\n예: 4KB 페이지에 3KB만 사용 -> 1KB 낭비\n\n외부 단편화 (External Fragmentation):\n메모리 외부에 흩어진 작은 빈 공간들\n가변 크기 할당에서 발생\n총 가용 공간은 충분하나 연속 공간 부족\n\n구분   발생 위치   원인   해결\n\n내부   블록 안   고정 크기 할당   작은 블록 사용\n외부   블록 사이   가변 크기 할당   페이징, 압축\n\n페이징: 외부 단편화 해결, 내부 단편화 존재\n세그멘테이션: 내부 단편화 없음, 외부 단편화 존재",
    "references": [
      {
        "title": "Memory Fragmentation",
        "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-freespace.pdf"
      }
    ]
  },
  {
    "id": "OS-098",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "가상 주소에서 물리 주소를 얻는 주소 변환 과정을 설명해 주세요.",
    "answer": "가상 주소 -> 물리 주소 변환 과정:\n\n변환 단계:\n가상 주소 분리: 페이지 번호 + 오프셋\n페이지 테이블 참조: PTBR + 페이지 번호 * 엔트리 크기\n유효성 검사: Valid bit 확인 (0이면 Page Fault)\n프레임 번호 획득: 페이지 테이블 엔트리에서\n물리 주소 조합: 프레임 번호 + 오프셋\n\n예시 (4KB 페이지, 가상 주소 0x12345678):",
    "references": [
      {
        "title": "x86 Paging",
        "url": "https://wiki.osdev.org/Paging"
      }
    ]
  },
  {
    "id": "OS-099",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "특정 메모리 주소공간이 수정 가능한지(쓰기 권한이 있는지) 어떻게 확인할 수 있나요?",
    "answer": "페이지 테이블 엔트리의 보호 비트로 확인합니다.\n\n페이지 테이블 엔트리 구조:\n\n확인 방법:\n프로그래밍 방식 (Linux):\n명령어:\n하드웨어 수준:\nMMU가 접근 시 권한 검사\n위반 시 Segmentation Fault 발생",
    "references": [
      {
        "title": "Linux man-pages: mprotect(2)",
        "url": "https://man7.org/linux/man-pages/man2/mprotect.2.html"
      }
    ]
  },
  {
    "id": "OS-100",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "32비트에서, 페이지의 크기가 1kb 이라면 페이지 테이블의 최대 크기는 몇 개일까요?",
    "answer": "2^22 = 4,194,304개 (약 400만 개)\n\n계산 과정:\n\n페이지 테이블 크기:\n각 엔트리: 4바이트 (32비트)\n테이블 크기: 2^22 * 4B = 16MB\n\n문제점:\n프로세스마다 16MB 페이지 테이블 필요\n대부분의 주소 공간은 사용되지 않음\n\n해결책:\n다단계 페이지 테이블: 사용하는 영역만 할당\n역 페이지 테이블: 프레임 기준 테이블\n해시 페이지 테이블: 해시로 빠른 검색\n\n실제 시스템에서는 4KB 페이지 사용 -> 2^20 엔트리 (4MB 테이블)",
    "references": [
      {
        "title": "Multi-level Page Tables",
        "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-smalltables.pdf"
      }
    ]
  },
  {
    "id": "OS-101",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "32비트 운영체제에서 최대 4GB RAM만 사용할 수 있는 이유를 페이징과 연관 지어 설명해 주세요.",
    "answer": "32비트 주소 체계의 한계 때문입니다.\n\n이유:\n\n페이징 관점:\n페이지 테이블 엔트리의 프레임 번호: 20비트 (4KB 페이지 기준)\n오프셋: 12비트\n총 주소 가능 물리 메모리: 2^20 * 4KB = 4GB\n\n가상 주소 구조 (4KB 페이지):\n\n물리 주소 한계:\nCPU의 주소 버스: 32비트\n물리 메모리 주소 지정: 최대 4GB\n\n확장 방법:\nPAE (Physical Address Extension): 36비트 물리 주소 (64GB)\n64비트 OS: 이론상 16EB (실제는 수 TB 지원)",
    "references": [
      {
        "title": "x86 PAE",
        "url": "https://en.wikipedia.org/wiki/Physical_Address_Extension"
      }
    ]
  },
  {
    "id": "OS-102",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "C/C++ 개발을 하게 되면 Segmentation Fault 라는 에러를 접할 수 있을텐데, 이 에러는 세그멘테이션/페이징과 어떤 관계가 있을까요?",
    "answer": "Segmentation Fault는 메모리 보호 위반 시 발생하는 에러입니다. 이름은 세그멘테이션에서 유래했지만, 현대 시스템에서는 페이징 보호 위반에서 주로 발생합니다.\n\n발생 원인:\nNULL 포인터 역참조\n주소 0은 일반적으로 매핑되지 않음\n해제된 메모리 접근 (Use After Free)\n유효하지 않은 페이지 접근\n배열 범위 초과 (Buffer Overflow)\n할당되지 않은 영역 접근\n읽기 전용 메모리에 쓰기\n코드 영역 수정 시도\n\n페이징과의 관계:\n\n역사적 배경:\n과거 세그멘테이션 사용 시 세그먼트 경계 위반에서 유래\n현재는 페이징 기반이지만 이름은 유지",
    "references": [
      {
        "title": "Linux man-pages: signal(7)",
        "url": "https://man7.org/linux/man-pages/man7/signal.7.html"
      }
    ]
  },
  {
    "id": "OS-103",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "TLB는 무엇인가요?",
    "answer": "TLB (Translation Lookaside Buffer)는 페이지 테이블 엔트리를 캐싱하는 고속 하드웨어 캐시입니다.\n\n역할:\n가상 주소 -> 물리 주소 변환 가속\n자주 사용되는 페이지 테이블 엔트리 저장\n메모리 접근 횟수 감소\n\n구조:\n\n특징:\n완전 연관(Fully Associative) 또는 집합 연관 매핑\n크기: 64~1024 엔트리 (작지만 빠름)\n접근 시간: 1 사이클 (매우 빠름)\n히트율: 99% 이상 (지역성 활용)\n\n동작:\nTLB 먼저 검색 (병렬로)\nTLB 히트: 바로 물리 주소 획득\nTLB 미스: 페이지 테이블에서 가져와 TLB에 저장",
    "references": [
      {
        "title": "OSTEP: TLBs",
        "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-tlbs.pdf"
      }
    ]
  },
  {
    "id": "OS-104",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "TLB를 사용하면 왜 성능이 향상되나요?",
    "answer": "메모리 접근 횟수를 줄여주기 때문입니다.\n\nTLB 없이 (2단계 페이지 테이블):\n\nTLB 사용 시 (히트):\n\n속도 비교:\n구분   시간\n\nTLB 접근   ~1ns\n메모리 접근   ~100ns\n\n효과:\nTLB 히트 시 100배 이상 빠름\n히트율 99% 이상 (지역성)\n평균 접근 시간 크게 단축\n\n유효 접근 시간 (EAT):",
    "references": [
      {
        "title": "TLB Performance",
        "url": "https://csapp.cs.cmu.edu/"
      }
    ]
  },
  {
    "id": "OS-105",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "MMU가 무엇인가요?",
    "answer": "MMU (Memory Management Unit)는 가상 주소를 물리 주소로 변환하는 하드웨어 장치입니다.\n\n주요 기능:\n주소 변환 (Address Translation)\n가상 주소 -> 물리 주소 매핑\n페이지 테이블 참조\n메모리 보호 (Memory Protection)\n페이지별 접근 권한 검사 (R/W/X)\n불법 접근 시 예외 발생\n캐시 제어\nTLB 관리\n캐시 가능 여부 결정\n\n동작 과정:\n\n구성 요소:\nTLB: 주소 변환 캐시\n페이지 테이블 워커: TLB 미스 시 테이블 탐색\n보호 검사 로직: 권한 검증\n\n예외 발생 상황:\n페이지 폴트: 페이지가 메모리에 없음\n보호 위반: 권한 없는 접근",
    "references": [
      {
        "title": "Intel MMU",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "OS-106",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "TLB와 MMU는 물리적으로 어디에 위치해 있나요?",
    "answer": "MMU와 TLB는 CPU 칩 내부에 위치합니다.\n\n물리적 위치:\n\n구조적 특징:\nMMU:\n각 CPU 코어에 통합\nCPU 파이프라인의 일부\n메모리 접근 전 주소 변환\nTLB:\nMMU 내부에 위치\nSRAM으로 구현 (빠른 속도)\n코어별 독립적 TLB 존재\n일부 시스템에서 L2 TLB 공유\n\n계층 구조:\n\nCPU와 메모리 사이의 모든 접근은 MMU를 거칩니다.",
    "references": [
      {
        "title": "x86 CPU Architecture",
        "url": "https://en.wikichip.org/wiki/x86"
      }
    ]
  },
  {
    "id": "OS-107",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "멀티코어 환경에서 각 코어의 TLB는 어떻게 동기화되나요?",
    "answer": "TLB Shootdown 메커니즘을 사용합니다.\n\n문제 상황:\n각 코어는 독립적인 TLB 보유\n한 코어에서 페이지 테이블 변경 시 다른 코어 TLB는 오래된 정보 유지\n\nTLB Shootdown 과정:\n코어 A가 페이지 테이블 수정\n코어 A가 다른 코어들에 IPI (Inter-Processor Interrupt) 전송\n각 코어가 인터럽트 받고 해당 TLB 엔트리 무효화\n모든 코어 완료 후 코어 A 진행\n\n최적화 방법:\nPCID/ASID: 프로세스별 TLB 태깅으로 전체 플러시 방지\n지연된 Shootdown: 배치 처리로 IPI 횟수 감소\n범위 지정 무효화: 특정 범위만 무효화\n\n오버헤드:\nIPI는 비용이 높음 (수백~수천 사이클)\n코어 수가 많을수록 증가",
    "references": [
      {
        "title": "Linux TLB Shootdown",
        "url": "https://www.kernel.org/doc/html/latest/admin-guide/mm/"
      }
    ]
  },
  {
    "id": "OS-108",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "Context Switching이 발생하면 TLB에는 어떤 변화가 발생하나요?",
    "answer": "프로세스 전환 시 TLB를 처리해야 합니다.\n\n문제점:\n각 프로세스는 독립적인 가상 주소 공간\nTLB에는 이전 프로세스의 매핑 정보\n새 프로세스가 같은 가상 주소 사용 시 잘못된 물리 주소 참조\n\n해결 방법:\nTLB 전체 플러시 (Flush)\n모든 TLB 엔트리 무효화\n단순하지만 비용 높음\n새 프로세스는 모두 TLB 미스 발생\nASID/PCID 사용 (Address Space ID)\n각 TLB 엔트리에 프로세스 ID 태깅\n컨텍스트 스위칭 시 ASID만 변경\nTLB 플러시 불필요\n   \n\n성능 영향:\n\n방법   장점   단점\n\n플러시   구현 단순   TLB 미스 증가, 성능 저하\nASID   캐시 유지, 빠름   하드웨어 지원 필요\n\n현대 CPU(x86 PCID, ARM ASID)는 프로세스 식별자를 지원합니다.",
    "references": [
      {
        "title": "Intel PCID",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "OS-109",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "동기화를 구현하기 위한 하드웨어적인 해결 방법에 대해 설명해 주세요.",
    "answer": "원자적 명령어 (Atomic Instructions)를 사용합니다.\nTest-And-Set (TAS)\nCompare-And-Swap (CAS)\nFetch-And-Add\nLoad-Link / Store-Conditional (LL/SC)\nARM, MIPS에서 사용\nLL로 값 읽고, SC로 조건부 쓰기\n\nx86 명령어:\nLOCK prefix: 버스 락 또는 캐시 락\nXCHG, CMPXCHG, XADD",
    "references": [
      {
        "title": "Intel Atomic Operations",
        "url": "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
      }
    ]
  },
  {
    "id": "OS-110",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "volatile 키워드는 어떤 의미가 있나요?",
    "answer": "volatile은 컴파일러에게 해당 변수에 대한 최적화를 하지 말라고 지시합니다.\n\n의미:\n매번 메모리에서 값을 읽음 (레지스터 캐싱 X)\n쓰기 연산을 생략하지 않음\n접근 순서 재배치 방지 (해당 변수에 한해)\n\n사용 사례:\n\n주의: volatile은 동기화를 보장하지 않음:\n\n언어별 차이:\n\n언어   의미\n\nC/C++   컴파일러 최적화 방지만\nJava   가시성 + happens-before 보장\n\nC++11 이후: std::atomic 사용 권장",
    "references": [
      {
        "title": "C++ volatile",
        "url": "https://en.cppreference.com/w/cpp/language/cv"
      }
    ]
  },
  {
    "id": "OS-111",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "멀티코어 환경에서는 동기화가 어떻게 이루어지나요?",
    "answer": "멀티코어 환경에서는 캐시 일관성 프로토콜과 메모리 배리어가 필요합니다.\n캐시 일관성 (Cache Coherence)\nMESI 프로토콜로 캐시 간 데이터 동기화\n한 코어가 쓰기 시 다른 코어 캐시 무효화\n하드웨어가 자동으로 처리\n원자적 연산 + 버스/캐시 락\nLOCK: 캐시 라인 독점 또는 버스 락\n다른 코어의 접근 차단\n메모리 배리어 (Memory Barrier/Fence)\n명령어 재배치 방지\n메모리 가시성 보장\n하드웨어 동기화 프리미티브\nCAS, LL/SC 등 원자적 명령어\n멀티코어에서도 원자성 보장\n\n요약:\n계층   메커니즘\n\n캐시   MESI 프로토콜\n명령어   원자적 연산 + LOCK\n메모리   메모리 배리어",
    "references": [
      {
        "title": "Memory Barriers",
        "url": "https://www.kernel.org/doc/html/latest/core-api/wrappers/memory-barriers.html"
      }
    ]
  },
  {
    "id": "OS-112",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "페이지 교체 알고리즘에 대해 설명해 주세요.",
    "answer": "페이지 폴트 시 빈 프레임이 없을 때, 어떤 페이지를 교체할지 결정하는 알고리즘입니다.\n\n주요 알고리즘:\n\n알고리즘   설명   특징\n\nOPT   가장 나중에 사용될 페이지 교체   이론적 최적, 실현 불가\nFIFO   가장 먼저 들어온 페이지 교체   단순, Belady's Anomaly\nLRU   가장 오래 사용 안 한 페이지 교체   좋은 성능, 구현 비용\nLFU   가장 적게 사용된 페이지 교체   빈도 기반\nClock   LRU 근사, 순환 리스트   효율적 구현\nNRU   Not Recently Used, 참조/수정 비트   단순한 근사\n\n목표:\n페이지 폴트율 최소화\n낮은 구현 오버헤드\n\n선택 기준:\n구현 복잡도\n하드웨어 지원 (참조 비트, 수정 비트)\n성능 vs 오버헤드 트레이드오프\n\nLinux는 LRU 근사 알고리즘 (Active/Inactive 리스트)을 사용합니다.",
    "references": [
      {
        "title": "OSTEP: Page Replacement",
        "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys-policy.pdf"
      }
    ]
  },
  {
    "id": "OS-113",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "LRU 알고리즘은 어떤 특성(원리)을 이용한 알고리즘인가요?",
    "answer": "시간적 지역성 (Temporal Locality)을 이용합니다.\n\n시간적 지역성:\n최근에 사용된 데이터는 곧 다시 사용될 가능성이 높음\n오래 사용되지 않은 데이터는 앞으로도 사용 가능성 낮음\n\nLRU의 가정:\n\nOPT와의 관계:\nOPT: 미래에 가장 늦게 사용될 페이지 교체 (이상적)\nLRU: 과거에 가장 오래 안 쓴 페이지 교체 (OPT 근사)\n\n효과적인 상황:\n루프에서 같은 데이터 반복 접근\n최근 참조 = 곧 다시 참조\n\n비효과적인 상황:\n순차적 스캔 (한 번만 접근)\nWorking Set > 프레임 수 (스래싱)\n\nLRU는 지역성이 있는 대부분의 워크로드에서 좋은 성능을 보입니다.",
    "references": [
      {
        "title": "Locality of Reference",
        "url": "https://csapp.cs.cmu.edu/"
      }
    ]
  },
  {
    "id": "OS-114",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "LRU 알고리즘을 구현하는 방법에는 어떤 것들이 있나요?",
    "answer": "카운터 기반 (Counter)\n매 접근마다 타임스탬프 갱신\n교체 시 전체 탐색 필요\n스택 기반 (Stack)\n이중 연결 리스트로 구현\n매 접근마다 리스트 재구성\n해시맵 + 이중 연결 리스트 (최적)\nClock 알고리즘 (LRU 근사)\n\nLinux는 Active/Inactive 리스트 기반 LRU 근사를 사용합니다.",
    "references": [
      {
        "title": "Linux Page Reclaim",
        "url": "https://www.kernel.org/doc/html/latest/admin-guide/mm/"
      }
    ]
  },
  {
    "id": "OS-115",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "LRU 알고리즘의 단점과 이를 해결할 수 있는 대안 알고리즘을 설명해 주세요.",
    "answer": "LRU의 단점:\n순차 스캔 문제 (Scan Resistant)\n대량 순차 읽기 시 캐시 오염\n한 번만 사용될 페이지가 최근 사용으로 표시\n구현 오버헤드\n매 접근마다 순서 갱신 필요\n하드웨어 지원 없이 정확한 LRU 구현 어려움\n빈도 무시\n자주 사용되는 페이지도 최근 안 쓰면 교체\n최근성만 고려, 빈도는 무시\n\n대안 알고리즘:\n\n알고리즘   해결하는 문제\n\nLRU-K   최근 K번의 접근 이력 고려\n2Q   새 페이지와 오래된 페이지 분리 관리\nARC   빈도와 최근성 동시 고려\nCLOCK-Pro   Clock + 빈도 정보\nLFU   빈도 기반 (시간 무시 문제)\n\nLinux 접근법:\nActive/Inactive 리스트 분리\n두 번 접근된 페이지만 Active로 승격\n순차 스캔 저항성 확보",
    "references": [
      {
        "title": "ARC Algorithm",
        "url": "https://www.usenix.org/conference/fast-03/arc-self-tuning-low-overhead-replacement-cache"
      }
    ]
  },
  {
    "id": "OS-116",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "File Descriptor와, File System에 에 대해 설명해 주세요.",
    "answer": "File Descriptor (파일 디스크립터):\n프로세스가 열린 파일을 참조하는 정수 식별자\n프로세스별 파일 디스크립터 테이블에 저장\n기본값: 0(stdin), 1(stdout), 2(stderr)\n\n파일 디스크립터 구조:\n\nFile System (파일 시스템):\n저장 장치에 파일을 조직하고 관리하는 방법\n파일 저장, 검색, 접근 방식 정의\n\n주요 파일 시스템:\n이름   운영체제   특징\n\next4   Linux   저널링, 대용량 지원\nNTFS   Windows   권한, 암호화\nAPFS   macOS   스냅샷, 암호화\nFAT32   범용   단순, 호환성",
    "references": [
      {
        "title": "Linux man-pages: open(2)",
        "url": "https://man7.org/linux/man-pages/man2/open.2.html"
      }
    ]
  },
  {
    "id": "OS-117",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "파일 시스템에서 I-Node(Index Node)란 무엇인가요?",
    "answer": "I-Node (Index Node)는 Unix/Linux 파일 시스템에서 파일의 메타데이터를 저장하는 자료구조입니다.\n\n저장 정보:\n파일 타입 (일반, 디렉토리, 심볼릭 링크 등)\n파일 크기\n소유자 (UID, GID)\n권한 (rwxrwxrwx)\n타임스탬프 (생성, 수정, 접근 시간)\n링크 카운트 (하드 링크 수)\n데이터 블록 포인터 (실제 데이터 위치)\n\n데이터 블록 포인터 구조:\n\n특징:\n파일 이름은 inode에 저장되지 않음 (디렉토리에 저장)\ninode 번호로 파일 식별\n하드 링크: 같은 inode를 가리키는 여러 이름",
    "references": [
      {
        "title": "Linux man-pages: inode(7)",
        "url": "https://man7.org/linux/man-pages/man7/inode.7.html"
      }
    ]
  },
  {
    "id": "OS-118",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "프로그래밍 언어 상에서 제공하는 파일 관련 함수 (Python - open(), Java - BufferedReader/Writer 등)은, 파일을 어떤 방식으로 읽어들이나요?",
    "answer": "버퍼링을 통한 시스템 콜 최소화 방식을 사용합니다.\n\n동작 과정:\n\n버퍼링의 이점:\n시스템 콜 횟수 감소: 한 번에 많은 데이터 읽기\nI/O 효율화: 블록 단위로 읽기/쓰기\n성능 향상: 디스크 접근 최소화\n\n예시:\n\n버퍼 크기:\n보통 4KB ~ 64KB\n페이지 크기의 배수가 효율적",
    "references": [
      {
        "title": "Python I/O",
        "url": "https://docs.python.org/3/library/io.html"
      }
    ]
  },
  {
    "id": "OS-119",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "동기와 비동기, 블로킹과 논블로킹의 차이에 대해 설명해 주세요.",
    "answer": "동기(Synchronous) vs 비동기(Asynchronous): 작업 완료를 누가 확인하는가\n\n구분   동기   비동기\n\n완료 확인   호출자가 확인   피호출자가 알림\n결과 수신   직접 반환   콜백/이벤트\n\n블로킹(Blocking) vs 논블로킹(Non-blocking): 작업 완료 전 제어권을 어떻게 하는가\n\n구분   블로킹   논블로킹\n\n제어권   완료까지 대기   즉시 반환\n다른 작업   불가   가능\n\n조합 예시:\n\n조합   예시\n\n동기 + 블로킹   일반 read()\n동기 + 논블로킹   ONONBLOCK + 폴링\n비동기 + 블로킹   select()에서 대기\n비동기 + 논블로킹   iouring, IOCP",
    "references": [
      {
        "title": "Linux AIO",
        "url": "https://man7.org/linux/man-pages/man7/aio.7.html"
      }
    ]
  },
  {
    "id": "OS-120",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "동기+논블로킹, 비동기+블로킹 조합은 실제로 사용되는 의미 있는 조합인가요?",
    "answer": "두 경우 모두 실제로 사용됩니다.\n\n동기 + 논블로킹:\n직접 결과 확인 (동기)\n즉시 반환 (논블로킹)\n바쁜 대기(busy waiting) 가능\n\n비동기 + 블로킹:\n여러 작업을 대기하며 블로킹\n어느 것이 완료되든 알림받음\nI/O 멀티플렉싱의 핵심\n\n의미:\n조합   사용 사례\n\n동기 + 논블로킹   폴링, 게임 루프\n비동기 + 블로킹   select, epoll",
    "references": [
      {
        "title": "Linux select(2)",
        "url": "https://man7.org/linux/man-pages/man2/select.2.html"
      }
    ]
  },
  {
    "id": "OS-121",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "I/O 멀티플렉싱에 대해 설명해 주세요.",
    "answer": "I/O 멀티플렉싱은 하나의 스레드가 여러 I/O 채널을 동시에 감시하는 기법입니다.\n\n필요성:\n수천 개의 연결을 처리해야 하는 서버\n스레드/프로세스 생성 오버헤드 방지\nC10K 문제 해결\n\n메커니즘:\n\n주요 구현:\n\n함수   특징\n\nselect   최대 1024개 fd, O(n)\npoll   fd 수 제한 없음, O(n)\nepoll (Linux)   O(1), 대규모 연결에 효율적\nkqueue (BSD)   epoll과 유사\nIOCP (Windows)   비동기 완료 포트\n\nepoll 예시:",
    "references": [
      {
        "title": "Linux man-pages: epoll(7)",
        "url": "https://man7.org/linux/man-pages/man7/epoll.7.html"
      }
    ]
  },
  {
    "id": "OS-122",
    "category": "os",
    "categoryName": "OS",
    "section": "cs",
    "question": "논블로킹 I/O를 수행할 때 작업 완료 결과를 어떤 방법으로 수신할 수 있나요?",
    "answer": "논블로킹 I/O 결과 수신 방법:\n폴링 (Polling)\n단순하지만 CPU 낭비\nI/O 멀티플렉싱\n여러 fd를 효율적으로 감시\n시그널 기반 (Signal-Driven)\n인터럽트 기반\n비동기 I/O (AIO)\niouring (최신 Linux)\n높은 성능, 시스템 콜 최소화",
    "references": [
      {
        "title": "Linux io_uring",
        "url": "https://man7.org/linux/man-pages/man7/io_uring.7.html"
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { csData };
}
