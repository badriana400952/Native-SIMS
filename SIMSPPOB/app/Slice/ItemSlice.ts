import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiData } from "../../api/ApiData";

export interface IItem {
    id : number
    name : string
    harga : number
    deskripsi : string
    image : File 
}

interface IItemState {
    item : IItem[]
    loading : boolean
    error : string
}
const initialState : IItemState = {
    item : [],
    loading : false,
    error : ""
}


export const getDataItem = createAsyncThunk("item/getDataItem", async () => {
    try {
        const response = await apiData.get("/item", {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log("ini respon", response)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getDataItem.pending, (state) => {
            state.loading = true
        })
        .addCase(getDataItem.fulfilled, (state, action) => {
            state.loading = false
            state.item = action.payload
            state.error = ""
        })
        .addCase(getDataItem.rejected, (state, action) => {
            state.loading = false
            state.error = "error Reduct"
        })
    }
})

export default itemSlice.reducer