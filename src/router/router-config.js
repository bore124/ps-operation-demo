export const menus = [
    {
        path: "/",
        meta: {
            token: true,
        },
        redirect: '/operation',
    },

    {
        name: "operation",
        path: '/operation',
        component: () => import('@/views/main/operation/index.vue')
    },
    {
        name: "404",
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/system/not-find/index.vue')
    },
]
