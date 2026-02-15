/**
 * Quiz Data Builder
 * docs 폴더의 md 파일을 파싱하여 quizData.js 파일 생성
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, 'docs');
const OUTPUT_FILE = path.join(__dirname, 'quizData.js');

// 카테고리 매핑 (폴더명/파일명 → 카테고리 정보)
const CATEGORY_MAP = {
    'network': { id: 'network', name: 'Network', priority: 'P1', prefix: 'NET' },
    'os': { id: 'os', name: 'OS', priority: 'P1', prefix: 'OS' },
    'db': { id: 'database', name: 'Database', priority: 'P1', prefix: 'DB' },
    'ds': { id: 'ds', name: '자료구조', priority: 'P1', prefix: 'DS' },
    'spring': { id: 'spring', name: 'Spring', priority: 'P1', prefix: 'SPR' },
    'redis': { id: 'redis', name: 'Redis', priority: 'P2', prefix: 'REDIS' },
    'kafka': { id: 'kafka', name: 'Kafka', priority: 'P2', prefix: 'KAFKA' },
    'docker': { id: 'docker', name: 'Docker', priority: 'P2', prefix: 'DOCKER' },
    'kubernetes': { id: 'kubernetes', name: 'Kubernetes', priority: 'P2', prefix: 'K8S' },
    'elasticsearch': { id: 'elasticsearch', name: 'Elasticsearch', priority: 'P3', prefix: 'ES' },
    'mongodb': { id: 'mongodb', name: 'MongoDB', priority: 'P3', prefix: 'MONGO' },
    'websocket': { id: 'websocket', name: 'WebSocket', priority: 'P3', prefix: 'WS' },
    'system_design': { id: 'system_design', name: '시스템 설계', priority: 'P3', prefix: 'SD' },
    'debezium': { id: 'debezium', name: 'CDC/Debezium', priority: 'P3', prefix: 'CDC' },
    'nest': { id: 'nest', name: 'NestJS', priority: 'P4', prefix: 'NEST' },
    'ktor': { id: 'ktor', name: 'Ktor', priority: 'P4', prefix: 'KTOR' },
    'architecture': { id: 'architecture', name: '아키텍처', priority: 'P1', prefix: 'ARCH' },
    'etc': { id: 'etc', name: '기타', priority: 'P4', prefix: 'ETC' },
    'crdt': { id: 'crdt', name: 'CRDT', priority: 'P3', prefix: 'CRDT' },
    'pl': { id: 'pl', name: '프로그래밍 언어', priority: 'P3', prefix: 'PL' }
};

/**
 * 마크다운 파일에서 문제 추출
 */
function parseMarkdownFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath, '.md');
    const questions = [];

    // 파일 제목 추출 (첫 번째 # 헤딩)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const fileTitle = titleMatch ? titleMatch[1].trim() : fileName;

    // 카테고리 결정
    const categoryKey = fileName.toLowerCase();
    const category = CATEGORY_MAP[categoryKey] || {
        id: categoryKey,
        name: fileTitle,
        priority: 'P4',
        prefix: categoryKey.toUpperCase().slice(0, 4)
    };

    // 문제 패턴: ### XXX-000 또는 ### 1. 또는 ### 숫자 (다음 줄에 질문)
    // 패턴 1: ### XXX-000 형태 (K8S-001 같은 형식도 지원)
    const pattern1 = /###\s+([A-Z][A-Z0-9]*-\d+)\s*\n([^\n<]+)/g;
    // 패턴 2: ### 1. 질문 형태
    const pattern2 = /###\s+(\d+)\.\s+([^\n<]+)/g;
    // 패턴 3: ### 숫자 형태 (다음 줄에 질문)
    const pattern3 = /###\s+(\d+)\s*\n([^\n<]+)/g;

    // details 블록에서 답변 추출
    const detailsPattern = /<details>\s*<summary>답변<\/summary>([\s\S]*?)<\/details>/g;

    // 패턴 매칭 시도
    let questionMatches = [...content.matchAll(pattern1)];

    // 패턴1에서 결과가 없으면 패턴2 시도
    if (questionMatches.length === 0) {
        questionMatches = [...content.matchAll(pattern2)].map(match => {
            // ID를 카테고리-숫자 형식으로 변환
            const id = `${category.prefix}-${match[1].padStart(3, '0')}`;
            return [match[0], id, match[2]];
        });
    }

    // 여전히 없으면 패턴3 시도
    if (questionMatches.length === 0) {
        questionMatches = [...content.matchAll(pattern3)].map(match => {
            const id = `${category.prefix}-${match[1].padStart(3, '0')}`;
            return [match[0], id, match[2]];
        });
    }

    let answerMatches = [...content.matchAll(detailsPattern)];

    // 문제와 답변 매칭
    for (let i = 0; i < questionMatches.length; i++) {
        const qMatch = questionMatches[i];
        const questionId = qMatch[1].trim();
        const questionText = qMatch[2].trim();

        // 해당 문제에 대응하는 답변 찾기
        let answerText = '';
        let references = [];

        if (i < answerMatches.length) {
            let rawAnswer = answerMatches[i][1].trim();

            // 참고자료 추출
            const refMatch = rawAnswer.match(/\*\*참고자료\*\*\s*([\s\S]*?)$/);
            if (refMatch) {
                const refSection = refMatch[1];
                const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
                let linkMatch;
                while ((linkMatch = linkPattern.exec(refSection)) !== null) {
                    references.push({
                        title: linkMatch[1],
                        url: linkMatch[2]
                    });
                }
                // 참고자료 부분 제거
                rawAnswer = rawAnswer.replace(/\*\*참고자료\*\*[\s\S]*$/, '').trim();
            }

            // 마크다운 테이블, 리스트 등을 평문으로 변환
            answerText = cleanMarkdown(rawAnswer);
        }

        if (questionText && answerText) {
            questions.push({
                id: questionId,
                category: category.id,
                categoryName: category.name,
                priority: category.priority,
                question: questionText,
                answer: answerText,
                references: references,
                keywords: extractKeywords(answerText)
            });
        }
    }

    return questions;
}

