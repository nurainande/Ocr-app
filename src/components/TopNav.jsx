import {FaUser} from "react-icons/fa";

const TopNav = () => {

  return (
    <header className="bg-light shadow-md p-4 flex justify-between items-center">
        <h1 className="logo-heading">Oscan</h1>
        <div className="user flex">
          <span className="mr-2 text-secondary-light">User</span>
          <FaUser />
        </div>
    </header>
  );
};

export default TopNav;
