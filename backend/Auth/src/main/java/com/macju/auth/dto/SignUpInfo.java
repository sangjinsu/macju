package com.macju.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpInfo {

    private String kakaoId;
    private String memberId;
    private String accessToken;

}
