// const Loading = ({ text = "Loading..." }) => {
//   return (
//     <div className="fixed inset-0 flex flex-col items-center justify-center bg-light  z-50">
//       {/* Replace icon with GIF */}
//       <img
//         src="/snake.gif" // put your gif inside public folder as loader.gif
//         alt="Loading..."
//         className="w-16 h-16"
//       />
//       <p className="mt-4 text-gray-700 font-medium text-lg">{text}</p>
//     </div>
//   );
// };

// export default Loading;


const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-light z-50">
      {/* Purple spinner animation */}
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-secondary-light font-medium text-lg">{text}</p>
    </div>
  );
};

export default Loading;

