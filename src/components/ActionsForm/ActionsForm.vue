<script setup lang="ts">
import type { EventData } from "@/types/types.ts";

interface Props {
  events: EventData[];
}

defineProps<Props>();
</script>
<template>
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
</template>

<style scoped src="./ActionForm.scss"></style>
