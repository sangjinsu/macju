package com.sib.macju.domain.beer;


import com.sib.macju.domain.hashtag.FlavorHashTag;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "beer_has_flavor_hash_tag")
public class BeerHasFlavorHashTag {

    @Id
    @Column(name = "beer_has_flavor_hash_tag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long beerHasFlavorHashTagId;

    @ManyToOne
    @JoinColumn(name = "flavor_hash_tag_id")
    private FlavorHashTag flavorHashTag;

    @ManyToOne
    @JoinColumn(name = "beer_id")
    private Beer beer;
}
