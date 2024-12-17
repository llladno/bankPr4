<template>
  <div>
    <button @click="store.openForm('createOrder')">Создать заказ</button>
    <div class="order-flex">
      <div v-for="order in getOrders">
        Заказ №{{order.id}} от {{order.orderDate}} {{ order.status }}
        <button v-if="order.status === 'Ожидание оплаты'" @click="handleAction('quittance', order.id)">Оплатить</button>
        <button v-else-if="order.status === 'В процессе'" @click="handleAction('document', order.id)">Подписать</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useFormStore} from "@/stores/counter.ts";
import {onMounted, ref} from "vue";
import router from "@/router";

const store = useFormStore();
const getOrders = ref(JSON.parse(localStorage.getItem('orders')))


const handleAction = (type, id) => {
  switch (type) {
    case 'quittance':
      getOrders.value[id-1].status = 'Завершен';
      localStorage.setItem('orders', JSON.stringify(getOrders.value))
      break;
    case 'document':
      getOrders.value[id-1].status = 'Ожидание оплаты';
      localStorage.setItem('orders', JSON.stringify(getOrders.value))
      break;
  }
  router.push('/print/' + type + '/' + id)
}
</script>

<style scoped>
.order-flex {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
