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
    const resetUrl=`${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        },
    })
    const mailOptions={
        from:`"Snack $ Track<${process.env.EMAIL_USER}>`,
        to:email,
        subject:"Password Reset",
        html:`<p>Click the link below to reset your password</p>
              <p><a href="${resetUrl}">${resetUrl}</a></p>
              <p>This link will expire in one hour</p>`
    
    }
    try{
        await transporter.sendMail(mailOptions);
        return NextResponse.json({message:"Reset link sent to mail"})
    }catch(err){
        console.error(err);
        return NextResponse.json({message:"Failed to send email"},{status:500})

    }
    

}