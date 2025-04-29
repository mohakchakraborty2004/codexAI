"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Coins, Flame, TrendingUp, Clock, ChevronRight, User } from "lucide-react"
import { getAllQuest } from "@/actions/ProbVerification"


export default function Feed() {
    // const hasFetched = useRef(false);
    const [probs, setProbs] = useState([{
        id : "", 
        prob : "", 
        createdAt : new Date() ,
        creator : "anonymous"
    }])

    useEffect(()=> {
        // if (hasFetched) return
        // //@ts-ignore
        // hasFetched.current = true
        async function call() {
            const fetchProbs = await getAllQuest();
            if(!fetchProbs) {
                console.log("no");
                return
            }
            const data = fetchProbs?.map(probs => ({
                id : probs.id ,
                prob : probs.title ,
                createdAt : probs.createdAt ,
                creator : probs.creator.username 
            }))
            console.log(data)
            setProbs(prevProbs => [...prevProbs, ...data])  // Fixed: removed extra comma
        }

        call()
    }, [])

  // Mock problems data
  const problems = [
    {
      id: 1,
      title: "Balanced Binary Tree Validation",
      difficulty: "Medium",
      reward: 250,
      participants: 124,
      timeLeft: "2 days",
      trending: true,
      hot: false,
    },
    {
      id: 2,
      title: "Efficient String Matching Algorithm",
      difficulty: "Hard",
      reward: 450,
      participants: 78,
      timeLeft: "5 days",
      trending: false,
      hot: true,
    },
    {
      id: 3,
      title: "Optimize Database Query Performance",
      difficulty: "Hard",
      reward: 500,
      participants: 56,
      timeLeft: "3 days",
      trending: true,
      hot: true,
    },
    {
      id: 4,
      title: "Implement a LRU Cache",
      difficulty: "Medium",
      reward: 300,
      participants: 210,
      timeLeft: "4 days",
      trending: false,
      hot: false,
    },
    {
      id: 5,
      title: "Graph Traversal Challenge",
      difficulty: "Easy",
      reward: 150,
      participants: 345,
      timeLeft: "7 days",
      trending: true,
      hot: false,
    },
    {
      id: 6,
      title: "Distributed System Consensus Algorithm",
      difficulty: "Expert",
      reward: 750,
      participants: 32,
      timeLeft: "10 days",
      trending: false,
      hot: true,
    },
  ]

  // Filter states
  const [activeFilter, setActiveFilter] = useState("all")

  // Filter problems based on active filter
  const filteredProblems = problems.filter((problem) => {
    if (activeFilter === "trending") return problem.trending
    if (activeFilter === "hot") return problem.hot
    return true
  })

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold">
            <img className="h-12 w-15" src="./codex.png" alt="" />
            </Link>
            <span className="text-gray-400">|</span>
            <h1 className="text-lg font-medium">Problem Feed</h1>
          </div>
          <Link href="/dashboard" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full text-sm">
            Dashboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        {/* filters are not active sorry */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              activeFilter === "all" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            All Problems
          </button>
          <button
            onClick={() => setActiveFilter("trending")}
            className={`px-4 py-2 rounded-full text-sm flex items-center gap-1 whitespace-nowrap ${
              activeFilter === "trending" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Trending
          </button>
          <button
            onClick={() => setActiveFilter("hot")}
            className={`px-4 py-2 rounded-full text-sm flex items-center gap-1 whitespace-nowrap ${
              activeFilter === "hot" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            <Flame className="w-4 h-4" /> Hot
          </button>
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          {probs.map((problem) => (
            <div
              key={problem.id}
              className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-5 border border-gray-800 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-lg">{problem.prob}</h3>
                    {/* {problem.trending && <TrendingUp className="w-4 h-4 text-blue-400" />}
                    {problem.hot && <Flame className="w-4 h-4 text-orange-400" />} */}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    {/* <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        problem.difficulty === "Easy"
                          ? "bg-green-500/20 text-green-400"
                          : problem.difficulty === "Medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : problem.difficulty === "Hard"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-purple-500/20 text-purple-400"
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                    <span>{problem.participants} participants</span> */}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="text-yellow-400 w-5 h-5" />
                    <span className="font-medium">{problem.creator}</span>
                  </div>
                  <Link
                    href={`/arena/${problem.id}`}
                    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full text-sm flex items-center gap-1 transition-all duration-300 hover:shadow-[0_0_10px_rgba(138,43,226,0.4)]"
                  >
                    Solve <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}