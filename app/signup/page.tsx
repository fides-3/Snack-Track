"use client"

import{Mail,Eye,EyeOff} from "lucide-react";
import { useState } from "react";
import {useRouter} from "next/navigation";


export default function Signup() {
  const router=useRouter();
  const[showPassword, setShowPassword]=useState(false);
  const [email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[message,setMessage]=useState("");

  
  const handleSubmit=async (e: React.FormEvent<HTMLFormElement>)=>{ 
    e.preventDefault();

    if (!email || !password) {
  setMessage("Please fill in all fields");
  return;
}
   

    try{
    const res=await fetch("/api/signup",{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({email,password}),


    });

    const data=await res.json();
    if (res.ok){
       router.push('/welcome')
    }
    else{
    setMessage(data.message);
    }
   


  
  } catch(error){
    console.error("Signup error:", error);
    setMessage("Something went wrong. Please try again.");
  }
 }
  return (
    <div className="flex items-center justify-center   min-h-screen bg-white">
      <form  onSubmit={handleSubmit} className="bg-white p-8 flex  rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">
      
        

        {/* Heading */}
        <div className="w-full p-8 space-y-5">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        {/* Email */}
        <div className="mb-4 relative">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          
          <input
          
            type="email"
            name="email"
            id="email"
            className="w-full px-4 py-2 border mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>setEmail(e.target.value)}
          
          />
          <span className="absolute right-3 top-10  text-gray-400 cursor-pointer"><Mail size={16}/></span>
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
         
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>setPassword(e.target.value)}
            
          />
          <span className="absolute right-3 top-10  text-gray-400 cursor-pointer"
           onClick={() => setShowPassword(!showPassword)}>
             {showPassword ? <EyeOff size={16} /> :<Eye size={16} />}</span>
      
        </div>

      
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input type="checkbox" className="w-4 h-4 text-blue-500" />
            <span>Remember me</span>
          </label>
         
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="w-full mb-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>

        {message && (
  <p className="text-center text-sm mt-2 text-red-500">{message}</p>
)}
          </div>
      </form>
    </div>
  );



}

