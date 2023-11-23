import FormTambah from '@/components/FormTambah'
import React from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'

const form = () => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah Kegiatan
                </h2>
            }>
            <Head>
                <title>Absensi Global - Tambah Data</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <FormTambah />
                </div>
            </div>
        </AppLayout>
    )
}

export default form