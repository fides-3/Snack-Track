"use client";
import { useEffect, useState } from "react";
import{useRef} from "react"
import {FaCamera} from "react-icons/fa"
import {useSession} from "next-auth/react"

// ✅ Define a type for the user object
type UserType = {
  email: string;
  phone?: string;
  location?: string;
  image?: string;
};

export default function AccountPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const[image,setImage]=useState("/background.jpg")
  const fileInputRef=useRef<HTMLInputElement |null>(null);
  const{data:session,status}=useSession();
  


  const handleImageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0];
    if (file){
      const imageUrl=URL.createObjectURL(file);
      setImage(imageUrl)
    }
  }
  // ✅ Load user data when component mounts
  useEffect(() => {
    if(!session?.user?.email) return;

    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setPhone(data.user.phone || "");
        setLocation(data.user.location || "");
        setImage(data.user.image || "/backgroundimage.jpg")
      });
  }, [session?.user?.email]);

  // ✅ Properly type the form event
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Only send update if user exists
    if (!user) return;

    const res = await fetch("/api/update-profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, phone, location }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  const handleLogout = async () => {
    await fetch("/api/logout");
    window.location.href = "/login";
  };

  // ✅ Return loading if user is not yet loaded
  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow space-y-4">
      <h1 className="text-2xl font-bold text-center">My Account</h1>

      <div className="relative w-24 h-24 mx-auto ">
      <img
        src={image}
        className="w-24 h-24 mx-auto rounded-full"
        alt="User"
      />
      <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <FaCamera className="text-gray-700" />
        </button>

         {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        </div>


      <p><strong>Email:</strong>
       {user.email}</p>
      

      <form onSubmit={handleUpdate} className="space-y-3">
        <label><strong>Phone Number</strong></label>
        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <label><strong>Location</strong></label>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Save Changes
        </button>
      </form>

      {message && <p className="text-center text-green-600">{message}</p>}

      <button
        onClick={handleLogout}
        className="w-full text-red-500 mt-4 hover:underline"
      >
        Logout
      </button>
    </div>
  );
}
