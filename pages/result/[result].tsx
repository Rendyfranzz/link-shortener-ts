import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import prisma from '../../prisma/prisma';
import { Link } from '../../types';
import { Layout } from '../../components/Layout';
import { ClipLoader } from 'react-spinners';
import { Button } from '../../components/Button';
import * as react from "react"
import {FaQrcode} from "react-icons/fa"
import { QrCode } from '../../components/QrCode';
// export const getServerSideProps: GetServerSideProps = async (context) => {

//     const linkid: string = String(context.query.result)
//     const url = await prisma.link.findUnique({
//         where: {
//             customLink: linkid
//         }, select: {
//             originalLink: true,
//             customLink: true,
//         },
//     })

//     return {
//         props: {
//             url
//         }
//     }
// }
export const getStaticPaths: GetStaticPaths = async () => {
    const data = await prisma.link.findMany({
        take: 2
    })
    const paths = data.map((data: any) => ({
        params: {
            result: data.customLink
        }
    }))
    return {
        paths,
        fallback: true,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { result }: any = context.params;
    const res = await prisma.link.findUnique({
        where: {
            customLink: result
        }, select: {
            originalLink: true,
            customLink: true,
        },
    })
    return {
        props: {
            url: res
        },
    };

}

const Result: NextPage<{ url: Link }> = ({ url }) => {

    const router = useRouter()
    const [host,setHost] = react.useState("")
    const [isOpen,setIsOpen] = react.useState(false)
    react.useEffect(()=>{
        setHost(window.location.host)
    },[])

    function handlerOnclick(){
        setIsOpen(!isOpen)
    }
    if (router.isFallback) {
        return <div className='h-screen flex flex-col justify-center items-center'>
            <div>
            <ClipLoader
                color={"#fffff"}
                loading={router.isFallback}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            </div>
            <p className='p'>Please wait...</p>
            </div>
    }

    return (
        <Layout>
            <div className='flex flex-col space-y-8 justify-center items-center'>
            <div className='flex justify-center items-center space-x-4'>
                <input className='input w-96 h3' value={`http://${host}/${url.customLink}`} readOnly autoFocus/>
                <button onClick={handlerOnclick}>
                    <FaQrcode size={40}/>
                </button>
                <QrCode isOpen={isOpen} onclick={handlerOnclick} value={`http://${host}/${url.customLink}`}/>
            </div>
            <div className='space-x-4 flex flex-row'>
            <Button color='bg-green-500' to={`http://${host}/${url.customLink}`}>Destination</Button>
            <Button color='bg-blue-500' to={`http://${host}`}>Home</Button>
            </div>

            </div>
        </Layout>

    )
}

export default Result