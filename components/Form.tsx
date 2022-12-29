import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";


export const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [visible, setVisible] = useState(false)
    const [valid,setValid] = useState(true)
    const router = useRouter()
    const onSubmit = async (value:any) =>{
       if(value.originalLink.match(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/g) === null) {
            setValid(false)
        }
        if(valid){
            try{
                const response = await axios.post("/api/add",{
                    data:value
                })
                router.push(`/result/${response.data.customLink}`)
            }catch(err:any){
                if (err.response) {
                    console.log(err.response);
                    alert(err.response.data.msg)
                }
            }
            
        }
       
    }
    const handleClick = () => {
        setVisible(!visible)
    }
    return (
        <form className="flex flex-col w-1/2" onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-row space-x-1 justify-between">
                <input className="input w-full"{...register("originalLink", { required:{
                    value:true,
                    message:"Enter URL"
                },pattern:{
                    value:RegExp(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/g),
                    message:"Enter Valid URL"
                } })} placeholder="enter url here" />
                <input type="submit" className="border rounded-md p-2 cursor-pointer" />
            </div>
            {/* <span>{errors?.originalLink?.message :string}</span> */}
            <div className="flex space-x-2">
                <p>Or using </p>
                <span onClick={handleClick} className="cursor-pointer text-cyan-400 font-bold">{
                    visible ? "Default Link" : "Custom Link"
                }</span>
            </div>
            {
                visible && <input {...register("customLink", { required: true })} className="input w-1/3" placeholder="Enter custom link" required />
            }
        </form>
    )
}
