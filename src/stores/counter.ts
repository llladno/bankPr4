import { defineStore } from 'pinia'
import {ref} from "vue";

export const useFormStore = defineStore('formStore', () => {
  const isOpen = ref(false)
  const formVariant = ref('')
  const  companyInfo = {
    name: 'СПБГЭУ Банк',
    companyForm: "ООО",
    inn: "1234567890",
    kpp: "123456789",
    account:'409118100001800000199',
    bik: "044525225",
    bank: 'АО "Тинькофф Банк"',
    corrAccount: '30101810400000000625',
    address: "г. Москва, ул. Московская, д. 1",
    phone: "+7 (123) 456-78-90",
    email: "bank@example.com",
  }

  const openForm = (variant: string) => {
    isOpen.value = true
    formVariant.value = variant
  }

  const closeForm = () => {
    isOpen.value = false
    formVariant.value = ''
  }
  return { isOpen, formVariant, openForm, closeForm, companyInfo }
})
