import Main from "@/views/Main.vue";

export const loginRouter = {
    path: "/login",
    name: "login",
    title: "Login - 登录",
    component: () => import("@/views/Login.vue")
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: "/",
    name: "otherRouter",
    redirect: "/home",
    component: Main,
    children: []
};

export const appRouter = [
    {
        path: "/",
        name: "home",
        meta: {
            title: '主页'
        },
        component: Main,
        children: [
            {
                path: "/home",
                meta: {
                    title: '主页'
                },
                name: "home",
                icon: "ios-home",
                img: "/images/index.png",
                component: () => import("@/views/Home.vue")
            }
        ]
    },
    {
        path: "/system",
        icon: "android-checkbox",
        name: "system",
        meta: {
            title: '系统管理'
        },
        img: "/images/system.png",
        component: Main,
        children: [
            {
                path: "/user",
                meta: {
                    title: '人员管理'
                },
                name: "user",
                icon: "arrow-swap",
                img: "/images/system.png"
            },
            {
                path: "/log",
                meta: {
                    title: '系统日志'
                },
                name: "log",
                icon: "arrow-swap",
                img: "/images/system.png"
            }
        ]
    }
];

export const routers = [loginRouter, otherRouter, ...appRouter];
