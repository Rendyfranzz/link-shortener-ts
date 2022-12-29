import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import prisma from '../../prisma/prisma';
import { Link } from '../../types';
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
        take:2
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
            url:res
        },
    };

}

const Result: NextPage<{ url: Link }> = ({ url }) => {

    const router = useRouter()
    
    if(router.isFallback){
        return<div>Loading</div>
    }

    return (
        <div><p>hai{url.customLink}</p></div>
    )
}

export default Result