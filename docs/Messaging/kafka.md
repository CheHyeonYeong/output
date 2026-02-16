# Kafka / 카프카

> 카테고리: 메시징 시스템
> [← 면접 질문 목록으로 돌아가기](../interview.md)

---

## 📌 Kafka 기본 아키텍처

### KAFKA-001
Kafka의 기본 아키텍처와 주요 컴포넌트(Producer, Broker, Consumer, Topic 등)에 대해 설명해주세요.

<details>
<summary>답변</summary>

Kafka는 분산 스트리밍 플랫폼으로, 다음과 같은 주요 컴포넌트로 구성됩니다:

- **Producer**: 메시지를 생성하여 Topic에 발행하는 클라이언트
- **Broker**: 메시지를 저장하고 관리하는 Kafka 서버. 클러스터는 여러 Broker로 구성됨
- **Consumer**: Topic에서 메시지를 읽어 처리하는 클라이언트
- **Topic**: 메시지가 저장되는 논리적 채널. 카테고리 또는 피드 이름과 유사
- **Partition**: Topic을 물리적으로 분할한 단위. 병렬 처리와 확장성을 제공
- **ZooKeeper/KRaft**: 클러스터 메타데이터 관리 및 Controller 선출 담당 (KRaft는 Kafka 3.3+에서 프로덕션 사용 가능, 4.0에서 ZooKeeper 제거 예정)

메시지 흐름: Producer → Broker(Topic/Partition) → Consumer

**핵심 설계 원칙**
- 메시지는 파티션에 순차적으로 추가되는 불변 로그(immutable log) 형태로 저장
- Consumer는 Pull 방식으로 메시지를 가져옴 (Broker가 Push하지 않음)

