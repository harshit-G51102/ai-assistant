"use client";


import { BlurFade } from '@/components/magicui/blur-fade';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { Checkbox } from '@/components/ui/checkbox';
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';
import AiAssistantsList from '@/services/AiAssistantsList';
import { useMutation, useQuery } from 'convex/react';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

export type ASSISTANT = {
  id: number;
  name: string;
  title: string;
  image: string;
  instruction: string;
  userInstruction: string;
  sampleQuestions: string[];
};

function AiAssistants() {
  const { user } = useContext(AuthContext);
  const [selectedAssistant, setSelectedAssistant] = useState<ASSISTANT[]>([]); // ✅ Fixed typing
  const insertAssistant = useMutation(api.userAiAssistants.insertSelectedAssistants);
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  
  const onSelect = (assistant: ASSISTANT) => {
    const item = selectedAssistant.find((item) => item.id === assistant.id);
    if (item) {
      setSelectedAssistant(selectedAssistant.filter((item) => item.id !== assistant.id));
      return;
    }
    setSelectedAssistant((prev) => [...prev, assistant]);
  };

  const isAssistantSelected = (assistant: ASSISTANT) => {
    const item = selectedAssistant.find((item) => item.id === assistant.id);
    return item ? true : false;
  }

  const onClickContinue = async () => {
    console.log('Selected assistants:', selectedAssistant);
    console.log('User:', user);
    
    if (!user || !user._id) { 
      console.error("User or user._id is undefined", user);
      return;
    }
  
    if (selectedAssistant.length === 0) {
      console.warn("No assistants selected!");
      return;
    }
  
    setLoading(true);
    try {
      const result = await insertAssistant({
        records: selectedAssistant,
        uid: user._id
      });
      console.log('Insert result:', result);
    } catch (error) {
      console.error('Error inserting assistants:', error);
    }
    setLoading(false);
    router.push('/workspace'); // 🚀 Navigate to workspace
  };


  const fetchAssistants=useQuery(api.userAiAssistants.getUserAssistants, user?._id ? { uid: user._id } : "skip")
  useEffect(() => {
    if (fetchAssistants && fetchAssistants.length > 0) {
      console.log("User's Assistants:", fetchAssistants);
    }
    else{
      console.log('no assistants found');
    }
  }, [fetchAssistants,router]);


  return (
    <div className='px-10 mt-20 md:px-20 lg:px-36 xl:px-48'>
      <div className='flex justify-between items-center'>
        <div>
          <BlurFade delay={0.25 + 0.05}>
            <h1 className='text-3xl '>Welcome To The World Of AI Assistants 🤖</h1>
          </BlurFade>
          <BlurFade delay={0.5 + 0.05}>
            <p className='text-xl mt-2'>Choose Your Ai Companion To Simplify Your Task 🚀</p>
          </BlurFade>
        </div>
        {loading ? <Loader2Icon className=' animate-spin '></Loader2Icon> : <InteractiveHoverButton disabled={selectedAssistant.length === 0 || loading} onClick={onClickContinue}>Continue</InteractiveHoverButton>
        }
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>
        {AiAssistantsList.map((assistant, index) => (
          <BlurFade key={assistant.image} delay={0.25 + index * 0.05} inView>
            <div
              className='hover:border p-1 rounded-xl hover:scale-105 transition-all ease-in-out cursor-pointer relative'
              key={index}
              onClick={() => onSelect(assistant)}
            >
              <Checkbox
                className={`absolute border-2 border-black m-2 `}
                checked={isAssistantSelected(assistant)} />
              <Image
                src={assistant.image}
                alt={assistant.title}
                width={600}
                height={600}
                className='rounded-xl w-full h-[180px] object-cover'
              />
              <h1 className='text-center font-bold text-lg'>{assistant.name}</h1>
              <h1 className='text-center text-gray-800 dark:text-gray-300'>{assistant.title}</h1>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export default AiAssistants;
