"use client"
import {useState} from 'react'
import DatePicker from 'react-datepicker'
import { LuCalendarDays } from 'react-icons/lu'
import "react-datepicker/dist/react-datepicker.css"

export default function CalendarPicker(){
    const[startDate,setStartDate]=useState<Date|null>(new Date())
    const[showCalendar,setShowCalendar]=useState<boolean>(false)
    const[entries,setEntries]=useState<any[]>([])
    const[showEntries,setShowEntries]=useState<boolean>(false)
    

    const fetchEntriesfordate=async(date:Date)=>{
        const formattedDate=date.toISOString().split('T')[0]
        const res=await fetch(`api/calories?date=${formattedDate}`)
        const data=await res.json()
        setEntries(data)
        setShowEntries(true)

    }
    

    return(
        <div className='relative inline-block text-left'>
            <button onClick={()=>{
                 setShowCalendar((prev:boolean)=>!prev)
                
            
            }}
                className='p-2 rounded-full hover:bg-slate-600'>
                <LuCalendarDays className='w-6 h-6'/>
            </button>

            {showCalendar&&(
                <div className='absolute right-0 top-0  mt-2'>
                    <DatePicker
                    selected={startDate}
                    onChange={(date)=>{

                        if (!date) return

                        if(startDate&&date.toDateString()===startDate.toDateString()){
                            setShowEntries(false)
                        }
                        else{
                        setStartDate(date!)
                        setShowCalendar(false)
                        fetchEntriesfordate(date!)
                        }
                        
                    setShowCalendar(false)
                       
                    }}
                    inline
                    />
                </div>
            )}
           

            {showEntries&&startDate &&(
                <div className=' bg-white p-2 shadow rounded '>
                    <h2 className='font-semibold'>
                        Entries for {startDate.toDateString()}
                    </h2>
                    {entries.length>0?(
                        <ul className='list-disc list-inside '>
                            {entries.map((entry)=>(
                                <li key={entry.id}>
                                    {entry.food}-{entry.calories} kcal
                                </li>

                            ))}

                        </ul>
                
                    ):(
                        <p className='text-blue-500'>No entries for this date</p>
                        
                    
                    )}
                </div>

            )}
            
        </div>
    )
}