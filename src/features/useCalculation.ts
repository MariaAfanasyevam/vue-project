import { ref, watchEffect } from "vue";
import type { InputField } from "@/types/types.ts";

export function useCalculation(initialData?: {
  price?: number;
  quantity?: number;
  amount?: number;
}) {
  const price = ref<number>(initialData?.price || 0);
  const quantity = ref<number>(initialData?.quantity || 0);
  const amount = ref<number>(initialData?.amount || 0);
  const changedInput = ref<InputField | "">("");

  watchEffect((): void => {
    if (changedInput.value === "price" || changedInput.value === "quantity") {
      amount.value = price.value * quantity.value;
    } else {
      if (quantity.value !== 0) {
        price.value = amount.value / quantity.value;
      } else {
        price.value = 0;
      }
    }
  });

  const setChangedInput = (field: InputField): void => {
    changedInput.value = field;
  };
  return {
    price,
    quantity,
    amount,
    changedInput,
    setChangedInput,
  };
}
