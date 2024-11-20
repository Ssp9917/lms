import { Navbar, Sidebar } from '@/pages/admin'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const AdminMain = () => {
  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          to="/admin"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <span className="hidden lg:block font-bold">E-Learning</span>
        </Link>
        <Sidebar />
      </div>

      {/* Main content area */}
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar />
        <div className='p-4 min-h-screen bg-background'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminMain