'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import API_URL from "../config/apiConfig"
import LogoutButton from "@/components/LogoutButton"
import withAuth from "@/components/withAuth" // Import the HOC
import axios from 'axios'

const AnalyzePage = () => {
  const [keyword, setKeyword] = useState('')
  const [channels, setChannels] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false) // {{ edit_1 }}
  const [showAuthMessage, setShowAuthMessage] = useState(false) // {{ edit_1 }}
  const router = useRouter()

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('accessToken') // {{ edit_2 }}
    if (!token) { // {{ edit_3 }}
      setShowAuthMessage(true) // Show authorization message
      return; // Exit the function
    }
    setLoading(true) // {{ edit_4 }}
    try {
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
        router.push('/authorize')
      }
    } finally {
      setLoading(false) // {{ edit_5 }}
    }
  }

  const handleBackToCrews = () => { // {{ edit_2 }}
    router.push('/crews')
  }

  return (
    <div className="flex min-h-screen bg-white text-black">
      {showAuthMessage && ( // {{ edit_6 }}
        <div className="alert alert-warning">
          Please authorize first to proceed.
        </div>
      )}
      <Button onClick={handleBackToCrews} className="absolute top-4 left-4">Back to Crews</Button>
      <LogoutButton />
      <div className="container mx-auto mt-8">
        <Card className="w-[400px] mx-auto">
          <CardHeader>
            <CardTitle>Analyze Influencers</CardTitle>
          </CardHeader>
          <form onSubmit={handleAnalyze}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="keyword"
                    placeholder="Keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="channels"
                    placeholder="Number of Channels"
                    type="number"
                    value={channels}
                    onChange={(e) => setChannels(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading}>
                {loading ? 'Analyzing...' : result ? 'Analyzed!' : 'Analyze'} {/* {{ edit_3 }} */}
              </Button>
            </CardFooter>
          </form>
        </Card>
        {result && (
          <Card className="w-[100px] h-[10px] mx-auto mt-8">
            <CardContent className="flex justify-center">
              <Button type="submit" disabled={loading}>
                <a href={result} target="_blank" rel="noopener noreferrer">Evaluation</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// Wrap the component with the HOC
const AnalyzePageWithAuth = withAuth(AnalyzePage)

// Default export for the page
export default AnalyzePageWithAuth