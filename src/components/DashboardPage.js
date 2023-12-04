import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import LengthMenu from './LengthMenu'
import axiosInstance from '@/lib/axios'
import { useRouter } from 'next/router'

function DashboardPage() {
    const [kegiatan, setKegiatan] = useState([])
    const [detailText, setDetailText] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter()
    const { id, data } = router.query
    const item = data && typeof data === 'string' ? JSON.parse(data) : null;
    const [selectedItem, setSelectedItem] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredKegiatan, setFilteredKegiatan] = useState([]);


    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const checkScreenSize = () => {
        setScreenWidth(window.innerWidth);
        setIsSmallerScreen(window.innerWidth <= 500);
    };



    const [isSmallerScreen, setIsSmallerScreen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [searchInput, setSearchInput] = useState('')

    const setFilteredData = data => {
        setFilteredKegiatan(data);
    };

    const handleSearch = (term) => {
        const filteredItems = kegiatan.filter((item) =>
            item.nama_kegiatan.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredKegiatan(filteredItems);
        setCurrentPage(1); // Reset to the first page after a search
    };

    const handleSearchInputChange = event => {
        setSearchInput(event.target.value);
    };

    const handleEdit = (itemId) => {
        router.push({
            pathname: '/edit',
            query: { id: itemId },
        });
    };

    const handleDelete = (itemId) => {
        // Implement logic for delete action
        console.log('Delete item with id:', itemId);
    };

    const handleClick = () => {
        router.push('/tambah')
    }

    const exportButton = () => {
        const csvData = kegiatan.map(item => `${item.id},${item.nama_kegiatan},${item.waktu_kegiatan},${item.kelas_x},${item.kelas_xi},${item.kelas_xii},${item.jumlah_kehadiran}`);
        const csvString = csvData.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'kegiatan.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };


    const showDetail = (text) => {
        setDetailText(text);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const handleDropdownClick = (itemId) => {
        setOpenDropdownId((prevId) => (prevId === itemId ? null : itemId));
    };



    useEffect(() => {
        setLoading(true);

        const laravelSessionCookie = document.cookie
            .split('; ')
            .find((cookie) => cookie.startsWith('laravel_session='));

        if (laravelSessionCookie) {
            const token = laravelSessionCookie.split('=')[1];
            console.log(token); // Token autentikasi Sanctum
        }

        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/api/kegiatan');
                setKegiatan(response.data);
                setFilteredKegiatan(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    if (loading) {
        return (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white opacity-75 z-50">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Paginate the data based on the current page and items per page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredKegiatan.slice(indexOfFirstItem, indexOfLastItem);

    return (

        <section className="py-1">
            <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-5">
                <div className='flex items-center'>
                    <LengthMenu totalEntries={filteredKegiatan.length} />
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-md rounded mt-8">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className={`relative w-full px-2 max-w-full flex-grow flex-1 ${isSmallerScreen ? 'hidden' : ''}`}>
                                <h3 className="font-medium text-lg text-blueGray-700">Tabel Kegiatan</h3>
                            </div>
                            <div className="flex">
                                <div className="flex-grow">

                                    <button onClick={exportButton} className={`bg-background hover:bg-gray-200 hover:ease-in text-dark active:bg-red-500 px-4 py-2 text-sm rounded-lg shadow-md mr-3 outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center ${isSmallerScreen ? 'mb-3' : ''}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                        </svg>
                                        Ekspor
                                    </button>
                                </div>
                                <div className="flex-grow">
                                    <button onClick={handleClick} className={`bg-primary hover:bg-red-600 text-white active:bg-red-500 px-4 py-2 text-sm rounded-lg shadow-md mr-3 outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center ${isSmallerScreen ? 'mb-3' : ''}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                        </svg>
                                        Tambah Kegiatan
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto text-gray-700">

                        <table className={`items-center bg-transparent w-full border-collapse rounded-lg text-center ${isSmallerScreen ? 'sm:table' : ''}`}>
                            <thead>
                                <tr className='bg-secondary'>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        <div className="flex items-center">
                                            No
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
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
                                            Waktu Kegiatan
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                            </svg>
                                        </div>
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        <div className="flex items-center">
                                            Partisipasi Kelas
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                            </svg>
                                        </div>
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        <div className="flex items-center">
                                            Total Kehadiran
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                            </svg>
                                        </div>
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        <div className="flex items-center">

                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentItems.map((item) => (
                                    <tr className='hover:bg-gray-100 border-b-gray-500 transition duration-200' key={item.id}>
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>{item.id}</td>
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap  text-left'>{item.nama_kegiatan}</td>
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap  text-left'>{item.waktu_kegiatan}</td>
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left'>
                                            {item.kelas_x === 1 && 'X'} {item.kelas_xi === 1 && 'XI'} {item.kelas_xii === 1 && 'XII'}
                                        </td>
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap  text-left'>{item.jumlah_kehadiran}</td>
                                        <td className="px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left">
                                            <div className="relative inline-block text-left">
                                                <button
                                                    type="button"
                                                    className="inline-flex z-0 items-center px-3 py-2 text-sm leading-4 font-medium rounded-md text-black hover:text-gray-700 focus:outline-none focus:border-gray-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-800"
                                                    id={`options-menu-${item.id}`}
                                                    aria-expanded={openDropdownId === item.id}
                                                    onClick={() => handleDropdownClick(item.id)}
                                                >
                                                    <svg class="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                                    </svg>
                                                </button>
                                                {openDropdownId === item.id && (
                                                    <div
                                                        className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                                        role="menu"
                                                        aria-orientation="vertical"
                                                        aria-labelledby={`options-menu-${item.id}`}
                                                    >
                                                        <div className="py-1" role="none">
                                                            <button
                                                                key={item.id}
                                                                onClick={() => handleEdit(item.id)}
                                                                className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                role="menuitem"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(item.id)}
                                                                className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                                role="menuitem"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
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
                            disabled={indexOfLastItem >= kegiatan.length}
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
                                    {Math.min(indexOfLastItem, kegiatan.length)}
                                </span>{' '}
                                dari <span className="font-medium">{kegiatan.length}</span> data
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

                                    {Array.from({ length: Math.ceil(kegiatan.length / itemsPerPage) }).map(
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
                                        disabled={indexOfLastItem >= kegiatan.length}
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
}

export default DashboardPage;