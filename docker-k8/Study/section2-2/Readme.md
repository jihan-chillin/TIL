# 이미지 & 컨테이너 관리

## 여러가지 mode 명령어

### docker run vs docker start

|  | docker run  | docker start |
| --- | --- | --- |
| 컨테이너 생성 | 새 컨테이너를 생성하고 실행 | 기존 컨테이너를 다시 시작 |
| 이미지 필요여부 | 실행할 이미지를 반드시 명시해야 함 | 이미 생성된 컨테이너가 있어야 함 |
| 상태  | 새로 실행되는 컨테이너느 초기상태로 시작 | 이전 컨테이너의 상태를 유지하고 시작 |
| 디폴트 모드 | attached mode | detached mode |

### detached mode vs attached mode

- attached mode  ( 터미널과 컨테이너의 출력을 연결하지만, 실시간 입력은 기본적으로 지원하지 ❌ )
    - 컨테이너를 포그라운드에서 실행하고, 터미널을 컨테이너와 연결한다.
        
        ```docker
        docker run -it -name {컨테이너 이름} {이미지 ID}
        
        # detached mode에서 attach mode로 전환
        docker start 
        docker attach {컨테이너 이름}
        ```
        
    - 사용자의 터미널과 컨테이너의 **출력 (stdout) / 에러 (stderr)**를 연결한다.
- detached mode
    - 컨테이너가 배그라운드에서 실행된다.
        
        그렇기 때문에 별도로 `docker logs` 같은 명령어가 필요하다.
        
    - 명령어 플래그로는 -d로 detached mode로 실행할 수 있다.
        
        ```docker
        docker run -p {로컬포트}:{도커포트} -d {컨테이너 ID} 
        ```
        
    - **웹서버처럼 계속 실행되어야 하는 서비스는 detached mode로 해야함.**

### interactive mode vs terminal mode

- interactive mode (실시간 입력 및 출력이 가능한 대화형 환경)
    - 사용자가 제공한 입력에 따라 즉각적으로 작업을 수행하고 결과를 반환하는 모드
        
        ```docker
        # 처음부터 표준출력,입력 모두 활성화 시키는 방법
        docker run -it 24bc844ad619
        
        # 어태치모드에서 표준입력까지 활성화 시키는 방법
        docker start -a -i 6a106e80d7c2
        ```
        
        ![스크린샷 2024-12-08 오후 6.39.57.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/12b8d6c9-27c3-49c1-bcd3-870fbf70c25a/5f44c00b-067f-4281-8710-fdafe69fc929/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-12-08_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.39.57.png)
        
    - **표준 입력(stdin), 표준 출력(stdout), 표준 에러(stderr)**가 연결된다.
- terminal mode
    - 명령을 실행하고 끝내는 모드
        
        ```docker
        docker run 24bc844ad619 echo "Hello, World"
        docker 
        ```
        

---

## 필요없는 모듈 삭제 명령어

- 이미지 삭제
    
    ```docker
    docker rmi {이미지 ID}
    ```
    
- 사용되지 않는 모드 이미지 삭제
    
    ```docker
    docker image prune
    ```
    
- 실행중인 컨테이너 삭제
    
    ```docker
    docker stop {컨테이너 ID}
    docker rm {컨테이너 ID}
    ```
    
- 다중 삭제
    
    ```docker
    docker rm {컨테이너 ID} {컨테이너 ID} {컨테이너 ID}
    ```
    

### 컨테이너 생성할 때부터 중지될 때 자동 삭제시키는 실행명령어

- `—rm 플래그`
    
    ```docker
    docker run -p 3000:80 --name node-container -d --rm 56ac5603c4d7
    ```
    
    - docker stop {컨테이너ID}
    - docker ps -a 하면, 해당 컨테이너 중지 즉시 삭제된 것을 확인할 수 있다.

### 이미지 정보

- 이미지 정보
    
    ```docker
    docker image inspect {이미지 ID}
    ```
    
    - 빌드한 이미지의 레이어를 확인해보니…**명령어의 개수보다 레이어가 많다..?**
        
        ![스크린샷 2024-12-08 오후 7.13.30.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/12b8d6c9-27c3-49c1-bcd3-870fbf70c25a/6779a039-1ac7-4d8b-b02f-a4a92fa2844d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-12-08_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.13.30.png)
        
        - 일단 베이스 이미지 자체가 여러 레이어로 구성되어 있다.
        - Docker 내부에서의 최적화
            - 복잡한 명령어가 있을 땐, 일부 작업들이 알아서 별도 레이어로 나누어지기도 한다.
        - LABEL, ENV 같은 메타데이터 레이어가 생성되는 경우도 있다.
        - 캐싱과 재사용을 위해 중간데이터를 저장하기도 한다.

- 이미지 이름과 태그 지정
    - 보다 더 특정화된 이미지를 빌드할 수 있다.
    
    ```docker
    # 이름 : 특정화된 이미지
    docker build -t {이미지 이름}.
    # 태그 : 특정화된 이미지에 버전을 기입할 수 있다.
    docker build -t {이미지 이름}:{이미지 버전}
    ```
    

### 컨테이너

- 컨테이너 이름과 태그 지정
    
    ```docker
    docker run --name {컨테이너 이름} {이미지 ID}
    ```
    

- COPY
    - 일반적으로 이런식의 작업은 하지 않지만, 이미지를 빌드하지 않고 컨테이너에 소스코드를 업데이트 할 수 있다. → 그렇지만 risky한 방법
    
    ```docker
    # 로컬에 있는 폴더 특정 컨테이너로 COPY
    docker cp dummy/. node-container:/test
    
    # 컨테이너에 있는 파일 로컬에 COPY
    docker cp node-container:/test dummy
    docker cp node-container:/test/text.txt dummy
    ```
    

## 이미지 공유하기

- Docker Hub에 이미지를 공유할 수 있다.
- 공개는 무료이지만, 프라이빗일 경우에 1개만 공유할 수 있다.

## 이미지 가져오기

```docker
docker pull {이미지 이름}:{태그}
```