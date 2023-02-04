import React from 'react'
import { Inter } from '@next/font/google'
import Header from '../Header/Header'
import PageHeader from '../Header/PageHeader'
import Footer from '../Footer/Footer'

const inter = Inter({ subsets: ['latin'] })

const Main = ({children}: any) => {
  return (
    <main className={inter.className}>
      <div className="wrapper">
        <Header />
        {children}
        <Footer />
      </div>
    </main>
  )
}

export default Main