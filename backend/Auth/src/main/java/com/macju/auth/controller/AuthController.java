package com.macju.auth.controller;

import com.macju.auth.domain.Member;
import com.macju.auth.dto.*;
import com.macju.auth.service.AuthService;
import com.nimbusds.oauth2.sdk.token.AccessToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/oauth")
@CrossOrigin("*")
public class AuthController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    private AuthService authService;



    @GetMapping("/")
    public ResponseEntity<String> test(){
        System.out.println("hi");
        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public HttpStatus signUp(@RequestBody SignUpInfo signUpInfo){
        System.out.println(signUpInfo.toString());
        HttpStatus status = HttpStatus.ACCEPTED;
        signUpInfo.setAccessToken(authService.decoding(signUpInfo.getAccessToken()));
        boolean result = authService.signUp(signUpInfo);
        if(result){
            status = HttpStatus.OK;
        }else{
            status = HttpStatus.BAD_REQUEST;
        }




        return status;
    }

    @GetMapping("/login/response")
    public ResponseEntity<Map<String, Object>> loginResponse(@RequestParam String code){
        System.out.println("GetMapping");
        System.out.println(code);
        Map<String, Object> result = new HashMap<>();
        LoginResult loginResult = null;
        if(code == null){
            result.put("result",FAIL);
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }else{

            loginResult = authService.getKakaoAccessToken(code);
            if (loginResult == null){
                result.put("result",FAIL);
                return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
            }

        }
        result.put("result", SUCCESS);
        result.put("memberId",loginResult.getMember().getMemberId());
        result.put("kakaoId",loginResult.getMember().getKakaoId());
        result.put("AccessToken",loginResult.getMember().getAccessToken());
        result.put("first_check",loginResult.isFirstCheck());
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @PostMapping("/access/check")
    public ResponseEntity<Map<String, Object>> accessTokenCheck (@RequestBody TokenInfo tokenInfo){
        System.out.println("accessCheck in");
        Map<String, Object> result = new HashMap<>();
        System.out.println(tokenInfo.toString());
        HttpStatus status = HttpStatus.ACCEPTED;
        String decodingToken = authService.decoding(tokenInfo.getAccessToken());
        Member member = null;
        try {
            member = authService.checkUser(decodingToken);
            System.out.println(member.getKakaoId());
            if (authService.isIn(member.getKakaoId())){
                //서비스 사용 가능한 회원
                System.out.println("access check");
                result.put("result",SUCCESS);
                result.put("kakaoId",member.getKakaoId());
//                status = HttpStatus.OK;
            }else{
                result.put("result",FAIL);
//                status = HttpStatus.UNAUTHORIZED;
            }
        } catch (IOException e) {
//            e.printStackTrace();
            System.out.println("exception");
            result.put("result","EXCEPTION");
//            status = HttpStatus.FORBIDDEN;
        }


        return new ResponseEntity<>(result,HttpStatus.OK);
    }



}
