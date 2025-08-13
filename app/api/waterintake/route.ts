import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const data = await prisma.waterIntake.findUnique({
    where: { userId: session.user.id },
  });

  return Response.json(data || { amount: 0, lastTime: null });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { amount, lastTime } = await req.json();

  await prisma.waterIntake.upsert({
    where: { userId: session.user.id },
    update: { amount, lastTime: new Date(lastTime) },
    create: { userId: session.user.id, amount, lastTime: new Date(lastTime) },
  });

  return new Response("Updated", { status: 200 });
}
