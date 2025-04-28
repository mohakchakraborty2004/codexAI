"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Coins, AlertCircle } from "lucide-react"

export default function SolvingArena({ params }: { params: { probID: string } }) {
  const [stake, setStake] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [code, setCode] = useState("")

  // Mock problem data
  const problem = {
    id: Number.parseInt(params.probID),
    title: "Balanced Binary Tree Validation",
    description:
      "Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differs by more than 1.",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "true",
      },
      {
        input: "root = [1,2,2,3,3,null,null,4,4]",
        output: "false",
      },
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 5000]", "Tree height will not exceed 1000"],
    rewardPool: 2450,
    difficulty: "Medium",
  }

  // Mock results data
  const results = {
    passed: true,
    score: 85,
    reward: 210,
    executionTime: "120ms",
    memoryUsage: "24MB",
    feedback: "Great solution! Your algorithm has O(n) time complexity which is optimal.",
  }

  const handleSolve = () => {
    // In a real app, this would submit the code to the backend
    setShowResults(true)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/feed" className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-medium">{problem.title}</h1>
          <span
            className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
              problem.difficulty === "Easy"
                ? "bg-green-500/20 text-green-400"
                : problem.difficulty === "Medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
            }`}
          >
            {problem.difficulty}
          </span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Problem Description */}
          <div className="space-y-6">
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-5 border border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <Coins className="text-yellow-400 w-5 h-5" />
                <span className="font-medium">Reward Pool: {problem.rewardPool} CodexCoins</span>
              </div>

              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg font-medium mb-2">Problem Description</h3>
                <p className="text-gray-300">{problem.description}</p>

                <h4 className="text-md font-medium mt-4 mb-2">Examples:</h4>
                {problem.examples.map((example, index) => (
                  <div key={index} className="mb-3 bg-gray-800/50 p-3 rounded-md">
                    <div>
                      <span className="text-gray-400">Input:</span> {example.input}
                    </div>
                    <div>
                      <span className="text-gray-400">Output:</span> {example.output}
                    </div>
                  </div>
                ))}

                <h4 className="text-md font-medium mt-4 mb-2">Constraints:</h4>
                <ul className="list-disc pl-5 text-gray-300">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-5 border border-gray-800">
              <h3 className="text-lg font-medium mb-3">Your Stake</h3>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter stake amount"
                />
                <button
                  onClick={handleSolve}
                  disabled={!stake || !code}
                  className={`bg-purple-600 px-4 py-2 rounded-lg transition-all duration-300 ${
                    !stake || !code
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-purple-700 hover:shadow-[0_0_10px_rgba(138,43,226,0.4)]"
                  }`}
                >
                  Solve
                </button>
              </div>
              {!stake && code && (
                <p className="text-yellow-400 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> Please enter a stake amount to continue
                </p>
              )}
            </div>
          </div>

          {/* Right Side - Code Editor */}
          <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-800 flex flex-col h-[600px]">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
              <span className="text-sm font-medium">Solution</span>
              <div className="flex gap-2">
                <button className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">Format</button>
                <button className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">Reset</button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
              placeholder="// Write your solution here..."
            ></textarea>
          </div>
        </div>
      </main>

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4 border border-gray-800">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">
                {results.passed ? "Challenge Completed! 🎉" : "Almost There! 🔍"}
              </h3>
              <p className="text-gray-300">Your solution has been evaluated</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Score:</span>
                <span className="font-medium text-lg">{results.score}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Reward:</span>
                <span className="font-medium text-lg flex items-center gap-1">
                  <Coins className="text-yellow-400 w-5 h-5" /> {results.reward} CodexCoins
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Execution Time:</span>
                <span>{results.executionTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Memory Usage:</span>
                <span>{results.memoryUsage}</span>
              </div>
              <div className="pt-2 border-t border-gray-800">
                <span className="text-gray-400 block mb-1">Feedback:</span>
                <p className="text-sm">{results.feedback}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <Link
                href="/problems"
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                Back to Feed
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
