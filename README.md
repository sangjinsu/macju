# MacJU

## 맥주 큐레이팅 SNS

### BACKEND

#### URL

- 비즈니스 로직 서버
  - http://i6c107.p.ssafy.io:8080/swagger-ui/index.html
- 랭킹 서버
  - http://i6c107.p.ssafy.io:8081/swagger-ui/index.html
- Log ELK Kibana
  - http://i6c107.p.ssafy.io:5601/

- Search ELK Kibana
  - http://i6c107.p.ssafy.io:5602/

#### 아키텍처 설계도

![img](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f0c33412-baeb-4d5c-ab03-0bf67c9029ed/Untitled.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220217%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220217T190938Z&X-Amz-Expires=86400&X-Amz-Signature=ed62d1edf7491deac328a34e2ea825c563e90924fb288b96065b04ba57d318b6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.jpeg%22&x-id=GetObject)

#### 로그인 과정

![image-20220218041150965](README.assets/image-20220218041150965.png)

#### 포트 번호

![img](README.assets/qw9B4knMR8l1iMRXNW6RKTiJvPxfOW1U6ooEXVAfnznQyKCgbkkkocJrE5EaXc0ZSHln_DHTlRWDHxOXi435QbuKu_jaxn6RZG8AEOP-drTpmPkBpo5hd5n20yWntiR0f2Pjo60sShVM.png)



---

### Frontend

### - Login(웹)

- 카카오 소셜 로그인

<img src="README.assets/image-20220217141702060.png" alt="image-20220217141702060" style="zoom: 50%;" />

* 회원가입

<img src="README.assets/image-20220218015806905.png" alt="image-20220218015806905" style="zoom: 33%;" />



> 카카오 로그인을 통해 서비스에 로그인할 수 있으며, 회원가입할때 활동할때 보일 닉네임과 이름, 나이를 입력받는다. 



### -MainPage(웹/모바일)

* Best 맥주 - 가장 인기 많은 맥주
* Recommend 맥주 - 개인별 추천 알고리즘으로 4개의 맥주 추천
* Hot 포스트 - 가장 인기 많은 포스트

<img src="README.assets/image-20220218025955791.png" alt="image-20220218025955791" style="zoom: 33%;" /><img src="README.assets/image-20220218030017647.png" alt="image-20220218030017647" style="zoom:50%;" /><img src="README.assets/image-20220218030114574.png" alt="image-20220218030114574" style="zoom:67%;" />



> Carousel 형식으로 넘어간다. 배경에는 맥주거품과 같은 거품이 올라가는 애니메이션이 있다.



### - Beer List (웹/모바일)

- 맥주 사진 (firebase), 정보(DB)
- 맥주 종류별로 구분된 카드 정렬
- Infinite Scroll

​		<img src="README.assets/image-20220217125849925.png" alt="image-20220217125849925" style="zoom: 35%;" /><img src="README.assets/image-20220218021014518.png" alt="image-20220218021014518" style="zoom: 50%;" />



> Ale, Lager, Radler를 누르면 해당 맥주만 볼 수 있다. 
> 맥주카드 전체 어디든 누르면 맥주 Detail 페이지로 넘어간다.



### - Beer Details(모바일)

* 맥주 좋아요, 평점
* 맥주 설명 (도수, 설명, 맛과 향 태그들)
* 맥주별 포스트 목록 (포스팅 하기)

​										<img src="README.assets/image-20220218021533492.png" alt="image-20220218021533492" style="zoom: 50%;" />				<img src="README.assets/image-20220218021625786.png" alt="image-20220218021625786" style="zoom:50%;" />



> 맥주를 좋아요할 수 있고, 평가할 수 있다. 포스팅을 할 수 있고, 맥주별 포스트들의 목록도 조회가 가능하다.



### - Post Create(모바일/웹)

​							<img src="README.assets/image-20220218023218102.png" alt="image-20220218023218102" style="zoom: 50%;" />	<img src="README.assets/image-20220218023205939.png" alt="image-20220218023205939" style="zoom: 33%;" />



> 맥주별로 포스트 작성이 가능하다. 원하는 해시태그를 추가할 수 있고, 사진은 여러장 올릴 수 있다.



### - Post List (웹/모바일)

* 포스트 사진, 내용, 작성자, 작성날짜, 좋아요 수

<img src="README.assets/image-20220217130411940.png" alt="image-20220217130411940" style="zoom: 50%;" />



