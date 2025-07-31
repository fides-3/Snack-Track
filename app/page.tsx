


'use client';
import { signIn } from "next-auth/react"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Eye, EyeOff } from "lucide-react";
// import { Button } from "@/components/ui/button";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  // const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setMessage('');

    console.log("🔐 Attempting login with:", { email });

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    console.log("🔐 Login result:", res);

    if (res?.ok) {
      console.log("✅ Login successful");
      router.push("/welcome");
    } else {
      console.log("❌ Login failed:", res?.error);
      setMessage("Invalid email or password");
    }
    
  
  };

  return (
   
    <div className=" flex justify-center min-h-screen bg-white dark:bg-black text-black dark:text-white transition-all duration-300 items-center">
     
      <form onSubmit={handleLogin} className="bg-white p-8 flex  rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
         <div className="w-1/2 hidden md:block">
         <img src="/welcome1.jpg" className="h-full w-full object-cover" />
      </div>
      <div className="w-full md:w-1/2 p-8 space-y-5">
       <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      
     
       
        
         <div className="mb-4 relative">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 w-full rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <span className="absolute right-3 top-10 text-gray-400">
            <Mail size={16} />
          </span>
        </div>
        
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-4 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <span 
            className="absolute right-3 top-10 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </span>
        </div>
          <div className="flex items-center justify-between mb-6">
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input type="checkbox" className="w-4 h-4 text-blue-500" />
            <span>Remember me</span>
          </label>
          <a
            href="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot password?
          </a>
        </div>
        
        <button 
          type="submit" 
        
          className="w-full mb-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >Login
        
        </button>
        
        {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
        
        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
         </div>
         {/* <div className="space-x-2">
          <Button>Button 1</Button>
          <Button variant="secondary">Button 2</Button>
          <ThemeToggle/>
         </div> */}
      </form>
    </div>
  );
}