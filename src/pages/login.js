import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import logo from '../../public/images/logo2.png'
import bg from '../../public/images/bg.jpg'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { useAuth } from '@/hooks/auth'
import { motion } from 'framer-motion'
import Input from '@/components/Input'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const submitForm = async (event) => {
        event.preventDefault()

        setIsLoading(true)

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
            .then(() => {
                if (user && user.role_id === 1) {
                    router.push('/dashboard')
                } else if (user && user.role_id === 2) {
                    router.push('/siswa')
                }
            })
            .catch((error) => {
                console.error('Login failed:', error)
            })
    }

    return (
        <GuestLayout>
            <motion.section className="h-screen flex">
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
                            <div className="mb-5 relative">
                                <label htmlFor="password" className="block text-dark font-semibold mb-1">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    placeholder="Password"
                                />
                                <span
                                    className="absolute inset-y-0 right-0 flex mt-4 items-center pr-3 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        // Ikon mata terbuka
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>


                                    ) : (
                                        // Ikon mata tertutup
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>

                                    )}
                                </span>
                            </div>

                            <div className="mb-5 flex items-center">
                                <label className="flex items-center cursor-pointer">
                                    <span className="text-gray-700">Remember me</span>
                                    <div className={`relative ml-2 w-10 h-5 rounded-full ${shouldRemember ? 'bg-red-500' : 'bg-input'} transition-all duration-300 ease-in-out`}>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            id="rememberMe"
                                            name="remember"
                                            onChange={() => setShouldRemember(!shouldRemember)}
                                        />
                                        <div
                                            className={`absolute w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out transform ${shouldRemember ? 'translate-x-full' : ''}`}
                                        ></div>
                                    </div>
                                </label>
                            </div>

                            {/* Tombol Sign In */}

                            <div className="mt-5 flex">
                                <button
                                    type="submit"
                                    className="bg-primary text-sm hover:bg-red-600 transition duration-150 text-white font-semibold py-2 px-4 rounded-md w-full"
                                    disabled={isLoading} // Menonaktifkan tombol saat loading
                                >
                                    {isLoading ? 'Loading...' : 'Sign In'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </motion.section>
        </GuestLayout>
    )
}

export default Login
