import {NextResponse} from 'next/server'
import {GoogleGenerativeAI} from '@google/generative-ai'

const genAI=new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export async function POST(req:Request){
    try{
    const {message}=await req.json()
    const model=genAI.getGenerativeModel({
        model:'gemini-1.5-flash'})
    const result=await model.generateContent(message)  
    const reply=result.response.text() 
    return NextResponse.json({reply}) 
   
}catch(error){
    return NextResponse.json({error:'Something went wrong'},{status:500})

}

}