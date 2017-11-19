import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Page1 from './views/nav1/Page1.vue'

let routes = [
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-setting',//图标样式class
        leaf: true,//只有一个节点
        children: [
            { path: '/', component: Page1, name: '维护项' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;