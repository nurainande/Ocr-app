import { useState } from "react";
import ButtomNav from "../../components/ButtomNav";
import History from "../../components/History";
import InitiateScan from "../../components/InitiateScan3";
import TopNav from "../../components/TopNav";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <TopNav />
      <main className="flex-1 p-4 md:w-4/5 lg:w-3/5 mx-auto w-full space-y-4">
        <InitiateScan isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        <History limit={3} />
      </main>
      <ButtomNav isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
