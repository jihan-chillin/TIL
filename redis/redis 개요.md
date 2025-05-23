# Redis ( Remote Dictionary Servcer ) 개요
- 고성능의 key-value 저장소. **거대한 맵 (Map)** 저장소 형태를 가지고 데이터를 메모리에 저장하여 빠른 읽기와 쓰기를 지원함.
- 주로 캐싱, 인증 관리, DB 동시성 제어 등에 사용됨.

### 주요 특징
- key-value의 단순한 데이터 구조를 가지기 때문에 sql 쿼리를 사용하지 않아도 됨.
- 빠른 성능
    - 인메모리([부록 1](부록.md#부록-1-인메모리)) NoSQL 데이터베이스로서 빠른 성능
        - rdb는 기본적으로 disk에 저장이고 필요시에 메모리에 캐싱하는 것이므로, rdb보다 훨씬 빠른 성능
        - redis의 메모리상의 데이터는 주기적으로 스냅샷 disk에 저장
    - key-value는 구조적으로 해시 테이블([부록 2](부록.md#부록-2-해시테이블))을 사용함으로서 매우 빠른 속도로 데이터 검색 가능
- Single Thread([부록 3](부록.md#부록-3-single-thread)) 구조로 동시성 이슈 발생X
- 윈도우 서버에서는 지원하지 않고, linux서버 및 macOS등에서 사용 가능

# redis 접속
### redis설치(linux)
> sudo apt-get install redis-server
### redis접속
> redis-cli

### redis도커설치(윈도우, mac)
> docker run --name redis-container -d -p 6379:6379 redis
### docker 컨네이너 조회
> docker ps
### redis도커 접속
> docker exec -it <containerID> redis-cli