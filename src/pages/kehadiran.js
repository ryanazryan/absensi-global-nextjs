import KehadiranPage from '@/components/KehadiranPage'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'

const Kehadiran = () => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kehadiran
                </h2>
            }>
            <Head>
                <title>Absensi Global - Kehadiran</title>
            </Head>
            <KehadiranPage />

        </AppLayout>
    )
}

export default Kehadiran