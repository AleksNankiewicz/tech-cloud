import { getUser, getUsers, getWork } from '@/lib/data'

import { Button } from '@/components/ui/button'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { AiFillInstagram } from 'react-icons/ai'
import { FaFacebook } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { getWorks } from '@/lib/data'
import Link from 'next/link'

const SingleWork = async ({ params }) => {
  const { slug } = params
  const work = await getWork(slug)

  const images = work?.img
  const user = await getUser(work.userId)

  return (
    <div className="grid grid-cols-2 gap-4 w-full  ">
      <div className=" min-h-[400px] md:min-h-[400px]  col-span-2 rounded-2xl md:px-4 px-4 group flex flex-col bg-slate-900 relative justify-evenly ">
        <div
          className="flex  gap-4 items-center
          "
        >
          {' '}
          <div className="relative flex">
            <Image
              src={user?.img ? user.img : '/noavatar.png'}
              width={40}
              height={40}
              alt={user?.username}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-muted-foreground">Autor</p>

            {user?.username ? (
              <Link href={`/users/${user.username}`}>{user.username}</Link>
            ) : (
              'Brak '
            )}
          </div>
          <div className="flex flex-col items-center">
            <p className="text-muted-foreground">Utworzono</p>
            <p>{work?.createdAt?.toLocaleString().slice(0, 9)}</p>
          </div>
        </div>
        <h1 className="md:text-6xl text-3xl">{work.title}</h1>
        <p className="md:text-2xl text-base">{work.desc}</p>
        <div className="flex gap-2 pb-1">
          {work.tags.map((tab) => (
            <Badge key={tab} variant="outline" className={'md:text-xl'}>
              {tab}
            </Badge>
          ))}
        </div>

        {work?.link && (
          <Link href={work.link}>
            <Button className="w-60  rounded-full md:text-xl">
              Odwiedź stronę
            </Button>
          </Link>
        )}
      </div>

      {images.length &&
        work.img.map((img, i) => (
          <div
            key={i}
            className=" h-[500px] md:h-[600px] bg-slate-900 col-span-2 rounded-2xl group flex flex-col  relative justify-center md:p-4"
          >
            <div className="relative w-full h-full overflow-hidden rounded-2xl ">
              <Image
                src={img}
                fill
                alt="img"
                priority
                className=" object-cover object-center "
              />
            </div>
          </div>
        ))}
    </div>
  )
}

export default SingleWork
