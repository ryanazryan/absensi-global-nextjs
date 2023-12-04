import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import Input from './Input';
import { useRouter } from 'next/router';
import { backOut } from 'framer-motion';

const KehadiranPage = () => {
    const [nis, setNIS] = useState('');
    const [bukti, setBukti] = useState(null);
    const router = useRouter()
    const { namaKegiatan } = router.query;

    const goToCalendar = () => {
        router.push('/kegiatan')
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setBukti(acceptedFiles[0]);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('nis', nis);
            formData.append('bukti', bukti);

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
                <div className='grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 my-6 mx-2 md:mx-10 px-4 md:px-10 py-10 shadow-lg bg-white'>
                    <div className='flex justify-center mx-auto md:col-span-5'>
                        <h1 className='my-5 font-semibold text-lg'>Data Kehadiran </h1>
                        <h1 className='my-5 font-bold text-lg ml-3'>{namaKegiatan} </h1>
                    </div>
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
                    <div className='flex justify-center mt-5 xs:flex-col'>

                    <button
                        className="bg-primary mr-2 hover:bg-red-600 w-full md:w-40 h-12 text-white mt-5 active:bg-red-500 text-sm rounded-lg shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        type='submit'
                    >
                        Kirim
                    </button>
                    <button
                        onClick={goToCalendar}
                        className="bg-primary ml-2 hover:bg-red-600 w-full md:w-40 h-12 text-white mt-5 active:bg-red-500 text-sm rounded-lg shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        type='button'
                    >
                        Kembali
                    </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default KehadiranPage;
