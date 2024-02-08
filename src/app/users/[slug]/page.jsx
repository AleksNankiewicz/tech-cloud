import { getUserByUsername, getUserWorks } from '@/lib/data'
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
const SingleUser = async ({ params }) => {
  const { slug } = params

  const user = await getUserByUsername(slug)

  const works = await getUserWorks(user.id)

  return (
    <div className="grid grid-cols-2 gap-4 w-full  ">
      <div className="col-span-2">
        {' '}
        <div className=" min-h-[400px] md:min-h-[350px] bg-slate-900 col-span-2  rounded-2xl p-4 group flex flex-col  relative ">
          <div className="flex justify-end items-center">
            <div className="opacity-0 p-1 rounded-full group-hover:-rotate-45 duration-300">
              <IoIosArrowRoundForward size={20} />
            </div>
          </div>
          <div className="flex  flex-col">
            <div className="relative">
              <Image
                src={user?.img ? user.img : '/noavatar.png'}
                width={75}
                height={75}
                className="rounded-2xl"
              />
            </div>

            <h1 className="text-3xl"> {user.username}</h1>

            <h2 className="text-muted-foreground"> {user.fullName}</h2>

            <div className="flex gap-2 pb-1">
              {user.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <p>{user.desc}</p>
          </div>
        </div>
      </div>

      {works.map((work) => (
        <div key={work.id} className="col-span-2 md:col-span-1">
          <Link href={`/works/${work.slug}`}>
            {' '}
            <div className=" h-[300px] md:h-[450px] bg-slate-900 col-span-2 md:col-span-1 rounded-2xl p-4 group flex flex-col justify-between relative ">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl">{work.title}</h1>
                <div className="bg-white p-1 rounded-full group-hover:-rotate-45 duration-300">
                  <IoIosArrowRoundForward size={20} color="black" />
                </div>
              </div>
              <div className="flex gap-2 pb-1">
                {work.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="relative w-full h-[80%] overflow-hidden rounded-2xl ">
                <Image
                  src={work?.img?.length ? work?.img[0] : '/Znak-Mistrz.png'}
                  fill
                  alt="Znak-Mistrz"
                  priority
                  className=" object-cover object-center group-hover:scale-150 duration-1000"
                />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default SingleUser
