package com.sib.macju.domain.beer;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "beer_type")
public class BeerType {

    @Id
    @Column(name = "beer_type_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long beerTypeId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BeerENMainType en_main;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BeerKOMainType ko_main;

    private String ko_detail;

    private String en_detail;


}
