<template>
  <div class="form-layout" v-if="isOpenForm" @click.self="formStore.closeForm">
    <div class="form-container" v-if="fromVariant === 'createOrder'">
      <button @click="isSelect = !isSelect">Выбрать услугу</button>
      <div class="form-container__select" v-if="isSelect">
        <div v-for="option in optionSelect" :key="option">
          <input @input="handleInput" type="checkbox" :value="option.id" />
          <label class="form-container__select-label">{{ option.name }}</label>
        </div>
      </div>
      <div class="form-container__block">
        <input
          class="form-container__search"
          v-model="searchValue"
          @input="handleSearch"
          @focus="showSelect = true"
        />
        <div class="form-container__search-menu" v-if="showSelect">
          <span
            v-for="option in optionSelectClient"
            :key="option"
            @click="handleSelect(option.id, option.name)"
            >{{ option.name }}</span
          >
        </div>
      </div>

      <!--      <select v-model="selectedClient" >-->
      <!--        <option v-for="option in optionSelectClient" :key="option" :value="option.id">-->
      <!--          {{option.name}}-->
      <!--        </option>-->
      <!--      </select>-->
      <select v-model="selectedEmployee">
        <option v-for="option in optionSelectEmployee" :key="option" :value="option.id">
          {{ option.name }}
        </option>
      </select>
      <button @click="handleSend">Отправить</button>
    </div>
    <div class="form-container" v-else-if="fromVariant === 'selectDocument'">
      <p class="form-container__quittance">Договор</p>
      <select @input="handleDocument" value="0">
        <option value="0" disabled>Все договоры</option>
        <option v-for="order in orders" :key="order.id" :value="order.id">
          Договор №{{ order.id }} от {{ order.orderDate }}
        </option>
      </select>
    </div>
    <div class="form-container" v-else-if="fromVariant === 'selectQuittance'">
      <p class="form-container__quittance">Квитанция</p>
      <select @input="handleQuittance" value="0">
        <option value="0" disabled>Все квитанции</option>
        <option v-for="order in orders" :key="order.id" :value="order.id">
          Договор №{{ order.id }} от {{ order.orderDate }}
        </option>
      </select>
    </div>
    <div class="form-container" v-else-if="fromVariant === 'createClient'">
      <p class="form-container__quittance">Новый клиент</p>
      <label class="form-container__select-label">ФИО</label>
      <input v-model="newClient.name" />
      <label class="form-container__select-label">Телефон</label>
      <input v-model="newClient.phone" />
      <label class="form-container__select-label">Почта</label>
      <input v-model="newClient.email" />
      <label class="form-container__select-label">Адрес</label>
      <input v-model="newClient.address" />
      <label class="form-container__select-label">Паспорт</label>
      <input v-model="newClient.passport" />
      <button @click="handleCreateClient">Создать</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useFormStore } from '@/stores/counter.ts'
import { useRouter } from 'vue-router'

const formStore = useFormStore()
const router = useRouter()
const isSelect = ref(false)
const showSelect = ref(false)

const searchValue = ref('')

const enum FormVariant {
  createOrder = 'createOrder',
}

const enum LocalStorageKey {
  createOrder = 'services',
}

const isOpenForm = computed(() => formStore.isOpen)
const fromVariant = computed(() => formStore.formVariant)
const orders = computed(() => JSON.parse(localStorage.getItem('orders')))

const optionSelect = ref()
const optionSelectClient = ref()
const optionSelectEmployee = ref()

const selectedService = ref([])
const selectedClient = ref()
const selectedEmployee = ref()

const newClient = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  passport: '',
})

const handleCreateClient = async () => {
  const clients = JSON.parse(localStorage.getItem('clients'))
  clients.push({ id: clients.length + 1, ...newClient.value })

  localStorage.setItem('clients', JSON.stringify(clients))
  await nextTick()
  location.reload()
}

const handleSearch = (event) => {
  const clients = JSON.parse(localStorage.getItem('clients'))
  optionSelectClient.value = clients.filter((item) =>
    item.name.toLowerCase().includes(event.target.value.toLowerCase()),
  )
}

const handleSelect = (id: number, name: string) => {
  showSelect.value = false
  selectedClient.value = id
  searchValue.value = name
}
const handleSend = async () => {
  const ordersArray = orders.value

  const allData = {
    id: ordersArray.length + 1,
    serviceIds: selectedService.value,
    clientId: selectedClient.value,
    employeeId: selectedEmployee.value,
    orderDate: new Date().toLocaleDateString(),
    status: 'В процессе',
  }

  ordersArray.push(allData)

  localStorage.setItem('orders', JSON.stringify(ordersArray))
  await nextTick()
  location.reload()
  formStore.closeForm()
}

const handleInput = (event) => {
  if (
    event.target.checked &&
    !selectedService.value.some((item) => +item === +event.target.value)
  ) {
    selectedService.value.push(+event.target.value)
  } else {
    selectedService.value = selectedService.value.filter((item) => +item !== +event.target.value)
  }
}

const handleQuittance = (event) => {
  router.push('/print/quittance/' + +event.target.value)
  formStore.closeForm()
}

const handleDocument = (event) => {
  router.push('/print/document/' + +event.target.value)
  formStore.closeForm()
}

onMounted(() => {
  console.log(orders.value)
})

watch(isOpenForm, (value) => {
  if (isOpenForm.value) {
    const services = JSON.parse(localStorage.getItem('services'))
    const clients = JSON.parse(localStorage.getItem('clients'))
    const employees = JSON.parse(localStorage.getItem('employees'))

    optionSelect.value = services
    optionSelectClient.value = clients
    optionSelectEmployee.value = employees
  }
})
</script>

<style scoped lang="scss">
.form-layout {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.36);
  backdrop-filter: blur(2px);
}

.form-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;

  padding: 10px;
  border-radius: 10px;
  background: #2c3e50;

  &__quittance {
    color: #fff;
  }

  &__block {
    position: relative;
  }

  &__search {
    width: 100%;
  }

  &__search-menu {
    position: absolute;
    height: fit-content;
    overflow-y: auto;
    background: #2c3e50;
    width: 100%;
    top: 30px;
    max-height: 200px;

    span {
      display: block;
      padding: 5px 10px;
      cursor: pointer;
      color: #fff;

      &:hover {
        background: #4290f1;
      }
    }
  }

  &__select {
    max-height: 100px;
    overflow-y: auto;

    &-label {
      color: #fff;
    }
  }
}
</style>
