'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2, ArrowLeft } from "lucide-react"
import API_URL from "../config/apiConfig"
import LogoutButton from "@/components/LogoutButton"
/* import withAuth from "@/components/withAuth" */
import axios from 'axios'
import { motion } from 'framer-motion'

const AssistantPage = () => {
  const [name, setKeyword] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  /* const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [isAssistant, setIsAssistant] = useState<boolean | null>(null) */
  const [isAuthorized, setIsAuthorized] = useState(true)
  const [isAssistant] = useState(false)
  const router = useRouter()

/*   const checkAuthorization = async () => {
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
        console.error('Failed to check authorization:', error)
        return false
      }
    }
    return false
  }
 */

  /* useEffect(() => {
    checkAuthorization().then(setIsAuthorized)
  }, [])
  useEffect(() => {
    checkAssistant().then(setIsAssistant)
  }, []) */

  const handleAssistant = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthorized) {
      router.push('/authorize')
      return
    } 
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.post(`${API_URL}/assistant`, {
        name
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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }

  if (isAuthorized === null) {
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800"
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </motion.div>
    )
  }

  return (
    <div 
      /* initial="hidden"
      animate="visible"
      variants={fadeIn} */
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 font-sans"
    >
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
          <Button 
            onClick={() => router.push('/crews/IA-landing/IA')} 
            variant="outline" className="text-gray-600 hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to your crew
          </Button>
          <Link href="/login">
              <LogoutButton/>
          </Link>
        </nav>
      </header>

      <main className="pt-28 md:pt-24max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        {!isAuthorized && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authorization Required</AlertTitle>
              <AlertDescription>
                Please authorize with Google Sheets before creating your assistant.
                <Button onClick={() => router.push('/authorize')} className="mt-2 w-full bg-primary hover:bg-primary/90 text-white">
                  Go to Authorization Page
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-primary">Create Your Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAssistant}>
                {isAssistant ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center space-y-4"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500" />
                    <p className="text-lg font-medium text-center">Assistant already created</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Product/Company Information
                      </label>
                      <Input
                        id="name"
                        placeholder="Enter product/company information/name"
                        value={name}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                      disabled={loading || !isAuthorized}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Working...
                        </>
                      ) : result ? (
                        'Successful!'
                      ) : (
                        'Create Assistant'
                      )}
                    </Button>
                  </>
                )}
              </form>
            </CardContent>
            {result && (
              <CardFooter>
                <p className="text-center text-green-600 font-medium w-full">
                  {result}
                </p>
              </CardFooter>
            )}
          </Card>
        </motion.div>
        {/* {result && (
          <Card className="w-full max-w-md mx-auto mt-8">
            <CardContent className="flex justify-center">
              <Button type="button" disabled={loading}>
                <a href={result} target="_blank" rel="noopener noreferrer" className="text-primary-foreground no-underline">Evaluation</a>
              </Button>
            </CardContent>
          </Card>
        )} */}
      </main>
    </div>
  )
}

export default AssistantPage