// user sends the solution and the AI does the rating (again python based agent)

"use server"
import axios from "axios"

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
const data  =  { problem, solution }
try {
    const response = await axios.post<responseData>('/api/verify-solution', data ,{
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


export const stakeAndSubmitSoln = async(problem: string, solution: string) => {
    // calls the function above it automatically
    try {
         const response = await verifySolution(problem, solution) 
         if(!response) {
            throw new Error("error validating your submission");
         }

         const valid = response.is_correct ;

         if(valid) {
            const response2 = await prisma?.submission.create({
                data : {
                    
                }
            })
         }
    } catch (error) {
        
    }
    // staking happens here  
}
