"use client"

import { userInfo } from '@/slices/userSlice'
import axios from 'axios'
import { useDispatch } from 'react-redux'


const VerifyUser = ({children}) => {
    let dispatch = useDispatch()
    let token = JSON.parse(localStorage.getItem("token"))
    axios.get(`${process.env.NEXT_PUBLIC_API}/auth/verifyuser`, {
        headers: {"token" : token}
    }).then((res)=>{
        dispatch(userInfo(res.data.data))
    }).catch((err)=>{
        console.log(err)
    })

  return (
    <div>{children}</div>
  )
}

export default VerifyUser