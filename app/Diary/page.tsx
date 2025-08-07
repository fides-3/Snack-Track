"use client"
import CalendarPicker from "@/components/CalendarPicker"
import{useState} from 'react'
export default function Diary(){
    const[food,setFood]=useState("")
    const [calories,setCalories]=useState<number |null >(null)
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState("")

    const handleCheckCalories=async()=>{
        if (!food) return
        
        setLoading(true)
        setError("")
        
        try{
            const res=await fetch('/api/diary',{
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({food}),

            })
            const data=await res.json()

            if(res.ok){
                setCalories (data.calories)
            }
            else{
                setError (data.error||'Something went wrong')
            }
        }catch(error){
            setError('Failed to fetch calories')
        }finally{
            setLoading(false)
        }
    }
   



    return(
        <div className="bg-[url('/backgroundimage.jpg')] bg-cover bg-center flex items-center justify-center min-h-screen ">
            <div className="rounded-2xl shadow-lg  bg-white relative max-w-xl p-8 mx-auto w-full">
                <div className="top-2 right-2 absolute ">
             <CalendarPicker/>
               </div>
             <h1 className="text-center font-semibold text-blue-500"><u>DAILY DIARY</u></h1> 

             <div className="mt-6 space-y-4  ">
                <input type="text" value={food} onChange={(e)=>setFood(e.target.value)} placeholder="Enter food taken..."
                className="rounded-xl w-full border p-2 border-gray-600"/>
                <div className="flex items-center justify-center pt-4">

                 <button onClick={handleCheckCalories} className="px-6 py-2 text-center rounded-lg text-white font-semibold bg-blue-600 animate-pulse">
                SUBMIT

             </button>
              </div>
              <div className="flex items-center justify-center">
             {error && <p className="text-blue-100">{error}</p>}
             </div>
            
             {calories !=null &&(
                <p className="text-black">Estimated Calories:{calories}</p>           
                  )}
                  
            

             </div>
            
            </div>


            

        </div>


    )
}