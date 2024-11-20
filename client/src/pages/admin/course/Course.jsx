import { useGetAllCourseQuery } from '@/api/courseSlice'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { Badge } from '@/components/ui/badge'
import React from 'react'
import { FaEdit, FaFilter, FaPlusCircle, FaSortAmountDown } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

const Course = () => {

    const navigate = useNavigate()

    const { data, isLoading } = useGetAllCourseQuery();

    const courseData = data?.courses || []

    const handleDelete = () => {

    }

    const columns = [
        { header: "S.no", accessor: "S.no", className: "hidden md:table-cell" },
        { header: "Course Name", accessor: "courseName", className: "hidden md:table-cell" },
        { header: "Price", accessor: "price", className: "hidden md:table-cell" },
        { header: "Status", accessor: "status", className: "hidden md:table-cell" },
        { header: "Actions", accessor: "action", className: "hidden md:table-cell" },
    ];


    const renderRow = (course, index) => (
        <tr
            key={course._id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
        >
            <td className=" pl-3">{index + 1}</td> {/* Serial Number */}
            <td className="flex items-center gap-4 p-4">
                {/* <img
                    src={backendUrl + '/' + course.categoryImage}
                    alt=""
                    width={40}
                    height={40}
                    className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
                /> */}
                <div className="flex flex-col">
                    <h3 className="font-semibold">{course.courseTitle}</h3>
                </div>
            </td>
            <td>
                {course?.coursePrice || "NA"}
            </td>
            <td><Badge>{course.isPublished ? "Published" : "Draft"}</Badge></td>
            <td>
                <div className="flex items-center gap-2">
                    <button className="h-7 gap-2 w-full flex items-center  rounded-full bg-lamaSky">
                        <Link to={`/admin/course/editCourse/${course._id}`}> <FaEdit size={16} /></Link>
                        {/* <Link onClick={() => handleDelete(course._id)}><MdDeleteForever size={16} /></Link> */}
                    </button>
                </div>
            </td>
        </tr>
    );

    return (
        <>
            {/* Top */}
            < div className="flex items-center justify-between" >
                <h1 className="hidden md:block text-lg font-semibold">All Courses</h1>
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
                            <FaPlusCircle size={14} onClick={() => navigate('/admin/course/addCourse')} />
                        </button>
                    </div>
                </div>
            </div >

            {/* Table */}
            <Table columns={columns} renderRow={renderRow} data={courseData} />

        </>
    )
}

export default Course