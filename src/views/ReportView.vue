<template>
  <div>
    <div class="report-header">
      <button @click="selectedTab = 0">Сумма заказов</button>
      <button @click="selectedTab = 1">Количество заказов</button>
    </div>
    <div v-if="selectedTab === 0">
      <default-table
        :headers="['Дата', 'Сумма', 'Услуги', 'Количесво услуг']"
        :table-data="compatedOrders"
      />
      <chart-component :chartData="data1" :chartOptions="options1" />
      <chart-component :chart-data="data3" :chart-options="options2" type="pie" />
    </div>
    <div v-if="selectedTab === 1">
      <default-table
        :headers="['Клиент', 'Количество', 'Общая сумма', 'Услуги']"
        :table-data="result"
      />
      <chart-component :chartData="clientData" :chartOptions="options1" />
      <chart-component :chartData="clientData2" :chartOptions="options1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChartComponent from '@/components/ChartComponent.vue'
import DefaultTable from '@/components/DefaultTable.vue'

const selectedTab = ref(-1)

const orders = JSON.parse(localStorage.getItem('orders'))
const clients = JSON.parse(localStorage.getItem('clients'))

const orderLabels = orders.map((order) => order.orderDate)
const orderCost = orders.map((order) =>
  order.serviceIds
    .map(
      (id) =>
        JSON.parse(localStorage.getItem('services')).find((service) => service.id === id).cost,
    )
    .reduce((a, b) => a + b, 0),
)
const servisesCount = orders.map((order) => order.serviceIds.length)
const servisesNames = orders.map((order) =>
  order.serviceIds
    .map(
      (id) =>
        JSON.parse(localStorage.getItem('services')).find((service) => service.id === id).name,
    )
    .join(', '),
)
const compatedOrders = orderLabels.map((label, index) => [
  label,
  orderCost[index],
  servisesNames[index],
  servisesCount[index],
])
const services = JSON.parse(localStorage.getItem('services')) || []

const groupedOrders = orders.reduce((acc, order) => {
  const { orderDate, serviceIds } = order

  const totalCost = serviceIds
    .map((id) => services.find((service) => service.id === id)?.cost || 0)
    .reduce((a, b) => a + b, 0)

  if (acc.has(orderDate)) {
    const current = acc.get(orderDate)
    acc.set(orderDate, {
      totalCost: current.totalCost + totalCost,
      orderCount: current.orderCount + 1,
    })
  } else {
    acc.set(orderDate, {
      totalCost,
      orderCount: 1,
    })
  }

  return acc
}, new Map())

const combinedOrders = Array.from(groupedOrders, ([date, { totalCost, orderCount }]) => ({
  date,
  totalCost,
  orderCount,
}))

const arrayLabels = combinedOrders.map((order) => order.date)

const orderCosts = combinedOrders.map((order) => order.totalCost)

const countOrdersInDays = combinedOrders.map((order) => order.orderCount)

const groupedByClientsSummary = orders.reduce((acc, order) => {
  const { clientId, serviceIds } = order

  // Найти клиента
  const client = clients.find((c) => c.id === clientId)

  // Если клиента нет, пропускаем
  if (!client) return acc

  // Объединить названия услуг в одну строку
  const servicesNames = serviceIds
    .map((id) => services.find((service) => service.id === id)?.name || 'Неизвестная услуга')
    .join(', ')

  // Вычислить стоимость услуг для заказа
  const totalCost = serviceIds
    .map((id) => services.find((service) => service.id === id)?.cost || 0)
    .reduce((a, b) => a + b, 0)

  // Проверяем, есть ли уже данные для клиента
  if (!acc[clientId]) {
    acc[clientId] = {
      name: client.name,
      totalOrders: 0,
      totalCost: 0,
      services: new Set(),
    }
  }

  // Обновляем данные клиента
  acc[clientId].totalOrders += 1
  acc[clientId].totalCost += totalCost
  servicesNames.split(', ').forEach((service) => acc[clientId].services.add(service))

  return acc
}, {})

// Преобразуем Set обратно в строку и формируем итоговый массив
const result = Object.values(groupedByClientsSummary).map((client) => ({
  name: client.name,
  totalOrders: client.totalOrders,
  totalCost: client.totalCost,
  services: Array.from(client.services).join(', '),
}))

const clientsNames = result.map((client) => client.name)
const clientsValuesCost = result.map((client) => client.totalCost)
const clientsValuesOrders = result.map((client) => client.totalOrders)

const compatedOrders2 = arrayLabels.map((label, index) => [label, countOrdersInDays[index]])

const popularServices = services.reduce((acc, service) => {
  const count = orders.reduce((count, order) => {
    if (order.serviceIds.includes(service.id)) {
      return count + 1
    }
    return count
  }, 0)
  acc[service.name] = count
  return acc
}, {})

const servicesIncludedInOrders = Object.keys(popularServices).map((serviceName) => {
  return {
    name: serviceName,
    count: popularServices[serviceName],
  }
})

const servicesNames = servicesIncludedInOrders.map((service) => service.name)
const servicesValues = servicesIncludedInOrders.map((service) => service.count)

console.log(servicesValues)

const data1 = ref({
  labels: arrayLabels,
  datasets: [
    {
      label: 'Сумма заказов',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: orderCosts,
    },
  ],
})

const clientData = ref({
  labels: clientsNames,
  datasets: [
    {
      label: 'Сумма заказов по клиентам',
      backgroundColor: 'rgb(71,87,255)',
      borderColor: 'rgb(0,88,248)',
      borderWidth: 1,
      data: clientsValuesCost,
    },
  ],
})

const clientData2 = ref({
  labels: clientsNames,
  datasets: [
    {
      label: 'Количество заказов по клиентам',
      backgroundColor: 'rgb(255,57,57)',
      borderColor: 'rgb(255,0,0)',
      borderWidth: 1,
      data: clientsValuesOrders,
    },
  ],
})

const data3 = ref({
  labels: servicesNames,
  datasets: [
    {
      label: 'Количество',

      borderWidth: 1,
      data: servicesValues,
    },
  ],
})

const options1 = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Количество заказов',
    },
  },
})

const options2 = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Популярность услуг',
    },
  },
})
</script>

<style scoped>
.report-header {
  margin-bottom: 20px;
}
</style>
