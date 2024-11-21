import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import Course from './Course';
import { useGetPublishedCourseQuery } from '@/api/courseSlice';

const Courses = () => {
    // const data ={
    //      courses: [
    //         {
    //           _id: "1",
    //           courseThumbnail: "https://via.placeholder.com/300x150",
    //           courseTitle: "React for Beginners",
    //           creator: {
    //             name: "John Doe",
    //             photoUrl: "https://via.placeholder.com/50",
    //           },
    //           courseLevel: "Beginner",
    //           coursePrice: 499,
    //         },
    //         {
    //           _id: "2",
    //           courseThumbnail: "https://via.placeholder.com/300x150",
    //           courseTitle: "Mastering Node.js",
    //           creator: {
    //             name: "Jane Smith",
    //             photoUrl: "https://via.placeholder.com/50",
    //           },
    //           courseLevel: "Intermediate",
    //           coursePrice: 799,
    //         },
    //         {
    //           _id: "3",
    //           courseThumbnail: "https://via.placeholder.com/300x150",
    //           courseTitle: "Full-Stack Development Bootcamp",
    //           creator: {
    //             name: "Mike Johnson",
    //             photoUrl: "https://via.placeholder.com/50",
    //           },
    //           courseLevel: "Advanced",
    //           coursePrice: 999,
    //         },
    //         {
    //           _id: "4",
    //           courseThumbnail: "https://via.placeholder.com/300x150",
    //           courseTitle: "JavaScript Essentials",
    //           creator: {
    //             name: "Emily Davis",
    //             photoUrl: "https://via.placeholder.com/50",
    //           },
    //           courseLevel: "Beginner",
    //           coursePrice: 299,
    //         },
    //         {
    //           _id: "5",
    //           courseThumbnail: "https://via.placeholder.com/300x150",
    //           courseTitle: "CSS for Modern Web Design",
    //           creator: {
    //             name: "Chris Lee",
    //             photoUrl: "https://via.placeholder.com/50",
    //           },
    //           courseLevel: "Intermediate",
    //           coursePrice: 499,
    //         },
    //       ]
    // }

    const {data, isLoading, isError} = useGetPublishedCourseQuery();

    console.log(data)
 
    if(isError) return <h1>Some error occurred while fetching courses.</h1>

    return (
        <div className="bg-gray-50 dark:bg-[#141414]">
            <div className="max-w-7xl mx-auto p-6">
                <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isLoading ? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <CourseSkeleton key={index} />
                        ))
                    ) : (
                        data?.courses && data.courses.map((course, index) => <Course key={index} course={course} />)
                    )}
                </div>
            </div>
        </div>
    )
}

export default Courses

const CourseSkeleton = () => {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
            <Skeleton className="w-full h-36" />
            <div className="px-5 py-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-1/4" />
            </div>
        </div>
    );
};