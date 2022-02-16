package com.sib.macju.domain.member;

import com.sib.macju.domain.hashtag.AromaHashTag;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
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

    public static MemberFondAromaHashTag createMemberFondAromaHashTag(
            AromaHashTag aromaHashTag,
            Member member
    ) {
        MemberFondAromaHashTag memberFondAromaHashTag = new MemberFondAromaHashTag();
        memberFondAromaHashTag.setAromaHashTag(aromaHashTag);
        memberFondAromaHashTag.setMember(member);
        return memberFondAromaHashTag;
    }
}
