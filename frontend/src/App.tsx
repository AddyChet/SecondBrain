import React, { useEffect } from 'react'
import Dashboard from './components/pages/Dashboard'
import Signup from './components/pages/Signup'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Signin from './components/pages/Signin'
import { Toaster } from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { useAuthStore } from './store/useAuthStore'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth} = useAuthStore();
  useEffect(()=> {
    checkAuth();
  }, [checkAuth])
  
  console.log(authUser)
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <BrowserRouter>
    <Toaster />
      <Routes>
        <Route path='/dashboard' element={authUser ? <Dashboard/> : <Navigate to={"/login"}/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Signin />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App