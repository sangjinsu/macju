package com.sib.macju.controller.log;

import com.google.gson.Gson;
import com.sib.macju.dto.log.RequestLogDto;
import com.sib.macju.service.beer.BeerService;
import com.sib.macju.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/log")
@RequiredArgsConstructor
@CrossOrigin("*")
@Slf4j
public class LogController {

    @PostMapping()
    public void log(@RequestBody RequestLogDto requestLogDto) {
        Gson gson = new Gson();
        String jsonString = gson.toJson(requestLogDto);
        log.info(jsonString);
    }
}
