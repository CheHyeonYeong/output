# 자료구조 (Data Structure)

> 카테고리: CS 기초 > 자료구조
> [← 면접 질문 목록으로 돌아가기](../../interview.md)

---

## 📌 기본 자료구조

### DS-001
스택 2개로 큐 만들기

<details>
<summary>답변</summary>

두 개의 스택(inStack, outStack)을 사용하여 큐를 구현합니다.

**Enqueue**: inStack에 push - O(1)

**Dequeue**: outStack이 비어있으면 inStack의 모든 요소를 outStack으로 이동 후 pop - 분할상환 O(1)

```java
class MyQueue<T> {
    Stack<T> inStack = new Stack<>();
    Stack<T> outStack = new Stack<>();

    void enqueue(T item) { inStack.push(item); }
    T dequeue() {
        if (outStack.isEmpty())
            while (!inStack.isEmpty()) outStack.push(inStack.pop());
        return outStack.pop();
    }
}
```

**참고자료**
- [Stack (Java SE 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Stack.html)[^1]

</details>

[^1]: Java Stack 클래스 공식 문서

### DS-002
큐 2개로 스택 만들기

<details>
<summary>답변</summary>

두 개의 큐(q1, q2)를 사용하여 스택을 구현합니다.

**Push**: q1에 enqueue - O(1)

**Pop**: q1의 마지막 요소를 제외한 모든 요소를 q2로 이동, 마지막 요소 반환 후 q1과 q2 교환 - O(n)

```java
class MyStack<T> {
    Queue<T> q1 = new LinkedList<>();
    Queue<T> q2 = new LinkedList<>();

    void push(T item) { q1.offer(item); }
    T pop() {
        while (q1.size() > 1) q2.offer(q1.poll());
        T result = q1.poll();
        Queue<T> temp = q1; q1 = q2; q2 = temp;
        return result;
    }
}
```

**참고자료**
- [Queue (Java SE 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Queue.html)[^2]

</details>

[^2]: Java Queue 인터페이스 공식 문서

### DS-003
Prefix, Infix, Postfix 에 대해 설명하고, 이를 스택을 활용해서 계산/하는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**표기법 종류**
- **Infix**: 연산자가 피연산자 사이에 위치 (예: A + B)
- **Prefix**: 연산자가 피연산자 앞에 위치 (예: + A B)
- **Postfix**: 연산자가 피연산자 뒤에 위치 (예: A B +)

**Postfix 계산 (스택 활용)**
1. 피연산자면 스택에 push
2. 연산자면 스택에서 두 개를 pop하여 연산 후 결과를 push
3. 최종적으로 스택에 남은 값이 결과

**Infix → Postfix 변환**
1. 피연산자는 바로 출력
2. 연산자는 스택의 top보다 우선순위가 높으면 push, 아니면 pop 후 push
3. 여는 괄호는 push, 닫는 괄호는 여는 괄호까지 pop

**참고자료**
- [Expression Evaluation - GeeksforGeeks](https://www.geeksforgeeks.org/expression-evaluation/)[^3]

</details>

[^3]: 수식 평가 알고리즘 설명

### DS-004
(C++ 한정) Deque의 Random Access 시간복잡도는 O(1) 입니다. 이게 어떻게 가능한걸까요?

<details>
<summary>답변</summary>

C++ deque는 **청크(chunk) 기반 구조**로 구현됩니다.

**구조**
- 고정 크기의 청크 배열들과 이를 가리키는 포인터 배열(map)로 구성
- 각 청크는 연속된 메모리 블록

**Random Access 원리**
1. index를 청크 크기로 나누어 어떤 청크인지 계산 - O(1)
2. 나머지로 청크 내 위치 계산 - O(1)
3. map 배열에서 해당 청크 포인터 접근 - O(1)

```
index 접근: map[index / CHUNK_SIZE][index % CHUNK_SIZE]
```

**참고자료**
- [std::deque - cppreference](https://en.cppreference.com/w/cpp/container/deque)[^4]

</details>

[^4]: C++ deque 컨테이너 공식 레퍼런스

---

## 📌 해시 (Hash)

### DS-005
해시 자료구조에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**해시 테이블**은 키(Key)를 해시 함수를 통해 인덱스로 변환하여 값(Value)을 저장하는 자료구조입니다.

**구성 요소**
- **해시 함수**: 키를 고정 크기의 해시값으로 변환
- **버킷/슬롯**: 실제 데이터가 저장되는 공간
- **충돌 처리**: 같은 해시값을 가진 키들을 처리하는 방법

**시간복잡도**
- 평균: 삽입, 삭제, 검색 모두 O(1)
- 최악(모든 키가 충돌): O(n)

**참고자료**
- [HashMap (Java SE 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html)[^5]

</details>

[^5]: Java HashMap 클래스 공식 문서

### DS-006
값이 주어졌을 때, 어떻게 하면 충돌이 최대한 적은 해시 함수를 설계할 수 있을까요?

<details>
<summary>답변</summary>

**좋은 해시 함수의 조건**
1. **균등 분포**: 해시값이 버킷 전체에 고르게 분포
2. **결정적**: 같은 입력에 항상 같은 출력
3. **빠른 계산**: O(1) 시간 내 계산 가능

**설계 기법**
- **나눗셈법**: `h(k) = k mod m` (m은 소수 권장)
- **곱셈법**: `h(k) = floor(m * (k * A mod 1))` (A는 황금비 등)
- **문자열**: 다항식 해싱 `h = s[0]*p^(n-1) + s[1]*p^(n-2) + ...`

**실용적 팁**
- 테이블 크기를 소수로 설정
- 입력 데이터의 특성 분석 후 적합한 함수 선택

**참고자료**
- [Hash function - Wikipedia](https://en.wikipedia.org/wiki/Hash_function)[^6]

</details>

[^6]: 해시 함수 개념 및 설계 방법

### DS-007
해시값이 충돌했을 때, 어떤 방식으로 처리할 수 있을까요?

<details>
<summary>답변</summary>

**1. 체이닝 (Chaining)**
- 각 버킷에 연결 리스트(또는 트리)를 두어 충돌 요소들을 연결
- 장점: 구현 간단, 삭제 용이
- 단점: 추가 메모리 필요

**2. 개방 주소법 (Open Addressing)**
- **선형 탐사**: 충돌 시 다음 버킷으로 이동 `h(k, i) = (h(k) + i) mod m`
- **이차 탐사**: `h(k, i) = (h(k) + c1*i + c2*i^2) mod m`
- **이중 해싱**: `h(k, i) = (h1(k) + i*h2(k)) mod m`

| 방식 | 클러스터링 | 캐시 성능 | 삭제 |
|------|-----------|----------|------|
| 체이닝 | 없음 | 낮음 | 쉬움 |
| 선형 탐사 | 심함 | 높음 | 어려움 |
| 이중 해싱 | 적음 | 중간 | 어려움 |

**참고자료**
- [Hash table - Wikipedia](https://en.wikipedia.org/wiki/Hash_table#Collision_resolution)[^7]

</details>

[^7]: 해시 테이블 충돌 해결 방법

### DS-008
본인이 사용하는 언어에서는, 어떤 방식으로 해시 충돌을 처리하나요?

<details>
<summary>답변</summary>

**Java (HashMap)**
- **체이닝** 방식 사용
- Java 8 이후: 버킷 내 요소가 8개 이상이면 연결 리스트를 **Red-Black Tree**로 변환
- 6개 이하로 줄어들면 다시 연결 리스트로 변환
- 이를 통해 최악의 경우에도 O(log n) 보장

**Python (dict)**
- **개방 주소법** (Pseudo-random probing) 사용
- 해시값을 기반으로 의사 난수 탐사 수행

**C++ (unordered_map)**
- **체이닝** 방식 사용
- 연결 리스트로 충돌 처리

**참고자료**
- [HashMap (Java SE 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html)[^8]

</details>

[^8]: Java HashMap 내부 구현 설명

### DS-009
Double Hashing 의 장점과 단점에 대해서 설명하고, 단점을 어떻게 해결할 수 있을지 설명해 주세요.

<details>
<summary>답변</summary>

**Double Hashing**: `h(k, i) = (h1(k) + i * h2(k)) mod m`

**장점**
- 1차/2차 클러스터링 문제 해결
- 선형/이차 탐사보다 균등한 분포
- 테이블 전체를 효율적으로 활용

**단점**
- 해시 함수 2개 계산으로 오버헤드 증가
- h2(k)가 0이 되면 무한 루프 발생 가능
- 캐시 지역성이 떨어짐

**해결 방법**
- h2(k)가 0이 되지 않도록 설계: `h2(k) = 1 + (k mod (m-1))`
- 테이블 크기 m을 소수로 설정하여 모든 슬롯 탐사 보장
- 캐시 문제는 클러스터 단위 탐사로 완화 가능

**참고자료**
- [Double hashing - Wikipedia](https://en.wikipedia.org/wiki/Double_hashing)[^9]

</details>

[^9]: 이중 해싱 알고리즘 설명

### DS-010
Load Factor에 대해 설명해 주세요. 본인이 사용하는 언어에서의 해시 자료구조는 Load Factor에 관련한 정책이 어떻게 구성되어 있나요?

<details>
<summary>답변</summary>

**Load Factor (적재율)** = 저장된 요소 수 / 버킷 수

Load Factor가 높아지면 충돌 확률이 증가하여 성능이 저하됩니다.

**Java HashMap 정책**
- 기본 Load Factor: **0.75**
- 기본 초기 용량: **16**
- Load Factor 초과 시 용량을 **2배**로 확장 (rehashing)
- 생성자에서 초기 용량과 Load Factor 지정 가능

```java
HashMap<K,V> map = new HashMap<>(initialCapacity, loadFactor);
```

**Python dict**
- Load Factor 약 **2/3** (0.67) 유지
- 초과 시 4배 또는 2배로 확장

**C++ unordered_map**
- 기본 max_load_factor: **1.0**
- `max_load_factor()` 메서드로 조정 가능

**참고자료**
- [HashMap (Java SE 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html)[^10]

</details>

[^10]: Java HashMap Load Factor 설명

### DS-011
다른 자료구조와 비교하여, 해시 테이블은 멀티스레드 환경에서 심각한 수준의 Race Condition 문제에 빠질 위험이 있습니다. 성능 감소를 최소화 한 채로 해당 문제를 해결할 수 있는 방법을 설계해 보세요.

<details>
<summary>답변</summary>

**문제점**: rehashing, 체이닝 수정 등에서 Race Condition 발생

**해결 방법**

**1. 세분화된 락 (Lock Striping)**
- 전체 테이블이 아닌 버킷 그룹별로 락 적용
- Java ConcurrentHashMap이 사용하는 방식
- 동시에 다른 세그먼트 접근 가능

**2. Lock-Free 구조**
- CAS(Compare-And-Swap) 연산 활용
- 체이닝의 연결 리스트를 atomic하게 수정

**3. Copy-on-Write**
- 수정 시 새 버킷 배열 생성
- 읽기 작업이 많은 경우 효율적

**4. Read-Write Lock**
- 읽기는 동시에, 쓰기는 배타적으로
- `ReentrantReadWriteLock` 활용

**Java ConcurrentHashMap 특징**
- 세분화된 락 + CAS 조합
- 읽기는 락 없이 수행
- putIfAbsent, computeIfAbsent 등 원자적 연산 제공

**참고자료**
- [ConcurrentHashMap (Java SE 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html)[^11]

</details>

[^11]: Java ConcurrentHashMap 공식 문서

---

## 📌 트리 (Tree)

### DS-012
트리와 이진트리, 이진탐색트리에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**트리 (Tree)**
- 노드와 간선으로 구성된 계층적 자료구조
- 사이클이 없는 연결 그래프
- 루트 노드에서 모든 노드로 유일한 경로 존재

**이진 트리 (Binary Tree)**
- 각 노드가 최대 2개의 자식을 가지는 트리
- 왼쪽 자식, 오른쪽 자식으로 구분
- 종류: 완전 이진 트리, 포화 이진 트리, 편향 이진 트리

**이진 탐색 트리 (BST)**
- 이진 트리에 정렬 속성 추가
- **왼쪽 서브트리**: 현재 노드보다 작은 값
- **오른쪽 서브트리**: 현재 노드보다 큰 값
- 중복 허용 여부는 구현에 따라 다름

**참고자료**
- [Binary search tree - Wikipedia](https://en.wikipedia.org/wiki/Binary_search_tree)[^12]

</details>

[^12]: 이진 탐색 트리 개념 설명

### DS-013
이진탐색트리에서 중위 탐색을 하게 되면, 그 결과는 어떤 의미를 가지나요?

<details>
<summary>답변</summary>

**중위 순회 (Inorder Traversal)**: 왼쪽 → 현재 → 오른쪽

BST에서 중위 순회를 수행하면 **오름차순으로 정렬된 결과**를 얻습니다.

**이유**
- BST 속성상 왼쪽 서브트리의 모든 값 < 현재 노드 < 오른쪽 서브트리의 모든 값
- 중위 순회는 왼쪽을 먼저 방문하므로 작은 값부터 출력

**활용**
- BST가 올바르게 구성되었는지 검증
- k번째 작은/큰 원소 찾기
- 정렬된 데이터 출력

```
    4
   / \
  2   6
 / \ / \
1  3 5  7

중위 순회 결과: 1, 2, 3, 4, 5, 6, 7
```

**참고자료**
- [Tree traversal - Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal#In-order)[^13]

</details>

[^13]: 트리 순회 방법 설명

### DS-014
이진탐색트리의 주요 연산에 대한 시간복잡도를 설명하고, 왜 그런 시간복잡도가 도출되는지 설명해 주세요.

<details>
<summary>답변</summary>

**시간복잡도**
| 연산 | 평균 | 최악 |
|------|------|------|
| 검색 | O(log n) | O(n) |
| 삽입 | O(log n) | O(n) |
| 삭제 | O(log n) | O(n) |

**평균 O(log n) 이유**
- 균형 잡힌 BST의 높이는 log n
- 각 연산은 루트에서 리프까지 한 경로만 탐색
- 각 단계에서 탐색 범위가 절반으로 감소

**최악 O(n) 이유**
- 편향 트리(Skewed Tree)인 경우
- 예: 1, 2, 3, 4, 5 순서로 삽입하면 오른쪽으로만 편향
- 높이가 n이 되어 연결 리스트와 동일한 성능

**참고자료**
- [Binary search tree - Wikipedia](https://en.wikipedia.org/wiki/Binary_search_tree#Time_complexity)[^14]

</details>

[^14]: BST 시간복잡도 분석

### DS-015
이진탐색트리의 한계점에 대해 설명해주세요.

<details>
<summary>답변</summary>

**1. 편향 문제**
- 삽입 순서에 따라 한쪽으로 치우칠 수 있음
- 최악의 경우 연결 리스트와 동일한 O(n) 성능

**2. 균형 유지 불가**
- 기본 BST는 자체적으로 균형을 맞추지 않음
- 삽입/삭제 시 균형이 깨질 수 있음

**3. 재균형 비용**
- 균형을 맞추려면 추가 작업(회전 등) 필요
- AVL, Red-Black Tree 등 별도 자료구조 필요

**4. 중복 처리 복잡**
- 중복 키 처리 정책이 필요
- 왼쪽/오른쪽 어디에 넣을지, 또는 카운트 방식 등

**해결책**: AVL Tree, Red-Black Tree 등 자가 균형 BST 사용

**참고자료**
- [Self-balancing binary search tree - Wikipedia](https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree)[^15]

</details>

[^15]: 자가 균형 이진 탐색 트리 설명

### DS-016
이진탐색트리의 값 삽입, 삭제 방법에 대해 설명하고, 어떤식으로 값을 삽입하면 편향이 발생할까요?

<details>
<summary>답변</summary>

**삽입**
1. 루트부터 시작하여 값을 비교
2. 작으면 왼쪽, 크면 오른쪽으로 이동
3. null 위치에 도달하면 새 노드 삽입

**삭제**
1. **리프 노드**: 단순히 삭제
2. **자식 1개**: 자식을 현재 위치로 이동
3. **자식 2개**:
   - 오른쪽 서브트리의 최솟값(후속자) 또는 왼쪽 서브트리의 최댓값(선행자)을 찾음
   - 해당 값으로 현재 노드 대체 후 그 노드 삭제

**편향 발생 케이스**
- **정렬된 데이터 삽입**: 1, 2, 3, 4, 5 → 오른쪽 편향
- **역순 정렬 데이터**: 5, 4, 3, 2, 1 → 왼쪽 편향
- **특정 패턴**: 1, 10, 2, 9, 3, 8 → 지그재그 편향

**참고자료**
- [Binary search tree operations](https://en.wikipedia.org/wiki/Binary_search_tree#Operations)[^16]

</details>

[^16]: BST 삽입/삭제 연산 설명

### DS-017
이진탐색트리와 동일한 로직을 사용하면, 삼진탐색트리도 정의할 수 있을까요? 안 된다면, 그 이유에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**단순 확장은 불가능합니다.**

**이유**

이진탐색트리는 2개의 자식과 1개의 기준값으로 "작다/크다"를 명확히 구분합니다. 삼진탐색트리로 확장하려면:

1. **기준값 2개 필요**: 3개의 자식을 구분하려면 2개의 키 값이 필요
2. **구간 정의**: 작음 / 사이 / 큼 으로 3구간 분할

이는 **2-3 Tree**와 유사한 구조가 됩니다:
- 각 노드에 1~2개의 키
- 2개의 키가 있으면 3개의 자식

**결론**
단순히 자식 수만 3개로 늘리는 것은 불가능하며, B-Tree 계열처럼 노드 내 키 개수도 함께 늘려야 합니다. 이 경우 구현 복잡도가 증가하고, 실질적인 이점이 적어 실제로는 거의 사용되지 않습니다.

**참고자료**
- [2-3 tree - Wikipedia](https://en.wikipedia.org/wiki/2%E2%80%933_tree)[^17]

</details>

[^17]: 2-3 트리 구조 설명

---

## 📌 힙 (Heap)

### DS-018
힙에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**힙 (Heap)**은 **완전 이진 트리** 형태의 자료구조로, **힙 속성**을 만족합니다.

**종류**
- **최대 힙 (Max Heap)**: 부모 >= 자식
- **최소 힙 (Min Heap)**: 부모 <= 자식

**특징**
- 루트에 최댓값(최대 힙) 또는 최솟값(최소 힙) 위치
- 삽입/삭제: O(log n)
- 최댓값/최솟값 조회: O(1)
- 완전 이진 트리이므로 배열로 효율적 구현 가능

**활용**
- 우선순위 큐 구현
- 힙 정렬
- 다익스트라 알고리즘
- 중앙값 찾기 (최대 힙 + 최소 힙)

**참고자료**
- [PriorityQueue (Java SE 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/PriorityQueue.html)[^18]

</details>

[^18]: Java PriorityQueue (힙 기반) 공식 문서

### DS-019
힙을 배열로 구현한다고 가정하면, 어떻게 값을 저장할 수 있을까요?

<details>
<summary>답변</summary>

완전 이진 트리의 특성을 활용하여 배열에 레벨 순서로 저장합니다.

**인덱스 관계 (0-based)**
- **부모**: `(i - 1) / 2`
- **왼쪽 자식**: `2 * i + 1`
- **오른쪽 자식**: `2 * i + 2`

**인덱스 관계 (1-based)**
- **부모**: `i / 2`
- **왼쪽 자식**: `2 * i`
- **오른쪽 자식**: `2 * i + 1`

```
        10          배열: [10, 8, 9, 4, 5, 6, 7]
       /  \         인덱스: 0  1  2  3  4  5  6
      8    9
     / \  / \
    4  5 6   7
```

**장점**
- 포인터 없이 인덱스 연산으로 부모/자식 접근 O(1)
- 메모리 효율적 (노드 포인터 불필요)
- 캐시 지역성 우수

**참고자료**
- [Binary heap - Wikipedia](https://en.wikipedia.org/wiki/Binary_heap#Heap_implementation)[^19]

</details>

[^19]: 이진 힙 배열 구현 방법

### DS-020
힙의 삽입, 삭제 방식에 대해 설명하고, 왜 이진탐색트리와 달리 편향이 발생하지 않는지 설명해 주세요.

<details>
<summary>답변</summary>

**삽입 (Insert)**
1. 배열의 맨 끝(마지막 레벨의 가장 오른쪽)에 삽입
2. **Heapify-up**: 부모와 비교하여 힙 속성 위반 시 교환, 루트까지 반복

**삭제 (Delete Root)**
1. 루트와 마지막 요소 교환
2. 마지막 요소 제거
3. **Heapify-down**: 자식과 비교하여 힙 속성 위반 시 교환, 리프까지 반복

**편향이 발생하지 않는 이유**

힙은 **완전 이진 트리**를 항상 유지합니다:
- 삽입: 항상 마지막 위치에 추가
- 삭제: 마지막 요소로 대체

따라서 트리의 높이는 항상 `log n`으로 유지되며, BST처럼 삽입 순서에 따라 편향될 수 없습니다.

**참고자료**
- [Binary heap operations](https://en.wikipedia.org/wiki/Binary_heap#Insert)[^20]

</details>

[^20]: 이진 힙 삽입/삭제 연산 설명

### DS-021
힙 정렬의 시간복잡도는 어떻게 되나요? Stable 한가요?

<details>
<summary>답변</summary>

**시간복잡도**
- **힙 구성**: O(n) - Bottom-up heapify
- **정렬**: O(n log n) - n개 요소 각각 O(log n) 삭제
- **전체**: O(n log n) - 최선, 평균, 최악 모두 동일

**공간복잡도**: O(1) - 제자리 정렬 (In-place)

**Stable 여부: 아니오 (Unstable)**

같은 값을 가진 요소들의 상대적 순서가 보장되지 않습니다.

**예시**
```
입력: [(3,a), (1,b), (3,c), (2,d)]
정렬 후: [(1,b), (2,d), (3,c), (3,a)]  // (3,a)와 (3,c) 순서 바뀜
```

힙 연산 중 루트와 마지막 요소 교환 과정에서 원래 순서가 깨집니다.

**참고자료**
- [Heapsort - Wikipedia](https://en.wikipedia.org/wiki/Heapsort)[^21]

</details>

[^21]: 힙 정렬 알고리즘 설명

---

## 📌 균형 이진 탐색 트리 (BBST)

### DS-022
BBST (Balanced Binary Search Tree) 와, 그 종류에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**BBST (균형 이진 탐색 트리)**는 삽입/삭제 시 자동으로 균형을 유지하여 O(log n) 성능을 보장하는 BST입니다.

**주요 종류**

| 종류 | 균형 조건 | 특징 |
|------|----------|------|
| **AVL Tree** | 좌우 높이 차이 <= 1 | 엄격한 균형, 검색 빠름 |
| **Red-Black Tree** | 색상 규칙 4가지 | 삽입/삭제 빠름, 실무 많이 사용 |
| **2-3 Tree** | 모든 리프 같은 깊이 | B-Tree의 기초 |
| **2-3-4 Tree** | 노드당 2~4개 자식 | Red-Black Tree와 동치 |
| **B-Tree** | 디스크 최적화 | 데이터베이스에서 사용 |
| **Splay Tree** | 최근 접근 노드를 루트로 | 분할상환 O(log n) |

**참고자료**
- [Self-balancing BST - Wikipedia](https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree)[^22]

</details>

[^22]: 자가 균형 BST 종류 및 비교

### DS-023
Red Black Tree는 어떻게 균형을 유지할 수 있을까요?

<details>
<summary>답변</summary>

Red-Black Tree는 **색상 규칙**과 **회전 연산**을 통해 균형을 유지합니다.

**균형 유지 방법**

**1. 삽입 시**
- 새 노드를 RED로 삽입
- 규칙 위반 시 다음 연산 수행:
  - **Recoloring**: 부모/삼촌이 RED면 색상 변경
  - **Rotation**: 부모가 RED, 삼촌이 BLACK이면 회전

**2. 삭제 시**
- BLACK 노드 삭제 시 "이중 흑색" 문제 발생
- 형제 노드의 색상에 따라 회전 및 재색칠

**회전 연산**
- **Left Rotation**: 오른쪽 자식을 부모로 올림
- **Right Rotation**: 왼쪽 자식을 부모로 올림

이 규칙들로 인해 **가장 긴 경로가 가장 짧은 경로의 2배를 넘지 않아** 균형이 유지됩니다.

**참고자료**
- [Red-black tree - Wikipedia](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Insertion)[^23]

</details>

[^23]: Red-Black Tree 삽입/삭제 알고리즘

### DS-024
Red Black Tree의 주요 성질 4가지에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Red-Black Tree의 5가지 성질** (주요 4가지 + 1)

1. **모든 노드는 RED 또는 BLACK**

2. **루트 노드는 BLACK**

3. **모든 리프(NIL)는 BLACK**
   - 실제 데이터가 없는 NIL 노드도 BLACK으로 취급

4. **RED 노드의 자식은 모두 BLACK** (No Double Red)
   - RED 노드가 연속으로 나타날 수 없음

5. **Black Height 일관성**
   - 임의의 노드에서 리프까지의 모든 경로에서 BLACK 노드 수가 동일

**이 성질들의 결과**
- 가장 긴 경로(RED-BLACK 교대) <= 2 * 가장 짧은 경로(BLACK만)
- 높이가 최대 2 * log(n+1)로 제한
- 모든 연산이 O(log n) 보장

**참고자료**
- [Red-black tree properties](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Properties)[^24]

</details>

[^24]: Red-Black Tree 성질 정의

### DS-025
2-3-4 Tree, AVL Tree 등의 다른 BBST 가 있음에도, 왜 Red Black Tree가 많이 사용될까요?

<details>
<summary>답변</summary>

**Red-Black Tree의 장점**

**1. 삽입/삭제 성능**
- AVL Tree보다 회전 횟수가 적음
- 삽입: 최대 2회 회전, 삭제: 최대 3회 회전
- AVL은 삭제 시 O(log n)회 회전 가능

**2. 구현 단순성**
- 2-3-4 Tree보다 구현이 간단 (노드 타입이 하나)
- 2-3-4 Tree는 노드 분할/병합 로직 복잡

**3. 균형 유지 비용**
| 트리 | 삽입 회전 | 삭제 회전 |
|-----|---------|---------|
| AVL | O(log n) | O(log n) |
| Red-Black | O(1) | O(1) |

**4. 실제 사용 사례**
- Java: TreeMap, TreeSet
- C++ STL: map, set
- Linux: CFS 스케줄러

**AVL이 나은 경우**: 검색이 삽입/삭제보다 훨씬 많은 경우 (더 엄격한 균형)

**참고자료**
- [TreeMap (Java SE 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/TreeMap.html)[^25]

</details>

[^25]: Java TreeMap (Red-Black Tree 기반) 공식 문서

---

## 📌 정렬 알고리즘

### DS-026
정렬 알고리즘에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**정렬 알고리즘**은 데이터를 특정 순서로 재배열하는 알고리즘입니다.

**분류**

| 알고리즘 | 평균 | 최악 | 공간 | Stable |
|---------|-----|------|-----|--------|
| Bubble Sort | O(n^2) | O(n^2) | O(1) | Yes |
| Selection Sort | O(n^2) | O(n^2) | O(1) | No |
| Insertion Sort | O(n^2) | O(n^2) | O(1) | Yes |
| Merge Sort | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n^2) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(1) | No |
| Counting Sort | O(n+k) | O(n+k) | O(k) | Yes |
| Radix Sort | O(d*(n+k)) | O(d*(n+k)) | O(n+k) | Yes |

**비교 기반 정렬의 하한**: O(n log n)

비교 기반 정렬은 결정 트리로 모델링되며, 최소 n!개의 리프가 필요하므로 높이는 최소 log(n!) = O(n log n)

**참고자료**
- [Sorting algorithm - Wikipedia](https://en.wikipedia.org/wiki/Sorting_algorithm)[^26]

</details>

[^26]: 정렬 알고리즘 개요 및 비교

### DS-027
Quick Sort와 Merge Sort를 비교해 주세요.

<details>
<summary>답변</summary>

| 항목 | Quick Sort | Merge Sort |
|------|-----------|------------|
| **평균 시간** | O(n log n) | O(n log n) |
| **최악 시간** | O(n^2) | O(n log n) |
| **공간** | O(log n) | O(n) |
| **Stable** | No | Yes |
| **방식** | 분할 정복 (In-place) | 분할 정복 |
| **캐시 효율** | 좋음 | 보통 |

**Quick Sort 장점**
- In-place로 메모리 효율적
- 캐시 지역성이 좋아 실제로 더 빠름
- 평균적으로 상수 계수가 작음

**Merge Sort 장점**
- 최악에도 O(n log n) 보장
- Stable 정렬
- 연결 리스트 정렬에 적합 (O(1) 공간)
- 병렬화 용이

**선택 기준**
- 일반적인 경우: Quick Sort
- 안정성 필요: Merge Sort
- 최악 보장 필요: Merge Sort

**참고자료**
- [Quicksort - Wikipedia](https://en.wikipedia.org/wiki/Quicksort)[^27]

</details>

[^27]: Quick Sort 알고리즘 설명

### DS-028
Quick Sort에서 O(N^2)이 걸리는 예시를 들고, 이를 개선할 수 있는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**O(n^2) 발생 예시**
- **이미 정렬된 배열**에서 첫 번째/마지막 요소를 피벗으로 선택
- 매번 1개와 n-1개로 분할 → n + (n-1) + ... + 1 = O(n^2)

```
[1, 2, 3, 4, 5]에서 피벗=1 선택
→ [], [2, 3, 4, 5] 로 분할 (불균형)
```

**개선 방법**

**1. Randomized Pivot**
- 피벗을 무작위로 선택
- 최악 확률이 매우 낮아짐

**2. Median of Three**
- 첫 번째, 중간, 마지막 중 중앙값을 피벗으로 선택
- 정렬/역정렬 데이터에서 효과적

**3. Intro Sort**
- Quick Sort + Heap Sort 혼합
- 재귀 깊이가 2*log(n) 초과 시 Heap Sort로 전환
- C++ STL sort가 사용

**4. 3-way Partitioning**
- 중복이 많은 데이터에 효과적
- 피벗보다 작은/같은/큰 세 그룹으로 분할

**참고자료**
- [Quicksort - Worst case](https://en.wikipedia.org/wiki/Quicksort#Worst-case_analysis)[^28]

</details>

[^28]: Quick Sort 최악 케이스 분석

### DS-029
Stable Sort가 무엇이고, 어떤 정렬 알고리즘이 Stable 한지 설명해 주세요.

<details>
<summary>답변</summary>

**Stable Sort**: 같은 키를 가진 요소들의 **상대적 순서가 정렬 후에도 유지**되는 정렬

**예시**
```
입력: [(3,a), (1,b), (3,c), (2,d)]
Stable:   [(1,b), (2,d), (3,a), (3,c)]  // (3,a)가 (3,c)보다 앞
Unstable: [(1,b), (2,d), (3,c), (3,a)]  // 순서 바뀜 가능
```

**Stable 알고리즘**
- Bubble Sort
- Insertion Sort
- Merge Sort
- Counting Sort
- Radix Sort
- Tim Sort

**Unstable 알고리즘**
- Selection Sort
- Quick Sort
- Heap Sort

**중요성**
- 다중 키 정렬: 먼저 2차 키로 정렬 후 1차 키로 Stable 정렬
- 데이터베이스: 기존 순서 유지 필요 시

**참고자료**
- [Sorting algorithm stability](https://en.wikipedia.org/wiki/Sorting_algorithm#Stability)[^29]

</details>

[^29]: 정렬 알고리즘 안정성 설명

### DS-030
Merge Sort를 재귀를 사용하지 않고 구현할 수 있을까요?

<details>
<summary>답변</summary>

**네, Bottom-Up 방식으로 반복문을 사용하여 구현할 수 있습니다.**

**Bottom-Up Merge Sort**
1. 크기 1인 부분 배열부터 시작
2. 인접한 부분 배열들을 병합
3. 부분 배열 크기를 2배씩 늘려가며 반복

```java
void mergeSortIterative(int[] arr) {
    int n = arr.length;
    int[] temp = new int[n];

    for (int size = 1; size < n; size *= 2) {
        for (int left = 0; left < n - size; left += 2 * size) {
            int mid = left + size - 1;
            int right = Math.min(left + 2 * size - 1, n - 1);
            merge(arr, temp, left, mid, right);
        }
    }
}
```

**장점**
- 스택 오버플로우 위험 없음
- 호출 스택 오버헤드 없음
- 연결 리스트에서 특히 효율적 (O(1) 공간)

**단점**
- Top-Down보다 코드가 약간 복잡
- 캐시 효율이 약간 낮을 수 있음

**참고자료**
- [Merge sort - Bottom-up](https://en.wikipedia.org/wiki/Merge_sort#Bottom-up_implementation)[^30]

</details>

[^30]: Bottom-Up Merge Sort 구현 방법

### DS-031
Radix Sort에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Radix Sort**는 자릿수별로 정렬을 반복하는 **비교 기반이 아닌** 정렬 알고리즘입니다.

**종류**
- **LSD (Least Significant Digit)**: 가장 작은 자릿수부터 정렬
- **MSD (Most Significant Digit)**: 가장 큰 자릿수부터 정렬

**LSD Radix Sort 과정**
```
[170, 45, 75, 90, 802, 24, 2, 66]

1의 자리 정렬: [170, 90, 802, 2, 24, 45, 75, 66]
10의 자리 정렬: [802, 2, 24, 45, 66, 170, 75, 90]
100의 자리 정렬: [2, 24, 45, 66, 75, 90, 170, 802]
```

**시간복잡도**: O(d * (n + k))
- d: 최대 자릿수
- n: 요소 개수
- k: 기수 (10진법이면 10)

**특징**
- Stable (Counting Sort 사용 시)
- 정수, 문자열 정렬에 적합
- 음수 처리 시 추가 로직 필요

**참고자료**
- [Radix sort - Wikipedia](https://en.wikipedia.org/wiki/Radix_sort)[^31]

</details>

[^31]: Radix Sort 알고리즘 설명

### DS-032
Bubble, Selection, Insertion Sort의 속도를 비교해 주세요.

<details>
<summary>답변</summary>

| 알고리즘 | 최선 | 평균 | 최악 | 비교 횟수 | 교환 횟수 |
|---------|-----|------|-----|----------|----------|
| Bubble | O(n) | O(n^2) | O(n^2) | O(n^2) | O(n^2) |
| Selection | O(n^2) | O(n^2) | O(n^2) | O(n^2) | O(n) |
| Insertion | O(n) | O(n^2) | O(n^2) | O(n^2) | O(n^2) |

**실제 성능 (일반적인 경우)**

**Insertion Sort > Bubble Sort > Selection Sort**

**이유**
- **Insertion Sort**: 정렬된 부분에서 이진 탐색 가능, 교환 대신 시프트 사용
- **Selection Sort**: 비교는 항상 O(n^2), 교환은 O(n)으로 적음
- **Bubble Sort**: 비교와 교환 모두 많음

**Selection Sort가 나은 경우**
- 쓰기 비용이 매우 높은 경우 (교환 횟수 O(n))
- 예: 플래시 메모리

**참고자료**
- [Comparison of sorting algorithms](https://en.wikipedia.org/wiki/Sorting_algorithm#Comparison_of_algorithms)[^32]

</details>

[^32]: 정렬 알고리즘 비교

### DS-033
값이 거의 정렬되어 있거나, 아예 정렬되어 있다면, 위 세 알고리즘의 성능 비교 결과는 달라질까요?

<details>
<summary>답변</summary>

**예, 크게 달라집니다.**

**거의/완전 정렬된 데이터의 성능**

| 알고리즘 | 시간복잡도 | 이유 |
|---------|----------|------|
| **Insertion Sort** | **O(n)** | 각 요소가 거의 제자리이므로 이동이 적음 |
| Bubble Sort | O(n) | Early termination 적용 시 |
| Selection Sort | O(n^2) | 항상 전체 탐색 필요 |

**Insertion Sort가 가장 효율적인 이유**
- 이미 정렬된 부분은 비교 1번으로 통과
- 완전 정렬 시 n-1번 비교로 종료

**Bubble Sort (최적화 버전)**
- 한 패스에서 교환이 없으면 종료
- 완전 정렬 시 O(n)

**Selection Sort**
- 항상 남은 요소 중 최솟값을 찾아야 함
- 데이터 상태와 무관하게 O(n^2)

**결론**: 거의 정렬된 데이터에는 **Insertion Sort**가 최적

**참고자료**
- [Insertion sort - Best case](https://en.wikipedia.org/wiki/Insertion_sort#Best,_worst,_and_average_cases)[^33]

</details>

[^33]: Insertion Sort 최선/최악 케이스 분석

### DS-034
본인이 사용하고 있는 언어에선, 어떤 정렬 알고리즘을 사용하여 정렬 함수를 제공하고 있을까요?

<details>
<summary>답변</summary>

**Java**
- `Arrays.sort()` (primitive): **Dual-Pivot Quick Sort**
- `Arrays.sort()` (Object): **Tim Sort**
- `Collections.sort()`: **Tim Sort**

**Python**
- `sorted()`, `list.sort()`: **Tim Sort**

**C++**
- `std::sort()`: **Intro Sort** (Quick Sort + Heap Sort + Insertion Sort)
- `std::stable_sort()`: **Merge Sort**

**JavaScript**
- `Array.sort()`: 엔진마다 다름 (V8: Tim Sort)

**Tim Sort 특징**
- Merge Sort + Insertion Sort 혼합
- 실제 데이터의 부분 정렬을 활용 (Run 탐지)
- Stable, O(n log n), 최선 O(n)

**Dual-Pivot Quick Sort**
- 피벗 2개 사용하여 3분할
- 기존 Quick Sort보다 평균 성능 향상

**참고자료**
- [Arrays.sort (Java SE 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html#sort(int%5B%5D))[^34]

</details>

[^34]: Java Arrays.sort 공식 문서

### DS-035
정렬해야 하는 데이터는 50G 인데, 메모리가 4G라면, 어떤 방식으로 정렬을 진행할 수 있을까요?

<details>
<summary>답변</summary>

**외부 정렬 (External Sort)**를 사용합니다.

**K-way Merge Sort 방식**

**1단계: 분할 및 내부 정렬**
1. 데이터를 메모리에 맞는 청크로 분할 (예: 3.5GB씩)
2. 각 청크를 메모리에서 정렬
3. 정렬된 청크를 임시 파일로 저장
4. 약 15개의 정렬된 파일 생성

**2단계: K-way Merge**
1. 각 파일에서 일부를 버퍼로 읽음
2. **최소 힙**으로 각 파일의 최솟값 관리
3. 힙에서 최솟값 추출 → 출력
4. 해당 파일에서 다음 값 읽어 힙에 삽입
5. 모든 파일이 끝날 때까지 반복

**최적화 기법**
- **Replacement Selection**: 초기 런 길이를 평균 2배로
- **Polyphase Merge**: 테이프 장치 최적화
- **SSD 활용**: 랜덤 읽기 성능 향상

**시간복잡도**: O(n log n)

**참고자료**
- [External sorting - Wikipedia](https://en.wikipedia.org/wiki/External_sorting)[^35]

</details>

[^35]: 외부 정렬 알고리즘 설명

---

## 📌 그래프 (Graph)

### DS-036
그래프 자료구조에 대해 설명하고, 이를 구현할 수 있는 두 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**그래프**는 정점(Vertex)과 간선(Edge)으로 구성된 자료구조입니다.

**종류**: 방향/무방향, 가중치/비가중치, 순환/비순환

**구현 방법**

**1. 인접 행렬 (Adjacency Matrix)**
```
    0 1 2 3
0 [ 0 1 1 0 ]
1 [ 1 0 0 1 ]
2 [ 1 0 0 1 ]
3 [ 0 1 1 0 ]
```
- 2차원 배열 사용
- `matrix[i][j] = 1`이면 i→j 간선 존재

**2. 인접 리스트 (Adjacency List)**
```
0: [1, 2]
1: [0, 3]
2: [0, 3]
3: [1, 2]
```
- 각 정점마다 연결된 정점들의 리스트 저장

| 항목 | 인접 행렬 | 인접 리스트 |
|-----|---------|-----------|
| 공간 | O(V^2) | O(V + E) |
| 간선 확인 | O(1) | O(degree) |
| 모든 간선 순회 | O(V^2) | O(V + E) |

**참고자료**
- [Graph (data structure) - Wikipedia](https://en.wikipedia.org/wiki/Graph_(abstract_data_type))[^36]

</details>

[^36]: 그래프 자료구조 설명

### DS-037
각 방법에 대해, "두 정점이 연결되었는지" 확인하는 시간복잡도와 "한 정점에 연결된 모든 정점을 찾는" 시간복잡도, 그리고 공간복잡도를 비교해 주세요.

<details>
<summary>답변</summary>

**V = 정점 수, E = 간선 수, d = 특정 정점의 차수(degree)**

| 연산 | 인접 행렬 | 인접 리스트 |
|-----|---------|-----------|
| **두 정점 연결 확인** | O(1) | O(d) |
| **한 정점의 모든 인접 정점** | O(V) | O(d) |
| **공간복잡도** | O(V^2) | O(V + E) |

**상세 설명**

**인접 행렬**
- 연결 확인: `matrix[u][v]` 직접 접근 → O(1)
- 인접 정점: 행 전체 탐색 필요 → O(V)
- 공간: V x V 배열 → O(V^2)

**인접 리스트**
- 연결 확인: u의 리스트에서 v 검색 → O(d)
  - 정렬/해시 사용 시 O(log d) 또는 O(1) 가능
- 인접 정점: 리스트 순회 → O(d)
- 공간: 각 간선이 리스트에 저장 → O(V + E)

**선택 기준**
- 밀집 그래프 (E ≈ V^2): 인접 행렬
- 희소 그래프 (E << V^2): 인접 리스트

**참고자료**
- [Adjacency list - Wikipedia](https://en.wikipedia.org/wiki/Adjacency_list#Trade-offs)[^37]

</details>

[^37]: 인접 행렬 vs 인접 리스트 비교

### DS-038
정점의 개수가 N개, 간선의 개수가 N^3 개라면, 어떤 방식으로 구현하는 것이 효율적일까요?

<details>
<summary>답변</summary>

**인접 행렬**이 더 효율적입니다.

**분석**

- 정점: N개
- 간선: N^3개 (매우 밀집된 그래프, 다중 간선 가능)

**공간복잡도 비교**
- 인접 행렬: O(N^2)
- 인접 리스트: O(N + N^3) = O(N^3)

**인접 행렬이 유리한 이유**

1. **공간 효율**: N^2 < N^3 (N > 1일 때)

2. **간선 접근 속도**: O(1) vs O(N^3/N) = O(N^2)

3. **캐시 효율**: 연속된 메모리 접근

**단, 다중 간선 고려 시**
- 같은 정점 쌍 사이에 여러 간선이 있다면
- 인접 행렬에 개수나 리스트를 저장하는 방식 필요
- 이 경우에도 기본 구조는 행렬이 효율적

**결론**: 간선이 N^3개로 매우 많은 밀집 그래프에서는 인접 행렬이 공간과 시간 모두에서 효율적

**참고자료**
- [Dense graph - Wikipedia](https://en.wikipedia.org/wiki/Dense_graph)[^38]

</details>

[^38]: 밀집 그래프와 희소 그래프 비교

### DS-039
사이클이 없는 그래프는 모두 트리인가요? 그렇지 않다면, 예시를 들어주세요.

<details>
<summary>답변</summary>

**아니오, 사이클이 없는 그래프가 모두 트리는 아닙니다.**

**트리의 정의**
트리는 다음 조건을 **모두** 만족해야 합니다:
1. 사이클이 없음
2. **연결되어 있음** (모든 정점 쌍 사이에 경로 존재)
3. 간선 수 = 정점 수 - 1

**반례: 포레스트 (Forest)**
```
1 - 2     4 - 5
    |         |
    3         6
```
- 사이클 없음
- 연결되어 있지 않음 (두 개의 분리된 컴포넌트)
- 트리가 아님

**반례: 방향 비순환 그래프 (DAG)**
```
1 → 2
↓   ↓
3 → 4
```
- 사이클 없음 (방향 고려)
- 무방향으로 보면 사이클 존재
- 트리가 아님

**정리**
- 사이클 없음 + 연결됨 = **트리**
- 사이클 없음 + 연결 안 됨 = **포레스트** (트리들의 집합)

**참고자료**
- [Tree (graph theory) - Wikipedia](https://en.wikipedia.org/wiki/Tree_(graph_theory))[^39]

</details>

[^39]: 트리의 그래프 이론적 정의

### DS-040
그래프에서, 최단거리를 구하는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**상황별 최단 거리 알고리즘**

| 조건 | 알고리즘 | 시간복잡도 |
|-----|---------|-----------|
| 가중치 없음 | BFS | O(V + E) |
| 가중치 양수 (단일 출발) | Dijkstra | O((V+E) log V) |
| 음수 가중치 (단일 출발) | Bellman-Ford | O(VE) |
| 모든 쌍 | Floyd-Warshall | O(V^3) |
| 음수 사이클 탐지 | Bellman-Ford | O(VE) |
| DAG | 위상정렬 + DP | O(V + E) |

**주요 알고리즘**

**BFS**: 가중치 없는 그래프에서 최단 경로

**Dijkstra**: 우선순위 큐로 최소 거리 정점 선택, 음수 가중치 불가

**Bellman-Ford**: 모든 간선을 V-1번 완화, 음수 가중치 가능

**Floyd-Warshall**: DP로 모든 쌍 최단 거리, `d[i][j] = min(d[i][j], d[i][k] + d[k][j])`

**참고자료**
- [Shortest path problem - Wikipedia](https://en.wikipedia.org/wiki/Shortest_path_problem)[^40]

</details>

[^40]: 최단 경로 문제 알고리즘 비교

### DS-041
트리에서는 어떤 방식으로 최단거리를 구할 수 있을까요? (위 방법을 사용하지 않고)

<details>
<summary>답변</summary>

**트리의 특성**: 두 정점 사이에 **유일한 경로**가 존재

**방법 1: LCA (Lowest Common Ancestor) 활용**
```
거리(u, v) = depth(u) + depth(v) - 2 * depth(LCA(u, v))
```
- 전처리: O(n log n) 또는 O(n)
- 쿼리: O(log n) 또는 O(1)

**방법 2: 단순 DFS/BFS**
- 한 정점에서 시작하여 목표 정점까지 탐색
- 시간: O(n)
- 유일한 경로이므로 최단 거리 보장

**방법 3: Euler Tour + Sparse Table**
- Euler Tour로 트리를 배열로 변환
- RMQ(Range Minimum Query)로 LCA 계산
- 전처리: O(n log n), 쿼리: O(1)

**가중치 트리**
```
거리(u, v) = dist[u] + dist[v] - 2 * dist[LCA(u, v)]
```
- dist[x]: 루트에서 x까지의 거리

**참고자료**
- [Lowest common ancestor - Wikipedia](https://en.wikipedia.org/wiki/Lowest_common_ancestor)[^41]

</details>

[^41]: 최소 공통 조상(LCA) 알고리즘

### DS-042
다익스트라 알고리즘에서, 힙을 사용하지 않고 구현한다면 시간복잡도가 어떻게 변화할까요?

<details>
<summary>답변</summary>

**힙 사용 시**: O((V + E) log V)

**힙 미사용 시**: O(V^2)

**힙 미사용 구현**
```java
for (V번 반복) {
    // 방문하지 않은 정점 중 최소 거리 정점 찾기: O(V)
    u = 최소 거리 정점;
    u 방문 처리;

    // u의 인접 정점 거리 갱신: O(degree(u))
    for (u의 인접 정점 v) {
        dist[v] = min(dist[v], dist[u] + weight(u, v));
    }
}
```

**시간복잡도 분석**
- 최소 정점 찾기: V번 × O(V) = O(V^2)
- 거리 갱신: 총 O(E)
- 전체: O(V^2 + E) = O(V^2)

**언제 힙 미사용이 유리한가?**
- **밀집 그래프** (E ≈ V^2)인 경우
  - 힙 사용: O(V^2 log V)
  - 힙 미사용: O(V^2)
- 희소 그래프 (E << V^2)에서는 힙이 유리

**참고자료**
- [Dijkstra's algorithm - Running time](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Running_time)[^42]

</details>

[^42]: Dijkstra 알고리즘 시간복잡도 분석

### DS-043
정점의 개수가 N개, 간선의 개수가 N^3 개라면, 어떤 알고리즘이 효율적일까요?

<details>
<summary>답변</summary>

**단일 출발점: 힙 없는 Dijkstra** - O(N^2)

**모든 쌍: Floyd-Warshall** - O(N^3)

**분석**

| 알고리즘 | 시간복잡도 | E = N^3일 때 |
|---------|-----------|-------------|
| Dijkstra (힙) | O((V+E) log V) | O(N^3 log N) |
| Dijkstra (배열) | O(V^2) | O(N^2) |
| Bellman-Ford | O(VE) | O(N^4) |
| Floyd-Warshall | O(V^3) | O(N^3) |

**단일 출발점 최단 경로**
- 힙 없는 Dijkstra가 O(N^2)로 가장 효율적
- 힙 사용 시 O(N^3 log N)으로 오히려 느림

**모든 쌍 최단 경로**
- Floyd-Warshall: O(N^3)
- Dijkstra N번: O(N^3) (힙 없는 버전)
- 둘 다 비슷하지만 Floyd-Warshall이 구현 간단

**결론**: 매우 밀집된 그래프에서는 힙의 오버헤드가 역효과를 내므로, 단순한 O(V^2) 구현이 효율적

**참고자료**
- [Floyd-Warshall algorithm - Wikipedia](https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm)[^43]

</details>

[^43]: Floyd-Warshall 알고리즘 설명

### DS-044
A\* 알고리즘에 대해 설명해 주세요. 이 알고리즘은 다익스트라와 비교해서 어떤 성능을 낼까요?

<details>
<summary>답변</summary>

**A\* 알고리즘**은 휴리스틱을 사용한 최단 경로 알고리즘입니다.

**핵심 공식**
```
f(n) = g(n) + h(n)
```
- g(n): 시작점에서 n까지의 실제 비용
- h(n): n에서 목표점까지의 **추정 비용** (휴리스틱)
- f(n): 총 예상 비용

**휴리스틱 조건**
- **Admissible**: h(n) <= 실제 비용 (과대평가 금지) → 최단 경로 보장
- **Consistent**: h(n) <= cost(n, m) + h(m) → 효율성 향상

**다익스트라와 비교**

| 항목 | Dijkstra | A* |
|-----|---------|-----|
| 휴리스틱 | 없음 (h=0) | 있음 |
| 탐색 방향 | 모든 방향 | 목표 방향 |
| 탐색 노드 수 | 많음 | 적음 |
| 최적성 | 항상 최적 | admissible h면 최적 |

**성능**
- 좋은 휴리스틱: 다익스트라보다 **훨씬 빠름**
- h=0이면 다익스트라와 동일
- 최악: 다익스트라와 같은 O((V+E) log V)

**참고자료**
- [A* search algorithm - Wikipedia](https://en.wikipedia.org/wiki/A*_search_algorithm)[^44]

</details>

[^44]: A* 탐색 알고리즘 설명

### DS-045
음수 간선이 있을 때와, 음수 사이클이 있을 때 각각 어떤 최단거리 알고리즘을 사용해야 하는지 설명해 주세요.

<details>
<summary>답변</summary>

**음수 간선이 있을 때 (음수 사이클 없음)**

| 알고리즘 | 사용 가능 | 시간복잡도 |
|---------|---------|-----------|
| Dijkstra | **불가** | - |
| Bellman-Ford | **가능** | O(VE) |
| SPFA | **가능** | 평균 O(E), 최악 O(VE) |
| Floyd-Warshall | **가능** | O(V^3) |

**Dijkstra가 불가능한 이유**
- 한 번 확정된 최단 거리가 나중에 더 짧아질 수 있음
- Greedy 접근이 실패

**음수 사이클이 있을 때**

최단 거리가 **정의되지 않음** (무한히 작아질 수 있음)

**대응 방법**
1. **Bellman-Ford**로 음수 사이클 **탐지**
   - V번째 반복에서도 갱신이 발생하면 음수 사이클 존재
2. **Floyd-Warshall**로 탐지
   - d[i][i] < 0이면 음수 사이클 존재

```java
// Bellman-Ford 음수 사이클 탐지
for (모든 간선 (u, v, w)) {
    if (dist[u] + w < dist[v]) {
        // 음수 사이클 존재!
    }
}
```

**참고자료**
- [Bellman-Ford algorithm - Wikipedia](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm)[^45]

</details>

[^45]: Bellman-Ford 알고리즘 및 음수 사이클 탐지

---

## 📌 재귀 (Recursion)

### DS-046
재귀함수에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**재귀함수**는 자기 자신을 호출하는 함수입니다.

**구성 요소**
1. **Base Case (기저 조건)**: 재귀를 멈추는 조건
2. **Recursive Case**: 자기 자신을 호출하는 부분
3. **문제 축소**: 각 호출마다 문제 크기가 감소

**예시: 팩토리얼**
```java
int factorial(int n) {
    if (n <= 1) return 1;           // Base Case
    return n * factorial(n - 1);     // Recursive Case
}
```

**장점**
- 코드가 간결하고 이해하기 쉬움
- 분할 정복, 트리 탐색 등에 자연스러움

**단점**
- 호출 스택 오버헤드
- Stack Overflow 위험
- 반복문보다 느릴 수 있음

**활용**
- 트리/그래프 탐색 (DFS)
- 분할 정복 (Merge Sort, Quick Sort)
- 동적 계획법 (메모이제이션)
- 백트래킹

**참고자료**
- [Recursion (computer science) - Wikipedia](https://en.wikipedia.org/wiki/Recursion_(computer_science))[^46]

</details>

[^46]: 재귀 개념 설명

### DS-047
재귀 함수의 동작 과정을 Call Stack을 활용해서 설명해 주세요.

<details>
<summary>답변</summary>

**Call Stack**: 함수 호출 정보를 저장하는 스택 자료구조

**저장 정보**
- 반환 주소 (Return Address)
- 지역 변수
- 매개변수
- 이전 스택 프레임 포인터

**factorial(4) 호출 과정**

```
1. factorial(4) 호출
   Stack: [factorial(4)]

2. factorial(3) 호출
   Stack: [factorial(4), factorial(3)]

3. factorial(2) 호출
   Stack: [factorial(4), factorial(3), factorial(2)]

4. factorial(1) 호출 - Base Case
   Stack: [factorial(4), factorial(3), factorial(2), factorial(1)]

5. factorial(1) 반환 → 1
   Stack: [factorial(4), factorial(3), factorial(2)]

6. factorial(2) 반환 → 2 * 1 = 2
   Stack: [factorial(4), factorial(3)]

7. factorial(3) 반환 → 3 * 2 = 6
   Stack: [factorial(4)]

8. factorial(4) 반환 → 4 * 6 = 24
   Stack: []
```

**Stack Overflow**
- 스택 크기는 제한적 (보통 1MB)
- 재귀 깊이가 너무 깊으면 오버플로우 발생

**참고자료**
- [Call stack - Wikipedia](https://en.wikipedia.org/wiki/Call_stack)[^47]

</details>

[^47]: 콜 스택 동작 원리

### DS-048
언어의 스펙에 따라, 재귀함수의 최적화를 진행해주는 경우가 있습니다. 어떤 경우에 재귀함수의 최적화가 가능하며, 이를 어떻게 최적화 할 수 있을지 설명해 주세요.

<details>
<summary>답변</summary>

**꼬리 재귀 최적화 (Tail Call Optimization, TCO)**

**꼬리 재귀 조건**
- 재귀 호출이 함수의 **마지막 연산**이어야 함
- 재귀 호출 결과를 그대로 반환

```java
// 꼬리 재귀 (최적화 가능)
int factorialTail(int n, int acc) {
    if (n <= 1) return acc;
    return factorialTail(n - 1, n * acc);  // 마지막이 재귀 호출
}

// 일반 재귀 (최적화 불가)
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);  // 곱셈이 마지막 연산
}
```

**최적화 방법**
- 컴파일러가 재귀를 **반복문으로 변환**
- 스택 프레임을 재사용하여 O(1) 공간

**언어별 지원**
| 언어 | TCO 지원 |
|-----|---------|
| Scheme, Haskell | 필수 (스펙) |
| Scala, Kotlin | 지원 (@tailrec) |
| JavaScript | ES6 스펙 (구현은 제한적) |
| Java, Python | **미지원** |
| C/C++ | 컴파일러 최적화로 가능 |

**참고자료**
- [Tail call - Wikipedia](https://en.wikipedia.org/wiki/Tail_call)[^48]

</details>

[^48]: 꼬리 호출 최적화 설명

---

## 📌 MST (Minimum Spanning Tree)

### DS-049
MST가 무엇이고, 어떻게 구할 수 있을지 설명해 주세요.

<details>
<summary>답변</summary>

**MST (최소 신장 트리)**는 그래프의 모든 정점을 연결하면서 간선 가중치 합이 최소인 트리입니다.

**특징**
- 정점 V개, 간선 V-1개
- 사이클 없음
- 연결 그래프

**구하는 알고리즘**

**1. Kruskal 알고리즘**
1. 모든 간선을 가중치 순으로 정렬
2. 가장 작은 간선부터 선택
3. 사이클이 생기면 건너뜀 (Union-Find로 확인)
4. V-1개 간선 선택 시 종료

시간복잡도: O(E log E)

**2. Prim 알고리즘**
1. 임의의 정점에서 시작
2. 현재 트리와 연결된 간선 중 최소 가중치 선택
3. 새 정점을 트리에 추가
4. 모든 정점 포함 시 종료

시간복잡도: O(E log V) (힙 사용)

**참고자료**
- [Minimum spanning tree - Wikipedia](https://en.wikipedia.org/wiki/Minimum_spanning_tree)[^49]

</details>

[^49]: 최소 신장 트리 개념 및 알고리즘

### DS-050
Kruskal 알고리즘에서 사용하는 Union-Find 자료구조에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Union-Find (Disjoint Set Union, DSU)**는 서로소 집합을 관리하는 자료구조입니다.

**주요 연산**
- **Find(x)**: x가 속한 집합의 대표(루트) 반환
- **Union(x, y)**: x와 y가 속한 집합을 합침

**최적화 기법**

**1. Path Compression (경로 압축)**
- Find 시 모든 노드를 루트에 직접 연결
```java
int find(int x) {
    if (parent[x] != x)
        parent[x] = find(parent[x]);  // 경로 압축
    return parent[x];
}
```

**2. Union by Rank/Size**
- 작은 트리를 큰 트리에 붙임
```java
void union(int x, int y) {
    int px = find(x), py = find(y);
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
}
```

**시간복잡도**
- 두 최적화 적용 시: O(α(n)) ≈ O(1)
- α: 아커만 함수의 역함수 (매우 느리게 증가)

**참고자료**
- [Disjoint-set data structure - Wikipedia](https://en.wikipedia.org/wiki/Disjoint-set_data_structure)[^50]

</details>

[^50]: Union-Find 자료구조 설명

### DS-051
Kruskal 과 Prim 중, 어떤 것이 더 빠를까요?

<details>
<summary>답변</summary>

**상황에 따라 다릅니다.**

| 알고리즘 | 시간복잡도 | 적합한 경우 |
|---------|-----------|-----------|
| Kruskal | O(E log E) | 희소 그래프 |
| Prim (힙) | O(E log V) | 밀집 그래프 |
| Prim (배열) | O(V^2) | 매우 밀집된 그래프 |

**비교 분석**

**희소 그래프 (E ≈ V)**
- Kruskal: O(V log V)
- Prim: O(V log V)
- 비슷하지만 Kruskal이 구현 간단

**밀집 그래프 (E ≈ V^2)**
- Kruskal: O(V^2 log V)
- Prim (힙): O(V^2 log V)
- Prim (배열): O(V^2)
- **Prim (배열)이 유리**

**추가 고려사항**
- Kruskal: 간선 정렬 필요, Union-Find 오버헤드
- Prim: 시작점 필요, 우선순위 큐 관리

**결론**
- E < V log V: Kruskal
- E > V log V: Prim
- 일반적으로 큰 차이 없음

**참고자료**
- [Prim's algorithm - Wikipedia](https://en.wikipedia.org/wiki/Prim%27s_algorithm)[^51]

</details>

[^51]: Prim 알고리즘 설명

### DS-052
Kruskal 과 Prim 알고리즘을 통해 얻어진 결과물은 무조건 트리인가요? 만약 그렇다면 증명해 주세요. 그렇지 않다면, 반례를 설명해 주세요.

<details>
<summary>답변</summary>

**예, 항상 트리입니다.** (연결 그래프가 입력인 경우)

**트리의 조건**
1. 사이클이 없음
2. 연결되어 있음
3. 간선 수 = 정점 수 - 1

**Kruskal 증명**

1. **사이클 없음**: Union-Find로 사이클 형성 간선을 명시적으로 제외
2. **연결성**: 연결 그래프에서 V-1개 간선 선택 시 모든 정점 연결
3. **간선 수**: 정확히 V-1개 선택하면 종료

**Prim 증명**

1. **사이클 없음**: 항상 트리에 포함되지 않은 정점으로 확장
   - 이미 트리에 있는 정점으로 간선을 추가하지 않음
2. **연결성**: 시작점에서 확장하므로 모든 선택된 정점이 연결됨
3. **간선 수**: V개 정점 모두 포함 시 V-1개 간선

**비연결 그래프인 경우**
- 최소 신장 **포레스트**가 생성됨
- 각 연결 요소에 대해 별도의 트리

**참고자료**
- [Kruskal's algorithm correctness](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm#Correctness)[^52]

</details>

[^52]: Kruskal 알고리즘 정당성 증명

---

## 📌 기타 알고리즘

### DS-053
Thread Safe 한 자료구조가 있을까요? 없다면, 어떻게 Thread Safe 하게 구성할 수 있을까요?

<details>
<summary>답변</summary>

**Thread Safe 자료구조 존재합니다.**

**Java 제공 Thread Safe 자료구조**
- `ConcurrentHashMap`
- `CopyOnWriteArrayList`
- `BlockingQueue` (LinkedBlockingQueue 등)
- `ConcurrentLinkedQueue`
- `Collections.synchronizedXxx()`

**Thread Safe 구성 방법**

**1. 동기화 (Synchronization)**
```java
synchronized(list) {
    list.add(item);
}
```

**2. Lock 사용**
```java
ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    // 임계 영역
} finally {
    lock.unlock();
}
```

**3. Atomic 연산**
```java
AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();  // 원자적 증가
```

**4. Immutable 객체**
- 불변 객체는 본질적으로 Thread Safe

**5. Thread Local**
- 각 스레드가 독립된 복사본 보유

**참고자료**
- [ConcurrentHashMap (Java SE 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html)[^53]

</details>

[^53]: Java ConcurrentHashMap 공식 문서

### DS-054
배열의 길이를 알고 있다면, 조금 더 빠른 Thread Safe 한 연산을 만들 순 없을까요?

<details>
<summary>답변</summary>

**예, 분할 잠금(Lock Striping)을 사용할 수 있습니다.**

**방법 1: 세그먼트별 락**
```java
class StripedArray<T> {
    T[] data;
    Object[] locks;
    int stripeCount;

    void set(int index, T value) {
        int stripe = index % stripeCount;
        synchronized(locks[stripe]) {
            data[index] = value;
        }
    }
}
```
- 배열을 여러 세그먼트로 분할
- 각 세그먼트에 별도의 락
- 서로 다른 세그먼트는 동시 접근 가능

**방법 2: 인덱스별 락 (Fine-grained)**
- 각 인덱스마다 독립된 락
- 최대 병렬성, 메모리 오버헤드 큼

**방법 3: Lock-Free with CAS**
```java
AtomicReferenceArray<T> array = new AtomicReferenceArray<>(size);
array.compareAndSet(index, expected, newValue);
```

**방법 4: 읽기 최적화**
- `ReadWriteLock`: 읽기는 동시에, 쓰기만 배타적
- `StampedLock`: 낙관적 읽기 지원

**최적 선택**: 접근 패턴에 따라 세그먼트 수 조정

**참고자료**
- [AtomicReferenceArray (Java SE 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/atomic/AtomicReferenceArray.html)[^54]

</details>

[^54]: Java AtomicReferenceArray 공식 문서

### DS-055
사용하고 있는 언어의 자료구조는 Thread Safe 한가요? 그렇지 않다면, Thread Safe 한 Wrapped Data Structure 를 제공하고 있나요?

<details>
<summary>답변</summary>

**Java 기본 컬렉션: Thread Safe 하지 않음**

`ArrayList`, `HashMap`, `HashSet` 등은 동기화되지 않음

**Thread Safe 대안**

**1. Collections.synchronizedXxx()**
```java
List<String> syncList = Collections.synchronizedList(new ArrayList<>());
Map<K,V> syncMap = Collections.synchronizedMap(new HashMap<>());
```
- 모든 메서드를 synchronized로 래핑
- 단순하지만 성능 저하 (전체 락)

**2. java.util.concurrent 패키지**
| 기본 | Thread Safe |
|-----|-------------|
| HashMap | ConcurrentHashMap |
| ArrayList | CopyOnWriteArrayList |
| LinkedList | ConcurrentLinkedQueue |
| TreeMap | ConcurrentSkipListMap |
| HashSet | ConcurrentHashMap.newKeySet() |

**3. 레거시 Thread Safe 컬렉션**
- `Vector` (ArrayList 대신)
- `Hashtable` (HashMap 대신)
- 성능이 낮아 권장하지 않음

**Python**: GIL로 인해 일부 연산은 atomic하지만, 완전한 Thread Safe는 아님. `queue.Queue` 등 제공

**참고자료**
- [Collections.synchronizedList (Java SE 21)](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collections.html#synchronizedList(java.util.List))[^55]

</details>

[^55]: Java Collections.synchronizedList 공식 문서

### DS-056
문자열을 저장하고, 처리하는 주요 자료구조 및 알고리즘 (Trie, KMP, Rabin Karp 등) 에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**자료구조**

**Trie (Prefix Tree)**
- 문자열을 문자 단위로 트리에 저장
- 접두사 검색에 최적화
- 시간: 삽입/검색 O(m), m = 문자열 길이
- 공간: O(알파벳 크기 * 총 문자 수)
- 활용: 자동완성, 사전

**Suffix Tree / Suffix Array**
- 모든 접미사를 저장
- 부분 문자열 검색 O(m)
- 공간: Suffix Array가 더 효율적

**알고리즘 (패턴 매칭)**

| 알고리즘 | 시간복잡도 | 특징 |
|---------|-----------|------|
| Naive | O(nm) | 단순 비교 |
| **KMP** | O(n+m) | 실패 함수로 불필요한 비교 스킵 |
| **Rabin-Karp** | O(n+m) 평균 | 해시 기반, 다중 패턴에 유리 |
| Boyer-Moore | O(n/m) 최선 | 뒤에서부터 비교 |

**KMP**: 접두사=접미사 정보를 활용하여 불일치 시 패턴을 효율적으로 이동

**Rabin-Karp**: 롤링 해시로 윈도우 해시값을 O(1)에 갱신, 해시 일치 시 실제 비교

**참고자료**
- [Trie - Wikipedia](https://en.wikipedia.org/wiki/Trie)[^56]

</details>

[^56]: Trie 자료구조 설명

### DS-057
이진탐색이 무엇인지 설명하고, 시간복잡도를 증명해 보세요.

<details>
<summary>답변</summary>

**이진 탐색**: 정렬된 배열에서 중간값과 비교하여 탐색 범위를 절반씩 줄여나가는 알고리즘

**알고리즘**
```java
int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

**시간복잡도: O(log n)**

**증명**
- 각 단계에서 탐색 범위가 절반으로 감소
- k번째 단계의 탐색 범위: n / 2^k
- 탐색 종료 조건: n / 2^k <= 1
- 따라서: 2^k >= n → k >= log₂n
- 최대 반복 횟수: **O(log n)**

**점화식 증명**
```
T(n) = T(n/2) + O(1)
마스터 정리 적용: a=1, b=2, f(n)=O(1)
log_b(a) = 0, f(n) = O(n^0)
따라서 T(n) = O(log n)
```

**참고자료**
- [Binary search algorithm - Wikipedia](https://en.wikipedia.org/wiki/Binary_search_algorithm)[^57]

</details>

[^57]: 이진 탐색 알고리즘 설명

### DS-058
Lower Bound, Upper Bound 는 무엇이고, 이를 어떻게 구현할 수 있을까요?

<details>
<summary>답변</summary>

**정의 (정렬된 배열에서)**
- **Lower Bound**: target **이상**인 첫 번째 위치
- **Upper Bound**: target **초과**인 첫 번째 위치

**예시**: [1, 2, 2, 2, 3, 4]에서 target=2
- Lower Bound: index 1 (첫 번째 2)
- Upper Bound: index 4 (첫 번째 3)
- 2의 개수 = Upper - Lower = 4 - 1 = 3

**구현**
```java
int lowerBound(int[] arr, int target) {
    int left = 0, right = arr.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < target) left = mid + 1;
        else right = mid;  // arr[mid] >= target
    }
    return left;
}

int upperBound(int[] arr, int target) {
    int left = 0, right = arr.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) left = mid + 1;
        else right = mid;  // arr[mid] > target
    }
    return left;
}
```

**차이점**: `<` vs `<=` 부등호 하나 차이

**활용**: 특정 값의 개수, 범위 쿼리, 삽입 위치 찾기

**참고자료**
- [std::lower_bound - cppreference](https://en.cppreference.com/w/cpp/algorithm/lower_bound)[^58]

</details>

[^58]: C++ lower_bound 함수 레퍼런스

### DS-059
이진탐색의 논리를 적용하여 삼진탐색을 작성한다고 가정한다면, 시간복잡도는 어떻게 변화할까요? (실제 존재하는 삼진탐색 알고리즘은 무시하세요!)

<details>
<summary>답변</summary>

**삼진 탐색 (가상)**: 배열을 3등분하여 탐색

**시간복잡도: O(log₃n) = O(log n)**

**분석**
- 각 단계에서 범위가 1/3로 감소
- 최대 반복 횟수: log₃n
- 밑 변환: log₃n = log₂n / log₂3 ≈ 0.63 * log₂n

**비교 횟수 분석**
- 이진 탐색: 단계당 1~2번 비교, 총 log₂n 단계
- 삼진 탐색: 단계당 2번 비교 필요, 총 log₃n 단계

**총 비교 횟수**
- 이진: 약 log₂n ≈ 1.0 * log₂n 비교
- 삼진: 약 2 * log₃n ≈ 2 * 0.63 * log₂n ≈ 1.26 * log₂n 비교

**결론**
- 빅오 표기법: 동일한 O(log n)
- **실제 비교 횟수: 이진 탐색이 더 적음**
- 분기를 늘려도 비교 횟수 증가로 이점 상쇄
- 캐시 효율도 이진 탐색이 유리

**참고자료**
- [Ternary search - Wikipedia](https://en.wikipedia.org/wiki/Ternary_search)[^59]

</details>

[^59]: 삼진 탐색 알고리즘 (최적화 문제용)

### DS-060
기존 이진탐색 로직에서 부등호의 범위가 바뀐다면, 어떤 영향이 있을까요?

<details>
<summary>답변</summary>

부등호 변경은 **탐색 결과와 종료 조건**에 큰 영향을 줍니다.

**주요 변경 포인트**

**1. 비교 부등호 (`<` vs `<=`)**
```java
// Lower Bound (target 이상 첫 위치)
if (arr[mid] < target) left = mid + 1;

// Upper Bound (target 초과 첫 위치)
if (arr[mid] <= target) left = mid + 1;
```

**2. 루프 조건 (`<` vs `<=`)**
```java
while (left < right)   // right가 답이 될 수 있음
while (left <= right)  // left > right일 때 종료
```

**3. right 초기값**
```java
right = arr.length - 1  // 마지막 유효 인덱스
right = arr.length      // 배열 끝 다음 (삽입 위치용)
```

**잘못된 부등호의 결과**
- **무한 루프**: mid 계산과 범위 갱신이 맞지 않을 때
- **Off-by-one 에러**: 정확히 하나 벗어난 결과
- **경계 누락**: 첫 번째/마지막 요소 탐색 실패

**안전한 패턴**
```java
// 정확한 값 찾기
while (left <= right) { mid = (left+right)/2; ... }

// 범위 찾기 (Lower/Upper Bound)
while (left < right) { mid = (left+right)/2; ... }
```

**참고자료**
- [Binary search - Implementation issues](https://en.wikipedia.org/wiki/Binary_search_algorithm#Implementation_issues)[^60]

</details>

[^60]: 이진 탐색 구현 시 주의사항

### DS-061
그리디 알고리즘과 동적 계획법을 비교해 주세요.

<details>
<summary>답변</summary>

| 항목 | 그리디 | 동적 계획법 (DP) |
|-----|-------|----------------|
| **접근법** | 현재 최선의 선택 | 모든 경우 고려 |
| **최적 보장** | 특정 조건 시만 | 항상 보장 |
| **시간복잡도** | 일반적으로 낮음 | 상태 수에 비례 |
| **공간복잡도** | O(1) 가능 | 상태 저장 필요 |
| **되돌림** | 없음 | 있음 (서브문제 재활용) |

**그리디 알고리즘**
- 각 단계에서 **지역 최적해** 선택
- **탐욕 선택 속성**: 지역 최적이 전역 최적으로 이어짐
- **최적 부분 구조**: 부분 문제의 최적해로 전체 최적해 구성
- 예: 거스름돈, 활동 선택, Huffman 코딩

**동적 계획법**
- **중복 부분 문제**: 같은 부분 문제가 반복
- **최적 부분 구조**: 부분 문제의 최적해로 전체 최적해 구성
- 메모이제이션 또는 타뷸레이션으로 중복 계산 방지
- 예: 피보나치, 배낭 문제, 최장 공통 부분 수열

**참고자료**
- [Greedy algorithm - Wikipedia](https://en.wikipedia.org/wiki/Greedy_algorithm)[^61]

</details>

[^61]: 그리디 알고리즘 개념 설명

### DS-062
그렇다면, 어떤 경우에 각각의 기법을 사용할 수 있을까요?

<details>
<summary>답변</summary>

**그리디를 사용할 수 있는 경우**

**조건**
1. **탐욕 선택 속성**: 현재 최선이 전체 최선으로 이어짐
2. **최적 부분 구조**: 부분 문제의 최적해가 전체 최적해 구성

**대표 문제**
- 거스름돈 (특정 화폐 단위)
- 활동 선택 (회의실 배정)
- 최소 신장 트리 (Kruskal, Prim)
- 다익스트라 최단 경로
- Huffman 인코딩

**DP를 사용해야 하는 경우**

**조건**
1. **중복 부분 문제**: 같은 계산이 반복
2. **최적 부분 구조**: 있지만 그리디로 안 됨
3. 선택이 **미래에 영향**을 미침

**대표 문제**
- 0/1 배낭 문제 (그리디 불가)
- 최장 공통 부분 수열 (LCS)
- 편집 거리
- 행렬 체인 곱셈
- 동전 교환 (일반적인 화폐 단위)

**판단 기준**
```
그리디로 풀어본다 → 반례 발견 → DP로 전환
```

**참고자료**
- [Dynamic programming - Wikipedia](https://en.wikipedia.org/wiki/Dynamic_programming)[^62]

</details>

[^62]: 동적 계획법 개념 설명

### DS-063
동적 계획법으로 풀 수 있는 모든 문제는 재귀로 변환하여 풀 수 있나요?

<details>
<summary>답변</summary>

**예, 가능합니다.**

DP와 재귀(메모이제이션)는 **수학적으로 동치**입니다.

**두 가지 접근법**

**1. Top-Down (재귀 + 메모이제이션)**
```java
int[] memo = new int[n+1];
int fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];
    return memo[n] = fib(n-1) + fib(n-2);
}
```

**2. Bottom-Up (타뷸레이션)**
```java
int fib(int n) {
    int[] dp = new int[n+1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}
```

**차이점**

| 항목 | Top-Down | Bottom-Up |
|-----|---------|----------|
| 구현 | 직관적 | 상태 순서 고려 필요 |
| 필요한 상태만 | 계산 | 모두 계산 |
| 스택 오버플로우 | 가능 | 없음 |
| 공간 최적화 | 어려움 | 용이 |

**결론**: 모든 DP 문제는 재귀로 표현 가능하며, 메모이제이션을 추가하면 동일한 시간복잡도 달성

**참고자료**
- [Memoization - Wikipedia](https://en.wikipedia.org/wiki/Memoization)[^63]

</details>

[^63]: 메모이제이션 기법 설명
