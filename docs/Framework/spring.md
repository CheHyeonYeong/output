# Spring / 스프링

> 카테고리: 프레임워크
> [← 면접 질문 목록으로 돌아가기](../interview.md)

---
## 📌 Spring 핵심 개념

### SPRING-001
IoC와 DI에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**IoC (Inversion of Control, 제어의 역전)**
- 객체의 생성과 생명주기 관리를 개발자가 아닌 프레임워크(컨테이너)가 담당하는 것
- 기존에는 개발자가 직접 `new` 키워드로 객체를 생성하고 의존성을 관리했지만, IoC에서는 컨테이너가 이를 대신 수행
- "Don't call us, we'll call you" (할리우드 원칙)

**DI (Dependency Injection, 의존성 주입)**
- IoC를 구현하는 디자인 패턴 중 하나
- 객체가 필요로 하는 의존성을 외부에서 주입받는 방식
- 주입 방식 3가지:
  - **생성자 주입** (권장): 불변성 보장, 테스트 용이
  - **Setter 주입**: 선택적 의존성에 사용
  - **필드 주입**: 간단하지만 테스트 어려움

**장점**
- 결합도 감소, 유연성 증가
- 단위 테스트 용이 (Mock 객체 주입 가능)
- 코드 재사용성 향상

</details>

### SPRING-002
후보 없이 특정 기능을 하는 클래스가 딱 한 개하면, 구체 클래스를 그냥 사용해도 되지 않나요? 그럼에도 불구하고 왜 Spring에선 Bean을 사용 할까요?

<details>
<summary>답변</summary>

**구체 클래스 직접 사용의 문제점**
- 클래스 간 강한 결합(tight coupling) 발생
- 테스트 시 Mock 객체로 대체하기 어려움
- 향후 요구사항 변경 시 코드 수정 범위가 커짐

**Spring Bean을 사용하는 이유**

1. **생명주기 관리**: Bean의 생성, 초기화, 소멸을 컨테이너가 관리
2. **싱글톤 보장**: 기본적으로 하나의 인스턴스만 생성하여 메모리 효율성 확보
3. **AOP 적용 가능**: 프록시 기반으로 트랜잭션, 로깅 등 횡단 관심사 적용
4. **테스트 용이성**: 테스트 환경에서 쉽게 다른 구현체로 교체 가능
5. **확장성**: 나중에 구현체가 추가되더라도 설정만 변경하면 됨
6. **설정 외부화**: 환경별로 다른 Bean 설정 적용 가능 (Profile)

**결론**: 현재는 구현체가 하나여도, 미래의 확장성과 테스트 용이성, AOP 적용을 위해 Bean으로 관리하는 것이 좋습니다.

</details>

### SPRING-003
Spring의 Bean 생성 주기에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Spring Bean 생명주기 단계**

1. **스프링 컨테이너 생성**
2. **Bean 인스턴스화**: 생성자 호출하여 객체 생성
3. **의존성 주입 (DI)**: @Autowired 등으로 의존성 주입
4. **초기화 콜백**:
   - `@PostConstruct` 메서드 실행
   - `InitializingBean.afterPropertiesSet()` 실행
   - `@Bean(initMethod="...")` 지정 메서드 실행
5. **Bean 사용**: 애플리케이션에서 Bean 사용
6. **소멸 콜백** (컨테이너 종료 시):
   - `@PreDestroy` 메서드 실행
   - `DisposableBean.destroy()` 실행
   - `@Bean(destroyMethod="...")` 지정 메서드 실행

**콜백 우선순위**
`@PostConstruct` > `InitializingBean` > `initMethod`
`@PreDestroy` > `DisposableBean` > `destroyMethod`

**권장 방식**: `@PostConstruct`와 `@PreDestroy` 사용 (간결하고 스프링 독립적)

</details>

### SPRING-004
프로토타입 빈은 무엇인가요?

<details>
<summary>답변</summary>

**프로토타입 빈 (Prototype Bean)**
- 요청할 때마다 새로운 인스턴스를 생성하는 스코프
- `@Scope("prototype")` 또는 `@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)`로 설정

**싱글톤 vs 프로토타입**
| 구분 | 싱글톤 | 프로토타입 |
|------|--------|------------|
| 인스턴스 수 | 1개 | 요청마다 새로 생성 |
| 생명주기 관리 | 컨테이너가 전체 관리 | 생성과 DI까지만 관리 |
| @PreDestroy | 호출됨 | 호출 안됨 |

**사용 사례**
- 상태를 가지는(stateful) 객체
- 매번 새로운 인스턴스가 필요한 경우

**주의사항**
싱글톤 Bean에서 프로토타입 Bean을 주입받으면, 프로토타입도 한 번만 주입되어 싱글톤처럼 동작함
→ 해결: `ObjectProvider`, `Provider<T>`, 또는 `@Lookup` 사용

```java
@Autowired
private ObjectProvider<PrototypeBean> provider;

public void logic() {
    PrototypeBean bean = provider.getObject(); // 매번 새 인스턴스
}
```

</details>

### SPRING-005
AOP에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**AOP (Aspect Oriented Programming, 관점 지향 프로그래밍)**
- 횡단 관심사(Cross-Cutting Concerns)를 모듈화하는 프로그래밍 패러다임
- 핵심 비즈니스 로직과 부가 기능(로깅, 트랜잭션, 보안 등)을 분리

**핵심 용어**
| 용어 | 설명 |
|------|------|
| **Aspect** | 횡단 관심사를 모듈화한 것 (예: 로깅 Aspect) |
| **Join Point** | Advice가 적용될 수 있는 지점 (메서드 실행 시점) |
| **Pointcut** | Join Point를 선별하는 표현식 |
| **Advice** | 실제 수행할 부가 기능 로직 |
| **Target** | Advice가 적용되는 대상 객체 |
| **Weaving** | Aspect를 Target에 적용하는 과정 |

**Advice 종류**
- `@Before`: 메서드 실행 전
- `@After`: 메서드 실행 후 (성공/실패 무관)
- `@AfterReturning`: 메서드 정상 종료 후
- `@AfterThrowing`: 예외 발생 시
- `@Around`: 메서드 실행 전후 (가장 강력)

**적용 사례**: 트랜잭션 관리, 로깅, 성능 측정, 보안 검사, 캐싱

</details>

### SPRING-006
@Aspect는 어떻게 동작하나요?

<details>
<summary>답변</summary>

**@Aspect 동작 원리: 프록시 기반 AOP**

1. **Bean 등록 시점**에 스프링이 @Aspect 클래스를 스캔
2. Pointcut에 해당하는 **Target Bean을 프록시 객체로 감싸서** 컨테이너에 등록
3. 클라이언트가 Target 메서드 호출 시 **프록시가 먼저 호출**됨
4. 프록시가 Advice 로직을 실행하고, 필요시 실제 Target 메서드 호출

**프록시 생성 방식**
- **JDK 동적 프록시**: 인터페이스 기반 (인터페이스가 있을 때)
- **CGLIB 프록시**: 클래스 기반, 상속을 이용 (인터페이스가 없을 때)
- Spring Boot 2.0+에서는 기본적으로 CGLIB 사용

**동작 흐름 예시 (@Around)**
```
Client → Proxy → @Around (before) → Target 메서드 → @Around (after) → Proxy → Client
```

**주의사항**
- **Self-invocation 문제**: 같은 클래스 내에서 this.method() 호출 시 프록시를 거치지 않아 AOP 미적용
- 해결: 자기 자신을 주입받거나 `AopContext.currentProxy()` 사용

</details>

---

## 📌 Spring Web 계층

### SPRING-007
Spring 에서 Interceptor와 Servlet Filter에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**실행 순서**
```
HTTP 요청 → Filter → DispatcherServlet → Interceptor → Controller
```

**Servlet Filter**
- **서블릿 스펙**에 정의된 기술 (스프링 독립적)
- **DispatcherServlet 이전**에 실행
- 모든 요청에 대해 동작 (정적 리소스 포함)
- `javax.servlet.Filter` 인터페이스 구현

**Spring Interceptor**
- **스프링 MVC**가 제공하는 기술
- **DispatcherServlet과 Controller 사이**에서 실행
- 스프링 컨텍스트에 접근 가능 (Bean 사용 가능)
- `HandlerInterceptor` 인터페이스 구현

| 구분 | Filter | Interceptor |
|------|--------|-------------|
| 관리 주체 | 서블릿 컨테이너 | 스프링 컨테이너 |
| Request/Response 조작 | 가능 | 불가능 |
| 스프링 Bean 접근 | 제한적 | 자유로움 |
| 예외 처리 | 서블릿 예외 처리 | @ControllerAdvice 사용 가능 |

**Interceptor 메서드**
- `preHandle()`: 컨트롤러 실행 전
- `postHandle()`: 컨트롤러 실행 후, 뷰 렌더링 전
- `afterCompletion()`: 뷰 렌더링 후, 완료 시점

</details>

### SPRING-008
설명만 들어보면 인터셉터만 쓰는게 나아보이는데, 아닌가요? 필터는 어떤 상황에 사용 해야 하나요?

<details>
<summary>답변</summary>

**Filter를 사용해야 하는 경우**

1. **Request/Response 자체를 조작해야 할 때**
   - 요청 본문(body)을 읽거나 수정
   - 응답 본문을 압축하거나 변환
   - ServletRequest를 래핑하여 커스텀 기능 추가

2. **모든 요청에 공통 처리가 필요할 때**
   - 인코딩 설정 (CharacterEncodingFilter)
   - CORS 처리
   - 정적 리소스 요청 포함 처리

3. **스프링과 무관한 처리**
   - 스프링 컨텍스트 로딩 전에 처리해야 하는 작업
   - 서블릿 스펙 기반의 표준화된 처리

4. **보안 관련 최전방 처리**
   - XSS, CSRF 방어
   - Spring Security의 필터 체인

**실무 예시**
| Filter 사용 | Interceptor 사용 |
|-------------|------------------|
| 인코딩 처리 | 로그인 체크 |
| CORS 설정 | 권한 검사 |
| 요청 로깅 (body 포함) | API 호출 로깅 |
| 보안 필터링 | 공통 데이터 세팅 |

