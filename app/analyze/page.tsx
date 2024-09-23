'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import API_URL from "../config/apiConfig"
import LogoutButton from "@/components/LogoutButton"
import withAuth from "@/components/withAuth"
import axios from 'axios'

const AnalyzePage = () => {
  const [keyword, setKeyword] = useState('')
  const [channels, setChannels] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const router = useRouter()

  const checkAuthorization = async () => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      try {
        const response = await axios.post(`${API_URL}/authorize`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        return response.data.message.includes('already authenticated')
      } catch (error) {
        console.error('Failed to check authorization:', error)
        return false
      }
    }
    return false
  }

  useEffect(() => {
    checkAuthorization().then(setIsAuthorized)
  }, [])

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthorized) {
      router.push('/authorize')
      return
    }
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.post(`${API_URL}/analyze`, {
        keyword,
        channels: parseInt(channels)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setResult(response.data.message)
    } catch (error) {
      console.error('Analysis failed:', error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setIsAuthorized(false)
        router.push('/authorize')
      }
    } finally {
      setLoading(false)
    }
  }

  if (isAuthorized === null) {
    return <div className="flex justify-center items-center min-h-screen bg-white text-black">Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-white text-black">
      <Button onClick={() => router.push('/crews')} className="absolute top-4 left-4">Back to Crews</Button>
      <LogoutButton />
      <div className="container mx-auto mt-8">
        {!isAuthorized && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authorization Required</AlertTitle>
            <AlertDescription>
              Please authorize with Google Sheets before analyzing.
              <Button onClick={() => router.push('/authorize')} className="mt-2 w-full">
                Go to Authorization Page
              </Button>
            </AlertDescription>
          </Alert>
        )}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Analyze Influencers</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAnalyze}>
              <div className="grid w-full items-center gap-4">
                <Input
                  id="keyword"
                  placeholder="Keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <Input
                  id="channels"
                  placeholder="Number of Channels"
                  type="number"
                  value={channels}
                  onChange={(e) => setChannels(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full mt-4" disabled={loading || !isAuthorized}>
                {loading ? 'Analyzing...' : result ? 'Analyzed!' : 'Analyze'}
              </Button>
            </form>
          </CardContent>
        </Card>
        {result && (
          <Card className="w-full max-w-md mx-auto mt-8">
            <CardContent className="flex justify-center">
              <Button type="button" disabled={loading}>
                <a href={result} target="_blank" rel="noopener noreferrer" className="text-primary-foreground no-underline">Evaluation</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default withAuth(AnalyzePage)