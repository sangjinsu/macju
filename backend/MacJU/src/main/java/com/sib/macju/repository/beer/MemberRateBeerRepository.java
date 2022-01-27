package com.sib.macju.repository.beer;

import com.sib.macju.domain.member.MemberRateBeer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRateBeerRepository extends JpaRepository<MemberRateBeer,Long> {
}
