"use client"
import {useState} from 'react'
function Gender(){
    const[selectedOption,setSelectedOption]=useState("")
    return(
        
        <div className="bg-[url('/backgroundimage.jpg')] bg-cover bg-center min-h-screen p-8">
            <div className=" relative max-w-2xl rounded-full bg-white place-items-center mx-auto p-6    ">
        <p className='font-semibold text-2xl'>🔹What is your gender?</p>
        <br></br>
        <div className="flex-col space-y-4 flex justify-center">
            <label className="flex mb-2 items-center">
                <input type="radio" name="male" value="male" 
                checked={selectedOption==="male"} onChange={(e)=>setSelectedOption(e.target.value)}/>
                Male👨
            </label>
            <label className='flex mb-2 items-center'>
                <input type="radio" name="female" value="female"
                checked={selectedOption==="female"} onChange={(e)=>setSelectedOption(e.target.value)}/>
                Female👩
            </label>

                
                
            </div>
            <br></br>
             <div className=" flex justify-between items-center mt-8  gap-20 ">
                <a href="/Goal">
                <button className="  bg-blue-600    text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 rounded-lg flex-row-reverse  ">  
                    BACK
                </button>
                </a>
                

                
                     <a href="/Activity">
                <button className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 rounded-lg flex-row-reverse  ">
                    NEXT
                </button>

                </a>
                </div>
                <br></br>

            </div>
            
        </div>
    )

}
export default Gender;