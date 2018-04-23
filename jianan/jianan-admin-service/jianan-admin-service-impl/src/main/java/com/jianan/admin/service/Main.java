package com.jianan.admin.service;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.concurrent.CountDownLatch;

/**
 * @author sja  created on 2018/4/23.
 */
public class Main {

    public static void main(String[] args) throws Exception{
        ApplicationContext ctx = new  ClassPathXmlApplicationContext("spring.xml");
        System.out.println("app start success");
        new CountDownLatch(1).await();
    }
}
