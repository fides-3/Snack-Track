'use client';
import {signIn} from "next-auth/react"
import { useState } from "react";
import { useRouter } from "next/navigation";
import{Mail,Eye,EyeOff} from "lucide-react";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const[showPassword, setShowPassword]=useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect:false
    });

  

    if (res?.ok) {
      router.push("/welcome");
    } else {
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="flex bg-[url('/backgroundimage.jpg')] bg-cover bg-center justify-center min-h-screen bg-white items-center  ">
    <form onSubmit={handleLogin} className="max-w-sm mx-auto p-8 rounded-2xl bg-white w-full  shadow-lg">
      <h2 className="text-xl  text-center mb-4">Login</h2>
      <div className="mb-4 relative">
       <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-4"
      />
       <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor pointer"><Mail size={16}/></span>
       </div>
      <div className="mb-4 relative">
       <label htmlFor="email" className="block text-gray-700 mb-1">
            Password
          </label>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
           onClick={() => setShowPassword(!showPassword)}> {showPassword ? <Eye size={0} /> :<EyeOff size={0} />}</span>
           </div>
      <button type="submit" className="bg-blue-500 items-center text-white w-full mb-3 py-2 rounded">
        Login
      </button>
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </form>
    </div>
  );
}
