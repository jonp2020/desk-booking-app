import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { getUsers } from '../plugin/Users';

import Title from './Title'

const Body = () => {

    const [date, setDate] = useState();
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
    console.log(date) 
    }, [date])
    
    async function retrieveUsers(){
        const data = await getUsers();
        console.log(users);
        setUsers(data);
    }
    
    useEffect(() =>{
        retrieveUsers();
        
    }, [])

    const submit = () => {
        alert("Seat booked");
        }

  return (
    <>
    <Title title='Make Booking' />

    {/* USER INFO SELECT */}
    <div className="flex justify-around">
        <div className='flex flex-col'>
            <label>Enter User</label>
            <select>
                {users.map(user => <option key={user._id}>{user.name}</option>)}
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
    <div className='bg-gray-200 mx-28 rounded-3xl shadow-lg pt-12'>
        <div className="flex justify-center gap-8 ">
            <div className='flex justify-between items-center'>
                <div className='h-6 w-8 bg-green-500 mr-3 rounded-lg'>

                </div>
                <span>Available</span>
            </div>  
            <div className='flex justify-between items-center'>
            <div className='h-6 w-8 bg-red-500 mr-3 rounded-lg'>

            </div>
            <span>Unavailable</span>
            </div>        
        </div>

        <div className="flex justify-center  py-12 ">
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
    </div>

    <div className='flex justify-center mt-4'>
        <button className=' bg-green-500 text-white p-4 font-bold text-2xl rounded-xl shadow-lg cursor-pointer' onClick={submit}>
            <span>Submit</span>
        </button>
    </div>
  
    </>
  )
}

export default Body