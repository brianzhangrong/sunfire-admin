/**
 * Created by 叶子 on 2017/7/30.
 * 接口地址配置文件
 */

//easy-mock模拟数据接口地址
const EASY_MOCK = 'https://www.easy-mock.com/mock';
const MOCK_AUTH = EASY_MOCK + '/597b5ed9a1d30433d8411456/auth';         // 权限接口地址
export const MOCK_AUTH_ADMIN = MOCK_AUTH + '/admin';                           // 管理员权限接口
export const MOCK_AUTH_VISITOR = MOCK_AUTH + '/visitor';                       // 访问权限接口
export const SUNFIRE_ADMIN ='http://localhost:11111'
export const SUNFIRE_ADMIN_SELECT_REGULAR=SUNFIRE_ADMIN+"/selectRegular"
export const SUNFIRE_ADMIN_UPDATE_REGULAR=SUNFIRE_ADMIN+"/updateRegular"
export const SUNFIRE_ADMIN_DELETE_REGULAR=SUNFIRE_ADMIN+"/deleteRegular"
export const SUNFIRE_ADMIN_INIT_APP=SUNFIRE_ADMIN+"/init"
export const SUNFIRE_ADMIN_SELECT_APP=SUNFIRE_ADMIN+"/selectApp"


