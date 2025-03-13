import React from 'react'
import AssistantList from './_components/AssistantList'
import AssistantSettings from './_components/Settings'
import ChatUi from './_components/ChatUi'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


function Workspace() {
  return (
    <div className='h-screen fixed w-full overflow-scroll overflow-x-hidden'>
        <div className='flex items-center justify-between lg:hidden p-8'>
          <Sheet>
            <SheetTrigger className='border-2 rounded-xl p-2'>Select Assistant</SheetTrigger>
            <SheetContent side='left'>
              <SheetHeader>
                <SheetTitle>Select Assistant</SheetTitle>
                  <AssistantList></AssistantList>
                
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger className='border-2 rounded-xl p-2'>Assistant Settings</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Assistant Settings</SheetTitle>
                  <AssistantSettings ></AssistantSettings>
                
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      <div className=' grid grid-cols-5 '>
        <div className='hidden lg:block'>
          <AssistantList></AssistantList>
        </div>
        <div className=' col-span-5 lg:col-span-3'>
          <ChatUi></ChatUi>
        </div>
        <div className='hidden lg:block'>
          <AssistantSettings></AssistantSettings>
        </div>
      </div>
    </div>
  )
}

export default Workspace