package com.sib.macju.domain.member;

import com.sib.macju.domain.hashtag.AromaHashTag;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        MemberFondAromaHashTag that = (MemberFondAromaHashTag) o;
        return memberFondAromaHashTagId != null && Objects.equals(memberFondAromaHashTagId, that.memberFondAromaHashTagId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

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
