<script setup lang="ts">
interface Props {
  id: string;
  type?: string;
  placeholder?: string;
}

const Props = withDefaults(defineProps(), {
  type: "number",
});

const model = defineModel();

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const value = parseFloat(target.value) || 0;
  model.value = value;
};
</script>

<template>
  <input
    id="id"
    type="type"
    placeholder="placeholder"
    v-model="model"
    @input="handleInput"
  />
</template>

<style scoped></style>
