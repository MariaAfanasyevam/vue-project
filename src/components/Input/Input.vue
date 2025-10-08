<script setup lang="ts">
import { watch } from "vue";
interface Props {
  id: string;
  type?: string;
  placeholder?: string;
}

const Props = withDefaults(defineProps(), {
  type: "number",
});

const model = defineModel();

watch(model, (newValue) => {
  model.value = newValue;
});
</script>

<template>
  <input id="id" type="type" placeholder="placeholder" v-model="model" />
</template>

<style scoped src="./Input.scss"></style>
