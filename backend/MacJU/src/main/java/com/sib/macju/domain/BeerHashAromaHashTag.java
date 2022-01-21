package com.sib.macju.domain;


import lombok.Data;

import javax.persistence.*;


@Entity
@Data
@Table(name = "beerhasharomahashtag")
public class BeerHashAromaHashTag {

    @Id
    @Column(name = "beer_has_aroma_hash_tag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memberFondAromaHashTagId;

    @ManyToOne
    @JoinColumn(name = "aroma_hash_tag_id")
    private AromaHashTag aromaHashTag;

    @ManyToOne
    @JoinColumn(name = "beer_id")
    private Beer beer;

}