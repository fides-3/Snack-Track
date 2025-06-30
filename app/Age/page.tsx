"use client"
import {useState} from 'react'
import {useRouter} from 'next/navigation'

export default function Age() {
  const[age,setAge]=useState("")
  const[message,setMessage]=useState("")

  const router=useRouter()

  const handleSubmit= async (e:React.FormEvent)=>{
    e.preventDefault()
  
  if(!age){
    setMessage("Please enter your age")
    return
  }
  try{
    const res=await fetch("/api/me",{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({age:parseInt(age)})
    })
    if(!res.ok){
      const err=await res.json()
      setMessage(err.message||"Something went wrong")
      return
    }
    await res.json()
    setMessage("Age Saved!")
    router.push("/userinfo")

  }catch(error){
     console.error("error before submitting weight:" ,error)
    setMessage("failed to save weight")
  }
}


  return (
    <div className="min-h-screen bg-[url('/backgroundimage.jpg')] bg-cover bg-center p-8 ">
      <br></br>
      <form onSubmit={handleSubmit}>
    <div className=" relative rounded-full bg-white place-items-center mx-auto p-6 max-w-2xl  ">
      <p className="font-semibold text-2xl "> 🔹What is your age?</p>
    
    <div className="relative w-64 flex place-items-center border-b-2 border-black px-2 py-1 mx-auto focus-within:border-blue-700">
      {/* Input Field */}
      <input
        type="number"
        placeholder=" "
        value={age}
        onChange={(e)=>setAge(e.target.value)}
        className="w-full outline-none bg-transparent text-lg"
      />
       <span className="ml-2">Years</span>
      </div>
       
      
    
    <br></br>
    <div className="flex justify-between mt-8 items-center gap-20">
      
        <button onClick={()=>router.push("/weight")} className=" bg-blue-600 rounded-lg flex-row-reverse  text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 ">Back</button>
    
    
        <button type="submit" className="bg-blue-600   text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 rounded-lg flex-row-reverse  ">
          Next
        </button>
    
    </div>
    </div>
    </form>
    </div>



    
  );
}
