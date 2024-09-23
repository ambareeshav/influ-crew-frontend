'use client'

import { useEffect, useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import LogoutButton from "@/components/LogoutButton"
import withAuth from "@/components/withAuth"
import API_URL from "../config/apiConfig"

function AuthorizePage() {
  const router = useRouter()
  const [authUrl, setAuthUrl] = useState('')
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [isPolling, setIsPolling] = useState(false)

  const checkAuthorization = useCallback(async () => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      try {
        const response = await axios.post(`${API_URL}/authorize`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const newAuthStatus = response.data.message.includes('already authenticated')
        setIsAuthorized(newAuthStatus)
        if (!newAuthStatus) {
          setAuthUrl(response.data.auth_url)
        }
        return newAuthStatus
      } catch (error) {
        console.error('Failed to check authorization:', error)
        return false
      }
    }
    return false
  }, [])

  useEffect(() => {
    checkAuthorization().then(setIsAuthorized)
  }, [])

  useEffect(() => {
    let pollingInterval: NodeJS.Timeout | null = null

    if (isPolling && !isAuthorized) {
      pollingInterval = setInterval(async () => {
        const authorized = await checkAuthorization()
        if (authorized) {
          setIsPolling(false)
          if (pollingInterval) clearInterval(pollingInterval)
        }
      }, 5000) // Poll every 5 seconds
    }

    return () => {
      if (pollingInterval) clearInterval(pollingInterval)
    }
  }, [isPolling, isAuthorized, checkAuthorization])

  const handleAuthorize = () => {
    if (authUrl) {
      window.open(authUrl, 'Authorize', 'width=600,height=600')
      setIsPolling(true)
    }
  }

  const handleBackToCrews = () => {
    router.push('/crews')
  }

  if (isAuthorized === null) {
    return <div className="flex justify-center items-center min-h-screen bg-white text-black">Checking Auth status...</div>
  }

  return (
    <div className="flex min-h-screen bg-white text-black">
      <Button onClick={handleBackToCrews} className="absolute top-4 left-4">Back to Crews</Button>
      <LogoutButton />
      <div className="container mx-auto mt-8">
        <Card className="w-[400px] mx-auto">
          <CardHeader>
            <CardTitle>Authorize Google Sheets</CardTitle>
          </CardHeader>
          <CardContent>
            {isAuthorized ? (
              <p>You are authorized with Google Sheets</p>
            ) : (
              <>
                <Button onClick={handleAuthorize} disabled={isPolling}>
                  {isPolling ? 'Authorizing...' : 'Authorize'}
                </Button>
                {isPolling && <p className="mt-2">Waiting for authorization...</p>}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const AuthorizePageWithAuth = withAuth(AuthorizePage)

export default AuthorizePageWithAuth