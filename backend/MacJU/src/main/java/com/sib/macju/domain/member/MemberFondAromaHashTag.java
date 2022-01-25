package com.sib.macju.domain.member;

import com.sib.macju.domain.hashtag.AromaHashTag;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "member_fond_aroma_hash_tag")
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
