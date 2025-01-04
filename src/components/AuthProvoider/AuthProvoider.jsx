"use client"
import { SessionProvider } from "next-auth/react";

const AuthProvoider = ({children}) => {
  return (
   <SessionProvider>{children}</SessionProvider>
  )
}

export default AuthProvoider