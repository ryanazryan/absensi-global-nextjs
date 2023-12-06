import { useAuth } from '@/hooks/auth'
import DashboardPage from '@/components/DashboardPage'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Dashboard = () => {
    const { user } = useAuth()     
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        } else if (user.role_id === 2) {
            router.push('/kegiatan')
        }
    }, [user, router])

    if (user && user.role_id === 1) {
        return (
            <AppLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dashboard
                    </h2>
                }>
                <Head>
                    <title>Absensi Global - Dashboard</title>
                </Head>

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <DashboardPage />
                    </div>
                </div>
            </AppLayout>
        )
    } else {
        return (
            <div>
                Anda tidak memiliki izin untuk mengakses halaman ini.
            </div>
        )
    }
}

export default Dashboard
