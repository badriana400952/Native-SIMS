import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiData } from "../../api/ApiData";
import AsyncStorage from "@react-native-async-storage/async-storage";


export interface IUSer {
    id: number
    first_name: string,
    last_name: string
    email: string
    profile_image: File
    password: string
}
export interface IRegis {
    id: number
    first_name: string,
    last_name: string
    email: string
    password: string
}
export interface IUserUpdate {
    id: number
    first_name: string,
    last_name: string
    email: string
    profile_image: File 
}
export interface IUpdateProfile {
    first_name: string,
    last_name: string
}
export interface IUpdateImage {
    file: File
}

interface ILogin {
    email: string
    password: string
}
interface loginState {
    user: IUSer;
    loading: boolean;
    error: string;
    token: string;
}

const initialState: loginState = {
    user: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        profile_image: null,
        password: ""
    },
    loading: false,
    error: "",
    token: "",
}

export const LoginUser = createAsyncThunk('user/LoginUser', async (data: ILogin) => {
    try {
        const response = await apiData.post(`/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        console.log("ini respon", response.data)
        await AsyncStorage.setItem('token', response.data.data.token)

        console.log("ini respon", response)
        return response.data.data
    } catch (error) {
        console.log(error)
        throw error
    }
})


export const registrasiUser = createAsyncThunk('user/registrasiUser', async (data: IRegis) => {
    try {
        const response = await apiData.post(`/registration`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log("ini respon", response.data)
        return response.data.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const getUser = createAsyncThunk('user/getUser', async () => {
    try {
        const response = await apiData.get("/profile", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await AsyncStorage.getItem("token")
            }
        })
        console.log("ini respon", response.data.data)
        return response.data.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const updateProfile = createAsyncThunk('user/updateProfile', async (data: IUpdateProfile) => {
    try {
        const response = await apiData.put(`/profile/update`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await AsyncStorage.getItem("token")
            }
        })
        console.log("ini respon", response.data.data)
        return response.data.data
    } catch (error) {
        console.log(error)
        throw error
    }
})

export const updateImageProfile = createAsyncThunk('user/updateImageProfile', async (newData: IUpdateImage) => {
    try {
        const formData = new FormData()
        formData.append("file", newData.file)

        const response = await apiData.put(`/profile/image`, newData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await AsyncStorage.getItem("token")
            }
        })
        console.log("ini respon", response.data.data)
        return response.data.data
    } catch (error) {
        console.log(error)
        throw error
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        logout: (state) => {
            state.token = ""
            state.user = {
                id: 0,
                first_name: "",
                last_name: "",
                email: "",
                profile_image: null,
                password: ""
            }
            AsyncStorage.removeItem('token')
                .then(() => console.log("Token removed successfully"))
                .catch((error: any) => console.error('Error removing token:', error));
        }
    },
    extraReducers: (builder) => {
        (
            builder
                .addCase(LoginUser.pending, (state) => {
                    state.loading = true
                })
                .addCase(LoginUser.fulfilled, (state, action) => {
                    state.loading = false
                    state.user = action.payload
                    state.error = ""
                    state.token = action.payload.token

                })
                .addCase(LoginUser.rejected, (state, action) => {
                    state.loading = false
                    state.error = "error Reduct"
                })

                .addCase(registrasiUser.pending, (state) => {
                    state.loading = true
                })
                .addCase(registrasiUser.fulfilled, (state, action) => {
                    state.loading = false
                    state.user = action.payload
                    state.error = ""
                })
                .addCase(registrasiUser.rejected, (state, action) => {
                    state.loading = false
                    state.error = "error Reduct"
                })


                .addCase(getUser.pending, (state) => {
                    state.loading = true
                })
                .addCase(getUser.fulfilled, (state, action) => {
                    state.loading = false
                    state.user = action.payload
                    state.error = ""
                })
                .addCase(getUser.rejected, (state, action) => {
                    state.loading = false
                    state.error = "error Reduct"
                })
                .addCase(updateProfile.pending, (state) => {
                    state.loading = true
                })
                .addCase(updateProfile.fulfilled, (state, action) => {
                    state.loading = false
                    state.user = action.payload
                    state.error = ""
                })
                .addCase(updateProfile.rejected, (state, action) => {
                    state.loading = false
                    state.error = "error Reduct"
                })
                .addCase(updateImageProfile.pending, (state) => {
                    state.loading = true
                })
                .addCase(updateImageProfile.fulfilled, (state, action) => {
                    state.loading = false
                    state.user = action.payload
                    state.error = ""
                })
                .addCase(updateImageProfile.rejected, (state, action) => {
                    state.loading = false
                    state.error = "error Reduct"
                })
        )
    }
})



export const { logout } = userSlice.actions
export default userSlice.reducer