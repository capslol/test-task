// productService.ts
import axios from 'axios';
import {ProductType} from '../types/types';
import {getUserData} from "./authService";
import {getCartItems} from "./cartService";
import transformProductData from "./transformProductData";

const apiUrl = 'http://localhost:1337/api';



export const getProducts = async (): Promise<ProductType[]> => {
    const response = await axios.get(`${apiUrl}/products?populate=image`);
    console.log(response.data);
    return response.data.data.map((item: any) => transformProductData(item));
};


export const addToCart = async (productId: string) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');

    const cart = await getCartItems()

    try {
        const response = await axios.put(
            `${apiUrl}/users/${userId}`,
            {cart: [...cart, {id: productId}]}, // Тело запроса должно содержать корректную структуру для обновления корзины
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
};
