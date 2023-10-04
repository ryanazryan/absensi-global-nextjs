import Input from '@/components/Input';
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import Label from '@/components/Label'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import bg from '../../public/images/bg.jpg';
import Image from 'next/image';
import logo from '../../public/images/logo2.png'
import GuestLayout from '@/components/Layouts/GuestLayout';
import AuthCard from '@/components/AuthCard';
import Link from 'next/link'
import Button from '@/components/Button';

const Login = () => {
    const router = useRouter();

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shouldRemember, setShouldRemember] = useState(false);
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset));
        } else {
            setStatus(null);
        }
    }, [router.query.reset, errors]);

    const submitForm = async (event) => {
        event.preventDefault();

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        });
    };

    return (
        <GuestLayout>
        <section className="h-screen flex">
            {/* Bagian Kiri (Background) */}
            <div className="hidden md:block md:w-[100%] bg-cover bg-center">
                <Image src={bg} className="w-full h-full" alt="Background" />
            </div>

            {/* Bagian Kanan (Formulir) */}
            <div className="w-full md:w-2/4 bg-white p-5 flex items-center justify-center">
                <div className="max-w-md w-full">
                    <div className="flex justify-center mb-16">
                        <Image src={logo} alt="Logo" className="h-auto w-[240px]" />
                    </div>
                    <form onSubmit={submitForm} className="flex flex-col mx-8 text-sm">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-dark font-semibold mb-1">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                autoFocus
                                placeholder="Email address"
                            />
                        </div>

                        {/* Input password */}
                        <div className="mb-5">
                            <label htmlFor="password" className="block text-dark font-semibold mb-1">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                placeholder="Password"
                            />
                        </div>

                        {/* Checkbox 'Remember Me' */}
                        <div className='mb-5'>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    value=""
                                    id="rememberMe"
                                    onChange={() => setShouldRemember(!shouldRemember)}
                                />
                                <span className="text-gray-600">Remember me</span>
                            </label>
                        </div>

                        {/* Tombol Sign In */}
                        <div className="mt-5 flex">
                            <button
                                type="submit"
                                className="bg-primary text-sm hover:bg-red-600 transition duration-150 text-white font-semibold py-2 px-4 rounded-md w-full"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </GuestLayout>
    );
};

export default Login;
