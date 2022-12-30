
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import prisma from '../prisma/prisma';
import { ClipLoader } from 'react-spinners';


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
        }
    })
    return {
        redirect: {
            permanent: true,
            destination: res?.originalLink,
        },
        props: {},
    };

}

const Link = () => {
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
    return (
        <div></div>
    )
}

export default Link