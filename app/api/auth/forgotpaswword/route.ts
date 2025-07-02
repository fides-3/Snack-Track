import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ message: "If the email exists, a link will be sent." });
  }

  const token = uuidv4();

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), 
    },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
  return NextResponse.json({
      message: "If the email exists, a reset link will be sent.",
      resetLink,
  });


  return NextResponse.json({ message: "Check your email for reset instructions." });
}
