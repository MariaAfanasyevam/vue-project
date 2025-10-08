<script setup lang="ts">
import DataForm from "@/components/DataForm/DataForm.vue";
import ActionsForm from "@/components/ActionsForm/ActionsForm.vue";
import InputForm from "@/components/InputForm/InputForm.vue";
import { useCalculation } from "@/features/useCalculation.ts";
import { useEventLogging } from "@/features/useEventLogging.ts";
import { useStorageData } from "@/features/useStorageData.ts";
import type { InputField, LocalStorageData } from "@/types/types.ts";
import { computed, onMounted } from "vue";
import { DELAY, LOCAL_STORAGE_KEY } from "@/constants/common.ts";
const { price, quantity, amount, setChangedInput } = useCalculation();
const { events, logEvent } = useEventLogging();
const { counter, saveToLocalStorage, loadFromLocalStorage } = useStorageData();

const handleInputChanged = (field: InputField) => {
  setChangedInput(field);
  const messages = {
    price: {
      title: "Изменено значение в поле Цена",
      text: `Цена изменена на ${price.value}`,
    },
    quantity: {
      title: "Изменено значение в поле Количество",
      text: `Цена изменена на ${quantity.value}`,
    },
    amount: {
      title: "Изменено значение в поле Сумма",
      text: `Цена изменена на ${amount.value}`,
    },
  } satisfies Record<InputField, { title: string; text: string }>;

  const message = messages[field];

  logEvent(message.title, message.text);
};

const handleSave = async (): Promise<void> => {
  const datatoLocal: LocalStorageData = {
    counter: counter.value,
    price: price.value,
    quantity: quantity.value,
    amount: amount.value,
  };

  const localStorageData: string | null =
    localStorage.getItem(LOCAL_STORAGE_KEY);
  const oldLocalData: LocalStorageData | null = localStorageData
    ? JSON.parse(localStorageData)
    : null;

  logEvent(
    "Отправка данных",
    `Отправлено: ${JSON.stringify(datatoLocal)}, значение в localStorage: ${JSON.stringify(oldLocalData, null, 2)}`,
  );

  await new Promise((resolve) => setTimeout(resolve, DELAY));

  const parsedLocalData: LocalStorageData | null = localStorageData
    ? JSON.parse(localStorageData)
    : null;
  const success = await saveToLocalStorage(datatoLocal);

  if (success) {
    const updatedLocalStorageData: string | null =
      localStorage.getItem(LOCAL_STORAGE_KEY);
    logEvent(
      "Сообщение от сервера",
      `Сохранено: ${JSON.stringify(datatoLocal)},  значение в localStorage:${updatedLocalStorageData}}`,
    );
  } else {
    logEvent(
      "Сообщение от сервера",
      `Ошибка сохранения: ${JSON.stringify(datatoLocal)},  значение в localStorage: ${JSON.stringify(parsedLocalData, null, 2)}`,
    );
  }
};
const computedLocalStorageInfo = computed(() => {
  const data: LocalStorageData = {
    amount: amount.value,
    price: price.value,
    quantity: quantity.value,
    counter: counter.value,
  };
  return JSON.stringify(data);
});

onMounted(() => {
  const savedData = loadFromLocalStorage();

  if (savedData) {
    price.value = savedData.price || 0;
    quantity.value = savedData.quantity || 0;
    amount.value = savedData.amount || 0;
  }
});
</script>

<template>
  <div class="container">
    <InputForm
      v-model:price="price"
      v-model:quantity="quantity"
      v-model:amount="amount"
      @save="handleSave"
      @input-changed="handleInputChanged"
    />
    <DataForm
      :price="price"
      :quantity="quantity"
      :amount="amount"
      :local-storage-info="computedLocalStorageInfo"
    />
    <ActionsForm :events="events" />
  </div>
</template>

<style scoped src="./MainPage.scss"></style>
