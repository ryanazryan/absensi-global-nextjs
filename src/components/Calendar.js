// components/Calendar.js
import React from 'react';

const Calendar = () => {
  // For simplicity, let's assume a static month for now
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded">
      <div className="text-xl font-bold mb-4">November 2023</div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {/* Days of the week headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="font-bold text-gray-600">{day}</div>
        ))}

        {/* Calendar days */}
        {daysInMonth.map(day => (
          <div key={day} className="border p-2">
            {day}
            {/* You can add events or other information here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
