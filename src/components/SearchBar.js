import React, { useState } from 'react'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event) => {
    const term = event.target.value
    setSearchTerm(term)
    // Call the onSearch callback with the search term
    onSearch(term)
  }

  return (
    <div className="max-w-xs ml-auto relative">
      <div className="flex items-center rounded-md bg-white shadow-md">
        <div className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          className="p-2 flex-grow h-full w-full outline-none text-sm focus:outline-none border-none transition duration-50 active:border-primary"
          type="text"
          id="search"
          placeholder="Cari..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  )
}

export default SearchBar
