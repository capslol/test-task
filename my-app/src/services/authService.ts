import axios from 'axios';
import {LoginData, LoginResponse, RegistrationData, User} from "../types/types";



export const registerUser = async (userData: RegistrationData): Promise<boolean> => {
    try {
        const apiUrl = 'http://localhost:1337/api/auth/local/register';
        const response = await axios.post(apiUrl, userData);

        if (response.status === 200) {
            console.log('Пользователь успешно зарегистрирован:', response.data);
            return true;
        } else {
            console.error('Произошла ошибка при регистрации:', response.data);
            return false;
        }
    } catch (error) {
        console.error('Произошла ошибка при выполнении запроса:', error);
        return false;
    }
};

export const loginService = async ({ email, password }: LoginData): Promise<LoginResponse> => {
    const apiUrl = 'http://localhost:1337/api/auth/local';
    const response = await axios.post(apiUrl, { identifier: email, password });
    return response.data;
};