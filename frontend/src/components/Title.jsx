import React from 'react'

const Title = ({title}) => {
  return (
    <div className='flex justify-center mb-12'>
        <div className='bg-red-500 text-white p-4 py-8 text-center w-full font-bold text-4xl shadow-lg'>{title}</div>
    </div>
  )
}

export default Title