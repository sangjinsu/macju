package com.sib.macju.controller.beer;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.beer.BeerMainType;
import com.sib.macju.domain.member.MemberRateBeer;
import com.sib.macju.dto.beer.BeerDto;
import com.sib.macju.dto.beer.RequestEvaluationDto;
import com.sib.macju.dto.beer.ResponseEvaluationDto;
import com.sib.macju.service.beer.BeerService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("v1/beer")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BeerController {

    private final BeerService beerService;

    @GetMapping()
    public List<BeerDto> fetchBeers(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        List<Beer> beers = beerService.fetchBeers(PageRequest.of(page, size));
        return beers.stream().map(BeerDto::new).collect(Collectors.toList());
    }

    @GetMapping("/{beerId}")
    public ResponseEntity<BeerDto> fetchBeerDetail(@PathVariable Long beerId) {
        Optional<Beer> foundBeer = beerService.fetchBeer(beerId);
        if (foundBeer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Beer beer = foundBeer.get();
        return ResponseEntity.status(HttpStatus.OK).body(new BeerDto(beer));
    }

    @GetMapping("/{search}/type")
    public List<BeerDto> fetchBeersByBeerType(@PathVariable("search") String search) {
        String firstLetter = search.substring(0, 1).toUpperCase();
        String remainLetter = search.substring(1).toLowerCase();
        BeerMainType beerMainType = BeerMainType.valueOf(firstLetter + remainLetter);
        List<Beer> beers = beerService.fetchBeersByBeerType(beerMainType);
        return beers.stream().map(BeerDto::new).collect(Collectors.toList());
    }

    @PostMapping("/{beerId}/member/{memberId}")
    public HttpStatus createEvaluation(
            @PathVariable Long beerId,
            @PathVariable Long memberId,
            @RequestBody RequestEvaluationDto requestEvaluationDto) {

        if(requestEvaluationDto.getAromaHashTags().size() == 0 && requestEvaluationDto.getFlavorHashTags().size() == 0){
            //getAromaHashTags getAromaHashTags 둘 다 사이즈가 0이면 해시태그를 하나도 입력 안 했으므로 반환
            return HttpStatus.BAD_REQUEST;
        }

        beerService.createEvaluation(
                beerId,
                memberId,
                requestEvaluationDto.getRate(),
                requestEvaluationDto.getAromaHashTags(),
                requestEvaluationDto.getFlavorHashTags()
        );
        return HttpStatus.CREATED;
    }

    @PutMapping("/{beerId}/member/{memberId}")
    public HttpStatus updateEvaluation(
            @PathVariable Long beerId,
            @PathVariable Long memberId,
            @RequestBody RequestEvaluationDto requestEvaluationDto) {

        if(requestEvaluationDto.getAromaHashTags().size() == 0 && requestEvaluationDto.getFlavorHashTags().size() == 0){
            //getAromaHashTags getAromaHashTags 둘 다 사이즈가 0이면 해시태그를 하나도 입력 안 했으므로 반환
            return HttpStatus.BAD_REQUEST;
        }

        beerService.updateEvaluation(
                beerId,
                memberId,
                requestEvaluationDto.getRate(),
                requestEvaluationDto.getAromaHashTags(),
                requestEvaluationDto.getFlavorHashTags()
        );
        return HttpStatus.ACCEPTED;
    }

    @GetMapping("/{beerId}/member/{memberId}")
    public ResponseEntity<ResponseEvaluationDto> fetchEvaluationByMemberId(
            @PathVariable Long beerId,
            @PathVariable Long memberId) {
        Optional<MemberRateBeer> foundMemberRateBeer = beerService.fetchEvaluationByMemberId(beerId, memberId);
        if (foundMemberRateBeer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        MemberRateBeer memberRateBeer = foundMemberRateBeer.get();

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseEvaluationDto(memberRateBeer));
    }
}
