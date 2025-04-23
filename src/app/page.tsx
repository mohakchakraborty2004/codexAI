import Link from "next/link"
import { RefreshCw } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-xl font-bold">CodexAI</div>

        <nav className="hidden md:block">
          <div className="bg-[#1e1e1e] rounded-full px-4 py-2">
            <ul className="flex space-x-6">
              <li>
                <Link href="#" className="text-white opacity-90 hover:opacity-100">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 hover:text-white/90">
                  Work
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 hover:text-white/90">
                  Expertise
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 hover:text-white/90">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 hover:text-white/90">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="flex items-center space-x-3">
          <Link href="#" className="text-white/90 hover:text-white">
            Login
          </Link>
          <Link href="#" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full">
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-12 pb-24 relative">
        {/* Gradient Circle Effect */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-xl animate-pulse-slow"
          style={{
            background:
              "radial-gradient(circle at center, rgba(149, 76, 233, 0.5) 0%, rgba(56, 189, 170, 0.5) 70%, transparent 100%)",
          }}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Earn by solving problems
            <br />
            with crypto
          </h1>

          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            CodexAI is a dsa solving platform where you can solve and earn rewards where solutions and problems are
            curated by AI.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.6)]">
              Learn More
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full flex items-center gap-2 border border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.4)]">
              Connect Wallet
            </button>
          </div>

          {/* Analytics Cards */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Center Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-800/50 rounded-full flex items-center justify-center z-10 animate-pulse">
              <RefreshCw className="text-purple-300 w-8 h-8 animate-spin-slow" />
            </div>

            {/* Problems Solved Card */}
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.3)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-400"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Problems Solved</div>
                  <div className="text-sm text-gray-400">Total: 12,450</div>
                </div>
              </div>
              <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs font-medium">+18%</div>
            </div>

            {/* Rewards Earned Card */}
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.3)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-yellow-400"
                  >
                    <circle cx="12" cy="12" r="8"></circle>
                    <path d="M12 8v8"></path>
                    <path d="M8 12h8"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Rewards Earned</div>
                  <div className="text-sm text-gray-400">Total: 2,345 ETH</div>
                </div>
              </div>
              <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs font-medium">+25%</div>
            </div>

            {/* Active Users Card */}
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.3)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-400"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Active Users</div>
                  <div className="text-sm text-gray-400">Monthly: 8,750</div>
                </div>
              </div>
              <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs font-medium">+12%</div>
            </div>

            {/* Success Rate Card */}
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_15px_rgba(138,43,226,0.3)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-400"
                  >
                    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Success Rate</div>
                  <div className="text-sm text-gray-400">Average: 76.5%</div>
                </div>
              </div>
              <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs font-medium">+8%</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
