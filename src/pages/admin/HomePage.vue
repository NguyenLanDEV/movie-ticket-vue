<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <NavbarComponent ></NavbarComponent>
    </a-layout-header>
    <RouterView />

    <a-layout-footer :style="{ textAlign: 'center' }"> </a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
import { getMetadata } from '@/data/metadata.data'
import { defineComponent, ref, provide, onBeforeMount } from 'vue'
import NavbarComponent from '@/components/admin/navbarComponent.vue';
import 'ant-design-vue/dist/antd.css';

export default defineComponent({
  name: 'HomePage',
  components: {NavbarComponent},
  setup() {
    const metadata = ref();

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
    
    onBeforeMount(() => {
      getMetadata().then(response => {
        metadata.value = response
      })

    });

    provide('metadata', metadata)

    return {
      value: ref<string | undefined>(undefined),
      filterOption,
      handleBlur,
      handleFocus,
      handleChange,
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

.form_errors {
  color: black;
  border: solid 1px red;
  background-color: #ffebe8;

}

.form_errors ul {
  padding: 10px 10px;
}

.form_errors ul li {
  text-decoration: none;
  list-style: none;
}</style>
  