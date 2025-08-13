"use client";

import { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from 'next/link'

export default function Diary() {
  // Start with null so we know when data hasn't loaded yet
  const [water, setWater] = useState<number | null>(null);
  const [lastTime, setLastTime] = useState<string>("");
  const waterGoal = 2.5;

  const meals = [
    { name: "Breakfast", calories: 531, time: "10:45 AM" },
    { name: "Lunch", calories: 1024, time: "3:45 PM" },
    { name: "Supper", calories: 1378, time: "7:10 PM" },
  ];

  const waterPercent =
    water !== null ? Math.round((water / waterGoal) * 100) : 0;

  // Fetch saved water intake from DB when user logs in
  useEffect(() => {
    const fetchWater = async () => {
      try {
        const res = await fetch("/api/waterintake",
           { method: "GET" }
          );
        if (!res.ok) throw new Error("Failed to fetch water data");
        const data = await res.json();

        setWater(data.amount ?? 0);
        if (data.lastTime) {
          const time = new Date(data.lastTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          setLastTime(time);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setWater(0); // fallback
      }
    };

    fetchWater();
  }, []);

  // Update water in state + DB
  const updateWater = async (newWater: number) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setWater(newWater);
    setLastTime(formattedTime);

    try {
      await fetch("/api/waterintake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: newWater, lastTime: now }),
      });
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleIncrease = () => {
    if (water !== null) {
      const newWater = Math.min(parseFloat((water + 0.1).toFixed(1)), waterGoal);
      updateWater(newWater);
    }
  };

  const handleDecrease = () => {
    if (water !== null) {
      const newWater = Math.max(parseFloat((water - 0.1).toFixed(1)), 0);
      updateWater(newWater);
    }
  };

  if (water === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

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
            onClick={handleIncrease}
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
            onClick={handleDecrease}
            className="bg-gray-100 rounded-full p-2"
          >
            <Minus className="w-5 h-5" />
          </button>

          <span className="text-blue-500 font-medium">{waterPercent}%</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Last Time {lastTime || "--:--"}
        </p>
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
                <Link href='/cal'>
                <div className="rounded-full bg-slate-500 ">
                <button  className="font-medium">{meal.name}</button>
                </div>
                </Link>
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
