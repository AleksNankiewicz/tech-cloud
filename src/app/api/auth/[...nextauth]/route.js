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
        const { username, password } = credentials

        try {
          connectToDb()
          const user = await User.findOne({ username })

          if (!user) {
            // User not found
            return null
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          )

          if (isPasswordCorrect) {
            // Passwords match, return the user object
            return user
          } else {
            // Passwords don't match, return null
            return null
          }
        } catch (error) {
          // Handle any errors that occur during the authorization process
          console.error('Authorization error:', error)
          return null
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
