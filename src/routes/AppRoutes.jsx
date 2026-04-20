import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayer from "../layouts/AuthLayer.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import Landing from "../pages/Landing.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import About from "../pages/About.jsx";
import Blogs from "../pages/Blogs.jsx";
import NotFound from "../pages/NotFound.jsx";
import BlogDetails from "../pages/BlogDetails.jsx";
import Profile from "../pages/Profile.jsx";
import AuthorProfile from "../components/author/AuthorProfile.jsx";
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/*Authentication Layer*/}
                <Route element={<AuthLayer/>}>


                    {/* Public */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected  */}
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Landing />} />
                        <Route path ="profile" element={<Profile/>}/>
                        <Route path="blogs" element={<Blogs />} />
                        <Route path="about" element={<About />} />
                        <Route path="blogs/:slug" element={<BlogDetails />} />
                        <Route path={"/author/:slug"} element={<AuthorProfile />} />
                    </Route>

                </Route>

                <Route path={"*"} element={<NotFound/>}></Route>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