**참고자료**
- [Apache Kafka Documentation](https://kafka.apache.org/documentation/#gettingStarted)[^1]

</details>

[^1]: Kafka 공식 문서 - Getting Started 섹션

### KAFKA-002
Kafka 아키텍처에서 Broker의 역할과 주요 기능은 무엇인가요?

<details>
<summary>답변</summary>

Kafka Broker는 Kafka 클러스터의 핵심 서버로, 다음과 같은 역할을 수행합니다:

- **메시지 저장**: Producer로부터 받은 메시지를 디스크에 영구 저장
- **메시지 전달**: Consumer 요청 시 저장된 메시지를 전달
- **파티션 관리**: 각 파티션의 리더 또는 팔로워 역할 수행
- **복제 관리**: 데이터 복제를 통한 내결함성 보장
- **클라이언트 요청 처리**: Producer/Consumer의 메타데이터 요청 처리

Broker는 Controller로 선출되어 파티션 리더 선출, 브로커 장애 감지 등 클러스터 관리 작업을 수행할 수 있습니다.

**참고자료**
- [Apache Kafka Documentation - Design](https://kafka.apache.org/documentation/#design)[^2]

</details>

[^2]: Kafka 공식 문서 - Design 섹션

### KAFKA-003
Kafka에서 Producer와 Consumer의 차이점 및 역할에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Producer (생산자)**
- 메시지를 생성하여 Kafka Topic에 발행
- 파티션 선택 전략 결정 (라운드 로빈, 키 기반 해싱 등)
- 배치 전송, 압축, 재시도 등 설정 가능
- ACK 설정으로 전송 신뢰성 조절

**Consumer (소비자)**
- Topic에서 메시지를 구독하고 처리
- Offset을 관리하여 처리 위치 추적
- Consumer Group에 속하여 병렬 처리 가능
- Pull 방식으로 메시지를 가져옴 (Consumer가 능동적으로 요청)

**핵심 차이점**: Producer는 데이터를 밀어넣고(push), Consumer는 데이터를 당겨옴(pull)

**참고자료**
- [Apache Kafka Documentation - Producers](https://kafka.apache.org/documentation/#theproducer)[^3]

</details>

[^3]: Kafka 공식 문서 - Producer/Consumer API

### KAFKA-004
Kafka에서 Partition과 Offset의 개념 및 활용 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Partition (파티션)**
- Topic을 물리적으로 분할한 단위
- 각 파티션은 순서가 보장된 불변의 메시지 시퀀스
- 병렬 처리의 기본 단위 (파티션 수 = 최대 Consumer 병렬성)
- 파티션 키를 통해 관련 메시지를 같은 파티션에 저장 가능

**Offset (오프셋)**
- 파티션 내 각 메시지의 고유 식별자 (순차 증가하는 정수)
- Consumer가 어디까지 읽었는지 추적하는 위치 표시
- 자동/수동 커밋을 통해 관리
- `__consumer_offsets` 토픽에 저장됨

**활용**: 파티션 수를 늘려 처리량 확장, Offset을 조절하여 메시지 재처리 가능

**참고자료**
- [Apache Kafka Documentation - Topics and Logs](https://kafka.apache.org/documentation/#intro_topics)[^4]

</details>

[^4]: Kafka 공식 문서 - Topics and Logs

---

## 📌 Kafka 메시지 보존과 처리

### KAFKA-005
Kafka의 메시지 보존 정책(retention policy)은 어떻게 작동하나요?

<details>
<summary>답변</summary>

Kafka는 두 가지 메시지 보존 정책을 제공합니다:

**시간 기반 보존 (Time-based)**
- `log.retention.hours/minutes/ms`: 메시지 보존 기간 설정
- 기본값: 7일 (168시간)
- 설정된 시간이 지나면 자동 삭제

**크기 기반 보존 (Size-based)**
- `log.retention.bytes`: 파티션당 최대 로그 크기
- 크기 초과 시 오래된 세그먼트부터 삭제

**세그먼트 관리**
- `log.segment.bytes`: 세그먼트 파일 크기 (기본 1GB)
- `log.segment.ms`: 세그먼트 롤링 주기
- 삭제는 세그먼트 단위로 수행됨

두 정책 모두 설정 시, 먼저 도달하는 조건에 따라 삭제됩니다.

**참고자료**
- [Apache Kafka Documentation - Log Retention](https://kafka.apache.org/documentation/#brokerconfigs_log.retention.hours)[^5]

</details>

[^5]: Kafka 공식 문서 - Broker Configurations

### KAFKA-006
Kafka에서 Consumer Group의 개념과 이를 통해 메시지 병렬 처리를 어떻게 구현하는지 설명해주세요.

<details>
<summary>답변</summary>

**Consumer Group 개념**
- 동일한 `group.id`를 공유하는 Consumer들의 논리적 그룹
- 그룹 내 각 Consumer는 서로 다른 파티션을 담당
- 하나의 파티션은 그룹 내 하나의 Consumer만 소비 가능

**병렬 처리 구현**
1. Topic의 파티션 수 설정 (예: 6개)
2. Consumer Group 생성 후 여러 Consumer 추가
3. Kafka가 자동으로 파티션을 Consumer에 분배 (Rebalancing)
4. 각 Consumer가 할당된 파티션을 독립적으로 처리

**주의사항**
- Consumer 수 > 파티션 수일 경우, 유휴 Consumer 발생
- 최적 병렬성: Consumer 수 = 파티션 수
- 서로 다른 Consumer Group은 같은 메시지를 독립적으로 소비 가능

**파티션 수 결정 시 트레이드오프**
- 파티션 증가: 병렬성/처리량 향상, 하지만 브로커 메모리 사용량 증가, 리밸런스 시간 증가, 리더 선출 시간 증가
- 파티션 감소: 운영 간소화, 하지만 병렬 처리 제한
- 경험적 가이드라인: (목표 처리량) / (단일 파티션 처리량) 또는 (Consumer 인스턴스 수)의 배수로 설정
- 파티션은 추가만 가능하고 삭제 불가능하므로 초기 설계 시 신중히 결정

**참고자료**
- [Apache Kafka Documentation - Consumer Groups](https://kafka.apache.org/documentation/#intro_consumers)[^6]

</details>

[^6]: Kafka 공식 문서 - Consumers 섹션

---

## 📌 Kafka 고가용성

### KAFKA-007
Kafka에서 리플리케이션(replication)의 필요성과 설정 방법은 무엇인가요?

<details>
<summary>답변</summary>

**리플리케이션의 필요성**
- 브로커 장애 시 데이터 손실 방지
- 고가용성(High Availability) 보장
- 무중단 서비스 운영 가능

**설정 방법**
- `replication.factor`: 토픽 생성 시 복제본 수 지정 (권장: 3)
- `default.replication.factor`: 기본 복제 계수 설정
- `min.insync.replicas`: 최소 동기화 복제본 수 (권장: 2)

**동작 방식**
- 각 파티션에는 1개의 Leader와 N-1개의 Follower
- Producer/Consumer는 기본적으로 Leader와 통신 (Kafka 2.4+에서는 `replica.selector.class` 설정으로 Follower 읽기 가능)
- Follower는 Leader로부터 데이터를 복제 (Pull 방식)
- Leader 장애 시 ISR 중 하나가 새 Leader로 선출

**Follower Fetching (Kafka 2.4+)**
- `replica.selector.class=org.apache.kafka.common.replica.RackAwareReplicaSelector` 설정으로 같은 랙의 복제본에서 읽기 가능
- 지리적으로 분산된 클러스터에서 읽기 지연 시간 감소

```bash
kafka-topics.sh --create --topic my-topic \
  --partitions 3 --replication-factor 3
```

**참고자료**
- [Apache Kafka Documentation - Replication](https://kafka.apache.org/documentation/#replication)[^7]

</details>

[^7]: Kafka 공식 문서 - Replication 섹션

### KAFKA-008
Kafka의 리플리케이션 구조에서 장애 복구(failover) 메커니즘은 어떻게 동작하나요?

<details>
<summary>답변</summary>

**Leader 선출 과정**
1. Controller가 브로커 장애 감지 (ZooKeeper/KRaft 통해)
2. 장애 브로커가 담당하던 파티션의 ISR 목록 확인
3. ISR 중 하나를 새로운 Leader로 선출
4. 메타데이터 업데이트 및 클라이언트에 전파

**Failover 설정**
- `unclean.leader.election.enable`: ISR 외 복제본의 리더 승격 허용 여부 (기본: false, Kafka 0.11+)
- `leader.imbalance.check.interval.seconds`: 리더 재분배 주기
- `controlled.shutdown.enable`: 정상 종료 시 리더 이전 여부

**트레이드오프: unclean.leader.election.enable**
- `false` (기본값, 권장): 데이터 일관성 우선. ISR이 모두 장애 시 파티션 불가용
- `true`: 가용성 우선. 데이터 손실 가능하지만 서비스 중단 최소화
- 결정 기준: 데이터 손실 vs 서비스 중단 중 어떤 것이 더 치명적인지에 따라 선택

**클라이언트 복구**
- Producer: 재시도 로직으로 새 Leader에 재전송
- Consumer: 새 Leader로부터 이어서 소비

**중요**: `unclean.leader.election.enable=true`는 데이터 손실 가능성이 있음
- ISR 외의 복제본이 리더가 되면 복제되지 않은 메시지 손실
- 가용성 vs 데이터 일관성의 트레이드오프에서 가용성을 선택하는 경우에만 활성화

**참고자료**
- [Apache Kafka Documentation - Leader Election](https://kafka.apache.org/documentation/#design_replicatedlog)[^8]

</details>

[^8]: Kafka 공식 문서 - Replicated Logs

---

## 📌 Kafka Connect와 Streams

### KAFKA-009
Kafka Connect의 역할과 이를 활용한 데이터 파이프라인 구축 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Kafka Connect 역할**
- 외부 시스템과 Kafka 간 데이터 스트리밍을 위한 프레임워크
- 코드 작성 없이 설정만으로 데이터 파이프라인 구축
- Source Connector: 외부 → Kafka로 데이터 수집
- Sink Connector: Kafka → 외부로 데이터 전송

**데이터 파이프라인 구축 방법**
1. Connect 클러스터 설정 (standalone/distributed 모드)
2. Connector 플러그인 설치 (JDBC, S3, Elasticsearch 등)
3. Connector 설정 JSON 작성
4. REST API로 Connector 배포

```json
{
  "name": "mysql-source",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "connection.url": "jdbc:mysql://localhost:3306/mydb",
    "topic.prefix": "mysql-",
    "poll.interval.ms": "1000"
  }
}
```

**참고자료**
- [Apache Kafka Documentation - Connect](https://kafka.apache.org/documentation/#connect)[^9]

</details>

[^9]: Kafka 공식 문서 - Kafka Connect

### KAFKA-010
Kafka 생태계의 스트림 처리 도구인 Kafka Streams와 KSQL의 차이점 및 각각의 사용 사례에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Kafka Streams**
- Java/Scala 라이브러리 (별도 클러스터 불필요)
- 복잡한 스트림 처리 로직 구현 가능
- 마이크로서비스에 내장하여 사용
- 사용 사례: 실시간 데이터 변환, 집계, 조인

**KSQL (ksqlDB)**
- SQL 기반 스트리밍 쿼리 엔진
- 별도의 KSQL 서버 클러스터 필요
- 코드 없이 SQL만으로 스트림 처리
- 사용 사례: 빠른 프로토타이핑, 데이터 분석, 간단한 ETL

**주요 차이점**
| 구분 | Kafka Streams | KSQL |
|------|---------------|------|
| 언어 | Java/Scala | SQL |
| 배포 | 애플리케이션 내장 | 별도 클러스터 |
| 복잡도 | 높은 유연성 | 낮은 진입 장벽 |
| 적합 대상 | 개발자 | 데이터 분석가 |

**참고자료**
- [Apache Kafka Documentation - Streams](https://kafka.apache.org/documentation/streams/)[^10]

</details>

[^10]: Kafka 공식 문서 - Kafka Streams

---

## 📌 Kafka 메시지 전달 보장

### KAFKA-011
Kafka에서 Exactly-Once Semantics를 구현하는 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Exactly-Once Semantics (EOS) 구현 방법**

**1. Idempotent Producer**
- `enable.idempotence=true` 설정 (Kafka 3.0+에서는 기본값 true)
- Producer ID와 시퀀스 번호로 중복 메시지 방지
- 단일 파티션 내에서 exactly-once 보장
- 요구사항: `acks=all`, `retries > 0`, `max.in.flight.requests.per.connection <= 5`

**트레이드오프**: Exactly-once는 추가적인 메타데이터 교환과 트랜잭션 오버헤드로 인해 처리량이 약 3-20% 감소할 수 있음. 지연 시간에 민감하거나 처리량이 최우선인 경우 at-least-once + 멱등성 처리가 더 적합할 수 있음

**2. Transactional API**
- 여러 파티션에 걸친 원자적 쓰기
- `transactional.id` 설정 필요
```java
producer.initTransactions();
producer.beginTransaction();
producer.send(record1);
producer.send(record2);
producer.commitTransaction();
```

**3. Consumer 설정**
- `isolation.level=read_committed`: 커밋된 트랜잭션만 읽기
- 수동 오프셋 커밋으로 처리 완료 후 커밋

**Kafka Streams**
- `processing.guarantee=exactly_once_v2` 설정으로 자동 EOS 지원 (Kafka 2.5+에서 v2 권장, 이전 exactly_once는 deprecated)

**주의사항**
- Exactly-once는 Kafka 내부에서만 보장됨. 외부 시스템과의 연동 시에는 해당 시스템도 트랜잭션을 지원해야 완전한 EOS 달성 가능
- Consumer의 `isolation.level=read_committed` 설정 필수

**참고자료**
- [Apache Kafka Documentation - Transactions](https://kafka.apache.org/documentation/#semantics)[^11]

</details>

[^11]: Kafka 공식 문서 - Message Delivery Semantics

### KAFKA-012
Kafka Producer 측에서 발생할 수 있는 메시지 중복 문제를 Exactly-Once Semantics 관점에서 어떻게 해결할 수 있나요?

<details>
<summary>답변</summary>

**중복 발생 원인**
- 네트워크 오류로 ACK 미수신 후 재전송
- Producer 재시작 후 동일 메시지 재전송
- 브로커 장애 복구 과정에서의 중복

**해결 방법**

**1. Idempotent Producer 활성화**
```properties
enable.idempotence=true  # Kafka 3.0+에서는 기본값 true
acks=all                 # 필수 조건
retries=Integer.MAX_VALUE
max.in.flight.requests.per.connection=5  # 1~5 사이 값 필수
```
- PID(Producer ID) + Sequence Number로 중복 감지 및 무시
- `max.in.flight.requests.per.connection`이 5 이하일 때만 순서 보장과 함께 멱등성 동작

**2. Transactional Producer 사용**
- 트랜잭션 단위로 원자적 전송 보장
- 장애 복구 시에도 중복 방지

**3. Consumer 측 멱등성 처리**
- 메시지에 고유 ID 포함
- 처리 전 중복 체크 (DB unique constraint, Redis 등)
- 멱등한 처리 로직 설계

**참고자료**
- [Apache Kafka Documentation - Idempotent Producer](https://kafka.apache.org/documentation/#producerconfigs_enable.idempotence)[^12]

</details>

[^12]: Kafka 공식 문서 - Producer Configs

### KAFKA-013
Kafka Consumer가 재시작될 때 오프셋(offset) 관리를 어떻게 수행하며, 메시지 전달 보장은 어떻게 유지하나요?

<details>
<summary>답변</summary>

**Offset 저장 위치**
- 내부 토픽 `__consumer_offsets`에 저장
- Consumer Group ID와 Topic-Partition 별로 관리

**재시작 시 동작**
1. Consumer가 Group에 조인
2. 마지막 커밋된 Offset 조회
3. 해당 Offset부터 메시지 소비 재개

**Offset Reset 정책 (auto.offset.reset)**
- `earliest`: 가장 처음 Offset부터 시작 (토픽의 모든 데이터 재처리)
- `latest`: 가장 최근 Offset부터 시작 (기본값, 새 메시지만 처리)
- `none`: Offset 없으면 예외 발생 (명시적 오프셋 관리 필요 시)

**트레이드오프**
- `earliest`: 데이터 손실 없음, 하지만 대량 재처리로 인한 Consumer Lag 발생 가능
- `latest`: 빠른 시작, 하지만 Consumer 중단 기간의 메시지 손실 가능

**커밋 전략**
```properties
# 자동 커밋
enable.auto.commit=true
auto.commit.interval.ms=5000

# 수동 커밋 (권장)
enable.auto.commit=false
```

**수동 커밋 방식**
- `commitSync()`: 동기 커밋 (블로킹)
- `commitAsync()`: 비동기 커밋 (논블로킹)

**참고자료**
- [Apache Kafka Documentation - Consumer Configs](https://kafka.apache.org/documentation/#consumerconfigs)[^13]

</details>

[^13]: Kafka 공식 문서 - Consumer Configurations

---

## 📌 Kafka 로그 관리

### KAFKA-014
Kafka 로그 컴팩션(log compaction)이란 무엇이며, 어떤 상황에서 사용되나요?

<details>
<summary>답변</summary>

**Log Compaction 개념**
- 동일한 키를 가진 메시지 중 최신 값만 유지하는 보존 정책
- 키-값 저장소처럼 각 키의 최종 상태만 보관
- 삭제가 아닌 압축을 통해 로그 크기 감소

**설정 방법**
```properties
cleanup.policy=compact          # 컴팩션 활성화
cleanup.policy=compact,delete   # 둘 다 적용
min.cleanable.dirty.ratio=0.5   # 컴팩션 트리거 비율
```

**사용 사례**
- **CDC (Change Data Capture)**: DB 변경 이벤트 저장
- **상태 저장소**: 사용자 설정, 세션 정보
- **Kafka Streams State Store**: 내부 상태 복원
- **Consumer Offset 토픽**: `__consumer_offsets`

**Tombstone 레코드**
- 키에 null 값을 전송하면 해당 키 삭제 표시
- `delete.retention.ms` 후 완전 삭제 (기본값: 24시간)

**Log Compaction 트레이드오프**
- 장점: 스토리지 절약, 빠른 복구(최종 상태만 필요)
- 단점: 이력 조회 불가, 컴팩션 중 CPU/I/O 사용량 증가
- `min.cleanable.dirty.ratio`: 낮을수록 자주 컴팩션 (CPU 사용량 증가), 높을수록 스토리지 사용량 증가

**주의사항**
- 키가 null인 메시지는 컴팩션 대상이 아니며 일반 retention 정책 적용
- 컴팩션은 active segment가 아닌 이전 segment에만 적용됨

**참고자료**
- [Apache Kafka Documentation - Log Compaction](https://kafka.apache.org/documentation/#compaction)[^14]

</details>

[^14]: Kafka 공식 문서 - Log Compaction

---

## 📌 Kafka 성능 튜닝

### KAFKA-015
Kafka 성능 튜닝을 위한 주요 고려 사항에는 어떤 것들이 있나요?

<details>
<summary>답변</summary>

**Producer 튜닝**
- `batch.size`: 배치 크기 증가 (기본 16KB → 64KB 이상)
- `linger.ms`: 배치 대기 시간 (0 → 5-100ms)
- `compression.type`: 압축 활성화 (lz4, snappy)
- `buffer.memory`: 버퍼 메모리 확대

**Consumer 튜닝**
- `fetch.min.bytes`: 최소 fetch 크기 증가
- `fetch.max.wait.ms`: 대기 시간 조정
- `max.poll.records`: 폴링당 레코드 수 조정

**Broker 튜닝**
- `num.io.threads`: I/O 스레드 수 (디스크 수에 맞게)
- `num.network.threads`: 네트워크 스레드 수
- `socket.send.buffer.bytes/socket.receive.buffer.bytes`: 소켓 버퍼 크기
- `log.flush.interval.messages`: 디스크 플러시 간격

**일반 고려사항**
- 파티션 수 적정 설계 (브로커당 2,000~4,000개 이하 권장)
- JVM 힙 설정 (6-8GB 권장, 과도한 힙은 GC 지연 유발)
- 페이지 캐시를 위한 OS 메모리 확보 (Kafka 성능의 핵심)

**성능 튜닝의 트레이드오프**
- `batch.size` 증가: 처리량 향상 vs 지연시간 증가
- `linger.ms` 증가: 배치 효율 vs 첫 메시지 지연
- `compression.type`: 네트워크 절약 vs CPU 사용량 증가
- `acks=all`: 데이터 안정성 vs 지연시간 증가

**권장 접근법**: 기본값으로 시작하여 모니터링 기반으로 병목 지점을 식별한 후 점진적 튜닝

**참고자료**
- [Apache Kafka Documentation - Configuration](https://kafka.apache.org/documentation/#configuration)[^15]

</details>

[^15]: Kafka 공식 문서 - Configuration

### KAFKA-016
Kafka 클러스터 성능 튜닝을 위해 네트워크 및 하드웨어 설정에서 고려해야 할 점은 무엇인가요?

<details>
<summary>답변</summary>

**네트워크 설정**
- 브로커 간 전용 네트워크 대역폭 확보 (10Gbps 권장)
- 클라이언트-브로커 간 낮은 레이턴시 네트워크
- `socket.send.buffer.bytes`, `socket.receive.buffer.bytes` 튜닝
- TCP 설정 최적화 (net.core.rmem_max 등)

**스토리지**
- SSD 권장 (처리량 향상)
- RAID 10 또는 JBOD 구성
- 여러 디스크에 로그 디렉토리 분산 (`log.dirs`)
- XFS 파일시스템 권장

**메모리**
- JVM 힙: 6-8GB (과도한 GC 방지)
- 나머지는 OS 페이지 캐시용으로 확보
- 총 메모리: 32-64GB 권장

**CPU**
- 압축 사용 시 CPU 코어 중요
- 최소 8코어 이상 권장

**파티션/브로커 비율**
- 브로커당 파티션 수 제한 (ZooKeeper: 4,000개 이하 권장, KRaft: 더 많은 파티션 지원)
- 리더 파티션 균등 분배
- 전체 클러스터 파티션 수도 고려 (ZooKeeper 모드: 수십만 개 한계, KRaft: 수백만 개 가능)

**하드웨어 선택 트레이드오프**
- **SSD vs HDD**: SSD는 랜덤 I/O 성능 향상, 하지만 Kafka는 순차 I/O 중심이므로 HDD도 적합. 비용 대비 용량이 중요하면 HDD 고려
- **메모리**: JVM 힙보다 페이지 캐시용 메모리가 더 중요. 총 메모리의 절반 이상을 OS에 남겨둘 것
- **네트워크**: 복제 팩터와 Consumer 수에 따라 필요 대역폭이 배수로 증가

**참고자료**
- [Apache Kafka Documentation - Hardware and OS](https://kafka.apache.org/documentation/#hwandos)[^16]

</details>

[^16]: Kafka 공식 문서 - Hardware and OS

### KAFKA-017
Kafka에서 성능 튜닝과 함께 데이터 손실을 방지하기 위한 전략은 무엇인가요?

<details>
<summary>답변</summary>

**Producer 설정**
- `acks=all`: 모든 ISR 복제 완료 후 ACK
- `retries`: 충분한 재시도 횟수 설정
- `enable.idempotence=true`: 멱등성 활성화

**Broker 설정**
- `replication.factor=3`: 3개 이상 복제본
- `min.insync.replicas=2`: 최소 2개 동기화 필수
- `unclean.leader.election.enable=false`: 비동기 복제본의 리더 승격 방지
- `default.replication.factor=3`: 기본 복제 계수

**Consumer 설정**
- `enable.auto.commit=false`: 수동 오프셋 커밋
- 처리 완료 후 커밋 (at-least-once 보장)

**운영 전략**
- 다중 데이터센터 복제 (MirrorMaker 2)
- 정기적인 백업 및 복구 테스트
- 모니터링: Under-replicated partitions 감시

**조합 예시**
```properties
acks=all
min.insync.replicas=2
replication.factor=3
```
→ 최대 1개 브로커 장애까지 쓰기 가능, 데이터 손실 없음

**함정 주의**
- `min.insync.replicas=2`, `replication.factor=3`일 때 2개 브로커 장애 시 쓰기 불가 (읽기는 가능)
- `acks=all`이지만 `min.insync.replicas=1`이면 Leader 한 대만으로 쓰기 성공 가능

**데이터 손실 방지 vs 가용성 트레이드오프**
| 설정 | 허용 가능한 브로커 장애 (쓰기) | 데이터 안정성 |
|------|------------------------------|--------------|
| RF=3, ISR=1 | 2개 | 낮음 |
| RF=3, ISR=2 | 1개 | 높음 |
| RF=3, ISR=3 | 0개 | 최고 (하지만 가용성 낮음) |

**참고자료**
- [Apache Kafka Documentation - Durability](https://kafka.apache.org/documentation/#design_ha)[^17]

</details>

[^17]: Kafka 공식 문서 - High Availability

---

## 📌 Kafka 보안

### KAFKA-018
Kafka의 ACL(Access Control List) 및 보안 설정 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**ACL 개념**
- 리소스(Topic, Consumer Group 등)에 대한 접근 권한 제어
- Principal(사용자/서비스)별로 허용/거부 규칙 정의

**ACL 구성 요소**
- **Principal**: 접근 주체 (User:alice)
- **Resource**: 대상 리소스 (Topic:orders)
- **Operation**: 허용 작업 (Read, Write, Create 등)
- **Permission**: Allow 또는 Deny

**설정 방법**

1. **Broker 설정**
```properties
authorizer.class.name=kafka.security.authorizer.AclAuthorizer
super.users=User:admin
allow.everyone.if.no.acl.found=false
```

2. **ACL 추가**
```bash
kafka-acls.sh --bootstrap-server localhost:9092 \
  --add --allow-principal User:producer \
  --operation Write --topic orders

kafka-acls.sh --bootstrap-server localhost:9092 \
  --add --allow-principal User:consumer \
  --operation Read --topic orders --group my-group
```

3. **ACL 조회**
```bash
kafka-acls.sh --bootstrap-server localhost:9092 --list
```

**참고자료**
- [Apache Kafka Documentation - Authorization](https://kafka.apache.org/documentation/#security_authz)[^18]

</details>

[^18]: Kafka 공식 문서 - Authorization and ACLs

### KAFKA-019
Kafka에서 ACL 기반 접근 제어와 함께 SSL/TLS 및 SASL을 사용한 암호화 및 인증 구성 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**SSL/TLS (전송 암호화)**

1. **인증서 생성** (keytool 사용)
```bash
keytool -genkey -keystore kafka.server.keystore.jks \
  -alias localhost -validity 365 -keyalg RSA
```

2. **Broker 설정**
```properties
listeners=SSL://0.0.0.0:9093
ssl.keystore.location=/var/ssl/kafka.server.keystore.jks
ssl.keystore.password=password
ssl.key.password=password
ssl.truststore.location=/var/ssl/kafka.server.truststore.jks
ssl.truststore.password=password
```

**SASL (인증)**

1. **SASL/PLAIN** (간단한 사용자/비밀번호)
```properties
listeners=SASL_SSL://0.0.0.0:9094
sasl.enabled.mechanisms=PLAIN
```

2. **SASL/SCRAM** (안전한 비밀번호 저장)
```bash
kafka-configs.sh --zookeeper localhost:2181 --alter \
  --add-config 'SCRAM-SHA-256=[password=secret]' \
  --entity-type users --entity-name alice
```

3. **SASL/GSSAPI** (Kerberos)
- 엔터프라이즈 환경에서 주로 사용
- Kerberos KDC 연동 필요

**권장 조합**: SASL_SSL (인증 + 암호화)

**참고자료**
- [Apache Kafka Documentation - Security](https://kafka.apache.org/documentation/#security)[^19]

</details>

[^19]: Kafka 공식 문서 - Security

---

## 📌 Kafka 클러스터 안정성

### KAFKA-020
Kafka Broker 재시작 시 클러스터 안정성을 유지하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Rolling Restart 절차**
1. 브로커의 `controlled.shutdown.enable=true` 확인
2. 한 번에 하나의 브로커만 재시작
3. ISR이 복구될 때까지 대기 후 다음 브로커 진행

**안정성 유지 설정**
```properties
# Broker 설정
controlled.shutdown.enable=true
controlled.shutdown.max.retries=3
min.insync.replicas=2

# Topic 설정
replication.factor=3
```

**재시작 전 확인 사항**
```bash
# Under-replicated 파티션 확인
kafka-topics.sh --describe --under-replicated-partitions

# ISR 상태 확인
kafka-topics.sh --describe --topic my-topic
```

**모범 사례**
- 피크 시간 외 재시작 수행
- 리더 재분배 자동화 (`auto.leader.rebalance.enable=true`)
- 모니터링 알림 설정
- 충분한 복제본 수 유지 (3개 이상)

**참고자료**
- [Apache Kafka Documentation - Broker Configs](https://kafka.apache.org/documentation/#brokerconfigs)[^20]

</details>

[^20]: Kafka 공식 문서 - Broker Configurations

### KAFKA-021
Kafka 리플리케이션에서 In-Sync Replica(ISR)의 역할과 브로커 재시작 시 클러스터 안정성에 미치는 영향은 무엇인가요?

<details>
<summary>답변</summary>

**ISR (In-Sync Replica) 개념**
- Leader와 동기화된 Replica들의 집합
- Leader를 포함한 "충분히 최신 상태"인 복제본들
- `replica.lag.time.max.ms` 내에 복제된 복제본만 ISR에 포함

**ISR의 역할**
1. **리더 선출 후보**: Leader 장애 시 ISR 중에서 새 Leader 선출
2. **ACK 대상**: `acks=all` 시 ISR 모두에 복제 완료 후 응답
3. **데이터 일관성**: 동기화된 복제본만 서비스 참여

**중요성**
- ISR 크기가 `min.insync.replicas` 미만이면 Producer 쓰기 실패 (`NotEnoughReplicasException`)
- ISR 축소는 데이터 손실 위험 신호
- Under-replicated 파티션 모니터링 필수

**ISR 관련 함정 주의**
- ISR은 "완전히 동기화된" 복제본이 아니라 "충분히 최신" 복제본을 의미
- `replica.lag.time.max.ms` 내에 복제 요청을 보낸 복제본은 ISR에 포함됨
- 따라서 ISR 내 복제본도 약간의 지연이 있을 수 있음

**관련 설정**
```properties
min.insync.replicas=2           # 최소 ISR 수
replica.lag.time.max.ms=30000   # ISR 판단 기준 (기본 30초)
```

**모니터링 지표**
- `kafka.server:type=ReplicaManager,name=UnderReplicatedPartitions`
- 0이 아니면 즉시 조사 필요

**참고자료**
- [Apache Kafka Documentation - ISR](https://kafka.apache.org/documentation/#design_replicatedlog)[^21]

</details>

[^21]: Kafka 공식 문서 - Replicated Logs

---

## 📌 Kafka 메시지 순서 보장

### KAFKA-022
Kafka에서 메시지의 순서를 보장하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**파티션 내 순서 보장**
- Kafka는 **단일 파티션 내에서만** 메시지 순서 보장
- 파티션 간에는 순서 보장 없음

**순서 보장 방법**

1. **파티션 키 사용**
```java
// 같은 키를 가진 메시지는 같은 파티션으로 전송
producer.send(new ProducerRecord<>("topic", "userId-123", message));
```

2. **단일 파티션 토픽** (처리량 제한됨)
```bash
kafka-topics.sh --create --topic ordered-topic --partitions 1
```

3. **Producer 설정**
```properties
# 멱등성 활성화 시 순서 보장 (실패 시에도)
enable.idempotence=true
max.in.flight.requests.per.connection=5  # 1~5 사이: 멱등성과 함께 순서 보장
```

**주의사항**
- `max.in.flight.requests.per.connection > 1`이고 멱등성 비활성화 시, 재시도로 인해 순서 역전 가능
- 멱등성 활성화 시에도 `max.in.flight.requests.per.connection > 5`이면 순서 보장 불가
- Consumer는 단일 스레드로 파티션 처리 권장

**함정 주의**: "Kafka는 순서를 보장한다"는 부분적으로만 맞음
- 정확히는 "단일 파티션 내에서, 올바른 Producer 설정 시에만" 순서 보장
- 파티션 간 순서 보장 필요 시 단일 파티션 사용 또는 애플리케이션 레벨 타임스탬프 기반 정렬 필요

**참고자료**
- [Apache Kafka Documentation - Message Ordering](https://kafka.apache.org/documentation/#design_quotasandguarantees)[^22]

</details>

[^22]: Kafka 공식 문서 - Message Ordering Guarantees

### KAFKA-023
Kafka Producer의 ACK 설정 옵션(0, 1, all)이 메시지 순서 보장과 신뢰성에 미치는 영향에 대해 설명해주세요.

<details>
<summary>답변</summary>

**ACK 설정 옵션**

**acks=0**
- Producer는 브로커 응답을 기다리지 않음
- 가장 빠른 전송 속도
- 메시지 손실 가능성 높음
- 사용 사례: 로그, 메트릭 등 손실 허용 데이터

**acks=1**
- Leader가 로컬 로그에 기록 후 응답
- Leader 장애 시 데이터 손실 가능 (Follower 복제 전)
- 적절한 성능과 신뢰성 균형
- 사용 사례: 일반적인 애플리케이션

**acks=all (또는 -1)**
- 모든 ISR이 복제 완료 후 응답
- 가장 높은 내구성 보장
- 가장 느린 전송 속도
- `min.insync.replicas`와 함께 사용 권장
- 사용 사례: 금융 데이터, 주문 등 중요 데이터

**비교 요약**
| ACK | 속도 | 내구성 | 손실 위험 |
|-----|------|--------|-----------|
| 0 | 최고 | 없음 | 높음 |
| 1 | 중간 | Leader만 | 중간 |
| all | 낮음 | ISR 전체 | 낮음 |

**운영 환경 트레이드오프 가이드**
- **acks=0**: 로그, 메트릭 등 손실 허용 가능한 대량 데이터에 적합. 처리량 최대화가 목표일 때
- **acks=1**: 대부분의 일반 애플리케이션에 적합. 처리량과 내구성의 균형
- **acks=all + min.insync.replicas=2**: 금융, 주문 등 데이터 손실이 허용되지 않는 경우. 지연시간 증가 감수

**주의**: `acks=all`이라도 `min.insync.replicas=1`이면 Leader 한 대만으로도 쓰기 성공 가능하므로 실질적으로 acks=1과 동일한 내구성

**참고자료**
- [Apache Kafka Documentation - Producer Configs](https://kafka.apache.org/documentation/#producerconfigs_acks)[^23]

</details>

[^23]: Kafka 공식 문서 - Producer Configurations (acks)

---

## 📌 Kafka vs 다른 메시징 시스템

### KAFKA-024
Kafka와 RabbitMQ 같은 다른 메시징 시스템의 주요 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**아키텍처 차이**

| 구분 | Kafka | RabbitMQ |
|------|-------|----------|
| 모델 | 로그 기반 | 메시지 브로커 |
| 메시지 저장 | 영구 저장 (retention) | 소비 후 삭제 |
| 소비 방식 | Pull (Consumer가 가져감) | Push (Broker가 전달) |
| 프로토콜 | 자체 프로토콜 | AMQP |

**주요 차이점**

1. **메시지 재처리**
   - Kafka: Offset 조정으로 재처리 가능 (메시지는 retention 기간 동안 보관)
   - RabbitMQ: 기본적으로 소비 후 삭제 (Dead Letter Queue로 재처리 가능)

2. **처리량**
   - Kafka: 높은 처리량에 최적화 (초당 수백만 건), 순차 I/O 활용
   - RabbitMQ: 중간 처리량, 낮은 지연시간 (밀리초 단위)

3. **Consumer 확장**
   - Kafka: 파티션 기반 병렬 처리 (파티션 수가 병렬성 상한)
   - RabbitMQ: 큐 경쟁 방식 (Consumer 수에 제한 없음)

4. **사용 사례**
   - Kafka: 로그 수집, 이벤트 스트리밍, 데이터 파이프라인, 이벤트 소싱
   - RabbitMQ: 작업 큐, RPC, 복잡한 라우팅, 마이크로서비스 통신

**선택 기준**
- 대용량 스트리밍, 이벤트 재처리, 장기 보관 → Kafka
- 복잡한 라우팅, 유연한 메시징 패턴, 낮은 지연시간 우선 → RabbitMQ
- 둘 다 필요한 경우: Kafka + RabbitMQ 혼합 아키텍처도 고려

**함정 주의**: "Kafka가 RabbitMQ보다 항상 좋다"는 잘못된 일반화
- 단순한 작업 큐나 RPC 패턴에는 RabbitMQ가 더 적합할 수 있음
- 운영 복잡도, 팀 경험, 기존 인프라도 고려 필요

**참고자료**
- [Apache Kafka Documentation - Introduction](https://kafka.apache.org/documentation/#introduction)[^24]

</details>

[^24]: Kafka 공식 문서 - Introduction

---

## 📌 Kafka 배포와 처리 패턴

### KAFKA-025
Kafka 클러스터의 Zero Downtime 배포 전략에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Rolling Upgrade 전략**

1. **사전 준비**
   - 복제 계수 3 이상 확인
   - `min.insync.replicas=2` 설정
   - Under-replicated 파티션 없음 확인

2. **브로커 업그레이드 절차**
```bash
# 1. 한 브로커 정상 종료
kafka-server-stop.sh

# 2. 새 버전 설치 및 설정

# 3. 브로커 시작
kafka-server-start.sh config/server.properties

# 4. ISR 복구 확인 후 다음 브로커 진행
```

3. **클라이언트 호환성**
   - `inter.broker.protocol.version` 점진적 업그레이드
   - `log.message.format.version` 설정 유지 후 변경

**설정 예시**
```properties
# 업그레이드 중 (이전 버전 유지)
inter.broker.protocol.version=3.0
log.message.format.version=3.0

# 모든 브로커 업그레이드 후 제거
```

**모니터링**
- ISR 상태 지속 확인
- Consumer lag 모니터링
- 클라이언트 에러 확인

**참고자료**
- [Apache Kafka Documentation - Upgrading](https://kafka.apache.org/documentation/#upgrade)[^25]

</details>

[^25]: Kafka 공식 문서 - Upgrading

### KAFKA-026
Kafka Streams를 활용한 스트림 처리와 배치 처리의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**배치 처리 (Batch Processing)**
- 일정 기간 데이터를 모아서 한 번에 처리
- 높은 처리량, 높은 지연시간
- Kafka 활용: Consumer가 주기적으로 대량 데이터 소비

**스트림 처리 (Stream Processing)**
- 데이터 도착 즉시 실시간 처리
- 낮은 지연시간, 연속적인 처리
- Kafka 활용: Kafka Streams, KSQL

**Kafka에서의 차이**

| 구분 | 배치 처리 | 스트림 처리 |
|------|----------|-------------|
| 도구 | Consumer + Spark/Flink | Kafka Streams, KSQL |
| 지연 | 분~시간 | 밀리초~초 |
| 윈도우 | 고정 시간 범위 | 텀블링/슬라이딩/세션 |
| 상태 | 외부 저장소 | State Store (RocksDB) |

**Kafka Streams의 스트림 처리 특징**
```java
StreamsBuilder builder = new StreamsBuilder();
builder.stream("input-topic")
    .filter((k, v) -> v.contains("important"))
    .mapValues(v -> v.toUpperCase())
    .to("output-topic");
```

**Lambda 아키텍처**
- Kafka를 중심으로 배치 + 스트림 동시 처리
- 배치 레이어: 정확한 결과
- 스피드 레이어: 실시간 근사 결과

**참고자료**
- [Apache Kafka Documentation - Streams Concepts](https://kafka.apache.org/documentation/streams/core-concepts)[^26]

</details>

[^26]: Kafka 공식 문서 - Streams Core Concepts

### KAFKA-027
Kafka에서 ACL 기반 접근 제어와 Quota 설정을 활용하여 멀티 테넌시(Multi-Tenancy)를 어떻게 지원하나요?

<details>
<summary>답변</summary>

**멀티 테넌시 구현 방법**

1. **토픽 네이밍 컨벤션**
```
tenant-a.orders
tenant-b.orders
```

2. **ACL 기반 접근 제어**
```bash
# 테넌트 A는 자신의 토픽만 접근 가능
kafka-acls.sh --add --allow-principal User:tenant-a \
  --operation All --topic 'tenant-a.*' --resource-pattern-type prefixed
```

3. **Quota 설정**
```bash
# 테넌트별 처리량 제한
kafka-configs.sh --alter --add-config 'producer_byte_rate=10485760,consumer_byte_rate=20971520' \
  --entity-type users --entity-name tenant-a
```

**Quota 종류**
- `producer_byte_rate`: 초당 Producer 전송량 제한
- `consumer_byte_rate`: 초당 Consumer 수신량 제한
- `request_percentage`: CPU 사용률 제한

**격리 수준**
| 방식 | 격리 수준 | 운영 복잡도 |
|------|----------|-------------|
| 네이밍 컨벤션 | 낮음 | 낮음 |
| ACL + Quota | 중간 | 중간 |
| 별도 클러스터 | 높음 | 높음 |

**모범 사례**
- 테넌트별 전용 Consumer Group
- 모니터링 대시보드 분리
- 네트워크 격리 (VLAN/VPC)

**참고자료**
- [Apache Kafka Documentation - Quotas](https://kafka.apache.org/documentation/#design_quotas)[^27]

</details>

[^27]: Kafka 공식 문서 - Quotas

---

## 📌 Kafka 모니터링

### KAFKA-028
Kafka 클러스터 모니터링을 위한 주요 지표와 사용 도구에는 어떤 것들이 있나요?

<details>
<summary>답변</summary>

**주요 모니터링 지표**

**Broker 지표**
- `UnderReplicatedPartitions`: 복제 지연 파티션 수 (0이어야 함)
- `ActiveControllerCount`: 활성 컨트롤러 수 (클러스터당 1)
- `OfflinePartitionsCount`: 오프라인 파티션 수 (0이어야 함)
- `RequestsPerSec`: 초당 요청 수
- `BytesInPerSec/BytesOutPerSec`: 네트워크 처리량

**Producer 지표**
- `record-send-rate`: 초당 전송 레코드 수
- `record-error-rate`: 전송 실패율
- `request-latency-avg`: 평균 요청 지연시간

**Consumer 지표**
- `records-lag-max`: 최대 Consumer Lag
- `records-consumed-rate`: 초당 소비 레코드 수
- `commit-latency-avg`: 오프셋 커밋 지연시간

**모니터링 도구**
- **JMX**: Kafka 기본 메트릭 노출
- **Prometheus + Grafana**: 시계열 메트릭 수집 및 시각화
- **Kafka Manager/CMAK**: 클러스터 관리 UI
- **Confluent Control Center**: 상용 모니터링 솔루션
- **Burrow**: Consumer Lag 전문 모니터링

**참고자료**
- [Apache Kafka Documentation - Monitoring](https://kafka.apache.org/documentation/#monitoring)[^28]

</details>

[^28]: Kafka 공식 문서 - Monitoring

### KAFKA-029
Kafka Consumer Group의 Rebalance 과정과 이를 최적화하기 위한 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Rebalance 발생 조건**
- Consumer 그룹에 새 Consumer 참여/이탈
- Consumer가 heartbeat 미전송 (세션 타임아웃)
- 토픽 파티션 수 변경
- 정규식 구독 토픽 변경

**Rebalance 과정**
1. Group Coordinator가 리밸런스 트리거
2. 모든 Consumer가 파티션 할당 해제 (Stop-the-World)
3. Consumer Leader가 새 파티션 할당 계획 수립
4. 각 Consumer에 파티션 재할당
5. 소비 재개

**최적화 방법**

1. **Cooperative Rebalancing (증분 리밸런스)**
```properties
partition.assignment.strategy=org.apache.kafka.clients.consumer.CooperativeStickyAssignor
```
- 전체 중단 없이 점진적 재할당

2. **Static Membership**
```properties
group.instance.id=consumer-1
session.timeout.ms=300000
```
- Consumer 재시작 시 즉시 파티션 복구

3. **세션 타임아웃 최적화**
```properties
session.timeout.ms=45000
heartbeat.interval.ms=15000
max.poll.interval.ms=300000
```

4. **poll() 처리 시간 단축**
- `max.poll.records` 조정
- 처리 로직 최적화

**Rebalance 관련 트레이드오프**
- `session.timeout.ms` 짧게: 빠른 장애 감지 vs 네트워크 지연으로 인한 불필요한 리밸런스
- `session.timeout.ms` 길게: 안정적 vs 실제 장애 시 늦은 감지
- `max.poll.interval.ms`: 긴 처리 허용 vs 느린 hang 감지
- Static Membership: 리밸런스 감소 vs 실제 장애 Consumer 감지 지연

**실제 운영 팁**
- 배포 시 Consumer를 점진적으로 재시작하여 동시 리밸런스 방지
- Kubernetes 환경에서는 PodDisruptionBudget과 함께 사용

**참고자료**
- [Apache Kafka Documentation - Consumer Rebalance](https://kafka.apache.org/documentation/#consumerconfigs_partition.assignment.strategy)[^29]

</details>

[^29]: Kafka 공식 문서 - Consumer Configuration

---

## 📌 Kafka Producer/Consumer 최적화

### KAFKA-030
Producer 성능 병목 현상 발생 시 해결 전략은 무엇인가요?

<details>
<summary>답변</summary>

**병목 진단 지표**
- `record-queue-time-avg`: 배치 대기 시간
- `request-latency-avg`: 요청 응답 시간
- `buffer-available-bytes`: 사용 가능 버퍼

**해결 전략**

1. **배치 최적화**
```properties
batch.size=65536           # 64KB로 증가
linger.ms=10               # 배치 대기 시간
buffer.memory=67108864     # 64MB 버퍼
```

2. **압축 활성화**
```properties
compression.type=lz4       # 또는 snappy, zstd
```

3. **병렬 처리 증가**
```properties
max.in.flight.requests.per.connection=5
```

4. **비동기 전송**
```java
producer.send(record, (metadata, exception) -> {
    if (exception != null) handleError(exception);
});
```

5. **파티션 수 증가**
- 더 많은 브로커에 부하 분산

6. **ACK 수준 조정** (내구성 트레이드오프 - 마지막 수단)
```properties
acks=1  # all에서 1로 변경 (데이터 손실 가능성 증가)
```

**하드웨어 개선**
- 네트워크 대역폭 확장
- 브로커 디스크 I/O 개선 (SSD)
- 브로커 수 증가

**병목 진단 권장 순서**
1. 모니터링 지표로 병목 위치 파악 (Producer 버퍼? 브로커 I/O? 네트워크?)
2. 해당 영역의 설정 먼저 조정 (batch.size, linger.ms, compression 등)
3. 내구성 관련 설정(acks)은 데이터 손실 허용 가능한 경우에만 최후 수단으로 변경

**참고자료**
- [Apache Kafka Documentation - Producer Performance](https://kafka.apache.org/documentation/#producerconfigs)[^30]

</details>

[^30]: Kafka 공식 문서 - Producer Configurations

---

## 📌 Kafka ZooKeeper와 KRaft

### KAFKA-031
ZooKeeper의 역할과 KRaft 모드의 차이점에 대해 설명해주세요.

<details>
<summary>답변</summary>

**ZooKeeper의 역할**
- 클러스터 메타데이터 저장 (토픽, 파티션, 브로커 정보)
- Controller 선출
- 브로커 상태 감지 (Ephemeral 노드)
- ACL 및 설정 저장

**KRaft (Kafka Raft) 모드**
- Kafka 자체 내장 메타데이터 관리 (ZooKeeper 제거)
- Raft 합의 프로토콜 사용
- Kafka 3.3부터 프로덕션 준비 완료 (KIP-833)
- Kafka 3.5+에서 ZooKeeper에서 KRaft로 무중단 마이그레이션 지원
- **Kafka 4.0에서 ZooKeeper 모드 완전 제거 예정** (KIP-833)

**주요 차이점**

| 구분 | ZooKeeper 모드 | KRaft 모드 |
|------|---------------|------------|
| 의존성 | ZooKeeper 클러스터 필요 | Kafka만으로 운영 |
| 메타데이터 | ZooKeeper에 저장 | 내부 토픽에 저장 |
| 확장성 | 파티션 수 제한 (수만 개) | 수백만 파티션 가능 |
| 운영 | 두 시스템 관리 | 단일 시스템 |
| 복구 | 느린 컨트롤러 페일오버 | 빠른 복구 |

**KRaft 설정 예시**
```properties
process.roles=broker,controller
node.id=1
controller.quorum.voters=1@localhost:9093
```

**마이그레이션**: ZooKeeper → KRaft 무중단 전환 도구 제공

**참고자료**
- [Apache Kafka Documentation - KRaft](https://kafka.apache.org/documentation/#kraft)[^31]

</details>

[^31]: Kafka 공식 문서 - KRaft

---

## 📌 Kafka 메시지 압축

### KAFKA-032
Kafka의 메시지 압축 옵션(gzip, snappy, lz4 등)의 장단점은 무엇인가요?

<details>
<summary>답변</summary>

**압축 옵션 비교**

| 압축 방식 | 압축률 | 속도 | CPU 사용량 | 권장 사용 |
|----------|--------|------|-----------|----------|
| gzip | 높음 | 느림 | 높음 | 네트워크 대역폭 제한 |
| snappy | 중간 | 빠름 | 낮음 | 일반적 사용 |
| lz4 | 중간 | 매우 빠름 | 낮음 | 고성능 권장 |
| zstd | 높음 | 빠름 | 중간 | 균형 잡힌 선택 |

**설정 방법**
```properties
# Producer 설정
compression.type=lz4

# Broker 설정 (선택)
compression.type=producer  # Producer 설정 유지
```

**장단점 상세**

**gzip**
- 장점: 최고 압축률, 범용 호환성
- 단점: CPU 집약적, 지연시간 증가

**snappy**
- 장점: 빠른 압축/해제, 낮은 CPU
- 단점: 압축률 상대적으로 낮음

**lz4**
- 장점: 가장 빠른 속도, 매우 낮은 CPU
- 단점: gzip보다 낮은 압축률
- 권장: 대부분의 프로덕션 환경

**zstd**
- 장점: 높은 압축률 + 적절한 속도
- 단점: 구버전 호환성 이슈

**참고자료**
- [Apache Kafka Documentation - Compression](https://kafka.apache.org/documentation/#producerconfigs_compression.type)[^32]

</details>

[^32]: Kafka 공식 문서 - Producer Configurations

---

## 📌 Kafka 에러 처리

### KAFKA-033
메시지 처리 중 오류가 발생했을 때의 처리 전략(예: DLQ 도입 등)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**에러 처리 전략**

1. **재시도 (Retry)**
```java
// 지수 백오프로 재시도
int retries = 3;
while (retries-- > 0) {
    try {
        process(record);
        break;
    } catch (RetryableException e) {
        Thread.sleep(backoff);
    }
}
```

2. **Dead Letter Queue (DLQ)**
```java
try {
    process(record);
} catch (Exception e) {
    // DLQ 토픽으로 전송
    producer.send(new ProducerRecord<>("dlq-topic",
        record.key(), record.value()));
    consumer.commitSync();
}
```

3. **에러 토픽 분리**
- 재시도 가능 에러 → retry-topic
- 영구 실패 → dlq-topic

4. **Skip/Ignore**
- 로깅 후 다음 메시지 처리
- 중요도 낮은 데이터에 적용

**DLQ 구현 모범 사례**
- 원본 메시지 + 에러 정보 저장
- 헤더에 원본 토픽, 파티션, 오프셋 포함
- DLQ 모니터링 및 알림 설정
- 재처리 도구 준비

**Spring Kafka 예시**
```java
@KafkaListener(topics = "my-topic")
@RetryableTopic(attempts = "3", backoff = @Backoff(delay = 1000))
public void listen(String message) {
    // 자동 재시도 및 DLQ 전송
}
```

**참고자료**
- [Apache Kafka Documentation - Error Handling](https://kafka.apache.org/documentation/#consumerconfigs)[^33]

</details>

[^33]: Kafka 공식 문서 - Consumer Configurations

---

## 📌 Kafka 확장성

### KAFKA-034
Kafka 클러스터 확장(Scale-out) 시 고려해야 할 모범 사례는 무엇인가요?

<details>
<summary>답변</summary>

**브로커 추가 시 고려사항**

1. **파티션 재분배**
```bash
# 재분배 계획 생성
kafka-reassign-partitions.sh --generate \
  --topics-to-move-json-file topics.json \
  --broker-list "1,2,3,4" \
  --bootstrap-server localhost:9092

# 재분배 실행
kafka-reassign-partitions.sh --execute \
  --reassignment-json-file plan.json
```

2. **점진적 확장**
- 한 번에 하나의 브로커 추가
- 네트워크 및 디스크 I/O 모니터링
- 재분배 스로틀링 적용

3. **스로틀 설정**
```bash
kafka-reassign-partitions.sh --execute \
  --throttle 50000000 \  # 50MB/s 제한
  --reassignment-json-file plan.json
```

**파티션 수 증가**
- 운영 중 파티션 추가 가능 (감소 불가)
- **함정 주의**: 키 기반 파티셔닝 시 파티션 추가하면 동일 키가 다른 파티션으로 라우팅됨
  - 기존 데이터는 이전 파티션에, 새 데이터는 새 파티션에 저장
  - 키별 순서 보장이 필요한 경우 파티션 추가 전 신중히 검토

**모범 사례**
- 충분한 초기 파티션 수 계획 (예상 최대 처리량의 2배 이상)
- `auto.create.topics.enable=false` 권장 (의도치 않은 토픽 생성 방지)
- Rack-awareness 설정으로 장애 도메인 분리 (`broker.rack`)
- Leader 재분배 자동화 (`auto.leader.rebalance.enable=true`)

**확장 전 체크리스트**
- [ ] 디스크 용량 계획
- [ ] 네트워크 대역폭 확인
- [ ] ZooKeeper/KRaft 부하 검토
- [ ] 클라이언트 연결 수 확인

**참고자료**
- [Apache Kafka Documentation - Adding Brokers](https://kafka.apache.org/documentation/#basic_ops_cluster_expansion)[^34]

</details>

[^34]: Kafka 공식 문서 - Expanding Your Cluster

### KAFKA-035
Kafka에서 ZooKeeper 모드에서 KRaft 모드로 전환 시 고려해야 할 사항은 무엇인가요?

<details>
<summary>답변</summary>

**KRaft 전환 전 확인사항**
- Kafka 버전 3.3 이상 (프로덕션 권장 3.5+ 마이그레이션, 3.6+ 신규 클러스터)
- 모든 클라이언트 호환성 확인 (특히 AdminClient 버전)
- 현재 ZooKeeper 클러스터 상태 정상 확인
- 일부 기능은 KRaft에서 아직 미지원될 수 있으므로 사용 중인 기능 확인 필요

**마이그레이션 절차**

1. **메타데이터 스냅샷 생성**
```bash
kafka-metadata.sh --snapshot /path/to/snapshot \
  --cluster-id <cluster-id>
```

2. **KRaft Controller 구성**
```properties
process.roles=controller
node.id=100
controller.quorum.voters=100@controller1:9093,101@controller2:9093
```

3. **점진적 전환**
- 브로커를 하나씩 KRaft 모드로 재시작
- Controller 쿼럼 구성
- 마지막으로 ZooKeeper 연결 해제

**고려사항**
- **롤백 계획**: 전환 전 백업 필수
- **다운타임**: 무중단 전환 도구 제공되나 테스트 필요
- **기능 차이**: 일부 기능은 KRaft에서 다르게 동작
- **모니터링**: 새로운 KRaft 관련 메트릭 추가

**KRaft 장점**
- 운영 단순화 (ZooKeeper 제거)
- 빠른 컨트롤러 페일오버
- 향상된 확장성 (수백만 파티션)

**주의사항**
- 기존 ACL, Config 마이그레이션 확인
- 클라이언트 라이브러리 버전 호환성
- 프로덕션 전 충분한 테스트

**참고자료**
- [Apache Kafka Documentation - ZooKeeper to KRaft Migration](https://kafka.apache.org/documentation/#kraft_zk_migration)[^35]

</details>

[^35]: Kafka 공식 문서 - KRaft Migration

---

## 📌 Kafka 지연(Latency) 최적화

### KAFKA-036
Kafka 메시지 전송 지연(latency)을 최소화하는 방법에는 어떤 것들이 있나요?

<details>
<summary>답변</summary>

**Producer 지연 최소화**
```properties
linger.ms=0              # 즉시 전송 (배치 대기 없음)
batch.size=16384         # 작은 배치
acks=1                   # Leader만 확인 (트레이드오프)
compression.type=none    # 압축 비활성화 (CPU 절약)
```

**Consumer 지연 최소화**
```properties
fetch.min.bytes=1                   # 즉시 fetch
fetch.max.wait.ms=100               # 대기 시간 최소화
max.poll.records=100                # 빠른 처리 사이클
```

**Broker 튜닝**
```properties
num.io.threads=8                    # I/O 스레드 증가
num.network.threads=3               # 네트워크 스레드
socket.send.buffer.bytes=102400
socket.receive.buffer.bytes=102400
```

**인프라 최적화**
- SSD 스토리지 사용
- Producer/Broker 네트워크 근접 배치
- 낮은 레이턴시 네트워크 (10Gbps+)

**파티션 전략**
- 파티션 수 적정 유지 (과도한 파티션은 오버헤드)
- 리더 균등 분배

**모니터링 지표**
- `produce-throttle-time`: Producer 스로틀링
- `fetch-latency-avg`: Consumer fetch 지연
- `request-latency-avg`: 전체 요청 지연

**트레이드오프 요약**
| 목표 | 희생되는 것 | 주요 설정 |
|------|------------|----------|
| 낮은 지연 | 처리량, 내구성 | linger.ms=0, acks=1 |
| 높은 처리량 | 지연시간 | linger.ms=50+, batch.size 증가 |
| 높은 내구성 | 지연시간, 처리량 | acks=all, min.insync.replicas=2 |

**실제 운영 팁**
- 지연시간 요구사항을 먼저 정의 (P99 < 10ms? 100ms?)
- 요구사항 달성 후 처리량 최적화
- 내구성은 데이터 중요도에 따라 결정

**참고자료**
- [Apache Kafka Documentation - Performance](https://kafka.apache.org/documentation/#configuration)[^36]

</details>

[^36]: Kafka 공식 문서 - Configuration

### KAFKA-037
Kafka Producer의 Sync와 Async 전송 방식이 지연 및 성능에 미치는 영향과 각각의 장단점은 무엇인가요?

<details>
<summary>답변</summary>

**동기 전송 (Sync)**
```java
// 전송 완료까지 블로킹
RecordMetadata metadata = producer.send(record).get();
System.out.println("Sent to partition: " + metadata.partition());
```

**장점**
- 전송 성공/실패 즉시 확인
- 순서 보장 용이
- 에러 처리 직관적

**단점**
- 낮은 처리량 (매 전송마다 대기)
- 네트워크 지연에 민감

**비동기 전송 (Async)**
```java
producer.send(record, (metadata, exception) -> {
    if (exception != null) {
        // 에러 처리
        logger.error("Send failed", exception);
    } else {
        // 성공 처리
        logger.info("Sent to: " + metadata.offset());
    }
});
```

**장점**
- 높은 처리량 (병렬 전송)
- 논블로킹으로 리소스 효율적
- 배치 최적화 활용 가능

**단점**
- 에러 처리 복잡
- 메모리 관리 필요 (버퍼 초과 시)
- 순서 보장 어려움

**선택 기준**
| 상황 | 권장 방식 |
|------|----------|
| 고처리량 필요 | Async |
| 엄격한 순서 보장 | Sync |
| 실시간 에러 처리 | Sync |
| 대량 데이터 전송 | Async + Callback |

**참고자료**
- [Apache Kafka Documentation - Producer API](https://kafka.apache.org/documentation/#producerapi)[^37]

</details>

[^37]: Kafka 공식 문서 - Producer API

---

## 📌 Kafka 장애 대응

### KAFKA-038
Kafka 클러스터 운영 시 예상할 수 있는 장애와 그에 대한 대응 방안은 무엇인가요?

<details>
<summary>답변</summary>

**주요 장애 유형 및 대응**

**1. 브로커 장애**
- 증상: UnderReplicatedPartitions 증가
- 대응:
  - ISR에서 자동 리더 선출 확인
  - 브로커 복구 또는 대체 브로커 투입
  - `min.insync.replicas` 설정 확인

**2. 디스크 장애**
- 증상: 로그 쓰기 실패, 브로커 비정상
- 대응:
  - JBOD 구성 시 해당 디스크만 격리
  - 파티션 재분배로 데이터 복구
  - 디스크 교체 후 브로커 재시작

**3. 네트워크 파티션**
- 증상: 브로커 간 통신 실패, ISR 축소
- 대응:
  - 네트워크 장비 점검
  - `unclean.leader.election.enable=false` 유지
  - 분할 복구 후 데이터 정합성 확인

**4. ZooKeeper/Controller 장애**
- 증상: 메타데이터 업데이트 불가
- 대응:
  - ZooKeeper 앙상블 복구
  - Controller 재선출 대기
  - KRaft 전환 고려

**5. Consumer Lag 급증**
- 원인: 처리 병목, 파티션 불균형
- 대응:
  - Consumer 스케일 아웃
  - 파티션 재분배
  - 처리 로직 최적화

**장애 대비 체크리스트**
- [ ] 복제 계수 3 이상
- [ ] 다중 AZ/랙 분산
- [ ] 모니터링/알림 설정
- [ ] 정기 DR 훈련

**참고자료**
- [Apache Kafka Documentation - Operations](https://kafka.apache.org/documentation/#operations)[^38]

</details>

[^38]: Kafka 공식 문서 - Operations

### KAFKA-039
Kafka Consumer Lag(지연) 모니터링 방법과 이를 해결하기 위한 전략은 무엇인가요?

<details>
<summary>답변</summary>

**Consumer Lag 개념**
- 마지막 생산된 Offset과 마지막 소비된 Offset의 차이
- Lag이 증가하면 Consumer가 Producer를 따라잡지 못함

**모니터링 방법**

1. **kafka-consumer-groups 명령**
```bash
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --describe --group my-consumer-group
```

2. **JMX 메트릭**
- `records-lag-max`: 최대 Lag
- `records-lag`: 파티션별 Lag

3. **모니터링 도구**
- Burrow (LinkedIn 오픈소스)
- Prometheus + kafka_exporter
- Confluent Control Center

**Lag 해결 전략**

1. **Consumer 확장**
```bash
# 파티션 수 = Consumer 수 확인
# Consumer 인스턴스 추가
```

2. **처리 최적화**
```properties
max.poll.records=500      # 배치 크기 조정
fetch.max.bytes=52428800  # 50MB
```

3. **병렬 처리**
```java
// 메시지 처리를 스레드풀로 병렬화
executor.submit(() -> process(record));
```

4. **파티션 증가**
- 병렬 처리 단위 확대
- Consumer 추가 여유 확보

5. **일시적 해결 (주의 필요)**
- Consumer Group 리셋 (건너뛴 메시지는 처리되지 않으므로 데이터 손실 가능)
- `auto.offset.reset=latest`로 재시작

**알림 설정 권장값**
- Warning: Lag > 10,000 또는 지속적 증가 추세
- Critical: Lag > 100,000 또는 처리량 대비 Lag 증가율이 높을 때

**Lag 모니터링 함정 주의**
- Lag 절대값보다 **추세**가 더 중요 (Lag이 높아도 감소 추세면 괜찮음)
- 배포/재시작 직후 일시적 Lag 증가는 정상
- 파티션별 Lag을 확인하여 특정 파티션 병목 식별 필요

**근본 원인 해결**
- 단순 Consumer 추가보다 처리 로직 최적화가 효과적인 경우도 많음
- 외부 시스템(DB, API) 호출이 병목일 수 있음

**참고자료**
- [Apache Kafka Documentation - Consumer Lag](https://kafka.apache.org/documentation/#basic_ops_consumer_lag)[^39]

</details>

[^39]: Kafka 공식 문서 - Consumer Lag

---

## 📌 Kafka 일관성

### KAFKA-040
Kafka에서 데이터 일관성을 보장하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**일관성 보장 메커니즘**

**1. 복제와 ISR**
```properties
replication.factor=3
min.insync.replicas=2
```
- 최소 ISR 수 만족 시에만 쓰기 허용
- Leader 장애 시 최신 데이터를 가진 복제본이 승격

**2. Producer ACK 설정**
```properties
acks=all                    # 모든 ISR 복제 완료 확인
enable.idempotence=true     # 중복 방지
```

**3. 트랜잭션**
```java
producer.initTransactions();
try {
    producer.beginTransaction();
    producer.send(record1);
    producer.send(record2);
    producer.sendOffsetsToTransaction(offsets, consumerGroupId);
    producer.commitTransaction();
} catch (Exception e) {
    producer.abortTransaction();
}
```

**4. Consumer 격리 수준**
```properties
isolation.level=read_committed  # 커밋된 트랜잭션만 읽기
```

**5. 순서 보장**
- 단일 파티션 내 순서 보장
- 키 기반 파티셔닝으로 관련 메시지 동일 파티션

**일관성 vs 가용성 트레이드오프 (CAP 정리 관점)**

Kafka는 네트워크 파티션(P) 발생 시 일관성(C)과 가용성(A) 사이에서 선택해야 합니다.

| 설정 | 일관성 | 가용성 | 선택 권장 상황 |
|------|--------|--------|----------------|
| acks=all, min.insync.replicas=2 | 높음 | 중간 | 금융, 주문 등 데이터 손실 불가 |
| acks=1 | 중간 | 높음 | 일반 애플리케이션 |
| unclean.leader.election=true | 낮음 | 높음 | 가용성이 데이터 일관성보다 중요한 경우 |

**실제 운영에서의 고려사항**
- 모든 설정을 최고 수준(acks=all, ISR=2, RF=3)으로 하면 비용과 지연시간 증가
- 데이터 중요도에 따라 토픽별로 다른 설정 적용 가능
- 장애 시나리오별 영향 분석 후 결정

**참고자료**
- [Apache Kafka Documentation - Semantics](https://kafka.apache.org/documentation/#semantics)[^40]

</details>

[^40]: Kafka 공식 문서 - Delivery Semantics

---

## 📌 Kafka Producer 설정

### KAFKA-041
Producer의 배치 전송(batch sending) 설정이 성능에 미치는 영향에 대해 설명해주세요.

<details>
<summary>답변</summary>

**배치 관련 설정**

```properties
batch.size=16384      # 배치 최대 크기 (bytes)
linger.ms=0           # 배치 대기 시간 (ms)
buffer.memory=33554432 # 전체 버퍼 메모리
```

**성능 영향**

**batch.size 증가**
- 장점: 네트워크 오버헤드 감소, 높은 처리량
- 단점: 메모리 사용량 증가, 첫 메시지 지연
- 권장: 64KB ~ 256KB

**linger.ms 증가**
- 장점: 배치 채움률 향상, 압축 효율 증가
- 단점: 지연 시간 증가
- 권장: 5ms ~ 100ms (처리량 중시)

**조합 예시**

| 시나리오 | batch.size | linger.ms | 효과 |
|----------|------------|-----------|------|
| 저지연 | 16KB | 0 | 즉시 전송 |
| 고처리량 | 128KB | 50ms | 배치 최적화 |
| 균형 | 64KB | 10ms | 적절한 균형 |

**압축과의 연계**
```properties
compression.type=lz4   # 배치 단위 압축
```
- 큰 배치 + 압축 = 높은 네트워크 효율

**모니터링 지표**
- `batch-size-avg`: 평균 배치 크기
- `record-queue-time-avg`: 배치 대기 시간
- `compression-rate-avg`: 압축률

**참고자료**
- [Apache Kafka Documentation - Producer Batching](https://kafka.apache.org/documentation/#producerconfigs_batch.size)[^41]

</details>

[^41]: Kafka 공식 문서 - Producer Configurations

---

## 📌 Kafka Consumer Offset

### KAFKA-042
Kafka Consumer의 오프셋 커밋 전략(자동 vs 수동 커밋)과 메시지 처리 보장 수준에 대해 설명해주세요.

<details>
<summary>답변</summary>

**자동 커밋 (Auto Commit)**
```properties
enable.auto.commit=true
auto.commit.interval.ms=5000
```

**장점**
- 구현 간단
- 개발자 관리 부담 없음

**단점**
- 메시지 손실 위험 (처리 전 커밋)
- 중복 처리 가능 (커밋 후 처리 실패)

**수동 커밋 (Manual Commit)**
```properties
enable.auto.commit=false
```

**동기 커밋**
```java
consumer.poll(Duration.ofMillis(100));
process(records);
consumer.commitSync();  // 블로킹
```

**비동기 커밋**
```java
consumer.commitAsync((offsets, exception) -> {
    if (exception != null) {
        log.error("Commit failed", exception);
    }
});
```

**혼합 전략 (권장)**
```java
try {
    while (running) {
        ConsumerRecords records = consumer.poll(Duration.ofMillis(100));
        process(records);
        consumer.commitAsync();  // 일반적으로 비동기
    }
} finally {
    consumer.commitSync();  // 종료 시 동기
    consumer.close();
}
```

**커밋 전략 비교**
| 전략 | 메시지 손실 | 중복 처리 | 성능 |
|------|-----------|----------|------|
| 자동 커밋 | 가능 | 가능 | 높음 |
| 처리 후 커밋 | 없음 | 가능 | 중간 |
| 커밋 후 처리 | 가능 | 없음 | 중간 |

**운영 환경 권장사항**
- **at-least-once 보장 (대부분의 경우)**: 처리 완료 후 커밋 + Consumer 측 멱등성 처리
- **at-most-once 보장 (드문 경우)**: 커밋 후 처리. 중복보다 손실이 나은 경우에만
- **exactly-once 보장**: Kafka Transactions 사용 또는 Kafka Streams의 `exactly_once_v2`

**함정 주의**: 자동 커밋은 `poll()` 호출 시 이전 `poll()`의 오프셋을 커밋함. 따라서 `poll()` 직후 장애 시 아직 처리되지 않은 메시지의 오프셋이 커밋될 수 있음

**참고자료**
- [Apache Kafka Documentation - Offset Management](https://kafka.apache.org/documentation/#consumerconfigs_enable.auto.commit)[^42]

</details>

[^42]: Kafka 공식 문서 - Consumer Configurations

---

## 📌 Kafka Dead Letter Queue

### KAFKA-043
Kafka에서 에러 처리를 위한 Dead Letter Queue(DLQ) 패턴을 구현하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**DLQ 구현 패턴**

**1. 기본 DLQ 구현**
```java
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records) {
        try {
            processMessage(record);
        } catch (Exception e) {
            // DLQ로 전송
            ProducerRecord<String, String> dlqRecord = new ProducerRecord<>(
                "my-topic.DLQ",
                record.key(),
                record.value()
            );
            // 원본 정보를 헤더에 추가
            dlqRecord.headers()
                .add("original-topic", record.topic().getBytes())
                .add("original-partition", String.valueOf(record.partition()).getBytes())
                .add("original-offset", String.valueOf(record.offset()).getBytes())
                .add("error-message", e.getMessage().getBytes());

            dlqProducer.send(dlqRecord);
        }
    }
    consumer.commitSync();
}
```

**2. 재시도 토픽 + DLQ 패턴**
```
main-topic → retry-topic-1 → retry-topic-2 → DLQ
              (1분 후)        (5분 후)      (최종 실패)
```

**3. Spring Kafka 활용**
```java
@KafkaListener(topics = "my-topic")
@RetryableTopic(
    attempts = "4",
    backoff = @Backoff(delay = 1000, multiplier = 2),
    dltTopicSuffix = ".DLQ"
)
public void listen(String message) {
    process(message);
}

@DltHandler
public void handleDlt(String message) {
    log.error("DLQ received: " + message);
}
```

**DLQ 운영 모범 사례**
- DLQ 토픽 별도 모니터링 및 알림 (DLQ에 메시지가 쌓이면 즉시 인지)
- 메시지 원본 정보 보존 (헤더에 원본 토픽, 오프셋, 에러 메시지, 타임스탬프 포함)
- DLQ 메시지 재처리 도구 준비 (수동 재처리, 자동 재시도 등)
- DLQ 보존 기간 충분히 설정 (원본 토픽보다 길게)

**DLQ vs 재시도 토픽 트레이드오프**
- 재시도 토픽 사용: 자동 복구 가능, 하지만 무한 재시도로 리소스 낭비 가능
- DLQ 직행: 수동 개입 필요, 하지만 일시적 오류도 DLQ로 이동
- 권장: 제한된 횟수 재시도 후 DLQ로 이동 (예: 3회 재시도 후 DLQ)

**함정 주의**: DLQ 메시지 재처리 시 순서가 보장되지 않음. 순서가 중요한 경우 별도 처리 필요

**참고자료**
- [Apache Kafka Documentation - Error Handling](https://kafka.apache.org/documentation/)[^43]

</details>

[^43]: Kafka 공식 문서 및 Spring Kafka 문서

---

## 📌 Kafka Schema Registry

### KAFKA-044
Kafka 메시지 스키마 관리(Schema Registry)의 역할과 필요성은 무엇인가요?

<details>
<summary>답변</summary>

**Schema Registry 역할**
- 메시지 스키마(Avro, Protobuf, JSON Schema)를 중앙 저장소에서 관리
- Producer/Consumer 간 스키마 호환성 보장
- 스키마 버전 관리 및 진화 지원

**필요성**
1. **데이터 계약**: Producer/Consumer 간 명확한 데이터 형식 정의
2. **호환성 검증**: 스키마 변경 시 하위/상위 호환성 자동 검증
3. **효율적 직렬화**: 스키마 ID만 전송하여 페이로드 크기 감소
4. **스키마 진화**: 필드 추가/삭제 시 기존 Consumer 영향 최소화

**호환성 모드**
| 모드 | 설명 | 허용되는 변경 |
|------|------|--------------|
| BACKWARD | 새 스키마로 이전 데이터 읽기 가능 | 필드 삭제, default 있는 필드 추가 |
| FORWARD | 이전 스키마로 새 데이터 읽기 가능 | 필드 추가, default 있는 필드 삭제 |
| FULL | 양방향 호환 | default 있는 필드 추가/삭제만 가능 |
| NONE | 호환성 검사 없음 | 모든 변경 가능 (위험) |

**트레이드오프**
- BACKWARD (기본값, 권장): Consumer를 먼저 업데이트해야 함, 안전한 배포
- FORWARD: Producer를 먼저 업데이트해야 함
- FULL: 가장 안전하지만 변경 제약이 큼
- NONE: 유연하지만 런타임 오류 위험

**사용 예시 (Avro)**
```java
// Producer
props.put("schema.registry.url", "http://localhost:8081");
props.put("value.serializer", KafkaAvroSerializer.class);

GenericRecord record = new GenericData.Record(schema);
record.put("name", "John");
producer.send(new ProducerRecord<>("users", record));
```

**모범 사례**
- BACKWARD 또는 FULL 호환성 사용
- 필드 삭제 시 default 값 설정
- CI/CD에서 스키마 호환성 테스트

**참고자료**
- [Confluent Schema Registry Documentation](https://docs.confluent.io/platform/current/schema-registry/)[^44]

</details>

[^44]: Confluent Schema Registry 공식 문서

---

## 📌 Kafka 데이터베이스 연동

### KAFKA-045
Kafka와 NoSQL 데이터베이스를 연동할 때 고려해야 할 사항은 무엇인가요?

<details>
<summary>답변</summary>

**연동 방식**

1. **Kafka Connect 활용**
```json
{
  "name": "mongodb-sink",
  "config": {
    "connector.class": "com.mongodb.kafka.connect.MongoSinkConnector",
    "connection.uri": "mongodb://localhost:27017",
    "database": "mydb",
    "collection": "events",
    "topics": "my-topic"
  }
}
```

2. **Consumer 직접 구현**
```java
while (true) {
    ConsumerRecords records = consumer.poll(Duration.ofMillis(100));
    List<Document> batch = new ArrayList<>();
    for (ConsumerRecord record : records) {
        batch.add(Document.parse(record.value()));
    }
    mongoCollection.insertMany(batch);  // 배치 삽입
    consumer.commitSync();
}
```

**고려사항**

**1. 일관성**
- 트랜잭션 미지원 NoSQL: 멱등성 설계 필수
- 중복 메시지 처리 로직 (upsert 활용)

**2. 성능**
- 배치 쓰기로 처리량 향상
- 인덱스 설계 최적화
- 백프레셔 처리

**3. 스키마 관리**
- Schema Registry로 데이터 형식 관리
- NoSQL 유연한 스키마와의 조화

**4. 에러 처리**
- 재시도 로직 구현
- DLQ 활용
- 커넥션 풀 관리

**5. 확장성**
- 파티션 수와 Consumer 병렬성
- NoSQL 샤딩 전략과 조화

**데이터베이스별 권장 Connector**
- MongoDB: MongoDB Kafka Connector
- Cassandra: DataStax Connector
- Elasticsearch: Confluent Elasticsearch Sink
- Redis: Redis Sink Connector

**참고자료**
- [Apache Kafka Documentation - Connect](https://kafka.apache.org/documentation/#connect)[^45]

</details>

[^45]: Kafka 공식 문서 - Kafka Connect

---

## 📌 Kafka Streams State Store

### KAFKA-046
Kafka Streams의 상태 저장소(State Store) 관리 방식에 대해 설명해주세요.

<details>
<summary>답변</summary>

**State Store 개념**
- Kafka Streams에서 상태가 필요한 연산(집계, 조인 등)을 위한 로컬 저장소
- 기본적으로 RocksDB 사용 (in-memory 옵션도 가능)

**State Store 유형**
1. **KeyValueStore**: 키-값 저장
2. **WindowStore**: 시간 윈도우별 키-값 저장
3. **SessionStore**: 세션 기반 키-값 저장

**내부 동작 방식**
```
Input Topic → State Store (RocksDB) ← Changelog Topic
                    ↓
              Output Topic
```

**Changelog Topic**
- State Store 변경사항을 Kafka 토픽에 기록
- 장애 복구 시 상태 재구축에 사용
- 자동 생성됨 (application.id-storename-changelog)

**설정 예시**
```java
StreamsBuilder builder = new StreamsBuilder();
builder.stream("input-topic")
    .groupByKey()
    .count(Materialized.<String, Long, KeyValueStore<Bytes, byte[]>>as("count-store")
        .withKeySerde(Serdes.String())
        .withValueSerde(Serdes.Long()));
```

**관리 방법**
```properties
# State 디렉토리 설정
state.dir=/var/kafka-streams

# Standby 복제본 (빠른 복구)
num.standby.replicas=1
```

**상태 복구**
1. Changelog 토픽에서 상태 재구축
2. Standby 복제본이 있으면 빠른 복구

**모범 사례**
- 충분한 로컬 디스크 공간 확보
- Standby 복제본 설정으로 복구 시간 단축
- State Store 크기 모니터링

**참고자료**
- [Apache Kafka Documentation - Streams State](https://kafka.apache.org/documentation/streams/developer-guide/processor-api#state-stores)[^46]

</details>

[^46]: Kafka Streams 공식 문서 - State Stores

---

## 📌 Kafka 마이크로서비스

### KAFKA-047
Kafka를 활용한 마이크로서비스 아키텍처 설계 사례에 대해 설명해주세요.

<details>
<summary>답변</summary>

**이벤트 기반 마이크로서비스 패턴**

**1. 이벤트 소싱 (Event Sourcing)**
```
주문 서비스 → order-events 토픽 → 재고 서비스
                              → 결제 서비스
                              → 알림 서비스
```
- 모든 상태 변경을 이벤트로 저장
- 이벤트 재생으로 상태 복원 가능

**2. CQRS (Command Query Responsibility Segregation)**
```
명령(Write) → Command Topic → Write Service → Event Topic
                                                   ↓
조회(Read) ← Read Service ← Materialized View ←───┘
```
- 쓰기와 읽기 모델 분리
- 읽기 최적화된 뷰 구성

**3. Saga 패턴 (분산 트랜잭션)**
```
Order Created → Payment Processed → Inventory Reserved → Order Completed
      ↓ (실패 시)        ↓ (실패 시)         ↓ (실패 시)
Order Cancelled ← Payment Refunded ← Inventory Released
```
- 보상 트랜잭션으로 일관성 유지

**토픽 설계**
```
services/
├── order-events        # 도메인 이벤트
├── order-commands      # 명령 메시지
├── order-dlq           # 실패 메시지
└── order-notifications # 알림 이벤트
```

**구현 예시**
```java
// 주문 서비스
@KafkaListener(topics = "order-commands")
public void handleOrder(OrderCommand cmd) {
    Order order = processOrder(cmd);
    kafkaTemplate.send("order-events", new OrderCreatedEvent(order));
}

// 재고 서비스
@KafkaListener(topics = "order-events")
public void onOrderCreated(OrderCreatedEvent event) {
    inventoryService.reserve(event.getItems());
}
```

**모범 사례**
- 이벤트 스키마 버전 관리 (Schema Registry 활용)
- 멱등성 처리 필수 (동일 이벤트 재처리해도 결과 동일)
- 서비스별 Consumer Group 분리
- 이벤트 순서 의존성 최소화 설계

**마이크로서비스에서의 Kafka 트레이드오프**
- **이벤트 기반**: 느슨한 결합, 확장성 우수 vs 디버깅 어려움, 최종 일관성만 보장
- **동기 API 호출**: 단순함, 강한 일관성 vs 높은 결합도, 장애 전파
- Saga 패턴: 분산 트랜잭션 대안 vs 구현 복잡도 증가

**실제 운영 고려사항**
- 이벤트 재처리로 인한 부작용 방지 (멱등한 핸들러 설계)
- 서비스 간 이벤트 스키마 계약 관리
- 장애 시 보상 트랜잭션 설계

**참고자료**
- [Apache Kafka Documentation - Use Cases](https://kafka.apache.org/documentation/#uses)[^47]

</details>

[^47]: Kafka 공식 문서 - Use Cases

---

## 📌 Kafka 브로커 추가

### KAFKA-048
Kafka 클러스터에 새로운 브로커를 추가할 때 고려해야 할 주요 요소는 무엇인가요?

<details>
<summary>답변</summary>

**브로커 추가 절차**

1. **새 브로커 설정**
```properties
broker.id=4                    # 고유 ID
log.dirs=/var/kafka-logs
zookeeper.connect=zk1:2181,zk2:2181,zk3:2181
# 또는 KRaft 모드
controller.quorum.voters=1@controller1:9093
```

2. **브로커 시작**
```bash
kafka-server-start.sh config/server.properties
```

3. **파티션 재분배** (선택)
```bash
# 재분배 계획 생성
kafka-reassign-partitions.sh --generate \
  --topics-to-move-json-file topics.json \
  --broker-list "1,2,3,4"

# 실행
kafka-reassign-partitions.sh --execute \
  --reassignment-json-file plan.json \
  --throttle 50000000
```

**고려 요소**

**1. 하드웨어 일관성**
- 기존 브로커와 동일한 사양 권장
- 디스크 용량, 네트워크 대역폭 확인

**2. 네트워크 구성**
- 기존 브로커와 동일 네트워크 세그먼트
- 방화벽 규칙 확인 (9092, 9093 포트)

**3. 파티션 재분배**
- 자동 분배되지 않음 (수동 재분배 필요)
- 스로틀링으로 성능 영향 최소화
- 피크 시간 외 수행

**4. Rack Awareness**
```properties
broker.rack=rack1
```
- 장애 도메인 분산

**5. 모니터링**
- 새 브로커 메트릭 수집 확인
- 리더 분배 균형 확인
- Under-replicated 파티션 없음 확인

**참고자료**
- [Apache Kafka Documentation - Adding Servers](https://kafka.apache.org/documentation/#basic_ops_cluster_expansion)[^48]

</details>

[^48]: Kafka 공식 문서 - Cluster Expansion

---

## 📌 Kafka Connector 개발

### KAFKA-049
Kafka 커넥터(Connector) 개발 및 커스터마이징 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**커넥터 유형**
- **Source Connector**: 외부 시스템 → Kafka
- **Sink Connector**: Kafka → 외부 시스템

**Source Connector 개발**
```java
public class MySourceConnector extends SourceConnector {
    @Override
    public void start(Map<String, String> props) {
        // 설정 초기화
    }

    @Override
    public Class<? extends Task> taskClass() {
        return MySourceTask.class;
    }

    @Override
    public List<Map<String, String>> taskConfigs(int maxTasks) {
        // 태스크 설정 분배
        return configs;
    }
}

public class MySourceTask extends SourceTask {
    @Override
    public List<SourceRecord> poll() {
        // 외부 시스템에서 데이터 읽기
        return Arrays.asList(
            new SourceRecord(
                sourcePartition, sourceOffset,
                "target-topic", Schema.STRING_SCHEMA, value
            )
        );
    }
}
```

**Sink Connector 개발**
```java
public class MySinkTask extends SinkTask {
    @Override
    public void put(Collection<SinkRecord> records) {
        for (SinkRecord record : records) {
            // 외부 시스템에 데이터 쓰기
            externalSystem.write(record.value());
        }
    }

    @Override
    public void flush(Map<TopicPartition, OffsetAndMetadata> offsets) {
        // 버퍼 플러시
    }
}
```

**커스터마이징 포인트**
1. **변환 (SMT - Single Message Transform)**
```json
{
  "transforms": "addTimestamp",
  "transforms.addTimestamp.type": "org.apache.kafka.connect.transforms.InsertField$Value",
  "transforms.addTimestamp.timestamp.field": "processed_at"
}
```

2. **에러 처리**
```json
{
  "errors.tolerance": "all",
  "errors.deadletterqueue.topic.name": "my-dlq"
}
```

**배포**
```bash
# JAR 파일을 플러그인 디렉토리에 배치
plugin.path=/usr/share/kafka-connect-plugins
```

**참고자료**
- [Apache Kafka Documentation - Connect Development](https://kafka.apache.org/documentation/#connect_development)[^49]

</details>

[^49]: Kafka 공식 문서 - Connector Development Guide

---

## 📌 Kafka 운영 지표

### KAFKA-050
Kafka 운영 시 모니터링과 경보 시스템 설정 시 중요한 핵심 지표는 무엇인가요?

<details>
<summary>답변</summary>

**브로커 핵심 지표**

| 지표 | 설명 | 임계값 |
|------|------|--------|
| UnderReplicatedPartitions | 복제 지연 파티션 | > 0 경고 |
| OfflinePartitionsCount | 오프라인 파티션 | > 0 위험 |
| ActiveControllerCount | 활성 컨트롤러 | != 1 위험 |
| RequestsPerSec | 요청 처리량 | 용량 대비 |
| NetworkProcessorAvgIdlePercent | 네트워크 스레드 유휴율 | < 30% 경고 |
| RequestHandlerAvgIdlePercent | 요청 핸들러 유휴율 | < 30% 경고 |

**Producer 지표**
| 지표 | 설명 | 임계값 |
|------|------|--------|
| record-error-rate | 전송 실패율 | > 0 경고 |
| record-send-rate | 전송 처리량 | 모니터링 |
| request-latency-avg | 평균 지연시간 | > 100ms 경고 |

**Consumer 지표**
| 지표 | 설명 | 임계값 |
|------|------|--------|
| records-lag-max | 최대 Consumer Lag | 증가 추세 경고 |
| fetch-rate | 소비 처리량 | 모니터링 |
| commit-latency-avg | 커밋 지연시간 | > 50ms 경고 |

**시스템 지표**
- CPU 사용률 (< 70%)
- 메모리 사용률
- 디스크 사용률 (< 80%)
- 네트워크 I/O

**알림 설정 예시 (Prometheus)**
```yaml
groups:
- name: kafka
  rules:
  - alert: KafkaUnderReplicatedPartitions
    expr: kafka_server_replicamanager_underreplicatedpartitions > 0
    for: 5m
    labels:
      severity: warning

  - alert: KafkaConsumerLagHigh
    expr: kafka_consumer_group_lag > 10000
    for: 10m
    labels:
      severity: warning
```

**참고자료**
- [Apache Kafka Documentation - Monitoring](https://kafka.apache.org/documentation/#monitoring)[^50]

</details>

[^50]: Kafka 공식 문서 - Monitoring
