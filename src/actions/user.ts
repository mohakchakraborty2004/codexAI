"use server"

import { getServerSession } from "next-auth"
import authOptions from "./authoptions"
import prisma from "@/db/db"

export const getUserDetail = async() => {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    if(!session){
        throw new Error("please login")
    }

    try {
        const userinfo = await prisma.user.findFirst({
            where : {
                id : userId
            }, 
            select : {
                username : true,
                email : true, 
                codexCoinBalance : true
            }
        })

        if(!userinfo){
            throw new Error("no user found");
        }

        return userinfo;
    } catch (error) {
        
    }

}