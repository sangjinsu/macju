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
@Table(name = "beer")
public class Beer {

    @Id
    @Column(name = "beer_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long beerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "beer_type_id")
    private BeerType beerType;

    @Column(unique = true, nullable = false)
    private String name;

    private String content;

    private Double volume;

    @Column(name = "english_name", unique = true, nullable = false)
    private String englishName;

    @OneToMany(mappedBy = "beer", cascade = CascadeType.ALL)
    private List<MemberRateBeer> memberRateBeers = new ArrayList<>();

}
