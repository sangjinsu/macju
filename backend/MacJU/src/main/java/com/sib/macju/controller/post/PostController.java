package com.sib.macju.controller.post;

import com.sib.macju.domain.post.Post;
import com.sib.macju.dto.post.PostDetailDto;
import com.sib.macju.dto.post.PostDto;
import com.sib.macju.dto.post.RequestCreatePostDto;
import com.sib.macju.dto.post.RequestUpdatePostDto;
import com.sib.macju.repository.post.PostRepository;
import com.sib.macju.service.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("v1/post")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PostController {

    private final PostService postService;
    private final PostRepository postRepository;

    @ResponseBody
    @PostMapping()
    public ResponseEntity<Long> createPost(
            @RequestBody RequestCreatePostDto requestCreatePostDto
    ) {
        try {
            Long postId = postService.createPost(
                    requestCreatePostDto.getBeerId(),
                    requestCreatePostDto.getMemberId(),
                    requestCreatePostDto.getContent(),
                    requestCreatePostDto.getPaths(),
                    requestCreatePostDto.getUserHashTags());
            return ResponseEntity.status(HttpStatus.OK).body(postId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

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
