const plData = [
  {
    "id": "JAVA-001",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "JVM의 구조와 동작 원리에 대해 설명해주세요.",
    "answer": "JVM(Java Virtual Machine)은 자바 바이트코드를 실행하는 가상 머신입니다.\n\n주요 구성 요소:\nClass Loader: 클래스 파일 로드, 링크, 초기화\nRuntime Data Area: Heap, Stack, Method Area, PC Register, Native Method Stack\nExecution Engine: Interpreter + JIT Compiler로 바이트코드 실행\nGarbage Collector: 미사용 객체 메모리 자동 해제\n\n동작 과정: .java → javac → .class(바이트코드) → Class Loader → Execution Engine 실행",
    "references": [
      {
        "title": "JVM Specification",
        "url": "https://docs.oracle.com/javase/specs/jvms/se17/html/index.html"
      }
    ]
  },
  {
    "id": "JAVA-002",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "JVM의 메모리 구조(Heap, Stack, Method Area 등)를 설명해주세요.",
    "answer": "Method Area (메서드 영역)\n클래스 정보, static 변수, 상수 풀 저장\n모든 스레드가 공유\nHeap (힙)\n객체 인스턴스와 배열 저장\nGC의 대상, 모든 스레드가 공유\nYoung Generation(Eden, Survivor)과 Old Generation으로 구분\nStack (스택)\n스레드별 독립적, 메서드 호출 시 프레임 생성\n지역 변수, 매개변수, 리턴 값 저장\nPC Register\n스레드별 현재 실행 중인 명령어 주소 저장\nNative Method Stack\n네이티브 메서드(C/C++) 실행을 위한 스택",
    "references": [
      {
        "title": "JVM Runtime Data Areas",
        "url": "https://docs.oracle.com/javase/specs/jvms/se17/html/jvms-2.html#jvms-2.5"
      }
    ]
  },
  {
    "id": "JAVA-003",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Garbage Collection의 동작 원리와 종류에 대해 설명해주세요.",
    "answer": "동작 원리:\nMark: 루트에서 참조되는 객체를 마킹\nSweep: 마킹되지 않은 객체 제거\nCompact: 메모리 단편화 방지를 위해 압축 (선택적)\n\n세대별 GC (Generational GC):\nYoung Generation: 새 객체 할당, Minor GC 발생 (빈번, 빠름)\nOld Generation: 오래 살아남은 객체, Major/Full GC 발생\n\nGC 종류:\nSerial GC: 단일 스레드, 소규모 애플리케이션용\nParallel GC: 멀티 스레드로 처리량 최적화\nCMS GC: 낮은 지연시간, Concurrent Mark-Sweep\nG1 GC: Region 기반, 대용량 힙에 적합 (Java 9+ 기본)\nZGC/Shenandoah: 초저지연 GC (Java 11+)",
    "references": [
      {
        "title": "Java Garbage Collection",
        "url": "https://docs.oracle.com/en/java/javase/17/gctuning/introduction-garbage-collection-tuning.html"
      }
    ]
  },
  {
    "id": "JAVA-004",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "G1 GC와 다른 GC 알고리즘의 차이점은 무엇인가요?",
    "answer": "G1 GC 특징:\n힙을 동일 크기의 Region으로 분할 (1MB~32MB)\nRegion 단위로 GC 수행, 가비지가 많은 영역 우선 수집 (Garbage First)\n목표 중단 시간(Pause Time Goal) 설정 가능 (-XX:MaxGCPauseMillis)\n\n다른 GC와 비교:\n\n구분   G1 GC   Parallel GC   CMS GC\n\n구조   Region 기반   전통적 세대별   전통적 세대별\n목표   균형(처리량+지연)   처리량 최대화   지연시간 최소화\n압축   Incremental   Full GC 시   압축 없음(단편화)\nSTW   예측 가능   길 수 있음   짧지만 불규칙\n\nG1 GC 권장 상황: 힙 크기 4GB 이상, 지연시간과 처리량 균형 필요 시",
    "references": [
      {
        "title": "G1 Garbage Collector",
        "url": "https://docs.oracle.com/en/java/javase/17/gctuning/garbage-first-g1-garbage-collector1.html"
      }
    ]
  },
  {
    "id": "JAVA-005",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java의 클래스 로딩 과정을 설명해주세요.",
    "answer": "3단계 클래스 로딩 과정:\nLoading (로딩)\n.class 파일을 읽어 바이트코드를 Method Area에 저장\nClass 객체 생성\nLinking (링킹)\nVerification: 바이트코드 유효성 검증\nPreparation: static 변수 메모리 할당 및 기본값 초기화\nResolution: 심볼릭 참조를 실제 참조로 변환\nInitialization (초기화)\nstatic 블록 실행, static 변수에 명시적 값 할당\n\n클래스 로더 계층 (위임 모델):\nBootstrap ClassLoader → Extension ClassLoader → Application ClassLoader\n상위 로더에 먼저 위임 후, 못 찾으면 하위에서 로드",
    "references": [
      {
        "title": "Class Loading",
        "url": "https://docs.oracle.com/javase/specs/jvms/se17/html/jvms-5.html"
      }
    ]
  },
  {
    "id": "JAVA-006",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "static 키워드의 의미와 사용 시 주의사항은 무엇인가요?",
    "answer": "의미:\n클래스 레벨에 속하며, 인스턴스 생성 없이 접근 가능\nMethod Area에 저장, 모든 인스턴스가 공유\n\n사용처:\nstatic 변수: 클래스 전체에서 공유하는 값 (예: 카운터)\nstatic 메서드: 유틸리티 메서드 (예: Math.max())\nstatic 블록: 클래스 로딩 시 한 번 실행\nstatic 내부 클래스: 외부 클래스 인스턴스 없이 생성 가능\n\n주의사항:\nstatic 메서드에서 인스턴스 멤버 직접 접근 불가\n멀티스레드 환경에서 동기화 필요 (공유 자원)\n메모리 누수 주의 (GC 대상이 아님, 클래스 언로드 시까지 유지)\n테스트 어려움 (상태 공유로 인한 부작용)\n과도한 사용은 OOP 원칙 위반",
    "references": [
      {
        "title": "Understanding Class Members",
        "url": "https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html"
      }
    ]
  },
  {
    "id": "JAVA-007",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "final, finally, finalize의 차이점을 설명해주세요.",
    "answer": "final (키워드)\n변수: 재할당 불가 (상수화)\n메서드: 오버라이딩 불가\n클래스: 상속 불가 (예: String, Integer)\n\nfinally (예외 처리)\ntry-catch-finally 블록에서 항상 실행되는 블록\n리소스 정리에 사용 (try-with-resources 권장)\nreturn이 있어도 실행됨 (System.exit() 제외)\n\nfinalize() (메서드) - Deprecated\nObject 클래스의 메서드, GC 전 호출\nJava 9부터 deprecated, 사용 권장하지 않음\n대안: try-with-resources, Cleaner API",
    "references": [
      {
        "title": "Java Language Keywords",
        "url": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html"
      }
    ]
  },
  {
    "id": "JAVA-008",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "추상 클래스와 인터페이스의 차이점과 사용 시나리오를 설명해주세요.",
    "answer": "구분   추상 클래스   인터페이스\n\n상속   단일 상속   다중 구현 가능\n생성자   가질 수 있음   없음\n필드   인스턴스 변수 가능   public static final만\n메서드   모든 종류   public abstract (+ default, static)\n접근제어자   모두 가능   public만\n\n사용 시나리오:\n\n추상 클래스:\n\"is-a\" 관계, 공통 구현 코드 공유 시\n상태(필드)를 공유해야 할 때\n예: Animal → Dog, Cat\n\n인터페이스:\n\"can-do\" 관계, 행위 계약 정의\n다중 타입 역할 부여 시\n예: Comparable, Serializable, Runnable",
    "references": [
      {
        "title": "Abstract Methods and Classes",
        "url": "https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html"
      }
    ]
  },
  {
    "id": "JAVA-009",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java 8 이후 인터페이스의 default 메서드와 static 메서드에 대해 설명해주세요.",
    "answer": "default 메서드:\n인터페이스에 기본 구현을 제공\n하위 호환성 유지하며 인터페이스 확장 가능\n구현 클래스에서 오버라이딩 가능\n\nstatic 메서드:\n인터페이스에 유틸리티 메서드 정의\n인터페이스명으로 직접 호출 (상속/오버라이딩 불가)\n\n다이아몬드 문제 해결:\n동일 시그니처의 default 메서드 충돌 시, 구현 클래스에서 명시적 오버라이딩 필요\nInterfaceName.super.method() 로 특정 인터페이스 메서드 호출",
    "references": [
      {
        "title": "Default Methods",
        "url": "https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html"
      }
    ]
  },
  {
    "id": "JAVA-010",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Checked Exception과 Unchecked Exception의 차이점은 무엇인가요?",
    "answer": "구분   Checked Exception   Unchecked Exception\n\n상속   Exception 상속   RuntimeException 상속\n처리   반드시 처리 (try-catch/throws)   선택적 처리\n컴파일   미처리 시 컴파일 에러   컴파일 에러 없음\n시점   예측 가능한 외부 요인   프로그래밍 오류\n\nChecked Exception 예시:\nIOException, SQLException, FileNotFoundException\n복구 가능한 상황, 호출자에게 처리 강제\n\nUnchecked Exception 예시:\nNullPointerException, IllegalArgumentException, IndexOutOfBoundsException\n프로그래밍 버그, 방어 코딩으로 예방\n\n현대적 관점:\nSpring/JPA 등은 Unchecked 선호 (보일러플레이트 감소)\nChecked는 과도한 try-catch로 코드 가독성 저하 우려",
    "references": [
      {
        "title": "Exceptions",
        "url": "https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html"
      }
    ]
  },
  {
    "id": "JAVA-011",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "try-with-resources 구문의 동작 원리를 설명해주세요.",
    "answer": "개념:\nJava 7에서 도입된 자동 리소스 관리 구문으로, AutoCloseable 인터페이스를 구현한 리소스를 자동으로 닫아줍니다.\n\n동작 원리:\ntry 블록 종료 시 close() 자동 호출\n선언 역순으로 close() 실행\nclose()에서 발생한 예외는 suppressed exception으로 처리\n\n장점:\nfinally 블록 불필요, 코드 간결\n리소스 누수 방지\n예외 안전한 리소스 해제\n\nSuppressed Exception:",
    "references": [
      {
        "title": "Try-with-resources",
        "url": "https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html"
      }
    ]
  },
  {
    "id": "JAVA-012",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "equals()와 hashCode()의 관계와 오버라이딩 시 주의사항은 무엇인가요?",
    "answer": "계약 (Contract):\nequals()가 true인 두 객체는 반드시 같은 hashCode() 반환\nhashCode()가 같아도 equals()는 false일 수 있음\n\n위반 시 문제:\nHashMap, HashSet 등 해시 기반 컬렉션에서 오작동\n객체를 찾지 못하거나 중복 저장되는 버그\n\nequals() 오버라이딩 규칙:\n반사성: x.equals(x) == true\n대칭성: x.equals(y) == y.equals(x)\n추이성: x.equals(y), y.equals(z) → x.equals(z)\n일관성: 값 불변 시 항상 동일 결과\nnull 비교: x.equals(null) == false\n\n구현 팁:",
    "references": [
      {
        "title": "Object.equals()",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object"
      }
    ]
  },
  {
    "id": "JAVA-013",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "String, StringBuilder, StringBuffer의 차이점을 설명해주세요.",
    "answer": "구분   String   StringBuilder   StringBuffer\n\n가변성   불변 (Immutable)   가변 (Mutable)   가변 (Mutable)\n스레드 안전   O (불변)   X   O (synchronized)\n성능   문자열 연산 시 느림   가장 빠름   StringBuilder보다 느림\n메모리   연산마다 새 객체 생성   내부 버퍼 재사용   내부 버퍼 재사용\n\n사용 시나리오:\nString: 문자열 변경이 적을 때, 리터럴 사용\nStringBuilder: 단일 스레드에서 문자열 조작 (권장)\nStringBuffer: 멀티스레드에서 문자열 조작\n\nString Pool:\nString 리터럴은 힙의 String Pool에 저장되어 재사용\nnew String()은 별도 객체 생성",
    "references": [
      {
        "title": "String",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html"
      }
    ]
  },
  {
    "id": "JAVA-014",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java의 Generic에 대해 설명하고, Type Erasure란 무엇인가요?",
    "answer": "Generic:\n컴파일 타임에 타입 안전성을 보장하고, 캐스팅 제거하는 기능 (Java 5+)\n\nType Erasure:\n컴파일 후 제네릭 타입 정보가 제거되어 런타임에는 존재하지 않음\nList<String> → List (Raw Type)\n하위 호환성을 위해 도입\n\n제약사항:\nnew T(), new T[] 불가\ninstanceof T 불가\nstatic 컨텍스트에서 타입 파라미터 사용 불가\n기본 타입 사용 불가 (List<int> X → List<Integer> O)\n\n와일드카드:\n?: 모든 타입\n? extends T: 상한 경계 (읽기 전용)\n? super T: 하한 경계 (쓰기 용)\nPECS: Producer-Extends, Consumer-Super",
    "references": [
      {
        "title": "Generics",
        "url": "https://docs.oracle.com/javase/tutorial/java/generics/index.html"
      }
    ]
  },
  {
    "id": "JAVA-015",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Comparable과 Comparator의 차이점을 설명해주세요.",
    "answer": "구분   Comparable   Comparator\n\n패키지   java.lang   java.util\n메서드   compareTo(T o)   compare(T o1, T o2)\n구현 위치   비교 대상 클래스 내부   별도 클래스/람다\n정렬 기준   자연 순서 (단일)   다양한 기준 가능\n\nComparable:\n\nComparator:\n\n사용 시나리오:\nComparable: 클래스의 기본 정렬 기준 정의\nComparator: 여러 정렬 기준 필요 시, 기존 클래스 수정 불가 시",
    "references": [
      {
        "title": "Comparable",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Comparable.html"
      }
    ]
  },
  {
    "id": "JAVA-016",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java의 Collection Framework 구조를 설명해주세요.",
    "answer": "계층 구조:\n\n주요 인터페이스:\nList: 인덱스 기반 접근, 순서 보장\nSet: 중복 불허, 집합 연산\nQueue/Deque: FIFO/양방향 큐\nMap: 키-값 매핑\n\n선택 기준:\n순서/중복 필요 → List\n고유값 보장 → Set\n키로 검색 → Map\n선입선출 → Queue",
    "references": [
      {
        "title": "Collections Framework",
        "url": "https://docs.oracle.com/javase/tutorial/collections/index.html"
      }
    ]
  },
  {
    "id": "JAVA-017",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "ArrayList와 LinkedList의 차이점과 사용 시나리오는 무엇인가요?",
    "answer": "구분   ArrayList   LinkedList\n\n내부 구조   동적 배열   이중 연결 리스트\n인덱스 접근   O(1)   O(n)\n삽입/삭제 (중간)   O(n)   O(1) (노드 접근 후)\n삽입/삭제 (끝)   O(1) 평균   O(1)\n메모리   연속, 적음   노드별 포인터, 많음\n캐시 효율   높음   낮음\n\nArrayList 권장:\n읽기/조회가 빈번한 경우\n인덱스 기반 접근이 많은 경우\n대부분의 일반적인 상황 (기본 선택)\n\nLinkedList 권장:\n앞/뒤 삽입/삭제가 빈번한 경우\nQueue/Deque 용도로 사용 시\nIterator를 통한 순회 중 삭제가 많을 때\n\n실무 팁:\n실제로는 ArrayList가 대부분 더 좋은 성능을 보임 (CPU 캐시 효율)",
    "references": [
      {
        "title": "ArrayList",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/ArrayList.html"
      }
    ]
  },
  {
    "id": "JAVA-018",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "HashMap의 동작 원리와 해시 충돌 해결 방법을 설명해주세요.",
    "answer": "동작 원리:\nkey.hashCode()로 해시값 계산\n해시값을 배열 인덱스로 변환 (hash & (n-1))\n해당 버킷에 Entry(key, value) 저장\n\n해시 충돌 해결 (Separate Chaining):\n같은 버킷에 여러 Entry가 저장될 때\nJava 7: 연결 리스트로 체이닝\nJava 8+: 버킷 내 8개 초과 시 Red-Black Tree로 변환 (O(n) → O(log n))\n\n주요 특징:\n초기 용량: 16, 로드팩터: 0.75\n로드팩터 초과 시 2배 리사이징 (rehashing)\nnull key 1개, null value 다수 허용\n순서 보장 X (LinkedHashMap은 보장)\n\n성능:\n평균: get/put O(1)\n최악 (충돌 많을 때): O(log n) - Java 8+",
    "references": [
      {
        "title": "HashMap",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html"
      }
    ]
  },
  {
    "id": "JAVA-019",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "ConcurrentHashMap의 동작 원리와 HashMap과의 차이점은 무엇인가요?",
    "answer": "구분   HashMap   ConcurrentHashMap\n\n스레드 안전   X   O\nnull 허용   key/value 가능   불가\n동기화 방식   없음   세그먼트/노드 락\n성능   단일 스레드 최고   멀티스레드 최적화\nIterator   fail-fast   weakly consistent\n\nConcurrentHashMap 동작 원리:\n\nJava 7:\nSegment 기반 분할 잠금 (기본 16개)\n각 세그먼트별 독립적 락\n\nJava 8+:\n세그먼트 대신 노드 단위 CAS + synchronized\n버킷이 비어있으면 CAS로 삽입\n충돌 시 해당 노드만 synchronized\n읽기는 락 없이 수행 (volatile)\n\n사용 시나리오:\n멀티스레드 환경에서 Map 공유 시\nCollections.synchronizedMap()보다 높은 동시성 필요 시",
    "references": [
      {
        "title": "ConcurrentHashMap",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html"
      }
    ]
  },
  {
    "id": "JAVA-020",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java의 동기화 방법(synchronized, volatile, Atomic 클래스 등)을 설명해주세요.",
    "answer": "synchronized\n임계 영역에 하나의 스레드만 진입\n메서드 또는 블록 레벨 적용\n모니터 락 기반, 상호 배제 보장\nvolatile\n변수의 가시성(visibility) 보장\n메인 메모리에서 직접 읽기/쓰기\n원자성 보장 안 함 (읽기/쓰기만 원자적)\nAtomic 클래스\nCAS(Compare-And-Swap) 기반 락-프리 연산\nAtomicInteger, AtomicLong, AtomicReference 등\n단일 변수의 원자적 연산\njava.util.concurrent.locks\nReentrantLock: 명시적 락, tryLock() 지원\nReadWriteLock: 읽기/쓰기 분리 락",
    "references": [
      {
        "title": "Concurrency",
        "url": "https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html"
      }
    ]
  },
  {
    "id": "JAVA-021",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "volatile 키워드의 의미와 사용 시나리오는 무엇인가요?",
    "answer": "의미:\n변수를 CPU 캐시가 아닌 메인 메모리에서 직접 읽고 씀\n가시성(Visibility) 보장: 한 스레드의 변경이 다른 스레드에 즉시 보임\nHappens-Before 관계 보장\n64비트 원자성: volatile long/double은 읽기/쓰기가 원자적 (비volatile은 32비트 두 번 연산 가능)\n\n보장하지 않는 것:\n복합 연산의 원자성: count++ 같은 읽기-수정-쓰기는 원자적이지 않음\n상호 배제: 여러 스레드의 동시 접근 차단 안 함\n\n사용 시나리오:\n\n주의:\n복합 연산에는 synchronized나 Atomic 클래스 사용\n불필요한 volatile은 성능 저하 유발",
    "references": [
      {
        "title": "Atomic Access",
        "url": "https://docs.oracle.com/javase/tutorial/essential/concurrency/atomic.html"
      }
    ]
  },
  {
    "id": "JAVA-022",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java Memory Model에 대해 설명해주세요.",
    "answer": "JMM (Java Memory Model):\n멀티스레드 환경에서 메모리 접근 규칙을 정의한 명세 (JSR-133, Java 5+)\n\n핵심 개념:\n가시성 (Visibility)\n한 스레드의 변경이 다른 스레드에 보이는지\nCPU 캐시로 인해 보장 안 될 수 있음\n재정렬 (Reordering)\n컴파일러/CPU가 성능 최적화를 위해 명령어 순서 변경\n단일 스레드에서는 결과 동일 보장\nHappens-Before 관계\n연산 A가 B 전에 발생함을 보장하는 규칙\nsynchronized, volatile, Thread.start(), join() 등이 보장\n\n주요 규칙:\n같은 락의 unlock → lock\nvolatile 쓰기 → 읽기\nThread.start() → 해당 스레드의 모든 동작\n스레드의 모든 동작 → join() 리턴\n\n실무 영향:\n동기화 없이 공유 변수 접근 시 예기치 않은 결과\nsynchronized, volatile, Atomic으로 해결",
    "references": [
      {
        "title": "JLS Chapter 17",
        "url": "https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html"
      }
    ]
  },
  {
    "id": "JAVA-023",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "ThreadLocal의 동작 원리와 주의사항은 무엇인가요?",
    "answer": "개념:\n각 스레드가 독립적인 변수 복사본을 가지게 하는 클래스\n\n동작 원리:\n각 Thread 객체 내부에 ThreadLocalMap 존재\nThreadLocal을 키로, 값을 저장\n스레드별 격리된 저장 공간 제공\n\n사용 시나리오:\n사용자 세션/인증 정보 전달\n트랜잭션 컨텍스트\nSimpleDateFormat 등 스레드 안전하지 않은 객체\n\n주의사항:\n메모리 누수: 스레드 풀 환경에서 remove() 미호출 시 누수\n스레드 재사용 시 이전 값이 남아있을 수 있음\ntry-finally로 항상 정리",
    "references": [
      {
        "title": "ThreadLocal",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/ThreadLocal.html"
      }
    ]
  },
  {
    "id": "JAVA-024",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Executor Framework와 Thread Pool에 대해 설명해주세요.",
    "answer": "Executor Framework:\n스레드 생성과 작업 실행을 분리한 추상화 계층 (Java 5+)\n\n주요 인터페이스:\nExecutor: 단순 실행 (execute)\nExecutorService: 라이프사이클 관리, Future 반환\nScheduledExecutorService: 지연/주기적 실행\n\nThread Pool 종류 (Executors 팩토리):\n\nThreadPoolExecutor 파라미터:\ncorePoolSize, maximumPoolSize\nkeepAliveTime, workQueue\nRejectedExecutionHandler\n\n실무 권장:\nExecutors 대신 ThreadPoolExecutor 직접 설정\n적절한 큐 크기와 거부 정책 설정",
    "references": [
      {
        "title": "Executors",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/Executors.html"
      }
    ]
  },
  {
    "id": "JAVA-025",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Fork/Join Framework의 동작 원리를 설명해주세요.",
    "answer": "개념:\n분할 정복(Divide and Conquer) 알고리즘을 병렬로 실행하기 위한 프레임워크 (Java 7+)\n\n핵심 구성:\nForkJoinPool: 작업 실행 풀\nForkJoinTask: 분할 가능한 작업 (RecursiveTask/RecursiveAction)\nWork-Stealing: 유휴 스레드가 다른 스레드의 큐에서 작업을 훔쳐옴\n\n동작 원리:\n작업을 작은 단위로 분할 (fork)\n각 서브태스크를 병렬 실행\n결과를 결합 (join)\n\nWork-Stealing:\n각 스레드가 자체 Deque 보유\n자신의 큐가 비면 다른 스레드 큐의 tail에서 작업 훔침\n부하 균형 자동 조절",
    "references": [
      {
        "title": "ForkJoinPool",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/ForkJoinPool.html"
      }
    ]
  },
  {
    "id": "JAVA-026",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java의 Stream API 동작 원리와 병렬 처리 방법을 설명해주세요.",
    "answer": "Stream API:\n컬렉션 데이터를 선언적으로 처리하는 추상화 (Java 8+)\n\n동작 원리:\n소스: 컬렉션, 배열, 파일 등\n중간 연산: filter, map, sorted (지연 평가, Lazy)\n최종 연산: collect, forEach, reduce (실행 트리거)\n\n지연 평가 (Lazy Evaluation):\n최종 연산 호출 전까지 중간 연산 실행 안 함\n파이프라인 최적화 가능 (short-circuit 등)\n\n병렬 처리:\n\n병렬 스트림 주의사항:\n공유 가변 상태 피하기\n작은 데이터셋은 오히려 오버헤드\n순서 의존 연산 주의 (forEachOrdered)\nForkJoinPool.commonPool() 사용",
    "references": [
      {
        "title": "Stream",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/stream/Stream.html"
      }
    ]
  },
  {
    "id": "JAVA-027",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Optional 클래스의 필요성과 올바른 사용 방법은 무엇인가요?",
    "answer": "필요성:\nNullPointerException 방지\nnull 가능성을 명시적으로 표현\n함수형 스타일의 null 처리\n\n올바른 사용:\n\n안티패턴 (피해야 할 것):\nopt.get() 직접 호출 (NoSuchElementException 위험)\nopt.isPresent() + opt.get() 조합\n필드 타입으로 Optional 사용\n메서드 파라미터로 Optional 사용\n컬렉션을 Optional로 감싸기\n\n권장:\n메서드 반환 타입으로만 사용\n빈 컬렉션은 Optional 대신 빈 컬렉션 반환",
    "references": [
      {
        "title": "Optional",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Optional.html"
      }
    ]
  },
  {
    "id": "JAVA-028",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Functional Interface와 Lambda Expression에 대해 설명해주세요.",
    "answer": "Functional Interface:\n추상 메서드가 정확히 1개인 인터페이스\n@FunctionalInterface로 명시 (선택)\n람다/메서드 참조의 타겟 타입\n\n주요 함수형 인터페이스:\n인터페이스   메서드   용도\n\nFunction<T,R>   R apply(T)   변환\nConsumer<T>   void accept(T)   소비\nSupplier<T>   T get()   생성\nPredicate<T>   boolean test(T)   조건 검사\nBiFunction<T,U,R>   R apply(T,U)   이항 변환\n\nLambda Expression:\n익명 함수의 간결한 표현 (Java 8+)\n\n특징:\neffectively final 변수만 캡처 가능\nthis는 람다를 감싸는 클래스 참조",
    "references": [
      {
        "title": "Lambda Expressions",
        "url": "https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html"
      }
    ]
  },
  {
    "id": "JAVA-029",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Method Reference의 종류와 사용 방법을 설명해주세요.",
    "answer": "Method Reference:\n기존 메서드를 람다 대신 참조하는 간결한 문법 (::)\n\n4가지 종류:\n정적 메서드 참조\n특정 객체의 인스턴스 메서드\n임의 객체의 인스턴스 메서드\n생성자 참조\n\n사용 시점:\n람다가 단순히 기존 메서드를 호출할 때 사용하면 가독성 향상",
    "references": [
      {
        "title": "Method References",
        "url": "https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html"
      }
    ]
  },
  {
    "id": "JAVA-030",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "CompletableFuture의 동작 원리와 사용 방법을 설명해주세요.",
    "answer": "개념:\n비동기 프로그래밍을 위한 Future의 확장 (Java 8+)\n\n기본 사용:\n\n주요 메서드:\n메서드   설명\n\nsupplyAsync   값 반환 비동기 실행\nrunAsync   값 없이 비동기 실행\nthenApply   결과 변환 (map)\nthenCompose   결과로 새 Future 생성 (flatMap)\nthenCombine   두 Future 결과 결합\nexceptionally   예외 처리\nhandle   결과/예외 모두 처리\n\n병렬 처리:\n\n실행 스레드:\n기본: ForkJoinPool.commonPool()\n커스텀 Executor 지정 가능 (supplyAsync(task, executor))",
    "references": [
      {
        "title": "CompletableFuture",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/CompletableFuture.html"
      }
    ]
  },
  {
    "id": "JAVA-031",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java의 리플렉션(Reflection)이란 무엇이고 언제 사용하나요?",
    "answer": "개념:\n런타임에 클래스의 메타정보를 조회하고 조작하는 API\n\n주요 기능:\n\n사용 사례:\n프레임워크: Spring DI, JPA, JUnit\n직렬화/역직렬화: Jackson, Gson\n동적 프록시 생성\nIDE 자동완성, 디버거\n\n단점:\n성능 오버헤드 (캐싱으로 완화)\n컴파일 타임 타입 체크 불가\n캡슐화 위반 가능",
    "references": [
      {
        "title": "Reflection API",
        "url": "https://docs.oracle.com/javase/tutorial/reflect/index.html"
      }
    ]
  },
  {
    "id": "JAVA-032",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "동적 프록시(Dynamic Proxy)의 동작 원리를 설명해주세요.",
    "answer": "개념:\n런타임에 인터페이스를 구현하는 프록시 객체를 동적으로 생성\n\nJDK Dynamic Proxy:\n\n동작 원리:\n런타임에 $Proxy0 클래스 동적 생성\n지정된 인터페이스 구현\n모든 메서드 호출을 InvocationHandler.invoke()로 위임\n\nJDK Proxy vs CGLIB:\n구분   JDK Proxy   CGLIB\n\n대상   인터페이스만   클래스도 가능\n방식   인터페이스 구현   클래스 상속\n제약   인터페이스 필요   final 클래스 불가\n\n사용 사례:\nSpring AOP\n트랜잭션 관리\n로깅, 보안, 캐싱",
    "references": [
      {
        "title": "Dynamic Proxy",
        "url": "https://docs.oracle.com/javase/8/docs/technotes/guides/reflection/proxy.html"
      }
    ]
  },
  {
    "id": "JAVA-033",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Annotation의 동작 원리와 커스텀 Annotation 작성 방법은 무엇인가요?",
    "answer": "Annotation:\n코드에 메타데이터를 부여하는 선언적 방법\n\n동작 원리:\n컴파일 시 또는 런타임에 리플렉션으로 읽음\nRetention 정책에 따라 유지 범위 결정\nAnnotation Processor 또는 리플렉션으로 처리\n\n커스텀 Annotation 작성:\n\n메타 어노테이션:\n어노테이션   설명\n\n@Target   적용 위치 (TYPE, METHOD, FIELD 등)\n@Retention   SOURCE, CLASS, RUNTIME\n@Inherited   상속 시 어노테이션 상속\n@Documented   Javadoc에 포함\n@Repeatable   반복 적용 가능\n\n처리 방법:",
    "references": [
      {
        "title": "Annotations",
        "url": "https://docs.oracle.com/javase/tutorial/java/annotations/index.html"
      }
    ]
  },
  {
    "id": "JAVA-034",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java의 직렬화(Serialization)와 역직렬화에 대해 설명해주세요.",
    "answer": "개념:\n직렬화: 객체를 바이트 스트림으로 변환\n역직렬화: 바이트 스트림을 객체로 복원\n\n사용 방법:\n\ntransient 키워드:\n직렬화에서 제외할 필드에 사용\n역직렬화 시 기본값으로 초기화\n\n주의사항:\n보안 취약점 (원격 코드 실행 위험)\n버전 호환성 (serialVersionUID 필수)\n성능 이슈\n\n대안:\nJSON (Jackson, Gson)\nProtocol Buffers, Avro\nRecord serialization (Java 16+)",
    "references": [
      {
        "title": "Object Serialization",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/specs/serialization/index.html"
      }
    ]
  },
  {
    "id": "JAVA-035",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "serialVersionUID의 역할은 무엇인가요?",
    "answer": "역할:\n직렬화된 객체의 버전을 식별하여 역직렬화 시 클래스 호환성 검증\n\n동작 방식:\n직렬화 시 클래스의 serialVersionUID 저장\n역직렬화 시 현재 클래스의 serialVersionUID와 비교\n불일치 시 InvalidClassException 발생\n\n명시적 선언의 중요성:\n선언 안 하면 컴파일러가 자동 생성 (클래스 구조 기반)\n작은 변경에도 UID가 달라져 역직렬화 실패 위험\nIDE 경고: \"serializable class does not declare a static final serialVersionUID\"\n\n호환성 관리:\n필드 추가: 기본값으로 초기화 (호환)\n필드 삭제: 무시됨 (호환)\n필드 타입 변경: 비호환 (새 UID 필요)\n클래스 계층 변경: 비호환\n\n생성 방법:\nserialver 유틸리티\nIDE 자동 생성\n임의의 long 값 (1L 권장)",
    "references": [
      {
        "title": "Serializable",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/io/Serializable.html"
      }
    ]
  },
  {
    "id": "JAVA-036",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java의 모듈 시스템(Java 9+)에 대해 설명해주세요.",
    "answer": "개념:\nJava 9에서 도입된 JPMS(Java Platform Module System), 프로젝트 Jigsaw\n\n목적:\n강력한 캡슐화 (public이어도 export 안 하면 접근 불가)\n명시적 의존성 선언\nJDK 모듈화 (필요한 것만 포함)\n런타임 이미지 최적화\n\nmodule-info.java:\n\n주요 키워드:\n키워드   설명\n\nrequires   모듈 의존성\nexports   패키지 공개\nopens   리플렉션 접근 허용\nprovides/uses   서비스 로더\n\n장점:\n더 작은 런타임 (jlink로 커스텀 JRE)\n빠른 시작 시간\n보안 강화",
    "references": [
      {
        "title": "Java Module System",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/module/package-summary.html"
      }
    ]
  },
  {
    "id": "JAVA-037",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "var 키워드(Java 10+)의 사용과 제한사항은 무엇인가요?",
    "answer": "개념:\n지역 변수 타입 추론 (Local Variable Type Inference)\n\n사용 예시:\n\n제한사항:\n\n가이드라인:\n타입이 명확할 때 사용 (생성자, 리터럴)\n가독성 저하 시 명시적 타입 선언\n변수명으로 의미 전달",
    "references": [
      {
        "title": "Local Variable Type Inference",
        "url": "https://docs.oracle.com/en/java/javase/17/language/local-variable-type-inference.html"
      }
    ]
  },
  {
    "id": "JAVA-038",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Record 클래스(Java 16+)의 특징과 사용 시나리오를 설명해주세요.",
    "answer": "개념:\n불변 데이터 캐리어를 간결하게 선언하는 클래스 (Java 16 정식)\n\n기본 문법:\n\n특징:\n암묵적으로 final (상속 불가)\n모든 필드 final (불변)\njava.lang.Record 상속\n인터페이스 구현 가능\n\n커스터마이징:\n\n사용 시나리오:\nDTO (Data Transfer Object)\n값 객체 (Value Object)\n다중 반환값\n패턴 매칭과 함께 사용",
    "references": [
      {
        "title": "Record Classes",
        "url": "https://docs.oracle.com/en/java/javase/17/language/records.html"
      }
    ]
  },
  {
    "id": "JAVA-039",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Sealed Class(Java 17+)란 무엇이고 왜 필요한가요?",
    "answer": "개념:\n상속 가능한 클래스를 명시적으로 제한하는 기능 (Java 17 정식)\n\n문법:\n\n하위 클래스 제한자:\n제한자   의미\n\nfinal   더 이상 상속 불가\nsealed   추가 permits로 제한된 상속\nnon-sealed   제한 없이 상속 허용\n\n필요성:\n도메인 모델링: 타입 계층을 완전히 제어\n패턴 매칭: 컴파일러가 모든 케이스 검증 가능 (exhaustiveness)\nAPI 설계: 의도된 확장만 허용\n\n패턴 매칭과 함께:\n\nvs enum:\nSealed: 각 타입이 다른 필드/메서드 가질 수 있음\nEnum: 모든 값이 같은 구조",
    "references": [
      {
        "title": "Sealed Classes",
        "url": "https://docs.oracle.com/en/java/javase/17/language/sealed-classes-and-interfaces.html"
      }
    ]
  },
  {
    "id": "JAVA-040",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Pattern Matching(Java 14+)의 개선사항을 설명해주세요.",
    "answer": "Pattern Matching for instanceof (Java 16)\nPattern Matching for switch (Java 21)\nRecord Pattern (Java 21)\nGuarded Pattern (when 절)\n\n장점:\n보일러플레이트 코드 감소\n타입 안전성 향상\n함수형 스타일 지원",
    "references": [
      {
        "title": "Pattern Matching",
        "url": "https://docs.oracle.com/en/java/javase/17/language/pattern-matching.html"
      }
    ]
  },
  {
    "id": "JAVA-041",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "JVM이 정확히 무엇이고, 어떤 기능을 하는지 설명해 주세요.",
    "answer": "JVM (Java Virtual Machine):\n자바 바이트코드를 해석하고 실행하는 가상 머신\n\n주요 기능:\n플랫폼 독립성: \"Write Once, Run Anywhere\" - OS별 JVM이 바이트코드 실행\n메모리 관리: 자동 메모리 할당 및 GC로 해제\n보안: 바이트코드 검증, 샌드박스 실행\n최적화: JIT 컴파일러로 핫스팟 코드 네이티브 변환\n스레드 관리: 멀티스레딩 지원 및 동기화\n\n실행 흐름:\n\nJVM 구현체:\nOracle HotSpot (가장 널리 사용)\nOpenJ9 (IBM)\nGraalVM (다국어 지원)\nAzul Zulu, Amazon Corretto",
    "references": [
      {
        "title": "JVM Specification",
        "url": "https://docs.oracle.com/javase/specs/jvms/se17/html/index.html"
      }
    ]
  },
  {
    "id": "JAVA-042",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "JVM이 자바 바이트코드를 실행한다면, 자바 말고 다른 언어는 JVM 위에 올릴 수 없나요?",
    "answer": "가능합니다. JVM은 바이트코드를 실행하므로, 바이트코드로 컴파일되는 언어면 모두 실행 가능합니다.\n\nJVM 언어들:\n언어   특징\n\nKotlin   안드로이드 공식 언어, Java 상호운용\nScala   함수형 + 객체지향, 대용량 데이터 처리\nGroovy   동적 타이핑, 스크립팅, Gradle\nClojure   Lisp 계열 함수형 언어\nJRuby   Ruby의 JVM 구현\nJython   Python의 JVM 구현\n\n장점:\nJVM 생태계(라이브러리, 도구) 활용\nJava 클래스와 상호 호출 가능\n성숙한 GC, JIT 최적화 혜택\n크로스 플랫폼\n\n상호운용 예시:",
    "references": [
      {
        "title": "JVM Languages",
        "url": "https://en.wikipedia.org/wiki/List_of_JVM_languages"
      }
    ]
  },
  {
    "id": "JAVA-043",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Kotlin, Scala 등 JVM 언어를 바이트코드가 아닌 네이티브 코드로 일반적으로 컴파일해서 사용할 순 없나요?",
    "answer": "가능합니다. AOT(Ahead-Of-Time) 컴파일을 통해 네이티브 실행 파일로 변환할 수 있습니다.\n\n방법들:\nGraalVM Native Image\n빠른 시작 시간 (밀리초)\n적은 메모리 사용\n단, 빌드 시간 길고 리플렉션 제약\nKotlin Native\nLLVM 기반 네이티브 컴파일\niOS, macOS, Windows, Linux 지원\nJVM 없이 독립 실행\nScala Native\nLLVM 백엔드로 네이티브 컴파일\n\n장점:\nJVM 워밍업 시간 제거\n컨테이너/서버리스에 적합\n배포 크기 감소\n\n단점:\n리플렉션, 동적 기능 제약\n빌드 시간 증가\n일부 라이브러리 호환성 이슈",
    "references": [
      {
        "title": "GraalVM Native Image",
        "url": "https://www.graalvm.org/latest/reference-manual/native-image/"
      }
    ]
  },
  {
    "id": "JAVA-044",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "JVM과 같은 VM(Virtual Machine)을 사용함으로써 얻을 수 있는 장점과 단점에 대해 설명해 주세요.",
    "answer": "장점:\n플랫폼 독립성\n한 번 컴파일, 어디서나 실행\nOS별 코드 수정 불필요\n메모리 관리\n자동 GC로 메모리 누수 감소\n개발자가 메모리 직접 관리 불필요\n보안\n바이트코드 검증\n샌드박스 실행 환경\n런타임 최적화\nJIT 컴파일러가 핫스팟 최적화\n프로파일링 기반 동적 최적화\n풍부한 생태계\n표준 라이브러리, 모니터링 도구\n\n단점:\n성능 오버헤드\n네이티브 코드 대비 느릴 수 있음\n해석 실행 비용\n시작 시간\nJVM 워밍업, 클래스 로딩 시간\n서버리스/CLI에 불리\n메모리 사용량\nJVM 자체 메모리 소비\n객체 헤더 등 오버헤드\nGC 중단 (STW)\n예측 불가능한 지연",
    "references": [
      {
        "title": "JVM Architecture",
        "url": "https://docs.oracle.com/javase/specs/jvms/se17/html/jvms-1.html"
      }
    ]
  },
  {
    "id": "JAVA-045",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "JVM과 내부에서 실행되고 있는 자바 프로그램은 부모 프로세스 - 자식 프로세스 관계를 갖고 있다고 봐도 무방한가요?",
    "answer": "아닙니다. JVM과 Java 프로그램은 부모-자식 프로세스 관계가 아닙니다.\n\n실제 관계:\nJVM은 하나의 프로세스\nJava 프로그램은 그 프로세스 내에서 실행되는 스레드\n즉, 동일 프로세스 내에서 실행됨\n\n프로세스 구조:\n\n부모-자식 프로세스와의 차이:\n구분   부모-자식 프로세스   JVM-Java 프로그램\n\n메모리   독립 (IPC 필요)   공유 (힙, 메서드 영역)\n생명주기   독립적   JVM 종료 시 함께 종료\n관계   fork()   동일 프로세스 내 스레드\n\nRuntime.exec()로 자식 프로세스 생성은 가능:",
    "references": [
      {
        "title": "Process and Thread",
        "url": "https://docs.oracle.com/javase/tutorial/essential/concurrency/procthread.html"
      }
    ]
  },
  {
    "id": "JAVA-046",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "final 키워드를 사용하면, 어떤 이점이 있나요?",
    "answer": "불변성 보장\n변수: 재할당 방지로 실수 예방\n안전한 공유 (멀티스레드에서 동기화 불필요)\n설계 의도 명확화\n클래스: 상속 금지 (예: String, 보안/설계상 이유)\n메서드: 오버라이딩 금지 (템플릿 메서드 패턴)\n성능 최적화 가능성\n컴파일러/JIT 최적화 힌트\n인라이닝 가능성 증가\n람다/익명 클래스 캡처\n지역 변수 캡처 시 effectively final 필요\n\n사용 예:\n\n가이드라인:\n불변 객체 설계 시 적극 활용\n상수는 static final 조합\n변경 의도 없는 지역 변수에 습관적 사용 권장",
    "references": [
      {
        "title": "final Keyword",
        "url": "https://docs.oracle.com/javase/tutorial/java/IandI/final.html"
      }
    ]
  },
  {
    "id": "JAVA-047",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "final 키워드가 불변성과 안전성을 제공한다면, 컴파일 과정에서 final 키워드는 다르게 취급되나요?",
    "answer": "예, 컴파일러가 final을 특별히 처리합니다.\n상수 폴딩 (Constant Folding)\nstatic final 기본형/String은 컴파일 타임 상수\n사용처에 값이 직접 삽입됨 (인라이닝)\n바이트코드 차이\n바이트코드 자체는 유사하지만, JIT 최적화에 영향\nfinal 메서드\ninvokevirtual 대신 더 효율적인 호출 가능\n인라이닝 가능성 증가\nfinal 클래스\n하위 타입 없음 보장 → 최적화 기회\n\n주의:\nstatic final 참조 타입은 상수 폴딩 안 됨\n\n실무 영향:\n큰 성능 차이는 드물지만, JIT 최적화에 힌트 제공\n코드 명확성이 더 중요한 이점",
    "references": [
      {
        "title": "JLS Constant Expressions",
        "url": "https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html#jls-15.29"
      }
    ]
  },
  {
    "id": "JAVA-048",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "인터페이스와 추상 클래스의 차이에 대해 설명해 주세요.",
    "answer": "구분   인터페이스   추상 클래스\n\n다중 상속   가능   불가 (단일 상속)\n생성자   없음   있음\n필드   public static final   모든 종류\n메서드   public abstract + default/static   모든 종류\n접근 제어자   public만   모두 가능\n목적   행위 계약 (can-do)   공통 구현 공유 (is-a)\n\n언제 사용?\n\n인터페이스:\n관련 없는 클래스에 공통 기능 부여\n다중 역할이 필요할 때\nAPI 계약 정의\n\n추상 클래스:\n밀접한 클래스 간 코드 공유\n공통 상태(필드) 필요\n템플릿 메서드 패턴\n\nJava 8+ 변화:\n인터페이스에 default 메서드로 구현 가능해져 차이 줄어듦\n하지만 상태(인스턴스 필드) 여부가 여전히 핵심 차이",
    "references": [
      {
        "title": "Interfaces",
        "url": "https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html"
      }
    ]
  },
  {
    "id": "JAVA-049",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java에서 클래스는 단일 상속만 가능한데, 인터페이스는 2개 이상 구현(implements)이 가능한 이유는 무엇인가요?",
    "answer": "다이아몬드 문제 (Diamond Problem) 회피\n\n클래스 다중 상속의 문제:\n상태(필드)와 구현이 충돌\n어느 부모의 구현을 사용할지 모호\n\n인터페이스가 안전한 이유:\n상태 없음\n인터페이스는 인스턴스 필드가 없음\n상태 충돌 불가능\n메서드 시그니처만 정의 (Java 7까지)\n구현이 없으니 충돌할 것이 없음\nJava 8+ default 메서드 충돌 해결:\n컴파일러가 강제로 오버라이딩 요구\n개발자가 명시적으로 해결\n\n결론:\n클래스 다중 상속은 복잡성과 모호성 유발\n인터페이스는 계약만 정의하므로 안전하게 다중 구현 가능",
    "references": [
      {
        "title": "Multiple Inheritance",
        "url": "https://docs.oracle.com/javase/tutorial/java/IandI/multipleinheritance.html"
      }
    ]
  },
  {
    "id": "JAVA-050",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "리플렉션에 대해 설명해 주세요.",
    "answer": "개념:\n런타임에 클래스의 구조(메서드, 필드, 생성자 등)를 분석하고 조작하는 기능\n\n핵심 클래스:\nClass<?>: 클래스 메타정보\nMethod: 메서드 정보 및 호출\nField: 필드 접근 및 수정\nConstructor: 객체 생성\n\n사용 예:\n\n사용 사례:\n프레임워크 (Spring, Hibernate, JUnit)\n의존성 주입 (DI)\nORM 매핑\n직렬화/역직렬화\nIDE 기능 (자동완성, 리팩토링)",
    "references": [
      {
        "title": "Reflection API",
        "url": "https://docs.oracle.com/javase/tutorial/reflect/index.html"
      }
    ]
  },
  {
    "id": "JAVA-051",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "리플렉션(Reflection)이 런타임에 private 멤버까지 접근할 수 있다면, 보안적인 문제가 있을 가능성이 있는데, 실제로 그렇게 생각하시나요? 만약 그렇다면, 어떻게 방지할 수 있을까요?",
    "answer": "예, 보안 위험이 있습니다.\n\n보안 문제:\n캡슐화 위반: private 필드/메서드 접근 가능\n불변 객체 변경: final 필드도 수정 가능\n접근 제어 무력화: setAccessible(true)로 모든 제한 우회\n악성 코드 실행: 임의 클래스 로드 및 메서드 호출\n\n방지 방법:\nSecurityManager (Java 17 deprecated)\n모듈 시스템 (Java 9+)\nsetAccessible 제한\n모듈 경계에서 기본적으로 차단\n--illegal-access=deny 옵션\n코드 설계\n신뢰할 수 없는 입력으로 Class.forName() 금지\n화이트리스트 기반 클래스 허용\n\n실무 관점:\n내부 프레임워크/라이브러리에서는 필요악\n외부 입력 기반 리플렉션은 위험\nJava 모듈 시스템이 현대적 해결책",
    "references": [
      {
        "title": "Security Manager",
        "url": "https://docs.oracle.com/en/java/javase/17/security/permissions-jdk.html"
      }
    ]
  },
  {
    "id": "JAVA-052",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "리플렉션(Reflection)은 보안 위험이 있음에도 불구하고, 언제 활용할 수 있을까요?",
    "answer": "프레임워크 개발\nSpring DI: @Autowired로 의존성 자동 주입\nJPA/Hibernate: 엔티티 ↔ 테이블 매핑\nJUnit: @Test 메서드 자동 발견 및 실행\n동적 객체 생성\n직렬화/역직렬화\nJackson, Gson이 JSON ↔ 객체 변환 시 사용\n필드명으로 setter/getter 호출\n프록시 생성\nAOP (로깅, 트랜잭션)\nMock 객체 (Mockito)\n어노테이션 처리\nIDE/개발도구\n자동완성, 리팩토링\n디버거\n\n사용 시 주의:\n성능 오버헤드 (캐싱으로 완화)\n컴파일 타임 체크 불가\n꼭 필요한 경우에만 사용",
    "references": [
      {
        "title": "Uses of Reflection",
        "url": "https://docs.oracle.com/javase/tutorial/reflect/index.html"
      }
    ]
  },
  {
    "id": "JAVA-053",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "static class와 static method를 비교해 주세요.",
    "answer": "Static Method:\n\n특징:\n클래스 레벨에 속함\n인스턴스 멤버 접근 불가 (this 없음)\n유틸리티 메서드에 적합\n\n---\n\nStatic Class (Static Nested Class):\n\n특징:\n외부 클래스 인스턴스 없이 생성 가능\n외부 클래스의 인스턴스 멤버 접근 불가\nstatic 멤버만 접근 가능\n\n---\n\n비교:\n\n구분   Static Method   Static Class\n\n대상   메서드   내부 클래스\n인스턴스 필요   호출 시 불필요   생성 시 외부 인스턴스 불필요\n외부 접근   static 멤버만   static 멤버만\n용도   유틸리티 함수   논리적 그룹화, 빌더 패턴\n\n참고: 최상위 클래스는 static 불가 (내부 클래스만 static 가능)",
    "references": [
      {
        "title": "Nested Classes",
        "url": "https://docs.oracle.com/javase/tutorial/java/javaOO/nested.html"
      }
    ]
  },
  {
    "id": "JAVA-054",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java에서 static 을 사용하면 어떤 이점을 얻을 수 있나요? 어떤 제약이 걸릴까요?",
    "answer": "이점:\n메모리 효율\n인스턴스 생성 없이 사용\n모든 인스턴스가 공유 (중복 제거)\n전역 접근\n클래스명으로 어디서든 접근\n유틸리티 메서드에 적합\n상수 정의\n팩토리 메서드\n   \n\n---\n\n제약:\n인스턴스 멤버 접근 불가\n오버라이딩 불가\n다형성 활용 제한\n하위 클래스에서 숨기기(hiding)만 가능\n테스트 어려움\nMock 어려움, 상태 공유로 테스트 격리 문제\n메모리 누수 위험\n클래스 로더 언로드 전까지 유지\n컬렉션에 객체 쌓이면 누수\n멀티스레드 동기화 필요\n공유 상태이므로 동시 접근 주의",
    "references": [
      {
        "title": "Understanding Class Members",
        "url": "https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html"
      }
    ]
  },
  {
    "id": "JAVA-055",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java 컴파일 및 클래스 로딩 과정에서 static 멤버가 어떻게 처리되는지 설명해 주세요.",
    "answer": "컴파일 시:\nstatic 멤버 바이트코드 생성\n메서드 호출: invokestatic 명령어\n필드 접근: getstatic, putstatic 명령어\n상수 폴딩 (static final)\n   \n\n---\n\n클래스 로딩 시:\nMethod Area에 저장\n클래스 메타정보와 함께 static 변수 저장\n모든 인스턴스가 공유\n초기화 순서\nclinit 메서드\n컴파일러가 static 초기화 코드를 모아 <clinit> 생성\n클래스 로딩 시 한 번만 실행\n스레드 안전하게 동기화됨\n\n바이트코드 예:\n\nvs 인스턴스:\n인스턴스: invokevirtual, getfield\nstatic: invokestatic, getstatic",
    "references": [
      {
        "title": "JVM Initialization",
        "url": "https://docs.oracle.com/javase/specs/jvms/se17/html/jvms-5.html#jvms-5.5"
      }
    ]
  },
  {
    "id": "JAVA-056",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java의 Exception에 대해 설명해 주세요.",
    "answer": "예외 계층 구조:\n\nException vs Error:\nException: 애플리케이션 레벨, 처리 가능\nError: JVM/시스템 레벨, 복구 불가\n\n예외 처리:\n\n예외 전파:\n\n목적:\n정상 흐름과 오류 처리 분리\n오류 정보 전달 (메시지, 스택 트레이스)\n적절한 수준에서 처리 가능",
    "references": [
      {
        "title": "Exceptions",
        "url": "https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html"
      }
    ]
  },
  {
    "id": "JAVA-057",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "예외처리를 하는 세 방법에 대해 설명해 주세요.",
    "answer": "예외 복구 (Recovery)\n예외 상황을 복구하고 정상 흐름 진행\n재시도, 대체 값 반환 등\n예외 회피 (Avoidance/Propagation)\n상위 호출자에게 처리 책임 전가\n해당 레이어에서 처리할 수 없을 때\n예외 전환 (Translation)\n저수준 예외를 고수준으로 변환\n추상화 수준 유지, 의미 있는 예외로 변경\n원본 예외를 cause로 포함\n\n선택 기준:\n복구 가능? → 복구\n상위에서 처리해야? → 회피\n더 의미 있는 예외로? → 전환",
    "references": [
      {
        "title": "Catching and Handling Exceptions",
        "url": "https://docs.oracle.com/javase/tutorial/essential/exceptions/handling.html"
      }
    ]
  },
  {
    "id": "JAVA-058",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "CheckedException, UncheckedException 의 차이에 대해 설명해 주세요.",
    "answer": "구분   Checked Exception   Unchecked Exception\n\n상속   Exception (RuntimeException 제외)   RuntimeException\n컴파일 검사   O (try-catch 또는 throws 필수)   X\n발생 시점   예측 가능한 외부 요인   프로그래밍 오류\n복구 가능성   복구 시도 기대   버그 수정 필요\n\nChecked Exception:\nIOException, SQLException, FileNotFoundException\n외부 시스템 오류, 복구 가능\n\nUnchecked Exception:\nNullPointerException, IllegalArgumentException\n프로그래밍 실수, 방어 코딩으로 예방\n\n현대적 관점:\nSpring, JPA는 Unchecked 선호\nChecked는 과도한 보일러플레이트 유발\n중요한 예외만 명시적 처리, 나머지는 전역 핸들러",
    "references": [
      {
        "title": "Checked vs Unchecked",
        "url": "https://docs.oracle.com/javase/tutorial/essential/exceptions/runtime.html"
      }
    ]
  },
  {
    "id": "JAVA-059",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "예외처리가 성능에 큰 영향을 미치나요? 만약 그렇다면, 어떻게 하면 부하를 줄일 수 있을까요?",
    "answer": "성능 영향:\n예, 예외 발생 시 상당한 오버헤드가 있습니다.\n\n비용 발생 원인:\n스택 트레이스 생성: 호출 스택 전체 캡처 (가장 비용 큼)\n예외 객체 생성: 힙 메모리 할당\n스택 언와인딩: catch 블록 탐색\n\n측정:\n정상 흐름 대비 수십~수백 배 느림\nfillInStackTrace()가 대부분의 비용\n\n---\n\n부하 줄이는 방법:\n예외를 제어 흐름으로 사용 금지\n스택 트레이스 생략 (성능 중시 시)\n예외 재사용 (특수 상황)\n예외 발생 조건 사전 검사\n\n결론:\n정상 흐름에서 예외 사용 금지\n예외는 진정한 예외 상황에만",
    "references": [
      {
        "title": "Exception Performance",
        "url": "https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html"
      }
    ]
  },
  {
    "id": "JAVA-060",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Synchronized 키워드에 대해 설명해 주세요.",
    "answer": "개념:\n임계 영역(Critical Section)에 하나의 스레드만 진입하도록 보장하는 키워드\n\n동작 원리:\n모니터 락(Monitor Lock) 기반\n락 획득 → 코드 실행 → 락 해제\n다른 스레드는 락 획득까지 대기 (blocking)\n\n사용 방법:\n\n보장하는 것:\n상호 배제: 한 번에 한 스레드만\n가시성: 락 해제 시 변경사항 다른 스레드에 보임\nHappens-Before: 락 해제 → 락 획득 순서 보장\n\n특징:\n재진입 가능 (같은 스레드가 락을 다시 획득 가능)\n자동 락 해제 (예외 발생해도)",
    "references": [
      {
        "title": "Synchronized Methods",
        "url": "https://docs.oracle.com/javase/tutorial/essential/concurrency/syncmeth.html"
      }
    ]
  },
  {
    "id": "JAVA-061",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Synchronized 키워드가 어디에 붙는지에 따라 의미가 약간씩 변화하는데, 각각 어떤 의미를 갖게 되는지 설명해 주세요.",
    "answer": "인스턴스 메서드\n락 객체: this (현재 인스턴스)\n같은 인스턴스의 synchronized 메서드끼리 상호 배제\n다른 인스턴스는 동시 실행 가능\n정적 메서드\n락 객체: Class 객체 (MyClass.class)\n모든 인스턴스에서 상호 배제\n인스턴스 메서드와는 다른 락\nsynchronized 블록\n락 객체: 명시한 객체\n세밀한 제어 가능\n필요한 부분만 동기화\n\n주의:\n\n권장:\n메서드 전체보다 블록 동기화 선호 (범위 최소화)\nprivate final 락 객체 사용",
    "references": [
      {
        "title": "Intrinsic Locks",
        "url": "https://docs.oracle.com/javase/tutorial/essential/concurrency/locksync.html"
      }
    ]
  },
  {
    "id": "JAVA-062",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "효율적인 코드 작성 측면에서, Synchronized는 좋은 키워드일까요?",
    "answer": "장점:\n사용이 간단하고 직관적\n자동 락 해제 (예외 시에도)\n재진입 가능\nJVM 최적화 (바이어스 락, 경량 락)\n\n단점:\n유연성 부족\ntryLock (타임아웃) 불가\n공정성 설정 불가\n조건 분기 어려움\n성능 제한\n읽기-읽기도 블로킹\n블록 단위로만 해제\n데드락 위험\n락 순서 제어 어려움\n대기 중 인터럽트 불가\n\n언제 사용?\n단순한 동기화\n짧은 임계 영역\n복잡한 동기화 불필요 시\n\n대안 고려:\n\n결론:\n단순한 케이스에는 충분히 좋음\n복잡한 동기화는 java.util.concurrent 활용",
    "references": [
      {
        "title": "High Level Concurrency",
        "url": "https://docs.oracle.com/javase/tutorial/essential/concurrency/highlevel.html"
      }
    ]
  },
  {
    "id": "JAVA-063",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Synchronized 를 대체할 수 있는 자바의 다른 동기화 기법에 대해 설명해 주세요.",
    "answer": "ReentrantLock\n명시적 락/언락\ntryLock, 인터럽트 지원\n공정성 설정 가능\nReadWriteLock\n읽기 작업 많을 때 성능 향상\nAtomic 클래스\n락 프리(Lock-free)\n단일 변수 원자적 연산\nvolatile\n가시성 보장\n단순 읽기/쓰기만 원자적\nStampedLock (Java 8+)\n낙관적 읽기 지원\n높은 성능\n\n선택 기준:\n상황   권장\n\n단순 동기화   synchronized\n복잡한 제어   ReentrantLock\n읽기 위주   ReadWriteLock\n단일 변수   Atomic",
    "references": [
      {
        "title": "Lock Objects",
        "url": "https://docs.oracle.com/javase/tutorial/essential/concurrency/newlocks.html"
      }
    ]
  },
  {
    "id": "JAVA-064",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Thread Local에 대해 설명해 주세요.",
    "answer": "개념:\n각 스레드가 독립적인 변수 복사본을 가지게 하는 클래스\n\n사용법:\n\n동작 원리:\n각 Thread 내부에 ThreadLocalMap 존재\nThreadLocal 객체를 키로, 값을 저장\n스레드별 격리된 저장 공간\n\n사용 사례:\n사용자 세션/인증 정보 (SecurityContextHolder)\n트랜잭션 컨텍스트\n포맷터 (SimpleDateFormat - 스레드 안전하지 않음)\n요청별 로깅 컨텍스트\n\n주의사항:\n스레드 풀 환경에서 remove() 안 하면 메모리 누수\n이전 요청 데이터가 남아 보안 문제 가능\n\nInheritableThreadLocal:\n자식 스레드에 값 상속",
    "references": [
      {
        "title": "ThreadLocal",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/ThreadLocal.html"
      }
    ]
  },
  {
    "id": "JAVA-065",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java Stream에 대해 설명해 주세요.",
    "answer": "개념:\n데이터 컬렉션을 선언적으로 처리하는 API (Java 8+)\n\n특징:\n데이터 소스를 변경하지 않음 (불변)\n일회용 (한 번 사용 후 재사용 불가)\n지연 평가 (Lazy Evaluation)\n내부 반복 (명시적 루프 없음)\n\n구조:\n\n중간 연산:\nfilter, map, flatMap, sorted, distinct, limit, skip\n지연 평가됨 (최종 연산 전까지 실행 안 함)\n\n최종 연산:\ncollect, forEach, reduce, count, findFirst, anyMatch\n실행을 트리거하고 결과 반환\n\n장점:\n가독성 향상 (선언적)\n병렬 처리 쉬움 (parallelStream)\n파이프라인 최적화\n\n주의:\n부작용(side-effect) 피하기\n무한 스트림 주의 (limit 필수)",
    "references": [
      {
        "title": "Stream API",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/stream/Stream.html"
      }
    ]
  },
  {
    "id": "JAVA-066",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Stream과 for ~ loop의 성능 차이를 비교해 주세요,",
    "answer": "일반적 성능 비교:\n\n구분   for-loop   Stream\n\n단순 반복   빠름   약간 느림\n복잡한 파이프라인   유사   유사\n병렬 처리   직접 구현   parallelStream\nJIT 최적화   최적화됨   추가 오버헤드\n\nStream 오버헤드 원인:\n람다 호출 비용\n중간 객체 생성 (박싱/언박싱)\n파이프라인 구축 비용\n\n성능 차이 예:\n\n실무 관점:\n성능 차이는 대부분 미미 (1.5~2배)\n가독성과 유지보수성이 더 중요\n핫 코드에서만 최적화 고려\n\nStream이 유리한 경우:\n복잡한 데이터 변환\n병렬 처리 필요\n가독성 중시\n\nfor-loop이 유리한 경우:\n단순 반복\n극한의 성능 필요\n조기 종료가 복잡할 때\n\n결론: 대부분 Stream 사용, 성능 이슈 시 프로파일링 후 판단",
    "references": [
      {
        "title": "Stream Performance",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/stream/package-summary.html"
      }
    ]
  },
  {
    "id": "JAVA-067",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Stream은 병렬처리 할 수 있나요?",
    "answer": "예, parallelStream으로 병렬 처리 가능합니다.\n\n동작 원리:\nForkJoinPool.commonPool() 사용\n데이터를 분할(split)하여 병렬 처리\n결과를 결합(combine)\n\n효과적인 경우:\n대용량 데이터\n요소당 처리 비용이 높은 연산\n독립적인 연산 (상태 없음)\n분할하기 좋은 소스 (배열, ArrayList)\n\n비효율적인 경우:\n작은 데이터셋 (오버헤드 > 이득)\n순서 의존적 연산\n공유 상태 접근\nLinkedList (분할 비용 높음)\nI/O 작업 (블로킹)\n\n주의사항:",
    "references": [
      {
        "title": "Parallelism",
        "url": "https://docs.oracle.com/javase/tutorial/collections/streams/parallelism.html"
      }
    ]
  },
  {
    "id": "JAVA-068",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Stream에서 사용할 수 있는 함수형 인터페이스에 대해 설명해 주세요.",
    "answer": "주요 함수형 인터페이스:\n\n인터페이스   메서드   용도   Stream 메서드\n\nPredicate<T>   boolean test(T)   조건 검사   filter\nFunction<T,R>   R apply(T)   변환   map\nConsumer<T>   void accept(T)   소비   forEach\nSupplier<T>   T get()   생성   generate\nBiFunction<T,U,R>   R apply(T,U)   이항 변환   reduce\nBinaryOperator<T>   T apply(T,T)   같은 타입 결합   reduce\nUnaryOperator<T>   T apply(T)   같은 타입 변환   iterate\n\n사용 예:\n\n기본형 특화 (박싱 회피):\nIntPredicate, LongFunction, DoubleConsumer\nToIntFunction, ToDoubleFunction",
    "references": [
      {
        "title": "java.util.function",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/package-summary.html"
      }
    ]
  },
  {
    "id": "JAVA-069",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "가끔 외부 변수를 사용할 때, final 키워드를 붙여서 사용하는데 왜 그럴까요? 꼭 그래야 할까요?",
    "answer": "이유: Effectively Final 규칙\n\n람다나 익명 클래스에서 외부 지역 변수를 캡처할 때, 해당 변수는 final이거나 effectively final이어야 합니다.\n\neffectively final:\nfinal 키워드는 없지만 값이 변경되지 않는 변수\nJava 8부터 명시적 final 불필요\n\n왜 이런 제약이 있을까?\n값 캡처: 람다는 변수의 복사본을 캡처\n동시성 안전: 람다가 다른 스레드에서 실행될 수 있음\n혼란 방지: 외부 변수 변경 시 어느 값이 캡처되었는지 불명확\n\n우회 방법:\n\n결론:\n명시적 final은 선택 (가독성 위해 권장)\n변수 값을 변경하면 컴파일 에러",
    "references": [
      {
        "title": "Lambda Expressions",
        "url": "https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html"
      }
    ]
  },
  {
    "id": "JAVA-070",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java의 GC에 대해 설명해 주세요.",
    "answer": "개념:\nGarbage Collection - 사용하지 않는 객체의 메모리를 자동으로 해제하는 JVM 기능\n\n동작 원리 (Mark & Sweep):\nMark: GC Root에서 참조 가능한 객체를 마킹\nSweep: 마킹되지 않은 객체를 제거\nCompact: 메모리 단편화 방지를 위해 압축 (선택적)\n\nGC Root:\nStack의 지역 변수\nStatic 변수\nJNI 참조\n실행 중인 스레드\n\n세대별 GC (Generational GC):\nYoung Generation: 새 객체, Minor GC (빈번, 빠름)\nEden: 객체 최초 생성\nSurvivor (S0, S1): Eden에서 살아남은 객체\nOld Generation: 오래 살아남은 객체, Major GC (드묾, 느림)\n\nGC 종류:\nGC   특징\n\nSerial   단일 스레드, 소규모\nParallel   멀티 스레드, 처리량 최적화\nG1   Region 기반, Java 9+ 기본\nZGC   초저지연 (< 10ms)",
    "references": [
      {
        "title": "Garbage Collection",
        "url": "https://docs.oracle.com/en/java/javase/17/gctuning/introduction-garbage-collection-tuning.html"
      }
    ]
  },
  {
    "id": "JAVA-071",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "finalize() 를 수동으로 호출하는 것은 왜 문제가 될 수 있을까요?",
    "answer": "finalize()란:\nObject 클래스의 메서드\nGC가 객체 수거 전 호출 (Java 9부터 deprecated)\n\n문제점:\n실행 보장 없음\nGC가 언제 실행될지 모름\nfinalize()가 호출 안 될 수도 있음\n성능 저하\nfinalize()가 있는 객체는 별도 큐에서 관리\n최소 2번의 GC 사이클 필요\n객체 수명 연장\n예외 무시\nfinalize()에서 발생한 예외는 무시됨\n디버깅 어려움\n부활 가능 (Resurrection)\n순서 보장 없음\n어떤 순서로 호출될지 불명확\n스레드 안전성 문제\nFinalizer 스레드에서 실행\n\n대안:",
    "references": [
      {
        "title": "Effective Java - Avoid finalizers",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#finalize("
      }
    ]
  },
  {
    "id": "JAVA-072",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "어떤 변수의 값이 null이 되었다면, 이 값은 GC가 될 가능성이 있을까요?",
    "answer": "가능성은 있지만, 보장되지 않습니다.\n\nGC 대상이 되려면:\n객체가 어떤 GC Root에서도 도달 불가능(unreachable)해야 함\n\nnull 할당만으로는 불충분한 경우:\n다른 참조가 존재\n컬렉션에 포함\n클로저에 캡처\n\nGC 대상이 되는 경우:\n\n주의:\nGC 시점은 JVM이 결정\nSystem.gc()는 힌트일 뿐, 강제 아님\nnull 할당보다 스코프를 좁히는 것이 좋은 습관",
    "references": [
      {
        "title": "Memory Management",
        "url": "https://docs.oracle.com/javase/specs/jls/se17/html/jls-12.html#jls-12.6"
      }
    ]
  },
  {
    "id": "JAVA-073",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "equals()와 hashcode()에 대해 설명해 주세요.",
    "answer": "equals():\n두 객체의 논리적 동등성을 비교\n\nhashCode():\n객체를 해시 기반 컬렉션에서 사용하기 위한 정수값 반환\n\n계약 (Contract):\nequals()가 true면 hashCode()도 같아야 함 (필수!)\nhashCode()가 같아도 equals()는 다를 수 있음\nequals()가 false여도 hashCode()는 같을 수 있음 (충돌)\n\n위반 시 문제:\n\n해시 기반 컬렉션 동작:\nhashCode()로 버킷 찾기\n버킷 내에서 equals()로 비교",
    "references": [
      {
        "title": "Object.equals()",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object"
      }
    ]
  },
  {
    "id": "JAVA-074",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "본인이 hashcode() 를 정의해야 한다면, 어떤 점을 염두에 두고 구현할 것 같으세요?",
    "answer": "구현 원칙:\nequals()와 일관성\nequals()에 사용된 필드만 hashCode()에 사용\nequals()가 true면 hashCode()도 같아야 함\n좋은 분산\n해시 충돌 최소화\n다른 객체는 다른 해시값을 가지도록\n불변 필드 사용\n가변 필드 사용 시 컬렉션에서 문제\n\n구현 방법:\n\n권장: Objects.hash() 사용\n\n수동 구현 (성능 중시):\n\n왜 31인가?\n소수: 분산 좋음\n31  i == (i << 5) - i: JVM 최적화\n\n주의:\nnull 필드 처리 (0 또는 무시)\n배열: Arrays.hashCode() 사용\n캐싱 고려 (불변 객체에서)",
    "references": [
      {
        "title": "Objects.hash()",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Objects.html#hash(java.lang.Object..."
      }
    ]
  },
  {
    "id": "JAVA-075",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "Java에서 equals() 메서드를 재정의해야 할 때, 어떤 점을 염두에 두어야 하는지 설명해 주세요.",
    "answer": "equals() 규약 (5가지):\n반사성 (Reflexive)\n대칭성 (Symmetric)\n추이성 (Transitive)\n일관성 (Consistent)\n객체 변경 없으면 항상 같은 결과\nnull 비교\n\n구현 패턴:\n\n주의사항:\ngetClass() vs instanceof: 상속 시 행동 다름\n부동소수점: Float.compare(), Double.compare() 사용\nhashCode()도 함께 재정의\n상속 시 대칭성 주의\n\nLombok/IDE 활용:",
    "references": [
      {
        "title": "Effective Java - equals",
        "url": "https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object"
      }
    ]
  },
  {
    "id": "JS-001",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "JavaScript의 데이터 타입에 대해 설명해주세요.",
    "answer": "원시 타입 (Primitive, 7가지):\n\n타입   설명   예시\n\nnumber   정수/실수 (64비트 부동소수점)   42, 3.14, NaN, Infinity\nstring   문자열   'hello', \"world\", \\template\\\nboolean   논리값   true, false\nnull   의도적 빈 값   null\nundefined   미정의 값   undefined\nsymbol   고유 식별자 (ES6)   Symbol('id')\nbigint   큰 정수 (ES2020)   9007199254740991n\n\n참조 타입 (Reference):\nObject, Array, Function, Date, RegExp, Map, Set 등\n\n타입 확인:\n\n원시 vs 참조:\n원시: 값 복사, 불변\n참조: 주소 복사, 가변\n\n특수 값 주의:",
    "references": [
      {
        "title": "Data Types",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures"
      }
    ]
  },
  {
    "id": "JS-002",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "var, let, const의 차이점과 호이스팅에 대해 설명해주세요.",
    "answer": "구분   var   let   const\n\n스코프   함수 스코프   블록 스코프   블록 스코프\n재선언   가능   불가   불가\n재할당   가능   가능   불가\n호이스팅   O (undefined)   O (TDZ)   O (TDZ)\n\n호이스팅 (Hoisting):\n선언이 스코프 최상단으로 끌어올려지는 것처럼 동작\n\nTDZ (Temporal Dead Zone):\n스코프 시작 ~ 변수 선언까지의 구간\n이 구간에서 접근 시 ReferenceError\n\n권장사항:\nconst 기본 사용\n재할당 필요시 let\nvar 사용 지양",
    "references": [
      {
        "title": "let",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let"
      }
    ]
  },
  {
    "id": "JS-003",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "실행 컨텍스트와 스코프 체인에 대해 설명해주세요.",
    "answer": "실행 컨텍스트 (Execution Context):\n코드 실행에 필요한 환경 정보를 담은 객체\n\n구성 요소:\nVariable Environment: 변수/함수 선언, 호이스팅\nLexical Environment: 현재 환경 + 외부 환경 참조\nThis Binding: this 값\n\n종류:\nGlobal Execution Context (전역)\nFunction Execution Context (함수 호출마다)\nEval Execution Context\n\n콜 스택:\n\n---\n\n스코프 체인 (Scope Chain):\n변수를 찾기 위해 현재 스코프 → 상위 스코프 → 전역까지 탐색\n\n렉시컬 스코프:\n함수 정의 시점의 스코프가 기준\n호출 위치가 아닌 선언 위치 기준",
    "references": [
      {
        "title": "Closures",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"
      }
    ]
  },
  {
    "id": "JS-004",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "JavaScript의 렉시컬 스코프와 관련하여, 클로저(Closure)란 무엇이고 어떻게 활용할 수 있나요?",
    "answer": "클로저:\n함수가 자신이 선언된 렉시컬 환경을 기억하여, 외부 함수 실행이 끝나도 외부 변수에 접근 가능한 것\n\n활용 사례:\n데이터 은닉 (캡슐화)\n함수 팩토리\n이벤트 핸들러\n커링\n\n주의:\n메모리 누수 가능 (불필요한 참조 유지)\n루프에서 var 사용 시 클로저 문제:",
    "references": [
      {
        "title": "Closures",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"
      }
    ]
  },
  {
    "id": "JS-005",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "this 바인딩의 종류와 동작 원리를 설명해주세요.",
    "answer": "this는 함수 호출 방식에 따라 결정됩니다.\n기본 바인딩 (단독 호출)\n암시적 바인딩 (메서드 호출)\n명시적 바인딩 (call, apply, bind)\nnew 바인딩\n화살표 함수 (렉시컬 this)\n\n우선순위:\nnew > 명시적(bind) > 암시적 > 기본\n\n주의: this 소실",
    "references": [
      {
        "title": "this",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this"
      }
    ]
  },
  {
    "id": "JS-006",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "this 바인딩 관점에서 화살표 함수와 일반 함수의 차이점은 무엇인가요?",
    "answer": "구분   일반 함수   화살표 함수\n\nthis   호출 방식에 따라 결정   렉시컬 (선언 시점)\narguments   있음   없음\nnew 가능   가능   불가\nprototype   있음   없음\n생성자   가능   불가\n\nthis 차이:\n\narguments 없음:\n\n생성자 불가:\n\n화살표 함수 적합한 경우:\n콜백 함수 (map, filter 등)\nthis를 바인딩하지 않아야 할 때\n\n일반 함수 적합한 경우:\n메서드 정의\n생성자 함수\narguments 필요 시",
    "references": [
      {
        "title": "Arrow Functions",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions"
      }
    ]
  },
  {
    "id": "JS-007",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "프로토타입 체인과 상속에 대해 설명해주세요.",
    "answer": "프로토타입:\n모든 객체는 [[Prototype]] 내부 슬롯을 가지며, 다른 객체를 참조\n\n프로토타입 체인:\n객체의 프로퍼티 접근 시 해당 객체 → [[Prototype]] → ... → null 까지 탐색\n\n프로토타입 접근:\n\n프로토타입 상속:\n\nES6 Class로 동일 구현:",
    "references": [
      {
        "title": "Inheritance",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain"
      }
    ]
  },
  {
    "id": "JS-008",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "ES6 Class 문법과 기존 프로토타입 기반 상속의 차이점은 무엇인가요?",
    "answer": "핵심: Class는 프로토타입의 문법적 설탕(Syntactic Sugar)\n\n내부적으로 동일:\n\n차이점:\n\n구분   프로토타입   Class\n\n호이스팅   함수 호이스팅   TDZ 존재\nnew 없이 호출   가능 (this = window)   TypeError\nstrict mode   선택   항상 적용\n메서드 열거   enumerable: true   enumerable: false\n상속 문법   복잡   extends 간단\n\nClass 추가 기능:\n\n상속 비교:",
    "references": [
      {
        "title": "Classes",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes"
      }
    ]
  },
  {
    "id": "JS-009",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "Promise의 동작 원리와 상태에 대해 설명해주세요.",
    "answer": "Promise:\n비동기 작업의 완료/실패를 나타내는 객체\n\n3가지 상태:\nPending: 초기 상태, 대기 중\nFulfilled: 성공 완료\nRejected: 실패\n\n한 번 결정되면 변경 불가 (settled)\n\n생성과 사용:\n\n체이닝:\n\n정적 메서드:",
    "references": [
      {
        "title": "Promise",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
      }
    ]
  },
  {
    "id": "JS-010",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "async/await 문법과 Promise 체이닝(.then)의 차이점은 무엇인가요?",
    "answer": "async/await:\nPromise를 더 직관적으로 사용하기 위한 문법 (ES2017)\n\n비교:\n\n차이점:\n\n구분   Promise   async/await\n\n문법   체이닝 (.then)   동기식 스타일\n에러 처리   .catch()   try/catch\n디버깅   스택 추적 어려움   명확한 스택\n조건부 로직   복잡   직관적\n\nasync 함수 특징:\n항상 Promise 반환\nawait는 async 함수 내에서만 사용 (Top-level await 제외)\n\n병렬 실행:\n\n주의:\nforEach에서 await 사용 시 의도대로 동작 안 함\nfor...of 또는 map + Promise.all 사용",
    "references": [
      {
        "title": "async/await",
        "url": "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises"
      }
    ]
  },
  {
    "id": "JS-011",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "이벤트 루프(Event Loop)의 동작 원리를 설명해주세요.",
    "answer": "이벤트 루프:\nJavaScript의 단일 스레드에서 비동기 처리를 가능하게 하는 메커니즘\n\n구성 요소:\n\n동작 순서:\nCall Stack의 모든 동기 코드 실행\nStack이 비면 Microtask Queue 전부 처리\nMacrotask Queue에서 하나 실행\n다시 Microtask Queue 확인\n반복\n\n예시:\n\nMicrotask가 우선:\nPromise.then/catch/finally\nqueueMicrotask()\nMutationObserver\n\nMacrotask:\nsetTimeout, setInterval\nI/O, UI 렌더링",
    "references": [
      {
        "title": "Event Loop",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop"
      }
    ]
  },
  {
    "id": "JS-012",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "이벤트 루프에서 처리되는 마이크로태스크(Microtask)와 매크로태스크(Macrotask)의 차이점은 무엇인가요?",
    "answer": "구분   Microtask   Macrotask\n\n우선순위   높음   낮음\n실행 시점   Stack 비우고 즉시   Microtask 후\n처리 방식   큐 전체 비움   하나씩\n\nMicrotask 예:\nPromise.then/catch/finally\nqueueMicrotask()\nMutationObserver\nprocess.nextTick() (Node.js)\n\nMacrotask (Task) 예:\nsetTimeout / setInterval\nsetImmediate (Node.js)\nI/O 작업\nUI 렌더링\nrequestAnimationFrame\n\n실행 순서:\n\n핵심 차이:\nMicrotask: 현재 작업 직후, 모든 Microtask 처리\nMacrotask: Microtask 전부 처리 후 하나씩\n\n주의:\nMicrotask 무한 루프 시 UI 블로킹\n무거운 작업은 Macrotask로 분할",
    "references": [
      {
        "title": "Microtasks",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide"
      }
    ]
  },
  {
    "id": "JS-013",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "디바운싱(Debouncing)과 스로틀링(Throttling)의 차이와 구현 방법은 무엇인가요?",
    "answer": "디바운싱 (Debouncing):\n연속된 이벤트 중 마지막 이벤트만 처리 (일정 시간 후)\n\n스로틀링 (Throttling):\n일정 시간 간격으로 최대 한 번만 실행\n\n비교:\n구분   Debounce   Throttle\n\n실행 시점   마지막 이벤트 후   일정 간격마다\n사용 예   검색 자동완성, resize 후   스크롤, 마우스 이동\n특징   지연 실행   주기적 실행\n\n사용 시나리오:\nDebounce: 입력 완료 후 처리 (검색, 폼 검증)\nThrottle: 지속적 이벤트 제한 (스크롤, 드래그)",
    "references": [
      {
        "title": "Debounce and Throttle",
        "url": "https://developer.mozilla.org/en-US/docs/Glossary/Debounce"
      }
    ]
  },
  {
    "id": "JS-014",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "얕은 복사와 깊은 복사의 차이점과 구현 방법은 무엇인가요?",
    "answer": "얕은 복사 (Shallow Copy):\n1단계 프로퍼티만 복사, 중첩 객체는 참조 공유\n\n깊은 복사 (Deep Copy):\n모든 레벨의 프로퍼티를 재귀적으로 복사\n\n비교:\n구분   얕은 복사   깊은 복사\n\n중첩 객체   참조 공유   새로 생성\n성능   빠름   느림\n사용   단순 객체   복잡한 객체",
    "references": [
      {
        "title": "structuredClone",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/structuredClone"
      }
    ]
  },
  {
    "id": "JS-015",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "구조 분해 할당(Destructuring)에 대해 설명해주세요.",
    "answer": "구조 분해 할당:\n배열이나 객체의 값을 개별 변수로 추출\n\n객체 구조 분해:\n\n배열 구조 분해:\n\n함수 파라미터:\n\n활용:\nAPI 응답 처리\n설정 객체 추출\n다중 반환값 처리",
    "references": [
      {
        "title": "Destructuring",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment"
      }
    ]
  },
  {
    "id": "JS-016",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "같은 `...` 문법을 사용하는 스프레드 연산자(Spread)와 레스트 파라미터(Rest)의 차이점은 무엇인가요?",
    "answer": "둘 다 ... 문법을 사용하지만 반대 방향으로 동작합니다.\n\n스프레드 (Spread): 펼치기\n\n레스트 (Rest): 모으기\n\n비교:\n구분   Spread   Rest\n\n방향   펼침 (확장)   모음 (수집)\n위치   배열/객체/호출 시   함수 선언/구조분해 시\n용도   복사, 병합, 전달   가변 인자 수집\n\n주의:\nRest는 항상 마지막에 위치해야 함\nfunction fn(...a, b) {} // SyntaxError",
    "references": [
      {
        "title": "Spread",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax"
      }
    ]
  },
  {
    "id": "JS-017",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "Map과 Object의 차이점은 무엇인가요?",
    "answer": "구분   Object   Map\n\n키 타입   문자열/Symbol만   모든 타입\n순서 보장   ES2015부터 부분적   삽입 순서 보장\n크기 확인   Object.keys().length   map.size\n반복   for...in, Object.keys   for...of, forEach\n성능   삽입/삭제 느림   빈번한 추가/삭제에 최적화\n프로토타입   있음 (주의 필요)   없음\n\nMap 사용:\n\nObject vs Map 선택:\n\nObject 권장:\nJSON 직렬화 필요\n메서드/로직 포함\n간단한 레코드 구조\n\nMap 권장:\n키가 문자열이 아닌 경우\n빈번한 추가/삭제\n키-값 쌍 순회 필요\n크기를 자주 확인",
    "references": [
      {
        "title": "Map",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
      }
    ]
  },
  {
    "id": "JS-018",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "Set/Map과 WeakSet/WeakMap의 약한 참조(Weak Reference) 차이점을 설명해주세요.",
    "answer": "Weak- 버전의 핵심: 약한 참조 (Weak Reference)\nGC가 다른 참조 없으면 수거 가능\n메모리 누수 방지\n\n구분   Set/Map   WeakSet/WeakMap\n\n키/값 타입   모든 타입   객체만\n참조   강한 참조   약한 참조\n반복   가능   불가 (iterable X)\nsize   있음   없음\nGC   참조 유지   자동 제거 가능\n\nWeakMap 예:\n\nWeakSet 예:\n\n사용 사례:\n\nWeakMap:\n객체에 private 데이터 연결\nDOM 노드에 메타데이터 저장\n캐싱 (메모리 자동 정리)\n\nWeakSet:\n객체 방문 여부 추적\n순환 참조 감지",
    "references": [
      {
        "title": "WeakMap",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap"
      }
    ]
  },
  {
    "id": "JS-019",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "Symbol의 용도와 사용 방법을 설명해주세요.",
    "answer": "Symbol:\n고유하고 변경 불가능한 원시 타입 (ES6)\n\n주요 용도:\n객체의 고유 프로퍼티 키\n이름 충돌 방지\nWell-Known Symbols (내장 심볼)\n\nSymbol.for() - 전역 심볼:\n\nWell-Known Symbols:\nSymbol.iterator, Symbol.asyncIterator\nSymbol.toStringTag, Symbol.toPrimitive\nSymbol.hasInstance, Symbol.species",
    "references": [
      {
        "title": "Symbol",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol"
      }
    ]
  },
  {
    "id": "JS-020",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "Proxy와 Reflect API에 대해 설명해주세요.",
    "answer": "Proxy:\n객체 기본 동작(읽기, 쓰기, 열거 등)을 가로채서 커스터마이징\n\n주요 트랩 (Handler 메서드):\nget, set, has (in 연산자)\ndeleteProperty, apply (함수 호출)\nconstruct (new), ownKeys\n\nReflect:\n객체 조작을 위한 메서드 모음 (Proxy 트랩과 1:1 대응)\n\n활용 사례:\n유효성 검사\n반응형 시스템 (Vue 3)",
    "references": [
      {
        "title": "Proxy",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy"
      }
    ]
  },
  {
    "id": "JS-021",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "Generator 함수와 Iterator의 동작 원리를 설명해주세요.",
    "answer": "Iterator:\n순차적 접근을 위한 프로토콜\n\nIterable 프로토콜:\n\n---\n\nGenerator:\n일시 중지/재개 가능한 함수 (Iterator 자동 생성)\n\nyield 양방향 통신:\n\n활용:\n지연 평가 (무한 시퀀스)\nasync/await 이전의 비동기 처리 (co 라이브러리)\n상태 머신",
    "references": [
      {
        "title": "Generator",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator"
      }
    ]
  },
  {
    "id": "JS-022",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "모듈 시스템(CommonJS, ES6 Module)의 차이점은 무엇인가요?",
    "answer": "구분   CommonJS   ES Module\n\n문법   require/module.exports   import/export\n로딩   동기 (런타임)   비동기 (컴파일 타임)\n환경   Node.js 기본   브라우저, Node.js\n트리쉐이킹   어려움   가능\n바인딩   값 복사   라이브 바인딩\n\nCommonJS:\n\nES Module:\n\n라이브 바인딩 차이:\n\nNode.js에서 ESM:\npackage.json에 \"type\": \"module\"\n또는 .mjs 확장자",
    "references": [
      {
        "title": "Modules",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"
      }
    ]
  },
  {
    "id": "JS-023",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "TypeScript의 타입 시스템에 대해 설명해주세요.",
    "answer": "TypeScript:\nJavaScript에 정적 타입을 추가한 상위 집합 (Superset)\n\n기본 타입:\n\n특수 타입:\n\n타입 정의:\n\n구조적 타이핑 (Structural Typing):\n\n장점:\n컴파일 타임 오류 발견\nIDE 자동완성/리팩토링\n문서화 효과",
    "references": [
      {
        "title": "TypeScript Handbook",
        "url": "https://www.typescriptlang.org/docs/handbook/intro.html"
      }
    ]
  },
  {
    "id": "JS-024",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "TypeScript의 타입을 파라미터화하는 제네릭(Generic) 사용 방법과 제약사항은 무엇인가요?",
    "answer": "제네릭:\n타입을 파라미터화하여 재사용 가능한 컴포넌트 작성\n\n기본 사용:\n\n제약조건 (Constraints):\n\n다중 타입 파라미터:\n\n기본값:\n\n제약사항:\n런타임에 타입 정보 없음 (타입 소거)\nnew T() 직접 불가",
    "references": [
      {
        "title": "Generics",
        "url": "https://www.typescriptlang.org/docs/handbook/2/generics.html"
      }
    ]
  },
  {
    "id": "JS-025",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "TypeScript의 Union Type과 Intersection Type의 차이점과 활용 방법은 무엇인가요?",
    "answer": "Union Type (|): 또는\n여러 타입 중 하나\n\nIntersection Type (&): 그리고\n여러 타입을 모두 만족\n\n비교:\n\n실무 활용:",
    "references": [
      {
        "title": "Union and Intersection Types",
        "url": "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types"
      }
    ]
  },
  {
    "id": "JS-026",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "Union Type 사용 시 런타임에 타입을 좁히는 TypeScript의 타입 가드(Type Guard) 종류와 사용 방법을 설명해주세요.",
    "answer": "타입 가드:\n런타임에 타입을 좁히는(narrowing) 표현식\ntypeof 가드\ninstanceof 가드\nin 연산자\n사용자 정의 타입 가드\nDiscriminated Union",
    "references": [
      {
        "title": "Narrowing",
        "url": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html"
      }
    ]
  },
  {
    "id": "JS-027",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "TypeScript의 기존 타입을 변환하는 유틸리티 타입(Partial, Pick, Omit 등)에 대해 설명해주세요.",
    "answer": "유틸리티 타입:\n기존 타입을 변환하여 새 타입 생성\n\nPartial<T>: 모든 속성 선택적\n\nRequired<T>: 모든 속성 필수\n\nPick<T, K>: 특정 속성만 선택\n\nOmit<T, K>: 특정 속성 제외\n\nRecord<K, T>: 키-값 타입 생성\n\nReadonly<T>: 모든 속성 읽기 전용\n\n기타:",
    "references": [
      {
        "title": "Utility Types",
        "url": "https://www.typescriptlang.org/docs/handbook/utility-types.html"
      }
    ]
  },
  {
    "id": "JS-028",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "TypeScript의 never 타입은 언제 사용하나요?",
    "answer": "never:\n절대 발생하지 않는 값의 타입\n\n사용 사례:\n절대 반환하지 않는 함수\n완전성 검사 (Exhaustiveness Check)\n타입 좁히기 결과\n불가능한 타입 표현\n\nnever vs void:\nvoid: 값이 없음 (undefined 반환 가능)\nnever: 값이 절대 없음 (반환 자체가 없음)",
    "references": [
      {
        "title": "never Type",
        "url": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type"
      }
    ]
  },
  {
    "id": "JS-029",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "TypeScript 소스 코드가 JavaScript로 변환되는 컴파일 과정과 tsconfig.json 설정 옵션을 설명해주세요.",
    "answer": "컴파일 과정:\n파싱: 소스를 AST(Abstract Syntax Tree)로\n타입 검사: AST 기반 타입 분석\n변환: JavaScript + 타입 선언 파일 생성\n\ntsconfig.json 주요 옵션:\n\n주요 strict 옵션:\nstrictNullChecks: null/undefined 엄격 체크\nnoImplicitAny: 암시적 any 금지\nstrictFunctionTypes: 함수 타입 엄격 체크\n\n빌드 도구:\ntsc (기본)\nts-node (런타임 실행)\nesbuild, swc (빠른 변환)",
    "references": [
      {
        "title": "tsconfig Reference",
        "url": "https://www.typescriptlang.org/tsconfig"
      }
    ]
  },
  {
    "id": "JS-030",
    "category": "javascript",
    "categoryName": "JavaScript/TypeScript",
    "section": "pl",
    "question": "TypeScript의 클래스, 메서드, 프로퍼티 등을 수정하는 데코레이터(Decorator)에 대해 설명해주세요.",
    "answer": "데코레이터:\n클래스, 메서드, 프로퍼티 등을 수정하는 선언적 문법\n\n설정 필요:\n\n데코레이터 종류:\n클래스 데코레이터\n메서드 데코레이터\n프로퍼티 데코레이터\n파라미터 데코레이터\n\n실행 순서:\n파라미터 → 메서드 → 프로퍼티 → 클래스\n\n활용:\nNestJS: @Controller, @Get, @Injectable\nAngular: @Component, @Input",
    "references": [
      {
        "title": "Decorators",
        "url": "https://www.typescriptlang.org/docs/handbook/decorators.html"
      }
    ]
  },
  {
    "id": "PY-001",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 메모리 관리 방식을 설명해주세요.",
    "answer": "Python 메모리 관리자:\nPrivate heap에서 모든 객체와 데이터 구조 관리\n참조 카운팅 (Reference Counting)\n가비지 컬렉션 (순환 참조 처리)\n메모리 풀 (PyMalloc)\n작은 객체 (< 512 bytes): 전용 풀에서 할당\n큰 객체: OS malloc 사용\n블록 → 풀 → 아레나 계층 구조\n객체 캐싱\n\n메모리 최적화:\nslots: dict 대신 고정 속성\n제너레이터: 지연 평가로 메모리 절약",
    "references": [
      {
        "title": "Memory Management",
        "url": "https://docs.python.org/3/c-api/memory.html"
      }
    ]
  },
  {
    "id": "PY-002",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "CPython의 참조 카운팅 기반 메모리 관리와 관련된 GIL(Global Interpreter Lock)이란 무엇인가요?",
    "answer": "GIL:\n한 번에 하나의 스레드만 Python 바이트코드를 실행하도록 하는 뮤텍스\n\n존재 이유:\nCPython의 메모리 관리 (참조 카운팅)가 스레드 안전하지 않음\n단순성과 C 확장 통합 용이\n\n영향:\n\nCPU 바운드 작업:\n\nI/O 바운드 작업:\n\n우회 방법:\nmultiprocessing: 별도 프로세스 (GIL 우회)\nC 확장: GIL 해제하고 실행 (NumPy 등)\nasyncio: 비동기 I/O\n다른 인터프리터: Jython, PyPy (STM)\nFree-threaded Python (Python 3.13+)**: GIL 비활성화 빌드\nPEP 703에서 제안된 실험적 기능\n진정한 멀티스레드 병렬 처리 가능",
    "references": [
      {
        "title": "GIL",
        "url": "https://docs.python.org/3/glossary.html#term-global-interpreter-lock"
      }
    ]
  },
  {
    "id": "PY-003",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 데이터 타입과 가변/불변 객체를 설명해주세요.",
    "answer": "불변 객체 (Immutable):\n타입   예시\n\nint   42\nfloat   3.14\nstr   'hello'\ntuple   (1, 2, 3)\nfrozenset   frozenset([1, 2])\nbool   True\n\n가변 객체 (Mutable):\n타입   예시\n\nlist   [1, 2, 3]\ndict   {'a': 1}\nset   {1, 2, 3}\n사용자 정의 클래스   기본적으로 가변\n\n영향:\n함수 인자\n딕셔너리 키\n기본 인자 주의",
    "references": [
      {
        "title": "Data Model",
        "url": "https://docs.python.org/3/reference/datamodel.html"
      }
    ]
  },
  {
    "id": "PY-004",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python에서 가변 객체를 복사할 때 얕은 복사(shallow copy)와 깊은 복사(deep copy)의 차이점은 무엇인가요?",
    "answer": "얕은 복사 (Shallow Copy):\n1단계만 복사, 중첩 객체는 참조 공유\n\n깊은 복사 (Deep Copy):\n모든 레벨 재귀적 복사\n\n비교:\n구분   얕은 복사   깊은 복사\n\n1단계   새 객체   새 객체\n중첩 객체   참조 공유   재귀 복사\n성능   빠름   느림\n순환 참조   문제 없음   처리함\n\n주의사항:",
    "references": [
      {
        "title": "copy module",
        "url": "https://docs.python.org/3/library/copy.html"
      }
    ]
  },
  {
    "id": "PY-005",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 \\*args와 \\*\\*kwargs에 대해 설명해주세요.",
    "answer": "args: 가변 위치 인자를 튜플로 수집\n\n*kwargs: 가변 키워드 인자를 딕셔너리로 수집\n\n함께 사용:\n\n언패킹:*\n\n파라미터 순서:*",
    "references": [
      {
        "title": "Defining Functions",
        "url": "https://docs.python.org/3/tutorial/controlflow.html#more-on-defining-functions"
      }
    ]
  },
  {
    "id": "PY-006",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 데코레이터(Decorator)란 무엇이고 어떻게 동작하나요?",
    "answer": "데코레이터:\n함수를 인자로 받아 새 함수를 반환하는 함수 (함수 확장)\n\n기본 구조:\n\n인자 있는 데코레이터:*\n\nfunctools.wraps (메타데이터 보존):*\n\n클래스 데코레이터:*",
    "references": [
      {
        "title": "Decorators",
        "url": "https://docs.python.org/3/glossary.html#term-decorator"
      }
    ]
  },
  {
    "id": "PY-007",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 제너레이터(Generator)와 이터레이터(Iterator)의 개념과 활용 방법을 설명해주세요.",
    "answer": "Iterator:\niter(), next()를 구현한 객체\n\nGenerator:\nyield를 사용하여 Iterator를 간단히 생성\n\nGenerator Expression:\n\n장점:\n메모리 효율: 필요할 때만 값 생성\n지연 평가: 무한 시퀀스 가능\n간결한 코드\n\nsend, throw, close:",
    "references": [
      {
        "title": "Generators",
        "url": "https://docs.python.org/3/tutorial/classes.html#generators"
      }
    ]
  },
  {
    "id": "PY-008",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python에서 리소스 설정과 정리를 자동화하는 컨텍스트 매니저(Context Manager)란 무엇인가요?",
    "answer": "컨텍스트 매니저:\nwith 문에서 리소스 설정/정리를 자동화하는 객체\n\n기본 사용:\n\n클래스로 구현:\n\ncontextlib로 간단히:\n\n활용 사례:\n파일, 네트워크, DB 연결\n락 획득/해제\n트랜잭션\n임시 설정 변경",
    "references": [
      {
        "title": "Context Managers",
        "url": "https://docs.python.org/3/reference/datamodel.html#with-statement-context-managers"
      }
    ]
  },
  {
    "id": "PY-009",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 리스트 컴프리헨션([x for x in ...])과 제너레이터 표현식((x for x in ...))의 차이점은 무엇인가요?",
    "answer": "구분   리스트 컴프리헨션   제너레이터 표현식\n\n문법   [x for x in ...]   (x for x in ...)\n반환   list   generator\n메모리   전체 할당   지연 생성\n재사용   가능   1회성\n속도   빠름 (한번에)   느림 (순차)\n\n리스트 컴프리헨션:\n\n제너레이터 표현식:\n\n선택 기준:\n\n리스트 컴프리헨션:\n데이터 크기가 작을 때\n여러 번 순회 필요\n인덱싱/슬라이싱 필요\nlen() 필요\n\n제너레이터:\n대용량 데이터\n한 번만 순회\n메모리 제한 환경\n무한 시퀀스",
    "references": [
      {
        "title": "Generator Expressions",
        "url": "https://docs.python.org/3/reference/expressions.html#generator-expressions"
      }
    ]
  },
  {
    "id": "PY-010",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 람다 함수의 특징과 제한사항은 무엇인가요?",
    "answer": "람다 함수:\n단일 표현식을 가진 익명 함수\n\n활용:\n\n제한사항:\n단일 표현식만\n문(statements) 불가\n타입 힌트 불가\n문서화 어려움\n\n권장:**\n간단한 콜백에만 사용\n복잡하면 일반 함수로",
    "references": [
      {
        "title": "Lambda Expressions",
        "url": "https://docs.python.org/3/reference/expressions.html#lambda"
      }
    ]
  },
  {
    "id": "PY-011",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python에서 내부 함수가 외부 함수의 변수를 기억하는 클로저(Closure)와 nonlocal 키워드에 대해 설명해주세요.",
    "answer": "클로저:\n내부 함수가 외부 함수의 변수를 기억하고 접근하는 함수\n\nnonlocal:\n중첩 함수에서 외부 함수의 변수를 수정할 때 사용\n\nnonlocal vs global:\n\n클로저 활용:\n데이터 은닉 (private 변수)\n상태 유지 함수\n팩토리 함수\n데코레이터",
    "references": [
      {
        "title": "nonlocal",
        "url": "https://docs.python.org/3/reference/simple_stmts.html#the-nonlocal-statement"
      }
    ]
  },
  {
    "id": "PY-012",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 클래스 변수와 인스턴스 변수의 차이점은 무엇인가요?",
    "answer": "구분   클래스 변수   인스턴스 변수\n\n정의 위치   클래스 내부   init 내부 (self.xxx)\n공유   모든 인스턴스   인스턴스별 독립\n접근   클래스명.변수 / self.변수   self.변수\n\n주의: 가변 객체 클래스 변수\n\n클래스 변수 활용:",
    "references": [
      {
        "title": "Classes",
        "url": "https://docs.python.org/3/tutorial/classes.html#class-and-instance-variables"
      }
    ]
  },
  {
    "id": "PY-013",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 매직 메서드(init, str, repr 등)에 대해 설명해주세요.",
    "answer": "매직 메서드 (던더 메서드):\nxxx 형태, Python 내장 동작을 커스터마이징\n\n객체 생성/초기화:\n\n문자열 표현:\n\n연산자 오버로딩:\n\n컨테이너 동작:",
    "references": [
      {
        "title": "Data Model",
        "url": "https://docs.python.org/3/reference/datamodel.html#special-method-names"
      }
    ]
  },
  {
    "id": "PY-014",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python에서 속성 접근을 제어하는 프로퍼티(Property)와 디스크립터(Descriptor)를 설명해주세요.",
    "answer": "Property:\ngetter/setter를 통한 속성 접근 제어\n\nDescriptor:\nget, set, delete를 구현한 클래스\n\nProperty vs Descriptor:*\nProperty: 단일 클래스에서 사용\nDescriptor: 여러 클래스에서 재사용 가능",
    "references": [
      {
        "title": "Descriptor",
        "url": "https://docs.python.org/3/howto/descriptor.html"
      }
    ]
  },
  {
    "id": "PY-015",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 다중 상속과 MRO(Method Resolution Order)에 대해 설명해주세요.",
    "answer": "다중 상속:\n\nMRO (Method Resolution Order):\nC3 선형화 알고리즘으로 결정\n\nC3 규칙:\n자식 클래스가 부모보다 먼저\n부모 클래스 순서 유지 (왼쪽 우선)\n공통 부모는 마지막에\n\nsuper() 사용:\n\n다이아몬드 문제 해결:\nC3 선형화로 명확한 순서 보장\nsuper()로 협력적 상속",
    "references": [
      {
        "title": "MRO",
        "url": "https://docs.python.org/3/tutorial/classes.html#multiple-inheritance"
      }
    ]
  },
  {
    "id": "PY-016",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 추상 클래스(ABC)와 인터페이스 구현 방법은 무엇인가요?",
    "answer": "ABC (Abstract Base Class):\n\n추상 프로퍼티:\n\n인터페이스 패턴 (Protocol - Python 3.8+):\n\nABC vs Protocol:\nABC: 명시적 상속 필요, 런타임 검사\nProtocol: 구조적 타이핑, 정적 타입 체크",
    "references": [
      {
        "title": "abc module",
        "url": "https://docs.python.org/3/library/abc.html"
      }
    ]
  },
  {
    "id": "PY-017",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 Duck Typing(오리처럼 행동하면 오리로 간주)이란 무엇인가요?",
    "answer": "Duck Typing:\n\"오리처럼 걷고 오리처럼 꽥꽥거리면, 그것은 오리다\"\n\n객체의 타입보다 행동(메서드/속성)을 기준으로 판단\n\n장점:\n유연한 다형성\n명시적 상속 불필요\n테스트/목 객체 쉬움\n\nEAFP vs LBYL:\n\n타입 힌트와 함께:",
    "references": [
      {
        "title": "Duck Typing",
        "url": "https://docs.python.org/3/glossary.html#term-duck-typing"
      }
    ]
  },
  {
    "id": "PY-018",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 타입 힌팅(Type Hinting)과 정적 타입 체커(mypy)에 대해 설명해주세요?",
    "answer": "타입 힌팅 (Python 3.5+):\n\n주요 타입:\n\nmypy 사용:\n\n주의:\n런타임에 타입 검사 안 함 (힌트일 뿐)\n정적 분석 도구로 검사",
    "references": [
      {
        "title": "typing module",
        "url": "https://docs.python.org/3/library/typing.html"
      }
    ]
  },
  {
    "id": "PY-019",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 GIL 영향을 고려한 동시성 처리 방법(Threading, Multiprocessing, Asyncio)을 비교해주세요.",
    "answer": "구분   Threading   Multiprocessing   Asyncio\n\n단위   스레드   프로세스   코루틴\nGIL 영향   O   X (별도 프로세스)   O\n메모리   공유   격리   공유\n적합   I/O 바운드   CPU 바운드   I/O 바운드\n컨텍스트 스위칭   OS   OS   사용자 레벨\n\nThreading:\n\nMultiprocessing:\n\nAsyncio:\n\n선택 기준:\nI/O + 간단함 → Threading\nI/O + 대량 동시성 → Asyncio\nCPU 집약적 → Multiprocessing",
    "references": [
      {
        "title": "concurrent.futures",
        "url": "https://docs.python.org/3/library/concurrent.futures.html"
      }
    ]
  },
  {
    "id": "PY-020",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 단일 스레드 비동기 I/O 프레임워크인 asyncio에 대해 설명해주세요.",
    "answer": "asyncio:\n단일 스레드에서 동시성을 제공하는 비동기 I/O 프레임워크\n\n핵심 개념:\n\n주요 함수:\n\n이벤트 루프:\n\nasync 컨텍스트 매니저:\n\n주의:\n블로킹 코드 사용 금지 (time.sleep X)\nI/O 라이브러리도 async 버전 필요",
    "references": [
      {
        "title": "asyncio",
        "url": "https://docs.python.org/3/library/asyncio.html"
      }
    ]
  },
  {
    "id": "PY-021",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python 2와 Python 3의 주요 차이점은 무엇인가요?",
    "answer": "구분   Python 2   Python 3\n\nprint   print \"hello\"   print(\"hello\")\n나눗셈   5/2 = 2 (정수)   5/2 = 2.5 (실수)\n문자열   str (바이트), unicode   str (유니코드), bytes\nrange   range() → list   range() → iterator\ninput   raw_input()   input()\n예외   except E, e:   except E as e:\n\n주요 차이:\nprint 함수\n정수 나눗셈\n유니코드\n반복자\n\nPython 2 EOL:\n2020년 1월 1일 지원 종료\n신규 프로젝트는 Python 3 필수",
    "references": [
      {
        "title": "What's New",
        "url": "https://docs.python.org/3/whatsnew/3.0.html"
      }
    ]
  },
  {
    "id": "PY-022",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 패키지 관리 도구(pip, pipenv, poetry)를 비교해주세요.",
    "answer": "구분   pip   pipenv   poetry\n\n표준   O   X   X\n가상환경   별도 (venv)   통합   통합\nlock 파일   X   Pipfile.lock   poetry.lock\n의존성 해결   기본   향상   향상\n빌드/배포   X   X   O\n\npip:\n기본 도구, 단순\nlock 파일 없어 재현성 이슈\n\npipenv:\nPipfile, Pipfile.lock 사용\n가상환경 자동 관리\n\npoetry:\npyproject.toml (PEP 518 표준)\n프로젝트 생성부터 배포까지\n현대적 도구로 인기 상승\n\n선택 기준:\n단순 스크립트 → pip + venv\n애플리케이션 → pipenv 또는 poetry\n라이브러리 배포 → poetry",
    "references": [
      {
        "title": "pip",
        "url": "https://pip.pypa.io/en/stable/"
      }
    ]
  },
  {
    "id": "PY-023",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 가상 환경(venv, virtualenv)이 필요한 이유는 무엇인가요?",
    "answer": "필요한 이유:\n의존성 격리\n프로젝트마다 다른 버전의 패키지 사용 가능\n프로젝트 A: Django 3.x, 프로젝트 B: Django 4.x\n시스템 Python 보호\nOS 시스템 Python과 분리\n시스템 패키지 충돌 방지\n재현 가능한 환경\n개발/프로덕션 환경 일치\nrequirements.txt로 환경 공유\n\n사용법:\n\nvenv vs virtualenv:\n구분   venv   virtualenv\n\n설치   내장   pip 설치\nPython 버전   현재만   여러 버전\n속도   빠름   빠름\n\n가상환경 위치:",
    "references": [
      {
        "title": "venv",
        "url": "https://docs.python.org/3/library/venv.html"
      }
    ]
  },
  {
    "id": "PY-024",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 모듈 import 방식과 __init__.py의 역할을 설명해주세요.",
    "answer": "import 방식:\n\n모듈 검색 순서:\n현재 디렉토리\nPYTHONPATH 환경변수\n설치된 패키지 (site-packages)\n표준 라이브러리\n\n패키지 구조:\n\ninit.py 역할:\n패키지 표시 (Python 3.3+ namespace packages로 선택적)\n패키지 초기화 코드\n공개 API 정의\n하위 모듈 자동 import",
    "references": [
      {
        "title": "Modules",
        "url": "https://docs.python.org/3/tutorial/modules.html"
      }
    ]
  },
  {
    "id": "PY-025",
    "category": "python",
    "categoryName": "Python",
    "section": "pl",
    "question": "Python의 성능 최적화 방법에는 어떤 것들이 있나요?",
    "answer": "프로파일링 먼저\n내장 함수/라이브러리 활용\n적절한 자료구조\n제너레이터 사용\nC 확장 라이브러리\n멀티프로세싱 (CPU 바운드)\nasyncio (I/O 바운드)\n기타*\nslots: 메모리 최적화\nfunctools.lrucache: 메모이제이션\nPyPy: 대안 인터프리터",
    "references": [
      {
        "title": "Performance Tips",
        "url": "https://docs.python.org/3/howto/perf-tips.html"
      }
    ]
  },
  {
    "id": "GO-001",
    "category": "go",
    "categoryName": "Go",
    "section": "pl",
    "question": "Go 언어의 특징과 장단점을 설명해주세요.",
    "answer": "특징:\n정적 타입, 컴파일 언어\n간결한 문법 (키워드 25개)\n내장 동시성 (goroutine, channel)\n빠른 컴파일\n단일 바이너리 배포\n가비지 컬렉션\n\n장점:\n동시성: goroutine이 가볍고 효율적\n성능: C에 근접한 실행 속도\n단순함: 학습 곡선 낮음, 코드 일관성\n빠른 빌드: 대규모 프로젝트도 빠름\n도구 통합: go fmt, go test, go mod 내장\n크로스 컴파일: 쉬운 멀티 플랫폼 빌드\n\n단점:\n제네릭: Go 1.18에서 추가되었으나 제한적\n에러 처리: if err != nil 반복\n의존성 주입: 프레임워크 지원 부족\n함수형: map, filter 등 내장 없음\nGUI: 네이티브 지원 없음\n\n사용 사례:\n마이크로서비스 (Docker, Kubernetes)\nCLI 도구 (Terraform, Hugo)\n네트워크 서버\nDevOps 도구",
    "references": [
      {
        "title": "Go Documentation",
        "url": "https://go.dev/doc/"
      }
    ]
  },
  {
    "id": "GO-002",
    "category": "go",
    "categoryName": "Go",
    "section": "pl",
    "question": "Go의 경량 동시성 단위인 고루틴(Goroutine)과 OS 스레드의 차이점은 무엇인가요?",
    "answer": "구분   Goroutine   OS Thread\n\n메모리   ~2KB 스택   ~1MB 스택\n생성 비용   매우 낮음   높음\n스케줄링   Go 런타임   OS 커널\n컨텍스트 스위칭   빠름   느림\n개수   수십만 가능   수천 제한적\n\nGoroutine 사용:\n\nM:N 스케줄링:\nM개의 goroutine을 N개의 OS 스레드에 매핑\nGOMAXPROCS로 사용할 OS 스레드 수 설정\n\nGo 스케줄러 (GMP):\nG: Goroutine\nM: Machine (OS Thread)\nP: Processor (논리적 프로세서)\n\n장점:\n가벼움: 수십만 동시 실행 가능\n간단: go 키워드만으로 생성\n효율적: 블로킹 I/O 시 자동으로 다른 goroutine 실행\n\n주의:\nmain 종료 시 모든 goroutine 종료\nsync.WaitGroup으로 대기",
    "references": [
      {
        "title": "Goroutines",
        "url": "https://go.dev/doc/effective_go#goroutines"
      }
    ]
  },
  {
    "id": "GO-003",
    "category": "go",
    "categoryName": "Go",
    "section": "pl",
    "question": "고루틴 간 통신을 위한 Go의 채널(Channel)의 동작 원리와 사용 방법을 설명해주세요.",
    "answer": "Channel:\ngoroutine 간 통신을 위한 타입 안전한 파이프\n\n생성과 사용:\n\nUnbuffered vs Buffered:\n구분   Unbuffered   Buffered\n\n생성   make(chan T)   make(chan T, n)\n송신   수신자 대기까지 블로킹   버퍼 찰 때까지 비블로킹\n동기화   동기식   비동기식\n\n패턴:\n\nWorker Pool:",
    "references": [
      {
        "title": "Channels",
        "url": "https://go.dev/doc/effective_go#channels"
      }
    ]
  },
  {
    "id": "GO-004",
    "category": "go",
    "categoryName": "Go",
    "section": "pl",
    "question": "여러 채널 연산을 동시에 대기하는 Go의 select 문의 동작 원리를 설명해주세요.",
    "answer": "select:\n여러 채널 연산을 동시에 대기하는 제어 구조\n\n동작 원리:\n모든 case의 채널 연산 확인\n준비된 case가 있으면 하나 무작위 선택 실행\n준비된 case 없으면 default 실행 (있을 경우)\ndefault 없으면 하나가 준비될 때까지 블로킹\n\n활용 패턴:\n타임아웃:\n취소 (Context):\n논블로킹 연산:\n무한 루프:",
    "references": [
      {
        "title": "Select",
        "url": "https://go.dev/tour/concurrency/5"
      }
    ]
  },
  {
    "id": "GO-005",
    "category": "go",
    "categoryName": "Go",
    "section": "pl",
    "question": "Go의 인터페이스(Interface)와 타입 시스템에 대해 설명해주세요.",
    "answer": "인터페이스:\n메서드 시그니처의 집합. 암시적 구현 (implements 키워드 없음)\n\n빈 인터페이스:\n\n타입 단언:\n\n타입 스위치:\n\n인터페이스 합성:\n\n특징:\n덕 타이핑의 정적 버전\n작은 인터페이스 선호 (io.Reader, io.Writer)\nnil 인터페이스 주의",
    "references": [
      {
        "title": "Interfaces",
        "url": "https://go.dev/doc/effective_go#interfaces"
      }
    ]
  },
  {
    "id": "GO-006",
    "category": "go",
    "categoryName": "Go",
    "section": "pl",
    "question": "Go의 포인터와 값 타입의 차이점은 무엇인가요?",
    "answer": "값 타입:\n변수가 실제 값을 직접 저장. 할당/전달 시 복사\n\n포인터 타입:\n메모리 주소를 저장. 간접 참조\n\n함수 인자:\n\n메서드 수신자:\n\n포인터 사용 시점:\n구조체 크기가 클 때 (복사 비용)\n원본 수정이 필요할 때\nnil 상태가 의미 있을 때\n\n주의:\nGo는 포인터 연산 없음 (안전)\nnil 포인터 역참조 시 panic",
    "references": [
      {
        "title": "Pointers",
        "url": "https://go.dev/tour/moretypes/1"
      }
    ]
  },
  {
    "id": "GO-007",
    "category": "go",
    "categoryName": "Go",
    "section": "pl",
    "question": "Go의 슬라이스(Slice)와 배열(Array)의 차이점을 설명해주세요.",
    "answer": "구분   Array   Slice\n\n크기   고정 (타입 일부)   가변\n타입   [5]int != [10]int   []int\n값/참조   값 타입 (복사)   참조 타입\n전달   전체 복사   헤더만 복사\n\n배열:\n\n슬라이스:\n\nnil vs 빈 슬라이스:\n\n슬라이스 내부 구조:\n\n주요 연산:\n\n주의:",
    "references": [
      {
        "title": "Slices",
        "url": "https://go.dev/blog/slices-intro"
      }
    ]
  },
  {
    "id": "GO-008",
    "category": "go",
    "categoryName": "Go",
    "section": "pl",
    "question": "Go의 맵(Map)의 내부 구조와 동작 원리는 무엇인가요?",
    "answer": "Map:\n해시 테이블 기반 키-값 저장소\n\n사용법:\n\n내부 구조 (hmap):\n버킷 배열 (각 버킷 8개 키-값)\n오버플로우 버킷 (체이닝)\n로드 팩터 초과 시 확장\n\n특징:\n참조 타입 (포인터처럼 동작)\nnil map에 쓰기 시 panic\n동시 읽기 안전, 동시 쓰기 불안전\n순회 순서 비결정적\n\n동시성:",
    "references": [
      {
        "title": "Maps",
        "url": "https://go.dev/blog/maps"
      }
    ]
  },
  {
    "id": "GO-009",
    "category": "go",
    "categoryName": "Go",
    "section": "pl",
    "question": "Go의 defer, panic, recover에 대해 설명해주세요.",
    "answer": "defer:\n함수 종료 시 실행되는 지연 호출 (LIFO 순서)\n\npanic:\n런타임 오류, 프로그램 비정상 종료\n\nrecover:\npanic을 잡아서 복구 (defer 내에서만 유효)\n\n패턴:\n\n주의:\ndefer 인자는 즉시 평가\n루프 내 defer 주의 (축적됨)\npanic은 예외적 상황에만 사용",
    "references": [
      {
        "title": "Defer, Panic, Recover",
        "url": "https://go.dev/blog/defer-panic-and-recover"
      }
    ]
  },
  {
    "id": "GO-010",
    "category": "go",
    "categoryName": "Go",
    "section": "pl",
    "question": "Go의 error 인터페이스 기반 에러 처리 방식과 모범 사례는 무엇인가요?",
    "answer": "Go 에러 처리:\nerror 인터페이스 반환, 명시적 처리\n\n에러 생성:\n\n에러 래핑/언래핑 (Go 1.13+):\n\n모범 사례:\n에러 즉시 처리 또는 반환\n컨텍스트 추가하여 래핑\n센티널 에러: var ErrNotFound = errors.New(\"not found\")\npanic 대신 error 반환",
    "references": [
      {
        "title": "Error Handling",
        "url": "https://go.dev/blog/error-handling-and-go"
      }
    ]
  },
  {
    "id": "GO-011",
    "category": "go",
    "categoryName": "Go",
    "section": "pl",
    "question": "요청 취소, 타임아웃, 요청 범위 값 전달을 위한 Go의 컨텍스트(Context) 패키지의 용도와 사용 방법은 무엇인가요?",
    "answer": "Context:\n요청 범위 데이터, 취소 신호, 타임아웃을 전달하는 표준 방법\n\n주요 용도:\n요청 취소 전파\n타임아웃/데드라인 설정\n요청 범위 값 전달\n\n생성:\n\n사용:\n\n모범 사례:\n함수 첫 번째 인자로 전달\nnil context 전달 금지\ncontext에 비즈니스 로직 데이터 넣지 않기\n항상 cancel 호출 (리소스 누수 방지)",
    "references": [
      {
        "title": "context",
        "url": "https://go.dev/blog/context"
      }
    ]
  },
  {
    "id": "GO-012",
    "category": "go",
    "categoryName": "Go",
    "section": "pl",
    "question": "동시성 제어를 위한 Go의 sync 패키지(Mutex, WaitGroup, Once 등)의 주요 기능들을 설명해주세요.",
    "answer": "Mutex (상호 배제)\nRWMutex (읽기-쓰기 락)\nWaitGroup (고루틴 대기)\nOnce (한 번만 실행)\nCond (조건 변수)\nPool (객체 풀)",
    "references": [
      {
        "title": "sync package",
        "url": "https://pkg.go.dev/sync"
      }
    ]
  },
  {
    "id": "GO-013",
    "category": "go",
    "categoryName": "Go",
    "section": "pl",
    "question": "Go의 Concurrent Tri-color Mark-and-Sweep 기반 가비지 컬렉션 방식을 설명해주세요.",
    "answer": "Go GC:\nConcurrent, Tri-color Mark-and-Sweep\n\n삼색 마킹 알고리즘:\n흰색: 아직 방문 안 함 (수거 대상 후보)\n회색: 방문했지만 참조 확인 중\n검은색: 방문 완료, 유지\n\n동작 과정:\nSTW(Stop-The-World): 짧은 일시 정지, 루트셋 스캔\nMark (concurrent): 회색 객체 처리, 검은색으로 변경\nSTW: 마킹 종료 확인\nSweep (concurrent): 흰색 객체 수거\n\n특징:\n낮은 지연: 대부분 동시 실행, STW 최소화\n쓰기 배리어: 동시 마킹 중 참조 변경 추적\n페이싱: 힙 크기 기반 GC 주기 조절\n\n튜닝:\n\n최적화 팁:\n불필요한 할당 줄이기\nsync.Pool 활용\n포인터 사용 최소화",
    "references": [
      {
        "title": "GC Guide",
        "url": "https://go.dev/doc/gc-guide"
      }
    ]
  },
  {
    "id": "GO-014",
    "category": "go",
    "categoryName": "Go",
    "section": "pl",
    "question": "Go의 빌드와 컴파일 과정(크로스 컴파일 포함)을 설명해주세요.",
    "answer": "빌드 과정:\n\n기본 명령:\n\n크로스 컴파일:\n\n빌드 옵션:\n\n빌드 모드:\n\n특징:\n빠른 컴파일 (의존성 분석 효율적)\n정적 링크 기본 (단일 바이너리)\nCGO: C 코드 연동 가능",
    "references": [
      {
        "title": "go build",
        "url": "https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies"
      }
    ]
  },
  {
    "id": "GO-015",
    "category": "go",
    "categoryName": "Go",
    "section": "pl",
    "question": "Go 모듈(Go Modules)과 의존성 관리에 대해 설명해주세요.",
    "answer": "Go Modules (Go 1.11+):\n공식 의존성 관리 시스템\n\n초기화:\n\ngo.mod:\n\n주요 명령:\n\ngo.sum:\n체크섬 파일 (보안, 재현성)\n버전 커밋에 포함해야 함\n\n버전 관리:\n\nSemantic Versioning:\nv1.2.3 (major.minor.patch)\nv2+ 는 모듈 경로에 버전 포함: module github.com/user/pkg/v2\n\nreplace/exclude:",
    "references": [
      {
        "title": "Go Modules",
        "url": "https://go.dev/doc/modules/"
      }
    ]
  },
  {
    "id": "LANG-001",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "객체지향 프로그래밍(OOP)의 4가지 특징을 설명해주세요.",
    "answer": "캡슐화 (Encapsulation)\n데이터와 메서드를 하나로 묶음\n내부 구현 숨김 (정보 은닉)\n접근 제어자로 보호\n상속 (Inheritance)\n기존 클래스를 확장하여 새 클래스 생성\n코드 재사용, 계층 구조\n다형성 (Polymorphism)\n같은 인터페이스, 다른 동작\n오버라이딩, 오버로딩\n추상화 (Abstraction)\n복잡한 시스템에서 핵심만 추출\n인터페이스/추상 클래스로 구현\n\n관계:\n캡슐화 → 구현 숨김\n상속 → 코드 재사용\n다형성 → 유연한 설계\n추상화 → 복잡도 관리",
    "references": []
  },
  {
    "id": "LANG-002",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "SOLID 원칙에 대해 설명해주세요.",
    "answer": "S - 단일 책임 원칙 (Single Responsibility)\n클래스는 하나의 책임만 가져야 함\n변경 이유가 하나여야 함\n\nO - 개방-폐쇄 원칙 (Open-Closed)\n확장에는 열려있고, 수정에는 닫혀있어야 함\n기존 코드 수정 없이 기능 추가\n\nL - 리스코프 치환 원칙 (Liskov Substitution)\n하위 타입은 상위 타입을 대체할 수 있어야 함\n상속 시 계약 위반 금지\n\nI - 인터페이스 분리 원칙 (Interface Segregation)\n클라이언트가 사용하지 않는 메서드에 의존하지 않아야 함\n작은 인터페이스로 분리\n\nD - 의존성 역전 원칙 (Dependency Inversion)\n고수준 모듈이 저수준 모듈에 의존하지 않음\n추상화에 의존",
    "references": []
  },
  {
    "id": "LANG-003",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "함수형 프로그래밍의 특징과 장점은 무엇인가요?",
    "answer": "핵심 개념:\n순수 함수 (Pure Function)\n같은 입력 → 같은 출력\n부작용 없음\n불변성 (Immutability)\n데이터 변경 대신 새 데이터 생성\n일급 함수 (First-class Function)\n함수를 값으로 취급 (변수 할당, 인자 전달, 반환)\n고차 함수 (Higher-order Function)\n함수를 인자로 받거나 반환하는 함수 (map, filter, reduce)\n선언적 프로그래밍\n\"무엇을\" 할지 기술 (vs 명령형: \"어떻게\")\n\n장점:\n테스트 용이: 순수 함수는 격리 테스트 쉬움\n동시성 안전: 불변 데이터, 공유 상태 없음\n예측 가능성: 부작용 없어 디버깅 쉬움\n재사용성: 작은 함수 조합\n지연 평가: 필요할 때만 계산\n\n예시:",
    "references": []
  },
  {
    "id": "LANG-004",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "순수 함수(Pure Function)란 무엇인가요?",
    "answer": "순수 함수의 조건:\n결정론적 (Deterministic)\n같은 입력 → 항상 같은 출력\n부작용 없음 (No Side Effects)\n외부 상태 변경 없음\nI/O 없음 (콘솔, 파일, 네트워크)\n\n장점:\n테스트 용이 (Mock 불필요)\n캐싱/메모이제이션 가능\n병렬 실행 안전\n리팩토링 안전\n\n순수 함수 예:",
    "references": []
  },
  {
    "id": "LANG-005",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "불변성(Immutability)의 중요성과 구현 방법은 무엇인가요?",
    "answer": "불변성:\n생성 후 상태를 변경할 수 없는 특성\n\n중요성:\n동시성 안전: 공유 상태 변경 없음\n예측 가능: 값이 변하지 않아 추적 쉬움\n변경 감지: 참조 비교로 빠른 변경 확인 (React)\n히스토리/되돌리기: 이전 상태 보존\n\n구현 방법:\n\nJavaScript:\n\nJava:\n\nPython:",
    "references": []
  },
  {
    "id": "LANG-006",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "동시성(Concurrency)과 병렬성(Parallelism)의 차이점은 무엇인가요?",
    "answer": "구분   동시성   병렬성\n\n정의   여러 작업 동시에 다룸   여러 작업 동시에 실행\n목적   응답성, 구조화   처리량, 속도\n하드웨어   싱글 코어 가능   멀티 코어 필요\n관점   설계/구조   실행 방식\n\n동시성 (Concurrency):\n\"여러 일을 한꺼번에 다루는 것\"\n작업 간 전환 (인터리빙)\n싱글 코어에서도 가능\n구조적 개념\n\n병렬성 (Parallelism):\n\"여러 일을 한꺼번에 실행하는 것\"\n물리적 동시 실행\n멀티 코어 필수\n실행 개념\n\n관계:\n동시성 없이 병렬성 가능 (독립 작업)\n병렬성 없이 동시성 가능 (싱글 코어 멀티태스킹)\n둘 다 가능 (멀티코어 + 멀티태스킹)\n\n예시:\n동시성: Node.js 이벤트 루프 (싱글 스레드)\n병렬성: 멀티 프로세스 데이터 처리",
    "references": []
  },
  {
    "id": "LANG-007",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "Race Condition과 Deadlock에 대해 설명해주세요.",
    "answer": "Race Condition (경쟁 상태):\n여러 스레드가 공유 자원에 동시 접근하여 결과가 실행 순서에 따라 달라지는 현상\n\nDeadlock (교착 상태):\n두 개 이상의 스레드가 서로의 자원을 기다리며 영원히 블로킹\n\nDeadlock 조건 (모두 충족 시):\n상호 배제: 자원은 한 번에 하나만 사용\n점유 대기: 자원 보유하며 다른 자원 대기\n비선점: 강제로 자원 회수 불가\n순환 대기: 순환 형태의 대기\n\nDeadlock 방지:\n락 순서 일관되게 유지\n타임아웃 사용\ntryLock() 사용\n락 계층 구조",
    "references": []
  },
  {
    "id": "LANG-008",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "동기(Synchronous)와 비동기(Asynchronous)의 차이점은 무엇인가요?",
    "answer": "구분   동기   비동기\n\n실행   순차적, 완료 대기   요청 후 다른 작업\n호출자   블로킹   논블로킹\n결과   즉시 반환   콜백/Promise/Future\n복잡도   단순   복잡\n\n동기 (Synchronous):\n\n비동기 (Asynchronous):\n\n비동기 처리 방법:\n콜백: 함수 전달\nPromise: then/catch\nasync/await: 동기식 문법\n이벤트: 이벤트 리스너\n\n사용 시나리오:\n동기: 단순 작업, 순서 중요\n비동기: I/O, 네트워크, UI 응답성",
    "references": []
  },
  {
    "id": "LANG-009",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "블로킹(Blocking)과 논블로킹(Non-blocking)의 차이점은 무엇인가요?",
    "answer": "블로킹:\n호출된 함수가 완료될 때까지 호출자가 대기\n\n논블로킹:\n호출된 함수가 즉시 반환, 호출자는 다른 작업 가능\n\n동기/비동기 vs 블로킹/논블로킹:\n\n조합   설명\n\n동기 + 블로킹   완료까지 대기 (일반적)\n동기 + 논블로킹   즉시 반환, 폴링으로 확인\n비동기 + 논블로킹   즉시 반환, 콜백/이벤트로 알림\n비동기 + 블로킹   비효율적 (드묾)\n\n예시:\n\nI/O 모델:\n블로킹 I/O: read() 호출 시 데이터 올 때까지 대기\n논블로킹 I/O: 데이터 없으면 에러 반환\nI/O 멀티플렉싱: select/poll/epoll\n비동기 I/O: 커널이 완료 알림",
    "references": []
  },
  {
    "id": "LANG-010",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "컴파일 언어와 인터프리터 언어의 차이점은 무엇인가요?",
    "answer": "구분   컴파일 언어   인터프리터 언어\n\n변환 시점   실행 전 전체   실행 중 한 줄씩\n출력   기계어/바이트코드   없음 (직접 실행)\n실행 속도   빠름   느림\n개발 속도   느림 (빌드)   빠름\n에러 검출   컴파일 타임   런타임\n\n컴파일 언어:\n예: C, C++, Go, Rust\n장점: 빠른 실행, 최적화\n단점: 플랫폼 의존, 빌드 시간\n\n인터프리터 언어:\n예: Python, JavaScript, Ruby\n장점: 빠른 개발, 플랫폼 독립\n단점: 느린 실행\n\n혼합 방식:\nJava: 컴파일(바이트코드) + 인터프리터/JIT\nPython: 바이트코드 컴파일 + VM 실행\nJavaScript: JIT 컴파일 (V8)\n\nJIT (Just-In-Time):\n런타임에 기계어로 컴파일\n핫스팟 최적화\n인터프리터 + 컴파일 장점 결합",
    "references": []
  },
  {
    "id": "LANG-011",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "JIT(Just-In-Time) 컴파일러의 동작 원리를 설명해주세요.",
    "answer": "JIT 컴파일:\n런타임에 바이트코드를 기계어로 변환하여 성능 향상\n\n동작 과정:\n\n주요 기법:\n핫스팟 감지\n자주 실행되는 코드 영역 파악\n카운터로 호출 횟수 추적\n프로파일링 기반 최적화\n런타임 정보로 최적화 결정\n타입 예측, 분기 예측\n최적화 기법\n인라이닝: 함수 호출 제거\n루프 언롤링: 반복문 펼치기\n데드 코드 제거\n탈출 분석: 스택 할당 최적화\n탈최적화 (Deoptimization)\n가정 깨지면 다시 인터프리터 모드\n\nJIT 사용 환경:\nJava: HotSpot C1/C2 컴파일러\nJavaScript: V8 (TurboFan), SpiderMonkey\n.NET: RyuJIT\nPython: PyPy\n\nTrade-off:\n워밍업 시간 필요\n메모리 사용 증가\n장기 실행에 유리",
    "references": []
  },
  {
    "id": "LANG-012",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "정적 타이핑과 동적 타이핑의 장단점은 무엇인가요?",
    "answer": "구분   정적 타이핑   동적 타이핑\n\n타입 검사   컴파일 타임   런타임\n선언   명시적 타입   타입 생략\n에러 발견   빠름   늦음\n유연성   낮음   높음\n\n정적 타이핑:\n예: Java, C++, Go, TypeScript\n장점:\n컴파일 타임 에러 발견\nIDE 자동완성, 리팩토링\n성능 최적화\n문서화 효과\n단점:\n장황한 코드\n유연성 부족\n학습 곡선\n\n동적 타이핑:\n예: Python, JavaScript, Ruby\n장점:\n간결한 코드\n빠른 프로토타이핑\n유연한 API\n덕 타이핑\n단점:\n런타임 에러\n리팩토링 어려움\n대규모 프로젝트 유지보수\n\n점진적 타이핑:\nTypeScript, Python (타입 힌트)\n선택적 타입 추가",
    "references": []
  },
  {
    "id": "LANG-013",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "강타입과 약타입 언어의 차이점은 무엇인가요?",
    "answer": "강타입 (Strongly Typed):\n타입 간 암시적 변환 제한적\n\n약타입 (Weakly Typed):\n타입 간 암시적 변환 허용\n\n구분   강타입   약타입\n\n변환   명시적   암시적\n안전성   높음   낮음\n편의성   불편   편리 (위험)\n예측성   높음   낮음\n\n언어 분류:\n타입   정적   동적\n\n강   Java, C#, Go   Python, Ruby\n약   C   JavaScript, PHP\n\n주의:\n정적/동적과 독립적 개념\n스펙트럼 (완전 강/약 없음)\n\n강타입 장점:\n타입 관련 버그 방지\n의도 명확\n\n약타입 장점:\n유연한 코드 (위험 동반)",
    "references": []
  },
  {
    "id": "LANG-014",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "Call by Value와 Call by Reference의 차이점을 설명해주세요.",
    "answer": "Call by Value:\n값의 복사본 전달\n\nCall by Reference:\n변수의 참조(주소) 전달\n\n언어별 특성:\n\nJava: Call by Value (항상)\n\nPython: Call by Object Reference\n\nJavaScript: Call by Sharing\n기본형: 값 복사\n객체: 참조 복사\n\n정리:\n언어   방식\n\nC   Value, 포인터로 참조 흉내\nC++   Value, Reference (&)\nJava   Value (참조값 복사)\nPython   Object Reference\nGo   Value, 포인터 사용",
    "references": []
  },
  {
    "id": "LANG-015",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "메모리 누수(Memory Leak)가 발생하는 원인과 방지 방법은 무엇인가요?",
    "answer": "메모리 누수:\n사용하지 않는 메모리를 해제하지 않아 점점 메모리 증가\n\n원인:\n참조 유지\n이벤트 리스너 해제 안 함\n클로저가 참조 유지\nThreadLocal 정리 안 함\n리소스 해제 안 함\n파일, DB 연결, 소켓\n\n---\n\n방지 방법:\n약한 참조 사용: WeakMap, WeakReference\n리스너 해제: removeEventListener\n리소스 정리: try-with-resources, using\n캐시 정책: LRU, TTL\n순환 참조 주의\n프로파일링: heap dump, memory profiler",
    "references": []
  }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { plData };
}
