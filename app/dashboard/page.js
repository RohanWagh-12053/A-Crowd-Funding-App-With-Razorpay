"use client";
import React,{useEffect} from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import UserForm from '../components/Dashboardform';

const Dashboard = () => {

  const { data: session,update } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push("/login"); // ✅ Redirect inside useEffect
    }
  }, [session, router]); // ✅ Dependencies added
  

  return (
    <>
    
     <UserForm/>

    </>
  )
}

export default Dashboard
