<template>
  <div>
    <button @click="handleForm('selectDocument')">Договор</button>
    <button @click="handleForm('selectQuittance')">Квитанция</button>
  </div>
</template>

<script setup lang="ts">

import {useFormStore} from "@/stores/counter.ts";
import router from "@/router";

const store = useFormStore();

const handleForm = (variant: string) => {
    store.openForm(variant)
}
</script>

<style scoped>

</style>
