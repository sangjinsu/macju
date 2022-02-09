package com.macju.auth.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.macju.auth.domain.Member;
import com.macju.auth.dto.LoginResult;
import com.macju.auth.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

@Service
public class AuthService {

    @Autowired
    private MemberRepository memberRepository;

    public LoginResult getKakaoAccessToken(String code){
        System.out.println("Auth SUCCESS");

        LoginResult loginResult = new LoginResult();

        String redirect_uri= "http://localhost:8752/oauth/login/response";
        redirect_uri = "http://i6c107.p.ssafy.io:8752/oauth/login/response";
        String client_id = "5832f41d4634b598305eaa378a104b94";
        String client_secret = "5nGoaHLznYd2N3tIE2UvKX0x0TDm8T6B";

        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {

            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id="+client_id);
            sb.append("&redirect_uri="+redirect_uri); // 앞에서 인가코드 받은 redirect_uri 입력
            sb.append("&code=" + code);
            sb.append("&client_secret="+client_secret);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        }
        catch (IOException e){
            e.printStackTrace();
        }

//        loginResult.setAccessToken(encoding(access_Token));
        String encodingToken = encoding(access_Token);
        Member member = null;
        try {
            member = checkUser(access_Token);
        } catch (IOException e) {

            e.printStackTrace();
            return loginResult;
        }
        loginResult.setMember(member);
        loginResult.getMember().setAccessToken(encodingToken);//반환해줄 토큰에는 인코딩한 토큰으로 바꿔주기
//        boolean flag = isIn(member.getKakaoMemberId());
//        System.out.println(flag);
        loginResult.setFirstCheck(!memberRepository.existsById(member.getKakaoMemberId()));
        //TODO checkUser를 통해 레디스에 값이 있으면(반환이 true) false를 넣어서 처음 들어오는 사용자가 아님을 표시
        System.out.println(loginResult.toString());
        save(member, access_Token, refresh_Token);
        System.out.println(loginResult.toString());
        return loginResult;
    }

    public void save(Member member,String access_token ,String refresh_token){
        Member copy = new Member();
        copy.setAccessToken(access_token);
        copy.setRefreshToken(refresh_token);
        copy.setKakaoMemberId(member.getKakaoMemberId());
        copy.setNickName(member.getNickName());
        copy.setEmail(member.getEmail());
        System.out.println(copy.getAccessToken());
        memberRepository.save(copy);

    }

    public Member checkUser(String accessToken) throws IOException{
        //accessToken을 받아 카카오에 사용자 정보를 불러옴

        Member member = new Member();

        String reqURL = "https://kapi.kakao.com/v2/user/me";
        long id= -1;
//        try {
        URL url = new URL(reqURL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        conn.setRequestProperty("Authorization", "Bearer " + accessToken);

        int responseCode = conn.getResponseCode();
        System.out.println("responseCode : " + responseCode);

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line = "";
        String result = "";

        while ((line = br.readLine()) != null) {
            result += line;
        }
        System.out.println("response body : " + result);

        //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(result);

        id = element.getAsJsonObject().get("id").getAsLong();
        String nickName = element.getAsJsonObject().get("properties").getAsJsonObject().get("nickname").getAsString();
        String email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
        System.out.println(nickName+"                "+email);
        member.setKakaoMemberId(id+"");
        member.setAccessToken(accessToken);
        member.setEmail(email);
        member.setNickName(nickName);
//        }catch (IOException e) {
//            e.printStackTrace();
//        }



        return member;
    }

    public boolean isIn(String kakaoMemberId){

        //대충 레디스에서 id로 찾는 내용
        //레디스에서 id가 있으면 true;
//        if(memberRepository.findById(kakaoMemberId) != null || !memberRepository.findById(kakaoMemberId).isPresent()) {
//            System.out.println(memberRepository.findById(kakaoMemberId));
//            return true;
//        }else{
//            System.out.println("Not Content");
//            return false;
//        }

//        return memberRepository.findById(kakaoMemberId).equals(null) ? false : true;
        return memberRepository.existsById(kakaoMemberId);//로 축약함.
    }


    public String encoding(String accessToken){
        //임시 암호화?
        return "ssa" + accessToken +"fy";
    }

    public String decoding(String accessToken){
        return accessToken.substring(3,accessToken.length()-2);
    }

}
