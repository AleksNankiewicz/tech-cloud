import React from 'react'
import Image from 'next/image'
import { getUser, getUsers, getWorks } from '@/lib/data'
import { MyPieChart } from 'recharts'
import AreaChartComponent from '@/components/AreaChart'
import PieRechart from '@/components/PieChart'
import Link from 'next/link'

const AdminPage = async () => {
  const allUsers = await getUsers()
  const allWorks = await getWorks()
  const users = allUsers.slice(allUsers.length - 4, allUsers.length).reverse()

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="bg-slate-950 col-span-3 md:col-span-2  border border-gray-600 row-span-2 rounded-md">
        <h1 className="m-2 font-bold">Najnowsi Użytkownicy</h1>
        <div className="flex flex-col gap-2 gap-y-5 mx-2 mb-2">
          {users.map((user) => (
            <div key={user.username} className="flex gap-3">
              <Image
                src={user?.img ? user.img : '/noavatar.png'}
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex justify-between items-center w-full px-2">
                <div className="flex flex-col">
                  <p className="text-xs sm:text-base sm:mb-0  mb-2">
                    {user.fullName}
                  </p>
                  <p className="text-xs sm:text-base">{user.email}</p>
                </div>

                <p className="text-xs sm:text-base">
                  {user?.createdAt?.toLocaleString().slice(0, 9)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-950 col-span-1 border border-gray-600 rounded-md p-2 flex flex-col justify-evenly ">
        <h1 className="font-bold md:-mt-5 text-xs sm:text-base">
          Liczba Użytkowników
        </h1>

        <div className="flex justify-between items-center md:px-4">
          <div className="flex flex-col items-center ">
            <h1 className=" font-bold md:text-5xl text-3xl sm:text-4xl">
              {allUsers.length}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground underline">
              <Link href={'/admin/showPosts'}>Wszysycy</Link>
            </p>
          </div>

          <div className="flex flex-col">
            <div className="text-right">
              <p className="text-xl md:text-2xl text-green-400">+45</p>
              <p className="text-xs md:text-sm text-muted-foreground">
                W tym miesiącu
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-950 col-span-1 border border-gray-600 rounded-md p-2 flex flex-col justify-evenly ">
        <h1 className="font-bold md:-mt-5 text-xs sm:text-base">Liczba Prac</h1>

        <div className="flex justify-between items-center md:px-4">
          <div className="flex flex-col items-center ">
            <h1 className=" font-bold md:text-5xl text-3xl sm:text-4xl">
              {allWorks.length}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground underline">
              <Link href={'/admin/showPosts'}>Wszysykie</Link>
            </p>
          </div>

          <div className="flex flex-col">
            <div className="text-right">
              <p className="text-xl md:text-2xl text-green-400">+45</p>
              <p className="text-xs md:text-sm text-muted-foreground">
                W tym miesiącu
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-950 col-span-1 border border-gray-600 rounded-md p-2 flex flex-col justify-evenly ">
        <h1 className="font-bold  text-xs sm:text-base">Liczba Użytkowników</h1>

        <div className="flex justify-between items-center md:px-4">
          <div className="flex flex-col items-center ">
            <h1 className=" font-bold md:text-5xl text-3xl sm:text-4xl">120</h1>
            <p className="text-xs md:text-sm text-muted-foreground underline">
              Wszyscy
            </p>
          </div>

          <div className="flex flex-col">
            <div className="text-right">
              <p className="text-xl md:text-2xl text-green-400">+45</p>
              <p className="text-xs md:text-sm text-muted-foreground">
                W tym miesiącu
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-950 col-span-3 md:col-span-1 border border-gray-600 rounded-md p-2 flex flex-col justify-evenly ">
        <h1 className="font-bold  text-xs sm:text-base">Liczba Użytkowników</h1>

        <div className="flex justify-between items-center md:px-4">
          <div className="flex flex-col items-center ">
            <h1 className=" font-bold md:text-5xl text-3xl sm:text-4xl">120</h1>
            <p className="text-xs md:text-sm text-muted-foreground underline">
              Wszyscy
            </p>
          </div>

          <div className="flex flex-col">
            <div className="text-right">
              <p className="text-xl md:text-2xl text-green-400">+45</p>
              <p className="text-xs md:text-sm text-muted-foreground">
                W tym miesiącu
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-950 md:row-span-2 md:col-span-1 col-span-3 border border-gray-600 rounded-md sm:p-0 min-h-[330px] md:min-h-[0px]">
        <PieRechart
          works={allWorks.length}
          users={allUsers.length}
          className=""
        />
      </div>

      <div className="bg-slate-950 col-span-3 md:col-span-2 border border-gray-600 rounded-md max-h-72 pb-8">
        <p className="">&nbsp; </p>

        <AreaChartComponent />
      </div>
    </div>
  )
}

export default AdminPage
