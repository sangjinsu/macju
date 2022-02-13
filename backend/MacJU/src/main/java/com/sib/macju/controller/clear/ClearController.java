package com.sib.macju.controller.clear;


import com.sib.macju.service.clear.ClearService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("clear")
public class ClearController {

    ClearService clearService;

    @DeleteMapping("/post")
    @Scheduled(cron = "0 0 7 * * *", zone = "Asia/Seoul")
    public void deletePost() {
        clearService.deletePost();
    }

    @DeleteMapping("/userhashtag")
    @Scheduled(cron = "0 0 7 * * *", zone = "Asia/Seoul")
    public void deleteUserhashtag() {
        clearService.deleteUserhashtag();
    }


    @DeleteMapping("/es/post")
    @Scheduled(cron = "0 0 7 * * *", zone = "Asia/Seoul")
    public void deleteESPost() {
        clearService.deleteESPost();
    }

    @DeleteMapping("/es/userhashtag")
    @Scheduled(cron = "0 0 7 * * *", zone = "Asia/Seoul")
    public void deleteESUserhashtag() {
        clearService.deleteESUserhashtag();
    }


}
