package com.sib.macju.domain.member;


import com.sib.macju.domain.hashtag.FlavorHashTag;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
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

    public static MemberFondFlavorHashTag createMemberFondFlavorHashTag(
            FlavorHashTag flavorHashTag,
            Member member
    ) {

        MemberFondFlavorHashTag memberFondFlavorHashTag = new MemberFondFlavorHashTag();
        memberFondFlavorHashTag.setFlavorHashTag(flavorHashTag);
        memberFondFlavorHashTag.setMember(member);
        return memberFondFlavorHashTag;
    }
}