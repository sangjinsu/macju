package com.macju.ranking.repository;

import com.macju.ranking.domain.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRedisRepository extends CrudRepository<Post, Long > {

}
