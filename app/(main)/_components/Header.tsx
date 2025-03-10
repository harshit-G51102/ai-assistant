"use client";

import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import React, { useContext } from "react";
import { ModeToggle } from "./ModeToggle";


function Header() {
    const { user } = useContext(AuthContext);
    console.log(user);

    return (
        <div className='p-3 shadow-sm flex justify-between items-center'>
            <Image src={'/logo.svg'} alt='img' height={50} width={150} className=" dark:bg-white rounded-xl "/>
            <ModeToggle></ModeToggle>
            <div className="flex flex-col items-center justify-center">
            {user?. picture
                && (
                    <Image src={user.picture} alt='User profile' height={50} width={50} className="rounded-full" />
                )}
                {user?.name&&<p className="font-bold">Welcome {user.name}</p>}
            </div>
        </div>
    );
}

export default Header;
