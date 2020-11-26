<template>
  <el-breadcrumb class="sidebar-bread" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.name }}</span
        >
        <router-link
          v-else
          :to="item.redirect || item.path"
          class="font-style"
          >{{ item.name }}</router-link
        >
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      // 默认首页进入,dashboard,目前不需要展示
      const first = matched[0]
      if (first && (first.name !== '首页·预警动态' || first.path !== '')) {
        matched = [{ name: '首页·预警动态', path: '/' }].concat(matched)
      }
      this.levelList = matched
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  }
}
</script>
<style lang="scss" scoped>
.font-style {
  cursor: pointer;
}
.no-redirect {
  cursor: text;
}
</style>
