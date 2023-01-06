import { Page } from "../types"
import { Footer } from "./Footer"
import {Header} from "./Header"



export const Layout = ({children}:Page) => {
  return (
    <>
    <div className="h-screen overflow-hidden flex flex-col justify-center items-center">
        <Header/>
        {children}
        <Footer/>
    </div>
    </>
  )
}
