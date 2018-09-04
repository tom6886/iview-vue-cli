<template>
    <div>
        <template v-for="(item, index) in menuList">
            <div class="navitem-list" :key="index">
                <Dropdown transfer v-if="item.children.length !== 0" placement="right-start" :key="index"
                          @on-click="changeMenu">
                    <div class="navitemname">
                        <!-- <Icon :type="item.children[0].icon || item.icon" :key="'menuicon' + item.name"></Icon> -->
                        <Icon :type="item.icon" :key="'menuicon' + item.meta.title"></Icon>
                        <span @click="changeMenu(item.children[0].name)">{{ item.meta.title }}</span>
                        <!-- <i data-v-394040b0="" class="ivu-icon ivu-icon-ios-arrow-right" style="font-size: 32px;"></i> -->
                        <Icon type="ios-arrow-right" class="nav-icon-right"></Icon>
                    </div>
                    <!-- <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon :size="20" :color="iconColor" :type="item.icon"></Icon>
                    </Button> -->
                    <DropdownMenu style="width: 200px;" slot="list" class="bmslideMenu">
                        <template v-for="(child, i) in item.children">
                            <DropdownItem :name="child.meta.title" :key="i">
                                <Icon :type="child.icon"></Icon>
                                <span style="padding-left:10px;">{{ child.meta.title }}</span></DropdownItem>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
                    <div class="navitemname">
                        <Icon :type="item.children[0].icon || item.icon" :size="iconSize"
                              :key="'menuicon' + item.name"></Icon>
                        <!-- <Icon type="gear-b"></Icon> -->
                        <span @click="changeMenu(item.children[0].name)">{{ item.meta.title }}</span>
                        <!-- <i data-v-394040b0="" class="ivu-icon ivu-icon-ios-arrow-right" style="font-size: 32px;"></i> -->
                        <Icon type="ios-arrow-right" class="nav-icon-right"></Icon>
                    </div>
                </Dropdown>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'sidebarMenuShrink',
        props: {
            menuList: {
                type: Array
            }
        },
        methods: {
            changeMenu(active) {
                this.$emit('on-change', active);
            }
        }
    };
</script>
