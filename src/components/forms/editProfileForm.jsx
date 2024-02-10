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
import { useToast } from '../ui/use-toast'
const EditProfileForm = () => {
  const { toast } = useToast()

  const [state, formAction] = useFormState(editUser, undefined)

  const [id, setId] = useState('')
  const { data: session, status } = useSession()

  useEffect(() => {
    // Show toast when state.success or state.error changes
    if (state?.succes) {
      toast({
        description: state.succes,
      })
    }
    if (state?.error) {
      toast({
        variant: 'destructive',
        description: state.error,
      })
    }
  }, [state?.succes, state?.error])

  useEffect(() => {
    if (status === 'authenticated') {
      setId(session.user.id)
    }
  }, [session, status])

  return (
    <Card className="w-full bg-slate-950 text-white">
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
                name="userId"
                className="text-muted-foreground"
                value={id}
                readOnly
              />
              <Label htmlFor="name">Imię i Nazwisko</Label>
              <Input id="name" name="fullName" className="text-white" />
              <Label htmlFor="name">Hasło</Label>
              <Input id="pass" name="password" className="text-white" />
              <Label htmlFor="name">Opis</Label>
              <Input id="desc" name="desc" className="text-white" />

              <Label htmlFor="name">Tagi</Label>
              <div className=" flex gap-2 flex-wrap">
                <Input
                  id="tag1"
                  name="tag1"
                  className="text-white w-20 rounded-2xl"
                />
                <Input
                  id="tag2"
                  name="tag2"
                  className="text-white w-20 rounded-2xl"
                />
                <Input
                  id="tag3"
                  name="tag3"
                  className="text-white  rounded-2xl w-20"
                />
                <Input
                  id="tag4"
                  name="tag4"
                  className="text-white w-20 rounded-2xl"
                />
                <Input
                  id="tag5"
                  name="tag5"
                  className="text-white w-20 rounded-2xl"
                />
                <Input
                  id="tag6"
                  name="tag6"
                  className="text-white w-20 rounded-2xl"
                />
                <Input
                  id="tag7"
                  name="tag7"
                  className="text-white w-20 rounded-2xl"
                />
                <Input
                  id="tag8"
                  name="tag8"
                  className="text-white  rounded-2xl w-20"
                />
                <Input
                  id="tag9"
                  name="tag9"
                  className="text-white w-20 rounded-2xl"
                />
                <Input
                  id="tag10"
                  name="tag10"
                  className="text-white w-20 rounded-2xl"
                />
              </div>
              <Label htmlFor="image">Zdjęcie</Label>
              <Input
                id="image"
                placeholder=""
                name="img"
                type="file"
                className="text-white w-full md:w-1/2"
              />
            </div>
          </div>
          <Button type="submit" className="border border-black mt-4">
            Edytuj
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
export default EditProfileForm
