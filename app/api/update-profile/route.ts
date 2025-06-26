import { NextRequest,NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    
    const { email, phone, location } = await req.json();
     const user = await prisma.user.findUnique({ where: { email } });
     if (!user) {
  return NextResponse.json({ message: "User not found" }, { status: 404 });
}
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { phone, location },
    });

    return NextResponse.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
  }
}
