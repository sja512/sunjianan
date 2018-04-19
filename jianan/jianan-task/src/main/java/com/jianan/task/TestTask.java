package com.jianan.task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * @author sja  created on 2018/4/19.
 */
@Component
public class TestTask {
    private static final Logger logger = LoggerFactory.getLogger(TestTask.class);
    public void task(){

        logger.info("--- task start");
        logger.info("--- task end");

    }
}
