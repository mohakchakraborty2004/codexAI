"use server"
import prisma from "@/db/db"
import { getServerSession } from "next-auth";
import authOptions from "./authoptions";

export const closeQuest = async(quesID : string) => {
    //automatically called through the cron route
    try {
        const question = await prisma.question.update({
            where : {
                id : quesID
            }, 
            data : {
                status : "CLOSED"
            }
        })

        if(question) {
            await CalculateRanking();
            return
        }
    } catch (error) {
        
    }
}

export const CalculateRanking = async() => {
    //automatically called by close quest
    //add the coin balance directly to users account balance
    async function distributeRewards(questionId: string) {
        try {
        
          const topSubmissions = await prisma.submission.findMany({
            where: {
              questionId: questionId,
              isCorrect: true, // Only consider correct submissions
              score: { not: null } // Must have a score
            },
            orderBy: {
              score: 'desc' // Highest scores first
            },
            take: 3, // Get top 3
            include: {
              reward: true, // Include any existing rewards
              //get the creator id of the question
            }
          });
      
          // 2. Define reward distribution percentages
          const rewardPercentages = [0.4, 0.2, 0.1];
          
          // 3. Get total reward pool (assuming you have this value somewhere)
          const rewardPool = await getRewardPoolAmount(questionId);
      
          // 4. Create or update rewards
          for (let i = 0; i < topSubmissions.length; i++) {
            const submission = topSubmissions[i];
            const rank = i + 1; // 1-based ranking
            const percentage = rewardPercentages[i];
            const amount = rewardPool * percentage;
            
            if (submission.reward) {
              // Update existing reward
              await prisma.reward.update({
                where: { id: submission.reward.id },
                data: {
                  amount,
                  rank,
                  percentage
                }
              });
            } else {
              // Create new reward
              await prisma.reward.create({
                data: {
                  amount,
                  rank,
                  percentage,
                  submissionId: submission.id
                }
              });
            }
          }
          
          return { success: true, message: `Rewards distributed for question ${questionId}` };
        } catch (error) {
          console.error("Failed to distribute rewards:", error);
          return { success: false};
        }
      }
      
      // Helper function to get the reward pool amount
      async function getRewardPoolAmount(questionId: string): Promise<number> {
        // Implementation depends on how you store reward pool information
        // For example:
        const question = await prisma.question.findUnique({
          where: { id: questionId },
          select: { rewardPool: true }
        });

        if(!question){
            throw new Error("no question found")
        }
        
        return question.rewardPool || 100; // Default amount if not specified
      }
}

 const getRewards = async(amount : any) => {
       const session  = await getServerSession(authOptions);
    const userId = session?.user?.id;; 
        try {
            const res = await prisma.user.update({
                where : {
                    id : userId
                }, 
                data : {
                    codexCoinBalance : {increment : amount}
                }
            })
        } catch (error) {
            
        }
 }  

 const getSubmissions = async() => {
    // get the rewards here as well 
    try {
        const response = await prisma.submission.findMany({
            select : {
                reward : {
                    select : {
                        amount : true, 
                    }
                }, 
                id : true, 
                createdAt : true
            }
        })

        if (!response) {
            throw new Error("some error occured");
        }

        return response

    } catch (error) {
        
    }
 }

export const ScheduleQuestionClosure = async() => {
    // The scheduleQuestionClosure function is called to register a question for automated closure
    // called after creating a question
}

   