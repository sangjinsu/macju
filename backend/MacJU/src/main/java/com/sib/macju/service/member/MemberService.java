package com.sib.macju.service.member;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.member.Member;
import com.sib.macju.domain.post.Post;
import com.sib.macju.dto.beer.BeerVO;
import com.sib.macju.dto.beer.RateVO;
import com.sib.macju.dto.member.MemberDto;
import com.sib.macju.dto.member.RequestUpdateMemberDto;
import com.sib.macju.dto.post.PostVO;

import java.util.List;


public interface MemberService {

    int vaildateMemberNickName(String nickName);

    int signUp(MemberDto member);

    Member findByMemberId(Long memberId);

    Member findByKakaoId(Long kakaoId);

    Beer findByBeerId(Long beerId);

    Post findByPostId(Long postId);

    int updateProfile(RequestUpdateMemberDto requestUpdateMemberDto);

    int withdraw(Long memberId);

    List<RateVO> fetchRatedBeer(Long memberId);

    List<BeerVO> fetchLikedBeer(Long memberId);

    int changeBeerLike(Long memberId, Long beerId);

    List<PostVO> fetchLikedPost(Long memberId);

    int changePostLike(Long memberId, Long postId);

    int changeFollowing(Long memberId, Long followingMemberId);

    List<MemberDto> fetchFollowings(Long memberId);

    List<MemberDto> fetchFollowers(Long memberId);
}
