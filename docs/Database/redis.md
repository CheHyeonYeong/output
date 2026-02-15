# Redis / 레디스

> 카테고리: 인메모리 데이터베이스
> [← 면접 질문 목록으로 돌아가기](../interview.md)

---

## 📌 Redis 기본 개념

### REDIS-001
Redis의 기본 개념과 주요 특징은 무엇인가요?

<details>
<summary>답변</summary>

Redis(Remote Dictionary Server)는 오픈소스 인메모리 데이터 구조 저장소입니다.

**주요 특징:**
- **인메모리 저장**: 모든 데이터를 메모리에 저장하여 매우 빠른 읽기/쓰기 성능 제공
- **다양한 데이터 구조**: String, List, Set, Sorted Set, Hash, Stream 등 지원
- **싱글 스레드**: 단일 스레드로 명령을 처리하여 원자성 보장
- **Persistence**: RDB 스냅샷과 AOF 로그를 통한 데이터 영속성 지원
- **복제 및 클러스터링**: Master-Replica 복제와 Redis Cluster를 통한 고가용성 및 확장성
- **Pub/Sub**: 실시간 메시징 기능 제공

**참고자료**
- [Redis Introduction](https://redis.io/docs/about/)[^1]

</details>

[^1]: Redis 공식 문서 - Redis 소개

### REDIS-002
Redis가 인메모리 기반 데이터 저장소로서 제공하는 장점과 단점은 무엇인가요?

<details>
<summary>답변</summary>

**장점:**
- **초고속 성능**: 디스크 I/O 없이 메모리에서 직접 데이터 접근 (읽기/쓰기 지연시간 마이크로초 단위)
- **높은 처리량**: 초당 수십만 건의 연산 처리 가능
- **낮은 지연시간**: 실시간 애플리케이션에 적합
- **예측 가능한 성능**: 디스크 기반 DB의 캐시 미스로 인한 성능 변동 없음

**단점:**
- **메모리 비용**: RAM은 디스크보다 비싸므로 대용량 데이터 저장 시 비용 증가
- **데이터 용량 제한**: 물리적 메모리 크기에 제한됨
- **휘발성 위험**: 서버 장애 시 메모리 데이터 손실 가능 (Persistence 설정으로 완화)
- **메모리 단편화**: 장시간 운영 시 메모리 단편화 발생 가능

**참고자료**
- [Redis Persistence](https://redis.io/docs/management/persistence/)[^2]

</details>

[^2]: Redis 공식 문서 - Persistence 설명

### REDIS-003
Redis에서 제공하는 주요 데이터 타입(String, List, Set, Sorted Set, Hash, Stream)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**String**
- 가장 기본적인 타입, 최대 512MB 저장
- 텍스트, 숫자, 바이너리 데이터 저장 가능
- 사용 예: 캐싱, 세션 저장, 카운터

**List**
- 순서가 있는 문자열 리스트 (양방향 연결 리스트)
- 앞/뒤에서 삽입/삭제 O(1)
- 사용 예: 메시지 큐, 최근 항목 목록

**Set**
- 중복 없는 문자열 집합
- 합집합, 교집합, 차집합 연산 지원
- 사용 예: 태그, 고유 방문자 추적

**Sorted Set (ZSet)**
- 점수(score)로 정렬된 고유 문자열 집합
- 범위 조회, 순위 조회 효율적
- 사용 예: 리더보드, 우선순위 큐

**Hash**
- 필드-값 쌍의 컬렉션 (객체 표현에 적합)
- 개별 필드 접근/수정 가능
- 사용 예: 사용자 프로필, 설정 정보

**Stream**
- 로그 형태의 데이터 구조, 시간순 메시지 저장
- Consumer Group 지원으로 메시지 큐 구현
- 사용 예: 이벤트 소싱, 메시지 스트리밍

**참고자료**
- [Redis Data Types](https://redis.io/docs/data-types/)[^3]

</details>

[^3]: Redis 공식 문서 - 데이터 타입

### REDIS-004
Redis의 키-값 구조와 MongoDB, Cassandra 등 다른 NoSQL 데이터베이스와의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**Redis의 키-값 구조 특징:**
- 키는 바이너리 세이프 문자열 (최대 512MB)
- 값은 단순 문자열이 아닌 다양한 데이터 구조 지원 (Rich Data Structures)

**다른 NoSQL과의 차이점:**

| 구분 | Redis | Document DB (MongoDB) | Wide-Column (Cassandra) |
|------|-------|----------------------|------------------------|
| 데이터 모델 | Key-Value + 데이터 구조 | JSON Document | Column Family |
| 저장 위치 | 인메모리 (선택적 디스크) | 디스크 | 디스크 |
| 쿼리 | 키 기반 + 제한적 검색 | 풍부한 쿼리 언어 | CQL |
| 주 용도 | 캐시, 세션, 실시간 처리 | 범용 | 대규모 분산 저장 |
| 일관성 | 강한 일관성 (단일) | 튜너블 | 튜너블 |

**Redis만의 강점:**
- 원자적 연산 보장 (싱글 스레드)
- 밀리초 이하의 지연시간
- 풍부한 데이터 구조로 복잡한 연산 지원

**참고자료**
- [Redis Keys](https://redis.io/docs/data-types/tutorial/)[^4]

</details>

[^4]: Redis 공식 문서 - 키 사용법

---

## 📌 Redis Persistence

### REDIS-005
Redis에서 Persistence를 위해 지원하는 RDB와 AOF 방식의 차이점과 각각의 장단점은 무엇인가요?

<details>
<summary>답변</summary>

**RDB (Redis Database Backup)**
- 특정 시점의 메모리 스냅샷을 바이너리 파일로 저장
- `SAVE` (동기) 또는 `BGSAVE` (비동기) 명령으로 생성

| 장점 | 단점 |
|-----|-----|
| 컴팩트한 단일 파일로 백업 용이 | 스냅샷 간 데이터 손실 가능 |
| 복구 속도 빠름 | 대용량 데이터 시 fork() 부하 |
| AOF보다 빠른 재시작 | |

**AOF (Append Only File)**
- 모든 쓰기 명령을 로그로 기록
- `appendfsync` 옵션: always, everysec, no

| 장점 | 단점 |
|-----|-----|
| 데이터 손실 최소화 (최대 1초) | 파일 크기가 RDB보다 큼 |
| 사람이 읽을 수 있는 로그 | 복구 시간이 더 길 수 있음 |
| Rewrite로 파일 크기 최적화 | 쓰기 성능 약간 저하 |

**권장 설정:**
- 둘 다 활성화하여 상호 보완
- AOF로 내구성 확보, RDB로 빠른 복구 및 백업

**참고자료**
- [Redis Persistence](https://redis.io/docs/management/persistence/)[^5]

</details>

[^5]: Redis 공식 문서 - Persistence

---

## 📌 Redis Pub/Sub

### REDIS-006
Redis의 Pub/Sub 기능은 어떻게 동작하며, 이를 활용한 메시징 시스템 구현 사례에 대해 설명해주세요.

<details>
<summary>답변</summary>

**동작 방식:**
1. **Publisher**: `PUBLISH channel message` 명령으로 채널에 메시지 발행
2. **Subscriber**: `SUBSCRIBE channel` 명령으로 채널 구독
3. 메시지는 구독 중인 모든 클라이언트에게 실시간으로 전달 (Fire-and-forget)

**특징:**
- 채널은 사전 생성 불필요 (동적 생성)
- 패턴 구독 지원 (`PSUBSCRIBE news.*`)
- 메시지 저장 없음 (구독자 없으면 메시지 손실)
- At-most-once 전달 보장

**활용 사례:**

1. **실시간 알림 시스템**
```
PUBLISH notifications:user123 "새 메시지가 도착했습니다"
```

2. **채팅 애플리케이션**
```
SUBSCRIBE chat:room:general
```

3. **캐시 무효화 브로드캐스트**
```
PUBLISH cache:invalidate "user:profile:123"
```

4. **마이크로서비스 이벤트 전파**
- 서비스 간 느슨한 결합 유지
- 이벤트 기반 아키텍처 구현

**주의사항:**
- 메시지 영속성 필요 시 Redis Streams 권장
- 대규모 시스템에서는 Kafka 등 전용 메시지 브로커 고려

**참고자료**
- [Redis Pub/Sub](https://redis.io/docs/interact/pubsub/)[^6]

</details>

[^6]: Redis 공식 문서 - Pub/Sub

---

## 📌 Redis 클러스터와 고가용성

### REDIS-007
Redis Cluster의 기본 아키텍처와 데이터 샤딩(sharding) 방식에 대해 설명해주세요.

<details>
<summary>답변</summary>

**기본 아키텍처:**
- 최소 3개의 마스터 노드로 구성
- 각 마스터는 1개 이상의 레플리카 보유 권장
- 노드 간 Gossip 프로토콜로 상태 공유
- 클라이언트는 어떤 노드에 연결해도 올바른 노드로 리다이렉트

**데이터 샤딩 방식 (Hash Slot):**
- 총 16,384개의 해시 슬롯 사용
- 키의 CRC16 해시값 % 16384로 슬롯 결정
- 각 마스터 노드가 슬롯의 일부를 담당

```
예: 3개 노드 클러스터
Node A: 슬롯 0-5460
Node B: 슬롯 5461-10922
Node C: 슬롯 10923-16383
```

**Hash Tag:**
- `{user}:profile`, `{user}:settings`처럼 중괄호 사용
- 같은 태그의 키는 동일 슬롯에 저장 (멀티키 연산 가능)

**장점:**
- 수평적 확장성 (노드 추가로 용량/처리량 증가)
- 자동 페일오버로 고가용성 확보
- 데이터 자동 재분배

**참고자료**
- [Redis Cluster Specification](https://redis.io/docs/reference/cluster-spec/)[^7]

</details>

[^7]: Redis 공식 문서 - Cluster 명세

### REDIS-008
Redis Sentinel의 역할은 무엇이며, Redis Cluster와 달리 어떻게 고가용성을 보장하나요?

<details>
<summary>답변</summary>

**Redis Sentinel의 역할:**

1. **모니터링 (Monitoring)**
   - Master와 Replica 인스턴스 상태 지속 확인
   - 노드의 정상 동작 여부 감시

2. **알림 (Notification)**
   - 장애 발생 시 관리자/시스템에 알림
   - API를 통한 이벤트 전달

3. **자동 페일오버 (Automatic Failover)**
   - Master 장애 감지 시 Replica를 새 Master로 승격
   - 다른 Replica들을 새 Master에 연결
   - 클라이언트에게 새 Master 주소 제공

4. **구성 제공자 (Configuration Provider)**
   - 클라이언트가 현재 Master 주소를 Sentinel에 질의

**동작 방식:**
```
1. Sentinel 인스턴스들이 Master 모니터링
2. Master 응답 없음 감지 (SDOWN - 주관적 다운)
3. 다수의 Sentinel이 동의 (ODOWN - 객관적 다운)
4. Sentinel 리더 선출 (Raft 기반)
5. 리더가 최적의 Replica를 Master로 승격
```

**권장 구성:**
- 최소 3개의 Sentinel 인스턴스 (홀수 권장)
- 서로 다른 물리 서버/가용 영역에 배치
- quorum 설정으로 페일오버 결정 기준 지정

**참고자료**
- [Redis Sentinel](https://redis.io/docs/management/sentinel/)[^8]

</details>

[^8]: Redis 공식 문서 - Sentinel

---

## 📌 Redis 캐시 관리

### REDIS-009
Redis의 캐시 만료(expiration) 정책 설정 방법과, 실제 운영 시 고려해야 할 점은 무엇인가요?

<details>
<summary>답변</summary>

**만료 시간 설정 방법:**

```bash
# 키 생성 시 만료 설정
SET key value EX 3600          # 3600초 후 만료
SET key value PX 3600000       # 3600000밀리초 후 만료
SETEX key 3600 value           # SET + EX 동일

# 기존 키에 만료 설정
EXPIRE key 3600                # 초 단위
PEXPIRE key 3600000            # 밀리초 단위
EXPIREAT key 1735689600        # Unix timestamp

# 만료 시간 확인/제거
TTL key                        # 남은 시간 (초)
PERSIST key                    # 만료 제거
```

**운영 시 고려사항:**

1. **Cache Stampede (Thundering Herd)**
   - 동시에 많은 키 만료 시 DB 부하 급증
   - 해결: 만료 시간에 랜덤 지터(jitter) 추가

2. **메모리 관리**
   - 만료된 키는 즉시 삭제되지 않음 (lazy + 주기적 삭제)
   - maxmemory 설정과 함께 eviction 정책 설정 필요

3. **TTL 설계**
   - 데이터 특성에 맞는 적절한 TTL 설정
   - 너무 짧으면 캐시 효율 저하, 너무 길면 데이터 불일치

4. **만료 이벤트 모니터링**
   - Keyspace notifications로 만료 이벤트 구독 가능
   - `CONFIG SET notify-keyspace-events Ex`

**참고자료**
- [Redis EXPIRE](https://redis.io/commands/expire/)[^9]

</details>

[^9]: Redis 공식 문서 - EXPIRE 명령어

### REDIS-010
Redis의 캐시 eviction 정책(LRU, LFU, volatile-ttl 등) 간의 차이점과 메모리 부족 시 키 제거 전략 선택 기준에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Eviction 정책 종류:**

| 정책 | 설명 |
|-----|-----|
| `noeviction` | 메모리 초과 시 쓰기 명령 에러 반환 |
| `allkeys-lru` | 모든 키 중 가장 오래 사용되지 않은 키 제거 |
| `volatile-lru` | 만료 설정된 키 중 LRU 제거 |
| `allkeys-lfu` | 모든 키 중 가장 적게 사용된 키 제거 |
| `volatile-lfu` | 만료 설정된 키 중 LFU 제거 |
| `allkeys-random` | 모든 키 중 무작위 제거 |
| `volatile-random` | 만료 설정된 키 중 무작위 제거 |
| `volatile-ttl` | 만료 시간이 가장 짧은 키 제거 |

**LRU vs LFU 비교:**

- **LRU (Least Recently Used)**: 최근 접근 시간 기준
  - 최근 사용된 데이터가 다시 사용될 확률 높음 가정
  - 일반적인 캐시 워크로드에 적합

- **LFU (Least Frequently Used)**: 접근 빈도 기준
  - 자주 사용되는 데이터 유지
  - 인기 콘텐츠 캐싱에 적합 (Redis 4.0+)

**선택 기준:**

| 사용 사례 | 권장 정책 |
|---------|----------|
| 일반 캐시 | `allkeys-lru` |
| 세션 저장소 | `volatile-lru` 또는 `volatile-ttl` |
| 인기 콘텐츠 캐시 | `allkeys-lfu` |
| 데이터 손실 불가 | `noeviction` |

**설정 방법:**
```bash
CONFIG SET maxmemory 4gb
CONFIG SET maxmemory-policy allkeys-lru
```

**참고자료**
- [Redis Eviction](https://redis.io/docs/reference/eviction/)[^10]

</details>

[^10]: Redis 공식 문서 - Eviction 정책

---

## 📌 Redis 트랜잭션

### REDIS-011
Redis의 트랜잭션 기능(MULTI, EXEC, WATCH 등)을 활용하여 동시성 문제를 어떻게 해결할 수 있는지 설명해주세요.

<details>
<summary>답변</summary>

**기본 트랜잭션 (MULTI/EXEC):**

```bash
MULTI                    # 트랜잭션 시작
SET user:1:name "Alice"  # 명령 큐잉
INCR user:1:visits       # 명령 큐잉
EXEC                     # 일괄 실행
```

- 큐에 쌓인 명령들이 순차적으로 원자적 실행
- 중간에 다른 클라이언트 명령 끼어들지 않음

**WATCH를 활용한 Optimistic Locking:**

```bash
WATCH balance:user:1     # 키 감시 시작
GET balance:user:1       # 현재 값 읽기 (클라이언트에서)
# ... 로직 수행 ...
MULTI
SET balance:user:1 950   # 새 값 설정
EXEC                     # WATCH 이후 변경되었으면 nil 반환
```

**동시성 문제 해결 예시 (재고 차감):**

```python
def decrease_stock(item_id):
    while True:
        redis.watch(f"stock:{item_id}")
        stock = int(redis.get(f"stock:{item_id}"))

        if stock <= 0:
            redis.unwatch()
            return False

        pipe = redis.pipeline()
        pipe.multi()
        pipe.decr(f"stock:{item_id}")

        try:
            pipe.execute()  # 성공 시 루프 종료
            return True
        except WatchError:
            continue  # 충돌 시 재시도
```

**주의사항:**
- Redis 트랜잭션은 롤백 없음 (에러 발생해도 다른 명령 실행됨)
- WATCH는 트랜잭션 전 키 변경 감지용 (낙관적 잠금)
- 복잡한 원자적 연산은 Lua 스크립트 권장

**참고자료**
- [Redis Transactions](https://redis.io/docs/interact/transactions/)[^11]

</details>

[^11]: Redis 공식 문서 - Transactions

### REDIS-012
Redis에서 MULTI/EXEC 트랜잭션의 한계를 보완하기 위해 Lua 스크립트를 사용하는 이유와 이점은 무엇인가요?

<details>
<summary>답변</summary>

**Lua 스크립트 사용 이유:**

1. **원자성 보장**
   - 스크립트 전체가 단일 명령처럼 원자적 실행
   - 중간에 다른 명령 끼어들지 않음

2. **네트워크 왕복 감소**
   - 여러 명령을 한 번의 호출로 실행
   - 클라이언트-서버 간 통신 오버헤드 감소

3. **복잡한 로직 구현**
   - 조건문, 반복문 등 프로그래밍 로직 사용 가능
   - MULTI/EXEC로 불가능한 연산 구현

**사용 예시 - Rate Limiter:**

```lua
-- KEYS[1]: rate limit key
-- ARGV[1]: limit, ARGV[2]: window (seconds)

local current = redis.call('INCR', KEYS[1])
if current == 1 then
    redis.call('EXPIRE', KEYS[1], ARGV[2])
end
if current > tonumber(ARGV[1]) then
    return 0  -- 제한 초과
end
return 1  -- 허용
```

**실행 방법:**
```bash
# 직접 실행
EVAL "return redis.call('SET', KEYS[1], ARGV[1])" 1 mykey myvalue

# 스크립트 캐싱
SCRIPT LOAD "return redis.call('GET', KEYS[1])"
EVALSHA <sha1> 1 mykey
```

**이점 정리:**
| 장점 | 설명 |
|-----|-----|
| 원자성 | 경쟁 상태 방지 |
| 성능 | 네트워크 RTT 최소화 |
| 재사용성 | EVALSHA로 캐싱된 스크립트 재사용 |
| 유연성 | 복잡한 비즈니스 로직 서버사이드 실행 |

**참고자료**
- [Redis Scripting](https://redis.io/docs/interact/programmability/eval-intro/)[^12]

</details>

[^12]: Redis 공식 문서 - Lua Scripting

---

## 📌 Redis 메모리 관리

### REDIS-013
Redis의 메모리 관리 전략과, 메모리 부족 시 발생할 수 있는 문제 및 해결 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**메모리 관리 전략:**

1. **maxmemory 설정**
```bash
CONFIG SET maxmemory 4gb
```

2. **maxmemory-policy 설정**
   - 메모리 한계 도달 시 동작 정의
   - allkeys-lru, volatile-lru, noeviction 등

3. **데이터 구조 최적화**
   - 짧은 키 이름 사용
   - Hash로 작은 객체들 그룹화
   - 적절한 데이터 타입 선택

**메모리 부족 시 문제:**

| 문제 | 설명 |
|-----|-----|
| 쓰기 실패 | noeviction 정책 시 OOM 에러 |
| 성능 저하 | 빈번한 eviction으로 캐시 히트율 하락 |
| 스왑 사용 | OS 스왑 발생 시 심각한 지연 |
| 복제 지연 | 메모리 부족으로 복제 버퍼 오버플로우 |
| 서비스 중단 | OOM Killer에 의해 프로세스 종료 |

**해결 방법:**

1. **설정 최적화**
```bash
maxmemory 4gb
maxmemory-policy allkeys-lru
maxmemory-samples 10
```

2. **모니터링 및 알림**
```bash
INFO memory
MEMORY DOCTOR
```

3. **아키텍처 개선**
   - Redis Cluster로 수평 확장
   - 데이터 TTL 적절히 설정
   - 대용량 데이터는 다른 저장소 사용

**참고자료**
- [Redis Memory Optimization](https://redis.io/docs/management/optimization/memory-optimization/)[^13]

</details>

[^13]: Redis 공식 문서 - Memory Optimization

### REDIS-014
Redis에서 Key 네임스페이스(예: user:1234:profile 같은 Key prefix)를 사용하는 이유와 메모리 관리 및 운영상 장점은 무엇인가요?

<details>
<summary>답변</summary>

**Key Prefix 사용 이유:**

Redis는 단일 키 공간(flat namespace)을 사용하므로, 논리적 그룹화를 위해 프리픽스 컨벤션 사용

**네이밍 컨벤션 예시:**
```
user:1234:profile
user:1234:sessions
order:5678:items
cache:api:products
session:abc123
```

**장점:**

1. **논리적 분리**
   - 데이터 유형별, 서비스별 키 구분
   - 멀티테넌트 환경에서 테넌트별 분리

2. **관리 용이성**
   - `KEYS user:*` 또는 `SCAN`으로 그룹 조회
   - 특정 프리픽스 일괄 삭제 가능

3. **Redis Cluster 최적화**
   - Hash Tag `{user:1234}:profile`로 관련 키 같은 슬롯 배치
   - 멀티키 연산 가능하게 함

4. **충돌 방지**
   - 여러 애플리케이션이 같은 Redis 사용 시 네임스페이스 분리
   - 환경별 구분 (dev:, staging:, prod:)

5. **모니터링 및 분석**
   - 프리픽스별 메모리 사용량 분석
   - 키 패턴별 접근 통계

**참고자료**
- [Redis Key Patterns](https://redis.io/docs/data-types/tutorial/)[^14]

</details>

[^14]: Redis 공식 문서 - 키 네이밍 패턴

---

## 📌 Redis 세션 관리

### REDIS-015
Redis를 활용한 세션 관리 구현의 장점과 고려해야 할 단점은 무엇인가요?

<details>
<summary>답변</summary>

**장점:**

1. **빠른 성능**
   - 인메모리 저장으로 밀리초 이하 세션 조회
   - 높은 동시 접속자 처리 가능

2. **분산 환경 지원**
   - 여러 애플리케이션 서버가 세션 공유
   - 로드 밸런서 뒤에서 Sticky Session 불필요

3. **자동 만료**
   - TTL 설정으로 세션 자동 정리
   - 메모리 관리 용이

4. **확장성**
   - Redis Cluster로 수평 확장
   - 수백만 세션 처리 가능

**구현 예시:**
```bash
HSET session:abc123 user_id 1 username "alice" role "admin"
EXPIRE session:abc123 3600
```

**고려해야 할 단점:**

1. **데이터 손실 위험**
   - 메모리 기반으로 서버 장애 시 세션 손실
   - 해결: AOF 활성화, Replica 구성

2. **추가 인프라**
   - Redis 서버 별도 운영 필요
   - 네트워크 홉 추가

3. **직렬화 오버헤드**
   - 세션 객체 직렬화/역직렬화 필요

4. **보안 고려사항**
   - Redis 접근 제어 필요
   - 민감 정보 암호화 권장

5. **네트워크 의존성**
   - Redis 연결 실패 시 서비스 영향
   - 해결: 연결 풀링, 회로 차단기 패턴

**참고자료**
- [Redis as Session Store](https://redis.io/docs/latest/develop/use/patterns/)[^15]

</details>

[^15]: Redis 공식 문서 - 사용 패턴

---

## 📌 Redis 복제(Replication)

### REDIS-016
Redis의 데이터 복제(replication) 메커니즘과 이를 통한 데이터 가용성 확보 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**복제 메커니즘:**

1. **초기 동기화 (Full Sync)**
   - Replica가 Master에 연결 시 RDB 스냅샷 전송
   - 스냅샷 생성 중 발생한 쓰기는 버퍼에 저장 후 전송

2. **지속적 복제 (Incremental Sync)**
   - Master의 모든 쓰기 명령을 Replica에 전파
   - 비동기 방식으로 동작 (기본)

3. **부분 재동기화 (Partial Resync)**
   - 연결 끊김 후 재연결 시 변경분만 동기화
   - Replication Backlog 버퍼 활용

**설정 방법:**
```bash
REPLICAOF master-host 6379
```

**가용성 확보 방법:**

1. **읽기 부하 분산**
   - Replica에서 읽기 처리로 Master 부하 감소

2. **장애 대응**
   - Master 장애 시 Replica를 Master로 승격
   - 자동: Redis Sentinel 사용

3. **데이터 안전성**
```bash
min-replicas-to-write 1
min-replicas-max-lag 10
```

**참고자료**
- [Redis Replication](https://redis.io/docs/management/replication/)[^16]

</details>

[^16]: Redis 공식 문서 - Replication

### REDIS-017
Redis 복제 환경에서 데이터 정합성을 보장하기 위한 방법(WAIT, min-replicas 설정 등)과 각각의 한계는 무엇인가요?

<details>
<summary>답변</summary>

**데이터 정합성 보장 방법:**

**1. 동기 복제 설정**
```bash
WAIT 1 5000  # 최소 1개 Replica에 복제 완료까지 5초 대기
```
- **한계**: 지연시간 증가, Replica 장애 시 쓰기 차단 가능

**2. 최소 Replica 요구사항**
```bash
min-replicas-to-write 1
min-replicas-max-lag 10
```
- **한계**: Replica 부족 시 쓰기 불가

**3. Lua 스크립트 활용**
- 복잡한 연산을 원자적으로 실행
- **한계**: 스크립트 실행 중 전체 Redis 블로킹

**4. WATCH/MULTI 트랜잭션**
- Optimistic Locking으로 동시성 제어
- **한계**: 충돌 시 재시도 필요

**Redis의 근본적 한계:**

| 한계 | 설명 |
|-----|-----|
| 비동기 복제 | 기본적으로 Master 쓰기 후 응답, Replica 복제는 비동기 |
| 최종 일관성 | 강한 일관성 보장 불가 (CAP에서 AP 성향) |
| 페일오버 데이터 손실 | Master 장애 시 미복제 데이터 손실 가능 |

**참고자료**
- [Redis Consistency](https://redis.io/docs/management/replication/)[^17]

</details>

[^17]: Redis 공식 문서 - Replication 동작 방식

---

## 📌 Redis 성능 최적화

### REDIS-018
Redis 성능 최적화를 위해 고려해야 할 주요 설정과 모니터링 도구에는 어떤 것들이 있나요?

<details>
<summary>답변</summary>

**주요 성능 최적화 설정:**

**1. 메모리 관련**
```bash
maxmemory 4gb
maxmemory-policy allkeys-lru
```

**2. Persistence 튜닝**
```bash
save 900 1
appendfsync everysec
```

**3. 클라이언트 최적화**
- 연결 풀링 사용
- 파이프라이닝으로 RTT 감소

**모니터링 도구 및 명령:**

| 도구/명령 | 용도 |
|---------|-----|
| `INFO` | 전체 서버 통계 |
| `INFO memory` | 메모리 상세 정보 |
| `SLOWLOG GET` | 느린 명령 로그 |
| `LATENCY DOCTOR` | 지연 진단 |
| `MEMORY DOCTOR` | 메모리 문제 진단 |

**외부 모니터링 도구:**
- **Redis Insight**: 공식 GUI 모니터링 도구
- **Prometheus + Grafana**: redis_exporter 연동

**최적화 체크리스트:**
- 적절한 maxmemory 및 eviction 정책
- KEYS 명령 대신 SCAN 사용
- 큰 컬렉션 분할 (Big Key 방지)
- 파이프라이닝 활용

**참고자료**
- [Redis Administration](https://redis.io/docs/management/admin/)[^18]

</details>

[^18]: Redis 공식 문서 - Administration

---

## 📌 Redis vs Memcached

### REDIS-019
Redis와 Memcached의 차이점 및 각 솔루션의 장단점에 대해 설명해주세요.

<details>
<summary>답변</summary>

**주요 차이점 비교:**

| 항목 | Redis | Memcached |
|-----|-------|-----------|
| 데이터 타입 | String, List, Set, Hash 등 | String만 |
| 데이터 영속성 | RDB, AOF 지원 | 없음 |
| 복제 | Master-Replica 지원 | 없음 |
| 클러스터링 | Redis Cluster | 클라이언트 샤딩 |
| Pub/Sub | 지원 | 미지원 |
| 멀티스레드 | 싱글 (I/O는 6.0+ 멀티) | 멀티스레드 |
| 메모리 효율 | 상대적으로 낮음 | 높음 |

**Redis 장점:**
- 다양한 데이터 구조로 복잡한 연산 가능
- 데이터 영속성으로 재시작 후 복구
- 복제 및 고가용성 내장

**Memcached 장점:**
- 단순하고 가벼움
- 멀티스레드로 멀티코어 활용
- 메모리 효율적

**선택 기준:**

| 요구사항 | 권장 |
|---------|-----|
| 단순 키-값 캐시 | Memcached |
| 복잡한 데이터 구조 | Redis |
| 데이터 영속성 필요 | Redis |
| 고가용성 필요 | Redis |

**참고자료**
- [Redis vs Others](https://redis.io/docs/getting-started/faq/)[^19]

</details>

[^19]: Redis 공식 문서 - FAQ

---

## 📌 Redis 보안

### REDIS-020
Redis를 운영할 때 데이터 보안 및 접근 제어는 어떻게 구현할 수 있나요?

<details>
<summary>답변</summary>

**접근 제어 방법:**

**1. 인증 (Authentication)**
```bash
requirepass your-strong-password

# ACL (Redis 6.0+)
ACL SETUSER app-user on >password ~cache:* +get +set +del
```

**2. ACL (Access Control Lists)**
```bash
ACL SETUSER readonly on >pass123 ~* +@read
ACL SETUSER app on >secret ~app:* +@all -@dangerous
```

**3. 네트워크 보안**
```bash
bind 127.0.0.1 192.168.1.100
rename-command FLUSHALL ""
```

**4. TLS/SSL 암호화**
```bash
tls-port 6379
tls-cert-file /path/to/redis.crt
tls-key-file /path/to/redis.key
```

**보안 체크리스트:**

| 항목 | 설정 |
|-----|-----|
| 인증 활성화 | requirepass 또는 ACL |
| 바인딩 제한 | bind 127.0.0.1 |
| 위험 명령 비활성화 | FLUSHALL, CONFIG 등 |
| TLS 암호화 | 프로덕션 환경 필수 |
| 방화벽 | 신뢰된 IP만 허용 |

**참고자료**
- [Redis Security](https://redis.io/docs/management/security/)[^20]

</details>

[^20]: Redis 공식 문서 - Security

---

## 📌 Redis 메모리 단편화

### REDIS-021
Redis 장시간 운영 시 발생할 수 있는 메모리 단편화(mem_fragmentation_ratio) 문제와 이를 완화하기 위한 전략은 무엇인가요?

<details>
<summary>답변</summary>

**메모리 단편화란?**
- 할당된 메모리와 실제 사용 메모리 간 차이
- `mem_fragmentation_ratio`로 확인 (1.0-1.5 정상, 1.5 이상 주의)

**발생 원인:**
- 다양한 크기의 키/값 반복 생성/삭제
- 긴 시간 운영으로 메모리 공간 분산

**확인 방법:**
```bash
INFO memory
# mem_fragmentation_ratio: RSS / used_memory
```

**완화 전략:**

**1. Active Defragmentation (Redis 4.0+)**
```bash
activedefrag yes
active-defrag-threshold-lower 10
active-defrag-cycle-min 1
active-defrag-cycle-max 25
```

**2. Jemalloc 사용**
- Redis 기본 메모리 할당자
- 단편화 최소화에 최적화

**3. 재시작을 통한 해결**
- Replica 승격 방식으로 무중단 재시작

**4. 데이터 구조 최적화**
- 비슷한 크기의 키/값 사용
- Hash의 ziplist 인코딩 활용

**참고자료**
- [Redis Memory Optimization](https://redis.io/docs/management/optimization/memory-optimization/)[^21]

</details>

[^21]: Redis 공식 문서 - Memory Optimization

---

## 📌 Redis 키 만료

### REDIS-022
Redis의 키 만료(EXPIRE) 기능이 내부적으로 어떻게 구현되며(Lazy/Active Expiration), 만료된 데이터를 효율적으로 처리하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**내부 구현 방식:**

Redis는 **Lazy Expiration + Active Expiration** 두 가지 방식 조합 사용

**1. Lazy Expiration (수동적)**
- 클라이언트가 키에 접근할 때 만료 여부 확인
- 만료되었으면 삭제 후 nil 반환

**2. Active Expiration (능동적)**
- 백그라운드에서 주기적으로 실행 (초당 10회)
- 만료 설정된 키 중 무작위 20개 샘플링
- 만료된 키 삭제, 25% 이상이면 반복

**효율적인 만료 처리 전략:**

**1. 만료 시간 분산**
```python
base_ttl = 3600
jitter = random.randint(0, 300)
redis.setex(key, base_ttl + jitter, value)
```

**2. Keyspace Notifications**
```bash
CONFIG SET notify-keyspace-events Ex
SUBSCRIBE __keyevent@0__:expired
```

**주의사항:**
- 만료 키가 많으면 Active Expiration에 CPU 사용
- Replica에서는 Master의 DEL 명령 수신 시 삭제

**참고자료**
- [Redis EXPIRE](https://redis.io/commands/expire/)[^22]

</details>

[^22]: Redis 공식 문서 - EXPIRE 명령어

---

## 📌 Redis 동기/비동기 복제

### REDIS-023
Redis의 비동기 복제(기본)와 동기 복제(WAIT 명령) 방식의 차이점, 그리고 각 방식의 선택 기준에 대해 설명해주세요.

<details>
<summary>답변</summary>

**비동기 복제 (기본값):**
- Master가 쓰기 완료 후 즉시 클라이언트에 응답
- Replica로 전파는 백그라운드에서 진행
- 지연시간 최소화, 데이터 손실 가능성 있음

**동기 복제 (WAIT 명령):**
```bash
SET key value
WAIT 1 5000  # 1개 Replica 복제 완료까지 최대 5초 대기
```

**차이점 비교:**

| 항목 | 비동기 복제 | 동기 복제 (WAIT) |
|-----|-----------|-----------------|
| 응답 시점 | 즉시 | Replica 확인 후 |
| 지연시간 | 낮음 | 높음 |
| 데이터 손실 위험 | 있음 | 감소 |

**선택 기준:**

| 상황 | 권장 방식 |
|-----|----------|
| 캐시 용도, 성능 중시 | 비동기 (기본) |
| 데이터 손실 허용 불가 | WAIT 사용 |
| 금융/결제 시스템 | WAIT + 최소 1~2 Replica |

**참고자료**
- [Redis Replication](https://redis.io/docs/management/replication/)[^23]

</details>

[^23]: Redis 공식 문서 - Replication

---

## 📌 Redis Optimistic Locking

### REDIS-024
Redis의 WATCH 명령어를 활용한 Optimistic Locking 메커니즘은 어떻게 동작하며, MULTI/EXEC과 함께 어떻게 사용하나요?

<details>
<summary>답변</summary>

**Optimistic Locking 개념:**
- 데이터 충돌이 드물다고 가정
- 락을 미리 잡지 않고 커밋 시점에 충돌 검사
- 충돌 발생 시 재시도

**WATCH 동작 방식:**

```bash
WATCH balance:user:1    # 1. 키 감시 시작
GET balance:user:1      # 2. 현재 값 읽기
MULTI                   # 3. 트랜잭션 시작
SET balance:user:1 900  # 4. 명령 큐잉
EXEC                    # 5. 실행 (변경 감지 시 nil 반환)
```

**구현 예시:**
```python
def transfer_funds(from_user, to_user, amount):
    while True:
        try:
            redis.watch(f"balance:{from_user}")
            balance = int(redis.get(f"balance:{from_user}"))

            pipe = redis.pipeline(True)
            pipe.set(f"balance:{from_user}", balance - amount)
            pipe.execute()
            return True
        except WatchError:
            continue  # 충돌 시 재시도
```

**주요 명령어:**

| 명령 | 설명 |
|-----|-----|
| `WATCH key` | 키 감시 시작 |
| `UNWATCH` | 감시 해제 |
| `MULTI` | 트랜잭션 시작 |
| `EXEC` | 실행 (WATCH 키 변경 시 nil) |

**참고자료**
- [Redis Transactions](https://redis.io/docs/interact/transactions/)[^24]

</details>

[^24]: Redis 공식 문서 - Transactions

---

## 📌 Redis Cluster Resharding

### REDIS-025
Redis Cluster에서 해시 슬롯 기반 데이터 재분배(Resharding)를 수행할 때의 절차와 주의할 점은 무엇인가요?

<details>
<summary>답변</summary>

**Resharding이란?**
- 해시 슬롯을 노드 간 이동하여 데이터 재분배
- 노드 추가/제거, 부하 분산 시 필요

**절차:**

**1. 클러스터 상태 확인**
```bash
redis-cli --cluster check 127.0.0.1:7000
```

**2. 새 노드 추가 (필요 시)**
```bash
redis-cli --cluster add-node 127.0.0.1:7003 127.0.0.1:7000
```

**3. 슬롯 재분배**
```bash
redis-cli --cluster reshard 127.0.0.1:7000
redis-cli --cluster rebalance 127.0.0.1:7000
```

**주의사항:**

| 주의점 | 설명 |
|-------|-----|
| 서비스 영향 | 슬롯 이동 중 리다이렉트 발생 |
| 대역폭 | 대량 데이터 이동 시 네트워크 부하 |
| Big Key | 큰 키 이동 시 블로킹 가능 |
| 점진적 수행 | 한 번에 많은 슬롯 이동 피하기 |

**모범 사례:**
1. 트래픽 낮은 시간에 수행
2. 소량씩 점진적 이동
3. 각 단계 후 상태 확인

**참고자료**
- [Redis Cluster Tutorial](https://redis.io/docs/management/scaling/)[^25]

</details>

[^25]: Redis 공식 문서 - Cluster Scaling

---

## 📌 Redis ACID

### REDIS-026
Redis의 MULTI/EXEC 트랜잭션이 ACID 특성(원자성, 일관성, 격리성, 지속성)을 어떻게 보장하며, RDBMS 트랜잭션과 어떤 차이가 있나요?

<details>
<summary>답변</summary>

**ACID 특성별 분석:**

**1. Atomicity (원자성) - 부분적 보장**
- 트랜잭션 내 명령들은 연속적으로 실행됨
- **주의**: 개별 명령 실패해도 나머지 명령 계속 실행 (롤백 없음)

**2. Consistency (일관성) - 부분적 보장**
- 단일 명령은 항상 일관성 유지
- 트랜잭션 중 에러 발생 시 부분 적용 가능

**3. Isolation (격리성) - 보장**
- 싱글 스레드로 명령 처리
- MULTI/EXEC 블록은 완전히 격리

**4. Durability (지속성) - 설정에 따라**
| 설정 | 지속성 |
|-----|-------|
| AOF always | 모든 명령 기록 |
| AOF everysec | 최대 1초 손실 |

**RDBMS 트랜잭션과 비교:**

| 특성 | Redis | RDBMS |
|-----|-------|-------|
| 원자성 | 부분적 (롤백 없음) | 완전 |
| 격리성 | 완전 | 레벨 선택 가능 |
| 롤백 | 불가 | 가능 |

**결론:**
- Redis 트랜잭션은 전통적 ACID 완전 보장하지 않음
- 강한 트랜잭션 필요 시 Lua 스크립트 또는 RDBMS 고려

**참고자료**
- [Redis Transactions](https://redis.io/docs/interact/transactions/)[^26]

</details>

[^26]: Redis 공식 문서 - Transactions

---

## 📌 Redis Sorted Set

### REDIS-027
Redis Sorted Set(ZSet)의 내부 구현 방식(Skip List, Hash Table)과 리더보드, 우선순위 큐 등 대표적인 활용 사례에 대해 설명해주세요.

<details>
<summary>답변</summary>

**내부 구현 방식:**

**1. 작은 데이터: Listpack**
- 조건: 원소 128개 이하 & 각 원소 64바이트 이하
- 연속된 메모리 블록에 저장

**2. 큰 데이터: Skip List + Hash Table**
- **Skip List**: 점수 기반 정렬 및 범위 검색 O(log N)
- **Hash Table**: 멤버-점수 O(1) 조회

**시간 복잡도:**

| 연산 | 복잡도 |
|-----|-------|
| ZADD | O(log N) |
| ZSCORE | O(1) |
| ZRANGE | O(log N + M) |

**대표 활용 사례:**

**1. 리더보드**
```bash
ZADD leaderboard 1500 "player:alice"
ZREVRANGE leaderboard 0 9 WITHSCORES
```

**2. 시간 기반 이벤트**
```bash
ZADD scheduled:tasks 1700000000 "task:123"
```

**3. 레이트 리미터**
```bash
ZADD ratelimit:user:1 <timestamp> <request-id>
ZREMRANGEBYSCORE ratelimit:user:1 0 <1분전>
```

**참고자료**
- [Redis Sorted Sets](https://redis.io/docs/data-types/sorted-sets/)[^27]

</details>

[^27]: Redis 공식 문서 - Sorted Sets

---

## 📌 Redis Hash

### REDIS-028
Redis의 Hash 자료구조를 활용하여 메모리 사용량을 최적화하는 방법(listpack 인코딩, 객체 버킷팅 등)은 무엇인가요?

<details>
<summary>답변</summary>

**Hash의 메모리 최적화 원리:**

작은 Hash는 **listpack** 인코딩 사용
- 연속된 메모리 블록에 필드-값 저장
- 개별 키-값 대비 메모리 오버헤드 감소

**최적화 전략:**

**1. 객체 저장 시 Hash 사용**
```bash
# 비효율적
SET user:1:name "Alice"
SET user:1:email "alice@example.com"

# 효율적
HSET user:1 name "Alice" email "alice@example.com"
```

**2. 작은 객체 버킷팅**
```bash
HSET users:123 456:name "Alice"
```

**주의사항:**

| 항목 | 고려사항 |
|-----|---------|
| listpack 한계 초과 | hashtable로 변환되어 메모리 증가 |
| 필드 독립적 TTL | Hash 필드별 만료 불가 |

**메모리 분석:**
```bash
MEMORY USAGE user:1
OBJECT ENCODING user:1
```

**참고자료**
- [Redis Hashes](https://redis.io/docs/data-types/hashes/)[^28]

</details>

[^28]: Redis 공식 문서 - Hashes

---

## 📌 Redis 모니터링

### REDIS-029
Redis에서 메모리 사용 현황을 모니터링하기 위한 주요 명령어(INFO memory, MEMORY USAGE/DOCTOR/STATS 등)와 그 활용법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**INFO memory 명령:**
```bash
redis-cli INFO memory
```

**주요 지표:**

| 지표 | 설명 |
|-----|-----|
| `used_memory` | Redis가 할당한 메모리 |
| `used_memory_rss` | OS가 할당한 실제 메모리 |
| `mem_fragmentation_ratio` | RSS/used_memory (1.5 이상 주의) |

**MEMORY 명령어:**
```bash
MEMORY USAGE mykey
MEMORY DOCTOR
MEMORY STATS
```

**실시간 모니터링:**
```bash
SLOWLOG GET 10
CLIENT LIST
```

**외부 도구 연동:**
- **Redis Insight**: 공식 GUI
- **Prometheus + Grafana**: redis_exporter 연동

**모니터링 체크리스트:**
- 메모리 사용률
- 단편화율
- 캐시 히트율
- 연결 수
- 느린 쿼리

**참고자료**
- [Redis INFO](https://redis.io/commands/info/)[^29]

</details>

[^29]: Redis 공식 문서 - INFO 명령어

---

## 📌 Redis 최신 기능

### REDIS-030
Redis Streams와 Redis Modules(RediSearch, RedisJSON 등)가 기존 Pub/Sub 대비 어떤 장점을 가지며, 백엔드 시스템에서 어떻게 활용될 수 있나요?

<details>
<summary>답변</summary>

**Redis Streams:**

- 로그 형태의 추가 전용 데이터 구조
- Consumer Group으로 분산 처리 지원

```bash
XADD mystream * field1 value1
XREADGROUP GROUP mygroup consumer1 STREAMS mystream >
```

**vs Pub/Sub:**

| 항목 | Streams | Pub/Sub |
|-----|---------|---------|
| 메시지 저장 | 영구 저장 | 저장 안 됨 |
| 재처리 | 가능 | 불가능 |
| Consumer Group | 지원 | 미지원 |

**Redis Modules:**

| 모듈 | 기능 |
|-----|-----|
| RediSearch | 전문 검색 |
| RedisJSON | JSON 문서 저장/쿼리 |
| RedisTimeSeries | 시계열 데이터 |
| RedisBloom | Bloom Filter |

**기존 기능 대비 장점:**
- RediSearch: 서버사이드 검색
- RedisJSON: 부분 쿼리/수정
- RedisTimeSeries: 다운샘플링, 집계

**참고자료**
- [Redis Streams](https://redis.io/docs/data-types/streams/)[^30]
- [Redis Modules](https://redis.io/modules)[^31]

</details>

[^30]: Redis 공식 문서 - Streams
[^31]: Redis 모듈 허브
