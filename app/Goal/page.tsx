"use client"
import React ,{useState} from 'react'


function Goal(){
    const [selectedOption,setSelectedOption]=useState("")
    return(
        <div className="bg-[url('/backgroundimage.jpg')] bg-cover bg-center min-h-screen p-8">
            <div className="  relative  rounded-full place-items-center p-20 mx-auto bg-white max-w-2xl">
                <p className="text-center font-semibold text-2xl ">🔹What is Your goal?</p>
                <br></br>
                <div className="flex-col flex justify-center">
                    <label className="flex items-center mb-2">
        <input
          type="radio"
          name="goal"
          value="lose"
          checked={selectedOption === 'lose'}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="mr-2"
        />
        Lose Weight
      </label>

                
                <label className="flex items-center mb-2">
        <input
          type="radio"
          name="goal"
          value="maintain"
          checked={selectedOption === 'maintain'}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="mr-2"
        />
        Keep Weight
      </label>
                <label className="flex items-center mb-2">
        <input
          type="radio"
          name="goal"
          value="gain"
          checked={selectedOption === 'gain'}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="mr-2 "
        />
        Gain Weight
      </label>
                </div>
                <br></br>


              
                <div className=" flex justify-between items-center gap-20 mt-8 ">
                <a href="/welcome">
                <button className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 rounded-lg flex-row-reverse  ">
                    BACK
                </button>
                </a>
                

                
                     <a href="/Gender">
                <button className="bg-blue-600 rounded-lg  text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300  flex-row-reverse  ">
                    NEXT
                </button>

                </a>
                </div>
        


            </div>
        </div>
    )

        
    
}
export default Goal