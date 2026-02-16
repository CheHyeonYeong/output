# System Design (시스템 설계)

> 카테고리: 시스템 설계
> [← 면접 질문 목록으로 돌아가기](../interview.md)

---

## 📌 이벤트, 메시지, 그리고 EDA (Event-Driven Architecture)

### SD-001

메시지(Message)와 이벤트(Event)의 근본적인 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**메시지**는 특정 수신자에게 전달되는 데이터로, 발신자가 수신자를 알고 직접 통신합니다. **이벤트**는 시스템에서 발생한 사실이며, 발신자는 누가 구독하는지 모릅니다.

- **메시지**: Point-to-Point, 수신자 지정, 명령(Command) 성격
- **이벤트**: Publish-Subscribe, 수신자 미지정, 사실(Fact) 성격

**참고자료**
- [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/patterns/messaging/)[^1]

</details>

[^1]: 메시지 기반 통합 패턴 표준 참고서

### SD-002
분산 시스템에서 메시지(Message)와 이벤트(Event)를 비교할 때, "메시지는 '지시(Command)'이고 이벤트는 '사실(Fact)'이다"라는 말의 의미를 설명해 보세요.

<details>
<summary>답변</summary>

**Command**: "이것을 해라"라는 지시. 실패/거부 가능. 예: `CreateOrder`

**Event**: "이것이 일어났다"라는 과거 사실. 불변. 예: `OrderCreated`

이 구분은 시스템의 결합도와 책임 분리에 영향을 줍니다.

**참고자료**
- [Microsoft EDA](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven)[^2]

</details>

[^2]: Microsoft Azure 아키텍처 가이드

### SD-003
메시지 큐(RabbitMQ, SQS)와 이벤트 브로커/스트림(Kafka)의 차이점은 무엇이며, 어떤 상황에서 각각을 선택해야 할까요?

<details>
<summary>답변</summary>

**메시지 큐 (RabbitMQ, SQS)**:
- 작업 분배, Point-to-Point, 소비 후 삭제
- 적합: 작업 큐, 비동기 태스크 처리

**이벤트 스트림 (Kafka)**:
- 다중 구독자, 이벤트 재처리(replay), 순서 보장, 로그 보존
- 적합: 이벤트 소싱, 실시간 스트리밍, 감사 로그

**트레이드오프**:
| 기준 | 메시지 큐 | 이벤트 스트림 |
|------|-----------|---------------|
| 재처리 | 어려움 | 용이 (오프셋 리셋) |
| 운영 복잡도 | 낮음 | 높음 |
| 확장성 | 수직 위주 | 수평 확장 용이 |
| 순서 보장 | 제한적 | 파티션 내 보장 |

