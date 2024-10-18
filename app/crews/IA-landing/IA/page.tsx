'use client'

import { useState} from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Search, Users, ChevronDown, ChevronUp } from "lucide-react"
import Link from 'next/link'
import API_URL from "../../../config/apiConfig"
import LogoutButton from "@/components/LogoutButton"
import withAuth from "@/components/withAuth"
import axios from 'axios'
import { motion } from 'framer-motion'

const AnalyzePage = () => {
  const [keyword, setKeyword] = useState('')
  const [channels, setChannels] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
/*const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [isAssistant, setIsAssistant] = useState<boolean | null>(null) */
  const [isAuthorized, setIsAuthorized] = useState(true)
  const [isAssistant] = useState(true)
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  const router = useRouter()

 /*  const checkAuthorization = async () => {
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

  const checkAssistant = async () => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      try {
        const response = await axios.post(`${API_URL}/assistantCheck`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        return response.data.message.includes('Exists')
      } catch (error) {
        console.error('Failed to check assistant:', error)
        return false
      }
    }
    return false
  }

  useEffect(() => {
    checkAuthorization().then(setIsAuthorized)
    checkAssistant().then(setIsAssistant)
  }, [])
 */
  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthorized) {
      router.push('/authorize')
      return
    }
    if (!isAssistant) {
      router.push('/assistant')
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  if (isAuthorized === null || isAssistant === null) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-2xl font-semibold text-[#1e0e4b]"
        >
          Loading...
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 font-sans">
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 md:p-6 bg-white shadow-sm z-10">
        <Link href="/" passHref>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <h1 className="text-2xl font-bold text-primary">Demo</h1>
          </motion.div>
        </Link>
        <nav className="space-x-4">
          <Button onClick={() => router.push('/crews')} variant="outline" className="hover:bg-primary hover:text-white">Back to crews</Button>
          <Button onClick={() => router.push('/authorize')} variant="outline" className="hover:bg-primary hover:text-white">Authorize</Button>
          <Button onClick={() => router.push('/assistant')} variant="outline" className="hover:bg-primary hover:text-white">Assistant</Button>
          <Link href="/login">
              <LogoutButton/>
           
          </Link>
        </nav>
      </header>

      <main className="pt-24 md:pt-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-[#1e0e4b] mb-4">Unlock YouTube Insights</h2>
            <p className="text-xl text-gray-600">Analyze the top YouTube creators in your industry in seconds. Get detailed insights instantly.</p>
          </div>

          {!isAuthorized && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authorization Required</AlertTitle>
              <AlertDescription>
                Please authorize with Google Sheets before analyzing.
                <Button onClick={() => router.push('/authorize')} className="mt-2 w-full bg-[#1e0e4b] hover:bg-[#1e0e4b]/90 text-white">
                  Go to Authorization Page
                </Button>
              </AlertDescription>
            </Alert>
          )}
          {!isAssistant && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Assistant Required</AlertTitle>
              <AlertDescription>
                Please create a personalized assistant before analyzing.
                <Button onClick={() => router.push('/assistant')} className="mt-2 w-full bg-[#1e0e4b] hover:bg-[#1e0e4b]/90 text-white">
                  Go to assistant
                </Button>
              </AlertDescription>
            </Alert>
          )}
          <Card className="w-full shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-[#1e0e4b]">Analyze Influencers</CardTitle>
              <CardDescription>Fill in the details below to start your analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAnalyze} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="keyword" className="text-lg font-medium text-gray-700">Keyword</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="keyword"
                      placeholder="e.g., Tech Reviews"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e0e4b] focus:border-transparent"
                    />
                  </div>
                  <p className="text-sm text-gray-500">Enter the main topic or niche you want to analyze</p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="channels" className="text-lg font-medium text-gray-700">Number of Channels</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="channels"
                      placeholder="e.g., 10 channels"
                      type="number"
                      value={channels}
                      onChange={(e) => setChannels(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e0e4b] focus:border-transparent"
                    />
                  </div>
                  <p className="text-sm text-gray-500">Specify how many top channels you want to analyze</p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#1e0e4b] to-[#4a3b6b] hover:from-[#4a3b6b] hover:to-[#1e0e4b] text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                  disabled={loading || !isAuthorized || !isAssistant}
                >
                  {loading ? 'Creating a google sheet...' : 'Start Analysis'}
                </Button>
              </form>
            </CardContent>
          </Card>
          {result && (
            <Card className="w-full mt-8 shadow-lg">
              <CardContent className="flex justify-center p-6">
                <Button 
                  type="button" 
                  disabled={loading}
                  className="bg-gradient-to-r from-[#1e0e4b] to-[#4a3b6b] hover:from-[#4a3b6b] hover:to-[#1e0e4b] text-white font-semibold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                >
                  <a href={result} target="_blank" rel="noopener noreferrer" className="text-white no-underline">
                    View Analysis Results
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
          <div className="mt-8">
            <Button
              onClick={() => setShowHowItWorks(!showHowItWorks)}
              className=""
            >
              {showHowItWorks ? <ChevronUp className="" /> : <ChevronDown className="" />}
              <span>How It Works</span>
            </Button>
            {showHowItWorks && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-gray-100 rounded-md"
              >
                <ol className="list-decimal list-inside space-y-2">
                  <li>Enter your target keyword and the number of channels to analyze.</li>
                  <li>Our system searches for the top YouTube channels in your specified niche.</li>
                  <li>We analyze each channels content, audience demographics, and performance metrics.</li>
                  <li>The channels metrics are evaluated against your custom assistant profile.</li>
                  <li>Access your results instantly through Google Sheets as our crew analyzes channels.</li>
                </ol>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default withAuth(AnalyzePage)