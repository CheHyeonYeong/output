const specific_dbData = [
  {
    "id": "ES-001",
    "category": "elasticsearch",
    "categoryName": "Elasticsearch",
    "section": "specific_db",
    "question": "Elasticsearch의 기본 아키텍처와 주요 컴포넌트(Cluster, Node, Index, Document 등)에 대해 설명해주세요.",
    "answer": "Elasticsearch는 분산 검색 및 분석 엔진으로, 다음과 같은 주요 컴포넌트로 구성됩니다:\nCluster: 하나 이상의 노드로 구성된 집합으로, 모든 데이터를 저장하고 통합 인덱싱 및 검색 기능을 제공합니다. 고유한 이름으로 식별됩니다.\nNode: 클러스터의 일부로서 데이터를 저장하고 인덱싱 및 검색에 참여하는 단일 서버입니다. Master, Data, Ingest 등 역할별로 구분됩니다.\nIndex: 유사한 특성을 가진 도큐먼트의 모음입니다. RDBMS의 데이터베이스와 유사한 개념입니다.\nDocument: 인덱스에 저장되는 기본 정보 단위로, JSON 형식으로 표현됩니다. RDBMS의 행(row)과 유사합니다.\nShard: 인덱스를 수평 분할한 조각으로, 데이터 분산 저장과 병렬 처리를 가능하게 합니다.",
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
    "answer": "Index(인덱스)는 도큐먼트의 논리적 컨테이너로, 관련된 데이터를 그룹화합니다. RDBMS의 테이블과 유사하지만 더 유연한 스키마를 가집니다.\n\nDocument(도큐먼트)는 검색 가능한 데이터의 최소 단위로, JSON 객체 형태로 저장됩니다. 각 도큐먼트는 고유한 _id를 가지며, 필드(field)들의 집합으로 구성됩니다.\n\n관계:\n하나의 인덱스는 여러 도큐먼트를 포함할 수 있습니다\n도큐먼트는 반드시 하나의 인덱스에 속해야 합니다\n인덱스의 매핑(mapping)은 도큐먼트 필드의 데이터 타입을 정의합니다",
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
    "answer": "Primary Shard(프라이머리 샤드):\n인덱스의 데이터를 수평 분할한 단위입니다\n인덱스 생성 시 샤드 수가 결정됩니다\n변경이 필요한 경우 Split API(샤드 증가) 또는 Shrink API(샤드 감소)를 사용하거나 Reindex가 필요합니다\n각 도큐먼트는 하나의 프라이머리 샤드에만 저장됩니다\n\nReplica Shard(레플리카 샤드):\n프라이머리 샤드의 복사본입니다\n고가용성 제공: 프라이머리 샤드 장애 시 레플리카가 승격됩니다\n검색 성능 향상: 검색 요청을 분산 처리할 수 있습니다\n동적으로 개수 조정이 가능합니다\n\n주요 차이점:\n구분   Primary Shard   Replica Shard\n\n역할   데이터 저장/쓰기   복제/읽기 분산\n변경   Split/Shrink API 또는 Reindex 필요   동적 변경 가능\n필수 여부   필수   선택",
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
    "answer": "클러스터(Cluster)는 하나 이상의 노드로 구성된 집합으로, 동일한 cluster.name을 공유합니다.\n\n노드(Node)는 클러스터를 구성하는 개별 서버로, 역할에 따라 다음과 같이 구분됩니다:\nMaster Node: 클러스터 상태 관리, 인덱스 생성/삭제, 샤드 할당 결정\nData Node: 실제 데이터 저장, 검색 및 집계 수행\nCoordinating Node: 검색 요청 라우팅 및 결과 병합\nIngest Node: 인덱싱 전 데이터 전처리\n\n관계:\n노드는 클러스터에 참여하여 데이터와 워크로드를 분산합니다\nMaster-eligible 노드 중 하나가 마스터로 선출됩니다\n노드 간 통신은 Transport 계층(기본 9300 포트)을 통해 이루어집니다",
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
    "answer": "Query DSL(Domain Specific Language)은 JSON 기반의 쿼리 언어로, Elasticsearch에서 검색을 수행하는 표준 방법입니다.\n\n기본 구조:\n\n주요 컨텍스트:\nQuery Context: 관련성 점수(score)를 계산합니다\nFilter Context: 조건 일치 여부만 판단하며 캐싱됩니다\n\n기본 사용 예시:",
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
    "answer": "Match Query:\n전문 검색(Full-text search)에 사용됩니다\n검색어를 분석기(Analyzer)를 통해 토큰화합니다\n분석된 토큰으로 검색하여 유연한 매칭이 가능합니다\n\nTerm Query:\n정확한 값 매칭(Exact match)에 사용됩니다\n분석기를 거치지 않고 원본 그대로 검색합니다\nkeyword 필드, 숫자, 날짜 등에 적합합니다\n\n핵심 차이: Match는 분석기 적용 O, Term은 분석기 적용 X\n\n주의사항 (함정):\ntext 필드에 Term Query 사용 시 예상과 다른 결과가 나올 수 있습니다\n예: \"Quick Brown Fox\"가 text 필드에 저장되면 \"quick\", \"brown\", \"fox\"로 인덱싱됨\nterm: { \"content\": \"Quick\" }는 매칭 실패 (대소문자 불일치)\nterm: { \"content\": \"quick\" }는 매칭 성공\n권장: text 필드는 Match Query, keyword 필드는 Term Query 사용",
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
    "answer": "Range Query는 숫자, 날짜, 문자열 필드에서 특정 범위 내의 값을 검색합니다.\n\n주요 연산자:\ngt: 초과, gte: 이상\nlt: 미만, lte: 이하\n\n활용 사례:\n\n주의사항:\n날짜 형식: 인덱스 매핑의 날짜 형식과 일치해야 합니다\n타임존: timezone 파라미터로 시간대를 명시하는 것이 좋습니다\n성능: 넓은 범위 쿼리는 많은 도큐먼트를 스캔할 수 있어 Filter Context 사용 권장\n문자열 범위: 사전순 비교이므로 의도한 결과와 다를 수 있습니다",
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
    "answer": "Bool Query는 여러 쿼리를 논리적으로 조합하는 복합 쿼리입니다.\n\n구성 요소:\n\n절   설명   점수 영향   캐싱\n\nmust   반드시 일치해야 함 (AND)   O   X\nshould   일치하면 점수 증가 (OR)   O   X\nmustnot   일치하면 제외 (NOT)   X   O\nfilter   반드시 일치해야 함 (필터링)   X   O\n\n예시:\n\n성능 팁: 점수 계산이 필요 없는 조건은 filter를 사용하여 캐싱 이점을 활용하세요.\n\n주의사항 (함정):\nshould 절만 있고 must나 filter가 없으면 minimumshouldmatch: 1이 자동 적용\nmust나 filter가 있으면 should는 선택적 (점수에만 영향)\nmust_not은 점수에 영향 없음 - 필터링만 수행",
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
    "answer": "Aggregation은 데이터를 그룹화하고 통계를 계산하는 기능으로, SQL의 GROUP BY와 유사합니다.\n\nBucket Aggregation:\n도큐먼트를 기준에 따라 그룹(버킷)으로 분류합니다\n예: terms, datehistogram, range, filters\n\nMetric Aggregation:\n숫자 값에 대한 통계를 계산합니다\n예: sum, avg, min, max, cardinality, stats\n\nPipeline Aggregation:\n다른 집계 결과를 입력으로 사용합니다\n예: derivative, movingavg, bucketsort\n\n중첩 사용 예시:",
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
    "answer": "Analyzer(분석기)는 텍스트를 검색 가능한 토큰으로 변환하는 파이프라인입니다.\n\n구성 요소:\nCharacter Filters: 텍스트 전처리 (HTML 태그 제거 등)\nTokenizer: 텍스트를 토큰으로 분리\nToken Filters: 토큰 후처리 (소문자 변환, 불용어 제거 등)\n\n처리 순서: Character Filters → Tokenizer → Token Filters\n\n내장 Analyzer:\nstandard: 기본 분석기, 유니코드 텍스트 분할, 소문자 변환\nsimple: 비문자에서 분할, 소문자 변환 (숫자 제거됨 - 주의)\nwhitespace: 공백 기준 분할만 (대소문자 유지)\nkeyword: 전체 텍스트를 하나의 토큰으로 (분석 없음)\npattern: 정규식 기반 분할 (기본: 비단어 문자)\nlanguage analyzers: english, korean 등 언어별 최적화\n\n커스텀 Analyzer 설정:",
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
    "answer": "Mapping은 인덱스에 저장되는 도큐먼트의 구조와 필드 타입을 정의하는 스키마입니다.\n\nDynamic Mapping (동적 매핑):\n도큐먼트 인덱싱 시 자동으로 필드 타입을 추론합니다\n빠른 프로토타이핑에 유용하지만, 의도치 않은 타입 할당 가능성이 있습니다\n\nExplicit Mapping (명시적 매핑):\n인덱스 생성 시 명확하게 필드 타입을 정의합니다\n프로덕션 환경에서 권장됩니다\n\n주요 차이점:\n구분   Dynamic   Explicit\n\n정의 시점   자동 (인덱싱 시)   수동 (인덱스 생성 시)\n타입 정확성   추론 기반   명시적\n유연성   높음   낮음\n권장 환경   개발   프로덕션\n\n주의사항 (함정):\nDynamic Mapping으로 생성된 필드 타입은 이후 변경 불가 - Reindex 필요\n문자열 \"123\"은 text+keyword로, 숫자 123은 long으로 매핑됨 - 일관성 유지 중요\n\"2024-01-01\" 형식은 자동으로 date 타입 추론 - 다른 형식은 text로 저장될 수 있음\n권장: dynamic: strict 설정으로 예상치 못한 필드 추가 방지",
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
    "answer": "Relevance Scoring은 검색 쿼리와 도큐먼트의 관련성을 수치화한 점수(score)입니다.\n\n점수 계산 알고리즘 (BM25):\nElasticsearch 5.0부터 기본 알고리즘으로, 다음 요소를 고려합니다:\nTF (Term Frequency): 검색어가 도큐먼트에 등장하는 빈도\nIDF (Inverse Document Frequency): 전체 도큐먼트 대비 검색어의 희소성\nField Length: 필드 길이가 짧을수록 높은 점수\n\n점수 개선 방법:\nField Boosting: 특정 필드에 가중치 부여\nFunction Score Query: 커스텀 점수 함수 적용\nExplain API: 점수 계산 과정 분석",
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
    "answer": "Boosting은 특정 조건에 따라 검색 점수를 높이거나 낮추는 기법입니다.\nQuery-time Boosting (쿼리 시점):\nBoosting Query:\npositive: 일치하면 점수 계산\nnegative: 일치하면 점수 감소\nFunction Score Query:",
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
    "answer": "Multi-match Query는 여러 필드에서 동시에 검색을 수행합니다.\n\n타입별 차이:\n\n타입   설명   사용 사례\n\nbestfields   가장 높은 점수의 필드 사용 (기본값)   동일 필드 내 매칭 중요\nmostfields   모든 필드 점수 합산   동의어가 여러 필드에 있을 때\ncrossfields   모든 필드를 하나로 취급   이름 검색 (firstname + lastname)\nphrase   구문 매칭   정확한 문구 검색\nphraseprefix   접두어 구문 매칭   자동완성\n\nCross-field 검색 예시:\n\"홍\"이 firstname에, \"길동\"이 lastname에 있어도 매칭됩니다\n\nbestfields와의 차이:\nbestfields: 각 필드를 독립적으로 검색하여 최고 점수 선택\ncross_fields: 여러 필드를 하나의 큰 필드처럼 취급",
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
    "answer": "Object 타입:\n기본 JSON 객체 매핑 방식입니다\n내부적으로 필드가 평탄화(flatten)되어 저장됩니다\n배열 내 객체 간 관계가 손실됩니다\n\nNested 타입:\n각 객체를 별도의 숨겨진 도큐먼트로 저장합니다\n객체 간 관계가 유지됩니다\nNested Query로 검색해야 합니다\n\n주요 차이점:\n구분   Object   Nested\n\n관계 유지   X   O\n저장 방식   평탄화   별도 도큐먼트\n검색 방식   일반 쿼리   Nested Query\n성능   빠름   상대적으로 느림\n\n주의사항:\nNested 객체 수 제한: 기본 10,000개 (index.mapping.nested_objects.limit)\n많은 Nested 객체는 힙 메모리와 검색 성능에 영향\n성능 트레이드오프:\nObject: 빠르지만 배열 내 객체 관계 손실 (크로스 매칭 문제)\nNested: 관계 유지되지만 각 객체가 별도 Lucene 문서로 저장되어 인덱스 크기 증가\n선택 기준: 객체 간 관계가 중요하면 Nested, 단순 검색이면 Object 또는 Flattened 타입 고려",
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
    "answer": "Index Settings (인덱스 설정):\n인덱스의 동작 방식과 물리적 구성을 정의합니다.\nStatic Settings: 인덱스 생성 시에만 설정 가능\nnumberofshards: 프라이머리 샤드 수\ncodec: 압축 알고리즘\nDynamic Settings: 런타임에 변경 가능\nnumberofreplicas: 레플리카 수\nrefreshinterval: 인덱스 갱신 주기\n\nMapping Settings (매핑 설정):\n도큐먼트 필드의 데이터 타입과 처리 방식을 정의합니다.\n\n핵심 차이:\n구분   Index Settings   Mapping Settings\n\n대상   인덱스 자체   필드\n내용   샤드, 복제본, 분석기   필드 타입, 분석기 적용\n변경   일부 동적 변경 가능   기존 필드 타입 변경 불가",
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
    "answer": "매핑 최적화:\n불필요한 필드 인덱싱 비활성화 (index: false)\ndocvalues 비활성화 (집계/정렬 불필요 시)\n적절한 데이터 타입 선택 (keyword vs text)\n쿼리 최적화:\nFilter Context 활용 (캐싱 이점)\nbool 쿼리에서 filter 절 적극 사용\nsize: 0으로 집계 전용 쿼리 실행\n샤드 전략:\n샤드 크기: 10-50GB 권장\n노드당 샤드 수: 힙 1GB당 20개 이하\n과도한 샤드 분산 방지\n하드웨어/설정:\n충분한 힙 메모리 (전체 메모리의 50%, 최대 약 31GB 권장)\n32GB 이하: JVM Compressed OOPs 활성화로 메모리 효율성 향상\n32GB 초과 시 Compressed OOPs 비활성화되어 오히려 성능 저하 가능\nSSD 사용 권장\nrefreshinterval 조정 (인덱싱 성능 vs 검색 최신성)\n캐싱 활용:\nNode Query Cache: Filter 결과 캐싱\nShard Request Cache: 집계 결과 캐싱\nField Data Cache: 정렬/집계용 필드 데이터",
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
    "answer": "분산 시스템 특성:\n수평 확장성: 노드 추가로 용량과 처리량 증가\n고가용성: 레플리카를 통한 장애 대응\n자동 샤드 밸런싱: 클러스터 내 샤드 자동 분배\n분산 검색: 모든 샤드에서 병렬 검색 후 결과 병합\n\n데이터 복제 메커니즘:\nPrimary-Replica 모델:\n쓰기 요청은 Primary Shard에서 처리\nPrimary가 Replica로 복제 전파\n모든 Replica 복제 완료 시 응답 반환 (기본값)\n복제 프로세스:\n일관성 설정 (waitforactive_shards):\n1: Primary만 확인 (빠름, 덜 안전)\nall: 모든 복제본 확인 (느림, 안전)\nquorum: 과반수 확인 (균형)\n장애 복구:\nPrimary 장애 시 Replica가 자동 승격\n새 노드 추가 시 자동 샤드 재배치",
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
    "answer": "모니터링 도구:\nKibana Stack Monitoring: 시각적 대시보드 제공\nCluster APIs:\nGET cluster/health: 클러스터 상태\nGET cluster/stats: 클러스터 통계\nGET nodes/stats: 노드별 통계\nCat APIs: 사람이 읽기 쉬운 형식\nGET cat/health, GET cat/nodes, GET cat/indices\n\n주요 지표:\n\n카테고리   지표   설명\n\n클러스터   status   green/yellow/red\nactiveshards   활성 샤드 수\nunassignedshards   미할당 샤드 수\n노드   heapusedpercent   힙 메모리 사용률\ncpupercent   CPU 사용률\ndiskusedpercent   디스크 사용률\n인덱싱   indexingrate   초당 인덱싱 문서 수\nrefreshtime   리프레시 소요 시간\n검색   querylatency   쿼리 지연 시간\nfetch_latency   결과 가져오기 지연\n\n클러스터 상태:\nGreen: 모든 샤드 할당 완료\nYellow: Primary는 할당, Replica 미할당\nRed: 일부 Primary 미할당",
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
    "answer": "발생 가능한 문제:\n가용성 저하: 노드 장애 시 데이터 손실 위험\nYellow 상태: Replica 미할당으로 클러스터 상태 저하\n검색 성능 저하: 검색 부하 분산 불가\n복구 지연: 장애 발생 시 복구 시간 증가\n\n원인 파악:\n\n일반적인 원인과 해결 방법:\n\n원인   해결 방법\n\n노드 부족   노드 추가 또는 replica 수 감소\n디스크 용량 부족   디스크 확보 또는 watermark 설정 조정\n할당 필터   allocation 설정 검토\n노드 장애   장애 노드 복구 또는 제거\n\n해결 명령어:",
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
    "answer": "Master Node (마스터 노드):\n클러스터 전체 관리 담당\n인덱스 생성/삭제, 샤드 할당 결정\n클러스터 상태 관리 및 전파\n최소 3개의 master-eligible 노드 권장 (split-brain 방지)\n\nData Node (데이터 노드):\n실제 데이터 저장 및 CRUD 작업 수행\n검색 및 집계 쿼리 실행\nCPU, 메모리, I/O 집약적 작업\n\nCoordinating Node (코디네이팅 노드):\n클라이언트 요청을 받아 적절한 노드로 라우팅\n검색 결과 병합 (scatter-gather)\n전용 설정 시 \"Client Node\"라고도 불림\n\nIngest Node (인제스트 노드):\n인덱싱 전 데이터 전처리 파이프라인 실행\n\n역할 비교:\n역할   Master   Data   Coordinating\n\n클러스터 관리   O   X   X\n데이터 저장   X   O   X\n쿼리 라우팅   X   X   O\n리소스 요구   낮음   높음   중간",
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
    "answer": "관계:\nKibana는 Elasticsearch 데이터를 시각화하고 관리하는 공식 UI 도구입니다.\n\n주요 기능:\nDiscover: 데이터 탐색 및 검색\nVisualize: 차트, 그래프 등 시각화 생성\nDashboard: 여러 시각화를 조합한 대시보드\nDev Tools: Query DSL 직접 실행\nManagement: 인덱스 패턴, 사용자 관리\n\n연동 방법:\n기본 설정 (kibana.yml):\n다중 노드 연결:\nSSL/TLS 설정:\n\n인덱스 패턴 생성:\nKibana > Stack Management > Index Patterns\n패턴 입력 (예: logs-*)\n타임스탬프 필드 선택",
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
    "answer": "수평 확장 (Scale-out):\n노드 추가: 새 노드 추가 시 자동으로 샤드 재분배\n샤드 분산: 데이터와 쿼리 부하 분산\n샤드 전략:\n초기 샤드 수 적절히 설정 (변경 시 Split/Shrink API 또는 Reindex 필요)\n샤드 크기 권장: 10-50GB (공식 문서 권장, 워크로드에 따라 다름)\n노드당 샤드 수: 힙 1GB당 20개 이하\n트레이드오프:\n샤드가 너무 많으면: 마스터 노드 부하, 메모리 오버헤드\n샤드가 너무 적으면: 병렬 처리 제한, 스케일 아웃 어려움\n인덱스 분할 전략:\n시간 기반 인덱스: logs-2024.01, logs-2024.02\n롤오버: 조건 충족 시 새 인덱스 자동 생성\n역할 기반 노드 분리:\nMaster, Data, Ingest, Coordinating 노드 분리\nHot-Warm-Cold 아키텍처 적용\nCross-Cluster Replication (CCR):\n지역 간 데이터 복제\n재해 복구 및 지역별 검색 성능 향상\nFrozen Tier:\n자주 접근하지 않는 데이터를 저비용 스토리지로 이동",
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
    "answer": "역할:\n인덱스 템플릿은 새 인덱스 생성 시 자동으로 적용되는 설정과 매핑을 정의합니다. 시간 기반 인덱스나 동일한 구조의 여러 인덱스 관리에 유용합니다.\n\n구성 요소:\nindexpatterns: 템플릿이 적용될 인덱스 패턴\ntemplate: settings, mappings, aliases 정의\npriority: 여러 템플릿 중 우선순위\ncomposedof: 재사용 가능한 컴포넌트 템플릿\n\n컴포넌트 템플릿 생성:\n\n인덱스 템플릿 생성:\n\n레거시 템플릿과 차이:\n레거시: template API (deprecated)\n현재: indextemplate + component_template",
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
    "answer": "롤오버(Rollover)는 인덱스가 특정 조건을 충족하면 자동으로 새 인덱스를 생성하고 alias를 전환하는 기능입니다.\n\n롤오버 조건:\nmaxage: 인덱스 생성 후 경과 시간\nmaxdocs: 최대 도큐먼트 수\nmaxsize: 프라이머리 샤드 최대 크기\nmaxprimaryshardsize: 개별 프라이머리 샤드 크기\n\n설정 방법:\n초기 인덱스 및 Alias 생성:\n롤오버 실행:\nILM과 연동 (권장):\n\n사용 사례:\n로그 데이터 관리 (일별/주별 인덱스)\n시계열 데이터 (메트릭, 이벤트)\n대용량 데이터셋 분할 관리",
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
    "answer": "Suggester는 검색어 자동완성, 오타 수정, 유사어 제안 등의 기능을 제공합니다.\n\nSuggester 유형:\nTerm Suggester: 개별 단어 오타 수정\nPhrase Suggester: 전체 구문 수정 (단어 간 관계 고려)\nCompletion Suggester: 빠른 자동완성 (별도 데이터 구조)\n\n동작 원리:\nTerm/Phrase: Edit distance 기반 유사도 계산\nCompletion: FST(Finite State Transducer) 자료구조로 메모리에 로드하여 빠른 검색\n\n활용 사례:\n검색창 자동완성\n\"이것을 찾으셨나요?\" 기능\n철자 교정",
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
    "answer": "기본 페이징 (from + size):\n10,000건 제한 (index.maxresultwindow)\n깊은 페이지에서 성능 저하\n\nScroll API:\n대량 데이터 추출용 (export)\n스냅샷 시점의 결과 유지\n컨텍스트 유지로 리소스 소모\n\nSearch After:\n실시간 페이징용\n이전 결과의 정렬 값을 기준으로 다음 페이지 조회\n무한 스크롤, 라이브 데이터에 적합\n\n비교:\n구분   Scroll   Search After\n\n용도   데이터 추출   실시간 페이징\n일관성   스냅샷   실시간\n리소스   높음 (컨텍스트 유지)   낮음\n정렬 변경   불가   가능\n무작위 접근   불가   불가\n\nPoint in Time (PIT) + Search After: 일관된 스냅샷 + 효율적 페이징\n\n선택 가이드 (트레이드오프):\n실시간 UI 페이징: Search After (변경되는 데이터 반영)\n대량 데이터 추출/내보내기: Scroll (일관된 스냅샷)\n일관성 + 효율성 모두 필요: PIT + Search After\n주의: Scroll은 deprecation 논의 중, 새 프로젝트는 PIT + Search After 권장",
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
    "answer": "Time-based Index는 시간을 기준으로 분할된 인덱스로, 시계열 데이터 관리에 최적화되어 있습니다.\n\n구조 예시:\n\n장점:\n효율적인 삭제: 오래된 인덱스 전체 삭제 (도큐먼트 삭제보다 빠름)\n검색 범위 제한: 특정 기간만 검색하여 성능 향상\nHot-Warm-Cold 적용: 시간에 따른 스토리지 티어링\n샤드 크기 관리: 예측 가능한 인덱스 크기\n\n활용 방안:\n인덱스 템플릿 + 롤오버:\nILM 정책 연동:\nAlias를 통한 검색:",
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
    "answer": "삭제 방식:\nDocument Delete: DELETE /index/doc/id\nDelete by Query: POST /index/deletebyquery\nIndex Delete: DELETE /index\n\n발생 가능한 이슈:\n성능 저하:\nDelete by Query는 내부적으로 검색 + 삭제 수행\n대량 삭제 시 클러스터 부하 증가\n해결: scrollsize, slices 파라미터로 조절\n디스크 공간 미해제:\n삭제된 문서는 세그먼트에 \"삭제 표시\"만 됨\n실제 공간은 세그먼트 병합 시 회수\n해결: Force Merge 실행\n버전 충돌:\n삭제 중 해당 문서 업데이트 시 충돌\n해결: conflicts=proceed 옵션\n인덱스 전체 삭제 실수:\n예방: action.destructiverequires_name: true 설정\n와일드카드 삭제 방지\n\n권장 사항:\n대량 삭제: Time-based Index + 인덱스 삭제\n개별 삭제: Document Delete API\n조건 삭제: Delete by Query (off-peak 시간)",
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
    "answer": "Snapshot은 클러스터 또는 특정 인덱스의 백업을 생성하는 기능입니다.\n\nRepository 설정:\n\n지원 저장소: 파일시스템, S3, GCS, Azure Blob, HDFS\n\n스냅샷 생성:\n\n복원:\n\n백업 전략:\n증분 백업: 스냅샷은 자동으로 증분 방식 (변경분만 저장)\n스케줄링: SLM(Snapshot Lifecycle Management) 사용\n권장 사항:\n정기적인 전체 클러스터 스냅샷\n중요 인덱스는 별도 스냅샷\n복원 테스트 주기적 수행",
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
    "answer": "Elasticsearch의 트랜잭션 특성:\n\nElasticsearch는 ACID 트랜잭션을 지원하지 않습니다. 대신 다음과 같은 접근 방식을 취합니다:\n단일 문서 수준 원자성:\n개별 문서의 인덱싱, 업데이트, 삭제는 원자적\n하나의 문서 작업은 완전히 성공하거나 실패\nOptimistic Concurrency Control:\nversion 또는 ifseqno + ifprimaryterm으로 동시성 제어\nEventual Consistency:\nPrimary 복제 후 Replica에 비동기 전파\nrefreshinterval 후 검색 가능\n즉각적인 일관성이 필요하면 ?refresh=true\nBulk 작업:\n개별 작업은 독립적으로 성공/실패\n전체 롤백 없음 (부분 실패 가능)\n\nRDBMS 트랜잭션이 필요한 경우:\n애플리케이션 레벨에서 보상 트랜잭션 구현\nRDBMS를 Source of Truth로, ES는 검색용으로 분리 (권장 패턴)\nOutbox 패턴 + CDC로 데이터 동기화\n2PC(Two-Phase Commit)는 분산 환경에서 성능과 복잡성 문제로 비권장\n\n함정 주의:\nES를 primary database로 사용하지 마세요\nBulk API의 부분 실패는 롤백되지 않습니다\n동시성 제어는 ifseqno + ifprimary_term으로 Optimistic Lock만 가능",
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
    "answer": "업그레이드 전 확인사항:\n호환성 검토:\n지원 업그레이드 경로 확인 (예: 7.x → 8.x)\nBreaking Changes 문서 검토\n플러그인, 클라이언트 라이브러리 호환성\nDeprecation 확인:\n백업 필수:\n\n업그레이드 방식:\n\n방식   설명   다운타임\n\nRolling Upgrade   노드별 순차 업그레이드   없음\nFull Cluster Restart   전체 클러스터 중지 후 업그레이드   있음\nReindex from Remote   새 클러스터로 데이터 마이그레이션   없음\n\nRolling Upgrade 절차:\n샤드 할당 비활성화\n동기화 플러시 실행\n노드 중지 → 업그레이드 → 재시작\n클러스터 green 상태 확인\n다음 노드 반복\n\n주의사항:\n인덱스 호환성: Elasticsearch N 버전은 N-1 버전에서 생성된 인덱스만 읽기 가능\n예: ES 8.x는 ES 7.x 인덱스 지원, ES 6.x 인덱스는 Reindex 필요\n매핑/설정 변경사항 확인 - Breaking Changes 문서 필수 검토\n충분한 테스트 환경에서 사전 검증\nUpgrade Assistant 활용: Kibana에서 업그레이드 전 문제 진단 가능\n\n트레이드오프:\nRolling Upgrade: 무중단, 시간 오래 걸림, 버전 호환성 제약\nFull Cluster Restart: 빠름, 다운타임 발생\nReindex from Remote: 가장 유연, 리소스/시간 많이 소요",
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
    "answer": "ILM(Index Lifecycle Management)은 인덱스의 생명주기를 자동으로 관리하는 기능입니다.\n\n필요성:\n시간에 따른 데이터 접근 패턴 변화 대응\n스토리지 비용 최적화\n수동 관리 작업 자동화\n데이터 보존 정책 일관성 유지\n\n생명주기 단계 (Phases):\n\n단계   설명   주요 액션\n\nHot   활발한 쓰기/읽기   rollover, setpriority\nWarm   읽기 전용, 덜 빈번한 접근   shrink, forcemerge, readonly\nCold   드문 검색, 저비용 스토리지   searchablesnapshot\nFrozen   거의 접근 없음   partial searchablesnapshot\nDelete   삭제   delete\n\n정책 예시:\n\n인덱스에 정책 적용:\n\n주의사항 및 트레이드오프:\nILM 폴링 주기 기본값: 10분 (indices.lifecycle.pollinterval)\nmin_age는 인덱스 생성 또는 롤오버 시점 기준\nShrink 주의: 모든 샤드가 단일 노드에 있어야 함 - 대용량에서 실패 가능\nForcemerge 주의: 쓰기 작업 중인 인덱스에서는 성능 저하 유발\nHot-Warm-Cold 적용 시 노드 간 데이터 이동에 시간/리소스 소요",
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
    "answer": "Elastic Stack 데이터 수집 컴포넌트:\nBeats (경량 데이터 수집기):\nFilebeat: 로그 파일 수집\nMetricbeat: 시스템/서비스 메트릭\nPacketbeat: 네트워크 패킷 분석\nHeartbeat: 업타임 모니터링\nAuditbeat: 감사 데이터\nLogstash (데이터 처리 파이프라인):\nInput → Filter → Output 구조\n복잡한 데이터 변환, 정제, 보강\nIngest Pipeline (ES 내장):\n인덱싱 전 경량 데이터 처리\nLogstash 없이 간단한 변환 수행\n\n아키텍처 패턴:\n간단: Beats → Elasticsearch\n표준: Beats → Logstash → Elasticsearch\n버퍼: Beats → Kafka → Logstash → Elasticsearch",
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
    "answer": "Elasticsearch Security (기본 라이선스에 포함)는 클러스터 보안을 위한 핵심 기능을 제공합니다.\n\n주요 보안 기능:\n인증 (Authentication):\nNative realm (내장 사용자)\nLDAP, Active Directory\nSAML, OpenID Connect\nAPI Key, Token\n권한 부여 (Authorization):\nRole-Based Access Control (RBAC)\n인덱스, 문서, 필드 수준 권한\n암호화:\nTLS/SSL (노드 간, 클라이언트-클러스터)\n저장 데이터 암호화\n\n기본 설정 (elasticsearch.yml):\n\n사용자 생성:\n\n역할 생성:\n\nAPI Key 생성:",
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
    "answer": "RBAC (Role-Based Access Control):\n역할 기반으로 클러스터, 인덱스, 필드 수준의 접근 권한을 제어합니다.\n\nDocument Level Security (DLS):\n역할 내에서 특정 조건에 맞는 문서만 접근할 수 있도록 제한합니다.\n\n→ team: teama인 문서만 조회 가능\n\nField Level Security (FLS):\n특정 필드만 접근 가능하도록 제한합니다.\n\n비교:\n\n구분   RBAC   DLS   FLS\n\n제어 수준   클러스터/인덱스   문서   필드\n적용 방식   privileges   query   field_security\n사용 사례   기본 권한 관리   멀티테넌시   민감정보 보호",
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
    "answer": "커스텀 분석기는 Character Filter, Tokenizer, Token Filter를 조합하여 만듭니다.\n\n생성 방법:\n\n매핑에 적용:\n\n분석 테스트:\n\n한글 분석기 예시 (nori):\nNori 플러그인 설치 필요: bin/elasticsearch-plugin install analysis-nori\nnoritokenizer: 한글 형태소 분석\nnoripartofspeech: 불필요한 품사 제거 (조사, 어미 등)\nnorireadingform: 한자를 한글 독음으로 변환",
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
    "answer": "멀티테넌시는 여러 테넌트(사용자/조직)가 동일한 Elasticsearch 클러스터를 공유하면서 데이터를 격리하는 방식입니다.\n\n접근 방식:\n테넌트별 인덱스:\n장점: 완전한 격리, 독립적 매핑/설정\n단점: 인덱스 수 증가, 관리 복잡성\n테넌트 필드 + DLS:\n장점: 인덱스 관리 단순화\n단점: 잘못된 쿼리로 데이터 노출 위험\n인덱스 Alias + 필터:\n별도 클러스터:\n장점: 완전한 격리, 성능 영향 없음\n단점: 운영 비용 증가\n\n선택 기준:\n요구사항   권장 방식\n\n강력한 격리   별도 클러스터\n많은 테넌트   DLS + 단일 인덱스\n독립적 설정 필요   테넌트별 인덱스",
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
    "answer": "Bulk API는 여러 인덱싱/삭제/업데이트 작업을 단일 요청으로 처리합니다.\n\n기본 구조:\n\n성능 최적화:\n적절한 배치 크기:\n권장: 5-15MB per request (Elastic 공식 권장)\n문서 수보다 바이트 크기 기준 - 문서 크기에 따라 조절\n테스트로 최적값 찾기 (클러스터/워크로드에 따라 다름)\n너무 큰 배치: 메모리 압박, 타임아웃 위험\n너무 작은 배치: 오버헤드 증가\n병렬 처리:\n여러 스레드에서 동시 Bulk 요청\n노드 수 × 2 정도의 병렬 요청\nRefresh 비활성화:\nReplica 비활성화 (초기 로딩 시):\n\n주의사항:\n응답 확인: 부분 실패 가능, errors: true 체크\n재시도 로직: 429 (Too Many Requests) 시 백오프\n메모리 관리: 너무 큰 배치는 OOM 위험\n순서 보장: 동일 문서 작업은 순서대로 처리",
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
    "answer": "Latency (지연시간) 최적화:\n검색 성능:\n힙 메모리 설정:\nThread Pool 조정:\n\nThroughput (처리량) 최적화:\n인덱싱 성능:\nBulk 처리:\n적절한 배치 크기 (5-15MB)\n병렬 요청 활용\nMerge 설정:\n\n모니터링 지표:\n지표   확인 방법\n\n검색 지연   nodes/stats/indices/search\n인덱싱 속도   nodes/stats/indices/indexing\nGC 시간   nodes/stats/jvm\n큐 대기   nodes/stats/threadpool",
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
    "answer": "복합 검색 예시:\n다중 조건 검색 (AND, OR, NOT 조합):\nNested 객체 검색:\n다중 필드 + 가중치:\nFunction Score (커스텀 점수):\nAggregation + 필터:",
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
    "answer": "Reindex API는 한 인덱스의 데이터를 다른 인덱스로 복사합니다.\n\n사용 목적:\n매핑 변경 (기존 필드 타입 변경 불가하므로)\n샤드 수 변경\n분석기 변경\n인덱스 분할/병합\n데이터 마이그레이션\n\n기본 사용법:\n\n고급 옵션:\n선택적 복사 (쿼리 적용):\n필드 변환 (스크립트):\n원격 클러스터에서 복사:\n비동기 실행:\n\n성능 최적화:\nslices: auto - 병렬 처리\nrefresh: false - 완료 후 수동 refresh\nrequestsper_second - 스로틀링\n\n주의사항 및 트레이드오프:\nReindex는 새 인덱스에 데이터를 복사하므로 디스크 공간이 2배 필요\n대용량 인덱스는 시간이 오래 걸림 - 서비스 중단 없이 진행하려면 Alias 전환 방식 사용\n원격 Reindex 시 reindex.remote.whitelist 설정 필요\n권장 절차:\n새 인덱스 생성 (새 매핑 적용)\nReindex 실행 (비동기)\n완료 후 Alias를 새 인덱스로 전환\n기존 인덱스 삭제",
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
    "answer": "Snapshot Repository는 스냅샷을 저장하는 위치입니다.\n\n지원 저장소 유형:\nShared File System (fs)\nAWS S3 (s3)\nGoogle Cloud Storage (gcs)\nAzure Blob Storage (azure)\nHDFS (hdfs)\n\n파일시스템 Repository 구성:\n경로 설정 (elasticsearch.yml):\nRepository 생성:\n\nS3 Repository 구성:\n\n관리 작업:\n\nRepository 확인:\n\nRepository 검증:\n\n스냅샷 목록:\n\n스냅샷 상태:\n\nRepository 삭제:\n\n주의사항:\n여러 클러스터가 같은 repository 공유 시 읽기 전용 설정 필요\nRepository 삭제 전 스냅샷 먼저 삭제\n충분한 저장 공간 확보",
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
    "answer": "Elasticsearch의 일관성 모델:\n\nElasticsearch는 Eventual Consistency (최종 일관성) 모델을 따릅니다.\n\n쓰기 일관성:\nPrimary-Replica 복제:\n쓰기는 Primary Shard에서 먼저 처리\n이후 Replica에 복제\n기본적으로 모든 in-sync replica 복제 완료 후 응답\nwaitforactiveshards 설정:\n1: Primary만\nall: 모든 복제본\n숫자: 지정된 수의 샤드\n\n읽기 일관성:\nRefresh 간격:\n기본 1초마다 refresh\nrefresh 전에는 새 데이터 검색 불가\n실시간 읽기:\n\n일관성 보장 수준:\n\n작업   일관성\n\nGET (by ID)   강한 일관성\nSearch   Eventual (refresh 후)\nWrite   설정에 따라 조절 가능\n\nEventual Consistency 영향:\n쓰기 직후 검색 시 결과에 포함 안 될 수 있음\nRead-after-Write 보장 필요 시 refresh=true 사용\n\nACID와의 비교:\nElasticsearch는 단일 문서 수준의 원자성만 보장\n다중 문서 트랜잭션 미지원\n분산 환경에서 가용성과 성능 우선\n\n트레이드오프 (CAP 정리 관점):\nElasticsearch는 AP(Availability, Partition tolerance) 시스템에 가까움\nStrong Consistency보다 Availability와 성능을 우선시\n실무 팁:\n검색용으로 ES 사용, Source of Truth는 RDBMS 유지\nrefresh=true는 성능 저하를 유발하므로 꼭 필요한 경우에만 사용\nrefresh=waitfor는 다음 주기적 refresh까지 대기 (절충안)",
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
    "answer": "인덱스 크기 최적화:\n불필요한 필드 제거:\ndocvalues 비활성화 (정렬/집계 불필요 시):\n주의: text 필드는 기본적으로 docvalues가 비활성화되어 있음\nkeyword, 숫자, 날짜 등 정렬/집계에 사용하지 않는 필드에 적용\nsource 필드 관리:\n적절한 데이터 타입:\nkeyword vs text 선택\ninteger vs long vs short\nscaledfloat 사용 (정밀도 조절)\n\n도큐먼트 크기 최적화:\n정규화 vs 비정규화:\n자주 변경되는 데이터: 정규화 (별도 인덱스)\n검색 성능 중요: 비정규화 (임베딩)\n배열 크기 제한:\nNested 객체 제한:\n과도한 nested 객체는 성능 저하\n가능하면 flattened 타입 고려\n\nForce Merge:\n읽기 전용 인덱스에 적용\n세그먼트 수 감소로 검색 성능 향상",
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
    "answer": "Ingest Pipeline은 인덱싱 전 데이터를 변환, 보강, 정제하는 기능입니다.\n\nIngest Node 역할:\n파이프라인 프로세서 실행\n인덱싱 전 데이터 전처리\nLogstash 대체 가능 (간단한 변환)\n\n파이프라인 구성요소:\nProcessors: 데이터 변환 단위\nonfailure: 오류 처리\n\n파이프라인 생성:\n\n주요 프로세서:\n프로세서   기능\n\ngrok   정규식 패턴 추출\ndate   날짜 파싱\nset   필드 값 설정\nremove   필드 삭제\nrename   필드명 변경\nconvert   타입 변환\nscript   커스텀 스크립트\nenrich   외부 데이터 보강\n\n파이프라인 적용:",
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
    "answer": "Hot-Warm-Cold 아키텍처는 데이터 접근 패턴에 따라 스토리지 티어를 분리하여 비용과 성능을 최적화합니다.\n\n티어별 특성:\n\n티어   데이터 특성   하드웨어   접근 빈도\n\nHot   최신, 활발한 쓰기/읽기   SSD, 고성능   높음\nWarm   과거, 읽기 전용   HDD, 중간   중간\nCold   오래된, 드문 접근   대용량 HDD   낮음\nFrozen   아카이브   오브젝트 스토리지   매우 낮음\n\n구현 방법:\n노드 역할 설정 (elasticsearch.yml):\nILM 정책 설정:\n인덱스 템플릿 연결:",
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
    "answer": "Painless는 Elasticsearch의 기본 스크립팅 언어로, 안전하고 빠른 스크립트 실행을 지원합니다.\n\n활용 사례:\n스크립트 필드:\n스크립트 업데이트:\n스크립트 쿼리:\nIngest Pipeline:\n\n성능 영향:\n\n요소   영향   권장 사항\n\n컴파일   초기 비용 발생   파라미터화로 재사용\ndocvalues   빠른 필드 접근   doc['field'].value 사용\nsource   느린 접근   가능하면 피하기\n복잡한 로직   CPU 부하   단순화, 인덱싱 시 계산\n\n최적화 방법:\n\n컴파일 캐시 설정:",
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
    "answer": "주요 장애 유형과 복구 전략:\n노드 장애:\n증상: 클러스터 Yellow/Red 상태\n자동 복구: Replica가 Primary로 승격\n수동 복구: 노드 재시작 또는 교체\n마스터 노드 장애:\n증상: 클러스터 작업 불가\n자동 복구: Master-eligible 노드 중 새 마스터 선출\n예방: 최소 3개 Master-eligible 노드\n디스크 용량 부족:\n증상: 인덱싱 차단, Read-only 전환\n복구:\n데이터 손상:\n복구: 스냅샷에서 복원\nSplit-Brain:\n7.x 이전: discovery.zen.minimummasternodes 설정 필요 (N/2 + 1)\n7.x 이후: 자동 quorum 관리로 설정 불필요\ncluster.initialmasternodes로 초기 마스터 노드 지정\n이후 클러스터가 자동으로 투표 설정 관리\n\n모니터링 및 예방:",
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
    "answer": "Elasticsearch 8.x 주요 기능:\n보안 기본 활성화:\nTLS, 인증이 기본으로 활성화\n설치 시 자동 인증서 생성\nelastic 사용자 비밀번호 자동 생성\nkNN (k-Nearest Neighbor) 검색:\n벡터 유사도 검색 네이티브 지원\n시맨틱 검색, 추천 시스템에 활용\nESQL (ES|QL):\n새로운 파이프 기반 쿼리 언어\nServerless Elasticsearch:\n완전 관리형 서버리스 배포 옵션\n자동 스케일링, 운영 부담 감소\n향상된 머신러닝:\nTransformer 모델 통합\nNLP 작업 (텍스트 분류, NER, 감정 분석)\nELSER (Elastic Learned Sparse EncodeR)\n성능 개선:\n더 빠른 집계\n향상된 인덱싱 속도\n메모리 사용 최적화\nFrozen Tier 개선:\nSearchable Snapshots\n비용 효율적인 장기 데이터 보관\nData Streams 개선:\nTSDS (Time Series Data Streams)\n시계열 데이터 최적화 저장\nLogsdb 인덱싱 모드 (8.15+):\n로그 데이터에 최적화된 인덱싱\nsynthetic _source로 저장 공간 최대 50% 절감\nSemantic Text 필드 (8.15+):\n시맨틱 검색을 위한 새로운 필드 타입\n자동 벡터 임베딩 및 검색",
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
    "answer": "MongoDB는 문서 지향(Document-Oriented) NoSQL 데이터베이스입니다.\n\nRDBMS와의 주요 차이점:\n데이터 모델: RDBMS는 테이블(행/열), MongoDB는 Document(BSON)\n스키마: RDBMS는 고정 스키마, MongoDB는 유연한 스키마\n관계: RDBMS는 JOIN, MongoDB는 Embedding 또는 Reference\n확장: RDBMS는 수직 확장, MongoDB는 수평 확장(Sharding)",
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
    "answer": "NoSQL 데이터베이스 4가지 유형:\nDocument Store: MongoDB, CouchDB - JSON/BSON 문서 저장\nKey-Value Store: Redis, DynamoDB - 키-값 쌍 저장\nColumn-Family Store: Cassandra, HBase - 컬럼 기반 저장\nGraph Database: Neo4j - 노드와 관계 저장\n\nMongoDB는 Document Store 유형에 속하며, 데이터를 BSON 형식의 문서로 저장합니다.",
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
    "answer": "장점:\n유연한 스키마로 빠른 개발 가능\n수평 확장(Sharding)이 용이\n높은 읽기/쓰기 성능 (특히 단일 Document 작업)\n풍부한 쿼리 언어와 Aggregation Framework\n내장 복제(Replica Set)로 고가용성\n개발자 친화적 (JSON 유사 구조)\n\n단점:\n복잡한 JOIN 연산에 비효율적 ($lookup 오버헤드)\n메모리 사용량이 높음 (Working Set을 RAM에 유지해야 성능 보장)\nMulti-Document 트랜잭션 오버헤드\n데이터 중복 가능성 (비정규화 시)\n\nMongoDB가 적합한 경우:\n빠른 프로토타이핑/MVP 개발\n스키마가 자주 변경되는 애플리케이션\n읽기가 많고 데이터가 Document 단위로 접근되는 경우\n수평 확장이 필요한 대용량 서비스\n\nMongoDB가 부적합한 경우:\n복잡한 JOIN이 많은 관계형 데이터\n엄격한 스키마와 데이터 무결성이 필수\n다중 테이블 트랜잭션이 핵심인 금융 시스템",
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
    "answer": "BSON(Binary JSON)은 JSON의 바이너리 인코딩 형식입니다.\n\nJSON과의 차이점:\n특성   JSON   BSON\n\n형식   텍스트 기반   바이너리\n데이터 타입   기본 6개 (string, number, boolean, null, array, object)   추가 타입 (Date, ObjectId, Binary, Decimal128, int32, int64 등)\n파싱 속도   텍스트 파싱 필요   길이 정보 포함으로 빠른 순회\n저장 크기   일반적으로 더 작음   메타데이터로 약간 더 큼\n사용 목적   데이터 교환   MongoDB 내부 저장/전송\n\nBSON 추가 타입 예시:\nObjectId: 12바이트 고유 식별자\nDate: 64비트 정수 (Unix epoch 밀리초)\nDecimal128: 고정밀 십진수 (금융 데이터용)\nBinary: 바이너리 데이터\nRegex: 정규표현식",
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
    "answer": "Document:\nMongoDB의 기본 데이터 단위 (RDBMS의 행에 해당)\nBSON 형식으로 저장되는 필드-값 쌍의 집합\n최대 크기 16MB\n\nCollection:\nDocument들의 그룹 (RDBMS의 테이블에 해당)\n동적 스키마로 다른 구조의 Document 포함 가능",
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
    "answer": "스키마리스란 컬렉션 내 Document들이 동일한 필드 구조를 가질 필요가 없다는 의미입니다. 그러나 실제로는 \"유연한 스키마(Flexible Schema)\"라는 표현이 더 정확합니다.\n\n특징:\n같은 컬렉션에 다른 필드를 가진 Document 저장 가능\n필드 추가/삭제 시 스키마 변경 불필요\n빠른 개발과 반복이 가능\n\n함정 - \"스키마리스 = 스키마 없음\"은 오해:\nMongoDB는 진정한 의미의 스키마리스가 아님\n애플리케이션은 암묵적 스키마에 의존\n인덱스는 특정 필드 구조를 가정\n쿼리와 Aggregation도 필드 존재를 기대\n\n실무에서의 권장사항:\nSchema Validation 적극 활용 (3.6+)\nODM(Mongoose 등)으로 스키마 정의\n스키마 버전 관리 전략 수립",
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
    "answer": "주요 설계 원칙:\n함께 조회되는 데이터는 함께 저장 - Embedding 활용\n애플리케이션의 접근 패턴 기반 설계 - 읽기/쓰기 비율 고려\nDocument 크기 제한(16MB) 고려\n인덱싱 전략 수립\n데이터 중복 vs 참조 트레이드오프 판단\n\nAnti-patterns 피하기:\n무한 성장하는 배열\n과도한 Embedding\n불필요한 Normalization",
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
    "answer": "Embedding (내장):\n한 번의 쿼리로 모든 데이터 조회 (읽기 성능 우수)\n1:1, 1:Few 관계에 적합\n데이터가 함께 조회될 때 사용\n원자적 업데이트 가능 (단일 Document 내)\n\nReferencing (참조):\n데이터 중복 방지, 저장 공간 효율적\n1:Many, Many:Many 관계에 적합\n독립적으로 접근하는 데이터에 사용\n16MB 제한 회피 가능\n\n트레이드오프 고려사항:\n기준   Embedding   Referencing\n\n읽기 성능   빠름 (단일 쿼리)   느림 ($lookup 필요)\n쓰기 성능   중복 데이터 업데이트 시 비용   한 곳만 업데이트\n데이터 일관성   중복 시 불일치 가능   정규화로 일관성 유지\n문서 크기   커질 수 있음   작게 유지\n적합한 경우   읽기 중심, 함께 변경되는 데이터   독립적 갱신, 대용량 관계",
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
    "answer": "Embedding (1:Few):\nChild Reference (1:Many):\nParent Reference (1:Squillions):",
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
    "answer": "양쪽 Document에 참조 배열 저장:\n\n$lookup으로 조인:\n\n고려사항: 배열 크기가 커지면 별도 Junction Collection 사용",
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
    "answer": "Document 크기 제한: 16MB\n\n큰 데이터 처리 방법:\nGridFS 사용 - 16MB 초과 파일을 청크로 분할 저장\n데이터 분리 - 큰 필드를 별도 Collection으로 분리\n참조 사용 - Embedding 대신 Reference 활용\n압축 - 바이너리 데이터 압축 후 저장",
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
    "answer": "GridFS는 16MB를 초과하는 대용량 파일을 저장하기 위한 MongoDB 스펙입니다.\n\n작동 방식:\n파일을 *기본 255KB (정확히 255  1024 bytes = 261,120 bytes) 청크로 분할\nfs.files: 파일 메타데이터 저장 (filename, length, uploadDate, md5 등)\nfs.chunks: 실제 데이터 청크 저장 (files_id, n, data)\n\n사용 사례:\n이미지, 비디오, 오디오 파일 저장\n대용량 문서 저장\n파일 시스템 제한 우회\n파일의 일부분만 읽기 (Range Query)\n\nGridFS vs 일반 Document 저장:*\n기준   GridFS   BSON Document\n\n파일 크기   제한 없음   최대 16MB\n부분 읽기   가능 (청크 단위)   불가능\n메모리 효율   스트리밍 가능   전체 로드 필요\n오버헤드   청크 관리 비용   낮음\n\n주의: 16MB 미만의 작은 파일은 일반 BSON Document에 Binary로 저장하는 것이 더 효율적",
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
    "answer": "Create:\n\nRead:\n\nUpdate:\n\nDelete:",
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
    "answer": "구분   find()   findOne()\n\n반환   Cursor (여러 Document)   단일 Document 또는 null\n용도   복수 결과 조회   단일 결과 조회\n성능   limit 없으면 전체 스캔   첫 번째 매칭 후 중단",
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
    "answer": "비교 연산자:\n$eq: 같음 / $ne: 같지 않음\n$gt: 초과 / $gte: 이상\n$lt: 미만 / $lte: 이하\n$in: 배열 내 포함 / $nin: 포함되지 않음\n\n논리 연산자:\n$and: AND 조건\n$or: OR 조건\n$not: 부정\n$nor: 모든 조건 불만족",
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
    "answer": "Projection은 쿼리 결과에서 반환할 필드를 지정하는 기능입니다.\n\n주의사항:\n포함(1)과 제외(0)를 혼용할 수 없음 (id 제외)\n네트워크 대역폭과 메모리 절약에 효과적",
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
    "answer": "주요 인덱스 종류:\nSingle Field Index: 단일 필드 인덱스\nCompound Index: 복합 필드 인덱스 (최대 32개 필드)\nMultikey Index: 배열 필드 인덱스 (배열당 자동 생성)\nText Index: 텍스트 검색용 인덱스 (컬렉션당 1개만)\nGeospatial Index: 지리 데이터용 (2d, 2dsphere)\nHashed Index: 해시 기반 Sharding용 (범위 쿼리 불가)\nTTL Index: 자동 문서 만료 (단일 필드만, _id 불가)\nWildcard Index: 동적 필드 인덱싱 (4.2+)\nSparse Index: null/미존재 필드 제외\nPartial Index: 조건 만족 문서만 인덱싱\n\n인덱스 트레이드오프:**\n읽기 성능 향상 vs 쓰기 성능 저하\n메모리/디스크 사용량 증가\n인덱스가 많을수록 쓰기 시 업데이트 비용 증가",
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
    "answer": "복합 인덱스는 여러 필드를 조합한 인덱스입니다.\n\n사용 시점:\n여러 필드로 자주 검색/정렬할 때\n복합 조건 쿼리 최적화 시\nCovered Query 구현 시\n\nESR 규칙 (권장 순서):\nEquality: 등가 조건 필드 먼저 (가장 선택적)\nSort: 정렬 필드\nRange: 범위 조건 필드 마지막\n\nESR이 중요한 이유:\n등가 조건으로 후보 축소 → 정렬은 인덱스 순서 활용 → 범위는 마지막에 필터\n범위가 중간에 오면 이후 필드는 인덱스 스캔만 가능\n\n예외 상황:\n상황   권장 순서\n\n등가 조건만 있음   카디널리티 높은 필드 먼저\n정렬만 있음   정렬 순서대로\n범위 + 정렬   정렬 필드 먼저 (in-memory 정렬 회피)",
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
    "answer": "복합 인덱스에서 필드 순서가 중요한 이유:\n\n인덱스 { a: 1, b: 1, c: 1 }의 경우:\n{ a: 1 } 쿼리: 사용 가능\n{ a: 1, b: 1 } 쿼리: 사용 가능\n{ b: 1 } 쿼리: 사용 불가 (prefix 없음)\n{ a: 1, c: 1 } 쿼리: a만 인덱스 활용\n\nPrefix Rule:\n복합 인덱스는 왼쪽부터 순서대로 사용됩니다.\n\n정렬 방향:",
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
    "answer": "Text Index:\n텍스트 검색을 위한 인덱스로, 문자열 필드에서 단어 검색 지원\n\nGeospatial Index:\n지리적 데이터 쿼리를 위한 인덱스\n2dsphere: 구형 지구 기반 (GeoJSON)\n2d: 평면 좌표 기반",
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
    "answer": "주요 확인 항목:\nqueryPlanner.winningPlan: 선택된 실행 계획\nstage: COLLSCAN(전체 스캔) vs IXSCAN(인덱스 스캔)\nexecutionStats.totalDocsExamined: 검사한 문서 수\nexecutionStats.executionTimeMillis: 실행 시간\n\n좋은 쿼리의 지표:\nstage가 IXSCAN\ntotalDocsExamined ≈ nReturned\nindexOnly: true (Covered Query)",
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
    "answer": "Covered Query는 인덱스만으로 쿼리를 완료할 수 있어 Document에 접근하지 않는 쿼리입니다.\n\n조건:\n모든 쿼리 필드가 인덱스에 포함\n모든 반환 필드가 인덱스에 포함\nid 필드가 projection에서 제외 (또는 id가 인덱스에 포함)\n\nexplain()에서 확인:\ntotalDocsExamined: 0\nstage: IXSCAN (FETCH stage 없음)\n\nCovered Query가 불가능한 경우:\n배열 필드 포함 시 (Multikey Index)\n내장 문서 전체 반환 시\n$elemMatch, $slice 등 특수 projection 사용 시\nSharded Collection에서 shard key가 없는 경우\n\n성능 이점:\n디스크 I/O 감소 (Document 접근 불필요)\nWiredTiger 캐시 효율 향상\n특히 대용량 Document에서 효과적",
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
    "answer": "Aggregation Pipeline은 문서를 여러 단계(Stage)를 거쳐 처리하는 데이터 처리 프레임워크입니다.\n\n특징:\n각 Stage의 출력이 다음 Stage의 입력\nSQL의 GROUP BY, JOIN 등의 기능 제공\n복잡한 데이터 변환 및 분석 가능",
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
    "answer": "주요 Stage:\n\nStage   설명   SQL 대응\n\n$match   조건 필터링   WHERE\n$group   그룹화 및 집계   GROUP BY\n$project   필드 선택/변환   SELECT\n$sort   정렬   ORDER BY\n$limit   결과 제한   LIMIT\n$skip   결과 건너뛰기   OFFSET\n$lookup   다른 Collection 조인   JOIN\n$unwind   배열 펼치기   -",
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
    "answer": "$lookup은 다른 Collection과 LEFT OUTER JOIN을 수행합니다.\n\n기본 문법:\n\nPipeline 사용 (5.0+):",
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
    "answer": "$unwind는 배열 필드를 펼쳐서 각 요소마다 별도의 문서를 생성합니다.\n\n사용 시점:\n배열 요소별 집계가 필요할 때\n$lookup 결과 배열 처리 시\n배열 요소 기준 그룹화 시\n\n옵션:",
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
    "answer": "$facet은 동일한 입력 데이터에 여러 파이프라인을 병렬로 실행합니다.\n\n사용 사례:\n대시보드 데이터 조회\n페이지네이션 + 총 개수 동시 조회",
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
    "answer": "구분   Aggregation Pipeline   MapReduce\n\n성능   빠름 (네이티브 C++)   느림 (JavaScript 엔진)\n유연성   Stage 기반 (대부분 충분)   임의 JS 코드 가능\n사용성   선언적, 쉬움   명령형, 복잡함\n병렬 처리   자동 최적화   수동 관리\n상태   권장   5.0부터 Deprecated\n\nMongoDB 5.0+:\nMapReduce는 deprecated되었으며, Aggregation Pipeline 사용을 권장합니다. 복잡한 로직은 $accumulator나 $function으로 JavaScript 사용 가능합니다.\n\n$function (4.4+) - 커스텀 JavaScript:",
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
    "answer": "Replication은 여러 서버에 동일한 데이터를 복제하여 고가용성과 데이터 중복성을 제공하는 기능입니다.\n\n목적:\n고가용성: Primary 장애 시 자동 Failover\n데이터 보호: 데이터 손실 방지\n읽기 분산: Secondary에서 읽기 가능\n재해 복구: 지리적 분산 배치 가능\n\n작동 방식:\nPrimary가 모든 쓰기 처리\nOplog를 통해 Secondary에 변경사항 복제\nPrimary 장애 시 투표로 새 Primary 선출",
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
    "answer": "Replica Set은 동일한 데이터를 가진 MongoDB 인스턴스 그룹입니다.\n\n구조:\n\n권장 구성:\n최소 3개 노드 (홀수 권장)\nPrimary 1개 + Secondary 2개\n또는 Primary 1개 + Secondary 1개 + Arbiter 1개",
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
    "answer": "Primary:\n모든 쓰기 작업 처리\n기본 읽기 작업 처리\nOplog에 작업 기록\n\nSecondary:\nPrimary의 Oplog를 복제하여 데이터 동기화\nRead Preference 설정 시 읽기 가능\nPrimary 장애 시 선출 후보\n\nArbiter:\n데이터를 저장하지 않음\n선거에 투표만 참여\n짝수 노드일 때 과반수 확보용\n리소스 최소화 목적\n\n함정 - Arbiter 사용 시 주의사항:\nPSA(Primary-Secondary-Arbiter) 구성에서 w: majority 사용 시:\nSecondary 장애 시 쓰기 불가능 (과반수 확보 불가)\nArbiter는 데이터가 없어 투표에만 참여\n권장: 3개 데이터 노드(PSS) 구성이 더 안전\nArbiter는 writeConcern majority 계산에서 제외됨 (5.0+에서 개선)\n\nArbiter가 적합한 경우:\n비용 제약이 심한 경우\n데이터 가용성보다 쓰기 지연이 중요한 경우",
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
    "answer": "Read Preference는 읽기 작업을 어느 노드에서 수행할지 지정합니다.\n\n종류:\n모드   설명\n\nprimary   Primary에서만 읽기 (기본값)\nprimaryPreferred   Primary 우선, 불가시 Secondary\nsecondary   Secondary에서만 읽기\nsecondaryPreferred   Secondary 우선, 불가시 Primary\nnearest   네트워크 지연 최소 노드\n\n주의: Secondary 읽기는 약간의 지연(Replication Lag) 가능",
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
    "answer": "Write Concern은 쓰기 작업의 확인 수준을 지정합니다.\n\n주요 옵션:\nw 값   설명   트레이드오프\n\n0   확인 안 함 (Fire-and-forget)   가장 빠름, 데이터 손실 가능\n1   Primary 확인 (기본값)   빠름, Primary 장애 시 손실 가능\n\"majority\"   과반수 노드 확인   안전, 지연 증가\nn   n개 노드 확인   명시적 제어\n\nj 옵션: journal 기록 여부 (true 시 디스크 동기화 보장)\nwtimeout: 타임아웃 설정 (밀리초, 초과 시 에러)\n\n트레이드오프 상세:\n설정   지연   내구성   사용 사례\n\nw:0   최소   없음   로그, 메트릭 (손실 허용)\nw:1   낮음   Primary만   일반적인 경우\nw:1, j:true   중간   Primary Journal   중요 데이터\nw:majority   높음   과반수 복제   금융, 주문 등\nw:majority, j:true   최고   과반수 + Journal   최고 수준 보장 필요 시\n\n주의: wtimeout 발생 시 쓰기 자체는 성공했을 수 있음 (확인만 실패)",
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
    "answer": "Failover 과정:\n장애 감지: Heartbeat(2초 간격)로 Primary 상태 확인\n선거 시작: electionTimeoutMillis(기본 10초) 후 선거 개시\n투표: 과반수 투표로 새 Primary 선출\n승격: 가장 최신 데이터를 가진 Secondary가 Primary로 승격\n연결 재설정: 드라이버가 새 Primary로 연결\n\n선출 기준:\n가장 최신 oplog\npriority 값 (높을수록 우선)\n과반수 투표 획득",
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
    "answer": "Oplog(Operation Log)는 Primary의 모든 쓰기 작업을 기록하는 Capped Collection입니다.\n\n역할:\nSecondary가 Oplog를 읽어 데이터 동기화\nPoint-in-Time Recovery 지원\nChange Streams의 기반\n\n특징:\nlocal.oplog.rs Collection에 저장\nCapped Collection (고정 크기, 오래된 것 자동 삭제)\nIdempotent 연산으로 저장 (같은 연산을 여러 번 적용해도 결과 동일)\n\n크기 설정:\n기본값: 사용 가능 디스크의 5% (최소 990MB ~ 최대 50GB)\noplogSizeMB 옵션으로 조정\n4.4+: oplogMinRetentionHours로 최소 보존 시간 설정 가능\n\nOplog 크기 결정 기준:\n쓰기 빈도가 높을수록 더 큰 Oplog 필요\nSecondary 복구 시간, 유지보수 윈도우 고려\nPoint-in-Time Recovery 범위에 영향\n\n함정 - Oplog 과소 설정:\nSecondary가 따라잡지 못하면 Initial Sync 필요\n유지보수 중 Oplog가 넘치면 동기화 불가",
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
    "answer": "주의사항:\nReplication Lag: Primary와 데이터 불일치 가능\n최신 데이터가 필요한 경우 Primary 읽기 권장\nStale Read: 오래된 데이터 읽기 가능\n쓰기 후 읽기 일관성 문제\n쓰기 직후 Secondary 읽기 시 반영 안 될 수 있음\nFailover 시 연결 끊김\n드라이버 재연결 로직 필요\n\n권장 사용 사례:\n분석/리포팅 쿼리\n지연 허용 가능한 읽기\n지리적으로 분산된 읽기",
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
    "answer": "Sharding은 데이터를 여러 서버에 분산 저장하는 수평 확장(Scale-out) 방식입니다.\n\n필요한 이유:\n단일 서버 저장 용량 한계 극복\n높은 처리량(throughput) 요구\nWorking Set이 RAM을 초과할 때\n지리적 데이터 분산 필요 시\n\nSharding vs Replication:\n구분   Sharding   Replication\n\n목적   용량/성능 확장   고가용성/읽기 분산\n데이터   분산 저장   복제 저장\n확장 방향   수평 (Scale-out)   -",
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
    "answer": "구성요소:\nShard: 실제 데이터 저장 (Replica Set으로 구성)\nConfig Server: 샤드 메타데이터, 청크 위치 정보 저장\nmongos: 쿼리 라우터, 클라이언트 연결점",
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
    "answer": "Shard Key는 데이터를 여러 Shard에 분배하는 기준 필드입니다.\n\n선택 시 고려사항:\n높은 Cardinality: 다양한 값이 많아야 균등 분배\n균등한 분포(Frequency): 특정 값에 쏠리지 않아야 함\n쿼리 패턴: 자주 사용하는 쿼리 필드 포함 (Targeted Query 유도)\n단조성 피하기: 단조 증가/감소 값은 Hot Shard 유발\n\nShard Key 변경:\n4.4 이전: Shard Key 변경 불가, 재생성 필요\n4.4+: refineCollectionShardKey로 필드 추가 가능\n5.0+: reshardCollection으로 완전히 다른 키로 변경 가능\n\n좋은 Shard Key 예시:\n\n피해야 할 패턴:\n패턴   문제   대안\n\nObjectId, timestamp   Hot Shard (마지막 Shard에 집중)   Hash 또는 복합 키\nboolean, status   낮은 Cardinality   복합 키\n단일 tenantid   대형 테넌트 불균형   tenantid + 다른 필드\n\nShard Key 평가 기준:\nCardinality: 높을수록 좋음\nFrequency: 균등할수록 좋음\nRate of Change: 단조적이지 않을수록 좋음",
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
    "answer": "구분   Range Sharding   Hash Sharding\n\n분배 방식   값 범위별 분배   해시값 기반 분배\n장점   범위 쿼리 효율적, 연속 데이터 같은 Shard   균등 분배 보장, Hot Spot 방지\n단점   불균등 분배 가능, 단조 키 시 Hot Shard   범위 쿼리 시 모든 Shard 조회 (Scatter-Gather)\n적합   날짜, 지역 기반 데이터, 순차 접근   랜덤 접근 패턴, 균등 쓰기 부하\n\n트레이드오프 상세:\n쿼리 유형   Range   Hash\n\n{ key: value } (등가)   단일 Shard   단일 Shard\n{ key: { $gt: a, $lt: b } } (범위)   연속 Shard만   모든 Shard (비효율)\n{ key: { $in: [...] } }   해당 Shard만   해당 Shard만\n\n선택 기준:\n범위 쿼리가 많으면 → Range\n균등 분배가 중요하면 → Hash\n단조 증가 키 사용 시 → Hash 권장 (Hot Shard 방지)\n복합 키 고려: Range와 Hash 조합 가능",
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
    "answer": "Zone Sharding은 특정 데이터를 특정 Shard에 저장하도록 규칙을 정의하는 기능입니다.\n\n사용 사례:\n지리적 데이터 분산 (유럽 데이터는 유럽 DC에)\n테넌트별 데이터 격리\n하드웨어 계층화 (핫 데이터는 SSD Shard에)\n\n구성:\nShard에 태그 할당\nShard Key 범위에 태그 연결\nBalancer가 규칙에 따라 Chunk 이동",
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
    "answer": "Chunk는 Shard Key 범위에 따라 분할된 데이터 그룹입니다.\n\n특징:\n기본 크기: 128MB (설정 가능)\n연속된 Shard Key 범위의 Document 포함\nShard 간 데이터 이동의 단위\n\n분할 과정:\nChunk가 chunkSize 초과 시 분할 트리거\n중간 값을 기준으로 두 Chunk로 분할\nBalancer가 Chunk를 다른 Shard로 이동",
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
    "answer": "Balancer는 Shard 간 Chunk를 자동으로 재분배하여 데이터 균형을 유지합니다.\n\n역할:\nChunk 분포 모니터링\n불균형 감지 시 Chunk 마이그레이션\nZone 규칙에 따른 Chunk 이동\n\n작동 방식:\nConfig Server에서 실행\nShard 간 Chunk 수 차이가 임계값 초과 시 동작\n백그라운드에서 Chunk 이동",
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
    "answer": "Hot Shard (Jumbo Chunk)\n문제: 특정 Shard에 트래픽 집중\n해결: Hash Sharding 사용, 복합 Shard Key\nScatter-Gather 쿼리\n문제: Shard Key 미포함 쿼리가 모든 Shard 조회\n해결: 쿼리에 Shard Key 포함, 적절한 Key 선택\nChunk 마이그레이션 오버헤드\n문제: 대량 데이터 이동 시 성능 저하\n해결: 피크 시간 외 Balancer 실행\n분산 트랜잭션 복잡성\n문제: 여러 Shard 걸친 트랜잭션 어려움\n해결: 관련 데이터 같은 Shard에 배치\nShard Key 변경 불가\n문제: 잘못된 Key 선택 시 수정 어려움\n해결: 5.0+ reshardCollection 사용",
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
    "answer": "버전별 Transaction 지원:\n4.0: Replica Set에서 Multi-Document Transaction\n4.2: Sharded Cluster에서 분산 Transaction\n4.4+: 성능 개선 및 제한 완화\n\n제한사항:\n기본 60초 타임아웃 (transactionLifetimeLimitSeconds)\n단일 트랜잭션 oplog 최대 16MB\nReplica Set 또는 Sharded Cluster 필요 (Standalone 불가)\n\n함정 - 트랜잭션 남용 주의:\nMongoDB는 단일 Document 원자성이 기본 (트랜잭션 불필요)\nEmbedding으로 해결 가능한 경우 먼저 검토\n트랜잭션은 성능 오버헤드 발생 (lock, 스냅샷 유지)\nWiredTiger 캐시 압박 가능\n\n트랜잭션이 필요한 경우:\n여러 Collection에 걸친 원자적 작업\n정규화된 스키마에서 일관성 유지\n계좌 이체 등 All-or-Nothing 요구사항",
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
    "answer": "사용 시점:\n여러 Document를 원자적으로 업데이트해야 할 때\n계좌 이체처럼 All-or-Nothing이 필요한 경우\n정규화된 데이터 모델에서 일관성 유지\n\n사용 예시:\n\n대안 고려 (트랜잭션 전에 먼저 검토):\nEmbedding으로 단일 Document 작업으로 변경\n단일 Document 업데이트는 자동 원자성\nTwo-Phase Commit 패턴 (트랜잭션 이전 방식)\n보상 트랜잭션(Saga 패턴) - 분산 시스템에서\n\n트랜잭션 사용 시 주의사항:\n성능 오버헤드: 잠금, 스냅샷 유지, 네트워크 왕복\n60초 타임아웃: 긴 작업은 청크로 분리\nRetry 로직 필수: TransientTransactionError, UnknownTransactionCommitResult 처리\nSharded Cluster: 추가 오버헤드 (분산 잠금)",
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
    "answer": "단일 Document 작업:\n항상 ACID 보장 (원자적 작업)\n\nMulti-Document Transaction (4.0+):\n\n속성   MongoDB 지원\n\nAtomicity   트랜잭션 내 모든 작업이 성공하거나 모두 롤백\nConsistency   트랜잭션 완료 후 데이터 일관성 유지\nIsolation   Snapshot Isolation 제공\nDurability   writeConcern: majority + j:true로 보장",
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
    "answer": "Read Concern 레벨:\n\n레벨   설명   트레이드오프\n\nlocal   로컬 데이터 읽기 (기본값)   빠름, 롤백 가능한 데이터 읽을 수 있음\navailable   Sharding에서 가장 빠른 응답   고아 문서(orphaned) 읽기 가능\nmajority   과반수 복제 확인된 데이터   약간 느림, 롤백되지 않는 데이터 보장\nlinearizable   가장 최신 데이터 보장   가장 느림, 강력한 일관성\nsnapshot   트랜잭션 시작 시점 스냅샷   트랜잭션 내에서만 사용\n\n함정 - Read Concern 오해:\nlocal은 \"롤백될 수 있는\" 데이터를 읽을 수 있음 (Primary 장애 시)\nmajority라도 최신 데이터가 아닐 수 있음 (지연 존재)\nlinearizable은 Primary에서만 사용 가능, 매우 느림\n\nSnapshot Isolation:\n트랜잭션 시작 시점의 일관된 데이터 뷰 제공\n다른 트랜잭션의 변경이 보이지 않음\nPhantom Read 방지\nWrite Conflict 시 TransientTransactionError 발생 → 재시도 필요\n\nRead Concern + Write Concern 조합:\n조합   일관성 수준\n\nlocal + w:1   기본, 약한 일관성\nmajority + majority   인과적 일관성 가능\nlinearizable + majority   가장 강한 일관성",
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
    "answer": "Document 레벨 Atomicity:\n모든 MongoDB 버전에서 자동 지원\n단일 Document 내 모든 필드 업데이트가 원자적\n트랜잭션 없이도 보장\n\nMulti-Document Atomicity:\n4.0+ 트랜잭션 필요\n명시적 session 사용\n성능 오버헤드 존재",
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
    "answer": "Eventual Consistency는 시간이 지나면 모든 노드가 동일한 데이터를 갖게 되는 모델입니다.\n\nMongoDB에서의 적용:\nSecondary는 Primary와 약간의 지연(Replication Lag) 존재\nSecondary 읽기 시 최신 데이터가 아닐 수 있음\n\n일관성 제어 방법:\nWrite Concern:\nRead Concern:\nRead Preference:\n\nStrong Consistency 필요 시:\nPrimary 읽기 + writeConcern: majority 사용",
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
    "answer": "인덱스 최적화:\n자주 쿼리하는 필드에 인덱스 생성\nCovered Query 활용\n불필요한 인덱스 제거\n쿼리 최적화:\n데이터 모델링:\n자주 함께 조회되는 데이터 Embedding\n적절한 정규화/비정규화\nexplain() 분석:\nCOLLSCAN 제거\ntotalDocsExamined 최소화\n하드웨어:\nWorking Set이 RAM에 맞도록 메모리 확보\nSSD 사용",
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
    "answer": "Working Set은 자주 접근하는 데이터와 인덱스의 집합입니다.\n\n메모리와의 관계:\nWorking Set이 RAM에 맞으면 → 빠른 성능\nWorking Set > RAM → 디스크 I/O 발생 (Page Fault)\n\n모니터링:\n\n최적화 방법:\nRAM 증설: Working Set이 맞도록\n인덱스 최적화: 불필요한 인덱스 제거\n데이터 아카이빙: 오래된 데이터 분리\nProjection 사용: 필요한 필드만 조회\n\n권장:\nWorking Set은 가용 RAM의 50-80% 이내 유지\nPage Fault 비율 모니터링",
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
    "answer": "Connection Pool은 미리 생성된 DB 연결을 재사용하는 메커니즘입니다.\n\n장점:\n연결 생성/해제 오버헤드 감소\n응답 시간 단축\n리소스 효율적 사용\n\n설정 방법:\n\n적절한 크기 산정:\n기본값: 100\n계산: 동시 요청 수 / 애플리케이션 인스턴스 수\nMongoDB 최대: 65,536 연결\n\n주의:\n너무 크면 서버 리소스 낭비\n너무 작으면 연결 대기 발생",
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
    "answer": "WiredTiger는 MongoDB 3.2부터 기본 스토리지 엔진입니다 (MMAPv1은 4.2에서 제거됨).\n\n주요 특징:\nDocument-level Locking: 동시성 향상 (실제로는 Intent Lock 사용)\n압축 지원: snappy(기본), zlib, zstd - 인덱스는 prefix 압축\nCheckpointing: 60초마다 일관된 스냅샷 저장\n캐시 관리: 내부 캐시로 성능 최적화\n저널링: WAL(Write-Ahead Logging)로 장애 복구 보장\nMVCC: Multi-Version Concurrency Control로 읽기/쓰기 동시 처리\n\nMMAPv1과 비교 (역사적 참고):\n구분   WiredTiger   MMAPv1 (deprecated)\n\n락   Document-level   Collection-level\n압축   지원 (snappy/zlib/zstd)   미지원\n캐시   자체 캐시   OS 페이지 캐시\n동시성   높음   낮음\n\n캐시 설정:\n\n함정 - 캐시 크기 과대 설정 주의:\nOS/파일시스템 캐시용 RAM도 필요\n다른 프로세스(mongos, 애플리케이션) 고려\n일반적으로 RAM의 50% 이하 권장",
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
    "answer": "WiredTiger Cache 기본값:\nmax(256MB, (totalRAM - 1GB) × 50%)\n예: 16GB RAM → (16 - 1) × 0.5 = 7.5GB\n컨테이너 환경: cgroup 메모리 제한 인식 (4.0.9+)\n\n설정 방법:\n\n메모리 관리 전략:\nCache 크기 산정:\nWorking Set 크기 파악 (자주 접근하는 데이터 + 인덱스)\n다른 프로세스 고려 (OS 캐시, 연결 오버헤드, 집계 작업)\n일반 권장: RAM의 50% 이하\n공유 서버: 더 낮게 설정\n모니터링 지표:\n문제 징후 및 해결:\n지표   문제 징후   해결 방법\n\n높은 eviction   캐시 부족   cacheSizeGB 증가\ndirty pages 비율 높음   쓰기 지연   쓰기 최적화, SSD 사용\ncache 사용률 지속 100%   Working Set > Cache   RAM 증설 또는 데이터 아카이빙\n\n함정 - 캐시 과다 설정:\nOS 파일시스템 캐시도 필요\n메모리 부족 시 OOM Killer 대상\n일반적으로 전체 RAM의 50-60% 초과 비권장",
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
    "answer": "Database Profiler는 쿼리 실행 정보를 system.profile 컬렉션에 기록합니다.\n\n프로파일링 레벨:\n0: Off (기본)\n1: 느린 쿼리만 (slowms 초과)\n2: 모든 쿼리\n\n분석 항목:\nmillis: 실행 시간\nnscanned: 스캔한 Document 수\nquery: 쿼리 내용\nplanSummary: 실행 계획\n\n대안: Atlas에서는 Performance Advisor 사용",
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
    "answer": "Bulk Write는 여러 쓰기 작업을 하나의 요청으로 배치 처리합니다.\n\n장점:\n네트워크 왕복 감소\n처리량 향상\n서버 부하 감소\n\n옵션:\nordered: true (기본): 순서대로 실행, 오류 시 중단\nordered: false: 병렬 실행, 오류 무시하고 계속\n\n사용 사례:\n대량 데이터 마이그레이션\n배치 업데이트\n초기 데이터 로딩",
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
    "answer": "Read 성능:\n적절한 인덱스 생성 및 Covered Query 활용\nProjection으로 필요한 필드만 조회\nRead Preference로 읽기 분산\n캐싱 레이어(Redis) 활용\n\nWrite 성능:\nBulk Write 사용\nWrite Concern 적절히 조정 (w:1 vs majority)\n불필요한 인덱스 제거 (쓰기 시 업데이트 필요)\nSharding으로 쓰기 분산\n\n공통:\n\n모니터링:\ndb.serverStatus() 정기 확인\nSlow Query 로깅 활성화",
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
    "answer": "인증 (Authentication):\nSCRAM (기본): 사용자명/비밀번호\nx.509: 인증서 기반\nLDAP: 외부 LDAP 서버 연동\nKerberos: 엔터프라이즈 인증\n\n권한 부여 활성화:\n\n연결:\n\n주의: 프로덕션에서는 반드시 인증 활성화",
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
    "answer": "RBAC는 역할(Role)을 통해 사용자 권한을 관리하는 방식입니다.\n\nBuilt-in Roles:\n역할   권한\n\nread   읽기 전용\nreadWrite   읽기/쓰기\ndbAdmin   DB 관리 (인덱스, 통계)\nuserAdmin   사용자 관리\nclusterAdmin   클러스터 관리\nroot   모든 권한\n\nCustom Role 생성:\n\n최소 권한 원칙: 필요한 권한만 부여",
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
    "answer": "전송 중 암호화 (In-Transit):\nTLS/SSL로 클라이언트-서버 간 통신 암호화\n저장 중 암호화 (At-Rest):\nWiredTiger의 네이티브 암호화 (Enterprise)\n필드 레벨 암호화 (Client-Side):\n특정 필드만 클라이언트에서 암호화 (4.2+)",
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
    "answer": "백업 방법:\nmongodump/mongorestore: 논리적 백업\n작은 데이터셋에 적합\n컬렉션별 선택적 백업 가능\n파일 시스템 스냅샷: 물리적 백업\n대용량에 빠름\nLVM, EBS 스냅샷 활용\nMongoDB Atlas: 자동 백업\n연속 백업, Point-in-Time Recovery\n\n백업 전략:\n\n복구 테스트:\n정기적인 복구 훈련 필수\nRTO/RPO 목표 설정",
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
    "answer": "mongodump: 데이터를 BSON 파일로 내보내기\nmongorestore: BSON 파일을 MongoDB로 복원\n\n옵션:\n--gzip: 압축\n--oplog: 일관된 스냅샷 (Replica Set)\n--drop: 복원 전 기존 데이터 삭제\n--numParallelCollections: 병렬 처리\n\n주의: 대용량 데이터는 파일 시스템 스냅샷 권장",
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
    "answer": "네, Replica Set에서 Oplog를 활용하여 Point-in-Time Recovery가 가능합니다.\n\n방법:\nmongodump + oplog:\nMongoDB Atlas:\n자동 연속 백업\nUI에서 원하는 시점 선택 가능 (초 단위)\nCluster-tier에 따라 보존 기간 상이\n\n제한사항:\nReplica Set 또는 Sharded Cluster 필요 (Standalone 불가)\nOplog 보존 기간 내의 시점만 복구 가능\nOplog 크기에 따라 복구 가능 기간 결정\n\nOplog 보존 기간 설정 (4.4+):\n\nPITR 복구 시나리오:\n시나리오   복구 방법\n\n실수로 컬렉션 삭제   삭제 직전 시점으로 복원\n잘못된 업데이트   업데이트 전 시점으로 복원\n데이터 손상   손상 발생 전 시점으로 복원\n\n함정 - PITR 한계:\nOplog가 덮어쓰이면 해당 시점 복구 불가\n복구 후 변경된 데이터는 수동 재적용 필요\nSharded Cluster에서는 더 복잡 (각 Shard + Config Server)",
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
    "answer": "핵심 메트릭:\n\n카테고리   메트릭   확인 명령\n\n연결   current connections   db.serverStatus().connections\n쿼리   opcounters (query, insert, update, delete)   db.serverStatus().opcounters\n복제   replication lag   rs.printSecondaryReplicationInfo()\n메모리   cache usage, page faults   db.serverStatus().wiredTiger.cache\n잠금   lock wait time   db.serverStatus().locks\n저장   disk space, data size   db.stats()\n\n알람 설정 권장:\n연결 수 > 80% 한도\nReplication Lag > 10초\nCache Eviction 급증\nPage Faults 증가\n\n모니터링 도구:\nMongoDB Atlas (내장 모니터링)\nPrometheus + Grafana\nDatadog, New Relic",
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
    "answer": "Change Streams는 실시간으로 데이터 변경을 감지하는 기능입니다.\n\n특징:\nOplog 기반 실시간 이벤트 스트림\nReplica Set 또는 Sharded Cluster 필요\nResumable (재시작 시 이어서 처리)\n\n활용 사례:\n실시간 알림/푸시\n캐시 무효화\n데이터 동기화 (CDC)\n감사 로깅\n\n이벤트 타입:\ninsert, update, replace, delete, invalidate, drop",
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
    "answer": "Time Series Collection은 시계열 데이터를 효율적으로 저장하고 쿼리하기 위한 특수 컬렉션입니다 (5.0+).\n\n특징:\n자동 버킷팅으로 저장 공간 절약\n시계열 쿼리 최적화\n자동 압축\n\n사용 사례:\nIoT 센서 데이터\n메트릭/로그 수집\n주가/거래 데이터",
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
    "answer": "Capped Collection은 고정 크기의 순환 버퍼 방식 컬렉션입니다.\n\n특징:\n크기 또는 문서 수 제한\n삽입 순서 보장\n가장 오래된 문서 자동 삭제\n높은 삽입 처리량\nDocument 삭제/크기 증가 업데이트 불가\n\n사용 사례:\n로그 저장 (최근 N개만 유지)\n캐싱\n실시간 스트림 버퍼\n\n주의사항:\nSharding 불가\nTTL 인덱스 대신 사용 가능\nOplog가 대표적인 Capped Collection",
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
    "answer": "TTL(Time-To-Live) Index는 지정된 시간 후 Document를 자동 삭제합니다.\n\n동작 방식:\n백그라운드 스레드가 60초마다 확인\n정확한 삭제 시점은 보장되지 않음\n\n사용 사례:\n세션 데이터, 임시 토큰\n로그 데이터 보관 기간 설정\n캐시 자동 정리",
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
    "answer": "MongoDB Atlas는 공식 완전 관리형 클라우드 데이터베이스 서비스입니다.\n\n주요 기능:\n자동화: 프로비저닝, 패치, 업그레이드 자동화\n고가용성: 자동 Replica Set, Multi-Region\nSharding: 클릭으로 Sharded Cluster 구성\n백업: 연속 백업, Point-in-Time Recovery\n보안: VPC Peering, 암호화, LDAP 통합\n\n추가 서비스:\nAtlas Search: 전문 검색\nAtlas Charts: 데이터 시각화\nAtlas Data Lake: S3 데이터 쿼리\nAtlas Functions: 서버리스 함수\nAtlas Triggers: 이벤트 기반 로직\n\n장점:\n운영 부담 감소\n글로벌 분산 쉬움\nFree Tier 제공",
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
    "answer": "MongoDB Compass는 공식 GUI 클라이언트입니다.\n\n주요 기능:\n시각적 탐색: 스키마 구조, 데이터 분포 시각화\n쿼리 빌더: GUI로 쿼리 작성\nAggregation Builder: 파이프라인 시각적 구성\n인덱스 관리: 인덱스 생성/삭제, 사용량 분석\n성능 분석: explain plan 시각화\n스키마 분석: 필드 타입, 분포 통계\n\n버전:\nCompass (Full): 모든 기능\nCompass Readonly: 읽기 전용\nCompass Isolated: 네트워크 요청 없음\n\n사용 사례:\n개발 중 데이터 탐색\n쿼리 디버깅\n비개발자 데이터 조회",
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
    "answer": "MongoDB를 Primary DB로, Elasticsearch를 검색 엔진으로 사용하는 패턴입니다.\n\n동기화 방법:\nChange Streams + Application\nMongoDB Connector for BI / Kafka\nDebezium + Kafka Connect\nMonstache (오픈소스 동기화 도구)\n\n사용 사례:\n복잡한 전문 검색 (MongoDB Text Index 한계 극복)\n로그 분석\n실시간 대시보드",
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
    "answer": "Cache-Aside (Lazy Loading) 패턴:\n\nWrite-Through 패턴:\n\n캐시 무효화:\nTTL 설정으로 자동 만료\nChange Streams로 실시간 무효화\n\n사용 사례:\n세션 저장 (Redis)\n자주 조회되는 데이터 캐싱\nRate Limiting",
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
    "answer": "Change Streams 활용 (권장):\n\nResume Token으로 재시작:\n\nDebezium + Kafka 활용:\nDebezium MongoDB Connector\n대규모 분산 환경에 적합\n\n사용 사례:\n데이터 웨어하우스 동기화\n이벤트 기반 아키텍처\n실시간 분석 파이프라인",
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
    "answer": "버전   주요 기능\n\n3.6   Change Streams, JSON Schema Validation, Retryable Writes\n4.0   Multi-Document ACID Transactions (Replica Set), SHA-256\n4.2   Distributed Transactions (Sharded Cluster), Wildcard Index, Field-Level Encryption\n4.4   Hedged Reads, Compound Hashed Index, Refinable Shard Keys, $unionWith\n5.0   Time Series Collection, Versioned API, Live Resharding, Window Functions\n6.0   Queryable Encryption (Preview), Cluster-to-Cluster Sync, $densify\n7.0   Queryable Encryption (GA), Compound Wildcard Index, $percentile\n8.0   Queryable Encryption 개선, 성능 최적화 (2024)\n\n주요 트렌드:\n점점 강화되는 Transaction 지원\n보안 기능 강화 (Queryable Encryption)\n운영 편의성 개선 (Live Resharding)\n분석 기능 내장 (Atlas Search, Vector Search)\n\n버전 업그레이드 시 주의사항:\nFeature Compatibility Version (FCV) 확인 및 설정\n드라이버 호환성 확인\nReplica Set 롤링 업그레이드 권장 (Secondary → Primary)\n테스트 환경에서 먼저 검증",
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
    "answer": "사전 준비:\n데이터 크기/구조 분석\n다운타임 허용 범위 결정\n롤백 계획 수립\n\n마이그레이션 방법:\nmongodump/mongorestore:\nmongoimport (JSON/CSV):\nBulk Write API:\n\n최적화:\n인덱스 나중에 생성 (삽입 속도 향상)\nordered: false로 병렬 처리\nBalancer 일시 중지 (Sharded)\n\n주의사항:\n네트워크 대역폭 확인\n대상 서버 리소스 모니터링\n증분 마이그레이션 고려",
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
    "answer": "Hot Shard는 특정 Shard에 읽기/쓰기가 집중되는 현상입니다.\n\n원인:\n단조 증가 Shard Key (ObjectId, 타임스탬프)\n낮은 Cardinality Shard Key\n불균등한 데이터 분포\n\n해결 방법:\nHash Sharding 사용:\n복합 Shard Key:\nShard Key 변경 (5.0+):\nZone Sharding으로 분산:\n\n모니터링:",
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
    "answer": "네, Reference 방식 사용 시 N+1 문제가 발생할 수 있습니다.\n\nN+1 문제 예시:\n\n해결 방법:\n$lookup 사용:\nEmbedding (비정규화):\nBatch 조회:",
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
    "answer": "사전 집계 (Pre-aggregation):\nTime Series Collection (5.0+):\nChange Streams + 스트리밍:\n읽기 분산:\nSecondary에서 분석 쿼리 실행\nAnalytics Node 설정\nAtlas Charts:\n내장 실시간 시각화\n\n아키텍처:",
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
    "answer": "컬렉션 내 테넌트 필드:\n테넌트별 컬렉션:\n테넌트별 데이터베이스:\n\n비교:\n방식   격리 수준   관리 복잡도   확장성\n\n필드   낮음   쉬움   높음\n컬렉션   중간   중간   중간\n데이터베이스   높음   어려움   낮음\n\nZone Sharding 활용:",
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
    "answer": "Redis(Remote Dictionary Server)는 오픈소스 인메모리 데이터 구조 저장소입니다.\n\n주요 특징:\n인메모리 저장: 모든 데이터를 메모리에 저장하여 매우 빠른 읽기/쓰기 성능 제공\n다양한 데이터 구조: String, List, Set, Sorted Set, Hash, Stream 등 지원\n싱글 스레드 명령 처리: 명령어 실행은 단일 스레드로 처리하여 원자성 보장 (Redis 6.0+에서는 I/O 처리를 위한 멀티스레드 도입, 단 명령 실행 자체는 여전히 싱글 스레드)\nPersistence: RDB 스냅샷과 AOF 로그를 통한 데이터 영속성 지원\n복제 및 클러스터링: Master-Replica 복제와 Redis Cluster를 통한 고가용성 및 확장성\nPub/Sub: 실시간 메시징 기능 제공",
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
    "answer": "장점:\n초고속 성능: 디스크 I/O 없이 메모리에서 직접 데이터 접근 (읽기/쓰기 지연시간 마이크로초 단위)\n높은 처리량: 초당 수십만 건의 연산 처리 가능\n낮은 지연시간: 실시간 애플리케이션에 적합\n예측 가능한 성능: 디스크 기반 DB의 캐시 미스로 인한 성능 변동 없음\n\n단점:\n메모리 비용: RAM은 디스크보다 비싸므로 대용량 데이터 저장 시 비용 증가\n데이터 용량 제한: 물리적 메모리 크기에 제한됨\n휘발성 위험: 서버 장애 시 메모리 데이터 손실 가능 (Persistence 설정으로 완화)\n메모리 단편화: 장시간 운영 시 메모리 단편화 발생 가능",
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
    "answer": "String\n가장 기본적인 타입, 최대 512MB 저장\n텍스트, 숫자, 바이너리 데이터 저장 가능\n사용 예: 캐싱, 세션 저장, 카운터\n\nList\n순서가 있는 문자열 리스트 (양방향 연결 리스트)\n앞/뒤에서 삽입/삭제 O(1)\n사용 예: 메시지 큐, 최근 항목 목록\n\nSet\n중복 없는 문자열 집합\n합집합, 교집합, 차집합 연산 지원\n사용 예: 태그, 고유 방문자 추적\n\nSorted Set (ZSet)\n점수(score)로 정렬된 고유 문자열 집합\n범위 조회, 순위 조회 효율적\n사용 예: 리더보드, 우선순위 큐\n\nHash\n필드-값 쌍의 컬렉션 (객체 표현에 적합)\n개별 필드 접근/수정 가능\n사용 예: 사용자 프로필, 설정 정보\n\nStream\n로그 형태의 데이터 구조, 시간순 메시지 저장\nConsumer Group 지원으로 메시지 큐 구현\n사용 예: 이벤트 소싱, 메시지 스트리밍",
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
    "answer": "Redis의 키-값 구조 특징:\n키는 바이너리 세이프 문자열 (최대 512MB)\n값은 단순 문자열이 아닌 다양한 데이터 구조 지원 (Rich Data Structures)\n\n다른 NoSQL과의 차이점:\n\n구분   Redis   Document DB (MongoDB)   Wide-Column (Cassandra)\n\n데이터 모델   Key-Value + 데이터 구조   JSON Document   Column Family\n저장 위치   인메모리 (선택적 디스크)   디스크   디스크\n쿼리   키 기반 + 제한적 검색   풍부한 쿼리 언어   CQL\n주 용도   캐시, 세션, 실시간 처리   범용   대규모 분산 저장\n일관성   강한 일관성 (단일)   튜너블   튜너블\n\nRedis만의 강점:\n원자적 연산 보장 (싱글 스레드)\n밀리초 이하의 지연시간\n풍부한 데이터 구조로 복잡한 연산 지원",
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
    "answer": "RDB (Redis Database Backup)\n특정 시점의 메모리 스냅샷을 바이너리 파일로 저장\nSAVE (동기) 또는 BGSAVE (비동기) 명령으로 생성\n\n장점   단점\n\n컴팩트한 단일 파일로 백업/재해복구 용이   스냅샷 간 데이터 손실 가능 (수분 단위)\n복구 속도 빠름 (AOF 대비)   대용량 데이터 시 fork() 부하로 일시 지연 발생 가능\nReplica 부분 재동기화 지원\n\nAOF (Append Only File)\n모든 쓰기 명령을 로그로 기록\nappendfsync 옵션: always, everysec, no\n\n장점   단점\n\n데이터 손실 최소화 (everysec 시 최대 1초)   파일 크기가 RDB보다 큼\n손상 시 부분 복구 가능   복구 시간이 더 길 수 있음\nRewrite로 파일 크기 최적화   Redis < 7.0에서 rewrite 중 메모리 사용 증가\n\nappendfsync 옵션 비교:\n\n설정   동작   특징\n\nalways   매 쓰기마다 fsync   가장 안전, 가장 느림\neverysec   1초마다 fsync   권장 - 안전성과 성능 균형\nno   OS에 위임   가장 빠름, ~30초 데이터 손실 위험\n\n권장 설정:\nPostgreSQL 수준의 데이터 안전성이 필요하면 RDB + AOF 둘 다 활성화\nAOF로 내구성 확보, RDB로 빠른 복구 및 백업\n캐시 전용이면 persistence 비활성화도 고려",
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
    "answer": "동작 방식:\nPublisher: PUBLISH channel message 명령으로 채널에 메시지 발행\nSubscriber: SUBSCRIBE channel 명령으로 채널 구독\n메시지는 구독 중인 모든 클라이언트에게 실시간으로 전달 (Fire-and-forget)\n\n특징:\n채널은 사전 생성 불필요 (동적 생성)\n패턴 구독 지원 (PSUBSCRIBE news.*)\n메시지 저장 없음 (구독자 없으면 메시지 손실)\nAt-most-once 전달 보장\n\n활용 사례:\n실시간 알림 시스템\n채팅 애플리케이션\n캐시 무효화 브로드캐스트\n마이크로서비스 이벤트 전파\n서비스 간 느슨한 결합 유지\n이벤트 기반 아키텍처 구현\n\n주의사항:\n메시지 손실 가능: 구독자 없으면 메시지 유실, 연결 끊긴 동안 메시지 놓침\n재전송 없음: 구독자가 메시지 수신 실패해도 재시도 없음\n백프레셔 없음: 느린 구독자가 있어도 발행자 차단 안 됨\n메시지 영속성/순서 보장 필요 시 Redis Streams 권장\n대규모 시스템에서는 Kafka, RabbitMQ 등 전용 메시지 브로커 고려\n\nPub/Sub vs Streams 선택 기준:\n\n요구사항   Pub/Sub   Streams\n\n메시지 저장   불필요   필요\nConsumer Group   불필요   필요\n단순성   우선   복잡해도 OK\n사용 사례   실시간 알림   작업 큐, 이벤트 소싱",
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
    "answer": "기본 아키텍처:\n최소 3개의 마스터 노드로 구성\n각 마스터는 1개 이상의 레플리카 보유 권장\n노드 간 Gossip 프로토콜로 상태 공유\n클라이언트는 어떤 노드에 연결해도 올바른 노드로 리다이렉트\n\n데이터 샤딩 방식 (Hash Slot):\n총 16,384개의 해시 슬롯 사용\n키의 CRC16 해시값 % 16384로 슬롯 결정\n각 마스터 노드가 슬롯의 일부를 담당\n\nHash Tag:\n{user}:profile, {user}:settings처럼 중괄호 사용\n같은 태그의 키는 동일 슬롯에 저장 (멀티키 연산 가능)\n\n장점:\n수평적 확장성 (노드 추가로 용량/처리량 증가)\n자동 페일오버로 고가용성 확보\n데이터 자동 재분배\n\n주의사항 (트레이드오프):\n강한 일관성 미보장: 비동기 복제로 인해 페일오버 시 확인된 쓰기 손실 가능\n멀티키 연산 제한: 같은 해시 슬롯에 있는 키만 멀티키 연산 가능 (Hash Tag 필요)\n최소 3개 마스터 필요: 프로덕션 환경에서는 6노드(3마스터+3레플리카) 권장\nDocker/NAT 환경 제한: --net=host 모드 필요",
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
    "answer": "Redis Sentinel의 역할:\n모니터링 (Monitoring)\nMaster와 Replica 인스턴스 상태 지속 확인\n노드의 정상 동작 여부 감시\n알림 (Notification)\n장애 발생 시 관리자/시스템에 알림\nAPI를 통한 이벤트 전달\n자동 페일오버 (Automatic Failover)\nMaster 장애 감지 시 Replica를 새 Master로 승격\n다른 Replica들을 새 Master에 연결\n클라이언트에게 새 Master 주소 제공\n구성 제공자 (Configuration Provider)\n클라이언트가 현재 Master 주소를 Sentinel에 질의\n\n동작 방식:\n\nQuorum vs Majority 차이:\nQuorum: 장애 감지(ODOWN)에 필요한 Sentinel 수\nMajority: 실제 페일오버 승인에 필요한 Sentinel 수 (과반수)\n예: 5개 Sentinel, quorum=2 → 2개가 장애 동의, 3개가 페일오버 승인 필요\n\n권장 구성:\n최소 3개의 Sentinel 인스턴스 (홀수 권장)\n서로 다른 물리 서버/가용 영역에 배치\nquorum 설정으로 페일오버 결정 기준 지정\n\nSentinel vs Cluster 선택 기준:\n\n항목   Sentinel   Cluster\n\n용도   단일 마스터 HA   데이터 샤딩 + HA\n데이터 분산   없음   자동 샤딩 (16,384 슬롯)\n복잡도   상대적 단순   더 복잡\n확장성   수직 확장 위주   수평 확장\n선택 기준   단일 인스턴스로 충분한 용량   대용량/고처리량 필요 시",
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
    "answer": "만료 시간 설정 방법:\n\n운영 시 고려사항:\nCache Stampede (Thundering Herd)\n동시에 많은 키 만료 시 DB 부하 급증\n해결: 만료 시간에 랜덤 지터(jitter) 추가\n메모리 관리\n만료된 키는 즉시 삭제되지 않음 (lazy + 주기적 삭제)\nmaxmemory 설정과 함께 eviction 정책 설정 필요\nTTL 설계\n데이터 특성에 맞는 적절한 TTL 설정\n너무 짧으면 캐시 효율 저하, 너무 길면 데이터 불일치\n만료 이벤트 모니터링\nKeyspace notifications로 만료 이벤트 구독 가능\nCONFIG SET notify-keyspace-events Ex",
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
    "answer": "Eviction 정책 종류:\n\n정책   설명\n\nnoeviction   메모리 초과 시 쓰기 명령 에러 반환\nallkeys-lru   모든 키 중 가장 오래 사용되지 않은 키 제거\nvolatile-lru   만료 설정된 키 중 LRU 제거\nallkeys-lfu   모든 키 중 가장 적게 사용된 키 제거\nvolatile-lfu   만료 설정된 키 중 LFU 제거\nallkeys-random   모든 키 중 무작위 제거\nvolatile-random   만료 설정된 키 중 무작위 제거\nvolatile-ttl   만료 시간이 가장 짧은 키 제거\n\nLRU vs LFU 비교:\nLRU (Least Recently Used): 최근 접근 시간 기준\n최근 사용된 데이터가 다시 사용될 확률 높음 가정\n일반적인 캐시 워크로드에 적합\nLFU (Least Frequently Used): 접근 빈도 기준\n자주 사용되는 데이터 유지\n인기 콘텐츠 캐싱에 적합 (Redis 4.0+)\n\n선택 기준:\n\n사용 사례   권장 정책\n\n일반 캐시   allkeys-lru\n세션 저장소   volatile-lru 또는 volatile-ttl\n인기 콘텐츠 캐시   allkeys-lfu\n데이터 손실 불가   noeviction\n\n설정 방법:",
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
    "answer": "기본 트랜잭션 (MULTI/EXEC):\n큐에 쌓인 명령들이 순차적으로 원자적 실행\n중간에 다른 클라이언트 명령 끼어들지 않음\n\nWATCH를 활용한 Optimistic Locking:\n\n동시성 문제 해결 예시 (재고 차감):\n\n주의사항:\nRedis 트랜잭션은 롤백 없음 (에러 발생해도 다른 명령 실행됨)\nWATCH는 트랜잭션 전 키 변경 감지용 (낙관적 잠금)\n복잡한 원자적 연산은 Lua 스크립트 권장",
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
    "answer": "MULTI/EXEC의 한계:\n큐잉 단계에서 값을 읽고 그 값에 따라 다른 명령 실행 불가\n조건부 로직 구현 불가 (예: IF-THEN-ELSE)\n롤백 없음\n\nLua 스크립트 사용 이유:\n완전한 원자성 보장\n스크립트 전체가 단일 명령처럼 원자적 실행\n중간에 다른 명령 끼어들지 않음\n에러 발생 시 부분 실행 없음 (MULTI/EXEC와 차이)\n네트워크 왕복 감소\n여러 명령을 한 번의 호출로 실행\n클라이언트-서버 간 통신 오버헤드 감소\n복잡한 로직 구현\n조건문, 반복문 등 프로그래밍 로직 사용 가능\n중간 값을 읽고 그에 따라 다른 명령 실행 가능 (MULTI/EXEC 불가)\n\n사용 예시 - Rate Limiter:\n\n실행 방법:\n\n이점 정리:\n장점   설명\n\n원자성   완전한 원자성으로 경쟁 상태 방지\n성능   네트워크 RTT 최소화\n재사용성   EVALSHA로 캐싱된 스크립트 재사용 (SHA1 해시)\n유연성   복잡한 비즈니스 로직 서버사이드 실행\n\n주의사항:\n스크립트 실행 중 전체 Redis 블로킹 (긴 스크립트 주의)\n기본 5초 타임아웃 (lua-time-limit 설정)\n외부 네트워크 호출, 파일 I/O 불가\nCluster 환경에서 모든 키는 같은 슬롯에 있어야 함",
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
    "answer": "메모리 관리 전략:\nmaxmemory 설정\nmaxmemory-policy 설정\n메모리 한계 도달 시 동작 정의\nallkeys-lru, volatile-lru, noeviction 등\n데이터 구조 최적화\n짧은 키 이름 사용\nHash로 작은 객체들 그룹화\n적절한 데이터 타입 선택\n\n메모리 부족 시 문제:\n\n문제   설명\n\n쓰기 실패   noeviction 정책 시 OOM 에러\n성능 저하   빈번한 eviction으로 캐시 히트율 하락\n스왑 사용   OS 스왑 발생 시 심각한 지연\n복제 지연   메모리 부족으로 복제 버퍼 오버플로우\n서비스 중단   OOM Killer에 의해 프로세스 종료\n\n해결 방법:\n설정 최적화\n모니터링 및 알림\n아키텍처 개선\nRedis Cluster로 수평 확장\n데이터 TTL 적절히 설정\n대용량 데이터는 다른 저장소 사용",
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
    "answer": "Key Prefix 사용 이유:\n\nRedis는 단일 키 공간(flat namespace)을 사용하므로, 논리적 그룹화를 위해 프리픽스 컨벤션 사용\n\n네이밍 컨벤션 예시:\n\n장점:\n논리적 분리\n데이터 유형별, 서비스별 키 구분\n멀티테넌트 환경에서 테넌트별 분리\n관리 용이성\nKEYS user:* 또는 SCAN으로 그룹 조회\n특정 프리픽스 일괄 삭제 가능\nRedis Cluster 최적화\nHash Tag {user:1234}:profile로 관련 키 같은 슬롯 배치\n멀티키 연산 가능하게 함\n충돌 방지\n여러 애플리케이션이 같은 Redis 사용 시 네임스페이스 분리\n환경별 구분 (dev:, staging:, prod:)\n모니터링 및 분석\n프리픽스별 메모리 사용량 분석\n키 패턴별 접근 통계",
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
    "answer": "장점:\n빠른 성능\n인메모리 저장으로 밀리초 이하 세션 조회\n높은 동시 접속자 처리 가능\n분산 환경 지원\n여러 애플리케이션 서버가 세션 공유\n로드 밸런서 뒤에서 Sticky Session 불필요\n자동 만료\nTTL 설정으로 세션 자동 정리\n메모리 관리 용이\n확장성\nRedis Cluster로 수평 확장\n수백만 세션 처리 가능\n\n구현 예시:\n\n고려해야 할 단점:\n데이터 손실 위험\n메모리 기반으로 서버 장애 시 세션 손실\n해결: AOF 활성화, Replica 구성\n추가 인프라\nRedis 서버 별도 운영 필요\n네트워크 홉 추가\n직렬화 오버헤드\n세션 객체 직렬화/역직렬화 필요\n보안 고려사항\nRedis 접근 제어 필요\n민감 정보 암호화 권장\n네트워크 의존성\nRedis 연결 실패 시 서비스 영향\n해결: 연결 풀링, 회로 차단기 패턴",
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
    "answer": "복제 메커니즘:\n초기 동기화 (Full Sync)\nReplica가 Master에 연결 시 RDB 스냅샷 전송\n스냅샷 생성 중 발생한 쓰기는 버퍼에 저장 후 전송\n지속적 복제 (Incremental Sync)\nMaster의 모든 쓰기 명령을 Replica에 전파\n비동기 방식으로 동작 (기본)\n부분 재동기화 (Partial Resync)\n연결 끊김 후 재연결 시 변경분만 동기화\nReplication Backlog 버퍼 활용\n\n설정 방법:\n\n가용성 확보 방법:\n읽기 부하 분산\nReplica에서 읽기 처리로 Master 부하 감소\n장애 대응\nMaster 장애 시 Replica를 Master로 승격\n자동: Redis Sentinel 사용\n데이터 안전성",
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
    "answer": "데이터 정합성 보장 방법:\nWAIT 명령 (동기 복제)\n중요: WAIT는 복제본 존재만 확인하며, 강한 일관성을 보장하지 않음\n페일오버 시 WAIT로 확인된 쓰기도 손실 가능 (persistence 설정에 따라)\n한계: 지연시간 증가, Replica 장애 시 쓰기 차단 가능\n최소 Replica 요구사항\nMaster가 N개 이상의 Replica와 M초 이내 연결 시에만 쓰기 허용\n데이터 손실 시간 윈도우를 제한 (best-effort)\n한계: Replica 부족 시 쓰기 불가, 강한 일관성 아닌 시간 제한된 손실 범위\nLua 스크립트 활용\n복잡한 연산을 원자적으로 실행\n한계: 스크립트 실행 중 전체 Redis 블로킹\nWATCH/MULTI 트랜잭션\nOptimistic Locking으로 동시성 제어\n한계: 충돌 시 재시도 필요\n\nRedis의 근본적 한계 (함정 질문 포인트):\n\n한계   설명\n\n비동기 복제   기본적으로 Master 쓰기 후 응답, Replica 복제는 비동기\nWAIT != 강한 일관성   WAIT는 복제 확인만, 페일오버 시 데이터 손실 가능\n최종 일관성   강한 일관성 보장 불가 (CAP에서 AP 성향)\n페일오버 데이터 손실   Master 장애 시 미복제 데이터 손실 가능\n\n실무 권장:\n강한 일관성이 필수인 경우 Redis보다 RDBMS 또는 Raft 기반 시스템 고려\nRedis는 \"best-effort\" 데이터 안전성 제공",
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
    "answer": "주요 성능 최적화 설정:\n메모리 관련\nPersistence 튜닝\n클라이언트 최적화\n연결 풀링 사용\n파이프라이닝으로 RTT 감소\n\n모니터링 도구 및 명령:\n\n도구/명령   용도\n\nINFO   전체 서버 통계\nINFO memory   메모리 상세 정보\nSLOWLOG GET   느린 명령 로그\nLATENCY DOCTOR   지연 진단\nMEMORY DOCTOR   메모리 문제 진단\n\n외부 모니터링 도구:\nRedis Insight: 공식 GUI 모니터링 도구\nPrometheus + Grafana: redis_exporter 연동\n\n최적화 체크리스트:\n적절한 maxmemory 및 eviction 정책\nKEYS 명령 대신 SCAN 사용\n큰 컬렉션 분할 (Big Key 방지)\n파이프라이닝 활용",
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
    "answer": "주요 차이점 비교:\n\n항목   Redis   Memcached\n\n데이터 타입   String, List, Set, Hash 등   String만\n데이터 영속성   RDB, AOF 지원   없음\n복제   Master-Replica 지원   없음\n클러스터링   Redis Cluster   클라이언트 샤딩\nPub/Sub   지원   미지원\n멀티스레드   싱글 (I/O는 6.0+ 멀티)   멀티스레드\n메모리 효율   상대적으로 낮음   높음\n\nRedis 장점:\n다양한 데이터 구조로 복잡한 연산 가능\n데이터 영속성으로 재시작 후 복구\n복제 및 고가용성 내장\n\nMemcached 장점:\n단순하고 가벼움\n멀티스레드로 멀티코어 활용\n메모리 효율적\n\n선택 기준:\n\n요구사항   권장\n\n단순 키-값 캐시   Memcached\n복잡한 데이터 구조   Redis\n데이터 영속성 필요   Redis\n고가용성 필요   Redis",
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
    "answer": "접근 제어 방법:\n인증 (Authentication)\nACL (Access Control Lists)\n네트워크 보안\nTLS/SSL 암호화\n\n보안 체크리스트:\n\n항목   설정\n\n인증 활성화   requirepass 또는 ACL\n바인딩 제한   bind 127.0.0.1\n위험 명령 비활성화   FLUSHALL, CONFIG 등\nTLS 암호화   프로덕션 환경 필수\n방화벽   신뢰된 IP만 허용",
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
    "answer": "메모리 단편화란?\nOS가 할당한 물리 메모리(RSS)와 Redis가 실제 사용하는 메모리(usedmemory) 간 차이\nmemfragmentationratio = RSS / usedmemory로 확인\n\n정상 범위 및 해석:\n\n비율   상태   설명\n\n1.0 ~ 1.5   정상   약간의 단편화는 정상\n1.5 이상   주의   메모리 낭비 발생, 단편화 해소 필요\n1.0 미만   위험   스왑 사용 중 가능성 (심각한 성능 저하)\n\n중요: 피크 메모리 사용 후 데이터 삭제 시 RSS가 바로 감소하지 않아 단편화율이 높게 보일 수 있음 (정상 동작)\n\n발생 원인:\n다양한 크기의 키/값 반복 생성/삭제\n긴 시간 운영으로 메모리 공간 분산\n피크 사용 후 데이터 삭제 (RSS 미반환)\n\n확인 방법:\n\n완화 전략:\nActive Defragmentation (Redis 4.0+)\nJemalloc 사용\nRedis 기본 메모리 할당자\n단편화 최소화에 최적화\n재시작을 통한 해결\nReplica 승격 방식으로 무중단 재시작\n데이터 구조 최적화\n비슷한 크기의 키/값 사용\nHash의 listpack 인코딩 활용 (Redis 7.0+에서 ziplist를 대체)",
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
    "answer": "내부 구현 방식:\n\nRedis는 Lazy Expiration + Active Expiration 두 가지 방식 조합 사용\nLazy Expiration (수동적)\n클라이언트가 키에 접근할 때 만료 여부 확인\n만료되었으면 삭제 후 nil 반환\n접근하지 않는 키는 메모리에 남아있을 수 있음\nActive Expiration (능동적)\n백그라운드에서 주기적으로 실행 (기본 hz=10, 초당 10회 실행)\n만료 설정된 키 중 무작위 20개 샘플링\n만료된 키 삭제, 샘플 중 25% 이상 만료 시 반복 (최대 25ms)\n\n동작 예시:\n\n효율적인 만료 처리 전략:\n만료 시간 분산 (Cache Stampede 방지)\nKeyspace Notifications\n주의: 만료 이벤트는 best-effort, 보장되지 않음\n\n주의사항:\n만료 키가 많으면 Active Expiration에 CPU 사용\nReplica에서는 자체적으로 키 만료하지 않음, Master의 DEL 명령 대기\n비양수 TTL 설정 시 즉시 삭제 (expired 이벤트가 아닌 del 이벤트 발생)\nRENAME 시 TTL은 새 키로 이전됨",
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
    "answer": "비동기 복제 (기본값):\nMaster가 쓰기 완료 후 즉시 클라이언트에 응답\nReplica로 전파는 백그라운드에서 진행\n지연시간 최소화, 데이터 손실 가능성 있음\n\n동기 복제 (WAIT 명령):\n\n차이점 비교:\n\n항목   비동기 복제   동기 복제 (WAIT)\n\n응답 시점   즉시   Replica 확인 후\n지연시간   낮음   높음\n데이터 손실 위험   있음   감소 (완전 제거 아님)\n\nWAIT의 한계 (중요):\nWAIT는 복제본 존재만 확인, 강한 일관성 보장 아님\n페일오버 시 WAIT로 확인된 쓰기도 손실 가능\nReplica의 persistence 설정에 따라 디스크 기록 여부 달라짐\nReplica가 Master로 승격되어야 쓰기가 \"안전\"해짐\n\n선택 기준:\n\n상황   권장 방식\n\n캐시 용도, 성능 중시   비동기 (기본)\n데이터 손실 최소화   WAIT + min-replicas 조합\n강한 일관성 필수   Redis 외 다른 솔루션 고려",
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
    "answer": "Optimistic Locking 개념:\n데이터 충돌이 드물다고 가정\n락을 미리 잡지 않고 커밋 시점에 충돌 검사\n충돌 발생 시 재시도\n\nWATCH 동작 방식:\n\n구현 예시:\n\n주요 명령어:\n\n명령   설명\n\nWATCH key   키 감시 시작\nUNWATCH   감시 해제\nMULTI   트랜잭션 시작\nEXEC   실행 (WATCH 키 변경 시 nil)",
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
    "answer": "Resharding이란?\n해시 슬롯을 노드 간 이동하여 데이터 재분배\n노드 추가/제거, 부하 분산 시 필요\n\n절차:\n클러스터 상태 확인\n새 노드 추가 (필요 시)\n슬롯 재분배\n\n주의사항:\n\n주의점   설명\n\n서비스 영향   슬롯 이동 중 리다이렉트 발생\n대역폭   대량 데이터 이동 시 네트워크 부하\nBig Key   큰 키 이동 시 블로킹 가능\n점진적 수행   한 번에 많은 슬롯 이동 피하기\n\n모범 사례:\n트래픽 낮은 시간에 수행\n소량씩 점진적 이동\n각 단계 후 상태 확인",
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
    "answer": "ACID 특성별 분석:\nAtomicity (원자성) - 부분적 보장\n트랜잭션 내 명령들은 연속적으로 중단 없이 실행됨\n핵심 차이: 개별 명령 실행 에러 시에도 나머지 명령 계속 실행 (롤백 없음)\n큐잉 단계 에러(문법 오류)는 전체 트랜잭션 중단\nConsistency (일관성) - 부분적 보장\n단일 명령은 항상 일관성 유지\n트랜잭션 중 에러 발생 시 부분 적용 가능 (불일치 상태 발생 가능)\nIsolation (격리성) - 보장\n싱글 스레드로 명령 처리\nMULTI/EXEC 블록은 완전히 격리 (다른 클라이언트 끼어들기 불가)\nDurability (지속성) - 설정에 따라\n\n설정   지속성\n\nAOF always   모든 명령 즉시 기록\nAOF everysec   최대 1초 손실\nRDB만   스냅샷 간격만큼 손실\n\nRDBMS 트랜잭션과 비교:\n\n특성   Redis   RDBMS\n\n원자성   중단 없는 실행 (롤백 없음)   완전 (에러 시 롤백)\n격리성   완전 (싱글 스레드)   레벨 선택 가능\n롤백   불가   가능\n중첩 트랜잭션   불가   가능\n\n왜 Redis는 롤백을 지원하지 않는가?\nRedis 명령은 잘못된 인자로만 실패 (프로그래밍 에러)\n프로덕션에서는 발생하지 않아야 하는 에러\n롤백 미지원으로 성능 이점 확보\n\n결론:\nRedis 트랜잭션은 전통적 ACID 완전 보장하지 않음\n강한 트랜잭션 필요 시 Lua 스크립트(원자성 완전 보장) 또는 RDBMS 고려",
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
    "answer": "내부 구현 방식:\n\nRedis Sorted Set은 dual-ported 데이터 구조로 Skip List와 Hash Table을 동시에 사용\n작은 데이터: Listpack (Redis 7.0+) / Ziplist (이전 버전)\n기본 조건: zset-max-listpack-entries 128, zset-max-listpack-value 64\n연속된 메모리 블록에 저장\n메모리 효율적이지만 O(N) 접근\n큰 데이터: Skip List + Hash Table\nSkip List: 점수 기반 정렬 및 범위 검색 O(log N)\nHash Table: 멤버 존재 여부 및 점수 O(1) 조회\n두 구조를 동시에 유지하여 다양한 연산 최적화\n\nSkip List 선택 이유:\n균형 트리 대비 구현 단순\n범위 쿼리 효율적\n동시성 제어 용이 (Redis는 싱글스레드지만)\n\n시간 복잡도:\n\n연산   복잡도   설명\n\nZADD   O(log N)   Skip List 삽입\nZSCORE   O(1)   Hash Table 조회\nZRANK   O(log N)   Skip List 탐색\nZRANGE   O(log N + M)   시작점 탐색 + M개 순회\nZRANGEBYSCORE   O(log N + M)   점수 범위 탐색\n\n대표 활용 사례:\n리더보드\n시간 기반 이벤트\n레이트 리미터",
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
    "answer": "Hash의 메모리 최적화 원리:\n\n작은 Hash는 listpack 인코딩 사용 (Redis 7.0+, 이전 버전은 ziplist)\n연속된 메모리 블록에 필드-값 저장\n개별 키-값 대비 메모리 오버헤드 대폭 감소\n\nRedis 7.0+ listpack 설정:\n\n최적화 전략:\n객체 저장 시 Hash 사용\n작은 객체 버킷팅 (극한 최적화)\n100,000개 객체 기준: 11MB → 1.7MB (6.5배 절약)\n\n주의사항:\n\n항목   고려사항\n\nlistpack 한계 초과   hashtable로 변환되어 메모리 증가\n필드 독립적 TTL   Hash 필드별 만료 불가 (전체 Hash에만 TTL 설정)\n부분 조회   필요한 필드만 HGET으로 조회 가능\n\n메모리 분석:",
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
    "answer": "INFO memory 명령:\n\n주요 지표:\n\n지표   설명\n\nusedmemory   Redis가 할당한 메모리\nusedmemoryrss   OS가 할당한 실제 메모리\nmemfragmentationratio   RSS/usedmemory (1.5 이상 주의)\n\nMEMORY 명령어:\n\n실시간 모니터링:\n\n외부 도구 연동:\nRedis Insight: 공식 GUI\nPrometheus + Grafana: redis_exporter 연동\n\n모니터링 체크리스트:\n메모리 사용률\n단편화율\n캐시 히트율\n연결 수\n느린 쿼리",
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
    "answer": "Redis Streams:\n로그 형태의 추가 전용 데이터 구조\nConsumer Group으로 분산 처리 지원\n\nvs Pub/Sub:\n\n항목   Streams   Pub/Sub\n\n메시지 저장   영구 저장   저장 안 됨\n재처리   가능   불가능\nConsumer Group   지원   미지원\n\nRedis Modules:\n\n모듈   기능\n\nRediSearch   전문 검색\nRedisJSON   JSON 문서 저장/쿼리\nRedisTimeSeries   시계열 데이터\nRedisBloom   Bloom Filter\n\n기존 기능 대비 장점:\nRediSearch: 서버사이드 검색\nRedisJSON: 부분 쿼리/수정\nRedisTimeSeries: 다운샘플링, 집계",
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
