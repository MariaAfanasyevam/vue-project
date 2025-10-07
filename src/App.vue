<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

interface EventData {
  id: number;
  type: string;
  body: string;
  time: string;
}

interface LocalStorageData {
  counter: number;
  price: number;
  quantity: number;
  amount: number;
}

type InputField = "price" | "quantity" | "amount";

const price = ref<number>(0);
const quantity = ref<number>(0);
const amount = ref<number>(0);
const counter = ref<number>(0);
const changedInput = ref<InputField | "">("");
const events = ref<EventData[]>([]);

const localStorageInfo = computed((): string => {
  const data: LocalStorageData = {
    counter: counter.value,
    price: price.value,
    quantity: quantity.value,
    amount: amount.value,
  };
  return JSON.stringify(data);
});

let timer: number | null = null;

const debounce = <T extends (...args: any[]) => void>(
  f: T,
  delay: number,
): T => {
  return ((...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => f(...args), delay);
  }) as T;
};

const logEvent = (type: string, body: string): void => {
  const event: EventData = {
    id: Date.now(),
    type,
    body,
    time: new Date().toLocaleTimeString(),
  };

  events.value.unshift(event);
};

const onChangePrice = debounce((): void => {
  changedInput.value = "price";
  logEvent("Изменено значение в поле Цена", `Цена изменена на ${price.value}`);
}, 300);

const onChangeQuantity = debounce((): void => {
  changedInput.value = "quantity";
  logEvent(
    "Изменено значение в поле Количество",
    `Количество изменено на ${quantity.value}`,
  );
}, 300);

const onChangeAmount = debounce((): void => {
  changedInput.value = "amount";
  logEvent(
    "Изменено значение в поле Amount",
    `Сумма изменена на ${amount.value}`,
  );
}, 300);

const onSave = async (): Promise<void> => {
  counter.value += 1;
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
  const success: boolean = amount.value % 2 === 0;

  if (success) {
    localStorage.setItem("localData", JSON.stringify(datatoLocal));
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

const calculate = (): void => {
  if (changedInput.value === "price") {
    amount.value = price.value * quantity.value;
  } else if (changedInput.value === "quantity") {
    amount.value = price.value * quantity.value;
  } else if (changedInput.value === "amount") {
    if (quantity.value !== 0) {
      price.value = amount.value / quantity.value;
    }
  }
};

watch([price, amount, quantity], (): void => {
  if (changedInput.value) {
    calculate();
  }
});

onMounted((): void => {
  const localData: string | null = localStorage.getItem("localData");
  if (localData) {
    try {
      const parsed: LocalStorageData = JSON.parse(localData);
      counter.value = parsed.counter || 0;
      price.value = parsed.price || 0;
      quantity.value = parsed.quantity || 0; // Исправлена ошибка: было parsed.price
      amount.value = parsed.amount || 0;
    } catch (e) {
      console.log(e);
    }
  }
});
</script>

<template>
  <div class="container">
    <div class="rows-container">
      <div class="input-row">
        <input
          id="price"
          type="number"
          placeholder="Цена"
          v-model="price"
          @input="onChangePrice"
        />
      </div>
      <div class="input-row">
        <input
          id="quantity"
          type="number"
          placeholder="Количество"
          v-model="quantity"
          @input="onChangeQuantity"
        />
      </div>
      <div class="input-row">
        <input
          id="amount"
          type="number"
          placeholder="Сумма"
          v-model="amount"
          @input="onChangeAmount"
        />
      </div>
      <div class="button">
        <button @click="onSave">Сохранить</button>
      </div>
    </div>
    <div class="labels-container">
      <label for="price" class="label">Цена {{ price }}</label>
      <label for="quantity" class="label">Количество {{ quantity }}</label>
      <label for="amount" class="label">Сумма {{ amount }}</label>
      <div class="label">Localstorage {{ localStorageInfo }}</div>
    </div>
    <div class="actions-container">
      <div class="action">
        <div class="action-label">События</div>
        <div v-for="event in events" :key="event.id" class="event-item">
          <div class="action-header">{{ event.time }}</div>
          <div class="action-title">
            {{ event.type }}
          </div>
          <div class="action-body">
            {{ event.body }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./style/style.scss"></style>
