'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import API_URL from "../config/apiConfig"
import axios from 'axios'
import withAuth from "@/components/withAuth"
import { Users, AlertTriangle, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface Crew {
  name: string
  description: string
  availability: number
}

const CrewsPage = () => {
  const [crews, setCrews] = useState<Crew[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('accessToken')
        const response = await axios.get(`${API_URL}/crews`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setCrews(response.data.map((crew: [string, string, number]) => ({
          name: crew[0],
          description: crew[1],
          availability: crew[2]
        })))
        setError(null)
      } catch (error) {
        console.error('Failed to fetch crews:', error)
        setError('Failed to load crews. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchCrews()
  }, [])

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800 font-sans">
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
        {/* <nav className="space-x-4"> */}
        <Link href="/login">
            <Button variant="outline" className="hover:bg-primary hover:text-white">
              Login
            </Button>
          </Link>
        {/* </nav> */}
      </header>

      <main className="pt-16 md:pt-18 max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <Users className="inline-block animate-spin text-primary h-12 w-12 mb-4" />
            <p className="text-xl font-semibold">Loading crews...</p>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <AlertTriangle className="inline-block text-red-500 h-12 w-12 mb-4" />
            <p className="text-xl font-semibold text-red-500">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-primary hover:bg-primary/90 text-white"
            >
              Try Again
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-8 text-center text-primary">Available Crews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {crews.map((crew, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex"
                >
                  <Card 
                    className={`flex flex-col w-full overflow-hidden transition-all duration-300 ${
                      crew.availability === 1 ? 'hover:shadow-xl hover:scale-105' : 'opacity-75'
                    }`}
                  >
                    <CardHeader className="bg-primary/10">
                      <CardTitle className="text-2xl font-semibold text-primary">
                        {crew.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow pt-6">
                      <p className="text-gray-600 text-lg">{crew.description || 'No description available.'}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center bg-gray-50 mt-auto">
                      {crew.availability === 1 ? (
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span className="font-medium">Available</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-yellow-500">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          <span className="font-medium">Coming Soon</span>
                        </div>
                      )}
                      <Button 
                        onClick={() => {
                          router.push(`/crews/IA-landing`);
                        }}
                        disabled={crew.availability === 0}
                        className={`${
                          crew.availability === 1 
                            ? 'bg-primary hover:bg-primary/90 text-white' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        } transition-colors duration-200`}
                      >
                        {crew.availability === 1 ? 'Select Crew' : 'Unavailable'}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default withAuth(CrewsPage)