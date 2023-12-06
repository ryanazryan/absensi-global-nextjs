import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './SearchBar'
import LengthMenu from './LengthMenu'

const SiswaPage = () => {
  const [siswa, setSiswa] = useState([])
  const [filteredSiswa, setFilteredSiswa] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [kelas, setKelas] = useState({})


  const setFilteredData = (data) => {
    setFilteredSiswa(data)
  }


  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm)
  
    const filteredData = siswa.filter((siswaData) => {
      const nameMatch = siswaData.name.toLowerCase().includes(searchTerm.toLowerCase())
      const nisMatch = siswaData.nis.toString().includes(searchTerm)
      const jurusanMatch = kelas[siswaData.id_kelas]
        ? kelas[siswaData.id_kelas].jurusan.toLowerCase().includes(searchTerm.toLowerCase())
        : false
  
      return nameMatch || nisMatch || jurusanMatch
    })
  
    setFilteredSiswa(filteredData)
    setCurrentPage(1)
  }
  


  useEffect(() => {
    const fetchSiswaData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/siswa')
        const data = await response.json()
        setSiswa(data)
        setFilteredSiswa(data)
      } catch (error) {
        console.error('Error fetching siswa data:', error)
      }
    }
  
    fetchSiswaData()
  }, [])
  

  useEffect(() => {
    const fetchKelasData = async (idKelas) => {
      try {
        const response = await fetch(`http://localhost:8000/api/kelas/${idKelas}`)
        const data = await response.json()
        setKelas((prevKelas) => ({
          ...prevKelas,
          [idKelas]: {
            nama_kelas: data.nama_kelas,
            jurusan: data.jurusan,
          },
        }))
      } catch (error) {
        console.error('Error fetching kelas data:', error)
      }
    }

    siswa.forEach((siswaData) => {
      fetchKelasData(siswaData.id_kelas)
    })
  }, [siswa])

  const exportButton = () => {
    const csvData = siswa.map((item) => `${item.id},${item.nis},${item.name},${item.id_kelas}`)
    const csvString = csvData.join('\n')
    const blob = new Blob([csvString], { type: 'text/csvcharset=utf-8' })
    const link = document.createElement('a')
  
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'siswa.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
  



  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredSiswa.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <section className="py-1">
      <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-5">
        <div className='flex items-center'>
          <LengthMenu totalEntries={filteredSiswa.length} />
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-md rounded mt-8">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="rounded-t mb-0 px-3 -3 border-0 flex items-center justify-between">
              <div className="flex w-full px-2 max-w-full flex-grow flex-1">
                <h3 className="font-medium text-lg text-blueGray-700">Tabel Siswa</h3>
              </div>
              <div className="flex items-center">
                <div className="flex-grow">
                  <button onClick={exportButton} className={`bg-background hover:bg-gray-200 hover:ease-in text-dark active:bg-red-500 px-4 py-2 text-sm rounded-lg shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 flex items-end}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    Ekspor
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="block w-full overflow-x-auto text-gray-700">

            <table className={`items-center bg-transparent w-full border-collapse rounded-lg text-center`}>
              <thead>
                <tr className='bg-secondary'>
                  <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    <div className="flex items-center">
                      No
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0  0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    <div className="flex items-center">
                      Nama Siswa
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
                      Kelas
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    <div className="flex items-center">
                      Jurusan
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                      </svg>
                    </div>
                  </th>

                </tr>
              </thead>

              <tbody>
                {currentItems.map((siswaData) => (
                  <tr className={`hover:bg-gray-100 border-b-gray-500 transition duration-200`} key={siswaData.id}>
                    <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>{siswaData.id}</td>
                    <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left'>
                      {siswaData.name}
                    </td>
                    <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left'>{siswaData.nis}</td>
                    <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left'>
                      {kelas[siswaData.id_kelas] ? kelas[siswaData.id_kelas].nama_kelas : 'Nama Kelas Tidak Tersedia'}
                    </td>
                    <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left'>
                      {kelas[siswaData.id_kelas] ? kelas[siswaData.id_kelas].jurusan : 'Jurusan Tidak Tersedia'}
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
              disabled={indexOfLastItem >= siswa.length}
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
                  {Math.min(indexOfLastItem, siswa.length)}
                </span>{' '}
                dari <span className="font-medium">{siswa.length}</span> data
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

                  {Array.from({ length: Math.ceil(siswa.length / itemsPerPage) }).map(
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
                    disabled={indexOfLastItem >= siswa.length}
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
  )
}

export default SiswaPage
