import BuktiKehadiran from '@/components/BuktiKehadiran'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'

const Bukti = () => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Bukti
                </h2>
            }>
            <Head>
                <title>Absensi Global - Bukti</title>
            </Head>
            <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <BuktiKehadiran />
                    </div>
                </div>
            
        </AppLayout>
    )
}

export default Bukti