'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter()

    useEffect(() => {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        router.push('/login') // Redirect to login if not authenticated
      }
    }, [router])

    return <WrappedComponent {...props} />
  }
}

export default withAuth
