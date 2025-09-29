import React from 'react'
import { FaCheckCircle, FaExclamationTriangle, FaBarcode, FaEye } from 'react-icons/fa'

const ResultDetails = ({ scanResult }) => {
  console.log(scanResult)

  // Check if there are discrepancy notes
  const hasDiscrepancies = scanResult?.discrepancy_notes && scanResult.discrepancy_notes.length > 0
  
  // Helper function to get appropriate icon for discrepancy type
  const getDiscrepancyIcon = (type) => {
    switch (type) {
      case 'barcode':
        return <FaBarcode className="text-error-lighter text-xl" />
      case 'ocr_quality':
        return <FaEye className="text-error-lighter text-xl" />
      default:
        return <FaExclamationTriangle className="text-error-lighter text-xl" />
    }
  }

  // Helper function to get background color based on discrepancy type
  const getDiscrepancyStyle = (type) => {
    switch (type) {
      case 'ocr_quality':
        return 'bg-pawpaw-50 border-pawpaw-200'
      case 'barcode':
        return 'bg-danger-50 border-danger-200'
      default:
        return 'bg-danger-50 border-danger-200'
    }
  }

  // Helper function to get text color based on discrepancy type
  const getDiscrepancyTextStyle = (type) => {
    switch (type) {
      case 'ocr_quality':
        return 'text-pawpaw-700'
      case 'barcode':
        return 'text-error-light'
      default:
        return 'text-error-light'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-medium mb-4">Latest Scan Result</h2>

      <div className="space-y-3">
        {hasDiscrepancies ? (
          // Render discrepancy notes when there are issues
          <>
            {scanResult.discrepancy_notes.map((discrepancy, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 p-3 rounded-lg border ${getDiscrepancyStyle(discrepancy.type)}`}
              >
                {getDiscrepancyIcon(discrepancy.type)}
                <div className="flex-1">
                  <p className={`h3-medium ${getDiscrepancyTextStyle(discrepancy.type)}`}>
                    {discrepancy.message}
                  </p>
                  {/* Show confidence score if available */}
                  {discrepancy.confidence && (
                    <p className={`text-sm mt-1 ${getDiscrepancyTextStyle(discrepancy.type)}`}>
                      Confidence: {(discrepancy.confidence * 100).toFixed(1)}%
                    </p>
                  )}
                </div>
              </div>
            ))}
            
            {/* Show OCR text if available for debugging */}
            {scanResult.ocr_text && (
              <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                <p className="text-gray-600 text-sm font-medium mb-2">OCR Text Detected:</p>
                <p className="text-gray-700 text-sm font-mono bg-white p-2 rounded border">
                  {scanResult.ocr_text}
                </p>
              </div>
            )}
          </>
        ) : (
          // Render success message when no discrepancies
          <div className="flex items-center space-x-3 bg-success border border-success-200 p-3 rounded-lg">
            <FaCheckCircle className="text-success text-xl" />
            <p className="text-success-light h3-medium">
              Scan Completed Successfully - Product Match Found {scanResult.product ? `(${scanResult.product.name})` : ''}
            </p>
          </div>
        )}

        {/* Additional scan metadata */}
        <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Status:</span>
              <span className={`ml-2 font-medium capitalize ${
                scanResult.status === 'success' ? 'text-success' : 'text-error-light'
              }`}>
                {scanResult.status}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Scan ID:</span>
              <span className="ml-2 font-medium text-gray-800">#{scanResult.scan_id}</span>
            </div>
            {scanResult.similarity_score && (
              <div>
                <span className="text-gray-600">Match Score:</span>
                <span className="ml-2 font-medium text-gray-800">
                  {(scanResult.similarity_score * 100).toFixed(1)}%
                </span>
              </div>
            )}
            {scanResult.product_match_method && (
              <div>
                <span className="text-gray-600">Match Method:</span>
                <span className="ml-2 font-medium text-gray-800 capitalize">
                  {scanResult.product_match_method.replace('_', ' ')}
                </span>
              </div>
            )}
          </div>
          {/* i want to create an extra ui here to make display all the text details about the scan result */}
          <div className="mt-3 text-sm text-gray-500 italic">
            <i>Note: A match score above 80% generally indicates a strong match. Below are the details of the product matched:</i>
            <div className="mt-2">
              {scanResult.product ? (
                <>
                  <p><span className="font-medium text-gray-800">Product Name:</span> {scanResult.product.name}</p>
                  <p><span className="font-medium text-gray-800">Barcode:</span> {scanResult.product.barcode || 'N/A'}</p>
                  <p><span className="font-medium text-gray-800">Expected Verbiage:</span> {scanResult.product.expected_verbage || 'N/A'}</p>
                </>
              ) : (
                <p className="text-error-light">No matching product found in the database.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultDetails