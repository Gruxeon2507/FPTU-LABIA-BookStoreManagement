///*
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
// */
//package com.labia.bookstoremanagement.configuration;
//
//import org.springframework.context.annotation.Configuration;
//
///**
// *
// * @author kmd
// */
//@Configuration
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//  @Override
//  protected void configure(HttpSecurity http) throws Exception {
//    http
//      .authorizeRequests()
//        .antMatchers("/api/auth/login").permitAll()
//        .anyRequest().authenticated()
//        .and()
//      .formLogin()
//        .and()
//      .logout()
//        .logoutUrl("/api/logout")
//        .deleteCookies("JSESSIONID")
//        .and()
//      .sessionManagement()
//        .sessionFixation().migrateSession()
//        .invalidSessionUrl("/api/login")
//        .maximumSessions(1);
//  }
//
//  @Override
//  public void configure(WebSecurity web) throws Exception {
//    web.ignoring().antMatchers("/api/checkSession");
//  }