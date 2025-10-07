<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const price = ref(0);
const quantity = ref(0);
const amount = ref(0);
const counter = ref(0);

const events = ref([]);
const localStorageInfo = computed(() => {
  const data = {
    counter: counter.value,
    price: price.value,
    quantity: quantity.value,
    amount: amount.value,
  };
  return JSON.stringify(data);
});

let timer;
const debounce = (f, delay) => {
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => f(...args), delay);
  };
};

onMounted(() => {
  const localData = localStorage.getItem("localStorageData");
  if (!localData) {
    return;
  }
  try {
    const {
      counter = 0,
      price = 0,
      quantity = 0,
      amount = 0,
    } = JSON.parse(localData);
    counter.value = counter;
    price.value = price;
    quantity.value = quantity;
    amount.value = amount;
  } catch (e) {
    console.log(e);
  }
});
</script>
<template>
  <div class="container">
    <div class="rows-container">
      <div class="input-row">
        <input id="price" type="number" placeholder="Цена" v-model="price" />
      </div>
      <div class="input-row">
        <input
          id="quantity"
          type="number"
          placeholder="Количество"
          v-model="quantity"
        />
      </div>
      <div class="input-row">
        <input id="amount" type="number" placeholder="Сумма" v-model="amount" />
      </div>
      <div class="button">
        <button>Сохранить</button>
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
        <div class="action-header"></div>
        <div class="action-title"></div>
        <div class="action-body"></div>
      </div>
    </div>
  </div>
</template>
<style src="./style/style.css"></style>
