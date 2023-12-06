import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Input from './Input'
import { useRouter } from 'next/router'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react"

const KehadiranPage = ({ selectedKegiatan }) => {
    const [nis, setNis] = useState('')
    const [selectedOption, setSelectedOption] = useState(null)
    const [bukti, setBukti] = useState(null)
    const [loading, setLoading] = useState(true)
    const [kegiatanOptions, setKegiatanOptions] = useState([])
    const router = useRouter()

    const handleFileChange = (e) => {
        setBukti(e.target.files[0])
    }

    useEffect(() => {
        const fetchKegiatanOptions = async () => {
            try {
                setLoading(true)
                const response = await axios.get('http://localhost:8000/api/kegiatan')
                setKegiatanOptions(response.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchKegiatanOptions()
    }, [])

    useEffect(() => {
        if (selectedKegiatan) {
            const selectedOption = kegiatanOptions.find((option) => option.nama_kegiatan === selectedKegiatan)
            setSelectedOption(selectedOption)
        }
    }, [selectedKegiatan, kegiatanOptions])

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        console.log(selectedOption)
    
        if (!selectedOption) {
            console.error('No kegiatan selected.')
            return
        }
    
        try {
            const formData = new FormData()
            formData.append('id_kegiatan', selectedOption?.value || '') 
            formData.append('nis', nis)
            formData.append('bukti', bukti)
    
            const response = await axios.post('http://localhost:8000/api/kehadiran/add', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    
            console.log(response.data)
    
            router.push('/kegiatan')
        } catch (error) {
            console.error(error)
        }
    }
    

    if (loading) {
        return (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white opacity-75 z-50">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
            </div>
        )
    }

    const goToCalendar = () => {
        router.push('/kegiatan')
    }

    return (
        <div className='lg:col-span-2'>
            <form onSubmit={handleSubmit}>
                <div className='grid gap-2 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 my-6 mx-2 md:mx-10 px-4 md:px-10 py-10 shadow-lg bg-white'>
                    <div className='md:col-span-5'>
                        <h1 className='text-lg font-semibold mb-10 text-center '>Tambah Data Kehadiran</h1>
                        <label htmlFor='id_kegiatan'>Kegiatan:</label>
                        <Select
                            defaultValue={selectedOption}
                            className='border-primary mt-4 mb-2'
                            onChange={(selectedOption) => setSelectedOption(selectedOption)}
                            options={kegiatanOptions.map((kegiatan) => ({
                                value: kegiatan.id,
                                label: kegiatan.nama_kegiatan,
                            }))}

                            placeholder='Pilih Kegiatan'
                        />
                    </div>

                    <div className='md:col-span-5'>
                        <label htmlFor='nis'>NIS:</label>
                        <Input
                            className={`h-10 active:border-primary border mt-5 rounded w-full bg-gray-50 && 'border-red-500'`}
                            type='text'
                            placeholder='NIS'
                            id='nis'
                            value={nis}
                            onChange={(e) => setNis(e.target.value)}
                        />
                    </div>
                    <div className='md:col-span-5'>
                        <label htmlFor='bukti' className='block mb-2'>
                            Bukti Kehadiran
                        </label>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleFileChange}
                            className={`p-4 border-dashed border-2 rounded-md border-gray-300`}
                        />
                    </div>
                    <div className='flex justify-center mt-5 xs:flex-col'>
                        <button
                            className='bg-primary mr-2 hover:bg-red-600 w-full md:w-40 h-12 text-white mt-5 active:bg-red-500 text-sm rounded-lg shadow-md outline-none focus:outline-none ease-linear transition-all duration-150'
                            type='submit'
                        >
                            Kirim
                        </button>
                        <button
                            onClick={goToCalendar}
                            className='bg-primary ml-2 hover:bg-red-600 w-full md:w-40 h-12 text-white mt-5 active:bg-red-500 text-sm rounded-lg shadow-md outline-none focus:outline-none ease-linear transition-all duration-150'
                            type='button'
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default KehadiranPage
