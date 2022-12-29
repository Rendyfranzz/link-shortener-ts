import { GetServerSideProps, NextPage } from 'next';
import prisma from '../../prisma/prisma';
import { Link } from '../../types';
export const getServerSideProps :GetServerSideProps = async (context)=>{
    const linkid = JSON.stringify(context.query.result)
  const url = await prisma.link.findUnique({
    
    where:{
      customLink : linkid
    },select: {
      originalLink: true,
      customLink: true,
    },
  })
  
  return {
    props: {
      url
    }
    }
  }

const result : NextPage<{url:Link}> = ({url}) => {
  return (
    <div><p>hai {url.customLink}</p></div>
  )
}

export default result