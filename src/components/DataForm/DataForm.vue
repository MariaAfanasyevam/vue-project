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
    <label for="price" class="label-item">Цена {{ price }}</label>
    <label for="quantity" class="label-item">Количество {{ quantity }}</label>
    <label for="amount" class="label-item">Сумма {{ amount }}</label>
    <div class="label-item">Localstorage {{ localStorageInfo }}</div>
  </div>
</template>

<style scoped src="./DataForm.scss"></style>
