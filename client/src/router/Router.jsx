import { createBrowserRouter } from "react-router-dom";
import AdminMain from "@/layout/admin/AdminMain";
import Main from "@/layout/user/Main";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: []
    },
    {
        path: "/admin",
        element: <AdminMain />,
        children: []
    }

])

export default router