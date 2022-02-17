package com.sib.macju.repository.member;

import com.sib.macju.domain.member.Member;
import com.sib.macju.domain.member.MemberLikePost;
import com.sib.macju.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemberLikePostRepository extends JpaRepository<MemberLikePost, Long> {

    List<MemberLikePost> findAllByMember(Member member);

    @Query(value = "select mlp.memberLikePostId " +
            "from MemberLikePost mlp where mlp.member = :member and mlp.post = :post and mlp.post.is_deleted = false")
    Long findMemberLikePostIdByMemberAndPost(Member member, Post post);

}
