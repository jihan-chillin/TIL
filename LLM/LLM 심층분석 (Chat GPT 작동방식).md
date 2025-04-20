> [ChatGPT의 작동 원리 이해하기](https://youtu.be/6PTCwRRUHjE?si=RNLS1Oc2ro7rfcqv) 영상을 시청하며 학습한 내용을 아이패드로 필기해 정리했습니다.
> - ChatGPT를 비롯한 대형 언어 모델(LLM)의 내부 작동 방식 이해
> - Transformer 구조 및 작동 흐름에 대한 개념 정리


## 1. Pre-Training
![1.1 인터넷 데이터 다운로드](./images/IMG_0913.PNG)
![1.2 인터넷 데이터 다운로드](./images/IMG_0914.PNG)
![1.3 Tokenizer](./images/IMG_0915.PNG)
![1.4 신경망 학습](./images/IMG_0916.PNG)
![1.5 추론](./images/IMG_0917.PNG)
![1.6 비용감축](./images/IMG_0918.PNG)
![1.7 Pretraining을 알아야 프롬프트를 잘 짤 수 있음 1](./images/IMG_0919.PNG)
![1.8 Pretraining을 알아야 프롬프트를 잘 짤 수 있음 2](./images/IMG_0920.PNG)

## 2. Post-Training
![2.1 conversations](./images/IMG_0921.PNG)
![2.2 환각현상 (Hallucination)](./images/IMG_0922.PNG)
![2.3 자기인식 (Knowledge of self)과 Fine-Tuning을 위한 페르소나](./images/IMG_0923.PNG)
![2.4 단방향 토큰시퀀스 처리방식과 Tool 사용 시 신뢰도의 변화](./images/IMG_0924.PNG)
![2.5 Tool 사용시 신뢰도의 변화와 이유 - 모델의 동작방식](./images/IMG_0925.PNG)


## 3. SFT Model (Supervised Fine Tuning)
사실상 얘도 post-training의 일환이긴 함.
![3.1 SFT Model](./images/IMG_0926.PNG)
![3.2 RLHF 기법](./images/IMG_0927.PNG)
