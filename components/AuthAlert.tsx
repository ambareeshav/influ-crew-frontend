'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { XCircleIcon } from "lucide-react"

interface AuthAlertProps {
  checkAuth: () => Promise<boolean>
}

export default function AuthAlert({ checkAuth }: AuthAlertProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const authStatus = await checkAuth()
        setIsAuthorized(authStatus)
      } catch (error) {
        console.error('Error checking authorization:', error)
        setIsAuthorized(false)
      } finally {
        setLoading(false)
      }
    }

    verifyAuth()
  }, [checkAuth])

  if (loading) {
    return null // Or return a loading spinner
  }

  if (isAuthorized) {
    return null // Don't show any alert for authorized users
  }

  return (
    <Alert variant="destructive">
      <XCircleIcon className="h-4 w-4" />
      <AlertTitle>Unauthorized</AlertTitle>
      <AlertDescription>
        You do not have permission to access this page.
      </AlertDescription>
    </Alert>
  )
}