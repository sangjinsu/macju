package com.sib.macju.service.beer;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.beer.BeerMainType;
import com.sib.macju.domain.member.Member;
import com.sib.macju.domain.member.MemberRateBeer;
import com.sib.macju.domain.member.RateHasAromaHashTag;
import com.sib.macju.domain.member.RateHasFlavorHashTag;
import com.sib.macju.repository.beer.BeerRepository;
import com.sib.macju.repository.beer.MemberRateBeerRepository;
import com.sib.macju.repository.hashtag.AromaHashTagRepository;
import com.sib.macju.repository.hashtag.FlavorHashTagRepository;
import com.sib.macju.repository.member.MemberRepository;
import com.sib.macju.repository.member.RateHasAromaHashTagRepository;
import com.sib.macju.repository.member.RateHasFlavorHashTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BeerService {

    private final BeerRepository beerRepository;
    private final MemberRepository memberRepository;
    private final MemberRateBeerRepository memberRateBeerRepository;
    private final AromaHashTagRepository aromaHashTagRepository;
    private final FlavorHashTagRepository flavorHashTagRepository;
    private final RateHasAromaHashTagRepository rateHasAromaHashTagRepository;
    private final RateHasFlavorHashTagRepository rateHasFlavorHashTagRepository;


    public Optional<Beer> fetchBeer(Long beerId) {
        return beerRepository.findById(beerId);
    }

    public List<Beer> fetchBeers(Pageable pageable) {
        return beerRepository.findAllWithBeerType(pageable);
    }

    public List<Beer> fetchBeersByBeerType(BeerMainType beerMainType) {
        return beerRepository.findByBeerMainType(beerMainType);
    }

    @Transactional
    public void createEvaluation(Long beerId, Long memberId, int rate, List<Long> aromaHashTagIds, List<Long> flavorHashTagIds) {
        Optional<Beer> beer = beerRepository.findById(beerId);
        Optional<Member> member = memberRepository.findById(memberId);
        if (beer.isEmpty() || member.isEmpty()) {
            return;
        }

        if (memberRateBeerRepository.findByBeerIdAndMemberId(beerId, memberId).isPresent()) {
            return;
        }

        MemberRateBeer memberRateBeer = MemberRateBeer.createMemberRateBeer(beer.get(), member.get(), rate);

        memberRateBeerRepository.save(memberRateBeer);

        saveRateHasHashTags(aromaHashTagIds, flavorHashTagIds, memberRateBeer);
    }

    @Transactional
    public void updateEvaluation(Long beerId, Long memberId, int rate, List<Long> aromaHashTagIds, List<Long> flavorHashTagIds) {
        Optional<MemberRateBeer> foundMemberRateBeer = memberRateBeerRepository.findByBeerIdAndMemberId(beerId, memberId);

        if (foundMemberRateBeer.isEmpty()) {
            return;
        }

        MemberRateBeer memberRateBeer = foundMemberRateBeer.get();
        memberRateBeer.setRate(rate);

        memberRateBeer.getRateHasAromaHashTags().clear();
        memberRateBeer.getRateHasFlavorHashTags().clear();

        saveRateHasHashTags(aromaHashTagIds, flavorHashTagIds, memberRateBeer);

    }

    private void saveRateHasHashTags(List<Long> aromaHashTagIds, List<Long> flavorHashTagIds, MemberRateBeer memberRateBeer) {
        List<RateHasAromaHashTag> aromaHashTags =
                aromaHashTagRepository.findAllById(aromaHashTagIds)
                        .stream()
                        .map(aromaHashTag -> RateHasAromaHashTag.createRateHasAromaHashTag(aromaHashTag, memberRateBeer))
                        .collect(Collectors.toList());
        List<RateHasFlavorHashTag> flavorHashTags =
                flavorHashTagRepository.findAllById(flavorHashTagIds)
                        .stream()
                        .map(flavorHashTag -> RateHasFlavorHashTag.createRateHasFlavorHashTag(flavorHashTag, memberRateBeer))
                        .collect(Collectors.toList());

        rateHasAromaHashTagRepository.saveAll(aromaHashTags);
        rateHasFlavorHashTagRepository.saveAll(flavorHashTags);
    }

    public Optional<MemberRateBeer> fetchEvaluationByMemberId(Long beerId, Long memberId) {
        return memberRateBeerRepository.findByBeerIdAndMemberId(beerId, memberId);
    }


}
