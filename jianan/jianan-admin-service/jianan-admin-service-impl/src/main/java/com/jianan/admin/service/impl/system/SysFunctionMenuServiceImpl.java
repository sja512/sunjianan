package com.jianan.admin.service.impl.system;

import com.alibaba.fastjson.JSONObject;
import com.jianan.admin.service.api.system.SysFunctionMenuService;
import com.jianan.admin.service.dao.system.SysFunctionMenuDao;
import com.jianan.admin.service.entity.system.SysFunctionMenuInfo;
import com.jianan.admin.service.query.system.SysFunctionMenuParamInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 系统功能菜单服务
 * @author sja  created on 2018/4/23.
 */
@Service
public class SysFunctionMenuServiceImpl implements SysFunctionMenuService {
    private static final Logger logger = LoggerFactory.getLogger(SysFunctionMenuServiceImpl.class);
    @Autowired
    private SysFunctionMenuDao dao;

    @Override
    public String create(SysFunctionMenuInfo entity) {
        try {
            dao.create(entity);
            return "保存成功";
        } catch (Exception e) {
            logger.error("--- invoke method:create arguments[{}] is error:{}", JSONObject.toJSONString(entity),e);
            return "保存失败";
        }
    }

    @Override
    public String update(SysFunctionMenuInfo entity) {
        return null;
    }

    @Override
    public int total(SysFunctionMenuParamInfo paramInfo) {
        return 0;
    }

    @Override
    public List<SysFunctionMenuInfo> getList(SysFunctionMenuParamInfo paramInfo) {
        return null;
    }
}
