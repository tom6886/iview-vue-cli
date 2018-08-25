<template>
  <div class="ivu-shrinkable-menu">
    <sidebar-menu
      menu-theme="light"
      :menu-list="menuList"
      :open-names="openNames"
      @on-change="handleChange"
    ></sidebar-menu>
  </div>
</template>

<script>
  import sidebarMenu from './components/sidebarMenu.vue'
  import sidebarMenuShrink from './components/sidebarMenuShrink.vue'

  export default {
    name: 'shrinkableMenu',
    components: {
      sidebarMenu,
      sidebarMenuShrink
    },
    props: {
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
        })
      }
    }
  }
</script>
