<template>
  <div class="header-container">
    <div class="toggle-navside">
      <div @click="toggleNavside">
        <svg-icon v-if="hideNavside" icon-class="sideflay"></svg-icon>
        <svg-icon v-else icon-class="sideback"></svg-icon>
      </div>
      <bread-crumb style="margin-left:20px;"></bread-crumb>
    </div>
    <div>
      <span>{{ username }}</span>
      <span style="cursor: pointer;" @click="exit">退出</span>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/BreadCrumb'
export default {
  components: {
    BreadCrumb
  },
  computed: {
    hideNavside() {
      return !this.$store.getters.openNavside
    },
    username() {
      return this.$store.getters.username
    }
  },
  methods: {
    toggleNavside() {
      this.$store.dispatch('sidemenu/toggleNavside') // actions方法也可以
      // this.$store.commit('SET_NAVSIDE') // mutations方法也可以
    },
    //退出
    exit() {}
  }
}
</script>
<style lang="scss" scoped>
.header-container {
  width: 100%;
  line-height: 50px;
  height: 50px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  color: black;
  font-weight: 700;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  .toggle-navside {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 20px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
