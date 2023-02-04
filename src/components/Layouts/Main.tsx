import React from 'react'
import { Inter } from '@next/font/google'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Layout, Space } from 'antd';

const inter = Inter({ subsets: ['latin'] })

const Main = ({children}: any) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <div className="wrapper">
          <Header />
          {children}
          <Footer />
        </div>
      </Layout>
    </Space>
  )
}

export default Main