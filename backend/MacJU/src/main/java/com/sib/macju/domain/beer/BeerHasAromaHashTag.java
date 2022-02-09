package com.sib.macju.domain.beer;


import com.sib.macju.domain.hashtag.AromaHashTag;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;


@Entity
@Getter
@Table(name = "beer_has_aroma_hash_tag")
public class BeerHasAromaHashTag {

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