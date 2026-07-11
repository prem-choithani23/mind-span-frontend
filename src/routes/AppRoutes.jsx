import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayer from "../layouts/AuthLayer.jsx";
import ProtectedRoute from "../layouts/ProtectedRoute.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import Landing from "../pages/Landing.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import About from "../pages/About.jsx";
import Blogs from "../pages/Blogs.jsx";
import NotFound from "../pages/NotFound.jsx";
import BlogDetails from "../pages/BlogDetails.jsx";
import Profile from "../pages/Profile.jsx";
import CreatePost from "../pages/CreatePost.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx"
import AuthorProfilePage from "../pages/AuthorProfilePage.jsx"

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Auth page guard — redirects logged-in users away from login/register */}
                <Route element={<AuthLayer />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* Public routes */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Landing />} />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path="/create-post" element={<CreatePost/>}/>
                    <Route path="blogs/:slug" element={<BlogDetails />} />
                    <Route path="about" element={<About />} />
                    <Route path="author/:id" element={<AuthorProfilePage />} />

                    {/* Protected routes — require login */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="profile" element={<Profile />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                        <Route path="admin" element={<AdminDashboard />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;