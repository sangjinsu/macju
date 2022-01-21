package com.sib.macju.domain;

import lombok.Data;
import lombok.Getter;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
@Getter
@Table(name = "userhashtag")
public class UserHashTag {

    @Id
    @Column(name = "user_hashtag_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userHashTagId;

    private String content;

    @OneToMany(mappedBy = "userHashTag", cascade = CascadeType.ALL)
    private List<PostHasUserHashTag> postHasUserHashTagList = new ArrayList<>();

}

