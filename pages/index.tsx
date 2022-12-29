import { Inter } from '@next/font/google'
import { Form } from '../components/Form'
import { Layout } from '../components/Layout'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <Form/>
    </Layout>
  )
}
