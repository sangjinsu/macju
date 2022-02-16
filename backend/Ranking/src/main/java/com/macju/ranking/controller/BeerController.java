package com.macju.ranking.controller;

import com.macju.ranking.domain.*;
import com.macju.ranking.repository.BeerLikeRedisRepository;
import com.macju.ranking.repository.BeerViewRedisRepository;
import com.macju.ranking.service.BeerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://i6c107.p.ssafy.io:8888/**", allowedHeaders = "*")
@RequestMapping("beer")
public class BeerController {

    @Autowired
    BeerLikeRedisRepository beerLikeRedisRepository;
    @Autowired
    BeerViewRedisRepository beerViewRedisRepository;
    @Autowired
    BeerService beerService;

    @GetMapping("/view/{beerId}/{memberId}")
    public void beerView(@PathVariable("beerId") Long beerId, @PathVariable("memberId") Long memberId) {
        beerService.saveBeerView(beerId, memberId);
    }

    @GetMapping("/like/{beerId}/{memberId}")
    public void beerLike(@PathVariable("beerId") Long beerId, @PathVariable("memberId") Long memberId) {
        beerService.saveBeerLike(beerId, memberId);
    }

    @GetMapping("/popbeer")
    public List<BeerVo> getPopBeer() {
        List<String> beers = beerService.getPopBeer();
        return beers.stream().map(BeerVo::new).collect(Collectors.toList());
    }
}
