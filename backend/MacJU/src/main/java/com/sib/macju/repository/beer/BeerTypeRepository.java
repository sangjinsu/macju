package com.sib.macju.repository.beer;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.beer.BeerMainType;
import com.sib.macju.domain.beer.BeerType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


// beertype admin 을 통한 생성, 단일 조회 만 가능 // 다수 조회는 X


@Repository
public interface BeerTypeRepository extends JpaRepository<BeerType, Long> {
}