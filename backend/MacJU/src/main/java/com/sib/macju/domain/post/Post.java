package com.sib.macju.domain.post;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.comment.Comment;
import com.sib.macju.domain.hashtag.UserHashTag;
import com.sib.macju.domain.member.Member;
import com.sib.macju.domain.member.MemberLikePost;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "post")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post {

    @Id
    @Column(name = "post_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "beer_id")
    private Beer beer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(length = 2200, nullable = false)
    private String content;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    List<Photo> photos = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    List<UserHashTag> userHashTags = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    List<MemberLikePost> memberLikePosts = new ArrayList<>();

    // 연관관계 메서드
    public void setMember(Member member) {
        this.member = member;
        member.getPosts().add(this);
    }

    public void setBeer(Beer beer) {
        this.beer = beer;
        beer.getPosts().add(this);
    }

    public void setContent(String content) {
        this.content = content;
    }

    // 생성 메서드
    public static Post createPost(Beer beer,
                                  Member member,
                                  String content
    ) {
        Post post = new Post();
        post.setBeer(beer);
        post.setMember(member);
        post.setContent(content);

        return post;
    }
}