<template>
  <div class="header-container-btn">
    <el-button
      class="filter-item"
      size="mini"
      type="success"
      style="background-color:#409eff;"
      :class="'active'"
      @click="crud.toQuery"
      >搜索</el-button
    >
    <el-button
      class="filter-item"
      v-if="crud.optShow.reset"
      size="mini"
      type="warning"
      style="background-color:#409eff;"
      :class="'active'"
      @click="crud.resetQuery()"
      >重置</el-button
    >
  </div>
</template>
<script>
import { crud } from '@crud/crud'
export default {
  mixins: [crud()],
  props: {
    itemClass: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
