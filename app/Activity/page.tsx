"use client"
import WizardProgress from '@/components/WizardProgress'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
function Activity(){
    const[activity,setActivity]=useState("")
    const[message,setMessage]=useState("")
    
      const router=useRouter()
    
      const handleSubmit= async (e:React.FormEvent)=>{
        e.preventDefault()
      
      if(!activity){
        setMessage("Please select one of these")
        return
      }
      try{
        const res=await fetch("/api/me",{
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({activity})
        })
        if(!res.ok){
          const err=await res.json()
          setMessage(err.message||"Something went wrong")
          return
        }
        await res.json()
        setMessage("Activity Saved!")
        router.push("/Height")
    
      }catch(error){
         console.error("error before submitting activity:" ,error)
        setMessage("failed to save activity")
      }
    }
    
    return(
        <div className="bg-[url('/backgroundimage.jpg')]  dark:bg-[url('/darkbg.jpg')] bg-cover bg-center p-8   min-h-screen">
            <form onSubmit={handleSubmit}>
     <div className=" relative mx-auto p-20 max-w-2xl rounded-full bg-white dark:bg-black place-items-center ">
      <WizardProgress currentStep={3} totalSteps={6}  />
     
        
                <p className='font-semibold text-2xl text-center text-black dark:text-white'>🔹How active are you?</p>
                <div className='flex flex-col justify-center'>
                    <br></br>
                    <label className='flex items-center text-black dark:text-white mb-2'>
                        <input type="radio" name="activity" value="Sedentary" checked={activity==="Sedentary"}
                        onChange={(e)=>setActivity(e.target.value)}/>Sedentary
                    </label>

                    <label className='flex items-center mb-2'>
                        <input type="radio" name="activity" value="Low Active" checked={activity==="Low Active"}
                        onChange={(e)=>setActivity(e.target.value)}/>
                        Low Active
                    </label>

                     <label className='flex items-center mb-2'>
                        <input type="radio" name="activity" value="Active" checked={activity==="Active"}
                        onChange={(e)=>setActivity(e.target.value)}/>
                        Active
                    </label>
                    
                    <label className='flex items-center mb-2'>
                        <input type="radio" name="activity" value="Very Active" checked={activity==="Very Active"}
                        onChange={(e)=>setActivity(e.target.value)}/>
                         Very Active
                    </label>  
                </div>
                <div className='flex justify-between items-center mt-8 gap-20'>
                    
                    <button onClick={()=>router.push("/Gender")} className='flex-row-reverse rounded-lg bg-blue-600  text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 '>Back</button>
                    
            
                    
                    <button  type="submit" className='flex-row-reverse rounded-lg bg-blue-600  text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 '>Next</button>
                
                </div>
                    {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
                
                

            </div>
            </form>
             

        </div>
    )

}
export default Activity