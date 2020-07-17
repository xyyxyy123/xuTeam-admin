<template>
    <div class="app-wrapper" :class="{hideSidebar:hideNavside}">
        <Sidebar class="navside-container"></Sidebar>
        <div class="layout-main-container">
          <Navbar></Navbar>
          <Appmain class="app-main-container"></Appmain>
        </div>
    </div>
</template>
<script>
import { Sidebar, Navbar, Appmain } from '@/views/layout'
export default {
  components: {
    Sidebar,
    Navbar,
    Appmain
  },
  computed: {
    hideNavside () {
      return !this.$store.getters.openNavside
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.app-wrapper{
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.hideSidebar{
    .navside-container{
      width: 64px;
    }
    .layout-main-container{
      margin-left: 64px;
    }
  }
}
.navside-container{
    position: fixed;
    height: 100%;
    width:180px;
    color: #ffffff;
    transition: width 0.28s ease-out;
    background-color: #21232a;
    left: 0;
    top:0;
    bottom: 0;
    z-index:100;
    .platform-container{
      span{
        color: red;
      }
    }
}
.layout-main-container{
  // position: relative;
  margin-left: 180px;
  height: 100%;
  box-sizing: border-box;
  transition: margin-left 0.28s ease-out;
}
.app-main-container{
  // position:relative;
  height:calc(100vh - 50px);
  box-sizing: border-box;
  background-color: #ffffff;
}
</style>
