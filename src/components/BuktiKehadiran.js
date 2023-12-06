import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LengthMenu from './LengthMenu';
import SearchBar from './SearchBar';

const BuktiKehadiran = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredData = data.filter((item) => {
    return (
      item.nis.toString().includes(searchTerm) ||
      item.nama_kegiatan.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    // Mengambil data dari API Laravel
    axios.get('http://localhost:8000/api/kehadiran')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="py-1">
      <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-5">
        <div className='flex items-center'>
          <LengthMenu totalEntries={data.length} />
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-md rounded mt-8">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="rounded-t mb-0 px-3 -3 border-0 flex items-center justify-between">
              <div className="flex w-full px-2 max-w-full flex-grow flex-1">
                <h3 className="font-medium text-lg text-blueGray-700">Tabel Kehadiran</h3>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto text-gray-700">
            <table className={`items-center bg-transparent w-full border-collapse rounded-lg text-center`}>
              <thead>
                <tr className='bg-secondary'>
                  <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    <div className="flex items-center">
                      ID
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0  0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    <div className="flex items-center">
                      Nama Kegiatan
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    <div className="flex items-center">
                      NIS
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    <div className="flex items-center">
                      Bukti
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                      </svg>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item) => (
                  <tr className={`hover:bg-gray-100 border-b-gray-500 transition duration-200`} key={item.id}>
                    <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>{item.id}</td>
                    <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>{item.nama_kegiatan}</td>
                    <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left'>
                      {item.nis}
                    </td>
                    <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left'>
                      <img
                        src={`http://localhost:8000${item.image_url}`}
                        alt={`Bukti Kehadiran ${item.id}`}
                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-between bg-background px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md shadow-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= data.length}
              className="relative ml-3 inline-flex items-center rounded-md shadow-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-gray-700 mr-4">
                Menampilkan{' '}
                <span className="font-medium">{indexOfFirstItem + 1}</span> sampai{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, data.length)}
                </span>{' '}
                dari <span className="font-medium">{data.length}</span> data
              </p>
              <div className='bg-white py-2 px-3 rounded-md shadow-md'>
                <nav
                  className="isolate inline-flex space-x-3 rounded-md"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-lg px-2 py-2 text-gray-500 bg-pagination hover:bg-blue-100 transition duration-200 ease-out hover:ease-in focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>

                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
                    (number, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`relative ${currentPage === index + 1
                          ? 'z-10 bg-primary text-white'
                          : 'text-gray-900'
                          } inline-flex items-center px-4 py-2 text-sm rounded-lg font-semibold transition duration-100 ease-out hover:ease-in hover:bg-red-600 focus:z-20 focus:outline-offset-0`}
                      >
                        {index + 1}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={indexOfLastItem >= data.length}
                    className="relative inline-flex items-center rounded-lg px-2 py-2 text-gray-500 hover:bg-blue-100 transition duration-200 ease-out hover:ease-in  bg-pagination focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>

                    <svg
                      className="h-5 w-5 transform rotate-180"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuktiKehadiran;
