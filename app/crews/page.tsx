'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import API_URL from "../config/apiConfig"
import axios from 'axios'
import LogoutButton from "@/components/LogoutButton"
import withAuth from "@/components/withAuth" // {{ edit_1 }}

const CrewsPage = () => {
  const [crews, setCrews] = useState<[string, string, number][]>([]) // Update state type to handle name, description, and availability

  const router = useRouter()

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const response = await axios.get(`${API_URL}/crews`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setCrews(response.data)
      } catch (error) {
        console.error('Failed to fetch crews:', error)
      }
    }

    fetchCrews()
  }, [])

  const handleCrewClick = (crew: string) => {
    router.push(`/analyze?crew=${crew}`)
  }


  return (
    <div className="flex min-h-screen bg-white text-black">
      <LogoutButton /> 
        <div className="w-64 bg-gray-200 text-black p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4"></h2>
          <Button onClick={() => router.push('/authorize')} className="bg-black text-white">Authorize</Button>
        </div>
      <div className="flex-1">
        <div className="container mx-auto mt-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Available Crews</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {crews.map((crew, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer hover:bg-gray-200 ${crew[2] === 0 ? 'opacity-50' : ''}`} // Add opacity for unavailable crews
                onClick={() => crew[2] === 1 && handleCrewClick(crew[0])} // Only allow click if available
              >
                <CardHeader>
                  <CardTitle className="text-black text-center">
                    {crew[0]} {/* Display crew name */}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center">{crew[1]}</p> {/* Display crew description */}
                  {crew[2] === 0 && <p className="text-red-500 text-center">Coming Soon</p>} {/* Display availability status */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(CrewsPage) // {{ edit_2 }}