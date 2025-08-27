import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50">
      <AiOutlineLoading3Quarters
        className="animate-spin text-blue-600"
        size={60}
      />
      <p className="mt-4 text-gray-700 font-medium text-lg">{text}</p>
    </div>
  );
};

export default Loading;