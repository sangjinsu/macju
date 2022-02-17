package com.sib.macju.config;

import com.sib.macju.service.member.MemberService;
//import com.sib.macju.service.member.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@RequiredArgsConstructor
//@EnableWebSecurity
@Configuration
public class SecurityConfig {//extends WebSecurityConfigurerAdapter {

    private final MemberService memberService;

//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        web.ignoring().antMatchers("/member/","/member/validateNickName/*");
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.
//                csrf().disable()
//                .authorizeRequests()
//                .antMatchers("/member/login/*", "member/createMember", "/error/*", "/member/logout")
//                .permitAll()
//                .anyRequest().authenticated();
//    }
}
