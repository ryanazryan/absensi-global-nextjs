import React from 'react'
import AppLayout from '@/components/Layouts/AppLayout'

const Guest = () => {
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Halaman Tamu
        </h2>
      }
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <p>Anda bukan seorang admin. Anda memiliki akses terbatas ke halaman ini.</p>
        </div>
      </div>
    </AppLayout>
  )
}

export default Guest
