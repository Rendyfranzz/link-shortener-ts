
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router'
import prisma from '../prisma/prisma';
import { ClipLoader } from 'react-spinners';
import { Link } from '../types';
import * as react from "react"


// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const linkid:string = String(context.query.link)
//     const url = await prisma.link.findUnique({
//         where: {
//             customLink: linkid
//         }
//     })
//     return {
//         redirect: {
//             permanent: false,
//             destination: url?.originalLink,
//         },
//         props: {},
//     };
// }

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await prisma.link.findMany({
        take: 2
    })
    const paths = data.map((data: any) => ({
        params: {
            link: data.customLink
        }
    }))
    return {
        paths,
        fallback: true,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { link }: any = context.params;
    const res = await prisma.link.findUnique({
        where: {
            customLink: link
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

const Link: NextPage<{ url: Link }> = ({ url }) => {
    const router = useRouter()
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
            <p className='p'>Redirect to destination...</p>
        </div>
    }

    react.useEffect(() => {
        if (url?.originalLink)
            router.push(url.originalLink)
    }, [])

    return (
        <div></div>
    )
}

export default Link