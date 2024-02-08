import { clsx } from 'clsx'
import mongoose from 'mongoose'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const connection = {}

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log('using existing connection')
      return
    }

    const db = await mongoose.connect(process.env.MONGO)

    connection.isConnected = db.connection[0].readyState
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}
