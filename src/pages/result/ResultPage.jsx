import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContextProvider";
import BackButton from "../../components/ui/BackButton";
import { CompareResult } from "../../components/CompareResult";
import ResultDetails from "../../components/ResultDetails";
import ResultExtractedText from "../../components/ResultExtractedText";

const Result = () => {
  const location = useLocation();
  const { capturedImage } = location.state || {};
  const { extractedText } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <div className="relative bg-light shadow p-4">
        <BackButton />
        <h1 className="text-xl font-semibold text-center">Scan Result</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <CompareResult capturedImage={capturedImage}/> 
        <ResultDetails />   
        <ResultExtractedText extractedText={extractedText} />
      </div>
    </div>
  );
};

export default Result;
