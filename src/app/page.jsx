import { Button } from '@/components/ui/button'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { AiFillInstagram } from 'react-icons/ai'
import { FaFacebook } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { getWorks } from '@/lib/data'
import Link from 'next/link'
const Home = async () => {
  const allWorks = await getWorks()

  const works = allWorks.slice(allWorks.length - 2, allWorks.length)
  return (
    <div className="grid grid-cols-4 gap-4 w-full  ">
      <div className=" h-[400px]  bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 col-span-4 md:col-span-3 row-span-2 p-4 rounded-2xl flex flex-col justify-between">
        <div className="md:mt-20 mt-10">
          <h1 className="text-4xl md:text-5xl mb-4">Witamy w ZDZ Sosnowiec</h1>
          <p>
            W szkole, gdzie nauka staje się pasją, a programowanie staje się
            Twoim narzędziem do kształtowania przyszłości. Przyłącz się do
            naszej społeczności programistycznej i odkryj, dlaczego nasza szkoła
            to miejsce, gdzie talenty są rozwijane, a pasja do kodowania staje
            się sensem życia.
          </p>
        </div>
        <div className="flex gap-4">
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
      <div className="  md:block hidden rounded-2xl relative overflow-hidden ">
        <Image
          src="/robot.jpg "
          fill
          alt="Robot"
          className="object-cover w-auto h-auto"
        ></Image>
      </div>
      <div className=" md:block hidden    rounded-2xl relative overflow-hidden ">
        <Image
          src="/code-editor.png  "
          fill
          alt="Code Editor"
          className="object-cover"
        ></Image>
      </div>

      <div className=" min-h-[300px]  bg-slate-900 rounded-2xl p-4 flex flex-col justify-evenly md:col-span-1 col-span-2 ">
        <h1 className="text-xl  md:text-2xl">Ekspercka Kadra Nauczycielska:</h1>{' '}
        <p className="text-muted-foreground">
          Nasi doświadczeni nauczyciele nie tylko posiadają ogromną wiedzę, ale
          również pasję do dzielenia się nią z uczniami.
        </p>
      </div>
      <div className=" min-h-[300px]  bg-slate-900 rounded-2xl p-4 flex flex-col justify-evenly md:col-span-1 col-span-2 ">
        <h1 className="text-xl  md:text-2xl">Projekty Praktyczne:</h1>{' '}
        <p className="text-muted-foreground">
          Nie uczymy tylko teorii. Każdy moduł obejmuje praktyczne projekty,
          które pozwalają Ci zastosować zdobytą wiedzę w realnych sytuacjach.
        </p>
      </div>
      <div className=" min-h-[300px]   bg-slate-900 rounded-2xl p-4 flex flex-col justify-evenly md:col-span-1 col-span-2 ">
        <h1 className="text-xl  md:text-2xl">Wsparcie Społeczności:</h1>{' '}
        <p className="text-muted-foreground">
          Dołączając do nas, dołączasz do społeczności pasjonatów programowania.
          Razem uczymy się, dzielimy pomysły i inspirujemy się nawzajem.
        </p>
      </div>
      <div className=" min-h-[300px]  bg-slate-900 rounded-2xl p-4 flex flex-col justify-evenly md:col-span-1 col-span-2 ">
        <h1 className="text-2xl  md:text-2xl">Masz pytania?</h1>{' '}
        <p className="text-muted-foreground">Napisz do nas</p>
        <Button className="md:w-2/3 rounded-full ">zdz@gmail.com</Button>
      </div>

      {works.map((work) => (
        <div key={work.id} className="md:col-span-2 col-span-4">
          <Link href={`/works/${work.slug}`}>
            {' '}
            <div className=" h-[300px] md:h-[450px] bg-slate-900  rounded-2xl p-4 group flex flex-col justify-between relative ">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl">{work.title}</h1>
                <div className="bg-white p-1 rounded-full group-hover:-rotate-45 duration-300">
                  <IoIosArrowRoundForward size={20} color="black" />
                </div>
              </div>
              <div className="flex gap-2 pb-1 flex-wrap">
                {work.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="relative w-full h-[80%] overflow-hidden rounded-2xl ">
                <Image
                  src={work?.img ? work.img[0] : '/Znak-Mistrz.png'}
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
      <div className=" h-[250px]   col-span-2 md:col-span-1 rounded-2xl relative overflow-hidden">
        <Image
          src="/Krystian.png"
          fill
          alt="Krystian"
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-top"
        />
      </div>

      <div className=" min-h-[250px]  bg-slate-900  hidden md:block col-span-2 rounded-2xl p-4">
        <div className="flex flex-col justify-evenly h-full">
          <p>
            &quot;Największym atutem szkoły jest nie tylko ekspercka kadra
            nauczycielska, ale również wsparcie społeczności. Każdy tutaj jest
            gotów pomóc, podzielić się swoimi doświadczeniami i wspierać w
            trudniejszych chwilach.&quot;
          </p>
          <div className="relative flex">
            <Image
              src="/robot.jpg"
              width={50}
              height={50}
              alt="robot"
              className="rounded-full mr-3 object-cover w-auto h-auto"
            />

            <div className="flex flex-col">
              <p className="">Aleks Nankiewicz</p>
              <p className="text-muted-foreground">
                Progrmista w ZDZ Sosnowiec
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-[250px]   col-span-2 md:col-span-1 rounded-2xl relative overflow-hidden">
        <Image
          src="/Adrian.png"
          fill
          alt="Adrian"
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-top"
        />
      </div>
      <div className=" min-h-[250px]   bg-slate-900 visible md:hidden col-span-4 rounded-2xl p-4">
        <div className="flex flex-col justify-evenly h-full">
          <p>
            &quot;Największym atutem szkoły jest nie tylko ekspercka kadra
            nauczycielska, ale również wsparcie społeczności. Każdy tutaj jest
            gotów pomóc, podzielić się swoimi doświadczeniami i wspierać w
            trudniejszych chwilach.&quot;
          </p>
          <div className="relative flex">
            <Image
              alt="Robot"
              src="/robot.jpg"
              width={50}
              height={50}
              className="rounded-full mr-3 object-cover"
            />

            <div className="flex flex-col">
              <p className="">Aleks Nankiewicz</p>
              <p className="text-muted-foreground">
                Progrmista w ZDZ Sosnowiec
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" md:h-[250px] h-[340px] flex flex-col justify-between  bg-slate-900 col-span-2 rounded-2xl p-4">
        <h1 className="text-xl">Gotów na swoją przygodę z programowaniem?</h1>
        <p className="text-muted-foreground">
          Wyślij sowje zgłoszenie już dziś!
        </p>
        <Button className="md:w-3/4 rounded-full">zdz@gmail.com</Button>
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
      <div className=" md:h-[250px] h-[340px] flex flex-col   bg-slate-900 col-span-2 rounded-2xl p-4">
        <h1 className="text-xl">Chcesz zobaczyć więcej prac?</h1>
        <div className="flex flex-col">
          <Link href="/works/Znak-Mistrz">
            <div className="flex justify-between border-b py-3">
              {' '}
              <p>Znak-Mistrz</p> <IoIosArrowRoundForward size={20} />
            </div>
          </Link>
          <Link href="/works/Transform3D">
            <div className="flex justify-between border-b py-3">
              <p>Transform 3D</p> <IoIosArrowRoundForward size={20} />
            </div>
          </Link>
          <Link href="/works/WalentynkaDlaPaniDyrektor">
            <div className="flex justify-between border-b py-3">
              {' '}
              <p>Walentynka</p> <IoIosArrowRoundForward size={20} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Home
