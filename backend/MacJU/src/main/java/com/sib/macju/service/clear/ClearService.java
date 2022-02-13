package com.sib.macju.service.clear;

import com.sib.macju.domain.hashtag.UserHashTag;
import com.sib.macju.domain.post.Post;
import com.sib.macju.repository.hashtag.UserHashTagRepository;
import com.sib.macju.repository.post.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ClearService {

    private final UserHashTagRepository userHashTagRepository;
    private final PostRepository postRepository;

    @Autowired
    private RestTemplateBuilder restTemplateBuilder;

    @Transactional
    public void deletePost() {
        for (Post post : postRepository.findByIs_deleted()) {
            postRepository.deleteById(post.getPostId());
        }
    }

    @Transactional
    public void deleteUserhashtag() {
        for (UserHashTag tag : userHashTagRepository.findByIs_deleted()) {
            userHashTagRepository.deleteById(tag.getUserHashTagId());
        }
    }


    @Transactional
    public void deleteESPost() {
        for (Post post : postRepository.findByIs_deleted()) {
            String url = "http://i6c107.p.ssafy.io:9201/post/_doc/"+ post.getPostId().toString();
            restTemplateBuilder.build().delete(url);
        }
    }

    @Transactional
    public void deleteESUserhashtag() {
        for (UserHashTag tag : userHashTagRepository.findByIs_deleted()) {
            String url = "http://i6c107.p.ssafy.io:9201/userhashtag/_doc/"+ tag.getUserHashTagId().toString();
            restTemplateBuilder.build().delete(url);
        }
    }

}
