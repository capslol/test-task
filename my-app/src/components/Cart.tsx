import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFromCart, getCartItems } from '../services/cartService';
import { ProductType } from '../types/types';
import { Container, Header } from '../styles/styles';
import GoBackButton from './GoBackButton';
import socket from "../services/socket";

const Cart: React.FC = () => {
    const queryClient = useQueryClient();

    const { data: cartItems, isLoading, isError } = useQuery({
        queryKey: ['cartItems'],
        queryFn: getCartItems
    });

    const deleteMutation = useMutation({
        mutationFn: (productId: string) => removeFromCart(productId),
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: ['cartItems']
            });
        },
    });

    useEffect(() => {
        socket.on('connect', () => {


            socket.on('user:update', (data: ProductType) => {
                console.log('Product updated!', data);
                queryClient.refetchQueries({
                    queryKey: ['cartItems']
                });
            });


        });

        return () => {
            socket.off('user:update');
        };
    }, [queryClient]);

    if (isLoading) {
        return <CartContainer>Loading...</CartContainer>;
    }

    if (isError) {
        return <CartContainer>Error loading cart items</CartContainer>;
    }

    const handleRemoveItem = async (productId: string) => {
        deleteMutation.mutate(productId);
    };

    return (
        <Container>
            <Header>
                <GoBackButton />
            </Header>
            <CartTitle>Корзина</CartTitle>
            {cartItems && cartItems.length > 0 ? (
                <CartItemsContainer>
                    {cartItems.map((item: ProductType) => (
                        <CartItem key={item.id}>
                            <ProductInfo>
                                <ProductTitle>{item.title}</ProductTitle>
                                <ProductPrice>${item.price}</ProductPrice>
                            </ProductInfo>
                            <RemoveButton onClick={() => handleRemoveItem(item.id)}>Remove</RemoveButton>
                        </CartItem>
                    ))}
                </CartItemsContainer>
            ) : (
                <EmptyCartMessage>Корзина пуста</EmptyCartMessage>
            )}
        </Container>
    );
};

const CartContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const CartTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductTitle = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #555;
`;

const ProductPrice = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  color: #888;
`;

const RemoveButton = styled.button`
  background-color: #ff3b30;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e32e1f;
  }

  &:active {
    background-color: #c12b1a;
  }
`;

const EmptyCartMessage = styled.p`
  font-size: 18px;
  color: #888;
`;

export default Cart;
