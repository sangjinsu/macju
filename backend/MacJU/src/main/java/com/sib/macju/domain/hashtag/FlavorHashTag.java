package com.sib.macju.domain.hashtag;

import com.sib.macju.domain.beer.BeerHasFlavorHashTag;
import com.sib.macju.domain.member.MemberFondFlavorHashTag;
import com.sib.macju.domain.member.RateHasFlavorHashTag;
import lombok.Getter;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "flavor_hash_tag")
public class FlavorHashTag {

    @Id
    @Column(name = "flavor_hash_tag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long flavorHashTagId;

    private String flavor;

    @OneToMany(mappedBy = "flavorHashTag", cascade = CascadeType.ALL)
    private List<MemberFondFlavorHashTag> memberFondFlavorHashTagList = new ArrayList<>();

    @OneToMany(mappedBy = "flavorHashTag", cascade = CascadeType.ALL)
    private List<BeerHasFlavorHashTag> beerHasFlavorHashTagList = new ArrayList<>();

    @OneToMany(mappedBy = "flavorHashTag", cascade = CascadeType.ALL)
    private List<RateHasFlavorHashTag> rateHasFlavorHashTagList = new ArrayList<>();

}

