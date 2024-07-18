import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProductType } from '../types/types';
import { addToCart } from "../services/productService";
import { getCartItems } from "../services/cartService";

interface ProductProps {
    product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            const cartItems = await getCartItems();
            setInCart(cartItems.some((item: { id: string }) => item.id === product.id));
        };

        fetchCartItems();
    }, [product.id]);

    const handleAddToCart = async () => {
        try {
            await addToCart(product.id);
            setInCart(true);
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
                {inCart ? 'Added' : 'Add to cart'}
            </AddToCartButton>
        </ProductCard>
    );
};

const ProductCard = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 16px;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 16px;
`;

const ProductName = styled.h3`
  font-size: 24px;
  margin: 0;
  margin-bottom: 8px;
  color: #333;
  text-align: center;
`;

const ProductPrice = styled.p`
  font-size: 20px;
  color: #555;
  margin-bottom: 16px;
`;

const AddToCartButton = styled.button<{ inCart: boolean }>`
  background-color: ${({ inCart }) => (inCart ? '#28a745' : '#007bff')};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ inCart }) => (inCart ? '#218838' : '#0056b3')};
  }

  &:active {
    background-color: ${({ inCart }) => (inCart ? '#1e7e34' : '#004494')};
  }
`;

export default Product;
