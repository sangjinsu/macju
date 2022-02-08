package com.sib.macju.repository.member;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.member.Member;
import com.sib.macju.domain.member.MemberLikeBeer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemberLikeBeerRepository extends JpaRepository<MemberLikeBeer, Long> {

    List<MemberLikeBeer> findAllByMember(Member member);

    @Query(value = "select mlb.memberLikeBeerId " +
            "from MemberLikeBeer mlb where mlb.member = :member and mlb.beer = :beer")
    Long findMemberLikeBeerIdByMemberAndBeer(Member member, Beer beer);
}
