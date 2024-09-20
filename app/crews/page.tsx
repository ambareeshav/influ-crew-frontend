'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import axios from 'axios'
import LogoutButton from "@/components/LogoutButton"
import withAuth from "@/components/withAuth" // {{ edit_1 }}

const CrewsPage = () => {
  const [crews, setCrews] = useState<[string, string][]>([]) // Update state type to handle name and description
  /* const [isSidebarOpen, setIsSidebarOpen] = useState(false) */
  const router = useRouter()

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const response = await axios.get('https://influ-crew-backend-production.up.railway.app/crews', {
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

/*   const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
 */
  return (
    <div className="flex min-h-screen bg-white text-black">
      <LogoutButton /> {/* {{ edit_2 }} */}
      {/* Sidebar toggle button */}
      {/* <Button onClick={toggleSidebar} className="flex min-h-screen bg-black text-white hover:text-black hover:bg-black"></Button> */}

      {/* Sidebar */}
      {/* {isSidebarOpen && ( */}
        <div className="w-64 bg-gray-200 text-black p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-4"></h2>
          <Button onClick={() => router.push('/authorize')} className="bg-black text-white">Authorize</Button>
        </div>
      {/* )} */}

      <div className="flex-1">
        <div className="container mx-auto mt-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Available Crews</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {crews.map((crew, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:bg-gray-200"
                onClick={() => handleCrewClick(crew[0])} // Use crew name for navigation
              >
                <CardHeader>
                  <CardTitle className="text-black text-center">
                    {crew[0]} {/* Display crew name */}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="">{crew[1]}</p> {/* Display crew description */}
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