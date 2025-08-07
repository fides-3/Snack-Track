
import Link from "next/link";
import { BookOpen, PieChart, BarChart2 } from "lucide-react";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-48 right-0 bg-blue-200 dark:bg-blue-950 flex justify-around items-center h-20 rounded-2xl shadow-md z-50">
      {/* Recipes */}
      <Link href="/Recipes" className="flex flex-col items-center   text-blue-500 hover:text-blue-800">
        <BookOpen className="w-6 h-6" />
        <span className="text-sm">Recipes</span>
      </Link>

      {/* Diary */}
      <Link href="/Diary" className=" text-blue-500   flex flex-col items-center hover:text-blue-800">
        <PieChart className="w-6 h-6" />
        <span className="text-sm ">Diary</span>
      </Link>

      {/* Reports */}
      <Link href="/reports" className="flex flex-col items-center text-blue-500 hover:text-blue-800">
        <BarChart2 className="w-6 h-6" />
        <span className="text-sm">Reports</span>
      </Link>
    </div>
  );
}
