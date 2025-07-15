import {NextResponse} from 'next/server'
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const prisma=new PrismaClient()
export async function POST(req:Request){
    const{email}=await req.json()

    if(!email){
        return NextResponse.json({message:'Email is required'},{status:400})
    }
    const user=await prisma.user.findUnique(
        {where:{email}}
    )
    if(!user){
        return NextResponse.json({message:'User not found'},{status:404})
    }
    const token=crypto.randomBytes(32).toString("hex")
    const expiry=new Date(Date.now()+3600000)
    await prisma.user.update({
        where:{email},
        data:{
            resetToken:token,
            resetTokenExpiry :expiry,
        },
    })
}