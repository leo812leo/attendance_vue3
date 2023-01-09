import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Mainpage from '../views/Mainpage.vue'
import QrcodeGenerator from '../views/QrcodeGenerator.vue'

import store from './../store'

const routes = [
    {
        path: '/',
        name: 'root',
        redirect: '/signin'
    },
    {
        path: '/signin',
        name: 'sign-in',
        component: SignIn
    },
    {
        path: '/mainpage',
        name: 'mainpage',
        component: Mainpage
    },
    {
        path: '/qrcode/generator',
        name: 'QrcodeGenerator',
        component: QrcodeGenerator
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token')
    // 預設是尚未驗證
    let isAuthenticated = false
    // 如果有 token 的話才驗證
    if (token) {
        isAuthenticated = await store.dispatch('fetchCurrentUser')
    }
    // 如果 token 無效則轉址到登入頁
    if (!isAuthenticated && to.name !== 'sign-in') {
        next('/signin')
        return
    }
    // 如果 token 有效則轉址到 mainpage
    if (isAuthenticated && to.name === 'sign-in') {
        next('/mainpage')
        return
    }
    next()
})

export default router;