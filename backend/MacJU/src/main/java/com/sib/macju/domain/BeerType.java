package com.sib.macju.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "beer_type")
public class BeerType {

    @Id
    @Column(name = "beer_type_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long beerTypeId;

    @Column(nullable = false)
    private BeerMainType main;

    private String detail;

    @OneToMany(mappedBy = "beerType", cascade = CascadeType.ALL)
    private List<Beer> beers = new ArrayList<>();
}
