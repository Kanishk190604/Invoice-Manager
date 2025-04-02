import { NextResponse,NextRequest } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'

export async function POST(req:NextRequest) { 
  try {const reqbody=await  req.formData();
    const amount = reqbody.get('amount');
    const Id = reqbody.get('InvoiceId');
    console.log("Id is:",Id);

    const parsedAmount = parseFloat(amount as string);
    console.log(parsedAmount)

    const headersList = await headers()
    const origin = headersList.get('origin')

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data: {
            currency:'usd',
            product:'prod_RxeekMsfF4SFYq',
            unit_amount:parsedAmount,

          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/invoice/dashboard/${Id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });
    if(session.url){console.log('went in if statement')
      const response = await fetch(`${origin}/api/hi`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',},
      body: JSON.stringify({Status:'success',Id:Id
      })})
      const data = await response.json();
      console.log("after change",data);
     
    }
    return NextResponse.redirect(session.url!, 303)
    
  } catch (err:any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}