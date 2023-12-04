import React from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import FormEdit from '@/components/FormEdit'

const Edit = () => {
    return (
        <div>
            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Form Edit Data
                    </h2>
                }>
                <Head>
                    <title>Absensi Global - Edit Data</title>
                </Head>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <FormEdit />
                    </div>
                </div>
            </AppLayout>
        </div>
    )
}

export default Edit