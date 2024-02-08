import { Work } from '@/lib/models'
import { connectToDb } from '@/lib/utils'
import { NextResponse } from 'next/server'

const GET = async (request, { params }) => {
  const { slug } = params

  try {
    connectToDb()
    const work = await Work.findOne({ slug })

    return NextResponse.json(work)
  } catch (err) {
    console.log(err)
    throw new Error('Something went wrong in route works [slug]')
  }
}
