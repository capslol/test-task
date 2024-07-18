import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFromCart, getCartItems } from '../services/cartService';
import { ProductType as ProductType } from '../types/types';
import {colors, Container, fonts, Header, Button, mixins, Section, Avatar} from '../styles/styles';
import {getProducts} from "../services/productService";
import GoBackButton from "./GoBackButton";



const Cart: React.FC = () => {
    const queryClient = useQueryClient();

    // Query for fetching cart items

    const { data: cartItems, isLoading, isError } = useQuery({
        queryKey: ['cartItems'],
        queryFn: getCartItems
    });

    const deleteMutation = useMutation({
        mutationFn: (productId: string) => removeFromCart(productId),
        onSuccess: () => {
            // Обновление кэша для cartItems
            queryClient.refetchQueries({
                queryKey: ['cartItems']
            })
        },
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading products</p>;
    }

    const handleRemoveItem = async (productId: string) => {
        deleteMutation.mutate(productId)

    };

    if (isLoading) {
        return <CartContainer>Loading...</CartContainer>;
    }

    if (isError) {
        return <CartContainer>Error loading cart items</CartContainer>;
    }

    return (
        <Container>
            <Header>
                <GoBackButton/>
            <h2>Корзина</h2>
            {cartItems && cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item: ProductType) => (
                        <CartItem key={item.id}>
                            <ProductInfo>
                                <ProductTitle>{item.title}</ProductTitle>
                                <ProductPrice>${item.price}</ProductPrice>
                            </ProductInfo>
                            <RemoveButton onClick={() => handleRemoveItem(item.id)}>Удалить</RemoveButton>
                        </CartItem>
                    ))}
                </div>
            ) : (
                <p>Корзина пуста</p>
            )}
            </Header>
        </Container>
    );
};


const CartContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductTitle = styled.h4`
  margin: 0;
`;

const ProductPrice = styled.p`
  margin: 0;
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;

export default Cart;
