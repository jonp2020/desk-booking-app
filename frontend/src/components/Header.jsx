import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between p-4 text-red-500 font-bold text-4xl shadow-lg'>
        <h1>Book<span className='bg-red-500 text-white mx-2 px-2'>AND</span>Go</h1>
        Username
    </div>
  )
}

export default Header