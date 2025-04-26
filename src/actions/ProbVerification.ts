// send the problem along with a solution to the server( python based agent ) and get the verification result
"use server"
import axios from "axios"


export const verifyProblem = async (problem: string, solution: string) => {
// authentication session based 
const data  =  { problem, solution }
try {
    const response = await axios.post('/api/verify-solution', data );
    if (response.status !== 200) {
        throw new Error('Failed to verify solution');
    }
    //@ts-ignore
    const result = response.data.result; // Assuming the response contains a 'result' field
    return result; // Return the verification result which is valid or invalid
} catch (error) {
    console.error('Error verifying solution:', error);
}

}

export const createQues = async() => {

}

export const getAllQuest = async() => {
    //validated and active 
}

export const getQuest = async() => {
    
} 