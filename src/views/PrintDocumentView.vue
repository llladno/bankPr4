<template>
  <div class="print-document" v-if="client">
    <button class="print-document__print" @click="handlePrint">Печатать</button>
    <h3 class="print-document__header">ДОГОВОР ОКАЗАНИЯ КОНСУЛЬТАЦИОННЫХ УСЛУГ</h3>
    <div class="print-document__flex">
      <span>Г. Санкт-Петербург</span>
      <span>от {{ new Date().toLocaleDateString() }}</span>
    </div>
    <br />
    <div>
      Общество с ограниченной ответственностью "{{ store.companyInfo.name }}", именуемое в
      дальнейшем «Исполнитель», в лице Генерального директора, действующего на основании Устава, с
      одной стороны и гражданка(-нин) {{ client.name }}, именуемый(-ая) в дальнейшем «Заказчик»,
      вместе в дальнейшем именуемые Стороны, заключили настоящий договор о нижеследующем
    </div>
    <div class="print-document__block" v-for="(text, indexTexts) in texts">
      <h4 class="print-document__block-header">{{ indexTexts + 1 }} {{ text.title }}</h4>
      <div class="print-document__block-text" v-for="(item, points) in text.text">
        <span>{{ indexTexts + 1 }}.{{ points + 1 }}</span>
        <p>{{ item }}</p>
      </div>
    </div>
    <div class="print-document__block">
      <h4 class="print-document__block-header">
        {{ texts.length + 1 }} Адреса, реквизиты и подписи сторон
      </h4>
      <br />
      <div class="print-document__sign">
        <div>
          <h4>Заказчик:</h4>
          <p>{{ client.name }}</p>
          <p>Адрес: {{ client.address }}</p>
          <p>Телефон: {{ client.phone }}</p>
          <p>
            Серия и номер паспорта: {{ client.passport.slice(0, 4) }} {{ client.passport.slice(4) }}
          </p>
          <br /><br /><br />
          <p>{{ getSign(client.name) }}</p>
        </div>
        <div>
          <h4>Исполнитель:</h4>
          <p>"{{ store.companyInfo.companyForm }}" {{ store.companyInfo.name }}</p>
          <p>Адрес: {{ store.companyInfo.address }}</p>
          <p>Телефон: {{ store.companyInfo.phone }}</p>
          <p>ИНН: {{ store.companyInfo.inn }}</p>
          <br />
          <p>Генеральный директор</p>
          <br />
          <p>{{ getSign(store.companyInfo.director) }}</p>
          <p>М.П</p>
        </div>
      </div>
    </div>

    <div class="pagebreak"></div>
    <div class="print-document__annex">
      <h3 class="print-document__annex-header">Приложение № 1</h3>
      <p>к договору оказания консультационных услуг</p>
      <p>от {{ new Date().toLocaleDateString() }}</p>
    </div>
    <p>г. Санкт-Петербург</p>
    <p>
      Общество с ограниченной ответственностью "{{ store.companyInfo.name }}", именуемое в
      дальнейшем «Исполнитель», в лице Генерального директора, действующего на основании Устава, с
      одной стороны и гражданка(-нин) {{ client.name }},именуемый(-ая) в дальнейшем «Заказчик»,
      вместе в дальнейшем именуемые Стороны, заключили настоящее Приложение о нижеследующем:
    </p>

    <div class="print-document__block-text">
      <span>1</span>
      <p>
        Настоящее Приложение составлено и подписано Сторонами в соответствии и во исполнение п. 1.1
        договора возмездного оказания услуг от {{ new Date().toLocaleDateString() }}.
      </p>
    </div>
    <div class="print-document__block-text">
      <span>2</span>
      <div>
        Исполнитель обязуется в соответствии с договором возмездного оказания услуг от
        {{ new Date().toLocaleDateString() }}, оказать консультационные услуги Заказчику по
        следующим вопросам:
        <ul>
          <li v-for="service in services.split(', ')">
            {{ service }}
          </li>
        </ul>
      </div>
    </div>
    <div class="print-document__block">
      <h4 class="print-document__block-header">
        {{ texts.length + 1 }} Адреса, реквизиты и подписи сторон
      </h4>
      <br />
      <div class="print-document__sign">
        <div>
          <h4>Заказчик:</h4>
          <p>{{ client.name }}</p>
          <p>Адрес: {{ client.address }}</p>
          <p>Телефон: {{ client.phone }}</p>
          <p>
            Серия и номер паспорта: {{ client.passport.slice(0, 4) }} {{ client.passport.slice(4) }}
          </p>
          <br /><br /><br />
          <p>{{ getSign(client.name) }}</p>
        </div>
        <div>
          <h4>Исполнитель:</h4>
          <p>"{{ store.companyInfo.companyForm }}" {{ store.companyInfo.name }}</p>
          <p>Адрес: {{ store.companyInfo.address }}</p>
          <p>Телефон: {{ store.companyInfo.phone }}</p>
          <p>ИНН: {{ store.companyInfo.inn }}</p>
          <br />
          <p>Генеральный директор</p>
          <br />
          <p>{{ getSign(store.companyInfo.director) }}</p>
          <p>М.П</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/counter.ts'
