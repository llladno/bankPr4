<template>
  <div class="guide">
    <header class="guide-header">
      <div v-for="(header, index) in guideTabs" :key="index">
        <button @click="selectedTab = index">{{header}}</button>
      </div>
      <button v-if="selectedTab === 0" class="guide-header__add" @click="store.openForm('createClient')">Добавить клиента</button>
    </header>
    <div class="guide-content">
      <default-table :headers="currentTableHeaders" :table-data="currentTableData" />
    </div>
  </div>

</template>

<script setup lang="ts">
import DefaultTable from "@/components/DefaultTable.vue";
import {ref, watch, onMounted} from "vue";
import {useFormStore} from "@/stores/counter.ts";

const store = useFormStore();

const selectedTab = ref(0)
const currentTableData = ref();
const currentTableHeaders = ref([]);

const guideTabs = [
  "Клиенты",
  "Сотрудники",
  "Услуги",
  "Заказы",
]

const employeesHeaders = [
  "id",
  "ФИО",
  "Телефон",
  "Почта",
  "Должность",
]

const clientHeaders = [
  "id",
  "ФИО",
  "Телефон",
  "Почта",
]

const servicesHeaders = [
  "id",
  "Название",
  "Описание",
  "Стоимость",
]

const orderHeaders = [
  "id",
  "Клиент",
  "Сотрудник",
  "Услуги",
  "Дата заказа",
  "Статус",
];

// const clients = [
//   {
//     id: 1,
//     name: "Иванов Иван Иванович",
//     phone: "+7 (123) 333-78-90",
//     email: "ivanov@example.com",
//   },
//   {
//     id: 2,
//     name: "Петров Петр Петрович",
//     phone: "+7 (123) 555-78-90",
//     email: "petrov@example.com",
//   },
//   {
//     id: 3,
//     name: "Сидоров Сидор Сидорович",
//     phone: "+7 (123) 666-78-90",
//     email: "sidorov@example.com",
//   }
// ]
//
// const employees = [
//   {
//     id: 1,
//     name: "Иванов Иван Иванович",
//     phone: '+7 (123) 456-20-90',
//     email: "employee1@example.com",
//     post: 'Генеральный директор',
//   },
//   {
//     id: 2,
//     name: "Андреев Андрей Андреевич",
//     phone: '+7 (123) 456-10-90',
//     email: "employee2@example.com",
//     post: 'Менеджер',
//   },
//   {
//     id: 3,
//     name: "Чернов Михаил Михайлович",
//     phone: '+7 (123) 765-50-90',
//     email: "employee3@example.com",
//     post: 'Бухгалтер',
//   }
// ]

// const services = [
//   {
//     id: 1,
//     name: 'Расчетно-кассовое обслуживание',
//     description: 'Расчетно-кассовое обслуживание',
//     cost: 5000,
//   },
//   {
//     id: 2,
//     name: 'Страхование бизнеса',
//     description: 'Страхование бизнеса',
//     cost: 10000,
//   },
//   {
//     id: 3,
//     name: 'Инвестиционные программы',
//     description: 'Инвестиционные программы',
//     cost: 15000,
//   }
// ]

// let orders = [
//   {
//     id: 1,
//     clientId: 1, // Иванов Иван Иванович
//     employeeId: 2, // Андреев Андрей Андреевич
//     serviceIds: [1, 2], // Услуги: Расчетно-кассовое обслуживание, Страхование бизнеса
//     orderDate: "14.12.2024",
//     status: "В процессе",
//   },
//   {
//     id: 2,
//     clientId: 2, // Петров Петр Петрович
//     employeeId: 3, // Чернов Михаил Михайлович
//     serviceIds: [3], // Услуга: Инвестиционные программы
//     orderDate: "14.12.2024",
//     status: "Завершен",
//   },
//   {
//     id: 3,
//     clientId: 3, // Сидоров Сидор Сидорович
//     employeeId: 1, // Иванов Иван Иванович
//     serviceIds: [2, 3], // Услуги: Страхование бизнеса, Инвестиционные программы
//     orderDate: "15.12.2024",
//     status: "Ожидание оплаты",
//   },
// ];

const clients = JSON.parse(localStorage.getItem('clients'))
const employees = JSON.parse(localStorage.getItem('employees'))
const services = JSON.parse(localStorage.getItem('services'))
let orders = JSON.parse(localStorage.getItem('orders'))

onMounted(()=>{
  // localStorage.setItem('employees', JSON.stringify(employees))
  // localStorage.setItem('services', JSON.stringify(services))
  // localStorage.setItem('clients', JSON.stringify(clients))
  // localStorage.setItem('orders', JSON.stringify(orders))
  const testCompany = JSON.parse(localStorage.getItem('companyInfo'))

  currentTableHeaders.value = clientHeaders
  currentTableData.value = clients
})

watch(selectedTab, () => {
  switch (selectedTab.value) {
    case 0:
      currentTableHeaders.value = clientHeaders
      currentTableData.value = clients
      break;
    case 1:
      currentTableHeaders.value = employeesHeaders
      currentTableData.value = employees
      break;
    case 2:
      currentTableHeaders.value = servicesHeaders
      currentTableData.value = services
      break;
    case 3:
      currentTableHeaders.value = orderHeaders
      orders = JSON.parse(localStorage.getItem('orders'))
      console.log(JSON.parse(localStorage.getItem('orders')))
      currentTableData.value = orders.map((order) => {
        return {
          id: order.id,
          clientId: clients.find((client) => client.id === order.clientId).name,
          employeeId: employees.find((employee) => employee.id === order.employeeId).name,
          serviceIds: order.serviceIds.map((id) => services.find((service) => service.id === id).name).join(', '),
          orderDate: order.orderDate,
          status: order.status
        }
      })
      break;
  }
});

</script>

<style scoped lang="scss">
.guide{
  width: calc(100vw - 210px);

  &-header{
    width: 100%;
    display: flex;
    gap: 5px;
    margin-bottom: 20px;

    &__add{
      margin-left: auto;
    }
  }
}
</style>
