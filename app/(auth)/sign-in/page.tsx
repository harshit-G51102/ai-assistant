"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { GetAuthUserData } from '@/services/GlobalApi';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

function SignIn() {
    const router = useRouter();
    const CreateUser = useMutation(api.users.CreateUser);
    const { user, setUser } = useContext(AuthContext);
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('user_token', tokenResponse.access_token);
                }
    
                const userInfo = await GetAuthUserData(tokenResponse.access_token);
                console.log('User Info:', userInfo);
    
                const result = await CreateUser({
                    name: userInfo?.name,
                    email: userInfo?.email,
                    picture: userInfo?.picture,
                });
    
                console.log('CreateUser result:', result);
    
                if (result) {
                    setUser(result);
                    console.log('User set successfully:', result);
                    console.log('Navigating to /ai-assistants');
                    router.push('/ai-assistants');
                } else {
                    console.warn('CreateUser result was null or undefined');
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        },
        onError: errorResponse => console.error('Google login error:', errorResponse),
    });
    
    return (
        <div className='flex items-center flex-col justify-center  h-screen'>
            <div className='flex gap-6 items-center flex-col justify-center border rounded-2xl shadow-2xl p-8'>
                <Image src={'/logo.svg'} alt='logo' width={200} height={100} className='rounded-xl'></Image>
                <h1 className='text-2xl'>Sign In To Ai Personal Assistant And Agent</h1>
                <Button onClick={() => googleLogin()}>Sign In With Gmail</Button>
            </div>
        </div>
    )
}

export default SignIn