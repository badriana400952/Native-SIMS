import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/store'
import {  getUser, } from '../app/Slice/UserSlice';


const AkunHooks = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUser())
  }, [])

  return {user }
}

export default AkunHooks
