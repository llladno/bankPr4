<template>
  <div>
    <div class="report-header">
      <button @click="selectedTab = 0">Сумма заказов</button>
      <button @click="selectedTab = 1">Количество заказов</button>
    </div>
    <div v-if="selectedTab === 0">
      <default-table :headers="['Дата', 'Сумма']" :table-data="compatedOrders" />
      <chart-component :chartData="data1" :chartOptions="options1" />
    </div>
    <div v-if="selectedTab === 1">
      <default-table :headers="['Дата', 'Количество']" :table-data="compatedOrders2" />
      <chart-component :chartData="data2" :chartOptions="options1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ChartComponent from "@/components/ChartComponent.vue";
import DefaultTable from "@/components/DefaultTable.vue";

const selectedTab = ref(-1);

const orders = JSON.parse(localStorage.getItem('orders'))
const orderLabels = orders.map((order) => order.orderDate)
const orderCost = orders.map((order) => order.serviceIds.map((id) => JSON.parse(localStorage.getItem('services')).find((service) => service.id === id).cost).reduce((a, b) => a + b, 0))
const compatedOrders = orderLabels.map((label, index) => [label, orderCost[index]])
const services = JSON.parse(localStorage.getItem('services')) || [];

const groupedOrders = orders.reduce((acc, order) => {
  const { orderDate, serviceIds } = order;


  const totalCost = serviceIds
    .map((id) => services.find((service) => service.id === id)?.cost || 0)
    .reduce((a, b) => a + b, 0);

  if (acc.has(orderDate)) {
    const current = acc.get(orderDate);
    acc.set(orderDate, {
      totalCost: current.totalCost + totalCost,
      orderCount: current.orderCount + 1,
    });
  } else {
    acc.set(orderDate, {
      totalCost,
      orderCount: 1,
    });
  }

  return acc;
}, new Map());

const combinedOrders = Array.from(groupedOrders, ([date, { totalCost, orderCount }]) => ({
  date,
  totalCost,
  orderCount,
}));

const arrayLabels = combinedOrders.map((order) => order.date);

const orderCosts = combinedOrders.map((order) => order.totalCost);

const countOrdersInDays = combinedOrders.map((order) => order.orderCount);

const compatedOrders2 = arrayLabels.map((label, index) => [label, countOrdersInDays[index]])

const data1 = ref({
  labels: arrayLabels,
  datasets: [
    {
      label: "Сумма заказов",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      data: orderCosts,
    },
  ],
});

const data2 = ref({
  labels: arrayLabels,
  datasets: [
    {
      label: "Количество заказов в день",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      data: countOrdersInDays,
    },
  ],
});


const options1= ref({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Количество заказов",
    },
  },
});

</script>

<style scoped>
.report-header{
  margin-bottom: 20px;
}
</style>
