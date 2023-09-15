import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw, RouterOptions} from 'vue-router';


// @ts-ignore
export var allowRouter = [

    {
        path: "/a",
        name: 'HelloWord',
        component: () => import("../components/HelloWorld.vue")
    }
    ,
    {

        name: 'userAgreement',
        path: '/',
        component: () => import("@/views/UserAgreement/user-agreement.vue")

    },


];
const router = createRouter({
    mode: 'history',
    history: createWebHistory(), // createWebHistory
    routes: allowRouter as RouteRecordRaw[]
} as RouterOptions);
router.beforeEach((to, from, next) => {
    // console.log('router', to, from);
    next();
    if (!to.meta) {
        to.meta = {}
    }
});
export default router;