import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar/Navbar'
import { cn } from '@/lib/utils'
import Footer from '@/components/footer/Footer'
import Providers from './providers'
import { AppProvider } from '@/components/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tech Cloud',
  description: 'ZDZ Tech Cloud',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Navbar />
          <div
            key={1}
            className="max-w-screen-2xl flex flex-col items-center mx-auto p-6"
          >
            {children}
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  )
}
