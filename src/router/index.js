import {createRouter, createWebHashHistory} from 'vue-router'
import { getToken} from "@/utils/system.js";
import {menus} from "@/router/router-config.js";


const router = createRouter({
    history: createWebHashHistory(),
    routes: menus,
    scrollBehavior(to, form, savedPosition) {
        return savedPosition || {top: 0}
    }
})

router.beforeEach((to, from, next) => {
        if (to.meta.token) {
            if (getToken() === null) {
                next({
                    path: '/login',
                    query: {redirect: to.fullPath}
                })
                return
            }
        }
        next()
    }
)

export default router
