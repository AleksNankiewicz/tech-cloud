'use client'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button, buttonVariants } from '../ui/button'
import { FaUser } from 'react-icons/fa'

import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

import RegisterForm from '../forms/registerForm'

const Navbar = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLogged, setIsLogged] = useState(false)
  const session = useSession()

  const handleForm = async (e) => {
    e.preventDefault()
    await signIn('credentials', { username, password })
  }

  const getData = async () => {
    try {
      const res = await fetch(`${process.env.BASE_URL}/api/userByEmail`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session }),
      })

      if (res.ok) {
        console.log(res)
      }
    } catch (err) {
      console.log(err)
      throw new Error('Something went wrong in navbar')
    }
  }

  //  if (session) {
  //   console.log('joi')
  //   getData()
  // }

  return (
    <div className="max-w-screen-2xl flex justify-between items-center p-4 mx-auto pb-0">
      <Link href="/" className="text-xl md:text-4xl">
        Tech Cloud
      </Link>

      <div className="flex gap-4 md:gap-7 items-center">
        <Link href="/works">Prace</Link>
        <Link href="/users" className="">
          Programiści
        </Link>

        {session?.data?.user ? (
          <Link href={'/account'}>
            <Button>Profil</Button>
          </Link>
        ) : (
          <div className="">
            <Sheet>
              <SheetTrigger
                className={cn(buttonVariants(), 'hidden md:block ')}
              >
                Login
              </SheetTrigger>
              <SheetTrigger
                className={cn(buttonVariants(), 'rounded-full md:hidden ')}
              >
                <FaUser />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Zaloguj się</SheetTitle>
                  <SheetDescription>
                    <Tabs defaultValue="account" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Logowanie</TabsTrigger>
                        <TabsTrigger value="register">Rejestracja</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login">
                        <Card>
                          <CardHeader>
                            <CardTitle>Konto</CardTitle>
                            <CardDescription>
                              Tylko nasi programiści mogą się zalogować i
                              zarządzać swoim profilem!
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <form onSubmit={handleForm}>
                              <div className="space-y-1">
                                <Label htmlFor="name">Nick</Label>
                                <Input
                                  id="name"
                                  name="username"
                                  defaultValue=""
                                  type="text"
                                  className="text-white"
                                  onChange={(e) => setUsername(e.target.value)}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label htmlFor="username">Hasło</Label>
                                <Input
                                  id="pass"
                                  name="password"
                                  defaultValue=""
                                  type="password"
                                  className="text-white"
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                              </div>
                              <Button className="mt-4 border">
                                Zaloguj się
                              </Button>
                            </form>
                          </CardContent>
                          <CardFooter></CardFooter>
                        </Card>
                      </TabsContent>
                      <TabsContent value="register">
                        <Card>
                          <CardHeader>
                            <CardTitle>Konto</CardTitle>
                            <CardDescription>
                              Jeśli chodzisz do naszej szkoły i nie masz konta
                              tutaj możesz je założyć.
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <RegisterForm />
                          </CardContent>
                          <CardFooter></CardFooter>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
