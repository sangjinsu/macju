package com.sib.macju.domain;

import lombok.Data;
import lombok.Getter;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Getter
@Table(name = "aromahashtag")
public class AromaHashTag {

    @Id
    @Column(name = "aroma_hash_tag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long aromaHashTagId;

    @Column
    private String aromaTagName;

    @OneToMany
    private List<MemberFondAromaHashTag> memberFondAromaHashTagList = new ArrayList<>();

    @OneToMany
    private List<BeerHasAromaHashTag> beerHasAromaHashTagList = new ArrayList<>();

    @OneToMany
    private List<RateHasAromaHashTag> rateHasAromaHashTagList = new ArrayList<>();


}

