package com.jianan.admin.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author sja  created on 2018/4/21.
 */
@Controller
@RequestMapping("/login")
public class LoginController {

    @RequestMapping(value = "")
    public String getForm(){
        return "index";
    }

    @RequestMapping(value = "json")
    @ResponseBody
    public String getJson(){
        return "aaa";
    }
}
