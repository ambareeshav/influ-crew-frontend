'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import axios from 'axios'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')  // New state for error message
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')  // Reset error message on new login attempt
    try {
      const response = await axios.post('http://localhost:8000/login', { email, password })
      localStorage.setItem('accessToken', response.data.access_token)
      router.push('/crews')
    } catch (error) {
      // Check if error response exists and set the error message
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.detail || 'Incorrent email or password')  // Update error message
      } else {
        setErrorMessage('Login failed. Please try again.')  // Fallback error message
      }
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
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
              {errorMessage && (  // Display error message if it exists
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}