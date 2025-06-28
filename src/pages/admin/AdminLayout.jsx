import { Link, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContextProvider";

const AdminLayout = () => {
      const {userAuth}= useAppContext();
      console.log('User',userAuth)
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md p-4">
        <h3>{userAuth.fullName}</h3>
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Nurray Admin</h2>
        <nav className="space-y-3">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/admin" className="block text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <Link
            to="/admin/add-blog"
            className="block text-gray-700 hover:text-blue-600"
          >
            Add Blog
          </Link>
          <Link
            to="/admin/projects"
            className="block text-gray-700 hover:text-blue-600"
          >
            Manage Projects
          </Link>
          {/* Add more links as needed */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
