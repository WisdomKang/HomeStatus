# Server
Node.js사용하여 만든 서버 부분입니다.

처음 실행하려면  
`MongoDB` (테스트 환경은 4.0.9버젼입니다.)  
`Mosquitto` (테스트 환경은 1.4.15버젼입니다.)  
설치 후 실행!

시작하기~!
```npm
npm install     //필요한 라이브러리 설치
bower install   //FrontEnd 필요 라이브러리 설치
npm start       //서버 시작!
```


파일 트리
- Server
    - connProccess   (MQTT 연결, MongoDB 연결 모듈)
    - controllers    
    - model
    - routes         
    - views          (폴더별로 view구성 - html, js, css 파일)
    - asset          (이미지 파일폴더)

Server.js           시작스크립트  
LogModule.js        Log 설정!

