import { NextRequest, NextResponse } from 'next/server';
import {getServerSession} from "next-auth"
import {authOptions} from "@/app/api/auth/[...nextauth]/route"
// import jwt from 'jsonwebtoken';
 import { PrismaClient } from '@prisma/client';
export async function GET(req: NextRequest) {
  const session=await getServerSession(authOptions)

  if(!session?.user?.email){
    return NextResponse.json({message:"Not Authenticated"},{status:401})
  }

const prisma = new PrismaClient();

// const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
// console.log("Decoded token:", decoded);


const user = await prisma.user.findUnique({
  where: { email: session.user.email },
  select: { email: true, phone: true, location: true, image: true }, 
});

if (!user) {
  return NextResponse.json({ message: 'User not found' }, { status: 404 });
}

return NextResponse.json({ user });

 
}
