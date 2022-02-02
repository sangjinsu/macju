package com.sib.macju.service.post;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.hashtag.UserHashTag;
import com.sib.macju.domain.member.Member;
import com.sib.macju.domain.post.Photo;
import com.sib.macju.domain.post.Post;
import com.sib.macju.repository.beer.BeerRepository;
import com.sib.macju.repository.hashtag.UserHashTagRepository;
import com.sib.macju.repository.member.MemberRepository;
import com.sib.macju.repository.post.PhotoRepository;
import com.sib.macju.repository.post.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


//createPost()
//deletePost()
//updatePost()
//changePostLike()
//searchPostsByHashTag() searchPostsByUserHashTag() 합치기?


// 쿼리
//fetchPostsByBeerId()
//fetchPostByPostId()
//fetchPosts() 최신순
//fetchPostsByPopularity() 인기순

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostService {

    private final BeerRepository beerRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final PhotoRepository photoRepository;
    private final UserHashTagRepository userHashTagRepository;

    @Transactional
    public Long createPost(Long beerId, Long memberId, String content, List<String> paths, List<String> userHashTagList) {

        Optional<Beer> beer = beerRepository.findById(beerId);
        Optional<Member> member = memberRepository.findById(memberId);

        if (beer.isEmpty() || member.isEmpty()) {
            throw new IllegalStateException();
        }

        Post post = Post.createPost(beer.get(), member.get(), content);
        postRepository.save(post);


        List<Photo> photos = paths.stream().map(
                path -> Photo.createPhoto(post, path)
        ).collect(Collectors.toList());

        photoRepository.saveAll(photos);

        saveUserHashTags(userHashTagList, post);

        return post.getPostId();
    }

    @Transactional
    public void updatePost(Long postId, String content, List<String> userHashTagList) {
        Optional<Post> foundPost = postRepository.findById(postId);
        if (foundPost.isEmpty()) {
            throw new IllegalStateException();
        }
        Post post = foundPost.get();
        post.setContent(content);

        post.getUserHashTags().clear();

        saveUserHashTags(userHashTagList, post);
    }

    private void saveUserHashTags(List<String> userHashTagList, Post post) {
        List<UserHashTag> userHashTags = userHashTagList
                .stream()
                .map(hashtag -> UserHashTag.createUserHashTag(hashtag, post))
                .collect(Collectors.toList());
        userHashTagRepository.saveAll(userHashTags);
    }

    @Transactional
    public void deletePost(Long postId) {
        Optional<Post> post = postRepository.findById(postId);
        if (post.isEmpty()) {
            throw new IllegalStateException();
        }
        postRepository.delete(post.get());
    }

    public List<Post> fetchPostsByBeerId(Long beerId) {
        return postRepository.findByBeerId(beerId);
    }


    public Post fetchPost(Long postId) {
        Optional<Post> foundPost = postRepository.findById(postId);
        if (foundPost.isEmpty()) {
            throw new IllegalStateException();
        }

        return foundPost.get();
    }

    public List<Post> fetchPosts(Pageable pageable) {
        return postRepository.findAllWithDetails(pageable);
    }

    public List<Post> fetchPostsByMemberId(Long memberId) {
        Optional<Member> foundMember = memberRepository.findById(memberId);
        if (foundMember.isEmpty()) {
            throw new IllegalStateException();
        }

        Member member = foundMember.get();
        return postRepository.findByMemberId(member.getMemberId());
    }
}
