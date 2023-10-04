import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        className={`inline-flex items-center px-4 pt-1 border-b-2 text-md font-semibold focus:outline-none transition duration-150 ease-in-out ${
            active
                ? 'border-none text-gray-900'
                : 'border-transparent text-gray-500 hover:text-dark-700 focus:text-gray-700'
        }`}>
        {children}
    </Link>
)

export default NavLink
