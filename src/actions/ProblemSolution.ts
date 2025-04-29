// user sends the solution and the AI does the rating (again python based agent)

"use server"
import axios from "axios"
import prisma from "@/db/db";
import { getServerSession } from "next-auth";
import authOptions from "./authoptions";
import { stakeCodexCoin } from "./CodexCoinMgr";

interface responseData {
    is_correct : boolean; // true or false for valid or invalid solution respectively
    code_quality_score : number; // rating out of 100 for the solution
    edge_cases_handled : boolean;
    edge_cases_explaination : string // type of solution (e.g. brute force, optimized, etc.)
    timeComplexity : string; // time complexity of the solution
    spaceComplexity : string; // space complexity of the solution
}


export const verifySolution = async (problem: string, solution: string) => {
// authentication session based 
const data  =  { ques : problem, solution_code : solution }
try {
    const response = await axios.post<responseData>('http://localhost:8000/checkSolution', data ,{
        headers : {
            'content-type' : 'application/json'
        }
    } );
    if (response.status !== 200) {
        throw new Error('Failed to verify solution');
    }


        
    return {
        is_correct : response.data.is_correct,
        code_quality_score : response.data.code_quality_score,
        edge_cases_handled : response.data.edge_cases_handled,
        edge_cases_explaination : response.data.edge_cases_explaination,
        time_complexity : response.data.timeComplexity,
        space_complexity : response.data.spaceComplexity
    } // Return the verification result which is valid or invalid
} catch (error) {
    console.error('Error verifying solution:', error);
}

}


export const stakeAndSubmitSoln = async(problem: string, solution: string, problemid: any, amount : number) => {
       const session  = await getServerSession(authOptions);
    const userId = session?.user?.id; 
    // calls the function above it automatically
    try {
        const stake = await stakeCodexCoin(amount, problemid); 

        if (!stake || !stake.status || stake.status !== 200) {
            throw new Error("staking failed")
        }
         const response = await verifySolution(problem, solution) 
         if(!response) {
            throw new Error("error validating your submission");
         }

         const valid = response.is_correct ;

         if(valid) {
            // wrap this in transaction
            const response2 = await prisma.submission.create({
                data : {
                        content : solution,
                        userId : userId,
                        questionId : problemid, 
                }
            })

            if(!response2) {
                throw new Error("you are cooked bro")
            }

            const response3 = await prisma.reward.create({
                data : {
                    amount : 0,
                    percentage : 0,
                    submissionId : response2.id
                }
            })

            return response;
            // create transactions
         }

    } catch (error) {
        console.log("error: ", error)
    }
    // staking happens here  
}

