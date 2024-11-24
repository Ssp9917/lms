import { createBrowserRouter } from "react-router-dom";
import AdminMain from "@/layout/admin/AdminMain";
import Main from "@/layout/user/Main";
import { Courses, HeroSection, Login, SearchPage } from "@/pages/user";
import CourseDetail from "@/pages/user/CourseDetail";
import { AddCategory, AddCourse, Category, Course, CreateLeacture, EditCategory, EditCourse, EditLeacture, ViewCourse } from "@/pages/admin";




const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "",
                element: <>
                    <HeroSection />
                    <Courses />
                </>
            },
            {
                path: "course-detail/:courseId",
                element: <CourseDetail />
            },
            {
                path:"course/search",
                element:<SearchPage/>
            },
            {
                path: "login",
                element: <Login />
            }
        ]
    },
    {
        path: "admin",
        element: <AdminMain />,
        children: [
            {
                path: "course",
                element: <Course />
            },
            {
                path: "course/addCourse",
                element: <AddCourse />
            },
            {
                path: "course/editCourse/:courseId",
                element: <EditCourse />
            },
            {
                path: "course/editCourse/:courseId/lecture",
                element: <CreateLeacture />
            },
            {
                path:"course/editCourse/:courseId/lecture/:lectureId",
                element:<EditLeacture/>
            },
            {
                path:"course/viewCourse/:id",
                element:<ViewCourse/>
            },
            {
                path:"category",
                element:<Category/>
            },
            {
                path:"category/addCategory",
                element:<AddCategory/>
            },
            {
                path:"category/editCategory/:id",
                element:<EditCategory/>
            }

        ]
    }

])

export default router