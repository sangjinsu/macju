package com.macju.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenInfo {

    private String kakaoId;

    private String accessToken;

//    private String checkResult;//fail, success

}
