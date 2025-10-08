<script setup lang="ts">
interface Props {
  price: number;
  quantity: number;
  amount: number;
  localStorageInfo: string;
}
defineProps<Props>();
</script>

<template>
  <div class="labels-container">
    <label for="price" class="label">Цена {{ price }}</label>
    <label for="quantity" class="label">Количество {{ quantity }}</label>
    <label for="amount" class="label">Сумма {{ amount }}</label>
    <div class="label">Localstorage {{ localStorageInfo }}</div>
  </div>
</template>

<style scoped></style>