<img src="README.assets/image-20220218021246670.png" alt="image-20220218021246670" style="zoom:67%;" />



> 포스트의 전체 목록을 최신순으로 조회할 수 있다. 포스트를 누르면 각 포스트 상세페이지로 넘어간다.



### - Post Detail (웹/모바일)

* 포스트 사진 Carousel 형식으로 여러장 가능
* 포스트 좋아요
* 포스트가 작성된 맥주 바로가기 기능
* 포스트 작성한 유저 프로필로 바로가기 기능
* 포스트별 댓글달기

<img src="README.assets/image-20220217130457207.png" alt="image-20220217130457207" style="zoom:33%;" />



​					<img src="README.assets/image-20220218022659578.png" alt="image-20220218022659578" style="zoom:50%;" />

​	<img src="README.assets/image-20220218022725876.png" alt="image-20220218022725876" style="zoom:50%;" />	<img src="README.assets/image-20220218023346076.png" alt="image-20220218023346076" style="zoom:50%;" />

> 포스트디테일 사진은 fade 되는 carousel 형태이다. 포스트수정삭제는 본인만 가능하다.
> 댓글작성이 가능하며, 본인이 쓴 댓글만 삭제 가능하다. 댓글목록은 pagination으로 구현하였다.



### - Profile(웹/모바일)

- 프로필 페이지 
  - 아이콘, 닉네임, 회원정보 수정
  - 팔로우, 팔로잉
  - 한줄소개
  - 자신이아닌 다른 유저 프로필 -> 팔로우/언팔로우 버튼

​			<img src="README.assets/image-20220217130703084.png" alt="image-20220217130703084" style="zoom: 50%;" /><img src="README.assets/image-20220217130709579.png" alt="image-20220217130709579" style="zoom: 67%;" />



### - Profile 수정(웹/모바일)

* 닉네임, 한줄소개 변경 
* 개인별 맥주 취향 설정 (맛, 향 기준) 

​		<img src="README.assets/image-20220218030338098.png" alt="image-20220218030338098" style="zoom:33%;" />	<img src="README.assets/image-20220218030322714.png" alt="image-20220218030322714" style="zoom:67%;" />



### - User Posts(웹/모바일)

* 유저별 포스트 목록

<img src="README.assets/image-20220217144853310.png" alt="image-20220217144853310" style="zoom: 40%;" /><img src="README.assets/image-20220217144924229.png" alt="image-20220217144924229" style="zoom: 67%;" />



### - User Review(웹/모바일)

* 맥주이름, 맥주의 평균평점, 유저가 평가한 평점

![image-20220217131003484](README.assets/image-20220217131003484.png)



<img src="README.assets/image-20220217131015117.png" alt="image-20220217131015117" style="zoom:67%;" />



### - UserLike (웹/모바일)

* 유저가 좋아한 맥주들

<img src="README.assets/image-20220217131409040.png" alt="image-20220217131409040" style="zoom:67%;" />



<img src="README.assets/image-20220217131339383.png" alt="image-20220217131339383" style="zoom:67%;" />





### - Null UserData

* 유저가 좋아한 맥주가 없을 시 보임

![image-20220217130818869](README.assets/image-20220217130818869.png)





### - Follow(모달/웹/모바일)

<img src="README.assets/image-20220217131829895.png" alt="image-20220217131829895" style="zoom:50%;" />



<img src="README.assets/image-20220217131903828.png" alt="image-20220217131903828" style="zoom:50%;" />



<img src="README.assets/image-20220217131922820.png" alt="image-20220217131922820" style="zoom:50%;" />



> 유저들끼리 서로 팔로우를 할 수 있습니다. 다른유저의 팔로워, 팔로잉한 사람들을 볼 수 있습니다.



### - Search

![image-20220217145004077](README.assets/image-20220217145004077.png)



* 통합검색기능
* 맥주이름, 맛, 향, 맥주종류, 유저해시태그 검색 가능

![image-20220217145024082](README.assets/image-20220217145024082.png)



> 향 검색 시 향의 갯수가 표시됨



### - Search Result page(웹/모바일)

<img src="README.assets/image-20220217145043198.png" alt="image-20220217145043198" style="zoom:67%;" />



<img src="README.assets/image-20220217145057739.png" alt="image-20220217145057739" style="zoom:67%;" />





### - NavBar 

* 로그인했을때는 로그아웃이 보이고, 로그인안했을 떄는 로그인이 보임
* home, beer, posts

![image-20220217145217406](README.assets/image-20220217145217406.png)







