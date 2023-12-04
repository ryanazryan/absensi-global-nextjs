import { useState, useEffect } from 'react';
import Input from './Input';
import Checkbox from './Checkbox';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import axios from 'axios';


const FormEdit = () => {

    const router = useRouter();
    const { id } = router.query;
    const [item, setItem] = useState(null);

    const [formData, setFormData] = useState({
        nama_kegiatan: '',
        waktu_kegiatan: '',
        kelas_x: false,
        kelas_xi: false,
        kelas_xii: false,
        jumlah_kehadiran: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/kegiatan/${id}/edit`);
                const data = await response.json();
                setItem(data);

                setFormData({
                    nama_kegiatan: data.nama_kegiatan,
                    waktu_kegiatan: format(new Date(data.waktu_kegiatan), 'yyyy-MM-dd'),
                    kelas_x: data.kelas_x,
                    kelas_xi: data.kelas_xi,
                    kelas_xii: data.kelas_xii,
                    jumlah_kehadiran: data.jumlah_kehadiran,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, type, checked } = e.target;
        let value = type === 'checkbox' ? checked : e.target.value;

        if (type === 'text' && e.inputType === 'deleteContentBackward') {
            value = value.slice(0, -1);
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8000/api/kegiatan/${id}/update`, formData);

            if (response.status === 200) {
                console.log('Data updated successfully!');
                router.push('/dashboard');
            } else {
                console.error('Failed to update data');
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };


    return (
        <div className='lg:col-span-2'>
            <form onSubmit={handleSubmit}>
                <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 my-6 mx-10 px-10 py-10 shadow-lg bg-white'>
                    <div className='md:col-span-5'>
                        <label htmlFor="nama_kegiatan">Nama Kegiatan</label>
                        <Input
                            className={`h-10 active:border-primary border mt-5 rounded w-full bg-gray-50`}
                            type='text'
                            placeholder='Nama Kegiatan'
                            id='nama_kegiatan'
                            value={formData.nama_kegiatan}
                            onChange={handleChange}
                            name='nama_kegiatan' 
                        />
                    </div>
                    <div className='md:col-span-5'>
                        <label htmlFor="waktu_kegiatan">Waktu Kegiatan</label>
                        <Input
                            className={`h-10 active:border-primary border mt-5 rounded w-full bg-gray-50`}
                            type='date'
                            id='waktu_kegiatan'
                            value={formData.waktu_kegiatan}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='justify-center items-center flex gap-4'>
                        <div className='md:col-span-5'>
                            <label htmlFor="kelasX">Kelas X</label>
                            <Checkbox
                                id='kelasX'
                                name='kelasX'
                                checked={formData.kelas_x}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='md:col-span-5'>
                            <label htmlFor="kelasXI">Kelas XI</label>
                            <Checkbox
                                id='kelasXI'
                                name='kelasXI'
                                checked={formData.kelas_xi}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='md:col-span-5'>
                            <label htmlFor="kelasXII">Kelas XII</label>
                            <Checkbox
                                id='kelasXII'
                                name='kelasXII'
                                checked={formData.kelas_xii}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='md:col-span-5'>
                        <label htmlFor="jumlah_kehadiran">Jumlah Kehadiran</label>
                        <Input
                            className={`h-10 active:border-primary border mt-5 rounded w-full bg-gray-50`}
                            type='number'
                            placeholder='Jumlah Kehadiran'
                            id='jumlah_kehadiran'
                            value={formData.jumlah_kehadiran}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="bg-primary hover:bg-red-600 w-40 h-12 text-white mt-5 active:bg-red-500 px-4 py-2 text-sm rounded-lg shadow-md mr-3 outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center justify-center"
                        type='submit'>
                        Edit Kegiatan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormEdit;
