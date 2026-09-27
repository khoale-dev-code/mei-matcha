export type MenuCategoryId = "premium" | "classic" | "hojicha" | "fusion";

export type MenuSize = "M" | "L";

export type MenuPriceMap = Record<MenuSize, number | null>;

export type MenuOption = {
  id: string;
  label: string;
  surcharge: number;
};

export type MenuExtra = MenuOption;

export type MenuItem = {
  id: string;
  category: MenuCategoryId;
  name: string;
  house?: string;
  description?: string;
  prices: MenuPriceMap;
  volume: Record<MenuSize, string>;
  badges?: string[];
  coldWhiskSurcharge?: number;
  allowsMilk?: boolean;
  allowsSweetness?: boolean;
  allowsToppings?: boolean;
  extras?: MenuExtra[];
  availableForSelection?: boolean;
};

export type MenuSelection = {
  id: string;
  itemId: string;
  name: string;
  size: MenuSize;
  milkId?: string;
  sweetness?: number;
  toppingIds: string[];
  extraIds: string[];
  coldWhisk: boolean;
  total: number;
};
