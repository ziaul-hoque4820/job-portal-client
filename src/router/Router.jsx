import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/home/Home";
import SignIn from "../pages/register/SignIn";
import Register from "../pages/register/Register";
import JobApplicationPage from "../pages/jobs/JobApplicationPage";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/jobs/:id',
                Component: JobApplicationPage,
                loader: ({params}) => fetch(`http://localhost:3000/jobs/${params.id}`)
            },
            {
                path: 'signin',
                Component: SignIn,
            },
            {
                path: 'register',
                Component: Register,
            },
        ]
    },
]);

export default router;