import React from 'react'
import MainProvider from './provider';

function WorkspaceLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
        <MainProvider>
        {children}
        </MainProvider>
    </div>
  )
}

export default WorkspaceLayout