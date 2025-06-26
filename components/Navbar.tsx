"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react"; 

type UserType = {
  email: string;
  image?: string;
};

export default function Navbar() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <div className="w-full  flex justify-between p-0 m-0 items-center bg-white">
      <Link href="/" className="text-xl font-bold text-blue-600"></Link>


      {user ? (
        <Link href="/account" className="flex items-center space-x-2">
          {user.image ? (
            <img src={user.image} alt="Profile" className="w-8 h-8 rounded-full" />
          ) : (
            <User className="w-6 h-6 text-gray-600" />
          )}
        </Link>
      ) : (
        <Link href="/signup" className="text-sm text-blue-500 hover:underline">
          Sign up
        </Link>
      )}
    </div>
  );
}
