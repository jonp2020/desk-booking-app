import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { getUsers } from '../plugin/Users';
import { retrieveSeats } from '../plugin/Seats';

import Title from './Title'

const Body = () => {

    const [date, setDate] = useState();
    const [allUsers, setAllUsers] = useState([]);
    const [seat, setSeat] = useState();
    const [allSeats, setAllSeats] = useState([[{id:0, seatNo:1, tableNo:2, available:true}], [{id:1, seatNo:2, tableNo:3, available:false}]]);
    const [selectedUser, setSelectedUser] = useState();
    const [time, setTime] = useState();

    useEffect(() => {
    console.log(seat) 
    console.log(selectedUser)
    console.log(time)
    }, [seat, selectedUser, time])
    
    async function retrieveUsers(){
        const data = await getUsers();
        
        setAllUsers(data);
    }
    
    useEffect(() =>{
        retrieveUsers();
        
    }, [])

    useEffect(()=>{
        retrieveSeats(date, time);
    },[date, time])

    const selectSeat = (seat) => {
        if (seat.available){
        setSeat(seat._id)
        }else{
            alert("Seat unavailable");  
        }
    } 
    

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
            <select onChange={(event)=> setSelectedUser(event.target.value)}>
                {allUsers.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
            </select>
        </div>

        <DayPicker 
        mode="single"
        selected={date}
        onSelect={setDate}/>
        <div className="flex flex-col">
            <div className="flex">
                <input type={'radio'} name="time" value="am" onChange={(event)=> setTime(event.target.value)} />
                <label className='ml-2'>AM</label>
            </div>
            <div className="flex">
                <input type={'radio'} name="time" value="pm" onChange={(event)=> setTime(event.target.value)}/>
                <label className='ml-2'>PM</label>
            </div>
            <div className="flex">
                <input type={'radio'} name="time" value="all-day" onChange={(event)=> setTime(event.target.value)}/>
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
           
                {
                    allSeats.map((table,i)=> {
                        return  <div key={i} className="flex flex-col border-4 border-black items-center justify-between p-6 rounded-3xl w-44 h-44">
                                <div className="flex justify-between w-full">
                               { 
                                table.map((seats,i) =>
                               {
                                return <div key={i} id={seats.seatNo} 
                                className={`h-12 w-12 text-center rounded-lg ${ seats.available ?'bg-green-500' : 'bg-red-500'}`} 
                                onClick={()=>selectSeat(seats)}>{seats.seatNo}</div>
                               })
                    }       
                                
                            </div>
                        </div>
                    })
                   
                }
                
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