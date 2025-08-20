"use client"
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { MdCreate } from "react-icons/md";
import { LuHandshake } from "react-icons/lu";
import {GoGoal} from 'react-icons/go'
import {BiMaleFemale} from 'react-icons/bi'
import  {FiActivity} from 'react-icons/fi'
import {GiBodyHeight} from 'react-icons/gi'
import { FaWeight } from "react-icons/fa";
import { FaRegHourglass } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiFaceSmile } from "react-icons/ci";
import { LiaQuestionSolid } from "react-icons/lia";
function Sidebar(){
    return(
        <div className="w-36 fixed  left-0 top-10  bg-white dark:bg-black  dark:text-white  text-black  h-screen">

            {/* <img src="/welcome1.jpg " className="pt-4 pb-0 pl-4  " width={450}/> */}
            
            <ul className="flex flex-col pl-12 pt-0 font-md  space-y-5">
                <div className="flex  items-center border-b border-gray-500 ">
                    <IoHomeOutline className="space-x-2 w-5 h-5  dark:text-white"></IoHomeOutline>
                <Link href="/" className=" dark:text-white">Home</Link>
                </div>
                <div className="flex items-center w-full border-b border-gray-500 ">
                    <MdCreate className="space-x-2 w-5 h-5  dark:text-white"></MdCreate>
                <Link href="/signup">Signup</Link>
                </div>
                <div className="flex items-center border-b border-gray-500 ">
                    <LuHandshake className="space-x-2 w-5 h-5"></LuHandshake>
                <Link href="/welcome">Welcome</Link>
                </div>
                <div className="flex border-b border-gray-500  items-center">
                    <GoGoal className="space-x-4 w-5 h-5"></GoGoal>
                <Link href="/Goal" >Goals</Link>
                </div>
                <div className="flex items-center border-b border-gray-500 ">
                    <BiMaleFemale className="space-x-2 w-5 h-5"></BiMaleFemale>
                <Link href="/Gender" >Gender</Link>
                </div>
                <div className="flex items-center border-b border-gray-500 ">
                    <FiActivity className="space-x-2 w-5 h-5"></FiActivity>
                <Link href="/Activity" >Activity</Link>
                </div>
                <div className="flex items-center border-b border-gray-500 ">
                    <GiBodyHeight className="space-x-2 w-5 h-5"></GiBodyHeight>
                <Link href="/Height" >Height</Link>
                </div>
                <div className="flex items-center border-b border-gray-500 ">
                    <FaWeight className="space-x-2 w-5 h-5"></FaWeight>
                <Link href="/Weight">Weight</Link>
                </div>

                <div className="flex items-center border-b border-gray-500 ">
                    <FaRegHourglass className="w-5 h-5 space-x-2"></FaRegHourglass>
                <Link href="/Age">Age</Link>
                </div>

                <div className="flex items-center border-b border-gray-500 ">
                    <CgProfile className="w-5 h-5 space-x-2"></CgProfile>
                <Link href="/account" >Profile</Link>
                </div>
                <div className="flex items-center border-b border-gray-500 ">
                    <CiFaceSmile className="w-5 h-5 space-x-2"></CiFaceSmile>
                <Link href="/userinfo">Me</Link>
                </div>
                {/* <div className="flex items-center border-b border-gray-500">
                    <LiaQuestionSolid className="w-5 h-5 space-x-2"></LiaQuestionSolid>
                <Link href="/chatbot">Questions</Link>    

                </div> */}
            </ul>
           </div>
        
    )

}
export default Sidebar
