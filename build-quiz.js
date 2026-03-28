const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, 'docs');
const OUTPUT_DIR = path.join(__dirname, 'quizData');
const OUTPUT_INDEX = path.join(__dirname, 'quizData.js');

const CATEGORY_MAP = {
    'network': { id: 'network', name: 'Network', section: 'cs', prefix: 'NET' },
    'os': { id: 'os', name: 'OS', section: 'cs', prefix: 'OS' },
    'ds': { id: 'ds', name: '자료구조', section: 'cs', prefix: 'DS' },
    'architecture': { id: 'architecture', name: '컴퓨터 구조', section: 'cs', prefix: 'ARCH' },
    'etc': { id: 'etc', name: '개발 상식', section: 'cs', prefix: 'ETC' },
    'db': { id: 'database', name: 'Database', section: 'cs', prefix: 'DB' },
    'redis': { id: 'redis', name: 'Redis', section: 'specific_db', prefix: 'REDIS' },
    'elasticsearch': { id: 'elasticsearch', name: 'Elasticsearch', section: 'specific_db', prefix: 'ES' },
    'mongodb': { id: 'mongodb', name: 'MongoDB', section: 'specific_db', prefix: 'MONGO' },
    'spring': { id: 'spring', name: 'Spring', section: 'framework', prefix: 'SPR' },
    'ktor': { id: 'ktor', name: 'Ktor', section: 'framework', prefix: 'KTOR' },
    'nest': { id: 'nest', name: 'NestJS', section: 'framework', prefix: 'NEST' },
    'docker': { id: 'docker', name: 'Docker', section: 'infra', prefix: 'DOCKER' },
    'kubernetes': { id: 'kubernetes', name: 'Kubernetes', section: 'infra', prefix: 'K8S' },
    'kafka': { id: 'kafka', name: 'Kafka', section: 'infra', prefix: 'KAFKA' },
    'debezium': { id: 'debezium', name: 'CDC/Debezium', section: 'infra', prefix: 'CDC' },
    'websocket': { id: 'websocket', name: 'WebSocket', section: 'etc', prefix: 'WS' },
    'system_design': { id: 'system_design', name: '시스템 설계', section: 'etc', prefix: 'SD' },
    'crdt': { id: 'crdt', name: 'CRDT', section: 'etc', prefix: 'CRDT' },
    'pl': { id: 'pl', name: '프로그래밍 언어', section: 'pl', prefix: 'PL' }
};

const PREFIX_CATEGORY_MAP = {
    'JAVA': { id: 'java', name: 'Java', section: 'pl' },
    'JS': { id: 'javascript', name: 'JavaScript/TypeScript', section: 'pl' },
    'PY': { id: 'python', name: 'Python', section: 'pl' },
    'GO': { id: 'go', name: 'Go', section: 'pl' }
};

const SECTION_NAMES = {
    'cs': 'CS 기초',
    'specific_db': '특정 데이터베이스',
    'framework': 'Framework',
    'infra': '인프라 & 메시징',
    'etc': '기타',
    'pl': '프로그래밍 언어'
};

function parseMarkdownFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath, '.md');
    const questions = [];

    const titleMatch = content.match(/^#\s+(.+)$/m);
    const fileTitle = titleMatch ? titleMatch[1].trim() : fileName;

    const categoryKey = fileName.toLowerCase();
    const category = CATEGORY_MAP[categoryKey] || {
        id: categoryKey,
        name: fileTitle,
        section: 'etc',
        prefix: categoryKey.toUpperCase().slice(0, 4)
    };

    const pattern1 = /###\s+([A-Z][A-Z0-9]*-\d+)\s*\n(?:>\s*\*\*컨텍스트\*\*:[^\n]*\n\s*\n)?([^\n<]+)/g;
    const pattern2 = /###\s+(\d+)\.\s+([^\n<]+)/g;
    const pattern3 = /###\s+(\d+)\s*\n([^\n<]+)/g;
    const detailsPattern = /<details>\s*<summary>답변<\/summary>([\s\S]*?)<\/details>/g;

    let questionMatches = [...content.matchAll(pattern1)];

    if (questionMatches.length === 0) {
        questionMatches = [...content.matchAll(pattern2)].map(match => {
            const id = `${category.prefix}-${match[1].padStart(3, '0')}`;
            return [match[0], id, match[2]];
        });
    }

    if (questionMatches.length === 0) {
        questionMatches = [...content.matchAll(pattern3)].map(match => {
            const id = `${category.prefix}-${match[1].padStart(3, '0')}`;
            return [match[0], id, match[2]];
        });
    }

    let answerMatches = [...content.matchAll(detailsPattern)];

    for (let i = 0; i < questionMatches.length; i++) {
        const qMatch = questionMatches[i];
        const questionId = qMatch[1].trim();
        const questionText = qMatch[2].trim();

        let answerText = '';
        let references = [];

        if (i < answerMatches.length) {
            let rawAnswer = answerMatches[i][1].trim();

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
                rawAnswer = rawAnswer.replace(/\*\*참고자료\*\*[\s\S]*$/, '').trim();
            }

            answerText = rawAnswer;
        }

        if (questionText && answerText) {
            let finalCategory = category.id;
            let finalCategoryName = category.name;
            let finalSection = category.section;

            if (categoryKey === 'pl') {
                const idPrefix = questionId.split('-')[0];
                if (PREFIX_CATEGORY_MAP[idPrefix]) {
                    const langCategory = PREFIX_CATEGORY_MAP[idPrefix];
                    finalCategory = langCategory.id;
                    finalCategoryName = langCategory.name;
                    finalSection = langCategory.section;
                }
            }

            questions.push({
                id: questionId,
                category: finalCategory,
                categoryName: finalCategoryName,
                section: finalSection,
                question: questionText,
                answer: answerText,
                references: references
            });
        }
    }

    return questions;
}

