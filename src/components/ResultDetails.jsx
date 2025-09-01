import React from 'react'
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'

const ResultDetails = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-lg font-medium mb-4">Latest Scan Result</h2>
    
              <div className="space-y-3">
                {/* Mismatch Detected */}
                <div className="flex items-center space-x-3 bg-danger-50 border border-danger-200 p-3 rounded-lg">
                  <FaExclamationTriangle className="text-danger-500 text-xl" />
                  <p className="text-danger-700 font-medium">
                    Mismatch detected between product texts.
                  </p>
                </div>
    
                {/* Error in Wording */}
                <div className="flex items-center space-x-3 bg-pawpaw-50 border border-pawpaw-200 p-3 rounded-lg">
                  <FaExclamationTriangle className="text-pawpaw-500 text-xl" />
                  <p className="text-pawpaw-700 font-medium">
                    Potential error in wording found.
                  </p>
                </div>
    
                {/* Success Indicator */}
                <div className="flex items-center space-x-3 bg-success-50 border border-success-200 p-3 rounded-lg">
                  <FaCheckCircle className="text-success-500 text-xl" />
                  <p className="text-success-700 font-medium">
                    Scan Completed Successfully
                  </p>
                </div>
              </div>
            </div>
  )
}

export default ResultDetails