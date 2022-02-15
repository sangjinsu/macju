package com.macju.ranking.controller;

import com.macju.ranking.service.ClearService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@Component
public class ClearController {

    @Autowired
    ClearService clearService;

    @Scheduled(cron = "0 0 7 * * *", zone = "Asia/Seoul")
    public void clear() {
        clearService.flushALl();
    }
}
