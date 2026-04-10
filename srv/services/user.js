import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const getUser = async (id) => {
    return await prisma.user.findUnique({
        where : { id : parseInt(id) },
    });
};


export const getUsers = async () => {
    return await prisma.user.findMany({
        include : { _count : { select : { properties : true} } }
    });
}


export const loginUser = async (email, isAdmin) => {
    const user = await prisma.user.findUnique({
        where : { email : email.toLowerCase() },
    })

    if(!user) return
    return user;
}