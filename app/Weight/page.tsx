"use client"
import { useState} from "react";
import {useRouter } from "next/navigation"
import WizardProgress from "@/components/WizardProgress";

export default function Weight() {
  const [unit, setUnit] = useState("kg");
  const [showUnits, setShowUnits] = useState(false);
  const [message,setMessage]=useState("")
  const [weight,setWeight]=useState("")
  const units = ["kg", "lb" , "pounds"];
  <br></br>

  const router=useRouter()


 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   

    if(!weight){
      setMessage("Please enter your weight");
      return;
    }
    

     try{
    const res = await fetch("/api/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weight:parseFloat(weight) }), 
    });

    if (!res.ok) {
      const err=await res.json()
      setMessage(err.message||"Something went wrong");
      return
    }
    await res.json()
    setMessage("weight saved!")
    router.push("/Age")
  }catch(error){
    console.error("error before submitting weight:" ,error)
    setMessage("failed to save weight")
  }
  };



  return (
    <div className="min-h-screen bg-[url('/backgroundimage.jpg')]  dark:bg-[url('/darkbg.jpg')] bg-cover bg-center p-8 ">
      <br></br>
      <form onSubmit={handleSubmit}>
    <div className=" relative rounded-full bg-white dark:bg-black place-items-center mx-auto p-6 max-w-2xl  ">
      <WizardProgress currentStep={5} totalSteps={6}  />
      <p className="font-semibold text-2xl text-black dark:text-white"> 🔹What is your weight?</p>
    
    <div className="relative w-64 flex place-items-center border-b-2 border-black px-2 py-1 mx-auto focus-within:border-blue-700">
      {/* Input Field */}
      <input
        type="number"
        placeholder=" "
        value={weight}
        className="w-full outline-none   text-lg"
        onChange={(e)=>setWeight(e.target.value)}
      />

      {/* Unit Display */}
      <div
        className="flex items-center text-black cursor-pointer relative"
        onClick={() => setShowUnits(!showUnits)}
      >
        <span className="ml-2 text-black dark:text-white">{unit}</span>
        <svg
          className="ml-1 w-3 h-3 text-black dark:text-white"
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
          <ul className="absolute top-6 right-0 bg-white border rounded shadow-md z-10">
            {units.map((u) => (
              <li
                key={u}
                onClick={() => {
                  setUnit(u);
                  setShowUnits(false);
                }}
                className="px-3 py-1 hover:bg-green-100  cursor-pointer"
              >
                {u}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    <br></br>
    <div className="flex justify-between mt-6 items-center  gap-20">
     
        <button onClick={()=>router.push("/Height")}className=" bg-blue-600  rounded-lg flex-row-reverse  text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300  ">Back</button>
    
     
        <button className="bg-blue-600   text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 rounded-lg flex-row-reverse  " type="submit">
          Next
        </button>
         
    
    </div>
    {message && <p className="text-red-500 mt-2 text-center">{message}</p>}


    </div>
    </form>
    </div>
  );
}
