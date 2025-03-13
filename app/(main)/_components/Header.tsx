"use client";

import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import React, { useContext } from "react";
import { ModeToggle } from "./ModeToggle";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"


function Header() {
    const { user, setUser } = useContext(AuthContext);
    console.log(user);
    const router = useRouter();

    const handleSignOut = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user_token');
        }
        setUser(null);
        router.push('/sign-in');
    }

    return (
        <div className='p-3 shadow-sm flex justify-between items-center dark:shadow-white/20'>
            <Image src={'/logo.svg'} alt='img' height={50} width={50} className=" rounded-xl" />
            <div className="flex items-center gap-4">
                <ModeToggle />
                <Button variant="destructive" onClick={handleSignOut}>
                    Sign Out
                </Button>
                <div className="flex flex-col">
                    {user?.name &&

                        <p className="font-bold">Welcome {user.name}</p>
                    }
                    <Drawer>
                        <DrawerTrigger className={`ml-auto ${user?.orderId ? 'text-blue-400' : 'text-green-500'}`}>{user?.orderId ? '👑 Pro Plan' : '🆓 Free Plan'}</DrawerTrigger>
                        <DrawerContent className="flex items-center justify-center">
                            <DrawerHeader>
                                <DrawerTitle className="text-center text-8xl">Upgrade Plan?</DrawerTitle>
                                <DrawerDescription className="text-5xl">Upgrade Plan To Enjoy Premium Services</DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                <Button className="h-10 w-60">Upgrade</Button>
                                <DrawerClose asChild>
                                    <div>
                                        <Button className="h-10 w-60" variant="outline">Cancel</Button>
                                    </div>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>


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
