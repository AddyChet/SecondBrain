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
        {/* adding replace makes sure that the back button isnt visible for better UX */}
        <Route path="/" element={<Navigate to="/login" replace/>} />
        <Route path='/dashboard' element={authUser ? <Dashboard/> : <Navigate to={"/login"}/>}/>
        <Route path="/login" element={authUser ? <Navigate to="/dashboard" /> : <Signin />} />
        <Route path="/signup" element={authUser ? <Navigate to="/dashboard" /> : <Signup />} />

      </Routes>
    </BrowserRouter>

  )
}

export default App