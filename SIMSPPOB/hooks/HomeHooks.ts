import React, {useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/store'
import { getService } from '../app/Slice/ServiceSlice'
import { getBanners } from '../app/Slice/BannerSlice'
import { getBalance } from '../app/Slice/BalanceSlice'
import { getUser } from '../app/Slice/UserSlice'

const HomeHooks = () => {

  const carouselRef = useRef(null);
  const dispatch = useAppDispatch()
  const { service } = useAppSelector((state) => state.service)
  const { banner } = useAppSelector((state) => state.banner)
  const { balance } = useAppSelector((state) => state.balance)
  const {user} = useAppSelector((state) => state.user)


  useEffect(() => {
    dispatch(getService())
  }, [dispatch])

  useEffect(() => {
    dispatch(getBanners())
  }, [dispatch])

  useEffect(() => {
    dispatch(getBalance())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUser())
  }, [])


  function formatRupiah(amount: number) {
    const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `Rp ${formattedAmount}`;
  }

  const renderName = (name: string) => {
    const currName = name.split(" ")
    return currName[1] === "Berlangganan" || !currName[1] ? currName[0] : currName[1]
  }

  return { service, banner, balance, formatRupiah, renderName, carouselRef,user }
}

export default HomeHooks
