package com.sib.macju.domain.post;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    @Column(unique = true, nullable = false)
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
