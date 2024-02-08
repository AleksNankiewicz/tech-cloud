import { Work } from '@/lib/models'
import { connectToDb } from '@/lib/utils'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    connectToDb()
    const works = await Work.find()
    return NextResponse.json(works)
  } catch (err) {
    console.log(err)
    throw new Error('Failed to fetch works')
  }
}
