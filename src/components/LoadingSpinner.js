import React from 'react'
function LoadingSpinner() {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white opacity-75 z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
      </div>
    )
  }
  
  export default LoadingSpinner