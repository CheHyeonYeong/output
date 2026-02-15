# Computer Architecture (컴퓨터 구조)

> 카테고리: CS 기초 > 컴퓨터 구조
> [← 면접 질문 목록으로 돌아가기](../../interview.md)

---

## 📌 CPU와 명령어 처리

### ARCH-001

CPU의 구조와 주요 구성 요소(ALU, 제어 유닛, 레지스터)에 대해 설명해주세요.

<details>
<summary>답변</summary>

CPU는 컴퓨터의 두뇌로서 세 가지 핵심 구성 요소로 이루어져 있습니다.

**ALU (Arithmetic Logic Unit)**
- 산술 연산(덧셈, 뺄셈 등)과 논리 연산(AND, OR, NOT 등)을 수행
- 비교 연산을 통해 조건 분기 결정에 필요한 플래그 생성

**제어 유닛 (Control Unit)**
- 명령어를 해독하고 실행 순서를 제어
- 다른 구성 요소들에 제어 신호를 전송하여 동작을 조정

**레지스터 (Register)**
- CPU 내부의 초고속 임시 저장 공간
- 프로그램 카운터(PC), 명령어 레지스터(IR), 범용 레지스터 등으로 구분
- 메모리보다 수십 배 빠른 접근 속도 제공

**참고자료**
- [Intel 64 and IA-32 Architectures Software Developer's Manual](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^1]

</details>

[^1]: Intel 공식 프로세서 아키텍처 문서

### ARCH-002
CPU가 하나의 명령어를 처리하는 명령어 사이클(Instruction Cycle)의 단계(Fetch, Decode, Execute)에 대해 설명해주세요.

<details>
<summary>답변</summary>

명령어 사이클은 CPU가 하나의 명령어를 처리하는 과정입니다.

**Fetch (인출)**
- 프로그램 카운터(PC)가 가리키는 메모리 주소에서 명령어를 가져옴
- 명령어를 명령어 레지스터(IR)에 저장
- PC를 다음 명령어 주소로 증가

**Decode (해독)**
- 명령어 레지스터의 명령어를 해석
- 연산 종류, 피연산자, 주소 지정 방식 등을 파악
- 필요한 데이터를 레지스터나 메모리에서 준비

**Execute (실행)**
- ALU에서 실제 연산 수행
- 결과를 레지스터나 메모리에 저장
- 필요시 플래그 레지스터 갱신

**참고자료**
- [Intel 64 and IA-32 Architectures Software Developer's Manual, Vol.1](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^2]

</details>

[^2]: Intel 공식 명령어 사이클 설명

### ARCH-003
CPU 파이프라이닝(Pipelining)이 무엇이고, 어떻게 CPU 성능을 향상시키나요?

<details>
<summary>답변</summary>

파이프라이닝은 명령어 처리 단계를 중첩시켜 동시에 여러 명령어를 처리하는 기법입니다.

**동작 원리**
- 각 명령어 사이클 단계(Fetch, Decode, Execute 등)를 독립적인 스테이지로 분리
- 한 명령어가 다음 단계로 넘어가면, 이전 단계에서 새 명령어 처리 시작
- 세탁기-건조기를 동시에 돌리는 것과 유사

**성능 향상**
- 이상적으로 n단계 파이프라인은 n배 처리량(throughput) 증가
- 단일 명령어 지연 시간(latency)은 동일하지만, 전체 처리량 향상
- 현대 CPU는 14-20단계 이상의 파이프라인 사용

**한계**
- 파이프라인 해저드로 인한 스톨(stall) 발생 가능
- 분기 명령어에서 파이프라인 플러시 발생 가능

**참고자료**
- [Intel Optimization Reference Manual](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^3]

</details>

[^3]: Intel 파이프라인 최적화 가이드

### ARCH-004
CPU 파이프라인 해저드(Pipeline Hazard)의 종류와 해결 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

파이프라인 해저드는 파이프라인의 정상적인 실행을 방해하는 상황입니다.

**구조적 해저드 (Structural Hazard)**
- 하드웨어 자원 충돌 (예: 메모리 동시 접근)
- 해결: 자원 복제, 분리된 명령어/데이터 캐시 사용

**데이터 해저드 (Data Hazard)**
- 명령어 간 데이터 의존성 (RAW, WAR, WAW)
- 해결: 포워딩(Forwarding), 스톨 삽입, 레지스터 리네이밍

**제어 해저드 (Control Hazard)**
- 분기 명령어로 인한 다음 명령어 불확실성
- 해결: 분기 예측, 지연 분기, 투기적 실행

**참고자료**
- [ARM Cortex-A Series Programmer's Guide](https://developer.arm.com/documentation)[^4]

</details>

[^4]: ARM 프로세서 파이프라인 해저드 설명

### ARCH-005
CPU의 분기 예측(Branch Prediction)이 무엇이고 왜 중요한가요?

<details>
<summary>답변</summary>

분기 예측은 조건 분기 명령어의 결과를 미리 예측하여 파이프라인 효율을 높이는 기법입니다.

**중요성**
- 분기 결과를 기다리면 파이프라인이 멈춤 (스톨)
- 현대 CPU는 깊은 파이프라인으로 분기 패널티가 큼 (10-20 사이클)
- 예측 실패 시 파이프라인 플러시 필요

**분기 예측 기법**
- **정적 예측**: 항상 분기/비분기 예측, 또는 backward taken/forward not taken
- **동적 예측**: 과거 분기 이력 기반 (2-bit 카운터, 히스토리 테이블)
- **현대 기법**: 신경망 기반 예측기, TAGE 예측기 등

**성능 영향**
- 현대 CPU의 분기 예측 정확도: 95% 이상
- 루프 최적화, 분기 없는 코드 작성으로 예측 실패 최소화 가능

**참고자료**
- [Intel Optimization Reference Manual - Branch Prediction](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^5]

</details>

[^5]: Intel 분기 예측 최적화 가이드

### ARCH-006
CPU의 Out-of-Order Execution(비순차 실행)이 무엇이고, 어떤 이점이 있나요?

<details>
<summary>답변</summary>

Out-of-Order Execution(OoOE)은 명령어를 프로그램 순서와 다르게 실행하여 성능을 높이는 기법입니다.

**동작 원리**
- 명령어를 디코딩 후 리오더 버퍼(ROB)에 저장
- 피연산자가 준비된 명령어부터 실행 (데이터 흐름 순서)
- 결과는 프로그램 순서대로 커밋하여 정확성 보장

**이점**
- 캐시 미스나 데이터 의존성으로 대기 중에도 다른 명령어 실행
- 파이프라인 유휴 시간 최소화
- IPC(Instructions Per Cycle) 향상

**관련 기술**
- 레지스터 리네이밍: WAR, WAW 해저드 제거
- 투기적 실행: 분기 결과 전에 실행 시작
- 리오더 버퍼: 순서대로 커밋 보장

**참고자료**
- [Intel 64 Architecture - Out-of-Order Execution](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^6]

</details>

[^6]: Intel Out-of-Order 실행 엔진 문서

### ARCH-007

CISC와 RISC 아키텍처의 차이점에 대해 설명해주세요.

<details>
<summary>답변</summary>

CISC와 RISC는 CPU 명령어 집합 설계 철학의 두 가지 접근 방식입니다.

**CISC (Complex Instruction Set Computer)**
- 복잡하고 다양한 명령어 제공
- 하나의 명령어로 여러 작업 수행 가능
- 가변 길이 명령어
- 메모리-레지스터 연산 지원
- 예: x86, x86-64

**RISC (Reduced Instruction Set Computer)**
- 단순하고 적은 수의 명령어
- 각 명령어가 한 사이클에 실행되도록 설계
- 고정 길이 명령어
- 로드/스토어 아키텍처 (메모리 접근은 전용 명령어만)
- 예: ARM, RISC-V, MIPS

**현대적 관점**
- 현대 x86 CPU는 내부적으로 RISC 마이크로 연산으로 변환
- 두 방식의 장점을 결합한 하이브리드 설계가 일반적

**참고자료**
- [ARM Architecture Reference Manual](https://developer.arm.com/documentation)[^7]

</details>

[^7]: ARM RISC 아키텍처 공식 문서

### ARCH-008
x86 아키텍처와 ARM 아키텍처의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

x86과 ARM은 각각 대표적인 CISC와 RISC 아키텍처입니다.

**x86 (Intel/AMD)**
- CISC 기반, 복잡한 명령어 세트
- 높은 단일 스레드 성능
- 전력 소모가 상대적으로 높음
- 데스크톱, 서버 시장 주도
- 후방 호환성 중시

**ARM**
- RISC 기반, 단순한 명령어 세트
- 전력 효율성이 뛰어남 (와트당 성능 우수)
- 모바일, 임베디드 시장 주도
- 최근 서버/데스크톱 진출 (Apple M시리즈, AWS Graviton)
- 라이선스 모델로 다양한 구현 가능

**성능 비교**
- x86: 고성능 컴퓨팅, 레거시 애플리케이션
- ARM: 모바일, IoT, 전력 효율 중요한 서버

**참고자료**
- [ARM Developer Documentation](https://developer.arm.com/documentation)[^8]
- [Intel Architecture Documentation](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^9]

</details>

[^8]: ARM 공식 개발자 문서
[^9]: Intel 아키텍처 공식 문서

---

## 📌 메모리 계층 구조

### ARCH-009

메모리 계층 구조(Memory Hierarchy)에 대해 설명해주세요.

<details>
<summary>답변</summary>

메모리 계층 구조는 속도, 용량, 비용의 트레이드오프를 최적화하기 위한 설계입니다.

**계층 구조 (위에서 아래로)**
1. **레지스터**: CPU 내부, 가장 빠름, 수십 개
2. **L1 캐시**: 코어당 32-64KB, 1-4 사이클
3. **L2 캐시**: 코어당 256KB-1MB, 10-20 사이클
4. **L3 캐시**: 공유, 수 MB-수십 MB, 30-50 사이클
5. **메인 메모리 (RAM)**: GB 단위, 100-300 사이클
6. **보조 기억장치 (SSD/HDD)**: TB 단위, 수만-수백만 사이클

**설계 원칙**
- 상위 계층: 빠르지만 작고 비쌈
- 하위 계층: 느리지만 크고 저렴
- 지역성(locality) 원리를 활용하여 효율적인 데이터 접근

**참고자료**
- [Intel Optimization Manual - Memory Hierarchy](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^10]

</details>

[^10]: Intel 메모리 계층 구조 최적화 문서

### ARCH-010
레지스터, 캐시, 메인 메모리, 보조 기억장치의 속도와 용량을 비교해주세요.

<details>
<summary>답변</summary>

| 구분 | 용량 | 접근 시간 | 대역폭 |
|------|------|-----------|--------|
| 레지스터 | ~1KB | <1ns | - |
| L1 캐시 | 32-64KB | 1-2ns | ~1TB/s |
| L2 캐시 | 256KB-1MB | 3-10ns | ~500GB/s |
| L3 캐시 | 4-64MB | 10-30ns | ~200GB/s |
| RAM (DDR5) | 16-256GB | 50-100ns | ~50GB/s |
| NVMe SSD | 1-8TB | ~100us | ~7GB/s |
| HDD | 1-20TB | ~10ms | ~200MB/s |

**핵심 포인트**
- 각 계층 간 속도 차이는 약 10배 이상
- 레지스터에서 HDD까지 속도 차이는 약 100만 배
- 용량은 반대로 상위에서 하위로 갈수록 증가

**참고자료**
- [Intel Memory Latency Checker](https://www.intel.com/content/www/us/en/developer/articles/tool/intelr-memory-latency-checker.html)[^11]

</details>

[^11]: Intel 메모리 지연 시간 측정 도구

### ARCH-011
캐시 메모리가 왜 필요하고, 어떤 원리로 동작하나요?

<details>
<summary>답변</summary>

캐시 메모리는 CPU와 메인 메모리 간의 속도 차이를 해소하기 위해 필요합니다.

**필요성**
- CPU는 매 사이클마다 데이터가 필요하지만, RAM 접근은 100사이클 이상 소요
- 속도 격차(Memory Wall) 해소를 위한 중간 버퍼 역할
- 자주 사용하는 데이터를 빠르게 접근 가능한 곳에 저장

**동작 원리**
1. CPU가 데이터 요청
2. 캐시에서 먼저 검색 (캐시 히트 시 바로 반환)
3. 캐시 미스 시 메인 메모리에서 가져와 캐시에 저장
4. 캐시 라인 단위(64바이트)로 데이터 이동

**효율성의 핵심**
- 지역성(Locality) 원리 활용
- 히트율 90% 이상 달성 시 평균 접근 시간 크게 감소

**참고자료**
- [Intel 64 and IA-32 Architectures Optimization Reference Manual](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^12]

</details>

[^12]: Intel 캐시 최적화 가이드

### ARCH-012
캐시 메모리에서 활용하는 지역성(Locality) 원리에 대해 설명해주세요.

<details>
<summary>답변</summary>

지역성 원리는 프로그램이 특정 시간에 특정 메모리 영역에 집중적으로 접근하는 경향입니다.

**시간 지역성 (Temporal Locality)**
- 최근 접근한 데이터는 다시 접근할 가능성이 높음
- 예: 루프 변수, 자주 호출되는 함수

**공간 지역성 (Spatial Locality)**
- 접근한 데이터 주변의 데이터도 곧 접근할 가능성이 높음
- 예: 배열 순차 접근, 구조체 멤버 접근

**캐시 설계에의 적용**
- 시간 지역성: 최근 사용 데이터를 캐시에 유지 (LRU 교체 정책)
- 공간 지역성: 캐시 라인 단위(64바이트)로 데이터 로드

**프로그래밍 시 활용**
- 배열을 행 우선 순서로 접근
- 관련 데이터를 메모리상 가깝게 배치
- 루프 내 데이터 재사용 극대화

**참고자료**
- [Intel Optimization Manual - Data Access Optimization](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^13]

</details>

[^13]: Intel 데이터 접근 최적화 문서

### ARCH-013
시간 지역성(Temporal Locality)과 공간 지역성(Spatial Locality)의 차이는 무엇인가요?

<details>
<summary>답변</summary>

**시간 지역성 (Temporal Locality)**
- **정의**: 한 번 접근한 데이터는 가까운 미래에 다시 접근할 가능성이 높음
- **예시**:
  - 루프 카운터 변수 `i`
  - 자주 호출되는 함수의 코드
  - 전역 설정 변수
- **캐시 활용**: 최근 사용 데이터를 캐시에 유지

**공간 지역성 (Spatial Locality)**
- **정의**: 접근한 메모리 주소 근처의 데이터도 곧 접근할 가능성이 높음
- **예시**:
  - 배열 순차 순회: `arr[0], arr[1], arr[2]...`
  - 구조체 멤버 연속 접근
  - 순차적 명령어 실행
- **캐시 활용**: 캐시 라인 단위로 인접 데이터 함께 로드

**비교**
| 구분 | 시간 지역성 | 공간 지역성 |
|------|-------------|-------------|
| 관점 | 시간적 재사용 | 공간적 인접성 |
| 캐시 정책 | 교체 알고리즘 (LRU) | 캐시 라인 크기 |

**참고자료**
- [ARM Cortex-A Programmer's Guide - Cache](https://developer.arm.com/documentation)[^14]

</details>

[^14]: ARM 캐시 지역성 설명

### ARCH-014

캐시 라인(Cache Line)이 무엇이고, 크기가 성능에 어떤 영향을 미치나요?

<details>
<summary>답변</summary>

캐시 라인은 캐시와 메인 메모리 간 데이터 전송의 최소 단위입니다.

**캐시 라인 특성**
- 일반적인 크기: 64바이트 (x86, ARM)
- 메모리 주소는 캐시 라인 경계에 정렬
- 1바이트만 필요해도 전체 캐시 라인 로드

**크기가 성능에 미치는 영향**

**큰 캐시 라인**
- 장점: 공간 지역성 활용 극대화, 순차 접근에 유리
- 단점: 메모리 대역폭 낭비 (불필요한 데이터 로드), False Sharing 증가

**작은 캐시 라인**
- 장점: 메모리 대역폭 효율적 사용
- 단점: 공간 지역성 활용 감소, 태그 오버헤드 증가

**프로그래밍 고려사항**
- 자주 함께 사용하는 데이터는 같은 캐시 라인에 배치
- 멀티스레드에서 독립 데이터는 다른 캐시 라인에 배치 (False Sharing 방지)

**참고자료**
- [Intel 64 and IA-32 Architectures Optimization Reference Manual](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^15]

</details>

[^15]: Intel 캐시 라인 최적화 문서

### ARCH-015

캐시 히트(Cache Hit)와 캐시 미스(Cache Miss)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**캐시 히트 (Cache Hit)**
- CPU가 요청한 데이터가 캐시에 존재하는 경우
- 빠른 응답 (L1: 1-4 사이클)
- 히트율 = 히트 횟수 / 전체 접근 횟수

**캐시 미스 (Cache Miss)**
- 요청한 데이터가 캐시에 없는 경우
- 하위 메모리 계층에서 데이터를 가져와야 함
- 성능 저하 원인

**캐시 미스의 종류 (3C)**
1. **Compulsory Miss (필수 미스)**: 최초 접근 시 발생, 피할 수 없음
2. **Capacity Miss (용량 미스)**: 캐시 용량 부족으로 발생
3. **Conflict Miss (충돌 미스)**: 같은 캐시 세트에 매핑되어 발생

**평균 메모리 접근 시간**
```
AMAT = 히트 시간 + (미스율 x 미스 패널티)
```

**참고자료**
- [Intel Optimization Manual - Cache Optimization](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^16]

</details>

[^16]: Intel 캐시 미스 분석 문서

### ARCH-016

캐시 매핑 방식(Direct Mapped, Fully Associative, Set Associative)의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

캐시 매핑 방식은 메모리 주소를 캐시 위치에 대응시키는 방법입니다.

**Direct Mapped (직접 매핑)**
- 각 메모리 블록이 하나의 캐시 라인에만 매핑
- 장점: 하드웨어 구현 단순, 빠른 검색
- 단점: 충돌 미스 빈번 발생

**Fully Associative (완전 연관)**
- 메모리 블록이 어떤 캐시 라인에도 저장 가능
- 장점: 충돌 미스 최소화
- 단점: 모든 라인 검색 필요, 하드웨어 복잡

**Set Associative (세트 연관)**
- n-way: 캐시를 세트로 나누고, 각 세트 내 n개 라인 중 선택
- Direct Mapped와 Fully Associative의 절충안
- 현대 CPU에서 가장 많이 사용 (8-way, 16-way 등)

| 방식 | 검색 복잡도 | 충돌 미스 | 사용 예 |
|------|-------------|-----------|---------|
| Direct | O(1) | 많음 | 초기 캐시 |
| Fully | O(n) | 적음 | TLB |
| Set Assoc | O(k) | 중간 | L1, L2, L3 |

**참고자료**
- [ARM Cache Organization](https://developer.arm.com/documentation)[^17]

</details>

[^17]: ARM 캐시 구조 공식 문서

### ARCH-017

캐시 교체 정책(LRU, LFU, FIFO 등)에 대해 설명해주세요.

<details>
<summary>답변</summary>

캐시가 가득 찼을 때 어떤 데이터를 제거할지 결정하는 정책입니다.

**LRU (Least Recently Used)**
- 가장 오래전에 사용된 데이터를 교체
- 시간 지역성 활용에 효과적
- 구현 복잡도가 높아 의사 LRU(Pseudo-LRU) 사용
- 현대 CPU에서 가장 많이 사용

**LFU (Least Frequently Used)**
- 사용 빈도가 가장 낮은 데이터를 교체
- 장기적 패턴 반영
- 최근 로드된 데이터가 불리함

**FIFO (First In First Out)**
- 가장 먼저 들어온 데이터를 교체
- 구현이 단순
- 지역성을 고려하지 않아 성능 낮음

**Random**
- 무작위로 교체 대상 선택
- 구현 매우 단순
- 평균적으로 합리적인 성능

**참고자료**
- [Intel Optimization Manual - Cache Replacement](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^18]

</details>

[^18]: Intel 캐시 교체 정책 문서

### ARCH-018

Write-Through와 Write-Back 캐시 쓰기 정책의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

캐시 쓰기 정책은 데이터 수정 시 메모리 갱신 시점을 결정합니다.

**Write-Through**
- 캐시와 메모리를 동시에 갱신
- 장점: 데이터 일관성 유지 쉬움, 간단한 구현
- 단점: 매 쓰기마다 메모리 접근으로 느림
- 사용: Write Buffer로 지연 시간 완화

**Write-Back**
- 캐시만 갱신, 메모리는 나중에 갱신 (캐시 라인 교체 시)
- Dirty bit로 수정 여부 표시
- 장점: 쓰기 성능 우수, 메모리 대역폭 절약
- 단점: 일관성 관리 복잡, 캐시 미스 시 추가 쓰기 필요
- 현대 CPU의 대부분 캐시에서 사용

**Write Miss 정책**
- **Write-Allocate**: 미스 시 캐시 라인 할당 후 쓰기
- **No-Write-Allocate**: 미스 시 메모리에 직접 쓰기

일반적 조합: Write-Back + Write-Allocate

**참고자료**
- [ARM Cortex-A Cache Policies](https://developer.arm.com/documentation)[^19]

</details>

[^19]: ARM 캐시 쓰기 정책 문서

### ARCH-019

L1, L2, L3 캐시의 차이점과 각각의 역할에 대해 설명해주세요.

<details>
<summary>답변</summary>

멀티레벨 캐시는 속도와 용량의 균형을 맞추기 위한 계층 구조입니다.

**L1 캐시**
- 가장 빠름 (1-4 사이클)
- 코어당 32-64KB
- 명령어(I-Cache)와 데이터(D-Cache) 분리
- 히트율 최우선, 지연 시간 최소화

**L2 캐시**
- 중간 속도 (10-20 사이클)
- 코어당 256KB-1MB
- 통합 캐시 (명령어 + 데이터)
- L1 미스 백업

**L3 캐시 (LLC: Last Level Cache)**
- 가장 느리지만 가장 큼 (30-50 사이클)
- 전체 코어 공유, 4-64MB
- 멀티코어 간 데이터 공유 지원
- 메인 메모리 접근 최소화

**포함 관계**
- **Inclusive**: 상위 캐시가 하위 캐시 내용 포함
- **Exclusive**: 각 레벨에 데이터가 한 번만 존재
- **Non-inclusive**: 혼합 방식

**참고자료**
- [Intel Cache Architecture](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^20]

</details>

[^20]: Intel 멀티레벨 캐시 아키텍처 문서

### ARCH-020

캐시 일관성(Cache Coherence) 문제와 해결 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

캐시 일관성은 멀티코어 시스템에서 각 코어의 캐시가 동일한 데이터의 일관된 뷰를 유지하는 것입니다.

**문제 상황**
- 코어 A가 데이터 X를 수정 (A의 캐시에만 반영)
- 코어 B가 같은 데이터 X 읽기 시 구버전 데이터 참조
- 데이터 불일치로 프로그램 오류 발생

**해결 방법: 스누핑 프로토콜**
- 각 캐시가 버스를 모니터링 (스누핑)
- 다른 코어의 메모리 요청 감지 시 자신의 캐시 상태 갱신

**MESI 프로토콜**
- **Modified**: 수정됨, 유일한 복사본
- **Exclusive**: 배타적, 수정되지 않음
- **Shared**: 공유됨, 여러 캐시에 존재
- **Invalid**: 무효, 사용 불가

**디렉토리 기반 프로토콜**
- 대규모 시스템에서 사용
- 중앙 디렉토리가 캐시 상태 추적
- NUMA 시스템에서 효과적

**참고자료**
- [Intel MESI Protocol](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^21]

</details>

[^21]: Intel 캐시 일관성 프로토콜 문서

---

## 📌 메모리 관리

### ARCH-021

가상 메모리(Virtual Memory)가 무엇이고 왜 필요한가요?

<details>
<summary>답변</summary>

가상 메모리는 물리 메모리를 추상화하여 각 프로세스에 독립적인 주소 공간을 제공하는 기법입니다.

**필요성**
- **메모리 보호**: 프로세스 간 메모리 침범 방지
- **메모리 확장**: 물리 RAM보다 큰 프로그램 실행 가능
- **메모리 관리 단순화**: 연속적인 가상 주소 공간 제공
- **공유 메모리**: 같은 물리 페이지를 여러 프로세스가 공유

**동작 원리**
1. 프로세스는 가상 주소 사용
2. MMU(Memory Management Unit)가 가상 주소를 물리 주소로 변환
3. 필요한 페이지가 메모리에 없으면 디스크에서 로드 (페이지 폴트)

**장점**
- 프로세스 격리 및 보안 강화
- 효율적인 물리 메모리 사용
- 프로그래밍 모델 단순화

**참고자료**
- [Intel 64 and IA-32 Architectures - Paging](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^22]

</details>

[^22]: Intel 가상 메모리 및 페이징 문서

### ARCH-022
물리 주소(Physical Address)와 논리 주소(Logical Address, 가상 주소)의 차이는 무엇인가요?

<details>
<summary>답변</summary>

**논리 주소 (가상 주소)**
- 프로세스가 사용하는 주소
- 프로세스마다 독립적인 주소 공간 (0부터 시작)
- 컴파일/링크 시점에 결정
- CPU가 생성하는 주소

**물리 주소**
- 실제 메모리(RAM)의 위치
- 시스템 전체에서 유일
- 메모리 버스에서 사용되는 실제 주소

**변환 과정**
```
논리 주소 → MMU (페이지 테이블) → 물리 주소
```

**변환 방법**
- 논리 주소 = 페이지 번호 + 페이지 오프셋
- 페이지 테이블에서 페이지 번호로 프레임 번호 조회
- 물리 주소 = 프레임 번호 + 페이지 오프셋

**장점**
- 프로세스 격리 (서로의 메모리 접근 불가)
- 유연한 메모리 할당
- 메모리 보호 구현 가능

**참고자료**
- [ARM Memory Management](https://developer.arm.com/documentation)[^23]

</details>

[^23]: ARM 메모리 관리 유닛 문서

### ARCH-023
가상 메모리에서 사용하는 페이지 테이블(Page Table)의 역할과 구조에 대해 설명해주세요.

<details>
<summary>답변</summary>

페이지 테이블은 가상 주소를 물리 주소로 변환하는 매핑 테이블입니다.

**역할**
- 가상 페이지 번호 → 물리 프레임 번호 매핑
- 페이지별 접근 권한 관리 (읽기/쓰기/실행)
- 페이지 존재 여부 표시 (Present bit)

**페이지 테이블 엔트리(PTE) 구조**
- 프레임 번호 (물리 주소)
- Present/Valid bit: 메모리에 존재 여부
- Dirty bit: 수정 여부
- Accessed bit: 접근 여부 (LRU용)
- Permission bits: R/W/X 권한

**계층적 페이지 테이블 (x86-64)**
- 4단계: PML4 → PDPT → PD → PT
- 페이지 크기: 4KB (기본), 2MB, 1GB (Huge Page)
- 희소 주소 공간에서 메모리 절약

**참고자료**
- [Intel 64 Page Tables](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^24]

</details>

[^24]: Intel 페이지 테이블 구조 문서

### ARCH-024
TLB(Translation Lookaside Buffer)가 무엇이고 왜 필요한가요?

<details>
<summary>답변</summary>

TLB는 최근 사용된 페이지 테이블 엔트리를 캐싱하는 하드웨어 캐시입니다.

**필요성**
- 페이지 테이블 조회는 메모리 접근 필요 (4단계 = 4번 접근)
- 매 메모리 접근마다 변환 필요 → 심각한 성능 저하
- TLB로 주소 변환을 고속화

**특성**
- CPU 내부에 위치, 매우 빠른 접근 (1 사이클)
- 작은 크기 (64-1024 엔트리)
- Fully Associative 또는 고연관도 구조
- ITLB(명령어용), DTLB(데이터용) 분리

**TLB 미스 처리**
1. 하드웨어가 페이지 테이블 워크 수행
2. 해당 PTE를 TLB에 로드
3. 페이지 폴트 시 OS 개입

**TLB 플러시**
- 컨텍스트 스위칭 시 발생 가능
- ASID(Address Space ID)로 프로세스 구분하여 플러시 최소화

**참고자료**
- [ARM TLB Architecture](https://developer.arm.com/documentation)[^25]

</details>

[^25]: ARM TLB 아키텍처 문서

### ARCH-025
페이지 폴트(Page Fault)가 무엇이고, 발생 시 처리 과정을 설명해주세요.

<details>
<summary>답변</summary>

페이지 폴트는 접근하려는 페이지가 물리 메모리에 없을 때 발생하는 예외입니다.

**처리 과정**
1. **예외 발생**: MMU가 페이지 테이블에서 Present bit = 0 확인
2. **CPU 상태 저장**: 현재 실행 상태를 스택에 저장
3. **OS 핸들러 호출**: 페이지 폴트 핸들러 실행
4. **주소 유효성 검사**: 유효한 접근인지 확인 (아니면 Segmentation Fault)
5. **페이지 로드**: 디스크(스왑)에서 페이지를 메모리로 로드
6. **프레임 할당**: 빈 프레임이 없으면 페이지 교체 수행
7. **페이지 테이블 갱신**: 새 매핑 정보 기록
8. **명령어 재실행**: 폴트 발생 명령어부터 재개

**페이지 폴트 종류**
- **Minor**: 페이지가 메모리에 있지만 매핑만 없음 (빠름)
- **Major**: 디스크에서 로드 필요 (느림, 수 ms)

**참고자료**
- [Intel Exception Handling - Page Fault](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^26]

</details>

[^26]: Intel 페이지 폴트 예외 처리 문서

### ARCH-026

메모리 단편화(Fragmentation)의 종류와 해결 방법은 무엇인가요?

<details>
<summary>답변</summary>

메모리 단편화는 사용 가능한 메모리가 있지만 할당할 수 없는 상태입니다.

**외부 단편화 (External Fragmentation)**
- 할당된 메모리 사이에 작은 빈 공간들이 흩어져 있음
- 총 빈 공간은 충분하지만 연속 공간 부족으로 할당 실패
- 해결 방법:
  - **압축(Compaction)**: 메모리 재배치 (비용 큼)
  - **페이징**: 연속 할당 불필요

**내부 단편화 (Internal Fragmentation)**
- 할당된 메모리 블록 내부의 사용되지 않는 공간
- 고정 크기 블록/페이지 할당에서 발생
- 해결 방법:
  - 다양한 크기의 블록 사용
  - 슬랩 할당자(Slab Allocator) 사용
  - 객체 풀(Object Pool) 패턴

**페이징의 장점**
- 물리 메모리를 고정 크기 프레임으로 관리
- 외부 단편화 완전 해결
- 내부 단편화는 마지막 페이지에서만 발생

**참고자료**
- [Linux Memory Management](https://www.kernel.org/doc/html/latest/admin-guide/mm/)[^27]

</details>

[^27]: Linux 커널 메모리 관리 문서

### ARCH-027

DMA(Direct Memory Access)가 무엇이고 어떤 장점이 있나요?

<details>
<summary>답변</summary>

DMA는 CPU 개입 없이 I/O 장치와 메모리 간 직접 데이터 전송을 수행하는 기술입니다.

**동작 원리**
1. CPU가 DMA 컨트롤러에 전송 정보 설정 (소스, 목적지, 크기)
2. DMA 컨트롤러가 버스 제어권 획득
3. 데이터 전송 수행 (CPU 무관)
4. 전송 완료 시 인터럽트로 CPU에 알림

**장점**
- **CPU 부하 감소**: 데이터 전송 중 CPU가 다른 작업 가능
- **높은 전송 속도**: CPU를 거치지 않아 오버헤드 감소
- **효율적 대용량 전송**: 디스크, 네트워크 I/O에 필수

**DMA 전송 모드**
- **Burst Mode**: 전체 블록을 한 번에 전송
- **Cycle Stealing**: 한 번에 한 워드씩 전송, CPU와 버스 공유
- **Transparent**: CPU가 버스 미사용 시에만 전송

**사용 예**
- 디스크 I/O, NVMe SSD
- 네트워크 카드 (NIC)
- GPU 메모리 전송

**참고자료**
- [Intel DMA Remapping Architecture](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^28]

</details>

[^28]: Intel DMA 리매핑 아키텍처 문서

### ARCH-028

메모리 버스(Memory Bus)와 대역폭(Bandwidth)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**메모리 버스**
- CPU와 메인 메모리를 연결하는 통신 경로
- 주소 버스, 데이터 버스, 제어 버스로 구성
- 현대 시스템: 메모리 컨트롤러가 CPU 내장

**메모리 대역폭**
- 단위 시간당 전송 가능한 데이터량 (GB/s)
- 계산: 버스 폭 x 클럭 x 채널 수 x 전송률

**DDR 메모리 대역폭 예시**
- DDR4-3200: 25.6 GB/s (단일 채널)
- DDR5-4800: 38.4 GB/s (단일 채널)
- 듀얼 채널 시 2배

**대역폭 영향 요소**
- **버스 폭**: 64비트 (채널당)
- **클럭 속도**: MHz 단위
- **채널 수**: 듀얼, 쿼드, 옥타 채널
- **DDR 배수**: DDR = 2배, DDR5 = 추가 버스트

**성능 고려사항**
- 메모리 집약적 작업: 대역폭이 병목
- 캐시 효율 높이면 대역폭 의존도 감소
- NUMA에서는 로컬 메모리 접근이 중요

**참고자료**
- [Intel Memory Bandwidth Analysis](https://www.intel.com/content/www/us/en/developer/articles/tool/intelr-memory-latency-checker.html)[^29]

</details>

[^29]: Intel 메모리 대역폭 분석 도구

---

## 📌 병렬 처리와 멀티코어

### ARCH-029

멀티코어 프로세서가 무엇이고, 싱글코어와 비교했을 때 어떤 장점이 있나요?

<details>
<summary>답변</summary>

멀티코어 프로세서는 하나의 CPU 칩에 여러 개의 독립적인 처리 코어를 통합한 것입니다.

**멀티코어 구조**
- 각 코어는 독립적인 ALU, 제어 유닛, L1/L2 캐시 보유
- L3 캐시는 코어 간 공유
- 메모리 컨트롤러 공유

**싱글코어 대비 장점**
- **병렬 처리**: 여러 스레드/프로세스 동시 실행
- **전력 효율**: 클럭 높이기보다 코어 추가가 효율적
- **응답성**: 한 코어가 바빠도 다른 코어가 응답 가능
- **처리량**: 전체 시스템 throughput 증가

**한계**
- 암달의 법칙: 순차 부분이 병렬화 이점 제한
- 캐시 일관성 오버헤드
- 소프트웨어 병렬화 필요

**현대 서버 CPU**
- AMD EPYC: 최대 128 코어
- Intel Xeon: 최대 60 코어
- ARM Ampere: 최대 128 코어

**참고자료**
- [Intel Multi-Core Architecture](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^30]

</details>

[^30]: Intel 멀티코어 아키텍처 문서

### ARCH-030
하이퍼스레딩(Hyper-Threading, SMT)이 무엇인가요?

<details>
<summary>답변</summary>

하이퍼스레딩(HT)은 Intel의 SMT(Simultaneous Multi-Threading) 구현으로, 하나의 물리 코어가 두 개의 논리 코어처럼 동작하는 기술입니다.

**동작 원리**
- 각 코어에 2세트의 아키텍처 상태(레지스터, PC 등) 유지
- 실행 유닛(ALU, FPU 등)은 공유
- 한 스레드가 대기 중일 때 다른 스레드가 실행 유닛 활용

**장점**
- 파이프라인 유휴 시간 감소
- 캐시 미스, 분기 실패 시 다른 스레드 실행
- 추가 실리콘 면적 5% 미만으로 성능 15-30% 향상

**단점**
- 캐시, 대역폭, 실행 유닛 경쟁
- 일부 워크로드에서 성능 저하 가능
- 보안 취약점 (사이드 채널 공격)

**사용 시 고려사항**
- CPU 바운드 작업: 효과 제한적
- I/O 바운드, 메모리 바운드: 효과적
- 보안 민감 환경에서는 비활성화 고려

**참고자료**
- [Intel Hyper-Threading Technology](https://www.intel.com/content/www/us/en/architecture-and-technology/hyper-threading/hyper-threading-technology.html)[^31]

</details>

[^31]: Intel 하이퍼스레딩 공식 문서

### ARCH-031
병렬 처리(Parallel Processing)와 동시성(Concurrency)의 차이는 무엇인가요?

<details>
<summary>답변</summary>

**동시성 (Concurrency)**
- 여러 작업을 번갈아가며 처리하는 **논리적** 개념
- 단일 코어에서도 구현 가능 (시분할)
- 작업들이 겹치는 시간대에 진행 중
- 예: 싱글 코어에서 멀티태스킹

**병렬 처리 (Parallelism)**
- 여러 작업을 동시에 실행하는 **물리적** 개념
- 멀티코어/멀티프로세서 필요
- 실제로 같은 순간에 여러 작업 실행
- 예: 4코어 CPU에서 4개 스레드 동시 실행

**비유**
- 동시성: 한 요리사가 여러 요리를 번갈아 조리
- 병렬 처리: 여러 요리사가 각자 요리를 동시에 조리

**관계**
- 병렬 처리는 동시성의 부분집합
- 동시성 프로그램이 멀티코어에서 병렬 실행될 수 있음
- 동시성 = 구조(Structure), 병렬성 = 실행(Execution)

**참고자료**
- [Go Concurrency Patterns](https://go.dev/blog/pipelines)[^32]

</details>

[^32]: Go 동시성 패턴 - 동시성과 병렬성 구분 설명

### ARCH-032

대칭형 멀티프로세싱(SMP)과 비대칭형 멀티프로세싱(AMP)의 차이는 무엇인가요?

<details>
<summary>답변</summary>

**SMP (Symmetric Multi-Processing)**
- 모든 프로세서가 동등한 역할
- 어떤 CPU도 모든 작업 실행 가능
- 단일 OS가 모든 CPU 관리
- 메모리, I/O 자원 공유
- 현대 서버, PC의 표준 방식

**AMP (Asymmetric Multi-Processing)**
- 프로세서마다 다른 역할 할당
- 마스터-슬레이브 구조 (마스터가 작업 분배)
- 특정 CPU가 특정 작업 전담
- 예: 하나는 OS, 다른 하나는 I/O 처리

**비교**
| 특성 | SMP | AMP |
|------|-----|-----|
| 로드 밸런싱 | 자동 (OS 스케줄러) | 수동 설계 필요 |
| 유연성 | 높음 | 낮음 |
| 복잡성 | OS 복잡 | 하드웨어/소프트웨어 단순 |
| 사용 예 | 범용 서버, PC | 임베디드, 실시간 시스템 |

**현대 하이브리드**
- big.LITTLE (ARM): 고성능 + 저전력 코어 조합
- P-core + E-core (Intel): 성능 + 효율 코어 조합

**참고자료**
- [ARM big.LITTLE Technology](https://developer.arm.com/documentation)[^33]

</details>

[^33]: ARM big.LITTLE 하이브리드 멀티프로세싱

### ARCH-033
캐시 일관성 프로토콜(MESI, MOESI 등)에 대해 설명해주세요.

<details>
<summary>답변</summary>

캐시 일관성 프로토콜은 멀티코어 시스템에서 각 캐시의 데이터 일관성을 유지합니다.

**MESI 프로토콜 (Intel)**
- **Modified**: 수정됨, 유일한 복사본, 메모리와 불일치
- **Exclusive**: 배타적, 유일한 복사본, 메모리와 일치
- **Shared**: 공유됨, 여러 캐시에 존재, 읽기 전용
- **Invalid**: 무효, 사용 불가

**상태 전이 예시**
- 읽기 미스: Invalid → Shared/Exclusive
- 쓰기 미스: Invalid → Modified (다른 캐시 무효화)
- 다른 코어 쓰기 감지: Shared → Invalid

**MOESI 프로토콜 (AMD)**
- MESI + **Owned** 상태 추가
- Owned: 수정됨, 공유 가능, 메모리 쓰기 책임
- 더티 데이터를 캐시 간 직접 전달 가능

**MESIF 프로토콜 (Intel QPI)**
- MESI + **Forward** 상태 추가
- 공유 데이터 요청에 응답하는 캐시 지정
- 다중 응답 방지로 효율성 향상

**참고자료**
- [Intel Cache Coherence](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^34]

</details>

[^34]: Intel 캐시 일관성 프로토콜 문서

### ARCH-034
멀티코어 환경에서 False Sharing이 무엇이고, 어떻게 성능에 영향을 미치나요?

<details>
<summary>답변</summary>

False Sharing은 서로 다른 데이터가 같은 캐시 라인에 있어 불필요한 캐시 무효화가 발생하는 현상입니다.

**발생 상황**
```c
struct Counter {
    int count_a;  // 스레드 A 사용
    int count_b;  // 스레드 B 사용
};
```
- count_a와 count_b가 같은 64바이트 캐시 라인에 위치
- 스레드 A가 count_a 수정 → 스레드 B의 캐시 라인 무효화
- 스레드 B가 count_b 수정 → 스레드 A의 캐시 라인 무효화
- 실제 공유 데이터가 아닌데 캐시 무효화 발생

**성능 영향**
- 캐시 라인 핑퐁 (코어 간 계속 전송)
- 심각한 성능 저하 (10-100배 느려질 수 있음)
- 멀티스레드 확장성 저해

**해결 방법**
- 캐시 라인 크기로 패딩 추가 (64바이트)
- `alignas(64)` 또는 `__cacheline_aligned` 사용
- 스레드별 독립 데이터 구조 분리

**참고자료**
- [Intel Avoiding False Sharing](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^35]

</details>

[^35]: Intel False Sharing 방지 가이드

### ARCH-035

NUMA(Non-Uniform Memory Access) 아키텍처에 대해 설명해주세요.

<details>
<summary>답변</summary>

NUMA는 메모리 접근 시간이 메모리 위치에 따라 달라지는 멀티프로세서 아키텍처입니다.

**구조**
- 시스템을 여러 노드로 분할
- 각 노드: CPU + 로컬 메모리
- 인터커넥트로 노드 간 연결 (QPI, Infinity Fabric)

**메모리 접근**
- **로컬 메모리**: 빠름 (같은 노드)
- **원격 메모리**: 느림 (다른 노드, 1.5-2배 지연)

**SMP vs NUMA**
- SMP(UMA): 모든 메모리 접근 시간 동일
- NUMA: 메모리 위치에 따라 접근 시간 다름

**성능 최적화**
- 데이터와 처리 스레드를 같은 노드에 배치
- `numactl`, `libnuma`로 메모리 정책 설정
- NUMA-aware 메모리 할당자 사용

**사용 환경**
- 대규모 서버 (2소켓 이상)
- 고성능 컴퓨팅
- 대용량 메모리 시스템

**참고자료**
- [Intel NUMA Architecture](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^36]

</details>

[^36]: Intel NUMA 아키텍처 문서

---

## 📌 입출력 시스템

### ARCH-036

I/O 처리 방식(Programmed I/O, Interrupt-driven I/O, DMA)의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**Programmed I/O (폴링)**
- CPU가 I/O 장치 상태를 계속 확인 (폴링)
- CPU가 직접 데이터 전송
- 단점: CPU 시간 낭비, 비효율적
- 용도: 단순한 임베디드 시스템

**Interrupt-driven I/O**
- I/O 장치가 준비되면 인터럽트 발생
- CPU는 인터럽트 발생 전까지 다른 작업 수행
- 데이터 전송은 여전히 CPU가 수행
- 폴링보다 효율적이지만 대용량에는 부적합

**DMA (Direct Memory Access)**
- DMA 컨트롤러가 메모리-I/O 장치 간 직접 전송
- CPU는 전송 시작/완료만 관여
- 전송 완료 시 인터럽트로 통보
- 대용량 데이터 전송에 최적

**비교**
| 방식 | CPU 사용률 | 적합한 용도 |
|------|-----------|-------------|
| Programmed I/O | 매우 높음 | 간단한 I/O |
| Interrupt I/O | 중간 | 소량 데이터 |
| DMA | 낮음 | 대용량 전송 |

**참고자료**
- [Intel I/O Architecture](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^37]

</details>

[^37]: Intel I/O 아키텍처 문서

### ARCH-037
인터럽트(Interrupt)의 동작 원리와 종류에 대해 설명해주세요.

<details>
<summary>답변</summary>

인터럽트는 CPU의 정상 실행 흐름을 중단하고 특정 이벤트를 처리하는 메커니즘입니다.

**동작 원리**
1. 인터럽트 발생 (하드웨어/소프트웨어)
2. 현재 명령어 완료 후 CPU 상태 저장
3. 인터럽트 벡터 테이블에서 핸들러 주소 조회
4. 인터럽트 서비스 루틴(ISR) 실행
5. 저장된 상태 복원 후 원래 작업 재개

**종류**

**하드웨어 인터럽트**
- 외부 장치가 발생 (키보드, 네트워크, 디스크 등)
- 마스커블(Maskable): 비활성화 가능
- 논마스커블(NMI): 비활성화 불가 (치명적 오류)

**소프트웨어 인터럽트 (트랩)**
- 프로그램이 의도적으로 발생 (시스템 콜)
- 예외(Exception): 오류 상황 (0으로 나누기, 페이지 폴트)

**인터럽트 우선순위**
- APIC(Advanced PIC)로 우선순위 관리
- 높은 우선순위 인터럽트가 낮은 것을 선점 가능

**참고자료**
- [Intel Interrupt and Exception Handling](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^38]

</details>

[^38]: Intel 인터럽트 및 예외 처리 문서

### ARCH-038
I/O 처리에서 폴링(Polling) 방식과 인터럽트(Interrupt) 방식의 장단점을 비교해주세요.

<details>
<summary>답변</summary>

**폴링 (Polling)**
- CPU가 주기적으로 장치 상태 확인

| 장점 | 단점 |
|------|------|
| 구현 단순 | CPU 시간 낭비 |
| 예측 가능한 지연 시간 | 이벤트 빈도 낮으면 비효율 |
| 인터럽트 오버헤드 없음 | 다른 작업 블로킹 |
| 실시간 시스템에 유리 | 확장성 낮음 |

**인터럽트 (Interrupt)**
- 장치가 이벤트 발생 시 CPU에 알림

| 장점 | 단점 |
|------|------|
| CPU 효율적 사용 | 컨텍스트 스위칭 오버헤드 |
| 빠른 응답 가능 | 구현 복잡 |
| 여러 장치 동시 처리 | 인터럽트 폭주 가능 |
| 확장성 좋음 | 우선순위 관리 필요 |

**적합한 사용 상황**
- **폴링**: 이벤트 빈번, 짧은 대기, 실시간 제약
- **인터럽트**: 이벤트 드묾, 긴 대기, 범용 시스템

**현대적 접근: 하이브리드**
- NAPI (Linux 네트워크): 인터럽트로 시작, 폴링으로 처리

**참고자료**
- [Linux NAPI - Interrupt Coalescing](https://www.kernel.org/doc/html/latest/networking/napi.html)[^39]

</details>

[^39]: Linux 네트워크 인터럽트/폴링 하이브리드

### ARCH-039

I/O 버퍼링(Buffering)이 무엇이고 왜 사용하나요?

<details>
<summary>답변</summary>

I/O 버퍼링은 데이터 전송 시 중간 저장 공간(버퍼)을 사용하는 기법입니다.

**사용 이유**
- **속도 차이 해소**: 빠른 CPU와 느린 I/O 장치 간 속도 차이 완화
- **데이터 단위 불일치**: 바이트 단위 vs 블록 단위 전송
- **프로세스-장치 비동기화**: 프로세스가 I/O 완료를 기다리지 않아도 됨

**버퍼링 종류**
- **Single Buffering**: 버퍼 1개, 입출력 중 프로세스 대기
- **Double Buffering**: 버퍼 2개, 하나 사용 중 다른 하나 채움
- **Circular Buffering**: 다중 버퍼를 순환 사용

**버퍼링 vs 캐싱**
- 버퍼링: 데이터 임시 저장, 전송 후 삭제
- 캐싱: 재사용을 위해 데이터 유지

**예시**
- 디스크 I/O: 블록 단위로 버퍼링
- 네트워크: TCP 소켓 버퍼
- 키보드: 라인 버퍼링

**참고자료**
- [Linux Kernel I/O Buffering](https://www.kernel.org/doc/html/latest/)[^40]

</details>

[^40]: Linux 커널 I/O 버퍼링 문서

### ARCH-040

메모리 맵 I/O(Memory-Mapped I/O)와 포트 맵 I/O(Port-Mapped I/O)의 차이는 무엇인가요?

<details>
<summary>답변</summary>

**Memory-Mapped I/O (MMIO)**
- I/O 장치 레지스터를 메모리 주소 공간에 매핑
- 일반 메모리 접근 명령어로 I/O 수행 (MOV, LOAD, STORE)
- 장치 접근이 메모리 접근과 동일
- 현대 시스템의 주요 방식

**Port-Mapped I/O (PMIO)**
- I/O 장치를 별도의 I/O 주소 공간에 배치
- 전용 명령어 사용 (x86: IN, OUT)
- 메모리와 I/O 주소 공간 분리
- x86 레거시 장치에서 사용

**비교**
| 특성 | Memory-Mapped | Port-Mapped |
|------|---------------|-------------|
| 주소 공간 | 메모리와 공유 | 별도 I/O 공간 |
| 명령어 | 일반 메모리 명령 | 전용 I/O 명령 |
| 유연성 | 높음 | 낮음 |
| 보호 | 페이지 단위 보호 가능 | 권한 레벨만 |
| 캐싱 | 주의 필요 (비캐시 설정) | 캐시 안됨 |

**현대 시스템**
- 대부분 MMIO 사용 (PCIe, GPU 등)
- PMIO는 레거시 호환 (키보드 컨트롤러 등)

**참고자료**
- [Intel I/O Address Space](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^41]

</details>

[^41]: Intel I/O 주소 공간 문서

---

## 📌 성능 측정 및 최적화

### ARCH-041

CPU 성능을 측정하는 지표(Clock Speed, IPC, CPI 등)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Clock Speed (클럭 속도)**
- CPU가 1초에 수행하는 사이클 수 (Hz)
- 예: 3.5GHz = 초당 35억 사이클
- 단독으로는 성능 지표로 부족

**IPC (Instructions Per Cycle)**
- 사이클당 실행하는 명령어 수
- 높을수록 효율적인 파이프라인/마이크로아키텍처
- 현대 CPU: 2-4 IPC

**CPI (Cycles Per Instruction)**
- 명령어 하나 실행에 필요한 평균 사이클 수
- CPI = 1/IPC
- 낮을수록 좋음

**CPU 성능 공식**
```
실행 시간 = 명령어 수 x CPI x 사이클 시간
         = 명령어 수 / (IPC x Clock Speed)
```

**기타 지표**
- **FLOPS**: 초당 부동소수점 연산 수
- **MIPS**: 초당 백만 명령어 (현재는 비추천)
- **Throughput**: 단위 시간당 처리량

**참고자료**
- [Intel Performance Monitoring](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^42]

</details>

[^42]: Intel 성능 모니터링 문서

### ARCH-042
IPC(Instructions Per Cycle)가 무엇이고 왜 중요한가요?

<details>
<summary>답변</summary>

IPC는 CPU가 한 클럭 사이클에 평균적으로 실행하는 명령어 수입니다.

**중요성**
- 클럭 속도만으로는 실제 성능 판단 불가
- 같은 클럭이라도 IPC가 높으면 더 빠름
- 아키텍처 효율성의 핵심 지표

**IPC에 영향을 미치는 요소**
- **파이프라인 효율**: 해저드, 스톨 최소화
- **분기 예측 정확도**: 예측 실패 시 IPC 감소
- **캐시 히트율**: 미스 시 파이프라인 스톨
- **명령어 수준 병렬성**: 슈퍼스칼라, OoO 실행
- **데이터 의존성**: 명령어 간 의존성이 적을수록 유리

**세대별 IPC 향상**
- 같은 클럭에서 신세대 CPU가 더 빠른 이유
- Intel 12세대 → 13세대: ~10% IPC 향상
- AMD Zen3 → Zen4: ~13% IPC 향상

**측정 방법**
- 성능 카운터 사용 (perf, VTune)
- `IPC = instructions / cycles`

**참고자료**
- [Intel VTune Profiler - IPC Analysis](https://www.intel.com/content/www/us/en/developer/tools/oneapi/vtune-profiler.html)[^43]

</details>

[^43]: Intel VTune IPC 분석 도구

### ARCH-043

Amdahl의 법칙에 대해 설명하고, 병렬화의 한계를 설명해주세요.

<details>
<summary>답변</summary>

Amdahl의 법칙은 병렬화로 얻을 수 있는 최대 성능 향상의 한계를 설명합니다.

**공식**
```
Speedup = 1 / ((1-P) + P/N)

P = 병렬화 가능한 비율
N = 프로세서 수
```

**예시**
- 90% 병렬화 가능한 프로그램
- 무한대 프로세서 사용 시: 최대 10배 속도 향상
- 10개 프로세서: 5.26배 향상
- 100개 프로세서: 9.17배 향상

**핵심 통찰**
- 순차 부분(1-P)이 병렬화 이점 제한
- 프로세서 수 증가 효과는 체감
- 작은 순차 부분도 큰 영향

**병렬화의 실제 한계**
- 동기화 오버헤드
- 통신 비용
- 메모리 대역폭 병목
- 로드 밸런싱 불균형

**Gustafson의 법칙**
- 문제 크기를 키우면 병렬화 이점 증가
- 약한 확장성(Weak Scaling) 관점

**참고자료**
- [Computer Architecture: A Quantitative Approach](https://www.elsevier.com/books/computer-architecture/hennessy/978-0-12-811905-1)[^44]

</details>

[^44]: Hennessy & Patterson 컴퓨터 구조 교과서

### ARCH-044

벤치마크(Benchmark)의 종류와 성능 측정 방법에 대해 설명해주세요.

<details>
<summary>답변</summary>

벤치마크는 시스템 성능을 측정하고 비교하기 위한 표준화된 테스트입니다.

**벤치마크 종류**

**마이크로벤치마크**
- 특정 컴포넌트 측정 (캐시, 메모리, 분기 예측)
- 예: lmbench, cachebench

**매크로벤치마크**
- 실제 애플리케이션 또는 전체 시스템 성능
- 예: SPEC CPU, Geekbench

**주요 벤치마크**
| 벤치마크 | 측정 대상 | 용도 |
|----------|-----------|------|
| SPEC CPU | CPU 정수/부동소수점 | 서버/데스크톱 CPU |
| Cinebench | 멀티스레드 렌더링 | 콘텐츠 제작 |
| TPC-C/TPC-H | 데이터베이스 | OLTP/OLAP |
| SPECjbb | Java 비즈니스 로직 | 엔터프라이즈 |
| sysbench | DB, CPU, 메모리 | 범용 서버 |

**성능 측정 방법**
- 실행 시간 측정
- 처리량(Throughput) 측정
- 지연 시간(Latency) 측정
- 자원 사용률 모니터링

**주의사항**
- 실제 워크로드와 유사한 벤치마크 선택
- 여러 번 실행하여 평균/분산 확인
- 벤치마크 최적화와 실제 성능은 다를 수 있음

**참고자료**
- [SPEC - Standard Performance Evaluation Corporation](https://www.spec.org/)[^45]

</details>

[^45]: SPEC 벤치마크 공식 사이트

### ARCH-045

프로그램 성능 최적화 시 컴퓨터 구조적 관점에서 고려해야 할 사항은 무엇인가요?

<details>
<summary>답변</summary>

**캐시 최적화**
- 데이터 지역성 극대화 (시간적, 공간적)
- 캐시 친화적 데이터 구조 사용
- 행 우선 순서로 배열 접근 (C/C++)
- 캐시 라인 크기 고려 (64바이트)

**메모리 접근 최적화**
- 메모리 정렬 (alignment)
- 프리페칭 활용
- False Sharing 방지
- NUMA 지역성 고려

**분기 최적화**
- 분기 예측 친화적 코드 작성
- 분기 없는 코드 (branchless) 고려
- 루프 언롤링

**명령어 수준 병렬성**
- 데이터 의존성 최소화
- SIMD 명령어 활용 (SSE, AVX)
- 루프 벡터화

**병렬 처리 최적화**
- 적절한 스레드 수 선택
- 동기화 오버헤드 최소화
- 로드 밸런싱

**측정 도구 활용**
- 프로파일러 (perf, VTune, Instruments)
- 성능 카운터 분석
- 병목 지점 식별

**참고자료**
- [Intel Optimization Reference Manual](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^46]

</details>

[^46]: Intel 최적화 레퍼런스 매뉴얼

---

## 📌 백엔드 개발 관련

### ARCH-046

백엔드 서버에서 CPU 캐시를 효율적으로 활용하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**데이터 구조 최적화**
- 자주 접근하는 데이터를 연속 메모리에 배치
- 객체 크기를 캐시 라인(64바이트)에 맞춤
- 핫 데이터와 콜드 데이터 분리

**메모리 접근 패턴**
- 순차 접근 선호 (배열 > 연결 리스트)
- 포인터 체이싱 최소화
- 데이터 지역성 고려한 알고리즘 선택

**객체 풀링**
- 자주 생성/삭제되는 객체 재사용
- 메모리 단편화 방지
- 캐시 워밍 효과

**멀티스레드 고려**
- 스레드별 데이터 분리 (False Sharing 방지)
- 읽기 전용 데이터는 공유 가능
- NUMA 인지 메모리 할당

**실용적 예시**
```java
// 나쁨: 객체 배열 (포인터 간접 참조)
Person[] people = new Person[1000];

// 좋음: 구조체 배열 또는 컬럼 지향 저장
int[] ages = new int[1000];
String[] names = new String[1000];
```

**참고자료**
- [Intel Developer Guide - Cache Optimization](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^47]

</details>

[^47]: Intel 캐시 최적화 개발자 가이드

### ARCH-047
데이터베이스 쿼리 성능에 CPU 캐시가 미치는 영향에 대해 설명해주세요.

<details>
<summary>답변</summary>

**캐시가 중요한 이유**
- 데이터베이스는 대량의 데이터를 메모리에서 처리
- 캐시 효율이 쿼리 처리 속도에 직접 영향
- 인덱스 검색, 조인, 정렬 모두 캐시 의존적

**캐시 영향 사례**

**인덱스 스캔**
- B+ 트리 노드가 캐시 라인에 맞으면 효율적
- 클러스터드 인덱스: 관련 데이터가 물리적으로 인접

**해시 조인**
- 해시 테이블 크기가 캐시에 맞으면 빠름
- 캐시 초과 시 성능 급격히 저하

**컬럼 지향 저장**
- 필요한 컬럼만 캐시에 로드
- 분석 쿼리(OLAP)에 유리
- 압축으로 캐시 효율 향상

**최적화 기법**
- 워킹 셋을 캐시 크기 내로 유지
- 인덱스 구조 최적화 (노드 크기)
- 버퍼 풀 프리페칭
- SIMD 활용한 벡터화 처리

**참고자료**
- [MySQL Performance Schema](https://dev.mysql.com/doc/refman/8.0/en/performance-schema.html)[^48]

</details>

[^48]: MySQL 성능 스키마 문서

### ARCH-048
멀티스레드 환경에서 False Sharing을 방지하는 구체적인 방법은 무엇인가요?

<details>
<summary>답변</summary>

**패딩을 사용한 분리**
```java
// Java
@Contended  // JDK 8+, JVM 옵션 필요
class Counter {
    volatile long value;
}

// C++
struct alignas(64) Counter {
    std::atomic<long> value;
    char padding[64 - sizeof(std::atomic<long>)];
};
```

**스레드 로컬 데이터 사용**
- 각 스레드가 독립적인 데이터 유지
- 주기적으로 결과 병합
```java
ThreadLocal<Long> threadLocalCounter;
```

**데이터 구조 재설계**
- 핫 데이터와 콜드 데이터 분리
- 스레드별로 다른 배열 인덱스 사용

**실용적 패턴**
```java
// 나쁨: 같은 캐시 라인
class Counters {
    long counter1;
    long counter2;
}

// 좋음: 캐시 라인 분리
class PaddedCounter {
    long counter;
    long p1, p2, p3, p4, p5, p6, p7; // 패딩
}
```

**프레임워크 지원**
- JDK `@Contended` 어노테이션
- C++ `alignas()` 키워드
- Go 구조체 필드 정렬

**참고자료**
- [Intel Threading Building Blocks Guide](https://www.intel.com/content/www/us/en/developer/tools/oneapi/onetbb.html)[^49]

</details>

[^49]: Intel TBB False Sharing 가이드

### ARCH-049

메모리 정렬(Memory Alignment)이 성능에 미치는 영향을 설명해주세요.

<details>
<summary>답변</summary>

**메모리 정렬이란**
- 데이터를 특정 바이트 경계에 배치하는 것
- N바이트 데이터는 N의 배수 주소에 배치
- 예: 8바이트 double은 8의 배수 주소

**성능 영향**

**정렬된 접근**
- 단일 메모리 접근으로 데이터 로드
- 캐시 라인 효율적 사용
- SIMD 명령어 최적 활용

**비정렬 접근**
- 두 번의 메모리 접근 필요할 수 있음
- 일부 아키텍처에서 예외 발생 (ARM)
- x86에서는 성능 저하 (2-3배 느림)

**자동 패딩**
```c
struct Example {
    char a;     // 1 byte
    // 7 bytes padding
    double b;   // 8 bytes
    char c;     // 1 byte
    // 7 bytes padding
}; // 총 24 bytes
```

**최적화 방법**
- 크기가 큰 멤버부터 선언
- `#pragma pack` 사용 시 주의 (성능 저하)
- 캐시 라인 정렬: `alignas(64)`

**SIMD 정렬 요구사항**
- SSE: 16바이트 정렬
- AVX: 32바이트 정렬
- AVX-512: 64바이트 정렬

**참고자료**
- [Intel Data Alignment Guide](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^50]

</details>

[^50]: Intel 데이터 정렬 가이드

### ARCH-050

NUMA 시스템에서 백엔드 애플리케이션 성능을 최적화하는 방법은 무엇인가요?

<details>
<summary>답변</summary>

**NUMA 인지 메모리 할당**
- 스레드가 사용할 데이터를 로컬 노드에 할당
- Linux: `numactl`, `libnuma` 활용
- JVM: `-XX:+UseNUMA` 옵션

**프로세스/스레드 배치**
```bash
# 특정 노드에서 프로세스 실행
numactl --cpunodebind=0 --membind=0 ./server

# 인터리브 모드 (균등 분배)
numactl --interleave=all ./server
```

**스레드 풀 설계**
- NUMA 노드별로 스레드 풀 분리
- 워커 스레드를 특정 코어에 바인딩
- 노드 간 작업 이동 최소화

**데이터 구조 파티셔닝**
- 대용량 데이터를 노드별로 분할
- 각 파티션을 해당 노드 스레드가 처리

**데이터베이스 최적화**
- 버퍼 풀을 NUMA 인지하도록 설정
- 연결당 전용 스레드를 같은 노드에 유지
- 쿼리 실행 시 데이터 로컬리티 고려

**모니터링**
```bash
# NUMA 통계 확인
numastat -c
numastat -p <pid>
```

**참고자료**
- [Linux NUMA Documentation](https://www.kernel.org/doc/html/latest/admin-guide/mm/numa_memory_policy.html)[^51]

</details>

[^51]: Linux NUMA 메모리 정책 문서

### ARCH-051

큰 데이터를 처리할 때 메모리 계층을 고려한 최적화 전략은 무엇인가요?

<details>
<summary>답변</summary>

**블록 단위 처리 (Blocking/Tiling)**
- 데이터를 캐시 크기에 맞는 블록으로 분할
- 각 블록을 완전히 처리 후 다음 블록
- 캐시 재사용 극대화

```python
# 행렬 곱셈 예시
for ii in range(0, N, BLOCK):
    for jj in range(0, N, BLOCK):
        for kk in range(0, N, BLOCK):
            # 블록 내에서 연산
```

**스트리밍 처리**
- 데이터를 한 번만 순차적으로 읽음
- 프리페칭 효과 극대화
- Non-temporal 저장으로 캐시 오염 방지

**데이터 압축**
- 캐시에 더 많은 데이터 적재
- 압축/해제 비용 vs 메모리 접근 비용 트레이드오프

**외부 정렬/병합**
- 메모리보다 큰 데이터 처리
- 디스크 I/O 최소화하는 다단계 병합

**컬럼 지향 처리**
- 필요한 컬럼만 메모리에 로드
- 벡터화 처리 용이
- 분석 워크로드에 효과적

**메모리 맵 파일**
- 대용량 파일을 가상 메모리에 매핑
- OS의 페이지 캐시 활용

**참고자료**
- [Intel Memory Optimization Guide](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^52]

</details>

[^52]: Intel 메모리 최적화 가이드

### ARCH-052

CPU 바운드(CPU-bound) 작업과 I/O 바운드(I/O-bound) 작업의 차이와 최적화 방법은 무엇인가요?

<details>
<summary>답변</summary>

**CPU 바운드 작업**
- CPU 연산이 병목
- 예: 암호화, 압축, 과학 계산, 이미지 처리

**최적화 방법**
- 코어 수만큼 스레드 사용
- SIMD 명령어 활용 (SSE, AVX)
- 알고리즘 최적화
- 캐시 효율 개선
- 비동기 I/O로 CPU 유휴 방지

**I/O 바운드 작업**
- I/O 대기가 병목 (디스크, 네트워크, DB)
- 예: 웹 서버, 파일 처리, API 호출

**최적화 방법**
- 비동기 I/O (async/await, NIO)
- 이벤트 기반 아키텍처 (epoll, kqueue)
- 코어 수보다 많은 스레드/코루틴 사용
- I/O 멀티플렉싱
- 캐싱으로 I/O 횟수 감소

**스레드 풀 크기**
| 작업 유형 | 스레드 수 |
|-----------|----------|
| CPU 바운드 | CPU 코어 수 |
| I/O 바운드 | 코어 수 x (1 + 대기시간/처리시간) |

**혼합 워크로드**
- CPU 작업과 I/O 작업 분리
- 각각 적절한 스레드 풀 사용

**참고자료**
- [Java Concurrency in Practice](https://jcip.net/)[^53]

</details>

[^53]: Java 동시성 프로그래밍

### ARCH-053

백엔드 시스템에서 메모리 대역폭이 성능에 미치는 영향은 무엇인가요?

<details>
<summary>답변</summary>

**메모리 대역폭 병목 상황**
- 대용량 데이터 처리 (분석, 집계)
- 캐시 미스 빈번한 워크로드
- 다수 코어가 동시에 메모리 접근
- 스트리밍 데이터 처리

**영향**
- CPU가 데이터 대기로 유휴 상태
- 코어 수 증가해도 성능 향상 제한
- 메모리 집약적 쿼리 처리 지연

**대역폭 계산**
```
DDR5-4800 듀얼 채널 = 4800 x 8 x 2 / 8 = 76.8 GB/s
```

**최적화 방법**

**데이터 크기 감소**
- 압축 활용
- 적절한 데이터 타입 선택 (int vs long)
- 컬럼 지향 저장

**메모리 채널 활용**
- 듀얼/쿼드 채널 메모리 구성
- NUMA에서 대역폭 분산

**캐시 효율 향상**
- 블로킹 기법으로 캐시 재사용
- 프리페칭 활용
- 비순차 접근 최소화

**Non-Temporal 접근**
- 재사용 없는 데이터는 캐시 우회
- `_mm_stream_si128` 등 사용

**참고자료**
- [Intel Memory Bandwidth Analysis](https://www.intel.com/content/www/us/en/developer/articles/tool/intelr-memory-latency-checker.html)[^54]

</details>

[^54]: Intel 메모리 대역폭 분석

### ARCH-054

컨텍스트 스위칭 비용을 줄이기 위한 하드웨어적/소프트웨어적 방법은 무엇인가요?

<details>
<summary>답변</summary>

**하드웨어적 방법**

**레지스터 세트 복제**
- 하이퍼스레딩: 스레드별 아키텍처 상태 유지
- 빠른 컨텍스트 전환

**TLB 최적화**
- ASID/PCID: 프로세스별 TLB 엔트리 구분
- 컨텍스트 스위칭 시 TLB 플러시 회피

**캐시 유지**
- 스위칭 후에도 캐시 데이터 유효
- 웜 캐시로 빠른 재개

**소프트웨어적 방법**

**경량 스레드/코루틴**
- 유저 공간에서 스위칭 (syscall 없음)
- Go 고루틴, Kotlin 코루틴, Java 가상 스레드

**스레드 수 최적화**
- CPU 코어 수에 맞게 스레드 제한
- 불필요한 스위칭 감소

**CPU 어피니티**
- 스레드를 특정 코어에 바인딩
- 캐시 친화성 유지

**배치 처리**
- 작은 작업들을 모아서 처리
- 스위칭 빈도 감소

**Lock-free 자료구조**
- 블로킹 최소화
- 스레드가 대기 없이 진행

**참고자료**
- [Linux Context Switching](https://www.kernel.org/doc/html/latest/scheduler/)[^55]

</details>

[^55]: Linux 스케줄러 문서

### ARCH-055

서버 하드웨어 선택 시 컴퓨터 구조 관점에서 고려해야 할 사항은 무엇인가요?

<details>
<summary>답변</summary>

**CPU 선택**
- **코어 수 vs 클럭**: 워크로드 특성에 따라 결정
  - 병렬화 용이: 많은 코어
  - 순차적 처리: 높은 클럭
- **캐시 크기**: L3 캐시가 워킹 셋 수용 가능한지
- **메모리 채널 수**: 메모리 대역폭 요구사항

**메모리 구성**
- **용량**: 워킹 셋 + 버퍼/캐시 충분히
- **대역폭**: 채널 수, DDR 세대
- **NUMA 구성**: 대규모 시스템에서 중요

**스토리지**
- **NVMe SSD**: 고성능 I/O 필요시
- **IOPS vs 처리량**: 워크로드 패턴에 따라
- **캐시 계층**: 핫 데이터용 빠른 스토리지

**네트워크**
- **대역폭**: 10G, 25G, 100G
- **지연 시간**: RDMA, 커널 바이패스

**아키텍처 선택**
- **x86**: 범용, 소프트웨어 호환성
- **ARM**: 전력 효율, 코어 수 우위
- **전용 가속기**: GPU, TPU, FPGA

**확장성 고려**
- 수직 확장 여유 (슬롯, 전원)
- 수평 확장 용이성

**참고자료**
- [Intel Server Platform Guide](https://www.intel.com/content/www/us/en/products/details/servers.html)[^56]

</details>

[^56]: Intel 서버 플랫폼 가이드

---

## 📌 최신 기술 동향

### ARCH-056

최근 서버용 CPU의 발전 트렌드(코어 수 증가, 특수 명령어 등)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**코어 수 증가**
- AMD EPYC: 96-128 코어
- Intel Xeon: 60 코어
- Ampere Altra: 128 코어
- 칩렛 아키텍처로 확장 용이

**메모리 대역폭 향상**
- DDR5 지원 (대역폭 2배)
- 메모리 채널 수 증가 (12채널)
- CXL(Compute Express Link) 도입

**특수 명령어 및 가속기**
- AVX-512: 벡터 처리 성능 향상
- AMX (Intel): 행렬 연산 가속
- 암호화 가속 (AES-NI, SHA-NI)
- AI 추론 가속

**전력 효율**
- 칩렛 + 고급 공정 (5nm, 3nm)
- 다이나믹 전력 관리
- ARM 서버 CPU 성장

**보안 기능**
- 메모리 암호화 (TME, SME)
- 신뢰 실행 환경 (SGX, SEV)
- 사이드 채널 공격 완화

**I/O 발전**
- PCIe 5.0 (64 GT/s)
- CXL 메모리 확장
- 고속 네트워크 통합

**참고자료**
- [AMD EPYC Processors](https://www.amd.com/en/processors/epyc-server-cpu-family)[^57]
- [Intel Xeon Scalable](https://www.intel.com/content/www/us/en/products/details/processors/xeon.html)[^58]

</details>

[^57]: AMD EPYC 프로세서 공식 페이지
[^58]: Intel Xeon Scalable 공식 페이지

### ARCH-057

AVX(Advanced Vector Extensions) 명령어가 무엇이고, 어떤 작업에 유용한가요?

<details>
<summary>답변</summary>

**AVX란**
- Intel/AMD의 SIMD 확장 명령어 세트
- 하나의 명령어로 여러 데이터 동시 처리
- SSE(128비트) → AVX(256비트) → AVX-512(512비트)

**AVX 버전별 특징**
| 버전 | 레지스터 크기 | 동시 처리 |
|------|---------------|-----------|
| AVX | 256비트 | 8 x float, 4 x double |
| AVX2 | 256비트 | 정수 연산 강화 |
| AVX-512 | 512비트 | 16 x float, 8 x double |

**유용한 작업**
- **과학 계산**: 행렬 연산, 시뮬레이션
- **미디어 처리**: 이미지/비디오 인코딩
- **머신러닝**: 신경망 추론
- **암호화**: 대량 데이터 암/복호화
- **데이터베이스**: 벡터화된 쿼리 처리

**사용 방법**
```c
// 컴파일러 자동 벡터화
#pragma omp simd

// Intrinsic 함수
__m256 result = _mm256_add_ps(a, b);
```

**주의사항**
- AVX-512는 클럭 다운 발생 가능
- 전력 소모 증가
- 모든 CPU 지원하지 않음

**참고자료**
- [Intel Intrinsics Guide](https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html)[^59]

</details>

[^59]: Intel Intrinsics 가이드

### ARCH-058

ARM 서버 CPU(예: AWS Graviton)가 x86 대비 어떤 장점이 있나요?

<details>
<summary>답변</summary>

**전력 효율**
- 와트당 성능 우수 (최대 40% 향상)
- 발열 감소로 냉각 비용 절감
- TCO(총소유비용) 절감

**비용 효율**
- AWS Graviton3: x86 대비 40% 가격 우위
- 동일 예산으로 더 많은 컴퓨팅 가능

**코어 밀도**
- Graviton3: 64 코어
- Ampere Altra: 128 코어
- 병렬 워크로드에 유리

**커스텀 설계**
- 클라우드 워크로드에 최적화
- 불필요한 레거시 기능 제거
- DDR5, PCIe 5.0 조기 도입

**적합한 워크로드**
- 웹 서버, API 서버
- 컨테이너, 마이크로서비스
- 데이터베이스 (읽기 중심)
- 빌드/CI 파이프라인

**고려사항**
- x86 전용 소프트웨어 호환성
- 일부 라이브러리 ARM 미지원
- JIT 컴파일 언어는 대체로 호환

**참고자료**
- [AWS Graviton Processors](https://aws.amazon.com/ec2/graviton/)[^60]
- [Ampere Computing](https://amperecomputing.com/)[^61]

</details>

[^60]: AWS Graviton 공식 페이지
[^61]: Ampere Computing 공식 페이지

### ARCH-059

SIMD(Single Instruction Multiple Data)가 무엇이고 어떻게 활용할 수 있나요?

<details>
<summary>답변</summary>

**SIMD란**
- 하나의 명령어로 여러 데이터를 동시에 처리
- 데이터 수준 병렬성 활용
- Flynn의 분류 중 하나

**동작 원리**
```
일반 연산:     SIMD 연산:
a1 + b1        [a1,a2,a3,a4] + [b1,b2,b3,b4]
a2 + b2    →   = [c1,c2,c3,c4]
a3 + b3        (한 번의 명령어)
a4 + b4
```

**활용 방법**

**1. 컴파일러 자동 벡터화**
```c
#pragma omp simd
for (int i = 0; i < n; i++) {
    c[i] = a[i] + b[i];
}
```

**2. Intrinsic 함수**
```c
#include <immintrin.h>
__m256 va = _mm256_load_ps(a);
__m256 vb = _mm256_load_ps(b);
__m256 vc = _mm256_add_ps(va, vb);
```

**3. 라이브러리 활용**
- Intel MKL, OpenBLAS
- numpy, TensorFlow 내부적으로 사용

**적합한 작업**
- 배열 연산, 행렬 계산
- 이미지/신호 처리
- 암호화/해싱
- 문자열 검색

**최적화 팁**
- 메모리 정렬 (16/32/64바이트)
- 루프 언롤링
- 데이터 레이아웃 최적화 (SoA vs AoS)

**참고자료**
- [Intel SIMD Programming Guide](https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html)[^62]

</details>

[^62]: Intel SIMD 프로그래밍 가이드

### ARCH-060

컴퓨터 구조 관점에서 클라우드 인프라의 특징과 고려사항은 무엇인가요?

<details>
<summary>답변</summary>

**가상화 오버헤드**
- 하이퍼바이저 계층 추가
- VM exit/enter 비용
- 해결: 하드웨어 가상화(VT-x, VT-d), SR-IOV

**공유 자원 경쟁**
- 멀티테넌트 환경에서 CPU, 캐시, 메모리 대역폭 공유
- 노이지 네이버(Noisy Neighbor) 문제
- 해결: 전용 인스턴스, CPU 크레딧 제한

**NUMA 인지 필요성**
- 대형 VM은 여러 NUMA 노드 걸칠 수 있음
- 메모리 지역성 고려한 배치 필요
- 클라우드 제공자의 NUMA 정책 이해

**네트워크 성능**
- 물리 네트워크 공유로 지연 변동
- SR-IOV, DPDK로 커널 바이패스
- 배치 그룹으로 인접 배치

**스토리지 특성**
- 네트워크 스토리지 지연 (EBS, Persistent Disk)
- 로컬 NVMe는 휘발성
- 캐시 계층화 전략

**비용 최적화**
- 적절한 인스턴스 타입 선택
- ARM 인스턴스 활용 (Graviton)
- 스팟 인스턴스로 비용 절감

**참고자료**
- [AWS EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)[^63]
- [Google Cloud Machine Types](https://cloud.google.com/compute/docs/machine-types)[^64]

</details>

[^63]: AWS EC2 인스턴스 타입
[^64]: Google Cloud 머신 타입

---

 총 질문 수: 60개
