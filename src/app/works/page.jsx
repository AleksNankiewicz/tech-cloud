import React, { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { AiFillInstagram } from 'react-icons/ai'
import { FaFacebook } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { getWorks } from '@/lib/data'
import Link from 'next/link'

// const getData = async () => {
//   const res = await fetch(`${process.env.BASE_URL}/api/works`, {
//     revalidate: 30,
//   })

//   if (!res.ok) {
//     throw new Error('Something went wrong in get data in works page!')
//   }

//   return res.json()
// }

const WorksPage = async () => {
  const works = await getWorks()

  return (
    <div className="grid grid-cols-2 gap-4 w-full  ">
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
              <div className="flex gap-2 pb-1 flex-wrap">
                {work.tags.map((tab) => (
                  <Badge key={tab} variant="outline">
                    {tab}
                  </Badge>
                ))}
              </div>
              <div className="relative w-full h-[80%] overflow-hidden rounded-2xl ">
                {work.img.length ? (
                  <Image
                    src={work.img[0]}
                    fill
                    alt={work.title}
                    priority
                    className=" object-cover object-center group-hover:scale-150 duration-1000"
                  />
                ) : (
                  <Image
                    src="/Znak-Mistrz.png"
                    fill
                    alt="Znak-Mistrz"
                    priority
                    className=" object-cover object-center group-hover:scale-150 duration-1000"
                  />
                )}
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

export default WorksPage
