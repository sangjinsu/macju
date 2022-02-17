package com.sib.macju.repository.member;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.member.Member;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByNickName(@Param("nickName") String nickName);
    Member findByMemberId(@Param("memberId") Long memberId);
    Member findByKakaoId(@Param("kakaoId") Long kakaoId);
}

