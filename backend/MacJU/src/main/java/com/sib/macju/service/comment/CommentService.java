package com.sib.macju.service.comment;

import com.sib.macju.domain.comment.Comment;
import com.sib.macju.domain.member.Member;
import com.sib.macju.domain.post.Post;
import com.sib.macju.repository.comment.CommentRepository;
import com.sib.macju.repository.member.MemberRepository;
import com.sib.macju.repository.post.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
    public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    public List<Comment> fetchComments(Long postId) {
//        Optional<Post> post = postRepository.findById(postId);
        return commentRepository.findCommentsByPost(postId);
    }

    @Transactional
    public Comment createComment(Long postId, Comment comment, Long memberId) {
        Optional<Post> post = postRepository.findById(postId);
        comment.setPost(post.get());
        Optional<Member> member = memberRepository.findById(memberId); // member get??? session user get?
        comment.setMember(member.get());

        System.out.println(post.get());
        System.out.println("***********************"+member);


        commentRepository.save(comment);
        return comment;
    }

    @Transactional
    public List<Comment> deleteComment(Long postId, Long commentId) {
//        Optional<Comment> comment = commentRepository.findById(commentId);
        commentRepository.deleteById(commentId);
        return commentRepository.findCommentsByPost(postId);
    }


//    public Optional<Comment> findOne(Long commentId) {
//        return commentRepository.findById(commentId);
//    }

}






























