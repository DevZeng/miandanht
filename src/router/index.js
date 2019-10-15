import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import { MessageBox } from 'element-ui';

import Console from '@/components/index/Console'

import Shoplist from '@/components/Shop/Shoplist'
import Newshop from '@/components/Shop/Newshop'
import Joinlist from '@/components/Shop/Joinlist'

import Orderlist from '@/components/Order/Orderlist'

import Userlist from '@/components/User/Userlist'

import Proxylist from '@/components/Agent/Proxylist'
import Commission from '@/components/Agent/Commission'

import Adminlist from '@/components/Role/Adminlist'
import Rolelist from '@/components/Role/Rolelist'
import Roleedit from '@/components/Role/Roleedit'

import Baseset from '@/components/Setting/Baseset'
import Wechatset from '@/components/Setting/Wechatset'

const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
    mode: 'history', 
    routes: [{
        path: '/Login',
        name: '登录',
        component: Login
    },
    {
     leaf: true,
     path: '/',
     name: '商家管理',
     component: Home,
     redirect: '/Shop/Shoplist',
     menuShow: true,
     iconCls: 'iconfont menu-shangjia',
     children: [
     {path: '/Shop/Shoplist',component: Shoplist,name: '商家列表',menuShow: true,meta:{permission: 'storeList'}}, 
     {path: '/Shop/Newshop',component: Newshop,name: '新增店铺',menuShow: false,meta:{permission: 'myStore'}}, 
     ]
 },   
 {
    leaf: true,
    path: '/',
    name: '加盟管理',
    component: Home,
    redirect: '/Shop/Joinlist',
    menuShow: true,
    iconCls: 'iconfont menu-kongzhi',
    children: [
    {path: '/Shop/Joinlist',component: Joinlist,name: '加盟申请',menuShow: true,meta:{permission: 'storeList'}}, 
    ]
},
{
    leaf: true,
    path: '/',
    name: '订单管理',
    component: Home,
    redirect: '/Order/Orderlist',
    menuShow: true,
    iconCls: 'iconfont menu-dingdan',
    children: [
    {path: '/Order/Orderlist',component: Orderlist,name: '充值记录',menuShow: true,meta:{permission: ''}}, 
    ]
}, 
{
    leaf: true,
    path: '/',
    name: '用户',
    component: Home,
    redirect: '/User/Userlist',
    menuShow: true,
    iconCls: 'iconfont menu-yonghu',
    children: [
    {path: '/User/Userlist',component: Userlist,name: '用户列表',menuShow: true,meta:{permission: 'userList'}},
    ]
}, 
{        
    leaf: true,
    path: '/',
    name: '代理',
    component: Home,
    redirect: '/Agent/Proxyapply',
    menuShow: true,
    iconCls: 'iconfont menu-agent',
    children: [
    {path: '/Agent/Proxylist',component: Proxylist,name: '代理管理',menuShow: true,meta:{permission: 'proxyList'}}, 
    ]
}, 
{
    leaf: true,
    path: '/',
    name: '系统',
    component: Home,
    redirect: '/Setting/Baseset',
    menuShow: true,
    iconCls: 'iconfont menu-xitong',
    children: [
    {path: '/Setting/Baseset',component: Baseset,name: '系统设置',menuShow: true,meta:{permission: 'baseConfig'}},
    ]
}, 
{
    leaf: true,
    path: '/',
    name: '权限管理',
    component: Home,
    redirect: '/Role/Adminlist',
    menuShow: true,
    iconCls: 'iconfont menu-quanxian',
    children: [
    {path: '/Role/Adminlist',component: Adminlist,name: '管理员',menuShow: true,meta:{permission: 'adminList'}}, 
    // {path: '/Role/Rolelist',component: Rolelist,name: '角色列表',menuShow: true,meta:{permission: 'roleList'}},
    // {path: '/Role/Roleedit',component: Roleedit,name: '编辑角色',menuShow: false,meta:{permission: 'roleAdd'}} 
    ]
}, 
]
})


// router.beforeEach((to, from, next) => {
//     // next()
//     if (to.path.startsWith('/Login')) {
//         next()
//     } else {
//         let permissions = window.sessionStorage.getItem('permissions')
//         if(!permissions){
//             next({path: '/Login'})
//         }
//         if (to.meta.permission && permissions) {
//             if (permissions.indexOf(to.meta.permission)>-1) {
//               next()
//           } else {
//              MessageBox.alert('没有访问权限', '提示', {
//                 confirmButtonText: '确定',
//                 closeOnPressEscape:false,
//                 showClose:false,
//                 callback: action => {

//                 }
//             });
//          }
//      }else{
//        next() 
//    }
// }
// })

export default router