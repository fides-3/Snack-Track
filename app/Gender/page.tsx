"use client"
import WizardProgress from '@/components/WizardProgress'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
function Gender(){
    const[selectedGender,setSelectedGender]=useState("")
    
    const[message,setMessage]=useState("")
        
          const router=useRouter()
        
          const handleSubmit= async (e:React.FormEvent)=>{
            e.preventDefault()
          
          if(!selectedGender){
            setMessage("Please select one of these options")
            return
          }
          try{
            const res=await fetch("/api/me",{
              method:"PUT",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify({gender:selectedGender})
            })
            if(!res.ok){
              const err=await res.json()
              setMessage(err.message||"Something went wrong")
              return
            }
            await res.json()
            setMessage("Option Saved!")
            router.push("/Activity")
        
          }catch(error){
             console.error("error before submitting option:" ,error)
            setMessage("failed to save option")
          }
        }
        
    return(
        
        <div className="bg-[url('/backgroundimage.jpg')] dark:bg-[url('/darkbg.jpg')] bg-cover bg-center min-h-screen p-8">
            <form onSubmit={handleSubmit}>
            <div className=" relative max-w-2xl rounded-full  bg-white  dark:bg-black place-items-center mx-auto p-6    ">
              <WizardProgress currentStep={2} totalSteps={6}  />
        <p className='font-semibold text-2xl text-black dark:text-white'>🔹What is your gender?</p>
        <br></br>
        <div className="flex-col space-y-4 flex justify-center">
            <label className="flex mb-2  text-black dark:text-white items-center">
                <input type="radio" name="Gender" value="Male" 
                checked={selectedGender==="Male"} onChange={(e)=>setSelectedGender(e.target.value)}/>
                Male👨
            </label>
            <label className='flex mb-2 items-center'>
                <input type="radio" name="Gender" value="Female"
                checked={selectedGender==="Female"} onChange={(e)=>setSelectedGender(e.target.value)}/>
                Female👩
            </label>

                
                
            </div>
            <br></br>
             <div className=" flex justify-between items-center mt-8  gap-20 ">
               
                <button onClick={()=>router.push("/Goal")} className="  bg-blue-600    text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 rounded-lg flex-row-reverse  ">  
                    BACK
                </button>
              
                

                
                 
                <button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 rounded-lg flex-row-reverse  ">
                    NEXT</button>
                   {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
             

                
                </div>
                <br></br>

            </div>
            </form>
            
        </div>
    )

}
export default Gender;