package com.sib.macju.controller.comment;

import com.sib.macju.domain.comment.Comment;
import com.sib.macju.domain.member.Member;
import com.sib.macju.domain.post.Post;
import com.sib.macju.repository.comment.CommentRepository;
import com.sib.macju.repository.post.PostRepository;
import com.sib.macju.service.comment.CommentService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@RequestMapping("v1/post")
public class CommentController {

    @NonNull
    private final CommentRepository commentRepository;
    @NonNull
    private final PostRepository postRepository;
    @NonNull
    private final CommentService commentService;

    // 로그인 되어 있는 멤버 추출
    private final HttpSession httpSession;

    // create
    @PostMapping("/{postId}/comment")
    public Comment createComment(@PathVariable Long postId, @RequestBody Comment comment){
        Post post = postRepository.findById(postId).orElse(null);
        // memberId = ((SessionUser) httpSession.getAttribute("member")).getId();
        // https://github.com/hahyuning/SpringBoot-Project/blob/60ccff3dadc279f2626dcc5dc89b813df9c994a6/src/main/java/com/desk/spring/config/oauth/dto/SessionUser.java

        System.out.println(comment);

        Long memberId = Long.valueOf(1);
        Comment result = commentService.createComment(post.getPostId(), comment, memberId);

        // @AuthenticationPrincipal // 인증된 사용자 member 반환
        //Comment result = commentService.createComment(post.getPostId(), comment,  @AuthenticationPrincipal UserDetailsImpl userDetails);
        // https://github.com/seongbinko/remember_dream_v2/blob/main/src/main/java/shop/dream/config/UserDetailsImpl.java
        // https://github.com/seongbinko/remember_dream_v2/blob/main/src/main/java/shop/dream/controller/CommentController.java

        return result;
    }

//    public ResponseEntity createComment (@PathVariable Long postId, @RequestBody Comment comment) {
//        Post post = postRepository.findById(postId).orElse(null);
//        if(post == null) {
//            return ResponseEntity.badRequest().build();
//        }
//        commentService.createComment(post.getPostId(), comment);
//        return ResponseEntity.ok().build();
//    }

    // get
    @GetMapping("/{postId}/comment")
    public List<Comment> fetchComments(@PathVariable Long postId) {
        return commentService.fetchComments(postId);
    }

    // delete
    @DeleteMapping("/{postId}/comment/{commentId}")
    public List<Comment> deleteComment(@PathVariable Long postId, @PathVariable Long commentId){ // (Authentication authentication)        Optional<Comment> comment  = commentRepository.findById(commentId);
        return commentService.deleteComment(postId, commentId);

//        String username = authentication.getName();
//        if (username == comment.get().getMember().getNickName()) {
//            return commentService.deleteComment(postId, commentId);
//        }
//        return null;
    }

    // 사용자 인증 추가??
//    public List<Comment> deleteComment(@PathVariable Long postId, @PathVariable Long commentId, @AuthenticationPrincipal UserDetailsImpl userDetails){
//        return commentService.deleteComment(postId, commentId, userDetails.getAccount().getId());

}
