import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/store'
import { getBalance } from '../app/Slice/BalanceSlice'
import { getTransaksi } from '../app/Slice/TransaksiSlice';

const TransaksiHooks = () => {
  const [visibleCards, setVisibleCards] = useState(5);
  const dispatch = useAppDispatch();
  const { transaksi } = useAppSelector((state) => state.transaksi)
  const { balance } = useAppSelector((state) => state.balance)
  useEffect(() => {
    dispatch(getTransaksi())
  }, [dispatch])

  useEffect(() => {
    dispatch(getBalance())
  }, [dispatch])


  const handleSeeMoreClick = () => {
    setVisibleCards(prevVisibleCards => prevVisibleCards + 5)
  };
  function konversiWaktu(waktuAwal: string) {
    const dateAwal = new Date(waktuAwal);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    };

    const waktuAkhir = dateAwal.toLocaleDateString('id-ID', options)
    return waktuAkhir
  }
  function formatRupiah(amount:number) {
    const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `Rp ${formattedAmount}`;
  }

  return { transaksi, balance, visibleCards, setVisibleCards, handleSeeMoreClick, konversiWaktu, formatRupiah }
}

export default TransaksiHooks
