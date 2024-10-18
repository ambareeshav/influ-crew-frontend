'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    router.push('/login') // Redirect to login page after logout
  }

  return (
    <Button onClick={handleLogout} className="hover:bg-primary hover:text-white">
      Logout
    </Button>
  )
}