function cleanMarkdown(text) {
    return text
        .replace(/\|[^\n]+\|/g, (match) => {
            if (match.match(/^\|[\s\-:|]+\|$/)) return '';
            return match.replace(/\|/g, ' ').trim();
        })
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/__([^_]+)__/g, '$1')
        .replace(/_([^_]+)_/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/^[\s]*[-*+]\s+/gm, '')
        .replace(/^[\s]*\d+\.\s+/gm, '')
        .replace(/^#+\s+/gm, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

function findMarkdownFiles(dir) {
    const files = [];

    function scan(directory) {
        const entries = fs.readdirSync(directory, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(directory, entry.name);

            if (entry.isDirectory()) {
                scan(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
                if (entry.name !== 'README.md' && entry.name !== 'interview.md') {
                    files.push(fullPath);
                }
            }
        }
    }

    scan(dir);
    return files;
}

function build() {
    console.log('📚 Quiz Data Builder 시작...\n');

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const mdFiles = findMarkdownFiles(DOCS_DIR);
    console.log(`📁 발견된 MD 파일: ${mdFiles.length}개\n`);

    let allQuestions = [];
    const categoryStats = {};
    const sectionQuestions = {};

    for (const file of mdFiles) {
        const relativePath = path.relative(DOCS_DIR, file);
        console.log(`  파싱 중: ${relativePath}`);

        const questions = parseMarkdownFile(file);
        allQuestions = allQuestions.concat(questions);

        for (const q of questions) {
            categoryStats[q.categoryName] = (categoryStats[q.categoryName] || 0) + 1;

            if (!sectionQuestions[q.section]) {
                sectionQuestions[q.section] = [];
            }
            sectionQuestions[q.section].push(q);
        }
    }

    console.log(`\n✅ 총 ${allQuestions.length}개 문제 추출 완료\n`);
    console.log('📊 카테고리별 문제 수:');
    for (const [cat, count] of Object.entries(categoryStats).sort((a, b) => b[1] - a[1])) {
        console.log(`  - ${cat}: ${count}개`);
    }

    console.log('\n📁 섹션별 파일 생성:');
    const sectionFiles = [];
    for (const [section, questions] of Object.entries(sectionQuestions)) {
        const sectionFile = path.join(OUTPUT_DIR, `${section}.js`);
        const sectionOutput = `const ${section}Data = ${JSON.stringify(questions, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ${section}Data };
}
`;
        fs.writeFileSync(sectionFile, sectionOutput, 'utf-8');
        sectionFiles.push(section);
        console.log(`  💾 quizData/${section}.js (${questions.length}개 문제)`);
    }

    const categories = Object.keys(categoryStats).map(name => {
        const sample = allQuestions.find(q => q.categoryName === name);
        return {
            id: sample?.category || name.toLowerCase(),
            name: name,
            section: sample?.section || 'etc',
            count: categoryStats[name]
        };
    });

    const indexOutput = `const quizData = [
${sectionFiles.map(s => `    ...${s}Data`).join(',\n')}
];

const categories = ${JSON.stringify(categories, null, 2)};

const sectionNames = ${JSON.stringify(SECTION_NAMES, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { quizData, categories, sectionNames };
}
`;

    fs.writeFileSync(OUTPUT_INDEX, indexOutput, 'utf-8');
    console.log(`\n💾 ${OUTPUT_INDEX} 생성 완료!`);

    console.log(`\n📝 index.html에 추가할 스크립트 태그:`);
    sectionFiles.forEach(s => {
        console.log(`    <script src="quizData/${s}.js"></script>`);
    });
}

build();
