import React from 'react'
import { CiSearch } from "react-icons/ci";

const TableSearch = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
            <CiSearch size={14} />
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[200px] p-2 bg-transparent outline-none"
            />
        </div>
    )
}

export default TableSearch