import { useState } from 'react';
import axios from 'axios';
import Input from './Input';
import Checkbox from './Checkbox';
import { getCsrfToken } from 'next-auth/react'; // Menggunakan getCsrfToken dari next-auth/react

const FormTambah = ({ csrfToken }) => {
  const [formData, setFormData] = useState({
    namaKegiatan: '',
    waktuKegiatan: '',
    kelasX: false,
    kelasXI: false,
    kelasXII: false,
    jumlahKehadiran: 0,
  });


  const [formErrors, setFormErrors] = useState({
    namaKegiatan: '',
    waktuKegiatan: '',
    jumlahKehadiran: '',
  });

  const handleCheckboxChange = (name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: !prevData[name],
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.namaKegiatan.trim()) {
      errors.namaKegiatan = 'Nama Kegiatan perlu diisi';
    }
    if (!formData.waktuKegiatan) {
      errors.waktuKegiatan = 'Waktu Kegiatan perlu diisi';
    }
    if (!formData.jumlahKehadiran) {
      errors.jumlahKehadiran = 'Jumlah kehadiran perlu diisi';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/kegiatan/add', formData, {
        headers: {
          'X-CSRF-Token': csrfToken,
          'Accept': application/json,
        },
      });
      
  
      if (response.status === 200) {
        console.log('Data Berhasil Disimpan:', response.data);
        setFormData({
          namaKegiatan: '',
          waktuKegiatan: '',
          kelasX: false,
          kelasXI: false,
          kelasXII: false,
          jumlahKehadiran: 0,
        });
      } else {
        console.error('Gagal Menyimpan Data. Status:', response.status);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  return (
    <div className='lg:col-span-2'>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 my-6 mx-10 px-10 py-10 shadow-lg bg-white'>
          <div className='md:col-span-5'>
            <label htmlFor="nama_kegiatan">Nama Kegiatan</label>
            <Input className={`h-10 active:border-primary border mt-5 rounded w-full bg-gray-50 ${formErrors.namaKegiatan && 'border-red-500'
              }`}
              type='text'
              placeholder='Nama Kegiatan'
              id='nama_kegiatan'
              value={formData.namaKegiatan}
              onChange={(e) =>
                setFormData({ ...formData, namaKegiatan: e.target.value })
              } />
          </div>
          <div className='md:col-span-5'>
            <label htmlFor="waktu_kegiatan">Waktu Kegiatan</label>
            <Input className={`h-10 active:border-primary border mt-5 rounded w-full bg-gray-50 ${formErrors.waktuKegiatan && 'border-red-500'
              }`}
              type='date'
              id='waktu_kegiatan'
              value={formData.waktuKegiatan}
              onChange={(e) => setFormData({ ...formData, waktuKegiatan: e.target.value })} />
          </div>

          <div className='justify-center items-center flex gap-4'>
            <div className='md:col-span-5'>
              <label htmlFor="kelasX">Kelas X</label>
              <Checkbox
                id='kelasX'
                name='kelasX'
                checked={formData.kelasX}
                onChange={() => handleCheckboxChange('kelasX')}
              />
            </div>
            <div className='md:col-span-5'>
              <label htmlFor="kelasXI">Kelas XI</label>
              <Checkbox
                id='kelasXI'
                name='kelasXI'
                checked={formData.kelasXI}
                onChange={() => handleCheckboxChange('kelasXI')}
              />
            </div>
            <div className='md:col-span-5'>
              <label htmlFor="kelasXII">Kelas XII</label>
              <Checkbox
                id='kelasXII'
                name='kelasXII'
                checked={formData.kelasXII}
                onChange={() => handleCheckboxChange('kelasXII')}
              />
            </div>
          </div>


          <div className='md:col-span-5'>
            <label htmlFor="jumlah_kehadiran">Jumlah Kehadiran</label>
            <Input className={`h-10 active:border-primary border mt-5 rounded w-full bg-gray-50 ${formErrors.jumlahKehadiran && 'border-red-500'
              }`}
              type='number'
              placeholder='Jumlah Kehadiran'
              id='jumlah_kehadiran'
              value={formData.jumlahKehadiran}
              onChange={(e) => setFormData({ ...formData, jumlahKehadiran: e.target.value })} />
          </div>
          <button className="bg-primary hover:bg-red-600 w-40 h-12 text-white mt-5 active:bg-red-500 px-4 py-2 text-sm rounded-lg shadow-md mr-3 outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center justify-center"
            type='submit'>
            Tambah Kegiatan
          </button>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      csrfToken: csrfToken || null,
    },
  };
};

export default FormTambah;