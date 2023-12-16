import React from 'react'
import { GlobalProvider } from './src/Hooks/GloblaContext'
import MainStack from './src/navigation/Mainstack'

export default function App() {
  return (
    <GlobalProvider> 
     <MainStack/>
    </GlobalProvider>
  )
}