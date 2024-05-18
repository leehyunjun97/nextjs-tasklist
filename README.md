
## 참고 예제
[nextjs tasklist 예제](https://youtu.be/5mAgMFNhTBY?si=P8OaXvUxAvl39Qe8) <br />
유튜버 개발하는 정대리님의 nextjs와 파이어베이스를 사용하여 할일 관리 앱 만들기 <br /><br />

## 추가사항
1. 파이어베이스 대신 prisma db를 사용하여 만들어보기
2. jwt를 통해 토큰을 이용하여 사용자 인증 및 정보 관리, 제공
3. 회원가입 form vaildation 활성화
4. routing이나 api 호출 할 시 intercept해 인증해보기 (middleware, axios)
5. 개개인의 할일 관리 목록 만들어보기
<br />

## 구현
1. jwt 토큰 라이브러리 ``jose`` 사용
2. 로그인, 회원가입 시 ``accessToken`` ``refreshToken`` 생성 및 쿠키에 저장
3. ``/todos`` 페이지 이동 및 관련 api 호출 시 ``http header``에 토큰을 담아 전송
4. ``token vaild 함수``를 통해 ``Authorization`` 체크
5. 응답 받은 ``status``를 체크해 재발급 해줄 지 삭제할 지 결정

## 사용법
#### 1. git clone
#### 2. 상위 루트에 .env 파일 추가 <br />
```
BASE_URL="http://localhost:3000"
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
SECRET_KEY="secretkeyanything"
JWT_ISSUER="tasklist:issuer"
JWT_AUDIENCE="tasklist:audience"
```

#### 3. vscode 터미널 두 개로 next와 prisma db 실행 <br />
```
yarn dev
npx prisma studio
```

#### 4. localhost 접속 
- 앱 페이지 3000
- DB studio 5555

#### 5. 로그인, 홈(/) 페이지, taskList(/todos) 페이지 사용


<br />
