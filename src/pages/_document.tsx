/* eslint-disable @next/next/no-css-tags */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head> 
        <link href="/assets/css/tabler.min.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="/assets/js/tabler.min.js" defer></script>
      </body>
    </Html>
  );
}
