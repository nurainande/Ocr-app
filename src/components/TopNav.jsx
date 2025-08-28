import {FaUser} from "react-icons/fa";

const TopNav = () => {

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Oscan</h1>
        <div className="user flex">
          <span className="mr-2 text-gray-700">User</span>
          <FaUser className="text-2xl text-gray-600" />
        </div>
    </header>
  );
};

export default TopNav;
