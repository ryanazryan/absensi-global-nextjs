import { useState } from 'react';
import Input from './Input';
import Checkbox from './Checkbox';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';

const FormTambah = () => {
  const router = useRouter();
  const [namaKegiatan, setNamaKegiatan] = useState('');
  const [waktuKegiatan, setWaktuKegiatan] = useState('');
  const [kelasX, setKelasX] = useState(false);
  const [kelasXI, setKelasXI] = useState(false);
  const [kelasXII, setKelasXII] = useState(false);
  const [jumlahKehadiran, setJumlahKehadiran] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/kegiatan/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama_kegiatan: namaKegiatan,
        waktu_kegiatan: waktuKegiatan,
        kelas_x: kelasX ? 1 : 0,
        kelas_xi: kelasXI ? 1 : 0,
        kelas_xii: kelasXII ? 1 : 0,
        jumlah_kehadiran: jumlahKehadiran,
      }),
    });

    if (response.ok) {
      console.log('Data berhasil ditambahkan');
      toast.success('Data berhasil ditambahkan');
      router.push('/dashboard'); 
    } else {
      console.error('Gagal menambahkan data');
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
              value={namaKegiatan}
              onChange={(e) => setNamaKegiatan(e.target.value)}
            />
          </div>
          <div className='md:col-span-5'>
            <label htmlFor="waktu_kegiatan">Waktu Kegiatan</label>
            <Input
              className={`h-10 active:border-primary border mt-5 rounded w-full bg-gray-50`}
              type='date'
              id='waktu_kegiatan'
              value={waktuKegiatan}
              onChange={(e) => setWaktuKegiatan(e.target.value)}
            />
          </div>

          <div className='justify-center items-center flex gap-4'>
            <div className='md:col-span-5'>
              <label htmlFor="kelasX">Kelas X</label>
              <Checkbox
                id='kelasX'
                name='kelasX'
                checked={kelasX}
                onChange={() => setKelasX(!kelasX)}
              />
            </div>
            <div className='md:col-span-5'>
              <label htmlFor="kelasXI">Kelas XI</label>
              <Checkbox
                id='kelasXI'
                name='kelasXI'
                checked={kelasXI}
                onChange={() => setKelasXI(!kelasXI)}
              />
            </div>
            <div className='md:col-span-5'>
              <label htmlFor="kelasXII">Kelas XII</label>
              <Checkbox
                id='kelasXII'
                name='kelasXII'
                checked={kelasXII}
                onChange={() => setKelasXII(!kelasXII)}
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
              value={jumlahKehadiran}
              onChange={(e) => setJumlahKehadiran(e.target.value)}
            />
          </div>
          <button
            className="bg-primary hover:bg-red-600 w-40 h-12 text-white mt-5 active:bg-red-500 px-4 py-2 text-sm rounded-lg shadow-md mr-3 outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center justify-center"
            type='submit'>
            Tambah Kegiatan
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormTambah;
