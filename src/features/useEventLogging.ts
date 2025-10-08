import { ref } from "vue";
import type { EventData } from "@/types/types.ts";

export function useEventLogging() {
  const events = ref<EventData[]>([]);
  const logEvent = (type: string, body: string): void => {
    const event: EventData = {
      id: Date.now(),
      type,
      body,
      time: new Date().toLocaleTimeString(),
    };

    events.value.unshift(event);
  };
  return {
    logEvent,
    events,
  };
}
