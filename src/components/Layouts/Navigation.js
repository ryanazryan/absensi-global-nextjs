import Dropdown from '@/components/Dropdown';
import Link from 'next/link';
import NavLink from '@/components/NavLink';
import ResponsiveNavLink, { ResponsiveNavButton } from '@/components/ResponsiveNavLink';
import { DropdownButton } from '@/components/DropdownLink';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import logo from '../../../public/images/logo2.png';
import Image from 'next/image';

const Navigation = ({ user }) => {
    const router = useRouter();
    const { logout } = useAuth(user);
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-100 shadow-md">
            {/* Primary Navigation Menu */}
            <div className="max-w-7xl mx-7 my-1 px-4 sm:px-6 lg:px-0">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 mr-10">
                            <Link href="/dashboard">
                                <Image src={logo} alt="Logo" width={100} height={40} />
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden sm:flex space-x-4 ml-2 text-sm">
                            {user?.role_id === 1 && (
                                <>
                                    <NavLink href="/dashboard" active={router.pathname === '/dashboard'}>
                                        <p>Dashboard</p>
                                    </NavLink>
                                    <NavLink href="/siswa" active={router.pathname === '/siswa'}>
                                        <p>Siswa</p>
                                    </NavLink>
                                    <NavLink href="/bukti" active={router.pathname === '/bukti'}>
                                        <p>Kehadiran</p>
                                    </NavLink>
                                </>
                            )}
                            {user?.role_id === 2 && (
                                <NavLink href="/kegiatan" active={router.pathname === '/kegiatan'}>
                                    <p>Kegiatan</p>
                                </NavLink>
                            )}
                        </div>
                    </div>


                    {/* Settings Dropdown */}
                    <div className="hidden sm:flex items-center ml-6">
                        <Dropdown align="right" width="10" trigger={<button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 bg focus:outline-none transition duration-150 ease-in-out">
                            <div>{user?.name}</div>
                            <div className="ml-1">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </button>}>
                            {/* Authentication */}
                            <DropdownButton onClick={logout} className="flex items-center ">
                                <div className="flex items-center mx-3 my-2 text-sm text text-gray-500 hover:text-gray-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                        />
                                    </svg>
                                    <span className="ml-2 text-sm mx-2">Keluar</span>
                                </div>
                            </DropdownButton>

                        </Dropdown>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button onClick={() => setOpen(open => !open)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {open ? (
                                    <path className="inline-flex" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path className="inline-flex" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            {open && (
                <div className="block sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {user?.role_id === 1 && (
                            <>
                                <ResponsiveNavLink href="/dashboard" active={router.pathname === '/dashboard'}>
                                    Dashboard
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href="/siswa" active={router.pathname === '/siswa'}>
                                    Siswa
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href="/bukti" active={router.pathname === '/bukti'}>
                                    Kehadiran
                                </ResponsiveNavLink>
                            </>
                        )}
                        {user?.role_id === 2 && (
                            <>
                                <ResponsiveNavLink href="/kegiatan" active={router.pathname === '/kegiatan'}>
                                    Kegiatan
                                </ResponsiveNavLink>
                            </>
                        )}
                    </div>

                    {/* Responsive Settings Options */}
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <svg className="h-10 w-10 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>

                            <div className="ml-3">
                                <div className="font-medium text-base text-gray-800">
                                    {user?.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user?.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1 flex items-center">
                            <ResponsiveNavButton onClick={logout}>
                                <div className="flex items-center my-2 text-sm text text-gray-500 hover:text-gray-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                        />
                                    </svg>
                                    <span className="ml-2 text-sm mx-2">Logout</span>
                                </div>
                            </ResponsiveNavButton>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
