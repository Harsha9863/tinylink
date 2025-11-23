import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function HealthCheckPage() {
  let dbStatus = 'unknown'
  
  try {
    await prisma.$queryRaw`SELECT 1`
    dbStatus = 'connected'
  } catch (error) {
    dbStatus = 'disconnected'
  }

  const startTime = process.env.START_TIME || Date.now().toString()
  const uptime = Math.floor((Date.now() - parseInt(startTime)) / 1000)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">System Health</h1>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Status:</span>
            <span className="text-green-600 font-semibold">OK</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Version:</span>
            <span className="text-gray-900 font-mono">1.0</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Database:</span>
            <span className={dbStatus === 'connected' ? 'text-green-600' : 'text-red-600'}>
              {dbStatus}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Uptime:</span>
            <span className="text-gray-900">{uptime}s</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}

