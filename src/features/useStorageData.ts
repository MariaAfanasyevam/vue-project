import { computed, onMounted, ref } from "vue";
import type { LocalStorageData } from "@/types/types.ts";
import { DELAY, LOCAL_STORAGE_KEY } from "@/constants/common.ts";

export function useStorageData() {
  const counter = ref<number>(0);
  const saveToLocalStorage = async (
    data: LocalStorageData,
  ): Promise<boolean> => {
    counter.value += 1;
    const datatoLocal: LocalStorageData = {
      ...data,
      counter: counter.value,
    };

    await new Promise((resolve) => setTimeout(resolve, DELAY));

    const success: boolean = datatoLocal.amount % 2 === 0;

    if (success) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(datatoLocal));
    }
    return success;
  };
  const loadFromLocalStorage = (): LocalStorageData | null => {
    const localData: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localData) {
      try {
        const parsed: LocalStorageData = JSON.parse(localData);
        counter.value = parsed.counter || 0;
        return parsed;
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
  };
  onMounted((): void => {
    loadFromLocalStorage();
  });
  return {
    counter,
    saveToLocalStorage,
    loadFromLocalStorage,
  };
}
