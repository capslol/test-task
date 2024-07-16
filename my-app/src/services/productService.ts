// productService.ts
import axios from 'axios';
import { Product } from '../types/types';
const apiUrl = 'http://localhost:1337/api/auth/local';

export const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get(`${apiUrl}/products`);
    return response.data;
};
