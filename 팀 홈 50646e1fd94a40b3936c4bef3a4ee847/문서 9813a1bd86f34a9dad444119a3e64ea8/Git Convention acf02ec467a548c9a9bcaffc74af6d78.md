# Git Convention

Created: 2022년 1월 10일 오후 1:50
Last Edited Time: 2022년 1월 13일 오후 5:27
Status: Archived
날짜: 2022년 1월 10일
상태: 완료 🙌

## 브랜치 이름

{type}/{issue number}-{간단한 이슈 설명}

```jsx
feat/26-create-function 
```

# 커밋

## 커밋 메시지

{type}: {설명}

```jsx
doc: update README
```

## 타입(추가 가능)

- feat : 새로운 기능 추가 및 수정
- fix : 버그 픽스
- build : 빌드 관련 파일 수정 ex) npm, yarn
- ci : CI 설정 파일 변경
- doc : 문서 변경
- style : 코드 구문과 관련 없는 부분 ex) 띄어쓰기, 세미콜론
- refactor : 리팩토링 관련 수정
- test : 테스트 생성 및 수정
- pref : 성능 향상 관련 코드 수정

## subject

- **왜 무엇을** 바꾸었는지 과거 코드와 비교해 현재 시제로 작성

## footer

- Breaking Changes 정보를 적는 공간, Breaking Changes는
- 닫히는 GitHub 이슈 번호를 적음