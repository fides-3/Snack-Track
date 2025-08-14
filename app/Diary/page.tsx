"use client";

import { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import CalendarPicker from '@/components/CalendarPicker'
import BottomNav from "@/components/BottomNav";
// import Link from 'next/link'

export default function Diary() {
  // Start with null so we know when data hasn't loaded yet
  const [water, setWater] = useState<number | null>(null);
  const [lastTime, setLastTime] = useState("");
  const waterGoal = 2.5;
  const [food,setFood]=useState("")
  const [calories,setCalories]=useState("")
  const[message,setMessage]=useState("")
  



const handleSubmit=async(e: React.FormEvent)=>{
  e.preventDefault();
  try{
  const res=await fetch('api/calories',{
    method:'POST',
    headers:{'Content-type':'application/json'},
    body:JSON.stringify({
      food,
      calories,

    })
  })
  const data=await res.json()
  if(res.ok){
    setCalories(data.calories)
  }
  else{
    alert(data.error ||"Error saving entry")
  }
  }catch(err){
    console.error({'API error':err})
  }
}



  const waterPercent =
    water !== null ? Math.round((water / waterGoal) * 100) : 0;

  // Fetch saved water intake from DB when user logs in
  useEffect(() => {
    const fetchWater = async () => {
      try {
        const res = await fetch("/api/waterintake",
           { method: "GET" }
          );
        if (!res.ok) throw new Error("Failed to fetch water data");
        const data = await res.json();

        setWater(data.amount );
        if (data.lastTime) {
          const time = new Date(data.lastTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          setLastTime(time);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setWater(0); // fallback
      }
    };

    fetchWater();
  }, []);

  // Update water in state + DB
  const updateWater = async (newWater: number) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setWater(newWater);
    setLastTime(formattedTime);

    try {
      await fetch("/api/waterintake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: newWater, lastTime: now }),
      });
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleIncrease = () => {
    if (water !== null) {
      const newWater = Math.min(parseFloat((water + 0.1).toFixed(1)), waterGoal);
      updateWater(newWater);
    }
  };

  const handleDecrease = () => {
    if (water !== null) {
      const newWater = Math.max(parseFloat((water - 0.1).toFixed(1)), 0);
      updateWater(newWater);
    }
  };

  if (water === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className=" bg-[url('/backgroundimage.jpg')]  bg-cover bg-center    min-h-screen ">
      {/* Water Intake */}
     <div className="   p-4  flex  items-center justify-center gap-4">
      <div className="bg-white rounded-xl p-4   w-full h-96 space-y-8 shadow-xl">
        <h2 className="text-md  text-center  font-semibold mb-4"><u>Water Intake</u></h2>
        <div className="flex items-center justify-between mb-2">
          <span>
            <span className="font-bold text-center">{water.toFixed(1)}</span> / {waterGoal}L
          </span>
        </div>
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={handleIncrease}
            className="bg-gray-100 rounded-full p-2"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Water Glass */}
          <div className="relative h-20 w-10 rounded-full bg-gray-200 overflow-hidden flex flex-col justify-end">
            <div
              className="absolute bottom-0 w-full bg-gradient-to-t from-blue-400 to-blue-300 transition-all duration-300"
              style={{ height: `${waterPercent}%` }}
            ></div>
          </div>

          <button
            onClick={handleDecrease}
            className="bg-gray-100 rounded-full p-2"
          >
            <Minus className="w-5 h-5" />
          </button>

          <span className="text-blue-500 font-medium">{waterPercent}%</span>
        </div>
        <p className="text-xs text-gray-600  mt-6">
          Last Time {lastTime || "--:--"}
        </p>
      </div>

      {/* Meals */}
      
        {/* <div className="flex justify-between items-center mb-4">
          <h2 className="text-md font-semibold">Meals</h2>
          <button className="text-lg text-gray-500">+</button>
        </div> */}
        {/* <div className="space-y-4">
          {meals.map((meal, i) => (
            <div key={i} className="flex justify-between items-center">
              <div>
                <Link href='/cal'>
                <div className="rounded-full bg-slate-500 ">
                <button  className="font-medium">{meal.name}</button>
                </div>
                </Link>
                <p className="text-sm text-gray-400">{meal.time}</p>
              </div>
              <p className="font-semibold">{meal.calories} Cal</p>
            </div>
          ))}
        </div> */}


        <div className="w-full  bg-white/90 h-96 space-y-8 backdrop-blur-md rounded-2xl shadow-xl p-8">
              <div className='absolute top-0 right-0'>
                <CalendarPicker/>
              </div>
                
                {/* Header */}
                <h2 className="text-center text-blue-500 font-medium text-xl mb-6 underline">
                  DAILY DIARY
                </h2>
        
                {/* Input */}
                <input
                  type="text"
                  value={food}
                  placeholder="Enter the food taken..."
                  onChange={(e)=>setFood(e.target.value)}
                  className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 text-center"
                />
              
        
        
                {/* Button */}
                <div className='flex items-center justify-center'>
                <button onClick={handleSubmit}
                  className=" px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 font-semibold shadow-md"
                >
                  SUBMIT
                </button>
                <p>{message}</p>
                
                </div>
                <div className='flex mt-4 items-center justify-center'>
                <p className='text-center font-semibold'>Estimated calories:{calories}cal</p>
                </div>
              </div>

     </div>
      <BottomNav/>
      </div>
  
  );
}
