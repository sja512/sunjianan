package com.jianan.admin.service.dao.system;

import com.jianan.admin.service.entity.system.SysFunctionMenuInfo;
import com.jianan.admin.service.mybatis.MyBatisRepository;
import com.jianan.admin.service.query.system.SysFunctionMenuParamInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author sja  created on 2018/4/23.
 */
@MyBatisRepository
public interface SysFunctionMenuDao {

    Integer create(SysFunctionMenuInfo entity);

//    int update(SysFunctionMenuInfo entity);
//
//    int total(@Param(value = "paramInfo") SysFunctionMenuParamInfo paramInfo);
//
//    List<SysFunctionMenuInfo> getList(@Param(value = "paramInfo") SysFunctionMenuParamInfo paramInfo);
}
