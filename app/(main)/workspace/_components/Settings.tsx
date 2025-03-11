"use client";

import { AssistantContext } from '@/context/AssistantContext';
import React, { useContext } from 'react';
import Image from 'next/image';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import AiModelOptions from '@/services/AiModelOptions';


function AssistantSettings() {
    const { assistant } = useContext(AssistantContext);

    // Handle case when no assistant is selected
    if (!assistant) {
        return (
            <div className="text-center text-gray-500">
                No assistant selected
            </div>
        );
    }

    return (
        <div className='bg-secondary lg:h-screen border-r-2 p-5 rounded-md h-[25vh] '>
            <h2 className='font-bold text-lg'>Settings</h2>
            <div
                className={` p-3 rounded-xl hover:scale-105 transition-all ease-in-out flex items-center gap-4 bg-secondary`}
            >
                <Image
                    src={assistant.image}
                    alt={assistant.title}
                    width={60}
                    height={60}
                    className='rounded-xl w-[60px] h-[60px] object-cover'
                />
                <div className='flex flex-col'>
                    <h1 className='font-bold text-lg'>{assistant.name}</h1>
                    <h1 className='text-gray-800 dark:text-gray-300'>{assistant.title}</h1>
                </div>
            </div>
            <div className='mt-4'>
                <h3>Model</h3>
                <Select>
                    <SelectTrigger className="w-[180px] border-2 border-white">
                        <SelectValue placeholder="Select AI Models" />
                    </SelectTrigger>
                    <SelectContent>
                        {AiModelOptions.map((model,index)=>(
                            <SelectItem value={model.name} key={index}><Image src={model.logo} alt={model.name} width={24} height={24}></Image>{model.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default AssistantSettings;
