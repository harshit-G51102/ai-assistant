"use client";


import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useRouter } from 'next/navigation';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';
import { AssistantContext } from '@/context/AssistantContext';

function MainProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [assistant,setAssistant]=useState();
    const convex=useConvex()
      const router=useRouter();
      const {user,setUser}=useContext(AuthContext);
      const CheckUseAuth=async()=>{
          const token=localStorage.getItem('user_token');
          const user=token&&await GetAuthUserData(token)
          if(!user){
              router.push('/sign-in');
              return;
            }
            try{
              const result=await convex.query(api.users.GetUserInfo,{
                email:user?.email
              });
              console.log(result);
              setUser(result);
            }catch(e){
    
            }
        }
        useEffect(()=>{
            CheckUseAuth();
        },[]);
        if (!user) {
          return null; 
        }
  return (
    <div><AssistantContext.Provider value={{assistant,setAssistant}}>
      <Header></Header>{children}
    </AssistantContext.Provider>
    </div>
  )
}

export default MainProvider