<template>
  <main class="main">
    <main-menu />
    <default-form />
    <RouterView class="base" />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
import DefaultForm from '@/components/DefaultForm.vue'
import { onMounted } from 'vue'

const clients = [
  {
    id: 1,
    name: 'Иванченко Иван Иванович',
    phone: '+7 (123) 333-78-90',
    email: 'ivanov@example.com',
    address: 'г. Москва, ул. Ленина, д. 1, кв. 10',
    passport: '1234567890',
  },
  {
    id: 2,
    name: 'Петров Петр Петрович',
    phone: '+7 (123) 555-78-90',
    email: 'petrov@example.com',
    address: 'г. Санкт-Петербург, ул. Невская, д. 20, кв. 5',
    passport: '2345678901',
  },
  {
    id: 3,
    name: 'Сидоров Сидор Сидорович',
    phone: '+7 (123) 666-78-90',
    email: 'sidorov@example.com',
    address: 'г. Екатеринбург, ул. Мира, д. 15, кв. 12',
    passport: '3456789012',
  },
  {
    id: 4,
    name: 'Кузнецов Андрей Викторович',
    phone: '+7 (123) 777-78-90',
    email: 'kuznetsov@example.com',
    address: 'г. Казань, ул. Баумана, д. 8, кв. 14',
    passport: '4567890123',
  },
  {
    id: 5,
    name: 'Смирнова Анна Сергеевна',
    phone: '+7 (123) 888-78-90',
    email: 'smirnova@example.com',
    address: 'г. Новосибирск, ул. Красный проспект, д. 10, кв. 7',
    passport: '5678901234',
  },
]

const employees = [
  {
    id: 1,
    name: 'Иванов Иван Иванович',
    phone: '+7 (123) 456-20-90',
    email: 'employee1@example.com',
    post: 'Генеральный директор',
  },
  {
    id: 2,
    name: 'Андреев Андрей Андреевич',
    phone: '+7 (123) 456-10-90',
    email: 'employee2@example.com',
    post: 'Менеджер',
  },
  {
    id: 3,
    name: 'Чернов Михаил Михайлович',
    phone: '+7 (123) 765-50-90',
    email: 'employee3@example.com',
    post: 'Бухгалтер',
  },
]

const services = [
  {
    id: 1,
    name: 'Расчетно-кассовое обслуживание',
    description: 'Расчетно-кассовое обслуживание',
    cost: 5000,
  },
  {
    id: 2,
    name: 'Страхование бизнеса',
    description: 'Страхование бизнеса',
    cost: 10000,
  },
  {
    id: 3,
    name: 'Инвестиционные программы',
    description: 'Инвестиционные программы',
    cost: 15000,
  },
  {
    id: 4,
    name: 'Юридическое сопровождение',
    description: 'Консультации по юридическим вопросам и сопровождение сделок',
    cost: 7000,
  },
  {
    id: 5,
    name: 'Бухгалтерский учет',
    description: 'Ведение бухгалтерии и налоговая отчетность',
    cost: 12000,
  },
  {
    id: 6,
    name: 'Оценка активов',
    description: 'Профессиональная оценка активов компании',
    cost: 8000,
  },
  {
    id: 7,
    name: 'Обучение сотрудников',
    description: 'Проведение корпоративных тренингов и семинаров',
    cost: 6000,
  },
]