**결론**: 둘 다 적절한 용도가 있으며, Spring Security처럼 Filter 체인이 필수인 경우도 있습니다.

</details>

### SPRING-009
DispatcherServlet 의 역할에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**DispatcherServlet이란?**
- Spring MVC의 **프론트 컨트롤러(Front Controller)**
- 모든 HTTP 요청을 받아 적절한 컨트롤러에 분배하는 중앙 서블릿
- `HttpServlet`을 상속받은 서블릿

**요청 처리 흐름**
1. **요청 수신**: 클라이언트 요청을 받음
2. **핸들러 조회**: `HandlerMapping`을 통해 요청을 처리할 핸들러(컨트롤러) 검색
3. **핸들러 어댑터 조회**: `HandlerAdapter`를 통해 핸들러 실행 방법 결정
4. **핸들러 실행**: 어댑터가 실제 컨트롤러 메서드 호출
5. **ModelAndView 반환**: 컨트롤러가 처리 결과 반환
6. **뷰 리졸버 호출**: `ViewResolver`가 뷰 이름을 실제 View로 변환
7. **뷰 렌더링**: View가 Model 데이터로 응답 생성
8. **응답 반환**: 클라이언트에게 응답

**주요 구성 요소**
- `HandlerMapping`: URL과 핸들러 매핑
- `HandlerAdapter`: 다양한 핸들러 실행 방식 지원
- `ViewResolver`: 뷰 이름 → 실제 View 객체 변환
- `HandlerExceptionResolver`: 예외 처리

</details>

### SPRING-010
요청이 들어온다고 가정할 때, DispatcherServlet은 한번에 여러 요청을 모두 받을 수 있나요?

<details>
<summary>답변</summary>

**네, 가능합니다.**

**멀티스레드 처리 구조**
- DispatcherServlet은 **싱글톤**으로 하나만 존재
- 하지만 서블릿 컨테이너(Tomcat)가 **스레드 풀**을 관리
- 각 요청마다 별도의 스레드가 할당되어 **동시에 여러 요청 처리 가능**

**동작 방식**
```
요청1 → Thread-1 → DispatcherServlet.service() → Controller
요청2 → Thread-2 → DispatcherServlet.service() → Controller
요청3 → Thread-3 → DispatcherServlet.service() → Controller
```

**Thread-Safe 이유**
- DispatcherServlet 자체는 **상태를 가지지 않음** (stateless)
- 요청별 데이터는 각 스레드의 **지역 변수**나 **ThreadLocal**에 저장
- 스프링의 싱글톤 Bean들도 상태를 가지지 않도록 설계해야 함

**Tomcat 스레드 풀 설정**
```yaml
server:
  tomcat:
    threads:
      max: 200        # 최대 스레드 수
      min-spare: 10   # 최소 유휴 스레드 수
```

**주의**: Controller나 Service에서 인스턴스 변수에 상태를 저장하면 동시성 문제 발생

</details>

### SPRING-011
@Controller 를 DispatcherServlet은 어떻게 구분 할까요?

<details>
<summary>답변</summary>

**HandlerMapping을 통한 구분**

DispatcherServlet은 직접 @Controller를 찾지 않고 **HandlerMapping**에게 위임합니다.

**동작 과정**
1. 스프링 컨텍스트 로딩 시 `@Controller`, `@RequestMapping` 붙은 클래스 스캔
2. **RequestMappingHandlerMapping**이 URL 패턴과 핸들러 메서드를 매핑 정보로 저장
3. 요청 시 DispatcherServlet이 HandlerMapping에게 해당 URL의 핸들러 조회
4. 매핑된 컨트롤러 메서드 정보 반환

**주요 HandlerMapping 구현체**
| 구현체 | 설명 |
|--------|------|
| RequestMappingHandlerMapping | @RequestMapping 기반 (가장 많이 사용) |
| BeanNameUrlHandlerMapping | Bean 이름이 URL인 경우 |
| SimpleUrlHandlerMapping | 직접 URL-핸들러 매핑 설정 |

**@Controller vs @RestController**
- `@Controller`: View 이름 반환 → ViewResolver가 처리
- `@RestController`: `@Controller` + `@ResponseBody`, 객체를 JSON으로 직접 반환

**내부 저장 구조**
```java
// RequestMappingHandlerMapping 내부
Map<RequestMappingInfo, HandlerMethod> mappingRegistry
// 예: GET /users → UserController.getUsers()
```

</details>

---

## 📌 Spring JPA와 ORM

### SPRING-012
JPA와 같은 ORM을 사용하는 이유가 무엇인가요?

<details>
<summary>답변</summary>

**ORM (Object-Relational Mapping)이란?**
- 객체와 관계형 데이터베이스 테이블을 매핑해주는 기술
- SQL을 직접 작성하지 않고 객체 지향적으로 데이터 조작 가능

**ORM 사용 이유**

1. **패러다임 불일치 해결**
   - 객체: 상속, 참조, 연관관계
   - RDB: 테이블, 외래키, 조인
   - ORM이 이 차이를 자동으로 해결

2. **생산성 향상**
   - 반복적인 CRUD SQL 작성 불필요
   - 객체 중심 개발 가능

3. **유지보수성**
   - 필드 추가 시 SQL 수정 불필요
   - 데이터베이스 변경에 유연

4. **DB 독립성**
   - Dialect 설정으로 DB 벤더 변경 용이
   - MySQL → PostgreSQL 마이그레이션 쉬움

5. **성능 최적화 기능**
   - 1차 캐시, 쓰기 지연
   - 변경 감지(Dirty Checking)
   - 지연 로딩(Lazy Loading)

**단점**
- 학습 곡선이 있음
- 복잡한 쿼리는 직접 작성 필요 (JPQL, QueryDSL, Native Query)
- N+1 문제 등 성능 이슈 주의 필요

</details>

### SPRING-013
영속성은 어떤 기능을 하나요? 이게 진짜 성능 향상에 큰 도움이 되나요?

<details>
<summary>답변</summary>

**영속성 컨텍스트 (Persistence Context)**
- 엔티티를 영구 저장하는 환경, **1차 캐시** 역할
- EntityManager를 통해 접근

**주요 기능과 성능 이점**

1. **1차 캐시**
   - 같은 트랜잭션 내에서 동일 엔티티 조회 시 DB 접근 없이 캐시에서 반환
   - 동일성(identity) 보장: `em.find(Member.class, 1L) == em.find(Member.class, 1L)`
   - ⚠️ 트랜잭션 범위 한정이라 효과는 제한적

2. **쓰기 지연 (Write-behind)**
   - INSERT/UPDATE를 즉시 실행하지 않고 모았다가 커밋 시점에 일괄 실행
   - **배치 처리**로 DB 왕복 횟수 감소

3. **변경 감지 (Dirty Checking)**
   - 엔티티 변경 시 자동으로 UPDATE SQL 생성
   - 별도 update() 메서드 호출 불필요

4. **지연 로딩 (Lazy Loading)**
   - 연관 엔티티를 실제 사용할 때까지 로딩 지연
   - 불필요한 조인 방지

**성능 향상에 대한 현실적 평가**
- 1차 캐시: 같은 트랜잭션 내에서만 유효 → **효과 제한적**
- 쓰기 지연: 대량 INSERT 시 **확실한 성능 향상**
- 전체적으로 **개발 편의성** 측면에서 더 큰 가치

</details>

### SPRING-014
N + 1 문제에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**N+1 문제란?**
- 연관 관계가 있는 엔티티 조회 시, **1번의 쿼리로 N개의 데이터**를 가져온 후
- 각 데이터의 연관 엔티티를 조회하기 위해 **추가로 N번의 쿼리**가 실행되는 문제

**예시**
```java
// Team : Member = 1 : N 관계
List<Team> teams = teamRepository.findAll(); // 1번 쿼리
for (Team team : teams) {
    team.getMembers().size(); // N번 쿼리 (팀 수만큼)
}
// 총 N+1 번 쿼리 실행
```

**발생 원인**
- 지연 로딩(LAZY) 시: 연관 엔티티 접근 시점에 쿼리 발생
- 즉시 로딩(EAGER) 시: 각 엔티티마다 별도 쿼리 발생

**해결 방법**

1. **Fetch Join (JPQL)**
   ```java
   @Query("SELECT t FROM Team t JOIN FETCH t.members")
   List<Team> findAllWithMembers();
   ```

2. **@EntityGraph**
   ```java
   @EntityGraph(attributePaths = {"members"})
   List<Team> findAll();
   ```

3. **Batch Size 설정**
   ```yaml
   spring.jpa.properties.hibernate.default_batch_fetch_size: 100
   ```
   - IN 절로 한 번에 여러 개 조회

4. **@BatchSize 어노테이션**
   - 엔티티나 컬렉션에 개별 적용

**권장**: 기본은 LAZY + 필요 시 Fetch Join 또는 Batch Size

</details>

### SPRING-015
@Transactional 은 어떤 기능을 하나요?

<details>
<summary>답변</summary>

**@Transactional이란?**
- 선언적 트랜잭션 관리를 위한 어노테이션
- 메서드 실행을 하나의 트랜잭션으로 묶어줌
- AOP 기반으로 동작 (프록시 패턴)

**동작 원리**
```
메서드 호출 → 프록시 → 트랜잭션 시작 → 실제 메서드 실행 → 커밋/롤백
```

**주요 속성**

| 속성 | 설명 |
|------|------|
| `propagation` | 트랜잭션 전파 방식 (REQUIRED, REQUIRES_NEW 등) |
| `isolation` | 격리 수준 (READ_COMMITTED 등) |
| `timeout` | 타임아웃 설정 (초) |
| `readOnly` | 읽기 전용 여부 |
| `rollbackFor` | 롤백할 예외 지정 |
| `noRollbackFor` | 롤백하지 않을 예외 지정 |

**전파 속성 (Propagation)**
- `REQUIRED` (기본): 기존 트랜잭션 있으면 참여, 없으면 새로 시작
- `REQUIRES_NEW`: 항상 새 트랜잭션 시작
- `NESTED`: 중첩 트랜잭션 (Savepoint 사용)
- `SUPPORTS`: 트랜잭션 있으면 참여, 없으면 없이 실행

