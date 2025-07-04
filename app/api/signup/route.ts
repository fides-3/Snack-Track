
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';



const prisma = new PrismaClient();


// POST METHOD -CREATE
export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }


  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  
    }

   const hashedPassword = await bcrypt.hash(password, 10);

const user=await prisma.user.create({
  data: { email, password: hashedPassword },
});

return NextResponse.json({message:"User Created successfully"});


    
  } catch (error) {
    console.error('API signup error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
