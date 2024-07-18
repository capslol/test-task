import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/productService';
import Product from './Product';



const ProductList: React.FC = () => {
    const { data: products, isLoading: isLoadingProducts, isError: isErrorProducts } = useQuery({
        queryKey: ['productData'],
        queryFn: getProducts
    });

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
