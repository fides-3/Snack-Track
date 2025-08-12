"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function Diary() {

  const [water, setWater] = useState(1.9); // Liters
  const waterGoal = 2.5;

  const meals = [
    { name: "Breakfast", calories: 531, time: "10:45 AM" },
    { name: "Lunch", calories: 1024, time: "3:45 PM" },
    {name:"supper",calories:1378,time:"7:10PM"}
  ];

  const waterPercent = Math.round((water / waterGoal) * 100);

  return (
    <div className="p-4 max-w-md mx-auto space-y-6 font-sans bg-gray-50 min-h-screen">
      
      
      

      {/* Water Intake */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="text-md font-semibold mb-4">Water Intake</h2>
        <div className="flex items-center justify-between mb-2">
          <span>
            <span className="font-bold">{water.toFixed(1)}</span> / {waterGoal}L
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setWater(Math.min(water + 0.1, waterGoal))}
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
            onClick={() => setWater(Math.max(water - 0.1, 0))}
            className="bg-gray-100 rounded-full p-2"
          >
            <Minus className="w-5 h-5" />
          </button>

          <span className="text-blue-500 font-medium">{waterPercent}%</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">Last time 10:45 AM</p>
      </div>

      {/* Meals */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md font-semibold">Meals</h2>
          <button className="text-lg text-gray-500">+</button>
        </div>
        <div className="space-y-4">
          {meals.map((meal, i) => (
            <div key={i} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{meal.name}</p>
                <p className="text-sm text-gray-400">{meal.time}</p>
              </div>
              <p className="font-semibold">{meal.calories} Cal</p>
            </div>
          ))}
        </div>

      </div>
    </div>

  );
}

