const frameworkData = [
  {
    "id": "KTOR-001",
    "category": "ktor",
    "categoryName": "Ktor",
    "section": "framework",
    "question": "Ktor가 무엇인지, 다른 웹 프레임워크(Spring, NestJS 등)와 비교했을 때 어떤 특징이 있는지 설명해 주세요.",
    "answer": "Ktor는 JetBrains에서 개발한 Kotlin 기반의 비동기 웹 프레임워크입니다.\r\n\r\n**주요 특징:**\r\n- **경량성**: 필요한 기능만 플러그인으로 추가하는 모듈식 구조\r\n- **Kotlin 네이티브**: Kotlin DSL을 활용한 직관적인 API 설계\r\n- **Coroutine 기반**: 비동기 처리를 코루틴으로 자연스럽게 구현 (suspend 함수가 기본)\r\n- **멀티플랫폼**: 서버는 JVM 전용, 클라이언트는 JVM/Android/iOS/JavaScript/Native 지원\r\n- **서버/클라이언트 통합**: 동일한 API로 서버와 HTTP 클라이언트 구현 가능\r\n\r\n> **참고**: Ktor 서버는 JVM에서만 실행되지만, Ktor Client는 Kotlin Multiplatform을 완전히 지원합니다.\r\n\r\n**Spring과 비교:**\r\n| 항목 | Ktor | Spring |\r\n|------|------|--------|\r\n| 학습 곡선 | 낮음 | 높음 |\r\n| 시작 시간 | 빠름 | 상대적으로 느림 |\r\n| 생태계 | 성장 중 | 매우 풍부 |\r\n| DI | 선택적 (Koin, Kodein) | 내장 (IoC Container) |",
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
    "answer": "Ktor는 처음부터 Kotlin Coroutine을 기반으로 설계되어 비동기 처리가 자연스럽게 통합되어 있습니다.\r\n\r\n**비동기 처리 방식:**\r\n```kotlin\r\n// 모든 라우트 핸들러는 suspend 함수로 동작\r\nget(\"/users\") {\r\n    val users = userService.findAll() // suspend 함수 호출\r\n    call.respond(users)\r\n}\r\n```\r\n\r\n**Coroutine 연동 특징:**\r\n- **모든 핸들러가 suspend 함수**: 블로킹 없이 I/O 작업 처리\r\n- **CIO 엔진**: Coroutine-based I/O 엔진으로 순수 Kotlin 구현\r\n- **Structured Concurrency**: 각 요청은 자체 CoroutineScope에서 실행되며, 요청 처리 완료 또는 취소 시 하위 코루틴도 함께 취소됨\r\n- **병렬 요청 처리**: `launch`나 `async`를 사용해 동시 요청 가능\r\n\r\n**주의사항:**\r\n- Ktor의 요청 처리는 기본적으로 요청 완료까지 대기하지만, 클라이언트 연결 해제가 코루틴 취소를 보장하지는 않음\r\n- 긴 작업은 별도의 CoroutineScope에서 관리하거나 타임아웃 설정 권장\r\n\r\n```kotlin\r\n// 병렬 요청 예시\r\nval deferred1 = async { client.get(\"url1\") }\r\nval deferred2 = async { client.get(\"url2\") }\r\nval results = awaitAll(deferred1, deferred2)\r\n```",
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
    "answer": "**Application:**\r\nKtor 서버의 핵심 인스턴스로, 모든 설정과 플러그인이 등록되는 컨테이너입니다.\r\n\r\n**Application Module:**\r\nApplication의 설정을 구성하는 확장 함수입니다. 플러그인 설치, 라우팅 설정 등을 담당합니다.\r\n\r\n```kotlin\r\nfun main() {\r\n    embeddedServer(Netty, port = 8080, module = Application::module)\r\n        .start(wait = true)\r\n}\r\n\r\n// Application Module 정의\r\nfun Application.module() {\r\n    install(ContentNegotiation) { json() }\r\n    configureRouting()\r\n}\r\n\r\nfun Application.configureRouting() {\r\n    routing {\r\n        get(\"/\") { call.respondText(\"Hello\") }\r\n    }\r\n}\r\n```\r\n\r\n**특징:**\r\n- **모듈 분리**: 기능별로 모듈을 나눠 관리 가능\r\n- **플러그인 공유**: 한 모듈에 설치된 플러그인은 다른 모듈에서도 적용\r\n- **설정 파일 연동**: `application.conf`에서 모듈 지정 가능",
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
    "answer": "Ktor의 경량성은 **필요한 기능만 선택적으로 추가하는 플러그인 기반 아키텍처**를 의미합니다.\r\n\r\n**경량성의 의미:**\r\n- 코어에는 최소한의 기능만 포함\r\n- 인증, 직렬화, 세션 등은 별도 플러그인으로 제공\r\n- 사용하지 않는 기능은 애플리케이션에 포함되지 않음\r\n\r\n**장점:**\r\n- **빠른 시작 시간**: 불필요한 기능 로딩 없음\r\n- **낮은 메모리 사용량**: 필요한 것만 로드\r\n- **유연한 구성**: 프로젝트 요구사항에 맞춤 설정\r\n- **작은 배포 크기**: Fat JAR 크기 최소화\r\n\r\n**단점:**\r\n- **수동 설정 필요**: 기능별로 직접 플러그인 추가 (예: JSON 직렬화, 인증 각각 설치)\r\n- **작은 생태계**: Spring 대비 서드파티 라이브러리 부족 (특히 ORM, 보안)\r\n- **학습 필요**: 필요한 플러그인 파악 및 조합 방법 학습\r\n- **일관성 부족**: 프로젝트마다 다른 구성이 될 수 있어 팀 표준화 필요\r\n\r\n**트레이드오프:**\r\n| 관점 | 경량성의 장점 | 경량성의 비용 |\r\n|------|--------------|--------------|\r\n| 시작 시간 | ~50ms (Spring ~2-5초) | - |\r\n| 메모리 | ~50MB (Spring ~200MB+) | - |\r\n| 개발 속도 | 빠른 프로토타이핑 | 복잡한 기능은 직접 구현 |\r\n| 유지보수 | 코드베이스 이해 용이 | 표준화된 구조 없음 |",
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
    "answer": "Ktor에서 라우팅은 `routing` DSL을 사용하여 설정합니다.\r\n\r\n```kotlin\r\nfun Application.configureRouting() {\r\n    routing {\r\n        // 기본 GET 요청\r\n        get(\"/\") {\r\n            call.respondText(\"Hello, World!\")\r\n        }\r\n\r\n        // 경로 그룹화\r\n        route(\"/api\") {\r\n            route(\"/users\") {\r\n                get { /* 사용자 목록 */ }\r\n                post { /* 사용자 생성 */ }\r\n                get(\"/{id}\") { /* 특정 사용자 조회 */ }\r\n            }\r\n        }\r\n    }\r\n}\r\n```\r\n\r\n**HTTP 메서드 함수:**\r\n- `get()`, `post()`, `put()`, `delete()`, `patch()`, `head()`, `options()`\r\n\r\n**라우팅 특징:**\r\n- **계층적 구조**: `route()`로 경로 중첩 가능\r\n- **DSL 기반**: Kotlin DSL로 가독성 높은 코드\r\n- **플러그인 적용**: 특정 라우트에만 플러그인 적용 가능",
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
    "answer": "Route DSL은 Kotlin의 타입 안전 빌더 패턴을 활용한 라우팅 정의 방식입니다.\r\n\r\n```kotlin\r\nrouting {\r\n    // 기본 라우트\r\n    get(\"/hello\") { call.respondText(\"Hello\") }\r\n\r\n    // 중첩 라우트\r\n    route(\"/api/v1\") {\r\n        // /api/v1/users\r\n        route(\"/users\") {\r\n            get { /* GET /api/v1/users */ }\r\n            post { /* POST /api/v1/users */ }\r\n\r\n            route(\"/{id}\") {\r\n                get { /* GET /api/v1/users/{id} */ }\r\n                delete { /* DELETE /api/v1/users/{id} */ }\r\n            }\r\n        }\r\n    }\r\n}\r\n```\r\n\r\n**DSL 구성 요소:**\r\n- **route()**: 경로 그룹화\r\n- **HTTP 동사 함수**: get, post, put, delete 등\r\n- **경로 패턴**: 정적 경로, 파라미터(`{id}`), 와일드카드(`*`), 테일카드(`{...}`)\r\n\r\n**Type-Safe Routing (Resources 플러그인):**\r\n```kotlin\r\n@Resource(\"/articles\")\r\nclass Articles(val sort: String? = \"new\") {\r\n    @Resource(\"{id}\")\r\n    class Id(val parent: Articles, val id: Long)\r\n}\r\n\r\nrouting {\r\n    get<Articles> { articles -> /* /articles?sort=new */ }\r\n    get<Articles.Id> { article -> /* /articles/123 */ }\r\n}\r\n```",
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
    "answer": "**Path Parameter 처리:**\r\n```kotlin\r\n// 경로: /users/{id}\r\nget(\"/users/{id}\") {\r\n    val userId = call.parameters[\"id\"]\r\n        ?: return@get call.respond(HttpStatusCode.BadRequest)\r\n    call.respondText(\"User ID: $userId\")\r\n}\r\n\r\n// 선택적 파라미터: /users/{id?}\r\nget(\"/users/{id?}\") {\r\n    val userId = call.parameters[\"id\"] ?: \"all\"\r\n}\r\n\r\n// 테일카드: /files/{path...}\r\nget(\"/files/{path...}\") {\r\n    val pathParts = call.parameters.getAll(\"path\")\r\n}\r\n```\r\n\r\n**Query Parameter 처리:**\r\n```kotlin\r\n// URL: /products?category=electronics&sort=price\r\nget(\"/products\") {\r\n    val category = call.request.queryParameters[\"category\"]\r\n    val sort = call.request.queryParameters[\"sort\"] ?: \"default\"\r\n\r\n    // 다중 값: /search?tag=kotlin&tag=ktor\r\n    val tags = call.request.queryParameters.getAll(\"tag\")\r\n}\r\n```\r\n\r\n**Type-Safe 방식 (Resources 플러그인):**\r\n```kotlin\r\n@Resource(\"/products\")\r\ndata class Products(\r\n    val category: String? = null,\r\n    val sort: String = \"default\",\r\n    val page: Int = 1\r\n)\r\n\r\nget<Products> { params ->\r\n    // params.category, params.sort, params.page 직접 접근\r\n}\r\n```",
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
    "answer": "**ContentNegotiation 플러그인 사용 (권장):**\r\n```kotlin\r\n// 플러그인 설치\r\ninstall(ContentNegotiation) {\r\n    json() // kotlinx.serialization\r\n}\r\n\r\n// 요청 본문 수신\r\n@Serializable\r\ndata class User(val name: String, val email: String)\r\n\r\npost(\"/users\") {\r\n    val user = call.receive<User>()\r\n    call.respond(HttpStatusCode.Created, user)\r\n}\r\n```\r\n\r\n**수동 파싱:**\r\n```kotlin\r\n// 텍스트로 수신\r\npost(\"/raw\") {\r\n    val text = call.receiveText()\r\n}\r\n\r\n// 바이트 채널로 수신\r\npost(\"/stream\") {\r\n    val channel = call.receiveChannel()\r\n}\r\n\r\n// 멀티파트 데이터\r\npost(\"/upload\") {\r\n    val multipart = call.receiveMultipart()\r\n    multipart.forEachPart { part ->\r\n        when (part) {\r\n            is PartData.FormItem -> { /* 폼 필드 */ }\r\n            is PartData.FileItem -> { /* 파일 */ }\r\n            else -> {}\r\n        }\r\n        part.dispose()\r\n    }\r\n}\r\n```",
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
    "answer": "**ApplicationCall**은 HTTP 요청/응답 사이클을 나타내는 핵심 객체입니다.\r\n\r\n**주요 구성 요소:**\r\n```kotlin\r\nget(\"/example\") {\r\n    // 요청 정보 접근\r\n    val request = call.request\r\n    val method = call.request.httpMethod\r\n    val headers = call.request.headers\r\n    val path = call.request.path()\r\n\r\n    // 파라미터 접근\r\n    val pathParams = call.parameters\r\n    val queryParams = call.request.queryParameters\r\n\r\n    // 응답 전송\r\n    call.response.headers.append(\"X-Custom\", \"value\")\r\n    call.respond(HttpStatusCode.OK, data)\r\n    call.respondText(\"Hello\")\r\n    call.respondRedirect(\"/other\")\r\n}\r\n```\r\n\r\n**ApplicationCall의 역할:**\r\n- **요청 정보 접근**: HTTP 메서드, 헤더, 경로, 파라미터\r\n- **요청 본문 수신**: `receive()`, `receiveText()`, `receiveMultipart()`\r\n- **응답 전송**: `respond()`, `respondText()`, `respondFile()`\r\n- **속성 저장**: `call.attributes`로 요청 간 데이터 공유\r\n- **인증 정보**: `call.principal<T>()`로 인증된 사용자 접근",
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
    "answer": "플러그인은 Ktor 애플리케이션에 기능을 추가하는 모듈식 구성 요소입니다.\r\n\r\n**플러그인 설치:**\r\n```kotlin\r\nfun Application.module() {\r\n    // 전역 설치\r\n    install(ContentNegotiation) {\r\n        json()\r\n    }\r\n    install(Authentication) {\r\n        jwt { /* 설정 */ }\r\n    }\r\n\r\n    routing {\r\n        // 특정 라우트에만 설치\r\n        route(\"/api\") {\r\n            install(RateLimit) {\r\n                // 설정\r\n            }\r\n        }\r\n    }\r\n}\r\n```\r\n\r\n**주요 내장 플러그인:**\r\n| 플러그인 | 기능 |\r\n|---------|------|\r\n| ContentNegotiation | JSON/XML 직렬화 |\r\n| Authentication | 인증 처리 |\r\n| Sessions | 세션 관리 |\r\n| StatusPages | 예외/상태 처리 |\r\n| CORS | 교차 출처 요청 허용 |\r\n| CallLogging | 요청 로깅 |\r\n\r\n**플러그인 동작 원리:**\r\n- 요청/응답 파이프라인에 인터셉터 등록\r\n- 설정 블록에서 동작 커스터마이징\r\n- 라우트별 또는 전역으로 적용 가능",
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
    "answer": "**ContentNegotiation**은 요청/응답의 콘텐츠 타입을 자동으로 처리하는 플러그인입니다.\r\n\r\n**주요 역할:**\r\n1. **Content-Type 협상**: Accept 헤더 기반으로 응답 형식 결정\r\n2. **직렬화**: 객체를 JSON/XML 등으로 변환\r\n3. **역직렬화**: 요청 본문을 객체로 변환\r\n\r\n```kotlin\r\n// 설치\r\ninstall(ContentNegotiation) {\r\n    json(Json {\r\n        prettyPrint = true\r\n        ignoreUnknownKeys = true\r\n    })\r\n}\r\n\r\n// 사용\r\n@Serializable\r\ndata class User(val id: Int, val name: String)\r\n\r\npost(\"/users\") {\r\n    val user = call.receive<User>()  // 자동 역직렬화\r\n    call.respond(user)                // 자동 직렬화\r\n}\r\n```\r\n\r\n**지원 형식:**\r\n- `json()` - kotlinx.serialization\r\n- `jackson()` - Jackson\r\n- `gson()` - Gson\r\n- `xml()` - XML\r\n\r\n**의존성:**\r\n```kotlin\r\nimplementation(\"io.ktor:ktor-server-content-negotiation:$ktor_version\")\r\nimplementation(\"io.ktor:ktor-serialization-kotlinx-json:$ktor_version\")\r\n```",
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
    "answer": "**kotlinx.serialization (권장):**\r\n```kotlin\r\n// 의존성\r\nimplementation(\"io.ktor:ktor-serialization-kotlinx-json:$ktor_version\")\r\n\r\n// 설정\r\ninstall(ContentNegotiation) {\r\n    json(Json {\r\n        prettyPrint = true\r\n        isLenient = true\r\n        ignoreUnknownKeys = true\r\n        encodeDefaults = true\r\n    })\r\n}\r\n\r\n@Serializable\r\ndata class User(val name: String)\r\n```\r\n\r\n**Jackson:**\r\n```kotlin\r\n// 의존성\r\nimplementation(\"io.ktor:ktor-serialization-jackson:$ktor_version\")\r\n\r\n// 설정\r\ninstall(ContentNegotiation) {\r\n    jackson {\r\n        enable(SerializationFeature.INDENT_OUTPUT)\r\n        disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)\r\n        registerModule(JavaTimeModule())\r\n    }\r\n}\r\n```\r\n\r\n**Gson:**\r\n```kotlin\r\n// 의존성\r\nimplementation(\"io.ktor:ktor-serialization-gson:$ktor_version\")\r\n\r\n// 설정\r\ninstall(ContentNegotiation) {\r\n    gson {\r\n        setPrettyPrinting()\r\n        serializeNulls()\r\n        setDateFormat(\"yyyy-MM-dd\")\r\n    }\r\n}\r\n```\r\n\r\n**선택 기준:**\r\n- **kotlinx.serialization**: 멀티플랫폼, 컴파일 타임 안전성\r\n- **Jackson**: 풍부한 기능, Java 생태계 호환\r\n- **Gson**: 간단한 사용, 가벼움",
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
    "answer": "**StatusPages**는 예외와 HTTP 상태 코드를 일관되게 처리하는 플러그인입니다.\r\n\r\n```kotlin\r\ninstall(StatusPages) {\r\n    // 예외 처리\r\n    exception<Throwable> { call, cause ->\r\n        call.respondText(\r\n            text = \"500: ${cause.localizedMessage}\",\r\n            status = HttpStatusCode.InternalServerError\r\n        )\r\n    }\r\n\r\n    // 특정 예외 처리\r\n    exception<NotFoundException> { call, cause ->\r\n        call.respond(HttpStatusCode.NotFound, ErrorResponse(cause.message))\r\n    }\r\n\r\n    exception<AuthenticationException> { call, _ ->\r\n        call.respond(HttpStatusCode.Unauthorized)\r\n    }\r\n\r\n    // HTTP 상태 코드 처리\r\n    status(HttpStatusCode.NotFound) { call, status ->\r\n        call.respondText(\"Page not found\", status = status)\r\n    }\r\n\r\n    // 정적 파일 응답\r\n    statusFile(HttpStatusCode.NotFound, HttpStatusCode.Unauthorized,\r\n               filePattern = \"error#.html\")\r\n}\r\n```\r\n\r\n**사용 예시:**\r\n```kotlin\r\nget(\"/users/{id}\") {\r\n    val user = userService.findById(call.parameters[\"id\"]!!)\r\n        ?: throw NotFoundException(\"User not found\")\r\n    call.respond(user)\r\n}\r\n```",
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
    "answer": "**CORS**는 Cross-Origin Resource Sharing을 활성화하는 플러그인입니다.\r\n\r\n```kotlin\r\ninstall(CORS) {\r\n    // 허용할 HTTP 메서드\r\n    allowMethod(HttpMethod.Options)\r\n    allowMethod(HttpMethod.Get)\r\n    allowMethod(HttpMethod.Post)\r\n    allowMethod(HttpMethod.Put)\r\n    allowMethod(HttpMethod.Delete)\r\n\r\n    // 허용할 헤더\r\n    allowHeader(HttpHeaders.Authorization)\r\n    allowHeader(HttpHeaders.ContentType)\r\n    allowHeader(\"X-Custom-Header\")\r\n\r\n    // 허용할 도메인\r\n    allowHost(\"example.com\", schemes = listOf(\"https\"))\r\n    allowHost(\"*.example.com\")  // 서브도메인 와일드카드\r\n\r\n    // 모든 도메인 허용 (개발용)\r\n    anyHost()\r\n\r\n    // 자격 증명 허용\r\n    allowCredentials = true\r\n\r\n    // Preflight 캐시 시간\r\n    maxAgeInSeconds = 3600\r\n}\r\n```\r\n\r\n**주요 옵션:**\r\n| 옵션 | 설명 |\r\n|------|------|\r\n| `anyHost()` | 모든 도메인 허용 |\r\n| `allowHost()` | 특정 도메인 허용 |\r\n| `allowMethod()` | HTTP 메서드 허용 |\r\n| `allowHeader()` | 요청 헤더 허용 |\r\n| `exposeHeader()` | 응답 헤더 노출 |\r\n| `allowCredentials` | 쿠키/인증 허용 |\r\n\r\n**보안 주의사항:**\r\n- **`anyHost()` 사용 금지 (프로덕션)**: 개발 환경에서만 사용, 프로덕션에서는 명시적 도메인 지정\r\n- **`allowCredentials`와 `anyHost()` 조합 불가**: 브라우저가 거부함\r\n- **Preflight 캐싱**: `maxAgeInSeconds`를 적절히 설정하여 OPTIONS 요청 최소화\r\n\r\n```kotlin\r\n// 프로덕션 권장 설정\r\ninstall(CORS) {\r\n    allowHost(\"app.example.com\", schemes = listOf(\"https\"))\r\n    allowHost(\"admin.example.com\", schemes = listOf(\"https\"))\r\n    allowMethod(HttpMethod.Put)\r\n    allowMethod(HttpMethod.Delete)\r\n    allowHeader(HttpHeaders.Authorization)\r\n    allowCredentials = true\r\n    maxAgeInSeconds = 3600\r\n}\r\n```",
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
    "answer": "Ktor 2.0+에서는 `createApplicationPlugin` 함수로 커스텀 플러그인을 생성합니다.\r\n\r\n**기본 플러그인:**\r\n```kotlin\r\nval RequestLoggingPlugin = createApplicationPlugin(name = \"RequestLogging\") {\r\n    onCall { call ->\r\n        println(\"Request: ${call.request.uri}\")\r\n    }\r\n}\r\n\r\n// 설치\r\ninstall(RequestLoggingPlugin)\r\n```\r\n\r\n**설정 가능한 플러그인:**\r\n```kotlin\r\nclass CustomHeaderConfig {\r\n    var headerName: String = \"X-Custom\"\r\n    var headerValue: String = \"default\"\r\n}\r\n\r\nval CustomHeaderPlugin = createApplicationPlugin(\r\n    name = \"CustomHeader\",\r\n    createConfiguration = ::CustomHeaderConfig\r\n) {\r\n    val name = pluginConfig.headerName\r\n    val value = pluginConfig.headerValue\r\n\r\n    onCallRespond { call, _ ->\r\n        call.response.headers.append(name, value)\r\n    }\r\n}\r\n\r\n// 사용\r\ninstall(CustomHeaderPlugin) {\r\n    headerName = \"X-App-Version\"\r\n    headerValue = \"1.0.0\"\r\n}\r\n```\r\n\r\n**사용 가능한 핸들러:**\r\n- `onCall`: 요청 수신 시\r\n- `onCallReceive`: 요청 본문 수신 시\r\n- `onCallRespond`: 응답 전송 시",
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
    "answer": "**Authentication** 플러그인은 다양한 인증 방식을 제공합니다.\r\n\r\n```kotlin\r\ninstall(Authentication) {\r\n    // Basic 인증\r\n    basic(\"auth-basic\") {\r\n        realm = \"Access to API\"\r\n        validate { credentials ->\r\n            if (credentials.name == \"admin\" && credentials.password == \"secret\") {\r\n                UserIdPrincipal(credentials.name)\r\n            } else null\r\n        }\r\n    }\r\n\r\n    // Form 인증\r\n    form(\"auth-form\") {\r\n        userParamName = \"username\"\r\n        passwordParamName = \"password\"\r\n        validate { credentials ->\r\n            userService.authenticate(credentials.name, credentials.password)\r\n        }\r\n    }\r\n}\r\n\r\n// 인증된 라우트\r\nrouting {\r\n    authenticate(\"auth-basic\") {\r\n        get(\"/protected\") {\r\n            val principal = call.principal<UserIdPrincipal>()\r\n            call.respondText(\"Hello, ${principal?.name}\")\r\n        }\r\n    }\r\n}\r\n```\r\n\r\n**지원 인증 방식:**\r\n- `basic`: HTTP Basic Authentication\r\n- `digest`: HTTP Digest Authentication\r\n- `form`: 폼 기반 인증\r\n- `bearer`: Bearer 토큰 (JWT/OAuth)\r\n- `session`: 세션 기반 인증\r\n- `oauth`: OAuth 2.0",
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
    "answer": "**JWT (JSON Web Token)** 인증 구현 방법입니다.\r\n\r\n```kotlin\r\n// 의존성\r\nimplementation(\"io.ktor:ktor-server-auth-jwt:$ktor_version\")\r\n\r\n// JWT 설정\r\nval secret = environment.config.property(\"jwt.secret\").getString()\r\nval issuer = environment.config.property(\"jwt.issuer\").getString()\r\nval audience = environment.config.property(\"jwt.audience\").getString()\r\n\r\ninstall(Authentication) {\r\n    jwt(\"auth-jwt\") {\r\n        realm = \"ktor sample\"\r\n        verifier(\r\n            JWT.require(Algorithm.HMAC256(secret))\r\n                .withAudience(audience)\r\n                .withIssuer(issuer)\r\n                .build()\r\n        )\r\n        validate { credential ->\r\n            if (credential.payload.getClaim(\"username\").asString() != \"\") {\r\n                JWTPrincipal(credential.payload)\r\n            } else null\r\n        }\r\n        challenge { _, _ ->\r\n            call.respond(HttpStatusCode.Unauthorized, \"Token invalid or expired\")\r\n        }\r\n    }\r\n}\r\n\r\n// 토큰 생성\r\npost(\"/login\") {\r\n    val user = call.receive<LoginRequest>()\r\n    val token = JWT.create()\r\n        .withAudience(audience)\r\n        .withIssuer(issuer)\r\n        .withClaim(\"username\", user.username)\r\n        .withExpiresAt(Date(System.currentTimeMillis() + 3600000))\r\n        .sign(Algorithm.HMAC256(secret))\r\n    call.respond(hashMapOf(\"token\" to token))\r\n}\r\n\r\n// 보호된 라우트\r\nauthenticate(\"auth-jwt\") {\r\n    get(\"/me\") {\r\n        val principal = call.principal<JWTPrincipal>()\r\n        val username = principal!!.payload.getClaim(\"username\").asString()\r\n        call.respond(User(username))\r\n    }\r\n}\r\n```\r\n\r\n**보안 주의사항:**\r\n- **시크릿 관리**: JWT secret은 환경 변수로 관리하고, 충분히 긴 랜덤 문자열 사용 (최소 256비트)\r\n- **알고리즘 선택**: 프로덕션에서는 RS256 (비대칭 키) 권장\r\n- **만료 시간**: 액세스 토큰은 짧게 (15분~1시간), 리프레시 토큰으로 갱신\r\n- **클레임 검증**: audience, issuer 반드시 검증",
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
    "answer": "**Sessions** 플러그인으로 세션 기반 인증을 구현합니다.\r\n\r\n```kotlin\r\n// 세션 데이터 클래스\r\ndata class UserSession(val userId: String, val name: String)\r\n\r\n// 세션 설정\r\ninstall(Sessions) {\r\n    // 쿠키 기반 세션 (클라이언트 저장)\r\n    cookie<UserSession>(\"user_session\") {\r\n        cookie.path = \"/\"\r\n        cookie.maxAgeInSeconds = 3600\r\n        cookie.secure = true\r\n        cookie.httpOnly = true\r\n        transform(SessionTransportTransformerMessageAuthentication(secretKey))\r\n    }\r\n\r\n    // 서버 저장 세션 (ID만 쿠키에)\r\n    cookie<UserSession>(\"user_session\", SessionStorageMemory()) {\r\n        cookie.path = \"/\"\r\n    }\r\n}\r\n\r\n// 세션 인증 설정\r\ninstall(Authentication) {\r\n    session<UserSession>(\"auth-session\") {\r\n        validate { session ->\r\n            session  // UserSession이 Principal로 사용됨\r\n        }\r\n        challenge {\r\n            call.respondRedirect(\"/login\")\r\n        }\r\n    }\r\n}\r\n\r\n// 사용\r\npost(\"/login\") {\r\n    val user = authenticate(call.receive<LoginRequest>())\r\n    call.sessions.set(UserSession(user.id, user.name))\r\n    call.respondRedirect(\"/dashboard\")\r\n}\r\n\r\nauthenticate(\"auth-session\") {\r\n    get(\"/dashboard\") {\r\n        val session = call.sessions.get<UserSession>()\r\n        call.respondText(\"Welcome, ${session?.name}\")\r\n    }\r\n}\r\n\r\npost(\"/logout\") {\r\n    call.sessions.clear<UserSession>()\r\n    call.respondRedirect(\"/\")\r\n}\r\n```",
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
    "answer": "**OAuth 2.0** 인증 구현 방법입니다.\r\n\r\n```kotlin\r\n// 의존성\r\nimplementation(\"io.ktor:ktor-server-auth:$ktor_version\")\r\n\r\n// OAuth 설정\r\ninstall(Authentication) {\r\n    oauth(\"auth-oauth-google\") {\r\n        urlProvider = { \"http://localhost:8080/callback\" }\r\n        providerLookup = {\r\n            OAuthServerSettings.OAuth2ServerSettings(\r\n                name = \"google\",\r\n                authorizeUrl = \"https://accounts.google.com/o/oauth2/auth\",\r\n                accessTokenUrl = \"https://oauth2.googleapis.com/token\",\r\n                requestMethod = HttpMethod.Post,\r\n                clientId = System.getenv(\"GOOGLE_CLIENT_ID\"),\r\n                clientSecret = System.getenv(\"GOOGLE_CLIENT_SECRET\"),\r\n                defaultScopes = listOf(\"openid\", \"profile\", \"email\")\r\n            )\r\n        }\r\n        client = HttpClient(CIO)\r\n    }\r\n}\r\n\r\n// 라우팅\r\nrouting {\r\n    authenticate(\"auth-oauth-google\") {\r\n        get(\"/login\") {\r\n            // 자동으로 Google 로그인 페이지로 리다이렉트\r\n        }\r\n\r\n        get(\"/callback\") {\r\n            val principal = call.principal<OAuthAccessTokenResponse.OAuth2>()\r\n            val accessToken = principal?.accessToken\r\n\r\n            // 액세스 토큰으로 사용자 정보 조회\r\n            val userInfo = httpClient.get(\"https://www.googleapis.com/oauth2/v2/userinfo\") {\r\n                header(\"Authorization\", \"Bearer $accessToken\")\r\n            }.body<GoogleUserInfo>()\r\n\r\n            // 세션 저장\r\n            call.sessions.set(UserSession(userInfo.id, userInfo.email))\r\n            call.respondRedirect(\"/\")\r\n        }\r\n    }\r\n}\r\n```",
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
    "answer": "**HTTPS/SSL 설정 방법:**\r\n\r\n**1. application.conf 사용:**\r\n```hocon\r\nktor {\r\n    deployment {\r\n        port = 8080\r\n        sslPort = 8443\r\n    }\r\n    security {\r\n        ssl {\r\n            keyStore = keystore.jks\r\n            keyAlias = sampleAlias\r\n            keyStorePassword = password\r\n            privateKeyPassword = password\r\n        }\r\n    }\r\n}\r\n```\r\n\r\n**2. embeddedServer 코드에서 설정:**\r\n```kotlin\r\nfun main() {\r\n    val keyStore = buildKeyStore {\r\n        certificate(\"sampleAlias\") {\r\n            password = \"password\"\r\n            domains = listOf(\"127.0.0.1\", \"localhost\")\r\n        }\r\n    }\r\n\r\n    val environment = applicationEngineEnvironment {\r\n        connector { port = 8080 }\r\n        sslConnector(\r\n            keyStore = keyStore,\r\n            keyAlias = \"sampleAlias\",\r\n            keyStorePassword = { \"password\".toCharArray() },\r\n            privateKeyPassword = { \"password\".toCharArray() }\r\n        ) {\r\n            port = 8443\r\n        }\r\n        module(Application::module)\r\n    }\r\n\r\n    embeddedServer(Netty, environment).start(wait = true)\r\n}\r\n```\r\n\r\n**3. HTTPS 리다이렉트:**\r\n```kotlin\r\ninstall(HttpsRedirect) {\r\n    sslPort = 8443\r\n    permanentRedirect = true\r\n}\r\n```\r\n\r\n**인증서 생성 (keytool - 개발용):**\r\n```bash\r\nkeytool -keystore keystore.jks -alias sampleAlias \\\r\n  -genkeypair -keyalg RSA -keysize 4096 -validity 365\r\n```\r\n\r\n**프로덕션 권장사항:**\r\n- **리버스 프록시 사용**: Nginx, Traefik 등에서 SSL 종료 후 Ktor는 HTTP로 처리\r\n- **Let's Encrypt**: 무료 인증서 자동 갱신\r\n- **직접 SSL 처리 시**: Netty 엔진 권장 (CIO보다 SSL 성능 우수)\r\n\r\n```nginx\r\n# Nginx 리버스 프록시 예시\r\nserver {\r\n    listen 443 ssl;\r\n    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;\r\n    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;\r\n\r\n    location / {\r\n        proxy_pass http://localhost:8080;\r\n    }\r\n}\r\n```",
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
    "answer": "**Ktor Client**는 Kotlin으로 작성된 멀티플랫폼 비동기 HTTP 클라이언트입니다.\r\n\r\n**사용 상황:**\r\n- 외부 API 호출 (REST, GraphQL)\r\n- 마이크로서비스 간 통신\r\n- 웹 스크래핑\r\n- 파일 다운로드/업로드\r\n- WebSocket 클라이언트\r\n\r\n```kotlin\r\n// 클라이언트 생성\r\nval client = HttpClient(CIO) {\r\n    install(ContentNegotiation) {\r\n        json()\r\n    }\r\n    install(Logging) {\r\n        level = LogLevel.INFO\r\n    }\r\n}\r\n\r\n// 사용\r\nsuspend fun getUser(id: Int): User {\r\n    return client.get(\"https://api.example.com/users/$id\").body()\r\n}\r\n\r\nsuspend fun createUser(user: User): User {\r\n    return client.post(\"https://api.example.com/users\") {\r\n        contentType(ContentType.Application.Json)\r\n        setBody(user)\r\n    }.body()\r\n}\r\n\r\n// 리소스 해제\r\nclient.close()\r\n```\r\n\r\n**멀티플랫폼 지원:**\r\n- JVM, Android, iOS, JavaScript, Native",
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
    "answer": "**다양한 HTTP 요청 방법:**\r\n\r\n```kotlin\r\nval client = HttpClient(CIO) {\r\n    install(ContentNegotiation) { json() }\r\n}\r\n\r\n// GET 요청\r\nval response: HttpResponse = client.get(\"https://api.example.com/users\")\r\nval users: List<User> = response.body()\r\n\r\n// POST 요청 (JSON)\r\nval newUser = client.post(\"https://api.example.com/users\") {\r\n    contentType(ContentType.Application.Json)\r\n    setBody(User(\"John\", \"john@example.com\"))\r\n}.body<User>()\r\n\r\n// PUT 요청\r\nclient.put(\"https://api.example.com/users/1\") {\r\n    setBody(User(\"Updated\", \"updated@example.com\"))\r\n}\r\n\r\n// DELETE 요청\r\nclient.delete(\"https://api.example.com/users/1\")\r\n\r\n// 헤더 설정\r\nclient.get(\"https://api.example.com/protected\") {\r\n    header(\"Authorization\", \"Bearer $token\")\r\n    header(\"Accept\", \"application/json\")\r\n}\r\n\r\n// Query Parameters\r\nclient.get(\"https://api.example.com/search\") {\r\n    url {\r\n        parameters.append(\"q\", \"kotlin\")\r\n        parameters.append(\"page\", \"1\")\r\n    }\r\n}\r\n\r\n// Form 데이터\r\nclient.submitForm(\r\n    url = \"https://api.example.com/login\",\r\n    formParameters = parameters {\r\n        append(\"username\", \"admin\")\r\n        append(\"password\", \"secret\")\r\n    }\r\n)\r\n```",
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
    "answer": "**Engine**은 실제 HTTP 통신을 처리하는 플랫폼별 구현체입니다.\r\n\r\n**주요 엔진:**\r\n\r\n| 엔진 | 플랫폼 | 특징 |\r\n|------|--------|------|\r\n| **CIO** | JVM, Native | 순수 Kotlin/Coroutine 기반, 경량, HTTP/1.1만 지원 |\r\n| **OkHttp** | JVM, Android | Android 권장, HTTP/2, 연결 풀링, 인터셉터 |\r\n| **Apache** | JVM | 풍부한 설정, 프록시 지원, 기업용 |\r\n| **Java** | JVM 11+ | java.net.http 사용, HTTP/2 지원 |\r\n| **Jetty** | JVM | HTTP/2 지원, WebSocket |\r\n| **Darwin** | iOS, macOS | Apple 네이티브 URLSession 기반 |\r\n| **WinHttp** | Windows Native | Windows 네이티브 API |\r\n| **Curl** | Linux Native | libcurl 사용, 폭넓은 프로토콜 지원 |\r\n| **Js** | JavaScript | 브라우저 fetch API 또는 Node.js |\r\n\r\n**엔진 선택 가이드:**\r\n- **JVM 서버**: CIO (경량) 또는 OkHttp (기능 풍부)\r\n- **Android**: OkHttp (최적화됨)\r\n- **iOS**: Darwin (네이티브 성능)\r\n- **HTTP/2 필요 시**: OkHttp, Java, Jetty (CIO는 미지원)\r\n\r\n```kotlin\r\n// CIO 엔진\r\nval client = HttpClient(CIO) {\r\n    engine {\r\n        maxConnectionsCount = 1000\r\n        endpoint {\r\n            connectTimeout = 5000\r\n            requestTimeout = 15000\r\n        }\r\n    }\r\n}\r\n\r\n// OkHttp 엔진\r\nval client = HttpClient(OkHttp) {\r\n    engine {\r\n        config {\r\n            connectTimeout(10, TimeUnit.SECONDS)\r\n            readTimeout(10, TimeUnit.SECONDS)\r\n        }\r\n    }\r\n}\r\n\r\n// 자동 엔진 선택 (의존성 기반)\r\nval client = HttpClient()\r\n```",
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
    "answer": "**인터셉터 설정 방법:**\r\n\r\n**1. HttpSend 플러그인 사용:**\r\n```kotlin\r\nval client = HttpClient(CIO) {\r\n    install(HttpSend) {\r\n        intercept { request ->\r\n            // 요청 전 처리\r\n            println(\"Sending: ${request.url}\")\r\n\r\n            val response = execute(request)\r\n\r\n            // 응답 후 처리\r\n            println(\"Received: ${response.response.status}\")\r\n\r\n            // 재시도 로직\r\n            if (response.response.status == HttpStatusCode.Unauthorized) {\r\n                refreshToken()\r\n                request.headers[\"Authorization\"] = \"Bearer $newToken\"\r\n                execute(request)\r\n            } else {\r\n                response\r\n            }\r\n        }\r\n    }\r\n}\r\n```\r\n\r\n**2. 커스텀 플러그인:**\r\n```kotlin\r\nval LoggingPlugin = createClientPlugin(\"Logging\") {\r\n    onRequest { request, _ ->\r\n        println(\"Request: ${request.method} ${request.url}\")\r\n    }\r\n    onResponse { response ->\r\n        println(\"Response: ${response.status}\")\r\n    }\r\n}\r\n\r\nval client = HttpClient(CIO) {\r\n    install(LoggingPlugin)\r\n}\r\n```\r\n\r\n**3. 기본 헤더 설정:**\r\n```kotlin\r\nval client = HttpClient(CIO) {\r\n    defaultRequest {\r\n        header(\"X-Api-Key\", \"my-api-key\")\r\n        header(\"User-Agent\", \"MyApp/1.0\")\r\n    }\r\n}\r\n```",
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
    "answer": "Ktor는 `ktor-server-test-host` 모듈로 테스트 기능을 제공합니다.\r\n\r\n```kotlin\r\n// 의존성\r\ntestImplementation(\"io.ktor:ktor-server-test-host:$ktor_version\")\r\ntestImplementation(\"io.ktor:ktor-client-content-negotiation:$ktor_version\")\r\n\r\n// 기본 테스트\r\nclass ApplicationTest {\r\n    @Test\r\n    fun testRoot() = testApplication {\r\n        // 모듈 로드\r\n        application {\r\n            configureRouting()\r\n            configureSerialization()\r\n        }\r\n\r\n        // 요청 및 검증\r\n        client.get(\"/\").apply {\r\n            assertEquals(HttpStatusCode.OK, status)\r\n            assertEquals(\"Hello, World!\", bodyAsText())\r\n        }\r\n    }\r\n\r\n    @Test\r\n    fun testJsonEndpoint() = testApplication {\r\n        application { module() }\r\n\r\n        val client = createClient {\r\n            install(ContentNegotiation) { json() }\r\n        }\r\n\r\n        val response = client.post(\"/users\") {\r\n            contentType(ContentType.Application.Json)\r\n            setBody(User(\"John\", \"john@test.com\"))\r\n        }\r\n\r\n        assertEquals(HttpStatusCode.Created, response.status)\r\n    }\r\n}\r\n```\r\n\r\n**테스트 특징:**\r\n- 실제 서버 없이 인메모리 테스트\r\n- 빠른 실행 속도\r\n- HTTP 클라이언트로 요청/응답 검증",
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
    "answer": "`testApplication`은 Ktor 2.0+에서 제공하는 통합 테스트 DSL입니다.\r\n\r\n```kotlin\r\nclass IntegrationTest {\r\n    @Test\r\n    fun `사용자 CRUD 통합 테스트`() = testApplication {\r\n        // 애플리케이션 설정\r\n        application {\r\n            install(ContentNegotiation) { json() }\r\n            configureRouting()\r\n        }\r\n\r\n        // JSON 지원 클라이언트 생성\r\n        val client = createClient {\r\n            install(ContentNegotiation) { json() }\r\n        }\r\n\r\n        // CREATE\r\n        val createResponse = client.post(\"/users\") {\r\n            contentType(ContentType.Application.Json)\r\n            setBody(CreateUserRequest(\"John\", \"john@test.com\"))\r\n        }\r\n        assertEquals(HttpStatusCode.Created, createResponse.status)\r\n        val user = createResponse.body<User>()\r\n\r\n        // READ\r\n        val getResponse = client.get(\"/users/${user.id}\")\r\n        assertEquals(HttpStatusCode.OK, getResponse.status)\r\n\r\n        // UPDATE\r\n        val updateResponse = client.put(\"/users/${user.id}\") {\r\n            contentType(ContentType.Application.Json)\r\n            setBody(UpdateUserRequest(\"Updated\"))\r\n        }\r\n        assertEquals(HttpStatusCode.OK, updateResponse.status)\r\n\r\n        // DELETE\r\n        val deleteResponse = client.delete(\"/users/${user.id}\")\r\n        assertEquals(HttpStatusCode.NoContent, deleteResponse.status)\r\n    }\r\n\r\n    @Test\r\n    fun `인증이 필요한 엔드포인트 테스트`() = testApplication {\r\n        application { module() }\r\n\r\n        // 인증 없이 접근\r\n        val unauthorized = client.get(\"/protected\")\r\n        assertEquals(HttpStatusCode.Unauthorized, unauthorized.status)\r\n\r\n        // 인증 후 접근\r\n        val authorized = client.get(\"/protected\") {\r\n            header(\"Authorization\", \"Bearer valid-token\")\r\n        }\r\n        assertEquals(HttpStatusCode.OK, authorized.status)\r\n    }\r\n}\r\n```",
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
    "answer": "**클라이언트 MockEngine 사용:**\r\n```kotlin\r\n@Test\r\nfun `외부 API 호출 Mock 테스트`() = runTest {\r\n    val mockEngine = MockEngine { request ->\r\n        when (request.url.encodedPath) {\r\n            \"/users/1\" -> respond(\r\n                content = \"\"\"{\"id\": 1, \"name\": \"John\"}\"\"\",\r\n                status = HttpStatusCode.OK,\r\n                headers = headersOf(\"Content-Type\", \"application/json\")\r\n            )\r\n            else -> respond(\"Not Found\", HttpStatusCode.NotFound)\r\n        }\r\n    }\r\n\r\n    val client = HttpClient(mockEngine) {\r\n        install(ContentNegotiation) { json() }\r\n    }\r\n\r\n    val user = client.get(\"/users/1\").body<User>()\r\n    assertEquals(\"John\", user.name)\r\n}\r\n```\r\n\r\n**서비스 계층 Mock (Mockk 사용):**\r\n```kotlin\r\nclass UserRouteTest {\r\n    private val userService = mockk<UserService>()\r\n\r\n    @Test\r\n    fun `사용자 조회 테스트`() = testApplication {\r\n        application {\r\n            install(ContentNegotiation) { json() }\r\n            routing {\r\n                userRoutes(userService)\r\n            }\r\n        }\r\n\r\n        // Mock 설정\r\n        coEvery { userService.findById(1) } returns User(1, \"John\")\r\n\r\n        val response = client.get(\"/users/1\")\r\n\r\n        assertEquals(HttpStatusCode.OK, response.status)\r\n        coVerify { userService.findById(1) }\r\n    }\r\n}\r\n```\r\n\r\n**의존성:**\r\n```kotlin\r\ntestImplementation(\"io.mockk:mockk:$mockk_version\")\r\n```",
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
    "answer": "**1. Fat JAR 배포:**\r\n```kotlin\r\n// build.gradle.kts\r\nplugins {\r\n    id(\"io.ktor.plugin\") version \"2.x.x\"\r\n}\r\n\r\nktor {\r\n    fatJar {\r\n        archiveFileName.set(\"app.jar\")\r\n    }\r\n}\r\n```\r\n\r\n```bash\r\n# 빌드\r\n./gradlew buildFatJar\r\n\r\n# 실행\r\njava -jar build/libs/app.jar\r\n```\r\n\r\n**2. Docker 배포:**\r\n```dockerfile\r\n# Dockerfile\r\nFROM gradle:8-jdk17 AS build\r\nCOPY --chown=gradle:gradle . /home/gradle/src\r\nWORKDIR /home/gradle/src\r\nRUN gradle buildFatJar --no-daemon\r\n\r\nFROM eclipse-temurin:17-jre\r\nEXPOSE 8080\r\nCOPY --from=build /home/gradle/src/build/libs/*.jar /app/app.jar\r\nENTRYPOINT [\"java\", \"-jar\", \"/app/app.jar\"]\r\n```\r\n\r\n```bash\r\n# 빌드 및 실행\r\ndocker build -t my-ktor-app .\r\ndocker run -p 8080:8080 my-ktor-app\r\n```\r\n\r\n**3. Docker Compose:**\r\n```yaml\r\nversion: '3.8'\r\nservices:\r\n  app:\r\n    build: .\r\n    ports:\r\n      - \"8080:8080\"\r\n    environment:\r\n      - JDBC_URL=jdbc:postgresql://db:5432/mydb\r\n  db:\r\n    image: postgres:15\r\n```",
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
    "answer": "**HOCON 형식 (application.conf):**\r\n```hocon\r\nktor {\r\n    deployment {\r\n        port = 8080\r\n        port = ${?PORT}  # 환경변수로 오버라이드\r\n    }\r\n    application {\r\n        modules = [ com.example.ApplicationKt.module ]\r\n    }\r\n}\r\n\r\ndatabase {\r\n    url = \"jdbc:postgresql://localhost:5432/mydb\"\r\n    url = ${?DATABASE_URL}\r\n    driver = \"org.postgresql.Driver\"\r\n    user = ${DATABASE_USER}\r\n    password = ${DATABASE_PASSWORD}\r\n}\r\n\r\njwt {\r\n    secret = ${JWT_SECRET}\r\n    issuer = \"http://localhost:8080\"\r\n    audience = \"http://localhost:8080/api\"\r\n}\r\n```\r\n\r\n**YAML 형식 (application.yaml):**\r\n```yaml\r\nktor:\r\n  deployment:\r\n    port: 8080\r\n    port: $PORT\r\n\r\ndatabase:\r\n  url: ${DATABASE_URL}\r\n```\r\n\r\n**코드에서 설정 읽기:**\r\n```kotlin\r\nfun Application.module() {\r\n    val dbUrl = environment.config.property(\"database.url\").getString()\r\n    val jwtSecret = environment.config.property(\"jwt.secret\").getString()\r\n}\r\n```\r\n\r\n**커맨드라인 오버라이드:**\r\n```bash\r\njava -jar app.jar -config=production.conf\r\njava -jar app.jar -port=9090\r\n```",
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
    "answer": "**CallLogging 플러그인:**\r\n```kotlin\r\ninstall(CallLogging) {\r\n    level = Level.INFO\r\n\r\n    // 로그 형식 커스터마이징\r\n    format { call ->\r\n        val status = call.response.status()\r\n        val method = call.request.httpMethod.value\r\n        val uri = call.request.uri\r\n        \"$status: $method $uri\"\r\n    }\r\n\r\n    // 특정 경로 필터링\r\n    filter { call -> call.request.path().startsWith(\"/api\") }\r\n\r\n    // MDC 설정 (Mapped Diagnostic Context)\r\n    mdc(\"requestId\") { call -> call.request.header(\"X-Request-ID\") }\r\n}\r\n```\r\n\r\n**logback.xml 설정:**\r\n```xml\r\n<configuration>\r\n    <appender name=\"STDOUT\" class=\"ch.qos.logback.core.ConsoleAppender\">\r\n        <encoder>\r\n            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>\r\n        </encoder>\r\n    </appender>\r\n\r\n    <root level=\"INFO\">\r\n        <appender-ref ref=\"STDOUT\" />\r\n    </root>\r\n\r\n    <logger name=\"io.ktor\" level=\"DEBUG\" />\r\n</configuration>\r\n```\r\n\r\n**코드에서 로깅:**\r\n```kotlin\r\nimport io.ktor.server.application.*\r\n\r\nfun Application.module() {\r\n    log.info(\"Application starting...\")\r\n\r\n    routing {\r\n        get(\"/\") {\r\n            application.log.debug(\"Handling request\")\r\n        }\r\n    }\r\n}\r\n```",
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
    "answer": "**MicrometerMetrics 플러그인:**\r\n```kotlin\r\n// 의존성\r\nimplementation(\"io.ktor:ktor-server-metrics-micrometer:$ktor_version\")\r\nimplementation(\"io.micrometer:micrometer-registry-prometheus:$micrometer_version\")\r\n\r\n// 설정\r\nval prometheusMeterRegistry = PrometheusMeterRegistry(PrometheusConfig.DEFAULT)\r\n\r\ninstall(MicrometerMetrics) {\r\n    registry = prometheusMeterRegistry\r\n\r\n    // 분포 통계 설정\r\n    distributionStatisticConfig = DistributionStatisticConfig.Builder()\r\n        .percentilesHistogram(true)\r\n        .percentiles(0.5, 0.9, 0.95, 0.99)\r\n        .build()\r\n\r\n    // JVM 메트릭\r\n    meterBinders = listOf(\r\n        JvmMemoryMetrics(),\r\n        JvmGcMetrics(),\r\n        ProcessorMetrics()\r\n    )\r\n}\r\n\r\n// Prometheus 엔드포인트\r\nrouting {\r\n    get(\"/metrics\") {\r\n        call.respond(prometheusMeterRegistry.scrape())\r\n    }\r\n}\r\n```\r\n\r\n**제공되는 메트릭:**\r\n- `ktor.http.server.requests`: 요청 타이머\r\n- `ktor.http.server.requests.active`: 활성 요청 수\r\n- JVM 메모리, GC, CPU 메트릭\r\n\r\n**DropwizardMetrics (대안):**\r\n```kotlin\r\ninstall(DropwizardMetrics) {\r\n    registry = metricRegistry\r\n}\r\n```",
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
    "answer": "**WebSocket 서버 구현:**\r\n```kotlin\r\n// 의존성\r\nimplementation(\"io.ktor:ktor-server-websockets:$ktor_version\")\r\n\r\n// 설정\r\ninstall(WebSockets) {\r\n    pingPeriod = Duration.ofSeconds(15)\r\n    timeout = Duration.ofSeconds(15)\r\n    maxFrameSize = Long.MAX_VALUE\r\n    masking = false\r\n}\r\n\r\n// 라우팅\r\nrouting {\r\n    webSocket(\"/chat\") {\r\n        // 연결 시\r\n        send(\"Connected to chat!\")\r\n\r\n        // 메시지 수신\r\n        for (frame in incoming) {\r\n            when (frame) {\r\n                is Frame.Text -> {\r\n                    val text = frame.readText()\r\n                    outgoing.send(Frame.Text(\"Echo: $text\"))\r\n                }\r\n                is Frame.Binary -> {\r\n                    val bytes = frame.readBytes()\r\n                }\r\n                else -> {}\r\n            }\r\n        }\r\n    }\r\n}\r\n```\r\n\r\n**브로드캐스트 채팅 예시:**\r\n```kotlin\r\nval connections = Collections.synchronizedSet<DefaultWebSocketServerSession>(LinkedHashSet())\r\n\r\nwebSocket(\"/chat\") {\r\n    connections += this\r\n    try {\r\n        for (frame in incoming) {\r\n            if (frame is Frame.Text) {\r\n                val message = frame.readText()\r\n                // 동시 전송 시 coroutineScope 활용\r\n                coroutineScope {\r\n                    connections.forEach { session ->\r\n                        launch {\r\n                            try {\r\n                                session.send(message)\r\n                            } catch (e: Exception) {\r\n                                // 연결 끊긴 세션 처리\r\n                            }\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    } finally {\r\n        connections -= this\r\n    }\r\n}\r\n```\r\n\r\n**WebSocket vs SSE 선택 기준:**\r\n| 항목 | WebSocket | SSE |\r\n|------|-----------|-----|\r\n| 방향 | 양방향 | 서버 → 클라이언트 |\r\n| 프로토콜 | ws:// / wss:// | HTTP |\r\n| 재연결 | 직접 구현 | 브라우저 자동 |\r\n| 바이너리 | 지원 | 텍스트만 |\r\n| 사용 사례 | 채팅, 게임 | 알림, 피드 |",
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
    "answer": "**SSE 서버 구현:**\r\n\r\n> **참고**: SSE 플러그인은 Ktor 3.0+에서 공식 지원됩니다. Ktor 2.x에서는 수동으로 구현해야 합니다.\r\n\r\n```kotlin\r\n// 의존성 (Ktor 3.0+)\r\nimplementation(\"io.ktor:ktor-server-sse:$ktor_version\")\r\n\r\n// 설정\r\ninstall(SSE)\r\n\r\n// 라우팅\r\nrouting {\r\n    sse(\"/events\") {\r\n        // 단일 이벤트 전송\r\n        send(ServerSentEvent(data = \"Hello SSE\"))\r\n\r\n        // 여러 이벤트 전송\r\n        repeat(10) { i ->\r\n            send(ServerSentEvent(\r\n                data = \"Event $i\",\r\n                event = \"message\",\r\n                id = i.toString()\r\n            ))\r\n            delay(1000)\r\n        }\r\n    }\r\n\r\n    // Heartbeat 설정\r\n    sse(\"/stream\") {\r\n        heartbeat {\r\n            period = Duration.ofSeconds(30)\r\n            event = ServerSentEvent(comment = \"keep-alive\")\r\n        }\r\n\r\n        // 실시간 데이터 스트림\r\n        dataFlow.collect { data ->\r\n            send(ServerSentEvent(data = data))\r\n        }\r\n    }\r\n}\r\n```\r\n\r\n**클라이언트 (JavaScript):**\r\n```javascript\r\nconst eventSource = new EventSource('/events');\r\neventSource.onmessage = (event) => {\r\n    console.log(event.data);\r\n};\r\n```\r\n\r\n**SSE vs WebSocket:**\r\n- SSE: 서버 -> 클라이언트 단방향, HTTP 기반\r\n- WebSocket: 양방향, 별도 프로토콜",
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
    "answer": "**파일 업로드:**\r\n```kotlin\r\n// Multipart 업로드\r\npost(\"/upload\") {\r\n    val multipart = call.receiveMultipart()\r\n    var fileName = \"\"\r\n\r\n    multipart.forEachPart { part ->\r\n        when (part) {\r\n            is PartData.FileItem -> {\r\n                fileName = part.originalFileName ?: \"unknown\"\r\n                val file = File(\"uploads/$fileName\")\r\n                part.provider().copyAndClose(file.writeChannel())\r\n            }\r\n            is PartData.FormItem -> {\r\n                val value = part.value\r\n            }\r\n            else -> {}\r\n        }\r\n        part.dispose()\r\n    }\r\n\r\n    call.respondText(\"Uploaded: $fileName\")\r\n}\r\n\r\n// Raw 바이트 업로드\r\npost(\"/upload/raw\") {\r\n    val file = File(\"uploads/uploaded_file\")\r\n    call.receiveChannel().copyAndClose(file.writeChannel())\r\n    call.respond(HttpStatusCode.OK)\r\n}\r\n```\r\n\r\n**파일 다운로드:**\r\n```kotlin\r\n// 단일 파일 다운로드\r\nget(\"/download/{name}\") {\r\n    val fileName = call.parameters[\"name\"]!!\r\n    val file = File(\"files/$fileName\")\r\n\r\n    if (file.exists()) {\r\n        call.response.header(\r\n            HttpHeaders.ContentDisposition,\r\n            ContentDisposition.Attachment.withParameter(\r\n                ContentDisposition.Parameters.FileName, fileName\r\n            ).toString()\r\n        )\r\n        call.respondFile(file)\r\n    } else {\r\n        call.respond(HttpStatusCode.NotFound)\r\n    }\r\n}\r\n\r\n// 정적 파일 서빙\r\nrouting {\r\n    staticFiles(\"/static\", File(\"public\"))\r\n    staticResources(\"/resources\", \"static\")\r\n}\r\n```",
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
    "answer": "**1. Koin 사용:**\r\n```kotlin\r\n// 의존성\r\nimplementation(\"io.insert-koin:koin-ktor:$koin_version\")\r\n\r\n// 모듈 정의\r\nval appModule = module {\r\n    single<UserRepository> { UserRepositoryImpl() }\r\n    single { UserService(get()) }\r\n}\r\n\r\n// Ktor에 설치\r\nfun Application.module() {\r\n    install(Koin) {\r\n        modules(appModule)\r\n    }\r\n\r\n    routing {\r\n        val userService by inject<UserService>()\r\n\r\n        get(\"/users\") {\r\n            call.respond(userService.findAll())\r\n        }\r\n    }\r\n}\r\n```\r\n\r\n**2. Kodein 사용:**\r\n```kotlin\r\n// 의존성\r\nimplementation(\"org.kodein.di:kodein-di-framework-ktor-server-jvm:$kodein_version\")\r\n\r\n// 모듈 정의\r\nfun Application.module() {\r\n    di {\r\n        bind<UserRepository>() with singleton { UserRepositoryImpl() }\r\n        bind<UserService>() with singleton { UserService(instance()) }\r\n    }\r\n\r\n    routing {\r\n        get(\"/users\") {\r\n            val userService by closestDI().instance<UserService>()\r\n            call.respond(userService.findAll())\r\n        }\r\n    }\r\n}\r\n```\r\n\r\n> **참고**: Ktor는 공식 내장 DI를 제공하지 않습니다. Koin, Kodein 등 외부 라이브러리를 사용하거나 수동 DI를 구현해야 합니다.\r\n\r\n**3. 수동 DI (권장 - 간단한 경우):**\r\n```kotlin\r\nfun Application.module() {\r\n    val userRepository = UserRepositoryImpl()\r\n    val userService = UserService(userRepository)\r\n\r\n    configureRouting(userService)\r\n}\r\n\r\nfun Application.configureRouting(userService: UserService) {\r\n    routing {\r\n        get(\"/users\") { call.respond(userService.findAll()) }\r\n    }\r\n}\r\n```",
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
    "answer": "| 항목 | Ktor | Spring Boot |\r\n|------|------|-------------|\r\n| **언어** | Kotlin 네이티브 | Java/Kotlin |\r\n| **아키텍처** | 경량, 모듈식 | 풀스택, 컨벤션 기반 |\r\n| **비동기** | Coroutine 기본 | WebFlux 별도 |\r\n| **시작 시간** | 매우 빠름 | 상대적으로 느림 |\r\n| **메모리** | 낮음 | 높음 |\r\n| **학습 곡선** | 낮음 | 높음 |\r\n| **생태계** | 성장 중 | 매우 풍부 |\r\n| **DI** | 외부 라이브러리 | 내장 IoC |\r\n| **문서/커뮤니티** | 적음 | 풍부함 |\r\n\r\n**Ktor 장점:**\r\n- Kotlin DSL로 간결한 코드\r\n- 빠른 시작 시간 (수십 ms vs Spring의 수 초)과 낮은 메모리\r\n- 필요한 기능만 선택적 추가 (작은 배포 크기)\r\n- Coroutine 자연스러운 통합 (suspend 함수가 기본)\r\n- 서버리스/컨테이너 환경에서 빠른 콜드 스타트\r\n\r\n**Spring Boot 장점:**\r\n- 풍부한 생태계와 서드파티 (Spring Data, Security, Cloud 등)\r\n- 엔터프라이즈 검증된 안정성과 레퍼런스\r\n- 방대한 문서, 커뮤니티, Stack Overflow 답변\r\n- 다양한 통합 기능 내장 (AOP, 트랜잭션 관리 등)\r\n- 채용 시장에서 높은 수요\r\n\r\n**Ktor 단점:**\r\n- 작은 생태계: ORM은 Exposed 정도, 트랜잭션 관리 직접 구현\r\n- 기업 채용 시장에서 낮은 수요\r\n- 복잡한 기능(분산 트랜잭션, 고급 보안)은 직접 구현 필요\r\n- 레거시 Java 라이브러리 통합 시 추가 작업\r\n\r\n**Spring Boot 단점:**\r\n- 무거운 초기 설정과 긴 시작 시간\r\n- 복잡한 학습 곡선 (의존성 주입, AOP 등 이해 필요)\r\n- 마법 같은 자동 설정으로 디버깅 어려움\r\n- 메모리 오버헤드가 큼 (최소 256MB+ 권장)\r\n\r\n**실제 사용 사례:**\r\n- **Ktor**: JetBrains 내부 서비스, Kotlin 기반 스타트업, BFF 서버\r\n- **Spring**: 금융권, 대기업 백엔드, 레거시 시스템 연동",
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
    "answer": "**Ktor를 선택해야 하는 상황:**\r\n\r\n1. **마이크로서비스**: 경량 프레임워크로 빠른 시작(~50ms)과 낮은 메모리(~50MB)\r\n2. **Kotlin 전용 프로젝트**: Kotlin DSL, Coroutine, 멀티플랫폼 이점 최대화\r\n3. **비동기 I/O 중심**: 외부 API 호출, 데이터베이스 비동기 처리\r\n4. **빠른 프로토타이핑**: 최소한의 보일러플레이트로 빠른 개발\r\n5. **서버리스/컨테이너**: 작은 배포 크기(~10MB JAR), 빠른 콜드 스타트\r\n6. **멀티플랫폼 HTTP 클라이언트**: iOS, JS, Native에서도 동일한 Ktor Client 사용\r\n\r\n**Ktor를 피해야 하는 상황:**\r\n\r\n1. **엔터프라이즈 레거시 통합**: LDAP, SAML, 기존 Java EE 시스템 연동 시 Spring이 유리\r\n2. **대규모 팀 (10명+)**: Spring의 컨벤션과 표준화된 구조가 협업에 유리\r\n3. **복잡한 데이터 레이어**: JPA/Hibernate, 분산 트랜잭션 필요 시\r\n4. **고급 보안 요구**: OAuth2 Resource Server, 메서드 레벨 보안 등 Spring Security 수준\r\n5. **Java 개발자 위주 팀**: Kotlin + Coroutine 학습 비용 고려\r\n6. **검증된 솔루션 필요**: 규제 산업(금융, 의료)에서 레퍼런스 중요\r\n\r\n**권장 사용 사례:**\r\n- REST/GraphQL API 서버\r\n- 실시간 통신 (WebSocket, SSE)\r\n- BFF (Backend for Frontend)\r\n- 내부 마이크로서비스\r\n- CLI 도구의 HTTP 클라이언트\r\n\r\n**함정 질문 대비:**\r\n> \"Ktor가 Spring보다 항상 빠른가요?\"\r\n> - 시작 시간과 메모리는 Ktor가 유리하지만, 런타임 성능(처리량, 지연시간)은 워크로드에 따라 다름\r\n> - Spring WebFlux도 비동기 처리 가능하며, JIT 최적화 후 성능 차이 미미할 수 있음",
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
    "answer": "**Ktor 성능 특성:**\r\n\r\n1. **Coroutine 기반**: 스레드 블로킹 없는 비동기 처리\r\n2. **경량 런타임**: 최소한의 오버헤드\r\n3. **CIO 엔진**: 순수 Kotlin으로 구현된 경량 엔진\r\n\r\n**최적화 방법:**\r\n\r\n**1. 엔진 선택:**\r\n```kotlin\r\n// 프로덕션: Netty (안정성, HTTP/2), CIO (경량, 순수 Kotlin)\r\nembeddedServer(Netty, port = 8080) { }\r\n```\r\n\r\n**엔진별 특성:**\r\n| 엔진 | 장점 | 단점 | 권장 상황 |\r\n|------|------|------|----------|\r\n| **Netty** | 검증된 안정성, HTTP/2, 풍부한 기능 | 무거움, 외부 의존성 | 프로덕션, 대규모 트래픽 |\r\n| **CIO** | 순수 Kotlin, 경량, 빠른 시작 | HTTP/2 미지원 (2.x 기준) | 마이크로서비스, 서버리스 |\r\n| **Jetty** | HTTP/2, Servlet 호환 | 무거움 | 기존 Jetty 인프라 연동 |\r\n\r\n> **주의**: 성능은 워크로드에 따라 다릅니다. I/O 바운드 작업에서는 CIO가, CPU 바운드나 대규모 동시 연결에서는 Netty가 유리할 수 있습니다.\r\n\r\n**2. 연결 풀 설정:**\r\n```kotlin\r\nval client = HttpClient(CIO) {\r\n    engine {\r\n        maxConnectionsCount = 1000\r\n        endpoint {\r\n            maxConnectionsPerRoute = 100\r\n            pipelineMaxSize = 20\r\n            keepAliveTime = 5000\r\n            connectTimeout = 5000\r\n        }\r\n    }\r\n}\r\n```\r\n\r\n**3. 직렬화 최적화:**\r\n```kotlin\r\ninstall(ContentNegotiation) {\r\n    json(Json {\r\n        ignoreUnknownKeys = true\r\n        isLenient = true\r\n        // 불필요한 기능 비활성화\r\n    })\r\n}\r\n```\r\n\r\n**4. 응답 압축:**\r\n```kotlin\r\ninstall(Compression) {\r\n    gzip { priority = 1.0 }\r\n    deflate { priority = 0.9 }\r\n}\r\n```\r\n\r\n**5. 캐싱:**\r\n```kotlin\r\ninstall(CachingHeaders) {\r\n    options { _, content ->\r\n        when (content.contentType?.withoutParameters()) {\r\n            ContentType.Application.Json ->\r\n                CachingOptions(CacheControl.MaxAge(maxAgeSeconds = 3600))\r\n            else -> null\r\n        }\r\n    }\r\n}\r\n```\r\n\r\n**6. 데이터베이스 연결 풀:**\r\n```kotlin\r\nval dataSource = HikariDataSource(HikariConfig().apply {\r\n    maximumPoolSize = 10\r\n    minimumIdle = 2\r\n})\r\n```",
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
    "answer": "**IoC (Inversion of Control, 제어의 역전)**\r\n- 객체의 생성과 생명주기 관리를 개발자가 아닌 프레임워크(컨테이너)가 담당하는 것\r\n- 기존에는 개발자가 직접 `new` 키워드로 객체를 생성하고 의존성을 관리했지만, IoC에서는 컨테이너가 이를 대신 수행\r\n- \"Don't call us, we'll call you\" (할리우드 원칙)\r\n\r\n**DI (Dependency Injection, 의존성 주입)**\r\n- IoC를 구현하는 디자인 패턴 중 하나\r\n- 객체가 필요로 하는 의존성을 외부에서 주입받는 방식\r\n- 주입 방식 3가지:\r\n  - **생성자 주입** (권장): 불변성 보장, 테스트 용이, 필수 의존성 명확화\r\n  - **Setter 주입**: 선택적/변경 가능한 의존성에 사용\r\n  - **필드 주입**: 간결하지만 테스트 어려움, final 사용 불가\r\n\r\n**주입 방식별 트레이드오프**\r\n| 방식 | 장점 | 단점 |\r\n|------|------|------|\r\n| 생성자 주입 | 불변성, 테스트 용이, 순환 참조 조기 발견 | 의존성 많으면 생성자가 길어짐 |\r\n| Setter 주입 | 선택적 의존성 표현, 런타임 변경 가능 | 불변성 미보장, NPE 가능 |\r\n| 필드 주입 | 코드 간결 | 테스트 어려움, final 불가, 의존성 숨김 |\r\n\r\n**장점**\r\n- 결합도 감소, 유연성 증가\r\n- 단위 테스트 용이 (Mock 객체 주입 가능)\r\n- 코드 재사용성 향상\r\n\r\n**참고**: Spring 공식 문서는 필수 의존성에 생성자 주입을, 선택적 의존성에만 Setter 주입을 권장합니다.",
    "references": []
  },
  {
    "id": "SPRING-002",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "후보 없이 특정 기능을 하는 클래스가 딱 한 개라면, 구체 클래스를 그냥 사용해도 되지 않나요? 그럼에도 불구하고 왜 Spring에선 Bean을 사용할까요?",
    "answer": "**구체 클래스 직접 사용의 문제점**\r\n- 클래스 간 강한 결합(tight coupling) 발생\r\n- 테스트 시 Mock 객체로 대체하기 어려움\r\n- 향후 요구사항 변경 시 코드 수정 범위가 커짐\r\n\r\n**Spring Bean을 사용하는 이유**\r\n\r\n1. **생명주기 관리**: Bean의 생성, 초기화, 소멸을 컨테이너가 관리\r\n2. **싱글톤 보장**: 기본적으로 하나의 인스턴스만 생성하여 메모리 효율성 확보\r\n3. **AOP 적용 가능**: 프록시 기반으로 트랜잭션, 로깅 등 횡단 관심사 적용\r\n4. **테스트 용이성**: 테스트 환경에서 쉽게 다른 구현체로 교체 가능\r\n5. **확장성**: 나중에 구현체가 추가되더라도 설정만 변경하면 됨\r\n6. **설정 외부화**: 환경별로 다른 Bean 설정 적용 가능 (Profile)\r\n\r\n**결론**: 현재는 구현체가 하나여도, 미래의 확장성과 테스트 용이성, AOP 적용을 위해 Bean으로 관리하는 것이 좋습니다.",
    "references": []
  },
  {
    "id": "SPRING-003",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Bean의 생성 주기(라이프사이클)에 대해 설명해 주세요.",
    "answer": "**Spring Bean 생명주기 단계**\r\n\r\n1. **스프링 컨테이너 생성**\r\n2. **Bean 인스턴스화**: 생성자 호출하여 객체 생성\r\n3. **의존성 주입 (DI)**: @Autowired 등으로 의존성 주입\r\n4. **초기화 콜백**:\r\n   - `@PostConstruct` 메서드 실행\r\n   - `InitializingBean.afterPropertiesSet()` 실행\r\n   - `@Bean(initMethod=\"...\")` 지정 메서드 실행\r\n5. **Bean 사용**: 애플리케이션에서 Bean 사용\r\n6. **소멸 콜백** (컨테이너 종료 시):\r\n   - `@PreDestroy` 메서드 실행\r\n   - `DisposableBean.destroy()` 실행\r\n   - `@Bean(destroyMethod=\"...\")` 지정 메서드 실행\r\n\r\n**콜백 우선순위**\r\n`@PostConstruct` > `InitializingBean` > `initMethod`\r\n`@PreDestroy` > `DisposableBean` > `destroyMethod`\r\n\r\n**권장 방식**: `@PostConstruct`와 `@PreDestroy` 사용 (간결하고 스프링 독립적)",
    "references": []
  },
  {
    "id": "SPRING-004",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring의 프로토타입 빈(Prototype Bean)은 무엇이며, 싱글톤 빈과 어떻게 다른가요?",
    "answer": "**프로토타입 빈 (Prototype Bean)**\r\n- 요청할 때마다 새로운 인스턴스를 생성하는 스코프\r\n- `@Scope(\"prototype\")` 또는 `@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)`로 설정\r\n\r\n**싱글톤 vs 프로토타입 트레이드오프**\r\n| 구분 | 싱글톤 | 프로토타입 |\r\n|------|--------|------------|\r\n| 인스턴스 수 | 1개 | 요청마다 새로 생성 |\r\n| 생명주기 관리 | 컨테이너가 전체 관리 | 생성과 DI까지만 관리 |\r\n| @PreDestroy | 호출됨 | 호출 안됨 (직접 관리 필요) |\r\n| 메모리 | 효율적 | 매번 새 객체 생성 |\r\n| 스레드 안전성 | 상태 저장 시 문제 | 인스턴스별 독립 상태 |\r\n\r\n**사용 사례**\r\n- **싱글톤**: 상태 없는(stateless) 서비스, 레포지토리\r\n- **프로토타입**: 상태를 가지는(stateful) 객체, 매번 새로운 인스턴스가 필요한 경우\r\n\r\n**주의사항 (함정 질문)**\r\n싱글톤 Bean에서 프로토타입 Bean을 주입받으면, 프로토타입도 **한 번만 주입**되어 싱글톤처럼 동작함\r\n→ 해결: `ObjectProvider`, `Provider<T>`, 또는 `@Lookup` 사용\r\n\r\n```java\r\n@Autowired\r\nprivate ObjectProvider<PrototypeBean> provider;\r\n\r\npublic void logic() {\r\n    PrototypeBean bean = provider.getObject(); // 매번 새 인스턴스\r\n}\r\n```",
    "references": []
  },
  {
    "id": "SPRING-005",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "AOP에 대해 설명해 주세요.",
    "answer": "**AOP (Aspect Oriented Programming, 관점 지향 프로그래밍)**\r\n- 횡단 관심사(Cross-Cutting Concerns)를 모듈화하는 프로그래밍 패러다임\r\n- 핵심 비즈니스 로직과 부가 기능(로깅, 트랜잭션, 보안 등)을 분리\r\n\r\n**핵심 용어**\r\n| 용어 | 설명 |\r\n|------|------|\r\n| **Aspect** | 횡단 관심사를 모듈화한 것 (예: 로깅 Aspect) |\r\n| **Join Point** | Advice가 적용될 수 있는 지점 (메서드 실행 시점) |\r\n| **Pointcut** | Join Point를 선별하는 표현식 |\r\n| **Advice** | 실제 수행할 부가 기능 로직 |\r\n| **Target** | Advice가 적용되는 대상 객체 |\r\n| **Weaving** | Aspect를 Target에 적용하는 과정 |\r\n\r\n**Advice 종류**\r\n- `@Before`: 메서드 실행 전\r\n- `@After`: 메서드 실행 후 (성공/실패 무관)\r\n- `@AfterReturning`: 메서드 정상 종료 후\r\n- `@AfterThrowing`: 예외 발생 시\r\n- `@Around`: 메서드 실행 전후 (가장 강력)\r\n\r\n**적용 사례**: 트랜잭션 관리, 로깅, 성능 측정, 보안 검사, 캐싱",
    "references": []
  },
  {
    "id": "SPRING-006",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring AOP에서 @Aspect는 어떻게 동작하나요?",
    "answer": "**@Aspect 동작 원리: 프록시 기반 AOP**\r\n\r\n1. **Bean 등록 시점**에 스프링이 @Aspect 클래스를 스캔\r\n2. Pointcut에 해당하는 **Target Bean을 프록시 객체로 감싸서** 컨테이너에 등록\r\n3. 클라이언트가 Target 메서드 호출 시 **프록시가 먼저 호출**됨\r\n4. 프록시가 Advice 로직을 실행하고, 필요시 실제 Target 메서드 호출\r\n\r\n**프록시 생성 방식**\r\n- **JDK 동적 프록시**: 인터페이스 기반 (인터페이스가 있을 때)\r\n- **CGLIB 프록시**: 클래스 기반, 상속을 이용 (인터페이스가 없을 때)\r\n- Spring Boot 2.0+에서는 `spring.aop.proxy-target-class=true`가 기본값으로, **CGLIB를 기본 사용**\r\n\r\n**JDK 프록시 vs CGLIB 트레이드오프**\r\n| 구분 | JDK 동적 프록시 | CGLIB |\r\n|------|----------------|-------|\r\n| 요구 조건 | 인터페이스 필수 | 클래스 상속 (final 클래스 불가) |\r\n| 성능 | 리플렉션 기반, 약간 느림 | 바이트코드 생성, 더 빠름 |\r\n| 유연성 | 인터페이스 기반 설계 강제 | 구체 클래스도 프록시 가능 |\r\n\r\n**동작 흐름 예시 (@Around)**\r\n```\r\nClient → Proxy → @Around (before) → Target 메서드 → @Around (after) → Proxy → Client\r\n```\r\n\r\n**주의사항 (함정 질문)**\r\n- **Self-invocation 문제**: 같은 클래스 내에서 `this.method()` 호출 시 프록시를 거치지 않아 AOP 미적용\r\n- 해결 방법:\r\n  1. 자기 자신을 주입받아 호출 (`@Autowired private MyService self;`)\r\n  2. `AopContext.currentProxy()` 사용 (`@EnableAspectJAutoProxy(exposeProxy=true)` 필요)\r\n  3. 별도 클래스로 분리 (가장 권장되는 방법)",
    "references": []
  },
  {
    "id": "SPRING-007",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring 에서 Interceptor와 Servlet Filter에 대해 설명해 주세요.",
    "answer": "**실행 순서**\r\n```\r\nHTTP 요청 → Filter → DispatcherServlet → Interceptor → Controller\r\n```\r\n\r\n**Servlet Filter**\r\n- **서블릿 스펙**에 정의된 기술 (스프링 독립적)\r\n- **DispatcherServlet 이전**에 실행\r\n- 모든 요청에 대해 동작 (정적 리소스 포함)\r\n- `javax.servlet.Filter` 인터페이스 구현\r\n\r\n**Spring Interceptor**\r\n- **스프링 MVC**가 제공하는 기술\r\n- **DispatcherServlet과 Controller 사이**에서 실행\r\n- 스프링 컨텍스트에 접근 가능 (Bean 사용 가능)\r\n- `HandlerInterceptor` 인터페이스 구현\r\n\r\n| 구분 | Filter | Interceptor |\r\n|------|--------|-------------|\r\n| 관리 주체 | 서블릿 컨테이너 | 스프링 컨테이너 |\r\n| Request/Response 조작 | 가능 | 불가능 |\r\n| 스프링 Bean 접근 | 제한적 | 자유로움 |\r\n| 예외 처리 | 서블릿 예외 처리 | @ControllerAdvice 사용 가능 |\r\n\r\n**Interceptor 메서드**\r\n- `preHandle()`: 컨트롤러 실행 전 (false 반환 시 요청 중단)\r\n- `postHandle()`: 컨트롤러 실행 후, 뷰 렌더링 전 (예외 발생 시 호출 안 됨)\r\n- `afterCompletion()`: 뷰 렌더링 후, 완료 시점 (예외 발생해도 항상 호출)\r\n\r\n**Filter vs Interceptor 선택 기준**\r\n- **Spring Bean 접근이 많이 필요하면**: Interceptor\r\n- **Request/Response 조작이 필요하면**: Filter\r\n- **Spring MVC 외부에서도 동작해야 하면**: Filter",
    "references": []
  },
  {
    "id": "SPRING-008",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring에서 Servlet Filter와 Spring Interceptor 중 Filter를 사용해야 하는 상황은 언제인가요?",
    "answer": "**Filter를 사용해야 하는 경우**\r\n\r\n1. **Request/Response 자체를 조작해야 할 때**\r\n   - 요청 본문(body)을 읽거나 수정\r\n   - 응답 본문을 압축하거나 변환\r\n   - ServletRequest를 래핑하여 커스텀 기능 추가\r\n\r\n2. **모든 요청에 공통 처리가 필요할 때**\r\n   - 인코딩 설정 (CharacterEncodingFilter)\r\n   - CORS 처리\r\n   - 정적 리소스 요청 포함 처리\r\n\r\n3. **스프링과 무관한 처리**\r\n   - 스프링 컨텍스트 로딩 전에 처리해야 하는 작업\r\n   - 서블릿 스펙 기반의 표준화된 처리\r\n\r\n4. **보안 관련 최전방 처리**\r\n   - XSS, CSRF 방어\r\n   - Spring Security의 필터 체인\r\n\r\n**실무 예시**\r\n| Filter 사용 | Interceptor 사용 |\r\n|-------------|------------------|\r\n| 인코딩 처리 | 로그인 체크 |\r\n| CORS 설정 | 권한 검사 |\r\n| 요청 로깅 (body 포함) | API 호출 로깅 |\r\n| 보안 필터링 | 공통 데이터 세팅 |\r\n\r\n**결론**: 둘 다 적절한 용도가 있으며, Spring Security처럼 Filter 체인이 필수인 경우도 있습니다.",
    "references": []
  },
  {
    "id": "SPRING-009",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "DispatcherServlet 의 역할에 대해 설명해 주세요.",
    "answer": "**DispatcherServlet이란?**\r\n- Spring MVC의 **프론트 컨트롤러(Front Controller)**\r\n- 모든 HTTP 요청을 받아 적절한 컨트롤러에 분배하는 중앙 서블릿\r\n- `HttpServlet`을 상속받은 서블릿\r\n\r\n**요청 처리 흐름**\r\n1. **요청 수신**: 클라이언트 요청을 받음\r\n2. **핸들러 조회**: `HandlerMapping`을 통해 요청을 처리할 핸들러(컨트롤러) 검색\r\n3. **핸들러 어댑터 조회**: `HandlerAdapter`를 통해 핸들러 실행 방법 결정\r\n4. **핸들러 실행**: 어댑터가 실제 컨트롤러 메서드 호출\r\n5. **ModelAndView 반환**: 컨트롤러가 처리 결과 반환\r\n6. **뷰 리졸버 호출**: `ViewResolver`가 뷰 이름을 실제 View로 변환\r\n7. **뷰 렌더링**: View가 Model 데이터로 응답 생성\r\n8. **응답 반환**: 클라이언트에게 응답\r\n\r\n**주요 구성 요소**\r\n- `HandlerMapping`: URL과 핸들러 매핑\r\n- `HandlerAdapter`: 다양한 핸들러 실행 방식 지원\r\n- `ViewResolver`: 뷰 이름 → 실제 View 객체 변환\r\n- `HandlerExceptionResolver`: 예외 처리",
    "references": []
  },
  {
    "id": "SPRING-010",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "DispatcherServlet은 한 번에 여러 요청을 동시에 처리할 수 있나요?",
    "answer": "**네, 가능합니다.**\r\n\r\n**멀티스레드 처리 구조**\r\n- DispatcherServlet은 **싱글톤**으로 하나만 존재\r\n- 하지만 서블릿 컨테이너(Tomcat)가 **스레드 풀**을 관리\r\n- 각 요청마다 별도의 스레드가 할당되어 **동시에 여러 요청 처리 가능**\r\n\r\n**동작 방식**\r\n```\r\n요청1 → Thread-1 → DispatcherServlet.service() → Controller\r\n요청2 → Thread-2 → DispatcherServlet.service() → Controller\r\n요청3 → Thread-3 → DispatcherServlet.service() → Controller\r\n```\r\n\r\n**Thread-Safe 이유**\r\n- DispatcherServlet 자체는 **상태를 가지지 않음** (stateless)\r\n- 요청별 데이터는 각 스레드의 **지역 변수**나 **ThreadLocal**에 저장\r\n- 스프링의 싱글톤 Bean들도 상태를 가지지 않도록 설계해야 함\r\n\r\n**Tomcat 스레드 풀 설정**\r\n```yaml\r\nserver:\r\n  tomcat:\r\n    threads:\r\n      max: 200        # 최대 스레드 수\r\n      min-spare: 10   # 최소 유휴 스레드 수\r\n```\r\n\r\n**주의**: Controller나 Service에서 인스턴스 변수에 상태를 저장하면 동시성 문제 발생",
    "references": []
  },
  {
    "id": "SPRING-011",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "DispatcherServlet은 @Controller를 어떻게 구분하고 찾아내나요?",
    "answer": "**HandlerMapping을 통한 구분**\r\n\r\nDispatcherServlet은 직접 @Controller를 찾지 않고 **HandlerMapping**에게 위임합니다.\r\n\r\n**동작 과정**\r\n1. 스프링 컨텍스트 로딩 시 `@Controller`, `@RequestMapping` 붙은 클래스 스캔\r\n2. **RequestMappingHandlerMapping**이 URL 패턴과 핸들러 메서드를 매핑 정보로 저장\r\n3. 요청 시 DispatcherServlet이 HandlerMapping에게 해당 URL의 핸들러 조회\r\n4. 매핑된 컨트롤러 메서드 정보 반환\r\n\r\n**주요 HandlerMapping 구현체**\r\n| 구현체 | 설명 |\r\n|--------|------|\r\n| RequestMappingHandlerMapping | @RequestMapping 기반 (가장 많이 사용) |\r\n| BeanNameUrlHandlerMapping | Bean 이름이 URL인 경우 |\r\n| SimpleUrlHandlerMapping | 직접 URL-핸들러 매핑 설정 |\r\n\r\n**@Controller vs @RestController**\r\n- `@Controller`: View 이름 반환 → ViewResolver가 처리\r\n- `@RestController`: `@Controller` + `@ResponseBody`, 객체를 JSON으로 직접 반환\r\n\r\n**내부 저장 구조**\r\n```java\r\n// RequestMappingHandlerMapping 내부\r\nMap<RequestMappingInfo, HandlerMethod> mappingRegistry\r\n// 예: GET /users → UserController.getUsers()\r\n```",
    "references": []
  },
  {
    "id": "SPRING-012",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "JPA와 같은 ORM을 사용하는 이유가 무엇인가요?",
    "answer": "**ORM (Object-Relational Mapping)이란?**\r\n- 객체와 관계형 데이터베이스 테이블을 매핑해주는 기술\r\n- SQL을 직접 작성하지 않고 객체 지향적으로 데이터 조작 가능\r\n\r\n**ORM 사용 이유**\r\n\r\n1. **패러다임 불일치 해결**\r\n   - 객체: 상속, 참조, 연관관계\r\n   - RDB: 테이블, 외래키, 조인\r\n   - ORM이 이 차이를 자동으로 해결\r\n\r\n2. **생산성 향상**\r\n   - 반복적인 CRUD SQL 작성 불필요\r\n   - 객체 중심 개발 가능\r\n\r\n3. **유지보수성**\r\n   - 필드 추가 시 SQL 수정 불필요\r\n   - 데이터베이스 변경에 유연\r\n\r\n4. **DB 독립성**\r\n   - Dialect 설정으로 DB 벤더 변경 용이\r\n   - MySQL → PostgreSQL 마이그레이션 쉬움\r\n\r\n5. **성능 최적화 기능**\r\n   - 1차 캐시, 쓰기 지연\r\n   - 변경 감지(Dirty Checking)\r\n   - 지연 로딩(Lazy Loading)\r\n\r\n**단점**\r\n- 학습 곡선이 있음\r\n- 복잡한 쿼리는 직접 작성 필요 (JPQL, QueryDSL, Native Query)\r\n- N+1 문제 등 성능 이슈 주의 필요",
    "references": []
  },
  {
    "id": "SPRING-013",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "JPA의 영속성 컨텍스트는 어떤 기능을 하나요? 실제로 성능 향상에 큰 도움이 되나요?",
    "answer": "**영속성 컨텍스트 (Persistence Context)**\r\n- 엔티티를 영구 저장하는 환경, **1차 캐시** 역할\r\n- EntityManager를 통해 접근\r\n\r\n**주요 기능과 성능 이점**\r\n\r\n1. **1차 캐시**\r\n   - 같은 트랜잭션 내에서 동일 엔티티 조회 시 DB 접근 없이 캐시에서 반환\r\n   - 동일성(identity) 보장: `em.find(Member.class, 1L) == em.find(Member.class, 1L)`\r\n   - ⚠️ 트랜잭션 범위 한정이라 효과는 제한적 (2차 캐시와 구분 필요)\r\n\r\n2. **쓰기 지연 (Write-behind)**\r\n   - INSERT/UPDATE를 즉시 실행하지 않고 모았다가 커밋 시점에 일괄 실행\r\n   - **배치 처리**로 DB 왕복 횟수 감소\r\n\r\n3. **변경 감지 (Dirty Checking)**\r\n   - 엔티티 변경 시 자동으로 UPDATE SQL 생성\r\n   - 별도 update() 메서드 호출 불필요\r\n\r\n4. **지연 로딩 (Lazy Loading)**\r\n   - 연관 엔티티를 실제 사용할 때까지 로딩 지연\r\n   - 불필요한 조인 방지\r\n\r\n**성능 향상에 대한 현실적 평가**\r\n- 1차 캐시: 같은 트랜잭션 내에서만 유효 → **효과 제한적**\r\n- 쓰기 지연: 대량 INSERT 시 **확실한 성능 향상**\r\n- 전체적으로 **개발 편의성** 측면에서 더 큰 가치",
    "references": []
  },
  {
    "id": "SPRING-014",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "JPA의 N + 1 문제에 대해 설명해 주세요.",
    "answer": "**N+1 문제란?**\r\n- 연관 관계가 있는 엔티티 조회 시, **1번의 쿼리로 N개의 데이터**를 가져온 후\r\n- 각 데이터의 연관 엔티티를 조회하기 위해 **추가로 N번의 쿼리**가 실행되는 문제\r\n\r\n**예시**\r\n```java\r\n// Team : Member = 1 : N 관계\r\nList<Team> teams = teamRepository.findAll(); // 1번 쿼리\r\nfor (Team team : teams) {\r\n    team.getMembers().size(); // N번 쿼리 (팀 수만큼)\r\n}\r\n// 총 N+1 번 쿼리 실행\r\n```\r\n\r\n**발생 원인**\r\n- 지연 로딩(LAZY) 시: 연관 엔티티 접근 시점에 쿼리 발생\r\n- 즉시 로딩(EAGER) 시: 각 엔티티마다 별도 쿼리 발생\r\n\r\n**해결 방법**\r\n\r\n1. **Fetch Join (JPQL)** - 가장 직접적인 해결책\r\n   ```java\r\n   @Query(\"SELECT t FROM Team t JOIN FETCH t.members\")\r\n   List<Team> findAllWithMembers();\r\n   ```\r\n   - ⚠️ 페이징과 함께 사용 시 주의 (컬렉션 Fetch Join + 페이징 = 메모리 로딩)\r\n\r\n2. **@EntityGraph**\r\n   ```java\r\n   @EntityGraph(attributePaths = {\"members\"})\r\n   List<Team> findAll();\r\n   ```\r\n\r\n3. **Batch Size 설정**\r\n   ```yaml\r\n   spring.jpa.properties.hibernate.default_batch_fetch_size: 100\r\n   ```\r\n   - IN 절로 한 번에 여러 개 조회\r\n\r\n4. **@BatchSize 어노테이션**\r\n   - 엔티티나 컬렉션에 개별 적용\r\n\r\n**권장**: 기본은 LAZY + 필요 시 Fetch Join 또는 Batch Size",
    "references": []
  },
  {
    "id": "SPRING-015",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "@Transactional 은 어떤 기능을 하나요?",
    "answer": "**@Transactional이란?**\r\n- 선언적 트랜잭션 관리를 위한 어노테이션\r\n- 메서드 실행을 하나의 트랜잭션으로 묶어줌\r\n- AOP 기반으로 동작 (프록시 패턴)\r\n\r\n**동작 원리**\r\n```\r\n메서드 호출 → 프록시 → 트랜잭션 시작 → 실제 메서드 실행 → 커밋/롤백\r\n```\r\n\r\n**주요 속성**\r\n\r\n| 속성 | 설명 |\r\n|------|------|\r\n| `propagation` | 트랜잭션 전파 방식 (REQUIRED, REQUIRES_NEW 등) |\r\n| `isolation` | 격리 수준 (READ_COMMITTED 등) |\r\n| `timeout` | 타임아웃 설정 (초) |\r\n| `readOnly` | 읽기 전용 여부 |\r\n| `rollbackFor` | 롤백할 예외 지정 |\r\n| `noRollbackFor` | 롤백하지 않을 예외 지정 |\r\n\r\n**전파 속성 (Propagation)**\r\n- `REQUIRED` (기본): 기존 트랜잭션 있으면 참여, 없으면 새로 시작\r\n- `REQUIRES_NEW`: 항상 새 트랜잭션 시작\r\n- `NESTED`: 중첩 트랜잭션 (Savepoint 사용)\r\n- `SUPPORTS`: 트랜잭션 있으면 참여, 없으면 없이 실행\r\n\r\n**주의사항**\r\n- **Checked Exception**은 기본적으로 롤백 안 됨 (rollbackFor 필요)\r\n- **Self-invocation**: 같은 클래스 내 호출 시 프록시 우회로 트랜잭션 미적용\r\n- **public 메서드**에만 적용 가능 (Spring 6+에서는 protected도 가능)\r\n\r\n**왜 Checked Exception은 롤백되지 않는가?**\r\n- Spring의 설계 철학: Checked Exception은 **복구 가능한 비즈니스 예외**로 간주\r\n- Unchecked Exception(RuntimeException)은 **프로그래밍 오류**로 간주하여 롤백\r\n- 필요시 `@Transactional(rollbackFor = Exception.class)` 명시",
    "references": []
  },
  {
    "id": "SPRING-016",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring JPA에서 @Transactional(readOnly=true)의 기능과 성능 최적화 효과는 무엇인가요?",
    "answer": "**@Transactional(readOnly=true)란?**\r\n- 해당 트랜잭션이 읽기 전용임을 선언\r\n- JPA와 DB 레벨에서 최적화 힌트로 사용\r\n\r\n**성능 최적화 효과**\r\n\r\n1. **영속성 컨텍스트 최적화 (Hibernate 5.2+)**\r\n   - 변경 감지(Dirty Checking) 비활성화\r\n   - 스냅샷 저장 안 함 → **메모리 절약**\r\n   - ⚠️ 단, `FlushMode.MANUAL` 설정 여부는 JPA 구현체와 버전에 따라 다름\r\n\r\n2. **Flush 모드 변경**\r\n   - Hibernate에서 FlushMode가 MANUAL로 설정될 수 있음\r\n   - 불필요한 flush 연산 방지\r\n\r\n3. **DB 레벨 최적화 (DB 벤더에 따라 다름)**\r\n   - MySQL: 읽기 전용 트랜잭션으로 처리\r\n   - PostgreSQL: 읽기 전용 모드 활성화\r\n   - **Replication 환경**: Slave(읽기 전용 DB)로 라우팅 가능\r\n\r\n**실질적 도움이 되나요?**\r\n- **대량 조회**: 스냅샷 미저장으로 메모리 절약 효과 있음\r\n- **Replication 환경**: Master-Slave 분기에 매우 유용\r\n- **단순 조회**: 효과는 미미하지만, **명시적 의도 표현**으로 코드 가독성 향상\r\n\r\n**권장**\r\n```java\r\n@Service\r\n@Transactional(readOnly = true)  // 클래스 레벨에 읽기 전용 기본 설정\r\npublic class UserService {\r\n\r\n    @Transactional  // 쓰기 메서드만 오버라이드\r\n    public void updateUser() { }\r\n}\r\n```",
    "references": []
  },
  {
    "id": "SPRING-017",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring JPA에서 조회(읽기) 전용 메서드에도 @Transactional을 붙여야 하는 이유는 무엇인가요?",
    "answer": "**@Transactional이 없을 때 발생하는 문제들**\r\n\r\n1. **OSIV(Open Session In View) 비활성화 시 LazyLoading 오류**\r\n   - OSIV가 꺼져있으면 트랜잭션 범위 = 영속성 컨텍스트 범위\r\n   - @Transactional 없으면 지연 로딩 시 `LazyInitializationException` 발생\r\n\r\n2. **데이터 일관성 문제**\r\n   - 여러 쿼리 수행 중 데이터가 변경될 수 있음\r\n   - 트랜잭션 격리 수준에 따른 일관된 읽기 보장 안 됨\r\n\r\n3. **Dirty Read / Non-Repeatable Read**\r\n   - 트랜잭션 없이 조회하면 커밋되지 않은 데이터 읽을 가능성\r\n   - 같은 데이터를 두 번 읽었을 때 다른 값이 나올 수 있음\r\n\r\n**OSIV에 대한 이해**\r\n- **OSIV = true (기본값)**: 영속성 컨텍스트가 HTTP 요청 전체 유지, View에서도 지연 로딩 가능\r\n- **OSIV = false (권장)**: 트랜잭션 범위 내에서만 지연 로딩, DB 커넥션 점유 시간 감소\r\n- 운영 환경에서는 OSIV 비활성화 권장 (`spring.jpa.open-in-view=false`)\r\n\r\n**@Transactional이 필요한 경우**\r\n```java\r\n// 여러 테이블을 조회하여 일관된 데이터 필요\r\npublic OrderDetailDto getOrderDetail(Long orderId) {\r\n    Order order = orderRepository.findById(orderId);\r\n    List<OrderItem> items = order.getItems(); // LAZY 로딩\r\n    // → @Transactional 없으면 LazyInitializationException\r\n}\r\n```\r\n\r\n**@Transactional 없어도 되는 경우**\r\n- 단순 단건 조회\r\n- OSIV가 활성화된 환경 (Spring Boot 기본값: true)\r\n- 일관성이 크게 중요하지 않은 조회\r\n\r\n**결론**: 읽기에도 @Transactional(readOnly=true)를 붙이는 것을 권장\r\n- 명시적 의도 표현\r\n- Replication 라우팅 가능\r\n- 영속성 컨텍스트 범위 명확화",
    "references": []
  },
  {
    "id": "SPRING-018",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Java 에서 Annotation 은 어떤 기능을 하나요?",
    "answer": "**Annotation이란?**\r\n- 소스 코드에 메타데이터를 추가하는 방법\r\n- `@` 기호로 시작\r\n- 그 자체로는 **동작하는 코드가 아님** (메타데이터일 뿐)\r\n\r\n**Annotation의 용도**\r\n\r\n1. **컴파일러 지시**\r\n   - `@Override`: 메서드 오버라이딩 검증\r\n   - `@Deprecated`: 사용 중지 권고 경고\r\n   - `@SuppressWarnings`: 경고 억제\r\n\r\n2. **컴파일 타임 코드 생성**\r\n   - Lombok: `@Getter`, `@Setter` → 컴파일 시 코드 생성 (APT)\r\n\r\n3. **런타임 처리**\r\n   - Reflection을 통해 어노테이션 정보 읽고 처리\r\n   - 프레임워크가 활용\r\n\r\n**메타 어노테이션**\r\n```java\r\n@Target(ElementType.METHOD)      // 적용 대상\r\n@Retention(RetentionPolicy.RUNTIME) // 유지 범위\r\n@Documented                      // JavaDoc에 포함\r\n@Inherited                       // 상속 시 전달\r\npublic @interface MyAnnotation { }\r\n```\r\n\r\n**Retention 정책**\r\n| 정책 | 설명 |\r\n|------|------|\r\n| SOURCE | 소스 코드까지만 유지 (컴파일 후 삭제) |\r\n| CLASS | 클래스 파일까지 유지 (런타임 접근 불가) |\r\n| RUNTIME | 런타임에도 유지 (Reflection 가능) |",
    "references": []
  },
  {
    "id": "SPRING-019",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Annotation 자체는 별 기능이 없는 것 같은데, 어떻게 Spring에서는 Annotation이 그렇게 많은 기능을 하는 걸까요?",
    "answer": "**핵심: Annotation 자체는 아무것도 안 함**\r\n- Annotation은 단순한 **마커(표시)**일 뿐\r\n- **Spring 프레임워크가 Reflection으로 읽고 처리**하기 때문에 기능이 동작하는 것\r\n\r\n**Spring의 Annotation 처리 방식**\r\n\r\n1. **컴포넌트 스캔 시점**\r\n   - `@ComponentScan`이 지정된 패키지 스캔\r\n   - 클래스에 `@Component`, `@Service` 등이 있는지 Reflection으로 확인\r\n   - 있으면 Bean으로 등록\r\n\r\n2. **BeanPostProcessor**\r\n   - Bean 생성 전후에 Annotation 확인하고 처리\r\n   - `@Autowired` → AutowiredAnnotationBeanPostProcessor가 의존성 주입\r\n   - `@PostConstruct` → CommonAnnotationBeanPostProcessor가 초기화 메서드 호출\r\n\r\n3. **AOP / 프록시 생성**\r\n   - `@Transactional` → 프록시로 감싸서 트랜잭션 로직 추가\r\n   - `@Async` → 프록시로 감싸서 비동기 실행\r\n\r\n**동작 흐름 예시 (@Autowired)**\r\n```\r\n1. 스프링 컨테이너가 Bean 생성\r\n2. AutowiredAnnotationBeanPostProcessor 동작\r\n3. @Autowired 붙은 필드/생성자 찾기 (Reflection)\r\n4. 해당 타입의 Bean을 찾아서 주입\r\n```\r\n\r\n**결론**: Annotation은 메타데이터, 실제 동작은 Spring의 **BeanPostProcessor, AOP 프록시, Reflection** 덕분\r\n\r\n**심화 이해**\r\n- `@Component`는 `ClassPathBeanDefinitionScanner`가 처리\r\n- `@Autowired`는 `AutowiredAnnotationBeanPostProcessor`가 처리\r\n- `@Transactional`은 `TransactionInterceptor`가 AOP로 처리",
    "references": []
  },
  {
    "id": "SPRING-020",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Lombok의 @Data를 잘 사용하지 않는 이유는 무엇일까요?",
    "answer": "**@Data가 포함하는 것**\r\n```java\r\n@Getter @Setter @ToString @EqualsAndHashCode @RequiredArgsConstructor\r\n```\r\n\r\n**사용을 지양하는 이유**\r\n\r\n1. **@Setter의 무분별한 노출**\r\n   - 모든 필드에 Setter가 생성됨\r\n   - 객체의 불변성이 깨지고, 어디서든 값 변경 가능\r\n   - 의도치 않은 상태 변경 발생 위험\r\n\r\n2. **@ToString의 순환 참조 문제**\r\n   - 양방향 연관관계 시 무한 루프 → StackOverflowError\r\n   ```java\r\n   @Entity class Team { List<Member> members; } // toString() 호출 시\r\n   @Entity class Member { Team team; }          // 서로 호출 → 무한루프\r\n   ```\r\n\r\n3. **@EqualsAndHashCode 문제**\r\n   - 모든 필드 포함 → 연관 엔티티 비교 시 문제\r\n   - JPA Entity에서 `@EqualsAndHashCode(of = \"id\")` 권장\r\n\r\n4. **불필요한 생성자**\r\n   - `@RequiredArgsConstructor`가 항상 필요한 것은 아님\r\n\r\n**권장 사용 방식**\r\n```java\r\n// 필요한 어노테이션만 명시적으로 사용\r\n@Getter\r\n@NoArgsConstructor(access = AccessLevel.PROTECTED)\r\n@EqualsAndHashCode(of = \"id\")\r\n@ToString(exclude = \"team\")\r\npublic class Member { }\r\n```\r\n\r\n**@Data 사용해도 되는 경우**\r\n- DTO (단순 데이터 전달 객체)\r\n- 연관관계 없는 단순 클래스\r\n- 값 객체(Value Object)로 불변성이 필요 없는 경우\r\n\r\n**JPA Entity에서 Lombok 사용 시 주의**\r\n- `@EqualsAndHashCode`: 연관 엔티티 제외, ID만 사용 권장\r\n- `@ToString`: 지연 로딩 필드 제외 (LazyInitializationException 방지)\r\n- `@Builder`: `@NoArgsConstructor(access = PROTECTED)`와 함께 사용",
    "references": []
  },
  {
    "id": "SPRING-021",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Tomcat이 정확히 어떤 역할을 하는 도구인가요?",
    "answer": "**Tomcat이란?**\r\n- Apache 재단의 오픈소스 **서블릿 컨테이너** (= 웹 컨테이너)\r\n- Java Servlet, JSP 스펙을 구현한 **WAS(Web Application Server)**\r\n\r\n**주요 역할**\r\n\r\n1. **HTTP 요청/응답 처리**\r\n   - HTTP 프로토콜을 파싱하여 서블릿에 전달\r\n   - 서블릿의 응답을 HTTP 형식으로 클라이언트에 전송\r\n\r\n2. **서블릿 생명주기 관리**\r\n   - 서블릿 인스턴스 생성, 초기화, 소멸 관리\r\n   - `init()` → `service()` → `destroy()`\r\n\r\n3. **스레드 풀 관리**\r\n   - 요청마다 스레드를 할당하여 동시 처리\r\n   - 커넥션 풀, 스레드 풀 관리\r\n\r\n4. **정적 리소스 제공**\r\n   - HTML, CSS, JS, 이미지 파일 서빙\r\n\r\n**Tomcat 구조**\r\n```\r\nServer\r\n└── Service\r\n    ├── Connector (HTTP/AJP 처리)\r\n    └── Engine\r\n        └── Host\r\n            └── Context (웹 애플리케이션)\r\n```\r\n\r\n**Spring Boot와의 관계**\r\n- Spring Boot는 **Embedded Tomcat**을 내장\r\n- 별도 Tomcat 설치 없이 JAR 파일로 실행 가능\r\n- 다른 서버로 교체 가능: Jetty, Undertow, Netty\r\n\r\n**WAS vs Web Server**\r\n| 구분 | Web Server | WAS (Tomcat) |\r\n|------|------------|--------------|\r\n| 처리 대상 | 정적 콘텐츠 | 동적 콘텐츠 |\r\n| 예시 | Nginx, Apache HTTP | Tomcat, Jetty |\r\n\r\n**Tomcat 버전과 Spring Boot**\r\n| Spring Boot | Tomcat | Servlet |\r\n|-------------|--------|---------|\r\n| 2.x | 9.x | 4.0 |\r\n| 3.x | 10.x | 6.0 (Jakarta) |",
    "references": []
  },
  {
    "id": "SPRING-022",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Netty에 대해 설명해 주세요. Tomcat 대신 Netty를 사용하는 이유는 무엇인가요?",
    "answer": "**Netty란?**\r\n- **비동기 이벤트 기반** 네트워크 프레임워크\r\n- NIO(Non-blocking I/O) 기반의 고성능 서버 개발용\r\n- 서블릿 스펙에 의존하지 않음\r\n\r\n**Tomcat vs Netty**\r\n\r\n| 구분 | Tomcat | Netty |\r\n|------|--------|-------|\r\n| I/O 모델 | Blocking (1요청 1스레드) | Non-blocking (이벤트 루프) |\r\n| 스레드 수 | 요청 수에 비례 | 적은 스레드로 많은 요청 처리 |\r\n| 메모리 | 스레드당 스택 메모리 필요 | 효율적 |\r\n| 프로토콜 | HTTP 중심 | TCP/UDP/WebSocket 등 다양 |\r\n\r\n**Netty 사용 이유**\r\n\r\n1. **대규모 동시 접속 처리**\r\n   - 적은 스레드로 수만 개 커넥션 처리 가능\r\n   - WebSocket, 채팅 서버, 게임 서버에 적합\r\n\r\n2. **낮은 지연 시간 (Low Latency)**\r\n   - 이벤트 루프 기반으로 컨텍스트 스위칭 최소화\r\n\r\n3. **다양한 프로토콜 지원**\r\n   - HTTP/2, WebSocket, TCP, UDP 등\r\n\r\n**Spring에서의 활용**\r\n- **Spring WebFlux**: Netty를 기본 서버로 사용\r\n- **Spring Cloud Gateway**: Netty 기반 API 게이트웨이\r\n\r\n**언제 Netty를 선택?**\r\n- 대규모 동시 접속이 필요한 경우\r\n- 리액티브/비동기 프로그래밍 모델 사용 시\r\n- WebSocket 기반 실시간 서비스",
    "references": []
  },
  {
    "id": "SPRING-023",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Framework의 기본 개념과 주요 특징에 대해 설명해주세요.",
    "answer": "**Spring Framework란?**\r\n- Java 기반 엔터프라이즈 애플리케이션 개발을 위한 **경량 프레임워크**\r\n- EJB의 복잡성을 해결하고자 Rod Johnson이 2003년에 개발\r\n\r\n**핵심 철학: POJO 기반 개발**\r\n- Plain Old Java Object를 사용한 비침투적 설계\r\n- 특정 기술에 종속되지 않는 깔끔한 코드\r\n\r\n**주요 특징**\r\n\r\n1. **IoC/DI (제어의 역전/의존성 주입)**\r\n   - 객체 생성과 의존관계를 컨테이너가 관리\r\n   - 결합도 감소, 테스트 용이성 향상\r\n\r\n2. **AOP (관점 지향 프로그래밍)**\r\n   - 횡단 관심사 분리 (로깅, 트랜잭션, 보안)\r\n   - 비즈니스 로직에 집중 가능\r\n\r\n3. **선언적 트랜잭션 관리**\r\n   - @Transactional로 간편한 트랜잭션 처리\r\n\r\n4. **다양한 기술 통합**\r\n   - JPA, MyBatis, Redis, Kafka 등과 쉬운 연동\r\n\r\n5. **모듈화**\r\n   - 필요한 모듈만 선택 사용 가능\r\n   - Core, MVC, Data, Security 등\r\n\r\n**Spring의 장점**\r\n- 낮은 결합도, 높은 응집도\r\n- 테스트 용이성\r\n- 풍부한 생태계와 커뮤니티",
    "references": []
  },
  {
    "id": "SPRING-024",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Boot와 전통적인 Spring Framework의 차이점은 무엇인가요?",
    "answer": "**Spring Boot의 탄생 배경**\r\n- 기존 Spring의 복잡한 설정(XML, 의존성 관리)을 해결\r\n- \"Convention over Configuration\" 철학\r\n\r\n**주요 차이점**\r\n\r\n| 구분 | Spring Framework | Spring Boot |\r\n|------|------------------|-------------|\r\n| 설정 방식 | XML/Java Config 직접 작성 | 자동 설정 (Auto-Configuration) |\r\n| 의존성 | 개별 버전 관리 | Starter로 통합 관리 |\r\n| 서버 | 외부 WAS 필요 | 내장 서버 (Tomcat, Jetty) |\r\n| 배포 | WAR 배포 | JAR 실행 |\r\n| 설정 파일 | 여러 XML 파일 | application.yml/properties |\r\n\r\n**Spring Boot 핵심 기능**\r\n\r\n1. **Auto-Configuration**\r\n   - 클래스패스 기반 자동 Bean 설정\r\n   - `@EnableAutoConfiguration`\r\n\r\n2. **Starter Dependencies**\r\n   ```xml\r\n   <dependency>\r\n       <groupId>org.springframework.boot</groupId>\r\n       <artifactId>spring-boot-starter-web</artifactId>\r\n   </dependency>\r\n   ```\r\n   - 관련 의존성 버전 자동 관리\r\n\r\n3. **Embedded Server**\r\n   - Tomcat, Jetty, Undertow 내장\r\n   - `java -jar app.jar`로 바로 실행\r\n\r\n4. **Spring Boot Actuator**\r\n   - 애플리케이션 모니터링 엔드포인트 제공\r\n\r\n5. **Production-Ready**\r\n   - Health check, Metrics 기본 제공",
    "references": []
  },
  {
    "id": "SPRING-025",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "IoC(Inversion of Control)와 DI(Dependency Injection)의 개념 및 이점에 대해 심화하여 설명해주세요.",
    "answer": "**IoC (제어의 역전)**\r\n- 객체의 생성, 생명주기 관리 권한을 **프레임워크에 위임**\r\n- 개발자가 `new`로 직접 객체를 생성하지 않음\r\n- \"Don't call us, we'll call you\" 원칙\r\n\r\n**DI (의존성 주입)**\r\n- IoC를 구현하는 **구체적인 방법**\r\n- 객체가 필요한 의존성을 외부에서 주입받음\r\n\r\n**DI 방식 3가지**\r\n```java\r\n// 1. 생성자 주입 (권장)\r\n@RequiredArgsConstructor\r\npublic class OrderService {\r\n    private final OrderRepository orderRepository;\r\n}\r\n\r\n// 2. Setter 주입\r\n@Autowired\r\npublic void setOrderRepository(OrderRepository repo) { }\r\n\r\n// 3. 필드 주입 (비권장)\r\n@Autowired\r\nprivate OrderRepository orderRepository;\r\n```\r\n\r\n**생성자 주입이 권장되는 이유**\r\n- **불변성**: final 키워드 사용 가능\r\n- **테스트 용이**: Mock 객체 쉽게 주입\r\n- **순환 참조 조기 발견**: 애플리케이션 시작 시점에 실패하여 즉시 인지 가능\r\n- **필수 의존성 명확화**: 생성 시점에 주입 필수\r\n\r\n**참고 (Spring Boot 2.6+)**\r\n- 순환 참조는 기본적으로 **금지**됨 (애플리케이션 시작 실패)\r\n- 허용하려면 `spring.main.allow-circular-references=true` 설정 필요\r\n- 순환 참조 자체를 피하는 설계가 권장됨 (의존 방향 재설계, 이벤트 사용 등)\r\n\r\n**IoC/DI의 이점**\r\n1. 느슨한 결합 (Loose Coupling)\r\n2. 테스트 용이성 (Mock 주입)\r\n3. 코드 재사용성 향상\r\n4. 유지보수성 향상\r\n5. 구현체 교체 용이",
    "references": []
  },
  {
    "id": "SPRING-026",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Bean의 라이프사이클과 관련 콜백 메서드(@PostConstruct, @PreDestroy 등)에 대해 상세히 설명해주세요.",
    "answer": "**Bean 라이프사이클 단계**\r\n\r\n```\r\n스프링 컨테이너 생성 → Bean 생성 → 의존관계 주입 → 초기화 콜백 → 사용 → 소멸 콜백 → 스프링 종료\r\n```\r\n\r\n**초기화 콜백 (Bean 생성 후)**\r\n\r\n1. **@PostConstruct** (권장)\r\n   ```java\r\n   @PostConstruct\r\n   public void init() {\r\n       // 초기화 로직\r\n   }\r\n   ```\r\n\r\n2. **InitializingBean 인터페이스**\r\n   ```java\r\n   public void afterPropertiesSet() { }\r\n   ```\r\n\r\n3. **@Bean(initMethod = \"init\")**\r\n   ```java\r\n   @Bean(initMethod = \"init\")\r\n   public MyBean myBean() { }\r\n   ```\r\n\r\n**소멸 콜백 (컨테이너 종료 시)**\r\n\r\n1. **@PreDestroy** (권장)\r\n   ```java\r\n   @PreDestroy\r\n   public void destroy() {\r\n       // 리소스 정리\r\n   }\r\n   ```\r\n\r\n2. **DisposableBean 인터페이스**\r\n   ```java\r\n   public void destroy() { }\r\n   ```\r\n\r\n3. **@Bean(destroyMethod = \"close\")**\r\n\r\n**실행 순서**\r\n- 초기화: `@PostConstruct` → `InitializingBean` → `initMethod`\r\n- 소멸: `@PreDestroy` → `DisposableBean` → `destroyMethod`\r\n\r\n**권장 방식**\r\n- `@PostConstruct`, `@PreDestroy` 사용\r\n- 자바 표준(JSR-250)으로 스프링에 의존하지 않음\r\n- 코드 수정 불가 시 `@Bean`의 initMethod/destroyMethod 사용\r\n\r\n**주의사항**\r\n- `@PostConstruct`에서 다른 Bean을 호출할 때 해당 Bean이 완전히 초기화되지 않았을 수 있음\r\n- 복잡한 초기화 로직은 `ApplicationRunner` 또는 `SmartInitializingSingleton` 사용 권장",
    "references": []
  },
  {
    "id": "SPRING-027",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "@Component, @Service, @Repository의 차이점 및 사용 사례는 무엇인가요?",
    "answer": "**기본 관계**\r\n```\r\n@Component (부모)\r\n    ├── @Service\r\n    ├── @Repository\r\n    └── @Controller\r\n```\r\n\r\n세 어노테이션 모두 `@Component`를 메타 어노테이션으로 가지며, **컴포넌트 스캔 대상**이 됩니다.\r\n\r\n**각 어노테이션의 역할**\r\n\r\n| 어노테이션 | 계층 | 역할 |\r\n|-----------|------|------|\r\n| `@Component` | 범용 | 일반적인 스프링 빈 등록 |\r\n| `@Service` | 서비스 계층 | 비즈니스 로직 처리 |\r\n| `@Repository` | 영속성 계층 | 데이터 접근 로직 (DAO) |\r\n| `@Controller` | 표현 계층 | HTTP 요청/응답 처리 |\r\n\r\n**@Repository의 특별한 기능**\r\n- **예외 변환**: DB 관련 예외를 `DataAccessException`으로 자동 변환\r\n- JPA, JDBC 등 기술에 종속적인 예외를 스프링 예외로 추상화\r\n- `PersistenceExceptionTranslationPostProcessor`가 이 변환을 담당\r\n\r\n**@Service의 역할**\r\n- 현재 특별한 추가 기능은 없음\r\n- 비즈니스 계층임을 **의미적으로 표현**\r\n- 향후 AOP 등에서 특별 처리 가능성\r\n\r\n**@Component vs @Bean 트레이드오프**\r\n| 구분 | @Component | @Bean |\r\n|------|------------|-------|\r\n| 적용 대상 | 클래스 레벨 | 메서드 레벨 (@Configuration 내) |\r\n| Bean 이름 | 클래스명 (첫 글자 소문자) | 메서드명 |\r\n| 외부 라이브러리 | 사용 불가 | 사용 가능 |\r\n| 조건부 생성 | @Conditional 필요 | 메서드 내 로직으로 제어 가능 |\r\n\r\n**사용 예시**\r\n```java\r\n@Repository\r\npublic class UserRepository { }  // DB 접근\r\n\r\n@Service\r\npublic class UserService { }     // 비즈니스 로직\r\n\r\n@Controller\r\npublic class UserController { }  // 요청 처리\r\n```\r\n\r\n**@Component 직접 사용 시**\r\n- 특정 계층에 속하지 않는 유틸리티 클래스\r\n- 예: 이메일 발송기, 암호화 유틸 등",
    "references": []
  },
  {
    "id": "SPRING-028",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "AOP(Aspect Oriented Programming)를 활용한 공통 관심사(Cross-Cutting Concerns) 분리 방법에 대해 설명해주세요.",
    "answer": "**공통 관심사 (Cross-Cutting Concerns)**\r\n- 여러 모듈에 걸쳐 반복되는 부가 기능\r\n- 예: 로깅, 트랜잭션, 보안, 성능 측정\r\n\r\n**AOP로 분리하는 방법**\r\n\r\n1. **Aspect 정의**\r\n```java\r\n@Aspect\r\n@Component\r\npublic class LoggingAspect {\r\n\r\n    // Pointcut: 어디에 적용할지\r\n    @Pointcut(\"execution(* com.example.service.*.*(..))\")\r\n    public void serviceLayer() {}\r\n\r\n    // Advice: 무엇을 할지\r\n    @Around(\"serviceLayer()\")\r\n    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {\r\n        long start = System.currentTimeMillis();\r\n\r\n        Object result = joinPoint.proceed(); // 실제 메서드 실행\r\n\r\n        long executionTime = System.currentTimeMillis() - start;\r\n        log.info(\"{} executed in {}ms\", joinPoint.getSignature(), executionTime);\r\n\r\n        return result;\r\n    }\r\n}\r\n```\r\n\r\n**Pointcut 표현식 예시**\r\n\r\n| 표현식 | 설명 |\r\n|--------|------|\r\n| `execution(* com.example..*.*(..))` | 모든 메서드 |\r\n| `@annotation(LogExecutionTime)` | 특정 어노테이션 붙은 메서드 |\r\n| `within(com.example.service.*)` | 특정 패키지 내 모든 메서드 |\r\n| `bean(*Service)` | 이름이 Service로 끝나는 Bean |\r\n\r\n**활용 예시**\r\n\r\n| 관심사 | 구현 방식 |\r\n|--------|-----------|\r\n| 로깅 | @Around로 메서드 실행 전후 로깅 |\r\n| 성능 측정 | @Around로 실행 시간 측정 |\r\n| 권한 체크 | @Before로 진입 전 권한 검증 |\r\n| 예외 처리 | @AfterThrowing으로 예외 로깅 |\r\n| 트랜잭션 | @Transactional (내부적으로 AOP) |",
    "references": []
  },
  {
    "id": "SPRING-029",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring에서 트랜잭션 관리 방식과 @Transactional 어노테이션의 주요 속성(propagation, isolation 등)에 대해 설명해주세요.",
    "answer": "**트랜잭션 관리 방식**\r\n\r\n1. **프로그래밍 방식** (명시적)\r\n   ```java\r\n   transactionTemplate.execute(status -> {\r\n       // 비즈니스 로직\r\n       return result;\r\n   });\r\n   ```\r\n\r\n2. **선언적 방식** (권장)\r\n   ```java\r\n   @Transactional\r\n   public void updateUser() { }\r\n   ```\r\n\r\n**@Transactional 동작 원리**\r\n- **AOP 프록시** 기반으로 동작\r\n- 메서드 호출 전: 트랜잭션 시작\r\n- 정상 완료: 커밋\r\n- 예외 발생: 롤백\r\n\r\n**주요 속성**\r\n\r\n| 속성 | 설명 | 기본값 |\r\n|------|------|--------|\r\n| propagation | 전파 방식 | REQUIRED |\r\n| isolation | 격리 수준 | DEFAULT |\r\n| timeout | 타임아웃(초) | -1 (무제한) |\r\n| readOnly | 읽기 전용 | false |\r\n| rollbackFor | 롤백할 예외 | RuntimeException |\r\n\r\n**전파 속성 (Propagation)**\r\n```java\r\nREQUIRED     // 기존 트랜잭션 참여, 없으면 새로 생성\r\nREQUIRES_NEW // 항상 새 트랜잭션 (기존 것 일시 정지)\r\nNESTED       // 중첩 트랜잭션 (Savepoint)\r\nSUPPORTS     // 있으면 참여, 없으면 없이 실행\r\nMANDATORY    // 반드시 기존 트랜잭션 필요\r\nNOT_SUPPORTED // 트랜잭션 없이 실행\r\nNEVER        // 트랜잭션 있으면 예외\r\n```\r\n\r\n**주의사항**\r\n- public 메서드에만 적용 (Spring 6+에서는 protected도 가능)\r\n- self-invocation 시 프록시 우회 → `AopContext.currentProxy()` 또는 자기 자신 주입으로 해결\r\n- Checked Exception은 기본 롤백 안 함\r\n\r\n**전파 속성 사용 시 주의**\r\n- `REQUIRES_NEW`는 **새 DB 커넥션**을 사용하므로 커넥션 풀 고갈 주의\r\n- `NESTED`는 JDBC Savepoint 지원 DB에서만 동작 (JPA에서는 제한적)",
    "references": []
  },
  {
    "id": "SPRING-030",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring MVC 아키텍처의 구성 요소와 요청 처리 과정을 설명해주세요.",
    "answer": "**Spring MVC 핵심 구성 요소**\r\n\r\n| 구성 요소 | 역할 |\r\n|-----------|------|\r\n| DispatcherServlet | 프론트 컨트롤러, 모든 요청의 진입점 |\r\n| HandlerMapping | URL → 핸들러(Controller) 매핑 |\r\n| HandlerAdapter | 다양한 핸들러 실행 방식 지원 |\r\n| Controller | 비즈니스 로직 처리 |\r\n| ViewResolver | 뷰 이름 → 실제 View 변환 |\r\n| View | 응답 렌더링 |\r\n\r\n**요청 처리 흐름**\r\n\r\n```\r\n1. 클라이언트 요청\r\n        ↓\r\n2. DispatcherServlet (Front Controller)\r\n        ↓\r\n3. HandlerMapping → 핸들러 조회\r\n        ↓\r\n4. HandlerAdapter → 핸들러 실행\r\n        ↓\r\n5. Controller → 비즈니스 로직 수행\r\n        ↓\r\n6. ModelAndView 반환\r\n        ↓\r\n7. ViewResolver → View 객체 반환\r\n        ↓\r\n8. View → 렌더링\r\n        ↓\r\n9. 클라이언트 응답\r\n```\r\n\r\n**REST API의 경우 (@RestController)**\r\n```\r\n요청 → DispatcherServlet → HandlerMapping → HandlerAdapter\r\n    → Controller → HttpMessageConverter → JSON 응답\r\n```\r\n- ViewResolver 단계 생략\r\n- `@ResponseBody`로 객체를 JSON으로 직렬화\r\n\r\n**주요 HandlerMapping**\r\n- `RequestMappingHandlerMapping`: @RequestMapping 기반 (가장 일반적)\r\n- `BeanNameUrlHandlerMapping`: Bean 이름 기반\r\n\r\n**주요 HandlerAdapter**\r\n- `RequestMappingHandlerAdapter`: @RequestMapping 처리",
    "references": []
  },
  {
    "id": "SPRING-031",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Boot의 자동 구성(Auto-Configuration) 원리에 대해 설명해주세요.",
    "answer": "**Auto-Configuration이란?**\r\n- 클래스패스, 설정값, Bean 존재 여부 등을 기반으로 **자동으로 Bean을 등록**하는 기능\r\n- 개발자가 직접 설정하지 않아도 필요한 설정이 자동 적용\r\n\r\n**동작 원리**\r\n\r\n1. **@SpringBootApplication**\r\n   ```java\r\n   @SpringBootConfiguration\r\n   @EnableAutoConfiguration  // 자동 구성 활성화\r\n   @ComponentScan\r\n   ```\r\n\r\n2. **spring.factories / AutoConfiguration.imports 파일**\r\n   - `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`\r\n   - 자동 구성 클래스 목록이 정의됨\r\n\r\n3. **조건부 설정 (@Conditional)**\r\n   ```java\r\n   @Configuration\r\n   @ConditionalOnClass(DataSource.class)  // 클래스 존재 시\r\n   @ConditionalOnMissingBean(DataSource.class)  // Bean 없을 때만\r\n   public class DataSourceAutoConfiguration { }\r\n   ```\r\n\r\n**주요 @Conditional 어노테이션**\r\n\r\n| 어노테이션 | 조건 |\r\n|------------|------|\r\n| @ConditionalOnClass | 특정 클래스가 클래스패스에 있을 때 |\r\n| @ConditionalOnMissingBean | 해당 Bean이 없을 때 |\r\n| @ConditionalOnProperty | 특정 프로퍼티 값일 때 |\r\n| @ConditionalOnWebApplication | 웹 애플리케이션일 때 |\r\n\r\n**예시: DataSource 자동 구성**\r\n1. `spring-boot-starter-jdbc` 의존성 추가\r\n2. 클래스패스에 `DataSource.class` 존재\r\n3. `DataSourceAutoConfiguration` 활성화\r\n4. `application.yml`의 설정으로 DataSource Bean 생성\r\n\r\n**자동 구성 비활성화**\r\n```java\r\n@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})\r\n```",
    "references": []
  },
  {
    "id": "SPRING-032",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring MVC에서 전역 예외 처리를 위한 @ControllerAdvice의 역할과 활용 방법은 무엇인가요?",
    "answer": "**@ControllerAdvice란?**\r\n- **전역 예외 처리**를 담당하는 클래스\r\n- 모든 컨트롤러에서 발생하는 예외를 한 곳에서 처리\r\n- AOP 기반으로 동작\r\n\r\n**기본 사용법**\r\n```java\r\n@RestControllerAdvice  // @ControllerAdvice + @ResponseBody\r\npublic class GlobalExceptionHandler {\r\n\r\n    @ExceptionHandler(IllegalArgumentException.class)\r\n    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException e) {\r\n        return ResponseEntity.badRequest()\r\n            .body(new ErrorResponse(\"BAD_REQUEST\", e.getMessage()));\r\n    }\r\n\r\n    @ExceptionHandler(Exception.class)\r\n    public ResponseEntity<ErrorResponse> handleException(Exception e) {\r\n        return ResponseEntity.internalServerError()\r\n            .body(new ErrorResponse(\"INTERNAL_ERROR\", \"서버 오류 발생\"));\r\n    }\r\n}\r\n```\r\n\r\n**주요 기능**\r\n\r\n1. **@ExceptionHandler**: 특정 예외 처리\r\n2. **@ModelAttribute**: 모든 컨트롤러에 공통 모델 데이터 추가\r\n3. **@InitBinder**: 요청 파라미터 바인딩 커스터마이징\r\n\r\n**적용 범위 제한**\r\n```java\r\n// 특정 패키지만 적용\r\n@ControllerAdvice(\"com.example.api\")\r\n\r\n// 특정 어노테이션이 붙은 컨트롤러만\r\n@ControllerAdvice(annotations = RestController.class)\r\n\r\n// 특정 컨트롤러만\r\n@ControllerAdvice(assignableTypes = {UserController.class})\r\n```\r\n\r\n**예외 처리 우선순위**\r\n1. 컨트롤러 내 `@ExceptionHandler`\r\n2. `@ControllerAdvice` 내 `@ExceptionHandler`\r\n3. 더 구체적인 예외가 우선",
    "references": []
  },
  {
    "id": "SPRING-033",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Security의 기본 개념과 인증/인가 처리 흐름에 대해 설명해주세요.",
    "answer": "**Spring Security란?**\r\n- 인증(Authentication)과 인가(Authorization)를 담당하는 보안 프레임워크\r\n- **Filter 기반**으로 동작\r\n\r\n**인증 vs 인가**\r\n| 구분 | 인증 (Authentication) | 인가 (Authorization) |\r\n|------|----------------------|---------------------|\r\n| 의미 | 누구인지 확인 | 권한이 있는지 확인 |\r\n| 예시 | 로그인 | 관리자 페이지 접근 권한 |\r\n\r\n**핵심 구성 요소**\r\n\r\n| 구성 요소 | 역할 |\r\n|-----------|------|\r\n| SecurityFilterChain | 보안 필터 체인 |\r\n| AuthenticationManager | 인증 처리 관리 |\r\n| UserDetailsService | 사용자 정보 로드 |\r\n| PasswordEncoder | 비밀번호 암호화 |\r\n\r\n**인증 처리 흐름**\r\n```\r\n1. HTTP 요청\r\n        ↓\r\n2. UsernamePasswordAuthenticationFilter\r\n        ↓\r\n3. AuthenticationManager.authenticate()\r\n        ↓\r\n4. AuthenticationProvider\r\n        ↓\r\n5. UserDetailsService.loadUserByUsername()\r\n        ↓\r\n6. 비밀번호 검증 (PasswordEncoder)\r\n        ↓\r\n7. Authentication 객체 생성\r\n        ↓\r\n8. SecurityContextHolder에 저장\r\n```\r\n\r\n**기본 설정 예시**\r\n```java\r\n@Configuration\r\n@EnableWebSecurity\r\npublic class SecurityConfig {\r\n\r\n    @Bean\r\n    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\r\n        http\r\n            .authorizeHttpRequests(auth -> auth\r\n                .requestMatchers(\"/admin/**\").hasRole(\"ADMIN\")\r\n                .requestMatchers(\"/api/**\").authenticated()\r\n                .anyRequest().permitAll()\r\n            )\r\n            .formLogin(withDefaults())\r\n            .httpBasic(withDefaults());\r\n        return http.build();\r\n    }\r\n}\r\n```",
    "references": []
  },
  {
    "id": "SPRING-034",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "RESTful API를 Spring에서 구현하는 방법과 모범 사례는 무엇인가요?",
    "answer": "**RESTful API 구현 기본**\r\n\r\n```java\r\n@RestController\r\n@RequestMapping(\"/api/users\")\r\npublic class UserController {\r\n\r\n    @GetMapping\r\n    public List<UserDto> getUsers() { }\r\n\r\n    @GetMapping(\"/{id}\")\r\n    public UserDto getUser(@PathVariable Long id) { }\r\n\r\n    @PostMapping\r\n    @ResponseStatus(HttpStatus.CREATED)\r\n    public UserDto createUser(@RequestBody @Valid CreateUserRequest request) { }\r\n\r\n    @PutMapping(\"/{id}\")\r\n    public UserDto updateUser(@PathVariable Long id, @RequestBody UpdateUserRequest request) { }\r\n\r\n    @DeleteMapping(\"/{id}\")\r\n    @ResponseStatus(HttpStatus.NO_CONTENT)\r\n    public void deleteUser(@PathVariable Long id) { }\r\n}\r\n```\r\n\r\n**REST 설계 모범 사례**\r\n\r\n1. **명사형 URI 사용**\r\n   - Good: `/api/users`, `/api/orders`\r\n   - Bad: `/api/getUsers`, `/api/createOrder`\r\n\r\n2. **HTTP 메서드 의미 준수**\r\n   | 메서드 | 용도 | 멱등성 |\r\n   |--------|------|--------|\r\n   | GET | 조회 | O |\r\n   | POST | 생성 | X |\r\n   | PUT | 전체 수정 | O |\r\n   | PATCH | 부분 수정 | O |\r\n   | DELETE | 삭제 | O |\r\n\r\n3. **적절한 상태 코드 반환**\r\n   - 200: 성공, 201: 생성됨, 204: 내용 없음\r\n   - 400: 잘못된 요청, 401: 인증 필요 (Unauthenticated), 403: 권한 없음 (Unauthorized), 404: 없음\r\n   - 409: 충돌 (리소스 상태 충돌), 422: 처리 불가 (유효성 검증 실패)\r\n\r\n4. **일관된 응답 형식**\r\n   ```json\r\n   {\r\n     \"status\": \"success\",\r\n     \"data\": { ... },\r\n     \"message\": null\r\n   }\r\n   ```\r\n\r\n5. **페이징 처리**\r\n   ```java\r\n   @GetMapping\r\n   public Page<UserDto> getUsers(Pageable pageable) { }\r\n   // GET /api/users?page=0&size=20&sort=createdAt,desc\r\n   ```\r\n\r\n6. **버전 관리**\r\n   - URI: `/api/v1/users`\r\n   - Header: `Accept: application/vnd.api.v1+json`",
    "references": []
  },
  {
    "id": "SPRING-035",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Boot Actuator를 통한 애플리케이션 모니터링 방법은 무엇인가요?",
    "answer": "**Spring Boot Actuator란?**\r\n- 애플리케이션의 **상태, 메트릭, 헬스체크** 등을 모니터링하는 기능 제공\r\n- 운영 환경에서 애플리케이션 관리를 위한 HTTP 엔드포인트 제공\r\n\r\n**의존성 추가**\r\n```xml\r\n<dependency>\r\n    <groupId>org.springframework.boot</groupId>\r\n    <artifactId>spring-boot-starter-actuator</artifactId>\r\n</dependency>\r\n```\r\n\r\n**주요 엔드포인트**\r\n\r\n| 엔드포인트 | 설명 | 기본 노출 |\r\n|------------|------|-----------|\r\n| /actuator/health | 애플리케이션 상태 | O |\r\n| /actuator/info | 애플리케이션 정보 | O |\r\n| /actuator/metrics | 메트릭 정보 | X |\r\n| /actuator/env | 환경 변수 | X |\r\n| /actuator/loggers | 로거 설정 (동적 변경 가능) | X |\r\n| /actuator/beans | 등록된 Bean 목록 | X |\r\n| /actuator/threaddump | 스레드 덤프 | X |\r\n| /actuator/heapdump | 힙 덤프 | X |\r\n\r\n**주의**: 민감한 엔드포인트는 기본적으로 비활성화되어 있으며, 운영 환경에서는 보안 설정 필수\r\n\r\n**설정 예시**\r\n```yaml\r\nmanagement:\r\n  endpoints:\r\n    web:\r\n      exposure:\r\n        include: health, info, metrics, prometheus\r\n  endpoint:\r\n    health:\r\n      show-details: always  # 상세 정보 표시\r\n```\r\n\r\n**Prometheus + Grafana 연동**\r\n```xml\r\n<dependency>\r\n    <groupId>io.micrometer</groupId>\r\n    <artifactId>micrometer-registry-prometheus</artifactId>\r\n</dependency>\r\n```\r\n- `/actuator/prometheus` 엔드포인트 활성화\r\n- Prometheus가 메트릭 수집 → Grafana로 시각화\r\n\r\n**보안 설정**\r\n- 운영 환경에서는 민감 엔드포인트 접근 제한 필요\r\n- Spring Security와 연동하여 인증 적용",
    "references": []
  },
  {
    "id": "SPRING-036",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Cloud를 활용한 마이크로서비스 아키텍처 구현 전략에 대해 설명해주세요.",
    "answer": "**Spring Cloud란?**\r\n- 마이크로서비스 아키텍처(MSA) 구축을 위한 **도구 모음**\r\n- 분산 시스템의 공통 패턴들을 쉽게 구현\r\n\r\n**핵심 구성 요소**\r\n\r\n| 컴포넌트 | 역할 | 구현체 |\r\n|----------|------|--------|\r\n| Service Discovery | 서비스 등록/발견 | Eureka, Consul |\r\n| API Gateway | 라우팅, 인증, 로드밸런싱 | Spring Cloud Gateway |\r\n| Config Server | 중앙 집중식 설정 관리 | Spring Cloud Config |\r\n| Circuit Breaker | 장애 전파 방지 | Resilience4j |\r\n| Distributed Tracing | 분산 추적 | Zipkin, Jaeger |\r\n\r\n**1. Service Discovery (Eureka)**\r\n```java\r\n// 서비스 등록 (Spring Cloud 2021.0.0+에서는 @EnableEurekaClient 불필요)\r\n@SpringBootApplication\r\npublic class UserServiceApplication { }\r\n// spring-cloud-starter-netflix-eureka-client 의존성만 있으면 자동 등록\r\n\r\n// 서비스 발견\r\n@FeignClient(name = \"order-service\")\r\npublic interface OrderClient {\r\n    @GetMapping(\"/orders/{userId}\")\r\n    List<Order> getOrders(@PathVariable Long userId);\r\n}\r\n```\r\n\r\n**2. API Gateway**\r\n```yaml\r\nspring:\r\n  cloud:\r\n    gateway:\r\n      routes:\r\n        - id: user-service\r\n          uri: lb://USER-SERVICE\r\n          predicates:\r\n            - Path=/api/users/**\r\n```\r\n\r\n**3. Circuit Breaker (Resilience4j)**\r\n```java\r\n@CircuitBreaker(name = \"orderService\", fallbackMethod = \"fallback\")\r\npublic List<Order> getOrders(Long userId) { }\r\n\r\npublic List<Order> fallback(Long userId, Exception e) {\r\n    return Collections.emptyList();\r\n}\r\n```\r\n\r\n**4. Config Server**\r\n- Git 저장소에 설정 파일 관리\r\n- 애플리케이션 재시작 없이 설정 변경 가능\r\n\r\n**MSA 구현 시 고려사항**\r\n- 서비스 간 통신: REST, gRPC, 메시지 큐\r\n- 데이터 일관성: Saga 패턴, 이벤트 소싱\r\n- 장애 대응: 타임아웃, 재시도, 폴백",
    "references": []
  },
  {
    "id": "SPRING-037",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring에서 메시징 시스템(Kafka, RabbitMQ 등)과의 연동 방법은 무엇인가요?",
    "answer": "**메시징 시스템 사용 이유**\r\n- 서비스 간 비동기 통신\r\n- 시스템 간 결합도 감소\r\n- 부하 분산 및 버퍼링\r\n\r\n**1. Spring Kafka 연동**\r\n\r\n```xml\r\n<dependency>\r\n    <groupId>org.springframework.kafka</groupId>\r\n    <artifactId>spring-kafka</artifactId>\r\n</dependency>\r\n```\r\n\r\n```yaml\r\nspring:\r\n  kafka:\r\n    bootstrap-servers: localhost:9092\r\n    consumer:\r\n      group-id: my-group\r\n```\r\n\r\n```java\r\n// Producer\r\n@Service\r\npublic class KafkaProducer {\r\n    private final KafkaTemplate<String, String> kafkaTemplate;\r\n\r\n    public void send(String topic, String message) {\r\n        kafkaTemplate.send(topic, message);\r\n    }\r\n}\r\n\r\n// Consumer\r\n@KafkaListener(topics = \"my-topic\", groupId = \"my-group\")\r\npublic void consume(String message) {\r\n    log.info(\"Received: {}\", message);\r\n}\r\n```\r\n\r\n**2. Spring AMQP (RabbitMQ) 연동**\r\n\r\n```xml\r\n<dependency>\r\n    <groupId>org.springframework.boot</groupId>\r\n    <artifactId>spring-boot-starter-amqp</artifactId>\r\n</dependency>\r\n```\r\n\r\n```java\r\n// Producer\r\n@Service\r\npublic class RabbitProducer {\r\n    private final RabbitTemplate rabbitTemplate;\r\n\r\n    public void send(String exchange, String routingKey, String message) {\r\n        rabbitTemplate.convertAndSend(exchange, routingKey, message);\r\n    }\r\n}\r\n\r\n// Consumer\r\n@RabbitListener(queues = \"my-queue\")\r\npublic void consume(String message) {\r\n    log.info(\"Received: {}\", message);\r\n}\r\n```\r\n\r\n**Kafka vs RabbitMQ**\r\n\r\n| 구분 | Kafka | RabbitMQ |\r\n|------|-------|----------|\r\n| 처리량 | 높음 (대용량) | 중간 |\r\n| 메시지 저장 | 디스크에 영구 저장 | 메모리 우선 |\r\n| 순서 보장 | 파티션 내 보장 | 큐 내 보장 |\r\n| 적합 용도 | 이벤트 스트리밍, 로그 | 작업 큐, RPC |",
    "references": []
  },
  {
    "id": "SPRING-038",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring의 캐싱 추상화(Cache Abstraction)와 캐시 적용 방법에 대해 설명해주세요.",
    "answer": "**Spring Cache Abstraction이란?**\r\n- 캐시 구현체에 독립적인 **추상화 계층** 제공\r\n- 어노테이션 기반으로 간편하게 캐시 적용\r\n- 구현체: ConcurrentHashMap, Ehcache, Redis, Caffeine 등\r\n\r\n**활성화**\r\n```java\r\n@EnableCaching\r\n@SpringBootApplication\r\npublic class Application { }\r\n```\r\n\r\n**주요 어노테이션**\r\n\r\n| 어노테이션 | 역할 |\r\n|------------|------|\r\n| @Cacheable | 캐시 조회, 없으면 메서드 실행 후 저장 |\r\n| @CachePut | 항상 메서드 실행 후 캐시 저장 |\r\n| @CacheEvict | 캐시 삭제 |\r\n| @Caching | 여러 캐시 작업 조합 |\r\n\r\n**사용 예시**\r\n```java\r\n@Service\r\npublic class UserService {\r\n\r\n    // 캐시 조회, 없으면 DB 조회 후 캐시\r\n    @Cacheable(value = \"users\", key = \"#id\")\r\n    public User getUser(Long id) {\r\n        return userRepository.findById(id);\r\n    }\r\n\r\n    // 항상 실행 후 캐시 갱신\r\n    @CachePut(value = \"users\", key = \"#user.id\")\r\n    public User updateUser(User user) {\r\n        return userRepository.save(user);\r\n    }\r\n\r\n    // 캐시 삭제\r\n    @CacheEvict(value = \"users\", key = \"#id\")\r\n    public void deleteUser(Long id) {\r\n        userRepository.deleteById(id);\r\n    }\r\n\r\n    // 전체 캐시 삭제\r\n    @CacheEvict(value = \"users\", allEntries = true)\r\n    public void clearCache() { }\r\n}\r\n```\r\n\r\n**Redis 캐시 설정**\r\n```yaml\r\nspring:\r\n  cache:\r\n    type: redis\r\n  redis:\r\n    host: localhost\r\n    port: 6379\r\n```\r\n\r\n**주의사항**\r\n- **Self-invocation**: 같은 클래스 내 호출 시 캐시 미적용 (프록시 우회)\r\n- **캐시 키 설계**: 충돌 방지를 위해 명확한 키 전략 필요\r\n- **TTL 설정**: 데이터 정합성을 위해 만료 시간 설정 권장\r\n- **@Cacheable과 @Transactional**: 둘 다 프록시 기반이므로 순서 주의 (외부 호출부터 적용)\r\n\r\n**캐시 무효화 전략**\r\n- **Cache-Aside**: 애플리케이션이 캐시 관리 (가장 일반적)\r\n- **Write-Through**: 쓰기 시 캐시도 함께 업데이트\r\n- **이벤트 기반**: 데이터 변경 이벤트로 캐시 무효화",
    "references": []
  },
  {
    "id": "SPRING-039",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Boot에서 프로파일(Profile) 관리와 환경별 설정 적용 방법은 무엇인가요?",
    "answer": "**Spring Profile이란?**\r\n- 환경별(개발, 테스트, 운영)로 다른 설정을 적용하는 기능\r\n- Bean, 설정 파일을 환경별로 분리 가능\r\n\r\n**프로파일 설정 방법**\r\n\r\n**1. 설정 파일 분리**\r\n```\r\napplication.yml          # 공통 설정\r\napplication-dev.yml      # 개발 환경\r\napplication-prod.yml     # 운영 환경\r\napplication-test.yml     # 테스트 환경\r\n```\r\n\r\n**2. 프로파일 활성화**\r\n```yaml\r\n# application.yml\r\nspring:\r\n  profiles:\r\n    active: dev\r\n```\r\n\r\n```bash\r\n# 실행 시 지정\r\njava -jar app.jar --spring.profiles.active=prod\r\n\r\n# 환경 변수\r\nexport SPRING_PROFILES_ACTIVE=prod\r\n```\r\n\r\n**3. 환경별 Bean 등록**\r\n```java\r\n@Configuration\r\n@Profile(\"dev\")\r\npublic class DevConfig {\r\n    @Bean\r\n    public DataSource dataSource() {\r\n        // H2 인메모리 DB\r\n    }\r\n}\r\n\r\n@Configuration\r\n@Profile(\"prod\")\r\npublic class ProdConfig {\r\n    @Bean\r\n    public DataSource dataSource() {\r\n        // MySQL 설정\r\n    }\r\n}\r\n```\r\n\r\n**4. 프로파일 그룹**\r\n```yaml\r\nspring:\r\n  profiles:\r\n    group:\r\n      prod: prod-db, prod-cache, prod-logging\r\n```\r\n\r\n**환경별 설정 예시**\r\n```yaml\r\n# application-dev.yml\r\nspring:\r\n  datasource:\r\n    url: jdbc:h2:mem:testdb\r\nlogging:\r\n  level:\r\n    root: DEBUG\r\n\r\n# application-prod.yml\r\nspring:\r\n  datasource:\r\n    url: jdbc:mysql://prod-db:3306/app\r\nlogging:\r\n  level:\r\n    root: WARN\r\n```\r\n\r\n**@Profile 사용**\r\n```java\r\n@Service\r\n@Profile(\"!prod\")  // prod가 아닐 때만 활성화\r\npublic class MockEmailService implements EmailService { }\r\n```",
    "references": []
  },
  {
    "id": "SPRING-040",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Bean의 Scope(싱글톤, 프로토타입, request, session 등) 차이점과 활용 사례는 무엇인가요?",
    "answer": "**Bean Scope 종류**\r\n\r\n| Scope | 설명 | 생명주기 관리 |\r\n|-------|------|---------------|\r\n| singleton | 컨테이너당 하나 (기본값) | 컨테이너 전체 |\r\n| prototype | 요청마다 새로 생성 | 생성까지만 |\r\n| request | HTTP 요청당 하나 | 요청 범위 |\r\n| session | HTTP 세션당 하나 | 세션 범위 |\r\n| application | ServletContext당 하나 | 앱 전체 |\r\n| websocket | WebSocket 세션당 하나 | WebSocket 범위 |\r\n\r\n**1. Singleton (기본값)**\r\n```java\r\n@Component  // 기본 싱글톤\r\npublic class UserService { }\r\n```\r\n- **활용**: 상태 없는(stateless) 서비스, 레포지토리\r\n- **주의**: 인스턴스 변수에 상태 저장 금지\r\n\r\n**2. Prototype**\r\n```java\r\n@Component\r\n@Scope(\"prototype\")\r\npublic class RequestContext { }\r\n```\r\n- **활용**: 상태를 가지는 객체, 매번 새 인스턴스 필요 시\r\n- **주의**: @PreDestroy 호출 안 됨\r\n\r\n**3. Request/Session (웹 스코프)**\r\n```java\r\n@Component\r\n@Scope(value = \"request\", proxyMode = ScopedProxyMode.TARGET_CLASS)\r\npublic class RequestLogger { }\r\n```\r\n- **활용**: 사용자별 데이터, 요청 로깅\r\n\r\n**싱글톤에서 프로토타입 주입 문제**\r\n```java\r\n@Component\r\npublic class SingletonBean {\r\n    @Autowired\r\n    private PrototypeBean prototypeBean;  // 한 번만 주입됨!\r\n}\r\n\r\n// 해결: ObjectProvider 사용\r\n@Component\r\npublic class SingletonBean {\r\n    @Autowired\r\n    private ObjectProvider<PrototypeBean> provider;\r\n\r\n    public void logic() {\r\n        PrototypeBean bean = provider.getObject();  // 매번 새 인스턴스\r\n    }\r\n}\r\n```",
    "references": []
  },
  {
    "id": "SPRING-041",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring의 이벤트 발행(ApplicationEventPublisher) 및 리스너(@EventListener) 메커니즘에 대해 설명해주세요.",
    "answer": "**Spring Event란?**\r\n- 애플리케이션 내 **느슨한 결합**으로 컴포넌트 간 통신\r\n- **Observer 패턴** 기반\r\n- 발행자(Publisher)와 구독자(Listener) 분리\r\n\r\n**이벤트 정의**\r\n```java\r\n// 커스텀 이벤트\r\npublic class OrderCreatedEvent {\r\n    private final Long orderId;\r\n    private final Long userId;\r\n\r\n    public OrderCreatedEvent(Long orderId, Long userId) {\r\n        this.orderId = orderId;\r\n        this.userId = userId;\r\n    }\r\n}\r\n```\r\n\r\n**이벤트 발행**\r\n```java\r\n@Service\r\n@RequiredArgsConstructor\r\npublic class OrderService {\r\n    private final ApplicationEventPublisher eventPublisher;\r\n\r\n    @Transactional\r\n    public void createOrder(OrderRequest request) {\r\n        Order order = orderRepository.save(new Order(request));\r\n\r\n        // 이벤트 발행\r\n        eventPublisher.publishEvent(new OrderCreatedEvent(order.getId(), request.getUserId()));\r\n    }\r\n}\r\n```\r\n\r\n**이벤트 리스너**\r\n```java\r\n@Component\r\npublic class OrderEventListener {\r\n\r\n    // 동기 처리 (기본)\r\n    @EventListener\r\n    public void handleOrderCreated(OrderCreatedEvent event) {\r\n        log.info(\"Order created: {}\", event.getOrderId());\r\n    }\r\n\r\n    // 비동기 처리\r\n    @Async\r\n    @EventListener\r\n    public void sendEmailAsync(OrderCreatedEvent event) {\r\n        emailService.sendOrderConfirmation(event.getUserId());\r\n    }\r\n\r\n    // 조건부 처리\r\n    @EventListener(condition = \"#event.orderId > 100\")\r\n    public void handleLargeOrder(OrderCreatedEvent event) { }\r\n}\r\n```\r\n\r\n**트랜잭션 연동**\r\n```java\r\n// 트랜잭션 커밋 후 실행\r\n@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)\r\npublic void afterCommit(OrderCreatedEvent event) { }\r\n\r\n// 트랜잭션 롤백 시 실행\r\n@TransactionalEventListener(phase = TransactionPhase.AFTER_ROLLBACK)\r\npublic void afterRollback(OrderCreatedEvent event) { }\r\n```\r\n\r\n**활용 사례**\r\n- 주문 완료 → 이메일/알림 발송\r\n- 회원 가입 → 포인트 지급\r\n- 결제 완료 → 재고 차감",
    "references": []
  },
  {
    "id": "SPRING-042",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "커스텀 어노테이션을 생성하고 이를 Spring에서 활용하는 방법은 무엇인가요?",
    "answer": "**커스텀 어노테이션 생성**\r\n```java\r\n@Target(ElementType.METHOD)\r\n@Retention(RetentionPolicy.RUNTIME)\r\n@Documented\r\npublic @interface LogExecutionTime {\r\n    String value() default \"\";\r\n}\r\n```\r\n\r\n**메타 어노테이션 설명**\r\n| 어노테이션 | 역할 |\r\n|------------|------|\r\n| @Target | 적용 대상 (METHOD, TYPE, FIELD 등) |\r\n| @Retention | 유지 범위 (SOURCE, CLASS, RUNTIME) |\r\n| @Documented | JavaDoc에 포함 |\r\n| @Inherited | 상속 시 전달 |\r\n\r\n**활용 방법 1: AOP와 결합**\r\n```java\r\n@Aspect\r\n@Component\r\npublic class LoggingAspect {\r\n\r\n    @Around(\"@annotation(LogExecutionTime)\")\r\n    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {\r\n        long start = System.currentTimeMillis();\r\n\r\n        Object result = joinPoint.proceed();\r\n\r\n        long executionTime = System.currentTimeMillis() - start;\r\n        log.info(\"{} executed in {}ms\",\r\n            joinPoint.getSignature().getName(), executionTime);\r\n\r\n        return result;\r\n    }\r\n}\r\n\r\n// 사용\r\n@LogExecutionTime\r\npublic void processOrder() { }\r\n```\r\n\r\n**활용 방법 2: HandlerMethodArgumentResolver**\r\n```java\r\n// 현재 사용자 주입 어노테이션\r\n@Target(ElementType.PARAMETER)\r\n@Retention(RetentionPolicy.RUNTIME)\r\npublic @interface CurrentUser { }\r\n\r\n// Resolver 구현\r\npublic class CurrentUserArgumentResolver implements HandlerMethodArgumentResolver {\r\n\r\n    @Override\r\n    public boolean supportsParameter(MethodParameter parameter) {\r\n        return parameter.hasParameterAnnotation(CurrentUser.class);\r\n    }\r\n\r\n    @Override\r\n    public Object resolveArgument(...) {\r\n        return SecurityContextHolder.getContext().getAuthentication().getPrincipal();\r\n    }\r\n}\r\n\r\n// 사용\r\n@GetMapping(\"/profile\")\r\npublic UserDto getProfile(@CurrentUser User user) { }\r\n```\r\n\r\n**활용 방법 3: 조합 어노테이션**\r\n```java\r\n@Target(ElementType.TYPE)\r\n@Retention(RetentionPolicy.RUNTIME)\r\n@Service\r\n@Transactional(readOnly = true)\r\npublic @interface ReadOnlyService { }\r\n```",
    "references": []
  },
  {
    "id": "SPRING-043",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring WebFlux와 Spring MVC의 차이점 및 사용 시나리오는 무엇인가요?",
    "answer": "**핵심 차이점**\r\n\r\n| 구분 | Spring MVC | Spring WebFlux |\r\n|------|------------|----------------|\r\n| 프로그래밍 모델 | 동기/블로킹 | 비동기/논블로킹 |\r\n| 서버 | Tomcat (서블릿) | Netty (기본) |\r\n| 스레드 모델 | 요청당 스레드 | 이벤트 루프 |\r\n| 반환 타입 | Object, ResponseEntity | Mono, Flux |\r\n| 동시 처리 | 스레드 수에 비례 | 적은 스레드로 많은 요청 |\r\n\r\n**Spring WebFlux 코드 예시**\r\n```java\r\n@RestController\r\npublic class UserController {\r\n\r\n    @GetMapping(\"/user/{id}\")\r\n    public Mono<User> getUser(@PathVariable Long id) {\r\n        return userRepository.findById(id);\r\n    }\r\n\r\n    @GetMapping(\"/users\")\r\n    public Flux<User> getUsers() {\r\n        return userRepository.findAll();\r\n    }\r\n}\r\n```\r\n\r\n**Mono vs Flux**\r\n- **Mono**: 0~1개의 데이터 (단건)\r\n- **Flux**: 0~N개의 데이터 (스트림)\r\n\r\n**WebFlux 사용이 적합한 경우**\r\n1. **대규모 동시 접속**: 수만 개의 커넥션 처리\r\n2. **스트리밍 데이터**: 실시간 피드, SSE\r\n3. **마이크로서비스 게이트웨이**: 여러 서비스 호출 조합\r\n4. **I/O 집약적 작업**: 외부 API 호출이 많은 경우\r\n\r\n**Spring MVC가 더 나은 경우**\r\n1. **CPU 집약적 작업**: 복잡한 연산\r\n2. **JDBC/JPA 사용**: 블로킹 드라이버 (R2DBC 미사용 시)\r\n3. **기존 동기 라이브러리 의존**\r\n4. **팀의 학습 곡선 고려**\r\n5. **디버깅 용이성**: 동기 코드가 스택 트레이스 추적 쉬움\r\n\r\n**주의사항**\r\n- 전체 스택이 논블로킹이어야 효과 있음\r\n- 하나라도 블로킹 호출이 있으면 이벤트 루프 블록\r\n- R2DBC (리액티브 DB 드라이버) 필요\r\n\r\n**참고 (Java 21+)**\r\n- Virtual Threads를 사용하면 MVC에서도 높은 동시성 달성 가능\r\n- `spring.threads.virtual.enabled=true` 설정으로 활성화",
    "references": []
  },
  {
    "id": "SPRING-044",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring에서 비동기 처리(Asynchronous Processing)를 @Async와 CompletableFuture로 구현하는 방법에 대해 설명해주세요.",
    "answer": "**비동기 처리 활성화**\r\n```java\r\n@EnableAsync\r\n@SpringBootApplication\r\npublic class Application { }\r\n```\r\n\r\n**1. @Async 사용**\r\n```java\r\n@Service\r\npublic class EmailService {\r\n\r\n    @Async\r\n    public void sendEmail(String to, String content) {\r\n        // 별도 스레드에서 실행\r\n        emailClient.send(to, content);\r\n    }\r\n\r\n    @Async\r\n    public CompletableFuture<String> sendEmailWithResult(String to) {\r\n        String result = emailClient.send(to);\r\n        return CompletableFuture.completedFuture(result);\r\n    }\r\n}\r\n```\r\n\r\n**2. 커스텀 Executor 설정**\r\n```java\r\n@Configuration\r\n@EnableAsync\r\npublic class AsyncConfig {\r\n\r\n    @Bean(name = \"taskExecutor\")\r\n    public Executor taskExecutor() {\r\n        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();\r\n        executor.setCorePoolSize(5);\r\n        executor.setMaxPoolSize(10);\r\n        executor.setQueueCapacity(100);\r\n        executor.setThreadNamePrefix(\"Async-\");\r\n        executor.initialize();\r\n        return executor;\r\n    }\r\n}\r\n\r\n// 사용\r\n@Async(\"taskExecutor\")\r\npublic void process() { }\r\n```\r\n\r\n**3. CompletableFuture 조합**\r\n```java\r\npublic CompletableFuture<OrderResult> processOrder(OrderRequest request) {\r\n    CompletableFuture<Stock> stockFuture = checkStock(request);\r\n    CompletableFuture<Payment> paymentFuture = processPayment(request);\r\n\r\n    return stockFuture.thenCombine(paymentFuture, (stock, payment) -> {\r\n        return new OrderResult(stock, payment);\r\n    });\r\n}\r\n```\r\n\r\n**4. 예외 처리**\r\n```java\r\n@Component\r\npublic class AsyncExceptionHandler implements AsyncUncaughtExceptionHandler {\r\n    @Override\r\n    public void handleUncaughtException(Throwable ex, Method method, Object... params) {\r\n        log.error(\"Async exception in {}: {}\", method.getName(), ex.getMessage());\r\n    }\r\n}\r\n```\r\n\r\n**주의사항**\r\n- **Self-invocation 불가**: 같은 클래스 내 호출 시 @Async 미적용 (프록시 우회)\r\n- **void 또는 Future 반환**: 다른 타입 반환 시 결과를 받을 수 없음\r\n- **트랜잭션 분리**: @Async 메서드는 별도 트랜잭션 (호출자의 트랜잭션과 독립)\r\n- **예외 처리**: void 메서드의 예외는 AsyncUncaughtExceptionHandler로 처리\r\n\r\n**반환 타입**\r\n| 타입 | 설명 |\r\n|------|------|\r\n| void | 결과 불필요, 예외 전파 안 됨 |\r\n| Future<T> | 결과 대기 가능 |\r\n| CompletableFuture<T> | 조합, 체이닝 가능 (권장) |\r\n| ListenableFuture<T> | Spring 6에서 deprecated, CompletableFuture 사용 권장 |",
    "references": []
  },
  {
    "id": "SPRING-045",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Logback을 이용한 Spring Boot의 로깅 설정과 관리 방법은 무엇인가요?",
    "answer": "**Spring Boot 기본 로깅**\r\n- **기본 로깅 프레임워크**: Logback\r\n- **로깅 파사드**: SLF4J\r\n- 별도 설정 없이 바로 사용 가능\r\n\r\n**application.yml 설정**\r\n```yaml\r\nlogging:\r\n  level:\r\n    root: INFO\r\n    com.example: DEBUG\r\n    org.springframework.web: WARN\r\n  file:\r\n    name: logs/app.log\r\n    max-size: 10MB\r\n    max-history: 30\r\n  pattern:\r\n    console: \"%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n\"\r\n    file: \"%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n\"\r\n```\r\n\r\n**logback-spring.xml (상세 설정)**\r\n```xml\r\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<configuration>\r\n    <!-- 프로파일별 설정 -->\r\n    <springProfile name=\"dev\">\r\n        <root level=\"DEBUG\">\r\n            <appender-ref ref=\"CONSOLE\"/>\r\n        </root>\r\n    </springProfile>\r\n\r\n    <springProfile name=\"prod\">\r\n        <root level=\"INFO\">\r\n            <appender-ref ref=\"FILE\"/>\r\n        </root>\r\n    </springProfile>\r\n\r\n    <!-- 콘솔 출력 -->\r\n    <appender name=\"CONSOLE\" class=\"ch.qos.logback.core.ConsoleAppender\">\r\n        <encoder>\r\n            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>\r\n        </encoder>\r\n    </appender>\r\n\r\n    <!-- 파일 출력 (롤링) -->\r\n    <appender name=\"FILE\" class=\"ch.qos.logback.core.rolling.RollingFileAppender\">\r\n        <file>logs/app.log</file>\r\n        <rollingPolicy class=\"ch.qos.logback.core.rolling.TimeBasedRollingPolicy\">\r\n            <fileNamePattern>logs/app.%d{yyyy-MM-dd}.log</fileNamePattern>\r\n            <maxHistory>30</maxHistory>\r\n        </rollingPolicy>\r\n    </appender>\r\n</configuration>\r\n```\r\n\r\n**로그 레벨**\r\n| 레벨 | 용도 |\r\n|------|------|\r\n| TRACE | 가장 상세한 정보 |\r\n| DEBUG | 디버깅용 |\r\n| INFO | 일반 정보 |\r\n| WARN | 경고 |\r\n| ERROR | 오류 |\r\n\r\n**코드에서 사용**\r\n```java\r\n@Slf4j  // Lombok\r\npublic class UserService {\r\n    public void process() {\r\n        log.debug(\"Processing started\");\r\n        log.info(\"User {} logged in\", userId);\r\n        log.error(\"Error occurred\", exception);\r\n    }\r\n}\r\n```",
    "references": []
  },
  {
    "id": "SPRING-046",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "HttpMessageConverter의 역할과 Spring MVC에서의 HTTP 메시지 변환 과정을 설명해주세요.",
    "answer": "**HttpMessageConverter란?**\r\n- HTTP 요청/응답 본문(body)을 Java 객체로 **변환**하는 인터페이스\r\n- `@RequestBody`, `@ResponseBody` 처리의 핵심\r\n\r\n**동작 흐름**\r\n\r\n**요청 시 (역직렬화)**\r\n```\r\nHTTP 요청 Body (JSON)\r\n        ↓\r\nHttpMessageConverter.read()\r\n        ↓\r\nJava 객체 (@RequestBody)\r\n```\r\n\r\n**응답 시 (직렬화)**\r\n```\r\nJava 객체\r\n        ↓\r\nHttpMessageConverter.write()\r\n        ↓\r\nHTTP 응답 Body (JSON)\r\n```\r\n\r\n**주요 HttpMessageConverter**\r\n\r\n| Converter | 역할 |\r\n|-----------|------|\r\n| MappingJackson2HttpMessageConverter | JSON ↔ 객체 (Jackson) |\r\n| StringHttpMessageConverter | String 처리 |\r\n| ByteArrayHttpMessageConverter | byte[] 처리 |\r\n| FormHttpMessageConverter | Form 데이터 처리 |\r\n\r\n**Content-Type 기반 선택**\r\n- `application/json` → MappingJackson2HttpMessageConverter\r\n- `text/plain` → StringHttpMessageConverter\r\n- `application/x-www-form-urlencoded` → FormHttpMessageConverter\r\n\r\n**커스텀 설정**\r\n```java\r\n@Configuration\r\npublic class WebConfig implements WebMvcConfigurer {\r\n\r\n    @Override\r\n    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {\r\n        ObjectMapper objectMapper = new ObjectMapper();\r\n        objectMapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);\r\n\r\n        MappingJackson2HttpMessageConverter converter =\r\n            new MappingJackson2HttpMessageConverter(objectMapper);\r\n        converters.add(converter);\r\n    }\r\n}\r\n```\r\n\r\n**Jackson 설정 (application.yml)**\r\n```yaml\r\nspring:\r\n  jackson:\r\n    property-naming-strategy: SNAKE_CASE\r\n    serialization:\r\n      write-dates-as-timestamps: false\r\n    deserialization:\r\n      fail-on-unknown-properties: false\r\n```",
    "references": []
  },
  {
    "id": "SPRING-047",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "RestTemplate과 WebClient의 차이점 및 사용 사례에 대해 설명해주세요.",
    "answer": "**RestTemplate vs WebClient**\r\n\r\n| 구분 | RestTemplate | WebClient |\r\n|------|--------------|-----------|\r\n| 방식 | 동기/블로킹 | 비동기/논블로킹 (동기도 지원) |\r\n| 스레드 | 응답까지 스레드 점유 | 논블로킹으로 스레드 효율적 |\r\n| 상태 | 유지보수 모드 (신규 기능 추가 안 함) | 권장 |\r\n| 의존성 | spring-web | spring-webflux |\r\n\r\n**RestTemplate 상태 명확화**\r\n- \"Deprecated\"가 아닌 **유지보수 모드**: 버그 수정은 하지만 신규 기능 추가 없음\r\n- 기존 코드에서 계속 사용 가능하나, **새 프로젝트에서는 WebClient 또는 RestClient 권장**\r\n- Spring Framework 6.1+에서는 **RestClient** 도입 (동기 방식의 현대적 대안)\r\n\r\n**RestTemplate 사용**\r\n```java\r\n@Configuration\r\npublic class RestTemplateConfig {\r\n    @Bean\r\n    public RestTemplate restTemplate(RestTemplateBuilder builder) {\r\n        return builder\r\n            .setConnectTimeout(Duration.ofSeconds(5))\r\n            .setReadTimeout(Duration.ofSeconds(5))\r\n            .build();\r\n    }\r\n}\r\n\r\n// 사용\r\n@Service\r\npublic class UserClient {\r\n    private final RestTemplate restTemplate;\r\n\r\n    public UserDto getUser(Long id) {\r\n        return restTemplate.getForObject(\r\n            \"http://api.example.com/users/{id}\",\r\n            UserDto.class,\r\n            id\r\n        );\r\n    }\r\n}\r\n```\r\n\r\n**WebClient 사용**\r\n```java\r\n@Configuration\r\npublic class WebClientConfig {\r\n    @Bean\r\n    public WebClient webClient() {\r\n        return WebClient.builder()\r\n            .baseUrl(\"http://api.example.com\")\r\n            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)\r\n            .build();\r\n    }\r\n}\r\n\r\n// 비동기 사용\r\npublic Mono<UserDto> getUser(Long id) {\r\n    return webClient.get()\r\n        .uri(\"/users/{id}\", id)\r\n        .retrieve()\r\n        .bodyToMono(UserDto.class);\r\n}\r\n\r\n// 동기처럼 사용 (block)\r\npublic UserDto getUserSync(Long id) {\r\n    return webClient.get()\r\n        .uri(\"/users/{id}\", id)\r\n        .retrieve()\r\n        .bodyToMono(UserDto.class)\r\n        .block();  // 블로킹 대기\r\n}\r\n```\r\n\r\n**WebClient 권장 이유**\r\n1. **성능**: 논블로킹으로 리소스 효율적\r\n2. **유연성**: 동기/비동기 모두 지원\r\n3. **함수형 API**: 체이닝으로 가독성 좋음\r\n4. **미래 지향적**: Spring 공식 권장\r\n\r\n**사용 시나리오**\r\n- **RestTemplate**: 간단한 동기 호출, 레거시 코드\r\n- **WebClient**: 새 프로젝트, 높은 동시성, 리액티브 스택",
    "references": []
  },
  {
    "id": "SPRING-048",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "@Scheduled 애노테이션을 사용한 스케줄링 작업 구현 방법은 무엇인가요?",
    "answer": "**스케줄링 활성화**\r\n```java\r\n@EnableScheduling\r\n@SpringBootApplication\r\npublic class Application { }\r\n```\r\n\r\n**@Scheduled 사용법**\r\n\r\n**1. 고정 간격 (fixedRate)**\r\n```java\r\n@Scheduled(fixedRate = 5000)  // 5초마다 (이전 시작 시점 기준)\r\npublic void runEvery5Seconds() {\r\n    log.info(\"Fixed rate task\");\r\n}\r\n```\r\n\r\n**2. 고정 지연 (fixedDelay)**\r\n```java\r\n@Scheduled(fixedDelay = 5000)  // 이전 종료 후 5초 대기\r\npublic void runWithDelay() {\r\n    log.info(\"Fixed delay task\");\r\n}\r\n```\r\n\r\n**3. Cron 표현식**\r\n```java\r\n@Scheduled(cron = \"0 0 9 * * MON-FRI\")  // 평일 오전 9시\r\npublic void runWeekdayMorning() {\r\n    log.info(\"Weekday morning task\");\r\n}\r\n```\r\n\r\n**Cron 표현식 형식**\r\n```\r\n초 분 시 일 월 요일\r\n0  0  9  *  *  MON-FRI\r\n```\r\n\r\n| 필드 | 값 범위 |\r\n|------|---------|\r\n| 초 | 0-59 |\r\n| 분 | 0-59 |\r\n| 시 | 0-23 |\r\n| 일 | 1-31 |\r\n| 월 | 1-12 또는 JAN-DEC |\r\n| 요일 | 0-7 또는 SUN-SAT |\r\n\r\n**Cron 예시**\r\n| 표현식 | 의미 |\r\n|--------|------|\r\n| `0 0 * * * *` | 매시 정각 |\r\n| `0 0 0 * * *` | 매일 자정 |\r\n| `0 0 12 * * MON` | 매주 월요일 12시 |\r\n| `0 */10 * * * *` | 10분마다 |\r\n\r\n**스레드 풀 설정**\r\n```java\r\n@Configuration\r\npublic class SchedulerConfig implements SchedulingConfigurer {\r\n    @Override\r\n    public void configureTasks(ScheduledTaskRegistrar registrar) {\r\n        registrar.setScheduler(Executors.newScheduledThreadPool(5));\r\n    }\r\n}\r\n```\r\n\r\n**동적 스케줄링 (DB에서 주기 조회)**\r\n```java\r\n@Scheduled(fixedDelayString = \"${scheduler.interval}\")\r\npublic void dynamicTask() { }\r\n```",
    "references": []
  },
  {
    "id": "SPRING-049",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Spring Boot Starter의 개념과 주요 Starter들의 역할에 대해 설명해주세요.",
    "answer": "**Spring Boot Starter란?**\r\n- 특정 기능에 필요한 **의존성들을 묶어둔 패키지**\r\n- 의존성 버전 관리 자동화\r\n- Auto-Configuration과 함께 동작\r\n\r\n**Starter의 장점**\r\n1. 관련 의존성 한 번에 추가\r\n2. 호환되는 버전 자동 관리\r\n3. 보일러플레이트 설정 최소화\r\n\r\n**주요 Starter 목록**\r\n\r\n| Starter | 역할 |\r\n|---------|------|\r\n| spring-boot-starter | 기본 (core, logging, autoconfigure) |\r\n| spring-boot-starter-web | 웹 애플리케이션 (Tomcat, Spring MVC) |\r\n| spring-boot-starter-webflux | 리액티브 웹 (Netty, WebFlux) |\r\n| spring-boot-starter-data-jpa | JPA + Hibernate |\r\n| spring-boot-starter-data-redis | Redis 연동 |\r\n| spring-boot-starter-security | Spring Security |\r\n| spring-boot-starter-test | 테스트 (JUnit, Mockito, AssertJ) |\r\n| spring-boot-starter-actuator | 모니터링 엔드포인트 |\r\n| spring-boot-starter-validation | Bean Validation |\r\n| spring-boot-starter-cache | 캐시 추상화 |\r\n| spring-boot-starter-mail | 이메일 발송 |\r\n| spring-boot-starter-batch | 배치 처리 |\r\n\r\n**사용 예시**\r\n```xml\r\n<dependency>\r\n    <groupId>org.springframework.boot</groupId>\r\n    <artifactId>spring-boot-starter-web</artifactId>\r\n    <!-- 버전 명시 불필요: parent에서 관리 -->\r\n</dependency>\r\n```\r\n\r\n**spring-boot-starter-web 포함 내용**\r\n- Spring MVC\r\n- Tomcat (내장 서버)\r\n- Jackson (JSON 처리)\r\n- Validation\r\n- Logging (Logback)\r\n\r\n**커스텀 Starter 만들기**\r\n- 자체 Auto-Configuration 제공 가능\r\n- 사내 공통 라이브러리 배포에 유용",
    "references": []
  },
  {
    "id": "SPRING-050",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "Java Config(@Configuration)와 XML Config를 통한 Bean 등록 및 설정 방식의 차이점은 무엇인가요?",
    "answer": "**설정 방식 비교**\r\n\r\n| 구분 | XML Config | Java Config |\r\n|------|------------|-------------|\r\n| 방식 | XML 파일 | Java 클래스 + 어노테이션 |\r\n| 컴파일 검증 | 런타임 오류 | 컴파일 타임 오류 |\r\n| IDE 지원 | 제한적 | 자동완성, 리팩토링 가능 |\r\n| 트렌드 | 레거시 | 현재 표준 |\r\n\r\n**XML Config 예시**\r\n```xml\r\n<!-- applicationContext.xml -->\r\n<beans>\r\n    <bean id=\"userRepository\" class=\"com.example.UserRepository\"/>\r\n\r\n    <bean id=\"userService\" class=\"com.example.UserService\">\r\n        <constructor-arg ref=\"userRepository\"/>\r\n        <property name=\"timeout\" value=\"3000\"/>\r\n    </bean>\r\n</beans>\r\n```\r\n\r\n**Java Config 예시**\r\n```java\r\n@Configuration\r\npublic class AppConfig {\r\n\r\n    @Bean\r\n    public UserRepository userRepository() {\r\n        return new UserRepository();\r\n    }\r\n\r\n    @Bean\r\n    public UserService userService(UserRepository userRepository) {\r\n        UserService service = new UserService(userRepository);\r\n        service.setTimeout(3000);\r\n        return service;\r\n    }\r\n}\r\n```\r\n\r\n**Component Scan 방식**\r\n```java\r\n// XML\r\n<context:component-scan base-package=\"com.example\"/>\r\n\r\n// Java Config\r\n@Configuration\r\n@ComponentScan(\"com.example\")\r\npublic class AppConfig { }\r\n```\r\n\r\n**Java Config 장점**\r\n1. **타입 안전성**: 컴파일 시 오류 검출\r\n2. **리팩토링 용이**: 클래스명 변경 시 자동 반영\r\n3. **조건부 Bean**: @Conditional 등 프로그래밍적 제어\r\n4. **프로파일 적용**: @Profile과 쉬운 통합\r\n5. **가독성**: 코드로 흐름 파악 가능\r\n\r\n**XML Config 장점**\r\n1. 코드 수정 없이 설정 변경 가능\r\n2. 외부화된 설정 관리\r\n3. 레거시 시스템과 호환\r\n\r\n**현재 권장 방식**\r\n- **Java Config + @Component 스캔** 조합\r\n- XML은 외부 라이브러리 설정이나 레거시 통합 시에만 사용",
    "references": []
  },
  {
    "id": "SPRING-051",
    "category": "spring",
    "categoryName": "Spring",
    "section": "framework",
    "question": "최신 Spring 버전에서 추가된 기능 및 개선 사항에 대해 설명해주세요.",
    "answer": "**Spring Framework 6 / Spring Boot 3 주요 변경사항**\r\n\r\n**1. Java 17 기준선**\r\n- 최소 요구 버전이 Java 17로 상향\r\n- Record, Sealed Class, Pattern Matching 등 활용 가능\r\n\r\n**2. Jakarta EE 9+ 마이그레이션**\r\n- `javax.*` → `jakarta.*` 패키지 변경\r\n```java\r\n// 이전\r\nimport javax.servlet.http.HttpServletRequest;\r\n\r\n// 변경 후\r\nimport jakarta.servlet.http.HttpServletRequest;\r\n```\r\n\r\n**3. Native Image 지원 (GraalVM)**\r\n- AOT(Ahead-of-Time) 컴파일 공식 지원\r\n- 빠른 시작 시간과 낮은 메모리 사용량\r\n```bash\r\n./mvnw -Pnative native:compile\r\n```\r\n\r\n**4. HTTP Interface Client**\r\n- 선언적 HTTP 클라이언트 (Feign과 유사)\r\n```java\r\n@HttpExchange(\"/users\")\r\npublic interface UserClient {\r\n    @GetExchange(\"/{id}\")\r\n    User getUser(@PathVariable Long id);\r\n}\r\n```\r\n\r\n**5. 문제 세부 정보 (Problem Details)**\r\n- RFC 7807 기반 표준 에러 응답 형식 지원\r\n```json\r\n{\r\n  \"type\": \"https://example.com/errors/not-found\",\r\n  \"title\": \"Not Found\",\r\n  \"status\": 404,\r\n  \"detail\": \"User 123 not found\"\r\n}\r\n```\r\n\r\n**6. Observability 개선**\r\n- Micrometer 통합 강화\r\n- 분산 추적 (Tracing) 통합\r\n- Micrometer Observation API 도입\r\n\r\n**7. Virtual Threads 지원 (Java 21)**\r\n- Project Loom의 가상 스레드 지원\r\n```yaml\r\nspring:\r\n  threads:\r\n    virtual:\r\n      enabled: true\r\n```\r\n\r\n**Spring Boot 3.2+ 추가 기능**\r\n- RestClient 도입 (WebClient의 동기 버전)\r\n- JdbcClient 도입 (JDBC 간소화)\r\n- SSL Bundle 자동 구성\r\n- Docker Compose 지원 개선",
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
