import lazyLoading from './lazyLoading.js';

let util = {};

util.title = function (title) {
    title = title || "主页";
    window.document.title = title;
};

util.setCurrentPath = function (vm, router) {
    let currentPathArr = [];
    let _routers = vm.$store.state.app.routers;
    let _otherRouter = _routers.find(x => x.name === "otherRouter");
    let _other = _otherRouter.children.find(x => x.name === router.name);
    let _root = _routers.find(x => x.name === router.name);

    if (router.name === "home") {
        currentPathArr.push({
            title: "主页",
            path: "",
            name: "home"
        });
    } else if (_other || _root) {
        currentPathArr = [
            {
                title: "主页",
                path: "/home",
                name: "home"
            },
            {
                title: router.meta.title,
                path: "",
                name: router.name
            }
        ];
    } else {
        let _parent = null;

        _routers.forEach(x => {
            if (x.children.find(y => y.name === router.name)) {
                _parent = x;
                return false;
            }
        });

        if (_parent) {
            currentPathArr = [
                {
                    title: "主页",
                    path: "/home",
                    name: "home_index"
                },
                {
                    title: _parent.meta.title,
                    path: "",
                    name: _parent.name
                },
                {
                    title: router.meta.title,
                    path: router.path,
                    name: router.name
                }
            ];
        } else {
            currentPathArr = [
                {
                    title: "主页",
                    path: "/home",
                    name: "home_index"
                },
                {
                    title: router.meta.title,
                    path: "",
                    name: router.name
                }
            ];
        }
    }

    vm.$store.commit("setCurrentPath", currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let _router = pageOpenedList.find(x => x.name === name);

    if (_router) {
        vm.$store.commit("pageOpenedList", {
            index: pageOpenedList.indexOf(_router),
            argu: argu,
            query: query
        });
    } else {
        let tag = null;
        vm.$store.state.app.routers.some(x => {
            console.log(x.children)
            tag = x.children.find(y => y.name === name);
            if (tag) {
                return true;
            }
        });

        if (tag) {
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            console.log(tag)
            vm.$store.commit("increateTag", tag);
        }
    }
    console.log(name)
    vm.$store.commit("setCurrentPageName", name);
};

util.initRouterNode = function (routers, data) {
    for (let item of data) {
        let menu = Object.assign({}, item);

        Object.assign(menu, {meta: {title: menu.title}});
        menu.component = lazyLoading(menu.component);

        if (item.children && item.children.length > 0) {
            menu.children = [];
            util.initRouterNode(menu.children, item.children);
        }

        routers.push(menu);
    }
};

export default util;
