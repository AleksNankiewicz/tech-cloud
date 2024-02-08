'use client'

import { useSession } from 'next-auth/react'

const SessionGetter = () => {
  const { data: session, status } = useSession()

  return { session, status }
}

export default SessionGetter
