"use client";

import { SparklesText } from '@/components/magicui/sparkles-text';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AssistantContext } from '@/context/AssistantContext';
import React, { useContext, useState } from 'react';

function ChatUi() {
    const { assistant } = useContext(AssistantContext);
    const [query,setQuery]=useState("");
    return (
        <div className='mt-20 p-6 flex flex-col items-center justify-center'>
            <SparklesText text="How Can I Assist You?" />
            <div className='mt-8'>
                {assistant && assistant.sampleQuestions && (
                    assistant.sampleQuestions.map((ques: string, index: number) => (
                        <p key={index} onClick={()=>setQuery(ques)} className='cursor-pointer'>{ques}</p>
                    ))
                )}
            </div>
            <div className='flex mt-40 w-full'><Textarea placeholder='add instructuins' className=' border-2 dark:border-white' value={query}></Textarea>
            <Button>Submit</Button>
            </div>
        </div>
    );
}

export default ChatUi;
