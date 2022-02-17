package com.sib.macju.repository.beer;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.beer.BeerENMainType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BeerRepository extends JpaRepository<Beer, Long> {

    @Query(
            "select beer from Beer beer join fetch beer.beerType where beer.beerType.en_main = :beerMainType"
    )
//    @Query("select beer " +,
//            "from Beer beer " +
//            "where beer.beerType.beerTypeId =" +
//            " (select bt.beerTypeId from BeerType bt where bt.main = :beerMainType)" )
    List<Beer> findByBeerMainType(@Param("beerMainType") BeerENMainType beerENMainType);


    @Query("select beer from Beer beer join fetch beer.beerType order by beer.beerId")
    List<Beer> findAllWithBeerType(Pageable pageable);
}
