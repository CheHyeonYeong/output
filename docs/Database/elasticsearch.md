# Elasticsearch / 엘라스틱서치

> 카테고리: 검색 엔진
> [← 면접 질문 목록으로 돌아가기](../interview.md)

---

## 📌 Elasticsearch 기본 아키텍처

### ES-001
Elasticsearch의 기본 아키텍처와 주요 컴포넌트(Cluster, Node, Index, Document 등)에 대해 설명해주세요.

<details>
<summary>답변</summary>

Elasticsearch는 분산 검색 및 분석 엔진으로, 다음과 같은 주요 컴포넌트로 구성됩니다:

- **Cluster**: 하나 이상의 노드로 구성된 집합으로, 모든 데이터를 저장하고 통합 인덱싱 및 검색 기능을 제공합니다. 고유한 이름으로 식별됩니다.
- **Node**: 클러스터의 일부로서 데이터를 저장하고 인덱싱 및 검색에 참여하는 단일 서버입니다. Master, Data, Ingest 등 역할별로 구분됩니다.
- **Index**: 유사한 특성을 가진 도큐먼트의 모음입니다. RDBMS의 데이터베이스와 유사한 개념입니다.
- **Document**: 인덱스에 저장되는 기본 정보 단위로, JSON 형식으로 표현됩니다. RDBMS의 행(row)과 유사합니다.
- **Shard**: 인덱스를 수평 분할한 조각으로, 데이터 분산 저장과 병렬 처리를 가능하게 합니다.

**참고자료**
- [Elasticsearch Basic Concepts](https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html)[^1]

</details>

[^1]: Elasticsearch 공식 문서 - 기본 개념 소개

### ES-002
Elasticsearch에서 인덱스와 도큐먼트의 개념과 관계는 무엇인가요?

<details>
<summary>답변</summary>

**Index(인덱스)**는 도큐먼트의 논리적 컨테이너로, 관련된 데이터를 그룹화합니다. RDBMS의 테이블과 유사하지만 더 유연한 스키마를 가집니다.

**Document(도큐먼트)**는 검색 가능한 데이터의 최소 단위로, JSON 객체 형태로 저장됩니다. 각 도큐먼트는 고유한 `_id`를 가지며, 필드(field)들의 집합으로 구성됩니다.

**관계**:
- 하나의 인덱스는 여러 도큐먼트를 포함할 수 있습니다
- 도큐먼트는 반드시 하나의 인덱스에 속해야 합니다
- 인덱스의 매핑(mapping)은 도큐먼트 필드의 데이터 타입을 정의합니다

