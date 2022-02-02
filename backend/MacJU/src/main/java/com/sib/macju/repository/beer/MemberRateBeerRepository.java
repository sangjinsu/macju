package com.sib.macju.repository.beer;

import com.sib.macju.domain.member.MemberRateBeer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRateBeerRepository extends JpaRepository<MemberRateBeer,Long> {

    @Query("select mrb from MemberRateBeer mrb where mrb.beer.beerId  = :beerId and mrb.member.memberId = :memberId")
    Optional<MemberRateBeer> findByBeerIdAndMemberId(@Param("beerId") Long beerId, @Param("memberId") Long memberId);
}
