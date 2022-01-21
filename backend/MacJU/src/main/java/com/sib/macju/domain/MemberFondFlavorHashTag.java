package com.sib.macju.domain;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "member_fond_flavor_hash_tag")
public class MemberFondFlavorHashTag {

    @Id
    @Column(name = "member_fond_flavor_hash_tag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memberFondFlavorHashTagId;

    @ManyToOne
    @JoinColumn(name = "flavor_hash_tag_id")
    private FlavorHashTag flavorHashTag;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

}