**주의사항**
- **Checked Exception**은 기본적으로 롤백 안 됨 (rollbackFor 필요)
- **Self-invocation**: 같은 클래스 내 호출 시 프록시 우회로 트랜잭션 미적용
- **public 메서드**에만 적용 가능

</details>

### SPRING-016
@Transactional(readonly=true) 는 어떤 기능인가요? 이게 도움이 되나요?

<details>
<summary>답변</summary>

**@Transactional(readOnly=true)란?**
- 해당 트랜잭션이 읽기 전용임을 선언
- JPA와 DB 레벨에서 최적화 힌트로 사용

**성능 최적화 효과**

1. **영속성 컨텍스트 최적화**
   - 변경 감지(Dirty Checking) 비활성화
   - 스냅샷 저장 안 함 → **메모리 절약**

2. **Flush 모드 변경**
   - FlushMode가 MANUAL로 설정
   - 불필요한 flush 연산 방지

3. **DB 레벨 최적화 (DB 벤더에 따라 다름)**
   - MySQL: 읽기 전용 트랜잭션으로 처리
   - PostgreSQL: 읽기 전용 모드 활성화
   - **Replication 환경**: Slave(읽기 전용 DB)로 라우팅 가능

**실질적 도움이 되나요?**
- **대량 조회**: 스냅샷 미저장으로 메모리 절약 효과 있음
- **Replication 환경**: Master-Slave 분기에 매우 유용
- **단순 조회**: 효과는 미미하지만, **명시적 의도 표현**으로 코드 가독성 향상

**권장**
```java
@Service
@Transactional(readOnly = true)  // 클래스 레벨에 읽기 전용 기본 설정
public class UserService {

    @Transactional  // 쓰기 메서드만 오버라이드
    public void updateUser() { }
}
```

</details>

### SPRING-017
그런데, 읽기에 트랜잭션을 걸 필요가 있나요? @Transactional을 안 붙이면 되는거 아닐까요?

<details>
<summary>답변</summary>

**@Transactional이 없을 때 발생하는 문제들**

1. **OSIV(Open Session In View) 비활성화 시 LazyLoading 오류**
   - OSIV가 꺼져있으면 트랜잭션 범위 = 영속성 컨텍스트 범위
   - @Transactional 없으면 지연 로딩 시 `LazyInitializationException` 발생

2. **데이터 일관성 문제**
   - 여러 쿼리 수행 중 데이터가 변경될 수 있음
   - 트랜잭션 격리 수준에 따른 일관된 읽기 보장 안 됨

3. **Dirty Read / Non-Repeatable Read**
   - 트랜잭션 없이 조회하면 커밋되지 않은 데이터 읽을 가능성
   - 같은 데이터를 두 번 읽었을 때 다른 값이 나올 수 있음

**@Transactional이 필요한 경우**
```java
// 여러 테이블을 조회하여 일관된 데이터 필요
public OrderDetailDto getOrderDetail(Long orderId) {
    Order order = orderRepository.findById(orderId);
    List<OrderItem> items = order.getItems(); // LAZY 로딩
    // → @Transactional 없으면 LazyInitializationException
}
```

**@Transactional 없어도 되는 경우**
- 단순 단건 조회
- OSIV가 활성화된 환경 (Spring Boot 기본값: true)
- 일관성이 크게 중요하지 않은 조회

**결론**: 읽기에도 @Transactional(readOnly=true)를 붙이는 것을 권장
- 명시적 의도 표현
- Replication 라우팅 가능
- 영속성 컨텍스트 범위 명확화

</details>

---

## 📌 Spring 어노테이션

### SPRING-018
Java 에서 Annotation 은 어떤 기능을 하나요?

<details>
<summary>답변</summary>

**Annotation이란?**
- 소스 코드에 메타데이터를 추가하는 방법
- `@` 기호로 시작
- 그 자체로는 **동작하는 코드가 아님** (메타데이터일 뿐)

**Annotation의 용도**

1. **컴파일러 지시**
   - `@Override`: 메서드 오버라이딩 검증
   - `@Deprecated`: 사용 중지 권고 경고
   - `@SuppressWarnings`: 경고 억제

2. **컴파일 타임 코드 생성**
   - Lombok: `@Getter`, `@Setter` → 컴파일 시 코드 생성 (APT)

3. **런타임 처리**
   - Reflection을 통해 어노테이션 정보 읽고 처리
   - 프레임워크가 활용

**메타 어노테이션**
```java
@Target(ElementType.METHOD)      // 적용 대상
@Retention(RetentionPolicy.RUNTIME) // 유지 범위
@Documented                      // JavaDoc에 포함
@Inherited                       // 상속 시 전달
public @interface MyAnnotation { }
```

**Retention 정책**
| 정책 | 설명 |
|------|------|
| SOURCE | 소스 코드까지만 유지 (컴파일 후 삭제) |
| CLASS | 클래스 파일까지 유지 (런타임 접근 불가) |
| RUNTIME | 런타임에도 유지 (Reflection 가능) |

</details>

### SPRING-019
별 기능이 없는 것 같은데, 어떻게 Spring 에서는 Annotation 이 그렇게 많은 기능을 하는 걸까요?

<details>
<summary>답변</summary>

**핵심: Annotation 자체는 아무것도 안 함**
- Annotation은 단순한 **마커(표시)**일 뿐
- **Spring 프레임워크가 Reflection으로 읽고 처리**하기 때문에 기능이 동작하는 것

**Spring의 Annotation 처리 방식**

1. **컴포넌트 스캔 시점**
   - `@ComponentScan`이 지정된 패키지 스캔
   - 클래스에 `@Component`, `@Service` 등이 있는지 Reflection으로 확인
   - 있으면 Bean으로 등록

2. **BeanPostProcessor**
   - Bean 생성 전후에 Annotation 확인하고 처리
   - `@Autowired` → AutowiredAnnotationBeanPostProcessor가 의존성 주입
   - `@PostConstruct` → CommonAnnotationBeanPostProcessor가 초기화 메서드 호출

3. **AOP / 프록시 생성**
   - `@Transactional` → 프록시로 감싸서 트랜잭션 로직 추가
   - `@Async` → 프록시로 감싸서 비동기 실행

**동작 흐름 예시 (@Autowired)**
```
1. 스프링 컨테이너가 Bean 생성
2. AutowiredAnnotationBeanPostProcessor 동작
3. @Autowired 붙은 필드/생성자 찾기 (Reflection)
4. 해당 타입의 Bean을 찾아서 주입
```

**결론**: Annotation은 메타데이터, 실제 동작은 Spring의 **BeanPostProcessor, AOP 프록시, Reflection** 덕분

</details>

### SPRING-020
Lombok의 @Data를 잘 사용하지 않는 이유는 무엇일까요?

<details>
<summary>답변</summary>

**@Data가 포함하는 것**
```java
@Getter @Setter @ToString @EqualsAndHashCode @RequiredArgsConstructor
```

**사용을 지양하는 이유**

1. **@Setter의 무분별한 노출**
   - 모든 필드에 Setter가 생성됨
   - 객체의 불변성이 깨지고, 어디서든 값 변경 가능
   - 의도치 않은 상태 변경 발생 위험

2. **@ToString의 순환 참조 문제**
   - 양방향 연관관계 시 무한 루프 → StackOverflowError
   ```java
   @Entity class Team { List<Member> members; } // toString() 호출 시
   @Entity class Member { Team team; }          // 서로 호출 → 무한루프
   ```

3. **@EqualsAndHashCode 문제**
   - 모든 필드 포함 → 연관 엔티티 비교 시 문제
   - JPA Entity에서 `@EqualsAndHashCode(of = "id")` 권장

4. **불필요한 생성자**
   - `@RequiredArgsConstructor`가 항상 필요한 것은 아님

**권장 사용 방식**
```java
// 필요한 어노테이션만 명시적으로 사용
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode(of = "id")
@ToString(exclude = "team")
public class Member { }
```

**@Data 사용해도 되는 경우**
- DTO (단순 데이터 전달 객체)
- 연관관계 없는 단순 클래스

</details>

---

## 📌 서버와 네트워크

### SPRING-021
Tomcat이 정확히 어떤 역할을 하는 도구인가요?

<details>
<summary>답변</summary>

**Tomcat이란?**
- Apache 재단의 오픈소스 **서블릿 컨테이너** (= 웹 컨테이너)
- Java Servlet, JSP 스펙을 구현한 **WAS(Web Application Server)**

**주요 역할**

1. **HTTP 요청/응답 처리**
   - HTTP 프로토콜을 파싱하여 서블릿에 전달
   - 서블릿의 응답을 HTTP 형식으로 클라이언트에 전송

2. **서블릿 생명주기 관리**
   - 서블릿 인스턴스 생성, 초기화, 소멸 관리
   - `init()` → `service()` → `destroy()`

3. **스레드 풀 관리**
   - 요청마다 스레드를 할당하여 동시 처리
   - 커넥션 풀, 스레드 풀 관리

4. **정적 리소스 제공**
   - HTML, CSS, JS, 이미지 파일 서빙

**Tomcat 구조**
```
Server
└── Service
    ├── Connector (HTTP/AJP 처리)
    └── Engine
        └── Host
            └── Context (웹 애플리케이션)
```

**Spring Boot와의 관계**
- Spring Boot는 **Embedded Tomcat**을 내장
- 별도 Tomcat 설치 없이 JAR 파일로 실행 가능
- 다른 서버로 교체 가능: Jetty, Undertow, Netty

**WAS vs Web Server**
| 구분 | Web Server | WAS (Tomcat) |
|------|------------|--------------|
| 처리 대상 | 정적 콘텐츠 | 동적 콘텐츠 |
| 예시 | Nginx, Apache HTTP | Tomcat, Jetty |

</details>

### SPRING-022
혹시 Netty에 대해 들어보셨나요? 왜 이런 것을 사용할까요?

<details>
<summary>답변</summary>

**Netty란?**
- **비동기 이벤트 기반** 네트워크 프레임워크
- NIO(Non-blocking I/O) 기반의 고성능 서버 개발용
- 서블릿 스펙에 의존하지 않음

**Tomcat vs Netty**

