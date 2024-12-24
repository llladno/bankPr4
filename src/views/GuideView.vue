<template>
  <div class="guide">
    <header class="guide-header">
      <div v-for="(header, index) in guideTabs" :key="index">
        <button @click="selectedTab = index">{{ header }}</button>
      </div>
      <button
        v-if="selectedTab === 0"
        class="guide-header__add"
        @click="store.openForm('createClient')"
      >
        Добавить клиента
      </button>
    </header>
    <div class="guide-content">
      <default-table :headers="currentTableHeaders" :table-data="currentTableData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultTable from '@/components/DefaultTable.vue'
import { ref, watch, onMounted } from 'vue'
import { useFormStore } from '@/stores/counter.ts'

const store = useFormStore()

const selectedTab = ref(0)
const currentTableData = ref()
const currentTableHeaders = ref([])

const guideTabs = ['Клиенты', 'Сотрудники', 'Услуги', 'Заказы']

const employeesHeaders = ['id', 'ФИО', 'Телефон', 'Почта', 'Должность']

const clientHeaders = ['id', 'ФИО', 'Телефон', 'Почта', 'Адрес', 'Паспорт']

const servicesHeaders = ['id', 'Название', 'Описание', 'Стоимость']

const orderHeaders = ['id', 'Клиент', 'Сотрудник', 'Услуги', 'Дата заказа', 'Статус']

const clients = JSON.parse(localStorage.getItem('clients'))
const employees = JSON.parse(localStorage.getItem('employees'))
const services = JSON.parse(localStorage.getItem('services'))
let orders = JSON.parse(localStorage.getItem('orders'))

onMounted(() => {
  const testCompany = JSON.parse(localStorage.getItem('companyInfo'))

  currentTableHeaders.value = clientHeaders
  currentTableData.value = clients
})

watch(selectedTab, () => {
  switch (selectedTab.value) {
    case 0:
      currentTableHeaders.value = clientHeaders
      currentTableData.value = clients
      break
    case 1:
      currentTableHeaders.value = employeesHeaders
      currentTableData.value = employees
      break
    case 2:
      currentTableHeaders.value = servicesHeaders
      currentTableData.value = services
      break
    case 3:
      currentTableHeaders.value = orderHeaders
      orders = JSON.parse(localStorage.getItem('orders'))
      console.log(JSON.parse(localStorage.getItem('orders')))
      currentTableData.value = orders.map((order) => {
        return {
          id: order.id,
          clientId: clients.find((client) => client.id === order.clientId).name,
          employeeId: employees.find((employee) => employee.id === order.employeeId).name,
          serviceIds: order.serviceIds
            .map((id) => services.find((service) => service.id === id).name)
            .join(', '),
          orderDate: order.orderDate,
          status: order.status,
        }
      })
      break
  }
})
</script>

<style scoped lang="scss">
.guide {
  width: calc(100vw - 210px);

  &-header {
    width: 100%;
    display: flex;
    gap: 5px;
    margin-bottom: 20px;

    &__add {
      margin-left: auto;
    }
  }
}
</style>
