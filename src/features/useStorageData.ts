import { computed, onMounted, ref } from "vue";
import type { LocalStorageData } from "@/types/types.ts";

export function useStorageData() {
  const counter = ref<number>(0);
  const localStorageInfo = computed((): string => {
    const data: LocalStorageData = {
      counter: counter.value,
      price: price.value,
      quantity: quantity.value,
      amount: amount.value,
    };
    return JSON.stringify(data);
  });

  const saveToLocalStorage = async (
    data: LocalStorageData,
  ): Promise<boolean> => {
    counter.value += 1;
    const datatoLocal: LocalStorageData = {
      ...data,
      counter: counter.value,
    };

    const localStorageData: string | null = localStorage.getItem("localData");
    const oldLocalData: LocalStorageData | null = localStorageData
      ? JSON.parse(localStorageData)
      : null;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const parsedLocalData: LocalStorageData | null = localStorageData
      ? JSON.parse(localStorageData)
      : null;
    const success: boolean = amount.value % 2 === 0;

    if (success) {
      localStorage.setItem("localData", JSON.stringify(datatoLocal));
    }
    return success;
  };
  const loadFromLocalStorage = (): LocalStorageData | null => {
    const localData: string | null = localStorage.getItem("localData");
    if (localData) {
      try {
        const parsed: LocalStorageData = JSON.parse(localData);
        counter.value = parsed.counter || 0;
        return parsed;
      } catch (e) {
        return null;
      }
    }
  };
  onMounted((): void => {
    loadFromLocalStorage();
  });
  return {
    counter,
    localStorageInfo,
    saveToLocalStorage,
    loadFromLocalStorage,
  };
}
