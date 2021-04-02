# 스터디 TODO Front-end[미완성] (21-04-02기준)
[백엔드 (Spring-boot)](https://github.com/jeonghyeonkwon/todo-app-back)

## 실행
yarn start

## 주요 기술
react, redux-saga, material-ui

## URI 정리
path|query string|내용|완성 여부|추가할 내용(설명)|
---|---|---|---|---|
/|X|홈|미완성|스터디, 질문 게시판 리스트,많이 검색한 기술의 순위를 리스트로 출력할 예정|
/login|X|로그인|완성|X|
/register|X|회원가입|완성|X|
/todo|X|TODO|진행중|TODO 카드의 자세한 내용 and 많은 양의 카드를 페이징 처리|
/study|X|스터디 카테고리|완성|X|
/study/:type|현재 X|유형별 스터디 카테고리|보완 필요|현재 서버에 page를 query string 으로 호출은 함. front에서도 page를 query string으로 나타내도록 보완 예정, 지역별 리스트를 볼수 있도록 할 예정|
/study/:type/write|X|게시글 작성|기술 분야와 내용들을 입력하여 글을 씁니다.|
/study/board/:number|X|게시글 자세히 보기|완성|현재 사용자가 글쓴이이면 인원이 모집 완료로 마감을 할 수 있음, 댓글 작성 및 출력|
/qna, /stduy/:type, /study/board/:number|X|질문 게시판 내용들|미완성|스터디 게시판과 비슷하나 모집인원 등의 내용을 제외하므로 컴포넌트 재사용 하도록 리팩토링 예정|
회원 정보 수정, 회원 탈퇴, 아이디 비밀번호 찾기|예정|예정|미완성|예정|

## 현재 상황(이미지)

### 홈(/)
![홈화면](https://user-images.githubusercontent.com/38342219/113385033-407ffc00-93c2-11eb-933c-42939d76026b.PNG)

### 로그인(/login)
![로그인](https://user-images.githubusercontent.com/38342219/113385091-60afbb00-93c2-11eb-9f80-30ec42b12d22.PNG)

### 회원가입(/register)
![회원가입](https://user-images.githubusercontent.com/38342219/113385250-b71cf980-93c2-11eb-9ab0-b1fb37555b84.PNG)

### todo(/todo)
![todo 홈화면](https://user-images.githubusercontent.com/38342219/113385611-68239400-93c3-11eb-899c-8552f72f967f.PNG)
![todo 추가](https://user-images.githubusercontent.com/38342219/113385618-6b1e8480-93c3-11eb-9a0b-b3bba785930b.PNG)
목표 날짜와 현재 날짜를 서버에서 비교하여 진행중, 오늘 마감, 실패를 리스트로 받습니다.
![todo 실패](https://user-images.githubusercontent.com/38342219/113385723-a456f480-93c3-11eb-9a59-b62e5dbcd238.PNG)

### study 홈(/study)
![스터디or질문게시판 홈](https://user-images.githubusercontent.com/38342219/113385747-b173e380-93c3-11eb-9b6c-fa54e3125784.png)

### study 리스트(/study/:type)
![스터디 리스트](https://user-images.githubusercontent.com/38342219/113385788-c486b380-93c3-11eb-882b-74af4707adee.PNG)

### study 글쓰기(/study/:type/write)
![게시글 작성](https://user-images.githubusercontent.com/38342219/113386036-4d9dea80-93c4-11eb-8c03-24dd609b5b44.PNG)
기술 분야를 1~2개 까지 지정할 수 있습니다.

### 게시글 자세히(/study/:id)
![내 게시글](https://user-images.githubusercontent.com/38342219/113385830-d9fbdd80-93c3-11eb-8414-e383545891fc.PNG)
![다른사람 게시글](https://user-images.githubusercontent.com/38342219/113385836-dbc5a100-93c3-11eb-8bbc-c4b1a3b8e62e.PNG)



