"use client"
import {useState} from 'react'
import CalendarPicker from '@/components/CalendarPicker'
export default function cal(){
const [food,setFood]=useState("")


    return(
        
          <div className="min-h-screen bg-[url('/backgroundimage.jpg')] bg-cover bg-center flex items-center justify-center">
      {/* Card */}
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
      <div className='absolute top-0 right-0'>
        <CalendarPicker/>
      </div>
        
        {/* Header */}
        <h2 className="text-center text-blue-500 font-semibold text-2xl mb-6 underline">
          DAILY DIARY
        </h2>

        {/* Input */}
        <input
          type="text"
          value={food}
          placeholder="Enter the food taken..."
        //   onClick={(e)=>setFood(e.target.value)}
          className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 text-center"
        />

        {/* Button */}
        <div className='flex items-center justify-center'>
        <button
          className=" px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 font-semibold shadow-md"
        >
          SUBMIT
        </button>
        </div>
      </div>
    </div>
    )
}