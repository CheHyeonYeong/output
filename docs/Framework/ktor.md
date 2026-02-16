# Ktor / 케이터

> 카테고리: 프레임워크
> [<- 면접 질문 목록으로 돌아가기](../interview.md)

---

## 📌 Ktor 기본 개념

### KTOR-001
Ktor가 무엇인지, 다른 웹 프레임워크(Spring, NestJS 등)와 비교했을 때 어떤 특징이 있는지 설명해 주세요.

<details>
<summary>답변</summary>

Ktor는 JetBrains에서 개발한 Kotlin 기반의 비동기 웹 프레임워크입니다.

**주요 특징:**
- **경량성**: 필요한 기능만 플러그인으로 추가하는 모듈식 구조
- **Kotlin 네이티브**: Kotlin DSL을 활용한 직관적인 API 설계
- **Coroutine 기반**: 비동기 처리를 코루틴으로 자연스럽게 구현 (suspend 함수가 기본)
- **멀티플랫폼**: 서버는 JVM 전용, 클라이언트는 JVM/Android/iOS/JavaScript/Native 지원
- **서버/클라이언트 통합**: 동일한 API로 서버와 HTTP 클라이언트 구현 가능

> **참고**: Ktor 서버는 JVM에서만 실행되지만, Ktor Client는 Kotlin Multiplatform을 완전히 지원합니다.

**Spring과 비교:**
| 항목 | Ktor | Spring |
|------|------|--------|
| 학습 곡선 | 낮음 | 높음 |
| 시작 시간 | 빠름 | 상대적으로 느림 |
| 생태계 | 성장 중 | 매우 풍부 |
| DI | 선택적 (Koin, Kodein) | 내장 (IoC Container) |

