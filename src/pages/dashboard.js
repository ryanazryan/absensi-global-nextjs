import { useAuth } from '@/hooks/auth';
import DashboardPage from '@/components/DashboardPage';
import AppLayout from '@/components/Layouts/AppLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const { user } = useAuth(); // Dapatkan data pengguna dari hook useAuth
    const router = useRouter();

    // Pastikan pengguna telah berhasil login
    if (!user) {
        // Jika pengguna belum login, Anda dapat mengarahkannya ke halaman login atau halaman lain sesuai kebijakan Anda.
        router.push('/login');
        return null;
    }

    // Selanjutnya, periksa role_id pengguna dan arahkan mereka sesuai dengan role mereka.
    if (user.role_id === 1) {
        // Pengguna dengan role_id 1 adalah admin, izinkan akses ke dashboard.
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
        );
    } else if (user.role_id === 2) {
        // Pengguna dengan role_id 2 adalah user, arahkan ke halaman siswa.
        router.push('/siswa');
        return null;
    }

    // Selain itu, jika role_id tidak dikenali, Anda dapat melakukan tindakan lain sesuai kebijakan Anda.
    return (
        <div>
            Anda tidak memiliki izin untuk mengakses halaman ini.
        </div>
    );
};

export default Dashboard;
