# WebSocket / 웹소켓

> 카테고리: 통신 프로토콜
> [← 면접 질문 목록으로 돌아가기](../interview.md)

---

## 📌 WebSocket 기본 개념

### WS-001
WebSocket의 기본 개념과 HTTP와의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**WebSocket이란?**
- 클라이언트와 서버 간 **양방향 전이중(Full-Duplex) 통신**을 제공하는 프로토콜
- 단일 TCP 연결을 통해 지속적인 통신 가능
- `ws://` (비암호화) 또는 `wss://` (TLS 암호화) 스킴 사용

**HTTP와의 주요 차이점**

| 구분 | HTTP | WebSocket |
|------|------|-----------|
| 통신 방식 | 요청-응답 (반이중) | 양방향 (전이중) |
| 연결 | 매 요청마다 연결/해제 | 한 번 연결 후 지속 유지 |
| 오버헤드 | 매 요청마다 헤더 전송 | 초기 핸드셰이크 후 최소 |
| 서버 푸시 | 불가 (폴링 필요) | 가능 |
| 상태 | Stateless | Stateful |

**참고자료**
- [RFC 6455 - The WebSocket Protocol](https://datatracker.ietf.org/doc/html/rfc6455)[^1]
- [MDN WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)[^2]

</details>

[^1]: IETF RFC 6455 - WebSocket 프로토콜 공식 명세
[^2]: MDN Web Docs - WebSocket API 레퍼런스

### WS-002
WebSocket 연결의 Handshake 과정은 어떻게 진행되나요?

<details>
<summary>답변</summary>

**WebSocket Handshake 과정**

WebSocket 연결은 HTTP Upgrade 요청으로 시작됩니다.

**1. 클라이언트 요청**
```http
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

**2. 서버 응답**
```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

**주요 헤더 설명**
- `Upgrade: websocket`: 프로토콜 업그레이드 요청
- `Sec-WebSocket-Key`: 클라이언트가 생성한 Base64 인코딩 키
- `Sec-WebSocket-Accept`: 서버가 Key + GUID를 SHA-1 해시 후 Base64 인코딩한 값
- `Sec-WebSocket-Version`: 프로토콜 버전 (현재 13)

**참고자료**
- [RFC 6455 Section 4 - Opening Handshake](https://datatracker.ietf.org/doc/html/rfc6455#section-4)[^3]

</details>

[^3]: RFC 6455 - WebSocket 핸드셰이크 명세

### WS-003
WebSocket의 메시지 프레이밍(message framing) 메커니즘에 대해 설명해주세요.

<details>
<summary>답변</summary>

**WebSocket 프레임 구조**

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
|N|V|V|V|       |S|             |   (if payload len==126/127)   |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+-------------------------------+
|     Masking-key (if MASK set)  |          Payload Data        |
+--------------------------------+-------------------------------+
```

**주요 필드**
- **FIN**: 메시지의 마지막 프레임인지 표시 (1비트)
- **Opcode**: 프레임 타입 (4비트)
  - `0x0`: Continuation, `0x1`: Text, `0x2`: Binary
  - `0x8`: Close, `0x9`: Ping, `0xA`: Pong
- **MASK**: 클라이언트→서버 메시지는 반드시 마스킹
- **Payload length**: 페이로드 크기 (7/16/64비트)

**참고자료**
- [RFC 6455 Section 5 - Data Framing](https://datatracker.ietf.org/doc/html/rfc6455#section-5)[^4]

</details>

[^4]: RFC 6455 - WebSocket 데이터 프레이밍 명세

---

## 📌 WebSocket vs Long Polling

### WS-004
Long Polling과 WebSocket의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | Long Polling | WebSocket |
|------|--------------|-----------|
| **연결 방식** | HTTP 요청을 길게 유지 | 단일 TCP 연결 유지 |
| **통신 방향** | 단방향 (요청-응답) | 양방향 |
| **오버헤드** | 매 요청마다 HTTP 헤더 | 핸드셰이크 후 최소 오버헤드 |
| **지연시간** | 응답 후 재연결 필요 | 실시간 |
| **서버 부하** | 연결 재설정 비용 높음 | 연결 유지 비용만 |
| **호환성** | 모든 브라우저/프록시 지원 | 일부 프록시 문제 가능 |

**Long Polling 동작**
1. 클라이언트가 요청 전송
2. 서버는 이벤트가 발생할 때까지 응답 대기
3. 이벤트 발생 시 응답 반환
4. 클라이언트가 즉시 새 요청 전송 (반복)

**WebSocket 선택 기준**
- 실시간성이 중요하고 양방향 통신이 필요한 경우 → WebSocket
- 프록시 호환성이 중요하거나 간단한 서버 푸시만 필요한 경우 → Long Polling

</details>

---

## 📌 WebSocket 보안

### WS-005
WebSocket 통신에서 보안을 강화하기 위한 주요 고려 사항은 무엇인가요?

<details>
<summary>답변</summary>

**1. WSS (WebSocket Secure) 사용**
- `wss://` 프로토콜로 TLS/SSL 암호화 적용
- 중간자 공격(MITM) 방지

**2. Origin 검증**
```javascript
// 서버 측 Origin 헤더 검증
if (request.headers.origin !== 'https://trusted-domain.com') {
  reject();
}
```

**3. 인증 및 토큰 관리**
- 핸드셰이크 시 JWT 토큰 검증
- 쿼리 파라미터나 첫 메시지로 토큰 전달
- 토큰 만료 시 연결 종료 처리

**4. 입력 검증**
- 모든 수신 메시지의 형식 및 크기 검증
- XSS, 인젝션 공격 방지

**5. Rate Limiting**
- 메시지 빈도 제한으로 DoS 공격 방지
- 연결 수 제한

**6. 메시지 크기 제한**
- 최대 프레임/메시지 크기 설정
- 메모리 고갈 공격 방지

**참고자료**
- [OWASP WebSocket Security](https://owasp.org/www-project-web-security-testing-guide/)[^5]

</details>

[^5]: OWASP - 웹 보안 테스팅 가이드

---

## 📌 WebSocket 재연결

### WS-006
WebSocket 연결이 끊어졌을 때 재연결(reconnect) 로직은 어떻게 구현하나요?

<details>
<summary>답변</summary>

**재연결 구현 핵심 요소**

**1. Exponential Backoff (지수 백오프)**
```javascript
class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.reconnectDelay = 1000; // 초기 1초
    this.maxDelay = 30000;      // 최대 30초
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.reconnectDelay = 1000; // 성공 시 초기화
    };

    this.ws.onclose = (event) => {
      if (!event.wasClean) {
        setTimeout(() => this.connect(), this.reconnectDelay);
        this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.maxDelay);
      }
    };
  }
}
```

**2. 고려사항**
- **Jitter 추가**: 다수 클라이언트 동시 재연결 방지
- **최대 재시도 횟수**: 무한 재시도 방지
- **상태 복구**: 재연결 후 구독 정보 재전송
- **오프라인 감지**: `navigator.onLine` 활용

**3. 라이브러리 활용**
- Socket.IO: 자동 재연결 내장
- ReconnectingWebSocket: 경량 재연결 래퍼

</details>

---

## 📌 WebSocket 상태 코드

### WS-007
WebSocket 프로토콜에서 사용되는 상태 코드와 그 의미에 대해 설명해주세요.

<details>
<summary>답변</summary>

**주요 Close 상태 코드 (RFC 6455)**

| 코드 | 이름 | 설명 |
|------|------|------|
| **1000** | Normal Closure | 정상 종료 |
| **1001** | Going Away | 서버 셧다운, 브라우저 이탈 |
| **1002** | Protocol Error | 프로토콜 오류 |
| **1003** | Unsupported Data | 지원하지 않는 데이터 타입 |
| **1005** | No Status Received | 상태 코드 없이 종료 (예약) |
| **1006** | Abnormal Closure | 비정상 종료 (연결 끊김) |
| **1007** | Invalid Payload | 잘못된 데이터 (예: UTF-8 오류) |
| **1008** | Policy Violation | 정책 위반 |
| **1009** | Message Too Big | 메시지 크기 초과 |
| **1010** | Mandatory Extension | 필수 확장 미지원 |
| **1011** | Internal Error | 서버 내부 오류 |
| **1015** | TLS Handshake | TLS 핸드셰이크 실패 (예약) |

**사용 예시**
```javascript
ws.close(1000, 'Normal closure');

ws.onclose = (event) => {
  console.log(`Code: ${event.code}, Reason: ${event.reason}`);
};
```

**참고자료**
- [RFC 6455 Section 7.4 - Status Codes](https://datatracker.ietf.org/doc/html/rfc6455#section-7.4)[^6]

</details>

[^6]: RFC 6455 - WebSocket 상태 코드 정의

---

## 📌 WebSocket Ping/Pong

### WS-008
Ping/Pong 메커니즘이 WebSocket 연결 유지에 어떻게 활용되는지 설명해주세요.

<details>
<summary>답변</summary>

**Ping/Pong 개념**
- WebSocket 제어 프레임 (Opcode: Ping=0x9, Pong=0xA)
- 연결 상태 확인 및 유지(Keep-Alive) 목적

**동작 방식**
1. 한 쪽이 Ping 프레임 전송
2. 수신 측은 **반드시** Pong으로 응답 (자동 처리)
3. 응답 없으면 연결 끊김으로 판단

**활용 목적**
- **연결 상태 확인**: Dead connection 감지
- **NAT/방화벽 타임아웃 방지**: 주기적 트래픽으로 연결 유지
- **지연시간 측정**: RTT(Round Trip Time) 계산

**구현 예시**
```javascript
// Node.js ws 라이브러리
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', () => { ws.isAlive = true; });
});

// 30초마다 Ping
setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);
```

**참고자료**
- [RFC 6455 Section 5.5.2 - Ping](https://datatracker.ietf.org/doc/html/rfc6455#section-5.5.2)[^7]

</details>

[^7]: RFC 6455 - Ping/Pong 프레임 명세

---

## 📌 WebSocket 확장

### WS-009
WebSocket 확장(extensions) 기능은 무엇이며, 어떤 용도로 사용되나요?

<details>
<summary>답변</summary>

**WebSocket 확장이란?**
- 기본 WebSocket 프로토콜에 추가 기능을 제공하는 메커니즘
- 핸드셰이크 시 `Sec-WebSocket-Extensions` 헤더로 협상

**대표적인 확장**

**1. permessage-deflate (RFC 7692)**
- 메시지 압축 확장
- zlib/DEFLATE 알고리즘 사용
- 대역폭 절약 (텍스트 데이터 70-90% 압축)

```http
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
```

**2. 사용 예시**
```javascript
// Node.js ws 라이브러리
const WebSocket = require('ws');
const wss = new WebSocket.Server({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: { chunkSize: 1024, level: 3 },
    threshold: 1024  // 1KB 이상만 압축
  }
});
```

**주의사항**
- 압축/해제에 CPU 오버헤드 발생
- 작은 메시지는 압축 효율 낮음
- 이미 압축된 데이터(이미지 등)는 비효율적

**참고자료**
- [RFC 7692 - Compression Extensions](https://datatracker.ietf.org/doc/html/rfc7692)[^8]

</details>

[^8]: RFC 7692 - WebSocket 압축 확장 명세

---

## 📌 WebSocket CORS

### WS-010
WebSocket 구현 시 발생할 수 있는 Cross-Origin 문제와 그 해결 방법은 무엇인가요?

<details>
<summary>답변</summary>

**WebSocket과 CORS의 관계**

WebSocket은 HTTP CORS 정책의 적용을 받지 **않습니다**. 그러나 보안상 Origin 검증이 필요합니다.

**브라우저 동작**
- 브라우저는 핸드셰이크 시 `Origin` 헤더를 자동 전송
- 서버가 연결을 수락하면 통신 가능

**보안 문제: CSWSH (Cross-Site WebSocket Hijacking)**
- 악성 사이트에서 사용자 세션으로 WebSocket 연결 시도 가능
- 서버가 Origin을 검증하지 않으면 취약

**해결 방법**

**1. 서버 측 Origin 검증**
```javascript
const wss = new WebSocket.Server({
  port: 8080,
  verifyClient: (info) => {
    const allowedOrigins = ['https://mysite.com'];
    return allowedOrigins.includes(info.origin);
  }
});
```

**2. 토큰 기반 인증**
- 핸드셰이크 URL에 일회용 토큰 포함
- 첫 메시지에서 JWT 검증

**3. CSRF 토큰 활용**
- 기존 웹 애플리케이션의 CSRF 토큰 재사용

</details>

---

## 📌 WebSocket 클러스터 환경

### WS-011
단일 서버와 클러스터 환경에서의 WebSocket 구현 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**단일 서버 환경**
- 모든 연결이 하나의 서버 메모리에 존재
- 브로드캐스트가 간단 (로컬 연결만 순회)
- 수직 확장의 한계

**클러스터 환경의 문제점**
- 클라이언트 A와 B가 서로 다른 서버에 연결
- A가 B에게 메시지를 보내려면 서버 간 통신 필요
- Sticky Session만으로는 불충분

**해결 방법**

**1. Pub/Sub 백엔드 (권장)**
```javascript
// Redis Pub/Sub 활용
const Redis = require('ioredis');
const pub = new Redis();
const sub = new Redis();

sub.subscribe('chat');
sub.on('message', (channel, message) => {
  // 로컬 연결들에게 브로드캐스트
  localClients.forEach(ws => ws.send(message));
});

// 메시지 발행
pub.publish('chat', JSON.stringify(data));
```

**2. 외부 메시지 브로커**
- Redis, Kafka, RabbitMQ 등 활용
- 서버 간 메시지 동기화

**3. Socket.IO Redis Adapter**
```javascript
const { createAdapter } = require('@socket.io/redis-adapter');
io.adapter(createAdapter(pubClient, subClient));
```

**참고자료**
- [Socket.IO Redis Adapter](https://socket.io/docs/v4/redis-adapter/)[^9]

</details>

[^9]: Socket.IO - Redis Adapter 공식 문서

---

## 📌 WebSocket 데이터 타입

### WS-012
WebSocket에서 텍스트와 이진 데이터 전송 방식의 장단점은 무엇인가요?

<details>
<summary>답변</summary>

**데이터 프레임 타입**
- **Text Frame (Opcode 0x1)**: UTF-8 인코딩 문자열
- **Binary Frame (Opcode 0x2)**: 바이트 배열

**텍스트 데이터 (JSON 등)**

| 장점 | 단점 |
|------|------|
| 사람이 읽기 쉬움 | 크기가 큼 (Base64 인코딩 시 33% 증가) |
| 디버깅 용이 | 파싱 오버헤드 |
| 호환성 높음 | 바이너리 데이터 표현 비효율적 |

```javascript
// 텍스트 전송
ws.send(JSON.stringify({ type: 'message', data: 'Hello' }));
```

**이진 데이터 (Protobuf, MessagePack 등)**

| 장점 | 단점 |
|------|------|
| 작은 페이로드 크기 | 디버깅 어려움 |
| 파싱 속도 빠름 | 스키마 관리 필요 |
| 바이너리 데이터 직접 전송 | 추가 라이브러리 필요 |

```javascript
// ArrayBuffer 전송
const buffer = new ArrayBuffer(8);
ws.send(buffer);

// Blob 전송
const blob = new Blob([data], { type: 'application/octet-stream' });
ws.send(blob);
```

**선택 기준**
- 실시간 게임/미디어 스트리밍 → Binary
- 일반 채팅/알림 → Text (JSON)
- 대용량 트래픽 + 성능 중요 → Binary (Protobuf)

**참고자료**
- [RFC 6455 Section 5.6 - Data Frames](https://datatracker.ietf.org/doc/html/rfc6455#section-5.6)[^10]

</details>

[^10]: RFC 6455 - 데이터 프레임 타입 명세

---

## 📌 WebSocket 사용 사례

### WS-013
실시간 채팅이나 게임 애플리케이션에서 WebSocket이 선호되는 이유는 무엇인가요?

<details>
<summary>답변</summary>

**실시간 애플리케이션 요구사항**
1. **낮은 지연시간**: 메시지가 즉시 전달되어야 함
2. **양방향 통신**: 서버도 클라이언트에 능동적으로 푸시
3. **빈번한 메시지**: 초당 수십~수백 건의 이벤트

**WebSocket이 적합한 이유**

| 요구사항 | HTTP Polling | WebSocket |
|----------|--------------|-----------|
| 지연시간 | 폴링 간격만큼 지연 | 실시간 (~ms) |
| 오버헤드 | 매번 HTTP 헤더 | 2-14바이트 프레임 헤더 |
| 서버 푸시 | 불가능 | 가능 |
| 연결 수 | 요청마다 새 연결 | 단일 연결 유지 |

**채팅 애플리케이션 예시**
```javascript
// 서버: 새 메시지를 모든 참여자에게 즉시 푸시
wss.clients.forEach(client => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify({ type: 'chat', message }));
  }
});
```

**게임 애플리케이션 예시**
- 캐릭터 위치 동기화 (초당 30-60회 업데이트)
- 실시간 액션 입력 전달
- 게임 상태 브로드캐스트

**대안과 비교**
- **SSE**: 단방향만 가능, 클라이언트→서버는 별도 HTTP 필요
- **HTTP/2 Push**: 리소스 프리로드용, 양방향 불가
- **WebRTC**: P2P 가능하나 복잡도 높음

</details>

---

## 📌 WebSocket 부하 분산

### WS-014
WebSocket 서버의 부하 분산(load balancing) 전략에는 어떤 것들이 있나요?

<details>
<summary>답변</summary>

**WebSocket 로드밸런싱의 특수성**
- HTTP와 달리 장시간 연결 유지 (Stateful)
- 한 번 연결되면 같은 서버와 통신해야 함

**1. Sticky Session (Session Affinity)**
```nginx
# Nginx 설정
upstream websocket {
    ip_hash;  # 클라이언트 IP 기반
    server backend1:8080;
    server backend2:8080;
}
```
- 같은 클라이언트는 항상 같은 서버로 라우팅
- IP 해시, 쿠키 기반 등 방식 존재

**2. L4 로드밸런싱**
- TCP 레벨에서 연결 분산
- WebSocket Upgrade 후에도 연결 유지
- AWS NLB, HAProxy 등

**3. L7 로드밸런싱**
- HTTP Upgrade 요청 분석 가능
- 경로/헤더 기반 라우팅
- Nginx, Envoy, AWS ALB

**Nginx WebSocket 프록시 설정**
```nginx
location /ws/ {
    proxy_pass http://websocket;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 86400;  # 타임아웃 연장
}
```

**4. 서버 간 동기화 (필수)**
- Redis Pub/Sub, Kafka 등으로 메시지 동기화
- 어떤 서버로 연결되든 메시지 수신 보장

**참고자료**
- [Nginx WebSocket Proxying](https://nginx.org/en/docs/http/websocket.html)[^11]

</details>

[^11]: Nginx - WebSocket 프록시 공식 문서

---

## 📌 WebSocket 리소스 관리

### WS-015
WebSocket 연결 유지 시 메모리 및 리소스 관리 방법은 무엇인가요?

<details>
<summary>답변</summary>

**리소스 관리의 중요성**
- 수만 개의 동시 연결 시 메모리 사용량 급증
- 유휴 연결도 리소스 점유

**1. 연결 수 제한**
```javascript
const MAX_CONNECTIONS = 10000;
let connectionCount = 0;

wss.on('connection', (ws) => {
  if (connectionCount >= MAX_CONNECTIONS) {
    ws.close(1013, 'Try again later');
    return;
  }
  connectionCount++;
  ws.on('close', () => connectionCount--);
});
```

**2. 유휴 연결 정리**
```javascript
// Heartbeat로 비활성 연결 감지
const IDLE_TIMEOUT = 60000;

ws.isAlive = true;
ws.on('pong', () => { ws.isAlive = true; });

setInterval(() => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, IDLE_TIMEOUT);
```

**3. 메시지 버퍼 제한**
```javascript
const ws = new WebSocket.Server({
  maxPayload: 1024 * 1024,  // 최대 1MB
  backlog: 100              // 연결 대기열 제한
});
```

**4. 메모리 모니터링**
- 연결당 메모리 사용량 추적
- 임계치 도달 시 알림/조치

**5. 연결 풀링 및 그룹화**
```javascript
// 채널/룸 기반 연결 관리
const rooms = new Map();

function joinRoom(ws, roomId) {
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId).add(ws);
}

function leaveRoom(ws, roomId) {
  rooms.get(roomId)?.delete(ws);
}
```

**6. OS 레벨 튜닝**
```bash
# 파일 디스크립터 제한 증가
ulimit -n 65535
# TCP 소켓 버퍼 조정
sysctl -w net.core.rmem_max=16777216
```

</details>

---

## 📌 WebSocket vs HTTP/2

### WS-016
WebSocket과 HTTP/2의 주요 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**기본 비교**

| 구분 | WebSocket | HTTP/2 |
|------|-----------|--------|
| **목적** | 양방향 실시간 통신 | HTTP 성능 개선 |
| **연결** | 단일 TCP 연결 유지 | 단일 TCP, 멀티플렉싱 |
| **통신 방향** | 전이중 (Full-Duplex) | 요청-응답 기반 |
| **서버 푸시** | 자유로운 서버→클라이언트 | 리소스 프리로드 한정 |
| **프레이밍** | WebSocket 프레임 | HTTP/2 프레임 |

**HTTP/2 특징**
- **멀티플렉싱**: 하나의 연결에서 여러 요청/응답 병렬 처리
- **헤더 압축**: HPACK으로 반복 헤더 압축
- **Server Push**: 클라이언트 요청 전에 리소스 전송 (캐시 용도)
- **스트림 우선순위**: 중요한 리소스 먼저 전송

**WebSocket 특징**
- **진정한 양방향**: 서버가 언제든 메시지 전송 가능
- **낮은 오버헤드**: 핸드셰이크 후 최소 프레임 헤더
- **애플리케이션 프로토콜 자유도**: 메시지 형식 자유 정의

**선택 기준**
- **WebSocket**: 실시간 채팅, 게임, 협업 도구 등 양방향 필수
- **HTTP/2**: 웹사이트 로딩 최적화, API 호출 (REST)

**WebSocket over HTTP/2 (RFC 8441)**
- HTTP/2 연결 위에서 WebSocket 사용 가능
- 연결 효율성 + 양방향 통신 장점 결합

**참고자료**
- [RFC 7540 - HTTP/2](https://datatracker.ietf.org/doc/html/rfc7540)[^12]
- [RFC 8441 - WebSocket over HTTP/2](https://datatracker.ietf.org/doc/html/rfc8441)[^13]

</details>

[^12]: RFC 7540 - HTTP/2 프로토콜 명세
[^13]: RFC 8441 - HTTP/2를 통한 WebSocket 부트스트래핑

---

## 📌 WebSocket 성능 최적화

### WS-017
WebSocket 연결의 성능 최적화를 위한 고려사항은 무엇인가요?

<details>
<summary>답변</summary>

**1. 메시지 최적화**

**직렬화 포맷 선택**
```javascript
// JSON (가독성) vs Binary (성능)
// Protobuf 예시
const message = MyMessage.encode({ id: 1, data: 'test' }).finish();
ws.send(message);
```

| 포맷 | 크기 | 속도 | 사용 사례 |
|------|------|------|-----------|
| JSON | 큼 | 보통 | 일반 웹앱 |
| MessagePack | 작음 | 빠름 | 모바일 앱 |
| Protobuf | 매우 작음 | 매우 빠름 | 고성능 시스템 |

**2. 메시지 배치 처리**
```javascript
// 여러 메시지를 묶어서 전송
const batch = [];
setInterval(() => {
  if (batch.length > 0) {
    ws.send(JSON.stringify(batch));
    batch.length = 0;
  }
}, 50);  // 50ms마다 배치 전송
```

**3. 압축 활용**
```javascript
// permessage-deflate 확장
const wss = new WebSocket.Server({
  perMessageDeflate: {
    threshold: 1024  // 1KB 이상만 압축
  }
});
```

**4. 연결 풀링**
- 단일 연결로 여러 채널 멀티플렉싱
- 연결 수 최소화

**5. Backpressure 처리**
```javascript
// 버퍼 상태 확인
if (ws.bufferedAmount < 1024 * 1024) {
  ws.send(data);
} else {
  // 전송 지연 또는 드롭
}
```

**6. 효율적인 브로드캐스트**
```javascript
// 비효율: 각 클라이언트마다 직렬화
clients.forEach(ws => ws.send(JSON.stringify(data)));

// 효율: 한 번 직렬화 후 전송
const payload = JSON.stringify(data);
clients.forEach(ws => ws.send(payload));
```

</details>

---

## 📌 WebSocket 장애 조치

### WS-018
WebSocket 서버 구축 시 장애 조치(failover) 방안을 어떻게 마련할 수 있나요?

<details>
<summary>답변</summary>

**1. 헬스 체크 및 자동 복구**
```nginx
# Nginx 헬스 체크
upstream websocket {
    server backend1:8080 max_fails=3 fail_timeout=30s;
    server backend2:8080 max_fails=3 fail_timeout=30s;
    server backend3:8080 backup;  # 백업 서버
}
```

**2. 클라이언트 측 재연결**
```javascript
class ReconnectingWebSocket {
  constructor(url) {
    this.servers = ['wss://server1.com', 'wss://server2.com'];
    this.currentIndex = 0;
    this.connect();
  }

  connect() {
    const url = this.servers[this.currentIndex];
    this.ws = new WebSocket(url);

    this.ws.onerror = () => {
      // 다른 서버로 failover
      this.currentIndex = (this.currentIndex + 1) % this.servers.length;
      setTimeout(() => this.connect(), 1000);
    };
  }
}
```

**3. 상태 동기화 전략**
- **Stateless 설계**: 세션 상태를 Redis 등 외부 저장소에 저장
- **이벤트 소싱**: 재연결 시 마지막 이벤트부터 재전송

```javascript
// 재연결 시 마지막 수신 이벤트 ID 전송
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'resume',
    lastEventId: localStorage.getItem('lastEventId')
  }));
};
```

**4. 서킷 브레이커**
```javascript
// 연속 실패 시 빠른 실패 처리
if (failureCount > THRESHOLD) {
  return Promise.reject('Circuit open');
}
```

**5. 다중 데이터센터**
- DNS 기반 장애 조치
- GeoDNS로 가장 가까운 서버 연결
- 데이터센터 간 메시지 동기화

</details>

---

## 📌 WebSocket 디버깅

### WS-019
클라이언트에서 WebSocket 연결 오류를 디버깅하는 방법에는 어떤 것들이 있나요?

<details>
<summary>답변</summary>

**1. 브라우저 개발자 도구**

**Network 탭**
- WS 필터로 WebSocket 연결만 필터링
- 핸드셰이크 요청/응답 헤더 확인
- Messages 탭에서 송수신 메시지 확인

**Console 로깅**
```javascript
const ws = new WebSocket('wss://example.com');

ws.onopen = () => console.log('Connected');
ws.onclose = (e) => console.log(`Closed: ${e.code} ${e.reason}`);
ws.onerror = (e) => console.error('Error:', e);
ws.onmessage = (e) => console.log('Received:', e.data);
```

**2. 이벤트 핸들러 상세 로깅**
```javascript
ws.addEventListener('close', (event) => {
  console.log({
    code: event.code,
    reason: event.reason,
    wasClean: event.wasClean
  });
});
```

**3. 상태 코드 분석**
| 코드 | 의미 | 해결 방법 |
|------|------|-----------|
| 1006 | 비정상 종료 | 네트워크/서버 문제 확인 |
| 1002 | 프로토콜 오류 | 프레임 형식 확인 |
| 1003 | 지원 안되는 데이터 | 데이터 타입 확인 |
| 1015 | TLS 실패 | 인증서 확인 |

**4. 외부 도구**
- **Wireshark**: 패킷 레벨 분석
- **wscat**: CLI WebSocket 클라이언트
  ```bash
  wscat -c wss://example.com/ws
  ```
- **Postman**: WebSocket 요청 테스트

**5. 서버 측 로깅 확인**
- 핸드셰이크 실패 원인
- Origin 검증 실패 여부
- 인증/인가 오류

**6. 일반적인 문제와 해결**
- **CORS 오류**: 서버 Origin 화이트리스트 확인
- **SSL 오류**: wss:// 사용 시 유효한 인증서 필요
- **프록시 문제**: Upgrade 헤더 전달 확인

</details>

---

## 📌 WebSocket vs SSE

### WS-020
WebSocket과 서버 푸시(Server-Sent Events)의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**기본 비교**

| 구분 | WebSocket | SSE (Server-Sent Events) |
|------|-----------|--------------------------|
| **통신 방향** | 양방향 (Full-Duplex) | 단방향 (서버→클라이언트) |
| **프로토콜** | ws:// / wss:// | HTTP/HTTPS |
| **데이터 형식** | 텍스트/바이너리 | 텍스트만 (UTF-8) |
| **재연결** | 직접 구현 | 자동 재연결 내장 |
| **브라우저 지원** | 대부분 지원 | IE 미지원 |
| **프록시 호환** | 문제 가능 | HTTP라 호환성 좋음 |

**SSE 특징**
```javascript
// 클라이언트
const eventSource = new EventSource('/events');
eventSource.onmessage = (e) => console.log(e.data);

// 서버 (Node.js)
res.setHeader('Content-Type', 'text/event-stream');
res.setHeader('Cache-Control', 'no-cache');
res.write(`data: ${JSON.stringify(data)}\n\n`);
```

**SSE 장점**
- HTTP 기반으로 구현 간단
- 자동 재연결 (`retry:` 필드)
- 이벤트 ID로 누락 메시지 복구

**WebSocket 장점**
- 클라이언트→서버 실시간 전송
- 바이너리 데이터 지원
- 낮은 오버헤드

**선택 기준**
- **SSE**: 주식 시세, 알림, 뉴스 피드 등 단방향
- **WebSocket**: 채팅, 게임, 협업 도구 등 양방향

**참고자료**
- [MDN Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)[^14]

</details>

[^14]: MDN Web Docs - Server-Sent Events API

---

## 📌 WebSocket TLS/SSL

### WS-021
TLS/SSL을 활용하여 WebSocket 연결을 보호하는 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**WSS (WebSocket Secure)**
- `wss://` 프로토콜 사용
- TLS/SSL 위에서 WebSocket 통신 암호화
- HTTPS와 동일한 보안 수준

**Node.js WSS 서버 설정**
```javascript
const https = require('https');
const WebSocket = require('ws');
const fs = require('fs');

const server = https.createServer({
  cert: fs.readFileSync('server.crt'),
  key: fs.readFileSync('server.key'),
  ca: fs.readFileSync('ca.crt')  // 선택적
});

const wss = new WebSocket.Server({ server });
server.listen(443);
```

**인증서 관리**
- **Let's Encrypt**: 무료 SSL 인증서 (90일 갱신)
- **상용 CA**: 유효 기간 긴 인증서
- **자체 서명**: 개발 환경용

**TLS 버전 설정**
```javascript
const server = https.createServer({
  minVersion: 'TLSv1.2',  // TLS 1.2 이상만 허용
  maxVersion: 'TLSv1.3'
});
```

**Nginx TLS 터미네이션**
```nginx
server {
    listen 443 ssl;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    location /ws {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

**보안 고려사항**
- 취약한 암호화 스위트 비활성화
- HSTS 헤더 설정
- 인증서 자동 갱신 설정

**참고자료**
- [RFC 6455 Section 11.1.2 - Secure WebSocket](https://datatracker.ietf.org/doc/html/rfc6455#section-11.1.2)[^15]

</details>

[^15]: RFC 6455 - WebSocket URI 보안 명세

---

## 📌 WebSocket 프록시

### WS-022
WebSocket 통신에서 프록시 서버 사용 시 발생할 수 있는 문제는 무엇인가요?

<details>
<summary>답변</summary>

**주요 문제점**

**1. HTTP Upgrade 미지원**
- 일부 프록시가 `Upgrade` 헤더를 인식하지 못함
- 101 Switching Protocols 응답 차단

**2. 연결 타임아웃**
- 프록시가 유휴 연결을 강제 종료
- 기본값이 짧은 경우 (30초~2분) 빈번한 끊김

**3. 버퍼링 문제**
- 프록시가 응답을 버퍼링하여 실시간성 저하
- 청크 전송 시 문제 발생 가능

**4. SSL 종료**
- 중간에서 SSL 종료 시 ws:// vs wss:// 혼동

**해결 방법**

**Nginx 프록시 설정**
```nginx
location /ws/ {
    proxy_pass http://backend;
    proxy_http_version 1.1;

    # Upgrade 헤더 전달 (핵심)
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    # 타임아웃 연장
    proxy_read_timeout 3600s;
    proxy_send_timeout 3600s;

    # 버퍼링 비활성화
    proxy_buffering off;

    # 헤더 전달
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

**HAProxy 설정**
```haproxy
frontend ws_front
    bind *:80
    acl is_websocket hdr(Upgrade) -i WebSocket
    use_backend ws_back if is_websocket

backend ws_back
    timeout tunnel 1h
    server ws1 backend:8080
```

**클라이언트 측 대응**
- WSS 사용 (HTTPS 포트 443 통과 용이)
- Polling 폴백 (Socket.IO 방식)
- 짧은 Ping 간격으로 연결 유지

</details>

---

## 📌 WebSocket 라이브러리

### WS-023
WebSocket 라이브러리(예: Socket.IO, ws 등)의 차이점과 선택 기준에 대해 설명해주세요.

<details>
<summary>답변</summary>

**주요 라이브러리 비교**

| 라이브러리 | 특징 | 장점 | 단점 |
|------------|------|------|------|
| **ws** | 순수 WebSocket | 경량, 빠름, 표준 준수 | 기능 최소 |
| **Socket.IO** | 기능 풍부한 추상화 | 자동 재연결, 룸, 폴백 | 무거움, 비표준 |
| **SockJS** | 폴백 지원 | 브라우저 호환성 | Socket.IO보다 가벼움 |
| **µWebSockets** | 고성능 | 매우 빠름 | C++ 바인딩 |

**ws (Node.js 표준)**
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => ws.send(data));
});
```
- 순수 WebSocket RFC 6455 구현
- 추가 기능 없음 (직접 구현 필요)

**Socket.IO**
```javascript
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.join('room1');
  socket.to('room1').emit('message', data);
});
```
- **자동 재연결**: 지수 백오프 내장
- **룸/네임스페이스**: 그룹 통신
- **폴백**: Long Polling 자동 전환
- **이벤트 기반 API**: `emit`/`on` 패턴

**선택 기준**

| 상황 | 추천 |
|------|------|
| 고성능, 최소 오버헤드 | ws, µWebSockets |
| 빠른 개발, 풍부한 기능 | Socket.IO |
| 레거시 브라우저 지원 | SockJS, Socket.IO |
| 클러스터 환경 | Socket.IO (Redis Adapter) |
| 표준 WebSocket 클라이언트 연동 | ws (Socket.IO는 호환 불가) |

**주의**: Socket.IO 클라이언트는 순수 WebSocket 서버와 호환되지 않음

**참고자료**
- [ws npm package](https://www.npmjs.com/package/ws)[^16]
- [Socket.IO Documentation](https://socket.io/docs/v4/)[^17]

</details>

[^16]: ws - Node.js WebSocket 라이브러리
[^17]: Socket.IO - 공식 문서

---

## 📌 WebSocket Pub/Sub

### WS-024
WebSocket을 활용한 Pub/Sub 시스템 구현 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Pub/Sub 패턴**
- **Publisher**: 메시지 발행자
- **Subscriber**: 메시지 구독자
- **Channel/Topic**: 메시지 분류

**기본 구현**
```javascript
const channels = new Map();  // channel -> Set<WebSocket>

function subscribe(ws, channel) {
  if (!channels.has(channel)) {
    channels.set(channel, new Set());
  }
  channels.get(channel).add(ws);
}

function unsubscribe(ws, channel) {
  channels.get(channel)?.delete(ws);
}

function publish(channel, message) {
  const subscribers = channels.get(channel);
  if (subscribers) {
    subscribers.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ channel, data: message }));
      }
    });
  }
}

// 메시지 핸들러
wss.on('connection', (ws) => {
  ws.on('message', (raw) => {
    const { type, channel, data } = JSON.parse(raw);
    switch(type) {
      case 'subscribe': subscribe(ws, channel); break;
      case 'unsubscribe': unsubscribe(ws, channel); break;
      case 'publish': publish(channel, data); break;
    }
  });

  ws.on('close', () => {
    // 모든 채널에서 제거
    channels.forEach(subs => subs.delete(ws));
  });
});
```

**Redis Pub/Sub 연동 (클러스터 환경)**
```javascript
const Redis = require('ioredis');
const pub = new Redis();
const sub = new Redis();

// Redis에서 메시지 수신 → 로컬 구독자에게 전달
sub.on('message', (channel, message) => {
  publish(channel, JSON.parse(message));
});

// 채널 구독 시 Redis도 구독
function subscribeChannel(channel) {
  sub.subscribe(channel);
}

// 발행 시 Redis로 전송
function publishToCluster(channel, data) {
  pub.publish(channel, JSON.stringify(data));
}
```

**고급 기능**
- **와일드카드 구독**: `news.*` 패턴 매칭
- **메시지 필터링**: 구독 시 조건 지정
- **메시지 히스토리**: 최근 N개 메시지 캐싱

</details>

---

## 📌 WebSocket Graceful Shutdown

### WS-025
WebSocket 연결 종료 시 graceful shutdown을 구현하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Graceful Shutdown 필요성**
- 클라이언트에게 종료 사유 전달
- 진행 중인 메시지 처리 완료
- 리소스 정리 시간 확보

**클라이언트 측 구현**
```javascript
function gracefulClose(ws, code = 1000, reason = 'Normal closure') {
  // 1. 상태 변경 알림
  ws.send(JSON.stringify({ type: 'closing' }));

  // 2. 버퍼 비우기 대기
  const checkBuffer = setInterval(() => {
    if (ws.bufferedAmount === 0) {
      clearInterval(checkBuffer);
      ws.close(code, reason);
    }
  }, 100);

  // 3. 타임아웃 강제 종료
  setTimeout(() => {
    clearInterval(checkBuffer);
    ws.close(code, reason);
  }, 5000);
}
```

**서버 측 구현**
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let isShuttingDown = false;

function gracefulShutdown() {
  isShuttingDown = true;

  // 1. 새 연결 거부
  wss.close();

  // 2. 모든 클라이언트에게 종료 알림
  wss.clients.forEach(ws => {
    ws.send(JSON.stringify({ type: 'server_shutdown' }));
    ws.close(1001, 'Server shutting down');
  });

  // 3. 연결 종료 대기
  const checkConnections = setInterval(() => {
    if (wss.clients.size === 0) {
      clearInterval(checkConnections);
      process.exit(0);
    }
  }, 100);

  // 4. 타임아웃 후 강제 종료
  setTimeout(() => {
    console.log('Force shutdown');
    process.exit(1);
  }, 30000);
}

// 시그널 핸들링
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// 새 연결 시 셧다운 상태 확인
wss.on('connection', (ws) => {
  if (isShuttingDown) {
    ws.close(1001, 'Server shutting down');
    return;
  }
  // 정상 처리
});
```

**Close Frame 교환**
1. 종료 측이 Close 프레임 전송
2. 상대방이 Close 프레임으로 응답
3. TCP 연결 종료

</details>

---

## 📌 WebSocket 버전 관리

### WS-026
WebSocket의 버전 관리 및 프로토콜 업데이트가 필요한 이유는 무엇인가요?

<details>
<summary>답변</summary>

**버전 관리의 필요성**
- API 변경 시 하위 호환성 유지
- 점진적 마이그레이션 지원
- 클라이언트-서버 불일치 방지

**프로토콜 버전 관리 방법**

**1. 핸드셰이크 시 버전 협상**
```javascript
// 클라이언트
const ws = new WebSocket('wss://example.com/ws?v=2');

// 서버
wss.on('connection', (ws, req) => {
  const version = new URL(req.url, 'http://base').searchParams.get('v');
  ws.protocolVersion = version || '1';
});
```

**2. Sec-WebSocket-Protocol 활용**
```javascript
// 클라이언트
const ws = new WebSocket('wss://example.com', ['v2', 'v1']);

// 서버
wss.on('headers', (headers, req) => {
  const protocols = req.headers['sec-websocket-protocol'];
  const supported = ['v2', 'v1'];
  const selected = protocols?.split(',')
    .map(p => p.trim())
    .find(p => supported.includes(p));
  if (selected) {
    headers.push(`Sec-WebSocket-Protocol: ${selected}`);
  }
});
```

**3. 메시지 레벨 버전**
```json
{
  "version": "2.0",
  "type": "message",
  "data": { }
}
```

**업데이트 전략**
- **Backward Compatible**: 새 필드는 optional
- **Deprecation Period**: 구버전 일정 기간 지원
- **Feature Flags**: 기능별 활성화/비활성화

**참고자료**
- [RFC 6455 Section 4.2 - Protocol Negotiation](https://datatracker.ietf.org/doc/html/rfc6455#section-4.2)[^18]

</details>

[^18]: RFC 6455 - 서브프로토콜 협상 명세

---

## 📌 WebSocket 압축

### WS-027
WebSocket 통신에서 데이터 압축 기능을 사용할 때 고려해야 할 점은 무엇인가요?

<details>
<summary>답변</summary>

**permessage-deflate 확장 (RFC 7692)**
- zlib DEFLATE 알고리즘 사용
- 메시지 단위로 압축/해제

**설정 예시**
```javascript
const wss = new WebSocket.Server({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3          // 압축 레벨 (1-9)
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    clientNoContextTakeover: true,  // 메모리 절약
    serverNoContextTakeover: true,
    serverMaxWindowBits: 10,
    concurrencyLimit: 10,
    threshold: 1024     // 1KB 이상만 압축
  }
});
```

**고려사항**

| 항목 | 고려점 |
|------|--------|
| **CPU 오버헤드** | 압축/해제에 CPU 사용, 고빈도 메시지 시 부하 |
| **메시지 크기** | 작은 메시지는 압축 효율 낮음 (오히려 증가 가능) |
| **이미 압축된 데이터** | 이미지, 동영상 등은 압축 효과 없음 |
| **메모리 사용** | Sliding window 유지에 메모리 필요 |
| **지연시간** | 압축 시간만큼 추가 지연 |

**권장 사항**
- **threshold 설정**: 일정 크기 이상만 압축
- **압축 레벨**: 1-3 (빠른 속도) vs 9 (최대 압축)
- **ContextTakeover**: false로 설정 시 메모리 절약 but 압축률 감소
- **선택적 압축**: 텍스트 데이터만 압축, 바이너리는 제외

**비활성화가 나은 경우**
- 짧은 메시지 위주
- CPU 리소스 제한적
- 이미 압축된 데이터 (Protobuf 등)

**참고자료**
- [RFC 7692 - Compression Extensions](https://datatracker.ietf.org/doc/html/rfc7692)[^19]

</details>

[^19]: RFC 7692 - WebSocket Per-Message Deflate 확장

---

## 📌 WebSocket 세션 관리

### WS-028
WebSocket 연결 시 세션 관리를 구현하는 방법에는 어떤 것들이 있나요?

<details>
<summary>답변</summary>

**세션 관리의 필요성**
- 사용자 식별
- 상태 유지 (인증, 권한)
- 재연결 시 컨텍스트 복구

**1. 연결별 세션 저장**
```javascript
const sessions = new Map();

wss.on('connection', (ws) => {
  const sessionId = generateSessionId();
  sessions.set(ws, {
    id: sessionId,
    user: null,
    createdAt: Date.now()
  });

  ws.on('close', () => {
    sessions.delete(ws);
  });
});

// 세션 조회
function getSession(ws) {
  return sessions.get(ws);
}
```

**2. 외부 저장소 연동 (Redis)**
```javascript
const Redis = require('ioredis');
const redis = new Redis();

wss.on('connection', async (ws, req) => {
  const token = getTokenFromRequest(req);
  const sessionData = await redis.get(`session:${token}`);

  if (!sessionData) {
    ws.close(4001, 'Invalid session');
    return;
  }

  ws.session = JSON.parse(sessionData);

  // 세션 TTL 연장
  await redis.expire(`session:${token}`, 3600);
});
```

**3. 쿠키 기반 세션**
```javascript
// HTTP 세션과 공유
const session = require('express-session');

wss.on('connection', (ws, req) => {
  sessionMiddleware(req, {}, () => {
    ws.session = req.session;
  });
});
```

**4. 재연결 시 세션 복구**
```javascript
wss.on('connection', (ws, req) => {
  const lastSessionId = getQueryParam(req, 'sessionId');

  if (lastSessionId && sessions.has(lastSessionId)) {
    // 기존 세션 복구
    ws.session = sessions.get(lastSessionId);
  } else {
    // 새 세션 생성
    ws.session = createNewSession();
  }
});
```

**세션 만료 처리**
```javascript
setInterval(() => {
  const now = Date.now();
  sessions.forEach((session, ws) => {
    if (now - session.lastActivity > SESSION_TIMEOUT) {
      ws.close(4002, 'Session expired');
      sessions.delete(ws);
    }
  });
}, 60000);
```

</details>

---

## 📌 WebSocket 인증/인가

### WS-029
WebSocket 서버와 클라이언트 간의 인증 및 인가 방식은 어떻게 구현하나요?

<details>
<summary>답변</summary>

**인증 타이밍**
1. **핸드셰이크 시** (권장): 연결 전 검증
2. **연결 후 첫 메시지**: 인증 전까지 제한된 동작만 허용

**1. 쿼리 파라미터 토큰**
```javascript
// 클라이언트
const ws = new WebSocket(`wss://example.com/ws?token=${jwt}`);

// 서버
wss.on('connection', (ws, req) => {
  const token = new URL(req.url, 'http://base').searchParams.get('token');
  try {
    ws.user = verifyJWT(token);
  } catch (e) {
    ws.close(4001, 'Unauthorized');
  }
});
```

**2. 핸드셰이크 헤더 (제한적)**
```javascript
// 브라우저에서 WebSocket 헤더 설정 불가
// Node.js 클라이언트에서만 가능
const ws = new WebSocket('wss://example.com', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

**3. 쿠키 기반 인증**
```javascript
// 동일 도메인에서 쿠키 자동 전송
wss.on('connection', (ws, req) => {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies['sessionId'];
  // 세션 검증
});
```

**4. 첫 메시지 인증**
```javascript
wss.on('connection', (ws) => {
  ws.isAuthenticated = false;

  ws.on('message', (data) => {
    const msg = JSON.parse(data);

    if (!ws.isAuthenticated) {
      if (msg.type === 'auth') {
        try {
          ws.user = verifyJWT(msg.token);
          ws.isAuthenticated = true;
          ws.send(JSON.stringify({ type: 'auth_success' }));
        } catch (e) {
          ws.close(4001, 'Invalid token');
        }
      }
      return;
    }

    // 인증된 사용자만 메시지 처리
    handleMessage(ws, msg);
  });

  // 인증 타임아웃
  setTimeout(() => {
    if (!ws.isAuthenticated) {
      ws.close(4002, 'Auth timeout');
    }
  }, 5000);
});
```

**인가 (Authorization)**
```javascript
function authorize(ws, action, resource) {
  const userRole = ws.user.role;
  const permissions = rolePermissions[userRole];
  return permissions.includes(`${action}:${resource}`);
}

// 메시지 처리 시
if (!authorize(ws, 'write', 'chat')) {
  ws.send(JSON.stringify({ error: 'Forbidden' }));
  return;
}
```

</details>

---

## 📌 WebSocket 문제 해결

### WS-030
WebSocket 기반 애플리케이션에서 발생할 수 있는 일반적인 문제와 해결 방안은 무엇인가요?

<details>
<summary>답변</summary>

**1. 연결 끊김 (Connection Drop)**
| 원인 | 해결 |
|------|------|
| 네트워크 불안정 | 자동 재연결 + Exponential Backoff |
| 프록시/방화벽 타임아웃 | Ping/Pong Heartbeat |
| 서버 재시작 | Graceful shutdown + 클라이언트 재연결 |

**2. 메시지 유실**
```javascript
// 메시지 확인 응답 (ACK)
ws.send(JSON.stringify({ id: msgId, data }));

// ACK 수신 시 pending에서 제거
ws.on('message', (raw) => {
  const { type, ackId } = JSON.parse(raw);
  if (type === 'ack') {
    pendingMessages.delete(ackId);
  }
});

// 재전송 로직
setInterval(() => {
  pendingMessages.forEach((msg, id) => {
    if (Date.now() - msg.sentAt > RETRY_TIMEOUT) {
      ws.send(JSON.stringify(msg.data));
      msg.sentAt = Date.now();
    }
  });
}, 1000);
```

**3. 메모리 누수**
- 이벤트 리스너 해제 누락
- 연결 종료 시 정리
```javascript
ws.on('close', () => {
  clearInterval(ws.pingInterval);
  ws.removeAllListeners();
  sessions.delete(ws);
});
```

**4. 순서 보장 문제**
```javascript
// 메시지 시퀀스 번호
let sequence = 0;
const buffer = new Map();

ws.on('message', (raw) => {
  const { seq, data } = JSON.parse(raw);
  buffer.set(seq, data);

  // 순서대로 처리
  while (buffer.has(sequence)) {
    processMessage(buffer.get(sequence));
    buffer.delete(sequence);
    sequence++;
  }
});
```

**5. 대량 연결 처리**
- OS 파일 디스크립터 제한 증가
- Connection 풀링
- 로드밸런서 도입

**6. 브라우저 호환성**
- 폴백 메커니즘 (Long Polling)
- Socket.IO 등 라이브러리 활용

**7. 디버깅 어려움**
- 구조화된 로깅
- 연결 ID 추적
- 메시지 샘플링 기록

**모니터링 지표**
- 동시 연결 수
- 메시지 처리량 (msg/sec)
- 평균 지연시간
- 에러율

</details>
