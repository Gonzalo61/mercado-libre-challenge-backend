type ConditionType = 'new' | 'used';

interface Product {
  id: string;
  title: string;
  price: {
    amount: number;
    currency: string;
    decimals: number;
  };
  picture: string;
  condition: ConditionType;
  free_shipping: boolean;
}

export interface Author {
  name: string;
  lastname: string;
}

export interface ProductInfo extends Product {
  description: string;
}

export interface ProductDetail {
  author: Author;
  item: ProductInfo;
}

export interface ProductList {
  author: Author;
  categories: string[];
  items: Product[];
}
