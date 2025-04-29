// next auth 

import * as bcrypt from "bcrypt";
import prisma from "@/db/db";
import  CredentialsProvider  from "next-auth/providers/credentials"


const authOptions = {
providers : [
 CredentialsProvider({
    name : 'credentials', 
    credentials : {
        email: { label: "email", type: "text", placeholder: "peterparker@dailybugle.co.us", required: true },
        password: { label: "Password", type: "password", required: true },
        username : { label: "name", type: "text"}
    } ,
    async authorize(credentials: any): Promise<any> {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await prisma.user.findUnique({
            where : {
                email : credentials.email
            }
        })

        if (existingUser) {
            const pwValidation = await bcrypt.compare(credentials.password, existingUser.passwordHash);
            if (pwValidation) {
                return {
                    id : existingUser.id ,
                    email : existingUser.email,
                    username : existingUser.username
                }
            }
            return null;
        }

        try {
            const user = await prisma.user.create({
                data : {
                    email : credentials.email,
                    passwordHash : hashedPassword,
                    username : credentials.username
                }
            })
            return {
                id : user.id ,
                email : user.email,
                username : user.username
            }
            
        } catch (error) {
            console.log(error);
        }

        return null; 
    }
 })

], 
secret : "secret",
callbacks : {
    async session({token, session}: any) {
        session.user.id = token.sub 

        return session
    }
}
}

export default authOptions;