import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/store'
import { getBalance } from '../app/Slice/BalanceSlice'

const TopupHooks = () => {
  const dispatch = useAppDispatch()
  const { balance } = useAppSelector((state) => state.balance)
  const [selectedAmount, setSelectedAmount] = useState(0)

  useEffect(() => {
    dispatch(getBalance())
  }, [dispatch])

  const handleAmountSelection = (amount: number) => {
    setSelectedAmount(amount);
  }

  function formatRupiah(amount: number) {
    const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `Rp ${formattedAmount}`;
  }

  return { balance, selectedAmount, setSelectedAmount, handleAmountSelection, formatRupiah }
}

export default TopupHooks
