


'use client';
import Link from "next/link";
import { useState } from "react";

// import { Mail, Eye, EyeOff } from "lucide-react";


export default function ForgotPassword() {

  const [email, setEmail] = useState('');
  

  const [message, setMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage('');

    try{
    const res = await fetch('/api/auth/forgotpassword',{
    method:'POST',
    headers:{'Content-type':'application/json'},
    body:JSON.stringify({email})

    })
    const data=await res.json()
    if(res.ok){
      setMessage("Check your email for the password reset link")
    }
    else{
      setMessage(data.message || "Something went wrong")
    }
  }catch(err){
    console.error("Forgot Password Error",err);
    setMessage("Failed to send email")

  }
}


  return (
    <div className=" bg-[url('/backgroundimage.jpg')] bg-cover bg-center  min-h-screen">
      <div className=" flex justify-center  min-h-screen  items-center ">
      <form onSubmit={handleSubmit} className="bg-white p-8 w-full rounded-2xl shadow-2xl max-w-md">
        
      <div className="text-center mb-6">
      <h1 className=" font-semibold">FORGOT PASSWORD</h1>
      </div>
      <div className=" space-y-4">
        
         <div className="relative">
       
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 w-full rounded-md text-black  focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          
        </div>
         
        <button className="text-white w-full rounded-md transition py-2 hover:bg-blue-500 bg-blue-400" type="submit">
          SEND
        </button>
       
        <div className="text-center text-sm">
        <p>Return to {""}
          <Link href="/" className="text-blue-400">
           login
           </Link>
           </p>
           </div>
        

         
        {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
        
      
         </div>
      </form>
      </div>
    </div>
)}
    

