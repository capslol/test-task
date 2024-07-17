import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { ProductType as ProductType } from '../types/types';
import {addToCart} from "../services/productService";

const ProductCard = styled.div`
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px;

  @media (min-width: 768px) {
    width: calc(50% - 16px);
  }

  @media (min-width: 1024px) {
    width: calc(33.33% - 16px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const ProductName = styled.h3`
  font-size: 18px;
  margin: 0;
  margin-bottom: 8px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  color: #333;
`;

const AddToCartButton = styled.button<{ inCart: boolean }>`
  background-color: ${({ inCart }) => (inCart ? '#28a745' : '#007bff')};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ inCart }) => (inCart ? '#218838' : '#0056b3')};
  }

  &:active {
    background-color: ${({ inCart }) => (inCart ? '#1e7e34' : '#004494')};
  }
`;
interface ProductProps {
    product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setInCart(cartItems.includes(product.id));
    }, [product.id]);

    const handleAddToCart = async () => {
        try {
            await addToCart(product.id);
            setInCart(true);
            // Optionally update local storage or state management for cart
            const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
            localStorage.setItem('cartItems', JSON.stringify([...cartItems, product.id]));
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <ProductCard>
            <ProductImage src={product.image} alt={product.title} />
            <ProductName>{product.title}</ProductName>
            <ProductPrice>${product.price}</ProductPrice>
            <AddToCartButton onClick={handleAddToCart} inCart={inCart}>
                {inCart ? 'Товар добавлен' : 'Добавить в корзину'}
            </AddToCartButton>

        </ProductCard>
    );
};

export default Product;
