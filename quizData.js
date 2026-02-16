const quizData = [
    ...csData,
    ...specific_dbData,
    ...etcData,
    ...plData,
    ...frameworkData,
    ...infraData
];

const categories = [
  {
    "id": "architecture",
    "name": "컴퓨터 구조",
    "section": "cs",
    "count": 60
  },
  {
    "id": "database",
    "name": "Database",
    "section": "cs",
    "count": 70
  },
  {
    "id": "ds",
    "name": "자료구조",
    "section": "cs",
    "count": 63
  },
  {
    "id": "network",
    "name": "Network",
    "section": "cs",
    "count": 104
  },
  {
    "id": "os",
    "name": "OS",
    "section": "cs",
    "count": 122
  },
  {
    "id": "elasticsearch",
    "name": "Elasticsearch",
    "section": "specific_db",
    "count": 50
  },
  {
    "id": "mongodb",
    "name": "MongoDB",
    "section": "specific_db",
    "count": 80
  },
  {
    "id": "redis",
    "name": "Redis",
    "section": "specific_db",
    "count": 30
  },
  {
    "id": "crdt",
    "name": "CRDT",
    "section": "etc",
    "count": 30
  },
  {
    "id": "java",
    "name": "Java",
    "section": "pl",
    "count": 75
  },
  {
    "id": "javascript",
    "name": "JavaScript/TypeScript",
    "section": "pl",
    "count": 30
  },
  {
    "id": "python",
    "name": "Python",
    "section": "pl",
    "count": 25
  },
  {
    "id": "go",
    "name": "Go",
    "section": "pl",
    "count": 15
  },
  {
    "id": "pl",
    "name": "프로그래밍 언어",
    "section": "pl",
    "count": 15
  },
  {
    "id": "system_design",
    "name": "시스템 설계",
    "section": "etc",
    "count": 95
  },
  {
    "id": "websocket",
    "name": "WebSocket",
    "section": "etc",
    "count": 30
  },
  {
    "id": "ktor",
    "name": "Ktor",
    "section": "framework",
    "count": 38
  },
  {
    "id": "spring",
    "name": "Spring",
    "section": "framework",
    "count": 51
  },
  {
    "id": "docker",
    "name": "Docker",
    "section": "infra",
    "count": 100
  },
  {
    "id": "kubernetes",
    "name": "Kubernetes",
    "section": "infra",
    "count": 140
  },
  {
    "id": "debezium",
    "name": "CDC/Debezium",
    "section": "infra",
    "count": 30
  },
  {
    "id": "kafka",
    "name": "Kafka",
    "section": "infra",
    "count": 50
  }
];

const sectionNames = {
  "cs": "CS 기초",
  "specific_db": "특정 데이터베이스",
  "framework": "Framework",
  "infra": "인프라 & 메시징",
  "etc": "기타",
  "pl": "프로그래밍 언어"
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { quizData, categories, sectionNames };
}
