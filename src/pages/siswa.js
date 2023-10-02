import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'

const Siswa = () => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Siswa
                </h2>
            }>
            <Head>
                <title>Absensi Global - Siswa</title>
            </Head>

            
        </AppLayout>
    )
}

export default Siswa
