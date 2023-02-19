import Main from '@/components/Layouts/Main';
import { NextComponentType } from 'next';
import { Provider } from 'react-redux';
import store from '@/states';
import 'antd/dist/reset.css';
import { StyleProvider } from '@ant-design/cssinjs';
import '../styles/global.css';

interface MyPageProps {
  Component: any
  pageProps: NextComponentType
}

export default function App({ Component, pageProps }: MyPageProps) {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => (
    <Provider store={store}>
      <StyleProvider hashPriority="low">
        <Main>
          {page}
        </Main>
      </StyleProvider>
    </Provider>
  ));

  return getLayout(
    <Provider store={store}>
      <StyleProvider hashPriority="low">
        <Component {...pageProps} />
      </StyleProvider>
    </Provider>,
  );
}
