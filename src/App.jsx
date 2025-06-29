import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Products from "./pages/Products";
import BlogsTest from "./pages/BlogsTest";
// import Blogs from "./pages/Blogs";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
// import AddBlogTest from "./pages/admin/AddBlogTest";
import AddBlogWithEditorJs from "./pages/admin/AddBlogWithEditorJs";


// import ManageProjects from "./pages/admin/ManageProjects";
import AuthPage from "./pages/AuthPage";
import { useAppContext } from "./context/AppContextProvider";
import SingleBlog from "./pages/SingleBlog";
import AddProject from "./pages/admin/AddProject";
import ProtectedRoute from "./utils/ProtectedRoute";
import Blogs from "./pages/Blogs";

function App() {
  const {BACKEND_URL} = useAppContext()
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/products" element={<Products />} />
        <Route path="/blogs" element={<Blogs />} />
        {/* <Route path="/blogs" element={<BlogsTest />} /> */}
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-blog" element={<AddBlogWithEditorJs />} />
          <Route path="projects" element={<AddProject />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
