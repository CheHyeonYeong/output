# Kubernetes / 쿠버네티스

> 카테고리: 컨테이너 오케스트레이션
> [← 면접 질문 목록으로 돌아가기](../interview.md)

---

## 📌 Kubernetes 아키텍처 - Control Plane

### K8S-001
Kubernetes의 전체 아키텍처를 설명하고, Control Plane과 Worker Node의 역할 차이를 설명해주세요.

<details>
<summary>답변</summary>

**Control Plane**: 클러스터 상태 관리 및 의사결정 담당 (kube-apiserver, etcd, scheduler, controller-manager)

**Worker Node**: 실제 Pod 실행 담당 (kubelet, kube-proxy, Container Runtime)

**핵심 차이**: Control Plane은 "결정", Worker Node는 "실행"

**참고자료**
- [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)[^1]

</details>

[^1]: Kubernetes 공식 문서 - 클러스터 컴포넌트

### K8S-002
Kubernetes Control Plane의 kube-apiserver의 역할과 동작 방식에 대해 설명해주세요. 다른 컴포넌트들과 어떻게 통신하나요?

<details>
<summary>답변</summary>

**역할**: Kubernetes API를 노출하는 Control Plane의 프론트엔드. 모든 컴포넌트 간 통신의 중심점.

**동작 방식**:
- RESTful API 제공 (kubectl, 다른 컴포넌트 요청 처리)
- 인증, 인가, Admission Control 수행
- etcd와 직접 통신하는 유일한 컴포넌트

**통신 방식**: 다른 컴포넌트들은 API Server를 통해서만 상호작용 (Hub-and-Spoke 패턴)

