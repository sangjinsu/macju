package com.macju.auth.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@RedisHash("Member")
@AllArgsConstructor
@NoArgsConstructor
public class Member{

    @Id
    private String kakaoMemberId;

    private String accessToken;

    private String refreshToken;

    private String nickName;

    private String email;


}
