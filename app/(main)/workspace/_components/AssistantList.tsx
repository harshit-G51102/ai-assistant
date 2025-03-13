"use client";

import { BlurFade } from '@/components/magicui/blur-fade';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AssistantContext } from '@/context/AssistantContext';
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';

function AssistantList() {

    const {assistant,setAssistant,setPrompt}=useContext(AssistantContext);
    const { user } = useContext(AuthContext);
    const fetchAssistants = useQuery(api.userAiAssistants.getUserAssistants, user?._id ? { uid: user._id } : "skip");

    const [loading, setLoading] = useState(true);

    const setData=(assistant:any)=>{
        setAssistant(assistant)
        setPrompt(assistant.instruction)
    }

    useEffect(() => {
        if (fetchAssistants !== undefined) {
            setLoading(false); // Stops loading once data is available
            if (fetchAssistants.length > 0) {
                console.log("User's Assistants:", fetchAssistants);
            } else {
                console.log('No assistants found');
            }
        }
    }, [fetchAssistants]);

    return (
        <div className='p-5 bg-secondary border-r-2 h-screen overflow-scroll rounded-md overflow-x-hidden'>
            <p className='font-bold text-lg'>Your Personal Ai Assistant</p>
            <Button className='w-full mt-3'>Add New Assistant</Button>
            <Input className='w-full mt-2 bg-white text-black' placeholder='search' />

            {loading ? (
                <div className='flex justify-center mt-8'>
                    <Loader2Icon className='animate-spin text-4xl' />
                </div>

            ) : (
                <div>
                    {fetchAssistants?.map((assistant_, index) => (
                        <BlurFade key={assistant_.image} delay={0.25 + index * 0.05} inView>
                            <div
                                className={`hover:border p-3 rounded-xl hover:scale-105 transition-all ease-in-out cursor-pointer relative flex items-center gap-4 hover:bg-gray-200 dark:hover:bg-slate-700 ${assistant_?.id==assistant?.id && 'bg-slate-500'}`}
                                key={index}
                                onClick={()=>setData(assistant_)}
                            >
                                <Image
                                    src={assistant_.image}
                                    alt={assistant_.title}
                                    width={60}
                                    height={60}
                                    className='rounded-xl w-[60px] h-[60px] object-cover'
                                />
                                <div className='flex flex-col'>
                                    <p className='font-bold text-lg'>{assistant_.name}</p>
                                    <p className='text-gray-800 dark:text-gray-300'>{assistant_.title}</p>
                                </div>
                            </div>
                        </BlurFade>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AssistantList;
