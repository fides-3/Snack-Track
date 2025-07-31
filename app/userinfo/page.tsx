
"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import BottomNav from '@/components/BottomNav'

export default function UserInfoPage() {
  const { data: session } = useSession();
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;
      const res = await fetch("/api/me"); 
      const data = await res.json();
      setInfo(data.user);
    };
    fetchData();
  }, [session?.user?.email]);

  if (!session) return <p>Please login to see your data</p>;
  if (!info) return <p>Loading...</p>;

  return (
    <div className=" bg-[url('/backgroundimage.jpg')] dark:bg-[url('/darkbg.jpg')] bg-cover bg-center min-h-screen flex  items-center justify-center px-4 ">
      <div className="bg-white  dark:bg-black bg-opacity-90 backdrop-blur-md rounded-2xl mt-0 shadow-lg max-w-sm w-full p-8 space-y-4 text-gray-800 text-left">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Your Info</h2>
      <p ><strong>Email:</strong> {info.email}</p>
      <p><strong>Age:</strong> {info.age}</p>
      <p><strong>Weight:</strong> {info.weight}</p>
      <p><strong>Gender:</strong> {info.gender}</p>
      <p><strong>Height:</strong> {info.height}</p>
      <p><strong>Activity:</strong> {info.activity}</p>
      <p><strong>Goal:</strong> {info.goal}</p>
      </div>

      <BottomNav/>

    </div>
  );
}
