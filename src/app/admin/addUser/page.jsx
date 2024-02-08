import React from 'react'

import { Button } from '@/components/ui/button'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { addUser } from '@/lib/data'
import { getSession } from 'next-auth/react'

const AddUserPage = async () => {
  // const session = await getSession()

  // if (session) {
  //   console.log('User is signed in:', session.user)
  // } else {
  //   console.log('User is not signed in')
  // }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Stwórz użytkownika</CardTitle>
        <CardDescription>Dodaj użytkownika do bazy danych</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={addUser}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">username</Label>
              <Input
                id="name"
                placeholder="Nazwa użytkownika.."
                name="username"
                className="text-white"
              />
              <Label htmlFor="name">fullName</Label>
              <Input
                id="name"
                placeholder="Nazwa użytkownika.."
                name="fullName"
                className="text-white"
              />

              <Label htmlFor="name">password</Label>
              <Input
                id="name"
                placeholder="Hasło.."
                name="password"
                className="text-white"
              />
            </div>
          </div>
          <Button type="submit" className="border border-black">
            Dodaj
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  )
}

export default AddUserPage
