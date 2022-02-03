package com.macju.ranking.repository;

import com.macju.ranking.domain.Beer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeerRedisRepository extends CrudRepository<Beer, Long > {
}
