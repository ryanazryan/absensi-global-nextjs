import { useRouter } from 'next/router'
import Link from 'next/link'

const Submenu = () => {
  const router = useRouter()

  return (
    <div className="relative inline-block text-left">
      <div>
        <button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-gray-300">
          Siswa
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 ml-2 -mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <Link href="/siswa/kelas/X">
            <a
              className={`${
                router.pathname === '/siswa/kelas/X' ? 'bg-gray-100' : ''
              } block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900`}
              role="menuitem"
            >
              Kelas X
            </a>
          </Link>
          <Link href="/siswa/kelas/XI">
            <a
              className={`${
                router.pathname === '/siswa/kelas/XI' ? 'bg-gray-100' : ''
              } block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900`}
              role="menuitem"
            >
              Kelas XI
            </a>
          </Link>
          <Link href="/siswa/kelas/XII">
            <a
              className={`${
                router.pathname === '/siswa/kelas/XII' ? 'bg-gray-100' : ''
              } block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900`}
              role="menuitem"
            >
              Kelas XII
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Submenu
