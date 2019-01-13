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
                componentUrl:'views/home/adminHome'
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
                componentUrl:'views/components/introduce'
            },
            {   
                name: '功能类',
                path: 'function',
                componentUrl: '',
                children: [
                    {
                        path: '/components/function/permission',
                        name: '详细鉴权',
                        componentUrl: 'views/components/function/permission'
                    },
                    {
                        path: '/components/function/pageTable',
                        name: '表格分页',
                        componentUrl:'views/components/function/pageTable'
                    }
                ]
            },
            {    
                name: '布局类',
                path: 'ui',
                componentUrl: '',
                children: [
                    {
                        path: '/components/ui/pageTitle',
                        name: '页面标题',
                        componentUrl:'views/components/ui/pageTitle'
                    },
                    {
                        path: '/components/ui/pageSection',
                        name: '子区域',
                        componentUrl:'views/components/ui/pageSection'
                    },
                    {
                        path: '/components/ui/pageSearch',
                        name: '搜索条',
                        componentUrl:'views/components/ui/pageSearch'
                    },
                    {
                        path: '/components/ui/pageToolbar',
                        name: '工具条',
                        componentUrl:'views/components/ui/pageToolbar'
                    }
                ]
            },
            {
                name: '辅助类',
                path: 'assist',
                componentUrl: '',
                children: [
                    {
                        path: '/components/assist/pageNotes',
                        name: '引用说明',
                        componentUrl:'views/components/assist/pageNotes'
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
                componentUrl: 'views/example/table'
            },
            {
                path: '/example/charts',
                name: '图表页面',
                componentUrl: 'views/example/charts/index'
            },
            {
                path: '/example/map',
                name: '地图页面',
                componentUrl: 'views/example/map/index'
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
                componentUrl:'views/i18n/index'
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
                componentUrl:'views/themeChange/index'
            }
        ]
    }
]

export default [{
    path: '/user/navlist',
    data: data
}]