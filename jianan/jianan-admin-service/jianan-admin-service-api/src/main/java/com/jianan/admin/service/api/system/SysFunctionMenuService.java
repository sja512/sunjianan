package com.jianan.admin.service.api.system;

import com.jianan.admin.service.entity.system.SysFunctionMenuInfo;
import com.jianan.admin.service.query.system.SysFunctionMenuParamInfo;

import java.util.List;

/**
 * @author sja  created on 2018/4/23.
 */
public interface SysFunctionMenuService {

    String create(SysFunctionMenuInfo entity);

    String update(SysFunctionMenuInfo entity);

    int total(SysFunctionMenuParamInfo paramInfo);

    List<SysFunctionMenuInfo> getList(SysFunctionMenuParamInfo paramInfo);
}
