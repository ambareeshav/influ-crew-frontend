'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from "@/components/LogoutButton"
import withAuth from "@/components/withAuth"
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

import { useEffect, useCallback } from 'react'
import axios from 'axios'
import API_URL from "../config/apiConfig"

function AuthorizePage() {
  const router = useRouter()
  const [authUrl, setAuthUrl] = useState('')
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  /* const [isAuthorized] = useState(true) */
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
  }, [checkAuthorization])

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

  /* const handleBackToCrews = () => {
    router.push('/crews')
  } */


  const popIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 10 } }
  }

  if (isAuthorized === null) {
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        
        className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800"
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Checking authorization status...</span>
      </motion.div>
    )
  }

  return (
    <div  className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800 font-sans">
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
          <Link href="/login">
              <LogoutButton/>
          </Link>
        </nav>
      </header>

      <main className="pt-12 md:pt-14 max-w-4xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={popIn}>
          <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-primary">Authorize Google Sheets</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              {isAuthorized ? (
                <motion.div 
                  className="flex flex-col items-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}>
                  <CheckCircle className="h-16 w-16 text-green-500" />
                  <p className="text-lg font-medium">You are authorized with Google Sheets</p>
                  <Button 
                    onClick={() => router.push('/crews/IA-landing/IA')}
                    className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Go to Analysis
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  className="flex flex-col items-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <XCircle className="h-16 w-16 text-red-500" />
                  <p className="text-lg font-medium">Authorization required</p>
                  <Button 
                    onClick={handleAuthorize} 
                    disabled={isPolling}
                    className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    {isPolling ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Authorizing...
                      </>
                    ) : (
                      'Authorize with Google Sheets'
                    )}
                  </Button>
                </motion.div>
              )}
            </CardContent>
            <CardFooter className="justify-center">
              {isPolling && (
                <motion.p 
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Waiting for authorization... This may take a few moments.
                </motion.p>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

const AuthorizePageWithAuth = withAuth(AuthorizePage)

export default AuthorizePageWithAuth