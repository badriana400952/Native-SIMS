import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiData } from "../../api/ApiData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IBanner {
    banner_name : string
    description : string
    banner_image : File 
}

export interface IBannerState {
    banner : IBanner[]
    loading : boolean
    error : string
}
const initialState : IBannerState = {
    banner : [],
    loading : false,
    error : ""
}


export const getBanners = createAsyncThunk("banner/getBanners", async () => {
    try {
        const response = await apiData.get("/banner", {
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




const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getBanners.pending, (state) => {
            state.loading = true
        })
        .addCase(getBanners.fulfilled, (state, action) => {
            state.loading = false
            state.banner = action.payload
            state.error = ""
        })
        .addCase(getBanners.rejected, (state, action) => {
            state.loading = false
            state.error = "error Reduct"
        })
    }
})

export default bannerSlice.reducer