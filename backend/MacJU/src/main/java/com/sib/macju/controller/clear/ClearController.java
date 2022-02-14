package com.sib.macju.controller.clear;


import com.sib.macju.service.clear.ClearService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Component
@RequiredArgsConstructor
public class ClearController {

    ClearService clearService;

    @Scheduled(cron = "0 26 11 * * *", zone = "Asia/Seoul")
    public void deletePost() {
        clearService.deletePost();
    }

    @Scheduled(cron = "0 26 11 * * *", zone = "Asia/Seoul")
    public void deleteUserHashTag() {
        clearService.deleteUserhashtag();
    }


    @Scheduled(cron = "0 10 11 * * *", zone = "Asia/Seoul")
    public void deleteESPost() {
        clearService.deleteESPost();
    }

    @Scheduled(cron = "0 10 11 * * *", zone = "Asia/Seoul")
    public void deleteESUserHashTag() {
        clearService.deleteESUserhashtag();
    }
}
