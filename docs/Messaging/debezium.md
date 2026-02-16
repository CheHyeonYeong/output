# Debezium CDC / 디베지움

> 카테고리: 데이터 변경 캡처
> [← 면접 질문 목록으로 돌아가기](../interview.md)

---

## 📌 Debezium 기본 개념

### CDC-001
Debezium CDC의 기본 개념과 작동 원리에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Debezium**은 데이터베이스의 변경 사항을 실시간으로 캡처하여 이벤트 스트림으로 변환하는 오픈소스 분산 CDC(Change Data Capture) 플랫폼입니다.

**핵심 작동 원리:**
1. **로그 기반 CDC**: 데이터베이스의 트랜잭션 로그(MySQL의 binlog, PostgreSQL의 WAL 등)를 읽어 변경 사항을 캡처
2. **Kafka Connect 기반**: Source Connector로 동작하며, 변경 이벤트를 Kafka 토픽으로 발행
3. **비침투적 방식**: 애플리케이션 코드 수정 없이 데이터베이스 레벨에서 변경 캡처

**아키텍처 구성:**
```
[Source DB] → [DB Transaction Log] → [Debezium Connector] → [Kafka] → [Sink Connector] → [Target System]
```

**트레이드오프 - CDC 방식 비교:**

| 방식 | 장점 | 단점 |
|------|------|------|
| **로그 기반 CDC (Debezium)** | 낮은 오버헤드, 모든 변경 캡처, 삭제 이벤트 포함 | DB별 커넥터 필요, 로그 설정 필요 |
| **쿼리 기반 CDC** | 구현 단순, DB 독립적 | 폴링 오버헤드, 삭제 감지 어려움 |
| **트리거 기반 CDC** | 즉각적 캡처 | DB 성능 영향, 유지보수 복잡 |
| **타임스탬프 기반** | 간단한 구현 | 삭제 감지 불가, 시간 동기화 필요 |

**운영 환경 고려사항:**
- 초기 스냅샷 시 소스 DB 부하 고려
- Kafka 클러스터의 처리 용량 산정
- 스키마 레지스트리 도입 여부 결정
- 오프셋 저장소(Kafka 토픽) 관리

