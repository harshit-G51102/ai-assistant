"use client";

import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import React, { useContext } from "react";
import { ModeToggle } from "./ModeToggle";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


function Header() {
    const { user } = useContext(AuthContext);
    console.log(user);

    return (
        <div className='p-3 shadow-sm flex justify-between items-center dark:shadow-white/20'>
            <Image src={'/logo.svg'} alt='img' height={50} width={150} className="dark:bg-white rounded-xl" />
            <ModeToggle />
            <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    {user?.name && <p className="font-bold">Welcome {user.name}</p>}
                    <Dialog >
                        <DialogTrigger className={`ml-auto ${user?.orderId?'text-blue-400':'text-green-500'}`}>{user?.orderId ? '👑 Pro Plan' : '🆓 Free Plan'}</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Upgrade Plan?</DialogTitle>
                                <DialogDescription>
                                    Upgrade your plan to enjoy premium services
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                {user?.picture && (
                    <Image
                        src={user.picture}
                        alt='User profile'
                        height={50}
                        width={50}
                        className="rounded-full"
                    />
                )}
                {/* Wrap text content in a div and align it */}
            </div>
        </div>

    );
}

export default Header;
