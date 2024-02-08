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

import { addWork } from '@/lib/data'

import { useFormState } from 'react-dom'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

const AddWorkForm = () => {
  const [state, formAction] = useFormState(addWork, undefined)

  const [id, setId] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [inputWidth, setInputWidth] = useState('70px')

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
    setInputWidth(`${event.target.scrollWidth}px`)
  }
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === 'authenticated') {
      setId(session.user.id)
    }
  }, [session, status])
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Dodaj post</CardTitle>
        <CardDescription>Stwórz nowy post na swój profil</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Tytuł</Label>
              <Input
                id="name"
                placeholder="tytuł..."
                name="title"
                className="text-white"
              />
              <Label htmlFor="name">Opis</Label>
              <Input
                id="name"
                placeholder="opis..."
                name="desc"
                className="text-white"
              />

              <Label htmlFor="name">Indentyfikator użytkownika</Label>
              <Input
                id="userId"
                placeholder="userId.."
                name="userId"
                className="text-white"
                value={id}
                readOnly
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
              <Label htmlFor="name">Zdjęcia</Label>
              <div className=" flex gap-3 flex-wrap">
                <Input
                  type="file"
                  name="img1"
                  placeholder="Wybierz zdjęcię"
                  className="text-white w-60"
                />
                <Input
                  type="file"
                  name="img2"
                  placeholder="Wybierz zdjęcię"
                  className="text-white w-60"
                />
                <Input
                  type="file"
                  name="img3"
                  placeholder="Wybierz zdjęcię"
                  className="text-white w-60"
                />
                <Input
                  type="file"
                  name="img4"
                  placeholder="Wybierz zdjęcię"
                  className="text-white w-60"
                />
                <Input
                  type="file"
                  name="img5"
                  placeholder="Wybierz zdjęcię"
                  className="text-white w-60"
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="border border-black">
            Dodaj
          </Button>
          {state?.error}
          {state?.succes}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  )
}

export default AddWorkForm
