import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
import router from '../router/index'

axios.defaults.timeout = 1500000
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'


//请求拦截器
axios.interceptors.request.use(config => {
	if (config.method === 'post') {
		config.data = qs.stringify(config.data)
	}
	return config
}, 
error => {

	console.log('错误的传参！')
})


//响应拦截器
axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		// console.log(error)
		if(error.response.status==401){
			var that=this;
			MessageBox.alert('请重新登录', '登录超时', {
				confirmButtonText: '确定',
				closeOnPressEscape:false,
				showClose:false,
				callback: action => {
					if(action=='confirm'){
						router.push('/login');
					}
				}
			});
		}else{
			Message({
				message: error.response.data.msg,
				type: 'error'
			});
		}
		return Promise.reject(error)
	})


// let hosturl = 'http://192.168.1.172/Shop/public/'
let hosturl ='https://mian.shangzhunzs.com/'

let base = hosturl

export default hosturl

//登录
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data) }

export const requestLogout = params => { return axios.get(`${base}/logout`+`${params}`).then(res => res.data)}

//统计数据
export const countdataGet = params => { return axios.get(`${base}/count`+`${params}`).then(res => res.data)}


//加盟
export const applyGet = params => { return axios.get(`${base}/store/applies`+`${params}`).then(res => res.data)}

export const applyCheck = params => { return axios.get(`${base}/check/apply`+`${params}`).then(res => res.data)}


//店铺
export const shopPost = params => { return axios.post(`${base}/store`, params).then(res => res.data)}

export const shopGet = params => { return axios.get(`${base}/stores`+`${params}`).then(res => res.data)}

export const shoponeGet = params => { return axios.get(`${base}/store`+`${params}`).then(res => res.data)}

export const storeCheck = params => { return axios.get(`${base}/check/store`+`${params}`).then(res => res.data)}

export const storeDel = params => { return axios.delete(`${base}/store`+`${params}`).then(res => res.data)}


export const bindshop = params => { return axios.get(`${base}/bind/store`+`${params}`).then(res => res.data)}

export const tixianPost = params => { return axios.post(`${base}/withdraw`, params).then(res => res.data)}


// export const unbindshop = params => { return axios.get(`${base3}/unbind/user`+`${params}`).then(res => res.data)}





// 设置
export const baseset = params => { return axios.post(`${base}/config`, params).then(res => res.data)}

export const baseget = params => { return axios.get(`${base}/config`+`${params}`).then(res => res.data)}










//订单
export const allorderGet = params => { return axios.get(`${base}/orders`+`${params}`).then(res => res.data)}

//用户
export const userGet = params => { return axios.get(`${base}/users`+`${params}`).then(res => res.data)}

//分销
export const agentGet = params => { return axios.get(`${base}/proxy/users`+`${params}`).then(res => res.data)}

export const proxyGet = params => { return axios.get(`${base}/user/amount/records`+`${params}`).then(res => res.data)}

export const ratioPost = params => { return axios.post(`${base}/ratio`, params).then(res => res.data)}

export const ratioGet = params => { return axios.get(`${base}/ratio`+`${params}`).then(res => res.data)}

export const comGetAll = params => { return axios.get(`${base}/brokerages`+`${params}`).then(res => res.data)}

//管理员
export const adminGet = params => { return axios.get(`${base}/admins`+`${params}`).then(res => res.data)}

export const adminPost = params => { return axios.post(`${base}/admin`, params).then(res => res.data)}

export const adminDel = params => { return axios.delete(`${base}/user`+`${params}`).then(res => res.data)}






//角色
export const permissionGet = params => { return axios.get(`${base}/permissions`+`${params}`).then(res => res.data)}

export const roleGet = params => { return axios.get(`${base}/roles`+`${params}`).then(res => res.data)}

export const rolePost = params => { return axios.post(`${base}/role`, params).then(res => res.data)}

export const roleDel = params => { return axios.delete(`${base}/role`+`${params}`).then(res => res.data)}

export const defaultrole = params => { return axios.get(`${base}/default/role`+`${params}`).then(res => res.data)}

//微信设置
export const wxconfigPost = params => { return axios.post(`${base}/tx/config`, params).then(res => res.data)}

export const wxconfigGet = params => { return axios.get(`${base}/tx/config`+`${params}`).then(res => res.data)}

export const wxmodelPost = params => { return axios.post(`${base}/notify/config`, params).then(res => res.data)}

export const wxmodelGet = params => { return axios.get(`${base}/notify/configs`+`${params}`).then(res => res.data)}

//海报
export const posterPost = params => { return axios.post(`${base}/poster/configs`, params).then(res => res.data)}

export const posterGet = params => { return axios.get(`${base}/poster/configs`+`${params}`).then(res => res.data)}