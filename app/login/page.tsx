

'use client';
import { signIn } from "next-auth/react"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
    
    setLoading(false);
  };

  return (
    <div className="flex bg-[url('/backgroundimage.jpg')] bg-cover bg-center justify-center min-h-screen bg-white items-center">
      <form onSubmit={handleLogin} className="max-w-sm mx-auto p-8 rounded-2xl bg-white w-full shadow-lg">
        <h2 className="text-xl text-center mb-4">Login</h2>
        
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
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <span 
            className="absolute right-3 top-10 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </span>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        
        {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
        
        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}