<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="navside_title" :class="{'nav_title':hideNavside}">
        <span>平台</span>
      </div>
      <div>
        <el-menu
         class="navside-menu"
         :router="true"
         mode="vertical"
         :collapse="hideNavside"
         unique-opened
        >
          <el-menu-item
            v-for="(item,index) in navsides"
            :key='index'
            :index="item.router"
            :route="resolveRouter(item.router)"
            >
            <i :class="item.icon"></i>
            <span class="navside-menu-title">{{item.router}}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      navsides: [{
        router: 'about',
        path: '/about',
        icon: 'el-icon-edit'
      }, {
        router: 'seconde',
        path: '/seconde',
        icon: 'el-icon-share'
      }, {
        router: 'firsd',
        path: '/firsd',
        icon: 'el-icon-edit'
      }, {
        router: 'foruth',
        path: '/foruth',
        icon: 'el-icon-share'
      },
      {
        router: 'five',
        path: '/five',
        icon: 'el-icon-edit'
      },
      {
        router: 'six',
        path: '/six',
        icon: 'el-icon-share'
      }
      ]
    }
  },
  computed: {
    hideNavside () {
      return !this.$store.getters.openNavside
    }
  },
  methods: {
    resolveRouter (router) {
      return {
        name: router // 组件：route属性 目的是返回了Vue Router 路径对象，name不是路径，也是便于翻译的写法，数组router也必须不能是路径形式的写法
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.navside_title{
  height:50px;
  line-height: 50px;
  text-align: center;
  font-size: 24px;
}
.nav_title{
  font-size: 16px;
  text-align: center;
}
.navside-menu{
    background: #21232a;
    color: #FFFFFF;
    border-right: none;
    border-radius: 0;
  .el-menu-item{
    color:#fff;
    &visited,
      &focus,
      &:hover,
      &:active {
        background-color: #363942;
      }
    &.is-active{
      background-color: #666a77;
    }
  }
  .navside-menu-title{
    margin-left: 10px;
  }
}
</style>
