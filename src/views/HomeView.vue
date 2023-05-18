<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />

      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item>
          <a-select
            v-model:value="value"
            show-search
            placeholder="Select a person"
            style="width: 200px"
            :options="options"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
          ></a-select
        ></a-menu-item>
        <a-menu-item key="1">Movie</a-menu-item>

        <a-menu-item key="2">Seat</a-menu-item>
        <a-menu-item key="3">User</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '750px' }">
        <MovieList></MovieList>
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }"> </a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import MovieList from '../pages/movie/MovieList.vue'
import type { SelectProps } from 'ant-design-vue'

export default defineComponent({
  components: {
    MovieList
  },
  setup() {
    const options = ref<SelectProps['options']>([
      { value: 'jack', label: 'Đà Nẵng' },
      { value: 'lucy', label: 'Quảng Nam' }
    ])
    const handleChange = (value: string) => {
      console.log(`selected ${value}`)
    }
    const handleBlur = () => {
      console.log('blur')
    }
    const handleFocus = () => {
      console.log('focus')
    }
    const filterOption = (input: string, option: any) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    return {
      selectedKeys: ref(['2']),
      value: ref<string | undefined>(undefined),
      filterOption,
      handleBlur,
      handleFocus,
      handleChange,
      options
    }
  }
})
</script>
<style>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
