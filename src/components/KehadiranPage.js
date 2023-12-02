import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import Input from './Input';

const KehadiranPage = ({ namaKegiatan }) => {
    const [nis, setNIS] = useState('');
    const [bukti, setBukti] = useState(null);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setBukti(acceptedFiles[0]);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Mengirim gambar ke server menggunakan axios atau metode pengiriman data lainnya
            const formData = new FormData();
            formData.append('nis', nis);
            formData.append('bukti', bukti);

            // Tambahkan logika untuk mengirim data ke server
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRF-Token': csrfToken,
                },
            });

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='lg:col-span-2'>
            <form onSubmit={handleSubmit}>
                <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 my-6 mx-10 px-10 py-10 shadow-lg bg-white'>
                    <h1 className='my-5 font-semibold text-lg'>Data Kehadiran {namaKegiatan}</h1>
                    <div className='md:col-span-5'>
                        <label htmlFor="nis">NIS</label>
                        <Input
                            className={`h-10 active:border-primary border mt-5 rounded w-full bg-gray-50 && 'border-red-500'`}
                            type='text'
                            placeholder='NIS'
                            id='nis'
                            value={nis}
                            onChange={(e) => setNIS(e.target.value)}
                        />
                    </div>
                    <div className='md:col-span-5'>
                        <label htmlFor="bukti" className='block mb-2'>
                            Bukti Kehadiran
                        </label>
                        <div
                            {...getRootProps()}
                            className={`p-4 border-dashed border-2 rounded-md ${isDragActive ? 'border-primary' : 'border-gray-300'
                                }`}
                        >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p>Drop the files here...</p>
                            ) : (
                                <p>Seret file di sini, atau klik untuk memilih file</p>
                            )}
                        </div>
                    </div>
                    <button
                        className="bg-primary hover:bg-red-600 w-40 h-12 text-white mt-5 active:bg-red-500 px-4 py-2 text-sm rounded-lg shadow-md mr-3 outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center justify-center"
                        type='submit'
                    >
                        Kirim
                    </button>
                </div>
            </form>
        </div>
    );
};

export default KehadiranPage;
