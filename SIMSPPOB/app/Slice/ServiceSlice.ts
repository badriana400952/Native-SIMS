import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiData } from "../../api/ApiData";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export interface IService {
    service_code: string
    service_name: string
    service_icon: File
    service_tariff: number
}

interface IServiceState {
    service: IService[]
    loading: boolean
    error: string
}
const initialState: IServiceState = {
    service: [],
    loading: false,
    error: ""
}


export const getService = createAsyncThunk("service/getService", async () => {
    try {
        const response = await apiData.get("/services", {
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

const ServiceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getService.pending, (state) => {
                state.loading = true
            })
            .addCase(getService.fulfilled, (state, action) => {
                state.loading = false
                state.service = action.payload
                state.error = ""
            })
            .addCase(getService.rejected, (state, action) => {
                state.loading = false
                state.error = "error Reduct"
            })
    }
})

export default ServiceSlice.reducer