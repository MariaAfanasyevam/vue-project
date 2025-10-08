<script setup lang="ts">
import DataForm from "@/components/DataForm/DataForm.vue";
import ActionsForm from "@/components/ActionsForm/ActionsForm.vue";
import InputForm from "@/components/InputForm/InputForm.vue";
import { useCalculation } from "@/features/useCalculation.ts";
import { useEventLogging } from "@/features/useEventLogging.ts";
import { useStorageData } from "@/features/useStorageData.ts";
import type { LocalStorageData } from "@/types/types.ts";
import { computed, onMounted } from "vue";

const { price, quantity, amount, setChangedInput } = useCalculation();
const { events, logEvent } = useEventLogging();
const { counter, localStorageInfo, saveToLocalStorage, loadFromLocalStorage } =
  useStorageData();

const handleInputChanged = (field: "price" | "quantity" | "amount") => {
  setChangedInput(field);

  if (field === "price") {
    logEvent(
      "Изменено значение в поле Цена",
      `Цена изменена на ${price.value}`,
    );
  } else if (field === "quantity") {
    logEvent(
      "Изменено значение в поле Количество",
      `Количество изменено на ${quantity.value}`,
    );
  } else if (field === "amount") {
    logEvent(
      "Изменено значение в поле Amount",
      `Сумма изменена на ${amount.value}`,
    );
  }
};

const handleSave = async (): Promise<boolean> => {
  const datatoLocal: LocalStorageData = {
    counter: counter.value,
    price: price.value,
    quantity: quantity.value,
    amount: amount.value,
  };

  const localStorageData: string | null = localStorage.getItem("localData");
  const oldLocalData: LocalStorageData | null = localStorageData
    ? JSON.parse(localStorageData)
    : null;

  logEvent(
    "Отправка данных",
    `Отправлено: ${JSON.stringify(datatoLocal)}, значение в localStorage: ${JSON.stringify(oldLocalData, null, 2)}`,
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const parsedLocalData: LocalStorageData | null = localStorageData
    ? JSON.parse(localStorageData)
    : null;
  const success = await saveToLocalStorage(datatoLocal);

  if (success) {
    const updatedLocalStorageData: string | null =
      localStorage.getItem("localData");
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
  const rawData = localStorage.getItem("localData");

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

<style scoped></style>
