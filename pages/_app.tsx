import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import * as react from "react"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function App({ Component, pageProps }:AppProps) {
  const router = useRouter()
  react.useEffect(() => {
    const handleStart = (url: string) => {
      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  return<ThemeProvider defaultTheme='dark' attribute='class' enableSystem={false}>
    <Component {...pageProps} />
  </ThemeProvider>
}
