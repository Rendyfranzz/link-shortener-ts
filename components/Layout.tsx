import { Footer } from "./Footer"
import {Header} from "./Header"

export const Layout = ({children}:any) => {
  return (
    <>
    <div className="h-screen w-screen flex flex-col justify-center items-center">
        <Header/>
        {children}
        <Footer/>

    </div>
    </>
  )
}
