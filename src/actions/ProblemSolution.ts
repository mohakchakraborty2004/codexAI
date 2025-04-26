// user sends the solution and the AI does the rating (again python based agent)

"use server"
import axios from "axios"

interface responseData {
    result: boolean; // true or false for valid or invalid solution respectively
    rating : number; // rating out of 100 for the solution
    solutionType : string; // type of solution (e.g. brute force, optimized, etc.)
    timeComplexity : string; // time complexity of the solution
    spaceComplexity : string; // space complexity of the solution
}


export const verifySolution = async (problem: string, solution: string) => {
// authentication session based 
const data  =  { problem, solution }
try {
    const response = await axios.post<responseData>('/api/verify-solution', data );
    if (response.status !== 200) {
        throw new Error('Failed to verify solution');
    }
    //@ts-ignore
    const result = response.data; // Assuming the response contains a 'result' field
    return result; // Return the verification result which is valid or invalid
} catch (error) {
    console.error('Error verifying solution:', error);
}

}


export const stakeAndSubmitSoln = async(problem: string, solution: string) => {
    // calls the function above it automatically
    // staking happens here  
}
