import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router'
import axios from 'axios'
import Input from './Input'
import Checkbox from './Checkbox'
import Button from './Button'

const FormTambah = () => {

  const [csrfToken, setCsrfToken] = useState('');
  const [namaKegiatan, setNamaKegiatan] = useState('');
  const [waktuKegiatan, setWaktuKegiatan] = useState('');
  const [kelasX, setKelasX] = useState(false);
  const [kelasXI, setKelasXI] = useState(false);
  const [kelasXII, setKelasXII] = useState(false);
  const [jumlahKehadiran, setJumlahKehadiran] = useState(0);


  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/api/csrf-token');
        setCsrfToken(response.data.csrfToken);
        console.log(csrfToken); // Tambahkan ini untuk mengecek token CSRF
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
  
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const data = {
      nama_kegiatan: namaKegiatan,
      waktu_kegiatan: waktuKegiatan,
      kelas_x: kelasX,
      kelas_xi: kelasXI,
      kelas_xii: kelasXII,
      jumlah_kehadiran: jumlahKehadiran,
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/api/kegiatan/add',
        data,
        {
          headers: {
            'X-CSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
          },
        }
      )      
  
      if (response.status === 200) {
        console.log('Data Berhasil Disimpan:', response.data);
        // You can add additional logic here if needed
      } else {
        console.error('Gagal Menyimpan Data');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };

  return (
    <div className='lg:col-span-2'>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 my-6 mx-10 px-10 py-10 shadow-lg bg-white'>
          <div className='md:col-span-5'>
            <label for="nama_kegiatan">Nama Kegiatan</label>
            <Input className="h-10 active:border-primary border mt-5 rounded w-full bg-gray-50" type='text' placeholder='Nama Kegiatan' id='nama_kegiatan'
              value={namaKegiatan}
              onChange={(e) => setNamaKegiatan(e.target.value)} />
          </div>
          <div className='md:col-span-5'>
            <label for="waktu_kegiatan">Waktu Kegiatan</label>
            <Input className="h-10 border mt-5 rounded  w-full bg-gray-50" type='date' id='waktu_kegiatan'
              value={waktuKegiatan}
              onChange={(e) => setWaktuKegiatan(e.target.value)} />
          </div>
          <div className='justify-center items-center flex gap-4'>
            <div className='md:col-span-5'>
              <label for="kelas_x">Kelas X</label>
              <Checkbox id='kelas_x' name='kelas_x'
                checked={kelasX}
                onChange={() => setKelasX(!kelasX)} />
            </div>
            <div className='md:col-span-5'>
              <label for="kelas_x" className=''>Kelas XI</label>
              <Checkbox id='kelas_xi' name='kelas_xi'
                checked={kelasXI}
                onChange={() => setKelasXI(!kelasXI)} />
            </div>
            <div className='md:col-span-5'>
              <label for="kelas_x">Kelas XII</label>
              <Checkbox id='kelas_xii' name='kelas_xii'
                checked={kelasXII}
                onChange={() => setKelasXII(!kelasXII)} />
            </div>
          </div>
          <div className='md:col-span-5'>
            <label for="jumlah_kehadiran">Jumlah Kehadiran</label>
            <Input className="h-10 border mt-5 rounded w-full bg-gray-50" type='number' placeholder='Jumlah Kehadiran' id='jumlah_kehadiran'
              value={jumlahKehadiran}
              onChange={(e) => setJumlahKehadiran(e.target.value)} />
          </div>
          <button className="bg-primary hover:bg-red-600 w-40 h-12 text-white mt-5 active:bg-red-500 px-4 py-2 text-sm rounded-lg shadow-md mr-3 outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center justify-center"
            type='submit'>
            Tambah Kegiatan
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormTambah