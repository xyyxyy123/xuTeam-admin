<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="navside_title" :class="{ nav_title: hideNavside }">
        <span>平台</span>
      </div>
      <div>
        <el-menu
          class="navside-menu"
          mode="vertical"
          :collapse="hideNavside"
          unique-opened
          :default-active="$route.path"
          text-color="#9BA7CE"
          background="transparent"
          active-text-color="#ffffff"
        >
          <sidebar-item :routes="permissionMenu"></sidebar-item>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import SidebarItem from '@/views/layout/components/SidebarItem'
export default {
  components: {
    SidebarItem
  },
  data() {
    return {}
  },
  computed: {
    hideNavside() {
      return !this.$store.getters.openNavside
    },
    // 默认路由整理，通过监听处理，监听到想要的路由数据
    permissionMenu() {
      let navside = []
      navside = this.$router.options.routes
      return navside
    }
  }
}
</script>
<style lang="scss" scoped>
.navside_title {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 24px;
}
.nav_title {
  font-size: 16px;
  text-align: center;
}
.navside-menu {
  background: #1f233e;
  border-right: none;
  border-radius: 0;
}
</style>
