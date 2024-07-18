

export interface User {
    id: string;
    username: string;
    email: string;
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
    cart: ProductType[]
}
export interface ProductType {
    id: string; // Уникальный идентификатор продукта, обычно строка
    title: string; // Название продукта
    image: string; // URL изображения продукта
    price: number; // Цена продукта
    user: User;
}


export interface LoginResponse {
    jwt: string;
    user: User;
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
