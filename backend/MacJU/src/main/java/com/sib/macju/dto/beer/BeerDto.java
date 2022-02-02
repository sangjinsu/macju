package com.sib.macju.dto.beer;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.beer.BeerMainType;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class BeerDto implements Serializable {
    private final Long beerId;
    private final BeerTypeDto beerType;
    private final String name;
    private final String englishName;
    private final String content;
    private final Double volume;
    private final String photoPath;
    private final List<String> aromaHashTags;
    private final List<String> flavorHashTags;

    @Data
    public static class BeerTypeDto implements Serializable {
        private final BeerMainType main;
        private final String detail;
    }

    public BeerDto(Beer beer) {
        beerId = beer.getBeerId();
        beerType = new BeerTypeDto(beer.getBeerType().getMain(), beer.getBeerType().getDetail());
        name = beer.getName();
        englishName = beer.getEnglishName();
        content = beer.getContent();
        volume = beer.getVolume();
        photoPath = beer.getPhotoPath();

        aromaHashTags = beer.getBeerHasAromaHashTags()
                .stream()
                .map(beerHasAromaHashTag ->
                        beerHasAromaHashTag.getAromaHashTag().getAroma()
                ).collect(Collectors.toList());

        flavorHashTags = beer.getBeerHasFlavorHashTags()
                .stream()
                .map(beerHasFlavorHashTag ->
                        beerHasFlavorHashTag.getFlavorHashTag().getFlavor()
                ).collect(Collectors.toList());
    }
}
