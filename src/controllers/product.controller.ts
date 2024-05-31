import { Request, Response } from 'express';

import type {
  DescriptionResponse,
  ProductListResponse,
  ProductResponse,
} from '../models/Meli';
import { ProductDetail, ProductList } from '../models/Products';
import { getAuthor, getCategories, parseProduct } from '../utils/parserData';
import clientInstance from '../utils/httpClient';
import tryCatch from '../utils/tryCatch';

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
