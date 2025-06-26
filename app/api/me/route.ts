import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
 import { PrismaClient } from '@prisma/client';
export async function GET(req: NextRequest) {
  try {

    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

  

const prisma = new PrismaClient();

const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
console.log("Decoded token:", decoded);


const user = await prisma.user.findUnique({
  where: { email: decoded.email },
  select: { email: true, phone: true, location: true, image: true }, 
});

if (!user) {
  return NextResponse.json({ message: 'User not found' }, { status: 404 });
}

return NextResponse.json({ user });

  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
