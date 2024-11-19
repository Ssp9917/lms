import { Footer, Navbar } from '@/pages/user'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Main = () => {


    return (
        <div className="bg-white h-full ">
            <div className='max-w-[1280px] mx-auto'>
                <Navbar />
                <div className="pt-16">
                    <Outlet />
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    )
}

export default Main