"use client";

import { SparklesText } from '@/components/magicui/sparkles-text';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AssistantContext } from '@/context/AssistantContext';
import React, { useContext, useEffect, useState } from 'react';

function ChatUi() {
    const { assistant, prompt } = useContext(AssistantContext);
    const [query, setQuery] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);
    const [conversationHistory, setConversationHistory] = useState("");

    useEffect(() => {
        setQuery("");
        setReply("");
        setConversationHistory("");
    }, [assistant]);

    const handleSubmit = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setReply("");

        const fullMessage = conversationHistory + "\nUser: " + query + "\nAssistant:";

        try {
            const res = await fetch("/chats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: prompt + fullMessage }),
            });

            const data = await res.json();
            if (res.ok) {
                setReply(data.reply);
                setConversationHistory(prev => prev + "\nUser: " + query + "\nAssistant: " + data.reply + "\n");
            } else {
                setReply("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setReply("An error occurred while fetching the response.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col h-screen pb-[20vh] md:pb-[15vh] px-4'>
            <div className='flex flex-col items-center'>
                <SparklesText text="How Can I Assist You?" />
                <div className='mt-8 space-y-2 text-center'>
                    {!reply && assistant?.sampleQuestions?.map((ques: string, index: number) => (
                        <p
                            key={index}
                            onClick={() => setQuery(ques)}
                            className='cursor-pointer hover:font-bold border-1 border-black dark:border-white text-left rounded-4xl p-1'
                        >
                            {ques}
                        </p>
                    ))}
                </div>
            </div>

            {loading && (
                <div className='mt-6 text-center text-gray-500 italic'>Generating response...</div>
            )}
            {reply && (
                <div className='mt-6 p-4 border rounded-md w-full max-w-3xl mx-auto bg-muted text-muted-foreground whitespace-pre-wrap overflow-auto max-h-96'>
                    {reply}
                </div>
            )}

            <div className='mt-auto flex items-center w-full gap-4 border-t p-4'>
                <Textarea
                    placeholder='Add instructions...'
                    className='border-2 dark:border-white flex-1 resize-none max-h-80 overflow-y-auto'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </div>
    );
}

export default ChatUi;
