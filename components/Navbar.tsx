"use client";
// import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react"; 
import{useSession} from "next-auth/react";
import {ThemeToggle} from "../app/theme-toggle"
import Image from "next/image";


// type UserType = {
//   email: string;
//   image?: string;
// };

export default function Navbar() {
  // const [user, setUser] = useState<UserType | null>(null);
  const{data:session,status}=useSession()
  console.log("SESSION:", session);
  console.log("STATUS:", status);



  // useEffect(() => {
  //   fetch("/api/me")
  //     .then((res) => res.json())
  //     .then((data) => setUser(data.user));
  // }, []);

  return (
    <div className="w-full  flex justify-between p-0 m-0 items-center dark:bg-black bg-white">
      {/* <Link href="/" className="text-xl font-bold text-blue-600"></Link> */}
      <div className="bg-white dark:bg-black text-black dark:text-white flex justify-between">
      <ThemeToggle/>
      </div>


      {status==="authenticated"? (
        <Link href="/account" className="flex items-center space-x-2">
          {session.user?.image ? (
            <Image src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full" />
          ) : (
            <User className="w-6 h-6 text-gray-600 dark:text-white" />
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


// "use client";

// import Link from "next/link";
// import { User } from "lucide-react";
// import { useSession } from "next-auth/react";

// export default function Navbar() {
//   const { data: session, status } = useSession();
  
//   // Enhanced debugging
//   console.log("=== NAVBAR DEBUG ===");
//   console.log("STATUS:", status);
//   console.log("SESSION:", session);
//   console.log("SESSION USER:", session?.user);
//   console.log("SESSION EXPIRES:", session?.expires);
//   console.log("USER EMAIL:", session?.user?.email);
//   console.log("USER IMAGE:", session?.user?.image);
//   console.log("==================");

//   return (
//     <div className="w-full flex justify-between p-4 m-0 items-center bg-white border-b">
//       <Link href="/" className="text-xl font-bold text-blue-600">
//         Snack & Track
//       </Link>
      
//       {/* Debug panel - REMOVE THIS IN PRODUCTION */}
//       <div className="fixed top-16 left-4 bg-yellow-100 p-2 text-xs border rounded shadow-lg z-50">
//         <div><strong>Debug Info:</strong></div>
//         <div>Status: <span className="font-mono">{status}</span></div>
//         <div>Email: <span className="font-mono">{session?.user?.email || "none"}</span></div>
//         <div>Session exists: <span className="font-mono">{session ? "yes" : "no"}</span></div>
//         <div>User exists: <span className="font-mono">{session?.user ? "yes" : "no"}</span></div>
//       </div>
      
//       {status === "loading" && (
//         <div className="text-sm text-gray-500 animate-pulse">Loading...</div>
//       )}
      
//       {status === "authenticated" && session?.user ? (
//         <div className="flex items-center gap-4">
//           {/* Show what we're working with */}
//           <div className="text-xs text-gray-500">
//             ✅ Authenticated: {session.user.email}
//           </div>
//           <Link href="/account" className="flex items-center space-x-2 hover:opacity-80 border border-green-500 p-2 rounded">
//             {session.user.image ? (
//               <img 
//                 src={session.user.image} 
//                 alt="Profile" 
//                 className="w-8 h-8 rounded-full border-2 border-gray-200" 
//                 onError={(e) => {
//                   console.log("Image failed to load:", session.user.image);
//                 }}
//               />
//             ) : (
//               <User className="w-6 h-6 text-gray-600" />
//             )}
//             <span className="text-sm text-gray-700 hidden sm:inline">
//               Account
//             </span>
//           </Link>
//         </div>
//       ) : status === "unauthenticated" ? (
//         <div className="flex items-center gap-4">
//           <div className="text-xs text-red-500">
//             ❌ Not authenticated
//           </div>
//           <div className="flex gap-2">
//             <Link href="/login" className="text-sm text-blue-500 hover:underline">
//               Sign in
//             </Link>
//             <Link href="/signup" className="text-sm text-blue-500 hover:underline">
//               Sign up
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div className="text-xs text-yellow-600">
//           ⏳ Status: {status}
//         </div>
//       )}
//     </div>
//   );
// }