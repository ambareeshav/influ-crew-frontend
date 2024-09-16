'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import axios from 'axios'

export default function AuthorizePage() {
  const [authUrl, setAuthUrl] = useState('')

  useEffect(() => {
    const fetchAuthUrl = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const response = await axios.post('http://localhost:8000/authorize', {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setAuthUrl(response.data.auth_url)
      } catch (error) {
        console.error('Failed to fetch auth URL:', error)
      }
    }

    fetchAuthUrl()
  }, [])

  const handleAuthorize = () => {
    if (authUrl) {
      window.open(authUrl, 'Authorize', 'width=600,height=600')
    }
  }

  return (
    <div className="flex min-h-screen bg-white text-black">
    <div className="container mx-auto mt-8">
      <Card className="w-[400px] mx-auto">
        <CardHeader>
          <CardTitle>Authorize Google Sheets</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleAuthorize} disabled={!authUrl}>
            Authorize
          </Button>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}