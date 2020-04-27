export interface MenuInterface {
    path?: string,
    component?: string,
    icon?: string,
    name:string,
    children?: MenuInterface[]
}

const menuConfig: MenuInterface[] = [
    {

        icon: 'iconshouye',
        name:'Want首页',
        path:'/',
        component: 'index/index',
    },
    {
        icon: 'iconqiye',
        name:'企业园区管理',
        path:'/enterprise',
        children: [
            {
                path: '/enterprise/company',
                component: 'enterprise/Company',
                name:'企业监管',
            },
            {
                path: '/enterprise/park',
                component: 'demo/index',
                name:'园区监管',
            },
            {
                path: '/enterprise/project',
                component: 'demo/index2',
                name:'项目监管',
            }
        ]
    },

    {

        icon: 'iconjinshukuangshanmetalMines',
        name:'一级路由',
        path:'/mine',
        component: 'demo/index',
    },

];

export default menuConfig;


