import React, { useEffect, useState } from 'react';

function DashboardPage() { // Rename the component to "DashboardPage"
    const [kegiatan, setKegiatan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make a GET request to your Laravel API endpoint
        fetch('http://localhost:8000/api/kegiatan') // Check if this URL is correct
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok, status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setKegiatan(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
                console.error('Error fetching data:', error);
            });
    }, []);



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (

        <section className="py-1">
            <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div class="relative text-dark">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button type="submit" class="p-1 rounded">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </span>
                    <input type="search" name="" class="py-2 text-sm text-white focus:ring-primary rounded-md  border-transparent shadow-md pl-10 focus:text-gray-900" placeholder="Search..." autocomplete="off"></input>
                </div>
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-md rounded mt-8">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-2 max-w-full flex-grow flex-1">
                                <h3 className="font-medium text-lg text-blueGray-700">Tabel Kegiatan</h3>
                            </div>
                            <div className="flex">
                                <div className="flex-grow">
                                    <button className="bg-background text-dark active:bg-red-500 px-4 py-3 rounded-lg shadow-md mr-3 outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                        </svg>
                                        Export
                                    </button>
                                </div>
                                <div className="flex-grow">
                                    <button className="bg-primary text-white active:bg-red-500 px-4 py-3 rounded-lg shadow-md mr-3 outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                                        </svg>

                                        Tambah Kegiatan
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto text-gray-700">
                        <table className="items-center bg-transparent w-full border-collapse rounded-lg text-center">
                            <thead>
                                <tr className='bg-[#FCFCFD]'>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        <div className="flex items-center">
                                            No
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                            </svg>
                                        </div>
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        <div className="flex items-center">
                                            Nama Kegiatan
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                            </svg>
                                        </div>
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        <div className="flex items-center">
                                            Waktu Kegiatan
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                            </svg>
                                        </div>
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        <div className="flex items-center">
                                            Partisipasi Kelas
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                            </svg>
                                        </div>
                                    </th>
                                    <th className="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        <div className="flex items-center">
                                            Total Kehadiran
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3 ml-1">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                            </svg>
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    {kegiatan.map((kegiatan) => (
                                        <th className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold text-left' key={kegiatan.id}>{kegiatan.id}</th>
                                    ))}

                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap  text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap  text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap  text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap  text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}

                                </tr>
                                <tr>
                                    {kegiatan.map((kegiatan) => (
                                        <th className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold text-left' key={kegiatan.id}>{kegiatan.id}</th>
                                    ))}

                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                </tr>
                                <tr>
                                    {kegiatan.map((kegiatan) => (
                                        <th className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold text-left' key={kegiatan.id}>{kegiatan.id}</th>
                                    ))}

                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                </tr>
                                <tr>
                                    {kegiatan.map((kegiatan) => (
                                        <th className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold text-left' key={kegiatan.id}>{kegiatan.id}</th>
                                    ))}

                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                </tr>
                                <tr>
                                    {kegiatan.map((kegiatan) => (
                                        <th className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold text-left' key={kegiatan.id}>{kegiatan.id}</th>
                                    ))}

                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                </tr>
                                <tr>
                                    {kegiatan.map((kegiatan) => (
                                        <th className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold text-left' key={kegiatan.id}>{kegiatan.id}</th>
                                    ))}

                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                    {kegiatan.map((kegiatan) => (
                                        <td className='px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap text-left' key={kegiatan.id}>{kegiatan.nama}</td>
                                    ))}
                                </tr>

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

        </section>

    );
}

export default DashboardPage; // Update the export statement