| 구분 | Tomcat | Netty |
|------|--------|-------|
| I/O 모델 | Blocking (1요청 1스레드) | Non-blocking (이벤트 루프) |
| 스레드 수 | 요청 수에 비례 | 적은 스레드로 많은 요청 처리 |
| 메모리 | 스레드당 스택 메모리 필요 | 효율적 |
| 프로토콜 | HTTP 중심 | TCP/UDP/WebSocket 등 다양 |

**Netty 사용 이유**

1. **대규모 동시 접속 처리**
   - 적은 스레드로 수만 개 커넥션 처리 가능
   - WebSocket, 채팅 서버, 게임 서버에 적합

2. **낮은 지연 시간 (Low Latency)**
   - 이벤트 루프 기반으로 컨텍스트 스위칭 최소화

3. **다양한 프로토콜 지원**
   - HTTP/2, WebSocket, TCP, UDP 등

**Spring에서의 활용**
- **Spring WebFlux**: Netty를 기본 서버로 사용
- **Spring Cloud Gateway**: Netty 기반 API 게이트웨이

**언제 Netty를 선택?**
- 대규모 동시 접속이 필요한 경우
- 리액티브/비동기 프로그래밍 모델 사용 시
- WebSocket 기반 실시간 서비스

</details>

---

## 📌 Spring Framework 기초

### SPRING-023
Spring Framework의 기본 개념과 주요 특징에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Spring Framework란?**
- Java 기반 엔터프라이즈 애플리케이션 개발을 위한 **경량 프레임워크**
- EJB의 복잡성을 해결하고자 Rod Johnson이 2003년에 개발

**핵심 철학: POJO 기반 개발**
- Plain Old Java Object를 사용한 비침투적 설계
- 특정 기술에 종속되지 않는 깔끔한 코드

**주요 특징**

1. **IoC/DI (제어의 역전/의존성 주입)**
   - 객체 생성과 의존관계를 컨테이너가 관리
   - 결합도 감소, 테스트 용이성 향상

2. **AOP (관점 지향 프로그래밍)**
   - 횡단 관심사 분리 (로깅, 트랜잭션, 보안)
   - 비즈니스 로직에 집중 가능

3. **선언적 트랜잭션 관리**
   - @Transactional로 간편한 트랜잭션 처리

4. **다양한 기술 통합**
   - JPA, MyBatis, Redis, Kafka 등과 쉬운 연동

5. **모듈화**
   - 필요한 모듈만 선택 사용 가능
   - Core, MVC, Data, Security 등

**Spring의 장점**
- 낮은 결합도, 높은 응집도
- 테스트 용이성
- 풍부한 생태계와 커뮤니티

</details>

### SPRING-024
Spring Boot와 전통적 Spring Framework의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**Spring Boot의 탄생 배경**
- 기존 Spring의 복잡한 설정(XML, 의존성 관리)을 해결
- "Convention over Configuration" 철학

**주요 차이점**

| 구분 | Spring Framework | Spring Boot |
|------|------------------|-------------|
| 설정 방식 | XML/Java Config 직접 작성 | 자동 설정 (Auto-Configuration) |
| 의존성 | 개별 버전 관리 | Starter로 통합 관리 |
| 서버 | 외부 WAS 필요 | 내장 서버 (Tomcat, Jetty) |
| 배포 | WAR 배포 | JAR 실행 |
| 설정 파일 | 여러 XML 파일 | application.yml/properties |

**Spring Boot 핵심 기능**

1. **Auto-Configuration**
   - 클래스패스 기반 자동 Bean 설정
   - `@EnableAutoConfiguration`

2. **Starter Dependencies**
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-web</artifactId>
   </dependency>
   ```
   - 관련 의존성 버전 자동 관리

3. **Embedded Server**
   - Tomcat, Jetty, Undertow 내장
   - `java -jar app.jar`로 바로 실행

4. **Spring Boot Actuator**
   - 애플리케이션 모니터링 엔드포인트 제공

5. **Production-Ready**
   - Health check, Metrics 기본 제공

</details>

### SPRING-025
IoC(Inversion of Control)와 DI(Dependency Injection)의 개념 및 이점에 대해 설명해주세요.

<details>
<summary>답변</summary>

**IoC (제어의 역전)**
- 객체의 생성, 생명주기 관리 권한을 **프레임워크에 위임**
- 개발자가 `new`로 직접 객체를 생성하지 않음
- "Don't call us, we'll call you" 원칙

**DI (의존성 주입)**
- IoC를 구현하는 **구체적인 방법**
- 객체가 필요한 의존성을 외부에서 주입받음

**DI 방식 3가지**
```java
// 1. 생성자 주입 (권장)
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
}

// 2. Setter 주입
@Autowired
public void setOrderRepository(OrderRepository repo) { }

// 3. 필드 주입 (비권장)
@Autowired
private OrderRepository orderRepository;
```

**생성자 주입이 권장되는 이유**
- **불변성**: final 키워드 사용 가능
- **테스트 용이**: Mock 객체 쉽게 주입
- **순환 참조 방지**: 컴파일 타임에 발견 가능
- **필수 의존성 명확화**: 생성 시점에 주입 필수

**IoC/DI의 이점**
1. 느슨한 결합 (Loose Coupling)
2. 테스트 용이성 (Mock 주입)
3. 코드 재사용성 향상
4. 유지보수성 향상
5. 구현체 교체 용이

</details>

### SPRING-026
Spring Bean의 라이프사이클과 관련 콜백 메서드에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Bean 라이프사이클 단계**

```
스프링 컨테이너 생성 → Bean 생성 → 의존관계 주입 → 초기화 콜백 → 사용 → 소멸 콜백 → 스프링 종료
```

**초기화 콜백 (Bean 생성 후)**

1. **@PostConstruct** (권장)
   ```java
   @PostConstruct
   public void init() {
       // 초기화 로직
   }
   ```

2. **InitializingBean 인터페이스**
   ```java
   public void afterPropertiesSet() { }
   ```

3. **@Bean(initMethod = "init")**
   ```java
   @Bean(initMethod = "init")
   public MyBean myBean() { }
   ```

**소멸 콜백 (컨테이너 종료 시)**

1. **@PreDestroy** (권장)
   ```java
   @PreDestroy
   public void destroy() {
       // 리소스 정리
   }
   ```

2. **DisposableBean 인터페이스**
   ```java
   public void destroy() { }
   ```

3. **@Bean(destroyMethod = "close")**

**실행 순서**
- 초기화: `@PostConstruct` → `InitializingBean` → `initMethod`
- 소멸: `@PreDestroy` → `DisposableBean` → `destroyMethod`

**권장 방식**
- `@PostConstruct`, `@PreDestroy` 사용
- 자바 표준(JSR-250)으로 스프링에 의존하지 않음
- 코드 수정 불가 시 `@Bean`의 initMethod/destroyMethod 사용

</details>

### SPRING-027
@Component, @Service, @Repository의 차이점 및 사용 사례는 무엇인가요?

<details>
<summary>답변</summary>

**기본 관계**
```
@Component (부모)
    ├── @Service
    ├── @Repository
    └── @Controller
```

세 어노테이션 모두 `@Component`를 메타 어노테이션으로 가지며, **컴포넌트 스캔 대상**이 됩니다.

**각 어노테이션의 역할**

| 어노테이션 | 계층 | 역할 |
|-----------|------|------|
| `@Component` | 범용 | 일반적인 스프링 빈 등록 |
| `@Service` | 서비스 계층 | 비즈니스 로직 처리 |
| `@Repository` | 영속성 계층 | 데이터 접근 로직 (DAO) |
| `@Controller` | 표현 계층 | HTTP 요청/응답 처리 |

**@Repository의 특별한 기능**
- **예외 변환**: DB 관련 예외를 `DataAccessException`으로 자동 변환
- JPA, JDBC 등 기술에 종속적인 예외를 스프링 예외로 추상화

**@Service의 역할**
- 현재 특별한 추가 기능은 없음
- 비즈니스 계층임을 **의미적으로 표현**
- 향후 AOP 등에서 특별 처리 가능성

**사용 예시**
```java
@Repository
public class UserRepository { }  // DB 접근

@Service
public class UserService { }     // 비즈니스 로직

@Controller
public class UserController { }  // 요청 처리
```

**@Component 직접 사용 시**
- 특정 계층에 속하지 않는 유틸리티 클래스
- 예: 이메일 발송기, 암호화 유틸 등

</details>

### SPRING-028
AOP(Aspect Oriented Programming)를 활용한 공통 관심사 분리 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**공통 관심사 (Cross-Cutting Concerns)**
- 여러 모듈에 걸쳐 반복되는 부가 기능
- 예: 로깅, 트랜잭션, 보안, 성능 측정

**AOP로 분리하는 방법**

1. **Aspect 정의**
```java
@Aspect
@Component
public class LoggingAspect {

    // Pointcut: 어디에 적용할지
    @Pointcut("execution(* com.example.service.*.*(..))")
    public void serviceLayer() {}

    // Advice: 무엇을 할지
    @Around("serviceLayer()")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();

        Object result = joinPoint.proceed(); // 실제 메서드 실행

        long executionTime = System.currentTimeMillis() - start;
        log.info("{} executed in {}ms", joinPoint.getSignature(), executionTime);

