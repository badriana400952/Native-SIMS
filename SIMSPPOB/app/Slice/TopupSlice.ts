import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiData } from "../../api/ApiData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ITopup {
    top_up_amount : number
}

interface ITopupState {
    topup : ITopup
    loading : boolean
    error : string
}
const initialState : ITopupState = {
    topup : {top_up_amount : 0},
    loading : false,
    error : ""
}

export const postTopup = createAsyncThunk("topup/postTopup", async (newData:ITopup) => {
    try {
        const response = await apiData.post("/topup", newData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await AsyncStorage.getItem("token")
            }
        })
        return response.data.data
    } catch (error) {
        console.log(error)
        throw error
    }
})


const topupSlice = createSlice({
    name: "topup",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(postTopup.pending, (state) => {
            state.loading = true
        })
        .addCase(postTopup.fulfilled, (state, action) => {
            state.loading = false
            state.topup = action.payload
            state.error = ""
        })
        .addCase(postTopup.rejected, (state, action) => {
            state.loading = false
            state.error = "error Reduct"
        })
    }
})

export default topupSlice.reducer