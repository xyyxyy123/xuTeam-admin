<template>
  <div class="search-select">
    <el-input placeholder="请输入内容" v-model.trim="searchValue" @keyup.enter.native='search' class="input-with-select" clearable>
      <el-select v-model="nameValue" slot="prepend" placeholder="请选择" v-if="hasPrepend" @change="searchWatch">
        <el-option v-for='item in options' :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button class='search' slot="append" @click="search">搜索</el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => {
        return [{
          value: 'name',
          label: ''
        }]
      }
    },
    defaultOption: String,
    hasPrepend: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      searchValue: '',
      optionValue: ''
    }
  },
  computed: {
    nameValue: {
      get (val) {
        return this.optionValue || (this.options.some(item => item.value === this.defaultOption) ? this.defaultOption : this.options[0].value)
      },
      set (val) {
        this.optionValue = val
      }
    }
  },
  methods: {
    search () {
      this.$emit('search', this.hasPrepend ? {
        name: this.nameValue,
        value: this.searchValue
      } : { value: this.searchValue })
    },
    searchWatch () {
      this.$emit('selectChangeVal', this.nameValue)
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
.search-select{
  .el-select{
    min-width: 70px;
  }
}
</style>
