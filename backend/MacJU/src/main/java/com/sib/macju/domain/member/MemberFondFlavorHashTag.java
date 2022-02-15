package com.sib.macju.domain.member;


import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.hashtag.FlavorHashTag;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        MemberFondFlavorHashTag that = (MemberFondFlavorHashTag) o;
        return memberFondFlavorHashTagId != null && Objects.equals(memberFondFlavorHashTagId, that.memberFondFlavorHashTagId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

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