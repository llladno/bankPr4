<template>
  <aside class="bar">
    <router-link to="/guide">Справочник</router-link>
    <router-link to="/print">Печать</router-link>
    <router-link to="/report">Отчёт</router-link>
    <router-link to="/order">Заказ</router-link>
  </aside>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@import "@/assets/variables";

.bar{
  width: 200px;
  min-height: 100vh;
  background: $dark-blue;
  display: flex;
  flex-direction: column;
  height: 100%;

  a {
    font-size: 18px;
    padding-left: 15px;
  }
}

@media print {
  .bar{
    display: none;
  }
}

</style>
