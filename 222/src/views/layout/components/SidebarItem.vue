<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <template v-if="!item.hidden">
        <template v-if="hasOneShowingChild(item.children)">
          <router-link :to="item.path">
            <el-menu-item
              class="submenu-title-noDropdown"
              :index="
                item.path == '/'
                  ? '/' + item.children[0].path
                  : item.path + '/' + item.children[0].path
              "
            >
              <!-- <el-menu-item :index="item.path"> -->
              <svg-icon
                v-if="item.icons"
                :icon-class="item.icons"
                style="display:inline;"
              ></svg-icon>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </router-link>
        </template>
        <el-submenu v-else :index="item.name || item.path" :key="item.name">
          <template slot="title">
            <svg-icon
              v-if="item.icons"
              :icon-class="item.icons"
              style="display:inline;"
            ></svg-icon>
            <span>{{ item.name }}</span>
          </template>
          <!--第二层的连接-->
          <template v-for="child in item.children">
            <router-link
              :to="item.path + '/' + child.path"
              :key="child.name"
              v-if="!child.hidden"
            >
              <el-menu-item
                style="padding-left:50px;"
                :index="item.path + '/' + child.path"
              >
                <svg-icon
                  v-if="child.icons"
                  :icon-class="child.icons"
                  style="display:inline;margin-right:10px;"
                ></svg-icon>
                <span>{{ child.name }}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: 'sidebarItem',
  props: {
    routes: {
      type: Array
    }
  },

  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }
  }
}
</script>
<style lang="scss" scoped></style>
