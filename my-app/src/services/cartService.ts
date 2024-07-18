import axios from 'axios';
import {ProductType} from '../types/types';

const apiUrl = 'http://localhost:1337/api/users';


export const getCartItems = async () => {
    const token = localStorage.getItem('accessToken');
    try {
        const response = await axios.get(`${apiUrl}/me?populate=cart`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data.cart)
        return response.data.cart;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
};



export const removeFromCart = async (productId: string) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');

    const cart: ProductType[] = await getCartItems()
    console.log(cart.filter((item ) => item.id !== productId))

    try {
        const response = await axios.put(
            `${apiUrl}/${userId}`,
            {cart: cart.filter((item ) => item.id !== productId)}, // Тело запроса должно содержать корректную структуру для обновления корзины
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
