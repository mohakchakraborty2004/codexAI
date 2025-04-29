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
        console.log(error);
    }

}

export async function addtoDb(address : string) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id

    try {
        const addAddress = await prisma.user.update({
            where : {
                id : userId
            }, 
            data : {
                walletAddress : address
            }
        })

        if(addAddress) {
            return {
                msg : "successfully added", 
                status : 200
            } 
        } else {
            return {
                msg : "cooked", 
                status : 400
            }
        }
    } catch (error) {
        
    }
}