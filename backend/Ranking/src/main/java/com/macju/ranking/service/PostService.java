package com.macju.ranking.service;

import com.macju.ranking.component.RankingZset;
import com.macju.ranking.domain.PostLike;
import com.macju.ranking.domain.PostView;
import com.macju.ranking.repository.PostLikeRedisRepository;
import com.macju.ranking.repository.PostViewRedisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
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
    @Autowired
    private final RedisTemplate<String,String> redisTemplate = new RedisTemplate<>();
    @Autowired
    RankingZset rankingZset = new RankingZset(redisTemplate);


    @Transactional
    public void savePostView(Long postId, Long memberId) {
        PostView postview = new PostView();
        Optional<PostView> post = Optional.ofNullable(postViewRedisRepository.findByPostIdAndMemberId(postId, memberId));
        if (post.isEmpty()) { // 비어 있는 경우 추가
            postview.setPostId(postId);
            postview.setMemberId(memberId);
            postViewRedisRepository.save(postview);
            rankingZset.postViewCount(postId);
        } else if (post.get().getMemberId() != memberId) { // 기존 post 있는 경우에  post 조회한 memberId와 새로운 memberId 비교 후 중복이 아니라면 저장
            postview.setPostId(postId);
            postview.setMemberId(memberId);
            postViewRedisRepository.save(postview);
            rankingZset.postViewCount(postId);
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
            rankingZset.postLikeCountUp(postId);
        } else if (post.get().getMemberId() != memberId) { // 기존 post 있는 경우에  post 조회한 memberId와 새로운 memberId 비교 후 중복이 아니라면 저장
            postlike.setPostId(postId);
            postlike.setMemberId(memberId);
            postLikeRedisRepository.save(postlike);
            rankingZset.postLikeCountUp(postId);
        } else if (post.get().getMemberId() == memberId) { // 좋아요 취소
            postLikeRedisRepository.deleteById(post.get().getId());
            rankingZset.postLikeCountDown(postId);
        }
    }

    @Transactional
    public void deletePost(Long postId) {

        List<PostView> postViews = postViewRedisRepository.findAllByPostId(postId);
        for (PostView postView : postViews) {
            postViewRedisRepository.deleteById(postView.getId());
        }

        List<PostLike> postLikes = postLikeRedisRepository.findAllByPostId(postId);
        for (PostLike postLike : postLikes) {
            postViewRedisRepository.deleteById(postLike.getId());
        }

        rankingZset.deletePostById(postId);
    }

//    public List<PostView> fetchPostView() {
//        List<PostView> result = (List<PostView>) postViewRedisRepository.findAll();
//        return result;
//    }
//
//    public List<PostLike> fetchPostLike() {
//        List<PostLike> result = (List<PostLike>) postLikeRedisRepository.findAll();
//        return result;
//    }

    public List<String> getPostViewId() {
        return rankingZset.getPostViewId();
    }

    public List<String> getPostLikeId() {
        return rankingZset.getPostLikeId();
    }

    public List<String> getHotPost() {
        List<String> postLikes = getPostLikeId();
        List<String> postViews = getPostViewId();

        for (String postId : postViews) {
            if (!postLikes.contains(postId))
                postLikes.add(postId);
        }
        return postLikes;
    }

//    @Transactional
//    public void deleteAll(){
//        postLikeRedisRepository.deleteAll();
//        postViewRedisRepository.deleteAll();
//        rankingZset.deletePost();
//    }

}
