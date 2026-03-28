const plData = [
  {
    "id": "JAVA-001",
    "category": "java",
    "categoryName": "Java",
    "section": "pl",
    "question": "JVM의 구조와 동작 원리에 대해 설명해주세요.",
    "answer": "JVM(Java Virtual Machine)은 자바 바이트코드를 실행하는 가상 머신입니다.\r\n\r\n**주요 구성 요소:**\r\n- **Class Loader**: 클래스 파일 로드, 링크, 초기화\r\n- **Runtime Data Area**: Heap, Stack, Method Area, PC Register, Native Method Stack\r\n- **Execution Engine**: Interpreter + JIT Compiler로 바이트코드 실행\r\n- **Garbage Collector**: 미사용 객체 메모리 자동 해제\r\n\r\n**동작 과정:** .java → javac → .class(바이트코드) → Class Loader → Execution Engine 실행",
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
    "answer": "**1. Method Area (메서드 영역)**\r\n- 클래스 정보, static 변수, 상수 풀 저장\r\n- 모든 스레드가 공유\r\n\r\n**2. Heap (힙)**\r\n- 객체 인스턴스와 배열 저장\r\n- GC의 대상, 모든 스레드가 공유\r\n- Young Generation(Eden, Survivor)과 Old Generation으로 구분\r\n\r\n**3. Stack (스택)**\r\n- 스레드별 독립적, 메서드 호출 시 프레임 생성\r\n- 지역 변수, 매개변수, 리턴 값 저장\r\n\r\n**4. PC Register**\r\n- 스레드별 현재 실행 중인 명령어 주소 저장\r\n\r\n**5. Native Method Stack**\r\n- 네이티브 메서드(C/C++) 실행을 위한 스택",
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
    "answer": "**동작 원리:**\r\n- Mark: 루트에서 참조되는 객체를 마킹\r\n- Sweep: 마킹되지 않은 객체 제거\r\n- Compact: 메모리 단편화 방지를 위해 압축 (선택적)\r\n\r\n**세대별 GC (Generational GC):**\r\n- Young Generation: 새 객체 할당, Minor GC 발생 (빈번, 빠름)\r\n- Old Generation: 오래 살아남은 객체, Major/Full GC 발생\r\n\r\n**GC 종류:**\r\n- **Serial GC**: 단일 스레드, 소규모 애플리케이션용\r\n- **Parallel GC**: 멀티 스레드로 처리량 최적화\r\n- **CMS GC**: 낮은 지연시간, Concurrent Mark-Sweep\r\n- **G1 GC**: Region 기반, 대용량 힙에 적합 (Java 9+ 기본)\r\n- **ZGC/Shenandoah**: 초저지연 GC (Java 11+)",
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
    "answer": "**G1 GC 특징:**\r\n- 힙을 동일 크기의 Region으로 분할 (1MB~32MB)\r\n- Region 단위로 GC 수행, 가비지가 많은 영역 우선 수집 (Garbage First)\r\n- 목표 중단 시간(Pause Time Goal) 설정 가능 (-XX:MaxGCPauseMillis)\r\n\r\n**다른 GC와 비교:**\r\n\r\n| 구분 | G1 GC | Parallel GC | CMS GC |\r\n|------|-------|-------------|--------|\r\n| 구조 | Region 기반 | 전통적 세대별 | 전통적 세대별 |\r\n| 목표 | 균형(처리량+지연) | 처리량 최대화 | 지연시간 최소화 |\r\n| 압축 | Incremental | Full GC 시 | 압축 없음(단편화) |\r\n| STW | 예측 가능 | 길 수 있음 | 짧지만 불규칙 |\r\n\r\n**G1 GC 권장 상황:** 힙 크기 4GB 이상, 지연시간과 처리량 균형 필요 시",
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
    "answer": "**3단계 클래스 로딩 과정:**\r\n\r\n**1. Loading (로딩)**\r\n- .class 파일을 읽어 바이트코드를 Method Area에 저장\r\n- Class 객체 생성\r\n\r\n**2. Linking (링킹)**\r\n- **Verification**: 바이트코드 유효성 검증\r\n- **Preparation**: static 변수 메모리 할당 및 기본값 초기화\r\n- **Resolution**: 심볼릭 참조를 실제 참조로 변환\r\n\r\n**3. Initialization (초기화)**\r\n- static 블록 실행, static 변수에 명시적 값 할당\r\n\r\n**클래스 로더 계층 (위임 모델):**\r\n- Bootstrap ClassLoader → Extension ClassLoader → Application ClassLoader\r\n- 상위 로더에 먼저 위임 후, 못 찾으면 하위에서 로드",
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
    "answer": "**의미:**\r\n- 클래스 레벨에 속하며, 인스턴스 생성 없이 접근 가능\r\n- Method Area에 저장, 모든 인스턴스가 공유\r\n\r\n**사용처:**\r\n- static 변수: 클래스 전체에서 공유하는 값 (예: 카운터)\r\n- static 메서드: 유틸리티 메서드 (예: Math.max())\r\n- static 블록: 클래스 로딩 시 한 번 실행\r\n- static 내부 클래스: 외부 클래스 인스턴스 없이 생성 가능\r\n\r\n**주의사항:**\r\n- static 메서드에서 인스턴스 멤버 직접 접근 불가\r\n- 멀티스레드 환경에서 동기화 필요 (공유 자원)\r\n- 메모리 누수 주의 (GC 대상이 아님, 클래스 언로드 시까지 유지)\r\n- 테스트 어려움 (상태 공유로 인한 부작용)\r\n- 과도한 사용은 OOP 원칙 위반",
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
    "answer": "**final (키워드)**\r\n- 변수: 재할당 불가 (상수화)\r\n- 메서드: 오버라이딩 불가\r\n- 클래스: 상속 불가 (예: String, Integer)\r\n\r\n**finally (예외 처리)**\r\n- try-catch-finally 블록에서 항상 실행되는 블록\r\n- 리소스 정리에 사용 (try-with-resources 권장)\r\n- return이 있어도 실행됨 (System.exit() 제외)\r\n\r\n**finalize() (메서드) - Deprecated**\r\n- Object 클래스의 메서드, GC 전 호출\r\n- Java 9부터 deprecated, 사용 권장하지 않음\r\n- 대안: try-with-resources, Cleaner API\r\n\r\n```java\r\nfinal int MAX = 100;  // 상수\r\ntry { ... } finally { resource.close(); }  // 정리\r\n// finalize() 사용 X\r\n```",
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
    "answer": "| 구분 | 추상 클래스 | 인터페이스 |\r\n|------|-------------|------------|\r\n| 상속 | 단일 상속 | 다중 구현 가능 |\r\n| 생성자 | 가질 수 있음 | 없음 |\r\n| 필드 | 인스턴스 변수 가능 | public static final만 |\r\n| 메서드 | 모든 종류 | public abstract (+ default, static) |\r\n| 접근제어자 | 모두 가능 | public만 |\r\n\r\n**사용 시나리오:**\r\n\r\n**추상 클래스:**\r\n- \"is-a\" 관계, 공통 구현 코드 공유 시\r\n- 상태(필드)를 공유해야 할 때\r\n- 예: Animal → Dog, Cat\r\n\r\n**인터페이스:**\r\n- \"can-do\" 관계, 행위 계약 정의\r\n- 다중 타입 역할 부여 시\r\n- 예: Comparable, Serializable, Runnable",
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
    "answer": "**default 메서드:**\r\n- 인터페이스에 기본 구현을 제공\r\n- 하위 호환성 유지하며 인터페이스 확장 가능\r\n- 구현 클래스에서 오버라이딩 가능\r\n\r\n```java\r\ninterface Collection {\r\n    default void forEach(Consumer action) {\r\n        for (E e : this) action.accept(e);\r\n    }\r\n}\r\n```\r\n\r\n**static 메서드:**\r\n- 인터페이스에 유틸리티 메서드 정의\r\n- 인터페이스명으로 직접 호출 (상속/오버라이딩 불가)\r\n\r\n```java\r\ninterface Comparator {\r\n    static <T> Comparator<T> naturalOrder() { ... }\r\n}\r\n```\r\n\r\n**다이아몬드 문제 해결:**\r\n- 동일 시그니처의 default 메서드 충돌 시, 구현 클래스에서 명시적 오버라이딩 필요\r\n- `InterfaceName.super.method()` 로 특정 인터페이스 메서드 호출",
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
    "answer": "| 구분 | Checked Exception | Unchecked Exception |\r\n|------|-------------------|---------------------|\r\n| 상속 | Exception 상속 | RuntimeException 상속 |\r\n| 처리 | 반드시 처리 (try-catch/throws) | 선택적 처리 |\r\n| 컴파일 | 미처리 시 컴파일 에러 | 컴파일 에러 없음 |\r\n| 시점 | 예측 가능한 외부 요인 | 프로그래밍 오류 |\r\n\r\n**Checked Exception 예시:**\r\n- IOException, SQLException, FileNotFoundException\r\n- 복구 가능한 상황, 호출자에게 처리 강제\r\n\r\n**Unchecked Exception 예시:**\r\n- NullPointerException, IllegalArgumentException, IndexOutOfBoundsException\r\n- 프로그래밍 버그, 방어 코딩으로 예방\r\n\r\n**현대적 관점:**\r\n- Spring/JPA 등은 Unchecked 선호 (보일러플레이트 감소)\r\n- Checked는 과도한 try-catch로 코드 가독성 저하 우려",
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
    "answer": "**개념:**\r\nJava 7에서 도입된 자동 리소스 관리 구문으로, AutoCloseable 인터페이스를 구현한 리소스를 자동으로 닫아줍니다.\r\n\r\n```java\r\ntry (FileInputStream fis = new FileInputStream(\"file.txt\");\r\n     BufferedReader br = new BufferedReader(new InputStreamReader(fis))) {\r\n    // 리소스 사용\r\n} // 자동으로 close() 호출\r\n```\r\n\r\n**동작 원리:**\r\n1. try 블록 종료 시 close() 자동 호출\r\n2. 선언 역순으로 close() 실행\r\n3. close()에서 발생한 예외는 suppressed exception으로 처리\r\n\r\n**장점:**\r\n- finally 블록 불필요, 코드 간결\r\n- 리소스 누수 방지\r\n- 예외 안전한 리소스 해제\r\n\r\n**Suppressed Exception:**\r\n```java\r\nThrowable[] suppressed = e.getSuppressed();\r\n```",
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
    "answer": "**계약 (Contract):**\r\n- equals()가 true인 두 객체는 반드시 같은 hashCode() 반환\r\n- hashCode()가 같아도 equals()는 false일 수 있음\r\n\r\n**위반 시 문제:**\r\n- HashMap, HashSet 등 해시 기반 컬렉션에서 오작동\r\n- 객체를 찾지 못하거나 중복 저장되는 버그\r\n\r\n**equals() 오버라이딩 규칙:**\r\n- 반사성: x.equals(x) == true\r\n- 대칭성: x.equals(y) == y.equals(x)\r\n- 추이성: x.equals(y), y.equals(z) → x.equals(z)\r\n- 일관성: 값 불변 시 항상 동일 결과\r\n- null 비교: x.equals(null) == false\r\n\r\n**구현 팁:**\r\n```java\r\n@Override\r\npublic boolean equals(Object o) {\r\n    if (this == o) return true;\r\n    if (!(o instanceof MyClass)) return false;\r\n    MyClass that = (MyClass) o;\r\n    return Objects.equals(field1, that.field1);\r\n}\r\n\r\n@Override\r\npublic int hashCode() {\r\n    return Objects.hash(field1);\r\n}\r\n```",
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
    "answer": "| 구분 | String | StringBuilder | StringBuffer |\r\n|------|--------|---------------|--------------|\r\n| 가변성 | 불변 (Immutable) | 가변 (Mutable) | 가변 (Mutable) |\r\n| 스레드 안전 | O (불변) | X | O (synchronized) |\r\n| 성능 | 문자열 연산 시 느림 | 가장 빠름 | StringBuilder보다 느림 |\r\n| 메모리 | 연산마다 새 객체 생성 | 내부 버퍼 재사용 | 내부 버퍼 재사용 |\r\n\r\n**사용 시나리오:**\r\n- **String**: 문자열 변경이 적을 때, 리터럴 사용\r\n- **StringBuilder**: 단일 스레드에서 문자열 조작 (권장)\r\n- **StringBuffer**: 멀티스레드에서 문자열 조작\r\n\r\n**String Pool:**\r\n- String 리터럴은 힙의 String Pool에 저장되어 재사용\r\n- `new String()`은 별도 객체 생성\r\n\r\n```java\r\nString s = \"hello\";  // String Pool\r\nStringBuilder sb = new StringBuilder();\r\nsb.append(\"hello\").append(\" world\");  // 효율적\r\n```",
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
    "answer": "**Generic:**\r\n컴파일 타임에 타입 안전성을 보장하고, 캐스팅 제거하는 기능 (Java 5+)\r\n\r\n```java\r\nList<String> list = new ArrayList<>();\r\nlist.add(\"hello\");\r\nString s = list.get(0);  // 캐스팅 불필요\r\n```\r\n\r\n**Type Erasure:**\r\n- 컴파일 후 제네릭 타입 정보가 제거되어 런타임에는 존재하지 않음\r\n- `List<String>` → `List` (Raw Type)\r\n- 하위 호환성을 위해 도입\r\n\r\n**제약사항:**\r\n- `new T()`, `new T[]` 불가\r\n- `instanceof T` 불가\r\n- static 컨텍스트에서 타입 파라미터 사용 불가\r\n- 기본 타입 사용 불가 (`List<int>` X → `List<Integer>` O)\r\n\r\n**와일드카드:**\r\n- `?`: 모든 타입\r\n- `? extends T`: 상한 경계 (읽기 전용)\r\n- `? super T`: 하한 경계 (쓰기 용)\r\n- PECS: Producer-Extends, Consumer-Super",
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
    "answer": "| 구분 | Comparable | Comparator |\r\n|------|------------|------------|\r\n| 패키지 | java.lang | java.util |\r\n| 메서드 | compareTo(T o) | compare(T o1, T o2) |\r\n| 구현 위치 | 비교 대상 클래스 내부 | 별도 클래스/람다 |\r\n| 정렬 기준 | 자연 순서 (단일) | 다양한 기준 가능 |\r\n\r\n**Comparable:**\r\n```java\r\nclass Student implements Comparable<Student> {\r\n    public int compareTo(Student o) {\r\n        return this.age - o.age;  // 나이 기준\r\n    }\r\n}\r\nCollections.sort(students);  // 자연 순서로 정렬\r\n```\r\n\r\n**Comparator:**\r\n```java\r\n// 이름 기준 정렬\r\nstudents.sort(Comparator.comparing(Student::getName));\r\n// 역순\r\nstudents.sort(Comparator.comparing(Student::getAge).reversed());\r\n// 복합 정렬\r\nstudents.sort(Comparator.comparing(Student::getAge)\r\n                        .thenComparing(Student::getName));\r\n```\r\n\r\n**사용 시나리오:**\r\n- Comparable: 클래스의 기본 정렬 기준 정의\r\n- Comparator: 여러 정렬 기준 필요 시, 기존 클래스 수정 불가 시",
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
    "answer": "**계층 구조:**\r\n```\r\nIterable\r\n    └── Collection\r\n        ├── List (순서O, 중복O)\r\n        │   ├── ArrayList\r\n        │   ├── LinkedList\r\n        │   └── Vector (legacy)\r\n        ├── Set (순서X, 중복X)\r\n        │   ├── HashSet\r\n        │   ├── LinkedHashSet\r\n        │   └── TreeSet (정렬)\r\n        └── Queue (FIFO)\r\n            ├── LinkedList\r\n            ├── PriorityQueue\r\n            └── Deque (양방향)\r\n\r\nMap (별도 계층, Key-Value)\r\n    ├── HashMap\r\n    ├── LinkedHashMap\r\n    ├── TreeMap (정렬)\r\n    └── Hashtable (legacy)\r\n```\r\n\r\n**주요 인터페이스:**\r\n- **List**: 인덱스 기반 접근, 순서 보장\r\n- **Set**: 중복 불허, 집합 연산\r\n- **Queue/Deque**: FIFO/양방향 큐\r\n- **Map**: 키-값 매핑\r\n\r\n**선택 기준:**\r\n- 순서/중복 필요 → List\r\n- 고유값 보장 → Set\r\n- 키로 검색 → Map\r\n- 선입선출 → Queue",
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
    "answer": "| 구분 | ArrayList | LinkedList |\r\n|------|-----------|------------|\r\n| 내부 구조 | 동적 배열 | 이중 연결 리스트 |\r\n| 인덱스 접근 | O(1) | O(n) |\r\n| 삽입/삭제 (중간) | O(n) | O(1) (노드 접근 후) |\r\n| 삽입/삭제 (끝) | O(1) 평균 | O(1) |\r\n| 메모리 | 연속, 적음 | 노드별 포인터, 많음 |\r\n| 캐시 효율 | 높음 | 낮음 |\r\n\r\n**ArrayList 권장:**\r\n- 읽기/조회가 빈번한 경우\r\n- 인덱스 기반 접근이 많은 경우\r\n- 대부분의 일반적인 상황 (기본 선택)\r\n\r\n**LinkedList 권장:**\r\n- 앞/뒤 삽입/삭제가 빈번한 경우\r\n- Queue/Deque 용도로 사용 시\r\n- Iterator를 통한 순회 중 삭제가 많을 때\r\n\r\n**실무 팁:**\r\n실제로는 ArrayList가 대부분 더 좋은 성능을 보임 (CPU 캐시 효율)",
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
    "answer": "**동작 원리:**\r\n1. key.hashCode()로 해시값 계산\r\n2. 해시값을 배열 인덱스로 변환 (hash & (n-1))\r\n3. 해당 버킷에 Entry(key, value) 저장\r\n\r\n**해시 충돌 해결 (Separate Chaining):**\r\n- 같은 버킷에 여러 Entry가 저장될 때\r\n- **Java 7**: 연결 리스트로 체이닝\r\n- **Java 8+**: 버킷 내 8개 초과 시 Red-Black Tree로 변환 (O(n) → O(log n))\r\n\r\n**주요 특징:**\r\n- 초기 용량: 16, 로드팩터: 0.75\r\n- 로드팩터 초과 시 2배 리사이징 (rehashing)\r\n- null key 1개, null value 다수 허용\r\n- 순서 보장 X (LinkedHashMap은 보장)\r\n\r\n**성능:**\r\n- 평균: get/put O(1)\r\n- 최악 (충돌 많을 때): O(log n) - Java 8+",
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
    "answer": "| 구분 | HashMap | ConcurrentHashMap |\r\n|------|---------|-------------------|\r\n| 스레드 안전 | X | O |\r\n| null 허용 | key/value 가능 | 불가 |\r\n| 동기화 방식 | 없음 | 세그먼트/노드 락 |\r\n| 성능 | 단일 스레드 최고 | 멀티스레드 최적화 |\r\n| Iterator | fail-fast | weakly consistent |\r\n\r\n**ConcurrentHashMap 동작 원리:**\r\n\r\n**Java 7:**\r\n- Segment 기반 분할 잠금 (기본 16개)\r\n- 각 세그먼트별 독립적 락\r\n\r\n**Java 8+:**\r\n- 세그먼트 대신 노드 단위 CAS + synchronized\r\n- 버킷이 비어있으면 CAS로 삽입\r\n- 충돌 시 해당 노드만 synchronized\r\n- 읽기는 락 없이 수행 (volatile)\r\n\r\n**사용 시나리오:**\r\n- 멀티스레드 환경에서 Map 공유 시\r\n- Collections.synchronizedMap()보다 높은 동시성 필요 시",
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
    "answer": "**1. synchronized**\r\n- 임계 영역에 하나의 스레드만 진입\r\n- 메서드 또는 블록 레벨 적용\r\n- 모니터 락 기반, 상호 배제 보장\r\n\r\n```java\r\nsynchronized void method() { }\r\nsynchronized(lock) { }\r\n```\r\n\r\n**2. volatile**\r\n- 변수의 가시성(visibility) 보장\r\n- 메인 메모리에서 직접 읽기/쓰기\r\n- 원자성 보장 안 함 (읽기/쓰기만 원자적)\r\n\r\n```java\r\nvolatile boolean flag = true;\r\n```\r\n\r\n**3. Atomic 클래스**\r\n- CAS(Compare-And-Swap) 기반 락-프리 연산\r\n- AtomicInteger, AtomicLong, AtomicReference 등\r\n- 단일 변수의 원자적 연산\r\n\r\n```java\r\nAtomicInteger count = new AtomicInteger(0);\r\ncount.incrementAndGet();  // 원자적 증가\r\n```\r\n\r\n**4. java.util.concurrent.locks**\r\n- ReentrantLock: 명시적 락, tryLock() 지원\r\n- ReadWriteLock: 읽기/쓰기 분리 락",
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
    "answer": "**의미:**\r\n- 변수를 CPU 캐시가 아닌 메인 메모리에서 직접 읽고 씀\r\n- 가시성(Visibility) 보장: 한 스레드의 변경이 다른 스레드에 즉시 보임\r\n- Happens-Before 관계 보장\r\n- **64비트 원자성**: volatile long/double은 읽기/쓰기가 원자적 (비volatile은 32비트 두 번 연산 가능)\r\n\r\n**보장하지 않는 것:**\r\n- 복합 연산의 원자성: `count++` 같은 읽기-수정-쓰기는 원자적이지 않음\r\n- 상호 배제: 여러 스레드의 동시 접근 차단 안 함\r\n\r\n**사용 시나리오:**\r\n```java\r\n// 1. 플래그 변수\r\nvolatile boolean running = true;\r\nwhile (running) { /* 작업 */ }\r\n\r\n// 2. Double-Checked Locking (싱글톤)\r\nprivate static volatile Instance instance;\r\nif (instance == null) {\r\n    synchronized(lock) {\r\n        if (instance == null) {\r\n            instance = new Instance();\r\n        }\r\n    }\r\n}\r\n```\r\n\r\n**주의:**\r\n- 복합 연산에는 synchronized나 Atomic 클래스 사용\r\n- 불필요한 volatile은 성능 저하 유발",
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
    "answer": "**JMM (Java Memory Model):**\r\n멀티스레드 환경에서 메모리 접근 규칙을 정의한 명세 (JSR-133, Java 5+)\r\n\r\n**핵심 개념:**\r\n\r\n**1. 가시성 (Visibility)**\r\n- 한 스레드의 변경이 다른 스레드에 보이는지\r\n- CPU 캐시로 인해 보장 안 될 수 있음\r\n\r\n**2. 재정렬 (Reordering)**\r\n- 컴파일러/CPU가 성능 최적화를 위해 명령어 순서 변경\r\n- 단일 스레드에서는 결과 동일 보장\r\n\r\n**3. Happens-Before 관계**\r\n- 연산 A가 B 전에 발생함을 보장하는 규칙\r\n- synchronized, volatile, Thread.start(), join() 등이 보장\r\n\r\n**주요 규칙:**\r\n- 같은 락의 unlock → lock\r\n- volatile 쓰기 → 읽기\r\n- Thread.start() → 해당 스레드의 모든 동작\r\n- 스레드의 모든 동작 → join() 리턴\r\n\r\n**실무 영향:**\r\n- 동기화 없이 공유 변수 접근 시 예기치 않은 결과\r\n- synchronized, volatile, Atomic으로 해결",
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
    "answer": "**개념:**\r\n각 스레드가 독립적인 변수 복사본을 가지게 하는 클래스\r\n\r\n**동작 원리:**\r\n- 각 Thread 객체 내부에 ThreadLocalMap 존재\r\n- ThreadLocal을 키로, 값을 저장\r\n- 스레드별 격리된 저장 공간 제공\r\n\r\n```java\r\nThreadLocal<User> userContext = new ThreadLocal<>();\r\nuserContext.set(currentUser);\r\nUser user = userContext.get();\r\nuserContext.remove();  // 반드시 정리!\r\n```\r\n\r\n**사용 시나리오:**\r\n- 사용자 세션/인증 정보 전달\r\n- 트랜잭션 컨텍스트\r\n- SimpleDateFormat 등 스레드 안전하지 않은 객체\r\n\r\n**주의사항:**\r\n- **메모리 누수**: 스레드 풀 환경에서 remove() 미호출 시 누수\r\n- 스레드 재사용 시 이전 값이 남아있을 수 있음\r\n- try-finally로 항상 정리\r\n\r\n```java\r\ntry {\r\n    threadLocal.set(value);\r\n    // 작업\r\n} finally {\r\n    threadLocal.remove();  // 필수!\r\n}\r\n```",
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
    "answer": "**Executor Framework:**\r\n스레드 생성과 작업 실행을 분리한 추상화 계층 (Java 5+)\r\n\r\n**주요 인터페이스:**\r\n- **Executor**: 단순 실행 (execute)\r\n- **ExecutorService**: 라이프사이클 관리, Future 반환\r\n- **ScheduledExecutorService**: 지연/주기적 실행\r\n\r\n**Thread Pool 종류 (Executors 팩토리):**\r\n```java\r\n// 고정 크기 풀\r\nExecutors.newFixedThreadPool(10);\r\n// 캐시 풀 (0~무한, 60초 유휴 시 제거)\r\nExecutors.newCachedThreadPool();\r\n// 단일 스레드\r\nExecutors.newSingleThreadExecutor();\r\n// 스케줄링\r\nExecutors.newScheduledThreadPool(5);\r\n// Work-Stealing (Java 8+)\r\nExecutors.newWorkStealingPool();\r\n```\r\n\r\n**ThreadPoolExecutor 파라미터:**\r\n- corePoolSize, maximumPoolSize\r\n- keepAliveTime, workQueue\r\n- RejectedExecutionHandler\r\n\r\n**실무 권장:**\r\n- Executors 대신 ThreadPoolExecutor 직접 설정\r\n- 적절한 큐 크기와 거부 정책 설정",
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
    "answer": "**개념:**\r\n분할 정복(Divide and Conquer) 알고리즘을 병렬로 실행하기 위한 프레임워크 (Java 7+)\r\n\r\n**핵심 구성:**\r\n- **ForkJoinPool**: 작업 실행 풀\r\n- **ForkJoinTask**: 분할 가능한 작업 (RecursiveTask/RecursiveAction)\r\n- **Work-Stealing**: 유휴 스레드가 다른 스레드의 큐에서 작업을 훔쳐옴\r\n\r\n**동작 원리:**\r\n1. 작업을 작은 단위로 분할 (fork)\r\n2. 각 서브태스크를 병렬 실행\r\n3. 결과를 결합 (join)\r\n\r\n```java\r\nclass SumTask extends RecursiveTask<Long> {\r\n    protected Long compute() {\r\n        if (size <= THRESHOLD) {\r\n            return directSum();\r\n        }\r\n        SumTask left = new SumTask(leftHalf);\r\n        SumTask right = new SumTask(rightHalf);\r\n        left.fork();  // 비동기 실행\r\n        return right.compute() + left.join();  // 결과 결합\r\n    }\r\n}\r\n```\r\n\r\n**Work-Stealing:**\r\n- 각 스레드가 자체 Deque 보유\r\n- 자신의 큐가 비면 다른 스레드 큐의 tail에서 작업 훔침\r\n- 부하 균형 자동 조절",
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
    "answer": "**Stream API:**\r\n컬렉션 데이터를 선언적으로 처리하는 추상화 (Java 8+)\r\n\r\n**동작 원리:**\r\n1. **소스**: 컬렉션, 배열, 파일 등\r\n2. **중간 연산**: filter, map, sorted (지연 평가, Lazy)\r\n3. **최종 연산**: collect, forEach, reduce (실행 트리거)\r\n\r\n```java\r\nlist.stream()\r\n    .filter(x -> x > 10)   // 중간\r\n    .map(x -> x * 2)       // 중간\r\n    .collect(toList());    // 최종 - 여기서 실행\r\n```\r\n\r\n**지연 평가 (Lazy Evaluation):**\r\n- 최종 연산 호출 전까지 중간 연산 실행 안 함\r\n- 파이프라인 최적화 가능 (short-circuit 등)\r\n\r\n**병렬 처리:**\r\n```java\r\nlist.parallelStream()\r\n    .filter(...)\r\n    .collect(toList());\r\n// 또는\r\nlist.stream().parallel()\r\n```\r\n\r\n**병렬 스트림 주의사항:**\r\n- 공유 가변 상태 피하기\r\n- 작은 데이터셋은 오히려 오버헤드\r\n- 순서 의존 연산 주의 (forEachOrdered)\r\n- ForkJoinPool.commonPool() 사용",
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
    "answer": "**필요성:**\r\n- NullPointerException 방지\r\n- null 가능성을 명시적으로 표현\r\n- 함수형 스타일의 null 처리\r\n\r\n**올바른 사용:**\r\n```java\r\n// 생성\r\nOptional<String> opt = Optional.ofNullable(value);\r\nOptional<String> empty = Optional.empty();\r\n\r\n// 값 추출\r\nopt.orElse(\"default\");\r\nopt.orElseGet(() -> computeDefault());\r\nopt.orElseThrow(() -> new Exception());\r\n\r\n// 조건부 처리\r\nopt.ifPresent(v -> process(v));\r\nopt.ifPresentOrElse(v -> process(v), () -> handleEmpty());\r\n\r\n// 변환\r\nopt.map(String::toUpperCase)\r\n   .filter(s -> s.length() > 5)\r\n   .flatMap(this::findById);\r\n```\r\n\r\n**안티패턴 (피해야 할 것):**\r\n- `opt.get()` 직접 호출 (NoSuchElementException 위험)\r\n- `opt.isPresent()` + `opt.get()` 조합\r\n- 필드 타입으로 Optional 사용\r\n- 메서드 파라미터로 Optional 사용\r\n- 컬렉션을 Optional로 감싸기\r\n\r\n**권장:**\r\n- 메서드 반환 타입으로만 사용\r\n- 빈 컬렉션은 Optional 대신 빈 컬렉션 반환",
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
    "answer": "**Functional Interface:**\r\n- 추상 메서드가 정확히 1개인 인터페이스\r\n- @FunctionalInterface로 명시 (선택)\r\n- 람다/메서드 참조의 타겟 타입\r\n\r\n**주요 함수형 인터페이스:**\r\n| 인터페이스 | 메서드 | 용도 |\r\n|-----------|--------|------|\r\n| Function<T,R> | R apply(T) | 변환 |\r\n| Consumer<T> | void accept(T) | 소비 |\r\n| Supplier<T> | T get() | 생성 |\r\n| Predicate<T> | boolean test(T) | 조건 검사 |\r\n| BiFunction<T,U,R> | R apply(T,U) | 이항 변환 |\r\n\r\n**Lambda Expression:**\r\n익명 함수의 간결한 표현 (Java 8+)\r\n\r\n```java\r\n// 기본 형태\r\n(parameters) -> expression\r\n(parameters) -> { statements; }\r\n\r\n// 예시\r\nComparator<String> comp = (a, b) -> a.compareTo(b);\r\nlist.forEach(item -> System.out.println(item));\r\n\r\n// 타입 추론\r\nFunction<String, Integer> f = s -> s.length();\r\n```\r\n\r\n**특징:**\r\n- effectively final 변수만 캡처 가능\r\n- this는 람다를 감싸는 클래스 참조",
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
    "answer": "**Method Reference:**\r\n기존 메서드를 람다 대신 참조하는 간결한 문법 (::)\r\n\r\n**4가지 종류:**\r\n\r\n**1. 정적 메서드 참조**\r\n```java\r\n// ClassName::staticMethod\r\nFunction<String, Integer> f = Integer::parseInt;\r\n// 동일: s -> Integer.parseInt(s)\r\n```\r\n\r\n**2. 특정 객체의 인스턴스 메서드**\r\n```java\r\n// instance::method\r\nString str = \"hello\";\r\nSupplier<Integer> s = str::length;\r\n// 동일: () -> str.length()\r\n```\r\n\r\n**3. 임의 객체의 인스턴스 메서드**\r\n```java\r\n// ClassName::instanceMethod\r\nFunction<String, Integer> f = String::length;\r\n// 동일: s -> s.length()\r\n\r\nBiPredicate<String, String> bp = String::equals;\r\n// 동일: (s1, s2) -> s1.equals(s2)\r\n```\r\n\r\n**4. 생성자 참조**\r\n```java\r\n// ClassName::new\r\nSupplier<List<String>> s = ArrayList::new;\r\n// 동일: () -> new ArrayList<>()\r\n\r\nFunction<String, User> f = User::new;\r\n// 동일: name -> new User(name)\r\n```\r\n\r\n**사용 시점:**\r\n람다가 단순히 기존 메서드를 호출할 때 사용하면 가독성 향상",
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
    "answer": "**개념:**\r\n비동기 프로그래밍을 위한 Future의 확장 (Java 8+)\r\n\r\n**기본 사용:**\r\n```java\r\n// 비동기 실행\r\nCompletableFuture<String> future = CompletableFuture\r\n    .supplyAsync(() -> fetchData())  // 비동기 시작\r\n    .thenApply(data -> process(data))  // 변환\r\n    .thenAccept(result -> save(result));  // 소비\r\n\r\n// 결과 대기\r\nString result = future.get();  // 블로킹\r\nString result = future.join();  // unchecked exception\r\n```\r\n\r\n**주요 메서드:**\r\n| 메서드 | 설명 |\r\n|--------|------|\r\n| supplyAsync | 값 반환 비동기 실행 |\r\n| runAsync | 값 없이 비동기 실행 |\r\n| thenApply | 결과 변환 (map) |\r\n| thenCompose | 결과로 새 Future 생성 (flatMap) |\r\n| thenCombine | 두 Future 결과 결합 |\r\n| exceptionally | 예외 처리 |\r\n| handle | 결과/예외 모두 처리 |\r\n\r\n**병렬 처리:**\r\n```java\r\nCompletableFuture.allOf(future1, future2, future3).join();\r\nCompletableFuture.anyOf(future1, future2).get();\r\n```\r\n\r\n**실행 스레드:**\r\n- 기본: ForkJoinPool.commonPool()\r\n- 커스텀 Executor 지정 가능 (supplyAsync(task, executor))",
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
    "answer": "**개념:**\r\n런타임에 클래스의 메타정보를 조회하고 조작하는 API\r\n\r\n**주요 기능:**\r\n```java\r\n// 클래스 정보 얻기\r\nClass<?> clazz = Class.forName(\"com.example.User\");\r\nClass<?> clazz = obj.getClass();\r\n\r\n// 필드 접근\r\nField field = clazz.getDeclaredField(\"name\");\r\nfield.setAccessible(true);  // private 접근\r\nfield.set(obj, \"newValue\");\r\n\r\n// 메서드 호출\r\nMethod method = clazz.getMethod(\"getName\");\r\nObject result = method.invoke(obj);\r\n\r\n// 생성자로 객체 생성\r\nConstructor<?> ctor = clazz.getConstructor(String.class);\r\nObject instance = ctor.newInstance(\"arg\");\r\n```\r\n\r\n**사용 사례:**\r\n- 프레임워크: Spring DI, JPA, JUnit\r\n- 직렬화/역직렬화: Jackson, Gson\r\n- 동적 프록시 생성\r\n- IDE 자동완성, 디버거\r\n\r\n**단점:**\r\n- 성능 오버헤드 (캐싱으로 완화)\r\n- 컴파일 타임 타입 체크 불가\r\n- 캡슐화 위반 가능",
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
    "answer": "**개념:**\r\n런타임에 인터페이스를 구현하는 프록시 객체를 동적으로 생성\r\n\r\n**JDK Dynamic Proxy:**\r\n```java\r\n// InvocationHandler 구현\r\nInvocationHandler handler = (proxy, method, args) -> {\r\n    System.out.println(\"Before: \" + method.getName());\r\n    Object result = method.invoke(target, args);\r\n    System.out.println(\"After: \" + method.getName());\r\n    return result;\r\n};\r\n\r\n// 프록시 생성\r\nUserService proxy = (UserService) Proxy.newProxyInstance(\r\n    UserService.class.getClassLoader(),\r\n    new Class[]{UserService.class},\r\n    handler\r\n);\r\n```\r\n\r\n**동작 원리:**\r\n1. 런타임에 $Proxy0 클래스 동적 생성\r\n2. 지정된 인터페이스 구현\r\n3. 모든 메서드 호출을 InvocationHandler.invoke()로 위임\r\n\r\n**JDK Proxy vs CGLIB:**\r\n| 구분 | JDK Proxy | CGLIB |\r\n|------|-----------|-------|\r\n| 대상 | 인터페이스만 | 클래스도 가능 |\r\n| 방식 | 인터페이스 구현 | 클래스 상속 |\r\n| 제약 | 인터페이스 필요 | final 클래스 불가 |\r\n\r\n**사용 사례:**\r\n- Spring AOP\r\n- 트랜잭션 관리\r\n- 로깅, 보안, 캐싱",
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
    "answer": "**Annotation:**\r\n코드에 메타데이터를 부여하는 선언적 방법\r\n\r\n**동작 원리:**\r\n1. 컴파일 시 또는 런타임에 리플렉션으로 읽음\r\n2. Retention 정책에 따라 유지 범위 결정\r\n3. Annotation Processor 또는 리플렉션으로 처리\r\n\r\n**커스텀 Annotation 작성:**\r\n```java\r\n@Target(ElementType.METHOD)  // 적용 대상\r\n@Retention(RetentionPolicy.RUNTIME)  // 유지 정책\r\n@Documented\r\npublic @interface MyAnnotation {\r\n    String value() default \"\";\r\n    int count() default 0;\r\n}\r\n```\r\n\r\n**메타 어노테이션:**\r\n| 어노테이션 | 설명 |\r\n|-----------|------|\r\n| @Target | 적용 위치 (TYPE, METHOD, FIELD 등) |\r\n| @Retention | SOURCE, CLASS, RUNTIME |\r\n| @Inherited | 상속 시 어노테이션 상속 |\r\n| @Documented | Javadoc에 포함 |\r\n| @Repeatable | 반복 적용 가능 |\r\n\r\n**처리 방법:**\r\n```java\r\n// 런타임 리플렉션\r\nif (method.isAnnotationPresent(MyAnnotation.class)) {\r\n    MyAnnotation ann = method.getAnnotation(MyAnnotation.class);\r\n    String value = ann.value();\r\n}\r\n```",
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
    "answer": "**개념:**\r\n- **직렬화**: 객체를 바이트 스트림으로 변환\r\n- **역직렬화**: 바이트 스트림을 객체로 복원\r\n\r\n**사용 방법:**\r\n```java\r\n// Serializable 구현\r\nclass User implements Serializable {\r\n    private static final long serialVersionUID = 1L;\r\n    private String name;\r\n    private transient String password;  // 직렬화 제외\r\n}\r\n\r\n// 직렬화\r\ntry (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(\"user.ser\"))) {\r\n    oos.writeObject(user);\r\n}\r\n\r\n// 역직렬화\r\ntry (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(\"user.ser\"))) {\r\n    User user = (User) ois.readObject();\r\n}\r\n```\r\n\r\n**transient 키워드:**\r\n- 직렬화에서 제외할 필드에 사용\r\n- 역직렬화 시 기본값으로 초기화\r\n\r\n**주의사항:**\r\n- 보안 취약점 (원격 코드 실행 위험)\r\n- 버전 호환성 (serialVersionUID 필수)\r\n- 성능 이슈\r\n\r\n**대안:**\r\n- JSON (Jackson, Gson)\r\n- Protocol Buffers, Avro\r\n- Record serialization (Java 16+)",
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
    "answer": "**역할:**\r\n직렬화된 객체의 버전을 식별하여 역직렬화 시 클래스 호환성 검증\r\n\r\n**동작 방식:**\r\n1. 직렬화 시 클래스의 serialVersionUID 저장\r\n2. 역직렬화 시 현재 클래스의 serialVersionUID와 비교\r\n3. 불일치 시 InvalidClassException 발생\r\n\r\n```java\r\npublic class User implements Serializable {\r\n    private static final long serialVersionUID = 1L;  // 명시적 선언\r\n    private String name;\r\n}\r\n```\r\n\r\n**명시적 선언의 중요성:**\r\n- 선언 안 하면 컴파일러가 자동 생성 (클래스 구조 기반)\r\n- 작은 변경에도 UID가 달라져 역직렬화 실패 위험\r\n- IDE 경고: \"serializable class does not declare a static final serialVersionUID\"\r\n\r\n**호환성 관리:**\r\n- 필드 추가: 기본값으로 초기화 (호환)\r\n- 필드 삭제: 무시됨 (호환)\r\n- 필드 타입 변경: 비호환 (새 UID 필요)\r\n- 클래스 계층 변경: 비호환\r\n\r\n**생성 방법:**\r\n- `serialver` 유틸리티\r\n- IDE 자동 생성\r\n- 임의의 long 값 (1L 권장)",
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
    "answer": "**개념:**\r\nJava 9에서 도입된 JPMS(Java Platform Module System), 프로젝트 Jigsaw\r\n\r\n**목적:**\r\n- 강력한 캡슐화 (public이어도 export 안 하면 접근 불가)\r\n- 명시적 의존성 선언\r\n- JDK 모듈화 (필요한 것만 포함)\r\n- 런타임 이미지 최적화\r\n\r\n**module-info.java:**\r\n```java\r\nmodule com.myapp {\r\n    requires java.sql;           // 의존성\r\n    requires transitive java.logging;  // 전이 의존성\r\n\r\n    exports com.myapp.api;       // 외부 공개\r\n    exports com.myapp.internal to com.myapp.test;  // 제한적 공개\r\n\r\n    opens com.myapp.model to jackson.databind;  // 리플렉션 허용\r\n\r\n    provides SomeService with MyServiceImpl;  // 서비스 제공\r\n    uses SomeService;            // 서비스 사용\r\n}\r\n```\r\n\r\n**주요 키워드:**\r\n| 키워드 | 설명 |\r\n|--------|------|\r\n| requires | 모듈 의존성 |\r\n| exports | 패키지 공개 |\r\n| opens | 리플렉션 접근 허용 |\r\n| provides/uses | 서비스 로더 |\r\n\r\n**장점:**\r\n- 더 작은 런타임 (jlink로 커스텀 JRE)\r\n- 빠른 시작 시간\r\n- 보안 강화",
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
    "answer": "**개념:**\r\n지역 변수 타입 추론 (Local Variable Type Inference)\r\n\r\n**사용 예시:**\r\n```java\r\nvar list = new ArrayList<String>();  // ArrayList<String>\r\nvar stream = list.stream();          // Stream<String>\r\nvar entry = map.entrySet().iterator().next();\r\n\r\n// for 루프\r\nfor (var item : list) { }\r\nfor (var i = 0; i < 10; i++) { }\r\n\r\n// try-with-resources\r\ntry (var reader = new BufferedReader(...)) { }\r\n```\r\n\r\n**제한사항:**\r\n```java\r\n// 불가능한 경우\r\nvar x;                    // 초기화 필수\r\nvar x = null;             // 타입 추론 불가\r\nvar x = () -> {};         // 람다 타입 추론 불가\r\nvar x = {1, 2, 3};        // 배열 초기화 불가\r\n\r\n// 사용 불가 위치\r\nclass MyClass {\r\n    var field = 10;       // 필드 X\r\n    void method(var x) {} // 파라미터 X\r\n    var method() {}       // 반환 타입 X\r\n}\r\n```\r\n\r\n**가이드라인:**\r\n- 타입이 명확할 때 사용 (생성자, 리터럴)\r\n- 가독성 저하 시 명시적 타입 선언\r\n- 변수명으로 의미 전달\r\n\r\n```java\r\nvar userMap = new HashMap<Long, User>();  // OK\r\nvar result = service.process();           // 타입 불명확\r\n```",
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
    "answer": "**개념:**\r\n불변 데이터 캐리어를 간결하게 선언하는 클래스 (Java 16 정식)\r\n\r\n**기본 문법:**\r\n```java\r\npublic record User(String name, int age) { }\r\n\r\n// 자동 생성되는 것들:\r\n// - private final 필드\r\n// - Canonical 생성자\r\n// - name(), age() 접근자 메서드\r\n// - equals(), hashCode(), toString()\r\n```\r\n\r\n**특징:**\r\n- 암묵적으로 final (상속 불가)\r\n- 모든 필드 final (불변)\r\n- java.lang.Record 상속\r\n- 인터페이스 구현 가능\r\n\r\n**커스터마이징:**\r\n```java\r\npublic record User(String name, int age) {\r\n    // Compact 생성자 (유효성 검사)\r\n    public User {\r\n        if (age < 0) throw new IllegalArgumentException();\r\n        name = name.trim();  // 필드 수정\r\n    }\r\n\r\n    // 추가 메서드\r\n    public String displayName() {\r\n        return name + \" (\" + age + \")\";\r\n    }\r\n\r\n    // static 필드/메서드 가능\r\n    public static User anonymous() {\r\n        return new User(\"Anonymous\", 0);\r\n    }\r\n}\r\n```\r\n\r\n**사용 시나리오:**\r\n- DTO (Data Transfer Object)\r\n- 값 객체 (Value Object)\r\n- 다중 반환값\r\n- 패턴 매칭과 함께 사용",
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
    "answer": "**개념:**\r\n상속 가능한 클래스를 명시적으로 제한하는 기능 (Java 17 정식)\r\n\r\n**문법:**\r\n```java\r\npublic sealed class Shape\r\n    permits Circle, Rectangle, Triangle {\r\n}\r\n\r\npublic final class Circle extends Shape { }\r\npublic sealed class Rectangle extends Shape permits Square { }\r\npublic non-sealed class Triangle extends Shape { }  // 제한 해제\r\n```\r\n\r\n**하위 클래스 제한자:**\r\n| 제한자 | 의미 |\r\n|--------|------|\r\n| final | 더 이상 상속 불가 |\r\n| sealed | 추가 permits로 제한된 상속 |\r\n| non-sealed | 제한 없이 상속 허용 |\r\n\r\n**필요성:**\r\n1. **도메인 모델링**: 타입 계층을 완전히 제어\r\n2. **패턴 매칭**: 컴파일러가 모든 케이스 검증 가능 (exhaustiveness)\r\n3. **API 설계**: 의도된 확장만 허용\r\n\r\n**패턴 매칭과 함께:**\r\n```java\r\nstatic double area(Shape shape) {\r\n    return switch (shape) {\r\n        case Circle c -> Math.PI * c.radius() * c.radius();\r\n        case Rectangle r -> r.width() * r.height();\r\n        case Triangle t -> 0.5 * t.base() * t.height();\r\n        // 모든 케이스 커버됨 - default 불필요\r\n    };\r\n}\r\n```\r\n\r\n**vs enum:**\r\n- Sealed: 각 타입이 다른 필드/메서드 가질 수 있음\r\n- Enum: 모든 값이 같은 구조",
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
    "answer": "**1. Pattern Matching for instanceof (Java 16)**\r\n```java\r\n// 이전\r\nif (obj instanceof String) {\r\n    String s = (String) obj;\r\n    System.out.println(s.length());\r\n}\r\n\r\n// 이후\r\nif (obj instanceof String s) {\r\n    System.out.println(s.length());  // 자동 캐스팅\r\n}\r\n\r\n// 논리 연산과 함께\r\nif (obj instanceof String s && s.length() > 5) { }\r\n```\r\n\r\n**2. Pattern Matching for switch (Java 21)**\r\n```java\r\nstatic String format(Object obj) {\r\n    return switch (obj) {\r\n        case Integer i -> \"int: \" + i;\r\n        case Long l -> \"long: \" + l;\r\n        case String s -> \"string: \" + s;\r\n        case null -> \"null\";\r\n        default -> \"unknown\";\r\n    };\r\n}\r\n```\r\n\r\n**3. Record Pattern (Java 21)**\r\n```java\r\nrecord Point(int x, int y) {}\r\n\r\n// 레코드 분해\r\nif (obj instanceof Point(int x, int y)) {\r\n    System.out.println(x + y);\r\n}\r\n\r\n// switch에서\r\nswitch (obj) {\r\n    case Point(int x, int y) when x > 0 -> \"positive x\";\r\n    case Point(int x, int y) -> \"other point\";\r\n}\r\n```\r\n\r\n**4. Guarded Pattern (when 절)**\r\n```java\r\ncase String s when s.length() > 10 -> \"long string\";\r\n```\r\n\r\n**장점:**\r\n- 보일러플레이트 코드 감소\r\n- 타입 안전성 향상\r\n- 함수형 스타일 지원",
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
    "answer": "**JVM (Java Virtual Machine):**\r\n자바 바이트코드를 해석하고 실행하는 가상 머신\r\n\r\n**주요 기능:**\r\n1. **플랫폼 독립성**: \"Write Once, Run Anywhere\" - OS별 JVM이 바이트코드 실행\r\n2. **메모리 관리**: 자동 메모리 할당 및 GC로 해제\r\n3. **보안**: 바이트코드 검증, 샌드박스 실행\r\n4. **최적화**: JIT 컴파일러로 핫스팟 코드 네이티브 변환\r\n5. **스레드 관리**: 멀티스레딩 지원 및 동기화\r\n\r\n**실행 흐름:**\r\n```\r\n.java (소스) → javac → .class (바이트코드) → JVM → 기계어 실행\r\n```\r\n\r\n**JVM 구현체:**\r\n- Oracle HotSpot (가장 널리 사용)\r\n- OpenJ9 (IBM)\r\n- GraalVM (다국어 지원)\r\n- Azul Zulu, Amazon Corretto",
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
    "answer": "**가능합니다.** JVM은 바이트코드를 실행하므로, 바이트코드로 컴파일되는 언어면 모두 실행 가능합니다.\r\n\r\n**JVM 언어들:**\r\n| 언어 | 특징 |\r\n|------|------|\r\n| **Kotlin** | 안드로이드 공식 언어, Java 상호운용 |\r\n| **Scala** | 함수형 + 객체지향, 대용량 데이터 처리 |\r\n| **Groovy** | 동적 타이핑, 스크립팅, Gradle |\r\n| **Clojure** | Lisp 계열 함수형 언어 |\r\n| **JRuby** | Ruby의 JVM 구현 |\r\n| **Jython** | Python의 JVM 구현 |\r\n\r\n**장점:**\r\n- JVM 생태계(라이브러리, 도구) 활용\r\n- Java 클래스와 상호 호출 가능\r\n- 성숙한 GC, JIT 최적화 혜택\r\n- 크로스 플랫폼\r\n\r\n**상호운용 예시:**\r\n```kotlin\r\n// Kotlin에서 Java 호출\r\nval list = java.util.ArrayList<String>()\r\nlist.add(\"Hello\")\r\n```",
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
    "answer": "**가능합니다.** AOT(Ahead-Of-Time) 컴파일을 통해 네이티브 실행 파일로 변환할 수 있습니다.\r\n\r\n**방법들:**\r\n\r\n**1. GraalVM Native Image**\r\n```bash\r\nnative-image -jar myapp.jar\r\n# 결과: myapp 실행 파일 (JVM 불필요)\r\n```\r\n- 빠른 시작 시간 (밀리초)\r\n- 적은 메모리 사용\r\n- 단, 빌드 시간 길고 리플렉션 제약\r\n\r\n**2. Kotlin Native**\r\n- LLVM 기반 네이티브 컴파일\r\n- iOS, macOS, Windows, Linux 지원\r\n- JVM 없이 독립 실행\r\n\r\n**3. Scala Native**\r\n- LLVM 백엔드로 네이티브 컴파일\r\n\r\n**장점:**\r\n- JVM 워밍업 시간 제거\r\n- 컨테이너/서버리스에 적합\r\n- 배포 크기 감소\r\n\r\n**단점:**\r\n- 리플렉션, 동적 기능 제약\r\n- 빌드 시간 증가\r\n- 일부 라이브러리 호환성 이슈",
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
    "answer": "**장점:**\r\n\r\n1. **플랫폼 독립성**\r\n   - 한 번 컴파일, 어디서나 실행\r\n   - OS별 코드 수정 불필요\r\n\r\n2. **메모리 관리**\r\n   - 자동 GC로 메모리 누수 감소\r\n   - 개발자가 메모리 직접 관리 불필요\r\n\r\n3. **보안**\r\n   - 바이트코드 검증\r\n   - 샌드박스 실행 환경\r\n\r\n4. **런타임 최적화**\r\n   - JIT 컴파일러가 핫스팟 최적화\r\n   - 프로파일링 기반 동적 최적화\r\n\r\n5. **풍부한 생태계**\r\n   - 표준 라이브러리, 모니터링 도구\r\n\r\n**단점:**\r\n\r\n1. **성능 오버헤드**\r\n   - 네이티브 코드 대비 느릴 수 있음\r\n   - 해석 실행 비용\r\n\r\n2. **시작 시간**\r\n   - JVM 워밍업, 클래스 로딩 시간\r\n   - 서버리스/CLI에 불리\r\n\r\n3. **메모리 사용량**\r\n   - JVM 자체 메모리 소비\r\n   - 객체 헤더 등 오버헤드\r\n\r\n4. **GC 중단 (STW)**\r\n   - 예측 불가능한 지연",
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
    "answer": "**아닙니다.** JVM과 Java 프로그램은 부모-자식 프로세스 관계가 아닙니다.\r\n\r\n**실제 관계:**\r\n- JVM은 하나의 **프로세스**\r\n- Java 프로그램은 그 프로세스 내에서 실행되는 **스레드**\r\n- 즉, **동일 프로세스 내**에서 실행됨\r\n\r\n**프로세스 구조:**\r\n```\r\nOS 프로세스 (java 명령어)\r\n├── JVM (런타임 환경)\r\n│   ├── Main Thread (Java 애플리케이션)\r\n│   ├── GC Thread\r\n│   ├── JIT Compiler Thread\r\n│   └── 기타 데몬 스레드\r\n└── 네이티브 메모리\r\n```\r\n\r\n**부모-자식 프로세스와의 차이:**\r\n| 구분 | 부모-자식 프로세스 | JVM-Java 프로그램 |\r\n|------|-------------------|------------------|\r\n| 메모리 | 독립 (IPC 필요) | 공유 (힙, 메서드 영역) |\r\n| 생명주기 | 독립적 | JVM 종료 시 함께 종료 |\r\n| 관계 | fork() | 동일 프로세스 내 스레드 |\r\n\r\n**Runtime.exec()로 자식 프로세스 생성은 가능:**\r\n```java\r\nProcess p = Runtime.getRuntime().exec(\"command\");\r\n// 이 경우 별도 프로세스 생성\r\n```",
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
    "answer": "**1. 불변성 보장**\r\n- 변수: 재할당 방지로 실수 예방\r\n- 안전한 공유 (멀티스레드에서 동기화 불필요)\r\n\r\n**2. 설계 의도 명확화**\r\n- 클래스: 상속 금지 (예: String, 보안/설계상 이유)\r\n- 메서드: 오버라이딩 금지 (템플릿 메서드 패턴)\r\n\r\n**3. 성능 최적화 가능성**\r\n- 컴파일러/JIT 최적화 힌트\r\n- 인라이닝 가능성 증가\r\n\r\n**4. 람다/익명 클래스 캡처**\r\n- 지역 변수 캡처 시 effectively final 필요\r\n\r\n**사용 예:**\r\n```java\r\npublic final class ImmutableValue {  // 상속 금지\r\n    private final int value;  // 불변 필드\r\n\r\n    public final int getValue() {  // 오버라이딩 금지\r\n        return value;\r\n    }\r\n}\r\n```\r\n\r\n**가이드라인:**\r\n- 불변 객체 설계 시 적극 활용\r\n- 상수는 `static final` 조합\r\n- 변경 의도 없는 지역 변수에 습관적 사용 권장",
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
    "answer": "**예, 컴파일러가 final을 특별히 처리합니다.**\r\n\r\n**1. 상수 폴딩 (Constant Folding)**\r\n```java\r\nstatic final int MAX = 100;\r\nint result = MAX * 2;\r\n// 컴파일 시 → int result = 200; (상수로 치환)\r\n```\r\n- `static final` 기본형/String은 컴파일 타임 상수\r\n- 사용처에 값이 직접 삽입됨 (인라이닝)\r\n\r\n**2. 바이트코드 차이**\r\n```java\r\nfinal int x = 10;\r\nint y = 10;\r\n```\r\n- 바이트코드 자체는 유사하지만, JIT 최적화에 영향\r\n\r\n**3. final 메서드**\r\n- `invokevirtual` 대신 더 효율적인 호출 가능\r\n- 인라이닝 가능성 증가\r\n\r\n**4. final 클래스**\r\n- 하위 타입 없음 보장 → 최적화 기회\r\n\r\n**주의:**\r\n- `static final` 참조 타입은 상수 폴딩 안 됨\r\n```java\r\nstatic final List<String> LIST = new ArrayList<>();\r\n// 참조는 상수, 내용물은 가변\r\n```\r\n\r\n**실무 영향:**\r\n- 큰 성능 차이는 드물지만, JIT 최적화에 힌트 제공\r\n- 코드 명확성이 더 중요한 이점",
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
    "answer": "| 구분 | 인터페이스 | 추상 클래스 |\r\n|------|-----------|-------------|\r\n| 다중 상속 | 가능 | 불가 (단일 상속) |\r\n| 생성자 | 없음 | 있음 |\r\n| 필드 | public static final | 모든 종류 |\r\n| 메서드 | public abstract + default/static | 모든 종류 |\r\n| 접근 제어자 | public만 | 모두 가능 |\r\n| 목적 | 행위 계약 (can-do) | 공통 구현 공유 (is-a) |\r\n\r\n**언제 사용?**\r\n\r\n**인터페이스:**\r\n- 관련 없는 클래스에 공통 기능 부여\r\n- 다중 역할이 필요할 때\r\n- API 계약 정의\r\n```java\r\nclass Dog implements Runnable, Comparable<Dog> { }\r\n```\r\n\r\n**추상 클래스:**\r\n- 밀접한 클래스 간 코드 공유\r\n- 공통 상태(필드) 필요\r\n- 템플릿 메서드 패턴\r\n```java\r\nabstract class Animal {\r\n    protected String name;\r\n    abstract void makeSound();\r\n    void sleep() { /* 공통 구현 */ }\r\n}\r\n```\r\n\r\n**Java 8+ 변화:**\r\n- 인터페이스에 default 메서드로 구현 가능해져 차이 줄어듦\r\n- 하지만 상태(인스턴스 필드) 여부가 여전히 핵심 차이",
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
    "answer": "**다이아몬드 문제 (Diamond Problem) 회피**\r\n\r\n**클래스 다중 상속의 문제:**\r\n```\r\n       A (메서드 m())\r\n      / \\\r\n     B   C  (둘 다 m() 오버라이드)\r\n      \\ /\r\n       D  → 어떤 m()을 상속?\r\n```\r\n- 상태(필드)와 구현이 충돌\r\n- 어느 부모의 구현을 사용할지 모호\r\n\r\n**인터페이스가 안전한 이유:**\r\n\r\n**1. 상태 없음**\r\n- 인터페이스는 인스턴스 필드가 없음\r\n- 상태 충돌 불가능\r\n\r\n**2. 메서드 시그니처만 정의 (Java 7까지)**\r\n- 구현이 없으니 충돌할 것이 없음\r\n\r\n**3. Java 8+ default 메서드 충돌 해결:**\r\n```java\r\ninterface A { default void m() { } }\r\ninterface B { default void m() { } }\r\n\r\nclass C implements A, B {\r\n    @Override\r\n    public void m() {\r\n        A.super.m();  // 명시적 선택\r\n    }\r\n}\r\n```\r\n- 컴파일러가 강제로 오버라이딩 요구\r\n- 개발자가 명시적으로 해결\r\n\r\n**결론:**\r\n- 클래스 다중 상속은 복잡성과 모호성 유발\r\n- 인터페이스는 계약만 정의하므로 안전하게 다중 구현 가능",
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
    "answer": "**개념:**\r\n런타임에 클래스의 구조(메서드, 필드, 생성자 등)를 분석하고 조작하는 기능\r\n\r\n**핵심 클래스:**\r\n- `Class<?>`: 클래스 메타정보\r\n- `Method`: 메서드 정보 및 호출\r\n- `Field`: 필드 접근 및 수정\r\n- `Constructor`: 객체 생성\r\n\r\n**사용 예:**\r\n```java\r\n// 클래스 정보 획득\r\nClass<?> clazz = Class.forName(\"com.example.User\");\r\n\r\n// 메서드 호출\r\nMethod method = clazz.getMethod(\"getName\");\r\nObject result = method.invoke(instance);\r\n\r\n// 필드 접근 (private 포함)\r\nField field = clazz.getDeclaredField(\"age\");\r\nfield.setAccessible(true);\r\nfield.set(instance, 25);\r\n\r\n// 객체 생성\r\nConstructor<?> ctor = clazz.getConstructor(String.class);\r\nObject obj = ctor.newInstance(\"John\");\r\n```\r\n\r\n**사용 사례:**\r\n- 프레임워크 (Spring, Hibernate, JUnit)\r\n- 의존성 주입 (DI)\r\n- ORM 매핑\r\n- 직렬화/역직렬화\r\n- IDE 기능 (자동완성, 리팩토링)",
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
    "answer": "**예, 보안 위험이 있습니다.**\r\n\r\n**보안 문제:**\r\n1. **캡슐화 위반**: private 필드/메서드 접근 가능\r\n2. **불변 객체 변경**: final 필드도 수정 가능\r\n3. **접근 제어 무력화**: setAccessible(true)로 모든 제한 우회\r\n4. **악성 코드 실행**: 임의 클래스 로드 및 메서드 호출\r\n\r\n**방지 방법:**\r\n\r\n**1. SecurityManager (Java 17 deprecated)**\r\n```java\r\nSystem.setSecurityManager(new SecurityManager());\r\n// ReflectPermission 제한\r\n```\r\n\r\n**2. 모듈 시스템 (Java 9+)**\r\n```java\r\nmodule my.module {\r\n    exports com.api;  // public API만 공개\r\n    // 내부 패키지는 리플렉션으로도 접근 불가\r\n}\r\n```\r\n\r\n**3. setAccessible 제한**\r\n- 모듈 경계에서 기본적으로 차단\r\n- `--illegal-access=deny` 옵션\r\n\r\n**4. 코드 설계**\r\n- 신뢰할 수 없는 입력으로 Class.forName() 금지\r\n- 화이트리스트 기반 클래스 허용\r\n\r\n**실무 관점:**\r\n- 내부 프레임워크/라이브러리에서는 필요악\r\n- 외부 입력 기반 리플렉션은 위험\r\n- Java 모듈 시스템이 현대적 해결책",
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
    "answer": "**1. 프레임워크 개발**\r\n- **Spring DI**: @Autowired로 의존성 자동 주입\r\n- **JPA/Hibernate**: 엔티티 ↔ 테이블 매핑\r\n- **JUnit**: @Test 메서드 자동 발견 및 실행\r\n\r\n**2. 동적 객체 생성**\r\n```java\r\n// 설정 기반 객체 생성\r\nString className = config.get(\"handler.class\");\r\nClass<?> clazz = Class.forName(className);\r\nHandler handler = (Handler) clazz.getDeclaredConstructor().newInstance();\r\n```\r\n\r\n**3. 직렬화/역직렬화**\r\n- Jackson, Gson이 JSON ↔ 객체 변환 시 사용\r\n- 필드명으로 setter/getter 호출\r\n\r\n**4. 프록시 생성**\r\n- AOP (로깅, 트랜잭션)\r\n- Mock 객체 (Mockito)\r\n\r\n**5. 어노테이션 처리**\r\n```java\r\nfor (Method m : clazz.getMethods()) {\r\n    if (m.isAnnotationPresent(Transactional.class)) {\r\n        // 트랜잭션 처리\r\n    }\r\n}\r\n```\r\n\r\n**6. IDE/개발도구**\r\n- 자동완성, 리팩토링\r\n- 디버거\r\n\r\n**사용 시 주의:**\r\n- 성능 오버헤드 (캐싱으로 완화)\r\n- 컴파일 타임 체크 불가\r\n- 꼭 필요한 경우에만 사용",
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
    "answer": "**Static Method:**\r\n```java\r\nclass Calculator {\r\n    static int add(int a, int b) {\r\n        return a + b;\r\n    }\r\n}\r\nCalculator.add(1, 2);  // 인스턴스 없이 호출\r\n```\r\n\r\n**특징:**\r\n- 클래스 레벨에 속함\r\n- 인스턴스 멤버 접근 불가 (this 없음)\r\n- 유틸리티 메서드에 적합\r\n\r\n---\r\n\r\n**Static Class (Static Nested Class):**\r\n```java\r\nclass Outer {\r\n    static class StaticNested {\r\n        void method() { }\r\n    }\r\n}\r\nOuter.StaticNested nested = new Outer.StaticNested();\r\n```\r\n\r\n**특징:**\r\n- 외부 클래스 인스턴스 없이 생성 가능\r\n- 외부 클래스의 인스턴스 멤버 접근 불가\r\n- static 멤버만 접근 가능\r\n\r\n---\r\n\r\n**비교:**\r\n\r\n| 구분 | Static Method | Static Class |\r\n|------|---------------|--------------|\r\n| 대상 | 메서드 | 내부 클래스 |\r\n| 인스턴스 필요 | 호출 시 불필요 | 생성 시 외부 인스턴스 불필요 |\r\n| 외부 접근 | static 멤버만 | static 멤버만 |\r\n| 용도 | 유틸리티 함수 | 논리적 그룹화, 빌더 패턴 |\r\n\r\n**참고:** 최상위 클래스는 static 불가 (내부 클래스만 static 가능)",
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
    "answer": "**이점:**\r\n\r\n1. **메모리 효율**\r\n   - 인스턴스 생성 없이 사용\r\n   - 모든 인스턴스가 공유 (중복 제거)\r\n\r\n2. **전역 접근**\r\n   - 클래스명으로 어디서든 접근\r\n   - 유틸리티 메서드에 적합\r\n\r\n3. **상수 정의**\r\n   ```java\r\n   public static final double PI = 3.14159;\r\n   ```\r\n\r\n4. **팩토리 메서드**\r\n   ```java\r\n   public static User createAdmin() { }\r\n   ```\r\n\r\n---\r\n\r\n**제약:**\r\n\r\n1. **인스턴스 멤버 접근 불가**\r\n   ```java\r\n   static void method() {\r\n       // this.field;  // 컴파일 에러\r\n       // instanceMethod();  // 컴파일 에러\r\n   }\r\n   ```\r\n\r\n2. **오버라이딩 불가**\r\n   - 다형성 활용 제한\r\n   - 하위 클래스에서 숨기기(hiding)만 가능\r\n\r\n3. **테스트 어려움**\r\n   - Mock 어려움, 상태 공유로 테스트 격리 문제\r\n\r\n4. **메모리 누수 위험**\r\n   - 클래스 로더 언로드 전까지 유지\r\n   - 컬렉션에 객체 쌓이면 누수\r\n\r\n5. **멀티스레드 동기화 필요**\r\n   - 공유 상태이므로 동시 접근 주의",
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
    "answer": "**컴파일 시:**\r\n\r\n1. **static 멤버 바이트코드 생성**\r\n   - 메서드 호출: `invokestatic` 명령어\r\n   - 필드 접근: `getstatic`, `putstatic` 명령어\r\n\r\n2. **상수 폴딩 (static final)**\r\n   ```java\r\n   static final int MAX = 100;\r\n   int x = MAX;  // 컴파일 시 → int x = 100;\r\n   ```\r\n\r\n---\r\n\r\n**클래스 로딩 시:**\r\n\r\n1. **Method Area에 저장**\r\n   - 클래스 메타정보와 함께 static 변수 저장\r\n   - 모든 인스턴스가 공유\r\n\r\n2. **초기화 순서**\r\n   ```java\r\n   static int a = 10;        // 1. 선언 순서대로\r\n   static { a = 20; }        // 2. static 블록 실행\r\n   ```\r\n\r\n3. **clinit 메서드**\r\n   - 컴파일러가 static 초기화 코드를 모아 `<clinit>` 생성\r\n   - 클래스 로딩 시 한 번만 실행\r\n   - 스레드 안전하게 동기화됨\r\n\r\n**바이트코드 예:**\r\n```\r\n// static 메서드 호출\r\ninvokestatic MyClass.staticMethod()V\r\n\r\n// static 필드 읽기\r\ngetstatic MyClass.staticField:I\r\n```\r\n\r\n**vs 인스턴스:**\r\n- 인스턴스: `invokevirtual`, `getfield`\r\n- static: `invokestatic`, `getstatic`",
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
    "answer": "**예외 계층 구조:**\r\n```\r\nThrowable\r\n├── Error (시스템 오류, 복구 불가)\r\n│   ├── OutOfMemoryError\r\n│   └── StackOverflowError\r\n└── Exception\r\n    ├── Checked Exception (컴파일 타임 검사)\r\n    │   ├── IOException\r\n    │   └── SQLException\r\n    └── RuntimeException (Unchecked)\r\n        ├── NullPointerException\r\n        ├── IllegalArgumentException\r\n        └── IndexOutOfBoundsException\r\n```\r\n\r\n**Exception vs Error:**\r\n- **Exception**: 애플리케이션 레벨, 처리 가능\r\n- **Error**: JVM/시스템 레벨, 복구 불가\r\n\r\n**예외 처리:**\r\n```java\r\ntry {\r\n    riskyOperation();\r\n} catch (SpecificException e) {\r\n    handleSpecific(e);\r\n} catch (Exception e) {\r\n    handleGeneral(e);\r\n} finally {\r\n    cleanup();  // 항상 실행\r\n}\r\n```\r\n\r\n**예외 전파:**\r\n```java\r\nvoid method() throws IOException {\r\n    throw new IOException(\"File not found\");\r\n}\r\n```\r\n\r\n**목적:**\r\n- 정상 흐름과 오류 처리 분리\r\n- 오류 정보 전달 (메시지, 스택 트레이스)\r\n- 적절한 수준에서 처리 가능",
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
    "answer": "**1. 예외 복구 (Recovery)**\r\n```java\r\nint maxRetry = 3;\r\nwhile (maxRetry-- > 0) {\r\n    try {\r\n        return connect();\r\n    } catch (ConnectionException e) {\r\n        Thread.sleep(1000);  // 재시도\r\n    }\r\n}\r\nthrow new ServiceException(\"Failed after retries\");\r\n```\r\n- 예외 상황을 복구하고 정상 흐름 진행\r\n- 재시도, 대체 값 반환 등\r\n\r\n**2. 예외 회피 (Avoidance/Propagation)**\r\n```java\r\npublic void method() throws IOException {\r\n    // 처리하지 않고 호출자에게 위임\r\n    delegate.doSomething();\r\n}\r\n```\r\n- 상위 호출자에게 처리 책임 전가\r\n- 해당 레이어에서 처리할 수 없을 때\r\n\r\n**3. 예외 전환 (Translation)**\r\n```java\r\ntry {\r\n    repository.save(entity);\r\n} catch (SQLException e) {\r\n    throw new DataAccessException(\"저장 실패\", e);  // 원인 포함\r\n}\r\n```\r\n- 저수준 예외를 고수준으로 변환\r\n- 추상화 수준 유지, 의미 있는 예외로 변경\r\n- 원본 예외를 cause로 포함\r\n\r\n**선택 기준:**\r\n- 복구 가능? → 복구\r\n- 상위에서 처리해야? → 회피\r\n- 더 의미 있는 예외로? → 전환",
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
    "answer": "| 구분 | Checked Exception | Unchecked Exception |\r\n|------|-------------------|---------------------|\r\n| 상속 | Exception (RuntimeException 제외) | RuntimeException |\r\n| 컴파일 검사 | O (try-catch 또는 throws 필수) | X |\r\n| 발생 시점 | 예측 가능한 외부 요인 | 프로그래밍 오류 |\r\n| 복구 가능성 | 복구 시도 기대 | 버그 수정 필요 |\r\n\r\n**Checked Exception:**\r\n```java\r\n// 반드시 처리해야 함\r\nvoid readFile() throws IOException {  // 선언 필수\r\n    FileReader fr = new FileReader(\"file.txt\");\r\n}\r\n```\r\n- IOException, SQLException, FileNotFoundException\r\n- 외부 시스템 오류, 복구 가능\r\n\r\n**Unchecked Exception:**\r\n```java\r\n// 처리 선택적\r\nvoid divide(int a, int b) {\r\n    return a / b;  // ArithmeticException 가능\r\n}\r\n```\r\n- NullPointerException, IllegalArgumentException\r\n- 프로그래밍 실수, 방어 코딩으로 예방\r\n\r\n**현대적 관점:**\r\n- Spring, JPA는 Unchecked 선호\r\n- Checked는 과도한 보일러플레이트 유발\r\n- 중요한 예외만 명시적 처리, 나머지는 전역 핸들러",
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
    "answer": "**성능 영향:**\r\n예, 예외 발생 시 상당한 오버헤드가 있습니다.\r\n\r\n**비용 발생 원인:**\r\n1. **스택 트레이스 생성**: 호출 스택 전체 캡처 (가장 비용 큼)\r\n2. **예외 객체 생성**: 힙 메모리 할당\r\n3. **스택 언와인딩**: catch 블록 탐색\r\n\r\n**측정:**\r\n- 정상 흐름 대비 수십~수백 배 느림\r\n- fillInStackTrace()가 대부분의 비용\r\n\r\n---\r\n\r\n**부하 줄이는 방법:**\r\n\r\n**1. 예외를 제어 흐름으로 사용 금지**\r\n```java\r\n// Bad\r\ntry {\r\n    int i = 0;\r\n    while(true) array[i++]++;\r\n} catch (ArrayIndexOutOfBoundsException e) { }\r\n\r\n// Good\r\nfor (int i = 0; i < array.length; i++) array[i]++;\r\n```\r\n\r\n**2. 스택 트레이스 생략 (성능 중시 시)**\r\n```java\r\npublic class FastException extends RuntimeException {\r\n    @Override\r\n    public Throwable fillInStackTrace() {\r\n        return this;  // 스택 트레이스 생략\r\n    }\r\n}\r\n```\r\n\r\n**3. 예외 재사용 (특수 상황)**\r\n```java\r\nprivate static final Exception CACHED = new Exception();\r\n```\r\n\r\n**4. 예외 발생 조건 사전 검사**\r\n```java\r\nif (value == null) return Optional.empty();\r\n```\r\n\r\n**결론:**\r\n- 정상 흐름에서 예외 사용 금지\r\n- 예외는 진정한 예외 상황에만",
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
    "answer": "**개념:**\r\n임계 영역(Critical Section)에 하나의 스레드만 진입하도록 보장하는 키워드\r\n\r\n**동작 원리:**\r\n- 모니터 락(Monitor Lock) 기반\r\n- 락 획득 → 코드 실행 → 락 해제\r\n- 다른 스레드는 락 획득까지 대기 (blocking)\r\n\r\n**사용 방법:**\r\n```java\r\n// 1. 인스턴스 메서드 (this 락)\r\npublic synchronized void method() { }\r\n\r\n// 2. 정적 메서드 (Class 객체 락)\r\npublic static synchronized void staticMethod() { }\r\n\r\n// 3. 블록 (명시적 락 객체)\r\npublic void method() {\r\n    synchronized (lockObject) {\r\n        // 임계 영역\r\n    }\r\n}\r\n```\r\n\r\n**보장하는 것:**\r\n- **상호 배제**: 한 번에 한 스레드만\r\n- **가시성**: 락 해제 시 변경사항 다른 스레드에 보임\r\n- **Happens-Before**: 락 해제 → 락 획득 순서 보장\r\n\r\n**특징:**\r\n- 재진입 가능 (같은 스레드가 락을 다시 획득 가능)\r\n- 자동 락 해제 (예외 발생해도)",
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
    "answer": "**1. 인스턴스 메서드**\r\n```java\r\npublic synchronized void method() { }\r\n// 동일: synchronized(this) { ... }\r\n```\r\n- 락 객체: **this** (현재 인스턴스)\r\n- 같은 인스턴스의 synchronized 메서드끼리 상호 배제\r\n- 다른 인스턴스는 동시 실행 가능\r\n\r\n**2. 정적 메서드**\r\n```java\r\npublic static synchronized void method() { }\r\n// 동일: synchronized(MyClass.class) { ... }\r\n```\r\n- 락 객체: **Class 객체** (MyClass.class)\r\n- 모든 인스턴스에서 상호 배제\r\n- 인스턴스 메서드와는 다른 락\r\n\r\n**3. synchronized 블록**\r\n```java\r\nsynchronized (lockObject) {\r\n    // 임계 영역\r\n}\r\n```\r\n- 락 객체: **명시한 객체**\r\n- 세밀한 제어 가능\r\n- 필요한 부분만 동기화\r\n\r\n**주의:**\r\n```java\r\nclass Counter {\r\n    synchronized void inc() { }       // this 락\r\n    static synchronized void dec() { } // Counter.class 락\r\n    // 이 둘은 다른 락이므로 동시 실행 가능!\r\n}\r\n```\r\n\r\n**권장:**\r\n- 메서드 전체보다 블록 동기화 선호 (범위 최소화)\r\n- private final 락 객체 사용",
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
    "answer": "**장점:**\r\n- 사용이 간단하고 직관적\r\n- 자동 락 해제 (예외 시에도)\r\n- 재진입 가능\r\n- JVM 최적화 (바이어스 락, 경량 락)\r\n\r\n**단점:**\r\n\r\n1. **유연성 부족**\r\n   - tryLock (타임아웃) 불가\r\n   - 공정성 설정 불가\r\n   - 조건 분기 어려움\r\n\r\n2. **성능 제한**\r\n   - 읽기-읽기도 블로킹\r\n   - 블록 단위로만 해제\r\n\r\n3. **데드락 위험**\r\n   - 락 순서 제어 어려움\r\n   - 대기 중 인터럽트 불가\r\n\r\n**언제 사용?**\r\n- 단순한 동기화\r\n- 짧은 임계 영역\r\n- 복잡한 동기화 불필요 시\r\n\r\n**대안 고려:**\r\n```java\r\n// 읽기 많을 때\r\nReadWriteLock rwLock = new ReentrantReadWriteLock();\r\n\r\n// 타임아웃 필요\r\nif (lock.tryLock(1, TimeUnit.SECONDS)) { }\r\n\r\n// 단일 변수\r\nAtomicInteger counter = new AtomicInteger();\r\n```\r\n\r\n**결론:**\r\n- 단순한 케이스에는 충분히 좋음\r\n- 복잡한 동기화는 java.util.concurrent 활용",
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
    "answer": "**1. ReentrantLock**\r\n```java\r\nLock lock = new ReentrantLock();\r\nlock.lock();\r\ntry {\r\n    // 임계 영역\r\n} finally {\r\n    lock.unlock();\r\n}\r\n\r\n// tryLock으로 타임아웃\r\nif (lock.tryLock(1, TimeUnit.SECONDS)) { }\r\n```\r\n- 명시적 락/언락\r\n- tryLock, 인터럽트 지원\r\n- 공정성 설정 가능\r\n\r\n**2. ReadWriteLock**\r\n```java\r\nReadWriteLock rwLock = new ReentrantReadWriteLock();\r\nrwLock.readLock().lock();   // 읽기 - 동시 가능\r\nrwLock.writeLock().lock();  // 쓰기 - 배타적\r\n```\r\n- 읽기 작업 많을 때 성능 향상\r\n\r\n**3. Atomic 클래스**\r\n```java\r\nAtomicInteger count = new AtomicInteger(0);\r\ncount.incrementAndGet();  // 락 없이 원자적\r\ncount.compareAndSet(expect, update);  // CAS\r\n```\r\n- 락 프리(Lock-free)\r\n- 단일 변수 원자적 연산\r\n\r\n**4. volatile**\r\n```java\r\nvolatile boolean flag = true;\r\n```\r\n- 가시성 보장\r\n- 단순 읽기/쓰기만 원자적\r\n\r\n**5. StampedLock (Java 8+)**\r\n- 낙관적 읽기 지원\r\n- 높은 성능\r\n\r\n**선택 기준:**\r\n| 상황 | 권장 |\r\n|------|------|\r\n| 단순 동기화 | synchronized |\r\n| 복잡한 제어 | ReentrantLock |\r\n| 읽기 위주 | ReadWriteLock |\r\n| 단일 변수 | Atomic |",
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
    "answer": "**개념:**\r\n각 스레드가 독립적인 변수 복사본을 가지게 하는 클래스\r\n\r\n**사용법:**\r\n```java\r\nThreadLocal<User> userContext = ThreadLocal.withInitial(() -> null);\r\n\r\n// 값 설정\r\nuserContext.set(currentUser);\r\n\r\n// 값 조회\r\nUser user = userContext.get();\r\n\r\n// 반드시 제거 (메모리 누수 방지)\r\nuserContext.remove();\r\n```\r\n\r\n**동작 원리:**\r\n- 각 Thread 내부에 ThreadLocalMap 존재\r\n- ThreadLocal 객체를 키로, 값을 저장\r\n- 스레드별 격리된 저장 공간\r\n\r\n**사용 사례:**\r\n- 사용자 세션/인증 정보 (SecurityContextHolder)\r\n- 트랜잭션 컨텍스트\r\n- 포맷터 (SimpleDateFormat - 스레드 안전하지 않음)\r\n- 요청별 로깅 컨텍스트\r\n\r\n**주의사항:**\r\n```java\r\ntry {\r\n    threadLocal.set(value);\r\n    process();\r\n} finally {\r\n    threadLocal.remove();  // 필수!\r\n}\r\n```\r\n- 스레드 풀 환경에서 remove() 안 하면 메모리 누수\r\n- 이전 요청 데이터가 남아 보안 문제 가능\r\n\r\n**InheritableThreadLocal:**\r\n- 자식 스레드에 값 상속",
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
    "answer": "**개념:**\r\n데이터 컬렉션을 선언적으로 처리하는 API (Java 8+)\r\n\r\n**특징:**\r\n- 데이터 소스를 변경하지 않음 (불변)\r\n- 일회용 (한 번 사용 후 재사용 불가)\r\n- 지연 평가 (Lazy Evaluation)\r\n- 내부 반복 (명시적 루프 없음)\r\n\r\n**구조:**\r\n```java\r\nlist.stream()              // 1. 소스\r\n    .filter(x -> x > 10)   // 2. 중간 연산 (Lazy)\r\n    .map(x -> x * 2)       // 2. 중간 연산 (Lazy)\r\n    .collect(toList());    // 3. 최종 연산 (실행)\r\n```\r\n\r\n**중간 연산:**\r\n- filter, map, flatMap, sorted, distinct, limit, skip\r\n- 지연 평가됨 (최종 연산 전까지 실행 안 함)\r\n\r\n**최종 연산:**\r\n- collect, forEach, reduce, count, findFirst, anyMatch\r\n- 실행을 트리거하고 결과 반환\r\n\r\n**장점:**\r\n- 가독성 향상 (선언적)\r\n- 병렬 처리 쉬움 (parallelStream)\r\n- 파이프라인 최적화\r\n\r\n**주의:**\r\n- 부작용(side-effect) 피하기\r\n- 무한 스트림 주의 (limit 필수)",
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
    "answer": "**일반적 성능 비교:**\r\n\r\n| 구분 | for-loop | Stream |\r\n|------|----------|--------|\r\n| 단순 반복 | 빠름 | 약간 느림 |\r\n| 복잡한 파이프라인 | 유사 | 유사 |\r\n| 병렬 처리 | 직접 구현 | parallelStream |\r\n| JIT 최적화 | 최적화됨 | 추가 오버헤드 |\r\n\r\n**Stream 오버헤드 원인:**\r\n- 람다 호출 비용\r\n- 중간 객체 생성 (박싱/언박싱)\r\n- 파이프라인 구축 비용\r\n\r\n**성능 차이 예:**\r\n```java\r\n// for-loop (빠름)\r\nint sum = 0;\r\nfor (int i : array) sum += i;\r\n\r\n// Stream (약간 느림)\r\nint sum = Arrays.stream(array).sum();\r\n```\r\n\r\n**실무 관점:**\r\n- 성능 차이는 대부분 미미 (1.5~2배)\r\n- 가독성과 유지보수성이 더 중요\r\n- 핫 코드에서만 최적화 고려\r\n\r\n**Stream이 유리한 경우:**\r\n- 복잡한 데이터 변환\r\n- 병렬 처리 필요\r\n- 가독성 중시\r\n\r\n**for-loop이 유리한 경우:**\r\n- 단순 반복\r\n- 극한의 성능 필요\r\n- 조기 종료가 복잡할 때\r\n\r\n**결론:** 대부분 Stream 사용, 성능 이슈 시 프로파일링 후 판단",
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
    "answer": "**예, parallelStream으로 병렬 처리 가능합니다.**\r\n\r\n```java\r\n// 병렬 스트림 생성\r\nlist.parallelStream()\r\n    .filter(x -> x > 10)\r\n    .map(this::process)\r\n    .collect(toList());\r\n\r\n// 또는 기존 스트림을 병렬로 변환\r\nlist.stream().parallel()\r\n```\r\n\r\n**동작 원리:**\r\n- ForkJoinPool.commonPool() 사용\r\n- 데이터를 분할(split)하여 병렬 처리\r\n- 결과를 결합(combine)\r\n\r\n**효과적인 경우:**\r\n- 대용량 데이터\r\n- 요소당 처리 비용이 높은 연산\r\n- 독립적인 연산 (상태 없음)\r\n- 분할하기 좋은 소스 (배열, ArrayList)\r\n\r\n**비효율적인 경우:**\r\n- 작은 데이터셋 (오버헤드 > 이득)\r\n- 순서 의존적 연산\r\n- 공유 상태 접근\r\n- LinkedList (분할 비용 높음)\r\n- I/O 작업 (블로킹)\r\n\r\n**주의사항:**\r\n```java\r\n// Bad - 공유 상태 변경\r\nList<Integer> result = new ArrayList<>();\r\nlist.parallelStream().forEach(x -> result.add(x));  // 동기화 문제\r\n\r\n// Good - collect 사용\r\nList<Integer> result = list.parallelStream().collect(toList());\r\n```",
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
    "answer": "**주요 함수형 인터페이스:**\r\n\r\n| 인터페이스 | 메서드 | 용도 | Stream 메서드 |\r\n|-----------|--------|------|--------------|\r\n| Predicate<T> | boolean test(T) | 조건 검사 | filter |\r\n| Function<T,R> | R apply(T) | 변환 | map |\r\n| Consumer<T> | void accept(T) | 소비 | forEach |\r\n| Supplier<T> | T get() | 생성 | generate |\r\n| BiFunction<T,U,R> | R apply(T,U) | 이항 변환 | reduce |\r\n| BinaryOperator<T> | T apply(T,T) | 같은 타입 결합 | reduce |\r\n| UnaryOperator<T> | T apply(T) | 같은 타입 변환 | iterate |\r\n\r\n**사용 예:**\r\n```java\r\n// Predicate - filter\r\nstream.filter(x -> x > 10)\r\n\r\n// Function - map\r\nstream.map(String::toUpperCase)\r\n\r\n// Consumer - forEach\r\nstream.forEach(System.out::println)\r\n\r\n// BinaryOperator - reduce\r\nstream.reduce(0, (a, b) -> a + b)\r\n\r\n// Comparator - sorted\r\nstream.sorted(Comparator.comparing(User::getName))\r\n```\r\n\r\n**기본형 특화 (박싱 회피):**\r\n- IntPredicate, LongFunction, DoubleConsumer\r\n- ToIntFunction, ToDoubleFunction\r\n\r\n```java\r\nIntStream.range(1, 100)\r\n    .filter(n -> n % 2 == 0)  // IntPredicate\r\n    .sum();\r\n```",
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
    "answer": "**이유: Effectively Final 규칙**\r\n\r\n람다나 익명 클래스에서 외부 지역 변수를 캡처할 때, 해당 변수는 **final이거나 effectively final**이어야 합니다.\r\n\r\n**effectively final:**\r\n- final 키워드는 없지만 값이 변경되지 않는 변수\r\n- Java 8부터 명시적 final 불필요\r\n\r\n```java\r\nint count = 10;  // effectively final (수정 안 함)\r\nlist.forEach(x -> System.out.println(x + count));  // OK\r\n\r\nint count = 10;\r\ncount = 20;  // 수정됨 - 더 이상 effectively final 아님\r\nlist.forEach(x -> System.out.println(x + count));  // 컴파일 에러!\r\n```\r\n\r\n**왜 이런 제약이 있을까?**\r\n1. **값 캡처**: 람다는 변수의 복사본을 캡처\r\n2. **동시성 안전**: 람다가 다른 스레드에서 실행될 수 있음\r\n3. **혼란 방지**: 외부 변수 변경 시 어느 값이 캡처되었는지 불명확\r\n\r\n**우회 방법:**\r\n```java\r\n// AtomicInteger 사용\r\nAtomicInteger count = new AtomicInteger(0);\r\nlist.forEach(x -> count.incrementAndGet());\r\n\r\n// 배열 사용 (권장하지 않음)\r\nint[] count = {0};\r\nlist.forEach(x -> count[0]++);\r\n```\r\n\r\n**결론:**\r\n- 명시적 final은 선택 (가독성 위해 권장)\r\n- 변수 값을 변경하면 컴파일 에러",
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
    "answer": "**개념:**\r\nGarbage Collection - 사용하지 않는 객체의 메모리를 자동으로 해제하는 JVM 기능\r\n\r\n**동작 원리 (Mark & Sweep):**\r\n1. **Mark**: GC Root에서 참조 가능한 객체를 마킹\r\n2. **Sweep**: 마킹되지 않은 객체를 제거\r\n3. **Compact**: 메모리 단편화 방지를 위해 압축 (선택적)\r\n\r\n**GC Root:**\r\n- Stack의 지역 변수\r\n- Static 변수\r\n- JNI 참조\r\n- 실행 중인 스레드\r\n\r\n**세대별 GC (Generational GC):**\r\n- **Young Generation**: 새 객체, Minor GC (빈번, 빠름)\r\n  - Eden: 객체 최초 생성\r\n  - Survivor (S0, S1): Eden에서 살아남은 객체\r\n- **Old Generation**: 오래 살아남은 객체, Major GC (드묾, 느림)\r\n\r\n**GC 종류:**\r\n| GC | 특징 |\r\n|----|------|\r\n| Serial | 단일 스레드, 소규모 |\r\n| Parallel | 멀티 스레드, 처리량 최적화 |\r\n| G1 | Region 기반, Java 9+ 기본 |\r\n| ZGC | 초저지연 (< 10ms) |",
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
    "answer": "**finalize()란:**\r\n- Object 클래스의 메서드\r\n- GC가 객체 수거 전 호출 (Java 9부터 deprecated)\r\n\r\n**문제점:**\r\n\r\n**1. 실행 보장 없음**\r\n- GC가 언제 실행될지 모름\r\n- finalize()가 호출 안 될 수도 있음\r\n\r\n**2. 성능 저하**\r\n- finalize()가 있는 객체는 별도 큐에서 관리\r\n- 최소 2번의 GC 사이클 필요\r\n- 객체 수명 연장\r\n\r\n**3. 예외 무시**\r\n- finalize()에서 발생한 예외는 무시됨\r\n- 디버깅 어려움\r\n\r\n**4. 부활 가능 (Resurrection)**\r\n```java\r\nprotected void finalize() {\r\n    staticRef = this;  // 객체가 다시 참조됨\r\n}\r\n```\r\n\r\n**5. 순서 보장 없음**\r\n- 어떤 순서로 호출될지 불명확\r\n\r\n**6. 스레드 안전성 문제**\r\n- Finalizer 스레드에서 실행\r\n\r\n**대안:**\r\n```java\r\n// try-with-resources (권장)\r\ntry (Resource r = new Resource()) { }\r\n\r\n// Cleaner API (Java 9+)\r\nCleaner cleaner = Cleaner.create();\r\ncleaner.register(object, cleanAction);\r\n```",
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
    "answer": "**가능성은 있지만, 보장되지 않습니다.**\r\n\r\n**GC 대상이 되려면:**\r\n객체가 어떤 GC Root에서도 도달 불가능(unreachable)해야 함\r\n\r\n**null 할당만으로는 불충분한 경우:**\r\n\r\n**1. 다른 참조가 존재**\r\n```java\r\nObject obj = new Object();\r\nObject other = obj;  // 다른 참조\r\nobj = null;          // obj만 null\r\n// other가 여전히 참조 → GC 대상 아님\r\n```\r\n\r\n**2. 컬렉션에 포함**\r\n```java\r\nList<Object> list = new ArrayList<>();\r\nlist.add(obj);\r\nobj = null;\r\n// list가 여전히 참조 → GC 대상 아님\r\n```\r\n\r\n**3. 클로저에 캡처**\r\n```java\r\nObject obj = new Object();\r\nRunnable r = () -> System.out.println(obj);\r\nobj = null;\r\n// 람다가 obj 캡처 → GC 대상 아님\r\n```\r\n\r\n**GC 대상이 되는 경우:**\r\n```java\r\nObject obj = new Object();\r\nobj = null;  // 유일한 참조\r\n// 다음 GC 사이클에서 수거 가능 (보장은 아님)\r\n```\r\n\r\n**주의:**\r\n- GC 시점은 JVM이 결정\r\n- `System.gc()`는 힌트일 뿐, 강제 아님\r\n- null 할당보다 스코프를 좁히는 것이 좋은 습관",
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
    "answer": "**equals():**\r\n두 객체의 **논리적 동등성**을 비교\r\n\r\n```java\r\n@Override\r\npublic boolean equals(Object o) {\r\n    if (this == o) return true;\r\n    if (!(o instanceof User)) return false;\r\n    User user = (User) o;\r\n    return Objects.equals(id, user.id);\r\n}\r\n```\r\n\r\n**hashCode():**\r\n객체를 해시 기반 컬렉션에서 사용하기 위한 **정수값 반환**\r\n\r\n```java\r\n@Override\r\npublic int hashCode() {\r\n    return Objects.hash(id);\r\n}\r\n```\r\n\r\n**계약 (Contract):**\r\n1. equals()가 true면 hashCode()도 같아야 함 (필수!)\r\n2. hashCode()가 같아도 equals()는 다를 수 있음\r\n3. equals()가 false여도 hashCode()는 같을 수 있음 (충돌)\r\n\r\n**위반 시 문제:**\r\n```java\r\n// hashCode() 미구현 시\r\nSet<User> set = new HashSet<>();\r\nset.add(new User(\"id1\"));\r\nset.contains(new User(\"id1\"));  // false! (해시값 다름)\r\n```\r\n\r\n**해시 기반 컬렉션 동작:**\r\n1. hashCode()로 버킷 찾기\r\n2. 버킷 내에서 equals()로 비교",
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
    "answer": "**구현 원칙:**\r\n\r\n**1. equals()와 일관성**\r\n- equals()에 사용된 필드만 hashCode()에 사용\r\n- equals()가 true면 hashCode()도 같아야 함\r\n\r\n**2. 좋은 분산**\r\n- 해시 충돌 최소화\r\n- 다른 객체는 다른 해시값을 가지도록\r\n\r\n**3. 불변 필드 사용**\r\n- 가변 필드 사용 시 컬렉션에서 문제\r\n\r\n**구현 방법:**\r\n\r\n**권장: Objects.hash() 사용**\r\n```java\r\n@Override\r\npublic int hashCode() {\r\n    return Objects.hash(name, age, email);\r\n}\r\n```\r\n\r\n**수동 구현 (성능 중시):**\r\n```java\r\n@Override\r\npublic int hashCode() {\r\n    int result = 17;  // 초기값 (소수)\r\n    result = 31 * result + (name != null ? name.hashCode() : 0);\r\n    result = 31 * result + age;\r\n    result = 31 * result + (email != null ? email.hashCode() : 0);\r\n    return result;\r\n}\r\n```\r\n\r\n**왜 31인가?**\r\n- 소수: 분산 좋음\r\n- `31 * i == (i << 5) - i`: JVM 최적화\r\n\r\n**주의:**\r\n- null 필드 처리 (0 또는 무시)\r\n- 배열: Arrays.hashCode() 사용\r\n- 캐싱 고려 (불변 객체에서)",
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
    "answer": "**equals() 규약 (5가지):**\r\n\r\n**1. 반사성 (Reflexive)**\r\n```java\r\nx.equals(x) == true\r\n```\r\n\r\n**2. 대칭성 (Symmetric)**\r\n```java\r\nx.equals(y) == y.equals(x)\r\n```\r\n\r\n**3. 추이성 (Transitive)**\r\n```java\r\nx.equals(y) && y.equals(z) → x.equals(z)\r\n```\r\n\r\n**4. 일관성 (Consistent)**\r\n- 객체 변경 없으면 항상 같은 결과\r\n\r\n**5. null 비교**\r\n```java\r\nx.equals(null) == false\r\n```\r\n\r\n**구현 패턴:**\r\n```java\r\n@Override\r\npublic boolean equals(Object o) {\r\n    // 1. 동일 객체 체크\r\n    if (this == o) return true;\r\n\r\n    // 2. 타입 체크 (null 체크 포함)\r\n    if (!(o instanceof User)) return false;\r\n\r\n    // 3. 캐스팅\r\n    User user = (User) o;\r\n\r\n    // 4. 핵심 필드 비교\r\n    return Objects.equals(id, user.id) &&\r\n           Objects.equals(name, user.name);\r\n}\r\n```\r\n\r\n**주의사항:**\r\n- getClass() vs instanceof: 상속 시 행동 다름\r\n- 부동소수점: Float.compare(), Double.compare() 사용\r\n- hashCode()도 함께 재정의\r\n- 상속 시 대칭성 주의\r\n\r\n**Lombok/IDE 활용:**\r\n```java\r\n@EqualsAndHashCode  // Lombok\r\n```",
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
    "answer": "**원시 타입 (Primitive, 7가지):**\r\n\r\n| 타입 | 설명 | 예시 |\r\n|------|------|------|\r\n| number | 정수/실수 (64비트 부동소수점) | 42, 3.14, NaN, Infinity |\r\n| string | 문자열 | 'hello', \"world\", \\`template\\` |\r\n| boolean | 논리값 | true, false |\r\n| null | 의도적 빈 값 | null |\r\n| undefined | 미정의 값 | undefined |\r\n| symbol | 고유 식별자 (ES6) | Symbol('id') |\r\n| bigint | 큰 정수 (ES2020) | 9007199254740991n |\r\n\r\n**참조 타입 (Reference):**\r\n- Object, Array, Function, Date, RegExp, Map, Set 등\r\n\r\n**타입 확인:**\r\n```javascript\r\ntypeof 42          // \"number\"\r\ntypeof \"hello\"     // \"string\"\r\ntypeof null        // \"object\" (역사적 이유로 유지, null 체크는 === null 사용)\r\ntypeof undefined   // \"undefined\"\r\ntypeof Symbol()    // \"symbol\"\r\nArray.isArray([])  // true\r\n```\r\n\r\n**원시 vs 참조:**\r\n- 원시: 값 복사, 불변\r\n- 참조: 주소 복사, 가변\r\n\r\n**특수 값 주의:**\r\n```javascript\r\nNaN === NaN      // false (유일하게 자기 자신과 같지 않은 값)\r\nNumber.isNaN(NaN) // true (NaN 체크는 isNaN() 사용)\r\n0 === -0         // true\r\nObject.is(0, -0) // false (엄격 비교)\r\n```",
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
    "answer": "| 구분 | var | let | const |\r\n|------|-----|-----|-------|\r\n| 스코프 | 함수 스코프 | 블록 스코프 | 블록 스코프 |\r\n| 재선언 | 가능 | 불가 | 불가 |\r\n| 재할당 | 가능 | 가능 | 불가 |\r\n| 호이스팅 | O (undefined) | O (TDZ) | O (TDZ) |\r\n\r\n**호이스팅 (Hoisting):**\r\n선언이 스코프 최상단으로 끌어올려지는 것처럼 동작\r\n\r\n```javascript\r\n// var - 선언 호이스팅, undefined로 초기화\r\nconsole.log(x);  // undefined\r\nvar x = 5;\r\n\r\n// let/const - 선언 호이스팅, 초기화 안 됨 (TDZ)\r\nconsole.log(y);  // ReferenceError\r\nlet y = 5;\r\n```\r\n\r\n**TDZ (Temporal Dead Zone):**\r\n- 스코프 시작 ~ 변수 선언까지의 구간\r\n- 이 구간에서 접근 시 ReferenceError\r\n\r\n**권장사항:**\r\n- `const` 기본 사용\r\n- 재할당 필요시 `let`\r\n- `var` 사용 지양\r\n\r\n```javascript\r\nconst obj = { a: 1 };\r\nobj.a = 2;       // OK (내부 값 변경)\r\nobj = { b: 2 };  // Error (참조 재할당)\r\n```",
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
    "answer": "**실행 컨텍스트 (Execution Context):**\r\n코드 실행에 필요한 환경 정보를 담은 객체\r\n\r\n**구성 요소:**\r\n- **Variable Environment**: 변수/함수 선언, 호이스팅\r\n- **Lexical Environment**: 현재 환경 + 외부 환경 참조\r\n- **This Binding**: this 값\r\n\r\n**종류:**\r\n1. Global Execution Context (전역)\r\n2. Function Execution Context (함수 호출마다)\r\n3. Eval Execution Context\r\n\r\n**콜 스택:**\r\n```javascript\r\nfunction a() { b(); }\r\nfunction b() { console.log('b'); }\r\na();\r\n// 스택: Global → a() → b()\r\n```\r\n\r\n---\r\n\r\n**스코프 체인 (Scope Chain):**\r\n변수를 찾기 위해 현재 스코프 → 상위 스코프 → 전역까지 탐색\r\n\r\n```javascript\r\nconst global = 'global';\r\nfunction outer() {\r\n    const outerVar = 'outer';\r\n    function inner() {\r\n        const innerVar = 'inner';\r\n        console.log(innerVar);  // inner (현재)\r\n        console.log(outerVar);  // outer (상위)\r\n        console.log(global);    // global (전역)\r\n    }\r\n    inner();\r\n}\r\n```\r\n\r\n**렉시컬 스코프:**\r\n- 함수 정의 시점의 스코프가 기준\r\n- 호출 위치가 아닌 선언 위치 기준",
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
    "answer": "**클로저:**\r\n함수가 자신이 선언된 렉시컬 환경을 기억하여, 외부 함수 실행이 끝나도 외부 변수에 접근 가능한 것\r\n\r\n```javascript\r\nfunction createCounter() {\r\n    let count = 0;  // 외부 변수\r\n    return function() {\r\n        return ++count;  // 외부 변수 접근\r\n    };\r\n}\r\nconst counter = createCounter();\r\ncounter();  // 1\r\ncounter();  // 2 (count가 유지됨)\r\n```\r\n\r\n**활용 사례:**\r\n\r\n**1. 데이터 은닉 (캡슐화)**\r\n```javascript\r\nfunction createPerson(name) {\r\n    let _age = 0;  // private\r\n    return {\r\n        getName: () => name,\r\n        getAge: () => _age,\r\n        setAge: (age) => { _age = age; }\r\n    };\r\n}\r\n```\r\n\r\n**2. 함수 팩토리**\r\n```javascript\r\nfunction multiply(x) {\r\n    return (y) => x * y;\r\n}\r\nconst double = multiply(2);\r\ndouble(5);  // 10\r\n```\r\n\r\n**3. 이벤트 핸들러**\r\n```javascript\r\nfunction setupButton(id) {\r\n    document.getElementById(id).onclick = () => {\r\n        console.log(`Button ${id} clicked`);\r\n    };\r\n}\r\n```\r\n\r\n**4. 커링**\r\n```javascript\r\nconst add = (a) => (b) => a + b;\r\nadd(1)(2);  // 3\r\n```\r\n\r\n**주의:**\r\n- 메모리 누수 가능 (불필요한 참조 유지)\r\n- 루프에서 var 사용 시 클로저 문제:\r\n```javascript\r\n// 문제: 모든 함수가 i=3 참조\r\nfor (var i = 0; i < 3; i++) {\r\n    setTimeout(() => console.log(i), 100);  // 3, 3, 3\r\n}\r\n// 해결: let 사용 (블록 스코프)\r\nfor (let i = 0; i < 3; i++) {\r\n    setTimeout(() => console.log(i), 100);  // 0, 1, 2\r\n}\r\n```",
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
    "answer": "**this는 함수 호출 방식에 따라 결정됩니다.**\r\n\r\n**1. 기본 바인딩 (단독 호출)**\r\n```javascript\r\nfunction fn() { console.log(this); }\r\nfn();  // window (strict mode: undefined)\r\n```\r\n\r\n**2. 암시적 바인딩 (메서드 호출)**\r\n```javascript\r\nconst obj = {\r\n    name: 'obj',\r\n    fn() { console.log(this.name); }\r\n};\r\nobj.fn();  // 'obj' (호출 객체)\r\n```\r\n\r\n**3. 명시적 바인딩 (call, apply, bind)**\r\n```javascript\r\nfunction fn() { console.log(this.name); }\r\nconst obj = { name: 'obj' };\r\n\r\nfn.call(obj);     // 'obj' (즉시 호출)\r\nfn.apply(obj);    // 'obj' (즉시 호출)\r\nfn.bind(obj)();   // 'obj' (바인딩된 함수 반환)\r\n```\r\n\r\n**4. new 바인딩**\r\n```javascript\r\nfunction Person(name) {\r\n    this.name = name;\r\n}\r\nconst p = new Person('John');  // this = 새 객체\r\n```\r\n\r\n**5. 화살표 함수 (렉시컬 this)**\r\n```javascript\r\nconst obj = {\r\n    fn: function() {\r\n        const arrow = () => console.log(this);\r\n        arrow();  // obj (상위 스코프의 this)\r\n    }\r\n};\r\n```\r\n\r\n**우선순위:**\r\nnew > 명시적(bind) > 암시적 > 기본\r\n\r\n**주의: this 소실**\r\n```javascript\r\nconst obj = { fn() { console.log(this); } };\r\nconst fn = obj.fn;\r\nfn();  // window (암시적 바인딩 소실)\r\n```",
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
    "answer": "| 구분 | 일반 함수 | 화살표 함수 |\r\n|------|----------|-------------|\r\n| this | 호출 방식에 따라 결정 | 렉시컬 (선언 시점) |\r\n| arguments | 있음 | 없음 |\r\n| new 가능 | 가능 | 불가 |\r\n| prototype | 있음 | 없음 |\r\n| 생성자 | 가능 | 불가 |\r\n\r\n**this 차이:**\r\n```javascript\r\nconst obj = {\r\n    name: 'obj',\r\n    regular() {\r\n        console.log(this.name);  // 'obj'\r\n    },\r\n    arrow: () => {\r\n        console.log(this.name);  // undefined (외부 this)\r\n    }\r\n};\r\n```\r\n\r\n**arguments 없음:**\r\n```javascript\r\nconst arrow = () => {\r\n    console.log(arguments);  // ReferenceError\r\n};\r\n// 대신 rest 파라미터 사용\r\nconst arrow = (...args) => console.log(args);\r\n```\r\n\r\n**생성자 불가:**\r\n```javascript\r\nconst Arrow = () => {};\r\nnew Arrow();  // TypeError: not a constructor\r\n```\r\n\r\n**화살표 함수 적합한 경우:**\r\n- 콜백 함수 (map, filter 등)\r\n- this를 바인딩하지 않아야 할 때\r\n\r\n**일반 함수 적합한 경우:**\r\n- 메서드 정의\r\n- 생성자 함수\r\n- arguments 필요 시",
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
    "answer": "**프로토타입:**\r\n모든 객체는 [[Prototype]] 내부 슬롯을 가지며, 다른 객체를 참조\r\n\r\n**프로토타입 체인:**\r\n객체의 프로퍼티 접근 시 해당 객체 → [[Prototype]] → ... → null 까지 탐색\r\n\r\n```javascript\r\nfunction Animal(name) {\r\n    this.name = name;\r\n}\r\nAnimal.prototype.speak = function() {\r\n    console.log(this.name + ' speaks');\r\n};\r\n\r\nconst dog = new Animal('Dog');\r\ndog.speak();  // 'Dog speaks'\r\n\r\n// 체인: dog → Animal.prototype → Object.prototype → null\r\n```\r\n\r\n**프로토타입 접근:**\r\n```javascript\r\ndog.__proto__          // Animal.prototype (비표준)\r\nObject.getPrototypeOf(dog)  // Animal.prototype (표준)\r\nAnimal.prototype       // 생성자의 prototype\r\n```\r\n\r\n**프로토타입 상속:**\r\n```javascript\r\nfunction Dog(name) {\r\n    Animal.call(this, name);  // 생성자 호출\r\n}\r\nDog.prototype = Object.create(Animal.prototype);  // 프로토타입 연결\r\nDog.prototype.constructor = Dog;\r\n\r\nDog.prototype.bark = function() {\r\n    console.log('Woof!');\r\n};\r\n```\r\n\r\n**ES6 Class로 동일 구현:**\r\n```javascript\r\nclass Animal {\r\n    constructor(name) { this.name = name; }\r\n    speak() { console.log(this.name); }\r\n}\r\nclass Dog extends Animal {\r\n    bark() { console.log('Woof!'); }\r\n}\r\n```",
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
    "answer": "**핵심:** Class는 프로토타입의 **문법적 설탕(Syntactic Sugar)**\r\n\r\n**내부적으로 동일:**\r\n```javascript\r\n// ES6 Class\r\nclass Person {\r\n    constructor(name) { this.name = name; }\r\n    greet() { console.log('Hi'); }\r\n}\r\n\r\n// 프로토타입 (동일)\r\nfunction Person(name) { this.name = name; }\r\nPerson.prototype.greet = function() { console.log('Hi'); };\r\n```\r\n\r\n**차이점:**\r\n\r\n| 구분 | 프로토타입 | Class |\r\n|------|-----------|-------|\r\n| 호이스팅 | 함수 호이스팅 | TDZ 존재 |\r\n| new 없이 호출 | 가능 (this = window) | TypeError |\r\n| strict mode | 선택 | 항상 적용 |\r\n| 메서드 열거 | enumerable: true | enumerable: false |\r\n| 상속 문법 | 복잡 | extends 간단 |\r\n\r\n**Class 추가 기능:**\r\n```javascript\r\nclass Person {\r\n    // 정적 메서드\r\n    static create(name) { return new Person(name); }\r\n\r\n    // private 필드 (ES2022)\r\n    #privateField = 'secret';\r\n\r\n    // getter/setter\r\n    get fullName() { return this.#privateField; }\r\n}\r\n```\r\n\r\n**상속 비교:**\r\n```javascript\r\n// 프로토타입\r\nChild.prototype = Object.create(Parent.prototype);\r\nChild.prototype.constructor = Child;\r\n\r\n// Class\r\nclass Child extends Parent {\r\n    constructor() { super(); }\r\n}\r\n```",
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
    "answer": "**Promise:**\r\n비동기 작업의 완료/실패를 나타내는 객체\r\n\r\n**3가지 상태:**\r\n- **Pending**: 초기 상태, 대기 중\r\n- **Fulfilled**: 성공 완료\r\n- **Rejected**: 실패\r\n\r\n```\r\nPending → Fulfilled (resolve 호출)\r\nPending → Rejected (reject 호출)\r\n```\r\n한 번 결정되면 변경 불가 (settled)\r\n\r\n**생성과 사용:**\r\n```javascript\r\nconst promise = new Promise((resolve, reject) => {\r\n    setTimeout(() => {\r\n        if (success) resolve('data');\r\n        else reject(new Error('failed'));\r\n    }, 1000);\r\n});\r\n\r\npromise\r\n    .then(data => console.log(data))    // 성공\r\n    .catch(err => console.error(err))   // 실패\r\n    .finally(() => console.log('done')); // 항상\r\n```\r\n\r\n**체이닝:**\r\n```javascript\r\nfetch('/api')\r\n    .then(res => res.json())  // Promise 반환\r\n    .then(data => process(data))\r\n    .catch(handleError);\r\n```\r\n\r\n**정적 메서드:**\r\n```javascript\r\nPromise.all([p1, p2])     // 모두 성공 시 완료\r\nPromise.race([p1, p2])    // 가장 빠른 것\r\nPromise.allSettled([p1, p2])  // 모두 완료 (성공/실패 무관)\r\nPromise.any([p1, p2])     // 하나라도 성공\r\n```",
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
    "answer": "**async/await:**\r\nPromise를 더 직관적으로 사용하기 위한 문법 (ES2017)\r\n\r\n**비교:**\r\n```javascript\r\n// Promise\r\nfunction fetchData() {\r\n    return fetch('/api')\r\n        .then(res => res.json())\r\n        .then(data => process(data))\r\n        .catch(err => handleError(err));\r\n}\r\n\r\n// async/await\r\nasync function fetchData() {\r\n    try {\r\n        const res = await fetch('/api');\r\n        const data = await res.json();\r\n        return process(data);\r\n    } catch (err) {\r\n        handleError(err);\r\n    }\r\n}\r\n```\r\n\r\n**차이점:**\r\n\r\n| 구분 | Promise | async/await |\r\n|------|---------|-------------|\r\n| 문법 | 체이닝 (.then) | 동기식 스타일 |\r\n| 에러 처리 | .catch() | try/catch |\r\n| 디버깅 | 스택 추적 어려움 | 명확한 스택 |\r\n| 조건부 로직 | 복잡 | 직관적 |\r\n\r\n**async 함수 특징:**\r\n- 항상 Promise 반환\r\n- await는 async 함수 내에서만 사용 (Top-level await 제외)\r\n\r\n**병렬 실행:**\r\n```javascript\r\n// 순차 (느림)\r\nconst a = await fetchA();\r\nconst b = await fetchB();\r\n\r\n// 병렬 (빠름)\r\nconst [a, b] = await Promise.all([fetchA(), fetchB()]);\r\n```\r\n\r\n**주의:**\r\n- forEach에서 await 사용 시 의도대로 동작 안 함\r\n- for...of 또는 map + Promise.all 사용",
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
    "answer": "**이벤트 루프:**\r\nJavaScript의 단일 스레드에서 비동기 처리를 가능하게 하는 메커니즘\r\n\r\n**구성 요소:**\r\n```\r\n┌─────────────────────────┐\r\n│       Call Stack        │ ← 실행 중인 함수\r\n└─────────────────────────┘\r\n             ↓\r\n┌─────────────────────────┐\r\n│       Event Loop        │ ← 스택 비면 큐 확인\r\n└─────────────────────────┘\r\n             ↓\r\n┌─────────────────────────┐\r\n│   Microtask Queue       │ ← Promise, queueMicrotask\r\n│   (Macrotask Queue)     │ ← setTimeout, I/O, UI\r\n└─────────────────────────┘\r\n```\r\n\r\n**동작 순서:**\r\n1. Call Stack의 모든 동기 코드 실행\r\n2. Stack이 비면 Microtask Queue 전부 처리\r\n3. Macrotask Queue에서 하나 실행\r\n4. 다시 Microtask Queue 확인\r\n5. 반복\r\n\r\n**예시:**\r\n```javascript\r\nconsole.log('1');                    // 동기\r\n\r\nsetTimeout(() => console.log('2'), 0); // Macro\r\n\r\nPromise.resolve().then(() => console.log('3')); // Micro\r\n\r\nconsole.log('4');                    // 동기\r\n\r\n// 출력: 1 → 4 → 3 → 2\r\n```\r\n\r\n**Microtask가 우선:**\r\n- Promise.then/catch/finally\r\n- queueMicrotask()\r\n- MutationObserver\r\n\r\n**Macrotask:**\r\n- setTimeout, setInterval\r\n- I/O, UI 렌더링",
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
    "answer": "| 구분 | Microtask | Macrotask |\r\n|------|-----------|-----------|\r\n| 우선순위 | 높음 | 낮음 |\r\n| 실행 시점 | Stack 비우고 즉시 | Microtask 후 |\r\n| 처리 방식 | 큐 전체 비움 | 하나씩 |\r\n\r\n**Microtask 예:**\r\n- Promise.then/catch/finally\r\n- queueMicrotask()\r\n- MutationObserver\r\n- process.nextTick() (Node.js)\r\n\r\n**Macrotask (Task) 예:**\r\n- setTimeout / setInterval\r\n- setImmediate (Node.js)\r\n- I/O 작업\r\n- UI 렌더링\r\n- requestAnimationFrame\r\n\r\n**실행 순서:**\r\n```javascript\r\nconsole.log('1');  // 동기\r\n\r\nsetTimeout(() => console.log('timeout'), 0);  // Macro\r\n\r\nPromise.resolve()\r\n    .then(() => console.log('promise1'))      // Micro\r\n    .then(() => console.log('promise2'));     // Micro\r\n\r\nqueueMicrotask(() => console.log('micro'));   // Micro\r\n\r\nconsole.log('2');  // 동기\r\n\r\n// 출력: 1 → 2 → promise1 → micro → promise2 → timeout\r\n```\r\n\r\n**핵심 차이:**\r\n- Microtask: 현재 작업 직후, 모든 Microtask 처리\r\n- Macrotask: Microtask 전부 처리 후 하나씩\r\n\r\n**주의:**\r\n- Microtask 무한 루프 시 UI 블로킹\r\n- 무거운 작업은 Macrotask로 분할",
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
    "answer": "**디바운싱 (Debouncing):**\r\n연속된 이벤트 중 마지막 이벤트만 처리 (일정 시간 후)\r\n\r\n```javascript\r\nfunction debounce(fn, delay) {\r\n    let timer;\r\n    return function(...args) {\r\n        clearTimeout(timer);\r\n        timer = setTimeout(() => fn.apply(this, args), delay);\r\n    };\r\n}\r\n\r\n// 사용: 검색 입력\r\ninput.addEventListener('input', debounce(search, 300));\r\n```\r\n\r\n**스로틀링 (Throttling):**\r\n일정 시간 간격으로 최대 한 번만 실행\r\n\r\n```javascript\r\nfunction throttle(fn, limit) {\r\n    let inThrottle;\r\n    return function(...args) {\r\n        if (!inThrottle) {\r\n            fn.apply(this, args);\r\n            inThrottle = true;\r\n            setTimeout(() => inThrottle = false, limit);\r\n        }\r\n    };\r\n}\r\n\r\n// 사용: 스크롤 이벤트\r\nwindow.addEventListener('scroll', throttle(handleScroll, 100));\r\n```\r\n\r\n**비교:**\r\n| 구분 | Debounce | Throttle |\r\n|------|----------|----------|\r\n| 실행 시점 | 마지막 이벤트 후 | 일정 간격마다 |\r\n| 사용 예 | 검색 자동완성, resize 후 | 스크롤, 마우스 이동 |\r\n| 특징 | 지연 실행 | 주기적 실행 |\r\n\r\n**사용 시나리오:**\r\n- **Debounce**: 입력 완료 후 처리 (검색, 폼 검증)\r\n- **Throttle**: 지속적 이벤트 제한 (스크롤, 드래그)",
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
    "answer": "**얕은 복사 (Shallow Copy):**\r\n1단계 프로퍼티만 복사, 중첩 객체는 참조 공유\r\n\r\n```javascript\r\nconst obj = { a: 1, nested: { b: 2 } };\r\n\r\n// 방법들\r\nconst copy1 = { ...obj };\r\nconst copy2 = Object.assign({}, obj);\r\n\r\ncopy1.a = 100;           // 독립\r\ncopy1.nested.b = 200;    // 원본도 변경됨!\r\n```\r\n\r\n**깊은 복사 (Deep Copy):**\r\n모든 레벨의 프로퍼티를 재귀적으로 복사\r\n\r\n```javascript\r\n// 1. JSON (한계 있음)\r\nconst deepCopy1 = JSON.parse(JSON.stringify(obj));\r\n// 함수, undefined, Symbol, 순환 참조 불가\r\n\r\n// 2. structuredClone (권장, ES2022)\r\nconst deepCopy2 = structuredClone(obj);\r\n\r\n// 3. 재귀 구현\r\nfunction deepClone(obj) {\r\n    if (obj === null || typeof obj !== 'object') return obj;\r\n    if (Array.isArray(obj)) return obj.map(deepClone);\r\n    return Object.fromEntries(\r\n        Object.entries(obj).map(([k, v]) => [k, deepClone(v)])\r\n    );\r\n}\r\n\r\n// 4. lodash\r\nconst deepCopy3 = _.cloneDeep(obj);\r\n```\r\n\r\n**비교:**\r\n| 구분 | 얕은 복사 | 깊은 복사 |\r\n|------|----------|----------|\r\n| 중첩 객체 | 참조 공유 | 새로 생성 |\r\n| 성능 | 빠름 | 느림 |\r\n| 사용 | 단순 객체 | 복잡한 객체 |",
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
    "answer": "**구조 분해 할당:**\r\n배열이나 객체의 값을 개별 변수로 추출\r\n\r\n**객체 구조 분해:**\r\n```javascript\r\nconst user = { name: 'John', age: 30, city: 'NYC' };\r\n\r\n// 기본\r\nconst { name, age } = user;\r\n\r\n// 다른 이름으로\r\nconst { name: userName } = user;\r\n\r\n// 기본값\r\nconst { country = 'USA' } = user;\r\n\r\n// 중첩\r\nconst { address: { street } } = { address: { street: 'Main' } };\r\n```\r\n\r\n**배열 구조 분해:**\r\n```javascript\r\nconst arr = [1, 2, 3, 4, 5];\r\n\r\n// 기본\r\nconst [first, second] = arr;\r\n\r\n// 건너뛰기\r\nconst [, , third] = arr;  // 3\r\n\r\n// 나머지\r\nconst [head, ...tail] = arr;  // head=1, tail=[2,3,4,5]\r\n\r\n// 기본값\r\nconst [a, b, c = 10] = [1, 2];  // c=10\r\n\r\n// 변수 교환\r\nlet x = 1, y = 2;\r\n[x, y] = [y, x];\r\n```\r\n\r\n**함수 파라미터:**\r\n```javascript\r\nfunction greet({ name, age = 0 }) {\r\n    console.log(`${name}, ${age}`);\r\n}\r\n\r\nfunction sum([a, b]) {\r\n    return a + b;\r\n}\r\n```\r\n\r\n**활용:**\r\n- API 응답 처리\r\n- 설정 객체 추출\r\n- 다중 반환값 처리",
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
    "answer": "둘 다 `...` 문법을 사용하지만 **반대 방향**으로 동작합니다.\r\n\r\n**스프레드 (Spread): 펼치기**\r\n```javascript\r\n// 배열 펼치기\r\nconst arr = [1, 2, 3];\r\nconsole.log(...arr);  // 1 2 3\r\nconst newArr = [...arr, 4, 5];  // [1,2,3,4,5]\r\n\r\n// 객체 펼치기\r\nconst obj = { a: 1, b: 2 };\r\nconst newObj = { ...obj, c: 3 };  // {a:1, b:2, c:3}\r\n\r\n// 함수 호출\r\nMath.max(...arr);  // 3\r\n```\r\n\r\n**레스트 (Rest): 모으기**\r\n```javascript\r\n// 함수 파라미터\r\nfunction sum(...numbers) {\r\n    return numbers.reduce((a, b) => a + b, 0);\r\n}\r\nsum(1, 2, 3);  // 6\r\n\r\n// 구조 분해\r\nconst [first, ...rest] = [1, 2, 3, 4];\r\n// first=1, rest=[2,3,4]\r\n\r\nconst { a, ...others } = { a: 1, b: 2, c: 3 };\r\n// a=1, others={b:2, c:3}\r\n```\r\n\r\n**비교:**\r\n| 구분 | Spread | Rest |\r\n|------|--------|------|\r\n| 방향 | 펼침 (확장) | 모음 (수집) |\r\n| 위치 | 배열/객체/호출 시 | 함수 선언/구조분해 시 |\r\n| 용도 | 복사, 병합, 전달 | 가변 인자 수집 |\r\n\r\n**주의:**\r\n- Rest는 항상 마지막에 위치해야 함\r\n- `function fn(...a, b) {}` // SyntaxError",
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
    "answer": "| 구분 | Object | Map |\r\n|------|--------|-----|\r\n| 키 타입 | 문자열/Symbol만 | 모든 타입 |\r\n| 순서 보장 | ES2015부터 부분적 | 삽입 순서 보장 |\r\n| 크기 확인 | Object.keys().length | map.size |\r\n| 반복 | for...in, Object.keys | for...of, forEach |\r\n| 성능 | 삽입/삭제 느림 | 빈번한 추가/삭제에 최적화 |\r\n| 프로토타입 | 있음 (주의 필요) | 없음 |\r\n\r\n**Map 사용:**\r\n```javascript\r\nconst map = new Map();\r\nmap.set('key', 'value');\r\nmap.set(1, 'number key');\r\nmap.set({}, 'object key');\r\n\r\nmap.get('key');    // 'value'\r\nmap.has('key');    // true\r\nmap.delete('key');\r\nmap.size;          // 2\r\n\r\n// 반복\r\nfor (const [key, value] of map) { }\r\nmap.forEach((value, key) => { });\r\n```\r\n\r\n**Object vs Map 선택:**\r\n\r\n**Object 권장:**\r\n- JSON 직렬화 필요\r\n- 메서드/로직 포함\r\n- 간단한 레코드 구조\r\n\r\n**Map 권장:**\r\n- 키가 문자열이 아닌 경우\r\n- 빈번한 추가/삭제\r\n- 키-값 쌍 순회 필요\r\n- 크기를 자주 확인\r\n\r\n```javascript\r\n// Object 주의점\r\nconst obj = {};\r\nobj['__proto__'] = 'danger';  // 프로토타입 오염\r\n\r\nconst map = new Map();\r\nmap.set('__proto__', 'safe');  // 안전\r\n```",
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
    "answer": "**Weak- 버전의 핵심: 약한 참조 (Weak Reference)**\r\n- GC가 다른 참조 없으면 수거 가능\r\n- 메모리 누수 방지\r\n\r\n| 구분 | Set/Map | WeakSet/WeakMap |\r\n|------|---------|-----------------|\r\n| 키/값 타입 | 모든 타입 | 객체만 |\r\n| 참조 | 강한 참조 | 약한 참조 |\r\n| 반복 | 가능 | 불가 (iterable X) |\r\n| size | 있음 | 없음 |\r\n| GC | 참조 유지 | 자동 제거 가능 |\r\n\r\n**WeakMap 예:**\r\n```javascript\r\nconst wm = new WeakMap();\r\nlet obj = { data: 'value' };\r\nwm.set(obj, 'metadata');\r\n\r\nwm.get(obj);  // 'metadata'\r\n\r\nobj = null;  // 이제 WeakMap의 엔트리도 GC 대상\r\n```\r\n\r\n**WeakSet 예:**\r\n```javascript\r\nconst ws = new WeakSet();\r\nlet obj = {};\r\nws.add(obj);\r\n\r\nws.has(obj);  // true\r\nobj = null;   // GC 대상\r\n```\r\n\r\n**사용 사례:**\r\n\r\n**WeakMap:**\r\n- 객체에 private 데이터 연결\r\n- DOM 노드에 메타데이터 저장\r\n- 캐싱 (메모리 자동 정리)\r\n\r\n**WeakSet:**\r\n- 객체 방문 여부 추적\r\n- 순환 참조 감지\r\n\r\n```javascript\r\n// 클래스 private 데이터\r\nconst privateData = new WeakMap();\r\nclass User {\r\n    constructor(name) {\r\n        privateData.set(this, { name });\r\n    }\r\n}\r\n```",
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
    "answer": "**Symbol:**\r\n고유하고 변경 불가능한 원시 타입 (ES6)\r\n\r\n```javascript\r\nconst sym1 = Symbol('description');\r\nconst sym2 = Symbol('description');\r\nsym1 === sym2;  // false (항상 고유)\r\n```\r\n\r\n**주요 용도:**\r\n\r\n**1. 객체의 고유 프로퍼티 키**\r\n```javascript\r\nconst id = Symbol('id');\r\nconst user = {\r\n    name: 'John',\r\n    [id]: 123  // Symbol 키\r\n};\r\n\r\nuser[id];  // 123\r\nObject.keys(user);  // ['name'] - Symbol 제외\r\n```\r\n\r\n**2. 이름 충돌 방지**\r\n```javascript\r\n// 라이브러리가 Symbol로 확장하면 충돌 없음\r\nArray.prototype[Symbol.for('myLib.method')] = function() {};\r\n```\r\n\r\n**3. Well-Known Symbols (내장 심볼)**\r\n```javascript\r\n// 객체 동작 커스터마이징\r\nconst obj = {\r\n    [Symbol.iterator]: function* () { yield 1; yield 2; },\r\n    [Symbol.toStringTag]: 'MyObject'\r\n};\r\n\r\n[...obj];  // [1, 2]\r\nobj.toString();  // '[object MyObject]'\r\n```\r\n\r\n**Symbol.for() - 전역 심볼:**\r\n```javascript\r\nconst globalSym = Symbol.for('shared');\r\nSymbol.for('shared') === globalSym;  // true (같은 키면 재사용)\r\nSymbol.keyFor(globalSym);  // 'shared'\r\n```\r\n\r\n**Well-Known Symbols:**\r\n- Symbol.iterator, Symbol.asyncIterator\r\n- Symbol.toStringTag, Symbol.toPrimitive\r\n- Symbol.hasInstance, Symbol.species",
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
    "answer": "**Proxy:**\r\n객체 기본 동작(읽기, 쓰기, 열거 등)을 가로채서 커스터마이징\r\n\r\n```javascript\r\nconst target = { name: 'John', age: 30 };\r\nconst handler = {\r\n    get(target, prop) {\r\n        console.log(`Getting ${prop}`);\r\n        return target[prop];\r\n    },\r\n    set(target, prop, value) {\r\n        console.log(`Setting ${prop} = ${value}`);\r\n        target[prop] = value;\r\n        return true;\r\n    }\r\n};\r\n\r\nconst proxy = new Proxy(target, handler);\r\nproxy.name;      // \"Getting name\" → \"John\"\r\nproxy.age = 31;  // \"Setting age = 31\"\r\n```\r\n\r\n**주요 트랩 (Handler 메서드):**\r\n- get, set, has (in 연산자)\r\n- deleteProperty, apply (함수 호출)\r\n- construct (new), ownKeys\r\n\r\n**Reflect:**\r\n객체 조작을 위한 메서드 모음 (Proxy 트랩과 1:1 대응)\r\n\r\n```javascript\r\nconst handler = {\r\n    get(target, prop, receiver) {\r\n        // Reflect로 기본 동작 수행\r\n        return Reflect.get(target, prop, receiver);\r\n    }\r\n};\r\n```\r\n\r\n**활용 사례:**\r\n\r\n**1. 유효성 검사**\r\n```javascript\r\nconst validator = {\r\n    set(target, prop, value) {\r\n        if (prop === 'age' && value < 0) {\r\n            throw new Error('Invalid age');\r\n        }\r\n        return Reflect.set(target, prop, value);\r\n    }\r\n};\r\n```\r\n\r\n**2. 반응형 시스템 (Vue 3)**\r\n```javascript\r\nconst reactive = (obj) => new Proxy(obj, {\r\n    set(target, prop, value) {\r\n        target[prop] = value;\r\n        notifySubscribers();  // 변경 알림\r\n        return true;\r\n    }\r\n});\r\n```",
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
    "answer": "**Iterator:**\r\n순차적 접근을 위한 프로토콜\r\n\r\n```javascript\r\nconst iterator = {\r\n    current: 0,\r\n    next() {\r\n        if (this.current < 3) {\r\n            return { value: this.current++, done: false };\r\n        }\r\n        return { value: undefined, done: true };\r\n    }\r\n};\r\n\r\niterator.next();  // { value: 0, done: false }\r\niterator.next();  // { value: 1, done: false }\r\n```\r\n\r\n**Iterable 프로토콜:**\r\n```javascript\r\nconst iterable = {\r\n    [Symbol.iterator]() {\r\n        return iterator;\r\n    }\r\n};\r\nfor (const v of iterable) { }  // 0, 1, 2\r\n```\r\n\r\n---\r\n\r\n**Generator:**\r\n일시 중지/재개 가능한 함수 (Iterator 자동 생성)\r\n\r\n```javascript\r\nfunction* generator() {\r\n    yield 1;\r\n    yield 2;\r\n    yield 3;\r\n}\r\n\r\nconst gen = generator();\r\ngen.next();  // { value: 1, done: false }\r\ngen.next();  // { value: 2, done: false }\r\ngen.next();  // { value: 3, done: false }\r\ngen.next();  // { value: undefined, done: true }\r\n```\r\n\r\n**yield 양방향 통신:**\r\n```javascript\r\nfunction* gen() {\r\n    const x = yield 'first';\r\n    const y = yield x + 1;\r\n    return x + y;\r\n}\r\nconst g = gen();\r\ng.next();      // { value: 'first', done: false }\r\ng.next(10);    // { value: 11, done: false } (x=10)\r\ng.next(20);    // { value: 30, done: true } (y=20)\r\n```\r\n\r\n**활용:**\r\n- 지연 평가 (무한 시퀀스)\r\n- async/await 이전의 비동기 처리 (co 라이브러리)\r\n- 상태 머신",
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
    "answer": "| 구분 | CommonJS | ES Module |\r\n|------|----------|-----------|\r\n| 문법 | require/module.exports | import/export |\r\n| 로딩 | 동기 (런타임) | 비동기 (컴파일 타임) |\r\n| 환경 | Node.js 기본 | 브라우저, Node.js |\r\n| 트리쉐이킹 | 어려움 | 가능 |\r\n| 바인딩 | 값 복사 | 라이브 바인딩 |\r\n\r\n**CommonJS:**\r\n```javascript\r\n// 내보내기\r\nmodule.exports = { add, subtract };\r\nmodule.exports.add = add;\r\nexports.add = add;\r\n\r\n// 가져오기\r\nconst { add } = require('./math');\r\nconst math = require('./math');\r\n```\r\n\r\n**ES Module:**\r\n```javascript\r\n// 내보내기\r\nexport const add = (a, b) => a + b;\r\nexport default function subtract(a, b) { return a - b; }\r\n\r\n// 가져오기\r\nimport subtract, { add } from './math.js';\r\nimport * as math from './math.js';\r\n\r\n// 동적 import\r\nconst module = await import('./module.js');\r\n```\r\n\r\n**라이브 바인딩 차이:**\r\n```javascript\r\n// CommonJS - 값 복사\r\nlet count = 0;\r\nmodule.exports = { count, increment() { count++; } };\r\n// 외부에서 count 변경 안 보임\r\n\r\n// ESM - 라이브 바인딩\r\nexport let count = 0;\r\nexport function increment() { count++; }\r\n// 외부에서 변경 보임\r\n```\r\n\r\n**Node.js에서 ESM:**\r\n- package.json에 \"type\": \"module\"\r\n- 또는 .mjs 확장자",
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
    "answer": "**TypeScript:**\r\nJavaScript에 정적 타입을 추가한 상위 집합 (Superset)\r\n\r\n**기본 타입:**\r\n```typescript\r\nlet str: string = 'hello';\r\nlet num: number = 42;\r\nlet bool: boolean = true;\r\nlet arr: number[] = [1, 2, 3];\r\nlet tuple: [string, number] = ['a', 1];\r\nlet obj: { name: string } = { name: 'John' };\r\n```\r\n\r\n**특수 타입:**\r\n```typescript\r\nlet any: any = 'anything';      // 모든 타입 허용 (지양)\r\nlet unknown: unknown = 'safe';  // 안전한 any\r\nlet never: never;               // 발생하지 않는 값\r\nlet void_: void = undefined;    // 반환 없음\r\n```\r\n\r\n**타입 정의:**\r\n```typescript\r\n// 인터페이스\r\ninterface User {\r\n    name: string;\r\n    age?: number;  // optional\r\n    readonly id: number;\r\n}\r\n\r\n// 타입 별칭\r\ntype ID = string | number;\r\ntype Point = { x: number; y: number };\r\n\r\n// 함수 타입\r\ntype Fn = (a: number) => string;\r\n```\r\n\r\n**구조적 타이핑 (Structural Typing):**\r\n```typescript\r\ninterface Point { x: number; y: number; }\r\nconst p = { x: 1, y: 2, z: 3 };  // z 무시\r\nconst point: Point = p;  // OK (필요한 속성만 있으면 됨)\r\n```\r\n\r\n**장점:**\r\n- 컴파일 타임 오류 발견\r\n- IDE 자동완성/리팩토링\r\n- 문서화 효과",
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
    "answer": "**제네릭:**\r\n타입을 파라미터화하여 재사용 가능한 컴포넌트 작성\r\n\r\n**기본 사용:**\r\n```typescript\r\n// 함수\r\nfunction identity<T>(arg: T): T {\r\n    return arg;\r\n}\r\nidentity<string>('hello');\r\nidentity(42);  // 타입 추론\r\n\r\n// 인터페이스\r\ninterface Box<T> {\r\n    value: T;\r\n}\r\nconst box: Box<number> = { value: 42 };\r\n\r\n// 클래스\r\nclass Container<T> {\r\n    constructor(private value: T) {}\r\n    getValue(): T { return this.value; }\r\n}\r\n```\r\n\r\n**제약조건 (Constraints):**\r\n```typescript\r\n// extends로 제약\r\ninterface HasLength { length: number; }\r\nfunction logLength<T extends HasLength>(arg: T): T {\r\n    console.log(arg.length);  // OK\r\n    return arg;\r\n}\r\nlogLength('hello');  // OK\r\nlogLength([1, 2]);   // OK\r\nlogLength(123);      // Error\r\n\r\n// keyof 제약\r\nfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\r\n    return obj[key];\r\n}\r\n```\r\n\r\n**다중 타입 파라미터:**\r\n```typescript\r\nfunction pair<T, U>(first: T, second: U): [T, U] {\r\n    return [first, second];\r\n}\r\n```\r\n\r\n**기본값:**\r\n```typescript\r\ninterface Response<T = any> {\r\n    data: T;\r\n}\r\n```\r\n\r\n**제약사항:**\r\n- 런타임에 타입 정보 없음 (타입 소거)\r\n- `new T()` 직접 불가",
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
    "answer": "**Union Type (|): 또는**\r\n여러 타입 중 하나\r\n\r\n```typescript\r\ntype StringOrNumber = string | number;\r\n\r\nfunction process(value: StringOrNumber) {\r\n    if (typeof value === 'string') {\r\n        return value.toUpperCase();  // string으로 좁혀짐\r\n    }\r\n    return value * 2;  // number\r\n}\r\n\r\n// 리터럴 유니온\r\ntype Status = 'pending' | 'success' | 'error';\r\ntype HttpCode = 200 | 400 | 500;\r\n```\r\n\r\n**Intersection Type (&): 그리고**\r\n여러 타입을 모두 만족\r\n\r\n```typescript\r\ninterface HasName { name: string; }\r\ninterface HasAge { age: number; }\r\n\r\ntype Person = HasName & HasAge;\r\n// Person은 name과 age 모두 필요\r\n\r\nconst person: Person = {\r\n    name: 'John',\r\n    age: 30\r\n};\r\n```\r\n\r\n**비교:**\r\n```typescript\r\n// Union: A 또는 B\r\ntype AorB = A | B;  // A의 멤버 또는 B의 멤버\r\n\r\n// Intersection: A 그리고 B\r\ntype AandB = A & B;  // A의 멤버와 B의 멤버 모두\r\n```\r\n\r\n**실무 활용:**\r\n```typescript\r\n// API 응답\r\ntype ApiResponse<T> =\r\n    | { status: 'success'; data: T }\r\n    | { status: 'error'; message: string };\r\n\r\n// Mixin 패턴\r\ntype Timestamped = { createdAt: Date; updatedAt: Date };\r\ntype User = { name: string } & Timestamped;\r\n```",
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
    "answer": "**타입 가드:**\r\n런타임에 타입을 좁히는(narrowing) 표현식\r\n\r\n**1. typeof 가드**\r\n```typescript\r\nfunction process(value: string | number) {\r\n    if (typeof value === 'string') {\r\n        return value.toUpperCase();  // string\r\n    }\r\n    return value.toFixed(2);  // number\r\n}\r\n```\r\n\r\n**2. instanceof 가드**\r\n```typescript\r\nclass Dog { bark() {} }\r\nclass Cat { meow() {} }\r\n\r\nfunction handle(animal: Dog | Cat) {\r\n    if (animal instanceof Dog) {\r\n        animal.bark();  // Dog\r\n    } else {\r\n        animal.meow();  // Cat\r\n    }\r\n}\r\n```\r\n\r\n**3. in 연산자**\r\n```typescript\r\ninterface Fish { swim: () => void; }\r\ninterface Bird { fly: () => void; }\r\n\r\nfunction move(animal: Fish | Bird) {\r\n    if ('swim' in animal) {\r\n        animal.swim();  // Fish\r\n    } else {\r\n        animal.fly();   // Bird\r\n    }\r\n}\r\n```\r\n\r\n**4. 사용자 정의 타입 가드**\r\n```typescript\r\nfunction isFish(animal: Fish | Bird): animal is Fish {\r\n    return (animal as Fish).swim !== undefined;\r\n}\r\n\r\nif (isFish(animal)) {\r\n    animal.swim();  // Fish로 좁혀짐\r\n}\r\n```\r\n\r\n**5. Discriminated Union**\r\n```typescript\r\ntype Result =\r\n    | { type: 'success'; data: string }\r\n    | { type: 'error'; message: string };\r\n\r\nfunction handle(result: Result) {\r\n    switch (result.type) {\r\n        case 'success': return result.data;\r\n        case 'error': return result.message;\r\n    }\r\n}\r\n```",
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
    "answer": "**유틸리티 타입:**\r\n기존 타입을 변환하여 새 타입 생성\r\n\r\n```typescript\r\ninterface User {\r\n    id: number;\r\n    name: string;\r\n    email: string;\r\n    age: number;\r\n}\r\n```\r\n\r\n**Partial<T>: 모든 속성 선택적**\r\n```typescript\r\ntype PartialUser = Partial<User>;\r\n// { id?: number; name?: string; email?: string; age?: number; }\r\n\r\nfunction updateUser(id: number, updates: Partial<User>) { }\r\n```\r\n\r\n**Required<T>: 모든 속성 필수**\r\n```typescript\r\ntype RequiredUser = Required<PartialUser>;\r\n```\r\n\r\n**Pick<T, K>: 특정 속성만 선택**\r\n```typescript\r\ntype UserBasic = Pick<User, 'id' | 'name'>;\r\n// { id: number; name: string; }\r\n```\r\n\r\n**Omit<T, K>: 특정 속성 제외**\r\n```typescript\r\ntype UserWithoutEmail = Omit<User, 'email'>;\r\n// { id: number; name: string; age: number; }\r\n```\r\n\r\n**Record<K, T>: 키-값 타입 생성**\r\n```typescript\r\ntype UserMap = Record<string, User>;\r\n// { [key: string]: User }\r\n```\r\n\r\n**Readonly<T>: 모든 속성 읽기 전용**\r\n```typescript\r\ntype ReadonlyUser = Readonly<User>;\r\n```\r\n\r\n**기타:**\r\n```typescript\r\nReturnType<typeof fn>  // 함수 반환 타입\r\nParameters<typeof fn>  // 함수 파라미터 타입\r\nNonNullable<T>         // null, undefined 제외\r\nExtract<T, U>          // T에서 U에 할당 가능한 것\r\nExclude<T, U>          // T에서 U 제외\r\n```",
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
    "answer": "**never:**\r\n절대 발생하지 않는 값의 타입\r\n\r\n**사용 사례:**\r\n\r\n**1. 절대 반환하지 않는 함수**\r\n```typescript\r\nfunction throwError(message: string): never {\r\n    throw new Error(message);\r\n}\r\n\r\nfunction infiniteLoop(): never {\r\n    while (true) {}\r\n}\r\n```\r\n\r\n**2. 완전성 검사 (Exhaustiveness Check)**\r\n```typescript\r\ntype Shape = 'circle' | 'square' | 'triangle';\r\n\r\nfunction getArea(shape: Shape): number {\r\n    switch (shape) {\r\n        case 'circle': return 3.14;\r\n        case 'square': return 4;\r\n        case 'triangle': return 3;\r\n        default:\r\n            const _exhaustive: never = shape;  // 모든 케이스 처리 확인\r\n            return _exhaustive;\r\n    }\r\n}\r\n// 새 타입 추가 시 컴파일 에러\r\n```\r\n\r\n**3. 타입 좁히기 결과**\r\n```typescript\r\nfunction process(value: string | number) {\r\n    if (typeof value === 'string') { }\r\n    else if (typeof value === 'number') { }\r\n    else {\r\n        value;  // never (도달 불가)\r\n    }\r\n}\r\n```\r\n\r\n**4. 불가능한 타입 표현**\r\n```typescript\r\ntype Never = string & number;  // never\r\n```\r\n\r\n**never vs void:**\r\n- void: 값이 없음 (undefined 반환 가능)\r\n- never: 값이 절대 없음 (반환 자체가 없음)",
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
    "answer": "**컴파일 과정:**\r\n```\r\n.ts → 파싱 → AST → 타입 검사 → 변환 → .js + .d.ts\r\n```\r\n\r\n1. **파싱**: 소스를 AST(Abstract Syntax Tree)로\r\n2. **타입 검사**: AST 기반 타입 분석\r\n3. **변환**: JavaScript + 타입 선언 파일 생성\r\n\r\n**tsconfig.json 주요 옵션:**\r\n\r\n```json\r\n{\r\n  \"compilerOptions\": {\r\n    // 타겟 JS 버전\r\n    \"target\": \"ES2020\",\r\n\r\n    // 모듈 시스템\r\n    \"module\": \"ESNext\",\r\n    \"moduleResolution\": \"node\",\r\n\r\n    // 엄격한 타입 체크\r\n    \"strict\": true,\r\n    \"noImplicitAny\": true,\r\n    \"strictNullChecks\": true,\r\n\r\n    // 출력 설정\r\n    \"outDir\": \"./dist\",\r\n    \"rootDir\": \"./src\",\r\n    \"declaration\": true,  // .d.ts 생성\r\n\r\n    // 상호운용\r\n    \"esModuleInterop\": true,\r\n    \"allowSyntheticDefaultImports\": true,\r\n\r\n    // 소스맵\r\n    \"sourceMap\": true\r\n  },\r\n  \"include\": [\"src/**/*\"],\r\n  \"exclude\": [\"node_modules\"]\r\n}\r\n```\r\n\r\n**주요 strict 옵션:**\r\n- `strictNullChecks`: null/undefined 엄격 체크\r\n- `noImplicitAny`: 암시적 any 금지\r\n- `strictFunctionTypes`: 함수 타입 엄격 체크\r\n\r\n**빌드 도구:**\r\n- tsc (기본)\r\n- ts-node (런타임 실행)\r\n- esbuild, swc (빠른 변환)",
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
    "answer": "**데코레이터:**\r\n클래스, 메서드, 프로퍼티 등을 수정하는 선언적 문법\r\n\r\n**설정 필요:**\r\n```json\r\n// tsconfig.json\r\n{\r\n  \"compilerOptions\": {\r\n    \"experimentalDecorators\": true,\r\n    \"emitDecoratorMetadata\": true\r\n  }\r\n}\r\n```\r\n\r\n**데코레이터 종류:**\r\n\r\n**1. 클래스 데코레이터**\r\n```typescript\r\nfunction sealed(constructor: Function) {\r\n    Object.seal(constructor);\r\n    Object.seal(constructor.prototype);\r\n}\r\n\r\n@sealed\r\nclass Greeter { }\r\n```\r\n\r\n**2. 메서드 데코레이터**\r\n```typescript\r\nfunction log(target: any, key: string, descriptor: PropertyDescriptor) {\r\n    const original = descriptor.value;\r\n    descriptor.value = function(...args: any[]) {\r\n        console.log(`Calling ${key} with`, args);\r\n        return original.apply(this, args);\r\n    };\r\n}\r\n\r\nclass Calculator {\r\n    @log\r\n    add(a: number, b: number) { return a + b; }\r\n}\r\n```\r\n\r\n**3. 프로퍼티 데코레이터**\r\n```typescript\r\nfunction readonly(target: any, key: string) {\r\n    Object.defineProperty(target, key, { writable: false });\r\n}\r\n```\r\n\r\n**4. 파라미터 데코레이터**\r\n```typescript\r\nfunction required(target: any, key: string, index: number) {\r\n    // 파라미터 메타데이터 추가\r\n}\r\n```\r\n\r\n**실행 순서:**\r\n파라미터 → 메서드 → 프로퍼티 → 클래스\r\n\r\n**활용:**\r\n- NestJS: @Controller, @Get, @Injectable\r\n- Angular: @Component, @Input",
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
    "answer": "**Python 메모리 관리자:**\r\nPrivate heap에서 모든 객체와 데이터 구조 관리\r\n\r\n**1. 참조 카운팅 (Reference Counting)**\r\n```python\r\nimport sys\r\na = [1, 2, 3]\r\nsys.getrefcount(a)  # 참조 수 확인\r\n\r\nb = a  # 참조 수 증가\r\ndel b  # 참조 수 감소\r\n# 참조 수 0이 되면 즉시 해제\r\n```\r\n\r\n**2. 가비지 컬렉션 (순환 참조 처리)**\r\n```python\r\nimport gc\r\n\r\n# 순환 참조\r\na = []\r\nb = [a]\r\na.append(b)  # 참조 카운팅만으로 해제 불가\r\n\r\ngc.collect()  # 순환 참조 탐지 및 해제\r\n```\r\n\r\n**3. 메모리 풀 (PyMalloc)**\r\n- 작은 객체 (< 512 bytes): 전용 풀에서 할당\r\n- 큰 객체: OS malloc 사용\r\n- 블록 → 풀 → 아레나 계층 구조\r\n\r\n**4. 객체 캐싱**\r\n```python\r\n# 작은 정수 캐싱 (-5 ~ 256)\r\na = 100\r\nb = 100\r\na is b  # True\r\n\r\n# 문자열 인터닝\r\na = 'hello'\r\nb = 'hello'\r\na is b  # True\r\n```\r\n\r\n**메모리 최적화:**\r\n- `__slots__`: dict 대신 고정 속성\r\n- 제너레이터: 지연 평가로 메모리 절약",
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
    "answer": "**GIL:**\r\n한 번에 하나의 스레드만 Python 바이트코드를 실행하도록 하는 뮤텍스\r\n\r\n**존재 이유:**\r\n- CPython의 메모리 관리 (참조 카운팅)가 스레드 안전하지 않음\r\n- 단순성과 C 확장 통합 용이\r\n\r\n**영향:**\r\n\r\n**CPU 바운드 작업:**\r\n```python\r\n# 멀티스레딩 효과 없음\r\nimport threading\r\ndef cpu_task():\r\n    sum(range(10**7))\r\n\r\n# 스레드 늘려도 속도 향상 없음 (오히려 오버헤드)\r\n```\r\n\r\n**I/O 바운드 작업:**\r\n```python\r\n# 멀티스레딩 효과 있음\r\n# I/O 대기 중 GIL 해제되어 다른 스레드 실행 가능\r\nimport threading\r\nimport requests\r\n\r\ndef io_task():\r\n    requests.get('http://example.com')\r\n```\r\n\r\n**우회 방법:**\r\n\r\n1. **multiprocessing**: 별도 프로세스 (GIL 우회)\r\n```python\r\nfrom multiprocessing import Pool\r\nwith Pool(4) as p:\r\n    p.map(cpu_task, data)\r\n```\r\n\r\n2. **C 확장**: GIL 해제하고 실행 (NumPy 등)\r\n\r\n3. **asyncio**: 비동기 I/O\r\n\r\n4. **다른 인터프리터**: Jython, PyPy (STM)\r\n\r\n5. **Free-threaded Python (Python 3.13+)**: GIL 비활성화 빌드\r\n```bash\r\n# GIL 없이 실행\r\npython -X gil=0 script.py\r\n# 또는 환경변수\r\nPYTHON_GIL=0 python script.py\r\n```\r\n- PEP 703에서 제안된 실험적 기능\r\n- 진정한 멀티스레드 병렬 처리 가능",
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
    "answer": "**불변 객체 (Immutable):**\r\n| 타입 | 예시 |\r\n|------|------|\r\n| int | 42 |\r\n| float | 3.14 |\r\n| str | 'hello' |\r\n| tuple | (1, 2, 3) |\r\n| frozenset | frozenset([1, 2]) |\r\n| bool | True |\r\n\r\n```python\r\ns = 'hello'\r\ns[0] = 'H'  # TypeError: 수정 불가\r\ns = 'Hello'  # 새 객체 생성\r\n```\r\n\r\n**가변 객체 (Mutable):**\r\n| 타입 | 예시 |\r\n|------|------|\r\n| list | [1, 2, 3] |\r\n| dict | {'a': 1} |\r\n| set | {1, 2, 3} |\r\n| 사용자 정의 클래스 | 기본적으로 가변 |\r\n\r\n```python\r\nlst = [1, 2, 3]\r\nlst[0] = 10  # OK: 내부 수정\r\n```\r\n\r\n**영향:**\r\n\r\n**1. 함수 인자**\r\n```python\r\ndef modify(lst, s):\r\n    lst.append(4)  # 원본 변경됨\r\n    s = s + '!'    # 새 객체 (원본 불변)\r\n```\r\n\r\n**2. 딕셔너리 키**\r\n```python\r\n# 불변만 키로 사용 가능 (해시 필요)\r\nd = {(1, 2): 'tuple'}  # OK\r\nd = {[1, 2]: 'list'}   # TypeError\r\n```\r\n\r\n**3. 기본 인자 주의**\r\n```python\r\n# Bad\r\ndef append(item, lst=[]):\r\n    lst.append(item)\r\n    return lst  # 같은 리스트 공유!\r\n\r\n# Good\r\ndef append(item, lst=None):\r\n    if lst is None:\r\n        lst = []\r\n    lst.append(item)\r\n    return lst\r\n```",
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
    "answer": "**얕은 복사 (Shallow Copy):**\r\n1단계만 복사, 중첩 객체는 참조 공유\r\n\r\n```python\r\nimport copy\r\n\r\noriginal = [[1, 2], [3, 4]]\r\n\r\n# 얕은 복사 방법들\r\nshallow1 = copy.copy(original)\r\nshallow2 = original[:]\r\nshallow3 = list(original)\r\n\r\noriginal[0][0] = 100\r\nprint(shallow1)  # [[100, 2], [3, 4]] - 변경됨!\r\n```\r\n\r\n**깊은 복사 (Deep Copy):**\r\n모든 레벨 재귀적 복사\r\n\r\n```python\r\nimport copy\r\n\r\noriginal = [[1, 2], [3, 4]]\r\ndeep = copy.deepcopy(original)\r\n\r\noriginal[0][0] = 100\r\nprint(deep)  # [[1, 2], [3, 4]] - 영향 없음\r\n```\r\n\r\n**비교:**\r\n| 구분 | 얕은 복사 | 깊은 복사 |\r\n|------|----------|----------|\r\n| 1단계 | 새 객체 | 새 객체 |\r\n| 중첩 객체 | 참조 공유 | 재귀 복사 |\r\n| 성능 | 빠름 | 느림 |\r\n| 순환 참조 | 문제 없음 | 처리함 |\r\n\r\n**주의사항:**\r\n```python\r\n# 사용자 정의 클래스\r\nclass MyClass:\r\n    def __copy__(self):\r\n        # 얕은 복사 커스터마이징\r\n        pass\r\n    def __deepcopy__(self, memo):\r\n        # 깊은 복사 커스터마이징\r\n        pass\r\n```",
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
    "answer": "***args:** 가변 위치 인자를 튜플로 수집\r\n```python\r\ndef func(*args):\r\n    print(args)  # 튜플\r\n    for arg in args:\r\n        print(arg)\r\n\r\nfunc(1, 2, 3)  # (1, 2, 3)\r\n```\r\n\r\n****kwargs:** 가변 키워드 인자를 딕셔너리로 수집\r\n```python\r\ndef func(**kwargs):\r\n    print(kwargs)  # 딕셔너리\r\n    for key, value in kwargs.items():\r\n        print(f'{key}={value}')\r\n\r\nfunc(name='John', age=30)  # {'name': 'John', 'age': 30}\r\n```\r\n\r\n**함께 사용:**\r\n```python\r\ndef func(required, *args, **kwargs):\r\n    print(required)\r\n    print(args)\r\n    print(kwargs)\r\n\r\nfunc('a', 1, 2, x=10, y=20)\r\n# 'a', (1, 2), {'x': 10, 'y': 20}\r\n```\r\n\r\n**언패킹:**\r\n```python\r\ndef add(a, b, c):\r\n    return a + b + c\r\n\r\nargs = (1, 2, 3)\r\nadd(*args)  # 6\r\n\r\nkwargs = {'a': 1, 'b': 2, 'c': 3}\r\nadd(**kwargs)  # 6\r\n```\r\n\r\n**파라미터 순서:**\r\n```python\r\ndef func(pos, *args, kw_only, **kwargs):\r\n    pass\r\n# pos: 위치 인자\r\n# *args: 가변 위치\r\n# kw_only: 키워드 전용\r\n# **kwargs: 가변 키워드\r\n```",
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
    "answer": "**데코레이터:**\r\n함수를 인자로 받아 새 함수를 반환하는 함수 (함수 확장)\r\n\r\n**기본 구조:**\r\n```python\r\ndef decorator(func):\r\n    def wrapper(*args, **kwargs):\r\n        print('Before')\r\n        result = func(*args, **kwargs)\r\n        print('After')\r\n        return result\r\n    return wrapper\r\n\r\n@decorator\r\ndef greet(name):\r\n    print(f'Hello, {name}')\r\n\r\n# 동등: greet = decorator(greet)\r\ngreet('John')\r\n# Before → Hello, John → After\r\n```\r\n\r\n**인자 있는 데코레이터:**\r\n```python\r\ndef repeat(n):\r\n    def decorator(func):\r\n        def wrapper(*args, **kwargs):\r\n            for _ in range(n):\r\n                func(*args, **kwargs)\r\n        return wrapper\r\n    return decorator\r\n\r\n@repeat(3)\r\ndef say_hi():\r\n    print('Hi')\r\n```\r\n\r\n**functools.wraps (메타데이터 보존):**\r\n```python\r\nfrom functools import wraps\r\n\r\ndef decorator(func):\r\n    @wraps(func)  # __name__, __doc__ 보존\r\n    def wrapper(*args, **kwargs):\r\n        return func(*args, **kwargs)\r\n    return wrapper\r\n```\r\n\r\n**클래스 데코레이터:**\r\n```python\r\ndef singleton(cls):\r\n    instances = {}\r\n    def get_instance(*args, **kwargs):\r\n        if cls not in instances:\r\n            instances[cls] = cls(*args, **kwargs)\r\n        return instances[cls]\r\n    return get_instance\r\n\r\n@singleton\r\nclass Database:\r\n    pass\r\n```",
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
    "answer": "**Iterator:**\r\n`__iter__()`, `__next__()`를 구현한 객체\r\n\r\n```python\r\nclass Counter:\r\n    def __init__(self, max):\r\n        self.max = max\r\n        self.n = 0\r\n\r\n    def __iter__(self):\r\n        return self\r\n\r\n    def __next__(self):\r\n        if self.n < self.max:\r\n            self.n += 1\r\n            return self.n\r\n        raise StopIteration\r\n\r\nfor i in Counter(3):\r\n    print(i)  # 1, 2, 3\r\n```\r\n\r\n**Generator:**\r\n`yield`를 사용하여 Iterator를 간단히 생성\r\n\r\n```python\r\ndef counter(max):\r\n    n = 0\r\n    while n < max:\r\n        n += 1\r\n        yield n  # 일시 중지, 값 반환\r\n\r\nfor i in counter(3):\r\n    print(i)  # 1, 2, 3\r\n```\r\n\r\n**Generator Expression:**\r\n```python\r\ngen = (x**2 for x in range(10))  # 메모리 효율적\r\nlst = [x**2 for x in range(10)]  # 전체 메모리 사용\r\n```\r\n\r\n**장점:**\r\n- **메모리 효율**: 필요할 때만 값 생성\r\n- **지연 평가**: 무한 시퀀스 가능\r\n- **간결한 코드**\r\n\r\n**send, throw, close:**\r\n```python\r\ndef gen():\r\n    while True:\r\n        received = yield\r\n        print(f'Got: {received}')\r\n\r\ng = gen()\r\nnext(g)\r\ng.send('hello')  # Got: hello\r\n```",
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
    "answer": "**컨텍스트 매니저:**\r\n`with` 문에서 리소스 설정/정리를 자동화하는 객체\r\n\r\n**기본 사용:**\r\n```python\r\nwith open('file.txt', 'r') as f:\r\n    content = f.read()\r\n# 자동으로 f.close() 호출 (예외 발생해도)\r\n```\r\n\r\n**클래스로 구현:**\r\n```python\r\nclass FileManager:\r\n    def __init__(self, filename, mode):\r\n        self.filename = filename\r\n        self.mode = mode\r\n\r\n    def __enter__(self):\r\n        self.file = open(self.filename, self.mode)\r\n        return self.file\r\n\r\n    def __exit__(self, exc_type, exc_val, exc_tb):\r\n        self.file.close()\r\n        return False  # 예외 전파\r\n\r\nwith FileManager('file.txt', 'r') as f:\r\n    content = f.read()\r\n```\r\n\r\n**contextlib로 간단히:**\r\n```python\r\nfrom contextlib import contextmanager\r\n\r\n@contextmanager\r\ndef file_manager(filename, mode):\r\n    f = open(filename, mode)\r\n    try:\r\n        yield f\r\n    finally:\r\n        f.close()\r\n\r\nwith file_manager('file.txt', 'r') as f:\r\n    content = f.read()\r\n```\r\n\r\n**활용 사례:**\r\n- 파일, 네트워크, DB 연결\r\n- 락 획득/해제\r\n- 트랜잭션\r\n- 임시 설정 변경\r\n\r\n```python\r\n# 락\r\nwith threading.Lock():\r\n    # 임계 영역\r\n\r\n# 임시 디렉토리\r\nwith tempfile.TemporaryDirectory() as tmpdir:\r\n    # tmpdir 사용\r\n```",
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
    "answer": "| 구분 | 리스트 컴프리헨션 | 제너레이터 표현식 |\r\n|------|------------------|-------------------|\r\n| 문법 | [x for x in ...] | (x for x in ...) |\r\n| 반환 | list | generator |\r\n| 메모리 | 전체 할당 | 지연 생성 |\r\n| 재사용 | 가능 | 1회성 |\r\n| 속도 | 빠름 (한번에) | 느림 (순차) |\r\n\r\n**리스트 컴프리헨션:**\r\n```python\r\nsquares = [x**2 for x in range(1000000)]\r\n# 모든 값 즉시 메모리에 생성\r\nimport sys\r\nsys.getsizeof(squares)  # 약 8MB\r\n```\r\n\r\n**제너레이터 표현식:**\r\n```python\r\nsquares = (x**2 for x in range(1000000))\r\n# 값을 필요할 때만 생성\r\nsys.getsizeof(squares)  # 약 100 bytes\r\n```\r\n\r\n**선택 기준:**\r\n\r\n**리스트 컴프리헨션:**\r\n- 데이터 크기가 작을 때\r\n- 여러 번 순회 필요\r\n- 인덱싱/슬라이싱 필요\r\n- len() 필요\r\n\r\n**제너레이터:**\r\n- 대용량 데이터\r\n- 한 번만 순회\r\n- 메모리 제한 환경\r\n- 무한 시퀀스\r\n\r\n```python\r\n# 대용량 파일 처리\r\nlines = (line.strip() for line in open('huge.txt'))\r\nfor line in lines:\r\n    process(line)\r\n```",
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
    "answer": "**람다 함수:**\r\n단일 표현식을 가진 익명 함수\r\n\r\n```python\r\n# 기본 형태\r\nadd = lambda x, y: x + y\r\nadd(1, 2)  # 3\r\n\r\n# 일반 함수와 동등\r\ndef add(x, y):\r\n    return x + y\r\n```\r\n\r\n**활용:**\r\n```python\r\n# sorted key\r\nsorted(items, key=lambda x: x['name'])\r\n\r\n# filter\r\nlist(filter(lambda x: x > 0, numbers))\r\n\r\n# map\r\nlist(map(lambda x: x**2, numbers))\r\n\r\n# reduce\r\nfrom functools import reduce\r\nreduce(lambda a, b: a + b, [1, 2, 3])  # 6\r\n```\r\n\r\n**제한사항:**\r\n\r\n1. **단일 표현식만**\r\n```python\r\n# 불가능\r\nlambda x: if x > 0: return x  # SyntaxError\r\n\r\n# 조건 표현식은 가능\r\nlambda x: x if x > 0 else 0\r\n```\r\n\r\n2. **문(statements) 불가**\r\n```python\r\n# 불가능: print, assignment, loops\r\nlambda: print('hi')  # 표현식이 None 반환\r\n```\r\n\r\n3. **타입 힌트 불가**\r\n```python\r\n# 불가능\r\nlambda x: int -> int: x + 1\r\n```\r\n\r\n4. **문서화 어려움**\r\n```python\r\n# __doc__ 없음\r\n```\r\n\r\n**권장:**\r\n- 간단한 콜백에만 사용\r\n- 복잡하면 일반 함수로",
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
    "answer": "**클로저:**\r\n내부 함수가 외부 함수의 변수를 기억하고 접근하는 함수\r\n\r\n```python\r\ndef outer(x):\r\n    def inner(y):\r\n        return x + y  # 외부 변수 x 접근\r\n    return inner\r\n\r\nadd5 = outer(5)\r\nadd5(3)  # 8 (x=5 기억)\r\nadd5(7)  # 12\r\n```\r\n\r\n**nonlocal:**\r\n중첩 함수에서 외부 함수의 변수를 수정할 때 사용\r\n\r\n```python\r\ndef counter():\r\n    count = 0\r\n    def increment():\r\n        nonlocal count  # 외부 변수 수정 선언\r\n        count += 1\r\n        return count\r\n    return increment\r\n\r\nc = counter()\r\nc()  # 1\r\nc()  # 2\r\n```\r\n\r\n**nonlocal vs global:**\r\n```python\r\nx = 'global'\r\n\r\ndef outer():\r\n    x = 'outer'\r\n\r\n    def inner():\r\n        nonlocal x  # outer의 x\r\n        x = 'inner'\r\n\r\n    def inner2():\r\n        global x  # 전역 x\r\n        x = 'modified global'\r\n```\r\n\r\n**클로저 활용:**\r\n- 데이터 은닉 (private 변수)\r\n- 상태 유지 함수\r\n- 팩토리 함수\r\n- 데코레이터\r\n\r\n```python\r\n# 메모이제이션\r\ndef memoize(func):\r\n    cache = {}\r\n    def wrapper(*args):\r\n        if args not in cache:\r\n            cache[args] = func(*args)\r\n        return cache[args]\r\n    return wrapper\r\n```",
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
    "answer": "| 구분 | 클래스 변수 | 인스턴스 변수 |\r\n|------|-------------|---------------|\r\n| 정의 위치 | 클래스 내부 | __init__ 내부 (self.xxx) |\r\n| 공유 | 모든 인스턴스 | 인스턴스별 독립 |\r\n| 접근 | 클래스명.변수 / self.변수 | self.변수 |\r\n\r\n```python\r\nclass Dog:\r\n    species = 'Canis'  # 클래스 변수\r\n\r\n    def __init__(self, name):\r\n        self.name = name  # 인스턴스 변수\r\n\r\ndog1 = Dog('Buddy')\r\ndog2 = Dog('Max')\r\n\r\n# 클래스 변수 - 공유\r\nDog.species        # 'Canis'\r\ndog1.species       # 'Canis'\r\n\r\n# 인스턴스 변수 - 독립\r\ndog1.name          # 'Buddy'\r\ndog2.name          # 'Max'\r\n```\r\n\r\n**주의: 가변 객체 클래스 변수**\r\n```python\r\nclass MyClass:\r\n    items = []  # 위험! 모든 인스턴스가 공유\r\n\r\na = MyClass()\r\nb = MyClass()\r\na.items.append(1)\r\nb.items  # [1] - 의도치 않은 공유\r\n\r\n# 해결\r\nclass MyClass:\r\n    def __init__(self):\r\n        self.items = []  # 인스턴스별 생성\r\n```\r\n\r\n**클래스 변수 활용:**\r\n```python\r\nclass Counter:\r\n    count = 0  # 인스턴스 수 추적\r\n\r\n    def __init__(self):\r\n        Counter.count += 1\r\n```",
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
    "answer": "**매직 메서드 (던더 메서드):**\r\n`__xxx__` 형태, Python 내장 동작을 커스터마이징\r\n\r\n**객체 생성/초기화:**\r\n```python\r\nclass Point:\r\n    def __new__(cls, *args):      # 객체 생성\r\n        return super().__new__(cls)\r\n\r\n    def __init__(self, x, y):      # 초기화\r\n        self.x, self.y = x, y\r\n\r\n    def __del__(self):             # 소멸자\r\n        pass\r\n```\r\n\r\n**문자열 표현:**\r\n```python\r\nclass Point:\r\n    def __str__(self):             # print(), str()\r\n        return f'({self.x}, {self.y})'\r\n\r\n    def __repr__(self):            # 개발자용, 재생성 가능하게\r\n        return f'Point({self.x}, {self.y})'\r\n```\r\n\r\n**연산자 오버로딩:**\r\n```python\r\nclass Point:\r\n    def __add__(self, other):      # +\r\n        return Point(self.x + other.x, self.y + other.y)\r\n\r\n    def __eq__(self, other):       # ==\r\n        return self.x == other.x and self.y == other.y\r\n\r\n    def __lt__(self, other):       # <\r\n        return (self.x, self.y) < (other.x, other.y)\r\n```\r\n\r\n**컨테이너 동작:**\r\n```python\r\nclass MyList:\r\n    def __len__(self):             # len()\r\n        return self._length\r\n\r\n    def __getitem__(self, key):    # obj[key]\r\n        return self._data[key]\r\n\r\n    def __iter__(self):            # for loop\r\n        return iter(self._data)\r\n```",
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
    "answer": "**Property:**\r\ngetter/setter를 통한 속성 접근 제어\r\n\r\n```python\r\nclass Circle:\r\n    def __init__(self, radius):\r\n        self._radius = radius\r\n\r\n    @property\r\n    def radius(self):\r\n        return self._radius\r\n\r\n    @radius.setter\r\n    def radius(self, value):\r\n        if value < 0:\r\n            raise ValueError('Radius must be positive')\r\n        self._radius = value\r\n\r\n    @property\r\n    def area(self):  # 읽기 전용\r\n        return 3.14 * self._radius ** 2\r\n\r\nc = Circle(5)\r\nc.radius = 10   # setter 호출\r\nprint(c.area)   # getter 호출\r\n```\r\n\r\n**Descriptor:**\r\n`__get__`, `__set__`, `__delete__`를 구현한 클래스\r\n\r\n```python\r\nclass Positive:\r\n    def __set_name__(self, owner, name):\r\n        self.name = name\r\n\r\n    def __get__(self, obj, type=None):\r\n        return obj.__dict__.get(self.name)\r\n\r\n    def __set__(self, obj, value):\r\n        if value < 0:\r\n            raise ValueError('Must be positive')\r\n        obj.__dict__[self.name] = value\r\n\r\nclass Order:\r\n    quantity = Positive()\r\n    price = Positive()\r\n\r\norder = Order()\r\norder.quantity = 10  # __set__ 호출\r\norder.price = -5     # ValueError\r\n```\r\n\r\n**Property vs Descriptor:**\r\n- Property: 단일 클래스에서 사용\r\n- Descriptor: 여러 클래스에서 재사용 가능",
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
    "answer": "**다중 상속:**\r\n```python\r\nclass A:\r\n    def method(self):\r\n        print('A')\r\n\r\nclass B(A):\r\n    def method(self):\r\n        print('B')\r\n\r\nclass C(A):\r\n    def method(self):\r\n        print('C')\r\n\r\nclass D(B, C):\r\n    pass\r\n\r\nd = D()\r\nd.method()  # 'B' - 어떤 순서로?\r\n```\r\n\r\n**MRO (Method Resolution Order):**\r\nC3 선형화 알고리즘으로 결정\r\n\r\n```python\r\nD.__mro__\r\n# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)\r\n```\r\n\r\n**C3 규칙:**\r\n1. 자식 클래스가 부모보다 먼저\r\n2. 부모 클래스 순서 유지 (왼쪽 우선)\r\n3. 공통 부모는 마지막에\r\n\r\n**super() 사용:**\r\n```python\r\nclass B(A):\r\n    def method(self):\r\n        print('B')\r\n        super().method()  # MRO 다음 클래스 호출\r\n\r\nclass C(A):\r\n    def method(self):\r\n        print('C')\r\n        super().method()\r\n\r\nclass D(B, C):\r\n    def method(self):\r\n        print('D')\r\n        super().method()\r\n\r\nD().method()\r\n# D → B → C → A (MRO 순서)\r\n```\r\n\r\n**다이아몬드 문제 해결:**\r\n- C3 선형화로 명확한 순서 보장\r\n- super()로 협력적 상속",
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
    "answer": "**ABC (Abstract Base Class):**\r\n```python\r\nfrom abc import ABC, abstractmethod\r\n\r\nclass Shape(ABC):\r\n    @abstractmethod\r\n    def area(self):\r\n        pass\r\n\r\n    @abstractmethod\r\n    def perimeter(self):\r\n        pass\r\n\r\n    def describe(self):  # 일반 메서드 가능\r\n        return f'Area: {self.area()}'\r\n\r\n# 추상 메서드 미구현 시 인스턴스화 불가\r\nclass Circle(Shape):\r\n    def __init__(self, radius):\r\n        self.radius = radius\r\n\r\n    def area(self):\r\n        return 3.14 * self.radius ** 2\r\n\r\n    def perimeter(self):\r\n        return 2 * 3.14 * self.radius\r\n\r\nshape = Shape()   # TypeError: Can't instantiate\r\ncircle = Circle(5)  # OK\r\n```\r\n\r\n**추상 프로퍼티:**\r\n```python\r\nclass Shape(ABC):\r\n    @property\r\n    @abstractmethod\r\n    def name(self):\r\n        pass\r\n```\r\n\r\n**인터페이스 패턴 (Protocol - Python 3.8+):**\r\n```python\r\nfrom typing import Protocol\r\n\r\nclass Drawable(Protocol):\r\n    def draw(self) -> None: ...\r\n\r\nclass Circle:\r\n    def draw(self) -> None:\r\n        print('Drawing circle')\r\n\r\ndef render(shape: Drawable):\r\n    shape.draw()\r\n\r\nrender(Circle())  # 덕 타이핑, 명시적 상속 불필요\r\n```\r\n\r\n**ABC vs Protocol:**\r\n- ABC: 명시적 상속 필요, 런타임 검사\r\n- Protocol: 구조적 타이핑, 정적 타입 체크",
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
    "answer": "**Duck Typing:**\r\n\"오리처럼 걷고 오리처럼 꽥꽥거리면, 그것은 오리다\"\r\n\r\n객체의 타입보다 **행동(메서드/속성)**을 기준으로 판단\r\n\r\n```python\r\nclass Duck:\r\n    def quack(self):\r\n        print('Quack!')\r\n    def walk(self):\r\n        print('Walking')\r\n\r\nclass Person:\r\n    def quack(self):\r\n        print('I can quack too!')\r\n    def walk(self):\r\n        print('Walking like a person')\r\n\r\ndef make_quack(thing):\r\n    thing.quack()  # 타입 상관없이 quack 메서드만 있으면 됨\r\n\r\nmake_quack(Duck())    # Quack!\r\nmake_quack(Person())  # I can quack too!\r\n```\r\n\r\n**장점:**\r\n- 유연한 다형성\r\n- 명시적 상속 불필요\r\n- 테스트/목 객체 쉬움\r\n\r\n**EAFP vs LBYL:**\r\n```python\r\n# EAFP (Easier to Ask Forgiveness than Permission) - Pythonic\r\ntry:\r\n    thing.quack()\r\nexcept AttributeError:\r\n    print('Not a duck')\r\n\r\n# LBYL (Look Before You Leap)\r\nif hasattr(thing, 'quack'):\r\n    thing.quack()\r\n```\r\n\r\n**타입 힌트와 함께:**\r\n```python\r\nfrom typing import Protocol\r\n\r\nclass Quackable(Protocol):\r\n    def quack(self) -> None: ...\r\n\r\ndef make_quack(thing: Quackable):\r\n    thing.quack()\r\n```",
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
    "answer": "**타입 힌팅 (Python 3.5+):**\r\n```python\r\ndef greet(name: str) -> str:\r\n    return f'Hello, {name}'\r\n\r\nage: int = 25\r\nnames: list[str] = ['Alice', 'Bob']\r\n```\r\n\r\n**주요 타입:**\r\n```python\r\nfrom typing import List, Dict, Optional, Union, Callable, Any\r\n\r\n# 컬렉션 (Python 3.9+ 소문자 가능)\r\nitems: list[int] = [1, 2, 3]\r\nmapping: dict[str, int] = {'a': 1}\r\n\r\n# Optional (None 가능)\r\nname: Optional[str] = None\r\nname: str | None = None  # Python 3.10+\r\n\r\n# Union\r\nvalue: Union[int, str] = 1\r\nvalue: int | str = 1  # Python 3.10+\r\n\r\n# Callable\r\nfn: Callable[[int, int], int] = lambda a, b: a + b\r\n\r\n# 제네릭\r\nfrom typing import TypeVar, Generic\r\nT = TypeVar('T')\r\nclass Box(Generic[T]):\r\n    def __init__(self, item: T): ...\r\n```\r\n\r\n**mypy 사용:**\r\n```bash\r\npip install mypy\r\nmypy script.py\r\n```\r\n\r\n```python\r\ndef add(a: int, b: int) -> int:\r\n    return a + b\r\n\r\nadd('1', '2')  # mypy 오류: str 대신 int 필요\r\n```\r\n\r\n**주의:**\r\n- 런타임에 타입 검사 안 함 (힌트일 뿐)\r\n- 정적 분석 도구로 검사",
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
    "answer": "| 구분 | Threading | Multiprocessing | Asyncio |\r\n|------|-----------|-----------------|---------|\r\n| 단위 | 스레드 | 프로세스 | 코루틴 |\r\n| GIL 영향 | O | X (별도 프로세스) | O |\r\n| 메모리 | 공유 | 격리 | 공유 |\r\n| 적합 | I/O 바운드 | CPU 바운드 | I/O 바운드 |\r\n| 컨텍스트 스위칭 | OS | OS | 사용자 레벨 |\r\n\r\n**Threading:**\r\n```python\r\nimport threading\r\n\r\ndef task():\r\n    # I/O 작업 (네트워크, 파일)\r\n    pass\r\n\r\nthreads = [threading.Thread(target=task) for _ in range(10)]\r\nfor t in threads: t.start()\r\nfor t in threads: t.join()\r\n```\r\n\r\n**Multiprocessing:**\r\n```python\r\nfrom multiprocessing import Pool\r\n\r\ndef cpu_task(n):\r\n    return sum(range(n))\r\n\r\nwith Pool(4) as p:\r\n    results = p.map(cpu_task, [10**6] * 4)\r\n```\r\n\r\n**Asyncio:**\r\n```python\r\nimport asyncio\r\n\r\nasync def fetch(url):\r\n    async with aiohttp.ClientSession() as session:\r\n        async with session.get(url) as response:\r\n            return await response.text()\r\n\r\nasync def main():\r\n    tasks = [fetch(url) for url in urls]\r\n    results = await asyncio.gather(*tasks)\r\n\r\nasyncio.run(main())\r\n```\r\n\r\n**선택 기준:**\r\n- I/O + 간단함 → Threading\r\n- I/O + 대량 동시성 → Asyncio\r\n- CPU 집약적 → Multiprocessing",
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
    "answer": "**asyncio:**\r\n단일 스레드에서 동시성을 제공하는 비동기 I/O 프레임워크\r\n\r\n**핵심 개념:**\r\n```python\r\nimport asyncio\r\n\r\n# 코루틴 정의\r\nasync def fetch_data():\r\n    await asyncio.sleep(1)  # 비동기 대기\r\n    return 'data'\r\n\r\n# 실행\r\nasyncio.run(fetch_data())\r\n```\r\n\r\n**주요 함수:**\r\n```python\r\n# 여러 코루틴 동시 실행\r\nresults = await asyncio.gather(\r\n    fetch_data(),\r\n    fetch_data(),\r\n    fetch_data()\r\n)\r\n\r\n# 타임아웃\r\ntry:\r\n    await asyncio.wait_for(slow_task(), timeout=5.0)\r\nexcept asyncio.TimeoutError:\r\n    print('Timeout!')\r\n\r\n# 태스크 생성\r\ntask = asyncio.create_task(fetch_data())\r\n```\r\n\r\n**이벤트 루프:**\r\n```python\r\n# Python 3.7+\r\nasyncio.run(main())\r\n\r\n# 또는\r\nloop = asyncio.get_event_loop()\r\nloop.run_until_complete(main())\r\n```\r\n\r\n**async 컨텍스트 매니저:**\r\n```python\r\nasync with aiofiles.open('file.txt') as f:\r\n    content = await f.read()\r\n\r\nasync for item in async_generator():\r\n    process(item)\r\n```\r\n\r\n**주의:**\r\n- 블로킹 코드 사용 금지 (time.sleep X)\r\n- I/O 라이브러리도 async 버전 필요",
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
    "answer": "| 구분 | Python 2 | Python 3 |\r\n|------|----------|----------|\r\n| print | print \"hello\" | print(\"hello\") |\r\n| 나눗셈 | 5/2 = 2 (정수) | 5/2 = 2.5 (실수) |\r\n| 문자열 | str (바이트), unicode | str (유니코드), bytes |\r\n| range | range() → list | range() → iterator |\r\n| input | raw_input() | input() |\r\n| 예외 | except E, e: | except E as e: |\r\n\r\n**주요 차이:**\r\n\r\n**1. print 함수**\r\n```python\r\n# Python 2\r\nprint \"hello\"\r\nprint \"a\", \"b\"\r\n\r\n# Python 3\r\nprint(\"hello\")\r\nprint(\"a\", \"b\", sep=\", \", end=\"\\n\")\r\n```\r\n\r\n**2. 정수 나눗셈**\r\n```python\r\n# Python 2: 5/2 = 2\r\n# Python 3: 5/2 = 2.5, 5//2 = 2\r\n```\r\n\r\n**3. 유니코드**\r\n```python\r\n# Python 2\r\ns = u\"한글\"\r\nb = \"bytes\"\r\n\r\n# Python 3\r\ns = \"한글\"  # 기본 유니코드\r\nb = b\"bytes\"\r\n```\r\n\r\n**4. 반복자**\r\n```python\r\n# Python 2: range(), dict.keys() → list\r\n# Python 3: → iterator (메모리 효율)\r\n```\r\n\r\n**Python 2 EOL:**\r\n- 2020년 1월 1일 지원 종료\r\n- 신규 프로젝트는 Python 3 필수",
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
    "answer": "| 구분 | pip | pipenv | poetry |\r\n|------|-----|--------|--------|\r\n| 표준 | O | X | X |\r\n| 가상환경 | 별도 (venv) | 통합 | 통합 |\r\n| lock 파일 | X | Pipfile.lock | poetry.lock |\r\n| 의존성 해결 | 기본 | 향상 | 향상 |\r\n| 빌드/배포 | X | X | O |\r\n\r\n**pip:**\r\n```bash\r\npip install package\r\npip install -r requirements.txt\r\npip freeze > requirements.txt\r\n```\r\n- 기본 도구, 단순\r\n- lock 파일 없어 재현성 이슈\r\n\r\n**pipenv:**\r\n```bash\r\npipenv install package\r\npipenv shell  # 가상환경 활성화\r\npipenv lock   # lock 파일 생성\r\n```\r\n- Pipfile, Pipfile.lock 사용\r\n- 가상환경 자동 관리\r\n\r\n**poetry:**\r\n```bash\r\npoetry new project\r\npoetry add package\r\npoetry install\r\npoetry build  # 배포용 빌드\r\npoetry publish  # PyPI 배포\r\n```\r\n- pyproject.toml (PEP 518 표준)\r\n- 프로젝트 생성부터 배포까지\r\n- 현대적 도구로 인기 상승\r\n\r\n**선택 기준:**\r\n- 단순 스크립트 → pip + venv\r\n- 애플리케이션 → pipenv 또는 poetry\r\n- 라이브러리 배포 → poetry",
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
    "answer": "**필요한 이유:**\r\n\r\n1. **의존성 격리**\r\n   - 프로젝트마다 다른 버전의 패키지 사용 가능\r\n   - 프로젝트 A: Django 3.x, 프로젝트 B: Django 4.x\r\n\r\n2. **시스템 Python 보호**\r\n   - OS 시스템 Python과 분리\r\n   - 시스템 패키지 충돌 방지\r\n\r\n3. **재현 가능한 환경**\r\n   - 개발/프로덕션 환경 일치\r\n   - requirements.txt로 환경 공유\r\n\r\n**사용법:**\r\n```bash\r\n# venv (Python 3.3+ 내장)\r\npython -m venv myenv\r\nsource myenv/bin/activate  # Linux/Mac\r\nmyenv\\Scripts\\activate     # Windows\r\ndeactivate\r\n\r\n# virtualenv (더 많은 기능)\r\npip install virtualenv\r\nvirtualenv myenv\r\n```\r\n\r\n**venv vs virtualenv:**\r\n| 구분 | venv | virtualenv |\r\n|------|------|------------|\r\n| 설치 | 내장 | pip 설치 |\r\n| Python 버전 | 현재만 | 여러 버전 |\r\n| 속도 | 빠름 | 빠름 |\r\n\r\n**가상환경 위치:**\r\n```bash\r\n# 프로젝트 내\r\nproject/\r\n├── venv/\r\n├── src/\r\n└── requirements.txt\r\n\r\n# 또는 중앙 관리\r\n~/.virtualenvs/project_env\r\n```",
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
    "answer": "**import 방식:**\r\n```python\r\n# 모듈 전체\r\nimport math\r\nmath.sqrt(4)\r\n\r\n# 특정 항목\r\nfrom math import sqrt, pi\r\nsqrt(4)\r\n\r\n# 별칭\r\nimport numpy as np\r\nfrom datetime import datetime as dt\r\n\r\n# 모든 항목 (권장하지 않음)\r\nfrom math import *\r\n```\r\n\r\n**모듈 검색 순서:**\r\n1. 현재 디렉토리\r\n2. PYTHONPATH 환경변수\r\n3. 설치된 패키지 (site-packages)\r\n4. 표준 라이브러리\r\n\r\n**패키지 구조:**\r\n```\r\nmypackage/\r\n├── __init__.py\r\n├── module1.py\r\n├── module2.py\r\n└── subpackage/\r\n    ├── __init__.py\r\n    └── module3.py\r\n```\r\n\r\n**__init__.py 역할:**\r\n\r\n1. **패키지 표시** (Python 3.3+ namespace packages로 선택적)\r\n\r\n2. **패키지 초기화 코드**\r\n```python\r\n# mypackage/__init__.py\r\nprint('패키지 로드됨')\r\n```\r\n\r\n3. **공개 API 정의**\r\n```python\r\n# __init__.py\r\nfrom .module1 import func1\r\nfrom .module2 import Class2\r\n\r\n__all__ = ['func1', 'Class2']  # from package import * 제어\r\n```\r\n\r\n4. **하위 모듈 자동 import**\r\n```python\r\n# __init__.py\r\nfrom . import module1, module2\r\n```",
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
    "answer": "**1. 프로파일링 먼저**\r\n```python\r\nimport cProfile\r\ncProfile.run('main()')\r\n\r\n# line_profiler, memory_profiler\r\n```\r\n\r\n**2. 내장 함수/라이브러리 활용**\r\n```python\r\n# Bad\r\nresult = []\r\nfor i in items:\r\n    result.append(i * 2)\r\n\r\n# Good\r\nresult = list(map(lambda x: x * 2, items))\r\nresult = [i * 2 for i in items]\r\n```\r\n\r\n**3. 적절한 자료구조**\r\n```python\r\n# 멤버십 체크: list O(n) vs set O(1)\r\nitems_set = set(items)\r\nif item in items_set:\r\n    pass\r\n\r\n# dict/set 활용\r\n```\r\n\r\n**4. 제너레이터 사용**\r\n```python\r\n# 메모리 절약\r\n(x**2 for x in range(1000000))\r\n```\r\n\r\n**5. C 확장 라이브러리**\r\n```python\r\nimport numpy as np  # 벡터화 연산\r\n# Cython, Numba (JIT)\r\n```\r\n\r\n**6. 멀티프로세싱 (CPU 바운드)**\r\n```python\r\nfrom multiprocessing import Pool\r\n```\r\n\r\n**7. asyncio (I/O 바운드)**\r\n```python\r\nimport asyncio\r\n```\r\n\r\n**8. 기타**\r\n- `__slots__`: 메모리 최적화\r\n- functools.lru_cache: 메모이제이션\r\n- PyPy: 대안 인터프리터\r\n\r\n```python\r\nfrom functools import lru_cache\r\n\r\n@lru_cache(maxsize=128)\r\ndef fibonacci(n):\r\n    if n < 2: return n\r\n    return fibonacci(n-1) + fibonacci(n-2)\r\n```",
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
    "answer": "**특징:**\r\n- 정적 타입, 컴파일 언어\r\n- 간결한 문법 (키워드 25개)\r\n- 내장 동시성 (goroutine, channel)\r\n- 빠른 컴파일\r\n- 단일 바이너리 배포\r\n- 가비지 컬렉션\r\n\r\n**장점:**\r\n1. **동시성**: goroutine이 가볍고 효율적\r\n2. **성능**: C에 근접한 실행 속도\r\n3. **단순함**: 학습 곡선 낮음, 코드 일관성\r\n4. **빠른 빌드**: 대규모 프로젝트도 빠름\r\n5. **도구 통합**: go fmt, go test, go mod 내장\r\n6. **크로스 컴파일**: 쉬운 멀티 플랫폼 빌드\r\n\r\n**단점:**\r\n1. **제네릭**: Go 1.18에서 추가되었으나 제한적\r\n2. **에러 처리**: if err != nil 반복\r\n3. **의존성 주입**: 프레임워크 지원 부족\r\n4. **함수형**: map, filter 등 내장 없음\r\n5. **GUI**: 네이티브 지원 없음\r\n\r\n**사용 사례:**\r\n- 마이크로서비스 (Docker, Kubernetes)\r\n- CLI 도구 (Terraform, Hugo)\r\n- 네트워크 서버\r\n- DevOps 도구",
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
    "answer": "| 구분 | Goroutine | OS Thread |\r\n|------|-----------|-----------|\r\n| 메모리 | ~2KB 스택 | ~1MB 스택 |\r\n| 생성 비용 | 매우 낮음 | 높음 |\r\n| 스케줄링 | Go 런타임 | OS 커널 |\r\n| 컨텍스트 스위칭 | 빠름 | 느림 |\r\n| 개수 | 수십만 가능 | 수천 제한적 |\r\n\r\n**Goroutine 사용:**\r\n```go\r\nfunc main() {\r\n    go sayHello()  // 새 goroutine 시작\r\n    go func() {    // 익명 함수\r\n        fmt.Println(\"Anonymous\")\r\n    }()\r\n    time.Sleep(time.Second)\r\n}\r\n\r\nfunc sayHello() {\r\n    fmt.Println(\"Hello\")\r\n}\r\n```\r\n\r\n**M:N 스케줄링:**\r\n- M개의 goroutine을 N개의 OS 스레드에 매핑\r\n- GOMAXPROCS로 사용할 OS 스레드 수 설정\r\n\r\n**Go 스케줄러 (GMP):**\r\n- G: Goroutine\r\n- M: Machine (OS Thread)\r\n- P: Processor (논리적 프로세서)\r\n\r\n**장점:**\r\n- 가벼움: 수십만 동시 실행 가능\r\n- 간단: `go` 키워드만으로 생성\r\n- 효율적: 블로킹 I/O 시 자동으로 다른 goroutine 실행\r\n\r\n**주의:**\r\n- main 종료 시 모든 goroutine 종료\r\n- sync.WaitGroup으로 대기",
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
    "answer": "**Channel:**\r\ngoroutine 간 통신을 위한 타입 안전한 파이프\r\n\r\n**생성과 사용:**\r\n```go\r\n// 생성\r\nch := make(chan int)        // unbuffered\r\nch := make(chan int, 10)    // buffered (용량 10)\r\n\r\n// 송신\r\nch <- 42\r\n\r\n// 수신\r\nvalue := <-ch\r\nvalue, ok := <-ch  // ok: 채널 닫힘 여부\r\n\r\n// 닫기\r\nclose(ch)\r\n```\r\n\r\n**Unbuffered vs Buffered:**\r\n| 구분 | Unbuffered | Buffered |\r\n|------|------------|----------|\r\n| 생성 | make(chan T) | make(chan T, n) |\r\n| 송신 | 수신자 대기까지 블로킹 | 버퍼 찰 때까지 비블로킹 |\r\n| 동기화 | 동기식 | 비동기식 |\r\n\r\n**패턴:**\r\n```go\r\n// 범위 순회\r\nfor value := range ch {\r\n    fmt.Println(value)\r\n}\r\n\r\n// 방향 제한\r\nfunc send(ch chan<- int) { ch <- 1 }  // 송신 전용\r\nfunc recv(ch <-chan int) { <-ch }     // 수신 전용\r\n```\r\n\r\n**Worker Pool:**\r\n```go\r\njobs := make(chan int, 100)\r\nresults := make(chan int, 100)\r\n\r\n// 워커 시작\r\nfor w := 0; w < 3; w++ {\r\n    go worker(jobs, results)\r\n}\r\n\r\n// 작업 전송\r\nfor j := 0; j < 5; j++ {\r\n    jobs <- j\r\n}\r\nclose(jobs)\r\n```",
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
    "answer": "**select:**\r\n여러 채널 연산을 동시에 대기하는 제어 구조\r\n\r\n```go\r\nselect {\r\ncase msg1 := <-ch1:\r\n    fmt.Println(\"From ch1:\", msg1)\r\ncase msg2 := <-ch2:\r\n    fmt.Println(\"From ch2:\", msg2)\r\ncase ch3 <- \"hello\":\r\n    fmt.Println(\"Sent to ch3\")\r\ndefault:\r\n    fmt.Println(\"No channel ready\")\r\n}\r\n```\r\n\r\n**동작 원리:**\r\n1. 모든 case의 채널 연산 확인\r\n2. 준비된 case가 있으면 하나 **무작위** 선택 실행\r\n3. 준비된 case 없으면 default 실행 (있을 경우)\r\n4. default 없으면 하나가 준비될 때까지 블로킹\r\n\r\n**활용 패턴:**\r\n\r\n**1. 타임아웃:**\r\n```go\r\nselect {\r\ncase result := <-ch:\r\n    fmt.Println(result)\r\ncase <-time.After(time.Second):\r\n    fmt.Println(\"Timeout!\")\r\n}\r\n```\r\n\r\n**2. 취소 (Context):**\r\n```go\r\nselect {\r\ncase result := <-ch:\r\n    return result\r\ncase <-ctx.Done():\r\n    return ctx.Err()\r\n}\r\n```\r\n\r\n**3. 논블로킹 연산:**\r\n```go\r\nselect {\r\ncase msg := <-ch:\r\n    fmt.Println(msg)\r\ndefault:\r\n    fmt.Println(\"No message\")\r\n}\r\n```\r\n\r\n**4. 무한 루프:**\r\n```go\r\nfor {\r\n    select {\r\n    case msg := <-ch:\r\n        process(msg)\r\n    case <-quit:\r\n        return\r\n    }\r\n}\r\n```",
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
    "answer": "**인터페이스:**\r\n메서드 시그니처의 집합. **암시적 구현** (implements 키워드 없음)\r\n\r\n```go\r\ntype Reader interface {\r\n    Read(p []byte) (n int, err error)\r\n}\r\n\r\ntype MyReader struct{}\r\n\r\n// Reader 인터페이스 자동 구현\r\nfunc (r MyReader) Read(p []byte) (n int, err error) {\r\n    return 0, nil\r\n}\r\n\r\nvar r Reader = MyReader{}  // OK\r\n```\r\n\r\n**빈 인터페이스:**\r\n```go\r\nvar any interface{}  // 모든 타입 할당 가능\r\nany = 42\r\nany = \"hello\"\r\n\r\n// Go 1.18+\r\nvar any any\r\n```\r\n\r\n**타입 단언:**\r\n```go\r\nvalue := any.(string)        // 실패 시 panic\r\nvalue, ok := any.(string)    // 안전한 방법\r\n```\r\n\r\n**타입 스위치:**\r\n```go\r\nswitch v := any.(type) {\r\ncase int:\r\n    fmt.Println(\"int:\", v)\r\ncase string:\r\n    fmt.Println(\"string:\", v)\r\ndefault:\r\n    fmt.Println(\"unknown\")\r\n}\r\n```\r\n\r\n**인터페이스 합성:**\r\n```go\r\ntype ReadWriter interface {\r\n    Reader\r\n    Writer\r\n}\r\n```\r\n\r\n**특징:**\r\n- 덕 타이핑의 정적 버전\r\n- 작은 인터페이스 선호 (io.Reader, io.Writer)\r\n- nil 인터페이스 주의",
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
    "answer": "**값 타입:**\r\n변수가 실제 값을 직접 저장. 할당/전달 시 복사\r\n\r\n```go\r\ntype Point struct { X, Y int }\r\n\r\np1 := Point{1, 2}\r\np2 := p1        // 복사\r\np2.X = 100\r\nfmt.Println(p1.X)  // 1 (변경 안 됨)\r\n```\r\n\r\n**포인터 타입:**\r\n메모리 주소를 저장. 간접 참조\r\n\r\n```go\r\np1 := &Point{1, 2}\r\np2 := p1        // 같은 주소\r\np2.X = 100\r\nfmt.Println(p1.X)  // 100 (변경됨)\r\n```\r\n\r\n**함수 인자:**\r\n```go\r\n// 값 전달 - 복사\r\nfunc modify(p Point) {\r\n    p.X = 100  // 원본 영향 없음\r\n}\r\n\r\n// 포인터 전달 - 원본 수정\r\nfunc modifyPtr(p *Point) {\r\n    p.X = 100  // 원본 변경\r\n}\r\n```\r\n\r\n**메서드 수신자:**\r\n```go\r\n// 값 수신자 - 복사본에서 동작\r\nfunc (p Point) Distance() float64 { }\r\n\r\n// 포인터 수신자 - 원본 수정 가능\r\nfunc (p *Point) Scale(factor int) {\r\n    p.X *= factor\r\n    p.Y *= factor\r\n}\r\n```\r\n\r\n**포인터 사용 시점:**\r\n- 구조체 크기가 클 때 (복사 비용)\r\n- 원본 수정이 필요할 때\r\n- nil 상태가 의미 있을 때\r\n\r\n**주의:**\r\n- Go는 포인터 연산 없음 (안전)\r\n- nil 포인터 역참조 시 panic",
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
    "answer": "| 구분 | Array | Slice |\r\n|------|-------|-------|\r\n| 크기 | 고정 (타입 일부) | 가변 |\r\n| 타입 | [5]int != [10]int | []int |\r\n| 값/참조 | 값 타입 (복사) | 참조 타입 |\r\n| 전달 | 전체 복사 | 헤더만 복사 |\r\n\r\n**배열:**\r\n```go\r\nvar arr [5]int           // 0으로 초기화\r\narr := [5]int{1, 2, 3}   // 부분 초기화\r\narr := [...]int{1, 2, 3} // 길이 추론\r\n```\r\n\r\n**슬라이스:**\r\n```go\r\nvar s []int              // nil 슬라이스 (ptr=nil, len=0, cap=0)\r\ns := make([]int, 5)      // len=5, cap=5\r\ns := make([]int, 5, 10)  // len=5, cap=10\r\ns := []int{1, 2, 3}      // 리터럴\r\ns := []int{}             // 빈 슬라이스 (ptr!=nil, len=0, cap=0)\r\n\r\n// 배열에서 생성\r\narr := [5]int{1, 2, 3, 4, 5}\r\ns := arr[1:4]  // [2, 3, 4]\r\n```\r\n\r\n**nil vs 빈 슬라이스:**\r\n```go\r\nvar nilSlice []int       // nil (s == nil: true)\r\nemptySlice := []int{}    // 비어있지만 nil 아님 (s == nil: false)\r\n// 둘 다 len=0, 동작은 동일 (append, range 가능)\r\n// JSON 마샬링 시: nil→null, 빈 슬라이스→[]\r\n```\r\n\r\n**슬라이스 내부 구조:**\r\n```go\r\n// 3개 필드\r\n// ptr: 기반 배열 포인터\r\n// len: 길이\r\n// cap: 용량\r\n```\r\n\r\n**주요 연산:**\r\n```go\r\ns = append(s, 4, 5)      // 추가 (cap 초과 시 재할당)\r\ncopy(dst, src)           // 복사\r\nlen(s), cap(s)           // 길이, 용량\r\n```\r\n\r\n**주의:**\r\n```go\r\n// 기반 배열 공유\r\ns1 := arr[:]\r\ns2 := s1[1:3]\r\ns2[0] = 100  // s1, arr도 변경됨\r\n```",
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
    "answer": "**Map:**\r\n해시 테이블 기반 키-값 저장소\r\n\r\n**사용법:**\r\n```go\r\n// 생성\r\nm := make(map[string]int)\r\nm := map[string]int{\"a\": 1, \"b\": 2}\r\n\r\n// CRUD\r\nm[\"key\"] = 100              // 삽입/수정\r\nvalue := m[\"key\"]           // 조회\r\nvalue, ok := m[\"key\"]       // 존재 여부\r\ndelete(m, \"key\")            // 삭제\r\n\r\n// 순회 (순서 무작위)\r\nfor key, value := range m {\r\n    fmt.Println(key, value)\r\n}\r\n```\r\n\r\n**내부 구조 (hmap):**\r\n- 버킷 배열 (각 버킷 8개 키-값)\r\n- 오버플로우 버킷 (체이닝)\r\n- 로드 팩터 초과 시 확장\r\n\r\n**특징:**\r\n- 참조 타입 (포인터처럼 동작)\r\n- nil map에 쓰기 시 panic\r\n- 동시 읽기 안전, 동시 쓰기 불안전\r\n- 순회 순서 비결정적\r\n\r\n**동시성:**\r\n```go\r\n// 안전하지 않음\r\n// map[key] = value (동시 접근 시 panic)\r\n\r\n// sync.Map 사용\r\nvar m sync.Map\r\nm.Store(\"key\", \"value\")\r\nvalue, _ := m.Load(\"key\")\r\n\r\n// 또는 sync.RWMutex\r\ntype SafeMap struct {\r\n    sync.RWMutex\r\n    m map[string]int\r\n}\r\n```",
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
    "answer": "**defer:**\r\n함수 종료 시 실행되는 지연 호출 (LIFO 순서)\r\n\r\n```go\r\nfunc example() {\r\n    defer fmt.Println(\"1\")\r\n    defer fmt.Println(\"2\")\r\n    fmt.Println(\"3\")\r\n}\r\n// 출력: 3 → 2 → 1\r\n\r\n// 리소스 정리\r\nfunc readFile() {\r\n    f, _ := os.Open(\"file.txt\")\r\n    defer f.Close()  // 함수 종료 시 자동 닫힘\r\n    // 파일 처리\r\n}\r\n```\r\n\r\n**panic:**\r\n런타임 오류, 프로그램 비정상 종료\r\n\r\n```go\r\nfunc divide(a, b int) int {\r\n    if b == 0 {\r\n        panic(\"division by zero\")\r\n    }\r\n    return a / b\r\n}\r\n```\r\n\r\n**recover:**\r\npanic을 잡아서 복구 (defer 내에서만 유효)\r\n\r\n```go\r\nfunc safeCall() {\r\n    defer func() {\r\n        if r := recover(); r != nil {\r\n            fmt.Println(\"Recovered:\", r)\r\n        }\r\n    }()\r\n    panic(\"something bad\")\r\n}\r\n// 출력: Recovered: something bad (프로그램 계속)\r\n```\r\n\r\n**패턴:**\r\n```go\r\n// 락 해제\r\nfunc doSomething() {\r\n    mu.Lock()\r\n    defer mu.Unlock()\r\n    // 작업\r\n}\r\n\r\n// 타이밍\r\nfunc timed() {\r\n    defer timeTrack(time.Now())\r\n    // 작업\r\n}\r\n```\r\n\r\n**주의:**\r\n- defer 인자는 즉시 평가\r\n- 루프 내 defer 주의 (축적됨)\r\n- panic은 예외적 상황에만 사용",
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
    "answer": "**Go 에러 처리:**\r\nerror 인터페이스 반환, 명시적 처리\r\n\r\n```go\r\nfunc divide(a, b int) (int, error) {\r\n    if b == 0 {\r\n        return 0, errors.New(\"division by zero\")\r\n    }\r\n    return a / b, nil\r\n}\r\n\r\nresult, err := divide(10, 0)\r\nif err != nil {\r\n    log.Fatal(err)\r\n}\r\n```\r\n\r\n**에러 생성:**\r\n```go\r\n// 기본\r\nerrors.New(\"error message\")\r\n\r\n// 포맷\r\nfmt.Errorf(\"failed: %w\", err)  // 래핑 (%w)\r\n\r\n// 커스텀 에러\r\ntype MyError struct {\r\n    Code    int\r\n    Message string\r\n}\r\nfunc (e *MyError) Error() string {\r\n    return e.Message\r\n}\r\n```\r\n\r\n**에러 래핑/언래핑 (Go 1.13+):**\r\n```go\r\nwrapped := fmt.Errorf(\"context: %w\", originalErr)\r\n\r\n// 언래핑\r\nerrors.Unwrap(wrapped)\r\n\r\n// 타입 확인\r\nvar myErr *MyError\r\nif errors.As(err, &myErr) {\r\n    fmt.Println(myErr.Code)\r\n}\r\n\r\n// 값 비교\r\nif errors.Is(err, ErrNotFound) {\r\n    // 처리\r\n}\r\n```\r\n\r\n**모범 사례:**\r\n- 에러 즉시 처리 또는 반환\r\n- 컨텍스트 추가하여 래핑\r\n- 센티널 에러: `var ErrNotFound = errors.New(\"not found\")`\r\n- panic 대신 error 반환",
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
    "answer": "**Context:**\r\n요청 범위 데이터, 취소 신호, 타임아웃을 전달하는 표준 방법\r\n\r\n**주요 용도:**\r\n1. 요청 취소 전파\r\n2. 타임아웃/데드라인 설정\r\n3. 요청 범위 값 전달\r\n\r\n**생성:**\r\n```go\r\n// 기본 (부모 없음)\r\nctx := context.Background()\r\nctx := context.TODO()  // 임시\r\n\r\n// 취소 가능\r\nctx, cancel := context.WithCancel(parentCtx)\r\ndefer cancel()\r\n\r\n// 타임아웃\r\nctx, cancel := context.WithTimeout(parentCtx, 5*time.Second)\r\ndefer cancel()\r\n\r\n// 데드라인\r\nctx, cancel := context.WithDeadline(parentCtx, time.Now().Add(time.Hour))\r\n\r\n// 값 전달\r\nctx := context.WithValue(parentCtx, \"userID\", 123)\r\n```\r\n\r\n**사용:**\r\n```go\r\nfunc doWork(ctx context.Context) error {\r\n    select {\r\n    case <-ctx.Done():\r\n        return ctx.Err()  // Canceled 또는 DeadlineExceeded\r\n    case result := <-work():\r\n        return nil\r\n    }\r\n}\r\n\r\n// 값 가져오기\r\nuserID := ctx.Value(\"userID\").(int)\r\n```\r\n\r\n**모범 사례:**\r\n- 함수 첫 번째 인자로 전달\r\n- nil context 전달 금지\r\n- context에 비즈니스 로직 데이터 넣지 않기\r\n- 항상 cancel 호출 (리소스 누수 방지)",
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
    "answer": "**1. Mutex (상호 배제)**\r\n```go\r\nvar mu sync.Mutex\r\n\r\nmu.Lock()\r\n// 임계 영역\r\nmu.Unlock()\r\n\r\n// 권장 패턴\r\nmu.Lock()\r\ndefer mu.Unlock()\r\n```\r\n\r\n**2. RWMutex (읽기-쓰기 락)**\r\n```go\r\nvar rwmu sync.RWMutex\r\n\r\nrwmu.RLock()   // 읽기 락 (동시 읽기 가능)\r\ndefer rwmu.RUnlock()\r\n\r\nrwmu.Lock()    // 쓰기 락 (배타적)\r\ndefer rwmu.Unlock()\r\n```\r\n\r\n**3. WaitGroup (고루틴 대기)**\r\n```go\r\nvar wg sync.WaitGroup\r\n\r\nfor i := 0; i < 5; i++ {\r\n    wg.Add(1)\r\n    go func() {\r\n        defer wg.Done()\r\n        // 작업\r\n    }()\r\n}\r\nwg.Wait()  // 모든 고루틴 완료 대기\r\n```\r\n\r\n**4. Once (한 번만 실행)**\r\n```go\r\nvar once sync.Once\r\nvar instance *Singleton\r\n\r\nfunc GetInstance() *Singleton {\r\n    once.Do(func() {\r\n        instance = &Singleton{}\r\n    })\r\n    return instance\r\n}\r\n```\r\n\r\n**5. Cond (조건 변수)**\r\n```go\r\nvar cond = sync.NewCond(&sync.Mutex{})\r\n\r\ncond.L.Lock()\r\nfor !condition {\r\n    cond.Wait()\r\n}\r\ncond.L.Unlock()\r\n\r\ncond.Signal()    // 하나 깨움\r\ncond.Broadcast() // 모두 깨움\r\n```\r\n\r\n**6. Pool (객체 풀)**\r\n```go\r\nvar pool = sync.Pool{\r\n    New: func() interface{} {\r\n        return new(Buffer)\r\n    },\r\n}\r\nbuf := pool.Get().(*Buffer)\r\npool.Put(buf)\r\n```",
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
    "answer": "**Go GC:**\r\nConcurrent, Tri-color Mark-and-Sweep\r\n\r\n**삼색 마킹 알고리즘:**\r\n1. **흰색**: 아직 방문 안 함 (수거 대상 후보)\r\n2. **회색**: 방문했지만 참조 확인 중\r\n3. **검은색**: 방문 완료, 유지\r\n\r\n**동작 과정:**\r\n1. STW(Stop-The-World): 짧은 일시 정지, 루트셋 스캔\r\n2. Mark (concurrent): 회색 객체 처리, 검은색으로 변경\r\n3. STW: 마킹 종료 확인\r\n4. Sweep (concurrent): 흰색 객체 수거\r\n\r\n**특징:**\r\n- **낮은 지연**: 대부분 동시 실행, STW 최소화\r\n- **쓰기 배리어**: 동시 마킹 중 참조 변경 추적\r\n- **페이싱**: 힙 크기 기반 GC 주기 조절\r\n\r\n**튜닝:**\r\n```go\r\n// GOGC: 힙 증가율 (기본 100%)\r\n// 100 = 힙이 2배 되면 GC\r\nGOGC=200  // 덜 자주, 더 많은 메모리\r\n\r\n// 메모리 제한 (Go 1.19+)\r\nGOMEMLIMIT=1GiB\r\n\r\n// 런타임 통계\r\nruntime.GC()           // 수동 GC\r\nruntime.ReadMemStats() // 메모리 통계\r\n```\r\n\r\n**최적화 팁:**\r\n- 불필요한 할당 줄이기\r\n- sync.Pool 활용\r\n- 포인터 사용 최소화",
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
    "answer": "**빌드 과정:**\r\n```\r\n소스 → 파싱 → AST → 타입체크 → SSA → 기계어 → 링크 → 실행파일\r\n```\r\n\r\n**기본 명령:**\r\n```bash\r\ngo build           # 현재 패키지 빌드\r\ngo build -o app    # 출력 파일명 지정\r\ngo run main.go     # 빌드 + 실행\r\ngo install         # 빌드 + $GOPATH/bin에 설치\r\n```\r\n\r\n**크로스 컴파일:**\r\n```bash\r\n# Linux 바이너리 (Windows에서)\r\nGOOS=linux GOARCH=amd64 go build\r\n\r\n# 주요 조합\r\n# GOOS: linux, darwin, windows\r\n# GOARCH: amd64, arm64, 386\r\n```\r\n\r\n**빌드 옵션:**\r\n```bash\r\n# 디버그 정보 제거 (크기 감소)\r\ngo build -ldflags=\"-s -w\"\r\n\r\n# 빌드 태그\r\ngo build -tags production\r\n\r\n// +build production\r\n// 또는 Go 1.17+\r\n//go:build production\r\n```\r\n\r\n**빌드 모드:**\r\n```bash\r\ngo build -buildmode=exe      # 기본\r\ngo build -buildmode=c-shared # 공유 라이브러리\r\ngo build -buildmode=plugin   # 플러그인\r\n```\r\n\r\n**특징:**\r\n- 빠른 컴파일 (의존성 분석 효율적)\r\n- 정적 링크 기본 (단일 바이너리)\r\n- CGO: C 코드 연동 가능",
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
    "answer": "**Go Modules (Go 1.11+):**\r\n공식 의존성 관리 시스템\r\n\r\n**초기화:**\r\n```bash\r\ngo mod init github.com/user/project\r\n# go.mod 파일 생성\r\n```\r\n\r\n**go.mod:**\r\n```go\r\nmodule github.com/user/project\r\n\r\ngo 1.21\r\n\r\nrequire (\r\n    github.com/gin-gonic/gin v1.9.1\r\n    golang.org/x/sync v0.3.0\r\n)\r\n```\r\n\r\n**주요 명령:**\r\n```bash\r\ngo mod tidy      # 의존성 정리 (추가/제거)\r\ngo mod download  # 의존성 다운로드\r\ngo mod verify    # 체크섬 검증\r\ngo mod vendor    # vendor 디렉토리 생성\r\ngo mod graph     # 의존성 그래프\r\n```\r\n\r\n**go.sum:**\r\n- 체크섬 파일 (보안, 재현성)\r\n- 버전 커밋에 포함해야 함\r\n\r\n**버전 관리:**\r\n```bash\r\ngo get package@v1.2.3    # 특정 버전\r\ngo get package@latest    # 최신\r\ngo get -u package        # 업데이트\r\n```\r\n\r\n**Semantic Versioning:**\r\n- v1.2.3 (major.minor.patch)\r\n- v2+ 는 모듈 경로에 버전 포함: `module github.com/user/pkg/v2`\r\n\r\n**replace/exclude:**\r\n```go\r\n// go.mod\r\nreplace github.com/old => github.com/new v1.0.0\r\nexclude github.com/pkg v1.2.3\r\n```",
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
    "answer": "**1. 캡슐화 (Encapsulation)**\r\n- 데이터와 메서드를 하나로 묶음\r\n- 내부 구현 숨김 (정보 은닉)\r\n- 접근 제어자로 보호\r\n\r\n```java\r\nclass Account {\r\n    private int balance;  // 숨김\r\n    public void deposit(int amount) {\r\n        if (amount > 0) balance += amount;\r\n    }\r\n}\r\n```\r\n\r\n**2. 상속 (Inheritance)**\r\n- 기존 클래스를 확장하여 새 클래스 생성\r\n- 코드 재사용, 계층 구조\r\n\r\n```java\r\nclass Animal { void eat() {} }\r\nclass Dog extends Animal { void bark() {} }\r\n```\r\n\r\n**3. 다형성 (Polymorphism)**\r\n- 같은 인터페이스, 다른 동작\r\n- 오버라이딩, 오버로딩\r\n\r\n```java\r\nAnimal animal = new Dog();  // 업캐스팅\r\nanimal.eat();  // Dog의 eat() 실행\r\n```\r\n\r\n**4. 추상화 (Abstraction)**\r\n- 복잡한 시스템에서 핵심만 추출\r\n- 인터페이스/추상 클래스로 구현\r\n\r\n```java\r\ninterface Vehicle {\r\n    void start();\r\n    void stop();\r\n}\r\n```\r\n\r\n**관계:**\r\n- 캡슐화 → 구현 숨김\r\n- 상속 → 코드 재사용\r\n- 다형성 → 유연한 설계\r\n- 추상화 → 복잡도 관리",
    "references": []
  },
  {
    "id": "LANG-002",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "SOLID 원칙에 대해 설명해주세요.",
    "answer": "**S - 단일 책임 원칙 (Single Responsibility)**\r\n- 클래스는 하나의 책임만 가져야 함\r\n- 변경 이유가 하나여야 함\r\n\r\n```java\r\n// Bad: User가 저장, 알림 모두 담당\r\n// Good: UserRepository, NotificationService 분리\r\n```\r\n\r\n**O - 개방-폐쇄 원칙 (Open-Closed)**\r\n- 확장에는 열려있고, 수정에는 닫혀있어야 함\r\n- 기존 코드 수정 없이 기능 추가\r\n\r\n```java\r\n// 인터페이스로 확장\r\ninterface Payment { void pay(); }\r\nclass CardPayment implements Payment {}\r\nclass CryptoPayment implements Payment {}  // 새 결제 추가\r\n```\r\n\r\n**L - 리스코프 치환 원칙 (Liskov Substitution)**\r\n- 하위 타입은 상위 타입을 대체할 수 있어야 함\r\n- 상속 시 계약 위반 금지\r\n\r\n**I - 인터페이스 분리 원칙 (Interface Segregation)**\r\n- 클라이언트가 사용하지 않는 메서드에 의존하지 않아야 함\r\n- 작은 인터페이스로 분리\r\n\r\n```java\r\n// Bad: IWorker { work(); eat(); }\r\n// Good: IWorkable { work(); }, IFeedable { eat(); }\r\n```\r\n\r\n**D - 의존성 역전 원칙 (Dependency Inversion)**\r\n- 고수준 모듈이 저수준 모듈에 의존하지 않음\r\n- 추상화에 의존\r\n\r\n```java\r\nclass OrderService {\r\n    private final PaymentGateway gateway;  // 인터페이스에 의존\r\n}\r\n```",
    "references": []
  },
  {
    "id": "LANG-003",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "함수형 프로그래밍의 특징과 장점은 무엇인가요?",
    "answer": "**핵심 개념:**\r\n\r\n**1. 순수 함수 (Pure Function)**\r\n- 같은 입력 → 같은 출력\r\n- 부작용 없음\r\n\r\n**2. 불변성 (Immutability)**\r\n- 데이터 변경 대신 새 데이터 생성\r\n\r\n**3. 일급 함수 (First-class Function)**\r\n- 함수를 값으로 취급 (변수 할당, 인자 전달, 반환)\r\n\r\n**4. 고차 함수 (Higher-order Function)**\r\n- 함수를 인자로 받거나 반환하는 함수 (map, filter, reduce)\r\n\r\n**5. 선언적 프로그래밍**\r\n- \"무엇을\" 할지 기술 (vs 명령형: \"어떻게\")\r\n\r\n**장점:**\r\n1. **테스트 용이**: 순수 함수는 격리 테스트 쉬움\r\n2. **동시성 안전**: 불변 데이터, 공유 상태 없음\r\n3. **예측 가능성**: 부작용 없어 디버깅 쉬움\r\n4. **재사용성**: 작은 함수 조합\r\n5. **지연 평가**: 필요할 때만 계산\r\n\r\n**예시:**\r\n```javascript\r\n// 명령형\r\nlet sum = 0;\r\nfor (let i of numbers) sum += i;\r\n\r\n// 함수형\r\nconst sum = numbers.reduce((a, b) => a + b, 0);\r\n```",
    "references": []
  },
  {
    "id": "LANG-004",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "순수 함수(Pure Function)란 무엇인가요?",
    "answer": "**순수 함수의 조건:**\r\n\r\n**1. 결정론적 (Deterministic)**\r\n- 같은 입력 → 항상 같은 출력\r\n\r\n```javascript\r\n// 순수\r\nfunction add(a, b) {\r\n    return a + b;\r\n}\r\n\r\n// 비순수 (외부 상태에 의존)\r\nlet factor = 2;\r\nfunction multiply(x) {\r\n    return x * factor;  // factor 변경 시 결과 다름\r\n}\r\n```\r\n\r\n**2. 부작용 없음 (No Side Effects)**\r\n- 외부 상태 변경 없음\r\n- I/O 없음 (콘솔, 파일, 네트워크)\r\n\r\n```javascript\r\n// 비순수 (부작용 있음)\r\nfunction addAndLog(a, b) {\r\n    console.log(a + b);  // I/O\r\n    return a + b;\r\n}\r\n\r\nlet total = 0;\r\nfunction addToTotal(x) {\r\n    total += x;  // 외부 상태 변경\r\n    return total;\r\n}\r\n```\r\n\r\n**장점:**\r\n- 테스트 용이 (Mock 불필요)\r\n- 캐싱/메모이제이션 가능\r\n- 병렬 실행 안전\r\n- 리팩토링 안전\r\n\r\n**순수 함수 예:**\r\n```javascript\r\nconst double = x => x * 2;\r\nconst filter = (arr, fn) => arr.filter(fn);\r\nconst map = (arr, fn) => arr.map(fn);\r\n```",
    "references": []
  },
  {
    "id": "LANG-005",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "불변성(Immutability)의 중요성과 구현 방법은 무엇인가요?",
    "answer": "**불변성:**\r\n생성 후 상태를 변경할 수 없는 특성\r\n\r\n**중요성:**\r\n1. **동시성 안전**: 공유 상태 변경 없음\r\n2. **예측 가능**: 값이 변하지 않아 추적 쉬움\r\n3. **변경 감지**: 참조 비교로 빠른 변경 확인 (React)\r\n4. **히스토리/되돌리기**: 이전 상태 보존\r\n\r\n**구현 방법:**\r\n\r\n**JavaScript:**\r\n```javascript\r\n// Object.freeze (얕은 불변)\r\nconst obj = Object.freeze({ a: 1 });\r\n\r\n// 스프레드 연산자 (새 객체)\r\nconst newObj = { ...obj, b: 2 };\r\n\r\n// 배열\r\nconst newArr = [...arr, newItem];\r\n\r\n// 라이브러리: Immutable.js, Immer\r\n```\r\n\r\n**Java:**\r\n```java\r\npublic final class ImmutablePerson {\r\n    private final String name;\r\n    private final int age;\r\n\r\n    public ImmutablePerson(String name, int age) {\r\n        this.name = name;\r\n        this.age = age;\r\n    }\r\n    // getter만, setter 없음\r\n    // 방어적 복사\r\n}\r\n\r\n// Record (Java 16+)\r\npublic record Person(String name, int age) {}\r\n```\r\n\r\n**Python:**\r\n```python\r\nfrom dataclasses import dataclass\r\n\r\n@dataclass(frozen=True)  # 불변\r\nclass Point:\r\n    x: int\r\n    y: int\r\n```",
    "references": []
  },
  {
    "id": "LANG-006",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "동시성(Concurrency)과 병렬성(Parallelism)의 차이점은 무엇인가요?",
    "answer": "| 구분 | 동시성 | 병렬성 |\r\n|------|--------|--------|\r\n| 정의 | 여러 작업 동시에 다룸 | 여러 작업 동시에 실행 |\r\n| 목적 | 응답성, 구조화 | 처리량, 속도 |\r\n| 하드웨어 | 싱글 코어 가능 | 멀티 코어 필요 |\r\n| 관점 | 설계/구조 | 실행 방식 |\r\n\r\n**동시성 (Concurrency):**\r\n\"여러 일을 한꺼번에 **다루는** 것\"\r\n- 작업 간 전환 (인터리빙)\r\n- 싱글 코어에서도 가능\r\n- 구조적 개념\r\n\r\n```\r\n시간 →\r\nTask1: ──▓▓──────▓▓──\r\nTask2: ────▓▓▓▓──────\r\n      (번갈아 실행)\r\n```\r\n\r\n**병렬성 (Parallelism):**\r\n\"여러 일을 한꺼번에 **실행하는** 것\"\r\n- 물리적 동시 실행\r\n- 멀티 코어 필수\r\n- 실행 개념\r\n\r\n```\r\nCore1: ──▓▓▓▓▓▓──\r\nCore2: ──▓▓▓▓▓▓──\r\n      (동시 실행)\r\n```\r\n\r\n**관계:**\r\n- 동시성 없이 병렬성 가능 (독립 작업)\r\n- 병렬성 없이 동시성 가능 (싱글 코어 멀티태스킹)\r\n- 둘 다 가능 (멀티코어 + 멀티태스킹)\r\n\r\n**예시:**\r\n- 동시성: Node.js 이벤트 루프 (싱글 스레드)\r\n- 병렬성: 멀티 프로세스 데이터 처리",
    "references": []
  },
  {
    "id": "LANG-007",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "Race Condition과 Deadlock에 대해 설명해주세요.",
    "answer": "**Race Condition (경쟁 상태):**\r\n여러 스레드가 공유 자원에 동시 접근하여 결과가 실행 순서에 따라 달라지는 현상\r\n\r\n```java\r\n// 문제\r\nint count = 0;\r\n// Thread 1: count++\r\n// Thread 2: count++\r\n// 예상: 2, 실제: 1 또는 2 (비결정적)\r\n\r\n// 해결: 동기화\r\nsynchronized(lock) {\r\n    count++;\r\n}\r\n// 또는 AtomicInteger 사용\r\n```\r\n\r\n**Deadlock (교착 상태):**\r\n두 개 이상의 스레드가 서로의 자원을 기다리며 영원히 블로킹\r\n\r\n```\r\nThread 1: Lock A 획득 → Lock B 대기\r\nThread 2: Lock B 획득 → Lock A 대기\r\n→ 둘 다 영원히 대기\r\n```\r\n\r\n**Deadlock 조건 (모두 충족 시):**\r\n1. 상호 배제: 자원은 한 번에 하나만 사용\r\n2. 점유 대기: 자원 보유하며 다른 자원 대기\r\n3. 비선점: 강제로 자원 회수 불가\r\n4. 순환 대기: 순환 형태의 대기\r\n\r\n**Deadlock 방지:**\r\n1. 락 순서 일관되게 유지\r\n2. 타임아웃 사용\r\n3. tryLock() 사용\r\n4. 락 계층 구조\r\n\r\n```java\r\n// 일관된 순서로 락 획득\r\nif (lockA.hashCode() < lockB.hashCode()) {\r\n    synchronized(lockA) { synchronized(lockB) {} }\r\n} else {\r\n    synchronized(lockB) { synchronized(lockA) {} }\r\n}\r\n```",
    "references": []
  },
  {
    "id": "LANG-008",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "동기(Synchronous)와 비동기(Asynchronous)의 차이점은 무엇인가요?",
    "answer": "| 구분 | 동기 | 비동기 |\r\n|------|------|--------|\r\n| 실행 | 순차적, 완료 대기 | 요청 후 다른 작업 |\r\n| 호출자 | 블로킹 | 논블로킹 |\r\n| 결과 | 즉시 반환 | 콜백/Promise/Future |\r\n| 복잡도 | 단순 | 복잡 |\r\n\r\n**동기 (Synchronous):**\r\n```javascript\r\n// 순차 실행, 완료까지 대기\r\nconst data = fetchDataSync();  // 블로킹\r\nprocess(data);\r\n```\r\n\r\n```\r\n호출 ──▶│ 작업 처리 중... │──▶ 결과\r\n        │     대기      │\r\n```\r\n\r\n**비동기 (Asynchronous):**\r\n```javascript\r\n// 요청 후 즉시 반환, 나중에 결과 처리\r\nfetchDataAsync()\r\n    .then(data => process(data));\r\ndoOtherWork();  // 기다리지 않고 실행\r\n```\r\n\r\n```\r\n호출 ──▶ 즉시 반환 ──▶ 다른 작업\r\n         │\r\n         └──▶ 나중에 결과 처리\r\n```\r\n\r\n**비동기 처리 방법:**\r\n1. **콜백**: 함수 전달\r\n2. **Promise**: then/catch\r\n3. **async/await**: 동기식 문법\r\n4. **이벤트**: 이벤트 리스너\r\n\r\n**사용 시나리오:**\r\n- 동기: 단순 작업, 순서 중요\r\n- 비동기: I/O, 네트워크, UI 응답성",
    "references": []
  },
  {
    "id": "LANG-009",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "블로킹(Blocking)과 논블로킹(Non-blocking)의 차이점은 무엇인가요?",
    "answer": "**블로킹:**\r\n호출된 함수가 완료될 때까지 **호출자가 대기**\r\n\r\n```\r\nThread: ────▓▓▓▓▓▓────  (대기 중)\r\n             │ I/O │\r\n```\r\n\r\n**논블로킹:**\r\n호출된 함수가 즉시 반환, **호출자는 다른 작업 가능**\r\n\r\n```\r\nThread: ────▓────▓────▓  (다른 작업)\r\n            │    │    │\r\n            └ 상태 확인 ┘\r\n```\r\n\r\n**동기/비동기 vs 블로킹/논블로킹:**\r\n\r\n| 조합 | 설명 |\r\n|------|------|\r\n| 동기 + 블로킹 | 완료까지 대기 (일반적) |\r\n| 동기 + 논블로킹 | 즉시 반환, 폴링으로 확인 |\r\n| 비동기 + 논블로킹 | 즉시 반환, 콜백/이벤트로 알림 |\r\n| 비동기 + 블로킹 | 비효율적 (드묾) |\r\n\r\n**예시:**\r\n```javascript\r\n// 동기 + 블로킹\r\nconst data = fs.readFileSync('file.txt');\r\n\r\n// 비동기 + 논블로킹\r\nfs.readFile('file.txt', (err, data) => {\r\n    // 콜백으로 처리\r\n});\r\n```\r\n\r\n**I/O 모델:**\r\n- 블로킹 I/O: read() 호출 시 데이터 올 때까지 대기\r\n- 논블로킹 I/O: 데이터 없으면 에러 반환\r\n- I/O 멀티플렉싱: select/poll/epoll\r\n- 비동기 I/O: 커널이 완료 알림",
    "references": []
  },
  {
    "id": "LANG-010",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "컴파일 언어와 인터프리터 언어의 차이점은 무엇인가요?",
    "answer": "| 구분 | 컴파일 언어 | 인터프리터 언어 |\r\n|------|-------------|-----------------|\r\n| 변환 시점 | 실행 전 전체 | 실행 중 한 줄씩 |\r\n| 출력 | 기계어/바이트코드 | 없음 (직접 실행) |\r\n| 실행 속도 | 빠름 | 느림 |\r\n| 개발 속도 | 느림 (빌드) | 빠름 |\r\n| 에러 검출 | 컴파일 타임 | 런타임 |\r\n\r\n**컴파일 언어:**\r\n```\r\n소스 코드 → 컴파일러 → 실행 파일 → 실행\r\n           (한 번)\r\n```\r\n- 예: C, C++, Go, Rust\r\n- 장점: 빠른 실행, 최적화\r\n- 단점: 플랫폼 의존, 빌드 시간\r\n\r\n**인터프리터 언어:**\r\n```\r\n소스 코드 → 인터프리터 → 실행\r\n           (매번)\r\n```\r\n- 예: Python, JavaScript, Ruby\r\n- 장점: 빠른 개발, 플랫폼 독립\r\n- 단점: 느린 실행\r\n\r\n**혼합 방식:**\r\n- **Java**: 컴파일(바이트코드) + 인터프리터/JIT\r\n- **Python**: 바이트코드 컴파일 + VM 실행\r\n- **JavaScript**: JIT 컴파일 (V8)\r\n\r\n**JIT (Just-In-Time):**\r\n- 런타임에 기계어로 컴파일\r\n- 핫스팟 최적화\r\n- 인터프리터 + 컴파일 장점 결합",
    "references": []
  },
  {
    "id": "LANG-011",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "JIT(Just-In-Time) 컴파일러의 동작 원리를 설명해주세요.",
    "answer": "**JIT 컴파일:**\r\n런타임에 바이트코드를 기계어로 변환하여 성능 향상\r\n\r\n**동작 과정:**\r\n```\r\n바이트코드 → 인터프리터 실행\r\n         ↓ (핫스팟 감지)\r\n      JIT 컴파일러\r\n         ↓\r\n      기계어 캐시\r\n         ↓\r\n      빠른 실행\r\n```\r\n\r\n**주요 기법:**\r\n\r\n**1. 핫스팟 감지**\r\n- 자주 실행되는 코드 영역 파악\r\n- 카운터로 호출 횟수 추적\r\n\r\n**2. 프로파일링 기반 최적화**\r\n- 런타임 정보로 최적화 결정\r\n- 타입 예측, 분기 예측\r\n\r\n**3. 최적화 기법**\r\n- 인라이닝: 함수 호출 제거\r\n- 루프 언롤링: 반복문 펼치기\r\n- 데드 코드 제거\r\n- 탈출 분석: 스택 할당 최적화\r\n\r\n**4. 탈최적화 (Deoptimization)**\r\n- 가정 깨지면 다시 인터프리터 모드\r\n\r\n**JIT 사용 환경:**\r\n- **Java**: HotSpot C1/C2 컴파일러\r\n- **JavaScript**: V8 (TurboFan), SpiderMonkey\r\n- **.NET**: RyuJIT\r\n- **Python**: PyPy\r\n\r\n**Trade-off:**\r\n- 워밍업 시간 필요\r\n- 메모리 사용 증가\r\n- 장기 실행에 유리",
    "references": []
  },
  {
    "id": "LANG-012",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "정적 타이핑과 동적 타이핑의 장단점은 무엇인가요?",
    "answer": "| 구분 | 정적 타이핑 | 동적 타이핑 |\r\n|------|-------------|-------------|\r\n| 타입 검사 | 컴파일 타임 | 런타임 |\r\n| 선언 | 명시적 타입 | 타입 생략 |\r\n| 에러 발견 | 빠름 | 늦음 |\r\n| 유연성 | 낮음 | 높음 |\r\n\r\n**정적 타이핑:**\r\n```java\r\nint x = 10;       // 타입 선언\r\nx = \"hello\";      // 컴파일 에러\r\n```\r\n- 예: Java, C++, Go, TypeScript\r\n- **장점:**\r\n  - 컴파일 타임 에러 발견\r\n  - IDE 자동완성, 리팩토링\r\n  - 성능 최적화\r\n  - 문서화 효과\r\n- **단점:**\r\n  - 장황한 코드\r\n  - 유연성 부족\r\n  - 학습 곡선\r\n\r\n**동적 타이핑:**\r\n```python\r\nx = 10\r\nx = \"hello\"  # OK\r\n```\r\n- 예: Python, JavaScript, Ruby\r\n- **장점:**\r\n  - 간결한 코드\r\n  - 빠른 프로토타이핑\r\n  - 유연한 API\r\n  - 덕 타이핑\r\n- **단점:**\r\n  - 런타임 에러\r\n  - 리팩토링 어려움\r\n  - 대규모 프로젝트 유지보수\r\n\r\n**점진적 타이핑:**\r\n- TypeScript, Python (타입 힌트)\r\n- 선택적 타입 추가",
    "references": []
  },
  {
    "id": "LANG-013",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "강타입과 약타입 언어의 차이점은 무엇인가요?",
    "answer": "**강타입 (Strongly Typed):**\r\n타입 간 암시적 변환 제한적\r\n\r\n```python\r\n# Python (강타입)\r\n\"5\" + 5  # TypeError\r\nint(\"5\") + 5  # 명시적 변환 필요 → 10\r\n```\r\n\r\n**약타입 (Weakly Typed):**\r\n타입 간 암시적 변환 허용\r\n\r\n```javascript\r\n// JavaScript (약타입)\r\n\"5\" + 5   // \"55\" (문자열 연결)\r\n\"5\" - 1   // 4 (숫자로 변환)\r\n[] + {}   // \"[object Object]\"\r\n```\r\n\r\n| 구분 | 강타입 | 약타입 |\r\n|------|--------|--------|\r\n| 변환 | 명시적 | 암시적 |\r\n| 안전성 | 높음 | 낮음 |\r\n| 편의성 | 불편 | 편리 (위험) |\r\n| 예측성 | 높음 | 낮음 |\r\n\r\n**언어 분류:**\r\n| 타입 | 정적 | 동적 |\r\n|------|------|------|\r\n| 강 | Java, C#, Go | Python, Ruby |\r\n| 약 | C | JavaScript, PHP |\r\n\r\n**주의:**\r\n- 정적/동적과 독립적 개념\r\n- 스펙트럼 (완전 강/약 없음)\r\n\r\n**강타입 장점:**\r\n- 타입 관련 버그 방지\r\n- 의도 명확\r\n\r\n**약타입 장점:**\r\n- 유연한 코드 (위험 동반)",
    "references": []
  },
  {
    "id": "LANG-014",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "Call by Value와 Call by Reference의 차이점을 설명해주세요.",
    "answer": "**Call by Value:**\r\n값의 **복사본** 전달\r\n\r\n```c\r\nvoid modify(int x) {\r\n    x = 100;  // 복사본 수정\r\n}\r\nint a = 10;\r\nmodify(a);\r\n// a는 여전히 10\r\n```\r\n\r\n**Call by Reference:**\r\n변수의 **참조(주소)** 전달\r\n\r\n```cpp\r\nvoid modify(int& x) {  // C++ 참조\r\n    x = 100;  // 원본 수정\r\n}\r\nint a = 10;\r\nmodify(a);\r\n// a는 100\r\n```\r\n\r\n**언어별 특성:**\r\n\r\n**Java: Call by Value (항상)**\r\n```java\r\n// 기본형: 값 복사\r\nvoid modify(int x) { x = 100; }  // 원본 불변\r\n\r\n// 참조형: 참조값(주소) 복사\r\nvoid modify(List list) {\r\n    list.add(1);     // 내부 변경 가능\r\n    list = new ArrayList();  // 원본 참조 불변\r\n}\r\n```\r\n\r\n**Python: Call by Object Reference**\r\n```python\r\ndef modify(lst):\r\n    lst.append(4)    # 원본 변경됨\r\n    lst = [1, 2, 3]  # 새 객체 바인딩 (원본 불변)\r\n```\r\n\r\n**JavaScript: Call by Sharing**\r\n- 기본형: 값 복사\r\n- 객체: 참조 복사\r\n\r\n**정리:**\r\n| 언어 | 방식 |\r\n|------|------|\r\n| C | Value, 포인터로 참조 흉내 |\r\n| C++ | Value, Reference (&) |\r\n| Java | Value (참조값 복사) |\r\n| Python | Object Reference |\r\n| Go | Value, 포인터 사용 |",
    "references": []
  },
  {
    "id": "LANG-015",
    "category": "pl",
    "categoryName": "프로그래밍 언어",
    "section": "pl",
    "question": "메모리 누수(Memory Leak)가 발생하는 원인과 방지 방법은 무엇인가요?",
    "answer": "**메모리 누수:**\r\n사용하지 않는 메모리를 해제하지 않아 점점 메모리 증가\r\n\r\n**원인:**\r\n\r\n**1. 참조 유지**\r\n```java\r\n// static 컬렉션에 객체 쌓임\r\nstatic List<Object> cache = new ArrayList<>();\r\ncache.add(obj);  // 계속 증가\r\n```\r\n\r\n**2. 이벤트 리스너 해제 안 함**\r\n```javascript\r\nelement.addEventListener('click', handler);\r\n// removeEventListener 안 하면 누수\r\n```\r\n\r\n**3. 클로저가 참조 유지**\r\n```javascript\r\nfunction outer() {\r\n    const largeData = new Array(1000000);\r\n    return function() {\r\n        console.log(largeData.length);  // 참조 유지\r\n    };\r\n}\r\n```\r\n\r\n**4. ThreadLocal 정리 안 함**\r\n```java\r\nthreadLocal.set(value);\r\n// threadLocal.remove() 안 하면 누수\r\n```\r\n\r\n**5. 리소스 해제 안 함**\r\n- 파일, DB 연결, 소켓\r\n\r\n---\r\n\r\n**방지 방법:**\r\n\r\n1. **약한 참조 사용**: WeakMap, WeakReference\r\n2. **리스너 해제**: removeEventListener\r\n3. **리소스 정리**: try-with-resources, using\r\n4. **캐시 정책**: LRU, TTL\r\n5. **순환 참조 주의**\r\n6. **프로파일링**: heap dump, memory profiler\r\n\r\n```java\r\n// WeakHashMap - 키 참조 없으면 자동 제거\r\nMap<Key, Value> cache = new WeakHashMap<>();\r\n```\r\n\r\n```javascript\r\n// WeakMap - 키 객체 GC 가능\r\nconst wm = new WeakMap();\r\n```",
    "references": []
  }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { plData };
}
