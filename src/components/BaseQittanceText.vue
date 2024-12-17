<template>
<div class="quittance-text">
  <span class="quittance-text__header">{{header}}</span>
  <span class="quittance-text__value"> {{value}}</span>
</div>
</template>
<script setup lang="ts">
defineProps<{header: string, value: string}>()
</script>

<style scoped lang="scss">
.quittance-text{
  display: flex;
  flex-direction: column;
  width: 200px;


  &__header {
    font-size: 14px;
    color: #888888;
  }

  &__value {
    font-size: 18px;
    color: #000000;
  }
}
</style>