**참고자료**
- [kube-apiserver](https://kubernetes.io/docs/concepts/overview/components/#kube-apiserver)[^2]

</details>

[^2]: Kubernetes 공식 문서 - kube-apiserver

### K8S-003
Kubernetes의 etcd의 역할과 중요성에 대해 설명해주세요. 왜 etcd의 백업이 중요한가요?

<details>
<summary>답변</summary>

**역할**: 클러스터의 모든 상태 데이터를 저장하는 분산 키-값 저장소

**중요성**:
- 모든 클러스터 설정, Pod/Service 정보, Secret 등 저장
- 고가용성을 위해 Raft 합의 알고리즘 사용

**백업이 중요한 이유**: etcd 손실 = 클러스터 전체 상태 손실. 재해 복구를 위해 정기적 백업 필수

**참고자료**
- [etcd](https://kubernetes.io/docs/concepts/overview/components/#etcd)[^3]

</details>

[^3]: Kubernetes 공식 문서 - etcd

### K8S-004
Kubernetes kube-scheduler의 스케줄링 과정을 단계별로 설명해주세요. Filtering과 Scoring 단계는 무엇인가요?

<details>
<summary>답변</summary>

**스케줄링 과정**:
1. **Filtering**: Pod 실행 가능한 노드 필터링 (리소스, nodeSelector, taint/toleration 등 확인)
2. **Scoring**: 필터링된 노드들에 점수 부여 (리소스 균형, affinity 등 고려)
3. 최고 점수 노드에 Pod 배정

**Filtering**: "실행 가능한가?" - 불가능한 노드 제외
**Scoring**: "어디가 최적인가?" - 적합도 점수 계산

**참고자료**
- [Kubernetes Scheduler](https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/)[^4]

</details>

[^4]: Kubernetes 공식 문서 - kube-scheduler

### K8S-005
Kubernetes kube-controller-manager에 포함된 주요 컨트롤러들과 각각의 역할에 대해 설명해주세요.

<details>
<summary>답변</summary>

**주요 컨트롤러**:
- **Node Controller**: 노드 상태 모니터링, 장애 감지
- **Replication Controller**: ReplicaSet의 Pod 수 유지
- **Endpoints Controller**: Service와 Pod 연결 관리
- **ServiceAccount Controller**: 네임스페이스별 기본 ServiceAccount 생성
- **Deployment Controller**: Deployment 상태 관리

모든 컨트롤러는 현재 상태를 원하는 상태로 수렴시키는 제어 루프 실행

**참고자료**
- [kube-controller-manager](https://kubernetes.io/docs/concepts/overview/components/#kube-controller-manager)[^5]

</details>

[^5]: Kubernetes 공식 문서 - kube-controller-manager

### K8S-006
Kubernetes cloud-controller-manager의 역할과 클라우드 프로바이더와의 통합 방식에 대해 설명해주세요.

<details>
<summary>답변</summary>

**역할**: 클라우드 공급자 전용 로직을 Kubernetes 코어에서 분리하여 관리

**주요 컨트롤러**:
- **Node Controller**: 클라우드에서 노드 삭제 시 감지
- **Route Controller**: 클라우드 인프라 라우트 설정
- **Service Controller**: LoadBalancer 타입 Service 생성 시 클라우드 로드밸런서 프로비저닝

**통합 방식**: 각 클라우드 벤더(AWS, GCP, Azure)가 자체 cloud-controller-manager 구현 제공

**참고자료**
- [Cloud Controller Manager](https://kubernetes.io/docs/concepts/overview/components/#cloud-controller-manager)[^6]

</details>

[^6]: Kubernetes 공식 문서 - cloud-controller-manager

---

## 📌 Kubernetes 아키텍처 - Node 컴포넌트

### K8S-007
Kubernetes Worker Node의 kubelet의 역할과 동작 방식에 대해 설명해주세요. Pod의 상태를 어떻게 관리하나요?

<details>
<summary>답변</summary>

**역할**: 각 노드에서 실행되며 Pod와 컨테이너 실행을 담당하는 에이전트

**동작 방식**:
- API Server로부터 PodSpec 수신
- Container Runtime을 통해 컨테이너 생성/관리
- Pod 상태를 주기적으로 API Server에 보고

**Pod 상태 관리**:
- Liveness/Readiness Probe 실행
- 컨테이너 재시작 정책 적용
- 리소스 사용량 모니터링

**참고자료**
- [kubelet](https://kubernetes.io/docs/concepts/overview/components/#kubelet)[^7]

</details>

[^7]: Kubernetes 공식 문서 - kubelet

### K8S-008
Kubernetes Worker Node의 kube-proxy의 역할과 iptables/IPVS 모드의 차이점에 대해 설명해주세요.

<details>
<summary>답변</summary>

**역할**: 노드의 네트워크 규칙 관리, Service의 가상 IP를 통한 Pod 접근 구현

**iptables 모드**:
- 리눅스 iptables 규칙으로 트래픽 라우팅
- 랜덤 방식 로드밸런싱
- 규칙이 많아지면 성능 저하

**IPVS 모드**:
- 커널 레벨 로드밸런서 사용
- 다양한 로드밸런싱 알고리즘 지원 (rr, lc, sh 등)
- 대규모 클러스터에서 더 나은 성능

**참고자료**
- [kube-proxy](https://kubernetes.io/docs/concepts/overview/components/#kube-proxy)[^8]

</details>

[^8]: Kubernetes 공식 문서 - kube-proxy

### K8S-009
Kubernetes의 Container Runtime Interface(CRI)란 무엇이며, containerd와 CRI-O의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**CRI**: kubelet과 컨테이너 런타임 간의 표준 인터페이스. 다양한 런타임을 플러그인 방식으로 사용 가능

**containerd**:
- Docker에서 분리된 런타임
- 범용적, 다양한 기능 제공
- Docker 이미지 호환

**CRI-O**:
- Kubernetes 전용으로 설계
- 경량화, 최소 기능만 제공
- OCI 표준 준수에 집중

**공통점**: 둘 다 OCI 표준 준수, Kubernetes와 호환

**참고자료**
- [Container Runtime](https://kubernetes.io/docs/setup/production-environment/container-runtimes/)[^9]

</details>

[^9]: Kubernetes 공식 문서 - 컨테이너 런타임

### K8S-010
Kubernetes에서 사용되는 CNI(Container Network Interface)란 무엇이며, 주요 CNI 플러그인들을 비교해주세요.

<details>
<summary>답변</summary>

**CNI**: 컨테이너 네트워크 설정을 위한 표준 인터페이스

**주요 플러그인 비교**:
- **Calico**: NetworkPolicy 지원, BGP 기반, 대규모 클러스터에 적합
- **Flannel**: 간단한 설정, 오버레이 네트워크, 소규모 클러스터에 적합
- **Cilium**: eBPF 기반, 고성능, 고급 보안 기능
- **Weave**: 암호화 지원, 설정 간편, 멀티클라우드 환경에 적합

**선택 기준**: 클러스터 규모, NetworkPolicy 필요 여부, 성능 요구사항

**참고자료**
- [Cluster Networking](https://kubernetes.io/docs/concepts/cluster-administration/networking/)[^10]

</details>

[^10]: Kubernetes 공식 문서 - 클러스터 네트워킹

---

## 📌 Pod 기본 개념과 생명주기

### K8S-011
Pod란 무엇이며, 왜 컨테이너 대신 Pod 단위로 관리하나요?

<details>
<summary>답변</summary>

**Pod**: Kubernetes에서 배포 가능한 가장 작은 단위. 하나 이상의 컨테이너 그룹

**Pod 단위 관리 이유**:
- **공유 리소스**: 같은 Pod 내 컨테이너는 네트워크(localhost), 스토리지 공유
- **공동 스케줄링**: 밀접하게 연관된 컨테이너를 같은 노드에 배치
- **생명주기 관리**: 함께 시작/종료되어야 하는 컨테이너 그룹화
- **Sidecar 패턴**: 메인 앱 + 보조 컨테이너 조합 가능

**참고자료**
- [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)[^11]

</details>

[^11]: Kubernetes 공식 문서 - Pod 개념

### K8S-012
Pod의 생명주기(Lifecycle) 단계(Pending, Running, Succeeded, Failed, Unknown)에 대해 각각 설명해주세요.

<details>
<summary>답변</summary>

**Pod Phase**:
- **Pending**: Pod 생성됨, 컨테이너 아직 실행 안됨 (이미지 다운로드, 스케줄링 대기)
- **Running**: 최소 하나의 컨테이너 실행 중
- **Succeeded**: 모든 컨테이너 성공적 종료 (exit 0), 재시작 안됨
- **Failed**: 모든 컨테이너 종료, 하나 이상 실패 (exit non-zero)
- **Unknown**: Pod 상태 확인 불가 (노드 통신 문제)

**참고자료**
- [Pod Lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/)[^12]

</details>

[^12]: Kubernetes 공식 문서 - Pod 생명주기

### K8S-013
Pod의 재시작 정책(restartPolicy)인 Always, OnFailure, Never의 차이점과 사용 시나리오를 설명해주세요.

<details>
<summary>답변</summary>

**restartPolicy**:
- **Always** (기본값): 항상 재시작. Deployment, ReplicaSet용
- **OnFailure**: 실패(exit code != 0) 시만 재시작. Job용
- **Never**: 재시작 안함. 일회성 작업용

**사용 시나리오**:
- Always: 웹 서버, API 서버 등 상시 운영 앱
- OnFailure: 배치 작업, 실패 시 재시도 필요한 Job
- Never: 디버깅, 로그 분석 등 일회성 작업

**참고자료**
- [Pod Lifecycle - Restart Policy](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy)[^13]

</details>

[^13]: Kubernetes 공식 문서 - 재시작 정책

### K8S-014
Pod가 Pending 상태에 머무는 원인들과 해결 방법을 설명해주세요.

<details>
<summary>답변</summary>

**주요 원인과 해결 방법**:
- **리소스 부족**: 노드 추가 또는 리소스 요청량 조정
- **nodeSelector/affinity 불일치**: 레이블 확인 및 수정
- **Taint 미허용**: Toleration 추가
- **PVC 바인딩 실패**: PV 확인, StorageClass 점검
- **이미지 다운로드 지연**: 이미지 경로/권한 확인

**디버깅**: `kubectl describe pod <pod-name>`으로 Events 확인

**참고자료**
- [Debugging Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/)[^14]

</details>

[^14]: Kubernetes 공식 문서 - Pod 디버깅

### K8S-015
Kubernetes의 Pod Phase와 Container State의 차이점은 무엇인가요?

<details>
<summary>답변</summary>

**Pod Phase**: Pod 전체의 상태 (Pending, Running, Succeeded, Failed, Unknown)

**Container State**: 개별 컨테이너의 상태
- **Waiting**: 시작 대기 (이미지 pull, 볼륨 마운트 등)
- **Running**: 실행 중
- **Terminated**: 종료됨 (성공/실패)

**차이점**:
- Pod Phase는 상위 레벨 요약
- Container State는 각 컨테이너의 세부 상태
- Pod Running이어도 일부 컨테이너는 Waiting/Terminated일 수 있음

**참고자료**
- [Container States](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-states)[^15]

</details>

[^15]: Kubernetes 공식 문서 - 컨테이너 상태

---

## 📌 Pod 다중 컨테이너 패턴

### K8S-016
Sidecar 패턴이란 무엇이며, 어떤 상황에서 사용하나요? 구체적인 예시를 들어주세요.

<details>
<summary>답변</summary>

**Sidecar 패턴**: 메인 컨테이너와 함께 보조 기능을 수행하는 컨테이너를 같은 Pod에 배치

**사용 상황**:
- 로깅: 로그 수집/전송 (Fluentd sidecar)
- 모니터링: 메트릭 수집 (Prometheus exporter)
- 프록시: 서비스 메시 (Envoy sidecar)
- 설정 동기화: ConfigMap 변경 감지

**예시**: 웹 서버 + 로그 수집기
- 메인: nginx 컨테이너
- Sidecar: fluentd 컨테이너 (로그 파일 읽어서 전송)
- 공유 볼륨으로 로그 파일 공유

**참고자료**
- [Sidecar Containers](https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/)[^16]

</details>

[^16]: Kubernetes 공식 문서 - Sidecar 컨테이너

### K8S-017
Kubernetes의 Ambassador 패턴이란 무엇이며, 프록시 역할을 하는 컨테이너의 활용 사례를 설명해주세요.

<details>
<summary>답변</summary>

**Ambassador 패턴**: 외부 서비스 접근을 대리하는 프록시 컨테이너 패턴

**역할**: 메인 컨테이너가 localhost로 통신하면, Ambassador가 외부 서비스로 연결

**활용 사례**:
- **DB 연결 프록시**: 메인앱 -> localhost:5432 -> Ambassador -> 실제 DB 클러스터
- **API Gateway**: 인증, 속도 제한 처리
- **서비스 디스커버리**: 복잡한 라우팅 로직 캡슐화
- **레거시 시스템 연동**: 프로토콜 변환

**장점**: 메인 앱 코드 변경 없이 외부 연결 로직 분리

**참고자료**
- [Multi-container Pods](https://kubernetes.io/docs/concepts/workloads/pods/#how-pods-manage-multiple-containers)[^17]

</details>

[^17]: Kubernetes 공식 문서 - 멀티 컨테이너 Pod

### K8S-018
Kubernetes의 Adapter 패턴이란 무엇이며, 로그 포맷 변환 등의 활용 사례를 설명해주세요.

<details>
<summary>답변</summary>

**Adapter 패턴**: 메인 컨테이너의 출력을 표준 형식으로 변환하는 컨테이너 패턴

**역할**: 다양한 형식의 데이터를 통일된 인터페이스로 변환

**활용 사례**:
- **로그 포맷 변환**: 앱별 로그 형식 -> 표준 JSON 형식
- **메트릭 변환**: 앱 메트릭 -> Prometheus 형식
- **데이터 정규화**: 레거시 시스템 출력 변환
- **프로토콜 변환**: XML -> JSON

**예시**: 로그 어댑터
- 메인: 자체 로그 형식 출력
- Adapter: 로그 파일 읽어서 표준 JSON으로 변환 후 출력

**참고자료**
- [Multi-container Pods](https://kubernetes.io/docs/concepts/workloads/pods/#how-pods-manage-multiple-containers)[^18]

</details>

[^18]: Kubernetes 공식 문서 - 멀티 컨테이너 Pod

### K8S-019
Init Container의 역할과 일반 컨테이너와의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**역할**: Pod 내 메인 컨테이너 시작 전에 초기화 작업 수행

**일반 컨테이너와의 차이점**:
| 구분 | Init Container | 일반 컨테이너 |
|------|----------------|---------------|
| 실행 시점 | 메인 컨테이너 전 | Init 완료 후 |
| 실행 방식 | 순차적 (하나씩) | 동시 (병렬) |
| 완료 조건 | 반드시 완료되어야 함 | 계속 실행 |
| Probe | 지원 안함 | 지원 |

**사용 예시**:
- DB 연결 대기
- 설정 파일 다운로드
- 권한/스키마 초기화

**참고자료**
- [Init Containers](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)[^19]

</details>

[^19]: Kubernetes 공식 문서 - Init 컨테이너

### K8S-020
Kubernetes Init Container의 실행 순서와 실패 시 동작에 대해 설명해주세요.

<details>
<summary>답변</summary>

**실행 순서**:
1. Init Container들이 정의된 순서대로 순차 실행
2. 각 Init Container는 이전 것이 성공해야 시작
3. 모든 Init Container 성공 후 메인 컨테이너 시작

**실패 시 동작**:
- Init Container 실패 -> Pod 재시작 (restartPolicy에 따라)
- restartPolicy: Always/OnFailure -> Init Container부터 재실행
- restartPolicy: Never -> Pod Failed 상태

**주의사항**:
- Init Container 실패 시 Pod는 Pending 상태 유지
- 무한 재시도로 CrashLoopBackOff 발생 가능

**참고자료**
- [Init Containers](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/#detailed-behavior)[^20]

</details>

[^20]: Kubernetes 공식 문서 - Init 컨테이너 동작

---

## 📌 워크로드 리소스 - Deployment & ReplicaSet

### K8S-021
Deployment의 역할과 ReplicaSet과의 관계에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Deployment 역할**:
- 선언적 Pod 업데이트 관리
- 롤링 업데이트, 롤백 지원
- 배포 이력 관리

**ReplicaSet과의 관계**:
- Deployment는 ReplicaSet을 생성하고 관리
- ReplicaSet은 Pod 복제본 수 유지
- 업데이트 시 새 ReplicaSet 생성, 기존 것은 스케일 다운

**구조**: `Deployment -> ReplicaSet -> Pod`

**직접 ReplicaSet 사용하지 않는 이유**: Deployment가 버전 관리, 롤백 등 추가 기능 제공

**참고자료**
- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)[^21]

</details>

[^21]: Kubernetes 공식 문서 - Deployment

### K8S-022
Kubernetes Deployment의 배포 전략(RollingUpdate, Recreate)을 비교하고, 각각의 사용 시나리오를 설명해주세요.

<details>
<summary>답변</summary>

**RollingUpdate** (기본값):
- 점진적으로 새 버전 배포
- 다운타임 없음
- 두 버전이 동시에 존재하는 시간 있음

**Recreate**:
- 기존 Pod 모두 종료 후 새 Pod 생성
- 다운타임 발생
- 버전 혼재 없음

**사용 시나리오**:
- RollingUpdate: 일반적인 웹 서비스, API 서버
- Recreate:
  - 볼륨을 단일 Pod만 사용해야 할 때
  - 버전 호환성 문제가 있을 때
  - 개발/테스트 환경

**참고자료**
- [Deployment Strategy](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#strategy)[^22]

</details>

[^22]: Kubernetes 공식 문서 - Deployment 전략

### K8S-023
Kubernetes RollingUpdate 전략에서 maxSurge와 maxUnavailable 설정의 의미와 적절한 값 설정 방법을 설명해주세요.

<details>
<summary>답변</summary>

**maxSurge**: 원하는 Pod 수 대비 최대 초과 생성 가능 수
- 예: replicas=10, maxSurge=25% -> 최대 12개까지 존재 가능

**maxUnavailable**: 업데이트 중 최대 사용 불가 Pod 수
- 예: replicas=10, maxUnavailable=25% -> 최소 7개는 항상 가용

**적절한 설정**:
- 빠른 배포: maxSurge 높게, maxUnavailable 높게
- 안정적 배포: maxSurge 낮게, maxUnavailable=0
- 리소스 제한: maxSurge=0, maxUnavailable 활용

**기본값**: 둘 다 25%

**참고자료**
- [Rolling Update Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update-deployment)[^23]

</details>

[^23]: Kubernetes 공식 문서 - 롤링 업데이트

### K8S-024
Kubernetes Deployment의 롤백(rollback) 방법과 revision history 관리에 대해 설명해주세요.

<details>
<summary>답변</summary>

**롤백 방법**:
```bash
# 이전 버전으로 롤백
kubectl rollout undo deployment/<name>

# 특정 리비전으로 롤백
kubectl rollout undo deployment/<name> --to-revision=2

# 이력 확인
kubectl rollout history deployment/<name>
```

**Revision History 관리**:
- `revisionHistoryLimit`: 보관할 ReplicaSet 수 (기본값 10)
- 각 업데이트마다 새 ReplicaSet 생성, 기존 것은 보관
- 이력에서 롤백 가능

**참고자료**
- [Rolling Back a Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-back-a-deployment)[^24]

</details>

[^24]: Kubernetes 공식 문서 - Deployment 롤백

### K8S-025
Blue-Green 배포와 Canary 배포를 Kubernetes에서 구현하는 방법을 설명해주세요.

<details>
<summary>답변</summary>

**Blue-Green 배포**:
1. 두 개의 Deployment 생성 (blue, green)
2. Service selector로 하나만 활성화
3. 전환 시 Service selector 변경
```yaml
# Service selector를 version: green으로 변경
selector:
  app: myapp
  version: green
```

**Canary 배포**:
1. 기존 Deployment + 새 버전 Deployment (적은 replicas)
2. 동일한 label로 Service가 둘 다 선택
3. 점진적으로 새 버전 replicas 증가

**고급 방법**: Istio VirtualService로 트래픽 비율 제어

**참고자료**
- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)[^25]

</details>

[^25]: Kubernetes 공식 문서 - Deployment

---

## 📌 워크로드 리소스 - StatefulSet

### K8S-026
StatefulSet이란 무엇이며, Deployment와의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**StatefulSet**: 상태를 가진 애플리케이션을 위한 워크로드 리소스

**Deployment와의 차이점**:
| 구분 | StatefulSet | Deployment |
|------|-------------|------------|
| Pod 이름 | 고정 (app-0, app-1) | 랜덤 |
| 네트워크 ID | 고정 (Headless Service) | 변경 가능 |
| 스토리지 | Pod별 PVC 유지 | 공유 또는 없음 |
| 배포 순서 | 순차적 | 병렬 |
| 삭제 순서 | 역순 | 무관 |

**사용 사례**: 데이터베이스, 분산 시스템 (Kafka, ZooKeeper, Elasticsearch)

**참고자료**
- [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)[^26]

</details>

[^26]: Kubernetes 공식 문서 - StatefulSet

### K8S-027
Kubernetes StatefulSet에서 Pod 이름과 네트워크 ID의 안정성(stable identity)은 어떻게 보장되나요?

<details>
<summary>답변</summary>

**Pod 이름 안정성**:
- 형식: `<statefulset-name>-<ordinal>` (예: mysql-0, mysql-1)
- Pod 재생성 시에도 동일한 이름 유지
- ordinal은 0부터 순차 증가

**네트워크 ID 안정성**:
- Headless Service와 함께 사용
- DNS: `<pod-name>.<service-name>.<namespace>.svc.cluster.local`
- 예: `mysql-0.mysql.default.svc.cluster.local`

**보장 방법**:
- StatefulSet Controller가 ordinal 기반 관리
- Pod 삭제/재생성 시 동일 이름과 PVC 재연결

**참고자료**
- [Stable Network ID](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-network-id)[^27]

</details>

[^27]: Kubernetes 공식 문서 - Stable Network ID

### K8S-028
Kubernetes StatefulSet의 순차적 배포(ordered deployment)와 병렬 배포(parallel deployment) 방식의 차이를 설명해주세요.

<details>
<summary>답변</summary>

**podManagementPolicy 설정**:

**OrderedReady** (기본값):
- Pod를 순서대로 생성 (0 -> 1 -> 2)
- 이전 Pod가 Ready 상태여야 다음 생성
- 삭제는 역순 (2 -> 1 -> 0)
- 사용: 마스터-슬레이브 DB, 리더 선출 시스템

**Parallel**:
- 모든 Pod 동시 생성/삭제
- 순서 보장 불필요 시 사용
- 더 빠른 스케일링

```yaml
spec:
  podManagementPolicy: Parallel  # 또는 OrderedReady
```

**참고자료**
- [Pod Management Policies](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#pod-management-policies)[^28]

</details>

[^28]: Kubernetes 공식 문서 - Pod 관리 정책

### K8S-029
Kubernetes StatefulSet에서 PersistentVolumeClaim 템플릿의 역할과 동작 방식을 설명해주세요.

<details>
<summary>답변</summary>

**역할**: 각 Pod에 대해 개별 PVC 자동 생성

**동작 방식**:
1. Pod 생성 시 volumeClaimTemplates 기반으로 PVC 생성
2. PVC 이름: `<template-name>-<statefulset-name>-<ordinal>`
3. Pod와 PVC 영구 연결

**특징**:
- Pod 삭제 시 PVC는 유지됨
- Pod 재생성 시 기존 PVC 재연결
- StatefulSet 삭제 시에도 PVC 수동 삭제 필요

```yaml
volumeClaimTemplates:
- metadata:
    name: data
  spec:
    accessModes: ["ReadWriteOnce"]
    resources:
      requests:
        storage: 10Gi
```

**참고자료**
- [Stable Storage](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#stable-storage)[^29]

</details>

[^29]: Kubernetes 공식 문서 - Stable Storage

### K8S-030
Kubernetes StatefulSet 사용 시 Headless Service가 필요한 이유를 설명해주세요.

<details>
<summary>답변</summary>

**Headless Service**: ClusterIP가 None인 Service

**필요한 이유**:
1. **개별 Pod 접근**: 각 Pod에 고유 DNS 이름 부여
   - 일반 Service: 로드밸런싱으로 임의 Pod 접근
   - Headless: 특정 Pod 직접 접근 가능

2. **DNS 레코드 생성**:
   - `pod-name.service-name.namespace.svc.cluster.local`
   - 클라이언트가 특정 인스턴스에 연결 필요 시 사용

3. **상태 저장 앱 요구사항**:
   - DB 복제 시 마스터/슬레이브 구분 필요
   - 클러스터 멤버 간 직접 통신

**참고자료**
- [Headless Services](https://kubernetes.io/docs/concepts/services-networking/service/#headless-services)[^30]

</details>

[^30]: Kubernetes 공식 문서 - Headless Services

---

## 📌 워크로드 리소스 - DaemonSet, Job, CronJob

### K8S-031
DaemonSet의 역할과 사용 사례(로그 수집, 모니터링 에이전트 등)를 설명해주세요.

<details>
<summary>답변</summary>

**역할**: 모든(또는 특정) 노드에서 Pod를 하나씩 실행하도록 보장

**동작**:
- 노드 추가 시 자동으로 Pod 생성
- 노드 삭제 시 자동으로 Pod 제거

**사용 사례**:
- **로그 수집**: Fluentd, Filebeat (각 노드 로그 수집)
- **모니터링**: Node Exporter, Datadog Agent
- **네트워킹**: CNI 플러그인 (Calico, Weave)
- **스토리지**: CSI 드라이버
- **보안**: 보안 에이전트, 안티바이러스

**참고자료**
- [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)[^31]

</details>

[^31]: Kubernetes 공식 문서 - DaemonSet

### K8S-032
Kubernetes DaemonSet에서 특정 노드에만 Pod를 배포하는 방법을 설명해주세요.

<details>
<summary>답변</summary>

**방법 1: nodeSelector**
```yaml
spec:
  template:
    spec:
      nodeSelector:
        disk: ssd
```

**방법 2: Node Affinity**
```yaml
spec:
  template:
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: node-type
                operator: In
                values: ["worker"]
```

**방법 3: Toleration** (Taint된 노드에 배포)
```yaml
spec:
  template:
    spec:
      tolerations:
      - key: "node-role"
        operator: "Equal"
        value: "special"
        effect: "NoSchedule"
```

**참고자료**
- [DaemonSet on specific Nodes](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/#running-pods-on-select-nodes)[^32]

</details>

[^32]: Kubernetes 공식 문서 - 특정 노드에 DaemonSet

### K8S-033
Kubernetes Job 리소스의 역할과 completions, parallelism 설정의 의미를 설명해주세요.

<details>
<summary>답변</summary>

**역할**: 하나 이상의 Pod를 생성하고 지정된 수만큼 성공적으로 완료되도록 보장

**설정값**:
- **completions**: 성공해야 하는 Pod 수 (기본값: 1)
- **parallelism**: 동시에 실행할 Pod 수 (기본값: 1)

**예시**:
```yaml
spec:
  completions: 5    # 5개 작업 완료 필요
  parallelism: 2    # 동시에 2개씩 실행
```

**동작 패턴**:
- completions=1, parallelism=1: 단일 작업
- completions=N, parallelism=1: 순차 실행
- completions=N, parallelism=M: 병렬 배치

**참고자료**
- [Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/job/)[^33]

</details>

[^33]: Kubernetes 공식 문서 - Job

### K8S-034
Kubernetes Job의 backoffLimit와 activeDeadlineSeconds 설정의 역할을 설명해주세요.

<details>
<summary>답변</summary>

**backoffLimit**:
- Job 실패 시 재시도 횟수 (기본값: 6)
- 재시도 간격: 지수 백오프 (10s, 20s, 40s... 최대 6분)
- 초과 시 Job Failed 상태

**activeDeadlineSeconds**:
- Job의 최대 실행 시간 (초)
- 시간 초과 시 모든 Pod 종료, Job Failed
- backoffLimit보다 우선

```yaml
spec:
  backoffLimit: 4           # 4번 재시도
  activeDeadlineSeconds: 600 # 최대 10분
```

**사용 시나리오**:
- 무한 루프 방지
- SLA 준수를 위한 타임아웃 설정

**참고자료**
- [Job Termination](https://kubernetes.io/docs/concepts/workloads/controllers/job/#job-termination-and-cleanup)[^34]

</details>

[^34]: Kubernetes 공식 문서 - Job 종료 및 정리

### K8S-035
Kubernetes CronJob의 역할과 스케줄 표현식, concurrencyPolicy 설정에 대해 설명해주세요.

<details>
<summary>답변</summary>

**역할**: 지정된 스케줄에 따라 Job을 반복 생성

**스케줄 표현식** (Cron 형식):
```
분 시 일 월 요일
*/5 * * * *    # 5분마다
0 2 * * *      # 매일 2시
0 0 1 * *      # 매월 1일 자정
```

**concurrencyPolicy**:
- **Allow** (기본값): 동시 실행 허용
- **Forbid**: 이전 Job 실행 중이면 새 Job 건너뜀
- **Replace**: 이전 Job 취소하고 새 Job 시작

```yaml
spec:
  schedule: "0 * * * *"
  concurrencyPolicy: Forbid
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
```

**참고자료**
- [CronJob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)[^35]

</details>

[^35]: Kubernetes 공식 문서 - CronJob

---

## 📌 서비스 & 네트워킹 - Service 타입

### K8S-036
Kubernetes Service의 역할과 필요성에 대해 설명해주세요.

<details>
<summary>답변</summary>

**역할**: Pod 집합에 대한 단일 접근점 제공 및 로드밸런싱

**필요성**:
1. **Pod IP 변동성**: Pod 재생성 시 IP 변경됨
2. **서비스 디스커버리**: 안정적인 DNS 이름 제공
3. **로드밸런싱**: 여러 Pod에 트래픽 분산
4. **추상화**: 백엔드 Pod 변경에도 클라이언트 영향 없음

**동작 방식**:
- Label Selector로 대상 Pod 그룹 지정
- ClusterIP (가상 IP) 할당
- kube-proxy가 트래픽 라우팅 규칙 관리

**참고자료**
- [Service](https://kubernetes.io/docs/concepts/services-networking/service/)[^36]

</details>

[^36]: Kubernetes 공식 문서 - Service

### K8S-037
Kubernetes ClusterIP 타입 Service의 동작 방식과 사용 시나리오를 설명해주세요.

<details>
<summary>답변</summary>

**동작 방식**:
- 클러스터 내부에서만 접근 가능한 가상 IP 할당
- kube-proxy가 ClusterIP로 오는 트래픽을 Pod로 라우팅
- DNS: `<service-name>.<namespace>.svc.cluster.local`

**특징**:
- 기본 Service 타입
- 외부에서 직접 접근 불가
- 클러스터 내 Pod 간 통신용

**사용 시나리오**:
- 내부 마이크로서비스 간 통신
- 백엔드 DB 접근
- 캐시 서버 (Redis) 접근
- 내부 API 서비스

**참고자료**
- [ClusterIP](https://kubernetes.io/docs/concepts/services-networking/service/#type-clusterip)[^37]

</details>

[^37]: Kubernetes 공식 문서 - ClusterIP

### K8S-038
Kubernetes NodePort 타입 Service의 동작 방식과 포트 범위 제한에 대해 설명해주세요.

<details>
<summary>답변</summary>

**동작 방식**:
1. ClusterIP 기능 포함
2. 모든 노드의 특정 포트에서 Service 노출
3. `<NodeIP>:<NodePort>`로 외부 접근 가능
4. 트래픽: NodePort -> ClusterIP -> Pod

**포트 범위**:
- 기본: 30000-32767
- kube-apiserver `--service-node-port-range` 플래그로 변경 가능

**사용 시나리오**:
- 개발/테스트 환경
- 로드밸런서 없는 온프레미스 환경
- 외부 로드밸런서와 연동

**단점**: 노드 IP 노출, 포트 관리 필요

**참고자료**
- [NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport)[^38]

</details>

[^38]: Kubernetes 공식 문서 - NodePort

### K8S-039
Kubernetes LoadBalancer 타입 Service의 동작 방식과 클라우드 환경에서의 프로비저닝 과정을 설명해주세요.

<details>
<summary>답변</summary>

**동작 방식**:
1. NodePort 기능 포함
2. 클라우드 로드밸런서 자동 프로비저닝
3. 외부 IP 할당
4. 트래픽: External LB -> NodePort -> ClusterIP -> Pod

**프로비저닝 과정**:
1. Service 생성 시 cloud-controller-manager가 감지
2. 클라우드 API 호출하여 LB 생성 (AWS ELB, GCP LB 등)
3. LB가 NodePort로 트래픽 전달하도록 설정
4. External IP가 Service에 할당

**주의사항**:
- 클라우드 환경에서만 동작
- LB당 비용 발생
- 온프레미스는 MetalLB 등 별도 솔루션 필요

**참고자료**
- [LoadBalancer](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer)[^39]

</details>

[^39]: Kubernetes 공식 문서 - LoadBalancer

### K8S-040
Kubernetes ExternalName 타입 Service의 역할과 사용 사례를 설명해주세요.

<details>
<summary>답변</summary>

**역할**: 외부 DNS 이름을 클러스터 내부 Service 이름으로 매핑 (CNAME 레코드)

**동작 방식**:
- ClusterIP 할당 없음
- DNS 쿼리 시 외부 도메인으로 CNAME 반환
- 프록시나 포워딩 없이 DNS 레벨 리디렉션

```yaml
apiVersion: v1
kind: Service
metadata:
  name: external-db
spec:
  type: ExternalName
  externalName: db.example.com
```

**사용 사례**:
- 외부 데이터베이스 연결 (RDS, Cloud SQL)
- 외부 API 서비스 추상화
- 마이그레이션 중 외부 서비스 참조
- 환경별 외부 서비스 전환

**참고자료**
- [ExternalName](https://kubernetes.io/docs/concepts/services-networking/service/#externalname)[^40]

</details>

[^40]: Kubernetes 공식 문서 - ExternalName

### K8S-041
Kubernetes Headless Service란 무엇이며, StatefulSet과 함께 사용되는 이유를 설명해주세요.

<details>
<summary>답변</summary>

**Headless Service**: `clusterIP: None`으로 설정된 Service

**특징**:
- ClusterIP 할당 없음
- DNS 쿼리 시 Pod IP들 직접 반환
- 로드밸런싱 없이 개별 Pod 접근

**StatefulSet과 함께 사용하는 이유**:
1. **개별 Pod DNS**: `pod-name.service.namespace.svc.cluster.local`
2. **안정적 네트워크 ID**: Pod 이름 기반 DNS로 재시작 후에도 동일
3. **직접 통신**: 클러스터 멤버 간 피어 통신 필요 (DB 복제)
4. **클라이언트 제어**: 클라이언트가 특정 인스턴스 선택 가능

**예**: Kafka 브로커, MySQL 마스터/슬레이브 구분

**참고자료**
- [Headless Services](https://kubernetes.io/docs/concepts/services-networking/service/#headless-services)[^41]

</details>

[^41]: Kubernetes 공식 문서 - Headless Services

---

## 📌 서비스 & 네트워킹 - Ingress

### K8S-042
Ingress의 역할과 Service와의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**Ingress 역할**: HTTP/HTTPS 트래픽을 클러스터 내부 Service로 라우팅하는 API 객체

**Service와의 차이점**:
| 구분 | Ingress | Service (LB) |
|------|---------|--------------|
| 프로토콜 | HTTP/HTTPS | L4 (TCP/UDP) |
| 라우팅 | 호스트/경로 기반 | 포트 기반 |
| SSL 종료 | 지원 | 별도 설정 필요 |
| 단일 진입점 | 여러 Service 통합 | Service당 하나 |
| 비용 | LB 하나로 여러 서비스 | Service마다 LB |

**Ingress 기능**:
- 경로 기반 라우팅 (`/api`, `/web`)
- 호스트 기반 라우팅 (`api.example.com`)
- TLS/SSL 종료

**참고자료**
- [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)[^42]

</details>

[^42]: Kubernetes 공식 문서 - Ingress

### K8S-043
Kubernetes Ingress Controller의 역할과 주요 구현체(NGINX, Traefik, HAProxy 등)를 비교해주세요.

<details>
<summary>답변</summary>

**역할**: Ingress 리소스를 감시하고 실제 라우팅 규칙을 구현하는 컨트롤러

**주요 구현체 비교**:
| 구현체 | 특징 |
|--------|------|
| **NGINX** | 가장 널리 사용, 안정적, 풍부한 기능 |
| **Traefik** | 자동 설정, Let's Encrypt 통합, 경량 |
| **HAProxy** | 고성능, 엔터프라이즈급 로드밸런싱 |
| **Contour** | Envoy 기반, 멀티테넌트 지원 |
| **AWS ALB** | AWS 통합, 네이티브 ALB 사용 |

**선택 기준**:
- 성능 요구사항
- 필요한 기능 (mTLS, 속도 제한)
- 클라우드 환경
- 운영 복잡도

**참고자료**
- [Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)[^43]

</details>

[^43]: Kubernetes 공식 문서 - Ingress Controllers

### K8S-044
Kubernetes Ingress에서 호스트 기반 라우팅과 경로 기반 라우팅을 설정하는 방법을 설명해주세요.

<details>
<summary>답변</summary>

**호스트 기반 라우팅**:
```yaml
spec:
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80
  - host: web.example.com
    http:
      paths:
      - backend:
          service:
            name: web-service
```

**경로 기반 라우팅**:
```yaml
spec:
  rules:
  - host: example.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80
      - path: /web
        pathType: Prefix
        backend:
          service:
            name: web-service
```

**pathType**: Exact, Prefix, ImplementationSpecific

**참고자료**
- [Ingress Rules](https://kubernetes.io/docs/concepts/services-networking/ingress/#ingress-rules)[^44]

</details>

[^44]: Kubernetes 공식 문서 - Ingress 규칙

### K8S-045
Kubernetes Ingress에서 TLS/SSL 인증서를 설정하는 방법과 cert-manager와의 연동에 대해 설명해주세요.

<details>
<summary>답변</summary>

**수동 TLS 설정**:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: tls-secret
type: kubernetes.io/tls
data:
  tls.crt: <base64-cert>
  tls.key: <base64-key>
---
apiVersion: networking.k8s.io/v1
kind: Ingress
spec:
  tls:
  - hosts:
    - example.com
    secretName: tls-secret
```

**cert-manager 연동**:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - example.com
    secretName: example-tls  # 자동 생성
```

cert-manager가 Let's Encrypt 인증서 자동 발급/갱신

**참고자료**
- [Ingress TLS](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls)[^45]

</details>

[^45]: Kubernetes 공식 문서 - Ingress TLS

### K8S-046
Kubernetes Ingress의 annotations을 활용한 설정(rate limiting, rewrites 등) 방법을 설명해주세요.

<details>
<summary>답변</summary>

**annotations**: Ingress Controller별 추가 설정 (NGINX Ingress 예시)

**Rate Limiting**:
```yaml
metadata:
  annotations:
    nginx.ingress.kubernetes.io/limit-rps: "10"
    nginx.ingress.kubernetes.io/limit-connections: "5"
```

**URL Rewrite**:
```yaml
metadata:
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
spec:
  rules:
  - http:
      paths:
      - path: /api(/|$)(.*)
```

**기타 유용한 annotations**:
- `ssl-redirect`: HTTP -> HTTPS 리디렉션
- `proxy-body-size`: 요청 바디 크기 제한
- `proxy-read-timeout`: 타임아웃 설정
- `whitelist-source-range`: IP 화이트리스트

**참고자료**
- [NGINX Ingress Annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/)[^46]

</details>

[^46]: NGINX Ingress Controller 문서 - Annotations

---

## 📌 스토리지 - PV, PVC, StorageClass

### K8S-047
PersistentVolume(PV)과 PersistentVolumeClaim(PVC)의 개념과 관계를 설명해주세요.

<details>
<summary>답변</summary>

**PersistentVolume (PV)**:
- 클러스터 레벨의 스토리지 리소스
- 관리자가 프로비저닝 (또는 동적 생성)
- 실제 스토리지 (NFS, EBS, PD 등)를 추상화

**PersistentVolumeClaim (PVC)**:
- 사용자의 스토리지 요청
- 필요한 크기, 접근 모드 명시
- Pod에서 볼륨으로 마운트

**관계**:
```
사용자 -> PVC 생성 -> PV와 바인딩 -> Pod에서 사용
```

- PVC는 조건 맞는 PV에 바인딩
- 1:1 관계 (하나의 PVC = 하나의 PV)
- PVC 삭제 시 PV는 reclaimPolicy에 따라 처리

**참고자료**
- [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)[^47]

</details>

[^47]: Kubernetes 공식 문서 - Persistent Volumes

### K8S-048
Kubernetes PV의 접근 모드(ReadWriteOnce, ReadOnlyMany, ReadWriteMany)의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**접근 모드**:
| 모드 | 약어 | 설명 |
|------|------|------|
| ReadWriteOnce | RWO | 단일 노드에서 읽기/쓰기 |
| ReadOnlyMany | ROX | 여러 노드에서 읽기 전용 |
| ReadWriteMany | RWX | 여러 노드에서 읽기/쓰기 |
| ReadWriteOncePod | RWOP | 단일 Pod에서만 읽기/쓰기 |

**스토리지 타입별 지원**:
- AWS EBS: RWO만 지원
- NFS: RWO, ROX, RWX 모두 지원
- GCP PD: RWO, ROX 지원

**사용 시나리오**:
- RWO: 일반 DB, 단일 인스턴스 앱
- ROX: 공유 설정 파일, 정적 콘텐츠
- RWX: 여러 Pod가 공유하는 업로드 디렉토리

**참고자료**
- [Access Modes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes)[^48]

</details>

[^48]: Kubernetes 공식 문서 - Access Modes

### K8S-049
Kubernetes PV의 Reclaim Policy(Retain, Delete, Recycle)의 차이점과 사용 시나리오를 설명해주세요.

<details>
<summary>답변</summary>

**Reclaim Policy**: PVC 삭제 후 PV 처리 방법

| 정책 | 동작 | 사용 시나리오 |
|------|------|---------------|
| **Retain** | PV와 데이터 유지, 수동 정리 필요 | 중요 데이터, 프로덕션 DB |
| **Delete** | PV와 외부 스토리지 함께 삭제 | 임시 데이터, 동적 프로비저닝 |
| **Recycle** | 데이터 삭제 후 PV 재사용 (deprecated) | 사용 권장 안함 |

**Retain 후 재사용 절차**:
1. PVC 삭제
2. PV에서 claimRef 제거
3. 필요시 데이터 정리
4. 새 PVC로 바인딩

**기본값**: StorageClass에 따라 다름 (동적 프로비저닝은 보통 Delete)

**참고자료**
- [Reclaim Policy](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#reclaiming)[^49]

</details>

[^49]: Kubernetes 공식 문서 - Reclaim Policy

### K8S-050
Kubernetes StorageClass의 역할과 동적 프로비저닝(Dynamic Provisioning)의 동작 방식을 설명해주세요.

<details>
<summary>답변</summary>

**StorageClass 역할**: 스토리지 "클래스" 정의 - 프로비저너, 파라미터, 정책 지정

**동적 프로비저닝 동작**:
1. PVC 생성 시 storageClassName 지정
2. Provisioner가 PVC 감지
3. 자동으로 PV 생성 및 외부 스토리지 프로비저닝
4. PVC와 PV 자동 바인딩

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer
```

**volumeBindingMode**:
- Immediate: PVC 생성 즉시 바인딩
- WaitForFirstConsumer: Pod 스케줄링 후 바인딩

**참고자료**
- [Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/)[^50]

</details>

[^50]: Kubernetes 공식 문서 - Storage Classes

### K8S-051
Kubernetes CSI(Container Storage Interface)의 역할과 주요 CSI 드라이버들에 대해 설명해주세요.

<details>
<summary>답변</summary>

**CSI 역할**: 스토리지 시스템과 Kubernetes 간 표준 인터페이스

**장점**:
- 스토리지 벤더 독립적
- Kubernetes 코어와 분리된 개발/배포
- 플러그인 방식으로 새 스토리지 추가

**주요 CSI 드라이버**:
| 드라이버 | 스토리지 |
|----------|----------|
| aws-ebs-csi-driver | AWS EBS |
| gcp-pd-csi-driver | GCP Persistent Disk |
| azuredisk-csi-driver | Azure Disk |
| csi-driver-nfs | NFS |
| secrets-store-csi-driver | Secret 관리 |
| ceph-csi | Ceph RBD/CephFS |

**구성 요소**: Controller Plugin, Node Plugin

**참고자료**
- [CSI](https://kubernetes.io/docs/concepts/storage/volumes/#csi)[^51]

</details>

[^51]: Kubernetes 공식 문서 - CSI

### K8S-052
Kubernetes의 emptyDir, hostPath, configMap, secret 볼륨 타입의 차이점과 사용 사례를 설명해주세요.

<details>
<summary>답변</summary>

| 볼륨 타입 | 생명주기 | 사용 사례 |
|-----------|----------|-----------|
| **emptyDir** | Pod와 함께 (임시) | 컨테이너 간 데이터 공유, 캐시 |
| **hostPath** | 노드에 영구 저장 | 로그 수집, 시스템 파일 접근 |
| **configMap** | ConfigMap 수명 | 설정 파일, 환경변수 |
| **secret** | Secret 수명 | 민감 정보 (패스워드, 키) |

**emptyDir**: Pod 삭제 시 데이터 손실
```yaml
volumes:
- name: cache
  emptyDir: {}
```

**hostPath**: 노드 종속적, 보안 주의
```yaml
volumes:
- name: logs
  hostPath:
    path: /var/log
```

**configMap/secret**: 읽기 전용, 자동 업데이트 가능

**참고자료**
- [Volumes](https://kubernetes.io/docs/concepts/storage/volumes/)[^52]

</details>

[^52]: Kubernetes 공식 문서 - Volumes

---

## 📌 컨피그 & 시크릿

### K8S-053
ConfigMap의 역할과 생성 방법(literal, file, directory)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**역할**: 설정 데이터를 키-값 쌍으로 저장, 컨테이너와 설정 분리

**생성 방법**:

**Literal (키-값)**:
```bash
kubectl create configmap my-config --from-literal=key1=value1
```

**File (파일 내용)**:
```bash
kubectl create configmap my-config --from-file=config.properties
```

**Directory (디렉토리 전체)**:
```bash
kubectl create configmap my-config --from-file=./configs/
```

**YAML로 직접 생성**:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-config
data:
  key1: value1
  config.properties: |
    setting1=value
```

**참고자료**
- [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/)[^53]

</details>

[^53]: Kubernetes 공식 문서 - ConfigMap

### K8S-054
Kubernetes ConfigMap을 Pod에 주입하는 방법(환경변수, 볼륨 마운트)의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**환경변수 방식**:
```yaml
env:
- name: MY_VAR
  valueFrom:
    configMapKeyRef:
      name: my-config
      key: key1
```
- Pod 시작 시 값 고정
- ConfigMap 변경 시 Pod 재시작 필요
- 단순 키-값에 적합

**볼륨 마운트 방식**:
```yaml
volumes:
- name: config
  configMap:
    name: my-config
volumeMounts:
- name: config
  mountPath: /etc/config
```
- 파일로 마운트
- ConfigMap 변경 시 자동 업데이트 (지연 있음)
- 설정 파일 형태에 적합

**차이점 요약**:
| 방식 | 업데이트 | 형태 |
|------|----------|------|
| 환경변수 | 재시작 필요 | 키-값 |
| 볼륨 | 자동 (수초~분) | 파일 |

**참고자료**
- [Configure Pod ConfigMap](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/)[^54]

</details>

[^54]: Kubernetes 공식 문서 - Pod ConfigMap 설정

### K8S-055
Kubernetes Secret의 역할과 ConfigMap과의 차이점을 설명해주세요. Secret은 정말 안전한가요?

<details>
<summary>답변</summary>

**역할**: 민감한 데이터 (패스워드, 토큰, 키) 저장

**ConfigMap과의 차이**:
| 구분 | Secret | ConfigMap |
|------|--------|-----------|
| 용도 | 민감 데이터 | 일반 설정 |
| 저장 | Base64 인코딩 | 평문 |
| 메모리 | tmpfs에 저장 | 일반 저장 |
| 크기 제한 | 1MB | 1MB |

**Secret은 정말 안전한가?**
- **기본적으로 안전하지 않음**: Base64는 암호화가 아님
- etcd에 평문 저장 (기본 설정)

**보안 강화 방법**:
- etcd 암호화 활성화
- RBAC로 접근 제한
- 외부 시크릿 관리자 사용 (Vault, AWS Secrets Manager)
- Sealed Secrets 사용

**참고자료**
- [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)[^55]

</details>

[^55]: Kubernetes 공식 문서 - Secret

### K8S-056
Kubernetes Secret의 타입(Opaque, kubernetes.io/dockerconfigjson, kubernetes.io/tls 등)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**주요 Secret 타입**:

| 타입 | 용도 |
|------|------|
| **Opaque** | 기본 타입, 임의의 사용자 데이터 |
| **kubernetes.io/dockerconfigjson** | Docker 레지스트리 인증 |
| **kubernetes.io/tls** | TLS 인증서 (tls.crt, tls.key) |
| **kubernetes.io/basic-auth** | 기본 인증 (username, password) |
| **kubernetes.io/ssh-auth** | SSH 인증 (ssh-privatekey) |
| **kubernetes.io/service-account-token** | ServiceAccount 토큰 |

**생성 예시**:
```bash
# Docker 레지스트리
kubectl create secret docker-registry regcred \
  --docker-server=registry.io \
  --docker-username=user \
  --docker-password=pass

# TLS
kubectl create secret tls tls-secret \
  --cert=cert.pem --key=key.pem
```

**참고자료**
- [Secret Types](https://kubernetes.io/docs/concepts/configuration/secret/#secret-types)[^56]

</details>

[^56]: Kubernetes 공식 문서 - Secret 타입

### K8S-057
외부 시크릿 관리 도구(Vault, AWS Secrets Manager)와 Kubernetes Secret의 연동 방법을 설명해주세요.

<details>
<summary>답변</summary>

**연동 방법**:

**1. External Secrets Operator**:
- 외부 시크릿을 Kubernetes Secret으로 동기화
- AWS Secrets Manager, Vault, GCP Secret Manager 지원
```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
spec:
  secretStoreRef:
    name: aws-secrets-manager
  target:
    name: my-secret
  data:
  - secretKey: password
    remoteRef:
      key: prod/db-password
```

**2. Secrets Store CSI Driver**:
- CSI 볼륨으로 시크릿 마운트
- Pod에서 파일로 접근

**3. Vault Agent Injector**:
- Sidecar로 Vault 시크릿 주입
- 자동 갱신 지원

**장점**: 중앙 집중 관리, 감사 로그, 자동 회전

**참고자료**
- [External Secrets Operator](https://external-secrets.io/)[^57]

</details>

[^57]: External Secrets Operator 공식 문서

### K8S-058
Kubernetes ConfigMap/Secret 변경 시 Pod에 자동으로 반영되지 않는 이유와 해결 방법을 설명해주세요.

<details>
<summary>답변</summary>

**자동 반영되지 않는 이유**:
- 환경변수: Pod 시작 시 값이 고정됨
- 볼륨 마운트: 자동 업데이트되나 앱이 파일 변경 감지 필요
- 앱 재시작 없이 설정 리로드 로직 필요

**해결 방법**:

**1. Pod 재시작 (롤아웃)**:
```bash
kubectl rollout restart deployment/<name>
```

**2. Reloader 사용** (stakater/Reloader):
- ConfigMap/Secret 변경 감지 후 자동 롤아웃
```yaml
metadata:
  annotations:
    reloader.stakater.com/auto: "true"
```

**3. 해시 기반 업데이트**:
- ConfigMap 해시를 annotation에 포함
- 변경 시 Deployment 스펙 변경 -> 자동 롤아웃

**4. 앱 레벨 핫 리로드 구현**

**참고자료**
- [ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/)[^58]

</details>

[^58]: Kubernetes 공식 문서 - ConfigMap

---

## 📌 스케줄링 - nodeSelector, Affinity

### K8S-059
Kubernetes에서 nodeSelector를 사용한 Pod 스케줄링 방법과 한계점을 설명해주세요.

<details>
<summary>답변</summary>

**nodeSelector 사용법**:
```yaml
spec:
  nodeSelector:
    disktype: ssd
    zone: us-west-1a
```
노드에 해당 레이블이 있어야 스케줄링됨

**노드 레이블 추가**:
```bash
kubectl label nodes node1 disktype=ssd
```

**한계점**:
1. **단순 일치만 가능**: OR, NOT 조건 불가
2. **Hard 제약만**: 조건 불일치 시 스케줄링 실패
3. **Soft 선호 불가**: "가능하면" 조건 표현 못함
4. **복잡한 표현식 불가**: In, NotIn, Exists 등 미지원

**대안**: Node Affinity 사용
- 더 풍부한 표현식
- Soft/Hard 제약 모두 지원

**참고자료**
- [Assigning Pods to Nodes](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/)[^59]

</details>

[^59]: Kubernetes 공식 문서 - Pod 노드 할당

### K8S-060
Kubernetes Node Affinity와 nodeSelector의 차이점, requiredDuringSchedulingIgnoredDuringExecution와 preferredDuringSchedulingIgnoredDuringExecution의 차이를 설명해주세요.

<details>
<summary>답변</summary>

**nodeSelector vs Node Affinity**:
| 구분 | nodeSelector | Node Affinity |
|------|--------------|---------------|
| 표현력 | 단순 일치 | In, NotIn, Exists 등 |
| 제약 타입 | Hard만 | Hard + Soft |
| 가중치 | 불가 | 지원 |

**requiredDuringSchedulingIgnoredDuringExecution** (Hard):
- 반드시 충족해야 스케줄링
- 조건 불일치 시 Pending 상태

**preferredDuringSchedulingIgnoredDuringExecution** (Soft):
- 가능하면 충족, 불가시 다른 노드 선택
- weight로 우선순위 지정 (1-100)

```yaml
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
      - matchExpressions:
        - key: zone
          operator: In
          values: [us-west-1a]
    preferredDuringSchedulingIgnoredDuringExecution:
    - weight: 80
      preference:
        matchExpressions:
        - key: disktype
          operator: In
          values: [ssd]
```

**참고자료**
- [Node Affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#node-affinity)[^60]

</details>

[^60]: Kubernetes 공식 문서 - Node Affinity

### K8S-061
Kubernetes Pod Affinity와 Pod Anti-Affinity의 개념과 사용 사례를 설명해주세요.

<details>
<summary>답변</summary>

**Pod Affinity**: 특정 Pod와 같은 위치에 스케줄링
**Pod Anti-Affinity**: 특정 Pod와 다른 위치에 스케줄링

**사용 사례**:

**Pod Affinity**:
- 웹 서버와 캐시 서버를 같은 노드에 배치 (지연 감소)
- 관련 서비스 Co-location

**Pod Anti-Affinity**:
- 동일 앱 Pod를 다른 노드에 분산 (고가용성)
- 리소스 경합 방지

```yaml
affinity:
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
    - labelSelector:
        matchLabels:
          app: web
      topologyKey: kubernetes.io/hostname
```
-> 같은 app=web Pod가 있는 노드 피함

**참고자료**
- [Inter-pod Affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity)[^61]

</details>

[^61]: Kubernetes 공식 문서 - Pod Affinity

### K8S-062
Kubernetes의 topologyKey의 역할과 topology spread constraints의 활용 방법을 설명해주세요.

<details>
<summary>답변</summary>

**topologyKey**: Pod Affinity/Anti-Affinity의 범위 정의
- `kubernetes.io/hostname`: 노드 단위
- `topology.kubernetes.io/zone`: 가용영역 단위
- `topology.kubernetes.io/region`: 리전 단위

**Topology Spread Constraints**: Pod를 토폴로지 도메인에 균등 분산

```yaml
topologySpreadConstraints:
- maxSkew: 1
  topologyKey: topology.kubernetes.io/zone
  whenUnsatisfiable: DoNotSchedule
  labelSelector:
    matchLabels:
      app: web
```

**설정값**:
- **maxSkew**: 최대 불균형 허용치
- **topologyKey**: 분산 기준 도메인
- **whenUnsatisfiable**: DoNotSchedule / ScheduleAnyway

**활용**: 가용영역 간 균등 분산으로 고가용성 확보

**참고자료**
- [Topology Spread Constraints](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/)[^62]

</details>

[^62]: Kubernetes 공식 문서 - Topology Spread Constraints

---

## 📌 스케줄링 - Taint & Toleration

### K8S-063
Taint와 Toleration의 개념과 동작 방식을 설명해주세요.

<details>
<summary>답변</summary>

**Taint**: 노드에 적용, Pod 배치 제한 (노드가 Pod를 밀어냄)
**Toleration**: Pod에 적용, 특정 Taint 허용 (Pod가 Taint 용인)

**동작 방식**:
1. 노드에 Taint 설정
2. 해당 Taint를 Toleration하는 Pod만 스케줄링 가능

**Taint 적용**:
```bash
kubectl taint nodes node1 key=value:NoSchedule
```

**Toleration 설정**:
```yaml
tolerations:
- key: "key"
  operator: "Equal"
  value: "value"
  effect: "NoSchedule"
```

**operator**:
- `Equal`: key와 value 모두 일치
- `Exists`: key만 일치 (value 무시)

**사용 사례**: 전용 노드 (GPU, 특정 팀용)

**참고자료**
- [Taints and Tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/)[^63]

</details>

[^63]: Kubernetes 공식 문서 - Taint와 Toleration

### K8S-064
Kubernetes Taint의 effect(NoSchedule, PreferNoSchedule, NoExecute)의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**Taint Effect 종류**:

| Effect | 새 Pod 스케줄링 | 기존 Pod |
|--------|-----------------|----------|
| **NoSchedule** | 차단 | 영향 없음 |
| **PreferNoSchedule** | 가능하면 피함 | 영향 없음 |
| **NoExecute** | 차단 | 제거됨 |

**상세 설명**:
- **NoSchedule**: Toleration 없으면 절대 스케줄링 안됨
- **PreferNoSchedule**: Soft 제약, 다른 노드 없으면 스케줄링됨
- **NoExecute**: 기존 실행 중인 Pod도 제거 (tolerationSeconds로 유예 가능)

```yaml
tolerations:
- key: "key"
  effect: "NoExecute"
  tolerationSeconds: 3600  # 1시간 후 제거
```

**사용 시나리오**:
- NoSchedule: 전용 노드 분리
- PreferNoSchedule: 가능하면 분리
- NoExecute: 노드 유지보수, 장애 처리

**참고자료**
- [Taint Effects](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/#concepts)[^64]

</details>

[^64]: Kubernetes 공식 문서 - Taint Effects

### K8S-065
Kubernetes Master/Control Plane 노드에 Pod가 스케줄되지 않는 이유와 이를 허용하는 방법을 설명해주세요.

<details>
<summary>답변</summary>

**스케줄되지 않는 이유**:
Control Plane 노드에 기본 Taint 적용됨:
```
node-role.kubernetes.io/control-plane:NoSchedule
node-role.kubernetes.io/master:NoSchedule  # 구버전
```

**허용 방법 1: Toleration 추가**
```yaml
tolerations:
- key: "node-role.kubernetes.io/control-plane"
  operator: "Exists"
  effect: "NoSchedule"
```

**허용 방법 2: Taint 제거** (권장하지 않음)
```bash
kubectl taint nodes <master-node> \
  node-role.kubernetes.io/control-plane:NoSchedule-
```

**주의사항**:
- 프로덕션에서는 Control Plane 분리 권장
- 단일 노드 클러스터 (개발용)에서만 허용 고려
- Control Plane 리소스 경합 위험

**참고자료**
- [Taints and Tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/)[^65]

</details>

[^65]: Kubernetes 공식 문서 - Control Plane Taint

### K8S-066
Kubernetes Node에 문제가 생겼을 때 자동으로 적용되는 Taint(node.kubernetes.io/not-ready 등)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**자동 적용 Taint** (Node Controller가 관리):

| Taint | 상황 |
|-------|------|
| `node.kubernetes.io/not-ready` | 노드 Ready 조건 False |
| `node.kubernetes.io/unreachable` | 노드 통신 불가 |
| `node.kubernetes.io/memory-pressure` | 메모리 부족 |
| `node.kubernetes.io/disk-pressure` | 디스크 부족 |
| `node.kubernetes.io/pid-pressure` | PID 부족 |
| `node.kubernetes.io/network-unavailable` | 네트워크 미설정 |
| `node.kubernetes.io/unschedulable` | cordon 적용됨 |

**기본 Toleration**:
DaemonSet Pod는 기본적으로 이러한 Taint를 Toleration함

**tolerationSeconds**:
- not-ready, unreachable: 기본 300초 유예 후 제거
- 설정으로 조정 가능

**참고자료**
- [Taint based Evictions](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/#taint-based-evictions)[^66]

</details>

[^66]: Kubernetes 공식 문서 - Taint 기반 Eviction

---

## 📌 리소스 관리 - Requests & Limits

### K8S-067
Kubernetes에서 컨테이너의 resource requests와 limits의 차이점과 역할을 설명해주세요.

<details>
<summary>답변</summary>

**Requests**:
- 스케줄링에 사용되는 최소 보장 리소스
- 노드 선택 시 이 값 기준으로 용량 확인
- 컨테이너에 보장되는 리소스

**Limits**:
- 컨테이너가 사용할 수 있는 최대 리소스
- 이 값 초과 시 제한됨 (CPU: throttle, Memory: OOM Kill)

```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

**차이점 요약**:
| 구분 | Requests | Limits |
|------|----------|--------|
| 용도 | 스케줄링 | 제한 |
| 보장 | 항상 보장 | 최대값 |
| 초과 시 | - | 제한/종료 |

**참고자료**
- [Resource Management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)[^67]

</details>

[^67]: Kubernetes 공식 문서 - 리소스 관리

### K8S-068
Kubernetes에서 CPU와 Memory 리소스 단위(millicore, Mi, Gi)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**CPU 단위**:
- `1`: 1 CPU 코어 (1000m)
- `500m`: 0.5 CPU (millicore)
- `100m`: 0.1 CPU
- 클라우드 1 vCPU = 1 코어

**Memory 단위**:
| 단위 | 의미 | 값 |
|------|------|------|
| Ki | Kibibyte | 1024 bytes |
| Mi | Mebibyte | 1024 Ki |
| Gi | Gibibyte | 1024 Mi |
| K | Kilobyte | 1000 bytes |
| M | Megabyte | 1000 K |
| G | Gigabyte | 1000 M |

**예시**:
```yaml
resources:
  requests:
    cpu: "250m"      # 0.25 코어
    memory: "128Mi"  # 128 Mebibytes
  limits:
    cpu: "1"         # 1 코어
    memory: "1Gi"    # 1 Gibibyte
```

**참고자료**
- [Resource Units](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes)[^68]

</details>

[^68]: Kubernetes 공식 문서 - 리소스 단위

### K8S-069
Kubernetes에서 requests만 설정했을 때와 limits만 설정했을 때의 동작 차이를 설명해주세요.

<details>
<summary>답변</summary>

**requests만 설정**:
- limits: 무제한 (노드 전체 리소스 사용 가능)
- QoS: Burstable
- 스케줄링 시 requests 기준으로 노드 선택

**limits만 설정**:
- requests: limits와 동일 값으로 자동 설정
- QoS: Guaranteed
- 스케줄링 시 limits 값 기준

```yaml
# limits만 설정
resources:
  limits:
    cpu: "500m"
    memory: "256Mi"
# 결과: requests도 동일하게 설정됨
```

**권장 사항**:
- 항상 requests와 limits 둘 다 설정
- requests <= limits
- 프로덕션에서는 적절한 값 측정 후 설정

**참고자료**
- [Resource Management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)[^69]

</details>

[^69]: Kubernetes 공식 문서 - 리소스 관리

### K8S-070
Kubernetes에서 Memory limits을 초과했을 때와 CPU limits을 초과했을 때의 동작 차이를 설명해주세요.

<details>
<summary>답변</summary>

**Memory Limits 초과**:
- OOM (Out of Memory) Kill 발생
- 컨테이너 종료, restartPolicy에 따라 재시작
- 압축 불가능한 리소스 (반환 불가)

**CPU Limits 초과**:
- CPU Throttling 발생
- 컨테이너는 계속 실행
- 처리 속도만 제한됨
- 압축 가능한 리소스 (일시적 제한)

**비교**:
| 리소스 | 초과 시 동작 | 특성 |
|--------|-------------|------|
| Memory | OOM Kill | 압축 불가 |
| CPU | Throttle | 압축 가능 |

**모니터링**:
- Memory: container_memory_working_set_bytes
- CPU Throttle: container_cpu_cfs_throttled_seconds_total

**참고자료**
- [Resource Management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)[^70]

</details>

[^70]: Kubernetes 공식 문서 - 리소스 관리

---

## 📌 리소스 관리 - QoS, LimitRange, ResourceQuota

### K8S-071
Kubernetes Pod의 QoS(Quality of Service) 클래스(Guaranteed, Burstable, BestEffort)의 결정 기준과 의미를 설명해주세요.

<details>
<summary>답변</summary>

**QoS 클래스 결정 기준**:

| QoS | 조건 | Eviction 우선순위 |
|-----|------|------------------|
| **Guaranteed** | 모든 컨테이너: requests = limits (CPU, Memory) | 최후 |
| **Burstable** | 최소 하나의 requests/limits 설정 | 중간 |
| **BestEffort** | requests/limits 없음 | 최우선 |

**의미**:
- 노드 리소스 부족 시 Eviction 순서 결정
- BestEffort -> Burstable -> Guaranteed 순으로 제거

**확인 방법**:
```bash
kubectl get pod <name> -o jsonpath='{.status.qosClass}'
```

**권장 사항**:
- 중요 워크로드: Guaranteed
- 일반 워크로드: Burstable (적절한 requests/limits)
- 개발/테스트: BestEffort 허용 가능

**참고자료**
- [Pod QoS Classes](https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/)[^71]

</details>

[^71]: Kubernetes 공식 문서 - Pod QoS

### K8S-072
Kubernetes LimitRange의 역할과 설정 방법(default, defaultRequest, min, max)을 설명해주세요.

<details>
<summary>답변</summary>

**역할**: 네임스페이스 내 개별 컨테이너/Pod의 리소스 제약 정의

**설정 항목**:
| 항목 | 설명 |
|------|------|
| **default** | limits 미지정 시 기본값 |
| **defaultRequest** | requests 미지정 시 기본값 |
| **min** | 최소 리소스 |
| **max** | 최대 리소스 |
| **maxLimitRequestRatio** | limits/requests 최대 비율 |

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: cpu-mem-limits
spec:
  limits:
  - type: Container
    default:
      cpu: "500m"
      memory: "256Mi"
    defaultRequest:
      cpu: "100m"
      memory: "128Mi"
    min:
      cpu: "50m"
    max:
      cpu: "2"
```

**적용 대상**: Container, Pod, PersistentVolumeClaim

**참고자료**
- [LimitRange](https://kubernetes.io/docs/concepts/policy/limit-range/)[^72]

</details>

[^72]: Kubernetes 공식 문서 - LimitRange

### K8S-073
Kubernetes ResourceQuota의 역할과 네임스페이스 단위 리소스 제한 방법을 설명해주세요.

<details>
<summary>답변</summary>

**역할**: 네임스페이스 전체의 리소스 총량 제한

**제한 가능 항목**:
- 컴퓨팅: requests.cpu, limits.memory 등
- 스토리지: requests.storage, persistentvolumeclaims
- 오브젝트 수: pods, services, configmaps 등

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-quota
  namespace: team-a
spec:
  hard:
    requests.cpu: "10"
    requests.memory: "20Gi"
    limits.cpu: "20"
    limits.memory: "40Gi"
    pods: "50"
    services: "10"
```

**확인**:
```bash
kubectl describe resourcequota -n team-a
```

**주의**: ResourceQuota 적용 시 Pod에 반드시 requests/limits 필요 (LimitRange와 함께 사용)

**참고자료**
- [ResourceQuota](https://kubernetes.io/docs/concepts/policy/resource-quotas/)[^73]

</details>

[^73]: Kubernetes 공식 문서 - ResourceQuota

### K8S-074
Kubernetes PriorityClass의 역할과 Pod 우선순위 기반 스케줄링/프리엠션에 대해 설명해주세요.

<details>
<summary>답변</summary>

**역할**: Pod 간 우선순위 정의, 스케줄링 순서와 프리엠션 결정

**PriorityClass 정의**:
```yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000000
globalDefault: false
preemptionPolicy: PreemptLowerPriority
```

**Pod에 적용**:
```yaml
spec:
  priorityClassName: high-priority
```

**프리엠션(Preemption)**:
- 고우선순위 Pod 스케줄 불가 시 저우선순위 Pod 제거
- preemptionPolicy: PreemptLowerPriority / Never

**스케줄링**:
- 우선순위 높은 Pod 먼저 스케줄링

**기본 PriorityClass**:
- system-cluster-critical (2000000000)
- system-node-critical (2000001000)

**참고자료**
- [Pod Priority and Preemption](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/)[^74]

</details>

[^74]: Kubernetes 공식 문서 - Pod Priority and Preemption

---

## 📌 오토스케일링 - HPA

### K8S-075
HPA(Horizontal Pod Autoscaler)의 동작 원리와 설정 방법을 설명해주세요.

<details>
<summary>답변</summary>

**동작 원리**:
1. metrics-server에서 Pod 메트릭 수집
2. HPA Controller가 주기적으로 (15초) 메트릭 확인
3. 목표값과 현재값 비교하여 replicas 조정

**설정 방법**:
```bash
kubectl autoscale deployment nginx --cpu-percent=50 --min=1 --max=10
```

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 50
```

**스케일링 공식**: `replicas = ceil(현재 메트릭 / 목표 메트릭 * 현재 replicas)`

**참고자료**
- [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)[^75]

</details>

[^75]: Kubernetes 공식 문서 - HPA

### K8S-076
Kubernetes HPA에서 CPU/Memory 기반 스케일링과 Custom Metrics 기반 스케일링의 차이를 설명해주세요.

<details>
<summary>답변</summary>

**CPU/Memory 기반** (Resource Metrics):
- metrics-server에서 제공
- 기본 제공, 설정 간단
- 제한: CPU/Memory만 가능

```yaml
metrics:
- type: Resource
  resource:
    name: cpu
    target:
      type: Utilization
      averageUtilization: 80
```

**Custom Metrics 기반**:
- Prometheus Adapter 등 필요
- 비즈니스 메트릭 사용 가능 (RPS, Queue 길이 등)

```yaml
metrics:
- type: Pods
  pods:
    metric:
      name: http_requests_per_second
    target:
      type: AverageValue
      averageValue: 1000
```

**External Metrics**: 외부 시스템 메트릭 (AWS SQS 등)

**선택 기준**:
- CPU 바운드 앱: CPU 메트릭
- I/O 바운드 앱: Custom Metrics 권장

**참고자료**
- [HPA Custom Metrics](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/#autoscaling-on-multiple-metrics-and-custom-metrics)[^76]

</details>

[^76]: Kubernetes 공식 문서 - HPA Custom Metrics

### K8S-077
Kubernetes HPA의 스케일링 알고리즘과 stabilizationWindowSeconds 설정의 역할을 설명해주세요.

<details>
<summary>답변</summary>

**스케일링 알고리즘**:
```
desiredReplicas = ceil[currentReplicas * (currentMetric / desiredMetric)]
```
- 여러 메트릭 사용 시 가장 큰 값 선택
- tolerance (기본 10%): 0.9 ~ 1.1 범위는 스케일링 안함

**stabilizationWindowSeconds**:
급격한 스케일링 방지를 위한 안정화 기간

```yaml
behavior:
  scaleDown:
    stabilizationWindowSeconds: 300  # 5분
    policies:
    - type: Percent
      value: 10
      periodSeconds: 60
  scaleUp:
    stabilizationWindowSeconds: 0    # 즉시
    policies:
    - type: Pods
      value: 4
      periodSeconds: 60
```

**역할**:
- scaleDown 기본값: 300초 (급격한 축소 방지)
- scaleUp 기본값: 0초 (빠른 확장)
- 윈도우 내 최대/최소값 기준 스케일링

**참고자료**
- [HPA Algorithm](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#algorithm-details)[^77]

</details>

[^77]: Kubernetes 공식 문서 - HPA 알고리즘

### K8S-078
Kubernetes HPA 사용 시 주의사항과 Best Practice를 설명해주세요.

<details>
<summary>답변</summary>

**주의사항**:
1. **requests 필수**: HPA는 requests 기준으로 사용률 계산
2. **metrics-server 필요**: 설치되어 있어야 메트릭 수집
3. **Deployment 권장**: ReplicaSet 직접 사용 비권장
4. **minReplicas**: 최소 2개 이상 (고가용성)

**Best Practice**:
- **적절한 target 설정**: CPU 50-80% 권장
- **충분한 minReplicas**: 트래픽 급증 대비
- **scaleDown 안정화**: 기본 300초 유지
- **여러 메트릭 조합**: CPU + 커스텀 메트릭
- **Readiness Probe 설정**: 준비된 Pod만 트래픽 수신

```yaml
spec:
  minReplicas: 2
  maxReplicas: 20
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
```

**모니터링**: HPA 상태 주기적 확인
```bash
kubectl get hpa
```

**참고자료**
- [HPA](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)[^78]

</details>

[^78]: Kubernetes 공식 문서 - HPA

---

## 📌 오토스케일링 - VPA & Cluster Autoscaler

### K8S-079
VPA(Vertical Pod Autoscaler)의 동작 원리와 HPA와의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**VPA 동작 원리**:
1. Recommender: 리소스 사용량 분석, 권장값 계산
2. Updater: 권장값과 현재값 차이 확인, Pod 재시작 트리거
3. Admission Controller: 새 Pod 생성 시 권장 리소스 적용

**HPA와의 차이**:
| 구분 | HPA | VPA |
|------|-----|-----|
| 스케일링 방향 | 수평 (Pod 수) | 수직 (리소스) |
| 적용 방식 | 즉시 | Pod 재시작 필요 |
| 사용 사례 | Stateless 앱 | Stateful, 단일 Pod |
| 함께 사용 | 가능 (권장 안함) | 메모리만 조절 시 |

**제한사항**:
- HPA와 동일 리소스(CPU/Memory) 동시 사용 불가
- Pod 재시작 발생 가능

**참고자료**
- [Vertical Pod Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler)[^79]

</details>

[^79]: Kubernetes Autoscaler - VPA

### K8S-080
Kubernetes VPA의 updateMode(Off, Initial, Auto)의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**updateMode 종류**:

| 모드 | 동작 |
|------|------|
| **Off** | 권장값만 계산, 적용 안함 (관찰 모드) |
| **Initial** | 새 Pod 생성 시만 적용, 기존 Pod 변경 안함 |
| **Auto** | 권장값 자동 적용, 필요시 Pod 재시작 |
| **Recreate** | Auto와 동일 (deprecated) |

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  updatePolicy:
    updateMode: "Auto"
```

**사용 시나리오**:
- **Off**: 권장값 확인 후 수동 적용
- **Initial**: 재시작 최소화, 새 Pod에만 적용
- **Auto**: 완전 자동화 (다운타임 허용 시)

**참고자료**
- [VPA Update Modes](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler#quick-start)[^80]

</details>

[^80]: Kubernetes Autoscaler - VPA Quick Start

### K8S-081
Cluster Autoscaler의 동작 원리와 노드 추가/삭제 조건을 설명해주세요.

<details>
<summary>답변</summary>

**동작 원리**:
- 클라우드 API와 연동하여 노드 그룹(ASG, MIG 등) 조정
- 주기적으로 스케줄 불가 Pod 확인

**노드 추가 조건 (Scale Up)**:
- Pending 상태 Pod 존재
- 리소스(CPU/Memory) 부족으로 스케줄링 불가
- nodeSelector/affinity 조건 만족하는 노드 부재

**노드 삭제 조건 (Scale Down)**:
- 노드 활용률 < 50% (기본, 설정 가능)
- 해당 노드의 모든 Pod가 다른 노드로 이동 가능
- 10분간 (기본) 유휴 상태 유지
- PDB 위반 없음

**삭제 제외 조건**:
- `cluster-autoscaler.kubernetes.io/safe-to-evict: "false"`
- 로컬 스토리지 사용
- PDB로 보호된 Pod

**참고자료**
- [Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler)[^81]

</details>

[^81]: Kubernetes Autoscaler - Cluster Autoscaler

### K8S-082
Kubernetes HPA, VPA, Cluster Autoscaler를 함께 사용할 때의 고려사항을 설명해주세요.

<details>
<summary>답변</summary>

**조합 사용 시 고려사항**:

**HPA + Cluster Autoscaler** (권장):
- HPA가 Pod 수 증가 -> Pending Pod 발생 -> CA가 노드 추가
- 잘 동작하는 조합

**VPA + Cluster Autoscaler**:
- VPA가 리소스 증가 -> 노드 리소스 부족 -> CA가 노드 추가
- Pod 재시작 주의

**HPA + VPA** (주의 필요):
- 동일 리소스(CPU) 동시 사용 불가 -> 충돌
- 해결: VPA는 Memory만, HPA는 CPU만 (또는 커스텀 메트릭)

**Best Practice**:
```
HPA (수평 확장) + Cluster Autoscaler (노드 확장)
VPA는 Off 모드로 권장값만 참고
```

**권장 구성**:
- Stateless 앱: HPA + CA
- Stateful 앱: VPA + CA
- 리소스 최적화: VPA(Off) + HPA + CA

**참고자료**
- [Autoscaling in Kubernetes](https://kubernetes.io/docs/concepts/cluster-administration/cluster-autoscaling/)[^82]

</details>

[^82]: Kubernetes 공식 문서 - 클러스터 오토스케일링

---

## 📌 보안 - RBAC

### K8S-083
RBAC(Role-Based Access Control)의 개념과 구성 요소(Role, ClusterRole, RoleBinding, ClusterRoleBinding)를 설명해주세요.

<details>
<summary>답변</summary>

**RBAC 개념**: 역할 기반으로 Kubernetes API 접근 권한 관리

**구성 요소**:

| 구성 요소 | 범위 | 설명 |
|-----------|------|------|
| **Role** | 네임스페이스 | 특정 네임스페이스 내 권한 정의 |
| **ClusterRole** | 클러스터 | 클러스터 전체 권한 정의 |
| **RoleBinding** | 네임스페이스 | Role을 주체에 연결 |
| **ClusterRoleBinding** | 클러스터 | ClusterRole을 주체에 연결 |

**예시**:
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
---
kind: RoleBinding
metadata:
  name: read-pods
subjects:
- kind: User
  name: jane
roleRef:
  kind: Role
  name: pod-reader
```

**참고자료**
- [RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)[^83]

</details>

[^83]: Kubernetes 공식 문서 - RBAC

### K8S-084
Kubernetes RBAC에서 Role과 ClusterRole의 차이점, RoleBinding과 ClusterRoleBinding의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**Role vs ClusterRole**:
| 구분 | Role | ClusterRole |
|------|------|-------------|
| 범위 | 특정 네임스페이스 | 클러스터 전체 |
| 비네임스페이스 리소스 | 불가 | 가능 (nodes, PV 등) |
| 여러 NS 재사용 | 불가 | 가능 (RoleBinding으로) |

**RoleBinding vs ClusterRoleBinding**:
| 구분 | RoleBinding | ClusterRoleBinding |
|------|-------------|-------------------|
| 범위 | 특정 네임스페이스 | 클러스터 전체 |
| Role 참조 | 같은 NS의 Role | ClusterRole만 |
| ClusterRole 참조 | 해당 NS에만 적용 | 전체 NS에 적용 |

**활용 패턴**:
- ClusterRole + RoleBinding: 재사용 가능한 권한을 특정 NS에만 적용
- ClusterRole + ClusterRoleBinding: 클러스터 전체 권한

**참고자료**
- [RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)[^84]

</details>

[^84]: Kubernetes 공식 문서 - RBAC

### K8S-085
Kubernetes RBAC에서 verbs(get, list, watch, create, update, patch, delete)의 의미를 설명해주세요.

<details>
<summary>답변</summary>

**verbs 의미**:

| Verb | HTTP 메서드 | 설명 |
|------|------------|------|
| **get** | GET | 단일 리소스 조회 |
| **list** | GET | 리소스 목록 조회 |
| **watch** | GET (watch) | 리소스 변경 감시 |
| **create** | POST | 리소스 생성 |
| **update** | PUT | 리소스 전체 수정 |
| **patch** | PATCH | 리소스 부분 수정 |
| **delete** | DELETE | 단일 리소스 삭제 |
| **deletecollection** | DELETE | 여러 리소스 삭제 |

**특수 verbs**:
- `*`: 모든 동작 허용
- `use`: PodSecurityPolicy 사용
- `bind`: RoleBinding 생성
- `escalate`: Role 권한 상승

**예시**:
```yaml
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]  # 읽기 전용
```

**참고자료**
- [RBAC verbs](https://kubernetes.io/docs/reference/access-authn-authz/authorization/#determine-the-request-verb)[^85]

</details>

[^85]: Kubernetes 공식 문서 - Request Verbs

### K8S-086
Kubernetes RBAC에서 최소 권한 원칙(Principle of Least Privilege)을 적용하는 방법을 설명해주세요.

<details>
<summary>답변</summary>

**최소 권한 원칙 적용 방법**:

1. **필요한 리소스만 지정**:
```yaml
resources: ["pods"]  # 전체 대신 특정 리소스
```

2. **필요한 verbs만 부여**:
```yaml
verbs: ["get", "list"]  # "*" 대신 구체적 동작
```

3. **resourceNames로 특정 리소스 제한**:
```yaml
resources: ["secrets"]
resourceNames: ["my-secret"]  # 특정 시크릿만
```

4. **Role 대신 ClusterRole 지양**: 필요한 NS에만 권한 부여

5. **기본 ServiceAccount 사용 지양**: 앱별 전용 ServiceAccount 생성

6. **정기적 감사**:
```bash
kubectl auth can-i --list --as=system:serviceaccount:ns:sa
```

7. **와일드카드(*) 사용 금지**

**참고자료**
- [RBAC Good Practices](https://kubernetes.io/docs/concepts/security/rbac-good-practices/)[^86]

</details>

[^86]: Kubernetes 공식 문서 - RBAC Good Practices

---

## 📌 보안 - ServiceAccount & 인증

### K8S-087
ServiceAccount의 역할과 Pod에서의 사용 방법을 설명해주세요.

<details>
<summary>답변</summary>

**역할**: Pod 내 프로세스가 Kubernetes API에 인증하기 위한 ID

**기본 동작**:
- 각 네임스페이스에 `default` ServiceAccount 자동 생성
- Pod 생성 시 자동으로 ServiceAccount 연결
- 토큰이 Pod에 자동 마운트

**Pod에서 사용**:
```yaml
apiVersion: v1
kind: Pod
spec:
  serviceAccountName: my-service-account
  containers:
  - name: app
    image: myapp
```

**ServiceAccount 생성**:
```bash
kubectl create serviceaccount my-sa
```

**토큰 위치** (Pod 내):
```
/var/run/secrets/kubernetes.io/serviceaccount/token
```

**RBAC 연동**: RoleBinding으로 ServiceAccount에 권한 부여

**참고자료**
- [Service Accounts](https://kubernetes.io/docs/concepts/security/service-accounts/)[^87]

</details>

[^87]: Kubernetes 공식 문서 - Service Accounts

### K8S-088
Kubernetes ServiceAccount 토큰의 자동 마운트와 이를 비활성화하는 방법을 설명해주세요.

<details>
<summary>답변</summary>

**자동 마운트**:
- 기본적으로 ServiceAccount 토큰이 Pod에 자동 마운트
- 경로: `/var/run/secrets/kubernetes.io/serviceaccount/`
- 파일: token, ca.crt, namespace

**비활성화 방법**:

**1. Pod 레벨**:
```yaml
apiVersion: v1
kind: Pod
spec:
  automountServiceAccountToken: false
```

**2. ServiceAccount 레벨**:
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-sa
automountServiceAccountToken: false
```

**비활성화 권장 상황**:
- API 서버 접근 불필요한 Pod
- 보안 강화 필요 시
- 외부에서 자격증명 주입 시

**우선순위**: Pod 설정 > ServiceAccount 설정

**참고자료**
- [Configure Service Accounts](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/)[^88]

</details>

[^88]: Kubernetes 공식 문서 - ServiceAccount 설정

### K8S-089
Kubernetes API 서버의 인증(Authentication) 방식들(X.509, Bearer Token, OIDC 등)을 설명해주세요.

<details>
<summary>답변</summary>

**주요 인증 방식**:

| 방식 | 설명 | 사용 사례 |
|------|------|----------|
| **X.509 Client Cert** | 클라이언트 인증서 | kubeconfig, 관리자 |
| **Bearer Token** | 정적 토큰 파일 | 서비스 계정 |
| **ServiceAccount Token** | JWT 토큰 | Pod 내 앱 |
| **OIDC** | OpenID Connect | SSO, 기업 인증 |
| **Webhook** | 외부 인증 서비스 | 커스텀 인증 |

**X.509 인증서**:
- CN(Common Name): 사용자 이름
- O(Organization): 그룹

**OIDC 장점**:
- 기존 IdP(Okta, Azure AD) 연동
- 짧은 수명 토큰
- 그룹 기반 권한 관리

**여러 인증 방식 조합 가능**: 하나만 성공하면 인증 통과

**참고자료**
- [Authentication](https://kubernetes.io/docs/reference/access-authn-authz/authentication/)[^89]

</details>

[^89]: Kubernetes 공식 문서 - 인증

### K8S-090
Kubernetes kubeconfig 파일의 구조와 contexts, clusters, users 설정에 대해 설명해주세요.

<details>
<summary>답변</summary>

**kubeconfig 구조**:

```yaml
apiVersion: v1
kind: Config
current-context: dev-context

clusters:
- name: dev-cluster
  cluster:
    server: https://dev.example.com:6443
    certificate-authority: /path/to/ca.crt

users:
- name: dev-user
  user:
    client-certificate: /path/to/cert.crt
    client-key: /path/to/key.key

contexts:
- name: dev-context
  context:
    cluster: dev-cluster
    user: dev-user
    namespace: default
```

**구성 요소**:
- **clusters**: API 서버 주소, CA 인증서
- **users**: 인증 정보 (인증서, 토큰 등)
- **contexts**: cluster + user + namespace 조합
- **current-context**: 현재 사용 중인 context

**명령어**:
```bash
kubectl config get-contexts
kubectl config use-context prod
kubectl config set-context --current --namespace=app
```

**참고자료**
- [Organizing Cluster Access](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)[^90]

</details>

[^90]: Kubernetes 공식 문서 - kubeconfig

---

## 📌 보안 - NetworkPolicy & Pod Security

### K8S-091
NetworkPolicy의 역할과 Ingress/Egress 규칙 설정 방법을 설명해주세요.

<details>
<summary>답변</summary>

**역할**: Pod 간 네트워크 트래픽 제어 (방화벽 규칙)

**기본 동작**: NetworkPolicy 없으면 모든 트래픽 허용

**예시**:
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-policy
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - port: 8080
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: database
    ports:
    - port: 5432
```

**규칙 조합**:
- **podSelector**: 같은 NS의 특정 Pod
- **namespaceSelector**: 특정 NS의 Pod
- **ipBlock**: CIDR 범위

**참고자료**
- [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)[^91]

</details>

[^91]: Kubernetes 공식 문서 - NetworkPolicy

### K8S-092
Kubernetes NetworkPolicy가 적용되지 않는 경우(CNI 미지원 등)와 기본 정책에 대해 설명해주세요.

<details>
<summary>답변</summary>

**NetworkPolicy 미적용 상황**:

1. **CNI 미지원**:
   - Flannel (기본): 지원 안함
   - 지원 CNI: Calico, Cilium, Weave Net
   - NetworkPolicy 생성해도 무시됨

2. **HostNetwork Pod**: `hostNetwork: true` Pod는 영향 안받음

3. **시스템 네임스페이스**: kube-system의 Pod는 보통 제외

**기본 정책**:
- NetworkPolicy 없음: 모든 트래픽 허용 (default allow)
- NetworkPolicy 적용 시: 해당 Pod는 명시적 허용만 가능 (default deny)

**전체 거부 정책**:
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

**참고자료**
- [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)[^92]

</details>

[^92]: Kubernetes 공식 문서 - NetworkPolicy

### K8S-093
Pod Security Standards(Privileged, Baseline, Restricted)의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**Pod Security Standards (PSS)**:

| 레벨 | 설명 | 사용 사례 |
|------|------|----------|
| **Privileged** | 제한 없음, 모든 권한 허용 | 시스템 컴포넌트, 신뢰된 워크로드 |
| **Baseline** | 최소 제한, 알려진 위험 차단 | 일반 워크로드 |
| **Restricted** | 최대 제한, 보안 Best Practice | 보안 중요 워크로드 |

**주요 제한 항목**:
| 항목 | Baseline | Restricted |
|------|----------|------------|
| hostNetwork | 차단 | 차단 |
| hostPID/IPC | 차단 | 차단 |
| privileged | 차단 | 차단 |
| runAsNonRoot | - | 필수 |
| readOnlyRootFilesystem | - | 권장 |
| capabilities | 일부 허용 | 거의 없음 |

**참고자료**
- [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/)[^93]

</details>

[^93]: Kubernetes 공식 문서 - Pod Security Standards

### K8S-094
Kubernetes Pod Security Admission Controller의 역할과 enforce, audit, warn 모드의 차이를 설명해주세요.

<details>
<summary>답변</summary>

**역할**: 네임스페이스 레벨에서 Pod Security Standards 적용

**모드 차이**:
| 모드 | 동작 | 사용 목적 |
|------|------|----------|
| **enforce** | 위반 시 Pod 생성 거부 | 프로덕션 |
| **audit** | 위반 감사 로그 기록, 허용 | 모니터링 |
| **warn** | 위반 경고 메시지, 허용 | 전환 준비 |

**네임스페이스 레이블 설정**:
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: my-namespace
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/enforce-version: latest
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

**권장 전략**:
1. warn/audit로 시작하여 영향 파악
2. 점진적으로 enforce 적용

**참고자료**
- [Pod Security Admission](https://kubernetes.io/docs/concepts/security/pod-security-admission/)[^94]

</details>

[^94]: Kubernetes 공식 문서 - Pod Security Admission

### K8S-095
Kubernetes 컨테이너의 securityContext 설정(runAsUser, runAsNonRoot, readOnlyRootFilesystem 등)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**주요 securityContext 설정**:

```yaml
securityContext:
  runAsUser: 1000           # 실행 UID
  runAsGroup: 3000          # 실행 GID
  runAsNonRoot: true        # root 실행 금지
  readOnlyRootFilesystem: true  # 루트 FS 읽기 전용
  allowPrivilegeEscalation: false  # 권한 상승 금지
  capabilities:
    drop:
      - ALL                 # 모든 capability 제거
    add:
      - NET_BIND_SERVICE    # 필요한 것만 추가
```

**설정 범위**:
- Pod 레벨: `spec.securityContext`
- Container 레벨: `spec.containers[].securityContext`
- Container 설정이 Pod 설정보다 우선

**권장 설정**:
- runAsNonRoot: true
- readOnlyRootFilesystem: true
- allowPrivilegeEscalation: false
- capabilities.drop: ALL

**참고자료**
- [Security Context](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)[^95]

</details>

[^95]: Kubernetes 공식 문서 - Security Context

---

## 📌 헬스 체크 - Probe

### K8S-096
Kubernetes Liveness Probe의 역할과 설정 방법(httpGet, tcpSocket, exec)을 설명해주세요.

<details>
<summary>답변</summary>

**역할**: 컨테이너가 살아있는지 확인, 실패 시 컨테이너 재시작

**설정 방법**:

**httpGet**:
```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 15
  periodSeconds: 10
```

**tcpSocket**:
```yaml
livenessProbe:
  tcpSocket:
    port: 3306
  initialDelaySeconds: 15
```

**exec**:
```yaml
livenessProbe:
  exec:
    command:
    - cat
    - /tmp/healthy
  initialDelaySeconds: 5
```

**성공 조건**:
- httpGet: 200-399 응답
- tcpSocket: 연결 성공
- exec: exit code 0

**참고자료**
- [Configure Liveness Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)[^96]

</details>

[^96]: Kubernetes 공식 문서 - Liveness Probe

### K8S-097
Kubernetes Readiness Probe의 역할과 Liveness Probe와의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**Readiness Probe 역할**: 컨테이너가 트래픽 수신 준비 되었는지 확인

**Liveness vs Readiness**:
| 구분 | Liveness | Readiness |
|------|----------|-----------|
| 목적 | 살아있는지 확인 | 준비됐는지 확인 |
| 실패 시 | 컨테이너 재시작 | Service에서 제외 |
| 사용 시점 | 데드락 감지 | 시작 준비, 일시적 불가 |

**Readiness 실패 시**:
- Service Endpoints에서 제거
- 트래픽 수신 안함
- 컨테이너는 계속 실행

**사용 예시**:
```yaml
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

**Best Practice**:
- 둘 다 설정 권장
- 다른 엔드포인트 사용 (/healthz vs /ready)

**참고자료**
- [Readiness Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-readiness-probes)[^97]

</details>

[^97]: Kubernetes 공식 문서 - Readiness Probe

### K8S-098
Kubernetes Startup Probe의 역할과 느린 시작 애플리케이션에서의 활용 방법을 설명해주세요.

<details>
<summary>답변</summary>

**역할**: 애플리케이션 시작 완료 확인, 성공할 때까지 Liveness/Readiness 비활성화

**필요성**:
- 시작 시간이 긴 앱 (레거시, JVM 앱)
- Liveness의 initialDelaySeconds를 과도하게 늘리지 않아도 됨

**활용 방법**:
```yaml
startupProbe:
  httpGet:
    path: /healthz
    port: 8080
  failureThreshold: 30    # 30번 재시도
  periodSeconds: 10       # 10초 간격
  # 총 5분(30*10초) 동안 시작 대기
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  periodSeconds: 10
```

**동작**:
1. Startup Probe 성공할 때까지 Liveness/Readiness 실행 안함
2. Startup 성공 후 Liveness/Readiness 시작
3. Startup 실패 (failureThreshold 초과) 시 컨테이너 재시작

**참고자료**
- [Startup Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-startup-probes)[^98]

</details>

[^98]: Kubernetes 공식 문서 - Startup Probe

### K8S-099
Kubernetes Probe 설정값(initialDelaySeconds, periodSeconds, timeoutSeconds, failureThreshold)의 의미와 적절한 설정 방법을 설명해주세요.

<details>
<summary>답변</summary>

**설정값 의미**:
| 설정 | 의미 | 기본값 |
|------|------|--------|
| **initialDelaySeconds** | 첫 Probe 전 대기 | 0 |
| **periodSeconds** | Probe 간격 | 10 |
| **timeoutSeconds** | 응답 대기 시간 | 1 |
| **failureThreshold** | 연속 실패 허용 횟수 | 3 |
| **successThreshold** | 연속 성공 필요 횟수 | 1 |

**적절한 설정**:
```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 30  # 앱 시작 시간 고려
  periodSeconds: 10        # 너무 빈번하면 오버헤드
  timeoutSeconds: 5        # 네트워크 지연 고려
  failureThreshold: 3      # 일시적 오류 허용
  successThreshold: 1
```

**설정 팁**:
- 실패 감지 시간 = periodSeconds * failureThreshold
- timeoutSeconds < periodSeconds
- Startup Probe 활용으로 initialDelaySeconds 최소화

**참고자료**
- [Configure Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes)[^99]

</details>

[^99]: Kubernetes 공식 문서 - Probe 설정

### K8S-100
잘못된 Kubernetes Probe 설정으로 인한 문제(CrashLoopBackOff, 서비스 불가 등)와 해결 방법을 설명해주세요.

<details>
<summary>답변</summary>

**일반적인 문제와 해결**:

**1. CrashLoopBackOff**:
- 원인: Liveness 실패로 계속 재시작
- 해결: initialDelaySeconds 증가, Startup Probe 사용

**2. 서비스 불가 (트래픽 수신 안함)**:
- 원인: Readiness 계속 실패
- 해결: 엔드포인트/포트 확인, threshold 조정

**3. 느린 응답으로 인한 재시작**:
- 원인: timeoutSeconds 너무 짧음
- 해결: timeoutSeconds 증가 (기본 1초)

**4. 잦은 재시작**:
- 원인: failureThreshold 너무 낮음
- 해결: 일시적 오류 고려하여 증가

**디버깅**:
```bash
kubectl describe pod <name>  # Events 확인
kubectl logs <name> --previous  # 이전 로그
```

**Best Practice**:
- Liveness/Readiness 다른 엔드포인트 사용
- Liveness는 보수적으로 (재시작 최소화)
- Readiness는 엄격하게 (준비된 Pod만)

**참고자료**
- [Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)[^100]

</details>

[^100]: Kubernetes 공식 문서 - Probe

---

## 📌 로깅 & 모니터링

### K8S-101
kubectl logs 명령어의 다양한 옵션(-f, --previous, -c, --since)을 설명해주세요.

<details>
<summary>답변</summary>

**주요 옵션**:

| 옵션 | 설명 |
|------|------|
| `-f, --follow` | 실시간 로그 스트리밍 |
| `--previous` | 이전 컨테이너 로그 (재시작 전) |
| `-c <container>` | 특정 컨테이너 지정 (멀티컨테이너) |
| `--since=1h` | 지난 1시간 로그 |
| `--since-time` | 특정 시간 이후 |
| `--tail=100` | 마지막 100줄 |
| `--timestamps` | 타임스탬프 포함 |

**사용 예시**:
```bash
# 실시간 로그
kubectl logs -f pod-name

# 이전 컨테이너 로그 (crash 분석)
kubectl logs pod-name --previous

# 멀티컨테이너 Pod에서 특정 컨테이너
kubectl logs pod-name -c sidecar

# 최근 1시간, 마지막 50줄
kubectl logs pod-name --since=1h --tail=50

# 레이블로 여러 Pod 로그
kubectl logs -l app=nginx --all-containers
```

**참고자료**
- [kubectl logs](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_logs/)[^101]

</details>

[^101]: Kubernetes 공식 문서 - kubectl logs

### K8S-102
Kubernetes에서의 로깅 아키텍처와 노드 레벨/클러스터 레벨 로깅의 차이를 설명해주세요.

<details>
<summary>답변</summary>

**로깅 아키텍처**:
- 컨테이너 stdout/stderr -> 컨테이너 런타임 -> 노드 파일시스템
- 경로: `/var/log/containers/`, `/var/log/pods/`

**노드 레벨 로깅**:
- 각 노드에서 로그 로테이션
- kubelet이 관리 (logrotate)
- 제한: Pod 삭제 시 로그 손실

**클러스터 레벨 로깅**:
- 중앙 집중식 로그 수집/저장
- Pod 삭제 후에도 로그 보존

**클러스터 레벨 구현 방법**:
| 방법 | 설명 |
|------|------|
| Node-level agent | DaemonSet으로 Fluentd/Filebeat |
| Sidecar | 앱과 함께 로그 수집기 |
| Direct push | 앱에서 직접 로그 서비스로 전송 |

**일반적 스택**: Fluentd + Elasticsearch + Kibana (EFK)

**참고자료**
- [Logging Architecture](https://kubernetes.io/docs/concepts/cluster-administration/logging/)[^102]

</details>

[^102]: Kubernetes 공식 문서 - 로깅 아키텍처

### K8S-103
metrics-server의 역할과 kubectl top 명령어 사용 방법을 설명해주세요.

<details>
<summary>답변</summary>

**metrics-server 역할**:
- 클러스터 내 리소스 메트릭 수집 (CPU, Memory)
- kubelet에서 메트릭 수집
- HPA, VPA, kubectl top에 메트릭 제공
- Metrics API 노출 (`metrics.k8s.io`)

**설치**:
```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

**kubectl top 사용**:
```bash
# 노드 리소스 사용량
kubectl top nodes

# Pod 리소스 사용량
kubectl top pods

# 특정 네임스페이스
kubectl top pods -n kube-system

# 컨테이너별 사용량
kubectl top pods --containers

# 정렬
kubectl top pods --sort-by=cpu
kubectl top pods --sort-by=memory
```

**주의**: 실시간 메트릭이 아닌 짧은 기간 평균값

**참고자료**
- [metrics-server](https://github.com/kubernetes-sigs/metrics-server)[^103]

</details>

[^103]: Kubernetes metrics-server

### K8S-104
Prometheus를 활용한 Kubernetes 모니터링 구성 방법을 설명해주세요.

<details>
<summary>답변</summary>

**구성 요소**:
- Prometheus Server: 메트릭 수집/저장
- Node Exporter: 노드 메트릭
- kube-state-metrics: K8s 오브젝트 상태
- Alertmanager: 알림 관리
- Grafana: 시각화

**설치 방법** (kube-prometheus-stack):
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack
```

**서비스 디스커버리**:
- Prometheus가 K8s API로 타겟 자동 발견
- Pod annotation으로 스크래핑 설정
```yaml
metadata:
  annotations:
    prometheus.io/scrape: "true"
    prometheus.io/port: "9090"
```

**주요 메트릭 소스**:
- kubelet `/metrics`: 컨테이너 메트릭
- API server `/metrics`: API 메트릭
- Node exporter: 노드 OS 메트릭

**참고자료**
- [Prometheus Operator](https://prometheus-operator.dev/)[^104]

</details>

[^104]: Prometheus Operator 문서

### K8S-105
Kubernetes에서 수집해야 하는 주요 메트릭(Node, Pod, Container 레벨)을 설명해주세요.

<details>
<summary>답변</summary>

**Node 레벨**:
- CPU 사용률: `node_cpu_seconds_total`
- 메모리: `node_memory_MemAvailable_bytes`
- 디스크: `node_filesystem_avail_bytes`
- 네트워크: `node_network_receive_bytes_total`

**Pod/Container 레벨**:
- CPU: `container_cpu_usage_seconds_total`
- 메모리: `container_memory_working_set_bytes`
- 재시작 횟수: `kube_pod_container_status_restarts_total`
- 상태: `kube_pod_status_phase`

**Kubernetes 오브젝트**:
- Deployment replicas: `kube_deployment_status_replicas_available`
- PVC 상태: `kube_persistentvolumeclaim_status_phase`
- Job 상태: `kube_job_status_succeeded`

**알림 권장 메트릭**:
- Pod CrashLoopBackOff
- Node NotReady
- PVC Pending
- CPU/Memory 임계치 초과
- HPA 최대 replicas 도달

**참고자료**
- [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics)[^105]

</details>

[^105]: Kubernetes kube-state-metrics

---

## 📌 Helm & 패키지 관리

### K8S-106
Helm의 역할과 Chart, Release, Repository의 개념을 설명해주세요.

<details>
<summary>답변</summary>

**Helm 역할**: Kubernetes 패키지 관리자, 앱 배포/관리 간소화

**핵심 개념**:

| 개념 | 설명 |
|------|------|
| **Chart** | Kubernetes 리소스 패키지 (템플릿 + 설정) |
| **Release** | Chart의 설치 인스턴스 |
| **Repository** | Chart 저장소 |

**예시**:
```bash
# Repository 추가
helm repo add bitnami https://charts.bitnami.com/bitnami

# Chart 검색
helm search repo nginx

# Chart 설치 (Release 생성)
helm install my-nginx bitnami/nginx

# Release 목록
helm list

# Release 삭제
helm uninstall my-nginx
```

**특징**:
- 버전 관리: Chart와 Release 모두 버전화
- 롤백 지원: `helm rollback`
- 값 오버라이드: `--set`, `-f values.yaml`

**참고자료**
- [Helm Documentation](https://helm.sh/docs/)[^106]

</details>

[^106]: Helm 공식 문서

### K8S-107
Helm Chart의 구조(Chart.yaml, values.yaml, templates/)를 설명해주세요.

<details>
<summary>답변</summary>

**Chart 디렉토리 구조**:
```
mychart/
├── Chart.yaml        # Chart 메타데이터
├── values.yaml       # 기본 설정값
├── charts/           # 의존성 Chart
├── templates/        # K8s 매니페스트 템플릿
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── _helpers.tpl  # 템플릿 헬퍼
│   └── NOTES.txt     # 설치 후 안내문
└── .helmignore       # 무시할 파일
```

**Chart.yaml**:
```yaml
apiVersion: v2
name: mychart
version: 1.0.0
appVersion: "1.16.0"
description: A Helm chart
dependencies:
  - name: postgresql
    version: "11.x.x"
    repository: "https://charts.bitnami.com/bitnami"
```

**values.yaml**:
```yaml
replicaCount: 3
image:
  repository: nginx
  tag: "1.19"
```

**templates/deployment.yaml**:
```yaml
replicas: {{ .Values.replicaCount }}
image: {{ .Values.image.repository }}:{{ .Values.image.tag }}
```

**참고자료**
- [Chart Template Guide](https://helm.sh/docs/chart_template_guide/)[^107]

</details>

[^107]: Helm 공식 문서 - Chart 템플릿

### K8S-108
Helm의 템플릿 함수와 values.yaml을 통한 설정 오버라이드 방법을 설명해주세요.

<details>
<summary>답변</summary>

**주요 템플릿 함수**:
```yaml
# 기본값 설정
{{ .Values.name | default "default-name" }}

# 조건문
{{ if .Values.enabled }}
...
{{ end }}

# 반복문
{{ range .Values.items }}
- {{ . }}
{{ end }}

# 들여쓰기
{{ .Values.config | toYaml | nindent 4 }}

# 필수값 검증
{{ required "name is required" .Values.name }}
```

**설정 오버라이드 방법**:

**1. --set 플래그**:
```bash
helm install my-app ./chart --set replicaCount=5
helm install my-app ./chart --set image.tag=v2
```

**2. values 파일**:
```bash
helm install my-app ./chart -f production-values.yaml
```

**3. 여러 파일 조합** (뒤가 우선):
```bash
helm install my-app ./chart -f values.yaml -f override.yaml
```

**우선순위**: --set > -f (마지막) > 기본 values.yaml

**참고자료**
- [Helm Values](https://helm.sh/docs/chart_template_guide/values_files/)[^108]

</details>

[^108]: Helm 공식 문서 - Values 파일

### K8S-109
Helm의 Release 관리(install, upgrade, rollback, uninstall)와 Revision에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Release 관리 명령어**:

```bash
# 설치 (Revision 1 생성)
helm install my-app ./chart

# 업그레이드 (새 Revision 생성)
helm upgrade my-app ./chart --set replicas=5

# 롤백 (이전 Revision으로)
helm rollback my-app 1

# 삭제
helm uninstall my-app

# 히스토리 조회
helm history my-app
```

**Revision 개념**:
- 각 install/upgrade마다 Revision 번호 증가
- 이전 Revision 상태 저장 (롤백용)
- Secret으로 저장 (release.* 레이블)

**유용한 옵션**:
```bash
# 업그레이드 또는 없으면 설치
helm upgrade --install my-app ./chart

# Dry-run (실제 적용 안함)
helm upgrade my-app ./chart --dry-run

# 변경사항 확인
helm diff upgrade my-app ./chart
```

**참고자료**
- [Helm Release Management](https://helm.sh/docs/intro/using_helm/)[^109]

</details>

[^109]: Helm 공식 문서 - Using Helm

### K8S-110
Helm Hooks의 역할과 pre-install, post-install 등의 사용 사례를 설명해주세요.

<details>
<summary>답변</summary>

**Hook 역할**: 릴리스 라이프사이클 특정 시점에 작업 실행

**Hook 종류**:
| Hook | 실행 시점 |
|------|----------|
| pre-install | 템플릿 렌더링 후, 리소스 생성 전 |
| post-install | 모든 리소스 생성 후 |
| pre-upgrade | 업그레이드 전 |
| post-upgrade | 업그레이드 후 |
| pre-delete | 삭제 요청 후, 리소스 삭제 전 |
| post-delete | 모든 리소스 삭제 후 |
| pre-rollback | 롤백 전 |
| post-rollback | 롤백 후 |

**설정 예시**:
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  annotations:
    "helm.sh/hook": pre-install
    "helm.sh/hook-weight": "-5"
    "helm.sh/hook-delete-policy": hook-succeeded
```

**사용 사례**:
- pre-install: DB 스키마 마이그레이션
- post-install: 초기 데이터 로드
- pre-upgrade: 백업 생성
- post-delete: 정리 작업

**참고자료**
- [Helm Hooks](https://helm.sh/docs/topics/charts_hooks/)[^110]

</details>

[^110]: Helm 공식 문서 - Chart Hooks

---

## 📌 클러스터 관리 - 업그레이드 & 백업

### K8S-111
Kubernetes 클러스터 버전 업그레이드 절차와 주의사항을 설명해주세요.

<details>
<summary>답변</summary>

**업그레이드 절차**:
1. 릴리스 노트 확인 (deprecation, breaking changes)
2. etcd 백업
3. Control Plane 업그레이드 (순차적)
4. Worker Node 업그레이드 (하나씩)
5. 검증

**주의사항**:
- **버전 스킵 금지**: 한 번에 한 마이너 버전만 (1.25 -> 1.26)
- **버전 차이 제한**: kubelet은 API server보다 2버전 낮을 수 있음
- **API 변경 확인**: deprecated API 미리 대응
- **애드온 호환성**: CNI, CSI 등 버전 확인

**kubeadm 업그레이드 (예시)**:
```bash
# Control Plane
kubeadm upgrade plan
kubeadm upgrade apply v1.27.0

# Node
kubectl drain node1 --ignore-daemonsets
apt-get upgrade kubelet kubectl
systemctl restart kubelet
kubectl uncordon node1
```

**참고자료**
- [Upgrading kubeadm clusters](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/)[^111]

</details>

[^111]: Kubernetes 공식 문서 - kubeadm 업그레이드

### K8S-112
Control Plane 업그레이드와 Worker Node 업그레이드의 순서와 방법을 설명해주세요.

<details>
<summary>답변</summary>

**순서**: Control Plane 먼저 -> Worker Node

**Control Plane 업그레이드**:
```bash
# 1. kubeadm 업그레이드
apt-get update && apt-get install -y kubeadm=1.27.0-00

# 2. 업그레이드 계획 확인
kubeadm upgrade plan

# 3. 첫 번째 Control Plane 노드
kubeadm upgrade apply v1.27.0

# 4. 나머지 Control Plane 노드
kubeadm upgrade node

# 5. kubelet, kubectl 업그레이드
apt-get install -y kubelet=1.27.0-00 kubectl=1.27.0-00
systemctl restart kubelet
```

**Worker Node 업그레이드**:
```bash
# 1. 노드 drain (워크로드 이동)
kubectl drain node1 --ignore-daemonsets --delete-emptydir-data

# 2. kubeadm 업그레이드
kubeadm upgrade node

# 3. kubelet 업그레이드
apt-get install -y kubelet=1.27.0-00
systemctl restart kubelet

# 4. 노드 활성화
kubectl uncordon node1
```

**HA 고려**: Control Plane 하나씩 순차적으로

**참고자료**
- [Upgrade worker nodes](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/upgrading-linux-nodes/)[^112]

</details>

[^112]: Kubernetes 공식 문서 - Worker 노드 업그레이드

### K8S-113
etcd 백업과 복구 방법을 설명해주세요.

<details>
<summary>답변</summary>

**etcd 백업**:
```bash
ETCDCTL_API=3 etcdctl snapshot save snapshot.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key

# 백업 확인
etcdctl snapshot status snapshot.db
```

**etcd 복구**:
```bash
# 1. kube-apiserver 중지
mv /etc/kubernetes/manifests/kube-apiserver.yaml /tmp/

# 2. 스냅샷 복구
ETCDCTL_API=3 etcdctl snapshot restore snapshot.db \
  --data-dir=/var/lib/etcd-restore

# 3. etcd 데이터 디렉토리 교체
mv /var/lib/etcd /var/lib/etcd-backup
mv /var/lib/etcd-restore /var/lib/etcd

# 4. kube-apiserver 재시작
mv /tmp/kube-apiserver.yaml /etc/kubernetes/manifests/
```

**백업 권장 사항**:
- 정기적 자동 백업 (cronjob)
- 오프사이트 저장 (S3, GCS)
- 복구 테스트 정기 수행

**참고자료**
- [Operating etcd](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/)[^113]

</details>

[^113]: Kubernetes 공식 문서 - etcd 운영

### K8S-114
kubectl drain과 cordon 명령어의 역할과 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**cordon**:
- 노드를 스케줄 불가(Unschedulable)로 표시
- 기존 Pod는 계속 실행
- 새 Pod만 스케줄링 안됨

```bash
kubectl cordon node1
kubectl uncordon node1  # 해제
```

**drain**:
- cordon + 기존 Pod 제거 (eviction)
- Pod를 다른 노드로 이동
- DaemonSet Pod는 기본적으로 무시

```bash
kubectl drain node1 --ignore-daemonsets --delete-emptydir-data
```

**차이점**:
| 명령어 | 새 Pod 스케줄 | 기존 Pod |
|--------|--------------|----------|
| cordon | 차단 | 유지 |
| drain | 차단 | 제거/이동 |

**drain 옵션**:
- `--ignore-daemonsets`: DaemonSet Pod 무시
- `--delete-emptydir-data`: emptyDir 볼륨 Pod 삭제
- `--force`: RC 없는 Pod 강제 삭제

**참고자료**
- [Safely Drain a Node](https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/)[^114]

</details>

[^114]: Kubernetes 공식 문서 - 노드 Drain

### K8S-115
노드 유지보수 시 Pod 안전하게 이동시키는 방법과 PodDisruptionBudget의 역할을 설명해주세요.

<details>
<summary>답변</summary>

**안전한 Pod 이동 절차**:
1. PDB 설정 확인/생성
2. `kubectl drain` 실행
3. 유지보수 작업
4. `kubectl uncordon` 실행

**PodDisruptionBudget (PDB)**:
자발적 중단 시 최소 가용 Pod 수 보장

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: app-pdb
spec:
  minAvailable: 2        # 최소 2개 유지
  # 또는
  # maxUnavailable: 1    # 최대 1개만 중단
  selector:
    matchLabels:
      app: myapp
```

**PDB 동작**:
- drain 시 PDB 조건 만족해야 eviction 진행
- 조건 불만족 시 eviction 대기
- 강제 삭제(`--force`)는 PDB 무시

**Best Practice**:
- 프로덕션 워크로드에 PDB 필수
- minAvailable 또는 maxUnavailable 중 하나만 설정
- replicas 수 고려하여 설정

**참고자료**
- [PodDisruptionBudget](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/)[^115]

</details>

[^115]: Kubernetes 공식 문서 - Disruptions

---

## 📌 트러블슈팅 & 디버깅

### K8S-116
Pod가 CrashLoopBackOff 상태일 때의 원인 분석과 해결 방법을 설명해주세요.

<details>
<summary>답변</summary>

**CrashLoopBackOff**: 컨테이너가 반복적으로 시작 실패, 재시작 대기

**주요 원인**:
1. 애플리케이션 오류 (코드 버그, 설정 오류)
2. 리소스 부족 (OOM Kill)
3. 잘못된 command/args
4. 의존성 문제 (DB 연결 실패)
5. Liveness Probe 실패
6. 권한 문제

**분석 방법**:
```bash
# 이벤트 확인
kubectl describe pod <name>

# 현재/이전 로그
kubectl logs <name>
kubectl logs <name> --previous

# 컨테이너 상태
kubectl get pod <name> -o jsonpath='{.status.containerStatuses}'
```

**해결 방법**:
- 로그 분석으로 원인 파악
- OOM: 메모리 limits 증가
- 의존성: Init Container로 대기
- Liveness: Probe 설정 조정
- 임시 디버깅: `command: ["sleep", "3600"]`

**참고자료**
- [Debug Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/)[^116]

</details>

[^116]: Kubernetes 공식 문서 - Pod 디버깅

### K8S-117
Pod가 ImagePullBackOff 상태일 때의 원인과 해결 방법을 설명해주세요.

<details>
<summary>답변</summary>

**ImagePullBackOff**: 이미지 다운로드 반복 실패

**주요 원인**:
1. 이미지 이름/태그 오타
2. 이미지 존재하지 않음
3. Private registry 인증 실패
4. 네트워크 문제
5. Registry 접근 불가

**분석 방법**:
```bash
kubectl describe pod <name>
# Events에서 상세 오류 확인
# "Failed to pull image" 메시지
```

**해결 방법**:

**이미지 확인**:
```bash
docker pull <image>  # 로컬에서 테스트
```

**Private registry 인증**:
```bash
# Secret 생성
kubectl create secret docker-registry regcred \
  --docker-server=<registry> \
  --docker-username=<user> \
  --docker-password=<password>

# Pod에 적용
spec:
  imagePullSecrets:
  - name: regcred
```

**이미지 정책 확인**:
- `imagePullPolicy: Always` -> 항상 pull
- `imagePullPolicy: IfNotPresent` -> 없을 때만

**참고자료**
- [Images](https://kubernetes.io/docs/concepts/containers/images/)[^117]

</details>

[^117]: Kubernetes 공식 문서 - Images

### K8S-118
kubectl describe, kubectl logs, kubectl exec를 활용한 디버깅 방법을 설명해주세요.

<details>
<summary>답변</summary>

**kubectl describe**:
리소스 상세 정보와 이벤트 확인
```bash
kubectl describe pod <name>
kubectl describe node <name>
kubectl describe service <name>

# 확인할 내용: Events, Conditions, Status
```

**kubectl logs**:
컨테이너 로그 확인
```bash
kubectl logs <pod>
kubectl logs <pod> -c <container>  # 특정 컨테이너
kubectl logs <pod> --previous      # 이전 컨테이너
kubectl logs <pod> -f              # 실시간
kubectl logs -l app=nginx          # 레이블로 여러 Pod
```

**kubectl exec**:
컨테이너 내부 명령 실행
```bash
kubectl exec <pod> -- ls /app
kubectl exec -it <pod> -- /bin/sh  # 대화형 셸
kubectl exec <pod> -c <container> -- cat /etc/config

# 네트워크 디버깅
kubectl exec <pod> -- curl localhost:8080
kubectl exec <pod> -- nslookup kubernetes
```

**디버깅 순서**:
1. describe로 이벤트 확인
2. logs로 애플리케이션 로그 확인
3. exec로 내부 상태 확인

**참고자료**
- [Debug Running Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/)[^118]

</details>

[^118]: Kubernetes 공식 문서 - 실행 중인 Pod 디버깅

### K8S-119
kubectl debug 명령어를 활용한 ephemeral container 디버깅 방법을 설명해주세요.

<details>
<summary>답변</summary>

**kubectl debug**: 실행 중인 Pod에 디버깅 컨테이너 추가

**Ephemeral Container 사용**:
```bash
# 디버깅 컨테이너 추가
kubectl debug -it <pod> --image=busybox --target=<container>

# 기존 컨테이너와 프로세스 네임스페이스 공유
kubectl debug -it <pod> --image=ubuntu --share-processes
```

**Pod 복사본으로 디버깅**:
```bash
# 수정된 복사본 생성
kubectl debug <pod> -it --copy-to=debug-pod --container=debugger --image=ubuntu

# 다른 command로 복사
kubectl debug <pod> --copy-to=debug-pod --set-image=*=ubuntu -- sleep 3600
```

**노드 디버깅**:
```bash
kubectl debug node/<node-name> -it --image=ubuntu
# 노드 파일시스템: /host
```

**장점**:
- Distroless 이미지 디버깅 가능
- 실행 중인 Pod 변경 없이 디버깅
- 네트워크/프로세스 네임스페이스 공유

**참고자료**
- [Debug with Ephemeral Containers](https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/#ephemeral-container)[^119]

</details>

[^119]: Kubernetes 공식 문서 - Ephemeral Container 디버깅

### K8S-120
Service에 연결되지 않는 Pod 문제 해결 방법(selector, endpoints 확인 등)을 설명해주세요.

<details>
<summary>답변</summary>

**문제 분석 단계**:

**1. Service selector 확인**:
```bash
kubectl get svc <name> -o yaml
# spec.selector 확인
```

**2. Pod 레이블 확인**:
```bash
kubectl get pods --show-labels
# Service selector와 일치하는지 확인
```

**3. Endpoints 확인**:
```bash
kubectl get endpoints <service-name>
# Pod IP가 등록되어 있는지 확인
# 비어있으면 selector 불일치 또는 Pod 없음
```

**4. Pod 상태 확인**:
```bash
kubectl get pods
# Running 상태인지, Readiness Probe 통과했는지
```

**5. 포트 확인**:
```bash
# Service targetPort = Container port
kubectl describe svc <name>
kubectl describe pod <name>
```

**일반적인 원인**:
- selector 오타
- 레이블 불일치
- Readiness Probe 실패
- Pod가 Running이 아님
- 포트 번호 불일치

**테스트**:
```bash
kubectl run test --image=busybox -it --rm -- wget -O- <service>:<port>
```

**참고자료**
- [Debug Services](https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/)[^120]

</details>

[^120]: Kubernetes 공식 문서 - Service 디버깅

### K8S-121
DNS 관련 문제 해결 방법(CoreDNS 확인, nslookup 테스트 등)을 설명해주세요.

<details>
<summary>답변</summary>

**DNS 문제 진단**:

**1. CoreDNS 상태 확인**:
```bash
kubectl get pods -n kube-system -l k8s-app=kube-dns
kubectl logs -n kube-system -l k8s-app=kube-dns
```

**2. Pod 내부에서 DNS 테스트**:
```bash
kubectl run test --image=busybox:1.28 -it --rm -- nslookup kubernetes
kubectl run test --image=busybox:1.28 -it --rm -- nslookup <service>.<namespace>
```

**3. resolv.conf 확인**:
```bash
kubectl exec <pod> -- cat /etc/resolv.conf
# nameserver가 CoreDNS ClusterIP인지 확인
```

**4. CoreDNS ConfigMap 확인**:
```bash
kubectl get configmap coredns -n kube-system -o yaml
```

**일반적인 원인**:
- CoreDNS Pod 장애
- NetworkPolicy로 DNS 차단
- 잘못된 Service/Namespace 이름
- 노드 DNS 설정 문제

**DNS 형식**:
- Service: `<svc>.<ns>.svc.cluster.local`
- Pod: `<pod-ip>.<ns>.pod.cluster.local`

**참고자료**
- [Debugging DNS Resolution](https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/)[^121]

</details>

[^121]: Kubernetes 공식 문서 - DNS 디버깅

---

## 📌 서비스 메시 - Istio & Linkerd

### K8S-122
서비스 메시(Service Mesh)의 개념과 필요성에 대해 설명해주세요.

<details>
<summary>답변</summary>

**서비스 메시 개념**: 마이크로서비스 간 통신을 관리하는 인프라 계층

**구성**:
- Data Plane: Sidecar 프록시 (Envoy)로 트래픽 처리
- Control Plane: 정책 관리, 설정 배포

**필요성**:

| 기능 | 설명 |
|------|------|
| **트래픽 관리** | 로드밸런싱, 라우팅, A/B 테스트, Canary |
| **보안** | mTLS 암호화, 인증/인가 |
| **관찰성** | 분산 추적, 메트릭, 로그 |
| **복원력** | 재시도, 타임아웃, 서킷브레이커 |

**없을 때 문제점**:
- 각 서비스에서 직접 구현 필요
- 언어/프레임워크별 다른 구현
- 일관성 없는 보안/모니터링

**적합한 상황**:
- 많은 마이크로서비스
- 복잡한 서비스 간 통신
- 강화된 보안 요구사항

**참고자료**
- [Service Mesh](https://istio.io/latest/about/service-mesh/)[^122]

</details>

[^122]: Istio - Service Mesh 소개

### K8S-123
Sidecar Proxy 패턴과 서비스 메시에서의 트래픽 제어 방식을 설명해주세요.

<details>
<summary>답변</summary>

**Sidecar Proxy 패턴**:
- 각 Pod에 프록시 컨테이너 (Envoy) 주입
- 모든 인바운드/아웃바운드 트래픽이 프록시 경유
- 애플리케이션 코드 수정 없이 기능 추가

**트래픽 흐름**:
```
App A -> Envoy(A) -> Envoy(B) -> App B
```

**트래픽 제어 방식**:

**1. 로드밸런싱**:
- Round Robin, Least Connection, Random
- 가중치 기반 분배

**2. 트래픽 분할**:
```yaml
# 90% v1, 10% v2 (Canary)
route:
- destination:
    host: myapp
    subset: v1
  weight: 90
- destination:
    host: myapp
    subset: v2
  weight: 10
```

**3. 재시도/타임아웃**:
```yaml
retries:
  attempts: 3
timeout: 5s
```

**4. 서킷브레이커**:
- 연속 실패 시 요청 차단
- 서비스 장애 전파 방지

**참고자료**
- [Istio Traffic Management](https://istio.io/latest/docs/concepts/traffic-management/)[^123]

</details>

[^123]: Istio - 트래픽 관리

### K8S-124
Istio의 아키텍처와 주요 컴포넌트(Envoy, Istiod)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**Istio 아키텍처**:

**Data Plane**:
- **Envoy Proxy**: 각 Pod의 Sidecar로 배포
  - L4/L7 프록시
  - 트래픽 라우팅, 로드밸런싱
  - TLS 종료, 인증
  - 메트릭 수집

**Control Plane**:
- **Istiod**: 통합 컨트롤 플레인 (Pilot + Citadel + Galley 통합)
  - Pilot: 서비스 디스커버리, 트래픽 정책
  - Citadel: 인증서 관리, mTLS
  - Galley: 설정 검증, 배포

**설치**:
```bash
istioctl install --set profile=demo
kubectl label namespace default istio-injection=enabled
```

**CRD**:
- VirtualService: 트래픽 라우팅 규칙
- DestinationRule: 로드밸런싱, 서킷브레이커
- Gateway: Ingress/Egress 설정
- AuthorizationPolicy: 접근 제어

**참고자료**
- [Istio Architecture](https://istio.io/latest/docs/ops/deployment/architecture/)[^124]

</details>

[^124]: Istio - 아키텍처

### K8S-125
Istio의 트래픽 관리 기능(VirtualService, DestinationRule)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**VirtualService**: 요청 라우팅 규칙 정의

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: reviews
spec:
  hosts:
  - reviews
  http:
  - match:
    - headers:
        end-user:
          exact: jason
    route:
    - destination:
        host: reviews
        subset: v2
  - route:
    - destination:
        host: reviews
        subset: v1
```

**DestinationRule**: 목적지 정책 정의

```yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: reviews
spec:
  host: reviews
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
    outlierDetection:
      consecutive5xxErrors: 5
      interval: 30s
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
```

**주요 기능**:
- 트래픽 분할 (Canary, A/B)
- 헤더 기반 라우팅
- 재시도, 타임아웃
- 서킷브레이커

**참고자료**
- [Istio Traffic Management](https://istio.io/latest/docs/concepts/traffic-management/)[^125]

</details>

[^125]: Istio - 트래픽 관리

### K8S-126
Istio의 보안 기능(mTLS, Authorization Policy)에 대해 설명해주세요.

<details>
<summary>답변</summary>

**mTLS (Mutual TLS)**:
서비스 간 양방향 TLS 인증/암호화

```yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: istio-system
spec:
  mtls:
    mode: STRICT  # 모든 트래픽 mTLS 강제
```

**모드**:
- STRICT: mTLS만 허용
- PERMISSIVE: mTLS와 평문 모두 허용 (마이그레이션용)
- DISABLE: mTLS 비활성화

**Authorization Policy**:
서비스 간 접근 제어

```yaml
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: httpbin-policy
spec:
  selector:
    matchLabels:
      app: httpbin
  action: ALLOW
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/default/sa/frontend"]
    to:
    - operation:
        methods: ["GET"]
        paths: ["/api/*"]
```

**기능**: ServiceAccount 기반 인증, HTTP 메서드/경로 기반 인가

**참고자료**
- [Istio Security](https://istio.io/latest/docs/concepts/security/)[^126]

</details>

[^126]: Istio - 보안

### K8S-127
Linkerd의 특징과 Istio와의 비교를 설명해주세요.

<details>
<summary>답변</summary>

**Linkerd 특징**:
- 경량화, 단순성 중시
- Rust로 작성된 프록시 (linkerd2-proxy)
- 빠른 설치, 낮은 리소스 사용
- CNCF graduated 프로젝트

**Istio vs Linkerd 비교**:

| 항목 | Istio | Linkerd |
|------|-------|---------|
| 프록시 | Envoy (C++) | linkerd2-proxy (Rust) |
| 복잡도 | 높음 | 낮음 |
| 리소스 | 더 많이 사용 | 경량 |
| 기능 | 풍부 | 핵심 기능 집중 |
| 학습 곡선 | 가파름 | 완만 |
| 커뮤니티 | 더 큼 | 성장 중 |

**선택 기준**:
- **Istio**: 복잡한 트래픽 관리, 풍부한 기능 필요
- **Linkerd**: 단순함, 낮은 오버헤드 우선

**Linkerd 설치**:
```bash
linkerd install | kubectl apply -f -
linkerd inject deployment.yaml | kubectl apply -f -
```

**참고자료**
- [Linkerd](https://linkerd.io/)[^127]

</details>

[^127]: Linkerd 공식 문서

---

## 📌 CRD & Operator 패턴

### K8S-128
CRD(Custom Resource Definition)의 개념과 Kubernetes 확장 방법을 설명해주세요.

<details>
<summary>답변</summary>

**CRD 개념**: Kubernetes API를 확장하여 사용자 정의 리소스 타입 생성

**CRD 정의 예시**:
```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: myapps.example.com
spec:
  group: example.com
  versions:
  - name: v1
    served: true
    storage: true
    schema:
      openAPIV3Schema:
        type: object
        properties:
          spec:
            type: object
            properties:
              replicas:
                type: integer
  scope: Namespaced
  names:
    plural: myapps
    singular: myapp
    kind: MyApp
```

**Custom Resource 사용**:
```yaml
apiVersion: example.com/v1
kind: MyApp
metadata:
  name: my-application
spec:
  replicas: 3
```

**확장 방법**:
1. CRD로 리소스 타입 정의
2. Custom Controller로 리소스 관리 로직 구현
3. Operator 패턴으로 운영 자동화

**참고자료**
- [Custom Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)[^128]

</details>

[^128]: Kubernetes 공식 문서 - Custom Resources

### K8S-129
Custom Resource와 Custom Controller의 관계를 설명해주세요.

<details>
<summary>답변</summary>

**관계**: Custom Resource는 "원하는 상태", Controller는 "실제 구현"

**Custom Resource (CR)**:
- 사용자가 정의한 Kubernetes 오브젝트
- 원하는 상태(spec)를 선언
- etcd에 저장됨

**Custom Controller**:
- CR을 감시(watch)
- 현재 상태와 원하는 상태 비교
- 차이를 해소하는 동작 수행 (Reconciliation Loop)

**동작 흐름**:
```
1. 사용자가 CR 생성/수정
2. Controller가 변경 감지
3. Reconcile 함수 실행
   - 현재 상태 조회
   - 원하는 상태와 비교
   - 필요한 작업 수행 (Pod 생성 등)
4. CR status 업데이트
```

**예시**:
```
CRD: Database (종류 정의)
CR: my-postgres (인스턴스)
Controller: PostgreSQL Operator (실제 DB 생성/관리)
```

**참고자료**
- [Controller Pattern](https://kubernetes.io/docs/concepts/architecture/controller/)[^129]

</details>

[^129]: Kubernetes 공식 문서 - Controllers

### K8S-130
Operator 패턴이란 무엇이며, 어떤 상황에서 사용하나요?

<details>
<summary>답변</summary>

**Operator 패턴**: CRD + Custom Controller로 복잡한 애플리케이션 운영 자동화

**핵심 개념**:
- 운영자(Operator)의 지식을 코드화
- 도메인 전문 지식을 Kubernetes 리소스로 표현
- 자동 복구, 스케일링, 업그레이드 등 자동화

**사용 상황**:
1. **Stateful 애플리케이션**: 데이터베이스, 메시지 큐
2. **복잡한 설정**: 클러스터링, 복제 설정
3. **운영 자동화**: 백업, 복구, 업그레이드
4. **도메인 지식 필요**: 특정 애플리케이션의 운영 노하우

**예시**:
```yaml
apiVersion: postgresql.cnpg.io/v1
kind: Cluster
metadata:
  name: my-postgres
spec:
  instances: 3
  storage:
    size: 10Gi
# Operator가 자동으로:
# - 3개 인스턴스 생성
# - 복제 설정
# - 페일오버 처리
```

**Operator vs Helm**:
- Helm: 설치/업그레이드 시점만
- Operator: 전체 라이프사이클 관리

**참고자료**
- [Operator Pattern](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/)[^130]

</details>

[^130]: Kubernetes 공식 문서 - Operator Pattern

### K8S-131
Operator Framework(Operator SDK, Kubebuilder)를 활용한 Operator 개발 방법을 설명해주세요.

<details>
<summary>답변</summary>

**주요 프레임워크**:

| 프레임워크 | 특징 |
|-----------|------|
| **Kubebuilder** | Go 기반, CNCF 프로젝트 |
| **Operator SDK** | Go/Ansible/Helm 지원, Red Hat |

**Kubebuilder 개발 흐름**:
```bash
# 프로젝트 초기화
kubebuilder init --domain example.com

# API 생성 (CRD + Controller)
kubebuilder create api --group app --version v1 --kind MyApp

# 구현
# - api/v1/myapp_types.go (리소스 스키마)
# - controllers/myapp_controller.go (Reconcile 로직)

# CRD 설치 및 실행
make install
make run
```

**Reconcile 함수 예시**:
```go
func (r *MyAppReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
    // 1. CR 조회
    var myapp appv1.MyApp
    if err := r.Get(ctx, req.NamespacedName, &myapp); err != nil {
        return ctrl.Result{}, client.IgnoreNotFound(err)
    }

    // 2. 원하는 상태로 조정
    // Deployment 생성/업데이트 등

    return ctrl.Result{}, nil
}
```

**참고자료**
- [Kubebuilder Book](https://book.kubebuilder.io/)[^131]

</details>

[^131]: Kubebuilder 공식 문서

### K8S-132
유명한 Operator 사례(Prometheus Operator, MySQL Operator 등)와 그 장점을 설명해주세요.

<details>
<summary>답변</summary>

**주요 Operator 사례**:

| Operator | 용도 | 장점 |
|----------|------|------|
| **Prometheus Operator** | 모니터링 | ServiceMonitor CRD로 자동 타겟 설정 |
| **Cert-Manager** | 인증서 관리 | Let's Encrypt 자동 발급/갱신 |
| **Strimzi** | Kafka | 클러스터 자동 관리, 업그레이드 |
| **Zalando PostgreSQL** | PostgreSQL | HA, 자동 페일오버 |
| **Elastic Operator** | Elasticsearch | 클러스터 관리, 스케일링 |
| **ArgoCD** | GitOps | 자동 배포, 동기화 |

**Prometheus Operator 예시**:
```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: my-app
spec:
  selector:
    matchLabels:
      app: my-app
  endpoints:
  - port: metrics
# 자동으로 Prometheus 타겟에 추가
```

**Operator 장점**:
- 복잡한 운영 작업 자동화
- 일관된 배포/업그레이드
- 도메인 전문 지식 캡슐화
- 자가 치유 (self-healing)

**참고자료**
- [OperatorHub.io](https://operatorhub.io/)[^132]

</details>

[^132]: OperatorHub - Operator 마켓플레이스

---

## 📌 고급 네트워킹

### K8S-133
Kubernetes 클러스터 내 Pod 간 통신 원리를 설명해주세요.

<details>
<summary>답변</summary>

**Kubernetes 네트워크 모델 요구사항**:
1. 모든 Pod는 NAT 없이 다른 Pod와 통신 가능
2. 모든 노드는 NAT 없이 모든 Pod와 통신 가능
3. Pod가 보는 자신의 IP = 다른 Pod가 보는 IP

**Pod 간 통신 방식**:

**같은 노드 내**:
```
Pod A -> veth -> bridge (cbr0) -> veth -> Pod B
```
- 가상 이더넷 쌍 (veth)
- 리눅스 브릿지로 연결

**다른 노드 간**:
```
Pod A -> veth -> bridge -> CNI (오버레이/라우팅) -> Node B -> bridge -> Pod B
```

**CNI 구현 방식**:
- **오버레이**: VXLAN 터널 (Flannel, Weave)
- **라우팅**: BGP 기반 (Calico)
- **eBPF**: 커널 레벨 라우팅 (Cilium)

**Pod IP 할당**:
- 노드별 Pod CIDR 범위 할당
- CNI가 Pod에 IP 할당

**참고자료**
- [Cluster Networking](https://kubernetes.io/docs/concepts/cluster-administration/networking/)[^133]

</details>

[^133]: Kubernetes 공식 문서 - 클러스터 네트워킹

### K8S-134
Service의 ClusterIP가 동작하는 원리(kube-proxy, iptables/IPVS)를 설명해주세요.

<details>
<summary>답변</summary>

**ClusterIP 동작 원리**:
ClusterIP는 가상 IP로, 실제 인터페이스에 바인딩되지 않음

**kube-proxy 역할**:
- API Server에서 Service/Endpoints 변경 감지
- 노드에 트래픽 라우팅 규칙 설정

**iptables 모드**:
```
Client -> ClusterIP:port
-> iptables DNAT (목적지 변경)
-> Pod IP:targetPort
```
- Service당 iptables 규칙 생성
- 랜덤 Pod 선택 (확률 기반)
- 규칙 많아지면 성능 저하

**IPVS 모드**:
```
Client -> ClusterIP:port
-> IPVS 가상 서버
-> Pod IP:targetPort
```
- 커널 레벨 로드밸런서
- 해시 테이블 기반 (O(1) 조회)
- 다양한 알고리즘 (rr, lc, sh, dh)
- 대규모 클러스터에 적합

**확인**:
```bash
iptables-save | grep <service-name>
ipvsadm -Ln
```

**참고자료**
- [Virtual IPs and Service Proxies](https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies)[^134]

</details>

[^134]: Kubernetes 공식 문서 - Service Proxy

### K8S-135
Pod에서 외부 서비스로 통신할 때의 네트워크 흐름을 설명해주세요.

<details>
<summary>답변</summary>

**네트워크 흐름**:
```
Pod -> CNI 네트워크 -> 노드 -> SNAT -> 외부 서비스
```

**상세 단계**:
1. **Pod에서 요청 발생**
   - 소스: Pod IP, 목적지: 외부 IP

2. **CNI 네트워크 통과**
   - Pod -> veth -> bridge -> 노드 eth0

3. **SNAT (Source NAT)**
   - 소스 IP: Pod IP -> 노드 IP로 변환
   - 외부에서 응답 가능하도록

4. **외부로 전송**
   - 노드의 기본 라우팅 테이블 사용

5. **응답 수신**
   - 역SNAT: 노드 IP -> Pod IP
   - Pod로 전달

**Egress 제어**:
- NetworkPolicy: 아웃바운드 트래픽 제한
- NAT Gateway: 클라우드 환경에서 고정 IP 사용

**ExternalName Service**:
```yaml
kind: Service
spec:
  type: ExternalName
  externalName: api.external.com
```

**참고자료**
- [Cluster Networking](https://kubernetes.io/docs/concepts/cluster-administration/networking/)[^135]

</details>

[^135]: Kubernetes 공식 문서 - 클러스터 네트워킹

### K8S-136
Gateway API의 개념과 Ingress와의 차이점을 설명해주세요.

<details>
<summary>답변</summary>

**Gateway API**: 차세대 Ingress API, Kubernetes SIG-Network에서 개발

**주요 리소스**:
- **GatewayClass**: 인프라 공급자 정의 (클러스터 관리자)
- **Gateway**: 로드밸런서 인스턴스 (인프라 관리자)
- **HTTPRoute**: 라우팅 규칙 (앱 개발자)

**Ingress와의 차이**:

| 항목 | Ingress | Gateway API |
|------|---------|-------------|
| 프로토콜 | HTTP/HTTPS | HTTP, TCP, UDP, gRPC |
| 역할 분리 | 없음 | GatewayClass/Gateway/Route |
| 확장성 | annotations | 명시적 CRD |
| 표준화 | 느슨함 | 엄격한 스펙 |
| 트래픽 분할 | 미지원 | 기본 지원 |

**예시**:
```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: my-route
spec:
  parentRefs:
  - name: my-gateway
  rules:
  - matches:
    - path:
        value: /api
    backendRefs:
    - name: api-service
      port: 80
      weight: 90
    - name: api-service-v2
      port: 80
      weight: 10
```

**참고자료**
- [Gateway API](https://gateway-api.sigs.k8s.io/)[^136]

</details>

[^136]: Kubernetes Gateway API 문서

---

## 📌 멀티 클러스터 & GitOps

### K8S-137
멀티 클러스터 관리의 필요성과 주요 고려사항을 설명해주세요.

<details>
<summary>답변</summary>

**필요성**:
- **고가용성**: 리전/가용영역 장애 대비
- **지연 최소화**: 사용자 가까운 리전에 배포
- **규정 준수**: 데이터 지역성 요구사항
- **격리**: 환경별, 팀별 분리
- **스케일**: 단일 클러스터 한계 극복

**주요 고려사항**:

| 영역 | 고려사항 |
|------|----------|
| **네트워킹** | 클러스터 간 통신, Service mesh |
| **데이터** | 상태 동기화, 데이터 복제 |
| **배포** | 일관된 배포 전략, GitOps |
| **보안** | 통합 인증/인가, Secret 관리 |
| **모니터링** | 중앙 집중식 관찰성 |
| **관리** | 클러스터 프로비저닝 자동화 |

**도구**:
- Rancher, OpenShift
- Cluster API
- Liqo, Submariner (네트워킹)
- Istio (서비스 메시)

**참고자료**
- [Multi-cluster](https://kubernetes.io/docs/concepts/cluster-administration/)[^137]

</details>

[^137]: Kubernetes 공식 문서 - 클러스터 관리

### K8S-138
Federation의 개념과 멀티 클러스터 배포 전략을 설명해주세요.

<details>
<summary>답변</summary>

**Federation 개념**: 여러 클러스터를 단일 논리적 단위로 관리

**KubeFed (Kubernetes Federation v2)**:
- 중앙 제어 플레인에서 여러 클러스터 관리
- FederatedDeployment 등 Federated 리소스
- 클러스터별 오버라이드 지원

```yaml
apiVersion: types.kubefed.io/v1beta1
kind: FederatedDeployment
spec:
  template:
    spec:
      replicas: 3
  placement:
    clusters:
    - name: cluster1
    - name: cluster2
  overrides:
  - clusterName: cluster2
    clusterOverrides:
    - path: /spec/replicas
      value: 5
```

**멀티 클러스터 배포 전략**:

| 전략 | 설명 |
|------|------|
| **Active-Active** | 모든 클러스터에서 트래픽 처리 |
| **Active-Passive** | 장애 시 대기 클러스터 활성화 |
| **Follow-the-Sun** | 시간대별 활성 클러스터 변경 |
| **Sharding** | 데이터/사용자별 클러스터 분리 |

**도구**: KubeFed, Cluster API, ArgoCD ApplicationSet

**참고자료**
- [KubeFed](https://github.com/kubernetes-sigs/kubefed)[^138]

</details>

[^138]: Kubernetes Federation

### K8S-139
GitOps의 개념과 ArgoCD를 활용한 Kubernetes 배포 방법을 설명해주세요.

<details>
<summary>답변</summary>

**GitOps 개념**:
- Git을 Single Source of Truth로 사용
- 선언적 인프라/앱 정의
- 자동화된 동기화 (Git -> 클러스터)

**GitOps 원칙**:
1. 선언적 시스템
2. Git에 버전 관리
3. 자동 적용
4. 지속적 검증 및 동기화

**ArgoCD 설치**:
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

**Application 정의**:
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/org/repo
    path: k8s
    targetRevision: main
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

**워크플로우**:
Git Push -> ArgoCD 감지 -> Sync -> 클러스터 배포

**참고자료**
- [ArgoCD](https://argo-cd.readthedocs.io/)[^139]

</details>

[^139]: ArgoCD 공식 문서

### K8S-140
Flux와 ArgoCD의 비교 및 선택 기준을 설명해주세요.

<details>
<summary>답변</summary>

**ArgoCD vs Flux 비교**:

| 항목 | ArgoCD | Flux |
|------|--------|------|
| **UI** | 웹 UI 기본 제공 | 별도 설치 필요 |
| **아키텍처** | 중앙 집중식 | 분산형 (에이전트) |
| **리소스 사용** | 더 많음 | 경량 |
| **멀티테넌시** | Project로 지원 | 네임스페이스 기반 |
| **Helm 지원** | 네이티브 | Helm Controller |
| **학습 곡선** | 완만 | 조금 가파름 |
| **CNCF** | Incubating | Graduated |

**ArgoCD 선택 시**:
- 웹 UI 필요
- 팀 단위 접근 제어 필요
- 시각적 상태 확인 중요

**Flux 선택 시**:
- 경량 솔루션 선호
- CLI 중심 워크플로우
- 엣지/소규모 클러스터
- Kustomize 활용 많음

**공통점**:
- Git 기반 배포
- 자동 동기화
- Kubernetes 네이티브

**참고자료**
- [Flux](https://fluxcd.io/)[^140]
- [ArgoCD](https://argo-cd.readthedocs.io/)

</details>

[^140]: Flux 공식 문서

---
