export interface Product {
    id: string; // Уникальный идентификатор продукта, обычно строка
    title: string; // Название продукта
    image: string; // URL изображения продукта
    price: number; // Цена продукта
}

export interface User {
    id: string;
    username: string;
    email: string;
}

export interface LoginResponse {
    accessToken: string;
    id: string;
    user: User;
    error: object;
}

export interface LoginData {
    email: string;
    password: string;
}
export interface RegistrationData {
    username: string;
    email: string;
    password: string;
}
