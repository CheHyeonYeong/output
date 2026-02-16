const frameworkData = [
  {
    "id": "KTOR-001",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor가 무엇인지, 다른 웹 프레임워크(Spring, NestJS 등)와 비교했을 때 어떤 특징이 있는지 설명해 주세요.",
    "answer": "Ktor는 JetBrains에서 개발한 Kotlin 기반의 비동기 웹 프레임워크입니다.\n\n주요 특징:\n경량성: 필요한 기능만 플러그인으로 추가하는 모듈식 구조\nKotlin 네이티브: Kotlin DSL을 활용한 직관적인 API 설계\nCoroutine 기반: 비동기 처리를 코루틴으로 자연스럽게 구현 (suspend 함수가 기본)\n멀티플랫폼: 서버는 JVM 전용, 클라이언트는 JVM/Android/iOS/JavaScript/Native 지원\n서버/클라이언트 통합: 동일한 API로 서버와 HTTP 클라이언트 구현 가능\n\n> 참고: Ktor 서버는 JVM에서만 실행되지만, Ktor Client는 Kotlin Multiplatform을 완전히 지원합니다.\n\nSpring과 비교:\n항목   Ktor   Spring\n\n학습 곡선   낮음   높음\n시작 시간   빠름   상대적으로 느림\n생태계   성장 중   매우 풍부\nDI   선택적 (Koin, Kodein)   내장 (IoC Container)",
    "references": [
      {
        "title": "Ktor 공식 홈페이지",
        "url": "https://ktor.io/"
      }
    ]
  },
  {
    "id": "KTOR-002",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor의 비동기 처리 방식과 Kotlin Coroutine 연동에 대해 설명해 주세요.",
    "answer": "Ktor는 처음부터 Kotlin Coroutine을 기반으로 설계되어 비동기 처리가 자연스럽게 통합되어 있습니다.\n\n비동기 처리 방식:\n\nCoroutine 연동 특징:\n모든 핸들러가 suspend 함수: 블로킹 없이 I/O 작업 처리\nCIO 엔진: Coroutine-based I/O 엔진으로 순수 Kotlin 구현\nStructured Concurrency: 각 요청은 자체 CoroutineScope에서 실행되며, 요청 처리 완료 또는 취소 시 하위 코루틴도 함께 취소됨\n병렬 요청 처리: launch나 async를 사용해 동시 요청 가능\n\n주의사항:\nKtor의 요청 처리는 기본적으로 요청 완료까지 대기하지만, 클라이언트 연결 해제가 코루틴 취소를 보장하지는 않음\n긴 작업은 별도의 CoroutineScope에서 관리하거나 타임아웃 설정 권장",
    "references": [
      {
        "title": "Ktor Async Documentation",
        "url": "https://ktor.io/docs/async.html"
      }
    ]
  },
  {
    "id": "KTOR-003",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 Application과 Application Module의 개념에 대해 설명해 주세요.",
    "answer": "Application:\nKtor 서버의 핵심 인스턴스로, 모든 설정과 플러그인이 등록되는 컨테이너입니다.\n\nApplication Module:\nApplication의 설정을 구성하는 확장 함수입니다. 플러그인 설치, 라우팅 설정 등을 담당합니다.\n\n특징:\n모듈 분리: 기능별로 모듈을 나눠 관리 가능\n플러그인 공유: 한 모듈에 설치된 플러그인은 다른 모듈에서도 적용\n설정 파일 연동: application.conf에서 모듈 지정 가능",
    "references": [
      {
        "title": "Ktor Modules",
        "url": "https://ktor.io/docs/server-modules.html"
      }
    ]
  },
  {
    "id": "KTOR-004",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor의 경량성(Lightweight)이란 무엇을 의미하며, 어떤 장단점이 있나요?",
    "answer": "Ktor의 경량성은 필요한 기능만 선택적으로 추가하는 플러그인 기반 아키텍처를 의미합니다.\n\n경량성의 의미:\n코어에는 최소한의 기능만 포함\n인증, 직렬화, 세션 등은 별도 플러그인으로 제공\n사용하지 않는 기능은 애플리케이션에 포함되지 않음\n\n장점:\n빠른 시작 시간: 불필요한 기능 로딩 없음\n낮은 메모리 사용량: 필요한 것만 로드\n유연한 구성: 프로젝트 요구사항에 맞춤 설정\n작은 배포 크기: Fat JAR 크기 최소화\n\n단점:\n수동 설정 필요: 기능별로 직접 플러그인 추가 (예: JSON 직렬화, 인증 각각 설치)\n작은 생태계: Spring 대비 서드파티 라이브러리 부족 (특히 ORM, 보안)\n학습 필요: 필요한 플러그인 파악 및 조합 방법 학습\n일관성 부족: 프로젝트마다 다른 구성이 될 수 있어 팀 표준화 필요\n\n트레이드오프:\n관점   경량성의 장점   경량성의 비용\n\n시작 시간   ~50ms (Spring ~2-5초)   -\n메모리   ~50MB (Spring ~200MB+)   -\n개발 속도   빠른 프로토타이핑   복잡한 기능은 직접 구현\n유지보수   코드베이스 이해 용이   표준화된 구조 없음",
    "references": [
      {
        "title": "Ktor Server Plugins",
        "url": "https://ktor.io/docs/server-plugins.html"
      }
    ]
  },
  {
    "id": "KTOR-005",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 라우팅(Routing)을 설정하는 방법에 대해 설명해 주세요.",
    "answer": "Ktor에서 라우팅은 routing DSL을 사용하여 설정합니다.\n\nHTTP 메서드 함수:\nget(), post(), put(), delete(), patch(), head(), options()\n\n라우팅 특징:\n계층적 구조: route()로 경로 중첩 가능\nDSL 기반: Kotlin DSL로 가독성 높은 코드\n플러그인 적용: 특정 라우트에만 플러그인 적용 가능",
    "references": [
      {
        "title": "Ktor Routing",
        "url": "https://ktor.io/docs/server-routing.html"
      }
    ]
  },
  {
    "id": "KTOR-006",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor의 Route DSL 구조와 사용법에 대해 설명해 주세요.",
    "answer": "Route DSL은 Kotlin의 타입 안전 빌더 패턴을 활용한 라우팅 정의 방식입니다.\n\nDSL 구성 요소:\nroute(): 경로 그룹화\nHTTP 동사 함수: get, post, put, delete 등\n경로 패턴: 정적 경로, 파라미터({id}), 와일드카드(`), 테일카드({...}`)\n\nType-Safe Routing (Resources 플러그인):",
    "references": [
      {
        "title": "Ktor Type-safe Routing",
        "url": "https://ktor.io/docs/server-resources.html"
      }
    ]
  },
  {
    "id": "KTOR-007",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor 라우팅에서 Path Parameter와 Query Parameter를 처리하는 방법에 대해 설명해 주세요.",
    "answer": "Path Parameter 처리:\n\nQuery Parameter 처리:\n\nType-Safe 방식 (Resources 플러그인):",
    "references": [
      {
        "title": "Ktor Handling Requests",
        "url": "https://ktor.io/docs/server-requests.html"
      }
    ]
  },
  {
    "id": "KTOR-008",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 요청 본문(Request Body)을 파싱하는 방법은 무엇인가요?",
    "answer": "ContentNegotiation 플러그인 사용 (권장):\n\n수동 파싱:",
    "references": [
      {
        "title": "Ktor Content Negotiation",
        "url": "https://ktor.io/docs/server-serialization.html"
      }
    ]
  },
  {
    "id": "KTOR-009",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor의 ApplicationCall이란 무엇이고, 어떤 역할을 하나요?",
    "answer": "ApplicationCall은 HTTP 요청/응답 사이클을 나타내는 핵심 객체입니다.\n\n주요 구성 요소:\n\nApplicationCall의 역할:\n요청 정보 접근: HTTP 메서드, 헤더, 경로, 파라미터\n요청 본문 수신: receive(), receiveText(), receiveMultipart()\n응답 전송: respond(), respondText(), respondFile()\n속성 저장: call.attributes로 요청 간 데이터 공유\n인증 정보: call.principal<T>()로 인증된 사용자 접근",
    "references": [
      {
        "title": "ApplicationCall API",
        "url": "https://api.ktor.io/ktor-server/ktor-server-core/io.ktor.server.application/-application-call/index.html"
      }
    ]
  },
  {
    "id": "KTOR-010",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor의 플러그인(Plugin) 시스템에 대해 설명해 주세요.",
    "answer": "플러그인은 Ktor 애플리케이션에 기능을 추가하는 모듈식 구성 요소입니다.\n\n플러그인 설치:\n\n주요 내장 플러그인:\n플러그인   기능\n\nContentNegotiation   JSON/XML 직렬화\nAuthentication   인증 처리\nSessions   세션 관리\nStatusPages   예외/상태 처리\nCORS   교차 출처 요청 허용\nCallLogging   요청 로깅\n\n플러그인 동작 원리:\n요청/응답 파이프라인에 인터셉터 등록\n설정 블록에서 동작 커스터마이징\n라우트별 또는 전역으로 적용 가능",
    "references": [
      {
        "title": "Ktor Server Plugins",
        "url": "https://ktor.io/docs/server-plugins.html"
      }
    ]
  },
  {
    "id": "KTOR-011",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor의 ContentNegotiation 플러그인의 역할과 사용 방법에 대해 설명해 주세요.",
    "answer": "ContentNegotiation은 요청/응답의 콘텐츠 타입을 자동으로 처리하는 플러그인입니다.\n\n주요 역할:\nContent-Type 협상: Accept 헤더 기반으로 응답 형식 결정\n직렬화: 객체를 JSON/XML 등으로 변환\n역직렬화: 요청 본문을 객체로 변환\n\n지원 형식:\njson() - kotlinx.serialization\njackson() - Jackson\ngson() - Gson\nxml() - XML\n\n의존성:",
    "references": [
      {
        "title": "Ktor Content Negotiation",
        "url": "https://ktor.io/docs/server-serialization.html"
      }
    ]
  },
  {
    "id": "KTOR-012",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 JSON 직렬화/역직렬화를 설정하는 방법은 무엇인가요? (kotlinx.serialization, Jackson, Gson)",
    "answer": "kotlinx.serialization (권장):\n\nJackson:\n\nGson:\n\n선택 기준:\nkotlinx.serialization: 멀티플랫폼, 컴파일 타임 안전성\nJackson: 풍부한 기능, Java 생태계 호환\nGson: 간단한 사용, 가벼움",
    "references": [
      {
        "title": "Ktor Serialization",
        "url": "https://ktor.io/docs/server-serialization.html"
      }
    ]
  },
  {
    "id": "KTOR-013",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor의 StatusPages 플러그인을 사용한 예외 처리 방법에 대해 설명해 주세요.",
    "answer": "StatusPages는 예외와 HTTP 상태 코드를 일관되게 처리하는 플러그인입니다.\n\n사용 예시:",
    "references": [
      {
        "title": "Ktor Status Pages",
        "url": "https://ktor.io/docs/server-status-pages.html"
      }
    ]
  },
  {
    "id": "KTOR-014",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor의 CORS 플러그인 설정 방법과 주요 옵션에 대해 설명해 주세요.",
    "answer": "CORS는 Cross-Origin Resource Sharing을 활성화하는 플러그인입니다.\n\n주요 옵션:\n옵션   설명\n\nanyHost()   모든 도메인 허용\nallowHost()   특정 도메인 허용\nallowMethod()   HTTP 메서드 허용\nallowHeader()   요청 헤더 허용\nexposeHeader()   응답 헤더 노출\nallowCredentials   쿠키/인증 허용\n\n보안 주의사항:\nanyHost() 사용 금지 (프로덕션): 개발 환경에서만 사용, 프로덕션에서는 명시적 도메인 지정\nallowCredentials와 anyHost() 조합 불가: 브라우저가 거부함\nPreflight 캐싱: maxAgeInSeconds를 적절히 설정하여 OPTIONS 요청 최소화",
    "references": [
      {
        "title": "Ktor CORS",
        "url": "https://ktor.io/docs/cors.html"
      }
    ]
  },
  {
    "id": "KTOR-015",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 커스텀 플러그인을 만드는 방법에 대해 설명해 주세요.",
    "answer": "Ktor 2.0+에서는 createApplicationPlugin 함수로 커스텀 플러그인을 생성합니다.\n\n기본 플러그인:\n\n설정 가능한 플러그인:\n\n사용 가능한 핸들러:\nonCall: 요청 수신 시\nonCallReceive: 요청 본문 수신 시\nonCallRespond: 응답 전송 시",
    "references": [
      {
        "title": "Ktor Custom Plugins",
        "url": "https://ktor.io/docs/server-custom-plugins.html"
      }
    ]
  },
  {
    "id": "KTOR-016",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 Authentication 플러그인을 사용한 인증 구현 방법에 대해 설명해 주세요.",
    "answer": "Authentication 플러그인은 다양한 인증 방식을 제공합니다.\n\n지원 인증 방식:\nbasic: HTTP Basic Authentication\ndigest: HTTP Digest Authentication\nform: 폼 기반 인증\nbearer: Bearer 토큰 (JWT/OAuth)\nsession: 세션 기반 인증\noauth: OAuth 2.0",
    "references": [
      {
        "title": "Ktor Authentication",
        "url": "https://ktor.io/docs/server-auth.html"
      }
    ]
  },
  {
    "id": "KTOR-017",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 JWT(JSON Web Token) 인증을 구현하는 방법에 대해 설명해 주세요.",
    "answer": "JWT (JSON Web Token) 인증 구현 방법입니다.\n\n보안 주의사항:\n시크릿 관리: JWT secret은 환경 변수로 관리하고, 충분히 긴 랜덤 문자열 사용 (최소 256비트)\n알고리즘 선택: 프로덕션에서는 RS256 (비대칭 키) 권장\n만료 시간: 액세스 토큰은 짧게 (15분~1시간), 리프레시 토큰으로 갱신\n클레임 검증: audience, issuer 반드시 검증",
    "references": [
      {
        "title": "Ktor JWT",
        "url": "https://ktor.io/docs/server-jwt.html"
      }
    ]
  },
  {
    "id": "KTOR-018",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 Session 기반 인증을 구현하는 방법은 무엇인가요?",
    "answer": "Sessions 플러그인으로 세션 기반 인증을 구현합니다.",
    "references": [
      {
        "title": "Ktor Session Authentication",
        "url": "https://ktor.io/docs/session-auth.html"
      }
    ]
  },
  {
    "id": "KTOR-019",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 OAuth 2.0 인증을 구현하는 방법에 대해 설명해 주세요.",
    "answer": "OAuth 2.0 인증 구현 방법입니다.",
    "references": [
      {
        "title": "Ktor OAuth",
        "url": "https://ktor.io/docs/server-oauth.html"
      }
    ]
  },
  {
    "id": "KTOR-020",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 HTTPS/SSL을 설정하는 방법은 무엇인가요?",
    "answer": "HTTPS/SSL 설정 방법:\napplication.conf 사용:\nembeddedServer 코드에서 설정:\nHTTPS 리다이렉트:\n\n인증서 생성 (keytool - 개발용):\n\n프로덕션 권장사항:\n리버스 프록시 사용: Nginx, Traefik 등에서 SSL 종료 후 Ktor는 HTTP로 처리\nLet's Encrypt: 무료 인증서 자동 갱신\n직접 SSL 처리 시: Netty 엔진 권장 (CIO보다 SSL 성능 우수)",
    "references": [
      {
        "title": "Ktor SSL",
        "url": "https://ktor.io/docs/server-ssl.html"
      }
    ]
  },
  {
    "id": "KTOR-021",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor Client란 무엇이고, 어떤 상황에서 사용하나요?",
    "answer": "Ktor Client는 Kotlin으로 작성된 멀티플랫폼 비동기 HTTP 클라이언트입니다.\n\n사용 상황:\n외부 API 호출 (REST, GraphQL)\n마이크로서비스 간 통신\n웹 스크래핑\n파일 다운로드/업로드\nWebSocket 클라이언트\n\n멀티플랫폼 지원:\nJVM, Android, iOS, JavaScript, Native",
    "references": [
      {
        "title": "Ktor Client",
        "url": "https://ktor.io/docs/client-create-and-configure.html"
      }
    ]
  },
  {
    "id": "KTOR-022",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor Client에서 HTTP 요청을 보내는 방법에 대해 설명해 주세요.",
    "answer": "다양한 HTTP 요청 방법:",
    "references": [
      {
        "title": "Ktor Client Requests",
        "url": "https://ktor.io/docs/client-requests.html"
      }
    ]
  },
  {
    "id": "KTOR-023",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor Client의 Engine 개념과 종류(CIO, OkHttp, Apache 등)에 대해 설명해 주세요.",
    "answer": "Engine은 실제 HTTP 통신을 처리하는 플랫폼별 구현체입니다.\n\n주요 엔진:\n\n엔진   플랫폼   특징\n\nCIO   JVM, Native   순수 Kotlin/Coroutine 기반, 경량, HTTP/1.1만 지원\nOkHttp   JVM, Android   Android 권장, HTTP/2, 연결 풀링, 인터셉터\nApache   JVM   풍부한 설정, 프록시 지원, 기업용\nJava   JVM 11+   java.net.http 사용, HTTP/2 지원\nJetty   JVM   HTTP/2 지원, WebSocket\nDarwin   iOS, macOS   Apple 네이티브 URLSession 기반\nWinHttp   Windows Native   Windows 네이티브 API\nCurl   Linux Native   libcurl 사용, 폭넓은 프로토콜 지원\nJs   JavaScript   브라우저 fetch API 또는 Node.js\n\n엔진 선택 가이드:\nJVM 서버: CIO (경량) 또는 OkHttp (기능 풍부)\nAndroid: OkHttp (최적화됨)\niOS: Darwin (네이티브 성능)\nHTTP/2 필요 시: OkHttp, Java, Jetty (CIO는 미지원)",
    "references": [
      {
        "title": "Ktor Client Engines",
        "url": "https://ktor.io/docs/client-engines.html"
      }
    ]
  },
  {
    "id": "KTOR-024",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor Client에서 요청/응답 인터셉터를 설정하는 방법은 무엇인가요?",
    "answer": "인터셉터 설정 방법:\nHttpSend 플러그인 사용:\n커스텀 플러그인:\n기본 헤더 설정:",
    "references": [
      {
        "title": "Ktor HttpSend",
        "url": "https://ktor.io/docs/client-http-send.html"
      }
    ]
  },
  {
    "id": "KTOR-025",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor 애플리케이션을 테스트하는 방법에 대해 설명해 주세요.",
    "answer": "Ktor는 ktor-server-test-host 모듈로 테스트 기능을 제공합니다.\n\n테스트 특징:\n실제 서버 없이 인메모리 테스트\n빠른 실행 속도\nHTTP 클라이언트로 요청/응답 검증",
    "references": [
      {
        "title": "Ktor Testing",
        "url": "https://ktor.io/docs/server-testing.html"
      }
    ]
  },
  {
    "id": "KTOR-026",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor의 testApplication을 사용한 통합 테스트 작성 방법은 무엇인가요?",
    "answer": "testApplication은 Ktor 2.0+에서 제공하는 통합 테스트 DSL입니다.",
    "references": [
      {
        "title": "Ktor Testing",
        "url": "https://ktor.io/docs/server-testing.html"
      }
    ]
  },
  {
    "id": "KTOR-027",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 Mock을 활용한 단위 테스트 작성 방법에 대해 설명해 주세요.",
    "answer": "클라이언트 MockEngine 사용:\n\n서비스 계층 Mock (Mockk 사용):\n\n의존성:",
    "references": [
      {
        "title": "Ktor Client Testing",
        "url": "https://ktor.io/docs/client-testing.html"
      }
    ]
  },
  {
    "id": "KTOR-028",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor 애플리케이션을 배포하는 방법에 대해 설명해 주세요. (Fat JAR, Docker 등)",
    "answer": "Fat JAR 배포:\nDocker 배포:\nDocker Compose:",
    "references": [
      {
        "title": "Ktor Deployment",
        "url": "https://ktor.io/docs/server-deployment.html"
      },
      {
        "title": "Ktor Docker",
        "url": "https://ktor.io/docs/docker.html"
      }
    ]
  },
  {
    "id": "KTOR-029",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 환경 설정(application.conf, application.yaml)을 관리하는 방법은 무엇인가요?",
    "answer": "HOCON 형식 (application.conf):\n\nYAML 형식 (application.yaml):\n\n코드에서 설정 읽기:\n\n커맨드라인 오버라이드:",
    "references": [
      {
        "title": "Ktor Configuration",
        "url": "https://ktor.io/docs/server-configuration-file.html"
      }
    ]
  },
  {
    "id": "KTOR-030",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor 애플리케이션의 로깅을 설정하는 방법에 대해 설명해 주세요.",
    "answer": "CallLogging 플러그인:\n\nlogback.xml 설정:\n\n코드에서 로깅:",
    "references": [
      {
        "title": "Ktor Call Logging",
        "url": "https://ktor.io/docs/call-logging.html"
      }
    ]
  },
  {
    "id": "KTOR-031",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 Metrics와 모니터링을 설정하는 방법은 무엇인가요?",
    "answer": "MicrometerMetrics 플러그인:\n\n제공되는 메트릭:\nktor.http.server.requests: 요청 타이머\nktor.http.server.requests.active: 활성 요청 수\nJVM 메모리, GC, CPU 메트릭\n\nDropwizardMetrics (대안):",
    "references": [
      {
        "title": "Ktor Micrometer Metrics",
        "url": "https://ktor.io/docs/server-metrics-micrometer.html"
      }
    ]
  },
  {
    "id": "KTOR-032",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 WebSocket을 구현하는 방법에 대해 설명해 주세요.",
    "answer": "WebSocket 서버 구현:\n\n브로드캐스트 채팅 예시:\n\nWebSocket vs SSE 선택 기준:\n항목   WebSocket   SSE\n\n방향   양방향   서버 → 클라이언트\n프로토콜   ws:// / wss://   HTTP\n재연결   직접 구현   브라우저 자동\n바이너리   지원   텍스트만\n사용 사례   채팅, 게임   알림, 피드",
    "references": [
      {
        "title": "Ktor WebSockets",
        "url": "https://ktor.io/docs/server-websockets.html"
      }
    ]
  },
  {
    "id": "KTOR-033",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 Server-Sent Events(SSE)를 구현하는 방법은 무엇인가요?",
    "answer": "SSE 서버 구현:\n\n> 참고: SSE 플러그인은 Ktor 3.0+에서 공식 지원됩니다. Ktor 2.x에서는 수동으로 구현해야 합니다.\n\n클라이언트 (JavaScript):\n\nSSE vs WebSocket:\nSSE: 서버 -> 클라이언트 단방향, HTTP 기반\nWebSocket: 양방향, 별도 프로토콜",
    "references": [
      {
        "title": "Ktor SSE",
        "url": "https://ktor.io/docs/server-server-sent-events.html"
      }
    ]
  },
  {
    "id": "KTOR-034",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 파일 업로드/다운로드를 처리하는 방법에 대해 설명해 주세요.",
    "answer": "파일 업로드:\n\n파일 다운로드:",
    "references": [
      {
        "title": "Ktor Requests",
        "url": "https://ktor.io/docs/server-requests.html"
      }
    ]
  },
  {
    "id": "KTOR-035",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor에서 Dependency Injection을 구현하는 방법에 대해 설명해 주세요. (Koin, Kodein 등)",
    "answer": "Koin 사용:\nKodein 사용:\n\n> 참고: Ktor는 공식 내장 DI를 제공하지 않습니다. Koin, Kodein 등 외부 라이브러리를 사용하거나 수동 DI를 구현해야 합니다.\n수동 DI (권장 - 간단한 경우):",
    "references": [
      {
        "title": "Ktor Dependency Injection",
        "url": "https://ktor.io/docs/server-dependency-injection.html"
      },
      {
        "title": "Koin for Ktor",
        "url": "https://start.ktor.io/p/koin"
      }
    ]
  },
  {
    "id": "KTOR-036",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor와 Spring Boot를 비교했을 때 각각의 장단점은 무엇인가요?",
    "answer": "항목   Ktor   Spring Boot\n\n언어   Kotlin 네이티브   Java/Kotlin\n아키텍처   경량, 모듈식   풀스택, 컨벤션 기반\n비동기   Coroutine 기본   WebFlux 별도\n시작 시간   매우 빠름   상대적으로 느림\n메모리   낮음   높음\n학습 곡선   낮음   높음\n생태계   성장 중   매우 풍부\nDI   외부 라이브러리   내장 IoC\n문서/커뮤니티   적음   풍부함\n\nKtor 장점:\nKotlin DSL로 간결한 코드\n빠른 시작 시간 (수십 ms vs Spring의 수 초)과 낮은 메모리\n필요한 기능만 선택적 추가 (작은 배포 크기)\nCoroutine 자연스러운 통합 (suspend 함수가 기본)\n서버리스/컨테이너 환경에서 빠른 콜드 스타트\n\nSpring Boot 장점:\n풍부한 생태계와 서드파티 (Spring Data, Security, Cloud 등)\n엔터프라이즈 검증된 안정성과 레퍼런스\n방대한 문서, 커뮤니티, Stack Overflow 답변\n다양한 통합 기능 내장 (AOP, 트랜잭션 관리 등)\n채용 시장에서 높은 수요\n\nKtor 단점:\n작은 생태계: ORM은 Exposed 정도, 트랜잭션 관리 직접 구현\n기업 채용 시장에서 낮은 수요\n복잡한 기능(분산 트랜잭션, 고급 보안)은 직접 구현 필요\n레거시 Java 라이브러리 통합 시 추가 작업\n\nSpring Boot 단점:\n무거운 초기 설정과 긴 시작 시간\n복잡한 학습 곡선 (의존성 주입, AOP 등 이해 필요)\n마법 같은 자동 설정으로 디버깅 어려움\n메모리 오버헤드가 큼 (최소 256MB+ 권장)\n\n실제 사용 사례:\nKtor: JetBrains 내부 서비스, Kotlin 기반 스타트업, BFF 서버\nSpring: 금융권, 대기업 백엔드, 레거시 시스템 연동",
    "references": [
      {
        "title": "Ktor 공식 홈페이지",
        "url": "https://ktor.io/"
      }
    ]
  },
  {
    "id": "KTOR-037",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor를 선택해야 하는 상황과 그렇지 않은 상황에 대해 설명해 주세요.",
    "answer": "Ktor를 선택해야 하는 상황:\n마이크로서비스: 경량 프레임워크로 빠른 시작(~50ms)과 낮은 메모리(~50MB)\nKotlin 전용 프로젝트: Kotlin DSL, Coroutine, 멀티플랫폼 이점 최대화\n비동기 I/O 중심: 외부 API 호출, 데이터베이스 비동기 처리\n빠른 프로토타이핑: 최소한의 보일러플레이트로 빠른 개발\n서버리스/컨테이너: 작은 배포 크기(~10MB JAR), 빠른 콜드 스타트\n멀티플랫폼 HTTP 클라이언트: iOS, JS, Native에서도 동일한 Ktor Client 사용\n\nKtor를 피해야 하는 상황:\n엔터프라이즈 레거시 통합: LDAP, SAML, 기존 Java EE 시스템 연동 시 Spring이 유리\n대규모 팀 (10명+): Spring의 컨벤션과 표준화된 구조가 협업에 유리\n복잡한 데이터 레이어: JPA/Hibernate, 분산 트랜잭션 필요 시\n고급 보안 요구: OAuth2 Resource Server, 메서드 레벨 보안 등 Spring Security 수준\nJava 개발자 위주 팀: Kotlin + Coroutine 학습 비용 고려\n검증된 솔루션 필요: 규제 산업(금융, 의료)에서 레퍼런스 중요\n\n권장 사용 사례:\nREST/GraphQL API 서버\n실시간 통신 (WebSocket, SSE)\nBFF (Backend for Frontend)\n내부 마이크로서비스\nCLI 도구의 HTTP 클라이언트\n\n함정 질문 대비:\n> \"Ktor가 Spring보다 항상 빠른가요?\"\n> - 시작 시간과 메모리는 Ktor가 유리하지만, 런타임 성능(처리량, 지연시간)은 워크로드에 따라 다름\n> - Spring WebFlux도 비동기 처리 가능하며, JIT 최적화 후 성능 차이 미미할 수 있음",
    "references": [
      {
        "title": "Ktor FAQ",
        "url": "https://ktor.io/docs/faq.html"
      }
    ]
  },
  {
    "id": "KTOR-038",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor의 성능 특성과 최적화 방법에 대해 설명해 주세요.",
    "answer": "Ktor 성능 특성:\nCoroutine 기반: 스레드 블로킹 없는 비동기 처리\n경량 런타임: 최소한의 오버헤드\nCIO 엔진: 순수 Kotlin으로 구현된 경량 엔진\n\n최적화 방법:\n엔진 선택:\n\n엔진별 특성:\n엔진   장점   단점   권장 상황\n\nNetty   검증된 안정성, HTTP/2, 풍부한 기능   무거움, 외부 의존성   프로덕션, 대규모 트래픽\nCIO   순수 Kotlin, 경량, 빠른 시작   HTTP/2 미지원 (2.x 기준)   마이크로서비스, 서버리스\nJetty   HTTP/2, Servlet 호환   무거움   기존 Jetty 인프라 연동\n\n> 주의: 성능은 워크로드에 따라 다릅니다. I/O 바운드 작업에서는 CIO가, CPU 바운드나 대규모 동시 연결에서는 Netty가 유리할 수 있습니다.\n연결 풀 설정:\n직렬화 최적화:\n응답 압축:\n캐싱:\n데이터베이스 연결 풀:",
    "references": [
      {
        "title": "Ktor Server Engines",
        "url": "https://ktor.io/docs/server-engines.html"
      }
    ]
  },
  {
    "id": "SPRING-001",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "IoC와 DI에 대해 설명해 주세요.",
    "answer": "IoC (Inversion of Control, 제어의 역전)\n객체의 생성과 생명주기 관리를 개발자가 아닌 프레임워크(컨테이너)가 담당하는 것\n기존에는 개발자가 직접 new 키워드로 객체를 생성하고 의존성을 관리했지만, IoC에서는 컨테이너가 이를 대신 수행\n\"Don't call us, we'll call you\" (할리우드 원칙)\n\nDI (Dependency Injection, 의존성 주입)\nIoC를 구현하는 디자인 패턴 중 하나\n객체가 필요로 하는 의존성을 외부에서 주입받는 방식\n주입 방식 3가지:\n생성자 주입 (권장): 불변성 보장, 테스트 용이, 필수 의존성 명확화\nSetter 주입: 선택적/변경 가능한 의존성에 사용\n필드 주입: 간결하지만 테스트 어려움, final 사용 불가\n\n주입 방식별 트레이드오프\n방식   장점   단점\n\n생성자 주입   불변성, 테스트 용이, 순환 참조 조기 발견   의존성 많으면 생성자가 길어짐\nSetter 주입   선택적 의존성 표현, 런타임 변경 가능   불변성 미보장, NPE 가능\n필드 주입   코드 간결   테스트 어려움, final 불가, 의존성 숨김\n\n장점\n결합도 감소, 유연성 증가\n단위 테스트 용이 (Mock 객체 주입 가능)\n코드 재사용성 향상\n\n참고: Spring 공식 문서는 필수 의존성에 생성자 주입을, 선택적 의존성에만 Setter 주입을 권장합니다.",
    "references": []
  },
  {
    "id": "SPRING-002",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "후보 없이 특정 기능을 하는 클래스가 딱 한 개라면, 구체 클래스를 그냥 사용해도 되지 않나요? 그럼에도 불구하고 왜 Spring에선 Bean을 사용할까요?",
    "answer": "구체 클래스 직접 사용의 문제점\n클래스 간 강한 결합(tight coupling) 발생\n테스트 시 Mock 객체로 대체하기 어려움\n향후 요구사항 변경 시 코드 수정 범위가 커짐\n\nSpring Bean을 사용하는 이유\n생명주기 관리: Bean의 생성, 초기화, 소멸을 컨테이너가 관리\n싱글톤 보장: 기본적으로 하나의 인스턴스만 생성하여 메모리 효율성 확보\nAOP 적용 가능: 프록시 기반으로 트랜잭션, 로깅 등 횡단 관심사 적용\n테스트 용이성: 테스트 환경에서 쉽게 다른 구현체로 교체 가능\n확장성: 나중에 구현체가 추가되더라도 설정만 변경하면 됨\n설정 외부화: 환경별로 다른 Bean 설정 적용 가능 (Profile)\n\n결론: 현재는 구현체가 하나여도, 미래의 확장성과 테스트 용이성, AOP 적용을 위해 Bean으로 관리하는 것이 좋습니다.",
    "references": []
  },
  {
    "id": "SPRING-003",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Bean의 생성 주기(라이프사이클)에 대해 설명해 주세요.",
    "answer": "Spring Bean 생명주기 단계\n스프링 컨테이너 생성\nBean 인스턴스화: 생성자 호출하여 객체 생성\n의존성 주입 (DI): @Autowired 등으로 의존성 주입\n초기화 콜백:\n@PostConstruct 메서드 실행\nInitializingBean.afterPropertiesSet() 실행\n@Bean(initMethod=\"...\") 지정 메서드 실행\nBean 사용: 애플리케이션에서 Bean 사용\n소멸 콜백 (컨테이너 종료 시):\n@PreDestroy 메서드 실행\nDisposableBean.destroy() 실행\n@Bean(destroyMethod=\"...\") 지정 메서드 실행\n\n콜백 우선순위\n@PostConstruct > InitializingBean > initMethod\n@PreDestroy > DisposableBean > destroyMethod\n\n권장 방식: @PostConstruct와 @PreDestroy 사용 (간결하고 스프링 독립적)",
    "references": []
  },
  {
    "id": "SPRING-004",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring의 프로토타입 빈(Prototype Bean)은 무엇이며, 싱글톤 빈과 어떻게 다른가요?",
    "answer": "프로토타입 빈 (Prototype Bean)\n요청할 때마다 새로운 인스턴스를 생성하는 스코프\n@Scope(\"prototype\") 또는 @Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)로 설정\n\n싱글톤 vs 프로토타입 트레이드오프\n구분   싱글톤   프로토타입\n\n인스턴스 수   1개   요청마다 새로 생성\n생명주기 관리   컨테이너가 전체 관리   생성과 DI까지만 관리\n@PreDestroy   호출됨   호출 안됨 (직접 관리 필요)\n메모리   효율적   매번 새 객체 생성\n스레드 안전성   상태 저장 시 문제   인스턴스별 독립 상태\n\n사용 사례\n싱글톤: 상태 없는(stateless) 서비스, 레포지토리\n프로토타입: 상태를 가지는(stateful) 객체, 매번 새로운 인스턴스가 필요한 경우\n\n주의사항 (함정 질문)\n싱글톤 Bean에서 프로토타입 Bean을 주입받으면, 프로토타입도 한 번만 주입되어 싱글톤처럼 동작함\n→ 해결: ObjectProvider, Provider<T>, 또는 @Lookup 사용",
    "references": []
  },
  {
    "id": "SPRING-005",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "AOP에 대해 설명해 주세요.",
    "answer": "AOP (Aspect Oriented Programming, 관점 지향 프로그래밍)\n횡단 관심사(Cross-Cutting Concerns)를 모듈화하는 프로그래밍 패러다임\n핵심 비즈니스 로직과 부가 기능(로깅, 트랜잭션, 보안 등)을 분리\n\n핵심 용어\n용어   설명\n\nAspect   횡단 관심사를 모듈화한 것 (예: 로깅 Aspect)\nJoin Point   Advice가 적용될 수 있는 지점 (메서드 실행 시점)\nPointcut   Join Point를 선별하는 표현식\nAdvice   실제 수행할 부가 기능 로직\nTarget   Advice가 적용되는 대상 객체\nWeaving   Aspect를 Target에 적용하는 과정\n\nAdvice 종류\n@Before: 메서드 실행 전\n@After: 메서드 실행 후 (성공/실패 무관)\n@AfterReturning: 메서드 정상 종료 후\n@AfterThrowing: 예외 발생 시\n@Around: 메서드 실행 전후 (가장 강력)\n\n적용 사례: 트랜잭션 관리, 로깅, 성능 측정, 보안 검사, 캐싱",
    "references": []
  },
  {
    "id": "SPRING-006",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring AOP에서 @Aspect는 어떻게 동작하나요?",
    "answer": "@Aspect 동작 원리: 프록시 기반 AOP\nBean 등록 시점에 스프링이 @Aspect 클래스를 스캔\nPointcut에 해당하는 Target Bean을 프록시 객체로 감싸서 컨테이너에 등록\n클라이언트가 Target 메서드 호출 시 프록시가 먼저 호출됨\n프록시가 Advice 로직을 실행하고, 필요시 실제 Target 메서드 호출\n\n프록시 생성 방식\nJDK 동적 프록시: 인터페이스 기반 (인터페이스가 있을 때)\nCGLIB 프록시: 클래스 기반, 상속을 이용 (인터페이스가 없을 때)\nSpring Boot 2.0+에서는 spring.aop.proxy-target-class=true가 기본값으로, CGLIB를 기본 사용\n\nJDK 프록시 vs CGLIB 트레이드오프\n구분   JDK 동적 프록시   CGLIB\n\n요구 조건   인터페이스 필수   클래스 상속 (final 클래스 불가)\n성능   리플렉션 기반, 약간 느림   바이트코드 생성, 더 빠름\n유연성   인터페이스 기반 설계 강제   구체 클래스도 프록시 가능\n\n동작 흐름 예시 (@Around)\n\n주의사항 (함정 질문)\nSelf-invocation 문제: 같은 클래스 내에서 this.method() 호출 시 프록시를 거치지 않아 AOP 미적용\n해결 방법:\n자기 자신을 주입받아 호출 (@Autowired private MyService self;)\nAopContext.currentProxy() 사용 (@EnableAspectJAutoProxy(exposeProxy=true) 필요)\n별도 클래스로 분리 (가장 권장되는 방법)",
    "references": []
  },
  {
    "id": "SPRING-007",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring 에서 Interceptor와 Servlet Filter에 대해 설명해 주세요.",
    "answer": "실행 순서\n\nServlet Filter\n서블릿 스펙에 정의된 기술 (스프링 독립적)\nDispatcherServlet 이전에 실행\n모든 요청에 대해 동작 (정적 리소스 포함)\njavax.servlet.Filter 인터페이스 구현\n\nSpring Interceptor\n스프링 MVC가 제공하는 기술\nDispatcherServlet과 Controller 사이에서 실행\n스프링 컨텍스트에 접근 가능 (Bean 사용 가능)\nHandlerInterceptor 인터페이스 구현\n\n구분   Filter   Interceptor\n\n관리 주체   서블릿 컨테이너   스프링 컨테이너\nRequest/Response 조작   가능   불가능\n스프링 Bean 접근   제한적   자유로움\n예외 처리   서블릿 예외 처리   @ControllerAdvice 사용 가능\n\nInterceptor 메서드\npreHandle(): 컨트롤러 실행 전 (false 반환 시 요청 중단)\npostHandle(): 컨트롤러 실행 후, 뷰 렌더링 전 (예외 발생 시 호출 안 됨)\nafterCompletion(): 뷰 렌더링 후, 완료 시점 (예외 발생해도 항상 호출)\n\nFilter vs Interceptor 선택 기준\nSpring Bean 접근이 많이 필요하면: Interceptor\nRequest/Response 조작이 필요하면: Filter\nSpring MVC 외부에서도 동작해야 하면: Filter",
    "references": []
  },
  {
    "id": "SPRING-008",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring에서 Servlet Filter와 Spring Interceptor 중 Filter를 사용해야 하는 상황은 언제인가요?",
    "answer": "Filter를 사용해야 하는 경우\nRequest/Response 자체를 조작해야 할 때\n요청 본문(body)을 읽거나 수정\n응답 본문을 압축하거나 변환\nServletRequest를 래핑하여 커스텀 기능 추가\n모든 요청에 공통 처리가 필요할 때\n인코딩 설정 (CharacterEncodingFilter)\nCORS 처리\n정적 리소스 요청 포함 처리\n스프링과 무관한 처리\n스프링 컨텍스트 로딩 전에 처리해야 하는 작업\n서블릿 스펙 기반의 표준화된 처리\n보안 관련 최전방 처리\nXSS, CSRF 방어\nSpring Security의 필터 체인\n\n실무 예시\nFilter 사용   Interceptor 사용\n\n인코딩 처리   로그인 체크\nCORS 설정   권한 검사\n요청 로깅 (body 포함)   API 호출 로깅\n보안 필터링   공통 데이터 세팅\n\n결론: 둘 다 적절한 용도가 있으며, Spring Security처럼 Filter 체인이 필수인 경우도 있습니다.",
    "references": []
  },
  {
    "id": "SPRING-009",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "DispatcherServlet 의 역할에 대해 설명해 주세요.",
    "answer": "DispatcherServlet이란?\nSpring MVC의 프론트 컨트롤러(Front Controller)\n모든 HTTP 요청을 받아 적절한 컨트롤러에 분배하는 중앙 서블릿\nHttpServlet을 상속받은 서블릿\n\n요청 처리 흐름\n요청 수신: 클라이언트 요청을 받음\n핸들러 조회: HandlerMapping을 통해 요청을 처리할 핸들러(컨트롤러) 검색\n핸들러 어댑터 조회: HandlerAdapter를 통해 핸들러 실행 방법 결정\n핸들러 실행: 어댑터가 실제 컨트롤러 메서드 호출\nModelAndView 반환: 컨트롤러가 처리 결과 반환\n뷰 리졸버 호출: ViewResolver가 뷰 이름을 실제 View로 변환\n뷰 렌더링: View가 Model 데이터로 응답 생성\n응답 반환: 클라이언트에게 응답\n\n주요 구성 요소\nHandlerMapping: URL과 핸들러 매핑\nHandlerAdapter: 다양한 핸들러 실행 방식 지원\nViewResolver: 뷰 이름 → 실제 View 객체 변환\nHandlerExceptionResolver: 예외 처리",
    "references": []
  },
  {
    "id": "SPRING-010",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "DispatcherServlet은 한 번에 여러 요청을 동시에 처리할 수 있나요?",
    "answer": "네, 가능합니다.\n\n멀티스레드 처리 구조\nDispatcherServlet은 싱글톤으로 하나만 존재\n하지만 서블릿 컨테이너(Tomcat)가 스레드 풀을 관리\n각 요청마다 별도의 스레드가 할당되어 동시에 여러 요청 처리 가능\n\n동작 방식\n\nThread-Safe 이유\nDispatcherServlet 자체는 상태를 가지지 않음 (stateless)\n요청별 데이터는 각 스레드의 지역 변수나 ThreadLocal에 저장\n스프링의 싱글톤 Bean들도 상태를 가지지 않도록 설계해야 함\n\nTomcat 스레드 풀 설정\n\n주의: Controller나 Service에서 인스턴스 변수에 상태를 저장하면 동시성 문제 발생",
    "references": []
  },
  {
    "id": "SPRING-011",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "DispatcherServlet은 @Controller를 어떻게 구분하고 찾아내나요?",
    "answer": "HandlerMapping을 통한 구분\n\nDispatcherServlet은 직접 @Controller를 찾지 않고 HandlerMapping에게 위임합니다.\n\n동작 과정\n스프링 컨텍스트 로딩 시 @Controller, @RequestMapping 붙은 클래스 스캔\nRequestMappingHandlerMapping이 URL 패턴과 핸들러 메서드를 매핑 정보로 저장\n요청 시 DispatcherServlet이 HandlerMapping에게 해당 URL의 핸들러 조회\n매핑된 컨트롤러 메서드 정보 반환\n\n주요 HandlerMapping 구현체\n구현체   설명\n\nRequestMappingHandlerMapping   @RequestMapping 기반 (가장 많이 사용)\nBeanNameUrlHandlerMapping   Bean 이름이 URL인 경우\nSimpleUrlHandlerMapping   직접 URL-핸들러 매핑 설정\n\n@Controller vs @RestController\n@Controller: View 이름 반환 → ViewResolver가 처리\n@RestController: @Controller + @ResponseBody, 객체를 JSON으로 직접 반환\n\n내부 저장 구조",
    "references": []
  },
  {
    "id": "SPRING-012",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "JPA와 같은 ORM을 사용하는 이유가 무엇인가요?",
    "answer": "ORM (Object-Relational Mapping)이란?\n객체와 관계형 데이터베이스 테이블을 매핑해주는 기술\nSQL을 직접 작성하지 않고 객체 지향적으로 데이터 조작 가능\n\nORM 사용 이유\n패러다임 불일치 해결\n객체: 상속, 참조, 연관관계\nRDB: 테이블, 외래키, 조인\nORM이 이 차이를 자동으로 해결\n생산성 향상\n반복적인 CRUD SQL 작성 불필요\n객체 중심 개발 가능\n유지보수성\n필드 추가 시 SQL 수정 불필요\n데이터베이스 변경에 유연\nDB 독립성\nDialect 설정으로 DB 벤더 변경 용이\nMySQL → PostgreSQL 마이그레이션 쉬움\n성능 최적화 기능\n1차 캐시, 쓰기 지연\n변경 감지(Dirty Checking)\n지연 로딩(Lazy Loading)\n\n단점\n학습 곡선이 있음\n복잡한 쿼리는 직접 작성 필요 (JPQL, QueryDSL, Native Query)\nN+1 문제 등 성능 이슈 주의 필요",
    "references": []
  },
  {
    "id": "SPRING-013",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "JPA의 영속성 컨텍스트는 어떤 기능을 하나요? 실제로 성능 향상에 큰 도움이 되나요?",
    "answer": "영속성 컨텍스트 (Persistence Context)\n엔티티를 영구 저장하는 환경, 1차 캐시 역할\nEntityManager를 통해 접근\n\n주요 기능과 성능 이점\n1차 캐시\n같은 트랜잭션 내에서 동일 엔티티 조회 시 DB 접근 없이 캐시에서 반환\n동일성(identity) 보장: em.find(Member.class, 1L) == em.find(Member.class, 1L)\n⚠️ 트랜잭션 범위 한정이라 효과는 제한적 (2차 캐시와 구분 필요)\n쓰기 지연 (Write-behind)\nINSERT/UPDATE를 즉시 실행하지 않고 모았다가 커밋 시점에 일괄 실행\n배치 처리로 DB 왕복 횟수 감소\n변경 감지 (Dirty Checking)\n엔티티 변경 시 자동으로 UPDATE SQL 생성\n별도 update() 메서드 호출 불필요\n지연 로딩 (Lazy Loading)\n연관 엔티티를 실제 사용할 때까지 로딩 지연\n불필요한 조인 방지\n\n성능 향상에 대한 현실적 평가\n1차 캐시: 같은 트랜잭션 내에서만 유효 → 효과 제한적\n쓰기 지연: 대량 INSERT 시 확실한 성능 향상\n전체적으로 개발 편의성 측면에서 더 큰 가치",
    "references": []
  },
  {
    "id": "SPRING-014",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "JPA의 N + 1 문제에 대해 설명해 주세요.",
    "answer": "N+1 문제란?\n연관 관계가 있는 엔티티 조회 시, 1번의 쿼리로 N개의 데이터를 가져온 후\n각 데이터의 연관 엔티티를 조회하기 위해 추가로 N번의 쿼리가 실행되는 문제\n\n예시\n\n발생 원인\n지연 로딩(LAZY) 시: 연관 엔티티 접근 시점에 쿼리 발생\n즉시 로딩(EAGER) 시: 각 엔티티마다 별도 쿼리 발생\n\n해결 방법\nFetch Join (JPQL) - 가장 직접적인 해결책\n⚠️ 페이징과 함께 사용 시 주의 (컬렉션 Fetch Join + 페이징 = 메모리 로딩)\n@EntityGraph\nBatch Size 설정\nIN 절로 한 번에 여러 개 조회\n@BatchSize 어노테이션\n엔티티나 컬렉션에 개별 적용\n\n권장: 기본은 LAZY + 필요 시 Fetch Join 또는 Batch Size",
    "references": []
  },
  {
    "id": "SPRING-015",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "@Transactional 은 어떤 기능을 하나요?",
    "answer": "@Transactional이란?\n선언적 트랜잭션 관리를 위한 어노테이션\n메서드 실행을 하나의 트랜잭션으로 묶어줌\nAOP 기반으로 동작 (프록시 패턴)\n\n동작 원리\n\n주요 속성\n\n속성   설명\n\npropagation   트랜잭션 전파 방식 (REQUIRED, REQUIRESNEW 등)\nisolation   격리 수준 (READCOMMITTED 등)\ntimeout   타임아웃 설정 (초)\nreadOnly   읽기 전용 여부\nrollbackFor   롤백할 예외 지정\nnoRollbackFor   롤백하지 않을 예외 지정\n\n전파 속성 (Propagation)\nREQUIRED (기본): 기존 트랜잭션 있으면 참여, 없으면 새로 시작\nREQUIRES_NEW: 항상 새 트랜잭션 시작\nNESTED: 중첩 트랜잭션 (Savepoint 사용)\nSUPPORTS: 트랜잭션 있으면 참여, 없으면 없이 실행\n\n주의사항\nChecked Exception은 기본적으로 롤백 안 됨 (rollbackFor 필요)\nSelf-invocation: 같은 클래스 내 호출 시 프록시 우회로 트랜잭션 미적용\npublic 메서드에만 적용 가능 (Spring 6+에서는 protected도 가능)\n\n왜 Checked Exception은 롤백되지 않는가?\nSpring의 설계 철학: Checked Exception은 복구 가능한 비즈니스 예외로 간주\nUnchecked Exception(RuntimeException)은 프로그래밍 오류로 간주하여 롤백\n필요시 @Transactional(rollbackFor = Exception.class) 명시",
    "references": []
  },
  {
    "id": "SPRING-016",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring JPA에서 @Transactional(readOnly=true)의 기능과 성능 최적화 효과는 무엇인가요?",
    "answer": "@Transactional(readOnly=true)란?\n해당 트랜잭션이 읽기 전용임을 선언\nJPA와 DB 레벨에서 최적화 힌트로 사용\n\n성능 최적화 효과\n영속성 컨텍스트 최적화 (Hibernate 5.2+)\n변경 감지(Dirty Checking) 비활성화\n스냅샷 저장 안 함 → 메모리 절약\n⚠️ 단, FlushMode.MANUAL 설정 여부는 JPA 구현체와 버전에 따라 다름\nFlush 모드 변경\nHibernate에서 FlushMode가 MANUAL로 설정될 수 있음\n불필요한 flush 연산 방지\nDB 레벨 최적화 (DB 벤더에 따라 다름)\nMySQL: 읽기 전용 트랜잭션으로 처리\nPostgreSQL: 읽기 전용 모드 활성화\nReplication 환경: Slave(읽기 전용 DB)로 라우팅 가능\n\n실질적 도움이 되나요?\n대량 조회: 스냅샷 미저장으로 메모리 절약 효과 있음\nReplication 환경: Master-Slave 분기에 매우 유용\n단순 조회: 효과는 미미하지만, 명시적 의도 표현으로 코드 가독성 향상\n\n권장",
    "references": []
  },
  {
    "id": "SPRING-017",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring JPA에서 조회(읽기) 전용 메서드에도 @Transactional을 붙여야 하는 이유는 무엇인가요?",
    "answer": "@Transactional이 없을 때 발생하는 문제들\nOSIV(Open Session In View) 비활성화 시 LazyLoading 오류\nOSIV가 꺼져있으면 트랜잭션 범위 = 영속성 컨텍스트 범위\n@Transactional 없으면 지연 로딩 시 LazyInitializationException 발생\n데이터 일관성 문제\n여러 쿼리 수행 중 데이터가 변경될 수 있음\n트랜잭션 격리 수준에 따른 일관된 읽기 보장 안 됨\nDirty Read / Non-Repeatable Read\n트랜잭션 없이 조회하면 커밋되지 않은 데이터 읽을 가능성\n같은 데이터를 두 번 읽었을 때 다른 값이 나올 수 있음\n\nOSIV에 대한 이해\nOSIV = true (기본값): 영속성 컨텍스트가 HTTP 요청 전체 유지, View에서도 지연 로딩 가능\nOSIV = false (권장): 트랜잭션 범위 내에서만 지연 로딩, DB 커넥션 점유 시간 감소\n운영 환경에서는 OSIV 비활성화 권장 (spring.jpa.open-in-view=false)\n\n@Transactional이 필요한 경우\n\n@Transactional 없어도 되는 경우\n단순 단건 조회\nOSIV가 활성화된 환경 (Spring Boot 기본값: true)\n일관성이 크게 중요하지 않은 조회\n\n결론: 읽기에도 @Transactional(readOnly=true)를 붙이는 것을 권장\n명시적 의도 표현\nReplication 라우팅 가능\n영속성 컨텍스트 범위 명확화",
    "references": []
  },
  {
    "id": "SPRING-018",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Java 에서 Annotation 은 어떤 기능을 하나요?",
    "answer": "Annotation이란?\n소스 코드에 메타데이터를 추가하는 방법\n@ 기호로 시작\n그 자체로는 동작하는 코드가 아님 (메타데이터일 뿐)\n\nAnnotation의 용도\n컴파일러 지시\n@Override: 메서드 오버라이딩 검증\n@Deprecated: 사용 중지 권고 경고\n@SuppressWarnings: 경고 억제\n컴파일 타임 코드 생성\nLombok: @Getter, @Setter → 컴파일 시 코드 생성 (APT)\n런타임 처리\nReflection을 통해 어노테이션 정보 읽고 처리\n프레임워크가 활용\n\n메타 어노테이션\n\nRetention 정책\n정책   설명\n\nSOURCE   소스 코드까지만 유지 (컴파일 후 삭제)\nCLASS   클래스 파일까지 유지 (런타임 접근 불가)\nRUNTIME   런타임에도 유지 (Reflection 가능)",
    "references": []
  },
  {
    "id": "SPRING-019",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Annotation 자체는 별 기능이 없는 것 같은데, 어떻게 Spring에서는 Annotation이 그렇게 많은 기능을 하는 걸까요?",
    "answer": "핵심: Annotation 자체는 아무것도 안 함\nAnnotation은 단순한 마커(표시)일 뿐\nSpring 프레임워크가 Reflection으로 읽고 처리하기 때문에 기능이 동작하는 것\n\nSpring의 Annotation 처리 방식\n컴포넌트 스캔 시점\n@ComponentScan이 지정된 패키지 스캔\n클래스에 @Component, @Service 등이 있는지 Reflection으로 확인\n있으면 Bean으로 등록\nBeanPostProcessor\nBean 생성 전후에 Annotation 확인하고 처리\n@Autowired → AutowiredAnnotationBeanPostProcessor가 의존성 주입\n@PostConstruct → CommonAnnotationBeanPostProcessor가 초기화 메서드 호출\nAOP / 프록시 생성\n@Transactional → 프록시로 감싸서 트랜잭션 로직 추가\n@Async → 프록시로 감싸서 비동기 실행\n\n동작 흐름 예시 (@Autowired)\n\n결론: Annotation은 메타데이터, 실제 동작은 Spring의 BeanPostProcessor, AOP 프록시, Reflection 덕분\n\n심화 이해\n@Component는 ClassPathBeanDefinitionScanner가 처리\n@Autowired는 AutowiredAnnotationBeanPostProcessor가 처리\n@Transactional은 TransactionInterceptor가 AOP로 처리",
    "references": []
  },
  {
    "id": "SPRING-020",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Lombok의 @Data를 잘 사용하지 않는 이유는 무엇일까요?",
    "answer": "@Data가 포함하는 것\n\n사용을 지양하는 이유\n@Setter의 무분별한 노출\n모든 필드에 Setter가 생성됨\n객체의 불변성이 깨지고, 어디서든 값 변경 가능\n의도치 않은 상태 변경 발생 위험\n@ToString의 순환 참조 문제\n양방향 연관관계 시 무한 루프 → StackOverflowError\n@EqualsAndHashCode 문제\n모든 필드 포함 → 연관 엔티티 비교 시 문제\nJPA Entity에서 @EqualsAndHashCode(of = \"id\") 권장\n불필요한 생성자\n@RequiredArgsConstructor가 항상 필요한 것은 아님\n\n권장 사용 방식\n\n@Data 사용해도 되는 경우\nDTO (단순 데이터 전달 객체)\n연관관계 없는 단순 클래스\n값 객체(Value Object)로 불변성이 필요 없는 경우\n\nJPA Entity에서 Lombok 사용 시 주의\n@EqualsAndHashCode: 연관 엔티티 제외, ID만 사용 권장\n@ToString: 지연 로딩 필드 제외 (LazyInitializationException 방지)\n@Builder: @NoArgsConstructor(access = PROTECTED)와 함께 사용",
    "references": []
  },
  {
    "id": "SPRING-021",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Tomcat이 정확히 어떤 역할을 하는 도구인가요?",
    "answer": "Tomcat이란?\nApache 재단의 오픈소스 서블릿 컨테이너 (= 웹 컨테이너)\nJava Servlet, JSP 스펙을 구현한 WAS(Web Application Server)\n\n주요 역할\nHTTP 요청/응답 처리\nHTTP 프로토콜을 파싱하여 서블릿에 전달\n서블릿의 응답을 HTTP 형식으로 클라이언트에 전송\n서블릿 생명주기 관리\n서블릿 인스턴스 생성, 초기화, 소멸 관리\ninit() → service() → destroy()\n스레드 풀 관리\n요청마다 스레드를 할당하여 동시 처리\n커넥션 풀, 스레드 풀 관리\n정적 리소스 제공\nHTML, CSS, JS, 이미지 파일 서빙\n\nTomcat 구조\n\nSpring Boot와의 관계\nSpring Boot는 Embedded Tomcat을 내장\n별도 Tomcat 설치 없이 JAR 파일로 실행 가능\n다른 서버로 교체 가능: Jetty, Undertow, Netty\n\nWAS vs Web Server\n구분   Web Server   WAS (Tomcat)\n\n처리 대상   정적 콘텐츠   동적 콘텐츠\n예시   Nginx, Apache HTTP   Tomcat, Jetty\n\nTomcat 버전과 Spring Boot\nSpring Boot   Tomcat   Servlet\n\n2.x   9.x   4.0\n3.x   10.x   6.0 (Jakarta)",
    "references": []
  },
  {
    "id": "SPRING-022",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Netty에 대해 설명해 주세요. Tomcat 대신 Netty를 사용하는 이유는 무엇인가요?",
    "answer": "Netty란?\n비동기 이벤트 기반 네트워크 프레임워크\nNIO(Non-blocking I/O) 기반의 고성능 서버 개발용\n서블릿 스펙에 의존하지 않음\n\nTomcat vs Netty\n\n구분   Tomcat   Netty\n\nI/O 모델   Blocking (1요청 1스레드)   Non-blocking (이벤트 루프)\n스레드 수   요청 수에 비례   적은 스레드로 많은 요청 처리\n메모리   스레드당 스택 메모리 필요   효율적\n프로토콜   HTTP 중심   TCP/UDP/WebSocket 등 다양\n\nNetty 사용 이유\n대규모 동시 접속 처리\n적은 스레드로 수만 개 커넥션 처리 가능\nWebSocket, 채팅 서버, 게임 서버에 적합\n낮은 지연 시간 (Low Latency)\n이벤트 루프 기반으로 컨텍스트 스위칭 최소화\n다양한 프로토콜 지원\nHTTP/2, WebSocket, TCP, UDP 등\n\nSpring에서의 활용\nSpring WebFlux: Netty를 기본 서버로 사용\nSpring Cloud Gateway: Netty 기반 API 게이트웨이\n\n언제 Netty를 선택?\n대규모 동시 접속이 필요한 경우\n리액티브/비동기 프로그래밍 모델 사용 시\nWebSocket 기반 실시간 서비스",
    "references": []
  },
  {
    "id": "SPRING-023",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Framework의 기본 개념과 주요 특징에 대해 설명해주세요.",
    "answer": "Spring Framework란?\nJava 기반 엔터프라이즈 애플리케이션 개발을 위한 경량 프레임워크\nEJB의 복잡성을 해결하고자 Rod Johnson이 2003년에 개발\n\n핵심 철학: POJO 기반 개발\nPlain Old Java Object를 사용한 비침투적 설계\n특정 기술에 종속되지 않는 깔끔한 코드\n\n주요 특징\nIoC/DI (제어의 역전/의존성 주입)\n객체 생성과 의존관계를 컨테이너가 관리\n결합도 감소, 테스트 용이성 향상\nAOP (관점 지향 프로그래밍)\n횡단 관심사 분리 (로깅, 트랜잭션, 보안)\n비즈니스 로직에 집중 가능\n선언적 트랜잭션 관리\n@Transactional로 간편한 트랜잭션 처리\n다양한 기술 통합\nJPA, MyBatis, Redis, Kafka 등과 쉬운 연동\n모듈화\n필요한 모듈만 선택 사용 가능\nCore, MVC, Data, Security 등\n\nSpring의 장점\n낮은 결합도, 높은 응집도\n테스트 용이성\n풍부한 생태계와 커뮤니티",
    "references": []
  },
  {
    "id": "SPRING-024",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Boot와 전통적인 Spring Framework의 차이점은 무엇인가요?",
    "answer": "Spring Boot의 탄생 배경\n기존 Spring의 복잡한 설정(XML, 의존성 관리)을 해결\n\"Convention over Configuration\" 철학\n\n주요 차이점\n\n구분   Spring Framework   Spring Boot\n\n설정 방식   XML/Java Config 직접 작성   자동 설정 (Auto-Configuration)\n의존성   개별 버전 관리   Starter로 통합 관리\n서버   외부 WAS 필요   내장 서버 (Tomcat, Jetty)\n배포   WAR 배포   JAR 실행\n설정 파일   여러 XML 파일   application.yml/properties\n\nSpring Boot 핵심 기능\nAuto-Configuration\n클래스패스 기반 자동 Bean 설정\n@EnableAutoConfiguration\nStarter Dependencies\n관련 의존성 버전 자동 관리\nEmbedded Server\nTomcat, Jetty, Undertow 내장\njava -jar app.jar로 바로 실행\nSpring Boot Actuator\n애플리케이션 모니터링 엔드포인트 제공\nProduction-Ready\nHealth check, Metrics 기본 제공",
    "references": []
  },
  {
    "id": "SPRING-025",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "IoC(Inversion of Control)와 DI(Dependency Injection)의 개념 및 이점에 대해 심화하여 설명해주세요.",
    "answer": "IoC (제어의 역전)\n객체의 생성, 생명주기 관리 권한을 프레임워크에 위임\n개발자가 new로 직접 객체를 생성하지 않음\n\"Don't call us, we'll call you\" 원칙\n\nDI (의존성 주입)\nIoC를 구현하는 구체적인 방법\n객체가 필요한 의존성을 외부에서 주입받음\n\nDI 방식 3가지\n\n생성자 주입이 권장되는 이유\n불변성: final 키워드 사용 가능\n테스트 용이: Mock 객체 쉽게 주입\n순환 참조 조기 발견: 애플리케이션 시작 시점에 실패하여 즉시 인지 가능\n필수 의존성 명확화: 생성 시점에 주입 필수\n\n참고 (Spring Boot 2.6+)\n순환 참조는 기본적으로 금지됨 (애플리케이션 시작 실패)\n허용하려면 spring.main.allow-circular-references=true 설정 필요\n순환 참조 자체를 피하는 설계가 권장됨 (의존 방향 재설계, 이벤트 사용 등)\n\nIoC/DI의 이점\n느슨한 결합 (Loose Coupling)\n테스트 용이성 (Mock 주입)\n코드 재사용성 향상\n유지보수성 향상\n구현체 교체 용이",
    "references": []
  },
  {
    "id": "SPRING-026",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Bean의 라이프사이클과 관련 콜백 메서드(@PostConstruct, @PreDestroy 등)에 대해 상세히 설명해주세요.",
    "answer": "Bean 라이프사이클 단계\n\n초기화 콜백 (Bean 생성 후)\n@PostConstruct (권장)\nInitializingBean 인터페이스\n@Bean(initMethod = \"init\")\n   \n\n소멸 콜백 (컨테이너 종료 시)\n@PreDestroy (권장)\nDisposableBean 인터페이스\n@Bean(destroyMethod = \"close\")\n\n실행 순서\n초기화: @PostConstruct → InitializingBean → initMethod\n소멸: @PreDestroy → DisposableBean → destroyMethod\n\n권장 방식\n@PostConstruct, @PreDestroy 사용\n자바 표준(JSR-250)으로 스프링에 의존하지 않음\n코드 수정 불가 시 @Bean의 initMethod/destroyMethod 사용\n\n주의사항\n@PostConstruct에서 다른 Bean을 호출할 때 해당 Bean이 완전히 초기화되지 않았을 수 있음\n복잡한 초기화 로직은 ApplicationRunner 또는 SmartInitializingSingleton 사용 권장",
    "references": []
  },
  {
    "id": "SPRING-027",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "@Component, @Service, @Repository의 차이점 및 사용 사례는 무엇인가요?",
    "answer": "기본 관계\n\n세 어노테이션 모두 @Component를 메타 어노테이션으로 가지며, 컴포넌트 스캔 대상이 됩니다.\n\n각 어노테이션의 역할\n\n어노테이션   계층   역할\n\n@Component   범용   일반적인 스프링 빈 등록\n@Service   서비스 계층   비즈니스 로직 처리\n@Repository   영속성 계층   데이터 접근 로직 (DAO)\n@Controller   표현 계층   HTTP 요청/응답 처리\n\n@Repository의 특별한 기능\n예외 변환: DB 관련 예외를 DataAccessException으로 자동 변환\nJPA, JDBC 등 기술에 종속적인 예외를 스프링 예외로 추상화\nPersistenceExceptionTranslationPostProcessor가 이 변환을 담당\n\n@Service의 역할\n현재 특별한 추가 기능은 없음\n비즈니스 계층임을 의미적으로 표현\n향후 AOP 등에서 특별 처리 가능성\n\n@Component vs @Bean 트레이드오프\n구분   @Component   @Bean\n\n적용 대상   클래스 레벨   메서드 레벨 (@Configuration 내)\nBean 이름   클래스명 (첫 글자 소문자)   메서드명\n외부 라이브러리   사용 불가   사용 가능\n조건부 생성   @Conditional 필요   메서드 내 로직으로 제어 가능\n\n사용 예시\n\n@Component 직접 사용 시\n특정 계층에 속하지 않는 유틸리티 클래스\n예: 이메일 발송기, 암호화 유틸 등",
    "references": []
  },
  {
    "id": "SPRING-028",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "AOP(Aspect Oriented Programming)를 활용한 공통 관심사(Cross-Cutting Concerns) 분리 방법에 대해 설명해주세요.",
    "answer": "공통 관심사 (Cross-Cutting Concerns)\n여러 모듈에 걸쳐 반복되는 부가 기능\n예: 로깅, 트랜잭션, 보안, 성능 측정\n\nAOP로 분리하는 방법\nAspect 정의\n\nPointcut 표현식 예시\n\n표현식   설명\n\nexecution( com.example...(..))   모든 메서드\n@annotation(LogExecutionTime)   특정 어노테이션 붙은 메서드\nwithin(com.example.service.)   특정 패키지 내 모든 메서드\nbean(Service)   이름이 Service로 끝나는 Bean\n\n활용 예시\n\n관심사   구현 방식\n\n로깅   @Around로 메서드 실행 전후 로깅\n성능 측정   @Around로 실행 시간 측정\n권한 체크   @Before로 진입 전 권한 검증\n예외 처리   @AfterThrowing으로 예외 로깅\n트랜잭션   @Transactional (내부적으로 AOP)",
    "references": []
  },
  {
    "id": "SPRING-029",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring에서 트랜잭션 관리 방식과 @Transactional 어노테이션의 주요 속성(propagation, isolation 등)에 대해 설명해주세요.",
    "answer": "트랜잭션 관리 방식\n프로그래밍 방식 (명시적)\n선언적 방식 (권장)\n   \n\n@Transactional 동작 원리\nAOP 프록시 기반으로 동작\n메서드 호출 전: 트랜잭션 시작\n정상 완료: 커밋\n예외 발생: 롤백\n\n주요 속성\n\n속성   설명   기본값\n\npropagation   전파 방식   REQUIRED\nisolation   격리 수준   DEFAULT\ntimeout   타임아웃(초)   -1 (무제한)\nreadOnly   읽기 전용   false\nrollbackFor   롤백할 예외   RuntimeException\n\n전파 속성 (Propagation)\n\n주의사항\npublic 메서드에만 적용 (Spring 6+에서는 protected도 가능)\nself-invocation 시 프록시 우회 → AopContext.currentProxy() 또는 자기 자신 주입으로 해결\nChecked Exception은 기본 롤백 안 함\n\n전파 속성 사용 시 주의\nREQUIRES_NEW는 새 DB 커넥션을 사용하므로 커넥션 풀 고갈 주의\nNESTED는 JDBC Savepoint 지원 DB에서만 동작 (JPA에서는 제한적)",
    "references": []
  },
  {
    "id": "SPRING-030",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring MVC 아키텍처의 구성 요소와 요청 처리 과정을 설명해주세요.",
    "answer": "Spring MVC 핵심 구성 요소\n\n구성 요소   역할\n\nDispatcherServlet   프론트 컨트롤러, 모든 요청의 진입점\nHandlerMapping   URL → 핸들러(Controller) 매핑\nHandlerAdapter   다양한 핸들러 실행 방식 지원\nController   비즈니스 로직 처리\nViewResolver   뷰 이름 → 실제 View 변환\nView   응답 렌더링\n\n요청 처리 흐름\n\nREST API의 경우 (@RestController)\nViewResolver 단계 생략\n@ResponseBody로 객체를 JSON으로 직렬화\n\n주요 HandlerMapping\nRequestMappingHandlerMapping: @RequestMapping 기반 (가장 일반적)\nBeanNameUrlHandlerMapping: Bean 이름 기반\n\n주요 HandlerAdapter\nRequestMappingHandlerAdapter: @RequestMapping 처리",
    "references": []
  },
  {
    "id": "SPRING-031",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Boot의 자동 구성(Auto-Configuration) 원리에 대해 설명해주세요.",
    "answer": "Auto-Configuration이란?\n클래스패스, 설정값, Bean 존재 여부 등을 기반으로 자동으로 Bean을 등록하는 기능\n개발자가 직접 설정하지 않아도 필요한 설정이 자동 적용\n\n동작 원리\n@SpringBootApplication\nspring.factories / AutoConfiguration.imports 파일\nMETA-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports\n자동 구성 클래스 목록이 정의됨\n조건부 설정 (@Conditional)\n   \n\n주요 @Conditional 어노테이션\n\n어노테이션   조건\n\n@ConditionalOnClass   특정 클래스가 클래스패스에 있을 때\n@ConditionalOnMissingBean   해당 Bean이 없을 때\n@ConditionalOnProperty   특정 프로퍼티 값일 때\n@ConditionalOnWebApplication   웹 애플리케이션일 때\n\n예시: DataSource 자동 구성\nspring-boot-starter-jdbc 의존성 추가\n클래스패스에 DataSource.class 존재\nDataSourceAutoConfiguration 활성화\napplication.yml의 설정으로 DataSource Bean 생성\n\n자동 구성 비활성화",
    "references": []
  },
  {
    "id": "SPRING-032",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring MVC에서 전역 예외 처리를 위한 @ControllerAdvice의 역할과 활용 방법은 무엇인가요?",
    "answer": "@ControllerAdvice란?\n전역 예외 처리를 담당하는 클래스\n모든 컨트롤러에서 발생하는 예외를 한 곳에서 처리\nAOP 기반으로 동작\n\n기본 사용법\n\n주요 기능\n@ExceptionHandler: 특정 예외 처리\n@ModelAttribute: 모든 컨트롤러에 공통 모델 데이터 추가\n@InitBinder: 요청 파라미터 바인딩 커스터마이징\n\n적용 범위 제한\n\n예외 처리 우선순위\n컨트롤러 내 @ExceptionHandler\n@ControllerAdvice 내 @ExceptionHandler\n더 구체적인 예외가 우선",
    "references": []
  },
  {
    "id": "SPRING-033",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Security의 기본 개념과 인증/인가 처리 흐름에 대해 설명해주세요.",
    "answer": "Spring Security란?\n인증(Authentication)과 인가(Authorization)를 담당하는 보안 프레임워크\nFilter 기반으로 동작\n\n인증 vs 인가\n구분   인증 (Authentication)   인가 (Authorization)\n\n의미   누구인지 확인   권한이 있는지 확인\n예시   로그인   관리자 페이지 접근 권한\n\n핵심 구성 요소\n\n구성 요소   역할\n\nSecurityFilterChain   보안 필터 체인\nAuthenticationManager   인증 처리 관리\nUserDetailsService   사용자 정보 로드\nPasswordEncoder   비밀번호 암호화\n\n인증 처리 흐름\n\n기본 설정 예시",
    "references": []
  },
  {
    "id": "SPRING-034",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "RESTful API를 Spring에서 구현하는 방법과 모범 사례는 무엇인가요?",
    "answer": "RESTful API 구현 기본\n\nREST 설계 모범 사례\n명사형 URI 사용\nGood: /api/users, /api/orders\nBad: /api/getUsers, /api/createOrder\nHTTP 메서드 의미 준수\n   메서드   용도   멱등성\n   \n   GET   조회   O\n   POST   생성   X\n   PUT   전체 수정   O\n   PATCH   부분 수정   O\n   DELETE   삭제   O\n적절한 상태 코드 반환\n200: 성공, 201: 생성됨, 204: 내용 없음\n400: 잘못된 요청, 401: 인증 필요 (Unauthenticated), 403: 권한 없음 (Unauthorized), 404: 없음\n409: 충돌 (리소스 상태 충돌), 422: 처리 불가 (유효성 검증 실패)\n일관된 응답 형식\n페이징 처리\n버전 관리\nURI: /api/v1/users\nHeader: Accept: application/vnd.api.v1+json",
    "references": []
  },
  {
    "id": "SPRING-035",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Boot Actuator를 통한 애플리케이션 모니터링 방법은 무엇인가요?",
    "answer": "Spring Boot Actuator란?\n애플리케이션의 상태, 메트릭, 헬스체크 등을 모니터링하는 기능 제공\n운영 환경에서 애플리케이션 관리를 위한 HTTP 엔드포인트 제공\n\n의존성 추가\n\n주요 엔드포인트\n\n엔드포인트   설명   기본 노출\n\n/actuator/health   애플리케이션 상태   O\n/actuator/info   애플리케이션 정보   O\n/actuator/metrics   메트릭 정보   X\n/actuator/env   환경 변수   X\n/actuator/loggers   로거 설정 (동적 변경 가능)   X\n/actuator/beans   등록된 Bean 목록   X\n/actuator/threaddump   스레드 덤프   X\n/actuator/heapdump   힙 덤프   X\n\n주의: 민감한 엔드포인트는 기본적으로 비활성화되어 있으며, 운영 환경에서는 보안 설정 필수\n\n설정 예시\n\nPrometheus + Grafana 연동\n/actuator/prometheus 엔드포인트 활성화\nPrometheus가 메트릭 수집 → Grafana로 시각화\n\n보안 설정\n운영 환경에서는 민감 엔드포인트 접근 제한 필요\nSpring Security와 연동하여 인증 적용",
    "references": []
  },
  {
    "id": "SPRING-036",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Cloud를 활용한 마이크로서비스 아키텍처 구현 전략에 대해 설명해주세요.",
    "answer": "Spring Cloud란?\n마이크로서비스 아키텍처(MSA) 구축을 위한 도구 모음\n분산 시스템의 공통 패턴들을 쉽게 구현\n\n핵심 구성 요소\n\n컴포넌트   역할   구현체\n\nService Discovery   서비스 등록/발견   Eureka, Consul\nAPI Gateway   라우팅, 인증, 로드밸런싱   Spring Cloud Gateway\nConfig Server   중앙 집중식 설정 관리   Spring Cloud Config\nCircuit Breaker   장애 전파 방지   Resilience4j\nDistributed Tracing   분산 추적   Zipkin, Jaeger\nService Discovery (Eureka)\nAPI Gateway\nCircuit Breaker (Resilience4j)\nConfig Server\nGit 저장소에 설정 파일 관리\n애플리케이션 재시작 없이 설정 변경 가능\n\nMSA 구현 시 고려사항**\n서비스 간 통신: REST, gRPC, 메시지 큐\n데이터 일관성: Saga 패턴, 이벤트 소싱\n장애 대응: 타임아웃, 재시도, 폴백",
    "references": []
  },
  {
    "id": "SPRING-037",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring에서 메시징 시스템(Kafka, RabbitMQ 등)과의 연동 방법은 무엇인가요?",
    "answer": "메시징 시스템 사용 이유\n서비스 간 비동기 통신\n시스템 간 결합도 감소\n부하 분산 및 버퍼링\nSpring Kafka 연동\nSpring AMQP (RabbitMQ) 연동\n\nKafka vs RabbitMQ\n\n구분   Kafka   RabbitMQ\n\n처리량   높음 (대용량)   중간\n메시지 저장   디스크에 영구 저장   메모리 우선\n순서 보장   파티션 내 보장   큐 내 보장\n적합 용도   이벤트 스트리밍, 로그   작업 큐, RPC",
    "references": []
  },
  {
    "id": "SPRING-038",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring의 캐싱 추상화(Cache Abstraction)와 캐시 적용 방법에 대해 설명해주세요.",
    "answer": "Spring Cache Abstraction이란?\n캐시 구현체에 독립적인 추상화 계층 제공\n어노테이션 기반으로 간편하게 캐시 적용\n구현체: ConcurrentHashMap, Ehcache, Redis, Caffeine 등\n\n활성화\n\n주요 어노테이션\n\n어노테이션   역할\n\n@Cacheable   캐시 조회, 없으면 메서드 실행 후 저장\n@CachePut   항상 메서드 실행 후 캐시 저장\n@CacheEvict   캐시 삭제\n@Caching   여러 캐시 작업 조합\n\n사용 예시\n\nRedis 캐시 설정\n\n주의사항\nSelf-invocation: 같은 클래스 내 호출 시 캐시 미적용 (프록시 우회)\n캐시 키 설계: 충돌 방지를 위해 명확한 키 전략 필요\nTTL 설정: 데이터 정합성을 위해 만료 시간 설정 권장\n@Cacheable과 @Transactional: 둘 다 프록시 기반이므로 순서 주의 (외부 호출부터 적용)\n\n캐시 무효화 전략\nCache-Aside: 애플리케이션이 캐시 관리 (가장 일반적)\nWrite-Through: 쓰기 시 캐시도 함께 업데이트\n이벤트 기반: 데이터 변경 이벤트로 캐시 무효화",
    "references": []
  },
  {
    "id": "SPRING-039",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Boot에서 프로파일(Profile) 관리와 환경별 설정 적용 방법은 무엇인가요?",
    "answer": "Spring Profile이란?\n환경별(개발, 테스트, 운영)로 다른 설정을 적용하는 기능\nBean, 설정 파일을 환경별로 분리 가능\n\n프로파일 설정 방법\n설정 파일 분리\n프로파일 활성화\n환경별 Bean 등록\n프로파일 그룹\n\n환경별 설정 예시\n\n@Profile 사용",
    "references": []
  },
  {
    "id": "SPRING-040",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Bean의 Scope(싱글톤, 프로토타입, request, session 등) 차이점과 활용 사례는 무엇인가요?",
    "answer": "Bean Scope 종류\n\nScope   설명   생명주기 관리\n\nsingleton   컨테이너당 하나 (기본값)   컨테이너 전체\nprototype   요청마다 새로 생성   생성까지만\nrequest   HTTP 요청당 하나   요청 범위\nsession   HTTP 세션당 하나   세션 범위\napplication   ServletContext당 하나   앱 전체\nwebsocket   WebSocket 세션당 하나   WebSocket 범위\nSingleton (기본값)\n활용: 상태 없는(stateless) 서비스, 레포지토리\n주의: 인스턴스 변수에 상태 저장 금지\nPrototype\n활용: 상태를 가지는 객체, 매번 새 인스턴스 필요 시\n주의: @PreDestroy 호출 안 됨\nRequest/Session (웹 스코프)\n활용: 사용자별 데이터, 요청 로깅\n\n싱글톤에서 프로토타입 주입 문제",
    "references": []
  },
  {
    "id": "SPRING-041",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring의 이벤트 발행(ApplicationEventPublisher) 및 리스너(@EventListener) 메커니즘에 대해 설명해주세요.",
    "answer": "Spring Event란?\n애플리케이션 내 느슨한 결합으로 컴포넌트 간 통신\nObserver 패턴 기반\n발행자(Publisher)와 구독자(Listener) 분리\n\n이벤트 정의\n\n이벤트 발행\n\n이벤트 리스너\n\n트랜잭션 연동\n\n활용 사례\n주문 완료 → 이메일/알림 발송\n회원 가입 → 포인트 지급\n결제 완료 → 재고 차감",
    "references": []
  },
  {
    "id": "SPRING-042",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "커스텀 어노테이션을 생성하고 이를 Spring에서 활용하는 방법은 무엇인가요?",
    "answer": "커스텀 어노테이션 생성\n\n메타 어노테이션 설명\n어노테이션   역할\n\n@Target   적용 대상 (METHOD, TYPE, FIELD 등)\n@Retention   유지 범위 (SOURCE, CLASS, RUNTIME)\n@Documented   JavaDoc에 포함\n@Inherited   상속 시 전달\n\n활용 방법 1: AOP와 결합\n\n활용 방법 2: HandlerMethodArgumentResolver\n\n활용 방법 3: 조합 어노테이션",
    "references": []
  },
  {
    "id": "SPRING-043",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring WebFlux와 Spring MVC의 차이점 및 사용 시나리오는 무엇인가요?",
    "answer": "핵심 차이점\n\n구분   Spring MVC   Spring WebFlux\n\n프로그래밍 모델   동기/블로킹   비동기/논블로킹\n서버   Tomcat (서블릿)   Netty (기본)\n스레드 모델   요청당 스레드   이벤트 루프\n반환 타입   Object, ResponseEntity   Mono, Flux\n동시 처리   스레드 수에 비례   적은 스레드로 많은 요청\n\nSpring WebFlux 코드 예시\n\nMono vs Flux\nMono: 0~1개의 데이터 (단건)\nFlux: 0~N개의 데이터 (스트림)\n\nWebFlux 사용이 적합한 경우\n대규모 동시 접속: 수만 개의 커넥션 처리\n스트리밍 데이터: 실시간 피드, SSE\n마이크로서비스 게이트웨이: 여러 서비스 호출 조합\nI/O 집약적 작업: 외부 API 호출이 많은 경우\n\nSpring MVC가 더 나은 경우\nCPU 집약적 작업: 복잡한 연산\nJDBC/JPA 사용: 블로킹 드라이버 (R2DBC 미사용 시)\n기존 동기 라이브러리 의존\n팀의 학습 곡선 고려\n디버깅 용이성: 동기 코드가 스택 트레이스 추적 쉬움\n\n주의사항\n전체 스택이 논블로킹이어야 효과 있음\n하나라도 블로킹 호출이 있으면 이벤트 루프 블록\nR2DBC (리액티브 DB 드라이버) 필요\n\n참고 (Java 21+)\nVirtual Threads를 사용하면 MVC에서도 높은 동시성 달성 가능\nspring.threads.virtual.enabled=true 설정으로 활성화",
    "references": []
  },
  {
    "id": "SPRING-044",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring에서 비동기 처리(Asynchronous Processing)를 @Async와 CompletableFuture로 구현하는 방법에 대해 설명해주세요.",
    "answer": "비동기 처리 활성화\n@Async 사용\n커스텀 Executor 설정\nCompletableFuture 조합\n예외 처리\n\n주의사항\nSelf-invocation 불가: 같은 클래스 내 호출 시 @Async 미적용 (프록시 우회)\nvoid 또는 Future 반환: 다른 타입 반환 시 결과를 받을 수 없음\n트랜잭션 분리: @Async 메서드는 별도 트랜잭션 (호출자의 트랜잭션과 독립)\n예외 처리: void 메서드의 예외는 AsyncUncaughtExceptionHandler로 처리\n\n반환 타입\n타입   설명\n\nvoid   결과 불필요, 예외 전파 안 됨\nFuture<T>   결과 대기 가능\nCompletableFuture<T>   조합, 체이닝 가능 (권장)\nListenableFuture<T>   Spring 6에서 deprecated, CompletableFuture 사용 권장",
    "references": []
  },
  {
    "id": "SPRING-045",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Logback을 이용한 Spring Boot의 로깅 설정과 관리 방법은 무엇인가요?",
    "answer": "Spring Boot 기본 로깅\n기본 로깅 프레임워크: Logback\n로깅 파사드: SLF4J\n별도 설정 없이 바로 사용 가능\n\napplication.yml 설정\n\nlogback-spring.xml (상세 설정)\n\n로그 레벨\n레벨   용도\n\nTRACE   가장 상세한 정보\nDEBUG   디버깅용\nINFO   일반 정보\nWARN   경고\nERROR   오류\n\n코드에서 사용",
    "references": []
  },
  {
    "id": "SPRING-046",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "HttpMessageConverter의 역할과 Spring MVC에서의 HTTP 메시지 변환 과정을 설명해주세요.",
    "answer": "HttpMessageConverter란?\nHTTP 요청/응답 본문(body)을 Java 객체로 변환하는 인터페이스\n@RequestBody, @ResponseBody 처리의 핵심\n\n동작 흐름\n\n요청 시 (역직렬화)\n\n응답 시 (직렬화)\n\n주요 HttpMessageConverter\n\nConverter   역할\n\nMappingJackson2HttpMessageConverter   JSON ↔ 객체 (Jackson)\nStringHttpMessageConverter   String 처리\nByteArrayHttpMessageConverter   byte[] 처리\nFormHttpMessageConverter   Form 데이터 처리\n\nContent-Type 기반 선택\napplication/json → MappingJackson2HttpMessageConverter\ntext/plain → StringHttpMessageConverter\napplication/x-www-form-urlencoded → FormHttpMessageConverter\n\n커스텀 설정\n\nJackson 설정 (application.yml)",
    "references": []
  },
  {
    "id": "SPRING-047",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "RestTemplate과 WebClient의 차이점 및 사용 사례에 대해 설명해주세요.",
    "answer": "RestTemplate vs WebClient\n\n구분   RestTemplate   WebClient\n\n방식   동기/블로킹   비동기/논블로킹 (동기도 지원)\n스레드   응답까지 스레드 점유   논블로킹으로 스레드 효율적\n상태   유지보수 모드 (신규 기능 추가 안 함)   권장\n의존성   spring-web   spring-webflux\n\nRestTemplate 상태 명확화\n\"Deprecated\"가 아닌 유지보수 모드: 버그 수정은 하지만 신규 기능 추가 없음\n기존 코드에서 계속 사용 가능하나, 새 프로젝트에서는 WebClient 또는 RestClient 권장\nSpring Framework 6.1+에서는 RestClient 도입 (동기 방식의 현대적 대안)\n\nRestTemplate 사용\n\nWebClient 사용\n\nWebClient 권장 이유\n성능: 논블로킹으로 리소스 효율적\n유연성: 동기/비동기 모두 지원\n함수형 API: 체이닝으로 가독성 좋음\n미래 지향적: Spring 공식 권장\n\n사용 시나리오\nRestTemplate: 간단한 동기 호출, 레거시 코드\nWebClient: 새 프로젝트, 높은 동시성, 리액티브 스택",
    "references": []
  },
  {
    "id": "SPRING-048",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "@Scheduled 애노테이션을 사용한 스케줄링 작업 구현 방법은 무엇인가요?",
    "answer": "스케줄링 활성화\n\n@Scheduled 사용법\n고정 간격 (fixedRate)\n고정 지연 (fixedDelay)\nCron 표현식\n\nCron 표현식 형식\n\n필드   값 범위\n\n초   0-59\n분   0-59\n시   0-23\n일   1-31\n월   1-12 또는 JAN-DEC\n요일   0-7 또는 SUN-SAT\n\nCron 예시\n표현식   의미\n\n0 0       매시 정각\n0 0 0      매일 자정\n0 0 12   MON   매주 월요일 12시\n0 /10       10분마다\n\n스레드 풀 설정\n\n동적 스케줄링 (DB에서 주기 조회)",
    "references": []
  },
  {
    "id": "SPRING-049",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Boot Starter의 개념과 주요 Starter들의 역할에 대해 설명해주세요.",
    "answer": "Spring Boot Starter란?\n특정 기능에 필요한 의존성들을 묶어둔 패키지\n의존성 버전 관리 자동화\nAuto-Configuration과 함께 동작\n\nStarter의 장점\n관련 의존성 한 번에 추가\n호환되는 버전 자동 관리\n보일러플레이트 설정 최소화\n\n주요 Starter 목록\n\nStarter   역할\n\nspring-boot-starter   기본 (core, logging, autoconfigure)\nspring-boot-starter-web   웹 애플리케이션 (Tomcat, Spring MVC)\nspring-boot-starter-webflux   리액티브 웹 (Netty, WebFlux)\nspring-boot-starter-data-jpa   JPA + Hibernate\nspring-boot-starter-data-redis   Redis 연동\nspring-boot-starter-security   Spring Security\nspring-boot-starter-test   테스트 (JUnit, Mockito, AssertJ)\nspring-boot-starter-actuator   모니터링 엔드포인트\nspring-boot-starter-validation   Bean Validation\nspring-boot-starter-cache   캐시 추상화\nspring-boot-starter-mail   이메일 발송\nspring-boot-starter-batch   배치 처리\n\n사용 예시\n\nspring-boot-starter-web 포함 내용\nSpring MVC\nTomcat (내장 서버)\nJackson (JSON 처리)\nValidation\nLogging (Logback)\n\n커스텀 Starter 만들기\n자체 Auto-Configuration 제공 가능\n사내 공통 라이브러리 배포에 유용",
    "references": []
  },
  {
    "id": "SPRING-050",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Java Config(@Configuration)와 XML Config를 통한 Bean 등록 및 설정 방식의 차이점은 무엇인가요?",
    "answer": "설정 방식 비교\n\n구분   XML Config   Java Config\n\n방식   XML 파일   Java 클래스 + 어노테이션\n컴파일 검증   런타임 오류   컴파일 타임 오류\nIDE 지원   제한적   자동완성, 리팩토링 가능\n트렌드   레거시   현재 표준\n\nXML Config 예시\n\nJava Config 예시\n\nComponent Scan 방식\n\nJava Config 장점\n타입 안전성: 컴파일 시 오류 검출\n리팩토링 용이: 클래스명 변경 시 자동 반영\n조건부 Bean: @Conditional 등 프로그래밍적 제어\n프로파일 적용: @Profile과 쉬운 통합\n가독성: 코드로 흐름 파악 가능\n\nXML Config 장점\n코드 수정 없이 설정 변경 가능\n외부화된 설정 관리\n레거시 시스템과 호환\n\n현재 권장 방식\nJava Config + @Component 스캔 조합\nXML은 외부 라이브러리 설정이나 레거시 통합 시에만 사용",
    "references": []
  },
  {
    "id": "SPRING-051",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "최신 Spring 버전에서 추가된 기능 및 개선 사항에 대해 설명해주세요.",
    "answer": "Spring Framework 6 / Spring Boot 3 주요 변경사항\nJava 17 기준선\n최소 요구 버전이 Java 17로 상향\nRecord, Sealed Class, Pattern Matching 등 활용 가능\nJakarta EE 9+ 마이그레이션\njavax. → jakarta. 패키지 변경\nNative Image 지원 (GraalVM)\nAOT(Ahead-of-Time) 컴파일 공식 지원\n빠른 시작 시간과 낮은 메모리 사용량\nHTTP Interface Client\n선언적 HTTP 클라이언트 (Feign과 유사)\n문제 세부 정보 (Problem Details)\nRFC 7807 기반 표준 에러 응답 형식 지원\nObservability 개선\nMicrometer 통합 강화\n분산 추적 (Tracing) 통합\nMicrometer Observation API 도입\nVirtual Threads 지원 (Java 21)\nProject Loom의 가상 스레드 지원\n\nSpring Boot 3.2+ 추가 기능\nRestClient 도입 (WebClient의 동기 버전)\nJdbcClient 도입 (JDBC 간소화)\nSSL Bundle 자동 구성\nDocker Compose 지원 개선",
    "references": [
      {
        "title": "Spring Framework 6.0 Release Notes",
        "url": "https://github.com/spring-projects/spring-framework/wiki/What%27s-New-in-Spring-Framework-6.x"
      },
      {
        "title": "Spring Boot 3.0 Release Notes",
        "url": "https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Release-Notes"
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { frameworkData };
}
