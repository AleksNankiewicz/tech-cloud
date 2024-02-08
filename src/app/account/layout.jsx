'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { nextui } from '@nextui-org/react'

import { useState, useEffect } from 'react'

import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'

const links = [
  {
    path: '/account/showProfile',
    label: 'Profil',
  },
  {
    path: '/account/showPosts',
    label: 'Prace',
  },
  {
    path: '/account/addPost',
    label: 'Dodaj post',
  },
  {
    path: '/account/editProfile',
    label: 'Edytuj profil',
  },
  {
    path: '/account',
    label: 'Statysktyki',
  },
]

const AdminPageLayout = ({ children }) => {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [img, setImg] = useState('')
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === 'authenticated') {
      setFullName(session.user.fullName)
      setImg(session.user.img)
    }
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [router, session, status])

  const handleSignOut = async () => {
    router.push('/')
    await signOut()
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
  }

  return (
    <>
      <div className="grid grid-cols-5 w-full gap-4 md:min-h-screen">
        <div className="col-span-5 md:hidden  rounded-2xl h-12  overflow-y-hidden select-none">
          <Slider {...settings}>
            {' '}
            {links.map((link) => (
              <div className="" key={link.label}>
                <Link href={link.path}>
                  <div className="p-3 bg-black/30  flex justify-center items-center  text-center">
                    {' '}
                    {link.label}
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
        <div className="col-span-1 hidden md:flex flex-col rounded-2xl bg-slate-900  items-center gap-2 px-2 pt-2">
          <div className="p-3  w-full flex justify-center items-center flex-col rounded-md bg-slate-950 border border-gray-600 gap-2 text-center">
            Profil użytkownika
            <div className=" relative">
              <Image
                className="rounded-2xl"
                src={img ? img : '/noavatar.png'}
                width={100}
                height={100}
                alt="avatar"
              ></Image>
            </div>
            <div className="">
              {fullName ? fullName : 'Ustaw nazwę w "Edytuj profil"'}
            </div>
          </div>

          {links.map((link) => (
            <div className="w-full" key={link.label}>
              <Link href={link.path}>
                <div className="p-3 bg-slate-950 border border-gray-600 w-full flex justify-center items-center rounded-md text-center ">
                  {' '}
                  {link.label}
                </div>
              </Link>
            </div>
          ))}
          <div className="w-full">
            <button
              onClick={handleSignOut}
              className="p-3 bg-white text-slate-950  border-3 border-slate-950 w-full flex justify-center items-center rounded-md text-center "
            >
              Wyloguj się
            </button>
          </div>
        </div>
        <div className="md:col-span-4 col-span-5 rounded-2xl bg-slate-900 p-4 min-h-screen">
          {children}
        </div>
      </div>
    </>
  )
}

export default AdminPageLayout
