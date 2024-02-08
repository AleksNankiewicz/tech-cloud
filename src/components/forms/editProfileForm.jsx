'use client'

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
import { editProfilePage, editUser } from '@/lib/data'

import { useFormState } from 'react-dom'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
const EditProfileForm = () => {
  const [state, formAction] = useFormState(editUser, undefined)

  const [id, setId] = useState('')
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === 'authenticated') {
      setId(session.user.id)
    }
  }, [session, status])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edytuj profil</CardTitle>
        <CardDescription>Tu możesz zmienić swoje dane</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Identyfikator użytkownika</Label>
              <Input
                id="name"
                placeholder="..."
                name="userId"
                className="text-gray-700 bg-slate-500"
                value={id}
                readOnly
              />
              <Label htmlFor="name">Imię i Nazwisko</Label>
              <Input
                id="name"
                placeholder="Imię i Nazwisko..."
                name="fullName"
                className="text-white"
              />
              <Label htmlFor="name">Hasło</Label>
              <Input
                id="name"
                placeholder="hasło..."
                name="password"
                className="text-white"
              />
              <Label htmlFor="name">Opis</Label>
              <Input
                id="name"
                placeholder="opis..."
                name="desc"
                className="text-white"
              />

              <Label htmlFor="name">Tagi</Label>
              <div className=" flex gap-2 flex-wrap">
                <Input
                  id="tag"
                  placeholder="tag.."
                  name="tag1"
                  className="text-white w-20 rounded-2xl"
                />
                <Input
                  id="tag"
                  placeholder="tag.."
                  name="tag2"
                  className="text-white w-20 rounded-2xl"
                />
                <Input
                  id="tag"
                  placeholder="tag.."
                  name="tag3"
                  className="text-white  rounded-2xl w-20"
                />
                <Input
                  id="tag"
                  placeholder="tag.."
                  name="tag4"
                  className="text-white w-20 rounded-2xl"
                />
                <Input
                  id="tag"
                  placeholder="tag.."
                  name="tag5"
                  className="text-white w-20 rounded-2xl"
                />
                <Input
                  id="tag"
                  placeholder="tag.."
                  name="tag6"
                  className="text-white w-20 rounded-2xl"
                />
                <Input
                  id="tag"
                  placeholder="tag.."
                  name="tag7"
                  className="text-white w-20 rounded-2xl"
                />
                <Input
                  id="tag8"
                  placeholder="tag.."
                  name="tag8"
                  className="text-white  rounded-2xl w-20"
                />
                <Input
                  id="tag9"
                  placeholder="tag.."
                  name="tag9"
                  className="text-white w-20 rounded-2xl"
                />
                <Input
                  id="tag10"
                  placeholder="tag.."
                  name="tag10"
                  className="text-white w-20 rounded-2xl"
                />
              </div>
              <Label htmlFor="name">Zdjęcie</Label>
              <Input
                id="name"
                placeholder=""
                name="img"
                type="file"
                className="text-white w-1/2"
              />
            </div>
          </div>
          <Button type="submit" className="border border-black mt-4">
            Edytuj
          </Button>
          {state?.error}
          {state?.succes}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  )
}
export default EditProfileForm
