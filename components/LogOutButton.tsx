"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })} // redirect to home after logout
      className="bg-blue-300 w-full  text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}
