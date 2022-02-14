package com.sib.macju.scheduler;

import com.google.gson.JsonObject;
import com.sib.macju.domain.hashtag.UserHashTag;
import com.sib.macju.domain.post.Post;
import com.sib.macju.repository.hashtag.UserHashTagRepository;
import com.sib.macju.repository.post.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


@Component
@RequiredArgsConstructor
public class Clearance {

    private final PostRepository postRepository;
    private final UserHashTagRepository userHashTagRepository;

    @Autowired
    private RestTemplateBuilder restTemplateBuilder;

    @Transactional
    @Scheduled(cron = "0 0 7 * * *", zone = "Asia/Seoul")
    public int deletePost() {
        return postRepository.deleteAllByIs_deletedIsTrue();
    }

    @Transactional
    @Scheduled(cron = "0 0 7 * * *", zone = "Asia/Seoul")
    public int deleteUserHashTag() {
        return userHashTagRepository.deleteAllByIs_deletedIsTrue();
    }

    @Scheduled(cron = "0 0 7 * * *", zone = "Asia/Seoul")
    public void deleteESPost() {
        String json = "{\"query\":{\"match\":{\"is_deleted\":true}}}";
        String url = "http://i6c107.p.ssafy.io:9201/post/_delete_by_query";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(json, headers);

        restTemplateBuilder.build().postForLocation(url, request);
    }

    @Scheduled(cron = "0 0 7 * * *", zone = "Asia/Seoul")
    public void deleteESUserHashTag() {
        String json = "{\"query\":{\"match\":{\"is_deleted\":true}}}";
        String url = "http://i6c107.p.ssafy.io:9201/userhashtag/_delete_by_query";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(json, headers);

        restTemplateBuilder.build().postForLocation(url, request);
    }

}
