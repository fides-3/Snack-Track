// import {NextResponse} from 'next/server'
// import {prisma} from '@/lib/prisma'
// import { getServerSession } from 'next-auth'
// import {authOptions} from '@/lib/authOptions'

// export async function POST(req:Request){
//     const session=await getServerSession(authOptions)
//     if(!session?.user?.id){
//         return NextResponse.json({error:'Unauthorized'},{status:401})
//     }
//     const {food,calories,date} =await req.json()
//     try{
//     const entry=await prisma.diary.create({
//         data:{
//             userId:session.user.id,
//             food,
//             calories:typeof calories==='number'?calories:parseInt(calories)||0,
//             date:date &&!isNaN(new Date(date).getTime())
//             ?new Date(date)
//             :new Date(),
//         },
//     })
    
// return NextResponse.json(entry)
//     }catch(error){
//         console.error('Error in creating diary entry:',error)
//         return NextResponse.json({error:'Internal Server Error'},{status:500})
//     }
// }


import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { food, calories, date } = await req.json()

  try {
    let caloriesValue = 0

    // 1. If calories provided from frontend, use it
    if (typeof calories === 'number' && !isNaN(calories)) {
      caloriesValue = calories
    } 
    else if (typeof calories === 'string' && !isNaN(parseInt(calories))) {
      caloriesValue = parseInt(calories)
    } 
    else if (food) {
      // 2. Fetch calories from Nutritionix API
      const apiResponse = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': process.env.NUTRITIONIX_APP_ID!, // put your app ID in .env
          'x-app-key': process.env.NUTRITIONIX_API_KEY!, // put your API key in .env
        },
        body: JSON.stringify({ query: food }),
      })

      const data = await apiResponse.json()
      if (data.foods && data.foods.length > 0) {
        caloriesValue = data.foods[0].nf_calories
      }
    }

    // 3. Ensure valid date
    const dateValue =
      date && !isNaN(new Date(date).getTime()) ? new Date(date) : new Date()

    // 4. Save to database
    const entry = await prisma.diary.create({
      data: {
        userId: session.user.id,
        food,
        calories: caloriesValue,
        date: dateValue,
      },
    })

    return NextResponse.json(entry)
  } catch (error) {
    console.error('Error in creating diary entry:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const dateParam = searchParams.get('date')

  if (!dateParam) {
    return NextResponse.json({ error: 'Date is required' }, { status: 400 })
  }

  const startOfDay = new Date(dateParam)
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(dateParam)
  endOfDay.setHours(23, 59, 59, 999)

  try {
    const entries = await prisma.diary.findMany({
      where: {
        userId: session.user.id,
        date: { gte: startOfDay, lte: endOfDay },
      },
      orderBy: { date: 'asc' },
    })

    return NextResponse.json(entries)
  } catch (error) {
    console.error('Error fetching diary entries:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

