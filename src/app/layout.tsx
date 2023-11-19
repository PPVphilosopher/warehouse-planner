'use client'

import StyledComponentsRegistry from '@/libs/registry'
import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
