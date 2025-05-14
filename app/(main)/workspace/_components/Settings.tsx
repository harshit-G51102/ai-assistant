"use client";

import { AssistantContext } from '@/context/AssistantContext';
import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import AiModelOptions from '@/services/AiModelOptions';
import { Textarea } from '@/components/ui/textarea';

function AssistantSettings() {
    const { assistant,prompt,setPrompt } = useContext(AssistantContext);
    // Handle case when no assistant is selected
    if (!assistant) {
        return (
            <div className="text-center text-gray-500">
                No assistant selected
            </div>
        );
    }

    return (
        <div className='bg-secondary lg:h-full border-r-2 p-5 rounded-md pb-40'>
            <p className='font-bold text-lg'>Settings</p>
            <div
                className={`p-3 rounded-xl hover:scale-105 transition-all ease-in-out flex items-center gap-4 bg-secondary`}
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
                <p>Model</p>
                <Select defaultValue={AiModelOptions[0].name}>
                    <SelectTrigger className="w-[180px] border-2 dark:border-white">
                        <SelectValue placeholder="Select AI Models" />
                    </SelectTrigger>
                    <SelectContent>
                        {AiModelOptions.map((model, index) => (
                            <SelectItem value={model.name} key={index}>
                                <Image src={model.logo} alt={model.name} width={24} height={24} />
                                {model.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <p>Instructions</p>
                <Textarea
                    placeholder='Add instructions'
                    className='min-h-[180px] w-[230px] border-2 dark:border-white'
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
            </div>
        </div>
    );
}

export default AssistantSettings;
