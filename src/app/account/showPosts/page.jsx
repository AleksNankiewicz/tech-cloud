'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const UserPostsPage = () => {
  const [fullName, setFullName] = useState('')
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === 'authenticated') {
      setFullName(session.user.fullName)
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
  return <div>UserPostsPage</div>
}

export default UserPostsPage
