'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import axios from 'axios'

export default function AnalyzePage() {
  const [keyword, setKeyword] = useState('')
  const [channels, setChannels] = useState('')
  const [result, setResult] = useState('')
  const router = useRouter()

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.post('http://127.0.0.1:8000/analyze', 
        { keyword, channels: parseInt(channels) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setResult(response.data.message)
    } catch (error) {
      console.error('Analysis failed:', error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        router.push('/authorize')
      }
    }
  }

  return (
    <div className="flex min-h-screen bg-white text-black">
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
            <Button type="submit">Analyze</Button>
          </CardFooter>
        </form>
      </Card>
      {result && (
        <Card className="w-[400px] mx-auto mt-4">
          <CardContent>
            <p>{result}</p>
          </CardContent>
        </Card>
      )}
    </div>
    </div>
  )
}