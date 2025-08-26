import {FaUser} from "react-icons/fa";

const Header = () => {

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center fi">
        <h1 className="text-xl font-semibold">OCR App</h1>
        <FaUser className="text-2xl text-gray-600" />
    </header>
  );
};

export default Header;
