import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const DetailBukti = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`{{laravel_url}}api/kehadiran/${id}`)
        setData(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>Data not found</div>
  }

  return (
    <div>
      <h2>Detail Bukti Kehadiran</h2>
      <p>
        <strong>Kegiatan:</strong> {data.kegiatan ? data.kegiatan.nama_kegiatan : 'Unknown'}, <strong>NIS:</strong> {data.nis}
      </p>
      {/* Menggunakan URL gambar dari respons API */}
      <img
        src={data.imageUrl}
        alt={`Bukti Kehadiran ${data.nis}`}
        style={{ maxWidth: '200px' }}
        onError={(e) => console.error('Error loading image:', e)}
      />
    </div>
  )
}

export default DetailBukti
