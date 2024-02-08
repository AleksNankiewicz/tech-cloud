'use client'

import React from 'react'

import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { useFormState } from 'react-dom'

import { register } from '@/lib/data'

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined)
  return (
    <form action={formAction}>
      <div className="space-y-1">
        <Label htmlFor="username">Nazwa użytkownika</Label>
        <Input
          id="name"
          name="username"
          defaultValue=""
          type="text"
          className="text-white"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="name"
          name="email"
          defaultValue=""
          type="email"
          className="text-white"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Hasło</Label>
        <Input
          id="pass"
          name="password"
          defaultValue=""
          type="password"
          className="text-white"
        />
      </div>
      <Button className="mt-4 border border-slate-950">Zarejsestruj się</Button>

      <div className="text-red-600 mt-5 font-bold">{state?.error}</div>
      <div className="text-green-400 mt-5 font-bold">{state?.succes}</div>
    </form>
  )
}

export default RegisterForm
