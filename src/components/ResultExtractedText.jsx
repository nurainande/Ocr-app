import React from 'react'

const ResultExtractedText = ({extractedText}) => {
  return (
    <>
      {extractedText && (
        <div className="bg-light rounded-xl shadow p-4">
          <h2 className="text-lg font-medium mb-2">Extracted Text</h2>
          <div className="bg-secondary-100 rounded-lg p-3 max-h-60 overflow-y-auto">
            <p className="text-secondary-700 whitespace-pre-wrap text-sm">
              {extractedText}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ResultExtractedText