**참고자료**
- [Ktor 공식 홈페이지](https://ktor.io/)[^1]

</details>

[^1]: Ktor Framework 공식 사이트

### KTOR-002
Ktor의 비동기 처리 방식과 Kotlin Coroutine 연동에 대해 설명해 주세요.

<details>
<summary>답변</summary>

Ktor는 처음부터 Kotlin Coroutine을 기반으로 설계되어 비동기 처리가 자연스럽게 통합되어 있습니다.

**비동기 처리 방식:**
```kotlin
// 모든 라우트 핸들러는 suspend 함수로 동작
get("/users") {
    val users = userService.findAll() // suspend 함수 호출
    call.respond(users)
}
```

**Coroutine 연동 특징:**
- **모든 핸들러가 suspend 함수**: 블로킹 없이 I/O 작업 처리
- **CIO 엔진**: Coroutine-based I/O 엔진으로 순수 Kotlin 구현
- **Structured Concurrency**: 각 요청은 자체 CoroutineScope에서 실행되며, 요청 처리 완료 또는 취소 시 하위 코루틴도 함께 취소됨
- **병렬 요청 처리**: `launch`나 `async`를 사용해 동시 요청 가능

**주의사항:**
- Ktor의 요청 처리는 기본적으로 요청 완료까지 대기하지만, 클라이언트 연결 해제가 코루틴 취소를 보장하지는 않음
- 긴 작업은 별도의 CoroutineScope에서 관리하거나 타임아웃 설정 권장

```kotlin
// 병렬 요청 예시
val deferred1 = async { client.get("url1") }
val deferred2 = async { client.get("url2") }
val results = awaitAll(deferred1, deferred2)
```

**참고자료**
- [Ktor Async Documentation](https://ktor.io/docs/async.html)[^2]

</details>

[^2]: Ktor 비동기 처리 공식 문서

### KTOR-003
Ktor에서 Application과 Application Module의 개념에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Application:**
Ktor 서버의 핵심 인스턴스로, 모든 설정과 플러그인이 등록되는 컨테이너입니다.

**Application Module:**
Application의 설정을 구성하는 확장 함수입니다. 플러그인 설치, 라우팅 설정 등을 담당합니다.

```kotlin
fun main() {
    embeddedServer(Netty, port = 8080, module = Application::module)
        .start(wait = true)
}

// Application Module 정의
fun Application.module() {
    install(ContentNegotiation) { json() }
    configureRouting()
}

fun Application.configureRouting() {
    routing {
        get("/") { call.respondText("Hello") }
    }
}
```

**특징:**
- **모듈 분리**: 기능별로 모듈을 나눠 관리 가능
- **플러그인 공유**: 한 모듈에 설치된 플러그인은 다른 모듈에서도 적용
- **설정 파일 연동**: `application.conf`에서 모듈 지정 가능

**참고자료**
- [Ktor Modules](https://ktor.io/docs/server-modules.html)[^3]

</details>

[^3]: Ktor 모듈 공식 문서

### KTOR-004
Ktor의 경량성(Lightweight)이란 무엇을 의미하며, 어떤 장단점이 있나요?

<details>
<summary>답변</summary>

Ktor의 경량성은 **필요한 기능만 선택적으로 추가하는 플러그인 기반 아키텍처**를 의미합니다.

**경량성의 의미:**
- 코어에는 최소한의 기능만 포함
- 인증, 직렬화, 세션 등은 별도 플러그인으로 제공
- 사용하지 않는 기능은 애플리케이션에 포함되지 않음

**장점:**
- **빠른 시작 시간**: 불필요한 기능 로딩 없음
- **낮은 메모리 사용량**: 필요한 것만 로드
- **유연한 구성**: 프로젝트 요구사항에 맞춤 설정
- **작은 배포 크기**: Fat JAR 크기 최소화

**단점:**
- **수동 설정 필요**: 기능별로 직접 플러그인 추가 (예: JSON 직렬화, 인증 각각 설치)
- **작은 생태계**: Spring 대비 서드파티 라이브러리 부족 (특히 ORM, 보안)
- **학습 필요**: 필요한 플러그인 파악 및 조합 방법 학습
- **일관성 부족**: 프로젝트마다 다른 구성이 될 수 있어 팀 표준화 필요

**트레이드오프:**
| 관점 | 경량성의 장점 | 경량성의 비용 |
|------|--------------|--------------|
| 시작 시간 | ~50ms (Spring ~2-5초) | - |
| 메모리 | ~50MB (Spring ~200MB+) | - |
| 개발 속도 | 빠른 프로토타이핑 | 복잡한 기능은 직접 구현 |
| 유지보수 | 코드베이스 이해 용이 | 표준화된 구조 없음 |

**참고자료**
- [Ktor Server Plugins](https://ktor.io/docs/server-plugins.html)[^4]

</details>

[^4]: Ktor 서버 플러그인 공식 문서

---

## 📌 Ktor 라우팅과 요청 처리

### KTOR-005
Ktor에서 라우팅(Routing)을 설정하는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

Ktor에서 라우팅은 `routing` DSL을 사용하여 설정합니다.

```kotlin
fun Application.configureRouting() {
    routing {
        // 기본 GET 요청
        get("/") {
            call.respondText("Hello, World!")
        }

        // 경로 그룹화
        route("/api") {
            route("/users") {
                get { /* 사용자 목록 */ }
                post { /* 사용자 생성 */ }
                get("/{id}") { /* 특정 사용자 조회 */ }
            }
        }
    }
}
```

**HTTP 메서드 함수:**
- `get()`, `post()`, `put()`, `delete()`, `patch()`, `head()`, `options()`

**라우팅 특징:**
- **계층적 구조**: `route()`로 경로 중첩 가능
- **DSL 기반**: Kotlin DSL로 가독성 높은 코드
- **플러그인 적용**: 특정 라우트에만 플러그인 적용 가능

**참고자료**
- [Ktor Routing](https://ktor.io/docs/server-routing.html)[^5]

</details>

[^5]: Ktor 라우팅 공식 문서

### KTOR-006
Ktor의 Route DSL 구조와 사용법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

Route DSL은 Kotlin의 타입 안전 빌더 패턴을 활용한 라우팅 정의 방식입니다.

```kotlin
routing {
    // 기본 라우트
    get("/hello") { call.respondText("Hello") }

    // 중첩 라우트
    route("/api/v1") {
        // /api/v1/users
        route("/users") {
            get { /* GET /api/v1/users */ }
            post { /* POST /api/v1/users */ }

            route("/{id}") {
                get { /* GET /api/v1/users/{id} */ }
                delete { /* DELETE /api/v1/users/{id} */ }
            }
        }
    }
}
```

**DSL 구성 요소:**
- **route()**: 경로 그룹화
- **HTTP 동사 함수**: get, post, put, delete 등
- **경로 패턴**: 정적 경로, 파라미터(`{id}`), 와일드카드(`*`), 테일카드(`{...}`)

**Type-Safe Routing (Resources 플러그인):**
```kotlin
@Resource("/articles")
class Articles(val sort: String? = "new") {
    @Resource("{id}")
    class Id(val parent: Articles, val id: Long)
}

routing {
    get<Articles> { articles -> /* /articles?sort=new */ }
    get<Articles.Id> { article -> /* /articles/123 */ }
}
```

**참고자료**
- [Ktor Type-safe Routing](https://ktor.io/docs/server-resources.html)[^6]

</details>

[^6]: Ktor Type-safe 라우팅 공식 문서

### KTOR-007
Ktor 라우팅에서 Path Parameter와 Query Parameter를 처리하는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Path Parameter 처리:**
```kotlin
// 경로: /users/{id}
get("/users/{id}") {
    val userId = call.parameters["id"]
        ?: return@get call.respond(HttpStatusCode.BadRequest)
    call.respondText("User ID: $userId")
}

// 선택적 파라미터: /users/{id?}
get("/users/{id?}") {
    val userId = call.parameters["id"] ?: "all"
}

// 테일카드: /files/{path...}
get("/files/{path...}") {
    val pathParts = call.parameters.getAll("path")
}
```

**Query Parameter 처리:**
```kotlin
// URL: /products?category=electronics&sort=price
get("/products") {
    val category = call.request.queryParameters["category"]
    val sort = call.request.queryParameters["sort"] ?: "default"

    // 다중 값: /search?tag=kotlin&tag=ktor
    val tags = call.request.queryParameters.getAll("tag")
}
```

**Type-Safe 방식 (Resources 플러그인):**
```kotlin
@Resource("/products")
data class Products(
    val category: String? = null,
    val sort: String = "default",
    val page: Int = 1
)

get<Products> { params ->
    // params.category, params.sort, params.page 직접 접근
}
```

**참고자료**
- [Ktor Handling Requests](https://ktor.io/docs/server-requests.html)[^7]

</details>

[^7]: Ktor 요청 처리 공식 문서

### KTOR-008
Ktor에서 요청 본문(Request Body)을 파싱하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**ContentNegotiation 플러그인 사용 (권장):**
```kotlin
// 플러그인 설치
install(ContentNegotiation) {
    json() // kotlinx.serialization
}

// 요청 본문 수신
@Serializable
data class User(val name: String, val email: String)

post("/users") {
    val user = call.receive<User>()
    call.respond(HttpStatusCode.Created, user)
}
```

**수동 파싱:**
```kotlin
// 텍스트로 수신
post("/raw") {
    val text = call.receiveText()
}

// 바이트 채널로 수신
post("/stream") {
    val channel = call.receiveChannel()
}

// 멀티파트 데이터
post("/upload") {
    val multipart = call.receiveMultipart()
    multipart.forEachPart { part ->
        when (part) {
            is PartData.FormItem -> { /* 폼 필드 */ }
            is PartData.FileItem -> { /* 파일 */ }
            else -> {}
        }
        part.dispose()
    }
}
```

**참고자료**
- [Ktor Content Negotiation](https://ktor.io/docs/server-serialization.html)[^8]

</details>

[^8]: Ktor 직렬화 공식 문서

### KTOR-009
Ktor의 ApplicationCall이란 무엇이고, 어떤 역할을 하나요?

<details>
<summary>답변</summary>

**ApplicationCall**은 HTTP 요청/응답 사이클을 나타내는 핵심 객체입니다.

**주요 구성 요소:**
```kotlin
get("/example") {
    // 요청 정보 접근
    val request = call.request
    val method = call.request.httpMethod
    val headers = call.request.headers
    val path = call.request.path()

    // 파라미터 접근
    val pathParams = call.parameters
    val queryParams = call.request.queryParameters

    // 응답 전송
    call.response.headers.append("X-Custom", "value")
    call.respond(HttpStatusCode.OK, data)
    call.respondText("Hello")
    call.respondRedirect("/other")
}
```

**ApplicationCall의 역할:**
- **요청 정보 접근**: HTTP 메서드, 헤더, 경로, 파라미터
- **요청 본문 수신**: `receive()`, `receiveText()`, `receiveMultipart()`
- **응답 전송**: `respond()`, `respondText()`, `respondFile()`
- **속성 저장**: `call.attributes`로 요청 간 데이터 공유
- **인증 정보**: `call.principal<T>()`로 인증된 사용자 접근

**참고자료**
- [ApplicationCall API](https://api.ktor.io/ktor-server/ktor-server-core/io.ktor.server.application/-application-call/index.html)[^9]

</details>

[^9]: Ktor ApplicationCall API 문서

---

## 📌 Ktor 플러그인 (Plugins)

> **참고**: Ktor 1.x에서는 "Features"라고 불렸으나, Ktor 2.0부터 "Plugins"로 명칭이 변경되었습니다.

### KTOR-010
Ktor의 플러그인(Plugin) 시스템에 대해 설명해 주세요.

<details>
<summary>답변</summary>

플러그인은 Ktor 애플리케이션에 기능을 추가하는 모듈식 구성 요소입니다.

**플러그인 설치:**
```kotlin
fun Application.module() {
    // 전역 설치
    install(ContentNegotiation) {
        json()
    }
    install(Authentication) {
        jwt { /* 설정 */ }
    }

    routing {
        // 특정 라우트에만 설치
        route("/api") {
            install(RateLimit) {
                // 설정
            }
        }
    }
}
```

**주요 내장 플러그인:**
| 플러그인 | 기능 |
|---------|------|
| ContentNegotiation | JSON/XML 직렬화 |
| Authentication | 인증 처리 |
| Sessions | 세션 관리 |
| StatusPages | 예외/상태 처리 |
| CORS | 교차 출처 요청 허용 |
| CallLogging | 요청 로깅 |

**플러그인 동작 원리:**
- 요청/응답 파이프라인에 인터셉터 등록
- 설정 블록에서 동작 커스터마이징
- 라우트별 또는 전역으로 적용 가능

**참고자료**
- [Ktor Server Plugins](https://ktor.io/docs/server-plugins.html)[^10]

</details>

[^10]: Ktor 서버 플러그인 공식 문서

### KTOR-011
Ktor의 ContentNegotiation 플러그인의 역할과 사용 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**ContentNegotiation**은 요청/응답의 콘텐츠 타입을 자동으로 처리하는 플러그인입니다.

**주요 역할:**
1. **Content-Type 협상**: Accept 헤더 기반으로 응답 형식 결정
2. **직렬화**: 객체를 JSON/XML 등으로 변환
3. **역직렬화**: 요청 본문을 객체로 변환

```kotlin
// 설치
install(ContentNegotiation) {
    json(Json {
        prettyPrint = true
        ignoreUnknownKeys = true
    })
}

// 사용
@Serializable
data class User(val id: Int, val name: String)

post("/users") {
    val user = call.receive<User>()  // 자동 역직렬화
    call.respond(user)                // 자동 직렬화
}
```

**지원 형식:**
- `json()` - kotlinx.serialization
- `jackson()` - Jackson
- `gson()` - Gson
- `xml()` - XML

**의존성:**
```kotlin
implementation("io.ktor:ktor-server-content-negotiation:$ktor_version")
implementation("io.ktor:ktor-serialization-kotlinx-json:$ktor_version")
```

**참고자료**
- [Ktor Content Negotiation](https://ktor.io/docs/server-serialization.html)[^11]

</details>

[^11]: Ktor 직렬화 공식 문서

### KTOR-012
Ktor에서 JSON 직렬화/역직렬화를 설정하는 방법은 무엇인가요? (kotlinx.serialization, Jackson, Gson)

<details>
<summary>답변</summary>

**kotlinx.serialization (권장):**
```kotlin
// 의존성
implementation("io.ktor:ktor-serialization-kotlinx-json:$ktor_version")

// 설정
install(ContentNegotiation) {
    json(Json {
        prettyPrint = true
        isLenient = true
        ignoreUnknownKeys = true
        encodeDefaults = true
    })
}

@Serializable
data class User(val name: String)
```

**Jackson:**
```kotlin
// 의존성
implementation("io.ktor:ktor-serialization-jackson:$ktor_version")

// 설정
install(ContentNegotiation) {
    jackson {
        enable(SerializationFeature.INDENT_OUTPUT)
        disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
        registerModule(JavaTimeModule())
    }
}
```

**Gson:**
```kotlin
// 의존성
implementation("io.ktor:ktor-serialization-gson:$ktor_version")

// 설정
install(ContentNegotiation) {
    gson {
        setPrettyPrinting()
        serializeNulls()
        setDateFormat("yyyy-MM-dd")
    }
}
```

**선택 기준:**
- **kotlinx.serialization**: 멀티플랫폼, 컴파일 타임 안전성
- **Jackson**: 풍부한 기능, Java 생태계 호환
- **Gson**: 간단한 사용, 가벼움

**참고자료**
- [Ktor Serialization](https://ktor.io/docs/server-serialization.html)[^12]

</details>

[^12]: Ktor 직렬화 공식 문서

### KTOR-013
Ktor의 StatusPages 플러그인을 사용한 예외 처리 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**StatusPages**는 예외와 HTTP 상태 코드를 일관되게 처리하는 플러그인입니다.

```kotlin
install(StatusPages) {
    // 예외 처리
    exception<Throwable> { call, cause ->
        call.respondText(
            text = "500: ${cause.localizedMessage}",
            status = HttpStatusCode.InternalServerError
        )
    }

    // 특정 예외 처리
    exception<NotFoundException> { call, cause ->
        call.respond(HttpStatusCode.NotFound, ErrorResponse(cause.message))
    }

    exception<AuthenticationException> { call, _ ->
        call.respond(HttpStatusCode.Unauthorized)
    }

    // HTTP 상태 코드 처리
    status(HttpStatusCode.NotFound) { call, status ->
        call.respondText("Page not found", status = status)
    }

    // 정적 파일 응답
    statusFile(HttpStatusCode.NotFound, HttpStatusCode.Unauthorized,
               filePattern = "error#.html")
}
```

**사용 예시:**
```kotlin
get("/users/{id}") {
    val user = userService.findById(call.parameters["id"]!!)
        ?: throw NotFoundException("User not found")
    call.respond(user)
}
```

**참고자료**
- [Ktor Status Pages](https://ktor.io/docs/server-status-pages.html)[^13]

</details>

[^13]: Ktor StatusPages 공식 문서

### KTOR-014
Ktor의 CORS 플러그인 설정 방법과 주요 옵션에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**CORS**는 Cross-Origin Resource Sharing을 활성화하는 플러그인입니다.

```kotlin
install(CORS) {
    // 허용할 HTTP 메서드
    allowMethod(HttpMethod.Options)
    allowMethod(HttpMethod.Get)
    allowMethod(HttpMethod.Post)
    allowMethod(HttpMethod.Put)
    allowMethod(HttpMethod.Delete)

    // 허용할 헤더
    allowHeader(HttpHeaders.Authorization)
    allowHeader(HttpHeaders.ContentType)
    allowHeader("X-Custom-Header")

    // 허용할 도메인
    allowHost("example.com", schemes = listOf("https"))
    allowHost("*.example.com")  // 서브도메인 와일드카드

    // 모든 도메인 허용 (개발용)
    anyHost()

    // 자격 증명 허용
    allowCredentials = true

    // Preflight 캐시 시간
    maxAgeInSeconds = 3600
}
```

**주요 옵션:**
| 옵션 | 설명 |
|------|------|
| `anyHost()` | 모든 도메인 허용 |
| `allowHost()` | 특정 도메인 허용 |
| `allowMethod()` | HTTP 메서드 허용 |
| `allowHeader()` | 요청 헤더 허용 |
| `exposeHeader()` | 응답 헤더 노출 |
| `allowCredentials` | 쿠키/인증 허용 |

**보안 주의사항:**
- **`anyHost()` 사용 금지 (프로덕션)**: 개발 환경에서만 사용, 프로덕션에서는 명시적 도메인 지정
- **`allowCredentials`와 `anyHost()` 조합 불가**: 브라우저가 거부함
- **Preflight 캐싱**: `maxAgeInSeconds`를 적절히 설정하여 OPTIONS 요청 최소화

```kotlin
// 프로덕션 권장 설정
install(CORS) {
    allowHost("app.example.com", schemes = listOf("https"))
    allowHost("admin.example.com", schemes = listOf("https"))
    allowMethod(HttpMethod.Put)
    allowMethod(HttpMethod.Delete)
    allowHeader(HttpHeaders.Authorization)
    allowCredentials = true
    maxAgeInSeconds = 3600
}
```

**참고자료**
- [Ktor CORS](https://ktor.io/docs/cors.html)[^14]

</details>

[^14]: Ktor CORS 공식 문서

### KTOR-015
Ktor에서 커스텀 플러그인을 만드는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

Ktor 2.0+에서는 `createApplicationPlugin` 함수로 커스텀 플러그인을 생성합니다.

**기본 플러그인:**
```kotlin
val RequestLoggingPlugin = createApplicationPlugin(name = "RequestLogging") {
    onCall { call ->
        println("Request: ${call.request.uri}")
    }
}

// 설치
install(RequestLoggingPlugin)
```

**설정 가능한 플러그인:**
```kotlin
class CustomHeaderConfig {
    var headerName: String = "X-Custom"
    var headerValue: String = "default"
}

val CustomHeaderPlugin = createApplicationPlugin(
    name = "CustomHeader",
    createConfiguration = ::CustomHeaderConfig
) {
    val name = pluginConfig.headerName
    val value = pluginConfig.headerValue

    onCallRespond { call, _ ->
        call.response.headers.append(name, value)
    }
}

// 사용
install(CustomHeaderPlugin) {
    headerName = "X-App-Version"
    headerValue = "1.0.0"
}
```

**사용 가능한 핸들러:**
- `onCall`: 요청 수신 시
- `onCallReceive`: 요청 본문 수신 시
- `onCallRespond`: 응답 전송 시

**참고자료**
- [Ktor Custom Plugins](https://ktor.io/docs/server-custom-plugins.html)[^15]

</details>

[^15]: Ktor 커스텀 플러그인 공식 문서

---

## 📌 Ktor 인증과 보안

### KTOR-016
Ktor에서 Authentication 플러그인을 사용한 인증 구현 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Authentication** 플러그인은 다양한 인증 방식을 제공합니다.

```kotlin
install(Authentication) {
    // Basic 인증
    basic("auth-basic") {
        realm = "Access to API"
        validate { credentials ->
            if (credentials.name == "admin" && credentials.password == "secret") {
                UserIdPrincipal(credentials.name)
            } else null
        }
    }

    // Form 인증
    form("auth-form") {
        userParamName = "username"
        passwordParamName = "password"
        validate { credentials ->
            userService.authenticate(credentials.name, credentials.password)
        }
    }
}

// 인증된 라우트
routing {
    authenticate("auth-basic") {
        get("/protected") {
            val principal = call.principal<UserIdPrincipal>()
            call.respondText("Hello, ${principal?.name}")
        }
    }
}
```

**지원 인증 방식:**
- `basic`: HTTP Basic Authentication
- `digest`: HTTP Digest Authentication
- `form`: 폼 기반 인증
- `bearer`: Bearer 토큰 (JWT/OAuth)
- `session`: 세션 기반 인증
- `oauth`: OAuth 2.0

**참고자료**
- [Ktor Authentication](https://ktor.io/docs/server-auth.html)[^16]

</details>

[^16]: Ktor 인증 공식 문서

### KTOR-017
Ktor에서 JWT(JSON Web Token) 인증을 구현하는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**JWT (JSON Web Token)** 인증 구현 방법입니다.

```kotlin
// 의존성
implementation("io.ktor:ktor-server-auth-jwt:$ktor_version")

// JWT 설정
val secret = environment.config.property("jwt.secret").getString()
val issuer = environment.config.property("jwt.issuer").getString()
val audience = environment.config.property("jwt.audience").getString()

install(Authentication) {
    jwt("auth-jwt") {
        realm = "ktor sample"
        verifier(
            JWT.require(Algorithm.HMAC256(secret))
                .withAudience(audience)
                .withIssuer(issuer)
                .build()
        )
        validate { credential ->
            if (credential.payload.getClaim("username").asString() != "") {
                JWTPrincipal(credential.payload)
            } else null
        }
        challenge { _, _ ->
            call.respond(HttpStatusCode.Unauthorized, "Token invalid or expired")
        }
    }
}

// 토큰 생성
post("/login") {
    val user = call.receive<LoginRequest>()
    val token = JWT.create()
        .withAudience(audience)
        .withIssuer(issuer)
        .withClaim("username", user.username)
        .withExpiresAt(Date(System.currentTimeMillis() + 3600000))
        .sign(Algorithm.HMAC256(secret))
    call.respond(hashMapOf("token" to token))
}

// 보호된 라우트
authenticate("auth-jwt") {
    get("/me") {
        val principal = call.principal<JWTPrincipal>()
        val username = principal!!.payload.getClaim("username").asString()
        call.respond(User(username))
    }
}
```

**보안 주의사항:**
- **시크릿 관리**: JWT secret은 환경 변수로 관리하고, 충분히 긴 랜덤 문자열 사용 (최소 256비트)
- **알고리즘 선택**: 프로덕션에서는 RS256 (비대칭 키) 권장
- **만료 시간**: 액세스 토큰은 짧게 (15분~1시간), 리프레시 토큰으로 갱신
- **클레임 검증**: audience, issuer 반드시 검증

**참고자료**
- [Ktor JWT](https://ktor.io/docs/server-jwt.html)[^17]

</details>

[^17]: Ktor JWT 공식 문서

### KTOR-018
Ktor에서 Session 기반 인증을 구현하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Sessions** 플러그인으로 세션 기반 인증을 구현합니다.

```kotlin
// 세션 데이터 클래스
data class UserSession(val userId: String, val name: String)

// 세션 설정
install(Sessions) {
    // 쿠키 기반 세션 (클라이언트 저장)
    cookie<UserSession>("user_session") {
        cookie.path = "/"
        cookie.maxAgeInSeconds = 3600
        cookie.secure = true
        cookie.httpOnly = true
        transform(SessionTransportTransformerMessageAuthentication(secretKey))
    }

    // 서버 저장 세션 (ID만 쿠키에)
    cookie<UserSession>("user_session", SessionStorageMemory()) {
        cookie.path = "/"
    }
}

// 세션 인증 설정
install(Authentication) {
    session<UserSession>("auth-session") {
        validate { session ->
            session  // UserSession이 Principal로 사용됨
        }
        challenge {
            call.respondRedirect("/login")
        }
    }
}

// 사용
post("/login") {
    val user = authenticate(call.receive<LoginRequest>())
    call.sessions.set(UserSession(user.id, user.name))
    call.respondRedirect("/dashboard")
}

authenticate("auth-session") {
    get("/dashboard") {
        val session = call.sessions.get<UserSession>()
        call.respondText("Welcome, ${session?.name}")
    }
}

post("/logout") {
    call.sessions.clear<UserSession>()
    call.respondRedirect("/")
}
```

**참고자료**
- [Ktor Session Authentication](https://ktor.io/docs/session-auth.html)[^18]

</details>

[^18]: Ktor 세션 인증 공식 문서

### KTOR-019
Ktor에서 OAuth 2.0 인증을 구현하는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**OAuth 2.0** 인증 구현 방법입니다.

```kotlin
// 의존성
implementation("io.ktor:ktor-server-auth:$ktor_version")

// OAuth 설정
install(Authentication) {
    oauth("auth-oauth-google") {
        urlProvider = { "http://localhost:8080/callback" }
        providerLookup = {
            OAuthServerSettings.OAuth2ServerSettings(
                name = "google",
                authorizeUrl = "https://accounts.google.com/o/oauth2/auth",
                accessTokenUrl = "https://oauth2.googleapis.com/token",
                requestMethod = HttpMethod.Post,
                clientId = System.getenv("GOOGLE_CLIENT_ID"),
                clientSecret = System.getenv("GOOGLE_CLIENT_SECRET"),
                defaultScopes = listOf("openid", "profile", "email")
            )
        }
        client = HttpClient(CIO)
    }
}

// 라우팅
routing {
    authenticate("auth-oauth-google") {
        get("/login") {
            // 자동으로 Google 로그인 페이지로 리다이렉트
        }

        get("/callback") {
            val principal = call.principal<OAuthAccessTokenResponse.OAuth2>()
            val accessToken = principal?.accessToken

            // 액세스 토큰으로 사용자 정보 조회
            val userInfo = httpClient.get("https://www.googleapis.com/oauth2/v2/userinfo") {
                header("Authorization", "Bearer $accessToken")
            }.body<GoogleUserInfo>()

            // 세션 저장
            call.sessions.set(UserSession(userInfo.id, userInfo.email))
            call.respondRedirect("/")
        }
    }
}
```

**참고자료**
- [Ktor OAuth](https://ktor.io/docs/server-oauth.html)[^19]

</details>

[^19]: Ktor OAuth 공식 문서

### KTOR-020
Ktor에서 HTTPS/SSL을 설정하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**HTTPS/SSL 설정 방법:**

**1. application.conf 사용:**
```hocon
ktor {
    deployment {
        port = 8080
        sslPort = 8443
    }
    security {
        ssl {
            keyStore = keystore.jks
            keyAlias = sampleAlias
            keyStorePassword = password
            privateKeyPassword = password
        }
    }
}
```

**2. embeddedServer 코드에서 설정:**
```kotlin
fun main() {
    val keyStore = buildKeyStore {
        certificate("sampleAlias") {
            password = "password"
            domains = listOf("127.0.0.1", "localhost")
        }
    }

    val environment = applicationEngineEnvironment {
        connector { port = 8080 }
        sslConnector(
            keyStore = keyStore,
            keyAlias = "sampleAlias",
            keyStorePassword = { "password".toCharArray() },
            privateKeyPassword = { "password".toCharArray() }
        ) {
            port = 8443
        }
        module(Application::module)
    }

    embeddedServer(Netty, environment).start(wait = true)
}
```

**3. HTTPS 리다이렉트:**
```kotlin
install(HttpsRedirect) {
    sslPort = 8443
    permanentRedirect = true
}
```

**인증서 생성 (keytool - 개발용):**
```bash
keytool -keystore keystore.jks -alias sampleAlias \
  -genkeypair -keyalg RSA -keysize 4096 -validity 365
```

**프로덕션 권장사항:**
- **리버스 프록시 사용**: Nginx, Traefik 등에서 SSL 종료 후 Ktor는 HTTP로 처리
- **Let's Encrypt**: 무료 인증서 자동 갱신
- **직접 SSL 처리 시**: Netty 엔진 권장 (CIO보다 SSL 성능 우수)

```nginx
# Nginx 리버스 프록시 예시
server {
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    location / {
        proxy_pass http://localhost:8080;
    }
}
```

**참고자료**
- [Ktor SSL](https://ktor.io/docs/server-ssl.html)[^20]

</details>

[^20]: Ktor SSL 공식 문서

---

## 📌 Ktor 클라이언트

### KTOR-021
Ktor Client란 무엇이고, 어떤 상황에서 사용하나요?

<details>
<summary>답변</summary>

**Ktor Client**는 Kotlin으로 작성된 멀티플랫폼 비동기 HTTP 클라이언트입니다.

**사용 상황:**
- 외부 API 호출 (REST, GraphQL)
- 마이크로서비스 간 통신
- 웹 스크래핑
- 파일 다운로드/업로드
- WebSocket 클라이언트

```kotlin
// 클라이언트 생성
val client = HttpClient(CIO) {
    install(ContentNegotiation) {
        json()
    }
    install(Logging) {
        level = LogLevel.INFO
    }
}

// 사용
suspend fun getUser(id: Int): User {
    return client.get("https://api.example.com/users/$id").body()
}

suspend fun createUser(user: User): User {
    return client.post("https://api.example.com/users") {
        contentType(ContentType.Application.Json)
        setBody(user)
    }.body()
}

// 리소스 해제
client.close()
```

**멀티플랫폼 지원:**
- JVM, Android, iOS, JavaScript, Native

**참고자료**
- [Ktor Client](https://ktor.io/docs/client-create-and-configure.html)[^21]

</details>

[^21]: Ktor 클라이언트 공식 문서

### KTOR-022
Ktor Client에서 HTTP 요청을 보내는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**다양한 HTTP 요청 방법:**

```kotlin
val client = HttpClient(CIO) {
    install(ContentNegotiation) { json() }
}

// GET 요청
val response: HttpResponse = client.get("https://api.example.com/users")
val users: List<User> = response.body()

// POST 요청 (JSON)
val newUser = client.post("https://api.example.com/users") {
    contentType(ContentType.Application.Json)
    setBody(User("John", "john@example.com"))
}.body<User>()

// PUT 요청
client.put("https://api.example.com/users/1") {
    setBody(User("Updated", "updated@example.com"))
}

// DELETE 요청
client.delete("https://api.example.com/users/1")

// 헤더 설정
client.get("https://api.example.com/protected") {
    header("Authorization", "Bearer $token")
    header("Accept", "application/json")
}

// Query Parameters
client.get("https://api.example.com/search") {
    url {
        parameters.append("q", "kotlin")
        parameters.append("page", "1")
    }
}

// Form 데이터
client.submitForm(
    url = "https://api.example.com/login",
    formParameters = parameters {
        append("username", "admin")
        append("password", "secret")
    }
)
```

**참고자료**
- [Ktor Client Requests](https://ktor.io/docs/client-requests.html)[^22]

</details>

[^22]: Ktor 클라이언트 요청 공식 문서

### KTOR-023
Ktor Client의 Engine 개념과 종류(CIO, OkHttp, Apache 등)에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Engine**은 실제 HTTP 통신을 처리하는 플랫폼별 구현체입니다.

**주요 엔진:**

| 엔진 | 플랫폼 | 특징 |
|------|--------|------|
| **CIO** | JVM, Native | 순수 Kotlin/Coroutine 기반, 경량, HTTP/1.1만 지원 |
| **OkHttp** | JVM, Android | Android 권장, HTTP/2, 연결 풀링, 인터셉터 |
| **Apache** | JVM | 풍부한 설정, 프록시 지원, 기업용 |
| **Java** | JVM 11+ | java.net.http 사용, HTTP/2 지원 |
| **Jetty** | JVM | HTTP/2 지원, WebSocket |
| **Darwin** | iOS, macOS | Apple 네이티브 URLSession 기반 |
| **WinHttp** | Windows Native | Windows 네이티브 API |
| **Curl** | Linux Native | libcurl 사용, 폭넓은 프로토콜 지원 |
| **Js** | JavaScript | 브라우저 fetch API 또는 Node.js |

**엔진 선택 가이드:**
- **JVM 서버**: CIO (경량) 또는 OkHttp (기능 풍부)
- **Android**: OkHttp (최적화됨)
- **iOS**: Darwin (네이티브 성능)
- **HTTP/2 필요 시**: OkHttp, Java, Jetty (CIO는 미지원)

```kotlin
// CIO 엔진
val client = HttpClient(CIO) {
    engine {
        maxConnectionsCount = 1000
        endpoint {
            connectTimeout = 5000
            requestTimeout = 15000
        }
    }
}

// OkHttp 엔진
val client = HttpClient(OkHttp) {
    engine {
        config {
            connectTimeout(10, TimeUnit.SECONDS)
            readTimeout(10, TimeUnit.SECONDS)
        }
    }
}

// 자동 엔진 선택 (의존성 기반)
val client = HttpClient()
```

**참고자료**
- [Ktor Client Engines](https://ktor.io/docs/client-engines.html)[^23]

</details>

[^23]: Ktor 클라이언트 엔진 공식 문서

### KTOR-024
Ktor Client에서 요청/응답 인터셉터를 설정하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**인터셉터 설정 방법:**

**1. HttpSend 플러그인 사용:**
```kotlin
val client = HttpClient(CIO) {
    install(HttpSend) {
        intercept { request ->
            // 요청 전 처리
            println("Sending: ${request.url}")

            val response = execute(request)

            // 응답 후 처리
            println("Received: ${response.response.status}")

            // 재시도 로직
            if (response.response.status == HttpStatusCode.Unauthorized) {
                refreshToken()
                request.headers["Authorization"] = "Bearer $newToken"
                execute(request)
            } else {
                response
            }
        }
    }
}
```

**2. 커스텀 플러그인:**
```kotlin
val LoggingPlugin = createClientPlugin("Logging") {
    onRequest { request, _ ->
        println("Request: ${request.method} ${request.url}")
    }
    onResponse { response ->
        println("Response: ${response.status}")
    }
}

val client = HttpClient(CIO) {
    install(LoggingPlugin)
}
```

**3. 기본 헤더 설정:**
```kotlin
val client = HttpClient(CIO) {
    defaultRequest {
        header("X-Api-Key", "my-api-key")
        header("User-Agent", "MyApp/1.0")
    }
}
```

**참고자료**
- [Ktor HttpSend](https://ktor.io/docs/client-http-send.html)[^24]

</details>

[^24]: Ktor HttpSend 공식 문서

---

## 📌 Ktor 테스트

### KTOR-025
Ktor 애플리케이션을 테스트하는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

Ktor는 `ktor-server-test-host` 모듈로 테스트 기능을 제공합니다.

```kotlin
// 의존성
testImplementation("io.ktor:ktor-server-test-host:$ktor_version")
testImplementation("io.ktor:ktor-client-content-negotiation:$ktor_version")

// 기본 테스트
class ApplicationTest {
    @Test
    fun testRoot() = testApplication {
        // 모듈 로드
        application {
            configureRouting()
            configureSerialization()
        }

        // 요청 및 검증
        client.get("/").apply {
            assertEquals(HttpStatusCode.OK, status)
            assertEquals("Hello, World!", bodyAsText())
        }
    }

    @Test
    fun testJsonEndpoint() = testApplication {
        application { module() }

        val client = createClient {
            install(ContentNegotiation) { json() }
        }

        val response = client.post("/users") {
            contentType(ContentType.Application.Json)
            setBody(User("John", "john@test.com"))
        }

        assertEquals(HttpStatusCode.Created, response.status)
    }
}
```

**테스트 특징:**
- 실제 서버 없이 인메모리 테스트
- 빠른 실행 속도
- HTTP 클라이언트로 요청/응답 검증

**참고자료**
- [Ktor Testing](https://ktor.io/docs/server-testing.html)[^25]

</details>

[^25]: Ktor 테스트 공식 문서

### KTOR-026
Ktor의 testApplication을 사용한 통합 테스트 작성 방법은 무엇인가요?

<details>
<summary>답변</summary>

`testApplication`은 Ktor 2.0+에서 제공하는 통합 테스트 DSL입니다.

```kotlin
class IntegrationTest {
    @Test
    fun `사용자 CRUD 통합 테스트`() = testApplication {
        // 애플리케이션 설정
        application {
            install(ContentNegotiation) { json() }
            configureRouting()
        }

        // JSON 지원 클라이언트 생성
        val client = createClient {
            install(ContentNegotiation) { json() }
        }

        // CREATE
        val createResponse = client.post("/users") {
            contentType(ContentType.Application.Json)
            setBody(CreateUserRequest("John", "john@test.com"))
        }
        assertEquals(HttpStatusCode.Created, createResponse.status)
        val user = createResponse.body<User>()

        // READ
        val getResponse = client.get("/users/${user.id}")
        assertEquals(HttpStatusCode.OK, getResponse.status)

        // UPDATE
        val updateResponse = client.put("/users/${user.id}") {
            contentType(ContentType.Application.Json)
            setBody(UpdateUserRequest("Updated"))
        }
        assertEquals(HttpStatusCode.OK, updateResponse.status)

        // DELETE
        val deleteResponse = client.delete("/users/${user.id}")
        assertEquals(HttpStatusCode.NoContent, deleteResponse.status)
    }

    @Test
    fun `인증이 필요한 엔드포인트 테스트`() = testApplication {
        application { module() }

        // 인증 없이 접근
        val unauthorized = client.get("/protected")
        assertEquals(HttpStatusCode.Unauthorized, unauthorized.status)

        // 인증 후 접근
        val authorized = client.get("/protected") {
            header("Authorization", "Bearer valid-token")
        }
        assertEquals(HttpStatusCode.OK, authorized.status)
    }
}
```

**참고자료**
- [Ktor Testing](https://ktor.io/docs/server-testing.html)[^26]

</details>

[^26]: Ktor 테스트 공식 문서

### KTOR-027
Ktor에서 Mock을 활용한 단위 테스트 작성 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**클라이언트 MockEngine 사용:**
```kotlin
@Test
fun `외부 API 호출 Mock 테스트`() = runTest {
    val mockEngine = MockEngine { request ->
        when (request.url.encodedPath) {
            "/users/1" -> respond(
                content = """{"id": 1, "name": "John"}""",
                status = HttpStatusCode.OK,
                headers = headersOf("Content-Type", "application/json")
            )
            else -> respond("Not Found", HttpStatusCode.NotFound)
        }
    }

    val client = HttpClient(mockEngine) {
        install(ContentNegotiation) { json() }
    }

    val user = client.get("/users/1").body<User>()
    assertEquals("John", user.name)
}
```

**서비스 계층 Mock (Mockk 사용):**
```kotlin
class UserRouteTest {
    private val userService = mockk<UserService>()

    @Test
    fun `사용자 조회 테스트`() = testApplication {
        application {
            install(ContentNegotiation) { json() }
            routing {
                userRoutes(userService)
            }
        }

        // Mock 설정
        coEvery { userService.findById(1) } returns User(1, "John")

        val response = client.get("/users/1")

        assertEquals(HttpStatusCode.OK, response.status)
        coVerify { userService.findById(1) }
    }
}
```

**의존성:**
```kotlin
testImplementation("io.mockk:mockk:$mockk_version")
```

**참고자료**
- [Ktor Client Testing](https://ktor.io/docs/client-testing.html)[^27]

</details>

[^27]: Ktor 클라이언트 테스트 공식 문서

---

## 📌 Ktor 배포와 운영

### KTOR-028
Ktor 애플리케이션을 배포하는 방법에 대해 설명해 주세요. (Fat JAR, Docker 등)

<details>
<summary>답변</summary>

**1. Fat JAR 배포:**
```kotlin
// build.gradle.kts
plugins {
    id("io.ktor.plugin") version "2.x.x"
}

ktor {
    fatJar {
        archiveFileName.set("app.jar")
    }
}
```

```bash
# 빌드
./gradlew buildFatJar

# 실행
java -jar build/libs/app.jar
```

**2. Docker 배포:**
```dockerfile
# Dockerfile
FROM gradle:8-jdk17 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle buildFatJar --no-daemon

FROM eclipse-temurin:17-jre
EXPOSE 8080
COPY --from=build /home/gradle/src/build/libs/*.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
```

```bash
# 빌드 및 실행
docker build -t my-ktor-app .
docker run -p 8080:8080 my-ktor-app
```

**3. Docker Compose:**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - JDBC_URL=jdbc:postgresql://db:5432/mydb
  db:
    image: postgres:15
```

**참고자료**
- [Ktor Deployment](https://ktor.io/docs/server-deployment.html)[^28]
- [Ktor Docker](https://ktor.io/docs/docker.html)[^28b]

</details>

[^28]: Ktor 배포 공식 문서
[^28b]: Ktor Docker 공식 문서

### KTOR-029
Ktor에서 환경 설정(application.conf, application.yaml)을 관리하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**HOCON 형식 (application.conf):**
```hocon
ktor {
    deployment {
        port = 8080
        port = ${?PORT}  # 환경변수로 오버라이드
    }
    application {
        modules = [ com.example.ApplicationKt.module ]
    }
}

database {
    url = "jdbc:postgresql://localhost:5432/mydb"
    url = ${?DATABASE_URL}
    driver = "org.postgresql.Driver"
    user = ${DATABASE_USER}
    password = ${DATABASE_PASSWORD}
}

jwt {
    secret = ${JWT_SECRET}
    issuer = "http://localhost:8080"
    audience = "http://localhost:8080/api"
}
```

**YAML 형식 (application.yaml):**
```yaml
ktor:
  deployment:
    port: 8080
    port: $PORT

database:
  url: ${DATABASE_URL}
```

**코드에서 설정 읽기:**
```kotlin
fun Application.module() {
    val dbUrl = environment.config.property("database.url").getString()
    val jwtSecret = environment.config.property("jwt.secret").getString()
}
```

**커맨드라인 오버라이드:**
```bash
java -jar app.jar -config=production.conf
java -jar app.jar -port=9090
```

**참고자료**
- [Ktor Configuration](https://ktor.io/docs/server-configuration-file.html)[^29]

</details>

[^29]: Ktor 설정 파일 공식 문서

### KTOR-030
Ktor 애플리케이션의 로깅을 설정하는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**CallLogging 플러그인:**
```kotlin
install(CallLogging) {
    level = Level.INFO

    // 로그 형식 커스터마이징
    format { call ->
        val status = call.response.status()
        val method = call.request.httpMethod.value
        val uri = call.request.uri
        "$status: $method $uri"
    }

    // 특정 경로 필터링
    filter { call -> call.request.path().startsWith("/api") }

    // MDC 설정 (Mapped Diagnostic Context)
    mdc("requestId") { call -> call.request.header("X-Request-ID") }
}
```

**logback.xml 설정:**
```xml
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="STDOUT" />
    </root>

    <logger name="io.ktor" level="DEBUG" />
</configuration>
```

**코드에서 로깅:**
```kotlin
import io.ktor.server.application.*

fun Application.module() {
    log.info("Application starting...")

    routing {
        get("/") {
            application.log.debug("Handling request")
        }
    }
}
```

**참고자료**
- [Ktor Call Logging](https://ktor.io/docs/call-logging.html)[^30]

</details>

[^30]: Ktor 로깅 공식 문서

### KTOR-031
Ktor에서 Metrics와 모니터링을 설정하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**MicrometerMetrics 플러그인:**
```kotlin
// 의존성
implementation("io.ktor:ktor-server-metrics-micrometer:$ktor_version")
implementation("io.micrometer:micrometer-registry-prometheus:$micrometer_version")

// 설정
val prometheusMeterRegistry = PrometheusMeterRegistry(PrometheusConfig.DEFAULT)

install(MicrometerMetrics) {
    registry = prometheusMeterRegistry

    // 분포 통계 설정
    distributionStatisticConfig = DistributionStatisticConfig.Builder()
        .percentilesHistogram(true)
        .percentiles(0.5, 0.9, 0.95, 0.99)
        .build()

    // JVM 메트릭
    meterBinders = listOf(
        JvmMemoryMetrics(),
        JvmGcMetrics(),
        ProcessorMetrics()
    )
}

// Prometheus 엔드포인트
routing {
    get("/metrics") {
        call.respond(prometheusMeterRegistry.scrape())
    }
}
```

**제공되는 메트릭:**
- `ktor.http.server.requests`: 요청 타이머
- `ktor.http.server.requests.active`: 활성 요청 수
- JVM 메모리, GC, CPU 메트릭

**DropwizardMetrics (대안):**
```kotlin
install(DropwizardMetrics) {
    registry = metricRegistry
}
```

**참고자료**
- [Ktor Micrometer Metrics](https://ktor.io/docs/server-metrics-micrometer.html)[^31]

</details>

[^31]: Ktor Micrometer 메트릭 공식 문서

---

## 📌 Ktor 고급 기능

### KTOR-032
Ktor에서 WebSocket을 구현하는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**WebSocket 서버 구현:**
```kotlin
// 의존성
implementation("io.ktor:ktor-server-websockets:$ktor_version")

// 설정
install(WebSockets) {
    pingPeriod = Duration.ofSeconds(15)
    timeout = Duration.ofSeconds(15)
    maxFrameSize = Long.MAX_VALUE
    masking = false
}

// 라우팅
routing {
    webSocket("/chat") {
        // 연결 시
        send("Connected to chat!")

        // 메시지 수신
        for (frame in incoming) {
            when (frame) {
                is Frame.Text -> {
                    val text = frame.readText()
                    outgoing.send(Frame.Text("Echo: $text"))
                }
                is Frame.Binary -> {
                    val bytes = frame.readBytes()
                }
                else -> {}
            }
        }
    }
}
```

**브로드캐스트 채팅 예시:**
```kotlin
val connections = Collections.synchronizedSet<DefaultWebSocketServerSession>(LinkedHashSet())

webSocket("/chat") {
    connections += this
    try {
        for (frame in incoming) {
            if (frame is Frame.Text) {
                val message = frame.readText()
                // 동시 전송 시 coroutineScope 활용
                coroutineScope {
                    connections.forEach { session ->
                        launch {
                            try {
                                session.send(message)
                            } catch (e: Exception) {
                                // 연결 끊긴 세션 처리
                            }
                        }
                    }
                }
            }
        }
    } finally {
        connections -= this
    }
}
```

**WebSocket vs SSE 선택 기준:**
| 항목 | WebSocket | SSE |
|------|-----------|-----|
| 방향 | 양방향 | 서버 → 클라이언트 |
| 프로토콜 | ws:// / wss:// | HTTP |
| 재연결 | 직접 구현 | 브라우저 자동 |
| 바이너리 | 지원 | 텍스트만 |
| 사용 사례 | 채팅, 게임 | 알림, 피드 |

**참고자료**
- [Ktor WebSockets](https://ktor.io/docs/server-websockets.html)[^32]

</details>

[^32]: Ktor WebSocket 공식 문서

### KTOR-033
Ktor에서 Server-Sent Events(SSE)를 구현하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**SSE 서버 구현:**

> **참고**: SSE 플러그인은 Ktor 3.0+에서 공식 지원됩니다. Ktor 2.x에서는 수동으로 구현해야 합니다.

```kotlin
// 의존성 (Ktor 3.0+)
implementation("io.ktor:ktor-server-sse:$ktor_version")

// 설정
install(SSE)

// 라우팅
routing {
    sse("/events") {
        // 단일 이벤트 전송
        send(ServerSentEvent(data = "Hello SSE"))

        // 여러 이벤트 전송
        repeat(10) { i ->
            send(ServerSentEvent(
                data = "Event $i",
                event = "message",
                id = i.toString()
            ))
            delay(1000)
        }
    }

    // Heartbeat 설정
    sse("/stream") {
        heartbeat {
            period = Duration.ofSeconds(30)
            event = ServerSentEvent(comment = "keep-alive")
        }

        // 실시간 데이터 스트림
        dataFlow.collect { data ->
            send(ServerSentEvent(data = data))
        }
    }
}
```

**클라이언트 (JavaScript):**
```javascript
const eventSource = new EventSource('/events');
eventSource.onmessage = (event) => {
    console.log(event.data);
};
```

**SSE vs WebSocket:**
- SSE: 서버 -> 클라이언트 단방향, HTTP 기반
- WebSocket: 양방향, 별도 프로토콜

**참고자료**
- [Ktor SSE](https://ktor.io/docs/server-server-sent-events.html)[^33]

</details>

[^33]: Ktor SSE 공식 문서

### KTOR-034
Ktor에서 파일 업로드/다운로드를 처리하는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**파일 업로드:**
```kotlin
// Multipart 업로드
post("/upload") {
    val multipart = call.receiveMultipart()
    var fileName = ""

    multipart.forEachPart { part ->
        when (part) {
            is PartData.FileItem -> {
                fileName = part.originalFileName ?: "unknown"
                val file = File("uploads/$fileName")
                part.provider().copyAndClose(file.writeChannel())
            }
            is PartData.FormItem -> {
                val value = part.value
            }
            else -> {}
        }
        part.dispose()
    }

    call.respondText("Uploaded: $fileName")
}

// Raw 바이트 업로드
post("/upload/raw") {
    val file = File("uploads/uploaded_file")
    call.receiveChannel().copyAndClose(file.writeChannel())
    call.respond(HttpStatusCode.OK)
}
```

**파일 다운로드:**
```kotlin
// 단일 파일 다운로드
get("/download/{name}") {
    val fileName = call.parameters["name"]!!
    val file = File("files/$fileName")

    if (file.exists()) {
        call.response.header(
            HttpHeaders.ContentDisposition,
            ContentDisposition.Attachment.withParameter(
                ContentDisposition.Parameters.FileName, fileName
            ).toString()
        )
        call.respondFile(file)
    } else {
        call.respond(HttpStatusCode.NotFound)
    }
}

// 정적 파일 서빙
routing {
    staticFiles("/static", File("public"))
    staticResources("/resources", "static")
}
```

**참고자료**
- [Ktor Requests](https://ktor.io/docs/server-requests.html)[^34]

</details>

[^34]: Ktor 요청 처리 공식 문서

### KTOR-035
Ktor에서 Dependency Injection을 구현하는 방법에 대해 설명해 주세요. (Koin, Kodein 등)

<details>
<summary>답변</summary>

**1. Koin 사용:**
```kotlin
// 의존성
implementation("io.insert-koin:koin-ktor:$koin_version")

// 모듈 정의
val appModule = module {
    single<UserRepository> { UserRepositoryImpl() }
    single { UserService(get()) }
}

// Ktor에 설치
fun Application.module() {
    install(Koin) {
        modules(appModule)
    }

    routing {
        val userService by inject<UserService>()

        get("/users") {
            call.respond(userService.findAll())
        }
    }
}
```

**2. Kodein 사용:**
```kotlin
// 의존성
implementation("org.kodein.di:kodein-di-framework-ktor-server-jvm:$kodein_version")

// 모듈 정의
fun Application.module() {
    di {
        bind<UserRepository>() with singleton { UserRepositoryImpl() }
        bind<UserService>() with singleton { UserService(instance()) }
    }

    routing {
        get("/users") {
            val userService by closestDI().instance<UserService>()
            call.respond(userService.findAll())
        }
    }
}
```

> **참고**: Ktor는 공식 내장 DI를 제공하지 않습니다. Koin, Kodein 등 외부 라이브러리를 사용하거나 수동 DI를 구현해야 합니다.

**3. 수동 DI (권장 - 간단한 경우):**
```kotlin
fun Application.module() {
    val userRepository = UserRepositoryImpl()
    val userService = UserService(userRepository)

    configureRouting(userService)
}

fun Application.configureRouting(userService: UserService) {
    routing {
        get("/users") { call.respond(userService.findAll()) }
    }
}
```

**참고자료**
- [Ktor Dependency Injection](https://ktor.io/docs/server-dependency-injection.html)[^35]
- [Koin for Ktor](https://start.ktor.io/p/koin)[^35b]

</details>

[^35]: Ktor DI 공식 문서
[^35b]: Ktor Koin 플러그인

---

## 📌 Ktor vs 다른 프레임워크

### KTOR-036
Ktor와 Spring Boot를 비교했을 때 각각의 장단점은 무엇인가요?

<details>
<summary>답변</summary>

| 항목 | Ktor | Spring Boot |
|------|------|-------------|
| **언어** | Kotlin 네이티브 | Java/Kotlin |
| **아키텍처** | 경량, 모듈식 | 풀스택, 컨벤션 기반 |
| **비동기** | Coroutine 기본 | WebFlux 별도 |
| **시작 시간** | 매우 빠름 | 상대적으로 느림 |
| **메모리** | 낮음 | 높음 |
| **학습 곡선** | 낮음 | 높음 |
| **생태계** | 성장 중 | 매우 풍부 |
| **DI** | 외부 라이브러리 | 내장 IoC |
| **문서/커뮤니티** | 적음 | 풍부함 |

**Ktor 장점:**
- Kotlin DSL로 간결한 코드
- 빠른 시작 시간 (수십 ms vs Spring의 수 초)과 낮은 메모리
- 필요한 기능만 선택적 추가 (작은 배포 크기)
- Coroutine 자연스러운 통합 (suspend 함수가 기본)
- 서버리스/컨테이너 환경에서 빠른 콜드 스타트

**Spring Boot 장점:**
- 풍부한 생태계와 서드파티 (Spring Data, Security, Cloud 등)
- 엔터프라이즈 검증된 안정성과 레퍼런스
- 방대한 문서, 커뮤니티, Stack Overflow 답변
- 다양한 통합 기능 내장 (AOP, 트랜잭션 관리 등)
- 채용 시장에서 높은 수요

**Ktor 단점:**
- 작은 생태계: ORM은 Exposed 정도, 트랜잭션 관리 직접 구현
- 기업 채용 시장에서 낮은 수요
- 복잡한 기능(분산 트랜잭션, 고급 보안)은 직접 구현 필요
- 레거시 Java 라이브러리 통합 시 추가 작업

**Spring Boot 단점:**
- 무거운 초기 설정과 긴 시작 시간
- 복잡한 학습 곡선 (의존성 주입, AOP 등 이해 필요)
- 마법 같은 자동 설정으로 디버깅 어려움
- 메모리 오버헤드가 큼 (최소 256MB+ 권장)

**실제 사용 사례:**
- **Ktor**: JetBrains 내부 서비스, Kotlin 기반 스타트업, BFF 서버
- **Spring**: 금융권, 대기업 백엔드, 레거시 시스템 연동

**참고자료**
- [Ktor 공식 홈페이지](https://ktor.io/)[^36]

</details>

[^36]: Ktor 공식 사이트

### KTOR-037
Ktor를 선택해야 하는 상황과 그렇지 않은 상황에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Ktor를 선택해야 하는 상황:**

1. **마이크로서비스**: 경량 프레임워크로 빠른 시작(~50ms)과 낮은 메모리(~50MB)
2. **Kotlin 전용 프로젝트**: Kotlin DSL, Coroutine, 멀티플랫폼 이점 최대화
3. **비동기 I/O 중심**: 외부 API 호출, 데이터베이스 비동기 처리
4. **빠른 프로토타이핑**: 최소한의 보일러플레이트로 빠른 개발
5. **서버리스/컨테이너**: 작은 배포 크기(~10MB JAR), 빠른 콜드 스타트
6. **멀티플랫폼 HTTP 클라이언트**: iOS, JS, Native에서도 동일한 Ktor Client 사용

**Ktor를 피해야 하는 상황:**

1. **엔터프라이즈 레거시 통합**: LDAP, SAML, 기존 Java EE 시스템 연동 시 Spring이 유리
2. **대규모 팀 (10명+)**: Spring의 컨벤션과 표준화된 구조가 협업에 유리
3. **복잡한 데이터 레이어**: JPA/Hibernate, 분산 트랜잭션 필요 시
4. **고급 보안 요구**: OAuth2 Resource Server, 메서드 레벨 보안 등 Spring Security 수준
5. **Java 개발자 위주 팀**: Kotlin + Coroutine 학습 비용 고려
6. **검증된 솔루션 필요**: 규제 산업(금융, 의료)에서 레퍼런스 중요

**권장 사용 사례:**
- REST/GraphQL API 서버
- 실시간 통신 (WebSocket, SSE)
- BFF (Backend for Frontend)
- 내부 마이크로서비스
- CLI 도구의 HTTP 클라이언트

**함정 질문 대비:**
> "Ktor가 Spring보다 항상 빠른가요?"
> - 시작 시간과 메모리는 Ktor가 유리하지만, 런타임 성능(처리량, 지연시간)은 워크로드에 따라 다름
> - Spring WebFlux도 비동기 처리 가능하며, JIT 최적화 후 성능 차이 미미할 수 있음

**참고자료**
- [Ktor FAQ](https://ktor.io/docs/faq.html)[^37]

</details>

[^37]: Ktor FAQ 공식 문서

### KTOR-038
Ktor의 성능 특성과 최적화 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Ktor 성능 특성:**

1. **Coroutine 기반**: 스레드 블로킹 없는 비동기 처리
2. **경량 런타임**: 최소한의 오버헤드
3. **CIO 엔진**: 순수 Kotlin으로 구현된 경량 엔진

**최적화 방법:**

**1. 엔진 선택:**
```kotlin
// 프로덕션: Netty (안정성, HTTP/2), CIO (경량, 순수 Kotlin)
embeddedServer(Netty, port = 8080) { }
```

**엔진별 특성:**
| 엔진 | 장점 | 단점 | 권장 상황 |
|------|------|------|----------|
| **Netty** | 검증된 안정성, HTTP/2, 풍부한 기능 | 무거움, 외부 의존성 | 프로덕션, 대규모 트래픽 |
| **CIO** | 순수 Kotlin, 경량, 빠른 시작 | HTTP/2 미지원 (2.x 기준) | 마이크로서비스, 서버리스 |
| **Jetty** | HTTP/2, Servlet 호환 | 무거움 | 기존 Jetty 인프라 연동 |

> **주의**: 성능은 워크로드에 따라 다릅니다. I/O 바운드 작업에서는 CIO가, CPU 바운드나 대규모 동시 연결에서는 Netty가 유리할 수 있습니다.

**2. 연결 풀 설정:**
```kotlin
val client = HttpClient(CIO) {
    engine {
        maxConnectionsCount = 1000
        endpoint {
            maxConnectionsPerRoute = 100
            pipelineMaxSize = 20
            keepAliveTime = 5000
            connectTimeout = 5000
        }
    }
}
```

**3. 직렬화 최적화:**
```kotlin
install(ContentNegotiation) {
    json(Json {
        ignoreUnknownKeys = true
        isLenient = true
        // 불필요한 기능 비활성화
    })
}
```

**4. 응답 압축:**
```kotlin
install(Compression) {
    gzip { priority = 1.0 }
    deflate { priority = 0.9 }
}
```

**5. 캐싱:**
```kotlin
install(CachingHeaders) {
    options { _, content ->
        when (content.contentType?.withoutParameters()) {
            ContentType.Application.Json ->
                CachingOptions(CacheControl.MaxAge(maxAgeSeconds = 3600))
            else -> null
        }
    }
}
```

**6. 데이터베이스 연결 풀:**
```kotlin
val dataSource = HikariDataSource(HikariConfig().apply {
    maximumPoolSize = 10
    minimumIdle = 2
})
```

**참고자료**
- [Ktor Server Engines](https://ktor.io/docs/server-engines.html)[^38]

</details>

[^38]: Ktor 서버 엔진 공식 문서
