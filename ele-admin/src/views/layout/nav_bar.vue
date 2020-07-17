<template>
    <div class="header-container">
      <div class="toggle-navside" @click="toggleNavside">
        <i v-if="hideNavside"  class="el-icon-d-arrow-right" ></i>
        <i v-else  class="el-icon-d-arrow-left"></i>
      </div>
      <div>
        {{username}}
        <!-- <span>登录</span> -->
        <span style="cursor: pointer;" @click="exit">退出</span>
      </div>
    </div>
</template>
<script>
export default {
  computed: {
    hideNavside () {
      return !this.$store.getters.openNavside
    },
    username () {
      return this.$store.getters.username
    }
  },
  methods: {
    toggleNavside () {
      this.$store.dispatch('toggleNavside') // actions方法也可以
      // this.$store.commit('SET_NAVSIDE') // mutations方法也可以
    },
    // 退出
    exit () {
      this.$store.dispatch('Exit').then(() => {
        this.$router.push({ name: 'login' })
      })
    }
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
  background: #ffffff;
  color: black;
  font-weight: 700;
  .toggle-navside{
  padding:3px 10px;
  text-align: right;
    &:hover{
      cursor: pointer;
    }
  }
}
</style>