        return result;
    }
}
```

**Pointcut 표현식 예시**

| 표현식 | 설명 |
|--------|------|
| `execution(* com.example..*.*(..))` | 모든 메서드 |
| `@annotation(LogExecutionTime)` | 특정 어노테이션 붙은 메서드 |
| `within(com.example.service.*)` | 특정 패키지 내 모든 메서드 |
| `bean(*Service)` | 이름이 Service로 끝나는 Bean |

**활용 예시**

| 관심사 | 구현 방식 |
|--------|-----------|
| 로깅 | @Around로 메서드 실행 전후 로깅 |
| 성능 측정 | @Around로 실행 시간 측정 |
| 권한 체크 | @Before로 진입 전 권한 검증 |
| 예외 처리 | @AfterThrowing으로 예외 로깅 |
| 트랜잭션 | @Transactional (내부적으로 AOP) |

</details>

### SPRING-029
Spring에서 트랜잭션 관리와 @Transactional 어노테이션의 역할에 대해 설명해주세요.

<details>
<summary>답변</summary>

**트랜잭션 관리 방식**

1. **프로그래밍 방식** (명시적)
   ```java
   transactionTemplate.execute(status -> {
       // 비즈니스 로직
       return result;
   });
   ```

2. **선언적 방식** (권장)
   ```java
   @Transactional
   public void updateUser() { }
   ```

**@Transactional 동작 원리**
- **AOP 프록시** 기반으로 동작
- 메서드 호출 전: 트랜잭션 시작
- 정상 완료: 커밋
- 예외 발생: 롤백

**주요 속성**

| 속성 | 설명 | 기본값 |
|------|------|--------|
| propagation | 전파 방식 | REQUIRED |
| isolation | 격리 수준 | DEFAULT |
| timeout | 타임아웃(초) | -1 (무제한) |
| readOnly | 읽기 전용 | false |
| rollbackFor | 롤백할 예외 | RuntimeException |

**전파 속성 (Propagation)**
```java
REQUIRED     // 기존 트랜잭션 참여, 없으면 새로 생성
REQUIRES_NEW // 항상 새 트랜잭션 (기존 것 일시 정지)
NESTED       // 중첩 트랜잭션 (Savepoint)
SUPPORTS     // 있으면 참여, 없으면 없이 실행
MANDATORY    // 반드시 기존 트랜잭션 필요
NOT_SUPPORTED // 트랜잭션 없이 실행
NEVER        // 트랜잭션 있으면 예외
```

**주의사항**
- public 메서드에만 적용
- self-invocation 시 프록시 우회
- Checked Exception은 기본 롤백 안 함

</details>

---

## 📌 Spring MVC와 웹 개발

### SPRING-030
Spring MVC 아키텍처의 구성 요소와 요청 처리 과정을 설명해주세요.

<details>
<summary>답변</summary>

**Spring MVC 핵심 구성 요소**

| 구성 요소 | 역할 |
|-----------|------|
| DispatcherServlet | 프론트 컨트롤러, 모든 요청의 진입점 |
| HandlerMapping | URL → 핸들러(Controller) 매핑 |
| HandlerAdapter | 다양한 핸들러 실행 방식 지원 |
| Controller | 비즈니스 로직 처리 |
| ViewResolver | 뷰 이름 → 실제 View 변환 |
| View | 응답 렌더링 |

**요청 처리 흐름**

```
1. 클라이언트 요청
        ↓
2. DispatcherServlet (Front Controller)
        ↓
3. HandlerMapping → 핸들러 조회
        ↓
4. HandlerAdapter → 핸들러 실행
        ↓
5. Controller → 비즈니스 로직 수행
        ↓
6. ModelAndView 반환
        ↓
7. ViewResolver → View 객체 반환
        ↓
8. View → 렌더링
        ↓
9. 클라이언트 응답
```

**REST API의 경우 (@RestController)**
```
요청 → DispatcherServlet → HandlerMapping → HandlerAdapter
    → Controller → HttpMessageConverter → JSON 응답
```
- ViewResolver 단계 생략
- `@ResponseBody`로 객체를 JSON으로 직렬화

**주요 HandlerMapping**
- `RequestMappingHandlerMapping`: @RequestMapping 기반 (가장 일반적)
- `BeanNameUrlHandlerMapping`: Bean 이름 기반

**주요 HandlerAdapter**
- `RequestMappingHandlerAdapter`: @RequestMapping 처리

</details>

### SPRING-031
Spring Boot의 자동 구성(Auto-Configuration) 원리에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Auto-Configuration이란?**
- 클래스패스, 설정값, Bean 존재 여부 등을 기반으로 **자동으로 Bean을 등록**하는 기능
- 개발자가 직접 설정하지 않아도 필요한 설정이 자동 적용

**동작 원리**

1. **@SpringBootApplication**
   ```java
   @SpringBootConfiguration
   @EnableAutoConfiguration  // 자동 구성 활성화
   @ComponentScan
   ```

2. **spring.factories / AutoConfiguration.imports 파일**
   - `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports`
   - 자동 구성 클래스 목록이 정의됨

3. **조건부 설정 (@Conditional)**
   ```java
   @Configuration
   @ConditionalOnClass(DataSource.class)  // 클래스 존재 시
   @ConditionalOnMissingBean(DataSource.class)  // Bean 없을 때만
   public class DataSourceAutoConfiguration { }
   ```

**주요 @Conditional 어노테이션**

| 어노테이션 | 조건 |
|------------|------|
| @ConditionalOnClass | 특정 클래스가 클래스패스에 있을 때 |
| @ConditionalOnMissingBean | 해당 Bean이 없을 때 |
| @ConditionalOnProperty | 특정 프로퍼티 값일 때 |
| @ConditionalOnWebApplication | 웹 애플리케이션일 때 |

**예시: DataSource 자동 구성**
1. `spring-boot-starter-jdbc` 의존성 추가
2. 클래스패스에 `DataSource.class` 존재
3. `DataSourceAutoConfiguration` 활성화
4. `application.yml`의 설정으로 DataSource Bean 생성

**자동 구성 비활성화**
```java
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
```

</details>

### SPRING-032
예외 처리를 위한 @ControllerAdvice의 역할과 활용 방법은 무엇인가요?

<details>
<summary>답변</summary>

**@ControllerAdvice란?**
- **전역 예외 처리**를 담당하는 클래스
- 모든 컨트롤러에서 발생하는 예외를 한 곳에서 처리
- AOP 기반으로 동작

**기본 사용법**
```java
@RestControllerAdvice  // @ControllerAdvice + @ResponseBody
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException e) {
        return ResponseEntity.badRequest()
            .body(new ErrorResponse("BAD_REQUEST", e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        return ResponseEntity.internalServerError()
            .body(new ErrorResponse("INTERNAL_ERROR", "서버 오류 발생"));
    }
}
```

**주요 기능**

1. **@ExceptionHandler**: 특정 예외 처리
2. **@ModelAttribute**: 모든 컨트롤러에 공통 모델 데이터 추가
3. **@InitBinder**: 요청 파라미터 바인딩 커스터마이징

**적용 범위 제한**
```java
// 특정 패키지만 적용
@ControllerAdvice("com.example.api")

// 특정 어노테이션이 붙은 컨트롤러만
@ControllerAdvice(annotations = RestController.class)

// 특정 컨트롤러만
@ControllerAdvice(assignableTypes = {UserController.class})
```

**예외 처리 우선순위**
1. 컨트롤러 내 `@ExceptionHandler`
2. `@ControllerAdvice` 내 `@ExceptionHandler`
3. 더 구체적인 예외가 우선

</details>

### SPRING-033
Spring Security의 기본 개념과 인증/인가 처리 흐름에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Spring Security란?**
- 인증(Authentication)과 인가(Authorization)를 담당하는 보안 프레임워크
- **Filter 기반**으로 동작

**인증 vs 인가**
| 구분 | 인증 (Authentication) | 인가 (Authorization) |
|------|----------------------|---------------------|
| 의미 | 누구인지 확인 | 권한이 있는지 확인 |
| 예시 | 로그인 | 관리자 페이지 접근 권한 |

**핵심 구성 요소**

| 구성 요소 | 역할 |
|-----------|------|
| SecurityFilterChain | 보안 필터 체인 |
| AuthenticationManager | 인증 처리 관리 |
| UserDetailsService | 사용자 정보 로드 |
| PasswordEncoder | 비밀번호 암호화 |

**인증 처리 흐름**
```
1. HTTP 요청
        ↓
2. UsernamePasswordAuthenticationFilter
        ↓
3. AuthenticationManager.authenticate()
        ↓
4. AuthenticationProvider
        ↓
5. UserDetailsService.loadUserByUsername()
        ↓
6. 비밀번호 검증 (PasswordEncoder)
        ↓
7. Authentication 객체 생성
        ↓
8. SecurityContextHolder에 저장
```

**기본 설정 예시**
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
            )
            .formLogin(withDefaults())
            .httpBasic(withDefaults());
        return http.build();
    }
}
```

</details>

### SPRING-034
RESTful API를 Spring에서 구현하는 방법과 모범 사례는 무엇인가요?

<details>
<summary>답변</summary>

**RESTful API 구현 기본**

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    public List<UserDto> getUsers() { }

    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable Long id) { }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto createUser(@RequestBody @Valid CreateUserRequest request) { }

    @PutMapping("/{id}")
    public UserDto updateUser(@PathVariable Long id, @RequestBody UpdateUserRequest request) { }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) { }
}
```

**REST 설계 모범 사례**

1. **명사형 URI 사용**
   - Good: `/api/users`, `/api/orders`
   - Bad: `/api/getUsers`, `/api/createOrder`

2. **HTTP 메서드 의미 준수**
   | 메서드 | 용도 | 멱등성 |
   |--------|------|--------|
   | GET | 조회 | O |
   | POST | 생성 | X |
   | PUT | 전체 수정 | O |
   | PATCH | 부분 수정 | O |
   | DELETE | 삭제 | O |

3. **적절한 상태 코드 반환**
   - 200: 성공, 201: 생성됨, 204: 내용 없음
   - 400: 잘못된 요청, 401: 인증 필요, 403: 권한 없음, 404: 없음

4. **일관된 응답 형식**
   ```json
   {
     "status": "success",
     "data": { ... },
     "message": null
   }
   ```

5. **페이징 처리**
   ```java
   @GetMapping
   public Page<UserDto> getUsers(Pageable pageable) { }
   // GET /api/users?page=0&size=20&sort=createdAt,desc
   ```

6. **버전 관리**
   - URI: `/api/v1/users`
   - Header: `Accept: application/vnd.api.v1+json`

</details>

---

## 📌 Spring Boot 운영과 모니터링

### SPRING-035
Spring Boot Actuator를 통한 애플리케이션 모니터링 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Spring Boot Actuator란?**
- 애플리케이션의 **상태, 메트릭, 헬스체크** 등을 모니터링하는 기능 제공
- 운영 환경에서 애플리케이션 관리를 위한 HTTP 엔드포인트 제공

**의존성 추가**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

**주요 엔드포인트**

| 엔드포인트 | 설명 |
|------------|------|
| /actuator/health | 애플리케이션 상태 |
| /actuator/info | 애플리케이션 정보 |
| /actuator/metrics | 메트릭 정보 |
| /actuator/env | 환경 변수 |
| /actuator/loggers | 로거 설정 |
| /actuator/beans | 등록된 Bean 목록 |
| /actuator/threaddump | 스레드 덤프 |
| /actuator/heapdump | 힙 덤프 |

**설정 예시**
```yaml
management:
  endpoints:
    web:
      exposure:
        include: health, info, metrics, prometheus
  endpoint:
    health:
      show-details: always  # 상세 정보 표시
