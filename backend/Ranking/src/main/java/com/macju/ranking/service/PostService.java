package com.macju.ranking.service;

import com.macju.ranking.domain.BeerLike;
import com.macju.ranking.domain.BeerView;
import com.macju.ranking.domain.PostLike;
import com.macju.ranking.domain.PostView;
import com.macju.ranking.repository.PostLikeRedisRepository;
import com.macju.ranking.repository.PostViewRedisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class PostService {
    @Autowired
    PostLikeRedisRepository postLikeRedisRepository;
    @Autowired
    PostViewRedisRepository postViewRedisRepository;

    @Transactional
    public void savePostView(Long postId, Long memberId) {
        PostView postview = new PostView();
        Optional<PostView> post = Optional.ofNullable(postViewRedisRepository.findByPostIdAndMemberId(postId, memberId));
         if (post.isEmpty()) { // 비어 있는 경우 추가
            postview.setPostId(postId);
            postview.setMemberId(memberId);
            postViewRedisRepository.save(postview);
        } else if (post.get().getMemberId() != memberId) { // 기존 post 있는 경우에  post 조회한 memberId와 새로운 memberId 비교 후 중복이 아니라면 저장
            postview.setPostId(postId);
            postview.setMemberId(memberId);
            postViewRedisRepository.save(postview);
        }

    }

    @Transactional
    public void savePostLike(Long postId, Long memberId) {
        PostLike postlike = new PostLike();
        Optional<PostLike> post = Optional.ofNullable(postLikeRedisRepository.findByPostIdAndMemberId(postId, memberId));

        if (post.isEmpty()) {
            postlike.setPostId(postId);
            postlike.setMemberId(memberId);
            postLikeRedisRepository.save(postlike);
        } else if (post.get().getMemberId() != memberId) { // 기존 post 있는 경우에  post 조회한 memberId와 새로운 memberId 비교 후 중복이 아니라면 저장
            postlike.setPostId(postId);
            postlike.setMemberId(memberId);
            postLikeRedisRepository.save(postlike);
        } else if (post.get().getMemberId() == memberId) { // 좋아요 취소
            postLikeRedisRepository.deleteById(post.get().getId());
        }
    }


    @Transactional
    public void deletePost(Long postId, Long memberId) {
//        Optional<PostLike> postlike = Optional.ofNullable(postLikeRedisRepository.findByPostIdAndMemberId(postId, memberId));
//        Optional<PostView> postview = Optional.ofNullable(postViewRedisRepository.findByPostIdAndMemberId(postId, memberId));
        postViewRedisRepository.deleteByPostIdAndMemberId(postId, memberId);
        postLikeRedisRepository.deleteByPostIdAndMemberId(postId, memberId);
    }

    public List<PostView> fetchPostView() {
        List<PostView> result = (List<PostView>) postViewRedisRepository.findAll();
        return result;
    }

    public List<PostLike> fetchPostLike() {
        List<PostLike> result = (List<PostLike>) postLikeRedisRepository.findAll();
        return result;
    }

    @Transactional
    public void deleteAll(){
        postLikeRedisRepository.deleteAll();
        postViewRedisRepository.deleteAll();
    }



}
