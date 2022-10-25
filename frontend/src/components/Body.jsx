import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import Title from './Title'

const Body = () => {

    const [date, setDate] = useState()
    
    useEffect(() => {
    console.log(date) 
    }, [date])
    
  return (
    <>
    <Title title='Make Booking' />

    {/* USER INFO SELECT */}
    <div className="flex justify-around">
        <div className='flex flex-col'>
            <label>Enter User</label>
        <select>
            <option>User 1</option>
            <option>User 1</option>
        </select>
        </div>

        <DayPicker 
        mode="single"
        selected={date}
        onSelect={setDate}/>
        <div className="flex flex-col">
            <div className="flex">
        <input type={'radio'} name="time" value="am" />
        
        
        <label className='ml-2'>AM</label>
        </div>
        <div className="flex">
        <input type={'radio'} name="time" value="pm" />
        <label className='ml-2'>PM</label>
        </div>
        <div className="flex">
        <input type={'radio'} name="time" value="all-day" />
        <label className='ml-2'>All Day</label>
        </div>
        
        </div>
        
    </div>

    {/* TABLE PLAN */}
    <div className="flex justify-center bg-gray-200 py-12">
        <div className="flex flex-col border-4 border-black items-center justify-between p-6 rounded-3xl w-44 h-44">
            <div className="flex justify-between w-full">
                <div className='bg-green-500 h-12 w-12 text-center rounded-lg'>1</div>
                <div className='bg-green-500 h-12 w-12 text-center rounded-lg'>2</div>
            </div>

            <div className="flex justify-between w-full">
                <div className='bg-green-500 h-12 w-12 text-center rounded-lg'>3</div>
                <div className='bg-green-500 h-12 w-12 text-center rounded-lg'>4</div>
            </div>
        </div>

    </div>

    </>
  )
}

export default Body