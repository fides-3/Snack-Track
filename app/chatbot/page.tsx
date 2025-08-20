
'use client'
import {useState} from 'react'
import Header from '@/components/header'
import ChatInput from '@/components/chat-input'
import {RiRobot3Line} from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'

export default function Chatbot(){
    const[messages,setMessages]=useState<{sender:'user'|'bot';text:string}[]>([])

    async function sendMessage(message:string){
        const res=await fetch('/api/chat',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify({message})

        })
        const data=await res.json()
        return data.reply
    }

    const handleSend=async (msg:string)=>{
        setMessages((prev)=>[...prev,{sender:'user',text:msg}])

        const reply=await sendMessage(msg);
        setMessages((prev)=>[...prev,{sender:'bot',text:reply}])
    }


    return(
        <div className='bg-[url("/backgroundimage.jpg")] bg-cover bg-center min-h-screen p-1 dark:bg-[url("/darkbg.jpg")]'>
      
        
            <div className='rounded  shadow-2xl max-w-lg border  mx-auto mt-10 bg-white dark:bg-black'>
                <Header/>

                <div className='h-96 overflow-y-auto space-x-2 border mb-2 p-2'>
                {messages.map((mess,i)=>(
                    <div key={i} className={`items-start flex my-2 space-x-1 ${mess.sender=='user'?'justify-end':'justify-start'
                    }`}>

                        {mess.sender=='user'&&(
                        <CgProfile className='w-5 text-black dark:text-gray-700 h-5'/>   
                       )}

                        {mess.sender=='bot'&&(
                        <RiRobot3Line className='w-5 h-5 text-black dark:text-gray-700'/>
                        )}
                        <div className={`inline-block rounded-lg px-3 py-2 max-w-xs break-words ${mess.sender=='user'?'bg-blue-600 text-white':'bg-gray-200 text-black'}`}>
                            <p>{mess.text}</p>

                        </div>


                    </div>

                ))}
                </div>
                <ChatInput OnsendAction={handleSend}/>

                </div>

        </div>    
            
    
    )

}