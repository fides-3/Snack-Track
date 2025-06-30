// import { NextRequest, NextResponse } from 'next/server';
// import {getServerSession} from "next-auth"
// import {authOptions} from "@/app/api/auth/[...nextauth]/route"
// // import jwt from 'jsonwebtoken';
//  import { PrismaClient } from '@prisma/client';
// export async function GET(req: NextRequest) {
//   const session=await getServerSession(authOptions)

//   if(!session?.user?.email){
//     return NextResponse.json({message:"Not Authenticated"},{status:401})
//   }

// const prisma = new PrismaClient();

// // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
// // console.log("Decoded token:", decoded);


// const user = await prisma.user.findUnique({
//   where: { email: session.user.email },
//   select: {
//      email: true, 
//      phone: true, 
//      location: true, 
//      image: true,
//      age:true,
//      weight:true,
//      height:true,
//      goal:true,
//      activity:true,
//      gender:true
//      }, 
// });

// if (!user) {
//   return NextResponse.json({ message: 'User not found' }, { status: 404 });
// }

// return NextResponse.json({ user });

 
// }


import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
//READS
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        email: true,
        phone:true,
        location:true,
        age: true,
        weight: true,
        gender: true,
        height: true,
        activity: true,
        goal: true,
      }
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

// PUT UPDATES
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updateData: any = {};
    
    if (body.age !== undefined) updateData.age = body.age;
    if (body.weight !== undefined) updateData.weight = body.weight;
    if (body.gender !== undefined) updateData.gender = body.gender;
    if (body.height !== undefined) updateData.height = body.height;
    if (body.activity !== undefined) updateData.activity = body.activity;
    if (body.goal !== undefined) updateData.goal = body.goal;

    const updated = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
    });

    return NextResponse.json({ message: 'Info updated successfully', updated });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}