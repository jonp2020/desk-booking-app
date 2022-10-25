import React from 'react'

const Title = ({title}) => {
  return (
    <div className='flex justify-center my-12'>
        <div className='bg-red-500 text-white p-4 font-bold text-2xl rounded-xl shadow-lg'>{title}</div>
    </div>
  )
}

export default Title