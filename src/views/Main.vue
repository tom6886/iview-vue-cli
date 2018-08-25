<style lang="less">
    @import './Main.less';
</style>

<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <img src="../../public/images/logo.png">
                    </div>
                    <div class="layout-title">
                        iview + vue cli 项目脚手架
                    </div>

                    <a href="javascript:void(0)" class="layout-logoff" @click="logout">
                        <img src="../../public/images/logoff.png"/>注销
                    </a>
                    <div class="layout-message demo-avatar-badge">
                        <Badge :count="1">
                            <Icon type="ios-notifications-outline"></Icon>
                        </Badge>
                    </div>
                    <div class="layout-user">
                        <Avatar shape="square" icon="ios-person"/>
                        <Dropdown>
                            <a href="javascript:void(0)">
                                {{ user.realName }}
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>下拉1</DropdownItem>
                                <DropdownItem>下拉2</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider>
                    <shrinkable-menu
                            :open-names="openedSubmenuArr"
                            :menu-list="menuList">
                    </shrinkable-menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <div class="tags-con" style="min-height:50px;">
                        <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
                    </div>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import shrinkableMenu from '@/components/main-components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from '@/components/main-components/tags-page-opened'
    import Cookies from 'js-cookie';
    import util from "@/utils/util.js";

    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened
        },
        data() {
            return {
                user: JSON.parse(Cookies.get('userInfo')),
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            }
        },
        created() {
            this.$store.commit('setOpenedList');
        },
        methods: {
            logout() {
                Cookies.remove('userInfo')
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
        },
        computed: {
            menuList() {
                return this.$store.state.app.menuList
            },
            pageTagsList() {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
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
                localStorage.currentPageName = to.name
            }
        }
    }
</script>
