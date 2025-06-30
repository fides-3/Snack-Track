
"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
    <div className="p-6">
      <h2 className="text-2xl font-bold  space-y-4 mb-4">Your Info</h2>
      <p><strong>Email:</strong> {info.email}</p>
      <p><strong>Age:</strong> {info.age}</p>
      <p><strong>Weight:</strong> {info.weight}</p>
      <p><strong>Gender:</strong> {info.gender}</p>
      <p><strong>Height:</strong> {info.height}</p>
      <p><strong>Activity:</strong> {info.activity}</p>
      <p><strong>Goal:</strong> {info.goal}</p>
    </div>
  );
}
