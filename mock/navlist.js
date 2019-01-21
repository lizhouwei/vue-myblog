var data = [
    {   id:'2',
        path: '/components',
        componentUrl: '',
        name: '系统组件',
        type:'root',
        pid: '',
        children: [
            {   pid: '2',
                id:'21',
                name: '介绍',
                path: '/components/introduce',
                componentUrl:'components/introduce'
            },
            {   id:'22',
                pid: '2',
                name: '功能类',
                path: '/components/function',
                componentUrl: '',
                children: [
                    {   id:'221',
                         pid: '22',
                        path: '/components/function/permission',
                        name: '详细鉴权',
                        componentUrl: 'components/function/permission'
                    },
                    {   id:'222',
                        pid: '22',
                        path: '/components/function/pageTable',
                        name: '表格分页',
                        componentUrl:'components/function/pageTable'
                    }
                ]
            },
            {    id:'23',
                 pid: '2',
                name: '布局类',
                path: '/components/ui',
                componentUrl: '',
                children: [
                    {   id:'231',
                        pid: '23',
                        path: '/components/ui/pageTitle',
                        name: '页面标题',
                        componentUrl:'components/ui/pageTitle'
                    },
                    {   id:'232',
                        pid: '23',
                        path: '/components/ui/pageSection',
                        name: '子区域',
                        componentUrl:'components/ui/pageSection'
                    },
                    {   id:'233',
                        pid: '23',
                        path: '/components/ui/pageSearch',
                        name: '搜索条',
                        componentUrl:'components/ui/pageSearch'
                    },
                    {id:'234',
                        pid: '23',
                        path: '/components/ui/pageToolbar',
                        name: '工具条',
                        componentUrl:'components/ui/pageToolbar'
                    }
                ]
            },
            {   id:'24',
                pid: '2',
                name: '辅助类',
                path: '/components/assist',
                componentUrl: '',
                children: [
                    {   id:'241',
                        pid: '24',
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
            {   id: '31',
                pid: '3',
                path: '/example/table',
                name: '列表页面',
                permission: ['edit'],
                componentUrl: 'example/table'
            },
            { id: '32',
                pid: '3',
                path: '/example/charts',
                name: '图表页面',
                componentUrl: 'example/charts/index'
            },
            {id: '33',
             pid: '3',
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
            {   id: '41',
                 pid: '4',
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
            {   id: '51',
                pid: '5',
                name: '主题切换',
                path: '/themeChange/index',
                componentUrl:'themeChange/index'
            }
        ]
    },
    {   
    id:'6',
    path: '/blog',
        componentUrl:'',
        name: '博客管理',
        type:'root',
        pid: '',
        children: [
            {   id: '61',
                pid: '6',
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
            {   id: '71',
                pid: '7',
                name: '用户管理',
                path: '/system/user',
                componentUrl:'system/user'
            },
            {   id: '72',
                pid: '7',
                name: '菜单管理',
                path: '/system/resource',
                componentUrl:'system/resource'
            }
        ]
    }
]

export default [{
    path: '/user/navlist',
    data: data
}]