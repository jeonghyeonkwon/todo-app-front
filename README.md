# 스터디 TODO Front-end[미완성] (21-05-09기준)
[백엔드 (Spring-boot)](https://github.com/jeonghyeonkwon/todo-app-back)

## 실행
yarn start

## 주요 기술
react, redux-saga, material-ui

## URI 정리
path|query string|내용|완성 여부|추가할 내용(설명)|
---|---|---|---|---|
/|X|홈|완성|스터디, 질문 게시판 리스트,많이 검색한 내용 기술을 순위 출력|
/login|X|로그인|완성|X|
/register|X|회원가입|완성|X|
/todo|X|TODO|진행중|TODO 카드의 자세한 내용 and 많은 양의 카드를 페이징 처리|
/study|X|스터디 카테고리|완성|X|
/study/:type|현재 X|유형별 스터디 카테고리|완성||
/study/:type/write|X|게시글 작성|완성|기술 분야와 내용들을 입력하여 글을 씁니다.|
/study/board/:number|X|게시글 자세히 보기|완성|현재 사용자가 글쓴이이면 인원이 모집 완료로 마감을 할 수 있음, 댓글 작성 및 출력|
/qna, /stduy/:type, /study/board/:number|X|질문 게시판 내용들|진행중|삭제 기능 추가 예정|
/myinfo|X|회원 정보수정,탈퇴|진행중|회원 탈퇴 기능 예정|
아이디 비밀번호 찾기|예정|예정|미완성|예정|

## 현재 상황(이미지)

### 홈(/)
![todo 홈화면](https://user-images.githubusercontent.com/38342219/116660164-98178480-a9cd-11eb-8f0d-6c6cb7913c2e.PNG)



### 로그인(/login)
![로그인](https://user-images.githubusercontent.com/38342219/113385091-60afbb00-93c2-11eb-9f80-30ec42b12d22.PNG)

### 회원가입(/register)
![회원가입](https://user-images.githubusercontent.com/38342219/113385250-b71cf980-93c2-11eb-9ab0-b1fb37555b84.PNG)

### todo(/todo)
![todo 추가](https://user-images.githubusercontent.com/38342219/113385618-6b1e8480-93c3-11eb-9a0b-b3bba785930b.PNG)
목표 날짜와 현재 날짜를 서버에서 비교하여 진행중, 오늘 마감, 실패를 리스트로 받습니다.
![todo ing](https://user-images.githubusercontent.com/38342219/117573685-4e891100-b114-11eb-9f29-fb70ffa3e5aa.PNG)
![todo failurePNG](https://user-images.githubusercontent.com/38342219/117573631-fce08680-b113-11eb-9f56-3b6130b5a447.PNG)
![todo success](https://user-images.githubusercontent.com/38342219/117573637-010ca400-b114-11eb-8e33-427d6b6aa687.PNG)
![진행중 성공 체크](https://user-images.githubusercontent.com/38342219/117573735-9314ac80-b114-11eb-8574-4fa9f55855b9.PNG)
![성공 자세히](https://user-images.githubusercontent.com/38342219/117573736-96a83380-b114-11eb-83f8-1694542281d5.PNG)


### study 홈(/study,/qna)
![todo 게시판 section](https://user-images.githubusercontent.com/38342219/116660244-b5e4e980-a9cd-11eb-9e88-13566a34590d.png)

### study 리스트(/study/:type)
![todo study 게시판](https://user-images.githubusercontent.com/38342219/116660977-b6ca4b00-a9ce-11eb-8b38-12b69b184db9.PNG)


### study 글쓰기(/study/:type/write)
![게시글 작성](https://user-images.githubusercontent.com/38342219/113386036-4d9dea80-93c4-11eb-8c03-24dd609b5b44.PNG)
기술 분야를 1~2개 까지 지정할 수 있습니다.

### 게시글 자세히(/study/:id)
![내 게시글](https://user-images.githubusercontent.com/38342219/113385830-d9fbdd80-93c3-11eb-8414-e383545891fc.PNG)
![다른사람 게시글](https://user-images.githubusercontent.com/38342219/113385836-dbc5a100-93c3-11eb-8bbc-c4b1a3b8e62e.PNG)

### 게시글 댓글 페이징
![댓글 페이징](https://user-images.githubusercontent.com/38342219/116662533-d6fb0980-a9d0-11eb-9427-c1abc79cb308.PNG)

### qna 리스트(/qna/:type)
![qna 리스트](https://user-images.githubusercontent.com/38342219/116662598-f134e780-a9d0-11eb-8647-a92a4f6ba1b6.PNG)

### 회원정보수정, 탈퇴(/myinfo)
![todo 회원정보수정](https://user-images.githubusercontent.com/38342219/116666675-33145c80-a9d6-11eb-98c9-7b457a97a55a.PNG)



