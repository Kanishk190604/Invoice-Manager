'use client'
import React from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

import { startTransition } from 'react'
import Submitbutton from '@/components/Submitbutton'


function newinvoice() { const { userId, isLoaded } = useAuth(); // Clerk Authentication
const router = useRouter();
const [Billingname,Setbill]=useState('');
const [status,setstatus]=useState(false)
const [email,Setemail]=useState('')
const [value,Setvalue]=useState('')
const [description,Setdescription]=useState('')
async function handleSubmit (e:React.FormEvent){ 
  if(status==true){e.preventDefault()
  return;}
 
 try {  // Client-side navigation

 // Redirect to sign-in if user is not authenticated
 if (isLoaded && !userId) {
   router.push('/sign-in');
   // Prevent rendering the form
 }
  e.preventDefault() 
  
  
  setstatus(true)
  startTransition(async()=>{ const response = await fetch('/api/invoicedata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',},
    body: JSON.stringify({Billingname, Billingemail:email, Value:value,Description:description

    }), 
    
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const result = await response.json(); 
  console.log('Success:', result);
  router.push(`/invoice/dashboard/${result._id}`)
 
})
   
  
  } catch (error) {
    console.error('Error:', error);
  }
};


  return (
    <div><div className='m-10'> <div className='font-bold text-xl'>Invoices</div>
    <div className='font-bold text-4xl'>Create a new invoice</div></div>
       
        <form className='w-100 m-10' onSubmit={handleSubmit}>
<Label htmlFor='Billingname' className='p-3 text-xl font-semibold'>BillingName</Label>
<Input id='Billingname' value={Billingname} onChange={(e)=>Setbill(e.target.value)} className='w-full'/>

<Label htmlFor='Email' className='p-3 text-xl font-semibold'>Email</Label>
<Input id='Email' type='email' value={email} onChange={(e)=>Setemail(e.target.value)} className='w-full'/>

<Label htmlFor='Value' className='p-3 text-xl font-semibold'>Value</Label>
<Input id='Value' type='number'  value={value} onChange={(e)=>Setvalue(e.target.value)} className='w-full'/>

<Label htmlFor='Description' className='p-3 text-xl font-semibold'>Description</Label>
<Textarea id='Description' placeholder='description' value={description} onChange={(e)=>Setdescription(e.target.value)} className='w-100 h-50'/>
<Submitbutton/>
        </form>
        
    </div>
  )
}

export default newinvoice