import * as react from "react"
import { ClipLoader } from 'react-spinners'
interface Myprops{
    loading:boolean
    state:string
}
export const Loader : react.FC<Myprops> = (props) => {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <div>
            <ClipLoader
                color={"#fffff"}
                loading={props.loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            </div>
            <p className='p'>{props.state}</p>
    </div>
  )
}
