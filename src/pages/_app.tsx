import Main from '@/components/Layouts/Main'
import { NextComponentType } from 'next'
import type { AppProps } from 'next/app'

interface MyPageProps {
  Component: any
  pageProps: NextComponentType
}

export default function App({ Component, pageProps }: MyPageProps) {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => (
    <Main>
      {page}
    </Main>
  ))

  return getLayout(
    <Component {...pageProps} />
  )
}
