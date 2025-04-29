import Link from "next/link"
import { Twitter, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900/80 backdrop-blur-sm py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section - 1/4 of space */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold mb-4 flex  justify-center items-center">
            <img className="h-14 w-15" src="./codex.png" alt="" />
              AI
              </div>
            <p className="text-gray-400 text-sm">
              The future of DSA problem solving with crypto rewards and AI verification.
            </p>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://x.com/codxai"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/mohakchakraborty2004/codexAI"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* FAQs */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">FAQs</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-1">How do I earn crypto?</h4>
                <p className="text-gray-400 text-sm">
                  Solve DSA problems on our platform, and you'll earn crypto rewards based on the difficulty level and
                  your solution's efficiency.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Is my coding reputation really stored on-chain?</h4>
                <p className="text-gray-400 text-sm">
                  Yes! Your achievements, solutions, and reputation are permanently recorded on the blockchain, creating
                  a verifiable portfolio of your skills.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">How does AI verify solutions?</h4>
                <p className="text-gray-400 text-sm">
                  Our AI system analyzes your code for correctness, efficiency, and originality, ensuring fair
                  evaluation without human bias.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} CodexAI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
