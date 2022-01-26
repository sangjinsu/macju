package com.sib.macju.repository.beer;

import com.sib.macju.domain.beer.Beer;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BeerRepository extends JpaRepository<Beer, Long> {

    @Override
    <S extends Beer> S save(S entity);

    @Override
    List<Beer> findAll();

    List<Beer> findByBeerId(@Param("beerId") Long beerId);

    //해시태그로 맥주를 검색하는 건 DB에 접근 하는 거 아님!

    //인기 맥주 가져오는 것도 아님...!

}
