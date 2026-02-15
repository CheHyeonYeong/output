# CS 모의 면접 질문 목록

> 출처: fru1tworld/cs-basic
> Java/Spring 개발자 관점으로 우선순위 재편성

---

## P1 - 핵심 (반드시 준비)

> Java/Spring 면접에서 거의 확실히 나오는 주제

### Java

[Java 질문 보기](./etc/pl.md) (pl.md 내 Java 섹션)

- JVM, GC, 메모리 구조
- Collection Framework
- 동기화, Thread, Executor
- Stream API, Optional
- 리플렉션, Annotation

### Spring / Spring Boot

[Spring 질문 보기](./framework/spring.md)

- IoC, DI, Bean 생성 주기
- AOP, Interceptor, Filter
- DispatcherServlet, @Transactional
- JPA, N+1 문제
- Spring Security, Spring Cloud

### 데이터베이스 (Database)

[데이터베이스 질문 보기](./cs/db.md)

- Key, RDB vs NoSQL
- 트랜잭션, ACID, 격리 레벨
- 인덱스, B-Tree/B+Tree
- JOIN, 정규화
- 락(Lock), 레플리케이션, 샤딩

### 네트워크 (Network)

[네트워크 질문 보기](./cs/network.md)

- HTTP/HTTPS, 쿠키/세션
- TCP/UDP, OSI 7계층
- DNS, DHCP, IP 주소
- 3-Way/4-Way Handshake
- 로드밸런서, CORS, SOP

### 운영체제 (Operating System)

[운영체제 질문 보기](./cs/os.md)

- 시스템 콜, 인터럽트
- 프로세스, 스레드, PCB
- CPU 스케줄링, 컨텍스트 스위칭
- 동기화, 뮤텍스, 세마포어, Deadlock
- 가상 메모리, 페이징, TLB
- 캐시 메모리, 파일 시스템

### 자료구조 (Data Structure)

[자료구조 질문 보기](./cs/ds.md)

- 스택, 큐, 해시, 트리, 힙, 그래프
- 정렬 알고리즘
- MST, Thread Safe
- 이진탐색, 그리디, 동적계획법

---

## P2 - 중요 (실무 & 심화 면접)

> 중급 이상 면접에서 자주 등장하며, 실무에서 직접 다루는 주제

### 개발 상식 및 기타

[개발 상식 및 기타 질문 보기](./cs/etc.md)

- 객체지향, SOLID, 디자인 패턴
- 함수형 프로그래밍, 순수함수
- MVC 패턴, GC
- 인증/인가, OAuth, JWT
- Git, 암호화, 인코딩

### 컴퓨터 구조 (Computer Architecture)

[컴퓨터 구조 질문 보기](./cs/architecture.md)

- CPU 구조, 파이프라이닝
- 메모리 계층, 캐시 메모리
- 가상 메모리, TLB
- 멀티코어, 병렬 처리
- I/O 시스템, 성능 최적화

### Redis

[Redis 질문 보기](./database/redis.md)

- 데이터 타입, Persistence (RDB, AOF)
- Pub/Sub, 트랜잭션
- Redis Cluster, Sentinel
- 캐시 전략, Eviction 정책

### Kafka

[Kafka 질문 보기](./messaging/kafka.md)

- 아키텍처, Producer, Consumer, Broker
- Partition, Offset, Consumer Group
- 리플리케이션, ISR
- Exactly-Once Semantics
- Kafka Streams, Kafka Connect
- 성능 튜닝, 모니터링

### 시스템 설계 (System Design)

[시스템 설계 질문 보기](./etc/system_design.md)

- 이벤트, 메시지, EDA
- 분산 트랜잭션, SAGA, 이벤트 소싱
- CQRS
- 데이터베이스 샤딩
- CAP 이론, Consensus
- 레플리케이션, 리더십
- MSA, API 게이트웨이, 서비스 메시

### Docker

[Docker 질문 보기](./infrastructure/docker.md)

- 컨테이너 vs VM, 이미지, 레이어
- Dockerfile, 멀티스테이지 빌드, 최적화
- Docker 네트워크 (bridge, host, overlay)
- Docker Compose, 서비스 정의
- CI/CD 연동

---

## P3 - 보조 (알면 좋은 것)

> 특정 프로젝트 경험이 있거나, 시니어급 면접에서 나올 수 있는 주제

### Elasticsearch

[Elasticsearch 질문 보기](./database/elasticsearch.md)

- 아키텍처, Shard, Replica
- Query DSL, Aggregation
- Mapping, Analyzer
- 인덱스 관리, ILM
- 성능 튜닝

### MongoDB

[MongoDB 질문 보기](./database/mongodb.md)

- NoSQL vs SQL, 문서 지향 데이터베이스
- BSON, Collection, Document
- Aggregation Pipeline
- Replication, Sharding
- Transaction, ACID

### Kubernetes

[Kubernetes 질문 보기](./infrastructure/kubernetes.md)

- 아키텍처, Control Plane, Node 컴포넌트
- Pod, Deployment, StatefulSet, DaemonSet
- Service, Ingress, 네트워킹
- RBAC, NetworkPolicy, 보안
- Helm, Operator, CRD

### CDC (Debezium)

[CDC/Debezium 질문 보기](./messaging/debezium.md)

- CDC 개념, Debezium 작동 원리
- MySQL binlog, 스키마 변경
- Kafka Connect 연동
- 데이터 일관성, 장애 복구

### WebSocket

[WebSocket 질문 보기](./etc/websocket.md)

- WebSocket vs HTTP
- Handshake, 메시지 프레이밍
- Ping/Pong, 재연결
- 보안, 부하 분산

---

## P4 - 참고 (Java/Spring 외 기술)

> 직접적으로 Java/Spring 면접 범위는 아니지만, 문제 보존 목적으로 유지

### JavaScript / TypeScript

[프로그래밍 언어 질문 보기](./etc/pl.md) (pl.md 내 JS/TS 섹션)

- 실행 컨텍스트, 클로저, this
- Promise, async/await, Event Loop
- TypeScript 타입 시스템
- 제네릭, 유틸리티 타입

### Python

[프로그래밍 언어 질문 보기](./etc/pl.md) (pl.md 내 Python 섹션)

- GIL, 메모리 관리
- 데코레이터, 제너레이터
- 동시성 처리 (Threading, Multiprocessing, Asyncio)

### Go

[프로그래밍 언어 질문 보기](./etc/pl.md) (pl.md 내 Go 섹션)

- 고루틴, 채널
- 인터페이스, 슬라이스
- defer, panic, recover

### NestJS

[NestJS 질문 보기](./framework/nest.md)

- 모듈 시스템, Dependency Injection
- Controller, Service, Provider
- Middleware, Interceptor, Guard, Pipe
- Exception Filter

### Ktor

[Ktor 질문 보기](./framework/ktor.md)

- 경량 비동기 웹 프레임워크
- Kotlin Coroutine 기반
- 플러그인 시스템
- 라우팅, 인증, 직렬화

### CRDT (Yjs)

[CRDT 질문 보기](./etc/crdt.md)

- CRDT 개념, Yjs
- 분산 환경 동기화
- CRDT vs OT
- Awareness, Delta 업데이트

---

[README로 돌아가기](./README.md)
