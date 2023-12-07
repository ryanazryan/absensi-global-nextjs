import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import KehadiranPage from './KehadiranPage'

const Calendar = () => {
  const [events, setEvents] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedKegiatan, setSelectedKegiatan] = useState('')
  const [isKehadiranAvailable, setIsKehadiranAvailable] = useState(false)
  const [namaKegiatanTerpilih, setNamaKegiatanTerpilih] = useState('')

  const router = useRouter()

  const handleClick = (namaKegiatan) => {
    setSelectedKegiatan(namaKegiatan)
    setSelectedKegiatan(namaKegiatan)
    setNamaKegiatanTerpilih(namaKegiatan)
    router.push({
      pathname: '/kehadiran',
      query: { selectedKegiatan: encodeURIComponent(namaKegiatan) },
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/kegiatan`)
        const filteredEvents = response.data.filter((event) => {
          const eventDate = new Date(event.waktu_kegiatan)
          return (
            eventDate.getMonth() === currentDate.getMonth() &&
            eventDate.getFullYear() === currentDate.getFullYear()
          )
        })
        setEvents(filteredEvents)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [currentDate])

  const getEventClass = (theme) => {
    return {
      'bg-red-500 text-white': true,
    }
  }

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth())
    const daysArray = [...Array(daysInMonth).keys()]
    const blanksArray = [...Array(firstDay).keys()]

    return blanksArray
      .map(() => <div key={Math.random()} className="text-center text-gray-300"></div>)
      .concat(
        daysArray.map((day) => (
          <div
            key={day}
            className={`col-span-1 p-2 relative cursor-pointer shadow-sm rounded border border-opacity-100 border-gray-200 transition duration-150 hover:ease-in-out hover:bg-gray-100`}
            onClick={() => showEventDetails(day + 1)}
          >
            <div className={`font-bold text-lg ${getEventClassForDay(day + 1)}`}>
              {day + 1}
            </div>
            {getEventsForDay(day + 1).length > 0 && (
              <div className="absolute top-0 right-0 mt-2 mr-2 text-red-500"></div>
            )}
            <div className="flex flex-col h-full">
              {getEventsForDay(day + 1).map((event) => (
                <div
                  key={event.id}
                  className={`event bg-primary text-white rounded p-2 text-xs mb-2 mt-2 ml-2 mr-2 lg:${'hidden'}`}>
                  {event.nama_kegiatan}
                </div>
              ))}
            </div>
          </div>
        ))
      )
  }

  const showEventDetails = (day) => {
    const dayEvents = getEventsForDay(day)
    setSelectedEvent(dayEvents)
    setIsKehadiranAvailable(dayEvents.length > 0)
  }

  const renderEventButtons = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {selectedEvent.map((event) => (
          <div key={event.id} className="event-container bg-white text-black rounded p-3">
            <div className="flex justify-center items-center flex-col mb-2">
              <span className="event-label text-sm font-semibold text-black">Nama Kegiatan:</span>
              <span className="event-name text-sm mb-2">{event.nama_kegiatan}</span>
              <button
                onClick={() => handleClick(event.nama_kegiatan)}
                className="mt-2 px-4 text-xs py-2 bg-primary text-white rounded-md focus:outline-none"
              >
                Absensi
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }


  const getEventClassForDay = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dayEvents = events.filter(
      (event) =>
        new Date(event.waktu_kegiatan).getDate() === day &&
        new Date(event.waktu_kegiatan).getMonth() === currentDate.getMonth()
    )

    if (dayEvents.length > 0) {
      return getEventClass(dayEvents[0].event_theme)
    }

    return ''
  }

  const getEventsForDay = (day) => {
    return events.filter(
      (event) =>
        new Date(event.waktu_kegiatan).getDate() === day &&
        new Date(event.waktu_kegiatan).getMonth() === currentDate.getMonth()
    )
  }

  const closeEventDetails = () => {
    setSelectedEvent(null)
    setIsKehadiranAvailable(false)
    setIsModalOpen(false)
  }

  return (
    <div className="container mx-auto mt-8 p-4 lg:p-8 bg-white shadow-md rounded-md">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-4">
  <div className='flex justify-center'>
    <button
      onClick={goToPreviousMonth}
      className="text-xl font-semibold cursor-pointer text-black mb-2 lg:mb-0 lg:mr-2 flex items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
      Bulan Sebelumnya
    </button>
  </div>
  <div className="text-xl font-semibold text-gray-800 mb-2 lg:mb-0">
    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
  </div>
  <button
    onClick={goToNextMonth}
    className="text-xl font-semibold cursor-pointer  text-black flex items-center"
  >
    Bulan Selanjutnya
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg>
  </button>
</div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="font-semibold text-gray-600 border border-gray-200 shadow-sm rounded transition duration-150 hover:ease-in-out hover:bg-gray-100 p-2"
          >
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
      {selectedEvent && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 lg:p-8 rounded-md">
            {renderEventButtons()}
            <button
              onClick={closeEventDetails}
              className="mt-8 px-6 py-2 bg-primary text-white rounded-md focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar
