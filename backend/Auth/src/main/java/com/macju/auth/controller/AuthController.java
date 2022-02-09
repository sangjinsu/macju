package com.macju.auth.controller;

import com.macju.auth.domain.Member;
import com.macju.auth.dto.LoginResult;
import com.macju.auth.dto.RequestCode;
import com.macju.auth.dto.TokenInfo;
import com.macju.auth.dto.TokenResponse;
import com.macju.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/oauth")
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
        result.put("member",loginResult.getMember());
        result.put("first_check",loginResult.isFirstCheck());
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @PostMapping("/access/check")
    public Map<String, Object> accessTokenCheck (@RequestBody TokenInfo tokenInfo){
        System.out.println("accessCheck in");
        Map<String, Object> result = new HashMap<>();
        System.out.println(tokenInfo.toString());

        String decodingToken = authService.decoding(tokenInfo.getAccessToken());
        Member member = null;
        try {
            member = authService.checkUser(decodingToken);
        } catch (IOException e) {
            e.printStackTrace();
            result.put("result",FAIL);
        }
        if (authService.isIn(member.getKakaoMemberId())){
            //서비스 사용 가능한 회원
            result.put("result",SUCCESS);
            result.put("kakaoId",member.getKakaoMemberId());
        }else{
            result.put("result",FAIL);
        }

        return result;
    }



}
