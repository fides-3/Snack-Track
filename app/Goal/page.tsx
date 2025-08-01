"use client"
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import WizardProgress from '@/components/WizardProgress'


function Goal(){
    const [selectedGoal,setSelectedGoal]=useState("")
    const[message,setMessage]=useState("")
       const router=useRouter()
            
              const handleSubmit= async (e:React.FormEvent)=>{
                e.preventDefault()
              
              if(!selectedGoal){
                setMessage("Please select one of these options")
                return
              }
              try{
                const res=await fetch("/api/me",{
                  method:"PUT",
                  headers:{"Content-Type":"application/json"},
                  body:JSON.stringify({goal:selectedGoal})
                })
                if(!res.ok){
                  const err=await res.json()
                  setMessage(err.message||"Something went wrong")
                  return
                }
                await res.json()
                setMessage("Option Saved!")
                router.push("/Gender")
            
              }catch(error){
                 console.error("error before submitting option:" ,error)
                setMessage("failed to save option")
              }
            }
    return(
        <div className="bg-[url('/backgroundimage.jpg')] dark:bg-[url('/darkbg.jpg')] bg-cover bg-center min-h-screen p-8">
          <form onSubmit={handleSubmit}>
            <div className="  relative  rounded-full place-items-center p-20 mx-auto bg-white dark:bg-black max-w-2xl">
              <WizardProgress currentStep={1} totalSteps={6}  />
                <p className="text-center font-semibold text-2xl text-black dark:text-white ">🔹What is Your goal?</p>
                <br></br>
                <div className="flex-col flex justify-center">
                    <label className="flex items-center mb-2">
        <input
          type="radio"
          name="Goal"
          value="Lose Weight"
          checked={selectedGoal === 'Lose Weight'}
          onChange={(e) => setSelectedGoal(e.target.value)}
          className="mr-2 text-black dark:text-white"
        />
        Lose Weight
      </label>

                
                <label className="flex items-center mb-2">
        <input
          type="radio"
          name="Goal"
          value="Keep Weight"
          checked={selectedGoal=== 'Keep Weight'}
          onChange={(e) => setSelectedGoal(e.target.value)}
          className="mr-2"
        />
        Keep Weight
      </label>
                <label className="flex items-center mb-2">
        <input
          type="radio"
          name="Goal"
          value="Gain Weight"
          checked={selectedGoal === 'Gain Weight'}
          onChange={(e) => setSelectedGoal(e.target.value)}
          className="mr-2 "
        />
        Gain Weight
      </label>
                </div>
                <br></br>


              
                <div className=" flex justify-between items-center gap-20 mt-8 ">
                
                <button onClick={()=>router.push("/welcome")} className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 rounded-lg flex-row-reverse  ">
                    BACK
                </button>
              
                <button type="submit" className="bg-blue-600 rounded-lg  text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300  flex-row-reverse  ">
                    NEXT
                </button>
                  
                

        
                </div>
                  {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
        


            </div>
            </form>
        </div>
    )

        
    
}
export default Goal