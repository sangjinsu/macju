package com.sib.macju.service.member;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.member.Member;
import com.sib.macju.domain.post.Post;
import com.sib.macju.dto.beer.BeerVO;
import com.sib.macju.dto.beer.RateVO;
import com.sib.macju.dto.member.MemberDto;
import com.sib.macju.dto.post.PostVO;

import java.util.List;


public interface MemberService {

    public int vaildateMemberNickName(String nickName);
    public int signUp(MemberDto member);
    public Member findByMemberId(Long memberId);
    public Member findByKakaoId(Long kakaoId);
    public Beer findByBeerId(Long beerId);
    public Post findByPostId(Long postId);
    public int updateProfile(MemberDto member);
    public int withdraw(Long memberId);
    public List<RateVO> fetchRatedBeer(Long memberId);
    public List<BeerVO> fetchLikedBeer(Long memberId);
    public int changeBeerLike(Long memberId, Long beerId);
    public List<PostVO> fetchLikedPost(Long memberId);
    public int changePostLike(Long memberId, Long postId);
    public int changeFollowing(Long memberId, Long followingMemberId);
    public List<MemberDto> fetchFollowings(Long memberId);
    public List<MemberDto> fetchFollowers(Long memberId);
}
