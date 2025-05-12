"use client";

import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Loader, Wallet } from "lucide-react";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

function Header() {
    const { user, setUser } = useContext(AuthContext);
    const router = useRouter();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const updateUserOrder=useMutation(api.users.UpdateTokens);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("✅ Razorpay script loaded");
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSignOut = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user_token');
        }
        setUser(null);
        router.push('/sign-in');
    };

    const makePayment = (subscriptionId: string) => {
        const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY;
        if (!razorpayKey) {
            console.error("Razorpay key is missing");
            return;
        }
        let options = {
            key: razorpayKey,
            subscription_id: subscriptionId,
            name: "Harshit's AI Assistant App",
            description: "",
            logo: '/logo.svg',
            handler: async function (resp: any) {
                console.log(resp.razorpay_payment_id)
                console.log(resp);
                if(resp?.razorpay_payment_id){
                    await updateUserOrder({
                        uid:user?._id,
                        orderId:resp.razorpay_payment_id,
                        credits:user.credits+5000000
                    })
                    toast("payment successful");
                }
            },
            "prefill": {
                user: user?.name,
                email: user?.email
            },
            notes: {
                note: "This is a test payment. Use Razorpay test cards only.",
            },
            theme: {
                color: '#000000'
            },
        };

        //@ts-ignore
        const rjp = new window.Razorpay(options);
        rjp.open();
    }

    const generateSubscriptionId = async () => {
        setLoading(true);
        const result = await axios.post('/create-subscription');
        console.log(result.data);
        makePayment(result?.data?.id);
        setLoading(false);
    }

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

                    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
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
                                <Button className="h-10 w-60" onClick={generateSubscriptionId}>{loading ? <Loader className="animate-spin"></Loader> : <Wallet></Wallet>}Upgrade 10$</Button>
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
                            <hr className="my-3"></hr>
                            <div className="flex flex-col gap-2">
                                <h2 className="font-bold ">Token Usage</h2>
                                <h2>0/{user?.credits}</h2>
                                <Progress value={33}></Progress>
                                <h2 className="flex justify-between font-bold">Current Plan <span className="p-1 bg-gray-100 rounded-md text-gray-700 font-normal">{!user?.orderId ? " free plan" : " pro plan"}</span></h2>
                            </div>
                            <div className="p-4 border rounded-xl">
                                <div className="flex justify-between">
                                    <div>
                                        <h2 className="font-bold text-lg">Pro Plan</h2>
                                        <h2 >500,000 Tokens</h2>
                                    </div>
                                    <h2 className="font-bold text-lg">10$/Month</h2>
                                </div>
                                <hr className="my-3"></hr>
                                <Button onClick={() => { setDrawerOpen(true) }} className="w-full"><Wallet></Wallet> Upgrade</Button>
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