```

**Prometheus + Grafana 연동**
```xml
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
```
- `/actuator/prometheus` 엔드포인트 활성화
- Prometheus가 메트릭 수집 → Grafana로 시각화

**보안 설정**
- 운영 환경에서는 민감 엔드포인트 접근 제한 필요
- Spring Security와 연동하여 인증 적용

</details>

### SPRING-036
Spring Cloud를 활용한 마이크로서비스 아키텍처 구현 전략에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Spring Cloud란?**
- 마이크로서비스 아키텍처(MSA) 구축을 위한 **도구 모음**
- 분산 시스템의 공통 패턴들을 쉽게 구현

**핵심 구성 요소**

| 컴포넌트 | 역할 | 구현체 |
|----------|------|--------|
| Service Discovery | 서비스 등록/발견 | Eureka, Consul |
| API Gateway | 라우팅, 인증, 로드밸런싱 | Spring Cloud Gateway |
| Config Server | 중앙 집중식 설정 관리 | Spring Cloud Config |
| Circuit Breaker | 장애 전파 방지 | Resilience4j |
| Distributed Tracing | 분산 추적 | Zipkin, Jaeger |

**1. Service Discovery (Eureka)**
```java
// 서비스 등록
@EnableEurekaClient
@SpringBootApplication
public class UserServiceApplication { }

// 서비스 발견
@FeignClient(name = "order-service")
public interface OrderClient {
    @GetMapping("/orders/{userId}")
    List<Order> getOrders(@PathVariable Long userId);
}
```

**2. API Gateway**
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://USER-SERVICE
          predicates:
            - Path=/api/users/**
```

**3. Circuit Breaker (Resilience4j)**
```java
@CircuitBreaker(name = "orderService", fallbackMethod = "fallback")
public List<Order> getOrders(Long userId) { }

public List<Order> fallback(Long userId, Exception e) {
    return Collections.emptyList();
}
```

**4. Config Server**
- Git 저장소에 설정 파일 관리
- 애플리케이션 재시작 없이 설정 변경 가능

**MSA 구현 시 고려사항**
- 서비스 간 통신: REST, gRPC, 메시지 큐
- 데이터 일관성: Saga 패턴, 이벤트 소싱
- 장애 대응: 타임아웃, 재시도, 폴백

</details>

### SPRING-037
Spring에서 메시징 시스템(Kafka, RabbitMQ 등)과의 연동 방법은 무엇인가요?

<details>
<summary>답변</summary>

**메시징 시스템 사용 이유**
- 서비스 간 비동기 통신
- 시스템 간 결합도 감소
- 부하 분산 및 버퍼링

**1. Spring Kafka 연동**

```xml
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
```

```yaml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      group-id: my-group
```

```java
// Producer
@Service
public class KafkaProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;

    public void send(String topic, String message) {
        kafkaTemplate.send(topic, message);
    }
}

// Consumer
@KafkaListener(topics = "my-topic", groupId = "my-group")
public void consume(String message) {
    log.info("Received: {}", message);
}
```

**2. Spring AMQP (RabbitMQ) 연동**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

```java
// Producer
@Service
public class RabbitProducer {
    private final RabbitTemplate rabbitTemplate;

    public void send(String exchange, String routingKey, String message) {
        rabbitTemplate.convertAndSend(exchange, routingKey, message);
    }
}

// Consumer
@RabbitListener(queues = "my-queue")
public void consume(String message) {
    log.info("Received: {}", message);
}
```

**Kafka vs RabbitMQ**

| 구분 | Kafka | RabbitMQ |
|------|-------|----------|
| 처리량 | 높음 (대용량) | 중간 |
| 메시지 저장 | 디스크에 영구 저장 | 메모리 우선 |
| 순서 보장 | 파티션 내 보장 | 큐 내 보장 |
| 적합 용도 | 이벤트 스트리밍, 로그 | 작업 큐, RPC |

</details>

### SPRING-038
Spring의 캐싱 추상화(Cache Abstraction)와 캐시 적용 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Spring Cache Abstraction이란?**
- 캐시 구현체에 독립적인 **추상화 계층** 제공
- 어노테이션 기반으로 간편하게 캐시 적용
- 구현체: ConcurrentHashMap, Ehcache, Redis, Caffeine 등

**활성화**
```java
@EnableCaching
@SpringBootApplication
public class Application { }
```

**주요 어노테이션**

| 어노테이션 | 역할 |
|------------|------|
| @Cacheable | 캐시 조회, 없으면 메서드 실행 후 저장 |
| @CachePut | 항상 메서드 실행 후 캐시 저장 |
| @CacheEvict | 캐시 삭제 |
| @Caching | 여러 캐시 작업 조합 |

**사용 예시**
```java
@Service
public class UserService {

    // 캐시 조회, 없으면 DB 조회 후 캐시
    @Cacheable(value = "users", key = "#id")
    public User getUser(Long id) {
        return userRepository.findById(id);
    }

    // 항상 실행 후 캐시 갱신
    @CachePut(value = "users", key = "#user.id")
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    // 캐시 삭제
    @CacheEvict(value = "users", key = "#id")
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // 전체 캐시 삭제
    @CacheEvict(value = "users", allEntries = true)
    public void clearCache() { }
}
```

**Redis 캐시 설정**
```yaml
spring:
  cache:
    type: redis
  redis:
    host: localhost
    port: 6379
```

**주의사항**
- **Self-invocation**: 같은 클래스 내 호출 시 캐시 미적용 (프록시 우회)
- **캐시 키 설계**: 충돌 방지를 위해 명확한 키 전략 필요
- **TTL 설정**: 데이터 정합성을 위해 만료 시간 설정 권장

</details>

### SPRING-039
Spring Boot에서 프로파일 관리와 환경별 설정 적용 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Spring Profile이란?**
- 환경별(개발, 테스트, 운영)로 다른 설정을 적용하는 기능
- Bean, 설정 파일을 환경별로 분리 가능

**프로파일 설정 방법**

**1. 설정 파일 분리**
```
application.yml          # 공통 설정
application-dev.yml      # 개발 환경
application-prod.yml     # 운영 환경
application-test.yml     # 테스트 환경
```

**2. 프로파일 활성화**
```yaml
# application.yml
spring:
  profiles:
    active: dev
```

```bash
# 실행 시 지정
java -jar app.jar --spring.profiles.active=prod

# 환경 변수
export SPRING_PROFILES_ACTIVE=prod
```

**3. 환경별 Bean 등록**
```java
@Configuration
@Profile("dev")
public class DevConfig {
    @Bean
    public DataSource dataSource() {
        // H2 인메모리 DB
    }
}

@Configuration
@Profile("prod")
public class ProdConfig {
    @Bean
    public DataSource dataSource() {
        // MySQL 설정
    }
}
```

**4. 프로파일 그룹**
```yaml
spring:
  profiles:
    group:
      prod: prod-db, prod-cache, prod-logging
```

**환경별 설정 예시**
```yaml
# application-dev.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
logging:
  level:
    root: DEBUG

# application-prod.yml
spring:
  datasource:
    url: jdbc:mysql://prod-db:3306/app
logging:
  level:
    root: WARN
```

**@Profile 사용**
```java
@Service
@Profile("!prod")  // prod가 아닐 때만 활성화
public class MockEmailService implements EmailService { }
```

</details>

---

## 📌 Spring Bean 고급

### SPRING-040
Spring Bean의 Scope(싱글톤, 프로토타입 등) 차이점과 활용 사례는 무엇인가요?

<details>
<summary>답변</summary>

**Bean Scope 종류**

| Scope | 설명 | 생명주기 관리 |
|-------|------|---------------|
| singleton | 컨테이너당 하나 (기본값) | 컨테이너 전체 |
| prototype | 요청마다 새로 생성 | 생성까지만 |
| request | HTTP 요청당 하나 | 요청 범위 |
| session | HTTP 세션당 하나 | 세션 범위 |
| application | ServletContext당 하나 | 앱 전체 |
| websocket | WebSocket 세션당 하나 | WebSocket 범위 |

**1. Singleton (기본값)**
```java
@Component  // 기본 싱글톤
public class UserService { }
```
- **활용**: 상태 없는(stateless) 서비스, 레포지토리
- **주의**: 인스턴스 변수에 상태 저장 금지

**2. Prototype**
```java
@Component
@Scope("prototype")
public class RequestContext { }
```
- **활용**: 상태를 가지는 객체, 매번 새 인스턴스 필요 시
- **주의**: @PreDestroy 호출 안 됨

**3. Request/Session (웹 스코프)**
```java
@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class RequestLogger { }
```
- **활용**: 사용자별 데이터, 요청 로깅

**싱글톤에서 프로토타입 주입 문제**
```java
@Component
public class SingletonBean {
    @Autowired
    private PrototypeBean prototypeBean;  // 한 번만 주입됨!
}

// 해결: ObjectProvider 사용
@Component
public class SingletonBean {
    @Autowired
    private ObjectProvider<PrototypeBean> provider;

    public void logic() {
        PrototypeBean bean = provider.getObject();  // 매번 새 인스턴스
    }
}
```

</details>

### SPRING-041
Spring의 이벤트 발행 및 리스너(Event Listener) 메커니즘에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Spring Event란?**
- 애플리케이션 내 **느슨한 결합**으로 컴포넌트 간 통신
- **Observer 패턴** 기반
- 발행자(Publisher)와 구독자(Listener) 분리

**이벤트 정의**
```java
// 커스텀 이벤트
public class OrderCreatedEvent {
    private final Long orderId;
    private final Long userId;

    public OrderCreatedEvent(Long orderId, Long userId) {
        this.orderId = orderId;
        this.userId = userId;
    }
}
```

