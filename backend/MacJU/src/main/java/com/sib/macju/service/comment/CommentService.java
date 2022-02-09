package com.sib.macju.service.comment;

import com.sib.macju.domain.comment.Comment;
import com.sib.macju.domain.member.Member;
import com.sib.macju.domain.post.Post;
import com.sib.macju.repository.comment.CommentRepository;
import com.sib.macju.repository.member.MemberRepository;
import com.sib.macju.repository.post.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
        return commentRepository.findByPostId(postId);
    }

    @Transactional
    public Long createComment(Long postId, Long memberId, String content) {
        Comment comment = new Comment();

        Optional<Post> post = postRepository.findById(postId);
        Optional<Member> member = memberRepository.findById(memberId);

        if (post.isEmpty() || member.isEmpty()) {
            throw new IllegalStateException();
        }

        comment.setPost(post.get());
        comment.setMember(member.get());

        comment.setContent(content);
        commentRepository.save(comment);

        return comment.getCommentId();
    }

    @Transactional
    public void deleteComment(Long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if (comment.isEmpty()) {
            throw new IllegalStateException();
        }
        commentRepository.deleteById(commentId);
    }
}






























