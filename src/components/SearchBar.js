import React from 'react';

function SearchBar() {
  return (
    <div className='max-w-xs ml-auto shadow-md rounded-md h-full'>
      <div className="relative flex sm:justify-center justify-center w-full h-10 rounded-md bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input disabled
          className="hover:border-none border-none h-full w-full outline-none text-sm"
          type="text"
          id="search"
          placeholder="Search..."
        />
      </div>
    </div>
  );
}

export default SearchBar;
