package com.sib.macju.controller.post;

import com.sib.macju.domain.member.Member;
import com.sib.macju.domain.post.Photo;
import com.sib.macju.domain.post.Post;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class PostDto implements Serializable {
    private final Long postId;
    private final BeerDto beer;
    private final MemberDto member;
    private final String content;
    private final LocalDateTime updatedAt;
    private final List<UserHashTagDto> userHashTags;
    private final PhotoDto photo;
    private final Long likes;

    @Data
    public static class BeerDto implements Serializable {
        private final Long beerId;
        private final String name;
    }

    @Data
    public static class MemberDto implements Serializable {
        private final Long memberId;
        private final String nickName;
    }

    @Data
    public static class UserHashTagDto implements Serializable {
        private final Long userHashTagId;
        private final String content;
    }

    @Data
    public static class PhotoDto implements Serializable {
        private final Long photoId;
        private final String data;
    }

    public PostDto(Post post) {
        this.postId = post.getPostId();
        this.beer = new BeerDto(post.getBeer().getBeerId(), post.getBeer().getName());
        Member writer = post.getMember();
        this.member = new MemberDto(writer.getMemberId(), writer.getName());
        this.content = post.getContent();
        this.updatedAt = post.getUpdatedAt();
        this.userHashTags = post.getUserHashTags()
                .stream().map(userHashTag ->
                        new UserHashTagDto(userHashTag.getUserHashTagId(), userHashTag.getContent()))
                .collect(Collectors.toList());
        this.likes = post.getMemberLikePosts().stream().count();

        Photo photo = post.getPhotos().get(0);
        this.photo = new PhotoDto(photo.getPhotoId(), photo.getData());
    }
}
