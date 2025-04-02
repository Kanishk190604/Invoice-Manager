'use client'
import React, { useEffect, useState }  from 'react'
import { CirclePlus } from 'lucide-react';




import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Link from 'next/link';
  

 
function dashboard() {
const [data, setData] = useState<any[]>([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await fetch("/api/userdata");
      if (!result.ok) throw new Error("Failed to fetch data");
      const users = await result.json();
      setData(users);
      console.log("Fetched Data:", users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  fetchData();
}, []);
  
 
  
  
  return (
    <div className='m-10'>
      <div className='grid grid-cols-3 gap-4 mb-15'><div></div><div className='text-center p-3 font-bold text-4xl'>DashBoard</div><div className='flex justify-end items-center px-10 gap-2 text-gray-500'><Link href='/invoice/new'>create new invoice</Link><div><CirclePlus/></div></div></div>
        
        <div><Table className='mx-6'>
          <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Date</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Status</TableHead>
        <TableHead >Value</TableHead>
      </TableRow>
    </TableHeader>
       { data.map((e:any,index:number)=>{return( 
  
    <TableBody key={index}>
      <TableRow>
        <TableCell className="font-medium p-0"><Link href={`/invoice/dashboard/${e._id}`} className='p-4'>{new Date(e.Date).toLocaleDateString()}</Link></TableCell>
        <TableCell><Link href={`/invoice/dashboard/${e._id}`} className='p-4'>{e.Billingname}</Link></TableCell>
        <TableCell><Link href={`/invoice/dashboard/${e._id}`} className='p-4'>{e.Billingemail}</Link></TableCell>
        <TableCell><Link href={`/invoice/dashboard/${e._id}`} className='p-4'>{e.status}</Link></TableCell>
        <TableCell><Link href={`/invoice/dashboard/${e._id}`} className='p-4'>{e.Value}</Link></TableCell>
      </TableRow>
    </TableBody>
  )})}
  </Table></div>

       
  </div>
  )
}

export default dashboard;