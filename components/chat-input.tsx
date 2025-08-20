'use client'
import {useState} from 'react'


export default function ChatInput({OnsendAction}:{OnsendAction:(msg:string)=>void}){

    const[input,setInput]=useState("")

    const handleSubmit=async(e: React.FormEvent)=>{
        e.preventDefault()
        if(!input)
            return
        else{
            OnsendAction(input)
            setInput('')
        }
    }


    return(

        <form onSubmit={handleSubmit} className='flex p-2   gap-2'>
            <input type='text'
            value={input}
            placeholder='Type a message'
            className='border border-black text-black flex-1 bg-white rounded-md px-4 py-2  '
            onChange={(e)=>setInput(e.target.value)} />

            <button type='submit' className='px-4 py-2 bg-blue-600 text-white text-md text-semibold rounded-lg'>
                SEND
            </button>
        </form>
    )
}