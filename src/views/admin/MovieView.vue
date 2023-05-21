<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <navbarComponent page="MoviePage"></navbarComponent>
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
import MovieList from '../../pages/admin/movie/MovieList.vue'
import navbarComponent from '@/components/admin/navbarComponent.vue'
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
