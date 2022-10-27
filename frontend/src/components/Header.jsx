import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between p-4 text-red-500 font-bold text-4xl shadow-lg'>
        <h1>Book<span className='bg-red-500 text-white mx-2 px-2'>AND</span>Go</h1>
        <svg className="h-8 w-8 fill-red-500 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
    </div>
  )
}

export default Header