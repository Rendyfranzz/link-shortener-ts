
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import prisma from '../prisma/prisma';


export const getServerSideProps: GetServerSideProps = async (context) => {
    const linkid:string = String(context.query.link)
    const url = await prisma.link.findUnique({
        where: {
            customLink: linkid
        }
    })
    return {
        redirect: {
            permanent: false,
            destination: url?.originalLink,
        },
        props: {},
    };
}

const Link = () => {
    const router = useRouter()
    const { link } = router.query
    return (
        <div>{link}</div>
    )
}

export default Link