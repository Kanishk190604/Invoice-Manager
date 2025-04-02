import { connect } from "@/helper/dbconfig/dbconfig";
import { auth } from '@clerk/nextjs/server'
import Users from "@/helper/model/model";

import { NextRequest, NextResponse } from "next/server";
 
connect()
export async function PUT(req:NextRequest) {console.log('hi update started');
  const {userId}=await auth();
  const data=await req.json();
  const {Status,type,Id}=data;
  const updateduser = await Users.findByIdAndUpdate(Id,{status:Status})
  console.log(updateduser)
  return NextResponse.json(updateduser);

}
export async function DELETE(req: NextRequest) {
  const data = await req.json();
  const { Id } = data;

  await Users.findByIdAndDelete(Id);
  return NextResponse.json({ message: "User deleted successfully" });
}