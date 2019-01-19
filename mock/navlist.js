var data = [
    {
        id:'13233',
        path: '/home',
        componentUrl: '',
        name: '首页',
        type:'1',
        pid: '' ,
        children: [
            {   
                name: '首页',
                path: '',
                componentUrl:'home/adminHome'
            },
        ]
    },
    {   id:'2',
        path: '/components',
        componentUrl: '',
        name: '系统组件',
        type:'root',
        pid: '',
        children: [
            {   
                name: '介绍',
                path: '/components/introduce',
                componentUrl:'components/introduce'
            },
            {   
                name: '功能类',
                path: '/components/function',
                componentUrl: '',
                children: [
                    {
                        path: '/components/function/permission',
                        name: '详细鉴权',
                        componentUrl: 'components/function/permission'
                    },
                    {
                        path: '/components/function/pageTable',
                        name: '表格分页',
                        componentUrl:'components/function/pageTable'
                    }
                ]
            },
            {    
                name: '布局类',
                path: '/components/ui',
                componentUrl: '',
                children: [
                    {
                        path: '/components/ui/pageTitle',
                        name: '页面标题',
                        componentUrl:'components/ui/pageTitle'
                    },
                    {
                        path: '/components/ui/pageSection',
                        name: '子区域',
                        componentUrl:'components/ui/pageSection'
                    },
                    {
                        path: '/components/ui/pageSearch',
                        name: '搜索条',
                        componentUrl:'components/ui/pageSearch'
                    },
                    {
                        path: '/components/ui/pageToolbar',
                        name: '工具条',
                        componentUrl:'components/ui/pageToolbar'
                    }
                ]
            },
            {
                name: '辅助类',
                path: '/components/assist',
                componentUrl: '',
                children: [
                    {
                        path: '/components/assist/pageNotes',
                        name: '引用说明',
                        componentUrl:'components/assist/pageNotes'
                    }
                ]
            }
        ]
    },
    {   id: '3',
        path: '/example',
        name: '完整示例',
        type:'root',
        pid: '',
        componentUrl: '',
        children: [
            {
                path: '/example/table',
                name: '列表页面',
                permission: ['edit'],
                componentUrl: 'example/table'
            },
            {
                path: '/example/charts',
                name: '图表页面',
                componentUrl: 'example/charts/index'
            },
            {
                path: '/example/map',
                name: '地图页面',
                componentUrl: 'example/map/index'
            }
        ]
    },
    {   id:'4',
        path: '/i18n',
        componentUrl: '',
        name: '国际化',
        type:'root',
        pid: '',
        children: [
            {   
                name: '国际化',
                path: '/i18n/index',
                componentUrl:'i18n/index'
            }
        ]
    },
    {   id:'5',
        path: '/themeChange',
        componentUrl:'',
        name: '主题切换',
        type:'root',
        pid: '',
        children: [
            {   
                name: '主题切换',
                path: '/themeChange/index',
                componentUrl:'themeChange/index'
            }
        ]
    },
    {   id:'6',
        path: '/blog',
        componentUrl:'',
        name: '博客管理',
        type:'root',
        pid: '',
        children: [
            {   
                name: '博客管理',
                path: '/blog/addBlog',
                componentUrl:'blog/addBlog'
            }
        ]
    },
    {   id:'7',
        path: '/system',
        componentUrl:'',
        name: '系统管理',
        type:'root',
        pid: '',
        children: [
            {   
                name: '用户管理',
                path: '/system/user',
                componentUrl:'system/user'
            }
        ]
    }
]

export default [{
    path: '/user/navlist',
    data: data
}]