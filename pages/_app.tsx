import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }:AppProps) {
  return<ThemeProvider defaultTheme='dark' attribute='class' enableSystem={false}>
    <Component {...pageProps} />
  </ThemeProvider>
}
