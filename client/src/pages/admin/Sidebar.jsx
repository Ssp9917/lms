import React from 'react'
import { Link } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { FileVideo2 } from 'lucide-react';
import { FaUsersRectangle } from "react-icons/fa6";

const Sidebar = () => {

    const menuItems = [
        {
            title: "MENU",
            items: [
                {
                    label: "Dashboard",
                    href: "/admin",
                    icon: <MdDashboard />
                },
                {
                    label:"Courses",
                    href:"/admin/course",
                    icon:<FileVideo2 size={16}/>
                },
                {
                    label: "Category",
                    href: "/admin/category",
                    icon: <TbCategoryPlus />
                },
                {
                    label: "Students",
                    href: "/admin/users",
                    icon: <FaUsersRectangle />
                }
            ],
        },
    ];

    return (
        <div className="mt-4 text-sm">
            {menuItems.map((i) => (
                <div className="flex flex-col gap-2" key={i.title}>
                    <span className="hidden lg:block text-gray-400 font-light my-4">
                        {i.title}
                    </span>
                    {i.items.map((item) => (
                        <Link
                            to={item.href} // Corrected prop to "to"
                            key={item.label}
                            className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-gray-200"
                        >
                            {item.icon}
                            <span className="hidden lg:block">{item.label}</span>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Sidebar