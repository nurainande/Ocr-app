import React from 'react'
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'

const ResultDetails = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
              <h2 className="text-lg font-medium mb-4">Latest Scan Result</h2>
    
              <div className="space-y-3">
                {/* Mismatch Detected */}
                <div className="flex items-center space-x-3 bg-danger-50 border border-danger-200 p-3 rounded-lg">
                  <FaExclamationTriangle className="text-error-lighter text-xl" />
                  <p className="text-error-light h3-medium">
                    Mismatch detected between product texts.
                  </p>
                </div>
    
                {/* Error in Wording */}
                {/* <div className="flex items-center space-x-3 bg-pawpaw-50 border border-pawpaw-200 p-3 rounded-lg">
                  <FaExclamationTriangle className="text-pawpaw-500 text-xl" />
                  <p className="text-pawpaw-700 font-medium">
                    Potential error in wording found.
                  </p>
                </div> */}
    
                {/* Success Indicator */}
                <div className="flex items-center space-x-3 bg-success border border-success-200 p-3 rounded-lg">
                  <FaCheckCircle className="text-success text-xl" />
                  <p className="text-success-light h3-medium">
                    Scan Completed Successfully
                  </p>
                </div>
              </div>
            </div>
  )
}

export default ResultDetails