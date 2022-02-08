package com.sib.macju.dto.beer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RateVO {

    private BeerDto beer;//맥주 데이터

    private int rate;//사용자가 맥주 평가한 점수

}
