const etcData = [
  {
    "id": "CRDT-001",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "CRDT(Conflict-free Replicated Data Type)의 기본 개념과 사용 목적은 무엇인가요?",
    "answer": "CRDT는 분산 시스템에서 여러 복제본(replica)이 독립적으로 수정되더라도 충돌 없이 자동으로 병합될 수 있도록 설계된 데이터 구조입니다.\r\n\r\n**CRDT의 두 가지 유형:**\r\n\r\n| 유형 | State-based (CvRDT) | Operation-based (CmRDT) |\r\n|------|---------------------|-------------------------|\r\n| **동기화 방식** | 전체 상태 전송 후 병합 | 개별 연산만 전송 |\r\n| **병합 함수** | merge(state1, state2) | 연산을 순서대로 적용 |\r\n| **네트워크 요구사항** | 신뢰성 불필요 (멱등성) | 정확히 한 번 전달 필요 |\r\n| **대역폭** | 상태 크기에 비례 | 연산 크기에 비례 |\r\n| **예시** | G-Counter, OR-Set | Yjs (내부적으로 op-based) |\r\n\r\n> **트레이드오프**: State-based는 구현이 단순하고 메시지 손실에 강하지만 대역폭을 많이 사용합니다. Operation-based는 효율적이지만 메시지 순서와 전달 보장이 필요합니다. 실제로 Yjs는 두 접근법을 혼합하여 사용합니다.\r\n\r\n**핵심 특징:**\r\n- **중앙 서버 불필요**: 각 클라이언트가 독립적으로 데이터를 수정하고, 최종적으로 모든 복제본이 동일한 상태로 수렴\r\n- **Strong Eventual Consistency (SEC) 보장**: 동일한 업데이트를 받은 모든 복제본은 결정론적으로 같은 상태에 도달 (일반 EC보다 강한 보장)\r\n- **오프라인 지원**: 네트워크 연결 없이도 로컬 편집이 가능하며, 나중에 동기화\r\n\r\n**사용 목적:**\r\n- 실시간 협업 애플리케이션 (Notion, Linear 등)\r\n- 오프라인-퍼스트 애플리케이션\r\n- P2P 분산 시스템\r\n- 분산 데이터베이스 (Redis CRDT, Riak 등)",
    "references": [
      {
        "title": "CRDT.tech - About CRDTs",
        "url": "https://crdt.tech/"
      },
      {
        "title": "Shapiro et al., \"Conflict-free Replicated Data Types\"",
        "url": "https://pages.lip6.fr/Marc.Shapiro/papers/RR-7687.pdf"
      }
    ]
  },
  {
    "id": "CRDT-002",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "CRDT의 대표적인 구현체인 Yjs 라이브러리의 주요 기능과 특징에 대해 설명해주세요.",
    "answer": "Yjs는 고성능 CRDT 라이브러리로, 실시간 협업 애플리케이션 구축에 최적화되어 있습니다.\r\n\r\n**주요 기능:**\r\n- **공유 데이터 타입**: Y.Array, Y.Map, Y.Text, Y.XmlFragment 등 다양한 CRDT 데이터 타입 제공\r\n- **네트워크 독립적**: WebSocket, WebRTC, Hyper 등 다양한 네트워크 기술과 연동 가능\r\n- **풍부한 에디터 통합**: ProseMirror, Quill, Monaco, CodeMirror 등 주요 에디터 바인딩 지원\r\n\r\n**특징:**\r\n- **최고 수준의 성능**: crdt-benchmarks에서 다른 CRDT 라이브러리 대비 우수한 성능\r\n- **YATA 알고리즘**: 인터리빙 문제를 해결한 텍스트 CRDT 알고리즘 (2016년 발표)\r\n- **바이너리 인코딩**: 커스텀 바이너리 형식으로 JSON 대비 10배 이상 작은 크기\r\n- **모듈화 구조**: 핵심 라이브러리(yjs) + 네트워크(y-websocket, y-webrtc) + 에디터 바인딩 분리\r\n- **Awareness 프로토콜**: 커서 위치, 사용자 정보 등 임시 상태 공유 내장",
    "references": [
      {
        "title": "Yjs 공식 문서",
        "url": "https://docs.yjs.dev/"
      },
      {
        "title": "Yjs GitHub",
        "url": "https://github.com/yjs/yjs"
      }
    ]
  },
  {
    "id": "CRDT-003",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs의 Provider와 Y.Doc을 사용하여 분산 환경에서 데이터 동기화를 구현하는 방법은 무엇인가요?",
    "answer": "Yjs에서 분산 데이터 동기화는 Provider와 Y.Doc을 통해 구현됩니다.\r\n\r\n**기본 구현 단계:**\r\n\r\n```javascript\r\nimport * as Y from 'yjs'\r\nimport { WebsocketProvider } from 'y-websocket'\r\n\r\n// 1. 공유 문서 생성\r\nconst ydoc = new Y.Doc()\r\n\r\n// 2. Provider 연결 (네트워크 레이어)\r\nconst provider = new WebsocketProvider(\r\n  'wss://your-server.com',\r\n  'room-name',\r\n  ydoc\r\n)\r\n\r\n// 3. 공유 데이터 타입 사용\r\nconst ytext = ydoc.getText('shared-text')\r\nytext.insert(0, 'Hello World')\r\n```\r\n\r\n**동기화 메커니즘:**\r\n- **업데이트 전파**: 로컬 변경사항이 자동으로 연결된 모든 피어에게 전파\r\n- **순서 독립적**: 업데이트가 도착하는 순서와 관계없이 동일한 결과 보장\r\n- **증분 동기화**: 전체 문서가 아닌 변경된 부분만 전송\r\n\r\n**주요 Provider:**\r\n- `y-websocket`: WebSocket 기반 동기화\r\n- `y-webrtc`: P2P WebRTC 동기화\r\n- `y-indexeddb`: 브라우저 로컬 저장소",
    "references": [
      {
        "title": "Yjs Providers",
        "url": "https://docs.yjs.dev/ecosystem/connection-provider"
      }
    ]
  },
  {
    "id": "CRDT-004",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "CRDT와 OT(Operational Transformation)의 차이점은 무엇인가요?",
    "answer": "CRDT와 OT는 모두 분산 환경에서 협업 편집을 가능하게 하지만, 근본적인 접근 방식이 다릅니다.\r\n\r\n| 구분 | OT | CRDT |\r\n|------|-----|------|\r\n| **충돌 해결 위치** | 변환 함수에서 중앙 집중화 | 데이터 구조 자체에 분산 |\r\n| **서버 의존성** | 중앙 서버 필요 (일반적) | 완전한 P2P 가능 |\r\n| **오프라인 지원** | 제한적 | 우수함 |\r\n| **메모리 사용** | 낮음 | 높음 (메타데이터 오버헤드) |\r\n| **의도 보존** | 변환 함수로 보존 가능 | 데이터 구조에 따라 다름 |\r\n| **구현 복잡도** | 변환 함수 정확성 증명 어려움 | 수학적으로 검증 가능 |\r\n\r\n**OT 동작 방식:**\r\n- 편집을 연산(operation) 시퀀스로 처리\r\n- 동시 연산 발생 시 서버에서 변환(transform)하여 적용\r\n- 예: \"위치 5에 삽입\" → 다른 편집으로 인해 \"위치 3에 삽입\"으로 변환\r\n- 변환 함수의 정확성(TP1, TP2 속성)을 보장해야 함\r\n\r\n**CRDT 동작 방식:**\r\n- 데이터 구조 자체에 충분한 메타데이터 포함\r\n- 각 요소에 고유 ID 부여하여 위치 대신 ID 기반 참조\r\n- 예: \"문자 ID 'a1b2' 뒤에 삽입\"\r\n- 수학적으로 수렴이 보장됨 (교환법칙, 결합법칙, 멱등성)\r\n\r\n> **함정 주의**: \"CRDT가 OT보다 항상 우수하다\"는 오해가 있습니다. 실제로는 사용 사례에 따라 다릅니다. OT는 중앙 서버가 있고 네트워크가 안정적인 환경에서 메모리 효율적이며, CRDT는 P2P나 오프라인 환경에서 강점을 보입니다.\r\n\r\n**실제 사용 사례:**\r\n- OT: Google Docs, Etherpad\r\n- CRDT: Notion, Linear, Apple Notes (일부 기능)\r\n- 하이브리드: Figma (자체 구현, CRDT 영감을 받은 커스텀 솔루션)",
    "references": [
      {
        "title": "Real Differences between OT and CRDT",
        "url": "https://arxiv.org/abs/1905.01518"
      },
      {
        "title": "Building real-time collaboration: OT vs CRDT",
        "url": "https://www.tiny.cloud/blog/real-time-collaboration-ot-vs-crdt/"
      }
    ]
  },
  {
    "id": "CRDT-005",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs에서 제공하는 데이터 타입(Y.Array, Y.Map 등)의 역할과 사용 사례는 무엇인가요?",
    "answer": "Yjs는 다양한 공유 데이터 타입을 제공하며, 각각 특정 사용 사례에 최적화되어 있습니다.\r\n\r\n**주요 데이터 타입:**\r\n\r\n| 타입 | 설명 | 사용 사례 |\r\n|------|------|----------|\r\n| **Y.Text** | 협업 텍스트 편집 | 문서 편집기, 코드 에디터 |\r\n| **Y.Array** | 순서가 있는 리스트 | 할 일 목록, 슬라이드 순서 |\r\n| **Y.Map** | 키-값 저장소 | 설정, 사용자 정보 |\r\n| **Y.XmlFragment** | XML/HTML 구조 | 리치 텍스트, DOM 구조 |\r\n| **Y.XmlElement** | XML 요소 | 계층적 문서 구조 |\r\n\r\n**코드 예시:**\r\n\r\n```javascript\r\nconst ydoc = new Y.Doc()\r\n\r\n// Y.Text - 텍스트 편집\r\nconst ytext = ydoc.getText('editor')\r\nytext.insert(0, 'Hello')\r\n\r\n// Y.Array - 리스트 관리\r\nconst yarray = ydoc.getArray('todos')\r\nyarray.push(['Task 1', 'Task 2'])\r\n\r\n// Y.Map - 키-값 저장\r\nconst ymap = ydoc.getMap('settings')\r\nymap.set('theme', 'dark')\r\n```\r\n\r\n**중첩 구조:**\r\n- Y.Map과 Y.Array는 다른 공유 타입을 포함할 수 있어 복잡한 데이터 구조 표현 가능",
    "references": [
      {
        "title": "Yjs Shared Types",
        "url": "https://docs.yjs.dev/api/shared-types"
      }
    ]
  },
  {
    "id": "CRDT-006",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs의 업데이트 전파 및 문서 병합 방식은 어떻게 동작하나요?",
    "answer": "Yjs는 효율적인 바이너리 인코딩과 증분 업데이트를 통해 변경사항을 전파합니다.\r\n\r\n**업데이트 전파 과정:**\r\n\r\n1. **로컬 변경 감지**: 공유 타입에 변경 발생\r\n2. **업데이트 인코딩**: 변경사항을 Uint8Array로 인코딩\r\n3. **전파**: Provider를 통해 다른 피어에게 전송\r\n4. **적용**: 수신 측에서 업데이트 디코딩 및 적용\r\n\r\n```javascript\r\n// 업데이트 인코딩\r\nconst update = Y.encodeStateAsUpdate(ydoc)\r\n\r\n// 업데이트 적용\r\nY.applyUpdate(targetDoc, update)\r\n\r\n// 업데이트 이벤트 리스닝\r\nydoc.on('update', (update, origin) => {\r\n  // 다른 피어에게 전송\r\n  broadcastUpdate(update)\r\n})\r\n```\r\n\r\n**문서 병합:**\r\n- **State Vector**: 각 클라이언트의 현재 상태를 벡터로 표현\r\n- **차이점만 전송**: 두 문서의 State Vector를 비교하여 누락된 업데이트만 전송\r\n\r\n```javascript\r\n// State Vector 기반 동기화\r\nconst stateVector = Y.encodeStateVector(ydoc)\r\nconst diff = Y.encodeStateAsUpdate(remoteDoc, stateVector)\r\nY.applyUpdate(ydoc, diff)\r\n```",
    "references": [
      {
        "title": "Yjs Document Updates",
        "url": "https://docs.yjs.dev/api/document-updates"
      }
    ]
  },
  {
    "id": "CRDT-007",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs의 State Vector와 클라이언트 ID 기반 문서 버전 관리와 업데이트 충돌 해결 방법에 대해 설명해주세요.",
    "answer": "Yjs는 고유한 클라이언트 ID와 논리적 시계를 사용하여 버전을 관리하고 충돌을 해결합니다.\r\n\r\n**버전 관리 메커니즘:**\r\n\r\n- **Client ID**: 각 Y.Doc 인스턴스에 고유한 ID 할당\r\n- **Clock**: 각 클라이언트별로 단조 증가하는 논리적 시계\r\n- **State Vector**: `Map<clientID, clock>` 형태로 문서 상태 표현\r\n\r\n```javascript\r\n// 현재 State Vector 확인\r\nconst stateVector = Y.encodeStateVector(ydoc)\r\n\r\n// Snapshot으로 특정 시점 저장\r\nconst snapshot = Y.snapshot(ydoc)\r\n\r\n// 스냅샷 간 비교\r\nconst diff = Y.encodeStateAsUpdate(ydoc,\r\n  Y.encodeSnapshotV2(snapshot))\r\n```\r\n\r\n**충돌 해결 메커니즘:**\r\n\r\nYATA 알고리즘에 기반한 결정론적 규칙:\r\n\r\n1. **삽입 위치 결정**: 동일 위치 삽입 시 origin, rightOrigin, 클라이언트 ID 순으로 결정\r\n2. **삭제 처리**: 삭제된 항목은 tombstone으로 마킹 (참조 무결성 유지)\r\n3. **자동 병합**: 모든 클라이언트가 동일한 규칙을 적용하므로 최종 상태 수렴 보장\r\n\r\n> **State Vector의 역할**: State Vector는 \"내가 어떤 업데이트까지 받았는지\"를 표현합니다. 동기화 시 상대방의 State Vector와 비교하여 부족한 업데이트만 전송함으로써 대역폭을 절약합니다. 이는 벡터 시계(Vector Clock)의 개념과 유사합니다.",
    "references": [
      {
        "title": "Yjs Internals",
        "url": "https://docs.yjs.dev/api/internals"
      }
    ]
  },
  {
    "id": "CRDT-008",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs의 Awareness 프로토콜이란 무엇이며, 어떤 기능을 제공하나요?",
    "answer": "Awareness는 사용자 존재 정보(presence)와 커서 위치 등 일시적인 상태를 공유하는 프로토콜입니다.\r\n\r\n**주요 기능:**\r\n- **온라인 상태 추적**: 누가 현재 접속 중인지 확인\r\n- **커서 위치 공유**: 다른 사용자의 편집 위치 표시\r\n- **사용자 정보 전파**: 이름, 색상, 아바타 등\r\n\r\n**구현 방식:**\r\n\r\n```javascript\r\nimport { Awareness } from 'y-protocols/awareness'\r\n\r\nconst awareness = new Awareness(ydoc)\r\n\r\n// 로컬 상태 설정\r\nawareness.setLocalState({\r\n  user: { name: 'Alice', color: '#ff0000' },\r\n  cursor: { anchor: 10, head: 15 }\r\n})\r\n\r\n// 상태 변경 리스닝\r\nawareness.on('change', ({ added, updated, removed }) => {\r\n  // 사용자 목록 UI 업데이트\r\n})\r\n\r\n// 모든 사용자 상태 가져오기\r\nconst states = awareness.getStates()\r\n```\r\n\r\n**동작 원리:**\r\n- 각 클라이언트는 고유한 `clientID`를 가짐\r\n- 상태 변경 시 증가하는 clock과 함께 JSON 객체 전파\r\n- **30초 타임아웃**: 업데이트 없으면 오프라인으로 간주\r\n- **heartbeat 필요**: 정기적인 상태 브로드캐스트 권장",
    "references": [
      {
        "title": "Yjs Awareness",
        "url": "https://docs.yjs.dev/api/about-awareness"
      },
      {
        "title": "y-protocols GitHub",
        "url": "https://github.com/yjs/y-protocols"
      }
    ]
  },
  {
    "id": "CRDT-009",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs의 상대적 버전 관리(relative versioning) 메커니즘은 어떻게 작동하나요?",
    "answer": "Relative Position은 절대적인 인덱스 대신 다른 요소와의 관계로 위치를 표현하는 메커니즘입니다.\r\n\r\n**필요성:**\r\n- CRDT에서 절대 인덱스는 동시 편집 시 무효화될 수 있음\r\n- 커서 위치, 선택 영역 등을 안정적으로 유지해야 함\r\n\r\n**Relative Position 원리:**\r\n\r\n```javascript\r\nimport * as Y from 'yjs'\r\n\r\nconst ytext = ydoc.getText('editor')\r\n\r\n// 현재 위치를 Relative Position으로 변환\r\nconst relPos = Y.createRelativePositionFromTypeIndex(ytext, 5)\r\n\r\n// 나중에 다시 절대 위치로 변환\r\nconst absPos = Y.createAbsolutePositionFromRelativePosition(\r\n  relPos,\r\n  ydoc\r\n)\r\nconsole.log(absPos.index) // 변경된 문서에서의 새 위치\r\n```\r\n\r\n**내부 구조:**\r\n- `type`: 참조하는 공유 타입\r\n- `item`: 기준이 되는 항목의 ID (clientID + clock)\r\n- `assoc`: 항목의 앞(-1) 또는 뒤(1)를 가리킴\r\n\r\n**활용 사례:**\r\n- 커서 위치 저장 및 복원\r\n- 주석/코멘트의 텍스트 범위 추적\r\n- Undo/Redo 구현",
    "references": [
      {
        "title": "Yjs Relative Positions",
        "url": "https://docs.yjs.dev/api/relative-positions"
      }
    ]
  },
  {
    "id": "CRDT-010",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs와 다른 CRDT 라이브러리(예: Automerge) 간의 주요 차이점은 무엇인가요?",
    "answer": "Yjs와 Automerge는 모두 인기 있는 CRDT 라이브러리이지만 설계 철학과 특성이 다릅니다.\r\n\r\n| 구분 | Yjs | Automerge 2.0 |\r\n|------|-----|---------------|\r\n| **알고리즘** | YATA | RGA 변형 (OpSet) |\r\n| **데이터 모델** | 타입별 전용 구조 | JSON 문서 (불변 데이터) |\r\n| **인코딩** | 커스텀 바이너리 | 바이너리 (Rust 기반) |\r\n| **언어** | JavaScript (순수) | Rust + WASM/네이티브 바인딩 |\r\n| **성능** | 매우 빠름 | 2.0에서 크게 개선됨 |\r\n| **메모리** | 효율적 | 2.0에서 개선 (여전히 더 높음) |\r\n| **GC** | 지원 | 제한적 (히스토리 보존 우선) |\r\n| **히스토리** | 선택적 | 전체 히스토리 보존 기본 |\r\n\r\n**Yjs 강점:**\r\n- 텍스트 협업에 최적화된 성능\r\n- 다양한 에디터 바인딩 생태계 (ProseMirror, Quill, Monaco 등)\r\n- 네트워크 Provider 선택의 유연성\r\n- 가비지 컬렉션으로 문서 크기 관리\r\n- 브라우저 환경에서 가볍고 빠름\r\n\r\n**Automerge 강점:**\r\n- JSON 친화적 데이터 모델 (스키마리스)\r\n- 다국어 지원 (Rust, Python, Go, Swift 등)\r\n- automerge-repo로 end-to-end 동기화 제공\r\n- 전체 변경 히스토리 추적 (시간 여행 디버깅)\r\n- 강력한 머지 시맨틱스\r\n\r\n> **트레이드오프**: Yjs는 성능과 에디터 통합에 최적화되어 있고, Automerge는 데이터 무결성과 히스토리 보존에 중점을 둡니다. Automerge 2.0은 Rust로 재작성되어 성능이 크게 개선되었지만, 여전히 Yjs가 텍스트 편집 벤치마크에서 앞서는 경우가 많습니다.\r\n\r\n**선택 기준:**\r\n- 텍스트 에디터 중심 → Yjs\r\n- JSON 데이터 구조 + 히스토리 필요 → Automerge\r\n- 성능이 최우선 → Yjs\r\n- 백엔드가 Rust/다국어 → Automerge",
    "references": [
      {
        "title": "CRDT Implementations",
        "url": "https://crdt.tech/implementations"
      },
      {
        "title": "CRDT Benchmarks",
        "url": "https://github.com/dmonad/crdt-benchmarks"
      }
    ]
  },
  {
    "id": "CRDT-011",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs를 통한 실시간 협업 애플리케이션 구현 시 고려해야 할 사항은 무엇인가요?",
    "answer": "실시간 협업 애플리케이션 구현 시 여러 측면을 고려해야 합니다.\r\n\r\n**1. 네트워크 아키텍처:**\r\n- **중앙 서버 (y-websocket)**: 구현 단순, 권한 관리 용이\r\n- **P2P (y-webrtc)**: 서버 비용 절감, 지연 시간 단축\r\n- **하이브리드**: 둘을 조합하여 장점 활용\r\n\r\n**2. 데이터 영속성:**\r\n```javascript\r\n// IndexedDB를 통한 로컬 저장\r\nimport { IndexeddbPersistence } from 'y-indexeddb'\r\nconst persistence = new IndexeddbPersistence('doc-name', ydoc)\r\n\r\n// 서버 측 저장 전략\r\n// - y-leveldb, y-mongodb 등 활용\r\n```\r\n\r\n**3. 인증 및 권한:**\r\n- WebSocket 연결 시 토큰 검증\r\n- 문서별 읽기/쓰기 권한 분리\r\n- 민감한 작업에 대한 서버 측 검증\r\n\r\n**4. 성능 최적화:**\r\n- 큰 문서는 하위 문서(subdoc)로 분할\r\n- 불필요한 히스토리는 GC로 정리\r\n- 적절한 debounce로 업데이트 빈도 조절\r\n\r\n**5. UX 고려사항:**\r\n- Awareness로 다른 사용자 커서 표시\r\n- 연결 상태 표시 (온라인/오프라인)\r\n- 충돌 해결 결과에 대한 시각적 피드백",
    "references": [
      {
        "title": "Yjs Getting Started",
        "url": "https://docs.yjs.dev/getting-started"
      }
    ]
  },
  {
    "id": "CRDT-012",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs에서 업데이트를 옵저빙(observing)하는 방법과 이벤트 핸들링은 어떻게 이루어지나요?",
    "answer": "Yjs는 Observer 패턴을 사용하여 데이터 변경을 감지하고 반응할 수 있습니다.\r\n\r\n**문서 레벨 이벤트:**\r\n\r\n```javascript\r\n// 모든 업데이트 감지\r\nydoc.on('update', (update, origin, doc) => {\r\n  // update: Uint8Array - 변경 내용\r\n  // origin: any - 변경 출처\r\n})\r\n\r\n// 트랜잭션 후 이벤트\r\nydoc.on('afterTransaction', (transaction) => {\r\n  // 변경된 타입들 확인\r\n  transaction.changed.forEach((subs, type) => {\r\n    console.log('Changed:', type)\r\n  })\r\n})\r\n```\r\n\r\n**타입별 Observer:**\r\n\r\n```javascript\r\nconst ytext = ydoc.getText('editor')\r\n\r\n// Y.Text 옵저버\r\nytext.observe(event => {\r\n  event.delta.forEach(op => {\r\n    if (op.insert) console.log('Inserted:', op.insert)\r\n    if (op.delete) console.log('Deleted:', op.delete)\r\n    if (op.retain) console.log('Retained:', op.retain)\r\n  })\r\n})\r\n\r\nconst ymap = ydoc.getMap('data')\r\n\r\n// Y.Map 옵저버\r\nymap.observe(event => {\r\n  event.keysChanged.forEach(key => {\r\n    console.log('Key changed:', key, ymap.get(key))\r\n  })\r\n})\r\n\r\n// Deep 옵저버 (중첩 변경 감지)\r\nymap.observeDeep(events => {\r\n  events.forEach(event => {\r\n    console.log('Path:', event.path)\r\n  })\r\n})\r\n```\r\n\r\n**옵저버 해제:**\r\n```javascript\r\nconst observer = event => { /* ... */ }\r\nytext.observe(observer)\r\nytext.unobserve(observer)\r\n```",
    "references": [
      {
        "title": "Yjs Events",
        "url": "https://docs.yjs.dev/api/shared-types/y.text#observing-changes-y.textevent"
      }
    ]
  },
  {
    "id": "CRDT-013",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs에서 텍스트 변경 사항을 표현하는 Quill Delta 기반의 Delta 업데이트 방식과 그 장점에 대해 설명해주세요.",
    "answer": "Yjs의 Delta는 Quill Delta 형식을 기반으로 텍스트 변경을 표현하는 방식입니다.\r\n\r\n**Delta 구조:**\r\n\r\n```javascript\r\n// Delta는 세 가지 연산으로 구성\r\n{\r\n  insert: \"Hello\",     // 삽입\r\n  delete: 5,           // 삭제\r\n  retain: 10,          // 유지 (위치 이동)\r\n  attributes: { bold: true }  // 서식 (선택적)\r\n}\r\n\r\n// 예시: \"Hello World\" → \"Hello Yjs\"\r\n[\r\n  { retain: 6 },       // \"Hello \" 유지\r\n  { delete: 5 },       // \"World\" 삭제\r\n  { insert: \"Yjs\" }    // \"Yjs\" 삽입\r\n]\r\n```\r\n\r\n**Y.Text와 Delta:**\r\n\r\n```javascript\r\nconst ytext = ydoc.getText('editor')\r\n\r\n// Delta로 내용 적용\r\nytext.applyDelta([\r\n  { insert: 'Hello ' },\r\n  { insert: 'World', attributes: { bold: true } }\r\n])\r\n\r\n// 현재 내용을 Delta로 변환\r\nconst delta = ytext.toDelta()\r\n\r\n// 변경 이벤트에서 Delta 받기\r\nytext.observe(event => {\r\n  console.log(event.delta)\r\n  // [{ retain: 6 }, { insert: 'Yjs' }]\r\n})\r\n```\r\n\r\n**장점:**\r\n- **직관적 표현**: 변경 사항을 명확하게 표현\r\n- **서식 지원**: 속성(attributes)으로 리치 텍스트 지원\r\n- **효율적 전송**: 전체 문서 대신 변경분만 전송\r\n- **에디터 호환**: Quill, ProseMirror 등과 쉽게 연동",
    "references": [
      {
        "title": "Quill Delta",
        "url": "https://quilljs.com/docs/delta/"
      },
      {
        "title": "Y.Text API",
        "url": "https://docs.yjs.dev/api/shared-types/y.text"
      }
    ]
  },
  {
    "id": "CRDT-014",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs 문서 병합 과정에서 동시 삽입, 동시 삭제 등 발생할 수 있는 충돌 상황은 어떤 것이며, 이를 어떻게 해결하나요?",
    "answer": "CRDT 특성상 Yjs에서는 \"충돌\"이 자동으로 해결되지만, 결과가 사용자의 의도와 다를 수 있는 상황을 이해해야 합니다.\r\n\r\n> **핵심 개념**: CRDT에서 \"충돌\"은 기술적으로 발생하지 않습니다. 모든 동시 편집은 결정론적 규칙에 따라 자동 병합됩니다. 그러나 \"의미적 충돌\"(사용자 의도와 다른 결과)은 여전히 발생할 수 있습니다.\r\n\r\n**1. 동시 삽입 충돌:**\r\n- **상황**: 두 사용자가 같은 위치에 동시에 텍스트 삽입\r\n- **해결**: 클라이언트 ID를 기준으로 결정론적 순서 적용\r\n\r\n```javascript\r\n// User A (clientID: 100): \"Hello|World\" → \"Hello_X_World\"\r\n// User B (clientID: 200): \"Hello|World\" → \"Hello_Y_World\"\r\n// 결과: \"Hello_XY_World\" (clientID 100 < 200 이므로 X가 앞)\r\n// 모든 클라이언트에서 항상 동일한 결과!\r\n```\r\n\r\n**2. 동시 삭제와 수정:**\r\n- **상황**: 한 사용자가 텍스트를 삭제하는 동안 다른 사용자가 같은 텍스트를 수정\r\n- **해결**: 삭제가 적용됨 (tombstone). 수정 연산은 이미 삭제된 항목에 적용\r\n\r\n```javascript\r\n// User A: \"Hello\" → \"\" (전체 삭제)\r\n// User B: \"Hello\" → \"HELLO\" (대문자 변환 시도)\r\n// 결과: \"\" (삭제 승리)\r\n// 이것이 의도한 결과인지는 애플리케이션 레벨에서 판단 필요\r\n```\r\n\r\n**3. 동시 속성 변경 (Y.Map, 서식):**\r\n- **상황**: 같은 키나 같은 텍스트 범위에 다른 값/서식 적용\r\n- **해결**: Last-Write-Wins (LWW) - 논리적 시계 기준 마지막 변경 적용\r\n\r\n```javascript\r\n// User A (clock: 5): ymap.set('color', 'red')\r\n// User B (clock: 6): ymap.set('color', 'blue')\r\n// 결과: 'blue' (clock 6 > 5)\r\n```\r\n\r\n**4. Interleaving 문제:**\r\n- **상황**: \"foo\"와 \"bar\" 동시 입력 시 \"fboaor\" 같은 결과\r\n- **해결**: YATA 알고리즘이 rightOrigin을 사용하여 이 문제를 최소화\r\n\r\n```javascript\r\n// 기존 알고리즘 (RGA 등):\r\n// User A: \"\" → \"f\" → \"fo\" → \"foo\"\r\n// User B: \"\" → \"b\" → \"ba\" → \"bar\"\r\n// 가능한 결과: \"fboaor\" (인터리빙 발생!)\r\n\r\n// YATA:\r\n// rightOrigin 정보를 사용하여 \"단어\" 단위 유지\r\n// 결과: \"foobar\" 또는 \"barfoo\"\r\n```\r\n\r\n**의도 보존을 위한 전략:**\r\n\r\n```javascript\r\n// 1. 트랜잭션으로 원자적 변경 (관련 변경을 묶음)\r\nydoc.transact(() => {\r\n  ymap.set('status', 'editing')\r\n  ytext.insert(0, 'Draft: ')\r\n}, 'user-action')\r\n\r\n// 2. 의미적 충돌 감지 및 알림\r\nytext.observe((event) => {\r\n  if (event.origin !== 'local' && hasOverlap(event, localPendingEdits)) {\r\n    showConflictWarning()\r\n  }\r\n})\r\n\r\n// 3. 중요한 변경에 대한 락 (Awareness 활용)\r\nawareness.setLocalState({ editing: 'paragraph-1' })\r\n```\r\n\r\n> **함정 주의**: \"CRDT는 충돌이 없다\"는 말은 \"기술적 충돌\"이 없다는 의미입니다. 사용자 관점에서의 \"의미적 충돌\"은 여전히 발생하며, 좋은 UX를 위해서는 이를 시각적으로 표시하거나 알림을 제공해야 합니다.",
    "references": [
      {
        "title": "YATA Algorithm",
        "url": "https://docs.yjs.dev/api/internals"
      }
    ]
  },
  {
    "id": "CRDT-015",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs의 메모리 사용 최적화 및 성능 개선 방안은 무엇인가요?",
    "answer": "Yjs 애플리케이션의 성능을 최적화하기 위한 여러 전략이 있습니다.\r\n\r\n**1. 가비지 컬렉션 (GC):**\r\n\r\n```javascript\r\nconst ydoc = new Y.Doc({ gc: true }) // 기본값\r\n\r\n// GC는 삭제된 콘텐츠(tombstone)의 구조를 정리\r\n// 메모리와 문서 크기 절약\r\n```\r\n\r\n> **GC 트레이드오프**: GC를 활성화하면 메모리가 절약되지만, Undo/Redo 히스토리가 제한됩니다. GC가 실행된 후에는 GC된 시점 이전으로 되돌릴 수 없습니다. 협업 히스토리가 중요한 경우 `gc: false`를 고려하세요.\r\n\r\n**2. Subdocuments (하위 문서):**\r\n\r\n```javascript\r\n// 큰 문서를 작은 단위로 분할\r\nconst rootDoc = new Y.Doc()\r\nconst subdocs = rootDoc.getMap('subdocs')\r\n\r\n// 필요할 때만 로드\r\nsubdocs.set('chapter1', new Y.Doc())\r\nsubdocs.get('chapter1').load()\r\n```\r\n\r\n**3. 업데이트 압축:**\r\n\r\n```javascript\r\n// 여러 업데이트를 하나로 병합\r\nconst mergedUpdate = Y.mergeUpdates([update1, update2, update3])\r\n```\r\n\r\n**4. 트랜잭션 활용:**\r\n\r\n```javascript\r\n// 여러 변경을 하나의 업데이트로 묶음\r\nydoc.transact(() => {\r\n  yarray.push([item1])\r\n  yarray.push([item2])\r\n  ymap.set('key', 'value')\r\n}, 'batch-update')\r\n```\r\n\r\n**5. 효율적인 초기 동기화:**\r\n\r\n```javascript\r\n// State Vector 기반 차이점만 동기화\r\nconst sv = Y.encodeStateVector(localDoc)\r\nconst update = Y.encodeStateAsUpdate(remoteDoc, sv)\r\nY.applyUpdate(localDoc, update)\r\n```\r\n\r\n**6. 메모리 모니터링:**\r\n- 대용량 문서에서는 정기적으로 문서 크기 확인\r\n- 필요시 오래된 히스토리 정리",
    "references": [
      {
        "title": "Yjs Performance Tips",
        "url": "https://docs.yjs.dev/api/document-updates"
      }
    ]
  },
  {
    "id": "CRDT-016",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs의 저장소(storage) 모듈과 데이터를 영구 저장하는 전략은 무엇인가요?",
    "answer": "Yjs는 다양한 영속성 Provider를 통해 문서를 저장할 수 있습니다.\r\n\r\n**클라이언트 측 저장:**\r\n\r\n```javascript\r\n// IndexedDB (브라우저)\r\nimport { IndexeddbPersistence } from 'y-indexeddb'\r\n\r\nconst persistence = new IndexeddbPersistence('doc-name', ydoc)\r\n\r\npersistence.on('synced', () => {\r\n  console.log('IndexedDB에서 로드 완료')\r\n})\r\n```\r\n\r\n**서버 측 저장:**\r\n\r\n```javascript\r\n// LevelDB\r\nimport { LeveldbPersistence } from 'y-leveldb'\r\nconst persistence = new LeveldbPersistence('./storage')\r\n\r\n// 문서 저장\r\npersistence.storeUpdate('doc-id', update)\r\n\r\n// 문서 로드\r\nconst ydoc = await persistence.getYDoc('doc-id')\r\n```\r\n\r\n**저장 전략:**\r\n\r\n1. **전체 문서 저장:**\r\n```javascript\r\nconst encodedState = Y.encodeStateAsUpdate(ydoc)\r\nawait db.save('doc-id', encodedState)\r\n```\r\n\r\n2. **증분 업데이트 저장:**\r\n```javascript\r\nydoc.on('update', async (update) => {\r\n  await db.appendUpdate('doc-id', update)\r\n})\r\n\r\n// 주기적으로 압축\r\nconst mergedUpdate = Y.mergeUpdates(allUpdates)\r\n```\r\n\r\n3. **스냅샷 + 증분:**\r\n```javascript\r\n// 기준 스냅샷 저장\r\nconst snapshot = Y.encodeStateAsUpdate(ydoc)\r\n\r\n// 이후 증분만 저장\r\n// 복원 시 스냅샷 + 증분 적용\r\n```\r\n\r\n**고려사항:**\r\n- 업데이트 로그가 커지면 주기적으로 병합\r\n- 동시성 제어를 위한 적절한 락 메커니즘\r\n- 백업 및 복구 전략",
    "references": [
      {
        "title": "y-indexeddb",
        "url": "https://github.com/yjs/y-indexeddb"
      },
      {
        "title": "y-leveldb",
        "url": "https://github.com/yjs/y-leveldb"
      }
    ]
  },
  {
    "id": "CRDT-017",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "IndexedDB 등 로컬 저장소와 함께 네트워크 지연(latency) 환경에서 Yjs의 동기화 성능을 개선하는 방법은 무엇인가요?",
    "answer": "네트워크 지연 환경에서도 Yjs는 로컬 우선 동작으로 좋은 사용자 경험을 제공합니다.\r\n\r\n**1. 낙관적 업데이트 (기본 동작):**\r\n- 로컬 변경은 즉시 반영\r\n- 네트워크 응답을 기다리지 않음\r\n- 나중에 동기화되어도 결과 수렴 보장\r\n\r\n**2. 로컬 영속성 활용:**\r\n\r\n```javascript\r\nimport { IndexeddbPersistence } from 'y-indexeddb'\r\nimport { WebsocketProvider } from 'y-websocket'\r\n\r\n// 로컬 저장소 우선 로드\r\nconst indexeddb = new IndexeddbPersistence('doc', ydoc)\r\n\r\n// 네트워크 연결은 비동기로\r\nindexeddb.on('synced', () => {\r\n  const ws = new WebsocketProvider('wss://server', 'room', ydoc)\r\n})\r\n```\r\n\r\n**3. 재연결 전략:**\r\n\r\n```javascript\r\nconst provider = new WebsocketProvider(url, room, ydoc, {\r\n  connect: true,\r\n  // 재연결 지연 시간\r\n  resyncInterval: 10000,\r\n  // 연결 상태 추적\r\n})\r\n\r\nprovider.on('status', ({ status }) => {\r\n  if (status === 'disconnected') {\r\n    // 오프라인 UI 표시\r\n  }\r\n})\r\n```\r\n\r\n**4. 업데이트 배칭:**\r\n\r\n```javascript\r\n// debounce로 업데이트 묶음\r\nlet pendingUpdate = null\r\n\r\nydoc.on('update', (update) => {\r\n  pendingUpdate = pendingUpdate\r\n    ? Y.mergeUpdates([pendingUpdate, update])\r\n    : update\r\n\r\n  debounce(() => {\r\n    send(pendingUpdate)\r\n    pendingUpdate = null\r\n  }, 50)\r\n})\r\n```\r\n\r\n**5. 압축 전송:**\r\n- Yjs 업데이트는 이미 바이너리로 효율적\r\n- 필요시 gzip 추가 압축 적용",
    "references": [
      {
        "title": "Yjs Offline Support",
        "url": "https://docs.yjs.dev/getting-started/allowing-offline-editing"
      }
    ]
  },
  {
    "id": "CRDT-018",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs와 WebSocket(y-websocket), WebRTC(y-webrtc) 등 실시간 통신 프로토콜 연동 방안에 대해 설명해주세요.",
    "answer": "Yjs는 네트워크 프로토콜에 독립적이며, 다양한 Provider를 통해 연동합니다.\r\n\r\n**1. WebSocket (y-websocket):**\r\n\r\n```javascript\r\nimport { WebsocketProvider } from 'y-websocket'\r\n\r\nconst provider = new WebsocketProvider(\r\n  'wss://your-server.com',\r\n  'document-room',\r\n  ydoc,\r\n  { params: { auth: 'token' } }\r\n)\r\n\r\n// 연결 상태 모니터링\r\nprovider.on('status', event => {\r\n  console.log(event.status) // 'connecting' | 'connected' | 'disconnected'\r\n})\r\n```\r\n\r\n**2. WebRTC (y-webrtc):**\r\n\r\n```javascript\r\nimport { WebrtcProvider } from 'y-webrtc'\r\n\r\nconst provider = new WebrtcProvider('room-name', ydoc, {\r\n  signaling: ['wss://signaling-server.com'],\r\n  password: 'optional-encryption-key',\r\n  maxConns: 20\r\n})\r\n\r\n// P2P 연결로 서버 부하 감소\r\n```\r\n\r\n**3. 커스텀 Provider 구현:**\r\n\r\n```javascript\r\nimport * as Y from 'yjs'\r\nimport * as syncProtocol from 'y-protocols/sync'\r\n\r\nclass CustomProvider {\r\n  constructor(ydoc, connection) {\r\n    this.ydoc = ydoc\r\n    this.conn = connection\r\n\r\n    // 동기화 프로토콜 초기화\r\n    const encodedState = Y.encodeStateVector(ydoc)\r\n    this.conn.send(syncProtocol.writeSyncStep1(encodedState))\r\n\r\n    // 업데이트 전파\r\n    ydoc.on('update', (update, origin) => {\r\n      if (origin !== this) {\r\n        this.conn.send(update)\r\n      }\r\n    })\r\n\r\n    // 수신 처리\r\n    this.conn.on('message', (data) => {\r\n      Y.applyUpdate(ydoc, data, this)\r\n    })\r\n  }\r\n}\r\n```\r\n\r\n**프로토콜 선택 기준:**\r\n\r\n| 프로토콜 | 장점 | 단점 |\r\n|---------|------|------|\r\n| WebSocket | 안정적, 권한 제어 용이 | 서버 비용 |\r\n| WebRTC | P2P, 낮은 지연 | 연결 설정 복잡 |\r\n| 하이브리드 | 장점 조합 | 구현 복잡도 |",
    "references": [
      {
        "title": "y-websocket",
        "url": "https://github.com/yjs/y-websocket"
      },
      {
        "title": "y-webrtc",
        "url": "https://github.com/yjs/y-webrtc"
      }
    ]
  },
  {
    "id": "CRDT-019",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "CRDT를 이용한 분산 시스템에서 eventual consistency와 strong consistency의 차이는 무엇인가요?",
    "answer": "분산 시스템에서 일관성 모델은 데이터 동기화의 보장 수준을 정의합니다.\r\n\r\n**Strong Consistency (강한 일관성 / Linearizability):**\r\n- 모든 읽기는 가장 최근 쓰기 결과를 반환\r\n- 모든 노드가 동일한 순서로 업데이트 확인\r\n- 전역 총 순서(total order)가 존재\r\n- 예: 전통적인 RDBMS, Raft/Paxos 기반 시스템, Spanner\r\n\r\n```\r\n시간 ---->\r\nNode A: Write(x=1) ----+\r\nNode B: Read(x) = 1 ---+  (A의 쓰기 후에만 읽기 가능)\r\n```\r\n\r\n**Eventual Consistency (최종 일관성):**\r\n- 충분한 시간이 지나면 모든 노드가 같은 상태에 도달\r\n- 중간 상태에서는 노드별로 다른 값을 볼 수 있음\r\n- 수렴 방식이 정의되지 않음 (충돌 해결 필요)\r\n\r\n```\r\n시간 ---->\r\nNode A: Write(x=1) -----> x=1\r\nNode B: Read(x) = 0 ...-> x=1 (나중에 동기화, 충돌 시 해결 필요)\r\n```\r\n\r\n**Strong Eventual Consistency (SEC) - CRDT의 핵심:**\r\n\r\nCRDT는 일반적인 Eventual Consistency보다 강한 보장을 제공합니다. Shapiro et al. (2011) 논문에서 정의한 SEC의 세 가지 속성:\r\n\r\n1. **Eventual Delivery**: 한 복제본에 전달된 업데이트는 결국 모든 복제본에 전달됨\r\n2. **Strong Convergence**: 같은 업데이트 집합을 받은 복제본은 *즉시* 동일한 상태 (순서 무관)\r\n3. **Termination**: 모든 연산은 유한 시간 내에 완료\r\n\r\n> **핵심 차이**: 일반 EC는 \"언젠가 같아진다\"만 보장하고 충돌 해결이 별도로 필요합니다. SEC는 \"같은 업데이트를 받으면 *항상* 같은 상태가 된다\"를 수학적으로 보장하며, 충돌 해결이 데이터 구조에 내장되어 있습니다.\r\n\r\n**트레이드오프 (CAP/PACELC 정리):**\r\n\r\n| 속성 | Strong Consistency | Eventual Consistency | Strong Eventual (CRDT) |\r\n|------|-------------------|---------------------|----------------------|\r\n| 가용성 | 낮음 (P 시 불가) | 높음 | 높음 |\r\n| 지연 시간 | 높음 (합의 필요) | 낮음 | 낮음 |\r\n| 네트워크 분할 허용 | 불가 | 가능 | 가능 |\r\n| 오프라인 작업 | 불가 | 제한적 | 완전 지원 |\r\n| 충돌 해결 | 불필요 | 수동/LWW 등 | 자동 (결정론적) |\r\n| 메모리 오버헤드 | 낮음 | 낮음 | 높음 (메타데이터) |",
    "references": [
      {
        "title": "CRDT.tech - About CRDTs",
        "url": "https://crdt.tech/"
      }
    ]
  },
  {
    "id": "CRDT-020",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs 문서 크기가 커질 때 발생할 수 있는 성능 이슈와 대응 방법은 무엇인가요?",
    "answer": "대용량 Yjs 문서는 메모리, 네트워크, 초기 로드 시간에 영향을 줄 수 있습니다.\r\n\r\n> **실제 사례**: 일반적인 협업 문서(10-50페이지)에서는 Yjs가 매우 효율적입니다. 문제는 수백 페이지의 문서, 오랜 편집 히스토리가 누적된 경우, 또는 대량의 동시 편집자가 있는 경우에 발생합니다.\r\n\r\n**성능 이슈:**\r\n\r\n1. **메모리 사용량 증가**\r\n   - 각 문자에 메타데이터 포함 (ID: clientID + clock, origin 참조)\r\n   - 삭제된 항목도 tombstone으로 유지 (GC 전까지)\r\n   - 예: 1MB 텍스트 → Yjs 문서에서 3-5MB (메타데이터 포함)\r\n\r\n2. **초기 동기화 지연**\r\n   - 새 클라이언트는 전체 문서 상태를 수신해야 함\r\n   - 히스토리가 긴 문서일수록 초기 로드 시간 증가\r\n\r\n3. **업데이트 처리 시간**\r\n   - 큰 문서에서 삽입 위치 탐색 시간 증가\r\n   - YATA의 최악 케이스: O(n) (하지만 실제로는 대부분 O(1))\r\n\r\n**대응 방법:**\r\n\r\n**1. Subdocuments 활용:**\r\n```javascript\r\n// 문서를 논리적 단위로 분할\r\nconst mainDoc = new Y.Doc()\r\nconst chapters = mainDoc.getMap('chapters')\r\n\r\n// 각 챕터를 별도 하위 문서로\r\nchapters.set('chapter1', new Y.Doc())\r\nchapters.set('chapter2', new Y.Doc())\r\n\r\n// 필요한 부분만 로드\r\nchapters.get('chapter1').load()\r\n```\r\n\r\n**2. 가비지 컬렉션:**\r\n```javascript\r\n// GC 활성화 (기본값)\r\nconst ydoc = new Y.Doc({ gc: true })\r\n\r\n// 특정 시점 이전 히스토리 정리\r\n// (Undo Manager와 호환 주의)\r\n```\r\n\r\n**3. 스냅샷 기반 압축:**\r\n```javascript\r\n// 주기적으로 전체 상태 스냅샷 저장\r\nconst snapshot = Y.encodeStateAsUpdate(ydoc)\r\n\r\n// 이전 업데이트 로그 삭제\r\nawait clearOldUpdates()\r\nawait saveSnapshot(snapshot)\r\n```\r\n\r\n**4. Lazy Loading:**\r\n```javascript\r\n// 스크롤 등에 따라 필요한 부분만 로드\r\nsubdoc.on('load', () => {\r\n  // 하위 문서 로드 시 처리\r\n})\r\n```\r\n\r\n**5. 모니터링:**\r\n```javascript\r\n// 문서 크기 추적\r\nconst size = Y.encodeStateAsUpdate(ydoc).byteLength\r\nconsole.log(`Document size: ${size} bytes`)\r\n```",
    "references": [
      {
        "title": "Yjs Subdocuments",
        "url": "https://docs.yjs.dev/api/subdocuments"
      }
    ]
  },
  {
    "id": "CRDT-021",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs의 모듈화 구조와 플러그인 확장 기능에 대해 설명해주세요.",
    "answer": "Yjs는 핵심 라이브러리와 확장 모듈로 구성된 모듈화된 아키텍처를 가집니다.\r\n\r\n**핵심 패키지 (yjs):**\r\n- Y.Doc, Y.Array, Y.Map, Y.Text 등 기본 CRDT 타입\r\n- 인코딩/디코딩, 동기화 프로토콜\r\n\r\n**네트워크 Provider:**\r\n```javascript\r\n// WebSocket\r\nimport { WebsocketProvider } from 'y-websocket'\r\n\r\n// WebRTC (P2P)\r\nimport { WebrtcProvider } from 'y-webrtc'\r\n\r\n// 다른 Provider도 동일한 인터페이스\r\n```\r\n\r\n**영속성 Provider:**\r\n```javascript\r\n// 브라우저 IndexedDB\r\nimport { IndexeddbPersistence } from 'y-indexeddb'\r\n\r\n// 서버 LevelDB\r\nimport { LeveldbPersistence } from 'y-leveldb'\r\n```\r\n\r\n**에디터 바인딩:**\r\n```javascript\r\n// ProseMirror\r\nimport { ySyncPlugin } from 'y-prosemirror'\r\n\r\n// Quill\r\nimport { QuillBinding } from 'y-quill'\r\n\r\n// Monaco (VS Code 에디터)\r\nimport { MonacoBinding } from 'y-monaco'\r\n\r\n// CodeMirror\r\nimport { yCollab } from 'y-codemirror.next'\r\n```\r\n\r\n**프로토콜 모듈 (y-protocols):**\r\n```javascript\r\nimport * as syncProtocol from 'y-protocols/sync'\r\nimport * as awarenessProtocol from 'y-protocols/awareness'\r\nimport * as authProtocol from 'y-protocols/auth'\r\n```\r\n\r\n**커스텀 Provider 구현:**\r\n\r\n```javascript\r\n// 기본 인터페이스 구현\r\nclass CustomProvider {\r\n  constructor(ydoc) {\r\n    this.ydoc = ydoc\r\n    this.awareness = new awarenessProtocol.Awareness(ydoc)\r\n\r\n    ydoc.on('update', this.handleUpdate)\r\n  }\r\n\r\n  handleUpdate = (update, origin) => {\r\n    // 커스텀 전송 로직\r\n  }\r\n\r\n  destroy() {\r\n    this.ydoc.off('update', this.handleUpdate)\r\n  }\r\n}\r\n```\r\n\r\n**생태계 장점:**\r\n- 필요한 기능만 선택적 사용\r\n- 새로운 백엔드/에디터 쉽게 추가\r\n- 커뮤니티 확장 활발",
    "references": [
      {
        "title": "Yjs Ecosystem",
        "url": "https://docs.yjs.dev/ecosystem"
      }
    ]
  },
  {
    "id": "CRDT-022",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs에서 데이터 업데이트 시 네트워크 트래픽 최적화를 위한 기법은 무엇인가요?",
    "answer": "Yjs는 효율적인 바이너리 인코딩을 사용하지만, 추가 최적화 기법을 적용할 수 있습니다.\r\n\r\n**1. 업데이트 병합:**\r\n\r\n```javascript\r\n// 여러 업데이트를 하나로 결합\r\nconst updates = []\r\n\r\nydoc.on('update', (update) => {\r\n  updates.push(update)\r\n})\r\n\r\n// 일정 시간 후 병합하여 전송\r\nsetInterval(() => {\r\n  if (updates.length > 0) {\r\n    const merged = Y.mergeUpdates(updates)\r\n    send(merged)\r\n    updates.length = 0\r\n  }\r\n}, 100)\r\n```\r\n\r\n**2. Debouncing:**\r\n\r\n```javascript\r\nimport { debounce } from 'lodash'\r\n\r\nconst sendUpdate = debounce((update) => {\r\n  websocket.send(update)\r\n}, 50)\r\n\r\nydoc.on('update', sendUpdate)\r\n```\r\n\r\n**3. 차등 동기화:**\r\n\r\n```javascript\r\n// 전체 문서 대신 차이점만 전송\r\nconst clientStateVector = receiveStateVector()\r\nconst diff = Y.encodeStateAsUpdate(ydoc, clientStateVector)\r\nsend(diff)\r\n```\r\n\r\n**4. 압축:**\r\n\r\n```javascript\r\n// gzip 등 추가 압축\r\nimport { gzipSync, gunzipSync } from 'fflate'\r\n\r\nconst compressed = gzipSync(update)\r\nsend(compressed)\r\n\r\n// 수신 측\r\nconst decompressed = gunzipSync(received)\r\nY.applyUpdate(ydoc, decompressed)\r\n```\r\n\r\n**5. 선택적 동기화:**\r\n\r\n```javascript\r\n// 중요도에 따른 우선순위\r\nydoc.on('update', (update, origin) => {\r\n  if (isHighPriority(origin)) {\r\n    sendImmediate(update)\r\n  } else {\r\n    queueForBatch(update)\r\n  }\r\n})\r\n```\r\n\r\n**6. 대역폭 제한:**\r\n\r\n```javascript\r\n// Rate limiting\r\nconst rateLimiter = createRateLimiter(1000) // 1KB/s\r\n\r\nydoc.on('update', (update) => {\r\n  rateLimiter.enqueue(update)\r\n})\r\n```",
    "references": [
      {
        "title": "Yjs Performance",
        "url": "https://docs.yjs.dev/api/document-updates"
      }
    ]
  },
  {
    "id": "CRDT-023",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "트랜잭션 그룹화, 업데이트 병합 등을 통해 Yjs 업데이트 메시지의 크기를 최소화하는 방법에 대해 설명해주세요.",
    "answer": "Yjs 업데이트 메시지 크기 최소화는 네트워크 효율성과 성능에 직접적인 영향을 줍니다.\r\n\r\n**Yjs 기본 최적화:**\r\n- **바이너리 인코딩**: JSON 대비 훨씬 컴팩트\r\n- **변수 길이 정수**: 작은 숫자에 적은 바이트 사용\r\n- **참조 기반 구조**: 중복 데이터 최소화\r\n\r\n**추가 최적화 기법:**\r\n\r\n**1. 트랜잭션 그룹화:**\r\n```javascript\r\n// 여러 변경을 하나의 업데이트로\r\nydoc.transact(() => {\r\n  ytext.insert(0, 'Hello')\r\n  ytext.insert(5, ' World')\r\n  ymap.set('timestamp', Date.now())\r\n})\r\n// = 1개의 업데이트 생성\r\n```\r\n\r\n**2. 업데이트 병합:**\r\n```javascript\r\n// 누적된 업데이트 압축\r\nconst mergedUpdate = Y.mergeUpdates([\r\n  update1,  // 10 bytes\r\n  update2,  // 15 bytes\r\n  update3   // 12 bytes\r\n])\r\n// mergedUpdate: ~25 bytes (중복 제거)\r\n```\r\n\r\n**3. Origin 필터링:**\r\n```javascript\r\nydoc.on('update', (update, origin) => {\r\n  // 자신이 발생시킨 원격 업데이트는 재전송 안 함\r\n  if (origin !== 'remote') {\r\n    broadcast(update)\r\n  }\r\n})\r\n```\r\n\r\n**4. 압축 적용:**\r\n```javascript\r\n// Yjs 업데이트는 이미 효율적이지만\r\n// 대량 전송 시 추가 압축 고려\r\nimport pako from 'pako'\r\n\r\nconst compressed = pako.deflate(update)\r\n// 일반적으로 20-50% 추가 압축\r\n```\r\n\r\n**5. Diff 기반 전송:**\r\n```javascript\r\n// 전체 상태 대신 차이만 계산\r\nconst senderSV = Y.encodeStateVector(senderDoc)\r\nconst receiverSV = Y.encodeStateVector(receiverDoc)\r\n\r\n// 받는 측에 없는 부분만 전송\r\nconst missingUpdates = Y.encodeStateAsUpdate(senderDoc, receiverSV)\r\n```\r\n\r\n**메시지 크기 측정:**\r\n```javascript\r\nconst update = Y.encodeStateAsUpdate(ydoc)\r\nconsole.log(`Update size: ${update.byteLength} bytes`)\r\n```",
    "references": [
      {
        "title": "Yjs Internals",
        "url": "https://docs.yjs.dev/api/internals"
      }
    ]
  },
  {
    "id": "CRDT-024",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs 기반 협업 도구에서 사용되는 이벤트(event) 처리 패턴은 무엇인가요?",
    "answer": "Yjs는 다양한 수준에서 이벤트를 제공하며, 효과적인 패턴을 통해 처리합니다.\r\n\r\n**이벤트 계층:**\r\n\r\n```javascript\r\n// 1. 문서 레벨 이벤트\r\nydoc.on('update', (update, origin) => { /* ... */ })\r\nydoc.on('afterTransaction', (tr) => { /* ... */ })\r\n\r\n// 2. 타입 레벨 이벤트\r\nytext.observe(event => { /* ... */ })\r\nymap.observeDeep(events => { /* ... */ })\r\n\r\n// 3. Awareness 이벤트\r\nawareness.on('change', ({ added, updated, removed }) => { /* ... */ })\r\n```\r\n\r\n**일반적인 처리 패턴:**\r\n\r\n**1. Origin 기반 분기:**\r\n```javascript\r\nydoc.on('update', (update, origin) => {\r\n  if (origin === 'local') {\r\n    // 로컬 변경 → 서버로 전송\r\n    sendToServer(update)\r\n  } else if (origin === 'remote') {\r\n    // 원격 변경 → UI 업데이트만\r\n  }\r\n})\r\n```\r\n\r\n**2. 배치 처리:**\r\n```javascript\r\nydoc.on('afterTransaction', (transaction) => {\r\n  // 트랜잭션 내 모든 변경 일괄 처리\r\n  const changes = []\r\n\r\n  transaction.changed.forEach((subs, type) => {\r\n    changes.push({ type, subs: Array.from(subs) })\r\n  })\r\n\r\n  processChanges(changes)\r\n})\r\n```\r\n\r\n**3. Deep Observer 패턴:**\r\n```javascript\r\nconst root = ydoc.getMap('root')\r\n\r\nroot.observeDeep((events) => {\r\n  events.forEach(event => {\r\n    console.log('Path:', event.path)\r\n    console.log('Target:', event.target)\r\n\r\n    // 경로 기반 처리\r\n    if (event.path[0] === 'users') {\r\n      updateUserList()\r\n    }\r\n  })\r\n})\r\n```\r\n\r\n**4. 멱등성 보장:**\r\n```javascript\r\nymap.observe(event => {\r\n  event.keysChanged.forEach(key => {\r\n    const value = ymap.get(key)\r\n    // 항상 최신 값으로 UI 업데이트\r\n    updateUI(key, value)\r\n  })\r\n})\r\n```\r\n\r\n**5. 이벤트 정리:**\r\n```javascript\r\nconst observer = (event) => { /* ... */ }\r\n\r\n// 등록\r\nytext.observe(observer)\r\n\r\n// 컴포넌트 언마운트 시 해제\r\nonCleanup(() => {\r\n  ytext.unobserve(observer)\r\n})\r\n```",
    "references": [
      {
        "title": "Yjs Events",
        "url": "https://docs.yjs.dev/api/y.doc"
      }
    ]
  },
  {
    "id": "CRDT-025",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "CRDT를 활용한 오프라인 편집 및 동기화 시나리오는 어떻게 구성되나요?",
    "answer": "CRDT의 가장 큰 장점 중 하나는 오프라인 편집을 자연스럽게 지원한다는 것입니다.\r\n\r\n**오프라인 시나리오 구성:**\r\n\r\n**1. 로컬 영속성 설정:**\r\n```javascript\r\nimport * as Y from 'yjs'\r\nimport { IndexeddbPersistence } from 'y-indexeddb'\r\nimport { WebsocketProvider } from 'y-websocket'\r\n\r\nconst ydoc = new Y.Doc()\r\n\r\n// 로컬 저장소 (항상 활성)\r\nconst indexeddb = new IndexeddbPersistence('my-doc', ydoc)\r\n\r\n// 네트워크 연결 (가능할 때만)\r\nlet wsProvider = null\r\n\r\nindexeddb.on('synced', () => {\r\n  // 로컬 데이터 로드 후 네트워크 연결 시도\r\n  connectWhenOnline()\r\n})\r\n```\r\n\r\n**2. 연결 상태 관리:**\r\n```javascript\r\nfunction connectWhenOnline() {\r\n  if (navigator.onLine) {\r\n    wsProvider = new WebsocketProvider(url, room, ydoc)\r\n\r\n    wsProvider.on('status', ({ status }) => {\r\n      updateConnectionUI(status)\r\n    })\r\n  }\r\n}\r\n\r\n// 온라인 복귀 시 자동 연결\r\nwindow.addEventListener('online', () => {\r\n  if (!wsProvider) {\r\n    connectWhenOnline()\r\n  }\r\n})\r\n\r\nwindow.addEventListener('offline', () => {\r\n  // 오프라인 UI 표시\r\n  showOfflineIndicator()\r\n})\r\n```\r\n\r\n**3. 동기화 흐름:**\r\n```\r\n[오프라인 편집]\r\n     ↓\r\nIndexedDB에 로컬 저장\r\n     ↓\r\n[온라인 복귀]\r\n     ↓\r\nState Vector 교환\r\n     ↓\r\n누락된 업데이트만 전송/수신\r\n     ↓\r\n자동 병합 (CRDT 속성)\r\n     ↓\r\n모든 클라이언트 동일 상태\r\n```\r\n\r\n**4. 충돌 없는 병합:**\r\n```javascript\r\n// 오프라인 동안의 로컬 변경\r\nlocalYtext.insert(0, 'Local edit')\r\n\r\n// 다른 사용자의 변경\r\nremoteYtext.insert(0, 'Remote edit')\r\n\r\n// 온라인 복귀 시 자동 병합\r\n// 결과: \"Local editRemote edit\" 또는 \"Remote editLocal edit\"\r\n// (결정론적으로 모든 클라이언트에서 동일)\r\n```\r\n\r\n**5. 사용자 경험:**\r\n- 오프라인 상태 표시\r\n- 동기화 진행률\r\n- 마지막 동기화 시간",
    "references": [
      {
        "title": "Yjs Offline Support",
        "url": "https://docs.yjs.dev/getting-started/allowing-offline-editing"
      }
    ]
  },
  {
    "id": "CRDT-026",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs에서 스키마 변경(schema evolution)을 처리하는 방식은 무엇인가요?",
    "answer": "Yjs는 스키마리스(schemaless) 특성을 가지지만, 애플리케이션 레벨에서 스키마 진화를 관리해야 합니다.\r\n\r\n**Yjs의 유연성:**\r\n```javascript\r\n// Yjs 자체는 스키마를 강제하지 않음\r\nconst ymap = ydoc.getMap('data')\r\nymap.set('name', 'John')\r\nymap.set('age', 30)\r\nymap.set('newField', 'anything') // 언제든 새 필드 추가 가능\r\n```\r\n\r\n**스키마 버전 관리 패턴:**\r\n\r\n**1. 버전 필드 사용:**\r\n```javascript\r\nconst meta = ydoc.getMap('meta')\r\nmeta.set('schemaVersion', 2)\r\n\r\n// 로드 시 마이그레이션\r\nfunction migrateIfNeeded(ydoc) {\r\n  const version = ydoc.getMap('meta').get('schemaVersion') || 1\r\n\r\n  if (version < 2) {\r\n    migrateV1toV2(ydoc)\r\n  }\r\n}\r\n```\r\n\r\n**2. 점진적 마이그레이션:**\r\n```javascript\r\nfunction migrateV1toV2(ydoc) {\r\n  const users = ydoc.getMap('users')\r\n\r\n  ydoc.transact(() => {\r\n    users.forEach((user, id) => {\r\n      // 기존 'name' → 'firstName', 'lastName' 분리\r\n      if (user.get('name') && !user.get('firstName')) {\r\n        const [first, last] = user.get('name').split(' ')\r\n        user.set('firstName', first)\r\n        user.set('lastName', last || '')\r\n        // 기존 필드는 호환성 위해 유지 가능\r\n      }\r\n    })\r\n  })\r\n}\r\n```\r\n\r\n**3. 기본값 처리:**\r\n```javascript\r\nfunction getUserEmail(ymap) {\r\n  // 새 필드가 없을 경우 기본값\r\n  return ymap.get('email') ?? 'unknown@example.com'\r\n}\r\n```\r\n\r\n**4. 타입 검증 레이어:**\r\n```javascript\r\nimport { z } from 'zod'\r\n\r\nconst UserSchema = z.object({\r\n  firstName: z.string(),\r\n  lastName: z.string(),\r\n  email: z.string().email().optional()\r\n})\r\n\r\nfunction validateUser(ymap) {\r\n  const data = Object.fromEntries(ymap.entries())\r\n  return UserSchema.safeParse(data)\r\n}\r\n```\r\n\r\n**주의사항:**\r\n- 삭제된 필드도 tombstone으로 남음\r\n- 구 버전 클라이언트와의 호환성 고려\r\n- 마이그레이션은 모든 클라이언트에서 동일하게 동작해야 함",
    "references": [
      {
        "title": "Yjs Shared Types",
        "url": "https://docs.yjs.dev/api/shared-types"
      }
    ]
  },
  {
    "id": "CRDT-027",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs의 CRDT 특성(Strong Eventual Consistency)과 함께 문서의 애플리케이션 레벨 데이터 정합성을 보장하기 위한 전략은 무엇인가요?",
    "answer": "Yjs는 CRDT 특성으로 수렴을 보장하지만, 애플리케이션 레벨 정합성은 추가 전략이 필요합니다.\r\n\r\n**CRDT가 보장하는 것:**\r\n- Strong Eventual Consistency: 같은 업데이트 → 같은 상태\r\n- 충돌 없는 병합\r\n- 순서 독립적 적용\r\n\r\n**애플리케이션 레벨 정합성 전략:**\r\n\r\n**1. 트랜잭션 활용:**\r\n```javascript\r\n// 관련 변경을 원자적으로 묶음\r\nydoc.transact(() => {\r\n  const items = ydoc.getArray('items')\r\n  const meta = ydoc.getMap('meta')\r\n\r\n  items.push(['new item'])\r\n  meta.set('itemCount', items.length)\r\n  meta.set('lastModified', Date.now())\r\n})\r\n```\r\n\r\n**2. 유효성 검증:**\r\n```javascript\r\nymap.observe((event) => {\r\n  const data = Object.fromEntries(ymap.entries())\r\n\r\n  if (!isValidState(data)) {\r\n    // 잘못된 상태 복구\r\n    ydoc.transact(() => {\r\n      fixInvalidState(ymap)\r\n    })\r\n  }\r\n})\r\n```\r\n\r\n**3. 서버 측 검증:**\r\n```javascript\r\n// 서버에서 업데이트 검증 후 전파\r\nserver.on('update', (update, client) => {\r\n  const tempDoc = new Y.Doc()\r\n  Y.applyUpdate(tempDoc, baseState)\r\n  Y.applyUpdate(tempDoc, update)\r\n\r\n  if (isValidDocument(tempDoc)) {\r\n    broadcast(update)\r\n  } else {\r\n    rejectUpdate(client)\r\n  }\r\n})\r\n```\r\n\r\n**4. 낙관적 락킹:**\r\n```javascript\r\n// 중요한 리소스에 대한 락\r\nconst locks = ydoc.getMap('locks')\r\n\r\nfunction acquireLock(resourceId, userId) {\r\n  const existing = locks.get(resourceId)\r\n\r\n  if (!existing || existing.userId === userId) {\r\n    locks.set(resourceId, {\r\n      userId,\r\n      timestamp: Date.now()\r\n    })\r\n    return true\r\n  }\r\n  return false\r\n}\r\n```\r\n\r\n**5. 체크섬 기반 검증:**\r\n```javascript\r\n// 주기적으로 문서 상태 검증\r\nfunction verifyDocumentIntegrity(ydoc, serverChecksum) {\r\n  const localState = Y.encodeStateAsUpdate(ydoc)\r\n  const localChecksum = computeChecksum(localState)\r\n\r\n  if (localChecksum !== serverChecksum) {\r\n    // 전체 동기화 트리거\r\n    requestFullSync()\r\n  }\r\n}\r\n```",
    "references": [
      {
        "title": "Yjs Transactions",
        "url": "https://docs.yjs.dev/api/y.doc#transact"
      }
    ]
  },
  {
    "id": "CRDT-028",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs의 YATA(Yet Another Transformation Approach) 기반 업데이트 충돌 해결 알고리즘에 대해 설명해주세요.",
    "answer": "Yjs는 YATA (Yet Another Transformation Approach) 알고리즘을 기반으로 충돌을 해결합니다. YATA는 2016년 Nicolaescu et al.이 발표한 알고리즘으로, 기존 RGA의 한계를 개선했습니다.\r\n\r\n**YATA 알고리즘 핵심:**\r\n\r\n**1. 고유 식별자 (Unique ID):**\r\n```\r\n각 항목 = (clientID, clock)\r\n- clientID: 클라이언트별 고유 53비트 정수 (Yjs에서는 랜덤 생성)\r\n- clock: 해당 클라이언트의 논리적 시계 (Lamport timestamp와 유사)\r\n```\r\n\r\n**2. 위치 참조 (Relative Positioning):**\r\n```\r\n새 항목 삽입 시 절대 위치가 아닌 참조 사용:\r\n- origin (left): 삽입 시점에 왼쪽에 있던 항목의 ID\r\n- rightOrigin (right): 삽입 시점에 오른쪽에 있던 항목의 ID\r\n\r\n이로 인해 동시 편집 시에도 위치가 \"이동\"하지 않음\r\n```\r\n\r\n**3. 삽입 규칙 (Integration Rules):**\r\n동일 위치에 동시 삽입 시 결정론적 순서 결정:\r\n```javascript\r\n// 두 항목 A, B가 같은 origin을 가진 경우\r\nfunction compareItems(A, B) {\r\n  // 규칙 1: origin이 같으면 clientID로 비교\r\n  if (A.origin === B.origin) {\r\n    return A.id.client < B.id.client ? -1 : 1\r\n  }\r\n  // 규칙 2: origin이 다르면 origin의 위치로 결정\r\n  // (더 복잡한 규칙이 있지만 핵심은 결정론적 순서)\r\n}\r\n```\r\n\r\n**4. 삭제 처리 (Tombstones):**\r\n```javascript\r\n// 삭제는 tombstone으로 마킹 (실제 제거 X)\r\nitem.deleted = true\r\nitem.content = null  // 메모리 절약\r\n\r\n// 왜 즉시 삭제하지 않는가?\r\n// - 다른 클라이언트의 삽입이 삭제된 항목을 참조할 수 있음\r\n// - origin/rightOrigin 참조 무결성 유지\r\n// - GC는 모든 클라이언트가 삭제를 확인한 후에만 안전\r\n```\r\n\r\n**인터리빙 문제와 해결:**\r\n\r\n```\r\n문제 상황 (RGA에서 발생):\r\nUser A: \"\" → \"AB\" (A 삽입, B 삽입)\r\nUser B: \"\" → \"CD\" (C 삽입, D 삽입)\r\nRGA 결과: \"CADB\" 또는 \"ACBD\" (인터리빙!)\r\n\r\nYATA 해결:\r\n- rightOrigin도 함께 저장\r\n- 삽입 시 오른쪽 컨텍스트도 고려\r\n- 결과: \"ABCD\" 또는 \"CDAB\" (단어 단위 유지)\r\n```\r\n\r\n**예시 시나리오:**\r\n\r\n```\r\n초기 상태: \"AC\"\r\n\r\nUser 1 (clientID: 1): \"A\" 뒤에 \"B\" 삽입 → \"ABC\"\r\n  - origin: A의 ID\r\n  - rightOrigin: C의 ID\r\n\r\nUser 2 (clientID: 2): \"A\" 뒤에 \"X\" 삽입 → \"AXC\"\r\n  - origin: A의 ID\r\n  - rightOrigin: C의 ID\r\n\r\n동기화 후:\r\n- 둘 다 같은 origin과 rightOrigin\r\n- clientID 1 < 2 이므로 \"B\"가 \"X\" 앞\r\n- 최종: \"ABXC\"\r\n\r\n모든 클라이언트에서 동일한 결과!\r\n```\r\n\r\n**YATA vs 다른 알고리즘:**\r\n\r\n| 알고리즘 | 인터리빙 | 복잡도 | 메타데이터 |\r\n|---------|---------|--------|-----------|\r\n| RGA | 발생 가능 | O(n) | ID만 |\r\n| WOOT | 해결 | O(n²) | 많음 |\r\n| Logoot/LSEQ | 발생 가능 | O(log n) | 가변 ID |\r\n| YATA | 최소화 | O(n) 최악, 평균 O(1) | origin + rightOrigin |\r\n\r\n**장점:**\r\n- 인터리빙 문제 최소화 (사용자 의도 보존)\r\n- 실제 협업 패턴에서 O(1)에 가까운 성능\r\n- 효율적인 메모리 사용\r\n- 가비지 컬렉션 지원",
    "references": [
      {
        "title": "YATA Paper",
        "url": "https://www.researchgate.net/publication/310212186_Near_Real-Time_Peer-to-Peer_Shared_Editing_on_Extensible_Data_Types"
      },
      {
        "title": "Yjs Internals",
        "url": "https://docs.yjs.dev/api/internals"
      }
    ]
  },
  {
    "id": "CRDT-029",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "확장성, 모니터링, 백업 등 Yjs를 실제 프로덕션 환경에 적용할 때 고려해야 할 주요 이슈는 무엇인가요?",
    "answer": "프로덕션 환경에서 Yjs를 운영하려면 여러 측면을 고려해야 합니다.\r\n\r\n**1. 확장성 (Scalability):**\r\n\r\n```javascript\r\n// 수평 확장을 위한 Redis 기반 동기화\r\nimport { RedisAdapter } from 'y-redis'\r\n\r\n// 여러 서버 인스턴스 간 문서 동기화\r\nconst adapter = new RedisAdapter(redisClient, {\r\n  channel: 'yjs-documents'\r\n})\r\n```\r\n\r\n**2. 모니터링:**\r\n```javascript\r\n// 문서 크기 추적\r\nfunction monitorDocument(ydoc, docId) {\r\n  setInterval(() => {\r\n    const size = Y.encodeStateAsUpdate(ydoc).byteLength\r\n    metrics.gauge('yjs_doc_size', size, { docId })\r\n  }, 60000)\r\n}\r\n\r\n// 연결 수 추적\r\nprovider.on('status', ({ status }) => {\r\n  metrics.counter('yjs_connections', { status })\r\n})\r\n```\r\n\r\n**3. 에러 처리:**\r\n```javascript\r\ntry {\r\n  Y.applyUpdate(ydoc, update)\r\n} catch (error) {\r\n  logger.error('Failed to apply update', { error })\r\n  // 잘못된 업데이트 무시 또는 재동기화 요청\r\n  requestResync()\r\n}\r\n```\r\n\r\n**4. 백업 및 복구:**\r\n```javascript\r\n// 정기적 스냅샷 저장\r\nasync function backupDocument(docId, ydoc) {\r\n  const state = Y.encodeStateAsUpdate(ydoc)\r\n  await s3.putObject({\r\n    Bucket: 'yjs-backups',\r\n    Key: `${docId}/${Date.now()}.yjs`,\r\n    Body: state\r\n  })\r\n}\r\n\r\n// 복구\r\nasync function restoreDocument(docId, timestamp) {\r\n  const data = await s3.getObject({ /* ... */ })\r\n  const ydoc = new Y.Doc()\r\n  Y.applyUpdate(ydoc, data.Body)\r\n  return ydoc\r\n}\r\n```\r\n\r\n**5. 보안:**\r\n```javascript\r\n// 연결 시 인증\r\nwss.on('connection', async (ws, req) => {\r\n  const token = req.headers.authorization\r\n\r\n  if (!await validateToken(token)) {\r\n    ws.close(4001, 'Unauthorized')\r\n    return\r\n  }\r\n\r\n  // 문서별 권한 확인\r\n  const docId = extractDocId(req)\r\n  if (!await hasAccess(token, docId)) {\r\n    ws.close(4003, 'Forbidden')\r\n    return\r\n  }\r\n})\r\n```\r\n\r\n**6. 성능 최적화:**\r\n- 문서 분할 (Subdocuments)\r\n- 연결 풀링\r\n- 로드 밸런싱\r\n\r\n**7. 버전 관리:**\r\n- 클라이언트/서버 Yjs 버전 호환성\r\n- 점진적 업그레이드 전략",
    "references": [
      {
        "title": "Yjs Production Tips",
        "url": "https://docs.yjs.dev/"
      }
    ]
  },
  {
    "id": "CRDT-030",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "Yjs를 활용한 협업 시스템에서 인증, 인가, 암호화 등 보안 및 접근 제어를 구현하는 방법은 무엇인가요?",
    "answer": "Yjs 자체는 보안 기능을 제공하지 않으므로, 애플리케이션 레벨에서 구현해야 합니다.\r\n\r\n**1. 인증 (Authentication):**\r\n\r\n```javascript\r\n// WebSocket 연결 시 토큰 검증\r\nimport { WebsocketProvider } from 'y-websocket'\r\n\r\nconst provider = new WebsocketProvider(\r\n  'wss://server.com',\r\n  'doc-room',\r\n  ydoc,\r\n  {\r\n    params: {\r\n      auth: jwt.sign({ userId, docId }, secret)\r\n    }\r\n  }\r\n)\r\n\r\n// 서버 측\r\nwss.on('connection', (ws, req) => {\r\n  const token = url.parse(req.url, true).query.auth\r\n\r\n  try {\r\n    const { userId, docId } = jwt.verify(token, secret)\r\n    setupConnection(ws, userId, docId)\r\n  } catch {\r\n    ws.close(4001, 'Invalid token')\r\n  }\r\n})\r\n```\r\n\r\n**2. 권한 부여 (Authorization):**\r\n\r\n```javascript\r\n// 문서별 권한 확인\r\nasync function checkPermission(userId, docId, action) {\r\n  const permission = await db.getPermission(userId, docId)\r\n\r\n  return {\r\n    read: permission.level >= 'viewer',\r\n    write: permission.level >= 'editor',\r\n    admin: permission.level === 'owner'\r\n  }[action]\r\n}\r\n\r\n// 업데이트 필터링\r\nserver.on('update', async (update, userId, docId) => {\r\n  if (!await checkPermission(userId, docId, 'write')) {\r\n    return // 업데이트 거부\r\n  }\r\n\r\n  broadcast(update, docId)\r\n})\r\n```\r\n\r\n**3. 전송 암호화:**\r\n\r\n```javascript\r\n// y-webrtc에서 암호화 사용\r\nimport { WebrtcProvider } from 'y-webrtc'\r\n\r\nconst provider = new WebrtcProvider('room', ydoc, {\r\n  password: 'shared-secret-key'\r\n  // 모든 메시지가 암호화됨\r\n})\r\n\r\n// 또는 TLS/WSS 사용 (기본 권장)\r\nconst provider = new WebsocketProvider(\r\n  'wss://secure-server.com',  // TLS 적용\r\n  'room',\r\n  ydoc\r\n)\r\n```\r\n\r\n**4. 데이터 검증:**\r\n\r\n```javascript\r\n// 서버에서 업데이트 내용 검증\r\nfunction validateUpdate(update, userId) {\r\n  const tempDoc = new Y.Doc()\r\n  Y.applyUpdate(tempDoc, currentState)\r\n  Y.applyUpdate(tempDoc, update)\r\n\r\n  // 비즈니스 규칙 검증\r\n  const data = tempDoc.getMap('data').toJSON()\r\n\r\n  if (data.adminOnly && !isAdmin(userId)) {\r\n    throw new Error('Unauthorized modification')\r\n  }\r\n\r\n  return true\r\n}\r\n```\r\n\r\n**5. Rate Limiting:**\r\n\r\n```javascript\r\nconst rateLimit = new Map()\r\n\r\nfunction checkRateLimit(userId) {\r\n  const now = Date.now()\r\n  const userLimit = rateLimit.get(userId) || { count: 0, reset: now }\r\n\r\n  if (now > userLimit.reset) {\r\n    userLimit.count = 0\r\n    userLimit.reset = now + 60000 // 1분\r\n  }\r\n\r\n  if (++userLimit.count > 100) {\r\n    throw new Error('Rate limit exceeded')\r\n  }\r\n\r\n  rateLimit.set(userId, userLimit)\r\n}\r\n```\r\n\r\n**6. 감사 로깅:**\r\n\r\n```javascript\r\nydoc.on('update', (update, origin) => {\r\n  auditLog.write({\r\n    timestamp: Date.now(),\r\n    docId,\r\n    userId: origin?.userId,\r\n    updateSize: update.byteLength\r\n  })\r\n})\r\n```",
    "references": [
      {
        "title": "y-websocket Security",
        "url": "https://github.com/yjs/y-websocket"
      },
      {
        "title": "y-protocols Auth",
        "url": "https://github.com/yjs/y-protocols"
      }
    ]
  },
  {
    "id": "SD-001",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "메시지(Message)와 이벤트(Event)의 근본적인 차이점은 무엇인가요?",
    "answer": "**메시지**는 특정 수신자에게 전달되는 데이터로, 발신자가 수신자를 알고 직접 통신합니다. **이벤트**는 시스템에서 발생한 사실이며, 발신자는 누가 구독하는지 모릅니다.\r\n\r\n- **메시지**: Point-to-Point, 수신자 지정, 명령(Command) 성격\r\n- **이벤트**: Publish-Subscribe, 수신자 미지정, 사실(Fact) 성격",
    "references": [
      {
        "title": "Enterprise Integration Patterns",
        "url": "https://www.enterpriseintegrationpatterns.com/patterns/messaging/"
      }
    ]
  },
  {
    "id": "SD-002",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "분산 시스템에서 메시지(Message)와 이벤트(Event)를 비교할 때, \"메시지는 '지시(Command)'이고 이벤트는 '사실(Fact)'이다\"라는 말의 의미를 설명해 보세요.",
    "answer": "**Command**: \"이것을 해라\"라는 지시. 실패/거부 가능. 예: `CreateOrder`\r\n\r\n**Event**: \"이것이 일어났다\"라는 과거 사실. 불변. 예: `OrderCreated`\r\n\r\n이 구분은 시스템의 결합도와 책임 분리에 영향을 줍니다.",
    "references": [
      {
        "title": "Microsoft EDA",
        "url": "https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven"
      }
    ]
  },
  {
    "id": "SD-003",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "메시지 큐(RabbitMQ, SQS)와 이벤트 브로커/스트림(Kafka)의 차이점은 무엇이며, 어떤 상황에서 각각을 선택해야 할까요?",
    "answer": "**메시지 큐 (RabbitMQ, SQS)**:\r\n- 작업 분배, Point-to-Point, 소비 후 삭제\r\n- 적합: 작업 큐, 비동기 태스크 처리\r\n\r\n**이벤트 스트림 (Kafka)**:\r\n- 다중 구독자, 이벤트 재처리(replay), 순서 보장, 로그 보존\r\n- 적합: 이벤트 소싱, 실시간 스트리밍, 감사 로그\r\n\r\n**트레이드오프**:\r\n| 기준 | 메시지 큐 | 이벤트 스트림 |\r\n|------|-----------|---------------|\r\n| 재처리 | 어려움 | 용이 (오프셋 리셋) |\r\n| 운영 복잡도 | 낮음 | 높음 |\r\n| 확장성 | 수직 위주 | 수평 확장 용이 |\r\n| 순서 보장 | 제한적 | 파티션 내 보장 |",
    "references": [
      {
        "title": "Kafka Documentation",
        "url": "https://kafka.apache.org/documentation/"
      }
    ]
  },
  {
    "id": "SD-004",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "이벤트 기반 시스템에서 '발신자(Publisher)'가 '수신자(Subscriber)'를 모르는 느슨한 결합이 시스템 설계에 주는 이점과 단점은 무엇인가요?",
    "answer": "**이점**:\r\n- 느슨한 결합: 서비스 독립적 배포 가능\r\n- 확장성 향상: 구독자 추가/제거가 발신자에 영향 없음\r\n- 유연성: 새로운 기능을 기존 코드 수정 없이 추가\r\n\r\n**단점**:\r\n- 디버깅 어려움: 분산 트레이싱 필요 (Jaeger, Zipkin)\r\n- 이벤트 흐름 추적 복잡: 이벤트 카탈로그/문서화 필요\r\n- 최종 일관성: 강한 일관성 필요 시 부적합\r\n- 이벤트 순서 보장 어려움\r\n\r\n**대규모 시스템 고려사항**:\r\n- Dead Letter Queue로 이벤트 유실 방지\r\n- 멱등성 보장으로 중복 처리 대응\r\n- 모니터링 및 알람 체계 구축",
    "references": [
      {
        "title": "Microsoft EDA Guide",
        "url": "https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven"
      }
    ]
  },
  {
    "id": "SD-005",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "이벤트 드리븐 아키텍처(EDA)란 무엇이며, 기존의 요청-응답(Request-Response) 모델과 무엇이 다른가요?",
    "answer": "**EDA**: 이벤트 발생 시 반응하는 비동기 아키텍처. 서비스들이 이벤트를 발행/구독.\r\n\r\n**Request-Response**: 동기식. 호출자가 응답을 기다림. 강한 결합.\r\n\r\n**차이점**: EDA는 비동기, 느슨한 결합, 확장성 우수. Request-Response는 즉각적 응답, 단순한 흐름.",
    "references": [
      {
        "title": "AWS Event-Driven Architecture",
        "url": "https://aws.amazon.com/event-driven-architecture/"
      }
    ]
  },
  {
    "id": "SD-006",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "이벤트 드리븐 아키텍처(EDA)를 도입했을 때 얻을 수 있는 가장 큰 장점 3가지와 가장 큰 단점 3가지는 무엇인가요?",
    "answer": "**장점**:\r\n1. 느슨한 결합 - 서비스 독립성\r\n2. 확장성 - 이벤트 기반 스케일링\r\n3. 실시간 반응 - 즉각적인 이벤트 처리\r\n\r\n**단점**:\r\n1. 복잡성 - 이벤트 흐름 추적 어려움\r\n2. 최종 일관성 - 강한 일관성 보장 어려움\r\n3. 디버깅 - 분산 트레이싱 필요",
    "references": [
      {
        "title": "Martin Fowler - Event-Driven",
        "url": "https://martinfowler.com/articles/201701-event-driven.html"
      }
    ]
  },
  {
    "id": "SD-007",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "EDA에서 서비스 간의 데이터 흐름을 관리하는 두 가지 방식인 Choreography(분산적 이벤트 반응)와 Orchestration(중앙 제어)을 비교 설명해 주세요.",
    "answer": "**Choreography**: 각 서비스가 이벤트에 반응하여 독립적으로 동작. 중앙 제어 없음. 분산적.\r\n\r\n**Orchestration**: 중앙 오케스트레이터가 전체 흐름을 제어. 명시적인 워크플로우.\r\n\r\n| 비교 | Choreography | Orchestration |\r\n|------|--------------|---------------|\r\n| 결합도 | 낮음 | 높음 |\r\n| 가시성 | 낮음 | 높음 |\r\n| 복잡도 | 서비스 증가시 복잡 | 오케스트레이터에 집중 |",
    "references": [
      {
        "title": "Microservices.io - Saga",
        "url": "https://microservices.io/patterns/data/saga.html"
      }
    ]
  },
  {
    "id": "SD-008",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "이벤트 브로커(예: Kafka, RabbitMQ)가 다운되면 전체 시스템이 마비될 수 있습니다. 이 SPOF(Single Point of Failure) 문제를 어떻게 해결할 수 있을까요?",
    "answer": "**인프라 측면**:\r\n1. **클러스터링**: 다중 브로커 노드 구성\r\n2. **레플리케이션**: 파티션 복제 (replication factor >= 3 권장)\r\n3. **다중 데이터센터**: 지역 간 복제 (MirrorMaker 2)\r\n\r\n**클라이언트 측면**:\r\n4. **Circuit Breaker**: 브로커 장애 시 폴백\r\n5. **재시도 로직**: exponential backoff\r\n6. **로컬 버퍼링**: 일시적 장애 시 메시지 임시 저장\r\n\r\n**트레이드오프**:\r\n- 복제 수 증가 → 내구성 향상, 쓰기 지연 증가\r\n- 다중 DC → 가용성 향상, 운영 복잡도 및 비용 증가",
    "references": [
      {
        "title": "Kafka Replication",
        "url": "https://kafka.apache.org/documentation/#replication"
      }
    ]
  },
  {
    "id": "SD-009",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "메시지/이벤트 전송 보장 레벨인 'At-least-once', 'At-most-once', 'Exactly-once'의 차이점은 무엇인가요?",
    "answer": "**At-most-once**:\r\n- 최대 한 번 전송. 유실 가능, 중복 없음\r\n- 구현: ACK 없이 전송 (fire-and-forget)\r\n- 적합: 메트릭, 로그 등 유실 허용 가능한 경우\r\n\r\n**At-least-once** (가장 일반적):\r\n- 최소 한 번 전송. 유실 없음, 중복 가능\r\n- 구현: 전송 후 ACK 대기, 실패 시 재전송\r\n- 적합: 멱등한 처리가 가능한 대부분의 경우\r\n\r\n**Exactly-once**:\r\n- 정확히 한 번. 유실/중복 없음\r\n- 주의: **진정한 Exactly-once는 분산 시스템에서 이론적으로 불가능**\r\n- 실제 구현: At-least-once + 멱등성 = \"Effectively Once\"\r\n\r\n**트레이드오프**:\r\n| 보장 수준 | 성능 | 복잡도 | 데이터 정확성 |\r\n|-----------|------|--------|---------------|\r\n| At-most-once | 높음 | 낮음 | 낮음 |\r\n| At-least-once | 중간 | 중간 | 높음 (멱등성 필요) |\r\n| Exactly-once | 낮음 | 높음 | 최고 |",
    "references": [
      {
        "title": "Kafka Semantics",
        "url": "https://kafka.apache.org/documentation/#semantics"
      }
    ]
  },
  {
    "id": "SD-010",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "EDA에서 At-least-once와 달리 'Exactly-once'를 구현하기 어려운 이유는 무엇이며, 이를 위해 어떤 기술(예: Idempotency)이 필요한가요?",
    "answer": "**어려운 이유** (Two Generals' Problem):\r\n- 네트워크 장애로 ACK 유실 시 송신자는 수신 여부 알 수 없음\r\n- 프로세스 크래시 시 처리 완료 여부 불명확\r\n- 분산 환경에서 \"정확히 한 번\" 자체의 정의가 모호\r\n\r\n**핵심 통찰**:\r\n진정한 Exactly-once는 불가능. 실제로는 **At-least-once + 멱등성 = \"Effectively Once\"**로 구현\r\n\r\n**해결 기술**:\r\n1. **Idempotency**: 동일 요청을 여러 번 처리해도 같은 결과\r\n2. **Deduplication**: 메시지 ID로 중복 체크 (TTL 고려 필요)\r\n3. **Transactional Outbox**: DB와 이벤트 발행을 원자적으로 처리\r\n\r\n**함정 주의**:\r\nKafka의 \"Exactly-once\"는 **Kafka 내부 처리**에만 해당. 외부 시스템(DB, API 등)과 연동 시 여전히 멱등성 필수",
    "references": [
      {
        "title": "Kafka Exactly-Once",
        "url": "https://www.confluent.io/blog/exactly-once-semantics-are-possible-heres-how-apache-kafka-does-it/"
      }
    ]
  },
  {
    "id": "SD-011",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "이벤트 스키마(Event Schema) 관리는 왜 중요한가요? 스키마가 변경될 때 하위 호환성을 어떻게 보장할 수 있을까요?",
    "answer": "**중요성**:\r\n- 프로듀서/컨슈머 간 계약 역할\r\n- 스키마 불일치 시 파싱 오류 및 서비스 장애\r\n- 독립적 배포를 위한 필수 요소\r\n\r\n**호환성 유형**:\r\n- **Backward**: 새 스키마로 이전 데이터 읽기 가능\r\n- **Forward**: 이전 스키마로 새 데이터 읽기 가능\r\n- **Full**: 양방향 호환\r\n\r\n**하위 호환성 보장 규칙**:\r\n1. 새 필드는 optional 또는 default 값 필수\r\n2. 기존 필수 필드 삭제 금지\r\n3. 필드 타입 변경 금지\r\n\r\n**실무 권장**:\r\n- Schema Registry 사용 (Confluent, AWS Glue)\r\n- 직렬화: Avro, Protobuf (JSON은 검증 약함)\r\n- CI/CD에 스키마 호환성 검사 통합",
    "references": [
      {
        "title": "Confluent Schema Registry",
        "url": "https://docs.confluent.io/platform/current/schema-registry/"
      }
    ]
  },
  {
    "id": "SD-012",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "이벤트가 불변성(Immutability)을 가져야 하는 이유는 무엇인가요?",
    "answer": "1. **신뢰성**: 이미 발생한 사실은 변경 불가\r\n2. **재처리**: 이벤트 replay 시 일관된 결과\r\n3. **감사 로그**: 완전한 히스토리 보존\r\n4. **동시성**: 불변 데이터는 락 불필요",
    "references": [
      {
        "title": "Event Sourcing - Martin Fowler",
        "url": "https://martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "SD-013",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "이벤트 소싱이나 EDA에서 이벤트는 불변(immutable)해야 한다는 원칙이 있습니다. 이 불변성 원칙을 지키면서, 과거에 발생한 이벤트 데이터의 오류를 어떻게 수정(또는 보정)해야 할까요?",
    "answer": "**보정 이벤트(Compensating Event)** 발행:\r\n- 기존 이벤트는 그대로 유지\r\n- 새로운 \"수정\" 이벤트 발행 (예: `OrderAmountCorrected`)\r\n- 현재 상태는 모든 이벤트 적용 결과로 계산",
    "references": [
      {
        "title": "Event Sourcing Pattern",
        "url": "https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing"
      }
    ]
  },
  {
    "id": "SD-014",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "분산 트랜잭션(Distributed Transaction)이 무엇인지, 그리고 왜 필요한지 설명해 주세요.",
    "answer": "**정의**: 여러 서비스/DB에 걸친 트랜잭션을 원자적으로 처리하는 것\r\n\r\n**필요성**: MSA에서 하나의 비즈니스 로직이 여러 서비스에 분산되어 있을 때, 전체의 일관성을 보장하기 위해 필요",
    "references": [
      {
        "title": "Microservices.io - Distributed Transactions",
        "url": "https://microservices.io/patterns/data/saga.html"
      }
    ]
  },
  {
    "id": "SD-015",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "분산 트랜잭션의 전통적인 해결 방법인 2PC(Two-Phase Commit) 프로토콜에 대해 설명해 주세요.",
    "answer": "**Phase 1 (Prepare)**: 코디네이터가 모든 참여자에게 커밋 준비 요청. 참여자는 준비 완료/실패 응답.\r\n\r\n**Phase 2 (Commit/Rollback)**: 모두 준비 완료 시 커밋, 하나라도 실패 시 전체 롤백",
    "references": [
      {
        "title": "2PC Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Two-phase_commit_protocol"
      }
    ]
  },
  {
    "id": "SD-016",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "2PC(Two-Phase Commit)의 가장 큰 단점(예: 코디네이터 장애, 블로킹)은 무엇이며, 이 때문에 실제 환경에서 잘 사용되지 않는 이유는 무엇인가요?",
    "answer": "**단점**:\r\n1. **블로킹**: Prepare 후 Commit 전까지 참여자가 락 유지 (자원 점유)\r\n2. **SPOF**: 코디네이터 장애 시 참여자가 무한 대기 (In-doubt 상태)\r\n3. **성능**: 동기식 통신 + 여러 번의 네트워크 왕복으로 지연\r\n4. **확장성 제한**: 참여자 증가 시 성능 저하\r\n\r\n**실제 환경에서 잘 사용되지 않는 이유**:\r\n- MSA 환경에서 서비스 간 강한 결합 유발\r\n- 클라우드 네이티브 환경의 일시적 장애에 취약\r\n- 네트워크 파티션 발생 시 복구 어려움\r\n\r\n**사용되는 경우**:\r\n- 동일 DB 내 XA 트랜잭션 (MySQL, PostgreSQL)\r\n- 단일 데이터센터의 신뢰할 수 있는 내부 시스템\r\n\r\n**대안**: SAGA, TCC (Try-Confirm-Cancel), Outbox 패턴",
    "references": [
      {
        "title": "Designing Data-Intensive Applications",
        "url": "https://dataintensive.net/"
      }
    ]
  },
  {
    "id": "SD-017",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "2PC의 블로킹 문제를 해결하기 위한 대안으로 등장한 SAGA 패턴이 무엇인지, 그리고 2PC와 어떻게 다른지 설명해 주세요.",
    "answer": "**SAGA**: 로컬 트랜잭션의 시퀀스. 각 단계 실패 시 보상 트랜잭션으로 롤백.\r\n\r\n**2PC와의 차이**:\r\n| 비교 | 2PC | SAGA |\r\n|------|-----|------|\r\n| 일관성 | 강한 일관성 | 최종 일관성 |\r\n| 락 | 글로벌 락 | 로컬 락 |\r\n| 가용성 | 낮음 | 높음 |",
    "references": [
      {
        "title": "Microservices.io - Saga",
        "url": "https://microservices.io/patterns/data/saga.html"
      }
    ]
  },
  {
    "id": "SD-018",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "SAGA 패턴의 핵심 구성요소인 '보상 트랜잭션(Compensating Transaction)'이란 무엇이며, 이를 설계할 때 가장 중요하게 고려해야 할 점은 무엇인가요?",
    "answer": "**정의**: 이전 트랜잭션의 효과를 **의미적으로** 취소하는 트랜잭션\r\n\r\n**핵심 이해**: 보상 트랜잭션은 물리적 롤백이 아님\r\n- 결제 취소 = 환불 처리 (새로운 트랜잭션)\r\n- 재고 차감 취소 = 재고 복구 (새로운 트랜잭션)\r\n\r\n**설계 고려사항**:\r\n1. **멱등성 필수**: 보상 트랜잭션도 재시도될 수 있음\r\n2. **의미적 가역성**: 취소 불가능한 작업은 별도 설계 (예: 이메일 발송 → 취소 이메일 발송)\r\n3. **역순 실행**: 마지막 성공 단계부터 역순으로\r\n4. **타임아웃**: 보상 트랜잭션에도 타임아웃 설정\r\n\r\n**함정 주의**:\r\n- 외부 시스템(결제 게이트웨이, SMS 등)의 보상은 별도 설계 필요\r\n- 보상 실패 시 수동 개입 프로세스 필수",
    "references": [
      {
        "title": "AWS SAGA Pattern",
        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/saga-pattern.html"
      }
    ]
  },
  {
    "id": "SD-019",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "SAGA 패턴에서 보상 트랜잭션(Compensating Transaction) 자체가 실패하면 어떻게 해야 하나요?",
    "answer": "**단계적 접근** (권장 순서):\r\n\r\n1. **재시도 (Retry)**:\r\n   - 지수 백오프(exponential backoff) + 지터(jitter)\r\n   - 최대 재시도 횟수 제한 (예: 5회)\r\n\r\n2. **Dead Letter Queue (DLQ)**:\r\n   - 재시도 실패한 보상 작업 저장\r\n   - 분석을 위한 충분한 컨텍스트 포함\r\n\r\n3. **수동 개입 (Human Intervention)**:\r\n   - 운영자 알림 (PagerDuty, Slack 등)\r\n   - 관리자 대시보드를 통한 수동 처리\r\n\r\n4. **Forward Recovery** (고급):\r\n   - 롤백 대신 앞으로 진행하여 일관성 복구\r\n   - 예: 재고 복구 실패 → 다음 입고 시 자동 조정\r\n\r\n**대규모 시스템 고려사항**:\r\n- SAGA 상태 영구 저장 (장애 복구용)\r\n- 보상 실패율 모니터링 및 알람",
    "references": [
      {
        "title": "Microservices Patterns - Chris Richardson",
        "url": "https://microservices.io/book"
      }
    ]
  },
  {
    "id": "SD-020",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "SAGA 패턴에서 발생하는 '중간 상태(intermediate state)'란 무엇을 의미하나요?",
    "answer": "**정의**: SAGA 진행 중 일부 서비스는 커밋되고 일부는 아직 처리 중인 상태\r\n\r\n**예시**: 주문 서비스는 주문 생성 완료, 결제 서비스는 아직 처리 중\r\n\r\n**특징**: 외부에서 볼 때 일관성이 깨진 것처럼 보임",
    "references": [
      {
        "title": "SAGA Pattern",
        "url": "https://microservices.io/patterns/data/saga.html"
      }
    ]
  },
  {
    "id": "SD-021",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "SAGA 패턴의 '중간 상태(Pending State)'가 비즈니스 로직이나 사용자 경험(UX)에 어떤 문제를 일으킬 수 있으며, 이를 어떻게 처리해야 할까요?",
    "answer": "**문제**:\r\n- 사용자 혼란 (주문은 됐는데 결제 상태 불명)\r\n- 잘못된 데이터 조회\r\n\r\n**해결책**:\r\n1. **상태 표시**: \"처리 중\" 상태 명시\r\n2. **Semantic Lock**: 리소스를 \"예약\" 상태로 표시\r\n3. **읽기 격리**: 완료된 SAGA만 조회 가능",
    "references": [
      {
        "title": "Chris Richardson - Managing Data Consistency",
        "url": "https://chrisrichardson.net/post/microservices/2019/07/09/developing-sagas-part-1.html"
      }
    ]
  },
  {
    "id": "SD-022",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "SAGA 패턴을 구현하는 두 가지 방식인 'Choreography(이벤트 기반 분산)'와 'Orchestration(중앙 조율자)'을 비교 설명하고, 각각의 장단점을 논해주세요.",
    "answer": "**Choreography** (분산 이벤트 기반):\r\n- 각 서비스가 이벤트를 발행하고 다른 서비스의 이벤트에 반응\r\n- 중앙 조율자 없음, 자율적 협력\r\n\r\n**Orchestration** (중앙 조율자 기반):\r\n- 중앙 오케스트레이터가 SAGA 전체 흐름 제어\r\n- 순차적/병렬 호출, 결과에 따라 다음 단계 결정\r\n\r\n| 비교 | Choreography | Orchestration |\r\n|------|--------------|---------------|\r\n| **장점** | 느슨한 결합, 단순한 서비스 | 명확한 흐름, 디버깅 용이 |\r\n| **단점** | 흐름 파악 어려움, 순환 의존성 위험 | 오케스트레이터 복잡도 증가 |\r\n| **확장** | 새 서비스 추가 용이 | 오케스트레이터 수정 필요 |\r\n| **테스트** | 통합 테스트 어려움 | 단위 테스트 용이 |\r\n| **적합** | 2-4단계 단순 흐름 | 5단계 이상, 조건부 분기 |\r\n\r\n**실무 권장**:\r\n- 시작은 Choreography로 단순하게\r\n- 복잡해지면 Orchestration으로 전환 고려\r\n- 도메인별로 하이브리드 적용 가능",
    "references": [
      {
        "title": "Microservices.io - SAGA",
        "url": "https://microservices.io/patterns/data/saga.html"
      }
    ]
  },
  {
    "id": "SD-023",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "이벤트 소싱(Event Sourcing) 패턴이 무엇인지 설명해 주세요.",
    "answer": "**정의**: 상태를 직접 저장하지 않고, 상태 변경 이벤트를 순서대로 저장하는 패턴\r\n\r\n**특징**:\r\n- 모든 변경 히스토리 보존\r\n- 현재 상태 = 이벤트 순차 적용 결과\r\n- 감사 로그 자동 생성",
    "references": [
      {
        "title": "Martin Fowler - Event Sourcing",
        "url": "https://martinfowler.com/eaaDev/EventSourcing.html"
      }
    ]
  },
  {
    "id": "SD-024",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "이벤트 소싱(Event Sourcing)에서 저장된 이벤트 스트림으로부터 '현재 상태(Current State)'는 어떻게 계산하나요?",
    "answer": "**방법**: 해당 엔티티의 모든 이벤트를 처음부터 순서대로 재생(replay)하여 현재 상태 계산\r\n\r\n```\r\n초기상태 + Event1 + Event2 + ... + EventN = 현재상태\r\n```\r\n\r\n**최적화**: 스냅샷을 주기적으로 저장하여 전체 재생 방지",
    "references": [
      {
        "title": "Event Store Documentation",
        "url": "https://www.eventstore.com/event-sourcing"
      }
    ]
  },
  {
    "id": "SD-025",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "이벤트 소싱(Event Sourcing)을 사용하면 얻을 수 있는 장점(예: 감사 로그, 시간 여행)은 무엇인가요?",
    "answer": "1. **완전한 감사 로그**: 모든 변경 이력 보존\r\n2. **시간 여행**: 특정 시점의 상태 재구성\r\n3. **디버깅**: 문제 발생 시점 추적 용이\r\n4. **이벤트 재처리**: 새로운 뷰 생성 가능\r\n5. **버그 수정**: 과거 이벤트 재처리로 데이터 복구",
    "references": [
      {
        "title": "Microsoft Event Sourcing",
        "url": "https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing"
      }
    ]
  },
  {
    "id": "SD-026",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "이벤트 소싱에서 이벤트가 누적될수록 '현재 상태'를 재구성하는 데 발생하는 성능 문제를 어떻게 해결할 수 있나요?",
    "answer": "**스냅샷(Snapshot)**: 특정 시점의 상태를 저장\r\n\r\n**동작**: 스냅샷 이후 이벤트만 재생하여 현재 상태 계산\r\n\r\n```\r\n스냅샷(시점 N) + Event(N+1) + ... = 현재상태\r\n```",
    "references": [
      {
        "title": "Event Sourcing Snapshots",
        "url": "https://www.eventstore.com/blog/snapshots-in-event-sourcing"
      }
    ]
  },
  {
    "id": "SD-027",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "이벤트 소싱의 성능 최적화를 위한 스냅샷(Snapshot) 생성 주기(frequency)는 어떻게 결정하는 것이 좋을까요?",
    "answer": "**결정 기준**:\r\n1. **이벤트 수 기반**: N개 이벤트마다 (예: 100-1000개)\r\n2. **시간 기반**: 주기적 (예: 매시간, 매일)\r\n3. **성능 기반**: 재생 시간이 SLA 임계치 초과 시\r\n\r\n**트레이드오프**:\r\n| 스냅샷 빈도 | 저장 공간 | 읽기 성능 | 쓰기 부하 |\r\n|------------|-----------|-----------|-----------|\r\n| 높음 | 많음 | 빠름 | 높음 |\r\n| 낮음 | 적음 | 느림 | 낮음 |\r\n\r\n**실무 권장**:\r\n- SLA 기준 역산: 목표 응답시간 내 재생 가능한 이벤트 수 계산\r\n- 백그라운드에서 비동기로 스냅샷 생성",
    "references": [
      {
        "title": "Axon Framework - Snapshotting",
        "url": "https://docs.axoniq.io/reference-guide/axon-framework/tuning/event-snapshots"
      }
    ]
  },
  {
    "id": "SD-028",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "서비스 로직에서 'DB 트랜잭션'과 '이벤트 발행'을 원자적으로 묶고 싶을 때(Dual-write 문제) 어떻게 해야 할까요?",
    "answer": "**Dual-write 문제**: DB 저장 성공 후 이벤트 발행 실패 시 불일치\r\n\r\n**해결책**:\r\n1. **Transactional Outbox**: 같은 트랜잭션에서 Outbox 테이블에 이벤트 저장\r\n2. **Event Sourcing**: 이벤트 자체가 원본 데이터\r\n3. **CDC (Change Data Capture)**: DB 변경을 캡처하여 이벤트 발행",
    "references": [
      {
        "title": "Microservices.io - Transactional Outbox",
        "url": "https://microservices.io/patterns/data/transactional-outbox.html"
      }
    ]
  },
  {
    "id": "SD-029",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "DB와 메시지 브로커에 동시 쓰기(Dual-write) 문제를 해결하기 위한 'Transactional Outbox' 패턴에 대해 설명해 주세요.",
    "answer": "**동작**:\r\n1. 비즈니스 데이터와 이벤트를 같은 DB 트랜잭션에서 저장\r\n2. 이벤트는 Outbox 테이블에 저장\r\n3. 별도 프로세스가 Outbox에서 이벤트를 읽어 브로커에 발행\r\n4. 발행 완료 후 Outbox 레코드 삭제/마킹",
    "references": [
      {
        "title": "Debezium Outbox",
        "url": "https://debezium.io/documentation/reference/transformations/outbox-event-router.html"
      }
    ]
  },
  {
    "id": "SD-030",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "Transactional Outbox 패턴에서 DB Outbox 테이블에 저장된 이벤트를 어떻게 안정적으로 이벤트 브로커에게 전달할 수 있을까요?",
    "answer": "**방법 1: Polling Publisher**\r\n- 주기적으로 Outbox 테이블 조회\r\n- 미발행 이벤트 전송 후 상태 업데이트\r\n\r\n**방법 2: CDC (Change Data Capture)**\r\n- DB 트랜잭션 로그를 캡처 (Debezium)\r\n- 실시간으로 이벤트 브로커에 전달",
    "references": [
      {
        "title": "Debezium Documentation",
        "url": "https://debezium.io/documentation/"
      }
    ]
  },
  {
    "id": "SD-031",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "CQRS 패턴이 무엇인지 CQS(Command Query Separation) 원칙과 비교하여 설명해 주세요.",
    "answer": "**CQS (원칙)**: 메서드는 Command(상태 변경) 또는 Query(데이터 반환) 중 하나만 수행\r\n\r\n**CQRS (패턴)**: 읽기와 쓰기 모델을 완전히 분리하여 다른 저장소/모델 사용\r\n\r\n**차이**: CQS는 메서드 레벨, CQRS는 시스템 아키텍처 레벨",
    "references": [
      {
        "title": "Martin Fowler - CQRS",
        "url": "https://martinfowler.com/bliki/CQRS.html"
      }
    ]
  },
  {
    "id": "SD-032",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "CQRS(Command Query Responsibility Segregation) 패턴을 사용하는 가장 주된 이유는 무엇인가요?",
    "answer": "1. **읽기/쓰기 최적화**: 각각에 맞는 데이터 모델 사용\r\n2. **확장성**: 읽기/쓰기 독립적 스케일링\r\n3. **복잡한 도메인**: 쓰기는 도메인 모델, 읽기는 단순 DTO\r\n4. **성능**: 읽기에 비정규화된 뷰 사용",
    "references": [
      {
        "title": "Microsoft CQRS",
        "url": "https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs"
      }
    ]
  },
  {
    "id": "SD-033",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "CQRS 패턴을 도입하면 읽기/쓰기 모델 분리로 인해 시스템이 어떻게 복잡해지나요?",
    "answer": "1. **코드 중복**: 읽기/쓰기 모델 각각 구현\r\n2. **동기화**: Command → Query 모델 동기화 로직 필요\r\n3. **최종 일관성**: 즉각적 일관성 보장 어려움\r\n4. **인프라**: 별도 저장소 운영 비용",
    "references": [
      {
        "title": "CQRS Journey",
        "url": "https://learn.microsoft.com/en-us/previous-versions/msp-n-p/jj554200(v=pandp.10"
      }
    ]
  },
  {
    "id": "SD-034",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "CQRS에서 분리된 'Command 모델(쓰기)'과 'Query 모델(읽기)'의 데이터 동기화는 어떻게 이루어지나요?",
    "answer": "**이벤트 기반 동기화**:\r\n1. Command 모델에서 상태 변경 후 이벤트 발행\r\n2. Query 모델이 이벤트 구독하여 뷰 업데이트\r\n\r\n**동기화 방식**:\r\n- 비동기: 이벤트 브로커 통해 전달\r\n- 동기: 같은 트랜잭션에서 양쪽 업데이트 (권장 X)",
    "references": [
      {
        "title": "CQRS Pattern",
        "url": "https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs"
      }
    ]
  },
  {
    "id": "SD-035",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "CQRS의 Command-Query 모델 동기화 과정에서 발생하는 '지연(lag)'으로 인한 '최종 일관성(Eventual Consistency)' 문제를 어떻게 처리해야 할까요?",
    "answer": "**전략 1: UI/UX 패턴**\r\n- **낙관적 업데이트**: 쓰기 후 UI 즉시 반영 (실패 시 롤백)\r\n- **로딩 상태**: \"저장 중...\", \"동기화 중...\" 표시\r\n\r\n**전략 2: Read-your-writes 일관성**\r\n- 쓴 사용자는 자신의 변경을 즉시 조회\r\n- 구현: 쓰기 후 일정 시간 Command 모델에서 직접 읽기\r\n\r\n**전략 3: 실시간 알림**\r\n- WebSocket/SSE로 동기화 완료 시 클라이언트에 알림\r\n\r\n**전략 4: 버전/타임스탬프**\r\n- 응답에 버전 포함, 기대 버전과 비교\r\n\r\n**트레이드오프**: 구현 복잡도 vs 사용자 경험",
    "references": [
      {
        "title": "Eventual Consistency",
        "url": "https://www.allthingsdistributed.com/2008/12/eventually_consistent.html"
      }
    ]
  },
  {
    "id": "SD-036",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "CQRS에서 'Query 모델(Read Model)'은 어떤 기술을 사용해 구현하는 것이 좋을까요?",
    "answer": "**용도별 선택**:\r\n- **단순 조회**: RDB (PostgreSQL)\r\n- **전문 검색**: Elasticsearch\r\n- **캐싱**: Redis\r\n- **복잡한 쿼리**: MongoDB\r\n- **분석**: ClickHouse, BigQuery\r\n\r\n**핵심**: 읽기 패턴에 최적화된 기술 선택",
    "references": [
      {
        "title": "Polyglot Persistence",
        "url": "https://martinfowler.com/bliki/PolyglotPersistence.html"
      }
    ]
  },
  {
    "id": "SD-037",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "모든 시스템에 CQRS를 적용하는 것이 좋을까요? CQRS의 장단점을 고려했을 때, 어떤 경우에 적합하고 어떤 경우에 부적합할까요?",
    "answer": "**적합한 경우**:\r\n- 읽기/쓰기 비율 차이가 큰 경우\r\n- 복잡한 도메인 모델\r\n- 높은 확장성 요구\r\n\r\n**부적합한 경우**:\r\n- 단순 CRUD 애플리케이션\r\n- 강한 일관성이 필수인 경우\r\n- 소규모 팀/프로젝트",
    "references": [
      {
        "title": "When to use CQRS",
        "url": "https://martinfowler.com/bliki/CQRS.html"
      }
    ]
  },
  {
    "id": "SD-038",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "\"CQRS는 이벤트 소싱이 아니다\"라는 말에 대해 어떻게 생각하시나요? CQRS와 이벤트 소싱의 관계를 설명해 주세요.",
    "answer": "**독립적 패턴**: CQRS와 Event Sourcing은 별개의 패턴\r\n\r\n- **CQRS만**: 읽기/쓰기 분리, 일반 DB 사용 가능\r\n- **Event Sourcing만**: 이벤트 저장, 단일 모델 가능\r\n- **함께 사용**: 시너지 효과",
    "references": [
      {
        "title": "Greg Young - CQRS and Event Sourcing",
        "url": "https://cqrs.files.wordpress.com/2010/11/cqrs_documents.pdf"
      }
    ]
  },
  {
    "id": "SD-039",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "독립적으로 사용 가능한 CQRS와 이벤트 소싱을 함께 사용할 때 얻을 수 있는 시너지는 무엇인가요?",
    "answer": "1. **자연스러운 동기화**: 이벤트가 Query 모델 업데이트 트리거\r\n2. **다양한 뷰**: 같은 이벤트로 여러 Query 모델 구축\r\n3. **시간 여행 쿼리**: 과거 시점의 Read Model 재구성\r\n4. **이벤트 재처리**: 새로운 Read Model 추가 용이",
    "references": [
      {
        "title": "Event Sourcing + CQRS",
        "url": "https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing"
      }
    ]
  },
  {
    "id": "SD-040",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "데이터베이스 샤딩(Sharding)이 무엇이며, 왜 필요한가요?",
    "answer": "**정의**: 데이터를 여러 DB 인스턴스에 수평 분할하여 저장\r\n\r\n**필요성**:\r\n- 단일 DB의 용량/성능 한계 극복\r\n- 읽기/쓰기 부하 분산\r\n- 수평적 확장(Scale-out)",
    "references": [
      {
        "title": "MongoDB Sharding",
        "url": "https://www.mongodb.com/docs/manual/sharding/"
      }
    ]
  },
  {
    "id": "SD-041",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "데이터베이스의 샤딩(Sharding)과 파티셔닝(Partitioning)의 차이점은 무엇인가요?",
    "answer": "**파티셔닝**: 단일 DB 인스턴스 내에서 테이블을 논리적으로 분할\r\n\r\n**샤딩**: 여러 물리적 DB 인스턴스에 데이터 분산\r\n\r\n| 비교 | 파티셔닝 | 샤딩 |\r\n|------|----------|------|\r\n| 범위 | 단일 DB | 다중 DB |\r\n| 확장 | 수직 | 수평 |\r\n| 복잡도 | 낮음 | 높음 |",
    "references": [
      {
        "title": "PostgreSQL Partitioning",
        "url": "https://www.postgresql.org/docs/current/ddl-partitioning.html"
      }
    ]
  },
  {
    "id": "SD-042",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "수직 샤딩(Vertical Sharding)과 수평 샤딩(Horizontal Sharding)을 비교 설명해 주세요.",
    "answer": "**수직 샤딩**: 테이블/컬럼 단위로 분리 (예: 사용자 테이블은 DB1, 주문 테이블은 DB2)\r\n\r\n**수평 샤딩**: 행(row) 단위로 분리 (예: user_id 1-1000은 DB1, 1001-2000은 DB2)\r\n\r\n| 비교 | 수직 | 수평 |\r\n|------|------|------|\r\n| 분리 단위 | 테이블/컬럼 | 행 |\r\n| 확장성 | 제한적 | 무한 |\r\n| 복잡도 | 낮음 | 높음 |",
    "references": [
      {
        "title": "Vitess Sharding",
        "url": "https://vitess.io/docs/concepts/shard/"
      }
    ]
  },
  {
    "id": "SD-043",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "수평 샤딩(행 기반 분할)과 수직 샤딩(컬럼 기반 분할) 중 어떤 상황에서 각각을 선택해야 할까요?",
    "answer": "**수직 샤딩 선택**:\r\n- 특정 테이블만 부하가 높을 때\r\n- 도메인별 분리가 명확할 때\r\n- 초기 단계 확장\r\n\r\n**수평 샤딩 선택**:\r\n- 단일 테이블의 데이터가 매우 클 때\r\n- 무한 확장이 필요할 때\r\n- 균등한 부하 분산 필요",
    "references": [
      {
        "title": "System Design Primer - Sharding",
        "url": "https://github.com/donnemartin/system-design-primer#sharding"
      }
    ]
  },
  {
    "id": "SD-044",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "샤딩 키(Shard Key)를 선정할 때 가장 중요하게 고려해야 할 기준은 무엇인가요?",
    "answer": "1. **카디널리티**: 충분히 다양한 값 (균등 분포)\r\n2. **쿼리 패턴**: 자주 사용되는 조회 조건\r\n3. **데이터 분포**: 균등한 데이터 분산\r\n4. **불변성**: 변경되지 않는 값",
    "references": [
      {
        "title": "MongoDB Shard Key",
        "url": "https://www.mongodb.com/docs/manual/core/sharding-shard-key/"
      }
    ]
  },
  {
    "id": "SD-045",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "샤딩 키(Shard Key)를 잘못 선정하면 데이터 분산과 쿼리 성능에 어떤 문제가 발생할 수 있나요?",
    "answer": "1. **Hotspot**: 특정 샤드에 트래픽 집중\r\n2. **불균형 데이터**: 샤드 간 데이터 크기 불균형\r\n3. **Cross-shard 쿼리 증가**: 샤드 키 없는 쿼리 성능 저하\r\n4. **리샤딩 비용**: 키 변경 시 전체 데이터 마이그레이션",
    "references": [
      {
        "title": "Cassandra Data Modeling",
        "url": "https://cassandra.apache.org/doc/latest/cassandra/data_modeling/"
      }
    ]
  },
  {
    "id": "SD-046",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "샤딩 환경에서 특정 샤드에만 데이터가 몰리는 '핫스팟(Hotspot)' 문제를 완화하기 위한 전략에는 무엇이 있을까요?",
    "answer": "1. **복합 샤드 키**: 여러 필드 조합\r\n2. **해시 샤딩**: 키를 해시하여 분산\r\n3. **Salt 추가**: 키에 랜덤 값 추가\r\n4. **시간 기반 분산**: 타임스탬프에 랜덤 요소 추가",
    "references": [
      {
        "title": "DynamoDB Best Practices",
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html"
      }
    ]
  },
  {
    "id": "SD-047",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "대표적인 샤딩 전략 3가지(Range, Hash, Directory-based)를 설명하고 장단점을 비교해 주세요.",
    "answer": "**Range Sharding** (범위 기반):\r\n- 키 범위로 분할 (예: A-M → 샤드1, N-Z → 샤드2)\r\n- 장점: 범위 쿼리 효율적, 정렬된 스캔 용이\r\n- 단점: Hotspot 발생 가능 (최근 데이터에 쓰기 집중)\r\n- 적합: 시계열 데이터, 범위 검색이 많은 경우\r\n\r\n**Hash Sharding** (해시 기반):\r\n- 키의 해시 값으로 분할\r\n- 장점: 균등 분산, Hotspot 방지\r\n- 단점: 범위 쿼리 시 모든 샤드 스캔 필요\r\n- 적합: Point 쿼리 위주, 균등 분산 중요\r\n\r\n**Directory-based** (디렉토리 기반):\r\n- 룩업 테이블/서비스로 샤드 매핑\r\n- 장점: 가장 유연, 동적 리밸런싱 용이\r\n- 단점: 룩업 서비스가 SPOF/병목\r\n- 적합: 복잡한 샤딩 규칙, 자주 변경되는 경우\r\n\r\n**하이브리드**: 여러 전략 조합 가능 (예: 지역별 Range + 사용자별 Hash)",
    "references": [
      {
        "title": "Sharding Strategies",
        "url": "https://www.mongodb.com/docs/manual/sharding/"
      }
    ]
  },
  {
    "id": "SD-048",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "MongoDB는 샤딩을 어떻게 구현하나요? 'mongos', 'config server', 'shard'의 역할을 설명해 주세요.",
    "answer": "**mongos**: 쿼리 라우터. 클라이언트 요청을 적절한 샤드로 전달\r\n\r\n**Config Server**: 메타데이터 저장. 샤드 키 범위, 청크 위치 정보\r\n\r\n**Shard**: 실제 데이터 저장. 각 샤드는 레플리카 셋",
    "references": [
      {
        "title": "MongoDB Sharded Cluster",
        "url": "https://www.mongodb.com/docs/manual/sharding/"
      }
    ]
  },
  {
    "id": "SD-049",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "MongoDB 샤딩에서 '청크(Chunk)'란 무엇이며, '밸런서(Balancer)'는 어떤 역할을 하나요?",
    "answer": "**청크**: 연속된 샤드 키 범위의 데이터 집합. 기본 128MB\r\n\r\n**밸런서**: 백그라운드 프로세스\r\n- 샤드 간 청크 균등 분배\r\n- 청크 분할 (split) 및 마이그레이션",
    "references": [
      {
        "title": "MongoDB Balancer",
        "url": "https://www.mongodb.com/docs/manual/core/sharding-balancer-administration/"
      }
    ]
  },
  {
    "id": "SD-050",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "Elasticsearch는 샤딩을 어떻게 구현하나요? '인덱스', '샤드', '레플리카'의 관계를 설명해 주세요.",
    "answer": "**인덱스**: 문서의 논리적 컨테이너\r\n\r\n**샤드**: 인덱스를 물리적으로 분할한 단위 (Primary Shard)\r\n\r\n**레플리카**: 샤드의 복제본. 가용성과 읽기 성능 향상\r\n\r\n```\r\n인덱스 = Primary Shards + Replica Shards\r\n```",
    "references": [
      {
        "title": "Elasticsearch Shards",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/scalability.html"
      }
    ]
  },
  {
    "id": "SD-051",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "Cassandra와 같은 Dynamo-style DB는 '샤딩'이라는 용어 대신 '파티셔닝'을 사용합니다. Cassandra의 데이터 분산 방식(Consistent Hashing)에 대해 설명해 주세요.",
    "answer": "**Consistent Hashing**:\r\n- 해시 링(Ring)에 노드 배치\r\n- 파티션 키 해시 → 링에서 시계방향으로 다음 노드에 저장\r\n- 노드 추가/제거 시 영향 범위 최소화\r\n\r\n**장점**: 노드 변경 시 일부 데이터만 재분배",
    "references": [
      {
        "title": "Cassandra Architecture",
        "url": "https://cassandra.apache.org/doc/latest/cassandra/architecture/"
      }
    ]
  },
  {
    "id": "SD-052",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "Cassandra의 Consistent Hashing에서 '가상 노드(Virtual Nodes)'가 왜 필요한가요?",
    "answer": "**문제**: 물리 노드만 사용 시 발생하는 이슈\r\n- 노드가 적으면 해시 링에서 불균등 분포\r\n- 노드 추가/제거 시 인접 노드에만 부하 집중\r\n\r\n**Vnode (Virtual Nodes) 해결책**:\r\n- 각 물리 노드가 **여러 토큰 범위** 담당\r\n- 기본 256개 vnode per 물리 노드\r\n\r\n**장점**:\r\n- 균등한 데이터 분포 보장\r\n- 노드 추가/제거 시 여러 노드가 부하 분담\r\n- 이기종 하드웨어 지원 (강력한 서버에 더 많은 vnode)\r\n\r\n**트레이드오프**: 메타데이터 증가, 복구 시 스트리밍 연결 수 증가",
    "references": [
      {
        "title": "Cassandra Virtual Nodes",
        "url": "https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html#virtual-nodes"
      }
    ]
  },
  {
    "id": "SD-053",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "Vitess나 Citus와 같이 RDBMS를 샤딩해주는 미들웨어는 어떤 원리로 동작하나요?",
    "answer": "**동작 원리**:\r\n1. **쿼리 라우팅**: SQL 파싱 후 적절한 샤드로 전달\r\n2. **결과 병합**: 여러 샤드 결과 조합\r\n3. **스키마 관리**: 샤드 간 일관된 스키마 유지\r\n4. **연결 풀링**: 백엔드 DB 연결 관리",
    "references": [
      {
        "title": "Vitess Architecture",
        "url": "https://vitess.io/docs/concepts/vtgate/"
      }
    ]
  },
  {
    "id": "SD-054",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "샤딩된 환경에서 여러 샤드에 걸친 쿼리(Cross-shard query)는 어떻게 처리해야 하며, 어떤 성능 문제가 있을까요?",
    "answer": "**처리 방법**: Scatter-Gather - 모든 관련 샤드에 쿼리 후 결과 병합\r\n\r\n**성능 문제**:\r\n1. 네트워크 지연 증가 (다중 샤드 통신)\r\n2. Tail Latency: 가장 느린 샤드가 전체 응답 결정\r\n3. 메모리 증가 (결과 병합/정렬)\r\n4. 페이지네이션 복잡\r\n\r\n**최적화 전략**:\r\n1. **샤드 키 포함 쿼리 유도**: 쿼리에 샤드 키 조건 추가\r\n2. **병렬 실행**: 샤드 쿼리 동시 실행\r\n3. **캐싱**: 자주 사용되는 크로스 샤드 결과 캐싱\r\n4. **비정규화**: 자주 조회 데이터 복제\r\n\r\n**트레이드오프**: 비정규화 → 조회 성능 향상, 쓰기 복잡도 증가",
    "references": [
      {
        "title": "Vitess Query Serving",
        "url": "https://vitess.io/docs/concepts/query-serving/"
      }
    ]
  },
  {
    "id": "SD-055",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "샤딩된 환경에서 여러 샤드에 걸친 'JOIN' 연산은 어떻게 수행해야 할까요?",
    "answer": "**방법**:\r\n1. **Co-location**: 관련 데이터를 같은 샤드에 배치\r\n2. **애플리케이션 레벨 JOIN**: 별도 쿼리 후 앱에서 조합\r\n3. **브로드캐스트 조인**: 작은 테이블 전체 복제\r\n4. **비정규화**: JOIN 불필요하게 데이터 구조 변경",
    "references": [
      {
        "title": "CockroachDB Joins",
        "url": "https://www.cockroachlabs.com/docs/stable/joins.html"
      }
    ]
  },
  {
    "id": "SD-056",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "샤딩된 환경에서 여러 샤드에 걸친 '트랜잭션'은 어떻게 처리해야 할까요? SAGA 패턴과의 연관성은 무엇인가요?",
    "answer": "**단일 샤드**: 로컬 트랜잭션 사용\r\n\r\n**Cross-shard**:\r\n1. **2PC**: 분산 트랜잭션 (성능 저하)\r\n2. **SAGA**: 보상 트랜잭션으로 최종 일관성\r\n3. **설계로 회피**: 관련 데이터 같은 샤드 배치",
    "references": [
      {
        "title": "Spanner Transactions",
        "url": "https://cloud.google.com/spanner/docs/transactions"
      }
    ]
  },
  {
    "id": "SD-057",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "리샤딩(Resharding)은 무엇이며, 언제 필요한가요?",
    "answer": "**정의**: 샤드 수 변경 또는 샤딩 전략 변경으로 데이터 재분배\r\n\r\n**필요 시점**:\r\n- 샤드 용량 한계 도달\r\n- Hotspot 해결\r\n- 샤드 키 변경\r\n- 노드 추가/제거",
    "references": [
      {
        "title": "MongoDB Resharding",
        "url": "https://www.mongodb.com/docs/manual/core/sharding-reshard-a-collection/"
      }
    ]
  },
  {
    "id": "SD-058",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "샤드 수 변경이나 샤딩 키 변경 시, 시스템 다운타임 없이 리샤딩을 수행하는 방법에 대해 설명해 주세요.",
    "answer": "**온라인 리샤딩 단계**:\r\n1. **이중 쓰기**: 기존/신규 샤드에 동시 쓰기\r\n2. **백필**: 기존 데이터를 신규 샤드로 복사\r\n3. **검증**: 데이터 일관성 확인\r\n4. **트래픽 전환**: 읽기를 신규 샤드로 전환\r\n5. **정리**: 기존 샤드 데이터 삭제",
    "references": [
      {
        "title": "Stripe Online Migrations",
        "url": "https://stripe.com/blog/online-migrations"
      }
    ]
  },
  {
    "id": "SD-059",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "CAP 이론(Theorem)에 대해 설명해 주세요. (Consistency, Availability, Partition Tolerance)",
    "answer": "**C (Consistency)**: 모든 노드가 **동일한 최신 데이터**를 반환 (Linearizability)\r\n\r\n**A (Availability)**: 장애가 없는 모든 노드가 **합리적인 시간 내에** 응답\r\n\r\n**P (Partition Tolerance)**: 네트워크 분할(메시지 유실/지연)에도 시스템 동작\r\n\r\n**정리**: 네트워크 파티션 발생 시, 일관성(C)과 가용성(A) 중 하나를 선택\r\n\r\n**중요한 오해 바로잡기**:\r\n- \"3개 중 2개 선택\"은 오해를 유발하는 표현\r\n- P는 선택이 아닌 **현실** (네트워크는 반드시 실패함)\r\n- 실제 선택: 파티션 발생 시 C 또는 A 중 무엇을 희생할 것인가\r\n- 파티션이 없을 때는 C와 A 모두 가능",
    "references": [
      {
        "title": "CAP Theorem - Brewer",
        "url": "https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/"
      }
    ]
  },
  {
    "id": "SD-060",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "CAP 이론에서 Consistency, Availability, Partition Tolerance 중 왜 현대 분산 시스템은 'P(Partition Tolerance)'를 포기할 수 없는지 설명해 주세요.",
    "answer": "**이유**: 네트워크 파티션은 **피할 수 없는 현실**\r\n\r\n- 분산 시스템에서 네트워크 장애는 반드시 발생\r\n- P를 포기 = 단일 노드 시스템 = 분산 시스템이 아님\r\n\r\n**결론**: 실제 선택은 **CP vs AP**",
    "references": [
      {
        "title": "You Can't Sacrifice Partition Tolerance",
        "url": "https://codahale.com/you-cant-sacrifice-partition-tolerance/"
      }
    ]
  },
  {
    "id": "SD-061",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "CAP 이론에서 P가 필수일 때 시스템은 CP(일관성 우선) 또는 AP(가용성 우선)를 선택해야 합니다. 각각의 특징과 대표적인 시스템 예시를 들어주세요.",
    "answer": "**CP (Consistency + Partition Tolerance)**:\r\n- 파티션 발생 시 일관성 유지를 위해 일부 요청 거부\r\n- 예: ZooKeeper, etcd, HBase, Spanner\r\n- 적합: 금융 거래, 재고 관리 등 정확성이 핵심\r\n\r\n**AP (Availability + Partition Tolerance)**:\r\n- 파티션 발생 시에도 모든 노드가 요청 처리 (최종 일관성)\r\n- 예: Cassandra, DynamoDB, CouchDB, Riak\r\n- 적합: 소셜 미디어 피드, 장바구니 등 가용성이 핵심\r\n\r\n**함정 주의**:\r\n- MongoDB는 구성에 따라 CP 또는 AP가 될 수 있음 (writeConcern, readConcern)\r\n- 대부분의 시스템은 **Tunable Consistency** 지원\r\n- 동일 시스템 내에서 작업별로 다른 일관성 수준 선택 가능",
    "references": [
      {
        "title": "CAP FAQ",
        "url": "https://www.the-paper-trail.org/page/cap-faq/"
      }
    ]
  },
  {
    "id": "SD-062",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "CP(Consistency-Partition Tolerance) 시스템은 네트워크 파티션 발생 시 어떻게 동작하나요?",
    "answer": "**동작**:\r\n- 과반수(Quorum) 미달 파티션은 요청 거부\r\n- 일관성 유지를 위해 가용성 희생\r\n- 클라이언트는 에러 또는 타임아웃 수신\r\n\r\n**예시**: ZooKeeper에서 리더와 연결 끊긴 팔로워는 읽기/쓰기 불가",
    "references": [
      {
        "title": "ZooKeeper Internals",
        "url": "https://zookeeper.apache.org/doc/current/zookeeperInternals.html"
      }
    ]
  },
  {
    "id": "SD-063",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "AP(Availability-Partition Tolerance) 시스템은 네트워크 파티션 발생 시 CP 시스템과 달리 어떻게 동작하나요?",
    "answer": "**동작**:\r\n- 모든 파티션이 계속 요청 처리\r\n- 일관성 포기, 충돌 가능\r\n- 파티션 복구 후 충돌 해결 (reconciliation)\r\n\r\n**예시**: Cassandra는 파티션 상태에서도 각 노드가 독립적으로 쓰기 허용",
    "references": [
      {
        "title": "Cassandra Consistency",
        "url": "https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html#tunable-consistency"
      }
    ]
  },
  {
    "id": "SD-064",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "\"CAP 이론은 셋 중 둘만 선택할 수 있다는 것이 아니다\"라는 비판이 있습니다. 이 비판의 근거와 CAP 이론의 한계는 무엇인가요?",
    "answer": "**비판 근거**:\r\n1. **파티션은 드묾**: 정상 상황(대부분의 시간)에서는 C와 A 모두 가능\r\n2. **이분법적 표현의 한계**: 실제로는 연속적 스펙트럼에서 트레이드오프\r\n3. **Latency 미고려**: 실제 시스템에서는 응답 시간이 가용성만큼 중요\r\n4. **일관성 정의 모호**: CAP의 C는 Linearizability인데, 실무에서는 다양한 수준 존재\r\n\r\n**대안 - PACELC 이론**:\r\n- **P**artition 발생 시: **A**vailability vs **C**onsistency\r\n- **E**lse (정상 상황): **L**atency vs **C**onsistency\r\n\r\n예시:\r\n- DynamoDB: PA/EL (파티션 시 가용성, 평소엔 지연 우선)\r\n- Spanner: PC/EC (항상 일관성 우선)\r\n- Cassandra: PA/EL (튜닝 가능)",
    "references": [
      {
        "title": "PACELC",
        "url": "https://en.wikipedia.org/wiki/PACELC_theorem"
      }
    ]
  },
  {
    "id": "SD-065",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "CAP의 'C'는 '강한 일관성(Strong Consistency)'을 의미합니다. '최종 일관성(Eventual Consistency)' 모델이 무엇인지, AP 시스템과 어떤 관계가 있는지 설명해 주세요.",
    "answer": "**최종 일관성**: 업데이트 중단 시 결국 모든 노드가 같은 값 수렴\r\n\r\n**AP 시스템과의 관계**:\r\n- AP 시스템은 가용성을 위해 강한 일관성 포기\r\n- 대신 최종 일관성 제공\r\n- 예: Cassandra, DynamoDB",
    "references": [
      {
        "title": "Eventually Consistent - Werner Vogels",
        "url": "https://www.allthingsdistributed.com/2008/12/eventually_consistent.html"
      }
    ]
  },
  {
    "id": "SD-066",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "분산 시스템에서 '강한 일관성(Strong Consistency)'과 '최종 일관성(Eventual Consistency)' 사이에는 어떤 다른 일관성 모델들이 존재하나요?",
    "answer": "1. **Read-your-writes**: 자신이 쓴 것은 즉시 읽기 가능\r\n2. **Monotonic Reads**: 한번 본 값보다 과거 값 읽기 불가\r\n3. **Monotonic Writes**: 쓰기 순서 보장\r\n4. **Causal Consistency**: 인과 관계 있는 연산 순서 보장\r\n5. **Session Consistency**: 세션 내 일관성 보장",
    "references": [
      {
        "title": "Consistency Models",
        "url": "https://jepsen.io/consistency"
      }
    ]
  },
  {
    "id": "SD-067",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "분산 시스템에서 '합의(Consensus)' 문제는 무엇을 해결하기 위한 것인가요?",
    "answer": "**문제**: 분산 노드들이 하나의 값/결정에 동의하는 것\r\n\r\n**필요 상황**:\r\n- 리더 선출\r\n- 분산 트랜잭션 커밋 여부\r\n- 로그 복제 순서\r\n- 설정 변경",
    "references": [
      {
        "title": "Raft Paper",
        "url": "https://raft.github.io/raft.pdf"
      }
    ]
  },
  {
    "id": "SD-068",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "비잔티움 장군 문제(Byzantine Generals Problem)에 대해 설명해 주세요.",
    "answer": "**문제 설정**:\r\n- 여러 장군이 공격/후퇴 합의 필요\r\n- 일부 장군이 배신자(거짓 정보 전달)\r\n- 배신자가 있어도 올바른 합의 도달 필요\r\n\r\n**조건**: n개 노드 중 f개 악의적 노드가 있을 때, n >= 3f + 1 이어야 합의 가능",
    "references": [
      {
        "title": "Byzantine Generals Problem - Lamport",
        "url": "https://lamport.azurewebsites.net/pubs/byz.pdf"
      }
    ]
  },
  {
    "id": "SD-069",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "비잔티움 장군 문제(Byzantine Generals Problem)가 분산 시스템에서 왜 중요한가요? 어떤 종류의 장애(Crash Fault vs Byzantine Fault)를 가정하는 것인가요?",
    "answer": "**가정하는 장애**: **악의적(Byzantine) 장애**\r\n- 노드가 의도적으로 잘못된 정보 전송\r\n- 해킹, 버그, 하드웨어 오류로 비정상 동작\r\n\r\n**중요성**:\r\n- 신뢰할 수 없는 노드 환경 (퍼블릭 블록체인)\r\n- 고신뢰성 시스템 (항공, 금융)",
    "references": [
      {
        "title": "Byzantine Fault Tolerance",
        "url": "https://pmg.csail.mit.edu/papers/osdi99.pdf"
      }
    ]
  },
  {
    "id": "SD-070",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "비잔티움 장애 허용(BFT, Byzantine Fault Tolerance)이 무엇인지, 그리고 이것이 블록체인의 합의 알고리즘과 어떤 관련이 있는지 설명해 주세요.",
    "answer": "**BFT**: 악의적 노드가 있어도 시스템이 올바르게 동작\r\n\r\n**블록체인 관계**:\r\n- 퍼블릭 블록체인은 신뢰 없는 참여자 환경\r\n- PoW, PoS 등은 BFT의 변형\r\n- PBFT는 프라이빗 블록체인에서 사용 (Hyperledger)",
    "references": [
      {
        "title": "Hyperledger PBFT",
        "url": "https://hyperledger-fabric.readthedocs.io/"
      }
    ]
  },
  {
    "id": "SD-071",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "BFT를 구현하기 위한 알고리즘(예: PBFT)과 CFT(Crash Fault Tolerant) 합의 알고리즘(예: Raft, Paxos)의 근본적인 차이는 무엇인가요?",
    "answer": "**CFT (Crash Fault Tolerance) - Raft, Paxos**:\r\n- 노드가 크래시만 가정 (정직한 실패: 응답 없음 또는 정상 응답)\r\n- f개 장애 허용에 **2f+1** 노드 필요\r\n- 메시지 복잡도: O(n) per operation\r\n- 성능 우수, 대부분의 내부 시스템에 적합\r\n\r\n**BFT (Byzantine Fault Tolerance) - PBFT, HotStuff**:\r\n- 악의적 노드 가정 (거짓 응답, 선택적 무응답 등)\r\n- f개 장애 허용에 **3f+1** 노드 필요\r\n- 메시지 복잡도: O(n^2) per operation\r\n- 성능 저하, 신뢰할 수 없는 참여자 환경에 필요\r\n\r\n**트레이드오프**:\r\n| 기준 | CFT | BFT |\r\n|------|-----|-----|\r\n| 장애 유형 | 크래시만 | 악의적 포함 |\r\n| 노드 수 | 2f+1 | 3f+1 |\r\n| 성능 | 높음 | 낮음 |\r\n| 사용처 | 내부 시스템 | 블록체인, 고신뢰 시스템 |",
    "references": [
      {
        "title": "Raft vs PBFT",
        "url": "https://decentralizedthoughts.github.io/2019-06-07-modeling-consensus/"
      }
    ]
  },
  {
    "id": "SD-072",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "Raft 합의 알고리즘의 '리더 선출(Leader Election)' 과정에 대해 설명해 주세요.",
    "answer": "**과정**:\r\n1. 리더 heartbeat 타임아웃 발생\r\n2. Follower가 Candidate로 전환\r\n3. Term 증가, 자신에게 투표, 다른 노드에 RequestVote 전송\r\n4. 과반수 투표 획득 시 리더 선출\r\n5. 리더는 heartbeat 전송 시작",
    "references": [
      {
        "title": "Raft Visualization",
        "url": "https://raft.github.io/"
      }
    ]
  },
  {
    "id": "SD-073",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "Raft 알고리즘에서 리더 선출 후 '로그 복제(Log Replication)'는 어떻게 이루어지나요?",
    "answer": "**과정**:\r\n1. 클라이언트 요청 → 리더가 로그에 추가\r\n2. 리더가 AppendEntries RPC로 팔로워에 전파\r\n3. 과반수 복제 완료 시 커밋\r\n4. 다음 heartbeat에서 커밋 알림\r\n5. 팔로워도 커밋 적용",
    "references": [
      {
        "title": "Raft Paper - Log Replication",
        "url": "https://raft.github.io/raft.pdf"
      }
    ]
  },
  {
    "id": "SD-074",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "데이터베이스 레플리케이션(Replication, 복제)은 왜 필요한가요? (가용성 vs 확장성)",
    "answer": "**가용성**: 노드 장애 시 다른 복제본이 서비스 지속\r\n\r\n**확장성**: 읽기 부하를 여러 복제본에 분산\r\n\r\n**추가 이점**:\r\n- 지리적 분산 (지연 감소)\r\n- 데이터 내구성",
    "references": [
      {
        "title": "MySQL Replication",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/replication.html"
      }
    ]
  },
  {
    "id": "SD-075",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "'동기식(Synchronous)' 복제와 '비동기식(Asynchronous)' 복제의 장단점을 비교 설명해 주세요.",
    "answer": "**동기식 (Synchronous)**:\r\n- 모든 복제본 확인 후 클라이언트에 응답\r\n- 장점: 데이터 유실 없음 (RPO=0), 강한 일관성\r\n- 단점: 가장 느린 복제본에 종속, 복제본 장애 시 전체 중단\r\n- 적합: 금융 거래 등 데이터 손실 불가한 경우\r\n\r\n**비동기식 (Asynchronous)**:\r\n- 로컬 쓰기 후 즉시 응답, 복제는 백그라운드\r\n- 장점: 낮은 지연, 높은 가용성\r\n- 단점: 데이터 유실 가능 (RPO>0), 복제 지연(Replication Lag)\r\n- 적합: 대부분의 읽기 중심 워크로드\r\n\r\n**트레이드오프**:\r\n| 방식 | RPO | 지연 | 처리량 | 가용성 |\r\n|------|-----|------|--------|--------|\r\n| 동기식 | 0 | 높음 | 낮음 | 낮음 |\r\n| 비동기식 | >0 | 낮음 | 높음 | 높음 |\r\n\r\n**실무 고려**: 지리적 분산 복제는 네트워크 지연으로 비동기 권장",
    "references": [
      {
        "title": "PostgreSQL Replication",
        "url": "https://www.postgresql.org/docs/current/warm-standby.html"
      }
    ]
  },
  {
    "id": "SD-076",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "동기식과 비동기식 복제의 절충안인 '반-동기식(Semi-Synchronous)' 복제는 무엇이며, 어떤 문제를 해결하기 위해 등장했나요?",
    "answer": "**정의**: 최소 하나의 복제본 확인 후 커밋 응답\r\n\r\n**해결 문제**:\r\n- 동기식의 성능 저하\r\n- 비동기식의 데이터 유실 위험\r\n\r\n**동작**: 리더 + 최소 1개 복제본 확인 → 커밋",
    "references": [
      {
        "title": "MySQL Semi-Sync",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/replication-semisync.html"
      }
    ]
  },
  {
    "id": "SD-077",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "단일 리더(Single-Leader) 복제 아키텍처 (Master-Slave)에 대해 설명해 주세요.",
    "answer": "**구조**:\r\n- 하나의 리더(Master): 모든 쓰기 처리\r\n- 여러 팔로워(Slave): 리더 복제, 읽기 처리\r\n\r\n**복제 흐름**:\r\n1. 클라이언트 → 리더 쓰기\r\n2. 리더 → 팔로워 복제\r\n3. 클라이언트 ← 팔로워 읽기",
    "references": [
      {
        "title": "Redis Replication",
        "url": "https://redis.io/docs/management/replication/"
      }
    ]
  },
  {
    "id": "SD-078",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "단일 리더(Single Leader) 복제 아키텍처의 가장 큰 장점과 단점은 무엇인가요?",
    "answer": "**장점**:\r\n- 단순한 구현\r\n- 쓰기 충돌 없음\r\n- 일관성 유지 용이\r\n\r\n**단점**:\r\n- 리더가 SPOF\r\n- 쓰기 확장 불가 (수직 확장만)\r\n- 리더-팔로워 지연",
    "references": [
      {
        "title": "DDIA - Replication",
        "url": "https://dataintensive.net/"
      }
    ]
  },
  {
    "id": "SD-079",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "단일 리더 복제에서 만약 리더(Master) 노드가 다운되면 어떤 문제가 발생하나요?",
    "answer": "1. **쓰기 불가**: 새 쓰기 요청 처리 불가\r\n2. **데이터 유실 가능**: 비동기 복제 시 미복제 데이터 손실\r\n3. **서비스 중단**: Failover까지 다운타임\r\n4. **읽기 일관성 문제**: 복제본 간 데이터 차이",
    "references": [
      {
        "title": "MySQL Failover",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/replication-solutions-switch.html"
      }
    ]
  },
  {
    "id": "SD-080",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "단일 리더 복제에서 리더가 다운되었을 때 새로운 리더를 선출하는 과정(Failover)에 대해 설명해 주세요.",
    "answer": "**Failover 단계**:\r\n1. **장애 감지**: 타임아웃으로 리더 다운 인식\r\n2. **새 리더 선출**: 가장 최신 데이터 가진 팔로워 선택\r\n3. **구성 변경**: 클라이언트/팔로워에게 새 리더 알림\r\n4. **복구**: 이전 리더 복귀 시 팔로워로 전환",
    "references": [
      {
        "title": "Redis Sentinel",
        "url": "https://redis.io/docs/management/sentinel/"
      }
    ]
  },
  {
    "id": "SD-081",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "리더 Failover 과정에서 발생할 수 있는 'Split-Brain' 문제가 무엇이며, 어떻게 방지할 수 있나요?",
    "answer": "**Split-Brain 정의**: 네트워크 파티션으로 각 파티션이 자신이 리더라고 판단, **두 개 이상의 리더가 동시 존재**\r\n\r\n**문제**:\r\n- 양쪽 리더가 동시에 쓰기 처리 → 데이터 불일치\r\n- 파티션 복구 후 충돌 해결 어려움\r\n- 데이터 손실 또는 corruption 가능\r\n\r\n**방지 방법**:\r\n1. **Quorum (과반수 투표)**: 과반수 노드와 통신 가능해야 리더 유지\r\n   - 예: 5노드 중 3개 이상 연결된 쪽만 리더\r\n\r\n2. **Fencing (차단)**: 이전 리더를 강제로 격리\r\n   - STONITH (Shoot The Other Node In The Head)\r\n   - Fencing Token: 새 리더만 유효한 토큰 사용\r\n\r\n3. **Lease (임대)**: 리더 권한에 TTL 설정\r\n   - 갱신 실패 시 자동으로 리더십 상실\r\n\r\n**핵심 통찰**: 파티션 시 \"누가 죽었는지\" 판단 불가 → **스스로 포기하는 메커니즘** 필수",
    "references": [
      {
        "title": "Fencing in Distributed Systems",
        "url": "https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html"
      }
    ]
  },
  {
    "id": "SD-082",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "비동기식 복제를 사용할 때, 리더 장애 조치(Failover) 과정에서 데이터 유실이 발생할 수 있습니다. 왜 그런지 설명해 주세요.",
    "answer": "**원인**:\r\n1. 리더에 쓰기 완료\r\n2. 팔로워에 복제 전 리더 다운\r\n3. 팔로워가 새 리더로 승격\r\n4. 복제되지 않은 쓰기 데이터 유실\r\n\r\n**대책**: Semi-sync 복제, 수동 승인",
    "references": [
      {
        "title": "MySQL Data Loss",
        "url": "https://dev.mysql.com/doc/refman/8.0/en/replication-solutions-unexpected-replica-halt.html"
      }
    ]
  },
  {
    "id": "SD-083",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "단일 리더 아키텍처에서 리더로 모든 쓰기 요청이 몰릴 때 발생하는 쓰기 병목 현상을 어떻게 해결할 수 있을까요?",
    "answer": "1. **수직 확장**: 리더 서버 스펙 향상\r\n2. **샤딩**: 여러 샤드로 분산, 각 샤드마다 리더\r\n3. **다중 리더**: 여러 리더 허용 (충돌 해결 필요)\r\n4. **쓰기 최적화**: 배치 처리, 비동기 쓰기",
    "references": [
      {
        "title": "Scaling Writes",
        "url": "https://www.citusdata.com/blog/2016/10/03/scaling-distributed-database-writes/"
      }
    ]
  },
  {
    "id": "SD-084",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "다중 리더(Multi-Leader) 복제 아키텍처 (Master-Master)에 대해 설명해 주세요.",
    "answer": "**구조**: 여러 노드가 모두 리더 역할, 쓰기 허용\r\n\r\n**복제**: 각 리더가 다른 리더에게 변경 전파\r\n\r\n**사용 사례**:\r\n- 다중 데이터센터\r\n- 오프라인 클라이언트 (노트 앱)",
    "references": [
      {
        "title": "CouchDB Replication",
        "url": "https://docs.couchdb.org/en/stable/replication/"
      }
    ]
  },
  {
    "id": "SD-085",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "다중 리더(Multi-Leader) 복제 아키텍처는 어떤 경우에 유용한가요?",
    "answer": "1. **Multi-Datacenter**: 각 DC에 로컬 리더 → 지연 감소\r\n2. **오프라인 작업**: 오프라인에서 쓰기 후 동기화\r\n3. **협업 도구**: 동시 편집 (Google Docs)\r\n4. **고가용성**: 리더 장애에도 다른 리더로 계속 서비스",
    "references": [
      {
        "title": "Multi-Leader Replication",
        "url": "https://dataintensive.net/"
      }
    ]
  },
  {
    "id": "SD-086",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "다중 리더 아키텍처의 가장 큰 단점인 '쓰기 충돌(Write Conflict)' 문제에 대해 설명해 주세요.",
    "answer": "**발생 상황**: 두 리더가 동시에 같은 데이터 수정\r\n\r\n**예시**:\r\n- 리더A: 이름을 \"Alice\"로 변경\r\n- 리더B: 이름을 \"Bob\"으로 변경\r\n- 둘 다 성공 후 복제 시 충돌\r\n\r\n**문제**: 어떤 값이 최종 값인가?",
    "references": [
      {
        "title": "Conflict Resolution",
        "url": "https://www.cockroachlabs.com/blog/consistency-model/"
      }
    ]
  },
  {
    "id": "SD-087",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "다중 리더 환경에서 두 개의 리더에서 동일한 데이터를 동시에 수정할 경우 발생하는 쓰기 충돌을 어떻게 감지하고 해결해야 할까요?",
    "answer": "**감지 방법**:\r\n- 버전 벡터 (Vector Clock): 각 노드별 버전 추적, 동시성 감지\r\n- 타임스탬프 비교: 물리적/논리적 시계 사용\r\n- 복제 시점에 충돌 발견\r\n\r\n**해결 전략** (트레이드오프 포함):\r\n1. **LWW (Last Write Wins)**:\r\n   - 타임스탬프 최신 값 승리\r\n   - 장점: 단순, 결정론적\r\n   - 단점: 데이터 유실, 시계 동기화 의존\r\n\r\n2. **병합 (Merge)**:\r\n   - 두 값 합치기 (예: 집합의 합집합)\r\n   - 장점: 데이터 유실 없음\r\n   - 단점: 모든 데이터 타입에 적용 불가\r\n\r\n3. **사용자 해결**:\r\n   - 충돌 표시 후 사용자/애플리케이션이 선택\r\n   - 장점: 비즈니스 로직 반영\r\n   - 단점: UX 저하, 구현 복잡\r\n\r\n4. **CRDT (Conflict-free Replicated Data Types)**:\r\n   - 수학적으로 자동 병합 가능한 데이터 구조\r\n   - 예: G-Counter, LWW-Register, OR-Set\r\n   - 장점: 자동 해결\r\n   - 단점: 지원 타입 제한, 메모리 오버헤드",
    "references": [
      {
        "title": "CRDTs",
        "url": "https://crdt.tech/"
      }
    ]
  },
  {
    "id": "SD-088",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "쓰기 충돌 해결에 사용되는 'Last Write Wins (LWW)'와 같은 자동 충돌 해결 전략의 문제점은 무엇인가요?",
    "answer": "**문제점**:\r\n1. **데이터 유실**: 먼저 쓴 값은 사라짐\r\n2. **시계 동기화**: 노드 간 시계 불일치 시 잘못된 판단\r\n3. **동시 쓰기**: 실제 동시 발생 시 임의 선택\r\n4. **비즈니스 규칙 무시**: 도메인 로직과 무관하게 결정",
    "references": [
      {
        "title": "LWW Problems",
        "url": "https://jepsen.io/consistency/models/lww"
      }
    ]
  },
  {
    "id": "SD-089",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "리더가 없는(Leaderless) 아키텍처 (예: Cassandra, DynamoDB)는 다중 리더와 어떻게 다른가요?",
    "answer": "**다중 리더**: 지정된 리더들이 쓰기 처리\r\n\r\n**리더리스**: 모든 노드가 동등, 클라이언트가 여러 노드에 직접 쓰기\r\n\r\n**차이**:\r\n| 비교 | Multi-Leader | Leaderless |\r\n|------|--------------|------------|\r\n| 리더 | 지정됨 | 없음 |\r\n| 쓰기 | 리더만 | 모든 노드 |\r\n| 조정 | 리더 간 복제 | Quorum |",
    "references": [
      {
        "title": "Cassandra Architecture",
        "url": "https://cassandra.apache.org/doc/latest/cassandra/architecture/"
      }
    ]
  },
  {
    "id": "SD-090",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "리더리스(Leaderless) 아키텍처에서 일관성 조절에 사용하는 'Quorum'의 R, W, N 값의 관계(R+W > N)에 대해 설명해 주세요.",
    "answer": "**N**: 총 복제본 수\r\n**W**: 쓰기 확인 필요 노드 수\r\n**R**: 읽기 확인 필요 노드 수\r\n\r\n**R + W > N**: 읽기와 쓰기 노드 집합이 반드시 겹침 → 최신 데이터 보장\r\n\r\n**예시**: N=3, W=2, R=2 → 2+2 > 3 ✓",
    "references": [
      {
        "title": "DynamoDB Consistency",
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html"
      }
    ]
  },
  {
    "id": "SD-091",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "Quorum 기반 리더리스 아키텍처에서 '쓰기 충돌'은 어떻게 처리하나요?",
    "answer": "**Read Repair**: 읽기 시 불일치 발견하면 최신 값으로 복구\r\n\r\n**Anti-entropy**: 백그라운드에서 노드 간 데이터 비교/복구\r\n\r\n**Vector Clock**: 버전 추적으로 충돌 감지\r\n\r\n**해결**: LWW, Merge, 애플리케이션 해결",
    "references": [
      {
        "title": "Cassandra Read Repair",
        "url": "https://cassandra.apache.org/doc/latest/cassandra/operating/read_repair.html"
      }
    ]
  },
  {
    "id": "SD-092",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "RDBMS와 NoSQL(Key-Value, Document, Graph) 각각의 특징을 설명하고, 언제 어떤 것을 선택해야 할지 기준을 설명해 주세요.",
    "answer": "**RDBMS (PostgreSQL, MySQL)**:\r\n- 특징: 정형 데이터, ACID, 복잡한 조인, 강한 일관성\r\n- 적합: 금융, ERP, 관계형 데이터\r\n- 제한: 수평 확장 어려움\r\n\r\n**Key-Value (Redis, DynamoDB)**:\r\n- 특징: 단순 조회, 매우 높은 성능\r\n- 적합: 캐싱, 세션, 실시간 카운터\r\n- 제한: 복잡한 쿼리 불가\r\n\r\n**Document (MongoDB, Couchbase)**:\r\n- 특징: 유연한 스키마, JSON 중첩\r\n- 적합: 콘텐츠 관리, 카탈로그\r\n- 제한: 조인 비효율\r\n\r\n**Wide-Column (Cassandra, HBase)**:\r\n- 특징: 대용량 쓰기, 시계열\r\n- 적합: IoT, 로그, 시계열 분석\r\n- 제한: 복잡한 쿼리 불가\r\n\r\n**Graph (Neo4j)**:\r\n- 특징: 관계 탐색 최적화\r\n- 적합: 소셜 네트워크, 추천\r\n- 제한: 집계 쿼리 비효율\r\n\r\n**선택 기준**: ACID 필수 → RDBMS, 높은 쓰기 → Wide-Column, 유연한 스키마 → Document, 관계 분석 → Graph",
    "references": [
      {
        "title": "DB-Engines Ranking",
        "url": "https://db-engines.com/en/ranking"
      }
    ]
  },
  {
    "id": "SD-093",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "마이크로서비스 아키텍처(MSA)를 설계할 때, 서비스 간 통신 방법(동기식 API vs 비동기식 이벤트)을 어떻게 결정해야 할까요?",
    "answer": "**동기식 (REST, gRPC) 선택**:\r\n- 즉각적 응답 필요 (사용자 대기)\r\n- 단순한 요청-응답 패턴\r\n- 강한 일관성 필요\r\n- 예: 인증, 결제 검증, 실시간 조회\r\n\r\n**비동기식 (이벤트, 메시지) 선택**:\r\n- 응답 대기 불필요\r\n- 느슨한 결합이 중요\r\n- 확장성/탄력성 중요\r\n- 작업이 오래 걸리는 경우\r\n- 예: 알림, 로그 처리, 주문 후처리\r\n\r\n**트레이드오프**:\r\n| 기준 | 동기식 | 비동기식 |\r\n|------|--------|----------|\r\n| 결합도 | 높음 | 낮음 |\r\n| 복잡도 | 낮음 | 높음 (브로커 운영) |\r\n| 장애 전파 | 연쇄 장애 위험 | 격리 가능 |\r\n| 디버깅 | 용이 | 어려움 |\r\n\r\n**실무 권장**: 하이브리드 - Query는 동기식, Event는 비동기식",
    "references": [
      {
        "title": "Microservices Communication",
        "url": "https://microservices.io/patterns/communication-style/"
      }
    ]
  },
  {
    "id": "SD-094",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "API 게이트웨이는 MSA에서 어떤 역할을 하며, 왜 필요한가요?",
    "answer": "**역할**:\r\n1. **단일 진입점**: 클라이언트에게 하나의 엔드포인트 제공\r\n2. **라우팅**: 요청을 적절한 서비스로 전달\r\n3. **인증/인가**: 중앙화된 보안 (JWT 검증, OAuth)\r\n4. **Rate Limiting**: 트래픽 제어, DDoS 방어\r\n5. **응답 집계**: 여러 서비스 응답 병합 (BFF 패턴)\r\n6. **프로토콜 변환**: REST ↔ gRPC\r\n7. **캐싱**: 응답 캐싱으로 백엔드 부하 감소\r\n\r\n**트레이드오프**:\r\n- 장점: 횡단 관심사 중앙화, 서비스 변경 시 클라이언트 영향 최소화\r\n- 단점: SPOF 위험, 추가 네트워크 홉, 병목 가능\r\n\r\n**대규모 시스템 고려**:\r\n- Gateway 고가용성 (클러스터링, 다중 리전)\r\n- 분산 트레이싱 통합",
    "references": [
      {
        "title": "Kong Gateway",
        "url": "https://docs.konghq.com/"
      }
    ]
  },
  {
    "id": "SD-095",
    "category": "system_design",
    "categoryName": "시스템 설계",
    "section": "etc",
    "question": "서비스 메시(Service Mesh)는 무엇이며, API 게이트웨이나 기존 라이브러리 방식(예: Spring Cloud)의 서비스 간 통신과 어떻게 다른가요?",
    "answer": "**Service Mesh 정의**: 서비스 간 통신을 담당하는 **전용 인프라 계층**, Sidecar Proxy 배치\r\n\r\n**차이점**:\r\n| 비교 | API Gateway | Library | Service Mesh |\r\n|------|-------------|---------|--------------|\r\n| 위치 | Edge (외부 경계) | 애플리케이션 내 | Sidecar (각 Pod) |\r\n| 범위 | North-South | 애플리케이션 | East-West |\r\n| 언어 의존 | 무관 | 언어별 | 무관 |\r\n| 업데이트 | Gateway만 | 앱 재배포 | Proxy만 |\r\n\r\n**Service Mesh 기능**: mTLS, 트래픽 관리, 관찰성, 회복력\r\n\r\n**트레이드오프**:\r\n- 장점: 언어 독립적, 일관된 정책, 앱 코드 간소화\r\n- 단점: 운영 복잡도 증가, 추가 리소스, 디버깅 어려움\r\n\r\n**도입 시점**: 다양한 언어 혼용, 엄격한 보안 요구, 대규모 MSA (10개 이상)\r\n\r\n**예시**: Istio, Linkerd, Consul Connect",
    "references": [
      {
        "title": "Istio Documentation",
        "url": "https://istio.io/latest/docs/"
      }
    ]
  },
  {
    "id": "WS-001",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket의 기본 개념과 HTTP와의 차이점은 무엇인가요?",
    "answer": "**WebSocket이란?**\r\n- 클라이언트와 서버 간 **양방향 전이중(Full-Duplex) 통신**을 제공하는 프로토콜\r\n- 단일 TCP 연결을 통해 지속적인 통신 가능\r\n- `ws://` (비암호화) 또는 `wss://` (TLS 암호화) 스킴 사용\r\n\r\n**HTTP와의 주요 차이점**\r\n\r\n| 구분 | HTTP | WebSocket |\r\n|------|------|-----------|\r\n| 통신 방식 | 요청-응답 (반이중) | 양방향 (전이중) |\r\n| 연결 | 요청-응답 후 종료 (Keep-Alive로 재사용 가능) | 한 번 연결 후 지속 유지 |\r\n| 오버헤드 | 매 요청마다 헤더 전송 | 초기 핸드셰이크 후 2-14바이트 프레임 헤더 |\r\n| 서버 푸시 | 불가 (폴링 필요) | 언제든 가능 |\r\n| 상태 | Stateless | Stateful |\r\n\r\n**참고**: HTTP/1.1의 Keep-Alive는 연결을 재사용하지만, 여전히 요청-응답 패턴이며 서버가 먼저 데이터를 보낼 수 없습니다.",
    "references": [
      {
        "title": "RFC 6455 - The WebSocket Protocol",
        "url": "https://datatracker.ietf.org/doc/html/rfc6455"
      },
      {
        "title": "MDN WebSocket API",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/WebSocket"
      }
    ]
  },
  {
    "id": "WS-002",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 연결 수립 시 HTTP Upgrade를 사용한 Handshake 과정은 어떻게 진행되나요?",
    "answer": "**WebSocket Handshake 과정**\r\n\r\nWebSocket 연결은 HTTP Upgrade 요청으로 시작됩니다.\r\n\r\n**1. 클라이언트 요청**\r\n```http\r\nGET /chat HTTP/1.1\r\nHost: server.example.com\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\r\nSec-WebSocket-Version: 13\r\n```\r\n\r\n**2. 서버 응답**\r\n```http\r\nHTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=\r\n```\r\n\r\n**주요 헤더 설명**\r\n- `Upgrade: websocket`: 프로토콜 업그레이드 요청\r\n- `Connection: Upgrade`: 연결 업그레이드 의사 표시\r\n- `Sec-WebSocket-Key`: 클라이언트가 생성한 16바이트 랜덤 값의 Base64 인코딩\r\n- `Sec-WebSocket-Accept`: 서버 응답 검증용\r\n  ```\r\n  Accept = Base64(SHA-1(Key + \"258EAFA5-E914-47DA-95CA-C5AB0DC85B11\"))\r\n  ```\r\n  - GUID는 RFC 6455에 정의된 고정 문자열\r\n  - 서버가 WebSocket을 이해함을 증명 (프록시 오동작 방지)\r\n- `Sec-WebSocket-Version`: 프로토콜 버전 (현재 13, RFC 6455)\r\n- `Sec-WebSocket-Protocol`: (선택) 서브프로토콜 협상 (예: `graphql-ws`)\r\n- `Sec-WebSocket-Extensions`: (선택) 확장 협상 (예: `permessage-deflate`)",
    "references": [
      {
        "title": "RFC 6455 Section 4 - Opening Handshake",
        "url": "https://datatracker.ietf.org/doc/html/rfc6455#section-4"
      }
    ]
  },
  {
    "id": "WS-003",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 연결 수립 후 데이터 전송 시 사용되는 메시지 프레이밍(message framing) 메커니즘에 대해 설명해주세요.",
    "answer": "**WebSocket 프레임 구조**\r\n\r\n```\r\n 0                   1                   2                   3\r\n 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1\r\n+-+-+-+-+-------+-+-------------+-------------------------------+\r\n|F|R|R|R| opcode|M| Payload len |    Extended payload length    |\r\n|I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |\r\n|N|V|V|V|       |S|             |   (if payload len==126/127)   |\r\n| |1|2|3|       |K|             |                               |\r\n+-+-+-+-+-------+-+-------------+-------------------------------+\r\n|     Masking-key (if MASK set)  |          Payload Data        |\r\n+--------------------------------+-------------------------------+\r\n```\r\n\r\n**주요 필드**\r\n- **FIN**: 메시지의 마지막 프레임인지 표시 (1비트)\r\n- **RSV1-3**: 확장용 예약 비트 (permessage-deflate가 RSV1 사용)\r\n- **Opcode**: 프레임 타입 (4비트)\r\n  - `0x0`: Continuation (분할 메시지의 후속 프레임)\r\n  - `0x1`: Text (UTF-8 텍스트)\r\n  - `0x2`: Binary (바이너리 데이터)\r\n  - `0x8`: Close, `0x9`: Ping, `0xA`: Pong (제어 프레임)\r\n- **MASK**: 마스킹 여부 (1비트)\r\n  - 클라이언트→서버: **반드시 1** (MUST)\r\n  - 서버→클라이언트: **반드시 0** (MUST NOT)\r\n- **Payload length**: 페이로드 크기\r\n  - 0-125: 7비트로 직접 표현\r\n  - 126: 다음 2바이트가 실제 길이 (16비트)\r\n  - 127: 다음 8바이트가 실제 길이 (64비트)\r\n\r\n**마스킹의 목적 (중요)**\r\n- 프록시 캐시 포이즈닝 공격 방지\r\n- 클라이언트가 매 프레임마다 랜덤 4바이트 마스킹 키 생성\r\n- 마스킹되지 않은 클라이언트 프레임 수신 시 연결 종료 (MUST)",
    "references": [
      {
        "title": "RFC 6455 Section 5 - Data Framing",
        "url": "https://datatracker.ietf.org/doc/html/rfc6455#section-5"
      }
    ]
  },
  {
    "id": "WS-004",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "Long Polling과 WebSocket의 차이점은 무엇인가요?",
    "answer": "| 구분 | Long Polling | WebSocket | SSE |\r\n|------|--------------|-----------|-----|\r\n| **연결 방식** | HTTP 요청을 길게 유지 | 단일 TCP 연결 유지 | HTTP 스트림 유지 |\r\n| **통신 방향** | 단방향 (요청-응답) | 양방향 | 단방향 (서버→클라이언트) |\r\n| **오버헤드** | 매 요청마다 HTTP 헤더 | 핸드셰이크 후 2-14바이트 | HTTP 스트림이라 중간 |\r\n| **지연시간** | 응답 후 재연결 필요 | 실시간 | 실시간 |\r\n| **서버 부하** | 연결 재설정 비용 높음 | 연결 유지 비용만 | 연결 유지 비용 |\r\n| **호환성** | 모든 브라우저/프록시 | 일부 프록시 문제 가능 | HTTP 기반이라 좋음 |\r\n| **재연결** | 직접 구현 | 직접 구현 | 자동 재연결 내장 |\r\n| **데이터 형식** | 모두 가능 | 텍스트/바이너리 | 텍스트만 (UTF-8) |\r\n\r\n**Long Polling 동작**\r\n1. 클라이언트가 요청 전송\r\n2. 서버는 이벤트가 발생할 때까지 응답 대기 (보통 20-30초 타임아웃)\r\n3. 이벤트 발생 시 응답 반환\r\n4. 클라이언트가 즉시 새 요청 전송 (반복)\r\n\r\n**선택 기준 (트레이드오프)**\r\n| 상황 | 권장 기술 | 이유 |\r\n|------|-----------|------|\r\n| 양방향 실시간 (채팅, 게임) | WebSocket | 클라이언트→서버 즉시 전송 필요 |\r\n| 단방향 실시간 (알림, 주식) | SSE | 간단하고 자동 재연결 지원 |\r\n| 레거시/프록시 환경 | Long Polling | 호환성 최고, 폴백용 |\r\n| 바이너리 데이터 스트리밍 | WebSocket | SSE는 텍스트만 지원 |\r\n| 빠른 프로토타이핑 | SSE | 구현이 가장 간단 |",
    "references": []
  },
  {
    "id": "WS-005",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 통신에서 보안을 강화하기 위한 주요 고려 사항은 무엇인가요?",
    "answer": "**1. WSS (WebSocket Secure) 사용**\r\n- `wss://` 프로토콜로 TLS/SSL 암호화 적용\r\n- 중간자 공격(MITM) 방지\r\n\r\n**2. Origin 검증**\r\n```javascript\r\n// 서버 측 Origin 헤더 검증\r\nif (request.headers.origin !== 'https://trusted-domain.com') {\r\n  reject();\r\n}\r\n```\r\n\r\n**3. 인증 및 토큰 관리**\r\n- 핸드셰이크 시 JWT 토큰 검증\r\n- 쿼리 파라미터나 첫 메시지로 토큰 전달\r\n- 토큰 만료 시 연결 종료 처리\r\n\r\n**4. 입력 검증**\r\n- 모든 수신 메시지의 형식 및 크기 검증\r\n- XSS, 인젝션 공격 방지\r\n\r\n**5. Rate Limiting**\r\n- 메시지 빈도 제한으로 DoS 공격 방지\r\n- 연결 수 제한\r\n\r\n**6. 메시지 크기 제한**\r\n- 최대 프레임/메시지 크기 설정\r\n- 메모리 고갈 공격 방지\r\n\r\n**7. 마스킹 검증 (서버)**\r\n```javascript\r\n// RFC 6455: 클라이언트→서버 메시지는 반드시 마스킹되어야 함\r\n// 마스킹되지 않은 프레임 수신 시 연결 종료\r\nwss.on('connection', (ws) => {\r\n  // ws 라이브러리는 자동으로 마스킹 검증\r\n  // 직접 구현 시 MASK 비트 확인 필수\r\n});\r\n```\r\n\r\n**흔한 실수와 함정**\r\n| 실수 | 위험 | 해결 |\r\n|------|------|------|\r\n| Origin 검증 안 함 | CSWSH 공격 | 화이트리스트 검증 |\r\n| ws:// 사용 | 평문 노출 | wss:// 필수 |\r\n| 쿼리 파라미터에 토큰 | URL 로깅에 노출 | 첫 메시지로 전송 |\r\n| 토큰 만료 미처리 | 무한 세션 유지 | 주기적 재검증 |",
    "references": [
      {
        "title": "OWASP WebSocket Security",
        "url": "https://owasp.org/www-project-web-security-testing-guide/"
      },
      {
        "title": "RFC 6455 Section 10 - Security Considerations",
        "url": "https://datatracker.ietf.org/doc/html/rfc6455#section-10"
      }
    ]
  },
  {
    "id": "WS-006",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 연결이 끊어졌을 때 재연결(reconnect) 로직은 어떻게 구현하나요?",
    "answer": "**재연결 구현 핵심 요소**\r\n\r\n**1. Exponential Backoff (지수 백오프)**\r\n```javascript\r\nclass WebSocketClient {\r\n  constructor(url) {\r\n    this.url = url;\r\n    this.reconnectDelay = 1000; // 초기 1초\r\n    this.maxDelay = 30000;      // 최대 30초\r\n    this.connect();\r\n  }\r\n\r\n  connect() {\r\n    this.ws = new WebSocket(this.url);\r\n\r\n    this.ws.onopen = () => {\r\n      this.reconnectDelay = 1000; // 성공 시 초기화\r\n    };\r\n\r\n    this.ws.onclose = (event) => {\r\n      if (!event.wasClean) {\r\n        setTimeout(() => this.connect(), this.reconnectDelay);\r\n        this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.maxDelay);\r\n      }\r\n    };\r\n  }\r\n}\r\n```\r\n\r\n**2. 고려사항**\r\n- **Jitter 추가**: 다수 클라이언트 동시 재연결 방지 (Thundering Herd 문제)\r\n  ```javascript\r\n  // Jitter: 지연 시간의 0~50%를 랜덤하게 추가\r\n  const jitter = this.reconnectDelay * Math.random() * 0.5;\r\n  setTimeout(() => this.connect(), this.reconnectDelay + jitter);\r\n  ```\r\n- **최대 재시도 횟수**: 무한 재시도 방지\r\n- **상태 복구**: 재연결 후 구독 정보 재전송\r\n- **오프라인 감지**: `navigator.onLine` 활용\r\n  ```javascript\r\n  window.addEventListener('online', () => this.connect());\r\n  window.addEventListener('offline', () => this.disconnect());\r\n  ```\r\n\r\n**3. 라이브러리 활용**\r\n- Socket.IO: 자동 재연결 내장\r\n- ReconnectingWebSocket: 경량 재연결 래퍼",
    "references": []
  },
  {
    "id": "WS-007",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 프로토콜에서 사용되는 상태 코드와 그 의미에 대해 설명해주세요.",
    "answer": "**주요 Close 상태 코드 (RFC 6455)**\r\n\r\n| 코드 | 이름 | 설명 | 전송 가능 여부 |\r\n|------|------|------|----------------|\r\n| **1000** | Normal Closure | 정상 종료 | O |\r\n| **1001** | Going Away | 서버 셧다운, 브라우저 이탈 | O |\r\n| **1002** | Protocol Error | 프로토콜 오류 | O |\r\n| **1003** | Unsupported Data | 지원하지 않는 데이터 타입 | O |\r\n| **1005** | No Status Received | 상태 코드 없이 종료됨 | X (API 전용) |\r\n| **1006** | Abnormal Closure | 비정상 종료 (TCP 끊김) | X (API 전용) |\r\n| **1007** | Invalid Payload | 잘못된 데이터 (예: UTF-8 오류) | O |\r\n| **1008** | Policy Violation | 정책 위반 | O |\r\n| **1009** | Message Too Big | 메시지 크기 초과 | O |\r\n| **1010** | Mandatory Extension | 필수 확장 미지원 (클라이언트만) | O |\r\n| **1011** | Internal Error | 서버 내부 오류 | O |\r\n| **1015** | TLS Handshake | TLS 핸드셰이크 실패 | X (API 전용) |\r\n\r\n**중요**: 1005, 1006, 1015는 Close 프레임으로 전송하면 안 됩니다 (MUST NOT). 이 코드들은 WebSocket API가 애플리케이션에 상태를 알리기 위해 내부적으로 사용합니다.\r\n\r\n**사용자 정의 코드 범위**\r\n- `3000-3999`: 라이브러리/프레임워크용 (IANA 등록 가능)\r\n- `4000-4999`: 애플리케이션용 (비공개 사용)\r\n\r\n**사용 예시**\r\n```javascript\r\nws.close(1000, 'Normal closure');\r\n\r\nws.onclose = (event) => {\r\n  console.log(`Code: ${event.code}, Reason: ${event.reason}`);\r\n};\r\n```",
    "references": [
      {
        "title": "RFC 6455 Section 7.4 - Status Codes",
        "url": "https://datatracker.ietf.org/doc/html/rfc6455#section-7.4"
      }
    ]
  },
  {
    "id": "WS-008",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket의 Ping/Pong 메커니즘이 연결 상태 확인 및 연결 유지(Keep-Alive)에 어떻게 활용되는지 설명해주세요.",
    "answer": "**Ping/Pong 개념**\r\n- WebSocket 제어 프레임 (Opcode: Ping=0x9, Pong=0xA)\r\n- 연결 상태 확인 및 유지(Keep-Alive) 목적\r\n\r\n**동작 방식**\r\n1. 한 쪽이 Ping 프레임 전송 (Application Data 포함 가능, 최대 125바이트)\r\n2. 수신 측은 **반드시** 동일한 Application Data로 Pong 응답 (MUST)\r\n3. 응답 없으면 연결 끊김으로 판단\r\n4. Pong은 Ping 없이도 전송 가능 (단방향 heartbeat)\r\n\r\n**주의사항**\r\n- 브라우저 WebSocket API는 Ping/Pong을 직접 노출하지 않음\r\n- 브라우저는 Ping 수신 시 자동으로 Pong 응답\r\n- 애플리케이션 레벨 heartbeat가 필요하면 일반 메시지로 구현\r\n\r\n**활용 목적**\r\n- **연결 상태 확인**: Dead connection 감지\r\n- **NAT/방화벽 타임아웃 방지**: 주기적 트래픽으로 연결 유지\r\n- **지연시간 측정**: RTT(Round Trip Time) 계산\r\n\r\n**구현 예시**\r\n```javascript\r\n// Node.js ws 라이브러리\r\nconst WebSocket = require('ws');\r\nconst wss = new WebSocket.Server({ port: 8080 });\r\n\r\nwss.on('connection', (ws) => {\r\n  ws.isAlive = true;\r\n  ws.on('pong', () => { ws.isAlive = true; });\r\n});\r\n\r\n// 30초마다 Ping\r\nsetInterval(() => {\r\n  wss.clients.forEach((ws) => {\r\n    if (!ws.isAlive) return ws.terminate();\r\n    ws.isAlive = false;\r\n    ws.ping();\r\n  });\r\n}, 30000);\r\n```",
    "references": [
      {
        "title": "RFC 6455 Section 5.5.2 - Ping",
        "url": "https://datatracker.ietf.org/doc/html/rfc6455#section-5.5.2"
      }
    ]
  },
  {
    "id": "WS-009",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 확장(extensions) 기능은 무엇이며, 어떤 용도로 사용되나요?",
    "answer": "**WebSocket 확장이란?**\r\n- 기본 WebSocket 프로토콜에 추가 기능을 제공하는 메커니즘\r\n- 핸드셰이크 시 `Sec-WebSocket-Extensions` 헤더로 협상\r\n\r\n**대표적인 확장**\r\n\r\n**1. permessage-deflate (RFC 7692)**\r\n- 메시지 압축 확장\r\n- zlib/DEFLATE 알고리즘 사용\r\n- 대역폭 절약 (텍스트 데이터 70-90% 압축)\r\n\r\n```http\r\nSec-WebSocket-Extensions: permessage-deflate; client_max_window_bits\r\n```\r\n\r\n**2. 사용 예시**\r\n```javascript\r\n// Node.js ws 라이브러리\r\nconst WebSocket = require('ws');\r\nconst wss = new WebSocket.Server({\r\n  port: 8080,\r\n  perMessageDeflate: {\r\n    zlibDeflateOptions: { chunkSize: 1024, level: 3 },\r\n    threshold: 1024  // 1KB 이상만 압축\r\n  }\r\n});\r\n```\r\n\r\n**주의사항**\r\n- 압축/해제에 CPU 오버헤드 발생\r\n- 작은 메시지는 압축 효율 낮음\r\n- 이미 압축된 데이터(이미지 등)는 비효율적",
    "references": [
      {
        "title": "RFC 7692 - Compression Extensions",
        "url": "https://datatracker.ietf.org/doc/html/rfc7692"
      }
    ]
  },
  {
    "id": "WS-010",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 구현 시 발생할 수 있는 Cross-Origin 문제와 그 해결 방법은 무엇인가요?",
    "answer": "**WebSocket과 CORS의 관계**\r\n\r\nWebSocket은 HTTP CORS 정책(preflight OPTIONS 요청)의 적용을 받지 **않습니다**. 이것이 보안상 위험한 이유:\r\n- **CORS preflight 없음**: 브라우저가 사전 검사 없이 바로 연결 시도\r\n- **Origin 헤더 전송**: 브라우저는 `Origin` 헤더를 전송하지만, 서버 검증이 필수는 아님\r\n- **쿠키 자동 전송**: 동일 도메인이면 인증 쿠키가 자동으로 포함됨\r\n\r\n**브라우저 동작**\r\n- 브라우저는 핸드셰이크 시 `Origin` 헤더를 자동 전송\r\n- **서버가 검증하지 않으면** 어떤 Origin에서든 연결 가능\r\n- CORS처럼 브라우저가 차단하지 않음 (서버 책임)\r\n\r\n**보안 문제: CSWSH (Cross-Site WebSocket Hijacking)**\r\n- 악성 사이트에서 사용자의 인증된 세션으로 WebSocket 연결 시도\r\n- 서버가 Origin을 검증하지 않으면 공격자가 사용자 대신 통신 가능\r\n- CSRF와 유사하지만, WebSocket은 지속적 양방향 통신이므로 더 위험\r\n\r\n**해결 방법**\r\n\r\n**1. 서버 측 Origin 검증**\r\n```javascript\r\nconst wss = new WebSocket.Server({\r\n  port: 8080,\r\n  verifyClient: (info) => {\r\n    const allowedOrigins = ['https://mysite.com'];\r\n    return allowedOrigins.includes(info.origin);\r\n  }\r\n});\r\n```\r\n\r\n**2. 토큰 기반 인증**\r\n- 핸드셰이크 URL에 일회용 토큰 포함\r\n- 첫 메시지에서 JWT 검증\r\n\r\n**3. CSRF 토큰 활용**\r\n- 기존 웹 애플리케이션의 CSRF 토큰 재사용",
    "references": []
  },
  {
    "id": "WS-011",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "단일 서버와 클러스터 환경에서의 WebSocket 구현 차이점은 무엇인가요?",
    "answer": "**단일 서버 환경**\r\n- 모든 연결이 하나의 서버 메모리에 존재\r\n- 브로드캐스트가 간단 (로컬 연결만 순회)\r\n- 수직 확장의 한계\r\n\r\n**클러스터 환경의 문제점**\r\n- 클라이언트 A와 B가 서로 다른 서버에 연결\r\n- A가 B에게 메시지를 보내려면 서버 간 통신 필요\r\n- Sticky Session만으로는 불충분\r\n\r\n**해결 방법**\r\n\r\n**1. Pub/Sub 백엔드 (권장)**\r\n```javascript\r\n// Redis Pub/Sub 활용\r\nconst Redis = require('ioredis');\r\nconst pub = new Redis();\r\nconst sub = new Redis();\r\n\r\nsub.subscribe('chat');\r\nsub.on('message', (channel, message) => {\r\n  // 로컬 연결들에게 브로드캐스트\r\n  localClients.forEach(ws => ws.send(message));\r\n});\r\n\r\n// 메시지 발행\r\npub.publish('chat', JSON.stringify(data));\r\n```\r\n\r\n**2. 외부 메시지 브로커**\r\n- Redis, Kafka, RabbitMQ 등 활용\r\n- 서버 간 메시지 동기화\r\n\r\n**3. Socket.IO Redis Adapter**\r\n```javascript\r\nconst { createAdapter } = require('@socket.io/redis-adapter');\r\nio.adapter(createAdapter(pubClient, subClient));\r\n```\r\n\r\n**스케일링 고려사항**\r\n\r\n| 규모 | 연결 수 | 권장 아키텍처 |\r\n|------|---------|---------------|\r\n| 소규모 | ~1만 | 단일 서버 + Redis |\r\n| 중규모 | 1-10만 | 다중 서버 + Redis Pub/Sub |\r\n| 대규모 | 10만+ | Kafka/NATS + 샤딩 |\r\n\r\n**실제 운영 시 고려점**\r\n- **Sticky Session의 한계**: 서버 장애 시 재연결이 다른 서버로 가면 상태 유실\r\n- **Redis Pub/Sub 병목**: 대량 브로드캐스트 시 Redis가 병목 가능\r\n- **연결 재분배**: 서버 추가 시 기존 연결은 자동 재분배되지 않음\r\n- **상태 저장소 분리**: 연결 상태는 Redis, 영속 데이터는 DB",
    "references": [
      {
        "title": "Socket.IO Redis Adapter",
        "url": "https://socket.io/docs/v4/redis-adapter/"
      }
    ]
  },
  {
    "id": "WS-012",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket에서 텍스트와 이진 데이터 전송 방식의 장단점은 무엇인가요?",
    "answer": "**데이터 프레임 타입**\r\n- **Text Frame (Opcode 0x1)**: UTF-8 인코딩 문자열\r\n- **Binary Frame (Opcode 0x2)**: 바이트 배열\r\n\r\n**텍스트 데이터 (JSON 등)**\r\n\r\n| 장점 | 단점 |\r\n|------|------|\r\n| 사람이 읽기 쉬움 | 크기가 큼 (Base64 인코딩 시 33% 증가) |\r\n| 디버깅 용이 | 파싱 오버헤드 |\r\n| 호환성 높음 | 바이너리 데이터 표현 비효율적 |\r\n\r\n```javascript\r\n// 텍스트 전송\r\nws.send(JSON.stringify({ type: 'message', data: 'Hello' }));\r\n```\r\n\r\n**이진 데이터 (Protobuf, MessagePack 등)**\r\n\r\n| 장점 | 단점 |\r\n|------|------|\r\n| 작은 페이로드 크기 | 디버깅 어려움 |\r\n| 파싱 속도 빠름 | 스키마 관리 필요 |\r\n| 바이너리 데이터 직접 전송 | 추가 라이브러리 필요 |\r\n\r\n```javascript\r\n// ArrayBuffer 전송\r\nconst buffer = new ArrayBuffer(8);\r\nws.send(buffer);\r\n\r\n// Blob 전송\r\nconst blob = new Blob([data], { type: 'application/octet-stream' });\r\nws.send(blob);\r\n```\r\n\r\n**선택 기준**\r\n- 실시간 게임/미디어 스트리밍 → Binary\r\n- 일반 채팅/알림 → Text (JSON)\r\n- 대용량 트래픽 + 성능 중요 → Binary (Protobuf)",
    "references": [
      {
        "title": "RFC 6455 Section 5.6 - Data Frames",
        "url": "https://datatracker.ietf.org/doc/html/rfc6455#section-5.6"
      }
    ]
  },
  {
    "id": "WS-013",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "실시간 채팅이나 게임 애플리케이션에서 WebSocket이 선호되는 이유는 무엇인가요?",
    "answer": "**실시간 애플리케이션 요구사항**\r\n1. **낮은 지연시간**: 메시지가 즉시 전달되어야 함\r\n2. **양방향 통신**: 서버도 클라이언트에 능동적으로 푸시\r\n3. **빈번한 메시지**: 초당 수십~수백 건의 이벤트\r\n\r\n**WebSocket이 적합한 이유**\r\n\r\n| 요구사항 | HTTP Polling | WebSocket |\r\n|----------|--------------|-----------|\r\n| 지연시간 | 폴링 간격만큼 지연 | 실시간 (~ms) |\r\n| 오버헤드 | 매번 HTTP 헤더 | 2-14바이트 프레임 헤더 |\r\n| 서버 푸시 | 불가능 | 가능 |\r\n| 연결 수 | 요청마다 새 연결 | 단일 연결 유지 |\r\n\r\n**채팅 애플리케이션 예시**\r\n```javascript\r\n// 서버: 새 메시지를 모든 참여자에게 즉시 푸시\r\nwss.clients.forEach(client => {\r\n  if (client.readyState === WebSocket.OPEN) {\r\n    client.send(JSON.stringify({ type: 'chat', message }));\r\n  }\r\n});\r\n```\r\n\r\n**게임 애플리케이션 예시**\r\n- 캐릭터 위치 동기화 (초당 30-60회 업데이트)\r\n- 실시간 액션 입력 전달\r\n- 게임 상태 브로드캐스트\r\n\r\n**대안과 비교**\r\n| 기술 | 양방향 | 지연시간 | 복잡도 | 적합한 용도 |\r\n|------|--------|----------|--------|-------------|\r\n| **WebSocket** | O | ~ms | 중간 | 채팅, 게임, 협업 |\r\n| **SSE** | X (단방향) | ~ms | 낮음 | 알림, 피드, 대시보드 |\r\n| **Long Polling** | X | 높음 | 낮음 | 레거시 환경 폴백 |\r\n| **WebRTC** | O (P2P) | ~ms | 높음 | 영상통화, 화면공유 |\r\n| **gRPC Streaming** | O | ~ms | 중간 | 마이크로서비스 |\r\n\r\n**WebRTC vs WebSocket**\r\n- WebRTC: 브라우저 간 P2P, 미디어 스트리밍에 최적화\r\n- WebSocket: 클라이언트-서버, 텍스트/바이너리 메시지에 최적화",
    "references": []
  },
  {
    "id": "WS-014",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 서버의 부하 분산(load balancing) 전략에는 어떤 것들이 있나요?",
    "answer": "**WebSocket 로드밸런싱의 특수성**\r\n- HTTP와 달리 장시간 연결 유지 (Stateful)\r\n- 한 번 연결되면 같은 서버와 통신해야 함\r\n\r\n**1. Sticky Session (Session Affinity)**\r\n```nginx\r\n# Nginx 설정\r\nupstream websocket {\r\n    ip_hash;  # 클라이언트 IP 기반\r\n    server backend1:8080;\r\n    server backend2:8080;\r\n}\r\n```\r\n- 같은 클라이언트는 항상 같은 서버로 라우팅\r\n- IP 해시, 쿠키 기반 등 방식 존재\r\n\r\n**2. L4 로드밸런싱**\r\n- TCP 레벨에서 연결 분산\r\n- WebSocket Upgrade 후에도 연결 유지\r\n- AWS NLB, HAProxy 등\r\n\r\n**3. L7 로드밸런싱**\r\n- HTTP Upgrade 요청 분석 가능\r\n- 경로/헤더 기반 라우팅\r\n- Nginx, Envoy, AWS ALB\r\n\r\n**Nginx WebSocket 프록시 설정**\r\n```nginx\r\nlocation /ws/ {\r\n    proxy_pass http://websocket;\r\n    proxy_http_version 1.1;\r\n    proxy_set_header Upgrade $http_upgrade;\r\n    proxy_set_header Connection \"upgrade\";\r\n    proxy_read_timeout 86400;  # 타임아웃 연장\r\n}\r\n```\r\n\r\n**4. 서버 간 동기화 (필수)**\r\n- Redis Pub/Sub, Kafka 등으로 메시지 동기화\r\n- 어떤 서버로 연결되든 메시지 수신 보장",
    "references": [
      {
        "title": "Nginx WebSocket Proxying",
        "url": "https://nginx.org/en/docs/http/websocket.html"
      }
    ]
  },
  {
    "id": "WS-015",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "대규모 WebSocket 연결 환경에서 메모리 및 리소스 관리 방법은 무엇인가요?",
    "answer": "**리소스 관리의 중요성**\r\n- 수만 개의 동시 연결 시 메모리 사용량 급증\r\n- 유휴 연결도 리소스 점유\r\n\r\n**1. 연결 수 제한**\r\n```javascript\r\nconst MAX_CONNECTIONS = 10000;\r\nlet connectionCount = 0;\r\n\r\nwss.on('connection', (ws) => {\r\n  if (connectionCount >= MAX_CONNECTIONS) {\r\n    ws.close(1013, 'Try again later');\r\n    return;\r\n  }\r\n  connectionCount++;\r\n  ws.on('close', () => connectionCount--);\r\n});\r\n```\r\n\r\n**2. 유휴 연결 정리**\r\n```javascript\r\n// Heartbeat로 비활성 연결 감지\r\nconst IDLE_TIMEOUT = 60000;\r\n\r\nws.isAlive = true;\r\nws.on('pong', () => { ws.isAlive = true; });\r\n\r\nsetInterval(() => {\r\n  wss.clients.forEach(ws => {\r\n    if (!ws.isAlive) return ws.terminate();\r\n    ws.isAlive = false;\r\n    ws.ping();\r\n  });\r\n}, IDLE_TIMEOUT);\r\n```\r\n\r\n**3. 메시지 버퍼 제한**\r\n```javascript\r\nconst ws = new WebSocket.Server({\r\n  maxPayload: 1024 * 1024,  // 최대 1MB\r\n  backlog: 100              // 연결 대기열 제한\r\n});\r\n```\r\n\r\n**4. 메모리 모니터링**\r\n- 연결당 메모리 사용량 추적\r\n- 임계치 도달 시 알림/조치\r\n\r\n**5. 연결 풀링 및 그룹화**\r\n```javascript\r\n// 채널/룸 기반 연결 관리\r\nconst rooms = new Map();\r\n\r\nfunction joinRoom(ws, roomId) {\r\n  if (!rooms.has(roomId)) rooms.set(roomId, new Set());\r\n  rooms.get(roomId).add(ws);\r\n}\r\n\r\nfunction leaveRoom(ws, roomId) {\r\n  rooms.get(roomId)?.delete(ws);\r\n}\r\n```\r\n\r\n**6. OS 레벨 튜닝**\r\n```bash\r\n# 파일 디스크립터 제한 증가\r\nulimit -n 65535\r\n# TCP 소켓 버퍼 조정\r\nsysctl -w net.core.rmem_max=16777216\r\n```",
    "references": []
  },
  {
    "id": "WS-016",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket과 HTTP/2의 주요 차이점은 무엇인가요?",
    "answer": "**기본 비교**\r\n\r\n| 구분 | WebSocket | HTTP/2 |\r\n|------|-----------|--------|\r\n| **목적** | 양방향 실시간 통신 | HTTP 성능 개선 |\r\n| **연결** | 단일 TCP 연결 유지 | 단일 TCP, 멀티플렉싱 |\r\n| **통신 방향** | 전이중 (Full-Duplex) | 요청-응답 기반 |\r\n| **서버 푸시** | 자유로운 서버→클라이언트 | 리소스 프리로드 한정 |\r\n| **프레이밍** | WebSocket 프레임 | HTTP/2 프레임 |\r\n\r\n**HTTP/2 특징**\r\n- **멀티플렉싱**: 하나의 연결에서 여러 요청/응답 병렬 처리\r\n- **헤더 압축**: HPACK으로 반복 헤더 압축\r\n- **Server Push**: 클라이언트 요청 전에 리소스 전송 (캐시 용도)\r\n  - **주의**: Chrome 106+에서 HTTP/2 Server Push 지원 제거됨\r\n  - 실시간 푸시 용도로는 적합하지 않음\r\n- **스트림 우선순위**: 중요한 리소스 먼저 전송\r\n\r\n**WebSocket 특징**\r\n- **진정한 양방향**: 서버가 언제든 메시지 전송 가능\r\n- **낮은 오버헤드**: 핸드셰이크 후 최소 프레임 헤더\r\n- **애플리케이션 프로토콜 자유도**: 메시지 형식 자유 정의\r\n\r\n**선택 기준**\r\n- **WebSocket**: 실시간 채팅, 게임, 협업 도구 등 양방향 필수\r\n- **HTTP/2**: 웹사이트 로딩 최적화, API 호출 (REST)\r\n\r\n**WebSocket over HTTP/2 (RFC 8441)**\r\n- HTTP/2 연결 위에서 WebSocket 사용 가능\r\n- 연결 효율성 + 양방향 통신 장점 결합",
    "references": [
      {
        "title": "RFC 7540 - HTTP/2",
        "url": "https://datatracker.ietf.org/doc/html/rfc7540"
      },
      {
        "title": "RFC 8441 - WebSocket over HTTP/2",
        "url": "https://datatracker.ietf.org/doc/html/rfc8441"
      }
    ]
  },
  {
    "id": "WS-017",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 연결의 성능 최적화를 위한 고려사항은 무엇인가요?",
    "answer": "**1. 메시지 최적화**\r\n\r\n**직렬화 포맷 선택**\r\n```javascript\r\n// JSON (가독성) vs Binary (성능)\r\n// Protobuf 예시\r\nconst message = MyMessage.encode({ id: 1, data: 'test' }).finish();\r\nws.send(message);\r\n```\r\n\r\n| 포맷 | 크기 | 속도 | 사용 사례 |\r\n|------|------|------|-----------|\r\n| JSON | 큼 | 보통 | 일반 웹앱 |\r\n| MessagePack | 작음 | 빠름 | 모바일 앱 |\r\n| Protobuf | 매우 작음 | 매우 빠름 | 고성능 시스템 |\r\n\r\n**2. 메시지 배치 처리**\r\n```javascript\r\n// 여러 메시지를 묶어서 전송\r\nconst batch = [];\r\nsetInterval(() => {\r\n  if (batch.length > 0) {\r\n    ws.send(JSON.stringify(batch));\r\n    batch.length = 0;\r\n  }\r\n}, 50);  // 50ms마다 배치 전송\r\n```\r\n\r\n**3. 압축 활용**\r\n```javascript\r\n// permessage-deflate 확장\r\nconst wss = new WebSocket.Server({\r\n  perMessageDeflate: {\r\n    threshold: 1024  // 1KB 이상만 압축\r\n  }\r\n});\r\n```\r\n\r\n**4. 연결 풀링**\r\n- 단일 연결로 여러 채널 멀티플렉싱\r\n- 연결 수 최소화\r\n\r\n**5. Backpressure 처리**\r\n```javascript\r\n// 버퍼 상태 확인\r\nif (ws.bufferedAmount < 1024 * 1024) {\r\n  ws.send(data);\r\n} else {\r\n  // 전송 지연 또는 드롭\r\n}\r\n```\r\n\r\n**6. 효율적인 브로드캐스트**\r\n```javascript\r\n// 비효율: 각 클라이언트마다 직렬화\r\nclients.forEach(ws => ws.send(JSON.stringify(data)));\r\n\r\n// 효율: 한 번 직렬화 후 전송\r\nconst payload = JSON.stringify(data);\r\nclients.forEach(ws => ws.send(payload));\r\n```",
    "references": []
  },
  {
    "id": "WS-018",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 서버 구축 시 장애 조치(failover) 방안을 어떻게 마련할 수 있나요?",
    "answer": "**1. 헬스 체크 및 자동 복구**\r\n```nginx\r\n# Nginx 헬스 체크\r\nupstream websocket {\r\n    server backend1:8080 max_fails=3 fail_timeout=30s;\r\n    server backend2:8080 max_fails=3 fail_timeout=30s;\r\n    server backend3:8080 backup;  # 백업 서버\r\n}\r\n```\r\n\r\n**2. 클라이언트 측 재연결**\r\n```javascript\r\nclass ReconnectingWebSocket {\r\n  constructor(url) {\r\n    this.servers = ['wss://server1.com', 'wss://server2.com'];\r\n    this.currentIndex = 0;\r\n    this.connect();\r\n  }\r\n\r\n  connect() {\r\n    const url = this.servers[this.currentIndex];\r\n    this.ws = new WebSocket(url);\r\n\r\n    this.ws.onerror = () => {\r\n      // 다른 서버로 failover\r\n      this.currentIndex = (this.currentIndex + 1) % this.servers.length;\r\n      setTimeout(() => this.connect(), 1000);\r\n    };\r\n  }\r\n}\r\n```\r\n\r\n**3. 상태 동기화 전략**\r\n- **Stateless 설계**: 세션 상태를 Redis 등 외부 저장소에 저장\r\n- **이벤트 소싱**: 재연결 시 마지막 이벤트부터 재전송\r\n\r\n```javascript\r\n// 재연결 시 마지막 수신 이벤트 ID 전송\r\nws.onopen = () => {\r\n  ws.send(JSON.stringify({\r\n    type: 'resume',\r\n    lastEventId: localStorage.getItem('lastEventId')\r\n  }));\r\n};\r\n```\r\n\r\n**4. 서킷 브레이커**\r\n```javascript\r\n// 연속 실패 시 빠른 실패 처리\r\nif (failureCount > THRESHOLD) {\r\n  return Promise.reject('Circuit open');\r\n}\r\n```\r\n\r\n**5. 다중 데이터센터**\r\n- DNS 기반 장애 조치\r\n- GeoDNS로 가장 가까운 서버 연결\r\n- 데이터센터 간 메시지 동기화",
    "references": []
  },
  {
    "id": "WS-019",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "클라이언트에서 WebSocket 연결 오류를 디버깅하는 방법에는 어떤 것들이 있나요?",
    "answer": "**1. 브라우저 개발자 도구**\r\n\r\n**Network 탭**\r\n- WS 필터로 WebSocket 연결만 필터링\r\n- 핸드셰이크 요청/응답 헤더 확인\r\n- Messages 탭에서 송수신 메시지 확인\r\n\r\n**Console 로깅**\r\n```javascript\r\nconst ws = new WebSocket('wss://example.com');\r\n\r\nws.onopen = () => console.log('Connected');\r\nws.onclose = (e) => console.log(`Closed: ${e.code} ${e.reason}`);\r\nws.onerror = (e) => console.error('Error:', e);\r\nws.onmessage = (e) => console.log('Received:', e.data);\r\n```\r\n\r\n**2. 이벤트 핸들러 상세 로깅**\r\n```javascript\r\nws.addEventListener('close', (event) => {\r\n  console.log({\r\n    code: event.code,\r\n    reason: event.reason,\r\n    wasClean: event.wasClean\r\n  });\r\n});\r\n```\r\n\r\n**3. 상태 코드 분석**\r\n| 코드 | 의미 | 해결 방법 |\r\n|------|------|-----------|\r\n| 1000 | 정상 종료 | 정상 동작 |\r\n| 1001 | Going Away | 서버 재시작 중, 재연결 대기 |\r\n| 1002 | 프로토콜 오류 | 프레임 형식/라이브러리 버전 확인 |\r\n| 1003 | 지원 안되는 데이터 | 텍스트/바이너리 타입 확인 |\r\n| 1006 | 비정상 종료 (API 전용) | 네트워크 끊김, TCP 타임아웃 |\r\n| 1009 | 메시지 너무 큼 | maxPayload 설정 확인 |\r\n| 1011 | 서버 내부 오류 | 서버 로그 확인 |\r\n| 1015 | TLS 실패 (API 전용) | 인증서/TLS 버전 확인 |\r\n| 4000+ | 애플리케이션 정의 | 서버 문서 참조 |\r\n\r\n**4. 외부 도구**\r\n- **Wireshark**: 패킷 레벨 분석\r\n- **wscat**: CLI WebSocket 클라이언트\r\n  ```bash\r\n  wscat -c wss://example.com/ws\r\n  ```\r\n- **Postman**: WebSocket 요청 테스트\r\n\r\n**5. 서버 측 로깅 확인**\r\n- 핸드셰이크 실패 원인\r\n- Origin 검증 실패 여부\r\n- 인증/인가 오류\r\n\r\n**6. 일반적인 문제와 해결**\r\n- **CORS 오류**: 서버 Origin 화이트리스트 확인\r\n- **SSL 오류**: wss:// 사용 시 유효한 인증서 필요\r\n- **프록시 문제**: Upgrade 헤더 전달 확인",
    "references": []
  },
  {
    "id": "WS-020",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket과 서버 푸시(Server-Sent Events)의 차이점은 무엇인가요?",
    "answer": "**기본 비교**\r\n\r\n| 구분 | WebSocket | SSE (Server-Sent Events) |\r\n|------|-----------|--------------------------|\r\n| **통신 방향** | 양방향 (Full-Duplex) | 단방향 (서버→클라이언트) |\r\n| **프로토콜** | ws:// / wss:// | HTTP/HTTPS |\r\n| **데이터 형식** | 텍스트/바이너리 | 텍스트만 (UTF-8) |\r\n| **재연결** | 직접 구현 필요 | 자동 재연결 내장 |\r\n| **브라우저 지원** | 대부분 지원 | IE 미지원 (polyfill 가능) |\r\n| **프록시 호환** | 문제 가능 | HTTP라 호환성 좋음 |\r\n| **연결 수 제한** | 도메인당 제한 없음 | HTTP/1.1: 도메인당 6개 |\r\n| **구현 복잡도** | 중간 | 매우 간단 |\r\n\r\n**SSE 특징**\r\n```javascript\r\n// 클라이언트\r\nconst eventSource = new EventSource('/events');\r\neventSource.onmessage = (e) => console.log(e.data);\r\neventSource.onerror = (e) => console.log('자동 재연결 시도...');\r\n\r\n// 서버 (Node.js)\r\nres.setHeader('Content-Type', 'text/event-stream');\r\nres.setHeader('Cache-Control', 'no-cache');\r\nres.setHeader('Connection', 'keep-alive');\r\nres.write(`id: ${eventId}\\n`);  // 재연결 시 Last-Event-ID로 복구\r\nres.write(`retry: 3000\\n`);      // 재연결 간격 (ms)\r\nres.write(`data: ${JSON.stringify(data)}\\n\\n`);\r\n```\r\n\r\n**트레이드오프 분석**\r\n\r\n| 측면 | WebSocket 유리 | SSE 유리 |\r\n|------|---------------|----------|\r\n| **양방향 통신** | 네이티브 지원 | 별도 HTTP 요청 필요 |\r\n| **바이너리 데이터** | 네이티브 지원 | Base64 인코딩 필요 |\r\n| **프록시/방화벽** | 문제 가능 | HTTP라 통과 쉬움 |\r\n| **자동 재연결** | 직접 구현 | 내장 (Last-Event-ID) |\r\n| **HTTP/2 활용** | RFC 8441 필요 | 멀티플렉싱 자동 지원 |\r\n| **메시지 복구** | 직접 구현 | Last-Event-ID로 자동 |\r\n| **구현 난이도** | 중간 | 매우 쉬움 |\r\n\r\n**HTTP/2와의 조합**\r\n- **SSE + HTTP/2**: 연결 수 제한 문제 해결 (멀티플렉싱), 클라이언트→서버는 별도 fetch\r\n- **WebSocket over HTTP/2 (RFC 8441)**: 아직 지원 브라우저 제한적\r\n\r\n**선택 기준**\r\n- **SSE**: 서버→클라이언트 위주 (알림, 주식, 뉴스), 빠른 개발, 메시지 복구 필요\r\n- **WebSocket**: 양방향 필수 (채팅, 게임), 바이너리 데이터, 고빈도 메시지",
    "references": [
      {
        "title": "MDN Server-Sent Events",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events"
      }
    ]
  },
  {
    "id": "WS-021",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "TLS/SSL을 활용하여 WebSocket 연결을 보호하는 방법에 대해 설명해주세요.",
    "answer": "**WSS (WebSocket Secure)**\r\n- `wss://` 프로토콜 사용\r\n- TLS/SSL 위에서 WebSocket 통신 암호화\r\n- HTTPS와 동일한 보안 수준\r\n\r\n**Node.js WSS 서버 설정**\r\n```javascript\r\nconst https = require('https');\r\nconst WebSocket = require('ws');\r\nconst fs = require('fs');\r\n\r\nconst server = https.createServer({\r\n  cert: fs.readFileSync('server.crt'),\r\n  key: fs.readFileSync('server.key'),\r\n  ca: fs.readFileSync('ca.crt')  // 선택적\r\n});\r\n\r\nconst wss = new WebSocket.Server({ server });\r\nserver.listen(443);\r\n```\r\n\r\n**인증서 관리**\r\n- **Let's Encrypt**: 무료 SSL 인증서 (90일 갱신)\r\n- **상용 CA**: 유효 기간 긴 인증서\r\n- **자체 서명**: 개발 환경용\r\n\r\n**TLS 버전 설정**\r\n```javascript\r\nconst server = https.createServer({\r\n  minVersion: 'TLSv1.2',  // TLS 1.2 이상만 허용\r\n  maxVersion: 'TLSv1.3'\r\n});\r\n```\r\n\r\n**Nginx TLS 터미네이션**\r\n```nginx\r\nserver {\r\n    listen 443 ssl;\r\n    ssl_certificate /path/to/cert.pem;\r\n    ssl_certificate_key /path/to/key.pem;\r\n    ssl_protocols TLSv1.2 TLSv1.3;\r\n\r\n    location /ws {\r\n        proxy_pass http://backend;\r\n        proxy_http_version 1.1;\r\n        proxy_set_header Upgrade $http_upgrade;\r\n        proxy_set_header Connection \"upgrade\";\r\n    }\r\n}\r\n```\r\n\r\n**보안 고려사항**\r\n- 취약한 암호화 스위트 비활성화\r\n- HSTS 헤더 설정\r\n- 인증서 자동 갱신 설정",
    "references": [
      {
        "title": "RFC 6455 Section 11.1.2 - Secure WebSocket",
        "url": "https://datatracker.ietf.org/doc/html/rfc6455#section-11.1.2"
      }
    ]
  },
  {
    "id": "WS-022",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "TLS/SSL이 적용된 WebSocket(WSS) 통신에서 프록시 서버 사용 시 발생할 수 있는 문제는 무엇인가요?",
    "answer": "**주요 문제점**\r\n\r\n**1. HTTP Upgrade 미지원**\r\n- 일부 프록시가 `Upgrade` 헤더를 인식하지 못함\r\n- 101 Switching Protocols 응답 차단\r\n\r\n**2. 연결 타임아웃**\r\n- 프록시가 유휴 연결을 강제 종료\r\n- 기본값이 짧은 경우 (30초~2분) 빈번한 끊김\r\n\r\n**3. 버퍼링 문제**\r\n- 프록시가 응답을 버퍼링하여 실시간성 저하\r\n- 청크 전송 시 문제 발생 가능\r\n\r\n**4. SSL 종료**\r\n- 중간에서 SSL 종료 시 ws:// vs wss:// 혼동\r\n\r\n**해결 방법**\r\n\r\n**Nginx 프록시 설정**\r\n```nginx\r\nlocation /ws/ {\r\n    proxy_pass http://backend;\r\n    proxy_http_version 1.1;\r\n\r\n    # Upgrade 헤더 전달 (핵심)\r\n    proxy_set_header Upgrade $http_upgrade;\r\n    proxy_set_header Connection \"upgrade\";\r\n\r\n    # 타임아웃 연장\r\n    proxy_read_timeout 3600s;\r\n    proxy_send_timeout 3600s;\r\n\r\n    # 버퍼링 비활성화\r\n    proxy_buffering off;\r\n\r\n    # 헤더 전달\r\n    proxy_set_header Host $host;\r\n    proxy_set_header X-Real-IP $remote_addr;\r\n}\r\n```\r\n\r\n**HAProxy 설정**\r\n```haproxy\r\nfrontend ws_front\r\n    bind *:80\r\n    acl is_websocket hdr(Upgrade) -i WebSocket\r\n    use_backend ws_back if is_websocket\r\n\r\nbackend ws_back\r\n    timeout tunnel 1h\r\n    server ws1 backend:8080\r\n```\r\n\r\n**클라이언트 측 대응**\r\n- WSS 사용 (HTTPS 포트 443 통과 용이)\r\n- Polling 폴백 (Socket.IO 방식)\r\n- 짧은 Ping 간격으로 연결 유지",
    "references": []
  },
  {
    "id": "WS-023",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 라이브러리(예: Socket.IO, ws 등)의 차이점과 선택 기준에 대해 설명해주세요.",
    "answer": "**주요 라이브러리 비교**\r\n\r\n| 라이브러리 | 특징 | 장점 | 단점 |\r\n|------------|------|------|------|\r\n| **ws** | 순수 WebSocket | 경량, 빠름, 표준 준수 | 기능 최소 |\r\n| **Socket.IO** | 기능 풍부한 추상화 | 자동 재연결, 룸, 폴백 | 무거움, 비표준 |\r\n| **SockJS** | 폴백 지원 | 브라우저 호환성 | Socket.IO보다 가벼움 |\r\n| **µWebSockets** | 고성능 | 매우 빠름 | C++ 바인딩 |\r\n\r\n**ws (Node.js 표준)**\r\n```javascript\r\nconst WebSocket = require('ws');\r\nconst wss = new WebSocket.Server({ port: 8080 });\r\n\r\nwss.on('connection', (ws) => {\r\n  ws.on('message', (data) => ws.send(data));\r\n});\r\n```\r\n- 순수 WebSocket RFC 6455 구현\r\n- 추가 기능 없음 (직접 구현 필요)\r\n\r\n**Socket.IO**\r\n```javascript\r\nconst io = require('socket.io')(server);\r\n\r\nio.on('connection', (socket) => {\r\n  socket.join('room1');\r\n  socket.to('room1').emit('message', data);\r\n});\r\n```\r\n- **자동 재연결**: 지수 백오프 내장\r\n- **룸/네임스페이스**: 그룹 통신\r\n- **폴백**: Long Polling 자동 전환\r\n- **이벤트 기반 API**: `emit`/`on` 패턴\r\n\r\n**선택 기준**\r\n\r\n| 상황 | 추천 |\r\n|------|------|\r\n| 고성능, 최소 오버헤드 | ws, µWebSockets |\r\n| 빠른 개발, 풍부한 기능 | Socket.IO |\r\n| 레거시 브라우저 지원 | SockJS, Socket.IO |\r\n| 클러스터 환경 | Socket.IO (Redis Adapter) |\r\n| 표준 WebSocket 클라이언트 연동 | ws (Socket.IO는 호환 불가) |\r\n\r\n**주의**: Socket.IO 클라이언트는 순수 WebSocket 서버와 호환되지 않음",
    "references": [
      {
        "title": "ws npm package",
        "url": "https://www.npmjs.com/package/ws"
      },
      {
        "title": "Socket.IO Documentation",
        "url": "https://socket.io/docs/v4/"
      }
    ]
  },
  {
    "id": "WS-024",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket을 활용한 Pub/Sub 시스템 구현 방법에 대해 설명해주세요.",
    "answer": "**Pub/Sub 패턴**\r\n- **Publisher**: 메시지 발행자\r\n- **Subscriber**: 메시지 구독자\r\n- **Channel/Topic**: 메시지 분류\r\n\r\n**기본 구현**\r\n```javascript\r\nconst channels = new Map();  // channel -> Set<WebSocket>\r\n\r\nfunction subscribe(ws, channel) {\r\n  if (!channels.has(channel)) {\r\n    channels.set(channel, new Set());\r\n  }\r\n  channels.get(channel).add(ws);\r\n}\r\n\r\nfunction unsubscribe(ws, channel) {\r\n  channels.get(channel)?.delete(ws);\r\n}\r\n\r\nfunction publish(channel, message) {\r\n  const subscribers = channels.get(channel);\r\n  if (subscribers) {\r\n    subscribers.forEach(ws => {\r\n      if (ws.readyState === WebSocket.OPEN) {\r\n        ws.send(JSON.stringify({ channel, data: message }));\r\n      }\r\n    });\r\n  }\r\n}\r\n\r\n// 메시지 핸들러\r\nwss.on('connection', (ws) => {\r\n  ws.on('message', (raw) => {\r\n    const { type, channel, data } = JSON.parse(raw);\r\n    switch(type) {\r\n      case 'subscribe': subscribe(ws, channel); break;\r\n      case 'unsubscribe': unsubscribe(ws, channel); break;\r\n      case 'publish': publish(channel, data); break;\r\n    }\r\n  });\r\n\r\n  ws.on('close', () => {\r\n    // 모든 채널에서 제거\r\n    channels.forEach(subs => subs.delete(ws));\r\n  });\r\n});\r\n```\r\n\r\n**Redis Pub/Sub 연동 (클러스터 환경)**\r\n```javascript\r\nconst Redis = require('ioredis');\r\nconst pub = new Redis();\r\nconst sub = new Redis();\r\n\r\n// Redis에서 메시지 수신 → 로컬 구독자에게 전달\r\nsub.on('message', (channel, message) => {\r\n  publish(channel, JSON.parse(message));\r\n});\r\n\r\n// 채널 구독 시 Redis도 구독\r\nfunction subscribeChannel(channel) {\r\n  sub.subscribe(channel);\r\n}\r\n\r\n// 발행 시 Redis로 전송\r\nfunction publishToCluster(channel, data) {\r\n  pub.publish(channel, JSON.stringify(data));\r\n}\r\n```\r\n\r\n**고급 기능**\r\n- **와일드카드 구독**: `news.*` 패턴 매칭\r\n- **메시지 필터링**: 구독 시 조건 지정\r\n- **메시지 히스토리**: 최근 N개 메시지 캐싱",
    "references": []
  },
  {
    "id": "WS-025",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 연결 종료 시 graceful shutdown을 구현하는 방법은 무엇인가요?",
    "answer": "**Graceful Shutdown 필요성**\r\n- 클라이언트에게 종료 사유 전달\r\n- 진행 중인 메시지 처리 완료\r\n- 리소스 정리 시간 확보\r\n\r\n**클라이언트 측 구현**\r\n```javascript\r\nfunction gracefulClose(ws, code = 1000, reason = 'Normal closure') {\r\n  // 1. 상태 변경 알림\r\n  ws.send(JSON.stringify({ type: 'closing' }));\r\n\r\n  // 2. 버퍼 비우기 대기\r\n  const checkBuffer = setInterval(() => {\r\n    if (ws.bufferedAmount === 0) {\r\n      clearInterval(checkBuffer);\r\n      ws.close(code, reason);\r\n    }\r\n  }, 100);\r\n\r\n  // 3. 타임아웃 강제 종료\r\n  setTimeout(() => {\r\n    clearInterval(checkBuffer);\r\n    ws.close(code, reason);\r\n  }, 5000);\r\n}\r\n```\r\n\r\n**서버 측 구현**\r\n```javascript\r\nconst WebSocket = require('ws');\r\nconst wss = new WebSocket.Server({ port: 8080 });\r\n\r\nlet isShuttingDown = false;\r\n\r\nfunction gracefulShutdown() {\r\n  isShuttingDown = true;\r\n\r\n  // 1. 새 연결 거부\r\n  wss.close();\r\n\r\n  // 2. 모든 클라이언트에게 종료 알림\r\n  wss.clients.forEach(ws => {\r\n    ws.send(JSON.stringify({ type: 'server_shutdown' }));\r\n    ws.close(1001, 'Server shutting down');\r\n  });\r\n\r\n  // 3. 연결 종료 대기\r\n  const checkConnections = setInterval(() => {\r\n    if (wss.clients.size === 0) {\r\n      clearInterval(checkConnections);\r\n      process.exit(0);\r\n    }\r\n  }, 100);\r\n\r\n  // 4. 타임아웃 후 강제 종료\r\n  setTimeout(() => {\r\n    console.log('Force shutdown');\r\n    process.exit(1);\r\n  }, 30000);\r\n}\r\n\r\n// 시그널 핸들링\r\nprocess.on('SIGTERM', gracefulShutdown);\r\nprocess.on('SIGINT', gracefulShutdown);\r\n\r\n// 새 연결 시 셧다운 상태 확인\r\nwss.on('connection', (ws) => {\r\n  if (isShuttingDown) {\r\n    ws.close(1001, 'Server shutting down');\r\n    return;\r\n  }\r\n  // 정상 처리\r\n});\r\n```\r\n\r\n**Close Frame 교환**\r\n1. 종료 측이 Close 프레임 전송\r\n2. 상대방이 Close 프레임으로 응답\r\n3. TCP 연결 종료",
    "references": []
  },
  {
    "id": "WS-026",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket의 버전 관리 및 프로토콜 업데이트가 필요한 이유는 무엇인가요?",
    "answer": "**버전 관리의 필요성**\r\n- API 변경 시 하위 호환성 유지\r\n- 점진적 마이그레이션 지원\r\n- 클라이언트-서버 불일치 방지\r\n\r\n**프로토콜 버전 관리 방법**\r\n\r\n**1. 핸드셰이크 시 버전 협상**\r\n```javascript\r\n// 클라이언트\r\nconst ws = new WebSocket('wss://example.com/ws?v=2');\r\n\r\n// 서버\r\nwss.on('connection', (ws, req) => {\r\n  const version = new URL(req.url, 'http://base').searchParams.get('v');\r\n  ws.protocolVersion = version || '1';\r\n});\r\n```\r\n\r\n**2. Sec-WebSocket-Protocol 활용**\r\n```javascript\r\n// 클라이언트\r\nconst ws = new WebSocket('wss://example.com', ['v2', 'v1']);\r\n\r\n// 서버\r\nwss.on('headers', (headers, req) => {\r\n  const protocols = req.headers['sec-websocket-protocol'];\r\n  const supported = ['v2', 'v1'];\r\n  const selected = protocols?.split(',')\r\n    .map(p => p.trim())\r\n    .find(p => supported.includes(p));\r\n  if (selected) {\r\n    headers.push(`Sec-WebSocket-Protocol: ${selected}`);\r\n  }\r\n});\r\n```\r\n\r\n**3. 메시지 레벨 버전**\r\n```json\r\n{\r\n  \"version\": \"2.0\",\r\n  \"type\": \"message\",\r\n  \"data\": { }\r\n}\r\n```\r\n\r\n**업데이트 전략**\r\n- **Backward Compatible**: 새 필드는 optional\r\n- **Deprecation Period**: 구버전 일정 기간 지원\r\n- **Feature Flags**: 기능별 활성화/비활성화",
    "references": [
      {
        "title": "RFC 6455 Section 4.2 - Protocol Negotiation",
        "url": "https://datatracker.ietf.org/doc/html/rfc6455#section-4.2"
      }
    ]
  },
  {
    "id": "WS-027",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket의 permessage-deflate 압축 확장을 사용할 때 고려해야 할 점은 무엇인가요?",
    "answer": "**permessage-deflate 확장 (RFC 7692)**\r\n- zlib DEFLATE 알고리즘 사용\r\n- 메시지 단위로 압축/해제\r\n\r\n**설정 예시**\r\n```javascript\r\nconst wss = new WebSocket.Server({\r\n  port: 8080,\r\n  perMessageDeflate: {\r\n    zlibDeflateOptions: {\r\n      chunkSize: 1024,\r\n      memLevel: 7,\r\n      level: 3          // 압축 레벨 (1-9)\r\n    },\r\n    zlibInflateOptions: {\r\n      chunkSize: 10 * 1024\r\n    },\r\n    clientNoContextTakeover: true,  // 메모리 절약\r\n    serverNoContextTakeover: true,\r\n    serverMaxWindowBits: 10,\r\n    concurrencyLimit: 10,\r\n    threshold: 1024     // 1KB 이상만 압축\r\n  }\r\n});\r\n```\r\n\r\n**고려사항**\r\n\r\n| 항목 | 고려점 |\r\n|------|--------|\r\n| **CPU 오버헤드** | 압축/해제에 CPU 사용, 고빈도 메시지 시 부하 |\r\n| **메시지 크기** | 작은 메시지는 압축 효율 낮음 (오히려 증가 가능) |\r\n| **이미 압축된 데이터** | 이미지, 동영상 등은 압축 효과 없음 |\r\n| **메모리 사용** | Sliding window 유지에 메모리 필요 |\r\n| **지연시간** | 압축 시간만큼 추가 지연 |\r\n\r\n**권장 사항**\r\n- **threshold 설정**: 일정 크기 이상만 압축\r\n- **압축 레벨**: 1-3 (빠른 속도) vs 9 (최대 압축)\r\n- **ContextTakeover**: false로 설정 시 메모리 절약 but 압축률 감소\r\n- **선택적 압축**: 텍스트 데이터만 압축, 바이너리는 제외\r\n\r\n**비활성화가 나은 경우**\r\n- 짧은 메시지 위주\r\n- CPU 리소스 제한적\r\n- 이미 압축된 데이터 (Protobuf 등)",
    "references": [
      {
        "title": "RFC 7692 - Compression Extensions",
        "url": "https://datatracker.ietf.org/doc/html/rfc7692"
      }
    ]
  },
  {
    "id": "WS-028",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 연결 시 세션 관리를 구현하는 방법에는 어떤 것들이 있나요?",
    "answer": "**세션 관리의 필요성**\r\n- 사용자 식별\r\n- 상태 유지 (인증, 권한)\r\n- 재연결 시 컨텍스트 복구\r\n\r\n**1. 연결별 세션 저장**\r\n```javascript\r\nconst sessions = new Map();\r\n\r\nwss.on('connection', (ws) => {\r\n  const sessionId = generateSessionId();\r\n  sessions.set(ws, {\r\n    id: sessionId,\r\n    user: null,\r\n    createdAt: Date.now()\r\n  });\r\n\r\n  ws.on('close', () => {\r\n    sessions.delete(ws);\r\n  });\r\n});\r\n\r\n// 세션 조회\r\nfunction getSession(ws) {\r\n  return sessions.get(ws);\r\n}\r\n```\r\n\r\n**2. 외부 저장소 연동 (Redis)**\r\n```javascript\r\nconst Redis = require('ioredis');\r\nconst redis = new Redis();\r\n\r\nwss.on('connection', async (ws, req) => {\r\n  const token = getTokenFromRequest(req);\r\n  const sessionData = await redis.get(`session:${token}`);\r\n\r\n  if (!sessionData) {\r\n    ws.close(4001, 'Invalid session');\r\n    return;\r\n  }\r\n\r\n  ws.session = JSON.parse(sessionData);\r\n\r\n  // 세션 TTL 연장\r\n  await redis.expire(`session:${token}`, 3600);\r\n});\r\n```\r\n\r\n**3. 쿠키 기반 세션**\r\n```javascript\r\n// HTTP 세션과 공유\r\nconst session = require('express-session');\r\n\r\nwss.on('connection', (ws, req) => {\r\n  sessionMiddleware(req, {}, () => {\r\n    ws.session = req.session;\r\n  });\r\n});\r\n```\r\n\r\n**4. 재연결 시 세션 복구**\r\n```javascript\r\nwss.on('connection', (ws, req) => {\r\n  const lastSessionId = getQueryParam(req, 'sessionId');\r\n\r\n  if (lastSessionId && sessions.has(lastSessionId)) {\r\n    // 기존 세션 복구\r\n    ws.session = sessions.get(lastSessionId);\r\n  } else {\r\n    // 새 세션 생성\r\n    ws.session = createNewSession();\r\n  }\r\n});\r\n```\r\n\r\n**세션 만료 처리**\r\n```javascript\r\nsetInterval(() => {\r\n  const now = Date.now();\r\n  sessions.forEach((session, ws) => {\r\n    if (now - session.lastActivity > SESSION_TIMEOUT) {\r\n      ws.close(4002, 'Session expired');\r\n      sessions.delete(ws);\r\n    }\r\n  });\r\n}, 60000);\r\n```",
    "references": []
  },
  {
    "id": "WS-029",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 세션 관리를 기반으로 한 서버-클라이언트 간 인증 및 인가 방식은 어떻게 구현하나요?",
    "answer": "**인증 타이밍**\r\n1. **핸드셰이크 시** (권장): 연결 전 검증\r\n2. **연결 후 첫 메시지**: 인증 전까지 제한된 동작만 허용\r\n\r\n**1. 쿼리 파라미터 토큰**\r\n```javascript\r\n// 클라이언트\r\nconst ws = new WebSocket(`wss://example.com/ws?token=${jwt}`);\r\n\r\n// 서버\r\nwss.on('connection', (ws, req) => {\r\n  const token = new URL(req.url, 'http://base').searchParams.get('token');\r\n  try {\r\n    ws.user = verifyJWT(token);\r\n  } catch (e) {\r\n    ws.close(4001, 'Unauthorized');\r\n  }\r\n});\r\n```\r\n\r\n**보안 주의**: 쿼리 파라미터는 서버 로그, 브라우저 히스토리, Referer 헤더에 노출될 수 있음\r\n- **권장**: 일회용 토큰 사용 (연결 후 폐기)\r\n- **대안**: 첫 메시지로 토큰 전송 (아래 방법 4 참조)\r\n\r\n**2. 핸드셰이크 헤더 (제한적)**\r\n```javascript\r\n// 브라우저에서 WebSocket 헤더 설정 불가\r\n// Node.js 클라이언트에서만 가능\r\nconst ws = new WebSocket('wss://example.com', {\r\n  headers: { 'Authorization': `Bearer ${token}` }\r\n});\r\n```\r\n\r\n**3. 쿠키 기반 인증**\r\n```javascript\r\n// 동일 도메인에서 쿠키 자동 전송\r\nwss.on('connection', (ws, req) => {\r\n  const cookies = parseCookies(req.headers.cookie);\r\n  const sessionId = cookies['sessionId'];\r\n  // 세션 검증\r\n});\r\n```\r\n\r\n**4. 첫 메시지 인증**\r\n```javascript\r\nwss.on('connection', (ws) => {\r\n  ws.isAuthenticated = false;\r\n\r\n  ws.on('message', (data) => {\r\n    const msg = JSON.parse(data);\r\n\r\n    if (!ws.isAuthenticated) {\r\n      if (msg.type === 'auth') {\r\n        try {\r\n          ws.user = verifyJWT(msg.token);\r\n          ws.isAuthenticated = true;\r\n          ws.send(JSON.stringify({ type: 'auth_success' }));\r\n        } catch (e) {\r\n          ws.close(4001, 'Invalid token');\r\n        }\r\n      }\r\n      return;\r\n    }\r\n\r\n    // 인증된 사용자만 메시지 처리\r\n    handleMessage(ws, msg);\r\n  });\r\n\r\n  // 인증 타임아웃\r\n  setTimeout(() => {\r\n    if (!ws.isAuthenticated) {\r\n      ws.close(4002, 'Auth timeout');\r\n    }\r\n  }, 5000);\r\n});\r\n```\r\n\r\n**인가 (Authorization)**\r\n```javascript\r\nfunction authorize(ws, action, resource) {\r\n  const userRole = ws.user.role;\r\n  const permissions = rolePermissions[userRole];\r\n  return permissions.includes(`${action}:${resource}`);\r\n}\r\n\r\n// 메시지 처리 시\r\nif (!authorize(ws, 'write', 'chat')) {\r\n  ws.send(JSON.stringify({ error: 'Forbidden' }));\r\n  return;\r\n}\r\n```",
    "references": []
  },
  {
    "id": "WS-030",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 기반 애플리케이션에서 발생할 수 있는 일반적인 문제와 해결 방안은 무엇인가요?",
    "answer": "**1. 연결 끊김 (Connection Drop)**\r\n| 원인 | 해결 |\r\n|------|------|\r\n| 네트워크 불안정 | 자동 재연결 + Exponential Backoff |\r\n| 프록시/방화벽 타임아웃 | Ping/Pong Heartbeat |\r\n| 서버 재시작 | Graceful shutdown + 클라이언트 재연결 |\r\n\r\n**2. 메시지 유실**\r\n```javascript\r\n// 메시지 확인 응답 (ACK)\r\nws.send(JSON.stringify({ id: msgId, data }));\r\n\r\n// ACK 수신 시 pending에서 제거\r\nws.on('message', (raw) => {\r\n  const { type, ackId } = JSON.parse(raw);\r\n  if (type === 'ack') {\r\n    pendingMessages.delete(ackId);\r\n  }\r\n});\r\n\r\n// 재전송 로직\r\nsetInterval(() => {\r\n  pendingMessages.forEach((msg, id) => {\r\n    if (Date.now() - msg.sentAt > RETRY_TIMEOUT) {\r\n      ws.send(JSON.stringify(msg.data));\r\n      msg.sentAt = Date.now();\r\n    }\r\n  });\r\n}, 1000);\r\n```\r\n\r\n**3. 메모리 누수**\r\n- 이벤트 리스너 해제 누락\r\n- 연결 종료 시 정리\r\n```javascript\r\nws.on('close', () => {\r\n  clearInterval(ws.pingInterval);\r\n  ws.removeAllListeners();\r\n  sessions.delete(ws);\r\n});\r\n```\r\n\r\n**4. 순서 보장 문제**\r\n```javascript\r\n// 메시지 시퀀스 번호\r\nlet sequence = 0;\r\nconst buffer = new Map();\r\n\r\nws.on('message', (raw) => {\r\n  const { seq, data } = JSON.parse(raw);\r\n  buffer.set(seq, data);\r\n\r\n  // 순서대로 처리\r\n  while (buffer.has(sequence)) {\r\n    processMessage(buffer.get(sequence));\r\n    buffer.delete(sequence);\r\n    sequence++;\r\n  }\r\n});\r\n```\r\n\r\n**5. 대량 연결 처리**\r\n- OS 파일 디스크립터 제한 증가\r\n- Connection 풀링\r\n- 로드밸런서 도입\r\n\r\n**6. 브라우저 호환성**\r\n- 폴백 메커니즘 (Long Polling)\r\n- Socket.IO 등 라이브러리 활용\r\n\r\n**7. 디버깅 어려움**\r\n- 구조화된 로깅\r\n- 연결 ID 추적\r\n- 메시지 샘플링 기록\r\n\r\n**모니터링 지표**\r\n- 동시 연결 수\r\n- 메시지 처리량 (msg/sec)\r\n- 평균 지연시간\r\n- 에러율",
    "references": []
  }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { etcData };
}
