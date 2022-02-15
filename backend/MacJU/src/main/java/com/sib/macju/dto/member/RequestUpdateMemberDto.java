package com.sib.macju.dto.member;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class RequestUpdateMemberDto implements Serializable {
    private final Long memberId;
    private final String nickName;
    private final String intro;
    private final List<Long> aromas;
    private final List<Long> flavors;
}
