package com.sib.macju.dto.beer;

import com.sib.macju.domain.member.MemberRateBeer;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ResponseEvaluationDto {

    private int rate;
    private final List<String> aromaHashTags;
    private final List<String> flavorHashTags;

    public ResponseEvaluationDto(MemberRateBeer memberRateBeer) {
        rate = memberRateBeer.getRate();
        aromaHashTags = memberRateBeer
                .getRateHasAromaHashTags()
                .stream()
                .map(rateHasAromaHashTag ->
                        rateHasAromaHashTag.getAromaHashTag().getAroma()
                ).collect(Collectors.toList());

        flavorHashTags = memberRateBeer
                .getRateHasFlavorHashTags()
                .stream()
                .map(rateHasFlavorHashTag ->
                        rateHasFlavorHashTag.getFlavorHashTag().getFlavor()
                ).collect(Collectors.toList());
    }
}
