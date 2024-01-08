import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface IProduct {
    id: number
    prdnm: string
    harga: number
}
interface IProductState {
    product: IProduct[]
    loading: boolean
    error: string
}
const initialState: IProductState = {
    product: [],
    loading: false,
    error: "",
}

export const getDataProduct = createAsyncThunk("product/getDataProduct", async () => {
    try {
        const response = await axios.get("http://localhost:5000/product")
        console.log("ini respon", response)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const postDataProduct = createAsyncThunk("product/postDataProduct", async (data: IProduct) => {
    try {
        const response = await axios.post(`http://localhost:5000/product`, data)
        console.log("ini respon", response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const updateDataProduct = createAsyncThunk("product/updateDataProduct", async ({ data, itemId }: { data: IProduct, itemId: number }, thunkAPI) => {
    try {
        const response = await axios.patch(`http://localhost:5000/product/${itemId}`, data);
        console.log("ini respon", response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});


export const deleteDataProduct = createAsyncThunk("product/deleteDataProduct", async (id: number) => {
    try {
        const response = await axios.delete(`http://localhost:5000/product/${id}`)
        console.log("ini respon", response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

const ProductSlece = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDataProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(getDataProduct.fulfilled, (state, action) => {
                state.loading = false
                state.product = action.payload
                state.error = ""
            })
            .addCase(getDataProduct.rejected, (state, action) => {
                state.loading = false
                state.error = "error Reduct"
            })

            //post
            .addCase(postDataProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(postDataProduct.fulfilled, (state, action) => {
                state.loading = false
                state.product = action.payload
                state.error = ""
            })
            .addCase(postDataProduct.rejected, (state, action) => {
                state.loading = false
                state.error = "error Reduct"
            })

            .addCase(updateDataProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(updateDataProduct.fulfilled, (state, action) => {
                state.loading = false
                state.product = action.payload
                state.error = ""
            })
            .addCase(updateDataProduct.rejected, (state, action) => {
                state.loading = false
                state.error = "error Reduct"
            })

            //delete
            .addCase(deleteDataProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteDataProduct.fulfilled, (state, action) => {
                state.loading = false
                state.product = action.payload
                state.error = ""
            })
            .addCase(deleteDataProduct.rejected, (state, action) => {
                state.loading = false
                state.error = "error Reduct"
            })
    }
})

export default ProductSlece.reducer