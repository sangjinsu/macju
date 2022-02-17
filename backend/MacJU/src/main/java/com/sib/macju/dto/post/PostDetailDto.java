package com.sib.macju.dto.post;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.beer.BeerENMainType;
import com.sib.macju.domain.beer.BeerKOMainType;
import com.sib.macju.domain.member.Member;
import com.sib.macju.domain.post.Post;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class PostDetailDto implements Serializable {
    private final Long postId;
    private final BeerDto beer;
    private final MemberDto member;
    private final String content;
    private final List<PhotoDto> photos;
    private final List<UserHashTagDto> userHashTags;
    private final List<MemberDto> likeMembers;
    private final LocalDateTime updatedAt;

    @Data
    public static class BeerDto implements Serializable {
        private final Long beerId;
        private final String name;
        private final BeerTypeDto beerType;
        private final List<String> aromaHashTags;
        private final List<String> flavorHashTags;

        @Data
        public static class BeerTypeDto implements Serializable {
            private final BeerKOMainType ko_main;
            private final BeerENMainType en_main;
            private final String ko_detail;
            private final String en_detail;
        }

        public BeerDto(Beer beer) {
            beerId = beer.getBeerId();
            name = beer.getName();
            beerType = new BeerTypeDto(beer.getBeerType().getKo_main(),beer.getBeerType().getEn_main(), beer.getBeerType().getKo_detail(), beer.getBeerType().getEn_detail());
            aromaHashTags = beer.getBeerHasAromaHashTags()
                    .stream()
                    .map(beerHasAromaHashTag ->
                            beerHasAromaHashTag.getAromaHashTag().getAroma()
                    ).collect(Collectors.toList());

            flavorHashTags = beer.getBeerHasFlavorHashTags()
                    .stream()
                    .map(beerHasFlavorHashTag ->
                            beerHasFlavorHashTag.getFlavorHashTag().getFlavor()
                    ).collect(Collectors.toList());
        }
    }

    @Data
    public static class CommentDto implements Serializable {
        private final Long commentId;
        private final MemberDto member;
        private final String content;
    }

    @Data
    public static class PhotoDto implements Serializable {
        private final Long photoId;
        private final String data;
    }

    @Data
    public static class UserHashTagDto implements Serializable {
        private final Long userHashTagId;
        private final String content;
    }


    @Data
    public static class MemberDto implements Serializable {
        private final Long memberId;
        private final String nickName;
    }


    public PostDetailDto(Post post) {
        this.postId = post.getPostId();

        this.beer = new BeerDto(post.getBeer());


        Member writer = post.getMember();
        this.member = new MemberDto(writer.getMemberId(), writer.getNickName());
        this.content = post.getContent();

        this.photos = post.getPhotos()
                .stream()
                .map(photo -> new PhotoDto(photo.getPhotoId(), photo.getData()))
                .collect(Collectors.toList());

        this.userHashTags = post.getUserHashTags()
                .stream().map(userHashTag ->
                        new UserHashTagDto(userHashTag.getUserHashTagId(), userHashTag.getContent()))
                .collect(Collectors.toList());

        this.likeMembers = post.getMemberLikePosts().stream().map(memberLikePost -> {
            Member member = memberLikePost.getMember();
            return new MemberDto(member.getMemberId(), member.getNickName());
        }).collect(Collectors.toList());

        this.updatedAt = post.getUpdatedAt();
    }
}