**이벤트 발행**
```java
@Service
@RequiredArgsConstructor
public class OrderService {
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public void createOrder(OrderRequest request) {
        Order order = orderRepository.save(new Order(request));

        // 이벤트 발행
        eventPublisher.publishEvent(new OrderCreatedEvent(order.getId(), request.getUserId()));
    }
}
```

**이벤트 리스너**
```java
@Component
public class OrderEventListener {

    // 동기 처리 (기본)
    @EventListener
    public void handleOrderCreated(OrderCreatedEvent event) {
        log.info("Order created: {}", event.getOrderId());
    }

    // 비동기 처리
    @Async
    @EventListener
    public void sendEmailAsync(OrderCreatedEvent event) {
        emailService.sendOrderConfirmation(event.getUserId());
    }

    // 조건부 처리
    @EventListener(condition = "#event.orderId > 100")
    public void handleLargeOrder(OrderCreatedEvent event) { }
}
```

**트랜잭션 연동**
```java
// 트랜잭션 커밋 후 실행
@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
public void afterCommit(OrderCreatedEvent event) { }

// 트랜잭션 롤백 시 실행
@TransactionalEventListener(phase = TransactionPhase.AFTER_ROLLBACK)
public void afterRollback(OrderCreatedEvent event) { }
```

**활용 사례**
- 주문 완료 → 이메일/알림 발송
- 회원 가입 → 포인트 지급
- 결제 완료 → 재고 차감

</details>

### SPRING-042
커스텀 어노테이션을 생성하고 이를 Spring에서 활용하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**커스텀 어노테이션 생성**
```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface LogExecutionTime {
    String value() default "";
}
```

**메타 어노테이션 설명**
| 어노테이션 | 역할 |
|------------|------|
| @Target | 적용 대상 (METHOD, TYPE, FIELD 등) |
| @Retention | 유지 범위 (SOURCE, CLASS, RUNTIME) |
| @Documented | JavaDoc에 포함 |
| @Inherited | 상속 시 전달 |

**활용 방법 1: AOP와 결합**
```java
@Aspect
@Component
public class LoggingAspect {

    @Around("@annotation(LogExecutionTime)")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();

        Object result = joinPoint.proceed();

        long executionTime = System.currentTimeMillis() - start;
        log.info("{} executed in {}ms",
            joinPoint.getSignature().getName(), executionTime);

        return result;
    }
}

// 사용
@LogExecutionTime
public void processOrder() { }
```

**활용 방법 2: HandlerMethodArgumentResolver**
```java
// 현재 사용자 주입 어노테이션
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface CurrentUser { }

// Resolver 구현
public class CurrentUserArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(CurrentUser.class);
    }

    @Override
    public Object resolveArgument(...) {
        return SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}

// 사용
@GetMapping("/profile")
public UserDto getProfile(@CurrentUser User user) { }
```

**활용 방법 3: 조합 어노테이션**
```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Service
@Transactional(readOnly = true)
public @interface ReadOnlyService { }
```

</details>

---

## 📌 Spring WebFlux와 비동기

### SPRING-043
Spring WebFlux와 Spring MVC의 차이점 및 사용 시나리오는 무엇인가요?

<details>
<summary>답변</summary>

**핵심 차이점**

| 구분 | Spring MVC | Spring WebFlux |
|------|------------|----------------|
| 프로그래밍 모델 | 동기/블로킹 | 비동기/논블로킹 |
| 서버 | Tomcat (서블릿) | Netty (기본) |
| 스레드 모델 | 요청당 스레드 | 이벤트 루프 |
| 반환 타입 | Object, ResponseEntity | Mono, Flux |
| 동시 처리 | 스레드 수에 비례 | 적은 스레드로 많은 요청 |

**Spring WebFlux 코드 예시**
```java
@RestController
public class UserController {

    @GetMapping("/user/{id}")
    public Mono<User> getUser(@PathVariable Long id) {
        return userRepository.findById(id);
    }

    @GetMapping("/users")
    public Flux<User> getUsers() {
        return userRepository.findAll();
    }
}
```

**Mono vs Flux**
- **Mono**: 0~1개의 데이터 (단건)
- **Flux**: 0~N개의 데이터 (스트림)

**WebFlux 사용이 적합한 경우**
1. **대규모 동시 접속**: 수만 개의 커넥션 처리
2. **스트리밍 데이터**: 실시간 피드, SSE
3. **마이크로서비스 게이트웨이**: 여러 서비스 호출 조합
4. **I/O 집약적 작업**: 외부 API 호출이 많은 경우

**Spring MVC가 더 나은 경우**
1. **CPU 집약적 작업**: 복잡한 연산
2. **JDBC/JPA 사용**: 블로킹 드라이버
3. **기존 동기 라이브러리 의존**
4. **팀의 학습 곡선 고려**

**주의사항**
- 전체 스택이 논블로킹이어야 효과 있음
- 하나라도 블로킹 호출이 있으면 이벤트 루프 블록
- R2DBC (리액티브 DB 드라이버) 필요

</details>

### SPRING-044
Spring에서 비동기 처리(Asynchronous Processing)를 구현하는 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**비동기 처리 활성화**
```java
@EnableAsync
@SpringBootApplication
public class Application { }
```

**1. @Async 사용**
```java
@Service
public class EmailService {

    @Async
    public void sendEmail(String to, String content) {
        // 별도 스레드에서 실행
        emailClient.send(to, content);
    }

    @Async
    public CompletableFuture<String> sendEmailWithResult(String to) {
        String result = emailClient.send(to);
        return CompletableFuture.completedFuture(result);
    }
}
```

**2. 커스텀 Executor 설정**
```java
@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("Async-");
        executor.initialize();
        return executor;
    }
}

// 사용
@Async("taskExecutor")
public void process() { }
```

**3. CompletableFuture 조합**
```java
public CompletableFuture<OrderResult> processOrder(OrderRequest request) {
    CompletableFuture<Stock> stockFuture = checkStock(request);
    CompletableFuture<Payment> paymentFuture = processPayment(request);

    return stockFuture.thenCombine(paymentFuture, (stock, payment) -> {
        return new OrderResult(stock, payment);
    });
}
```

**4. 예외 처리**
```java
@Component
public class AsyncExceptionHandler implements AsyncUncaughtExceptionHandler {
    @Override
    public void handleUncaughtException(Throwable ex, Method method, Object... params) {
        log.error("Async exception in {}: {}", method.getName(), ex.getMessage());
    }
}
```

**주의사항**
- **Self-invocation 불가**: 같은 클래스 내 호출 시 @Async 미적용
- **void 또는 Future 반환**: 다른 타입 반환 시 결과를 받을 수 없음
- **트랜잭션 분리**: @Async 메서드는 별도 트랜잭션

**반환 타입**
| 타입 | 설명 |
|------|------|
| void | 결과 불필요 |
| Future<T> | 결과 대기 가능 |
| CompletableFuture<T> | 조합, 체이닝 가능 |

</details>

---

## 📌 Spring 로깅과 메시지 변환

### SPRING-045
Logback을 이용한 Spring Boot의 로깅 설정과 관리 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Spring Boot 기본 로깅**
- **기본 로깅 프레임워크**: Logback
- **로깅 파사드**: SLF4J
- 별도 설정 없이 바로 사용 가능

**application.yml 설정**
```yaml
logging:
  level:
    root: INFO
    com.example: DEBUG
    org.springframework.web: WARN
  file:
    name: logs/app.log
    max-size: 10MB
    max-history: 30
  pattern:
    console: "%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
```

**logback-spring.xml (상세 설정)**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!-- 프로파일별 설정 -->
    <springProfile name="dev">
        <root level="DEBUG">
            <appender-ref ref="CONSOLE"/>
        </root>
    </springProfile>

    <springProfile name="prod">
        <root level="INFO">
            <appender-ref ref="FILE"/>
        </root>
    </springProfile>

    <!-- 콘솔 출력 -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <!-- 파일 출력 (롤링) -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/app.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/app.%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
    </appender>
</configuration>
```

**로그 레벨**
| 레벨 | 용도 |
|------|------|
| TRACE | 가장 상세한 정보 |
| DEBUG | 디버깅용 |
| INFO | 일반 정보 |
| WARN | 경고 |
| ERROR | 오류 |

**코드에서 사용**
```java
@Slf4j  // Lombok
public class UserService {
    public void process() {
        log.debug("Processing started");
        log.info("User {} logged in", userId);
        log.error("Error occurred", exception);
    }
}
```

</details>

### SPRING-046
HttpMessageConverter의 역할과 Spring에서의 메시지 변환 과정을 설명해주세요.

<details>
<summary>답변</summary>

**HttpMessageConverter란?**
- HTTP 요청/응답 본문(body)을 Java 객체로 **변환**하는 인터페이스
- `@RequestBody`, `@ResponseBody` 처리의 핵심

**동작 흐름**

**요청 시 (역직렬화)**
```
HTTP 요청 Body (JSON)
        ↓
HttpMessageConverter.read()
        ↓
Java 객체 (@RequestBody)
```

**응답 시 (직렬화)**
```
Java 객체
        ↓
HttpMessageConverter.write()
        ↓
HTTP 응답 Body (JSON)
```

**주요 HttpMessageConverter**

| Converter | 역할 |
|-----------|------|
| MappingJackson2HttpMessageConverter | JSON ↔ 객체 (Jackson) |
| StringHttpMessageConverter | String 처리 |
| ByteArrayHttpMessageConverter | byte[] 처리 |
| FormHttpMessageConverter | Form 데이터 처리 |

**Content-Type 기반 선택**
- `application/json` → MappingJackson2HttpMessageConverter
- `text/plain` → StringHttpMessageConverter
- `application/x-www-form-urlencoded` → FormHttpMessageConverter

**커스텀 설정**
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);

        MappingJackson2HttpMessageConverter converter =
            new MappingJackson2HttpMessageConverter(objectMapper);
        converters.add(converter);
    }
}
```

**Jackson 설정 (application.yml)**
```yaml
spring:
  jackson:
    property-naming-strategy: SNAKE_CASE
    serialization:
      write-dates-as-timestamps: false
    deserialization:
      fail-on-unknown-properties: false
```

</details>

### SPRING-047
RestTemplate과 WebClient의 차이점 및 사용 사례에 대해 설명해주세요.

