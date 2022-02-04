package com.macju.ranking.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class BeerVo implements Serializable {
    private final Long beerId;

    public BeerVo(BeerView beer) {
        this.beerId = beer.getBeerId();
    }

    public BeerVo(BeerLike beer) {
        this.beerId = beer.getBeerId();
    }
}
