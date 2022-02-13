package com.sib.macju.controller.member;

import com.sib.macju.domain.member.Member;
import com.sib.macju.domain.member.Status;
import com.sib.macju.dto.beer.BeerVO;
import com.sib.macju.dto.beer.RateVO;
import com.sib.macju.dto.member.MemberVO;
import com.sib.macju.dto.post.PostVO;
import com.sib.macju.service.member.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/v1/member")
@CrossOrigin("*")
public class MemberController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private MemberService memberService;

    @GetMapping("/")
    public ResponseEntity<String> test(){
        return new ResponseEntity<>("Welcome",HttpStatus.OK);
    }

    @GetMapping("/validatenickname/{nickName}")
    public ResponseEntity<String> validateMemberNickName(@PathVariable("nickName") String nickName){
        System.out.println(nickName);
        int result = 0;
        result = memberService.vaildateMemberNickName(nickName);
        if(result == 1){
            //닉네임이 이미 사용중일 때
            return new ResponseEntity<>(FAIL, HttpStatus.OK);//NO_CONTENT
        }
        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody Member member){
        System.out.println(member);
        Map<String,Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.UNAUTHORIZED;
        HttpHeaders headers = new HttpHeaders();
        int result = 0;
        result = memberService.signUp(member);
        if(result == 1){
            status = HttpStatus.OK;
            Member resultMember = memberService.findByKakaoId(member.getKakaoId());
            resultMap.put("memberId", resultMember.getMemberId());
            resultMap.put("kakaoId", resultMember.getKakaoId());
            resultMap.put("result",SUCCESS);
            headers.set("memberId",resultMember.getMemberId()+"");
            headers.set("kakaoId",resultMember.getKakaoId()+"");
        }else{
            status = HttpStatus.BAD_REQUEST;
            resultMap.put("result", FAIL);
        }
        return new ResponseEntity<>(resultMap,headers,status);
        //여기로 넘어갈 일이 없다고 봄
        //save 명령을 쓰니깐 원래 있으면 업데이트가 일어날 것

    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<String> withdraw(@PathVariable Long memberId){
        Member member = memberService.findByMemberId(memberId);
        member.setStatus(Status.Deactivate);
        int result = memberService.updateProfile(member);
        if(result == 0){
            return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }

    @GetMapping("/profile/{memberId}")
    public ResponseEntity<Map<String, Object>> fetchProfile(@PathVariable Long memberId){
        Member member = memberService.findByMemberId(memberId);
        Map<String, Object> result = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        System.out.println(member.toString());
        if(member != null) {
            result.put("memberId", member.getMemberId());
            result.put("kakaoId", member.getKakaoId());
            result.put("age", member.getAge());
            result.put("grade", member.getGrade());
            result.put("name", member.getName());
            result.put("nickName", member.getNickName());
            result.put("profileColor", member.getProfileColor());
            result.put("status", member.getStatus());
            result.put("followings", fetchFollowings(memberId).getBody().get("data"));
            result.put("followers", fetchFollowers(memberId).getBody().get("data"));
            result.put("intro",member.getIntro());
            result.put("result",SUCCESS);
            status = HttpStatus.OK;
        }else{
            result.put("result",FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(result, status);
    }

    @GetMapping("/profile/color/{memberId}")
    public ResponseEntity<Map<String,Object>> fetchProfileColor(@PathVariable Long memberId){
        Member member = memberService.findByMemberId(memberId);
        HttpStatus status = HttpStatus.ACCEPTED;

        Map<String, Object> result = new HashMap<>();
        result.put("profileColor", member.getProfileColor());
        if(member != null){
            result.put("result",SUCCESS);
            status = HttpStatus.OK;
        }else {
            result.put("result",FAIL);
            status = HttpStatus.BAD_REQUEST;
        }
        return new ResponseEntity<>(result, status);
    }

    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(@RequestBody Member member){
        int result = memberService.updateProfile(member);

        if(result == 1){
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        }
        return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);

    }

    @GetMapping("/{memberId}/like/beer")
    public ResponseEntity<Map<String, Object>> fetchLikedBeer(@PathVariable Long memberId){
        Map<String, Object> result = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        List<BeerVO> data = memberService.fetchLikedBeer(memberId);
        if(data != null){
            result.put("result",SUCCESS);
            result.put("data",data);
            status = HttpStatus.OK;
        }else{
            result.put("result",FAIL);
            status = HttpStatus.NO_CONTENT;

        }

        return new ResponseEntity<>(result, status);
    }

    @PostMapping("/beer/{memberId}/like/{beerId}")
    public ResponseEntity<String> changeBeerLike(@PathVariable("memberId") Long memberId, @PathVariable("beerId") Long beerId){
        int result = 0;
        result = memberService.changeBeerLike(memberId, beerId);
        if(result == 1){
            return new ResponseEntity<>("Like", HttpStatus.OK);
        }else if(result == -1){
            return new ResponseEntity<>("UnLike", HttpStatus.OK);
        }
        return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{memberId}/like/post")
    public ResponseEntity<Map<String, Object>> fetchLikedPost(@PathVariable("memberId") Long memberId){
        Map<String, Object> result = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        List<PostVO> data = memberService.fetchLikedPost(memberId);
        if(data != null){
            result.put("result", SUCCESS);
            result.put("data", data);
            status = HttpStatus.OK;
        }else{
            result.put("result",FAIL);
            status = HttpStatus.NO_CONTENT;
        }

        return new ResponseEntity<>(result, status);
    }

    @GetMapping("/{memberId}/rates")
    public ResponseEntity<Map<String, Object>> fetchRatedBeer(@PathVariable("memberId") Long memberId){
        Map<String, Object> result = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        List<RateVO> data = memberService.fetchRatedBeer(memberId);
        result.put("data", data);

        return new ResponseEntity<>(result,status);
    }

    @PostMapping("/post/{memberId}/like/{postId}")
    public ResponseEntity<String> changePostLike(@PathVariable("memberId") Long memberId, @PathVariable("postId") Long postId){
        int result = 0;
        result = memberService.changePostLike(memberId, postId);
        if(result == 1){
            return new ResponseEntity<>("Like", HttpStatus.OK);
        }else if(result == -1){
            return new ResponseEntity<>("UnLike", HttpStatus.OK);
        }
        return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/{memberId}/follow/{followingMemberId}")
    public ResponseEntity<String> changeFollowing(@PathVariable("memberId") Long memberId, @PathVariable("followingMemberId") Long followingMemberId){


        if(memberId.equals(followingMemberId)){
            return new ResponseEntity<>(FAIL,HttpStatus.BAD_REQUEST);
        }else{
            //사용자가 다른 사용자를 팔로잉 하는 걸로 해야 함
            //해서 follow에는 사용자가 팔로잉할 사용자 Id를 넣고 following에는 현재 로그인한 사용자의 Id를 넣는다.
            //즉, memberId는 현재 로그인 한 사용자
            //followingMemberId는 memberId가 following할 사용자
            int result = 0;
            result = memberService.changeFollowing(memberId, followingMemberId);
            if(result == 1){
                return new ResponseEntity<>("follow", HttpStatus.OK);
            }else if(result == -1){
                return new ResponseEntity<>("unFollow", HttpStatus.OK);
            }
            return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);



        }

    }

    @GetMapping("/{memberId}/followings")
    public ResponseEntity<Map<String, Object>> fetchFollowings(@PathVariable("memberId") Long memberId){
        Map<String, Object> result = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        List<MemberVO> data = memberService.fetchFollowings(memberId);
        if(data != null){
            result.put("result", SUCCESS);
            result.put("data", data);
            status = HttpStatus.OK;
        }else{
            result.put("result",FAIL);
            status = HttpStatus.NO_CONTENT;
        }

        return new ResponseEntity<>(result, status);
    }

    @GetMapping("/{memberId}/followers")
    public ResponseEntity<Map<String, Object>> fetchFollowers(@PathVariable("memberId") Long memberId){
        Map<String, Object> result = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        List<MemberVO> data = memberService.fetchFollowers(memberId);
        if(data != null){
            result.put("result", SUCCESS);
            result.put("data", data);
            status = HttpStatus.OK;
        }else{
            result.put("result",FAIL);
            status = HttpStatus.NO_CONTENT;
        }

        return new ResponseEntity<>(result, status);
    }


}
