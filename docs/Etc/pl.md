# Programming Language (프로그래밍 언어)

## 목록

1. 자바
2. 자바스크립트
3. Python
4. Go
   > 카테고리: 프로그래밍 언어
   > [← 면접 질문 목록으로 돌아가기](../interview.md)

---

## 📌 Java

### JAVA-001

JVM의 구조와 동작 원리에 대해 설명해주세요.

<details>
<summary>답변</summary>

JVM(Java Virtual Machine)은 자바 바이트코드를 실행하는 가상 머신입니다.

**주요 구성 요소:**
- **Class Loader**: 클래스 파일 로드, 링크, 초기화
- **Runtime Data Area**: Heap, Stack, Method Area, PC Register, Native Method Stack
- **Execution Engine**: Interpreter + JIT Compiler로 바이트코드 실행
- **Garbage Collector**: 미사용 객체 메모리 자동 해제

**동작 과정:** .java → javac → .class(바이트코드) → Class Loader → Execution Engine 실행

**참고자료**
- [JVM Specification](https://docs.oracle.com/javase/specs/jvms/se17/html/index.html)[^1]

</details>

[^1]: Oracle Java SE 17 JVM Specification

### JAVA-002

JVM의 메모리 구조(Heap, Stack, Method Area 등)를 설명해주세요.

<details>
<summary>답변</summary>

**1. Method Area (메서드 영역)**
- 클래스 정보, static 변수, 상수 풀 저장
- 모든 스레드가 공유

**2. Heap (힙)**
- 객체 인스턴스와 배열 저장
- GC의 대상, 모든 스레드가 공유
- Young Generation(Eden, Survivor)과 Old Generation으로 구분

**3. Stack (스택)**
- 스레드별 독립적, 메서드 호출 시 프레임 생성
- 지역 변수, 매개변수, 리턴 값 저장

**4. PC Register**
- 스레드별 현재 실행 중인 명령어 주소 저장

**5. Native Method Stack**
- 네이티브 메서드(C/C++) 실행을 위한 스택

**참고자료**
- [JVM Runtime Data Areas](https://docs.oracle.com/javase/specs/jvms/se17/html/jvms-2.html#jvms-2.5)[^2]

</details>

[^2]: Oracle JVM Specification - Runtime Data Areas

### JAVA-003

Garbage Collection의 동작 원리와 종류에 대해 설명해주세요.

<details>
<summary>답변</summary>

**동작 원리:**
- Mark: 루트에서 참조되는 객체를 마킹
- Sweep: 마킹되지 않은 객체 제거
- Compact: 메모리 단편화 방지를 위해 압축 (선택적)

**세대별 GC (Generational GC):**
- Young Generation: 새 객체 할당, Minor GC 발생 (빈번, 빠름)
- Old Generation: 오래 살아남은 객체, Major/Full GC 발생

**GC 종류:**
- **Serial GC**: 단일 스레드, 소규모 애플리케이션용
- **Parallel GC**: 멀티 스레드로 처리량 최적화
- **CMS GC**: 낮은 지연시간, Concurrent Mark-Sweep
- **G1 GC**: Region 기반, 대용량 힙에 적합 (Java 9+ 기본)
- **ZGC/Shenandoah**: 초저지연 GC (Java 11+)

**참고자료**
- [Java Garbage Collection](https://docs.oracle.com/en/java/javase/17/gctuning/introduction-garbage-collection-tuning.html)[^3]

</details>

[^3]: Oracle Java SE 17 GC Tuning Guide

### JAVA-004

G1 GC와 다른 GC 알고리즘의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**G1 GC 특징:**
- 힙을 동일 크기의 Region으로 분할 (1MB~32MB)
- Region 단위로 GC 수행, 가비지가 많은 영역 우선 수집 (Garbage First)
- 목표 중단 시간(Pause Time Goal) 설정 가능 (-XX:MaxGCPauseMillis)

**다른 GC와 비교:**

| 구분 | G1 GC | Parallel GC | CMS GC |
|------|-------|-------------|--------|
| 구조 | Region 기반 | 전통적 세대별 | 전통적 세대별 |
| 목표 | 균형(처리량+지연) | 처리량 최대화 | 지연시간 최소화 |
| 압축 | Incremental | Full GC 시 | 압축 없음(단편화) |
| STW | 예측 가능 | 길 수 있음 | 짧지만 불규칙 |

**G1 GC 권장 상황:** 힙 크기 4GB 이상, 지연시간과 처리량 균형 필요 시

**참고자료**
- [G1 Garbage Collector](https://docs.oracle.com/en/java/javase/17/gctuning/garbage-first-g1-garbage-collector1.html)[^4]

</details>

[^4]: Oracle Java SE 17 G1 GC Documentation

### JAVA-005

Java의 클래스 로딩 과정을 설명해주세요.

<details>
<summary>답변</summary>

**3단계 클래스 로딩 과정:**

**1. Loading (로딩)**
- .class 파일을 읽어 바이트코드를 Method Area에 저장
- Class 객체 생성

**2. Linking (링킹)**
- **Verification**: 바이트코드 유효성 검증
- **Preparation**: static 변수 메모리 할당 및 기본값 초기화
- **Resolution**: 심볼릭 참조를 실제 참조로 변환

**3. Initialization (초기화)**
- static 블록 실행, static 변수에 명시적 값 할당

**클래스 로더 계층 (위임 모델):**
- Bootstrap ClassLoader → Extension ClassLoader → Application ClassLoader
- 상위 로더에 먼저 위임 후, 못 찾으면 하위에서 로드

**참고자료**
- [Class Loading](https://docs.oracle.com/javase/specs/jvms/se17/html/jvms-5.html)[^5]

</details>

[^5]: Oracle JVM Specification - Loading, Linking, Initialization

### JAVA-006

static 키워드의 의미와 사용 시 주의사항은 무엇인가요?

<details>
<summary>답변</summary>

**의미:**
- 클래스 레벨에 속하며, 인스턴스 생성 없이 접근 가능
- Method Area에 저장, 모든 인스턴스가 공유

**사용처:**
- static 변수: 클래스 전체에서 공유하는 값 (예: 카운터)
- static 메서드: 유틸리티 메서드 (예: Math.max())
- static 블록: 클래스 로딩 시 한 번 실행
- static 내부 클래스: 외부 클래스 인스턴스 없이 생성 가능

**주의사항:**
- static 메서드에서 인스턴스 멤버 직접 접근 불가
- 멀티스레드 환경에서 동기화 필요 (공유 자원)
- 메모리 누수 주의 (GC 대상이 아님, 클래스 언로드 시까지 유지)
- 테스트 어려움 (상태 공유로 인한 부작용)
- 과도한 사용은 OOP 원칙 위반

**참고자료**
- [Understanding Class Members](https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html)[^6]

</details>

[^6]: Oracle Java Tutorial - Class Members

### JAVA-007

final, finally, finalize의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**final (키워드)**
- 변수: 재할당 불가 (상수화)
- 메서드: 오버라이딩 불가
- 클래스: 상속 불가 (예: String, Integer)

**finally (예외 처리)**
- try-catch-finally 블록에서 항상 실행되는 블록
- 리소스 정리에 사용 (try-with-resources 권장)
- return이 있어도 실행됨 (System.exit() 제외)

**finalize() (메서드) - Deprecated**
- Object 클래스의 메서드, GC 전 호출
- Java 9부터 deprecated, 사용 권장하지 않음
- 대안: try-with-resources, Cleaner API

```java
final int MAX = 100;  // 상수
try { ... } finally { resource.close(); }  // 정리
// finalize() 사용 X
```

**참고자료**
- [Java Language Keywords](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html)[^7]

</details>

[^7]: Oracle Java Tutorial - Keywords

### JAVA-008

추상 클래스와 인터페이스의 차이점과 사용 시나리오를 설명해주세요.

<details>
<summary>답변</summary>

| 구분 | 추상 클래스 | 인터페이스 |
|------|-------------|------------|
| 상속 | 단일 상속 | 다중 구현 가능 |
| 생성자 | 가질 수 있음 | 없음 |
| 필드 | 인스턴스 변수 가능 | public static final만 |
| 메서드 | 모든 종류 | public abstract (+ default, static) |
| 접근제어자 | 모두 가능 | public만 |

**사용 시나리오:**

**추상 클래스:**
- "is-a" 관계, 공통 구현 코드 공유 시
- 상태(필드)를 공유해야 할 때
- 예: Animal → Dog, Cat

**인터페이스:**
- "can-do" 관계, 행위 계약 정의
- 다중 타입 역할 부여 시
- 예: Comparable, Serializable, Runnable

**참고자료**
- [Abstract Methods and Classes](https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html)[^8]

</details>

[^8]: Oracle Java Tutorial - Abstract Classes

### JAVA-009

Java 8 이후 인터페이스의 default 메서드와 static 메서드에 대해 설명해주세요.

<details>
<summary>답변</summary>

**default 메서드:**
- 인터페이스에 기본 구현을 제공
- 하위 호환성 유지하며 인터페이스 확장 가능
- 구현 클래스에서 오버라이딩 가능

```java
interface Collection {
    default void forEach(Consumer action) {
        for (E e : this) action.accept(e);
    }
}
```

**static 메서드:**
- 인터페이스에 유틸리티 메서드 정의
- 인터페이스명으로 직접 호출 (상속/오버라이딩 불가)

```java
interface Comparator {
    static <T> Comparator<T> naturalOrder() { ... }
}
```

**다이아몬드 문제 해결:**
- 동일 시그니처의 default 메서드 충돌 시, 구현 클래스에서 명시적 오버라이딩 필요
- `InterfaceName.super.method()` 로 특정 인터페이스 메서드 호출

**참고자료**
- [Default Methods](https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html)[^9]

</details>

[^9]: Oracle Java Tutorial - Default Methods

### JAVA-010

Checked Exception과 Unchecked Exception의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | Checked Exception | Unchecked Exception |
|------|-------------------|---------------------|
| 상속 | Exception 상속 | RuntimeException 상속 |
| 처리 | 반드시 처리 (try-catch/throws) | 선택적 처리 |
| 컴파일 | 미처리 시 컴파일 에러 | 컴파일 에러 없음 |
| 시점 | 예측 가능한 외부 요인 | 프로그래밍 오류 |

**Checked Exception 예시:**
- IOException, SQLException, FileNotFoundException
- 복구 가능한 상황, 호출자에게 처리 강제

**Unchecked Exception 예시:**
- NullPointerException, IllegalArgumentException, IndexOutOfBoundsException
- 프로그래밍 버그, 방어 코딩으로 예방

**현대적 관점:**
- Spring/JPA 등은 Unchecked 선호 (보일러플레이트 감소)
- Checked는 과도한 try-catch로 코드 가독성 저하 우려

**참고자료**
- [Exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html)[^10]

</details>

[^10]: Oracle Java Tutorial - Exceptions

### JAVA-011

try-with-resources 구문의 동작 원리를 설명해주세요.

<details>
<summary>답변</summary>

**개념:**
Java 7에서 도입된 자동 리소스 관리 구문으로, AutoCloseable 인터페이스를 구현한 리소스를 자동으로 닫아줍니다.

```java
try (FileInputStream fis = new FileInputStream("file.txt");
     BufferedReader br = new BufferedReader(new InputStreamReader(fis))) {
    // 리소스 사용
} // 자동으로 close() 호출
```

**동작 원리:**
1. try 블록 종료 시 close() 자동 호출
2. 선언 역순으로 close() 실행
3. close()에서 발생한 예외는 suppressed exception으로 처리

**장점:**
- finally 블록 불필요, 코드 간결
- 리소스 누수 방지
- 예외 안전한 리소스 해제

**Suppressed Exception:**
```java
Throwable[] suppressed = e.getSuppressed();
```

**참고자료**
- [Try-with-resources](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html)[^11]

</details>

[^11]: Oracle Java Tutorial - Try-with-resources Statement

### JAVA-012

equals()와 hashCode()의 관계와 오버라이딩 시 주의사항은 무엇인가요?

<details>
<summary>답변</summary>

**계약 (Contract):**
- equals()가 true인 두 객체는 반드시 같은 hashCode() 반환
- hashCode()가 같아도 equals()는 false일 수 있음

**위반 시 문제:**
- HashMap, HashSet 등 해시 기반 컬렉션에서 오작동
- 객체를 찾지 못하거나 중복 저장되는 버그

**equals() 오버라이딩 규칙:**
- 반사성: x.equals(x) == true
- 대칭성: x.equals(y) == y.equals(x)
- 추이성: x.equals(y), y.equals(z) → x.equals(z)
- 일관성: 값 불변 시 항상 동일 결과
- null 비교: x.equals(null) == false

**구현 팁:**
```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof MyClass)) return false;
    MyClass that = (MyClass) o;
    return Objects.equals(field1, that.field1);
}

@Override
public int hashCode() {
    return Objects.hash(field1);
}
```

**참고자료**
- [Object.equals()](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object))[^12]

</details>

[^12]: Oracle Java SE 17 API - Object.equals()

### JAVA-013

String, StringBuilder, StringBuffer의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

| 구분 | String | StringBuilder | StringBuffer |
|------|--------|---------------|--------------|
| 가변성 | 불변 (Immutable) | 가변 (Mutable) | 가변 (Mutable) |
| 스레드 안전 | O (불변) | X | O (synchronized) |
| 성능 | 문자열 연산 시 느림 | 가장 빠름 | StringBuilder보다 느림 |
| 메모리 | 연산마다 새 객체 생성 | 내부 버퍼 재사용 | 내부 버퍼 재사용 |

**사용 시나리오:**
- **String**: 문자열 변경이 적을 때, 리터럴 사용
- **StringBuilder**: 단일 스레드에서 문자열 조작 (권장)
- **StringBuffer**: 멀티스레드에서 문자열 조작

**String Pool:**
- String 리터럴은 힙의 String Pool에 저장되어 재사용
- `new String()`은 별도 객체 생성

```java
String s = "hello";  // String Pool
StringBuilder sb = new StringBuilder();
sb.append("hello").append(" world");  // 효율적
```

**참고자료**
- [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html)[^13]

</details>

[^13]: Oracle Java SE 17 API - String

### JAVA-014

Java의 Generic에 대해 설명하고, Type Erasure란 무엇인가요?

<details>
<summary>답변</summary>

**Generic:**
컴파일 타임에 타입 안전성을 보장하고, 캐스팅 제거하는 기능 (Java 5+)

```java
List<String> list = new ArrayList<>();
list.add("hello");
String s = list.get(0);  // 캐스팅 불필요
```

**Type Erasure:**
- 컴파일 후 제네릭 타입 정보가 제거되어 런타임에는 존재하지 않음
- `List<String>` → `List` (Raw Type)
- 하위 호환성을 위해 도입

**제약사항:**
- `new T()`, `new T[]` 불가
- `instanceof T` 불가
- static 컨텍스트에서 타입 파라미터 사용 불가
- 기본 타입 사용 불가 (`List<int>` X → `List<Integer>` O)

**와일드카드:**
- `?`: 모든 타입
- `? extends T`: 상한 경계 (읽기 전용)
- `? super T`: 하한 경계 (쓰기 용)
- PECS: Producer-Extends, Consumer-Super

**참고자료**
- [Generics](https://docs.oracle.com/javase/tutorial/java/generics/index.html)[^14]

</details>

[^14]: Oracle Java Tutorial - Generics

### JAVA-015

Comparable과 Comparator의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

| 구분 | Comparable | Comparator |
|------|------------|------------|
| 패키지 | java.lang | java.util |
| 메서드 | compareTo(T o) | compare(T o1, T o2) |
| 구현 위치 | 비교 대상 클래스 내부 | 별도 클래스/람다 |
| 정렬 기준 | 자연 순서 (단일) | 다양한 기준 가능 |

**Comparable:**
```java
class Student implements Comparable<Student> {
    public int compareTo(Student o) {
        return this.age - o.age;  // 나이 기준
    }
}
Collections.sort(students);  // 자연 순서로 정렬
```

**Comparator:**
```java
// 이름 기준 정렬
students.sort(Comparator.comparing(Student::getName));
// 역순
students.sort(Comparator.comparing(Student::getAge).reversed());
// 복합 정렬
students.sort(Comparator.comparing(Student::getAge)
                        .thenComparing(Student::getName));
```

**사용 시나리오:**
- Comparable: 클래스의 기본 정렬 기준 정의
- Comparator: 여러 정렬 기준 필요 시, 기존 클래스 수정 불가 시

**참고자료**
- [Comparable](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Comparable.html)[^15]

</details>

[^15]: Oracle Java SE 17 API - Comparable

### JAVA-016

Java의 Collection Framework 구조를 설명해주세요.

<details>
<summary>답변</summary>

**계층 구조:**
```
Iterable
    └── Collection
        ├── List (순서O, 중복O)
        │   ├── ArrayList
        │   ├── LinkedList
        │   └── Vector (legacy)
        ├── Set (순서X, 중복X)
        │   ├── HashSet
        │   ├── LinkedHashSet
        │   └── TreeSet (정렬)
        └── Queue (FIFO)
            ├── LinkedList
            ├── PriorityQueue
            └── Deque (양방향)

Map (별도 계층, Key-Value)
    ├── HashMap
    ├── LinkedHashMap
    ├── TreeMap (정렬)
    └── Hashtable (legacy)
```

**주요 인터페이스:**
- **List**: 인덱스 기반 접근, 순서 보장
- **Set**: 중복 불허, 집합 연산
- **Queue/Deque**: FIFO/양방향 큐
- **Map**: 키-값 매핑

**선택 기준:**
- 순서/중복 필요 → List
- 고유값 보장 → Set
- 키로 검색 → Map
- 선입선출 → Queue

**참고자료**
- [Collections Framework](https://docs.oracle.com/javase/tutorial/collections/index.html)[^16]

</details>

[^16]: Oracle Java Tutorial - Collections

### JAVA-017

ArrayList와 LinkedList의 차이점과 사용 시나리오는 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | ArrayList | LinkedList |
|------|-----------|------------|
| 내부 구조 | 동적 배열 | 이중 연결 리스트 |
| 인덱스 접근 | O(1) | O(n) |
| 삽입/삭제 (중간) | O(n) | O(1) (노드 접근 후) |
| 삽입/삭제 (끝) | O(1) 평균 | O(1) |
| 메모리 | 연속, 적음 | 노드별 포인터, 많음 |
| 캐시 효율 | 높음 | 낮음 |

**ArrayList 권장:**
- 읽기/조회가 빈번한 경우
- 인덱스 기반 접근이 많은 경우
- 대부분의 일반적인 상황 (기본 선택)

**LinkedList 권장:**
- 앞/뒤 삽입/삭제가 빈번한 경우
- Queue/Deque 용도로 사용 시
- Iterator를 통한 순회 중 삭제가 많을 때

**실무 팁:**
실제로는 ArrayList가 대부분 더 좋은 성능을 보임 (CPU 캐시 효율)

**참고자료**
- [ArrayList](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/ArrayList.html)[^17]

</details>

[^17]: Oracle Java SE 17 API - ArrayList

### JAVA-018

HashMap의 동작 원리와 해시 충돌 해결 방법을 설명해주세요.

<details>
<summary>답변</summary>

**동작 원리:**
1. key.hashCode()로 해시값 계산
2. 해시값을 배열 인덱스로 변환 (hash & (n-1))
3. 해당 버킷에 Entry(key, value) 저장

**해시 충돌 해결 (Separate Chaining):**
- 같은 버킷에 여러 Entry가 저장될 때
- **Java 7**: 연결 리스트로 체이닝
- **Java 8+**: 버킷 내 8개 초과 시 Red-Black Tree로 변환 (O(n) → O(log n))

**주요 특징:**
- 초기 용량: 16, 로드팩터: 0.75
- 로드팩터 초과 시 2배 리사이징 (rehashing)
- null key 1개, null value 다수 허용
- 순서 보장 X (LinkedHashMap은 보장)

**성능:**
- 평균: get/put O(1)
- 최악 (충돌 많을 때): O(log n) - Java 8+

**참고자료**
- [HashMap](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html)[^18]

</details>

[^18]: Oracle Java SE 17 API - HashMap

### JAVA-019

ConcurrentHashMap의 동작 원리와 HashMap과의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | HashMap | ConcurrentHashMap |
|------|---------|-------------------|
| 스레드 안전 | X | O |
| null 허용 | key/value 가능 | 불가 |
| 동기화 방식 | 없음 | 세그먼트/노드 락 |
| 성능 | 단일 스레드 최고 | 멀티스레드 최적화 |
| Iterator | fail-fast | weakly consistent |

**ConcurrentHashMap 동작 원리:**

**Java 7:**
- Segment 기반 분할 잠금 (기본 16개)
- 각 세그먼트별 독립적 락

**Java 8+:**
- 세그먼트 대신 노드 단위 CAS + synchronized
- 버킷이 비어있으면 CAS로 삽입
- 충돌 시 해당 노드만 synchronized
- 읽기는 락 없이 수행 (volatile)

**사용 시나리오:**
- 멀티스레드 환경에서 Map 공유 시
- Collections.synchronizedMap()보다 높은 동시성 필요 시

**참고자료**
- [ConcurrentHashMap](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html)[^19]

</details>

[^19]: Oracle Java SE 17 API - ConcurrentHashMap

### JAVA-020

Java의 동기화 방법(synchronized, volatile, Atomic 클래스 등)을 설명해주세요.

<details>
<summary>답변</summary>

**1. synchronized**
- 임계 영역에 하나의 스레드만 진입
- 메서드 또는 블록 레벨 적용
- 모니터 락 기반, 상호 배제 보장

```java
synchronized void method() { }
synchronized(lock) { }
```

**2. volatile**
- 변수의 가시성(visibility) 보장
- 메인 메모리에서 직접 읽기/쓰기
- 원자성 보장 안 함 (읽기/쓰기만 원자적)

```java
volatile boolean flag = true;
```

**3. Atomic 클래스**
- CAS(Compare-And-Swap) 기반 락-프리 연산
- AtomicInteger, AtomicLong, AtomicReference 등
- 단일 변수의 원자적 연산

```java
AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();  // 원자적 증가
```

**4. java.util.concurrent.locks**
- ReentrantLock: 명시적 락, tryLock() 지원
- ReadWriteLock: 읽기/쓰기 분리 락

**참고자료**
- [Concurrency](https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html)[^20]

</details>

[^20]: Oracle Java Tutorial - Concurrency

### JAVA-021

volatile 키워드의 의미와 사용 시나리오는 무엇인가요?

<details>
<summary>답변</summary>

**의미:**
- 변수를 CPU 캐시가 아닌 메인 메모리에서 직접 읽고 씀
- 가시성(Visibility) 보장: 한 스레드의 변경이 다른 스레드에 즉시 보임
- Happens-Before 관계 보장

**보장하지 않는 것:**
- 원자성: `count++` 같은 복합 연산은 원자적이지 않음
- 상호 배제: 여러 스레드의 동시 접근 차단 안 함

**사용 시나리오:**
```java
// 1. 플래그 변수
volatile boolean running = true;
while (running) { /* 작업 */ }

// 2. Double-Checked Locking (싱글톤)
private static volatile Instance instance;
if (instance == null) {
    synchronized(lock) {
        if (instance == null) {
            instance = new Instance();
        }
    }
}
```

**주의:**
- 복합 연산에는 synchronized나 Atomic 클래스 사용
- 불필요한 volatile은 성능 저하 유발

**참고자료**
- [Atomic Access](https://docs.oracle.com/javase/tutorial/essential/concurrency/atomic.html)[^21]

</details>

[^21]: Oracle Java Tutorial - Atomic Access

### JAVA-022

Java Memory Model에 대해 설명해주세요.

<details>
<summary>답변</summary>

**JMM (Java Memory Model):**
멀티스레드 환경에서 메모리 접근 규칙을 정의한 명세 (JSR-133, Java 5+)

**핵심 개념:**

**1. 가시성 (Visibility)**
- 한 스레드의 변경이 다른 스레드에 보이는지
- CPU 캐시로 인해 보장 안 될 수 있음

**2. 재정렬 (Reordering)**
- 컴파일러/CPU가 성능 최적화를 위해 명령어 순서 변경
- 단일 스레드에서는 결과 동일 보장

**3. Happens-Before 관계**
- 연산 A가 B 전에 발생함을 보장하는 규칙
- synchronized, volatile, Thread.start(), join() 등이 보장

**주요 규칙:**
- 같은 락의 unlock → lock
- volatile 쓰기 → 읽기
- Thread.start() → 해당 스레드의 모든 동작
- 스레드의 모든 동작 → join() 리턴

**실무 영향:**
- 동기화 없이 공유 변수 접근 시 예기치 않은 결과
- synchronized, volatile, Atomic으로 해결

**참고자료**
- [JLS Chapter 17](https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html)[^22]

</details>

[^22]: Java Language Specification - Threads and Locks

### JAVA-023

ThreadLocal의 동작 원리와 주의사항은 무엇인가요?

<details>
<summary>답변</summary>

**개념:**
각 스레드가 독립적인 변수 복사본을 가지게 하는 클래스

**동작 원리:**
- 각 Thread 객체 내부에 ThreadLocalMap 존재
- ThreadLocal을 키로, 값을 저장
- 스레드별 격리된 저장 공간 제공

```java
ThreadLocal<User> userContext = new ThreadLocal<>();
userContext.set(currentUser);
User user = userContext.get();
userContext.remove();  // 반드시 정리!
```

**사용 시나리오:**
- 사용자 세션/인증 정보 전달
- 트랜잭션 컨텍스트
- SimpleDateFormat 등 스레드 안전하지 않은 객체

**주의사항:**
- **메모리 누수**: 스레드 풀 환경에서 remove() 미호출 시 누수
- 스레드 재사용 시 이전 값이 남아있을 수 있음
- try-finally로 항상 정리

```java
try {
    threadLocal.set(value);
    // 작업
} finally {
    threadLocal.remove();  // 필수!
}
```

**참고자료**
- [ThreadLocal](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/ThreadLocal.html)[^23]

</details>

[^23]: Oracle Java SE 17 API - ThreadLocal

### JAVA-024

Executor Framework와 Thread Pool에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Executor Framework:**
스레드 생성과 작업 실행을 분리한 추상화 계층 (Java 5+)

**주요 인터페이스:**
- **Executor**: 단순 실행 (execute)
- **ExecutorService**: 라이프사이클 관리, Future 반환
- **ScheduledExecutorService**: 지연/주기적 실행

**Thread Pool 종류 (Executors 팩토리):**
```java
// 고정 크기 풀
Executors.newFixedThreadPool(10);
// 캐시 풀 (0~무한, 60초 유휴 시 제거)
Executors.newCachedThreadPool();
// 단일 스레드
Executors.newSingleThreadExecutor();
// 스케줄링
Executors.newScheduledThreadPool(5);
// Work-Stealing (Java 8+)
Executors.newWorkStealingPool();
```

**ThreadPoolExecutor 파라미터:**
- corePoolSize, maximumPoolSize
- keepAliveTime, workQueue
- RejectedExecutionHandler

**실무 권장:**
- Executors 대신 ThreadPoolExecutor 직접 설정
- 적절한 큐 크기와 거부 정책 설정

**참고자료**
- [Executors](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/Executors.html)[^24]

</details>

[^24]: Oracle Java SE 17 API - Executors

### JAVA-025

Fork/Join Framework의 동작 원리를 설명해주세요.

<details>
<summary>답변</summary>

**개념:**
분할 정복(Divide and Conquer) 알고리즘을 병렬로 실행하기 위한 프레임워크 (Java 7+)

**핵심 구성:**
- **ForkJoinPool**: 작업 실행 풀
- **ForkJoinTask**: 분할 가능한 작업 (RecursiveTask/RecursiveAction)
- **Work-Stealing**: 유휴 스레드가 다른 스레드의 큐에서 작업을 훔쳐옴

**동작 원리:**
1. 작업을 작은 단위로 분할 (fork)
2. 각 서브태스크를 병렬 실행
3. 결과를 결합 (join)

```java
class SumTask extends RecursiveTask<Long> {
    protected Long compute() {
        if (size <= THRESHOLD) {
            return directSum();
        }
        SumTask left = new SumTask(leftHalf);
        SumTask right = new SumTask(rightHalf);
        left.fork();  // 비동기 실행
        return right.compute() + left.join();  // 결과 결합
    }
}
```

**Work-Stealing:**
- 각 스레드가 자체 Deque 보유
- 자신의 큐가 비면 다른 스레드 큐의 tail에서 작업 훔침
- 부하 균형 자동 조절

**참고자료**
- [ForkJoinPool](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/ForkJoinPool.html)[^25]

</details>

[^25]: Oracle Java SE 17 API - ForkJoinPool

### JAVA-026

Java의 Stream API 동작 원리와 병렬 처리 방법을 설명해주세요.

<details>
<summary>답변</summary>

**Stream API:**
컬렉션 데이터를 선언적으로 처리하는 추상화 (Java 8+)

**동작 원리:**
1. **소스**: 컬렉션, 배열, 파일 등
2. **중간 연산**: filter, map, sorted (지연 평가, Lazy)
3. **최종 연산**: collect, forEach, reduce (실행 트리거)

```java
list.stream()
    .filter(x -> x > 10)   // 중간
    .map(x -> x * 2)       // 중간
    .collect(toList());    // 최종 - 여기서 실행
```

**지연 평가 (Lazy Evaluation):**
- 최종 연산 호출 전까지 중간 연산 실행 안 함
- 파이프라인 최적화 가능 (short-circuit 등)

**병렬 처리:**
```java
list.parallelStream()
    .filter(...)
    .collect(toList());
// 또는
list.stream().parallel()
```

**병렬 스트림 주의사항:**
- 공유 가변 상태 피하기
- 작은 데이터셋은 오히려 오버헤드
- 순서 의존 연산 주의 (forEachOrdered)
- ForkJoinPool.commonPool() 사용

**참고자료**
- [Stream](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/stream/Stream.html)[^26]

</details>

[^26]: Oracle Java SE 17 API - Stream

### JAVA-027

Optional 클래스의 필요성과 올바른 사용 방법은 무엇인가요?

<details>
<summary>답변</summary>

**필요성:**
- NullPointerException 방지
- null 가능성을 명시적으로 표현
- 함수형 스타일의 null 처리

**올바른 사용:**
```java
// 생성
Optional<String> opt = Optional.ofNullable(value);
Optional<String> empty = Optional.empty();

// 값 추출
opt.orElse("default");
opt.orElseGet(() -> computeDefault());
opt.orElseThrow(() -> new Exception());

// 조건부 처리
opt.ifPresent(v -> process(v));
opt.ifPresentOrElse(v -> process(v), () -> handleEmpty());

// 변환
opt.map(String::toUpperCase)
   .filter(s -> s.length() > 5)
   .flatMap(this::findById);
```

**안티패턴 (피해야 할 것):**
- `opt.get()` 직접 호출 (NoSuchElementException 위험)
- `opt.isPresent()` + `opt.get()` 조합
- 필드 타입으로 Optional 사용
- 메서드 파라미터로 Optional 사용
- 컬렉션을 Optional로 감싸기

**권장:**
- 메서드 반환 타입으로만 사용
- 빈 컬렉션은 Optional 대신 빈 컬렉션 반환

**참고자료**
- [Optional](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Optional.html)[^27]

</details>

[^27]: Oracle Java SE 17 API - Optional

### JAVA-028

Functional Interface와 Lambda Expression에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Functional Interface:**
- 추상 메서드가 정확히 1개인 인터페이스
- @FunctionalInterface로 명시 (선택)
- 람다/메서드 참조의 타겟 타입

**주요 함수형 인터페이스:**
| 인터페이스 | 메서드 | 용도 |
|-----------|--------|------|
| Function<T,R> | R apply(T) | 변환 |
| Consumer<T> | void accept(T) | 소비 |
| Supplier<T> | T get() | 생성 |
| Predicate<T> | boolean test(T) | 조건 검사 |
| BiFunction<T,U,R> | R apply(T,U) | 이항 변환 |

**Lambda Expression:**
익명 함수의 간결한 표현 (Java 8+)

```java
// 기본 형태
(parameters) -> expression
(parameters) -> { statements; }

// 예시
Comparator<String> comp = (a, b) -> a.compareTo(b);
list.forEach(item -> System.out.println(item));

// 타입 추론
Function<String, Integer> f = s -> s.length();
```

**특징:**
- effectively final 변수만 캡처 가능
- this는 람다를 감싸는 클래스 참조

**참고자료**
- [Lambda Expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)[^28]

</details>

[^28]: Oracle Java Tutorial - Lambda Expressions

### JAVA-029

Method Reference의 종류와 사용 방법을 설명해주세요.

<details>
<summary>답변</summary>

**Method Reference:**
기존 메서드를 람다 대신 참조하는 간결한 문법 (::)

**4가지 종류:**

**1. 정적 메서드 참조**
```java
// ClassName::staticMethod
Function<String, Integer> f = Integer::parseInt;
// 동일: s -> Integer.parseInt(s)
```

**2. 특정 객체의 인스턴스 메서드**
```java
// instance::method
String str = "hello";
Supplier<Integer> s = str::length;
// 동일: () -> str.length()
```

**3. 임의 객체의 인스턴스 메서드**
```java
// ClassName::instanceMethod
Function<String, Integer> f = String::length;
// 동일: s -> s.length()

BiPredicate<String, String> bp = String::equals;
// 동일: (s1, s2) -> s1.equals(s2)
```

**4. 생성자 참조**
```java
// ClassName::new
Supplier<List<String>> s = ArrayList::new;
// 동일: () -> new ArrayList<>()

Function<String, User> f = User::new;
// 동일: name -> new User(name)
```

**사용 시점:**
람다가 단순히 기존 메서드를 호출할 때 사용하면 가독성 향상

**참고자료**
- [Method References](https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html)[^29]

</details>

[^29]: Oracle Java Tutorial - Method References

### JAVA-030

CompletableFuture의 동작 원리와 사용 방법을 설명해주세요.

<details>
<summary>답변</summary>

**개념:**
비동기 프로그래밍을 위한 Future의 확장 (Java 8+)

**기본 사용:**
```java
// 비동기 실행
CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> fetchData())  // 비동기 시작
    .thenApply(data -> process(data))  // 변환
    .thenAccept(result -> save(result));  // 소비

// 결과 대기
String result = future.get();  // 블로킹
String result = future.join();  // unchecked exception
```

**주요 메서드:**
| 메서드 | 설명 |
|--------|------|
| supplyAsync | 값 반환 비동기 실행 |
| runAsync | 값 없이 비동기 실행 |
| thenApply | 결과 변환 (map) |
| thenCompose | 결과로 새 Future 생성 (flatMap) |
| thenCombine | 두 Future 결과 결합 |
| exceptionally | 예외 처리 |
| handle | 결과/예외 모두 처리 |

**병렬 처리:**
```java
CompletableFuture.allOf(future1, future2, future3).join();
CompletableFuture.anyOf(future1, future2).get();
```

**실행 스레드:**
- 기본: ForkJoinPool.commonPool()
- 커스텀 Executor 지정 가능 (supplyAsync(task, executor))

**참고자료**
- [CompletableFuture](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/concurrent/CompletableFuture.html)[^30]

</details>

[^30]: Oracle Java SE 17 API - CompletableFuture

### JAVA-031

Java의 리플렉션(Reflection)이란 무엇이고 언제 사용하나요?

<details>
<summary>답변</summary>

**개념:**
런타임에 클래스의 메타정보를 조회하고 조작하는 API

**주요 기능:**
```java
// 클래스 정보 얻기
Class<?> clazz = Class.forName("com.example.User");
Class<?> clazz = obj.getClass();

// 필드 접근
Field field = clazz.getDeclaredField("name");
field.setAccessible(true);  // private 접근
field.set(obj, "newValue");

// 메서드 호출
Method method = clazz.getMethod("getName");
Object result = method.invoke(obj);

// 생성자로 객체 생성
Constructor<?> ctor = clazz.getConstructor(String.class);
Object instance = ctor.newInstance("arg");
```

**사용 사례:**
- 프레임워크: Spring DI, JPA, JUnit
- 직렬화/역직렬화: Jackson, Gson
- 동적 프록시 생성
- IDE 자동완성, 디버거

**단점:**
- 성능 오버헤드 (캐싱으로 완화)
- 컴파일 타임 타입 체크 불가
- 캡슐화 위반 가능

**참고자료**
- [Reflection API](https://docs.oracle.com/javase/tutorial/reflect/index.html)[^31]

</details>

[^31]: Oracle Java Tutorial - Reflection

### JAVA-032

동적 프록시(Dynamic Proxy)의 동작 원리를 설명해주세요.

<details>
<summary>답변</summary>

**개념:**
런타임에 인터페이스를 구현하는 프록시 객체를 동적으로 생성

**JDK Dynamic Proxy:**
```java
// InvocationHandler 구현
InvocationHandler handler = (proxy, method, args) -> {
    System.out.println("Before: " + method.getName());
    Object result = method.invoke(target, args);
    System.out.println("After: " + method.getName());
    return result;
};

// 프록시 생성
UserService proxy = (UserService) Proxy.newProxyInstance(
    UserService.class.getClassLoader(),
    new Class[]{UserService.class},
    handler
);
```

**동작 원리:**
1. 런타임에 $Proxy0 클래스 동적 생성
2. 지정된 인터페이스 구현
3. 모든 메서드 호출을 InvocationHandler.invoke()로 위임

**JDK Proxy vs CGLIB:**
| 구분 | JDK Proxy | CGLIB |
|------|-----------|-------|
| 대상 | 인터페이스만 | 클래스도 가능 |
| 방식 | 인터페이스 구현 | 클래스 상속 |
| 제약 | 인터페이스 필요 | final 클래스 불가 |

**사용 사례:**
- Spring AOP
- 트랜잭션 관리
- 로깅, 보안, 캐싱

**참고자료**
- [Dynamic Proxy](https://docs.oracle.com/javase/8/docs/technotes/guides/reflection/proxy.html)[^32]

</details>

[^32]: Oracle Java - Dynamic Proxy Classes

### JAVA-033

Annotation의 동작 원리와 커스텀 Annotation 작성 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Annotation:**
코드에 메타데이터를 부여하는 선언적 방법

**동작 원리:**
1. 컴파일 시 또는 런타임에 리플렉션으로 읽음
2. Retention 정책에 따라 유지 범위 결정
3. Annotation Processor 또는 리플렉션으로 처리

**커스텀 Annotation 작성:**
```java
@Target(ElementType.METHOD)  // 적용 대상
@Retention(RetentionPolicy.RUNTIME)  // 유지 정책
@Documented
public @interface MyAnnotation {
    String value() default "";
    int count() default 0;
}
```

**메타 어노테이션:**
| 어노테이션 | 설명 |
|-----------|------|
| @Target | 적용 위치 (TYPE, METHOD, FIELD 등) |
| @Retention | SOURCE, CLASS, RUNTIME |
| @Inherited | 상속 시 어노테이션 상속 |
| @Documented | Javadoc에 포함 |
| @Repeatable | 반복 적용 가능 |

**처리 방법:**
```java
// 런타임 리플렉션
if (method.isAnnotationPresent(MyAnnotation.class)) {
    MyAnnotation ann = method.getAnnotation(MyAnnotation.class);
    String value = ann.value();
}
```

**참고자료**
- [Annotations](https://docs.oracle.com/javase/tutorial/java/annotations/index.html)[^33]

</details>

[^33]: Oracle Java Tutorial - Annotations

### JAVA-034

Java의 직렬화(Serialization)와 역직렬화에 대해 설명해주세요.

<details>
<summary>답변</summary>

**개념:**
- **직렬화**: 객체를 바이트 스트림으로 변환
- **역직렬화**: 바이트 스트림을 객체로 복원

**사용 방법:**
```java
// Serializable 구현
class User implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private transient String password;  // 직렬화 제외
}

// 직렬화
try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("user.ser"))) {
    oos.writeObject(user);
}

// 역직렬화
try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("user.ser"))) {
    User user = (User) ois.readObject();
}
```

**transient 키워드:**
- 직렬화에서 제외할 필드에 사용
- 역직렬화 시 기본값으로 초기화

**주의사항:**
- 보안 취약점 (원격 코드 실행 위험)
- 버전 호환성 (serialVersionUID 필수)
- 성능 이슈

**대안:**
- JSON (Jackson, Gson)
- Protocol Buffers, Avro
- Record serialization (Java 16+)

**참고자료**
- [Object Serialization](https://docs.oracle.com/en/java/javase/17/docs/specs/serialization/index.html)[^34]

</details>

[^34]: Oracle Java Object Serialization Specification

### JAVA-035

serialVersionUID의 역할은 무엇인가요?

<details>
<summary>답변</summary>

**역할:**
직렬화된 객체의 버전을 식별하여 역직렬화 시 클래스 호환성 검증

**동작 방식:**
1. 직렬화 시 클래스의 serialVersionUID 저장
2. 역직렬화 시 현재 클래스의 serialVersionUID와 비교
3. 불일치 시 InvalidClassException 발생

```java
public class User implements Serializable {
    private static final long serialVersionUID = 1L;  // 명시적 선언
    private String name;
}
```

**명시적 선언의 중요성:**
- 선언 안 하면 컴파일러가 자동 생성 (클래스 구조 기반)
- 작은 변경에도 UID가 달라져 역직렬화 실패 위험
- IDE 경고: "serializable class does not declare a static final serialVersionUID"

**호환성 관리:**
- 필드 추가: 기본값으로 초기화 (호환)
- 필드 삭제: 무시됨 (호환)
- 필드 타입 변경: 비호환 (새 UID 필요)
- 클래스 계층 변경: 비호환

**생성 방법:**
- `serialver` 유틸리티
- IDE 자동 생성
- 임의의 long 값 (1L 권장)

**참고자료**
- [Serializable](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/io/Serializable.html)[^35]

</details>

[^35]: Oracle Java SE 17 API - Serializable

### JAVA-036

Java의 모듈 시스템(Java 9+)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**개념:**
Java 9에서 도입된 JPMS(Java Platform Module System), 프로젝트 Jigsaw

**목적:**
- 강력한 캡슐화 (public이어도 export 안 하면 접근 불가)
- 명시적 의존성 선언
- JDK 모듈화 (필요한 것만 포함)
- 런타임 이미지 최적화

**module-info.java:**
```java
module com.myapp {
    requires java.sql;           // 의존성
    requires transitive java.logging;  // 전이 의존성

    exports com.myapp.api;       // 외부 공개
    exports com.myapp.internal to com.myapp.test;  // 제한적 공개

    opens com.myapp.model to jackson.databind;  // 리플렉션 허용

    provides SomeService with MyServiceImpl;  // 서비스 제공
    uses SomeService;            // 서비스 사용
}
```

**주요 키워드:**
| 키워드 | 설명 |
|--------|------|
| requires | 모듈 의존성 |
| exports | 패키지 공개 |
| opens | 리플렉션 접근 허용 |
| provides/uses | 서비스 로더 |

**장점:**
- 더 작은 런타임 (jlink로 커스텀 JRE)
- 빠른 시작 시간
- 보안 강화

**참고자료**
- [Java Module System](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/module/package-summary.html)[^36]

</details>

[^36]: Oracle Java SE 17 - Module System

### JAVA-037

var 키워드(Java 10+)의 사용과 제한사항은 무엇인가요?

<details>
<summary>답변</summary>

**개념:**
지역 변수 타입 추론 (Local Variable Type Inference)

**사용 예시:**
```java
var list = new ArrayList<String>();  // ArrayList<String>
var stream = list.stream();          // Stream<String>
var entry = map.entrySet().iterator().next();

// for 루프
for (var item : list) { }
for (var i = 0; i < 10; i++) { }

// try-with-resources
try (var reader = new BufferedReader(...)) { }
```

**제한사항:**
```java
// 불가능한 경우
var x;                    // 초기화 필수
var x = null;             // 타입 추론 불가
var x = () -> {};         // 람다 타입 추론 불가
var x = {1, 2, 3};        // 배열 초기화 불가

// 사용 불가 위치
class MyClass {
    var field = 10;       // 필드 X
    void method(var x) {} // 파라미터 X
    var method() {}       // 반환 타입 X
}
```

**가이드라인:**
- 타입이 명확할 때 사용 (생성자, 리터럴)
- 가독성 저하 시 명시적 타입 선언
- 변수명으로 의미 전달

```java
var userMap = new HashMap<Long, User>();  // OK
var result = service.process();           // 타입 불명확
```

**참고자료**
- [Local Variable Type Inference](https://docs.oracle.com/en/java/javase/17/language/local-variable-type-inference.html)[^37]

</details>

[^37]: Oracle Java SE 17 - Local Variable Type Inference

### JAVA-038

Record 클래스(Java 14+)의 특징과 사용 시나리오를 설명해주세요.

<details>
<summary>답변</summary>

**개념:**
불변 데이터 캐리어를 간결하게 선언하는 클래스 (Java 16 정식)

**기본 문법:**
```java
public record User(String name, int age) { }

// 자동 생성되는 것들:
// - private final 필드
// - Canonical 생성자
// - name(), age() 접근자 메서드
// - equals(), hashCode(), toString()
```

**특징:**
- 암묵적으로 final (상속 불가)
- 모든 필드 final (불변)
- java.lang.Record 상속
- 인터페이스 구현 가능

**커스터마이징:**
```java
public record User(String name, int age) {
    // Compact 생성자 (유효성 검사)
    public User {
        if (age < 0) throw new IllegalArgumentException();
        name = name.trim();  // 필드 수정
    }

    // 추가 메서드
    public String displayName() {
        return name + " (" + age + ")";
    }

    // static 필드/메서드 가능
    public static User anonymous() {
        return new User("Anonymous", 0);
    }
}
```

**사용 시나리오:**
- DTO (Data Transfer Object)
- 값 객체 (Value Object)
- 다중 반환값
- 패턴 매칭과 함께 사용

**참고자료**
- [Record Classes](https://docs.oracle.com/en/java/javase/17/language/records.html)[^38]

</details>

[^38]: Oracle Java SE 17 - Record Classes

### JAVA-039

Sealed Class(Java 17+)란 무엇이고 왜 필요한가요?

<details>
<summary>답변</summary>

**개념:**
상속 가능한 클래스를 명시적으로 제한하는 기능 (Java 17 정식)

**문법:**
```java
public sealed class Shape
    permits Circle, Rectangle, Triangle {
}

public final class Circle extends Shape { }
public sealed class Rectangle extends Shape permits Square { }
public non-sealed class Triangle extends Shape { }  // 제한 해제
```

**하위 클래스 제한자:**
| 제한자 | 의미 |
|--------|------|
| final | 더 이상 상속 불가 |
| sealed | 추가 permits로 제한된 상속 |
| non-sealed | 제한 없이 상속 허용 |

**필요성:**
1. **도메인 모델링**: 타입 계층을 완전히 제어
2. **패턴 매칭**: 컴파일러가 모든 케이스 검증 가능 (exhaustiveness)
3. **API 설계**: 의도된 확장만 허용

**패턴 매칭과 함께:**
```java
static double area(Shape shape) {
    return switch (shape) {
        case Circle c -> Math.PI * c.radius() * c.radius();
        case Rectangle r -> r.width() * r.height();
        case Triangle t -> 0.5 * t.base() * t.height();
        // 모든 케이스 커버됨 - default 불필요
    };
}
```

**vs enum:**
- Sealed: 각 타입이 다른 필드/메서드 가질 수 있음
- Enum: 모든 값이 같은 구조

**참고자료**
- [Sealed Classes](https://docs.oracle.com/en/java/javase/17/language/sealed-classes-and-interfaces.html)[^39]

</details>

[^39]: Oracle Java SE 17 - Sealed Classes

### JAVA-040

Pattern Matching(Java 14+)의 개선사항을 설명해주세요.

<details>
<summary>답변</summary>

**1. Pattern Matching for instanceof (Java 16)**
```java
// 이전
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// 이후
if (obj instanceof String s) {
    System.out.println(s.length());  // 자동 캐스팅
}

// 논리 연산과 함께
if (obj instanceof String s && s.length() > 5) { }
```

**2. Pattern Matching for switch (Java 21)**
```java
static String format(Object obj) {
    return switch (obj) {
        case Integer i -> "int: " + i;
        case Long l -> "long: " + l;
        case String s -> "string: " + s;
        case null -> "null";
        default -> "unknown";
    };
}
```

**3. Record Pattern (Java 21)**
```java
record Point(int x, int y) {}

// 레코드 분해
if (obj instanceof Point(int x, int y)) {
    System.out.println(x + y);
}

// switch에서
switch (obj) {
    case Point(int x, int y) when x > 0 -> "positive x";
    case Point(int x, int y) -> "other point";
}
```

**4. Guarded Pattern (when 절)**
```java
case String s when s.length() > 10 -> "long string";
```

**장점:**
- 보일러플레이트 코드 감소
- 타입 안전성 향상
- 함수형 스타일 지원

**참고자료**
- [Pattern Matching](https://docs.oracle.com/en/java/javase/17/language/pattern-matching.html)[^40]

</details>

[^40]: Oracle Java SE 17 - Pattern Matching

## 📌 Java 기초 개념

### JAVA-041
JVM이 정확히 무엇이고, 어떤 기능을 하는지 설명해 주세요.

<details>
<summary>답변</summary>

**JVM (Java Virtual Machine):**
자바 바이트코드를 해석하고 실행하는 가상 머신

**주요 기능:**
1. **플랫폼 독립성**: "Write Once, Run Anywhere" - OS별 JVM이 바이트코드 실행
2. **메모리 관리**: 자동 메모리 할당 및 GC로 해제
3. **보안**: 바이트코드 검증, 샌드박스 실행
4. **최적화**: JIT 컴파일러로 핫스팟 코드 네이티브 변환
5. **스레드 관리**: 멀티스레딩 지원 및 동기화

**실행 흐름:**
```
.java (소스) → javac → .class (바이트코드) → JVM → 기계어 실행
```

**JVM 구현체:**
- Oracle HotSpot (가장 널리 사용)
- OpenJ9 (IBM)
- GraalVM (다국어 지원)
- Azul Zulu, Amazon Corretto

**참고자료**
- [JVM Specification](https://docs.oracle.com/javase/specs/jvms/se17/html/index.html)[^41]

</details>

[^41]: Oracle JVM Specification

### JAVA-042
그럼, 자바 말고 다른 언어는 JVM 위에 올릴 수 없나요?

<details>
<summary>답변</summary>

**가능합니다.** JVM은 바이트코드를 실행하므로, 바이트코드로 컴파일되는 언어면 모두 실행 가능합니다.

**JVM 언어들:**
| 언어 | 특징 |
|------|------|
| **Kotlin** | 안드로이드 공식 언어, Java 상호운용 |
| **Scala** | 함수형 + 객체지향, 대용량 데이터 처리 |
| **Groovy** | 동적 타이핑, 스크립팅, Gradle |
| **Clojure** | Lisp 계열 함수형 언어 |
| **JRuby** | Ruby의 JVM 구현 |
| **Jython** | Python의 JVM 구현 |

**장점:**
- JVM 생태계(라이브러리, 도구) 활용
- Java 클래스와 상호 호출 가능
- 성숙한 GC, JIT 최적화 혜택
- 크로스 플랫폼

**상호운용 예시:**
```kotlin
// Kotlin에서 Java 호출
val list = java.util.ArrayList<String>()
list.add("Hello")
```

**참고자료**
- [JVM Languages](https://en.wikipedia.org/wiki/List_of_JVM_languages)[^42]

</details>

[^42]: Wikipedia - JVM Languages

### JAVA-043
반대로 JVM 계열 언어를 일반적으로 컴파일해서 사용할 순 없나요?

<details>
<summary>답변</summary>

**가능합니다.** AOT(Ahead-Of-Time) 컴파일을 통해 네이티브 실행 파일로 변환할 수 있습니다.

**방법들:**

**1. GraalVM Native Image**
```bash
native-image -jar myapp.jar
# 결과: myapp 실행 파일 (JVM 불필요)
```
- 빠른 시작 시간 (밀리초)
- 적은 메모리 사용
- 단, 빌드 시간 길고 리플렉션 제약

**2. Kotlin Native**
- LLVM 기반 네이티브 컴파일
- iOS, macOS, Windows, Linux 지원
- JVM 없이 독립 실행

**3. Scala Native**
- LLVM 백엔드로 네이티브 컴파일

**장점:**
- JVM 워밍업 시간 제거
- 컨테이너/서버리스에 적합
- 배포 크기 감소

**단점:**
- 리플렉션, 동적 기능 제약
- 빌드 시간 증가
- 일부 라이브러리 호환성 이슈

**참고자료**
- [GraalVM Native Image](https://www.graalvm.org/latest/reference-manual/native-image/)[^43]

</details>

[^43]: GraalVM Native Image Documentation

### JAVA-044
VM을 사용함으로써 얻을 수 있는 장점과 단점에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**장점:**

1. **플랫폼 독립성**
   - 한 번 컴파일, 어디서나 실행
   - OS별 코드 수정 불필요

2. **메모리 관리**
   - 자동 GC로 메모리 누수 감소
   - 개발자가 메모리 직접 관리 불필요

3. **보안**
   - 바이트코드 검증
   - 샌드박스 실행 환경

4. **런타임 최적화**
   - JIT 컴파일러가 핫스팟 최적화
   - 프로파일링 기반 동적 최적화

5. **풍부한 생태계**
   - 표준 라이브러리, 모니터링 도구

**단점:**

1. **성능 오버헤드**
   - 네이티브 코드 대비 느릴 수 있음
   - 해석 실행 비용

2. **시작 시간**
   - JVM 워밍업, 클래스 로딩 시간
   - 서버리스/CLI에 불리

3. **메모리 사용량**
   - JVM 자체 메모리 소비
   - 객체 헤더 등 오버헤드

4. **GC 중단 (STW)**
   - 예측 불가능한 지연

**참고자료**
- [JVM Architecture](https://docs.oracle.com/javase/specs/jvms/se17/html/jvms-1.html)[^44]

</details>

[^44]: Oracle JVM Specification - Introduction

### JAVA-045
JVM과 내부에서 실행되고 있는 프로그램은 부모 프로세스 - 자식 프로세스 관계를 갖고 있다고 봐도 무방한가요?

<details>
<summary>답변</summary>

**아닙니다.** JVM과 Java 프로그램은 부모-자식 프로세스 관계가 아닙니다.

**실제 관계:**
- JVM은 하나의 **프로세스**
- Java 프로그램은 그 프로세스 내에서 실행되는 **스레드**
- 즉, **동일 프로세스 내**에서 실행됨

**프로세스 구조:**
```
OS 프로세스 (java 명령어)
├── JVM (런타임 환경)
│   ├── Main Thread (Java 애플리케이션)
│   ├── GC Thread
│   ├── JIT Compiler Thread
│   └── 기타 데몬 스레드
└── 네이티브 메모리
```

**부모-자식 프로세스와의 차이:**
| 구분 | 부모-자식 프로세스 | JVM-Java 프로그램 |
|------|-------------------|------------------|
| 메모리 | 독립 (IPC 필요) | 공유 (힙, 메서드 영역) |
| 생명주기 | 독립적 | JVM 종료 시 함께 종료 |
| 관계 | fork() | 동일 프로세스 내 스레드 |

**Runtime.exec()로 자식 프로세스 생성은 가능:**
```java
Process p = Runtime.getRuntime().exec("command");
// 이 경우 별도 프로세스 생성
```

**참고자료**
- [Process and Thread](https://docs.oracle.com/javase/tutorial/essential/concurrency/procthread.html)[^45]

</details>

[^45]: Oracle Java Tutorial - Processes and Threads

---

## 📌 Java 키워드와 객체지향

### JAVA-046
final 키워드를 사용하면, 어떤 이점이 있나요?

<details>
<summary>답변</summary>

**1. 불변성 보장**
- 변수: 재할당 방지로 실수 예방
- 안전한 공유 (멀티스레드에서 동기화 불필요)

**2. 설계 의도 명확화**
- 클래스: 상속 금지 (예: String, 보안/설계상 이유)
- 메서드: 오버라이딩 금지 (템플릿 메서드 패턴)

**3. 성능 최적화 가능성**
- 컴파일러/JIT 최적화 힌트
- 인라이닝 가능성 증가

**4. 람다/익명 클래스 캡처**
- 지역 변수 캡처 시 effectively final 필요

**사용 예:**
```java
public final class ImmutableValue {  // 상속 금지
    private final int value;  // 불변 필드

    public final int getValue() {  // 오버라이딩 금지
        return value;
    }
}
```

**가이드라인:**
- 불변 객체 설계 시 적극 활용
- 상수는 `static final` 조합
- 변경 의도 없는 지역 변수에 습관적 사용 권장

**참고자료**
- [final Keyword](https://docs.oracle.com/javase/tutorial/java/IandI/final.html)[^46]

</details>

[^46]: Oracle Java Tutorial - final Keyword

### JAVA-047
그렇다면 컴파일 과정에서, final 키워드는 다르게 취급되나요?

<details>
<summary>답변</summary>

**예, 컴파일러가 final을 특별히 처리합니다.**

**1. 상수 폴딩 (Constant Folding)**
```java
static final int MAX = 100;
int result = MAX * 2;
// 컴파일 시 → int result = 200; (상수로 치환)
```
- `static final` 기본형/String은 컴파일 타임 상수
- 사용처에 값이 직접 삽입됨 (인라이닝)

**2. 바이트코드 차이**
```java
final int x = 10;
int y = 10;
```
- 바이트코드 자체는 유사하지만, JIT 최적화에 영향

**3. final 메서드**
- `invokevirtual` 대신 더 효율적인 호출 가능
- 인라이닝 가능성 증가

**4. final 클래스**
- 하위 타입 없음 보장 → 최적화 기회

**주의:**
- `static final` 참조 타입은 상수 폴딩 안 됨
```java
static final List<String> LIST = new ArrayList<>();
// 참조는 상수, 내용물은 가변
```

**실무 영향:**
- 큰 성능 차이는 드물지만, JIT 최적화에 힌트 제공
- 코드 명확성이 더 중요한 이점

**참고자료**
- [JLS Constant Expressions](https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html#jls-15.29)[^47]

</details>

[^47]: Java Language Specification - Constant Expressions

### JAVA-048
인터페이스와 추상 클래스의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | 인터페이스 | 추상 클래스 |
|------|-----------|-------------|
| 다중 상속 | 가능 | 불가 (단일 상속) |
| 생성자 | 없음 | 있음 |
| 필드 | public static final | 모든 종류 |
| 메서드 | public abstract + default/static | 모든 종류 |
| 접근 제어자 | public만 | 모두 가능 |
| 목적 | 행위 계약 (can-do) | 공통 구현 공유 (is-a) |

**언제 사용?**

**인터페이스:**
- 관련 없는 클래스에 공통 기능 부여
- 다중 역할이 필요할 때
- API 계약 정의
```java
class Dog implements Runnable, Comparable<Dog> { }
```

**추상 클래스:**
- 밀접한 클래스 간 코드 공유
- 공통 상태(필드) 필요
- 템플릿 메서드 패턴
```java
abstract class Animal {
    protected String name;
    abstract void makeSound();
    void sleep() { /* 공통 구현 */ }
}
```

**Java 8+ 변화:**
- 인터페이스에 default 메서드로 구현 가능해져 차이 줄어듦
- 하지만 상태(인스턴스 필드) 여부가 여전히 핵심 차이

**참고자료**
- [Interfaces](https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html)[^48]

</details>

[^48]: Oracle Java Tutorial - Interfaces

### JAVA-049
왜 클래스는 단일 상속만 가능한데, 인터페이스는 2개 이상 구현이 가능할까요?

<details>
<summary>답변</summary>

**다이아몬드 문제 (Diamond Problem) 회피**

**클래스 다중 상속의 문제:**
```
       A (메서드 m())
      / \
     B   C  (둘 다 m() 오버라이드)
      \ /
       D  → 어떤 m()을 상속?
```
- 상태(필드)와 구현이 충돌
- 어느 부모의 구현을 사용할지 모호

**인터페이스가 안전한 이유:**

**1. 상태 없음**
- 인터페이스는 인스턴스 필드가 없음
- 상태 충돌 불가능

**2. 메서드 시그니처만 정의 (Java 7까지)**
- 구현이 없으니 충돌할 것이 없음

**3. Java 8+ default 메서드 충돌 해결:**
```java
interface A { default void m() { } }
interface B { default void m() { } }

class C implements A, B {
    @Override
    public void m() {
        A.super.m();  // 명시적 선택
    }
}
```
- 컴파일러가 강제로 오버라이딩 요구
- 개발자가 명시적으로 해결

**결론:**
- 클래스 다중 상속은 복잡성과 모호성 유발
- 인터페이스는 계약만 정의하므로 안전하게 다중 구현 가능

**참고자료**
- [Multiple Inheritance](https://docs.oracle.com/javase/tutorial/java/IandI/multipleinheritance.html)[^49]

</details>

[^49]: Oracle Java Tutorial - Multiple Inheritance

### JAVA-050
리플렉션에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**개념:**
런타임에 클래스의 구조(메서드, 필드, 생성자 등)를 분석하고 조작하는 기능

**핵심 클래스:**
- `Class<?>`: 클래스 메타정보
- `Method`: 메서드 정보 및 호출
- `Field`: 필드 접근 및 수정
- `Constructor`: 객체 생성

**사용 예:**
```java
// 클래스 정보 획득
Class<?> clazz = Class.forName("com.example.User");

// 메서드 호출
Method method = clazz.getMethod("getName");
Object result = method.invoke(instance);

// 필드 접근 (private 포함)
Field field = clazz.getDeclaredField("age");
field.setAccessible(true);
field.set(instance, 25);

// 객체 생성
Constructor<?> ctor = clazz.getConstructor(String.class);
Object obj = ctor.newInstance("John");
```

**사용 사례:**
- 프레임워크 (Spring, Hibernate, JUnit)
- 의존성 주입 (DI)
- ORM 매핑
- 직렬화/역직렬화
- IDE 기능 (자동완성, 리팩토링)

**참고자료**
- [Reflection API](https://docs.oracle.com/javase/tutorial/reflect/index.html)[^50]

</details>

[^50]: Oracle Java Tutorial - Reflection

### JAVA-051
의미만 들어보면 리플렉션은 보안적인 문제가 있을 가능성이 있어보이는데, 실제로 그렇게 생각하시나요? 만약 그렇다면, 어떻게 방지할 수 있을까요?

<details>
<summary>답변</summary>

**예, 보안 위험이 있습니다.**

**보안 문제:**
1. **캡슐화 위반**: private 필드/메서드 접근 가능
2. **불변 객체 변경**: final 필드도 수정 가능
3. **접근 제어 무력화**: setAccessible(true)로 모든 제한 우회
4. **악성 코드 실행**: 임의 클래스 로드 및 메서드 호출

**방지 방법:**

**1. SecurityManager (Java 17 deprecated)**
```java
System.setSecurityManager(new SecurityManager());
// ReflectPermission 제한
```

**2. 모듈 시스템 (Java 9+)**
```java
module my.module {
    exports com.api;  // public API만 공개
    // 내부 패키지는 리플렉션으로도 접근 불가
}
```

**3. setAccessible 제한**
- 모듈 경계에서 기본적으로 차단
- `--illegal-access=deny` 옵션

**4. 코드 설계**
- 신뢰할 수 없는 입력으로 Class.forName() 금지
- 화이트리스트 기반 클래스 허용

**실무 관점:**
- 내부 프레임워크/라이브러리에서는 필요악
- 외부 입력 기반 리플렉션은 위험
- Java 모듈 시스템이 현대적 해결책

**참고자료**
- [Security Manager](https://docs.oracle.com/en/java/javase/17/security/permissions-jdk.html)[^51]

</details>

[^51]: Oracle Java Security - Permissions

### JAVA-052
리플렉션을 언제 활용할 수 있을까요?

<details>
<summary>답변</summary>

**1. 프레임워크 개발**
- **Spring DI**: @Autowired로 의존성 자동 주입
- **JPA/Hibernate**: 엔티티 ↔ 테이블 매핑
- **JUnit**: @Test 메서드 자동 발견 및 실행

**2. 동적 객체 생성**
```java
// 설정 기반 객체 생성
String className = config.get("handler.class");
Class<?> clazz = Class.forName(className);
Handler handler = (Handler) clazz.getDeclaredConstructor().newInstance();
```

**3. 직렬화/역직렬화**
- Jackson, Gson이 JSON ↔ 객체 변환 시 사용
- 필드명으로 setter/getter 호출

**4. 프록시 생성**
- AOP (로깅, 트랜잭션)
- Mock 객체 (Mockito)

**5. 어노테이션 처리**
```java
for (Method m : clazz.getMethods()) {
    if (m.isAnnotationPresent(Transactional.class)) {
        // 트랜잭션 처리
    }
}
```

**6. IDE/개발도구**
- 자동완성, 리팩토링
- 디버거

**사용 시 주의:**
- 성능 오버헤드 (캐싱으로 완화)
- 컴파일 타임 체크 불가
- 꼭 필요한 경우에만 사용

**참고자료**
- [Uses of Reflection](https://docs.oracle.com/javase/tutorial/reflect/index.html)[^52]

</details>

[^52]: Oracle Java Tutorial - Reflection Uses

### JAVA-053
static class와 static method를 비교해 주세요.

<details>
<summary>답변</summary>

**Static Method:**
```java
class Calculator {
    static int add(int a, int b) {
        return a + b;
    }
}
Calculator.add(1, 2);  // 인스턴스 없이 호출
```

**특징:**
- 클래스 레벨에 속함
- 인스턴스 멤버 접근 불가 (this 없음)
- 유틸리티 메서드에 적합

---

**Static Class (Static Nested Class):**
```java
class Outer {
    static class StaticNested {
        void method() { }
    }
}
Outer.StaticNested nested = new Outer.StaticNested();
```

**특징:**
- 외부 클래스 인스턴스 없이 생성 가능
- 외부 클래스의 인스턴스 멤버 접근 불가
- static 멤버만 접근 가능

---

**비교:**

| 구분 | Static Method | Static Class |
|------|---------------|--------------|
| 대상 | 메서드 | 내부 클래스 |
| 인스턴스 필요 | 호출 시 불필요 | 생성 시 외부 인스턴스 불필요 |
| 외부 접근 | static 멤버만 | static 멤버만 |
| 용도 | 유틸리티 함수 | 논리적 그룹화, 빌더 패턴 |

**참고:** 최상위 클래스는 static 불가 (내부 클래스만 static 가능)

**참고자료**
- [Nested Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/nested.html)[^53]

</details>

[^53]: Oracle Java Tutorial - Nested Classes

### JAVA-054
static 을 사용하면 어떤 이점을 얻을 수 있나요? 어떤 제약이 걸릴까요?

<details>
<summary>답변</summary>

**이점:**

1. **메모리 효율**
   - 인스턴스 생성 없이 사용
   - 모든 인스턴스가 공유 (중복 제거)

2. **전역 접근**
   - 클래스명으로 어디서든 접근
   - 유틸리티 메서드에 적합

3. **상수 정의**
   ```java
   public static final double PI = 3.14159;
   ```

4. **팩토리 메서드**
   ```java
   public static User createAdmin() { }
   ```

---

**제약:**

1. **인스턴스 멤버 접근 불가**
   ```java
   static void method() {
       // this.field;  // 컴파일 에러
       // instanceMethod();  // 컴파일 에러
   }
   ```

2. **오버라이딩 불가**
   - 다형성 활용 제한
   - 하위 클래스에서 숨기기(hiding)만 가능

3. **테스트 어려움**
   - Mock 어려움, 상태 공유로 테스트 격리 문제

4. **메모리 누수 위험**
   - 클래스 로더 언로드 전까지 유지
   - 컬렉션에 객체 쌓이면 누수

5. **멀티스레드 동기화 필요**
   - 공유 상태이므로 동시 접근 주의

**참고자료**
- [Understanding Class Members](https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html)[^54]

</details>

[^54]: Oracle Java Tutorial - Class Members

### JAVA-055
컴파일 과정에서 static 이 어떻게 처리되는지 설명해 주세요.

<details>
<summary>답변</summary>

**컴파일 시:**

1. **static 멤버 바이트코드 생성**
   - 메서드 호출: `invokestatic` 명령어
   - 필드 접근: `getstatic`, `putstatic` 명령어

2. **상수 폴딩 (static final)**
   ```java
   static final int MAX = 100;
   int x = MAX;  // 컴파일 시 → int x = 100;
   ```

---

**클래스 로딩 시:**

1. **Method Area에 저장**
   - 클래스 메타정보와 함께 static 변수 저장
   - 모든 인스턴스가 공유

2. **초기화 순서**
   ```java
   static int a = 10;        // 1. 선언 순서대로
   static { a = 20; }        // 2. static 블록 실행
   ```

3. **clinit 메서드**
   - 컴파일러가 static 초기화 코드를 모아 `<clinit>` 생성
   - 클래스 로딩 시 한 번만 실행
   - 스레드 안전하게 동기화됨

**바이트코드 예:**
```
// static 메서드 호출
invokestatic MyClass.staticMethod()V

// static 필드 읽기
getstatic MyClass.staticField:I
```

**vs 인스턴스:**
- 인스턴스: `invokevirtual`, `getfield`
- static: `invokestatic`, `getstatic`

**참고자료**
- [JVM Initialization](https://docs.oracle.com/javase/specs/jvms/se17/html/jvms-5.html#jvms-5.5)[^55]

</details>

[^55]: Oracle JVM Specification - Initialization

---

## 📌 Java 예외 처리

### JAVA-056
Java의 Exception에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**예외 계층 구조:**
```
Throwable
├── Error (시스템 오류, 복구 불가)
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception
    ├── Checked Exception (컴파일 타임 검사)
    │   ├── IOException
    │   └── SQLException
    └── RuntimeException (Unchecked)
        ├── NullPointerException
        ├── IllegalArgumentException
        └── IndexOutOfBoundsException
```

**Exception vs Error:**
- **Exception**: 애플리케이션 레벨, 처리 가능
- **Error**: JVM/시스템 레벨, 복구 불가

**예외 처리:**
```java
try {
    riskyOperation();
} catch (SpecificException e) {
    handleSpecific(e);
} catch (Exception e) {
    handleGeneral(e);
} finally {
    cleanup();  // 항상 실행
}
```

**예외 전파:**
```java
void method() throws IOException {
    throw new IOException("File not found");
}
```

**목적:**
- 정상 흐름과 오류 처리 분리
- 오류 정보 전달 (메시지, 스택 트레이스)
- 적절한 수준에서 처리 가능

**참고자료**
- [Exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html)[^56]

</details>

[^56]: Oracle Java Tutorial - Exceptions

### JAVA-057
예외처리를 하는 세 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**1. 예외 복구 (Recovery)**
```java
int maxRetry = 3;
while (maxRetry-- > 0) {
    try {
        return connect();
    } catch (ConnectionException e) {
        Thread.sleep(1000);  // 재시도
    }
}
throw new ServiceException("Failed after retries");
```
- 예외 상황을 복구하고 정상 흐름 진행
- 재시도, 대체 값 반환 등

**2. 예외 회피 (Avoidance/Propagation)**
```java
public void method() throws IOException {
    // 처리하지 않고 호출자에게 위임
    delegate.doSomething();
}
```
- 상위 호출자에게 처리 책임 전가
- 해당 레이어에서 처리할 수 없을 때

**3. 예외 전환 (Translation)**
```java
try {
    repository.save(entity);
} catch (SQLException e) {
    throw new DataAccessException("저장 실패", e);  // 원인 포함
}
```
- 저수준 예외를 고수준으로 변환
- 추상화 수준 유지, 의미 있는 예외로 변경
- 원본 예외를 cause로 포함

**선택 기준:**
- 복구 가능? → 복구
- 상위에서 처리해야? → 회피
- 더 의미 있는 예외로? → 전환

**참고자료**
- [Catching and Handling Exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/handling.html)[^57]

</details>

[^57]: Oracle Java Tutorial - Handling Exceptions

### JAVA-058
CheckedException, UncheckedException 의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | Checked Exception | Unchecked Exception |
|------|-------------------|---------------------|
| 상속 | Exception (RuntimeException 제외) | RuntimeException |
| 컴파일 검사 | O (try-catch 또는 throws 필수) | X |
| 발생 시점 | 예측 가능한 외부 요인 | 프로그래밍 오류 |
| 복구 가능성 | 복구 시도 기대 | 버그 수정 필요 |

**Checked Exception:**
```java
// 반드시 처리해야 함
void readFile() throws IOException {  // 선언 필수
    FileReader fr = new FileReader("file.txt");
}
```
- IOException, SQLException, FileNotFoundException
- 외부 시스템 오류, 복구 가능

**Unchecked Exception:**
```java
// 처리 선택적
void divide(int a, int b) {
    return a / b;  // ArithmeticException 가능
}
```
- NullPointerException, IllegalArgumentException
- 프로그래밍 실수, 방어 코딩으로 예방

**현대적 관점:**
- Spring, JPA는 Unchecked 선호
- Checked는 과도한 보일러플레이트 유발
- 중요한 예외만 명시적 처리, 나머지는 전역 핸들러

**참고자료**
- [Checked vs Unchecked](https://docs.oracle.com/javase/tutorial/essential/exceptions/runtime.html)[^58]

</details>

[^58]: Oracle Java Tutorial - Unchecked Exceptions

### JAVA-059
예외처리가 성능에 큰 영향을 미치나요? 만약 그렇다면, 어떻게 하면 부하를 줄일 수 있을까요?

<details>
<summary>답변</summary>

**성능 영향:**
예, 예외 발생 시 상당한 오버헤드가 있습니다.

**비용 발생 원인:**
1. **스택 트레이스 생성**: 호출 스택 전체 캡처 (가장 비용 큼)
2. **예외 객체 생성**: 힙 메모리 할당
3. **스택 언와인딩**: catch 블록 탐색

**측정:**
- 정상 흐름 대비 수십~수백 배 느림
- fillInStackTrace()가 대부분의 비용

---

**부하 줄이는 방법:**

**1. 예외를 제어 흐름으로 사용 금지**
```java
// Bad
try {
    int i = 0;
    while(true) array[i++]++;
} catch (ArrayIndexOutOfBoundsException e) { }

// Good
for (int i = 0; i < array.length; i++) array[i]++;
```

**2. 스택 트레이스 생략 (성능 중시 시)**
```java
public class FastException extends RuntimeException {
    @Override
    public Throwable fillInStackTrace() {
        return this;  // 스택 트레이스 생략
    }
}
```

**3. 예외 재사용 (특수 상황)**
```java
private static final Exception CACHED = new Exception();
```

**4. 예외 발생 조건 사전 검사**
```java
if (value == null) return Optional.empty();
```

**결론:**
- 정상 흐름에서 예외 사용 금지
- 예외는 진정한 예외 상황에만

**참고자료**
- [Exception Performance](https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html)[^59]

</details>

[^59]: Oracle Java Tutorial - Exceptions

---

## 📌 Java 동시성과 스레드

### JAVA-060
Synchronized 키워드에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**개념:**
임계 영역(Critical Section)에 하나의 스레드만 진입하도록 보장하는 키워드

**동작 원리:**
- 모니터 락(Monitor Lock) 기반
- 락 획득 → 코드 실행 → 락 해제
- 다른 스레드는 락 획득까지 대기 (blocking)

**사용 방법:**
```java
// 1. 인스턴스 메서드 (this 락)
public synchronized void method() { }

// 2. 정적 메서드 (Class 객체 락)
public static synchronized void staticMethod() { }

// 3. 블록 (명시적 락 객체)
public void method() {
    synchronized (lockObject) {
        // 임계 영역
    }
}
```

**보장하는 것:**
- **상호 배제**: 한 번에 한 스레드만
- **가시성**: 락 해제 시 변경사항 다른 스레드에 보임
- **Happens-Before**: 락 해제 → 락 획득 순서 보장

**특징:**
- 재진입 가능 (같은 스레드가 락을 다시 획득 가능)
- 자동 락 해제 (예외 발생해도)

**참고자료**
- [Synchronized Methods](https://docs.oracle.com/javase/tutorial/essential/concurrency/syncmeth.html)[^60]

</details>

[^60]: Oracle Java Tutorial - Synchronized Methods

### JAVA-061
Synchronized 키워드가 어디에 붙는지에 따라 의미가 약간씩 변화하는데, 각각 어떤 의미를 갖게 되는지 설명해 주세요.

<details>
<summary>답변</summary>

**1. 인스턴스 메서드**
```java
public synchronized void method() { }
// 동일: synchronized(this) { ... }
```
- 락 객체: **this** (현재 인스턴스)
- 같은 인스턴스의 synchronized 메서드끼리 상호 배제
- 다른 인스턴스는 동시 실행 가능

**2. 정적 메서드**
```java
public static synchronized void method() { }
// 동일: synchronized(MyClass.class) { ... }
```
- 락 객체: **Class 객체** (MyClass.class)
- 모든 인스턴스에서 상호 배제
- 인스턴스 메서드와는 다른 락

**3. synchronized 블록**
```java
synchronized (lockObject) {
    // 임계 영역
}
```
- 락 객체: **명시한 객체**
- 세밀한 제어 가능
- 필요한 부분만 동기화

**주의:**
```java
class Counter {
    synchronized void inc() { }       // this 락
    static synchronized void dec() { } // Counter.class 락
    // 이 둘은 다른 락이므로 동시 실행 가능!
}
```

**권장:**
- 메서드 전체보다 블록 동기화 선호 (범위 최소화)
- private final 락 객체 사용

**참고자료**
- [Intrinsic Locks](https://docs.oracle.com/javase/tutorial/essential/concurrency/locksync.html)[^61]

</details>

[^61]: Oracle Java Tutorial - Intrinsic Locks

### JAVA-062
효율적인 코드 작성 측면에서, Synchronized는 좋은 키워드일까요?

<details>
<summary>답변</summary>

**장점:**
- 사용이 간단하고 직관적
- 자동 락 해제 (예외 시에도)
- 재진입 가능
- JVM 최적화 (바이어스 락, 경량 락)

**단점:**

1. **유연성 부족**
   - tryLock (타임아웃) 불가
   - 공정성 설정 불가
   - 조건 분기 어려움

2. **성능 제한**
   - 읽기-읽기도 블로킹
   - 블록 단위로만 해제

3. **데드락 위험**
   - 락 순서 제어 어려움
   - 대기 중 인터럽트 불가

**언제 사용?**
- 단순한 동기화
- 짧은 임계 영역
- 복잡한 동기화 불필요 시

**대안 고려:**
```java
// 읽기 많을 때
ReadWriteLock rwLock = new ReentrantReadWriteLock();

// 타임아웃 필요
if (lock.tryLock(1, TimeUnit.SECONDS)) { }

// 단일 변수
AtomicInteger counter = new AtomicInteger();
```

**결론:**
- 단순한 케이스에는 충분히 좋음
- 복잡한 동기화는 java.util.concurrent 활용

**참고자료**
- [High Level Concurrency](https://docs.oracle.com/javase/tutorial/essential/concurrency/highlevel.html)[^62]

</details>

[^62]: Oracle Java Tutorial - High Level Concurrency

### JAVA-063
Synchronized 를 대체할 수 있는 자바의 다른 동기화 기법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**1. ReentrantLock**
```java
Lock lock = new ReentrantLock();
lock.lock();
try {
    // 임계 영역
} finally {
    lock.unlock();
}

// tryLock으로 타임아웃
if (lock.tryLock(1, TimeUnit.SECONDS)) { }
```
- 명시적 락/언락
- tryLock, 인터럽트 지원
- 공정성 설정 가능

**2. ReadWriteLock**
```java
ReadWriteLock rwLock = new ReentrantReadWriteLock();
rwLock.readLock().lock();   // 읽기 - 동시 가능
rwLock.writeLock().lock();  // 쓰기 - 배타적
```
- 읽기 작업 많을 때 성능 향상

**3. Atomic 클래스**
```java
AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();  // 락 없이 원자적
count.compareAndSet(expect, update);  // CAS
```
- 락 프리(Lock-free)
- 단일 변수 원자적 연산

**4. volatile**
```java
volatile boolean flag = true;
```
- 가시성 보장
- 단순 읽기/쓰기만 원자적

**5. StampedLock (Java 8+)**
- 낙관적 읽기 지원
- 높은 성능

**선택 기준:**
| 상황 | 권장 |
|------|------|
| 단순 동기화 | synchronized |
| 복잡한 제어 | ReentrantLock |
| 읽기 위주 | ReadWriteLock |
| 단일 변수 | Atomic |

**참고자료**
- [Lock Objects](https://docs.oracle.com/javase/tutorial/essential/concurrency/newlocks.html)[^63]

</details>

[^63]: Oracle Java Tutorial - Lock Objects

### JAVA-064
Thread Local에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**개념:**
각 스레드가 독립적인 변수 복사본을 가지게 하는 클래스

**사용법:**
```java
ThreadLocal<User> userContext = ThreadLocal.withInitial(() -> null);

// 값 설정
userContext.set(currentUser);

// 값 조회
User user = userContext.get();

// 반드시 제거 (메모리 누수 방지)
userContext.remove();
```

**동작 원리:**
- 각 Thread 내부에 ThreadLocalMap 존재
- ThreadLocal 객체를 키로, 값을 저장
- 스레드별 격리된 저장 공간

**사용 사례:**
- 사용자 세션/인증 정보 (SecurityContextHolder)
- 트랜잭션 컨텍스트
- 포맷터 (SimpleDateFormat - 스레드 안전하지 않음)
- 요청별 로깅 컨텍스트

**주의사항:**
```java
try {
    threadLocal.set(value);
    process();
} finally {
    threadLocal.remove();  // 필수!
}
```
- 스레드 풀 환경에서 remove() 안 하면 메모리 누수
- 이전 요청 데이터가 남아 보안 문제 가능

**InheritableThreadLocal:**
- 자식 스레드에 값 상속

**참고자료**
- [ThreadLocal](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/ThreadLocal.html)[^64]

</details>

[^64]: Oracle Java SE 17 API - ThreadLocal

---

## 📌 Java Stream과 함수형 프로그래밍

### JAVA-065
Java Stream에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**개념:**
데이터 컬렉션을 선언적으로 처리하는 API (Java 8+)

**특징:**
- 데이터 소스를 변경하지 않음 (불변)
- 일회용 (한 번 사용 후 재사용 불가)
- 지연 평가 (Lazy Evaluation)
- 내부 반복 (명시적 루프 없음)

**구조:**
```java
list.stream()              // 1. 소스
    .filter(x -> x > 10)   // 2. 중간 연산 (Lazy)
    .map(x -> x * 2)       // 2. 중간 연산 (Lazy)
    .collect(toList());    // 3. 최종 연산 (실행)
```

**중간 연산:**
- filter, map, flatMap, sorted, distinct, limit, skip
- 지연 평가됨 (최종 연산 전까지 실행 안 함)

**최종 연산:**
- collect, forEach, reduce, count, findFirst, anyMatch
- 실행을 트리거하고 결과 반환

**장점:**
- 가독성 향상 (선언적)
- 병렬 처리 쉬움 (parallelStream)
- 파이프라인 최적화

**주의:**
- 부작용(side-effect) 피하기
- 무한 스트림 주의 (limit 필수)

**참고자료**
- [Stream API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/stream/Stream.html)[^65]

</details>

[^65]: Oracle Java SE 17 API - Stream

### JAVA-066
Stream과 for ~ loop의 성능 차이를 비교해 주세요,

<details>
<summary>답변</summary>

**일반적 성능 비교:**

| 구분 | for-loop | Stream |
|------|----------|--------|
| 단순 반복 | 빠름 | 약간 느림 |
| 복잡한 파이프라인 | 유사 | 유사 |
| 병렬 처리 | 직접 구현 | parallelStream |
| JIT 최적화 | 최적화됨 | 추가 오버헤드 |

**Stream 오버헤드 원인:**
- 람다 호출 비용
- 중간 객체 생성 (박싱/언박싱)
- 파이프라인 구축 비용

**성능 차이 예:**
```java
// for-loop (빠름)
int sum = 0;
for (int i : array) sum += i;

// Stream (약간 느림)
int sum = Arrays.stream(array).sum();
```

**실무 관점:**
- 성능 차이는 대부분 미미 (1.5~2배)
- 가독성과 유지보수성이 더 중요
- 핫 코드에서만 최적화 고려

**Stream이 유리한 경우:**
- 복잡한 데이터 변환
- 병렬 처리 필요
- 가독성 중시

**for-loop이 유리한 경우:**
- 단순 반복
- 극한의 성능 필요
- 조기 종료가 복잡할 때

**결론:** 대부분 Stream 사용, 성능 이슈 시 프로파일링 후 판단

**참고자료**
- [Stream Performance](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/stream/package-summary.html)[^66]

</details>

[^66]: Oracle Java SE 17 - Stream Package

### JAVA-067
Stream은 병렬처리 할 수 있나요?

<details>
<summary>답변</summary>

**예, parallelStream으로 병렬 처리 가능합니다.**

```java
// 병렬 스트림 생성
list.parallelStream()
    .filter(x -> x > 10)
    .map(this::process)
    .collect(toList());

// 또는 기존 스트림을 병렬로 변환
list.stream().parallel()
```

**동작 원리:**
- ForkJoinPool.commonPool() 사용
- 데이터를 분할(split)하여 병렬 처리
- 결과를 결합(combine)

**효과적인 경우:**
- 대용량 데이터
- 요소당 처리 비용이 높은 연산
- 독립적인 연산 (상태 없음)
- 분할하기 좋은 소스 (배열, ArrayList)

**비효율적인 경우:**
- 작은 데이터셋 (오버헤드 > 이득)
- 순서 의존적 연산
- 공유 상태 접근
- LinkedList (분할 비용 높음)
- I/O 작업 (블로킹)

**주의사항:**
```java
// Bad - 공유 상태 변경
List<Integer> result = new ArrayList<>();
list.parallelStream().forEach(x -> result.add(x));  // 동기화 문제

// Good - collect 사용
List<Integer> result = list.parallelStream().collect(toList());
```

**참고자료**
- [Parallelism](https://docs.oracle.com/javase/tutorial/collections/streams/parallelism.html)[^67]

</details>

[^67]: Oracle Java Tutorial - Parallelism

### JAVA-068
Stream에서 사용할 수 있는 함수형 인터페이스에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**주요 함수형 인터페이스:**

| 인터페이스 | 메서드 | 용도 | Stream 메서드 |
|-----------|--------|------|--------------|
| Predicate<T> | boolean test(T) | 조건 검사 | filter |
| Function<T,R> | R apply(T) | 변환 | map |
| Consumer<T> | void accept(T) | 소비 | forEach |
| Supplier<T> | T get() | 생성 | generate |
| BiFunction<T,U,R> | R apply(T,U) | 이항 변환 | reduce |
| BinaryOperator<T> | T apply(T,T) | 같은 타입 결합 | reduce |
| UnaryOperator<T> | T apply(T) | 같은 타입 변환 | iterate |

**사용 예:**
```java
// Predicate - filter
stream.filter(x -> x > 10)

// Function - map
stream.map(String::toUpperCase)

// Consumer - forEach
stream.forEach(System.out::println)

// BinaryOperator - reduce
stream.reduce(0, (a, b) -> a + b)

// Comparator - sorted
stream.sorted(Comparator.comparing(User::getName))
```

**기본형 특화 (박싱 회피):**
- IntPredicate, LongFunction, DoubleConsumer
- ToIntFunction, ToDoubleFunction

```java
IntStream.range(1, 100)
    .filter(n -> n % 2 == 0)  // IntPredicate
    .sum();
```

**참고자료**
- [java.util.function](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/package-summary.html)[^68]

</details>

[^68]: Oracle Java SE 17 - Function Package

### JAVA-069
가끔 외부 변수를 사용할 때, final 키워드를 붙여서 사용하는데 왜 그럴까요? 꼭 그래야 할까요?

<details>
<summary>답변</summary>

**이유: Effectively Final 규칙**

람다나 익명 클래스에서 외부 지역 변수를 캡처할 때, 해당 변수는 **final이거나 effectively final**이어야 합니다.

**effectively final:**
- final 키워드는 없지만 값이 변경되지 않는 변수
- Java 8부터 명시적 final 불필요

```java
int count = 10;  // effectively final (수정 안 함)
list.forEach(x -> System.out.println(x + count));  // OK

int count = 10;
count = 20;  // 수정됨 - 더 이상 effectively final 아님
list.forEach(x -> System.out.println(x + count));  // 컴파일 에러!
```

**왜 이런 제약이 있을까?**
1. **값 캡처**: 람다는 변수의 복사본을 캡처
2. **동시성 안전**: 람다가 다른 스레드에서 실행될 수 있음
3. **혼란 방지**: 외부 변수 변경 시 어느 값이 캡처되었는지 불명확

**우회 방법:**
```java
// AtomicInteger 사용
AtomicInteger count = new AtomicInteger(0);
list.forEach(x -> count.incrementAndGet());

// 배열 사용 (권장하지 않음)
int[] count = {0};
list.forEach(x -> count[0]++);
```

**결론:**
- 명시적 final은 선택 (가독성 위해 권장)
- 변수 값을 변경하면 컴파일 에러

**참고자료**
- [Lambda Expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html)[^69]

</details>

[^69]: Oracle Java Tutorial - Lambda Expressions

---

## 📌 Java 가비지 컬렉션

### JAVA-070
Java의 GC에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**개념:**
Garbage Collection - 사용하지 않는 객체의 메모리를 자동으로 해제하는 JVM 기능

**동작 원리 (Mark & Sweep):**
1. **Mark**: GC Root에서 참조 가능한 객체를 마킹
2. **Sweep**: 마킹되지 않은 객체를 제거
3. **Compact**: 메모리 단편화 방지를 위해 압축 (선택적)

**GC Root:**
- Stack의 지역 변수
- Static 변수
- JNI 참조
- 실행 중인 스레드

**세대별 GC (Generational GC):**
- **Young Generation**: 새 객체, Minor GC (빈번, 빠름)
  - Eden: 객체 최초 생성
  - Survivor (S0, S1): Eden에서 살아남은 객체
- **Old Generation**: 오래 살아남은 객체, Major GC (드묾, 느림)

**GC 종류:**
| GC | 특징 |
|----|------|
| Serial | 단일 스레드, 소규모 |
| Parallel | 멀티 스레드, 처리량 최적화 |
| G1 | Region 기반, Java 9+ 기본 |
| ZGC | 초저지연 (< 10ms) |

**참고자료**
- [Garbage Collection](https://docs.oracle.com/en/java/javase/17/gctuning/introduction-garbage-collection-tuning.html)[^70]

</details>

[^70]: Oracle Java GC Tuning Guide

### JAVA-071
finalize() 를 수동으로 호출하는 것은 왜 문제가 될 수 있을까요?

<details>
<summary>답변</summary>

**finalize()란:**
- Object 클래스의 메서드
- GC가 객체 수거 전 호출 (Java 9부터 deprecated)

**문제점:**

**1. 실행 보장 없음**
- GC가 언제 실행될지 모름
- finalize()가 호출 안 될 수도 있음

**2. 성능 저하**
- finalize()가 있는 객체는 별도 큐에서 관리
- 최소 2번의 GC 사이클 필요
- 객체 수명 연장

**3. 예외 무시**
- finalize()에서 발생한 예외는 무시됨
- 디버깅 어려움

**4. 부활 가능 (Resurrection)**
```java
protected void finalize() {
    staticRef = this;  // 객체가 다시 참조됨
}
```

**5. 순서 보장 없음**
- 어떤 순서로 호출될지 불명확

**6. 스레드 안전성 문제**
- Finalizer 스레드에서 실행

**대안:**
```java
// try-with-resources (권장)
try (Resource r = new Resource()) { }

// Cleaner API (Java 9+)
Cleaner cleaner = Cleaner.create();
cleaner.register(object, cleanAction);
```

**참고자료**
- [Effective Java - Avoid finalizers](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#finalize())[^71]

</details>

[^71]: Oracle Java SE 17 API - Object.finalize()

### JAVA-072
어떤 변수의 값이 null이 되었다면, 이 값은 GC가 될 가능성이 있을까요?

<details>
<summary>답변</summary>

**가능성은 있지만, 보장되지 않습니다.**

**GC 대상이 되려면:**
객체가 어떤 GC Root에서도 도달 불가능(unreachable)해야 함

**null 할당만으로는 불충분한 경우:**

**1. 다른 참조가 존재**
```java
Object obj = new Object();
Object other = obj;  // 다른 참조
obj = null;          // obj만 null
// other가 여전히 참조 → GC 대상 아님
```

**2. 컬렉션에 포함**
```java
List<Object> list = new ArrayList<>();
list.add(obj);
obj = null;
// list가 여전히 참조 → GC 대상 아님
```

**3. 클로저에 캡처**
```java
Object obj = new Object();
Runnable r = () -> System.out.println(obj);
obj = null;
// 람다가 obj 캡처 → GC 대상 아님
```

**GC 대상이 되는 경우:**
```java
Object obj = new Object();
obj = null;  // 유일한 참조
// 다음 GC 사이클에서 수거 가능 (보장은 아님)
```

**주의:**
- GC 시점은 JVM이 결정
- `System.gc()`는 힌트일 뿐, 강제 아님
- null 할당보다 스코프를 좁히는 것이 좋은 습관

**참고자료**
- [Memory Management](https://docs.oracle.com/javase/specs/jls/se17/html/jls-12.html#jls-12.6)[^72]

</details>

[^72]: Java Language Specification - Finalization

---

## 📌 Java 메서드 오버라이딩

### JAVA-073
equals()와 hashcode()에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**equals():**
두 객체의 **논리적 동등성**을 비교

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof User)) return false;
    User user = (User) o;
    return Objects.equals(id, user.id);
}
```

**hashCode():**
객체를 해시 기반 컬렉션에서 사용하기 위한 **정수값 반환**

```java
@Override
public int hashCode() {
    return Objects.hash(id);
}
```

**계약 (Contract):**
1. equals()가 true면 hashCode()도 같아야 함 (필수!)
2. hashCode()가 같아도 equals()는 다를 수 있음
3. equals()가 false여도 hashCode()는 같을 수 있음 (충돌)

**위반 시 문제:**
```java
// hashCode() 미구현 시
Set<User> set = new HashSet<>();
set.add(new User("id1"));
set.contains(new User("id1"));  // false! (해시값 다름)
```

**해시 기반 컬렉션 동작:**
1. hashCode()로 버킷 찾기
2. 버킷 내에서 equals()로 비교

**참고자료**
- [Object.equals()](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object))[^73]

</details>

[^73]: Oracle Java SE 17 API - Object

### JAVA-074
본인이 hashcode() 를 정의해야 한다면, 어떤 점을 염두에 두고 구현할 것 같으세요?

<details>
<summary>답변</summary>

**구현 원칙:**

**1. equals()와 일관성**
- equals()에 사용된 필드만 hashCode()에 사용
- equals()가 true면 hashCode()도 같아야 함

**2. 좋은 분산**
- 해시 충돌 최소화
- 다른 객체는 다른 해시값을 가지도록

**3. 불변 필드 사용**
- 가변 필드 사용 시 컬렉션에서 문제

**구현 방법:**

**권장: Objects.hash() 사용**
```java
@Override
public int hashCode() {
    return Objects.hash(name, age, email);
}
```

**수동 구현 (성능 중시):**
```java
@Override
public int hashCode() {
    int result = 17;  // 초기값 (소수)
    result = 31 * result + (name != null ? name.hashCode() : 0);
    result = 31 * result + age;
    result = 31 * result + (email != null ? email.hashCode() : 0);
    return result;
}
```

**왜 31인가?**
- 소수: 분산 좋음
- `31 * i == (i << 5) - i`: JVM 최적화

**주의:**
- null 필드 처리 (0 또는 무시)
- 배열: Arrays.hashCode() 사용
- 캐싱 고려 (불변 객체에서)

**참고자료**
- [Objects.hash()](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Objects.html#hash(java.lang.Object...))[^74]

</details>

[^74]: Oracle Java SE 17 API - Objects.hash()

### JAVA-075
그렇다면 equals() 를 재정의 해야 할 때, 어떤 점을 염두에 두어야 하는지 설명해 주세요.

<details>
<summary>답변</summary>

**equals() 규약 (5가지):**

**1. 반사성 (Reflexive)**
```java
x.equals(x) == true
```

**2. 대칭성 (Symmetric)**
```java
x.equals(y) == y.equals(x)
```

**3. 추이성 (Transitive)**
```java
x.equals(y) && y.equals(z) → x.equals(z)
```

**4. 일관성 (Consistent)**
- 객체 변경 없으면 항상 같은 결과

**5. null 비교**
```java
x.equals(null) == false
```

**구현 패턴:**
```java
@Override
public boolean equals(Object o) {
    // 1. 동일 객체 체크
    if (this == o) return true;

    // 2. 타입 체크 (null 체크 포함)
    if (!(o instanceof User)) return false;

    // 3. 캐스팅
    User user = (User) o;

    // 4. 핵심 필드 비교
    return Objects.equals(id, user.id) &&
           Objects.equals(name, user.name);
}
```

**주의사항:**
- getClass() vs instanceof: 상속 시 행동 다름
- 부동소수점: Float.compare(), Double.compare() 사용
- hashCode()도 함께 재정의
- 상속 시 대칭성 주의

**Lombok/IDE 활용:**
```java
@EqualsAndHashCode  // Lombok
```

**참고자료**
- [Effective Java - equals](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object))[^75]

</details>

[^75]: Oracle Java SE 17 API - Object.equals()

---

## 📌 JavaScript / TypeScript

### JS-001

JavaScript의 데이터 타입에 대해 설명해주세요.

<details>
<summary>답변</summary>

**원시 타입 (Primitive, 7가지):**

| 타입 | 설명 | 예시 |
|------|------|------|
| number | 정수/실수 (64비트 부동소수점) | 42, 3.14, NaN, Infinity |
| string | 문자열 | 'hello', "world", \`template\` |
| boolean | 논리값 | true, false |
| null | 의도적 빈 값 | null |
| undefined | 미정의 값 | undefined |
| symbol | 고유 식별자 (ES6) | Symbol('id') |
| bigint | 큰 정수 (ES2020) | 9007199254740991n |

**참조 타입 (Reference):**
- Object, Array, Function, Date, RegExp, Map, Set 등

**타입 확인:**
```javascript
typeof 42          // "number"
typeof "hello"     // "string"
typeof null        // "object" (역사적 버그)
typeof undefined   // "undefined"
typeof Symbol()    // "symbol"
Array.isArray([])  // true
```

**원시 vs 참조:**
- 원시: 값 복사, 불변
- 참조: 주소 복사, 가변

**참고자료**
- [Data Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)[^js1]

</details>

[^js1]: MDN - JavaScript Data Types

### JS-002

var, let, const의 차이점과 호이스팅에 대해 설명해주세요.

<details>
<summary>답변</summary>

| 구분 | var | let | const |
|------|-----|-----|-------|
| 스코프 | 함수 스코프 | 블록 스코프 | 블록 스코프 |
| 재선언 | 가능 | 불가 | 불가 |
| 재할당 | 가능 | 가능 | 불가 |
| 호이스팅 | O (undefined) | O (TDZ) | O (TDZ) |

**호이스팅 (Hoisting):**
선언이 스코프 최상단으로 끌어올려지는 것처럼 동작

```javascript
// var - 선언 호이스팅, undefined로 초기화
console.log(x);  // undefined
var x = 5;

// let/const - 선언 호이스팅, 초기화 안 됨 (TDZ)
console.log(y);  // ReferenceError
let y = 5;
```

**TDZ (Temporal Dead Zone):**
- 스코프 시작 ~ 변수 선언까지의 구간
- 이 구간에서 접근 시 ReferenceError

**권장사항:**
- `const` 기본 사용
- 재할당 필요시 `let`
- `var` 사용 지양

```javascript
const obj = { a: 1 };
obj.a = 2;       // OK (내부 값 변경)
obj = { b: 2 };  // Error (참조 재할당)
```

**참고자료**
- [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)[^js2]

</details>

[^js2]: MDN - let statement

### JS-003

실행 컨텍스트와 스코프 체인에 대해 설명해주세요.

<details>
<summary>답변</summary>

**실행 컨텍스트 (Execution Context):**
코드 실행에 필요한 환경 정보를 담은 객체

**구성 요소:**
- **Variable Environment**: 변수/함수 선언, 호이스팅
- **Lexical Environment**: 현재 환경 + 외부 환경 참조
- **This Binding**: this 값

**종류:**
1. Global Execution Context (전역)
2. Function Execution Context (함수 호출마다)
3. Eval Execution Context

**콜 스택:**
```javascript
function a() { b(); }
function b() { console.log('b'); }
a();
// 스택: Global → a() → b()
```

---

**스코프 체인 (Scope Chain):**
변수를 찾기 위해 현재 스코프 → 상위 스코프 → 전역까지 탐색

```javascript
const global = 'global';
function outer() {
    const outerVar = 'outer';
    function inner() {
        const innerVar = 'inner';
        console.log(innerVar);  // inner (현재)
        console.log(outerVar);  // outer (상위)
        console.log(global);    // global (전역)
    }
    inner();
}
```

**렉시컬 스코프:**
- 함수 정의 시점의 스코프가 기준
- 호출 위치가 아닌 선언 위치 기준

**참고자료**
- [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)[^js3]

</details>

[^js3]: MDN - Closures

### JS-004

클로저(Closure)란 무엇이고 어떻게 활용할 수 있나요?

<details>
<summary>답변</summary>

**클로저:**
함수가 자신이 선언된 렉시컬 환경을 기억하여, 외부 함수 실행이 끝나도 외부 변수에 접근 가능한 것

```javascript
function createCounter() {
    let count = 0;  // 외부 변수
    return function() {
        return ++count;  // 외부 변수 접근
    };
}
const counter = createCounter();
counter();  // 1
counter();  // 2 (count가 유지됨)
```

**활용 사례:**

**1. 데이터 은닉 (캡슐화)**
```javascript
function createPerson(name) {
    let _age = 0;  // private
    return {
        getName: () => name,
        getAge: () => _age,
        setAge: (age) => { _age = age; }
    };
}
```

**2. 함수 팩토리**
```javascript
function multiply(x) {
    return (y) => x * y;
}
const double = multiply(2);
double(5);  // 10
```

**3. 이벤트 핸들러**
```javascript
function setupButton(id) {
    document.getElementById(id).onclick = () => {
        console.log(`Button ${id} clicked`);
    };
}
```

**4. 커링**
```javascript
const add = (a) => (b) => a + b;
add(1)(2);  // 3
```

**주의:**
- 메모리 누수 가능 (불필요한 참조 유지)
- 루프에서 var 사용 시 문제 (let 또는 IIFE 사용)

**참고자료**
- [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)[^js4]

</details>

[^js4]: MDN - Closures

### JS-005

this 바인딩의 종류와 동작 원리를 설명해주세요.

<details>
<summary>답변</summary>

**this는 함수 호출 방식에 따라 결정됩니다.**

**1. 기본 바인딩 (단독 호출)**
```javascript
function fn() { console.log(this); }
fn();  // window (strict mode: undefined)
```

**2. 암시적 바인딩 (메서드 호출)**
```javascript
const obj = {
    name: 'obj',
    fn() { console.log(this.name); }
};
obj.fn();  // 'obj' (호출 객체)
```

**3. 명시적 바인딩 (call, apply, bind)**
```javascript
function fn() { console.log(this.name); }
const obj = { name: 'obj' };

fn.call(obj);     // 'obj' (즉시 호출)
fn.apply(obj);    // 'obj' (즉시 호출)
fn.bind(obj)();   // 'obj' (바인딩된 함수 반환)
```

**4. new 바인딩**
```javascript
function Person(name) {
    this.name = name;
}
const p = new Person('John');  // this = 새 객체
```

**5. 화살표 함수 (렉시컬 this)**
```javascript
const obj = {
    fn: function() {
        const arrow = () => console.log(this);
        arrow();  // obj (상위 스코프의 this)
    }
};
```

**우선순위:**
new > 명시적(bind) > 암시적 > 기본

**주의: this 소실**
```javascript
const obj = { fn() { console.log(this); } };
const fn = obj.fn;
fn();  // window (암시적 바인딩 소실)
```

**참고자료**
- [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)[^js5]

</details>

[^js5]: MDN - this

### JS-006

화살표 함수와 일반 함수의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | 일반 함수 | 화살표 함수 |
|------|----------|-------------|
| this | 호출 방식에 따라 결정 | 렉시컬 (선언 시점) |
| arguments | 있음 | 없음 |
| new 가능 | 가능 | 불가 |
| prototype | 있음 | 없음 |
| 생성자 | 가능 | 불가 |

**this 차이:**
```javascript
const obj = {
    name: 'obj',
    regular() {
        console.log(this.name);  // 'obj'
    },
    arrow: () => {
        console.log(this.name);  // undefined (외부 this)
    }
};
```

**arguments 없음:**
```javascript
const arrow = () => {
    console.log(arguments);  // ReferenceError
};
// 대신 rest 파라미터 사용
const arrow = (...args) => console.log(args);
```

**생성자 불가:**
```javascript
const Arrow = () => {};
new Arrow();  // TypeError: not a constructor
```

**화살표 함수 적합한 경우:**
- 콜백 함수 (map, filter 등)
- this를 바인딩하지 않아야 할 때

**일반 함수 적합한 경우:**
- 메서드 정의
- 생성자 함수
- arguments 필요 시

**참고자료**
- [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)[^js6]

</details>

[^js6]: MDN - Arrow Functions

### JS-007

프로토타입 체인과 상속에 대해 설명해주세요.

<details>
<summary>답변</summary>

**프로토타입:**
모든 객체는 [[Prototype]] 내부 슬롯을 가지며, 다른 객체를 참조

**프로토타입 체인:**
객체의 프로퍼티 접근 시 해당 객체 → [[Prototype]] → ... → null 까지 탐색

```javascript
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    console.log(this.name + ' speaks');
};

const dog = new Animal('Dog');
dog.speak();  // 'Dog speaks'

// 체인: dog → Animal.prototype → Object.prototype → null
```

**프로토타입 접근:**
```javascript
dog.__proto__          // Animal.prototype (비표준)
Object.getPrototypeOf(dog)  // Animal.prototype (표준)
Animal.prototype       // 생성자의 prototype
```

**프로토타입 상속:**
```javascript
function Dog(name) {
    Animal.call(this, name);  // 생성자 호출
}
Dog.prototype = Object.create(Animal.prototype);  // 프로토타입 연결
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
    console.log('Woof!');
};
```

**ES6 Class로 동일 구현:**
```javascript
class Animal {
    constructor(name) { this.name = name; }
    speak() { console.log(this.name); }
}
class Dog extends Animal {
    bark() { console.log('Woof!'); }
}
```

**참고자료**
- [Inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)[^js7]

</details>

[^js7]: MDN - Inheritance and Prototype Chain

### JS-008

ES6 Class 문법과 프로토타입 기반 상속의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**핵심:** Class는 프로토타입의 **문법적 설탕(Syntactic Sugar)**

**내부적으로 동일:**
```javascript
// ES6 Class
class Person {
    constructor(name) { this.name = name; }
    greet() { console.log('Hi'); }
}

// 프로토타입 (동일)
function Person(name) { this.name = name; }
Person.prototype.greet = function() { console.log('Hi'); };
```

**차이점:**

| 구분 | 프로토타입 | Class |
|------|-----------|-------|
| 호이스팅 | 함수 호이스팅 | TDZ 존재 |
| new 없이 호출 | 가능 (this = window) | TypeError |
| strict mode | 선택 | 항상 적용 |
| 메서드 열거 | enumerable: true | enumerable: false |
| 상속 문법 | 복잡 | extends 간단 |

**Class 추가 기능:**
```javascript
class Person {
    // 정적 메서드
    static create(name) { return new Person(name); }

    // private 필드 (ES2022)
    #privateField = 'secret';

    // getter/setter
    get fullName() { return this.#privateField; }
}
```

**상속 비교:**
```javascript
// 프로토타입
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

// Class
class Child extends Parent {
    constructor() { super(); }
}
```

**참고자료**
- [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)[^js8]

</details>

[^js8]: MDN - Classes

### JS-009

Promise의 동작 원리와 상태에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Promise:**
비동기 작업의 완료/실패를 나타내는 객체

**3가지 상태:**
- **Pending**: 초기 상태, 대기 중
- **Fulfilled**: 성공 완료
- **Rejected**: 실패

```
Pending → Fulfilled (resolve 호출)
Pending → Rejected (reject 호출)
```
한 번 결정되면 변경 불가 (settled)

**생성과 사용:**
```javascript
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (success) resolve('data');
        else reject(new Error('failed'));
    }, 1000);
});

promise
    .then(data => console.log(data))    // 성공
    .catch(err => console.error(err))   // 실패
    .finally(() => console.log('done')); // 항상
```

**체이닝:**
```javascript
fetch('/api')
    .then(res => res.json())  // Promise 반환
    .then(data => process(data))
    .catch(handleError);
```

**정적 메서드:**
```javascript
Promise.all([p1, p2])     // 모두 성공 시 완료
Promise.race([p1, p2])    // 가장 빠른 것
Promise.allSettled([p1, p2])  // 모두 완료 (성공/실패 무관)
Promise.any([p1, p2])     // 하나라도 성공
```

**참고자료**
- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)[^js9]

</details>

[^js9]: MDN - Promise

### JS-010

async/await와 Promise의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**async/await:**
Promise를 더 직관적으로 사용하기 위한 문법 (ES2017)

**비교:**
```javascript
// Promise
function fetchData() {
    return fetch('/api')
        .then(res => res.json())
        .then(data => process(data))
        .catch(err => handleError(err));
}

// async/await
async function fetchData() {
    try {
        const res = await fetch('/api');
        const data = await res.json();
        return process(data);
    } catch (err) {
        handleError(err);
    }
}
```

**차이점:**

| 구분 | Promise | async/await |
|------|---------|-------------|
| 문법 | 체이닝 (.then) | 동기식 스타일 |
| 에러 처리 | .catch() | try/catch |
| 디버깅 | 스택 추적 어려움 | 명확한 스택 |
| 조건부 로직 | 복잡 | 직관적 |

**async 함수 특징:**
- 항상 Promise 반환
- await는 async 함수 내에서만 사용 (Top-level await 제외)

**병렬 실행:**
```javascript
// 순차 (느림)
const a = await fetchA();
const b = await fetchB();

// 병렬 (빠름)
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

**주의:**
- forEach에서 await 사용 시 의도대로 동작 안 함
- for...of 또는 map + Promise.all 사용

**참고자료**
- [async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)[^js10]

</details>

[^js10]: MDN - async/await

### JS-011

이벤트 루프(Event Loop)의 동작 원리를 설명해주세요.

<details>
<summary>답변</summary>

**이벤트 루프:**
JavaScript의 단일 스레드에서 비동기 처리를 가능하게 하는 메커니즘

**구성 요소:**
```
┌─────────────────────────┐
│       Call Stack        │ ← 실행 중인 함수
└─────────────────────────┘
             ↓
┌─────────────────────────┐
│       Event Loop        │ ← 스택 비면 큐 확인
└─────────────────────────┘
             ↓
┌─────────────────────────┐
│   Microtask Queue       │ ← Promise, queueMicrotask
│   (Macrotask Queue)     │ ← setTimeout, I/O, UI
└─────────────────────────┘
```

**동작 순서:**
1. Call Stack의 모든 동기 코드 실행
2. Stack이 비면 Microtask Queue 전부 처리
3. Macrotask Queue에서 하나 실행
4. 다시 Microtask Queue 확인
5. 반복

**예시:**
```javascript
console.log('1');                    // 동기

setTimeout(() => console.log('2'), 0); // Macro

Promise.resolve().then(() => console.log('3')); // Micro

console.log('4');                    // 동기

// 출력: 1 → 4 → 3 → 2
```

**Microtask가 우선:**
- Promise.then/catch/finally
- queueMicrotask()
- MutationObserver

**Macrotask:**
- setTimeout, setInterval
- I/O, UI 렌더링

**참고자료**
- [Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)[^js11]

</details>

[^js11]: MDN - Event Loop

### JS-012

마이크로태스크와 매크로태스크의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | Microtask | Macrotask |
|------|-----------|-----------|
| 우선순위 | 높음 | 낮음 |
| 실행 시점 | Stack 비우고 즉시 | Microtask 후 |
| 처리 방식 | 큐 전체 비움 | 하나씩 |

**Microtask 예:**
- Promise.then/catch/finally
- queueMicrotask()
- MutationObserver
- process.nextTick() (Node.js)

**Macrotask (Task) 예:**
- setTimeout / setInterval
- setImmediate (Node.js)
- I/O 작업
- UI 렌더링
- requestAnimationFrame

**실행 순서:**
```javascript
console.log('1');  // 동기

setTimeout(() => console.log('timeout'), 0);  // Macro

Promise.resolve()
    .then(() => console.log('promise1'))      // Micro
    .then(() => console.log('promise2'));     // Micro

queueMicrotask(() => console.log('micro'));   // Micro

console.log('2');  // 동기

// 출력: 1 → 2 → promise1 → micro → promise2 → timeout
```

**핵심 차이:**
- Microtask: 현재 작업 직후, 모든 Microtask 처리
- Macrotask: Microtask 전부 처리 후 하나씩

**주의:**
- Microtask 무한 루프 시 UI 블로킹
- 무거운 작업은 Macrotask로 분할

**참고자료**
- [Microtasks](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)[^js12]

</details>

[^js12]: MDN - Microtask Guide

### JS-013

디바운싱(Debouncing)과 스로틀링(Throttling)의 차이와 구현 방법은 무엇인가요?

<details>
<summary>답변</summary>

**디바운싱 (Debouncing):**
연속된 이벤트 중 마지막 이벤트만 처리 (일정 시간 후)

```javascript
function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// 사용: 검색 입력
input.addEventListener('input', debounce(search, 300));
```

**스로틀링 (Throttling):**
일정 시간 간격으로 최대 한 번만 실행

```javascript
function throttle(fn, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 사용: 스크롤 이벤트
window.addEventListener('scroll', throttle(handleScroll, 100));
```

**비교:**
| 구분 | Debounce | Throttle |
|------|----------|----------|
| 실행 시점 | 마지막 이벤트 후 | 일정 간격마다 |
| 사용 예 | 검색 자동완성, resize 후 | 스크롤, 마우스 이동 |
| 특징 | 지연 실행 | 주기적 실행 |

**사용 시나리오:**
- **Debounce**: 입력 완료 후 처리 (검색, 폼 검증)
- **Throttle**: 지속적 이벤트 제한 (스크롤, 드래그)

**참고자료**
- [Debounce and Throttle](https://developer.mozilla.org/en-US/docs/Glossary/Debounce)[^js13]

</details>

[^js13]: MDN - Debounce

### JS-014

얕은 복사와 깊은 복사의 차이점과 구현 방법은 무엇인가요?

<details>
<summary>답변</summary>

**얕은 복사 (Shallow Copy):**
1단계 프로퍼티만 복사, 중첩 객체는 참조 공유

```javascript
const obj = { a: 1, nested: { b: 2 } };

// 방법들
const copy1 = { ...obj };
const copy2 = Object.assign({}, obj);

copy1.a = 100;           // 독립
copy1.nested.b = 200;    // 원본도 변경됨!
```

**깊은 복사 (Deep Copy):**
모든 레벨의 프로퍼티를 재귀적으로 복사

```javascript
// 1. JSON (한계 있음)
const deepCopy1 = JSON.parse(JSON.stringify(obj));
// 함수, undefined, Symbol, 순환 참조 불가

// 2. structuredClone (권장, ES2022)
const deepCopy2 = structuredClone(obj);

// 3. 재귀 구현
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(deepClone);
    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k, deepClone(v)])
    );
}

// 4. lodash
const deepCopy3 = _.cloneDeep(obj);
```

**비교:**
| 구분 | 얕은 복사 | 깊은 복사 |
|------|----------|----------|
| 중첩 객체 | 참조 공유 | 새로 생성 |
| 성능 | 빠름 | 느림 |
| 사용 | 단순 객체 | 복잡한 객체 |

**참고자료**
- [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)[^js14]

</details>

[^js14]: MDN - structuredClone

### JS-015

구조 분해 할당(Destructuring)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**구조 분해 할당:**
배열이나 객체의 값을 개별 변수로 추출

**객체 구조 분해:**
```javascript
const user = { name: 'John', age: 30, city: 'NYC' };

// 기본
const { name, age } = user;

// 다른 이름으로
const { name: userName } = user;

// 기본값
const { country = 'USA' } = user;

// 중첩
const { address: { street } } = { address: { street: 'Main' } };
```

**배열 구조 분해:**
```javascript
const arr = [1, 2, 3, 4, 5];

// 기본
const [first, second] = arr;

// 건너뛰기
const [, , third] = arr;  // 3

// 나머지
const [head, ...tail] = arr;  // head=1, tail=[2,3,4,5]

// 기본값
const [a, b, c = 10] = [1, 2];  // c=10

// 변수 교환
let x = 1, y = 2;
[x, y] = [y, x];
```

**함수 파라미터:**
```javascript
function greet({ name, age = 0 }) {
    console.log(`${name}, ${age}`);
}

function sum([a, b]) {
    return a + b;
}
```

**활용:**
- API 응답 처리
- 설정 객체 추출
- 다중 반환값 처리

**참고자료**
- [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)[^js15]

</details>

[^js15]: MDN - Destructuring Assignment

### JS-016

스프레드 연산자와 레스트 파라미터의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

둘 다 `...` 문법을 사용하지만 **반대 방향**으로 동작합니다.

**스프레드 (Spread): 펼치기**
```javascript
// 배열 펼치기
const arr = [1, 2, 3];
console.log(...arr);  // 1 2 3
const newArr = [...arr, 4, 5];  // [1,2,3,4,5]

// 객체 펼치기
const obj = { a: 1, b: 2 };
const newObj = { ...obj, c: 3 };  // {a:1, b:2, c:3}

// 함수 호출
Math.max(...arr);  // 3
```

**레스트 (Rest): 모으기**
```javascript
// 함수 파라미터
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3);  // 6

// 구조 분해
const [first, ...rest] = [1, 2, 3, 4];
// first=1, rest=[2,3,4]

const { a, ...others } = { a: 1, b: 2, c: 3 };
// a=1, others={b:2, c:3}
```

**비교:**
| 구분 | Spread | Rest |
|------|--------|------|
| 방향 | 펼침 (확장) | 모음 (수집) |
| 위치 | 배열/객체/호출 시 | 함수 선언/구조분해 시 |
| 용도 | 복사, 병합, 전달 | 가변 인자 수집 |

**주의:**
- Rest는 항상 마지막에 위치해야 함
- `function fn(...a, b) {}` // SyntaxError

**참고자료**
- [Spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)[^js16]

</details>

[^js16]: MDN - Spread Syntax

### JS-017

Map과 Object의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | Object | Map |
|------|--------|-----|
| 키 타입 | 문자열/Symbol만 | 모든 타입 |
| 순서 보장 | ES2015부터 부분적 | 삽입 순서 보장 |
| 크기 확인 | Object.keys().length | map.size |
| 반복 | for...in, Object.keys | for...of, forEach |
| 성능 | 삽입/삭제 느림 | 빈번한 추가/삭제에 최적화 |
| 프로토타입 | 있음 (주의 필요) | 없음 |

**Map 사용:**
```javascript
const map = new Map();
map.set('key', 'value');
map.set(1, 'number key');
map.set({}, 'object key');

map.get('key');    // 'value'
map.has('key');    // true
map.delete('key');
map.size;          // 2

// 반복
for (const [key, value] of map) { }
map.forEach((value, key) => { });
```

**Object vs Map 선택:**

**Object 권장:**
- JSON 직렬화 필요
- 메서드/로직 포함
- 간단한 레코드 구조

**Map 권장:**
- 키가 문자열이 아닌 경우
- 빈번한 추가/삭제
- 키-값 쌍 순회 필요
- 크기를 자주 확인

```javascript
// Object 주의점
const obj = {};
obj['__proto__'] = 'danger';  // 프로토타입 오염

const map = new Map();
map.set('__proto__', 'safe');  // 안전
```

**참고자료**
- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)[^js17]

</details>

[^js17]: MDN - Map

### JS-018

Set과 WeakSet, Map과 WeakMap의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**Weak- 버전의 핵심: 약한 참조 (Weak Reference)**
- GC가 다른 참조 없으면 수거 가능
- 메모리 누수 방지

| 구분 | Set/Map | WeakSet/WeakMap |
|------|---------|-----------------|
| 키/값 타입 | 모든 타입 | 객체만 |
| 참조 | 강한 참조 | 약한 참조 |
| 반복 | 가능 | 불가 (iterable X) |
| size | 있음 | 없음 |
| GC | 참조 유지 | 자동 제거 가능 |

**WeakMap 예:**
```javascript
const wm = new WeakMap();
let obj = { data: 'value' };
wm.set(obj, 'metadata');

wm.get(obj);  // 'metadata'

obj = null;  // 이제 WeakMap의 엔트리도 GC 대상
```

**WeakSet 예:**
```javascript
const ws = new WeakSet();
let obj = {};
ws.add(obj);

ws.has(obj);  // true
obj = null;   // GC 대상
```

**사용 사례:**

**WeakMap:**
- 객체에 private 데이터 연결
- DOM 노드에 메타데이터 저장
- 캐싱 (메모리 자동 정리)

**WeakSet:**
- 객체 방문 여부 추적
- 순환 참조 감지

```javascript
// 클래스 private 데이터
const privateData = new WeakMap();
class User {
    constructor(name) {
        privateData.set(this, { name });
    }
}
```

**참고자료**
- [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)[^js18]

</details>

[^js18]: MDN - WeakMap

### JS-019

Symbol의 용도와 사용 방법을 설명해주세요.

<details>
<summary>답변</summary>

**Symbol:**
고유하고 변경 불가능한 원시 타입 (ES6)

```javascript
const sym1 = Symbol('description');
const sym2 = Symbol('description');
sym1 === sym2;  // false (항상 고유)
```

**주요 용도:**

**1. 객체의 고유 프로퍼티 키**
```javascript
const id = Symbol('id');
const user = {
    name: 'John',
    [id]: 123  // Symbol 키
};

user[id];  // 123
Object.keys(user);  // ['name'] - Symbol 제외
```

**2. 이름 충돌 방지**
```javascript
// 라이브러리가 Symbol로 확장하면 충돌 없음
Array.prototype[Symbol.for('myLib.method')] = function() {};
```

**3. Well-Known Symbols (내장 심볼)**
```javascript
// 객체 동작 커스터마이징
const obj = {
    [Symbol.iterator]: function* () { yield 1; yield 2; },
    [Symbol.toStringTag]: 'MyObject'
};

[...obj];  // [1, 2]
obj.toString();  // '[object MyObject]'
```

**Symbol.for() - 전역 심볼:**
```javascript
const globalSym = Symbol.for('shared');
Symbol.for('shared') === globalSym;  // true (같은 키면 재사용)
Symbol.keyFor(globalSym);  // 'shared'
```

**Well-Known Symbols:**
- Symbol.iterator, Symbol.asyncIterator
- Symbol.toStringTag, Symbol.toPrimitive
- Symbol.hasInstance, Symbol.species

**참고자료**
- [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)[^js19]

</details>

[^js19]: MDN - Symbol

### JS-020

Proxy와 Reflect API에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Proxy:**
객체 기본 동작(읽기, 쓰기, 열거 등)을 가로채서 커스터마이징

```javascript
const target = { name: 'John', age: 30 };
const handler = {
    get(target, prop) {
        console.log(`Getting ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        console.log(`Setting ${prop} = ${value}`);
        target[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);
proxy.name;      // "Getting name" → "John"
proxy.age = 31;  // "Setting age = 31"
```

**주요 트랩 (Handler 메서드):**
- get, set, has (in 연산자)
- deleteProperty, apply (함수 호출)
- construct (new), ownKeys

**Reflect:**
객체 조작을 위한 메서드 모음 (Proxy 트랩과 1:1 대응)

```javascript
const handler = {
    get(target, prop, receiver) {
        // Reflect로 기본 동작 수행
        return Reflect.get(target, prop, receiver);
    }
};
```

**활용 사례:**

**1. 유효성 검사**
```javascript
const validator = {
    set(target, prop, value) {
        if (prop === 'age' && value < 0) {
            throw new Error('Invalid age');
        }
        return Reflect.set(target, prop, value);
    }
};
```

**2. 반응형 시스템 (Vue 3)**
```javascript
const reactive = (obj) => new Proxy(obj, {
    set(target, prop, value) {
        target[prop] = value;
        notifySubscribers();  // 변경 알림
        return true;
    }
});
```

**참고자료**
- [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)[^js20]

</details>

[^js20]: MDN - Proxy

### JS-021

Generator 함수와 Iterator의 동작 원리를 설명해주세요.

<details>
<summary>답변</summary>

**Iterator:**
순차적 접근을 위한 프로토콜

```javascript
const iterator = {
    current: 0,
    next() {
        if (this.current < 3) {
            return { value: this.current++, done: false };
        }
        return { value: undefined, done: true };
    }
};

iterator.next();  // { value: 0, done: false }
iterator.next();  // { value: 1, done: false }
```

**Iterable 프로토콜:**
```javascript
const iterable = {
    [Symbol.iterator]() {
        return iterator;
    }
};
for (const v of iterable) { }  // 0, 1, 2
```

---

**Generator:**
일시 중지/재개 가능한 함수 (Iterator 자동 생성)

```javascript
function* generator() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = generator();
gen.next();  // { value: 1, done: false }
gen.next();  // { value: 2, done: false }
gen.next();  // { value: 3, done: false }
gen.next();  // { value: undefined, done: true }
```

**yield 양방향 통신:**
```javascript
function* gen() {
    const x = yield 'first';
    const y = yield x + 1;
    return x + y;
}
const g = gen();
g.next();      // { value: 'first', done: false }
g.next(10);    // { value: 11, done: false } (x=10)
g.next(20);    // { value: 30, done: true } (y=20)
```

**활용:**
- 지연 평가 (무한 시퀀스)
- async/await 이전의 비동기 처리 (co 라이브러리)
- 상태 머신

**참고자료**
- [Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)[^js21]

</details>

[^js21]: MDN - Generator

### JS-022

모듈 시스템(CommonJS, ES6 Module)의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | CommonJS | ES Module |
|------|----------|-----------|
| 문법 | require/module.exports | import/export |
| 로딩 | 동기 (런타임) | 비동기 (컴파일 타임) |
| 환경 | Node.js 기본 | 브라우저, Node.js |
| 트리쉐이킹 | 어려움 | 가능 |
| 바인딩 | 값 복사 | 라이브 바인딩 |

**CommonJS:**
```javascript
// 내보내기
module.exports = { add, subtract };
module.exports.add = add;
exports.add = add;

// 가져오기
const { add } = require('./math');
const math = require('./math');
```

**ES Module:**
```javascript
// 내보내기
export const add = (a, b) => a + b;
export default function subtract(a, b) { return a - b; }

// 가져오기
import subtract, { add } from './math.js';
import * as math from './math.js';

// 동적 import
const module = await import('./module.js');
```

**라이브 바인딩 차이:**
```javascript
// CommonJS - 값 복사
let count = 0;
module.exports = { count, increment() { count++; } };
// 외부에서 count 변경 안 보임

// ESM - 라이브 바인딩
export let count = 0;
export function increment() { count++; }
// 외부에서 변경 보임
```

**Node.js에서 ESM:**
- package.json에 "type": "module"
- 또는 .mjs 확장자

**참고자료**
- [Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)[^js22]

</details>

[^js22]: MDN - JavaScript Modules

### JS-023

TypeScript의 타입 시스템에 대해 설명해주세요.

<details>
<summary>답변</summary>

**TypeScript:**
JavaScript에 정적 타입을 추가한 상위 집합 (Superset)

**기본 타입:**
```typescript
let str: string = 'hello';
let num: number = 42;
let bool: boolean = true;
let arr: number[] = [1, 2, 3];
let tuple: [string, number] = ['a', 1];
let obj: { name: string } = { name: 'John' };
```

**특수 타입:**
```typescript
let any: any = 'anything';      // 모든 타입 허용 (지양)
let unknown: unknown = 'safe';  // 안전한 any
let never: never;               // 발생하지 않는 값
let void_: void = undefined;    // 반환 없음
```

**타입 정의:**
```typescript
// 인터페이스
interface User {
    name: string;
    age?: number;  // optional
    readonly id: number;
}

// 타입 별칭
type ID = string | number;
type Point = { x: number; y: number };

// 함수 타입
type Fn = (a: number) => string;
```

**구조적 타이핑 (Structural Typing):**
```typescript
interface Point { x: number; y: number; }
const p = { x: 1, y: 2, z: 3 };  // z 무시
const point: Point = p;  // OK (필요한 속성만 있으면 됨)
```

**장점:**
- 컴파일 타임 오류 발견
- IDE 자동완성/리팩토링
- 문서화 효과

**참고자료**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)[^js23]

</details>

[^js23]: TypeScript Handbook

### JS-024

TypeScript의 제네릭(Generic) 사용 방법과 제약사항은 무엇인가요?

<details>
<summary>답변</summary>

**제네릭:**
타입을 파라미터화하여 재사용 가능한 컴포넌트 작성

**기본 사용:**
```typescript
// 함수
function identity<T>(arg: T): T {
    return arg;
}
identity<string>('hello');
identity(42);  // 타입 추론

// 인터페이스
interface Box<T> {
    value: T;
}
const box: Box<number> = { value: 42 };

// 클래스
class Container<T> {
    constructor(private value: T) {}
    getValue(): T { return this.value; }
}
```

**제약조건 (Constraints):**
```typescript
// extends로 제약
interface HasLength { length: number; }
function logLength<T extends HasLength>(arg: T): T {
    console.log(arg.length);  // OK
    return arg;
}
logLength('hello');  // OK
logLength([1, 2]);   // OK
logLength(123);      // Error

// keyof 제약
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
```

**다중 타입 파라미터:**
```typescript
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}
```

**기본값:**
```typescript
interface Response<T = any> {
    data: T;
}
```

**제약사항:**
- 런타임에 타입 정보 없음 (타입 소거)
- `new T()` 직접 불가

**참고자료**
- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)[^js24]

</details>

[^js24]: TypeScript Handbook - Generics

### JS-025

TypeScript의 Union Type과 Intersection Type의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**Union Type (|): 또는**
여러 타입 중 하나

```typescript
type StringOrNumber = string | number;

function process(value: StringOrNumber) {
    if (typeof value === 'string') {
        return value.toUpperCase();  // string으로 좁혀짐
    }
    return value * 2;  // number
}

// 리터럴 유니온
type Status = 'pending' | 'success' | 'error';
type HttpCode = 200 | 400 | 500;
```

**Intersection Type (&): 그리고**
여러 타입을 모두 만족

```typescript
interface HasName { name: string; }
interface HasAge { age: number; }

type Person = HasName & HasAge;
// Person은 name과 age 모두 필요

const person: Person = {
    name: 'John',
    age: 30
};
```

**비교:**
```typescript
// Union: A 또는 B
type AorB = A | B;  // A의 멤버 또는 B의 멤버

// Intersection: A 그리고 B
type AandB = A & B;  // A의 멤버와 B의 멤버 모두
```

**실무 활용:**
```typescript
// API 응답
type ApiResponse<T> =
    | { status: 'success'; data: T }
    | { status: 'error'; message: string };

// Mixin 패턴
type Timestamped = { createdAt: Date; updatedAt: Date };
type User = { name: string } & Timestamped;
```

**참고자료**
- [Union and Intersection Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)[^js25]

</details>

[^js25]: TypeScript Handbook - Union Types

### JS-026

TypeScript의 타입 가드(Type Guard) 종류와 사용 방법을 설명해주세요.

<details>
<summary>답변</summary>

**타입 가드:**
런타임에 타입을 좁히는(narrowing) 표현식

**1. typeof 가드**
```typescript
function process(value: string | number) {
    if (typeof value === 'string') {
        return value.toUpperCase();  // string
    }
    return value.toFixed(2);  // number
}
```

**2. instanceof 가드**
```typescript
class Dog { bark() {} }
class Cat { meow() {} }

function handle(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        animal.bark();  // Dog
    } else {
        animal.meow();  // Cat
    }
}
```

**3. in 연산자**
```typescript
interface Fish { swim: () => void; }
interface Bird { fly: () => void; }

function move(animal: Fish | Bird) {
    if ('swim' in animal) {
        animal.swim();  // Fish
    } else {
        animal.fly();   // Bird
    }
}
```

**4. 사용자 정의 타입 가드**
```typescript
function isFish(animal: Fish | Bird): animal is Fish {
    return (animal as Fish).swim !== undefined;
}

if (isFish(animal)) {
    animal.swim();  // Fish로 좁혀짐
}
```

**5. Discriminated Union**
```typescript
type Result =
    | { type: 'success'; data: string }
    | { type: 'error'; message: string };

function handle(result: Result) {
    switch (result.type) {
        case 'success': return result.data;
        case 'error': return result.message;
    }
}
```

**참고자료**
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)[^js26]

</details>

[^js26]: TypeScript Handbook - Narrowing

### JS-027

TypeScript의 유틸리티 타입(Partial, Pick, Omit 등)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**유틸리티 타입:**
기존 타입을 변환하여 새 타입 생성

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}
```

**Partial<T>: 모든 속성 선택적**
```typescript
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; }

function updateUser(id: number, updates: Partial<User>) { }
```

**Required<T>: 모든 속성 필수**
```typescript
type RequiredUser = Required<PartialUser>;
```

**Pick<T, K>: 특정 속성만 선택**
```typescript
type UserBasic = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }
```

**Omit<T, K>: 특정 속성 제외**
```typescript
type UserWithoutEmail = Omit<User, 'email'>;
// { id: number; name: string; age: number; }
```

**Record<K, T>: 키-값 타입 생성**
```typescript
type UserMap = Record<string, User>;
// { [key: string]: User }
```

**Readonly<T>: 모든 속성 읽기 전용**
```typescript
type ReadonlyUser = Readonly<User>;
```

**기타:**
```typescript
ReturnType<typeof fn>  // 함수 반환 타입
Parameters<typeof fn>  // 함수 파라미터 타입
NonNullable<T>         // null, undefined 제외
Extract<T, U>          // T에서 U에 할당 가능한 것
Exclude<T, U>          // T에서 U 제외
```

**참고자료**
- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)[^js27]

</details>

[^js27]: TypeScript Handbook - Utility Types

### JS-028

TypeScript의 never 타입은 언제 사용하나요?

<details>
<summary>답변</summary>

**never:**
절대 발생하지 않는 값의 타입

**사용 사례:**

**1. 절대 반환하지 않는 함수**
```typescript
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {}
}
```

**2. 완전성 검사 (Exhaustiveness Check)**
```typescript
type Shape = 'circle' | 'square' | 'triangle';

function getArea(shape: Shape): number {
    switch (shape) {
        case 'circle': return 3.14;
        case 'square': return 4;
        case 'triangle': return 3;
        default:
            const _exhaustive: never = shape;  // 모든 케이스 처리 확인
            return _exhaustive;
    }
}
// 새 타입 추가 시 컴파일 에러
```

**3. 타입 좁히기 결과**
```typescript
function process(value: string | number) {
    if (typeof value === 'string') { }
    else if (typeof value === 'number') { }
    else {
        value;  // never (도달 불가)
    }
}
```

**4. 불가능한 타입 표현**
```typescript
type Never = string & number;  // never
```

**never vs void:**
- void: 값이 없음 (undefined 반환 가능)
- never: 값이 절대 없음 (반환 자체가 없음)

**참고자료**
- [never Type](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type)[^js28]

</details>

[^js28]: TypeScript Handbook - never Type

### JS-029

TypeScript의 컴파일 과정과 설정 옵션을 설명해주세요.

<details>
<summary>답변</summary>

**컴파일 과정:**
```
.ts → 파싱 → AST → 타입 검사 → 변환 → .js + .d.ts
```

1. **파싱**: 소스를 AST(Abstract Syntax Tree)로
2. **타입 검사**: AST 기반 타입 분석
3. **변환**: JavaScript + 타입 선언 파일 생성

**tsconfig.json 주요 옵션:**

```json
{
  "compilerOptions": {
    // 타겟 JS 버전
    "target": "ES2020",

    // 모듈 시스템
    "module": "ESNext",
    "moduleResolution": "node",

    // 엄격한 타입 체크
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,

    // 출력 설정
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,  // .d.ts 생성

    // 상호운용
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,

    // 소스맵
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**주요 strict 옵션:**
- `strictNullChecks`: null/undefined 엄격 체크
- `noImplicitAny`: 암시적 any 금지
- `strictFunctionTypes`: 함수 타입 엄격 체크

**빌드 도구:**
- tsc (기본)
- ts-node (런타임 실행)
- esbuild, swc (빠른 변환)

**참고자료**
- [tsconfig Reference](https://www.typescriptlang.org/tsconfig)[^js29]

</details>

[^js29]: TypeScript - tsconfig Reference

### JS-030

TypeScript의 데코레이터(Decorator)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**데코레이터:**
클래스, 메서드, 프로퍼티 등을 수정하는 선언적 문법

**설정 필요:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

**데코레이터 종류:**

**1. 클래스 데코레이터**
```typescript
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter { }
```

**2. 메서드 데코레이터**
```typescript
function log(target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log(`Calling ${key} with`, args);
        return original.apply(this, args);
    };
}

class Calculator {
    @log
    add(a: number, b: number) { return a + b; }
}
```

**3. 프로퍼티 데코레이터**
```typescript
function readonly(target: any, key: string) {
    Object.defineProperty(target, key, { writable: false });
}
```

**4. 파라미터 데코레이터**
```typescript
function required(target: any, key: string, index: number) {
    // 파라미터 메타데이터 추가
}
```

**실행 순서:**
파라미터 → 메서드 → 프로퍼티 → 클래스

**활용:**
- NestJS: @Controller, @Get, @Injectable
- Angular: @Component, @Input

**참고자료**
- [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)[^js30]

</details>

[^js30]: TypeScript Handbook - Decorators

---

## 📌 Python

### PY-001

Python의 메모리 관리 방식을 설명해주세요.

<details>
<summary>답변</summary>

**Python 메모리 관리자:**
Private heap에서 모든 객체와 데이터 구조 관리

**1. 참조 카운팅 (Reference Counting)**
```python
import sys
a = [1, 2, 3]
sys.getrefcount(a)  # 참조 수 확인

b = a  # 참조 수 증가
del b  # 참조 수 감소
# 참조 수 0이 되면 즉시 해제
```

**2. 가비지 컬렉션 (순환 참조 처리)**
```python
import gc

# 순환 참조
a = []
b = [a]
a.append(b)  # 참조 카운팅만으로 해제 불가

gc.collect()  # 순환 참조 탐지 및 해제
```

**3. 메모리 풀 (PyMalloc)**
- 작은 객체 (< 512 bytes): 전용 풀에서 할당
- 큰 객체: OS malloc 사용
- 블록 → 풀 → 아레나 계층 구조

**4. 객체 캐싱**
```python
# 작은 정수 캐싱 (-5 ~ 256)
a = 100
b = 100
a is b  # True

# 문자열 인터닝
a = 'hello'
b = 'hello'
a is b  # True
```

**메모리 최적화:**
- `__slots__`: dict 대신 고정 속성
- 제너레이터: 지연 평가로 메모리 절약

**참고자료**
- [Memory Management](https://docs.python.org/3/c-api/memory.html)[^py1]

</details>

[^py1]: Python Documentation - Memory Management

### PY-002

Python의 GIL(Global Interpreter Lock)이란 무엇인가요?

<details>
<summary>답변</summary>

**GIL:**
한 번에 하나의 스레드만 Python 바이트코드를 실행하도록 하는 뮤텍스

**존재 이유:**
- CPython의 메모리 관리 (참조 카운팅)가 스레드 안전하지 않음
- 단순성과 C 확장 통합 용이

**영향:**

**CPU 바운드 작업:**
```python
# 멀티스레딩 효과 없음
import threading
def cpu_task():
    sum(range(10**7))

# 스레드 늘려도 속도 향상 없음 (오히려 오버헤드)
```

**I/O 바운드 작업:**
```python
# 멀티스레딩 효과 있음
# I/O 대기 중 GIL 해제되어 다른 스레드 실행 가능
import threading
import requests

def io_task():
    requests.get('http://example.com')
```

**우회 방법:**

1. **multiprocessing**: 별도 프로세스 (GIL 우회)
```python
from multiprocessing import Pool
with Pool(4) as p:
    p.map(cpu_task, data)
```

2. **C 확장**: GIL 해제하고 실행 (NumPy 등)

3. **asyncio**: 비동기 I/O

4. **다른 인터프리터**: Jython, PyPy (STM)

**참고자료**
- [GIL](https://docs.python.org/3/glossary.html#term-global-interpreter-lock)[^py2]

</details>

[^py2]: Python Documentation - GIL

### PY-003

Python의 데이터 타입과 가변/불변 객체를 설명해주세요.

<details>
<summary>답변</summary>

**불변 객체 (Immutable):**
| 타입 | 예시 |
|------|------|
| int | 42 |
| float | 3.14 |
| str | 'hello' |
| tuple | (1, 2, 3) |
| frozenset | frozenset([1, 2]) |
| bool | True |

```python
s = 'hello'
s[0] = 'H'  # TypeError: 수정 불가
s = 'Hello'  # 새 객체 생성
```

**가변 객체 (Mutable):**
| 타입 | 예시 |
|------|------|
| list | [1, 2, 3] |
| dict | {'a': 1} |
| set | {1, 2, 3} |
| 사용자 정의 클래스 | 기본적으로 가변 |

```python
lst = [1, 2, 3]
lst[0] = 10  # OK: 내부 수정
```

**영향:**

**1. 함수 인자**
```python
def modify(lst, s):
    lst.append(4)  # 원본 변경됨
    s = s + '!'    # 새 객체 (원본 불변)
```

**2. 딕셔너리 키**
```python
# 불변만 키로 사용 가능 (해시 필요)
d = {(1, 2): 'tuple'}  # OK
d = {[1, 2]: 'list'}   # TypeError
```

**3. 기본 인자 주의**
```python
# Bad
def append(item, lst=[]):
    lst.append(item)
    return lst  # 같은 리스트 공유!

# Good
def append(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst
```

**참고자료**
- [Data Model](https://docs.python.org/3/reference/datamodel.html)[^py3]

</details>

[^py3]: Python Documentation - Data Model

### PY-004

Python의 얕은 복사와 깊은 복사의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**얕은 복사 (Shallow Copy):**
1단계만 복사, 중첩 객체는 참조 공유

```python
import copy

original = [[1, 2], [3, 4]]

# 얕은 복사 방법들
shallow1 = copy.copy(original)
shallow2 = original[:]
shallow3 = list(original)

original[0][0] = 100
print(shallow1)  # [[100, 2], [3, 4]] - 변경됨!
```

**깊은 복사 (Deep Copy):**
모든 레벨 재귀적 복사

```python
import copy

original = [[1, 2], [3, 4]]
deep = copy.deepcopy(original)

original[0][0] = 100
print(deep)  # [[1, 2], [3, 4]] - 영향 없음
```

**비교:**
| 구분 | 얕은 복사 | 깊은 복사 |
|------|----------|----------|
| 1단계 | 새 객체 | 새 객체 |
| 중첩 객체 | 참조 공유 | 재귀 복사 |
| 성능 | 빠름 | 느림 |
| 순환 참조 | 문제 없음 | 처리함 |

**주의사항:**
```python
# 사용자 정의 클래스
class MyClass:
    def __copy__(self):
        # 얕은 복사 커스터마이징
        pass
    def __deepcopy__(self, memo):
        # 깊은 복사 커스터마이징
        pass
```

**참고자료**
- [copy module](https://docs.python.org/3/library/copy.html)[^py4]

</details>

[^py4]: Python Documentation - copy

### PY-005

Python의 \*args와 \*\*kwargs에 대해 설명해주세요.

<details>
<summary>답변</summary>

***args:** 가변 위치 인자를 튜플로 수집
```python
def func(*args):
    print(args)  # 튜플
    for arg in args:
        print(arg)

func(1, 2, 3)  # (1, 2, 3)
```

****kwargs:** 가변 키워드 인자를 딕셔너리로 수집
```python
def func(**kwargs):
    print(kwargs)  # 딕셔너리
    for key, value in kwargs.items():
        print(f'{key}={value}')

func(name='John', age=30)  # {'name': 'John', 'age': 30}
```

**함께 사용:**
```python
def func(required, *args, **kwargs):
    print(required)
    print(args)
    print(kwargs)

func('a', 1, 2, x=10, y=20)
# 'a', (1, 2), {'x': 10, 'y': 20}
```

**언패킹:**
```python
def add(a, b, c):
    return a + b + c

args = (1, 2, 3)
add(*args)  # 6

kwargs = {'a': 1, 'b': 2, 'c': 3}
add(**kwargs)  # 6
```

**파라미터 순서:**
```python
def func(pos, *args, kw_only, **kwargs):
    pass
# pos: 위치 인자
# *args: 가변 위치
# kw_only: 키워드 전용
# **kwargs: 가변 키워드
```

**참고자료**
- [Defining Functions](https://docs.python.org/3/tutorial/controlflow.html#more-on-defining-functions)[^py5]

</details>

[^py5]: Python Tutorial - Functions

### PY-006

Python의 데코레이터(Decorator)란 무엇이고 어떻게 동작하나요?

<details>
<summary>답변</summary>

**데코레이터:**
함수를 인자로 받아 새 함수를 반환하는 함수 (함수 확장)

**기본 구조:**
```python
def decorator(func):
    def wrapper(*args, **kwargs):
        print('Before')
        result = func(*args, **kwargs)
        print('After')
        return result
    return wrapper

@decorator
def greet(name):
    print(f'Hello, {name}')

# 동등: greet = decorator(greet)
greet('John')
# Before → Hello, John → After
```

**인자 있는 데코레이터:**
```python
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def say_hi():
    print('Hi')
```

**functools.wraps (메타데이터 보존):**
```python
from functools import wraps

def decorator(func):
    @wraps(func)  # __name__, __doc__ 보존
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper
```

**클래스 데코레이터:**
```python
def singleton(cls):
    instances = {}
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

@singleton
class Database:
    pass
```

**참고자료**
- [Decorators](https://docs.python.org/3/glossary.html#term-decorator)[^py6]

</details>

[^py6]: Python Documentation - Decorators

### PY-007

Python의 제너레이터(Generator)와 이터레이터(Iterator)를 설명해주세요.

<details>
<summary>답변</summary>

**Iterator:**
`__iter__()`, `__next__()`를 구현한 객체

```python
class Counter:
    def __init__(self, max):
        self.max = max
        self.n = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.n < self.max:
            self.n += 1
            return self.n
        raise StopIteration

for i in Counter(3):
    print(i)  # 1, 2, 3
```

**Generator:**
`yield`를 사용하여 Iterator를 간단히 생성

```python
def counter(max):
    n = 0
    while n < max:
        n += 1
        yield n  # 일시 중지, 값 반환

for i in counter(3):
    print(i)  # 1, 2, 3
```

**Generator Expression:**
```python
gen = (x**2 for x in range(10))  # 메모리 효율적
lst = [x**2 for x in range(10)]  # 전체 메모리 사용
```

**장점:**
- **메모리 효율**: 필요할 때만 값 생성
- **지연 평가**: 무한 시퀀스 가능
- **간결한 코드**

**send, throw, close:**
```python
def gen():
    while True:
        received = yield
        print(f'Got: {received}')

g = gen()
next(g)
g.send('hello')  # Got: hello
```

**참고자료**
- [Generators](https://docs.python.org/3/tutorial/classes.html#generators)[^py7]

</details>

[^py7]: Python Tutorial - Generators

### PY-008

Python의 컨텍스트 매니저(Context Manager)란 무엇인가요?

<details>
<summary>답변</summary>

**컨텍스트 매니저:**
`with` 문에서 리소스 설정/정리를 자동화하는 객체

**기본 사용:**
```python
with open('file.txt', 'r') as f:
    content = f.read()
# 자동으로 f.close() 호출 (예외 발생해도)
```

**클래스로 구현:**
```python
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()
        return False  # 예외 전파

with FileManager('file.txt', 'r') as f:
    content = f.read()
```

**contextlib로 간단히:**
```python
from contextlib import contextmanager

@contextmanager
def file_manager(filename, mode):
    f = open(filename, mode)
    try:
        yield f
    finally:
        f.close()

with file_manager('file.txt', 'r') as f:
    content = f.read()
```

**활용 사례:**
- 파일, 네트워크, DB 연결
- 락 획득/해제
- 트랜잭션
- 임시 설정 변경

```python
# 락
with threading.Lock():
    # 임계 영역

# 임시 디렉토리
with tempfile.TemporaryDirectory() as tmpdir:
    # tmpdir 사용
```

**참고자료**
- [Context Managers](https://docs.python.org/3/reference/datamodel.html#with-statement-context-managers)[^py8]

</details>

[^py8]: Python Documentation - Context Managers

### PY-009

Python의 리스트 컴프리헨션과 제너레이터 표현식의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | 리스트 컴프리헨션 | 제너레이터 표현식 |
|------|------------------|-------------------|
| 문법 | [x for x in ...] | (x for x in ...) |
| 반환 | list | generator |
| 메모리 | 전체 할당 | 지연 생성 |
| 재사용 | 가능 | 1회성 |
| 속도 | 빠름 (한번에) | 느림 (순차) |

**리스트 컴프리헨션:**
```python
squares = [x**2 for x in range(1000000)]
# 모든 값 즉시 메모리에 생성
import sys
sys.getsizeof(squares)  # 약 8MB
```

**제너레이터 표현식:**
```python
squares = (x**2 for x in range(1000000))
# 값을 필요할 때만 생성
sys.getsizeof(squares)  # 약 100 bytes
```

**선택 기준:**

**리스트 컴프리헨션:**
- 데이터 크기가 작을 때
- 여러 번 순회 필요
- 인덱싱/슬라이싱 필요
- len() 필요

**제너레이터:**
- 대용량 데이터
- 한 번만 순회
- 메모리 제한 환경
- 무한 시퀀스

```python
# 대용량 파일 처리
lines = (line.strip() for line in open('huge.txt'))
for line in lines:
    process(line)
```

**참고자료**
- [Generator Expressions](https://docs.python.org/3/reference/expressions.html#generator-expressions)[^py9]

</details>

[^py9]: Python Documentation - Generator Expressions

### PY-010

Python의 람다 함수의 특징과 제한사항은 무엇인가요?

<details>
<summary>답변</summary>

**람다 함수:**
단일 표현식을 가진 익명 함수

```python
# 기본 형태
add = lambda x, y: x + y
add(1, 2)  # 3

# 일반 함수와 동등
def add(x, y):
    return x + y
```

**활용:**
```python
# sorted key
sorted(items, key=lambda x: x['name'])

# filter
list(filter(lambda x: x > 0, numbers))

# map
list(map(lambda x: x**2, numbers))

# reduce
from functools import reduce
reduce(lambda a, b: a + b, [1, 2, 3])  # 6
```

**제한사항:**

1. **단일 표현식만**
```python
# 불가능
lambda x: if x > 0: return x  # SyntaxError

# 조건 표현식은 가능
lambda x: x if x > 0 else 0
```

2. **문(statements) 불가**
```python
# 불가능: print, assignment, loops
lambda: print('hi')  # 표현식이 None 반환
```

3. **타입 힌트 불가**
```python
# 불가능
lambda x: int -> int: x + 1
```

4. **문서화 어려움**
```python
# __doc__ 없음
```

**권장:**
- 간단한 콜백에만 사용
- 복잡하면 일반 함수로

**참고자료**
- [Lambda Expressions](https://docs.python.org/3/reference/expressions.html#lambda)[^py10]

</details>

[^py10]: Python Documentation - Lambda

### PY-011

Python의 클로저(Closure)와 nonlocal 키워드에 대해 설명해주세요.

<details>
<summary>답변</summary>

**클로저:**
내부 함수가 외부 함수의 변수를 기억하고 접근하는 함수

```python
def outer(x):
    def inner(y):
        return x + y  # 외부 변수 x 접근
    return inner

add5 = outer(5)
add5(3)  # 8 (x=5 기억)
add5(7)  # 12
```

**nonlocal:**
중첩 함수에서 외부 함수의 변수를 수정할 때 사용

```python
def counter():
    count = 0
    def increment():
        nonlocal count  # 외부 변수 수정 선언
        count += 1
        return count
    return increment

c = counter()
c()  # 1
c()  # 2
```

**nonlocal vs global:**
```python
x = 'global'

def outer():
    x = 'outer'

    def inner():
        nonlocal x  # outer의 x
        x = 'inner'

    def inner2():
        global x  # 전역 x
        x = 'modified global'
```

**클로저 활용:**
- 데이터 은닉 (private 변수)
- 상태 유지 함수
- 팩토리 함수
- 데코레이터

```python
# 메모이제이션
def memoize(func):
    cache = {}
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper
```

**참고자료**
- [nonlocal](https://docs.python.org/3/reference/simple_stmts.html#the-nonlocal-statement)[^py11]

</details>

[^py11]: Python Documentation - nonlocal

### PY-012

Python의 클래스 변수와 인스턴스 변수의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | 클래스 변수 | 인스턴스 변수 |
|------|-------------|---------------|
| 정의 위치 | 클래스 내부 | __init__ 내부 (self.xxx) |
| 공유 | 모든 인스턴스 | 인스턴스별 독립 |
| 접근 | 클래스명.변수 / self.변수 | self.변수 |

```python
class Dog:
    species = 'Canis'  # 클래스 변수

    def __init__(self, name):
        self.name = name  # 인스턴스 변수

dog1 = Dog('Buddy')
dog2 = Dog('Max')

# 클래스 변수 - 공유
Dog.species        # 'Canis'
dog1.species       # 'Canis'

# 인스턴스 변수 - 독립
dog1.name          # 'Buddy'
dog2.name          # 'Max'
```

**주의: 가변 객체 클래스 변수**
```python
class MyClass:
    items = []  # 위험! 모든 인스턴스가 공유

a = MyClass()
b = MyClass()
a.items.append(1)
b.items  # [1] - 의도치 않은 공유

# 해결
class MyClass:
    def __init__(self):
        self.items = []  # 인스턴스별 생성
```

**클래스 변수 활용:**
```python
class Counter:
    count = 0  # 인스턴스 수 추적

    def __init__(self):
        Counter.count += 1
```

**참고자료**
- [Classes](https://docs.python.org/3/tutorial/classes.html#class-and-instance-variables)[^py12]

</details>

[^py12]: Python Tutorial - Class Variables

### PY-013

Python의 매직 메서드(init, str, repr 등)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**매직 메서드 (던더 메서드):**
`__xxx__` 형태, Python 내장 동작을 커스터마이징

**객체 생성/초기화:**
```python
class Point:
    def __new__(cls, *args):      # 객체 생성
        return super().__new__(cls)

    def __init__(self, x, y):      # 초기화
        self.x, self.y = x, y

    def __del__(self):             # 소멸자
        pass
```

**문자열 표현:**
```python
class Point:
    def __str__(self):             # print(), str()
        return f'({self.x}, {self.y})'

    def __repr__(self):            # 개발자용, 재생성 가능하게
        return f'Point({self.x}, {self.y})'
```

**연산자 오버로딩:**
```python
class Point:
    def __add__(self, other):      # +
        return Point(self.x + other.x, self.y + other.y)

    def __eq__(self, other):       # ==
        return self.x == other.x and self.y == other.y

    def __lt__(self, other):       # <
        return (self.x, self.y) < (other.x, other.y)
```

**컨테이너 동작:**
```python
class MyList:
    def __len__(self):             # len()
        return self._length

    def __getitem__(self, key):    # obj[key]
        return self._data[key]

    def __iter__(self):            # for loop
        return iter(self._data)
```

**참고자료**
- [Data Model](https://docs.python.org/3/reference/datamodel.html#special-method-names)[^py13]

</details>

[^py13]: Python Documentation - Special Methods

### PY-014

Python의 프로퍼티(Property)와 디스크립터(Descriptor)를 설명해주세요.

<details>
<summary>답변</summary>

**Property:**
getter/setter를 통한 속성 접근 제어

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError('Radius must be positive')
        self._radius = value

    @property
    def area(self):  # 읽기 전용
        return 3.14 * self._radius ** 2

c = Circle(5)
c.radius = 10   # setter 호출
print(c.area)   # getter 호출
```

**Descriptor:**
`__get__`, `__set__`, `__delete__`를 구현한 클래스

```python
class Positive:
    def __set_name__(self, owner, name):
        self.name = name

    def __get__(self, obj, type=None):
        return obj.__dict__.get(self.name)

    def __set__(self, obj, value):
        if value < 0:
            raise ValueError('Must be positive')
        obj.__dict__[self.name] = value

class Order:
    quantity = Positive()
    price = Positive()

order = Order()
order.quantity = 10  # __set__ 호출
order.price = -5     # ValueError
```

**Property vs Descriptor:**
- Property: 단일 클래스에서 사용
- Descriptor: 여러 클래스에서 재사용 가능

**참고자료**
- [Descriptor](https://docs.python.org/3/howto/descriptor.html)[^py14]

</details>

[^py14]: Python Documentation - Descriptor HowTo

### PY-015

Python의 다중 상속과 MRO(Method Resolution Order)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**다중 상속:**
```python
class A:
    def method(self):
        print('A')

class B(A):
    def method(self):
        print('B')

class C(A):
    def method(self):
        print('C')

class D(B, C):
    pass

d = D()
d.method()  # 'B' - 어떤 순서로?
```

**MRO (Method Resolution Order):**
C3 선형화 알고리즘으로 결정

```python
D.__mro__
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)
```

**C3 규칙:**
1. 자식 클래스가 부모보다 먼저
2. 부모 클래스 순서 유지 (왼쪽 우선)
3. 공통 부모는 마지막에

**super() 사용:**
```python
class B(A):
    def method(self):
        print('B')
        super().method()  # MRO 다음 클래스 호출

class C(A):
    def method(self):
        print('C')
        super().method()

class D(B, C):
    def method(self):
        print('D')
        super().method()

D().method()
# D → B → C → A (MRO 순서)
```

**다이아몬드 문제 해결:**
- C3 선형화로 명확한 순서 보장
- super()로 협력적 상속

**참고자료**
- [MRO](https://docs.python.org/3/tutorial/classes.html#multiple-inheritance)[^py15]

</details>

[^py15]: Python Tutorial - Multiple Inheritance

### PY-016

Python의 추상 클래스(ABC)와 인터페이스 구현 방법은 무엇인가요?

<details>
<summary>답변</summary>

**ABC (Abstract Base Class):**
```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

    def describe(self):  # 일반 메서드 가능
        return f'Area: {self.area()}'

# 추상 메서드 미구현 시 인스턴스화 불가
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2

    def perimeter(self):
        return 2 * 3.14 * self.radius

shape = Shape()   # TypeError: Can't instantiate
circle = Circle(5)  # OK
```

**추상 프로퍼티:**
```python
class Shape(ABC):
    @property
    @abstractmethod
    def name(self):
        pass
```

**인터페이스 패턴 (Protocol - Python 3.8+):**
```python
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None: ...

class Circle:
    def draw(self) -> None:
        print('Drawing circle')

def render(shape: Drawable):
    shape.draw()

render(Circle())  # 덕 타이핑, 명시적 상속 불필요
```

**ABC vs Protocol:**
- ABC: 명시적 상속 필요, 런타임 검사
- Protocol: 구조적 타이핑, 정적 타입 체크

**참고자료**
- [abc module](https://docs.python.org/3/library/abc.html)[^py16]

</details>

[^py16]: Python Documentation - abc

### PY-017

Python의 Duck Typing이란 무엇인가요?

<details>
<summary>답변</summary>

**Duck Typing:**
"오리처럼 걷고 오리처럼 꽥꽥거리면, 그것은 오리다"

객체의 타입보다 **행동(메서드/속성)**을 기준으로 판단

```python
class Duck:
    def quack(self):
        print('Quack!')
    def walk(self):
        print('Walking')

class Person:
    def quack(self):
        print('I can quack too!')
    def walk(self):
        print('Walking like a person')

def make_quack(thing):
    thing.quack()  # 타입 상관없이 quack 메서드만 있으면 됨

make_quack(Duck())    # Quack!
make_quack(Person())  # I can quack too!
```

**장점:**
- 유연한 다형성
- 명시적 상속 불필요
- 테스트/목 객체 쉬움

**EAFP vs LBYL:**
```python
# EAFP (Easier to Ask Forgiveness than Permission) - Pythonic
try:
    thing.quack()
except AttributeError:
    print('Not a duck')

# LBYL (Look Before You Leap)
if hasattr(thing, 'quack'):
    thing.quack()
```

**타입 힌트와 함께:**
```python
from typing import Protocol

class Quackable(Protocol):
    def quack(self) -> None: ...

def make_quack(thing: Quackable):
    thing.quack()
```

**참고자료**
- [Duck Typing](https://docs.python.org/3/glossary.html#term-duck-typing)[^py17]

</details>

[^py17]: Python Documentation - Duck Typing

### PY-018

Python의 타입 힌팅(Type Hinting)과 정적 타입 체커(mypy)에 대해 설명해주세요?

<details>
<summary>답변</summary>

**타입 힌팅 (Python 3.5+):**
```python
def greet(name: str) -> str:
    return f'Hello, {name}'

age: int = 25
names: list[str] = ['Alice', 'Bob']
```

**주요 타입:**
```python
from typing import List, Dict, Optional, Union, Callable, Any

# 컬렉션 (Python 3.9+ 소문자 가능)
items: list[int] = [1, 2, 3]
mapping: dict[str, int] = {'a': 1}

# Optional (None 가능)
name: Optional[str] = None
name: str | None = None  # Python 3.10+

# Union
value: Union[int, str] = 1
value: int | str = 1  # Python 3.10+

# Callable
fn: Callable[[int, int], int] = lambda a, b: a + b

# 제네릭
from typing import TypeVar, Generic
T = TypeVar('T')
class Box(Generic[T]):
    def __init__(self, item: T): ...
```

**mypy 사용:**
```bash
pip install mypy
mypy script.py
```

```python
def add(a: int, b: int) -> int:
    return a + b

add('1', '2')  # mypy 오류: str 대신 int 필요
```

**주의:**
- 런타임에 타입 검사 안 함 (힌트일 뿐)
- 정적 분석 도구로 검사

**참고자료**
- [typing module](https://docs.python.org/3/library/typing.html)[^py18]

</details>

[^py18]: Python Documentation - typing

### PY-019

Python의 동시성 처리 방법(Threading, Multiprocessing, Asyncio)을 비교해주세요.

<details>
<summary>답변</summary>

| 구분 | Threading | Multiprocessing | Asyncio |
|------|-----------|-----------------|---------|
| 단위 | 스레드 | 프로세스 | 코루틴 |
| GIL 영향 | O | X (별도 프로세스) | O |
| 메모리 | 공유 | 격리 | 공유 |
| 적합 | I/O 바운드 | CPU 바운드 | I/O 바운드 |
| 컨텍스트 스위칭 | OS | OS | 사용자 레벨 |

**Threading:**
```python
import threading

def task():
    # I/O 작업 (네트워크, 파일)
    pass

threads = [threading.Thread(target=task) for _ in range(10)]
for t in threads: t.start()
for t in threads: t.join()
```

**Multiprocessing:**
```python
from multiprocessing import Pool

def cpu_task(n):
    return sum(range(n))

with Pool(4) as p:
    results = p.map(cpu_task, [10**6] * 4)
```

**Asyncio:**
```python
import asyncio

async def fetch(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def main():
    tasks = [fetch(url) for url in urls]
    results = await asyncio.gather(*tasks)

asyncio.run(main())
```

**선택 기준:**
- I/O + 간단함 → Threading
- I/O + 대량 동시성 → Asyncio
- CPU 집약적 → Multiprocessing

**참고자료**
- [concurrent.futures](https://docs.python.org/3/library/concurrent.futures.html)[^py19]

</details>

[^py19]: Python Documentation - concurrent.futures

### PY-020

Python의 asyncio와 비동기 프로그래밍에 대해 설명해주세요.

<details>
<summary>답변</summary>

**asyncio:**
단일 스레드에서 동시성을 제공하는 비동기 I/O 프레임워크

**핵심 개념:**
```python
import asyncio

# 코루틴 정의
async def fetch_data():
    await asyncio.sleep(1)  # 비동기 대기
    return 'data'

# 실행
asyncio.run(fetch_data())
```

**주요 함수:**
```python
# 여러 코루틴 동시 실행
results = await asyncio.gather(
    fetch_data(),
    fetch_data(),
    fetch_data()
)

# 타임아웃
try:
    await asyncio.wait_for(slow_task(), timeout=5.0)
except asyncio.TimeoutError:
    print('Timeout!')

# 태스크 생성
task = asyncio.create_task(fetch_data())
```

**이벤트 루프:**
```python
# Python 3.7+
asyncio.run(main())

# 또는
loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```

**async 컨텍스트 매니저:**
```python
async with aiofiles.open('file.txt') as f:
    content = await f.read()

async for item in async_generator():
    process(item)
```

**주의:**
- 블로킹 코드 사용 금지 (time.sleep X)
- I/O 라이브러리도 async 버전 필요

**참고자료**
- [asyncio](https://docs.python.org/3/library/asyncio.html)[^py20]

</details>

[^py20]: Python Documentation - asyncio

### PY-021

Python 2와 Python 3의 주요 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | Python 2 | Python 3 |
|------|----------|----------|
| print | print "hello" | print("hello") |
| 나눗셈 | 5/2 = 2 (정수) | 5/2 = 2.5 (실수) |
| 문자열 | str (바이트), unicode | str (유니코드), bytes |
| range | range() → list | range() → iterator |
| input | raw_input() | input() |
| 예외 | except E, e: | except E as e: |

**주요 차이:**

**1. print 함수**
```python
# Python 2
print "hello"
print "a", "b"

# Python 3
print("hello")
print("a", "b", sep=", ", end="\n")
```

**2. 정수 나눗셈**
```python
# Python 2: 5/2 = 2
# Python 3: 5/2 = 2.5, 5//2 = 2
```

**3. 유니코드**
```python
# Python 2
s = u"한글"
b = "bytes"

# Python 3
s = "한글"  # 기본 유니코드
b = b"bytes"
```

**4. 반복자**
```python
# Python 2: range(), dict.keys() → list
# Python 3: → iterator (메모리 효율)
```

**Python 2 EOL:**
- 2020년 1월 1일 지원 종료
- 신규 프로젝트는 Python 3 필수

**참고자료**
- [What's New](https://docs.python.org/3/whatsnew/3.0.html)[^py21]

</details>

[^py21]: Python Documentation - What's New in Python 3.0

### PY-022

Python의 패키지 관리 도구(pip, pipenv, poetry)를 비교해주세요.

<details>
<summary>답변</summary>

| 구분 | pip | pipenv | poetry |
|------|-----|--------|--------|
| 표준 | O | X | X |
| 가상환경 | 별도 (venv) | 통합 | 통합 |
| lock 파일 | X | Pipfile.lock | poetry.lock |
| 의존성 해결 | 기본 | 향상 | 향상 |
| 빌드/배포 | X | X | O |

**pip:**
```bash
pip install package
pip install -r requirements.txt
pip freeze > requirements.txt
```
- 기본 도구, 단순
- lock 파일 없어 재현성 이슈

**pipenv:**
```bash
pipenv install package
pipenv shell  # 가상환경 활성화
pipenv lock   # lock 파일 생성
```
- Pipfile, Pipfile.lock 사용
- 가상환경 자동 관리

**poetry:**
```bash
poetry new project
poetry add package
poetry install
poetry build  # 배포용 빌드
poetry publish  # PyPI 배포
```
- pyproject.toml (PEP 518 표준)
- 프로젝트 생성부터 배포까지
- 현대적 도구로 인기 상승

**선택 기준:**
- 단순 스크립트 → pip + venv
- 애플리케이션 → pipenv 또는 poetry
- 라이브러리 배포 → poetry

**참고자료**
- [pip](https://pip.pypa.io/en/stable/)[^py22]

</details>

[^py22]: pip Documentation

### PY-023

Python의 가상 환경(venv, virtualenv)이 필요한 이유는 무엇인가요?

<details>
<summary>답변</summary>

**필요한 이유:**

1. **의존성 격리**
   - 프로젝트마다 다른 버전의 패키지 사용 가능
   - 프로젝트 A: Django 3.x, 프로젝트 B: Django 4.x

2. **시스템 Python 보호**
   - OS 시스템 Python과 분리
   - 시스템 패키지 충돌 방지

3. **재현 가능한 환경**
   - 개발/프로덕션 환경 일치
   - requirements.txt로 환경 공유

**사용법:**
```bash
# venv (Python 3.3+ 내장)
python -m venv myenv
source myenv/bin/activate  # Linux/Mac
myenv\Scripts\activate     # Windows
deactivate

# virtualenv (더 많은 기능)
pip install virtualenv
virtualenv myenv
```

**venv vs virtualenv:**
| 구분 | venv | virtualenv |
|------|------|------------|
| 설치 | 내장 | pip 설치 |
| Python 버전 | 현재만 | 여러 버전 |
| 속도 | 빠름 | 빠름 |

**가상환경 위치:**
```bash
# 프로젝트 내
project/
├── venv/
├── src/
└── requirements.txt

# 또는 중앙 관리
~/.virtualenvs/project_env
```

**참고자료**
- [venv](https://docs.python.org/3/library/venv.html)[^py23]

</details>

[^py23]: Python Documentation - venv

### PY-024

Python의 모듈 import 방식과 init.py의 역할을 설명해주세요.

<details>
<summary>답변</summary>

**import 방식:**
```python
# 모듈 전체
import math
math.sqrt(4)

# 특정 항목
from math import sqrt, pi
sqrt(4)

# 별칭
import numpy as np
from datetime import datetime as dt

# 모든 항목 (권장하지 않음)
from math import *
```

**모듈 검색 순서:**
1. 현재 디렉토리
2. PYTHONPATH 환경변수
3. 설치된 패키지 (site-packages)
4. 표준 라이브러리

**패키지 구조:**
```
mypackage/
├── __init__.py
├── module1.py
├── module2.py
└── subpackage/
    ├── __init__.py
    └── module3.py
```

**__init__.py 역할:**

1. **패키지 표시** (Python 3.3+ namespace packages로 선택적)

2. **패키지 초기화 코드**
```python
# mypackage/__init__.py
print('패키지 로드됨')
```

3. **공개 API 정의**
```python
# __init__.py
from .module1 import func1
from .module2 import Class2

__all__ = ['func1', 'Class2']  # from package import * 제어
```

4. **하위 모듈 자동 import**
```python
# __init__.py
from . import module1, module2
```

**참고자료**
- [Modules](https://docs.python.org/3/tutorial/modules.html)[^py24]

</details>

[^py24]: Python Tutorial - Modules

### PY-025

Python의 성능 최적화 방법에는 어떤 것들이 있나요?

<details>
<summary>답변</summary>

**1. 프로파일링 먼저**
```python
import cProfile
cProfile.run('main()')

# line_profiler, memory_profiler
```

**2. 내장 함수/라이브러리 활용**
```python
# Bad
result = []
for i in items:
    result.append(i * 2)

# Good
result = list(map(lambda x: x * 2, items))
result = [i * 2 for i in items]
```

**3. 적절한 자료구조**
```python
# 멤버십 체크: list O(n) vs set O(1)
items_set = set(items)
if item in items_set:
    pass

# dict/set 활용
```

**4. 제너레이터 사용**
```python
# 메모리 절약
(x**2 for x in range(1000000))
```

**5. C 확장 라이브러리**
```python
import numpy as np  # 벡터화 연산
# Cython, Numba (JIT)
```

**6. 멀티프로세싱 (CPU 바운드)**
```python
from multiprocessing import Pool
```

**7. asyncio (I/O 바운드)**
```python
import asyncio
```

**8. 기타**
- `__slots__`: 메모리 최적화
- functools.lru_cache: 메모이제이션
- PyPy: 대안 인터프리터

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2: return n
    return fibonacci(n-1) + fibonacci(n-2)
```

**참고자료**
- [Performance Tips](https://docs.python.org/3/howto/perf-tips.html)[^py25]

</details>

[^py25]: Python Documentation - Performance Tips

---

## 📌 Go

### GO-001

Go 언어의 특징과 장단점을 설명해주세요.

<details>
<summary>답변</summary>

**특징:**
- 정적 타입, 컴파일 언어
- 간결한 문법 (키워드 25개)
- 내장 동시성 (goroutine, channel)
- 빠른 컴파일
- 단일 바이너리 배포
- 가비지 컬렉션

**장점:**
1. **동시성**: goroutine이 가볍고 효율적
2. **성능**: C에 근접한 실행 속도
3. **단순함**: 학습 곡선 낮음, 코드 일관성
4. **빠른 빌드**: 대규모 프로젝트도 빠름
5. **도구 통합**: go fmt, go test, go mod 내장
6. **크로스 컴파일**: 쉬운 멀티 플랫폼 빌드

**단점:**
1. **제네릭**: Go 1.18에서 추가되었으나 제한적
2. **에러 처리**: if err != nil 반복
3. **의존성 주입**: 프레임워크 지원 부족
4. **함수형**: map, filter 등 내장 없음
5. **GUI**: 네이티브 지원 없음

**사용 사례:**
- 마이크로서비스 (Docker, Kubernetes)
- CLI 도구 (Terraform, Hugo)
- 네트워크 서버
- DevOps 도구

**참고자료**
- [Go Documentation](https://go.dev/doc/)[^go1]

</details>

[^go1]: Go Official Documentation

### GO-002

Go의 고루틴(Goroutine)과 스레드의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | Goroutine | OS Thread |
|------|-----------|-----------|
| 메모리 | ~2KB 스택 | ~1MB 스택 |
| 생성 비용 | 매우 낮음 | 높음 |
| 스케줄링 | Go 런타임 | OS 커널 |
| 컨텍스트 스위칭 | 빠름 | 느림 |
| 개수 | 수십만 가능 | 수천 제한적 |

**Goroutine 사용:**
```go
func main() {
    go sayHello()  // 새 goroutine 시작
    go func() {    // 익명 함수
        fmt.Println("Anonymous")
    }()
    time.Sleep(time.Second)
}

func sayHello() {
    fmt.Println("Hello")
}
```

**M:N 스케줄링:**
- M개의 goroutine을 N개의 OS 스레드에 매핑
- GOMAXPROCS로 사용할 OS 스레드 수 설정

**Go 스케줄러 (GMP):**
- G: Goroutine
- M: Machine (OS Thread)
- P: Processor (논리적 프로세서)

**장점:**
- 가벼움: 수십만 동시 실행 가능
- 간단: `go` 키워드만으로 생성
- 효율적: 블로킹 I/O 시 자동으로 다른 goroutine 실행

**주의:**
- main 종료 시 모든 goroutine 종료
- sync.WaitGroup으로 대기

**참고자료**
- [Goroutines](https://go.dev/doc/effective_go#goroutines)[^go2]

</details>

[^go2]: Effective Go - Goroutines

### GO-003

Go의 채널(Channel)의 동작 원리와 사용 방법을 설명해주세요.

<details>
<summary>답변</summary>

**Channel:**
goroutine 간 통신을 위한 타입 안전한 파이프

**생성과 사용:**
```go
// 생성
ch := make(chan int)        // unbuffered
ch := make(chan int, 10)    // buffered (용량 10)

// 송신
ch <- 42

// 수신
value := <-ch
value, ok := <-ch  // ok: 채널 닫힘 여부

// 닫기
close(ch)
```

**Unbuffered vs Buffered:**
| 구분 | Unbuffered | Buffered |
|------|------------|----------|
| 생성 | make(chan T) | make(chan T, n) |
| 송신 | 수신자 대기까지 블로킹 | 버퍼 찰 때까지 비블로킹 |
| 동기화 | 동기식 | 비동기식 |

**패턴:**
```go
// 범위 순회
for value := range ch {
    fmt.Println(value)
}

// 방향 제한
func send(ch chan<- int) { ch <- 1 }  // 송신 전용
func recv(ch <-chan int) { <-ch }     // 수신 전용
```

**Worker Pool:**
```go
jobs := make(chan int, 100)
results := make(chan int, 100)

// 워커 시작
for w := 0; w < 3; w++ {
    go worker(jobs, results)
}

// 작업 전송
for j := 0; j < 5; j++ {
    jobs <- j
}
close(jobs)
```

**참고자료**
- [Channels](https://go.dev/doc/effective_go#channels)[^go3]

</details>

[^go3]: Effective Go - Channels

### GO-004

Go의 select 문의 동작 원리를 설명해주세요.

<details>
<summary>답변</summary>

**select:**
여러 채널 연산을 동시에 대기하는 제어 구조

```go
select {
case msg1 := <-ch1:
    fmt.Println("From ch1:", msg1)
case msg2 := <-ch2:
    fmt.Println("From ch2:", msg2)
case ch3 <- "hello":
    fmt.Println("Sent to ch3")
default:
    fmt.Println("No channel ready")
}
```

**동작 원리:**
1. 모든 case의 채널 연산 확인
2. 준비된 case가 있으면 하나 **무작위** 선택 실행
3. 준비된 case 없으면 default 실행 (있을 경우)
4. default 없으면 하나가 준비될 때까지 블로킹

**활용 패턴:**

**1. 타임아웃:**
```go
select {
case result := <-ch:
    fmt.Println(result)
case <-time.After(time.Second):
    fmt.Println("Timeout!")
}
```

**2. 취소 (Context):**
```go
select {
case result := <-ch:
    return result
case <-ctx.Done():
    return ctx.Err()
}
```

**3. 논블로킹 연산:**
```go
select {
case msg := <-ch:
    fmt.Println(msg)
default:
    fmt.Println("No message")
}
```

**4. 무한 루프:**
```go
for {
    select {
    case msg := <-ch:
        process(msg)
    case <-quit:
        return
    }
}
```

**참고자료**
- [Select](https://go.dev/tour/concurrency/5)[^go4]

</details>

[^go4]: A Tour of Go - Select

### GO-005

Go의 인터페이스(Interface)와 타입 시스템에 대해 설명해주세요.

<details>
<summary>답변</summary>

**인터페이스:**
메서드 시그니처의 집합. **암시적 구현** (implements 키워드 없음)

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}

type MyReader struct{}

// Reader 인터페이스 자동 구현
func (r MyReader) Read(p []byte) (n int, err error) {
    return 0, nil
}

var r Reader = MyReader{}  // OK
```

**빈 인터페이스:**
```go
var any interface{}  // 모든 타입 할당 가능
any = 42
any = "hello"

// Go 1.18+
var any any
```

**타입 단언:**
```go
value := any.(string)        // 실패 시 panic
value, ok := any.(string)    // 안전한 방법
```

**타입 스위치:**
```go
switch v := any.(type) {
case int:
    fmt.Println("int:", v)
case string:
    fmt.Println("string:", v)
default:
    fmt.Println("unknown")
}
```

**인터페이스 합성:**
```go
type ReadWriter interface {
    Reader
    Writer
}
```

**특징:**
- 덕 타이핑의 정적 버전
- 작은 인터페이스 선호 (io.Reader, io.Writer)
- nil 인터페이스 주의

**참고자료**
- [Interfaces](https://go.dev/doc/effective_go#interfaces)[^go5]

</details>

[^go5]: Effective Go - Interfaces

### GO-006

Go의 포인터와 값 타입의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**값 타입:**
변수가 실제 값을 직접 저장. 할당/전달 시 복사

```go
type Point struct { X, Y int }

p1 := Point{1, 2}
p2 := p1        // 복사
p2.X = 100
fmt.Println(p1.X)  // 1 (변경 안 됨)
```

**포인터 타입:**
메모리 주소를 저장. 간접 참조

```go
p1 := &Point{1, 2}
p2 := p1        // 같은 주소
p2.X = 100
fmt.Println(p1.X)  // 100 (변경됨)
```

**함수 인자:**
```go
// 값 전달 - 복사
func modify(p Point) {
    p.X = 100  // 원본 영향 없음
}

// 포인터 전달 - 원본 수정
func modifyPtr(p *Point) {
    p.X = 100  // 원본 변경
}
```

**메서드 수신자:**
```go
// 값 수신자 - 복사본에서 동작
func (p Point) Distance() float64 { }

// 포인터 수신자 - 원본 수정 가능
func (p *Point) Scale(factor int) {
    p.X *= factor
    p.Y *= factor
}
```

**포인터 사용 시점:**
- 구조체 크기가 클 때 (복사 비용)
- 원본 수정이 필요할 때
- nil 상태가 의미 있을 때

**주의:**
- Go는 포인터 연산 없음 (안전)
- nil 포인터 역참조 시 panic

**참고자료**
- [Pointers](https://go.dev/tour/moretypes/1)[^go6]

</details>

[^go6]: A Tour of Go - Pointers

### GO-007

Go의 슬라이스(Slice)와 배열(Array)의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

| 구분 | Array | Slice |
|------|-------|-------|
| 크기 | 고정 (타입 일부) | 가변 |
| 타입 | [5]int != [10]int | []int |
| 값/참조 | 값 타입 (복사) | 참조 타입 |
| 전달 | 전체 복사 | 헤더만 복사 |

**배열:**
```go
var arr [5]int           // 0으로 초기화
arr := [5]int{1, 2, 3}   // 부분 초기화
arr := [...]int{1, 2, 3} // 길이 추론
```

**슬라이스:**
```go
var s []int              // nil 슬라이스
s := make([]int, 5)      // len=5, cap=5
s := make([]int, 5, 10)  // len=5, cap=10
s := []int{1, 2, 3}      // 리터럴

// 배열에서 생성
arr := [5]int{1, 2, 3, 4, 5}
s := arr[1:4]  // [2, 3, 4]
```

**슬라이스 내부 구조:**
```go
// 3개 필드
// ptr: 기반 배열 포인터
// len: 길이
// cap: 용량
```

**주요 연산:**
```go
s = append(s, 4, 5)      // 추가 (cap 초과 시 재할당)
copy(dst, src)           // 복사
len(s), cap(s)           // 길이, 용량
```

**주의:**
```go
// 기반 배열 공유
s1 := arr[:]
s2 := s1[1:3]
s2[0] = 100  // s1, arr도 변경됨
```

**참고자료**
- [Slices](https://go.dev/blog/slices-intro)[^go7]

</details>

[^go7]: Go Blog - Slices

### GO-008

Go의 맵(Map)의 내부 구조와 동작 원리는 무엇인가요?

<details>
<summary>답변</summary>

**Map:**
해시 테이블 기반 키-값 저장소

**사용법:**
```go
// 생성
m := make(map[string]int)
m := map[string]int{"a": 1, "b": 2}

// CRUD
m["key"] = 100              // 삽입/수정
value := m["key"]           // 조회
value, ok := m["key"]       // 존재 여부
delete(m, "key")            // 삭제

// 순회 (순서 무작위)
for key, value := range m {
    fmt.Println(key, value)
}
```

**내부 구조 (hmap):**
- 버킷 배열 (각 버킷 8개 키-값)
- 오버플로우 버킷 (체이닝)
- 로드 팩터 초과 시 확장

**특징:**
- 참조 타입 (포인터처럼 동작)
- nil map에 쓰기 시 panic
- 동시 읽기 안전, 동시 쓰기 불안전
- 순회 순서 비결정적

**동시성:**
```go
// 안전하지 않음
// map[key] = value (동시 접근 시 panic)

// sync.Map 사용
var m sync.Map
m.Store("key", "value")
value, _ := m.Load("key")

// 또는 sync.RWMutex
type SafeMap struct {
    sync.RWMutex
    m map[string]int
}
```

**참고자료**
- [Maps](https://go.dev/blog/maps)[^go8]

</details>

[^go8]: Go Blog - Maps

### GO-009

Go의 defer, panic, recover에 대해 설명해주세요.

<details>
<summary>답변</summary>

**defer:**
함수 종료 시 실행되는 지연 호출 (LIFO 순서)

```go
func example() {
    defer fmt.Println("1")
    defer fmt.Println("2")
    fmt.Println("3")
}
// 출력: 3 → 2 → 1

// 리소스 정리
func readFile() {
    f, _ := os.Open("file.txt")
    defer f.Close()  // 함수 종료 시 자동 닫힘
    // 파일 처리
}
```

**panic:**
런타임 오류, 프로그램 비정상 종료

```go
func divide(a, b int) int {
    if b == 0 {
        panic("division by zero")
    }
    return a / b
}
```

**recover:**
panic을 잡아서 복구 (defer 내에서만 유효)

```go
func safeCall() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered:", r)
        }
    }()
    panic("something bad")
}
// 출력: Recovered: something bad (프로그램 계속)
```

**패턴:**
```go
// 락 해제
func doSomething() {
    mu.Lock()
    defer mu.Unlock()
    // 작업
}

// 타이밍
func timed() {
    defer timeTrack(time.Now())
    // 작업
}
```

**주의:**
- defer 인자는 즉시 평가
- 루프 내 defer 주의 (축적됨)
- panic은 예외적 상황에만 사용

**참고자료**
- [Defer, Panic, Recover](https://go.dev/blog/defer-panic-and-recover)[^go9]

</details>

[^go9]: Go Blog - Defer, Panic, Recover

### GO-010

Go의 에러 처리 방식과 모범 사례는 무엇인가요?

<details>
<summary>답변</summary>

**Go 에러 처리:**
error 인터페이스 반환, 명시적 처리

```go
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

result, err := divide(10, 0)
if err != nil {
    log.Fatal(err)
}
```

**에러 생성:**
```go
// 기본
errors.New("error message")

// 포맷
fmt.Errorf("failed: %w", err)  // 래핑 (%w)

// 커스텀 에러
type MyError struct {
    Code    int
    Message string
}
func (e *MyError) Error() string {
    return e.Message
}
```

**에러 래핑/언래핑 (Go 1.13+):**
```go
wrapped := fmt.Errorf("context: %w", originalErr)

// 언래핑
errors.Unwrap(wrapped)

// 타입 확인
var myErr *MyError
if errors.As(err, &myErr) {
    fmt.Println(myErr.Code)
}

// 값 비교
if errors.Is(err, ErrNotFound) {
    // 처리
}
```

**모범 사례:**
- 에러 즉시 처리 또는 반환
- 컨텍스트 추가하여 래핑
- 센티널 에러: `var ErrNotFound = errors.New("not found")`
- panic 대신 error 반환

**참고자료**
- [Error Handling](https://go.dev/blog/error-handling-and-go)[^go10]

</details>

[^go10]: Go Blog - Error Handling

### GO-011

Go의 컨텍스트(Context) 패키지의 용도와 사용 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Context:**
요청 범위 데이터, 취소 신호, 타임아웃을 전달하는 표준 방법

**주요 용도:**
1. 요청 취소 전파
2. 타임아웃/데드라인 설정
3. 요청 범위 값 전달

**생성:**
```go
// 기본 (부모 없음)
ctx := context.Background()
ctx := context.TODO()  // 임시

// 취소 가능
ctx, cancel := context.WithCancel(parentCtx)
defer cancel()

// 타임아웃
ctx, cancel := context.WithTimeout(parentCtx, 5*time.Second)
defer cancel()

// 데드라인
ctx, cancel := context.WithDeadline(parentCtx, time.Now().Add(time.Hour))

// 값 전달
ctx := context.WithValue(parentCtx, "userID", 123)
```

**사용:**
```go
func doWork(ctx context.Context) error {
    select {
    case <-ctx.Done():
        return ctx.Err()  // Canceled 또는 DeadlineExceeded
    case result := <-work():
        return nil
    }
}

// 값 가져오기
userID := ctx.Value("userID").(int)
```

**모범 사례:**
- 함수 첫 번째 인자로 전달
- nil context 전달 금지
- context에 비즈니스 로직 데이터 넣지 않기
- 항상 cancel 호출 (리소스 누수 방지)

**참고자료**
- [context](https://go.dev/blog/context)[^go11]

</details>

[^go11]: Go Blog - Context

### GO-012

Go의 sync 패키지의 주요 기능들을 설명해주세요.

<details>
<summary>답변</summary>

**1. Mutex (상호 배제)**
```go
var mu sync.Mutex

mu.Lock()
// 임계 영역
mu.Unlock()

// 권장 패턴
mu.Lock()
defer mu.Unlock()
```

**2. RWMutex (읽기-쓰기 락)**
```go
var rwmu sync.RWMutex

rwmu.RLock()   // 읽기 락 (동시 읽기 가능)
defer rwmu.RUnlock()

rwmu.Lock()    // 쓰기 락 (배타적)
defer rwmu.Unlock()
```

**3. WaitGroup (고루틴 대기)**
```go
var wg sync.WaitGroup

for i := 0; i < 5; i++ {
    wg.Add(1)
    go func() {
        defer wg.Done()
        // 작업
    }()
}
wg.Wait()  // 모든 고루틴 완료 대기
```

**4. Once (한 번만 실행)**
```go
var once sync.Once
var instance *Singleton

func GetInstance() *Singleton {
    once.Do(func() {
        instance = &Singleton{}
    })
    return instance
}
```

**5. Cond (조건 변수)**
```go
var cond = sync.NewCond(&sync.Mutex{})

cond.L.Lock()
for !condition {
    cond.Wait()
}
cond.L.Unlock()

cond.Signal()    // 하나 깨움
cond.Broadcast() // 모두 깨움
```

**6. Pool (객체 풀)**
```go
var pool = sync.Pool{
    New: func() interface{} {
        return new(Buffer)
    },
}
buf := pool.Get().(*Buffer)
pool.Put(buf)
```

**참고자료**
- [sync package](https://pkg.go.dev/sync)[^go12]

</details>

[^go12]: Go sync Package Documentation

### GO-013

Go의 가비지 컬렉션 방식을 설명해주세요.

<details>
<summary>답변</summary>

**Go GC:**
Concurrent, Tri-color Mark-and-Sweep

**삼색 마킹 알고리즘:**
1. **흰색**: 아직 방문 안 함 (수거 대상 후보)
2. **회색**: 방문했지만 참조 확인 중
3. **검은색**: 방문 완료, 유지

**동작 과정:**
1. STW(Stop-The-World): 짧은 일시 정지, 루트셋 스캔
2. Mark (concurrent): 회색 객체 처리, 검은색으로 변경
3. STW: 마킹 종료 확인
4. Sweep (concurrent): 흰색 객체 수거

**특징:**
- **낮은 지연**: 대부분 동시 실행, STW 최소화
- **쓰기 배리어**: 동시 마킹 중 참조 변경 추적
- **페이싱**: 힙 크기 기반 GC 주기 조절

**튜닝:**
```go
// GOGC: 힙 증가율 (기본 100%)
// 100 = 힙이 2배 되면 GC
GOGC=200  // 덜 자주, 더 많은 메모리

// 메모리 제한 (Go 1.19+)
GOMEMLIMIT=1GiB

// 런타임 통계
runtime.GC()           // 수동 GC
runtime.ReadMemStats() // 메모리 통계
```

**최적화 팁:**
- 불필요한 할당 줄이기
- sync.Pool 활용
- 포인터 사용 최소화

**참고자료**
- [GC Guide](https://go.dev/doc/gc-guide)[^go13]

</details>

[^go13]: Go GC Guide

### GO-014

Go의 빌드와 컴파일 과정을 설명해주세요.

<details>
<summary>답변</summary>

**빌드 과정:**
```
소스 → 파싱 → AST → 타입체크 → SSA → 기계어 → 링크 → 실행파일
```

**기본 명령:**
```bash
go build           # 현재 패키지 빌드
go build -o app    # 출력 파일명 지정
go run main.go     # 빌드 + 실행
go install         # 빌드 + $GOPATH/bin에 설치
```

**크로스 컴파일:**
```bash
# Linux 바이너리 (Windows에서)
GOOS=linux GOARCH=amd64 go build

# 주요 조합
# GOOS: linux, darwin, windows
# GOARCH: amd64, arm64, 386
```

**빌드 옵션:**
```bash
# 디버그 정보 제거 (크기 감소)
go build -ldflags="-s -w"

# 빌드 태그
go build -tags production

// +build production
// 또는 Go 1.17+
//go:build production
```

**빌드 모드:**
```bash
go build -buildmode=exe      # 기본
go build -buildmode=c-shared # 공유 라이브러리
go build -buildmode=plugin   # 플러그인
```

**특징:**
- 빠른 컴파일 (의존성 분석 효율적)
- 정적 링크 기본 (단일 바이너리)
- CGO: C 코드 연동 가능

**참고자료**
- [go build](https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies)[^go14]

</details>

[^go14]: Go Command Documentation

### GO-015

Go 모듈(Go Modules)과 의존성 관리에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Go Modules (Go 1.11+):**
공식 의존성 관리 시스템

**초기화:**
```bash
go mod init github.com/user/project
# go.mod 파일 생성
```

**go.mod:**
```go
module github.com/user/project

go 1.21

require (
    github.com/gin-gonic/gin v1.9.1
    golang.org/x/sync v0.3.0
)
```

**주요 명령:**
```bash
go mod tidy      # 의존성 정리 (추가/제거)
go mod download  # 의존성 다운로드
go mod verify    # 체크섬 검증
go mod vendor    # vendor 디렉토리 생성
go mod graph     # 의존성 그래프
```

**go.sum:**
- 체크섬 파일 (보안, 재현성)
- 버전 커밋에 포함해야 함

**버전 관리:**
```bash
go get package@v1.2.3    # 특정 버전
go get package@latest    # 최신
go get -u package        # 업데이트
```

**Semantic Versioning:**
- v1.2.3 (major.minor.patch)
- v2+ 는 모듈 경로에 버전 포함: `module github.com/user/pkg/v2`

**replace/exclude:**
```go
// go.mod
replace github.com/old => github.com/new v1.0.0
exclude github.com/pkg v1.2.3
```

**참고자료**
- [Go Modules](https://go.dev/doc/modules/)[^go15]

</details>

[^go15]: Go Modules Documentation

---

## 📌 공통 질문

### LANG-001

객체지향 프로그래밍(OOP)의 4가지 특징을 설명해주세요.

<details>
<summary>답변</summary>

**1. 캡슐화 (Encapsulation)**
- 데이터와 메서드를 하나로 묶음
- 내부 구현 숨김 (정보 은닉)
- 접근 제어자로 보호

```java
class Account {
    private int balance;  // 숨김
    public void deposit(int amount) {
        if (amount > 0) balance += amount;
    }
}
```

**2. 상속 (Inheritance)**
- 기존 클래스를 확장하여 새 클래스 생성
- 코드 재사용, 계층 구조

```java
class Animal { void eat() {} }
class Dog extends Animal { void bark() {} }
```

**3. 다형성 (Polymorphism)**
- 같은 인터페이스, 다른 동작
- 오버라이딩, 오버로딩

```java
Animal animal = new Dog();  // 업캐스팅
animal.eat();  // Dog의 eat() 실행
```

**4. 추상화 (Abstraction)**
- 복잡한 시스템에서 핵심만 추출
- 인터페이스/추상 클래스로 구현

```java
interface Vehicle {
    void start();
    void stop();
}
```

**관계:**
- 캡슐화 → 구현 숨김
- 상속 → 코드 재사용
- 다형성 → 유연한 설계
- 추상화 → 복잡도 관리

</details>

### LANG-002

SOLID 원칙에 대해 설명해주세요.

<details>
<summary>답변</summary>

**S - 단일 책임 원칙 (Single Responsibility)**
- 클래스는 하나의 책임만 가져야 함
- 변경 이유가 하나여야 함

```java
// Bad: User가 저장, 알림 모두 담당
// Good: UserRepository, NotificationService 분리
```

**O - 개방-폐쇄 원칙 (Open-Closed)**
- 확장에는 열려있고, 수정에는 닫혀있어야 함
- 기존 코드 수정 없이 기능 추가

```java
// 인터페이스로 확장
interface Payment { void pay(); }
class CardPayment implements Payment {}
class CryptoPayment implements Payment {}  // 새 결제 추가
```

**L - 리스코프 치환 원칙 (Liskov Substitution)**
- 하위 타입은 상위 타입을 대체할 수 있어야 함
- 상속 시 계약 위반 금지

**I - 인터페이스 분리 원칙 (Interface Segregation)**
- 클라이언트가 사용하지 않는 메서드에 의존하지 않아야 함
- 작은 인터페이스로 분리

```java
// Bad: IWorker { work(); eat(); }
// Good: IWorkable { work(); }, IFeedable { eat(); }
```

**D - 의존성 역전 원칙 (Dependency Inversion)**
- 고수준 모듈이 저수준 모듈에 의존하지 않음
- 추상화에 의존

```java
class OrderService {
    private final PaymentGateway gateway;  // 인터페이스에 의존
}
```

</details>

### LANG-003

함수형 프로그래밍의 특징과 장점은 무엇인가요?

<details>
<summary>답변</summary>

**핵심 개념:**

**1. 순수 함수 (Pure Function)**
- 같은 입력 → 같은 출력
- 부작용 없음

**2. 불변성 (Immutability)**
- 데이터 변경 대신 새 데이터 생성

**3. 일급 함수 (First-class Function)**
- 함수를 값으로 취급 (변수 할당, 인자 전달, 반환)

**4. 고차 함수 (Higher-order Function)**
- 함수를 인자로 받거나 반환하는 함수 (map, filter, reduce)

**5. 선언적 프로그래밍**
- "무엇을" 할지 기술 (vs 명령형: "어떻게")

**장점:**
1. **테스트 용이**: 순수 함수는 격리 테스트 쉬움
2. **동시성 안전**: 불변 데이터, 공유 상태 없음
3. **예측 가능성**: 부작용 없어 디버깅 쉬움
4. **재사용성**: 작은 함수 조합
5. **지연 평가**: 필요할 때만 계산

**예시:**
```javascript
// 명령형
let sum = 0;
for (let i of numbers) sum += i;

// 함수형
const sum = numbers.reduce((a, b) => a + b, 0);
```

</details>

### LANG-004

순수 함수(Pure Function)란 무엇인가요?

<details>
<summary>답변</summary>

**순수 함수의 조건:**

**1. 결정론적 (Deterministic)**
- 같은 입력 → 항상 같은 출력

```javascript
// 순수
function add(a, b) {
    return a + b;
}

// 비순수 (외부 상태에 의존)
let factor = 2;
function multiply(x) {
    return x * factor;  // factor 변경 시 결과 다름
}
```

**2. 부작용 없음 (No Side Effects)**
- 외부 상태 변경 없음
- I/O 없음 (콘솔, 파일, 네트워크)

```javascript
// 비순수 (부작용 있음)
function addAndLog(a, b) {
    console.log(a + b);  // I/O
    return a + b;
}

let total = 0;
function addToTotal(x) {
    total += x;  // 외부 상태 변경
    return total;
}
```

**장점:**
- 테스트 용이 (Mock 불필요)
- 캐싱/메모이제이션 가능
- 병렬 실행 안전
- 리팩토링 안전

**순수 함수 예:**
```javascript
const double = x => x * 2;
const filter = (arr, fn) => arr.filter(fn);
const map = (arr, fn) => arr.map(fn);
```

</details>

### LANG-005

불변성(Immutability)의 중요성과 구현 방법은 무엇인가요?

<details>
<summary>답변</summary>

**불변성:**
생성 후 상태를 변경할 수 없는 특성

**중요성:**
1. **동시성 안전**: 공유 상태 변경 없음
2. **예측 가능**: 값이 변하지 않아 추적 쉬움
3. **변경 감지**: 참조 비교로 빠른 변경 확인 (React)
4. **히스토리/되돌리기**: 이전 상태 보존

**구현 방법:**

**JavaScript:**
```javascript
// Object.freeze (얕은 불변)
const obj = Object.freeze({ a: 1 });

// 스프레드 연산자 (새 객체)
const newObj = { ...obj, b: 2 };

// 배열
const newArr = [...arr, newItem];

// 라이브러리: Immutable.js, Immer
```

**Java:**
```java
public final class ImmutablePerson {
    private final String name;
    private final int age;

    public ImmutablePerson(String name, int age) {
        this.name = name;
        this.age = age;
    }
    // getter만, setter 없음
    // 방어적 복사
}

// Record (Java 16+)
public record Person(String name, int age) {}
```

**Python:**
```python
from dataclasses import dataclass

@dataclass(frozen=True)  # 불변
class Point:
    x: int
    y: int
```

</details>

### LANG-006

동시성(Concurrency)과 병렬성(Parallelism)의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | 동시성 | 병렬성 |
|------|--------|--------|
| 정의 | 여러 작업 동시에 다룸 | 여러 작업 동시에 실행 |
| 목적 | 응답성, 구조화 | 처리량, 속도 |
| 하드웨어 | 싱글 코어 가능 | 멀티 코어 필요 |
| 관점 | 설계/구조 | 실행 방식 |

**동시성 (Concurrency):**
"여러 일을 한꺼번에 **다루는** 것"
- 작업 간 전환 (인터리빙)
- 싱글 코어에서도 가능
- 구조적 개념

```
시간 →
Task1: ──▓▓──────▓▓──
Task2: ────▓▓▓▓──────
      (번갈아 실행)
```

**병렬성 (Parallelism):**
"여러 일을 한꺼번에 **실행하는** 것"
- 물리적 동시 실행
- 멀티 코어 필수
- 실행 개념

```
Core1: ──▓▓▓▓▓▓──
Core2: ──▓▓▓▓▓▓──
      (동시 실행)
```

**관계:**
- 동시성 없이 병렬성 가능 (독립 작업)
- 병렬성 없이 동시성 가능 (싱글 코어 멀티태스킹)
- 둘 다 가능 (멀티코어 + 멀티태스킹)

**예시:**
- 동시성: Node.js 이벤트 루프 (싱글 스레드)
- 병렬성: 멀티 프로세스 데이터 처리

</details>

### LANG-007

Race Condition과 Deadlock에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Race Condition (경쟁 상태):**
여러 스레드가 공유 자원에 동시 접근하여 결과가 실행 순서에 따라 달라지는 현상

```java
// 문제
int count = 0;
// Thread 1: count++
// Thread 2: count++
// 예상: 2, 실제: 1 또는 2 (비결정적)

// 해결: 동기화
synchronized(lock) {
    count++;
}
// 또는 AtomicInteger 사용
```

**Deadlock (교착 상태):**
두 개 이상의 스레드가 서로의 자원을 기다리며 영원히 블로킹

```
Thread 1: Lock A 획득 → Lock B 대기
Thread 2: Lock B 획득 → Lock A 대기
→ 둘 다 영원히 대기
```

**Deadlock 조건 (모두 충족 시):**
1. 상호 배제: 자원은 한 번에 하나만 사용
2. 점유 대기: 자원 보유하며 다른 자원 대기
3. 비선점: 강제로 자원 회수 불가
4. 순환 대기: 순환 형태의 대기

**Deadlock 방지:**
1. 락 순서 일관되게 유지
2. 타임아웃 사용
3. tryLock() 사용
4. 락 계층 구조

```java
// 일관된 순서로 락 획득
if (lockA.hashCode() < lockB.hashCode()) {
    synchronized(lockA) { synchronized(lockB) {} }
} else {
    synchronized(lockB) { synchronized(lockA) {} }
}
```

</details>

### LANG-008

동기(Synchronous)와 비동기(Asynchronous)의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | 동기 | 비동기 |
|------|------|--------|
| 실행 | 순차적, 완료 대기 | 요청 후 다른 작업 |
| 호출자 | 블로킹 | 논블로킹 |
| 결과 | 즉시 반환 | 콜백/Promise/Future |
| 복잡도 | 단순 | 복잡 |

**동기 (Synchronous):**
```javascript
// 순차 실행, 완료까지 대기
const data = fetchDataSync();  // 블로킹
process(data);
```

```
호출 ──▶│ 작업 처리 중... │──▶ 결과
        │     대기      │
```

**비동기 (Asynchronous):**
```javascript
// 요청 후 즉시 반환, 나중에 결과 처리
fetchDataAsync()
    .then(data => process(data));
doOtherWork();  // 기다리지 않고 실행
```

```
호출 ──▶ 즉시 반환 ──▶ 다른 작업
         │
         └──▶ 나중에 결과 처리
```

**비동기 처리 방법:**
1. **콜백**: 함수 전달
2. **Promise**: then/catch
3. **async/await**: 동기식 문법
4. **이벤트**: 이벤트 리스너

**사용 시나리오:**
- 동기: 단순 작업, 순서 중요
- 비동기: I/O, 네트워크, UI 응답성

</details>

### LANG-009

블로킹(Blocking)과 논블로킹(Non-blocking)의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**블로킹:**
호출된 함수가 완료될 때까지 **호출자가 대기**

```
Thread: ────▓▓▓▓▓▓────  (대기 중)
             │ I/O │
```

**논블로킹:**
호출된 함수가 즉시 반환, **호출자는 다른 작업 가능**

```
Thread: ────▓────▓────▓  (다른 작업)
            │    │    │
            └ 상태 확인 ┘
```

**동기/비동기 vs 블로킹/논블로킹:**

| 조합 | 설명 |
|------|------|
| 동기 + 블로킹 | 완료까지 대기 (일반적) |
| 동기 + 논블로킹 | 즉시 반환, 폴링으로 확인 |
| 비동기 + 논블로킹 | 즉시 반환, 콜백/이벤트로 알림 |
| 비동기 + 블로킹 | 비효율적 (드묾) |

**예시:**
```javascript
// 동기 + 블로킹
const data = fs.readFileSync('file.txt');

// 비동기 + 논블로킹
fs.readFile('file.txt', (err, data) => {
    // 콜백으로 처리
});
```

**I/O 모델:**
- 블로킹 I/O: read() 호출 시 데이터 올 때까지 대기
- 논블로킹 I/O: 데이터 없으면 에러 반환
- I/O 멀티플렉싱: select/poll/epoll
- 비동기 I/O: 커널이 완료 알림

</details>

### LANG-010

컴파일 언어와 인터프리터 언어의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | 컴파일 언어 | 인터프리터 언어 |
|------|-------------|-----------------|
| 변환 시점 | 실행 전 전체 | 실행 중 한 줄씩 |
| 출력 | 기계어/바이트코드 | 없음 (직접 실행) |
| 실행 속도 | 빠름 | 느림 |
| 개발 속도 | 느림 (빌드) | 빠름 |
| 에러 검출 | 컴파일 타임 | 런타임 |

**컴파일 언어:**
```
소스 코드 → 컴파일러 → 실행 파일 → 실행
           (한 번)
```
- 예: C, C++, Go, Rust
- 장점: 빠른 실행, 최적화
- 단점: 플랫폼 의존, 빌드 시간

**인터프리터 언어:**
```
소스 코드 → 인터프리터 → 실행
           (매번)
```
- 예: Python, JavaScript, Ruby
- 장점: 빠른 개발, 플랫폼 독립
- 단점: 느린 실행

**혼합 방식:**
- **Java**: 컴파일(바이트코드) + 인터프리터/JIT
- **Python**: 바이트코드 컴파일 + VM 실행
- **JavaScript**: JIT 컴파일 (V8)

**JIT (Just-In-Time):**
- 런타임에 기계어로 컴파일
- 핫스팟 최적화
- 인터프리터 + 컴파일 장점 결합

</details>

### LANG-011

JIT(Just-In-Time) 컴파일러의 동작 원리를 설명해주세요.

<details>
<summary>답변</summary>

**JIT 컴파일:**
런타임에 바이트코드를 기계어로 변환하여 성능 향상

**동작 과정:**
```
바이트코드 → 인터프리터 실행
         ↓ (핫스팟 감지)
      JIT 컴파일러
         ↓
      기계어 캐시
         ↓
      빠른 실행
```

**주요 기법:**

**1. 핫스팟 감지**
- 자주 실행되는 코드 영역 파악
- 카운터로 호출 횟수 추적

**2. 프로파일링 기반 최적화**
- 런타임 정보로 최적화 결정
- 타입 예측, 분기 예측

**3. 최적화 기법**
- 인라이닝: 함수 호출 제거
- 루프 언롤링: 반복문 펼치기
- 데드 코드 제거
- 탈출 분석: 스택 할당 최적화

**4. 탈최적화 (Deoptimization)**
- 가정 깨지면 다시 인터프리터 모드

**JIT 사용 환경:**
- **Java**: HotSpot C1/C2 컴파일러
- **JavaScript**: V8 (TurboFan), SpiderMonkey
- **.NET**: RyuJIT
- **Python**: PyPy

**Trade-off:**
- 워밍업 시간 필요
- 메모리 사용 증가
- 장기 실행에 유리

</details>

### LANG-012

정적 타이핑과 동적 타이핑의 장단점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | 정적 타이핑 | 동적 타이핑 |
|------|-------------|-------------|
| 타입 검사 | 컴파일 타임 | 런타임 |
| 선언 | 명시적 타입 | 타입 생략 |
| 에러 발견 | 빠름 | 늦음 |
| 유연성 | 낮음 | 높음 |

**정적 타이핑:**
```java
int x = 10;       // 타입 선언
x = "hello";      // 컴파일 에러
```
- 예: Java, C++, Go, TypeScript
- **장점:**
  - 컴파일 타임 에러 발견
  - IDE 자동완성, 리팩토링
  - 성능 최적화
  - 문서화 효과
- **단점:**
  - 장황한 코드
  - 유연성 부족
  - 학습 곡선

**동적 타이핑:**
```python
x = 10
x = "hello"  # OK
```
- 예: Python, JavaScript, Ruby
- **장점:**
  - 간결한 코드
  - 빠른 프로토타이핑
  - 유연한 API
  - 덕 타이핑
- **단점:**
  - 런타임 에러
  - 리팩토링 어려움
  - 대규모 프로젝트 유지보수

**점진적 타이핑:**
- TypeScript, Python (타입 힌트)
- 선택적 타입 추가

</details>

### LANG-013

강타입과 약타입 언어의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**강타입 (Strongly Typed):**
타입 간 암시적 변환 제한적

```python
# Python (강타입)
"5" + 5  # TypeError
int("5") + 5  # 명시적 변환 필요 → 10
```

**약타입 (Weakly Typed):**
타입 간 암시적 변환 허용

```javascript
// JavaScript (약타입)
"5" + 5   // "55" (문자열 연결)
"5" - 1   // 4 (숫자로 변환)
[] + {}   // "[object Object]"
```

| 구분 | 강타입 | 약타입 |
|------|--------|--------|
| 변환 | 명시적 | 암시적 |
| 안전성 | 높음 | 낮음 |
| 편의성 | 불편 | 편리 (위험) |
| 예측성 | 높음 | 낮음 |

**언어 분류:**
| 타입 | 정적 | 동적 |
|------|------|------|
| 강 | Java, C#, Go | Python, Ruby |
| 약 | C | JavaScript, PHP |

**주의:**
- 정적/동적과 독립적 개념
- 스펙트럼 (완전 강/약 없음)

**강타입 장점:**
- 타입 관련 버그 방지
- 의도 명확

**약타입 장점:**
- 유연한 코드 (위험 동반)

</details>

### LANG-014

Call by Value와 Call by Reference의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**Call by Value:**
값의 **복사본** 전달

```c
void modify(int x) {
    x = 100;  // 복사본 수정
}
int a = 10;
modify(a);
// a는 여전히 10
```

**Call by Reference:**
변수의 **참조(주소)** 전달

```cpp
void modify(int& x) {  // C++ 참조
    x = 100;  // 원본 수정
}
int a = 10;
modify(a);
// a는 100
```

**언어별 특성:**

**Java: Call by Value (항상)**
```java
// 기본형: 값 복사
void modify(int x) { x = 100; }  // 원본 불변

// 참조형: 참조값(주소) 복사
void modify(List list) {
    list.add(1);     // 내부 변경 가능
    list = new ArrayList();  // 원본 참조 불변
}
```

**Python: Call by Object Reference**
```python
def modify(lst):
    lst.append(4)    # 원본 변경됨
    lst = [1, 2, 3]  # 새 객체 바인딩 (원본 불변)
```

**JavaScript: Call by Sharing**
- 기본형: 값 복사
- 객체: 참조 복사

**정리:**
| 언어 | 방식 |
|------|------|
| C | Value, 포인터로 참조 흉내 |
| C++ | Value, Reference (&) |
| Java | Value (참조값 복사) |
| Python | Object Reference |
| Go | Value, 포인터 사용 |

</details>

### LANG-015

메모리 누수(Memory Leak)가 발생하는 원인과 방지 방법은 무엇인가요?

<details>
<summary>답변</summary>

**메모리 누수:**
사용하지 않는 메모리를 해제하지 않아 점점 메모리 증가

**원인:**

**1. 참조 유지**
```java
// static 컬렉션에 객체 쌓임
static List<Object> cache = new ArrayList<>();
cache.add(obj);  // 계속 증가
```

**2. 이벤트 리스너 해제 안 함**
```javascript
element.addEventListener('click', handler);
// removeEventListener 안 하면 누수
```

**3. 클로저가 참조 유지**
```javascript
function outer() {
    const largeData = new Array(1000000);
    return function() {
        console.log(largeData.length);  // 참조 유지
    };
}
```

**4. ThreadLocal 정리 안 함**
```java
threadLocal.set(value);
// threadLocal.remove() 안 하면 누수
```

**5. 리소스 해제 안 함**
- 파일, DB 연결, 소켓

---

**방지 방법:**

1. **약한 참조 사용**: WeakMap, WeakReference
2. **리스너 해제**: removeEventListener
3. **리소스 정리**: try-with-resources, using
4. **캐시 정책**: LRU, TTL
5. **순환 참조 주의**
6. **프로파일링**: heap dump, memory profiler

```java
// WeakHashMap - 키 참조 없으면 자동 제거
Map<Key, Value> cache = new WeakHashMap<>();
```

```javascript
// WeakMap - 키 객체 GC 가능
const wm = new WeakMap();
```

</details>
