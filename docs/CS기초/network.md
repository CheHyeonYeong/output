# 네트워크 (Network)

> 카테고리: CS 기초 > 네트워크
> [← 면접 질문 목록으로 돌아가기](../../interview.md)

---

## 📌 HTTP 기초

### NET-001
HTTP에 대해 설명해 주세요.

<details>
<summary>답변</summary>

HTTP(HyperText Transfer Protocol)는 웹에서 클라이언트와 서버 간 데이터를 주고받는 애플리케이션 계층 프로토콜입니다. 요청-응답 모델 기반이며, Stateless 특성을 가집니다.

**참고자료**
- [RFC 9110 - HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)[^1]

</details>

[^1]: IETF HTTP 표준 명세

### NET-002
HTTP의 특성인 Stateless에 대해 설명해 주세요.

<details>
<summary>답변</summary>

Stateless란 서버가 클라이언트의 이전 요청 상태를 저장하지 않는 특성입니다. 각 요청은 독립적으로 처리되며, 필요한 모든 정보를 요청에 포함해야 합니다. 이로 인해 서버 확장이 용이합니다.

**참고자료**
- [RFC 9110 Section 3.3](https://www.rfc-editor.org/rfc/rfc9110#section-3.3)[^2]

</details>

[^2]: HTTP Stateless 특성 명세

### NET-003
HTTP의 Stateless와 Connectionless 특성의 차이점에 대해 설명해 주세요.

<details>
<summary>답변</summary>

- **Stateless**: 서버가 클라이언트 상태를 저장하지 않음. 각 요청이 독립적
- **Connectionless**: 요청-응답 후 연결을 끊음. HTTP/1.0의 기본 동작

Stateless는 "상태 비저장", Connectionless는 "연결 비유지"를 의미합니다.

**참고자료**
- [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110)[^3]

</details>

[^3]: HTTP 프로토콜 특성 명세

### NET-004
왜 HTTP는 Stateless 구조를 채택하고 있을까요?

<details>
<summary>답변</summary>

1. **서버 확장성**: 상태를 저장하지 않아 어떤 서버든 요청 처리 가능
2. **단순성**: 서버 구현이 단순해지고 리소스 절약
3. **장애 복구**: 서버 장애 시에도 다른 서버가 바로 대체 가능

**참고자료**
- [RFC 9110 Section 3.3](https://www.rfc-editor.org/rfc/rfc9110#section-3.3)[^4]

</details>

[^4]: HTTP 설계 원칙

### NET-005
HTTP의 Connectionless 특성으로 인해 매 요청마다 연결을 새로 수립해야 해서 성능이 좋지 않을 것으로 보이는데, 해결 방법이 있을까요?

<details>
<summary>답변</summary>

HTTP/1.1부터 **Keep-Alive(Persistent Connection)**를 도입하여 해결합니다. 하나의 TCP 연결로 여러 요청/응답을 처리하여 연결 설정 오버헤드를 줄입니다.

**참고자료**
- [RFC 9112 Section 9.3](https://www.rfc-editor.org/rfc/rfc9112#section-9.3)[^5]

</details>

[^5]: HTTP/1.1 Persistent Connection 명세

### NET-006
TCP의 keep-alive와 HTTP의 keep-alive의 차이는 무엇인가요?

<details>
<summary>답변</summary>

- **TCP Keep-Alive**: 연결이 살아있는지 확인하는 프로브 패킷. 유휴 연결 감지 목적
- **HTTP Keep-Alive**: 하나의 TCP 연결로 여러 HTTP 요청/응답을 처리. 성능 최적화 목적

TCP는 "연결 상태 확인", HTTP는 "연결 재사용"이 목적입니다.

**참고자료**
- [RFC 9112](https://www.rfc-editor.org/rfc/rfc9112)[^6]

</details>

[^6]: HTTP/1.1 연결 관리 명세

---

## 📌 HTTP 버전 및 성능

### NET-007
HTTP/1.1과 HTTP/2의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | HTTP/1.1 | HTTP/2 |
|------|----------|--------|
| 전송 방식 | 텍스트 | 바이너리 프레임 |
| 다중화 | 불가 (순차 처리) | 멀티플렉싱 지원 |
| 헤더 | 중복 전송 | HPACK 압축 |
| 서버 푸시 | 미지원 | 지원 |

**참고자료**
- [RFC 9113 - HTTP/2](https://www.rfc-editor.org/rfc/rfc9113)[^7]

</details>

[^7]: HTTP/2 표준 명세

### NET-008
HTTP에서 발생하는 HOL(Head-of-Line) Blocking에 대해 설명해 주세요.

<details>
<summary>답변</summary>

HOL(Head-of-Line) Blocking은 앞선 요청이 완료될 때까지 뒤의 요청이 대기하는 현상입니다.

- **HTTP/1.1**: 파이프라이닝에서 앞 응답 지연 시 뒤 응답도 지연
- **HTTP/2**: 애플리케이션 레벨 HOL은 해결, TCP 레벨 HOL은 존재
- **HTTP/3**: QUIC 사용으로 TCP HOL도 해결

**참고자료**
- [RFC 9113 Section 1](https://www.rfc-editor.org/rfc/rfc9113#section-1)[^8]

</details>

[^8]: HTTP/2 도입 배경 및 HOL 문제

### NET-009
HTTP/3.0의 주요 특징에 대해 설명해 주세요.

<details>
<summary>답변</summary>

- **QUIC 프로토콜**: UDP 기반으로 TCP의 HOL Blocking 해결
- **0-RTT 연결**: 이전 연결 정보로 빠른 재연결
- **연결 마이그레이션**: IP 변경 시에도 연결 유지 (Connection ID 사용)
- **내장 TLS 1.3**: 보안이 기본 포함

**참고자료**
- [RFC 9114 - HTTP/3](https://www.rfc-editor.org/rfc/rfc9114)[^9]

</details>

[^9]: HTTP/3 표준 명세

### NET-010
왜 HTTP는 TCP를 사용하나요?

<details>
<summary>답변</summary>

HTTP는 **신뢰성 있는 데이터 전송**이 필요하기 때문입니다.

- 웹 페이지, 파일 등은 데이터 손실 없이 정확하게 전달되어야 함
- TCP는 순서 보장, 재전송, 흐름/혼잡 제어 제공
- UDP는 이런 기능이 없어 애플리케이션에서 직접 구현 필요

**참고자료**
- [RFC 9110 Section 3.3](https://www.rfc-editor.org/rfc/rfc9110#section-3.3)[^10]

</details>

[^10]: HTTP 전송 계층 요구사항

### NET-011
HTTP는 신뢰성을 위해 TCP를 사용하는데, 왜 HTTP/3에서는 UDP를 사용하나요? UDP의 신뢰성 문제가 해결되었나요?

<details>
<summary>답변</summary>

QUIC 프로토콜이 UDP 위에서 TCP의 기능을 구현합니다.

- **신뢰성**: QUIC이 재전송, 순서 보장 직접 구현
- **TCP HOL 해결**: 스트림 단위 독립 처리로 한 스트림 손실이 다른 스트림에 영향 없음
- **UDP 선택 이유**: 커널 수정 없이 사용자 공간에서 빠른 개선 가능

**참고자료**
- [RFC 9000 - QUIC](https://www.rfc-editor.org/rfc/rfc9000)[^11]

</details>

[^11]: QUIC 프로토콜 표준 명세

### NET-012
HTTP/2는 TCP를, HTTP/3는 UDP를 사용하는데, 브라우저는 서버가 어떤 프로토콜을 사용하는지 어떻게 알 수 있나요?

<details>
<summary>답변</summary>

**Alt-Svc(Alternative Services) 헤더**를 통해 알 수 있습니다.

1. 브라우저는 먼저 TCP(HTTP/1.1 또는 HTTP/2)로 연결
2. 서버가 `Alt-Svc: h3=":443"` 헤더로 HTTP/3 지원 알림
3. 브라우저가 다음 요청부터 QUIC(UDP) 사용

**참고자료**
- [RFC 7838 - HTTP Alternative Services](https://www.rfc-editor.org/rfc/rfc7838)[^12]

</details>

[^12]: Alt-Svc 헤더 표준 명세

---

## 📌 HTTP 응답 코드

### NET-013
HTTP 응답코드에 대해 설명해 주세요.

<details>
<summary>답변</summary>

HTTP 응답코드는 3자리 숫자로 요청 처리 결과를 나타냅니다.

| 범위 | 의미 | 예시 |
|------|------|------|
| 1xx | 정보 | 100 Continue |
| 2xx | 성공 | 200 OK, 201 Created |
| 3xx | 리다이렉션 | 301 Moved, 304 Not Modified |
| 4xx | 클라이언트 오류 | 400 Bad Request, 404 Not Found |
| 5xx | 서버 오류 | 500 Internal Server Error |

**참고자료**
- [RFC 9110 Section 15](https://www.rfc-editor.org/rfc/rfc9110#section-15)[^13]

</details>

[^13]: HTTP 상태 코드 정의

### NET-014
HTTP 응답코드 401 (Unauthorized)과 403 (Forbidden)은 의미적으로 어떤 차이가 있나요?

<details>
<summary>답변</summary>

- **401 Unauthorized**: 인증(Authentication) 필요. 로그인하지 않은 상태
- **403 Forbidden**: 인가(Authorization) 실패. 로그인은 했지만 권한 없음

예: 관리자 페이지 접근 시
- 비로그인 사용자 -> 401
- 일반 사용자 -> 403

**참고자료**
- [RFC 9110 Section 15.5.2, 15.5.4](https://www.rfc-editor.org/rfc/rfc9110#section-15.5.2)[^14]

</details>

[^14]: HTTP 401, 403 상태 코드 정의

### NET-015
HTTP 응답코드 200 (OK)과 201 (Created)의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

- **200 OK**: 요청이 성공적으로 처리됨 (일반적인 성공)
- **201 Created**: 요청 결과로 새로운 리소스가 생성됨

주로 POST 요청에서 리소스 생성 시 201을, GET/PUT/DELETE 등에서는 200을 사용합니다. 201 응답에는 Location 헤더로 생성된 리소스 URI를 포함할 수 있습니다.

**참고자료**
- [RFC 9110 Section 15.3.1, 15.3.2](https://www.rfc-editor.org/rfc/rfc9110#section-15.3.1)[^15]

</details>

[^15]: HTTP 200, 201 상태 코드 정의

### NET-016
HTTP 응답코드를 직접 정의해서 사용할 수 있을까요? 예를 들어 285번처럼요.

<details>
<summary>답변</summary>

기술적으로 가능하지만 **권장하지 않습니다**.

- 클라이언트가 해당 코드를 이해하지 못할 수 있음
- 표준을 따르지 않아 호환성 문제 발생
- 미등록 코드는 같은 클래스(2xx면 성공)로 해석됨

대신 표준 코드 + 응답 본문에 상세 정보를 포함하는 방식을 권장합니다.

**참고자료**
- [RFC 9110 Section 15](https://www.rfc-editor.org/rfc/rfc9110#section-15)[^16]

</details>

[^16]: HTTP 상태 코드 확장성 명세

---

## 📌 HTTP Method

### NET-017
HTTP Method 에 대해 설명해 주세요.

<details>
<summary>답변</summary>

HTTP Method는 리소스에 대해 수행할 동작을 정의합니다.

| Method | 설명 | 멱등성 | 안전 |
|--------|------|--------|------|
| GET | 리소스 조회 | O | O |
| POST | 리소스 생성 | X | X |
| PUT | 리소스 전체 수정 | O | X |
| PATCH | 리소스 부분 수정 | X | X |
| DELETE | 리소스 삭제 | O | X |
| HEAD | 헤더만 조회 | O | O |
| OPTIONS | 지원 메서드 확인 | O | O |

**참고자료**
- [RFC 9110 Section 9](https://www.rfc-editor.org/rfc/rfc9110#section-9)[^17]

</details>

[^17]: HTTP 메서드 정의

### NET-018
HTTP Method의 멱등성에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**멱등성(Idempotency)**은 동일한 요청을 여러 번 보내도 결과가 같은 특성입니다.

- **멱등 메서드**: GET, PUT, DELETE, HEAD, OPTIONS
- **비멱등 메서드**: POST, PATCH

예: `DELETE /users/1`을 여러 번 호출해도 결과는 "해당 유저 없음"으로 동일합니다.

**참고자료**
- [RFC 9110 Section 9.2.2](https://www.rfc-editor.org/rfc/rfc9110#section-9.2.2)[^18]

</details>

[^18]: HTTP 멱등성 정의

### NET-019
HTTP Method 중 GET과 POST의 차이는 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | GET | POST |
|------|-----|------|
| 목적 | 리소스 조회 | 리소스 생성/처리 |
| 데이터 위치 | URL 쿼리스트링 | Request Body |
| 캐싱 | 가능 | 불가 |
| 멱등성 | O | X |
| 북마크 | 가능 | 불가 |
| 데이터 길이 | URL 길이 제한 | 제한 없음 |

**참고자료**
- [RFC 9110 Section 9.3.1, 9.3.3](https://www.rfc-editor.org/rfc/rfc9110#section-9.3.1)[^19]

</details>

[^19]: GET, POST 메서드 정의

### NET-020
HTTP Method 중 POST와 PUT, PATCH의 차이는 무엇인가요?

<details>
<summary>답변</summary>

| 메서드 | 용도 | 멱등성 |
|--------|------|--------|
| POST | 리소스 생성 (서버가 URI 결정) | X |
| PUT | 리소스 전체 교체/생성 (클라이언트가 URI 지정) | O |
| PATCH | 리소스 부분 수정 | X |

- PUT은 전체 데이터를 보내 덮어쓰기
- PATCH는 변경할 필드만 전송

**참고자료**
- [RFC 9110 Section 9.3.3, 9.3.4](https://www.rfc-editor.org/rfc/rfc9110#section-9.3.3)[^20]

</details>

[^20]: POST, PUT 메서드 정의

### NET-021
HTTP 1.1 이후로 GET 요청에도 Body에 데이터를 실을 수 있게 되었습니다. 그럼에도 불구하고 왜 아직도 이런 방식을 지양하는 것일까요?

<details>
<summary>답변</summary>

1. **캐싱 문제**: 캐시는 URL 기반으로 동작, Body는 캐시 키에 포함 안 됨
2. **호환성**: 일부 서버/프록시/라이브러리가 GET Body를 무시하거나 오류 발생
3. **의미론 위반**: GET은 "조회"의 의미, Body는 "데이터 전송"의 의미
4. **로깅/디버깅 어려움**: URL만 로그에 남으면 요청 재현 불가

**참고자료**
- [RFC 9110 Section 9.3.1](https://www.rfc-editor.org/rfc/rfc9110#section-9.3.1)[^21]

</details>

[^21]: GET 메서드 본문에 대한 명세

---

## 📌 쿠키와 세션

### NET-022
쿠키와 세션의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | 쿠키 | 세션 |
|------|------|------|
| 저장 위치 | 클라이언트 (브라우저) | 서버 |
| 보안 | 상대적으로 취약 | 상대적으로 안전 |
| 용량 | 약 4KB 제한 | 서버 메모리 의존 |
| 만료 | 설정된 기간 | 브라우저 종료 또는 타임아웃 |
| 속도 | 빠름 | 서버 조회 필요 |

**참고자료**
- [RFC 6265 - HTTP State Management](https://www.rfc-editor.org/rfc/rfc6265)[^22]

</details>

[^22]: HTTP 쿠키 표준 명세

### NET-023
세션 방식의 로그인 과정에 대해 설명해 주세요.

<details>
<summary>답변</summary>

1. 클라이언트가 ID/PW로 로그인 요청
2. 서버가 인증 후 세션 ID 생성, 서버 메모리/DB에 저장
3. 서버가 Set-Cookie 헤더로 세션 ID를 클라이언트에 전달
4. 클라이언트는 이후 요청마다 Cookie 헤더에 세션 ID 포함
5. 서버가 세션 ID로 사용자 정보 조회하여 인증 처리

**참고자료**
- [RFC 6265 - HTTP Cookies](https://www.rfc-editor.org/rfc/rfc6265)[^23]

</details>

[^23]: HTTP 쿠키 기반 상태 관리

### NET-024
HTTP는 Stateless 프로토콜인데, 서버에 사용자 상태를 저장하는 세션 기반 인증 방식은 HTTP의 Stateless 원칙에 위배되는 것 아닌가요?

<details>
<summary>답변</summary>

맞습니다. 세션은 서버에 상태를 저장하므로 Stateless 원칙에 위배됩니다.

**세션의 문제점**:
- 서버 메모리 사용
- 서버 확장 시 세션 동기화 필요
- 서버 장애 시 세션 유실

**대안**: JWT(JSON Web Token) 같은 토큰 방식은 상태를 클라이언트에 저장하여 Stateless 유지 가능합니다.

**참고자료**
- [RFC 7519 - JWT](https://www.rfc-editor.org/rfc/rfc7519)[^24]

</details>

[^24]: JSON Web Token 표준 명세

### NET-025
서버가 여러 대로 확장된 분산 환경에서 세션을 어떻게 관리할 수 있을까요?

<details>
<summary>답변</summary>

1. **Sticky Session**: 로드밸런서가 같은 사용자를 같은 서버로 라우팅
2. **세션 클러스터링**: 서버 간 세션 복제 (Tomcat Session Replication)
3. **세션 스토리지**: Redis, Memcached 등 외부 저장소에 세션 저장
4. **토큰 방식**: JWT로 Stateless하게 전환

가장 일반적인 방식은 Redis를 이용한 세션 스토리지입니다.

**참고자료**
- [MDN - HTTP Session](https://developer.mozilla.org/en-US/docs/Web/HTTP/Session)[^25]

</details>

[^25]: HTTP 세션 관리 개념

---

## 📌 HTTPS 및 보안

### NET-026
공개키와 대칭키에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**대칭키 암호화**:
- 암호화/복호화에 동일한 키 사용
- 빠른 속도, 키 교환 문제 존재
- 예: AES, DES

**공개키(비대칭키) 암호화**:
- 공개키로 암호화, 개인키로 복호화 (또는 반대)
- 느린 속도, 안전한 키 교환
- 예: RSA, ECDSA

HTTPS는 공개키로 대칭키를 교환한 후, 대칭키로 통신합니다.

**참고자료**
- [RFC 8446 - TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446)[^26]

</details>

[^26]: TLS 암호화 명세

### NET-027
HTTPS Handshake 과정에서 공개키만 교환하면 될 것 같은데, 왜 인증서를 사용하는 것일까요?

<details>
<summary>답변</summary>

**중간자 공격(MITM) 방지**를 위해서입니다.

공개키만으로는 해당 키가 진짜 서버의 것인지 확인할 수 없습니다. 인증서는:
- 신뢰할 수 있는 CA(인증기관)가 서버 신원을 보증
- 서버의 공개키가 변조되지 않았음을 증명
- 도메인 소유권 확인

**참고자료**
- [RFC 8446 Section 4.4.2](https://www.rfc-editor.org/rfc/rfc8446#section-4.4.2)[^27]

</details>

[^27]: TLS 인증서 검증 명세

### NET-028
SSL과 TLS의 차이는 무엇인가요?

<details>
<summary>답변</summary>

TLS는 SSL의 후속 버전입니다.

- **SSL**: Netscape에서 개발, SSL 3.0이 마지막 버전 (보안 취약점으로 사용 중단)
- **TLS**: IETF에서 표준화, SSL 3.0 기반으로 TLS 1.0 시작

현재는 TLS 1.2/1.3이 표준이며, "SSL"은 관용적으로 TLS를 포함하여 부르는 경우가 많습니다.

**참고자료**
- [RFC 8446 - TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446)[^28]

</details>

[^28]: TLS 1.3 표준 명세

### NET-029
XSS에 대해서 설명해 주세요.

<details>
<summary>답변</summary>

**XSS(Cross-Site Scripting)**는 공격자가 웹페이지에 악성 스크립트를 삽입하는 공격입니다.

**유형**:
- **Stored XSS**: DB에 저장된 악성 스크립트가 실행
- **Reflected XSS**: URL 파라미터의 스크립트가 즉시 반영
- **DOM-based XSS**: 클라이언트 측 JS에서 발생

**방지**: 입력값 검증, 출력 인코딩, CSP 헤더 사용

**참고자료**
- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)[^29]

</details>

[^29]: OWASP XSS 방지 가이드

### NET-030
CSRF와 XSS는 어떤 차이가 있나요?

<details>
<summary>답변</summary>

| 구분 | XSS | CSRF |
|------|-----|------|
| 공격 대상 | 사용자 브라우저 | 서버 |
| 공격 방식 | 악성 스크립트 실행 | 사용자 권한으로 요청 위조 |
| 목적 | 쿠키 탈취, 세션 하이재킹 | 사용자 모르게 행위 수행 |
| 방지 | 입력 검증, 출력 인코딩 | CSRF 토큰, SameSite 쿠키 |

**참고자료**
- [OWASP CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)[^30]

</details>

[^30]: OWASP CSRF 방지 가이드

### NET-031
XSS(Cross-Site Scripting) 공격은 프론트엔드에서만 방어할 수 있나요?

<details>
<summary>답변</summary>

아닙니다. **백엔드에서도 반드시 방어**해야 합니다.

- **백엔드**: 입력값 검증/필터링, 출력 시 HTML 인코딩
- **프론트엔드**: innerHTML 대신 textContent 사용, sanitize 라이브러리
- **HTTP 헤더**: Content-Security-Policy(CSP), X-XSS-Protection

프론트엔드만으로는 API 직접 호출 등을 막을 수 없어 다층 방어가 필수입니다.

**참고자료**
- [MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)[^31]

</details>

[^31]: MDN Content Security Policy 문서

---

## 📌 CORS 및 보안 정책

### NET-032
SOP 정책에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**SOP(Same-Origin Policy)**는 브라우저 보안 정책으로, 다른 출처의 리소스 접근을 제한합니다.

**동일 출처 조건** (모두 일치해야 함):
- 프로토콜 (http/https)
- 호스트 (domain)
- 포트

예: `https://example.com:443`과 `https://example.com:8080`은 다른 출처입니다.

**참고자료**
- [MDN Same-Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)[^32]

</details>

[^32]: MDN SOP 문서

### NET-033
SOP(Same-Origin Policy)의 제한을 우회하는 CORS 정책이 무엇인가요?

<details>
<summary>답변</summary>

**CORS(Cross-Origin Resource Sharing)**는 SOP를 우회하여 다른 출처의 리소스를 안전하게 요청할 수 있게 하는 메커니즘입니다.

서버가 응답 헤더로 허용할 출처를 지정합니다:
- `Access-Control-Allow-Origin`: 허용할 출처
- `Access-Control-Allow-Methods`: 허용할 HTTP 메서드
- `Access-Control-Allow-Headers`: 허용할 헤더

**참고자료**
- [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)[^33]

</details>

[^33]: MDN CORS 문서

### NET-034
CORS에서 사용하는 Preflight 요청에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Preflight 요청**은 실제 요청 전에 서버가 해당 요청을 허용하는지 확인하는 OPTIONS 요청입니다.

**발생 조건** (Simple Request가 아닌 경우):
- GET/POST/HEAD 외의 메서드
- 커스텀 헤더 포함
- Content-Type이 application/json 등

**과정**:
1. 브라우저가 OPTIONS 요청 전송
2. 서버가 CORS 헤더로 허용 여부 응답
3. 허용 시 실제 요청 전송

**참고자료**
- [MDN Preflight Request](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request)[^34]

</details>

[^34]: MDN Preflight 요청 문서

---

## 📌 TCP/UDP

### NET-035
TCP와 UDP의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | TCP | UDP |
|------|-----|-----|
| 연결 | 연결 지향 (3-way handshake) | 비연결 |
| 신뢰성 | 순서 보장, 재전송 | 보장 안 함 |
| 속도 | 상대적으로 느림 | 빠름 |
| 흐름/혼잡 제어 | 있음 | 없음 |
| 용도 | HTTP, 파일 전송 | 스트리밍, DNS, 게임 |

**참고자료**
- [RFC 9293 - TCP](https://www.rfc-editor.org/rfc/rfc9293)[^35]

</details>

[^35]: TCP 표준 명세

### NET-036
TCP/UDP에서 사용하는 Checksum이 무엇인가요?

<details>
<summary>답변</summary>

**Checksum**은 데이터 전송 중 오류를 감지하기 위한 값입니다.

- 송신자: 데이터를 계산하여 체크섬 값 생성 후 함께 전송
- 수신자: 받은 데이터로 체크섬 재계산, 일치 여부 확인

일치하지 않으면 데이터가 손상된 것으로 판단합니다. 오류 "감지"만 가능하고 "정정"은 불가합니다.

**참고자료**
- [RFC 9293 Section 3.1](https://www.rfc-editor.org/rfc/rfc9293#section-3.1)[^36]

</details>

[^36]: TCP 체크섬 명세

### NET-037
TCP와 UDP 중 어느 프로토콜이 Checksum(데이터 무결성 검증)을 수행할까요?

<details>
<summary>답변</summary>

**둘 다** Checksum을 수행합니다.

- **TCP**: 필수 (헤더 + 데이터 + 의사 헤더)
- **UDP**: IPv4에서는 선택, IPv6에서는 필수

UDP는 IPv4에서 체크섬을 0으로 설정하여 생략할 수 있지만, IPv6에서는 IP 헤더에 체크섬이 없어 UDP 체크섬이 필수입니다.

**참고자료**
- [RFC 768 - UDP](https://www.rfc-editor.org/rfc/rfc768)[^37]

</details>

[^37]: UDP 표준 명세

### NET-038
TCP/UDP에서 사용하는 Checksum을 통해 데이터 오류를 정정할 수 있나요?

<details>
<summary>답변</summary>

**아니요**, Checksum은 오류 **감지(Detection)**만 가능하고 **정정(Correction)**은 불가합니다.

오류 발견 시:
- **TCP**: 해당 세그먼트 폐기 후 재전송 요청
- **UDP**: 해당 데이터그램 폐기 (재전송 없음)

오류 정정이 필요하면 FEC(Forward Error Correction) 같은 별도 메커니즘이 필요합니다.

**참고자료**
- [RFC 9293](https://www.rfc-editor.org/rfc/rfc9293)[^38]

</details>

[^38]: TCP 오류 처리 명세

### NET-039
TCP가 신뢰성을 보장하는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

1. **순서 번호(Sequence Number)**: 데이터 순서 보장
2. **확인 응답(ACK)**: 수신 확인, 미수신 시 재전송
3. **체크섬**: 데이터 무결성 검증
4. **타임아웃 재전송**: ACK 미수신 시 재전송
5. **흐름 제어(Flow Control)**: 수신자 버퍼 오버플로우 방지
6. **혼잡 제어(Congestion Control)**: 네트워크 혼잡 시 전송량 조절

**참고자료**
- [RFC 9293](https://www.rfc-editor.org/rfc/rfc9293)[^39]

</details>

[^39]: TCP 신뢰성 메커니즘 명세

### NET-040
TCP의 혼잡 제어 처리 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

1. **Slow Start**: 지수적으로 윈도우 크기 증가 (1 -> 2 -> 4 -> 8...)
2. **Congestion Avoidance**: 임계점 도달 후 선형 증가
3. **Fast Retransmit**: 3개의 중복 ACK 수신 시 즉시 재전송
4. **Fast Recovery**: 손실 후 Slow Start 대신 혼잡 회피 상태로 복구

손실 감지 시 윈도우 크기를 절반으로 줄이고 다시 증가시킵니다.

**참고자료**
- [RFC 5681 - TCP Congestion Control](https://www.rfc-editor.org/rfc/rfc5681)[^40]

</details>

[^40]: TCP 혼잡 제어 표준 명세

### NET-041
새로운 통신 프로토콜을 TCP나 UDP 위에 구현한다고 할 때, 어떤 기준으로 프로토콜을 선택하시겠어요?

<details>
<summary>답변</summary>

**TCP 선택 시**:
- 데이터 손실이 치명적인 경우 (파일 전송, 금융 거래)
- 순서가 중요한 경우
- 신뢰성이 최우선인 경우

**UDP 선택 시**:
- 실시간성이 중요한 경우 (게임, 스트리밍, VoIP)
- 일부 손실이 허용되는 경우
- 직접 신뢰성 메커니즘을 구현할 경우 (QUIC처럼)

**참고자료**
- [RFC 9293](https://www.rfc-editor.org/rfc/rfc9293)[^41]

</details>

[^41]: TCP/UDP 사용 사례

---

## 📌 3-Way / 4-Way Handshake

### NET-042
3-Way Handshake에 대해 설명해 주세요.

<details>
<summary>답변</summary>

TCP 연결 수립을 위한 3단계 과정입니다.

1. **SYN**: 클라이언트 -> 서버 (연결 요청, seq=x)
2. **SYN-ACK**: 서버 -> 클라이언트 (요청 수락, seq=y, ack=x+1)
3. **ACK**: 클라이언트 -> 서버 (연결 확립, ack=y+1)

이 과정으로 양방향 통신 준비와 초기 순서 번호 교환이 완료됩니다.

**참고자료**
- [RFC 9293 Section 3.5](https://www.rfc-editor.org/rfc/rfc9293#section-3.5)[^42]

</details>

[^42]: TCP 연결 수립 명세

### NET-043
TCP 3-Way Handshake에서 ACK, SYN 같은 정보는 어떻게 전달하는 것일까요?

<details>
<summary>답변</summary>

**TCP 헤더의 플래그 비트**를 통해 전달합니다.

TCP 헤더에는 6개의 제어 플래그가 있습니다:
- **SYN**: 연결 요청
- **ACK**: 확인 응답
- **FIN**: 연결 종료
- **RST**: 연결 리셋
- **PSH**: 데이터 즉시 전달
- **URG**: 긴급 데이터

각 플래그는 1비트로, 설정(1) 또는 해제(0) 상태입니다.

**참고자료**
- [RFC 9293 Section 3.1](https://www.rfc-editor.org/rfc/rfc9293#section-3.1)[^43]

</details>

[^43]: TCP 헤더 구조 명세

### NET-044
TCP에서 2-Way Handshaking이 아닌 3-Way Handshaking을 사용하는 이유에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**양방향 통신 준비 확인이 불가능**하기 때문입니다.

2-Way의 문제:
- 클라이언트는 서버의 수신 능력만 확인
- 서버는 클라이언트의 수신 능력 확인 불가
- 이전 연결의 지연된 SYN 패킷이 새 연결로 오인될 수 있음

3-Way로 양쪽 모두 송수신 가능함을 확인하고, 초기 순서 번호를 안전하게 교환합니다.

**참고자료**
- [RFC 9293 Section 3.5](https://www.rfc-editor.org/rfc/rfc9293#section-3.5)[^44]

</details>

[^44]: TCP 연결 수립 이유

### NET-045
TCP에서 두 호스트가 동시에 연결을 시도하면, 연결이 가능한가요? 가능하다면 어떻게 통신 연결을 수행하나요?

<details>
<summary>답변</summary>

**가능합니다.** 이를 **Simultaneous Open**이라 합니다.

과정:
1. A -> B: SYN
2. B -> A: SYN (동시에)
3. A: B의 SYN 수신, SYN-ACK 전송
4. B: A의 SYN 수신, SYN-ACK 전송
5. 양쪽 모두 SYN-ACK 수신하여 연결 수립

결과적으로 4개의 세그먼트로 연결이 수립됩니다.

**참고자료**
- [RFC 9293 Section 3.5](https://www.rfc-editor.org/rfc/rfc9293#section-3.5)[^45]

</details>

[^45]: TCP Simultaneous Open 명세

### NET-046
TCP 3-Way Handshake를 악용한 SYN Flooding 공격에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**SYN Flooding**은 TCP 3-way handshake를 악용한 DoS 공격입니다.

**공격 방식**:
1. 공격자가 위조된 IP로 대량의 SYN 패킷 전송
2. 서버가 SYN-ACK 전송 후 ACK 대기 (half-open 상태)
3. 대기 큐가 가득 차 정상 연결 불가

**방어**: SYN Cookie, SYN Proxy, 방화벽 rate limiting

**참고자료**
- [RFC 4987 - TCP SYN Flooding Attacks](https://www.rfc-editor.org/rfc/rfc4987)[^46]

</details>

[^46]: TCP SYN Flooding 대응 명세

### NET-047
TCP 3-Way Handshake는 연결 수립에 시간이 걸리는데, 왕복 시간을 줄이는 0-RTT(Zero Round-Trip Time) 기법은 어떤 방식으로 동작하나요?

<details>
<summary>답변</summary>

**TLS 1.3**과 **QUIC**에서 0-RTT를 지원합니다.

**원리**:
1. 최초 연결 시 서버가 Session Ticket/PSK 발급
2. 재연결 시 저장된 키로 첫 패킷부터 암호화된 데이터 전송
3. Handshake와 데이터 전송이 동시에 진행

**주의**: Replay Attack 취약점이 있어, 멱등한 요청에만 사용 권장

**참고자료**
- [RFC 8446 Section 2.3](https://www.rfc-editor.org/rfc/rfc8446#section-2.3)[^47]

</details>

[^47]: TLS 1.3 0-RTT 명세

### NET-048
TCP 4-Way Handshake(연결 종료 과정)에 대해 설명해 주세요.

<details>
<summary>답변</summary>

TCP 연결 종료를 위한 4단계 과정입니다.

1. **FIN**: 클라이언트 -> 서버 (종료 요청)
2. **ACK**: 서버 -> 클라이언트 (요청 확인)
3. **FIN**: 서버 -> 클라이언트 (서버도 종료 준비 완료)
4. **ACK**: 클라이언트 -> 서버 (종료 확인)

양방향 스트림을 각각 독립적으로 종료하기 때문에 4단계가 필요합니다.

**참고자료**
- [RFC 9293 Section 3.6](https://www.rfc-editor.org/rfc/rfc9293#section-3.6)[^48]

</details>

[^48]: TCP 연결 종료 명세

### NET-049
TCP에서 수신한 패킷이 연결 종료(4-Way Handshake) 목적인지 어떻게 파악할 수 있을까요?

<details>
<summary>답변</summary>

**TCP 헤더의 FIN 플래그**로 파악합니다.

- FIN 플래그가 설정된 세그먼트 = 연결 종료 요청
- 현재 연결 상태(ESTABLISHED, FIN_WAIT 등)와 함께 판단

TCP는 상태 기계(State Machine)로 동작하며, 현재 상태와 받은 플래그 조합으로 다음 동작을 결정합니다.

**참고자료**
- [RFC 9293 Section 3.6](https://www.rfc-editor.org/rfc/rfc9293#section-3.6)[^49]

</details>

[^49]: TCP 상태 전이 명세

### NET-050
TCP 연결을 정상적인 4-Way Handshake 없이 즉시 종료해야 할 경우 어떻게 할 수 있을까요?

<details>
<summary>답변</summary>

**RST(Reset) 플래그**를 사용하여 즉시 종료합니다.

RST 세그먼트를 보내면:
- 상대방에게 즉시 연결 종료 통보
- TIME_WAIT 상태 없이 바로 종료
- 송수신 버퍼 데이터 폐기

사용 예: 존재하지 않는 포트로 연결 시도, 비정상 상황, 강제 종료

**참고자료**
- [RFC 9293 Section 3.5.2](https://www.rfc-editor.org/rfc/rfc9293#section-3.5.2)[^50]

</details>

[^50]: TCP RST 처리 명세

### NET-051
TCP 연결 중에 한쪽 호스트가 강제로 종료된다면, 상대방은 이를 어떻게 인식할 수 있을까요?

<details>
<summary>답변</summary>

1. **TCP Keep-Alive**: 주기적으로 프로브 패킷 전송, 응답 없으면 연결 종료
2. **타임아웃**: 재전송 타임아웃 초과 시 연결 종료로 판단
3. **애플리케이션 레벨**: 자체 heartbeat 메커니즘 구현

OS의 Keep-Alive는 기본 2시간으로 설정되어 있어, 빠른 감지가 필요하면 애플리케이션에서 별도 구현합니다.

**참고자료**
- [RFC 9293 Section 3.8.4](https://www.rfc-editor.org/rfc/rfc9293#section-3.8.4)[^51]

</details>

[^51]: TCP Keep-Alive 명세

### NET-052
TCP 연결 종료(4-Way Handshake) 이후 왜 연결이 바로 끝나지 않고, TIME_WAIT 상태로 대기하는 것일까요?

<details>
<summary>답변</summary>

1. **지연된 패킷 처리**: 네트워크에 남아있는 이전 연결의 패킷이 새 연결에 영향 주지 않도록
2. **마지막 ACK 손실 대비**: 상대방이 FIN을 재전송하면 ACK를 다시 보낼 수 있도록

TIME_WAIT 시간은 **2MSL**(Maximum Segment Lifetime, 보통 60초)입니다. 이 시간 동안 같은 소켓 쌍으로 새 연결이 불가합니다.

**참고자료**
- [RFC 9293 Section 3.6.1](https://www.rfc-editor.org/rfc/rfc9293#section-3.6.1)[^52]

</details>

[^52]: TCP TIME_WAIT 상태 명세

---

## 📌 소켓 통신

### NET-053
웹소켓과 소켓 통신의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | 소켓(TCP/UDP) | 웹소켓 |
|------|--------------|--------|
| 계층 | Transport Layer | Application Layer |
| 프로토콜 | TCP/UDP 직접 사용 | HTTP 업그레이드 후 WS 프로토콜 |
| 환경 | 모든 애플리케이션 | 웹 브라우저 |
| 연결 | 직접 연결 | HTTP Handshake 후 연결 |
| 데이터 | 바이트 스트림 | 메시지 기반 프레임 |

**참고자료**
- [RFC 6455 - WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455)[^53]

</details>

[^53]: WebSocket 표준 명세

### NET-054
소켓과 포트의 차이가 무엇인가요?

<details>
<summary>답변</summary>

- **포트(Port)**: 16비트 숫자(0-65535)로 프로세스를 식별하는 논리적 주소
- **소켓(Socket)**: (IP주소 + 포트 + 프로토콜)의 조합으로 네트워크 통신 끝점(Endpoint)

포트는 "문 번호"이고, 소켓은 "실제 통신 채널"입니다. 하나의 포트에 여러 소켓이 존재할 수 있습니다.

**참고자료**
- [RFC 9293](https://www.rfc-editor.org/rfc/rfc9293)[^54]

</details>

[^54]: TCP 소켓 개념

### NET-055
여러 소켓이 있다고 할 때, 그 소켓의 포트 번호는 모두 다른가요?

<details>
<summary>답변</summary>

**아니요**, 같은 포트를 공유할 수 있습니다.

소켓은 5-tuple로 구분됩니다:
- (출발 IP, 출발 Port, 목적 IP, 목적 Port, 프로토콜)

예: 웹서버 80번 포트에 여러 클라이언트 연결 시, 각 연결은 클라이언트의 IP/Port가 다르므로 서로 다른 소켓입니다.

**참고자료**
- [RFC 9293 Section 3.1](https://www.rfc-editor.org/rfc/rfc9293#section-3.1)[^55]

</details>

[^55]: TCP 연결 식별 명세

### NET-056
사용자의 요청이 무수히 많아지면, 소켓도 무수히 생성되나요?

<details>
<summary>답변</summary>

기본적으로 **그렇습니다**. 하지만 제한이 있습니다:

**제한 요소**:
- 파일 디스크립터 제한 (ulimit)
- 포트 번호 범위 (ephemeral port)
- 메모리

**해결 방법**:
- Connection Pooling
- Keep-Alive로 연결 재사용
- 비동기 I/O (epoll, kqueue)
- 로드밸런싱

**참고자료**
- [RFC 9293](https://www.rfc-editor.org/rfc/rfc9293)[^56]

</details>

[^56]: TCP 연결 관리

### NET-057
멀티플렉싱과 디멀티플렉싱에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**멀티플렉싱 (Multiplexing)**:
- 여러 소켓의 데이터를 모아 하나의 네트워크 링크로 전송
- 송신 측에서 발생

**디멀티플렉싱 (Demultiplexing)**:
- 수신된 세그먼트를 올바른 소켓으로 분배
- 수신 측에서 발생
- TCP는 4-tuple, UDP는 2-tuple(목적 IP/Port)로 구분

**참고자료**
- [RFC 9293](https://www.rfc-editor.org/rfc/rfc9293)[^57]

</details>

[^57]: TCP 멀티플렉싱 개념

### NET-058
전송 계층(Transport Layer)에서 수신된 데이터를 올바른 소켓으로 분배하는 디멀티플렉싱(Demultiplexing) 과정에 대해 설명해 주세요.

<details>
<summary>답변</summary>

1. 세그먼트가 Transport Layer에 도착
2. 헤더에서 목적 포트 번호 확인
3. **UDP**: (목적 IP, 목적 Port)로 소켓 식별
4. **TCP**: (출발 IP, 출발 Port, 목적 IP, 목적 Port)로 소켓 식별
5. 해당 소켓의 버퍼로 데이터 전달
6. 애플리케이션이 버퍼에서 데이터 읽음

**참고자료**
- [RFC 9293](https://www.rfc-editor.org/rfc/rfc9293)[^58]

</details>

[^58]: TCP 디멀티플렉싱 과정

---

## 📌 IP 주소

### NET-059
IP 주소는 무엇이며, 어떤 기능을 하고 있나요?

<details>
<summary>답변</summary>

**IP 주소**는 네트워크에서 장치를 식별하는 논리적 주소입니다.

**기능**:
1. **주소 지정(Addressing)**: 네트워크상 장치 고유 식별
2. **라우팅**: 패킷이 목적지까지 경로 설정
3. **네트워크/호스트 구분**: 서브넷 마스크로 네트워크와 호스트 부분 구분

IPv4는 32비트(4바이트), IPv6는 128비트(16바이트)입니다.

**참고자료**
- [RFC 791 - IPv4](https://www.rfc-editor.org/rfc/rfc791)[^59]

</details>

[^59]: IPv4 표준 명세

### NET-060
IPv6는 IPv4의 주소 고갈 문제를 해결하기 위해 만들어졌지만, 아직도 수많은 기기가 IPv4를 사용하고 있습니다. IPv4 주소 고갈 문제를 어떻게 해결하고 있을까요?

<details>
<summary>답변</summary>

1. **NAT(Network Address Translation)**: 사설 IP를 공인 IP로 변환, 하나의 공인 IP로 여러 기기 사용
2. **CIDR(Classless Inter-Domain Routing)**: 클래스 기반 할당 대신 유연한 서브넷 할당
3. **사설 IP 주소**: 10.x.x.x, 172.16-31.x.x, 192.168.x.x 대역 내부 사용
4. **DHCP**: 동적 IP 할당으로 효율적 사용

**참고자료**
- [RFC 1918 - Private IP](https://www.rfc-editor.org/rfc/rfc1918)[^60]

</details>

[^60]: 사설 IP 주소 명세

### NET-061
IPv4와 IPv6의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | IPv4 | IPv6 |
|------|------|------|
| 주소 길이 | 32비트 | 128비트 |
| 주소 개수 | 약 43억 개 | 거의 무한대 |
| 표기법 | 점으로 구분 (192.168.0.1) | 콜론으로 구분 (2001:db8::1) |
| 헤더 크기 | 가변 (20-60바이트) | 고정 (40바이트) |
| 체크섬 | 있음 | 없음 |
| IPSec | 선택 | 필수 |

**참고자료**
- [RFC 8200 - IPv6](https://www.rfc-editor.org/rfc/rfc8200)[^61]

</details>

[^61]: IPv6 표준 명세

### NET-062
ISP로부터 유동 공인 IP를 할당받더라도 공유기 내부에서는 특정 기기에 고정 IP를 할당할 수 있습니다. NAT와 사설 IP를 활용해 어떻게 가능한 것인가요?

<details>
<summary>답변</summary>

**내부 네트워크(사설 IP)**와 **외부 네트워크(공인 IP)**를 구분하기 때문입니다.

- 공유기 내부: DHCP로 사설 IP 할당 (192.168.x.x)
- MAC 주소 기반으로 특정 기기에 항상 같은 사설 IP 할당 가능 (DHCP Reservation)
- 외부로 나갈 때: NAT로 공인 IP로 변환

즉, "내부 고정 IP"와 "외부 유동 IP"는 별개입니다.

**참고자료**
- [RFC 2131 - DHCP](https://www.rfc-editor.org/rfc/rfc2131)[^62]

</details>

[^62]: DHCP 표준 명세

### NET-063
IPv4를 사용하는 장비와 IPv6를 사용하는 장비가 같은 네트워크 내에서 통신이 가능한가요? 가능하다면 어떤 방법을 사용하나요?

<details>
<summary>답변</summary>

**직접 통신은 불가능**하지만 전환 기술로 가능합니다:

1. **Dual Stack**: 장비가 IPv4/IPv6 모두 지원
2. **터널링(Tunneling)**: IPv6 패킷을 IPv4로 캡슐화 (6to4, Teredo)
3. **NAT64/DNS64**: IPv6 전용 네트워크에서 IPv4 서버 접근
4. **번역(Translation)**: 프로토콜 변환

가장 일반적인 방법은 Dual Stack입니다.

**참고자료**
- [RFC 4213 - IPv6 Transition](https://www.rfc-editor.org/rfc/rfc4213)[^63]

</details>

[^63]: IPv6 전환 메커니즘 명세

### NET-064
IP 프로토콜이 송신자에서 수신자로 데이터가 정확하게 전송되는 것을 보장해 주나요?

<details>
<summary>답변</summary>

**아니요**, IP는 **Best Effort** 서비스입니다.

IP가 보장하지 않는 것:
- 패킷 전달 보장 (손실 가능)
- 순서 보장 (순서 바뀜 가능)
- 중복 방지 (중복 수신 가능)
- 무결성 (손상 가능)

신뢰성이 필요하면 상위 계층(TCP)에서 처리합니다.

**참고자료**
- [RFC 791](https://www.rfc-editor.org/rfc/rfc791)[^64]

</details>

[^64]: IP 서비스 특성 명세

### NET-065
IP 계층의 Checksum과 TCP 계층의 Checksum은 어떤 차이가 있나요?

<details>
<summary>답변</summary>

| 구분 | IPv4 Checksum | TCP Checksum |
|------|---------------|--------------|
| 범위 | IP 헤더만 | 헤더 + 데이터 + 의사 헤더 |
| 목적 | 라우팅 정보 무결성 | 전체 세그먼트 무결성 |
| 재계산 | 매 홉마다 (TTL 변경) | 종단 간 1회 |
| IPv6 | 제거됨 | 필수 |

IPv6에서 IP 체크섬이 제거된 이유: 상위 계층에서 이미 검증하므로 중복 제거.

**참고자료**
- [RFC 791](https://www.rfc-editor.org/rfc/rfc791)[^65]

</details>

[^65]: IP/TCP 체크섬 비교

### NET-066
IP 헤더의 TTL(Time To Live) 필드는 무엇이며, 어떤 역할을 하나요?

<details>
<summary>답변</summary>

**TTL(Time To Live)**은 패킷이 네트워크에서 존재할 수 있는 최대 홉 수입니다.

- 각 라우터 통과 시 TTL 1 감소
- TTL이 0이 되면 패킷 폐기, ICMP 오류 메시지 전송
- 라우팅 루프로 인한 무한 순환 방지

IPv6에서는 **Hop Limit**으로 명칭 변경. 일반적으로 64, 128, 255로 설정합니다.

**참고자료**
- [RFC 791 Section 3.2](https://www.rfc-editor.org/rfc/rfc791#section-3.2)[^66]

</details>

[^66]: IP TTL 필드 명세

### NET-067
IP 주소와 MAC 주소의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | IP 주소 | MAC 주소 |
|------|---------|----------|
| 계층 | Network Layer (L3) | Data Link Layer (L2) |
| 유형 | 논리적 주소 | 물리적 주소 |
| 할당 | 네트워크 관리자/DHCP | 제조사 (NIC에 고정) |
| 변경 | 가능 (위치에 따라) | 불변 (하드웨어 고유) |
| 길이 | 32비트(IPv4) / 128비트(IPv6) | 48비트 |

IP는 "최종 목적지", MAC은 "다음 홉"을 식별합니다.

**참고자료**
- [RFC 826 - ARP](https://www.rfc-editor.org/rfc/rfc826)[^67]

</details>

[^67]: ARP 프로토콜 명세

---

## 📌 DHCP

### NET-068
DHCP가 무엇인지 설명해 주세요.

<details>
<summary>답변</summary>

**DHCP(Dynamic Host Configuration Protocol)**는 네트워크 장치에 IP 주소 및 네트워크 설정을 자동으로 할당하는 프로토콜입니다.

**제공 정보**:
- IP 주소
- 서브넷 마스크
- 기본 게이트웨이
- DNS 서버 주소

관리자가 수동으로 IP를 설정할 필요 없이 자동화됩니다.

**참고자료**
- [RFC 2131 - DHCP](https://www.rfc-editor.org/rfc/rfc2131)[^68]

</details>

[^68]: DHCP 표준 명세

### NET-069
DHCP는 몇 계층 프로토콜인가요?

<details>
<summary>답변</summary>

**Application Layer (7계층)** 프로토콜입니다.

- Transport Layer: UDP 사용 (포트 67-서버, 68-클라이언트)
- 클라이언트가 IP를 받기 전에 통신해야 하므로 브로드캐스트 사용
- 연결 설정 없이 빠르게 동작해야 하므로 UDP 선택

**참고자료**
- [RFC 2131](https://www.rfc-editor.org/rfc/rfc2131)[^69]

</details>

[^69]: DHCP 프로토콜 계층

### NET-070
DHCP는 어떻게 동작하나요?

<details>
<summary>답변</summary>

**DORA 과정**으로 동작합니다:

1. **Discover**: 클라이언트가 브로드캐스트로 DHCP 서버 탐색
2. **Offer**: 서버가 사용 가능한 IP 주소 제안
3. **Request**: 클라이언트가 제안된 IP 사용 요청
4. **Acknowledge**: 서버가 IP 할당 확인 및 임대 정보 전달

모든 과정이 UDP 브로드캐스트로 진행됩니다.

**참고자료**
- [RFC 2131 Section 3](https://www.rfc-editor.org/rfc/rfc2131#section-3)[^70]

</details>

[^70]: DHCP 동작 과정 명세

### NET-071
DHCP에서 UDP를 사용하는 이유가 무엇인가요?

<details>
<summary>답변</summary>

1. **브로드캐스트 필요**: TCP는 연결 지향이라 브로드캐스트 불가
2. **IP 없는 상태**: TCP 연결에는 IP가 필요하지만, DHCP는 IP 할당 전에 동작
3. **단순성**: 4개의 메시지만 교환하므로 TCP 오버헤드 불필요
4. **속도**: 빠른 IP 할당을 위해 연결 설정 과정 생략

**참고자료**
- [RFC 2131](https://www.rfc-editor.org/rfc/rfc2131)[^71]

</details>

[^71]: DHCP UDP 사용 이유

### NET-072
DHCP에서 IP 주소 말고 추가로 제공해주는 정보가 있나요?

<details>
<summary>답변</summary>

**예**, DHCP는 다양한 네트워크 설정을 제공합니다:

- **서브넷 마스크**: 네트워크 범위 정의
- **기본 게이트웨이**: 외부 네트워크 접근용 라우터
- **DNS 서버 주소**: 도메인 이름 해석
- **임대 시간(Lease Time)**: IP 사용 가능 기간
- **도메인 이름**: 네트워크 도메인
- **NTP 서버**: 시간 동기화 서버

**참고자료**
- [RFC 2132 - DHCP Options](https://www.rfc-editor.org/rfc/rfc2132)[^72]

</details>

[^72]: DHCP 옵션 명세

### NET-073
DHCP에서 할당받은 IP 주소의 유효기간(Lease Time)은 얼마나 긴가요?

<details>
<summary>답변</summary>

**서버 설정에 따라 다릅니다.** 일반적으로:

- 가정용: 24시간 ~ 7일
- 기업 환경: 8시간 ~ 24시간
- 공공 Wi-Fi: 1~2시간

클라이언트는 임대 시간의 50%(T1)에 갱신 시도, 87.5%(T2)에 재바인딩을 시도합니다. 만료 시 IP를 반납하고 새로 할당받습니다.

**참고자료**
- [RFC 2131 Section 4.4](https://www.rfc-editor.org/rfc/rfc2131#section-4.4)[^73]

</details>

[^73]: DHCP 임대 시간 명세

---

## 📌 DNS

### NET-074
DNS에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**DNS(Domain Name System)**는 도메인 이름을 IP 주소로 변환하는 분산 데이터베이스 시스템입니다.

**구성 요소**:
- **Root DNS**: 최상위, TLD 서버 정보 보유
- **TLD DNS**: .com, .kr 등 관리
- **Authoritative DNS**: 실제 도메인 레코드 보유
- **Recursive Resolver**: 클라이언트 대신 질의 수행

사람이 기억하기 쉬운 이름으로 네트워크 접근을 가능하게 합니다.

**참고자료**
- [RFC 1035 - DNS](https://www.rfc-editor.org/rfc/rfc1035)[^74]

</details>

[^74]: DNS 표준 명세

### NET-075
DNS는 몇 계층 프로토콜인가요?

<details>
<summary>답변</summary>

**Application Layer (7계층)** 프로토콜입니다.

- 기본적으로 UDP 포트 53 사용
- 응답이 512바이트 초과 시 TCP 사용
- Zone Transfer(영역 전송) 시 TCP 사용

DNS over HTTPS(DoH), DNS over TLS(DoT) 등 보안 DNS도 애플리케이션 계층에서 동작합니다.

**참고자료**
- [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035)[^75]

</details>

[^75]: DNS 프로토콜 계층

### NET-076
DNS는 UDP와 TCP 중 어떤 전송 프로토콜을 사용하나요?

<details>
<summary>답변</summary>

**둘 다 사용**합니다.

**UDP 사용** (기본):
- 일반적인 DNS 질의/응답
- 빠른 응답 필요
- 메시지 크기가 512바이트 이하

**TCP 사용**:
- 응답이 512바이트 초과 (EDNS로 확장 가능)
- Zone Transfer (AXFR/IXFR)
- DNS over TLS (DoT)

**참고자료**
- [RFC 1035 Section 4.2](https://www.rfc-editor.org/rfc/rfc1035#section-4.2)[^76]

</details>

[^76]: DNS 전송 프로토콜 명세

### NET-077
DNS Recursive Query와 Iterative Query가 무엇인가요?

<details>
<summary>답변</summary>

**Recursive Query**:
- 클라이언트가 DNS 서버에 완전한 답변 요청
- 서버가 다른 서버에 질의하여 최종 결과 반환
- 클라이언트 -> Resolver 간 사용

**Iterative Query**:
- 서버가 알고 있는 정보만 반환 (다음 질의할 서버 힌트)
- 질의자가 직접 다음 서버에 질의
- Resolver -> 다른 DNS 서버 간 사용

**참고자료**
- [RFC 1035 Section 4.3](https://www.rfc-editor.org/rfc/rfc1035#section-4.3)[^77]

</details>

[^77]: DNS 쿼리 유형 명세

### NET-078
DNS는 UDP를 사용하는데, DNS 쿼리 과정에서 패킷 손실이 발생한다면 어떻게 처리하나요?

<details>
<summary>답변</summary>

DNS 클라이언트(Resolver)가 **재전송**을 처리합니다:

1. **타임아웃**: 일정 시간 내 응답 없으면 재전송
2. **재시도**: 보통 2-5회 재시도
3. **대체 서버**: 실패 시 다른 DNS 서버로 질의
4. **TCP 폴백**: UDP 실패 시 TCP로 재시도

UDP 자체는 신뢰성을 보장하지 않으므로 애플리케이션 레벨에서 처리합니다.

**참고자료**
- [RFC 1035 Section 4.2.1](https://www.rfc-editor.org/rfc/rfc1035#section-4.2.1)[^78]

</details>

[^78]: DNS UDP 재전송 명세

### NET-079
DNS 캐시에 잘못된 IP 정보가 저장되어 있을 경우 어떻게 보정할 수 있나요?

<details>
<summary>답변</summary>

1. **TTL 만료**: 캐시된 레코드는 TTL 후 자동 삭제, 새로 질의
2. **캐시 플러시**: 수동으로 DNS 캐시 삭제 (`ipconfig /flushdns`)
3. **DNSSEC**: DNS 응답에 서명 추가하여 위변조 감지
4. **DNS 캐시 포이즈닝 방지**: 랜덤 포트, 트랜잭션 ID 사용

DNSSEC은 DNS 응답의 무결성과 출처를 검증합니다.

**참고자료**
- [RFC 4033 - DNSSEC](https://www.rfc-editor.org/rfc/rfc4033)[^79]

</details>

[^79]: DNSSEC 표준 명세

### NET-080
DNS 레코드 타입 중 A, CNAME, AAAA의 차이에 대해서 설명해 주세요.

<details>
<summary>답변</summary>

| 레코드 | 설명 | 예시 |
|--------|------|------|
| **A** | 도메인 -> IPv4 주소 | example.com -> 192.168.1.1 |
| **AAAA** | 도메인 -> IPv6 주소 | example.com -> 2001:db8::1 |
| **CNAME** | 도메인 -> 다른 도메인 (별칭) | www.example.com -> example.com |

CNAME은 실제 IP를 가진 도메인을 가리키며, 최종적으로 A/AAAA 레코드로 해석됩니다.

**참고자료**
- [RFC 1035 Section 3.2.2](https://www.rfc-editor.org/rfc/rfc1035#section-3.2.2)[^80]

</details>

[^80]: DNS 레코드 타입 명세

### NET-081
hosts 파일은 어떤 역할을 하나요? DNS와 비교하였을 때 어떤 것이 우선순위가 더 높나요?

<details>
<summary>답변</summary>

**hosts 파일**은 로컬에서 도메인-IP 매핑을 정의하는 텍스트 파일입니다.

- 위치: Windows(`C:\Windows\System32\drivers\etc\hosts`), Linux/Mac(`/etc/hosts`)
- DNS 쿼리 전에 먼저 참조됨

**우선순위**: hosts 파일 > DNS

용도: 로컬 개발 환경 설정, 특정 도메인 차단, 테스트

**참고자료**
- [RFC 952 - DoD Hostnames](https://www.rfc-editor.org/rfc/rfc952)[^81]

</details>

[^81]: 호스트 파일 형식 명세

---

## 📌 OSI 7계층

### NET-082
OSI 7계층에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 계층 | 이름 | 역할 | 프로토콜/장비 |
|------|------|------|--------------|
| 7 | Application | 사용자 인터페이스 | HTTP, FTP, DNS |
| 6 | Presentation | 데이터 변환, 암호화 | SSL/TLS, JPEG |
| 5 | Session | 세션 관리 | NetBIOS |
| 4 | Transport | 종단 간 통신 | TCP, UDP |
| 3 | Network | 라우팅 | IP, 라우터 |
| 2 | Data Link | 물리 주소 지정 | Ethernet, 스위치 |
| 1 | Physical | 전기 신호 전송 | 케이블, 허브 |

**참고자료**
- [ISO/IEC 7498-1](https://www.iso.org/standard/20269.html)[^82]

</details>

[^82]: OSI 모델 국제 표준

### NET-083
OSI 모델에서 Transport Layer와 Network Layer의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | Network Layer (L3) | Transport Layer (L4) |
|------|-------------------|---------------------|
| 주소 | IP 주소 (호스트) | 포트 번호 (프로세스) |
| 통신 단위 | 패킷 | 세그먼트 |
| 범위 | 호스트 간 | 프로세스 간 (End-to-End) |
| 신뢰성 | Best Effort | TCP는 신뢰성 보장 |
| 프로토콜 | IP, ICMP | TCP, UDP |

Network Layer는 "어디로", Transport Layer는 "누구에게, 어떻게"를 담당합니다.

**참고자료**
- [RFC 1122](https://www.rfc-editor.org/rfc/rfc1122)[^83]

</details>

[^83]: 인터넷 호스트 요구사항 명세

### NET-084
L3 Switch와 Router의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | L3 Switch | Router |
|------|-----------|--------|
| 처리 | 하드웨어 (ASIC) | 소프트웨어 |
| 속도 | 매우 빠름 | 상대적으로 느림 |
| 기능 | 기본 라우팅 | NAT, 방화벽, VPN 등 |
| 용도 | LAN 내부 | WAN 연결, 인터넷 |
| 포트 | 많음 (24-48개) | 적음 (2-8개) |

L3 Switch는 "라우팅 가능한 스위치", Router는 "다양한 네트워크 기능 장비"입니다.

**참고자료**
- [RFC 1812 - Router Requirements](https://www.rfc-editor.org/rfc/rfc1812)[^84]

</details>

[^84]: 라우터 요구사항 명세

### NET-085
OSI 7계층 모델에서 각 계층의 데이터 단위(PDU)를 무엇이라고 부르나요?

<details>
<summary>답변</summary>

| 계층 | PDU (Protocol Data Unit) |
|------|-------------------------|
| Application (L7) | Data / Message |
| Transport (L4) | Segment (TCP) / Datagram (UDP) |
| Network (L3) | Packet |
| Data Link (L2) | Frame |
| Physical (L1) | Bit |

각 계층에서 헤더가 추가되며, 이를 캡슐화(Encapsulation)라 합니다.

**참고자료**
- [ISO/IEC 7498-1](https://www.iso.org/standard/20269.html)[^85]

</details>

[^85]: OSI PDU 명명 규칙

### NET-086
OSI 7계층 모델에서 데이터가 전송될 때 각 계층별 헤더가 붙는 캡슐화(Encapsulation) 순서에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**캡슐화(송신) 순서**:
```
[Data]
-> [TCP Header + Data] (Segment)
-> [IP Header + Segment] (Packet)
-> [Ethernet Header + Packet + Trailer] (Frame)
-> [Bits]
```

**역캡슐화(수신) 순서**: 역순으로 헤더 제거

각 계층은 상위 계층의 전체를 데이터로 취급하고 자신의 헤더를 붙입니다.

**참고자료**
- [RFC 1122](https://www.rfc-editor.org/rfc/rfc1122)[^86]

</details>

[^86]: 프로토콜 캡슐화 명세

### NET-087
IP 주소를 MAC 주소로 변환하는 ARP(Address Resolution Protocol)에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**ARP(Address Resolution Protocol)**는 IP 주소를 MAC 주소로 변환하는 프로토콜입니다.

**동작 과정**:
1. ARP Request: "이 IP의 MAC 주소가 뭐야?" (브로드캐스트)
2. ARP Reply: "내 MAC 주소는 이거야" (유니캐스트)
3. ARP 테이블에 캐싱

같은 네트워크 내에서만 동작하며, 다른 네트워크는 게이트웨이의 MAC 주소를 사용합니다.

**참고자료**
- [RFC 826 - ARP](https://www.rfc-editor.org/rfc/rfc826)[^87]

</details>

[^87]: ARP 표준 명세

---

## 📌 라우팅 및 포워딩

### NET-088
라우터 내의 포워딩 과정에 대해 설명해 주세요.

<details>
<summary>답변</summary>

1. **패킷 수신**: 입력 포트에서 프레임 수신, 역캡슐화
2. **목적지 확인**: IP 헤더에서 목적지 IP 추출
3. **테이블 검색**: 포워딩 테이블에서 최장 접두어 매칭 (Longest Prefix Match)
4. **TTL 감소**: TTL 1 감소, 0이면 폐기
5. **출력 포트 결정**: 매칭된 엔트리의 출력 포트로 전달
6. **재캡슐화**: 새로운 L2 헤더 추가 후 전송

**참고자료**
- [RFC 1812 Section 5](https://www.rfc-editor.org/rfc/rfc1812#section-5)[^88]

</details>

[^88]: IP 포워딩 알고리즘 명세

### NET-089
라우팅과 포워딩의 차이는 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | 라우팅 (Routing) | 포워딩 (Forwarding) |
|------|-----------------|-------------------|
| 역할 | 경로 결정 | 패킷 전달 |
| 시점 | 사전 계산 (Control Plane) | 실시간 처리 (Data Plane) |
| 결과물 | 포워딩 테이블 생성 | 실제 패킷 이동 |
| 프로토콜 | OSPF, BGP, RIP | - |

라우팅은 "지도 그리기", 포워딩은 "지도 보고 이동"입니다.

**참고자료**
- [RFC 1812](https://www.rfc-editor.org/rfc/rfc1812)[^89]

</details>

[^89]: 라우터 동작 명세

### NET-090
라우팅 알고리즘에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Link State (링크 상태)**:
- 전체 네트워크 토폴로지 파악
- 다익스트라 알고리즘으로 최단 경로 계산
- 예: OSPF, IS-IS

**Distance Vector (거리 벡터)**:
- 이웃에게 자신의 라우팅 테이블 공유
- 벨만-포드 알고리즘
- 예: RIP, BGP (Path Vector)

**경로 결정 기준**: 홉 수, 대역폭, 지연, 비용 등

**참고자료**
- [RFC 2328 - OSPF](https://www.rfc-editor.org/rfc/rfc2328)[^90]

</details>

[^90]: OSPF 라우팅 프로토콜 명세

### NET-091
포워딩 테이블의 구조에 대해 설명해 주세요.

<details>
<summary>답변</summary>

포워딩 테이블의 기본 구조:

| 목적지 네트워크 | 서브넷 마스크 | 다음 홉 | 출력 인터페이스 | 메트릭 |
|----------------|--------------|---------|----------------|--------|
| 192.168.1.0 | /24 | 10.0.0.1 | eth0 | 10 |
| 0.0.0.0 | /0 | 10.0.0.254 | eth1 | 1 |

- **Longest Prefix Match**: 가장 구체적인 경로 선택
- **Default Route**: 0.0.0.0/0으로 매칭되지 않는 모든 트래픽 처리

**참고자료**
- [RFC 1812 Section 5.2](https://www.rfc-editor.org/rfc/rfc1812#section-5.2)[^91]

</details>

[^91]: 포워딩 테이블 구조 명세

---

## 📌 로드밸런서

### NET-092
로드밸런서가 무엇인가요?

<details>
<summary>답변</summary>

**로드밸런서**는 들어오는 트래픽을 여러 서버에 분산시키는 장치/소프트웨어입니다.

**목적**:
- 부하 분산으로 성능 향상
- 고가용성 (서버 장애 시 다른 서버로 라우팅)
- 확장성 (서버 추가/제거 용이)

**종류**: 하드웨어(F5), 소프트웨어(Nginx, HAProxy), 클라우드(AWS ALB/NLB)

**참고자료**
- [RFC 7098 - Load Balancing](https://www.rfc-editor.org/rfc/rfc7098)[^92]

</details>

[^92]: 로드밸런싱 아키텍처 명세

### NET-093
L4 로드밸런서와 L7 로드밸런서의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | L4 로드밸런서 | L7 로드밸런서 |
|------|--------------|--------------|
| 계층 | Transport (TCP/UDP) | Application (HTTP) |
| 분산 기준 | IP, Port | URL, Header, Cookie |
| 속도 | 빠름 | 상대적으로 느림 |
| 기능 | 단순 분산 | 콘텐츠 기반 라우팅, SSL 종료 |
| 예시 | AWS NLB | AWS ALB, Nginx |

L4는 패킷 레벨, L7은 요청 내용 레벨에서 결정합니다.

**참고자료**
- [RFC 7098](https://www.rfc-editor.org/rfc/rfc7098)[^93]

</details>

[^93]: 로드밸런서 계층별 특성

### NET-094
로드밸런서 알고리즘에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**정적 알고리즘**:
- **Round Robin**: 순차적으로 분배
- **Weighted Round Robin**: 가중치에 따라 분배
- **IP Hash**: 클라이언트 IP 해시로 서버 결정

**동적 알고리즘**:
- **Least Connection**: 연결 수가 가장 적은 서버로
- **Least Response Time**: 응답 시간이 가장 빠른 서버로
- **Resource Based**: 서버 리소스 상태 기반

**참고자료**
- [RFC 7098 Section 4](https://www.rfc-editor.org/rfc/rfc7098#section-4)[^94]

</details>

[^94]: 로드밸런싱 알고리즘 명세

### NET-095
로드밸런서에서 장애가 발생한 백엔드 서버로 요청을 보내지 않도록 하려면 어떻게 해야 할까요?

<details>
<summary>답변</summary>

**Health Check (헬스 체크)**를 사용합니다.

**방식**:
- **TCP Check**: 포트 연결 가능 여부 확인
- **HTTP Check**: 특정 URL 요청 후 200 응답 확인
- **Custom Script**: 사용자 정의 스크립트 실행

**동작**:
1. 주기적으로 헬스 체크 수행 (예: 10초마다)
2. 연속 실패 시 해당 서버를 풀에서 제외
3. 복구 확인 시 다시 풀에 추가

**참고자료**
- [AWS ELB Health Checks](https://docs.aws.amazon.com/elasticloadbalancing/)[^95]

</details>

[^95]: AWS 로드밸런서 헬스 체크 문서

### NET-096
로드밸런서 장치를 사용하지 않고, DNS를 활용해서 유사하게 로드밸런싱을 하는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**DNS Round Robin**을 사용합니다.

**방법**:
- 하나의 도메인에 여러 A 레코드(IP) 등록
- DNS 서버가 질의마다 IP 순서를 바꿔 응답

**장점**: 구현 간단, 추가 장비 불필요

**단점**:
- 헬스 체크 불가 (장애 서버로도 라우팅)
- DNS 캐싱으로 균등 분산 어려움
- 세밀한 제어 불가

AWS Route 53의 가중치 기반 라우팅 등 고급 DNS 서비스로 보완 가능합니다.

**참고자료**
- [RFC 1794 - DNS Round Robin](https://www.rfc-editor.org/rfc/rfc1794)[^96]

</details>

[^96]: DNS 로드밸런싱 명세

---

## 📌 서브넷 및 NAT

### NET-097
서브넷 마스크와, 게이트웨이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**서브넷 마스크**:
- IP 주소에서 네트워크/호스트 부분을 구분
- 예: 255.255.255.0 (/24) -> 앞 24비트가 네트워크
- 같은 네트워크인지 판단하는 데 사용

**게이트웨이 (Default Gateway)**:
- 다른 네트워크로 나가는 출구 (라우터)
- 목적지가 같은 서브넷이 아니면 게이트웨이로 전송
- 일반적으로 서브넷의 첫 번째 또는 마지막 IP

**참고자료**
- [RFC 950 - Subnetting](https://www.rfc-editor.org/rfc/rfc950)[^97]

</details>

[^97]: 서브넷 명세

### NET-098
사설 IP와 공인 IP 간 변환을 담당하는 NAT(Network Address Translation)에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**NAT(Network Address Translation)**은 사설 IP를 공인 IP로 변환하는 기술입니다.

**종류**:
- **Static NAT**: 1:1 고정 매핑
- **Dynamic NAT**: 풀에서 동적 할당
- **PAT/NAPT**: 포트 번호까지 변환 (가장 일반적, 1:N)

**장점**: IPv4 주소 절약, 내부 네트워크 보안
**단점**: End-to-End 연결성 저해, P2P 통신 어려움

**참고자료**
- [RFC 3022 - NAT](https://www.rfc-editor.org/rfc/rfc3022)[^98]

</details>

[^98]: NAT 표준 명세

### NET-099
서브넷 마스크의 표현 방식에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**1. 점 표기법 (Dotted Decimal)**:
- 예: 255.255.255.0
- 각 옥텟을 10진수로 표현

**2. CIDR 표기법 (Prefix Length)**:
- 예: /24
- 네트워크 비트 수만 표시
- 192.168.1.0/24 = 192.168.1.0 ~ 192.168.1.255

| CIDR | 서브넷 마스크 | 호스트 수 |
|------|--------------|----------|
| /24 | 255.255.255.0 | 254 |
| /16 | 255.255.0.0 | 65,534 |

**참고자료**
- [RFC 4632 - CIDR](https://www.rfc-editor.org/rfc/rfc4632)[^99]

</details>

[^99]: CIDR 표기법 명세

### NET-100
255.0.255.0 같은 형태의 서브넷 마스크도 가능한가요?

<details>
<summary>답변</summary>

**이론적으로 불가능**합니다.

서브넷 마스크는 **연속된 1비트** 뒤에 **연속된 0비트**가 와야 합니다.

- 유효: 11111111.11111111.11111111.00000000 (255.255.255.0)
- 무효: 11111111.00000000.11111111.00000000 (255.0.255.0)

비연속 마스크는 라우팅 테이블 최적화와 주소 관리를 복잡하게 만들어 표준에서 허용하지 않습니다.

**참고자료**
- [RFC 4632](https://www.rfc-editor.org/rfc/rfc4632)[^100]

</details>

[^100]: CIDR 서브넷 마스크 규칙

---

## 📌 웹 동작 과정

### NET-101
www.github.com을 브라우저에 입력하고 엔터를 쳤을 때, 네트워크 상 어떤 일이 일어나는지 최대한 자세하게 설명해 주세요.

<details>
<summary>답변</summary>

1. **URL 파싱**: 프로토콜(https), 도메인(www.github.com) 추출
2. **DNS 조회**: 로컬 캐시 -> hosts -> DNS 서버로 IP 획득
3. **TCP 연결**: 3-way handshake로 연결 수립
4. **TLS 핸드셰이크**: 인증서 검증, 대칭키 교환
5. **HTTP 요청**: GET / HTTP/1.1 요청 전송
6. **서버 처리**: 웹서버/WAS가 요청 처리
7. **HTTP 응답**: HTML, CSS, JS 등 응답
8. **렌더링**: 브라우저가 DOM 파싱, 화면 표시
9. **연결 종료**: Keep-Alive 또는 4-way handshake

**참고자료**
- [MDN - How the Web Works](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)[^101]

</details>

[^101]: MDN 웹 동작 원리 문서

### NET-102
대규모 웹 서비스에서 DNS 쿼리를 통해 얻어진 IP 주소는 일반적으로 어떤 장치를 가리키고 있나요?

<details>
<summary>답변</summary>

일반적으로 **실제 서버가 아닌 중간 장치**를 가리킵니다:

1. **CDN 엣지 서버**: CloudFlare, Akamai 등 (가장 가까운 캐시 서버)
2. **로드밸런서**: 트래픽을 분산하는 진입점
3. **리버스 프록시**: Nginx 등 프론트 서버
4. **방화벽/WAF**: 보안 장비

실제 애플리케이션 서버는 내부 네트워크에 있고, 외부에 직접 노출되지 않는 것이 일반적입니다.

**참고자료**
- [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035)[^102]

</details>

[^102]: DNS 응답과 인프라 구조

### NET-103
Web Server와 Web Application Server(WAS)의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | Web Server | WAS (Web Application Server) |
|------|-----------|------------------------------|
| 역할 | 정적 콘텐츠 제공 | 동적 콘텐츠 생성 |
| 처리 | HTML, CSS, 이미지 | 비즈니스 로직, DB 연동 |
| 예시 | Nginx, Apache | Tomcat, Node.js, Spring |
| 프로토콜 | HTTP | HTTP + 애플리케이션 프로토콜 |

일반적으로 Web Server가 앞단에서 정적 파일/리버스 프록시 역할을 하고, WAS가 실제 로직을 처리합니다.

**참고자료**
- [MDN - Web Server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server)[^103]

</details>

[^103]: MDN 웹 서버 개념 문서

### NET-104
URL, URI, URN은 어떤 차이가 있나요?

<details>
<summary>답변</summary>

**URI (Uniform Resource Identifier)**:
- 리소스를 식별하는 가장 큰 개념
- URL과 URN을 포함

**URL (Uniform Resource Locator)**:
- 리소스의 **위치**를 나타냄
- 예: `https://example.com/page.html`

**URN (Uniform Resource Name)**:
- 리소스의 **이름**을 나타냄 (위치 독립적)
- 예: `urn:isbn:0451450523`

**관계**: URI = URL + URN (URL과 URN은 URI의 하위 집합)

**참고자료**
- [RFC 3986 - URI](https://www.rfc-editor.org/rfc/rfc3986)[^104]

</details>

[^104]: URI 표준 명세
