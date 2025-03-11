import React from 'react'
import AssistantList from './_components/AssistantList'
import AssistantSettings from './_components/Settings'
import ChatUi from './_components/ChatUi'

function Workspace() {
  return (
    <div className='h-screen fixed w-full overflow-scroll overflow-x-hidden'>
        <div className=' grid grid-cols-5 '>
            <div className='lg:col-span-1 col-span-2'>
               <AssistantList></AssistantList>
            </div>
            <div className='col-span-3'>
                <ChatUi></ChatUi>
            </div>
            <div className='overflow-x-hidden w-screen h-[40vh] lg:h-screen'>
                <AssistantSettings></AssistantSettings>
            </div>
        </div>
    </div>
  )
}

export default Workspace