package com.jianan.task.main;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.concurrent.CountDownLatch;

/**
 * @author sja  created on 2018/4/19.
 */
public class Main {

    public static void main(String[] args) throws Exception{
        ApplicationContext ctx = new ClassPathXmlApplicationContext("spring.xml");
        System.out.println("jianan-task start success");
        new CountDownLatch(1).await();
    }
}
