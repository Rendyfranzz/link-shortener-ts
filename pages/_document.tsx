import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-white transition-colors dark:bg-dark dark:text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
