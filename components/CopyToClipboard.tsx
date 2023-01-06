import {FaRegCopy} from "react-icons/fa"
import * as react from "react"
import { SuccessNotification } from "./Toastify"
interface Myprops {
    content:string
}
export const CopyToClipboard : react.FC<Myprops> = (props) => {
    function handleCopy(text:string){
        navigator.clipboard.writeText(text)
        SuccessNotification("Copied")
    }
  return (
    <button onClick={() => handleCopy(props.content)}>
        <FaRegCopy size={40}/>
    </button>
  )
}
