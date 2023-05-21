<template>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="MoviePage">Movie</a-menu-item>
        <a-menu-item key="SeatPage">Seat</a-menu-item>
        <a-menu-item key="UserPage">User</a-menu-item>
      </a-menu>
    
  </template>
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
    props: ['page'],
    name: "NavbarComponent",
    setup(props) {
      return {
        selectedKeys: ref([props.page])
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
  