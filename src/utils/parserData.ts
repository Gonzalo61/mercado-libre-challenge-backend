import type { Filter, Picture, ProductResponse } from '../models/Meli';

export const getCategories = (filters: Filter[]) => {
  const categories = filters.find((filter) => filter.id === 'category');
  const categoriesPath = categories?.values.map(
    (category) => category.path_from_root
  );
  const categoriesName = categoriesPath?.map((path) =>
    path.map((category) => category.name)
  );
  return categoriesName?.length ? categoriesName[0] : [];
};

export const getPicture = (
  pictures: Picture[] | undefined,
  thumbnail: string
) => {
  if (pictures && pictures.length) return pictures[0].url;
  return thumbnail;
};

export const getAuthor = () => ({
  name: 'Gonzalo',
  lastname: 'Corsánigo',
});

export const parsePrice = (price: number, currency: string) => ({
  amount: Math.trunc(price),
  currency,
  decimals: Math.floor((price * 100) % 100),
});

export const parseProduct = (product: ProductResponse) => {
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
