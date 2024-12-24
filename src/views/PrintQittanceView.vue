<template>
  <div class="print-quittance">
    <button class="print-quittance__print" @click="handlePrint">Печатать</button>
    <h2>Подтверждение платежа заказа №{{ order.id }} от {{ order.orderDate }}</h2>
    <div class="print-quittance__flex">
      <base-qittance-text header="Плательщик" :value="containedData.clientId" />
      <base-qittance-text header="Сумма платежа" :value="`${containedData.cost} руб.`" />
    </div>
    <p class="line" />
    <div>
      <base-qittance-text header="Дата операции" :value="containedData.orderDate" />
      <base-qittance-text header="Статус" value="Оплачен" />
    </div>
    <p class="line" />
    <div class="print-quittance__flex">
      <base-qittance-text header="Получатель" :value="companyData.name" />
      <div>
        <base-qittance-text header="ИНН" :value="companyData.inn" />
        <base-qittance-text header="Статус" :value="companyData.account" />
        <base-qittance-text header="Статус" :value="companyData.kpp" />
      </div>
    </div>
    <p class="line" />
    <div class="print-quittance__flex">
      <base-qittance-text header="Банк получателя" :value="companyData.bank" />
      <div>
        <base-qittance-text header="БИК" :value="companyData.bik" />
        <base-qittance-text header="Кор. счет" :value="companyData.corrAccount" />
      </div>
    </div>
    <p class="line" />
    <div>
      <base-qittance-text header="Номер платежа" :value="`WE${new Date().getTime() * 5}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseQittanceText from '@/components/BaseQittanceText.vue'
import { useFormStore } from '@/stores/counter.ts'

const store = useFormStore()

const route = useRoute()
const order = JSON.parse(localStorage.getItem('orders')).find(
  (order) => order.id === +route.params.id,
)
const companyData = store.companyInfo

const containedData = {
  id: order.id,
  clientId: JSON.parse(localStorage.getItem('clients')).find(
    (client) => client.id === order.clientId,
  ).name,
  employeeId: JSON.parse(localStorage.getItem('employees')).find(
    (employee) => employee.id === order.employeeId,
  ).name,
  serviceIds: order.serviceIds
    .map(
      (id) =>
        JSON.parse(localStorage.getItem('services')).find((service) => service.id === id).name,
    )
    .join(', '),
  orderDate: order.orderDate,
  cost: order.serviceIds
    .map(
      (id) =>
        JSON.parse(localStorage.getItem('services')).find((service) => service.id === id).cost,
    )
    .reduce((a, b) => a + b, 0),
  status: order.status,
}

const handlePrint = () => {
  window.print()
}

onMounted(() => {
  console.log(containedData)
  console.log(route.params.id)
})
</script>
<style scoped lang="scss">
.print-quittance {
  width: 100%;
  margin-left: 100px;

  &__flex {
    display: flex;
    justify-content: space-between;
    gap: 150px;
  }

  .line {
    width: 100%;
    height: 2px;
    background: #726468;
    margin: 10px 0;
  }
}

@media print {
  * {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  .print-quittance {
    margin: 10px;
    &__print {
      display: none;
    }
  }

  .line {
    width: 100%;
    height: 2px;
    background: #726468;
    margin: 10px 0;
  }
}
</style>
