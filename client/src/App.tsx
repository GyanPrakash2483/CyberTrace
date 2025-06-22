import { MatrixRainingLetters } from 'react-mdr'
import { Shield, AlertTriangle } from 'lucide-react'
import TargetForm from './components/TargetForm'

function App() {
  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* Matrix background */}
      <MatrixRainingLetters custom_class="fixed inset-0 w-full h-full z-0 opacity-20" />
      {/* Content goes here, above the matrix */}
      <div className="relative z-20 flex flex-col items-center min-h-screen">
        {/* SVG gradient definition for the shield icon */}
        <svg width="0" height="0">
          <linearGradient id="shield-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </svg>
        {/* Header */}
        <header className="w-full flex flex-col items-center pt-16 pb-4 select-none">
          <div className="flex items-center space-x-6">
            <Shield size={56} stroke="url(#shield-gradient)" style={{ strokeWidth: 2.5 }} />
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 tracking-tight">
              CyberTrace
            </h1>
          </div>
          <div className="mt-6 text-xl text-gray-200 text-center max-w-2xl">
            Advanced Social Intelligence Platform - Discover linked accounts through sophisticated data correlation
          </div>
          <div className="mt-2 flex items-center text-yellow-400 text-base font-medium">
            <AlertTriangle className="mr-2" size={20} />
            For authorized security research only
          </div>
        </header>
        {/* Form Card */}
        <TargetForm />
      </div>
    </div>
  )
}

export default App
