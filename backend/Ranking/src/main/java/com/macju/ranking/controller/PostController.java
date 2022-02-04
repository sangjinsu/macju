package com.macju.ranking.controller;

import com.macju.ranking.domain.BeerVo;
import com.macju.ranking.domain.PostLike;
import com.macju.ranking.domain.PostView;
import com.macju.ranking.domain.PostVo;
import com.macju.ranking.repository.PostLikeRedisRepository;
import com.macju.ranking.repository.PostViewRedisRepository;
import com.macju.ranking.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("post")
public class PostController {
    @Autowired
    PostLikeRedisRepository postLikeRedisRepository;
    @Autowired
    PostViewRedisRepository postViewRedisRepository;
    @Autowired
    PostService postService;

    @GetMapping("/view/{postId}/{memberId}")
    public void postView(@PathVariable("postId") Long postId, @PathVariable("memberId") Long memberId) {
        postService.savePostView(postId, memberId);
    }

    @GetMapping("/like/{postId}/{memberId}")
    public void postLike(@PathVariable("postId") Long postId, @PathVariable("memberId") Long memberId) {
        postService.savePostLike(postId, memberId);
    }

    @DeleteMapping("/{postId}/{memberId}")
    public void deletePost(@PathVariable("postId") Long postId, @PathVariable("memberId") Long memberId) {
        postService.deletePost(postId, memberId);
    }

//    @GetMapping("/view/{postId}")
    @GetMapping("/view")
    public List<PostVo> fetchPostView() { //@PathVariable("postId") Long postId) {
        List<PostView> post = postService.fetchPostView();
        return post.stream().map(PostVo::new).collect(Collectors.toList());
    }

//    @GetMapping("/like/{postId}")
    @GetMapping("/like")
    public List<PostVo> fetchPostLike() { //@PathVariable("postId") Long postId) {
        List<PostLike> post = postService.fetchPostLike();
        return post.stream().map(PostVo::new).collect(Collectors.toList());
    }

    @DeleteMapping("/delete")
    public void deleteAll() {
        postService.deleteAll();
    }

//    @GetMapping("/{postId}")
//    public List<PostVo> fetchPopPost(@PathVariable("postId") Long postId) {
//
//    }

}
