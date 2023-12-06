// ./Checkbox.js
import React from 'react'

const Checkbox = ({ id, name, checked, onChange }) => {
  return (
    <div className='flex justify-center mb-4'>
      <input
        type='checkbox'
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className='h-8 w-8 border mt-5 rounded bg-gray-50'
      />
    </div>
  )
}

export default Checkbox
