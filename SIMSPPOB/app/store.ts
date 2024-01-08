import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import productReducer from "./Slice/ProductSlice"
import persistedReducer from "./Slice/UserSlice"
import itemReducer from "./Slice/ItemSlice"
import serviceReducer from "./Slice/ServiceSlice"
import bannerReducer from "./Slice/BannerSlice"
import balanceReducer from "./Slice/BalanceSlice"
import transaksiReducer from "./Slice/TransaksiSlice"
import topupReducer from "./Slice/TopupSlice"



export const store = configureStore({
  reducer: {
    product: productReducer,
    user: persistedReducer,
    item: itemReducer,   
    service: serviceReducer,   
    banner: bannerReducer,   
    balance: balanceReducer,   
    transaksi: transaksiReducer,        
    topup: topupReducer        
  }
})


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector : TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector