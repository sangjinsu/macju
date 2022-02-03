package com.sib.macju.controller.comment;

import com.sib.macju.domain.comment.Comment;
import com.sib.macju.domain.member.Member;
import com.sib.macju.domain.post.Post;
import com.sib.macju.dto.comment.CommentDto;
import com.sib.macju.dto.comment.RequestCreateCommentDto;
import com.sib.macju.repository.comment.CommentRepository;
import com.sib.macju.repository.member.MemberRepository;
import com.sib.macju.repository.post.PostRepository;
import com.sib.macju.service.comment.CommentService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
@RequestMapping("v1/post")
@CrossOrigin("*")
public class CommentController {

    @NonNull
    private final CommentRepository commentRepository;
    @NonNull
    private final PostRepository postRepository;
    @NonNull
    private final CommentService commentService;
    @NonNull
    private final MemberRepository memberRepository;


    @PostMapping("/{postId}/comment")
    public Long createComment(@PathVariable Long postId, @RequestBody RequestCreateCommentDto requestCreateCommentDto){

        return commentService.createComment(
                postId,
                requestCreateCommentDto.getMemberId(),
                requestCreateCommentDto.getContent()
        );
    }

    @GetMapping("/{postId}/comment")
    public List<CommentDto> fetchComments(@PathVariable Long postId) {
        List<Comment> comments = commentService.fetchComments(postId);

        return comments.stream().map(CommentDto::new).collect(Collectors.toList());
//        return commentService.fetchComments(postId);
    }

    @DeleteMapping("/{postId}/comment/{commentId}")
    public void deleteComment(@PathVariable Long postId, @PathVariable Long commentId){ // (Authentication authentication)        Optional<Comment> comment  = commentRepository.findById(commentId);
       commentService.deleteComment(commentId);
    }
}






























