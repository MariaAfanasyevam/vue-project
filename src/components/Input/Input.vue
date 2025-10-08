<script setup lang="ts">
import { toRefs } from "vue";
interface Props {
  id: string;
  type?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "number",
});
const { id, type, placeholder } = toRefs(props);
const model = defineModel();
</script>

<template>
  <input :id="id" :type="type" :placeholder="placeholder" v-model="model" />
</template>

<style scoped src="./Input.scss"></style>
