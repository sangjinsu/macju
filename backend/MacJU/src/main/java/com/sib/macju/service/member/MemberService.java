package com.sib.macju.service.member;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.member.Member;
import com.sib.macju.domain.post.Post;
import com.sib.macju.dto.member.BeerDTO;
import com.sib.macju.dto.member.MemberDTO;
import com.sib.macju.dto.member.PostDTO;
import org.springframework.stereotype.Service;

import java.util.List;


public interface MemberService {

    public int vaildateMemberNickName(String nickName);
    public int signUp(Member member);
    public Member findByMemberId(Long memberId);
    public Beer findByBeerId(Long beerId);
    public Post findByPostId(Long postId);
    public int updateProfile(Member member);
    public List<BeerDTO> fetchLikedBeer(Long memberId);
    public int changeBeerLike(Long memberId, Long beerId);
    public List<PostDTO> fetchLikedPost(Long memberId);
    public int changePostLike(Long memberId, Long postId);
    public int changeFollowing(Long memberId, Long followingMemberId);
    public List<MemberDTO> fetchFollowings(Long memberId);
    public List<MemberDTO> fetchFollowers(Long memberId);
}
