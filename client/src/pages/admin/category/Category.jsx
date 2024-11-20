import TableSearch from '@/components/TableSearch'
import React from 'react'
import { FaFilter, FaPlusCircle, FaSortAmountDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Category = () => {

    const navigate = useNavigate()

    return (
        <>
            {/* Top */}
            < div className="flex items-center justify-between" >
                <h1 className="hidden md:block text-lg font-semibold">All Categories</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <FaFilter size={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <FaSortAmountDown size={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <FaPlusCircle size={14} onClick={() => navigate('/admin/category/addCategory')} />
                        </button>
                    </div>
                </div>
            </div >

        </>
    )
}

export default Category 