package com.sib.macju.domain.hashtag;

import com.sib.macju.domain.post.PostHasUserHashTag;
import lombok.Data;
import lombok.Getter;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
@Getter
@Table(name = "user_hashtag")
public class UserHashTag {

    @Id
    @Column(name = "user_hashtag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userHashTagId;

    private String content;

    @OneToMany(mappedBy = "userHashTag", cascade = CascadeType.ALL)
    private List<PostHasUserHashTag> postHasUserHashTagList = new ArrayList<>();

}

