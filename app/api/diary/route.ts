import {NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import {authOptions} from '@/lib/authOptions'

export async function POST(req:Request){
    const session=await getServerSession(authOptions)
    if(!session?.user?.id){
        return NextResponse.json({error:'Unauthorized'},{status:401})
    }
    const {food,calories,date} =await req.json()
    try{
    const entry=await prisma.diary.create({
        data:{
            userId:session.user.id,
            food,
            calories,
            date:new Date(date),
        },
    })
    
return NextResponse.json(entry)
    }catch(error){
        console.error('Error in creating diary entry:',error)
        return NextResponse.json({error:'Internal Server Error'},{status:500})
    }
}