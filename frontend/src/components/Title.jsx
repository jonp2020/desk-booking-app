import React from 'react'

const Title = ({title}) => {
  return (
    <div className='flex justify-center mb-12'>
        <div className='bg-[#d82036] text-white p-4 py-8 text-center w-full font-bold text-4xl shadow-xl'>{title}</div>
    </div>
  )
}

export default Title