package com.sib.macju.dto.member;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class RequestUpdateMemberDto implements Serializable {
    private Long memberId;
    private String nickName;
    private String intro;
    private List<Long> aromas;
    private List<Long> flavors;
}
