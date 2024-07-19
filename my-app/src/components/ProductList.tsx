import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import { getProducts } from '../services/productService';
import Product from './Product';
import {ProductType} from "../types/types";
import socket from "../services/socket";




const ProductList: React.FC = () => {
    const { data: products, isLoading: isLoadingProducts, isError: isErrorProducts } = useQuery({
        queryKey: ['productData'],
        queryFn: getProducts
    });
    const queryClient = useQueryClient();


    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected')
            socket.on('product:create', (data: ProductType) => {
                console.log('Product created!', data);
                queryClient.refetchQueries({
                    queryKey: ['productData']
                });
            });

            socket.on('product:update', (data: ProductType) => {
                console.log('Product updated!', data);
                queryClient.refetchQueries({
                    queryKey: ['productData']
                });
            });

            socket.on('product:delete', (data: { id: string }) => {
                console.log('Product deleted!', data);
                queryClient.refetchQueries({
                    queryKey: ['productData']
                });
            });
        });

        return () => {
            socket.off('product:create');
            socket.off('product:update');
            socket.off('product:delete');
        };
    }, [queryClient]);

    if (isLoadingProducts) {
        return <Loading>Loading...</Loading>;
    }

    if (isErrorProducts) {
        return <Error>Error loading products</Error>;
    }

    return (
        <ProductsContainer>
            {products?.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </ProductsContainer>
    );
};

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: red;
`;

export default ProductList;
