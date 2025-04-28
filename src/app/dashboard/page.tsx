"use client"

import { useState } from "react"
import Link from "next/link"
import { Coins } from "lucide-react"

export default function Dashboard() {
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [amount, setAmount] = useState("")

  // Mock user data
  const user = {
    username: "cryptodev",
    email: "cryptodev@example.com",
    balance: 2450,
  }

  // Mock submissions data
  const submissions = [
    {
      id: 1,
      title: "Two Sum Problem",
      date: "2 days ago",
      reward: 120,
      redeemed: false,
    },
    {
      id: 2,
      title: "Merge Sort Implementation",
      date: "1 week ago",
      reward: 250,
      redeemed: true,
    },
    {
      id: 3,
      title: "Binary Search Tree",
      date: "2 weeks ago",
      reward: 180,
      redeemed: false,
    },
    {
      id: 4,
      title: "Dynamic Programming Challenge",
      date: "3 weeks ago",
      reward: 350,
      redeemed: false,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold">
              CodexAI
            </Link>
            <span className="text-gray-400">|</span>
            <h1 className="text-lg font-medium">Dashboard</h1>
          </div>
          <Link href="/problems" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full text-sm">
            Explore Problems
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* User Info Card */}
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-gray-800 rounded-lg px-4 py-2 flex items-center gap-2">
                <Coins className="text-yellow-400 w-5 h-5" />
                <span className="font-medium">{user.balance} CodexCoins</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDepositModal(true)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full text-sm transition-all duration-300"
                >
                  Deposit
                </button>
                <button
                  onClick={() => setShowWithdrawModal(true)}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full text-sm transition-all duration-300"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submissions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Your Submissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-5 border border-gray-800 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">{submission.title}</h3>
                  <span className="text-gray-400 text-sm">{submission.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Coins className="text-yellow-400 w-4 h-4" />
                    <span className="text-yellow-400 font-medium">{submission.reward} CodexCoins</span>
                  </div>
                  {!submission.redeemed ? (
                    <button className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-full text-xs transition-all duration-300">
                      Redeem Reward
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs">Redeemed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Deposit CodexCoins</h3>
            <p className="text-gray-300 mb-4">Are you sure you want to proceed with the deposit?</p>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-1">
                Amount (INR)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDepositModal(false)}
                className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle deposit logic here
                  setShowDepositModal(false)
                  setAmount("")
                }}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Withdraw CodexCoins</h3>
            <p className="text-gray-300 mb-4">Are you sure you want to proceed with the withdrawal?</p>
            <div className="mb-4">
              <label htmlFor="withdraw-amount" className="block text-sm font-medium text-gray-400 mb-1">
                Amount (INR)
              </label>
              <input
                type="number"
                id="withdraw-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle withdraw logic here
                  setShowWithdrawModal(false)
                  setAmount("")
                }}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
