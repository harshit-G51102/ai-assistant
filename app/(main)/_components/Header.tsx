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
} from "@/components/ui/drawer";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

function Header() {
    const { user, setUser } = useContext(AuthContext);
    const router = useRouter();

    const handleSignOut = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user_token');
        }
        setUser(null);
        router.push('/sign-in');
    };

    return (
        <div className='p-3 shadow-sm flex justify-between items-center dark:shadow-white/20'>
            <Link href="/ai-assistants">
                <Image src={'/logo.svg'} alt='img' height={50} width={50} className="rounded-xl" />
            </Link>

            <div className="flex items-center gap-4">
                <ModeToggle />
                <Button variant="destructive" onClick={handleSignOut} className="hidden lg:block">
                    Sign Out
                </Button>

                <div className="flex flex-col">
                    {user?.name && <p className="font-bold hidden lg:block">Welcome {user.name}</p>}

                    <Drawer>
                        <DrawerTrigger className={`ml-auto ${user?.orderId ? 'text-blue-400' : 'text-green-500'}`}>
                            {user?.orderId ? '👑 Pro Plan' : '🆓 Free Plan'}
                        </DrawerTrigger>
                        <DrawerContent className="flex items-center justify-center">
                            <DrawerHeader>
                                <DrawerTitle className="text-center text-4xl">Upgrade Plan?</DrawerTitle>
                                <DrawerDescription className="text-xl">
                                    Upgrade Plan To Enjoy Premium Services
                                </DrawerDescription>
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

                {/* ✅ Profile Modal using shadcn/ui Dialog */}
                {user?.picture && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Image
                                src={user.picture}
                                alt="User profile"
                                height={50}
                                width={50}
                                className="rounded-full cursor-pointer border border-gray-300"
                            />
                        </DialogTrigger>
                        <DialogContent className="text-center">
                            <DialogHeader>
                                <DialogTitle>User Profile</DialogTitle>
                            </DialogHeader>

                            {/* ✅ Use div instead of DialogDescription for custom structure */}
                            <div className="flex flex-col items-center gap-4 mt-4">
                                <Image
                                    src={user.picture}
                                    alt="User profile large"
                                    height={100}
                                    width={100}
                                    className="rounded-full"
                                />
                                <p className="text-lg font-semibold">{user.name}</p>
                            </div>
                            <Button variant="destructive" onClick={handleSignOut}>
                                Sign Out
                            </Button>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    );
}

export default Header;
