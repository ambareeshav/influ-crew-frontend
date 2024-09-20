'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const withAuth = (WrappedComponent: React.ComponentType<{ /* specify props here */ }>) => {
  const AuthenticatedComponent = (props: { /* specify props here */ }) => {
    const router = useRouter()

    useEffect(() => {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        router.push('/login') // Redirect to login if not authenticated
      }
    }, [router])

    return <WrappedComponent {...props} />
  }

  AuthenticatedComponent.displayName = 'AuthenticatedComponent' // Added display name

  return AuthenticatedComponent
}

export default withAuth
