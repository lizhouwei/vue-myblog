const Layout = () => import(/* webpackChunkName: 'index' */ 'views/layout/index.vue')

const staticRoute = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: 'login' */ 'views/login/index.vue')
    } 
]
const asyncRouter = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: 'login' */ 'views/login/index.vue')
    },
    {
        path: '/home',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import(/* webpackChunkName: 'home' */ 'views/home/adminHome'),
            }
        ],
        meta: {
            title: "首页",
            icon: "form"
        }
    },
    {
        path: '/components',
        component: Layout,
        children: [
            {                  
                path: 'introduce',
                component: () => import(/* webpackChunkName: 'components' */ 'views/components/introduce.vue')
            },
            {
                path: 'assist',
                component: {render (c) { return c('router-view') }},
                children: [
                    {
                        path: 'pageNotes',
                        component: () => import(/* webpackChunkName: 'components' */ 'views/components/assist/pageNotes')
                    },
                ]
            },
            {
                path: 'function',
                component: {render (c) { return c('router-view') }},
                children: [
                    {
                        path: 'permission',
                        component: () => import(/* webpackChunkName: 'components' */ 'views/components/function/permission.vue')
                    },
                    {
                        path: 'pageTable',
                        component: () => import(/* webpackChunkName: 'components' */ 'views/components/function/pageTable.vue')
                    }
                ]
            },
            {
                path: 'ui',
                component: {render (c) { return c('router-view') }},
                children: [
                    {
                        path: 'pageSearch',
                        component: () => import(/* webpackChunkName: 'components' */ 'views/components/ui/pageSearch.vue')
                    },
                    {
                        path: 'pageSection',
                        component: () => import(/* webpackChunkName: 'components' */ 'views/components/ui/pageSection.vue')
                    },
                    {
                        path: 'pageTitle',
                        component: () => import(/* webpackChunkName: 'components' */ 'views/components/ui/pageTitle.vue')
                    },
                    {
                        path: 'pageToolbar',
                        component: () => import(/* webpackChunkName: 'components' */ 'views/components/ui/pageToolbar.vue')
                    }      
                ]
            }
        ]
    },
    {
        path: '/example',
        component: Layout,
        children: [
            {
                path: 'table',
                component: () => import(/* webpackChunkName: 'example' */ 'views/example/table.vue')
            },
            {
                path: 'charts',
                component: () => import(/* webpackChunkName: 'example' */ 'views/example/charts/index.vue')
            },
            {
                path: 'map',
                component: () => import(/* webpackChunkName: 'example' */ 'views/example/map/index.vue')
            }
        ]
    },
    {
        path: '/i18n',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import(/* webpackChunkName: 'i18n' */ 'views/i18n/index.vue')
            }
        ]
    },
    {
        path: '/themeChange',
        component: Layout,
        children: [
            {
                path: 'index',
                component: () => import(/* webpackChunkName: 'themeChange' */ 'views/themeChange/index.vue')
            }
        ]
    },
    {
        path: '*',
        redirect: '/error/404'
    }
]
export default staticRoute