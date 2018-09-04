<style lang="less">
    @import './styles/menu.less';
</style>

<template>
    <div style="background: #495060" class="ivu-shrinkable-menu">
        <slot name="top"></slot>
        <sidebar-menu
                v-show="!shrink"
                :menu-list="menuList"
                :open-names="openNames"
                @on-change="handleChange"
        ></sidebar-menu>
        <sidebar-menu-shrink
                v-show="shrink"
                :menu-list="menuList"
                @on-change="handleChange"
        ></sidebar-menu-shrink>
    </div>
</template>

<script>
    import sidebarMenu from './components/sidebarMenu.vue';
    import sidebarMenuShrink from './components/sidebarMenuShrink.vue';

    export default {
        name: 'shrinkableMenu',
        components: {
            sidebarMenu,
            sidebarMenuShrink
        },
        props: {
            shrink: {
                type: Boolean,
                default: false
            },
            menuList: {
                type: Array,
                required: true
            },
            openNames: {
                type: Array
            }
        },
        methods: {
            handleChange(name) {
                this.$router.push({
                    name: name
                });
            }
        }
    };
</script>
