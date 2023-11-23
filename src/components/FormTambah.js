import { useState } from 'react'
import Router from 'next/router'
import Input from './Input'
import Checkbox from './Checkbox'
import Button from './Button'

const FormTambah = () => {
  return (
    <div className='lg:col-span-2'>
      <div className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 my-6 mx-10 px-10 py-10 shadow-lg bg-white'>
        <div className='md:col-span-5'>
          <label for="nama_kegiatan">Nama Kegiatan</label>
          <Input className="h-10 active:border-primary border mt-5 rounded w-full bg-gray-50" type='text' placeholder='Nama Kegiatan' name='nama_kegiatan' id='nama_kegiatan' value="" />
        </div>
        <div className='md:col-span-5'>
          <label for="waktu_kegiatan">Waktu Kegiatan</label>
          <Input className="h-10 border mt-5 rounded  w-full bg-gray-50" type='date' name='waktu_kegiatan' id='waktu_kegiatan' value="" />
        </div>
        <div className='justify-center items-center flex gap-4'>
          <div className='md:col-span-5'>
            <label for="kelas_x">Kelas X</label>
            <Checkbox id='kelas_x' name='kelas_x' value='' />
          </div>
          <div className='md:col-span-5'>
            <label for="kelas_x" className=''>Kelas XI</label>
            <Checkbox id='kelas_xi' name='kelas_xi' value='' />
          </div>
          <div className='md:col-span-5'>
            <label for="kelas_x">Kelas XII</label>
            <Checkbox id='kelas_xii' name='kelas_xii' value='' />
          </div>
        </div>
        <div className='md:col-span-5'>
          <label for="jumlah_kehadiran">Jumlah Kehadiran</label>
          <Input className="h-10 border mt-5 rounded w-full bg-gray-50" type='text' placeholder='Jumlah Kehadiran' name='jumlah_kehadiran' id='jumlah_kehadiran' value="" />
        </div>
        <button className="bg-primary hover:bg-red-600 w-40 h-12 text-white mt-5 active:bg-red-500 px-4 py-2 text-sm rounded-lg shadow-md mr-3 outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center justify-center">
          Tambah Kegiatan
        </button>
      </div>
    </div>
  )
}

export default FormTambah