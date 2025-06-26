"use client"
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
   
    const pathname = usePathname();
    const noSidebarRoutes = ["/", "/login"];
    const hideSidebar = noSidebarRoutes.includes(pathname);

    return (
    <div className="flex" >
      {!hideSidebar && <Sidebar />}

      <div
        className={`flex-1 min-h-screen ${
          hideSidebar ? "ml-0" : "ml-48"
        }`}
      >
        {!hideSidebar && <Navbar />}
        <main className="p-2">{children}</main>
      </div>
      </div>
    
  );
}

