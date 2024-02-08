import { User } from '@/lib/models'
import { connectToDb } from '@/lib/utils'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const username = credentials?.username
        const password = credentials?.password

        connectToDb()
        const user = await User.findOne({ username })

        // const isPasswordCorrect = await User.findOne({ password })
        // console.log(isPasswordCorrect)

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (user && isPasswordCorrect) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.isAdmin = user.isAdmin
        token.fullName = user.fullName
        token.username = user.username
        token.img = user.img
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.isAdmin = token.isAdmin
        session.user.fullName = token.fullName
        session.user.username = token.username
        session.user.img = token.img
      }
      return session
    },
    authorized({ auth, request }) {
      console.log(auth)
      return true
    },
  },
})

export { handler as GET, handler as POST }
