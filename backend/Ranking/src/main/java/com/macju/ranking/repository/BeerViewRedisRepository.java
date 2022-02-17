package com.macju.ranking.repository;

import com.macju.ranking.domain.BeerLike;
import com.macju.ranking.domain.BeerView;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeerViewRedisRepository extends CrudRepository<BeerView, Long> {
    public BeerView findByBeerIdAndMemberId(Long beerId, Long memberId);


}
