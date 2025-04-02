import { connect } from "@/helper/dbconfig/dbconfig";
import Users from "@/helper/model/model";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
connect()
export async function GET() {const {userId}=await auth();
    const user=await Users.find({UserId:userId});
    return NextResponse.json(user);
    
}