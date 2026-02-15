# Java/Spring 기술 면접 준비

> 출처: [fru1tworld/cs-basic](https://github.com/fru1tworld/cs-basic)
> Java/Spring 개발자 관점으로 우선순위 재편성

---

## P1 - 핵심 (반드시 준비)

> Java/Spring 면접에서 거의 확실히 나오는 주제

| 주제 | 내용 | 문항 |
|------|------|------|
| [[Etc/pl\|Java]] | JVM, GC, 메모리 구조, Collection, 동시성, Stream, 리플렉션 | pl.md 내 Java 섹션 |
| [[Framework/spring\|Spring / Spring Boot]] | IoC, DI, AOP, JPA, N+1, @Transactional, Security | 51문항 |
| [[CS기초/db\|데이터베이스]] | RDB/NoSQL, 트랜잭션, ACID, 인덱스, B+Tree, 정규화, 락 | 70문항 |
| [[CS기초/network\|네트워크]] | HTTP/HTTPS, TCP/UDP, OSI 7계층, DNS, 핸드셰이크, CORS | 104문항 |
| [[CS기초/os\|운영체제]] | 프로세스, 스레드, 스케줄링, 동기화, 데드락, 가상메모리 | 122문항 |
| [[CS기초/ds\|자료구조]] | 스택, 큐, 해시, 트리, 힙, 그래프, 정렬, MST | 63문항 |

---

## P2 - 중요 (실무 & 심화 면접)

> 중급 이상 면접에서 자주 등장하며, 실무에서 직접 다루는 주제

| 주제 | 내용 | 문항 |
|------|------|------|
| [[CS기초/etc\|개발 상식]] | OOP, SOLID, 디자인 패턴, GC, 인증/인가, JWT, MVC | 60문항 |
| [[CS기초/architecture\|컴퓨터 구조]] | CPU, 파이프라이닝, 메모리 계층, 캐시, 가상메모리 | 60문항 |
| [[Database/redis\|Redis]] | 데이터 타입, Persistence, Pub/Sub, Cluster, 캐시 전략 | 30문항 |
| [[Messaging/kafka\|Kafka]] | Producer, Consumer, Partition, Exactly-Once, Streams | 50문항 |
| [[Etc/system_design\|시스템 설계]] | EDA, SAGA, CQRS, 샤딩, CAP, 레플리케이션, MSA | 95문항 |
| [[Infrastructure/docker\|Docker]] | 컨테이너, 이미지, Dockerfile, Compose, 네트워크 | 100문항 |

---

## P3 - 보조 (알면 좋은 것)

> 특정 프로젝트 경험이 있거나, 시니어급 면접에서 나올 수 있는 주제

| 주제 | 내용 | 문항 |
|------|------|------|
| [[Database/elasticsearch\|Elasticsearch]] | Shard, Replica, Query DSL, Aggregation, 성능 튜닝 | 50문항 |
| [[Database/mongodb\|MongoDB]] | 문서 지향 DB, Aggregation, Sharding, Transaction | 80문항 |
| [[Infrastructure/kubernetes\|Kubernetes]] | Pod, Deployment, Service, Ingress, RBAC, HPA | 140문항 |
| [[Messaging/debezium\|Debezium (CDC)]] | CDC 개념, binlog, Kafka Connect, 데이터 일관성 | 30문항 |
| [[Etc/websocket\|WebSocket]] | Handshake, 메시지 프레이밍, 재연결, 부하 분산 | 30문항 |

---

## P4 - 참고 (Java/Spring 외 기술)

> 직접적으로 Java/Spring 면접 범위는 아니지만, 기존 문제 보존 목적으로 유지

| 주제 | 내용 | 문항 |
|------|------|------|
| [[Etc/pl\|JavaScript / TypeScript]] | 실행 컨텍스트, 클로저, Promise, async/await, 타입 시스템 | pl.md 내 JS/TS 섹션 |
| [[Etc/pl\|Python]] | GIL, 메모리 관리, 데코레이터, 제너레이터, Asyncio | pl.md 내 Python 섹션 |
| [[Etc/pl\|Go]] | 고루틴, 채널, 인터페이스, defer/panic/recover | pl.md 내 Go 섹션 |
| [[Framework/nest\|NestJS]] | 모듈 시스템, DI, Middleware, Guard, Interceptor | 30문항 |
| [[Framework/ktor\|Ktor]] | Kotlin Coroutine 기반 비동기 웹 프레임워크, 플러그인 | 38문항 |
| [[Etc/crdt\|CRDT]] | 분산 환경 동기화, Yjs, CRDT vs OT | 30문항 |

---

## 학습 현황

### P1 - 핵심
- [ ] Java (pl.md)
- [ ] Framework/Spring
- [ ] CS기초/데이터베이스
- [ ] CS기초/네트워크
- [ ] CS기초/운영체제
- [ ] CS기초/자료구조

### P2 - 중요
- [ ] CS기초/개발 상식
- [ ] CS기초/컴퓨터 구조
- [ ] Database/Redis
- [ ] Messaging/Kafka
- [ ] Etc/시스템 설계
- [ ] Infrastructure/Docker

### P3 - 보조
- [ ] Database/Elasticsearch
- [ ] Database/MongoDB
- [ ] Infrastructure/Kubernetes
- [ ] Messaging/Debezium
- [ ] Etc/WebSocket

### P4 - 참고
- [ ] JavaScript/TypeScript (pl.md)
- [ ] Python (pl.md)
- [ ] Go (pl.md)
- [ ] Framework/NestJS
- [ ] Framework/Ktor
- [ ] Etc/CRDT
