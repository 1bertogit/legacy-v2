import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { useStore } from '../../store/useStore'
import { cn } from '../../lib/utils'

export const Layout: React.FC = () => {
  const { sidebarOpen } = useStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.02),transparent_50%)]" />
      </div>

      {/* Main layout */}
      <div className="relative flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className={cn(
          'flex-1 flex flex-col transition-all duration-300 ease-out overflow-hidden',
          sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'
        )}>
          {/* Header */}
          <Header />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto px-4 pb-4">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}