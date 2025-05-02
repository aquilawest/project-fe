import Image from "next/image";
import {use } from 'react'
import UserDashboard from "@/app/dashboard/(user)/page";
export default function Dashboard() {
    return (
        <div className=" items-center justify-items-center min-h-screen p-8 pb-20 ">
           <UserDashboard/>
        </div>
    );
}
