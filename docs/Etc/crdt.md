# CRDT (Yjs) / 충돌 없는 복제 데이터 타입

> 카테고리: 분산 시스템
> [← 면접 질문 목록으로 돌아가기](../interview.md)

---

## 📌 CRDT 기본 개념

### CRDT-001
CRDT(Conflict-free Replicated Data Type)의 기본 개념과 사용 목적은 무엇인가요?

<details>
<summary>답변</summary>

CRDT는 분산 시스템에서 여러 복제본(replica)이 독립적으로 수정되더라도 충돌 없이 자동으로 병합될 수 있도록 설계된 데이터 구조입니다.

**핵심 특징:**
- **중앙 서버 불필요**: 각 클라이언트가 독립적으로 데이터를 수정하고, 최종적으로 모든 복제본이 동일한 상태로 수렴
- **Eventual Consistency 보장**: 동일한 업데이트를 받은 모든 복제본은 결정론적으로 같은 상태에 도달
- **오프라인 지원**: 네트워크 연결 없이도 로컬 편집이 가능하며, 나중에 동기화

**사용 목적:**
- 실시간 협업 애플리케이션 (Google Docs, Figma 등)
- 오프라인-퍼스트 애플리케이션
- P2P 분산 시스템

**참고자료**
- [CRDT.tech - About CRDTs](https://crdt.tech/)[^1]
- [Shapiro et al., "Conflict-free Replicated Data Types"](https://pages.lip6.fr/Marc.Shapiro/papers/RR-7687.pdf)[^2]

</details>

[^1]: CRDT 공식 커뮤니티 사이트
[^2]: CRDT를 최초로 정의한 학술 논문 (2011)

### CRDT-002
Yjs 라이브러리의 주요 기능과 특징에 대해 설명해주세요.

<details>
<summary>답변</summary>

Yjs는 고성능 CRDT 라이브러리로, 실시간 협업 애플리케이션 구축에 최적화되어 있습니다.

**주요 기능:**
- **공유 데이터 타입**: Y.Array, Y.Map, Y.Text, Y.XmlFragment 등 다양한 CRDT 데이터 타입 제공
- **네트워크 독립적**: WebSocket, WebRTC, Hyper 등 다양한 네트워크 기술과 연동 가능
- **풍부한 에디터 통합**: ProseMirror, Quill, Monaco, CodeMirror 등 주요 에디터 바인딩 지원

**특징:**
- **최고 수준의 성능**: 벤치마크에서 가장 빠른 CRDT 구현체로 평가
- **YATA 알고리즘**: 효율적인 텍스트 편집을 위한 최적화된 알고리즘 사용
- **바이너리 인코딩**: 메모리 효율적인 바이너리 형식으로 데이터 저장
- **모듈화 구조**: 필요한 기능만 선택적으로 사용 가능

**참고자료**
- [Yjs 공식 문서](https://docs.yjs.dev/)[^3]
- [Yjs GitHub](https://github.com/yjs/yjs)[^4]

</details>

[^3]: Yjs 공식 문서
[^4]: Yjs GitHub 저장소

### CRDT-003
Yjs를 사용하여 분산 환경에서 데이터 동기화를 구현하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

Yjs에서 분산 데이터 동기화는 Provider와 Y.Doc을 통해 구현됩니다.

**기본 구현 단계:**

```javascript
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

// 1. 공유 문서 생성
const ydoc = new Y.Doc()

// 2. Provider 연결 (네트워크 레이어)
const provider = new WebsocketProvider(
  'wss://your-server.com',
  'room-name',
  ydoc
)

// 3. 공유 데이터 타입 사용
const ytext = ydoc.getText('shared-text')
ytext.insert(0, 'Hello World')
```

**동기화 메커니즘:**
- **업데이트 전파**: 로컬 변경사항이 자동으로 연결된 모든 피어에게 전파
- **순서 독립적**: 업데이트가 도착하는 순서와 관계없이 동일한 결과 보장
- **증분 동기화**: 전체 문서가 아닌 변경된 부분만 전송

**주요 Provider:**
- `y-websocket`: WebSocket 기반 동기화
- `y-webrtc`: P2P WebRTC 동기화
- `y-indexeddb`: 브라우저 로컬 저장소

**참고자료**
- [Yjs Providers](https://docs.yjs.dev/ecosystem/connection-provider)[^5]

</details>

[^5]: Yjs 공식 문서 - Connection Providers

---

## 📌 CRDT vs OT

### CRDT-004
CRDT와 OT(Operational Transformation)의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

CRDT와 OT는 모두 분산 환경에서 협업 편집을 가능하게 하지만, 근본적인 접근 방식이 다릅니다.

| 구분 | OT | CRDT |
|------|-----|------|
| **충돌 해결 위치** | 변환 함수에서 중앙 집중화 | 데이터 구조 자체에 분산 |
| **서버 의존성** | 중앙 서버 필요 (일반적) | 완전한 P2P 가능 |
| **오프라인 지원** | 제한적 | 우수함 |
| **메모리 사용** | 낮음 | 높음 (메타데이터 오버헤드) |
| **의도 보존** | 우수함 | 제한적 |

**OT 동작 방식:**
- 편집을 연산(operation) 시퀀스로 처리
- 동시 연산 발생 시 서버에서 변환(transform)하여 적용
- 예: "위치 5에 삽입" → 다른 편집으로 인해 "위치 3에 삽입"으로 변환

**CRDT 동작 방식:**
- 데이터 구조 자체에 충분한 메타데이터 포함
- 각 요소에 고유 ID 부여하여 위치 대신 ID 기반 참조
- 예: "문자 ID 'a1b2' 뒤에 삽입"

**실제 사용 사례:**
- OT: Google Docs
- CRDT: Figma, Notion (일부)

**참고자료**
- [Real Differences between OT and CRDT](https://arxiv.org/abs/1905.01518)[^6]
- [Building real-time collaboration: OT vs CRDT](https://www.tiny.cloud/blog/real-time-collaboration-ot-vs-crdt/)[^7]

</details>

[^6]: OT와 CRDT의 차이를 분석한 학술 논문
[^7]: TinyMCE 블로그 - OT vs CRDT 비교

---

## 📌 Yjs 데이터 타입

### CRDT-005
Yjs에서 제공하는 데이터 타입(Y.Array, Y.Map 등)의 역할과 사용 사례는 무엇인가요?

<details>
<summary>답변</summary>

Yjs는 다양한 공유 데이터 타입을 제공하며, 각각 특정 사용 사례에 최적화되어 있습니다.

**주요 데이터 타입:**

| 타입 | 설명 | 사용 사례 |
|------|------|----------|
| **Y.Text** | 협업 텍스트 편집 | 문서 편집기, 코드 에디터 |
| **Y.Array** | 순서가 있는 리스트 | 할 일 목록, 슬라이드 순서 |
| **Y.Map** | 키-값 저장소 | 설정, 사용자 정보 |
| **Y.XmlFragment** | XML/HTML 구조 | 리치 텍스트, DOM 구조 |
| **Y.XmlElement** | XML 요소 | 계층적 문서 구조 |

**코드 예시:**

```javascript
const ydoc = new Y.Doc()

// Y.Text - 텍스트 편집
const ytext = ydoc.getText('editor')
ytext.insert(0, 'Hello')

// Y.Array - 리스트 관리
const yarray = ydoc.getArray('todos')
yarray.push(['Task 1', 'Task 2'])

// Y.Map - 키-값 저장
const ymap = ydoc.getMap('settings')
ymap.set('theme', 'dark')
```

**중첩 구조:**
- Y.Map과 Y.Array는 다른 공유 타입을 포함할 수 있어 복잡한 데이터 구조 표현 가능

**참고자료**
- [Yjs Shared Types](https://docs.yjs.dev/api/shared-types)[^8]

</details>

[^8]: Yjs 공식 문서 - Shared Types

---

## 📌 Yjs 업데이트 전파

### CRDT-006
Yjs의 업데이트 전파 및 문서 병합 방식은 어떻게 동작하나요?

<details>
<summary>답변</summary>

Yjs는 효율적인 바이너리 인코딩과 증분 업데이트를 통해 변경사항을 전파합니다.

**업데이트 전파 과정:**

1. **로컬 변경 감지**: 공유 타입에 변경 발생
2. **업데이트 인코딩**: 변경사항을 Uint8Array로 인코딩
3. **전파**: Provider를 통해 다른 피어에게 전송
4. **적용**: 수신 측에서 업데이트 디코딩 및 적용

```javascript
// 업데이트 인코딩
const update = Y.encodeStateAsUpdate(ydoc)

// 업데이트 적용
Y.applyUpdate(targetDoc, update)

// 업데이트 이벤트 리스닝
ydoc.on('update', (update, origin) => {
  // 다른 피어에게 전송
  broadcastUpdate(update)
})
```

**문서 병합:**
- **State Vector**: 각 클라이언트의 현재 상태를 벡터로 표현
- **차이점만 전송**: 두 문서의 State Vector를 비교하여 누락된 업데이트만 전송

```javascript
// State Vector 기반 동기화
const stateVector = Y.encodeStateVector(ydoc)
const diff = Y.encodeStateAsUpdate(remoteDoc, stateVector)
Y.applyUpdate(ydoc, diff)
```

**참고자료**
- [Yjs Document Updates](https://docs.yjs.dev/api/document-updates)[^9]

</details>

[^9]: Yjs 공식 문서 - Document Updates

---

## 📌 Yjs 버전 관리

### CRDT-007
Yjs에서 문서의 버전 관리와 업데이트 충돌 해결 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

Yjs는 고유한 클라이언트 ID와 논리적 시계를 사용하여 버전을 관리하고 충돌을 해결합니다.

**버전 관리 메커니즘:**

- **Client ID**: 각 Y.Doc 인스턴스에 고유한 ID 할당
- **Clock**: 각 클라이언트별로 단조 증가하는 논리적 시계
- **State Vector**: `Map<clientID, clock>` 형태로 문서 상태 표현

```javascript
// 현재 State Vector 확인
const stateVector = Y.encodeStateVector(ydoc)

// Snapshot으로 특정 시점 저장
const snapshot = Y.snapshot(ydoc)

// 스냅샷 간 비교
const diff = Y.encodeStateAsUpdate(ydoc,
  Y.encodeSnapshotV2(snapshot))
```

**충돌 해결:**

YATA 알고리즘에 기반한 결정론적 규칙:
1. **삽입 위치 결정**: 동일 위치 삽입 시 클라이언트 ID로 순서 결정
2. **삭제 처리**: 삭제된 항목은 tombstone으로 마킹 (실제 제거 대신)
3. **자동 병합**: 모든 클라이언트가 동일한 규칙을 적용하므로 최종 상태 수렴 보장

**참고자료**
- [Yjs Internals](https://docs.yjs.dev/api/internals)[^10]

</details>

[^10]: Yjs 공식 문서 - Internals

---

## 📌 Yjs Awareness

### CRDT-008
Yjs의 Awareness 프로토콜이란 무엇이며, 어떤 기능을 제공하나요?

<details>
<summary>답변</summary>

Awareness는 사용자 존재 정보(presence)와 커서 위치 등 일시적인 상태를 공유하는 프로토콜입니다.

**주요 기능:**
- **온라인 상태 추적**: 누가 현재 접속 중인지 확인
- **커서 위치 공유**: 다른 사용자의 편집 위치 표시
- **사용자 정보 전파**: 이름, 색상, 아바타 등

**구현 방식:**

```javascript
import { Awareness } from 'y-protocols/awareness'

const awareness = new Awareness(ydoc)

// 로컬 상태 설정
awareness.setLocalState({
  user: { name: 'Alice', color: '#ff0000' },
  cursor: { anchor: 10, head: 15 }
})

// 상태 변경 리스닝
awareness.on('change', ({ added, updated, removed }) => {
  // 사용자 목록 UI 업데이트
})

// 모든 사용자 상태 가져오기
const states = awareness.getStates()
```

**동작 원리:**
- 각 클라이언트는 고유한 `clientID`를 가짐
- 상태 변경 시 증가하는 clock과 함께 JSON 객체 전파
- **30초 타임아웃**: 업데이트 없으면 오프라인으로 간주
- **heartbeat 필요**: 정기적인 상태 브로드캐스트 권장

**참고자료**
- [Yjs Awareness](https://docs.yjs.dev/api/about-awareness)[^11]
- [y-protocols GitHub](https://github.com/yjs/y-protocols)[^12]

</details>

[^11]: Yjs 공식 문서 - Awareness
[^12]: Yjs Protocols GitHub 저장소

---

## 📌 Yjs Relative Versioning

### CRDT-009
Yjs의 상대적 버전 관리(relative versioning) 메커니즘은 어떻게 작동하나요?

<details>
<summary>답변</summary>

Relative Position은 절대적인 인덱스 대신 다른 요소와의 관계로 위치를 표현하는 메커니즘입니다.

**필요성:**
- CRDT에서 절대 인덱스는 동시 편집 시 무효화될 수 있음
- 커서 위치, 선택 영역 등을 안정적으로 유지해야 함

**Relative Position 원리:**

```javascript
import * as Y from 'yjs'

const ytext = ydoc.getText('editor')

// 현재 위치를 Relative Position으로 변환
const relPos = Y.createRelativePositionFromTypeIndex(ytext, 5)

// 나중에 다시 절대 위치로 변환
const absPos = Y.createAbsolutePositionFromRelativePosition(
  relPos,
  ydoc
)
console.log(absPos.index) // 변경된 문서에서의 새 위치
```

**내부 구조:**
- `type`: 참조하는 공유 타입
- `item`: 기준이 되는 항목의 ID (clientID + clock)
- `assoc`: 항목의 앞(-1) 또는 뒤(1)를 가리킴

**활용 사례:**
- 커서 위치 저장 및 복원
- 주석/코멘트의 텍스트 범위 추적
- Undo/Redo 구현

**참고자료**
- [Yjs Relative Positions](https://docs.yjs.dev/api/relative-positions)[^13]

</details>

[^13]: Yjs 공식 문서 - Relative Positions

---

## 📌 Yjs vs 다른 CRDT

### CRDT-010
Yjs와 다른 CRDT 라이브러리(예: Automerge) 간의 주요 차이점은 무엇인가요?

<details>
<summary>답변</summary>

Yjs와 Automerge는 모두 인기 있는 CRDT 라이브러리이지만 설계 철학과 특성이 다릅니다.

| 구분 | Yjs | Automerge |
|------|-----|-----------|
| **알고리즘** | YATA | RGA |
| **데이터 모델** | 타입별 전용 구조 | JSON 문서 |
| **인코딩** | 바이너리 | JSON (WASM 버전은 바이너리) |
| **언어** | JavaScript | Rust + WASM 바인딩 |
| **성능** | 매우 빠름 | 상대적으로 느림 |
| **메모리** | 효율적 | 더 많은 메모리 사용 |
| **GC** | 지원 | 제한적 |

**Yjs 강점:**
- 텍스트 협업에 최적화된 성능
- 다양한 에디터 바인딩 생태계
- 네트워크 Provider 선택의 유연성
- 가비지 컬렉션으로 문서 크기 관리

**Automerge 강점:**
- JSON 친화적 데이터 모델
- 다국어 지원 (Rust, Python, Go 등)
- automerge-repo로 end-to-end 동기화 제공
- 오프라인-퍼스트 설계

**선택 기준:**
- 텍스트 에디터 중심 → Yjs
- JSON 데이터 구조 중심 → Automerge
- 성능이 최우선 → Yjs

**참고자료**
- [CRDT Implementations](https://crdt.tech/implementations)[^14]
- [CRDT Benchmarks](https://github.com/dmonad/crdt-benchmarks)[^15]

</details>

[^14]: CRDT.tech - 구현체 목록
[^15]: CRDT 벤치마크 비교

---

## 📌 Yjs 실시간 협업

### CRDT-011
Yjs를 통한 실시간 협업 애플리케이션 구현 시 고려해야 할 사항은 무엇인가요?

<details>
<summary>답변</summary>

실시간 협업 애플리케이션 구현 시 여러 측면을 고려해야 합니다.

**1. 네트워크 아키텍처:**
- **중앙 서버 (y-websocket)**: 구현 단순, 권한 관리 용이
- **P2P (y-webrtc)**: 서버 비용 절감, 지연 시간 단축
- **하이브리드**: 둘을 조합하여 장점 활용

**2. 데이터 영속성:**
```javascript
// IndexedDB를 통한 로컬 저장
import { IndexeddbPersistence } from 'y-indexeddb'
const persistence = new IndexeddbPersistence('doc-name', ydoc)

// 서버 측 저장 전략
// - y-leveldb, y-mongodb 등 활용
```

**3. 인증 및 권한:**
- WebSocket 연결 시 토큰 검증
- 문서별 읽기/쓰기 권한 분리
- 민감한 작업에 대한 서버 측 검증

**4. 성능 최적화:**
- 큰 문서는 하위 문서(subdoc)로 분할
- 불필요한 히스토리는 GC로 정리
- 적절한 debounce로 업데이트 빈도 조절

**5. UX 고려사항:**
- Awareness로 다른 사용자 커서 표시
- 연결 상태 표시 (온라인/오프라인)
- 충돌 해결 결과에 대한 시각적 피드백

**참고자료**
- [Yjs Getting Started](https://docs.yjs.dev/getting-started)[^16]

</details>

[^16]: Yjs 공식 문서 - Getting Started

---

## 📌 Yjs 옵저빙

### CRDT-012
Yjs에서 업데이트를 옵저빙(observing)하는 방법과 이벤트 핸들링은 어떻게 이루어지나요?

<details>
<summary>답변</summary>

Yjs는 Observer 패턴을 사용하여 데이터 변경을 감지하고 반응할 수 있습니다.

**문서 레벨 이벤트:**

```javascript
// 모든 업데이트 감지
ydoc.on('update', (update, origin, doc) => {
  // update: Uint8Array - 변경 내용
  // origin: any - 변경 출처
})

// 트랜잭션 후 이벤트
ydoc.on('afterTransaction', (transaction) => {
  // 변경된 타입들 확인
  transaction.changed.forEach((subs, type) => {
    console.log('Changed:', type)
  })
})
```

**타입별 Observer:**

```javascript
const ytext = ydoc.getText('editor')

// Y.Text 옵저버
ytext.observe(event => {
  event.delta.forEach(op => {
    if (op.insert) console.log('Inserted:', op.insert)
    if (op.delete) console.log('Deleted:', op.delete)
    if (op.retain) console.log('Retained:', op.retain)
  })
})

const ymap = ydoc.getMap('data')

// Y.Map 옵저버
ymap.observe(event => {
  event.keysChanged.forEach(key => {
    console.log('Key changed:', key, ymap.get(key))
  })
})

// Deep 옵저버 (중첩 변경 감지)
ymap.observeDeep(events => {
  events.forEach(event => {
    console.log('Path:', event.path)
  })
})
```

**옵저버 해제:**
```javascript
const observer = event => { /* ... */ }
ytext.observe(observer)
ytext.unobserve(observer)
```

**참고자료**
- [Yjs Events](https://docs.yjs.dev/api/shared-types/y.text#observing-changes-y.textevent)[^17]

</details>

[^17]: Yjs 공식 문서 - Observing Changes

---

## 📌 Yjs Delta

### CRDT-013
Yjs의 Delta 업데이트 방식과 그 장점에 대해 설명해주세요.

<details>
<summary>답변</summary>

Yjs의 Delta는 Quill Delta 형식을 기반으로 텍스트 변경을 표현하는 방식입니다.

**Delta 구조:**

```javascript
// Delta는 세 가지 연산으로 구성
{
  insert: "Hello",     // 삽입
  delete: 5,           // 삭제
  retain: 10,          // 유지 (위치 이동)
  attributes: { bold: true }  // 서식 (선택적)
}

// 예시: "Hello World" → "Hello Yjs"
[
  { retain: 6 },       // "Hello " 유지
  { delete: 5 },       // "World" 삭제
  { insert: "Yjs" }    // "Yjs" 삽입
]
```

**Y.Text와 Delta:**

```javascript
const ytext = ydoc.getText('editor')

// Delta로 내용 적용
ytext.applyDelta([
  { insert: 'Hello ' },
  { insert: 'World', attributes: { bold: true } }
])

// 현재 내용을 Delta로 변환
const delta = ytext.toDelta()

// 변경 이벤트에서 Delta 받기
ytext.observe(event => {
  console.log(event.delta)
  // [{ retain: 6 }, { insert: 'Yjs' }]
})
```

**장점:**
- **직관적 표현**: 변경 사항을 명확하게 표현
- **서식 지원**: 속성(attributes)으로 리치 텍스트 지원
- **효율적 전송**: 전체 문서 대신 변경분만 전송
- **에디터 호환**: Quill, ProseMirror 등과 쉽게 연동

**참고자료**
- [Quill Delta](https://quilljs.com/docs/delta/)[^18]
- [Y.Text API](https://docs.yjs.dev/api/shared-types/y.text)[^19]

</details>

[^18]: Quill Delta 공식 문서
[^19]: Yjs 공식 문서 - Y.Text

---

## 📌 Yjs 충돌 해결

### CRDT-014
Yjs 문서 병합 과정에서 발생할 수 있는 충돌 상황은 어떤 것이며, 이를 어떻게 해결하나요?

<details>
<summary>답변</summary>

CRDT 특성상 Yjs에서는 "충돌"이 자동으로 해결되지만, 의도하지 않은 결과가 발생할 수 있는 상황이 있습니다.

**1. 동시 삽입 충돌:**
- **상황**: 두 사용자가 같은 위치에 동시에 텍스트 삽입
- **해결**: 클라이언트 ID를 기준으로 결정론적 순서 적용

```javascript
// User A: "Hello|World" → "Hello_X_World"
// User B: "Hello|World" → "Hello_Y_World"
// 결과: "Hello_X_Y_World" 또는 "Hello_Y_X_World"
// (클라이언트 ID에 따라 일관되게 결정)
```

**2. 동시 삭제와 수정:**
- **상황**: 한 사용자가 삭제하는 동안 다른 사용자가 수정
- **해결**: 삭제 우선 (tombstone으로 마킹)

**3. 동시 속성 변경:**
- **상황**: 같은 텍스트에 다른 서식 적용
- **해결**: Last-Write-Wins (마지막 변경 적용)

**4. Interleaving 문제:**
- **상황**: "foo"와 "bar" 동시 입력 시 "fboaor" 같은 결과
- **해결**: YATA 알고리즘이 이 문제를 최소화

**의도 보존을 위한 전략:**

```javascript
// 트랜잭션으로 원자적 변경
ydoc.transact(() => {
  ymap.set('status', 'editing')
  ytext.insert(0, 'Draft: ')
})
```

**참고자료**
- [YATA Algorithm](https://docs.yjs.dev/api/internals)[^20]

</details>

[^20]: Yjs 공식 문서 - YATA 알고리즘 설명

---

## 📌 Yjs 성능 최적화

### CRDT-015
Yjs의 메모리 사용 최적화 및 성능 개선 방안은 무엇인가요?

<details>
<summary>답변</summary>

Yjs 애플리케이션의 성능을 최적화하기 위한 여러 전략이 있습니다.

**1. 가비지 컬렉션 (GC):**

```javascript
const ydoc = new Y.Doc({ gc: true }) // 기본값

// GC는 삭제된 콘텐츠의 구조를 정리
// 단, undo/redo 히스토리에 영향을 줄 수 있음
```

**2. Subdocuments (하위 문서):**

```javascript
// 큰 문서를 작은 단위로 분할
const rootDoc = new Y.Doc()
const subdocs = rootDoc.getMap('subdocs')

// 필요할 때만 로드
subdocs.set('chapter1', new Y.Doc())
subdocs.get('chapter1').load()
```

**3. 업데이트 압축:**

```javascript
// 여러 업데이트를 하나로 병합
const mergedUpdate = Y.mergeUpdates([update1, update2, update3])
```

**4. 트랜잭션 활용:**

```javascript
// 여러 변경을 하나의 업데이트로 묶음
ydoc.transact(() => {
  yarray.push([item1])
  yarray.push([item2])
  ymap.set('key', 'value')
}, 'batch-update')
```

**5. 효율적인 초기 동기화:**

```javascript
// State Vector 기반 차이점만 동기화
const sv = Y.encodeStateVector(localDoc)
const update = Y.encodeStateAsUpdate(remoteDoc, sv)
Y.applyUpdate(localDoc, update)
```

**6. 메모리 모니터링:**
- 대용량 문서에서는 정기적으로 문서 크기 확인
- 필요시 오래된 히스토리 정리

**참고자료**
- [Yjs Performance Tips](https://docs.yjs.dev/api/document-updates)[^21]

</details>

[^21]: Yjs 공식 문서 - Document Updates

---

## 📌 Yjs 저장소

### CRDT-016
Yjs의 저장소(storage) 모듈과 데이터를 영구 저장하는 전략은 무엇인가요?

<details>
<summary>답변</summary>

Yjs는 다양한 영속성 Provider를 통해 문서를 저장할 수 있습니다.

**클라이언트 측 저장:**

```javascript
// IndexedDB (브라우저)
import { IndexeddbPersistence } from 'y-indexeddb'

const persistence = new IndexeddbPersistence('doc-name', ydoc)

persistence.on('synced', () => {
  console.log('IndexedDB에서 로드 완료')
})
```

**서버 측 저장:**

```javascript
// LevelDB
import { LeveldbPersistence } from 'y-leveldb'
const persistence = new LeveldbPersistence('./storage')

// 문서 저장
persistence.storeUpdate('doc-id', update)

// 문서 로드
const ydoc = await persistence.getYDoc('doc-id')
```

**저장 전략:**

1. **전체 문서 저장:**
```javascript
const encodedState = Y.encodeStateAsUpdate(ydoc)
await db.save('doc-id', encodedState)
```

2. **증분 업데이트 저장:**
```javascript
ydoc.on('update', async (update) => {
  await db.appendUpdate('doc-id', update)
})

// 주기적으로 압축
const mergedUpdate = Y.mergeUpdates(allUpdates)
```

3. **스냅샷 + 증분:**
```javascript
// 기준 스냅샷 저장
const snapshot = Y.encodeStateAsUpdate(ydoc)

// 이후 증분만 저장
// 복원 시 스냅샷 + 증분 적용
```

**고려사항:**
- 업데이트 로그가 커지면 주기적으로 병합
- 동시성 제어를 위한 적절한 락 메커니즘
- 백업 및 복구 전략

**참고자료**
- [y-indexeddb](https://github.com/yjs/y-indexeddb)[^22]
- [y-leveldb](https://github.com/yjs/y-leveldb)[^23]

</details>

[^22]: y-indexeddb GitHub
[^23]: y-leveldb GitHub

---

## 📌 Yjs 네트워크 지연

### CRDT-017
네트워크 지연(latency) 환경에서 Yjs의 동기화 성능을 개선하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

네트워크 지연 환경에서도 Yjs는 로컬 우선 동작으로 좋은 사용자 경험을 제공합니다.

**1. 낙관적 업데이트 (기본 동작):**
- 로컬 변경은 즉시 반영
- 네트워크 응답을 기다리지 않음
- 나중에 동기화되어도 결과 수렴 보장

**2. 로컬 영속성 활용:**

```javascript
import { IndexeddbPersistence } from 'y-indexeddb'
import { WebsocketProvider } from 'y-websocket'

// 로컬 저장소 우선 로드
const indexeddb = new IndexeddbPersistence('doc', ydoc)

// 네트워크 연결은 비동기로
indexeddb.on('synced', () => {
  const ws = new WebsocketProvider('wss://server', 'room', ydoc)
})
```

**3. 재연결 전략:**

```javascript
const provider = new WebsocketProvider(url, room, ydoc, {
  connect: true,
  // 재연결 지연 시간
  resyncInterval: 10000,
  // 연결 상태 추적
})

provider.on('status', ({ status }) => {
  if (status === 'disconnected') {
    // 오프라인 UI 표시
  }
})
```

**4. 업데이트 배칭:**

```javascript
// debounce로 업데이트 묶음
let pendingUpdate = null

ydoc.on('update', (update) => {
  pendingUpdate = pendingUpdate
    ? Y.mergeUpdates([pendingUpdate, update])
    : update

  debounce(() => {
    send(pendingUpdate)
    pendingUpdate = null
  }, 50)
})
```

**5. 압축 전송:**
- Yjs 업데이트는 이미 바이너리로 효율적
- 필요시 gzip 추가 압축 적용

**참고자료**
- [Yjs Offline Support](https://docs.yjs.dev/getting-started/allowing-offline-editing)[^24]

</details>

[^24]: Yjs 공식 문서 - Offline Editing

---

## 📌 Yjs 통신 프로토콜

### CRDT-018
Yjs와 WebSocket, WebRTC 등 다른 실시간 통신 프로토콜 연동 방안에 대해 설명해주세요.

<details>
<summary>답변</summary>

Yjs는 네트워크 프로토콜에 독립적이며, 다양한 Provider를 통해 연동합니다.

**1. WebSocket (y-websocket):**

```javascript
import { WebsocketProvider } from 'y-websocket'

const provider = new WebsocketProvider(
  'wss://your-server.com',
  'document-room',
  ydoc,
  { params: { auth: 'token' } }
)

// 연결 상태 모니터링
provider.on('status', event => {
  console.log(event.status) // 'connecting' | 'connected' | 'disconnected'
})
```

**2. WebRTC (y-webrtc):**

```javascript
import { WebrtcProvider } from 'y-webrtc'

const provider = new WebrtcProvider('room-name', ydoc, {
  signaling: ['wss://signaling-server.com'],
  password: 'optional-encryption-key',
  maxConns: 20
})

// P2P 연결로 서버 부하 감소
```

**3. 커스텀 Provider 구현:**

```javascript
import * as Y from 'yjs'
import * as syncProtocol from 'y-protocols/sync'

class CustomProvider {
  constructor(ydoc, connection) {
    this.ydoc = ydoc
    this.conn = connection

    // 동기화 프로토콜 초기화
    const encodedState = Y.encodeStateVector(ydoc)
    this.conn.send(syncProtocol.writeSyncStep1(encodedState))

    // 업데이트 전파
    ydoc.on('update', (update, origin) => {
      if (origin !== this) {
        this.conn.send(update)
      }
    })

    // 수신 처리
    this.conn.on('message', (data) => {
      Y.applyUpdate(ydoc, data, this)
    })
  }
}
```

**프로토콜 선택 기준:**

| 프로토콜 | 장점 | 단점 |
|---------|------|------|
| WebSocket | 안정적, 권한 제어 용이 | 서버 비용 |
| WebRTC | P2P, 낮은 지연 | 연결 설정 복잡 |
| 하이브리드 | 장점 조합 | 구현 복잡도 |

**참고자료**
- [y-websocket](https://github.com/yjs/y-websocket)[^25]
- [y-webrtc](https://github.com/yjs/y-webrtc)[^26]

</details>

[^25]: y-websocket GitHub
[^26]: y-webrtc GitHub

---

## 📌 CRDT 일관성

### CRDT-019
CRDT를 이용한 분산 시스템에서 eventual consistency와 strong consistency의 차이는 무엇인가요?

<details>
<summary>답변</summary>

분산 시스템에서 일관성 모델은 데이터 동기화의 보장 수준을 정의합니다.

**Strong Consistency (강한 일관성):**
- 모든 읽기는 가장 최근 쓰기 결과를 반환
- 모든 노드가 동일한 순서로 업데이트 확인
- 예: 전통적인 RDBMS, Raft/Paxos 기반 시스템

```
시간 ---->
Node A: Write(x=1) ----+
Node B: Read(x) = 1 ---+  (A의 쓰기 후에만 읽기 가능)
```

**Eventual Consistency (최종 일관성):**
- 충분한 시간이 지나면 모든 노드가 같은 상태에 도달
- 중간 상태에서는 노드별로 다른 값을 볼 수 있음
- CRDT가 보장하는 일관성 모델

```
시간 ---->
Node A: Write(x=1) -----> x=1
Node B: Read(x) = 0 ...-> x=1 (나중에 동기화)
```

**CRDT의 강점 - Strong Eventual Consistency:**

CRDT는 일반적인 Eventual Consistency보다 강한 보장을 제공:

1. **수렴 보장**: 같은 업데이트를 받은 복제본은 반드시 같은 상태
2. **충돌 없음**: 병합 시 충돌 해결이 자동으로 결정론적
3. **순서 독립**: 업데이트 적용 순서가 최종 결과에 영향 없음

**트레이드오프 (CAP 정리):**

| 속성 | Strong | Eventual |
|------|--------|----------|
| 가용성 | 낮음 | 높음 |
| 지연 시간 | 높음 | 낮음 |
| 네트워크 분할 허용 | 불가 | 가능 |
| 오프라인 작업 | 불가 | 가능 |

**참고자료**
- [CRDT.tech - About CRDTs](https://crdt.tech/)[^27]

</details>

[^27]: CRDT.tech - CRDT 개요

---

## 📌 Yjs 문서 크기

### CRDT-020
Yjs 문서 크기가 커질 때 발생할 수 있는 성능 이슈와 대응 방법은 무엇인가요?

<details>
<summary>답변</summary>

대용량 Yjs 문서는 메모리, 네트워크, 초기 로드 시간에 영향을 줄 수 있습니다.

**성능 이슈:**

1. **메모리 사용량 증가**
   - 각 문자에 메타데이터 (ID, 참조) 포함
   - 삭제된 항목도 tombstone으로 유지

2. **초기 동기화 지연**
   - 전체 문서 상태를 전송해야 함
   - 새 클라이언트 연결 시 병목

3. **업데이트 처리 시간**
   - 큰 문서에서 변경 적용이 느려질 수 있음

**대응 방법:**

**1. Subdocuments 활용:**
```javascript
// 문서를 논리적 단위로 분할
const mainDoc = new Y.Doc()
const chapters = mainDoc.getMap('chapters')

// 각 챕터를 별도 하위 문서로
chapters.set('chapter1', new Y.Doc())
chapters.set('chapter2', new Y.Doc())

// 필요한 부분만 로드
chapters.get('chapter1').load()
```

**2. 가비지 컬렉션:**
```javascript
// GC 활성화 (기본값)
const ydoc = new Y.Doc({ gc: true })

// 특정 시점 이전 히스토리 정리
// (Undo Manager와 호환 주의)
```

**3. 스냅샷 기반 압축:**
```javascript
// 주기적으로 전체 상태 스냅샷 저장
const snapshot = Y.encodeStateAsUpdate(ydoc)

// 이전 업데이트 로그 삭제
await clearOldUpdates()
await saveSnapshot(snapshot)
```

**4. Lazy Loading:**
```javascript
// 스크롤 등에 따라 필요한 부분만 로드
subdoc.on('load', () => {
  // 하위 문서 로드 시 처리
})
```

**5. 모니터링:**
```javascript
// 문서 크기 추적
const size = Y.encodeStateAsUpdate(ydoc).byteLength
console.log(`Document size: ${size} bytes`)
```

**참고자료**
- [Yjs Subdocuments](https://docs.yjs.dev/api/subdocuments)[^28]

</details>

[^28]: Yjs 공식 문서 - Subdocuments

---

## 📌 Yjs 모듈화

### CRDT-021
Yjs의 모듈화 구조와 플러그인 확장 기능에 대해 설명해주세요.

<details>
<summary>답변</summary>

Yjs는 핵심 라이브러리와 확장 모듈로 구성된 모듈화된 아키텍처를 가집니다.

**핵심 패키지 (yjs):**
- Y.Doc, Y.Array, Y.Map, Y.Text 등 기본 CRDT 타입
- 인코딩/디코딩, 동기화 프로토콜

**네트워크 Provider:**
```javascript
// WebSocket
import { WebsocketProvider } from 'y-websocket'

// WebRTC (P2P)
import { WebrtcProvider } from 'y-webrtc'

// 다른 Provider도 동일한 인터페이스
```

**영속성 Provider:**
```javascript
// 브라우저 IndexedDB
import { IndexeddbPersistence } from 'y-indexeddb'

// 서버 LevelDB
import { LeveldbPersistence } from 'y-leveldb'
```

**에디터 바인딩:**
```javascript
// ProseMirror
import { ySyncPlugin } from 'y-prosemirror'

// Quill
import { QuillBinding } from 'y-quill'

// Monaco (VS Code 에디터)
import { MonacoBinding } from 'y-monaco'

// CodeMirror
import { yCollab } from 'y-codemirror.next'
```

**프로토콜 모듈 (y-protocols):**
```javascript
import * as syncProtocol from 'y-protocols/sync'
import * as awarenessProtocol from 'y-protocols/awareness'
import * as authProtocol from 'y-protocols/auth'
```

**커스텀 Provider 구현:**

```javascript
// 기본 인터페이스 구현
class CustomProvider {
  constructor(ydoc) {
    this.ydoc = ydoc
    this.awareness = new awarenessProtocol.Awareness(ydoc)

    ydoc.on('update', this.handleUpdate)
  }

  handleUpdate = (update, origin) => {
    // 커스텀 전송 로직
  }

  destroy() {
    this.ydoc.off('update', this.handleUpdate)
  }
}
```

**생태계 장점:**
- 필요한 기능만 선택적 사용
- 새로운 백엔드/에디터 쉽게 추가
- 커뮤니티 확장 활발

**참고자료**
- [Yjs Ecosystem](https://docs.yjs.dev/ecosystem)[^29]

</details>

[^29]: Yjs 공식 문서 - Ecosystem

---

## 📌 Yjs 네트워크 트래픽

### CRDT-022
Yjs에서 데이터 업데이트 시 네트워크 트래픽 최적화를 위한 기법은 무엇인가요?

<details>
<summary>답변</summary>

Yjs는 효율적인 바이너리 인코딩을 사용하지만, 추가 최적화 기법을 적용할 수 있습니다.

**1. 업데이트 병합:**

```javascript
// 여러 업데이트를 하나로 결합
const updates = []

ydoc.on('update', (update) => {
  updates.push(update)
})

// 일정 시간 후 병합하여 전송
setInterval(() => {
  if (updates.length > 0) {
    const merged = Y.mergeUpdates(updates)
    send(merged)
    updates.length = 0
  }
}, 100)
```

**2. Debouncing:**

```javascript
import { debounce } from 'lodash'

const sendUpdate = debounce((update) => {
  websocket.send(update)
}, 50)

ydoc.on('update', sendUpdate)
```

**3. 차등 동기화:**

```javascript
// 전체 문서 대신 차이점만 전송
const clientStateVector = receiveStateVector()
const diff = Y.encodeStateAsUpdate(ydoc, clientStateVector)
send(diff)
```

**4. 압축:**

```javascript
// gzip 등 추가 압축
import { gzipSync, gunzipSync } from 'fflate'

const compressed = gzipSync(update)
send(compressed)

// 수신 측
const decompressed = gunzipSync(received)
Y.applyUpdate(ydoc, decompressed)
```

**5. 선택적 동기화:**

```javascript
// 중요도에 따른 우선순위
ydoc.on('update', (update, origin) => {
  if (isHighPriority(origin)) {
    sendImmediate(update)
  } else {
    queueForBatch(update)
  }
})
```

**6. 대역폭 제한:**

```javascript
// Rate limiting
const rateLimiter = createRateLimiter(1000) // 1KB/s

ydoc.on('update', (update) => {
  rateLimiter.enqueue(update)
})
```

**참고자료**
- [Yjs Performance](https://docs.yjs.dev/api/document-updates)[^30]

</details>

[^30]: Yjs 공식 문서 - Document Updates

### CRDT-023
Yjs 업데이트 메시지의 크기를 최소화하는 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

Yjs 업데이트 메시지 크기 최소화는 네트워크 효율성과 성능에 직접적인 영향을 줍니다.

**Yjs 기본 최적화:**
- **바이너리 인코딩**: JSON 대비 훨씬 컴팩트
- **변수 길이 정수**: 작은 숫자에 적은 바이트 사용
- **참조 기반 구조**: 중복 데이터 최소화

**추가 최적화 기법:**

**1. 트랜잭션 그룹화:**
```javascript
// 여러 변경을 하나의 업데이트로
ydoc.transact(() => {
  ytext.insert(0, 'Hello')
  ytext.insert(5, ' World')
  ymap.set('timestamp', Date.now())
})
// = 1개의 업데이트 생성
```

**2. 업데이트 병합:**
```javascript
// 누적된 업데이트 압축
const mergedUpdate = Y.mergeUpdates([
  update1,  // 10 bytes
  update2,  // 15 bytes
  update3   // 12 bytes
])
// mergedUpdate: ~25 bytes (중복 제거)
```

**3. Origin 필터링:**
```javascript
ydoc.on('update', (update, origin) => {
  // 자신이 발생시킨 원격 업데이트는 재전송 안 함
  if (origin !== 'remote') {
    broadcast(update)
  }
})
```

**4. 압축 적용:**
```javascript
// Yjs 업데이트는 이미 효율적이지만
// 대량 전송 시 추가 압축 고려
import pako from 'pako'

const compressed = pako.deflate(update)
// 일반적으로 20-50% 추가 압축
```

**5. Diff 기반 전송:**
```javascript
// 전체 상태 대신 차이만 계산
const senderSV = Y.encodeStateVector(senderDoc)
const receiverSV = Y.encodeStateVector(receiverDoc)

// 받는 측에 없는 부분만 전송
const missingUpdates = Y.encodeStateAsUpdate(senderDoc, receiverSV)
```

**메시지 크기 측정:**
```javascript
const update = Y.encodeStateAsUpdate(ydoc)
console.log(`Update size: ${update.byteLength} bytes`)
```

**참고자료**
- [Yjs Internals](https://docs.yjs.dev/api/internals)[^31]

</details>

[^31]: Yjs 공식 문서 - Internals

---

## 📌 Yjs 이벤트 처리

### CRDT-024
Yjs 기반 협업 도구에서 사용되는 이벤트(event) 처리 패턴은 무엇인가요?

<details>
<summary>답변</summary>

Yjs는 다양한 수준에서 이벤트를 제공하며, 효과적인 패턴을 통해 처리합니다.

**이벤트 계층:**

```javascript
// 1. 문서 레벨 이벤트
ydoc.on('update', (update, origin) => { /* ... */ })
ydoc.on('afterTransaction', (tr) => { /* ... */ })

// 2. 타입 레벨 이벤트
ytext.observe(event => { /* ... */ })
ymap.observeDeep(events => { /* ... */ })

// 3. Awareness 이벤트
awareness.on('change', ({ added, updated, removed }) => { /* ... */ })
```

**일반적인 처리 패턴:**

**1. Origin 기반 분기:**
```javascript
ydoc.on('update', (update, origin) => {
  if (origin === 'local') {
    // 로컬 변경 → 서버로 전송
    sendToServer(update)
  } else if (origin === 'remote') {
    // 원격 변경 → UI 업데이트만
  }
})
```

**2. 배치 처리:**
```javascript
ydoc.on('afterTransaction', (transaction) => {
  // 트랜잭션 내 모든 변경 일괄 처리
  const changes = []

  transaction.changed.forEach((subs, type) => {
    changes.push({ type, subs: Array.from(subs) })
  })

  processChanges(changes)
})
```

**3. Deep Observer 패턴:**
```javascript
const root = ydoc.getMap('root')

root.observeDeep((events) => {
  events.forEach(event => {
    console.log('Path:', event.path)
    console.log('Target:', event.target)

    // 경로 기반 처리
    if (event.path[0] === 'users') {
      updateUserList()
    }
  })
})
```

**4. 멱등성 보장:**
```javascript
ymap.observe(event => {
  event.keysChanged.forEach(key => {
    const value = ymap.get(key)
    // 항상 최신 값으로 UI 업데이트
    updateUI(key, value)
  })
})
```

**5. 이벤트 정리:**
```javascript
const observer = (event) => { /* ... */ }

// 등록
ytext.observe(observer)

// 컴포넌트 언마운트 시 해제
onCleanup(() => {
  ytext.unobserve(observer)
})
```

**참고자료**
- [Yjs Events](https://docs.yjs.dev/api/y.doc)[^32]

</details>

[^32]: Yjs 공식 문서 - Y.Doc

---

## 📌 CRDT 오프라인

### CRDT-025
CRDT를 활용한 오프라인 편집 및 동기화 시나리오는 어떻게 구성되나요?

<details>
<summary>답변</summary>

CRDT의 가장 큰 장점 중 하나는 오프라인 편집을 자연스럽게 지원한다는 것입니다.

**오프라인 시나리오 구성:**

**1. 로컬 영속성 설정:**
```javascript
import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'
import { WebsocketProvider } from 'y-websocket'

const ydoc = new Y.Doc()

// 로컬 저장소 (항상 활성)
const indexeddb = new IndexeddbPersistence('my-doc', ydoc)

// 네트워크 연결 (가능할 때만)
let wsProvider = null

indexeddb.on('synced', () => {
  // 로컬 데이터 로드 후 네트워크 연결 시도
  connectWhenOnline()
})
```

**2. 연결 상태 관리:**
```javascript
function connectWhenOnline() {
  if (navigator.onLine) {
    wsProvider = new WebsocketProvider(url, room, ydoc)

    wsProvider.on('status', ({ status }) => {
      updateConnectionUI(status)
    })
  }
}

// 온라인 복귀 시 자동 연결
window.addEventListener('online', () => {
  if (!wsProvider) {
    connectWhenOnline()
  }
})

window.addEventListener('offline', () => {
  // 오프라인 UI 표시
  showOfflineIndicator()
})
```

**3. 동기화 흐름:**
```
[오프라인 편집]
     ↓
IndexedDB에 로컬 저장
     ↓
[온라인 복귀]
     ↓
State Vector 교환
     ↓
누락된 업데이트만 전송/수신
     ↓
자동 병합 (CRDT 속성)
     ↓
모든 클라이언트 동일 상태
```

**4. 충돌 없는 병합:**
```javascript
// 오프라인 동안의 로컬 변경
localYtext.insert(0, 'Local edit')

// 다른 사용자의 변경
remoteYtext.insert(0, 'Remote edit')

// 온라인 복귀 시 자동 병합
// 결과: "Local editRemote edit" 또는 "Remote editLocal edit"
// (결정론적으로 모든 클라이언트에서 동일)
```

**5. 사용자 경험:**
- 오프라인 상태 표시
- 동기화 진행률
- 마지막 동기화 시간

**참고자료**
- [Yjs Offline Support](https://docs.yjs.dev/getting-started/allowing-offline-editing)[^33]

</details>

[^33]: Yjs 공식 문서 - Offline Editing

---

## 📌 Yjs 스키마 변경

### CRDT-026
Yjs에서 스키마 변경(schema evolution)을 처리하는 방식은 무엇인가요?

<details>
<summary>답변</summary>

Yjs는 스키마리스(schemaless) 특성을 가지지만, 애플리케이션 레벨에서 스키마 진화를 관리해야 합니다.

**Yjs의 유연성:**
```javascript
// Yjs 자체는 스키마를 강제하지 않음
const ymap = ydoc.getMap('data')
ymap.set('name', 'John')
ymap.set('age', 30)
ymap.set('newField', 'anything') // 언제든 새 필드 추가 가능
```

**스키마 버전 관리 패턴:**

**1. 버전 필드 사용:**
```javascript
const meta = ydoc.getMap('meta')
meta.set('schemaVersion', 2)

// 로드 시 마이그레이션
function migrateIfNeeded(ydoc) {
  const version = ydoc.getMap('meta').get('schemaVersion') || 1

  if (version < 2) {
    migrateV1toV2(ydoc)
  }
}
```

**2. 점진적 마이그레이션:**
```javascript
function migrateV1toV2(ydoc) {
  const users = ydoc.getMap('users')

  ydoc.transact(() => {
    users.forEach((user, id) => {
      // 기존 'name' → 'firstName', 'lastName' 분리
      if (user.get('name') && !user.get('firstName')) {
        const [first, last] = user.get('name').split(' ')
        user.set('firstName', first)
        user.set('lastName', last || '')
        // 기존 필드는 호환성 위해 유지 가능
      }
    })
  })
}
```

**3. 기본값 처리:**
```javascript
function getUserEmail(ymap) {
  // 새 필드가 없을 경우 기본값
  return ymap.get('email') ?? 'unknown@example.com'
}
```

**4. 타입 검증 레이어:**
```javascript
import { z } from 'zod'

const UserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().optional()
})

function validateUser(ymap) {
  const data = Object.fromEntries(ymap.entries())
  return UserSchema.safeParse(data)
}
```

**주의사항:**
- 삭제된 필드도 tombstone으로 남음
- 구 버전 클라이언트와의 호환성 고려
- 마이그레이션은 모든 클라이언트에서 동일하게 동작해야 함

**참고자료**
- [Yjs Shared Types](https://docs.yjs.dev/api/shared-types)[^34]

</details>

[^34]: Yjs 공식 문서 - Shared Types

---

## 📌 Yjs 정합성

### CRDT-027
Yjs 문서의 데이터 정합성을 보장하기 위한 전략은 무엇인가요?

<details>
<summary>답변</summary>

Yjs는 CRDT 특성으로 수렴을 보장하지만, 애플리케이션 레벨 정합성은 추가 전략이 필요합니다.

**CRDT가 보장하는 것:**
- Strong Eventual Consistency: 같은 업데이트 → 같은 상태
- 충돌 없는 병합
- 순서 독립적 적용

**애플리케이션 레벨 정합성 전략:**

**1. 트랜잭션 활용:**
```javascript
// 관련 변경을 원자적으로 묶음
ydoc.transact(() => {
  const items = ydoc.getArray('items')
  const meta = ydoc.getMap('meta')

  items.push(['new item'])
  meta.set('itemCount', items.length)
  meta.set('lastModified', Date.now())
})
```

**2. 유효성 검증:**
```javascript
ymap.observe((event) => {
  const data = Object.fromEntries(ymap.entries())

  if (!isValidState(data)) {
    // 잘못된 상태 복구
    ydoc.transact(() => {
      fixInvalidState(ymap)
    })
  }
})
```

**3. 서버 측 검증:**
```javascript
// 서버에서 업데이트 검증 후 전파
server.on('update', (update, client) => {
  const tempDoc = new Y.Doc()
  Y.applyUpdate(tempDoc, baseState)
  Y.applyUpdate(tempDoc, update)

  if (isValidDocument(tempDoc)) {
    broadcast(update)
  } else {
    rejectUpdate(client)
  }
})
```

**4. 낙관적 락킹:**
```javascript
// 중요한 리소스에 대한 락
const locks = ydoc.getMap('locks')

function acquireLock(resourceId, userId) {
  const existing = locks.get(resourceId)

  if (!existing || existing.userId === userId) {
    locks.set(resourceId, {
      userId,
      timestamp: Date.now()
    })
    return true
  }
  return false
}
```

**5. 체크섬 기반 검증:**
```javascript
// 주기적으로 문서 상태 검증
function verifyDocumentIntegrity(ydoc, serverChecksum) {
  const localState = Y.encodeStateAsUpdate(ydoc)
  const localChecksum = computeChecksum(localState)

  if (localChecksum !== serverChecksum) {
    // 전체 동기화 트리거
    requestFullSync()
  }
}
```

**참고자료**
- [Yjs Transactions](https://docs.yjs.dev/api/y.doc#transact)[^35]

</details>

[^35]: Yjs 공식 문서 - Transactions

---

## 📌 Yjs 충돌 해결 알고리즘

### CRDT-028
Yjs의 업데이트 충돌 해결 알고리즘에 대해 설명해주세요.

<details>
<summary>답변</summary>

Yjs는 YATA (Yet Another Transformation Approach) 알고리즘을 기반으로 충돌을 해결합니다.

**YATA 알고리즘 핵심:**

**1. 고유 식별자:**
```
각 항목 = (clientID, clock)
- clientID: 클라이언트별 고유 ID
- clock: 해당 클라이언트의 논리적 시계
```

**2. 위치 참조:**
```
새 항목 삽입 시 절대 위치가 아닌 참조 사용:
- origin: 삽입 시점에 왼쪽에 있던 항목
- rightOrigin: 삽입 시점에 오른쪽에 있던 항목
```

**3. 삽입 규칙:**
동일 위치에 동시 삽입 시:
```javascript
// 두 항목 A, B가 같은 위치에 삽입된 경우
if (A.origin === B.origin) {
  // 더 작은 clientID가 왼쪽에 위치
  if (A.id.client < B.id.client) {
    // A가 B보다 앞
  } else {
    // B가 A보다 앞
  }
}
```

**4. 삭제 처리:**
```javascript
// 삭제는 tombstone으로 마킹
item.deleted = true
// 실제 제거가 아닌 마킹 → 구조 유지
// GC 시점에 안전하게 정리
```

**예시 시나리오:**

```
초기 상태: "AC"

User 1 (clientID: 1): "A" 뒤에 "B" 삽입 → "ABC"
User 2 (clientID: 2): "A" 뒤에 "X" 삽입 → "AXC"

동기화 후:
- 둘 다 origin = "A"
- clientID 1 < 2 이므로 "B"가 "X" 앞
- 최종: "ABXC"

모든 클라이언트에서 동일한 결과!
```

**YATA vs RGA:**
- RGA: 전역 카운터 사용
- YATA: 클라이언트별 카운터 (더 효율적)

**장점:**
- O(log n) 삽입 복잡도
- 인터리빙 문제 최소화
- 메모리 효율적

**참고자료**
- [YATA Paper](https://www.researchgate.net/publication/310212186_Near_Real-Time_Peer-to-Peer_Shared_Editing_on_Extensible_Data_Types)[^36]
- [Yjs Internals](https://docs.yjs.dev/api/internals)[^37]

</details>

[^36]: YATA 알고리즘 논문
[^37]: Yjs 공식 문서 - Internals

---

## 📌 Yjs 프로덕션 적용

### CRDT-029
Yjs를 실제 프로덕션 환경에 적용할 때 고려해야 할 주요 이슈는 무엇인가요?

<details>
<summary>답변</summary>

프로덕션 환경에서 Yjs를 운영하려면 여러 측면을 고려해야 합니다.

**1. 확장성 (Scalability):**

```javascript
// 수평 확장을 위한 Redis 기반 동기화
import { RedisAdapter } from 'y-redis'

// 여러 서버 인스턴스 간 문서 동기화
const adapter = new RedisAdapter(redisClient, {
  channel: 'yjs-documents'
})
```

**2. 모니터링:**
```javascript
// 문서 크기 추적
function monitorDocument(ydoc, docId) {
  setInterval(() => {
    const size = Y.encodeStateAsUpdate(ydoc).byteLength
    metrics.gauge('yjs_doc_size', size, { docId })
  }, 60000)
}

// 연결 수 추적
provider.on('status', ({ status }) => {
  metrics.counter('yjs_connections', { status })
})
```

**3. 에러 처리:**
```javascript
try {
  Y.applyUpdate(ydoc, update)
} catch (error) {
  logger.error('Failed to apply update', { error })
  // 잘못된 업데이트 무시 또는 재동기화 요청
  requestResync()
}
```

**4. 백업 및 복구:**
```javascript
// 정기적 스냅샷 저장
async function backupDocument(docId, ydoc) {
  const state = Y.encodeStateAsUpdate(ydoc)
  await s3.putObject({
    Bucket: 'yjs-backups',
    Key: `${docId}/${Date.now()}.yjs`,
    Body: state
  })
}

// 복구
async function restoreDocument(docId, timestamp) {
  const data = await s3.getObject({ /* ... */ })
  const ydoc = new Y.Doc()
  Y.applyUpdate(ydoc, data.Body)
  return ydoc
}
```

**5. 보안:**
```javascript
// 연결 시 인증
wss.on('connection', async (ws, req) => {
  const token = req.headers.authorization

  if (!await validateToken(token)) {
    ws.close(4001, 'Unauthorized')
    return
  }

  // 문서별 권한 확인
  const docId = extractDocId(req)
  if (!await hasAccess(token, docId)) {
    ws.close(4003, 'Forbidden')
    return
  }
})
```

**6. 성능 최적화:**
- 문서 분할 (Subdocuments)
- 연결 풀링
- 로드 밸런싱

**7. 버전 관리:**
- 클라이언트/서버 Yjs 버전 호환성
- 점진적 업그레이드 전략

**참고자료**
- [Yjs Production Tips](https://docs.yjs.dev/)[^38]

</details>

[^38]: Yjs 공식 문서

---

## 📌 Yjs 보안

### CRDT-030
Yjs를 활용한 협업 시스템에서 보안 및 접근 제어를 구현하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

Yjs 자체는 보안 기능을 제공하지 않으므로, 애플리케이션 레벨에서 구현해야 합니다.

**1. 인증 (Authentication):**

```javascript
// WebSocket 연결 시 토큰 검증
import { WebsocketProvider } from 'y-websocket'

const provider = new WebsocketProvider(
  'wss://server.com',
  'doc-room',
  ydoc,
  {
    params: {
      auth: jwt.sign({ userId, docId }, secret)
    }
  }
)

// 서버 측
wss.on('connection', (ws, req) => {
  const token = url.parse(req.url, true).query.auth

  try {
    const { userId, docId } = jwt.verify(token, secret)
    setupConnection(ws, userId, docId)
  } catch {
    ws.close(4001, 'Invalid token')
  }
})
```

**2. 권한 부여 (Authorization):**

```javascript
// 문서별 권한 확인
async function checkPermission(userId, docId, action) {
  const permission = await db.getPermission(userId, docId)

  return {
    read: permission.level >= 'viewer',
    write: permission.level >= 'editor',
    admin: permission.level === 'owner'
  }[action]
}

// 업데이트 필터링
server.on('update', async (update, userId, docId) => {
  if (!await checkPermission(userId, docId, 'write')) {
    return // 업데이트 거부
  }

  broadcast(update, docId)
})
```

**3. 전송 암호화:**

```javascript
// y-webrtc에서 암호화 사용
import { WebrtcProvider } from 'y-webrtc'

const provider = new WebrtcProvider('room', ydoc, {
  password: 'shared-secret-key'
  // 모든 메시지가 암호화됨
})

// 또는 TLS/WSS 사용 (기본 권장)
const provider = new WebsocketProvider(
  'wss://secure-server.com',  // TLS 적용
  'room',
  ydoc
)
```

**4. 데이터 검증:**

```javascript
// 서버에서 업데이트 내용 검증
function validateUpdate(update, userId) {
  const tempDoc = new Y.Doc()
  Y.applyUpdate(tempDoc, currentState)
  Y.applyUpdate(tempDoc, update)

  // 비즈니스 규칙 검증
  const data = tempDoc.getMap('data').toJSON()

  if (data.adminOnly && !isAdmin(userId)) {
    throw new Error('Unauthorized modification')
  }

  return true
}
```

**5. Rate Limiting:**

```javascript
const rateLimit = new Map()

function checkRateLimit(userId) {
  const now = Date.now()
  const userLimit = rateLimit.get(userId) || { count: 0, reset: now }

  if (now > userLimit.reset) {
    userLimit.count = 0
    userLimit.reset = now + 60000 // 1분
  }

  if (++userLimit.count > 100) {
    throw new Error('Rate limit exceeded')
  }

  rateLimit.set(userId, userLimit)
}
```

**6. 감사 로깅:**

```javascript
ydoc.on('update', (update, origin) => {
  auditLog.write({
    timestamp: Date.now(),
    docId,
    userId: origin?.userId,
    updateSize: update.byteLength
  })
})
```

**참고자료**
- [y-websocket Security](https://github.com/yjs/y-websocket)[^39]
- [y-protocols Auth](https://github.com/yjs/y-protocols)[^40]

</details>

[^39]: y-websocket GitHub
[^40]: y-protocols GitHub
