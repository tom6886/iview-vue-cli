<style lang="less">
    @import './Main.less';
</style>

<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu
                    :shrink="shrink"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">
                <div slot="top" class="logo-con">
                    <img v-show="!shrink" src="../assets/images/logo_smartec.png" key="max-logo"/>
                    <img v-show="shrink" src="../assets/images/logo_smartec_mini.png" key="min-logo"/>
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text"
                            @click="toggleClick">
                        <Icon type="ios-menu" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ user.name }}</span>
                                    <Icon type="md-arrow-dropdown"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                    <DropdownItem name="changePass">修改密码</DropdownItem>
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
    import shrinkableMenu from '@/components/main-components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from '@/components/main-components/tags-page-opened';
    import breadcrumbNav from "@/components/main-components/breadcrumb-nav.vue";
    import Cookies from 'js-cookie';
    import util from "@/utils/util.js";
    import {removeStore} from "@/utils/storage";

    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav
        },
        data() {
            return {
                shrink: false,
                user: JSON.parse(Cookies.get('userInfo')),
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            }
        },
        created() {
            this.initRouter();
            this.$store.commit('setOpenedList');
            let pathArr = util.setCurrentPath(this, this.$route);
            console.log('pathArr = ' + this.$route.name)
            console.log(pathArr)
            if (pathArr.length >= 2) {
                this.$store.commit("addOpenSubmenu", pathArr[1].name);
            }
        },
        methods: {
            logout() {
                Cookies.remove('userInfo');
                removeStore("accessToken");
                removeStore("vuex");

                this.$router.push({
                    name: 'login'
                });
            },
            checkTag(name) {
                let _openPage = this.pageTagsList.find(x => x.name === name);

                if (!_openPage) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            toggleClick() {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown(name) {
                if (name === "ownSpace") {
                    util.openNewPage(this, "ownspace_index");
                    this.$router.push({
                        name: "ownspace_index"
                    });
                } else if (name === "changePass") {
                    util.openNewPage(this, "change_pass");
                    this.$router.push({
                        name: "change_pass"
                    });
                } else if (name === "loginout") {
                    // 退出登录
                    this.logout();
                }
            },
            initRouter() {
                if (this.$store.state.app.dynamicRouters.length > 0) {
                    this.$router.addRoutes(this.$store.state.app.dynamicRouters);
                    return;
                }

                // const constRoutes = [];

                // api.menu().then(res => {
                //     console.log(res)
                //     util.initRouterNode(constRoutes, res.data);
                //
                //     this.$store.commit('updateAppRouter', constRoutes.filter(item => item.children.length > 0));
                //
                //     this.$store.commit('updateMenulist', constRoutes.filter(item => item.children.length > 0 && item.type === 1));
                // })
            }
        },
        computed: {
            menuList() {
                return this.$store.state.app.menuList
            },
            pageTagsList() {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath() {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            }
        },
        watch: {
            $route(to) {
                this.$store.commit('setCurrentPageName', to.name)
                let pathArr = util.setCurrentPath(this, to)
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name)
                }
                this.checkTag(to.name)
            }
        }
    }
</script>
