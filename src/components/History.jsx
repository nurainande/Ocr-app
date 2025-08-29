import React from 'react'
import { FaBalanceScale, FaHistory } from 'react-icons/fa';

const History = ({historyData,setSelectedHistory,setCompareModal}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-4 mb-10 ">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-lg font-medium">History</h2>
                  <p className="text-sm text-gray-500">View your past scans</p>
                </div>
                <FaHistory className="text-3xl text-gray-600" />
              </div>
    
              
              <div className="space-y-3">
                {historyData.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border p-3 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.databaseImg}
                        alt={item.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-sm font-semibold">{item.title}</h3>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedHistory(item);
                        setCompareModal(true);
                      }}
                      className="flex items-center gap-1 px-3 py-1 bg-main text-white text-xs rounded-lg shadow hover:bg-indigo-600 transition"
                    >
                      <FaBalanceScale /> View
                    </button>
                  </div>
                ))}
              </div>
            </div>
  )
}

export default History