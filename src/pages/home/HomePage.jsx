import ButtomNav from "../../components/ButtomNav";
import History from "../../components/History";
import InitiateScan from "../../components/InitiateScan";
import TopNav from "../../components/TopNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <TopNav />
      <main className="flex-1 p-4 md:w-4/5 lg:w-3/5 mx-auto w-full space-y-4">
        <InitiateScan />
        <History />
      </main>
      <ButtomNav />
    </div>
  );
}
