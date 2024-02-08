// import { User } from '@/lib/models'
// import { connectToDb } from '@/lib/utils'
// export async function POST(request) {
//   const { username, fullName, password } = await request.json()

//   try {
//     await connectToDb()
//     const user = new User({ username, fullName, password })

//     await user.save()
//     console.log('saved to db')
//   } catch (err) {
//     console.log(err)
//   }
// }
