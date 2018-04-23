import com.jianan.admin.service.api.system.SysFunctionMenuService;
import com.jianan.admin.service.entity.system.SysFunctionMenuInfo;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * @author sja  created on 2018/4/23.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class Test {
    @Autowired
    private SysFunctionMenuService dubboSysFunctionMenuService;

    @org.junit.Test
    public void test(){
        SysFunctionMenuInfo info = new SysFunctionMenuInfo();
        info.setName("test");
        info.setCode("test");
        dubboSysFunctionMenuService.create(info);
    }
}
