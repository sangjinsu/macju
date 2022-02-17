package com.sib.macju.dto.beer;

import com.sib.macju.domain.hashtag.AromaHashTag;
import com.sib.macju.domain.hashtag.FlavorHashTag;
import com.sib.macju.domain.member.MemberRateBeer;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ResponseEvaluationDto {

    private int rate;
    private final List<AromaHashTagDto> aromaHashTags;
    private final List<FlavorHashTagDto> flavorHashTags;

    @Data
    public static class AromaHashTagDto implements Serializable {
        private final Long id;
        private final String aroma;
    }

    @Data
    public static class FlavorHashTagDto implements Serializable {
        private final Long id;
        private final String flavor;
    }

    public ResponseEvaluationDto(MemberRateBeer memberRateBeer) {
        rate = memberRateBeer.getRate();
        aromaHashTags = memberRateBeer
                .getRateHasAromaHashTags()
                .stream()
                .map(rateHasAromaHashTag -> {
                    AromaHashTag aromaHashTag = rateHasAromaHashTag.getAromaHashTag();
                    return new AromaHashTagDto(
                            aromaHashTag.getAromaHashTagId(),
                            aromaHashTag.getAroma());
                }).collect(Collectors.toList());

        flavorHashTags = memberRateBeer
                .getRateHasFlavorHashTags()
                .stream()
                .map(rateHasFlavorHashTag -> {
                    FlavorHashTag flavorHashTag = rateHasFlavorHashTag.getFlavorHashTag();
                    return new FlavorHashTagDto(
                            flavorHashTag.getFlavorHashTagId(),
                            flavorHashTag.getFlavor());
                }).collect(Collectors.toList());
    }
}
