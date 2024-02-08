'use client'

import React from 'react'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const UserProfilePage = () => {
  const [fullName, setFullName] = useState('')
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === 'authenticated') {
      setFullName(session.user.username)
      //   setFullName(session.user.fullName)
      //   setFullName(session.user.password)
    }

    // if (status === 'unauthenticated') {
    //   useRouter().replace('/')
    // }
  }, [session, status])
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
  }

  return (
    <div>
      <h1>{fullName}</h1>
    </div>
  )
}

export default UserProfilePage
