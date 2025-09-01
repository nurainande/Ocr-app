// import { useAppContext } from "../../context/AppContextProvider";
import History from "../../components/History";
import BackButton from "../../components/ui/BackButton";

const HistoryPage = () => {
  // const { historyData, setSelectedHistory, setCompareModal } = useAppContext();
  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      {/* Header with Back button */}
      <div className="relative bg-light shadow p-4">
        <BackButton />
        <h1 className="text-xl font-semibold text-center">History</h1>
      </div>
      <History
      />
    </div>
  );
};

export default HistoryPage;
