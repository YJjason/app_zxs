/**
 * +----------------------------------------------------------------------
 * | menuConfig | Author: 1009239228@qq.com
 * +----------------------------------------------------------------------
 */

const menuList = [
    {
        title: '首页',
        key: '/home'
    },
    {
        title: '内容管理',
        key: '/admin/content',
        children: [
            {
                title: '材料分类榜单管理',
                key: '/admin/content/materialClassify',
            },
            {
                title: '材料品牌榜单管理',
                key: '/admin/content/materialBill',
            },
            {
                title: '预算版本管理',
                key: '/admin/content/budgetVersion',
            },
            {
                title: '预算类目管理',
                key: '/admin/content/budgetClassify',
            },
            {
                title: '对比管理',
                key: '/admin/content/contrast',
            },
            {
                title: '经验管理',
                key: '/admin/content/experience',
            },
            {
                title: '文章管理',
                key: '/admin/content/article',
            },
            {
                title: '话题管理',
                key: '/admin/content/topic',
            }
        ]
    },
    {
        title: '升级管理',
        key: '/admin/upgrade'
    },

    {
        title: '运营管理',
        key: '/admin/manager',
        children: [
            {
                title: '封面管理',
                key: '/admin/manager/cover',
            },
            {
                title: '广告位管理',
                key: '/admin/manager/ad',
            }
        ]
    },

    {
        title: '用户管理',
        key: '/admin/user',
        children: [
            {
                title: '封面管理',
                key: '/admin/user/feedback',
            },
            {
                title: '广告位管理',
                key: '/admin/user/list',
            }
        ]
    },
]

/*const menuList = [
    {
        title: '首页',
        key: '/home'
    },
    {
        title: 'UI',
        key: '/admin/ui',
        children: [
            {
                title: '按钮',
                key: '/admin/ui/buttons',
            },
            {
                title: '弹框',
                key: '/admin/ui/modals',
            },
            {
                title: 'Loading',
                key: '/admin/ui/loadings',
            },
            {
                title: '通知提醒',
                key: '/admin/ui/notification',
            },
            {
                title: '全局Message',
                key: '/admin/ui/messages',
            },
            {
                title: 'Tab页签',
                key: '/admin/ui/tabs',
            },
            {
                title: '图片画廊',
                key: '/admin/ui/gallery',
            },
            {
                title: '轮播图',
                key: '/admin/ui/carousel',
            }
        ]
    },
    {
        title: '表单',
        key: '/form',
        children: [
            {
                title: '登录',
                key: '/form/login',
            },
            {
                title: '注册',
                key: '/form/reg',
            }
        ]
    },
    {
        title: '表格',
        key: '/table',
        children: [
            {
                title: '基础表格',
                key: '/table/basic',
            },
            {
                title: '高级表格',
                key: '/table/high',
            }
        ]
    },
    {
        title: '富文本',
        key: '/rich'
    },
    {
        title: '城市管理',
        key: '/city'
    },
    {
        title: '订单管理',
        key: '/order',
        btnList: [
            {
                title: '订单详情',
                key: 'detail'
            },
            {
                title: '结束订单',
                key: 'finish'
            }
        ]
    },
    {
        title: '员工管理',
        key: '/user'
    },
    {
        title: '车辆地图',
        key: '/bikeMap'
    },
    {
        title: '图标',
        key: '/charts',
        children: [
            {
                title: '柱形图',
                key: '/charts/bar'
            },
            {
                title: '饼图',
                key: '/charts/pie'
            },
            {
                title: '折线图',
                key: '/charts/line'
            },
        ]
    },
    {
        title: '权限设置',
        key: '/permission'
    },
];*/
export default menuList;
