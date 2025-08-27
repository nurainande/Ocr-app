import {FaUser} from "react-icons/fa";

const Header = () => {

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center fi">
        <h1 className="text-xl font-semibold">Oscan</h1>
        <div className="user flex">
          <span className="ml-2 text-gray-700">User</span>
          <FaUser className="text-2xl text-gray-600" />
        </div>
    </header>
  );
};

export default Header;
