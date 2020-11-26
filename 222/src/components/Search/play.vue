<template>
  <div>
    <search
      @search="search"
      @selectChangeVal="selectChangeVal"
      :options="options"
      style="float:right;"
    ></search>
  </div>
</template>
<script>
import search from './index'
export default {
  data() {
    return {
      options: [
        {
          value: 'in',
          lable: '未处理'
        },
        {
          value: 'out',
          lable: '已处理'
        }
      ]
    }
  },
  components: {
    search
  },
  methods: {
    selectChangeVal() {},
    search() {}
  }
}
</script>
