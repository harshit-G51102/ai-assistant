"use client";

import { SparklesText } from '@/components/magicui/sparkles-text';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AssistantContext } from '@/context/AssistantContext';
import React, { useContext, useEffect, useState } from 'react';



function ChatUi() {
    const { assistant,prompt } = useContext(AssistantContext);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setQuery("");
    }, [assistant]);

    const handleSubmit=()=>{
        console.log('query',query);
        console.log('prompt',prompt);
    }

    return (
        <div className='flex flex-col h-screen pb-[20vh] md:pb-[15vh]'>
            <div className='flex flex-col items-center'>
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
                    className='border-2 dark:border-white flex-1 resize-none max-h-80 overflow-y-auto'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    );
}

export default ChatUi;