/**
 * 마크다운을 평문으로 변환
 */
function cleanMarkdown(text) {
    return text
        // 테이블 제거 (간단한 처리)
        .replace(/\|[^\n]+\|/g, (match) => {
            // 테이블 헤더 구분선 제거
            if (match.match(/^\|[\s\-:|]+\|$/)) return '';
            // 테이블 셀을 텍스트로 변환
            return match.replace(/\|/g, ' ').trim();
        })
        // 볼드/이탤릭
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/__([^_]+)__/g, '$1')
        .replace(/_([^_]+)_/g, '$1')
        // 링크
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        // 코드 블록
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`([^`]+)`/g, '$1')
        // 리스트 마커
        .replace(/^[\s]*[-*+]\s+/gm, '')
        .replace(/^[\s]*\d+\.\s+/gm, '')
        // 헤딩
        .replace(/^#+\s+/gm, '')
        // 여러 줄바꿈 정리
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

/**
 * 답변에서 핵심 키워드 추출
 */
function extractKeywords(text) {
    // 불용어 (한국어 + 영어)
    const stopwords = new Set([
        '이', '그', '저', '것', '수', '등', '및', '또는', '그리고', '하지만', '따라서',
        '위해', '통해', '대해', '경우', '때문', '있습니다', '합니다', '됩니다', '입니다',
        'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
        'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
        'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used',
        'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'into',
        'through', 'during', 'before', 'after', 'above', 'below', 'between', 'under',
        'and', 'but', 'or', 'nor', 'so', 'yet', 'both', 'either', 'neither',
        'not', 'only', 'own', 'same', 'than', 'too', 'very', 'just'
    ]);

    // 기술 용어 패턴 (영어 대문자로 시작하거나 특수 패턴)
    const techTermPattern = /\b([A-Z][a-zA-Z0-9]*(?:[-_][a-zA-Z0-9]+)*|[a-z]+[-_][a-z]+)\b/g;

    // 한글 명사 추출 (간단한 패턴)
    const koreanPattern = /[가-힣]{2,}/g;

    const keywords = new Set();

    // 영어 기술 용어 추출
    let match;
    while ((match = techTermPattern.exec(text)) !== null) {
        const term = match[1].toLowerCase();
        if (term.length > 2 && !stopwords.has(term)) {
            keywords.add(term);
        }
    }

    // 한글 키워드 추출
    const koreanMatches = text.match(koreanPattern) || [];
    koreanMatches.forEach(word => {
        if (word.length >= 2 && !stopwords.has(word)) {
            keywords.add(word);
        }
    });

    // 특수 키워드 (괄호 안의 영어 용어)
    const parenPattern = /\(([A-Za-z][A-Za-z0-9\s-]+)\)/g;
    while ((match = parenPattern.exec(text)) !== null) {
        const term = match[1].toLowerCase().trim();
        if (term.length > 1) {
            keywords.add(term);
        }
    }

    return Array.from(keywords).slice(0, 15); // 최대 15개 키워드
}

/**
 * 모든 md 파일 검색
 */
function findMarkdownFiles(dir) {
    const files = [];

    function scan(directory) {
        const entries = fs.readdirSync(directory, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(directory, entry.name);

            if (entry.isDirectory()) {
                scan(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
                // README.md와 interview.md 제외
                if (entry.name !== 'README.md' && entry.name !== 'interview.md') {
                    files.push(fullPath);
                }
            }
        }
    }

    scan(dir);
    return files;
}

/**
 * 메인 빌드 함수
 */
function build() {
    console.log('📚 Quiz Data Builder 시작...\n');

    const mdFiles = findMarkdownFiles(DOCS_DIR);
    console.log(`📁 발견된 MD 파일: ${mdFiles.length}개\n`);

    let allQuestions = [];
    const categoryStats = {};

    for (const file of mdFiles) {
        const relativePath = path.relative(DOCS_DIR, file);
        console.log(`  파싱 중: ${relativePath}`);

        const questions = parseMarkdownFile(file);
        allQuestions = allQuestions.concat(questions);

        // 카테고리별 통계
        for (const q of questions) {
            categoryStats[q.categoryName] = (categoryStats[q.categoryName] || 0) + 1;
        }
    }

    console.log(`\n✅ 총 ${allQuestions.length}개 문제 추출 완료\n`);
    console.log('📊 카테고리별 문제 수:');
    for (const [cat, count] of Object.entries(categoryStats).sort((a, b) => b[1] - a[1])) {
        console.log(`  - ${cat}: ${count}개`);
    }

    // JavaScript 파일로 출력
    const output = `// Auto-generated by build-quiz.js
// Generated at: ${new Date().toISOString()}
// Total questions: ${allQuestions.length}

const quizData = ${JSON.stringify(allQuestions, null, 2)};

// 카테고리 목록
const categories = ${JSON.stringify(Object.keys(categoryStats).map(name => {
    const sample = allQuestions.find(q => q.categoryName === name);
    return {
        id: sample?.category || name.toLowerCase(),
        name: name,
        priority: sample?.priority || 'P4',
        count: categoryStats[name]
    };
}), null, 2)};

// Node.js 환경에서는 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { quizData, categories };
}
`;

    fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
    console.log(`\n💾 ${OUTPUT_FILE} 생성 완료!`);
}

// 실행
build();
