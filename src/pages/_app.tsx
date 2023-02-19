import Main from '@/components/Layouts/Main';
import { NextComponentType } from 'next';
import { Provider } from 'react-redux';
import store from '@/states';
import '../styles/global.css';

interface MyPageProps {
  Component: any
  pageProps: NextComponentType
}

export default function App({ Component, pageProps }: MyPageProps) {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => (
    <Provider store={store}>
      <Main>
        {page}
      </Main>
    </Provider>
  ));

  return getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>,
  );
}
