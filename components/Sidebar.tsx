"use client"
import Link from "next/link";
function Sidebar(){
    return(
        <div className="w-48 fixed left-0 top-0   bg-white  space-y-4 h-screen">
            <img src="/welcome1.jpg" className="pt-4 pb-0 pl-4" width={450}/>

            <ul className="flex flex-col pl-12 pt-0 font-semibold space-y-3">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/signup" className="hover:underline">Signup</Link>
                <Link href="/welcome" className="hover:underline">Welcome</Link>
                <Link href="/Goal" className="hover:underline">Goals</Link>
                <Link href="/Gender" className="hover:underline">Gender</Link>
                <Link href="/Activity" className="hover:underline">Activity</Link>
                <Link href="/Height" className="hover:underline">Height</Link>
                <Link href="/Weight" className="hover:underline">Weight</Link>
                <Link href="/Age" className="hover:underline">Age</Link>
                <Link href="/account" className="hover:underline">Profile</Link>
                <Link href="/userinfo" className="hover:underline">Me</Link>
            </ul>

        </div>
    )

}
export default Sidebar
