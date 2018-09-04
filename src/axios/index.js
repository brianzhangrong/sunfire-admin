/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { get,post,postWithCallBack } from './tools';
import * as config from './config';

export const getPros = () => axios.post('http://api.xitu.io/resources/github', {
    category: "trending",
    period: "day",
    lang: "javascript",
    offset: 0,
    limit: 30
}).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});

export const npmDependencies = () => axios.get('./npm.json').then(res => res.data).catch(err => console.log(err));

export const weibo = () => axios.get('./weibo.json').then(res => res.data).catch(err => console.log(err));

const GIT_OAUTH = 'https://github.com/login/oauth';
export const gitOauthLogin = () => axios.get(`${GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`);
export const gitOauthToken = code => axios.post('https://cors-anywhere.herokuapp.com/' + GIT_OAUTH + '/access_token', {...{client_id: '792cdcd244e98dcd2dee',
    client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059', redirect_uri: 'http://localhost:3006/', state: 'reactAdmin'}, code: code}, {headers: {Accept: 'application/json'}})
    .then(res => res.data).catch(err => console.log(err));
export const gitOauthInfo = access_token => axios({
    method: 'get',
    url: 'https://api.github.com/user?access_token=' + access_token,
}).then(res => res.data).catch(err => console.log(err));

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({url: config.MOCK_AUTH_ADMIN});

// 访问权限获取
export const guest = () => get({url: config.MOCK_AUTH_VISITOR});
const headers ={
   "Authorization":"Basic YWRtaW46YWRtaW4=",
   "Access-Control-Allow-Origin":"*",
   'Content-Type': 'application/json;charset=UTF-8',
   "Access-Control-Allow-Methods" : "GET,POST,PUT,OPTIONS",
   "Access-Control-Allow-Credentials" : "true",
   "Access-Control-Allow-Headers": "Content-Type"
}
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const  sunfireAdminSelectRegular=(data,callback)=>postWithCallBack({url:config.SUNFIRE_ADMIN_SELECT_REGULAR,data:data,headers:headers,callback:callback});
export const  sunfireAdminUpdateRegular=(data,callback)=>postWithCallBack({url:config.SUNFIRE_ADMIN_UPDATE_REGULAR,data:data,headers:headers,callback:callback});
export const  sunfireAdminDeleteRegular=(data,callback)=>postWithCallBack({url:config.SUNFIRE_ADMIN_DELETE_REGULAR,data:data,headers:headers,callback:callback});
export const  sunfireAdminInitApp=(data,callback)=>postWithCallBack({url:config.SUNFIRE_ADMIN_INIT_APP,data:data,headers:headers,callback:callback});
export const  sunfireAdminSelectApp = (data,callback)=>postWithCallBack({url:config.SUNFIRE_ADMIN_SELECT_APP,data:data,headers:headers,callback:callback});