<details>
<summary>답변</summary>

**RestTemplate vs WebClient**

| 구분 | RestTemplate | WebClient |
|------|--------------|-----------|
| 방식 | 동기/블로킹 | 비동기/논블로킹 |
| 스레드 | 응답까지 스레드 점유 | 논블로킹으로 스레드 효율적 |
| 지원 | 유지보수 모드 (Deprecated 예정) | 권장 |
| 의존성 | spring-web | spring-webflux |

**RestTemplate 사용**
```java
@Configuration
public class RestTemplateConfig {
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder
            .setConnectTimeout(Duration.ofSeconds(5))
            .setReadTimeout(Duration.ofSeconds(5))
            .build();
    }
}

// 사용
@Service
public class UserClient {
    private final RestTemplate restTemplate;

    public UserDto getUser(Long id) {
        return restTemplate.getForObject(
            "http://api.example.com/users/{id}",
            UserDto.class,
            id
        );
    }
}
```

**WebClient 사용**
```java
@Configuration
public class WebClientConfig {
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
            .baseUrl("http://api.example.com")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();
    }
}

// 비동기 사용
public Mono<UserDto> getUser(Long id) {
    return webClient.get()
        .uri("/users/{id}", id)
        .retrieve()
        .bodyToMono(UserDto.class);
}

// 동기처럼 사용 (block)
public UserDto getUserSync(Long id) {
    return webClient.get()
        .uri("/users/{id}", id)
        .retrieve()
        .bodyToMono(UserDto.class)
        .block();  // 블로킹 대기
}
```

**WebClient 권장 이유**
1. **성능**: 논블로킹으로 리소스 효율적
2. **유연성**: 동기/비동기 모두 지원
3. **함수형 API**: 체이닝으로 가독성 좋음
4. **미래 지향적**: Spring 공식 권장

**사용 시나리오**
- **RestTemplate**: 간단한 동기 호출, 레거시 코드
- **WebClient**: 새 프로젝트, 높은 동시성, 리액티브 스택

</details>

---

## 📌 Spring 스케줄링과 Starter

### SPRING-048
@Scheduled 애노테이션을 사용한 스케줄링 작업 구현 방법은 무엇인가요?

<details>
<summary>답변</summary>

**스케줄링 활성화**
```java
@EnableScheduling
@SpringBootApplication
public class Application { }
```

**@Scheduled 사용법**

**1. 고정 간격 (fixedRate)**
```java
@Scheduled(fixedRate = 5000)  // 5초마다 (이전 시작 시점 기준)
public void runEvery5Seconds() {
    log.info("Fixed rate task");
}
```

**2. 고정 지연 (fixedDelay)**
```java
@Scheduled(fixedDelay = 5000)  // 이전 종료 후 5초 대기
public void runWithDelay() {
    log.info("Fixed delay task");
}
```

**3. Cron 표현식**
```java
@Scheduled(cron = "0 0 9 * * MON-FRI")  // 평일 오전 9시
public void runWeekdayMorning() {
    log.info("Weekday morning task");
}
```

**Cron 표현식 형식**
```
초 분 시 일 월 요일
0  0  9  *  *  MON-FRI
```

| 필드 | 값 범위 |
|------|---------|
| 초 | 0-59 |
| 분 | 0-59 |
| 시 | 0-23 |
| 일 | 1-31 |
| 월 | 1-12 또는 JAN-DEC |
| 요일 | 0-7 또는 SUN-SAT |

**Cron 예시**
| 표현식 | 의미 |
|--------|------|
| `0 0 * * * *` | 매시 정각 |
| `0 0 0 * * *` | 매일 자정 |
| `0 0 12 * * MON` | 매주 월요일 12시 |
| `0 */10 * * * *` | 10분마다 |

**스레드 풀 설정**
```java
@Configuration
public class SchedulerConfig implements SchedulingConfigurer {
    @Override
    public void configureTasks(ScheduledTaskRegistrar registrar) {
        registrar.setScheduler(Executors.newScheduledThreadPool(5));
    }
}
```

**동적 스케줄링 (DB에서 주기 조회)**
```java
@Scheduled(fixedDelayString = "${scheduler.interval}")
public void dynamicTask() { }
```

</details>

### SPRING-049
Spring Boot Starter의 개념과 주요 Starter들의 역할에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Spring Boot Starter란?**
- 특정 기능에 필요한 **의존성들을 묶어둔 패키지**
- 의존성 버전 관리 자동화
- Auto-Configuration과 함께 동작

**Starter의 장점**
1. 관련 의존성 한 번에 추가
2. 호환되는 버전 자동 관리
3. 보일러플레이트 설정 최소화

**주요 Starter 목록**

| Starter | 역할 |
|---------|------|
| spring-boot-starter | 기본 (core, logging, autoconfigure) |
| spring-boot-starter-web | 웹 애플리케이션 (Tomcat, Spring MVC) |
| spring-boot-starter-webflux | 리액티브 웹 (Netty, WebFlux) |
| spring-boot-starter-data-jpa | JPA + Hibernate |
| spring-boot-starter-data-redis | Redis 연동 |
| spring-boot-starter-security | Spring Security |
| spring-boot-starter-test | 테스트 (JUnit, Mockito, AssertJ) |
| spring-boot-starter-actuator | 모니터링 엔드포인트 |
| spring-boot-starter-validation | Bean Validation |
| spring-boot-starter-cache | 캐시 추상화 |
| spring-boot-starter-mail | 이메일 발송 |
| spring-boot-starter-batch | 배치 처리 |

**사용 예시**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <!-- 버전 명시 불필요: parent에서 관리 -->
</dependency>
```

**spring-boot-starter-web 포함 내용**
- Spring MVC
- Tomcat (내장 서버)
- Jackson (JSON 처리)
- Validation
- Logging (Logback)

**커스텀 Starter 만들기**
- 자체 Auto-Configuration 제공 가능
- 사내 공통 라이브러리 배포에 유용

</details>

### SPRING-050
Java Config와 XML Config를 통한 Bean 등록 및 설정 방식의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**설정 방식 비교**

| 구분 | XML Config | Java Config |
|------|------------|-------------|
| 방식 | XML 파일 | Java 클래스 + 어노테이션 |
| 컴파일 검증 | 런타임 오류 | 컴파일 타임 오류 |
| IDE 지원 | 제한적 | 자동완성, 리팩토링 가능 |
| 트렌드 | 레거시 | 현재 표준 |

**XML Config 예시**
```xml
<!-- applicationContext.xml -->
<beans>
    <bean id="userRepository" class="com.example.UserRepository"/>

    <bean id="userService" class="com.example.UserService">
        <constructor-arg ref="userRepository"/>
        <property name="timeout" value="3000"/>
    </bean>
</beans>
```

**Java Config 예시**
```java
@Configuration
public class AppConfig {

    @Bean
    public UserRepository userRepository() {
        return new UserRepository();
    }

    @Bean
    public UserService userService(UserRepository userRepository) {
        UserService service = new UserService(userRepository);
        service.setTimeout(3000);
        return service;
    }
}
```

**Component Scan 방식**
```java
// XML
<context:component-scan base-package="com.example"/>

// Java Config
@Configuration
@ComponentScan("com.example")
public class AppConfig { }
```

**Java Config 장점**
1. **타입 안전성**: 컴파일 시 오류 검출
2. **리팩토링 용이**: 클래스명 변경 시 자동 반영
3. **조건부 Bean**: @Conditional 등 프로그래밍적 제어
4. **프로파일 적용**: @Profile과 쉬운 통합
5. **가독성**: 코드로 흐름 파악 가능

**XML Config 장점**
1. 코드 수정 없이 설정 변경 가능
2. 외부화된 설정 관리
3. 레거시 시스템과 호환

**현재 권장 방식**
- **Java Config + @Component 스캔** 조합
- XML은 외부 라이브러리 설정이나 레거시 통합 시에만 사용

</details>

---

## 📌 Spring 최신 트렌드

### SPRING-051
최신 Spring 버전에서 추가된 기능 및 개선 사항에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Spring Framework 6 / Spring Boot 3 주요 변경사항**

**1. Java 17 기준선**
- 최소 요구 버전이 Java 17로 상향
- Record, Sealed Class, Pattern Matching 등 활용 가능

**2. Jakarta EE 9+ 마이그레이션**
- `javax.*` → `jakarta.*` 패키지 변경
```java
// 이전
import javax.servlet.http.HttpServletRequest;

// 변경 후
import jakarta.servlet.http.HttpServletRequest;
```

**3. Native Image 지원 (GraalVM)**
- AOT(Ahead-of-Time) 컴파일 공식 지원
- 빠른 시작 시간과 낮은 메모리 사용량
```bash
./mvnw -Pnative native:compile
```

**4. HTTP Interface Client**
- 선언적 HTTP 클라이언트 (Feign과 유사)
```java
@HttpExchange("/users")
public interface UserClient {
    @GetExchange("/{id}")
    User getUser(@PathVariable Long id);
}
```

**5. 문제 세부 정보 (Problem Details)**
- RFC 7807 기반 표준 에러 응답 형식 지원
```json
{
  "type": "https://example.com/errors/not-found",
  "title": "Not Found",
  "status": 404,
  "detail": "User 123 not found"
}
```

**6. Observability 개선**
- Micrometer 통합 강화
- 분산 추적 (Tracing) 통합
- Micrometer Observation API 도입

**7. Virtual Threads 지원 (Java 21)**
- Project Loom의 가상 스레드 지원
```yaml
spring:
  threads:
    virtual:
      enabled: true
```

**Spring Boot 3.2+ 추가 기능**
- RestClient 도입 (WebClient의 동기 버전)
- JdbcClient 도입 (JDBC 간소화)
- SSL Bundle 자동 구성
- Docker Compose 지원 개선

**참고자료**
- [Spring Framework 6.0 Release Notes](https://github.com/spring-projects/spring-framework/wiki/What%27s-New-in-Spring-Framework-6.x)[^1]
- [Spring Boot 3.0 Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Release-Notes)[^2]

</details>

[^1]: Spring Framework 6.x 공식 릴리즈 노트
[^2]: Spring Boot 3.0 공식 릴리즈 노트
