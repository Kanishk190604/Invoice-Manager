
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Ellipsis } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation';
  

const statusData={'success': "bg-green-500",
'pending': "bg-yellow-500",
'denied': "bg-red-500",
'open': "bg-blue-500",}
function Invoicedesign({Id,Sr,BillingDate,BillingName,Billingemail,Value,Description,Status,HandleStatus}:any) {
  return (
    <div>
        <div className='flex items-end gap-x-3 mx-14 my-10'><div className='text-4xl font-bold '>Invoice {Sr} </div><div><Badge variant="outline" className={`rounded-2xl ${statusData[Status as keyof typeof statusData]} p-2 text-l text-white`}>{Status}</Badge></div><div><Select onValueChange={async(e)=>{
           HandleStatus(e);
           const response = await fetch("/api/hi", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',},
            body: JSON.stringify({Status:e,Id:Id
            })})
            console.log(response);
                }}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder={Status} />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="open">open</SelectItem>
    <SelectItem value="pending">pending</SelectItem>
    <SelectItem value="denied" >denied</SelectItem>
    <SelectItem value="success">success</SelectItem>
  </SelectContent>
</Select>
</div>
<div>
<Popover>
  <PopoverTrigger asChild><Button variant="outline" ><Ellipsis /></Button></PopoverTrigger>
  <PopoverContent className='flex-col justify-items-center  w-40 px-2 gap-5'>

  {Status === "open" && (
  <div>
    <form action="/api/stripe" method="POST">
      <section className="flex justify-center">
        <input type="text" name="InvoiceId" defaultValue={Id} hidden />
        <input type="number" name="amount" defaultValue={isNaN(Value) ? 500000 : Value * 100} hidden />

        <button type="submit" role="link" className="w-40 py-2 rounded-s shadow-md hover:shadow-sm hover:scale-[0.98] transition-all">
          Checkout
        </button>
      </section>
    </form>
  </div>
)}
      
    
    
  <Dialog>
  <DialogTrigger className='w-40 py-2 rounded-s shadow-md hover:shadow-sm hover:scale-[0.98] transition-all'>Delete Invoice</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription asChild>
       <div> This action cannot be undone. This will permanently remove your data from our servers.<div className='flex justify-center mt-3'> <Button variant="destructive" onClick={async()=>{ const response = await fetch("/api/hi", {
            method: 'Delete',
            headers: {
              'Content-Type': 'application/json',},
            body: JSON.stringify({Id:Id
            })})
            console.log(response);
            redirect("/invoice/dashboard")}}>Delete</Button></div></div>
       
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


</PopoverContent>
</Popover>

</div>

    </div>
   <div className='mx-14 my-10'> <div className='text-5xl my-3'>${Value}</div><p>{Description}</p></div>
   <div className='mx-14 my-10'>
    <div className='font-semibold text-xl my-3'>Billing Details</div>
    <div className='flex gap-x-15 my-3 '>
        <div>Invoice Id:</div>
        <div>{Sr}</div>
    </div>
    <div className='flex gap-x-15 my-3 '>
        <div>Invoice Date:</div>
        <div>{BillingDate}</div>
    </div>
    <div className='flex gap-x-15 my-3 '>
        <div>Billing Name:</div>
        <div>{BillingName}</div>
    </div>
    <div className='flex gap-x-15 my-3 '>
        <div>Billing Email:</div>
        <div>{Billingemail}</div>
    </div>
   </div>
   
     
      
   
   </div>

  )
}

export default Invoicedesign