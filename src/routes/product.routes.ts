import { Router } from 'express';
import { getProduct, getProductList } from '../controllers/product.controller';

const router = Router();

router.get('/items', getProductList);

router.get('/items/:id', getProduct);

export default router;
