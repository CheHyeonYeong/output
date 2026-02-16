# Database (데이터베이스)

> 카테고리: CS 기초 > 데이터베이스
> [← 면접 질문 목록으로 돌아가기](../../interview.md)

---

## 📌 키(Key) 개념

### DB-001

Key (기본키, 후보키, 슈퍼키 등등...) 에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**슈퍼키(Super Key)**: 튜플을 유일하게 식별할 수 있는 속성들의 집합입니다.

**후보키(Candidate Key)**: 슈퍼키 중 최소성을 만족하는 키입니다.

**기본키(Primary Key)**: 후보키 중 선택된 대표 키로, NULL을 허용하지 않습니다.

**대체키(Alternate Key)**: 기본키로 선택되지 않은 후보키입니다.

**외래키(Foreign Key)**: 다른 테이블의 기본키를 참조하는 속성입니다.

**참고자료**
- [MySQL PRIMARY KEY](https://dev.mysql.com/doc/refman/8.0/en/constraint-primary-key.html)[^1]

</details>

[^1]: MySQL 8.0 공식 문서

### DB-002
기본키(Primary Key)는 수정이 가능한가요?

<details>
<summary>답변</summary>

기술적으로 기본키 수정은 가능합니다. 그러나 권장되지 않습니다.

**문제점:**
- 외래키로 참조하는 모든 테이블의 데이터도 함께 수정 필요
- CASCADE 설정 시 연쇄 업데이트 발생으로 성능 저하
- 인덱스 재구성 비용 발생

**대안:** Surrogate Key(대리키)를 사용하여 자연키 변경에 영향받지 않게 설계합니다.

**참고자료**
- [MySQL Foreign Key Constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html)[^2]

</details>

[^2]: MySQL 8.0 외래키 제약조건 문서

### DB-003
MySQL(InnoDB)에서 기본키를 설정하지 않아도 테이블이 만들어집니다. 어떻게 이게 가능한 걸까요?

<details>
<summary>답변</summary>

InnoDB는 기본키가 없으면 내부적으로 **GEN_CLUST_INDEX**라는 숨겨진 클러스터드 인덱스를 생성합니다.

6바이트 크기의 Row ID를 자동 생성하여 각 행을 식별합니다. 하지만 이 값은 사용자가 접근할 수 없어 쿼리 최적화에 활용할 수 없습니다.

**권장사항:** 명시적으로 기본키를 설정하는 것이 성능과 관리 측면에서 좋습니다.

**참고자료**
- [InnoDB Clustered Index](https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html)[^3]

</details>

[^3]: MySQL InnoDB 인덱스 타입 문서

### DB-004
외래키(Foreign Key) 값은 NULL이 들어올 수 있나요?

<details>
<summary>답변</summary>

**네, 가능합니다.** 외래키 컬럼에 NOT NULL 제약이 없다면 NULL 값을 가질 수 있습니다.

이는 선택적 관계(Optional Relationship)를 표현할 때 유용합니다. 예를 들어, 직원 테이블에서 부서가 아직 배정되지 않은 경우 부서_id가 NULL일 수 있습니다.

**참고자료**
- [MySQL Foreign Keys](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html)[^4]

</details>

[^4]: MySQL 외래키 문서

### DB-005
어떤 칼럼에 UNIQUE 제약조건이 설정되어 있다고 가정해 봅시다. 이 칼럼을 활용한 쿼리의 성능은 그렇지 않은 것과 비교해서 어떻게 다를까요?

<details>
<summary>답변</summary>

UNIQUE 제약조건이 설정되면 해당 컬럼에 **자동으로 인덱스가 생성**됩니다.

**성능 향상:**
- WHERE 절에서 해당 컬럼 조회 시 인덱스 스캔 가능
- 정렬 연산 시 인덱스 활용 가능

**추가 비용:**
- INSERT/UPDATE 시 중복 체크를 위한 인덱스 검색 발생
- 인덱스 유지 비용 증가

**참고자료**
- [MySQL UNIQUE Constraints](https://dev.mysql.com/doc/refman/8.0/en/constraint-unique.html)[^5]

</details>

[^5]: MySQL UNIQUE 제약조건 문서

---

## 📌 RDB vs NoSQL

### DB-006

RDB와 NoSQL의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | RDB | NoSQL |
|------|-----|-------|
| 스키마 | 고정 스키마 | 유연한 스키마 |
| 확장 | 수직 확장(Scale-up) | 수평 확장(Scale-out) |
| 트랜잭션 | ACID 보장 | BASE 특성 (일부 ACID 지원) |
| 관계 | JOIN으로 테이블 연결 | 비정규화/임베딩 |
| 사용 사례 | 복잡한 쿼리, 정합성 중요 | 대용량, 유연한 데이터 |

**참고자료**
- [MongoDB vs RDBMS](https://www.mongodb.com/docs/manual/reference/sql-comparison/)[^6]

</details>

[^6]: MongoDB 공식 문서 - SQL 비교

### DB-007
NoSQL의 강점과 약점이 무엇인가요?

<details>
<summary>답변</summary>

**강점:**
- 수평 확장(Sharding)이 용이
- 유연한 스키마로 빠른 개발
- 대용량 데이터 처리에 적합
- 다양한 데이터 모델 지원 (Document, Key-Value, Graph 등)

**약점:**
- 복잡한 JOIN 연산 어려움
- ACID 트랜잭션 지원 제한적
- 데이터 일관성 보장이 어려울 수 있음
- 표준화된 쿼리 언어 부재

**참고자료**
- [MongoDB Data Modeling](https://www.mongodb.com/docs/manual/core/data-modeling-introduction/)[^7]

</details>

[^7]: MongoDB 데이터 모델링 문서

### DB-008
RDB의 어떠한 특징 때문에 NoSQL에 비해 부하가 많이 걸릴 "수" 있을까요? (주의: 무조건 NoSQL이 RDB보다 빠르다고 생각하면 큰일 납니다!)

<details>
<summary>답변</summary>

**JOIN 연산:** 여러 테이블을 조인하면 I/O와 CPU 비용 증가

**ACID 트랜잭션:** 락과 로그 기록으로 오버헤드 발생

**정규화된 스키마:** 데이터 분산으로 여러 테이블 접근 필요

**스키마 변경:** ALTER TABLE은 테이블 잠금과 재구성 필요

하지만 NoSQL도 복잡한 쿼리나 일관성이 필요한 경우 RDB보다 느릴 수 있습니다.

**참고자료**
- [MySQL JOIN Optimization](https://dev.mysql.com/doc/refman/8.0/en/join-optimization.html)[^8]

</details>

[^8]: MySQL JOIN 최적화 문서

### DB-009
NoSQL을 활용한 경험이 있나요? 있다면, 왜 RDB를 선택하지 않고 해당 DB를 선택했는지 설명해 주세요.

<details>
<summary>답변</summary>

**예시 답변 (Redis 사용 경험):**

세션 저장소와 캐시 레이어로 Redis를 사용했습니다.

**선택 이유:**
- 메모리 기반으로 빠른 읽기/쓰기 성능
- TTL 기능으로 세션 만료 자동 관리
- Key-Value 구조가 세션 데이터에 적합
- RDB의 불필요한 오버헤드 회피

**예시 답변 (MongoDB 사용 경험):**
- 스키마가 자주 변경되는 프로토타입 개발
- 비정형 로그 데이터 저장

**참고자료**
- [Redis Use Cases](https://redis.io/docs/get-started/)[^9]

</details>

[^9]: Redis 공식 문서

---

## 📌 트랜잭션과 ACID

### DB-010

트랜잭션이 무엇이고, ACID 원칙에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**트랜잭션:** 하나의 논리적 작업 단위를 구성하는 연산들의 집합입니다.

**ACID 원칙:**

- **Atomicity(원자성):** 트랜잭션의 모든 연산이 완전히 수행되거나, 전혀 수행되지 않아야 합니다.

- **Consistency(일관성):** 트랜잭션 전후로 데이터베이스가 일관된 상태를 유지해야 합니다.

- **Isolation(격리성):** 동시에 실행되는 트랜잭션들이 서로 영향을 주지 않아야 합니다.

- **Durability(지속성):** 완료된 트랜잭션의 결과는 영구적으로 보존되어야 합니다.

**참고자료**
- [MySQL ACID Model](https://dev.mysql.com/doc/refman/8.0/en/mysql-acid.html)[^10]

</details>

[^10]: MySQL ACID 모델 문서

### DB-011
ACID의 Atomicity(원자성)는 DBMS에서 어떻게 보장되나요? (e.g., Undo/Redo 로그)

<details>
<summary>답변</summary>

**Undo 로그**를 통해 원자성을 보장합니다.

트랜잭션 실행 중 변경 전 데이터를 Undo 로그에 기록합니다. 트랜잭션이 실패하거나 ROLLBACK되면 Undo 로그를 사용해 변경 사항을 되돌립니다.

**동작 과정:**
1. 변경 전 데이터를 Undo 로그에 기록
2. 실제 데이터 변경 수행
3. 실패 시 Undo 로그로 원복

**참고자료**
- [InnoDB Undo Logs](https://dev.mysql.com/doc/refman/8.0/en/innodb-undo-logs.html)[^11]

</details>

[^11]: MySQL InnoDB Undo 로그 문서

### DB-012
ACID의 Consistency(일관성)는 어떻게 보장되나요?

<details>
<summary>답변</summary>

일관성은 **제약조건**과 **트리거**를 통해 보장됩니다.

**DBMS 수준:**
- PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK 제약조건
- NOT NULL 제약조건
- 트리거를 통한 비즈니스 규칙 검증

**애플리케이션 수준:**
- 비즈니스 로직에서 데이터 유효성 검증
- 트랜잭션 내 모든 연산이 규칙 준수하도록 설계

일관성은 DBMS와 애플리케이션의 협력으로 보장됩니다.

**참고자료**
- [MySQL Data Integrity](https://dev.mysql.com/doc/refman/8.0/en/constraint-foreign-key.html)[^12]

</details>

[^12]: MySQL 데이터 무결성 문서

### DB-013
ACID의 Isolation(고립성)은 DBMS에서 어떻게 보장되나요? (e.g., Lock, MVCC)

<details>
<summary>답변</summary>

**Lock 기반:**
- 공유 락(S-Lock): 읽기 시 사용
- 배타 락(X-Lock): 쓰기 시 사용
- 락으로 동시 접근 제어

**MVCC (Multi-Version Concurrency Control):**
- 데이터의 여러 버전을 유지
- 읽기 작업은 락 없이 스냅샷 읽기
- 쓰기와 읽기 간 블로킹 최소화

InnoDB는 MVCC와 락을 함께 사용하여 격리성을 보장합니다.

**참고자료**
- [InnoDB Locking and MVCC](https://dev.mysql.com/doc/refman/8.0/en/innodb-multi-versioning.html)[^13]

</details>

[^13]: MySQL InnoDB MVCC 문서

### DB-014
ACID의 Durability(지속성)를 DBMS는 어떻게 보장하나요? (e.g., WAL, Redo 로그)

<details>
<summary>답변</summary>

**WAL (Write-Ahead Logging)** 방식으로 지속성을 보장합니다.

데이터 변경 전 Redo 로그에 먼저 기록합니다. 커밋 시 로그를 디스크에 동기화(fsync)합니다.

**장애 복구:**
1. 시스템 장애 발생
2. 재시작 시 Redo 로그 확인
3. 커밋된 트랜잭션은 Redo 로그로 재적용
4. 데이터 일관성 복구

**참고자료**
- [InnoDB Redo Log](https://dev.mysql.com/doc/refman/8.0/en/innodb-redo-log.html)[^14]

</details>

[^14]: MySQL InnoDB Redo 로그 문서

### DB-015
트랜잭션을 사용해 본 경험이 있나요? 어떤 경우에 사용할 수 있나요?

<details>
<summary>답변</summary>

**사용 사례:**

- **계좌 이체:** A 계좌 출금과 B 계좌 입금이 모두 성공하거나 모두 실패해야 함

- **주문 처리:** 주문 생성, 재고 감소, 결제 처리가 하나의 단위로 처리

- **회원 가입:** 사용자 정보 저장, 프로필 생성, 이메일 인증 토큰 생성

```sql
START TRANSACTION;
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;
COMMIT;
```

**참고자료**
- [MySQL Transaction Statements](https://dev.mysql.com/doc/refman/8.0/en/commit.html)[^15]

</details>

[^15]: MySQL 트랜잭션 문서

### DB-016
읽기(SELECT) 작업에는 트랜잭션을 걸지 않아도 될까요?

<details>
<summary>답변</summary>

**상황에 따라 다릅니다.**

**트랜잭션이 필요한 경우:**
- 일관된 스냅샷 읽기가 필요할 때
- 여러 SELECT 간 데이터 일관성이 필요할 때
- SELECT 후 UPDATE하는 경우 (SELECT FOR UPDATE)

**트랜잭션 없이 가능한 경우:**
- 단일 SELECT 문
- 실시간 최신 데이터가 필요한 경우
- 일관성보다 성능이 중요한 경우

MySQL InnoDB는 기본적으로 각 SELECT를 자체 트랜잭션으로 실행합니다(autocommit).

**참고자료**
- [MySQL Consistent Read](https://dev.mysql.com/doc/refman/8.0/en/innodb-consistent-read.html)[^16]

</details>

[^16]: MySQL 일관된 읽기 문서

### DB-017
트랜잭션 격리 레벨(Isolation Level)에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 격리 수준 | Dirty Read | Non-Repeatable Read | Phantom Read |
|-----------|------------|---------------------|--------------|
| READ UNCOMMITTED | O | O | O |
| READ COMMITTED | X | O | O |
| REPEATABLE READ | X | X | O (InnoDB는 조건부 방지) |
| SERIALIZABLE | X | X | X |

- **Dirty Read:** 커밋되지 않은 데이터 읽기
- **Non-Repeatable Read:** 같은 쿼리가 다른 결과 반환
- **Phantom Read:** 조건에 맞는 행이 추가/삭제됨

MySQL InnoDB 기본값은 REPEATABLE READ입니다.

**InnoDB REPEATABLE READ의 Phantom Read 방지 메커니즘:**
- **Consistent Read (일반 SELECT):** 트랜잭션 시작 시점의 스냅샷을 읽어 같은 결과 보장
- **Locking Read (SELECT FOR UPDATE/SHARE, UPDATE, DELETE):** Gap Lock과 Next-Key Lock으로 범위 내 삽입 차단
- **주의:** Consistent Read와 Locking Read를 혼용하면 예상치 못한 결과 발생 가능. 완전한 직렬화가 필요하면 SERIALIZABLE 사용 권장

**참고자료**
- [MySQL Transaction Isolation Levels](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-isolation-levels.html)[^17]

</details>

[^17]: MySQL 격리 수준 문서

### DB-018
모든 DBMS가 4개의 격리 레벨(READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE)을 모두 구현하고 있나요? 그렇지 않다면 그 이유는 무엇일까요?

<details>
<summary>답변</summary>

**아니요, DBMS마다 다릅니다.**

- **PostgreSQL:** READ UNCOMMITTED 요청 시 READ COMMITTED로 동작 (MVCC 아키텍처상 Dirty Read 불가능하므로 별도 구현 불필요)
- **Oracle:** READ COMMITTED와 SERIALIZABLE만 지원 (READ UNCOMMITTED, REPEATABLE READ 미지원)
- **SQL Server:** 4개 모두 지원 + SNAPSHOT Isolation 추가
- **MySQL InnoDB:** 4개 모두 지원

**이유:**
- DBMS별 MVCC 구현 방식 차이로 특정 격리 수준 구현이 불필요하거나 불가능
- PostgreSQL의 경우 MVCC로 인해 항상 커밋된 데이터만 읽으므로 READ UNCOMMITTED의 Dirty Read가 구조적으로 발생하지 않음
- 성능과 구현 복잡도 트레이드오프 고려

**참고자료**
- [PostgreSQL Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)[^18]

</details>

[^18]: PostgreSQL 트랜잭션 격리 문서

### DB-019
MySQL InnoDB 스토리지 엔진에서 Undo 영역과 Redo 영역에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Undo 영역:**
- 변경 전 데이터를 저장
- ROLLBACK 시 원래 데이터로 복구
- MVCC에서 과거 버전 데이터 제공
- 시스템 테이블스페이스 또는 별도 Undo 테이블스페이스에 저장

**Redo 영역:**
- 변경 후 데이터를 순차적으로 기록
- WAL 방식으로 커밋 전 디스크에 기록
- 장애 복구 시 커밋된 트랜잭션 재적용
- ib_logfile 파일에 저장

**참고자료**
- [InnoDB Undo Logs](https://dev.mysql.com/doc/refman/8.0/en/innodb-undo-logs.html)[^19]

</details>

[^19]: MySQL InnoDB Undo/Redo 문서

### DB-020
MVCC(Multi-Version Concurrency Control)가 무엇이며, InnoDB 스토리지 엔진은 Undo 로그를 사용해 이를 어떻게 구현하나요?

<details>
<summary>답변</summary>

**MVCC:** 동시성 제어 기법으로, 데이터의 여러 버전을 유지하여 읽기와 쓰기가 서로 블로킹하지 않게 합니다.

**InnoDB 구현:**

InnoDB는 각 행에 3개의 숨겨진 필드를 추가합니다:
- **DB_TRX_ID (6바이트):** 마지막으로 행을 수정한 트랜잭션 ID
- **DB_ROLL_PTR (7바이트):** Undo 로그의 이전 버전을 가리키는 롤백 포인터
- **DB_ROW_ID (6바이트):** 자동 증가 Row ID (명시적 PK가 없을 때 사용)

**동작 과정:**
1. UPDATE 시 새 버전 생성, 이전 버전은 Undo 로그에 보관
2. DB_ROLL_PTR이 이전 버전들을 연결 리스트로 연결
3. SELECT 시 트랜잭션의 스냅샷 시점 기준으로 적절한 버전 선택
4. 트랜잭션 완료 후 불필요한 Undo 로그는 Purge 스레드가 정리

**주의:** 장시간 트랜잭션은 Undo 로그 정리를 방해하여 롤백 세그먼트 비대화 유발

**참고자료**
- [InnoDB Multi-Versioning](https://dev.mysql.com/doc/refman/8.0/en/innodb-multi-versioning.html)[^20]

</details>

[^20]: MySQL InnoDB MVCC 문서

### DB-021
MySQL에서 스토리지 엔진이 정확히 무엇을 하는 건가요?

<details>
<summary>답변</summary>

**스토리지 엔진:** 데이터의 저장, 검색, 업데이트를 담당하는 DBMS의 컴포넌트입니다.

**주요 역할:**
- 데이터를 디스크에 저장하고 읽기
- 인덱스 관리
- 트랜잭션 처리 (ACID 보장)
- 락 관리
- 버퍼 관리

**MySQL 스토리지 엔진:**
- **InnoDB:** 트랜잭션, 외래키 지원 (기본값)
- **MyISAM:** 빠른 읽기, 트랜잭션 미지원
- **Memory:** 메모리 기반, 임시 데이터용

**참고자료**
- [MySQL Storage Engines](https://dev.mysql.com/doc/refman/8.0/en/storage-engines.html)[^21]

</details>

[^21]: MySQL 스토리지 엔진 문서

---

## 📌 인덱스 (Index)

### DB-022

인덱스가 무엇이고, 언제 사용하는지 설명해 주세요.

<details>
<summary>답변</summary>

**인덱스:** 테이블의 검색 속도를 향상시키기 위한 자료구조입니다. 책의 색인처럼 원하는 데이터의 위치를 빠르게 찾을 수 있게 합니다.

**장점 (읽기 성능):**
- WHERE 조건 검색 속도 향상 (O(N) -> O(log N))
- JOIN 성능 향상
- ORDER BY/GROUP BY 정렬 비용 제거
- 커버링 인덱스로 테이블 접근 없이 쿼리 완료 가능

**단점 (쓰기 비용):**
- INSERT: 데이터 + 인덱스 추가, B-Tree 분할 가능
- UPDATE: 인덱스 키 변경 시 삭제 + 추가 발생
- DELETE: 인덱스 엔트리 삭제 (실제로는 delete-mark)
- 추가 저장 공간 필요

**인덱스 사용이 효과적인 경우:**
- 카디널리티(고유값 수)가 높은 컬럼
- 선택도(Selectivity)가 낮은 조건 (소수의 행만 반환)
- 읽기가 쓰기보다 빈번한 테이블

**인덱스가 비효율적인 경우:**
- 데이터가 매우 적은 테이블 (Full Scan이 더 빠름)
- INSERT/UPDATE/DELETE가 매우 빈번한 테이블
- 카디널리티가 낮은 컬럼 (성별 등)

**참고자료**
- [MySQL Index Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization-indexes.html)[^22]

</details>

[^22]: MySQL 인덱스 최적화 문서

### DB-023
일반적으로 인덱스는 수정(INSERT, UPDATE, DELETE)이 잦은 테이블에선 사용하지 않기를 권합니다. 왜 그럴까요?

<details>
<summary>답변</summary>

**인덱스 유지 비용이 발생하기 때문입니다.**

- **INSERT:** 새 데이터에 대한 인덱스 엔트리 추가, B-Tree 재조정 가능
- **UPDATE:** 인덱스 키 값 변경 시 기존 엔트리 삭제 + 새 엔트리 추가
- **DELETE:** 인덱스 엔트리 삭제, B-Tree 재조정 가능

인덱스가 많을수록 쓰기 작업의 오버헤드가 증가합니다. 읽기 성능 향상과 쓰기 성능 저하 간 트레이드오프를 고려해야 합니다.

**참고자료**
- [MySQL Index Maintenance](https://dev.mysql.com/doc/refman/8.0/en/innodb-online-ddl-operations.html)[^23]

</details>

[^23]: MySQL 인덱스 관리 문서

### DB-024
인덱스가 없는 컬럼을 수정할 때도 INSERT/UPDATE/DELETE 시 인덱스 유지 비용이 발생하나요?

<details>
<summary>답변</summary>

**부분적으로 맞습니다. 해당 컬럼에 대한 인덱스 유지 비용은 없지만, 다른 비용이 발생할 수 있습니다.**

**인덱스가 없는 컬럼 수정 시:**
- 해당 컬럼에 대한 B-Tree 재조정 불필요
- 해당 컬럼에 대한 인덱스 I/O 없음

**그러나 발생할 수 있는 비용:**
- **INSERT:** 다른 인덱스들(PK, FK 등)의 유지 비용은 여전히 발생
- **UPDATE:** 행 자체를 찾기 위해 다른 인덱스나 Full Scan 필요
- **Clustered Index(InnoDB PK):** 데이터가 PK 순서로 저장되므로 행 위치 변경 시 이동 비용 발생 가능

**핵심 포인트:**
- "인덱스가 없는 컬럼"의 수정은 그 컬럼에 대한 인덱스 비용만 없음
- 테이블의 다른 인덱스 유지 비용은 INSERT/DELETE 시 여전히 발생
- 인덱스 설계 시 읽기/쓰기 패턴을 분석하여 적절한 균형 필요

**참고자료**
- [MySQL Query Optimization](https://dev.mysql.com/doc/refman/8.0/en/query-optimization.html)[^24]

</details>

[^24]: MySQL 쿼리 최적화 문서

### DB-025
ORDER BY / GROUP BY 연산의 동작 과정을 인덱스의 존재 여부와 연관지어서 설명해 주세요.

<details>
<summary>답변</summary>

**인덱스가 있는 경우:**
- 이미 정렬된 인덱스를 순회하여 결과 반환
- 추가 정렬 작업 불필요 (Filesort 회피)
- 메모리와 CPU 사용 최소화

**인덱스가 없는 경우:**
- 전체 데이터를 읽어 메모리에서 정렬 (Filesort)
- 데이터가 크면 디스크 임시 파일 사용
- 성능 저하 발생

EXPLAIN으로 "Using filesort"가 표시되면 인덱스를 활용하지 못한 것입니다.

**참고자료**
- [MySQL ORDER BY Optimization](https://dev.mysql.com/doc/refman/8.0/en/order-by-optimization.html)[^25]

</details>

[^25]: MySQL ORDER BY 최적화 문서

### DB-026
기본키는 인덱스라고 할 수 있을까요? 그렇지 않다면, 인덱스와 기본키는 어떤 차이가 있나요?

<details>
<summary>답변</summary>

**기본키는 자동으로 인덱스가 생성됩니다.**

**차이점:**

| 구분 | 기본키 | 인덱스 |
|------|--------|--------|
| 목적 | 행 식별 | 검색 속도 향상 |
| NULL | 불가 | 가능 (UNIQUE 제외) |
| 개수 | 테이블당 1개 | 여러 개 가능 |
| 종류 | Clustered Index | Non-Clustered 가능 |

InnoDB에서 기본키는 Clustered Index로, 데이터가 기본키 순서로 물리적으로 저장됩니다.

**참고자료**
- [InnoDB Clustered Index](https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html)[^26]

</details>

[^26]: MySQL InnoDB 인덱스 타입 문서

### DB-027
외래키에도 인덱스가 자동으로 생성되나요?

<details>
<summary>답변</summary>

**네, InnoDB는 외래키 컬럼에 인덱스가 없으면 자동으로 생성합니다.**

MySQL 공식 문서에 따르면: "MySQL requires indexes on foreign keys and referenced keys so that foreign key checks can be fast and not require a table scan."

**자동 생성 조건:**
- 외래키 컬럼이 인덱스의 **첫 번째 컬럼**으로 포함되어야 함
- 이미 적합한 인덱스가 있으면 새로 생성하지 않음
- 나중에 더 적합한 인덱스가 생성되면 자동 생성된 인덱스는 삭제될 수 있음

**인덱스가 필요한 이유:**
- 참조 무결성 검사 시 부모 테이블 조회 필요
- ON DELETE/UPDATE CASCADE 처리 시 빠른 검색
- 인덱스 없이는 Full Table Scan 발생

**참고자료**
- [MySQL Foreign Key Constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html)[^27]

</details>

[^27]: MySQL 외래키 제약조건 문서

### DB-028
인덱스가 데이터의 물리적 저장에도 영향을 미치나요? (e.g., Clustered Index vs Non-Clustered Index)

<details>
<summary>답변</summary>

**Clustered Index는 물리적 저장에 영향을 미칩니다.**

**Clustered Index:**
- 테이블 데이터가 인덱스 키 순서로 물리적으로 저장
- 테이블당 1개만 존재
- InnoDB에서 기본키가 Clustered Index

**Non-Clustered Index (Secondary Index):**
- 별도 공간에 인덱스 저장
- 실제 데이터 위치를 가리키는 포인터 보유
- 여러 개 생성 가능

InnoDB의 Secondary Index는 기본키 값을 저장하여 Clustered Index를 다시 탐색합니다.

**참고자료**
- [InnoDB Index Types](https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html)[^28]

</details>

[^28]: MySQL InnoDB 인덱스 타입 문서

### DB-029
NoSQL(ex. Redis, MongoDB 등)도 인덱스를 갖고 있나요? 만약 있다면, RDB의 인덱스와는 어떤 차이가 있을까요?

<details>
<summary>답변</summary>

**네, NoSQL도 인덱스를 지원합니다.**

**MongoDB:**
- B-Tree 인덱스 사용 (RDB와 유사)
- 복합 인덱스, 해시 인덱스, 지리공간 인덱스 지원
- 문서의 중첩 필드에도 인덱스 가능

**Redis:**
- Key 자체가 해시 기반 인덱스
- Sorted Set으로 범위 쿼리용 인덱스 구현
- Secondary Index는 직접 구현 필요

**차이점:**
- NoSQL은 스키마리스로 인덱스 설계가 유연
- 분산 환경에서 인덱스 관리 방식 다름

**참고자료**
- [MongoDB Indexes](https://www.mongodb.com/docs/manual/indexes/)[^29]

</details>

[^29]: MongoDB 인덱스 문서

### DB-030
(A, B) 컬럼 순서로 복합 인덱스를 설정한 테이블에서, WHERE A=... 조건 없이 WHERE B=... 조건만 사용하여 쿼리를 요청했습니다. 해당 쿼리는 인덱스를 탈까요?

<details>
<summary>답변</summary>

**일반적으로 효율적인 인덱스 사용이 불가능합니다.**

복합 인덱스는 첫 번째 컬럼부터 순차적으로 정렬됩니다. (A, B) 인덱스는 A로 먼저 정렬되고, 같은 A 값 내에서 B로 정렬됩니다.

WHERE B=... 만 사용하면:
- B 값이 여러 A 값에 분산되어 있음
- 인덱스 Range Scan 불가능
- 옵티마이저 선택:
  - **Index Full Scan:** 인덱스 전체를 순회 (테이블보다 작으면 유리)
  - **Full Table Scan:** 인덱스 무시

**함정 주의:**
"인덱스를 탄다/안 탄다"는 이분법적 표현보다 "어떻게 사용되는지"가 중요합니다.
- Index Full Scan도 기술적으로는 "인덱스를 사용"하지만 Range Scan만큼 효율적이지 않음

**해결책:**
1. B 컬럼만을 위한 별도 인덱스 생성
2. 쿼리 패턴에 맞게 (B, A) 순서의 복합 인덱스 추가

**참고자료**
- [MySQL Multiple-Column Indexes](https://dev.mysql.com/doc/refman/8.0/en/multiple-column-indexes.html)[^30]

</details>

[^30]: MySQL 복합 컬럼 인덱스 문서

### DB-031
복합 컬럼 인덱스(Composite Index)의 작동 방식은 무엇이며, 어떤 컬럼을 인덱스의 앞 순서로 두는 것이 성능에 유리할까요?

<details>
<summary>답변</summary>

**작동 방식:**
B-Tree에서 첫 번째 컬럼으로 정렬 후, 같은 값 내에서 두 번째 컬럼으로 정렬됩니다. (A, B, C) 인덱스는 A → B → C 순으로 다단계 정렬됩니다.

**앞 순서에 두면 유리한 컬럼:**

1. **동등 조건(=)으로 자주 검색되는 컬럼**
2. **카디널리티가 높은 컬럼** (고유값이 많은 컬럼)
3. **범위 조건은 뒤에 배치** (범위 이후 컬럼은 인덱스 활용 불가)

**예시:** `WHERE status = 'active' AND created_at > '2024-01-01'`
→ (status, created_at) 순서가 효율적

**참고자료**
- [MySQL Composite Index](https://dev.mysql.com/doc/refman/8.0/en/multiple-column-indexes.html)[^31]

</details>

[^31]: MySQL 복합 인덱스 문서

---

## 📌 B-Tree / B+Tree 및 특수 인덱스

### DB-032

B-Tree와 B+Tree에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**B-Tree:**
- 균형 잡힌 트리 구조로 모든 리프 노드가 같은 깊이
- 각 노드에 키와 데이터를 함께 저장
- 검색, 삽입, 삭제 모두 O(log N)

**B+Tree:**
- B-Tree의 변형으로 데이터는 리프 노드에만 저장
- 내부 노드는 키만 저장 → 더 많은 키 저장 가능
- 리프 노드가 연결 리스트로 연결 → 범위 검색 효율적
- 대부분의 RDBMS가 B+Tree 사용

**참고자료**
- [InnoDB Index Structures](https://dev.mysql.com/doc/refman/8.0/en/innodb-physical-structure.html)[^32]

</details>

[^32]: MySQL InnoDB 물리적 구조 문서

### DB-033
데이터베이스 인덱스에서 B+Tree가 B-Tree에 비해 반드시 좋다고 할 수 있나요? 그렇지 않다면 어떤 단점이 있나요?

<details>
<summary>답변</summary>

**B+Tree의 단점:**

1. **단일 키 검색 시 추가 I/O:** 데이터가 리프에만 있어 항상 리프까지 탐색 필요 (B-Tree는 중간에서 찾을 수 있음)

2. **저장 공간:** 키가 내부 노드와 리프에 중복 저장될 수 있음

3. **삽입/삭제 복잡도:** 리프 노드 연결 리스트 유지 비용

**B-Tree가 유리한 경우:**
- 특정 키를 정확히 찾는 단일 검색이 대부분인 경우
- 메모리 기반 인덱스 (디스크 I/O 고려 불필요)

**참고자료**
- [Database Index Structures](https://use-the-index-luke.com/sql/anatomy/the-tree)[^33]

</details>

[^33]: Use The Index, Luke - 인덱스 구조 설명

### DB-034
DB 인덱스에서 Red-Black Tree를 사용하지 않고, B-Tree/B+Tree를 사용하는 이유가 있을까요?

<details>
<summary>답변</summary>

**디스크 I/O 최적화 때문입니다.**

**Red-Black Tree:**
- 이진 트리로 노드당 자식 2개
- 트리 높이가 높음 → 디스크 접근 횟수 증가
- 메모리 기반 자료구조에 적합

**B-Tree/B+Tree:**
- 다진 트리로 노드당 자식 수백~수천 개
- 트리 높이가 낮음 (보통 3~4)
- 한 번의 디스크 읽기로 많은 키 비교 가능
- 디스크 블록 크기에 최적화

100만 건 데이터: Red-Black Tree는 20번, B+Tree는 3~4번 디스크 접근

**참고자료**
- [Why B-Tree for Databases](https://dev.mysql.com/doc/refman/8.0/en/innodb-physical-structure.html)[^34]

</details>

[^34]: MySQL InnoDB 물리 구조 문서

### DB-035
오름차순으로 정렬된 B-Tree/B+Tree 인덱스가 있을 때, ORDER BY ... DESC(내림차순) 정렬을 시도할 경우 성능이 어떻게 될까요?

<details>
<summary>답변</summary>

**역방향 스캔(Backward Index Scan)으로 처리되어 filesort 없이 가능합니다.**

InnoDB의 B+Tree 리프 노드는 양방향 연결 리스트로 구성되어 있어:
- 오름차순: 왼쪽 → 오른쪽 순회
- 내림차순: 오른쪽 → 왼쪽 순회 (Backward Index Scan)

**EXPLAIN에서 확인:** Extra 컬럼에 `Backward index scan` 표시

**성능 고려사항:**
- 역방향 스캔은 정방향보다 약간 느릴 수 있음 (CPU 캐시 프리페칭 효율 저하)
- 대부분의 경우 성능 차이는 미미함

**복합 인덱스 주의사항:**
- `(A ASC, B ASC)` 인덱스에서 `ORDER BY A DESC, B DESC`는 역방향 스캔으로 가능
- `ORDER BY A DESC, B ASC`는 방향이 혼합되어 인덱스 활용 불가
- **MySQL 8.0 해결책:** Descending Index 지원으로 `(A DESC, B ASC)` 형태로 인덱스 정의 가능

**참고자료**
- [MySQL Descending Indexes](https://dev.mysql.com/doc/refman/8.0/en/descending-indexes.html)[^35]

</details>

[^35]: MySQL Descending Index 문서

### DB-036
위도, 경도와 같은 2D/3D 공간 좌표(Spatial Data)는 B-Tree로 인덱싱하기 어렵습니다. 이런 데이터는 어떤 자료구조(e.g., R-Tree, Geohash)를 사용하며 어떻게 동작하나요?

<details>
<summary>답변</summary>

**R-Tree:**
- 다차원 공간 데이터를 위한 트리 구조
- 최소 경계 사각형(MBR)으로 공간 객체 그룹화
- "반경 N km 내 검색" 같은 쿼리에 효율적
- MySQL SPATIAL INDEX가 R-Tree 사용

**Geohash:**
- 2D 좌표를 1D 문자열로 인코딩
- 가까운 위치는 유사한 prefix를 가짐
- B-Tree 인덱스로 범위 검색 가능
- Redis, MongoDB 등에서 활용

**참고자료**
- [MySQL Spatial Indexes](https://dev.mysql.com/doc/refman/8.0/en/creating-spatial-indexes.html)[^36]

</details>

[^36]: MySQL 공간 인덱스 문서

---

## 📌 JOIN

### DB-037

DB Join이 무엇인지 설명하고, 각각의 종류(INNER, LEFT/RIGHT OUTER, FULL OUTER 등)에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**JOIN:** 두 개 이상의 테이블을 연결하여 데이터를 조회하는 연산입니다.

**종류:**

- **INNER JOIN:** 양쪽 테이블에서 조건이 일치하는 행만 반환

- **LEFT OUTER JOIN:** 왼쪽 테이블의 모든 행 + 오른쪽 매칭 행 (없으면 NULL)

- **RIGHT OUTER JOIN:** 오른쪽 테이블의 모든 행 + 왼쪽 매칭 행 (없으면 NULL)

- **FULL OUTER JOIN:** 양쪽 테이블의 모든 행 반환 (MySQL은 UNION으로 구현)

- **CROSS JOIN:** 카테시안 곱, 모든 조합 반환

**참고자료**
- [MySQL JOIN Syntax](https://dev.mysql.com/doc/refman/8.0/en/join.html)[^37]

</details>

[^37]: MySQL JOIN 구문 문서

### DB-038
조인(JOIN) 시 드라이빙 테이블(Driving Table)과 드리븐 테이블(Driven Table)은 무엇이며, 옵티마이저는 이 순서를 어떻게 결정하나요?

<details>
<summary>답변</summary>

**드라이빙 테이블:** JOIN에서 먼저 접근하는 테이블 (외부 루프)
**드리븐 테이블:** 드라이빙 테이블의 각 행에 대해 조회되는 테이블 (내부 루프)

**옵티마이저 결정 기준:**
- 테이블 크기 (작은 테이블을 드라이빙으로)
- 인덱스 유무 (드리븐 테이블에 인덱스가 있으면 유리)
- WHERE 조건으로 필터링 가능한 행 수
- 통계 정보 기반 비용 계산

**힌트로 제어:**
```sql
SELECT /*+ JOIN_ORDER(t1, t2) */ ...
```

**참고자료**
- [MySQL Join Optimization](https://dev.mysql.com/doc/refman/8.0/en/nested-loop-joins.html)[^38]

</details>

[^38]: MySQL Nested Loop Join 문서

### DB-039
JOIN은 시간이 오래 걸릴 수 있어 내부적으로 다양한 물리적 조인(Physical Join) 방식을 사용합니다. Nested Loop Join, Sort Merge Join, Hash Join에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Nested Loop Join:**
- 외부 테이블의 각 행에 대해 내부 테이블 전체 스캔
- 인덱스가 있으면 효율적
- 소규모 테이블이나 인덱스 있을 때 적합

**Sort Merge Join:**
- 양쪽 테이블을 조인 키로 정렬
- 정렬된 데이터를 순차적으로 병합
- 이미 정렬된 대용량 데이터에 효율적

**Hash Join:**
- 작은 테이블로 해시 테이블 생성 (Build Phase)
- 큰 테이블을 스캔하며 해시 테이블 조회 (Probe Phase)
- 인덱스 없는 대용량 동등 조인에 효율적
- **MySQL 8.0.18**부터 지원, **8.0.20**부터 Block Nested Loop 대체
- 메모리 초과 시 디스크로 스필(spill)

**MySQL 8.0.20 이후:**
- Equi-join뿐 아니라 non-equi-join, outer join, semijoin, antijoin에도 Hash Join 적용
- EXPLAIN에서 `Using join buffer (hash join)` 확인

**참고자료**
- [MySQL Hash Join](https://dev.mysql.com/doc/refman/8.0/en/hash-joins.html)[^39]

</details>

[^39]: MySQL Hash Join 문서

### DB-040
JOIN의 성능도 인덱스의 유무에 영향을 받나요? 특히 Nested Loop Join과 연관지어 설명해 주세요.

<details>
<summary>답변</summary>

**네, 인덱스는 JOIN 성능에 큰 영향을 미칩니다.**

**Nested Loop Join에서:**

인덱스 없는 경우:
- 드라이빙 테이블 N행 × 드리븐 테이블 M행 = N×M 비교
- 시간 복잡도: O(N×M)

인덱스 있는 경우:
- 드라이빙 테이블 N행 × 인덱스 탐색 O(log M)
- 시간 복잡도: O(N × log M)

**권장사항:**
- 드리븐 테이블의 조인 컬럼에 인덱스 생성
- 외래키 컬럼에 인덱스 필수

**참고자료**
- [MySQL Index for JOIN](https://dev.mysql.com/doc/refman/8.0/en/table-scan-avoidance.html)[^40]

</details>

[^40]: MySQL 테이블 스캔 회피 문서

### DB-041
3중 조인부터는 동작 방식이 약간 바뀝니다. 어떻게 동작하는지, 그리고 그 방식이 성능에 어떠한 영향을 주는지 설명해 주세요.

<details>
<summary>답변</summary>

**3중 이상 조인의 동작:**

1. 첫 번째 테이블(A)과 두 번째 테이블(B) 조인
2. 결과와 세 번째 테이블(C) 조인
3. 각 단계에서 중간 결과셋 생성

**성능 영향:**

- **조인 순서가 중요:** 조인 순서에 따라 중간 결과 크기가 달라짐
- **옵티마이저의 역할:** N개 테이블 조인 시 N! 가지 순서를 비용 기반으로 선택
- **중간 결과 최소화:** 필터링이 잘 되는 테이블을 먼저 조인

**최적화:**
- 조인 순서 힌트 사용
- 각 조인 컬럼에 인덱스 확보
- 서브쿼리보다 JOIN 선호

**참고자료**
- [MySQL Optimizing Multi-Join](https://dev.mysql.com/doc/refman/8.0/en/multiple-table-optimization.html)[^41]

</details>

[^41]: MySQL 다중 테이블 최적화 문서

---

## 📌 Lock 및 동시성 제어

### DB-042

트랜잭션 상황에서의 Deadlock (교착 상태) 상황과, 이를 해결하기 위한 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Deadlock:** 두 개 이상의 트랜잭션이 서로가 가진 락을 기다리며 무한 대기하는 상태

**예시:**
- T1: A 락 획득 → B 락 대기
- T2: B 락 획득 → A 락 대기

**해결 방법:**

1. **예방:** 락 획득 순서를 일관되게 정의
2. **탐지:** DBMS가 주기적으로 대기 그래프 검사
3. **해제:** Deadlock 발견 시 한 트랜잭션을 ROLLBACK
4. **타임아웃:** 일정 시간 대기 후 포기

InnoDB는 자동으로 Deadlock을 탐지하고 비용이 적은 트랜잭션을 롤백합니다.

**참고자료**
- [InnoDB Deadlocks](https://dev.mysql.com/doc/refman/8.0/en/innodb-deadlocks.html)[^42]

</details>

[^42]: MySQL InnoDB Deadlock 문서

### DB-043
DB Locking에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Locking:** 동시성 제어를 위해 데이터에 대한 접근을 제한하는 메커니즘

**락 단위:**
- **테이블 락:** 테이블 전체 잠금 (MyISAM)
- **행 락:** 특정 행만 잠금 (InnoDB)
- **페이지 락:** 디스크 페이지 단위 잠금

**락 유형:**
- **공유 락(S):** 읽기 허용, 쓰기 차단
- **배타 락(X):** 읽기/쓰기 모두 차단

**InnoDB 특수 락:**
- **Record Lock:** 특정 인덱스 레코드만 잠금
- **Gap Lock:** 인덱스 레코드 사이의 "간격"만 잠금 (삽입 방지용, 순수하게 억제적)
- **Next-Key Lock:** Record Lock + Gap Lock 조합 (레코드 + 그 앞의 간격)

**Next-Key Lock 동작 예시:**
인덱스에 10, 11, 13, 20 값이 있을 때 Next-Key Lock 범위:
`(-inf, 10], (10, 11], (11, 13], (13, 20], (20, +inf)`

REPEATABLE READ에서 기본적으로 Next-Key Lock을 사용하여 Phantom Read 방지

**참고자료**
- [InnoDB Locking](https://dev.mysql.com/doc/refman/8.0/en/innodb-locking.html)[^43]

</details>

[^43]: MySQL InnoDB Locking 문서

### DB-044
공유 락(Shared Lock, S-Lock)과 배타 락(Exclusive Lock, X-Lock)의 차이점은 무엇이며, 언제 각각 사용되나요?

<details>
<summary>답변</summary>

**공유 락(S-Lock):**
- 다른 트랜잭션의 읽기 허용
- 다른 트랜잭션의 쓰기 차단
- `SELECT ... FOR SHARE` 또는 `LOCK IN SHARE MODE`
- 데이터를 읽으면서 변경 방지할 때 사용

**배타 락(X-Lock):**
- 다른 트랜잭션의 읽기/쓰기 모두 차단
- `SELECT ... FOR UPDATE`, INSERT, UPDATE, DELETE
- 데이터 변경 시 사용

| 요청/보유 | S-Lock | X-Lock |
|-----------|--------|--------|
| S-Lock | 호환 | 충돌 |
| X-Lock | 충돌 | 충돌 |

**참고자료**
- [InnoDB Lock Modes](https://dev.mysql.com/doc/refman/8.0/en/innodb-lock-modes.html)[^44]

</details>

[^44]: MySQL InnoDB 락 모드 문서

### DB-045
Optimistic Lock(낙관적 락)과 Pessimistic Lock(비관적 락)에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**비관적 락(Pessimistic Lock):**
- 충돌이 발생할 것이라 **가정**
- 데이터 접근 시 즉시 락 획득
- `SELECT FOR UPDATE` 사용
- 충돌이 잦은 환경에 적합

**낙관적 락(Optimistic Lock):**
- 충돌이 드물다고 **가정**
- 락 없이 작업 후 커밋 시 충돌 검사
- version 컬럼이나 timestamp로 구현
- 충돌 시 재시도 필요

**트레이드오프:**

| 관점 | 비관적 락 | 낙관적 락 |
|------|-----------|-----------|
| 동시성 | 낮음 (블로킹) | 높음 (논블로킹) |
| 충돌 처리 | 미리 방지 | 사후 감지 |
| 적합 상황 | 충돌 빈번 | 충돌 드묾 |
| 데드락 | 가능성 있음 | 없음 |
| 구현 | DB 수준 | 애플리케이션 수준 |

```sql
-- 낙관적 락 예시
UPDATE items
SET quantity = 10, version = version + 1
WHERE id = 1 AND version = 5;
-- 영향받은 행이 0이면 충돌 발생 -> 재시도 필요
```

**참고자료**
- [JPA Optimistic Locking](https://docs.oracle.com/javaee/7/tutorial/persistence-locking.htm)[^45]

</details>

[^45]: Oracle JPA 락킹 문서

### DB-046
물리적인 Lock을 건 상태에서, 요청에 문제가 생겨 비정상 종료되면 Lock이 영원히 해제되지 않는 문제가 생길 수 있습니다. DB는 이를 위한 해결책이 있나요?

<details>
<summary>답변</summary>

**DBMS의 해결책:**

1. **커넥션 타임아웃:** 비정상 연결 감지 시 자동 롤백 및 락 해제

2. **락 타임아웃:** `innodb_lock_wait_timeout` 설정으로 대기 시간 제한

3. **트랜잭션 롤백:** 비정상 종료 시 자동 롤백으로 락 해제

4. **Deadlock Detection:** 교착 상태 감지 시 자동 해제

**애플리케이션 레벨:**
- 트랜잭션 타임아웃 설정
- try-finally로 명시적 롤백/커밋 보장
- Connection Pool의 유효성 검사

**참고자료**
- [MySQL Lock Wait Timeout](https://dev.mysql.com/doc/refman/8.0/en/innodb-parameters.html#sysvar_innodb_lock_wait_timeout)[^46]

</details>

[^46]: MySQL InnoDB 파라미터 문서

---

## 📌 쿼리 실행 및 최적화

### DB-047

DB 옵티마이저의 RBO(Rule-Based Optimizer)와 CBO(Cost-Based Optimizer) 의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**RBO (Rule-Based Optimizer):**
- 미리 정의된 규칙에 따라 실행 계획 결정
- 인덱스가 있으면 무조건 사용
- 통계 정보 미사용
- 예측 가능하지만 유연성 부족
- 현재 대부분 사용하지 않음

**CBO (Cost-Based Optimizer):**
- 통계 정보 기반 비용 계산
- 여러 실행 계획 중 최소 비용 선택
- 테이블 크기, 인덱스 선택도 등 고려
- MySQL, PostgreSQL, Oracle 모두 CBO 사용

**CBO의 판단 요소:**
- 디스크 I/O 비용
- CPU 비용
- 네트워크 비용

**참고자료**
- [MySQL Query Optimizer](https://dev.mysql.com/doc/refman/8.0/en/query-optimization.html)[^47]

</details>

[^47]: MySQL 쿼리 옵티마이저 문서

### DB-048
쿼리가 어떤 조인 방식이나 인덱스를 사용하는지(실행 계획) 어떻게 알 수 있나요? (e.g., EXPLAIN)

<details>
<summary>답변</summary>

**EXPLAIN 명령어를 사용합니다.**

```sql
EXPLAIN SELECT * FROM users WHERE email = 'test@test.com';
```

**주요 출력 항목:**
- **type:** 접근 방식 (ALL, index, range, ref, const)
- **possible_keys:** 사용 가능한 인덱스
- **key:** 실제 사용된 인덱스
- **rows:** 예상 검색 행 수
- **Extra:** 추가 정보 (Using index, Using filesort 등)

**EXPLAIN FORMAT=JSON:** 더 상세한 정보 제공

**참고자료**
- [MySQL EXPLAIN Output](https://dev.mysql.com/doc/refman/8.0/en/explain-output.html)[^48]

</details>

[^48]: MySQL EXPLAIN 출력 형식 문서

### DB-049
쿼리 실행 계획을 볼 때 EXPLAIN과 ANALYZE(혹은 EXPLAIN ANALYZE)의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**EXPLAIN:**
- 실제 쿼리를 실행하지 않음
- 옵티마이저의 예상 실행 계획 표시
- 예상 행 수, 예상 비용 제공
- 빠르게 확인 가능

**EXPLAIN ANALYZE:**
- 실제 쿼리를 실행
- 실제 실행 시간, 실제 행 수 표시
- 예상과 실제의 차이 확인 가능
- 성능 병목 정확히 파악

```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE status = 'active';
```

MySQL 8.0.18부터 지원, PostgreSQL은 오래전부터 지원

**참고자료**
- [MySQL EXPLAIN ANALYZE](https://dev.mysql.com/doc/refman/8.0/en/explain.html#explain-analyze)[^49]

</details>

[^49]: MySQL EXPLAIN ANALYZE 문서

### DB-050
Table Full Scan과 Index Range Scan에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Table Full Scan:**
- 테이블의 모든 행을 순차적으로 읽음
- 인덱스를 사용하지 않음
- EXPLAIN에서 type: ALL
- 대용량 테이블에서 성능 저하

**Index Range Scan:**
- 인덱스의 특정 범위만 스캔
- WHERE 절의 범위 조건 (<, >, BETWEEN, LIKE 'abc%')
- EXPLAIN에서 type: range
- 필요한 데이터만 읽어 효율적

**그 외 스캔 방식:**
- **Index Full Scan:** 인덱스 전체 스캔
- **Index Unique Scan:** 유일한 값 검색 (type: const, eq_ref)

**참고자료**
- [MySQL EXPLAIN Type](https://dev.mysql.com/doc/refman/8.0/en/explain-output.html#explain-join-types)[^50]

</details>

[^50]: MySQL EXPLAIN 조인 타입 문서

### DB-051
인덱스가 존재하는 컬럼을 조건으로 사용했음에도 옵티마이저가 Table Full Scan을 선택하는 경우가 있습니다. 왜 그럴까요?

<details>
<summary>답변</summary>

**옵티마이저가 Full Scan이 더 효율적이라고 판단하기 때문입니다.**

**주요 원인:**

1. **선택도가 낮은 경우:** 전체 데이터의 많은 비율(보통 20% 이상)을 읽어야 할 때

2. **테이블이 작은 경우:** 인덱스 탐색 비용이 Full Scan보다 클 때

3. **통계 정보 부정확:** ANALYZE TABLE로 갱신 필요

4. **인덱스 컬럼에 함수 적용:** `WHERE YEAR(created_at) = 2024`

5. **타입 불일치:** 암시적 형변환 발생

**확인 방법:** EXPLAIN으로 type과 rows 확인

**참고자료**
- [MySQL Index Hints](https://dev.mysql.com/doc/refman/8.0/en/index-hints.html)[^51]

</details>

[^51]: MySQL 인덱스 힌트 문서

### DB-052
COUNT(개수를 세는 쿼리)는 어떻게 동작하나요? COUNT(1), COUNT(*), COUNT(column)의 동작 과정에는 차이가 있나요?

<details>
<summary>답변</summary>

**COUNT(\*):**
- 모든 행의 개수를 셈 (NULL 포함)
- 옵티마이저가 가장 작은 인덱스 선택하여 효율화
- InnoDB는 실제 행을 카운트 (MyISAM과 다름)

**COUNT(1):**
- COUNT(*)와 **완전히 동일하게** 동작
- MySQL 공식 문서: "InnoDB handles SELECT COUNT(\*) and SELECT COUNT(1) operations in the same way. There is no performance difference."

**COUNT(column):**
- 해당 컬럼이 NULL이 아닌 행만 카운트
- NULL 체크 로직이 추가되어 COUNT(\*)보다 느릴 수 있음
- 해당 컬럼에 인덱스가 있으면 활용

**성능 비교:** COUNT(\*) = COUNT(1) >= COUNT(column)

```sql
SELECT COUNT(*) FROM users;  -- 전체 행 수
SELECT COUNT(email) FROM users;  -- email이 NOT NULL인 행 수
```

**MyISAM vs InnoDB:**
- MyISAM: 테이블의 행 수를 메타데이터로 저장하여 WHERE 없는 COUNT(\*)가 O(1)
- InnoDB: MVCC로 인해 트랜잭션별로 보이는 행이 다르므로 실제 스캔 필요

**참고자료**
- [MySQL COUNT Function](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_count)[^52]

</details>

[^52]: MySQL COUNT 함수 문서

---

## 📌 클러스터링 및 분산 DB

### DB-053

RDBMS, NoSQL에서의 클러스터링/레플리케이션 방식에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**RDBMS:**

- **Master-Slave 레플리케이션:** Master에서 쓰기, Slave에서 읽기
- **Master-Master:** 양쪽에서 쓰기 가능 (충돌 관리 필요)
- **MySQL Group Replication:** 동기식 복제

**NoSQL:**

- **MongoDB Replica Set:** Primary-Secondary 구조, 자동 failover
- **Redis Cluster:** 데이터 샤딩 + 레플리케이션
- **Cassandra:** 링 구조, 모든 노드가 동등

**차이점:**
- RDBMS: 일관성 중시, 동기/비동기 복제
- NoSQL: 가용성 중시, 최종적 일관성 허용

**참고자료**
- [MySQL Replication](https://dev.mysql.com/doc/refman/8.0/en/replication.html)[^53]

</details>

[^53]: MySQL 레플리케이션 문서

### DB-054
분산 환경에서 트랜잭션을 어떻게 관리할 수 있을까요? (e.g., 2PC, Saga)

<details>
<summary>답변</summary>

**2PC (Two-Phase Commit):**
- **Prepare 단계:** 코디네이터가 모든 참여자에게 커밋 준비 요청
- **Commit 단계:** 모든 참여자가 준비되면 커밋, 하나라도 실패하면 롤백
- 강한 일관성 보장

**2PC 단점:**
- **블로킹 문제:** Prepare 후 코디네이터 장애 시 참여자들이 무한 대기
- 성능 저하 (동기식 처리)
- 단일 장애점(코디네이터)

**Saga Pattern:**
- 로컬 트랜잭션들의 연속
- 실패 시 보상 트랜잭션(Compensating Transaction) 실행
- **Choreography:** 이벤트 기반, 각 서비스가 독립적으로 반응
- **Orchestration:** 중앙 조정자(Orchestrator)가 흐름 제어

**Saga 단점:**
- 보상 트랜잭션 설계 복잡
- 최종적 일관성(Eventual Consistency)만 보장
- 롤백이 비즈니스 로직 수준 (완벽한 원복 어려울 수 있음)

**선택 기준:**

| 요구사항 | 권장 방식 |
|----------|-----------|
| 강한 일관성 필수 | 2PC |
| 높은 가용성/성능 | Saga |
| 마이크로서비스 | Saga (선호) |
| 단일 DB 연결 | 로컬 트랜잭션 |

**참고자료**
- [MySQL XA Transactions](https://dev.mysql.com/doc/refman/8.0/en/xa.html)[^54]

</details>

[^54]: MySQL XA 트랜잭션 문서

### DB-055
레플리케이션 환경에서 슬레이브 데이터 동기화 전까지의 데이터 정합성을 지키는 방법은 무엇이 있을까요?

<details>
<summary>답변</summary>

**방법:**

1. **동기식 복제(Semi-Sync Replication):**
   - 최소 하나의 Slave가 로그 수신 확인 후 커밋
   - 약간의 지연 발생하지만 데이터 손실 방지

2. **Read-After-Write 라우팅:**
   - 쓰기 직후 읽기는 Master로 라우팅
   - 일정 시간 후 Slave로 라우팅

3. **GTID 기반 읽기:**
   - Global Transaction ID로 복제 위치 추적
   - 특정 트랜잭션이 복제될 때까지 대기

4. **ProxySQL 등 프록시 활용:**
   - 복제 지연 모니터링
   - 지연이 큰 Slave 제외

**참고자료**
- [MySQL Semi-Sync Replication](https://dev.mysql.com/doc/refman/8.0/en/replication-semisync.html)[^55]

</details>

[^55]: MySQL Semi-Sync 복제 문서

### DB-056
DB를 분산해서 관리해야 한다면, 레플리케이션 방식과 샤딩 방식 중 어떤 것을 선택하겠습니까? 각 방식의 특징과 적합한 상황을 설명해 주세요.

<details>
<summary>답변</summary>

**상황에 따라 선택합니다.**

**레플리케이션 선택:**
- 읽기 트래픽이 많고 쓰기가 적을 때
- 고가용성이 중요할 때
- 데이터 크기가 단일 서버에 적합할 때
- 구현/운영이 간단함

**샤딩 선택:**
- 데이터 크기가 단일 서버 용량 초과
- 쓰기 트래픽이 많을 때
- 수평 확장이 필요할 때
- 복잡하지만 확장성 높음

**실무에서:**
먼저 레플리케이션으로 시작하고, 한계에 도달하면 샤딩 도입. 레플리케이션 + 샤딩 조합도 가능합니다.

**참고자료**
- [MySQL Partitioning](https://dev.mysql.com/doc/refman/8.0/en/partitioning.html)[^56]

</details>

[^56]: MySQL 파티셔닝 문서

---

## 📌 정규화 (Normalization)

### DB-057

정규화가 무엇인가요?

<details>
<summary>답변</summary>

**정규화:** 데이터 중복을 최소화하고 데이터 무결성을 보장하기 위해 테이블을 분리하는 과정입니다.

**목적:**
- 데이터 중복 제거
- 이상현상(Anomaly) 방지
- 데이터 무결성 유지
- 저장 공간 효율화

**정규화 단계:**
- 1NF → 2NF → 3NF → BCNF → 4NF → 5NF

실무에서는 보통 3NF 또는 BCNF까지 적용합니다.

**참고자료**
- [Database Normalization](https://en.wikipedia.org/wiki/Database_normalization)[^57]

</details>

[^57]: Wikipedia 데이터베이스 정규화

### DB-058
정규화를 하지 않을 경우 발생할 수 있는 이상현상(Anomaly)에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**삽입 이상(Insertion Anomaly):**
- 불필요한 데이터 없이는 원하는 데이터를 삽입할 수 없음
- 예: 수강 테이블에 학생 정보를 넣으려면 과목도 필요

**갱신 이상(Update Anomaly):**
- 중복 데이터 중 일부만 수정되어 불일치 발생
- 예: 학과명 변경 시 여러 행을 모두 수정해야 함

**삭제 이상(Deletion Anomaly):**
- 원하는 데이터 삭제 시 다른 필요한 데이터도 삭제됨
- 예: 마지막 수강 기록 삭제 시 학생 정보도 삭제

**참고자료**
- [Database Anomalies](https://en.wikipedia.org/wiki/Database_normalization#Normal_forms)[^58]

</details>

[^58]: Wikipedia 데이터베이스 이상현상

### DB-059
각 정규화(1NF, 2NF, 3NF, BCNF)에 대해, 정규화 전/후의 테이블 변화에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**1NF (제1정규형):**
- 조건: 모든 속성이 원자값
- 변화: 다중 값을 가진 컬럼을 별도 행으로 분리
- 예: 전화번호1, 전화번호2 → 전화번호 테이블 분리

**2NF (제2정규형):**
- 조건: 1NF + 부분 함수 종속 제거
- 변화: 복합키의 일부에만 종속된 컬럼 분리
- 예: (학번, 과목코드) → 과목명은 과목 테이블로

**3NF (제3정규형):**
- 조건: 2NF + 이행적 함수 종속 제거
- 변화: A→B→C 관계에서 B→C를 별도 테이블로
- 예: 학번→학과코드→학과명 → 학과 테이블 분리

**BCNF:**
- 조건: 모든 결정자가 후보키
- 변화: 후보키가 아닌 결정자를 분리

**참고자료**
- [Normal Forms](https://en.wikipedia.org/wiki/Database_normalization)[^59]

</details>

[^59]: Wikipedia 정규형 설명

### DB-060
데이터베이스 정규화가 무조건 좋은가요? 그렇지 않다면, 어떤 상황에서 역정규화(비정규화)를 하는 게 좋은지 설명해 주세요.

<details>
<summary>답변</summary>

**정규화 vs 비정규화 트레이드오프:**

| 관점 | 정규화 | 비정규화 |
|------|--------|----------|
| 데이터 중복 | 최소화 | 의도적 허용 |
| 쓰기 성능 | 좋음 (한 곳만 수정) | 나쁨 (여러 곳 수정) |
| 읽기 성능 | JOIN 필요 | JOIN 감소 |
| 일관성 | 보장 | 애플리케이션에서 관리 필요 |
| 저장 공간 | 효율적 | 비효율적 |

**정규화의 단점:**
- JOIN 증가로 조회 성능 저하
- 쿼리 복잡도 증가
- 자주 함께 조회되는 데이터가 분산

**역정규화(Denormalization)가 필요한 경우:**

1. **읽기 성능이 중요한 경우:** 리포트, 대시보드, 분석 쿼리
2. **빈번한 JOIN 제거:** 조회가 많고 변경이 적은 데이터
3. **계산 값 저장:** 집계 결과를 미리 저장 (댓글 수, 좋아요 수)
4. **히스토리 데이터:** 변경 시점의 스냅샷 저장 (주문 시점 상품 정보)
5. **분산 시스템:** JOIN이 어려운 NoSQL이나 마이크로서비스 환경

**예시:**
- 주문 테이블에 상품명 중복 저장 (상품명 변경과 무관하게 주문 시점 정보 유지)
- 게시글에 댓글 수 저장 (매번 COUNT 쿼리 회피)

**실무 전략:**
먼저 3NF까지 정규화 후, 성능 이슈 발생 시 선택적으로 비정규화

**참고자료**
- [Denormalization](https://en.wikipedia.org/wiki/Denormalization)[^60]

</details>

[^60]: Wikipedia 역정규화

---

## 📌 View

### DB-061

View가 무엇이고, 언제 사용할 수 있나요?

<details>
<summary>답변</summary>

**View:** 하나 이상의 테이블에서 유도된 가상 테이블로, 실제 데이터를 저장하지 않고 쿼리 결과를 제공합니다.

**사용 사례:**

1. **보안:** 민감한 컬럼을 제외한 뷰 제공
2. **복잡한 쿼리 단순화:** 자주 사용하는 JOIN 쿼리를 뷰로 정의
3. **데이터 추상화:** 테이블 구조 변경 시 뷰만 수정
4. **권한 관리:** 테이블 대신 뷰에 권한 부여

```sql
CREATE VIEW active_users AS
SELECT id, name, email FROM users WHERE status = 'active';
```

**참고자료**
- [MySQL CREATE VIEW](https://dev.mysql.com/doc/refman/8.0/en/create-view.html)[^61]

</details>

[^61]: MySQL CREATE VIEW 문서

### DB-062
데이터베이스 View의 값을 수정해도 실제 테이블에는 반영되지 않나요?

<details>
<summary>답변</summary>

**아니요, 조건을 만족하면 View를 통해 실제 테이블이 수정됩니다!** 이것은 흔한 오해입니다.

**Updatable View 조건 (수정 가능):**
- 단일 테이블 기반
- 집계 함수 미사용 (SUM, COUNT 등)
- GROUP BY, HAVING, DISTINCT 미사용
- UNION 미사용
- 서브쿼리 미사용 (일부 예외)

**수정 불가능한 View:**
- 여러 테이블 JOIN
- 집계 결과를 보여주는 View
- 계산된 컬럼 (표현식)
- WITH CHECK OPTION으로 제한된 경우

```sql
-- Updatable View 예시
CREATE VIEW active_users AS
SELECT id, name, email FROM users WHERE status = 'active';

UPDATE active_users SET name = 'John' WHERE id = 1;
-- 주의: 실제 users 테이블에 반영됨!

-- WITH CHECK OPTION으로 범위 제한
CREATE VIEW active_users AS
SELECT * FROM users WHERE status = 'active'
WITH CHECK OPTION;
-- status를 'inactive'로 변경하려 하면 오류 발생
```

**참고자료**
- [MySQL Updatable Views](https://dev.mysql.com/doc/refman/8.0/en/view-updatability.html)[^62]

</details>

[^62]: MySQL Updatable View 문서

---

## 📌 성능 및 확장성

### DB-063

트래픽이 높아질 때, DB는 어떻게 관리를 할 수 있을까요? (Scale-up vs Scale-out)

<details>
<summary>답변</summary>

**Scale-up (수직 확장):**
- CPU, 메모리, 디스크 등 하드웨어 업그레이드
- 장점: 구현 간단, 애플리케이션 변경 불필요
- 단점: 비용 급증, 물리적 한계 존재

**Scale-out (수평 확장):**
- 서버 수를 늘려 부하 분산
- 방법: 레플리케이션, 샤딩, 파티셔닝
- 장점: 이론적으로 무한 확장 가능
- 단점: 구현 복잡, 분산 트랜잭션 어려움

**전략:**
1. 먼저 쿼리 최적화, 인덱싱
2. 캐시 레이어 추가 (Redis)
3. Read Replica 추가
4. 샤딩 도입

**참고자료**
- [MySQL Scaling](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)[^63]

</details>

[^63]: MySQL 최적화 문서

### DB-064
DB 서버를 분산하지 않고(Scale-out 없이) 높은 트래픽을 감당할 수 있는 방법에는 무엇이 있나요?

<details>
<summary>답변</summary>

**방법:**

1. **쿼리 최적화:**
   - 인덱스 튜닝
   - 실행 계획 분석 및 개선
   - 불필요한 컬럼 조회 제거

2. **캐싱:**
   - 애플리케이션 레벨 캐시 (Redis, Memcached)
   - 쿼리 캐시
   - ORM 2차 캐시

3. **커넥션 풀 최적화:**
   - 적정 커넥션 수 설정
   - 커넥션 재사용

4. **하드웨어 업그레이드:**
   - SSD 사용
   - 메모리 증설 (버퍼 풀 확대)

5. **비동기 처리:**
   - 쓰기 작업 큐잉
   - 배치 처리

**참고자료**
- [MySQL Performance Tuning](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)[^64]

</details>

[^64]: MySQL 성능 튜닝 문서

---

## 📌 스키마 및 아키텍처

### DB-065

Schema가 무엇인가요?

<details>
<summary>답변</summary>

**Schema:** 데이터베이스의 구조와 제약조건을 정의한 것입니다.

**포함 내용:**
- 테이블 정의 (컬럼명, 데이터 타입)
- 관계 정의 (외래키)
- 제약조건 (PRIMARY KEY, UNIQUE, NOT NULL, CHECK)
- 인덱스
- 뷰, 프로시저, 트리거

**MySQL에서:**
- Schema = Database (동일 개념)
- `CREATE SCHEMA`와 `CREATE DATABASE`는 동의어

```sql
CREATE SCHEMA my_app;
CREATE TABLE my_app.users (...);
```

**참고자료**
- [MySQL CREATE DATABASE](https://dev.mysql.com/doc/refman/8.0/en/create-database.html)[^65]

</details>

[^65]: MySQL CREATE DATABASE 문서

### DB-066
데이터베이스 3계층 스키마(외부/개념/내부 스키마)에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**ANSI/SPARC 3계층 아키텍처:**

**외부 스키마 (External Schema):**
- 사용자/애플리케이션 관점
- 각 사용자가 보는 데이터 구조
- View로 구현

**개념 스키마 (Conceptual Schema):**
- 전체 데이터베이스의 논리적 구조
- 테이블, 관계, 제약조건 정의
- 일반적으로 "스키마"라고 하면 이것

**내부 스키마 (Internal Schema):**
- 물리적 저장 구조
- 인덱스, 파일 구조, 저장 방식
- DBA 관점

**데이터 독립성:**
- 하위 스키마 변경이 상위 스키마에 영향 최소화

**참고자료**
- [Three-Schema Architecture](https://en.wikipedia.org/wiki/Three-schema_approach)[^66]

</details>

[^66]: Wikipedia 3단계 스키마 구조

---

## 📌 Connection Pool

### DB-067

DB의 Connection Pool에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Connection Pool:** 미리 생성된 DB 연결을 재사용하는 기법입니다.

**필요 이유:**
- DB 연결 생성은 비용이 큼 (TCP 핸드셰이크, 인증)
- 매 요청마다 연결 생성/해제는 비효율적

**동작 방식:**
1. 애플리케이션 시작 시 N개의 연결 미리 생성
2. 요청 시 풀에서 연결 획득
3. 작업 완료 후 연결을 풀에 반환 (연결 유지)
4. 모든 연결 사용 중이면 대기 또는 새 연결 생성

**주요 설정:**
- 최소/최대 커넥션 수
- 유휴 타임아웃
- 최대 대기 시간

**구현체:** HikariCP, DBCP, c3p0

**참고자료**
- [HikariCP](https://github.com/brettwooldridge/HikariCP)[^67]

</details>

[^67]: HikariCP GitHub

### DB-068
Client가 DB Connection을 어떻게 구성하는지 설명해 주세요.

<details>
<summary>답변</summary>

**연결 과정:**

1. **TCP 연결 수립:**
   - 클라이언트가 DB 서버 IP:Port로 TCP 연결
   - 3-way handshake

2. **인증:**
   - 사용자명, 비밀번호 전송
   - DB 서버가 권한 확인

3. **세션 설정:**
   - 문자셋, 타임존 등 설정
   - 연결별 설정 적용

4. **쿼리 실행:**
   - SQL 문 전송
   - 결과 수신

5. **연결 종료:**
   - 명시적 close() 또는 타임아웃

**JDBC 예시:**
```java
Connection conn = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/mydb",
    "user", "password"
);
```

**참고자료**
- [MySQL Connection Phase](https://dev.mysql.com/doc/dev/mysql-server/latest/page_protocol_connection_phase.html)[^68]

</details>

[^68]: MySQL 연결 프로토콜 문서

---

## 📌 보안

### DB-069

SQL Injection에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**SQL Injection:** 사용자 입력에 악의적인 SQL 코드를 삽입하여 DB를 조작하는 공격입니다.

**예시:**
```sql
-- 취약한 코드
SELECT * FROM users WHERE id = '$input';

-- 공격 입력: 1' OR '1'='1
-- 실행되는 쿼리
SELECT * FROM users WHERE id = '1' OR '1'='1';
```

**위험:**
- 데이터 유출
- 데이터 변조/삭제
- 인증 우회
- 시스템 명령 실행 (일부 DB)

**방지 방법:**
- Prepared Statement 사용
- 입력값 검증
- 최소 권한 원칙
- WAF 사용

**참고자료**
- [OWASP SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)[^69]

</details>

[^69]: OWASP SQL Injection 문서

### DB-070
서버 개발에서 사용하는 DB 라이브러리(e.g., ORM, JDBC)들은 SQL Injection 문제를 어떻게 해결할까요? (e.g., Prepared Statement)

<details>
<summary>답변</summary>

**Prepared Statement (Parameterized Query):**

SQL 구조와 데이터를 분리하여 처리합니다.

```java
// 안전한 방법
PreparedStatement stmt = conn.prepareStatement(
    "SELECT * FROM users WHERE id = ?"
);
stmt.setString(1, userInput);
```

**동작 방식:**
1. SQL 템플릿을 먼저 DB에 전송 (컴파일)
2. 파라미터 값을 별도로 전송
3. DB가 파라미터를 데이터로만 처리 (SQL로 해석 안 함)

**ORM에서:**
- JPA/Hibernate: 기본적으로 Prepared Statement 사용
- 네이티브 쿼리 사용 시 주의 필요

**추가 방어:**
- 입력값 화이트리스트 검증
- 이스케이프 처리 (권장하지 않음)

**참고자료**
- [JDBC PreparedStatement](https://docs.oracle.com/javase/tutorial/jdbc/basics/prepared.html)[^70]

</details>

[^70]: Oracle JDBC PreparedStatement 문서


총 질문 70개
