import React from 'react'
import Form from 'next/form';
import { LoaderCircle } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button'
function Submitbutton() {const {pending}=useFormStatus();
console.log("pending",pending)
  return (
    <Button className='p-3 my-6 w-full'>{pending?<LoaderCircle className='animate-spin '/>:<span>Submit</span>}
         </Button>

  )
}

export default Submitbutton