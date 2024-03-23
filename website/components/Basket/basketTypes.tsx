import { base64 } from '@/utils/base64';

export interface Pizza {
  id: number;
  name: string;
  price: string;
  ingredients: string[];
  image?: base64;
  onAdd: (arg0: Pizza) => void;
}

export interface AddableItem {
  itemId: number;
  name?: string;
  amount: number;
}

export interface Content {
  added: AddableItem[]
}

export interface IBasket extends Content {
  onContentUpdated: (newContent: AddableItem[]) => void;
}

export interface IBasketItem extends AddableItem {
  onAmountChange: (amountChange: number) => void;
}
