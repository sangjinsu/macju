package com.sib.macju.domain.beer;

import com.sib.macju.domain.member.MemberLikeBeer;
import com.sib.macju.domain.member.MemberRateBeer;
import com.sib.macju.domain.post.Post;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "beer")
public class Beer {

    @Id
    @Column(name = "beer_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long beerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "beer_type_id")
    private BeerType beerType;

    @Column(unique = true, nullable = false, name = "beer_name")
    private String name;

    @Column(name = "english_name", unique = true, nullable = false)
    private String englishName;

    @Column(columnDefinition = "char(255)")
    private String content;

    private Double volume;

    private String photoPath;


    @OneToMany(mappedBy = "beer", cascade = CascadeType.ALL)
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "beer", cascade = CascadeType.ALL)
    private List<BeerHasAromaHashTag> beerHasAromaHashTags = new ArrayList<>();

    @OneToMany(mappedBy = "beer", cascade = CascadeType.ALL)
    private List<BeerHasFlavorHashTag> beerHasFlavorHashTags = new ArrayList<>();

    @OneToMany(mappedBy = "beer", cascade = CascadeType.ALL)
    private List<MemberRateBeer> memberRateBeers = new ArrayList<>();

    @OneToMany(mappedBy = "beer", cascade = CascadeType.ALL)
    private List<MemberLikeBeer> memberLikeBeers = new ArrayList<>();
}
