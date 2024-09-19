'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import axios from 'axios'
import { useRouter } from 'next/navigation' // {{ edit_1 }}
import LogoutButton from "@/components/LogoutButton"
import withAuth from "@/components/withAuth"

const AuthorizePage = () => {
const router = useRouter() // {{ edit_2 }}
const [authUrl, setAuthUrl] = useState('')
const [isAuthorized, setIsAuthorized] = useState(false)

useEffect(() => {
  const checkAuthorization = async () => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/authorize', {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setIsAuthorized(response.data.message.includes('already authenticated'))
        if (!response.data.message.includes('already authenticated')) {
          setAuthUrl(response.data.auth_url) // Only set authUrl if not authorized
        }
      } catch (error) {
        console.error('Failed to check authorization:', error)
      }
    }
  }

  // Only call checkAuthorization if there's a token
  const token = localStorage.getItem('accessToken')
  if (token) {
    checkAuthorization()
  }
}, [])

const handleAuthorize = () => {
  if (authUrl) {
    window.open(authUrl, 'Authorize', 'width=600,height=600')
    startPolling() // {{ edit_2 }}
  }
}

const startPolling = () => { // {{ edit_3 }}
  const id = setInterval(async () => {
    const token = localStorage.getItem('accessToken')
    const response = await axios.post('https://influ-crew-backend-production.up.railway.app/crews', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setIsAuthorized(response.data.message.includes('already authenticated'))
    if (response.data.message.includes('already authenticated')) {
      clearInterval(id) // Stop polling once authorized
      router.push('/crews') // Redirect to /crews after authorization
    }
  }, 5000) // Check every 5 seconds
  // setIntervalId(id) // Store interval ID
}

const handleBackToCrews = () => { // {{ edit_2 }}
  router.push('/crews')
}

return (
  <div className="flex min-h-screen bg-white text-black">
    <Button onClick={handleBackToCrews} className="absolute top-4 left-4">Back to Crews</Button> {/* {{ edit_3 }} */}
    <LogoutButton />
    <div className="container mx-auto mt-8">
      <Card className="w-[400px] mx-auto">
        <CardHeader>
          <CardTitle>Authorize Google Sheets</CardTitle>
        </CardHeader>
        <CardContent>
          {isAuthorized ? (
            <p>You are already authorized with Google Sheets</p>
          ) : (
            <Button onClick={handleAuthorize}>
              Authorize
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  </div>
)
}

export const AuthourizePageWithAuth = withAuth(AuthorizePage) // Wrap the component with the HOC

// Default export for the page
export default AuthourizePageWithAuth