**참고자료**
- [Data in: documents and indices](https://www.elastic.co/guide/en/elasticsearch/reference/current/documents-indices.html)[^2]

</details>

[^2]: Elasticsearch 공식 문서 - 도큐먼트와 인덱스

### ES-003
Shard와 Replica의 역할 및 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**Primary Shard(프라이머리 샤드)**:
- 인덱스의 데이터를 수평 분할한 단위입니다
- 인덱스 생성 시 샤드 수가 결정되며, 이후 변경이 어렵습니다
- 각 도큐먼트는 하나의 프라이머리 샤드에만 저장됩니다

**Replica Shard(레플리카 샤드)**:
- 프라이머리 샤드의 복사본입니다
- 고가용성 제공: 프라이머리 샤드 장애 시 레플리카가 승격됩니다
- 검색 성능 향상: 검색 요청을 분산 처리할 수 있습니다
- 동적으로 개수 조정이 가능합니다

**주요 차이점**:
| 구분 | Primary Shard | Replica Shard |
|------|---------------|---------------|
| 역할 | 데이터 저장/쓰기 | 복제/읽기 분산 |
| 변경 | 인덱스 생성 시 고정 | 동적 변경 가능 |
| 필수 여부 | 필수 | 선택 |

**참고자료**
- [Scalability and resilience](https://www.elastic.co/guide/en/elasticsearch/reference/current/scalability.html)[^3]

</details>

[^3]: Elasticsearch 공식 문서 - 확장성과 복원력

### ES-004
Elasticsearch에서 클러스터와 노드 간의 관계와 역할에 대해 설명해주세요.

<details>
<summary>답변</summary>

**클러스터(Cluster)**는 하나 이상의 노드로 구성된 집합으로, 동일한 `cluster.name`을 공유합니다.

**노드(Node)**는 클러스터를 구성하는 개별 서버로, 역할에 따라 다음과 같이 구분됩니다:

- **Master Node**: 클러스터 상태 관리, 인덱스 생성/삭제, 샤드 할당 결정
- **Data Node**: 실제 데이터 저장, 검색 및 집계 수행
- **Coordinating Node**: 검색 요청 라우팅 및 결과 병합
- **Ingest Node**: 인덱싱 전 데이터 전처리

**관계**:
- 노드는 클러스터에 참여하여 데이터와 워크로드를 분산합니다
- Master-eligible 노드 중 하나가 마스터로 선출됩니다
- 노드 간 통신은 Transport 계층(기본 9300 포트)을 통해 이루어집니다

**참고자료**
- [Node roles](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-node.html)[^4]

</details>

[^4]: Elasticsearch 공식 문서 - 노드 역할

---

## 📌 Elasticsearch Query DSL

### ES-005
Query DSL의 기본 구조와 사용 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Query DSL(Domain Specific Language)**은 JSON 기반의 쿼리 언어로, Elasticsearch에서 검색을 수행하는 표준 방법입니다.

**기본 구조**:
```json
{
  "query": {
    "query_type": {
      "field_name": "search_value"
    }
  }
}
```

**주요 컨텍스트**:
- **Query Context**: 관련성 점수(_score)를 계산합니다
- **Filter Context**: 조건 일치 여부만 판단하며 캐싱됩니다

**기본 사용 예시**:
```json
{
  "query": {
    "bool": {
      "must": [{ "match": { "title": "elasticsearch" }}],
      "filter": [{ "term": { "status": "published" }}]
    }
  }
}
```

**참고자료**
- [Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html)[^5]

</details>

[^5]: Elasticsearch 공식 문서 - Query DSL

### ES-006
Match 쿼리와 Term 쿼리의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**Match Query**:
- 전문 검색(Full-text search)에 사용됩니다
- 검색어를 분석기(Analyzer)를 통해 토큰화합니다
- 분석된 토큰으로 검색하여 유연한 매칭이 가능합니다

```json
{ "match": { "content": "Quick Brown Fox" } }
// "quick", "brown", "fox"로 분석 후 검색
```

**Term Query**:
- 정확한 값 매칭(Exact match)에 사용됩니다
- 분석기를 거치지 않고 원본 그대로 검색합니다
- keyword 필드, 숫자, 날짜 등에 적합합니다

```json
{ "term": { "status": "published" } }
// "published" 정확히 일치하는 문서 검색
```

**핵심 차이**: Match는 분석기 적용 O, Term은 분석기 적용 X

**참고자료**
- [Match query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html)[^6]
- [Term query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html)[^7]

</details>

[^6]: Elasticsearch 공식 문서 - Match query
[^7]: Elasticsearch 공식 문서 - Term query

### ES-007
Range 쿼리의 활용 사례와 주의사항에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Range Query**는 숫자, 날짜, 문자열 필드에서 특정 범위 내의 값을 검색합니다.

**주요 연산자**:
- `gt`: 초과, `gte`: 이상
- `lt`: 미만, `lte`: 이하

**활용 사례**:
```json
// 날짜 범위 검색
{ "range": { "created_at": { "gte": "2024-01-01", "lt": "2024-02-01" }}}

// 가격 범위 검색
{ "range": { "price": { "gte": 10000, "lte": 50000 }}}
```

**주의사항**:
- **날짜 형식**: 인덱스 매핑의 날짜 형식과 일치해야 합니다
- **타임존**: `time_zone` 파라미터로 시간대를 명시하는 것이 좋습니다
- **성능**: 넓은 범위 쿼리는 많은 도큐먼트를 스캔할 수 있어 Filter Context 사용 권장
- **문자열 범위**: 사전순 비교이므로 의도한 결과와 다를 수 있습니다

**참고자료**
- [Range query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html)[^8]

</details>

[^8]: Elasticsearch 공식 문서 - Range query

### ES-008
Bool 쿼리의 구성 요소(Must, Should, Must Not, Filter)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Bool Query**는 여러 쿼리를 논리적으로 조합하는 복합 쿼리입니다.

**구성 요소**:

| 절 | 설명 | 점수 영향 | 캐싱 |
|---|------|---------|------|
| **must** | 반드시 일치해야 함 (AND) | O | X |
| **should** | 일치하면 점수 증가 (OR) | O | X |
| **must_not** | 일치하면 제외 (NOT) | X | O |
| **filter** | 반드시 일치해야 함 (필터링) | X | O |

**예시**:
```json
{
  "bool": {
    "must": [{ "match": { "title": "elasticsearch" }}],
    "should": [{ "match": { "content": "guide" }}],
    "must_not": [{ "term": { "status": "draft" }}],
    "filter": [{ "range": { "date": { "gte": "2024-01-01" }}}]
  }
}
```

**성능 팁**: 점수 계산이 필요 없는 조건은 `filter`를 사용하여 캐싱 이점을 활용하세요.

**참고자료**
- [Boolean query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)[^9]

</details>

[^9]: Elasticsearch 공식 문서 - Boolean query

---

## 📌 Elasticsearch Aggregation

### ES-009
Aggregation의 개념과 Bucket Aggregation, Metric Aggregation의 차이에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Aggregation**은 데이터를 그룹화하고 통계를 계산하는 기능으로, SQL의 GROUP BY와 유사합니다.

**Bucket Aggregation**:
- 도큐먼트를 기준에 따라 그룹(버킷)으로 분류합니다
- 예: `terms`, `date_histogram`, `range`, `filters`
```json
{ "aggs": { "by_category": { "terms": { "field": "category" }}}}
```

**Metric Aggregation**:
- 숫자 값에 대한 통계를 계산합니다
- 예: `sum`, `avg`, `min`, `max`, `cardinality`, `stats`
```json
{ "aggs": { "avg_price": { "avg": { "field": "price" }}}}
```

**Pipeline Aggregation**:
- 다른 집계 결과를 입력으로 사용합니다
- 예: `derivative`, `moving_avg`, `bucket_sort`

**중첩 사용 예시**:
```json
{
  "aggs": {
    "by_category": {
      "terms": { "field": "category" },
      "aggs": { "avg_price": { "avg": { "field": "price" }}}
    }
  }
}
```

**참고자료**
- [Aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html)[^10]

</details>

[^10]: Elasticsearch 공식 문서 - Aggregations

---

## 📌 Elasticsearch 분석기

### ES-010
Analyzers, Tokenizers, Filters의 역할과 설정 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Analyzer(분석기)**는 텍스트를 검색 가능한 토큰으로 변환하는 파이프라인입니다.

**구성 요소**:

1. **Character Filters**: 텍스트 전처리 (HTML 태그 제거 등)
2. **Tokenizer**: 텍스트를 토큰으로 분리
3. **Token Filters**: 토큰 후처리 (소문자 변환, 불용어 제거 등)

**처리 순서**: Character Filters → Tokenizer → Token Filters

**내장 Analyzer**:
- `standard`: 기본 분석기, 유니코드 텍스트 분할
- `simple`: 문자가 아닌 곳에서 분할, 소문자 변환
- `whitespace`: 공백 기준 분할
- `keyword`: 전체 텍스트를 하나의 토큰으로

**커스텀 Analyzer 설정**:
```json
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": ["lowercase", "asciifolding"]
        }
      }
    }
  }
}
```

**참고자료**
- [Text analysis](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis.html)[^11]

</details>

[^11]: Elasticsearch 공식 문서 - Text analysis

---

## 📌 Elasticsearch Mapping

### ES-011
Mapping의 개념과 동적 매핑(Dynamic Mapping) 및 명시적 매핑(Explicit Mapping)의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**Mapping**은 인덱스에 저장되는 도큐먼트의 구조와 필드 타입을 정의하는 스키마입니다.

**Dynamic Mapping (동적 매핑)**:
- 도큐먼트 인덱싱 시 자동으로 필드 타입을 추론합니다
- 빠른 프로토타이핑에 유용하지만, 의도치 않은 타입 할당 가능성이 있습니다
```json
// "123" → text, 123 → long, "2024-01-01" → date
```

**Explicit Mapping (명시적 매핑)**:
- 인덱스 생성 시 명확하게 필드 타입을 정의합니다
- 프로덕션 환경에서 권장됩니다
```json
{
  "mappings": {
    "properties": {
      "title": { "type": "text" },
      "price": { "type": "integer" },
      "created_at": { "type": "date" }
    }
  }
}
```

**주요 차이점**:
| 구분 | Dynamic | Explicit |
|------|---------|----------|
| 정의 시점 | 자동 (인덱싱 시) | 수동 (인덱스 생성 시) |
| 타입 정확성 | 추론 기반 | 명시적 |
| 유연성 | 높음 | 낮음 |
| 권장 환경 | 개발 | 프로덕션 |

**참고자료**
- [Mapping](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html)[^12]

</details>

[^12]: Elasticsearch 공식 문서 - Mapping

---

## 📌 Elasticsearch 검색 점수

### ES-012
Elasticsearch에서 Relevance Scoring의 원리와 개선 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Relevance Scoring**은 검색 쿼리와 도큐먼트의 관련성을 수치화한 점수(_score)입니다.

**점수 계산 알고리즘 (BM25)**:
Elasticsearch 5.0부터 기본 알고리즘으로, 다음 요소를 고려합니다:
- **TF (Term Frequency)**: 검색어가 도큐먼트에 등장하는 빈도
- **IDF (Inverse Document Frequency)**: 전체 도큐먼트 대비 검색어의 희소성
- **Field Length**: 필드 길이가 짧을수록 높은 점수

**점수 개선 방법**:

1. **Field Boosting**: 특정 필드에 가중치 부여
```json
{ "multi_match": { "query": "elasticsearch", "fields": ["title^3", "content"] }}
```

2. **Function Score Query**: 커스텀 점수 함수 적용
```json
{ "function_score": { "query": {...}, "functions": [{ "field_value_factor": { "field": "popularity" }}]}}
```

3. **Explain API**: 점수 계산 과정 분석
```
GET /index/_explain/doc_id
```

**참고자료**
- [Relevance tuning](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-relevance.html)[^13]

</details>

[^13]: Elasticsearch 공식 문서 - Relevance tuning

### ES-013
Boosting을 통한 검색 결과 가중치 조정 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Boosting**은 특정 조건에 따라 검색 점수를 높이거나 낮추는 기법입니다.

**1. Query-time Boosting (쿼리 시점)**:
```json
{
  "bool": {
    "should": [
      { "match": { "title": { "query": "elasticsearch", "boost": 3 }}},
      { "match": { "content": { "query": "elasticsearch", "boost": 1 }}}
    ]
  }
}
```

**2. Boosting Query**:
- positive: 일치하면 점수 계산
- negative: 일치하면 점수 감소
```json
{
  "boosting": {
    "positive": { "match": { "content": "elasticsearch" }},
    "negative": { "term": { "status": "outdated" }},
    "negative_boost": 0.5
  }
}
```

**3. Function Score Query**:
```json
{
  "function_score": {
    "query": { "match_all": {} },
    "functions": [
      { "filter": { "term": { "featured": true }}, "weight": 10 },
      { "field_value_factor": { "field": "popularity", "modifier": "log1p" }}
    ],
    "boost_mode": "multiply"
  }
}
```

**참고자료**
- [Boosting query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-boosting-query.html)[^14]

</details>

[^14]: Elasticsearch 공식 문서 - Boosting query

### ES-014
Multi-match 쿼리와 Cross-field 검색의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**Multi-match Query**는 여러 필드에서 동시에 검색을 수행합니다.

**타입별 차이**:

| 타입 | 설명 | 사용 사례 |
|------|------|----------|
| `best_fields` | 가장 높은 점수의 필드 사용 (기본값) | 동일 필드 내 매칭 중요 |
| `most_fields` | 모든 필드 점수 합산 | 동의어가 여러 필드에 있을 때 |
| `cross_fields` | 모든 필드를 하나로 취급 | 이름 검색 (first_name + last_name) |
| `phrase` | 구문 매칭 | 정확한 문구 검색 |
| `phrase_prefix` | 접두어 구문 매칭 | 자동완성 |

**Cross-field 검색 예시**:
```json
{
  "multi_match": {
    "query": "홍 길동",
    "type": "cross_fields",
    "fields": ["first_name", "last_name"],
    "operator": "and"
  }
}
```
- "홍"이 first_name에, "길동"이 last_name에 있어도 매칭됩니다

**best_fields와의 차이**:
- `best_fields`: 각 필드를 독립적으로 검색하여 최고 점수 선택
- `cross_fields`: 여러 필드를 하나의 큰 필드처럼 취급

**참고자료**
- [Multi-match query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html)[^15]

</details>

[^15]: Elasticsearch 공식 문서 - Multi-match query

---

## 📌 Elasticsearch 데이터 타입

### ES-015
Nested 타입과 Object 타입의 차이점 및 사용 시 주의사항에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Object 타입**:
- 기본 JSON 객체 매핑 방식입니다
- 내부적으로 필드가 평탄화(flatten)되어 저장됩니다
- 배열 내 객체 간 관계가 손실됩니다

```json
// 원본
{ "users": [{ "name": "Kim", "age": 30 }, { "name": "Lee", "age": 25 }] }
// 저장 형태
{ "users.name": ["Kim", "Lee"], "users.age": [30, 25] }
```

**Nested 타입**:
- 각 객체를 별도의 숨겨진 도큐먼트로 저장합니다
- 객체 간 관계가 유지됩니다
- Nested Query로 검색해야 합니다

```json
{ "mappings": { "properties": { "users": { "type": "nested" }}}}
```

**주요 차이점**:
| 구분 | Object | Nested |
|------|--------|--------|
| 관계 유지 | X | O |
| 저장 방식 | 평탄화 | 별도 도큐먼트 |
| 검색 방식 | 일반 쿼리 | Nested Query |
| 성능 | 빠름 | 상대적으로 느림 |

**주의사항**:
- Nested 객체 수 제한: 기본 10,000개 (`index.mapping.nested_objects.limit`)
- 많은 Nested 객체는 힙 메모리와 검색 성능에 영향

**참고자료**
- [Nested field type](https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html)[^16]

</details>

[^16]: Elasticsearch 공식 문서 - Nested field type

---

## 📌 Elasticsearch 인덱스 설정

### ES-016
Elasticsearch의 인덱스 설정(Index Settings)과 매핑 설정(Mapping Settings)의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**Index Settings (인덱스 설정)**:
인덱스의 동작 방식과 물리적 구성을 정의합니다.

- **Static Settings**: 인덱스 생성 시에만 설정 가능
  - `number_of_shards`: 프라이머리 샤드 수
  - `codec`: 압축 알고리즘

- **Dynamic Settings**: 런타임에 변경 가능
  - `number_of_replicas`: 레플리카 수
  - `refresh_interval`: 인덱스 갱신 주기

```json
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 2,
    "refresh_interval": "5s"
  }
}
```

**Mapping Settings (매핑 설정)**:
도큐먼트 필드의 데이터 타입과 처리 방식을 정의합니다.

```json
{
  "mappings": {
    "properties": {
      "title": { "type": "text", "analyzer": "standard" },
      "price": { "type": "integer" },
      "tags": { "type": "keyword" }
    }
  }
}
```

**핵심 차이**:
| 구분 | Index Settings | Mapping Settings |
|------|----------------|------------------|
| 대상 | 인덱스 자체 | 필드 |
| 내용 | 샤드, 복제본, 분석기 | 필드 타입, 분석기 적용 |
| 변경 | 일부 동적 변경 가능 | 기존 필드 타입 변경 불가 |

**참고자료**
- [Index settings](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules.html)[^17]

</details>

[^17]: Elasticsearch 공식 문서 - Index modules

---

## 📌 Elasticsearch 성능 튜닝

### ES-017
검색 성능 튜닝을 위한 주요 고려사항은 무엇인가요?

<details>
<summary>답변</summary>

**1. 매핑 최적화**:
- 불필요한 필드 인덱싱 비활성화 (`index: false`)
- `doc_values` 비활성화 (집계/정렬 불필요 시)
- 적절한 데이터 타입 선택 (`keyword` vs `text`)

**2. 쿼리 최적화**:
- Filter Context 활용 (캐싱 이점)
- `bool` 쿼리에서 `filter` 절 적극 사용
- `size: 0`으로 집계 전용 쿼리 실행

**3. 샤드 전략**:
- 샤드 크기: 10-50GB 권장
- 노드당 샤드 수: 힙 1GB당 20개 이하
- 과도한 샤드 분산 방지

**4. 하드웨어/설정**:
- 충분한 힙 메모리 (최대 32GB, 전체 메모리의 50%)
- SSD 사용 권장
- `refresh_interval` 조정 (인덱싱 성능 vs 검색 최신성)

**5. 캐싱 활용**:
- Node Query Cache: Filter 결과 캐싱
- Shard Request Cache: 집계 결과 캐싱
- Field Data Cache: 정렬/집계용 필드 데이터

```json
// 예시: 검색 최적화된 쿼리
{
  "query": {
    "bool": {
      "filter": [
        { "term": { "status": "active" }},
        { "range": { "date": { "gte": "now-7d" }}}
      ]
    }
  }
}
```

**참고자료**
- [Tune for search speed](https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-search-speed.html)[^18]

</details>

[^18]: Elasticsearch 공식 문서 - Tune for search speed

---

## 📌 Elasticsearch 분산 시스템

### ES-018
Elasticsearch의 분산 시스템 특성과 데이터 복제 메커니즘에 대해 설명해주세요.

<details>
<summary>답변</summary>

**분산 시스템 특성**:

1. **수평 확장성**: 노드 추가로 용량과 처리량 증가
2. **고가용성**: 레플리카를 통한 장애 대응
3. **자동 샤드 밸런싱**: 클러스터 내 샤드 자동 분배
4. **분산 검색**: 모든 샤드에서 병렬 검색 후 결과 병합

**데이터 복제 메커니즘**:

1. **Primary-Replica 모델**:
   - 쓰기 요청은 Primary Shard에서 처리
   - Primary가 Replica로 복제 전파
   - 모든 Replica 복제 완료 시 응답 반환 (기본값)

2. **복제 프로세스**:
```
Client → Coordinating Node → Primary Shard → Replica Shards → Response
```

3. **일관성 설정 (`wait_for_active_shards`)**:
   - `1`: Primary만 확인 (빠름, 덜 안전)
   - `all`: 모든 복제본 확인 (느림, 안전)
   - `quorum`: 과반수 확인 (균형)

4. **장애 복구**:
   - Primary 장애 시 Replica가 자동 승격
   - 새 노드 추가 시 자동 샤드 재배치

**참고자료**
- [Reading and writing documents](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-replication.html)[^19]

</details>

[^19]: Elasticsearch 공식 문서 - Reading and writing documents

---

## 📌 Elasticsearch 모니터링

### ES-019
클러스터 상태를 모니터링하기 위한 도구와 주요 지표에는 무엇이 있나요?

<details>
<summary>답변</summary>

**모니터링 도구**:

1. **Kibana Stack Monitoring**: 시각적 대시보드 제공
2. **Cluster APIs**:
   - `GET _cluster/health`: 클러스터 상태
   - `GET _cluster/stats`: 클러스터 통계
   - `GET _nodes/stats`: 노드별 통계
3. **Cat APIs**: 사람이 읽기 쉬운 형식
   - `GET _cat/health`, `GET _cat/nodes`, `GET _cat/indices`

**주요 지표**:

| 카테고리 | 지표 | 설명 |
|---------|------|------|
| 클러스터 | status | green/yellow/red |
| | active_shards | 활성 샤드 수 |
| | unassigned_shards | 미할당 샤드 수 |
| 노드 | heap_used_percent | 힙 메모리 사용률 |
| | cpu_percent | CPU 사용률 |
| | disk_used_percent | 디스크 사용률 |
| 인덱싱 | indexing_rate | 초당 인덱싱 문서 수 |
| | refresh_time | 리프레시 소요 시간 |
| 검색 | query_latency | 쿼리 지연 시간 |
| | fetch_latency | 결과 가져오기 지연 |

**클러스터 상태**:
- **Green**: 모든 샤드 할당 완료
- **Yellow**: Primary는 할당, Replica 미할당
- **Red**: 일부 Primary 미할당

**참고자료**
- [Monitor a cluster](https://www.elastic.co/guide/en/elasticsearch/reference/current/monitor-elasticsearch-cluster.html)[^20]

</details>

[^20]: Elasticsearch 공식 문서 - Monitor a cluster

### ES-020
Replica가 부족할 때 발생할 수 있는 문제와 해결 방법은 무엇인가요?

<details>
<summary>답변</summary>

**발생 가능한 문제**:

1. **가용성 저하**: 노드 장애 시 데이터 손실 위험
2. **Yellow 상태**: Replica 미할당으로 클러스터 상태 저하
3. **검색 성능 저하**: 검색 부하 분산 불가
4. **복구 지연**: 장애 발생 시 복구 시간 증가

**원인 파악**:
```
GET _cluster/allocation/explain
GET _cat/shards?v&h=index,shard,prirep,state,unassigned.reason
```

**일반적인 원인과 해결 방법**:

| 원인 | 해결 방법 |
|------|----------|
| 노드 부족 | 노드 추가 또는 replica 수 감소 |
| 디스크 용량 부족 | 디스크 확보 또는 watermark 설정 조정 |
| 할당 필터 | allocation 설정 검토 |
| 노드 장애 | 장애 노드 복구 또는 제거 |

**해결 명령어**:
```json
// Replica 수 조정
PUT /index_name/_settings
{ "number_of_replicas": 1 }

// 샤드 재할당 재시도
POST _cluster/reroute?retry_failed=true

// Disk watermark 조정
PUT _cluster/settings
{ "transient": { "cluster.routing.allocation.disk.watermark.low": "90%" }}
```

**참고자료**
- [Cluster allocation explain](https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-allocation-explain.html)[^21]

</details>

[^21]: Elasticsearch 공식 문서 - Cluster allocation explain API

---

## 📌 Elasticsearch 노드 유형

### ES-021
Data Node, Master Node, Client Node의 역할과 차이점에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Master Node (마스터 노드)**:
- 클러스터 전체 관리 담당
- 인덱스 생성/삭제, 샤드 할당 결정
- 클러스터 상태 관리 및 전파
- 최소 3개의 master-eligible 노드 권장 (split-brain 방지)

```yaml
node.roles: [ master ]
```

**Data Node (데이터 노드)**:
- 실제 데이터 저장 및 CRUD 작업 수행
- 검색 및 집계 쿼리 실행
- CPU, 메모리, I/O 집약적 작업

```yaml
node.roles: [ data ]
```

**Coordinating Node (코디네이팅 노드)**:
- 클라이언트 요청을 받아 적절한 노드로 라우팅
- 검색 결과 병합 (scatter-gather)
- 전용 설정 시 "Client Node"라고도 불림

```yaml
node.roles: [ ]  # 빈 배열
```

**Ingest Node (인제스트 노드)**:
- 인덱싱 전 데이터 전처리 파이프라인 실행

```yaml
node.roles: [ ingest ]
```

**역할 비교**:
| 역할 | Master | Data | Coordinating |
|------|--------|------|--------------|
| 클러스터 관리 | O | X | X |
| 데이터 저장 | X | O | X |
| 쿼리 라우팅 | X | X | O |
| 리소스 요구 | 낮음 | 높음 | 중간 |

**참고자료**
- [Node roles](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-node.html)[^22]

</details>

[^22]: Elasticsearch 공식 문서 - Node roles

---

## 📌 Elasticsearch와 Kibana

### ES-022
Kibana와 Elasticsearch의 관계 및 연동 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**관계**:
Kibana는 Elasticsearch 데이터를 시각화하고 관리하는 공식 UI 도구입니다.

**주요 기능**:
- **Discover**: 데이터 탐색 및 검색
- **Visualize**: 차트, 그래프 등 시각화 생성
- **Dashboard**: 여러 시각화를 조합한 대시보드
- **Dev Tools**: Query DSL 직접 실행
- **Management**: 인덱스 패턴, 사용자 관리

**연동 방법**:

1. **기본 설정** (`kibana.yml`):
```yaml
elasticsearch.hosts: ["http://localhost:9200"]
elasticsearch.username: "kibana_system"
elasticsearch.password: "password"
```

2. **다중 노드 연결**:
```yaml
elasticsearch.hosts:
  - "http://node1:9200"
  - "http://node2:9200"
```

3. **SSL/TLS 설정**:
```yaml
elasticsearch.ssl.verificationMode: certificate
elasticsearch.ssl.certificateAuthorities: ["/path/to/ca.crt"]
```

**인덱스 패턴 생성**:
1. Kibana > Stack Management > Index Patterns
2. 패턴 입력 (예: `logs-*`)
3. 타임스탬프 필드 선택

**참고자료**
- [Kibana configuration](https://www.elastic.co/guide/en/kibana/current/settings.html)[^23]

</details>

[^23]: Kibana 공식 문서 - Configure Kibana

---

## 📌 Elasticsearch 확장성

### ES-023
Elasticsearch의 스케일링(Scale-out) 전략에는 어떤 것들이 있나요?

<details>
<summary>답변</summary>

**1. 수평 확장 (Scale-out)**:

- **노드 추가**: 새 노드 추가 시 자동으로 샤드 재분배
- **샤드 분산**: 데이터와 쿼리 부하 분산
```yaml
# 새 노드가 클러스터에 자동 합류
cluster.name: my-cluster
discovery.seed_hosts: ["node1", "node2"]
```

**2. 샤드 전략**:
- 초기 샤드 수 적절히 설정 (이후 변경 어려움)
- 샤드 크기 권장: 10-50GB
- 노드당 샤드 수: 힙 1GB당 20개 이하

**3. 인덱스 분할 전략**:
- **시간 기반 인덱스**: `logs-2024.01`, `logs-2024.02`
- **롤오버**: 조건 충족 시 새 인덱스 자동 생성
```json
POST /logs/_rollover
{ "conditions": { "max_size": "50gb", "max_age": "7d" }}
```

**4. 역할 기반 노드 분리**:
- Master, Data, Ingest, Coordinating 노드 분리
- Hot-Warm-Cold 아키텍처 적용

**5. Cross-Cluster Replication (CCR)**:
- 지역 간 데이터 복제
- 재해 복구 및 지역별 검색 성능 향상

**6. Frozen Tier**:
- 자주 접근하지 않는 데이터를 저비용 스토리지로 이동

**참고자료**
- [Scalability and resilience](https://www.elastic.co/guide/en/elasticsearch/reference/current/scalability.html)[^24]

</details>

[^24]: Elasticsearch 공식 문서 - Scalability and resilience

---

## 📌 Elasticsearch 인덱스 템플릿

### ES-024
인덱스 템플릿(Index Template)의 역할과 구성 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**역할**:
인덱스 템플릿은 새 인덱스 생성 시 자동으로 적용되는 설정과 매핑을 정의합니다. 시간 기반 인덱스나 동일한 구조의 여러 인덱스 관리에 유용합니다.

**구성 요소**:
- `index_patterns`: 템플릿이 적용될 인덱스 패턴
- `template`: settings, mappings, aliases 정의
- `priority`: 여러 템플릿 중 우선순위
- `composed_of`: 재사용 가능한 컴포넌트 템플릿

**컴포넌트 템플릿 생성**:
```json
PUT _component_template/my_mappings
{
  "template": {
    "mappings": {
      "properties": {
        "@timestamp": { "type": "date" },
        "message": { "type": "text" }
      }
    }
  }
}
```

**인덱스 템플릿 생성**:
```json
PUT _index_template/my_template
{
  "index_patterns": ["logs-*"],
  "priority": 100,
  "composed_of": ["my_mappings"],
  "template": {
    "settings": {
      "number_of_shards": 3,
      "number_of_replicas": 1
    },
    "aliases": {
      "logs_alias": {}
    }
  }
}
```

**레거시 템플릿과 차이**:
- 레거시: `_template` API (deprecated)
- 현재: `_index_template` + `_component_template`

**참고자료**
- [Index templates](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-templates.html)[^25]

</details>

[^25]: Elasticsearch 공식 문서 - Index templates

### ES-025
인덱스 롤오버(Rollover) 전략과 사용 사례에 대해 설명해주세요.

<details>
<summary>답변</summary>

**롤오버(Rollover)**는 인덱스가 특정 조건을 충족하면 자동으로 새 인덱스를 생성하고 alias를 전환하는 기능입니다.

**롤오버 조건**:
- `max_age`: 인덱스 생성 후 경과 시간
- `max_docs`: 최대 도큐먼트 수
- `max_size`: 프라이머리 샤드 최대 크기
- `max_primary_shard_size`: 개별 프라이머리 샤드 크기

**설정 방법**:

1. **초기 인덱스 및 Alias 생성**:
```json
PUT logs-000001
{
  "aliases": { "logs_write": { "is_write_index": true }}
}
```

2. **롤오버 실행**:
```json
POST logs_write/_rollover
{
  "conditions": {
    "max_age": "7d",
    "max_size": "50gb",
    "max_docs": 10000000
  }
}
```

3. **ILM과 연동** (권장):
```json
PUT _ilm/policy/logs_policy
{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": { "max_size": "50gb", "max_age": "7d" }
        }
      }
    }
  }
}
```

**사용 사례**:
- 로그 데이터 관리 (일별/주별 인덱스)
- 시계열 데이터 (메트릭, 이벤트)
- 대용량 데이터셋 분할 관리

**참고자료**
- [Rollover API](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-rollover-index.html)[^26]

</details>

[^26]: Elasticsearch 공식 문서 - Rollover API

---

## 📌 Elasticsearch Suggester

### ES-026
Suggester 기능의 동작 원리와 활용 방법은 무엇인가요?

<details>
<summary>답변</summary>

**Suggester**는 검색어 자동완성, 오타 수정, 유사어 제안 등의 기능을 제공합니다.

**Suggester 유형**:

1. **Term Suggester**: 개별 단어 오타 수정
```json
{
  "suggest": {
    "my-suggest": {
      "text": "elasticsaerch",
      "term": { "field": "title" }
    }
  }
}
```

2. **Phrase Suggester**: 전체 구문 수정 (단어 간 관계 고려)
```json
{
  "suggest": {
    "my-suggest": {
      "text": "elastc serch",
      "phrase": { "field": "title.suggest" }
    }
  }
}
```

3. **Completion Suggester**: 빠른 자동완성 (별도 데이터 구조)
```json
// 매핑
{ "properties": { "suggest": { "type": "completion" }}}

// 검색
{
  "suggest": {
    "song-suggest": {
      "prefix": "ela",
      "completion": { "field": "suggest" }
    }
  }
}
```

**동작 원리**:
- Term/Phrase: Edit distance 기반 유사도 계산
- Completion: FST(Finite State Transducer) 자료구조로 메모리에 로드하여 빠른 검색

**활용 사례**:
- 검색창 자동완성
- "이것을 찾으셨나요?" 기능
- 철자 교정

**참고자료**
- [Suggesters](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html)[^27]

</details>

[^27]: Elasticsearch 공식 문서 - Suggesters

---

## 📌 Elasticsearch 페이징

### ES-027
Scroll API와 Search After의 차이점 및 각각의 사용 시나리오는 무엇인가요?

<details>
<summary>답변</summary>

**기본 페이징 (`from` + `size`)**:
- 10,000건 제한 (`index.max_result_window`)
- 깊은 페이지에서 성능 저하

**Scroll API**:
- 대량 데이터 추출용 (export)
- 스냅샷 시점의 결과 유지
- 컨텍스트 유지로 리소스 소모

```json
// 초기 요청
POST /index/_search?scroll=5m
{ "size": 1000, "query": { "match_all": {} }}

// 이후 요청
POST /_search/scroll
{ "scroll": "5m", "scroll_id": "..." }
```

**Search After**:
- 실시간 페이징용
- 이전 결과의 정렬 값을 기준으로 다음 페이지 조회
- 무한 스크롤, 라이브 데이터에 적합

```json
// 첫 페이지
{ "size": 10, "sort": [{ "date": "asc" }, { "_id": "asc" }]}

// 다음 페이지
{
  "size": 10,
  "sort": [{ "date": "asc" }, { "_id": "asc" }],
  "search_after": ["2024-01-15", "doc_123"]
}
```

**비교**:
| 구분 | Scroll | Search After |
|------|--------|--------------|
| 용도 | 데이터 추출 | 실시간 페이징 |
| 일관성 | 스냅샷 | 실시간 |
| 리소스 | 높음 (컨텍스트 유지) | 낮음 |
| 정렬 변경 | 불가 | 가능 |
| 무작위 접근 | 불가 | 불가 |

**Point in Time (PIT)** + Search After: 일관된 스냅샷 + 효율적 페이징

**참고자료**
- [Paginate search results](https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html)[^28]

</details>

[^28]: Elasticsearch 공식 문서 - Paginate search results

---

## 📌 Elasticsearch Time-based Index

### ES-028
Time-based index의 개념과 활용 방안에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Time-based Index**는 시간을 기준으로 분할된 인덱스로, 시계열 데이터 관리에 최적화되어 있습니다.

**구조 예시**:
```
logs-2024.01.01
logs-2024.01.02
logs-2024.01.03
```

**장점**:
1. **효율적인 삭제**: 오래된 인덱스 전체 삭제 (도큐먼트 삭제보다 빠름)
2. **검색 범위 제한**: 특정 기간만 검색하여 성능 향상
3. **Hot-Warm-Cold 적용**: 시간에 따른 스토리지 티어링
4. **샤드 크기 관리**: 예측 가능한 인덱스 크기

**활용 방안**:

1. **인덱스 템플릿 + 롤오버**:
```json
PUT _index_template/logs_template
{
  "index_patterns": ["logs-*"],
  "template": {
    "settings": { "number_of_shards": 1 }
  }
}
```

2. **ILM 정책 연동**:
```json
PUT _ilm/policy/logs_policy
{
  "policy": {
    "phases": {
      "hot": { "actions": { "rollover": { "max_age": "1d" }}},
      "delete": { "min_age": "30d", "actions": { "delete": {} }}
    }
  }
}
```

3. **Alias를 통한 검색**:
```json
// 최근 7일 검색
GET logs-*/_search
{ "query": { "range": { "@timestamp": { "gte": "now-7d" }}}}
```

**참고자료**
- [Data streams](https://www.elastic.co/guide/en/elasticsearch/reference/current/data-streams.html)[^29]

</details>

[^29]: Elasticsearch 공식 문서 - Data streams

---

## 📌 Elasticsearch 데이터 삭제

### ES-029
데이터 삭제 시 발생할 수 있는 이슈와 그 해결 방법은 무엇인가요?

<details>
<summary>답변</summary>

**삭제 방식**:
1. **Document Delete**: `DELETE /index/_doc/id`
2. **Delete by Query**: `POST /index/_delete_by_query`
3. **Index Delete**: `DELETE /index`

**발생 가능한 이슈**:

1. **성능 저하**:
   - Delete by Query는 내부적으로 검색 + 삭제 수행
   - 대량 삭제 시 클러스터 부하 증가
   - **해결**: `scroll_size`, `slices` 파라미터로 조절
   ```json
   POST /index/_delete_by_query?scroll_size=1000&slices=auto
   ```

2. **디스크 공간 미해제**:
   - 삭제된 문서는 세그먼트에 "삭제 표시"만 됨
   - 실제 공간은 세그먼트 병합 시 회수
   - **해결**: Force Merge 실행
   ```json
   POST /index/_forcemerge?only_expunge_deletes=true
   ```

3. **버전 충돌**:
   - 삭제 중 해당 문서 업데이트 시 충돌
   - **해결**: `conflicts=proceed` 옵션
   ```json
   POST /index/_delete_by_query?conflicts=proceed
   ```

4. **인덱스 전체 삭제 실수**:
   - **예방**: `action.destructive_requires_name: true` 설정
   - 와일드카드 삭제 방지

**권장 사항**:
- 대량 삭제: Time-based Index + 인덱스 삭제
- 개별 삭제: Document Delete API
- 조건 삭제: Delete by Query (off-peak 시간)

**참고자료**
- [Delete by query API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete-by-query.html)[^30]

</details>

[^30]: Elasticsearch 공식 문서 - Delete by query API

---

## 📌 Elasticsearch 백업

### ES-030
Snapshot과 Restore 기능을 통한 백업 전략에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Snapshot**은 클러스터 또는 특정 인덱스의 백업을 생성하는 기능입니다.

**Repository 설정**:
```json
PUT _snapshot/my_backup
{
  "type": "fs",
  "settings": {
    "location": "/mount/backups/my_backup"
  }
}
```

지원 저장소: 파일시스템, S3, GCS, Azure Blob, HDFS

**스냅샷 생성**:
```json
PUT _snapshot/my_backup/snapshot_1
{
  "indices": "logs-*",
  "ignore_unavailable": true,
  "include_global_state": false
}
```

**복원**:
```json
POST _snapshot/my_backup/snapshot_1/_restore
{
  "indices": "logs-2024.01.*",
  "rename_pattern": "logs-(.+)",
  "rename_replacement": "restored_logs-$1"
}
```

**백업 전략**:

1. **증분 백업**: 스냅샷은 자동으로 증분 방식 (변경분만 저장)
2. **스케줄링**: SLM(Snapshot Lifecycle Management) 사용
```json
PUT _slm/policy/daily_snapshots
{
  "schedule": "0 30 1 * * ?",
  "name": "<daily-snap-{now/d}>",
  "repository": "my_backup",
  "config": { "indices": ["*"] },
  "retention": { "expire_after": "30d", "min_count": 5 }
}
```

3. **권장 사항**:
   - 정기적인 전체 클러스터 스냅샷
   - 중요 인덱스는 별도 스냅샷
   - 복원 테스트 주기적 수행

**참고자료**
- [Snapshot and restore](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html)[^31]

</details>

[^31]: Elasticsearch 공식 문서 - Snapshot and restore

---

## 📌 Elasticsearch 트랜잭션

### ES-031
분산 트랜잭션과 관련하여 Elasticsearch는 어떤 접근 방식을 취하나요?

<details>
<summary>답변</summary>

**Elasticsearch의 트랜잭션 특성**:

Elasticsearch는 **ACID 트랜잭션을 지원하지 않습니다**. 대신 다음과 같은 접근 방식을 취합니다:

**1. 단일 문서 수준 원자성**:
- 개별 문서의 인덱싱, 업데이트, 삭제는 원자적
- 하나의 문서 작업은 완전히 성공하거나 실패

**2. Optimistic Concurrency Control**:
- `_version` 또는 `if_seq_no` + `if_primary_term`으로 동시성 제어
```json
PUT /index/_doc/1?if_seq_no=10&if_primary_term=1
{ "field": "value" }
```

**3. Eventual Consistency**:
- Primary 복제 후 Replica에 비동기 전파
- `refresh_interval` 후 검색 가능
- 즉각적인 일관성이 필요하면 `?refresh=true`

**4. Bulk 작업**:
- 개별 작업은 독립적으로 성공/실패
- 전체 롤백 없음 (부분 실패 가능)

**RDBMS 트랜잭션이 필요한 경우**:
- 애플리케이션 레벨에서 보상 트랜잭션 구현
- RDBMS를 Source of Truth로, ES는 검색용으로 분리
- 2PC(Two-Phase Commit) 패턴 직접 구현

**참고자료**
- [Reading and writing documents](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-replication.html)[^32]

</details>

[^32]: Elasticsearch 공식 문서 - Reading and writing documents

---

## 📌 Elasticsearch 버전 업그레이드

### ES-032
Elasticsearch 버전 업그레이드 시 고려해야 할 사항은 무엇인가요?

<details>
<summary>답변</summary>

**업그레이드 전 확인사항**:

1. **호환성 검토**:
   - 지원 업그레이드 경로 확인 (예: 7.x → 8.x)
   - Breaking Changes 문서 검토
   - 플러그인, 클라이언트 라이브러리 호환성

2. **Deprecation 확인**:
```
GET _migration/deprecations
```

3. **백업 필수**:
```json
PUT _snapshot/backup/pre_upgrade_snapshot
```

**업그레이드 방식**:

| 방식 | 설명 | 다운타임 |
|------|------|---------|
| Rolling Upgrade | 노드별 순차 업그레이드 | 없음 |
| Full Cluster Restart | 전체 클러스터 중지 후 업그레이드 | 있음 |
| Reindex from Remote | 새 클러스터로 데이터 마이그레이션 | 없음 |

**Rolling Upgrade 절차**:
1. 샤드 할당 비활성화
```json
PUT _cluster/settings
{ "persistent": { "cluster.routing.allocation.enable": "primaries" }}
```
2. 동기화 플러시 실행
3. 노드 중지 → 업그레이드 → 재시작
4. 클러스터 green 상태 확인
5. 다음 노드 반복

**주의사항**:
- 인덱스 호환성 (N-1 버전까지만 지원)
- 매핑/설정 변경사항 확인
- 충분한 테스트 환경에서 사전 검증

**참고자료**
- [Upgrade Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html)[^33]

</details>

[^33]: Elasticsearch 공식 문서 - Upgrade Elasticsearch

---

## 📌 Elasticsearch ILM

### ES-033
Index Lifecycle Management(ILM)의 기능과 필요성에 대해 설명해주세요.

<details>
<summary>답변</summary>

**ILM(Index Lifecycle Management)**은 인덱스의 생명주기를 자동으로 관리하는 기능입니다.

**필요성**:
- 시간에 따른 데이터 접근 패턴 변화 대응
- 스토리지 비용 최적화
- 수동 관리 작업 자동화
- 데이터 보존 정책 일관성 유지

**생명주기 단계 (Phases)**:

| 단계 | 설명 | 주요 액션 |
|------|------|----------|
| **Hot** | 활발한 쓰기/읽기 | rollover, set_priority |
| **Warm** | 읽기 전용, 덜 빈번한 접근 | shrink, forcemerge, readonly |
| **Cold** | 드문 검색, 저비용 스토리지 | searchable_snapshot |
| **Frozen** | 거의 접근 없음 | partial searchable_snapshot |
| **Delete** | 삭제 | delete |

**정책 예시**:
```json
PUT _ilm/policy/logs_policy
{
  "policy": {
    "phases": {
      "hot": {
        "min_age": "0ms",
        "actions": {
          "rollover": { "max_size": "50gb", "max_age": "1d" },
          "set_priority": { "priority": 100 }
        }
      },
      "warm": {
        "min_age": "7d",
        "actions": {
          "shrink": { "number_of_shards": 1 },
          "forcemerge": { "max_num_segments": 1 }
        }
      },
      "delete": {
        "min_age": "30d",
        "actions": { "delete": {} }
      }
    }
  }
}
```

**인덱스에 정책 적용**:
```json
PUT /logs-000001
{
  "settings": {
    "index.lifecycle.name": "logs_policy",
    "index.lifecycle.rollover_alias": "logs"
  }
}
```

**참고자료**
- [ILM: Manage the index lifecycle](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-lifecycle-management.html)[^34]

</details>

[^34]: Elasticsearch 공식 문서 - Index lifecycle management

---

## 📌 Elasticsearch 데이터 수집

### ES-034
Logstash, Beats 등과의 연동을 통한 데이터 수집 및 처리 방식에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Elastic Stack 데이터 수집 컴포넌트**:

**1. Beats (경량 데이터 수집기)**:
- **Filebeat**: 로그 파일 수집
- **Metricbeat**: 시스템/서비스 메트릭
- **Packetbeat**: 네트워크 패킷 분석
- **Heartbeat**: 업타임 모니터링
- **Auditbeat**: 감사 데이터

```yaml
# filebeat.yml
filebeat.inputs:
  - type: log
    paths: ["/var/log/*.log"]
output.elasticsearch:
  hosts: ["localhost:9200"]
```

**2. Logstash (데이터 처리 파이프라인)**:
- Input → Filter → Output 구조
- 복잡한 데이터 변환, 정제, 보강

```ruby
input { beats { port => 5044 }}
filter {
  grok { match => { "message" => "%{COMBINEDAPACHELOG}" }}
  date { match => ["timestamp", "dd/MMM/yyyy:HH:mm:ss Z"] }
}
output { elasticsearch { hosts => ["localhost:9200"] }}
```

**3. Ingest Pipeline (ES 내장)**:
- 인덱싱 전 경량 데이터 처리
- Logstash 없이 간단한 변환 수행

```json
PUT _ingest/pipeline/my_pipeline
{
  "processors": [
    { "grok": { "field": "message", "patterns": ["%{IP:client}"] }},
    { "set": { "field": "processed_at", "value": "{{_ingest.timestamp}}" }}
  ]
}
```

**아키텍처 패턴**:
- 간단: Beats → Elasticsearch
- 표준: Beats → Logstash → Elasticsearch
- 버퍼: Beats → Kafka → Logstash → Elasticsearch

**참고자료**
- [Ingest pipelines](https://www.elastic.co/guide/en/elasticsearch/reference/current/ingest.html)[^35]

</details>

[^35]: Elasticsearch 공식 문서 - Ingest pipelines

---

## 📌 Elasticsearch 보안

### ES-035
Elasticsearch의 보안 기능(예: X-Pack Security)과 설정 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Elasticsearch Security** (기본 라이선스에 포함)는 클러스터 보안을 위한 핵심 기능을 제공합니다.

**주요 보안 기능**:

1. **인증 (Authentication)**:
   - Native realm (내장 사용자)
   - LDAP, Active Directory
   - SAML, OpenID Connect
   - API Key, Token

2. **권한 부여 (Authorization)**:
   - Role-Based Access Control (RBAC)
   - 인덱스, 문서, 필드 수준 권한

3. **암호화**:
   - TLS/SSL (노드 간, 클라이언트-클러스터)
   - 저장 데이터 암호화

**기본 설정** (`elasticsearch.yml`):
```yaml
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true
xpack.security.http.ssl.enabled: true
```

**사용자 생성**:
```json
POST _security/user/my_user
{
  "password": "secure_password",
  "roles": ["my_role"],
  "full_name": "My User"
}
```

**역할 생성**:
```json
POST _security/role/my_role
{
  "cluster": ["monitor"],
  "indices": [{
    "names": ["logs-*"],
    "privileges": ["read", "view_index_metadata"]
  }]
}
```

**API Key 생성**:
```json
POST _security/api_key
{
  "name": "my-api-key",
  "expiration": "30d",
  "role_descriptors": { "logs_reader": { "indices": [{ "names": ["logs-*"], "privileges": ["read"] }]}}
}
```

**참고자료**
- [Secure the Elastic Stack](https://www.elastic.co/guide/en/elasticsearch/reference/current/secure-cluster.html)[^36]

</details>

[^36]: Elasticsearch 공식 문서 - Secure the Elastic Stack

### ES-036
Role-Based Access Control(RBAC)과 Document Level Security의 차이에 대해 설명해주세요.

<details>
<summary>답변</summary>

**RBAC (Role-Based Access Control)**:
역할 기반으로 클러스터, 인덱스, 필드 수준의 접근 권한을 제어합니다.

```json
PUT _security/role/logs_admin
{
  "cluster": ["manage_index_templates"],
  "indices": [{
    "names": ["logs-*"],
    "privileges": ["all"]
  }]
}
```

**Document Level Security (DLS)**:
역할 내에서 특정 조건에 맞는 문서만 접근할 수 있도록 제한합니다.

```json
PUT _security/role/team_a_viewer
{
  "indices": [{
    "names": ["projects-*"],
    "privileges": ["read"],
    "query": {
      "term": { "team": "team_a" }
    }
  }]
}
```
→ `team: team_a`인 문서만 조회 가능

**Field Level Security (FLS)**:
특정 필드만 접근 가능하도록 제한합니다.

```json
PUT _security/role/public_viewer
{
  "indices": [{
    "names": ["users-*"],
    "privileges": ["read"],
    "field_security": {
      "grant": ["name", "email"],
      "except": ["password", "ssn"]
    }
  }]
}
```

**비교**:

| 구분 | RBAC | DLS | FLS |
|------|------|-----|-----|
| 제어 수준 | 클러스터/인덱스 | 문서 | 필드 |
| 적용 방식 | privileges | query | field_security |
| 사용 사례 | 기본 권한 관리 | 멀티테넌시 | 민감정보 보호 |

**참고자료**
- [Document level security](https://www.elastic.co/guide/en/elasticsearch/reference/current/document-level-security.html)[^37]
- [Field level security](https://www.elastic.co/guide/en/elasticsearch/reference/current/field-level-security.html)[^38]

</details>

[^37]: Elasticsearch 공식 문서 - Document level security
[^38]: Elasticsearch 공식 문서 - Field level security

---

## 📌 Elasticsearch 커스텀 분석기

### ES-037
커스텀 분석기(Custom Analyzer)를 생성하고 적용하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**커스텀 분석기**는 Character Filter, Tokenizer, Token Filter를 조합하여 만듭니다.

**생성 방법**:
```json
PUT /my_index
{
  "settings": {
    "analysis": {
      "char_filter": {
        "my_char_filter": {
          "type": "mapping",
          "mappings": ["& => and", "| => or"]
        }
      },
      "tokenizer": {
        "my_tokenizer": {
          "type": "pattern",
          "pattern": "[\\W_]+"
        }
      },
      "filter": {
        "my_stopwords": {
          "type": "stop",
          "stopwords": ["the", "a", "an"]
        }
      },
      "analyzer": {
        "my_custom_analyzer": {
          "type": "custom",
          "char_filter": ["my_char_filter"],
          "tokenizer": "my_tokenizer",
          "filter": ["lowercase", "my_stopwords", "snowball"]
        }
      }
    }
  }
}
```

**매핑에 적용**:
```json
{
  "mappings": {
    "properties": {
      "content": {
        "type": "text",
        "analyzer": "my_custom_analyzer",
        "search_analyzer": "standard"
      }
    }
  }
}
```

**분석 테스트**:
```json
POST /my_index/_analyze
{
  "analyzer": "my_custom_analyzer",
  "text": "The Quick & Brown Fox"
}
// 결과: ["quick", "and", "brown", "fox"]
```

**한글 분석기 예시 (nori)**:
```json
{
  "analysis": {
    "analyzer": {
      "korean_analyzer": {
        "type": "custom",
        "tokenizer": "nori_tokenizer",
        "filter": ["nori_part_of_speech"]
      }
    }
  }
}
```

**참고자료**
- [Create a custom analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-custom-analyzer.html)[^39]

</details>

[^39]: Elasticsearch 공식 문서 - Create a custom analyzer

---

## 📌 Elasticsearch 멀티테넌시

### ES-038
멀티테넌시를 지원하기 위한 Elasticsearch의 접근 방식은 무엇인가요?

<details>
<summary>답변</summary>

**멀티테넌시**는 여러 테넌트(사용자/조직)가 동일한 Elasticsearch 클러스터를 공유하면서 데이터를 격리하는 방식입니다.

**접근 방식**:

**1. 테넌트별 인덱스**:
```
tenant_a_logs
tenant_b_logs
tenant_c_logs
```
- 장점: 완전한 격리, 독립적 매핑/설정
- 단점: 인덱스 수 증가, 관리 복잡성

**2. 테넌트 필드 + DLS**:
```json
// 단일 인덱스에 tenant_id 필드
{ "tenant_id": "tenant_a", "data": "..." }

// DLS로 접근 제어
PUT _security/role/tenant_a_role
{
  "indices": [{
    "names": ["shared_logs"],
    "privileges": ["read"],
    "query": { "term": { "tenant_id": "tenant_a" }}
  }]
}
```
- 장점: 인덱스 관리 단순화
- 단점: 잘못된 쿼리로 데이터 노출 위험

**3. 인덱스 Alias + 필터**:
```json
POST _aliases
{
  "actions": [{
    "add": {
      "index": "logs",
      "alias": "tenant_a_logs",
      "filter": { "term": { "tenant_id": "tenant_a" }}
    }
  }]
}
```

**4. 별도 클러스터**:
- 장점: 완전한 격리, 성능 영향 없음
- 단점: 운영 비용 증가

**선택 기준**:
| 요구사항 | 권장 방식 |
|---------|----------|
| 강력한 격리 | 별도 클러스터 |
| 많은 테넌트 | DLS + 단일 인덱스 |
| 독립적 설정 필요 | 테넌트별 인덱스 |

**참고자료**
- [Document level security](https://www.elastic.co/guide/en/elasticsearch/reference/current/document-level-security.html)[^40]

</details>

[^40]: Elasticsearch 공식 문서 - Document level security

---

## 📌 Elasticsearch Bulk API

### ES-039
Bulk API 사용 시 성능 최적화 및 주의사항은 무엇인가요?

<details>
<summary>답변</summary>

**Bulk API**는 여러 인덱싱/삭제/업데이트 작업을 단일 요청으로 처리합니다.

**기본 구조**:
```json
POST _bulk
{ "index": { "_index": "logs", "_id": "1" }}
{ "field1": "value1" }
{ "delete": { "_index": "logs", "_id": "2" }}
{ "update": { "_index": "logs", "_id": "3" }}
{ "doc": { "field2": "value2" }}
```

**성능 최적화**:

1. **적절한 배치 크기**:
   - 권장: 5-15MB per request
   - 문서 수보다 바이트 크기 기준
   - 테스트로 최적값 찾기

2. **병렬 처리**:
   - 여러 스레드에서 동시 Bulk 요청
   - 노드 수 × 2 정도의 병렬 요청

3. **Refresh 비활성화**:
```json
PUT /logs/_settings
{ "refresh_interval": "-1" }
// 벌크 완료 후
PUT /logs/_settings
{ "refresh_interval": "1s" }
```

4. **Replica 비활성화** (초기 로딩 시):
```json
PUT /logs/_settings
{ "number_of_replicas": 0 }
```

**주의사항**:

- **응답 확인**: 부분 실패 가능, `errors: true` 체크
```json
{
  "errors": true,
  "items": [
    { "index": { "status": 201 }},
    { "index": { "status": 400, "error": {...} }}
  ]
}
```

- **재시도 로직**: 429 (Too Many Requests) 시 백오프

- **메모리 관리**: 너무 큰 배치는 OOM 위험

- **순서 보장**: 동일 문서 작업은 순서대로 처리

**참고자료**
- [Bulk API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html)[^41]

</details>

[^41]: Elasticsearch 공식 문서 - Bulk API

---

## 📌 Elasticsearch 성능 지표

### ES-040
Latency와 Throughput 튜닝을 위한 Elasticsearch 설정 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Latency (지연시간)** 최적화:

1. **검색 성능**:
```json
// Filter Context 활용 (캐싱)
{ "bool": { "filter": [{ "term": { "status": "active" }}]}}

// 불필요한 필드 제외
{ "_source": ["title", "date"], "query": {...} }

// 라우팅으로 샤드 접근 최소화
GET /logs/_search?routing=user_123
```

2. **힙 메모리 설정**:
```yaml
# jvm.options
-Xms16g
-Xmx16g  # 전체 메모리의 50%, 최대 32GB
```

3. **Thread Pool 조정**:
```yaml
thread_pool.search.size: 13
thread_pool.search.queue_size: 1000
```

**Throughput (처리량)** 최적화:

1. **인덱싱 성능**:
```json
PUT /logs/_settings
{
  "refresh_interval": "30s",  // 기본 1s
  "translog.durability": "async",
  "translog.sync_interval": "30s"
}
```

2. **Bulk 처리**:
   - 적절한 배치 크기 (5-15MB)
   - 병렬 요청 활용

3. **Merge 설정**:
```json
{
  "index.merge.scheduler.max_thread_count": 1  // HDD인 경우
}
```

**모니터링 지표**:
| 지표 | 확인 방법 |
|------|----------|
| 검색 지연 | `_nodes/stats/indices/search` |
| 인덱싱 속도 | `_nodes/stats/indices/indexing` |
| GC 시간 | `_nodes/stats/jvm` |
| 큐 대기 | `_nodes/stats/thread_pool` |

**참고자료**
- [Tune for indexing speed](https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-indexing-speed.html)[^42]

</details>

[^42]: Elasticsearch 공식 문서 - Tune for indexing speed

---

## 📌 Elasticsearch 복잡한 검색

### ES-041
복잡한 검색 조건을 구현하기 위한 Query DSL 활용 사례를 설명해주세요.

<details>
<summary>답변</summary>

**복합 검색 예시**:

**1. 다중 조건 검색** (AND, OR, NOT 조합):
```json
{
  "query": {
    "bool": {
      "must": [
        { "match": { "title": "elasticsearch" }},
        { "range": { "price": { "gte": 10, "lte": 100 }}}
      ],
      "should": [
        { "term": { "featured": true }},
        { "match": { "category": "technology" }}
      ],
      "must_not": [
        { "term": { "status": "deleted" }}
      ],
      "filter": [
        { "term": { "available": true }}
      ],
      "minimum_should_match": 1
    }
  }
}
```

**2. Nested 객체 검색**:
```json
{
  "query": {
    "nested": {
      "path": "comments",
      "query": {
        "bool": {
          "must": [
            { "match": { "comments.author": "kim" }},
            { "range": { "comments.date": { "gte": "2024-01-01" }}}
          ]
        }
      }
    }
  }
}
```

**3. 다중 필드 + 가중치**:
```json
{
  "query": {
    "multi_match": {
      "query": "elasticsearch guide",
      "fields": ["title^3", "content", "tags^2"],
      "type": "best_fields",
      "tie_breaker": 0.3
    }
  }
}
```

**4. Function Score** (커스텀 점수):
```json
{
  "query": {
    "function_score": {
      "query": { "match": { "content": "elasticsearch" }},
      "functions": [
        { "filter": { "term": { "featured": true }}, "weight": 10 },
        { "gauss": { "date": { "origin": "now", "scale": "30d" }}},
        { "field_value_factor": { "field": "popularity", "modifier": "log1p" }}
      ],
      "score_mode": "sum",
      "boost_mode": "multiply"
    }
  }
}
```

**5. Aggregation + 필터**:
```json
{
  "query": { "match": { "category": "electronics" }},
  "aggs": {
    "price_ranges": {
      "range": { "field": "price", "ranges": [{ "to": 100 }, { "from": 100, "to": 500 }, { "from": 500 }]}
    },
    "avg_rating": { "avg": { "field": "rating" }}
  }
}
```

**참고자료**
- [Compound queries](https://www.elastic.co/guide/en/elasticsearch/reference/current/compound-queries.html)[^43]

</details>

[^43]: Elasticsearch 공식 문서 - Compound queries

---

## 📌 Elasticsearch Reindex

### ES-042
Reindex API의 사용 목적과 동작 방식에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Reindex API**는 한 인덱스의 데이터를 다른 인덱스로 복사합니다.

**사용 목적**:
- 매핑 변경 (기존 필드 타입 변경 불가하므로)
- 샤드 수 변경
- 분석기 변경
- 인덱스 분할/병합
- 데이터 마이그레이션

**기본 사용법**:
```json
POST _reindex
{
  "source": { "index": "old_index" },
  "dest": { "index": "new_index" }
}
```

**고급 옵션**:

**1. 선택적 복사** (쿼리 적용):
```json
POST _reindex
{
  "source": {
    "index": "logs",
    "query": { "range": { "date": { "gte": "2024-01-01" }}}
  },
  "dest": { "index": "logs_2024" }
}
```

**2. 필드 변환** (스크립트):
```json
POST _reindex
{
  "source": { "index": "old_index" },
  "dest": { "index": "new_index" },
  "script": {
    "source": "ctx._source.status = ctx._source.remove('old_status')"
  }
}
```

**3. 원격 클러스터에서 복사**:
```json
POST _reindex
{
  "source": {
    "remote": { "host": "http://remote:9200" },
    "index": "remote_index"
  },
  "dest": { "index": "local_index" }
}
```

**4. 비동기 실행**:
```json
POST _reindex?wait_for_completion=false
// Task API로 진행 상황 확인
GET _tasks/task_id
```

**성능 최적화**:
- `slices: auto` - 병렬 처리
- `refresh: false` - 완료 후 수동 refresh
- `requests_per_second` - 스로틀링

**참고자료**
- [Reindex API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html)[^44]

</details>

[^44]: Elasticsearch 공식 문서 - Reindex API

---

## 📌 Elasticsearch Snapshot Repository

### ES-043
Snapshot Repository 구성 및 관리 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Snapshot Repository**는 스냅샷을 저장하는 위치입니다.

**지원 저장소 유형**:
- Shared File System (`fs`)
- AWS S3 (`s3`)
- Google Cloud Storage (`gcs`)
- Azure Blob Storage (`azure`)
- HDFS (`hdfs`)

**파일시스템 Repository 구성**:

1. **경로 설정** (`elasticsearch.yml`):
```yaml
path.repo: ["/mount/backups"]
```

2. **Repository 생성**:
```json
PUT _snapshot/my_backup
{
  "type": "fs",
  "settings": {
    "location": "/mount/backups/my_backup",
    "compress": true
  }
}
```

**S3 Repository 구성**:
```json
PUT _snapshot/s3_backup
{
  "type": "s3",
  "settings": {
    "bucket": "my-bucket",
    "region": "ap-northeast-2",
    "base_path": "elasticsearch/snapshots"
  }
}
```

**관리 작업**:

**Repository 확인**:
```
GET _snapshot/_all
GET _snapshot/my_backup
```

**Repository 검증**:
```
POST _snapshot/my_backup/_verify
```

**스냅샷 목록**:
```
GET _snapshot/my_backup/_all
```

**스냅샷 상태**:
```
GET _snapshot/my_backup/snapshot_1/_status
```

**Repository 삭제**:
```
DELETE _snapshot/my_backup
```

**주의사항**:
- 여러 클러스터가 같은 repository 공유 시 읽기 전용 설정 필요
- Repository 삭제 전 스냅샷 먼저 삭제
- 충분한 저장 공간 확보

**참고자료**
- [Register a snapshot repository](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshots-register-repository.html)[^45]

</details>

[^45]: Elasticsearch 공식 문서 - Register a snapshot repository

---

## 📌 Elasticsearch 일관성

### ES-044
데이터 정합성(consistency) 모델과 Elasticsearch의 eventual consistency 특성에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Elasticsearch의 일관성 모델**:

Elasticsearch는 **Eventual Consistency (최종 일관성)** 모델을 따릅니다.

**쓰기 일관성**:

1. **Primary-Replica 복제**:
   - 쓰기는 Primary Shard에서 먼저 처리
   - 이후 Replica에 복제
   - 기본적으로 모든 in-sync replica 복제 완료 후 응답

2. **wait_for_active_shards 설정**:
```json
PUT /logs/_doc/1?wait_for_active_shards=2
{ "message": "test" }
```
   - `1`: Primary만
   - `all`: 모든 복제본
   - 숫자: 지정된 수의 샤드

**읽기 일관성**:

1. **Refresh 간격**:
   - 기본 1초마다 refresh
   - refresh 전에는 새 데이터 검색 불가

2. **실시간 읽기**:
```json
// 즉시 refresh 후 검색 가능
PUT /logs/_doc/1?refresh=true

// GET API는 translog에서 읽어 실시간
GET /logs/_doc/1
```

**일관성 보장 수준**:

| 작업 | 일관성 |
|------|--------|
| GET (by ID) | 강한 일관성 |
| Search | Eventual (refresh 후) |
| Write | 설정에 따라 조절 가능 |

**Eventual Consistency 영향**:
- 쓰기 직후 검색 시 결과에 포함 안 될 수 있음
- Read-after-Write 보장 필요 시 `refresh=true` 사용

**ACID와의 비교**:
- Elasticsearch는 단일 문서 수준의 원자성만 보장
- 다중 문서 트랜잭션 미지원
- 분산 환경에서 가용성과 성능 우선

**참고자료**
- [Near real-time search](https://www.elastic.co/guide/en/elasticsearch/reference/current/near-real-time.html)[^46]

</details>

[^46]: Elasticsearch 공식 문서 - Near real-time search

---

## 📌 Elasticsearch 최적화

### ES-045
인덱스 및 도큐먼트 크기 최적화를 위한 전략은 무엇인가요?

<details>
<summary>답변</summary>

**인덱스 크기 최적화**:

**1. 불필요한 필드 제거**:
```json
{
  "mappings": {
    "properties": {
      "content": {
        "type": "text",
        "index": false  // 검색 불필요 시
      },
      "metadata": {
        "type": "object",
        "enabled": false  // 인덱싱/검색 불필요 시
      }
    }
  }
}
```

**2. doc_values 비활성화** (정렬/집계 불필요 시):
```json
{
  "properties": {
    "description": { "type": "text", "doc_values": false }
  }
}
```

**3. _source 필드 관리**:
```json
{
  "mappings": {
    "_source": {
      "excludes": ["large_field", "internal_*"]
    }
  }
}
```

**4. 적절한 데이터 타입**:
- `keyword` vs `text` 선택
- `integer` vs `long` vs `short`
- `scaled_float` 사용 (정밀도 조절)

**도큐먼트 크기 최적화**:

**1. 정규화 vs 비정규화**:
- 자주 변경되는 데이터: 정규화 (별도 인덱스)
- 검색 성능 중요: 비정규화 (임베딩)

**2. 배열 크기 제한**:
```json
{ "index.mapping.total_fields.limit": 1000 }
```

**3. Nested 객체 제한**:
- 과도한 nested 객체는 성능 저하
- 가능하면 flattened 타입 고려

**Force Merge**:
```json
POST /logs/_forcemerge?max_num_segments=1
```
- 읽기 전용 인덱스에 적용
- 세그먼트 수 감소로 검색 성능 향상

**참고자료**
- [Tune for disk usage](https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-disk-usage.html)[^47]

</details>

[^47]: Elasticsearch 공식 문서 - Tune for disk usage

---

## 📌 Elasticsearch 파이프라인

### ES-046
파이프라인(pipeline) 처리 기능과 Ingest Node의 역할에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Ingest Pipeline**은 인덱싱 전 데이터를 변환, 보강, 정제하는 기능입니다.

**Ingest Node 역할**:
- 파이프라인 프로세서 실행
- 인덱싱 전 데이터 전처리
- Logstash 대체 가능 (간단한 변환)

**파이프라인 구성요소**:
- **Processors**: 데이터 변환 단위
- **on_failure**: 오류 처리

**파이프라인 생성**:
```json
PUT _ingest/pipeline/my_pipeline
{
  "description": "My processing pipeline",
  "processors": [
    {
      "grok": {
        "field": "message",
        "patterns": ["%{IP:client_ip} %{WORD:method} %{URIPATHPARAM:request}"]
      }
    },
    {
      "date": {
        "field": "timestamp",
        "formats": ["ISO8601", "yyyy-MM-dd HH:mm:ss"]
      }
    },
    {
      "set": {
        "field": "processed_at",
        "value": "{{_ingest.timestamp}}"
      }
    },
    {
      "remove": {
        "field": "temp_field",
        "ignore_missing": true
      }
    }
  ],
  "on_failure": [
    {
      "set": {
        "field": "error",
        "value": "{{ _ingest.on_failure_message }}"
      }
    }
  ]
}
```

**주요 프로세서**:
| 프로세서 | 기능 |
|---------|------|
| grok | 정규식 패턴 추출 |
| date | 날짜 파싱 |
| set | 필드 값 설정 |
| remove | 필드 삭제 |
| rename | 필드명 변경 |
| convert | 타입 변환 |
| script | 커스텀 스크립트 |
| enrich | 외부 데이터 보강 |

**파이프라인 적용**:
```json
// 인덱싱 시 지정
PUT /logs/_doc/1?pipeline=my_pipeline
{ "message": "192.168.1.1 GET /index.html" }

// 인덱스 기본 파이프라인
PUT /logs/_settings
{ "index.default_pipeline": "my_pipeline" }
```

**참고자료**
- [Ingest pipelines](https://www.elastic.co/guide/en/elasticsearch/reference/current/ingest.html)[^48]

</details>

[^48]: Elasticsearch 공식 문서 - Ingest pipelines

---

## 📌 Elasticsearch Hot-Warm-Cold

### ES-047
Hot-Warm-Cold 아키텍처의 개념과 구현 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Hot-Warm-Cold 아키텍처**는 데이터 접근 패턴에 따라 스토리지 티어를 분리하여 비용과 성능을 최적화합니다.

**티어별 특성**:

| 티어 | 데이터 특성 | 하드웨어 | 접근 빈도 |
|------|-----------|---------|----------|
| **Hot** | 최신, 활발한 쓰기/읽기 | SSD, 고성능 | 높음 |
| **Warm** | 과거, 읽기 전용 | HDD, 중간 | 중간 |
| **Cold** | 오래된, 드문 접근 | 대용량 HDD | 낮음 |
| **Frozen** | 아카이브 | 오브젝트 스토리지 | 매우 낮음 |

**구현 방법**:

**1. 노드 역할 설정** (`elasticsearch.yml`):
```yaml
# Hot node
node.roles: [ data_hot ]

# Warm node
node.roles: [ data_warm ]

# Cold node
node.roles: [ data_cold ]
```

**2. ILM 정책 설정**:
```json
PUT _ilm/policy/hot_warm_cold_policy
{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": { "max_size": "50gb", "max_age": "1d" },
          "set_priority": { "priority": 100 }
        }
      },
      "warm": {
        "min_age": "7d",
        "actions": {
          "shrink": { "number_of_shards": 1 },
          "forcemerge": { "max_num_segments": 1 },
          "allocate": { "require": { "data": "warm" }},
          "set_priority": { "priority": 50 }
        }
      },
      "cold": {
        "min_age": "30d",
        "actions": {
          "allocate": { "require": { "data": "cold" }},
          "set_priority": { "priority": 0 }
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

**3. 인덱스 템플릿 연결**:
```json
PUT _index_template/logs_template
{
  "index_patterns": ["logs-*"],
  "template": {
    "settings": {
      "index.lifecycle.name": "hot_warm_cold_policy",
      "index.lifecycle.rollover_alias": "logs"
    }
  }
}
```

**참고자료**
- [Data tiers](https://www.elastic.co/guide/en/elasticsearch/reference/current/data-tiers.html)[^49]

</details>

[^49]: Elasticsearch 공식 문서 - Data tiers

---

## 📌 Elasticsearch 스크립팅

### ES-048
커스텀 스크립팅의 활용과 성능에 미치는 영향에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Painless**는 Elasticsearch의 기본 스크립팅 언어로, 안전하고 빠른 스크립트 실행을 지원합니다.

**활용 사례**:

**1. 스크립트 필드**:
```json
{
  "script_fields": {
    "total_price": {
      "script": {
        "source": "doc['price'].value * doc['quantity'].value"
      }
    }
  }
}
```

**2. 스크립트 업데이트**:
```json
POST /products/_update/1
{
  "script": {
    "source": "ctx._source.stock -= params.sold",
    "params": { "sold": 5 }
  }
}
```

**3. 스크립트 쿼리**:
```json
{
  "query": {
    "script_score": {
      "query": { "match_all": {} },
      "script": {
        "source": "doc['popularity'].value * Math.log(doc['views'].value + 1)"
      }
    }
  }
}
```

**4. Ingest Pipeline**:
```json
{
  "script": {
    "source": "ctx.fullname = ctx.first_name + ' ' + ctx.last_name"
  }
}
```

**성능 영향**:

| 요소 | 영향 | 권장 사항 |
|------|------|----------|
| 컴파일 | 초기 비용 발생 | 파라미터화로 재사용 |
| doc_values | 빠른 필드 접근 | `doc['field'].value` 사용 |
| _source | 느린 접근 | 가능하면 피하기 |
| 복잡한 로직 | CPU 부하 | 단순화, 인덱싱 시 계산 |

**최적화 방법**:

```json
// 나쁜 예 - 매번 컴파일
{ "source": "doc['price'].value * 1.1" }

// 좋은 예 - 파라미터화
{
  "source": "doc['price'].value * params.rate",
  "params": { "rate": 1.1 }
}
```

**컴파일 캐시 설정**:
```yaml
script.cache.max_size: 500
script.cache.expire: 10m
```

**참고자료**
- [Painless scripting language](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting-painless.html)[^50]

</details>

[^50]: Elasticsearch 공식 문서 - Painless scripting language

---

## 📌 Elasticsearch 장애 복구

### ES-049
Elasticsearch 클러스터에서 발생할 수 있는 장애와 복구 전략은 무엇인가요?

<details>
<summary>답변</summary>

**주요 장애 유형과 복구 전략**:

**1. 노드 장애**:
- **증상**: 클러스터 Yellow/Red 상태
- **자동 복구**: Replica가 Primary로 승격
- **수동 복구**: 노드 재시작 또는 교체

```json
// 샤드 할당 상태 확인
GET _cluster/allocation/explain

// 강제 샤드 재할당
POST _cluster/reroute
{
  "commands": [{
    "allocate_replica": {
      "index": "logs", "shard": 0, "node": "node-2"
    }
  }]
}
```

**2. 마스터 노드 장애**:
- **증상**: 클러스터 작업 불가
- **자동 복구**: Master-eligible 노드 중 새 마스터 선출
- **예방**: 최소 3개 Master-eligible 노드

**3. 디스크 용량 부족**:
- **증상**: 인덱싱 차단, Read-only 전환
- **복구**:
```json
// Read-only 해제
PUT _all/_settings
{ "index.blocks.read_only_allow_delete": null }

// 디스크 워터마크 조정
PUT _cluster/settings
{
  "transient": {
    "cluster.routing.allocation.disk.watermark.flood_stage": "95%"
  }
}
```

**4. 데이터 손상**:
- **복구**: 스냅샷에서 복원
```json
POST _snapshot/my_backup/snapshot_1/_restore
{
  "indices": "corrupted_index"
}
```

**5. Split-Brain**:
- **예방**: `discovery.zen.minimum_master_nodes` (7.x 이전)
- 7.x 이후 자동 quorum 관리

**모니터링 및 예방**:
```json
// 클러스터 상태 확인
GET _cluster/health

// 미할당 샤드 확인
GET _cat/shards?v&h=index,shard,prirep,state,unassigned.reason&s=state
```

**참고자료**
- [Fix common cluster issues](https://www.elastic.co/guide/en/elasticsearch/reference/current/fix-common-cluster-issues.html)[^51]

</details>

[^51]: Elasticsearch 공식 문서 - Fix common cluster issues

---

## 📌 Elasticsearch 최신 기능

### ES-050
최근 Elasticsearch의 업데이트 및 새로운 기능에 대해 알고 있는 내용을 공유해주세요.

<details>
<summary>답변</summary>

**Elasticsearch 8.x 주요 기능**:

**1. 보안 기본 활성화**:
- TLS, 인증이 기본으로 활성화
- 설치 시 자동 인증서 생성
- elastic 사용자 비밀번호 자동 생성

**2. kNN (k-Nearest Neighbor) 검색**:
- 벡터 유사도 검색 네이티브 지원
- 시맨틱 검색, 추천 시스템에 활용
```json
{
  "knn": {
    "field": "embedding",
    "query_vector": [0.1, 0.2, ...],
    "k": 10,
    "num_candidates": 100
  }
}
```

**3. ESQL (ES|QL)**:
- 새로운 파이프 기반 쿼리 언어
```
FROM logs | WHERE status == 500 | STATS count = COUNT(*) BY host
```

**4. Serverless Elasticsearch**:
- 완전 관리형 서버리스 배포 옵션
- 자동 스케일링, 운영 부담 감소

**5. 향상된 머신러닝**:
- Transformer 모델 통합
- NLP 작업 (텍스트 분류, NER, 감정 분석)
- ELSER (Elastic Learned Sparse EncodeR)

**6. 성능 개선**:
- 더 빠른 집계
- 향상된 인덱싱 속도
- 메모리 사용 최적화

**7. Frozen Tier 개선**:
- Searchable Snapshots
- 비용 효율적인 장기 데이터 보관

**8. Data Streams 개선**:
- TSDS (Time Series Data Streams)
- 시계열 데이터 최적화 저장

**참고자료**
- [What's new in Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/release-highlights.html)[^52]

</details>

[^52]: Elasticsearch 공식 문서 - Release highlights
