export enum Status {
  inProcess = 0,
  approved = 1,
}

export interface Cart {
  product: string;
  quantity: number;
}