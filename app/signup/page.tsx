'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import axios from 'axios' 
import API_URL from "../config/apiConfig"// Import the API URL

export default function SignupPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')  // New state for error messages
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')  // Reset error message
    try {
      await axios.post(`${API_URL}/signup`, { username, email, password })  // Use the centralized API URL
      router.push('/login')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.detail)  // Set error message from response
      } else {
        console.error('Signup failed:', error)
      }
    }
  }

  const tologin = () => { // {{ edit_2 }}
    router.push('/login')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-black">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}  {/* Display error message */}
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" className = "hover:bg-primary/90 text-white font-bold rounded-full">Sign Up</Button>
            <Button onClick={tologin} className="hover:bg-primary/90 text-white font-bold rounded-full ">Already have an account?</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}