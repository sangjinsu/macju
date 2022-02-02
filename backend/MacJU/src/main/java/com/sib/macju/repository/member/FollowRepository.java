package com.sib.macju.repository.member;

import com.sib.macju.domain.member.Follow;
import com.sib.macju.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query("select f.id from Follow f where f.follower = :member and f.following = :followingMember")
    Long findIdByFollowerAndFollowing(Member member, Member followingMember);

}
