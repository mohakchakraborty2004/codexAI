"use server"
import prisma from "@/db/db"
import { getServerSession } from "next-auth";
import authOptions from "./authoptions";


export const depositCodexCoin = async (amount: number) => {

       const session  = await getServerSession(authOptions);
    const userId = session?.user?.id;

     // logic from smart contract
    // for now we are randomly giving codexCoins to the user
   try {
    const response = await prisma.user.findFirst({
        where : {
            id : userId
        }, 
        select : {
            codexCoinBalance : true
        }
    })

    if(!response){
        console.log("error occured")
        return 
    }

    const newAmount = response.codexCoinBalance + amount;

    const response2 = await prisma.user.update({
        where : {
            id : userId
        } , 
        data : {
            codexCoinBalance : newAmount
        }
    })

    if (!response2) {
        throw new Error("some error occured")
    }

    return {msg : "coins successfully deposited."}

   } catch (error) {
     console.log("error :", error)
   }

}

export const withdrawCodexCoin = async (amount: number) => {
    // logic from smart contract
    // fetch from db and return the amount of codex coins in the wallet
    // reduce the amount from smart contract as well. 
    
     const session  = await getServerSession(authOptions);
    const userId = session?.user?.id;
    try {
    const response = await prisma.user.findFirst({
       where : {
           id : userId
       }, 
       select : {
           codexCoinBalance : true
       }
   })

   if(!response){
       console.log("error occured")
       return 
   }

   const newAmount = response.codexCoinBalance - amount;

   if (newAmount < 0) {
    throw new Error("not enough to redeem")
   }

   const response2 = await prisma.user.update({
       where : {
           id : userId
       } , 
       data : {
           codexCoinBalance : newAmount
       }
   })

   if (!response2) {
       throw new Error("some error occured")
   }

   return {msg : "coins successfully staked"}

  } catch (error) {
    console.log("error :", error)
  }
}

export const getCodexCoinBalance = async () => {
    // logic from smart contract
    // fetch from db and return the amount of codex coins in the wallet
       const session  = await getServerSession(authOptions);
    const userId = session?.user?.id;; 
    try {
        const response = await prisma.user.findFirst({
            where : {
                id : userId
            }, 
            select : {
                codexCoinBalance : true
            }
        })
    
        if(!response){
            console.log("error occured")
            return 
        }
    
       return {codexBalance : response.codexCoinBalance} 
    }
     catch(error) {
        console.log("error: ", error);
    }

}

export const stakeCodexCoin = async (amount: number , quesID: string) => {

    //reduce the amount staked from db and reflect 
    // reduce it from smart contract as well 
       const session  = await getServerSession(authOptions);
    const userId = session?.user?.id;
    try {
    const response = await prisma.user.findFirst({
       where : {
           id : userId
       }, 
       select : {
           codexCoinBalance : true
       }
   })

   const resp = await prisma.question.findFirst({
    where : {
        id : quesID
    }, 
    select : {
        rewardPool : true
    }
   }); 


   if(!response || !resp){
       console.log("error occured")
       return 
   }
   
   const totalPool = resp.rewardPool
   const newAmount = response.codexCoinBalance - amount;

   const response2 = await prisma.user.update({
       where : {
           id : userId
       } , 
       data : {
           codexCoinBalance : newAmount
       }
   })

   const response3 = await prisma.question.update({
    where : {
        id : quesID  
    } , 
    data : {
        rewardPool : totalPool
    }
     
   })
   if (!response2) {
       throw new Error("some error occured")
   }

   return {msg : "coins successfully staked and submitted solution"}

  } catch (error) {
    console.log("error :", error)
  }

}