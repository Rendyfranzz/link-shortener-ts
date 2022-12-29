import prisma from "../../prisma/prisma"

export default async function (req:any, res:any) {
  let { originalLink, customLink } = req.body.data
  if(!customLink){
    customLink = Math.random().toString(36).substring(2,8)
  }
  const url = await prisma.link.findUnique({
    where: {
      customLink: customLink
    }
  })
  if (url) {
    return res.status(400).json({ msg: "Link sudah digunakan" })
  }

  try {
    
    await prisma.link.create({
      data: {
        originalLink: originalLink,
        customLink: customLink
      }
    })
    res.status(200).json({ customLink })
  } catch (err) {
    console.log(err);
  }
}

