// src/features/productSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/types'; // Предположим, что у вас есть тип Product

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
            state.loading = false;
            state.products = action.payload;
        },
        fetchProductsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productSlice.actions;

export default productSlice.reducer;
