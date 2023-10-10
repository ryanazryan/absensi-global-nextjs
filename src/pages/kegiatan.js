import Calendar from '@/components/Calendar'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'

const Kegiatan = () => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kegiatan
                </h2>
            }>
            <Head>
                <title>Absensi Global - Kegiatan</title>
            </Head>
            {/* <Calendar /> */}

            
        </AppLayout>
    )
}

export default Kegiatan