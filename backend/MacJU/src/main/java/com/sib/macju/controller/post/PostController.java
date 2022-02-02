package com.sib.macju.controller.post;

import com.sib.macju.domain.post.Post;
import com.sib.macju.service.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("v1/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping()
    public Long createPost(
            @RequestBody RequestCreatePostDto requestCreatePostDto
    ) {
        return postService.createPost(
                requestCreatePostDto.getBeerId(),
                requestCreatePostDto.getMemberId(),
                requestCreatePostDto.getContent(),
                requestCreatePostDto.getPaths(),
                requestCreatePostDto.getUserHashTags());
    }

    @GetMapping("/{postId}")
    public PostDetailDto fetchPost(@PathVariable("postId") Long postId) {
        Post post = postService.fetchPost(postId);
        return new PostDetailDto(post);
    }

    @PutMapping("/{postId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updatePost(
            @RequestBody RequestUpdatePostDto requestUpdatePostDto
    ) {
        postService.updatePost(
                requestUpdatePostDto.getPostId(),
                requestUpdatePostDto.getContent(),
                requestUpdatePostDto.getUserHashTags()
        );
    }

    @DeleteMapping("/{postId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(
            @PathVariable("postId") Long postId
    ) {
        postService.deletePost(postId);
    }

    @GetMapping("/new")
    public List<PostDto> fetchPosts(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        List<Post> posts = postService.fetchPosts(PageRequest.of(page, size));
        return posts.stream().map(PostDto::new).collect(Collectors.toList());
    }

    @GetMapping("/member/{memberId}")
    public List<PostDto> fetchPostsByMemberId(
            @PathVariable("memberId") Long memberId
    ) {
        List<Post> posts = postService.fetchPostsByMemberId(memberId);
        return posts.stream().map(PostDto::new).collect(Collectors.toList());
    }

    @GetMapping("/beer/{beerId}")
    public List<PostDto> fetchPostsByBeerId(
            @PathVariable("beerId") Long beerId
    ) {
        List<Post> posts = postService.fetchPostsByBeerId(beerId);
        return posts.stream().map(PostDto::new).collect(Collectors.toList());
    }

}
