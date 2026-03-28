const specific_dbData = [
  {
    "id": "ES-001",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch의 기본 아키텍처와 주요 컴포넌트(Cluster, Node, Index, Document 등)에 대해 설명해주세요.",
    "answer": "Elasticsearch는 분산 검색 및 분석 엔진으로, 다음과 같은 주요 컴포넌트로 구성됩니다:\r\n\r\n- **Cluster**: 하나 이상의 노드로 구성된 집합으로, 모든 데이터를 저장하고 통합 인덱싱 및 검색 기능을 제공합니다. 고유한 이름으로 식별됩니다.\r\n- **Node**: 클러스터의 일부로서 데이터를 저장하고 인덱싱 및 검색에 참여하는 단일 서버입니다. Master, Data, Ingest 등 역할별로 구분됩니다.\r\n- **Index**: 유사한 특성을 가진 도큐먼트의 모음입니다. RDBMS의 데이터베이스와 유사한 개념입니다.\r\n- **Document**: 인덱스에 저장되는 기본 정보 단위로, JSON 형식으로 표현됩니다. RDBMS의 행(row)과 유사합니다.\r\n- **Shard**: 인덱스를 수평 분할한 조각으로, 데이터 분산 저장과 병렬 처리를 가능하게 합니다.",
    "references": [
      {
        "title": "Elasticsearch Basic Concepts",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html"
      }
    ]
  },
  {
    "id": "ES-002",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch에서 인덱스(Index)와 도큐먼트(Document)의 개념과 관계는 무엇인가요?",
    "answer": "**Index(인덱스)**는 도큐먼트의 논리적 컨테이너로, 관련된 데이터를 그룹화합니다. RDBMS의 테이블과 유사하지만 더 유연한 스키마를 가집니다.\r\n\r\n**Document(도큐먼트)**는 검색 가능한 데이터의 최소 단위로, JSON 객체 형태로 저장됩니다. 각 도큐먼트는 고유한 `_id`를 가지며, 필드(field)들의 집합으로 구성됩니다.\r\n\r\n**관계**:\r\n- 하나의 인덱스는 여러 도큐먼트를 포함할 수 있습니다\r\n- 도큐먼트는 반드시 하나의 인덱스에 속해야 합니다\r\n- 인덱스의 매핑(mapping)은 도큐먼트 필드의 데이터 타입을 정의합니다",
    "references": [
      {
        "title": "Data in: documents and indices",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/documents-indices.html"
      }
    ]
  },
  {
    "id": "ES-003",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch에서 데이터 분산 저장을 위한 Primary Shard와 고가용성을 위한 Replica Shard의 역할 및 차이점은 무엇인가요?",
    "answer": "**Primary Shard(프라이머리 샤드)**:\r\n- 인덱스의 데이터를 수평 분할한 단위입니다\r\n- 인덱스 생성 시 샤드 수가 결정됩니다\r\n- 변경이 필요한 경우 Split API(샤드 증가) 또는 Shrink API(샤드 감소)를 사용하거나 Reindex가 필요합니다\r\n- 각 도큐먼트는 하나의 프라이머리 샤드에만 저장됩니다\r\n\r\n**Replica Shard(레플리카 샤드)**:\r\n- 프라이머리 샤드의 복사본입니다\r\n- 고가용성 제공: 프라이머리 샤드 장애 시 레플리카가 승격됩니다\r\n- 검색 성능 향상: 검색 요청을 분산 처리할 수 있습니다\r\n- 동적으로 개수 조정이 가능합니다\r\n\r\n**주요 차이점**:\r\n| 구분 | Primary Shard | Replica Shard |\r\n|------|---------------|---------------|\r\n| 역할 | 데이터 저장/쓰기 | 복제/읽기 분산 |\r\n| 변경 | Split/Shrink API 또는 Reindex 필요 | 동적 변경 가능 |\r\n| 필수 여부 | 필수 | 선택 |",
    "references": [
      {
        "title": "Scalability and resilience",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/scalability.html"
      }
    ]
  },
  {
    "id": "ES-004",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch에서 클러스터(Cluster)와 노드(Master, Data, Coordinating, Ingest Node) 간의 관계와 역할에 대해 설명해주세요.",
    "answer": "**클러스터(Cluster)**는 하나 이상의 노드로 구성된 집합으로, 동일한 `cluster.name`을 공유합니다.\r\n\r\n**노드(Node)**는 클러스터를 구성하는 개별 서버로, 역할에 따라 다음과 같이 구분됩니다:\r\n\r\n- **Master Node**: 클러스터 상태 관리, 인덱스 생성/삭제, 샤드 할당 결정\r\n- **Data Node**: 실제 데이터 저장, 검색 및 집계 수행\r\n- **Coordinating Node**: 검색 요청 라우팅 및 결과 병합\r\n- **Ingest Node**: 인덱싱 전 데이터 전처리\r\n\r\n**관계**:\r\n- 노드는 클러스터에 참여하여 데이터와 워크로드를 분산합니다\r\n- Master-eligible 노드 중 하나가 마스터로 선출됩니다\r\n- 노드 간 통신은 Transport 계층(기본 9300 포트)을 통해 이루어집니다",
    "references": [
      {
        "title": "Node roles",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-node.html"
      }
    ]
  },
  {
    "id": "ES-005",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Query DSL의 기본 구조와 사용 방법에 대해 설명해주세요.",
    "answer": "**Query DSL(Domain Specific Language)**은 JSON 기반의 쿼리 언어로, Elasticsearch에서 검색을 수행하는 표준 방법입니다.\r\n\r\n**기본 구조**:\r\n```json\r\n{\r\n  \"query\": {\r\n    \"query_type\": {\r\n      \"field_name\": \"search_value\"\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**주요 컨텍스트**:\r\n- **Query Context**: 관련성 점수(_score)를 계산합니다\r\n- **Filter Context**: 조건 일치 여부만 판단하며 캐싱됩니다\r\n\r\n**기본 사용 예시**:\r\n```json\r\n{\r\n  \"query\": {\r\n    \"bool\": {\r\n      \"must\": [{ \"match\": { \"title\": \"elasticsearch\" }}],\r\n      \"filter\": [{ \"term\": { \"status\": \"published\" }}]\r\n    }\r\n  }\r\n}\r\n```",
    "references": [
      {
        "title": "Query DSL",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html"
      }
    ]
  },
  {
    "id": "ES-006",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Query DSL에서 전문 검색용 Match 쿼리와 정확한 값 매칭용 Term 쿼리의 차이점은 무엇인가요?",
    "answer": "**Match Query**:\r\n- 전문 검색(Full-text search)에 사용됩니다\r\n- 검색어를 분석기(Analyzer)를 통해 토큰화합니다\r\n- 분석된 토큰으로 검색하여 유연한 매칭이 가능합니다\r\n\r\n```json\r\n{ \"match\": { \"content\": \"Quick Brown Fox\" } }\r\n// \"quick\", \"brown\", \"fox\"로 분석 후 검색\r\n```\r\n\r\n**Term Query**:\r\n- 정확한 값 매칭(Exact match)에 사용됩니다\r\n- 분석기를 거치지 않고 원본 그대로 검색합니다\r\n- keyword 필드, 숫자, 날짜 등에 적합합니다\r\n\r\n```json\r\n{ \"term\": { \"status\": \"published\" } }\r\n// \"published\" 정확히 일치하는 문서 검색\r\n```\r\n\r\n**핵심 차이**: Match는 분석기 적용 O, Term은 분석기 적용 X\r\n\r\n**주의사항 (함정)**:\r\n- `text` 필드에 Term Query 사용 시 예상과 다른 결과가 나올 수 있습니다\r\n- 예: \"Quick Brown Fox\"가 text 필드에 저장되면 \"quick\", \"brown\", \"fox\"로 인덱싱됨\r\n- `term: { \"content\": \"Quick\" }`는 매칭 실패 (대소문자 불일치)\r\n- `term: { \"content\": \"quick\" }`는 매칭 성공\r\n- **권장**: text 필드는 Match Query, keyword 필드는 Term Query 사용",
    "references": [
      {
        "title": "Match query",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html"
      },
      {
        "title": "Term query",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html"
      }
    ]
  },
  {
    "id": "ES-007",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Query DSL에서 숫자, 날짜 등 범위 검색을 수행하는 Range 쿼리의 활용 사례와 주의사항에 대해 설명해주세요.",
    "answer": "**Range Query**는 숫자, 날짜, 문자열 필드에서 특정 범위 내의 값을 검색합니다.\r\n\r\n**주요 연산자**:\r\n- `gt`: 초과, `gte`: 이상\r\n- `lt`: 미만, `lte`: 이하\r\n\r\n**활용 사례**:\r\n```json\r\n// 날짜 범위 검색\r\n{ \"range\": { \"created_at\": { \"gte\": \"2024-01-01\", \"lt\": \"2024-02-01\" }}}\r\n\r\n// 가격 범위 검색\r\n{ \"range\": { \"price\": { \"gte\": 10000, \"lte\": 50000 }}}\r\n```\r\n\r\n**주의사항**:\r\n- **날짜 형식**: 인덱스 매핑의 날짜 형식과 일치해야 합니다\r\n- **타임존**: `time_zone` 파라미터로 시간대를 명시하는 것이 좋습니다\r\n- **성능**: 넓은 범위 쿼리는 많은 도큐먼트를 스캔할 수 있어 Filter Context 사용 권장\r\n- **문자열 범위**: 사전순 비교이므로 의도한 결과와 다를 수 있습니다",
    "references": [
      {
        "title": "Range query",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html"
      }
    ]
  },
  {
    "id": "ES-008",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Query DSL에서 여러 쿼리를 논리적으로 조합하는 Bool 쿼리의 구성 요소(Must, Should, Must Not, Filter)에 대해 설명해주세요.",
    "answer": "**Bool Query**는 여러 쿼리를 논리적으로 조합하는 복합 쿼리입니다.\r\n\r\n**구성 요소**:\r\n\r\n| 절 | 설명 | 점수 영향 | 캐싱 |\r\n|---|------|---------|------|\r\n| **must** | 반드시 일치해야 함 (AND) | O | X |\r\n| **should** | 일치하면 점수 증가 (OR) | O | X |\r\n| **must_not** | 일치하면 제외 (NOT) | X | O |\r\n| **filter** | 반드시 일치해야 함 (필터링) | X | O |\r\n\r\n**예시**:\r\n```json\r\n{\r\n  \"bool\": {\r\n    \"must\": [{ \"match\": { \"title\": \"elasticsearch\" }}],\r\n    \"should\": [{ \"match\": { \"content\": \"guide\" }}],\r\n    \"must_not\": [{ \"term\": { \"status\": \"draft\" }}],\r\n    \"filter\": [{ \"range\": { \"date\": { \"gte\": \"2024-01-01\" }}}]\r\n  }\r\n}\r\n```\r\n\r\n**성능 팁**: 점수 계산이 필요 없는 조건은 `filter`를 사용하여 캐싱 이점을 활용하세요.\r\n\r\n**주의사항 (함정)**:\r\n- `should` 절만 있고 `must`나 `filter`가 없으면 `minimum_should_match: 1`이 자동 적용\r\n- `must`나 `filter`가 있으면 `should`는 선택적 (점수에만 영향)\r\n- `must_not`은 점수에 영향 없음 - 필터링만 수행",
    "references": [
      {
        "title": "Boolean query",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html"
      }
    ]
  },
  {
    "id": "ES-009",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Aggregation의 개념과 Bucket Aggregation, Metric Aggregation의 차이에 대해 설명해주세요.",
    "answer": "**Aggregation**은 데이터를 그룹화하고 통계를 계산하는 기능으로, SQL의 GROUP BY와 유사합니다.\r\n\r\n**Bucket Aggregation**:\r\n- 도큐먼트를 기준에 따라 그룹(버킷)으로 분류합니다\r\n- 예: `terms`, `date_histogram`, `range`, `filters`\r\n```json\r\n{ \"aggs\": { \"by_category\": { \"terms\": { \"field\": \"category\" }}}}\r\n```\r\n\r\n**Metric Aggregation**:\r\n- 숫자 값에 대한 통계를 계산합니다\r\n- 예: `sum`, `avg`, `min`, `max`, `cardinality`, `stats`\r\n```json\r\n{ \"aggs\": { \"avg_price\": { \"avg\": { \"field\": \"price\" }}}}\r\n```\r\n\r\n**Pipeline Aggregation**:\r\n- 다른 집계 결과를 입력으로 사용합니다\r\n- 예: `derivative`, `moving_avg`, `bucket_sort`\r\n\r\n**중첩 사용 예시**:\r\n```json\r\n{\r\n  \"aggs\": {\r\n    \"by_category\": {\r\n      \"terms\": { \"field\": \"category\" },\r\n      \"aggs\": { \"avg_price\": { \"avg\": { \"field\": \"price\" }}}\r\n    }\r\n  }\r\n}\r\n```",
    "references": [
      {
        "title": "Aggregations",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html"
      }
    ]
  },
  {
    "id": "ES-010",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Analyzers, Tokenizers, Filters의 역할과 설정 방법에 대해 설명해주세요.",
    "answer": "**Analyzer(분석기)**는 텍스트를 검색 가능한 토큰으로 변환하는 파이프라인입니다.\r\n\r\n**구성 요소**:\r\n\r\n1. **Character Filters**: 텍스트 전처리 (HTML 태그 제거 등)\r\n2. **Tokenizer**: 텍스트를 토큰으로 분리\r\n3. **Token Filters**: 토큰 후처리 (소문자 변환, 불용어 제거 등)\r\n\r\n**처리 순서**: Character Filters → Tokenizer → Token Filters\r\n\r\n**내장 Analyzer**:\r\n- `standard`: 기본 분석기, 유니코드 텍스트 분할, 소문자 변환\r\n- `simple`: 비문자에서 분할, 소문자 변환 (숫자 제거됨 - 주의)\r\n- `whitespace`: 공백 기준 분할만 (대소문자 유지)\r\n- `keyword`: 전체 텍스트를 하나의 토큰으로 (분석 없음)\r\n- `pattern`: 정규식 기반 분할 (기본: 비단어 문자)\r\n- `language analyzers`: english, korean 등 언어별 최적화\r\n\r\n**커스텀 Analyzer 설정**:\r\n```json\r\n{\r\n  \"settings\": {\r\n    \"analysis\": {\r\n      \"analyzer\": {\r\n        \"my_analyzer\": {\r\n          \"type\": \"custom\",\r\n          \"tokenizer\": \"standard\",\r\n          \"filter\": [\"lowercase\", \"asciifolding\"]\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n```",
    "references": [
      {
        "title": "Text analysis",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis.html"
      }
    ]
  },
  {
    "id": "ES-011",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Mapping의 개념과 동적 매핑(Dynamic Mapping) 및 명시적 매핑(Explicit Mapping)의 차이점은 무엇인가요?",
    "answer": "**Mapping**은 인덱스에 저장되는 도큐먼트의 구조와 필드 타입을 정의하는 스키마입니다.\r\n\r\n**Dynamic Mapping (동적 매핑)**:\r\n- 도큐먼트 인덱싱 시 자동으로 필드 타입을 추론합니다\r\n- 빠른 프로토타이핑에 유용하지만, 의도치 않은 타입 할당 가능성이 있습니다\r\n```json\r\n// \"123\" → text, 123 → long, \"2024-01-01\" → date\r\n```\r\n\r\n**Explicit Mapping (명시적 매핑)**:\r\n- 인덱스 생성 시 명확하게 필드 타입을 정의합니다\r\n- 프로덕션 환경에서 권장됩니다\r\n```json\r\n{\r\n  \"mappings\": {\r\n    \"properties\": {\r\n      \"title\": { \"type\": \"text\" },\r\n      \"price\": { \"type\": \"integer\" },\r\n      \"created_at\": { \"type\": \"date\" }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**주요 차이점**:\r\n| 구분 | Dynamic | Explicit |\r\n|------|---------|----------|\r\n| 정의 시점 | 자동 (인덱싱 시) | 수동 (인덱스 생성 시) |\r\n| 타입 정확성 | 추론 기반 | 명시적 |\r\n| 유연성 | 높음 | 낮음 |\r\n| 권장 환경 | 개발 | 프로덕션 |\r\n\r\n**주의사항 (함정)**:\r\n- Dynamic Mapping으로 생성된 필드 타입은 **이후 변경 불가** - Reindex 필요\r\n- 문자열 `\"123\"`은 text+keyword로, 숫자 `123`은 long으로 매핑됨 - 일관성 유지 중요\r\n- `\"2024-01-01\"` 형식은 자동으로 date 타입 추론 - 다른 형식은 text로 저장될 수 있음\r\n- **권장**: `dynamic: strict` 설정으로 예상치 못한 필드 추가 방지\r\n\r\n```json\r\n{\r\n  \"mappings\": {\r\n    \"dynamic\": \"strict\",\r\n    \"properties\": { ... }\r\n  }\r\n}\r\n```",
    "references": [
      {
        "title": "Mapping",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html"
      }
    ]
  },
  {
    "id": "ES-012",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch에서 Relevance Scoring의 원리와 개선 방법에 대해 설명해주세요.",
    "answer": "**Relevance Scoring**은 검색 쿼리와 도큐먼트의 관련성을 수치화한 점수(_score)입니다.\r\n\r\n**점수 계산 알고리즘 (BM25)**:\r\nElasticsearch 5.0부터 기본 알고리즘으로, 다음 요소를 고려합니다:\r\n- **TF (Term Frequency)**: 검색어가 도큐먼트에 등장하는 빈도\r\n- **IDF (Inverse Document Frequency)**: 전체 도큐먼트 대비 검색어의 희소성\r\n- **Field Length**: 필드 길이가 짧을수록 높은 점수\r\n\r\n**점수 개선 방법**:\r\n\r\n1. **Field Boosting**: 특정 필드에 가중치 부여\r\n```json\r\n{ \"multi_match\": { \"query\": \"elasticsearch\", \"fields\": [\"title^3\", \"content\"] }}\r\n```\r\n\r\n2. **Function Score Query**: 커스텀 점수 함수 적용\r\n```json\r\n{ \"function_score\": { \"query\": {...}, \"functions\": [{ \"field_value_factor\": { \"field\": \"popularity\" }}]}}\r\n```\r\n\r\n3. **Explain API**: 점수 계산 과정 분석\r\n```\r\nGET /index/_explain/doc_id\r\n```",
    "references": [
      {
        "title": "Relevance tuning",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/search-relevance.html"
      }
    ]
  },
  {
    "id": "ES-013",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch에서 검색 결과의 관련성 점수(Relevance Score)를 개선하기 위해 Boosting을 통해 특정 조건에 가중치를 부여하는 방법에 대해 설명해주세요.",
    "answer": "**Boosting**은 특정 조건에 따라 검색 점수를 높이거나 낮추는 기법입니다.\r\n\r\n**1. Query-time Boosting (쿼리 시점)**:\r\n```json\r\n{\r\n  \"bool\": {\r\n    \"should\": [\r\n      { \"match\": { \"title\": { \"query\": \"elasticsearch\", \"boost\": 3 }}},\r\n      { \"match\": { \"content\": { \"query\": \"elasticsearch\", \"boost\": 1 }}}\r\n    ]\r\n  }\r\n}\r\n```\r\n\r\n**2. Boosting Query**:\r\n- positive: 일치하면 점수 계산\r\n- negative: 일치하면 점수 감소\r\n```json\r\n{\r\n  \"boosting\": {\r\n    \"positive\": { \"match\": { \"content\": \"elasticsearch\" }},\r\n    \"negative\": { \"term\": { \"status\": \"outdated\" }},\r\n    \"negative_boost\": 0.5\r\n  }\r\n}\r\n```\r\n\r\n**3. Function Score Query**:\r\n```json\r\n{\r\n  \"function_score\": {\r\n    \"query\": { \"match_all\": {} },\r\n    \"functions\": [\r\n      { \"filter\": { \"term\": { \"featured\": true }}, \"weight\": 10 },\r\n      { \"field_value_factor\": { \"field\": \"popularity\", \"modifier\": \"log1p\" }}\r\n    ],\r\n    \"boost_mode\": \"multiply\"\r\n  }\r\n}\r\n```",
    "references": [
      {
        "title": "Boosting query",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-boosting-query.html"
      }
    ]
  },
  {
    "id": "ES-014",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "여러 필드에서 동시에 검색하는 Multi-match 쿼리의 타입별 차이점과 Cross-field 검색의 특징은 무엇인가요?",
    "answer": "**Multi-match Query**는 여러 필드에서 동시에 검색을 수행합니다.\r\n\r\n**타입별 차이**:\r\n\r\n| 타입 | 설명 | 사용 사례 |\r\n|------|------|----------|\r\n| `best_fields` | 가장 높은 점수의 필드 사용 (기본값) | 동일 필드 내 매칭 중요 |\r\n| `most_fields` | 모든 필드 점수 합산 | 동의어가 여러 필드에 있을 때 |\r\n| `cross_fields` | 모든 필드를 하나로 취급 | 이름 검색 (first_name + last_name) |\r\n| `phrase` | 구문 매칭 | 정확한 문구 검색 |\r\n| `phrase_prefix` | 접두어 구문 매칭 | 자동완성 |\r\n\r\n**Cross-field 검색 예시**:\r\n```json\r\n{\r\n  \"multi_match\": {\r\n    \"query\": \"홍 길동\",\r\n    \"type\": \"cross_fields\",\r\n    \"fields\": [\"first_name\", \"last_name\"],\r\n    \"operator\": \"and\"\r\n  }\r\n}\r\n```\r\n- \"홍\"이 first_name에, \"길동\"이 last_name에 있어도 매칭됩니다\r\n\r\n**best_fields와의 차이**:\r\n- `best_fields`: 각 필드를 독립적으로 검색하여 최고 점수 선택\r\n- `cross_fields`: 여러 필드를 하나의 큰 필드처럼 취급",
    "references": [
      {
        "title": "Multi-match query",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html"
      }
    ]
  },
  {
    "id": "ES-015",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Nested 타입과 Object 타입의 차이점 및 사용 시 주의사항에 대해 설명해주세요.",
    "answer": "**Object 타입**:\r\n- 기본 JSON 객체 매핑 방식입니다\r\n- 내부적으로 필드가 평탄화(flatten)되어 저장됩니다\r\n- 배열 내 객체 간 관계가 손실됩니다\r\n\r\n```json\r\n// 원본\r\n{ \"users\": [{ \"name\": \"Kim\", \"age\": 30 }, { \"name\": \"Lee\", \"age\": 25 }] }\r\n// 저장 형태\r\n{ \"users.name\": [\"Kim\", \"Lee\"], \"users.age\": [30, 25] }\r\n```\r\n\r\n**Nested 타입**:\r\n- 각 객체를 별도의 숨겨진 도큐먼트로 저장합니다\r\n- 객체 간 관계가 유지됩니다\r\n- Nested Query로 검색해야 합니다\r\n\r\n```json\r\n{ \"mappings\": { \"properties\": { \"users\": { \"type\": \"nested\" }}}}\r\n```\r\n\r\n**주요 차이점**:\r\n| 구분 | Object | Nested |\r\n|------|--------|--------|\r\n| 관계 유지 | X | O |\r\n| 저장 방식 | 평탄화 | 별도 도큐먼트 |\r\n| 검색 방식 | 일반 쿼리 | Nested Query |\r\n| 성능 | 빠름 | 상대적으로 느림 |\r\n\r\n**주의사항**:\r\n- Nested 객체 수 제한: 기본 10,000개 (`index.mapping.nested_objects.limit`)\r\n- 많은 Nested 객체는 힙 메모리와 검색 성능에 영향\r\n- **성능 트레이드오프**:\r\n  - Object: 빠르지만 배열 내 객체 관계 손실 (크로스 매칭 문제)\r\n  - Nested: 관계 유지되지만 각 객체가 별도 Lucene 문서로 저장되어 인덱스 크기 증가\r\n- **선택 기준**: 객체 간 관계가 중요하면 Nested, 단순 검색이면 Object 또는 Flattened 타입 고려",
    "references": [
      {
        "title": "Nested field type",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html"
      }
    ]
  },
  {
    "id": "ES-016",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch의 인덱스 설정(Index Settings)과 매핑 설정(Mapping Settings)의 차이점은 무엇인가요?",
    "answer": "**Index Settings (인덱스 설정)**:\r\n인덱스의 동작 방식과 물리적 구성을 정의합니다.\r\n\r\n- **Static Settings**: 인덱스 생성 시에만 설정 가능\r\n  - `number_of_shards`: 프라이머리 샤드 수\r\n  - `codec`: 압축 알고리즘\r\n\r\n- **Dynamic Settings**: 런타임에 변경 가능\r\n  - `number_of_replicas`: 레플리카 수\r\n  - `refresh_interval`: 인덱스 갱신 주기\r\n\r\n```json\r\n{\r\n  \"settings\": {\r\n    \"number_of_shards\": 3,\r\n    \"number_of_replicas\": 2,\r\n    \"refresh_interval\": \"5s\"\r\n  }\r\n}\r\n```\r\n\r\n**Mapping Settings (매핑 설정)**:\r\n도큐먼트 필드의 데이터 타입과 처리 방식을 정의합니다.\r\n\r\n```json\r\n{\r\n  \"mappings\": {\r\n    \"properties\": {\r\n      \"title\": { \"type\": \"text\", \"analyzer\": \"standard\" },\r\n      \"price\": { \"type\": \"integer\" },\r\n      \"tags\": { \"type\": \"keyword\" }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**핵심 차이**:\r\n| 구분 | Index Settings | Mapping Settings |\r\n|------|----------------|------------------|\r\n| 대상 | 인덱스 자체 | 필드 |\r\n| 내용 | 샤드, 복제본, 분석기 | 필드 타입, 분석기 적용 |\r\n| 변경 | 일부 동적 변경 가능 | 기존 필드 타입 변경 불가 |",
    "references": [
      {
        "title": "Index settings",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules.html"
      }
    ]
  },
  {
    "id": "ES-017",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "검색 성능 튜닝을 위한 주요 고려사항은 무엇인가요?",
    "answer": "**1. 매핑 최적화**:\r\n- 불필요한 필드 인덱싱 비활성화 (`index: false`)\r\n- `doc_values` 비활성화 (집계/정렬 불필요 시)\r\n- 적절한 데이터 타입 선택 (`keyword` vs `text`)\r\n\r\n**2. 쿼리 최적화**:\r\n- Filter Context 활용 (캐싱 이점)\r\n- `bool` 쿼리에서 `filter` 절 적극 사용\r\n- `size: 0`으로 집계 전용 쿼리 실행\r\n\r\n**3. 샤드 전략**:\r\n- 샤드 크기: 10-50GB 권장\r\n- 노드당 샤드 수: 힙 1GB당 20개 이하\r\n- 과도한 샤드 분산 방지\r\n\r\n**4. 하드웨어/설정**:\r\n- 충분한 힙 메모리 (전체 메모리의 50%, 최대 약 31GB 권장)\r\n  - 32GB 이하: JVM Compressed OOPs 활성화로 메모리 효율성 향상\r\n  - 32GB 초과 시 Compressed OOPs 비활성화되어 오히려 성능 저하 가능\r\n- SSD 사용 권장\r\n- `refresh_interval` 조정 (인덱싱 성능 vs 검색 최신성)\r\n\r\n**5. 캐싱 활용**:\r\n- Node Query Cache: Filter 결과 캐싱\r\n- Shard Request Cache: 집계 결과 캐싱\r\n- Field Data Cache: 정렬/집계용 필드 데이터\r\n\r\n```json\r\n// 예시: 검색 최적화된 쿼리\r\n{\r\n  \"query\": {\r\n    \"bool\": {\r\n      \"filter\": [\r\n        { \"term\": { \"status\": \"active\" }},\r\n        { \"range\": { \"date\": { \"gte\": \"now-7d\" }}}\r\n      ]\r\n    }\r\n  }\r\n}\r\n```",
    "references": [
      {
        "title": "Tune for search speed",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-search-speed.html"
      }
    ]
  },
  {
    "id": "ES-018",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch의 분산 시스템 특성과 데이터 복제 메커니즘에 대해 설명해주세요.",
    "answer": "**분산 시스템 특성**:\r\n\r\n1. **수평 확장성**: 노드 추가로 용량과 처리량 증가\r\n2. **고가용성**: 레플리카를 통한 장애 대응\r\n3. **자동 샤드 밸런싱**: 클러스터 내 샤드 자동 분배\r\n4. **분산 검색**: 모든 샤드에서 병렬 검색 후 결과 병합\r\n\r\n**데이터 복제 메커니즘**:\r\n\r\n1. **Primary-Replica 모델**:\r\n   - 쓰기 요청은 Primary Shard에서 처리\r\n   - Primary가 Replica로 복제 전파\r\n   - 모든 Replica 복제 완료 시 응답 반환 (기본값)\r\n\r\n2. **복제 프로세스**:\r\n```\r\nClient → Coordinating Node → Primary Shard → Replica Shards → Response\r\n```\r\n\r\n3. **일관성 설정 (`wait_for_active_shards`)**:\r\n   - `1`: Primary만 확인 (빠름, 덜 안전)\r\n   - `all`: 모든 복제본 확인 (느림, 안전)\r\n   - `quorum`: 과반수 확인 (균형)\r\n\r\n4. **장애 복구**:\r\n   - Primary 장애 시 Replica가 자동 승격\r\n   - 새 노드 추가 시 자동 샤드 재배치",
    "references": [
      {
        "title": "Reading and writing documents",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-replication.html"
      }
    ]
  },
  {
    "id": "ES-019",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "클러스터 상태를 모니터링하기 위한 도구와 주요 지표에는 무엇이 있나요?",
    "answer": "**모니터링 도구**:\r\n\r\n1. **Kibana Stack Monitoring**: 시각적 대시보드 제공\r\n2. **Cluster APIs**:\r\n   - `GET _cluster/health`: 클러스터 상태\r\n   - `GET _cluster/stats`: 클러스터 통계\r\n   - `GET _nodes/stats`: 노드별 통계\r\n3. **Cat APIs**: 사람이 읽기 쉬운 형식\r\n   - `GET _cat/health`, `GET _cat/nodes`, `GET _cat/indices`\r\n\r\n**주요 지표**:\r\n\r\n| 카테고리 | 지표 | 설명 |\r\n|---------|------|------|\r\n| 클러스터 | status | green/yellow/red |\r\n| | active_shards | 활성 샤드 수 |\r\n| | unassigned_shards | 미할당 샤드 수 |\r\n| 노드 | heap_used_percent | 힙 메모리 사용률 |\r\n| | cpu_percent | CPU 사용률 |\r\n| | disk_used_percent | 디스크 사용률 |\r\n| 인덱싱 | indexing_rate | 초당 인덱싱 문서 수 |\r\n| | refresh_time | 리프레시 소요 시간 |\r\n| 검색 | query_latency | 쿼리 지연 시간 |\r\n| | fetch_latency | 결과 가져오기 지연 |\r\n\r\n**클러스터 상태**:\r\n- **Green**: 모든 샤드 할당 완료\r\n- **Yellow**: Primary는 할당, Replica 미할당\r\n- **Red**: 일부 Primary 미할당",
    "references": [
      {
        "title": "Monitor a cluster",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/monitor-elasticsearch-cluster.html"
      }
    ]
  },
  {
    "id": "ES-020",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch 클러스터 상태가 Yellow(Primary Shard는 할당되었으나 Replica Shard가 미할당된 상태)일 때 발생할 수 있는 문제와 해결 방법은 무엇인가요?",
    "answer": "**발생 가능한 문제**:\r\n\r\n1. **가용성 저하**: 노드 장애 시 데이터 손실 위험\r\n2. **Yellow 상태**: Replica 미할당으로 클러스터 상태 저하\r\n3. **검색 성능 저하**: 검색 부하 분산 불가\r\n4. **복구 지연**: 장애 발생 시 복구 시간 증가\r\n\r\n**원인 파악**:\r\n```\r\nGET _cluster/allocation/explain\r\nGET _cat/shards?v&h=index,shard,prirep,state,unassigned.reason\r\n```\r\n\r\n**일반적인 원인과 해결 방법**:\r\n\r\n| 원인 | 해결 방법 |\r\n|------|----------|\r\n| 노드 부족 | 노드 추가 또는 replica 수 감소 |\r\n| 디스크 용량 부족 | 디스크 확보 또는 watermark 설정 조정 |\r\n| 할당 필터 | allocation 설정 검토 |\r\n| 노드 장애 | 장애 노드 복구 또는 제거 |\r\n\r\n**해결 명령어**:\r\n```json\r\n// Replica 수 조정\r\nPUT /index_name/_settings\r\n{ \"number_of_replicas\": 1 }\r\n\r\n// 샤드 재할당 재시도\r\nPOST _cluster/reroute?retry_failed=true\r\n\r\n// Disk watermark 조정\r\nPUT _cluster/settings\r\n{ \"transient\": { \"cluster.routing.allocation.disk.watermark.low\": \"90%\" }}\r\n```",
    "references": [
      {
        "title": "Cluster allocation explain",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-allocation-explain.html"
      }
    ]
  },
  {
    "id": "ES-021",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch의 Data Node, Master Node, Coordinating Node(Client Node)의 역할과 차이점에 대해 설명해주세요.",
    "answer": "**Master Node (마스터 노드)**:\r\n- 클러스터 전체 관리 담당\r\n- 인덱스 생성/삭제, 샤드 할당 결정\r\n- 클러스터 상태 관리 및 전파\r\n- 최소 3개의 master-eligible 노드 권장 (split-brain 방지)\r\n\r\n```yaml\r\nnode.roles: [ master ]\r\n```\r\n\r\n**Data Node (데이터 노드)**:\r\n- 실제 데이터 저장 및 CRUD 작업 수행\r\n- 검색 및 집계 쿼리 실행\r\n- CPU, 메모리, I/O 집약적 작업\r\n\r\n```yaml\r\nnode.roles: [ data ]\r\n```\r\n\r\n**Coordinating Node (코디네이팅 노드)**:\r\n- 클라이언트 요청을 받아 적절한 노드로 라우팅\r\n- 검색 결과 병합 (scatter-gather)\r\n- 전용 설정 시 \"Client Node\"라고도 불림\r\n\r\n```yaml\r\nnode.roles: [ ]  # 빈 배열\r\n```\r\n\r\n**Ingest Node (인제스트 노드)**:\r\n- 인덱싱 전 데이터 전처리 파이프라인 실행\r\n\r\n```yaml\r\nnode.roles: [ ingest ]\r\n```\r\n\r\n**역할 비교**:\r\n| 역할 | Master | Data | Coordinating |\r\n|------|--------|------|--------------|\r\n| 클러스터 관리 | O | X | X |\r\n| 데이터 저장 | X | O | X |\r\n| 쿼리 라우팅 | X | X | O |\r\n| 리소스 요구 | 낮음 | 높음 | 중간 |",
    "references": [
      {
        "title": "Node roles",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-node.html"
      }
    ]
  },
  {
    "id": "ES-022",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Kibana와 Elasticsearch의 관계 및 연동 방법에 대해 설명해주세요.",
    "answer": "**관계**:\r\nKibana는 Elasticsearch 데이터를 시각화하고 관리하는 공식 UI 도구입니다.\r\n\r\n**주요 기능**:\r\n- **Discover**: 데이터 탐색 및 검색\r\n- **Visualize**: 차트, 그래프 등 시각화 생성\r\n- **Dashboard**: 여러 시각화를 조합한 대시보드\r\n- **Dev Tools**: Query DSL 직접 실행\r\n- **Management**: 인덱스 패턴, 사용자 관리\r\n\r\n**연동 방법**:\r\n\r\n1. **기본 설정** (`kibana.yml`):\r\n```yaml\r\nelasticsearch.hosts: [\"http://localhost:9200\"]\r\nelasticsearch.username: \"kibana_system\"\r\nelasticsearch.password: \"password\"\r\n```\r\n\r\n2. **다중 노드 연결**:\r\n```yaml\r\nelasticsearch.hosts:\r\n  - \"http://node1:9200\"\r\n  - \"http://node2:9200\"\r\n```\r\n\r\n3. **SSL/TLS 설정**:\r\n```yaml\r\nelasticsearch.ssl.verificationMode: certificate\r\nelasticsearch.ssl.certificateAuthorities: [\"/path/to/ca.crt\"]\r\n```\r\n\r\n**인덱스 패턴 생성**:\r\n1. Kibana > Stack Management > Index Patterns\r\n2. 패턴 입력 (예: `logs-*`)\r\n3. 타임스탬프 필드 선택",
    "references": [
      {
        "title": "Kibana configuration",
        "url": "https://www.elastic.co/guide/en/kibana/current/settings.html"
      }
    ]
  },
  {
    "id": "ES-023",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch의 스케일링(Scale-out) 전략에는 어떤 것들이 있나요?",
    "answer": "**1. 수평 확장 (Scale-out)**:\r\n\r\n- **노드 추가**: 새 노드 추가 시 자동으로 샤드 재분배\r\n- **샤드 분산**: 데이터와 쿼리 부하 분산\r\n```yaml\r\n# 새 노드가 클러스터에 자동 합류\r\ncluster.name: my-cluster\r\ndiscovery.seed_hosts: [\"node1\", \"node2\"]\r\n```\r\n\r\n**2. 샤드 전략**:\r\n- 초기 샤드 수 적절히 설정 (변경 시 Split/Shrink API 또는 Reindex 필요)\r\n- 샤드 크기 권장: 10-50GB (공식 문서 권장, 워크로드에 따라 다름)\r\n- 노드당 샤드 수: 힙 1GB당 20개 이하\r\n- **트레이드오프**:\r\n  - 샤드가 너무 많으면: 마스터 노드 부하, 메모리 오버헤드\r\n  - 샤드가 너무 적으면: 병렬 처리 제한, 스케일 아웃 어려움\r\n\r\n**3. 인덱스 분할 전략**:\r\n- **시간 기반 인덱스**: `logs-2024.01`, `logs-2024.02`\r\n- **롤오버**: 조건 충족 시 새 인덱스 자동 생성\r\n```json\r\nPOST /logs/_rollover\r\n{ \"conditions\": { \"max_size\": \"50gb\", \"max_age\": \"7d\" }}\r\n```\r\n\r\n**4. 역할 기반 노드 분리**:\r\n- Master, Data, Ingest, Coordinating 노드 분리\r\n- Hot-Warm-Cold 아키텍처 적용\r\n\r\n**5. Cross-Cluster Replication (CCR)**:\r\n- 지역 간 데이터 복제\r\n- 재해 복구 및 지역별 검색 성능 향상\r\n\r\n**6. Frozen Tier**:\r\n- 자주 접근하지 않는 데이터를 저비용 스토리지로 이동",
    "references": [
      {
        "title": "Scalability and resilience",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/scalability.html"
      }
    ]
  },
  {
    "id": "ES-024",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "인덱스 템플릿(Index Template)의 역할과 구성 방법에 대해 설명해주세요.",
    "answer": "**역할**:\r\n인덱스 템플릿은 새 인덱스 생성 시 자동으로 적용되는 설정과 매핑을 정의합니다. 시간 기반 인덱스나 동일한 구조의 여러 인덱스 관리에 유용합니다.\r\n\r\n**구성 요소**:\r\n- `index_patterns`: 템플릿이 적용될 인덱스 패턴\r\n- `template`: settings, mappings, aliases 정의\r\n- `priority`: 여러 템플릿 중 우선순위\r\n- `composed_of`: 재사용 가능한 컴포넌트 템플릿\r\n\r\n**컴포넌트 템플릿 생성**:\r\n```json\r\nPUT _component_template/my_mappings\r\n{\r\n  \"template\": {\r\n    \"mappings\": {\r\n      \"properties\": {\r\n        \"@timestamp\": { \"type\": \"date\" },\r\n        \"message\": { \"type\": \"text\" }\r\n      }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**인덱스 템플릿 생성**:\r\n```json\r\nPUT _index_template/my_template\r\n{\r\n  \"index_patterns\": [\"logs-*\"],\r\n  \"priority\": 100,\r\n  \"composed_of\": [\"my_mappings\"],\r\n  \"template\": {\r\n    \"settings\": {\r\n      \"number_of_shards\": 3,\r\n      \"number_of_replicas\": 1\r\n    },\r\n    \"aliases\": {\r\n      \"logs_alias\": {}\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**레거시 템플릿과 차이**:\r\n- 레거시: `_template` API (deprecated)\r\n- 현재: `_index_template` + `_component_template`",
    "references": [
      {
        "title": "Index templates",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/index-templates.html"
      }
    ]
  },
  {
    "id": "ES-025",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch에서 인덱스가 특정 조건(max_age, max_size, max_docs)을 충족하면 자동으로 새 인덱스를 생성하는 롤오버(Rollover) 전략과 사용 사례에 대해 설명해주세요.",
    "answer": "**롤오버(Rollover)**는 인덱스가 특정 조건을 충족하면 자동으로 새 인덱스를 생성하고 alias를 전환하는 기능입니다.\r\n\r\n**롤오버 조건**:\r\n- `max_age`: 인덱스 생성 후 경과 시간\r\n- `max_docs`: 최대 도큐먼트 수\r\n- `max_size`: 프라이머리 샤드 최대 크기\r\n- `max_primary_shard_size`: 개별 프라이머리 샤드 크기\r\n\r\n**설정 방법**:\r\n\r\n1. **초기 인덱스 및 Alias 생성**:\r\n```json\r\nPUT logs-000001\r\n{\r\n  \"aliases\": { \"logs_write\": { \"is_write_index\": true }}\r\n}\r\n```\r\n\r\n2. **롤오버 실행**:\r\n```json\r\nPOST logs_write/_rollover\r\n{\r\n  \"conditions\": {\r\n    \"max_age\": \"7d\",\r\n    \"max_size\": \"50gb\",\r\n    \"max_docs\": 10000000\r\n  }\r\n}\r\n```\r\n\r\n3. **ILM과 연동** (권장):\r\n```json\r\nPUT _ilm/policy/logs_policy\r\n{\r\n  \"policy\": {\r\n    \"phases\": {\r\n      \"hot\": {\r\n        \"actions\": {\r\n          \"rollover\": { \"max_size\": \"50gb\", \"max_age\": \"7d\" }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**사용 사례**:\r\n- 로그 데이터 관리 (일별/주별 인덱스)\r\n- 시계열 데이터 (메트릭, 이벤트)\r\n- 대용량 데이터셋 분할 관리",
    "references": [
      {
        "title": "Rollover API",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-rollover-index.html"
      }
    ]
  },
  {
    "id": "ES-026",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Suggester 기능의 동작 원리와 활용 방법은 무엇인가요?",
    "answer": "**Suggester**는 검색어 자동완성, 오타 수정, 유사어 제안 등의 기능을 제공합니다.\r\n\r\n**Suggester 유형**:\r\n\r\n1. **Term Suggester**: 개별 단어 오타 수정\r\n```json\r\n{\r\n  \"suggest\": {\r\n    \"my-suggest\": {\r\n      \"text\": \"elasticsaerch\",\r\n      \"term\": { \"field\": \"title\" }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n2. **Phrase Suggester**: 전체 구문 수정 (단어 간 관계 고려)\r\n```json\r\n{\r\n  \"suggest\": {\r\n    \"my-suggest\": {\r\n      \"text\": \"elastc serch\",\r\n      \"phrase\": { \"field\": \"title.suggest\" }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n3. **Completion Suggester**: 빠른 자동완성 (별도 데이터 구조)\r\n```json\r\n// 매핑\r\n{ \"properties\": { \"suggest\": { \"type\": \"completion\" }}}\r\n\r\n// 검색\r\n{\r\n  \"suggest\": {\r\n    \"song-suggest\": {\r\n      \"prefix\": \"ela\",\r\n      \"completion\": { \"field\": \"suggest\" }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**동작 원리**:\r\n- Term/Phrase: Edit distance 기반 유사도 계산\r\n- Completion: FST(Finite State Transducer) 자료구조로 메모리에 로드하여 빠른 검색\r\n\r\n**활용 사례**:\r\n- 검색창 자동완성\r\n- \"이것을 찾으셨나요?\" 기능\r\n- 철자 교정",
    "references": [
      {
        "title": "Suggesters",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html"
      }
    ]
  },
  {
    "id": "ES-027",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Scroll API와 Search After의 차이점 및 각각의 사용 시나리오는 무엇인가요?",
    "answer": "**기본 페이징 (`from` + `size`)**:\r\n- 10,000건 제한 (`index.max_result_window`)\r\n- 깊은 페이지에서 성능 저하\r\n\r\n**Scroll API**:\r\n- 대량 데이터 추출용 (export)\r\n- 스냅샷 시점의 결과 유지\r\n- 컨텍스트 유지로 리소스 소모\r\n\r\n```json\r\n// 초기 요청\r\nPOST /index/_search?scroll=5m\r\n{ \"size\": 1000, \"query\": { \"match_all\": {} }}\r\n\r\n// 이후 요청\r\nPOST /_search/scroll\r\n{ \"scroll\": \"5m\", \"scroll_id\": \"...\" }\r\n```\r\n\r\n**Search After**:\r\n- 실시간 페이징용\r\n- 이전 결과의 정렬 값을 기준으로 다음 페이지 조회\r\n- 무한 스크롤, 라이브 데이터에 적합\r\n\r\n```json\r\n// 첫 페이지\r\n{ \"size\": 10, \"sort\": [{ \"date\": \"asc\" }, { \"_id\": \"asc\" }]}\r\n\r\n// 다음 페이지\r\n{\r\n  \"size\": 10,\r\n  \"sort\": [{ \"date\": \"asc\" }, { \"_id\": \"asc\" }],\r\n  \"search_after\": [\"2024-01-15\", \"doc_123\"]\r\n}\r\n```\r\n\r\n**비교**:\r\n| 구분 | Scroll | Search After |\r\n|------|--------|--------------|\r\n| 용도 | 데이터 추출 | 실시간 페이징 |\r\n| 일관성 | 스냅샷 | 실시간 |\r\n| 리소스 | 높음 (컨텍스트 유지) | 낮음 |\r\n| 정렬 변경 | 불가 | 가능 |\r\n| 무작위 접근 | 불가 | 불가 |\r\n\r\n**Point in Time (PIT)** + Search After: 일관된 스냅샷 + 효율적 페이징\r\n\r\n**선택 가이드 (트레이드오프)**:\r\n- 실시간 UI 페이징: Search After (변경되는 데이터 반영)\r\n- 대량 데이터 추출/내보내기: Scroll (일관된 스냅샷)\r\n- 일관성 + 효율성 모두 필요: PIT + Search After\r\n- **주의**: Scroll은 deprecation 논의 중, 새 프로젝트는 PIT + Search After 권장",
    "references": [
      {
        "title": "Paginate search results",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html"
      }
    ]
  },
  {
    "id": "ES-028",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Time-based index의 개념과 활용 방안에 대해 설명해주세요.",
    "answer": "**Time-based Index**는 시간을 기준으로 분할된 인덱스로, 시계열 데이터 관리에 최적화되어 있습니다.\r\n\r\n**구조 예시**:\r\n```\r\nlogs-2024.01.01\r\nlogs-2024.01.02\r\nlogs-2024.01.03\r\n```\r\n\r\n**장점**:\r\n1. **효율적인 삭제**: 오래된 인덱스 전체 삭제 (도큐먼트 삭제보다 빠름)\r\n2. **검색 범위 제한**: 특정 기간만 검색하여 성능 향상\r\n3. **Hot-Warm-Cold 적용**: 시간에 따른 스토리지 티어링\r\n4. **샤드 크기 관리**: 예측 가능한 인덱스 크기\r\n\r\n**활용 방안**:\r\n\r\n1. **인덱스 템플릿 + 롤오버**:\r\n```json\r\nPUT _index_template/logs_template\r\n{\r\n  \"index_patterns\": [\"logs-*\"],\r\n  \"template\": {\r\n    \"settings\": { \"number_of_shards\": 1 }\r\n  }\r\n}\r\n```\r\n\r\n2. **ILM 정책 연동**:\r\n```json\r\nPUT _ilm/policy/logs_policy\r\n{\r\n  \"policy\": {\r\n    \"phases\": {\r\n      \"hot\": { \"actions\": { \"rollover\": { \"max_age\": \"1d\" }}},\r\n      \"delete\": { \"min_age\": \"30d\", \"actions\": { \"delete\": {} }}\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n3. **Alias를 통한 검색**:\r\n```json\r\n// 최근 7일 검색\r\nGET logs-*/_search\r\n{ \"query\": { \"range\": { \"@timestamp\": { \"gte\": \"now-7d\" }}}}\r\n```",
    "references": [
      {
        "title": "Data streams",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/data-streams.html"
      }
    ]
  },
  {
    "id": "ES-029",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "데이터 삭제 시 발생할 수 있는 이슈와 그 해결 방법은 무엇인가요?",
    "answer": "**삭제 방식**:\r\n1. **Document Delete**: `DELETE /index/_doc/id`\r\n2. **Delete by Query**: `POST /index/_delete_by_query`\r\n3. **Index Delete**: `DELETE /index`\r\n\r\n**발생 가능한 이슈**:\r\n\r\n1. **성능 저하**:\r\n   - Delete by Query는 내부적으로 검색 + 삭제 수행\r\n   - 대량 삭제 시 클러스터 부하 증가\r\n   - **해결**: `scroll_size`, `slices` 파라미터로 조절\r\n   ```json\r\n   POST /index/_delete_by_query?scroll_size=1000&slices=auto\r\n   ```\r\n\r\n2. **디스크 공간 미해제**:\r\n   - 삭제된 문서는 세그먼트에 \"삭제 표시\"만 됨\r\n   - 실제 공간은 세그먼트 병합 시 회수\r\n   - **해결**: Force Merge 실행\r\n   ```json\r\n   POST /index/_forcemerge?only_expunge_deletes=true\r\n   ```\r\n\r\n3. **버전 충돌**:\r\n   - 삭제 중 해당 문서 업데이트 시 충돌\r\n   - **해결**: `conflicts=proceed` 옵션\r\n   ```json\r\n   POST /index/_delete_by_query?conflicts=proceed\r\n   ```\r\n\r\n4. **인덱스 전체 삭제 실수**:\r\n   - **예방**: `action.destructive_requires_name: true` 설정\r\n   - 와일드카드 삭제 방지\r\n\r\n**권장 사항**:\r\n- 대량 삭제: Time-based Index + 인덱스 삭제\r\n- 개별 삭제: Document Delete API\r\n- 조건 삭제: Delete by Query (off-peak 시간)",
    "references": [
      {
        "title": "Delete by query API",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete-by-query.html"
      }
    ]
  },
  {
    "id": "ES-030",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Snapshot과 Restore 기능을 통한 백업 전략에 대해 설명해주세요.",
    "answer": "**Snapshot**은 클러스터 또는 특정 인덱스의 백업을 생성하는 기능입니다.\r\n\r\n**Repository 설정**:\r\n```json\r\nPUT _snapshot/my_backup\r\n{\r\n  \"type\": \"fs\",\r\n  \"settings\": {\r\n    \"location\": \"/mount/backups/my_backup\"\r\n  }\r\n}\r\n```\r\n\r\n지원 저장소: 파일시스템, S3, GCS, Azure Blob, HDFS\r\n\r\n**스냅샷 생성**:\r\n```json\r\nPUT _snapshot/my_backup/snapshot_1\r\n{\r\n  \"indices\": \"logs-*\",\r\n  \"ignore_unavailable\": true,\r\n  \"include_global_state\": false\r\n}\r\n```\r\n\r\n**복원**:\r\n```json\r\nPOST _snapshot/my_backup/snapshot_1/_restore\r\n{\r\n  \"indices\": \"logs-2024.01.*\",\r\n  \"rename_pattern\": \"logs-(.+)\",\r\n  \"rename_replacement\": \"restored_logs-$1\"\r\n}\r\n```\r\n\r\n**백업 전략**:\r\n\r\n1. **증분 백업**: 스냅샷은 자동으로 증분 방식 (변경분만 저장)\r\n2. **스케줄링**: SLM(Snapshot Lifecycle Management) 사용\r\n```json\r\nPUT _slm/policy/daily_snapshots\r\n{\r\n  \"schedule\": \"0 30 1 * * ?\",\r\n  \"name\": \"<daily-snap-{now/d}>\",\r\n  \"repository\": \"my_backup\",\r\n  \"config\": { \"indices\": [\"*\"] },\r\n  \"retention\": { \"expire_after\": \"30d\", \"min_count\": 5 }\r\n}\r\n```\r\n\r\n3. **권장 사항**:\r\n   - 정기적인 전체 클러스터 스냅샷\r\n   - 중요 인덱스는 별도 스냅샷\r\n   - 복원 테스트 주기적 수행",
    "references": [
      {
        "title": "Snapshot and restore",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html"
      }
    ]
  },
  {
    "id": "ES-031",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "분산 트랜잭션과 관련하여 Elasticsearch는 어떤 접근 방식을 취하나요?",
    "answer": "**Elasticsearch의 트랜잭션 특성**:\r\n\r\nElasticsearch는 **ACID 트랜잭션을 지원하지 않습니다**. 대신 다음과 같은 접근 방식을 취합니다:\r\n\r\n**1. 단일 문서 수준 원자성**:\r\n- 개별 문서의 인덱싱, 업데이트, 삭제는 원자적\r\n- 하나의 문서 작업은 완전히 성공하거나 실패\r\n\r\n**2. Optimistic Concurrency Control**:\r\n- `_version` 또는 `if_seq_no` + `if_primary_term`으로 동시성 제어\r\n```json\r\nPUT /index/_doc/1?if_seq_no=10&if_primary_term=1\r\n{ \"field\": \"value\" }\r\n```\r\n\r\n**3. Eventual Consistency**:\r\n- Primary 복제 후 Replica에 비동기 전파\r\n- `refresh_interval` 후 검색 가능\r\n- 즉각적인 일관성이 필요하면 `?refresh=true`\r\n\r\n**4. Bulk 작업**:\r\n- 개별 작업은 독립적으로 성공/실패\r\n- 전체 롤백 없음 (부분 실패 가능)\r\n\r\n**RDBMS 트랜잭션이 필요한 경우**:\r\n- 애플리케이션 레벨에서 보상 트랜잭션 구현\r\n- RDBMS를 Source of Truth로, ES는 검색용으로 분리 (권장 패턴)\r\n- Outbox 패턴 + CDC로 데이터 동기화\r\n- 2PC(Two-Phase Commit)는 분산 환경에서 성능과 복잡성 문제로 비권장\r\n\r\n**함정 주의**:\r\n- ES를 primary database로 사용하지 마세요\r\n- Bulk API의 부분 실패는 롤백되지 않습니다\r\n- 동시성 제어는 `if_seq_no` + `if_primary_term`으로 Optimistic Lock만 가능",
    "references": [
      {
        "title": "Reading and writing documents",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-replication.html"
      }
    ]
  },
  {
    "id": "ES-032",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch 버전 업그레이드 시 고려해야 할 사항은 무엇인가요?",
    "answer": "**업그레이드 전 확인사항**:\r\n\r\n1. **호환성 검토**:\r\n   - 지원 업그레이드 경로 확인 (예: 7.x → 8.x)\r\n   - Breaking Changes 문서 검토\r\n   - 플러그인, 클라이언트 라이브러리 호환성\r\n\r\n2. **Deprecation 확인**:\r\n```\r\nGET _migration/deprecations\r\n```\r\n\r\n3. **백업 필수**:\r\n```json\r\nPUT _snapshot/backup/pre_upgrade_snapshot\r\n```\r\n\r\n**업그레이드 방식**:\r\n\r\n| 방식 | 설명 | 다운타임 |\r\n|------|------|---------|\r\n| Rolling Upgrade | 노드별 순차 업그레이드 | 없음 |\r\n| Full Cluster Restart | 전체 클러스터 중지 후 업그레이드 | 있음 |\r\n| Reindex from Remote | 새 클러스터로 데이터 마이그레이션 | 없음 |\r\n\r\n**Rolling Upgrade 절차**:\r\n1. 샤드 할당 비활성화\r\n```json\r\nPUT _cluster/settings\r\n{ \"persistent\": { \"cluster.routing.allocation.enable\": \"primaries\" }}\r\n```\r\n2. 동기화 플러시 실행\r\n3. 노드 중지 → 업그레이드 → 재시작\r\n4. 클러스터 green 상태 확인\r\n5. 다음 노드 반복\r\n\r\n**주의사항**:\r\n- 인덱스 호환성: Elasticsearch N 버전은 N-1 버전에서 생성된 인덱스만 읽기 가능\r\n- 예: ES 8.x는 ES 7.x 인덱스 지원, ES 6.x 인덱스는 Reindex 필요\r\n- 매핑/설정 변경사항 확인 - Breaking Changes 문서 필수 검토\r\n- 충분한 테스트 환경에서 사전 검증\r\n- **Upgrade Assistant 활용**: Kibana에서 업그레이드 전 문제 진단 가능\r\n\r\n**트레이드오프**:\r\n- Rolling Upgrade: 무중단, 시간 오래 걸림, 버전 호환성 제약\r\n- Full Cluster Restart: 빠름, 다운타임 발생\r\n- Reindex from Remote: 가장 유연, 리소스/시간 많이 소요",
    "references": [
      {
        "title": "Upgrade Elasticsearch",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-upgrade.html"
      }
    ]
  },
  {
    "id": "ES-033",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "인덱스 롤오버와 Time-based Index를 자동화하는 Index Lifecycle Management(ILM)의 기능(Hot/Warm/Cold/Delete 단계)과 필요성에 대해 설명해주세요.",
    "answer": "**ILM(Index Lifecycle Management)**은 인덱스의 생명주기를 자동으로 관리하는 기능입니다.\r\n\r\n**필요성**:\r\n- 시간에 따른 데이터 접근 패턴 변화 대응\r\n- 스토리지 비용 최적화\r\n- 수동 관리 작업 자동화\r\n- 데이터 보존 정책 일관성 유지\r\n\r\n**생명주기 단계 (Phases)**:\r\n\r\n| 단계 | 설명 | 주요 액션 |\r\n|------|------|----------|\r\n| **Hot** | 활발한 쓰기/읽기 | rollover, set_priority |\r\n| **Warm** | 읽기 전용, 덜 빈번한 접근 | shrink, forcemerge, readonly |\r\n| **Cold** | 드문 검색, 저비용 스토리지 | searchable_snapshot |\r\n| **Frozen** | 거의 접근 없음 | partial searchable_snapshot |\r\n| **Delete** | 삭제 | delete |\r\n\r\n**정책 예시**:\r\n```json\r\nPUT _ilm/policy/logs_policy\r\n{\r\n  \"policy\": {\r\n    \"phases\": {\r\n      \"hot\": {\r\n        \"min_age\": \"0ms\",\r\n        \"actions\": {\r\n          \"rollover\": { \"max_size\": \"50gb\", \"max_age\": \"1d\" },\r\n          \"set_priority\": { \"priority\": 100 }\r\n        }\r\n      },\r\n      \"warm\": {\r\n        \"min_age\": \"7d\",\r\n        \"actions\": {\r\n          \"shrink\": { \"number_of_shards\": 1 },\r\n          \"forcemerge\": { \"max_num_segments\": 1 }\r\n        }\r\n      },\r\n      \"delete\": {\r\n        \"min_age\": \"30d\",\r\n        \"actions\": { \"delete\": {} }\r\n      }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**인덱스에 정책 적용**:\r\n```json\r\nPUT /logs-000001\r\n{\r\n  \"settings\": {\r\n    \"index.lifecycle.name\": \"logs_policy\",\r\n    \"index.lifecycle.rollover_alias\": \"logs\"\r\n  }\r\n}\r\n```\r\n\r\n**주의사항 및 트레이드오프**:\r\n- ILM 폴링 주기 기본값: 10분 (`indices.lifecycle.poll_interval`)\r\n- `min_age`는 인덱스 생성 또는 롤오버 시점 기준\r\n- **Shrink 주의**: 모든 샤드가 단일 노드에 있어야 함 - 대용량에서 실패 가능\r\n- **Forcemerge 주의**: 쓰기 작업 중인 인덱스에서는 성능 저하 유발\r\n- Hot-Warm-Cold 적용 시 노드 간 데이터 이동에 시간/리소스 소요",
    "references": [
      {
        "title": "ILM: Manage the index lifecycle",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/index-lifecycle-management.html"
      }
    ]
  },
  {
    "id": "ES-034",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Logstash, Beats 등과의 연동을 통한 데이터 수집 및 처리 방식에 대해 설명해주세요.",
    "answer": "**Elastic Stack 데이터 수집 컴포넌트**:\r\n\r\n**1. Beats (경량 데이터 수집기)**:\r\n- **Filebeat**: 로그 파일 수집\r\n- **Metricbeat**: 시스템/서비스 메트릭\r\n- **Packetbeat**: 네트워크 패킷 분석\r\n- **Heartbeat**: 업타임 모니터링\r\n- **Auditbeat**: 감사 데이터\r\n\r\n```yaml\r\n# filebeat.yml\r\nfilebeat.inputs:\r\n  - type: log\r\n    paths: [\"/var/log/*.log\"]\r\noutput.elasticsearch:\r\n  hosts: [\"localhost:9200\"]\r\n```\r\n\r\n**2. Logstash (데이터 처리 파이프라인)**:\r\n- Input → Filter → Output 구조\r\n- 복잡한 데이터 변환, 정제, 보강\r\n\r\n```ruby\r\ninput { beats { port => 5044 }}\r\nfilter {\r\n  grok { match => { \"message\" => \"%{COMBINEDAPACHELOG}\" }}\r\n  date { match => [\"timestamp\", \"dd/MMM/yyyy:HH:mm:ss Z\"] }\r\n}\r\noutput { elasticsearch { hosts => [\"localhost:9200\"] }}\r\n```\r\n\r\n**3. Ingest Pipeline (ES 내장)**:\r\n- 인덱싱 전 경량 데이터 처리\r\n- Logstash 없이 간단한 변환 수행\r\n\r\n```json\r\nPUT _ingest/pipeline/my_pipeline\r\n{\r\n  \"processors\": [\r\n    { \"grok\": { \"field\": \"message\", \"patterns\": [\"%{IP:client}\"] }},\r\n    { \"set\": { \"field\": \"processed_at\", \"value\": \"{{_ingest.timestamp}}\" }}\r\n  ]\r\n}\r\n```\r\n\r\n**아키텍처 패턴**:\r\n- 간단: Beats → Elasticsearch\r\n- 표준: Beats → Logstash → Elasticsearch\r\n- 버퍼: Beats → Kafka → Logstash → Elasticsearch",
    "references": [
      {
        "title": "Ingest pipelines",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/ingest.html"
      }
    ]
  },
  {
    "id": "ES-035",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch의 보안 기능(예: X-Pack Security)과 설정 방법에 대해 설명해주세요.",
    "answer": "**Elasticsearch Security** (기본 라이선스에 포함)는 클러스터 보안을 위한 핵심 기능을 제공합니다.\r\n\r\n**주요 보안 기능**:\r\n\r\n1. **인증 (Authentication)**:\r\n   - Native realm (내장 사용자)\r\n   - LDAP, Active Directory\r\n   - SAML, OpenID Connect\r\n   - API Key, Token\r\n\r\n2. **권한 부여 (Authorization)**:\r\n   - Role-Based Access Control (RBAC)\r\n   - 인덱스, 문서, 필드 수준 권한\r\n\r\n3. **암호화**:\r\n   - TLS/SSL (노드 간, 클라이언트-클러스터)\r\n   - 저장 데이터 암호화\r\n\r\n**기본 설정** (`elasticsearch.yml`):\r\n```yaml\r\nxpack.security.enabled: true\r\nxpack.security.transport.ssl.enabled: true\r\nxpack.security.http.ssl.enabled: true\r\n```\r\n\r\n**사용자 생성**:\r\n```json\r\nPOST _security/user/my_user\r\n{\r\n  \"password\": \"secure_password\",\r\n  \"roles\": [\"my_role\"],\r\n  \"full_name\": \"My User\"\r\n}\r\n```\r\n\r\n**역할 생성**:\r\n```json\r\nPOST _security/role/my_role\r\n{\r\n  \"cluster\": [\"monitor\"],\r\n  \"indices\": [{\r\n    \"names\": [\"logs-*\"],\r\n    \"privileges\": [\"read\", \"view_index_metadata\"]\r\n  }]\r\n}\r\n```\r\n\r\n**API Key 생성**:\r\n```json\r\nPOST _security/api_key\r\n{\r\n  \"name\": \"my-api-key\",\r\n  \"expiration\": \"30d\",\r\n  \"role_descriptors\": { \"logs_reader\": { \"indices\": [{ \"names\": [\"logs-*\"], \"privileges\": [\"read\"] }]}}\r\n}\r\n```",
    "references": [
      {
        "title": "Secure the Elastic Stack",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/secure-cluster.html"
      }
    ]
  },
  {
    "id": "ES-036",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch 보안에서 Role-Based Access Control(RBAC), Document Level Security(DLS), Field Level Security(FLS)의 차이에 대해 설명해주세요.",
    "answer": "**RBAC (Role-Based Access Control)**:\r\n역할 기반으로 클러스터, 인덱스, 필드 수준의 접근 권한을 제어합니다.\r\n\r\n```json\r\nPUT _security/role/logs_admin\r\n{\r\n  \"cluster\": [\"manage_index_templates\"],\r\n  \"indices\": [{\r\n    \"names\": [\"logs-*\"],\r\n    \"privileges\": [\"all\"]\r\n  }]\r\n}\r\n```\r\n\r\n**Document Level Security (DLS)**:\r\n역할 내에서 특정 조건에 맞는 문서만 접근할 수 있도록 제한합니다.\r\n\r\n```json\r\nPUT _security/role/team_a_viewer\r\n{\r\n  \"indices\": [{\r\n    \"names\": [\"projects-*\"],\r\n    \"privileges\": [\"read\"],\r\n    \"query\": {\r\n      \"term\": { \"team\": \"team_a\" }\r\n    }\r\n  }]\r\n}\r\n```\r\n→ `team: team_a`인 문서만 조회 가능\r\n\r\n**Field Level Security (FLS)**:\r\n특정 필드만 접근 가능하도록 제한합니다.\r\n\r\n```json\r\nPUT _security/role/public_viewer\r\n{\r\n  \"indices\": [{\r\n    \"names\": [\"users-*\"],\r\n    \"privileges\": [\"read\"],\r\n    \"field_security\": {\r\n      \"grant\": [\"name\", \"email\"],\r\n      \"except\": [\"password\", \"ssn\"]\r\n    }\r\n  }]\r\n}\r\n```\r\n\r\n**비교**:\r\n\r\n| 구분 | RBAC | DLS | FLS |\r\n|------|------|-----|-----|\r\n| 제어 수준 | 클러스터/인덱스 | 문서 | 필드 |\r\n| 적용 방식 | privileges | query | field_security |\r\n| 사용 사례 | 기본 권한 관리 | 멀티테넌시 | 민감정보 보호 |",
    "references": [
      {
        "title": "Document level security",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/document-level-security.html"
      },
      {
        "title": "Field level security",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/field-level-security.html"
      }
    ]
  },
  {
    "id": "ES-037",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Character Filter, Tokenizer, Token Filter를 조합하여 커스텀 분석기(Custom Analyzer)를 생성하고 적용하는 방법은 무엇인가요?",
    "answer": "**커스텀 분석기**는 Character Filter, Tokenizer, Token Filter를 조합하여 만듭니다.\r\n\r\n**생성 방법**:\r\n```json\r\nPUT /my_index\r\n{\r\n  \"settings\": {\r\n    \"analysis\": {\r\n      \"char_filter\": {\r\n        \"my_char_filter\": {\r\n          \"type\": \"mapping\",\r\n          \"mappings\": [\"& => and\", \"| => or\"]\r\n        }\r\n      },\r\n      \"tokenizer\": {\r\n        \"my_tokenizer\": {\r\n          \"type\": \"pattern\",\r\n          \"pattern\": \"[\\\\W_]+\"\r\n        }\r\n      },\r\n      \"filter\": {\r\n        \"my_stopwords\": {\r\n          \"type\": \"stop\",\r\n          \"stopwords\": [\"the\", \"a\", \"an\"]\r\n        }\r\n      },\r\n      \"analyzer\": {\r\n        \"my_custom_analyzer\": {\r\n          \"type\": \"custom\",\r\n          \"char_filter\": [\"my_char_filter\"],\r\n          \"tokenizer\": \"my_tokenizer\",\r\n          \"filter\": [\"lowercase\", \"my_stopwords\", \"snowball\"]\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**매핑에 적용**:\r\n```json\r\n{\r\n  \"mappings\": {\r\n    \"properties\": {\r\n      \"content\": {\r\n        \"type\": \"text\",\r\n        \"analyzer\": \"my_custom_analyzer\",\r\n        \"search_analyzer\": \"standard\"\r\n      }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**분석 테스트**:\r\n```json\r\nPOST /my_index/_analyze\r\n{\r\n  \"analyzer\": \"my_custom_analyzer\",\r\n  \"text\": \"The Quick & Brown Fox\"\r\n}\r\n// 결과: [\"quick\", \"and\", \"brown\", \"fox\"]\r\n```\r\n\r\n**한글 분석기 예시 (nori)**:\r\n```json\r\n{\r\n  \"analysis\": {\r\n    \"analyzer\": {\r\n      \"korean_analyzer\": {\r\n        \"type\": \"custom\",\r\n        \"tokenizer\": \"nori_tokenizer\",\r\n        \"filter\": [\"nori_part_of_speech\", \"nori_readingform\"]\r\n      }\r\n    }\r\n  }\r\n}\r\n```\r\n- Nori 플러그인 설치 필요: `bin/elasticsearch-plugin install analysis-nori`\r\n- `nori_tokenizer`: 한글 형태소 분석\r\n- `nori_part_of_speech`: 불필요한 품사 제거 (조사, 어미 등)\r\n- `nori_readingform`: 한자를 한글 독음으로 변환",
    "references": [
      {
        "title": "Create a custom analyzer",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-custom-analyzer.html"
      }
    ]
  },
  {
    "id": "ES-038",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Document Level Security를 활용하여 멀티테넌시를 지원하기 위한 Elasticsearch의 접근 방식(테넌트별 인덱스, DLS, Alias 필터 등)은 무엇인가요?",
    "answer": "**멀티테넌시**는 여러 테넌트(사용자/조직)가 동일한 Elasticsearch 클러스터를 공유하면서 데이터를 격리하는 방식입니다.\r\n\r\n**접근 방식**:\r\n\r\n**1. 테넌트별 인덱스**:\r\n```\r\ntenant_a_logs\r\ntenant_b_logs\r\ntenant_c_logs\r\n```\r\n- 장점: 완전한 격리, 독립적 매핑/설정\r\n- 단점: 인덱스 수 증가, 관리 복잡성\r\n\r\n**2. 테넌트 필드 + DLS**:\r\n```json\r\n// 단일 인덱스에 tenant_id 필드\r\n{ \"tenant_id\": \"tenant_a\", \"data\": \"...\" }\r\n\r\n// DLS로 접근 제어\r\nPUT _security/role/tenant_a_role\r\n{\r\n  \"indices\": [{\r\n    \"names\": [\"shared_logs\"],\r\n    \"privileges\": [\"read\"],\r\n    \"query\": { \"term\": { \"tenant_id\": \"tenant_a\" }}\r\n  }]\r\n}\r\n```\r\n- 장점: 인덱스 관리 단순화\r\n- 단점: 잘못된 쿼리로 데이터 노출 위험\r\n\r\n**3. 인덱스 Alias + 필터**:\r\n```json\r\nPOST _aliases\r\n{\r\n  \"actions\": [{\r\n    \"add\": {\r\n      \"index\": \"logs\",\r\n      \"alias\": \"tenant_a_logs\",\r\n      \"filter\": { \"term\": { \"tenant_id\": \"tenant_a\" }}\r\n    }\r\n  }]\r\n}\r\n```\r\n\r\n**4. 별도 클러스터**:\r\n- 장점: 완전한 격리, 성능 영향 없음\r\n- 단점: 운영 비용 증가\r\n\r\n**선택 기준**:\r\n| 요구사항 | 권장 방식 |\r\n|---------|----------|\r\n| 강력한 격리 | 별도 클러스터 |\r\n| 많은 테넌트 | DLS + 단일 인덱스 |\r\n| 독립적 설정 필요 | 테넌트별 인덱스 |",
    "references": [
      {
        "title": "Document level security",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/document-level-security.html"
      }
    ]
  },
  {
    "id": "ES-039",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Bulk API 사용 시 성능 최적화 및 주의사항은 무엇인가요?",
    "answer": "**Bulk API**는 여러 인덱싱/삭제/업데이트 작업을 단일 요청으로 처리합니다.\r\n\r\n**기본 구조**:\r\n```json\r\nPOST _bulk\r\n{ \"index\": { \"_index\": \"logs\", \"_id\": \"1\" }}\r\n{ \"field1\": \"value1\" }\r\n{ \"delete\": { \"_index\": \"logs\", \"_id\": \"2\" }}\r\n{ \"update\": { \"_index\": \"logs\", \"_id\": \"3\" }}\r\n{ \"doc\": { \"field2\": \"value2\" }}\r\n```\r\n\r\n**성능 최적화**:\r\n\r\n1. **적절한 배치 크기**:\r\n   - 권장: 5-15MB per request (Elastic 공식 권장)\r\n   - 문서 수보다 바이트 크기 기준 - 문서 크기에 따라 조절\r\n   - 테스트로 최적값 찾기 (클러스터/워크로드에 따라 다름)\r\n   - 너무 큰 배치: 메모리 압박, 타임아웃 위험\r\n   - 너무 작은 배치: 오버헤드 증가\r\n\r\n2. **병렬 처리**:\r\n   - 여러 스레드에서 동시 Bulk 요청\r\n   - 노드 수 × 2 정도의 병렬 요청\r\n\r\n3. **Refresh 비활성화**:\r\n```json\r\nPUT /logs/_settings\r\n{ \"refresh_interval\": \"-1\" }\r\n// 벌크 완료 후\r\nPUT /logs/_settings\r\n{ \"refresh_interval\": \"1s\" }\r\n```\r\n\r\n4. **Replica 비활성화** (초기 로딩 시):\r\n```json\r\nPUT /logs/_settings\r\n{ \"number_of_replicas\": 0 }\r\n```\r\n\r\n**주의사항**:\r\n\r\n- **응답 확인**: 부분 실패 가능, `errors: true` 체크\r\n```json\r\n{\r\n  \"errors\": true,\r\n  \"items\": [\r\n    { \"index\": { \"status\": 201 }},\r\n    { \"index\": { \"status\": 400, \"error\": {...} }}\r\n  ]\r\n}\r\n```\r\n\r\n- **재시도 로직**: 429 (Too Many Requests) 시 백오프\r\n\r\n- **메모리 관리**: 너무 큰 배치는 OOM 위험\r\n\r\n- **순서 보장**: 동일 문서 작업은 순서대로 처리",
    "references": [
      {
        "title": "Bulk API",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html"
      }
    ]
  },
  {
    "id": "ES-040",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "검색 지연시간(Latency)과 인덱싱 처리량(Throughput) 튜닝을 위한 Elasticsearch 설정 방법에 대해 설명해주세요.",
    "answer": "**Latency (지연시간)** 최적화:\r\n\r\n1. **검색 성능**:\r\n```json\r\n// Filter Context 활용 (캐싱)\r\n{ \"bool\": { \"filter\": [{ \"term\": { \"status\": \"active\" }}]}}\r\n\r\n// 불필요한 필드 제외\r\n{ \"_source\": [\"title\", \"date\"], \"query\": {...} }\r\n\r\n// 라우팅으로 샤드 접근 최소화\r\nGET /logs/_search?routing=user_123\r\n```\r\n\r\n2. **힙 메모리 설정**:\r\n```yaml\r\n# jvm.options\r\n-Xms16g\r\n-Xmx16g  # 전체 메모리의 50%, 최대 32GB\r\n```\r\n\r\n3. **Thread Pool 조정**:\r\n```yaml\r\nthread_pool.search.size: 13\r\nthread_pool.search.queue_size: 1000\r\n```\r\n\r\n**Throughput (처리량)** 최적화:\r\n\r\n1. **인덱싱 성능**:\r\n```json\r\nPUT /logs/_settings\r\n{\r\n  \"refresh_interval\": \"30s\",  // 기본 1s\r\n  \"translog.durability\": \"async\",\r\n  \"translog.sync_interval\": \"30s\"\r\n}\r\n```\r\n\r\n2. **Bulk 처리**:\r\n   - 적절한 배치 크기 (5-15MB)\r\n   - 병렬 요청 활용\r\n\r\n3. **Merge 설정**:\r\n```json\r\n{\r\n  \"index.merge.scheduler.max_thread_count\": 1  // HDD인 경우\r\n}\r\n```\r\n\r\n**모니터링 지표**:\r\n| 지표 | 확인 방법 |\r\n|------|----------|\r\n| 검색 지연 | `_nodes/stats/indices/search` |\r\n| 인덱싱 속도 | `_nodes/stats/indices/indexing` |\r\n| GC 시간 | `_nodes/stats/jvm` |\r\n| 큐 대기 | `_nodes/stats/thread_pool` |",
    "references": [
      {
        "title": "Tune for indexing speed",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-indexing-speed.html"
      }
    ]
  },
  {
    "id": "ES-041",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Bool Query, Nested Query, Multi-match, Function Score 등을 조합하여 복잡한 검색 조건을 구현하기 위한 Query DSL 활용 사례를 설명해주세요.",
    "answer": "**복합 검색 예시**:\r\n\r\n**1. 다중 조건 검색** (AND, OR, NOT 조합):\r\n```json\r\n{\r\n  \"query\": {\r\n    \"bool\": {\r\n      \"must\": [\r\n        { \"match\": { \"title\": \"elasticsearch\" }},\r\n        { \"range\": { \"price\": { \"gte\": 10, \"lte\": 100 }}}\r\n      ],\r\n      \"should\": [\r\n        { \"term\": { \"featured\": true }},\r\n        { \"match\": { \"category\": \"technology\" }}\r\n      ],\r\n      \"must_not\": [\r\n        { \"term\": { \"status\": \"deleted\" }}\r\n      ],\r\n      \"filter\": [\r\n        { \"term\": { \"available\": true }}\r\n      ],\r\n      \"minimum_should_match\": 1\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**2. Nested 객체 검색**:\r\n```json\r\n{\r\n  \"query\": {\r\n    \"nested\": {\r\n      \"path\": \"comments\",\r\n      \"query\": {\r\n        \"bool\": {\r\n          \"must\": [\r\n            { \"match\": { \"comments.author\": \"kim\" }},\r\n            { \"range\": { \"comments.date\": { \"gte\": \"2024-01-01\" }}}\r\n          ]\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**3. 다중 필드 + 가중치**:\r\n```json\r\n{\r\n  \"query\": {\r\n    \"multi_match\": {\r\n      \"query\": \"elasticsearch guide\",\r\n      \"fields\": [\"title^3\", \"content\", \"tags^2\"],\r\n      \"type\": \"best_fields\",\r\n      \"tie_breaker\": 0.3\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**4. Function Score** (커스텀 점수):\r\n```json\r\n{\r\n  \"query\": {\r\n    \"function_score\": {\r\n      \"query\": { \"match\": { \"content\": \"elasticsearch\" }},\r\n      \"functions\": [\r\n        { \"filter\": { \"term\": { \"featured\": true }}, \"weight\": 10 },\r\n        { \"gauss\": { \"date\": { \"origin\": \"now\", \"scale\": \"30d\" }}},\r\n        { \"field_value_factor\": { \"field\": \"popularity\", \"modifier\": \"log1p\" }}\r\n      ],\r\n      \"score_mode\": \"sum\",\r\n      \"boost_mode\": \"multiply\"\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**5. Aggregation + 필터**:\r\n```json\r\n{\r\n  \"query\": { \"match\": { \"category\": \"electronics\" }},\r\n  \"aggs\": {\r\n    \"price_ranges\": {\r\n      \"range\": { \"field\": \"price\", \"ranges\": [{ \"to\": 100 }, { \"from\": 100, \"to\": 500 }, { \"from\": 500 }]}\r\n    },\r\n    \"avg_rating\": { \"avg\": { \"field\": \"rating\" }}\r\n  }\r\n}\r\n```",
    "references": [
      {
        "title": "Compound queries",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/compound-queries.html"
      }
    ]
  },
  {
    "id": "ES-042",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Reindex API의 사용 목적과 동작 방식에 대해 설명해주세요.",
    "answer": "**Reindex API**는 한 인덱스의 데이터를 다른 인덱스로 복사합니다.\r\n\r\n**사용 목적**:\r\n- 매핑 변경 (기존 필드 타입 변경 불가하므로)\r\n- 샤드 수 변경\r\n- 분석기 변경\r\n- 인덱스 분할/병합\r\n- 데이터 마이그레이션\r\n\r\n**기본 사용법**:\r\n```json\r\nPOST _reindex\r\n{\r\n  \"source\": { \"index\": \"old_index\" },\r\n  \"dest\": { \"index\": \"new_index\" }\r\n}\r\n```\r\n\r\n**고급 옵션**:\r\n\r\n**1. 선택적 복사** (쿼리 적용):\r\n```json\r\nPOST _reindex\r\n{\r\n  \"source\": {\r\n    \"index\": \"logs\",\r\n    \"query\": { \"range\": { \"date\": { \"gte\": \"2024-01-01\" }}}\r\n  },\r\n  \"dest\": { \"index\": \"logs_2024\" }\r\n}\r\n```\r\n\r\n**2. 필드 변환** (스크립트):\r\n```json\r\nPOST _reindex\r\n{\r\n  \"source\": { \"index\": \"old_index\" },\r\n  \"dest\": { \"index\": \"new_index\" },\r\n  \"script\": {\r\n    \"source\": \"ctx._source.status = ctx._source.remove('old_status')\"\r\n  }\r\n}\r\n```\r\n\r\n**3. 원격 클러스터에서 복사**:\r\n```json\r\nPOST _reindex\r\n{\r\n  \"source\": {\r\n    \"remote\": { \"host\": \"http://remote:9200\" },\r\n    \"index\": \"remote_index\"\r\n  },\r\n  \"dest\": { \"index\": \"local_index\" }\r\n}\r\n```\r\n\r\n**4. 비동기 실행**:\r\n```json\r\nPOST _reindex?wait_for_completion=false\r\n// Task API로 진행 상황 확인\r\nGET _tasks/task_id\r\n```\r\n\r\n**성능 최적화**:\r\n- `slices: auto` - 병렬 처리\r\n- `refresh: false` - 완료 후 수동 refresh\r\n- `requests_per_second` - 스로틀링\r\n\r\n**주의사항 및 트레이드오프**:\r\n- Reindex는 새 인덱스에 데이터를 복사하므로 디스크 공간이 2배 필요\r\n- 대용량 인덱스는 시간이 오래 걸림 - 서비스 중단 없이 진행하려면 Alias 전환 방식 사용\r\n- 원격 Reindex 시 `reindex.remote.whitelist` 설정 필요\r\n- **권장 절차**:\r\n  1. 새 인덱스 생성 (새 매핑 적용)\r\n  2. Reindex 실행 (비동기)\r\n  3. 완료 후 Alias를 새 인덱스로 전환\r\n  4. 기존 인덱스 삭제",
    "references": [
      {
        "title": "Reindex API",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html"
      }
    ]
  },
  {
    "id": "ES-043",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Snapshot Repository 구성 및 관리 방법에 대해 설명해주세요.",
    "answer": "**Snapshot Repository**는 스냅샷을 저장하는 위치입니다.\r\n\r\n**지원 저장소 유형**:\r\n- Shared File System (`fs`)\r\n- AWS S3 (`s3`)\r\n- Google Cloud Storage (`gcs`)\r\n- Azure Blob Storage (`azure`)\r\n- HDFS (`hdfs`)\r\n\r\n**파일시스템 Repository 구성**:\r\n\r\n1. **경로 설정** (`elasticsearch.yml`):\r\n```yaml\r\npath.repo: [\"/mount/backups\"]\r\n```\r\n\r\n2. **Repository 생성**:\r\n```json\r\nPUT _snapshot/my_backup\r\n{\r\n  \"type\": \"fs\",\r\n  \"settings\": {\r\n    \"location\": \"/mount/backups/my_backup\",\r\n    \"compress\": true\r\n  }\r\n}\r\n```\r\n\r\n**S3 Repository 구성**:\r\n```json\r\nPUT _snapshot/s3_backup\r\n{\r\n  \"type\": \"s3\",\r\n  \"settings\": {\r\n    \"bucket\": \"my-bucket\",\r\n    \"region\": \"ap-northeast-2\",\r\n    \"base_path\": \"elasticsearch/snapshots\"\r\n  }\r\n}\r\n```\r\n\r\n**관리 작업**:\r\n\r\n**Repository 확인**:\r\n```\r\nGET _snapshot/_all\r\nGET _snapshot/my_backup\r\n```\r\n\r\n**Repository 검증**:\r\n```\r\nPOST _snapshot/my_backup/_verify\r\n```\r\n\r\n**스냅샷 목록**:\r\n```\r\nGET _snapshot/my_backup/_all\r\n```\r\n\r\n**스냅샷 상태**:\r\n```\r\nGET _snapshot/my_backup/snapshot_1/_status\r\n```\r\n\r\n**Repository 삭제**:\r\n```\r\nDELETE _snapshot/my_backup\r\n```\r\n\r\n**주의사항**:\r\n- 여러 클러스터가 같은 repository 공유 시 읽기 전용 설정 필요\r\n- Repository 삭제 전 스냅샷 먼저 삭제\r\n- 충분한 저장 공간 확보",
    "references": [
      {
        "title": "Register a snapshot repository",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshots-register-repository.html"
      }
    ]
  },
  {
    "id": "ES-044",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "데이터 정합성(consistency) 모델과 Elasticsearch의 eventual consistency 특성에 대해 설명해주세요.",
    "answer": "**Elasticsearch의 일관성 모델**:\r\n\r\nElasticsearch는 **Eventual Consistency (최종 일관성)** 모델을 따릅니다.\r\n\r\n**쓰기 일관성**:\r\n\r\n1. **Primary-Replica 복제**:\r\n   - 쓰기는 Primary Shard에서 먼저 처리\r\n   - 이후 Replica에 복제\r\n   - 기본적으로 모든 in-sync replica 복제 완료 후 응답\r\n\r\n2. **wait_for_active_shards 설정**:\r\n```json\r\nPUT /logs/_doc/1?wait_for_active_shards=2\r\n{ \"message\": \"test\" }\r\n```\r\n   - `1`: Primary만\r\n   - `all`: 모든 복제본\r\n   - 숫자: 지정된 수의 샤드\r\n\r\n**읽기 일관성**:\r\n\r\n1. **Refresh 간격**:\r\n   - 기본 1초마다 refresh\r\n   - refresh 전에는 새 데이터 검색 불가\r\n\r\n2. **실시간 읽기**:\r\n```json\r\n// 즉시 refresh 후 검색 가능\r\nPUT /logs/_doc/1?refresh=true\r\n\r\n// GET API는 translog에서 읽어 실시간\r\nGET /logs/_doc/1\r\n```\r\n\r\n**일관성 보장 수준**:\r\n\r\n| 작업 | 일관성 |\r\n|------|--------|\r\n| GET (by ID) | 강한 일관성 |\r\n| Search | Eventual (refresh 후) |\r\n| Write | 설정에 따라 조절 가능 |\r\n\r\n**Eventual Consistency 영향**:\r\n- 쓰기 직후 검색 시 결과에 포함 안 될 수 있음\r\n- Read-after-Write 보장 필요 시 `refresh=true` 사용\r\n\r\n**ACID와의 비교**:\r\n- Elasticsearch는 단일 문서 수준의 원자성만 보장\r\n- 다중 문서 트랜잭션 미지원\r\n- 분산 환경에서 가용성과 성능 우선\r\n\r\n**트레이드오프 (CAP 정리 관점)**:\r\n- Elasticsearch는 AP(Availability, Partition tolerance) 시스템에 가까움\r\n- Strong Consistency보다 Availability와 성능을 우선시\r\n- **실무 팁**:\r\n  - 검색용으로 ES 사용, Source of Truth는 RDBMS 유지\r\n  - `refresh=true`는 성능 저하를 유발하므로 꼭 필요한 경우에만 사용\r\n  - `refresh=wait_for`는 다음 주기적 refresh까지 대기 (절충안)",
    "references": [
      {
        "title": "Near real-time search",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/near-real-time.html"
      }
    ]
  },
  {
    "id": "ES-045",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "인덱스 및 도큐먼트 크기 최적화를 위한 전략은 무엇인가요?",
    "answer": "**인덱스 크기 최적화**:\r\n\r\n**1. 불필요한 필드 제거**:\r\n```json\r\n{\r\n  \"mappings\": {\r\n    \"properties\": {\r\n      \"content\": {\r\n        \"type\": \"text\",\r\n        \"index\": false  // 검색 불필요 시\r\n      },\r\n      \"metadata\": {\r\n        \"type\": \"object\",\r\n        \"enabled\": false  // 인덱싱/검색 불필요 시\r\n      }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**2. doc_values 비활성화** (정렬/집계 불필요 시):\r\n- 주의: `text` 필드는 기본적으로 doc_values가 비활성화되어 있음\r\n- `keyword`, 숫자, 날짜 등 정렬/집계에 사용하지 않는 필드에 적용\r\n```json\r\n{\r\n  \"properties\": {\r\n    \"code\": { \"type\": \"keyword\", \"doc_values\": false }\r\n  }\r\n}\r\n```\r\n\r\n**3. _source 필드 관리**:\r\n```json\r\n{\r\n  \"mappings\": {\r\n    \"_source\": {\r\n      \"excludes\": [\"large_field\", \"internal_*\"]\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**4. 적절한 데이터 타입**:\r\n- `keyword` vs `text` 선택\r\n- `integer` vs `long` vs `short`\r\n- `scaled_float` 사용 (정밀도 조절)\r\n\r\n**도큐먼트 크기 최적화**:\r\n\r\n**1. 정규화 vs 비정규화**:\r\n- 자주 변경되는 데이터: 정규화 (별도 인덱스)\r\n- 검색 성능 중요: 비정규화 (임베딩)\r\n\r\n**2. 배열 크기 제한**:\r\n```json\r\n{ \"index.mapping.total_fields.limit\": 1000 }\r\n```\r\n\r\n**3. Nested 객체 제한**:\r\n- 과도한 nested 객체는 성능 저하\r\n- 가능하면 flattened 타입 고려\r\n\r\n**Force Merge**:\r\n```json\r\nPOST /logs/_forcemerge?max_num_segments=1\r\n```\r\n- 읽기 전용 인덱스에 적용\r\n- 세그먼트 수 감소로 검색 성능 향상",
    "references": [
      {
        "title": "Tune for disk usage",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-disk-usage.html"
      }
    ]
  },
  {
    "id": "ES-046",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "파이프라인(pipeline) 처리 기능과 Ingest Node의 역할에 대해 설명해주세요.",
    "answer": "**Ingest Pipeline**은 인덱싱 전 데이터를 변환, 보강, 정제하는 기능입니다.\r\n\r\n**Ingest Node 역할**:\r\n- 파이프라인 프로세서 실행\r\n- 인덱싱 전 데이터 전처리\r\n- Logstash 대체 가능 (간단한 변환)\r\n\r\n**파이프라인 구성요소**:\r\n- **Processors**: 데이터 변환 단위\r\n- **on_failure**: 오류 처리\r\n\r\n**파이프라인 생성**:\r\n```json\r\nPUT _ingest/pipeline/my_pipeline\r\n{\r\n  \"description\": \"My processing pipeline\",\r\n  \"processors\": [\r\n    {\r\n      \"grok\": {\r\n        \"field\": \"message\",\r\n        \"patterns\": [\"%{IP:client_ip} %{WORD:method} %{URIPATHPARAM:request}\"]\r\n      }\r\n    },\r\n    {\r\n      \"date\": {\r\n        \"field\": \"timestamp\",\r\n        \"formats\": [\"ISO8601\", \"yyyy-MM-dd HH:mm:ss\"]\r\n      }\r\n    },\r\n    {\r\n      \"set\": {\r\n        \"field\": \"processed_at\",\r\n        \"value\": \"{{_ingest.timestamp}}\"\r\n      }\r\n    },\r\n    {\r\n      \"remove\": {\r\n        \"field\": \"temp_field\",\r\n        \"ignore_missing\": true\r\n      }\r\n    }\r\n  ],\r\n  \"on_failure\": [\r\n    {\r\n      \"set\": {\r\n        \"field\": \"error\",\r\n        \"value\": \"{{ _ingest.on_failure_message }}\"\r\n      }\r\n    }\r\n  ]\r\n}\r\n```\r\n\r\n**주요 프로세서**:\r\n| 프로세서 | 기능 |\r\n|---------|------|\r\n| grok | 정규식 패턴 추출 |\r\n| date | 날짜 파싱 |\r\n| set | 필드 값 설정 |\r\n| remove | 필드 삭제 |\r\n| rename | 필드명 변경 |\r\n| convert | 타입 변환 |\r\n| script | 커스텀 스크립트 |\r\n| enrich | 외부 데이터 보강 |\r\n\r\n**파이프라인 적용**:\r\n```json\r\n// 인덱싱 시 지정\r\nPUT /logs/_doc/1?pipeline=my_pipeline\r\n{ \"message\": \"192.168.1.1 GET /index.html\" }\r\n\r\n// 인덱스 기본 파이프라인\r\nPUT /logs/_settings\r\n{ \"index.default_pipeline\": \"my_pipeline\" }\r\n```",
    "references": [
      {
        "title": "Ingest pipelines",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/ingest.html"
      }
    ]
  },
  {
    "id": "ES-047",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Hot-Warm-Cold 아키텍처의 개념과 구현 방법에 대해 설명해주세요.",
    "answer": "**Hot-Warm-Cold 아키텍처**는 데이터 접근 패턴에 따라 스토리지 티어를 분리하여 비용과 성능을 최적화합니다.\r\n\r\n**티어별 특성**:\r\n\r\n| 티어 | 데이터 특성 | 하드웨어 | 접근 빈도 |\r\n|------|-----------|---------|----------|\r\n| **Hot** | 최신, 활발한 쓰기/읽기 | SSD, 고성능 | 높음 |\r\n| **Warm** | 과거, 읽기 전용 | HDD, 중간 | 중간 |\r\n| **Cold** | 오래된, 드문 접근 | 대용량 HDD | 낮음 |\r\n| **Frozen** | 아카이브 | 오브젝트 스토리지 | 매우 낮음 |\r\n\r\n**구현 방법**:\r\n\r\n**1. 노드 역할 설정** (`elasticsearch.yml`):\r\n```yaml\r\n# Hot node\r\nnode.roles: [ data_hot ]\r\n\r\n# Warm node\r\nnode.roles: [ data_warm ]\r\n\r\n# Cold node\r\nnode.roles: [ data_cold ]\r\n```\r\n\r\n**2. ILM 정책 설정**:\r\n```json\r\nPUT _ilm/policy/hot_warm_cold_policy\r\n{\r\n  \"policy\": {\r\n    \"phases\": {\r\n      \"hot\": {\r\n        \"actions\": {\r\n          \"rollover\": { \"max_size\": \"50gb\", \"max_age\": \"1d\" },\r\n          \"set_priority\": { \"priority\": 100 }\r\n        }\r\n      },\r\n      \"warm\": {\r\n        \"min_age\": \"7d\",\r\n        \"actions\": {\r\n          \"shrink\": { \"number_of_shards\": 1 },\r\n          \"forcemerge\": { \"max_num_segments\": 1 },\r\n          \"allocate\": { \"require\": { \"data\": \"warm\" }},\r\n          \"set_priority\": { \"priority\": 50 }\r\n        }\r\n      },\r\n      \"cold\": {\r\n        \"min_age\": \"30d\",\r\n        \"actions\": {\r\n          \"allocate\": { \"require\": { \"data\": \"cold\" }},\r\n          \"set_priority\": { \"priority\": 0 }\r\n        }\r\n      },\r\n      \"delete\": {\r\n        \"min_age\": \"90d\",\r\n        \"actions\": { \"delete\": {} }\r\n      }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**3. 인덱스 템플릿 연결**:\r\n```json\r\nPUT _index_template/logs_template\r\n{\r\n  \"index_patterns\": [\"logs-*\"],\r\n  \"template\": {\r\n    \"settings\": {\r\n      \"index.lifecycle.name\": \"hot_warm_cold_policy\",\r\n      \"index.lifecycle.rollover_alias\": \"logs\"\r\n    }\r\n  }\r\n}\r\n```",
    "references": [
      {
        "title": "Data tiers",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/data-tiers.html"
      }
    ]
  },
  {
    "id": "ES-048",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "커스텀 스크립팅의 활용과 성능에 미치는 영향에 대해 설명해주세요.",
    "answer": "**Painless**는 Elasticsearch의 기본 스크립팅 언어로, 안전하고 빠른 스크립트 실행을 지원합니다.\r\n\r\n**활용 사례**:\r\n\r\n**1. 스크립트 필드**:\r\n```json\r\n{\r\n  \"script_fields\": {\r\n    \"total_price\": {\r\n      \"script\": {\r\n        \"source\": \"doc['price'].value * doc['quantity'].value\"\r\n      }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**2. 스크립트 업데이트**:\r\n```json\r\nPOST /products/_update/1\r\n{\r\n  \"script\": {\r\n    \"source\": \"ctx._source.stock -= params.sold\",\r\n    \"params\": { \"sold\": 5 }\r\n  }\r\n}\r\n```\r\n\r\n**3. 스크립트 쿼리**:\r\n```json\r\n{\r\n  \"query\": {\r\n    \"script_score\": {\r\n      \"query\": { \"match_all\": {} },\r\n      \"script\": {\r\n        \"source\": \"doc['popularity'].value * Math.log(doc['views'].value + 1)\"\r\n      }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**4. Ingest Pipeline**:\r\n```json\r\n{\r\n  \"script\": {\r\n    \"source\": \"ctx.fullname = ctx.first_name + ' ' + ctx.last_name\"\r\n  }\r\n}\r\n```\r\n\r\n**성능 영향**:\r\n\r\n| 요소 | 영향 | 권장 사항 |\r\n|------|------|----------|\r\n| 컴파일 | 초기 비용 발생 | 파라미터화로 재사용 |\r\n| doc_values | 빠른 필드 접근 | `doc['field'].value` 사용 |\r\n| _source | 느린 접근 | 가능하면 피하기 |\r\n| 복잡한 로직 | CPU 부하 | 단순화, 인덱싱 시 계산 |\r\n\r\n**최적화 방법**:\r\n\r\n```json\r\n// 나쁜 예 - 매번 컴파일\r\n{ \"source\": \"doc['price'].value * 1.1\" }\r\n\r\n// 좋은 예 - 파라미터화\r\n{\r\n  \"source\": \"doc['price'].value * params.rate\",\r\n  \"params\": { \"rate\": 1.1 }\r\n}\r\n```\r\n\r\n**컴파일 캐시 설정**:\r\n```yaml\r\nscript.cache.max_size: 500\r\nscript.cache.expire: 10m\r\n```",
    "references": [
      {
        "title": "Painless scripting language",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting-painless.html"
      }
    ]
  },
  {
    "id": "ES-049",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch 클러스터에서 발생할 수 있는 장애와 복구 전략은 무엇인가요?",
    "answer": "**주요 장애 유형과 복구 전략**:\r\n\r\n**1. 노드 장애**:\r\n- **증상**: 클러스터 Yellow/Red 상태\r\n- **자동 복구**: Replica가 Primary로 승격\r\n- **수동 복구**: 노드 재시작 또는 교체\r\n\r\n```json\r\n// 샤드 할당 상태 확인\r\nGET _cluster/allocation/explain\r\n\r\n// 강제 샤드 재할당\r\nPOST _cluster/reroute\r\n{\r\n  \"commands\": [{\r\n    \"allocate_replica\": {\r\n      \"index\": \"logs\", \"shard\": 0, \"node\": \"node-2\"\r\n    }\r\n  }]\r\n}\r\n```\r\n\r\n**2. 마스터 노드 장애**:\r\n- **증상**: 클러스터 작업 불가\r\n- **자동 복구**: Master-eligible 노드 중 새 마스터 선출\r\n- **예방**: 최소 3개 Master-eligible 노드\r\n\r\n**3. 디스크 용량 부족**:\r\n- **증상**: 인덱싱 차단, Read-only 전환\r\n- **복구**:\r\n```json\r\n// Read-only 해제\r\nPUT _all/_settings\r\n{ \"index.blocks.read_only_allow_delete\": null }\r\n\r\n// 디스크 워터마크 조정\r\nPUT _cluster/settings\r\n{\r\n  \"transient\": {\r\n    \"cluster.routing.allocation.disk.watermark.flood_stage\": \"95%\"\r\n  }\r\n}\r\n```\r\n\r\n**4. 데이터 손상**:\r\n- **복구**: 스냅샷에서 복원\r\n```json\r\nPOST _snapshot/my_backup/snapshot_1/_restore\r\n{\r\n  \"indices\": \"corrupted_index\"\r\n}\r\n```\r\n\r\n**5. Split-Brain**:\r\n- **7.x 이전**: `discovery.zen.minimum_master_nodes` 설정 필요 (N/2 + 1)\r\n- **7.x 이후**: 자동 quorum 관리로 설정 불필요\r\n  - `cluster.initial_master_nodes`로 초기 마스터 노드 지정\r\n  - 이후 클러스터가 자동으로 투표 설정 관리\r\n\r\n**모니터링 및 예방**:\r\n```json\r\n// 클러스터 상태 확인\r\nGET _cluster/health\r\n\r\n// 미할당 샤드 확인\r\nGET _cat/shards?v&h=index,shard,prirep,state,unassigned.reason&s=state\r\n```",
    "references": [
      {
        "title": "Fix common cluster issues",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/fix-common-cluster-issues.html"
      }
    ]
  },
  {
    "id": "ES-050",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "최근 Elasticsearch의 업데이트 및 새로운 기능에 대해 알고 있는 내용을 공유해주세요.",
    "answer": "**Elasticsearch 8.x 주요 기능**:\r\n\r\n**1. 보안 기본 활성화**:\r\n- TLS, 인증이 기본으로 활성화\r\n- 설치 시 자동 인증서 생성\r\n- elastic 사용자 비밀번호 자동 생성\r\n\r\n**2. kNN (k-Nearest Neighbor) 검색**:\r\n- 벡터 유사도 검색 네이티브 지원\r\n- 시맨틱 검색, 추천 시스템에 활용\r\n```json\r\n{\r\n  \"knn\": {\r\n    \"field\": \"embedding\",\r\n    \"query_vector\": [0.1, 0.2, ...],\r\n    \"k\": 10,\r\n    \"num_candidates\": 100\r\n  }\r\n}\r\n```\r\n\r\n**3. ESQL (ES|QL)**:\r\n- 새로운 파이프 기반 쿼리 언어\r\n```\r\nFROM logs | WHERE status == 500 | STATS count = COUNT(*) BY host\r\n```\r\n\r\n**4. Serverless Elasticsearch**:\r\n- 완전 관리형 서버리스 배포 옵션\r\n- 자동 스케일링, 운영 부담 감소\r\n\r\n**5. 향상된 머신러닝**:\r\n- Transformer 모델 통합\r\n- NLP 작업 (텍스트 분류, NER, 감정 분석)\r\n- ELSER (Elastic Learned Sparse EncodeR)\r\n\r\n**6. 성능 개선**:\r\n- 더 빠른 집계\r\n- 향상된 인덱싱 속도\r\n- 메모리 사용 최적화\r\n\r\n**7. Frozen Tier 개선**:\r\n- Searchable Snapshots\r\n- 비용 효율적인 장기 데이터 보관\r\n\r\n**8. Data Streams 개선**:\r\n- TSDS (Time Series Data Streams)\r\n- 시계열 데이터 최적화 저장\r\n\r\n**9. Logsdb 인덱싱 모드** (8.15+):\r\n- 로그 데이터에 최적화된 인덱싱\r\n- synthetic _source로 저장 공간 최대 50% 절감\r\n\r\n**10. Semantic Text 필드** (8.15+):\r\n- 시맨틱 검색을 위한 새로운 필드 타입\r\n- 자동 벡터 임베딩 및 검색",
    "references": [
      {
        "title": "What's new in Elasticsearch",
        "url": "https://www.elastic.co/guide/en/elasticsearch/reference/current/release-highlights.html"
      }
    ]
  },
  {
    "id": "MONGO-001",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB란 무엇이며, RDBMS와 어떤 차이가 있나요?",
    "answer": "MongoDB는 문서 지향(Document-Oriented) NoSQL 데이터베이스입니다.\r\n\r\n**RDBMS와의 주요 차이점:**\r\n- **데이터 모델**: RDBMS는 테이블(행/열), MongoDB는 Document(BSON)\r\n- **스키마**: RDBMS는 고정 스키마, MongoDB는 유연한 스키마\r\n- **관계**: RDBMS는 JOIN, MongoDB는 Embedding 또는 Reference\r\n- **확장**: RDBMS는 수직 확장, MongoDB는 수평 확장(Sharding)",
    "references": [
      {
        "title": "SQL to MongoDB Mapping",
        "url": "https://www.mongodb.com/docs/manual/reference/sql-comparison/"
      }
    ]
  },
  {
    "id": "MONGO-002",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "NoSQL 데이터베이스의 종류(Document, Key-Value, Column-Family, Graph)와 MongoDB가 속한 유형은 무엇인가요?",
    "answer": "**NoSQL 데이터베이스 4가지 유형:**\r\n1. **Document Store**: MongoDB, CouchDB - JSON/BSON 문서 저장\r\n2. **Key-Value Store**: Redis, DynamoDB - 키-값 쌍 저장\r\n3. **Column-Family Store**: Cassandra, HBase - 컬럼 기반 저장\r\n4. **Graph Database**: Neo4j - 노드와 관계 저장\r\n\r\nMongoDB는 **Document Store** 유형에 속하며, 데이터를 BSON 형식의 문서로 저장합니다.",
    "references": [
      {
        "title": "MongoDB Introduction",
        "url": "https://www.mongodb.com/docs/manual/introduction/"
      }
    ]
  },
  {
    "id": "MONGO-003",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Document Store 기반 NoSQL인 MongoDB를 사용하는 이유와 장단점은 무엇인가요?",
    "answer": "**장점:**\r\n- 유연한 스키마로 빠른 개발 가능\r\n- 수평 확장(Sharding)이 용이\r\n- 높은 읽기/쓰기 성능 (특히 단일 Document 작업)\r\n- 풍부한 쿼리 언어와 Aggregation Framework\r\n- 내장 복제(Replica Set)로 고가용성\r\n- 개발자 친화적 (JSON 유사 구조)\r\n\r\n**단점:**\r\n- 복잡한 JOIN 연산에 비효율적 ($lookup 오버헤드)\r\n- 메모리 사용량이 높음 (Working Set을 RAM에 유지해야 성능 보장)\r\n- Multi-Document 트랜잭션 오버헤드\r\n- 데이터 중복 가능성 (비정규화 시)\r\n\r\n**MongoDB가 적합한 경우:**\r\n- 빠른 프로토타이핑/MVP 개발\r\n- 스키마가 자주 변경되는 애플리케이션\r\n- 읽기가 많고 데이터가 Document 단위로 접근되는 경우\r\n- 수평 확장이 필요한 대용량 서비스\r\n\r\n**MongoDB가 부적합한 경우:**\r\n- 복잡한 JOIN이 많은 관계형 데이터\r\n- 엄격한 스키마와 데이터 무결성이 필수\r\n- 다중 테이블 트랜잭션이 핵심인 금융 시스템",
    "references": [
      {
        "title": "MongoDB Introduction",
        "url": "https://www.mongodb.com/docs/manual/introduction/"
      }
    ]
  },
  {
    "id": "MONGO-004",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB에서 사용하는 BSON이란 무엇이며, JSON과의 차이점은 무엇인가요?",
    "answer": "BSON(Binary JSON)은 JSON의 바이너리 인코딩 형식입니다.\r\n\r\n**JSON과의 차이점:**\r\n| 특성 | JSON | BSON |\r\n|------|------|------|\r\n| 형식 | 텍스트 기반 | 바이너리 |\r\n| 데이터 타입 | 기본 6개 (string, number, boolean, null, array, object) | 추가 타입 (Date, ObjectId, Binary, Decimal128, int32, int64 등) |\r\n| 파싱 속도 | 텍스트 파싱 필요 | 길이 정보 포함으로 빠른 순회 |\r\n| 저장 크기 | 일반적으로 더 작음 | 메타데이터로 약간 더 큼 |\r\n| 사용 목적 | 데이터 교환 | MongoDB 내부 저장/전송 |\r\n\r\n**BSON 추가 타입 예시:**\r\n- `ObjectId`: 12바이트 고유 식별자\r\n- `Date`: 64비트 정수 (Unix epoch 밀리초)\r\n- `Decimal128`: 고정밀 십진수 (금융 데이터용)\r\n- `Binary`: 바이너리 데이터\r\n- `Regex`: 정규표현식",
    "references": [
      {
        "title": "BSON Types",
        "url": "https://www.mongodb.com/docs/manual/reference/bson-types/"
      }
    ]
  },
  {
    "id": "MONGO-005",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB에서 BSON 기반으로 저장되는 Collection과 Document의 개념을 설명해주세요.",
    "answer": "**Document:**\r\n- MongoDB의 기본 데이터 단위 (RDBMS의 행에 해당)\r\n- BSON 형식으로 저장되는 필드-값 쌍의 집합\r\n- 최대 크기 16MB\r\n\r\n**Collection:**\r\n- Document들의 그룹 (RDBMS의 테이블에 해당)\r\n- 동적 스키마로 다른 구조의 Document 포함 가능\r\n\r\n```javascript\r\n// Document 예시\r\n{ \"_id\": ObjectId(\"...\"), \"name\": \"John\", \"age\": 30 }\r\n```",
    "references": [
      {
        "title": "Documents",
        "url": "https://www.mongodb.com/docs/manual/core/document/"
      }
    ]
  },
  {
    "id": "MONGO-006",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB Collection 내 Document들이 서로 다른 필드 구조를 가질 수 있는 스키마리스(Schema-less) 특성은 무엇을 의미하나요?",
    "answer": "스키마리스란 컬렉션 내 Document들이 동일한 필드 구조를 가질 필요가 없다는 의미입니다. 그러나 **실제로는 \"유연한 스키마(Flexible Schema)\"**라는 표현이 더 정확합니다.\r\n\r\n**특징:**\r\n- 같은 컬렉션에 다른 필드를 가진 Document 저장 가능\r\n- 필드 추가/삭제 시 스키마 변경 불필요\r\n- 빠른 개발과 반복이 가능\r\n\r\n**함정 - \"스키마리스 = 스키마 없음\"은 오해:**\r\n- MongoDB는 진정한 의미의 스키마리스가 아님\r\n- 애플리케이션은 암묵적 스키마에 의존\r\n- 인덱스는 특정 필드 구조를 가정\r\n- 쿼리와 Aggregation도 필드 존재를 기대\r\n\r\n**실무에서의 권장사항:**\r\n- **Schema Validation** 적극 활용 (3.6+)\r\n- ODM(Mongoose 등)으로 스키마 정의\r\n- 스키마 버전 관리 전략 수립\r\n\r\n```javascript\r\n// Schema Validation 예시\r\ndb.createCollection(\"users\", {\r\n  validator: {\r\n    $jsonSchema: {\r\n      required: [\"name\", \"email\"],\r\n      properties: { email: { bsonType: \"string\", pattern: \"@\" } }\r\n    }\r\n  }\r\n})\r\n```",
    "references": [
      {
        "title": "Data Modeling",
        "url": "https://www.mongodb.com/docs/manual/data-modeling/"
      }
    ]
  },
  {
    "id": "MONGO-007",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB에서 Schema Design의 중요한 원칙은 무엇인가요?",
    "answer": "**주요 설계 원칙:**\r\n1. **함께 조회되는 데이터는 함께 저장** - Embedding 활용\r\n2. **애플리케이션의 접근 패턴 기반 설계** - 읽기/쓰기 비율 고려\r\n3. **Document 크기 제한(16MB) 고려**\r\n4. **인덱싱 전략 수립**\r\n5. **데이터 중복 vs 참조 트레이드오프 판단**\r\n\r\n**Anti-patterns 피하기:**\r\n- 무한 성장하는 배열\r\n- 과도한 Embedding\r\n- 불필요한 Normalization",
    "references": [
      {
        "title": "Data Modeling Introduction",
        "url": "https://www.mongodb.com/docs/manual/core/data-modeling-introduction/"
      }
    ]
  },
  {
    "id": "MONGO-008",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB Schema Design에서 Embedding(내장)과 Referencing(참조) 방식의 차이와 각각 언제 사용하나요?",
    "answer": "**Embedding (내장):**\r\n```javascript\r\n{ \"name\": \"John\", \"address\": { \"city\": \"Seoul\", \"zip\": \"12345\" } }\r\n```\r\n- 한 번의 쿼리로 모든 데이터 조회 (읽기 성능 우수)\r\n- 1:1, 1:Few 관계에 적합\r\n- 데이터가 함께 조회될 때 사용\r\n- 원자적 업데이트 가능 (단일 Document 내)\r\n\r\n**Referencing (참조):**\r\n```javascript\r\n{ \"name\": \"John\", \"address_id\": ObjectId(\"...\") }\r\n```\r\n- 데이터 중복 방지, 저장 공간 효율적\r\n- 1:Many, Many:Many 관계에 적합\r\n- 독립적으로 접근하는 데이터에 사용\r\n- 16MB 제한 회피 가능\r\n\r\n**트레이드오프 고려사항:**\r\n| 기준 | Embedding | Referencing |\r\n|------|-----------|-------------|\r\n| 읽기 성능 | 빠름 (단일 쿼리) | 느림 ($lookup 필요) |\r\n| 쓰기 성능 | 중복 데이터 업데이트 시 비용 | 한 곳만 업데이트 |\r\n| 데이터 일관성 | 중복 시 불일치 가능 | 정규화로 일관성 유지 |\r\n| 문서 크기 | 커질 수 있음 | 작게 유지 |\r\n| 적합한 경우 | 읽기 중심, 함께 변경되는 데이터 | 독립적 갱신, 대용량 관계 |",
    "references": [
      {
        "title": "Data Model Design",
        "url": "https://www.mongodb.com/docs/manual/core/data-model-design/"
      }
    ]
  },
  {
    "id": "MONGO-009",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Embedding과 Referencing을 활용하여 One-to-Many 관계를 MongoDB에서 어떻게 설계하나요?",
    "answer": "**1. Embedding (1:Few):**\r\n```javascript\r\n// 저자 Document에 책 배열 내장\r\n{ \"author\": \"Kim\", \"books\": [{ \"title\": \"Book1\" }, { \"title\": \"Book2\" }] }\r\n```\r\n\r\n**2. Child Reference (1:Many):**\r\n```javascript\r\n// 부모에 자식 ID 배열 저장\r\n{ \"_id\": 1, \"name\": \"Author\", \"book_ids\": [101, 102, 103] }\r\n```\r\n\r\n**3. Parent Reference (1:Squillions):**\r\n```javascript\r\n// 자식에 부모 ID 저장 (로그 등 대량 데이터)\r\n{ \"message\": \"log\", \"host_id\": ObjectId(\"...\") }\r\n```",
    "references": [
      {
        "title": "Model One-to-Many Relationships",
        "url": "https://www.mongodb.com/docs/manual/tutorial/model-embedded-one-to-many-relationships-between-documents/"
      }
    ]
  },
  {
    "id": "MONGO-010",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB에서 Many-to-Many 관계를 어떻게 설계하나요?",
    "answer": "**양쪽 Document에 참조 배열 저장:**\r\n\r\n```javascript\r\n// Students Collection\r\n{ \"_id\": 1, \"name\": \"Kim\", \"course_ids\": [101, 102] }\r\n\r\n// Courses Collection\r\n{ \"_id\": 101, \"name\": \"Math\", \"student_ids\": [1, 2, 3] }\r\n```\r\n\r\n**$lookup으로 조인:**\r\n```javascript\r\ndb.students.aggregate([\r\n  { $lookup: { from: \"courses\", localField: \"course_ids\",\r\n               foreignField: \"_id\", as: \"courses\" } }\r\n])\r\n```\r\n\r\n**고려사항:** 배열 크기가 커지면 별도 Junction Collection 사용",
    "references": [
      {
        "title": "Model Many-to-Many Relationships",
        "url": "https://www.mongodb.com/docs/manual/tutorial/model-embedded-many-to-many-relationships-between-documents/"
      }
    ]
  },
  {
    "id": "MONGO-011",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB Document의 크기 제한(16MB)은 얼마이며, 이를 초과하는 큰 데이터는 어떻게 처리하나요?",
    "answer": "**Document 크기 제한: 16MB**\r\n\r\n**큰 데이터 처리 방법:**\r\n1. **GridFS 사용** - 16MB 초과 파일을 청크로 분할 저장\r\n2. **데이터 분리** - 큰 필드를 별도 Collection으로 분리\r\n3. **참조 사용** - Embedding 대신 Reference 활용\r\n4. **압축** - 바이너리 데이터 압축 후 저장\r\n\r\n```javascript\r\n// GridFS 사용 예시\r\nconst bucket = new GridFSBucket(db);\r\nfs.createReadStream('large_file.pdf').pipe(bucket.openUploadStream('file.pdf'));\r\n```",
    "references": [
      {
        "title": "Document Size Limit",
        "url": "https://www.mongodb.com/docs/manual/reference/limits/#bson-document-size"
      }
    ]
  },
  {
    "id": "MONGO-012",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "16MB Document 크기 제한을 초과하는 파일을 저장하기 위한 GridFS란 무엇이며 언제 사용하나요?",
    "answer": "GridFS는 16MB를 초과하는 대용량 파일을 저장하기 위한 MongoDB 스펙입니다.\r\n\r\n**작동 방식:**\r\n- 파일을 **기본 255KB (정확히 255 * 1024 bytes = 261,120 bytes)** 청크로 분할\r\n- `fs.files`: 파일 메타데이터 저장 (filename, length, uploadDate, md5 등)\r\n- `fs.chunks`: 실제 데이터 청크 저장 (files_id, n, data)\r\n\r\n**사용 사례:**\r\n- 이미지, 비디오, 오디오 파일 저장\r\n- 대용량 문서 저장\r\n- 파일 시스템 제한 우회\r\n- 파일의 일부분만 읽기 (Range Query)\r\n\r\n**GridFS vs 일반 Document 저장:**\r\n| 기준 | GridFS | BSON Document |\r\n|------|--------|---------------|\r\n| 파일 크기 | 제한 없음 | 최대 16MB |\r\n| 부분 읽기 | 가능 (청크 단위) | 불가능 |\r\n| 메모리 효율 | 스트리밍 가능 | 전체 로드 필요 |\r\n| 오버헤드 | 청크 관리 비용 | 낮음 |\r\n\r\n```javascript\r\nconst bucket = new GridFSBucket(db, { chunkSizeBytes: 1024 * 255 }); // 기본값\r\nbucket.openDownloadStreamByName('file.pdf').pipe(res);\r\n```\r\n\r\n**주의:** 16MB 미만의 작은 파일은 일반 BSON Document에 Binary로 저장하는 것이 더 효율적",
    "references": [
      {
        "title": "GridFS",
        "url": "https://www.mongodb.com/docs/manual/core/gridfs/"
      }
    ]
  },
  {
    "id": "MONGO-013",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB의 기본 CRUD 작업을 설명해주세요.",
    "answer": "**Create:**\r\n```javascript\r\ndb.collection.insertOne({ name: \"Kim\" })\r\ndb.collection.insertMany([{ name: \"Lee\" }, { name: \"Park\" }])\r\n```\r\n\r\n**Read:**\r\n```javascript\r\ndb.collection.find({ age: { $gt: 20 } })\r\ndb.collection.findOne({ _id: ObjectId(\"...\") })\r\n```\r\n\r\n**Update:**\r\n```javascript\r\ndb.collection.updateOne({ name: \"Kim\" }, { $set: { age: 30 } })\r\ndb.collection.updateMany({}, { $inc: { count: 1 } })\r\n```\r\n\r\n**Delete:**\r\n```javascript\r\ndb.collection.deleteOne({ name: \"Kim\" })\r\ndb.collection.deleteMany({ status: \"inactive\" })\r\n```",
    "references": [
      {
        "title": "CRUD Operations",
        "url": "https://www.mongodb.com/docs/manual/crud/"
      }
    ]
  },
  {
    "id": "MONGO-014",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB Read 작업에서 find()와 findOne()의 차이는 무엇인가요?",
    "answer": "| 구분 | find() | findOne() |\r\n|------|--------|-----------|\r\n| 반환 | Cursor (여러 Document) | 단일 Document 또는 null |\r\n| 용도 | 복수 결과 조회 | 단일 결과 조회 |\r\n| 성능 | limit 없으면 전체 스캔 | 첫 번째 매칭 후 중단 |\r\n\r\n```javascript\r\n// find() - Cursor 반환\r\nconst cursor = db.users.find({ status: \"active\" })\r\ncursor.forEach(doc => console.log(doc))\r\n\r\n// findOne() - Document 반환\r\nconst user = db.users.findOne({ _id: ObjectId(\"...\") })\r\n```",
    "references": [
      {
        "title": "find()",
        "url": "https://www.mongodb.com/docs/manual/reference/method/db.collection.find/"
      }
    ]
  },
  {
    "id": "MONGO-015",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "find() 메서드에서 사용하는 MongoDB 쿼리 연산자($eq, $gt, $in, $and, $or 등)를 설명해주세요.",
    "answer": "**비교 연산자:**\r\n- `$eq`: 같음 / `$ne`: 같지 않음\r\n- `$gt`: 초과 / `$gte`: 이상\r\n- `$lt`: 미만 / `$lte`: 이하\r\n- `$in`: 배열 내 포함 / `$nin`: 포함되지 않음\r\n\r\n**논리 연산자:**\r\n- `$and`: AND 조건\r\n- `$or`: OR 조건\r\n- `$not`: 부정\r\n- `$nor`: 모든 조건 불만족\r\n\r\n```javascript\r\ndb.users.find({\r\n  $and: [\r\n    { age: { $gte: 20, $lte: 30 } },\r\n    { status: { $in: [\"active\", \"pending\"] } }\r\n  ]\r\n})\r\n```",
    "references": [
      {
        "title": "Query Operators",
        "url": "https://www.mongodb.com/docs/manual/reference/operator/query/"
      }
    ]
  },
  {
    "id": "MONGO-016",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "find() 메서드에서 반환할 필드를 지정하는 Projection이란 무엇이며 어떻게 사용하나요?",
    "answer": "Projection은 쿼리 결과에서 반환할 필드를 지정하는 기능입니다.\r\n\r\n```javascript\r\n// 특정 필드만 포함 (1 = 포함)\r\ndb.users.find({}, { name: 1, email: 1 })\r\n\r\n// 특정 필드 제외 (0 = 제외)\r\ndb.users.find({}, { password: 0, __v: 0 })\r\n\r\n// _id는 명시적으로 제외 필요\r\ndb.users.find({}, { name: 1, _id: 0 })\r\n```\r\n\r\n**주의사항:**\r\n- 포함(1)과 제외(0)를 혼용할 수 없음 (_id 제외)\r\n- 네트워크 대역폭과 메모리 절약에 효과적",
    "references": [
      {
        "title": "Project Fields",
        "url": "https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/"
      }
    ]
  },
  {
    "id": "MONGO-017",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB의 인덱스 종류와 각각의 특징을 설명해주세요.",
    "answer": "**주요 인덱스 종류:**\r\n\r\n1. **Single Field Index**: 단일 필드 인덱스\r\n2. **Compound Index**: 복합 필드 인덱스 (최대 32개 필드)\r\n3. **Multikey Index**: 배열 필드 인덱스 (배열당 자동 생성)\r\n4. **Text Index**: 텍스트 검색용 인덱스 (컬렉션당 1개만)\r\n5. **Geospatial Index**: 지리 데이터용 (2d, 2dsphere)\r\n6. **Hashed Index**: 해시 기반 Sharding용 (범위 쿼리 불가)\r\n7. **TTL Index**: 자동 문서 만료 (단일 필드만, _id 불가)\r\n8. **Wildcard Index**: 동적 필드 인덱싱 (4.2+)\r\n9. **Sparse Index**: null/미존재 필드 제외\r\n10. **Partial Index**: 조건 만족 문서만 인덱싱\r\n\r\n```javascript\r\n// 단일 필드\r\ndb.users.createIndex({ email: 1 })\r\n\r\n// 복합 인덱스\r\ndb.users.createIndex({ lastName: 1, firstName: 1 })\r\n\r\n// Wildcard Index (동적 속성용)\r\ndb.products.createIndex({ \"attributes.$**\": 1 })\r\n\r\n// Partial Index (조건부)\r\ndb.orders.createIndex({ status: 1 }, { partialFilterExpression: { status: \"active\" } })\r\n```\r\n\r\n**인덱스 트레이드오프:**\r\n- 읽기 성능 향상 vs 쓰기 성능 저하\r\n- 메모리/디스크 사용량 증가\r\n- 인덱스가 많을수록 쓰기 시 업데이트 비용 증가",
    "references": [
      {
        "title": "Index Types",
        "url": "https://www.mongodb.com/docs/manual/indexes/"
      }
    ]
  },
  {
    "id": "MONGO-018",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "여러 필드를 조합한 Compound Index(복합 인덱스)란 무엇이며 언제 사용하나요?",
    "answer": "복합 인덱스는 여러 필드를 조합한 인덱스입니다.\r\n\r\n```javascript\r\ndb.products.createIndex({ category: 1, price: -1 })\r\n```\r\n\r\n**사용 시점:**\r\n- 여러 필드로 자주 검색/정렬할 때\r\n- 복합 조건 쿼리 최적화 시\r\n- Covered Query 구현 시\r\n\r\n**ESR 규칙 (권장 순서):**\r\n1. **E**quality: 등가 조건 필드 먼저 (가장 선택적)\r\n2. **S**ort: 정렬 필드\r\n3. **R**ange: 범위 조건 필드 마지막\r\n\r\n```javascript\r\n// 쿼리: status=\"active\", createdAt 정렬, price > 100\r\n// ESR 규칙 적용: Equality(status) → Sort(createdAt) → Range(price)\r\ndb.items.createIndex({ status: 1, createdAt: 1, price: 1 })\r\n```\r\n\r\n**ESR이 중요한 이유:**\r\n- 등가 조건으로 후보 축소 → 정렬은 인덱스 순서 활용 → 범위는 마지막에 필터\r\n- 범위가 중간에 오면 이후 필드는 인덱스 스캔만 가능\r\n\r\n**예외 상황:**\r\n| 상황 | 권장 순서 |\r\n|------|----------|\r\n| 등가 조건만 있음 | 카디널리티 높은 필드 먼저 |\r\n| 정렬만 있음 | 정렬 순서대로 |\r\n| 범위 + 정렬 | 정렬 필드 먼저 (in-memory 정렬 회피) |",
    "references": [
      {
        "title": "Compound Indexes",
        "url": "https://www.mongodb.com/docs/manual/core/index-compound/"
      }
    ]
  },
  {
    "id": "MONGO-019",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB Compound Index(복합 인덱스)에서 필드 순서가 쿼리 성능에 어떤 영향을 미치나요?",
    "answer": "**복합 인덱스에서 필드 순서가 중요한 이유:**\r\n\r\n인덱스 `{ a: 1, b: 1, c: 1 }`의 경우:\r\n- `{ a: 1 }` 쿼리: 사용 가능\r\n- `{ a: 1, b: 1 }` 쿼리: 사용 가능\r\n- `{ b: 1 }` 쿼리: 사용 불가 (prefix 없음)\r\n- `{ a: 1, c: 1 }` 쿼리: a만 인덱스 활용\r\n\r\n**Prefix Rule:**\r\n복합 인덱스는 왼쪽부터 순서대로 사용됩니다.\r\n\r\n**정렬 방향:**\r\n```javascript\r\n// 인덱스: { a: 1, b: -1 }\r\n// 지원: sort({ a: 1, b: -1 }) 또는 sort({ a: -1, b: 1 })\r\n// 미지원: sort({ a: 1, b: 1 })\r\n```",
    "references": [
      {
        "title": "Index Prefix",
        "url": "https://www.mongodb.com/docs/manual/core/index-compound/#prefixes"
      }
    ]
  },
  {
    "id": "MONGO-020",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB의 특수 인덱스인 Text Index와 Geospatial Index는 무엇인가요?",
    "answer": "**Text Index:**\r\n텍스트 검색을 위한 인덱스로, 문자열 필드에서 단어 검색 지원\r\n\r\n```javascript\r\ndb.articles.createIndex({ content: \"text\" })\r\ndb.articles.find({ $text: { $search: \"mongodb database\" } })\r\n```\r\n\r\n**Geospatial Index:**\r\n지리적 데이터 쿼리를 위한 인덱스\r\n\r\n- **2dsphere**: 구형 지구 기반 (GeoJSON)\r\n- **2d**: 평면 좌표 기반\r\n\r\n```javascript\r\ndb.places.createIndex({ location: \"2dsphere\" })\r\ndb.places.find({\r\n  location: {\r\n    $near: { $geometry: { type: \"Point\", coordinates: [127, 37] }, $maxDistance: 1000 }\r\n  }\r\n})\r\n```",
    "references": [
      {
        "title": "Text Indexes",
        "url": "https://www.mongodb.com/docs/manual/core/index-text/"
      }
    ]
  },
  {
    "id": "MONGO-021",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "인덱스 사용 여부와 쿼리 성능을 분석하기 위해 explain()을 사용하는 방법은?",
    "answer": "```javascript\r\ndb.collection.find({ status: \"active\" }).explain(\"executionStats\")\r\n```\r\n\r\n**주요 확인 항목:**\r\n- **queryPlanner.winningPlan**: 선택된 실행 계획\r\n- **stage**: COLLSCAN(전체 스캔) vs IXSCAN(인덱스 스캔)\r\n- **executionStats.totalDocsExamined**: 검사한 문서 수\r\n- **executionStats.executionTimeMillis**: 실행 시간\r\n\r\n**좋은 쿼리의 지표:**\r\n- stage가 IXSCAN\r\n- totalDocsExamined ≈ nReturned\r\n- indexOnly: true (Covered Query)",
    "references": [
      {
        "title": "Explain Results",
        "url": "https://www.mongodb.com/docs/manual/reference/explain-results/"
      }
    ]
  },
  {
    "id": "MONGO-022",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB에서 인덱스만으로 쿼리를 완료하는 Covered Query란 무엇이며 어떻게 활용하나요?",
    "answer": "Covered Query는 인덱스만으로 쿼리를 완료할 수 있어 Document에 접근하지 않는 쿼리입니다.\r\n\r\n**조건:**\r\n1. 모든 쿼리 필드가 인덱스에 포함\r\n2. 모든 반환 필드가 인덱스에 포함\r\n3. _id 필드가 projection에서 제외 (또는 _id가 인덱스에 포함)\r\n\r\n```javascript\r\n// 인덱스: { status: 1, email: 1 }\r\ndb.users.find(\r\n  { status: \"active\" },\r\n  { email: 1, _id: 0 }  // Covered Query\r\n)\r\n```\r\n\r\n**explain()에서 확인:**\r\n- `totalDocsExamined: 0`\r\n- `stage: IXSCAN` (FETCH stage 없음)\r\n\r\n**Covered Query가 불가능한 경우:**\r\n- 배열 필드 포함 시 (Multikey Index)\r\n- 내장 문서 전체 반환 시\r\n- `$elemMatch`, `$slice` 등 특수 projection 사용 시\r\n- Sharded Collection에서 shard key가 없는 경우\r\n\r\n**성능 이점:**\r\n- 디스크 I/O 감소 (Document 접근 불필요)\r\n- WiredTiger 캐시 효율 향상\r\n- 특히 대용량 Document에서 효과적",
    "references": [
      {
        "title": "Covered Query",
        "url": "https://www.mongodb.com/docs/manual/core/query-optimization/#covered-query"
      }
    ]
  },
  {
    "id": "MONGO-023",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Aggregation Pipeline이란 무엇인가요?",
    "answer": "Aggregation Pipeline은 문서를 여러 단계(Stage)를 거쳐 처리하는 데이터 처리 프레임워크입니다.\r\n\r\n**특징:**\r\n- 각 Stage의 출력이 다음 Stage의 입력\r\n- SQL의 GROUP BY, JOIN 등의 기능 제공\r\n- 복잡한 데이터 변환 및 분석 가능\r\n\r\n```javascript\r\ndb.orders.aggregate([\r\n  { $match: { status: \"completed\" } },    // WHERE\r\n  { $group: { _id: \"$customerId\", total: { $sum: \"$amount\" } } },  // GROUP BY\r\n  { $sort: { total: -1 } },               // ORDER BY\r\n  { $limit: 10 }                          // LIMIT\r\n])\r\n```",
    "references": [
      {
        "title": "Aggregation Pipeline",
        "url": "https://www.mongodb.com/docs/manual/core/aggregation-pipeline/"
      }
    ]
  },
  {
    "id": "MONGO-024",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Aggregation Pipeline에서 사용하는 주요 Stage($match, $group, $project, $sort, $lookup 등)를 설명해주세요.",
    "answer": "**주요 Stage:**\r\n\r\n| Stage | 설명 | SQL 대응 |\r\n|-------|------|----------|\r\n| $match | 조건 필터링 | WHERE |\r\n| $group | 그룹화 및 집계 | GROUP BY |\r\n| $project | 필드 선택/변환 | SELECT |\r\n| $sort | 정렬 | ORDER BY |\r\n| $limit | 결과 제한 | LIMIT |\r\n| $skip | 결과 건너뛰기 | OFFSET |\r\n| $lookup | 다른 Collection 조인 | JOIN |\r\n| $unwind | 배열 펼치기 | - |\r\n\r\n```javascript\r\ndb.sales.aggregate([\r\n  { $match: { year: 2024 } },\r\n  { $group: { _id: \"$product\", total: { $sum: \"$amount\" } } },\r\n  { $project: { product: \"$_id\", total: 1, _id: 0 } },\r\n  { $sort: { total: -1 } }\r\n])\r\n```",
    "references": [
      {
        "title": "Aggregation Stages",
        "url": "https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/"
      }
    ]
  },
  {
    "id": "MONGO-025",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Aggregation Pipeline에서 다른 Collection과 LEFT OUTER JOIN을 수행하는 $lookup 사용법을 설명해주세요.",
    "answer": "$lookup은 다른 Collection과 LEFT OUTER JOIN을 수행합니다.\r\n\r\n**기본 문법:**\r\n```javascript\r\ndb.orders.aggregate([\r\n  {\r\n    $lookup: {\r\n      from: \"products\",           // 조인할 Collection\r\n      localField: \"productId\",    // 현재 Collection 필드\r\n      foreignField: \"_id\",        // 대상 Collection 필드\r\n      as: \"productInfo\"           // 결과 배열 필드명\r\n    }\r\n  }\r\n])\r\n```\r\n\r\n**Pipeline 사용 (5.0+):**\r\n```javascript\r\n{\r\n  $lookup: {\r\n    from: \"products\",\r\n    let: { pid: \"$productId\" },\r\n    pipeline: [\r\n      { $match: { $expr: { $eq: [\"$_id\", \"$$pid\"] } } },\r\n      { $project: { name: 1 } }\r\n    ],\r\n    as: \"product\"\r\n  }\r\n}\r\n```",
    "references": [
      {
        "title": "$lookup",
        "url": "https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/"
      }
    ]
  },
  {
    "id": "MONGO-026",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB Aggregation Pipeline에서 배열 필드를 펼쳐서 처리하는 $unwind는 언제 사용하며 어떤 역할을 하나요?",
    "answer": "$unwind는 배열 필드를 펼쳐서 각 요소마다 별도의 문서를 생성합니다.\r\n\r\n```javascript\r\n// 원본: { _id: 1, items: [\"a\", \"b\", \"c\"] }\r\ndb.orders.aggregate([{ $unwind: \"$items\" }])\r\n// 결과:\r\n// { _id: 1, items: \"a\" }\r\n// { _id: 1, items: \"b\" }\r\n// { _id: 1, items: \"c\" }\r\n```\r\n\r\n**사용 시점:**\r\n- 배열 요소별 집계가 필요할 때\r\n- $lookup 결과 배열 처리 시\r\n- 배열 요소 기준 그룹화 시\r\n\r\n**옵션:**\r\n```javascript\r\n{ $unwind: { path: \"$items\", preserveNullAndEmptyArrays: true } }\r\n```",
    "references": [
      {
        "title": "$unwind",
        "url": "https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/"
      }
    ]
  },
  {
    "id": "MONGO-027",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Aggregation Pipeline에서 동일 입력에 여러 파이프라인을 병렬 실행하는 $facet 사용 방법은?",
    "answer": "$facet은 동일한 입력 데이터에 여러 파이프라인을 병렬로 실행합니다.\r\n\r\n```javascript\r\ndb.products.aggregate([\r\n  { $match: { status: \"active\" } },\r\n  {\r\n    $facet: {\r\n      // 카테고리별 통계\r\n      \"byCategory\": [\r\n        { $group: { _id: \"$category\", count: { $sum: 1 } } }\r\n      ],\r\n      // 가격 범위별 통계\r\n      \"byPriceRange\": [\r\n        { $bucket: { groupBy: \"$price\", boundaries: [0, 100, 500, 1000] } }\r\n      ],\r\n      // 페이지네이션 정보\r\n      \"metadata\": [\r\n        { $count: \"total\" }\r\n      ]\r\n    }\r\n  }\r\n])\r\n```\r\n\r\n**사용 사례:**\r\n- 대시보드 데이터 조회\r\n- 페이지네이션 + 총 개수 동시 조회",
    "references": [
      {
        "title": "$facet",
        "url": "https://www.mongodb.com/docs/manual/reference/operator/aggregation/facet/"
      }
    ]
  },
  {
    "id": "MONGO-028",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Aggregation Pipeline과 Deprecated된 MapReduce의 차이는 무엇인가요?",
    "answer": "| 구분 | Aggregation Pipeline | MapReduce |\r\n|------|---------------------|-----------|\r\n| 성능 | 빠름 (네이티브 C++) | 느림 (JavaScript 엔진) |\r\n| 유연성 | Stage 기반 (대부분 충분) | 임의 JS 코드 가능 |\r\n| 사용성 | 선언적, 쉬움 | 명령형, 복잡함 |\r\n| 병렬 처리 | 자동 최적화 | 수동 관리 |\r\n| 상태 | 권장 | **5.0부터 Deprecated** |\r\n\r\n**MongoDB 5.0+:**\r\nMapReduce는 deprecated되었으며, Aggregation Pipeline 사용을 권장합니다. 복잡한 로직은 `$accumulator`나 `$function`으로 JavaScript 사용 가능합니다.\r\n\r\n```javascript\r\n// MapReduce 대체: $group + $accumulator\r\n{ $group: {\r\n    _id: \"$category\",\r\n    result: {\r\n      $accumulator: {\r\n        init: function() { return { sum: 0, count: 0 }; },\r\n        accumulate: function(state, value) { return { sum: state.sum + value, count: state.count + 1 }; },\r\n        accumulateArgs: [\"$price\"],\r\n        merge: function(s1, s2) { return { sum: s1.sum + s2.sum, count: s1.count + s2.count }; },\r\n        finalize: function(state) { return state.sum / state.count; }\r\n      }\r\n    }\r\n  }\r\n}\r\n```\r\n\r\n**$function (4.4+) - 커스텀 JavaScript:**\r\n```javascript\r\n{ $addFields: {\r\n    result: { $function: {\r\n      body: function(x) { return x * 2; },\r\n      args: [\"$value\"],\r\n      lang: \"js\"\r\n    }}\r\n}}\r\n```",
    "references": [
      {
        "title": "Map-Reduce to Aggregation",
        "url": "https://www.mongodb.com/docs/manual/reference/map-reduce-to-aggregation-pipeline/"
      }
    ]
  },
  {
    "id": "MONGO-029",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB의 Replication이란 무엇인가요?",
    "answer": "Replication은 여러 서버에 동일한 데이터를 복제하여 고가용성과 데이터 중복성을 제공하는 기능입니다.\r\n\r\n**목적:**\r\n- **고가용성**: Primary 장애 시 자동 Failover\r\n- **데이터 보호**: 데이터 손실 방지\r\n- **읽기 분산**: Secondary에서 읽기 가능\r\n- **재해 복구**: 지리적 분산 배치 가능\r\n\r\n**작동 방식:**\r\n1. Primary가 모든 쓰기 처리\r\n2. Oplog를 통해 Secondary에 변경사항 복제\r\n3. Primary 장애 시 투표로 새 Primary 선출",
    "references": [
      {
        "title": "Replication",
        "url": "https://www.mongodb.com/docs/manual/replication/"
      }
    ]
  },
  {
    "id": "MONGO-030",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB에서 데이터 복제를 구현하는 Replica Set의 구조(Primary, Secondary 등)와 역할을 설명해주세요.",
    "answer": "Replica Set은 동일한 데이터를 가진 MongoDB 인스턴스 그룹입니다.\r\n\r\n**구조:**\r\n```\r\n┌─────────────┐\r\n│   Primary   │ ← 모든 쓰기 작업\r\n└──────┬──────┘\r\n       │ Oplog 복제\r\n   ┌───┴───┐\r\n   ▼       ▼\r\n┌─────┐ ┌─────┐\r\n│Sec 1│ │Sec 2│ ← 읽기 가능, 투표 참여\r\n└─────┘ └─────┘\r\n```\r\n\r\n**권장 구성:**\r\n- 최소 3개 노드 (홀수 권장)\r\n- Primary 1개 + Secondary 2개\r\n- 또는 Primary 1개 + Secondary 1개 + Arbiter 1개",
    "references": [
      {
        "title": "Replica Set Members",
        "url": "https://www.mongodb.com/docs/manual/core/replica-set-members/"
      }
    ]
  },
  {
    "id": "MONGO-031",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB Replica Set(복제 셋)을 구성하는 Primary, Secondary, Arbiter 노드의 역할은 무엇인가요?",
    "answer": "**Primary:**\r\n- 모든 쓰기 작업 처리\r\n- 기본 읽기 작업 처리\r\n- Oplog에 작업 기록\r\n\r\n**Secondary:**\r\n- Primary의 Oplog를 복제하여 데이터 동기화\r\n- Read Preference 설정 시 읽기 가능\r\n- Primary 장애 시 선출 후보\r\n\r\n**Arbiter:**\r\n- 데이터를 저장하지 않음\r\n- 선거에 투표만 참여\r\n- 짝수 노드일 때 과반수 확보용\r\n- 리소스 최소화 목적\r\n\r\n```javascript\r\n// Arbiter 추가\r\nrs.addArb(\"mongodb3.example.com:27017\")\r\n```\r\n\r\n**함정 - Arbiter 사용 시 주의사항:**\r\n- PSA(Primary-Secondary-Arbiter) 구성에서 `w: majority` 사용 시:\r\n  - Secondary 장애 시 쓰기 불가능 (과반수 확보 불가)\r\n  - Arbiter는 데이터가 없어 투표에만 참여\r\n- **권장**: 3개 데이터 노드(PSS) 구성이 더 안전\r\n- Arbiter는 writeConcern majority 계산에서 제외됨 (5.0+에서 개선)\r\n\r\n**Arbiter가 적합한 경우:**\r\n- 비용 제약이 심한 경우\r\n- 데이터 가용성보다 쓰기 지연이 중요한 경우",
    "references": [
      {
        "title": "Replica Set Arbiter",
        "url": "https://www.mongodb.com/docs/manual/core/replica-set-arbiter/"
      }
    ]
  },
  {
    "id": "MONGO-032",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB Replica Set(복제 셋)에서 읽기 작업을 어느 노드에서 수행할지 지정하는 Read Preference란 무엇이며 종류는 무엇인가요?",
    "answer": "Read Preference는 읽기 작업을 어느 노드에서 수행할지 지정합니다.\r\n\r\n**종류:**\r\n| 모드 | 설명 |\r\n|------|------|\r\n| primary | Primary에서만 읽기 (기본값) |\r\n| primaryPreferred | Primary 우선, 불가시 Secondary |\r\n| secondary | Secondary에서만 읽기 |\r\n| secondaryPreferred | Secondary 우선, 불가시 Primary |\r\n| nearest | 네트워크 지연 최소 노드 |\r\n\r\n```javascript\r\n// Driver 설정\r\ndb.collection.find().readPref(\"secondaryPreferred\")\r\n\r\n// Connection String\r\nmongodb://host1,host2/?readPreference=secondary\r\n```\r\n\r\n**주의:** Secondary 읽기는 약간의 지연(Replication Lag) 가능",
    "references": [
      {
        "title": "Read Preference",
        "url": "https://www.mongodb.com/docs/manual/core/read-preference/"
      }
    ]
  },
  {
    "id": "MONGO-033",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "쓰기 작업의 확인 수준을 지정하는 Write Concern이란 무엇이며 어떻게 설정하나요?",
    "answer": "Write Concern은 쓰기 작업의 확인 수준을 지정합니다.\r\n\r\n**주요 옵션:**\r\n| w 값 | 설명 | 트레이드오프 |\r\n|------|------|-------------|\r\n| 0 | 확인 안 함 (Fire-and-forget) | 가장 빠름, 데이터 손실 가능 |\r\n| 1 | Primary 확인 (기본값) | 빠름, Primary 장애 시 손실 가능 |\r\n| \"majority\" | 과반수 노드 확인 | 안전, 지연 증가 |\r\n| n | n개 노드 확인 | 명시적 제어 |\r\n\r\n**j 옵션:** journal 기록 여부 (true 시 디스크 동기화 보장)\r\n**wtimeout:** 타임아웃 설정 (밀리초, 초과 시 에러)\r\n\r\n```javascript\r\ndb.collection.insertOne(\r\n  { name: \"test\" },\r\n  { writeConcern: { w: \"majority\", j: true, wtimeout: 5000 } }\r\n)\r\n```\r\n\r\n**트레이드오프 상세:**\r\n| 설정 | 지연 | 내구성 | 사용 사례 |\r\n|------|------|--------|----------|\r\n| w:0 | 최소 | 없음 | 로그, 메트릭 (손실 허용) |\r\n| w:1 | 낮음 | Primary만 | 일반적인 경우 |\r\n| w:1, j:true | 중간 | Primary Journal | 중요 데이터 |\r\n| w:majority | 높음 | 과반수 복제 | 금융, 주문 등 |\r\n| w:majority, j:true | 최고 | 과반수 + Journal | 최고 수준 보장 필요 시 |\r\n\r\n**주의:** wtimeout 발생 시 쓰기 자체는 성공했을 수 있음 (확인만 실패)",
    "references": [
      {
        "title": "Write Concern",
        "url": "https://www.mongodb.com/docs/manual/reference/write-concern/"
      }
    ]
  },
  {
    "id": "MONGO-034",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Replica Set에서 Primary 장애 시 자동 Failover 과정(장애 감지, 선거, 승격)을 설명해주세요.",
    "answer": "**Failover 과정:**\r\n\r\n1. **장애 감지**: Heartbeat(2초 간격)로 Primary 상태 확인\r\n2. **선거 시작**: electionTimeoutMillis(기본 10초) 후 선거 개시\r\n3. **투표**: 과반수 투표로 새 Primary 선출\r\n4. **승격**: 가장 최신 데이터를 가진 Secondary가 Primary로 승격\r\n5. **연결 재설정**: 드라이버가 새 Primary로 연결\r\n\r\n```\r\nPrimary 장애 → [10초 대기] → 선거 시작 → 투표 → 새 Primary 선출\r\n                                    ↓\r\n                            (총 12초 내외 소요)\r\n```\r\n\r\n**선출 기준:**\r\n- 가장 최신 oplog\r\n- priority 값 (높을수록 우선)\r\n- 과반수 투표 획득",
    "references": [
      {
        "title": "Replica Set Elections",
        "url": "https://www.mongodb.com/docs/manual/core/replica-set-elections/"
      }
    ]
  },
  {
    "id": "MONGO-035",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Replica Set의 데이터 동기화와 Point-in-Time Recovery의 기반이 되는 Oplog란 무엇이며 어떤 역할을 하나요?",
    "answer": "Oplog(Operation Log)는 Primary의 모든 쓰기 작업을 기록하는 Capped Collection입니다.\r\n\r\n**역할:**\r\n- Secondary가 Oplog를 읽어 데이터 동기화\r\n- Point-in-Time Recovery 지원\r\n- Change Streams의 기반\r\n\r\n**특징:**\r\n- `local.oplog.rs` Collection에 저장\r\n- Capped Collection (고정 크기, 오래된 것 자동 삭제)\r\n- **Idempotent 연산**으로 저장 (같은 연산을 여러 번 적용해도 결과 동일)\r\n\r\n```javascript\r\n// Oplog 조회\r\nuse local\r\ndb.oplog.rs.find().sort({ $natural: -1 }).limit(1)\r\n\r\n// Oplog 항목 예시\r\n{\r\n  \"ts\": Timestamp(1234567890, 1),  // 타임스탬프\r\n  \"op\": \"i\",                        // 연산 타입 (i=insert, u=update, d=delete)\r\n  \"ns\": \"mydb.users\",               // namespace\r\n  \"o\": { \"_id\": 1, \"name\": \"Kim\" }  // 문서\r\n}\r\n```\r\n\r\n**크기 설정:**\r\n- **기본값**: 사용 가능 디스크의 5% (최소 990MB ~ 최대 50GB)\r\n- `oplogSizeMB` 옵션으로 조정\r\n- **4.4+**: `oplogMinRetentionHours`로 최소 보존 시간 설정 가능\r\n\r\n**Oplog 크기 결정 기준:**\r\n- 쓰기 빈도가 높을수록 더 큰 Oplog 필요\r\n- Secondary 복구 시간, 유지보수 윈도우 고려\r\n- Point-in-Time Recovery 범위에 영향\r\n\r\n**함정 - Oplog 과소 설정:**\r\n- Secondary가 따라잡지 못하면 Initial Sync 필요\r\n- 유지보수 중 Oplog가 넘치면 동기화 불가",
    "references": [
      {
        "title": "Replica Set Oplog",
        "url": "https://www.mongodb.com/docs/manual/core/replica-set-oplog/"
      }
    ]
  },
  {
    "id": "MONGO-036",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB Replica Set에서 Secondary 노드로부터 읽기 작업을 수행할 때 Replication Lag 등 주의할 점은?",
    "answer": "**주의사항:**\r\n\r\n1. **Replication Lag**: Primary와 데이터 불일치 가능\r\n   - 최신 데이터가 필요한 경우 Primary 읽기 권장\r\n\r\n2. **Stale Read**: 오래된 데이터 읽기 가능\r\n   ```javascript\r\n   // maxStalenessSeconds로 허용 지연 설정\r\n   { readPreference: \"secondary\", maxStalenessSeconds: 120 }\r\n   ```\r\n\r\n3. **쓰기 후 읽기 일관성 문제**\r\n   - 쓰기 직후 Secondary 읽기 시 반영 안 될 수 있음\r\n\r\n4. **Failover 시 연결 끊김**\r\n   - 드라이버 재연결 로직 필요\r\n\r\n**권장 사용 사례:**\r\n- 분석/리포팅 쿼리\r\n- 지연 허용 가능한 읽기\r\n- 지리적으로 분산된 읽기",
    "references": [
      {
        "title": "Read Preference Use Cases",
        "url": "https://www.mongodb.com/docs/manual/core/read-preference-use-cases/"
      }
    ]
  },
  {
    "id": "MONGO-037",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Sharding이란 무엇이며 왜 필요한가요?",
    "answer": "Sharding은 데이터를 여러 서버에 분산 저장하는 수평 확장(Scale-out) 방식입니다.\r\n\r\n**필요한 이유:**\r\n- 단일 서버 저장 용량 한계 극복\r\n- 높은 처리량(throughput) 요구\r\n- Working Set이 RAM을 초과할 때\r\n- 지리적 데이터 분산 필요 시\r\n\r\n**Sharding vs Replication:**\r\n| 구분 | Sharding | Replication |\r\n|------|----------|-------------|\r\n| 목적 | 용량/성능 확장 | 고가용성/읽기 분산 |\r\n| 데이터 | 분산 저장 | 복제 저장 |\r\n| 확장 방향 | 수평 (Scale-out) | - |",
    "references": [
      {
        "title": "Sharding",
        "url": "https://www.mongodb.com/docs/manual/sharding/"
      }
    ]
  },
  {
    "id": "MONGO-038",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Sharding을 구현하는 MongoDB의 Sharded Cluster 아키텍처(Shard, Config Server, mongos)를 설명해주세요.",
    "answer": "```\r\n┌──────────┐  ┌──────────┐\r\n│ mongos   │  │ mongos   │  ← 라우터 (쿼리 분배)\r\n└────┬─────┘  └────┬─────┘\r\n     │             │\r\n┌────┴─────────────┴────┐\r\n│    Config Servers     │  ← 메타데이터 저장 (Replica Set)\r\n└───────────┬───────────┘\r\n     ┌──────┼──────┐\r\n     ▼      ▼      ▼\r\n┌──────┐┌──────┐┌──────┐\r\n│Shard1││Shard2││Shard3│  ← 실제 데이터 (각각 Replica Set)\r\n└──────┘└──────┘└──────┘\r\n```\r\n\r\n**구성요소:**\r\n- **Shard**: 실제 데이터 저장 (Replica Set으로 구성)\r\n- **Config Server**: 샤드 메타데이터, 청크 위치 정보 저장\r\n- **mongos**: 쿼리 라우터, 클라이언트 연결점",
    "references": [
      {
        "title": "Sharded Cluster Components",
        "url": "https://www.mongodb.com/docs/manual/core/sharded-cluster-components/"
      }
    ]
  },
  {
    "id": "MONGO-039",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Sharded Cluster에서 데이터를 여러 Shard에 분배하는 기준인 Shard Key란 무엇이며 선택 시 고려사항은?",
    "answer": "Shard Key는 데이터를 여러 Shard에 분배하는 기준 필드입니다.\r\n\r\n**선택 시 고려사항:**\r\n\r\n1. **높은 Cardinality**: 다양한 값이 많아야 균등 분배\r\n2. **균등한 분포(Frequency)**: 특정 값에 쏠리지 않아야 함\r\n3. **쿼리 패턴**: 자주 사용하는 쿼리 필드 포함 (Targeted Query 유도)\r\n4. **단조성 피하기**: 단조 증가/감소 값은 Hot Shard 유발\r\n\r\n**Shard Key 변경:**\r\n- **4.4 이전**: Shard Key 변경 불가, 재생성 필요\r\n- **4.4+**: `refineCollectionShardKey`로 필드 추가 가능\r\n- **5.0+**: `reshardCollection`으로 완전히 다른 키로 변경 가능\r\n\r\n**좋은 Shard Key 예시:**\r\n```javascript\r\n// 복합 Shard Key - 카디널리티 + 쿼리 패턴 고려\r\nsh.shardCollection(\"db.orders\", { customerId: \"hashed\", orderDate: 1 })\r\n```\r\n\r\n**피해야 할 패턴:**\r\n| 패턴 | 문제 | 대안 |\r\n|------|------|------|\r\n| ObjectId, timestamp | Hot Shard (마지막 Shard에 집중) | Hash 또는 복합 키 |\r\n| boolean, status | 낮은 Cardinality | 복합 키 |\r\n| 단일 tenant_id | 대형 테넌트 불균형 | tenant_id + 다른 필드 |\r\n\r\n**Shard Key 평가 기준:**\r\n- Cardinality: 높을수록 좋음\r\n- Frequency: 균등할수록 좋음\r\n- Rate of Change: 단조적이지 않을수록 좋음",
    "references": [
      {
        "title": "Shard Key Selection",
        "url": "https://www.mongodb.com/docs/manual/core/sharding-shard-key/"
      }
    ]
  },
  {
    "id": "MONGO-040",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB Sharding에서 Shard Key 기반 데이터 분배 방식인 Range Sharding과 Hash Sharding의 차이는?",
    "answer": "| 구분 | Range Sharding | Hash Sharding |\r\n|------|----------------|---------------|\r\n| 분배 방식 | 값 범위별 분배 | 해시값 기반 분배 |\r\n| 장점 | 범위 쿼리 효율적, 연속 데이터 같은 Shard | 균등 분배 보장, Hot Spot 방지 |\r\n| 단점 | 불균등 분배 가능, 단조 키 시 Hot Shard | 범위 쿼리 시 모든 Shard 조회 (Scatter-Gather) |\r\n| 적합 | 날짜, 지역 기반 데이터, 순차 접근 | 랜덤 접근 패턴, 균등 쓰기 부하 |\r\n\r\n```javascript\r\n// Range Sharding\r\nsh.shardCollection(\"db.logs\", { timestamp: 1 })\r\n\r\n// Hash Sharding\r\nsh.shardCollection(\"db.users\", { email: \"hashed\" })\r\n```\r\n\r\n**트레이드오프 상세:**\r\n| 쿼리 유형 | Range | Hash |\r\n|----------|-------|------|\r\n| `{ key: value }` (등가) | 단일 Shard | 단일 Shard |\r\n| `{ key: { $gt: a, $lt: b } }` (범위) | 연속 Shard만 | 모든 Shard (비효율) |\r\n| `{ key: { $in: [...] } }` | 해당 Shard만 | 해당 Shard만 |\r\n\r\n**선택 기준:**\r\n- 범위 쿼리가 많으면 → Range\r\n- 균등 분배가 중요하면 → Hash\r\n- 단조 증가 키 사용 시 → Hash 권장 (Hot Shard 방지)\r\n- **복합 키 고려**: Range와 Hash 조합 가능",
    "references": [
      {
        "title": "Hashed Sharding",
        "url": "https://www.mongodb.com/docs/manual/core/hashed-sharding/"
      }
    ]
  },
  {
    "id": "MONGO-041",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "특정 데이터를 특정 Shard에 저장하도록 규칙을 정의하는 Zone Sharding이란 무엇인가요?",
    "answer": "Zone Sharding은 특정 데이터를 특정 Shard에 저장하도록 규칙을 정의하는 기능입니다.\r\n\r\n**사용 사례:**\r\n- 지리적 데이터 분산 (유럽 데이터는 유럽 DC에)\r\n- 테넌트별 데이터 격리\r\n- 하드웨어 계층화 (핫 데이터는 SSD Shard에)\r\n\r\n```javascript\r\n// Zone 생성\r\nsh.addShardTag(\"shard01\", \"KOREA\")\r\nsh.addShardTag(\"shard02\", \"USA\")\r\n\r\n// Zone 범위 설정\r\nsh.addTagRange(\r\n  \"db.users\",\r\n  { region: \"KR\" },\r\n  { region: \"KS\" },  // KR ~ KS 범위\r\n  \"KOREA\"\r\n)\r\n```\r\n\r\n**구성:**\r\n1. Shard에 태그 할당\r\n2. Shard Key 범위에 태그 연결\r\n3. Balancer가 규칙에 따라 Chunk 이동",
    "references": [
      {
        "title": "Zone Sharding",
        "url": "https://www.mongodb.com/docs/manual/core/zone-sharding/"
      }
    ]
  },
  {
    "id": "MONGO-042",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Sharded Cluster에서 Shard 간 데이터 이동의 단위인 Chunk란 무엇이며 어떻게 분할되나요?",
    "answer": "Chunk는 Shard Key 범위에 따라 분할된 데이터 그룹입니다.\r\n\r\n**특징:**\r\n- 기본 크기: 128MB (설정 가능)\r\n- 연속된 Shard Key 범위의 Document 포함\r\n- Shard 간 데이터 이동의 단위\r\n\r\n**분할 과정:**\r\n1. Chunk가 `chunkSize` 초과 시 분할 트리거\r\n2. 중간 값을 기준으로 두 Chunk로 분할\r\n3. Balancer가 Chunk를 다른 Shard로 이동\r\n\r\n```javascript\r\n// Chunk 상태 확인\r\nuse config\r\ndb.chunks.find({ ns: \"db.collection\" })\r\n\r\n// Chunk 크기 설정\r\nuse config\r\ndb.settings.save({ _id: \"chunksize\", value: 64 })  // 64MB\r\n```",
    "references": [
      {
        "title": "Data Partitioning with Chunks",
        "url": "https://www.mongodb.com/docs/manual/core/sharding-data-partitioning/"
      }
    ]
  },
  {
    "id": "MONGO-043",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB Sharded Cluster에서 Shard 간 Chunk(데이터 청크)를 자동으로 재분배하여 데이터 균형을 유지하는 Balancer의 역할은 무엇인가요?",
    "answer": "Balancer는 Shard 간 Chunk를 자동으로 재분배하여 데이터 균형을 유지합니다.\r\n\r\n**역할:**\r\n- Chunk 분포 모니터링\r\n- 불균형 감지 시 Chunk 마이그레이션\r\n- Zone 규칙에 따른 Chunk 이동\r\n\r\n**작동 방식:**\r\n1. Config Server에서 실행\r\n2. Shard 간 Chunk 수 차이가 임계값 초과 시 동작\r\n3. 백그라운드에서 Chunk 이동\r\n\r\n```javascript\r\n// Balancer 상태 확인\r\nsh.getBalancerState()\r\n\r\n// Balancer 중지/시작\r\nsh.stopBalancer()\r\nsh.startBalancer()\r\n\r\n// 특정 시간대에만 실행\r\ndb.settings.update(\r\n  { _id: \"balancer\" },\r\n  { $set: { activeWindow: { start: \"23:00\", stop: \"06:00\" } } }\r\n)\r\n```",
    "references": [
      {
        "title": "Sharded Cluster Balancer",
        "url": "https://www.mongodb.com/docs/manual/core/sharding-balancer-administration/"
      }
    ]
  },
  {
    "id": "MONGO-044",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB Sharding 환경에서 발생할 수 있는 Hot Shard(특정 Shard에 트래픽 집중), Scatter-Gather 쿼리(모든 Shard 조회) 등의 문제점과 해결 방법은?",
    "answer": "**1. Hot Shard (Jumbo Chunk)**\r\n- 문제: 특정 Shard에 트래픽 집중\r\n- 해결: Hash Sharding 사용, 복합 Shard Key\r\n\r\n**2. Scatter-Gather 쿼리**\r\n- 문제: Shard Key 미포함 쿼리가 모든 Shard 조회\r\n- 해결: 쿼리에 Shard Key 포함, 적절한 Key 선택\r\n\r\n**3. Chunk 마이그레이션 오버헤드**\r\n- 문제: 대량 데이터 이동 시 성능 저하\r\n- 해결: 피크 시간 외 Balancer 실행\r\n\r\n**4. 분산 트랜잭션 복잡성**\r\n- 문제: 여러 Shard 걸친 트랜잭션 어려움\r\n- 해결: 관련 데이터 같은 Shard에 배치\r\n\r\n**5. Shard Key 변경 불가**\r\n- 문제: 잘못된 Key 선택 시 수정 어려움\r\n- 해결: 5.0+ reshardCollection 사용",
    "references": [
      {
        "title": "Sharding Troubleshooting",
        "url": "https://www.mongodb.com/docs/manual/reference/command/reshardCollection/"
      }
    ]
  },
  {
    "id": "MONGO-045",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB의 Transaction 지원에 대해 설명해주세요.",
    "answer": "**버전별 Transaction 지원:**\r\n- **4.0**: Replica Set에서 Multi-Document Transaction\r\n- **4.2**: Sharded Cluster에서 분산 Transaction\r\n- **4.4+**: 성능 개선 및 제한 완화\r\n\r\n```javascript\r\nconst session = client.startSession();\r\nsession.startTransaction();\r\n\r\ntry {\r\n  await db.accounts.updateOne(\r\n    { _id: \"A\" }, { $inc: { balance: -100 } }, { session }\r\n  );\r\n  await db.accounts.updateOne(\r\n    { _id: \"B\" }, { $inc: { balance: 100 } }, { session }\r\n  );\r\n  await session.commitTransaction();\r\n} catch (error) {\r\n  await session.abortTransaction();\r\n} finally {\r\n  session.endSession();\r\n}\r\n```\r\n\r\n**제한사항:**\r\n- 기본 60초 타임아웃 (`transactionLifetimeLimitSeconds`)\r\n- 단일 트랜잭션 oplog 최대 16MB\r\n- Replica Set 또는 Sharded Cluster 필요 (Standalone 불가)\r\n\r\n**함정 - 트랜잭션 남용 주의:**\r\n- MongoDB는 단일 Document 원자성이 기본 (트랜잭션 불필요)\r\n- Embedding으로 해결 가능한 경우 먼저 검토\r\n- 트랜잭션은 성능 오버헤드 발생 (lock, 스냅샷 유지)\r\n- WiredTiger 캐시 압박 가능\r\n\r\n**트랜잭션이 필요한 경우:**\r\n- 여러 Collection에 걸친 원자적 작업\r\n- 정규화된 스키마에서 일관성 유지\r\n- 계좌 이체 등 All-or-Nothing 요구사항",
    "references": [
      {
        "title": "Transactions",
        "url": "https://www.mongodb.com/docs/manual/core/transactions/"
      }
    ]
  },
  {
    "id": "MONGO-046",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "여러 Document를 원자적으로 업데이트하는 Multi-Document Transaction은 언제 사용하나요?",
    "answer": "**사용 시점:**\r\n- 여러 Document를 원자적으로 업데이트해야 할 때\r\n- 계좌 이체처럼 All-or-Nothing이 필요한 경우\r\n- 정규화된 데이터 모델에서 일관성 유지\r\n\r\n**사용 예시:**\r\n```javascript\r\n// 주문 생성 + 재고 감소\r\nsession.startTransaction();\r\nawait orders.insertOne({ ... }, { session });\r\nawait inventory.updateOne(\r\n  { productId: 123 },\r\n  { $inc: { qty: -1 } },\r\n  { session }\r\n);\r\nawait session.commitTransaction();\r\n```\r\n\r\n**대안 고려 (트랜잭션 전에 먼저 검토):**\r\n1. **Embedding으로 단일 Document 작업으로 변경**\r\n   - 단일 Document 업데이트는 자동 원자성\r\n2. **Two-Phase Commit 패턴** (트랜잭션 이전 방식)\r\n3. **보상 트랜잭션(Saga 패턴)** - 분산 시스템에서\r\n\r\n**트랜잭션 사용 시 주의사항:**\r\n- **성능 오버헤드**: 잠금, 스냅샷 유지, 네트워크 왕복\r\n- **60초 타임아웃**: 긴 작업은 청크로 분리\r\n- **Retry 로직 필수**: TransientTransactionError, UnknownTransactionCommitResult 처리\r\n- **Sharded Cluster**: 추가 오버헤드 (분산 잠금)\r\n\r\n```javascript\r\n// 재시도 로직 예시 (권장)\r\nasync function runTransactionWithRetry(session, txnFunc) {\r\n  while (true) {\r\n    try {\r\n      return await txnFunc(session);\r\n    } catch (error) {\r\n      if (error.hasErrorLabel('TransientTransactionError')) continue;\r\n      throw error;\r\n    }\r\n  }\r\n}\r\n```",
    "references": [
      {
        "title": "Transactions in Applications",
        "url": "https://www.mongodb.com/docs/manual/core/transactions-in-applications/"
      }
    ]
  },
  {
    "id": "MONGO-047",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Multi-Document Transaction에서 MongoDB의 ACID(원자성, 일관성, 격리성, 지속성) 특성을 설명해주세요.",
    "answer": "**단일 Document 작업:**\r\n- 항상 ACID 보장 (원자적 작업)\r\n\r\n**Multi-Document Transaction (4.0+):**\r\n\r\n| 속성 | MongoDB 지원 |\r\n|------|-------------|\r\n| **Atomicity** | 트랜잭션 내 모든 작업이 성공하거나 모두 롤백 |\r\n| **Consistency** | 트랜잭션 완료 후 데이터 일관성 유지 |\r\n| **Isolation** | Snapshot Isolation 제공 |\r\n| **Durability** | writeConcern: majority + j:true로 보장 |\r\n\r\n```javascript\r\n// 완전한 ACID 보장 설정\r\nsession.startTransaction({\r\n  readConcern: { level: \"snapshot\" },\r\n  writeConcern: { w: \"majority\" }\r\n});\r\n```",
    "references": [
      {
        "title": "Transactions and Atomicity",
        "url": "https://www.mongodb.com/docs/manual/core/write-operations-atomicity/"
      }
    ]
  },
  {
    "id": "MONGO-048",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "ACID의 Isolation과 관련된 Read Concern 레벨(local, majority, snapshot 등)과 Snapshot Isolation에 대해 설명해주세요.",
    "answer": "**Read Concern 레벨:**\r\n\r\n| 레벨 | 설명 | 트레이드오프 |\r\n|------|------|-------------|\r\n| local | 로컬 데이터 읽기 (기본값) | 빠름, 롤백 가능한 데이터 읽을 수 있음 |\r\n| available | Sharding에서 가장 빠른 응답 | 고아 문서(orphaned) 읽기 가능 |\r\n| majority | 과반수 복제 확인된 데이터 | 약간 느림, 롤백되지 않는 데이터 보장 |\r\n| linearizable | 가장 최신 데이터 보장 | 가장 느림, 강력한 일관성 |\r\n| snapshot | 트랜잭션 시작 시점 스냅샷 | 트랜잭션 내에서만 사용 |\r\n\r\n**함정 - Read Concern 오해:**\r\n- `local`은 \"롤백될 수 있는\" 데이터를 읽을 수 있음 (Primary 장애 시)\r\n- `majority`라도 최신 데이터가 아닐 수 있음 (지연 존재)\r\n- `linearizable`은 Primary에서만 사용 가능, 매우 느림\r\n\r\n**Snapshot Isolation:**\r\n- 트랜잭션 시작 시점의 일관된 데이터 뷰 제공\r\n- 다른 트랜잭션의 변경이 보이지 않음\r\n- Phantom Read 방지\r\n- Write Conflict 시 TransientTransactionError 발생 → 재시도 필요\r\n\r\n```javascript\r\nsession.startTransaction({\r\n  readConcern: { level: \"snapshot\" },\r\n  writeConcern: { w: \"majority\" }\r\n});\r\n```\r\n\r\n**Read Concern + Write Concern 조합:**\r\n| 조합 | 일관성 수준 |\r\n|------|------------|\r\n| local + w:1 | 기본, 약한 일관성 |\r\n| majority + majority | 인과적 일관성 가능 |\r\n| linearizable + majority | 가장 강한 일관성 |",
    "references": [
      {
        "title": "Read Concern",
        "url": "https://www.mongodb.com/docs/manual/reference/read-concern/"
      }
    ]
  },
  {
    "id": "MONGO-049",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "ACID의 Atomicity(원자성)는 단일 Document 레벨과 Multi-Document Transaction 레벨에서 어떻게 다르게 동작하나요?",
    "answer": "**Document 레벨 Atomicity:**\r\n- 모든 MongoDB 버전에서 자동 지원\r\n- 단일 Document 내 모든 필드 업데이트가 원자적\r\n- 트랜잭션 없이도 보장\r\n\r\n```javascript\r\n// 원자적: 두 필드가 함께 업데이트됨\r\ndb.accounts.updateOne(\r\n  { _id: 1 },\r\n  { $inc: { balance: -100 }, $push: { history: \"출금\" } }\r\n)\r\n```\r\n\r\n**Multi-Document Atomicity:**\r\n- 4.0+ 트랜잭션 필요\r\n- 명시적 session 사용\r\n- 성능 오버헤드 존재\r\n\r\n```javascript\r\n// 트랜잭션 필요: 두 Document 원자적 업데이트\r\nsession.startTransaction();\r\ndb.accounts.updateOne({ _id: 1 }, { $inc: { balance: -100 } }, { session });\r\ndb.accounts.updateOne({ _id: 2 }, { $inc: { balance: 100 } }, { session });\r\nsession.commitTransaction();\r\n```",
    "references": [
      {
        "title": "Atomicity and Transactions",
        "url": "https://www.mongodb.com/docs/manual/core/write-operations-atomicity/"
      }
    ]
  },
  {
    "id": "MONGO-050",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Read Preference와 Write Concern으로 제어되는 Eventual Consistency란 무엇이며 MongoDB에서 어떻게 관리되나요?",
    "answer": "Eventual Consistency는 시간이 지나면 모든 노드가 동일한 데이터를 갖게 되는 모델입니다.\r\n\r\n**MongoDB에서의 적용:**\r\n- Secondary는 Primary와 약간의 지연(Replication Lag) 존재\r\n- Secondary 읽기 시 최신 데이터가 아닐 수 있음\r\n\r\n**일관성 제어 방법:**\r\n\r\n1. **Write Concern:**\r\n```javascript\r\n{ w: \"majority\" }  // 과반수 복제 후 응답\r\n```\r\n\r\n2. **Read Concern:**\r\n```javascript\r\n{ readConcern: { level: \"majority\" } }  // 과반수 확인된 데이터만\r\n```\r\n\r\n3. **Read Preference:**\r\n```javascript\r\n{ readPreference: \"primary\" }  // 최신 데이터 보장\r\n```\r\n\r\n**Strong Consistency 필요 시:**\r\n- Primary 읽기 + writeConcern: majority 사용",
    "references": [
      {
        "title": "Causal Consistency",
        "url": "https://www.mongodb.com/docs/manual/core/causal-consistency-read-write-concerns/"
      }
    ]
  },
  {
    "id": "MONGO-051",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB 쿼리 성능을 개선하는 방법은?",
    "answer": "**1. 인덱스 최적화:**\r\n- 자주 쿼리하는 필드에 인덱스 생성\r\n- Covered Query 활용\r\n- 불필요한 인덱스 제거\r\n\r\n**2. 쿼리 최적화:**\r\n```javascript\r\n// Projection으로 필요한 필드만\r\ndb.users.find({}, { name: 1, email: 1 })\r\n\r\n// limit 사용\r\ndb.logs.find().sort({ date: -1 }).limit(100)\r\n```\r\n\r\n**3. 데이터 모델링:**\r\n- 자주 함께 조회되는 데이터 Embedding\r\n- 적절한 정규화/비정규화\r\n\r\n**4. explain() 분석:**\r\n- COLLSCAN 제거\r\n- totalDocsExamined 최소화\r\n\r\n**5. 하드웨어:**\r\n- Working Set이 RAM에 맞도록 메모리 확보\r\n- SSD 사용",
    "references": [
      {
        "title": "Query Optimization",
        "url": "https://www.mongodb.com/docs/manual/core/query-optimization/"
      }
    ]
  },
  {
    "id": "MONGO-052",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "쿼리 성능에 영향을 미치는 Working Set(자주 접근하는 데이터와 인덱스)이란 무엇이며 메모리와의 관계는?",
    "answer": "Working Set은 자주 접근하는 데이터와 인덱스의 집합입니다.\r\n\r\n**메모리와의 관계:**\r\n- Working Set이 RAM에 맞으면 → 빠른 성능\r\n- Working Set > RAM → 디스크 I/O 발생 (Page Fault)\r\n\r\n**모니터링:**\r\n```javascript\r\ndb.serverStatus().wiredTiger.cache\r\n// \"bytes currently in the cache\"\r\n// \"bytes read into cache\"\r\n```\r\n\r\n**최적화 방법:**\r\n1. **RAM 증설**: Working Set이 맞도록\r\n2. **인덱스 최적화**: 불필요한 인덱스 제거\r\n3. **데이터 아카이빙**: 오래된 데이터 분리\r\n4. **Projection 사용**: 필요한 필드만 조회\r\n\r\n**권장:**\r\n- Working Set은 가용 RAM의 50-80% 이내 유지\r\n- Page Fault 비율 모니터링",
    "references": [
      {
        "title": "WiredTiger Storage Engine",
        "url": "https://www.mongodb.com/docs/manual/core/wiredtiger/"
      }
    ]
  },
  {
    "id": "MONGO-053",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "쿼리 성능 최적화를 위한 Connection Pool의 개념과 적절한 크기 설정 방법은?",
    "answer": "Connection Pool은 미리 생성된 DB 연결을 재사용하는 메커니즘입니다.\r\n\r\n**장점:**\r\n- 연결 생성/해제 오버헤드 감소\r\n- 응답 시간 단축\r\n- 리소스 효율적 사용\r\n\r\n**설정 방법:**\r\n```javascript\r\n// Node.js Driver\r\nconst client = new MongoClient(uri, {\r\n  maxPoolSize: 100,    // 최대 연결 수\r\n  minPoolSize: 10,     // 최소 유지 연결\r\n  maxIdleTimeMS: 30000 // 유휴 연결 제거 시간\r\n});\r\n```\r\n\r\n**적절한 크기 산정:**\r\n- 기본값: 100\r\n- 계산: `동시 요청 수 / 애플리케이션 인스턴스 수`\r\n- MongoDB 최대: 65,536 연결\r\n\r\n**주의:**\r\n- 너무 크면 서버 리소스 낭비\r\n- 너무 작으면 연결 대기 발생",
    "references": [
      {
        "title": "Connection Pool",
        "url": "https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connection-options/"
      }
    ]
  },
  {
    "id": "MONGO-054",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB 기본 스토리지 엔진인 WiredTiger의 특징(Document-level Locking, 압축, 캐시 등)은 무엇인가요?",
    "answer": "WiredTiger는 MongoDB 3.2부터 기본 스토리지 엔진입니다 (MMAPv1은 4.2에서 제거됨).\r\n\r\n**주요 특징:**\r\n\r\n1. **Document-level Locking**: 동시성 향상 (실제로는 Intent Lock 사용)\r\n2. **압축 지원**: snappy(기본), zlib, zstd - 인덱스는 prefix 압축\r\n3. **Checkpointing**: 60초마다 일관된 스냅샷 저장\r\n4. **캐시 관리**: 내부 캐시로 성능 최적화\r\n5. **저널링**: WAL(Write-Ahead Logging)로 장애 복구 보장\r\n6. **MVCC**: Multi-Version Concurrency Control로 읽기/쓰기 동시 처리\r\n\r\n**MMAPv1과 비교 (역사적 참고):**\r\n| 구분 | WiredTiger | MMAPv1 (deprecated) |\r\n|------|------------|---------------------|\r\n| 락 | Document-level | Collection-level |\r\n| 압축 | 지원 (snappy/zlib/zstd) | 미지원 |\r\n| 캐시 | 자체 캐시 | OS 페이지 캐시 |\r\n| 동시성 | 높음 | 낮음 |\r\n\r\n**캐시 설정:**\r\n```yaml\r\n# 기본값 계산: max(256MB, (totalRAM - 1GB) * 0.5)\r\n# 컨테이너 환경: cgroup 메모리 제한 인식 (4.0.9+)\r\nstorage:\r\n  wiredTiger:\r\n    engineConfig:\r\n      cacheSizeGB: 4\r\n```\r\n\r\n**함정 - 캐시 크기 과대 설정 주의:**\r\n- OS/파일시스템 캐시용 RAM도 필요\r\n- 다른 프로세스(mongos, 애플리케이션) 고려\r\n- 일반적으로 RAM의 50% 이하 권장",
    "references": [
      {
        "title": "WiredTiger",
        "url": "https://www.mongodb.com/docs/manual/core/wiredtiger/"
      }
    ]
  },
  {
    "id": "MONGO-055",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB 기본 스토리지 엔진인 WiredTiger의 내부 Cache 크기 설정(cacheSizeGB)과 메모리 관리 전략은?",
    "answer": "**WiredTiger Cache 기본값:**\r\n- `max(256MB, (totalRAM - 1GB) × 50%)`\r\n- 예: 16GB RAM → (16 - 1) × 0.5 = 7.5GB\r\n- 컨테이너 환경: cgroup 메모리 제한 인식 (4.0.9+)\r\n\r\n**설정 방법:**\r\n```yaml\r\n# mongod.conf\r\nstorage:\r\n  wiredTiger:\r\n    engineConfig:\r\n      cacheSizeGB: 8\r\n```\r\n\r\n**메모리 관리 전략:**\r\n\r\n1. **Cache 크기 산정:**\r\n   - Working Set 크기 파악 (자주 접근하는 데이터 + 인덱스)\r\n   - 다른 프로세스 고려 (OS 캐시, 연결 오버헤드, 집계 작업)\r\n   - **일반 권장**: RAM의 50% 이하\r\n   - **공유 서버**: 더 낮게 설정\r\n\r\n2. **모니터링 지표:**\r\n```javascript\r\ndb.serverStatus().wiredTiger.cache\r\n// \"maximum bytes configured\" - 설정된 최대값\r\n// \"bytes currently in the cache\" - 현재 사용량\r\n// \"pages evicted by application threads\" - 앱 스레드 eviction (높으면 문제)\r\n// \"eviction calls to get a page found queue empty\" - 큐 비어있음 (정상)\r\n```\r\n\r\n3. **문제 징후 및 해결:**\r\n| 지표 | 문제 징후 | 해결 방법 |\r\n|------|----------|----------|\r\n| 높은 eviction | 캐시 부족 | cacheSizeGB 증가 |\r\n| dirty pages 비율 높음 | 쓰기 지연 | 쓰기 최적화, SSD 사용 |\r\n| cache 사용률 지속 100% | Working Set > Cache | RAM 증설 또는 데이터 아카이빙 |\r\n\r\n**함정 - 캐시 과다 설정:**\r\n- OS 파일시스템 캐시도 필요\r\n- 메모리 부족 시 OOM Killer 대상\r\n- 일반적으로 전체 RAM의 50-60% 초과 비권장",
    "references": [
      {
        "title": "WiredTiger Memory Use",
        "url": "https://www.mongodb.com/docs/manual/core/wiredtiger/#memory-use"
      }
    ]
  },
  {
    "id": "MONGO-056",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "explain()과 함께 쿼리 성능 분석에 사용되는 Database Profiler로 느린 쿼리를 찾는 방법은?",
    "answer": "Database Profiler는 쿼리 실행 정보를 `system.profile` 컬렉션에 기록합니다.\r\n\r\n**프로파일링 레벨:**\r\n- 0: Off (기본)\r\n- 1: 느린 쿼리만 (slowms 초과)\r\n- 2: 모든 쿼리\r\n\r\n```javascript\r\n// 프로파일러 설정\r\ndb.setProfilingLevel(1, { slowms: 100 })\r\n\r\n// 느린 쿼리 조회\r\ndb.system.profile.find().sort({ ts: -1 }).limit(10)\r\n\r\n// 가장 느린 쿼리 상위 5개\r\ndb.system.profile.find().sort({ millis: -1 }).limit(5)\r\n```\r\n\r\n**분석 항목:**\r\n- `millis`: 실행 시간\r\n- `nscanned`: 스캔한 Document 수\r\n- `query`: 쿼리 내용\r\n- `planSummary`: 실행 계획\r\n\r\n**대안:** Atlas에서는 Performance Advisor 사용",
    "references": [
      {
        "title": "Database Profiler",
        "url": "https://www.mongodb.com/docs/manual/tutorial/manage-the-database-profiler/"
      }
    ]
  },
  {
    "id": "MONGO-057",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "쓰기 성능을 최적화하기 위해 여러 쓰기 작업을 배치 처리하는 Bulk Write Operation의 장점과 사용 방법은?",
    "answer": "Bulk Write는 여러 쓰기 작업을 하나의 요청으로 배치 처리합니다.\r\n\r\n**장점:**\r\n- 네트워크 왕복 감소\r\n- 처리량 향상\r\n- 서버 부하 감소\r\n\r\n```javascript\r\n// Bulk Write 예시\r\ndb.collection.bulkWrite([\r\n  { insertOne: { document: { name: \"A\" } } },\r\n  { updateOne: { filter: { name: \"B\" }, update: { $set: { status: \"active\" } } } },\r\n  { deleteOne: { filter: { name: \"C\" } } }\r\n], { ordered: false })  // 순서 무관 시 병렬 처리\r\n```\r\n\r\n**옵션:**\r\n- `ordered: true` (기본): 순서대로 실행, 오류 시 중단\r\n- `ordered: false`: 병렬 실행, 오류 무시하고 계속\r\n\r\n**사용 사례:**\r\n- 대량 데이터 마이그레이션\r\n- 배치 업데이트\r\n- 초기 데이터 로딩",
    "references": [
      {
        "title": "Bulk Write Operations",
        "url": "https://www.mongodb.com/docs/manual/core/bulk-write-operations/"
      }
    ]
  },
  {
    "id": "MONGO-058",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "인덱싱, Projection, Bulk Write 등 Read/Write 성능을 향상시키기 위한 Best Practice는?",
    "answer": "**Read 성능:**\r\n1. 적절한 인덱스 생성 및 Covered Query 활용\r\n2. Projection으로 필요한 필드만 조회\r\n3. Read Preference로 읽기 분산\r\n4. 캐싱 레이어(Redis) 활용\r\n\r\n**Write 성능:**\r\n1. Bulk Write 사용\r\n2. Write Concern 적절히 조정 (w:1 vs majority)\r\n3. 불필요한 인덱스 제거 (쓰기 시 업데이트 필요)\r\n4. Sharding으로 쓰기 분산\r\n\r\n**공통:**\r\n```javascript\r\n// Connection Pool 최적화\r\n{ maxPoolSize: 100, minPoolSize: 10 }\r\n\r\n// 적절한 Document 설계\r\n// - 자주 함께 접근하는 데이터 Embedding\r\n// - 무한 성장 배열 피하기\r\n```\r\n\r\n**모니터링:**\r\n- `db.serverStatus()` 정기 확인\r\n- Slow Query 로깅 활성화",
    "references": [
      {
        "title": "Performance Best Practices",
        "url": "https://www.mongodb.com/docs/manual/administration/analyzing-mongodb-performance/"
      }
    ]
  },
  {
    "id": "MONGO-059",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB의 인증과 권한 관리 방법은?",
    "answer": "**인증 (Authentication):**\r\n\r\n1. **SCRAM** (기본): 사용자명/비밀번호\r\n2. **x.509**: 인증서 기반\r\n3. **LDAP**: 외부 LDAP 서버 연동\r\n4. **Kerberos**: 엔터프라이즈 인증\r\n\r\n```javascript\r\n// 사용자 생성\r\nuse admin\r\ndb.createUser({\r\n  user: \"appUser\",\r\n  pwd: \"password\",\r\n  roles: [{ role: \"readWrite\", db: \"mydb\" }]\r\n})\r\n```\r\n\r\n**권한 부여 활성화:**\r\n```yaml\r\n# mongod.conf\r\nsecurity:\r\n  authorization: enabled\r\n```\r\n\r\n**연결:**\r\n```javascript\r\nmongodb://appUser:password@host:27017/mydb?authSource=admin\r\n```\r\n\r\n**주의:** 프로덕션에서는 반드시 인증 활성화",
    "references": [
      {
        "title": "Authentication",
        "url": "https://www.mongodb.com/docs/manual/core/authentication/"
      }
    ]
  },
  {
    "id": "MONGO-060",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB에서 역할(read, readWrite, dbAdmin 등)을 통해 사용자 권한을 관리하는 Role-Based Access Control(RBAC)이란 무엇인가요?",
    "answer": "RBAC는 역할(Role)을 통해 사용자 권한을 관리하는 방식입니다.\r\n\r\n**Built-in Roles:**\r\n| 역할 | 권한 |\r\n|------|------|\r\n| read | 읽기 전용 |\r\n| readWrite | 읽기/쓰기 |\r\n| dbAdmin | DB 관리 (인덱스, 통계) |\r\n| userAdmin | 사용자 관리 |\r\n| clusterAdmin | 클러스터 관리 |\r\n| root | 모든 권한 |\r\n\r\n**Custom Role 생성:**\r\n```javascript\r\ndb.createRole({\r\n  role: \"analyticsReader\",\r\n  privileges: [\r\n    { resource: { db: \"analytics\", collection: \"\" },\r\n      actions: [\"find\", \"aggregate\"] }\r\n  ],\r\n  roles: []\r\n})\r\n\r\ndb.createUser({\r\n  user: \"analyst\",\r\n  pwd: \"password\",\r\n  roles: [\"analyticsReader\"]\r\n})\r\n```\r\n\r\n**최소 권한 원칙:** 필요한 권한만 부여",
    "references": [
      {
        "title": "Role-Based Access Control",
        "url": "https://www.mongodb.com/docs/manual/core/authorization/"
      }
    ]
  },
  {
    "id": "MONGO-061",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "전송 중(TLS), 저장 중(At-Rest), 필드 레벨 등 MongoDB에서 데이터 암호화 방법은?",
    "answer": "**1. 전송 중 암호화 (In-Transit):**\r\nTLS/SSL로 클라이언트-서버 간 통신 암호화\r\n\r\n```yaml\r\n# mongod.conf\r\nnet:\r\n  tls:\r\n    mode: requireTLS\r\n    certificateKeyFile: /path/to/server.pem\r\n```\r\n\r\n**2. 저장 중 암호화 (At-Rest):**\r\nWiredTiger의 네이티브 암호화 (Enterprise)\r\n\r\n```yaml\r\nsecurity:\r\n  enableEncryption: true\r\n  encryptionKeyFile: /path/to/keyfile\r\n```\r\n\r\n**3. 필드 레벨 암호화 (Client-Side):**\r\n특정 필드만 클라이언트에서 암호화 (4.2+)\r\n\r\n```javascript\r\nconst client = new MongoClient(uri, {\r\n  autoEncryption: {\r\n    keyVaultNamespace: \"encryption.__keyVault\",\r\n    kmsProviders: { local: { key: masterKey } }\r\n  }\r\n});\r\n```",
    "references": [
      {
        "title": "Encryption at Rest",
        "url": "https://www.mongodb.com/docs/manual/core/security-encryption-at-rest/"
      }
    ]
  },
  {
    "id": "MONGO-062",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "mongodump, 파일 시스템 스냅샷, Oplog 등을 활용한 Backup과 Restore 전략을 설명해주세요.",
    "answer": "**백업 방법:**\r\n\r\n1. **mongodump/mongorestore**: 논리적 백업\r\n   - 작은 데이터셋에 적합\r\n   - 컬렉션별 선택적 백업 가능\r\n\r\n2. **파일 시스템 스냅샷**: 물리적 백업\r\n   - 대용량에 빠름\r\n   - LVM, EBS 스냅샷 활용\r\n\r\n3. **MongoDB Atlas**: 자동 백업\r\n   - 연속 백업, Point-in-Time Recovery\r\n\r\n**백업 전략:**\r\n```\r\n┌─────────────────────────────────────┐\r\n│ Full Backup: 주 1회 (파일 스냅샷)   │\r\n│ Incremental: Oplog 지속 백업        │\r\n│ Retention: 30일 보관                │\r\n└─────────────────────────────────────┘\r\n```\r\n\r\n**복구 테스트:**\r\n- 정기적인 복구 훈련 필수\r\n- RTO/RPO 목표 설정",
    "references": [
      {
        "title": "Backup Methods",
        "url": "https://www.mongodb.com/docs/manual/core/backups/"
      }
    ]
  },
  {
    "id": "MONGO-063",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "BSON 파일로 논리적 백업/복원을 수행하는 mongodump와 mongorestore의 차이점과 사용 방법은?",
    "answer": "**mongodump**: 데이터를 BSON 파일로 내보내기\r\n**mongorestore**: BSON 파일을 MongoDB로 복원\r\n\r\n```bash\r\n# 전체 백업\r\nmongodump --uri=\"mongodb://user:pass@host:27017\" --out=/backup/\r\n\r\n# 특정 데이터베이스만\r\nmongodump --db=mydb --out=/backup/\r\n\r\n# 특정 컬렉션만\r\nmongodump --db=mydb --collection=users --out=/backup/\r\n\r\n# 복원\r\nmongorestore --uri=\"mongodb://host:27017\" /backup/\r\n\r\n# 특정 DB에 복원\r\nmongorestore --db=newdb /backup/mydb/\r\n```\r\n\r\n**옵션:**\r\n- `--gzip`: 압축\r\n- `--oplog`: 일관된 스냅샷 (Replica Set)\r\n- `--drop`: 복원 전 기존 데이터 삭제\r\n- `--numParallelCollections`: 병렬 처리\r\n\r\n**주의:** 대용량 데이터는 파일 시스템 스냅샷 권장",
    "references": [
      {
        "title": "mongodump",
        "url": "https://www.mongodb.com/docs/database-tools/mongodump/"
      }
    ]
  },
  {
    "id": "MONGO-064",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Oplog를 활용하여 특정 시점으로 복구하는 Point-in-Time Recovery가 가능한가요?",
    "answer": "네, Replica Set에서 Oplog를 활용하여 Point-in-Time Recovery가 가능합니다.\r\n\r\n**방법:**\r\n\r\n1. **mongodump + oplog:**\r\n```bash\r\n# 백업 시 oplog 포함 (일관된 스냅샷)\r\nmongodump --oplog --out=/backup/\r\n\r\n# 특정 시점까지 복원 (타임스탬프 형식: seconds:increment)\r\nmongorestore --oplogReplay --oplogLimit=\"1609459200:1\" /backup/\r\n```\r\n\r\n2. **MongoDB Atlas:**\r\n   - 자동 연속 백업\r\n   - UI에서 원하는 시점 선택 가능 (초 단위)\r\n   - Cluster-tier에 따라 보존 기간 상이\r\n\r\n**제한사항:**\r\n- Replica Set 또는 Sharded Cluster 필요 (Standalone 불가)\r\n- Oplog 보존 기간 내의 시점만 복구 가능\r\n- Oplog 크기에 따라 복구 가능 기간 결정\r\n\r\n**Oplog 보존 기간 설정 (4.4+):**\r\n```yaml\r\nstorage:\r\n  oplogMinRetentionHours: 72  # 최소 72시간 보존 (크기와 별개로)\r\n```\r\n\r\n**PITR 복구 시나리오:**\r\n| 시나리오 | 복구 방법 |\r\n|----------|----------|\r\n| 실수로 컬렉션 삭제 | 삭제 직전 시점으로 복원 |\r\n| 잘못된 업데이트 | 업데이트 전 시점으로 복원 |\r\n| 데이터 손상 | 손상 발생 전 시점으로 복원 |\r\n\r\n**함정 - PITR 한계:**\r\n- Oplog가 덮어쓰이면 해당 시점 복구 불가\r\n- 복구 후 변경된 데이터는 수동 재적용 필요\r\n- Sharded Cluster에서는 더 복잡 (각 Shard + Config Server)",
    "references": [
      {
        "title": "Point in Time Recovery",
        "url": "https://www.mongodb.com/docs/manual/tutorial/restore-replica-set-from-backup/"
      }
    ]
  },
  {
    "id": "MONGO-065",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "연결 수, 캐시 사용량, Replication Lag 등 MongoDB 모니터링 시 중요한 메트릭은 무엇인가요?",
    "answer": "**핵심 메트릭:**\r\n\r\n| 카테고리 | 메트릭 | 확인 명령 |\r\n|----------|--------|-----------|\r\n| 연결 | current connections | `db.serverStatus().connections` |\r\n| 쿼리 | opcounters (query, insert, update, delete) | `db.serverStatus().opcounters` |\r\n| 복제 | replication lag | `rs.printSecondaryReplicationInfo()` |\r\n| 메모리 | cache usage, page faults | `db.serverStatus().wiredTiger.cache` |\r\n| 잠금 | lock wait time | `db.serverStatus().locks` |\r\n| 저장 | disk space, data size | `db.stats()` |\r\n\r\n**알람 설정 권장:**\r\n- 연결 수 > 80% 한도\r\n- Replication Lag > 10초\r\n- Cache Eviction 급증\r\n- Page Faults 증가\r\n\r\n**모니터링 도구:**\r\n- MongoDB Atlas (내장 모니터링)\r\n- Prometheus + Grafana\r\n- Datadog, New Relic",
    "references": [
      {
        "title": "Monitoring",
        "url": "https://www.mongodb.com/docs/manual/administration/monitoring/"
      }
    ]
  },
  {
    "id": "MONGO-066",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Change Streams란 무엇이며 어떻게 활용하나요?",
    "answer": "Change Streams는 실시간으로 데이터 변경을 감지하는 기능입니다.\r\n\r\n**특징:**\r\n- Oplog 기반 실시간 이벤트 스트림\r\n- Replica Set 또는 Sharded Cluster 필요\r\n- Resumable (재시작 시 이어서 처리)\r\n\r\n```javascript\r\nconst changeStream = db.collection.watch([\r\n  { $match: { operationType: { $in: [\"insert\", \"update\"] } } }\r\n]);\r\n\r\nchangeStream.on(\"change\", (change) => {\r\n  console.log(change.operationType, change.fullDocument);\r\n});\r\n```\r\n\r\n**활용 사례:**\r\n- 실시간 알림/푸시\r\n- 캐시 무효화\r\n- 데이터 동기화 (CDC)\r\n- 감사 로깅\r\n\r\n**이벤트 타입:**\r\ninsert, update, replace, delete, invalidate, drop",
    "references": [
      {
        "title": "Change Streams",
        "url": "https://www.mongodb.com/docs/manual/changeStreams/"
      }
    ]
  },
  {
    "id": "MONGO-067",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "IoT 센서 데이터 등 시계열 데이터를 효율적으로 저장하는 Time Series Collection은 무엇이며 언제 사용하나요?",
    "answer": "Time Series Collection은 시계열 데이터를 효율적으로 저장하고 쿼리하기 위한 특수 컬렉션입니다 (5.0+).\r\n\r\n**특징:**\r\n- 자동 버킷팅으로 저장 공간 절약\r\n- 시계열 쿼리 최적화\r\n- 자동 압축\r\n\r\n```javascript\r\ndb.createCollection(\"sensorData\", {\r\n  timeseries: {\r\n    timeField: \"timestamp\",     // 필수\r\n    metaField: \"sensorId\",      // 선택\r\n    granularity: \"minutes\"      // seconds, minutes, hours\r\n  },\r\n  expireAfterSeconds: 86400 * 30  // 30일 후 자동 삭제\r\n});\r\n\r\ndb.sensorData.insertOne({\r\n  timestamp: new Date(),\r\n  sensorId: \"sensor001\",\r\n  temperature: 25.5,\r\n  humidity: 60\r\n});\r\n```\r\n\r\n**사용 사례:**\r\n- IoT 센서 데이터\r\n- 메트릭/로그 수집\r\n- 주가/거래 데이터",
    "references": [
      {
        "title": "Time Series Collections",
        "url": "https://www.mongodb.com/docs/manual/core/timeseries-collections/"
      }
    ]
  },
  {
    "id": "MONGO-068",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Oplog 저장에 사용되는 고정 크기 순환 버퍼 방식인 Capped Collection의 특징과 사용 사례는?",
    "answer": "Capped Collection은 고정 크기의 순환 버퍼 방식 컬렉션입니다.\r\n\r\n**특징:**\r\n- 크기 또는 문서 수 제한\r\n- 삽입 순서 보장\r\n- 가장 오래된 문서 자동 삭제\r\n- 높은 삽입 처리량\r\n- Document 삭제/크기 증가 업데이트 불가\r\n\r\n```javascript\r\ndb.createCollection(\"logs\", {\r\n  capped: true,\r\n  size: 10485760,    // 10MB\r\n  max: 5000          // 최대 5000개\r\n});\r\n```\r\n\r\n**사용 사례:**\r\n- 로그 저장 (최근 N개만 유지)\r\n- 캐싱\r\n- 실시간 스트림 버퍼\r\n\r\n**주의사항:**\r\n- Sharding 불가\r\n- TTL 인덱스 대신 사용 가능\r\n- Oplog가 대표적인 Capped Collection",
    "references": [
      {
        "title": "Capped Collections",
        "url": "https://www.mongodb.com/docs/manual/core/capped-collections/"
      }
    ]
  },
  {
    "id": "MONGO-069",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "TTL Index를 사용한 자동 데이터 만료 처리 방법은?",
    "answer": "TTL(Time-To-Live) Index는 지정된 시간 후 Document를 자동 삭제합니다.\r\n\r\n```javascript\r\n// 특정 시간 후 만료\r\ndb.sessions.createIndex(\r\n  { createdAt: 1 },\r\n  { expireAfterSeconds: 3600 }  // 1시간 후 삭제\r\n)\r\n\r\n// 특정 시점에 만료 (expireAt 필드 값 기준)\r\ndb.events.createIndex(\r\n  { expireAt: 1 },\r\n  { expireAfterSeconds: 0 }  // expireAt 필드 값에 삭제\r\n)\r\n\r\n// 삽입 예시\r\ndb.events.insertOne({\r\n  data: \"event\",\r\n  expireAt: new Date(\"2024-12-31\")  // 이 시점에 삭제\r\n});\r\n```\r\n\r\n**동작 방식:**\r\n- 백그라운드 스레드가 60초마다 확인\r\n- 정확한 삭제 시점은 보장되지 않음\r\n\r\n**사용 사례:**\r\n- 세션 데이터, 임시 토큰\r\n- 로그 데이터 보관 기간 설정\r\n- 캐시 자동 정리",
    "references": [
      {
        "title": "TTL Indexes",
        "url": "https://www.mongodb.com/docs/manual/core/index-ttl/"
      }
    ]
  },
  {
    "id": "MONGO-070",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB Atlas의 주요 기능과 장점은?",
    "answer": "MongoDB Atlas는 공식 완전 관리형 클라우드 데이터베이스 서비스입니다.\r\n\r\n**주요 기능:**\r\n- **자동화**: 프로비저닝, 패치, 업그레이드 자동화\r\n- **고가용성**: 자동 Replica Set, Multi-Region\r\n- **Sharding**: 클릭으로 Sharded Cluster 구성\r\n- **백업**: 연속 백업, Point-in-Time Recovery\r\n- **보안**: VPC Peering, 암호화, LDAP 통합\r\n\r\n**추가 서비스:**\r\n- Atlas Search: 전문 검색\r\n- Atlas Charts: 데이터 시각화\r\n- Atlas Data Lake: S3 데이터 쿼리\r\n- Atlas Functions: 서버리스 함수\r\n- Atlas Triggers: 이벤트 기반 로직\r\n\r\n**장점:**\r\n- 운영 부담 감소\r\n- 글로벌 분산 쉬움\r\n- Free Tier 제공",
    "references": [
      {
        "title": "MongoDB Atlas",
        "url": "https://www.mongodb.com/docs/atlas/"
      }
    ]
  },
  {
    "id": "MONGO-071",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB Compass란 무엇인가요?",
    "answer": "MongoDB Compass는 공식 GUI 클라이언트입니다.\r\n\r\n**주요 기능:**\r\n\r\n1. **시각적 탐색**: 스키마 구조, 데이터 분포 시각화\r\n2. **쿼리 빌더**: GUI로 쿼리 작성\r\n3. **Aggregation Builder**: 파이프라인 시각적 구성\r\n4. **인덱스 관리**: 인덱스 생성/삭제, 사용량 분석\r\n5. **성능 분석**: explain plan 시각화\r\n6. **스키마 분석**: 필드 타입, 분포 통계\r\n\r\n**버전:**\r\n- Compass (Full): 모든 기능\r\n- Compass Readonly: 읽기 전용\r\n- Compass Isolated: 네트워크 요청 없음\r\n\r\n```\r\n다운로드: https://www.mongodb.com/products/compass\r\n```\r\n\r\n**사용 사례:**\r\n- 개발 중 데이터 탐색\r\n- 쿼리 디버깅\r\n- 비개발자 데이터 조회",
    "references": [
      {
        "title": "MongoDB Compass",
        "url": "https://www.mongodb.com/docs/compass/current/"
      }
    ]
  },
  {
    "id": "MONGO-072",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB와 Elasticsearch를 함께 사용하는 아키텍처는?",
    "answer": "MongoDB를 Primary DB로, Elasticsearch를 검색 엔진으로 사용하는 패턴입니다.\r\n\r\n```\r\n┌─────────┐    ┌─────────┐    ┌───────────────┐\r\n│   App   │───▶│ MongoDB │───▶│ Elasticsearch │\r\n└─────────┘    └─────────┘    └───────────────┘\r\n    │               │                 ▲\r\n    │               │    Sync         │\r\n    │               └─────────────────┘\r\n    │\r\n    └──────── Search Queries ────────▶\r\n```\r\n\r\n**동기화 방법:**\r\n\r\n1. **Change Streams + Application**\r\n```javascript\r\nconst changeStream = db.products.watch();\r\nchangeStream.on(\"change\", (change) => {\r\n  elasticClient.index({ index: \"products\", body: change.fullDocument });\r\n});\r\n```\r\n\r\n2. **MongoDB Connector for BI / Kafka**\r\n   - Debezium + Kafka Connect\r\n\r\n3. **Monstache** (오픈소스 동기화 도구)\r\n\r\n**사용 사례:**\r\n- 복잡한 전문 검색 (MongoDB Text Index 한계 극복)\r\n- 로그 분석\r\n- 실시간 대시보드",
    "references": [
      {
        "title": "Atlas Search",
        "url": "https://www.mongodb.com/docs/atlas/atlas-search/"
      }
    ]
  },
  {
    "id": "MONGO-073",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB와 Redis를 함께 사용하는 캐싱 전략은?",
    "answer": "**Cache-Aside (Lazy Loading) 패턴:**\r\n```javascript\r\nasync function getUser(id) {\r\n  // 1. Redis 캐시 확인\r\n  let user = await redis.get(`user:${id}`);\r\n  if (user) return JSON.parse(user);\r\n\r\n  // 2. 캐시 미스 시 MongoDB 조회\r\n  user = await db.users.findOne({ _id: id });\r\n\r\n  // 3. 캐시에 저장\r\n  await redis.setex(`user:${id}`, 3600, JSON.stringify(user));\r\n  return user;\r\n}\r\n```\r\n\r\n**Write-Through 패턴:**\r\n```javascript\r\nasync function updateUser(id, data) {\r\n  // MongoDB와 Redis 동시 업데이트\r\n  await db.users.updateOne({ _id: id }, { $set: data });\r\n  await redis.setex(`user:${id}`, 3600, JSON.stringify(data));\r\n}\r\n```\r\n\r\n**캐시 무효화:**\r\n- TTL 설정으로 자동 만료\r\n- Change Streams로 실시간 무효화\r\n\r\n**사용 사례:**\r\n- 세션 저장 (Redis)\r\n- 자주 조회되는 데이터 캐싱\r\n- Rate Limiting",
    "references": [
      {
        "title": "Caching Patterns",
        "url": "https://www.mongodb.com/docs/manual/tutorial/model-data-for-atomic-operations/"
      }
    ]
  },
  {
    "id": "MONGO-074",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "CDC(Change Data Capture)를 MongoDB에서 구현하는 방법은?",
    "answer": "**Change Streams 활용 (권장):**\r\n```javascript\r\nconst pipeline = [\r\n  { $match: { operationType: { $in: [\"insert\", \"update\", \"delete\"] } } }\r\n];\r\n\r\nconst changeStream = db.collection.watch(pipeline, {\r\n  fullDocument: \"updateLookup\"  // 업데이트 시 전체 Document 포함\r\n});\r\n\r\nchangeStream.on(\"change\", async (change) => {\r\n  // 다른 시스템으로 전파\r\n  await kafka.send({ topic: \"changes\", message: change });\r\n});\r\n```\r\n\r\n**Resume Token으로 재시작:**\r\n```javascript\r\nconst resumeToken = changeStream.resumeToken;\r\n// 저장 후 재시작 시\r\ndb.collection.watch(pipeline, { resumeAfter: resumeToken });\r\n```\r\n\r\n**Debezium + Kafka 활용:**\r\n- Debezium MongoDB Connector\r\n- 대규모 분산 환경에 적합\r\n\r\n**사용 사례:**\r\n- 데이터 웨어하우스 동기화\r\n- 이벤트 기반 아키텍처\r\n- 실시간 분석 파이프라인",
    "references": [
      {
        "title": "Change Streams",
        "url": "https://www.mongodb.com/docs/manual/changeStreams/"
      }
    ]
  },
  {
    "id": "MONGO-075",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "MongoDB의 버전별 주요 변경사항과 개선점은?",
    "answer": "| 버전 | 주요 기능 |\r\n|------|----------|\r\n| **3.6** | Change Streams, JSON Schema Validation, Retryable Writes |\r\n| **4.0** | Multi-Document ACID Transactions (Replica Set), SHA-256 |\r\n| **4.2** | Distributed Transactions (Sharded Cluster), Wildcard Index, Field-Level Encryption |\r\n| **4.4** | Hedged Reads, Compound Hashed Index, Refinable Shard Keys, $unionWith |\r\n| **5.0** | Time Series Collection, Versioned API, Live Resharding, Window Functions |\r\n| **6.0** | Queryable Encryption (Preview), Cluster-to-Cluster Sync, $densify |\r\n| **7.0** | Queryable Encryption (GA), Compound Wildcard Index, $percentile |\r\n| **8.0** | Queryable Encryption 개선, 성능 최적화 (2024) |\r\n\r\n**주요 트렌드:**\r\n- 점점 강화되는 Transaction 지원\r\n- 보안 기능 강화 (Queryable Encryption)\r\n- 운영 편의성 개선 (Live Resharding)\r\n- 분석 기능 내장 (Atlas Search, Vector Search)\r\n\r\n**버전 업그레이드 시 주의사항:**\r\n1. **Feature Compatibility Version (FCV)** 확인 및 설정\r\n2. **드라이버 호환성** 확인\r\n3. **Replica Set 롤링 업그레이드** 권장 (Secondary → Primary)\r\n4. **테스트 환경에서 먼저 검증**\r\n\r\n```javascript\r\n// FCV 확인\r\ndb.adminCommand({ getParameter: 1, featureCompatibilityVersion: 1 })\r\n\r\n// FCV 설정 (업그레이드 완료 후)\r\ndb.adminCommand({ setFeatureCompatibilityVersion: \"7.0\" })\r\n```",
    "references": [
      {
        "title": "Release Notes",
        "url": "https://www.mongodb.com/docs/manual/release-notes/"
      }
    ]
  },
  {
    "id": "MONGO-076",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "대량의 데이터 마이그레이션 시 고려사항은?",
    "answer": "**사전 준비:**\r\n1. 데이터 크기/구조 분석\r\n2. 다운타임 허용 범위 결정\r\n3. 롤백 계획 수립\r\n\r\n**마이그레이션 방법:**\r\n\r\n1. **mongodump/mongorestore:**\r\n```bash\r\nmongodump --gzip --archive=/backup/data.gz\r\nmongorestore --gzip --archive=/backup/data.gz\r\n```\r\n\r\n2. **mongoimport (JSON/CSV):**\r\n```bash\r\nmongoimport --db=mydb --collection=users --file=users.json --jsonArray\r\n```\r\n\r\n3. **Bulk Write API:**\r\n```javascript\r\nconst bulk = db.collection.initializeUnorderedBulkOp();\r\ndata.forEach(doc => bulk.insert(doc));\r\nawait bulk.execute();\r\n```\r\n\r\n**최적화:**\r\n- 인덱스 나중에 생성 (삽입 속도 향상)\r\n- `ordered: false`로 병렬 처리\r\n- Balancer 일시 중지 (Sharded)\r\n\r\n**주의사항:**\r\n- 네트워크 대역폭 확인\r\n- 대상 서버 리소스 모니터링\r\n- 증분 마이그레이션 고려",
    "references": [
      {
        "title": "mongoimport",
        "url": "https://www.mongodb.com/docs/database-tools/mongoimport/"
      }
    ]
  },
  {
    "id": "MONGO-077",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Hot Shard 문제를 어떻게 해결하나요?",
    "answer": "Hot Shard는 특정 Shard에 읽기/쓰기가 집중되는 현상입니다.\r\n\r\n**원인:**\r\n- 단조 증가 Shard Key (ObjectId, 타임스탬프)\r\n- 낮은 Cardinality Shard Key\r\n- 불균등한 데이터 분포\r\n\r\n**해결 방법:**\r\n\r\n1. **Hash Sharding 사용:**\r\n```javascript\r\nsh.shardCollection(\"db.logs\", { _id: \"hashed\" })\r\n```\r\n\r\n2. **복합 Shard Key:**\r\n```javascript\r\n// 시간 기반 데이터에 테넌트 추가\r\nsh.shardCollection(\"db.events\", { tenantId: 1, timestamp: 1 })\r\n```\r\n\r\n3. **Shard Key 변경 (5.0+):**\r\n```javascript\r\ndb.adminCommand({ reshardCollection: \"db.collection\", key: { newKey: 1 } })\r\n```\r\n\r\n4. **Zone Sharding으로 분산:**\r\n\r\n**모니터링:**\r\n```javascript\r\nsh.status()  // Chunk 분포 확인\r\ndb.collection.getShardDistribution()\r\n```",
    "references": [
      {
        "title": "Shard Key Selection",
        "url": "https://www.mongodb.com/docs/manual/core/sharding-choose-a-shard-key/"
      }
    ]
  },
  {
    "id": "MONGO-078",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "N+1 문제가 MongoDB에서도 발생하나요? 해결 방법은?",
    "answer": "네, Reference 방식 사용 시 N+1 문제가 발생할 수 있습니다.\r\n\r\n**N+1 문제 예시:**\r\n```javascript\r\n// 나쁜 예: N+1 쿼리\r\nconst posts = await db.posts.find({}).toArray();  // 1번\r\nfor (const post of posts) {\r\n  post.author = await db.users.findOne({ _id: post.authorId });  // N번\r\n}\r\n```\r\n\r\n**해결 방법:**\r\n\r\n1. **$lookup 사용:**\r\n```javascript\r\ndb.posts.aggregate([\r\n  { $lookup: {\r\n      from: \"users\",\r\n      localField: \"authorId\",\r\n      foreignField: \"_id\",\r\n      as: \"author\"\r\n  }},\r\n  { $unwind: \"$author\" }\r\n])\r\n```\r\n\r\n2. **Embedding (비정규화):**\r\n```javascript\r\n// 자주 함께 조회되는 데이터는 내장\r\n{ title: \"Post\", author: { name: \"Kim\", email: \"...\" } }\r\n```\r\n\r\n3. **Batch 조회:**\r\n```javascript\r\nconst authorIds = posts.map(p => p.authorId);\r\nconst authors = await db.users.find({ _id: { $in: authorIds } }).toArray();\r\n```",
    "references": [
      {
        "title": "$lookup",
        "url": "https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/"
      }
    ]
  },
  {
    "id": "MONGO-079",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "실시간 분석을 위한 MongoDB 설계 방법은?",
    "answer": "**1. 사전 집계 (Pre-aggregation):**\r\n```javascript\r\n// 실시간 카운터 업데이트\r\ndb.stats.updateOne(\r\n  { date: \"2024-01-01\", page: \"/home\" },\r\n  { $inc: { views: 1, visitors: 1 } },\r\n  { upsert: true }\r\n)\r\n```\r\n\r\n**2. Time Series Collection (5.0+):**\r\n```javascript\r\ndb.createCollection(\"metrics\", {\r\n  timeseries: { timeField: \"ts\", metaField: \"source\", granularity: \"minutes\" }\r\n})\r\n```\r\n\r\n**3. Change Streams + 스트리밍:**\r\n```javascript\r\ndb.events.watch().on(\"change\", (change) => {\r\n  // 실시간 대시보드 업데이트\r\n  updateDashboard(change);\r\n})\r\n```\r\n\r\n**4. 읽기 분산:**\r\n- Secondary에서 분석 쿼리 실행\r\n- Analytics Node 설정\r\n\r\n**5. Atlas Charts:**\r\n- 내장 실시간 시각화\r\n\r\n**아키텍처:**\r\n```\r\nMongoDB → Change Streams → Kafka → Flink → Dashboard\r\n```",
    "references": [
      {
        "title": "Time Series Best Practices",
        "url": "https://www.mongodb.com/docs/manual/core/timeseries/timeseries-best-practices/"
      }
    ]
  },
  {
    "id": "MONGO-080",
    "category": "mongodb",
    "categoryName": "MongoDB",
    "section": "specific_db",
    "question": "Multi-tenancy 아키텍처를 MongoDB로 구현하는 방법은?",
    "answer": "**1. 컬렉션 내 테넌트 필드:**\r\n```javascript\r\n// 모든 Document에 tenantId 포함\r\n{ tenantId: \"tenant1\", data: \"...\" }\r\n\r\n// 인덱스에 tenantId 포함\r\ndb.data.createIndex({ tenantId: 1, createdAt: -1 })\r\n\r\n// 쿼리 시 항상 tenantId 포함\r\ndb.data.find({ tenantId: \"tenant1\", ... })\r\n```\r\n\r\n**2. 테넌트별 컬렉션:**\r\n```javascript\r\ndb.tenant1_orders.find({})\r\ndb.tenant2_orders.find({})\r\n```\r\n\r\n**3. 테넌트별 데이터베이스:**\r\n```javascript\r\nuse tenant1_db\r\nuse tenant2_db\r\n```\r\n\r\n**비교:**\r\n| 방식 | 격리 수준 | 관리 복잡도 | 확장성 |\r\n|------|----------|------------|--------|\r\n| 필드 | 낮음 | 쉬움 | 높음 |\r\n| 컬렉션 | 중간 | 중간 | 중간 |\r\n| 데이터베이스 | 높음 | 어려움 | 낮음 |\r\n\r\n**Zone Sharding 활용:**\r\n```javascript\r\nsh.addTagRange(\"db.data\", { tenantId: \"A\" }, { tenantId: \"B\" }, \"shard1\")\r\n```",
    "references": [
      {
        "title": "Multi-tenant Data",
        "url": "https://www.mongodb.com/docs/manual/tutorial/model-data-for-keyword-search/"
      }
    ]
  },
  {
    "id": "REDIS-001",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis의 기본 개념과 주요 특징은 무엇인가요?",
    "answer": "Redis(Remote Dictionary Server)는 오픈소스 인메모리 데이터 구조 저장소입니다.\r\n\r\n**주요 특징:**\r\n- **인메모리 저장**: 모든 데이터를 메모리에 저장하여 매우 빠른 읽기/쓰기 성능 제공\r\n- **다양한 데이터 구조**: String, List, Set, Sorted Set, Hash, Stream 등 지원\r\n- **싱글 스레드 명령 처리**: 명령어 실행은 단일 스레드로 처리하여 원자성 보장 (Redis 6.0+에서는 I/O 처리를 위한 멀티스레드 도입, 단 명령 실행 자체는 여전히 싱글 스레드)\r\n- **Persistence**: RDB 스냅샷과 AOF 로그를 통한 데이터 영속성 지원\r\n- **복제 및 클러스터링**: Master-Replica 복제와 Redis Cluster를 통한 고가용성 및 확장성\r\n- **Pub/Sub**: 실시간 메시징 기능 제공",
    "references": [
      {
        "title": "Redis Introduction",
        "url": "https://redis.io/docs/about/"
      }
    ]
  },
  {
    "id": "REDIS-002",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis가 인메모리 기반 데이터 저장소로서 제공하는 장점과 단점은 무엇인가요?",
    "answer": "**장점:**\r\n- **초고속 성능**: 디스크 I/O 없이 메모리에서 직접 데이터 접근 (읽기/쓰기 지연시간 마이크로초 단위)\r\n- **높은 처리량**: 초당 수십만 건의 연산 처리 가능\r\n- **낮은 지연시간**: 실시간 애플리케이션에 적합\r\n- **예측 가능한 성능**: 디스크 기반 DB의 캐시 미스로 인한 성능 변동 없음\r\n\r\n**단점:**\r\n- **메모리 비용**: RAM은 디스크보다 비싸므로 대용량 데이터 저장 시 비용 증가\r\n- **데이터 용량 제한**: 물리적 메모리 크기에 제한됨\r\n- **휘발성 위험**: 서버 장애 시 메모리 데이터 손실 가능 (Persistence 설정으로 완화)\r\n- **메모리 단편화**: 장시간 운영 시 메모리 단편화 발생 가능",
    "references": [
      {
        "title": "Redis Persistence",
        "url": "https://redis.io/docs/management/persistence/"
      }
    ]
  },
  {
    "id": "REDIS-003",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis에서 제공하는 주요 데이터 타입(String, List, Set, Sorted Set, Hash, Stream)에 대해 설명해주세요.",
    "answer": "**String**\r\n- 가장 기본적인 타입, 최대 512MB 저장\r\n- 텍스트, 숫자, 바이너리 데이터 저장 가능\r\n- 사용 예: 캐싱, 세션 저장, 카운터\r\n\r\n**List**\r\n- 순서가 있는 문자열 리스트 (양방향 연결 리스트)\r\n- 앞/뒤에서 삽입/삭제 O(1)\r\n- 사용 예: 메시지 큐, 최근 항목 목록\r\n\r\n**Set**\r\n- 중복 없는 문자열 집합\r\n- 합집합, 교집합, 차집합 연산 지원\r\n- 사용 예: 태그, 고유 방문자 추적\r\n\r\n**Sorted Set (ZSet)**\r\n- 점수(score)로 정렬된 고유 문자열 집합\r\n- 범위 조회, 순위 조회 효율적\r\n- 사용 예: 리더보드, 우선순위 큐\r\n\r\n**Hash**\r\n- 필드-값 쌍의 컬렉션 (객체 표현에 적합)\r\n- 개별 필드 접근/수정 가능\r\n- 사용 예: 사용자 프로필, 설정 정보\r\n\r\n**Stream**\r\n- 로그 형태의 데이터 구조, 시간순 메시지 저장\r\n- Consumer Group 지원으로 메시지 큐 구현\r\n- 사용 예: 이벤트 소싱, 메시지 스트리밍",
    "references": [
      {
        "title": "Redis Data Types",
        "url": "https://redis.io/docs/data-types/"
      }
    ]
  },
  {
    "id": "REDIS-004",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis의 키-값 구조와 MongoDB, Cassandra 등 다른 NoSQL 데이터베이스와의 차이점은 무엇인가요?",
    "answer": "**Redis의 키-값 구조 특징:**\r\n- 키는 바이너리 세이프 문자열 (최대 512MB)\r\n- 값은 단순 문자열이 아닌 다양한 데이터 구조 지원 (Rich Data Structures)\r\n\r\n**다른 NoSQL과의 차이점:**\r\n\r\n| 구분 | Redis | Document DB (MongoDB) | Wide-Column (Cassandra) |\r\n|------|-------|----------------------|------------------------|\r\n| 데이터 모델 | Key-Value + 데이터 구조 | JSON Document | Column Family |\r\n| 저장 위치 | 인메모리 (선택적 디스크) | 디스크 | 디스크 |\r\n| 쿼리 | 키 기반 + 제한적 검색 | 풍부한 쿼리 언어 | CQL |\r\n| 주 용도 | 캐시, 세션, 실시간 처리 | 범용 | 대규모 분산 저장 |\r\n| 일관성 | 강한 일관성 (단일) | 튜너블 | 튜너블 |\r\n\r\n**Redis만의 강점:**\r\n- 원자적 연산 보장 (싱글 스레드)\r\n- 밀리초 이하의 지연시간\r\n- 풍부한 데이터 구조로 복잡한 연산 지원",
    "references": [
      {
        "title": "Redis Keys",
        "url": "https://redis.io/docs/data-types/tutorial/"
      }
    ]
  },
  {
    "id": "REDIS-005",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis에서 Persistence를 위해 지원하는 RDB와 AOF 방식의 차이점과 각각의 장단점은 무엇인가요?",
    "answer": "**RDB (Redis Database Backup)**\r\n- 특정 시점의 메모리 스냅샷을 바이너리 파일로 저장\r\n- `SAVE` (동기) 또는 `BGSAVE` (비동기) 명령으로 생성\r\n\r\n| 장점 | 단점 |\r\n|-----|-----|\r\n| 컴팩트한 단일 파일로 백업/재해복구 용이 | 스냅샷 간 데이터 손실 가능 (수분 단위) |\r\n| 복구 속도 빠름 (AOF 대비) | 대용량 데이터 시 fork() 부하로 일시 지연 발생 가능 |\r\n| Replica 부분 재동기화 지원 | |\r\n\r\n**AOF (Append Only File)**\r\n- 모든 쓰기 명령을 로그로 기록\r\n- `appendfsync` 옵션: always, everysec, no\r\n\r\n| 장점 | 단점 |\r\n|-----|-----|\r\n| 데이터 손실 최소화 (everysec 시 최대 1초) | 파일 크기가 RDB보다 큼 |\r\n| 손상 시 부분 복구 가능 | 복구 시간이 더 길 수 있음 |\r\n| Rewrite로 파일 크기 최적화 | Redis < 7.0에서 rewrite 중 메모리 사용 증가 |\r\n\r\n**appendfsync 옵션 비교:**\r\n\r\n| 설정 | 동작 | 특징 |\r\n|-----|-----|-----|\r\n| `always` | 매 쓰기마다 fsync | 가장 안전, 가장 느림 |\r\n| `everysec` | 1초마다 fsync | **권장** - 안전성과 성능 균형 |\r\n| `no` | OS에 위임 | 가장 빠름, ~30초 데이터 손실 위험 |\r\n\r\n**권장 설정:**\r\n- PostgreSQL 수준의 데이터 안전성이 필요하면 **RDB + AOF 둘 다 활성화**\r\n- AOF로 내구성 확보, RDB로 빠른 복구 및 백업\r\n- 캐시 전용이면 persistence 비활성화도 고려",
    "references": [
      {
        "title": "Redis Persistence",
        "url": "https://redis.io/docs/management/persistence/"
      }
    ]
  },
  {
    "id": "REDIS-006",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis의 Pub/Sub 기능은 어떻게 동작하며, 이를 활용한 메시징 시스템 구현 사례에 대해 설명해주세요.",
    "answer": "**동작 방식:**\r\n1. **Publisher**: `PUBLISH channel message` 명령으로 채널에 메시지 발행\r\n2. **Subscriber**: `SUBSCRIBE channel` 명령으로 채널 구독\r\n3. 메시지는 구독 중인 모든 클라이언트에게 실시간으로 전달 (Fire-and-forget)\r\n\r\n**특징:**\r\n- 채널은 사전 생성 불필요 (동적 생성)\r\n- 패턴 구독 지원 (`PSUBSCRIBE news.*`)\r\n- 메시지 저장 없음 (구독자 없으면 메시지 손실)\r\n- At-most-once 전달 보장\r\n\r\n**활용 사례:**\r\n\r\n1. **실시간 알림 시스템**\r\n```\r\nPUBLISH notifications:user123 \"새 메시지가 도착했습니다\"\r\n```\r\n\r\n2. **채팅 애플리케이션**\r\n```\r\nSUBSCRIBE chat:room:general\r\n```\r\n\r\n3. **캐시 무효화 브로드캐스트**\r\n```\r\nPUBLISH cache:invalidate \"user:profile:123\"\r\n```\r\n\r\n4. **마이크로서비스 이벤트 전파**\r\n- 서비스 간 느슨한 결합 유지\r\n- 이벤트 기반 아키텍처 구현\r\n\r\n**주의사항:**\r\n- **메시지 손실 가능**: 구독자 없으면 메시지 유실, 연결 끊긴 동안 메시지 놓침\r\n- **재전송 없음**: 구독자가 메시지 수신 실패해도 재시도 없음\r\n- **백프레셔 없음**: 느린 구독자가 있어도 발행자 차단 안 됨\r\n- 메시지 영속성/순서 보장 필요 시 **Redis Streams** 권장\r\n- 대규모 시스템에서는 Kafka, RabbitMQ 등 전용 메시지 브로커 고려\r\n\r\n**Pub/Sub vs Streams 선택 기준:**\r\n\r\n| 요구사항 | Pub/Sub | Streams |\r\n|---------|---------|---------|\r\n| 메시지 저장 | 불필요 | 필요 |\r\n| Consumer Group | 불필요 | 필요 |\r\n| 단순성 | 우선 | 복잡해도 OK |\r\n| 사용 사례 | 실시간 알림 | 작업 큐, 이벤트 소싱 |",
    "references": [
      {
        "title": "Redis Pub/Sub",
        "url": "https://redis.io/docs/interact/pubsub/"
      }
    ]
  },
  {
    "id": "REDIS-007",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis Cluster의 기본 아키텍처와 데이터 샤딩(sharding) 방식에 대해 설명해주세요.",
    "answer": "**기본 아키텍처:**\r\n- 최소 3개의 마스터 노드로 구성\r\n- 각 마스터는 1개 이상의 레플리카 보유 권장\r\n- 노드 간 Gossip 프로토콜로 상태 공유\r\n- 클라이언트는 어떤 노드에 연결해도 올바른 노드로 리다이렉트\r\n\r\n**데이터 샤딩 방식 (Hash Slot):**\r\n- 총 16,384개의 해시 슬롯 사용\r\n- 키의 CRC16 해시값 % 16384로 슬롯 결정\r\n- 각 마스터 노드가 슬롯의 일부를 담당\r\n\r\n```\r\n예: 3개 노드 클러스터\r\nNode A: 슬롯 0-5460\r\nNode B: 슬롯 5461-10922\r\nNode C: 슬롯 10923-16383\r\n```\r\n\r\n**Hash Tag:**\r\n- `{user}:profile`, `{user}:settings`처럼 중괄호 사용\r\n- 같은 태그의 키는 동일 슬롯에 저장 (멀티키 연산 가능)\r\n\r\n**장점:**\r\n- 수평적 확장성 (노드 추가로 용량/처리량 증가)\r\n- 자동 페일오버로 고가용성 확보\r\n- 데이터 자동 재분배\r\n\r\n**주의사항 (트레이드오프):**\r\n- **강한 일관성 미보장**: 비동기 복제로 인해 페일오버 시 확인된 쓰기 손실 가능\r\n- **멀티키 연산 제한**: 같은 해시 슬롯에 있는 키만 멀티키 연산 가능 (Hash Tag 필요)\r\n- **최소 3개 마스터 필요**: 프로덕션 환경에서는 6노드(3마스터+3레플리카) 권장\r\n- **Docker/NAT 환경 제한**: `--net=host` 모드 필요",
    "references": [
      {
        "title": "Redis Cluster Specification",
        "url": "https://redis.io/docs/reference/cluster-spec/"
      }
    ]
  },
  {
    "id": "REDIS-008",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis Sentinel의 역할은 무엇이며, Redis Cluster와 달리 어떻게 고가용성을 보장하나요?",
    "answer": "**Redis Sentinel의 역할:**\r\n\r\n1. **모니터링 (Monitoring)**\r\n   - Master와 Replica 인스턴스 상태 지속 확인\r\n   - 노드의 정상 동작 여부 감시\r\n\r\n2. **알림 (Notification)**\r\n   - 장애 발생 시 관리자/시스템에 알림\r\n   - API를 통한 이벤트 전달\r\n\r\n3. **자동 페일오버 (Automatic Failover)**\r\n   - Master 장애 감지 시 Replica를 새 Master로 승격\r\n   - 다른 Replica들을 새 Master에 연결\r\n   - 클라이언트에게 새 Master 주소 제공\r\n\r\n4. **구성 제공자 (Configuration Provider)**\r\n   - 클라이언트가 현재 Master 주소를 Sentinel에 질의\r\n\r\n**동작 방식:**\r\n```\r\n1. Sentinel 인스턴스들이 Master 모니터링\r\n2. Master 응답 없음 감지 (SDOWN - 주관적 다운)\r\n3. 다수의 Sentinel이 동의 (ODOWN - 객관적 다운)\r\n4. Sentinel 리더 선출 (Raft 기반)\r\n5. 리더가 최적의 Replica를 Master로 승격\r\n```\r\n\r\n**Quorum vs Majority 차이:**\r\n- **Quorum**: 장애 감지(ODOWN)에 필요한 Sentinel 수\r\n- **Majority**: 실제 페일오버 승인에 필요한 Sentinel 수 (과반수)\r\n- 예: 5개 Sentinel, quorum=2 → 2개가 장애 동의, 3개가 페일오버 승인 필요\r\n\r\n**권장 구성:**\r\n- 최소 3개의 Sentinel 인스턴스 (홀수 권장)\r\n- 서로 다른 물리 서버/가용 영역에 배치\r\n- quorum 설정으로 페일오버 결정 기준 지정\r\n\r\n**Sentinel vs Cluster 선택 기준:**\r\n\r\n| 항목 | Sentinel | Cluster |\r\n|-----|----------|---------|\r\n| 용도 | 단일 마스터 HA | 데이터 샤딩 + HA |\r\n| 데이터 분산 | 없음 | 자동 샤딩 (16,384 슬롯) |\r\n| 복잡도 | 상대적 단순 | 더 복잡 |\r\n| 확장성 | 수직 확장 위주 | 수평 확장 |\r\n| 선택 기준 | 단일 인스턴스로 충분한 용량 | 대용량/고처리량 필요 시 |",
    "references": [
      {
        "title": "Redis Sentinel",
        "url": "https://redis.io/docs/management/sentinel/"
      }
    ]
  },
  {
    "id": "REDIS-009",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis의 캐시 만료(expiration) 정책 설정 방법과, 실제 운영 시 고려해야 할 점은 무엇인가요?",
    "answer": "**만료 시간 설정 방법:**\r\n\r\n```bash\r\n# 키 생성 시 만료 설정\r\nSET key value EX 3600          # 3600초 후 만료\r\nSET key value PX 3600000       # 3600000밀리초 후 만료\r\nSETEX key 3600 value           # SET + EX 동일\r\n\r\n# 기존 키에 만료 설정\r\nEXPIRE key 3600                # 초 단위\r\nPEXPIRE key 3600000            # 밀리초 단위\r\nEXPIREAT key 1735689600        # Unix timestamp\r\n\r\n# 만료 시간 확인/제거\r\nTTL key                        # 남은 시간 (초)\r\nPERSIST key                    # 만료 제거\r\n```\r\n\r\n**운영 시 고려사항:**\r\n\r\n1. **Cache Stampede (Thundering Herd)**\r\n   - 동시에 많은 키 만료 시 DB 부하 급증\r\n   - 해결: 만료 시간에 랜덤 지터(jitter) 추가\r\n\r\n2. **메모리 관리**\r\n   - 만료된 키는 즉시 삭제되지 않음 (lazy + 주기적 삭제)\r\n   - maxmemory 설정과 함께 eviction 정책 설정 필요\r\n\r\n3. **TTL 설계**\r\n   - 데이터 특성에 맞는 적절한 TTL 설정\r\n   - 너무 짧으면 캐시 효율 저하, 너무 길면 데이터 불일치\r\n\r\n4. **만료 이벤트 모니터링**\r\n   - Keyspace notifications로 만료 이벤트 구독 가능\r\n   - `CONFIG SET notify-keyspace-events Ex`",
    "references": [
      {
        "title": "Redis EXPIRE",
        "url": "https://redis.io/commands/expire/"
      }
    ]
  },
  {
    "id": "REDIS-010",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis의 캐시 eviction 정책(LRU, LFU, volatile-ttl 등) 간의 차이점과 메모리 부족 시 키 제거 전략 선택 기준에 대해 설명해주세요.",
    "answer": "**Eviction 정책 종류:**\r\n\r\n| 정책 | 설명 |\r\n|-----|-----|\r\n| `noeviction` | 메모리 초과 시 쓰기 명령 에러 반환 |\r\n| `allkeys-lru` | 모든 키 중 가장 오래 사용되지 않은 키 제거 |\r\n| `volatile-lru` | 만료 설정된 키 중 LRU 제거 |\r\n| `allkeys-lfu` | 모든 키 중 가장 적게 사용된 키 제거 |\r\n| `volatile-lfu` | 만료 설정된 키 중 LFU 제거 |\r\n| `allkeys-random` | 모든 키 중 무작위 제거 |\r\n| `volatile-random` | 만료 설정된 키 중 무작위 제거 |\r\n| `volatile-ttl` | 만료 시간이 가장 짧은 키 제거 |\r\n\r\n**LRU vs LFU 비교:**\r\n\r\n- **LRU (Least Recently Used)**: 최근 접근 시간 기준\r\n  - 최근 사용된 데이터가 다시 사용될 확률 높음 가정\r\n  - 일반적인 캐시 워크로드에 적합\r\n\r\n- **LFU (Least Frequently Used)**: 접근 빈도 기준\r\n  - 자주 사용되는 데이터 유지\r\n  - 인기 콘텐츠 캐싱에 적합 (Redis 4.0+)\r\n\r\n**선택 기준:**\r\n\r\n| 사용 사례 | 권장 정책 |\r\n|---------|----------|\r\n| 일반 캐시 | `allkeys-lru` |\r\n| 세션 저장소 | `volatile-lru` 또는 `volatile-ttl` |\r\n| 인기 콘텐츠 캐시 | `allkeys-lfu` |\r\n| 데이터 손실 불가 | `noeviction` |\r\n\r\n**설정 방법:**\r\n```bash\r\nCONFIG SET maxmemory 4gb\r\nCONFIG SET maxmemory-policy allkeys-lru\r\n```",
    "references": [
      {
        "title": "Redis Eviction",
        "url": "https://redis.io/docs/reference/eviction/"
      }
    ]
  },
  {
    "id": "REDIS-011",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis의 트랜잭션 기능(MULTI, EXEC, WATCH 등)을 활용하여 동시성 문제를 어떻게 해결할 수 있는지 설명해주세요.",
    "answer": "**기본 트랜잭션 (MULTI/EXEC):**\r\n\r\n```bash\r\nMULTI                    # 트랜잭션 시작\r\nSET user:1:name \"Alice\"  # 명령 큐잉\r\nINCR user:1:visits       # 명령 큐잉\r\nEXEC                     # 일괄 실행\r\n```\r\n\r\n- 큐에 쌓인 명령들이 순차적으로 원자적 실행\r\n- 중간에 다른 클라이언트 명령 끼어들지 않음\r\n\r\n**WATCH를 활용한 Optimistic Locking:**\r\n\r\n```bash\r\nWATCH balance:user:1     # 키 감시 시작\r\nGET balance:user:1       # 현재 값 읽기 (클라이언트에서)\r\n# ... 로직 수행 ...\r\nMULTI\r\nSET balance:user:1 950   # 새 값 설정\r\nEXEC                     # WATCH 이후 변경되었으면 nil 반환\r\n```\r\n\r\n**동시성 문제 해결 예시 (재고 차감):**\r\n\r\n```python\r\ndef decrease_stock(item_id):\r\n    while True:\r\n        redis.watch(f\"stock:{item_id}\")\r\n        stock = int(redis.get(f\"stock:{item_id}\"))\r\n\r\n        if stock <= 0:\r\n            redis.unwatch()\r\n            return False\r\n\r\n        pipe = redis.pipeline()\r\n        pipe.multi()\r\n        pipe.decr(f\"stock:{item_id}\")\r\n\r\n        try:\r\n            pipe.execute()  # 성공 시 루프 종료\r\n            return True\r\n        except WatchError:\r\n            continue  # 충돌 시 재시도\r\n```\r\n\r\n**주의사항:**\r\n- Redis 트랜잭션은 롤백 없음 (에러 발생해도 다른 명령 실행됨)\r\n- WATCH는 트랜잭션 전 키 변경 감지용 (낙관적 잠금)\r\n- 복잡한 원자적 연산은 Lua 스크립트 권장",
    "references": [
      {
        "title": "Redis Transactions",
        "url": "https://redis.io/docs/interact/transactions/"
      }
    ]
  },
  {
    "id": "REDIS-012",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis에서 MULTI/EXEC 트랜잭션의 한계를 보완하기 위해 Lua 스크립트를 사용하는 이유와 이점은 무엇인가요?",
    "answer": "**MULTI/EXEC의 한계:**\r\n- 큐잉 단계에서 값을 읽고 그 값에 따라 다른 명령 실행 불가\r\n- 조건부 로직 구현 불가 (예: IF-THEN-ELSE)\r\n- 롤백 없음\r\n\r\n**Lua 스크립트 사용 이유:**\r\n\r\n1. **완전한 원자성 보장**\r\n   - 스크립트 전체가 단일 명령처럼 원자적 실행\r\n   - 중간에 다른 명령 끼어들지 않음\r\n   - 에러 발생 시 부분 실행 없음 (MULTI/EXEC와 차이)\r\n\r\n2. **네트워크 왕복 감소**\r\n   - 여러 명령을 한 번의 호출로 실행\r\n   - 클라이언트-서버 간 통신 오버헤드 감소\r\n\r\n3. **복잡한 로직 구현**\r\n   - 조건문, 반복문 등 프로그래밍 로직 사용 가능\r\n   - 중간 값을 읽고 그에 따라 다른 명령 실행 가능 (MULTI/EXEC 불가)\r\n\r\n**사용 예시 - Rate Limiter:**\r\n\r\n```lua\r\n-- KEYS[1]: rate limit key\r\n-- ARGV[1]: limit, ARGV[2]: window (seconds)\r\n\r\nlocal current = redis.call('INCR', KEYS[1])\r\nif current == 1 then\r\n    redis.call('EXPIRE', KEYS[1], ARGV[2])\r\nend\r\nif current > tonumber(ARGV[1]) then\r\n    return 0  -- 제한 초과\r\nend\r\nreturn 1  -- 허용\r\n```\r\n\r\n**실행 방법:**\r\n```bash\r\n# 직접 실행\r\nEVAL \"return redis.call('SET', KEYS[1], ARGV[1])\" 1 mykey myvalue\r\n\r\n# 스크립트 캐싱\r\nSCRIPT LOAD \"return redis.call('GET', KEYS[1])\"\r\nEVALSHA <sha1> 1 mykey\r\n```\r\n\r\n**이점 정리:**\r\n| 장점 | 설명 |\r\n|-----|-----|\r\n| 원자성 | 완전한 원자성으로 경쟁 상태 방지 |\r\n| 성능 | 네트워크 RTT 최소화 |\r\n| 재사용성 | EVALSHA로 캐싱된 스크립트 재사용 (SHA1 해시) |\r\n| 유연성 | 복잡한 비즈니스 로직 서버사이드 실행 |\r\n\r\n**주의사항:**\r\n- 스크립트 실행 중 전체 Redis 블로킹 (긴 스크립트 주의)\r\n- 기본 5초 타임아웃 (`lua-time-limit` 설정)\r\n- 외부 네트워크 호출, 파일 I/O 불가\r\n- Cluster 환경에서 모든 키는 같은 슬롯에 있어야 함",
    "references": [
      {
        "title": "Redis Scripting",
        "url": "https://redis.io/docs/interact/programmability/eval-intro/"
      }
    ]
  },
  {
    "id": "REDIS-013",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis의 메모리 관리 전략과, 메모리 부족 시 발생할 수 있는 문제 및 해결 방법에 대해 설명해주세요.",
    "answer": "**메모리 관리 전략:**\r\n\r\n1. **maxmemory 설정**\r\n```bash\r\nCONFIG SET maxmemory 4gb\r\n```\r\n\r\n2. **maxmemory-policy 설정**\r\n   - 메모리 한계 도달 시 동작 정의\r\n   - allkeys-lru, volatile-lru, noeviction 등\r\n\r\n3. **데이터 구조 최적화**\r\n   - 짧은 키 이름 사용\r\n   - Hash로 작은 객체들 그룹화\r\n   - 적절한 데이터 타입 선택\r\n\r\n**메모리 부족 시 문제:**\r\n\r\n| 문제 | 설명 |\r\n|-----|-----|\r\n| 쓰기 실패 | noeviction 정책 시 OOM 에러 |\r\n| 성능 저하 | 빈번한 eviction으로 캐시 히트율 하락 |\r\n| 스왑 사용 | OS 스왑 발생 시 심각한 지연 |\r\n| 복제 지연 | 메모리 부족으로 복제 버퍼 오버플로우 |\r\n| 서비스 중단 | OOM Killer에 의해 프로세스 종료 |\r\n\r\n**해결 방법:**\r\n\r\n1. **설정 최적화**\r\n```bash\r\nmaxmemory 4gb\r\nmaxmemory-policy allkeys-lru\r\nmaxmemory-samples 10\r\n```\r\n\r\n2. **모니터링 및 알림**\r\n```bash\r\nINFO memory\r\nMEMORY DOCTOR\r\n```\r\n\r\n3. **아키텍처 개선**\r\n   - Redis Cluster로 수평 확장\r\n   - 데이터 TTL 적절히 설정\r\n   - 대용량 데이터는 다른 저장소 사용",
    "references": [
      {
        "title": "Redis Memory Optimization",
        "url": "https://redis.io/docs/management/optimization/memory-optimization/"
      }
    ]
  },
  {
    "id": "REDIS-014",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis에서 Key 네임스페이스(예: user:1234:profile 같은 Key prefix)를 사용하는 이유와 메모리 관리 및 운영상 장점은 무엇인가요?",
    "answer": "**Key Prefix 사용 이유:**\r\n\r\nRedis는 단일 키 공간(flat namespace)을 사용하므로, 논리적 그룹화를 위해 프리픽스 컨벤션 사용\r\n\r\n**네이밍 컨벤션 예시:**\r\n```\r\nuser:1234:profile\r\nuser:1234:sessions\r\norder:5678:items\r\ncache:api:products\r\nsession:abc123\r\n```\r\n\r\n**장점:**\r\n\r\n1. **논리적 분리**\r\n   - 데이터 유형별, 서비스별 키 구분\r\n   - 멀티테넌트 환경에서 테넌트별 분리\r\n\r\n2. **관리 용이성**\r\n   - `KEYS user:*` 또는 `SCAN`으로 그룹 조회\r\n   - 특정 프리픽스 일괄 삭제 가능\r\n\r\n3. **Redis Cluster 최적화**\r\n   - Hash Tag `{user:1234}:profile`로 관련 키 같은 슬롯 배치\r\n   - 멀티키 연산 가능하게 함\r\n\r\n4. **충돌 방지**\r\n   - 여러 애플리케이션이 같은 Redis 사용 시 네임스페이스 분리\r\n   - 환경별 구분 (dev:, staging:, prod:)\r\n\r\n5. **모니터링 및 분석**\r\n   - 프리픽스별 메모리 사용량 분석\r\n   - 키 패턴별 접근 통계",
    "references": [
      {
        "title": "Redis Key Patterns",
        "url": "https://redis.io/docs/data-types/tutorial/"
      }
    ]
  },
  {
    "id": "REDIS-015",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis를 활용한 세션 관리 구현의 장점과 고려해야 할 단점은 무엇인가요?",
    "answer": "**장점:**\r\n\r\n1. **빠른 성능**\r\n   - 인메모리 저장으로 밀리초 이하 세션 조회\r\n   - 높은 동시 접속자 처리 가능\r\n\r\n2. **분산 환경 지원**\r\n   - 여러 애플리케이션 서버가 세션 공유\r\n   - 로드 밸런서 뒤에서 Sticky Session 불필요\r\n\r\n3. **자동 만료**\r\n   - TTL 설정으로 세션 자동 정리\r\n   - 메모리 관리 용이\r\n\r\n4. **확장성**\r\n   - Redis Cluster로 수평 확장\r\n   - 수백만 세션 처리 가능\r\n\r\n**구현 예시:**\r\n```bash\r\nHSET session:abc123 user_id 1 username \"alice\" role \"admin\"\r\nEXPIRE session:abc123 3600\r\n```\r\n\r\n**고려해야 할 단점:**\r\n\r\n1. **데이터 손실 위험**\r\n   - 메모리 기반으로 서버 장애 시 세션 손실\r\n   - 해결: AOF 활성화, Replica 구성\r\n\r\n2. **추가 인프라**\r\n   - Redis 서버 별도 운영 필요\r\n   - 네트워크 홉 추가\r\n\r\n3. **직렬화 오버헤드**\r\n   - 세션 객체 직렬화/역직렬화 필요\r\n\r\n4. **보안 고려사항**\r\n   - Redis 접근 제어 필요\r\n   - 민감 정보 암호화 권장\r\n\r\n5. **네트워크 의존성**\r\n   - Redis 연결 실패 시 서비스 영향\r\n   - 해결: 연결 풀링, 회로 차단기 패턴",
    "references": [
      {
        "title": "Redis as Session Store",
        "url": "https://redis.io/docs/latest/develop/use/patterns/"
      }
    ]
  },
  {
    "id": "REDIS-016",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis의 데이터 복제(replication) 메커니즘과 이를 통한 데이터 가용성 확보 방법에 대해 설명해주세요.",
    "answer": "**복제 메커니즘:**\r\n\r\n1. **초기 동기화 (Full Sync)**\r\n   - Replica가 Master에 연결 시 RDB 스냅샷 전송\r\n   - 스냅샷 생성 중 발생한 쓰기는 버퍼에 저장 후 전송\r\n\r\n2. **지속적 복제 (Incremental Sync)**\r\n   - Master의 모든 쓰기 명령을 Replica에 전파\r\n   - 비동기 방식으로 동작 (기본)\r\n\r\n3. **부분 재동기화 (Partial Resync)**\r\n   - 연결 끊김 후 재연결 시 변경분만 동기화\r\n   - Replication Backlog 버퍼 활용\r\n\r\n**설정 방법:**\r\n```bash\r\nREPLICAOF master-host 6379\r\n```\r\n\r\n**가용성 확보 방법:**\r\n\r\n1. **읽기 부하 분산**\r\n   - Replica에서 읽기 처리로 Master 부하 감소\r\n\r\n2. **장애 대응**\r\n   - Master 장애 시 Replica를 Master로 승격\r\n   - 자동: Redis Sentinel 사용\r\n\r\n3. **데이터 안전성**\r\n```bash\r\nmin-replicas-to-write 1\r\nmin-replicas-max-lag 10\r\n```",
    "references": [
      {
        "title": "Redis Replication",
        "url": "https://redis.io/docs/management/replication/"
      }
    ]
  },
  {
    "id": "REDIS-017",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis 복제 환경에서 데이터 정합성을 보장하기 위한 방법(WAIT, min-replicas 설정 등)과 각각의 한계는 무엇인가요?",
    "answer": "**데이터 정합성 보장 방법:**\r\n\r\n**1. WAIT 명령 (동기 복제)**\r\n```bash\r\nSET key value\r\nWAIT 1 5000  # 최소 1개 Replica에 복제 완료까지 5초 대기\r\n```\r\n- **중요**: WAIT는 복제본 존재만 확인하며, **강한 일관성을 보장하지 않음**\r\n- 페일오버 시 WAIT로 확인된 쓰기도 손실 가능 (persistence 설정에 따라)\r\n- **한계**: 지연시간 증가, Replica 장애 시 쓰기 차단 가능\r\n\r\n**2. 최소 Replica 요구사항**\r\n```bash\r\nmin-replicas-to-write 1\r\nmin-replicas-max-lag 10\r\n```\r\n- Master가 N개 이상의 Replica와 M초 이내 연결 시에만 쓰기 허용\r\n- 데이터 손실 시간 윈도우를 제한 (best-effort)\r\n- **한계**: Replica 부족 시 쓰기 불가, 강한 일관성 아닌 시간 제한된 손실 범위\r\n\r\n**3. Lua 스크립트 활용**\r\n- 복잡한 연산을 원자적으로 실행\r\n- **한계**: 스크립트 실행 중 전체 Redis 블로킹\r\n\r\n**4. WATCH/MULTI 트랜잭션**\r\n- Optimistic Locking으로 동시성 제어\r\n- **한계**: 충돌 시 재시도 필요\r\n\r\n**Redis의 근본적 한계 (함정 질문 포인트):**\r\n\r\n| 한계 | 설명 |\r\n|-----|-----|\r\n| 비동기 복제 | 기본적으로 Master 쓰기 후 응답, Replica 복제는 비동기 |\r\n| WAIT != 강한 일관성 | WAIT는 복제 확인만, 페일오버 시 데이터 손실 가능 |\r\n| 최종 일관성 | 강한 일관성 보장 불가 (CAP에서 AP 성향) |\r\n| 페일오버 데이터 손실 | Master 장애 시 미복제 데이터 손실 가능 |\r\n\r\n**실무 권장:**\r\n- 강한 일관성이 필수인 경우 Redis보다 RDBMS 또는 Raft 기반 시스템 고려\r\n- Redis는 \"best-effort\" 데이터 안전성 제공",
    "references": [
      {
        "title": "Redis Consistency",
        "url": "https://redis.io/docs/management/replication/"
      }
    ]
  },
  {
    "id": "REDIS-018",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis 성능 최적화를 위해 고려해야 할 주요 설정과 모니터링 도구에는 어떤 것들이 있나요?",
    "answer": "**주요 성능 최적화 설정:**\r\n\r\n**1. 메모리 관련**\r\n```bash\r\nmaxmemory 4gb\r\nmaxmemory-policy allkeys-lru\r\n```\r\n\r\n**2. Persistence 튜닝**\r\n```bash\r\nsave 900 1\r\nappendfsync everysec\r\n```\r\n\r\n**3. 클라이언트 최적화**\r\n- 연결 풀링 사용\r\n- 파이프라이닝으로 RTT 감소\r\n\r\n**모니터링 도구 및 명령:**\r\n\r\n| 도구/명령 | 용도 |\r\n|---------|-----|\r\n| `INFO` | 전체 서버 통계 |\r\n| `INFO memory` | 메모리 상세 정보 |\r\n| `SLOWLOG GET` | 느린 명령 로그 |\r\n| `LATENCY DOCTOR` | 지연 진단 |\r\n| `MEMORY DOCTOR` | 메모리 문제 진단 |\r\n\r\n**외부 모니터링 도구:**\r\n- **Redis Insight**: 공식 GUI 모니터링 도구\r\n- **Prometheus + Grafana**: redis_exporter 연동\r\n\r\n**최적화 체크리스트:**\r\n- 적절한 maxmemory 및 eviction 정책\r\n- KEYS 명령 대신 SCAN 사용\r\n- 큰 컬렉션 분할 (Big Key 방지)\r\n- 파이프라이닝 활용",
    "references": [
      {
        "title": "Redis Administration",
        "url": "https://redis.io/docs/management/admin/"
      }
    ]
  },
  {
    "id": "REDIS-019",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis와 Memcached의 차이점 및 각 솔루션의 장단점에 대해 설명해주세요.",
    "answer": "**주요 차이점 비교:**\r\n\r\n| 항목 | Redis | Memcached |\r\n|-----|-------|-----------|\r\n| 데이터 타입 | String, List, Set, Hash 등 | String만 |\r\n| 데이터 영속성 | RDB, AOF 지원 | 없음 |\r\n| 복제 | Master-Replica 지원 | 없음 |\r\n| 클러스터링 | Redis Cluster | 클라이언트 샤딩 |\r\n| Pub/Sub | 지원 | 미지원 |\r\n| 멀티스레드 | 싱글 (I/O는 6.0+ 멀티) | 멀티스레드 |\r\n| 메모리 효율 | 상대적으로 낮음 | 높음 |\r\n\r\n**Redis 장점:**\r\n- 다양한 데이터 구조로 복잡한 연산 가능\r\n- 데이터 영속성으로 재시작 후 복구\r\n- 복제 및 고가용성 내장\r\n\r\n**Memcached 장점:**\r\n- 단순하고 가벼움\r\n- 멀티스레드로 멀티코어 활용\r\n- 메모리 효율적\r\n\r\n**선택 기준:**\r\n\r\n| 요구사항 | 권장 |\r\n|---------|-----|\r\n| 단순 키-값 캐시 | Memcached |\r\n| 복잡한 데이터 구조 | Redis |\r\n| 데이터 영속성 필요 | Redis |\r\n| 고가용성 필요 | Redis |",
    "references": [
      {
        "title": "Redis vs Others",
        "url": "https://redis.io/docs/getting-started/faq/"
      }
    ]
  },
  {
    "id": "REDIS-020",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis를 운영할 때 데이터 보안 및 접근 제어는 어떻게 구현할 수 있나요?",
    "answer": "**접근 제어 방법:**\r\n\r\n**1. 인증 (Authentication)**\r\n```bash\r\nrequirepass your-strong-password\r\n\r\n# ACL (Redis 6.0+)\r\nACL SETUSER app-user on >password ~cache:* +get +set +del\r\n```\r\n\r\n**2. ACL (Access Control Lists)**\r\n```bash\r\nACL SETUSER readonly on >pass123 ~* +@read\r\nACL SETUSER app on >secret ~app:* +@all -@dangerous\r\n```\r\n\r\n**3. 네트워크 보안**\r\n```bash\r\nbind 127.0.0.1 192.168.1.100\r\nrename-command FLUSHALL \"\"\r\n```\r\n\r\n**4. TLS/SSL 암호화**\r\n```bash\r\ntls-port 6379\r\ntls-cert-file /path/to/redis.crt\r\ntls-key-file /path/to/redis.key\r\n```\r\n\r\n**보안 체크리스트:**\r\n\r\n| 항목 | 설정 |\r\n|-----|-----|\r\n| 인증 활성화 | requirepass 또는 ACL |\r\n| 바인딩 제한 | bind 127.0.0.1 |\r\n| 위험 명령 비활성화 | FLUSHALL, CONFIG 등 |\r\n| TLS 암호화 | 프로덕션 환경 필수 |\r\n| 방화벽 | 신뢰된 IP만 허용 |",
    "references": [
      {
        "title": "Redis Security",
        "url": "https://redis.io/docs/management/security/"
      }
    ]
  },
  {
    "id": "REDIS-021",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis 장시간 운영 시 발생할 수 있는 메모리 단편화(mem_fragmentation_ratio) 문제와 이를 완화하기 위한 전략은 무엇인가요?",
    "answer": "**메모리 단편화란?**\r\n- OS가 할당한 물리 메모리(RSS)와 Redis가 실제 사용하는 메모리(used_memory) 간 차이\r\n- `mem_fragmentation_ratio = RSS / used_memory`로 확인\r\n\r\n**정상 범위 및 해석:**\r\n\r\n| 비율 | 상태 | 설명 |\r\n|-----|-----|-----|\r\n| 1.0 ~ 1.5 | 정상 | 약간의 단편화는 정상 |\r\n| 1.5 이상 | 주의 | 메모리 낭비 발생, 단편화 해소 필요 |\r\n| 1.0 미만 | 위험 | 스왑 사용 중 가능성 (심각한 성능 저하) |\r\n\r\n**중요**: 피크 메모리 사용 후 데이터 삭제 시 RSS가 바로 감소하지 않아 단편화율이 높게 보일 수 있음 (정상 동작)\r\n\r\n**발생 원인:**\r\n- 다양한 크기의 키/값 반복 생성/삭제\r\n- 긴 시간 운영으로 메모리 공간 분산\r\n- 피크 사용 후 데이터 삭제 (RSS 미반환)\r\n\r\n**확인 방법:**\r\n```bash\r\nINFO memory\r\n# used_memory: Redis가 할당한 메모리\r\n# used_memory_rss: OS가 할당한 실제 물리 메모리\r\n# mem_fragmentation_ratio: RSS / used_memory\r\n```\r\n\r\n**완화 전략:**\r\n\r\n**1. Active Defragmentation (Redis 4.0+)**\r\n```bash\r\nactivedefrag yes\r\nactive-defrag-threshold-lower 10\r\nactive-defrag-cycle-min 1\r\nactive-defrag-cycle-max 25\r\n```\r\n\r\n**2. Jemalloc 사용**\r\n- Redis 기본 메모리 할당자\r\n- 단편화 최소화에 최적화\r\n\r\n**3. 재시작을 통한 해결**\r\n- Replica 승격 방식으로 무중단 재시작\r\n\r\n**4. 데이터 구조 최적화**\r\n- 비슷한 크기의 키/값 사용\r\n- Hash의 listpack 인코딩 활용 (Redis 7.0+에서 ziplist를 대체)",
    "references": [
      {
        "title": "Redis Memory Optimization",
        "url": "https://redis.io/docs/management/optimization/memory-optimization/"
      }
    ]
  },
  {
    "id": "REDIS-022",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis의 키 만료(EXPIRE) 기능이 내부적으로 어떻게 구현되며(Lazy/Active Expiration), 만료된 데이터를 효율적으로 처리하는 방법은 무엇인가요?",
    "answer": "**내부 구현 방식:**\r\n\r\nRedis는 **Lazy Expiration + Active Expiration** 두 가지 방식 조합 사용\r\n\r\n**1. Lazy Expiration (수동적)**\r\n- 클라이언트가 키에 접근할 때 만료 여부 확인\r\n- 만료되었으면 삭제 후 nil 반환\r\n- 접근하지 않는 키는 메모리에 남아있을 수 있음\r\n\r\n**2. Active Expiration (능동적)**\r\n- 백그라운드에서 주기적으로 실행 (기본 hz=10, 초당 10회 실행)\r\n- 만료 설정된 키 중 무작위 20개 샘플링\r\n- 만료된 키 삭제, 샘플 중 25% 이상 만료 시 반복 (최대 25ms)\r\n\r\n**동작 예시:**\r\n```\r\n1. 20개 키 샘플링\r\n2. 만료된 키 삭제\r\n3. 25% 이상 만료 → 1단계 반복\r\n4. 25% 미만 또는 25ms 경과 → 종료\r\n```\r\n\r\n**효율적인 만료 처리 전략:**\r\n\r\n**1. 만료 시간 분산 (Cache Stampede 방지)**\r\n```python\r\nbase_ttl = 3600\r\njitter = random.randint(0, 300)\r\nredis.setex(key, base_ttl + jitter, value)\r\n```\r\n\r\n**2. Keyspace Notifications**\r\n```bash\r\nCONFIG SET notify-keyspace-events Ex\r\nSUBSCRIBE __keyevent@0__:expired\r\n```\r\n- **주의**: 만료 이벤트는 best-effort, 보장되지 않음\r\n\r\n**주의사항:**\r\n- 만료 키가 많으면 Active Expiration에 CPU 사용\r\n- Replica에서는 자체적으로 키 만료하지 않음, Master의 DEL 명령 대기\r\n- 비양수 TTL 설정 시 즉시 삭제 (expired 이벤트가 아닌 del 이벤트 발생)\r\n- RENAME 시 TTL은 새 키로 이전됨",
    "references": [
      {
        "title": "Redis EXPIRE",
        "url": "https://redis.io/commands/expire/"
      }
    ]
  },
  {
    "id": "REDIS-023",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis의 비동기 복제(기본)와 동기 복제(WAIT 명령) 방식의 차이점, 그리고 각 방식의 선택 기준에 대해 설명해주세요.",
    "answer": "**비동기 복제 (기본값):**\r\n- Master가 쓰기 완료 후 즉시 클라이언트에 응답\r\n- Replica로 전파는 백그라운드에서 진행\r\n- 지연시간 최소화, 데이터 손실 가능성 있음\r\n\r\n**동기 복제 (WAIT 명령):**\r\n```bash\r\nSET key value\r\nWAIT 1 5000  # 1개 Replica 복제 완료까지 최대 5초 대기\r\n```\r\n\r\n**차이점 비교:**\r\n\r\n| 항목 | 비동기 복제 | 동기 복제 (WAIT) |\r\n|-----|-----------|-----------------|\r\n| 응답 시점 | 즉시 | Replica 확인 후 |\r\n| 지연시간 | 낮음 | 높음 |\r\n| 데이터 손실 위험 | 있음 | 감소 (완전 제거 아님) |\r\n\r\n**WAIT의 한계 (중요):**\r\n- WAIT는 복제본 존재만 확인, **강한 일관성 보장 아님**\r\n- 페일오버 시 WAIT로 확인된 쓰기도 손실 가능\r\n- Replica의 persistence 설정에 따라 디스크 기록 여부 달라짐\r\n- Replica가 Master로 승격되어야 쓰기가 \"안전\"해짐\r\n\r\n**선택 기준:**\r\n\r\n| 상황 | 권장 방식 |\r\n|-----|----------|\r\n| 캐시 용도, 성능 중시 | 비동기 (기본) |\r\n| 데이터 손실 최소화 | WAIT + min-replicas 조합 |\r\n| 강한 일관성 필수 | Redis 외 다른 솔루션 고려 |",
    "references": [
      {
        "title": "Redis Replication",
        "url": "https://redis.io/docs/management/replication/"
      }
    ]
  },
  {
    "id": "REDIS-024",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis의 WATCH 명령어를 활용한 Optimistic Locking 메커니즘은 어떻게 동작하며, MULTI/EXEC과 함께 어떻게 사용하나요?",
    "answer": "**Optimistic Locking 개념:**\r\n- 데이터 충돌이 드물다고 가정\r\n- 락을 미리 잡지 않고 커밋 시점에 충돌 검사\r\n- 충돌 발생 시 재시도\r\n\r\n**WATCH 동작 방식:**\r\n\r\n```bash\r\nWATCH balance:user:1    # 1. 키 감시 시작\r\nGET balance:user:1      # 2. 현재 값 읽기\r\nMULTI                   # 3. 트랜잭션 시작\r\nSET balance:user:1 900  # 4. 명령 큐잉\r\nEXEC                    # 5. 실행 (변경 감지 시 nil 반환)\r\n```\r\n\r\n**구현 예시:**\r\n```python\r\ndef transfer_funds(from_user, to_user, amount):\r\n    while True:\r\n        try:\r\n            redis.watch(f\"balance:{from_user}\")\r\n            balance = int(redis.get(f\"balance:{from_user}\"))\r\n\r\n            pipe = redis.pipeline(True)\r\n            pipe.set(f\"balance:{from_user}\", balance - amount)\r\n            pipe.execute()\r\n            return True\r\n        except WatchError:\r\n            continue  # 충돌 시 재시도\r\n```\r\n\r\n**주요 명령어:**\r\n\r\n| 명령 | 설명 |\r\n|-----|-----|\r\n| `WATCH key` | 키 감시 시작 |\r\n| `UNWATCH` | 감시 해제 |\r\n| `MULTI` | 트랜잭션 시작 |\r\n| `EXEC` | 실행 (WATCH 키 변경 시 nil) |",
    "references": [
      {
        "title": "Redis Transactions",
        "url": "https://redis.io/docs/interact/transactions/"
      }
    ]
  },
  {
    "id": "REDIS-025",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis Cluster에서 해시 슬롯 기반 데이터 재분배(Resharding)를 수행할 때의 절차와 주의할 점은 무엇인가요?",
    "answer": "**Resharding이란?**\r\n- 해시 슬롯을 노드 간 이동하여 데이터 재분배\r\n- 노드 추가/제거, 부하 분산 시 필요\r\n\r\n**절차:**\r\n\r\n**1. 클러스터 상태 확인**\r\n```bash\r\nredis-cli --cluster check 127.0.0.1:7000\r\n```\r\n\r\n**2. 새 노드 추가 (필요 시)**\r\n```bash\r\nredis-cli --cluster add-node 127.0.0.1:7003 127.0.0.1:7000\r\n```\r\n\r\n**3. 슬롯 재분배**\r\n```bash\r\nredis-cli --cluster reshard 127.0.0.1:7000\r\nredis-cli --cluster rebalance 127.0.0.1:7000\r\n```\r\n\r\n**주의사항:**\r\n\r\n| 주의점 | 설명 |\r\n|-------|-----|\r\n| 서비스 영향 | 슬롯 이동 중 리다이렉트 발생 |\r\n| 대역폭 | 대량 데이터 이동 시 네트워크 부하 |\r\n| Big Key | 큰 키 이동 시 블로킹 가능 |\r\n| 점진적 수행 | 한 번에 많은 슬롯 이동 피하기 |\r\n\r\n**모범 사례:**\r\n1. 트래픽 낮은 시간에 수행\r\n2. 소량씩 점진적 이동\r\n3. 각 단계 후 상태 확인",
    "references": [
      {
        "title": "Redis Cluster Tutorial",
        "url": "https://redis.io/docs/management/scaling/"
      }
    ]
  },
  {
    "id": "REDIS-026",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis의 MULTI/EXEC 트랜잭션이 ACID 특성(원자성, 일관성, 격리성, 지속성)을 어떻게 보장하며, RDBMS 트랜잭션과 어떤 차이가 있나요?",
    "answer": "**ACID 특성별 분석:**\r\n\r\n**1. Atomicity (원자성) - 부분적 보장**\r\n- 트랜잭션 내 명령들은 연속적으로 중단 없이 실행됨\r\n- **핵심 차이**: 개별 명령 실행 에러 시에도 나머지 명령 계속 실행 (롤백 없음)\r\n- 큐잉 단계 에러(문법 오류)는 전체 트랜잭션 중단\r\n\r\n```bash\r\nMULTI\r\nSET key1 \"value\"\r\nINCR key1           # 에러: 문자열에 INCR 불가\r\nSET key2 \"value\"    # 여전히 실행됨\r\nEXEC                # key1 에러, key2 성공\r\n```\r\n\r\n**2. Consistency (일관성) - 부분적 보장**\r\n- 단일 명령은 항상 일관성 유지\r\n- 트랜잭션 중 에러 발생 시 부분 적용 가능 (불일치 상태 발생 가능)\r\n\r\n**3. Isolation (격리성) - 보장**\r\n- 싱글 스레드로 명령 처리\r\n- MULTI/EXEC 블록은 완전히 격리 (다른 클라이언트 끼어들기 불가)\r\n\r\n**4. Durability (지속성) - 설정에 따라**\r\n\r\n| 설정 | 지속성 |\r\n|-----|-------|\r\n| AOF always | 모든 명령 즉시 기록 |\r\n| AOF everysec | 최대 1초 손실 |\r\n| RDB만 | 스냅샷 간격만큼 손실 |\r\n\r\n**RDBMS 트랜잭션과 비교:**\r\n\r\n| 특성 | Redis | RDBMS |\r\n|-----|-------|-------|\r\n| 원자성 | 중단 없는 실행 (롤백 없음) | 완전 (에러 시 롤백) |\r\n| 격리성 | 완전 (싱글 스레드) | 레벨 선택 가능 |\r\n| 롤백 | **불가** | 가능 |\r\n| 중첩 트랜잭션 | 불가 | 가능 |\r\n\r\n**왜 Redis는 롤백을 지원하지 않는가?**\r\n- Redis 명령은 잘못된 인자로만 실패 (프로그래밍 에러)\r\n- 프로덕션에서는 발생하지 않아야 하는 에러\r\n- 롤백 미지원으로 성능 이점 확보\r\n\r\n**결론:**\r\n- Redis 트랜잭션은 전통적 ACID 완전 보장하지 않음\r\n- 강한 트랜잭션 필요 시 Lua 스크립트(원자성 완전 보장) 또는 RDBMS 고려",
    "references": [
      {
        "title": "Redis Transactions",
        "url": "https://redis.io/docs/interact/transactions/"
      }
    ]
  },
  {
    "id": "REDIS-027",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis Sorted Set(ZSet)의 내부 구현 방식(Skip List, Hash Table)과 리더보드, 우선순위 큐 등 대표적인 활용 사례에 대해 설명해주세요.",
    "answer": "**내부 구현 방식:**\r\n\r\nRedis Sorted Set은 **dual-ported 데이터 구조**로 Skip List와 Hash Table을 동시에 사용\r\n\r\n**1. 작은 데이터: Listpack (Redis 7.0+) / Ziplist (이전 버전)**\r\n- 기본 조건: `zset-max-listpack-entries 128`, `zset-max-listpack-value 64`\r\n- 연속된 메모리 블록에 저장\r\n- 메모리 효율적이지만 O(N) 접근\r\n\r\n**2. 큰 데이터: Skip List + Hash Table**\r\n- **Skip List**: 점수 기반 정렬 및 범위 검색 O(log N)\r\n- **Hash Table**: 멤버 존재 여부 및 점수 O(1) 조회\r\n- 두 구조를 동시에 유지하여 다양한 연산 최적화\r\n\r\n**Skip List 선택 이유:**\r\n- 균형 트리 대비 구현 단순\r\n- 범위 쿼리 효율적\r\n- 동시성 제어 용이 (Redis는 싱글스레드지만)\r\n\r\n**시간 복잡도:**\r\n\r\n| 연산 | 복잡도 | 설명 |\r\n|-----|-------|-----|\r\n| ZADD | O(log N) | Skip List 삽입 |\r\n| ZSCORE | O(1) | Hash Table 조회 |\r\n| ZRANK | O(log N) | Skip List 탐색 |\r\n| ZRANGE | O(log N + M) | 시작점 탐색 + M개 순회 |\r\n| ZRANGEBYSCORE | O(log N + M) | 점수 범위 탐색 |\r\n\r\n**대표 활용 사례:**\r\n\r\n**1. 리더보드**\r\n```bash\r\nZADD leaderboard 1500 \"player:alice\"\r\nZREVRANGE leaderboard 0 9 WITHSCORES\r\n```\r\n\r\n**2. 시간 기반 이벤트**\r\n```bash\r\nZADD scheduled:tasks 1700000000 \"task:123\"\r\n```\r\n\r\n**3. 레이트 리미터**\r\n```bash\r\nZADD ratelimit:user:1 <timestamp> <request-id>\r\nZREMRANGEBYSCORE ratelimit:user:1 0 <1분전>\r\n```",
    "references": [
      {
        "title": "Redis Sorted Sets",
        "url": "https://redis.io/docs/data-types/sorted-sets/"
      }
    ]
  },
  {
    "id": "REDIS-028",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis의 Hash 자료구조를 활용하여 메모리 사용량을 최적화하는 방법(listpack 인코딩, 객체 버킷팅 등)은 무엇인가요?",
    "answer": "**Hash의 메모리 최적화 원리:**\r\n\r\n작은 Hash는 **listpack** 인코딩 사용 (Redis 7.0+, 이전 버전은 ziplist)\r\n- 연속된 메모리 블록에 필드-값 저장\r\n- 개별 키-값 대비 메모리 오버헤드 대폭 감소\r\n\r\n**Redis 7.0+ listpack 설정:**\r\n```bash\r\nhash-max-listpack-entries 512\r\nhash-max-listpack-value 64\r\n```\r\n\r\n**최적화 전략:**\r\n\r\n**1. 객체 저장 시 Hash 사용**\r\n```bash\r\n# 비효율적 - 키마다 오버헤드 발생\r\nSET user:1:name \"Alice\"\r\nSET user:1:email \"alice@example.com\"\r\n\r\n# 효율적 - 하나의 Hash로 그룹화\r\nHSET user:1 name \"Alice\" email \"alice@example.com\"\r\n```\r\n\r\n**2. 작은 객체 버킷팅 (극한 최적화)**\r\n```bash\r\n# 키 ID를 분할하여 Hash로 그룹화\r\n# object:1234 → HSET object:12 34 \"value\"\r\nHSET users:123 456:name \"Alice\"\r\n```\r\n- 100,000개 객체 기준: 11MB → 1.7MB (6.5배 절약)\r\n\r\n**주의사항:**\r\n\r\n| 항목 | 고려사항 |\r\n|-----|---------|\r\n| listpack 한계 초과 | hashtable로 변환되어 메모리 증가 |\r\n| 필드 독립적 TTL | Hash 필드별 만료 불가 (전체 Hash에만 TTL 설정) |\r\n| 부분 조회 | 필요한 필드만 HGET으로 조회 가능 |\r\n\r\n**메모리 분석:**\r\n```bash\r\nMEMORY USAGE user:1        # 키의 메모리 사용량 (바이트)\r\nOBJECT ENCODING user:1     # listpack 또는 hashtable 확인\r\nDEBUG OBJECT user:1        # 상세 정보 (프로덕션 주의)\r\n```",
    "references": [
      {
        "title": "Redis Hashes",
        "url": "https://redis.io/docs/data-types/hashes/"
      }
    ]
  },
  {
    "id": "REDIS-029",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis에서 메모리 사용 현황을 모니터링하기 위한 주요 명령어(INFO memory, MEMORY USAGE/DOCTOR/STATS 등)와 그 활용법에 대해 설명해주세요.",
    "answer": "**INFO memory 명령:**\r\n```bash\r\nredis-cli INFO memory\r\n```\r\n\r\n**주요 지표:**\r\n\r\n| 지표 | 설명 |\r\n|-----|-----|\r\n| `used_memory` | Redis가 할당한 메모리 |\r\n| `used_memory_rss` | OS가 할당한 실제 메모리 |\r\n| `mem_fragmentation_ratio` | RSS/used_memory (1.5 이상 주의) |\r\n\r\n**MEMORY 명령어:**\r\n```bash\r\nMEMORY USAGE mykey\r\nMEMORY DOCTOR\r\nMEMORY STATS\r\n```\r\n\r\n**실시간 모니터링:**\r\n```bash\r\nSLOWLOG GET 10\r\nCLIENT LIST\r\n```\r\n\r\n**외부 도구 연동:**\r\n- **Redis Insight**: 공식 GUI\r\n- **Prometheus + Grafana**: redis_exporter 연동\r\n\r\n**모니터링 체크리스트:**\r\n- 메모리 사용률\r\n- 단편화율\r\n- 캐시 히트율\r\n- 연결 수\r\n- 느린 쿼리",
    "references": [
      {
        "title": "Redis INFO",
        "url": "https://redis.io/commands/info/"
      }
    ]
  },
  {
    "id": "REDIS-030",
    "category": "redis",
    "categoryName": "Redis",
    "section": "specific_db",
    "question": "Redis Streams와 Redis Modules(RediSearch, RedisJSON 등)가 기존 Pub/Sub 대비 어떤 장점을 가지며, 백엔드 시스템에서 어떻게 활용될 수 있나요?",
    "answer": "**Redis Streams:**\r\n\r\n- 로그 형태의 추가 전용 데이터 구조\r\n- Consumer Group으로 분산 처리 지원\r\n\r\n```bash\r\nXADD mystream * field1 value1\r\nXREADGROUP GROUP mygroup consumer1 STREAMS mystream >\r\n```\r\n\r\n**vs Pub/Sub:**\r\n\r\n| 항목 | Streams | Pub/Sub |\r\n|-----|---------|---------|\r\n| 메시지 저장 | 영구 저장 | 저장 안 됨 |\r\n| 재처리 | 가능 | 불가능 |\r\n| Consumer Group | 지원 | 미지원 |\r\n\r\n**Redis Modules:**\r\n\r\n| 모듈 | 기능 |\r\n|-----|-----|\r\n| RediSearch | 전문 검색 |\r\n| RedisJSON | JSON 문서 저장/쿼리 |\r\n| RedisTimeSeries | 시계열 데이터 |\r\n| RedisBloom | Bloom Filter |\r\n\r\n**기존 기능 대비 장점:**\r\n- RediSearch: 서버사이드 검색\r\n- RedisJSON: 부분 쿼리/수정\r\n- RedisTimeSeries: 다운샘플링, 집계",
    "references": [
      {
        "title": "Redis Streams",
        "url": "https://redis.io/docs/data-types/streams/"
      },
      {
        "title": "Redis Modules",
        "url": "https://redis.io/modules"
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { specific_dbData };
}
