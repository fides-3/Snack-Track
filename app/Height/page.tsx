"use client"
import {useRouter} from 'next/navigation'
import { useState } from "react";
import WizardProgress from '@/components/WizardProgress';

export default function Height() {
  const [unit, setUnit] = useState("M");
  const[height,setHeight]=useState("")
  const [showUnits, setShowUnits] = useState(false);
  const units = ["M", "Feet" , "Cm"];
  const[message,setMessage]=useState("")
         const router=useRouter()
              
                const handleSubmit= async (e:React.FormEvent)=>{
                  e.preventDefault()
                
                if(!height){
                  setMessage("Please select one of these options")
                  return
                }
                try{
                  const res=await fetch("/api/me",{
                    method:"PUT",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({height:parseFloat(height)})
                  })
                  if(!res.ok){
                    const err=await res.json()
                    setMessage(err.message||"Something went wrong")
                    return
                  }
                  await res.json()
                  setMessage("Option Saved!")
                  router.push("/Weight")
              
                }catch(error){
                   console.error("error before submitting option:" ,error)
                  setMessage("failed to save option")
                }
              }
  <br></br>

  return (
    <div className="min-h-screen bg-[url('/backgroundimage.jpg')] dark:bg-[url('/darkbg.jpg')] bg-cover bg-center p-8 ">
      <br></br>
      <form onSubmit={handleSubmit}>
    <div className=" relative rounded-full bg-white dark:bg-black place-items-center mx-auto p-6 max-w-2xl  ">
      <WizardProgress currentStep={4} totalSteps={6}  />
      <p className="font-semibold text-2xl text-black dark:text-white "> 🔹How tall are you?</p>
    
    <div className="relative w-64 flex place-items-center border-b-2 border-black px-2 py-1 mx-auto focus-within:border-blue-700">
      {/* Input Field */}
      <input
        type="number"
        placeholder=" "
        value={height}
        onChange={(e)=>setHeight(e.target.value)}
        className="w-full outline-none  text-lg"
      />

      {/* Unit Display */}
      <div
        className="flex items-center text-black dark:text-white cursor-pointer relative"
        onClick={() => setShowUnits(!showUnits)}
      >
        <span className="ml-2">{unit}</span>
        <svg
          className="ml-1 w-3 h-3 dark:text-white text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>

        {/* Dropdown */}
        {showUnits && (
          <ul className="absolute top-6 right-0 bg-white dark:bg-black text-black dark:text-white border rounded shadow-md z-10">
            {units.map((u) => (
              <li
                key={u}
                onClick={() => {
                  setUnit(u);
                  setShowUnits(false);
                }}
                className="px-3 py-1 hover:bg-green-100 cursor-pointer"
              >
                {u}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    <br></br>
    <div className="flex justify-between items-center mt-8 gap-20">
      
        <button onClick={()=>router.push("/Activity")} className=" bg-blue-600  rounded-lg flex-row-reverse  text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300   ">Back</button>
      
      
        <button className="bg-blue-600   text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 rounded-lg flex-row-reverse  ">
          Next
        </button>
           
      
    </div>
     {message && <p className="text-red-500 mt-2 text-center">{message}</p>}


    </div>
    </form>
    </div>
  );
}