**참고자료**
- [Debezium Documentation - Architecture](https://debezium.io/documentation/reference/stable/architecture.html)
- [Debezium FAQ](https://debezium.io/documentation/faq/)

</details>

### CDC-002
Debezium이 CDC(Change Data Capture)를 구현하는 방식은 무엇인가요?

<details>
<summary>답변</summary>

Debezium은 **로그 기반 CDC(Log-based CDC)** 방식을 사용하여 데이터베이스 변경을 캡처합니다.

**데이터베이스별 로그 활용:**

| 데이터베이스 | 트랜잭션 로그 | 특징 |
|-------------|--------------|------|
| MySQL | Binary Log (binlog) | ROW 포맷 필수, GTID 권장 |
| PostgreSQL | Write-Ahead Log (WAL) | Logical Replication 사용 |
| MongoDB | Oplog / Change Streams | Change Streams 권장 (4.0+) |
| SQL Server | Transaction Log | CDC 또는 CT 기능 활성화 필요 |
| Oracle | LogMiner / Xstream | 라이선스 고려 필요 |

**CDC 구현 단계:**
1. **커넥터 시작**: Kafka Connect에서 Debezium 커넥터 배포
2. **초기 스냅샷** (선택적): 기존 데이터의 일관된 스냅샷 생성
3. **스트리밍 모드**: 트랜잭션 로그를 지속적으로 읽어 변경 캡처
4. **이벤트 변환**: 변경 사항을 표준화된 이벤트 포맷으로 변환
5. **Kafka 발행**: 테이블별 토픽으로 이벤트 발행

**함정 질문 - "쿼리 기반 CDC와 동일한가요?":**
아닙니다. 로그 기반 CDC는 쿼리 기반과 근본적으로 다릅니다:
- **쿼리 기반**: 주기적 SELECT로 변경 감지 → 폴링 오버헤드, 삭제 감지 어려움
- **로그 기반**: 트랜잭션 로그 스트리밍 → 실시간, 모든 변경(DELETE 포함) 캡처

**이벤트 구조:**
```json
{
  "before": { "id": 1, "name": "old" },  // 변경 전 상태
  "after": { "id": 1, "name": "new" },   // 변경 후 상태
  "source": {
    "connector": "mysql",
    "ts_ms": 1234567890,
    "gtid": "xxx:1"
  },
  "op": "u"  // c=create, u=update, d=delete, r=read(snapshot)
}
```

**참고자료**
- [Debezium - How it works](https://debezium.io/documentation/reference/stable/architecture.html)

</details>

---

## 📌 Debezium MySQL 설정

### CDC-003
MySQL에서 Debezium 커넥터를 설정할 때 고려해야 할 주요 요소는 무엇인가요?

<details>
<summary>답변</summary>

**MySQL Debezium 커넥터 설정 시 주요 고려 요소:**

**1. MySQL 서버 설정 (필수):**
```ini
# my.cnf
server-id=1                    # 고유 서버 ID
log_bin=mysql-bin              # binlog 활성화
binlog_format=ROW              # ROW 포맷 필수!
binlog_row_image=FULL          # 전체 row 이미지 권장
expire_logs_days=3             # binlog 보관 기간
gtid_mode=ON                   # GTID 사용 권장
enforce_gtid_consistency=ON    # GTID 일관성 강제
```

**2. 사용자 권한:**
```sql
CREATE USER 'debezium'@'%' IDENTIFIED BY 'password';
GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'debezium'@'%';
-- 스키마 히스토리를 위해 추가 권한 필요
GRANT LOCK TABLES ON mydb.* TO 'debezium'@'%';
```

**3. 커넥터 설정:**
```json
{
  "name": "mysql-connector",
  "config": {
    "connector.class": "io.debezium.connector.mysql.MySqlConnector",
    "database.hostname": "mysql-host",
    "database.port": "3306",
    "database.user": "debezium",
    "database.password": "password",
    "database.server.id": "1",
    "topic.prefix": "dbserver1",
    "database.include.list": "mydb",
    "table.include.list": "mydb.users,mydb.orders",
    "schema.history.internal.kafka.bootstrap.servers": "kafka:9092",
    "schema.history.internal.kafka.topic": "schema-changes.mydb"
  }
}
```

**트레이드오프 - 주요 설정 옵션:**

| 설정 | 선택지 | 트레이드오프 |
|------|--------|-------------|
| `snapshot.mode` | initial / schema_only / never | 초기 데이터 필요 vs 빠른 시작 |
| `binlog_row_image` | FULL / MINIMAL | 완전한 데이터 vs 저장 공간 |
| `decimal.handling.mode` | precise / double / string | 정확도 vs 처리 편의성 |
| `time.precision.mode` | adaptive / connect | 정밀도 vs 호환성 |

**운영 환경 체크리스트:**
- [ ] binlog 보관 기간이 스냅샷 시간보다 긴지 확인
- [ ] Read Replica 사용 시 binlog 활성화 여부 확인
- [ ] 네트워크 지연 및 타임아웃 설정 검토
- [ ] SSL/TLS 연결 설정 (프로덕션 환경)

**참고자료**
- [Debezium MySQL Connector Documentation](https://debezium.io/documentation/reference/stable/connectors/mysql.html)

</details>

### CDC-004
Debezium MySQL 커넥터에서 binlog를 활용하여 데이터를 캡처하는 원리에 대해 설명해주세요.

<details>
<summary>답변</summary>

**MySQL Binlog 기반 CDC 원리:**

**Binlog란?**
MySQL의 Binary Log는 데이터베이스에 대한 모든 변경 사항(DDL, DML)을 순차적으로 기록하는 로그 파일입니다. 원래 복제(Replication)를 위해 설계되었습니다.

**Debezium의 Binlog 캡처 과정:**

```
1. Connector 시작
       ↓
2. MySQL에 Replica로 연결 (SHOW MASTER STATUS)
       ↓
3. 현재 binlog 위치 확인 (file, position 또는 GTID)
       ↓
4. [Optional] 스냅샷 수행 (일관된 읽기)
       ↓
5. Binlog 스트리밍 시작 (SHOW BINLOG EVENTS)
       ↓
6. 이벤트 파싱 → Kafka 이벤트 변환 → 토픽 발행
       ↓
7. 오프셋 저장 (binlog file:position 또는 GTID)
```

**Binlog 이벤트 타입:**
- `WRITE_ROWS_EVENT`: INSERT 작업
- `UPDATE_ROWS_EVENT`: UPDATE 작업
- `DELETE_ROWS_EVENT`: DELETE 작업
- `QUERY_EVENT`: DDL 문장 (CREATE, ALTER 등)
- `TABLE_MAP_EVENT`: 테이블 메타데이터

**GTID vs File:Position:**

| 방식 | 장점 | 단점 |
|------|------|------|
| **GTID** | 장애 복구 용이, 자동 위치 추적 | MySQL 5.6.5+ 필요, 설정 복잡 |
| **File:Position** | 단순, 모든 버전 지원 | 수동 위치 관리, 장애 시 복잡 |

**함정 질문 - "Binlog를 직접 파일로 읽나요?":**
아닙니다! Debezium은 MySQL Replication Protocol을 사용하여 binlog를 스트리밍으로 받습니다. 마치 Replica 서버처럼 동작하여:
- 네트워크를 통해 실시간으로 이벤트 수신
- 파일 접근 권한 불필요
- MySQL 서버의 binlog 관리에 의존

**운영 시 주의사항:**
1. **Binlog 만료 전 커넥터 재시작**: binlog가 삭제되면 스냅샷부터 다시 시작해야 함
2. **GTID 사용 권장**: 장애 복구 및 페일오버 시 자동 위치 추적
3. **server-id 고유성**: 다른 Replica와 충돌하지 않도록 설정

**참고자료**
- [MySQL Binary Log](https://dev.mysql.com/doc/refman/8.0/en/binary-log.html)
- [Debezium MySQL Connector - How it works](https://debezium.io/documentation/reference/stable/connectors/mysql.html#how-the-mysql-connector-works)

</details>

---

## 📌 Debezium Elasticsearch 연동

### CDC-005
Debezium과 Elasticsearch 간 데이터 동기화 아키텍처는 어떻게 구성되나요?

<details>
<summary>답변</summary>

**Debezium-Elasticsearch 동기화 아키텍처:**

```
┌─────────────┐    ┌──────────────┐    ┌─────────┐    ┌────────────────┐    ┌───────────────┐
│  Source DB  │───▶│   Debezium   │───▶│  Kafka  │───▶│  Sink Connector│───▶│ Elasticsearch │
│  (MySQL)    │    │  (Source)    │    │         │    │  (ES Sink)     │    │               │
└─────────────┘    └──────────────┘    └─────────┘    └────────────────┘    └───────────────┘
```

**아키텍처 구성 옵션:**

**1. Kafka Connect Elasticsearch Sink:**
```json
{
  "name": "es-sink-connector",
  "config": {
    "connector.class": "io.confluent.connect.elasticsearch.ElasticsearchSinkConnector",
    "topics": "dbserver1.mydb.users",
    "connection.url": "http://elasticsearch:9200",
    "type.name": "_doc",
    "key.ignore": "false",
    "schema.ignore": "true",
    "transforms": "unwrap",
    "transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState"
  }
}
```

**2. 대안적 아키텍처:**

| 방식 | 장점 | 단점 | 적합한 경우 |
|------|------|------|------------|
| **Kafka Connect ES Sink** | 관리 용이, 자동 재시도 | 복잡한 변환 제한 | 단순 동기화 |
| **Kafka Streams 중간 처리** | 복잡한 변환 가능 | 개발 필요 | 데이터 가공 필요 |
| **Logstash** | 유연한 필터링 | 추가 인프라 | 기존 ELK 스택 활용 |
| **커스텀 Consumer** | 완전한 제어 | 개발/운영 부담 | 특수 요구사항 |

**SMT(Single Message Transform) 활용:**
```json
{
  "transforms": "unwrap,route,filter",
  "transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState",
  "transforms.unwrap.drop.tombstones": "true",
  "transforms.route.type": "org.apache.kafka.connect.transforms.RegexRouter",
  "transforms.route.regex": "([^.]+)\\.([^.]+)\\.([^.]+)",
  "transforms.route.replacement": "es-$3"
}
```

**DELETE 이벤트 처리:**
- `ExtractNewRecordState`의 `delete.handling.mode` 설정
  - `drop`: 삭제 이벤트 무시
  - `rewrite`: `__deleted` 필드 추가
  - `none`: tombstone 이벤트 전달

**운영 환경 고려사항:**
1. **인덱스 매핑**: 사전 매핑 정의로 타입 불일치 방지
2. **Bulk 설정**: `batch.size`, `linger.ms` 튜닝
3. **Dead Letter Queue**: 실패 메시지 처리 전략
4. **인덱스 라이프사이클**: ILM 정책과 연계

**참고자료**
- [Confluent Elasticsearch Sink Connector](https://docs.confluent.io/kafka-connectors/elasticsearch/current/overview.html)
- [Debezium SMT - ExtractNewRecordState](https://debezium.io/documentation/reference/stable/transformations/event-flattening.html)

</details>

---

## 📌 Debezium 구성 요소

### CDC-006
Debezium 커넥터의 주요 구성 요소와 각 요소의 역할에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Debezium 커넥터 주요 구성 요소:**

**1. Kafka Connect Framework:**
```
┌────────────────────────────────────────────────┐
│                Kafka Connect                    │
│  ┌──────────────┐    ┌──────────────────────┐  │
│  │   Worker     │    │      Worker          │  │
│  │  ┌────────┐  │    │  ┌────────────────┐  │  │
│  │  │Debezium│  │    │  │  ES Sink       │  │  │
│  │  │Connector│ │    │  │  Connector     │  │  │
│  │  └────────┘  │    │  └────────────────┘  │  │
│  └──────────────┘    └──────────────────────┘  │
└────────────────────────────────────────────────┘
```

**2. 핵심 구성 요소:**

| 구성 요소 | 역할 | 저장 위치 |
|----------|------|----------|
| **Connector** | 커넥터 설정, 태스크 관리 | Kafka Connect 설정 토픽 |
| **Task** | 실제 데이터 캡처 수행 | Worker 프로세스 |
| **Offset Storage** | 처리 위치 추적 | Kafka 토픽 (connect-offsets) |
| **Schema History** | DDL 변경 이력 | Kafka 토픽 (schema-history) |
| **Schema Registry** | 스키마 버전 관리 | 별도 서비스 (선택) |

**3. Debezium 내부 구성:**

```
Debezium Connector
├── SnapshotReader      # 초기 스냅샷 수행
├── BinlogReader        # 스트리밍 변경 캡처 (MySQL)
├── SchemaHistory       # 스키마 변경 이력 관리
├── TopicSelector       # 토픽 이름 결정
├── ChangeEventMaker    # 이벤트 구조 생성
└── Transforms (SMT)    # 메시지 변환
```

**4. Schema History의 중요성:**
- DDL 문(CREATE, ALTER)을 기록
- 과거 시점의 테이블 구조 재구성에 필요
- 커넥터 재시작 시 스키마 복원

```json
{
  "schema.history.internal.kafka.bootstrap.servers": "kafka:9092",
  "schema.history.internal.kafka.topic": "schema-history.mydb",
  "schema.history.internal.store.only.captured.tables.ddl": "true"
}
```

**5. Offset의 구조 (MySQL):**
```json
{
  "file": "mysql-bin.000003",
  "pos": 12345,
  "gtid": "xxx:1-100",
  "server_id": 1
}
```

**함정 질문 - "Kafka 없이 Debezium을 사용할 수 있나요?":**
예, 가능합니다! Debezium은 여러 배포 모드를 지원합니다:
- **Kafka Connect 모드**: 표준 방식, 프로덕션 권장
- **Debezium Server**: Kafka 없이 직접 타겟으로 전송 (Pulsar, Kinesis, Redis 등)
- **Embedded Engine**: 애플리케이션 내장 사용

**참고자료**
- [Debezium Architecture](https://debezium.io/documentation/reference/stable/architecture.html)
- [Debezium Server](https://debezium.io/documentation/reference/stable/operations/debezium-server.html)

</details>

---

## 📌 CDC 데이터 일관성

### CDC-007
Debezium CDC를 활용해 데이터 일관성을 유지하는 방법에는 어떤 것들이 있나요?

<details>
<summary>답변</summary>

**Debezium 데이터 일관성 보장 메커니즘:**

**1. 스냅샷 일관성:**
- **Snapshot Isolation**: 트랜잭션 격리 수준을 활용한 일관된 읽기
- MySQL: `REPEATABLE READ` + `LOCK TABLES` (선택적)
- PostgreSQL: 트랜잭션 스냅샷 사용

```json
{
  "snapshot.mode": "initial",
  "snapshot.locking.mode": "minimal"  // none, minimal, extended
}
```

**2. 이벤트 순서 보장:**
- **파티션 키**: 동일 레코드는 동일 파티션으로 전송 → 순서 보장
- **토픽 파티셔닝**: 테이블 PK 기반 파티션 할당

```
테이블: users (id=1,2,3...)
  └─ Partition 0: id % 3 == 0
  └─ Partition 1: id % 3 == 1
  └─ Partition 2: id % 3 == 2
```

**3. Exactly-Once 의미론:**

| 레벨 | 보장 수준 | 설정 |
|------|----------|------|
| Debezium → Kafka | At-least-once | 기본값 |
| Kafka → Consumer | 설정에 따라 다름 | 트랜잭션 사용 가능 |
| End-to-End | At-least-once | 멱등성 구현 필요 |

**4. 트랜잭션 메타데이터:**
```json
{
  "transaction": {
    "id": "file=mysql-bin.000003,pos=12345",
    "total_order": 1,
    "data_collection_order": 1
  }
}
```

**5. Outbox 패턴과의 결합:**
```
┌─────────────────────────────────────────────────┐
│ 애플리케이션 트랜잭션                             │
│   1. 비즈니스 테이블 UPDATE                      │
│   2. Outbox 테이블 INSERT (같은 트랜잭션)        │
└─────────────────────────────────────────────────┘
                    ↓ Debezium 캡처
┌─────────────────────────────────────────────────┐
│ Outbox 이벤트만 Kafka로 발행                     │
│   - 메시지 순서 보장                             │
│   - 트랜잭션 원자성 활용                         │
└─────────────────────────────────────────────────┘
```

**함정 질문 - "Debezium이 Exactly-Once를 보장하나요?":**
기본적으로 **At-Least-Once**입니다. Exactly-Once를 위해서는:
1. Consumer 측에서 **멱등성** 구현 (PK 기반 upsert)
2. Kafka Transactions 활용 (제한적)
3. 메시지 중복 제거 로직 구현

**운영 환경 체크리스트:**
- [ ] Consumer 멱등성 처리 구현
- [ ] Dead Letter Queue 설정
- [ ] 재처리 시나리오 테스트
- [ ] 순서 의존성 분석

**참고자료**
- [Debezium - Data consistency](https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-topic-names)
- [Outbox Pattern](https://debezium.io/blog/2019/02/19/reliable-microservices-data-exchange-with-the-outbox-pattern/)

</details>

---

## 📌 Debezium 스키마 변경

### CDC-008
Debezium이 스키마 변경(schema evolution)을 감지하고 처리하는 방식은 무엇인가요?

<details>
<summary>답변</summary>

**Debezium 스키마 변경 처리 메커니즘:**

**1. 스키마 히스토리 저장:**
```json
{
  "schema.history.internal.kafka.topic": "schema-changes.inventory",
  "schema.history.internal.kafka.bootstrap.servers": "kafka:9092"
}
```

**2. DDL 이벤트 캡처:**
MySQL binlog에서 DDL 문장을 감지하고 스키마 히스토리에 저장:
```json
{
  "source": { "server": "dbserver1" },
  "position": { "file": "mysql-bin.000003", "pos": 12345 },
  "databaseName": "inventory",
  "ddl": "ALTER TABLE products ADD COLUMN weight DECIMAL(10,2)",
  "tableChanges": [...]
}
```

**3. 스키마 진화 호환성:**

| 변경 유형 | Avro 호환성 | 처리 방법 |
|----------|------------|----------|
| 컬럼 추가 (기본값 있음) | Backward | 자동 처리 |
| 컬럼 추가 (기본값 없음) | Forward | 주의 필요 |
| 컬럼 삭제 | Forward | 주의 필요 |
| 컬럼 타입 변경 | 비호환 | 수동 개입 필요 |
| 컬럼 이름 변경 | 비호환 | 수동 개입 필요 |

**4. Schema Registry 연동:**
```json
{
  "key.converter": "io.confluent.connect.avro.AvroConverter",
  "key.converter.schema.registry.url": "http://schema-registry:8081",
  "value.converter": "io.confluent.connect.avro.AvroConverter",
  "value.converter.schema.registry.url": "http://schema-registry:8081"
}
```

**5. 스키마 변경 전략:**

**트레이드오프:**
| 전략 | 장점 | 단점 |
|------|------|------|
| **In-place 변경** | 단순, 연속성 유지 | 비호환 변경 시 Consumer 영향 |
| **새 토픽 생성** | 완전한 격리 | 마이그레이션 복잡 |
| **버전 필드 추가** | 유연한 처리 | Consumer 로직 복잡 |

**함정 질문 - "스키마 변경 시 커넥터가 자동으로 처리하나요?":**
부분적으로 그렇습니다:
- **호환 가능한 변경** (컬럼 추가): 자동 처리
- **비호환 변경** (타입 변경, 이름 변경): Consumer 오류 가능
- **테이블 삭제/재생성**: 커넥터 재시작 필요할 수 있음

**운영 시 권장 사항:**
1. Schema Registry 사용하여 호환성 검증
2. DDL 변경 전 Consumer 영향도 분석
3. Blue-Green 배포로 안전한 스키마 마이그레이션
4. 스키마 히스토리 토픽 백업

```bash
# 스키마 호환성 확인
curl -X POST -H "Content-Type: application/vnd.schemaregistry.v1+json" \
  --data '{"schema": "..."}' \
  http://schema-registry:8081/compatibility/subjects/topic-value/versions/latest
```

**참고자료**
- [Debezium - Schema History](https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-schema-history-topic)
- [Schema Registry Compatibility](https://docs.confluent.io/platform/current/schema-registry/avro.html)

</details>

---

## 📌 MySQL Binlog 형식

### CDC-009
MySQL binlog의 형식(ROW, STATEMENT, MIXED)과 Debezium CDC 캡처와의 관계에 대해 설명해주세요.

<details>
<summary>답변</summary>

**MySQL Binlog 형식 비교:**

| 형식 | 저장 내용 | 예시 |
|------|----------|------|
| **STATEMENT** | SQL 문장 자체 | `UPDATE users SET age=30 WHERE id=1` |
| **ROW** | 변경된 행 데이터 | `before: {id:1, age:20}, after: {id:1, age:30}` |
| **MIXED** | 상황에 따라 자동 선택 | 비결정적 함수 시 ROW, 그 외 STATEMENT |

**Debezium과 Binlog 형식 관계:**

**ROW 형식이 필수인 이유:**
```
STATEMENT 형식의 문제:
  UPDATE users SET updated_at = NOW() WHERE status = 'active'

  → Replica에서 NOW()가 다른 시간을 반환할 수 있음
  → Debezium은 실제 변경된 값을 알 수 없음

ROW 형식의 장점:
  → 실제 변경된 데이터 값 포함
  → before/after 상태 모두 캡처 가능
  → 결정적(deterministic) 결과
```

**binlog_row_image 설정:**

| 설정 | before 이미지 | after 이미지 | 용도 |
|------|--------------|-------------|------|
| **FULL** | 모든 컬럼 | 모든 컬럼 | Debezium 권장 |
| **MINIMAL** | PK만 | 변경된 컬럼만 | 저장 공간 절약 |
| **NOBLOB** | BLOB 제외 | BLOB 제외 | 대용량 BLOB 제외 |

**설정 확인 및 변경:**
```sql
-- 현재 설정 확인
SHOW VARIABLES LIKE 'binlog_format';
SHOW VARIABLES LIKE 'binlog_row_image';

-- 설정 변경 (서버 재시작 필요)
SET GLOBAL binlog_format = 'ROW';
SET GLOBAL binlog_row_image = 'FULL';
```

**함정 질문 - "MIXED 형식을 사용해도 되나요?":**
**사용하지 않는 것이 좋습니다.** 이유:
1. 비결정적 함수가 있을 때만 ROW로 전환
2. 일부 이벤트가 STATEMENT로 기록될 수 있음
3. Debezium이 STATEMENT 이벤트를 처리하지 못함
4. 데이터 누락 위험

**트레이드오프 - ROW 형식의 비용:**

| 고려사항 | ROW | STATEMENT |
|---------|-----|-----------|
| **저장 공간** | 더 큼 (각 행 저장) | 더 작음 (SQL만 저장) |
| **네트워크 대역폭** | 더 많음 | 더 적음 |
| **CDC 호환성** | 완전 호환 | 비호환 |
| **Replica 일관성** | 보장 | 비결정적 함수 시 불일치 가능 |

**운영 환경 권장 설정:**
```ini
[mysqld]
binlog_format = ROW
binlog_row_image = FULL
expire_logs_days = 3
max_binlog_size = 100M
```

**참고자료**
- [MySQL Binary Log Formats](https://dev.mysql.com/doc/refman/8.0/en/binary-log-formats.html)
- [Debezium MySQL Prerequisites](https://debezium.io/documentation/reference/stable/connectors/mysql.html#setting-up-mysql)

</details>

---

## 📌 Debezium Snapshot

### CDC-010
Debezium 설정에서 snapshot 옵션의 역할과 관련 설정 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Debezium Snapshot 모드:**

**스냅샷의 목적:**
커넥터 시작 시 기존 데이터의 일관된 복사본을 생성하여, 이후 실시간 CDC 스트리밍으로 전환

**주요 Snapshot 모드:**

| 모드 | 동작 | 사용 시나리오 |
|------|------|--------------|
| **initial** (기본) | 최초 시작 시 스냅샷, 이후 스트리밍 | 새로운 CDC 파이프라인 구축 |
| **initial_only** | 스냅샷만 수행, 스트리밍 안 함 | 일회성 데이터 마이그레이션 |
| **when_needed** | 오프셋 없거나 binlog 만료 시 스냅샷 | 자동 복구 필요 시 |
| **schema_only** | 스키마만 캡처, 데이터 스냅샷 없음 | 신규 데이터만 필요 시 |
| **schema_only_recovery** | 스키마 복구용 | 스키마 히스토리 손상 시 |
| **never** | 스냅샷 절대 안 함 | binlog 위치 직접 지정 시 |
| **no_data** | 스키마만 (initial 완료 후) | 재시작 시 데이터 스킵 |

**트레이드오프 - Snapshot 모드 선택:**

```
                    ┌─────────────────────────────────┐
                    │     기존 데이터가 필요한가?      │
                    └───────────────┬─────────────────┘
                           ├── Yes ──┐
                           │         ↓
                           │   ┌─────────────────────┐
                           │   │ 대용량 테이블인가?   │
                           │   └──────────┬──────────┘
                           │         ├── Yes → incremental snapshot 고려
                           │         └── No  → initial
                           │
                           └── No ───→ schema_only
```

**Snapshot 설정 옵션:**
```json
{
  "snapshot.mode": "initial",
  "snapshot.locking.mode": "minimal",
  "snapshot.fetch.size": 10240,
  "snapshot.max.threads": 1,
  "snapshot.select.statement.overrides": "mydb.large_table"
}
```

**Locking 모드:**

| 모드 | 동작 | 트레이드오프 |
|------|------|-------------|
| **minimal** | 스키마 읽기 시만 짧은 락 | 권장, 대부분 상황에 적합 |
| **extended** | 스냅샷 전체 기간 락 | 완벽한 일관성, 쓰기 차단 |
| **none** | 락 없음 | 일관성 보장 안 됨 |

**Incremental Snapshot (Debezium 1.6+):**
대용량 테이블을 청크 단위로 스냅샷:
```json
{
  "signal.data.collection": "mydb.debezium_signal",
  "incremental.snapshot.chunk.size": 1024
}
```

**스냅샷 트리거 신호:**
```sql
INSERT INTO debezium_signal (id, type, data) VALUES
('ad-hoc-1', 'execute-snapshot', '{"data-collections": ["mydb.users"]}');
```

**함정 질문 - "스냅샷 중에 변경된 데이터는 어떻게 되나요?":**
Debezium은 이를 처리합니다:
1. 스냅샷 시작 시 binlog 위치 기록
2. 스냅샷 완료 후 해당 위치부터 스트리밍
3. 중복 이벤트 가능 → Consumer 멱등성 필요

**참고자료**
- [Debezium Snapshots](https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-snapshots)
- [Incremental Snapshots](https://debezium.io/documentation/reference/stable/configuration/signalling.html)

</details>

---

## 📌 Debezium 지연 문제

### CDC-011
Debezium 사용 시 snapshot 및 CDC 캡처 과정에서 발생할 수 있는 데이터 지연(latency) 문제와 해결 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Debezium 지연 발생 원인과 해결책:**

**1. 스냅샷 단계 지연:**

| 원인 | 해결책 |
|------|--------|
| 대용량 테이블 | Incremental Snapshot 사용 |
| 전체 테이블 락 | `snapshot.locking.mode=minimal` |
| 느린 SELECT | `snapshot.fetch.size` 조정 |
| 단일 스레드 처리 | `snapshot.max.threads` 증가 |

```json
{
  "snapshot.fetch.size": 10240,
  "snapshot.max.threads": 4,
  "snapshot.locking.mode": "minimal"
}
```

**2. 스트리밍 단계 지연:**

| 원인 | 해결책 |
|------|--------|
| Kafka Producer 배치 | `max.batch.size`, `linger.ms` 조정 |
| 네트워크 지연 | 지역 근접성 확보 |
| 변환 처리 오버헤드 | SMT 최소화 |
| 스키마 레지스트리 지연 | 캐싱 설정 |

**3. Consumer 단계 지연:**

```
┌──────────┐    ┌───────┐    ┌──────────┐    ┌────────┐
│ Debezium │───▶│ Kafka │───▶│ Consumer │───▶│ Target │
└──────────┘    └───────┘    └──────────┘    └────────┘
     ↑              ↑              ↑              ↑
   ~10ms        ~1-5ms         ~10-100ms      ~10-50ms

총 End-to-End: 30-200ms (정상)
```

**지연 모니터링 메트릭:**
```
# Debezium JMX 메트릭
debezium.mysql.connector.MilliSecondsBehindSource
debezium.mysql.connector.NumberOfEventsFiltered
debezium.mysql.connector.SourceEventPosition

# Kafka Consumer Lag
kafka-consumer-groups.sh --describe --group my-consumer
```

**트레이드오프 - 지연 vs 처리량:**

| 설정 | 낮은 지연 | 높은 처리량 |
|------|----------|------------|
| `max.batch.size` | 작게 (1-10) | 크게 (1000+) |
| `linger.ms` | 0-5ms | 50-200ms |
| `poll.interval.ms` | 작게 (100ms) | 크게 (1000ms) |

**Heartbeat 설정:**
유휴 테이블에서도 오프셋 업데이트:
```json
{
  "heartbeat.interval.ms": 10000,
  "heartbeat.topics.prefix": "__debezium-heartbeat"
}
```

**함정 질문 - "실시간(Real-time)을 보장하나요?":**
**Near Real-time**입니다. 완전한 실시간은 아닙니다:
- 네트워크 지연
- Kafka 배치 처리
- Consumer 처리 시간
- 일반적으로 100ms-1s 수준의 지연

**운영 환경 체크리스트:**
- [ ] MilliSecondsBehindSource 메트릭 모니터링
- [ ] Consumer Lag 알림 설정
- [ ] Heartbeat 설정으로 유휴 테이블 오프셋 관리
- [ ] 대용량 트랜잭션 분리

**참고자료**
- [Debezium Monitoring](https://debezium.io/documentation/reference/stable/operations/monitoring.html)

</details>

---

## 📌 Debezium 데이터 정합성

### CDC-012
Debezium을 통한 MySQL과 Elasticsearch 간 동기화 과정에서 발생할 수 있는 데이터 정합성 이슈는 무엇이며, 이를 어떻게 해결할 수 있나요?

<details>
<summary>답변</summary>

**MySQL-Elasticsearch 동기화 정합성 이슈:**

**1. 이벤트 순서 역전:**
```
MySQL: INSERT(id=1) → UPDATE(id=1)
Kafka: 파티션 분산으로 순서 역전 가능
ES: UPDATE 먼저 처리 → 실패 또는 데이터 불일치
```

**해결책:**
```json
{
  "transforms": "extractKey",
  "transforms.extractKey.type": "org.apache.kafka.connect.transforms.ExtractField$Key",
  "transforms.extractKey.field": "id"
}
```
- 동일 키는 동일 파티션으로 라우팅

**2. 중복 이벤트 처리:**
```
At-least-once 전달 → 동일 이벤트 중복 수신 가능
```

**해결책:**
- ES의 문서 ID를 PK로 설정 → 자연스러운 멱등성
```json
{
  "key.ignore": "false",
  "transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState"
}
```

**3. 스키마 불일치:**

| 문제 | 원인 | 해결책 |
|------|------|--------|
| 타입 불일치 | MySQL DATETIME → ES date | ES 매핑 사전 정의 |
| 필드 누락 | nullable 컬럼 | dynamic mapping 또는 기본값 |
| 중첩 구조 | 관계형 → 문서형 | SMT로 변환 또는 Kafka Streams |

**4. DELETE 이벤트 처리:**
```json
// Debezium DELETE 이벤트
{
  "before": { "id": 1, "name": "test" },
  "after": null,
  "op": "d"
}
```

**해결책:**
```json
{
  "transforms.unwrap.delete.handling.mode": "rewrite",
  "transforms.unwrap.drop.tombstones": "false"
}
```

**5. 동기화 지연으로 인한 읽기 불일치:**
```
사용자: MySQL INSERT → 즉시 ES 검색 → 결과 없음 (아직 동기화 안 됨)
```

**해결책:**
- Read-your-writes: 쓰기 후 MySQL 직접 조회
- 최종 일관성 UI/UX 설계
- ES refresh 설정 조정 (trade-off: 성능)

**6. 참조 무결성:**
```
orders 테이블 → users 테이블 FK
users DELETE 이벤트가 orders보다 먼저 처리되면?
```

**해결책:**
- ES에서 참조 무결성 포기 (비정규화)
- 또는 Kafka Streams로 조인 후 발행

**정합성 검증 전략:**
```sql
-- 주기적 카운트 비교
SELECT COUNT(*) FROM mysql.users;
-- vs
GET /users/_count
```

**참고자료**
- [Debezium - Handling failures](https://debezium.io/documentation/reference/stable/operations/openshift.html)

</details>

---

## 📌 Debezium 메시지 포맷

### CDC-013
Debezium에서 사용되는 메시지 포맷(예: JSON, Avro 등)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Debezium 지원 메시지 포맷:**

**1. JSON (기본):**
```json
{
  "schema": { ... },  // 스키마 정보 (선택)
  "payload": {
    "before": { "id": 1, "name": "old" },
    "after": { "id": 1, "name": "new" },
    "source": {
      "version": "2.4.0",
      "connector": "mysql",
      "name": "dbserver1",
      "ts_ms": 1234567890,
      "db": "inventory",
      "table": "products"
    },
    "op": "u",
    "ts_ms": 1234567891
  }
}
```

**2. Avro:**
```json
{
  "key.converter": "io.confluent.connect.avro.AvroConverter",
  "key.converter.schema.registry.url": "http://schema-registry:8081",
  "value.converter": "io.confluent.connect.avro.AvroConverter",
  "value.converter.schema.registry.url": "http://schema-registry:8081"
}
```

**3. Protobuf:**
```json
{
  "value.converter": "io.confluent.connect.protobuf.ProtobufConverter",
  "value.converter.schema.registry.url": "http://schema-registry:8081"
}
```

**포맷 비교:**

| 특성 | JSON | Avro | Protobuf |
|------|------|------|----------|
| **가독성** | 높음 | 낮음 (바이너리) | 낮음 |
| **크기** | 큼 | 작음 | 매우 작음 |
| **스키마 진화** | 없음 | 강력함 | 강력함 |
| **처리 속도** | 느림 | 빠름 | 매우 빠름 |
| **Schema Registry 필요** | 선택 | 필수 | 필수 |

**트레이드오프 - 포맷 선택:**

```
개발/디버깅 편의성    ←──────────────────→    프로덕션 효율성
      JSON                                    Avro/Protobuf

스키마 유연성        ←──────────────────→    스키마 엄격성
      JSON                                    Avro/Protobuf
```

**JSON 옵션:**
```json
{
  "value.converter.schemas.enable": "false",  // 스키마 제외 (크기 절약)
  "key.converter.schemas.enable": "false"
}
```

**CloudEvents 형식:**
```json
{
  "transforms": "outbox",
  "transforms.outbox.type": "io.debezium.transforms.outbox.EventRouter",
  "transforms.outbox.table.expand.json.payload": "true"
}
```

**함정 질문 - "JSON이 가장 좋은 선택인가요?":**
상황에 따라 다릅니다:
- **개발/테스트**: JSON (디버깅 용이)
- **프로덕션 고처리량**: Avro/Protobuf (효율성)
- **다양한 Consumer**: JSON (범용성)
- **강력한 스키마 관리**: Avro (Schema Registry)

**메시지 구조 단순화 (SMT):**
```json
{
  "transforms": "unwrap",
  "transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState",
  "transforms.unwrap.drop.tombstones": "false",
  "transforms.unwrap.delete.handling.mode": "rewrite"
}
```

변환 전:
```json
{ "before": {...}, "after": {...}, "source": {...}, "op": "u" }
```

변환 후:
```json
{ "id": 1, "name": "new", "__deleted": false }
```

**참고자료**
- [Debezium Serialization](https://debezium.io/documentation/reference/stable/configuration/avro.html)

</details>

---

## 📌 Elasticsearch 인덱싱

### CDC-014
Elasticsearch에 실시간 데이터 인덱싱을 수행할 때 주의해야 할 점은 무엇인가요?

<details>
<summary>답변</summary>

**Elasticsearch 실시간 인덱싱 주의사항:**

**1. Refresh 간격 설정:**
```json
PUT /my-index/_settings
{
  "index": {
    "refresh_interval": "5s"  // 기본 1s, 처리량 증가 시 늘림
  }
}
```

| 설정 | 검색 가시성 | 인덱싱 성능 |
|------|------------|------------|
| 1s (기본) | 빠름 | 낮음 |
| 5-30s | 느림 | 높음 |
| -1 (비활성) | 수동 refresh | 최고 |

**2. Bulk API 활용:**
```json
// Kafka Connect ES Sink 설정
{
  "batch.size": 2000,
  "linger.ms": 100,
  "max.in.flight.requests": 5
}
```

**3. 매핑 사전 정의:**
```json
PUT /products
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "name": { "type": "text" },
      "price": { "type": "scaled_float", "scaling_factor": 100 },
      "created_at": { "type": "date", "format": "epoch_millis" }
    }
  }
}
```

**4. 문서 ID 전략:**
```
MySQL PK → ES _id
  - 자연스러운 멱등성
  - 업데이트/삭제 시 조회 없이 직접 처리
```

**트레이드오프 - 인덱싱 전략:**

| 전략 | 장점 | 단점 |
|------|------|------|
| **개별 인덱싱** | 즉각적 가시성 | 오버헤드 큼 |
| **Bulk 배치** | 효율적 | 지연 발생 |
| **Ingest Pipeline** | 전처리 가능 | 추가 지연 |

**5. 인덱스 라이프사이클 관리 (ILM):**
```json
PUT _ilm/policy/cdc-policy
{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": {
            "max_size": "50GB",
            "max_age": "30d"
          }
        }
      },
      "delete": {
        "min_age": "90d",
        "actions": { "delete": {} }
      }
    }
  }
}
```

**6. 에러 처리:**
```json
{
  "errors.tolerance": "all",
  "errors.deadletterqueue.topic.name": "dlq-es-sink",
  "errors.deadletterqueue.context.headers.enable": true
}
```

**함정 질문 - "실시간 검색이 가능한가요?":**
**Near Real-time**입니다:
- ES의 refresh_interval만큼 지연
- Segment merge로 인한 추가 지연
- 진정한 실시간이 필요하면 다른 솔루션 고려

**운영 체크리스트:**
- [ ] 매핑 사전 정의 (dynamic mapping 최소화)
- [ ] 적절한 샤드 수 설정
- [ ] Refresh interval 튜닝
- [ ] Bulk size 최적화
- [ ] DLQ 설정 및 모니터링

**참고자료**
- [Elasticsearch Indexing Performance](https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-indexing-speed.html)

</details>

---

## 📌 Debezium 장애 복구

### CDC-015
Debezium 커넥터의 장애 복구 및 재시작 시 동작 방식에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Debezium 장애 복구 메커니즘:**

**1. 오프셋 기반 복구:**
```
커넥터 중단
    ↓
마지막 커밋된 오프셋 확인 (Kafka 토픽: connect-offsets)
    ↓
해당 binlog 위치부터 재개
    ↓
At-least-once 보장 (중복 가능)
```

**2. 오프셋 저장 구조:**
```json
// connect-offsets 토픽
{
  "connector": "mysql-connector",
  "server": "dbserver1"
}
→
{
  "file": "mysql-bin.000003",
  "pos": 12345,
  "gtid": "xxx:1-100",
  "ts_sec": 1234567890
}
```

**3. 장애 시나리오별 복구:**

| 시나리오 | 동작 | 주의사항 |
|---------|------|---------|
| **커넥터 재시작** | 오프셋부터 재개 | 중복 이벤트 가능 |
| **Binlog 만료** | 스냅샷 필요 | when_needed 모드 권장 |
| **스키마 히스토리 손상** | 복구 필요 | schema_only_recovery 모드 |
| **Kafka Connect 장애** | Worker 페일오버 | 분산 모드 권장 |

**4. 분산 모드 장점:**
```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Worker 1   │    │   Worker 2   │    │   Worker 3   │
│  [Connector] │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
        ↓ Worker 1 장애 발생
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Worker 1   │    │   Worker 2   │    │   Worker 3   │
│     (down)   │    │  [Connector] │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
                    (자동 리밸런싱)
```

**5. Binlog 만료 대응:**
```json
{
  "snapshot.mode": "when_needed",
  // binlog 위치를 찾을 수 없으면 자동 스냅샷
}
```

**트레이드오프 - 복구 전략:**

| 전략 | 장점 | 단점 |
|------|------|------|
| **when_needed** | 자동 복구 | 예상치 못한 스냅샷 |
| **never** | 스냅샷 없음 | 수동 개입 필요 |
| **GTID 사용** | 쉬운 위치 추적 | MySQL 5.6.5+ 필요 |

**6. 수동 오프셋 조정:**
```bash
# 오프셋 확인
kafka-console-consumer.sh --topic connect-offsets \
  --bootstrap-server kafka:9092 --from-beginning

# 오프셋 수동 설정 (주의 필요!)
kafka-console-producer.sh --topic connect-offsets \
  --bootstrap-server kafka:9092 \
  --property "parse.key=true" \
  --property "key.separator=|"
```

**함정 질문 - "Exactly-once 복구가 가능한가요?":**
기본적으로 **At-least-once**입니다:
- 커넥터 실패 후 재시작 시 중복 발생 가능
- Consumer 측 멱등성으로 해결

**운영 권장사항:**
- [ ] 분산 모드 Kafka Connect 사용
- [ ] GTID 활성화 (MySQL)
- [ ] Binlog 보관 기간 충분히 설정
- [ ] 오프셋/스키마 히스토리 토픽 백업

**참고자료**
- [Debezium - Fault Tolerance](https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-snapshots)

</details>

---

## 📌 Debezium 이벤트 처리

### CDC-016
MySQL 테이블 변경 감지 시 Debezium이 binlog를 기반으로 이벤트를 처리하는 전체 과정을 설명해주세요.

<details>
<summary>답변</summary>

**Debezium MySQL 이벤트 처리 전체 흐름:**

**1. 전체 아키텍처:**
```
┌────────────────────────────────────────────────────────────────────┐
│                         MySQL Server                               │
│  ┌──────────┐    ┌──────────────┐    ┌─────────────────────────┐  │
│  │  Table   │───▶│  Binlog      │───▶│  Replication Stream     │  │
│  │  (InnoDB)│    │  (ROW format)│    │  (Binary Log Dump)      │  │
│  └──────────┘    └──────────────┘    └───────────┬─────────────┘  │
└────────────────────────────────────────────────────│───────────────┘
                                                     │
                                                     ▼
┌────────────────────────────────────────────────────────────────────┐
│                      Debezium Connector                            │
│  ┌───────────────┐    ┌───────────────┐    ┌──────────────────┐   │
│  │ BinlogReader  │───▶│ EventDeserializer│─▶│ ChangeEventMaker│   │
│  │ (MySQL Client)│    │ (ROW → Object)   │  │ (Object → Event)│   │
│  └───────────────┘    └───────────────────┘ └───────┬──────────┘   │
└──────────────────────────────────────────────────────│─────────────┘
                                                       ▼
┌────────────────────────────────────────────────────────────────────┐
│                        Kafka Connect                               │
│  ┌─────────────┐    ┌───────────────┐    ┌────────────────────┐   │
│  │ Transforms  │───▶│ Converter     │───▶│ Kafka Producer     │   │
│  │ (SMT)       │    │ (JSON/Avro)   │    │ (Send to Broker)   │   │
│  └─────────────┘    └───────────────┘    └────────────────────┘   │
└────────────────────────────────────────────────────────────────────┘
```

**2. 상세 처리 단계:**

**Step 1: MySQL 트랜잭션 발생**
```sql
BEGIN;
UPDATE users SET name = 'new_name' WHERE id = 1;
COMMIT;
```

**Step 2: Binlog 기록**
```
Event: UPDATE_ROWS_EVENT
Table: users
Before: {id: 1, name: 'old_name', updated_at: '2024-01-01'}
After:  {id: 1, name: 'new_name', updated_at: '2024-01-02'}
```

**Step 3: Debezium Binlog Reader**
```java
// MySQL Replication Protocol로 이벤트 수신
BinaryLogClient client = new BinaryLogClient(host, port, user, password);
client.registerEventListener(event -> processEvent(event));
```

**Step 4: Event Deserialization**
```
Binary Event → Java Object
  - TableMapEvent: 테이블 메타데이터
  - WriteRowsEvent: INSERT
  - UpdateRowsEvent: UPDATE
  - DeleteRowsEvent: DELETE
```

**Step 5: Change Event 생성**
```json
{
  "before": {"id": 1, "name": "old_name"},
  "after": {"id": 1, "name": "new_name"},
  "source": {
    "version": "2.4.0",
    "connector": "mysql",
    "name": "dbserver1",
    "ts_ms": 1704153600000,
    "db": "mydb",
    "table": "users",
    "file": "mysql-bin.000003",
    "pos": 12345,
    "gtid": "xxx:100"
  },
  "op": "u",
  "ts_ms": 1704153600100
}
```

**Step 6: SMT 적용 (선택)**
```
ExtractNewRecordState → {"id": 1, "name": "new_name"}
```

**Step 7: Kafka 발행**
```
Topic: dbserver1.mydb.users
Key: {"id": 1}
Value: {change event}
```

**Step 8: 오프셋 커밋**
```json
// connect-offsets 토픽에 저장
{"file": "mysql-bin.000003", "pos": 12400}
```

**함정 질문 - "모든 binlog 이벤트를 처리하나요?":**
아닙니다:
- `table.include.list`로 필터링
- `column.exclude.list`로 컬럼 제외
- DDL 이벤트는 스키마 히스토리에만 저장 (별도 토픽 발행 선택)

**참고자료**
- [Debezium MySQL Connector - How it works](https://debezium.io/documentation/reference/stable/connectors/mysql.html#how-the-mysql-connector-works)

</details>

---

## 📌 Debezium Offset

### CDC-017
Debezium의 offset 커밋 메커니즘과 장애 복구 시 데이터 지속성 보장 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Debezium Offset 관리 메커니즘:**

**1. Offset 구조:**
```json
// Key
["mysql-connector", {"server": "dbserver1"}]

// Value (MySQL)
{
  "ts_sec": 1704153600,
  "file": "mysql-bin.000003",
  "pos": 12345,
  "gtid": "3E11FA47-71CA-11E1-9E33-C80AA9429562:1-100",
  "snapshot": false
}
```

**2. Offset 저장 위치:**

| 모드 | 저장 위치 | 용도 |
|------|----------|------|
| **분산 모드** | Kafka 토픽 (connect-offsets) | 프로덕션 권장 |
| **단독 모드** | 로컬 파일 | 개발/테스트 |
| **Embedded** | 커스텀 스토어 | 애플리케이션 내장 |

**3. Offset 커밋 흐름:**
```
Binlog 이벤트 읽기
       ↓
Change Event 생성
       ↓
Kafka Producer Send
       ↓
Producer Ack 수신
       ↓
Offset 커밋 (비동기/주기적)
       ↓
connect-offsets 토픽에 저장
```

**4. Offset 커밋 설정:**
```json
{
  "offset.flush.interval.ms": 60000,      // 커밋 주기 (기본 60초)
  "offset.flush.timeout.ms": 5000,        // 커밋 타임아웃
  "offset.storage.partitions": 25,        // 파티션 수
  "offset.storage.replication.factor": 3  // 복제 팩터
}
```

**트레이드오프 - 커밋 주기:**

| 설정 | 짧은 주기 (1-5초) | 긴 주기 (60초+) |
|------|------------------|----------------|
| **데이터 손실** | 최소화 | 장애 시 더 많은 중복 |
| **성능** | 오버헤드 증가 | 효율적 |
| **복구 시간** | 빠름 | 더 많은 재처리 |

**5. 장애 시나리오:**

```
정상 처리:
  Event A → Kafka Send ✓ → Offset Commit A ✓
  Event B → Kafka Send ✓ → Offset Commit B ✓

장애 발생 (커밋 전):
  Event C → Kafka Send ✓ → (장애) → Offset Commit C ✗

재시작:
  마지막 커밋된 오프셋 B부터 재개
  Event C 중복 발행 (At-least-once)
```

**6. GTID vs File:Position:**

| 방식 | 장점 | 단점 |
|------|------|------|
| **GTID** | 자동 위치 추적, 페일오버 지원 | MySQL 5.6.5+ |
| **File:Position** | 단순, 모든 버전 지원 | 수동 관리 필요 |

**7. 스냅샷 중 Offset:**
```json
{
  "snapshot": true,
  "snapshot_completed": false,
  "ts_sec": 0,
  "file": "mysql-bin.000003",
  "pos": 12345
}
```
- 스냅샷 시작 시 binlog 위치 기록
- 스냅샷 완료 후 해당 위치부터 스트리밍

**함정 질문 - "Offset만 있으면 복구 가능한가요?":**
Offset과 함께 **스키마 히스토리**도 필요합니다:
- 과거 시점의 테이블 구조 정보
- DDL 변경 이력
- 없으면 이벤트 파싱 실패

**운영 권장사항:**
- [ ] GTID 사용 권장
- [ ] offset.flush.interval.ms 적절히 설정
- [ ] connect-offsets 토픽 replication factor 3+
- [ ] 스키마 히스토리 토픽과 함께 백업

**참고자료**
- [Kafka Connect Offset Management](https://docs.confluent.io/platform/current/connect/concepts.html#connect-offsets)

</details>

---

## 📌 CDC 트랜잭션 처리

### CDC-018
CDC 구현 시 데이터 일관성을 위한 트랜잭션 처리 방식과 Debezium의 역할에 대해 설명해주세요.

<details>
<summary>답변</summary>

**CDC 트랜잭션 처리 방식:**

**1. 트랜잭션 메타데이터:**
Debezium은 트랜잭션 경계 정보를 제공합니다:
```json
{
  "source": {
    "ts_ms": 1704153600000,
    "gtid": "xxx:100"
  },
  "transaction": {
    "id": "file=mysql-bin.000003,pos=12345",
    "total_order": 1,      // 트랜잭션 내 전체 순서
    "data_collection_order": 1  // 테이블 내 순서
  }
}
```

**2. 트랜잭션 경계 토픽:**
```json
{
  "provide.transaction.metadata": "true",
  "transaction.topic": "dbserver1.transaction"
}
```

트랜잭션 시작/종료 이벤트:
```json
// BEGIN
{"status": "BEGIN", "id": "xxx:100", "event_count": null}

// END
{"status": "END", "id": "xxx:100", "event_count": 5}
```

**3. 트랜잭션 일관성 패턴:**

**패턴 1: Outbox 패턴**
```
┌─────────────────────────────────────────────┐
│ 애플리케이션 트랜잭션                        │
│   1. orders 테이블 INSERT                   │
│   2. outbox 테이블 INSERT                   │
│   (같은 트랜잭션 - 원자성 보장)              │
└─────────────────────────────────────────────┘
               ↓ Debezium
┌─────────────────────────────────────────────┐
│ outbox 이벤트만 캡처 → Kafka 발행           │
│ (EventRouter SMT 사용)                      │
└─────────────────────────────────────────────┘
```

```json
{
  "transforms": "outbox",
  "transforms.outbox.type": "io.debezium.transforms.outbox.EventRouter",
  "transforms.outbox.table.field.event.id": "id",
  "transforms.outbox.table.field.event.key": "aggregate_id",
  "transforms.outbox.table.field.event.type": "event_type",
  "transforms.outbox.table.field.event.payload": "payload"
}
```

**패턴 2: 트랜잭션 버퍼링 (Consumer)**
```
Consumer에서 트랜잭션 경계까지 버퍼링:
  1. BEGIN 수신 → 버퍼 시작
  2. 이벤트들 버퍼에 저장
  3. END 수신 → 버퍼 일괄 처리 → 커밋
```

**트레이드오프:**

| 접근 방식 | 장점 | 단점 |
|----------|------|------|
| **이벤트별 처리** | 단순, 낮은 지연 | 트랜잭션 경계 무시 |
| **트랜잭션 버퍼링** | 원자성 보장 | 메모리 사용, 지연 증가 |
| **Outbox 패턴** | 명시적 이벤트 설계 | 추가 테이블 필요 |

**4. 대용량 트랜잭션 처리:**
```json
{
  "max.batch.size": 2048,
  "max.queue.size": 8192,
  "max.queue.size.in.bytes": 0  // 무제한
}
```

주의: 매우 큰 트랜잭션은 메모리 문제 유발 가능

**함정 질문 - "Debezium이 트랜잭션 원자성을 보장하나요?":**
**부분적입니다:**
- 동일 트랜잭션 이벤트는 순서대로 발행
- 하지만 Kafka에서 Consumer가 일부만 처리하고 실패할 수 있음
- Consumer 측에서 트랜잭션 경계 처리 필요

**운영 권장사항:**
- [ ] 중요 이벤트는 Outbox 패턴 사용
- [ ] 트랜잭션 메타데이터 활성화
- [ ] 대용량 트랜잭션 모니터링

**참고자료**
- [Debezium Transaction Metadata](https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-transaction-metadata)
- [Outbox Pattern](https://debezium.io/blog/2019/02/19/reliable-microservices-data-exchange-with-the-outbox-pattern/)

</details>

---

## 📌 CDC 데이터 중복

### CDC-019
Debezium CDC 도입 시 데이터 중복 문제가 발생할 수 있는데, 이를 해결하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Debezium 데이터 중복 발생 원인:**

**1. 중복 발생 시나리오:**
```
시나리오 1: 커넥터 재시작
  Event A 발행 → Kafka Ack 수신 → (장애) → Offset 커밋 실패
  재시작 후 → Event A 재발행 (중복)

시나리오 2: 스냅샷-스트리밍 전환
  스냅샷 중 binlog 변경 발생
  스냅샷 완료 후 해당 binlog부터 재개 → 중복 가능

시나리오 3: Kafka Producer 재시도
  네트워크 타임아웃 → 재시도 → 실제로는 첫 시도 성공했을 수 있음
```

**2. 중복 해결 전략:**

**전략 1: Consumer 멱등성 (권장)**
```sql
-- Upsert 패턴
INSERT INTO target_table (id, name, updated_at)
VALUES (?, ?, ?)
ON DUPLICATE KEY UPDATE name = VALUES(name), updated_at = VALUES(updated_at);
```

```json
// Elasticsearch - 문서 ID로 PK 사용
PUT /products/_doc/1
{
  "id": 1,
  "name": "product"
}
// 동일 ID는 덮어쓰기 → 자연스러운 멱등성
```

**전략 2: Kafka Producer 멱등성**
```json
{
  "producer.override.enable.idempotence": "true",
  "producer.override.max.in.flight.requests.per.connection": 5,
  "producer.override.acks": "all"
}
```

**전략 3: 중복 제거 로직**
```java
// 이벤트 ID 기반 중복 확인
String eventId = record.source().get("gtid") + ":" + record.source().get("pos");
if (processedEvents.contains(eventId)) {
    return; // 중복 스킵
}
processedEvents.add(eventId);
process(record);
```

**전략 4: 트랜잭션 아웃박스**
```java
// 아웃박스 테이블에 이벤트 ID 포함
INSERT INTO outbox (event_id, aggregate_id, event_type, payload)
VALUES (UUID(), ?, ?, ?);
// Consumer에서 event_id로 중복 확인
```

**3. 중복 제거 레벨:**

| 레벨 | 방법 | 트레이드오프 |
|------|------|-------------|
| **Kafka** | 멱등성 Producer | 순서 제한 (max 5) |
| **Consumer** | 멱등성 처리 | 구현 필요 |
| **Storage** | Upsert/문서ID | DB 지원 필요 |
| **Application** | 이벤트 ID 추적 | 상태 관리 필요 |

**4. 중복 추적 구현 예시:**
```java
// Redis 기반 중복 추적
String eventKey = "processed:" + gtid;
if (redis.setnx(eventKey, "1", Duration.ofHours(24))) {
    // 새 이벤트 - 처리
    processEvent(event);
} else {
    // 중복 이벤트 - 스킵
    log.debug("Duplicate event: {}", gtid);
}
```

**함정 질문 - "Exactly-once를 보장하나요?":**
**기본적으로 At-least-once입니다:**
- Debezium + Kafka = At-least-once
- Exactly-once는 Consumer 구현에 따라 달성 가능
- Kafka Transactions + 멱등성 Consumer = Effectively Exactly-once

**운영 권장사항:**
- [ ] 모든 Consumer에 멱등성 로직 구현
- [ ] Primary Key 기반 Upsert 사용
- [ ] 이벤트 ID(GTID 등)로 중복 추적
- [ ] 중복 이벤트 모니터링

**참고자료**
- [Debezium - Handling duplicates](https://debezium.io/blog/2020/02/10/event-sourcing-vs-cdc/)

</details>

---

## 📌 Debezium 필터링

### CDC-020
Debezium 커넥터에서 특정 테이블이나 이벤트만 필터링하는 기능에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Debezium 필터링 기능:**

**1. 테이블/데이터베이스 필터링:**
```json
{
  // 데이터베이스 필터링
  "database.include.list": "inventory,sales",
  "database.exclude.list": "test,staging",

  // 테이블 필터링 (정규식 지원)
  "table.include.list": "inventory.products,inventory.orders",
  "table.exclude.list": "inventory.audit_.*,inventory.temp_.*"
}
```

**2. 컬럼 필터링:**
```json
{
  // 특정 컬럼 제외
  "column.exclude.list": "inventory.users.password,inventory.users.ssn",

  // 특정 컬럼만 포함
  "column.include.list": "inventory.products.id,inventory.products.name,inventory.products.price"
}
```

**3. 컬럼 마스킹:**
```json
{
  // 해시 마스킹
  "column.mask.hash.SHA-256.with.salt.my_salt": "inventory.users.email",

  // 고정값 마스킹
  "column.mask.with.0.chars": "inventory.users.phone"
}
```

**4. 이벤트 타입 필터링 (SMT):**
```json
{
  "transforms": "filter",
  "transforms.filter.type": "io.debezium.transforms.Filter",
  "transforms.filter.language": "jsr223.groovy",
  "transforms.filter.condition": "value.op == 'c' || value.op == 'u'"
}
```

**5. 조건부 필터링:**
```json
{
  // Groovy 스크립트로 조건 필터링
  "transforms": "filter",
  "transforms.filter.type": "io.debezium.transforms.Filter",
  "transforms.filter.language": "jsr223.groovy",
  "transforms.filter.condition": "value.after.status == 'active'"
}
```

**6. 토픽 라우팅:**
```json
{
  "transforms": "route",
  "transforms.route.type": "io.debezium.transforms.ByLogicalTableRouter",
  "transforms.route.topic.regex": "(.*)orders(.*)",
  "transforms.route.topic.replacement": "all-orders",
  "transforms.route.key.field.name": "shard_id"
}
```

**필터링 레벨 비교:**

| 레벨 | 적용 시점 | 장점 | 단점 |
|------|----------|------|------|
| **DB 레벨** | binlog 읽기 전 | 가장 효율적 | MySQL 서버 설정 필요 |
| **Connector 레벨** | 이벤트 생성 전 | 간편한 설정 | 일부 오버헤드 |
| **SMT 레벨** | Kafka 발행 전 | 유연한 조건 | 처리 오버헤드 |
| **Consumer 레벨** | 소비 후 | 가장 유연 | 불필요한 데이터 전송 |

**트레이드오프:**
```
┌─────────────────────────────────────────────────────────────┐
│  효율성                                           유연성    │
│    │                                                 │      │
│  DB 레벨 ── Connector 레벨 ── SMT 레벨 ── Consumer 레벨   │
│    │                                                 │      │
│  (설정 복잡)                                   (오버헤드)   │
└─────────────────────────────────────────────────────────────┘
```

**함정 질문 - "필터링하면 binlog 읽기도 줄어드나요?":**
**아닙니다:**
- Debezium은 모든 binlog 이벤트를 읽음
- 필터링은 Kafka 발행 전에 적용
- binlog 읽기 자체의 부하는 동일
- 예외: 데이터베이스 필터링은 일부 최적화 가능

**운영 권장사항:**
- [ ] 가능한 상위 레벨(테이블/DB)에서 필터링
- [ ] 민감 데이터는 마스킹 적용
- [ ] 필터 조건 테스트 철저히
- [ ] 필터링 성능 영향 모니터링

**참고자료**
- [Debezium Topic Routing](https://debezium.io/documentation/reference/stable/transformations/topic-routing.html)
- [Debezium Filtering](https://debezium.io/documentation/reference/stable/transformations/filtering.html)

</details>

---

## 📌 Kafka Connect와 Debezium

### CDC-021
Kafka Connect와 Debezium의 연계 동작 방식에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Kafka Connect와 Debezium 아키텍처:**

**1. Kafka Connect 개요:**
```
┌──────────────────────────────────────────────────────────────┐
│                    Kafka Connect Cluster                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Worker 1   │  │   Worker 2   │  │   Worker 3   │       │
│  │ ┌──────────┐ │  │ ┌──────────┐ │  │ ┌──────────┐ │       │
│  │ │Debezium  │ │  │ │ES Sink   │ │  │ │S3 Sink   │ │       │
│  │ │MySQL     │ │  │ │Connector │ │  │ │Connector │ │       │
│  │ └──────────┘ │  │ └──────────┘ │  │ └──────────┘ │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└──────────────────────────────────────────────────────────────┘
                           │
                    ┌──────┴──────┐
                    │    Kafka    │
                    │   Cluster   │
                    └─────────────┘
```

**2. 동작 방식:**

| 구성 요소 | 역할 |
|----------|------|
| **Worker** | 커넥터 실행 환경 (JVM 프로세스) |
| **Connector** | 작업 정의 및 Task 관리 |
| **Task** | 실제 데이터 복사 수행 |
| **Converter** | 데이터 직렬화/역직렬화 |
| **Transform** | 메시지 변환 (SMT) |

**3. 배포 모드:**

| 모드 | 특징 | 사용 시나리오 |
|------|------|--------------|
| **Standalone** | 단일 프로세스, 로컬 오프셋 | 개발/테스트 |
| **Distributed** | 클러스터, Kafka 오프셋 | 프로덕션 |

**4. REST API:**
```bash
# 커넥터 목록
GET /connectors

# 커넥터 생성
POST /connectors
{
  "name": "mysql-connector",
  "config": {
    "connector.class": "io.debezium.connector.mysql.MySqlConnector",
    ...
  }
}

# 커넥터 상태
GET /connectors/mysql-connector/status

# 커넥터 재시작
POST /connectors/mysql-connector/restart

# 커넥터 일시 중지
PUT /connectors/mysql-connector/pause

# 커넥터 삭제
DELETE /connectors/mysql-connector
```

**5. 내부 토픽:**

| 토픽 | 용도 |
|------|------|
| `connect-configs` | 커넥터 설정 저장 |
| `connect-offsets` | 오프셋 저장 |
| `connect-status` | 커넥터 상태 저장 |
| `schema-changes.*` | 스키마 히스토리 (Debezium) |

**6. 분산 모드 설정:**
```properties
# connect-distributed.properties
bootstrap.servers=kafka:9092
group.id=connect-cluster
key.converter=org.apache.kafka.connect.json.JsonConverter
value.converter=org.apache.kafka.connect.json.JsonConverter

config.storage.topic=connect-configs
config.storage.replication.factor=3

offset.storage.topic=connect-offsets
offset.storage.replication.factor=3

status.storage.topic=connect-status
status.storage.replication.factor=3
```

**트레이드오프 - 태스크 수:**
```json
{
  "tasks.max": 1  // Debezium은 일반적으로 1
}
```
- Debezium: 소스당 1 Task (binlog는 단일 스트림)
- Sink Connector: 병렬 처리 가능 (여러 Task)

**함정 질문 - "Debezium 없이 CDC가 가능한가요?":**
Kafka Connect 자체는 CDC 기능이 없습니다:
- JDBC Source Connector: 쿼리 기반 (진정한 CDC 아님)
- Debezium: 로그 기반 CDC
- 다른 CDC 커넥터: Oracle CDC, Attunity 등

**참고자료**
- [Kafka Connect Documentation](https://kafka.apache.org/documentation/#connect)
- [Debezium Deployment](https://debezium.io/documentation/reference/stable/operations/kubernetes.html)

</details>

---

## 📌 Debezium 모니터링

### CDC-022
Debezium 기반 데이터 파이프라인을 모니터링하고 관리하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Debezium 모니터링 전략:**

**1. JMX 메트릭:**

| 메트릭 | 의미 | 임계값 예시 |
|--------|------|------------|
| `MilliSecondsBehindSource` | 소스 대비 지연 시간 | > 60000ms 경고 |
| `NumberOfEventsFiltered` | 필터링된 이벤트 수 | 비정상 증가 모니터링 |
| `TotalNumberOfEventsSeen` | 처리된 총 이벤트 | 처리량 추적 |
| `NumberOfDisconnects` | 연결 끊김 횟수 | > 0 조사 필요 |
| `QueueTotalCapacity` | 큐 용량 | 사용률 모니터링 |
| `QueueRemainingCapacity` | 남은 큐 용량 | < 20% 경고 |

**2. Prometheus + Grafana 설정:**
```yaml
# Kafka Connect JMX Exporter 설정
lowercaseOutputLabelNames: true
lowercaseOutputName: true
rules:
  - pattern: "debezium.([^:]+)<type=connector-metrics, context=([^,]+), server=([^,]+)><>([^:]+)"
    name: "debezium_$1_$4"
    labels:
      context: "$2"
      server: "$3"
```

**3. 알림 규칙 예시:**
```yaml
# Prometheus AlertManager
groups:
  - name: debezium
    rules:
      - alert: DebeziumLag
        expr: debezium_mysql_MilliSecondsBehindSource > 60000
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Debezium lag is high"

      - alert: DebeziumDisconnected
        expr: debezium_mysql_Connected == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Debezium disconnected from MySQL"
```

**4. Kafka Connect REST API 모니터링:**
```bash
# 커넥터 상태 확인
curl http://connect:8083/connectors/mysql-connector/status

# 응답 예시
{
  "name": "mysql-connector",
  "connector": { "state": "RUNNING", "worker_id": "connect:8083" },
  "tasks": [
    { "id": 0, "state": "RUNNING", "worker_id": "connect:8083" }
  ]
}
```

**5. Consumer Lag 모니터링:**
```bash
# Kafka Consumer Lag
kafka-consumer-groups.sh --bootstrap-server kafka:9092 \
  --describe --group my-consumer-group

# 결과
TOPIC           PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
dbserver1.mydb  0          1000            1050            50
```

**6. 로그 모니터링:**
```
주요 로그 패턴:
- ERROR: 즉시 조사 필요
- "Snapshot completed": 스냅샷 완료 확인
- "Streaming changes": 스트리밍 모드 전환
- "Connection refused": 연결 문제
```

**7. 대시보드 구성:**
```
┌─────────────────────────────────────────────────────────────┐
│ Debezium Dashboard                                          │
├────────────────┬────────────────┬────────────────┬──────────┤
│ Connector      │ Lag (ms)       │ Events/sec     │ Status   │
│ mysql-conn     │ 150            │ 1,250          │ RUNNING  │
│ postgres-conn  │ 5,230          │ 890            │ RUNNING  │
├────────────────┴────────────────┴────────────────┴──────────┤
│ [Lag Graph over time]                                       │
├─────────────────────────────────────────────────────────────┤
│ [Throughput Graph]                                          │
└─────────────────────────────────────────────────────────────┘
```

**함정 질문 - "MilliSecondsBehindSource가 0이면 문제없나요?":**
반드시 그렇지 않습니다:
- 소스에 변경이 없으면 0일 수 있음
- Heartbeat 설정으로 유휴 상태에서도 업데이트 필요
- Consumer Lag도 함께 확인해야 함

**운영 체크리스트:**
- [ ] JMX Exporter 설정
- [ ] Grafana 대시보드 구성
- [ ] 알림 규칙 설정 (Lag, 연결 상태)
- [ ] 로그 수집 (ELK/Loki)
- [ ] Consumer Lag 모니터링

**참고자료**
- [Debezium Monitoring](https://debezium.io/documentation/reference/stable/operations/monitoring.html)

</details>

---

## 📌 Debezium 연동 도구

### CDC-023
Elasticsearch 동기화를 위해 Debezium과 함께 사용할 수 있는 오픈 소스 도구에는 어떤 것들이 있나요?

<details>
<summary>답변</summary>

**Debezium + Elasticsearch 연동 도구:**

**1. Kafka Connect Elasticsearch Sink (권장):**
```json
{
  "name": "es-sink-connector",
  "config": {
    "connector.class": "io.confluent.connect.elasticsearch.ElasticsearchSinkConnector",
    "topics": "dbserver1.inventory.products",
    "connection.url": "http://elasticsearch:9200",
    "type.name": "_doc",
    "key.ignore": "false",
    "transforms": "unwrap,extractKey",
    "transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState",
    "transforms.extractKey.type": "org.apache.kafka.connect.transforms.ExtractField$Key",
    "transforms.extractKey.field": "id"
  }
}
```

| 장점 | 단점 |
|------|------|
| Kafka Connect 생태계 통합 | 복잡한 변환 제한 |
| 자동 재시도, DLQ | 학습 곡선 |
| 관리 도구 통합 | Confluent 라이선스 고려 |

**2. Logstash:**
```ruby
input {
  kafka {
    bootstrap_servers => "kafka:9092"
    topics => ["dbserver1.inventory.products"]
    codec => json
    consumer_threads => 3
  }
}

filter {
  json {
    source => "message"
  }
  mutate {
    rename => { "[after][id]" => "id" }
    rename => { "[after][name]" => "name" }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "products"
    document_id => "%{id}"
  }
}
```

| 장점 | 단점 |
|------|------|
| 유연한 필터링 | 추가 인프라 |
| ELK 스택 통합 | 리소스 사용량 |
| 풍부한 플러그인 | 복잡한 파이프라인 관리 |

**3. Kafka Streams (커스텀):**
```java
StreamsBuilder builder = new StreamsBuilder();
builder.stream("dbserver1.inventory.products")
    .mapValues(value -> extractAfterState(value))
    .foreach((key, value) -> indexToElasticsearch(key, value));
```

| 장점 | 단점 |
|------|------|
| 완전한 제어 | 개발 필요 |
| 복잡한 변환 가능 | 운영 부담 |
| 상태 관리 가능 | 직접 구현 |

**4. Debezium Server (Kafka 없이):**
```json
{
  "debezium.source.connector.class": "io.debezium.connector.mysql.MySqlConnector",
  "debezium.source.database.hostname": "mysql",
  "debezium.sink.type": "http",
  "debezium.sink.http.url": "http://elasticsearch:9200/_bulk"
}
```

| 장점 | 단점 |
|------|------|
| Kafka 불필요 | 내구성 감소 |
| 단순한 아키텍처 | 확장성 제한 |
| 빠른 시작 | 복잡한 라우팅 어려움 |

**5. 도구 비교:**

| 도구 | 복잡도 | 유연성 | 운영 부담 | 추천 시나리오 |
|------|--------|--------|----------|--------------|
| **ES Sink Connector** | 낮음 | 중간 | 낮음 | 프로덕션 권장 |
| **Logstash** | 중간 | 높음 | 중간 | 기존 ELK 사용 시 |
| **Kafka Streams** | 높음 | 매우 높음 | 높음 | 복잡한 변환 필요 |
| **Debezium Server** | 낮음 | 낮음 | 낮음 | 소규모/테스트 |

**함정 질문 - "어떤 도구가 가장 좋은가요?":**
상황에 따라 다릅니다:
- **단순 동기화**: ES Sink Connector
- **복잡한 데이터 가공**: Kafka Streams
- **기존 ELK 환경**: Logstash
- **Kafka 없는 환경**: Debezium Server

**참고자료**
- [Confluent Elasticsearch Connector](https://docs.confluent.io/kafka-connectors/elasticsearch/current/overview.html)
- [Debezium Server](https://debezium.io/documentation/reference/stable/operations/debezium-server.html)

</details>

---

## 📌 Debezium Snapshot 문제

### CDC-024
Debezium의 snapshot 모드 사용 시 발생할 수 있는 문제와 그 해결 방안은 무엇인가요?

<details>
<summary>답변</summary>

**Debezium Snapshot 문제와 해결 방안:**

**1. 대용량 테이블 스냅샷 시간:**

| 문제 | 해결 방안 |
|------|----------|
| 스냅샷 완료까지 수 시간 소요 | Incremental Snapshot 사용 |
| Kafka Producer 타임아웃 | `producer.override.*` 조정 |
| 메모리 부족 | `snapshot.fetch.size` 조정 |

```json
{
  "snapshot.mode": "initial",
  "snapshot.fetch.size": 10240,
  "signal.data.collection": "mydb.debezium_signal",
  "incremental.snapshot.chunk.size": 1024
}
```

**2. 테이블 락 문제:**
```
문제: 스냅샷 중 쓰기 작업 차단

해결:
- snapshot.locking.mode = minimal (기본값)
- 또는 none (일관성 trade-off)
```

| 모드 | 락 범위 | 일관성 |
|------|--------|--------|
| **extended** | 전체 스냅샷 동안 | 완벽 |
| **minimal** | 스키마 읽기 시만 | 대부분 충분 |
| **none** | 락 없음 | 일관성 보장 안 됨 |

**3. Binlog 만료:**
```
문제: 스냅샷 중 binlog 만료 → 일부 변경 유실

해결:
- expire_logs_days 충분히 설정 (스냅샷 예상 시간 * 2)
- 또는 snapshot.mode = when_needed
```

**4. 스냅샷 중단 후 재시작:**
```
문제: 스냅샷 50% 진행 후 중단 → 처음부터 다시 시작

해결 (Debezium 1.6+):
- Incremental Snapshot으로 청크 단위 재개
- 각 청크 완료 시 오프셋 저장
```

**5. 스키마 변경 중 스냅샷:**
```
문제: 스냅샷 중 ALTER TABLE 실행 → 불일치 가능

해결:
- 스냅샷 완료 전 DDL 변경 자제
- 또는 schema_only_recovery 후 재시작
```

**6. OOM (Out of Memory):**
```json
{
  "snapshot.fetch.size": 2048,      // 기본 10240보다 줄임
  "snapshot.max.threads": 1,        // 병렬 처리 제한
  "max.queue.size": 4096            // 큐 크기 제한
}
```

**7. Consumer 처리 속도:**
```
문제: 스냅샷 데이터 대량 발행 → Consumer 뒤처짐

해결:
- Consumer 병렬 처리 증가
- 스냅샷 속도 제한 (snapshot.delay.ms)
- 배치 처리 최적화
```

**트레이드오프 - 스냅샷 전략:**

| 전략 | 장점 | 단점 |
|------|------|------|
| **전체 스냅샷** | 단순, 일관성 보장 | 시간 소요, 리소스 사용 |
| **스키마만** | 빠른 시작 | 기존 데이터 없음 |
| **증분 스냅샷** | 중단 재개 가능 | 설정 복잡 |

**Incremental Snapshot 시그널:**
```sql
-- 스냅샷 시작
INSERT INTO debezium_signal (id, type, data) VALUES
('ad-hoc-1', 'execute-snapshot',
 '{"data-collections": ["mydb.large_table"], "type": "incremental"}');

-- 스냅샷 중단
INSERT INTO debezium_signal (id, type, data) VALUES
('ad-hoc-2', 'stop-snapshot',
 '{"data-collections": ["mydb.large_table"], "type": "incremental"}');
```

**함정 질문 - "스냅샷 없이 시작할 수 있나요?":**
가능하지만 주의 필요:
- `snapshot.mode = never`: binlog 위치 직접 지정 필요
- `snapshot.mode = schema_only`: 스키마만 캡처, 기존 데이터 없음
- 기존 데이터가 필요하면 스냅샷 필수

**참고자료**
- [Debezium Incremental Snapshots](https://debezium.io/documentation/reference/stable/configuration/signalling.html)

</details>

---

## 📌 MySQL 스키마 변경 대응

### CDC-025
MySQL 데이터베이스 스키마 변경 시 Debezium은 어떻게 감지하고 대응하나요?

<details>
<summary>답변</summary>

**Debezium MySQL 스키마 변경 처리:**

**1. 스키마 변경 감지 원리:**
```
MySQL Binlog에서 DDL 이벤트 캡처:
  - CREATE TABLE
  - ALTER TABLE
  - DROP TABLE
  - RENAME TABLE

→ 스키마 히스토리 토픽에 저장
→ 인메모리 스키마 모델 업데이트
```

**2. 스키마 히스토리 토픽:**
```json
// 스키마 변경 이벤트
{
  "source": {
    "server": "dbserver1"
  },
  "position": {
    "file": "mysql-bin.000003",
    "pos": 12345,
    "gtid": "xxx:100"
  },
  "databaseName": "inventory",
  "ddl": "ALTER TABLE products ADD COLUMN weight DECIMAL(10,2) DEFAULT 0",
  "tableChanges": [
    {
      "type": "ALTER",
      "id": "inventory.products",
      "table": {
        "columns": [...]
      }
    }
  ]
}
```

**3. 변경 유형별 대응:**

| 변경 유형 | Debezium 동작 | 주의사항 |
|----------|--------------|---------|
| **컬럼 추가** | 자동 반영 | 새 컬럼 포함된 이벤트 발행 |
| **컬럼 삭제** | 자동 반영 | 이전 이벤트와 구조 다름 |
| **컬럼 타입 변경** | 자동 반영 | Consumer 영향 가능 |
| **테이블 삭제** | 이벤트 중단 | 관련 토픽 처리 필요 |
| **테이블 이름 변경** | 새 토픽 생성 | 라우팅 설정 필요 |

**4. 스키마 레지스트리와 호환성:**
```json
{
  "key.converter": "io.confluent.connect.avro.AvroConverter",
  "value.converter": "io.confluent.connect.avro.AvroConverter",
  "value.converter.schema.registry.url": "http://schema-registry:8081"
}
```

**호환성 규칙:**
| 호환성 모드 | 허용 변경 |
|------------|----------|
| BACKWARD | 컬럼 삭제, 기본값 있는 추가 |
| FORWARD | 컬럼 추가 |
| FULL | 기본값 있는 추가만 |
| NONE | 모든 변경 허용 (주의) |

**5. 문제 시나리오와 해결:**

**시나리오 1: 비호환 스키마 변경**
```
문제: ALTER TABLE products MODIFY price VARCHAR(50);  -- INT → VARCHAR
해결: Schema Registry 호환성 우회 또는 새 토픽 사용
```

**시나리오 2: 스키마 히스토리 손상**
```json
{
  "snapshot.mode": "schema_only_recovery"
}
// 현재 스키마로 히스토리 재구축
```

**시나리오 3: 과거 스키마 필요**
```
커넥터 재시작 시 과거 binlog 재생 필요
→ 스키마 히스토리에서 해당 시점 스키마 조회
→ 올바른 스키마로 이벤트 파싱
```

**6. DDL 이벤트 발행 (선택):**
```json
{
  "include.schema.changes": "true"
}
// 별도 토픽으로 DDL 이벤트 발행
// 토픽: dbserver1 (서버 이름)
```

**트레이드오프 - 스키마 관리 전략:**

| 전략 | 장점 | 단점 |
|------|------|------|
| **자동 진화** | 간편 | 비호환 변경 시 문제 |
| **버전 관리** | 명시적 제어 | 운영 복잡 |
| **토픽 분리** | 격리 | 마이그레이션 필요 |

**함정 질문 - "DDL 변경이 바로 반영되나요?":**
binlog에 기록된 후 반영됩니다:
- DDL 문 실행 → binlog 기록 → Debezium 캡처
- 약간의 지연 존재
- DDL 직후 DML은 올바른 스키마로 처리됨

**운영 권장사항:**
- [ ] DDL 변경 전 Consumer 영향 분석
- [ ] Schema Registry 호환성 모드 설정
- [ ] 스키마 히스토리 토픽 백업
- [ ] DDL 변경 알림 설정

**참고자료**
- [Debezium Schema History](https://debezium.io/documentation/reference/stable/connectors/mysql.html#mysql-schema-history-topic)

</details>

---

## 📌 CDC 장애 예방

### CDC-026
Debezium CDC 도입 프로젝트에서 발생할 수 있는 장애와 이를 예방하기 위한 모범 사례는 무엇인가요?

<details>
<summary>답변</summary>

**Debezium CDC 장애 유형과 예방:**

**1. 연결 관련 장애:**

| 장애 | 원인 | 예방 방법 |
|------|------|----------|
| MySQL 연결 끊김 | 네트워크, 서버 재시작 | 자동 재연결, 타임아웃 설정 |
| 인증 실패 | 비밀번호 변경, 권한 변경 | 모니터링, 알림 |
| Kafka 연결 실패 | 브로커 장애 | 클러스터 구성, 재시도 |

```json
{
  "database.connectionTimeZone": "UTC",
  "database.connection.timeout.ms": 30000,
  "connect.keep.alive": "true",
  "connect.keep.alive.interval.ms": 60000
}
```

**2. Binlog 관련 장애:**

| 장애 | 원인 | 예방 방법 |
|------|------|----------|
| Binlog 만료 | 보관 기간 초과 | 충분한 expire_logs_days |
| Binlog 누락 | GTID 미사용 | GTID 활성화 |
| 위치 추적 실패 | 오프셋 손상 | 정기 백업 |

```ini
# MySQL 설정
expire_logs_days = 7
gtid_mode = ON
enforce_gtid_consistency = ON
```

**3. 스냅샷 장애:**

| 장애 | 원인 | 예방 방법 |
|------|------|----------|
| OOM | 대용량 테이블 | fetch.size 조정 |
| 타임아웃 | 긴 스냅샷 시간 | Incremental Snapshot |
| 락 충돌 | 프로덕션 쓰기 차단 | minimal locking |

**4. 스키마 변경 장애:**

| 장애 | 원인 | 예방 방법 |
|------|------|----------|
| Consumer 오류 | 비호환 변경 | Schema Registry |
| 파싱 실패 | 스키마 히스토리 손상 | 백업, recovery 모드 |

**5. 장애 대응 체크리스트:**
```
□ 연결 상태 모니터링 (JMX: Connected)
□ 지연 모니터링 (MilliSecondsBehindSource)
□ 오프셋 정기 백업
□ 스키마 히스토리 백업
□ Consumer Lag 모니터링
□ Dead Letter Queue 설정
□ 알림 규칙 설정
```

**6. 고가용성 구성:**
```
┌────────────────────────────────────────────────────────────┐
│                   프로덕션 아키텍처                         │
│                                                            │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐     │
│  │  MySQL   │    │  Kafka       │    │  Kafka       │     │
│  │  Primary │    │  Connect     │    │  Cluster     │     │
│  │          │    │  (분산 모드)  │    │  (3+ 브로커) │     │
│  └──────────┘    └──────────────┘    └──────────────┘     │
│       │                │                    │              │
│  ┌──────────┐    ┌──────────────┐                         │
│  │  MySQL   │    │  Kafka       │    (자동 페일오버)       │
│  │  Replica │    │  Connect     │                         │
│  │  (대기)  │    │  Worker 2    │                         │
│  └──────────┘    └──────────────┘                         │
└────────────────────────────────────────────────────────────┘
```

**7. 모범 사례:**

```
설계 단계:
□ 충분한 binlog 보관 기간 설정
□ GTID 활성화
□ 분산 모드 Kafka Connect 사용
□ 멱등성 Consumer 설계

운영 단계:
□ 자동화된 모니터링/알림
□ 정기 백업 (오프셋, 스키마 히스토리)
□ 장애 복구 절차 문서화
□ 정기 DR 훈련
```

**함정 질문 - "Debezium만 모니터링하면 되나요?":**
아닙니다. 전체 파이프라인 모니터링 필요:
- MySQL (복제 지연, binlog)
- Debezium (연결, 지연)
- Kafka (브로커 상태, 토픽)
- Consumer (Lag, 처리율)
- Target (ES 등 - 인덱싱 상태)

**참고자료**
- [Debezium Operations Guide](https://debezium.io/documentation/reference/stable/operations/index.html)

</details>

---

## 📌 Debezium 최소 요구 사항

### CDC-027
Debezium 커넥터를 구성하기 위한 최소 요구 사항과 권장 설정은 무엇인가요?

<details>
<summary>답변</summary>

**Debezium MySQL 커넥터 요구 사항:**

**1. MySQL 서버 요구 사항:**

| 항목 | 최소 | 권장 |
|------|------|------|
| MySQL 버전 | 5.6+ | 8.0+ |
| Binlog 형식 | ROW | ROW |
| Binlog Row Image | FULL | FULL |
| GTID | 선택 | ON (권장) |

```ini
# my.cnf 필수 설정
[mysqld]
server-id = 1
log_bin = mysql-bin
binlog_format = ROW
binlog_row_image = FULL

# 권장 설정
gtid_mode = ON
enforce_gtid_consistency = ON
expire_logs_days = 3
```

**2. 사용자 권한:**
```sql
-- 최소 권한
CREATE USER 'debezium'@'%' IDENTIFIED BY 'password';
GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'debezium'@'%';

-- 스냅샷 락 사용 시 추가
GRANT LOCK TABLES ON mydb.* TO 'debezium'@'%';

-- 스키마 변경 DDL 캡처 시
GRANT SUPER ON *.* TO 'debezium'@'%';  -- MySQL 5.x
-- 또는
GRANT FLUSH_TABLES ON *.* TO 'debezium'@'%';  -- MySQL 8.0+
```

**3. Kafka Connect 요구 사항:**

| 항목 | 최소 | 권장 |
|------|------|------|
| Java | 11+ | 17+ |
| Kafka | 2.0+ | 3.0+ |
| 메모리 | 1GB | 4GB+ |
| CPU | 1 코어 | 2+ 코어 |

**4. 최소 커넥터 설정:**
```json
{
  "name": "mysql-connector",
  "config": {
    "connector.class": "io.debezium.connector.mysql.MySqlConnector",
    "tasks.max": "1",
    "database.hostname": "mysql-host",
    "database.port": "3306",
    "database.user": "debezium",
    "database.password": "password",
    "database.server.id": "1",
    "topic.prefix": "dbserver1",
    "database.include.list": "mydb",
    "schema.history.internal.kafka.bootstrap.servers": "kafka:9092",
    "schema.history.internal.kafka.topic": "schema-history.dbserver1"
  }
}
```

**5. 권장 추가 설정:**
```json
{
  // 스냅샷 설정
  "snapshot.mode": "initial",
  "snapshot.locking.mode": "minimal",

  // 성능 설정
  "max.batch.size": 2048,
  "max.queue.size": 8192,

  // 안정성 설정
  "heartbeat.interval.ms": 10000,
  "database.history.kafka.recovery.attempts": 4,

  // 모니터링
  "provide.transaction.metadata": "true",

  // 컨버터
  "key.converter": "org.apache.kafka.connect.json.JsonConverter",
  "value.converter": "org.apache.kafka.connect.json.JsonConverter"
}
```

**6. 네트워크 요구 사항:**

| 연결 | 포트 | 용도 |
|------|------|------|
| MySQL | 3306 | 데이터베이스 연결 |
| Kafka | 9092 | 메시지 발행 |
| Schema Registry | 8081 | 스키마 관리 (선택) |

**7. 토픽 설정:**
```bash
# 사전 생성 권장
kafka-topics.sh --create --topic dbserver1.mydb.users \
  --partitions 6 --replication-factor 3

kafka-topics.sh --create --topic schema-history.dbserver1 \
  --partitions 1 --replication-factor 3 \
  --config cleanup.policy=delete \
  --config retention.ms=-1
```

**트레이드오프 - 리소스 할당:**

| 워크로드 | 메모리 | 코어 | 비고 |
|----------|--------|------|------|
| 소규모 (< 100 TPS) | 2GB | 1 | 개발/테스트 |
| 중규모 (< 1000 TPS) | 4GB | 2 | 소규모 프로덕션 |
| 대규모 (> 1000 TPS) | 8GB+ | 4+ | 대규모 프로덕션 |

**함정 질문 - "ROW 형식 대신 MIXED 써도 되나요?":**
**안 됩니다.** Debezium은 ROW 형식만 지원:
- STATEMENT: SQL 문만 기록 → 실제 데이터 없음
- MIXED: 일부 STATEMENT → 일부 이벤트 캡처 불가
- ROW: 모든 변경 데이터 포함 → 필수

**참고자료**
- [Debezium MySQL Prerequisites](https://debezium.io/documentation/reference/stable/connectors/mysql.html#setting-up-mysql)

</details>

---

## 📌 Debezium 재처리

### CDC-028
Debezium의 메시지 처리 방식과 실패 시 offset 기반 재처리 메커니즘에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Debezium 재처리 메커니즘:**

**1. 오프셋 기반 재처리:**
```
정상 처리 흐름:
  Binlog 읽기 → 이벤트 생성 → Kafka 발행 → 오프셋 커밋

장애 발생 시:
  Binlog 읽기 → 이벤트 생성 → (장애) → 오프셋 커밋 X

재시작:
  마지막 커밋된 오프셋부터 재개 → 중복 발생 가능
```

**2. 재처리 시나리오:**

| 시나리오 | 재처리 범위 | 영향 |
|---------|------------|------|
| 커넥터 재시작 | 마지막 오프셋 이후 | 최소 중복 |
| Binlog 만료 | 전체 스냅샷 | 대량 재처리 |
| 스키마 히스토리 손상 | 스키마 복구 후 | 설정에 따라 다름 |

**3. 수동 오프셋 조정:**
```bash
# 현재 오프셋 확인
kafka-console-consumer.sh --bootstrap-server kafka:9092 \
  --topic connect-offsets --from-beginning \
  --property print.key=true

# 오프셋 수동 설정 (주의 필요!)
echo '["mysql-connector",{"server":"dbserver1"}]|{"file":"mysql-bin.000005","pos":1000}' | \
  kafka-console-producer.sh --bootstrap-server kafka:9092 \
  --topic connect-offsets \
  --property "parse.key=true" \
  --property "key.separator=|"
```

**4. Ad-hoc 스냅샷 (재처리):**
```sql
-- 특정 테이블 재스냅샷 (Debezium 1.6+)
INSERT INTO debezium_signal (id, type, data) VALUES
('resync-1', 'execute-snapshot',
 '{"data-collections": ["mydb.users"], "type": "incremental"}');
```

**5. 전체 재동기화:**
```bash
# 1. 커넥터 삭제
curl -X DELETE http://connect:8083/connectors/mysql-connector

# 2. 오프셋 삭제 (토픽에서 해당 커넥터 오프셋 tombstone 발행)
# 또는 새 connector name 사용

# 3. 커넥터 재생성 (initial 스냅샷)
curl -X POST http://connect:8083/connectors \
  -H "Content-Type: application/json" \
  -d @connector-config.json
```

**6. Consumer 측 재처리:**
```bash
# Consumer Group 오프셋 리셋
kafka-consumer-groups.sh --bootstrap-server kafka:9092 \
  --group my-consumer --reset-offsets \
  --topic dbserver1.mydb.users --to-earliest --execute
```

**7. 재처리 전략:**

| 전략 | 방법 | 사용 시나리오 |
|------|------|--------------|
| **부분 재처리** | 오프셋 조정 | 특정 시점 이후 |
| **테이블 재동기화** | Incremental Snapshot | 특정 테이블만 |
| **전체 재동기화** | 커넥터 재생성 | 심각한 불일치 |

**트레이드오프 - 재처리 방식:**

| 방식 | 장점 | 단점 |
|------|------|------|
| **오프셋 조정** | 빠름, 부분적 | 정확한 위치 찾기 어려움 |
| **Incremental Snapshot** | 유연, 안전 | 설정 필요 |
| **전체 재시작** | 확실함 | 시간 소요 |

**8. 재처리 시 주의사항:**
```
□ Consumer 멱등성 확인 (중복 처리 대비)
□ 대상 시스템 부하 고려
□ 처리 순서 의존성 확인
□ 재처리 범위 최소화
```

**함정 질문 - "오프셋만 조정하면 재처리 가능한가요?":**
스키마 히스토리도 고려해야 합니다:
- 과거 오프셋으로 돌아가면 해당 시점의 스키마 필요
- 스키마 히스토리에 해당 시점 정보가 있어야 함
- 없으면 스키마 불일치로 파싱 실패

**운영 권장사항:**
- [ ] 정기적 오프셋 백업
- [ ] 스키마 히스토리 백업
- [ ] Incremental Snapshot 설정
- [ ] 재처리 절차 문서화

**참고자료**
- [Debezium Incremental Snapshots](https://debezium.io/documentation/reference/stable/configuration/signalling.html)

</details>

---

## 📌 Elasticsearch 인덱싱 최적화

### CDC-029
Debezium을 통해 Elasticsearch에 데이터를 동기화할 때 인덱싱 성능을 최적화하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Debezium → Elasticsearch 인덱싱 최적화:**

**1. Kafka Connect ES Sink 설정:**
```json
{
  "name": "es-sink-connector",
  "config": {
    "connector.class": "io.confluent.connect.elasticsearch.ElasticsearchSinkConnector",
    "topics": "dbserver1.mydb.users",
    "connection.url": "http://elasticsearch:9200",

    // 배치 설정
    "batch.size": 2000,
    "linger.ms": 100,
    "max.buffered.records": 20000,
    "flush.timeout.ms": 180000,

    // 병렬 처리
    "max.in.flight.requests": 5,
    "tasks.max": 4,

    // 재시도 설정
    "max.retries": 5,
    "retry.backoff.ms": 100
  }
}
```

**2. Elasticsearch 인덱스 설정:**
```json
PUT /products
{
  "settings": {
    "index": {
      "refresh_interval": "5s",      // 기본 1s → 늘림
      "number_of_replicas": 0,       // 초기 로드 시 0
      "translog.durability": "async",
      "translog.sync_interval": "5s"
    }
  }
}
```

**3. 최적화 영역별 설정:**

| 영역 | 설정 | 효과 |
|------|------|------|
| **배치 크기** | batch.size 증가 | Bulk API 효율 |
| **지연 시간** | linger.ms 증가 | 배치 채움 |
| **Refresh** | refresh_interval 증가 | 세그먼트 생성 감소 |
| **Replica** | 초기 로드 시 0 | 복제 오버헤드 제거 |
| **Translog** | async 모드 | fsync 감소 |

**4. 인덱싱 성능 비교:**
```
설정 전: ~500 docs/sec
  ↓
배치 최적화: ~2,000 docs/sec
  ↓
Refresh 조정: ~5,000 docs/sec
  ↓
Replica 0: ~10,000 docs/sec
```

**5. 스냅샷 시 최적화:**
```bash
# 1. 스냅샷 전 인덱스 설정
PUT /products/_settings
{
  "index": {
    "refresh_interval": "-1",
    "number_of_replicas": 0
  }
}

# 2. 스냅샷 데이터 인덱싱
# (Debezium → Kafka → ES Sink)

# 3. 스냅샷 후 설정 복원
PUT /products/_settings
{
  "index": {
    "refresh_interval": "1s",
    "number_of_replicas": 1
  }
}

# 4. Force merge (선택)
POST /products/_forcemerge?max_num_segments=1
```

**6. 트레이드오프:**

| 최적화 | 이점 | 비용 |
|--------|------|------|
| **Refresh 증가** | 처리량 증가 | 검색 지연 |
| **Replica 0** | 쓰기 2배 빠름 | 내구성 감소 |
| **Translog async** | 쓰기 빠름 | 데이터 유실 위험 |
| **Batch 증가** | 효율성 | 메모리 사용 |

**7. 모니터링 메트릭:**
```
# Elasticsearch
indexing_rate: 인덱싱 속도
refresh_time: Refresh 시간
merge_time: Segment merge 시간
gc_time: GC 시간

# Kafka Consumer
consumer_lag: 처리 지연
records_consumed_rate: 소비 속도
```

**8. 문서 구조 최적화:**
```json
// Debezium → ES 변환 (SMT)
{
  "transforms": "unwrap,flatten",
  "transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState",
  "transforms.flatten.type": "org.apache.kafka.connect.transforms.Flatten$Value",
  "transforms.flatten.delimiter": "_"
}
```

**함정 질문 - "배치 크기를 무한정 늘리면 좋은가요?":**
아닙니다:
- 너무 큰 배치: 메모리 부족, 타임아웃
- ES Bulk API 권장: 5-15MB
- 문서 크기에 따라 batch.size 조정

**운영 권장사항:**
- [ ] 초기 로드 vs 스트리밍 설정 분리
- [ ] Refresh interval 워크로드에 맞게 조정
- [ ] 인덱싱 속도 모니터링
- [ ] Bulk 실패 시 DLQ 설정

**참고자료**
- [Elasticsearch Indexing Speed](https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-indexing-speed.html)
- [Confluent ES Connector Config](https://docs.confluent.io/kafka-connectors/elasticsearch/current/configuration_options.html)

</details>

---

## 📌 Debezium 프로젝트 경험

### CDC-030
Debezium을 활용한 MySQL-Elasticsearch 연동 프로젝트에서 겪은 경험과 주요 교훈에 대해 공유해주세요.

<details>
<summary>답변</summary>

**Debezium MySQL-ES 프로젝트 경험과 교훈:**

**1. 프로젝트 개요 (예시 시나리오):**
```
요구사항: 상품 데이터 실시간 검색
- MySQL: 원본 데이터 (products, categories, inventory)
- Elasticsearch: 검색 인덱스
- 목표: Near Real-time 동기화 (< 3초)
```

**2. 주요 문제와 해결:**

**문제 1: 초기 스냅샷 너무 오래 걸림**
```
상황: 1억 건 테이블 스냅샷 → 12시간 소요
원인: 전체 테이블 락, 단일 스레드

해결:
- Incremental Snapshot 도입 (Debezium 1.6+)
- snapshot.fetch.size 조정 (10240 → 5000)
- 비즈니스 시간 외 수행
```

**문제 2: Binlog 만료로 커넥터 실패**
```
상황: 주말 후 커넥터 재시작 → binlog 없음
원인: expire_logs_days = 1

해결:
- expire_logs_days = 7 (스냅샷 시간 * 2)
- snapshot.mode = when_needed
- 모니터링 알림 추가
```

**문제 3: 스키마 변경 후 Consumer 오류**
```
상황: ALTER TABLE ADD COLUMN → ES Sink 실패
원인: 새 필드가 매핑에 없음

해결:
- Schema Registry 도입
- ES 매핑 사전 정의 + dynamic: true (신규 필드)
- DDL 변경 프로세스 수립
```

**문제 4: 데이터 불일치**
```
상황: MySQL 100만 건, ES 99.8만 건
원인: 중복 처리 시 일부 누락, DELETE 처리 오류

해결:
- 정기 카운트 비교 스크립트
- Consumer 멱등성 강화
- DELETE 이벤트 처리 로직 수정
```

**3. 아키텍처 발전:**
```
v1 (초기):
  MySQL → Debezium → Kafka → ES Sink → ES
  문제: 단순하지만 변환 제한

v2 (개선):
  MySQL → Debezium → Kafka → Kafka Streams → Kafka → ES Sink → ES
  장점: 복잡한 변환 가능, 조인 처리

v3 (현재):
  MySQL → Debezium → Kafka → [SMT 변환] → ES Sink → ES
                         → [별도 Consumer] → 알림 서비스
  장점: SMT로 대부분 처리, 필요시 별도 Consumer
```

**4. 교훈 정리:**

| 영역 | 교훈 |
|------|------|
| **설계** | 처음부터 멱등성 고려, 스키마 관리 계획 |
| **운영** | 모니터링 필수, 백업 자동화 |
| **스냅샷** | 대용량 테이블은 Incremental 필수 |
| **스키마** | 변경 전 영향도 분석, Registry 사용 |
| **테스트** | 장애 시나리오 테스트 중요 |

**5. 성능 결과:**
```
Before (쿼리 기반 동기화):
- 동기화 지연: 5-15분
- DB 부하: 높음 (주기적 SELECT)
- 누락: DELETE 감지 불가

After (Debezium CDC):
- 동기화 지연: 1-3초
- DB 부하: 낮음 (binlog만 읽음)
- 누락: 없음 (DELETE 포함)
```

**6. 체크리스트 (프로젝트 시작 시):**
```
□ MySQL binlog 설정 확인 (ROW, FULL)
□ GTID 활성화 여부
□ 테이블 크기 및 스냅샷 전략
□ 스키마 변경 빈도 및 관리 방안
□ 목표 지연 시간 정의
□ 장애 복구 절차 수립
□ 모니터링/알림 설계
```

**함정 질문 - "CDC가 모든 동기화 문제를 해결하나요?":**
아닙니다. 여전히 고려할 점이 있습니다:
- 참조 무결성 (FK 관계)
- 집계/조인 데이터
- 최종 일관성 수용
- Consumer 장애 처리

**참고자료**
- [Debezium Best Practices](https://debezium.io/documentation/reference/stable/operations/index.html)
- [Debezium FAQ](https://debezium.io/documentation/faq/)

</details>
