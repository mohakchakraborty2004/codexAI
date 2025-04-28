"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Shield, PlusCircle, Award } from "lucide-react"

const features = [
  {
    title: "Solve to Earn",
    description: "Crack DSA problems. Earn crypto rewards. Every solution brings you closer to real gains.",
    icon: Code,
    color: "bg-gradient-to-br from-green-400 to-green-600",
    shadowColor: "rgba(74, 222, 128, 0.4)",
  },
  {
    title: "AI-Verified Fairness",
    description: "No biased judging — AI agents verify every problem and solution for ultimate fairness.",
    icon: Shield,
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    shadowColor: "rgba(96, 165, 250, 0.4)",
  },
  {
    title: "Create and Monetize Problems",
    description: "Post your own challenges. Earn every time someone tries to solve them.",
    icon: PlusCircle,
    color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    shadowColor: "rgba(250, 204, 21, 0.4)",
  },
  {
    title: "Onchain Skill Reputation",
    description: "Your wins, your skills, your reputation — permanently recorded onchain for the world to see.",
    icon: Award,
    color: "bg-gradient-to-br from-purple-400 to-purple-600",
    shadowColor: "rgba(168, 85, 247, 0.4)",
  },
]

export default function FeatureTimeline() {
  const [activeFeatures, setActiveFeatures] = useState<number[]>([])
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = featureRefs.current.findIndex((ref) => ref === entry.target)
          if (entry.isIntersecting && !activeFeatures.includes(index)) {
            setActiveFeatures((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.3 },
    )

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [activeFeatures])

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Timeline Line */}
      <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600/80 to-purple-800/80 transform md:-translate-x-1/2"></div>

      {/* Features */}
      <div className="space-y-12 md:space-y-24 relative">
        {features.map((feature, index) => {
          const isActive = activeFeatures.includes(index)
          const isEven = index % 2 === 0

          return (
            <div
              key={index}
              //@ts-ignore
              ref={(el) => (featureRefs.current[index] = el)}
              className={`flex flex-col md:flex-row items-start md:items-center gap-6 ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Node */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-800 border-2 border-purple-500 z-10 shadow-lg transition-all duration-500 transform md:translate-x-0 md:translate-y-0">
                <feature.icon
                  className={`w-6 h-6 text-white transition-all duration-500 ${
                    isActive ? "opacity-100" : "opacity-50"
                  }`}
                />
              </div>

              {/* Content */}
              <div
                className={`flex-1 bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 transition-all duration-700 transform ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  boxShadow: isActive ? `0 10px 25px -5px ${feature.shadowColor}` : "none",
                }}
              >
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
