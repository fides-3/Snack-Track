"use client"
import { useState } from "react";

export default function Weight() {
  const [unit, setUnit] = useState("kg");
  const [showUnits, setShowUnits] = useState(false);
  const units = ["kg", "lb" , "pounds"];
  <br></br>

  return (
    <div className="min-h-screen bg-[url('/backgroundimage.jpg')] bg-cover bg-center p-8 ">
      <br></br>
    <div className=" relative rounded-full bg-white place-items-center mx-auto p-6 max-w-2xl  ">
      <p className="font-semibold text-2xl "> 🔹What is your weight?</p>
    
    <div className="relative w-64 flex place-items-center border-b-2 border-black px-2 py-1 mx-auto focus-within:border-blue-700">
      {/* Input Field */}
      <input
        type="number"
        placeholder=" "
        className="w-full outline-none  bg-transparent text-lg"
      />

      {/* Unit Display */}
      <div
        className="flex items-center text-black cursor-pointer relative"
        onClick={() => setShowUnits(!showUnits)}
      >
        <span className="ml-2">{unit}</span>
        <svg
          className="ml-1 w-3 h-3 text-black"
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
                className="px-3 py-1 hover:bg-green-100 cursor-pointer"
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
      <a href="/Height ">
        <button className=" bg-blue-600  rounded-lg flex-row-reverse  text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300  ">Back</button>
      </a>
      <a href="/Age">
        <button className="bg-blue-600   text-white hover:bg-blue-700 font-semibold px-6 py-2 shadow-md transition duration-300 rounded-lg flex-row-reverse  ">
          Next
        </button>
      </a>
    </div>


    </div>
    </div>
  );
}
