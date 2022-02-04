package com.macju.ranking.service;

import com.macju.ranking.domain.BeerLike;
import com.macju.ranking.domain.BeerView;
import com.macju.ranking.domain.PostView;
import com.macju.ranking.repository.BeerLikeRedisRepository;
import com.macju.ranking.repository.BeerViewRedisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class BeerService {
    @Autowired
    BeerLikeRedisRepository beerLikeRedisRepository;
    @Autowired
    BeerViewRedisRepository beerViewRedisRepository;

    @Transactional
    public void saveBeerView(Long beerId, Long memberId) {
        BeerView beerview = new BeerView();
        Optional<BeerView> beer = Optional.ofNullable(beerViewRedisRepository.findByBeerIdAndMemberId(beerId, memberId));
        if (beer.isEmpty()) {
            beerview.setBeerId(beerId);
            beerview.setMemberId(memberId);
            beerViewRedisRepository.save(beerview);
        } else if (beer.get().getMemberId() != memberId) { // 기존 post 있는 경우에  post 조회한 memberId와 새로운 memberId 비교 후 중복이 아니라면 저장
            beerview.setBeerId(beerId);
            beerview.setMemberId(memberId);
            beerViewRedisRepository.save(beerview);
        }
    }

    @Transactional
    public void saveBeerLike(Long beerId, Long memberId) {
        BeerLike beerlike = new BeerLike();
        Optional<BeerLike> beer = Optional.ofNullable(beerLikeRedisRepository.findByBeerIdAndMemberId(beerId, memberId));
        if (beer.isEmpty()) {
            beerlike.setBeerId(beerId);
            beerlike.setMemberId(memberId);
            beerLikeRedisRepository.save(beerlike);
        } else if (beer.get().getMemberId() != memberId) { // 기존 post 있는 경우에  post 조회한 memberId와 새로운 memberId 비교 후 중복이 아니라면 저장
            beerlike.setBeerId(beerId);
            beerlike.setMemberId(memberId);
            beerLikeRedisRepository.save(beerlike);
        } else if (beer.get().getMemberId() == memberId) { // 좋아요 취소
            beerLikeRedisRepository.deleteById(beer.get().getId());
        }
    }

    public List<BeerView> fetchBeerView() {
        List<BeerView> result = (List<BeerView>) beerViewRedisRepository.findAll();
        return result;
    }

    public List<BeerLike> fetchBeerLike() {
        List<BeerLike> result = (List<BeerLike>) beerLikeRedisRepository.findAll();
        return result;
    }

    @Transactional
    public void deleteAll(){
        beerLikeRedisRepository.deleteAll();
        beerViewRedisRepository.deleteAll();
    }

}
