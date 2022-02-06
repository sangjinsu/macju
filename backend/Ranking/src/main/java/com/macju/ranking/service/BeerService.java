package com.macju.ranking.service;

import com.macju.ranking.component.RankingZset;
import com.macju.ranking.domain.BeerLike;
import com.macju.ranking.domain.BeerView;
import com.macju.ranking.repository.BeerLikeRedisRepository;
import com.macju.ranking.repository.BeerViewRedisRepository;
import io.lettuce.core.api.sync.RedisServerCommands;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
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
    @Autowired
    private final RedisTemplate<String,String> redisTemplate = new RedisTemplate<>();

    @Autowired
    RankingZset rankingZset = new RankingZset(redisTemplate);


    @Transactional
    public void saveBeerView(Long beerId, Long memberId) {
        BeerView beerview = new BeerView();
        Optional<BeerView> beer = Optional.ofNullable(beerViewRedisRepository.findByBeerIdAndMemberId(beerId, memberId));
        if (beer.isEmpty()) {
            beerview.setBeerId(beerId);
            beerview.setMemberId(memberId);
            beerViewRedisRepository.save(beerview);
            rankingZset.beerViewCount(beerId);
        } else if (beer.get().getMemberId() != memberId) { // 기존 post 있는 경우에  post 조회한 memberId와 새로운 memberId 비교 후 중복이 아니라면 저장
            beerview.setBeerId(beerId);
            beerview.setMemberId(memberId);
            beerViewRedisRepository.save(beerview);
            rankingZset.beerViewCount(beerId);
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
            rankingZset.beerLikeCountUp(beerId);
        } else if (beer.get().getMemberId() != memberId) { // 기존 post 있는 경우에  post 조회한 memberId와 새로운 memberId 비교 후 중복이 아니라면 저장
            beerlike.setBeerId(beerId);
            beerlike.setMemberId(memberId);
            beerLikeRedisRepository.save(beerlike);
            rankingZset.beerLikeCountUp(beerId);
        } else if (beer.get().getMemberId() == memberId) { // 좋아요 취소
            beerLikeRedisRepository.deleteById(beer.get().getId());
            rankingZset.beerLikeCountDown(beerId);
        }
    }

//    public List<BeerView> fetchBeerView() {
//        List<BeerView> result = (List<BeerView>) beerViewRedisRepository.findAll();
//        return result;
//    }
//
//    public List<BeerLike> fetchBeerLike() {
//        List<BeerLike> result = (List<BeerLike>) beerLikeRedisRepository.findAll();
//        return result;
//    }

    public List<String> getBeerViewId() {
        return rankingZset.getBeerViewId();
    }

    public List<String> getBeerLikeId() {
        return rankingZset.getBeerLikeId();
    }

//    @Transactional
//    public void deleteAll(){
//        beerLikeRedisRepository.deleteAll();
//        beerViewRedisRepository.deleteAll();
//        rankingZset.deleteBeer();
//    }

    public List<String> getPopBeer() {
        List<String> beerLikes = getBeerLikeId();
        List<String> beerViews = getBeerViewId();

        for (String beerId : beerViews) {
            if (!beerLikes.contains(beerId))
                beerLikes.add(beerId);
        }
        return beerLikes;
    }
}
