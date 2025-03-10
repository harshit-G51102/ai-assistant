"use client";


import React, { useContext, useEffect } from 'react'
import Header from './_components/Header';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useRouter } from 'next/navigation';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';

function MainProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
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
  return (
    <div><Header></Header>{children}</div>
  )
}

export default MainProvider