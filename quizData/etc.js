const etcData = [
  {
    "id": "CRDT-001",
    "category": "crdt",
    "categoryName": "CRDT",
    "section": "etc",
    "question": "CRDT(Conflict-free Replicated Data Type)의 기본 개념과 사용 목적은 무엇인가요?",
    "answer": "CRDT는 분산 시스템에서 여러 복제본(replica)이 독립적으로 수정되더라도 충돌 없이 자동으로 병합될 수 있도록 설계된 데이터 구조입니다.\n\nCRDT의 두 가지 유형:\n\n유형   State-based (CvRDT)   Operation-based (CmRDT)\n\n동기화 방식   전체 상태 전송 후 병합   개별 연산만 전송\n병합 함수   merge(state1, state2)   연산을 순서대로 적용\n네트워크 요구사항   신뢰성 불필요 (멱등성)   정확히 한 번 전달 필요\n대역폭   상태 크기에 비례   연산 크기에 비례\n예시   G-Counter, OR-Set   Yjs (내부적으로 op-based)\n\n> 트레이드오프: State-based는 구현이 단순하고 메시지 손실에 강하지만 대역폭을 많이 사용합니다. Operation-based는 효율적이지만 메시지 순서와 전달 보장이 필요합니다. 실제로 Yjs는 두 접근법을 혼합하여 사용합니다.\n\n핵심 특징:\n중앙 서버 불필요: 각 클라이언트가 독립적으로 데이터를 수정하고, 최종적으로 모든 복제본이 동일한 상태로 수렴\nStrong Eventual Consistency (SEC) 보장: 동일한 업데이트를 받은 모든 복제본은 결정론적으로 같은 상태에 도달 (일반 EC보다 강한 보장)\n오프라인 지원: 네트워크 연결 없이도 로컬 편집이 가능하며, 나중에 동기화\n\n사용 목적:\n실시간 협업 애플리케이션 (Notion, Linear 등)\n오프라인-퍼스트 애플리케이션\nP2P 분산 시스템\n분산 데이터베이스 (Redis CRDT, Riak 등)",
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
    "answer": "Yjs는 고성능 CRDT 라이브러리로, 실시간 협업 애플리케이션 구축에 최적화되어 있습니다.\n\n주요 기능:\n공유 데이터 타입: Y.Array, Y.Map, Y.Text, Y.XmlFragment 등 다양한 CRDT 데이터 타입 제공\n네트워크 독립적: WebSocket, WebRTC, Hyper 등 다양한 네트워크 기술과 연동 가능\n풍부한 에디터 통합: ProseMirror, Quill, Monaco, CodeMirror 등 주요 에디터 바인딩 지원\n\n특징:\n최고 수준의 성능: crdt-benchmarks에서 다른 CRDT 라이브러리 대비 우수한 성능\nYATA 알고리즘: 인터리빙 문제를 해결한 텍스트 CRDT 알고리즘 (2016년 발표)\n바이너리 인코딩: 커스텀 바이너리 형식으로 JSON 대비 10배 이상 작은 크기\n모듈화 구조: 핵심 라이브러리(yjs) + 네트워크(y-websocket, y-webrtc) + 에디터 바인딩 분리\nAwareness 프로토콜: 커서 위치, 사용자 정보 등 임시 상태 공유 내장",
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
    "answer": "Yjs에서 분산 데이터 동기화는 Provider와 Y.Doc을 통해 구현됩니다.\n\n기본 구현 단계:\n\n동기화 메커니즘:\n업데이트 전파: 로컬 변경사항이 자동으로 연결된 모든 피어에게 전파\n순서 독립적: 업데이트가 도착하는 순서와 관계없이 동일한 결과 보장\n증분 동기화: 전체 문서가 아닌 변경된 부분만 전송\n\n주요 Provider:\ny-websocket: WebSocket 기반 동기화\ny-webrtc: P2P WebRTC 동기화\ny-indexeddb: 브라우저 로컬 저장소",
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
    "answer": "CRDT와 OT는 모두 분산 환경에서 협업 편집을 가능하게 하지만, 근본적인 접근 방식이 다릅니다.\n\n구분   OT   CRDT\n\n충돌 해결 위치   변환 함수에서 중앙 집중화   데이터 구조 자체에 분산\n서버 의존성   중앙 서버 필요 (일반적)   완전한 P2P 가능\n오프라인 지원   제한적   우수함\n메모리 사용   낮음   높음 (메타데이터 오버헤드)\n의도 보존   변환 함수로 보존 가능   데이터 구조에 따라 다름\n구현 복잡도   변환 함수 정확성 증명 어려움   수학적으로 검증 가능\n\nOT 동작 방식:\n편집을 연산(operation) 시퀀스로 처리\n동시 연산 발생 시 서버에서 변환(transform)하여 적용\n예: \"위치 5에 삽입\" → 다른 편집으로 인해 \"위치 3에 삽입\"으로 변환\n변환 함수의 정확성(TP1, TP2 속성)을 보장해야 함\n\nCRDT 동작 방식:\n데이터 구조 자체에 충분한 메타데이터 포함\n각 요소에 고유 ID 부여하여 위치 대신 ID 기반 참조\n예: \"문자 ID 'a1b2' 뒤에 삽입\"\n수학적으로 수렴이 보장됨 (교환법칙, 결합법칙, 멱등성)\n\n> 함정 주의: \"CRDT가 OT보다 항상 우수하다\"는 오해가 있습니다. 실제로는 사용 사례에 따라 다릅니다. OT는 중앙 서버가 있고 네트워크가 안정적인 환경에서 메모리 효율적이며, CRDT는 P2P나 오프라인 환경에서 강점을 보입니다.\n\n실제 사용 사례:\nOT: Google Docs, Etherpad\nCRDT: Notion, Linear, Apple Notes (일부 기능)\n하이브리드: Figma (자체 구현, CRDT 영감을 받은 커스텀 솔루션)",
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
    "answer": "Yjs는 다양한 공유 데이터 타입을 제공하며, 각각 특정 사용 사례에 최적화되어 있습니다.\n\n주요 데이터 타입:\n\n타입   설명   사용 사례\n\nY.Text   협업 텍스트 편집   문서 편집기, 코드 에디터\nY.Array   순서가 있는 리스트   할 일 목록, 슬라이드 순서\nY.Map   키-값 저장소   설정, 사용자 정보\nY.XmlFragment   XML/HTML 구조   리치 텍스트, DOM 구조\nY.XmlElement   XML 요소   계층적 문서 구조\n\n코드 예시:\n\n중첩 구조:\nY.Map과 Y.Array는 다른 공유 타입을 포함할 수 있어 복잡한 데이터 구조 표현 가능",
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
    "answer": "Yjs는 효율적인 바이너리 인코딩과 증분 업데이트를 통해 변경사항을 전파합니다.\n\n업데이트 전파 과정:\n로컬 변경 감지: 공유 타입에 변경 발생\n업데이트 인코딩: 변경사항을 Uint8Array로 인코딩\n전파: Provider를 통해 다른 피어에게 전송\n적용: 수신 측에서 업데이트 디코딩 및 적용\n\n문서 병합:\nState Vector: 각 클라이언트의 현재 상태를 벡터로 표현\n차이점만 전송: 두 문서의 State Vector를 비교하여 누락된 업데이트만 전송",
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
    "answer": "Yjs는 고유한 클라이언트 ID와 논리적 시계를 사용하여 버전을 관리하고 충돌을 해결합니다.\n\n버전 관리 메커니즘:\nClient ID: 각 Y.Doc 인스턴스에 고유한 ID 할당\nClock: 각 클라이언트별로 단조 증가하는 논리적 시계\nState Vector: Map<clientID, clock> 형태로 문서 상태 표현\n\n충돌 해결 메커니즘:\n\nYATA 알고리즘에 기반한 결정론적 규칙:\n삽입 위치 결정: 동일 위치 삽입 시 origin, rightOrigin, 클라이언트 ID 순으로 결정\n삭제 처리: 삭제된 항목은 tombstone으로 마킹 (참조 무결성 유지)\n자동 병합: 모든 클라이언트가 동일한 규칙을 적용하므로 최종 상태 수렴 보장\n\n> State Vector의 역할: State Vector는 \"내가 어떤 업데이트까지 받았는지\"를 표현합니다. 동기화 시 상대방의 State Vector와 비교하여 부족한 업데이트만 전송함으로써 대역폭을 절약합니다. 이는 벡터 시계(Vector Clock)의 개념과 유사합니다.",
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
    "answer": "Awareness는 사용자 존재 정보(presence)와 커서 위치 등 일시적인 상태를 공유하는 프로토콜입니다.\n\n주요 기능:\n온라인 상태 추적: 누가 현재 접속 중인지 확인\n커서 위치 공유: 다른 사용자의 편집 위치 표시\n사용자 정보 전파: 이름, 색상, 아바타 등\n\n구현 방식:\n\n동작 원리:\n각 클라이언트는 고유한 clientID를 가짐\n상태 변경 시 증가하는 clock과 함께 JSON 객체 전파\n30초 타임아웃: 업데이트 없으면 오프라인으로 간주\nheartbeat 필요: 정기적인 상태 브로드캐스트 권장",
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
    "answer": "Relative Position은 절대적인 인덱스 대신 다른 요소와의 관계로 위치를 표현하는 메커니즘입니다.\n\n필요성:\nCRDT에서 절대 인덱스는 동시 편집 시 무효화될 수 있음\n커서 위치, 선택 영역 등을 안정적으로 유지해야 함\n\nRelative Position 원리:\n\n내부 구조:\ntype: 참조하는 공유 타입\nitem: 기준이 되는 항목의 ID (clientID + clock)\nassoc: 항목의 앞(-1) 또는 뒤(1)를 가리킴\n\n활용 사례:\n커서 위치 저장 및 복원\n주석/코멘트의 텍스트 범위 추적\nUndo/Redo 구현",
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
    "answer": "Yjs와 Automerge는 모두 인기 있는 CRDT 라이브러리이지만 설계 철학과 특성이 다릅니다.\n\n구분   Yjs   Automerge 2.0\n\n알고리즘   YATA   RGA 변형 (OpSet)\n데이터 모델   타입별 전용 구조   JSON 문서 (불변 데이터)\n인코딩   커스텀 바이너리   바이너리 (Rust 기반)\n언어   JavaScript (순수)   Rust + WASM/네이티브 바인딩\n성능   매우 빠름   2.0에서 크게 개선됨\n메모리   효율적   2.0에서 개선 (여전히 더 높음)\nGC   지원   제한적 (히스토리 보존 우선)\n히스토리   선택적   전체 히스토리 보존 기본\n\nYjs 강점:\n텍스트 협업에 최적화된 성능\n다양한 에디터 바인딩 생태계 (ProseMirror, Quill, Monaco 등)\n네트워크 Provider 선택의 유연성\n가비지 컬렉션으로 문서 크기 관리\n브라우저 환경에서 가볍고 빠름\n\nAutomerge 강점:\nJSON 친화적 데이터 모델 (스키마리스)\n다국어 지원 (Rust, Python, Go, Swift 등)\nautomerge-repo로 end-to-end 동기화 제공\n전체 변경 히스토리 추적 (시간 여행 디버깅)\n강력한 머지 시맨틱스\n\n> 트레이드오프: Yjs는 성능과 에디터 통합에 최적화되어 있고, Automerge는 데이터 무결성과 히스토리 보존에 중점을 둡니다. Automerge 2.0은 Rust로 재작성되어 성능이 크게 개선되었지만, 여전히 Yjs가 텍스트 편집 벤치마크에서 앞서는 경우가 많습니다.\n\n선택 기준:\n텍스트 에디터 중심 → Yjs\nJSON 데이터 구조 + 히스토리 필요 → Automerge\n성능이 최우선 → Yjs\n백엔드가 Rust/다국어 → Automerge",
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
    "answer": "실시간 협업 애플리케이션 구현 시 여러 측면을 고려해야 합니다.\n네트워크 아키텍처:\n중앙 서버 (y-websocket): 구현 단순, 권한 관리 용이\nP2P (y-webrtc): 서버 비용 절감, 지연 시간 단축\n하이브리드: 둘을 조합하여 장점 활용\n데이터 영속성:\n인증 및 권한:\nWebSocket 연결 시 토큰 검증\n문서별 읽기/쓰기 권한 분리\n민감한 작업에 대한 서버 측 검증\n성능 최적화:\n큰 문서는 하위 문서(subdoc)로 분할\n불필요한 히스토리는 GC로 정리\n적절한 debounce로 업데이트 빈도 조절\nUX 고려사항:\nAwareness로 다른 사용자 커서 표시\n연결 상태 표시 (온라인/오프라인)\n충돌 해결 결과에 대한 시각적 피드백",
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
    "answer": "Yjs는 Observer 패턴을 사용하여 데이터 변경을 감지하고 반응할 수 있습니다.\n\n문서 레벨 이벤트:\n\n타입별 Observer:\n\n옵저버 해제:",
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
    "answer": "Yjs의 Delta는 Quill Delta 형식을 기반으로 텍스트 변경을 표현하는 방식입니다.\n\nDelta 구조:\n\nY.Text와 Delta:\n\n장점:\n직관적 표현: 변경 사항을 명확하게 표현\n서식 지원: 속성(attributes)으로 리치 텍스트 지원\n효율적 전송: 전체 문서 대신 변경분만 전송\n에디터 호환: Quill, ProseMirror 등과 쉽게 연동",
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
    "answer": "CRDT 특성상 Yjs에서는 \"충돌\"이 자동으로 해결되지만, 결과가 사용자의 의도와 다를 수 있는 상황을 이해해야 합니다.\n\n> 핵심 개념: CRDT에서 \"충돌\"은 기술적으로 발생하지 않습니다. 모든 동시 편집은 결정론적 규칙에 따라 자동 병합됩니다. 그러나 \"의미적 충돌\"(사용자 의도와 다른 결과)은 여전히 발생할 수 있습니다.\n동시 삽입 충돌:\n상황: 두 사용자가 같은 위치에 동시에 텍스트 삽입\n해결: 클라이언트 ID를 기준으로 결정론적 순서 적용\n동시 삭제와 수정:\n상황: 한 사용자가 텍스트를 삭제하는 동안 다른 사용자가 같은 텍스트를 수정\n해결: 삭제가 적용됨 (tombstone). 수정 연산은 이미 삭제된 항목에 적용\n동시 속성 변경 (Y.Map, 서식):\n상황: 같은 키나 같은 텍스트 범위에 다른 값/서식 적용\n해결: Last-Write-Wins (LWW) - 논리적 시계 기준 마지막 변경 적용\nInterleaving 문제:\n상황: \"foo\"와 \"bar\" 동시 입력 시 \"fboaor\" 같은 결과\n해결: YATA 알고리즘이 rightOrigin을 사용하여 이 문제를 최소화\n\n의도 보존을 위한 전략:\n\n> 함정 주의: \"CRDT는 충돌이 없다\"는 말은 \"기술적 충돌\"이 없다는 의미입니다. 사용자 관점에서의 \"의미적 충돌\"은 여전히 발생하며, 좋은 UX를 위해서는 이를 시각적으로 표시하거나 알림을 제공해야 합니다.",
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
    "answer": "Yjs 애플리케이션의 성능을 최적화하기 위한 여러 전략이 있습니다.\n가비지 컬렉션 (GC):\n\n> GC 트레이드오프: GC를 활성화하면 메모리가 절약되지만, Undo/Redo 히스토리가 제한됩니다. GC가 실행된 후에는 GC된 시점 이전으로 되돌릴 수 없습니다. 협업 히스토리가 중요한 경우 gc: false를 고려하세요.\nSubdocuments (하위 문서):\n업데이트 압축:\n트랜잭션 활용:\n효율적인 초기 동기화:\n메모리 모니터링:\n대용량 문서에서는 정기적으로 문서 크기 확인\n필요시 오래된 히스토리 정리",
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
    "answer": "Yjs는 다양한 영속성 Provider를 통해 문서를 저장할 수 있습니다.\n\n클라이언트 측 저장:\n\n서버 측 저장:\n\n저장 전략:\n전체 문서 저장:\n증분 업데이트 저장:\n스냅샷 + 증분:\n\n고려사항:\n업데이트 로그가 커지면 주기적으로 병합\n동시성 제어를 위한 적절한 락 메커니즘\n백업 및 복구 전략",
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
    "answer": "네트워크 지연 환경에서도 Yjs는 로컬 우선 동작으로 좋은 사용자 경험을 제공합니다.\n낙관적 업데이트 (기본 동작):\n로컬 변경은 즉시 반영\n네트워크 응답을 기다리지 않음\n나중에 동기화되어도 결과 수렴 보장\n로컬 영속성 활용:\n재연결 전략:\n업데이트 배칭:\n압축 전송:\nYjs 업데이트는 이미 바이너리로 효율적\n필요시 gzip 추가 압축 적용",
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
    "answer": "Yjs는 네트워크 프로토콜에 독립적이며, 다양한 Provider를 통해 연동합니다.\nWebSocket (y-websocket):\nWebRTC (y-webrtc):\n커스텀 Provider 구현:\n\n프로토콜 선택 기준:\n\n프로토콜   장점   단점\n\nWebSocket   안정적, 권한 제어 용이   서버 비용\nWebRTC   P2P, 낮은 지연   연결 설정 복잡\n하이브리드   장점 조합   구현 복잡도",
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
    "answer": "분산 시스템에서 일관성 모델은 데이터 동기화의 보장 수준을 정의합니다.\n\nStrong Consistency (강한 일관성 / Linearizability):\n모든 읽기는 가장 최근 쓰기 결과를 반환\n모든 노드가 동일한 순서로 업데이트 확인\n전역 총 순서(total order)가 존재\n예: 전통적인 RDBMS, Raft/Paxos 기반 시스템, Spanner\n\nEventual Consistency (최종 일관성):\n충분한 시간이 지나면 모든 노드가 같은 상태에 도달\n중간 상태에서는 노드별로 다른 값을 볼 수 있음\n수렴 방식이 정의되지 않음 (충돌 해결 필요)\n\nStrong Eventual Consistency (SEC) - CRDT의 핵심:\n\nCRDT는 일반적인 Eventual Consistency보다 강한 보장을 제공합니다. Shapiro et al. (2011) 논문에서 정의한 SEC의 세 가지 속성:\nEventual Delivery: 한 복제본에 전달된 업데이트는 결국 모든 복제본에 전달됨\nStrong Convergence: 같은 업데이트 집합을 받은 복제본은 즉시 동일한 상태 (순서 무관)\nTermination: 모든 연산은 유한 시간 내에 완료\n\n> 핵심 차이: 일반 EC는 \"언젠가 같아진다\"만 보장하고 충돌 해결이 별도로 필요합니다. SEC는 \"같은 업데이트를 받으면 항상 같은 상태가 된다\"를 수학적으로 보장하며, 충돌 해결이 데이터 구조에 내장되어 있습니다.\n\n트레이드오프 (CAP/PACELC 정리):\n\n속성   Strong Consistency   Eventual Consistency   Strong Eventual (CRDT)\n\n가용성   낮음 (P 시 불가)   높음   높음\n지연 시간   높음 (합의 필요)   낮음   낮음\n네트워크 분할 허용   불가   가능   가능\n오프라인 작업   불가   제한적   완전 지원\n충돌 해결   불필요   수동/LWW 등   자동 (결정론적)\n메모리 오버헤드   낮음   낮음   높음 (메타데이터)",
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
    "answer": "대용량 Yjs 문서는 메모리, 네트워크, 초기 로드 시간에 영향을 줄 수 있습니다.\n\n> 실제 사례: 일반적인 협업 문서(10-50페이지)에서는 Yjs가 매우 효율적입니다. 문제는 수백 페이지의 문서, 오랜 편집 히스토리가 누적된 경우, 또는 대량의 동시 편집자가 있는 경우에 발생합니다.\n\n성능 이슈:\n메모리 사용량 증가\n각 문자에 메타데이터 포함 (ID: clientID + clock, origin 참조)\n삭제된 항목도 tombstone으로 유지 (GC 전까지)\n예: 1MB 텍스트 → Yjs 문서에서 3-5MB (메타데이터 포함)\n초기 동기화 지연\n새 클라이언트는 전체 문서 상태를 수신해야 함\n히스토리가 긴 문서일수록 초기 로드 시간 증가\n업데이트 처리 시간\n큰 문서에서 삽입 위치 탐색 시간 증가\nYATA의 최악 케이스: O(n) (하지만 실제로는 대부분 O(1))\n\n대응 방법:\nSubdocuments 활용:\n가비지 컬렉션:\n스냅샷 기반 압축:\nLazy Loading:\n모니터링:",
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
    "answer": "Yjs는 핵심 라이브러리와 확장 모듈로 구성된 모듈화된 아키텍처를 가집니다.\n\n핵심 패키지 (yjs):\nY.Doc, Y.Array, Y.Map, Y.Text 등 기본 CRDT 타입\n인코딩/디코딩, 동기화 프로토콜\n\n네트워크 Provider:\n\n영속성 Provider:\n\n에디터 바인딩:\n\n프로토콜 모듈 (y-protocols):\n\n커스텀 Provider 구현:\n\n생태계 장점:\n필요한 기능만 선택적 사용\n새로운 백엔드/에디터 쉽게 추가\n커뮤니티 확장 활발",
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
    "answer": "Yjs는 효율적인 바이너리 인코딩을 사용하지만, 추가 최적화 기법을 적용할 수 있습니다.\n업데이트 병합:\nDebouncing:\n차등 동기화:\n압축:\n선택적 동기화:\n대역폭 제한:",
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
    "answer": "Yjs 업데이트 메시지 크기 최소화는 네트워크 효율성과 성능에 직접적인 영향을 줍니다.\n\nYjs 기본 최적화:\n바이너리 인코딩: JSON 대비 훨씬 컴팩트\n변수 길이 정수: 작은 숫자에 적은 바이트 사용\n참조 기반 구조: 중복 데이터 최소화\n\n추가 최적화 기법:\n트랜잭션 그룹화:\n업데이트 병합:\nOrigin 필터링:\n압축 적용:\nDiff 기반 전송:\n\n메시지 크기 측정:",
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
    "answer": "Yjs는 다양한 수준에서 이벤트를 제공하며, 효과적인 패턴을 통해 처리합니다.\n\n이벤트 계층:\n\n일반적인 처리 패턴:\nOrigin 기반 분기:\n배치 처리:\nDeep Observer 패턴:\n멱등성 보장:\n이벤트 정리:",
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
    "answer": "CRDT의 가장 큰 장점 중 하나는 오프라인 편집을 자연스럽게 지원한다는 것입니다.\n\n오프라인 시나리오 구성:\n로컬 영속성 설정:\n연결 상태 관리:\n동기화 흐름:\n충돌 없는 병합:\n사용자 경험:\n오프라인 상태 표시\n동기화 진행률\n마지막 동기화 시간",
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
    "answer": "Yjs는 스키마리스(schemaless) 특성을 가지지만, 애플리케이션 레벨에서 스키마 진화를 관리해야 합니다.\n\nYjs의 유연성:\n\n스키마 버전 관리 패턴:\n버전 필드 사용:\n점진적 마이그레이션:\n기본값 처리:\n타입 검증 레이어:\n\n주의사항:\n삭제된 필드도 tombstone으로 남음\n구 버전 클라이언트와의 호환성 고려\n마이그레이션은 모든 클라이언트에서 동일하게 동작해야 함",
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
    "answer": "Yjs는 CRDT 특성으로 수렴을 보장하지만, 애플리케이션 레벨 정합성은 추가 전략이 필요합니다.\n\nCRDT가 보장하는 것:\nStrong Eventual Consistency: 같은 업데이트 → 같은 상태\n충돌 없는 병합\n순서 독립적 적용\n\n애플리케이션 레벨 정합성 전략:\n트랜잭션 활용:\n유효성 검증:\n서버 측 검증:\n낙관적 락킹:\n체크섬 기반 검증:",
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
    "answer": "Yjs는 YATA (Yet Another Transformation Approach) 알고리즘을 기반으로 충돌을 해결합니다. YATA는 2016년 Nicolaescu et al.이 발표한 알고리즘으로, 기존 RGA의 한계를 개선했습니다.\n\nYATA 알고리즘 핵심:\n고유 식별자 (Unique ID):\n위치 참조 (Relative Positioning):\n삽입 규칙 (Integration Rules):\n동일 위치에 동시 삽입 시 결정론적 순서 결정:\n삭제 처리 (Tombstones):\n\n인터리빙 문제와 해결:\n\n예시 시나리오:\n\nYATA vs 다른 알고리즘:\n\n알고리즘   인터리빙   복잡도   메타데이터\n\nRGA   발생 가능   O(n)   ID만\nWOOT   해결   O(n²)   많음\nLogoot/LSEQ   발생 가능   O(log n)   가변 ID\nYATA   최소화   O(n) 최악, 평균 O(1)   origin + rightOrigin\n\n장점:\n인터리빙 문제 최소화 (사용자 의도 보존)\n실제 협업 패턴에서 O(1)에 가까운 성능\n효율적인 메모리 사용\n가비지 컬렉션 지원",
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
    "answer": "프로덕션 환경에서 Yjs를 운영하려면 여러 측면을 고려해야 합니다.\n확장성 (Scalability):\n모니터링:\n에러 처리:\n백업 및 복구:\n보안:\n성능 최적화:\n문서 분할 (Subdocuments)\n연결 풀링\n로드 밸런싱\n버전 관리:\n클라이언트/서버 Yjs 버전 호환성\n점진적 업그레이드 전략",
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
    "answer": "Yjs 자체는 보안 기능을 제공하지 않으므로, 애플리케이션 레벨에서 구현해야 합니다.\n인증 (Authentication):\n권한 부여 (Authorization):\n전송 암호화:\n데이터 검증:\nRate Limiting:\n감사 로깅:",
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
    "answer": "메시지는 특정 수신자에게 전달되는 데이터로, 발신자가 수신자를 알고 직접 통신합니다. 이벤트는 시스템에서 발생한 사실이며, 발신자는 누가 구독하는지 모릅니다.\n메시지: Point-to-Point, 수신자 지정, 명령(Command) 성격\n이벤트: Publish-Subscribe, 수신자 미지정, 사실(Fact) 성격",
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
    "answer": "Command: \"이것을 해라\"라는 지시. 실패/거부 가능. 예: CreateOrder\n\nEvent: \"이것이 일어났다\"라는 과거 사실. 불변. 예: OrderCreated\n\n이 구분은 시스템의 결합도와 책임 분리에 영향을 줍니다.",
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
    "answer": "메시지 큐 (RabbitMQ, SQS):\n작업 분배, Point-to-Point, 소비 후 삭제\n적합: 작업 큐, 비동기 태스크 처리\n\n이벤트 스트림 (Kafka):\n다중 구독자, 이벤트 재처리(replay), 순서 보장, 로그 보존\n적합: 이벤트 소싱, 실시간 스트리밍, 감사 로그\n\n트레이드오프:\n기준   메시지 큐   이벤트 스트림\n\n재처리   어려움   용이 (오프셋 리셋)\n운영 복잡도   낮음   높음\n확장성   수직 위주   수평 확장 용이\n순서 보장   제한적   파티션 내 보장",
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
    "answer": "이점:\n느슨한 결합: 서비스 독립적 배포 가능\n확장성 향상: 구독자 추가/제거가 발신자에 영향 없음\n유연성: 새로운 기능을 기존 코드 수정 없이 추가\n\n단점:\n디버깅 어려움: 분산 트레이싱 필요 (Jaeger, Zipkin)\n이벤트 흐름 추적 복잡: 이벤트 카탈로그/문서화 필요\n최종 일관성: 강한 일관성 필요 시 부적합\n이벤트 순서 보장 어려움\n\n대규모 시스템 고려사항:\nDead Letter Queue로 이벤트 유실 방지\n멱등성 보장으로 중복 처리 대응\n모니터링 및 알람 체계 구축",
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
    "answer": "EDA: 이벤트 발생 시 반응하는 비동기 아키텍처. 서비스들이 이벤트를 발행/구독.\n\nRequest-Response: 동기식. 호출자가 응답을 기다림. 강한 결합.\n\n차이점: EDA는 비동기, 느슨한 결합, 확장성 우수. Request-Response는 즉각적 응답, 단순한 흐름.",
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
    "answer": "장점:\n느슨한 결합 - 서비스 독립성\n확장성 - 이벤트 기반 스케일링\n실시간 반응 - 즉각적인 이벤트 처리\n\n단점:\n복잡성 - 이벤트 흐름 추적 어려움\n최종 일관성 - 강한 일관성 보장 어려움\n디버깅 - 분산 트레이싱 필요",
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
    "answer": "Choreography: 각 서비스가 이벤트에 반응하여 독립적으로 동작. 중앙 제어 없음. 분산적.\n\nOrchestration: 중앙 오케스트레이터가 전체 흐름을 제어. 명시적인 워크플로우.\n\n비교   Choreography   Orchestration\n\n결합도   낮음   높음\n가시성   낮음   높음\n복잡도   서비스 증가시 복잡   오케스트레이터에 집중",
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
    "answer": "인프라 측면:\n클러스터링: 다중 브로커 노드 구성\n레플리케이션: 파티션 복제 (replication factor >= 3 권장)\n다중 데이터센터: 지역 간 복제 (MirrorMaker 2)\n\n클라이언트 측면:\nCircuit Breaker: 브로커 장애 시 폴백\n재시도 로직: exponential backoff\n로컬 버퍼링: 일시적 장애 시 메시지 임시 저장\n\n트레이드오프:\n복제 수 증가 → 내구성 향상, 쓰기 지연 증가\n다중 DC → 가용성 향상, 운영 복잡도 및 비용 증가",
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
    "answer": "At-most-once:\n최대 한 번 전송. 유실 가능, 중복 없음\n구현: ACK 없이 전송 (fire-and-forget)\n적합: 메트릭, 로그 등 유실 허용 가능한 경우\n\nAt-least-once (가장 일반적):\n최소 한 번 전송. 유실 없음, 중복 가능\n구현: 전송 후 ACK 대기, 실패 시 재전송\n적합: 멱등한 처리가 가능한 대부분의 경우\n\nExactly-once:\n정확히 한 번. 유실/중복 없음\n주의: 진정한 Exactly-once는 분산 시스템에서 이론적으로 불가능\n실제 구현: At-least-once + 멱등성 = \"Effectively Once\"\n\n트레이드오프:\n보장 수준   성능   복잡도   데이터 정확성\n\nAt-most-once   높음   낮음   낮음\nAt-least-once   중간   중간   높음 (멱등성 필요)\nExactly-once   낮음   높음   최고",
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
    "answer": "어려운 이유 (Two Generals' Problem):\n네트워크 장애로 ACK 유실 시 송신자는 수신 여부 알 수 없음\n프로세스 크래시 시 처리 완료 여부 불명확\n분산 환경에서 \"정확히 한 번\" 자체의 정의가 모호\n\n핵심 통찰:\n진정한 Exactly-once는 불가능. 실제로는 At-least-once + 멱등성 = \"Effectively Once\"로 구현\n\n해결 기술:\nIdempotency: 동일 요청을 여러 번 처리해도 같은 결과\nDeduplication: 메시지 ID로 중복 체크 (TTL 고려 필요)\nTransactional Outbox: DB와 이벤트 발행을 원자적으로 처리\n\n함정 주의:\nKafka의 \"Exactly-once\"는 Kafka 내부 처리에만 해당. 외부 시스템(DB, API 등)과 연동 시 여전히 멱등성 필수",
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
    "answer": "중요성:\n프로듀서/컨슈머 간 계약 역할\n스키마 불일치 시 파싱 오류 및 서비스 장애\n독립적 배포를 위한 필수 요소\n\n호환성 유형:\nBackward: 새 스키마로 이전 데이터 읽기 가능\nForward: 이전 스키마로 새 데이터 읽기 가능\nFull: 양방향 호환\n\n하위 호환성 보장 규칙:\n새 필드는 optional 또는 default 값 필수\n기존 필수 필드 삭제 금지\n필드 타입 변경 금지\n\n실무 권장:\nSchema Registry 사용 (Confluent, AWS Glue)\n직렬화: Avro, Protobuf (JSON은 검증 약함)\nCI/CD에 스키마 호환성 검사 통합",
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
    "answer": "신뢰성: 이미 발생한 사실은 변경 불가\n재처리: 이벤트 replay 시 일관된 결과\n감사 로그: 완전한 히스토리 보존\n동시성: 불변 데이터는 락 불필요",
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
    "answer": "보정 이벤트(Compensating Event) 발행:\n기존 이벤트는 그대로 유지\n새로운 \"수정\" 이벤트 발행 (예: OrderAmountCorrected)\n현재 상태는 모든 이벤트 적용 결과로 계산",
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
    "answer": "정의: 여러 서비스/DB에 걸친 트랜잭션을 원자적으로 처리하는 것\n\n필요성: MSA에서 하나의 비즈니스 로직이 여러 서비스에 분산되어 있을 때, 전체의 일관성을 보장하기 위해 필요",
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
    "answer": "Phase 1 (Prepare): 코디네이터가 모든 참여자에게 커밋 준비 요청. 참여자는 준비 완료/실패 응답.\n\nPhase 2 (Commit/Rollback): 모두 준비 완료 시 커밋, 하나라도 실패 시 전체 롤백",
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
    "answer": "단점:\n블로킹: Prepare 후 Commit 전까지 참여자가 락 유지 (자원 점유)\nSPOF: 코디네이터 장애 시 참여자가 무한 대기 (In-doubt 상태)\n성능: 동기식 통신 + 여러 번의 네트워크 왕복으로 지연\n확장성 제한: 참여자 증가 시 성능 저하\n\n실제 환경에서 잘 사용되지 않는 이유:\nMSA 환경에서 서비스 간 강한 결합 유발\n클라우드 네이티브 환경의 일시적 장애에 취약\n네트워크 파티션 발생 시 복구 어려움\n\n사용되는 경우:\n동일 DB 내 XA 트랜잭션 (MySQL, PostgreSQL)\n단일 데이터센터의 신뢰할 수 있는 내부 시스템\n\n대안: SAGA, TCC (Try-Confirm-Cancel), Outbox 패턴",
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
    "answer": "SAGA: 로컬 트랜잭션의 시퀀스. 각 단계 실패 시 보상 트랜잭션으로 롤백.\n\n2PC와의 차이:\n비교   2PC   SAGA\n\n일관성   강한 일관성   최종 일관성\n락   글로벌 락   로컬 락\n가용성   낮음   높음",
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
    "answer": "정의: 이전 트랜잭션의 효과를 의미적으로 취소하는 트랜잭션\n\n핵심 이해: 보상 트랜잭션은 물리적 롤백이 아님\n결제 취소 = 환불 처리 (새로운 트랜잭션)\n재고 차감 취소 = 재고 복구 (새로운 트랜잭션)\n\n설계 고려사항:\n멱등성 필수: 보상 트랜잭션도 재시도될 수 있음\n의미적 가역성: 취소 불가능한 작업은 별도 설계 (예: 이메일 발송 → 취소 이메일 발송)\n역순 실행: 마지막 성공 단계부터 역순으로\n타임아웃: 보상 트랜잭션에도 타임아웃 설정\n\n함정 주의:\n외부 시스템(결제 게이트웨이, SMS 등)의 보상은 별도 설계 필요\n보상 실패 시 수동 개입 프로세스 필수",
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
    "answer": "단계적 접근 (권장 순서):\n재시도 (Retry):\n지수 백오프(exponential backoff) + 지터(jitter)\n최대 재시도 횟수 제한 (예: 5회)\nDead Letter Queue (DLQ):\n재시도 실패한 보상 작업 저장\n분석을 위한 충분한 컨텍스트 포함\n수동 개입 (Human Intervention):\n운영자 알림 (PagerDuty, Slack 등)\n관리자 대시보드를 통한 수동 처리\nForward Recovery (고급):\n롤백 대신 앞으로 진행하여 일관성 복구\n예: 재고 복구 실패 → 다음 입고 시 자동 조정\n\n대규모 시스템 고려사항:\nSAGA 상태 영구 저장 (장애 복구용)\n보상 실패율 모니터링 및 알람",
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
    "answer": "정의: SAGA 진행 중 일부 서비스는 커밋되고 일부는 아직 처리 중인 상태\n\n예시: 주문 서비스는 주문 생성 완료, 결제 서비스는 아직 처리 중\n\n특징: 외부에서 볼 때 일관성이 깨진 것처럼 보임",
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
    "answer": "문제:\n사용자 혼란 (주문은 됐는데 결제 상태 불명)\n잘못된 데이터 조회\n\n해결책:\n상태 표시: \"처리 중\" 상태 명시\nSemantic Lock: 리소스를 \"예약\" 상태로 표시\n읽기 격리: 완료된 SAGA만 조회 가능",
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
    "answer": "Choreography (분산 이벤트 기반):\n각 서비스가 이벤트를 발행하고 다른 서비스의 이벤트에 반응\n중앙 조율자 없음, 자율적 협력\n\nOrchestration (중앙 조율자 기반):\n중앙 오케스트레이터가 SAGA 전체 흐름 제어\n순차적/병렬 호출, 결과에 따라 다음 단계 결정\n\n비교   Choreography   Orchestration\n\n장점   느슨한 결합, 단순한 서비스   명확한 흐름, 디버깅 용이\n단점   흐름 파악 어려움, 순환 의존성 위험   오케스트레이터 복잡도 증가\n확장   새 서비스 추가 용이   오케스트레이터 수정 필요\n테스트   통합 테스트 어려움   단위 테스트 용이\n적합   2-4단계 단순 흐름   5단계 이상, 조건부 분기\n\n실무 권장:\n시작은 Choreography로 단순하게\n복잡해지면 Orchestration으로 전환 고려\n도메인별로 하이브리드 적용 가능",
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
    "answer": "정의: 상태를 직접 저장하지 않고, 상태 변경 이벤트를 순서대로 저장하는 패턴\n\n특징:\n모든 변경 히스토리 보존\n현재 상태 = 이벤트 순차 적용 결과\n감사 로그 자동 생성",
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
    "answer": "방법: 해당 엔티티의 모든 이벤트를 처음부터 순서대로 재생(replay)하여 현재 상태 계산\n\n최적화: 스냅샷을 주기적으로 저장하여 전체 재생 방지",
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
    "answer": "완전한 감사 로그: 모든 변경 이력 보존\n시간 여행: 특정 시점의 상태 재구성\n디버깅: 문제 발생 시점 추적 용이\n이벤트 재처리: 새로운 뷰 생성 가능\n버그 수정: 과거 이벤트 재처리로 데이터 복구",
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
    "answer": "스냅샷(Snapshot): 특정 시점의 상태를 저장\n\n동작: 스냅샷 이후 이벤트만 재생하여 현재 상태 계산",
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
    "answer": "결정 기준:\n이벤트 수 기반: N개 이벤트마다 (예: 100-1000개)\n시간 기반: 주기적 (예: 매시간, 매일)\n성능 기반: 재생 시간이 SLA 임계치 초과 시\n\n트레이드오프:\n스냅샷 빈도   저장 공간   읽기 성능   쓰기 부하\n\n높음   많음   빠름   높음\n낮음   적음   느림   낮음\n\n실무 권장:\nSLA 기준 역산: 목표 응답시간 내 재생 가능한 이벤트 수 계산\n백그라운드에서 비동기로 스냅샷 생성",
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
    "answer": "Dual-write 문제: DB 저장 성공 후 이벤트 발행 실패 시 불일치\n\n해결책:\nTransactional Outbox: 같은 트랜잭션에서 Outbox 테이블에 이벤트 저장\nEvent Sourcing: 이벤트 자체가 원본 데이터\nCDC (Change Data Capture): DB 변경을 캡처하여 이벤트 발행",
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
    "answer": "동작:\n비즈니스 데이터와 이벤트를 같은 DB 트랜잭션에서 저장\n이벤트는 Outbox 테이블에 저장\n별도 프로세스가 Outbox에서 이벤트를 읽어 브로커에 발행\n발행 완료 후 Outbox 레코드 삭제/마킹",
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
    "answer": "방법 1: Polling Publisher\n주기적으로 Outbox 테이블 조회\n미발행 이벤트 전송 후 상태 업데이트\n\n방법 2: CDC (Change Data Capture)\nDB 트랜잭션 로그를 캡처 (Debezium)\n실시간으로 이벤트 브로커에 전달",
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
    "answer": "CQS (원칙): 메서드는 Command(상태 변경) 또는 Query(데이터 반환) 중 하나만 수행\n\nCQRS (패턴): 읽기와 쓰기 모델을 완전히 분리하여 다른 저장소/모델 사용\n\n차이: CQS는 메서드 레벨, CQRS는 시스템 아키텍처 레벨",
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
    "answer": "읽기/쓰기 최적화: 각각에 맞는 데이터 모델 사용\n확장성: 읽기/쓰기 독립적 스케일링\n복잡한 도메인: 쓰기는 도메인 모델, 읽기는 단순 DTO\n성능: 읽기에 비정규화된 뷰 사용",
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
    "answer": "코드 중복: 읽기/쓰기 모델 각각 구현\n동기화: Command → Query 모델 동기화 로직 필요\n최종 일관성: 즉각적 일관성 보장 어려움\n인프라: 별도 저장소 운영 비용",
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
    "answer": "이벤트 기반 동기화:\nCommand 모델에서 상태 변경 후 이벤트 발행\nQuery 모델이 이벤트 구독하여 뷰 업데이트\n\n동기화 방식:\n비동기: 이벤트 브로커 통해 전달\n동기: 같은 트랜잭션에서 양쪽 업데이트 (권장 X)",
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
    "answer": "전략 1: UI/UX 패턴\n낙관적 업데이트: 쓰기 후 UI 즉시 반영 (실패 시 롤백)\n로딩 상태: \"저장 중...\", \"동기화 중...\" 표시\n\n전략 2: Read-your-writes 일관성\n쓴 사용자는 자신의 변경을 즉시 조회\n구현: 쓰기 후 일정 시간 Command 모델에서 직접 읽기\n\n전략 3: 실시간 알림\nWebSocket/SSE로 동기화 완료 시 클라이언트에 알림\n\n전략 4: 버전/타임스탬프\n응답에 버전 포함, 기대 버전과 비교\n\n트레이드오프: 구현 복잡도 vs 사용자 경험",
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
    "answer": "용도별 선택:\n단순 조회: RDB (PostgreSQL)\n전문 검색: Elasticsearch\n캐싱: Redis\n복잡한 쿼리: MongoDB\n분석: ClickHouse, BigQuery\n\n핵심: 읽기 패턴에 최적화된 기술 선택",
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
    "answer": "적합한 경우:\n읽기/쓰기 비율 차이가 큰 경우\n복잡한 도메인 모델\n높은 확장성 요구\n\n부적합한 경우:\n단순 CRUD 애플리케이션\n강한 일관성이 필수인 경우\n소규모 팀/프로젝트",
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
    "answer": "독립적 패턴: CQRS와 Event Sourcing은 별개의 패턴\nCQRS만: 읽기/쓰기 분리, 일반 DB 사용 가능\nEvent Sourcing만: 이벤트 저장, 단일 모델 가능\n함께 사용: 시너지 효과",
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
    "answer": "자연스러운 동기화: 이벤트가 Query 모델 업데이트 트리거\n다양한 뷰: 같은 이벤트로 여러 Query 모델 구축\n시간 여행 쿼리: 과거 시점의 Read Model 재구성\n이벤트 재처리: 새로운 Read Model 추가 용이",
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
    "answer": "정의: 데이터를 여러 DB 인스턴스에 수평 분할하여 저장\n\n필요성:\n단일 DB의 용량/성능 한계 극복\n읽기/쓰기 부하 분산\n수평적 확장(Scale-out)",
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
    "answer": "파티셔닝: 단일 DB 인스턴스 내에서 테이블을 논리적으로 분할\n\n샤딩: 여러 물리적 DB 인스턴스에 데이터 분산\n\n비교   파티셔닝   샤딩\n\n범위   단일 DB   다중 DB\n확장   수직   수평\n복잡도   낮음   높음",
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
    "answer": "수직 샤딩: 테이블/컬럼 단위로 분리 (예: 사용자 테이블은 DB1, 주문 테이블은 DB2)\n\n수평 샤딩: 행(row) 단위로 분리 (예: user_id 1-1000은 DB1, 1001-2000은 DB2)\n\n비교   수직   수평\n\n분리 단위   테이블/컬럼   행\n확장성   제한적   무한\n복잡도   낮음   높음",
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
    "answer": "수직 샤딩 선택:\n특정 테이블만 부하가 높을 때\n도메인별 분리가 명확할 때\n초기 단계 확장\n\n수평 샤딩 선택:\n단일 테이블의 데이터가 매우 클 때\n무한 확장이 필요할 때\n균등한 부하 분산 필요",
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
    "answer": "카디널리티: 충분히 다양한 값 (균등 분포)\n쿼리 패턴: 자주 사용되는 조회 조건\n데이터 분포: 균등한 데이터 분산\n불변성: 변경되지 않는 값",
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
    "answer": "Hotspot: 특정 샤드에 트래픽 집중\n불균형 데이터: 샤드 간 데이터 크기 불균형\nCross-shard 쿼리 증가: 샤드 키 없는 쿼리 성능 저하\n리샤딩 비용: 키 변경 시 전체 데이터 마이그레이션",
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
    "answer": "복합 샤드 키: 여러 필드 조합\n해시 샤딩: 키를 해시하여 분산\nSalt 추가: 키에 랜덤 값 추가\n시간 기반 분산: 타임스탬프에 랜덤 요소 추가",
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
    "answer": "Range Sharding (범위 기반):\n키 범위로 분할 (예: A-M → 샤드1, N-Z → 샤드2)\n장점: 범위 쿼리 효율적, 정렬된 스캔 용이\n단점: Hotspot 발생 가능 (최근 데이터에 쓰기 집중)\n적합: 시계열 데이터, 범위 검색이 많은 경우\n\nHash Sharding (해시 기반):\n키의 해시 값으로 분할\n장점: 균등 분산, Hotspot 방지\n단점: 범위 쿼리 시 모든 샤드 스캔 필요\n적합: Point 쿼리 위주, 균등 분산 중요\n\nDirectory-based (디렉토리 기반):\n룩업 테이블/서비스로 샤드 매핑\n장점: 가장 유연, 동적 리밸런싱 용이\n단점: 룩업 서비스가 SPOF/병목\n적합: 복잡한 샤딩 규칙, 자주 변경되는 경우\n\n하이브리드: 여러 전략 조합 가능 (예: 지역별 Range + 사용자별 Hash)",
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
    "answer": "mongos: 쿼리 라우터. 클라이언트 요청을 적절한 샤드로 전달\n\nConfig Server: 메타데이터 저장. 샤드 키 범위, 청크 위치 정보\n\nShard: 실제 데이터 저장. 각 샤드는 레플리카 셋",
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
    "answer": "청크: 연속된 샤드 키 범위의 데이터 집합. 기본 128MB\n\n밸런서: 백그라운드 프로세스\n샤드 간 청크 균등 분배\n청크 분할 (split) 및 마이그레이션",
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
    "answer": "인덱스: 문서의 논리적 컨테이너\n\n샤드: 인덱스를 물리적으로 분할한 단위 (Primary Shard)\n\n레플리카: 샤드의 복제본. 가용성과 읽기 성능 향상",
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
    "answer": "Consistent Hashing:\n해시 링(Ring)에 노드 배치\n파티션 키 해시 → 링에서 시계방향으로 다음 노드에 저장\n노드 추가/제거 시 영향 범위 최소화\n\n장점: 노드 변경 시 일부 데이터만 재분배",
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
    "answer": "문제: 물리 노드만 사용 시 발생하는 이슈\n노드가 적으면 해시 링에서 불균등 분포\n노드 추가/제거 시 인접 노드에만 부하 집중\n\nVnode (Virtual Nodes) 해결책:\n각 물리 노드가 여러 토큰 범위 담당\n기본 256개 vnode per 물리 노드\n\n장점:\n균등한 데이터 분포 보장\n노드 추가/제거 시 여러 노드가 부하 분담\n이기종 하드웨어 지원 (강력한 서버에 더 많은 vnode)\n\n트레이드오프: 메타데이터 증가, 복구 시 스트리밍 연결 수 증가",
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
    "answer": "동작 원리:\n쿼리 라우팅: SQL 파싱 후 적절한 샤드로 전달\n결과 병합: 여러 샤드 결과 조합\n스키마 관리: 샤드 간 일관된 스키마 유지\n연결 풀링: 백엔드 DB 연결 관리",
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
    "answer": "처리 방법: Scatter-Gather - 모든 관련 샤드에 쿼리 후 결과 병합\n\n성능 문제:\n네트워크 지연 증가 (다중 샤드 통신)\nTail Latency: 가장 느린 샤드가 전체 응답 결정\n메모리 증가 (결과 병합/정렬)\n페이지네이션 복잡\n\n최적화 전략:\n샤드 키 포함 쿼리 유도: 쿼리에 샤드 키 조건 추가\n병렬 실행: 샤드 쿼리 동시 실행\n캐싱: 자주 사용되는 크로스 샤드 결과 캐싱\n비정규화: 자주 조회 데이터 복제\n\n트레이드오프: 비정규화 → 조회 성능 향상, 쓰기 복잡도 증가",
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
    "answer": "방법:\nCo-location: 관련 데이터를 같은 샤드에 배치\n애플리케이션 레벨 JOIN: 별도 쿼리 후 앱에서 조합\n브로드캐스트 조인: 작은 테이블 전체 복제\n비정규화: JOIN 불필요하게 데이터 구조 변경",
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
    "answer": "단일 샤드: 로컬 트랜잭션 사용\n\nCross-shard:\n2PC: 분산 트랜잭션 (성능 저하)\nSAGA: 보상 트랜잭션으로 최종 일관성\n설계로 회피: 관련 데이터 같은 샤드 배치",
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
    "answer": "정의: 샤드 수 변경 또는 샤딩 전략 변경으로 데이터 재분배\n\n필요 시점:\n샤드 용량 한계 도달\nHotspot 해결\n샤드 키 변경\n노드 추가/제거",
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
    "answer": "온라인 리샤딩 단계:\n이중 쓰기: 기존/신규 샤드에 동시 쓰기\n백필: 기존 데이터를 신규 샤드로 복사\n검증: 데이터 일관성 확인\n트래픽 전환: 읽기를 신규 샤드로 전환\n정리: 기존 샤드 데이터 삭제",
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
    "answer": "C (Consistency): 모든 노드가 동일한 최신 데이터를 반환 (Linearizability)\n\nA (Availability): 장애가 없는 모든 노드가 합리적인 시간 내에 응답\n\nP (Partition Tolerance): 네트워크 분할(메시지 유실/지연)에도 시스템 동작\n\n정리: 네트워크 파티션 발생 시, 일관성(C)과 가용성(A) 중 하나를 선택\n\n중요한 오해 바로잡기:\n\"3개 중 2개 선택\"은 오해를 유발하는 표현\nP는 선택이 아닌 현실 (네트워크는 반드시 실패함)\n실제 선택: 파티션 발생 시 C 또는 A 중 무엇을 희생할 것인가\n파티션이 없을 때는 C와 A 모두 가능",
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
    "answer": "이유: 네트워크 파티션은 피할 수 없는 현실\n분산 시스템에서 네트워크 장애는 반드시 발생\nP를 포기 = 단일 노드 시스템 = 분산 시스템이 아님\n\n결론: 실제 선택은 CP vs AP",
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
    "answer": "CP (Consistency + Partition Tolerance):\n파티션 발생 시 일관성 유지를 위해 일부 요청 거부\n예: ZooKeeper, etcd, HBase, Spanner\n적합: 금융 거래, 재고 관리 등 정확성이 핵심\n\nAP (Availability + Partition Tolerance):\n파티션 발생 시에도 모든 노드가 요청 처리 (최종 일관성)\n예: Cassandra, DynamoDB, CouchDB, Riak\n적합: 소셜 미디어 피드, 장바구니 등 가용성이 핵심\n\n함정 주의:\nMongoDB는 구성에 따라 CP 또는 AP가 될 수 있음 (writeConcern, readConcern)\n대부분의 시스템은 Tunable Consistency 지원\n동일 시스템 내에서 작업별로 다른 일관성 수준 선택 가능",
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
    "answer": "동작:\n과반수(Quorum) 미달 파티션은 요청 거부\n일관성 유지를 위해 가용성 희생\n클라이언트는 에러 또는 타임아웃 수신\n\n예시: ZooKeeper에서 리더와 연결 끊긴 팔로워는 읽기/쓰기 불가",
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
    "answer": "동작:\n모든 파티션이 계속 요청 처리\n일관성 포기, 충돌 가능\n파티션 복구 후 충돌 해결 (reconciliation)\n\n예시: Cassandra는 파티션 상태에서도 각 노드가 독립적으로 쓰기 허용",
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
    "answer": "비판 근거:\n파티션은 드묾: 정상 상황(대부분의 시간)에서는 C와 A 모두 가능\n이분법적 표현의 한계: 실제로는 연속적 스펙트럼에서 트레이드오프\nLatency 미고려: 실제 시스템에서는 응답 시간이 가용성만큼 중요\n일관성 정의 모호: CAP의 C는 Linearizability인데, 실무에서는 다양한 수준 존재\n\n대안 - PACELC 이론:\nPartition 발생 시: Availability vs Consistency\nElse (정상 상황): Latency vs Consistency\n\n예시:\nDynamoDB: PA/EL (파티션 시 가용성, 평소엔 지연 우선)\nSpanner: PC/EC (항상 일관성 우선)\nCassandra: PA/EL (튜닝 가능)",
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
    "answer": "최종 일관성: 업데이트 중단 시 결국 모든 노드가 같은 값 수렴\n\nAP 시스템과의 관계:\nAP 시스템은 가용성을 위해 강한 일관성 포기\n대신 최종 일관성 제공\n예: Cassandra, DynamoDB",
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
    "answer": "Read-your-writes: 자신이 쓴 것은 즉시 읽기 가능\nMonotonic Reads: 한번 본 값보다 과거 값 읽기 불가\nMonotonic Writes: 쓰기 순서 보장\nCausal Consistency: 인과 관계 있는 연산 순서 보장\nSession Consistency: 세션 내 일관성 보장",
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
    "answer": "문제: 분산 노드들이 하나의 값/결정에 동의하는 것\n\n필요 상황:\n리더 선출\n분산 트랜잭션 커밋 여부\n로그 복제 순서\n설정 변경",
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
    "answer": "문제 설정:\n여러 장군이 공격/후퇴 합의 필요\n일부 장군이 배신자(거짓 정보 전달)\n배신자가 있어도 올바른 합의 도달 필요\n\n조건: n개 노드 중 f개 악의적 노드가 있을 때, n >= 3f + 1 이어야 합의 가능",
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
    "answer": "가정하는 장애: 악의적(Byzantine) 장애\n노드가 의도적으로 잘못된 정보 전송\n해킹, 버그, 하드웨어 오류로 비정상 동작\n\n중요성:\n신뢰할 수 없는 노드 환경 (퍼블릭 블록체인)\n고신뢰성 시스템 (항공, 금융)",
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
    "answer": "BFT: 악의적 노드가 있어도 시스템이 올바르게 동작\n\n블록체인 관계:\n퍼블릭 블록체인은 신뢰 없는 참여자 환경\nPoW, PoS 등은 BFT의 변형\nPBFT는 프라이빗 블록체인에서 사용 (Hyperledger)",
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
    "answer": "CFT (Crash Fault Tolerance) - Raft, Paxos:\n노드가 크래시만 가정 (정직한 실패: 응답 없음 또는 정상 응답)\nf개 장애 허용에 2f+1 노드 필요\n메시지 복잡도: O(n) per operation\n성능 우수, 대부분의 내부 시스템에 적합\n\nBFT (Byzantine Fault Tolerance) - PBFT, HotStuff:\n악의적 노드 가정 (거짓 응답, 선택적 무응답 등)\nf개 장애 허용에 3f+1 노드 필요\n메시지 복잡도: O(n^2) per operation\n성능 저하, 신뢰할 수 없는 참여자 환경에 필요\n\n트레이드오프:\n기준   CFT   BFT\n\n장애 유형   크래시만   악의적 포함\n노드 수   2f+1   3f+1\n성능   높음   낮음\n사용처   내부 시스템   블록체인, 고신뢰 시스템",
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
    "answer": "과정:\n리더 heartbeat 타임아웃 발생\nFollower가 Candidate로 전환\nTerm 증가, 자신에게 투표, 다른 노드에 RequestVote 전송\n과반수 투표 획득 시 리더 선출\n리더는 heartbeat 전송 시작",
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
    "answer": "과정:\n클라이언트 요청 → 리더가 로그에 추가\n리더가 AppendEntries RPC로 팔로워에 전파\n과반수 복제 완료 시 커밋\n다음 heartbeat에서 커밋 알림\n팔로워도 커밋 적용",
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
    "answer": "가용성: 노드 장애 시 다른 복제본이 서비스 지속\n\n확장성: 읽기 부하를 여러 복제본에 분산\n\n추가 이점:\n지리적 분산 (지연 감소)\n데이터 내구성",
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
    "answer": "동기식 (Synchronous):\n모든 복제본 확인 후 클라이언트에 응답\n장점: 데이터 유실 없음 (RPO=0), 강한 일관성\n단점: 가장 느린 복제본에 종속, 복제본 장애 시 전체 중단\n적합: 금융 거래 등 데이터 손실 불가한 경우\n\n비동기식 (Asynchronous):\n로컬 쓰기 후 즉시 응답, 복제는 백그라운드\n장점: 낮은 지연, 높은 가용성\n단점: 데이터 유실 가능 (RPO>0), 복제 지연(Replication Lag)\n적합: 대부분의 읽기 중심 워크로드\n\n트레이드오프:\n방식   RPO   지연   처리량   가용성\n\n동기식   0   높음   낮음   낮음\n비동기식   >0   낮음   높음   높음\n\n실무 고려: 지리적 분산 복제는 네트워크 지연으로 비동기 권장",
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
    "answer": "정의: 최소 하나의 복제본 확인 후 커밋 응답\n\n해결 문제:\n동기식의 성능 저하\n비동기식의 데이터 유실 위험\n\n동작: 리더 + 최소 1개 복제본 확인 → 커밋",
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
    "answer": "구조:\n하나의 리더(Master): 모든 쓰기 처리\n여러 팔로워(Slave): 리더 복제, 읽기 처리\n\n복제 흐름:\n클라이언트 → 리더 쓰기\n리더 → 팔로워 복제\n클라이언트 ← 팔로워 읽기",
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
    "answer": "장점:\n단순한 구현\n쓰기 충돌 없음\n일관성 유지 용이\n\n단점:\n리더가 SPOF\n쓰기 확장 불가 (수직 확장만)\n리더-팔로워 지연",
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
    "answer": "쓰기 불가: 새 쓰기 요청 처리 불가\n데이터 유실 가능: 비동기 복제 시 미복제 데이터 손실\n서비스 중단: Failover까지 다운타임\n읽기 일관성 문제: 복제본 간 데이터 차이",
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
    "answer": "Failover 단계:\n장애 감지: 타임아웃으로 리더 다운 인식\n새 리더 선출: 가장 최신 데이터 가진 팔로워 선택\n구성 변경: 클라이언트/팔로워에게 새 리더 알림\n복구: 이전 리더 복귀 시 팔로워로 전환",
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
    "answer": "Split-Brain 정의: 네트워크 파티션으로 각 파티션이 자신이 리더라고 판단, 두 개 이상의 리더가 동시 존재\n\n문제:\n양쪽 리더가 동시에 쓰기 처리 → 데이터 불일치\n파티션 복구 후 충돌 해결 어려움\n데이터 손실 또는 corruption 가능\n\n방지 방법:\nQuorum (과반수 투표): 과반수 노드와 통신 가능해야 리더 유지\n예: 5노드 중 3개 이상 연결된 쪽만 리더\nFencing (차단): 이전 리더를 강제로 격리\nSTONITH (Shoot The Other Node In The Head)\nFencing Token: 새 리더만 유효한 토큰 사용\nLease (임대): 리더 권한에 TTL 설정\n갱신 실패 시 자동으로 리더십 상실\n\n핵심 통찰: 파티션 시 \"누가 죽었는지\" 판단 불가 → 스스로 포기하는 메커니즘 필수",
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
    "answer": "원인:\n리더에 쓰기 완료\n팔로워에 복제 전 리더 다운\n팔로워가 새 리더로 승격\n복제되지 않은 쓰기 데이터 유실\n\n대책: Semi-sync 복제, 수동 승인",
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
    "answer": "수직 확장: 리더 서버 스펙 향상\n샤딩: 여러 샤드로 분산, 각 샤드마다 리더\n다중 리더: 여러 리더 허용 (충돌 해결 필요)\n쓰기 최적화: 배치 처리, 비동기 쓰기",
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
    "answer": "구조: 여러 노드가 모두 리더 역할, 쓰기 허용\n\n복제: 각 리더가 다른 리더에게 변경 전파\n\n사용 사례:\n다중 데이터센터\n오프라인 클라이언트 (노트 앱)",
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
    "answer": "Multi-Datacenter: 각 DC에 로컬 리더 → 지연 감소\n오프라인 작업: 오프라인에서 쓰기 후 동기화\n협업 도구: 동시 편집 (Google Docs)\n고가용성: 리더 장애에도 다른 리더로 계속 서비스",
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
    "answer": "발생 상황: 두 리더가 동시에 같은 데이터 수정\n\n예시:\n리더A: 이름을 \"Alice\"로 변경\n리더B: 이름을 \"Bob\"으로 변경\n둘 다 성공 후 복제 시 충돌\n\n문제: 어떤 값이 최종 값인가?",
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
    "answer": "감지 방법:\n버전 벡터 (Vector Clock): 각 노드별 버전 추적, 동시성 감지\n타임스탬프 비교: 물리적/논리적 시계 사용\n복제 시점에 충돌 발견\n\n해결 전략 (트레이드오프 포함):\nLWW (Last Write Wins):\n타임스탬프 최신 값 승리\n장점: 단순, 결정론적\n단점: 데이터 유실, 시계 동기화 의존\n병합 (Merge):\n두 값 합치기 (예: 집합의 합집합)\n장점: 데이터 유실 없음\n단점: 모든 데이터 타입에 적용 불가\n사용자 해결:\n충돌 표시 후 사용자/애플리케이션이 선택\n장점: 비즈니스 로직 반영\n단점: UX 저하, 구현 복잡\nCRDT (Conflict-free Replicated Data Types):\n수학적으로 자동 병합 가능한 데이터 구조\n예: G-Counter, LWW-Register, OR-Set\n장점: 자동 해결\n단점: 지원 타입 제한, 메모리 오버헤드",
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
    "answer": "문제점:\n데이터 유실: 먼저 쓴 값은 사라짐\n시계 동기화: 노드 간 시계 불일치 시 잘못된 판단\n동시 쓰기: 실제 동시 발생 시 임의 선택\n비즈니스 규칙 무시: 도메인 로직과 무관하게 결정",
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
    "answer": "다중 리더: 지정된 리더들이 쓰기 처리\n\n리더리스: 모든 노드가 동등, 클라이언트가 여러 노드에 직접 쓰기\n\n차이:\n비교   Multi-Leader   Leaderless\n\n리더   지정됨   없음\n쓰기   리더만   모든 노드\n조정   리더 간 복제   Quorum",
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
    "answer": "N: 총 복제본 수\nW: 쓰기 확인 필요 노드 수\nR: 읽기 확인 필요 노드 수\n\nR + W > N: 읽기와 쓰기 노드 집합이 반드시 겹침 → 최신 데이터 보장\n\n예시: N=3, W=2, R=2 → 2+2 > 3 ✓",
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
    "answer": "Read Repair: 읽기 시 불일치 발견하면 최신 값으로 복구\n\nAnti-entropy: 백그라운드에서 노드 간 데이터 비교/복구\n\nVector Clock: 버전 추적으로 충돌 감지\n\n해결: LWW, Merge, 애플리케이션 해결",
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
    "answer": "RDBMS (PostgreSQL, MySQL):\n특징: 정형 데이터, ACID, 복잡한 조인, 강한 일관성\n적합: 금융, ERP, 관계형 데이터\n제한: 수평 확장 어려움\n\nKey-Value (Redis, DynamoDB):\n특징: 단순 조회, 매우 높은 성능\n적합: 캐싱, 세션, 실시간 카운터\n제한: 복잡한 쿼리 불가\n\nDocument (MongoDB, Couchbase):\n특징: 유연한 스키마, JSON 중첩\n적합: 콘텐츠 관리, 카탈로그\n제한: 조인 비효율\n\nWide-Column (Cassandra, HBase):\n특징: 대용량 쓰기, 시계열\n적합: IoT, 로그, 시계열 분석\n제한: 복잡한 쿼리 불가\n\nGraph (Neo4j):\n특징: 관계 탐색 최적화\n적합: 소셜 네트워크, 추천\n제한: 집계 쿼리 비효율\n\n선택 기준: ACID 필수 → RDBMS, 높은 쓰기 → Wide-Column, 유연한 스키마 → Document, 관계 분석 → Graph",
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
    "answer": "동기식 (REST, gRPC) 선택:\n즉각적 응답 필요 (사용자 대기)\n단순한 요청-응답 패턴\n강한 일관성 필요\n예: 인증, 결제 검증, 실시간 조회\n\n비동기식 (이벤트, 메시지) 선택:\n응답 대기 불필요\n느슨한 결합이 중요\n확장성/탄력성 중요\n작업이 오래 걸리는 경우\n예: 알림, 로그 처리, 주문 후처리\n\n트레이드오프:\n기준   동기식   비동기식\n\n결합도   높음   낮음\n복잡도   낮음   높음 (브로커 운영)\n장애 전파   연쇄 장애 위험   격리 가능\n디버깅   용이   어려움\n\n실무 권장: 하이브리드 - Query는 동기식, Event는 비동기식",
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
    "answer": "역할:\n단일 진입점: 클라이언트에게 하나의 엔드포인트 제공\n라우팅: 요청을 적절한 서비스로 전달\n인증/인가: 중앙화된 보안 (JWT 검증, OAuth)\nRate Limiting: 트래픽 제어, DDoS 방어\n응답 집계: 여러 서비스 응답 병합 (BFF 패턴)\n프로토콜 변환: REST ↔ gRPC\n캐싱: 응답 캐싱으로 백엔드 부하 감소\n\n트레이드오프:\n장점: 횡단 관심사 중앙화, 서비스 변경 시 클라이언트 영향 최소화\n단점: SPOF 위험, 추가 네트워크 홉, 병목 가능\n\n대규모 시스템 고려:\nGateway 고가용성 (클러스터링, 다중 리전)\n분산 트레이싱 통합",
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
    "answer": "Service Mesh 정의: 서비스 간 통신을 담당하는 전용 인프라 계층, Sidecar Proxy 배치\n\n차이점:\n비교   API Gateway   Library   Service Mesh\n\n위치   Edge (외부 경계)   애플리케이션 내   Sidecar (각 Pod)\n범위   North-South   애플리케이션   East-West\n언어 의존   무관   언어별   무관\n업데이트   Gateway만   앱 재배포   Proxy만\n\nService Mesh 기능: mTLS, 트래픽 관리, 관찰성, 회복력\n\n트레이드오프:\n장점: 언어 독립적, 일관된 정책, 앱 코드 간소화\n단점: 운영 복잡도 증가, 추가 리소스, 디버깅 어려움\n\n도입 시점: 다양한 언어 혼용, 엄격한 보안 요구, 대규모 MSA (10개 이상)\n\n예시: Istio, Linkerd, Consul Connect",
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
    "answer": "WebSocket이란?\n클라이언트와 서버 간 양방향 전이중(Full-Duplex) 통신을 제공하는 프로토콜\n단일 TCP 연결을 통해 지속적인 통신 가능\nws:// (비암호화) 또는 wss:// (TLS 암호화) 스킴 사용\n\nHTTP와의 주요 차이점\n\n구분   HTTP   WebSocket\n\n통신 방식   요청-응답 (반이중)   양방향 (전이중)\n연결   요청-응답 후 종료 (Keep-Alive로 재사용 가능)   한 번 연결 후 지속 유지\n오버헤드   매 요청마다 헤더 전송   초기 핸드셰이크 후 2-14바이트 프레임 헤더\n서버 푸시   불가 (폴링 필요)   언제든 가능\n상태   Stateless   Stateful\n\n참고: HTTP/1.1의 Keep-Alive는 연결을 재사용하지만, 여전히 요청-응답 패턴이며 서버가 먼저 데이터를 보낼 수 없습니다.",
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
    "answer": "WebSocket Handshake 과정\n\nWebSocket 연결은 HTTP Upgrade 요청으로 시작됩니다.\n클라이언트 요청\n서버 응답\n\n주요 헤더 설명\nUpgrade: websocket: 프로토콜 업그레이드 요청\nConnection: Upgrade: 연결 업그레이드 의사 표시\nSec-WebSocket-Key: 클라이언트가 생성한 16바이트 랜덤 값의 Base64 인코딩\nSec-WebSocket-Accept: 서버 응답 검증용\nGUID는 RFC 6455에 정의된 고정 문자열\n서버가 WebSocket을 이해함을 증명 (프록시 오동작 방지)\nSec-WebSocket-Version: 프로토콜 버전 (현재 13, RFC 6455)\nSec-WebSocket-Protocol: (선택) 서브프로토콜 협상 (예: graphql-ws)\nSec-WebSocket-Extensions: (선택) 확장 협상 (예: permessage-deflate)",
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
    "answer": "WebSocket 프레임 구조\n\n주요 필드\nFIN: 메시지의 마지막 프레임인지 표시 (1비트)\nRSV1-3: 확장용 예약 비트 (permessage-deflate가 RSV1 사용)\nOpcode: 프레임 타입 (4비트)\n0x0: Continuation (분할 메시지의 후속 프레임)\n0x1: Text (UTF-8 텍스트)\n0x2: Binary (바이너리 데이터)\n0x8: Close, 0x9: Ping, 0xA: Pong (제어 프레임)\nMASK: 마스킹 여부 (1비트)\n클라이언트→서버: 반드시 1 (MUST)\n서버→클라이언트: 반드시 0 (MUST NOT)\nPayload length: 페이로드 크기\n0-125: 7비트로 직접 표현\n126: 다음 2바이트가 실제 길이 (16비트)\n127: 다음 8바이트가 실제 길이 (64비트)\n\n마스킹의 목적 (중요)\n프록시 캐시 포이즈닝 공격 방지\n클라이언트가 매 프레임마다 랜덤 4바이트 마스킹 키 생성\n마스킹되지 않은 클라이언트 프레임 수신 시 연결 종료 (MUST)",
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
    "answer": "구분   Long Polling   WebSocket   SSE\n\n연결 방식   HTTP 요청을 길게 유지   단일 TCP 연결 유지   HTTP 스트림 유지\n통신 방향   단방향 (요청-응답)   양방향   단방향 (서버→클라이언트)\n오버헤드   매 요청마다 HTTP 헤더   핸드셰이크 후 2-14바이트   HTTP 스트림이라 중간\n지연시간   응답 후 재연결 필요   실시간   실시간\n서버 부하   연결 재설정 비용 높음   연결 유지 비용만   연결 유지 비용\n호환성   모든 브라우저/프록시   일부 프록시 문제 가능   HTTP 기반이라 좋음\n재연결   직접 구현   직접 구현   자동 재연결 내장\n데이터 형식   모두 가능   텍스트/바이너리   텍스트만 (UTF-8)\n\nLong Polling 동작\n클라이언트가 요청 전송\n서버는 이벤트가 발생할 때까지 응답 대기 (보통 20-30초 타임아웃)\n이벤트 발생 시 응답 반환\n클라이언트가 즉시 새 요청 전송 (반복)\n\n선택 기준 (트레이드오프)\n상황   권장 기술   이유\n\n양방향 실시간 (채팅, 게임)   WebSocket   클라이언트→서버 즉시 전송 필요\n단방향 실시간 (알림, 주식)   SSE   간단하고 자동 재연결 지원\n레거시/프록시 환경   Long Polling   호환성 최고, 폴백용\n바이너리 데이터 스트리밍   WebSocket   SSE는 텍스트만 지원\n빠른 프로토타이핑   SSE   구현이 가장 간단",
    "references": []
  },
  {
    "id": "WS-005",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 통신에서 보안을 강화하기 위한 주요 고려 사항은 무엇인가요?",
    "answer": "WSS (WebSocket Secure) 사용\nwss:// 프로토콜로 TLS/SSL 암호화 적용\n중간자 공격(MITM) 방지\nOrigin 검증\n인증 및 토큰 관리\n핸드셰이크 시 JWT 토큰 검증\n쿼리 파라미터나 첫 메시지로 토큰 전달\n토큰 만료 시 연결 종료 처리\n입력 검증\n모든 수신 메시지의 형식 및 크기 검증\nXSS, 인젝션 공격 방지\nRate Limiting\n메시지 빈도 제한으로 DoS 공격 방지\n연결 수 제한\n메시지 크기 제한\n최대 프레임/메시지 크기 설정\n메모리 고갈 공격 방지\n마스킹 검증 (서버)\n\n흔한 실수와 함정\n실수   위험   해결\n\nOrigin 검증 안 함   CSWSH 공격   화이트리스트 검증\nws:// 사용   평문 노출   wss:// 필수\n쿼리 파라미터에 토큰   URL 로깅에 노출   첫 메시지로 전송\n토큰 만료 미처리   무한 세션 유지   주기적 재검증",
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
    "answer": "재연결 구현 핵심 요소\nExponential Backoff (지수 백오프)\n고려사항\nJitter 추가: 다수 클라이언트 동시 재연결 방지 (Thundering Herd 문제)\n최대 재시도 횟수: 무한 재시도 방지\n상태 복구: 재연결 후 구독 정보 재전송\n오프라인 감지: navigator.onLine 활용\n라이브러리 활용\nSocket.IO: 자동 재연결 내장\nReconnectingWebSocket: 경량 재연결 래퍼",
    "references": []
  },
  {
    "id": "WS-007",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 프로토콜에서 사용되는 상태 코드와 그 의미에 대해 설명해주세요.",
    "answer": "주요 Close 상태 코드 (RFC 6455)\n\n코드   이름   설명   전송 가능 여부\n\n1000   Normal Closure   정상 종료   O\n1001   Going Away   서버 셧다운, 브라우저 이탈   O\n1002   Protocol Error   프로토콜 오류   O\n1003   Unsupported Data   지원하지 않는 데이터 타입   O\n1005   No Status Received   상태 코드 없이 종료됨   X (API 전용)\n1006   Abnormal Closure   비정상 종료 (TCP 끊김)   X (API 전용)\n1007   Invalid Payload   잘못된 데이터 (예: UTF-8 오류)   O\n1008   Policy Violation   정책 위반   O\n1009   Message Too Big   메시지 크기 초과   O\n1010   Mandatory Extension   필수 확장 미지원 (클라이언트만)   O\n1011   Internal Error   서버 내부 오류   O\n1015   TLS Handshake   TLS 핸드셰이크 실패   X (API 전용)\n\n중요: 1005, 1006, 1015는 Close 프레임으로 전송하면 안 됩니다 (MUST NOT). 이 코드들은 WebSocket API가 애플리케이션에 상태를 알리기 위해 내부적으로 사용합니다.\n\n사용자 정의 코드 범위\n3000-3999: 라이브러리/프레임워크용 (IANA 등록 가능)\n4000-4999: 애플리케이션용 (비공개 사용)\n\n사용 예시",
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
    "answer": "Ping/Pong 개념\nWebSocket 제어 프레임 (Opcode: Ping=0x9, Pong=0xA)\n연결 상태 확인 및 유지(Keep-Alive) 목적\n\n동작 방식\n한 쪽이 Ping 프레임 전송 (Application Data 포함 가능, 최대 125바이트)\n수신 측은 반드시 동일한 Application Data로 Pong 응답 (MUST)\n응답 없으면 연결 끊김으로 판단\nPong은 Ping 없이도 전송 가능 (단방향 heartbeat)\n\n주의사항\n브라우저 WebSocket API는 Ping/Pong을 직접 노출하지 않음\n브라우저는 Ping 수신 시 자동으로 Pong 응답\n애플리케이션 레벨 heartbeat가 필요하면 일반 메시지로 구현\n\n활용 목적\n연결 상태 확인: Dead connection 감지\nNAT/방화벽 타임아웃 방지: 주기적 트래픽으로 연결 유지\n지연시간 측정: RTT(Round Trip Time) 계산\n\n구현 예시",
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
    "answer": "WebSocket 확장이란?\n기본 WebSocket 프로토콜에 추가 기능을 제공하는 메커니즘\n핸드셰이크 시 Sec-WebSocket-Extensions 헤더로 협상\n\n대표적인 확장\npermessage-deflate (RFC 7692)\n메시지 압축 확장\nzlib/DEFLATE 알고리즘 사용\n대역폭 절약 (텍스트 데이터 70-90% 압축)\n사용 예시\n\n주의사항\n압축/해제에 CPU 오버헤드 발생\n작은 메시지는 압축 효율 낮음\n이미 압축된 데이터(이미지 등)는 비효율적",
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
    "answer": "WebSocket과 CORS의 관계\n\nWebSocket은 HTTP CORS 정책(preflight OPTIONS 요청)의 적용을 받지 않습니다. 이것이 보안상 위험한 이유:\nCORS preflight 없음: 브라우저가 사전 검사 없이 바로 연결 시도\nOrigin 헤더 전송: 브라우저는 Origin 헤더를 전송하지만, 서버 검증이 필수는 아님\n쿠키 자동 전송: 동일 도메인이면 인증 쿠키가 자동으로 포함됨\n\n브라우저 동작\n브라우저는 핸드셰이크 시 Origin 헤더를 자동 전송\n서버가 검증하지 않으면 어떤 Origin에서든 연결 가능\nCORS처럼 브라우저가 차단하지 않음 (서버 책임)\n\n보안 문제: CSWSH (Cross-Site WebSocket Hijacking)\n악성 사이트에서 사용자의 인증된 세션으로 WebSocket 연결 시도\n서버가 Origin을 검증하지 않으면 공격자가 사용자 대신 통신 가능\nCSRF와 유사하지만, WebSocket은 지속적 양방향 통신이므로 더 위험\n\n해결 방법\n서버 측 Origin 검증\n토큰 기반 인증\n핸드셰이크 URL에 일회용 토큰 포함\n첫 메시지에서 JWT 검증\nCSRF 토큰 활용\n기존 웹 애플리케이션의 CSRF 토큰 재사용",
    "references": []
  },
  {
    "id": "WS-011",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "단일 서버와 클러스터 환경에서의 WebSocket 구현 차이점은 무엇인가요?",
    "answer": "단일 서버 환경\n모든 연결이 하나의 서버 메모리에 존재\n브로드캐스트가 간단 (로컬 연결만 순회)\n수직 확장의 한계\n\n클러스터 환경의 문제점\n클라이언트 A와 B가 서로 다른 서버에 연결\nA가 B에게 메시지를 보내려면 서버 간 통신 필요\nSticky Session만으로는 불충분\n\n해결 방법\nPub/Sub 백엔드 (권장)\n외부 메시지 브로커\nRedis, Kafka, RabbitMQ 등 활용\n서버 간 메시지 동기화\nSocket.IO Redis Adapter\n\n스케일링 고려사항\n\n규모   연결 수   권장 아키텍처\n\n소규모   ~1만   단일 서버 + Redis\n중규모   1-10만   다중 서버 + Redis Pub/Sub\n대규모   10만+   Kafka/NATS + 샤딩\n\n실제 운영 시 고려점\nSticky Session의 한계: 서버 장애 시 재연결이 다른 서버로 가면 상태 유실\nRedis Pub/Sub 병목: 대량 브로드캐스트 시 Redis가 병목 가능\n연결 재분배: 서버 추가 시 기존 연결은 자동 재분배되지 않음\n상태 저장소 분리: 연결 상태는 Redis, 영속 데이터는 DB",
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
    "answer": "데이터 프레임 타입\nText Frame (Opcode 0x1): UTF-8 인코딩 문자열\nBinary Frame (Opcode 0x2): 바이트 배열\n\n텍스트 데이터 (JSON 등)\n\n장점   단점\n\n사람이 읽기 쉬움   크기가 큼 (Base64 인코딩 시 33% 증가)\n디버깅 용이   파싱 오버헤드\n호환성 높음   바이너리 데이터 표현 비효율적\n\n이진 데이터 (Protobuf, MessagePack 등)\n\n장점   단점\n\n작은 페이로드 크기   디버깅 어려움\n파싱 속도 빠름   스키마 관리 필요\n바이너리 데이터 직접 전송   추가 라이브러리 필요\n\n선택 기준\n실시간 게임/미디어 스트리밍 → Binary\n일반 채팅/알림 → Text (JSON)\n대용량 트래픽 + 성능 중요 → Binary (Protobuf)",
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
    "answer": "실시간 애플리케이션 요구사항\n낮은 지연시간: 메시지가 즉시 전달되어야 함\n양방향 통신: 서버도 클라이언트에 능동적으로 푸시\n빈번한 메시지: 초당 수십~수백 건의 이벤트\n\nWebSocket이 적합한 이유\n\n요구사항   HTTP Polling   WebSocket\n\n지연시간   폴링 간격만큼 지연   실시간 (~ms)\n오버헤드   매번 HTTP 헤더   2-14바이트 프레임 헤더\n서버 푸시   불가능   가능\n연결 수   요청마다 새 연결   단일 연결 유지\n\n채팅 애플리케이션 예시\n\n게임 애플리케이션 예시\n캐릭터 위치 동기화 (초당 30-60회 업데이트)\n실시간 액션 입력 전달\n게임 상태 브로드캐스트\n\n대안과 비교\n기술   양방향   지연시간   복잡도   적합한 용도\n\nWebSocket   O   ~ms   중간   채팅, 게임, 협업\nSSE   X (단방향)   ~ms   낮음   알림, 피드, 대시보드\nLong Polling   X   높음   낮음   레거시 환경 폴백\nWebRTC   O (P2P)   ~ms   높음   영상통화, 화면공유\ngRPC Streaming   O   ~ms   중간   마이크로서비스\n\nWebRTC vs WebSocket\nWebRTC: 브라우저 간 P2P, 미디어 스트리밍에 최적화\nWebSocket: 클라이언트-서버, 텍스트/바이너리 메시지에 최적화",
    "references": []
  },
  {
    "id": "WS-014",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 서버의 부하 분산(load balancing) 전략에는 어떤 것들이 있나요?",
    "answer": "WebSocket 로드밸런싱의 특수성\nHTTP와 달리 장시간 연결 유지 (Stateful)\n한 번 연결되면 같은 서버와 통신해야 함\nSticky Session (Session Affinity)\n같은 클라이언트는 항상 같은 서버로 라우팅\nIP 해시, 쿠키 기반 등 방식 존재\nL4 로드밸런싱\nTCP 레벨에서 연결 분산\nWebSocket Upgrade 후에도 연결 유지\nAWS NLB, HAProxy 등\nL7 로드밸런싱\nHTTP Upgrade 요청 분석 가능\n경로/헤더 기반 라우팅\nNginx, Envoy, AWS ALB\n\nNginx WebSocket 프록시 설정\n서버 간 동기화 (필수)\nRedis Pub/Sub, Kafka 등으로 메시지 동기화\n어떤 서버로 연결되든 메시지 수신 보장",
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
    "answer": "리소스 관리의 중요성\n수만 개의 동시 연결 시 메모리 사용량 급증\n유휴 연결도 리소스 점유\n연결 수 제한\n유휴 연결 정리\n메시지 버퍼 제한\n메모리 모니터링\n연결당 메모리 사용량 추적\n임계치 도달 시 알림/조치\n연결 풀링 및 그룹화\nOS 레벨 튜닝",
    "references": []
  },
  {
    "id": "WS-016",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket과 HTTP/2의 주요 차이점은 무엇인가요?",
    "answer": "기본 비교\n\n구분   WebSocket   HTTP/2\n\n목적   양방향 실시간 통신   HTTP 성능 개선\n연결   단일 TCP 연결 유지   단일 TCP, 멀티플렉싱\n통신 방향   전이중 (Full-Duplex)   요청-응답 기반\n서버 푸시   자유로운 서버→클라이언트   리소스 프리로드 한정\n프레이밍   WebSocket 프레임   HTTP/2 프레임\n\nHTTP/2 특징\n멀티플렉싱: 하나의 연결에서 여러 요청/응답 병렬 처리\n헤더 압축: HPACK으로 반복 헤더 압축\nServer Push: 클라이언트 요청 전에 리소스 전송 (캐시 용도)\n주의: Chrome 106+에서 HTTP/2 Server Push 지원 제거됨\n실시간 푸시 용도로는 적합하지 않음\n스트림 우선순위: 중요한 리소스 먼저 전송\n\nWebSocket 특징\n진정한 양방향: 서버가 언제든 메시지 전송 가능\n낮은 오버헤드: 핸드셰이크 후 최소 프레임 헤더\n애플리케이션 프로토콜 자유도: 메시지 형식 자유 정의\n\n선택 기준\nWebSocket: 실시간 채팅, 게임, 협업 도구 등 양방향 필수\nHTTP/2: 웹사이트 로딩 최적화, API 호출 (REST)\n\nWebSocket over HTTP/2 (RFC 8441)\nHTTP/2 연결 위에서 WebSocket 사용 가능\n연결 효율성 + 양방향 통신 장점 결합",
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
    "answer": "메시지 최적화\n\n직렬화 포맷 선택\n\n포맷   크기   속도   사용 사례\n\nJSON   큼   보통   일반 웹앱\nMessagePack   작음   빠름   모바일 앱\nProtobuf   매우 작음   매우 빠름   고성능 시스템\n메시지 배치 처리\n압축 활용\n연결 풀링\n단일 연결로 여러 채널 멀티플렉싱\n연결 수 최소화\nBackpressure 처리\n효율적인 브로드캐스트",
    "references": []
  },
  {
    "id": "WS-018",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 서버 구축 시 장애 조치(failover) 방안을 어떻게 마련할 수 있나요?",
    "answer": "헬스 체크 및 자동 복구\n클라이언트 측 재연결\n상태 동기화 전략\nStateless 설계: 세션 상태를 Redis 등 외부 저장소에 저장\n이벤트 소싱: 재연결 시 마지막 이벤트부터 재전송\n서킷 브레이커\n다중 데이터센터\nDNS 기반 장애 조치\nGeoDNS로 가장 가까운 서버 연결\n데이터센터 간 메시지 동기화",
    "references": []
  },
  {
    "id": "WS-019",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "클라이언트에서 WebSocket 연결 오류를 디버깅하는 방법에는 어떤 것들이 있나요?",
    "answer": "브라우저 개발자 도구\n\nNetwork 탭\nWS 필터로 WebSocket 연결만 필터링\n핸드셰이크 요청/응답 헤더 확인\nMessages 탭에서 송수신 메시지 확인\n\nConsole 로깅\n이벤트 핸들러 상세 로깅\n상태 코드 분석\n코드   의미   해결 방법\n\n1000   정상 종료   정상 동작\n1001   Going Away   서버 재시작 중, 재연결 대기\n1002   프로토콜 오류   프레임 형식/라이브러리 버전 확인\n1003   지원 안되는 데이터   텍스트/바이너리 타입 확인\n1006   비정상 종료 (API 전용)   네트워크 끊김, TCP 타임아웃\n1009   메시지 너무 큼   maxPayload 설정 확인\n1011   서버 내부 오류   서버 로그 확인\n1015   TLS 실패 (API 전용)   인증서/TLS 버전 확인\n4000+   애플리케이션 정의   서버 문서 참조\n외부 도구\nWireshark: 패킷 레벨 분석\nwscat: CLI WebSocket 클라이언트\nPostman: WebSocket 요청 테스트\n서버 측 로깅 확인\n핸드셰이크 실패 원인\nOrigin 검증 실패 여부\n인증/인가 오류\n일반적인 문제와 해결\nCORS 오류: 서버 Origin 화이트리스트 확인\nSSL 오류: wss:// 사용 시 유효한 인증서 필요\n프록시 문제: Upgrade 헤더 전달 확인",
    "references": []
  },
  {
    "id": "WS-020",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket과 서버 푸시(Server-Sent Events)의 차이점은 무엇인가요?",
    "answer": "기본 비교\n\n구분   WebSocket   SSE (Server-Sent Events)\n\n통신 방향   양방향 (Full-Duplex)   단방향 (서버→클라이언트)\n프로토콜   ws:// / wss://   HTTP/HTTPS\n데이터 형식   텍스트/바이너리   텍스트만 (UTF-8)\n재연결   직접 구현 필요   자동 재연결 내장\n브라우저 지원   대부분 지원   IE 미지원 (polyfill 가능)\n프록시 호환   문제 가능   HTTP라 호환성 좋음\n연결 수 제한   도메인당 제한 없음   HTTP/1.1: 도메인당 6개\n구현 복잡도   중간   매우 간단\n\nSSE 특징\n\n트레이드오프 분석\n\n측면   WebSocket 유리   SSE 유리\n\n양방향 통신   네이티브 지원   별도 HTTP 요청 필요\n바이너리 데이터   네이티브 지원   Base64 인코딩 필요\n프록시/방화벽   문제 가능   HTTP라 통과 쉬움\n자동 재연결   직접 구현   내장 (Last-Event-ID)\nHTTP/2 활용   RFC 8441 필요   멀티플렉싱 자동 지원\n메시지 복구   직접 구현   Last-Event-ID로 자동\n구현 난이도   중간   매우 쉬움\n\nHTTP/2와의 조합\nSSE + HTTP/2: 연결 수 제한 문제 해결 (멀티플렉싱), 클라이언트→서버는 별도 fetch\nWebSocket over HTTP/2 (RFC 8441): 아직 지원 브라우저 제한적\n\n선택 기준\nSSE: 서버→클라이언트 위주 (알림, 주식, 뉴스), 빠른 개발, 메시지 복구 필요\nWebSocket: 양방향 필수 (채팅, 게임), 바이너리 데이터, 고빈도 메시지",
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
    "answer": "WSS (WebSocket Secure)\nwss:// 프로토콜 사용\nTLS/SSL 위에서 WebSocket 통신 암호화\nHTTPS와 동일한 보안 수준\n\nNode.js WSS 서버 설정\n\n인증서 관리\nLet's Encrypt: 무료 SSL 인증서 (90일 갱신)\n상용 CA: 유효 기간 긴 인증서\n자체 서명: 개발 환경용\n\nTLS 버전 설정\n\nNginx TLS 터미네이션\n\n보안 고려사항\n취약한 암호화 스위트 비활성화\nHSTS 헤더 설정\n인증서 자동 갱신 설정",
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
    "answer": "주요 문제점\nHTTP Upgrade 미지원\n일부 프록시가 Upgrade 헤더를 인식하지 못함\n101 Switching Protocols 응답 차단\n연결 타임아웃\n프록시가 유휴 연결을 강제 종료\n기본값이 짧은 경우 (30초~2분) 빈번한 끊김\n버퍼링 문제\n프록시가 응답을 버퍼링하여 실시간성 저하\n청크 전송 시 문제 발생 가능\nSSL 종료\n중간에서 SSL 종료 시 ws:// vs wss:// 혼동\n\n해결 방법\n\nNginx 프록시 설정\n\nHAProxy 설정\n\n클라이언트 측 대응\nWSS 사용 (HTTPS 포트 443 통과 용이)\nPolling 폴백 (Socket.IO 방식)\n짧은 Ping 간격으로 연결 유지",
    "references": []
  },
  {
    "id": "WS-023",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 라이브러리(예: Socket.IO, ws 등)의 차이점과 선택 기준에 대해 설명해주세요.",
    "answer": "주요 라이브러리 비교\n\n라이브러리   특징   장점   단점\n\nws   순수 WebSocket   경량, 빠름, 표준 준수   기능 최소\nSocket.IO   기능 풍부한 추상화   자동 재연결, 룸, 폴백   무거움, 비표준\nSockJS   폴백 지원   브라우저 호환성   Socket.IO보다 가벼움\nµWebSockets   고성능   매우 빠름   C++ 바인딩\n\nws (Node.js 표준)\n순수 WebSocket RFC 6455 구현\n추가 기능 없음 (직접 구현 필요)\n\nSocket.IO\n자동 재연결: 지수 백오프 내장\n룸/네임스페이스: 그룹 통신\n폴백: Long Polling 자동 전환\n이벤트 기반 API: emit/on 패턴\n\n선택 기준\n\n상황   추천\n\n고성능, 최소 오버헤드   ws, µWebSockets\n빠른 개발, 풍부한 기능   Socket.IO\n레거시 브라우저 지원   SockJS, Socket.IO\n클러스터 환경   Socket.IO (Redis Adapter)\n표준 WebSocket 클라이언트 연동   ws (Socket.IO는 호환 불가)\n\n주의: Socket.IO 클라이언트는 순수 WebSocket 서버와 호환되지 않음",
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
    "answer": "Pub/Sub 패턴\nPublisher: 메시지 발행자\nSubscriber: 메시지 구독자\nChannel/Topic: 메시지 분류\n\n기본 구현\n\nRedis Pub/Sub 연동 (클러스터 환경)\n\n고급 기능\n와일드카드 구독: news.* 패턴 매칭\n메시지 필터링: 구독 시 조건 지정\n메시지 히스토리: 최근 N개 메시지 캐싱",
    "references": []
  },
  {
    "id": "WS-025",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 연결 종료 시 graceful shutdown을 구현하는 방법은 무엇인가요?",
    "answer": "Graceful Shutdown 필요성\n클라이언트에게 종료 사유 전달\n진행 중인 메시지 처리 완료\n리소스 정리 시간 확보\n\n클라이언트 측 구현\n\n서버 측 구현\n\nClose Frame 교환\n종료 측이 Close 프레임 전송\n상대방이 Close 프레임으로 응답\nTCP 연결 종료",
    "references": []
  },
  {
    "id": "WS-026",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket의 버전 관리 및 프로토콜 업데이트가 필요한 이유는 무엇인가요?",
    "answer": "버전 관리의 필요성\nAPI 변경 시 하위 호환성 유지\n점진적 마이그레이션 지원\n클라이언트-서버 불일치 방지\n\n프로토콜 버전 관리 방법\n핸드셰이크 시 버전 협상\nSec-WebSocket-Protocol 활용\n메시지 레벨 버전\n\n업데이트 전략\nBackward Compatible: 새 필드는 optional\nDeprecation Period: 구버전 일정 기간 지원\nFeature Flags: 기능별 활성화/비활성화",
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
    "answer": "permessage-deflate 확장 (RFC 7692)\nzlib DEFLATE 알고리즘 사용\n메시지 단위로 압축/해제\n\n설정 예시\n\n고려사항\n\n항목   고려점\n\nCPU 오버헤드   압축/해제에 CPU 사용, 고빈도 메시지 시 부하\n메시지 크기   작은 메시지는 압축 효율 낮음 (오히려 증가 가능)\n이미 압축된 데이터   이미지, 동영상 등은 압축 효과 없음\n메모리 사용   Sliding window 유지에 메모리 필요\n지연시간   압축 시간만큼 추가 지연\n\n권장 사항\nthreshold 설정: 일정 크기 이상만 압축\n압축 레벨: 1-3 (빠른 속도) vs 9 (최대 압축)\nContextTakeover: false로 설정 시 메모리 절약 but 압축률 감소\n선택적 압축: 텍스트 데이터만 압축, 바이너리는 제외\n\n비활성화가 나은 경우\n짧은 메시지 위주\nCPU 리소스 제한적\n이미 압축된 데이터 (Protobuf 등)",
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
    "answer": "세션 관리의 필요성\n사용자 식별\n상태 유지 (인증, 권한)\n재연결 시 컨텍스트 복구\n연결별 세션 저장\n외부 저장소 연동 (Redis)\n쿠키 기반 세션\n재연결 시 세션 복구\n\n세션 만료 처리",
    "references": []
  },
  {
    "id": "WS-029",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 세션 관리를 기반으로 한 서버-클라이언트 간 인증 및 인가 방식은 어떻게 구현하나요?",
    "answer": "인증 타이밍\n핸드셰이크 시 (권장): 연결 전 검증\n연결 후 첫 메시지: 인증 전까지 제한된 동작만 허용\n쿼리 파라미터 토큰\n\n보안 주의: 쿼리 파라미터는 서버 로그, 브라우저 히스토리, Referer 헤더에 노출될 수 있음\n권장: 일회용 토큰 사용 (연결 후 폐기)\n대안: 첫 메시지로 토큰 전송 (아래 방법 4 참조)\n핸드셰이크 헤더 (제한적)\n쿠키 기반 인증\n첫 메시지 인증\n\n인가 (Authorization)",
    "references": []
  },
  {
    "id": "WS-030",
    "category": "websocket",
    "categoryName": "WebSocket",
    "section": "etc",
    "question": "WebSocket 기반 애플리케이션에서 발생할 수 있는 일반적인 문제와 해결 방안은 무엇인가요?",
    "answer": "연결 끊김 (Connection Drop)\n원인   해결\n\n네트워크 불안정   자동 재연결 + Exponential Backoff\n프록시/방화벽 타임아웃   Ping/Pong Heartbeat\n서버 재시작   Graceful shutdown + 클라이언트 재연결\n메시지 유실\n메모리 누수\n이벤트 리스너 해제 누락\n연결 종료 시 정리\n순서 보장 문제\n대량 연결 처리\nOS 파일 디스크립터 제한 증가\nConnection 풀링\n로드밸런서 도입\n브라우저 호환성\n폴백 메커니즘 (Long Polling)\nSocket.IO 등 라이브러리 활용\n디버깅 어려움\n구조화된 로깅\n연결 ID 추적\n메시지 샘플링 기록\n\n모니터링 지표\n동시 연결 수\n메시지 처리량 (msg/sec)\n평균 지연시간\n에러율",
    "references": []
  }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { etcData };
}
