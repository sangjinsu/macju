package com.sib.macju.repository.beer;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.beer.BeerMainType;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BeerRepository extends JpaRepository<Beer, Long> {

    @Query(
            "select beer from Beer beer where beer.beerType.main = :beerMainType"
    )
//    @Query("select beer " +,
//            "from Beer beer " +
//            "where beer.beerType.beerTypeId =" +
//            " (select bt.beerTypeId from BeerType bt where bt.main = :beerMainType)" )
    List<Beer> findByBeerMainType(@Param("beerMainType") BeerMainType beerMainType);
    Beer findByBeerId (@Param("beerId") Long beerId);
}
