import BuktiKehadiran from '@/components/BuktiKehadiran'
import DetailBukti from '@/components/DetailBukti'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'

const Detail = () => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail
                </h2>
            }>
            <Head>
                <title>Absensi Global - Detail</title>
            </Head>
            <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <DetailBukti />
                    </div>
                </div>
            
        </AppLayout>
    )
}

export default Detail