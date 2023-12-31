import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/components/cartcontex"
import { AuthProvider } from "@/components/AuthContext"





const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <AuthProvider>
          <CartProvider>
          <Header />

          {children}
          <Footer />
          </CartProvider>
          </AuthProvider>
      </body>
    </html>
  )
}
