"use client";

import { SparklesText } from '@/components/magicui/sparkles-text';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AssistantContext } from '@/context/AssistantContext';
import React, { useContext, useEffect, useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import AssistantList from './AssistantList';
import AssistantSettings from './Settings';


function ChatUi() {
    const { assistant } = useContext(AssistantContext);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setQuery("");
    }, [assistant]);

    return (
        <div className='flex flex-col h-screen pb-20'>
            <div className='flex items-center justify-between lg:hidden p-8'>
                <Sheet>
                    <SheetTrigger className='border-2 rounded-xl p-2'>Select Assistant</SheetTrigger>
                    <SheetContent side='left'>
                        <SheetHeader>
                            <SheetTitle>Select Assistant</SheetTitle>
                            <SheetDescription>
                                <AssistantList></AssistantList>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                <Sheet>
                    <SheetTrigger className='border-2 rounded-xl p-2'>Assistant Settings</SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Assistant Settings</SheetTitle>
                            <SheetDescription>
                                <AssistantSettings></AssistantSettings>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
            <div className='mt-20 flex flex-col items-center'>
                <SparklesText text="How Can I Assist You?" />
                <div className='mt-8'>
                    {assistant?.sampleQuestions?.map((ques: string, index: number) => (
                        <p key={index} onClick={() => setQuery(ques)} className='cursor-pointer'>{ques}</p>
                    ))}
                </div>
            </div>

            {/* Textarea at the bottom */}
            <div className='mt-auto flex items-center w-full gap-4 border-t p-4'>
                <Textarea
                    placeholder='Add instructions...'
                    className='border-2 dark:border-white flex-1'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button>Submit</Button>
            </div>
        </div>
    );
}

export default ChatUi;
