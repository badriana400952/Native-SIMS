import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiData } from "../../api/ApiData";
import AsyncStorage from "@react-native-async-storage/async-storage";



 interface ITransaksiRecord {
    invoice_number: number,
    transaction_type: string,
    description: string,
    total_amount: number,
    created_on: string

}
export interface ITransaksi {
    offset: number
    limit: number
    records: ITransaksiRecord[]
}

interface ITransaksiState {
    transaksi: ITransaksi
    loading: boolean
    error: string
}
const initialState: ITransaksiState = {
    transaksi: {
        offset: 0,
        limit: 0,
        records: [
            {
                invoice_number: 0,
                transaction_type: "",
                description: "",
                total_amount: 0,
                created_on: ""
            }
        ]
    },
    loading: false,
    error: ""
}


export const getTransaksi = createAsyncThunk("transaksi/getTransaksi", async () => {
    try {
        const response = await apiData.get("/transaction/history", {
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

const transaksiSlice = createSlice({
    name: "transaksi",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTransaksi.pending, (state) => {
                state.loading = true
            })
            .addCase(getTransaksi.fulfilled, (state, action) => {
                state.loading = false
                state.transaksi = action.payload
                state.error = ""
            })
            .addCase(getTransaksi.rejected, (state, action) => {
                state.loading = false
                state.error = "error Reduct"
            })
    }
})

export default transaksiSlice.reducer