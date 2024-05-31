import { Request, Response } from 'express';

import type {
  DescriptionResponse,
  Filter,
  ProductListResponse,
  Picture,
  ProductResponse,
} from '../models/Meli';
import { ProductDetail, ProductList } from '../models/Products';
import clientInstance from '../utils/httpClient';
import tryCatch from '../utils/tryCatch';

const getCategories = (filters: Filter[]) => {
  const categories = filters.find((filter) => filter.id === 'category');
  const categoriesPath = categories?.values.map(
    (category) => category.path_from_root
  );
  const categoriesName = categoriesPath?.map((path) =>
    path.map((category) => category.name)
  );
  return categoriesName?.length ? categoriesName[0] : [];
};

const getPicture = (pictures: Picture[] | undefined, thumbnail: string) => {
  if (pictures && pictures.length) return pictures[0].url;
  return thumbnail;
};

const getAuthor = () => ({
  name: 'Gonzalo',
  lastname: 'Corsánigo',
});

const parsePrice = (price: number, currency: string) => ({
  amount: Math.trunc(price),
  currency,
  decimals: Math.floor((price * 100) % 100),
});

const parseProduct = (product: ProductResponse) => {
  const {
    id,
    title,
    price,
    currency_id,
    pictures,
    thumbnail,
    condition,
    shipping,
  } = product;
  return {
    id,
    title,
    price: parsePrice(price, currency_id),
    picture: getPicture(pictures, thumbnail),
    condition,
    free_shipping: shipping?.free_shipping,
  };
};

export const getProductList = tryCatch(
  async (req: Request, res: Response<ProductList>) => {
    const { q: search, limit } = req.query;
    const response = await clientInstance.get<ProductListResponse>(
      `/sites/MLA/search?q=${search}&limit=${limit}`
    );
    const parsedResponse = {
      author: getAuthor(),
      categories: getCategories(response.data.filters),
      items: response.data.results.map((item) => parseProduct(item)),
    };
    res.status(200).json(parsedResponse);
  }
);

export const getProduct = tryCatch(
  async (req: Request, res: Response<ProductDetail>) => {
    const { id } = req.params;
    const product = await clientInstance.get<ProductResponse>(`/items/${id}`);
    const description = await clientInstance.get<DescriptionResponse>(
      `/items/${id}/description`
    );
    const parsedData = {
      author: getAuthor(),
      item: {
        ...parseProduct(product.data),
        description: description.data.plain_text,
      },
    };

    res.status(200).json(parsedData);
  }
);
