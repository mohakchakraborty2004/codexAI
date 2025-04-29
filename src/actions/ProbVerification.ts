// send the problem along with a solution to the server( python based agent ) and get the verification result
"use server"
import axios from "axios"
import prisma from "@/db/db"
import { getServerSession } from "next-auth"
import authOptions from "./authoptions"

interface response {
    is_valid : boolean
    reason : string 
    suggested_fixes : any[]
}

export const verifyProblem = async (problem: string) => {
const data  =  { ques : problem }
try {
    const response = await axios.post<response>('http://localhost:8000/validateQuest', data , { 
        headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response) {
        throw new Error('Failed to verify solution');
    }
    const is_valid = response.data.is_valid;
    const reason = response.data.reason;
   
    return {is_valid : is_valid, reason : reason } // Return the verification result which is true or false
} catch (error) {
    console.error('Error verifying solution:', error);
}

}

export const createQues = async(title : string,description : string , is_valid : boolean) => {
    // again session based auth here please 
       const session  = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if(!session) {
        throw new Error("please login")
    }
    const tags = ["tag1", "tag2"]
    // const ver = await verifyProblem(description)
    // const is_valid = ver?.is_valid;
    try {
        //we will improve agent for difficulty and tags
        const response = await prisma.question.create({
            data : {
                title : title,
                content : description,
                tags : tags,
                aiValidated : is_valid,
                baseReward : 0,
                creatorId : userId
            }
        })


        if(!response) {
            console.log("some error occured")
        }

        return {
            id : response.id,
            valid : response.aiValidated,
            remarks : response.aiValidationLog
        }
    } catch (error) {
        console.log("error" , error)
    }
    
}

export const getAllQuest = async() => {
    //validated and active
    //session auth nextauth
    try {
        const response = await prisma.question.findMany({
            select : {
                id : true ,
                title : true ,
                createdAt : true, 
                creator : {
                    select : {
                        username : true
                    }
                }
            }
        })

        return response;
    } catch (error) {
        console.log("some error occured")
    }
}

export const getQuest = async(quesID : any) => {
    //nextauth sesssion
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id

    if(!session) {
        return 
    }
    try {
        const response = await prisma.question.findUnique({
            where : {
                id : quesID
            }, 
            select : {
                creator : {
                    select : {
                        username : true
                    }
                }, 
                title : true, 
                content : true, 
                rewardPool : true
            }
        })

        if(response) {
            return {response , status : 200}
        } else {
            throw new Error("error fetching question")
        }
    } catch (error) {
        console.log("error")
    }
} 