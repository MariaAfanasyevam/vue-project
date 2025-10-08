<script setup lang="ts">
import type { InputField } from "@/types/types.ts";
import { debounce } from "@/utils/debounce.ts";
import Input from "@/components/Input/Input.vue";
import { DEBOUNCE_DELAY } from "@/constants/common.ts";

interface Emits {
  (e: "input-changed", field: InputField): void;
  (e: "save"): void;
}

const emit = defineEmits<Emits>();

const price = defineModel<number>("price");
const quantity = defineModel<number>("quantity");
const amount = defineModel<number>("amount");

const delay = 300;

const handlePriceChange = (value: number) => {
  emit("input-changed", "price");
};

const handleQuantityChange = (value: number) => {
  emit("input-changed", "quantity");
};

const handleAmountChange = (value: number) => {
  emit("input-changed", "amount");
};

const onChangePrice = debounce(handlePriceChange, DEBOUNCE_DELAY);
const onChangeQuantity = debounce(handleQuantityChange, DEBOUNCE_DELAY);
const onChangeAmount = debounce(handleAmountChange, DEBOUNCE_DELAY);

const onSave = (): void => {
  emit("save");
};
</script>
<template>
  <div class="rows-container">
    <div class="input-row">
      <Input
        id="price"
        type="number"
        placeholder="Цена"
        v-model="price"
        @input="onChangePrice"
      />
    </div>
    <div class="input-row">
      <Input
        id="quantity"
        type="number"
        placeholder="Количество"
        v-model="quantity"
        @input="onChangeQuantity"
      />
    </div>
    <div class="input-row">
      <Input
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
</template>

<style scoped src="./InputForm.scss"></style>
