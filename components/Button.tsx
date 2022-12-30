import { FC } from 'react'

interface Myprops {
    children: React.ReactNode,
    color: string,
    to: string,
}
export const Button: FC<Myprops> = (props) => {
    return (
        <>
            <a href={props.to} className={` block w-32 text-center h4 bg-opacity-50 hover:bg-opacity-100 ${props.color} p-2 rounded-md shadow-md `}>{props.children}</a>
        </>
    )
}
