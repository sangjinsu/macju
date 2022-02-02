package com.sib.macju.domain.post;

import com.sib.macju.domain.hashtag.UserHashTag;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "photo")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Photo {

    @Id
    @Column(name = "photo_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long photoId;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(unique = true)
    private String data;

    public void setPost(Post post) {
        this.post = post;
    }

    public void setData(String data) {
        this.data = data;
    }

    public static Photo createPhoto(Post post, String data) {
        Photo photo = new Photo();
        photo.setPost(post);
        photo.setData(data);
        return photo;
    }
}
