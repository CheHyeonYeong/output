# Operating System (운영체제)

> 카테고리: CS 기초 > 운영체제
> [← 면접 질문 목록으로 돌아가기](../../interview.md)

---

## 📌 시스템 콜

### OS-001
시스템 콜이 무엇인지 설명해 주세요.

<details>
<summary>답변</summary>

시스템 콜은 사용자 프로그램이 운영체제 커널의 서비스를 요청하기 위한 프로그래밍 인터페이스입니다. 사용자 모드에서 실행되는 프로세스가 파일 읽기/쓰기, 프로세스 생성, 네트워크 통신 등 커널 권한이 필요한 작업을 수행할 때 시스템 콜을 통해 커널 모드로 전환하여 해당 서비스를 요청합니다.

**참고자료**
- [Linux man-pages: syscalls](https://man7.org/linux/man-pages/man2/syscalls.2.html)[^1]

</details>

[^1]: Linux 커널 시스템 콜 목록 및 설명

### OS-002
시스템 콜의 구체적인 예시를 들어주세요.

<details>
<summary>답변</summary>

- **프로세스 제어**: fork(), exec(), exit(), wait()
- **파일 조작**: open(), read(), write(), close()
- **장치 관리**: ioctl(), read(), write()
- **정보 유지**: getpid(), alarm(), sleep()
- **통신**: pipe(), socket(), connect(), accept()
- **메모리 관리**: mmap(), brk(), sbrk()

**참고자료**
- [Linux man-pages: syscalls](https://man7.org/linux/man-pages/man2/syscalls.2.html)[^2]

</details>

[^2]: Linux 시스템 콜 분류 및 예시

### OS-003
시스템 콜이 운영체제에서 어떤 과정으로 실행되는지 설명해 주세요.

<details>
<summary>답변</summary>

1. 사용자 프로그램이 시스템 콜 래퍼 함수 호출
2. 시스템 콜 번호를 레지스터에 저장
3. 소프트웨어 인터럽트(trap) 발생 (x86: int 0x80 또는 syscall 명령어)
4. CPU가 커널 모드로 전환
5. 커널의 시스템 콜 핸들러가 시스템 콜 테이블에서 해당 함수 찾아 실행
6. 결과를 레지스터에 저장하고 사용자 모드로 복귀

**참고자료**
- [Linux Kernel Documentation: Adding a New System Call](https://www.kernel.org/doc/html/latest/process/adding-syscalls.html)[^3]

</details>

[^3]: Linux 커널 시스템 콜 처리 과정 공식 문서

### OS-004
시스템 콜의 유형에 대해 설명해 주세요.

<details>
<summary>답변</summary>

1. **프로세스 제어**: 프로세스 생성/종료, 실행, 대기 (fork, exec, exit, wait)
2. **파일 관리**: 파일 생성/삭제, 열기/닫기, 읽기/쓰기 (open, close, read, write)
3. **장치 관리**: 장치 요청/해제, 읽기/쓰기 (ioctl, read, write)
4. **정보 유지**: 시간/날짜, 시스템 데이터 (time, getpid, uname)
5. **통신**: 연결 생성/삭제, 메시지 송수신 (socket, send, recv, pipe)
6. **보호**: 권한 설정/확인 (chmod, chown, umask)

**참고자료**
- [POSIX.1-2017 System Interfaces](https://pubs.opengroup.org/onlinepubs/9699919799/)[^4]

</details>

[^4]: POSIX 표준 시스템 인터페이스 정의

### OS-005
운영체제의 Dual Mode 에 대해 설명해 주세요.

<details>
<summary>답변</summary>

Dual Mode는 CPU가 **사용자 모드(User Mode)**와 **커널 모드(Kernel Mode)** 두 가지 실행 모드를 가지는 것입니다.

- **사용자 모드**: 일반 애플리케이션이 실행되며, 하드웨어 직접 접근이나 특권 명령어 실행이 제한됨
- **커널 모드**: OS 커널이 실행되며, 모든 명령어와 하드웨어에 접근 가능

모드 비트(Mode bit)로 현재 모드를 구분하며, 시스템 콜이나 인터럽트 발생 시 커널 모드로 전환됩니다.

**참고자료**
- [Intel SDM Vol.3: Protected Mode](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^5]

</details>

[^5]: Intel CPU 보호 모드 및 권한 레벨 설명

### OS-006
Dual Mode에서 유저모드와 커널모드를 구분해야 하는 이유는 무엇인가요?

<details>
<summary>답변</summary>

1. **시스템 보호**: 사용자 프로그램이 커널 메모리나 다른 프로세스의 메모리에 접근하는 것을 방지
2. **안정성**: 잘못된 사용자 프로그램이 시스템 전체를 손상시키는 것을 방지
3. **보안**: 악의적인 프로그램이 하드웨어를 직접 제어하거나 민감한 데이터에 접근하는 것을 차단
4. **자원 관리**: OS가 하드웨어 자원을 중앙에서 관리하여 공정한 분배 가능

**참고자료**
- [Linux Kernel Documentation: Memory Protection](https://www.kernel.org/doc/html/latest/admin-guide/mm/)[^6]

</details>

[^6]: Linux 커널 메모리 보호 메커니즘

### OS-007
운영체제에서 서로 다른 시스템 콜을 어떻게 구분하나요?

<details>
<summary>답변</summary>

**시스템 콜 번호(System Call Number)**를 통해 구분합니다.

- 각 시스템 콜은 고유한 번호가 할당됨 (예: Linux x86-64에서 read=0, write=1, open=2)
- 시스템 콜 호출 시 해당 번호를 레지스터(x86-64: rax)에 저장
- 커널은 시스템 콜 테이블(sys_call_table)에서 번호에 해당하는 핸들러 함수를 찾아 실행
- 이 테이블은 커널 컴파일 시 정적으로 생성됨

**참고자료**
- [Linux syscall table](https://github.com/torvalds/linux/blob/master/arch/x86/entry/syscalls/syscall_64.tbl)[^7]

</details>

[^7]: Linux x86-64 시스템 콜 테이블 소스 코드

---

## 📌 인터럽트

### OS-008
인터럽트가 무엇인지 설명해 주세요.

<details>
<summary>답변</summary>

인터럽트는 CPU가 현재 실행 중인 작업을 일시 중단하고, 특정 이벤트를 처리하도록 알리는 신호입니다.

- **하드웨어 인터럽트**: 외부 장치(키보드, 마우스, 디스크 등)에서 발생
- **소프트웨어 인터럽트(트랩)**: 프로그램에서 의도적으로 발생 (시스템 콜, 예외 등)

인터럽트 발생 시 CPU는 현재 상태를 저장하고, 인터럽트 서비스 루틴(ISR)을 실행한 후 원래 작업으로 복귀합니다.

**참고자료**
- [Linux Kernel Documentation: Interrupts](https://www.kernel.org/doc/html/latest/core-api/genericirq.html)[^8]

</details>

[^8]: Linux 커널 인터럽트 처리 문서

### OS-009
인터럽트가 발생했을 때 처리 과정을 설명해 주세요.

<details>
<summary>답변</summary>

1. **인터럽트 발생**: 하드웨어 또는 소프트웨어에서 인터럽트 신호 발생
2. **현재 상태 저장**: CPU는 현재 실행 중인 명령어의 PC, 레지스터 등을 스택에 저장
3. **인터럽트 벡터 참조**: 인터럽트 번호로 IDT(Interrupt Descriptor Table)에서 핸들러 주소 확인
4. **ISR 실행**: 해당 인터럽트 서비스 루틴(Interrupt Service Routine) 실행
5. **상태 복원**: 저장했던 상태를 복원하고 원래 작업으로 복귀

**참고자료**
- [Intel SDM Vol.3: Interrupt and Exception Handling](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^9]

</details>

[^9]: Intel CPU 인터럽트 처리 메커니즘

### OS-010
Polling 방식에 대해 설명해 주세요.

<details>
<summary>답변</summary>

Polling은 CPU가 주기적으로 장치의 상태를 확인하여 이벤트 발생 여부를 검사하는 방식입니다.

**장점**:
- 구현이 단순함
- 인터럽트 오버헤드가 없음 (컨텍스트 저장/복원, ISR 호출 등)
- 예측 가능한 응답 시간 (실시간 시스템에서 중요)
- 짧은 대기 시간에서 효율적

**단점**:
- CPU 자원 낭비 (busy waiting)
- 이벤트가 없어도 계속 확인해야 함
- 응답 지연 가능성 (폴링 주기에 따라)

**Polling vs Interrupt 선택 기준**:

| 상황 | 권장 방식 | 이유 |
|------|----------|------|
| 이벤트 빈도 높음 | Polling | 인터럽트 오버헤드가 누적됨 |
| 이벤트 빈도 낮음 | Interrupt | CPU를 다른 작업에 사용 가능 |
| 대기 시간 짧음 | Polling | 인터럽트 처리 시간보다 빠름 |
| 대기 시간 김 | Interrupt | CPU 낭비 방지 |
| 실시간 요구사항 | Polling | 예측 가능한 지연시간 |

**실무 예시**:
- 고속 NVMe SSD: 폴링 모드 지원 (지연시간 최소화)
- 네트워크 카드(NAPI): 하이브리드 (인터럽트로 시작, 폴링으로 처리)

**참고자료**
- [Linux Kernel Documentation: Device Drivers](https://www.kernel.org/doc/html/latest/driver-api/)[^10]

</details>

[^10]: Linux 디바이스 드라이버 I/O 처리 방식

### OS-011
HW / SW 인터럽트에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**하드웨어 인터럽트 (Hardware Interrupt)**:
- 외부 장치(키보드, 마우스, 네트워크 카드, 타이머 등)에서 발생
- 비동기적: 언제든지 발생 가능
- 인터럽트 컨트롤러(PIC/APIC)를 통해 CPU에 전달
- 예: 키보드 입력, 디스크 I/O 완료, 타이머 틱

**소프트웨어 인터럽트 (Software Interrupt/Trap)**:
- 프로그램 실행 중 의도적으로 발생
- 동기적: 특정 명령어 실행 시 발생
- 시스템 콜, 예외(Exception), 오류 처리에 사용
- 예: int 0x80, syscall 명령어, divide by zero

**참고자료**
- [Linux Kernel: Hardware Interrupts](https://www.kernel.org/doc/html/latest/core-api/genericirq.html)[^11]

</details>

[^11]: Linux 커널 하드웨어/소프트웨어 인터럽트 처리

### OS-012
동시에 두 개 이상의 인터럽트가 발생하면, 어떻게 처리해야 하나요?

<details>
<summary>답변</summary>

**인터럽트 우선순위(Interrupt Priority)**를 통해 처리합니다.

1. **우선순위 기반 처리**: 각 인터럽트에 우선순위가 할당되며, 높은 우선순위 인터럽트가 먼저 처리됨
2. **중첩 인터럽트(Nested Interrupt)**: 낮은 우선순위 ISR 실행 중 높은 우선순위 인터럽트가 발생하면 선점 가능
3. **인터럽트 마스킹**: 중요한 작업 중 특정 인터럽트를 비활성화
4. **인터럽트 컨트롤러(APIC)**: 우선순위 관리 및 중재 담당

일반적 우선순위: 전원 > 기계 오류 > 타이머 > 디스크 I/O > 네트워크 > 키보드

**참고자료**
- [Intel APIC Documentation](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^12]

</details>

[^12]: Intel APIC 인터럽트 우선순위 처리

---

## 📌 프로세스

### OS-013
프로세스가 무엇인가요?

<details>
<summary>답변</summary>

프로세스는 **실행 중인 프로그램**입니다. 프로그램이 메모리에 적재되어 CPU를 할당받아 실행되는 상태를 말합니다.

프로세스는 다음을 포함합니다:
- **코드 영역**: 실행할 프로그램 코드
- **데이터 영역**: 전역 변수, 정적 변수
- **힙 영역**: 동적 할당 메모리
- **스택 영역**: 함수 호출, 지역 변수
- **PCB**: 프로세스 상태 정보

각 프로세스는 독립적인 주소 공간을 가지며, OS가 자원 할당 및 스케줄링의 단위로 관리합니다.

**참고자료**
- [Linux Kernel: Process Management](https://www.kernel.org/doc/html/latest/scheduler/)[^13]

</details>

[^13]: Linux 커널 프로세스 관리 문서

### OS-014
프로그램과 프로세스, 스레드의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | 프로그램 | 프로세스 | 스레드 |
|------|----------|----------|--------|
| 정의 | 디스크에 저장된 실행 파일 | 실행 중인 프로그램 | 프로세스 내 실행 단위 |
| 상태 | 정적 (passive) | 동적 (active) | 동적 |
| 메모리 | 없음 | 독립적 주소 공간 | 프로세스 주소 공간 공유 |
| 자원 | 없음 | OS로부터 할당 | 프로세스 자원 공유 |
| 생성 비용 | - | 높음 | 낮음 |
| 통신 | - | IPC 필요 | 공유 메모리로 직접 통신 |

스레드는 코드, 데이터, 힙을 공유하고 각자의 스택과 레지스터를 가집니다.

**참고자료**
- [POSIX Threads (pthreads)](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/pthread.h.html)[^14]

</details>

[^14]: POSIX 스레드 표준 정의

### OS-015
PCB가 무엇인가요?

<details>
<summary>답변</summary>

PCB(Process Control Block)는 운영체제가 프로세스를 관리하기 위해 유지하는 자료구조입니다. Linux에서는 `task_struct`로 구현됩니다.

**PCB에 저장되는 정보**:
- **프로세스 상태**: Ready, Running, Waiting 등
- **프로그램 카운터(PC)**: 다음 실행할 명령어 주소
- **CPU 레지스터**: 컨텍스트 스위칭 시 저장/복원
- **스케줄링 정보**: 우선순위, 스케줄링 큐 포인터
- **메모리 관리 정보**: 페이지 테이블, 세그먼트 테이블
- **I/O 상태 정보**: 열린 파일 목록, I/O 장치
- **계정 정보**: PID, CPU 사용 시간

**참고자료**
- [Linux Kernel: task_struct](https://github.com/torvalds/linux/blob/master/include/linux/sched.h)[^15]

</details>

[^15]: Linux task_struct 구조체 정의

### OS-016
스레드도 PCB(Process Control Block)를 갖고 있나요?

<details>
<summary>답변</summary>

**Linux에서는 스레드도 자체 PCB(task_struct)를 가집니다.**

Linux는 프로세스와 스레드를 구분하지 않고 모두 `task_struct`로 관리합니다. 다만 스레드들은:
- 같은 메모리 공간(mm_struct)을 공유
- 같은 파일 디스크립터 테이블 공유
- 같은 시그널 핸들러 공유
- 각자의 스택, 레지스터, PC는 별도 유지

다른 OS에서는 TCB(Thread Control Block)라는 별도 구조체를 사용하기도 합니다. TCB는 PCB보다 작으며 스레드별 정보(스택 포인터, 레지스터, 상태)만 저장합니다.

**참고자료**
- [Linux Kernel: clone() system call](https://man7.org/linux/man-pages/man2/clone.2.html)[^16]

</details>

[^16]: Linux clone() 시스템 콜 - 프로세스/스레드 생성

### OS-017
리눅스에서, 프로세스와 스레드는 각각 어떻게 생성될까요?

<details>
<summary>답변</summary>

**프로세스 생성**: `fork()` 시스템 콜
- 부모 프로세스의 복사본 생성
- Copy-on-Write로 메모리 효율적 복사
- 새로운 PID 할당, 별도의 주소 공간

**스레드 생성**: `clone()` 시스템 콜 (내부적으로 pthread_create가 사용)
- `CLONE_VM`: 메모리 공간 공유
- `CLONE_FILES`: 파일 디스크립터 공유
- `CLONE_FS`: 파일 시스템 정보 공유
- `CLONE_SIGHAND`: 시그널 핸들러 공유

Linux에서는 프로세스와 스레드 모두 `clone()`을 기반으로 하며, 플래그에 따라 공유 범위가 결정됩니다.

**참고자료**
- [Linux man-pages: fork(2)](https://man7.org/linux/man-pages/man2/fork.2.html)[^17]
- [Linux man-pages: clone(2)](https://man7.org/linux/man-pages/man2/clone.2.html)[^18]

</details>

[^17]: Linux fork() 시스템 콜
[^18]: Linux clone() 시스템 콜

### OS-018
자식 프로세스가 상태를 알리지 않고 죽거나, 부모 프로세스가 먼저 죽게 되면 어떻게 처리하나요?

<details>
<summary>답변</summary>

**좀비 프로세스 (Zombie Process)**:
- 자식 프로세스가 종료되었지만 부모가 wait()를 호출하지 않은 상태
- PCB(task_struct)가 메모리에 남아 종료 상태 정보 유지
- 부모가 wait()를 호출하면 자원 회수
- 부모가 종료되면 init(PID 1)이 입양하여 처리

**고아 프로세스 (Orphan Process)**:
- 부모 프로세스가 먼저 종료된 자식 프로세스
- init 프로세스(systemd)가 새로운 부모가 됨
- init은 주기적으로 wait()를 호출하여 고아 프로세스 정리

**참고자료**
- [Linux man-pages: wait(2)](https://man7.org/linux/man-pages/man2/wait.2.html)[^19]

</details>

[^19]: Linux wait() 시스템 콜 - 자식 프로세스 상태 수집

### OS-019
리눅스에서, 데몬프로세스에 대해 설명해 주세요.

<details>
<summary>답변</summary>

데몬(Daemon) 프로세스는 **백그라운드에서 실행되며 특정 서비스를 제공하는 프로세스**입니다.

**특징**:
- 터미널과 분리되어 실행 (controlling terminal 없음)
- 보통 시스템 부팅 시 시작되어 계속 실행
- 이름이 'd'로 끝나는 경우가 많음 (sshd, httpd, mysqld)
- 부모 프로세스가 init(PID 1)

**데몬 생성 과정**:
1. fork()로 자식 생성 후 부모 종료
2. setsid()로 새 세션 생성
3. 작업 디렉토리를 /로 변경
4. 파일 디스크립터(stdin, stdout, stderr) 닫기
5. 로그 파일 또는 syslog로 출력 리디렉션

**참고자료**
- [Linux man-pages: daemon(7)](https://man7.org/linux/man-pages/man7/daemon.7.html)[^20]

</details>

[^20]: Linux 데몬 프로세스 가이드

### OS-020
리눅스는 프로세스가 일종의 트리를 형성하고 있습니다. 이 트리의 루트 노드에 위치하는 프로세스에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**init 프로세스 (PID 1)**가 프로세스 트리의 루트입니다. 현대 Linux에서는 주로 **systemd**가 이 역할을 합니다.

**특징**:
- 커널 부팅 후 가장 먼저 실행되는 사용자 공간 프로세스
- 모든 프로세스의 조상 (직/간접적 부모)
- 고아 프로세스를 입양하여 좀비 방지
- 시스템 종료 시 모든 프로세스 정리

**역할**:
- 시스템 초기화 스크립트 실행
- 데몬 프로세스 시작 및 관리
- 런레벨/타겟 관리
- 고아 프로세스 회수

`pstree` 명령어로 프로세스 트리 구조를 확인할 수 있습니다.

**참고자료**
- [systemd Documentation](https://www.freedesktop.org/wiki/Software/systemd/)[^21]

</details>

[^21]: systemd 공식 문서 - init 시스템

---

## 📌 프로세스 주소공간

### OS-021
프로세스 주소공간에 대해 설명해 주세요.

<details>
<summary>답변</summary>

프로세스 주소공간은 프로세스가 사용하는 가상 메모리 영역으로, 다음과 같이 구성됩니다:

| 영역 | 설명 | 특성 |
|------|------|------|
| **Text(Code)** | 실행 코드 | 읽기 전용 |
| **Data** | 초기화된 전역/정적 변수 | 읽기/쓰기 |
| **BSS** | 초기화되지 않은 전역/정적 변수 | 읽기/쓰기, 0으로 초기화 |
| **Heap** | 동적 할당 메모리 (malloc) | 낮은 주소 -> 높은 주소로 증가 |
| **Stack** | 함수 호출, 지역 변수 | 높은 주소 -> 낮은 주소로 증가 |

Heap과 Stack 사이에는 공유 라이브러리, mmap 영역이 위치합니다.

**참고자료**
- [Linux Kernel: Memory Layout](https://www.kernel.org/doc/html/latest/admin-guide/mm/)[^22]

</details>

[^22]: Linux 커널 메모리 레이아웃 문서

### OS-022
초기화 하지 않은 변수들은 어디에 저장될까요?

<details>
<summary>답변</summary>

**BSS(Block Started by Symbol) 영역**에 저장됩니다.

- 초기화되지 않은 전역 변수와 정적 변수가 위치
- 프로그램 로드 시 운영체제가 자동으로 0으로 초기화
- 실행 파일에는 크기 정보만 저장 (실제 데이터 X) -> 파일 크기 절약
- Data 영역과 달리 초기값을 저장할 필요가 없음

```c
int global_var;           // BSS 영역
static int static_var;    // BSS 영역
int init_var = 10;        // Data 영역
```

**참고자료**
- [ELF Format Specification](https://refspecs.linuxfoundation.org/elf/elf.pdf)[^23]

</details>

[^23]: ELF 실행 파일 형식 - 섹션 정의

### OS-023
일반적인 주소공간 그림처럼, Stack과 Heap의 크기는 매우 크다고 할 수 있을까요? 그렇지 않다면, 그 크기는 언제 결정될까요?

<details>
<summary>답변</summary>

**Stack과 Heap은 고정 크기가 아니며, 실제로는 제한적입니다.**

**Stack**:
- 기본 크기: Linux에서 보통 8MB (`ulimit -s`로 확인)
- 컴파일 시 또는 실행 시 설정 가능
- 초과 시 Stack Overflow 발생

**Heap**:
- 이론상 가상 주소 공간까지 확장 가능
- 실제로는 물리 메모리 + 스왑 공간으로 제한
- `brk()`, `sbrk()` 시스템 콜로 동적 확장
- 큰 할당은 `mmap()`으로 별도 영역 사용

그림에서는 Heap과 Stack이 서로 향해 자라는 것처럼 보이지만, 실제로는 경계가 명확히 관리됩니다.

**참고자료**
- [Linux man-pages: getrlimit(2)](https://man7.org/linux/man-pages/man2/getrlimit.2.html)[^24]

</details>

[^24]: Linux 리소스 제한 시스템 콜

### OS-024
Stack과 Heap 공간 중 접근 속도가 더 빠른 공간은 어디이고, 그 이유는 무엇인가요?

<details>
<summary>답변</summary>

**Stack이 일반적으로 더 빠릅니다.**

**Stack이 빠른 이유**:
1. **캐시 지역성**: Stack은 연속적으로 사용되어 캐시 히트율이 높음
2. **단순한 할당/해제**: 스택 포인터(SP)만 이동하면 됨 (O(1))
3. **메모리 관리 오버헤드 없음**: 별도의 메타데이터 관리 불필요

**Heap이 느린 이유**:
1. **복잡한 할당 알고리즘**: free list 탐색, 단편화 처리 필요
2. **캐시 지역성 낮음**: 할당된 메모리가 분산될 수 있음
3. **동기화 오버헤드**: 멀티스레드 환경에서 락 필요
4. **시스템 콜 가능성**: brk(), mmap() 호출 필요할 수 있음

**참고자료**
- [glibc malloc internals](https://sourceware.org/glibc/wiki/MallocInternals)[^25]

</details>

[^25]: glibc malloc 구현 상세

### OS-025
프로세스 주소 공간을 Code, Data, Heap, Stack 영역으로 분할하는 이유는 무엇인가요?

<details>
<summary>답변</summary>

**메모리 영역 분할의 이유**:

1. **보안 및 보호**
   - Code 영역을 읽기 전용으로 설정하여 코드 변조 방지
   - 각 영역에 적절한 권한(읽기/쓰기/실행) 부여 가능

2. **메모리 효율성**
   - Code 영역: 여러 프로세스가 공유 가능 (같은 프로그램)
   - BSS 영역: 실행 파일에 실제 데이터 저장 불필요

3. **관리 용이성**
   - 각 영역의 특성에 맞는 관리 방식 적용
   - Stack: LIFO 방식의 단순한 관리
   - Heap: 동적 할당을 위한 복잡한 관리

4. **확장성**
   - Stack과 Heap이 반대 방향으로 성장하여 공간 활용 최적화

**참고자료**
- [Linux Kernel: Virtual Memory Areas](https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html)[^26]

</details>

[^26]: Linux 가상 메모리 영역 개념

### OS-026
스레드의 주소공간은 어떻게 구성되어 있을까요?

<details>
<summary>답변</summary>

스레드는 프로세스의 주소공간을 공유하되, 일부 영역은 개별적으로 가집니다.

**공유하는 영역**:
- Code(Text) 영역
- Data 영역
- BSS 영역
- Heap 영역
- 열린 파일 디스크립터
- 시그널 핸들러

**개별적인 영역**:
- **Stack**: 각 스레드마다 별도의 스택 (기본 2MB 정도)
- **레지스터**: PC, SP 등 CPU 레지스터
- **TLS(Thread Local Storage)**: 스레드별 전역 변수
- **스레드 ID**

이러한 구조 덕분에 스레드 간 통신이 빠르지만, 동기화 문제에 주의해야 합니다.

**참고자료**
- [POSIX Threads: Thread Local Storage](https://pubs.opengroup.org/onlinepubs/9699919799/functions/pthread_key_create.html)[^27]

</details>

[^27]: POSIX 스레드 로컬 스토리지

### OS-027
"스택"영역과 "힙"영역은 정말 자료구조의 스택/힙과 연관이 있는 걸까요? 만약 그렇다면, 각 주소공간의 동작과정과 연계해서 설명해 주세요.

<details>
<summary>답변</summary>

**Stack 영역 - 자료구조 스택과 직접 연관**:
- LIFO(Last In First Out) 방식으로 동작
- 함수 호출 시 스택 프레임 push, 반환 시 pop
- 스택 포인터(SP)가 가리키는 위치로 관리
- 함수 호출 순서의 역순으로 반환되어야 하므로 스택 구조가 적합

**Heap 영역 - 자료구조 힙과 무관**:
- 자료구조 힙(우선순위 큐)과는 관계 없음
- "heap"은 단순히 "더미, 무더기"라는 의미
- 비순차적으로 할당/해제 가능한 메모리 풀
- 다양한 알고리즘으로 관리 (free list, buddy system 등)

힙 영역은 할당 순서와 무관하게 해제할 수 있어야 하므로 스택 구조가 아닌 동적 메모리 관리 방식을 사용합니다.

**참고자료**
- [Computer Systems: A Programmer's Perspective](https://csapp.cs.cmu.edu/)[^28]

</details>

[^28]: CSAPP - 메모리 계층 구조

### OS-028
IPC의 Shared Memory 기법은 프로세스 주소공간의 어디에 들어가나요? 그런 이유가 있을까요?

<details>
<summary>답변</summary>

**Heap과 Stack 사이의 mmap 영역**에 위치합니다.

**이유**:
1. **유연한 크기 할당**: mmap 영역은 동적으로 크기 조절 가능
2. **주소 충돌 방지**: Heap/Stack 성장과 독립적인 영역
3. **커널 관리 용이**: 페이지 단위로 매핑/해제 가능
4. **공유 설정**: 여러 프로세스의 가상 주소를 같은 물리 페이지에 매핑

**매핑 방식**:
```c
// shmat() 또는 mmap()으로 매핑
void* addr = mmap(NULL, size, PROT_READ|PROT_WRITE,
                  MAP_SHARED, fd, 0);
```

공유 메모리는 각 프로세스에서 다른 가상 주소를 가질 수 있지만, 같은 물리 메모리를 참조합니다.

**참고자료**
- [Linux man-pages: mmap(2)](https://man7.org/linux/man-pages/man2/mmap.2.html)[^29]

</details>

[^29]: Linux mmap() 시스템 콜

### OS-029
스택과 힙영역의 크기는 언제 결정되나요? 프로그램 개발자가 아닌, 사용자가 이 공간의 크기를 수정할 수 있나요?

<details>
<summary>답변</summary>

**Stack 크기 결정 시점**:
- 프로세스 시작 시 OS 기본값 적용 (Linux 기본 8MB)
- 컴파일 시 링커 옵션으로 설정 가능
- 실행 전 `ulimit -s` 명령으로 수정 가능

**Heap 크기 결정 시점**:
- 런타임에 동적으로 결정
- malloc/free 호출에 따라 확장/축소
- 시스템 메모리 한도까지 확장 가능

**사용자가 수정하는 방법**:
```bash
# Stack 크기 변경 (KB 단위)
ulimit -s 16384

# 최대 메모리 제한
ulimit -v unlimited

# /etc/security/limits.conf에서 영구 설정
```

프로그램 실행 시 환경 변수나 런타임 옵션으로도 조정 가능합니다.

**참고자료**
- [Linux man-pages: ulimit](https://man7.org/linux/man-pages/man3/ulimit.3.html)[^30]

</details>

[^30]: Linux ulimit 명령어

---

## 📌 CPU 스케줄링

### OS-030
단기, 중기, 장기 스케쥴러에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**장기 스케줄러 (Long-term Scheduler / Job Scheduler)**:
- 디스크의 작업을 메모리에 적재할지 결정
- degree of multiprogramming 제어
- I/O bound와 CPU bound 프로세스의 적절한 혼합 유지

**중기 스케줄러 (Medium-term Scheduler)**:
- 메모리에서 프로세스를 일시적으로 제거 (swapping)
- 메모리 부족 시 프로세스를 디스크로 스왑 아웃
- 메모리 확보 후 다시 스왑 인

**단기 스케줄러 (Short-term Scheduler / CPU Scheduler)**:
- Ready 큐에서 어떤 프로세스에게 CPU를 할당할지 결정
- 매우 빈번하게 실행 (밀리초 단위)
- 가장 빠른 성능이 요구됨

**참고자료**
- [Linux Kernel: Scheduler](https://www.kernel.org/doc/html/latest/scheduler/)[^31]

</details>

[^31]: Linux 커널 스케줄러 문서

### OS-031
현대 OS에서는 단기, 중기, 장기 스케줄러를 모두 사용하고 있나요?

<details>
<summary>답변</summary>

**현대 OS는 주로 단기 스케줄러만 사용합니다.**

**장기 스케줄러 - 거의 사용 안 함**:
- 과거 배치 시스템에서 사용
- 현대 시분할 시스템에서는 프로세스가 즉시 메모리에 적재
- 가상 메모리로 대체됨

**중기 스케줄러 - 제한적 사용**:
- Swapping 개념은 존재하나 다른 방식으로 구현
- Linux의 OOM Killer: 메모리 부족 시 프로세스 종료
- 페이지 단위 스왑이 프로세스 단위 스왑을 대체

**단기 스케줄러 - 핵심적으로 사용**:
- Linux CFS (Completely Fair Scheduler)
- 실시간 스케줄러 (SCHED_FIFO, SCHED_RR)

**참고자료**
- [Linux CFS Scheduler](https://www.kernel.org/doc/html/latest/scheduler/sched-design-CFS.html)[^32]

</details>

[^32]: Linux CFS 스케줄러 설계 문서

### OS-032
프로세스의 스케쥴링 상태에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**5가지 기본 프로세스 상태**:

| 상태 | 설명 |
|------|------|
| **New** | 프로세스 생성 중 |
| **Ready** | 실행 대기 중, CPU 할당만 기다림 |
| **Running** | CPU에서 실행 중 |
| **Waiting (Blocked)** | I/O나 이벤트 완료 대기 |
| **Terminated** | 실행 완료 |

**상태 전이**:
- New -> Ready: 프로세스 생성 완료
- Ready -> Running: CPU 할당 (dispatch)
- Running -> Ready: 타임 슬라이스 만료, 선점
- Running -> Waiting: I/O 요청, 이벤트 대기
- Waiting -> Ready: I/O 완료, 이벤트 발생
- Running -> Terminated: 실행 완료, exit()

**참고자료**
- [Linux Kernel: Process States](https://github.com/torvalds/linux/blob/master/include/linux/sched.h)[^33]

</details>

[^33]: Linux 프로세스 상태 정의

### OS-033
선점(preemptive) 스케줄링과 비선점(non-preemptive) 스케줄링에서 존재할 수 없는 상태 전이가 있나요?

<details>
<summary>답변</summary>

**비선점(Non-preemptive) 스케줄링에서 불가능한 상태 전이**:

`Running -> Ready` 전이가 **타이머 인터럽트에 의해** 발생할 수 없습니다.

비선점 스케줄링에서는 프로세스가 자발적으로 CPU를 반납할 때만 전이 가능:
- I/O 요청 (Running -> Waiting)
- 프로세스 종료 (Running -> Terminated)
- yield() 호출 (Running -> Ready)

**선점(Preemptive) 스케줄링**에서는 모든 상태 전이 가능:
- 타이머 인터럽트로 강제 전이
- 높은 우선순위 프로세스에 의한 선점

비선점 방식에서는 한 프로세스가 CPU를 독점하면 다른 프로세스가 기아 상태에 빠질 수 있습니다.

**참고자료**
- [Operating System Concepts - Silberschatz](https://www.os-book.com/)[^34]

</details>

[^34]: 운영체제 교과서 - 스케줄링 개념

### OS-034
Memory가 부족할 경우, Process는 어떠한 상태로 변화할까요?

<details>
<summary>답변</summary>

**Suspended (중단) 상태**로 전이될 수 있습니다.

**Suspended Ready**:
- Ready 상태에서 메모리 부족으로 스왑 아웃
- 메모리에 없지만 실행 준비 완료
- 메모리 확보 시 Ready 상태로 복귀

**Suspended Waiting (Suspended Blocked)**:
- Waiting 상태에서 스왑 아웃
- I/O 완료 시 Suspended Ready로 전이
- 메모리 확보 후 Ready 상태로 복귀

**현대 Linux의 처리 방식**:
- 프로세스 단위 스왑보다 페이지 단위 스왑 사용
- OOM Killer: 극심한 메모리 부족 시 프로세스 종료
- cgroups: 메모리 사용량 제한

**참고자료**
- [Linux OOM Killer](https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html)[^35]

</details>

[^35]: Linux 메모리 관리 및 OOM 처리

---

## 📌 컨텍스트 스위칭

### OS-035
컨텍스트 스위칭 시에는 어떤 일들이 일어나나요?

<details>
<summary>답변</summary>

**컨텍스트 스위칭 과정**:

1. **현재 프로세스 상태 저장**
   - CPU 레지스터 (범용, PC, SP, 상태 레지스터)
   - PCB에 저장

2. **커널 모드 진입**
   - 인터럽트 또는 시스템 콜에 의해 발생
   - 권한 레벨 변경

3. **스케줄러 실행**
   - 다음 실행할 프로세스 선택
   - Ready 큐에서 프로세스 선택

4. **새 프로세스 상태 복원**
   - 새 프로세스의 PCB에서 레지스터 복원
   - 메모리 매핑 변경 (페이지 테이블 교체)
   - TLB 플러시 또는 ASID 변경

5. **사용자 모드 복귀**
   - 새 프로세스 실행 시작

컨텍스트 스위칭은 순수한 오버헤드이므로 최소화가 중요합니다.

**참고자료**
- [Linux Kernel: Context Switching](https://www.kernel.org/doc/html/latest/scheduler/)[^36]

</details>

[^36]: Linux 컨텍스트 스위칭 메커니즘

### OS-036
프로세스 컨텍스트 스위칭과 스레드 컨텍스트 스위칭의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**프로세스 컨텍스트 스위칭** (비용 높음):
- CPU 레지스터 저장/복원
- 페이지 테이블 교체 (CR3 레지스터 변경)
- TLB 전체 플러시 필요 (PCID 미사용 시)
- 캐시 미스 증가 가능성
- 메모리 매핑 정보 변경

**스레드 컨텍스트 스위칭** (같은 프로세스 내, 비용 낮음):
- CPU 레지스터 저장/복원
- 스택 포인터 변경
- 페이지 테이블 유지 (주소 공간 공유)
- TLB 유지 가능
- 캐시 히트율 높음

| 구분 | 프로세스 스위칭 | 스레드 스위칭 |
|------|----------------|--------------|
| 페이지 테이블 | 교체 필요 | 유지 |
| TLB | 플러시 | 유지 |
| 캐시 효율 | 낮음 | 높음 |
| 비용 | 높음 | 낮음 |

**참고자료**
- [Linux Kernel: Thread Switching](https://www.kernel.org/doc/html/latest/scheduler/)[^37]

</details>

[^37]: Linux 스레드 스위칭 구현

### OS-037
컨텍스트 스위칭이 발생할 때, 기존의 프로세스 정보는 커널스택에 어떠한 형식으로 저장되나요?

<details>
<summary>답변</summary>

**커널 스택에 저장되는 정보 (스택 프레임 형태)**:

인터럽트/트랩 발생 시 하드웨어가 자동 저장:
```
+------------------+
| SS (스택 세그먼트)  |  <- 사용자 모드에서 온 경우
| RSP (스택 포인터)   |
| RFLAGS (플래그)     |
| CS (코드 세그먼트)   |
| RIP (명령어 포인터)  |
+------------------+
```

커널이 추가 저장 (pt_regs 구조체):
```
+------------------+
| 범용 레지스터      |  RAX, RBX, RCX, RDX...
| 세그먼트 레지스터   |  DS, ES, FS, GS
| 에러 코드         |  예외 시
+------------------+
```

전체 컨텍스트는 PCB(task_struct)의 thread_struct에 저장되며, 커널 스택은 프로세스마다 별도로 존재합니다.

**참고자료**
- [Linux Kernel: pt_regs structure](https://github.com/torvalds/linux/blob/master/arch/x86/include/asm/ptrace.h)[^38]

</details>

[^38]: Linux x86 레지스터 저장 구조체

### OS-038
컨텍스트 스위칭은 언제 일어날까요?

<details>
<summary>답변</summary>

**컨텍스트 스위칭이 발생하는 경우**:

1. **타이머 인터럽트**
   - 타임 슬라이스(quantum) 만료
   - 선점형 스케줄링에서 주기적 발생

2. **I/O 요청**
   - 프로세스가 I/O를 요청하여 Waiting 상태로 전환
   - 다른 Ready 프로세스에게 CPU 할당

3. **시스템 콜**
   - 특정 시스템 콜 후 스케줄러 호출
   - sleep(), yield() 등

4. **인터럽트 처리 후**
   - 하드웨어 인터럽트 처리 완료 후
   - 더 높은 우선순위 프로세스가 Ready 상태가 된 경우

5. **프로세스 종료/생성**
   - exit() 호출 시
   - fork() 후 자식에게 CPU 할당

6. **동기화 대기**
   - mutex, semaphore 획득 실패 시

**참고자료**
- [Linux Kernel: Scheduling Points](https://www.kernel.org/doc/html/latest/scheduler/)[^39]

</details>

[^39]: Linux 스케줄링 포인트

---

## 📌 스케줄링 알고리즘

### OS-039
프로세스 스케줄링 알고리즘에는 어떤 것들이 있나요?

<details>
<summary>답변</summary>

| 알고리즘 | 설명 | 선점 여부 |
|----------|------|-----------|
| **FCFS (FIFO)** | 먼저 도착한 순서대로 실행 | 비선점 |
| **SJF** | 실행 시간이 짧은 작업 우선 | 비선점 |
| **SRTF** | 남은 시간이 짧은 작업 우선 | 선점 |
| **Priority** | 우선순위가 높은 작업 우선 | 둘 다 가능 |
| **Round Robin** | 타임 슬라이스만큼 순환 실행 | 선점 |
| **MLQ** | 여러 큐에 우선순위별 배치 | 선점 |
| **MLFQ** | 동적 우선순위 조정 | 선점 |

**Linux CFS (Completely Fair Scheduler)**:
- 가상 런타임 기반의 공정한 스케줄링
- Red-Black Tree로 프로세스 관리
- O(log n) 복잡도

**참고자료**
- [Linux CFS Scheduler](https://www.kernel.org/doc/html/latest/scheduler/sched-design-CFS.html)[^40]

</details>

[^40]: Linux CFS 스케줄러 설계

### OS-040
RR을 사용할 때, Time Slice에 따른 trade-off를 설명해 주세요.

<details>
<summary>답변</summary>

**Time Slice(Quantum)가 너무 작을 때**:
- 장점: 응답 시간 향상, 대화형 프로세스에 유리
- 단점: 컨텍스트 스위칭 오버헤드 증가
- 극단적으로 작으면 대부분의 시간을 스위칭에 소비

**Time Slice가 너무 클 때**:
- 장점: 컨텍스트 스위칭 오버헤드 감소
- 단점: 응답 시간 증가, FCFS와 유사해짐
- 대화형 프로세스의 반응성 저하

**적절한 Time Slice 결정 기준**:
- 컨텍스트 스위칭 시간보다 충분히 커야 함 (보통 10~100ms)
- 대화형 시스템: 작은 값 선호 (10~20ms)
- 배치 시스템: 큰 값 선호 (100~200ms)

일반적으로 컨텍스트 스위칭 시간의 100배 이상이 적절합니다.

**참고자료**
- [Linux Kernel: Scheduler Tuning](https://www.kernel.org/doc/html/latest/scheduler/sched-design-CFS.html)[^41]

</details>

[^41]: Linux 스케줄러 튜닝 가이드

### OS-041
싱글 스레드 CPU 에서 상시로 돌아가야 하는 프로세스가 있다면, 어떤 스케쥴링 알고리즘을 사용하는 것이 좋을까요? 또 왜 그럴까요?

<details>
<summary>답변</summary>

**우선순위 기반 선점 스케줄링 (Priority Preemptive)** 또는 **실시간 스케줄링 (SCHED_FIFO, SCHED_RR)**이 적합합니다.

**이유**:
1. **높은 우선순위 부여**: 상시 실행 프로세스에 최고 우선순위 할당
2. **선점 보장**: 다른 프로세스가 실행 중이어도 즉시 CPU 획득
3. **예측 가능한 실행**: 응답 시간 보장

**Linux 실시간 스케줄링**:
```c
struct sched_param param;
param.sched_priority = 99;  // 최고 우선순위
sched_setscheduler(pid, SCHED_FIFO, &param);
```

**주의사항**:
- 다른 프로세스의 기아(starvation) 가능성
- 상시 프로세스가 CPU를 독점하지 않도록 적절한 sleep 필요
- Watchdog 같은 시스템 프로세스에 적합

**참고자료**
- [Linux man-pages: sched(7)](https://man7.org/linux/man-pages/man7/sched.7.html)[^42]

</details>

[^42]: Linux 실시간 스케줄링 정책

### OS-042
동시성과 병렬성의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**동시성 (Concurrency)**:
- 여러 작업이 **논리적으로 동시에** 진행되는 것처럼 보임
- 싱글 코어에서도 가능 (시분할, 컨텍스트 스위칭)
- 작업들이 번갈아가며 실행
- 예: 한 명의 요리사가 여러 요리를 번갈아 진행

**병렬성 (Parallelism)**:
- 여러 작업이 **물리적으로 동시에** 실행
- 멀티 코어/프로세서 필요
- 실제로 같은 시점에 여러 작업 수행
- 예: 여러 요리사가 각자 요리를 동시에 진행

| 구분 | 동시성 | 병렬성 |
|------|--------|--------|
| 실행 | 논리적 동시 | 물리적 동시 |
| 코어 | 싱글 코어 가능 | 멀티 코어 필요 |
| 목적 | 응답성 향상 | 처리량 향상 |
| 관계 | 병렬성 포함 가능 | 동시성 포함 |

**참고자료**
- [Go Blog: Concurrency is not Parallelism](https://go.dev/blog/waza-talk)[^43]

</details>

[^43]: Rob Pike의 동시성과 병렬성 설명

### OS-043
타 스케쥴러와 비교하여, Multi-level Feedback Queue는 어떤 문제점들을 해결한다고 볼 수 있을까요?

<details>
<summary>답변</summary>

**MLFQ가 해결하는 문제점들**:

1. **SJF의 실행 시간 예측 문제**
   - SJF는 실행 시간을 미리 알아야 함
   - MLFQ는 과거 행동을 기반으로 동적 판단

2. **우선순위 스케줄링의 기아(Starvation) 문제**
   - 낮은 우선순위 프로세스가 영원히 대기
   - MLFQ는 주기적 부스팅(aging)으로 해결

3. **RR의 응답성 vs 처리량 딜레마**
   - I/O bound: 높은 우선순위 큐 (짧은 quantum)
   - CPU bound: 낮은 우선순위 큐 (긴 quantum)

4. **프로세스 특성 변화 대응**
   - 프로세스의 I/O/CPU bound 특성이 실행 중 변할 수 있음
   - 동적으로 큐 이동하여 적응

**MLFQ 규칙**:
- 새 프로세스는 최상위 큐에서 시작
- 타임 슬라이스 소진 시 하위 큐로 이동
- 주기적으로 모든 프로세스를 최상위로 부스팅

**참고자료**
- [OSTEP: Multi-level Feedback Queue](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf)[^44]

</details>

[^44]: OSTEP MLFQ 스케줄링 챕터

### OS-044
FIFO 스케쥴러는 정말 쓸모가 없는 친구일까요? 어떤 시나리오에 사용하면 좋을까요?

<details>
<summary>답변</summary>

**FIFO(FCFS)가 적합한 시나리오**:

1. **배치 처리 시스템**
   - 야간 배치 작업, 데이터 처리 파이프라인
   - 응답 시간보다 처리 순서가 중요

2. **비슷한 실행 시간의 작업들**
   - 모든 작업의 실행 시간이 유사할 때
   - Convoy Effect가 발생하지 않음

3. **실시간 시스템에서 같은 우선순위 작업**
   - Linux SCHED_FIFO: 같은 우선순위 내에서 FIFO
   - 선점되지 않는 한 완료까지 실행

4. **단순함이 중요한 시스템**
   - 구현 및 디버깅이 쉬움
   - 오버헤드가 거의 없음
   - 임베디드 시스템, 리소스 제한 환경

**장점**:
- 구현 단순, 오버헤드 최소
- 기아 없음 (모든 작업 순서대로 실행)
- 예측 가능한 실행 순서

**참고자료**
- [Linux man-pages: SCHED_FIFO](https://man7.org/linux/man-pages/man7/sched.7.html)[^45]

</details>

[^45]: Linux SCHED_FIFO 정책

### OS-045
우리는 스케줄링 알고리즘을 "프로세스" 스케줄링 알고리즘이라고 부릅니다. 스레드는 다른 방식으로 스케줄링을 하나요?

<details>
<summary>답변</summary>

**Linux에서는 프로세스와 스레드를 동일하게 스케줄링합니다.**

Linux 커널은 프로세스와 스레드를 모두 `task_struct`로 관리하며, 스케줄러 관점에서 동등하게 취급합니다. 스케줄링의 기본 단위는 "task"입니다.

**스케줄링 모델에 따른 차이**:

| 모델 | 스케줄링 주체 | 특징 |
|------|---------------|------|
| **1:1 (커널 스레드)** | 커널 | Linux 기본, 모든 스레드가 커널에 의해 스케줄링 |
| **N:1 (유저 스레드)** | 유저 라이브러리 | 커널은 프로세스만 인식, 라이브러리가 스레드 스케줄링 |
| **M:N (하이브리드)** | 둘 다 | 유저/커널 스레드 매핑, Go goroutine 등 |

현대 Linux(NPTL)는 1:1 모델을 사용하므로, 각 스레드가 독립적인 커널 스케줄링 대상입니다.

**참고자료**
- [Linux NPTL](https://man7.org/linux/man-pages/man7/nptl.7.html)[^46]

</details>

[^46]: Linux Native POSIX Thread Library

### OS-046
유저 스레드와 커널 스레드의 스케쥴링 알고리즘은 똑같을까요?

<details>
<summary>답변</summary>

**다릅니다.** 각각 다른 스케줄러에 의해 관리됩니다.

**커널 스레드 스케줄링**:
- OS 커널의 스케줄러가 담당
- CFS, 실시간 스케줄러 등 사용
- 시스템 전체 관점에서 공정성 보장
- 하드웨어 타이머 기반 선점

**유저 스레드 스케줄링**:
- 유저 공간 라이브러리/런타임이 담당
- 애플리케이션별 맞춤 알고리즘 가능
- 협력적(cooperative) 스케줄링이 일반적
- 컨텍스트 스위칭 비용 낮음

**예시**:
- **Go goroutine**: Go 런타임의 M:N 스케줄러
- **Java Virtual Threads**: JVM의 협력적 스케줄링
- **Python greenlet**: 유저 레벨 협력적 스케줄링

유저 스레드의 장점은 커스터마이징과 낮은 오버헤드, 단점은 멀티코어 활용 제한(N:1 모델)입니다.

**참고자료**
- [Go Scheduler Design](https://golang.org/src/runtime/proc.go)[^47]

</details>

[^47]: Go 런타임 스케줄러 구현

---

## 📌 프로세스 동기화 문제

### OS-047
뮤텍스와 세마포어의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | 뮤텍스 (Mutex) | 세마포어 (Semaphore) |
|------|---------------|---------------------|
| 값 | 이진 (0 또는 1) | 정수 (0 이상) |
| 소유권 | 있음 (lock한 스레드만 unlock 가능) | 없음 |
| 용도 | 상호 배제 (mutual exclusion) | 자원 카운팅, 동기화 |
| 해제 | 소유자만 가능 | 누구나 가능 |

**뮤텍스**:
- 한 번에 하나의 스레드만 임계 영역 접근
- 잠금을 획득한 스레드만 해제 가능
- Priority Inheritance 지원 가능

**세마포어**:
- N개의 스레드가 동시 접근 가능 (counting semaphore)
- 생산자-소비자 문제 해결에 적합
- 신호(signaling) 메커니즘으로 사용 가능

```c
// 뮤텍스: 단일 자원 보호
pthread_mutex_lock(&mutex);
// 세마포어: N개 자원 관리
sem_wait(&semaphore);  // 카운트 감소
```

**참고자료**
- [POSIX Threads: pthread_mutex](https://pubs.opengroup.org/onlinepubs/9699919799/functions/pthread_mutex_lock.html)[^48]

</details>

[^48]: POSIX 뮤텍스 표준

### OS-048
이진 세마포어(Binary Semaphore)와 뮤텍스(Mutex)의 차이점을 설명해 주세요.

<details>
<summary>답변</summary>

둘 다 값이 0 또는 1이지만 중요한 차이가 있습니다.

| 구분 | 이진 세마포어 | 뮤텍스 |
|------|--------------|--------|
| **소유권** | 없음 | 있음 |
| **해제** | 아무나 가능 | 소유자만 가능 |
| **용도** | 시그널링, 동기화 | 상호 배제 |
| **Priority Inheritance** | 미지원 | 지원 가능 |
| **재귀 잠금** | 불가 | 지원 가능 (recursive mutex) |

**예시 차이점**:
```c
// 이진 세마포어: 스레드 A가 wait, 스레드 B가 signal 가능
// 이벤트 통지에 적합

// 뮤텍스: 잠금한 스레드만 해제 가능
// 임계 영역 보호에 적합
```

**핵심 차이**: 뮤텍스는 "소유권" 개념이 있어 잠금을 획득한 스레드만 해제할 수 있지만, 이진 세마포어는 다른 스레드가 해제할 수 있습니다.

**참고자료**
- [Linux man-pages: sem_overview](https://man7.org/linux/man-pages/man7/sem_overview.7.html)[^49]

</details>

[^49]: Linux 세마포어 개요

### OS-049
Lock을 얻기 위해 대기하는 프로세스들은 Spin Lock 기법을 사용할 수 있습니다. 이 방법의 장단점은 무엇인가요? 단점을 해결할 방법은 없을까요?

<details>
<summary>답변</summary>

**Spin Lock**: 락 획득까지 루프를 돌며 계속 확인 (busy waiting)

**장점**:
- 컨텍스트 스위칭 오버헤드 없음
- 짧은 대기 시간에 효율적
- 구현이 단순함
- 멀티코어에서 효과적

**단점**:
- CPU 자원 낭비 (busy waiting)
- 싱글 코어에서 비효율적 (락 소유자 실행 불가)
- 대기 시간이 길면 심각한 낭비
- Priority Inversion 문제 가능

**해결 방법**:
1. **Adaptive Spin Lock**: 일정 횟수 스핀 후 sleep
2. **Hybrid Lock**: 짧은 스핀 후 블로킹 대기로 전환
3. **Exponential Backoff**: 스핀 간격을 점차 증가
4. **MCS/CLH Lock**: 공정성을 보장하는 큐 기반 스핀락

```c
// Linux kernel의 spin_lock
spin_lock(&lock);    // 커널에서는 인터럽트 비활성화와 함께 사용
```

**참고자료**
- [Linux Kernel: Spinlocks](https://www.kernel.org/doc/html/latest/locking/spinlocks.html)[^50]

</details>

[^50]: Linux 커널 스핀락 문서

### OS-050
뮤텍스와 세마포어 모두 커널이 관리하기 때문에, Lock을 얻고 방출하는 과정에서 시스템 콜을 호출해야 합니다. 이 방법의 장단점이 있을까요? 단점을 해결할 수 있는 방법은 없을까요?

<details>
<summary>답변</summary>

**장점**:
- 커널이 대기 큐 관리 -> 공정성 보장
- 프로세스 간 동기화 가능
- 블로킹 대기로 CPU 낭비 없음
- 우선순위 상속 등 고급 기능 지원

**단점**:
- 시스템 콜 오버헤드 (모드 전환 비용)
- 경쟁이 없는 경우에도 오버헤드 발생
- 빈번한 락 사용 시 성능 저하

**해결 방법**:

1. **Futex (Fast Userspace Mutex)**:
   - 경쟁이 없으면 유저 공간에서만 처리
   - 경쟁 발생 시에만 커널 호출
   - Linux pthread_mutex의 실제 구현

2. **Lock-Free 자료구조**:
   - CAS 등 원자적 연산 사용
   - 락 자체를 사용하지 않음

3. **User-space Spin Lock**:
   - 짧은 임계 영역에서 효과적
   - 커널 개입 없음

**참고자료**
- [Linux man-pages: futex(7)](https://man7.org/linux/man-pages/man7/futex.7.html)[^51]

</details>

[^51]: Linux Futex 개요

### OS-051
Deadlock 에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**교착 상태(Deadlock)**는 두 개 이상의 프로세스가 서로 상대방이 점유한 자원을 기다리며 무한히 대기하는 상태입니다.

**예시**:
```
프로세스 A: 자원 1 점유, 자원 2 대기
프로세스 B: 자원 2 점유, 자원 1 대기
-> 서로 영원히 대기
```

**특징**:
- 모든 프로세스가 영원히 진행 불가
- 자원 낭비 (점유된 자원 사용 불가)
- 외부 개입 없이 해결 불가

**실생활 비유**:
좁은 골목에서 두 차가 마주침. 양쪽 다 상대가 빠지기를 기다리며 이동 불가.

**데이터베이스에서**:
트랜잭션 A가 row1 잠금, row2 대기
트랜잭션 B가 row2 잠금, row1 대기

**참고자료**
- [Linux Kernel: Lockdep](https://www.kernel.org/doc/html/latest/locking/lockdep-design.html)[^52]

</details>

[^52]: Linux 커널 데드락 탐지 도구

### OS-052
Deadlock이 발생하기 위한 4가지 필요조건에 대해 설명해 주세요.

<details>
<summary>답변</summary>

교착 상태는 다음 **4가지 조건이 모두 충족**될 때 발생합니다:

1. **상호 배제 (Mutual Exclusion)**
   - 자원은 한 번에 하나의 프로세스만 사용 가능
   - 예: 프린터, 뮤텍스

2. **점유 대기 (Hold and Wait)**
   - 자원을 점유한 상태에서 다른 자원을 기다림
   - 하나 이상의 자원을 가진 채로 추가 자원 요청

3. **비선점 (No Preemption)**
   - 점유된 자원을 강제로 빼앗을 수 없음
   - 프로세스가 자발적으로 반납해야 함

4. **순환 대기 (Circular Wait)**
   - 프로세스들이 순환 형태로 자원을 대기
   - P1 -> P2 -> P3 -> P1 형태의 대기 사이클

이 4가지 조건이 동시에 성립해야 데드락 발생. 하나라도 깨면 데드락 방지 가능.

**참고자료**
- [Coffman conditions - Operating System Concepts](https://www.os-book.com/)[^53]

</details>

[^53]: 데드락의 필요충분조건 (Coffman conditions)

### OS-053
Deadlock의 4가지 조건 중 3가지만 충족하면 왜 Deadlock이 발생하지 않나요?

<details>
<summary>답변</summary>

각 조건이 빠졌을 때 데드락이 발생하지 않는 이유:

**상호 배제가 없는 경우**:
- 자원을 동시에 공유 가능
- 대기할 필요 없이 모두 접근 가능
- 예: 읽기 전용 파일

**점유 대기가 없는 경우**:
- 모든 자원을 한 번에 요청하거나
- 자원 요청 전 점유 자원 모두 반납
- 순환 대기가 형성될 수 없음

**비선점이 없는 경우**:
- 필요시 다른 프로세스의 자원을 빼앗을 수 있음
- 순환 대기를 강제로 깨뜨릴 수 있음
- 예: 메모리 페이지 교체

**순환 대기가 없는 경우**:
- 자원에 순서 부여하고 순서대로만 요청
- 선형 대기만 존재 -> 사이클 형성 불가
- 예: 자원 번호 오름차순으로만 요청

4가지 조건은 **필요조건**이므로 하나라도 없으면 데드락 불가능.

**참고자료**
- [OSTEP: Deadlock](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf)[^54]

</details>

[^54]: OSTEP 동시성 버그 챕터

### OS-054
Deadlock을 예방하거나 해결하는 방법에는 무엇이 있나요?

<details>
<summary>답변</summary>

**1. 예방 (Prevention)** - 4가지 조건 중 하나 제거:
- **상호 배제 제거**: 가능하면 공유 자원 사용 (실용적이지 않음)
- **점유 대기 제거**: 모든 자원 한 번에 요청, 또는 자원 없이 요청
- **비선점 허용**: 자원 선점 가능하게 설계
- **순환 대기 제거**: 자원에 순서 부여, 오름차순 요청만 허용

**2. 회피 (Avoidance)** - 안전 상태 유지:
- **Banker's Algorithm**: 자원 요청 시 안전 상태 검사
- 안전하지 않으면 요청 거부

**3. 탐지 및 복구 (Detection & Recovery)**:
- 주기적으로 자원 할당 그래프 검사
- 데드락 발견 시: 프로세스 종료 또는 자원 선점

**4. 무시 (Ostrich Algorithm)**:
- 데드락을 무시하고 발생 시 재시작
- 현대 대부분의 OS가 채택 (빈도가 낮고 비용이 높음)

**참고자료**
- [Banker's Algorithm](https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/)[^55]

</details>

[^55]: Banker's Algorithm 설명

### OS-055
현대 운영체제(Linux, Windows 등)에서 Deadlock을 적극적으로 처리하지 않는 이유는 무엇인가요?

<details>
<summary>답변</summary>

현대 OS(Linux, Windows 등)는 **Ostrich Algorithm**을 채택합니다.

**데드락 처리를 하지 않는 이유**:

1. **발생 빈도가 낮음**
   - 대부분의 애플리케이션에서 드물게 발생
   - 비용 대비 효과가 낮음

2. **처리 비용이 높음**
   - 탐지: 주기적인 그래프 검사 오버헤드
   - 예방: 자원 활용률 저하, 기아 가능성
   - 회피: Banker's Algorithm의 높은 계산 비용

3. **복구가 어려움**
   - 어떤 프로세스를 종료할지 결정 어려움
   - 자원 선점 시 일관성 문제

4. **사용자가 해결 가능**
   - 프로세스 강제 종료
   - 시스템 재시작

**대신 사용하는 방법**:
- 타임아웃 기반 처리
- 애플리케이션 레벨에서 데드락 방지 설계
- 데이터베이스: 데드락 탐지 및 트랜잭션 롤백

**참고자료**
- [Operating System Concepts - Silberschatz](https://www.os-book.com/)[^56]

</details>

[^56]: 운영체제 교과서 - 데드락 무시 전략

### OS-056
Wait Free와 Lock Free를 비교해 주세요.

<details>
<summary>답변</summary>

둘 다 락 없이 동시성을 보장하는 비차단(non-blocking) 알고리즘입니다.

| 구분 | Lock-Free | Wait-Free |
|------|-----------|-----------|
| **보장** | 시스템 전체 진행 보장 | 개별 스레드 진행 보장 |
| **기아** | 가능 | 불가능 |
| **구현** | 상대적으로 쉬움 | 매우 어려움 |
| **성능** | 일반적으로 좋음 | 오버헤드 있을 수 있음 |

**Lock-Free**:
- 최소 하나의 스레드는 항상 진행
- 다른 스레드에 의해 지연될 수 있음
- CAS 기반 자료구조에서 흔함

**Wait-Free**:
- 모든 스레드가 유한 단계 내 완료 보장
- 어떤 스레드도 무한 대기 없음
- 실시간 시스템에 적합

```c
// Lock-free: CAS 실패 시 재시도 (무한 가능성)
while (!CAS(&ptr, expected, new_value)) { retry; }

// Wait-free: 유한 단계 보장
```

**참고자료**
- [The Art of Multiprocessor Programming](https://www.elsevier.com/books/the-art-of-multiprocessor-programming)[^57]

</details>

[^57]: 멀티프로세서 프로그래밍 - Lock-Free/Wait-Free

---

## 📌 컴파일

### OS-057
프로그램이 컴파일 되어, 실행되는 과정을 간략하게 설명해 주세요.

<details>
<summary>답변</summary>

**1. 전처리 (Preprocessing)**
- 매크로 확장 (#define)
- 헤더 파일 포함 (#include)
- 조건부 컴파일 처리
- 출력: .i 파일

**2. 컴파일 (Compilation)**
- 소스 코드 -> 어셈블리 코드 변환
- 문법 검사, 최적화
- 출력: .s 파일

**3. 어셈블 (Assembly)**
- 어셈블리 코드 -> 기계어(오브젝트 코드) 변환
- 출력: .o 파일

**4. 링킹 (Linking)**
- 여러 오브젝트 파일과 라이브러리 결합
- 심볼 해결, 주소 결정
- 출력: 실행 파일

**5. 로딩 (Loading)**
- 실행 파일을 메모리에 적재
- 주소 재배치 (동적 링킹 시)
- 프로세스 생성 및 실행 시작

**참고자료**
- [GCC Compilation Process](https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html)[^58]

</details>

[^58]: GCC 컴파일 과정 문서

### OS-058
링커와, 로더의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | 링커 (Linker) | 로더 (Loader) |
|------|--------------|---------------|
| **시점** | 컴파일 타임 | 런타임 |
| **입력** | 오브젝트 파일들 (.o) | 실행 파일 |
| **출력** | 실행 파일 | 메모리에 적재된 프로세스 |
| **역할** | 심볼 해결, 파일 결합 | 메모리 적재, 주소 바인딩 |

**링커의 역할**:
- 여러 오브젝트 파일을 하나로 결합
- 외부 심볼 참조 해결 (함수, 변수)
- 라이브러리 연결 (정적/동적)
- 재배치 정보 생성

**로더의 역할**:
- 실행 파일을 메모리에 적재
- 메모리 주소 할당
- 동적 라이브러리 로드 (동적 링킹 시)
- 재배치 수행
- 프로세스 초기화 및 시작점으로 점프

**동적 링커/로더 (ld-linux.so)**:
- 런타임에 공유 라이브러리 로드
- 링커와 로더의 역할을 동시에 수행

**참고자료**
- [Linux man-pages: ld-linux(8)](https://man7.org/linux/man-pages/man8/ld-linux.8.html)[^59]

</details>

[^59]: Linux 동적 링커/로더

### OS-059
컴파일 언어와 인터프리터 언어의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

| 구분 | 컴파일 언어 | 인터프리터 언어 |
|------|------------|-----------------|
| **변환 시점** | 실행 전 전체 변환 | 실행 중 한 줄씩 변환 |
| **실행 속도** | 빠름 | 느림 |
| **개발 속도** | 느림 (컴파일 필요) | 빠름 (즉시 실행) |
| **오류 발견** | 컴파일 타임 | 런타임 |
| **이식성** | 낮음 (플랫폼별 컴파일) | 높음 |
| **예시** | C, C++, Rust, Go | Python, JavaScript, Ruby |

**컴파일 언어**:
- 소스 코드 -> 기계어로 완전 변환
- 실행 파일 생성
- 최적화 적용 용이

**인터프리터 언어**:
- 실행 시 한 줄씩 해석
- 별도 실행 파일 없음
- 동적 타이핑, 리플렉션 용이

**하이브리드 방식**:
- Java: 바이트코드 컴파일 + JVM 인터프리터/JIT
- Python: 바이트코드 컴파일 + PVM 인터프리터

**참고자료**
- [LLVM Documentation](https://llvm.org/docs/)[^60]

</details>

[^60]: LLVM 컴파일러 인프라 문서

### OS-060
JIT에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**JIT (Just-In-Time) 컴파일**은 프로그램 실행 중에 바이트코드를 기계어로 컴파일하는 기술입니다.

**동작 방식**:
1. 소스 코드 -> 바이트코드 (사전 컴파일)
2. 실행 시작: 인터프리터로 바이트코드 실행
3. **핫스팟 탐지**: 자주 실행되는 코드 식별
4. **JIT 컴파일**: 핫스팟을 기계어로 컴파일
5. 이후 해당 코드는 컴파일된 버전 실행

**장점**:
- 인터프리터보다 빠른 실행 속도
- 런타임 정보 기반 최적화 가능
- 플랫폼 독립성 유지

**단점**:
- 초기 실행 시 워밍업 시간 필요
- 메모리 사용량 증가
- 컴파일 오버헤드

**사용 예시**:
- Java HotSpot VM
- JavaScript V8 엔진
- .NET CLR
- PyPy

**참고자료**
- [JVM JIT Compiler](https://docs.oracle.com/en/java/javase/17/vm/java-hotspot-virtual-machine-performance-enhancements.html)[^61]

</details>

[^61]: Java HotSpot JIT 컴파일러 문서

### OS-061
본인이 사용하는 언어는, 어떤식으로 컴파일 및 실행되는지 설명해 주세요.

<details>
<summary>답변</summary>

**[Java의 경우]**
1. javac: .java -> .class (바이트코드)
2. JVM 로딩: 클래스 로더가 바이트코드 로드
3. 바이트코드 검증
4. 인터프리터 실행 + JIT 컴파일 (HotSpot)
5. GC가 메모리 관리

**[Python의 경우]**
1. .py -> .pyc (바이트코드, 자동 캐싱)
2. PVM(Python Virtual Machine)이 바이트코드 인터프리팅
3. GIL(Global Interpreter Lock) 하에서 실행

**[C/C++의 경우]**
1. 전처리 -> 컴파일 -> 어셈블 -> 링킹
2. 네이티브 실행 파일 생성
3. 로더가 메모리에 적재 후 실행

**[JavaScript의 경우]**
1. 파싱: AST 생성
2. V8: 바이트코드 생성 (Ignition)
3. 핫 코드 JIT 컴파일 (TurboFan)

면접 시 본인이 주로 사용하는 언어에 맞게 설명하세요.

**참고자료**
- [JVM Specification](https://docs.oracle.com/javase/specs/jvms/se17/html/)[^62]

</details>

[^62]: JVM 명세 문서

### OS-062
Python 같은 언어는 CPython, Jython, PyPy등의 다양한 구현체가 있습니다. 각각은 어떤 차이가 있을까요? 또한, 실행되는 과정 또한 다를까요?

<details>
<summary>답변</summary>

| 구현체 | 구현 언어 | 실행 환경 | 특징 |
|--------|----------|----------|------|
| **CPython** | C | 자체 PVM | 기본 구현체, GIL 존재 |
| **Jython** | Java | JVM | Java 라이브러리 사용 가능 |
| **PyPy** | Python | 자체 | JIT 컴파일, 빠른 속도 |
| **IronPython** | C# | .NET CLR | .NET 통합 |

**CPython**:
- .py -> 바이트코드(.pyc) -> PVM 인터프리팅
- C 확장 모듈 지원
- GIL로 인한 멀티스레딩 제한

**Jython**:
- .py -> JVM 바이트코드(.class)
- JVM에서 실행
- Java 클래스 직접 사용 가능
- GIL 없음

**PyPy**:
- .py -> 바이트코드 -> JIT 컴파일
- RPython으로 작성된 인터프리터
- CPython보다 평균 4~5배 빠름
- C 확장 호환성 제한

**참고자료**
- [PyPy Documentation](https://doc.pypy.org/)[^63]

</details>

[^63]: PyPy 공식 문서

### OS-063
우리는 흔히 fork(), exec() 시스템 콜을 사용하여 프로세스를 적재할 수 있다고 배웠습니다. 로더의 역할은 이 시스템 콜과 상관있는 걸까요? 아니면 다른 방식으로 프로세스를 적재할 수 있는 건가요?

<details>
<summary>답변</summary>

**로더와 시스템 콜의 관계**:

**exec() 시스템 콜이 로더 역할을 수행합니다.**

`exec()` 호출 시 커널 내부에서:
1. 실행 파일 포맷 확인 (ELF)
2. 현재 프로세스의 주소 공간 해제
3. 새 프로그램의 코드, 데이터 로드
4. 스택, 힙 초기화
5. 동적 링커(ld-linux.so) 로드 (필요시)
6. 프로그램 진입점(entry point)으로 점프

**fork()와 exec()의 역할**:
- `fork()`: 프로세스 복제 (메모리 공간 복사)
- `exec()`: 새 프로그램 로드 (로더 역할)

**로더의 구현 위치**:
```
커널: 정적 링킹된 실행 파일 로드, ELF 파싱
ld-linux.so: 동적 라이브러리 로드, 심볼 해결
```

쉘에서 프로그램 실행 시: `fork() -> exec()` 조합 사용.

**참고자료**
- [Linux man-pages: execve(2)](https://man7.org/linux/man-pages/man2/execve.2.html)[^64]

</details>

[^64]: Linux execve() 시스템 콜

---

## 📌 IPC 및 스레드 안전성

### OS-064
IPC가 무엇이고, 어떤 종류가 있는지 설명해 주세요.

<details>
<summary>답변</summary>

**IPC (Inter-Process Communication)**는 프로세스 간 데이터를 주고받는 메커니즘입니다.

| 방식 | 특징 | 사용 사례 |
|------|------|----------|
| **Pipe** | 단방향, 부모-자식 간 | 쉘 파이프 (`\|`) |
| **Named Pipe (FIFO)** | 단방향, 무관계 프로세스 | 파일 시스템 기반 |
| **Message Queue** | 비동기, 메시지 단위 | 작업 큐 |
| **Shared Memory** | 가장 빠름, 동기화 필요 | 대용량 데이터 공유 |
| **Semaphore** | 동기화 도구 | 자원 접근 제어 |
| **Socket** | 네트워크 통신 가능 | 클라이언트-서버 |
| **Signal** | 비동기 알림 | 이벤트 통지 |
| **Memory-mapped File** | 파일 기반 공유 메모리 | 대용량 파일 처리 |

**선택 기준**:
- 데이터 크기: 작음(파이프) vs 큼(공유 메모리)
- 프로세스 관계: 부모-자식(파이프) vs 무관계(소켓)
- 동기/비동기: 동기(파이프) vs 비동기(메시지 큐)

**참고자료**
- [Linux man-pages: ipc(7)](https://man7.org/linux/man-pages/man7/sysvipc.7.html)[^65]

</details>

[^65]: Linux System V IPC 개요

### OS-065
Shared Memory가 무엇이며, 사용할 때 유의해야 할 점에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Shared Memory**는 여러 프로세스가 동일한 물리 메모리 영역을 공유하는 IPC 방식입니다.

**특징**:
- 가장 빠른 IPC (커널 개입 최소화)
- 데이터 복사 없이 직접 접근
- 대용량 데이터 공유에 적합

**사용 방법** (POSIX):
```c
int fd = shm_open("/myshm", O_CREAT | O_RDWR, 0666);
ftruncate(fd, SIZE);
void *ptr = mmap(NULL, SIZE, PROT_READ|PROT_WRITE, MAP_SHARED, fd, 0);
```

**유의사항**:

1. **동기화 필수**
   - 여러 프로세스의 동시 접근 -> Race Condition
   - 세마포어, 뮤텍스로 보호 필요

2. **메모리 정리**
   - 사용 후 명시적으로 해제 (shm_unlink)
   - 그렇지 않으면 시스템 재시작까지 유지

3. **크기 제한**
   - `/proc/sys/kernel/shmmax`로 확인

4. **포인터 주의**
   - 각 프로세스의 가상 주소가 다를 수 있음

**참고자료**
- [Linux man-pages: shm_open(3)](https://man7.org/linux/man-pages/man3/shm_open.3.html)[^66]

</details>

[^66]: POSIX 공유 메모리 함수

### OS-066
IPC에서 메시지 큐(Message Queue)는 단방향 통신만 가능한가요?

<details>
<summary>답변</summary>

**아니요, 메시지 큐는 양방향 통신이 가능합니다.**

**메시지 큐의 특성**:
- 하나의 큐로 여러 프로세스가 송수신 가능
- 메시지 타입(mtype)으로 선택적 수신 가능
- 파이프와 달리 방향 제한 없음

**양방향 통신 방법**:

1. **단일 큐 사용**:
   - 메시지 타입으로 구분
   - 프로세스 A: type 1 송신, type 2 수신
   - 프로세스 B: type 2 송신, type 1 수신

2. **두 개의 큐 사용**:
   - 큐 1: A -> B
   - 큐 2: B -> A
   - 더 명확한 구조

**파이프와의 비교**:
| 구분 | Pipe | Message Queue |
|------|------|---------------|
| 방향 | 단방향 | 양방향 가능 |
| 데이터 | 바이트 스트림 | 메시지 단위 |
| 선택 수신 | 불가 | 타입별 가능 |
| 수명 | 프로세스 종료 시 | 명시적 삭제까지 |

**참고자료**
- [Linux man-pages: mq_overview(7)](https://man7.org/linux/man-pages/man7/mq_overview.7.html)[^67]

</details>

[^67]: POSIX 메시지 큐 개요

### OS-067
Thread Safe 하다는 것은 어떤 의미인가요?

<details>
<summary>답변</summary>

**Thread Safe**란 여러 스레드가 동시에 접근해도 프로그램이 올바르게 동작하는 것을 의미합니다.

**Thread Safe 조건**:
1. 공유 데이터 접근 시 올바른 결과 보장
2. Race Condition 없음
3. 데이터 일관성 유지
4. 데드락 없음

**Thread Safe가 아닌 예시**:
```c
int counter = 0;
void increment() {
    counter++;  // read-modify-write: 원자적이지 않음
}
// 두 스레드가 동시 실행 시 결과 예측 불가
```

**Thread Safe 구현 방법**:
1. **상호 배제**: 뮤텍스, 세마포어
2. **원자적 연산**: atomic 변수
3. **불변 객체**: 상태 변경 불가
4. **Thread Local Storage**: 스레드별 데이터
5. **Lock-Free 자료구조**: CAS 기반

Thread Safe한 코드는 멀티스레드 환경에서 안전하게 호출할 수 있습니다.

**참고자료**
- [POSIX Thread Safety](https://pubs.opengroup.org/onlinepubs/9699919799/functions/V2_chap02.html)[^68]

</details>

[^68]: POSIX 스레드 안전성 정의

### OS-068
Thread Safe를 보장하기 위해 어떤 방법들을 사용할 수 있나요?

<details>
<summary>답변</summary>

**1. 상호 배제 (Mutual Exclusion)**
```c
pthread_mutex_lock(&mutex);
// 임계 영역
pthread_mutex_unlock(&mutex);
```

**2. 원자적 연산 (Atomic Operations)**
```c
atomic_fetch_add(&counter, 1);  // 원자적 증가
```

**3. Thread Local Storage (TLS)**
```c
__thread int local_var;  // 각 스레드별 별도 변수
```

**4. 불변 객체 (Immutable Objects)**
- 생성 후 상태 변경 불가
- 공유해도 안전

**5. 읽기-쓰기 락 (Read-Write Lock)**
```c
pthread_rwlock_rdlock(&rwlock);  // 읽기: 동시 허용
pthread_rwlock_wrlock(&rwlock);  // 쓰기: 배타적
```

**6. 조건 변수 (Condition Variable)**
- 특정 조건까지 대기/통지

**7. Lock-Free 자료구조**
- CAS 기반 구현
- 락 없이 동시성 보장

**선택 기준**: 성능 vs 구현 복잡도 트레이드오프

**참고자료**
- [C11 Atomic Operations](https://en.cppreference.com/w/c/atomic)[^69]

</details>

[^69]: C11 원자적 연산 표준

### OS-069
Peterson's Algorithm 이 무엇이며, 한계점에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Peterson's Algorithm**은 두 프로세스 간 상호 배제를 소프트웨어적으로 구현한 알고리즘입니다.

```c
int flag[2] = {false, false};
int turn;

void lock(int i) {
    int j = 1 - i;
    flag[i] = true;      // 진입 의사 표시
    turn = j;            // 양보
    while (flag[j] && turn == j);  // 대기
}

void unlock(int i) {
    flag[i] = false;
}
```

**특징**:
- 상호 배제, 진행, 한정 대기 모두 만족
- 하드웨어 지원 없이 구현

**한계점**:

1. **두 프로세스만 가능**
   - N개로 확장하려면 복잡해짐 (Bakery Algorithm)

2. **Busy Waiting**
   - while 루프로 CPU 낭비

3. **현대 CPU에서 동작 안 함**
   - 컴파일러/CPU의 명령어 재배치 (out-of-order)
   - 메모리 가시성 문제
   - Memory Barrier 필요

4. **캐시 일관성 문제**
   - 멀티코어에서 캐시 동기화 필요

**참고자료**
- [Peterson's Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Peterson%27s_algorithm)[^70]

</details>

[^70]: Peterson's Algorithm 설명

### OS-070
Race Condition 이 무엇인가요?

<details>
<summary>답변</summary>

**Race Condition**은 여러 스레드/프로세스가 공유 자원에 동시 접근할 때, 실행 순서에 따라 결과가 달라지는 상황입니다.

**예시**:
```c
// 초기값: balance = 1000

// 스레드 A: 출금 500
temp = balance;     // temp = 1000
temp = temp - 500;  // temp = 500
balance = temp;     // balance = 500

// 스레드 B: 출금 300
temp = balance;     // temp = 1000 (A의 쓰기 전)
temp = temp - 300;  // temp = 700
balance = temp;     // balance = 700

// 결과: 800이 남아야 하는데 700 또는 500
```

**발생 조건**:
1. 공유 자원 존재
2. 동시 접근 가능
3. 최소 하나의 쓰기 연산
4. 동기화 부재

**유형**:
- **Read-Modify-Write**: 위 예시
- **Check-Then-Act**: if 체크 후 동작 사이 변경
- **TOCTOU**: Time of Check to Time of Use

**해결**: 원자적 연산, 락, 동기화 메커니즘

**참고자료**
- [CWE-362: Race Condition](https://cwe.mitre.org/data/definitions/362.html)[^71]

</details>

[^71]: Race Condition 보안 취약점 정의

### OS-071
Thread Safe를 구현하기 위해 반드시 락을 사용해야 하나요? 락 없이 Thread Safe를 구현하는 방법이 있다면 설명해 주세요.

<details>
<summary>답변</summary>

**아니요, 락 없이도 Thread Safe를 구현할 수 있습니다.**

**락 없는 방법들**:

1. **원자적 연산 (Atomic Operations)**
```c
atomic_int counter;
atomic_fetch_add(&counter, 1);  // 락 없이 안전
```

2. **Lock-Free 자료구조**
```c
// CAS (Compare-And-Swap) 기반
while (!CAS(&head, expected, new_node)) {
    expected = head;
}
```

3. **불변 객체 (Immutable)**
- 생성 후 상태 변경 불가
- 읽기만 하므로 동기화 불필요

4. **Thread Local Storage**
```c
__thread int local_data;  // 각 스레드별 독립 데이터
```

5. **메시지 패싱**
- 공유 상태 대신 메시지로 통신
- Actor 모델, CSP

6. **Copy-on-Write**
- 쓰기 시에만 복사본 생성
- 읽기는 동시 접근 허용

**선택 기준**: 복잡도, 성능, 확장성 고려

**참고자료**
- [Lock-Free Programming](https://www.1024cores.net/home/lock-free-algorithms)[^72]

</details>

[^72]: Lock-Free 알고리즘 가이드

### OS-072
Thread Pool, Monitor, Fork-Join에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**Thread Pool**:
- 미리 생성된 스레드 집합
- 작업 큐에서 작업을 가져와 처리
- 스레드 생성/소멸 오버헤드 감소
- 동시 스레드 수 제한 가능
```java
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(task);
```

**Monitor**:
- 상호 배제와 조건 동기화를 결합한 고수준 동기화 도구
- 하나의 스레드만 모니터 내부 코드 실행
- wait(), notify(), notifyAll() 제공
- Java의 synchronized 블록이 모니터 구현
```java
synchronized(object) {
    while (condition) object.wait();
    // 임계 영역
    object.notify();
}
```

**Fork-Join**:
- 분할 정복 병렬 처리 프레임워크
- Fork: 작업을 작은 단위로 분할
- Join: 결과를 합침
- Work-Stealing으로 부하 분산
```java
class Task extends RecursiveTask<Integer> {
    compute() { return fork1.fork() + fork2.compute(); }
}
```

**참고자료**
- [Java Concurrency Utilities](https://docs.oracle.com/javase/tutorial/essential/concurrency/)[^73]

</details>

[^73]: Java 동시성 유틸리티 튜토리얼

### OS-073
Thread Pool의 스레드 수는 어떤 기준으로 결정하나요?

<details>
<summary>답변</summary>

**작업 유형에 따른 스레드 수 결정**:

**CPU Bound 작업**:
```
스레드 수 = CPU 코어 수 + 1
```
- CPU를 최대한 활용
- 너무 많으면 컨텍스트 스위칭 오버헤드

**I/O Bound 작업**:
```
스레드 수 = CPU 코어 수 * (1 + 대기시간/처리시간)
```
- I/O 대기 중 다른 스레드 실행
- 대기 시간이 길수록 더 많은 스레드

**혼합 작업**:
```
스레드 수 = CPU 코어 수 * 목표 CPU 사용률 * (1 + W/C)
W: 대기 시간, C: 계산 시간
```

**실무 가이드라인**:
- 시작: 코어 수의 2배로 시작
- 측정: 실제 부하 테스트로 튜닝
- 모니터링: CPU 사용률, 큐 대기 시간 확인
- 동적 조정: 자동 스케일링 고려

**주의사항**:
- 메모리: 스레드당 스택 메모리 (기본 1MB)
- 연결 풀: DB 연결 수 제한 고려

**참고자료**
- [Java Concurrency in Practice](https://jcip.net/)[^74]

</details>

[^74]: Java 동시성 프로그래밍 서적

### OS-074
어떤 데이터를 정렬 하려고 합니다. 어떤 방식의 전략을 사용하는 것이 가장 안전하면서도 좋은 성능을 낼 수 있을까요?

<details>
<summary>답변</summary>

**Fork-Join 패턴을 활용한 병렬 정렬**이 안전하고 효율적입니다.

**권장 전략: 병렬 Merge Sort**

```java
// Java Fork-Join 예시
class ParallelMergeSort extends RecursiveAction {
    void compute() {
        if (size < THRESHOLD) {
            Arrays.sort(array, lo, hi);  // 작은 배열은 직렬 처리
        } else {
            int mid = (lo + hi) / 2;
            invokeAll(
                new ParallelMergeSort(array, lo, mid),
                new ParallelMergeSort(array, mid, hi)
            );
            merge(array, lo, mid, hi);
        }
    }
}
```

**안전한 이유**:
1. **공유 상태 최소화**: 분할된 영역만 처리
2. **경쟁 조건 없음**: 각 스레드가 독립적인 영역 담당
3. **락 불필요**: 데이터 분할로 동기화 필요 없음

**성능 최적화**:
- 적절한 THRESHOLD 설정 (1000~10000)
- Work-Stealing으로 부하 균형
- 캐시 지역성 고려

**대안**:
- Java: Arrays.parallelSort()
- C++: std::sort with parallel execution policy

**참고자료**
- [Java ForkJoinPool](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ForkJoinPool.html)[^75]

</details>

[^75]: Java ForkJoinPool API 문서

---

## 📌 캐시

### OS-075
캐시 메모리 및 메모리 계층성에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**메모리 계층 구조** (위로 갈수록 빠르고 비쌈):

| 계층 | 용량 | 속도 | 예시 |
|------|------|------|------|
| 레지스터 | ~KB | ~1ns | CPU 내부 |
| L1 캐시 | 32-64KB | ~1-2ns | 코어당 |
| L2 캐시 | 256KB-1MB | ~3-10ns | 코어당 |
| L3 캐시 | 8-32MB | ~10-20ns | 공유 |
| 메인 메모리 | GB | ~50-100ns | DRAM |
| SSD | TB | ~100us | 플래시 |
| HDD | TB | ~10ms | 자기 디스크 |

**캐시 메모리**:
- CPU와 메인 메모리 사이의 고속 버퍼
- 자주 사용하는 데이터를 임시 저장
- 메모리 접근 지연 시간 단축

**작동 원리**:
- 지역성(Locality) 원리 활용
- 캐시 히트: 데이터가 캐시에 있음 (빠름)
- 캐시 미스: 메인 메모리에서 가져옴 (느림)

**참고자료**
- [Intel Optimization Manual](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^76]

</details>

[^76]: Intel 최적화 매뉴얼

### OS-076
캐시 메모리(L1, L2, L3)는 물리적으로 어디에 위치해 있나요?

<details>
<summary>답변</summary>

**캐시 메모리는 CPU 칩 내부에 위치**합니다.

**물리적 위치**:

```
+---------------------------+
|          CPU 다이          |
|  +-------+   +-------+    |
|  | Core 1|   | Core 2|    |
|  |  L1   |   |  L1   |    |
|  |  L2   |   |  L2   |    |
|  +-------+   +-------+    |
|                           |
|    +------------------+   |
|    |       L3        |   |  <- 공유 캐시
|    +------------------+   |
+---------------------------+
            |
    메모리 컨트롤러
            |
        DRAM (외부)
```

**캐시별 위치**:
- **L1 캐시**: 각 코어 내부, 가장 가까움
  - L1I (명령어 캐시)
  - L1D (데이터 캐시)
- **L2 캐시**: 각 코어에 전용 (또는 두 코어 공유)
- **L3 캐시**: 모든 코어가 공유 (Last Level Cache)

SRAM(Static RAM)으로 구현되어 DRAM보다 빠르지만 비쌈.

**참고자료**
- [CPU Cache Architecture](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^77]

</details>

[^77]: Intel CPU 캐시 아키텍처

### OS-077
L1 캐시와 L2 캐시의 특징과 차이점을 설명해 주세요.

<details>
<summary>답변</summary>

**L1 캐시 (Level 1)**:
- **위치**: 각 CPU 코어 내부
- **크기**: 32-64KB (명령어/데이터 각각)
- **속도**: 1-2 사이클 (가장 빠름)
- **구조**:
  - L1I (Instruction): 명령어 캐시
  - L1D (Data): 데이터 캐시
- **특징**: Split cache (분리 캐시)

**L2 캐시 (Level 2)**:
- **위치**: 각 코어에 전용 (현대 CPU)
- **크기**: 256KB - 1MB
- **속도**: 3-10 사이클
- **구조**: Unified (명령어+데이터 통합)
- **특징**: L1 미스 시 참조

**L1 vs L2 비교**:

| 항목 | L1 | L2 |
|------|----|----|
| 용량 | 작음 | 큼 |
| 속도 | 빠름 | 느림 |
| 히트율 | ~95% | ~80% |
| 연관도 | 낮음 (8-way) | 높음 (16-way) |

L1 미스 -> L2 확인 -> L2 미스 -> L3 확인 -> 메인 메모리

**참고자료**
- [Intel Architecture Optimization](https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html)[^78]

</details>

[^78]: Intel 아키텍처 최적화 가이드

### OS-078
캐시에 저장되는 데이터는 어떻게 관리되나요? (캐시 라인, 쓰기 정책, 교체 정책 등)

<details>
<summary>답변</summary>

**캐시 라인 단위로 관리됩니다** (보통 64바이트).

**캐시 라인 구조**:
```
+-------+-------+------------------+
|  Tag  | Index |      Data        |
+-------+-------+------------------+
```

**캐시 관리 요소**:

1. **태그 (Tag)**: 메모리 주소 식별
2. **유효 비트 (Valid bit)**: 데이터 유효 여부
3. **더티 비트 (Dirty bit)**: 수정 여부 (Write-Back용)
4. **LRU 비트**: 교체 정책용

**쓰기 정책**:

| 정책 | 설명 |
|------|------|
| **Write-Through** | 캐시와 메모리에 동시 기록, 일관성 좋음 |
| **Write-Back** | 캐시에만 기록, 교체 시 메모리 기록, 성능 좋음 |

**교체 정책**:
- **LRU**: 가장 오래 사용 안 한 라인 교체
- **FIFO**: 가장 오래된 라인 교체
- **Random**: 무작위 선택

**할당 정책**:
- **Write-Allocate**: 쓰기 미스 시 캐시에 할당
- **No-Write-Allocate**: 메모리에만 기록

**참고자료**
- [Computer Architecture: Cache Design](https://csapp.cs.cmu.edu/)[^79]

</details>

[^79]: CSAPP 캐시 설계 챕터

### OS-079
멀티코어 환경에서 각 코어의 캐시 간 동기화(캐시 일관성)는 어떻게 이루어지나요?

<details>
<summary>답변</summary>

**캐시 일관성 프로토콜**을 통해 동기화됩니다.

**MESI 프로토콜** (가장 널리 사용):

| 상태 | 설명 |
|------|------|
| **M (Modified)** | 수정됨, 이 캐시만 최신, 메모리와 불일치 |
| **E (Exclusive)** | 독점, 이 캐시만 가지고 있음, 메모리와 일치 |
| **S (Shared)** | 공유, 다른 캐시에도 있음, 읽기만 가능 |
| **I (Invalid)** | 무효, 사용 불가 |

**동작 방식**:
1. 코어 A가 데이터 수정 (M 상태)
2. 코어 B가 같은 데이터 읽기 시도
3. 스누핑: B의 요청을 A가 감지
4. A가 데이터를 B에게 전달, 둘 다 S 상태로 전환
5. 필요시 메모리 업데이트

**캐시 일관성 유지 방법**:
- **스누핑 (Snooping)**: 버스 모니터링 (작은 시스템)
- **디렉토리 기반**: 중앙 디렉토리 관리 (대규모 시스템)

**참고자료**
- [Intel Cache Coherency](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^80]

</details>

[^80]: Intel 캐시 일관성 프로토콜

### OS-080
캐시 메모리의 Mapping 방식에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**1. 직접 매핑 (Direct Mapping)**
```
캐시 위치 = (메모리 주소) mod (캐시 라인 수)
```
- 각 메모리 블록은 정해진 캐시 위치에만 저장
- 구현 단순, 충돌 미스 많음

**2. 완전 연관 매핑 (Fully Associative)**
- 메모리 블록이 캐시의 어느 위치에나 저장 가능
- 충돌 미스 최소, 검색 비용 높음 (모든 라인 비교)
- 하드웨어 비용 높음

**3. 집합 연관 매핑 (Set Associative)**
```
집합(Set) = (메모리 주소) mod (집합 수)
집합 내에서는 어느 위치에나 저장 가능
```
- N-way set associative: 각 집합에 N개 라인
- 직접 매핑과 완전 연관의 절충
- 현대 CPU에서 주로 사용 (8-way, 16-way)

| 방식 | 장점 | 단점 |
|------|------|------|
| 직접 | 단순, 빠름 | 충돌 많음 |
| 완전 연관 | 충돌 적음 | 비용 높음 |
| 집합 연관 | 균형 | 적절한 복잡도 |

**참고자료**
- [Cache Organization](https://csapp.cs.cmu.edu/)[^81]

</details>

[^81]: CSAPP 캐시 구조

### OS-081
캐시의 지역성에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**지역성 (Locality)**은 프로그램이 메모리에 접근하는 패턴의 특성입니다.

**1. 시간적 지역성 (Temporal Locality)**
- 최근 접근한 데이터는 곧 다시 접근될 가능성 높음
- 예: 루프 변수, 자주 호출되는 함수
```c
for (int i = 0; i < 100; i++) {
    sum += array[i];  // sum은 반복 접근
}
```

**2. 공간적 지역성 (Spatial Locality)**
- 접근한 주소 근처의 데이터도 곧 접근될 가능성 높음
- 예: 배열 순차 접근, 구조체 멤버 접근
```c
for (int i = 0; i < 100; i++) {
    sum += array[i];  // array[i] 다음에 array[i+1] 접근
}
```

**캐시가 지역성을 활용하는 방법**:
- 시간적 지역성: 접근한 데이터를 캐시에 유지
- 공간적 지역성: 캐시 라인 단위(64B)로 가져옴

**지역성이 좋은 코드 작성 원칙**:
- 배열은 순차적으로 접근
- 자주 함께 사용하는 데이터는 가깝게 배치

**참고자료**
- [Locality of Reference](https://csapp.cs.cmu.edu/)[^82]

</details>

[^82]: CSAPP 지역성 원리

### OS-082
이차원 배열을 행 우선(가로)으로 탐색할 때와 열 우선(세로)으로 탐색할 때의 성능 차이를 캐시 지역성 관점에서 설명해 주세요.

<details>
<summary>답변</summary>

**행 우선(가로) 탐색이 훨씬 빠릅니다.**

**메모리 레이아웃** (C/C++ 행 우선):
```
array[0][0] array[0][1] array[0][2] array[0][3]
array[1][0] array[1][1] array[1][2] array[1][3]
...
```

**행 우선 탐색 (좋음)**:
```c
for (int i = 0; i < N; i++)
    for (int j = 0; j < M; j++)
        sum += array[i][j];  // 연속 메모리 접근
```
- 캐시 라인(64B)에 여러 요소 포함
- 높은 캐시 히트율
- 공간적 지역성 최대 활용

**열 우선 탐색 (나쁨)**:
```c
for (int j = 0; j < M; j++)
    for (int i = 0; i < N; i++)
        sum += array[i][j];  // 불연속 메모리 접근
```
- 매 접근마다 캐시 미스 가능
- 캐시 라인 낭비
- 성능 10~100배 차이 가능

**성능 차이 원인**:
- 행: stride-1 접근 (연속)
- 열: stride-N 접근 (불연속, 캐시 라인 건너뜀)

**참고자료**
- [Memory Access Patterns](https://csapp.cs.cmu.edu/)[^83]

</details>

[^83]: CSAPP 메모리 접근 패턴

### OS-083
캐시의 공간 지역성은 하드웨어에서 어떻게 구현되나요?

<details>
<summary>답변</summary>

**캐시 라인(Cache Line) 단위 저장**으로 공간 지역성을 구현합니다.

**캐시 라인**:
- 일반적으로 64바이트 (현대 CPU)
- 데이터 접근 시 해당 바이트뿐 아니라 전체 캐시 라인을 가져옴

**공간 지역성 구현 원리**:
```
메모리 요청: address 0x1000
캐시가 가져오는 범위: 0x1000 ~ 0x103F (64바이트)

int array[16];  // 64바이트 (int 4바이트 * 16개)
array[0] 접근 시 -> array[0]~array[15] 모두 캐시에 로드
```

**예시**:
```c
// array[0] 접근 -> 64바이트 캐시 라인 로드
// array[1]~array[15] 접근 시 캐시 히트
for (int i = 0; i < 16; i++) {
    sum += array[i];  // 첫 접근 후 나머지 캐시 히트
}
```

**하드웨어 프리페칭**:
- CPU가 접근 패턴 감지
- 다음 캐시 라인을 미리 로드
- 순차 접근 패턴에서 효과적

**참고자료**
- [Intel Prefetch](https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html)[^84]

</details>

[^84]: Intel 프리페치 명령어 가이드

---

## 📌 메모리 할당

### OS-084
연속할당 방식 세 가지를 설명해주세요. (first-fit, best-fit, worst-fit)

<details>
<summary>답변</summary>

가용 메모리 공간(hole)에서 프로세스를 할당할 위치를 결정하는 알고리즘입니다.

**First-Fit (최초 적합)**:
- 충분한 크기의 **첫 번째** 가용 공간에 할당
- 장점: 탐색 시간 짧음
- 단점: 앞쪽에 단편화 집중

**Best-Fit (최적 적합)**:
- 요청 크기에 **가장 근접한** 가용 공간에 할당
- 장점: 메모리 낭비 최소화
- 단점: 전체 탐색 필요, 작은 조각 많이 생성

**Worst-Fit (최악 적합)**:
- **가장 큰** 가용 공간에 할당
- 장점: 큰 남은 공간 유지
- 단점: 전체 탐색 필요, 큰 프로세스 할당 어려움

| 알고리즘 | 탐색 시간 | 메모리 활용 | 단편화 |
|----------|----------|------------|--------|
| First-Fit | O(n) 최선 | 보통 | 앞쪽 집중 |
| Best-Fit | O(n) | 좋음 | 작은 조각 |
| Worst-Fit | O(n) | 나쁨 | 큰 조각 |

**참고자료**
- [Operating System Concepts - Memory Management](https://www.os-book.com/)[^85]

</details>

[^85]: 운영체제 교과서 - 메모리 관리

### OS-085
Worst-fit 방식이 유용한 상황이 있나요? 있다면 어떤 경우인가요?

<details>
<summary>답변</summary>

**Worst-Fit이 유용한 상황**:

1. **중간 크기 할당 요청이 많을 때**
   - 큰 hole에서 할당 후에도 충분한 공간 남음
   - 남은 공간이 다음 요청 수용 가능

2. **작은 단편화 조각을 피하고 싶을 때**
   - Best-Fit은 딱 맞는 공간 찾아 작은 조각 생성
   - Worst-Fit은 큰 공간 유지로 작은 조각 감소

3. **할당 크기가 균일할 때**
   - 비슷한 크기의 요청이 반복되면
   - 큰 공간을 균등하게 분할 가능

**실제로는 거의 사용되지 않는 이유**:
- 큰 프로세스 할당 시 공간 부족
- Best-Fit이나 First-Fit보다 일반적으로 성능 낮음
- 시뮬레이션에서 평균 성능 최하위

**실무에서**:
- glibc malloc: 다양한 전략 조합
- Buddy System, Slab Allocator 등 다른 방식 사용

**참고자료**
- [Memory Allocation Strategies](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-freespace.pdf)[^86]

</details>

[^86]: OSTEP Free Space Management

### OS-086
First-fit, Best-fit, Worst-fit 중 일반적으로 성능이 가장 좋은 알고리즘은 무엇인가요?

<details>
<summary>답변</summary>

**일반적으로 First-Fit이 가장 좋은 성능을 보입니다.**

**시뮬레이션 연구 결과**:
- First-Fit과 Best-Fit은 비슷한 메모리 활용률
- First-Fit은 탐색 시간이 짧아 전체 성능 우수
- Worst-Fit은 대체로 가장 낮은 성능

**First-Fit의 장점**:
1. **빠른 할당**: 첫 번째 적합 공간에서 중단
2. **단순한 구현**: 복잡한 비교 불필요
3. **합리적인 메모리 활용**: Best-Fit과 큰 차이 없음

**그러나 "최고"는 상황에 따라 다름**:

| 상황 | 권장 알고리즘 |
|------|---------------|
| 다양한 크기 요청 | First-Fit |
| 메모리 절약 중요 | Best-Fit |
| 실시간 시스템 | First-Fit (예측 가능) |

**현대 시스템**:
- 단순 연속 할당은 잘 사용하지 않음
- 페이징으로 외부 단편화 해결
- Slab, Buddy 등 전문 할당자 사용

**참고자료**
- [OSTEP: Free Space Management](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-freespace.pdf)[^87]

</details>

[^87]: OSTEP 메모리 할당 비교

### OS-087
Thrashing 이란 무엇인가요?

<details>
<summary>답변</summary>

**Thrashing**은 시스템이 실제 작업보다 **페이지 스왑에 더 많은 시간**을 소비하는 상태입니다.

**발생 과정**:
1. 메모리 부족 -> 페이지 폴트 증가
2. 페이지 교체 빈번 -> I/O 대기 증가
3. CPU 사용률 감소 -> OS가 더 많은 프로세스 실행
4. 메모리 경쟁 심화 -> 더 많은 페이지 폴트
5. 악순환 반복 -> 시스템 거의 멈춤

**증상**:
- 높은 페이지 폴트율
- 높은 디스크 I/O
- 낮은 CPU 사용률
- 시스템 응답 없음

**원인**:
- 물리 메모리 부족
- 너무 많은 프로세스 실행
- Working Set이 메모리보다 큼
- 잘못된 페이지 교체 알고리즘

**지표**:
- PFF(Page Fault Frequency) 급증
- 스왑 I/O 급증

**참고자료**
- [Linux Kernel: Memory Overcommit](https://www.kernel.org/doc/html/latest/admin-guide/mm/overcommit-accounting.html)[^88]

</details>

[^88]: Linux 메모리 오버커밋 설정

### OS-088
Thrashing이 발생했을 때 어떻게 완화할 수 있나요?

<details>
<summary>답변</summary>

**즉각적 대응**:

1. **프로세스 수 감소**
   - 일부 프로세스 중단 (suspend)
   - 스왑 아웃으로 메모리 확보

2. **메모리 추가**
   - 물리 메모리 확장
   - 스왑 공간 확대 (임시 방편)

**시스템 레벨 해결책**:

3. **Working Set 모델**
   - 각 프로세스의 Working Set 크기 추적
   - Working Set을 수용할 수 없으면 프로세스 중단
   - 지역성 원리 활용

4. **PFF (Page Fault Frequency) 알고리즘**
   - 페이지 폴트 빈도 모니터링
   - 높으면: 프레임 추가 할당
   - 낮으면: 프레임 회수

5. **프로세스 우선순위 조정**
   - 중요 프로세스에 메모리 우선 할당

**Linux 대응책**:
- OOM Killer: 메모리 최다 사용 프로세스 종료
- swappiness 조정: 스왑 사용 빈도 제어
- cgroups: 프로세스별 메모리 제한

**참고자료**
- [Linux OOM Killer](https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html)[^89]

</details>

[^89]: Linux 메모리 관리 개념

---

## 📌 가상 메모리

### OS-089
가상 메모리란 무엇인가요?

<details>
<summary>답변</summary>

**가상 메모리**는 각 프로세스에게 **독립적이고 격리된 주소 공간을 제공**하는 메모리 관리 기법입니다.

**핵심 목적** (우선순위 순):
1. **프로세스 격리 (Isolation)**: 각 프로세스가 독립적인 주소 공간을 가져 다른 프로세스의 메모리에 접근 불가
2. **메모리 보호 (Protection)**: 커널 영역 보호, 읽기/쓰기/실행 권한 제어
3. **주소 공간 추상화**: 프로세스는 물리 메모리 레이아웃을 알 필요 없이 연속된 주소 공간 사용
4. **효율적 메모리 관리**: Demand Paging, Copy-on-Write, 공유 라이브러리 등 가능

**부가적 이점**:
- 물리 메모리보다 큰 주소 공간 제공 (스왑 활용)
- 메모리 맵 파일, 공유 메모리 등 고급 기능 지원

> **주의**: "더 큰 메모리를 사용하기 위함"은 가상 메모리의 **부가적 이점**이지, 핵심 목적이 아닙니다. 스왑 없이도 가상 메모리는 프로세스 격리와 보호를 위해 필수적입니다.

**동작 원리**:
- 각 프로세스는 독립적인 가상 주소 공간 사용
- MMU가 가상 주소 -> 물리 주소 변환
- 페이지 테이블로 매핑 관리
- 필요한 부분만 물리 메모리에 로드 (Demand Paging)

**구성 요소**:
- 페이지 테이블: 가상-물리 주소 매핑 및 권한 정보
- MMU: 하드웨어 주소 변환 및 보호 검사
- TLB: 주소 변환 캐시

**참고자료**
- [Linux Virtual Memory](https://www.kernel.org/doc/html/latest/admin-guide/mm/concepts.html)[^90]

</details>

[^90]: Linux 가상 메모리 개념

### OS-090
가상 메모리가 가능한 이유(원리)는 무엇인가요?

<details>
<summary>답변</summary>

가상 메모리는 **하드웨어(MMU)와 소프트웨어(OS)의 협력**으로 가능합니다.

**핵심 기술적 기반**:

1. **MMU (Memory Management Unit)**
   - CPU 내장 하드웨어로 주소 변환 수행
   - 가상 주소 -> 물리 주소 변환을 매 메모리 접근마다 처리
   - 페이지 테이블 참조 및 권한 검사

2. **페이지 테이블**
   - 프로세스별 가상-물리 주소 매핑 정보 저장
   - Valid bit, 권한 비트 등 보호 정보 포함

3. **OS의 메모리 관리**
   - 페이지 테이블 생성 및 관리
   - 페이지 폴트 핸들러로 필요 시 페이지 로드
   - 프로세스 간 격리 보장

**Demand Paging이 효율적인 이유 - 지역성 원리**:

가상 메모리의 "필요한 부분만 로드" 기능이 효율적인 이유는 **지역성 원리(Locality of Reference)** 때문입니다:
- 프로그램은 특정 시간에 일부 코드/데이터만 집중적으로 사용
- Working Set: 특정 시점에 필요한 페이지 집합이 전체보다 훨씬 작음

```
1GB 프로그램이 있어도
현재 Working Set 50MB만 물리 메모리에 적재
나머지는 필요할 때 로드
```

> **구분**: 가상 메모리는 MMU 하드웨어로 "가능"하고, 지역성 원리 덕분에 "효율적"입니다.

**참고자료**
- [OSTEP: Beyond Physical Memory](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys.pdf)[^91]

</details>

[^91]: OSTEP 가상 메모리 챕터

### OS-091
Page Fault가 발생했을 때 처리 과정을 설명해 주세요.

<details>
<summary>답변</summary>

**Page Fault 처리 과정**:

1. **페이지 폴트 발생**
   - CPU가 가상 주소 접근 시도
   - MMU가 페이지 테이블 확인
   - Valid bit = 0 (메모리에 없음) -> 트랩 발생

2. **커널 모드 전환**
   - 페이지 폴트 핸들러 실행
   - 프로세스 상태 저장

3. **주소 유효성 검사**
   - 유효한 가상 주소인가?
   - 접근 권한이 있는가?
   - 불법 접근이면 -> Segmentation Fault

4. **빈 프레임 확보**
   - Free frame list에서 할당
   - 없으면 페이지 교체 알고리즘 실행

5. **페이지 로드**
   - 디스크(스왑)에서 해당 페이지 읽기
   - 빈 프레임에 적재 (I/O 작업)

6. **페이지 테이블 업데이트**
   - Valid bit = 1로 설정
   - 프레임 번호 기록

7. **프로세스 재개**
   - 폴트 발생 명령어부터 다시 실행

**참고자료**
- [Linux Page Fault Handler](https://www.kernel.org/doc/html/latest/admin-guide/mm/)[^92]

</details>

[^92]: Linux 페이지 폴트 처리

### OS-092
페이지 크기에 대한 Trade-Off를 설명해 주세요.

<details>
<summary>답변</summary>

**작은 페이지 크기**:
| 장점 | 단점 |
|------|------|
| 내부 단편화 감소 | 페이지 테이블 크기 증가 |
| 메모리 세밀한 관리 | 페이지 폴트 빈번 |
| Working Set 정확히 반영 | TLB 미스 증가 |

**큰 페이지 크기**:
| 장점 | 단점 |
|------|------|
| 페이지 테이블 크기 감소 | 내부 단편화 증가 |
| TLB 히트율 향상 | 메모리 낭비 |
| I/O 효율 증가 | 공유 어려움 |
| 페이지 폴트 감소 | |

**일반적인 페이지 크기**:
- x86: 4KB (기본), 2MB/1GB (Huge Pages)
- ARM: 4KB, 16KB, 64KB

**Huge Pages 사용 사례**:
- 대용량 데이터베이스
- 가상화 환경
- 메모리 집약적 애플리케이션

**참고자료**
- [Linux Huge Pages](https://www.kernel.org/doc/html/latest/admin-guide/mm/hugetlbpage.html)[^93]

</details>

[^93]: Linux Huge Pages 문서

### OS-093
페이지 크기가 커지면 페이지 폴트가 더 많이 발생하나요, 아니면 감소하나요?

<details>
<summary>답변</summary>

**아니요, 일반적으로 페이지 크기가 커지면 페이지 폴트가 감소합니다.**

**페이지 폴트 감소 이유**:
1. 한 번의 폴트로 더 많은 데이터 로드
2. 공간적 지역성 활용 증가
3. 프리페칭 효과 자연 발생

**예시**:
```
4KB 페이지: 4KB 데이터 순차 접근 시 1번 폴트
1MB 페이지: 1MB 데이터 순차 접근 시 1번 폴트

vs

4KB 페이지: 1MB 순차 접근 시 256번 폴트 가능성
```

**그러나 예외 상황**:
- **희소한 접근 패턴**: 큰 페이지에서 일부만 사용
- **메모리 압박**: 큰 페이지는 교체 시 더 많은 데이터 스왑
- **Working Set 초과**: 큰 페이지로 가용 프레임 수 감소

**결론**:
- 지역성이 좋은 접근: 큰 페이지 유리 (폴트 감소)
- 무작위 접근: 큰 페이지가 불리할 수 있음

**참고자료**
- [Page Size and Performance](https://www.kernel.org/doc/html/latest/admin-guide/mm/)[^94]

</details>

[^94]: Linux 페이지 크기 성능

### OS-094
세그멘테이션 방식을 사용하고 있다면, 가상 메모리를 사용할 수 없을까요?

<details>
<summary>답변</summary>

**사용할 수 있습니다.** 세그멘테이션에서도 가상 메모리 구현이 가능합니다.

**세그멘테이션 기반 가상 메모리**:
- 세그먼트 단위로 스왑 인/아웃
- 세그먼트 테이블에 present bit 추가
- 메모리에 없는 세그먼트 접근 시 폴트 발생

**단점**:
- 세그먼트 크기가 가변적 -> 스왑 공간 관리 복잡
- 외부 단편화 발생
- 큰 세그먼트는 스왑 비용 높음

**페이지드 세그멘테이션 (Paged Segmentation)**:
- 세그멘테이션 + 페이징 결합
- 논리적으로 세그먼트 분리
- 물리적으로 페이지 단위 관리
- 외부 단편화 해결

**현대 시스템**:
- x86-64: 세그멘테이션 거의 사용 안 함 (flat memory model)
- 페이징이 표준
- 보호 기능만 세그멘테이션 활용

**참고자료**
- [Intel Segmentation](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^95]

</details>

[^95]: Intel 세그멘테이션 아키텍처

### OS-095
세그멘테이션과 페이징의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

| 구분 | 세그멘테이션 | 페이징 |
|------|-------------|--------|
| **분할 단위** | 가변 크기 (논리적 단위) | 고정 크기 (물리적 단위) |
| **사용자 관점** | 인식함 (코드, 데이터, 스택) | 투명함 |
| **주소 구조** | 세그먼트 번호 + 오프셋 | 페이지 번호 + 오프셋 |
| **단편화** | 외부 단편화 | 내부 단편화 |
| **보호** | 세그먼트별 권한 설정 용이 | 페이지별 권한 설정 |
| **공유** | 논리적 단위로 공유 | 페이지 단위로 공유 |

**세그멘테이션**:
```
논리 주소: <세그먼트 번호, 오프셋>
세그먼트 테이블: 기준 주소 + 크기 한계
```

**페이징**:
```
논리 주소: <페이지 번호, 오프셋>
페이지 테이블: 프레임 번호
```

**현대 시스템**:
- 페이징이 주류 (외부 단편화 없음)
- 세그멘테이션은 보호 목적으로만 사용
- x86-64: 사실상 순수 페이징

**참고자료**
- [OSTEP: Segmentation](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-segmentation.pdf)[^96]

</details>

[^96]: OSTEP 세그멘테이션 챕터

### OS-096
페이지와 프레임의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**페이지 (Page)**:
- **가상 메모리**의 고정 크기 블록
- 논리적 주소 공간의 단위
- 프로세스 관점의 메모리 블록
- 연속적인 가상 주소

**프레임 (Frame)**:
- **물리 메모리**의 고정 크기 블록
- 물리적 주소 공간의 단위
- 실제 RAM의 메모리 블록
- 연속적인 물리 주소

**관계**:
```
가상 주소 공간          물리 메모리
+----------+           +----------+
| 페이지 0  | -------> | 프레임 3  |
+----------+           +----------+
| 페이지 1  | -------> | 프레임 7  |
+----------+           +----------+
| 페이지 2  | -------> | 프레임 1  |
+----------+           +----------+
```

**특징**:
- 페이지와 프레임은 같은 크기 (보통 4KB)
- 페이지 테이블: 페이지 -> 프레임 매핑
- 연속 페이지가 연속 프레임에 매핑될 필요 없음
- 이로 인해 외부 단편화 없음

**참고자료**
- [OSTEP: Paging](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-paging.pdf)[^97]

</details>

[^97]: OSTEP 페이징 챕터

### OS-097
내부 단편화와, 외부 단편화에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**내부 단편화 (Internal Fragmentation)**:
- 할당된 메모리 블록 **내부**에 사용되지 않는 공간
- 고정 크기 할당에서 발생
- 예: 4KB 페이지에 3KB만 사용 -> 1KB 낭비

```
+------------------------+
|  사용 중 (3KB)  | 빈공간 |  <- 내부 단편화
+------------------------+
      4KB 페이지
```

**외부 단편화 (External Fragmentation)**:
- 메모리 **외부**에 흩어진 작은 빈 공간들
- 가변 크기 할당에서 발생
- 총 가용 공간은 충분하나 연속 공간 부족

```
+------+-------+------+-------+------+
| 사용 |  빈   | 사용 |  빈   | 사용 |
+------+-------+------+-------+------+
     (5KB + 3KB = 8KB 가용이지만 6KB 연속 할당 불가)
```

| 구분 | 발생 위치 | 원인 | 해결 |
|------|----------|------|------|
| 내부 | 블록 안 | 고정 크기 할당 | 작은 블록 사용 |
| 외부 | 블록 사이 | 가변 크기 할당 | 페이징, 압축 |

**페이징**: 외부 단편화 해결, 내부 단편화 존재
**세그멘테이션**: 내부 단편화 없음, 외부 단편화 존재

**참고자료**
- [Memory Fragmentation](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-freespace.pdf)[^98]

</details>

[^98]: OSTEP 메모리 단편화

### OS-098
가상 주소에서 물리 주소를 얻는 주소 변환 과정을 설명해 주세요.

<details>
<summary>답변</summary>

**가상 주소 -> 물리 주소 변환 과정**:

```
가상 주소 (32비트, 4KB 페이지 예시)
+--------------------+-------------+
| 페이지 번호 (20비트) | 오프셋 (12비트) |
+--------------------+-------------+
          |                 |
          v                 |
    [페이지 테이블]           |
          |                 |
          v                 v
+--------------------+-------------+
| 프레임 번호 (20비트) | 오프셋 (12비트) |
+--------------------+-------------+
         물리 주소
```

**변환 단계**:
1. **가상 주소 분리**: 페이지 번호 + 오프셋
2. **페이지 테이블 참조**: PTBR + 페이지 번호 * 엔트리 크기
3. **유효성 검사**: Valid bit 확인 (0이면 Page Fault)
4. **프레임 번호 획득**: 페이지 테이블 엔트리에서
5. **물리 주소 조합**: 프레임 번호 + 오프셋

**예시** (4KB 페이지, 가상 주소 0x12345678):
```
페이지 번호: 0x12345
오프셋: 0x678
프레임 번호: 0xABCDE (테이블에서 조회)
물리 주소: 0xABCDE678
```

**참고자료**
- [x86 Paging](https://wiki.osdev.org/Paging)[^99]

</details>

[^99]: x86 페이징 메커니즘

### OS-099
특정 메모리 주소공간이 수정 가능한지(쓰기 권한이 있는지) 어떻게 확인할 수 있나요?

<details>
<summary>답변</summary>

**페이지 테이블 엔트리의 보호 비트**로 확인합니다.

**페이지 테이블 엔트리 구조**:
```
+---+---+---+---+---+--------------------+
| P | R | U | W | X |    프레임 번호      |
+---+---+---+---+---+--------------------+
P: Present (존재 여부)
R: Read (읽기 가능)
U: User (사용자 모드 접근 가능)
W: Write (쓰기 가능)   <- 수정 가능 여부
X: Execute (실행 가능, NX 비트 반대)
```

**확인 방법**:

1. **프로그래밍 방식 (Linux)**:
```c
// /proc/self/maps 파일 확인
// 출력: r-xp (읽기, 실행 가능, 쓰기 불가)

// mprotect()로 권한 변경
mprotect(addr, len, PROT_READ | PROT_WRITE);
```

2. **명령어**:
```bash
cat /proc/<pid>/maps
# 출력 예: 00400000-00401000 r-xp (코드 영역, 읽기+실행)
#         00600000-00601000 rw-p (데이터 영역, 읽기+쓰기)
```

3. **하드웨어 수준**:
- MMU가 접근 시 권한 검사
- 위반 시 Segmentation Fault 발생

**참고자료**
- [Linux man-pages: mprotect(2)](https://man7.org/linux/man-pages/man2/mprotect.2.html)[^100]

</details>

[^100]: Linux mprotect() 시스템 콜

### OS-100
32비트에서, 페이지의 크기가 1kb 이라면 페이지 테이블의 최대 크기는 몇 개일까요?

<details>
<summary>답변</summary>

**2^22 = 4,194,304개 (약 400만 개)**

**계산 과정**:
```
32비트 주소 공간: 2^32 = 4GB
페이지 크기: 1KB = 2^10 바이트

페이지 테이블 엔트리 수 = 전체 주소 공간 / 페이지 크기
                      = 2^32 / 2^10
                      = 2^22
                      = 4,194,304개
```

**페이지 테이블 크기**:
- 각 엔트리: 4바이트 (32비트)
- 테이블 크기: 2^22 * 4B = 16MB

**문제점**:
- 프로세스마다 16MB 페이지 테이블 필요
- 대부분의 주소 공간은 사용되지 않음

**해결책**:
- **다단계 페이지 테이블**: 사용하는 영역만 할당
- **역 페이지 테이블**: 프레임 기준 테이블
- **해시 페이지 테이블**: 해시로 빠른 검색

실제 시스템에서는 4KB 페이지 사용 -> 2^20 엔트리 (4MB 테이블)

**참고자료**
- [Multi-level Page Tables](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-smalltables.pdf)[^101]

</details>

[^101]: OSTEP 다단계 페이지 테이블

### OS-101
32비트 운영체제에서 최대 4GB RAM만 사용할 수 있는 이유를 페이징과 연관 지어 설명해 주세요.

<details>
<summary>답변</summary>

**32비트 주소 체계의 한계** 때문입니다.

**이유**:
```
32비트 주소 = 2^32개의 고유 주소 표현 가능
           = 4,294,967,296 바이트
           = 4GB
```

**페이징 관점**:
- 페이지 테이블 엔트리의 프레임 번호: 20비트 (4KB 페이지 기준)
- 오프셋: 12비트
- 총 주소 가능 물리 메모리: 2^20 * 4KB = 4GB

**가상 주소 구조** (4KB 페이지):
```
+--------------------+-------------+
| 페이지 번호 (20비트) | 오프셋 (12비트) |
+--------------------+-------------+
        32비트 가상 주소
```

**물리 주소 한계**:
- CPU의 주소 버스: 32비트
- 물리 메모리 주소 지정: 최대 4GB

**확장 방법**:
- **PAE (Physical Address Extension)**: 36비트 물리 주소 (64GB)
- **64비트 OS**: 이론상 16EB (실제는 수 TB 지원)

**참고자료**
- [x86 PAE](https://en.wikipedia.org/wiki/Physical_Address_Extension)[^102]

</details>

[^102]: x86 PAE 확장

### OS-102
C/C++ 개발을 하게 되면 Segmentation Fault 라는 에러를 접할 수 있을텐데, 이 에러는 세그멘테이션/페이징과 어떤 관계가 있을까요?

<details>
<summary>답변</summary>

**Segmentation Fault**는 메모리 보호 위반 시 발생하는 에러입니다. 이름은 세그멘테이션에서 유래했지만, 현대 시스템에서는 **페이징 보호 위반**에서 주로 발생합니다.

**발생 원인**:
1. **NULL 포인터 역참조**
   - 주소 0은 일반적으로 매핑되지 않음

2. **해제된 메모리 접근** (Use After Free)
   - 유효하지 않은 페이지 접근

3. **배열 범위 초과** (Buffer Overflow)
   - 할당되지 않은 영역 접근

4. **읽기 전용 메모리에 쓰기**
   - 코드 영역 수정 시도

**페이징과의 관계**:
```
가상 주소 접근 -> MMU 검사 -> 위반 발생
                    |
        +----------+----------+
        |                     |
   Valid bit = 0         권한 위반
   (매핑 안 됨)       (쓰기 금지 등)
        |                     |
        +----------+----------+
                    |
               SIGSEGV 시그널
```

**역사적 배경**:
- 과거 세그멘테이션 사용 시 세그먼트 경계 위반에서 유래
- 현재는 페이징 기반이지만 이름은 유지

**참고자료**
- [Linux man-pages: signal(7)](https://man7.org/linux/man-pages/man7/signal.7.html)[^103]

</details>

[^103]: Linux 시그널 - SIGSEGV

---

## 📌 TLB

### OS-103
TLB는 무엇인가요?

<details>
<summary>답변</summary>

**TLB (Translation Lookaside Buffer)**는 페이지 테이블 엔트리를 캐싱하는 고속 하드웨어 캐시입니다.

**역할**:
- 가상 주소 -> 물리 주소 변환 가속
- 자주 사용되는 페이지 테이블 엔트리 저장
- 메모리 접근 횟수 감소

**구조**:
```
+------------+-------------+-------+
| 가상 페이지 | 물리 프레임  | 플래그 |
+------------+-------------+-------+
|   VPN 1    |   PFN 5    | R/W/X |
|   VPN 7    |   PFN 12   | R/W   |
|   ...      |   ...      | ...   |
+------------+-------------+-------+
```

**특징**:
- 완전 연관(Fully Associative) 또는 집합 연관 매핑
- 크기: 64~1024 엔트리 (작지만 빠름)
- 접근 시간: 1 사이클 (매우 빠름)
- 히트율: 99% 이상 (지역성 활용)

**동작**:
1. TLB 먼저 검색 (병렬로)
2. TLB 히트: 바로 물리 주소 획득
3. TLB 미스: 페이지 테이블에서 가져와 TLB에 저장

**참고자료**
- [OSTEP: TLBs](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-tlbs.pdf)[^104]

</details>

[^104]: OSTEP TLB 챕터

### OS-104
TLB를 사용하면 왜 성능이 향상되나요?

<details>
<summary>답변</summary>

**메모리 접근 횟수를 줄여주기 때문입니다.**

**TLB 없이 (2단계 페이지 테이블)**:
```
1회차: 1단계 페이지 테이블 접근 (메모리)
2회차: 2단계 페이지 테이블 접근 (메모리)
3회차: 실제 데이터 접근 (메모리)
총 3번의 메모리 접근!
```

**TLB 사용 시 (히트)**:
```
1회차: TLB 검색 (~1 사이클)
2회차: 실제 데이터 접근 (메모리)
총 1번의 메모리 접근 + TLB 검색
```

**속도 비교**:
| 구분 | 시간 |
|------|------|
| TLB 접근 | ~1ns |
| 메모리 접근 | ~100ns |

**효과**:
- TLB 히트 시 100배 이상 빠름
- 히트율 99% 이상 (지역성)
- 평균 접근 시간 크게 단축

**유효 접근 시간 (EAT)**:
```
EAT = 히트율 × (TLB + 메모리) + 미스율 × (TLB + 페이지테이블 + 메모리)
    = 0.99 × (1 + 100) + 0.01 × (1 + 200 + 100)
    ≈ 103ns (vs 300ns without TLB)
```

**참고자료**
- [TLB Performance](https://csapp.cs.cmu.edu/)[^105]

</details>

[^105]: CSAPP TLB 성능 분석

### OS-105
MMU가 무엇인가요?

<details>
<summary>답변</summary>

**MMU (Memory Management Unit)**는 가상 주소를 물리 주소로 변환하는 하드웨어 장치입니다.

**주요 기능**:

1. **주소 변환 (Address Translation)**
   - 가상 주소 -> 물리 주소 매핑
   - 페이지 테이블 참조

2. **메모리 보호 (Memory Protection)**
   - 페이지별 접근 권한 검사 (R/W/X)
   - 불법 접근 시 예외 발생

3. **캐시 제어**
   - TLB 관리
   - 캐시 가능 여부 결정

**동작 과정**:
```
CPU --[가상주소]--> MMU --[물리주소]--> 메모리
                    |
                   TLB
                    |
               페이지 테이블
```

**구성 요소**:
- **TLB**: 주소 변환 캐시
- **페이지 테이블 워커**: TLB 미스 시 테이블 탐색
- **보호 검사 로직**: 권한 검증

**예외 발생 상황**:
- 페이지 폴트: 페이지가 메모리에 없음
- 보호 위반: 권한 없는 접근

**참고자료**
- [Intel MMU](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^106]

</details>

[^106]: Intel MMU 아키텍처

### OS-106
TLB와 MMU는 물리적으로 어디에 위치해 있나요?

<details>
<summary>답변</summary>

**MMU와 TLB는 CPU 칩 내부에 위치**합니다.

**물리적 위치**:
```
+----------------------------------+
|              CPU                 |
|  +--------+     +---------+      |
|  | Core   |---->|   MMU   |----->| 메모리 버스
|  |        |     |  (TLB)  |      |
|  +--------+     +---------+      |
|                                  |
|  +--------+     +---------+      |
|  | Core   |---->|   MMU   |----->|
|  |        |     |  (TLB)  |      |
|  +--------+     +---------+      |
+----------------------------------+
```

**구조적 특징**:

1. **MMU**:
   - 각 CPU 코어에 통합
   - CPU 파이프라인의 일부
   - 메모리 접근 전 주소 변환

2. **TLB**:
   - MMU 내부에 위치
   - SRAM으로 구현 (빠른 속도)
   - 코어별 독립적 TLB 존재
   - 일부 시스템에서 L2 TLB 공유

**계층 구조**:
```
L1 ITLB (명령어) - 코어별
L1 DTLB (데이터) - 코어별
L2 TLB (통합) - 코어별 또는 공유
```

CPU와 메모리 사이의 모든 접근은 MMU를 거칩니다.

**참고자료**
- [x86 CPU Architecture](https://en.wikichip.org/wiki/x86)[^107]

</details>

[^107]: x86 CPU 아키텍처

### OS-107
멀티코어 환경에서 각 코어의 TLB는 어떻게 동기화되나요?

<details>
<summary>답변</summary>

**TLB Shootdown** 메커니즘을 사용합니다.

**문제 상황**:
- 각 코어는 독립적인 TLB 보유
- 한 코어에서 페이지 테이블 변경 시 다른 코어 TLB는 오래된 정보 유지

**TLB Shootdown 과정**:
1. 코어 A가 페이지 테이블 수정
2. 코어 A가 다른 코어들에 IPI (Inter-Processor Interrupt) 전송
3. 각 코어가 인터럽트 받고 해당 TLB 엔트리 무효화
4. 모든 코어 완료 후 코어 A 진행

```
Core A: "페이지 X 매핑 변경!"
        |
        v
Core B, C, D: [IPI 수신] -> TLB에서 페이지 X 무효화 -> [완료 응답]
        |
        v
Core A: 모든 응답 확인 후 계속 실행
```

**최적화 방법**:
- **PCID/ASID**: 프로세스별 TLB 태깅으로 전체 플러시 방지
- **지연된 Shootdown**: 배치 처리로 IPI 횟수 감소
- **범위 지정 무효화**: 특정 범위만 무효화

**오버헤드**:
- IPI는 비용이 높음 (수백~수천 사이클)
- 코어 수가 많을수록 증가

**참고자료**
- [Linux TLB Shootdown](https://www.kernel.org/doc/html/latest/admin-guide/mm/)[^108]

</details>

[^108]: Linux TLB 관리

### OS-108
Context Switching이 발생하면 TLB에는 어떤 변화가 발생하나요?

<details>
<summary>답변</summary>

**프로세스 전환 시 TLB를 처리해야 합니다.**

**문제점**:
- 각 프로세스는 독립적인 가상 주소 공간
- TLB에는 이전 프로세스의 매핑 정보
- 새 프로세스가 같은 가상 주소 사용 시 잘못된 물리 주소 참조

**해결 방법**:

1. **TLB 전체 플러시 (Flush)**
   - 모든 TLB 엔트리 무효화
   - 단순하지만 비용 높음
   - 새 프로세스는 모두 TLB 미스 발생

2. **ASID/PCID 사용 (Address Space ID)**
   - 각 TLB 엔트리에 프로세스 ID 태깅
   - 컨텍스트 스위칭 시 ASID만 변경
   - TLB 플러시 불필요
   ```
   TLB 엔트리: [ASID | VPN | PFN | 플래그]
   ```

**성능 영향**:

| 방법 | 장점 | 단점 |
|------|------|------|
| 플러시 | 구현 단순 | TLB 미스 증가, 성능 저하 |
| ASID | 캐시 유지, 빠름 | 하드웨어 지원 필요 |

현대 CPU(x86 PCID, ARM ASID)는 프로세스 식별자를 지원합니다.

**참고자료**
- [Intel PCID](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^109]

</details>

[^109]: Intel PCID 기능

### OS-109
동기화를 구현하기 위한 하드웨어적인 해결 방법에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**원자적 명령어 (Atomic Instructions)**를 사용합니다.

**1. Test-And-Set (TAS)**
```c
// 하드웨어가 원자적으로 실행
bool test_and_set(bool *target) {
    bool old = *target;
    *target = true;
    return old;
}

// 사용
while (test_and_set(&lock)) ; // 스핀
// 임계 영역
lock = false;
```

**2. Compare-And-Swap (CAS)**
```c
// 하드웨어가 원자적으로 실행
bool CAS(int *ptr, int expected, int new_val) {
    if (*ptr == expected) {
        *ptr = new_val;
        return true;
    }
    return false;
}
```

**3. Fetch-And-Add**
```c
int fetch_and_add(int *ptr, int value) {
    int old = *ptr;
    *ptr += value;
    return old;
}
```

**4. Load-Link / Store-Conditional (LL/SC)**
- ARM, MIPS에서 사용
- LL로 값 읽고, SC로 조건부 쓰기

**x86 명령어**:
- `LOCK` prefix: 버스 락 또는 캐시 락
- `XCHG`, `CMPXCHG`, `XADD`

**참고자료**
- [Intel Atomic Operations](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html)[^110]

</details>

[^110]: Intel 원자적 연산 명령어

### OS-110
volatile 키워드는 어떤 의미가 있나요?

<details>
<summary>답변</summary>

**volatile**은 컴파일러에게 해당 변수에 대한 **최적화를 하지 말라**고 지시합니다.

**의미**:
1. 매번 메모리에서 값을 읽음 (레지스터 캐싱 X)
2. 쓰기 연산을 생략하지 않음
3. 접근 순서 재배치 방지 (해당 변수에 한해)

**사용 사례**:

```c
// 하드웨어 레지스터 접근
volatile int *hardware_reg = (int *)0xFFFF0000;

// 인터럽트 핸들러와 공유 변수
volatile bool flag = false;

// 메모리 맵 I/O
volatile char *lcd_display = ...;
```

**주의: volatile은 동기화를 보장하지 않음**:
```c
volatile int counter = 0;
counter++;  // 원자적이지 않음! (read-modify-write)
```

**언어별 차이**:

| 언어 | 의미 |
|------|------|
| C/C++ | 컴파일러 최적화 방지만 |
| Java | 가시성 + happens-before 보장 |

**C++11 이후**: `std::atomic` 사용 권장

**참고자료**
- [C++ volatile](https://en.cppreference.com/w/cpp/language/cv)[^111]

</details>

[^111]: C++ volatile 키워드

### OS-111
멀티코어 환경에서는 동기화가 어떻게 이루어지나요?

<details>
<summary>답변</summary>

멀티코어 환경에서는 **캐시 일관성 프로토콜**과 **메모리 배리어**가 필요합니다.

**1. 캐시 일관성 (Cache Coherence)**
- MESI 프로토콜로 캐시 간 데이터 동기화
- 한 코어가 쓰기 시 다른 코어 캐시 무효화
- 하드웨어가 자동으로 처리

**2. 원자적 연산 + 버스/캐시 락**
```c
// x86 LOCK prefix
lock xadd [counter], 1
```
- LOCK: 캐시 라인 독점 또는 버스 락
- 다른 코어의 접근 차단

**3. 메모리 배리어 (Memory Barrier/Fence)**
```c
// 쓰기 배리어: 이전 쓰기 완료 후 다음 쓰기
__asm__ __volatile__("mfence" ::: "memory");

// C11
atomic_thread_fence(memory_order_seq_cst);
```
- 명령어 재배치 방지
- 메모리 가시성 보장

**4. 하드웨어 동기화 프리미티브**
- CAS, LL/SC 등 원자적 명령어
- 멀티코어에서도 원자성 보장

**요약**:
| 계층 | 메커니즘 |
|------|----------|
| 캐시 | MESI 프로토콜 |
| 명령어 | 원자적 연산 + LOCK |
| 메모리 | 메모리 배리어 |

**참고자료**
- [Memory Barriers](https://www.kernel.org/doc/html/latest/core-api/wrappers/memory-barriers.html)[^112]

</details>

[^112]: Linux 커널 메모리 배리어

---

## 📌 페이지 교체 알고리즘

### OS-112
페이지 교체 알고리즘에 대해 설명해 주세요.

<details>
<summary>답변</summary>

페이지 폴트 시 빈 프레임이 없을 때, **어떤 페이지를 교체할지** 결정하는 알고리즘입니다.

**주요 알고리즘**:

| 알고리즘 | 설명 | 특징 |
|----------|------|------|
| **OPT** | 가장 나중에 사용될 페이지 교체 | 이론적 최적, 실현 불가 |
| **FIFO** | 가장 먼저 들어온 페이지 교체 | 단순, Belady's Anomaly |
| **LRU** | 가장 오래 사용 안 한 페이지 교체 | 좋은 성능, 구현 비용 |
| **LFU** | 가장 적게 사용된 페이지 교체 | 빈도 기반 |
| **Clock** | LRU 근사, 순환 리스트 | 효율적 구현 |
| **NRU** | Not Recently Used, 참조/수정 비트 | 단순한 근사 |

**목표**:
- 페이지 폴트율 최소화
- 낮은 구현 오버헤드

**선택 기준**:
- 구현 복잡도
- 하드웨어 지원 (참조 비트, 수정 비트)
- 성능 vs 오버헤드 트레이드오프

Linux는 **LRU 근사 알고리즘** (Active/Inactive 리스트)을 사용합니다.

**참고자료**
- [OSTEP: Page Replacement](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys-policy.pdf)[^113]

</details>

[^113]: OSTEP 페이지 교체 정책

### OS-113
LRU 알고리즘은 어떤 특성(원리)을 이용한 알고리즘인가요?

<details>
<summary>답변</summary>

**시간적 지역성 (Temporal Locality)**을 이용합니다.

**시간적 지역성**:
- 최근에 사용된 데이터는 곧 다시 사용될 가능성이 높음
- 오래 사용되지 않은 데이터는 앞으로도 사용 가능성 낮음

**LRU의 가정**:
```
과거의 참조 패턴 -> 미래의 참조 패턴 예측
"최근에 안 쓴 페이지는 앞으로도 안 쓸 것이다"
```

**OPT와의 관계**:
- OPT: 미래에 가장 늦게 사용될 페이지 교체 (이상적)
- LRU: 과거에 가장 오래 안 쓴 페이지 교체 (OPT 근사)

**효과적인 상황**:
- 루프에서 같은 데이터 반복 접근
- 최근 참조 = 곧 다시 참조

**비효과적인 상황**:
- 순차적 스캔 (한 번만 접근)
- Working Set > 프레임 수 (스래싱)

LRU는 지역성이 있는 대부분의 워크로드에서 좋은 성능을 보입니다.

**참고자료**
- [Locality of Reference](https://csapp.cs.cmu.edu/)[^114]

</details>

[^114]: CSAPP 지역성 원리

### OS-114
LRU 알고리즘을 구현하는 방법에는 어떤 것들이 있나요?

<details>
<summary>답변</summary>

**1. 카운터 기반 (Counter)**
```c
struct page {
    int last_used_time;  // 마지막 접근 시간
    ...
};
// 교체 시 가장 작은 카운터 값 찾기: O(n)
```
- 매 접근마다 타임스탬프 갱신
- 교체 시 전체 탐색 필요

**2. 스택 기반 (Stack)**
```c
// 접근 시 해당 페이지를 스택 맨 위로 이동
// 교체 시 스택 맨 아래 페이지 제거: O(1)
```
- 이중 연결 리스트로 구현
- 매 접근마다 리스트 재구성

**3. 해시맵 + 이중 연결 리스트 (최적)**
```c
// HashMap: O(1) 페이지 찾기
// DoublyLinkedList: O(1) 순서 관리

struct LRUCache {
    HashMap<key, Node*> map;
    DoublyLinkedList list;
};
// 접근: O(1), 교체: O(1)
```

**4. Clock 알고리즘 (LRU 근사)**
```c
// 순환 리스트 + 참조 비트
while (page[hand].ref_bit == 1) {
    page[hand].ref_bit = 0;
    hand = (hand + 1) % n;
}
// 실제 OS에서 주로 사용
```

Linux는 Active/Inactive 리스트 기반 LRU 근사를 사용합니다.

**참고자료**
- [Linux Page Reclaim](https://www.kernel.org/doc/html/latest/admin-guide/mm/)[^115]

</details>

[^115]: Linux 페이지 회수 알고리즘

### OS-115
LRU 알고리즘의 단점과 이를 해결할 수 있는 대안 알고리즘을 설명해 주세요.

<details>
<summary>답변</summary>

**LRU의 단점**:

1. **순차 스캔 문제 (Scan Resistant)**
   - 대량 순차 읽기 시 캐시 오염
   - 한 번만 사용될 페이지가 최근 사용으로 표시

2. **구현 오버헤드**
   - 매 접근마다 순서 갱신 필요
   - 하드웨어 지원 없이 정확한 LRU 구현 어려움

3. **빈도 무시**
   - 자주 사용되는 페이지도 최근 안 쓰면 교체
   - 최근성만 고려, 빈도는 무시

**대안 알고리즘**:

| 알고리즘 | 해결하는 문제 |
|----------|---------------|
| **LRU-K** | 최근 K번의 접근 이력 고려 |
| **2Q** | 새 페이지와 오래된 페이지 분리 관리 |
| **ARC** | 빈도와 최근성 동시 고려 |
| **CLOCK-Pro** | Clock + 빈도 정보 |
| **LFU** | 빈도 기반 (시간 무시 문제) |

**Linux 접근법**:
- Active/Inactive 리스트 분리
- 두 번 접근된 페이지만 Active로 승격
- 순차 스캔 저항성 확보

**참고자료**
- [ARC Algorithm](https://www.usenix.org/conference/fast-03/arc-self-tuning-low-overhead-replacement-cache)[^116]

</details>

[^116]: ARC 알고리즘 논문

---

## 📌 파일 시스템 및 I/O

### OS-116
File Descriptor와, File System에 에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**File Descriptor (파일 디스크립터)**:
- 프로세스가 열린 파일을 참조하는 **정수 식별자**
- 프로세스별 파일 디스크립터 테이블에 저장
- 기본값: 0(stdin), 1(stdout), 2(stderr)

```c
int fd = open("file.txt", O_RDONLY);  // fd = 3
read(fd, buffer, size);
close(fd);
```

**파일 디스크립터 구조**:
```
프로세스 FD 테이블 -> 파일 테이블 -> inode
      [0] ---------> [file entry] -> [inode]
      [1] ---------> [file entry] -> [inode]
      [fd] --------> [file entry] -> [inode]
```

**File System (파일 시스템)**:
- 저장 장치에 파일을 **조직하고 관리**하는 방법
- 파일 저장, 검색, 접근 방식 정의

**주요 파일 시스템**:
| 이름 | 운영체제 | 특징 |
|------|----------|------|
| ext4 | Linux | 저널링, 대용량 지원 |
| NTFS | Windows | 권한, 암호화 |
| APFS | macOS | 스냅샷, 암호화 |
| FAT32 | 범용 | 단순, 호환성 |

**참고자료**
- [Linux man-pages: open(2)](https://man7.org/linux/man-pages/man2/open.2.html)[^117]

</details>

[^117]: Linux open() 시스템 콜

### OS-117
파일 시스템에서 I-Node(Index Node)란 무엇인가요?

<details>
<summary>답변</summary>

**I-Node (Index Node)**는 Unix/Linux 파일 시스템에서 파일의 **메타데이터를 저장**하는 자료구조입니다.

**저장 정보**:
- 파일 타입 (일반, 디렉토리, 심볼릭 링크 등)
- 파일 크기
- 소유자 (UID, GID)
- 권한 (rwxrwxrwx)
- 타임스탬프 (생성, 수정, 접근 시간)
- 링크 카운트 (하드 링크 수)
- **데이터 블록 포인터** (실제 데이터 위치)

**데이터 블록 포인터 구조**:
```
+------------------+
| 직접 블록 (12개)   | -> 작은 파일
+------------------+
| 간접 블록 (1개)    | -> 중간 파일
+------------------+
| 이중 간접 (1개)    | -> 큰 파일
+------------------+
| 삼중 간접 (1개)    | -> 매우 큰 파일
+------------------+
```

**특징**:
- 파일 이름은 inode에 저장되지 않음 (디렉토리에 저장)
- inode 번호로 파일 식별
- 하드 링크: 같은 inode를 가리키는 여러 이름

```bash
ls -i file.txt  # inode 번호 확인
stat file.txt   # 상세 inode 정보
```

**참고자료**
- [Linux man-pages: inode(7)](https://man7.org/linux/man-pages/man7/inode.7.html)[^118]

</details>

[^118]: Linux inode 구조

### OS-118
프로그래밍 언어 상에서 제공하는 파일 관련 함수 (Python - open(), Java - BufferedReader/Writer 등)은, 파일을 어떤 방식으로 읽어들이나요?

<details>
<summary>답변</summary>

**버퍼링을 통한 시스템 콜 최소화** 방식을 사용합니다.

**동작 과정**:
```
애플리케이션
     |
사용자 공간 버퍼 (라이브러리)  <- BufferedReader
     |
시스템 콜 (read/write)
     |
커널 버퍼 (Page Cache)
     |
디스크
```

**버퍼링의 이점**:
1. **시스템 콜 횟수 감소**: 한 번에 많은 데이터 읽기
2. **I/O 효율화**: 블록 단위로 읽기/쓰기
3. **성능 향상**: 디스크 접근 최소화

**예시**:
```python
# Python: 기본적으로 버퍼링됨
with open('file.txt', 'r', buffering=8192) as f:
    line = f.readline()  # 8KB 버퍼에서 한 줄 읽기
```

```java
// Java: BufferedReader가 버퍼 관리
BufferedReader reader = new BufferedReader(new FileReader("file.txt"));
String line = reader.readLine();  // 버퍼에서 읽기
```

**버퍼 크기**:
- 보통 4KB ~ 64KB
- 페이지 크기의 배수가 효율적

**참고자료**
- [Python I/O](https://docs.python.org/3/library/io.html)[^119]

</details>

[^119]: Python I/O 라이브러리

### OS-119
동기와 비동기, 블로킹과 논블로킹의 차이에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**동기(Synchronous) vs 비동기(Asynchronous)**: 작업 완료를 **누가 확인**하는가

| 구분 | 동기 | 비동기 |
|------|------|--------|
| 완료 확인 | 호출자가 확인 | 피호출자가 알림 |
| 결과 수신 | 직접 반환 | 콜백/이벤트 |

**블로킹(Blocking) vs 논블로킹(Non-blocking)**: 작업 완료 전 **제어권**을 어떻게 하는가

| 구분 | 블로킹 | 논블로킹 |
|------|--------|----------|
| 제어권 | 완료까지 대기 | 즉시 반환 |
| 다른 작업 | 불가 | 가능 |

**조합 예시**:

| 조합 | 예시 |
|------|------|
| 동기 + 블로킹 | 일반 read() |
| 동기 + 논블로킹 | O_NONBLOCK + 폴링 |
| 비동기 + 블로킹 | select()에서 대기 |
| 비동기 + 논블로킹 | io_uring, IOCP |

```c
// 동기 블로킹
read(fd, buf, size);  // 완료까지 대기

// 비동기 논블로킹
aio_read(&aiocb);     // 즉시 반환, 콜백으로 알림
```

**참고자료**
- [Linux AIO](https://man7.org/linux/man-pages/man7/aio.7.html)[^120]

</details>

[^120]: Linux 비동기 I/O

### OS-120
동기+논블로킹, 비동기+블로킹 조합은 실제로 사용되는 의미 있는 조합인가요?

<details>
<summary>답변</summary>

**두 경우 모두 실제로 사용됩니다.**

**동기 + 논블로킹**:
```c
// 예: 폴링 방식
fcntl(fd, F_SETFL, O_NONBLOCK);
while (1) {
    int n = read(fd, buf, size);
    if (n > 0) break;       // 데이터 있음
    if (errno == EAGAIN) {
        // 데이터 없음, 다른 작업 수행 가능
        do_other_work();
    }
}
```
- 직접 결과 확인 (동기)
- 즉시 반환 (논블로킹)
- 바쁜 대기(busy waiting) 가능

**비동기 + 블로킹**:
```c
// 예: select(), poll()
fd_set readfds;
FD_SET(fd1, &readfds);
FD_SET(fd2, &readfds);
select(max_fd, &readfds, NULL, NULL, NULL);  // 블로킹
// 이벤트 발생한 fd 처리 (비동기적으로 알림받음)
```
- 여러 작업을 대기하며 블로킹
- 어느 것이 완료되든 알림받음
- I/O 멀티플렉싱의 핵심

**의미**:
| 조합 | 사용 사례 |
|------|----------|
| 동기 + 논블로킹 | 폴링, 게임 루프 |
| 비동기 + 블로킹 | select, epoll |

**참고자료**
- [Linux select(2)](https://man7.org/linux/man-pages/man2/select.2.html)[^121]

</details>

[^121]: Linux select() 시스템 콜

### OS-121
I/O 멀티플렉싱에 대해 설명해 주세요.

<details>
<summary>답변</summary>

**I/O 멀티플렉싱**은 하나의 스레드가 **여러 I/O 채널을 동시에 감시**하는 기법입니다.

**필요성**:
- 수천 개의 연결을 처리해야 하는 서버
- 스레드/프로세스 생성 오버헤드 방지
- C10K 문제 해결

**메커니즘**:
```
+--------+
| 스레드  |
+--------+
    |
    v
[멀티플렉서] <-- fd1, fd2, fd3, ... fdN
    |
    v
준비된 fd 반환 -> 해당 fd 처리
```

**주요 구현**:

| 함수 | 특징 |
|------|------|
| **select** | 최대 1024개 fd, O(n) |
| **poll** | fd 수 제한 없음, O(n) |
| **epoll** (Linux) | O(1), 대규모 연결에 효율적 |
| **kqueue** (BSD) | epoll과 유사 |
| **IOCP** (Windows) | 비동기 완료 포트 |

**epoll 예시**:
```c
int epfd = epoll_create1(0);
epoll_ctl(epfd, EPOLL_CTL_ADD, fd, &event);
int n = epoll_wait(epfd, events, MAX_EVENTS, timeout);
for (int i = 0; i < n; i++) {
    handle(events[i].data.fd);
}
```

**참고자료**
- [Linux man-pages: epoll(7)](https://man7.org/linux/man-pages/man7/epoll.7.html)[^122]

</details>

[^122]: Linux epoll 인터페이스

### OS-122
논블로킹 I/O를 수행할 때 작업 완료 결과를 어떤 방법으로 수신할 수 있나요?

<details>
<summary>답변</summary>

**논블로킹 I/O 결과 수신 방법**:

**1. 폴링 (Polling)**
```c
while (1) {
    int n = read(fd, buf, size);
    if (n > 0) {
        process(buf);
        break;
    }
    if (n == -1 && errno == EAGAIN) {
        // 데이터 없음, 다시 시도
        usleep(1000);
    }
}
```
- 단순하지만 CPU 낭비

**2. I/O 멀티플렉싱**
```c
epoll_wait(epfd, events, MAX_EVENTS, -1);
// 준비된 fd만 처리
```
- 여러 fd를 효율적으로 감시

**3. 시그널 기반 (Signal-Driven)**
```c
fcntl(fd, F_SETFL, O_ASYNC);
signal(SIGIO, handler);
// I/O 가능 시 SIGIO 시그널 수신
```
- 인터럽트 기반

**4. 비동기 I/O (AIO)**
```c
struct aiocb cb;
aio_read(&cb);
// 완료 시:
// - 시그널 (SIGEV_SIGNAL)
// - 콜백 스레드 (SIGEV_THREAD)
// - aio_error/aio_return으로 확인
```

**5. io_uring (최신 Linux)**
```c
io_uring_prep_read(sqe, fd, buf, size, 0);
io_uring_submit(&ring);
io_uring_wait_cqe(&ring, &cqe);  // 완료 대기
```
- 높은 성능, 시스템 콜 최소화

**참고자료**
- [Linux io_uring](https://man7.org/linux/man-pages/man7/io_uring.7.html)[^123]

</details>

[^123]: Linux io_uring 인터페이스
