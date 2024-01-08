import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiData } from "../../api/ApiData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IBalance {
    balance : number
}

interface IBalanceState {
    balance : IBalance
    loading : boolean
    error : string
}
const initialState : IBalanceState = {
    balance : {balance : 0},
    loading : false,
    error : ""
}

export const getBalance = createAsyncThunk("balance/getBalance", async () => {
    try {
        const response = await apiData.get("/balance", {
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

const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getBalance.pending, (state) => {
            state.loading = true
        })
        .addCase(getBalance.fulfilled, (state, action) => {
            state.loading = false
            state.balance = action.payload
            state.error = ""
        })
        .addCase(getBalance.rejected, (state, action) => {
            state.loading = false
            state.error = "error Reduct"
        })
    }
})

export default balanceSlice.reducer