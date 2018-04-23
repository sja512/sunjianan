package com.jianan.admin.service.impl.system;

import com.jianan.admin.service.api.system.SysFunctionMenuService;
import com.jianan.admin.service.entity.system.SysFunctionMenuInfo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

/**
 * @author sja  created on 2018/4/23.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:spring.xml")
public class SysFunctionMenuServiceImplTest {
    @Autowired
    private SysFunctionMenuService service;
    @Test
    public void create() throws Exception {
        SysFunctionMenuInfo info = new SysFunctionMenuInfo();
        info.setCode("sja");
        info.setName("sja");
        service.create(info);
    }

    @Test
    public void update() throws Exception {
    }

    @Test
    public void total() throws Exception {
    }

    @Test
    public void getList() throws Exception {
    }

}