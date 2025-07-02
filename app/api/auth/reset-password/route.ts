import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
  const { token, password } = await req.json();

  const tokenRecord = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
    return NextResponse.json({ message: "Invalid or expired token." }, { status: 400 });
  }

  const hashed = await hash(password, 10);
  await prisma.user.update({
    where: { id: tokenRecord.userId },
    data: { password: hashed },
  });

  await prisma.passwordResetToken.delete({ where: { token } });

  return NextResponse.json({ message: "Password updated." });
}catch(error){
    console.error("Reset Password error:",error)
    return NextResponse.json({message:"server error"},{status :500})
}
}
