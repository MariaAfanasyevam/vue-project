export interface LocalStorageData {
  counter: number;
  price: number;
  quantity: number;
  amount: number;
}

export type InputField = "price" | "quantity" | "amount";

export interface EventData {
  id: number;
  type: string;
  body: string;
  time: string;
}
