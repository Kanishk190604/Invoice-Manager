'use client'
import React ,{useEffect,useState}from 'react'
import { useParams } from 'next/navigation'
import Invoicedesign from '@/app/invoicedesign';
function page() {
  const {id}=useParams();
const [data,setData]=useState<any>({});
useEffect(()=>{
const fetchdata=async()=>{const data=await fetch('/api/userdata')
 const result= await data.json();
const user=result.find((u:any)=>u._id===id)
setData(user);
}
fetchdata()


},[])
  return (
    <Invoicedesign Id={data._id} Sr={data.Sr} BillingDate={data.Date} BillingName={data.Billingname} Billingemail={data.Billingemail} Value={data.Value} Description={data.Description} Status={data.status} HandleStatus={(type:any)=>{setData((prev:any)=>({...prev,status:type}))} 
   }/>
  )
}

export default page