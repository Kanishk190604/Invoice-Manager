import { connect } from "@/helper/dbconfig/dbconfig";
import { auth } from '@clerk/nextjs/server'
import Users from "@/helper/model/model";
import { Send } from "@/helper/mailer";
import { NextRequest, NextResponse } from "next/server";
 
connect()
export async function POST(req:NextRequest,res:NextResponse) {const {userId}=await auth();
  if (!userId) {NextResponse.redirect('/sign-in')}
  const data=await req.json();
  const {Billingname,Billingemail,Value,Description}=data;
  const count = await Users.countDocuments({UserId:userId})+1;
  const user=new Users({UserId:userId,Sr:count,Billingname,Billingemail,Value,Description})
    const saveduser=await user.save();
    Send(Billingemail,"gadiyakanishk5@gmail.com",Billingname,Description,saveduser._id,Value);

    console.log(saveduser)
    return NextResponse.json(saveduser);
}