<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainMenu from "@/components/MainMenu.vue";
import DefaultForm from "@/components/DefaultForm.vue";
</script>

<template>
  <main class="main">
    <main-menu />
    <default-form />
    <RouterView class="base" />
  </main>
</template>

<style lang="scss">
@import './assets/variables';



.main{
  display: grid;
  height: 100%;
  grid-template-columns: auto auto;
}

.base {
  padding: 20px;
}

button{
  padding: 5px 10px;
  border: none;
  color: $default-white !important;
  font-family: "Inter", sans-serif !important;
  background: $blue;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;

  &:hover{
    background: #4290f1;
    scale: 1.05;
  }

  &:active{
    background: #1b75de;
    scale: 0.95;
  }
}

@media print {
  .vue-devtools__anchor{
    display: none;
  }
}


</style>
