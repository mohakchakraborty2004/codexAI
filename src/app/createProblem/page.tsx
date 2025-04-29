"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, AlertCircle, Plus, Trash2 } from "lucide-react"
import { createQues, verifyProblem } from "@/actions/ProbVerification"

export default function CreateProblem() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("Medium")
  //const [reward, setReward] = useState("")
  const [testCases, setTestCases] = useState([{ input: "", output: "" }])
  const [constraints, setConstraints] = useState([""])

  const [isVerified, setIsVerified] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationRemarks, setVerificationRemarks] = useState<string | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<boolean>(false)

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }])
  }

  const handleRemoveTestCase = (index: number) => {
    const newTestCases = [...testCases]
    newTestCases.splice(index, 1)
    setTestCases(newTestCases)
  }

  const handleTestCaseChange = (index: number, field: "input" | "output", value: string) => {
    const newTestCases = [...testCases]
    newTestCases[index][field] = value
    setTestCases(newTestCases)
  }

  const handleAddConstraint = () => {
    setConstraints([...constraints, ""])
  }

  const handleRemoveConstraint = (index: number) => {
    const newConstraints = [...constraints]
    newConstraints.splice(index, 1)
    setConstraints(newConstraints)
  }

  const handleConstraintChange = (index: number, value: string) => {
    const newConstraints = [...constraints]
    newConstraints[index] = value
    setConstraints(newConstraints)
  }

//   const handleVerify = () => {
//     // In a real app, this would send the problem to the backend for verification
    

//     // // Simulate API call with timeout
//     // setTimeout(() => {
//     //   // Validation logic
//     //   const hasTitle = title.trim().length > 0
//     //   const hasDescription = description.trim().length > 0
//     //   const hasValidTestCases = testCases.every((tc) => tc.input.trim() && tc.output.trim())
//     //   const hasValidConstraints = constraints.every((c) => c.trim())
//     //   const hasReward = reward.trim().length > 0

//     //   if (hasTitle && hasDescription && hasValidTestCases && hasValidConstraints && hasReward) {
//     //     setIsVerified(true)
//     //     setVerificationStatus("success")
//     //     setVerificationRemarks("Problem verification successful! Your problem meets all the requirements.")
//     //   } else {
//     //     setIsVerified(false)
//     //     setVerificationStatus("error")

//     //     let remarks = "Please fix the following issues:\n"
//     //     if (!hasTitle) remarks += "- Add a title for your problem\n"
//     //     if (!hasDescription) remarks += "- Add a description for your problem\n"
//     //     if (!hasValidTestCases) remarks += "- Ensure all test cases have both input and output\n"
//     //     if (!hasValidConstraints) remarks += "- Ensure all constraints are filled\n"
//     //     if (!hasReward) remarks += "- Specify a reward amount\n"

//     //     setVerificationRemarks(remarks)
//     //   }

//     //   setIsVerifying(false)
//     // }, 1500)
//   }

//   const handleSubmit = () => {
//     // In a real app, this would submit the problem to the backend
//     alert("Problem submitted successfully!")
//     // Reset form or redirect
//   }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-medium">Create Problem</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Problem Form */}
          <div className="space-y-6">
            {/* Title */}
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-5 border border-gray-800">
              <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                Problem Title*
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter a clear, concise title"
              />
            </div>

            {/* Description */}
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-5 border border-gray-800">
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
                Problem Description*
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Describe the problem in detail. Include the context, requirements, and any special considerations."
              ></textarea>
            </div>

            {/* Difficulty and Reward */}
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-5 border border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-400 mb-1">
                    Difficulty Level*
                  </label>
                  <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Test Cases */}
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-5 border border-gray-800">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-400">Test Cases*</label>
                <button
                  onClick={handleAddTestCase}
                  className="text-xs bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Test Case
                </button>
              </div>

              <div className="space-y-4">
                {testCases.map((testCase, index) => (
                  <div key={index} className="bg-gray-800/50 p-3 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Test Case {index + 1}</span>
                      {testCases.length > 1 && (
                        <button onClick={() => handleRemoveTestCase(index)} className="text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Input</label>
                        <textarea
                          value={testCase.input}
                          onChange={(e) => handleTestCaseChange(index, "input", e.target.value)}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm h-20 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          placeholder="Input value"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Expected Output</label>
                        <textarea
                          value={testCase.output}
                          onChange={(e) => handleTestCaseChange(index, "output", e.target.value)}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm h-20 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          placeholder="Expected output"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Constraints */}
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-5 border border-gray-800">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-400">Constraints*</label>
                <button
                  onClick={handleAddConstraint}
                  className="text-xs bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Constraint
                </button>
              </div>

              <div className="space-y-3">
                {constraints.map((constraint, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={constraint}
                      onChange={(e) => handleConstraintChange(index, e.target.value)}
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                      placeholder={`Constraint ${index + 1} (e.g., "1 <= n <= 10^5")`}
                    />
                    {constraints.length > 1 && (
                      <button onClick={() => handleRemoveConstraint(index)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Remarks */}
            {verificationRemarks && (
              <div
                className={`bg-${verificationStatus ? "green" : "red"}-500/10 backdrop-blur-sm rounded-xl p-5 border border-${verificationStatus ? "green" : "red"}-500/30`}
              >
                <div className="flex items-start gap-3">
                  {verificationStatus ? (
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  )}
                  <div>
                    <h3 className={`font-medium text-${verificationStatus ? "green" : "red"}-400 mb-1`}>
                      {verificationStatus ? "Verification Successful" : "Verification Failed"}
                    </h3>
                    <p className="text-gray-300 whitespace-pre-line">{verificationRemarks}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={async() => {
                    setIsVerifying(true)
                    const msg = await verifyProblem(description);
                    if(msg) {
                        setVerificationStatus(msg.is_valid)
                        setIsVerified(msg.is_valid)
                        setVerificationRemarks(msg.reason)
                    }
                }}
                disabled={isVerifying}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  isVerifying ? "bg-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isVerifying ? "Verifying..." : "Verify Problem"}
              </button>
              <button
                onClick={async() => {
                    const msg = await createQues(title, description, isVerified )
                }}
                disabled={!isVerified}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  !isVerified ? "bg-gray-700 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                Submit Problem
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
