package com.macju.auth.dto;

import com.macju.auth.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResult {

    private Member member;
    private boolean firstCheck;//첫 로그인이면 true가 돼서 프론트에서

}
