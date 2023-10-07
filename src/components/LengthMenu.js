import React from 'react';

function LengthMenu({ entriesPerPage, onEntriesPerPageChange, totalEntries }) {
    const options = [totalEntries];

    return (
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 text-sm text-gray-700">
            <span className="hidden sm:inline">Show</span>
            <div className="relative">
                <select
                    className="rounded-md shadow-md pl-3 pr-10 py-1 border-none appearance-none bg-white cursor-pointer"
                    value={entriesPerPage}
                    onChange={(e) => onEntriesPerPageChange(Number(e.target.value))}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <span className="hidden sm:inline">entries</span>
        </div>
    );
}

export default LengthMenu;
