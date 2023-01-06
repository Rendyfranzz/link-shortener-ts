import { Page } from "../types"
import { Footer } from "./Footer"
import {Header} from "./Header"



export const Layout = ({children}:Page) => {
  return (
    <>
    <div className="h-screen max-h-screen flex flex-col justify-center items-center">
        <Header/>
        {children}
        <Footer/>
    </div>
    </>
  )
}