import { useRoute } from 'vue-router'

const store = useFormStore()
const route = useRoute()

const order = JSON.parse(localStorage.getItem('orders')).find(
  (order) => order.id === +route.params.id,
)
const client = JSON.parse(localStorage.getItem('clients')).find(
  (client) => client.id === order.clientId,
)
const cost = order.serviceIds
  .map(
    (id) => JSON.parse(localStorage.getItem('services')).find((service) => service.id === id).cost,
  )
  .reduce((a, b) => a + b, 0)
const services = order.serviceIds
  .map(
    (id) => JSON.parse(localStorage.getItem('services')).find((service) => service.id === id).name,
  )
  .join(', ')

const getSign = (fio: string) => {
  const sign = fio.split(' ')

  return `_________________/ ${sign[0]} ${sign[1][0]}.${sign[2][0]}`
}
const texts = [
  {
    title: 'Предмет договора',
    text: [
      'Заказчик поручает и оплачивает, а Исполнитель принимает на себя обязательство по оказанию услуг Заказчику в объеме и на условиях, указанных в Приложении №1, являющимся неотъемлемой частью настоящего договора, а Заказчик обязуется принять и оплатить результат услуг.',
    ],
  },
  {
    title: 'Срок действия договора',
    text: [
      `Настоящий договор вступает в силу с ${order.orderDate} года и действует до момента фактического выполнения обязательств.`,
      'Окончательные сроки зависят от условий, складывающихся в лицензирующем органе. Заказчик не предъявляет Исполнителю претензий в случае изменения этих сроков в сторону увеличения по независящим от Исполнителя причинам.',
    ],
  },
  {
    title: 'Цена договора',
    text: [
      `Общая цена настоящего договора за весь комплекс оказываемых услуг (выполняемых работ) составляет: ${cost} рублей 00 копеек. НДС в связи с применением Исполнителем упрощенной системы налогообложения не облагается.`,
      `Заказчик перечисляет Исполнителю сумму в размере ${cost} рублей 00 копеек в течение 3 (Трех) банковских дней с подписания настоящего договора.`,
      'Оплата цены настоящего договора осуществляется в безналичном порядке путем выставления счета.',
    ],
  },
  {
    title: 'Условия выполнения услуг',
    text: [
      'Исполнитель обязуется предоставить услуги, качественно указанные в Приложении № 1 к настоящему договору ив срок, указанный в п.1.1 настоящего Договора, при условии предоставления Заказчиком Исполнителю документов и данных, необходимых для полноценного оказания консультационных услуг',
      'Исполнитель согласовывает с Заказчиком способы оказания услугв течение 5 (Пяти) календарных дней с момента вступления настоящего договора в силу, определяемом в соответствии с п. 2.1 настоящего договора.',
      'Исполнитель обязан обеспечить конфиденциальность полученных от Заказчика сведений.',
      'Заказчик вправе привлекать для оказания услуг, предусмотренных настоящим договором, иных лиц без согласования с Исполнителем, оставаясь ответственным за их действия.',
      'Заказчик вправе в случае, если Исполнитель уклоняется от выполнения своих обязанностей по договору, а именно, не приступает в установленные сроки к оказанию услуг, игнорирует указания Заказчика, затягивает время выполнения услуг или иным образом уклоняется от исполнения своих обязанностей, отказаться от исполнения настоящего договора и поручить исполнение услуг другому лицу.',
    ],
  },
]

const handlePrint = () => {
  window.print()
}
</script>

<style scoped lang="scss">
.print-document {
  width: 100%;

  * {
    font-family: 'Times New Roman';
    font-size: 16px;
    line-height: 160%;
    color: #000000;
    text-align: justify;
  }

  &__header {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }

  &__flex {
    display: flex;
    justify-content: space-between;
  }

  &__block {
    margin-top: 20px;

    &-header {
      font-size: 18px;
      color: #000000;
      font-weight: 600;
      text-align: center;
    }

    &-text {
      display: flex;
      gap: 10px;
    }
  }

  &__sign {
    display: flex;
    gap: 20px;
    justify-content: space-between;
  }

  &__annex {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    &-header {
      font-size: 18px;
      color: #000000;
      font-weight: 600;
      text-align: center;
    }
  }
}

@media print {
  .print-document__print {
    display: none;
  }
  .pagebreak {
    page-break-before: always;
  } /* page-break-after works, as well */
}
</style>
