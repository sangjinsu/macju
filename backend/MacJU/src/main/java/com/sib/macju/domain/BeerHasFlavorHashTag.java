package com.sib.macju.domain;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "beerhashflavorhashtag")
public class BeerHasFlavorHashTag {

    @Id
    @Column(name = "beer_has_flavor_hash_tag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memberFondFlavorHashTagId;

    @ManyToOne
    @JoinColumn(name = "flavor_hash_tag_id")
    private FlavorHashTag flavorHashTag;

    @ManyToOne
    @JoinColumn(name = "beer_id")
    private Beer beer;

}
