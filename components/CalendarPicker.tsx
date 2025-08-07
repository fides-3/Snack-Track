"use client"
import {useState} from 'react'
import DatePicker from 'react-datepicker'
import { LuCalendarDays } from 'react-icons/lu'
import "react-datepicker/dist/react-datepicker.css"

export default function CalendarPicker(){
    const[startDate,setStartDate]=useState<Date|null>(new Date())
    const[showCalendar,setShowCalendar]=useState<boolean>(false)

    return(
        <div className='relative inline-block text-left'>
            <button onClick={()=>setShowCalendar((prev:boolean)=>!prev)}
                className='p-2 rounded-full hover:bg-slate-600'>
                <LuCalendarDays className='w-6 h-6'/>
            </button>

            {showCalendar&&(
                <div className='absolute right-0 z-20 mt-2'>
                    <DatePicker
                    selected={startDate}
                    onChange={(date)=>{
                        setStartDate(date!)
                        setShowCalendar(false)
                    }}
                    inline
                    />
                </div>
            )}
            
        </div>
    )
}