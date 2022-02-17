package com.macju.auth.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/oauth/*");

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.
                csrf().disable();
//                .authorizeRequests()
//                .antMatchers("/member/login/*", "member/createMember", "/error/*", "/member/logout")
//                .permitAll()
//                .anyRequest().authenticated();
    }
}
