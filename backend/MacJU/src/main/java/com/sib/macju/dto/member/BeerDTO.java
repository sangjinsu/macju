package com.sib.macju.dto.member;

import com.sib.macju.domain.beer.BeerType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BeerDTO {

    private Long beerId;

    private String beerType;

    private String beerName;

    private String englishName;

    private String content;

    private Double volume;

    private String photoPath;

}
