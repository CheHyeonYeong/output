# MongoDB 면접 질문

## 기본 개념

### 1. MongoDB란 무엇이며, RDBMS와 어떤 차이가 있나요?

<details>
<summary>답변</summary>

MongoDB는 문서 지향(Document-Oriented) NoSQL 데이터베이스입니다.

**RDBMS와의 주요 차이점:**
- **데이터 모델**: RDBMS는 테이블(행/열), MongoDB는 Document(BSON)
- **스키마**: RDBMS는 고정 스키마, MongoDB는 유연한 스키마
- **관계**: RDBMS는 JOIN, MongoDB는 Embedding 또는 Reference
- **확장**: RDBMS는 수직 확장, MongoDB는 수평 확장(Sharding)

**참고자료**
- [SQL to MongoDB Mapping](https://www.mongodb.com/docs/manual/reference/sql-comparison/)[^1]

</details>

[^1]: MongoDB 공식 문서 - SQL과 MongoDB 매핑 비교

### 2. NoSQL 데이터베이스의 종류(Document, Key-Value, Column-Family, Graph)와 MongoDB가 속한 유형은 무엇인가요?

<details>
<summary>답변</summary>

**NoSQL 데이터베이스 4가지 유형:**
1. **Document Store**: MongoDB, CouchDB - JSON/BSON 문서 저장
2. **Key-Value Store**: Redis, DynamoDB - 키-값 쌍 저장
3. **Column-Family Store**: Cassandra, HBase - 컬럼 기반 저장
4. **Graph Database**: Neo4j - 노드와 관계 저장

MongoDB는 **Document Store** 유형에 속하며, 데이터를 BSON 형식의 문서로 저장합니다.

**참고자료**
- [MongoDB Introduction](https://www.mongodb.com/docs/manual/introduction/)[^2]

</details>

[^2]: MongoDB 공식 문서 - 소개

### 3. Document Store 기반 NoSQL인 MongoDB를 사용하는 이유와 장단점은 무엇인가요?

<details>
<summary>답변</summary>

**장점:**
- 유연한 스키마로 빠른 개발 가능
- 수평 확장(Sharding)이 용이
- 높은 읽기/쓰기 성능
- 풍부한 쿼리 언어와 Aggregation Framework
- 내장 복제(Replica Set)로 고가용성

**단점:**
- 복잡한 JOIN 연산에 비효율적
- 메모리 사용량이 높음
- 트랜잭션 오버헤드(Multi-Document)

**참고자료**
- [MongoDB Introduction](https://www.mongodb.com/docs/manual/introduction/)[^3]

</details>

[^3]: MongoDB 공식 문서 - 소개

### 4. MongoDB에서 사용하는 BSON이란 무엇이며, JSON과의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

BSON(Binary JSON)은 JSON의 바이너리 인코딩 형식입니다.

**JSON과의 차이점:**
- **형식**: JSON은 텍스트, BSON은 바이너리
- **데이터 타입**: BSON은 Date, ObjectId, Binary 등 추가 타입 지원
- **크기**: BSON은 길이 정보 포함으로 순회가 빠름
- **효율성**: BSON이 인코딩/디코딩 속도가 빠름

**참고자료**
- [BSON Types](https://www.mongodb.com/docs/manual/reference/bson-types/)[^4]

</details>

[^4]: MongoDB 공식 문서 - BSON 타입

### 5. MongoDB에서 BSON 기반으로 저장되는 Collection과 Document의 개념을 설명해주세요.

<details>
<summary>답변</summary>

**Document:**
- MongoDB의 기본 데이터 단위 (RDBMS의 행에 해당)
- BSON 형식으로 저장되는 필드-값 쌍의 집합
- 최대 크기 16MB

**Collection:**
- Document들의 그룹 (RDBMS의 테이블에 해당)
- 동적 스키마로 다른 구조의 Document 포함 가능

```javascript
// Document 예시
{ "_id": ObjectId("..."), "name": "John", "age": 30 }
```

**참고자료**
- [Documents](https://www.mongodb.com/docs/manual/core/document/)[^5]

</details>

[^5]: MongoDB 공식 문서 - Documents

### 6. MongoDB Collection 내 Document들이 서로 다른 필드 구조를 가질 수 있는 스키마리스(Schema-less) 특성은 무엇을 의미하나요?

<details>
<summary>답변</summary>

스키마리스란 컬렉션 내 Document들이 동일한 필드 구조를 가질 필요가 없다는 의미입니다.

**특징:**
- 같은 컬렉션에 다른 필드를 가진 Document 저장 가능
- 필드 추가/삭제 시 스키마 변경 불필요
- 빠른 개발과 반복이 가능

**주의점:**
- Schema Validation으로 유효성 검증 가능
- 애플리케이션 레벨에서 스키마 관리 필요

**참고자료**
- [Data Modeling](https://www.mongodb.com/docs/manual/data-modeling/)[^6]

</details>

[^6]: MongoDB 공식 문서 - 데이터 모델링

---

## 데이터 모델링

### 7. MongoDB에서 Schema Design의 중요한 원칙은 무엇인가요?

<details>
<summary>답변</summary>

**주요 설계 원칙:**
1. **함께 조회되는 데이터는 함께 저장** - Embedding 활용
2. **애플리케이션의 접근 패턴 기반 설계** - 읽기/쓰기 비율 고려
3. **Document 크기 제한(16MB) 고려**
4. **인덱싱 전략 수립**
5. **데이터 중복 vs 참조 트레이드오프 판단**

**Anti-patterns 피하기:**
- 무한 성장하는 배열
- 과도한 Embedding
- 불필요한 Normalization

**참고자료**
- [Data Modeling Introduction](https://www.mongodb.com/docs/manual/core/data-modeling-introduction/)[^7]

</details>

[^7]: MongoDB 공식 문서 - 데이터 모델링 소개

### 8. MongoDB Schema Design에서 Embedding(내장)과 Referencing(참조) 방식의 차이와 각각 언제 사용하나요?

<details>
<summary>답변</summary>

**Embedding (내장):**
```javascript
{ "name": "John", "address": { "city": "Seoul", "zip": "12345" } }
```
- 한 번의 쿼리로 모든 데이터 조회
- 1:1, 1:Few 관계에 적합
- 데이터가 함께 조회될 때 사용

**Referencing (참조):**
```javascript
{ "name": "John", "address_id": ObjectId("...") }
```
- 데이터 중복 방지
- 1:Many, Many:Many 관계에 적합
- 독립적으로 접근하는 데이터에 사용

**참고자료**
- [Data Model Design](https://www.mongodb.com/docs/manual/core/data-model-design/)[^8]

</details>

[^8]: MongoDB 공식 문서 - 데이터 모델 설계

### 9. Embedding과 Referencing을 활용하여 One-to-Many 관계를 MongoDB에서 어떻게 설계하나요?

<details>
<summary>답변</summary>

**1. Embedding (1:Few):**
```javascript
// 저자 Document에 책 배열 내장
{ "author": "Kim", "books": [{ "title": "Book1" }, { "title": "Book2" }] }
```

**2. Child Reference (1:Many):**
```javascript
// 부모에 자식 ID 배열 저장
{ "_id": 1, "name": "Author", "book_ids": [101, 102, 103] }
```

**3. Parent Reference (1:Squillions):**
```javascript
// 자식에 부모 ID 저장 (로그 등 대량 데이터)
{ "message": "log", "host_id": ObjectId("...") }
```

**참고자료**
- [Model One-to-Many Relationships](https://www.mongodb.com/docs/manual/tutorial/model-embedded-one-to-many-relationships-between-documents/)[^9]

</details>

[^9]: MongoDB 공식 문서 - One-to-Many 관계 모델링

### 10. MongoDB에서 Many-to-Many 관계를 어떻게 설계하나요?

<details>
<summary>답변</summary>

**양쪽 Document에 참조 배열 저장:**

```javascript
// Students Collection
{ "_id": 1, "name": "Kim", "course_ids": [101, 102] }

// Courses Collection
{ "_id": 101, "name": "Math", "student_ids": [1, 2, 3] }
```

**$lookup으로 조인:**
```javascript
db.students.aggregate([
  { $lookup: { from: "courses", localField: "course_ids",
               foreignField: "_id", as: "courses" } }
])
```

**고려사항:** 배열 크기가 커지면 별도 Junction Collection 사용

**참고자료**
- [Model Many-to-Many Relationships](https://www.mongodb.com/docs/manual/tutorial/model-embedded-many-to-many-relationships-between-documents/)[^10]

</details>

[^10]: MongoDB 공식 문서 - Many-to-Many 관계 모델링

### 11. MongoDB Document의 크기 제한(16MB)은 얼마이며, 이를 초과하는 큰 데이터는 어떻게 처리하나요?

<details>
<summary>답변</summary>

**Document 크기 제한: 16MB**

**큰 데이터 처리 방법:**
1. **GridFS 사용** - 16MB 초과 파일을 청크로 분할 저장
2. **데이터 분리** - 큰 필드를 별도 Collection으로 분리
3. **참조 사용** - Embedding 대신 Reference 활용
4. **압축** - 바이너리 데이터 압축 후 저장

```javascript
// GridFS 사용 예시
const bucket = new GridFSBucket(db);
fs.createReadStream('large_file.pdf').pipe(bucket.openUploadStream('file.pdf'));
```

**참고자료**
- [Document Size Limit](https://www.mongodb.com/docs/manual/reference/limits/#bson-document-size)[^11]

</details>

[^11]: MongoDB 공식 문서 - BSON Document 크기 제한

### 12. 16MB Document 크기 제한을 초과하는 파일을 저장하기 위한 GridFS란 무엇이며 언제 사용하나요?

<details>
<summary>답변</summary>

GridFS는 16MB를 초과하는 대용량 파일을 저장하기 위한 MongoDB 스펙입니다.

**작동 방식:**
- 파일을 255KB 청크로 분할
- `fs.files`: 파일 메타데이터 저장
- `fs.chunks`: 실제 데이터 청크 저장

**사용 사례:**
- 이미지, 비디오, 오디오 파일 저장
- 대용량 문서 저장
- 파일 시스템 제한 우회

```javascript
const bucket = new GridFSBucket(db);
bucket.openDownloadStreamByName('file.pdf').pipe(res);
```

**참고자료**
- [GridFS](https://www.mongodb.com/docs/manual/core/gridfs/)[^12]

</details>

[^12]: MongoDB 공식 문서 - GridFS

---

## 쿼리 & 인덱싱

### 13. MongoDB의 기본 CRUD 작업을 설명해주세요.

<details>
<summary>답변</summary>

**Create:**
```javascript
db.collection.insertOne({ name: "Kim" })
db.collection.insertMany([{ name: "Lee" }, { name: "Park" }])
```

**Read:**
```javascript
db.collection.find({ age: { $gt: 20 } })
db.collection.findOne({ _id: ObjectId("...") })
```

**Update:**
```javascript
db.collection.updateOne({ name: "Kim" }, { $set: { age: 30 } })
db.collection.updateMany({}, { $inc: { count: 1 } })
```

**Delete:**
```javascript
db.collection.deleteOne({ name: "Kim" })
db.collection.deleteMany({ status: "inactive" })
```

**참고자료**
- [CRUD Operations](https://www.mongodb.com/docs/manual/crud/)[^13]

</details>

[^13]: MongoDB 공식 문서 - CRUD 작업

### 14. MongoDB Read 작업에서 find()와 findOne()의 차이는 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | find() | findOne() |
|------|--------|-----------|
| 반환 | Cursor (여러 Document) | 단일 Document 또는 null |
| 용도 | 복수 결과 조회 | 단일 결과 조회 |
| 성능 | limit 없으면 전체 스캔 | 첫 번째 매칭 후 중단 |

```javascript
// find() - Cursor 반환
const cursor = db.users.find({ status: "active" })
cursor.forEach(doc => console.log(doc))

// findOne() - Document 반환
const user = db.users.findOne({ _id: ObjectId("...") })
```

**참고자료**
- [find()](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/)[^14]

</details>

[^14]: MongoDB 공식 문서 - find() 메서드

### 15. find() 메서드에서 사용하는 MongoDB 쿼리 연산자($eq, $gt, $in, $and, $or 등)를 설명해주세요.

<details>
<summary>답변</summary>

**비교 연산자:**
- `$eq`: 같음 / `$ne`: 같지 않음
- `$gt`: 초과 / `$gte`: 이상
- `$lt`: 미만 / `$lte`: 이하
- `$in`: 배열 내 포함 / `$nin`: 포함되지 않음

**논리 연산자:**
- `$and`: AND 조건
- `$or`: OR 조건
- `$not`: 부정
- `$nor`: 모든 조건 불만족

```javascript
db.users.find({
  $and: [
    { age: { $gte: 20, $lte: 30 } },
    { status: { $in: ["active", "pending"] } }
  ]
})
```

**참고자료**
- [Query Operators](https://www.mongodb.com/docs/manual/reference/operator/query/)[^15]

</details>

[^15]: MongoDB 공식 문서 - 쿼리 연산자

### 16. find() 메서드에서 반환할 필드를 지정하는 Projection이란 무엇이며 어떻게 사용하나요?

<details>
<summary>답변</summary>

Projection은 쿼리 결과에서 반환할 필드를 지정하는 기능입니다.

```javascript
// 특정 필드만 포함 (1 = 포함)
db.users.find({}, { name: 1, email: 1 })

// 특정 필드 제외 (0 = 제외)
db.users.find({}, { password: 0, __v: 0 })

// _id는 명시적으로 제외 필요
db.users.find({}, { name: 1, _id: 0 })
```

**주의사항:**
- 포함(1)과 제외(0)를 혼용할 수 없음 (_id 제외)
- 네트워크 대역폭과 메모리 절약에 효과적

**참고자료**
- [Project Fields](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/)[^16]

</details>

[^16]: MongoDB 공식 문서 - 필드 Projection

### 17. MongoDB의 인덱스 종류와 각각의 특징을 설명해주세요.

<details>
<summary>답변</summary>

**주요 인덱스 종류:**

1. **Single Field Index**: 단일 필드 인덱스
2. **Compound Index**: 복합 필드 인덱스
3. **Multikey Index**: 배열 필드 인덱스
4. **Text Index**: 텍스트 검색용 인덱스
5. **Geospatial Index**: 지리 데이터용 (2d, 2dsphere)
6. **Hashed Index**: 해시 기반 Sharding용
7. **TTL Index**: 자동 문서 만료

```javascript
// 단일 필드
db.users.createIndex({ email: 1 })

// 복합 인덱스
db.users.createIndex({ lastName: 1, firstName: 1 })
```

**참고자료**
- [Index Types](https://www.mongodb.com/docs/manual/indexes/)[^17]

</details>

[^17]: MongoDB 공식 문서 - 인덱스

### 18. 여러 필드를 조합한 Compound Index(복합 인덱스)란 무엇이며 언제 사용하나요?

<details>
<summary>답변</summary>

복합 인덱스는 여러 필드를 조합한 인덱스입니다.

```javascript
db.products.createIndex({ category: 1, price: -1 })
```

**사용 시점:**
- 여러 필드로 자주 검색/정렬할 때
- 복합 조건 쿼리 최적화 시

**ESR 규칙 (권장 순서):**
1. **E**quality: 등가 조건 필드 먼저
2. **S**ort: 정렬 필드
3. **R**ange: 범위 조건 필드 마지막

```javascript
// 쿼리: status="active", createdAt 정렬, price > 100
db.items.createIndex({ status: 1, createdAt: 1, price: 1 })
```

**참고자료**
- [Compound Indexes](https://www.mongodb.com/docs/manual/core/index-compound/)[^18]

</details>

[^18]: MongoDB 공식 문서 - 복합 인덱스

### 19. MongoDB Compound Index(복합 인덱스)에서 필드 순서가 쿼리 성능에 어떤 영향을 미치나요?

<details>
<summary>답변</summary>

**복합 인덱스에서 필드 순서가 중요한 이유:**

인덱스 `{ a: 1, b: 1, c: 1 }`의 경우:
- `{ a: 1 }` 쿼리: 사용 가능
- `{ a: 1, b: 1 }` 쿼리: 사용 가능
- `{ b: 1 }` 쿼리: 사용 불가 (prefix 없음)
- `{ a: 1, c: 1 }` 쿼리: a만 인덱스 활용

**Prefix Rule:**
복합 인덱스는 왼쪽부터 순서대로 사용됩니다.

**정렬 방향:**
```javascript
// 인덱스: { a: 1, b: -1 }
// 지원: sort({ a: 1, b: -1 }) 또는 sort({ a: -1, b: 1 })
// 미지원: sort({ a: 1, b: 1 })
```

**참고자료**
- [Index Prefix](https://www.mongodb.com/docs/manual/core/index-compound/#prefixes)[^19]

</details>

[^19]: MongoDB 공식 문서 - 인덱스 Prefix

### 20. MongoDB의 특수 인덱스인 Text Index와 Geospatial Index는 무엇인가요?

<details>
<summary>답변</summary>

**Text Index:**
텍스트 검색을 위한 인덱스로, 문자열 필드에서 단어 검색 지원

```javascript
db.articles.createIndex({ content: "text" })
db.articles.find({ $text: { $search: "mongodb database" } })
```

**Geospatial Index:**
지리적 데이터 쿼리를 위한 인덱스

- **2dsphere**: 구형 지구 기반 (GeoJSON)
- **2d**: 평면 좌표 기반

```javascript
db.places.createIndex({ location: "2dsphere" })
db.places.find({
  location: {
    $near: { $geometry: { type: "Point", coordinates: [127, 37] }, $maxDistance: 1000 }
  }
})
```

**참고자료**
- [Text Indexes](https://www.mongodb.com/docs/manual/core/index-text/)[^20]

</details>

[^20]: MongoDB 공식 문서 - Text 인덱스

### 21. 인덱스 사용 여부와 쿼리 성능을 분석하기 위해 explain()을 사용하는 방법은?

<details>
<summary>답변</summary>

```javascript
db.collection.find({ status: "active" }).explain("executionStats")
```

**주요 확인 항목:**
- **queryPlanner.winningPlan**: 선택된 실행 계획
- **stage**: COLLSCAN(전체 스캔) vs IXSCAN(인덱스 스캔)
- **executionStats.totalDocsExamined**: 검사한 문서 수
- **executionStats.executionTimeMillis**: 실행 시간

**좋은 쿼리의 지표:**
- stage가 IXSCAN
- totalDocsExamined ≈ nReturned
- indexOnly: true (Covered Query)

**참고자료**
- [Explain Results](https://www.mongodb.com/docs/manual/reference/explain-results/)[^21]

</details>

[^21]: MongoDB 공식 문서 - explain 결과

### 22. MongoDB에서 인덱스만으로 쿼리를 완료하는 Covered Query란 무엇이며 어떻게 활용하나요?

<details>
<summary>답변</summary>

Covered Query는 인덱스만으로 쿼리를 완료할 수 있어 Document에 접근하지 않는 쿼리입니다.

**조건:**
1. 모든 쿼리 필드가 인덱스에 포함
2. 모든 반환 필드가 인덱스에 포함
3. _id 필드가 projection에서 제외

```javascript
// 인덱스: { status: 1, email: 1 }
db.users.find(
  { status: "active" },
  { email: 1, _id: 0 }  // Covered Query
)
```

**explain()에서 확인:**
- `totalDocsExamined: 0`
- `stage: IXSCAN` (FETCH 없음)

**참고자료**
- [Covered Query](https://www.mongodb.com/docs/manual/core/query-optimization/#covered-query)[^22]

</details>

[^22]: MongoDB 공식 문서 - Covered Query

---

## Aggregation Framework

### 23. Aggregation Pipeline이란 무엇인가요?

<details>
<summary>답변</summary>

Aggregation Pipeline은 문서를 여러 단계(Stage)를 거쳐 처리하는 데이터 처리 프레임워크입니다.

**특징:**
- 각 Stage의 출력이 다음 Stage의 입력
- SQL의 GROUP BY, JOIN 등의 기능 제공
- 복잡한 데이터 변환 및 분석 가능

```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },    // WHERE
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },  // GROUP BY
  { $sort: { total: -1 } },               // ORDER BY
  { $limit: 10 }                          // LIMIT
])
```

**참고자료**
- [Aggregation Pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)[^23]

</details>

[^23]: MongoDB 공식 문서 - Aggregation Pipeline

### 24. Aggregation Pipeline에서 사용하는 주요 Stage($match, $group, $project, $sort, $lookup 등)를 설명해주세요.

<details>
<summary>답변</summary>

**주요 Stage:**

| Stage | 설명 | SQL 대응 |
|-------|------|----------|
| $match | 조건 필터링 | WHERE |
| $group | 그룹화 및 집계 | GROUP BY |
| $project | 필드 선택/변환 | SELECT |
| $sort | 정렬 | ORDER BY |
| $limit | 결과 제한 | LIMIT |
| $skip | 결과 건너뛰기 | OFFSET |
| $lookup | 다른 Collection 조인 | JOIN |
| $unwind | 배열 펼치기 | - |

```javascript
db.sales.aggregate([
  { $match: { year: 2024 } },
  { $group: { _id: "$product", total: { $sum: "$amount" } } },
  { $project: { product: "$_id", total: 1, _id: 0 } },
  { $sort: { total: -1 } }
])
```

**참고자료**
- [Aggregation Stages](https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/)[^24]

</details>

[^24]: MongoDB 공식 문서 - Aggregation Stage 연산자

### 25. Aggregation Pipeline에서 다른 Collection과 LEFT OUTER JOIN을 수행하는 $lookup 사용법을 설명해주세요.

<details>
<summary>답변</summary>

$lookup은 다른 Collection과 LEFT OUTER JOIN을 수행합니다.

**기본 문법:**
```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "products",           // 조인할 Collection
      localField: "productId",    // 현재 Collection 필드
      foreignField: "_id",        // 대상 Collection 필드
      as: "productInfo"           // 결과 배열 필드명
    }
  }
])
```

**Pipeline 사용 (5.0+):**
```javascript
{
  $lookup: {
    from: "products",
    let: { pid: "$productId" },
    pipeline: [
      { $match: { $expr: { $eq: ["$_id", "$$pid"] } } },
      { $project: { name: 1 } }
    ],
    as: "product"
  }
}
```

**참고자료**
- [$lookup](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/)[^25]

</details>

[^25]: MongoDB 공식 문서 - $lookup

### 26. MongoDB Aggregation Pipeline에서 배열 필드를 펼쳐서 처리하는 $unwind는 언제 사용하며 어떤 역할을 하나요?

<details>
<summary>답변</summary>

$unwind는 배열 필드를 펼쳐서 각 요소마다 별도의 문서를 생성합니다.

```javascript
// 원본: { _id: 1, items: ["a", "b", "c"] }
db.orders.aggregate([{ $unwind: "$items" }])
// 결과:
// { _id: 1, items: "a" }
// { _id: 1, items: "b" }
// { _id: 1, items: "c" }
```

**사용 시점:**
- 배열 요소별 집계가 필요할 때
- $lookup 결과 배열 처리 시
- 배열 요소 기준 그룹화 시

**옵션:**
```javascript
{ $unwind: { path: "$items", preserveNullAndEmptyArrays: true } }
```

**참고자료**
- [$unwind](https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/)[^26]

</details>

[^26]: MongoDB 공식 문서 - $unwind

### 27. Aggregation Pipeline에서 동일 입력에 여러 파이프라인을 병렬 실행하는 $facet 사용 방법은?

<details>
<summary>답변</summary>

$facet은 동일한 입력 데이터에 여러 파이프라인을 병렬로 실행합니다.

```javascript
db.products.aggregate([
  { $match: { status: "active" } },
  {
    $facet: {
      // 카테고리별 통계
      "byCategory": [
        { $group: { _id: "$category", count: { $sum: 1 } } }
      ],
      // 가격 범위별 통계
      "byPriceRange": [
        { $bucket: { groupBy: "$price", boundaries: [0, 100, 500, 1000] } }
      ],
      // 페이지네이션 정보
      "metadata": [
        { $count: "total" }
      ]
    }
  }
])
```

**사용 사례:**
- 대시보드 데이터 조회
- 페이지네이션 + 총 개수 동시 조회

**참고자료**
- [$facet](https://www.mongodb.com/docs/manual/reference/operator/aggregation/facet/)[^27]

</details>

[^27]: MongoDB 공식 문서 - $facet

### 28. Aggregation Pipeline과 Deprecated된 MapReduce의 차이는 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | Aggregation Pipeline | MapReduce |
|------|---------------------|-----------|
| 성능 | 빠름 (네이티브 C++) | 느림 (JavaScript) |
| 유연성 | 제한적 (Stage 기반) | 높음 (임의 JS 코드) |
| 사용성 | 쉬움 | 복잡함 |
| 권장 | 대부분의 경우 권장 | 5.0부터 Deprecated |

**MongoDB 5.0+:**
MapReduce는 deprecated되었으며, Aggregation Pipeline 사용을 권장합니다. 복잡한 로직은 `$accumulator`나 `$function`으로 JavaScript 사용 가능합니다.

```javascript
// MapReduce 대체: $group + $accumulator
{ $group: { _id: "$category", result: { $accumulator: { ... } } } }
```

**참고자료**
- [Map-Reduce to Aggregation](https://www.mongodb.com/docs/manual/reference/map-reduce-to-aggregation-pipeline/)[^28]

</details>

[^28]: MongoDB 공식 문서 - MapReduce to Aggregation 마이그레이션

---

## Replication

### 29. MongoDB의 Replication이란 무엇인가요?

<details>
<summary>답변</summary>

Replication은 여러 서버에 동일한 데이터를 복제하여 고가용성과 데이터 중복성을 제공하는 기능입니다.

**목적:**
- **고가용성**: Primary 장애 시 자동 Failover
- **데이터 보호**: 데이터 손실 방지
- **읽기 분산**: Secondary에서 읽기 가능
- **재해 복구**: 지리적 분산 배치 가능

**작동 방식:**
1. Primary가 모든 쓰기 처리
2. Oplog를 통해 Secondary에 변경사항 복제
3. Primary 장애 시 투표로 새 Primary 선출

**참고자료**
- [Replication](https://www.mongodb.com/docs/manual/replication/)[^29]

</details>

[^29]: MongoDB 공식 문서 - Replication

### 30. MongoDB에서 데이터 복제를 구현하는 Replica Set의 구조(Primary, Secondary 등)와 역할을 설명해주세요.

<details>
<summary>답변</summary>

Replica Set은 동일한 데이터를 가진 MongoDB 인스턴스 그룹입니다.

**구조:**
```
┌─────────────┐
│   Primary   │ ← 모든 쓰기 작업
└──────┬──────┘
       │ Oplog 복제
   ┌───┴───┐
   ▼       ▼
┌─────┐ ┌─────┐
│Sec 1│ │Sec 2│ ← 읽기 가능, 투표 참여
└─────┘ └─────┘
```

**권장 구성:**
- 최소 3개 노드 (홀수 권장)
- Primary 1개 + Secondary 2개
- 또는 Primary 1개 + Secondary 1개 + Arbiter 1개

**참고자료**
- [Replica Set Members](https://www.mongodb.com/docs/manual/core/replica-set-members/)[^30]

</details>

[^30]: MongoDB 공식 문서 - Replica Set 멤버

### 31. MongoDB Replica Set(복제 셋)을 구성하는 Primary, Secondary, Arbiter 노드의 역할은 무엇인가요?

<details>
<summary>답변</summary>

**Primary:**
- 모든 쓰기 작업 처리
- 기본 읽기 작업 처리
- Oplog에 작업 기록

**Secondary:**
- Primary의 Oplog를 복제하여 데이터 동기화
- Read Preference 설정 시 읽기 가능
- Primary 장애 시 선출 후보

**Arbiter:**
- 데이터를 저장하지 않음
- 선거에 투표만 참여
- 짝수 노드일 때 과반수 확보용
- 리소스 최소화 목적

```javascript
// Arbiter 추가
rs.addArb("mongodb3.example.com:27017")
```

**참고자료**
- [Replica Set Arbiter](https://www.mongodb.com/docs/manual/core/replica-set-arbiter/)[^31]

</details>

[^31]: MongoDB 공식 문서 - Replica Set Arbiter

### 32. MongoDB Replica Set(복제 셋)에서 읽기 작업을 어느 노드에서 수행할지 지정하는 Read Preference란 무엇이며 종류는 무엇인가요?

<details>
<summary>답변</summary>

Read Preference는 읽기 작업을 어느 노드에서 수행할지 지정합니다.

**종류:**
| 모드 | 설명 |
|------|------|
| primary | Primary에서만 읽기 (기본값) |
| primaryPreferred | Primary 우선, 불가시 Secondary |
| secondary | Secondary에서만 읽기 |
| secondaryPreferred | Secondary 우선, 불가시 Primary |
| nearest | 네트워크 지연 최소 노드 |

```javascript
// Driver 설정
db.collection.find().readPref("secondaryPreferred")

// Connection String
mongodb://host1,host2/?readPreference=secondary
```

**주의:** Secondary 읽기는 약간의 지연(Replication Lag) 가능

**참고자료**
- [Read Preference](https://www.mongodb.com/docs/manual/core/read-preference/)[^32]

</details>

[^32]: MongoDB 공식 문서 - Read Preference

### 33. 쓰기 작업의 확인 수준을 지정하는 Write Concern이란 무엇이며 어떻게 설정하나요?

<details>
<summary>답변</summary>

Write Concern은 쓰기 작업의 확인 수준을 지정합니다.

**주요 옵션:**
| w 값 | 설명 |
|------|------|
| 0 | 확인 안 함 (Fire-and-forget) |
| 1 | Primary 확인 (기본값) |
| "majority" | 과반수 노드 확인 |
| n | n개 노드 확인 |

**j 옵션:** journal 기록 여부
**wtimeout:** 타임아웃 설정

```javascript
db.collection.insertOne(
  { name: "test" },
  { writeConcern: { w: "majority", j: true, wtimeout: 5000 } }
)
```

**트레이드오프:** w 값이 높을수록 안전하지만 지연 증가

**참고자료**
- [Write Concern](https://www.mongodb.com/docs/manual/reference/write-concern/)[^33]

</details>

[^33]: MongoDB 공식 문서 - Write Concern

### 34. Replica Set에서 Primary 장애 시 자동 Failover 과정(장애 감지, 선거, 승격)을 설명해주세요.

<details>
<summary>답변</summary>

**Failover 과정:**

1. **장애 감지**: Heartbeat(2초 간격)로 Primary 상태 확인
2. **선거 시작**: electionTimeoutMillis(기본 10초) 후 선거 개시
3. **투표**: 과반수 투표로 새 Primary 선출
4. **승격**: 가장 최신 데이터를 가진 Secondary가 Primary로 승격
5. **연결 재설정**: 드라이버가 새 Primary로 연결

```
Primary 장애 → [10초 대기] → 선거 시작 → 투표 → 새 Primary 선출
                                    ↓
                            (총 12초 내외 소요)
```

**선출 기준:**
- 가장 최신 oplog
- priority 값 (높을수록 우선)
- 과반수 투표 획득

**참고자료**
- [Replica Set Elections](https://www.mongodb.com/docs/manual/core/replica-set-elections/)[^34]

</details>

[^34]: MongoDB 공식 문서 - Replica Set 선거

### 35. Replica Set의 데이터 동기화와 Point-in-Time Recovery의 기반이 되는 Oplog란 무엇이며 어떤 역할을 하나요?

<details>
<summary>답변</summary>

Oplog(Operation Log)는 Primary의 모든 쓰기 작업을 기록하는 Capped Collection입니다.

**역할:**
- Secondary가 Oplog를 읽어 데이터 동기화
- Point-in-Time Recovery 지원
- Change Streams의 기반

**특징:**
- `local.oplog.rs` Collection에 저장
- Capped Collection (고정 크기, 오래된 것 자동 삭제)
- Idempotent 연산으로 저장

```javascript
// Oplog 조회
use local
db.oplog.rs.find().sort({ $natural: -1 }).limit(1)
```

**크기 설정:**
- 기본: 디스크의 5% 또는 50GB 중 작은 값
- `oplogSizeMB` 옵션으로 조정

**참고자료**
- [Replica Set Oplog](https://www.mongodb.com/docs/manual/core/replica-set-oplog/)[^35]

</details>

[^35]: MongoDB 공식 문서 - Oplog

### 36. MongoDB Replica Set에서 Secondary 노드로부터 읽기 작업을 수행할 때 Replication Lag 등 주의할 점은?

<details>
<summary>답변</summary>

**주의사항:**

1. **Replication Lag**: Primary와 데이터 불일치 가능
   - 최신 데이터가 필요한 경우 Primary 읽기 권장

2. **Stale Read**: 오래된 데이터 읽기 가능
   ```javascript
   // maxStalenessSeconds로 허용 지연 설정
   { readPreference: "secondary", maxStalenessSeconds: 120 }
   ```

3. **쓰기 후 읽기 일관성 문제**
   - 쓰기 직후 Secondary 읽기 시 반영 안 될 수 있음

4. **Failover 시 연결 끊김**
   - 드라이버 재연결 로직 필요

**권장 사용 사례:**
- 분석/리포팅 쿼리
- 지연 허용 가능한 읽기
- 지리적으로 분산된 읽기

**참고자료**
- [Read Preference Use Cases](https://www.mongodb.com/docs/manual/core/read-preference-use-cases/)[^36]

</details>

[^36]: MongoDB 공식 문서 - Read Preference 사용 사례

---

## Sharding

### 37. Sharding이란 무엇이며 왜 필요한가요?

<details>
<summary>답변</summary>

Sharding은 데이터를 여러 서버에 분산 저장하는 수평 확장(Scale-out) 방식입니다.

**필요한 이유:**
- 단일 서버 저장 용량 한계 극복
- 높은 처리량(throughput) 요구
- Working Set이 RAM을 초과할 때
- 지리적 데이터 분산 필요 시

**Sharding vs Replication:**
| 구분 | Sharding | Replication |
|------|----------|-------------|
| 목적 | 용량/성능 확장 | 고가용성/읽기 분산 |
| 데이터 | 분산 저장 | 복제 저장 |
| 확장 방향 | 수평 (Scale-out) | - |

**참고자료**
- [Sharding](https://www.mongodb.com/docs/manual/sharding/)[^37]

</details>

[^37]: MongoDB 공식 문서 - Sharding

### 38. Sharding을 구현하는 MongoDB의 Sharded Cluster 아키텍처(Shard, Config Server, mongos)를 설명해주세요.

<details>
<summary>답변</summary>

```
┌──────────┐  ┌──────────┐
│ mongos   │  │ mongos   │  ← 라우터 (쿼리 분배)
└────┬─────┘  └────┬─────┘
     │             │
┌────┴─────────────┴────┐
│    Config Servers     │  ← 메타데이터 저장 (Replica Set)
└───────────┬───────────┘
     ┌──────┼──────┐
     ▼      ▼      ▼
┌──────┐┌──────┐┌──────┐
│Shard1││Shard2││Shard3│  ← 실제 데이터 (각각 Replica Set)
└──────┘└──────┘└──────┘
```

**구성요소:**
- **Shard**: 실제 데이터 저장 (Replica Set으로 구성)
- **Config Server**: 샤드 메타데이터, 청크 위치 정보 저장
- **mongos**: 쿼리 라우터, 클라이언트 연결점

**참고자료**
- [Sharded Cluster Components](https://www.mongodb.com/docs/manual/core/sharded-cluster-components/)[^38]

</details>

[^38]: MongoDB 공식 문서 - Sharded Cluster 구성요소

### 39. Sharded Cluster에서 데이터를 여러 Shard에 분배하는 기준인 Shard Key란 무엇이며 선택 시 고려사항은?

<details>
<summary>답변</summary>

Shard Key는 데이터를 여러 Shard에 분배하는 기준 필드입니다.

**선택 시 고려사항:**

1. **높은 Cardinality**: 다양한 값이 많아야 균등 분배
2. **균등한 분포**: 특정 값에 쏠리지 않아야 함
3. **쿼리 패턴**: 자주 사용하는 쿼리 필드 포함
4. **변경 불가**: 한 번 설정 후 변경 어려움 (5.0부터 가능)

**좋은 Shard Key 예시:**
```javascript
// 복합 Shard Key
sh.shardCollection("db.orders", { customerId: 1, orderDate: 1 })
```

**피해야 할 패턴:**
- 단조 증가 값 (ObjectId, 타임스탬프) → Hot Shard 발생
- 낮은 Cardinality (boolean, status)

**참고자료**
- [Shard Key Selection](https://www.mongodb.com/docs/manual/core/sharding-shard-key/)[^39]

</details>

[^39]: MongoDB 공식 문서 - Shard Key

### 40. MongoDB Sharding에서 Shard Key 기반 데이터 분배 방식인 Range Sharding과 Hash Sharding의 차이는?

<details>
<summary>답변</summary>

| 구분 | Range Sharding | Hash Sharding |
|------|----------------|---------------|
| 분배 방식 | 값 범위별 분배 | 해시값 기반 분배 |
| 장점 | 범위 쿼리 효율적 | 균등 분배 보장 |
| 단점 | 불균등 분배 가능 | 범위 쿼리 비효율 |
| 적합 | 날짜, 지역 기반 데이터 | 랜덤 접근 패턴 |

```javascript
// Range Sharding
sh.shardCollection("db.logs", { timestamp: 1 })

// Hash Sharding
sh.shardCollection("db.users", { email: "hashed" })
```

**선택 기준:**
- 범위 쿼리가 많으면 → Range
- 균등 분배가 중요하면 → Hash
- 단조 증가 키 사용 시 → Hash 권장

**참고자료**
- [Hashed Sharding](https://www.mongodb.com/docs/manual/core/hashed-sharding/)[^40]

</details>

[^40]: MongoDB 공식 문서 - Hashed Sharding

### 41. 특정 데이터를 특정 Shard에 저장하도록 규칙을 정의하는 Zone Sharding이란 무엇인가요?

<details>
<summary>답변</summary>

Zone Sharding은 특정 데이터를 특정 Shard에 저장하도록 규칙을 정의하는 기능입니다.

**사용 사례:**
- 지리적 데이터 분산 (유럽 데이터는 유럽 DC에)
- 테넌트별 데이터 격리
- 하드웨어 계층화 (핫 데이터는 SSD Shard에)

```javascript
// Zone 생성
sh.addShardTag("shard01", "KOREA")
sh.addShardTag("shard02", "USA")

// Zone 범위 설정
sh.addTagRange(
  "db.users",
  { region: "KR" },
  { region: "KS" },  // KR ~ KS 범위
  "KOREA"
)
```

**구성:**
1. Shard에 태그 할당
2. Shard Key 범위에 태그 연결
3. Balancer가 규칙에 따라 Chunk 이동

**참고자료**
- [Zone Sharding](https://www.mongodb.com/docs/manual/core/zone-sharding/)[^41]

</details>

[^41]: MongoDB 공식 문서 - Zone Sharding

### 42. Sharded Cluster에서 Shard 간 데이터 이동의 단위인 Chunk란 무엇이며 어떻게 분할되나요?

<details>
<summary>답변</summary>

Chunk는 Shard Key 범위에 따라 분할된 데이터 그룹입니다.

**특징:**
- 기본 크기: 128MB (설정 가능)
- 연속된 Shard Key 범위의 Document 포함
- Shard 간 데이터 이동의 단위

**분할 과정:**
1. Chunk가 `chunkSize` 초과 시 분할 트리거
2. 중간 값을 기준으로 두 Chunk로 분할
3. Balancer가 Chunk를 다른 Shard로 이동

```javascript
// Chunk 상태 확인
use config
db.chunks.find({ ns: "db.collection" })

// Chunk 크기 설정
use config
db.settings.save({ _id: "chunksize", value: 64 })  // 64MB
```

**참고자료**
- [Data Partitioning with Chunks](https://www.mongodb.com/docs/manual/core/sharding-data-partitioning/)[^42]

</details>

[^42]: MongoDB 공식 문서 - Chunk를 통한 데이터 파티셔닝

### 43. MongoDB Sharded Cluster에서 Shard 간 Chunk(데이터 청크)를 자동으로 재분배하여 데이터 균형을 유지하는 Balancer의 역할은 무엇인가요?

<details>
<summary>답변</summary>

Balancer는 Shard 간 Chunk를 자동으로 재분배하여 데이터 균형을 유지합니다.

**역할:**
- Chunk 분포 모니터링
- 불균형 감지 시 Chunk 마이그레이션
- Zone 규칙에 따른 Chunk 이동

**작동 방식:**
1. Config Server에서 실행
2. Shard 간 Chunk 수 차이가 임계값 초과 시 동작
3. 백그라운드에서 Chunk 이동

```javascript
// Balancer 상태 확인
sh.getBalancerState()

// Balancer 중지/시작
sh.stopBalancer()
sh.startBalancer()

// 특정 시간대에만 실행
db.settings.update(
  { _id: "balancer" },
  { $set: { activeWindow: { start: "23:00", stop: "06:00" } } }
)
```

**참고자료**
- [Sharded Cluster Balancer](https://www.mongodb.com/docs/manual/core/sharding-balancer-administration/)[^43]

</details>

[^43]: MongoDB 공식 문서 - Balancer 관리

### 44. MongoDB Sharding 환경에서 발생할 수 있는 Hot Shard(특정 Shard에 트래픽 집중), Scatter-Gather 쿼리(모든 Shard 조회) 등의 문제점과 해결 방법은?

<details>
<summary>답변</summary>

**1. Hot Shard (Jumbo Chunk)**
- 문제: 특정 Shard에 트래픽 집중
- 해결: Hash Sharding 사용, 복합 Shard Key

**2. Scatter-Gather 쿼리**
- 문제: Shard Key 미포함 쿼리가 모든 Shard 조회
- 해결: 쿼리에 Shard Key 포함, 적절한 Key 선택

**3. Chunk 마이그레이션 오버헤드**
- 문제: 대량 데이터 이동 시 성능 저하
- 해결: 피크 시간 외 Balancer 실행

**4. 분산 트랜잭션 복잡성**
- 문제: 여러 Shard 걸친 트랜잭션 어려움
- 해결: 관련 데이터 같은 Shard에 배치

**5. Shard Key 변경 불가**
- 문제: 잘못된 Key 선택 시 수정 어려움
- 해결: 5.0+ reshardCollection 사용

**참고자료**
- [Sharding Troubleshooting](https://www.mongodb.com/docs/manual/reference/command/reshardCollection/)[^44]

</details>

[^44]: MongoDB 공식 문서 - reshardCollection

---

## Transaction & Consistency

### 45. MongoDB의 Transaction 지원에 대해 설명해주세요.

<details>
<summary>답변</summary>

**버전별 Transaction 지원:**
- **4.0**: Replica Set에서 Multi-Document Transaction
- **4.2**: Sharded Cluster에서 분산 Transaction
- **4.4+**: 성능 개선 및 제한 완화

```javascript
const session = client.startSession();
session.startTransaction();

try {
  await db.accounts.updateOne(
    { _id: "A" }, { $inc: { balance: -100 } }, { session }
  );
  await db.accounts.updateOne(
    { _id: "B" }, { $inc: { balance: 100 } }, { session }
  );
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
} finally {
  session.endSession();
}
```

**제한사항:**
- 기본 60초 타임아웃
- 16MB 크기 제한

**참고자료**
- [Transactions](https://www.mongodb.com/docs/manual/core/transactions/)[^45]

</details>

[^45]: MongoDB 공식 문서 - Transactions

### 46. 여러 Document를 원자적으로 업데이트하는 Multi-Document Transaction은 언제 사용하나요?

<details>
<summary>답변</summary>

**사용 시점:**
- 여러 Document를 원자적으로 업데이트해야 할 때
- 계좌 이체처럼 All-or-Nothing이 필요한 경우
- 정규화된 데이터 모델에서 일관성 유지

**사용 예시:**
```javascript
// 주문 생성 + 재고 감소
session.startTransaction();
await orders.insertOne({ ... }, { session });
await inventory.updateOne(
  { productId: 123 },
  { $inc: { qty: -1 } },
  { session }
);
await session.commitTransaction();
```

**대안 고려:**
- Embedding으로 단일 Document 작업으로 변경
- 단일 Document 업데이트는 자동 원자성

**주의:** 트랜잭션은 오버헤드가 있으므로 필요한 경우만 사용

**참고자료**
- [Transactions in Applications](https://www.mongodb.com/docs/manual/core/transactions-in-applications/)[^46]

</details>

[^46]: MongoDB 공식 문서 - 애플리케이션에서 트랜잭션

### 47. Multi-Document Transaction에서 MongoDB의 ACID(원자성, 일관성, 격리성, 지속성) 특성을 설명해주세요.

<details>
<summary>답변</summary>

**단일 Document 작업:**
- 항상 ACID 보장 (원자적 작업)

**Multi-Document Transaction (4.0+):**

| 속성 | MongoDB 지원 |
|------|-------------|
| **Atomicity** | 트랜잭션 내 모든 작업이 성공하거나 모두 롤백 |
| **Consistency** | 트랜잭션 완료 후 데이터 일관성 유지 |
| **Isolation** | Snapshot Isolation 제공 |
| **Durability** | writeConcern: majority + j:true로 보장 |

```javascript
// 완전한 ACID 보장 설정
session.startTransaction({
  readConcern: { level: "snapshot" },
  writeConcern: { w: "majority" }
});
```

**참고자료**
- [Transactions and Atomicity](https://www.mongodb.com/docs/manual/core/write-operations-atomicity/)[^47]

</details>

[^47]: MongoDB 공식 문서 - 쓰기 작업 원자성

### 48. ACID의 Isolation과 관련된 Read Concern 레벨(local, majority, snapshot 등)과 Snapshot Isolation에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Read Concern 레벨:**

| 레벨 | 설명 |
|------|------|
| local | 로컬 데이터 읽기 (기본값) |
| available | Sharding에서 가장 빠른 응답 |
| majority | 과반수 복제 확인된 데이터 |
| linearizable | 가장 최신 데이터 보장 |
| snapshot | 트랜잭션 시작 시점 스냅샷 |

**Snapshot Isolation:**
- 트랜잭션 시작 시점의 일관된 데이터 뷰 제공
- 다른 트랜잭션의 변경이 보이지 않음
- Phantom Read 방지

```javascript
session.startTransaction({
  readConcern: { level: "snapshot" },
  writeConcern: { w: "majority" }
});
```

**참고자료**
- [Read Concern](https://www.mongodb.com/docs/manual/reference/read-concern/)[^48]

</details>

[^48]: MongoDB 공식 문서 - Read Concern

### 49. ACID의 Atomicity(원자성)는 단일 Document 레벨과 Multi-Document Transaction 레벨에서 어떻게 다르게 동작하나요?

<details>
<summary>답변</summary>

**Document 레벨 Atomicity:**
- 모든 MongoDB 버전에서 자동 지원
- 단일 Document 내 모든 필드 업데이트가 원자적
- 트랜잭션 없이도 보장

```javascript
// 원자적: 두 필드가 함께 업데이트됨
db.accounts.updateOne(
  { _id: 1 },
  { $inc: { balance: -100 }, $push: { history: "출금" } }
)
```

**Multi-Document Atomicity:**
- 4.0+ 트랜잭션 필요
- 명시적 session 사용
- 성능 오버헤드 존재

```javascript
// 트랜잭션 필요: 두 Document 원자적 업데이트
session.startTransaction();
db.accounts.updateOne({ _id: 1 }, { $inc: { balance: -100 } }, { session });
db.accounts.updateOne({ _id: 2 }, { $inc: { balance: 100 } }, { session });
session.commitTransaction();
```

**참고자료**
- [Atomicity and Transactions](https://www.mongodb.com/docs/manual/core/write-operations-atomicity/)[^49]

</details>

[^49]: MongoDB 공식 문서 - 원자성과 트랜잭션

### 50. Read Preference와 Write Concern으로 제어되는 Eventual Consistency란 무엇이며 MongoDB에서 어떻게 관리되나요?

<details>
<summary>답변</summary>

Eventual Consistency는 시간이 지나면 모든 노드가 동일한 데이터를 갖게 되는 모델입니다.

**MongoDB에서의 적용:**
- Secondary는 Primary와 약간의 지연(Replication Lag) 존재
- Secondary 읽기 시 최신 데이터가 아닐 수 있음

**일관성 제어 방법:**

1. **Write Concern:**
```javascript
{ w: "majority" }  // 과반수 복제 후 응답
```

2. **Read Concern:**
```javascript
{ readConcern: { level: "majority" } }  // 과반수 확인된 데이터만
```

3. **Read Preference:**
```javascript
{ readPreference: "primary" }  // 최신 데이터 보장
```

**Strong Consistency 필요 시:**
- Primary 읽기 + writeConcern: majority 사용

**참고자료**
- [Causal Consistency](https://www.mongodb.com/docs/manual/core/causal-consistency-read-write-concerns/)[^50]

</details>

[^50]: MongoDB 공식 문서 - 인과적 일관성

---

## 성능 최적화

### 51. MongoDB 쿼리 성능을 개선하는 방법은?

<details>
<summary>답변</summary>

**1. 인덱스 최적화:**
- 자주 쿼리하는 필드에 인덱스 생성
- Covered Query 활용
- 불필요한 인덱스 제거

**2. 쿼리 최적화:**
```javascript
// Projection으로 필요한 필드만
db.users.find({}, { name: 1, email: 1 })

// limit 사용
db.logs.find().sort({ date: -1 }).limit(100)
```

**3. 데이터 모델링:**
- 자주 함께 조회되는 데이터 Embedding
- 적절한 정규화/비정규화

**4. explain() 분석:**
- COLLSCAN 제거
- totalDocsExamined 최소화

**5. 하드웨어:**
- Working Set이 RAM에 맞도록 메모리 확보
- SSD 사용

**참고자료**
- [Query Optimization](https://www.mongodb.com/docs/manual/core/query-optimization/)[^51]

</details>

[^51]: MongoDB 공식 문서 - 쿼리 최적화

### 52. 쿼리 성능에 영향을 미치는 Working Set(자주 접근하는 데이터와 인덱스)이란 무엇이며 메모리와의 관계는?

<details>
<summary>답변</summary>

Working Set은 자주 접근하는 데이터와 인덱스의 집합입니다.

**메모리와의 관계:**
- Working Set이 RAM에 맞으면 → 빠른 성능
- Working Set > RAM → 디스크 I/O 발생 (Page Fault)

**모니터링:**
```javascript
db.serverStatus().wiredTiger.cache
// "bytes currently in the cache"
// "bytes read into cache"
```

**최적화 방법:**
1. **RAM 증설**: Working Set이 맞도록
2. **인덱스 최적화**: 불필요한 인덱스 제거
3. **데이터 아카이빙**: 오래된 데이터 분리
4. **Projection 사용**: 필요한 필드만 조회

**권장:**
- Working Set은 가용 RAM의 50-80% 이내 유지
- Page Fault 비율 모니터링

**참고자료**
- [WiredTiger Storage Engine](https://www.mongodb.com/docs/manual/core/wiredtiger/)[^52]

</details>

[^52]: MongoDB 공식 문서 - WiredTiger 스토리지 엔진

### 53. 쿼리 성능 최적화를 위한 Connection Pool의 개념과 적절한 크기 설정 방법은?

<details>
<summary>답변</summary>

Connection Pool은 미리 생성된 DB 연결을 재사용하는 메커니즘입니다.

**장점:**
- 연결 생성/해제 오버헤드 감소
- 응답 시간 단축
- 리소스 효율적 사용

**설정 방법:**
```javascript
// Node.js Driver
const client = new MongoClient(uri, {
  maxPoolSize: 100,    // 최대 연결 수
  minPoolSize: 10,     // 최소 유지 연결
  maxIdleTimeMS: 30000 // 유휴 연결 제거 시간
});
```

**적절한 크기 산정:**
- 기본값: 100
- 계산: `동시 요청 수 / 애플리케이션 인스턴스 수`
- MongoDB 최대: 65,536 연결

**주의:**
- 너무 크면 서버 리소스 낭비
- 너무 작으면 연결 대기 발생

**참고자료**
- [Connection Pool](https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connection-options/)[^53]

</details>

[^53]: MongoDB Node.js Driver 문서 - Connection Options

### 54. MongoDB 기본 스토리지 엔진인 WiredTiger의 특징(Document-level Locking, 압축, 캐시 등)은 무엇인가요?

<details>
<summary>답변</summary>

WiredTiger는 MongoDB 3.2부터 기본 스토리지 엔진입니다.

**주요 특징:**

1. **Document-level Locking**: 동시성 향상
2. **압축 지원**: snappy(기본), zlib, zstd
3. **Checkpointing**: 60초마다 일관된 스냅샷 저장
4. **캐시 관리**: 내부 캐시로 성능 최적화
5. **저널링**: 장애 복구 보장

**MMAPv1과 비교:**
| 구분 | WiredTiger | MMAPv1 |
|------|------------|--------|
| 락 | Document | Collection |
| 압축 | 지원 | 미지원 |
| 캐시 | 내부 캐시 | OS 캐시 |

**캐시 설정:**
```yaml
# 기본: (RAM - 1GB) / 2 또는 256MB
storage:
  wiredTiger:
    engineConfig:
      cacheSizeGB: 4
```

**참고자료**
- [WiredTiger](https://www.mongodb.com/docs/manual/core/wiredtiger/)[^54]

</details>

[^54]: MongoDB 공식 문서 - WiredTiger

### 55. MongoDB 기본 스토리지 엔진인 WiredTiger의 내부 Cache 크기 설정(cacheSizeGB)과 메모리 관리 전략은?

<details>
<summary>답변</summary>

**WiredTiger Cache 기본값:**
- `max(256MB, (RAM - 1GB) × 50%)`

**설정 방법:**
```yaml
# mongod.conf
storage:
  wiredTiger:
    engineConfig:
      cacheSizeGB: 8
```

**메모리 관리 전략:**

1. **Cache 크기 산정:**
   - Working Set 크기 파악
   - 다른 프로세스 고려 (OS, 애플리케이션)
   - RAM의 50-60% 권장

2. **모니터링 지표:**
```javascript
db.serverStatus().wiredTiger.cache
// "maximum bytes configured"
// "bytes currently in the cache"
// "pages evicted"
```

3. **최적화:**
   - 높은 eviction → 캐시 증설 필요
   - 인덱스 메모리 사용량 확인
   - 불필요한 인덱스 제거

**참고자료**
- [WiredTiger Memory Use](https://www.mongodb.com/docs/manual/core/wiredtiger/#memory-use)[^55]

</details>

[^55]: MongoDB 공식 문서 - WiredTiger 메모리 사용

### 56. explain()과 함께 쿼리 성능 분석에 사용되는 Database Profiler로 느린 쿼리를 찾는 방법은?

<details>
<summary>답변</summary>

Database Profiler는 쿼리 실행 정보를 `system.profile` 컬렉션에 기록합니다.

**프로파일링 레벨:**
- 0: Off (기본)
- 1: 느린 쿼리만 (slowms 초과)
- 2: 모든 쿼리

```javascript
// 프로파일러 설정
db.setProfilingLevel(1, { slowms: 100 })

// 느린 쿼리 조회
db.system.profile.find().sort({ ts: -1 }).limit(10)

// 가장 느린 쿼리 상위 5개
db.system.profile.find().sort({ millis: -1 }).limit(5)
```

**분석 항목:**
- `millis`: 실행 시간
- `nscanned`: 스캔한 Document 수
- `query`: 쿼리 내용
- `planSummary`: 실행 계획

**대안:** Atlas에서는 Performance Advisor 사용

**참고자료**
- [Database Profiler](https://www.mongodb.com/docs/manual/tutorial/manage-the-database-profiler/)[^56]

</details>

[^56]: MongoDB 공식 문서 - Database Profiler

### 57. 쓰기 성능을 최적화하기 위해 여러 쓰기 작업을 배치 처리하는 Bulk Write Operation의 장점과 사용 방법은?

<details>
<summary>답변</summary>

Bulk Write는 여러 쓰기 작업을 하나의 요청으로 배치 처리합니다.

**장점:**
- 네트워크 왕복 감소
- 처리량 향상
- 서버 부하 감소

```javascript
// Bulk Write 예시
db.collection.bulkWrite([
  { insertOne: { document: { name: "A" } } },
  { updateOne: { filter: { name: "B" }, update: { $set: { status: "active" } } } },
  { deleteOne: { filter: { name: "C" } } }
], { ordered: false })  // 순서 무관 시 병렬 처리
```

**옵션:**
- `ordered: true` (기본): 순서대로 실행, 오류 시 중단
- `ordered: false`: 병렬 실행, 오류 무시하고 계속

**사용 사례:**
- 대량 데이터 마이그레이션
- 배치 업데이트
- 초기 데이터 로딩

**참고자료**
- [Bulk Write Operations](https://www.mongodb.com/docs/manual/core/bulk-write-operations/)[^57]

</details>

[^57]: MongoDB 공식 문서 - Bulk Write Operations

### 58. 인덱싱, Projection, Bulk Write 등 Read/Write 성능을 향상시키기 위한 Best Practice는?

<details>
<summary>답변</summary>

**Read 성능:**
1. 적절한 인덱스 생성 및 Covered Query 활용
2. Projection으로 필요한 필드만 조회
3. Read Preference로 읽기 분산
4. 캐싱 레이어(Redis) 활용

**Write 성능:**
1. Bulk Write 사용
2. Write Concern 적절히 조정 (w:1 vs majority)
3. 불필요한 인덱스 제거 (쓰기 시 업데이트 필요)
4. Sharding으로 쓰기 분산

**공통:**
```javascript
// Connection Pool 최적화
{ maxPoolSize: 100, minPoolSize: 10 }

// 적절한 Document 설계
// - 자주 함께 접근하는 데이터 Embedding
// - 무한 성장 배열 피하기
```

**모니터링:**
- `db.serverStatus()` 정기 확인
- Slow Query 로깅 활성화

**참고자료**
- [Performance Best Practices](https://www.mongodb.com/docs/manual/administration/analyzing-mongodb-performance/)[^58]

</details>

[^58]: MongoDB 공식 문서 - 성능 분석

---

## 보안 & 관리

### 59. MongoDB의 인증과 권한 관리 방법은?

<details>
<summary>답변</summary>

**인증 (Authentication):**

1. **SCRAM** (기본): 사용자명/비밀번호
2. **x.509**: 인증서 기반
3. **LDAP**: 외부 LDAP 서버 연동
4. **Kerberos**: 엔터프라이즈 인증

```javascript
// 사용자 생성
use admin
db.createUser({
  user: "appUser",
  pwd: "password",
  roles: [{ role: "readWrite", db: "mydb" }]
})
```

**권한 부여 활성화:**
```yaml
# mongod.conf
security:
  authorization: enabled
```

**연결:**
```javascript
mongodb://appUser:password@host:27017/mydb?authSource=admin
```

**주의:** 프로덕션에서는 반드시 인증 활성화

**참고자료**
- [Authentication](https://www.mongodb.com/docs/manual/core/authentication/)[^59]

</details>

[^59]: MongoDB 공식 문서 - 인증

### 60. MongoDB에서 역할(read, readWrite, dbAdmin 등)을 통해 사용자 권한을 관리하는 Role-Based Access Control(RBAC)이란 무엇인가요?

<details>
<summary>답변</summary>

RBAC는 역할(Role)을 통해 사용자 권한을 관리하는 방식입니다.

**Built-in Roles:**
| 역할 | 권한 |
|------|------|
| read | 읽기 전용 |
| readWrite | 읽기/쓰기 |
| dbAdmin | DB 관리 (인덱스, 통계) |
| userAdmin | 사용자 관리 |
| clusterAdmin | 클러스터 관리 |
| root | 모든 권한 |

**Custom Role 생성:**
```javascript
db.createRole({
  role: "analyticsReader",
  privileges: [
    { resource: { db: "analytics", collection: "" },
      actions: ["find", "aggregate"] }
  ],
  roles: []
})

db.createUser({
  user: "analyst",
  pwd: "password",
  roles: ["analyticsReader"]
})
```

**최소 권한 원칙:** 필요한 권한만 부여

**참고자료**
- [Role-Based Access Control](https://www.mongodb.com/docs/manual/core/authorization/)[^60]

</details>

[^60]: MongoDB 공식 문서 - 권한 부여

### 61. 전송 중(TLS), 저장 중(At-Rest), 필드 레벨 등 MongoDB에서 데이터 암호화 방법은?

<details>
<summary>답변</summary>

**1. 전송 중 암호화 (In-Transit):**
TLS/SSL로 클라이언트-서버 간 통신 암호화

```yaml
# mongod.conf
net:
  tls:
    mode: requireTLS
    certificateKeyFile: /path/to/server.pem
```

**2. 저장 중 암호화 (At-Rest):**
WiredTiger의 네이티브 암호화 (Enterprise)

```yaml
security:
  enableEncryption: true
  encryptionKeyFile: /path/to/keyfile
```

**3. 필드 레벨 암호화 (Client-Side):**
특정 필드만 클라이언트에서 암호화 (4.2+)

```javascript
const client = new MongoClient(uri, {
  autoEncryption: {
    keyVaultNamespace: "encryption.__keyVault",
    kmsProviders: { local: { key: masterKey } }
  }
});
```

**참고자료**
- [Encryption at Rest](https://www.mongodb.com/docs/manual/core/security-encryption-at-rest/)[^61]

</details>

[^61]: MongoDB 공식 문서 - 저장 데이터 암호화

### 62. mongodump, 파일 시스템 스냅샷, Oplog 등을 활용한 Backup과 Restore 전략을 설명해주세요.

<details>
<summary>답변</summary>

**백업 방법:**

1. **mongodump/mongorestore**: 논리적 백업
   - 작은 데이터셋에 적합
   - 컬렉션별 선택적 백업 가능

2. **파일 시스템 스냅샷**: 물리적 백업
   - 대용량에 빠름
   - LVM, EBS 스냅샷 활용

3. **MongoDB Atlas**: 자동 백업
   - 연속 백업, Point-in-Time Recovery

**백업 전략:**
```
┌─────────────────────────────────────┐
│ Full Backup: 주 1회 (파일 스냅샷)   │
│ Incremental: Oplog 지속 백업        │
│ Retention: 30일 보관                │
└─────────────────────────────────────┘
```

**복구 테스트:**
- 정기적인 복구 훈련 필수
- RTO/RPO 목표 설정

**참고자료**
- [Backup Methods](https://www.mongodb.com/docs/manual/core/backups/)[^62]

</details>

[^62]: MongoDB 공식 문서 - 백업 방법

### 63. BSON 파일로 논리적 백업/복원을 수행하는 mongodump와 mongorestore의 차이점과 사용 방법은?

<details>
<summary>답변</summary>

**mongodump**: 데이터를 BSON 파일로 내보내기
**mongorestore**: BSON 파일을 MongoDB로 복원

```bash
# 전체 백업
mongodump --uri="mongodb://user:pass@host:27017" --out=/backup/

# 특정 데이터베이스만
mongodump --db=mydb --out=/backup/

# 특정 컬렉션만
mongodump --db=mydb --collection=users --out=/backup/

# 복원
mongorestore --uri="mongodb://host:27017" /backup/

# 특정 DB에 복원
mongorestore --db=newdb /backup/mydb/
```

**옵션:**
- `--gzip`: 압축
- `--oplog`: 일관된 스냅샷 (Replica Set)
- `--drop`: 복원 전 기존 데이터 삭제
- `--numParallelCollections`: 병렬 처리

**주의:** 대용량 데이터는 파일 시스템 스냅샷 권장

**참고자료**
- [mongodump](https://www.mongodb.com/docs/database-tools/mongodump/)[^63]

</details>

[^63]: MongoDB 공식 문서 - mongodump

### 64. Oplog를 활용하여 특정 시점으로 복구하는 Point-in-Time Recovery가 가능한가요?

<details>
<summary>답변</summary>

네, Replica Set에서 Oplog를 활용하여 Point-in-Time Recovery가 가능합니다.

**방법:**

1. **mongodump + oplog:**
```bash
# 백업 시 oplog 포함
mongodump --oplog --out=/backup/

# 특정 시점까지 복원
mongorestore --oplogReplay --oplogLimit="1609459200:1" /backup/
```

2. **MongoDB Atlas:**
   - 자동 연속 백업
   - UI에서 원하는 시점 선택 가능

**제한사항:**
- Replica Set 또는 Sharded Cluster 필요
- Oplog 보존 기간 내의 시점만 복구 가능
- Oplog 크기에 따라 복구 가능 기간 결정

**Oplog 보존 기간 설정:**
```yaml
storage:
  oplogMinRetentionHours: 72  # 최소 72시간 보존
```

**참고자료**
- [Point in Time Recovery](https://www.mongodb.com/docs/manual/tutorial/restore-replica-set-from-backup/)[^64]

</details>

[^64]: MongoDB 공식 문서 - Replica Set 백업 복원

### 65. 연결 수, 캐시 사용량, Replication Lag 등 MongoDB 모니터링 시 중요한 메트릭은 무엇인가요?

<details>
<summary>답변</summary>

**핵심 메트릭:**

| 카테고리 | 메트릭 | 확인 명령 |
|----------|--------|-----------|
| 연결 | current connections | `db.serverStatus().connections` |
| 쿼리 | opcounters (query, insert, update, delete) | `db.serverStatus().opcounters` |
| 복제 | replication lag | `rs.printSecondaryReplicationInfo()` |
| 메모리 | cache usage, page faults | `db.serverStatus().wiredTiger.cache` |
| 잠금 | lock wait time | `db.serverStatus().locks` |
| 저장 | disk space, data size | `db.stats()` |

**알람 설정 권장:**
- 연결 수 > 80% 한도
- Replication Lag > 10초
- Cache Eviction 급증
- Page Faults 증가

**모니터링 도구:**
- MongoDB Atlas (내장 모니터링)
- Prometheus + Grafana
- Datadog, New Relic

**참고자료**
- [Monitoring](https://www.mongodb.com/docs/manual/administration/monitoring/)[^65]

</details>

[^65]: MongoDB 공식 문서 - 모니터링

---

## 고급 주제

### 66. Change Streams란 무엇이며 어떻게 활용하나요?

<details>
<summary>답변</summary>

Change Streams는 실시간으로 데이터 변경을 감지하는 기능입니다.

**특징:**
- Oplog 기반 실시간 이벤트 스트림
- Replica Set 또는 Sharded Cluster 필요
- Resumable (재시작 시 이어서 처리)

```javascript
const changeStream = db.collection.watch([
  { $match: { operationType: { $in: ["insert", "update"] } } }
]);

changeStream.on("change", (change) => {
  console.log(change.operationType, change.fullDocument);
});
```

**활용 사례:**
- 실시간 알림/푸시
- 캐시 무효화
- 데이터 동기화 (CDC)
- 감사 로깅

**이벤트 타입:**
insert, update, replace, delete, invalidate, drop

**참고자료**
- [Change Streams](https://www.mongodb.com/docs/manual/changeStreams/)[^66]

</details>

[^66]: MongoDB 공식 문서 - Change Streams

### 67. IoT 센서 데이터 등 시계열 데이터를 효율적으로 저장하는 Time Series Collection은 무엇이며 언제 사용하나요?

<details>
<summary>답변</summary>

Time Series Collection은 시계열 데이터를 효율적으로 저장하고 쿼리하기 위한 특수 컬렉션입니다 (5.0+).

**특징:**
- 자동 버킷팅으로 저장 공간 절약
- 시계열 쿼리 최적화
- 자동 압축

```javascript
db.createCollection("sensorData", {
  timeseries: {
    timeField: "timestamp",     // 필수
    metaField: "sensorId",      // 선택
    granularity: "minutes"      // seconds, minutes, hours
  },
  expireAfterSeconds: 86400 * 30  // 30일 후 자동 삭제
});

db.sensorData.insertOne({
  timestamp: new Date(),
  sensorId: "sensor001",
  temperature: 25.5,
  humidity: 60
});
```

**사용 사례:**
- IoT 센서 데이터
- 메트릭/로그 수집
- 주가/거래 데이터

**참고자료**
- [Time Series Collections](https://www.mongodb.com/docs/manual/core/timeseries-collections/)[^67]

</details>

[^67]: MongoDB 공식 문서 - Time Series Collections

### 68. Oplog 저장에 사용되는 고정 크기 순환 버퍼 방식인 Capped Collection의 특징과 사용 사례는?

<details>
<summary>답변</summary>

Capped Collection은 고정 크기의 순환 버퍼 방식 컬렉션입니다.

**특징:**
- 크기 또는 문서 수 제한
- 삽입 순서 보장
- 가장 오래된 문서 자동 삭제
- 높은 삽입 처리량
- Document 삭제/크기 증가 업데이트 불가

```javascript
db.createCollection("logs", {
  capped: true,
  size: 10485760,    // 10MB
  max: 5000          // 최대 5000개
});
```

**사용 사례:**
- 로그 저장 (최근 N개만 유지)
- 캐싱
- 실시간 스트림 버퍼

**주의사항:**
- Sharding 불가
- TTL 인덱스 대신 사용 가능
- Oplog가 대표적인 Capped Collection

**참고자료**
- [Capped Collections](https://www.mongodb.com/docs/manual/core/capped-collections/)[^68]

</details>

[^68]: MongoDB 공식 문서 - Capped Collections

### 69. TTL Index를 사용한 자동 데이터 만료 처리 방법은?

<details>
<summary>답변</summary>

TTL(Time-To-Live) Index는 지정된 시간 후 Document를 자동 삭제합니다.

```javascript
// 특정 시간 후 만료
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }  // 1시간 후 삭제
)

// 특정 시점에 만료 (expireAt 필드 값 기준)
db.events.createIndex(
  { expireAt: 1 },
  { expireAfterSeconds: 0 }  // expireAt 필드 값에 삭제
)

// 삽입 예시
db.events.insertOne({
  data: "event",
  expireAt: new Date("2024-12-31")  // 이 시점에 삭제
});
```

**동작 방식:**
- 백그라운드 스레드가 60초마다 확인
- 정확한 삭제 시점은 보장되지 않음

**사용 사례:**
- 세션 데이터, 임시 토큰
- 로그 데이터 보관 기간 설정
- 캐시 자동 정리

**참고자료**
- [TTL Indexes](https://www.mongodb.com/docs/manual/core/index-ttl/)[^69]

</details>

[^69]: MongoDB 공식 문서 - TTL Indexes

### 70. MongoDB Atlas의 주요 기능과 장점은?

<details>
<summary>답변</summary>

MongoDB Atlas는 공식 완전 관리형 클라우드 데이터베이스 서비스입니다.

**주요 기능:**
- **자동화**: 프로비저닝, 패치, 업그레이드 자동화
- **고가용성**: 자동 Replica Set, Multi-Region
- **Sharding**: 클릭으로 Sharded Cluster 구성
- **백업**: 연속 백업, Point-in-Time Recovery
- **보안**: VPC Peering, 암호화, LDAP 통합

**추가 서비스:**
- Atlas Search: 전문 검색
- Atlas Charts: 데이터 시각화
- Atlas Data Lake: S3 데이터 쿼리
- Atlas Functions: 서버리스 함수
- Atlas Triggers: 이벤트 기반 로직

**장점:**
- 운영 부담 감소
- 글로벌 분산 쉬움
- Free Tier 제공

**참고자료**
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)[^70]

</details>

[^70]: MongoDB Atlas 공식 문서

### 71. MongoDB Compass란 무엇인가요?

<details>
<summary>답변</summary>

MongoDB Compass는 공식 GUI 클라이언트입니다.

**주요 기능:**

1. **시각적 탐색**: 스키마 구조, 데이터 분포 시각화
2. **쿼리 빌더**: GUI로 쿼리 작성
3. **Aggregation Builder**: 파이프라인 시각적 구성
4. **인덱스 관리**: 인덱스 생성/삭제, 사용량 분석
5. **성능 분석**: explain plan 시각화
6. **스키마 분석**: 필드 타입, 분포 통계

**버전:**
- Compass (Full): 모든 기능
- Compass Readonly: 읽기 전용
- Compass Isolated: 네트워크 요청 없음

```
다운로드: https://www.mongodb.com/products/compass
```

**사용 사례:**
- 개발 중 데이터 탐색
- 쿼리 디버깅
- 비개발자 데이터 조회

**참고자료**
- [MongoDB Compass](https://www.mongodb.com/docs/compass/current/)[^71]

</details>

[^71]: MongoDB Compass 공식 문서

### 72. MongoDB와 Elasticsearch를 함께 사용하는 아키텍처는?

<details>
<summary>답변</summary>

MongoDB를 Primary DB로, Elasticsearch를 검색 엔진으로 사용하는 패턴입니다.

```
┌─────────┐    ┌─────────┐    ┌───────────────┐
│   App   │───▶│ MongoDB │───▶│ Elasticsearch │
└─────────┘    └─────────┘    └───────────────┘
    │               │                 ▲
    │               │    Sync         │
    │               └─────────────────┘
    │
    └──────── Search Queries ────────▶
```

**동기화 방법:**

1. **Change Streams + Application**
```javascript
const changeStream = db.products.watch();
changeStream.on("change", (change) => {
  elasticClient.index({ index: "products", body: change.fullDocument });
});
```

2. **MongoDB Connector for BI / Kafka**
   - Debezium + Kafka Connect

3. **Monstache** (오픈소스 동기화 도구)

**사용 사례:**
- 복잡한 전문 검색 (MongoDB Text Index 한계 극복)
- 로그 분석
- 실시간 대시보드

**참고자료**
- [Atlas Search](https://www.mongodb.com/docs/atlas/atlas-search/)[^72]

</details>

[^72]: MongoDB Atlas Search (Elasticsearch 대안)

### 73. MongoDB와 Redis를 함께 사용하는 캐싱 전략은?

<details>
<summary>답변</summary>

**Cache-Aside (Lazy Loading) 패턴:**
```javascript
async function getUser(id) {
  // 1. Redis 캐시 확인
  let user = await redis.get(`user:${id}`);
  if (user) return JSON.parse(user);

  // 2. 캐시 미스 시 MongoDB 조회
  user = await db.users.findOne({ _id: id });

  // 3. 캐시에 저장
  await redis.setex(`user:${id}`, 3600, JSON.stringify(user));
  return user;
}
```

**Write-Through 패턴:**
```javascript
async function updateUser(id, data) {
  // MongoDB와 Redis 동시 업데이트
  await db.users.updateOne({ _id: id }, { $set: data });
  await redis.setex(`user:${id}`, 3600, JSON.stringify(data));
}
```

**캐시 무효화:**
- TTL 설정으로 자동 만료
- Change Streams로 실시간 무효화

**사용 사례:**
- 세션 저장 (Redis)
- 자주 조회되는 데이터 캐싱
- Rate Limiting

**참고자료**
- [Caching Patterns](https://www.mongodb.com/docs/manual/tutorial/model-data-for-atomic-operations/)[^73]

</details>

[^73]: MongoDB 데이터 모델링 패턴

### 74. CDC(Change Data Capture)를 MongoDB에서 구현하는 방법은?

<details>
<summary>답변</summary>

**Change Streams 활용 (권장):**
```javascript
const pipeline = [
  { $match: { operationType: { $in: ["insert", "update", "delete"] } } }
];

const changeStream = db.collection.watch(pipeline, {
  fullDocument: "updateLookup"  // 업데이트 시 전체 Document 포함
});

changeStream.on("change", async (change) => {
  // 다른 시스템으로 전파
  await kafka.send({ topic: "changes", message: change });
});
```

**Resume Token으로 재시작:**
```javascript
const resumeToken = changeStream.resumeToken;
// 저장 후 재시작 시
db.collection.watch(pipeline, { resumeAfter: resumeToken });
```

**Debezium + Kafka 활용:**
- Debezium MongoDB Connector
- 대규모 분산 환경에 적합

**사용 사례:**
- 데이터 웨어하우스 동기화
- 이벤트 기반 아키텍처
- 실시간 분석 파이프라인

**참고자료**
- [Change Streams](https://www.mongodb.com/docs/manual/changeStreams/)[^74]

</details>

[^74]: MongoDB 공식 문서 - Change Streams

### 75. MongoDB의 버전별 주요 변경사항과 개선점은?

<details>
<summary>답변</summary>

| 버전 | 주요 기능 |
|------|----------|
| **3.6** | Change Streams, JSON Schema Validation |
| **4.0** | Multi-Document ACID Transactions (Replica Set) |
| **4.2** | Distributed Transactions (Sharded Cluster), Wildcard Index |
| **4.4** | Hedged Reads, Compound Hashed Index |
| **5.0** | Time Series Collection, Versioned API, Resharding |
| **6.0** | Queryable Encryption, Cluster-to-Cluster Sync |
| **7.0** | Sharding 개선, Compound Wildcard Index |

**주요 트렌드:**
- 점점 강화되는 Transaction 지원
- 보안 기능 강화 (암호화, 감사)
- 운영 편의성 개선
- 분석 기능 내장 (Atlas Search, Charts)

**버전 업그레이드 시:**
- Compatibility Mode 확인
- Feature Compatibility Version 설정
- 롤링 업그레이드 권장

**참고자료**
- [Release Notes](https://www.mongodb.com/docs/manual/release-notes/)[^75]

</details>

[^75]: MongoDB 공식 문서 - Release Notes

---

## 실전 시나리오

### 76. 대량의 데이터 마이그레이션 시 고려사항은?

<details>
<summary>답변</summary>

**사전 준비:**
1. 데이터 크기/구조 분석
2. 다운타임 허용 범위 결정
3. 롤백 계획 수립

**마이그레이션 방법:**

1. **mongodump/mongorestore:**
```bash
mongodump --gzip --archive=/backup/data.gz
mongorestore --gzip --archive=/backup/data.gz
```

2. **mongoimport (JSON/CSV):**
```bash
mongoimport --db=mydb --collection=users --file=users.json --jsonArray
```

3. **Bulk Write API:**
```javascript
const bulk = db.collection.initializeUnorderedBulkOp();
data.forEach(doc => bulk.insert(doc));
await bulk.execute();
```

**최적화:**
- 인덱스 나중에 생성 (삽입 속도 향상)
- `ordered: false`로 병렬 처리
- Balancer 일시 중지 (Sharded)

**주의사항:**
- 네트워크 대역폭 확인
- 대상 서버 리소스 모니터링
- 증분 마이그레이션 고려

**참고자료**
- [mongoimport](https://www.mongodb.com/docs/database-tools/mongoimport/)[^76]

</details>

[^76]: MongoDB 공식 문서 - mongoimport

### 77. Hot Shard 문제를 어떻게 해결하나요?

<details>
<summary>답변</summary>

Hot Shard는 특정 Shard에 읽기/쓰기가 집중되는 현상입니다.

**원인:**
- 단조 증가 Shard Key (ObjectId, 타임스탬프)
- 낮은 Cardinality Shard Key
- 불균등한 데이터 분포

**해결 방법:**

1. **Hash Sharding 사용:**
```javascript
sh.shardCollection("db.logs", { _id: "hashed" })
```

2. **복합 Shard Key:**
```javascript
// 시간 기반 데이터에 테넌트 추가
sh.shardCollection("db.events", { tenantId: 1, timestamp: 1 })
```

3. **Shard Key 변경 (5.0+):**
```javascript
db.adminCommand({ reshardCollection: "db.collection", key: { newKey: 1 } })
```

4. **Zone Sharding으로 분산:**

**모니터링:**
```javascript
sh.status()  // Chunk 분포 확인
db.collection.getShardDistribution()
```

**참고자료**
- [Shard Key Selection](https://www.mongodb.com/docs/manual/core/sharding-choose-a-shard-key/)[^77]

</details>

[^77]: MongoDB 공식 문서 - Shard Key 선택

### 78. N+1 문제가 MongoDB에서도 발생하나요? 해결 방법은?

<details>
<summary>답변</summary>

네, Reference 방식 사용 시 N+1 문제가 발생할 수 있습니다.

**N+1 문제 예시:**
```javascript
// 나쁜 예: N+1 쿼리
const posts = await db.posts.find({}).toArray();  // 1번
for (const post of posts) {
  post.author = await db.users.findOne({ _id: post.authorId });  // N번
}
```

**해결 방법:**

1. **$lookup 사용:**
```javascript
db.posts.aggregate([
  { $lookup: {
      from: "users",
      localField: "authorId",
      foreignField: "_id",
      as: "author"
  }},
  { $unwind: "$author" }
])
```

2. **Embedding (비정규화):**
```javascript
// 자주 함께 조회되는 데이터는 내장
{ title: "Post", author: { name: "Kim", email: "..." } }
```

3. **Batch 조회:**
```javascript
const authorIds = posts.map(p => p.authorId);
const authors = await db.users.find({ _id: { $in: authorIds } }).toArray();
```

**참고자료**
- [$lookup](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/)[^78]

</details>

[^78]: MongoDB 공식 문서 - $lookup

### 79. 실시간 분석을 위한 MongoDB 설계 방법은?

<details>
<summary>답변</summary>

**1. 사전 집계 (Pre-aggregation):**
```javascript
// 실시간 카운터 업데이트
db.stats.updateOne(
  { date: "2024-01-01", page: "/home" },
  { $inc: { views: 1, visitors: 1 } },
  { upsert: true }
)
```

**2. Time Series Collection (5.0+):**
```javascript
db.createCollection("metrics", {
  timeseries: { timeField: "ts", metaField: "source", granularity: "minutes" }
})
```

**3. Change Streams + 스트리밍:**
```javascript
db.events.watch().on("change", (change) => {
  // 실시간 대시보드 업데이트
  updateDashboard(change);
})
```

**4. 읽기 분산:**
- Secondary에서 분석 쿼리 실행
- Analytics Node 설정

**5. Atlas Charts:**
- 내장 실시간 시각화

**아키텍처:**
```
MongoDB → Change Streams → Kafka → Flink → Dashboard
```

**참고자료**
- [Time Series Best Practices](https://www.mongodb.com/docs/manual/core/timeseries/timeseries-best-practices/)[^79]

</details>

[^79]: MongoDB 공식 문서 - Time Series Best Practices

### 80. Multi-tenancy 아키텍처를 MongoDB로 구현하는 방법은?

<details>
<summary>답변</summary>

**1. 컬렉션 내 테넌트 필드:**
```javascript
// 모든 Document에 tenantId 포함
{ tenantId: "tenant1", data: "..." }

// 인덱스에 tenantId 포함
db.data.createIndex({ tenantId: 1, createdAt: -1 })

// 쿼리 시 항상 tenantId 포함
db.data.find({ tenantId: "tenant1", ... })
```

**2. 테넌트별 컬렉션:**
```javascript
db.tenant1_orders.find({})
db.tenant2_orders.find({})
```

**3. 테넌트별 데이터베이스:**
```javascript
use tenant1_db
use tenant2_db
```

**비교:**
| 방식 | 격리 수준 | 관리 복잡도 | 확장성 |
|------|----------|------------|--------|
| 필드 | 낮음 | 쉬움 | 높음 |
| 컬렉션 | 중간 | 중간 | 중간 |
| 데이터베이스 | 높음 | 어려움 | 낮음 |

**Zone Sharding 활용:**
```javascript
sh.addTagRange("db.data", { tenantId: "A" }, { tenantId: "B" }, "shard1")
```

**참고자료**
- [Multi-tenant Data](https://www.mongodb.com/docs/manual/tutorial/model-data-for-keyword-search/)[^80]

</details>

[^80]: MongoDB 데이터 모델링 가이드

---

⬅️ [면접 질문 목록으로 돌아가기](../interview.md)
