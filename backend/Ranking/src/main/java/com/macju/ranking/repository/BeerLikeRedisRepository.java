package com.macju.ranking.repository;

import com.macju.ranking.domain.BeerLike;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeerLikeRedisRepository extends CrudRepository<BeerLike, Long> {
    public BeerLike findByBeerIdAndMemberId(Long beerId, Long memberId);
}
