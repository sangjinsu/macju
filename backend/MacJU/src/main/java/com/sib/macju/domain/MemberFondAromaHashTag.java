package com.sib.macju.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "memberfondaromahashtag")
public class MemberFondAromaHashTag {

    @Id
    @Column(name = "member_fond_aroma_hash_tag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memberFondAromaHashTagId;

    @ManyToOne
    @JoinColumn(name = "aroma_hash_tag_id")
    private AromaHashTag aromaHashTag;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

}
