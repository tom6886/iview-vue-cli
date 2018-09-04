import {appRouter, otherRouter} from "@/router/router";
import {router} from '@/router/index';

const app = {
    state: {
        routers: [otherRouter, ...appRouter],
        dynamicRouters: [],// 动态路由
        menuList: appRouter, // 菜单数组
        openedSubmenuArr: [], // 要展开的菜单数组
        currentPageName: "",
        pageOpenedList: [
            {
                meta: {
                    title: '主页'
                },
                path: "/home",
                name: "home"
            }
        ],
        currentPath: [] // 面包屑数组
    },
    mutations: {
        updateAppRouter(state, routes) {
            state.dynamicRouters.push(...routes);
            state.routers.push(...routes);
            router.addRoutes(routes);
        },
        updateMenulist(state, routes) {
            state.menuList.push(...routes);
        },
        addOpenSubmenu(state, name) {
            if (state.openedSubmenuArr.indexOf(name) === -1 && name.length > 0) {
                state.openedSubmenuArr.push(name);
            }
        },
        clearOpenedSubmenu(state) {
            state.openedSubmenuArr.length = 0;
        },
        setCurrentPageName(state, name) {
            state.currentPageName = name;
        },
        setCurrentPath(state, pathArr) {
            state.currentPath = pathArr;
        },
        setOpenedList(state) {
            state.pageOpenedList = localStorage.pageOpenedList
                ? JSON.parse(localStorage.pageOpenedList)
                : [
                    {
                        meta: {
                            title: '主页'
                        },
                        path: "/home",
                        name: "home"
                    }
                ];
        },
        removeTag(state, name) {
            let _item = state.pageOpenedList.find(x => x.name === name);
            if (_item) {
                state.pageOpenedList.splice(state.pageOpenedList.indexOf(_item), 1);
            }
        },
        pageOpenedList(state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            // localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags(state) {
            state.pageOpenedList.splice(1);
            // localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags(state, name) {
            let _current = state.pageOpenedList.find(x => x.name === name);

            if (!_current) {
                state.pageOpenedList.splice(1);
            } else {
                let _currentIndex = state.pageOpenedList.indexOf(_current);
                state.pageOpenedList.splice(_currentIndex + 1);
                state.pageOpenedList.splice(1, _currentIndex - 1);
            }

            // localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        increateTag(state, tagObj) {
            state.pageOpenedList.push(tagObj);
            // localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        }
    }
};

export default app;
