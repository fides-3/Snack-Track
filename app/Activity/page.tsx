"use client"
import {useState} from 'react'
function Activity(){
    const[selectedActivity,setActivity]=useState("")
    return(
        <div className="bg-[url('/backgroundimage.jpg')]  bg-cover bg-center p-8   min-h-screen">
     <div className=" relative mx-auto p-6 max-w-2xl rounded-full bg-white place-items-center ">
        
                <p className='font-semibold text-2xl text-center'>🔹How active are you?</p>
                <div className='flex flex-col justify-center'>
                    <br></br>
                    <label className='flex items-center mb-2'>
                        <input type="radio" name="sedentary" value="sedentary" checked={selectedActivity==="Sedentary"}
                        onChange={(e)=>setActivity(e.target.value)}/>Sedentary
                    </label>

                    <label className='flex items-center mb-2'>
                        <input type="radio" name="lowactive" value="lowactive" checked={selectedActivity==="lowactive"}
                        onChange={(e)=>setActivity(e.target.value)}/>
                        Low Active
                    </label>

                     <label className='flex items-center mb-2'>
                        <input type="radio" name="active" value="active" checked={selectedActivity==="active"}
                        onChange={(e)=>setActivity(e.target.value)}/>
                        Active
                    </label>
                    
                    <label className='flex items-center mb-2'>
                        <input type="radio" name="veryactive" value="veryactive" checked={selectedActivity==="veryactive"}
                        onChange={(e)=>setActivity(e.target.value)}/>
                         Very Active
                    </label>  
                </div>
                <div className='flex justify-between items-center mt-8 gap-20'>
                    <a href='/Gender'>
                    <button className='flex-row-reverse rounded-lg bg-blue-600  text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 '>Back</button>
                    
                    </a>
                    <a href='/Height'>
                    <button className='flex-row-reverse rounded-lg bg-blue-600  text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 '>Next</button>
                    
                    </a>
                </div>
                
                
                

            </div>
        </div>
    )

}
export default Activity