**참고자료**
- [Kafka Documentation](https://kafka.apache.org/documentation/)[^3]

</details>

[^3]: Apache Kafka 공식 문서

### SD-004
이벤트 기반 시스템에서 '발신자(Publisher)'가 '수신자(Subscriber)'를 모르는 느슨한 결합이 시스템 설계에 주는 이점과 단점은 무엇인가요?

<details>
<summary>답변</summary>

**이점**:
- 느슨한 결합: 서비스 독립적 배포 가능
- 확장성 향상: 구독자 추가/제거가 발신자에 영향 없음
- 유연성: 새로운 기능을 기존 코드 수정 없이 추가

**단점**:
- 디버깅 어려움: 분산 트레이싱 필요 (Jaeger, Zipkin)
- 이벤트 흐름 추적 복잡: 이벤트 카탈로그/문서화 필요
- 최종 일관성: 강한 일관성 필요 시 부적합
- 이벤트 순서 보장 어려움

**대규모 시스템 고려사항**:
- Dead Letter Queue로 이벤트 유실 방지
- 멱등성 보장으로 중복 처리 대응
- 모니터링 및 알람 체계 구축

**참고자료**
- [Microsoft EDA Guide](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven)[^4]

</details>

[^4]: Azure EDA 가이드

### SD-005

이벤트 드리븐 아키텍처(EDA)란 무엇이며, 기존의 요청-응답(Request-Response) 모델과 무엇이 다른가요?

<details>
<summary>답변</summary>

**EDA**: 이벤트 발생 시 반응하는 비동기 아키텍처. 서비스들이 이벤트를 발행/구독.

**Request-Response**: 동기식. 호출자가 응답을 기다림. 강한 결합.

**차이점**: EDA는 비동기, 느슨한 결합, 확장성 우수. Request-Response는 즉각적 응답, 단순한 흐름.

**참고자료**
- [AWS Event-Driven Architecture](https://aws.amazon.com/event-driven-architecture/)[^5]

</details>

[^5]: AWS EDA 가이드

### SD-006
이벤트 드리븐 아키텍처(EDA)를 도입했을 때 얻을 수 있는 가장 큰 장점 3가지와 가장 큰 단점 3가지는 무엇인가요?

<details>
<summary>답변</summary>

**장점**:
1. 느슨한 결합 - 서비스 독립성
2. 확장성 - 이벤트 기반 스케일링
3. 실시간 반응 - 즉각적인 이벤트 처리

**단점**:
1. 복잡성 - 이벤트 흐름 추적 어려움
2. 최종 일관성 - 강한 일관성 보장 어려움
3. 디버깅 - 분산 트레이싱 필요

**참고자료**
- [Martin Fowler - Event-Driven](https://martinfowler.com/articles/201701-event-driven.html)[^6]

</details>

[^6]: Martin Fowler 이벤트 드리븐 아키텍처

### SD-007
EDA에서 서비스 간의 데이터 흐름을 관리하는 두 가지 방식인 Choreography(분산적 이벤트 반응)와 Orchestration(중앙 제어)을 비교 설명해 주세요.

<details>
<summary>답변</summary>

**Choreography**: 각 서비스가 이벤트에 반응하여 독립적으로 동작. 중앙 제어 없음. 분산적.

**Orchestration**: 중앙 오케스트레이터가 전체 흐름을 제어. 명시적인 워크플로우.

| 비교 | Choreography | Orchestration |
|------|--------------|---------------|
| 결합도 | 낮음 | 높음 |
| 가시성 | 낮음 | 높음 |
| 복잡도 | 서비스 증가시 복잡 | 오케스트레이터에 집중 |

**참고자료**
- [Microservices.io - Saga](https://microservices.io/patterns/data/saga.html)[^7]

</details>

[^7]: Microservices.io SAGA 패턴

### SD-008
이벤트 브로커(예: Kafka, RabbitMQ)가 다운되면 전체 시스템이 마비될 수 있습니다. 이 SPOF(Single Point of Failure) 문제를 어떻게 해결할 수 있을까요?

<details>
<summary>답변</summary>

1. **클러스터링**: 다중 브로커 노드 구성 (Kafka 클러스터)
2. **레플리케이션**: 파티션 복제 (replication factor)
3. **다중 데이터센터**: 지역 간 복제
4. **Circuit Breaker**: 장애 시 폴백 처리

**참고자료**
- [Kafka Replication](https://kafka.apache.org/documentation/#replication)[^8]

</details>

[^8]: Kafka 레플리케이션 문서

### SD-009

메시지/이벤트 전송 보장 레벨인 'At-least-once', 'At-most-once', 'Exactly-once'의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**At-most-once**:
- 최대 한 번 전송. 유실 가능, 중복 없음
- 구현: ACK 없이 전송 (fire-and-forget)
- 적합: 메트릭, 로그 등 유실 허용 가능한 경우

**At-least-once** (가장 일반적):
- 최소 한 번 전송. 유실 없음, 중복 가능
- 구현: 전송 후 ACK 대기, 실패 시 재전송
- 적합: 멱등한 처리가 가능한 대부분의 경우

**Exactly-once**:
- 정확히 한 번. 유실/중복 없음
- 주의: **진정한 Exactly-once는 분산 시스템에서 이론적으로 불가능**
- 실제 구현: At-least-once + 멱등성 = "Effectively Once"

**트레이드오프**:
| 보장 수준 | 성능 | 복잡도 | 데이터 정확성 |
|-----------|------|--------|---------------|
| At-most-once | 높음 | 낮음 | 낮음 |
| At-least-once | 중간 | 중간 | 높음 (멱등성 필요) |
| Exactly-once | 낮음 | 높음 | 최고 |

**참고자료**
- [Kafka Semantics](https://kafka.apache.org/documentation/#semantics)[^9]

</details>

[^9]: Kafka 메시지 전달 시맨틱스

### SD-010
EDA에서 At-least-once와 달리 'Exactly-once'를 구현하기 어려운 이유는 무엇이며, 이를 위해 어떤 기술(예: Idempotency)이 필요한가요?

<details>
<summary>답변</summary>

**어려운 이유** (Two Generals' Problem):
- 네트워크 장애로 ACK 유실 시 송신자는 수신 여부 알 수 없음
- 프로세스 크래시 시 처리 완료 여부 불명확
- 분산 환경에서 "정확히 한 번" 자체의 정의가 모호

**핵심 통찰**:
진정한 Exactly-once는 불가능. 실제로는 **At-least-once + 멱등성 = "Effectively Once"**로 구현

**해결 기술**:
1. **Idempotency**: 동일 요청을 여러 번 처리해도 같은 결과
2. **Deduplication**: 메시지 ID로 중복 체크 (TTL 고려 필요)
3. **Transactional Outbox**: DB와 이벤트 발행을 원자적으로 처리

**함정 주의**:
Kafka의 "Exactly-once"는 **Kafka 내부 처리**에만 해당. 외부 시스템(DB, API 등)과 연동 시 여전히 멱등성 필수

**참고자료**
- [Kafka Exactly-Once](https://www.confluent.io/blog/exactly-once-semantics-are-possible-heres-how-apache-kafka-does-it/)[^10]

</details>

[^10]: Confluent Exactly-Once 시맨틱스

### SD-011

이벤트 스키마(Event Schema) 관리는 왜 중요한가요? 스키마가 변경될 때 하위 호환성을 어떻게 보장할 수 있을까요?

<details>
<summary>답변</summary>

**중요성**: 프로듀서/컨슈머 간 계약. 스키마 불일치 시 파싱 오류.

**하위 호환성 보장**:
1. 새 필드는 optional/default 값 지정
2. 기존 필드 삭제 금지
3. Schema Registry 사용 (Avro, Protobuf)
4. 버전 관리

**참고자료**
- [Confluent Schema Registry](https://docs.confluent.io/platform/current/schema-registry/)[^11]

</details>

[^11]: Confluent Schema Registry 문서

### SD-012

이벤트가 불변성(Immutability)을 가져야 하는 이유는 무엇인가요?

<details>
<summary>답변</summary>

1. **신뢰성**: 이미 발생한 사실은 변경 불가
2. **재처리**: 이벤트 replay 시 일관된 결과
3. **감사 로그**: 완전한 히스토리 보존
4. **동시성**: 불변 데이터는 락 불필요

**참고자료**
- [Event Sourcing - Martin Fowler](https://martinfowler.com/eaaDev/EventSourcing.html)[^12]

</details>

[^12]: Martin Fowler Event Sourcing

### SD-013
이벤트 소싱이나 EDA에서 이벤트는 불변(immutable)해야 한다는 원칙이 있습니다. 이 불변성 원칙을 지키면서, 과거에 발생한 이벤트 데이터의 오류를 어떻게 수정(또는 보정)해야 할까요?

<details>
<summary>답변</summary>

**보정 이벤트(Compensating Event)** 발행:
- 기존 이벤트는 그대로 유지
- 새로운 "수정" 이벤트 발행 (예: `OrderAmountCorrected`)
- 현재 상태는 모든 이벤트 적용 결과로 계산

**참고자료**
- [Event Sourcing Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)[^13]

</details>

[^13]: Microsoft Event Sourcing 패턴

---

## 📌 분산 트랜잭션, SAGA, 그리고 이벤트 소싱

### SD-014

분산 트랜잭션(Distributed Transaction)이 무엇인지, 그리고 왜 필요한지 설명해 주세요.

<details>
<summary>답변</summary>

**정의**: 여러 서비스/DB에 걸친 트랜잭션을 원자적으로 처리하는 것

**필요성**: MSA에서 하나의 비즈니스 로직이 여러 서비스에 분산되어 있을 때, 전체의 일관성을 보장하기 위해 필요

**참고자료**
- [Microservices.io - Distributed Transactions](https://microservices.io/patterns/data/saga.html)[^14]

</details>

[^14]: Microservices.io 분산 트랜잭션

### SD-015
분산 트랜잭션의 전통적인 해결 방법인 2PC(Two-Phase Commit) 프로토콜에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Phase 1 (Prepare)**: 코디네이터가 모든 참여자에게 커밋 준비 요청. 참여자는 준비 완료/실패 응답.

**Phase 2 (Commit/Rollback)**: 모두 준비 완료 시 커밋, 하나라도 실패 시 전체 롤백

**참고자료**
- [2PC Wikipedia](https://en.wikipedia.org/wiki/Two-phase_commit_protocol)[^15]

</details>

[^15]: Two-Phase Commit Protocol

### SD-016
2PC(Two-Phase Commit)의 가장 큰 단점(예: 코디네이터 장애, 블로킹)은 무엇이며, 이 때문에 실제 환경에서 잘 사용되지 않는 이유는 무엇인가요?

<details>
<summary>답변</summary>

**단점**:
1. **블로킹**: Prepare 후 Commit 전까지 참여자가 락 유지 (자원 점유)
2. **SPOF**: 코디네이터 장애 시 참여자가 무한 대기 (In-doubt 상태)
3. **성능**: 동기식 통신 + 여러 번의 네트워크 왕복으로 지연
4. **확장성 제한**: 참여자 증가 시 성능 저하

**실제 환경에서 잘 사용되지 않는 이유**:
- MSA 환경에서 서비스 간 강한 결합 유발
- 클라우드 네이티브 환경의 일시적 장애에 취약
- 네트워크 파티션 발생 시 복구 어려움

**사용되는 경우**:
- 동일 DB 내 XA 트랜잭션 (MySQL, PostgreSQL)
- 단일 데이터센터의 신뢰할 수 있는 내부 시스템

**대안**: SAGA, TCC (Try-Confirm-Cancel), Outbox 패턴

**참고자료**
- [Designing Data-Intensive Applications](https://dataintensive.net/)[^16]

</details>

[^16]: Martin Kleppmann - DDIA

### SD-017
2PC의 블로킹 문제를 해결하기 위한 대안으로 등장한 SAGA 패턴이 무엇인지, 그리고 2PC와 어떻게 다른지 설명해 주세요.

<details>
<summary>답변</summary>

**SAGA**: 로컬 트랜잭션의 시퀀스. 각 단계 실패 시 보상 트랜잭션으로 롤백.

**2PC와의 차이**:
| 비교 | 2PC | SAGA |
|------|-----|------|
| 일관성 | 강한 일관성 | 최종 일관성 |
| 락 | 글로벌 락 | 로컬 락 |
| 가용성 | 낮음 | 높음 |

**참고자료**
- [Microservices.io - Saga](https://microservices.io/patterns/data/saga.html)[^17]

</details>

[^17]: Microservices.io SAGA

### SD-018
SAGA 패턴의 핵심 구성요소인 '보상 트랜잭션(Compensating Transaction)'이란 무엇이며, 이를 설계할 때 가장 중요하게 고려해야 할 점은 무엇인가요?

<details>
<summary>답변</summary>

**정의**: 이전 트랜잭션의 효과를 **의미적으로** 취소하는 트랜잭션

**핵심 이해**: 보상 트랜잭션은 물리적 롤백이 아님
- 결제 취소 = 환불 처리 (새로운 트랜잭션)
- 재고 차감 취소 = 재고 복구 (새로운 트랜잭션)

**설계 고려사항**:
1. **멱등성 필수**: 보상 트랜잭션도 재시도될 수 있음
2. **의미적 가역성**: 취소 불가능한 작업은 별도 설계 (예: 이메일 발송 → 취소 이메일 발송)
3. **역순 실행**: 마지막 성공 단계부터 역순으로
4. **타임아웃**: 보상 트랜잭션에도 타임아웃 설정

**함정 주의**:
- 외부 시스템(결제 게이트웨이, SMS 등)의 보상은 별도 설계 필요
- 보상 실패 시 수동 개입 프로세스 필수

**참고자료**
- [AWS SAGA Pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-data-persistence/saga-pattern.html)[^18]

</details>

[^18]: AWS SAGA 패턴 가이드

### SD-019
SAGA 패턴에서 보상 트랜잭션(Compensating Transaction) 자체가 실패하면 어떻게 해야 하나요?

<details>
<summary>답변</summary>

**단계적 접근** (권장 순서):

1. **재시도 (Retry)**:
   - 지수 백오프(exponential backoff) + 지터(jitter)
   - 최대 재시도 횟수 제한 (예: 5회)

2. **Dead Letter Queue (DLQ)**:
   - 재시도 실패한 보상 작업 저장
   - 분석을 위한 충분한 컨텍스트 포함

3. **수동 개입 (Human Intervention)**:
   - 운영자 알림 (PagerDuty, Slack 등)
   - 관리자 대시보드를 통한 수동 처리

4. **Forward Recovery** (고급):
   - 롤백 대신 앞으로 진행하여 일관성 복구
   - 예: 재고 복구 실패 → 다음 입고 시 자동 조정

**대규모 시스템 고려사항**:
- SAGA 상태 영구 저장 (장애 복구용)
- 보상 실패율 모니터링 및 알람

**참고자료**
- [Microservices Patterns - Chris Richardson](https://microservices.io/book)[^19]

</details>

[^19]: Microservices Patterns 책

### SD-020

SAGA 패턴에서 발생하는 '중간 상태(intermediate state)'란 무엇을 의미하나요?

<details>
<summary>답변</summary>

**정의**: SAGA 진행 중 일부 서비스는 커밋되고 일부는 아직 처리 중인 상태

**예시**: 주문 서비스는 주문 생성 완료, 결제 서비스는 아직 처리 중

**특징**: 외부에서 볼 때 일관성이 깨진 것처럼 보임

**참고자료**
- [SAGA Pattern](https://microservices.io/patterns/data/saga.html)[^20]

</details>

[^20]: SAGA 중간 상태

### SD-021
SAGA 패턴의 '중간 상태(Pending State)'가 비즈니스 로직이나 사용자 경험(UX)에 어떤 문제를 일으킬 수 있으며, 이를 어떻게 처리해야 할까요?

<details>
<summary>답변</summary>

**문제**:
- 사용자 혼란 (주문은 됐는데 결제 상태 불명)
- 잘못된 데이터 조회

**해결책**:
1. **상태 표시**: "처리 중" 상태 명시
2. **Semantic Lock**: 리소스를 "예약" 상태로 표시
3. **읽기 격리**: 완료된 SAGA만 조회 가능

**참고자료**
- [Chris Richardson - Managing Data Consistency](https://chrisrichardson.net/post/microservices/2019/07/09/developing-sagas-part-1.html)[^21]

</details>

[^21]: Chris Richardson SAGA 시리즈

### SD-022
SAGA 패턴을 구현하는 두 가지 방식인 'Choreography(이벤트 기반 분산)'와 'Orchestration(중앙 조율자)'을 비교 설명하고, 각각의 장단점을 논해주세요.

<details>
<summary>답변</summary>

**Choreography** (분산 이벤트 기반):
- 각 서비스가 이벤트를 발행하고 다른 서비스의 이벤트에 반응
- 중앙 조율자 없음, 자율적 협력

**Orchestration** (중앙 조율자 기반):
- 중앙 오케스트레이터가 SAGA 전체 흐름 제어
- 순차적/병렬 호출, 결과에 따라 다음 단계 결정

| 비교 | Choreography | Orchestration |
|------|--------------|---------------|
| **장점** | 느슨한 결합, 단순한 서비스 | 명확한 흐름, 디버깅 용이 |
| **단점** | 흐름 파악 어려움, 순환 의존성 위험 | 오케스트레이터 복잡도 증가 |
| **확장** | 새 서비스 추가 용이 | 오케스트레이터 수정 필요 |
| **테스트** | 통합 테스트 어려움 | 단위 테스트 용이 |
| **적합** | 2-4단계 단순 흐름 | 5단계 이상, 조건부 분기 |

**실무 권장**:
- 시작은 Choreography로 단순하게
- 복잡해지면 Orchestration으로 전환 고려
- 도메인별로 하이브리드 적용 가능

**참고자료**
- [Microservices.io - SAGA](https://microservices.io/patterns/data/saga.html)[^22]

</details>

[^22]: SAGA Choreography vs Orchestration

### SD-023

이벤트 소싱(Event Sourcing) 패턴이 무엇인지 설명해 주세요.

<details>
<summary>답변</summary>

**정의**: 상태를 직접 저장하지 않고, 상태 변경 이벤트를 순서대로 저장하는 패턴

**특징**:
- 모든 변경 히스토리 보존
- 현재 상태 = 이벤트 순차 적용 결과
- 감사 로그 자동 생성

**참고자료**
- [Martin Fowler - Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)[^23]

</details>

[^23]: Martin Fowler Event Sourcing

### SD-024
이벤트 소싱(Event Sourcing)에서 저장된 이벤트 스트림으로부터 '현재 상태(Current State)'는 어떻게 계산하나요?

<details>
<summary>답변</summary>

**방법**: 해당 엔티티의 모든 이벤트를 처음부터 순서대로 재생(replay)하여 현재 상태 계산

```
초기상태 + Event1 + Event2 + ... + EventN = 현재상태
```

**최적화**: 스냅샷을 주기적으로 저장하여 전체 재생 방지

**참고자료**
- [Event Store Documentation](https://www.eventstore.com/event-sourcing)[^24]

</details>

[^24]: Event Store 이벤트 소싱 가이드

### SD-025
이벤트 소싱(Event Sourcing)을 사용하면 얻을 수 있는 장점(예: 감사 로그, 시간 여행)은 무엇인가요?

<details>
<summary>답변</summary>

1. **완전한 감사 로그**: 모든 변경 이력 보존
2. **시간 여행**: 특정 시점의 상태 재구성
3. **디버깅**: 문제 발생 시점 추적 용이
4. **이벤트 재처리**: 새로운 뷰 생성 가능
5. **버그 수정**: 과거 이벤트 재처리로 데이터 복구

**참고자료**
- [Microsoft Event Sourcing](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)[^25]

</details>

[^25]: Microsoft Event Sourcing 패턴

### SD-026
이벤트 소싱에서 이벤트가 누적될수록 '현재 상태'를 재구성하는 데 발생하는 성능 문제를 어떻게 해결할 수 있나요?

<details>
<summary>답변</summary>

**스냅샷(Snapshot)**: 특정 시점의 상태를 저장

**동작**: 스냅샷 이후 이벤트만 재생하여 현재 상태 계산

```
스냅샷(시점 N) + Event(N+1) + ... = 현재상태
```

**참고자료**
- [Event Sourcing Snapshots](https://www.eventstore.com/blog/snapshots-in-event-sourcing)[^26]

</details>

[^26]: Event Store 스냅샷 가이드

### SD-027
이벤트 소싱의 성능 최적화를 위한 스냅샷(Snapshot) 생성 주기(frequency)는 어떻게 결정하는 것이 좋을까요?

<details>
<summary>답변</summary>

**기준**:
1. **이벤트 수 기반**: N개 이벤트마다 (예: 100개)
2. **시간 기반**: 주기적 (예: 매일)
3. **성능 기반**: 재생 시간이 임계치 초과 시

**트레이드오프**: 저장 공간 vs 읽기 성능

**참고자료**
- [Axon Framework - Snapshotting](https://docs.axoniq.io/reference-guide/axon-framework/tuning/event-snapshots)[^27]

</details>

[^27]: Axon Framework 스냅샷 문서

### SD-028

서비스 로직에서 'DB 트랜잭션'과 '이벤트 발행'을 원자적으로 묶고 싶을 때(Dual-write 문제) 어떻게 해야 할까요?

<details>
<summary>답변</summary>

**Dual-write 문제**: DB 저장 성공 후 이벤트 발행 실패 시 불일치

**해결책**:
1. **Transactional Outbox**: 같은 트랜잭션에서 Outbox 테이블에 이벤트 저장
2. **Event Sourcing**: 이벤트 자체가 원본 데이터
3. **CDC (Change Data Capture)**: DB 변경을 캡처하여 이벤트 발행

**참고자료**
- [Microservices.io - Transactional Outbox](https://microservices.io/patterns/data/transactional-outbox.html)[^28]

</details>

[^28]: Transactional Outbox 패턴

### SD-029
DB와 메시지 브로커에 동시 쓰기(Dual-write) 문제를 해결하기 위한 'Transactional Outbox' 패턴에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**동작**:
1. 비즈니스 데이터와 이벤트를 같은 DB 트랜잭션에서 저장
2. 이벤트는 Outbox 테이블에 저장
3. 별도 프로세스가 Outbox에서 이벤트를 읽어 브로커에 발행
4. 발행 완료 후 Outbox 레코드 삭제/마킹

**참고자료**
- [Debezium Outbox](https://debezium.io/documentation/reference/transformations/outbox-event-router.html)[^29]

</details>

[^29]: Debezium Outbox Event Router

### SD-030
Transactional Outbox 패턴에서 DB Outbox 테이블에 저장된 이벤트를 어떻게 안정적으로 이벤트 브로커에게 전달할 수 있을까요?

<details>
<summary>답변</summary>

**방법 1: Polling Publisher**
- 주기적으로 Outbox 테이블 조회
- 미발행 이벤트 전송 후 상태 업데이트

**방법 2: CDC (Change Data Capture)**
- DB 트랜잭션 로그를 캡처 (Debezium)
- 실시간으로 이벤트 브로커에 전달

**참고자료**
- [Debezium Documentation](https://debezium.io/documentation/)[^30]

</details>

[^30]: Debezium CDC 문서

---

## 📌 CQRS (Command Query Responsibility Segregation)

### SD-031

CQRS 패턴이 무엇인지 CQS(Command Query Separation) 원칙과 비교하여 설명해 주세요.

<details>
<summary>답변</summary>

**CQS (원칙)**: 메서드는 Command(상태 변경) 또는 Query(데이터 반환) 중 하나만 수행

**CQRS (패턴)**: 읽기와 쓰기 모델을 완전히 분리하여 다른 저장소/모델 사용

**차이**: CQS는 메서드 레벨, CQRS는 시스템 아키텍처 레벨

**참고자료**
- [Martin Fowler - CQRS](https://martinfowler.com/bliki/CQRS.html)[^31]

</details>

[^31]: Martin Fowler CQRS

### SD-032
CQRS(Command Query Responsibility Segregation) 패턴을 사용하는 가장 주된 이유는 무엇인가요?

<details>
<summary>답변</summary>

1. **읽기/쓰기 최적화**: 각각에 맞는 데이터 모델 사용
2. **확장성**: 읽기/쓰기 독립적 스케일링
3. **복잡한 도메인**: 쓰기는 도메인 모델, 읽기는 단순 DTO
4. **성능**: 읽기에 비정규화된 뷰 사용

**참고자료**
- [Microsoft CQRS](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)[^32]

</details>

[^32]: Microsoft CQRS 패턴

### SD-033
CQRS 패턴을 도입하면 읽기/쓰기 모델 분리로 인해 시스템이 어떻게 복잡해지나요?

<details>
<summary>답변</summary>

1. **코드 중복**: 읽기/쓰기 모델 각각 구현
2. **동기화**: Command → Query 모델 동기화 로직 필요
3. **최종 일관성**: 즉각적 일관성 보장 어려움
4. **인프라**: 별도 저장소 운영 비용

**참고자료**
- [CQRS Journey](https://learn.microsoft.com/en-us/previous-versions/msp-n-p/jj554200(v=pandp.10))[^33]

</details>

[^33]: Microsoft CQRS Journey

### SD-034
CQRS에서 분리된 'Command 모델(쓰기)'과 'Query 모델(읽기)'의 데이터 동기화는 어떻게 이루어지나요?

<details>
<summary>답변</summary>

**이벤트 기반 동기화**:
1. Command 모델에서 상태 변경 후 이벤트 발행
2. Query 모델이 이벤트 구독하여 뷰 업데이트

**동기화 방식**:
- 비동기: 이벤트 브로커 통해 전달
- 동기: 같은 트랜잭션에서 양쪽 업데이트 (권장 X)

**참고자료**
- [CQRS Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)[^34]

</details>

[^34]: CQRS 데이터 동기화

### SD-035
CQRS의 Command-Query 모델 동기화 과정에서 발생하는 '지연(lag)'으로 인한 '최종 일관성(Eventual Consistency)' 문제를 어떻게 처리해야 할까요?

<details>
<summary>답변</summary>

1. **UI 낙관적 업데이트**: 쓰기 후 UI에서 바로 반영
2. **Read-your-writes**: 쓴 사용자는 자신의 변경 즉시 조회
3. **Polling/WebSocket**: 동기화 완료 시 알림
4. **버전 체크**: 데이터 버전으로 최신 여부 확인

**참고자료**
- [Eventual Consistency](https://www.allthingsdistributed.com/2008/12/eventually_consistent.html)[^35]

</details>

[^35]: Werner Vogels - Eventual Consistency

### SD-036

CQRS에서 'Query 모델(Read Model)'은 어떤 기술을 사용해 구현하는 것이 좋을까요?

<details>
<summary>답변</summary>

**용도별 선택**:
- **단순 조회**: RDB (PostgreSQL)
- **전문 검색**: Elasticsearch
- **캐싱**: Redis
- **복잡한 쿼리**: MongoDB
- **분석**: ClickHouse, BigQuery

**핵심**: 읽기 패턴에 최적화된 기술 선택

**참고자료**
- [Polyglot Persistence](https://martinfowler.com/bliki/PolyglotPersistence.html)[^36]

</details>

[^36]: Martin Fowler - Polyglot Persistence

### SD-037
모든 시스템에 CQRS를 적용하는 것이 좋을까요? CQRS의 장단점을 고려했을 때, 어떤 경우에 적합하고 어떤 경우에 부적합할까요?

<details>
<summary>답변</summary>

**적합한 경우**:
- 읽기/쓰기 비율 차이가 큰 경우
- 복잡한 도메인 모델
- 높은 확장성 요구

**부적합한 경우**:
- 단순 CRUD 애플리케이션
- 강한 일관성이 필수인 경우
- 소규모 팀/프로젝트

**참고자료**
- [When to use CQRS](https://martinfowler.com/bliki/CQRS.html)[^37]

</details>

[^37]: CQRS 적용 기준

### SD-038
"CQRS는 이벤트 소싱이 아니다"라는 말에 대해 어떻게 생각하시나요? CQRS와 이벤트 소싱의 관계를 설명해 주세요.

<details>
<summary>답변</summary>

**독립적 패턴**: CQRS와 Event Sourcing은 별개의 패턴

- **CQRS만**: 읽기/쓰기 분리, 일반 DB 사용 가능
- **Event Sourcing만**: 이벤트 저장, 단일 모델 가능
- **함께 사용**: 시너지 효과

**참고자료**
- [Greg Young - CQRS and Event Sourcing](https://cqrs.files.wordpress.com/2010/11/cqrs_documents.pdf)[^38]

</details>

[^38]: Greg Young CQRS 문서

### SD-039
독립적으로 사용 가능한 CQRS와 이벤트 소싱을 함께 사용할 때 얻을 수 있는 시너지는 무엇인가요?

<details>
<summary>답변</summary>

1. **자연스러운 동기화**: 이벤트가 Query 모델 업데이트 트리거
2. **다양한 뷰**: 같은 이벤트로 여러 Query 모델 구축
3. **시간 여행 쿼리**: 과거 시점의 Read Model 재구성
4. **이벤트 재처리**: 새로운 Read Model 추가 용이

**참고자료**
- [Event Sourcing + CQRS](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)[^39]

</details>

[^39]: Event Sourcing과 CQRS 조합

---

## 📌 데이터베이스 샤딩 (Sharding)

### SD-040

데이터베이스 샤딩(Sharding)이 무엇이며, 왜 필요한가요?

<details>
<summary>답변</summary>

**정의**: 데이터를 여러 DB 인스턴스에 수평 분할하여 저장

**필요성**:
- 단일 DB의 용량/성능 한계 극복
- 읽기/쓰기 부하 분산
- 수평적 확장(Scale-out)

**참고자료**
- [MongoDB Sharding](https://www.mongodb.com/docs/manual/sharding/)[^40]

</details>

[^40]: MongoDB 샤딩 문서

### SD-041
데이터베이스의 샤딩(Sharding)과 파티셔닝(Partitioning)의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**파티셔닝**: 단일 DB 인스턴스 내에서 테이블을 논리적으로 분할

**샤딩**: 여러 물리적 DB 인스턴스에 데이터 분산

| 비교 | 파티셔닝 | 샤딩 |
|------|----------|------|
| 범위 | 단일 DB | 다중 DB |
| 확장 | 수직 | 수평 |
| 복잡도 | 낮음 | 높음 |

**참고자료**
- [PostgreSQL Partitioning](https://www.postgresql.org/docs/current/ddl-partitioning.html)[^41]

</details>

[^41]: PostgreSQL 파티셔닝 문서

### SD-042

수직 샤딩(Vertical Sharding)과 수평 샤딩(Horizontal Sharding)을 비교 설명해 주세요.

<details>
<summary>답변</summary>

**수직 샤딩**: 테이블/컬럼 단위로 분리 (예: 사용자 테이블은 DB1, 주문 테이블은 DB2)

**수평 샤딩**: 행(row) 단위로 분리 (예: user_id 1-1000은 DB1, 1001-2000은 DB2)

| 비교 | 수직 | 수평 |
|------|------|------|
| 분리 단위 | 테이블/컬럼 | 행 |
| 확장성 | 제한적 | 무한 |
| 복잡도 | 낮음 | 높음 |

**참고자료**
- [Vitess Sharding](https://vitess.io/docs/concepts/shard/)[^42]

</details>

[^42]: Vitess 샤딩 개념

### SD-043
수평 샤딩(행 기반 분할)과 수직 샤딩(컬럼 기반 분할) 중 어떤 상황에서 각각을 선택해야 할까요?

<details>
<summary>답변</summary>

**수직 샤딩 선택**:
- 특정 테이블만 부하가 높을 때
- 도메인별 분리가 명확할 때
- 초기 단계 확장

**수평 샤딩 선택**:
- 단일 테이블의 데이터가 매우 클 때
- 무한 확장이 필요할 때
- 균등한 부하 분산 필요

**참고자료**
- [System Design Primer - Sharding](https://github.com/donnemartin/system-design-primer#sharding)[^43]

</details>

[^43]: System Design Primer

### SD-044

샤딩 키(Shard Key)를 선정할 때 가장 중요하게 고려해야 할 기준은 무엇인가요?

<details>
<summary>답변</summary>

1. **카디널리티**: 충분히 다양한 값 (균등 분포)
2. **쿼리 패턴**: 자주 사용되는 조회 조건
3. **데이터 분포**: 균등한 데이터 분산
4. **불변성**: 변경되지 않는 값

**참고자료**
- [MongoDB Shard Key](https://www.mongodb.com/docs/manual/core/sharding-shard-key/)[^44]

</details>

[^44]: MongoDB 샤드 키 선택

### SD-045
샤딩 키(Shard Key)를 잘못 선정하면 데이터 분산과 쿼리 성능에 어떤 문제가 발생할 수 있나요?

<details>
<summary>답변</summary>

1. **Hotspot**: 특정 샤드에 트래픽 집중
2. **불균형 데이터**: 샤드 간 데이터 크기 불균형
3. **Cross-shard 쿼리 증가**: 샤드 키 없는 쿼리 성능 저하
4. **리샤딩 비용**: 키 변경 시 전체 데이터 마이그레이션

**참고자료**
- [Cassandra Data Modeling](https://cassandra.apache.org/doc/latest/cassandra/data_modeling/)[^45]

</details>

[^45]: Cassandra 데이터 모델링

### SD-046
샤딩 환경에서 특정 샤드에만 데이터가 몰리는 '핫스팟(Hotspot)' 문제를 완화하기 위한 전략에는 무엇이 있을까요?

<details>
<summary>답변</summary>

1. **복합 샤드 키**: 여러 필드 조합
2. **해시 샤딩**: 키를 해시하여 분산
3. **Salt 추가**: 키에 랜덤 값 추가
4. **시간 기반 분산**: 타임스탬프에 랜덤 요소 추가

**참고자료**
- [DynamoDB Best Practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html)[^46]

</details>

[^46]: DynamoDB 파티션 키 설계

### SD-047

대표적인 샤딩 전략 3가지(Range, Hash, Directory-based)를 설명하고 장단점을 비교해 주세요.

<details>
<summary>답변</summary>

**Range Sharding** (범위 기반):
- 키 범위로 분할 (예: A-M → 샤드1, N-Z → 샤드2)
- 장점: 범위 쿼리 효율적, 정렬된 스캔 용이
- 단점: Hotspot 발생 가능 (최근 데이터에 쓰기 집중)
- 적합: 시계열 데이터, 범위 검색이 많은 경우

**Hash Sharding** (해시 기반):
- 키의 해시 값으로 분할
- 장점: 균등 분산, Hotspot 방지
- 단점: 범위 쿼리 시 모든 샤드 스캔 필요
- 적합: Point 쿼리 위주, 균등 분산 중요

**Directory-based** (디렉토리 기반):
- 룩업 테이블/서비스로 샤드 매핑
- 장점: 가장 유연, 동적 리밸런싱 용이
- 단점: 룩업 서비스가 SPOF/병목
- 적합: 복잡한 샤딩 규칙, 자주 변경되는 경우

**하이브리드**: 여러 전략 조합 가능 (예: 지역별 Range + 사용자별 Hash)

**참고자료**
- [Sharding Strategies](https://www.mongodb.com/docs/manual/sharding/)[^47]

</details>

[^47]: MongoDB 샤딩 전략

### SD-048

MongoDB는 샤딩을 어떻게 구현하나요? 'mongos', 'config server', 'shard'의 역할을 설명해 주세요.

<details>
<summary>답변</summary>

**mongos**: 쿼리 라우터. 클라이언트 요청을 적절한 샤드로 전달

**Config Server**: 메타데이터 저장. 샤드 키 범위, 청크 위치 정보

**Shard**: 실제 데이터 저장. 각 샤드는 레플리카 셋

**참고자료**
- [MongoDB Sharded Cluster](https://www.mongodb.com/docs/manual/sharding/)[^48]

</details>

[^48]: MongoDB 샤딩 아키텍처

### SD-049
MongoDB 샤딩에서 '청크(Chunk)'란 무엇이며, '밸런서(Balancer)'는 어떤 역할을 하나요?

<details>
<summary>답변</summary>

**청크**: 연속된 샤드 키 범위의 데이터 집합. 기본 128MB

**밸런서**: 백그라운드 프로세스
- 샤드 간 청크 균등 분배
- 청크 분할 (split) 및 마이그레이션

**참고자료**
- [MongoDB Balancer](https://www.mongodb.com/docs/manual/core/sharding-balancer-administration/)[^49]

</details>

[^49]: MongoDB 밸런서

### SD-050

Elasticsearch는 샤딩을 어떻게 구현하나요? '인덱스', '샤드', '레플리카'의 관계를 설명해 주세요.

<details>
<summary>답변</summary>

**인덱스**: 문서의 논리적 컨테이너

**샤드**: 인덱스를 물리적으로 분할한 단위 (Primary Shard)

**레플리카**: 샤드의 복제본. 가용성과 읽기 성능 향상

```
인덱스 = Primary Shards + Replica Shards
```

**참고자료**
- [Elasticsearch Shards](https://www.elastic.co/guide/en/elasticsearch/reference/current/scalability.html)[^50]

</details>

[^50]: Elasticsearch 확장성

### SD-051

Cassandra와 같은 Dynamo-style DB는 '샤딩'이라는 용어 대신 '파티셔닝'을 사용합니다. Cassandra의 데이터 분산 방식(Consistent Hashing)에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Consistent Hashing**:
- 해시 링(Ring)에 노드 배치
- 파티션 키 해시 → 링에서 시계방향으로 다음 노드에 저장
- 노드 추가/제거 시 영향 범위 최소화

**장점**: 노드 변경 시 일부 데이터만 재분배

**참고자료**
- [Cassandra Architecture](https://cassandra.apache.org/doc/latest/cassandra/architecture/)[^51]

</details>

[^51]: Cassandra 아키텍처

### SD-052
Cassandra의 Consistent Hashing에서 '가상 노드(Virtual Nodes)'가 왜 필요한가요?

<details>
<summary>답변</summary>

**문제**: 물리 노드만 사용 시 불균등한 데이터 분포

**Vnode 해결책**:
- 각 물리 노드가 여러 가상 노드 담당
- 기본 256개 vnode per 물리 노드
- 균등한 데이터 분포 보장
- 노드 추가/제거 시 부하 분산

**참고자료**
- [Cassandra Virtual Nodes](https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html#virtual-nodes)[^52]

</details>

[^52]: Cassandra Virtual Nodes

### SD-053

Vitess나 Citus와 같이 RDBMS를 샤딩해주는 미들웨어는 어떤 원리로 동작하나요?

<details>
<summary>답변</summary>

**동작 원리**:
1. **쿼리 라우팅**: SQL 파싱 후 적절한 샤드로 전달
2. **결과 병합**: 여러 샤드 결과 조합
3. **스키마 관리**: 샤드 간 일관된 스키마 유지
4. **연결 풀링**: 백엔드 DB 연결 관리

**참고자료**
- [Vitess Architecture](https://vitess.io/docs/concepts/vtgate/)[^53]

</details>

[^53]: Vitess VTGate

### SD-054

샤딩된 환경에서 여러 샤드에 걸친 쿼리(Cross-shard query)는 어떻게 처리해야 하며, 어떤 성능 문제가 있을까요?

<details>
<summary>답변</summary>

**처리 방법**:
- Scatter-Gather: 모든 샤드에 쿼리 후 결과 병합

**성능 문제**:
1. 네트워크 지연 증가
2. 가장 느린 샤드에 종속
3. 메모리 사용량 증가 (결과 병합)

**최적화**: 샤드 키 포함 쿼리 유도

**참고자료**
- [Vitess Query Serving](https://vitess.io/docs/concepts/query-serving/)[^54]

</details>

[^54]: Vitess 쿼리 처리

### SD-055
샤딩된 환경에서 여러 샤드에 걸친 'JOIN' 연산은 어떻게 수행해야 할까요?

<details>
<summary>답변</summary>

**방법**:
1. **Co-location**: 관련 데이터를 같은 샤드에 배치
2. **애플리케이션 레벨 JOIN**: 별도 쿼리 후 앱에서 조합
3. **브로드캐스트 조인**: 작은 테이블 전체 복제
4. **비정규화**: JOIN 불필요하게 데이터 구조 변경

**참고자료**
- [CockroachDB Joins](https://www.cockroachlabs.com/docs/stable/joins.html)[^55]

</details>

[^55]: CockroachDB 조인 처리

### SD-056
샤딩된 환경에서 여러 샤드에 걸친 '트랜잭션'은 어떻게 처리해야 할까요? SAGA 패턴과의 연관성은 무엇인가요?

<details>
<summary>답변</summary>

**단일 샤드**: 로컬 트랜잭션 사용

**Cross-shard**:
1. **2PC**: 분산 트랜잭션 (성능 저하)
2. **SAGA**: 보상 트랜잭션으로 최종 일관성
3. **설계로 회피**: 관련 데이터 같은 샤드 배치

**참고자료**
- [Spanner Transactions](https://cloud.google.com/spanner/docs/transactions)[^56]

</details>

[^56]: Google Spanner 트랜잭션

### SD-057

리샤딩(Resharding)은 무엇이며, 언제 필요한가요?

<details>
<summary>답변</summary>

**정의**: 샤드 수 변경 또는 샤딩 전략 변경으로 데이터 재분배

**필요 시점**:
- 샤드 용량 한계 도달
- Hotspot 해결
- 샤드 키 변경
- 노드 추가/제거

**참고자료**
- [MongoDB Resharding](https://www.mongodb.com/docs/manual/core/sharding-reshard-a-collection/)[^57]

</details>

[^57]: MongoDB 리샤딩

### SD-058
샤드 수 변경이나 샤딩 키 변경 시, 시스템 다운타임 없이 리샤딩을 수행하는 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**온라인 리샤딩 단계**:
1. **이중 쓰기**: 기존/신규 샤드에 동시 쓰기
2. **백필**: 기존 데이터를 신규 샤드로 복사
3. **검증**: 데이터 일관성 확인
4. **트래픽 전환**: 읽기를 신규 샤드로 전환
5. **정리**: 기존 샤드 데이터 삭제

**참고자료**
- [Stripe Online Migrations](https://stripe.com/blog/online-migrations)[^58]

</details>

[^58]: Stripe 온라인 마이그레이션

---

## 📌 분산 시스템 이론 (CAP, Consensus)

### SD-059

CAP 이론(Theorem)에 대해 설명해 주세요. (Consistency, Availability, Partition Tolerance)

<details>
<summary>답변</summary>

**C (Consistency)**: 모든 노드가 **동일한 최신 데이터**를 반환 (Linearizability)

**A (Availability)**: 장애가 없는 모든 노드가 **합리적인 시간 내에** 응답

**P (Partition Tolerance)**: 네트워크 분할(메시지 유실/지연)에도 시스템 동작

**정리**: 네트워크 파티션 발생 시, 일관성(C)과 가용성(A) 중 하나를 선택

**중요한 오해 바로잡기**:
- "3개 중 2개 선택"은 오해를 유발하는 표현
- P는 선택이 아닌 **현실** (네트워크는 반드시 실패함)
- 실제 선택: 파티션 발생 시 C 또는 A 중 무엇을 희생할 것인가
- 파티션이 없을 때는 C와 A 모두 가능

**참고자료**
- [CAP Theorem - Brewer](https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/)[^59]

</details>

[^59]: Eric Brewer CAP 이론 재고

### SD-060
CAP 이론에서 Consistency, Availability, Partition Tolerance 중 왜 현대 분산 시스템은 'P(Partition Tolerance)'를 포기할 수 없는지 설명해 주세요.

<details>
<summary>답변</summary>

**이유**: 네트워크 파티션은 **피할 수 없는 현실**

- 분산 시스템에서 네트워크 장애는 반드시 발생
- P를 포기 = 단일 노드 시스템 = 분산 시스템이 아님

**결론**: 실제 선택은 **CP vs AP**

**참고자료**
- [You Can't Sacrifice Partition Tolerance](https://codahale.com/you-cant-sacrifice-partition-tolerance/)[^60]

</details>

[^60]: Coda Hale - Partition Tolerance

### SD-061
CAP 이론에서 P가 필수일 때 시스템은 CP(일관성 우선) 또는 AP(가용성 우선)를 선택해야 합니다. 각각의 특징과 대표적인 시스템 예시를 들어주세요.

<details>
<summary>답변</summary>

**CP (Consistency + Partition Tolerance)**:
- 파티션 발생 시 일관성 유지를 위해 일부 요청 거부
- 예: ZooKeeper, etcd, HBase, Spanner
- 적합: 금융 거래, 재고 관리 등 정확성이 핵심

**AP (Availability + Partition Tolerance)**:
- 파티션 발생 시에도 모든 노드가 요청 처리 (최종 일관성)
- 예: Cassandra, DynamoDB, CouchDB, Riak
- 적합: 소셜 미디어 피드, 장바구니 등 가용성이 핵심

**함정 주의**:
- MongoDB는 구성에 따라 CP 또는 AP가 될 수 있음 (writeConcern, readConcern)
- 대부분의 시스템은 **Tunable Consistency** 지원
- 동일 시스템 내에서 작업별로 다른 일관성 수준 선택 가능

**참고자료**
- [CAP FAQ](https://www.the-paper-trail.org/page/cap-faq/)[^61]

</details>

[^61]: CAP FAQ

### SD-062
CP(Consistency-Partition Tolerance) 시스템은 네트워크 파티션 발생 시 어떻게 동작하나요?

<details>
<summary>답변</summary>

**동작**:
- 과반수(Quorum) 미달 파티션은 요청 거부
- 일관성 유지를 위해 가용성 희생
- 클라이언트는 에러 또는 타임아웃 수신

**예시**: ZooKeeper에서 리더와 연결 끊긴 팔로워는 읽기/쓰기 불가

**참고자료**
- [ZooKeeper Internals](https://zookeeper.apache.org/doc/current/zookeeperInternals.html)[^62]

</details>

[^62]: ZooKeeper 내부 구조

### SD-063
AP(Availability-Partition Tolerance) 시스템은 네트워크 파티션 발생 시 CP 시스템과 달리 어떻게 동작하나요?

<details>
<summary>답변</summary>

**동작**:
- 모든 파티션이 계속 요청 처리
- 일관성 포기, 충돌 가능
- 파티션 복구 후 충돌 해결 (reconciliation)

**예시**: Cassandra는 파티션 상태에서도 각 노드가 독립적으로 쓰기 허용

**참고자료**
- [Cassandra Consistency](https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html#tunable-consistency)[^63]

</details>

[^63]: Cassandra Tunable Consistency

### SD-064
"CAP 이론은 셋 중 둘만 선택할 수 있다는 것이 아니다"라는 비판이 있습니다. 이 비판의 근거와 CAP 이론의 한계는 무엇인가요?

<details>
<summary>답변</summary>

**비판 근거**:
1. **파티션은 드묾**: 정상 상황(대부분의 시간)에서는 C와 A 모두 가능
2. **이분법적 표현의 한계**: 실제로는 연속적 스펙트럼에서 트레이드오프
3. **Latency 미고려**: 실제 시스템에서는 응답 시간이 가용성만큼 중요
4. **일관성 정의 모호**: CAP의 C는 Linearizability인데, 실무에서는 다양한 수준 존재

**대안 - PACELC 이론**:
- **P**artition 발생 시: **A**vailability vs **C**onsistency
- **E**lse (정상 상황): **L**atency vs **C**onsistency

예시:
- DynamoDB: PA/EL (파티션 시 가용성, 평소엔 지연 우선)
- Spanner: PC/EC (항상 일관성 우선)
- Cassandra: PA/EL (튜닝 가능)

**참고자료**
- [PACELC](https://en.wikipedia.org/wiki/PACELC_theorem)[^64]

</details>

[^64]: PACELC 이론

### SD-065

CAP의 'C'는 '강한 일관성(Strong Consistency)'을 의미합니다. '최종 일관성(Eventual Consistency)' 모델이 무엇인지, AP 시스템과 어떤 관계가 있는지 설명해 주세요.

<details>
<summary>답변</summary>

**최종 일관성**: 업데이트 중단 시 결국 모든 노드가 같은 값 수렴

**AP 시스템과의 관계**:
- AP 시스템은 가용성을 위해 강한 일관성 포기
- 대신 최종 일관성 제공
- 예: Cassandra, DynamoDB

**참고자료**
- [Eventually Consistent - Werner Vogels](https://www.allthingsdistributed.com/2008/12/eventually_consistent.html)[^65]

</details>

[^65]: Werner Vogels - Eventual Consistency

### SD-066
분산 시스템에서 '강한 일관성(Strong Consistency)'과 '최종 일관성(Eventual Consistency)' 사이에는 어떤 다른 일관성 모델들이 존재하나요?

<details>
<summary>답변</summary>

1. **Read-your-writes**: 자신이 쓴 것은 즉시 읽기 가능
2. **Monotonic Reads**: 한번 본 값보다 과거 값 읽기 불가
3. **Monotonic Writes**: 쓰기 순서 보장
4. **Causal Consistency**: 인과 관계 있는 연산 순서 보장
5. **Session Consistency**: 세션 내 일관성 보장

**참고자료**
- [Consistency Models](https://jepsen.io/consistency)[^66]

</details>

[^66]: Jepsen 일관성 모델

### SD-067

분산 시스템에서 '합의(Consensus)' 문제는 무엇을 해결하기 위한 것인가요?

<details>
<summary>답변</summary>

**문제**: 분산 노드들이 하나의 값/결정에 동의하는 것

**필요 상황**:
- 리더 선출
- 분산 트랜잭션 커밋 여부
- 로그 복제 순서
- 설정 변경

**참고자료**
- [Raft Paper](https://raft.github.io/raft.pdf)[^67]

</details>

[^67]: Raft 논문

### SD-068

비잔티움 장군 문제(Byzantine Generals Problem)에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**문제 설정**:
- 여러 장군이 공격/후퇴 합의 필요
- 일부 장군이 배신자(거짓 정보 전달)
- 배신자가 있어도 올바른 합의 도달 필요

**조건**: n개 노드 중 f개 악의적 노드가 있을 때, n >= 3f + 1 이어야 합의 가능

**참고자료**
- [Byzantine Generals Problem - Lamport](https://lamport.azurewebsites.net/pubs/byz.pdf)[^68]

</details>

[^68]: Lamport 비잔틴 장군 논문

### SD-069
비잔티움 장군 문제(Byzantine Generals Problem)가 분산 시스템에서 왜 중요한가요? 어떤 종류의 장애(Crash Fault vs Byzantine Fault)를 가정하는 것인가요?

<details>
<summary>답변</summary>

**가정하는 장애**: **악의적(Byzantine) 장애**
- 노드가 의도적으로 잘못된 정보 전송
- 해킹, 버그, 하드웨어 오류로 비정상 동작

**중요성**:
- 신뢰할 수 없는 노드 환경 (퍼블릭 블록체인)
- 고신뢰성 시스템 (항공, 금융)

**참고자료**
- [Byzantine Fault Tolerance](https://pmg.csail.mit.edu/papers/osdi99.pdf)[^69]

</details>

[^69]: PBFT 논문

### SD-070
비잔티움 장애 허용(BFT, Byzantine Fault Tolerance)이 무엇인지, 그리고 이것이 블록체인의 합의 알고리즘과 어떤 관련이 있는지 설명해 주세요.

<details>
<summary>답변</summary>

**BFT**: 악의적 노드가 있어도 시스템이 올바르게 동작

**블록체인 관계**:
- 퍼블릭 블록체인은 신뢰 없는 참여자 환경
- PoW, PoS 등은 BFT의 변형
- PBFT는 프라이빗 블록체인에서 사용 (Hyperledger)

**참고자료**
- [Hyperledger PBFT](https://hyperledger-fabric.readthedocs.io/)[^70]

</details>

[^70]: Hyperledger Fabric 문서

### SD-071
BFT를 구현하기 위한 알고리즘(예: PBFT)과 CFT(Crash Fault Tolerant) 합의 알고리즘(예: Raft, Paxos)의 근본적인 차이는 무엇인가요?

<details>
<summary>답변</summary>

**CFT (Crash Fault Tolerance) - Raft, Paxos**:
- 노드가 크래시만 가정 (정직한 실패: 응답 없음 또는 정상 응답)
- f개 장애 허용에 **2f+1** 노드 필요
- 메시지 복잡도: O(n) per operation
- 성능 우수, 대부분의 내부 시스템에 적합

**BFT (Byzantine Fault Tolerance) - PBFT, HotStuff**:
- 악의적 노드 가정 (거짓 응답, 선택적 무응답 등)
- f개 장애 허용에 **3f+1** 노드 필요
- 메시지 복잡도: O(n^2) per operation
- 성능 저하, 신뢰할 수 없는 참여자 환경에 필요

**트레이드오프**:
| 기준 | CFT | BFT |
|------|-----|-----|
| 장애 유형 | 크래시만 | 악의적 포함 |
| 노드 수 | 2f+1 | 3f+1 |
| 성능 | 높음 | 낮음 |
| 사용처 | 내부 시스템 | 블록체인, 고신뢰 시스템 |

**참고자료**
- [Raft vs PBFT](https://decentralizedthoughts.github.io/2019-06-07-modeling-consensus/)[^71]

</details>

[^71]: Consensus 모델링

### SD-072

Raft 합의 알고리즘의 '리더 선출(Leader Election)' 과정에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**과정**:
1. 리더 heartbeat 타임아웃 발생
2. Follower가 Candidate로 전환
3. Term 증가, 자신에게 투표, 다른 노드에 RequestVote 전송
4. 과반수 투표 획득 시 리더 선출
5. 리더는 heartbeat 전송 시작

**참고자료**
- [Raft Visualization](https://raft.github.io/)[^72]

</details>

[^72]: Raft 시각화

### SD-073
Raft 알고리즘에서 리더 선출 후 '로그 복제(Log Replication)'는 어떻게 이루어지나요?

<details>
<summary>답변</summary>

**과정**:
1. 클라이언트 요청 → 리더가 로그에 추가
2. 리더가 AppendEntries RPC로 팔로워에 전파
3. 과반수 복제 완료 시 커밋
4. 다음 heartbeat에서 커밋 알림
5. 팔로워도 커밋 적용

**참고자료**
- [Raft Paper - Log Replication](https://raft.github.io/raft.pdf)[^73]

</details>

[^73]: Raft 로그 복제

---

## 📌 리더십과 복제 (Replication & Leadership)

### SD-074

데이터베이스 레플리케이션(Replication, 복제)은 왜 필요한가요? (가용성 vs 확장성)

<details>
<summary>답변</summary>

**가용성**: 노드 장애 시 다른 복제본이 서비스 지속

**확장성**: 읽기 부하를 여러 복제본에 분산

**추가 이점**:
- 지리적 분산 (지연 감소)
- 데이터 내구성

**참고자료**
- [MySQL Replication](https://dev.mysql.com/doc/refman/8.0/en/replication.html)[^74]

</details>

[^74]: MySQL 복제 문서

### SD-075

'동기식(Synchronous)' 복제와 '비동기식(Asynchronous)' 복제의 장단점을 비교 설명해 주세요.

<details>
<summary>답변</summary>

**동기식 (Synchronous)**:
- 모든 복제본 확인 후 클라이언트에 응답
- 장점: 데이터 유실 없음 (RPO=0), 강한 일관성
- 단점: 가장 느린 복제본에 종속, 복제본 장애 시 전체 중단
- 적합: 금융 거래 등 데이터 손실 불가한 경우

**비동기식 (Asynchronous)**:
- 로컬 쓰기 후 즉시 응답, 복제는 백그라운드
- 장점: 낮은 지연, 높은 가용성
- 단점: 데이터 유실 가능 (RPO>0), 복제 지연(Replication Lag)
- 적합: 대부분의 읽기 중심 워크로드

**트레이드오프**:
| 방식 | RPO | 지연 | 처리량 | 가용성 |
|------|-----|------|--------|--------|
| 동기식 | 0 | 높음 | 낮음 | 낮음 |
| 비동기식 | >0 | 낮음 | 높음 | 높음 |

**실무 고려**: 지리적 분산 복제는 네트워크 지연으로 비동기 권장

**참고자료**
- [PostgreSQL Replication](https://www.postgresql.org/docs/current/warm-standby.html)[^75]

</details>

[^75]: PostgreSQL Replication

### SD-076
동기식과 비동기식 복제의 절충안인 '반-동기식(Semi-Synchronous)' 복제는 무엇이며, 어떤 문제를 해결하기 위해 등장했나요?

<details>
<summary>답변</summary>

**정의**: 최소 하나의 복제본 확인 후 커밋 응답

**해결 문제**:
- 동기식의 성능 저하
- 비동기식의 데이터 유실 위험

**동작**: 리더 + 최소 1개 복제본 확인 → 커밋

**참고자료**
- [MySQL Semi-Sync](https://dev.mysql.com/doc/refman/8.0/en/replication-semisync.html)[^76]

</details>

[^76]: MySQL Semi-Sync Replication

### SD-077

단일 리더(Single-Leader) 복제 아키텍처 (Master-Slave)에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**구조**:
- 하나의 리더(Master): 모든 쓰기 처리
- 여러 팔로워(Slave): 리더 복제, 읽기 처리

**복제 흐름**:
1. 클라이언트 → 리더 쓰기
2. 리더 → 팔로워 복제
3. 클라이언트 ← 팔로워 읽기

**참고자료**
- [Redis Replication](https://redis.io/docs/management/replication/)[^77]

</details>

[^77]: Redis 복제

### SD-078
단일 리더(Single Leader) 복제 아키텍처의 가장 큰 장점과 단점은 무엇인가요?

<details>
<summary>답변</summary>

**장점**:
- 단순한 구현
- 쓰기 충돌 없음
- 일관성 유지 용이

**단점**:
- 리더가 SPOF
- 쓰기 확장 불가 (수직 확장만)
- 리더-팔로워 지연

**참고자료**
- [DDIA - Replication](https://dataintensive.net/)[^78]

</details>

[^78]: Designing Data-Intensive Applications

### SD-079
단일 리더 복제에서 만약 리더(Master) 노드가 다운되면 어떤 문제가 발생하나요?

<details>
<summary>답변</summary>

1. **쓰기 불가**: 새 쓰기 요청 처리 불가
2. **데이터 유실 가능**: 비동기 복제 시 미복제 데이터 손실
3. **서비스 중단**: Failover까지 다운타임
4. **읽기 일관성 문제**: 복제본 간 데이터 차이

**참고자료**
- [MySQL Failover](https://dev.mysql.com/doc/refman/8.0/en/replication-solutions-switch.html)[^79]

</details>

[^79]: MySQL Failover

### SD-080
단일 리더 복제에서 리더가 다운되었을 때 새로운 리더를 선출하는 과정(Failover)에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Failover 단계**:
1. **장애 감지**: 타임아웃으로 리더 다운 인식
2. **새 리더 선출**: 가장 최신 데이터 가진 팔로워 선택
3. **구성 변경**: 클라이언트/팔로워에게 새 리더 알림
4. **복구**: 이전 리더 복귀 시 팔로워로 전환

**참고자료**
- [Redis Sentinel](https://redis.io/docs/management/sentinel/)[^80]

</details>

[^80]: Redis Sentinel

### SD-081
리더 Failover 과정에서 발생할 수 있는 'Split-Brain' 문제가 무엇이며, 어떻게 방지할 수 있나요?

<details>
<summary>답변</summary>

**Split-Brain 정의**: 네트워크 파티션으로 각 파티션이 자신이 리더라고 판단, **두 개 이상의 리더가 동시 존재**

**문제**:
- 양쪽 리더가 동시에 쓰기 처리 → 데이터 불일치
- 파티션 복구 후 충돌 해결 어려움
- 데이터 손실 또는 corruption 가능

**방지 방법**:
1. **Quorum (과반수 투표)**: 과반수 노드와 통신 가능해야 리더 유지
   - 예: 5노드 중 3개 이상 연결된 쪽만 리더

2. **Fencing (차단)**: 이전 리더를 강제로 격리
   - STONITH (Shoot The Other Node In The Head)
   - Fencing Token: 새 리더만 유효한 토큰 사용

3. **Lease (임대)**: 리더 권한에 TTL 설정
   - 갱신 실패 시 자동으로 리더십 상실

**핵심 통찰**: 파티션 시 "누가 죽었는지" 판단 불가 → **스스로 포기하는 메커니즘** 필수

**참고자료**
- [Fencing in Distributed Systems](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html)[^81]

</details>

[^81]: Martin Kleppmann - 분산 락

### SD-082
비동기식 복제를 사용할 때, 리더 장애 조치(Failover) 과정에서 데이터 유실이 발생할 수 있습니다. 왜 그런지 설명해 주세요.

<details>
<summary>답변</summary>

**원인**:
1. 리더에 쓰기 완료
2. 팔로워에 복제 전 리더 다운
3. 팔로워가 새 리더로 승격
4. 복제되지 않은 쓰기 데이터 유실

**대책**: Semi-sync 복제, 수동 승인

**참고자료**
- [MySQL Data Loss](https://dev.mysql.com/doc/refman/8.0/en/replication-solutions-unexpected-replica-halt.html)[^82]

</details>

[^82]: MySQL 복제 데이터 유실

### SD-083
단일 리더 아키텍처에서 리더로 모든 쓰기 요청이 몰릴 때 발생하는 쓰기 병목 현상을 어떻게 해결할 수 있을까요?

<details>
<summary>답변</summary>

1. **수직 확장**: 리더 서버 스펙 향상
2. **샤딩**: 여러 샤드로 분산, 각 샤드마다 리더
3. **다중 리더**: 여러 리더 허용 (충돌 해결 필요)
4. **쓰기 최적화**: 배치 처리, 비동기 쓰기

**참고자료**
- [Scaling Writes](https://www.citusdata.com/blog/2016/10/03/scaling-distributed-database-writes/)[^83]

</details>

[^83]: Citus 쓰기 확장

### SD-084

다중 리더(Multi-Leader) 복제 아키텍처 (Master-Master)에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**구조**: 여러 노드가 모두 리더 역할, 쓰기 허용

**복제**: 각 리더가 다른 리더에게 변경 전파

**사용 사례**:
- 다중 데이터센터
- 오프라인 클라이언트 (노트 앱)

**참고자료**
- [CouchDB Replication](https://docs.couchdb.org/en/stable/replication/)[^84]

</details>

[^84]: CouchDB 복제

### SD-085
다중 리더(Multi-Leader) 복제 아키텍처는 어떤 경우에 유용한가요?

<details>
<summary>답변</summary>

1. **Multi-Datacenter**: 각 DC에 로컬 리더 → 지연 감소
2. **오프라인 작업**: 오프라인에서 쓰기 후 동기화
3. **협업 도구**: 동시 편집 (Google Docs)
4. **고가용성**: 리더 장애에도 다른 리더로 계속 서비스

**참고자료**
- [Multi-Leader Replication](https://dataintensive.net/)[^85]

</details>

[^85]: DDIA 다중 리더

### SD-086
다중 리더 아키텍처의 가장 큰 단점인 '쓰기 충돌(Write Conflict)' 문제에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**발생 상황**: 두 리더가 동시에 같은 데이터 수정

**예시**:
- 리더A: 이름을 "Alice"로 변경
- 리더B: 이름을 "Bob"으로 변경
- 둘 다 성공 후 복제 시 충돌

**문제**: 어떤 값이 최종 값인가?

**참고자료**
- [Conflict Resolution](https://www.cockroachlabs.com/blog/consistency-model/)[^86]

</details>

[^86]: CockroachDB 일관성 모델

### SD-087
다중 리더 환경에서 두 개의 리더에서 동일한 데이터를 동시에 수정할 경우 발생하는 쓰기 충돌을 어떻게 감지하고 해결해야 할까요?

<details>
<summary>답변</summary>

**감지 방법**:
- 버전 벡터 (Vector Clock): 각 노드별 버전 추적, 동시성 감지
- 타임스탬프 비교: 물리적/논리적 시계 사용
- 복제 시점에 충돌 발견

**해결 전략** (트레이드오프 포함):
1. **LWW (Last Write Wins)**:
   - 타임스탬프 최신 값 승리
   - 장점: 단순, 결정론적
   - 단점: 데이터 유실, 시계 동기화 의존

2. **병합 (Merge)**:
   - 두 값 합치기 (예: 집합의 합집합)
   - 장점: 데이터 유실 없음
   - 단점: 모든 데이터 타입에 적용 불가

3. **사용자 해결**:
   - 충돌 표시 후 사용자/애플리케이션이 선택
   - 장점: 비즈니스 로직 반영
   - 단점: UX 저하, 구현 복잡

4. **CRDT (Conflict-free Replicated Data Types)**:
   - 수학적으로 자동 병합 가능한 데이터 구조
   - 예: G-Counter, LWW-Register, OR-Set
   - 장점: 자동 해결
   - 단점: 지원 타입 제한, 메모리 오버헤드

**참고자료**
- [CRDTs](https://crdt.tech/)[^87]

</details>

[^87]: CRDT 공식 사이트

### SD-088
쓰기 충돌 해결에 사용되는 'Last Write Wins (LWW)'와 같은 자동 충돌 해결 전략의 문제점은 무엇인가요?

<details>
<summary>답변</summary>

**문제점**:
1. **데이터 유실**: 먼저 쓴 값은 사라짐
2. **시계 동기화**: 노드 간 시계 불일치 시 잘못된 판단
3. **동시 쓰기**: 실제 동시 발생 시 임의 선택
4. **비즈니스 규칙 무시**: 도메인 로직과 무관하게 결정

**참고자료**
- [LWW Problems](https://jepsen.io/consistency/models/lww)[^88]

</details>

[^88]: Jepsen LWW

### SD-089

리더가 없는(Leaderless) 아키텍처 (예: Cassandra, DynamoDB)는 다중 리더와 어떻게 다른가요?

<details>
<summary>답변</summary>

**다중 리더**: 지정된 리더들이 쓰기 처리

**리더리스**: 모든 노드가 동등, 클라이언트가 여러 노드에 직접 쓰기

**차이**:
| 비교 | Multi-Leader | Leaderless |
|------|--------------|------------|
| 리더 | 지정됨 | 없음 |
| 쓰기 | 리더만 | 모든 노드 |
| 조정 | 리더 간 복제 | Quorum |

**참고자료**
- [Cassandra Architecture](https://cassandra.apache.org/doc/latest/cassandra/architecture/)[^89]

</details>

[^89]: Cassandra 아키텍처

### SD-090
리더리스(Leaderless) 아키텍처에서 일관성 조절에 사용하는 'Quorum'의 R, W, N 값의 관계(R+W > N)에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**N**: 총 복제본 수
**W**: 쓰기 확인 필요 노드 수
**R**: 읽기 확인 필요 노드 수

**R + W > N**: 읽기와 쓰기 노드 집합이 반드시 겹침 → 최신 데이터 보장

**예시**: N=3, W=2, R=2 → 2+2 > 3 ✓

**참고자료**
- [DynamoDB Consistency](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html)[^90]

</details>

[^90]: DynamoDB 일관성

### SD-091
Quorum 기반 리더리스 아키텍처에서 '쓰기 충돌'은 어떻게 처리하나요?

<details>
<summary>답변</summary>

**Read Repair**: 읽기 시 불일치 발견하면 최신 값으로 복구

**Anti-entropy**: 백그라운드에서 노드 간 데이터 비교/복구

**Vector Clock**: 버전 추적으로 충돌 감지

**해결**: LWW, Merge, 애플리케이션 해결

**참고자료**
- [Cassandra Read Repair](https://cassandra.apache.org/doc/latest/cassandra/operating/read_repair.html)[^91]

</details>

[^91]: Cassandra Read Repair

---

## 📌 추가 고급 질문 (Advanced Topics)

### SD-092

RDBMS와 NoSQL(Key-Value, Document, Graph) 각각의 특징을 설명하고, 언제 어떤 것을 선택해야 할지 기준을 설명해 주세요.

<details>
<summary>답변</summary>

**RDBMS**: 정형 데이터, ACID, 복잡한 쿼리/조인, 강한 일관성
→ 트랜잭션 중요, 관계형 데이터

**Key-Value (Redis)**: 단순 조회, 높은 성능
→ 캐싱, 세션

**Document (MongoDB)**: 유연한 스키마, 중첩 구조
→ 콘텐츠 관리, 카탈로그

**Graph (Neo4j)**: 관계 탐색 최적화
→ 소셜 네트워크, 추천

**참고자료**
- [DB-Engines Ranking](https://db-engines.com/en/ranking)[^92]

</details>

[^92]: DB-Engines 데이터베이스 순위

### SD-093

마이크로서비스 아키텍처(MSA)를 설계할 때, 서비스 간 통신 방법(동기식 API vs 비동기식 이벤트)을 어떻게 결정해야 할까요?

<details>
<summary>답변</summary>

**동기식 (REST, gRPC) 선택**:
- 즉각적 응답 필요 (사용자 대기)
- 단순한 요청-응답 패턴
- 강한 일관성 필요
- 예: 인증, 결제 검증, 실시간 조회

**비동기식 (이벤트, 메시지) 선택**:
- 응답 대기 불필요
- 느슨한 결합이 중요
- 확장성/탄력성 중요
- 작업이 오래 걸리는 경우
- 예: 알림, 로그 처리, 주문 후처리

**트레이드오프**:
| 기준 | 동기식 | 비동기식 |
|------|--------|----------|
| 결합도 | 높음 | 낮음 |
| 복잡도 | 낮음 | 높음 (브로커 운영) |
| 장애 전파 | 연쇄 장애 위험 | 격리 가능 |
| 디버깅 | 용이 | 어려움 |

**실무 권장**: 하이브리드 - Query는 동기식, Event는 비동기식

**참고자료**
- [Microservices Communication](https://microservices.io/patterns/communication-style/)[^93]

</details>

[^93]: Microservices.io 통신 패턴

### SD-094

API 게이트웨이는 MSA에서 어떤 역할을 하며, 왜 필요한가요?

<details>
<summary>답변</summary>

**역할**:
1. **단일 진입점**: 클라이언트에게 하나의 엔드포인트 제공
2. **라우팅**: 요청을 적절한 서비스로 전달
3. **인증/인가**: 중앙화된 보안
4. **Rate Limiting**: 트래픽 제어
5. **응답 집계**: 여러 서비스 응답 병합

**참고자료**
- [Kong Gateway](https://docs.konghq.com/)[^94]

</details>

[^94]: Kong API Gateway 문서

### SD-095
서비스 메시(Service Mesh)는 무엇이며, API 게이트웨이나 기존 라이브러리 방식(예: Spring Cloud)의 서비스 간 통신과 어떻게 다른가요?

<details>
<summary>답변</summary>

**Service Mesh**: 서비스 간 통신을 담당하는 인프라 계층 (Sidecar Proxy)

**차이점**:
| 비교 | API Gateway | Library | Service Mesh |
|------|-------------|---------|--------------|
| 위치 | Edge | 애플리케이션 내 | Sidecar |
| 범위 | North-South | 애플리케이션 | East-West |
| 언어 | 무관 | 언어별 | 무관 |

**예시**: Istio, Linkerd

**참고자료**
- [Istio Documentation](https://istio.io/latest/docs/)[^95]

</details>

[^95]: Istio 공식 문서

---

총 질문 95개
