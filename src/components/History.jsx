import React from 'react'
import { FaBalanceScale, FaCheckCircle, FaHistory, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { useAppContext } from '../context/AppContextProvider';

const History = () => {
  const {
    historyData,
    compareModal,
    setCompareModal,
    selectedHistory,
    setSelectedHistory,
  } = useAppContext();
  console.log(historyData)
  return (
    <div className="bg-light rounded-2xl shadow-md p-6 mt-4 mb-10 ">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="page-title">History</h2>
            <p className="text-sm text-secondary-lighter">View your past scans</p>
          </div>
          <FaHistory className="text-secondary-light" />
        </div>
    
              
        <div className="space-y-3">
          {historyData.length > 0 ? historyData.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-3 rounded-shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.databaseImg}
                  alt={item.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="history-title">{item.title}</h3>
                  <p className="history-date">{item.date}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedHistory(item);
                  setCompareModal(true);
                }}
                className="action-button flex items-center gap-1 px-3 py-1 text-xs rounded-lg shadow transition"
              >
                <FaBalanceScale /> View
              </button>
            </div>
          )):(
            <p className="text-sm text-secondary-lighter">No history available.</p>
          )}
        </div>
        {/* Compare Modal (Bottom Sheet) */}
              {compareModal && selectedHistory && (
                <div className="fixed inset-x-0 bottom-0 bg-light rounded-t-2xl shadow-lg p-6 z-50">
                  <div className="flex justify-end items-center mb-4">
                    <button
                      onClick={() => setCompareModal(false)}
                      className="text-secondary-lighter hover:text-secondary-700"
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </div>
                  {/* i should have an icon that shows the good sign icon with light green background */}
                  {/* Good sign icon with light green background */}
                  <div className="flex justify-center mb-4">
                    {selectedHistory.matched ? (
                      <div className="bg-success-100 rounded-full p-3 flex items-center justify-center">
                        <FaCheckCircle className="text-success-500 text-3xl" />
                        Image matched
                      </div>
                    ) : (
                      <div className="bg-success-100 rounded-full p-3 flex items-center justify-center">
                        <FaTimesCircle className="text-danger-500 text-3xl" />
                        No match
                      </div>
                    )}
                  </div>
                  {/* if there is a reasonNotMatched, the below ui will display the string  */}
                  {selectedHistory.reasonNotMatched && (
                    <div
                      className="bg-danger-100 border border-danger-400 text-danger-700 px-4 py-3 rounded relative mb-4"
                      role="alert"
                    >
                      <strong className="font-bold">Reason:</strong>
                      <span className="block sm:inline">
                        {selectedHistory.reasonNotMatched}
                      </span>
                    </div>
                  )}
        
                  {/* <h3 className="text-md font-medium mb-2">{selectedHistory.title}</h3> */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <img
                        src={selectedHistory.databaseImg}
                        alt="History"
                        className="rounded-lg shadow max-h-40 mx-auto"
                      />
                      <p className="info-heading mb-2">Database Image</p>
                    </div>
                    <div className="text-center">
                      <img
                        src={ selectedHistory.scannedImg}
                        alt="Captured"
                        className="rounded-lg shadow max-h-40 mx-auto"
                      />
                      <p className="info-heading mb-2">Captured Image</p>
                    </div>
                  </div>
                </div>
              )}
    </div>
  )
}

export default History