let orders = [
  {
    id: 1,
    clientId: 1, // Иванов Иван Иванович
    employeeId: 2, // Андреев Андрей Андреевич
    serviceIds: [1, 2], // Услуги: Расчетно-кассовое обслуживание, Страхование бизнеса
    orderDate: '14.12.2024',
    status: 'В процессе',
  },
  {
    id: 2,
    clientId: 2, // Петров Петр Петрович
    employeeId: 3, // Чернов Михаил Михайлович
    serviceIds: [3], // Услуга: Инвестиционные программы
    orderDate: '14.12.2024',
    status: 'Завершен',
  },
  {
    id: 3,
    clientId: 3, // Сидоров Сидор Сидорович
    employeeId: 1, // Иванов Иван Иванович
    serviceIds: [2, 3], // Услуги: Страхование бизнеса, Инвестиционные программы
    orderDate: '16.12.2024',
    status: 'Ожидание оплаты',
  },
  {
    id: 4,
    clientId: 3, // Александров Александр Александрович
    employeeId: 2, // Андреев Андрей Андреевич
    serviceIds: [6, 5], // Услуги: Юридическое сопровождение, Бухгалтерский учет
    orderDate: '16.12.2024',
    status: 'В процессе',
  },
  {
    id: 5,
    clientId: 3, // Васильев Василий Васильевич
    employeeId: 3, // Чернов Михаил Михайлович
    serviceIds: [6], // Услуга: Оценка активов
    orderDate: '16.12.2024',
    status: 'Завершен',
  },
  {
    id: 6,
    clientId: 2, // Ефимов Ефим Ефимович
    employeeId: 1, // Иванов Иван Иванович
    serviceIds: [7, 1], // Услуги: Обучение сотрудников, Расчетно-кассовое обслуживание
    orderDate: '16.12.2024',
    status: 'В процессе',
  },
  {
    id: 7,
    clientId: 1, // Зайцев Зиновий Зиновьевич
    employeeId: 2, // Андреев Андрей Андреевич
    serviceIds: [3, 2, 5], // Услуги: Инвестиционные программы, Юридическое сопровождение, Бухгалтерский учет
    orderDate: '17.12.2024',
    status: 'Ожидание оплаты',
  },
  {
    id: 8,
    clientId: 3, // Константинов Константин Константинович
    employeeId: 3, // Чернов Михаил Михайлович
    serviceIds: [2, 7], // Услуги: Оценка активов, Обучение сотрудников
    orderDate: '18.12.2024',
    status: 'Завершен',
  },
  {
    id: 9,
    clientId: 2, // Лебедев Лев Львович
    employeeId: 1, // Иванов Иван Иванович
    serviceIds: [1, 5, 7], // Услуги: Расчетно-кассовое обслуживание, Бухгалтерский учет, Обучение сотрудников
    orderDate: '18.12.2024',
    status: 'В процессе',
  },
  {
    id: 10,
    clientId: 1, // Максимов Максим Максимович
    employeeId: 2, // Андреев Андрей Андреевич
    serviceIds: [2], // Услуги: Страхование бизнеса, Оценка активов
    orderDate: '18.12.2024',
    status: 'Ожидание оплаты',
  },
]

onMounted(() => {
  const isDataClients = JSON.parse(localStorage.getItem('clients'))
  if (!isDataClients) localStorage.setItem('clients', JSON.stringify(clients))
  const isDataEmployees = JSON.parse(localStorage.getItem('employees'))
  if (!isDataEmployees) localStorage.setItem('employees', JSON.stringify(employees))
  const isDataServices = JSON.parse(localStorage.getItem('services'))
  if (!isDataServices) localStorage.setItem('services', JSON.stringify(services))
  const isDataOrders = JSON.parse(localStorage.getItem('orders'))
  if (!isDataOrders) localStorage.setItem('orders', JSON.stringify(orders))
})
</script>

<style lang="scss">
@import './assets/variables';

.main {
  display: grid;
  height: 100%;
  grid-template-columns: auto auto;
}

.base {
  padding: 20px;
}

button {
  padding: 5px 10px;
  border: none;
  color: $default-white !important;
  font-family: 'Inter', sans-serif !important;
  background: $blue;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #4290f1;
    scale: 1.05;
  }

  &:active {
    background: #1b75de;
    scale: 0.95;
  }
}

@media print {
  .vue-devtools__anchor {
    display: none;
  }
}
</style>
