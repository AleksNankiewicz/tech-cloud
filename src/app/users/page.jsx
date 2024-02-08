import { getUsers } from '@/lib/data'
import React from 'react'

import { Button } from '@/components/ui/button'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { AiFillInstagram } from 'react-icons/ai'
import { FaFacebook } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { getWorks } from '@/lib/data'
import Link from 'next/link'
import { user } from '@nextui-org/react'

const getData = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/users`)

  if (!res.ok) {
    throw new Error('something went wrong in usersPage')
  }

  return res.json()
}

const UsersPage = async () => {
  const users = await getUsers()

  return (
    <div className="grid grid-cols-2 gap-4 w-full  ">
      {users.map((user) => (
        <div key={user.id} className="md:col-span-1 col-span-2">
          <Link href={`/users/${user.username}`}>
            {' '}
            <div className=" min-h-[470px] md:min-h-[448px] bg-slate-900 col-span-2  rounded-2xl p-4 group flex flex-col  relative ">
              <div className="flex justify-end items-center">
                <div className="bg-white p-1 rounded-full group-hover:-rotate-45 duration-300">
                  <IoIosArrowRoundForward size={20} color="black" />
                </div>
              </div>
              <div className="flex  flex-col">
                <div className="relative">
                  <Image
                    alt="avatar"
                    src={user?.img ? user.img : '/noavatar.png'}
                    width={75}
                    height={75}
                    className="rounded-2xl"
                  />
                </div>

                <h1 className="text-3xl"> {user.username}</h1>

                <h2 className="text-muted-foreground"> {user.fullName}</h2>

                <div className="flex gap-2 pb-1 flex-wrap">
                  {user.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p>{user.desc}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}

      <div className=" h-[300px] md:h-[450px] bg-slate-900 col-span-2 md:col-span-1 rounded-2xl p-4 group flex flex-col justify-evenly relative">
        <h1 className="text-3xl md:text-5xl">
          Chcesz dołączyć do naszego zespołu?
        </h1>
        <p className="text-muted-foreground">
          Wyślij sowje zgłoszenie już dziś!
        </p>
        <Button className="md:w-2/3 rounded-full">zdz@gmail.com</Button>
        <div className="flex md:gap-4 gap-2">
          <div className=" bg-white p-1 rounded-full">
            <AiFillInstagram size={25} color="black" />
          </div>
          <div className=" bg-white p-1 rounded-full">
            <FaFacebook size={25} color="black" />
          </div>
          <div className=" bg-white p-1 rounded-full">
            <FaDiscord size={25} color="black" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersPage
