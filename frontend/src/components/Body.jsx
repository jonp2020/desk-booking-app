import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { getUsers } from '../plugin/Users';
import { makeBooking, retrieveSeats } from '../plugin/Seats';

import Title from './Title'

const Body = () => {

    const [date, setDate] = useState();
    const [allUsers, setAllUsers] = useState([]);
    const [table, setTable] = useState();
    const [seat, setSeat] = useState();
    const [allSeats, setAllSeats] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [time, setTime] = useState('FULLDAY');

    useEffect(() => {
    console.log(seat) 
    console.log(table)
    console.log(selectedUser)
    console.log(time)
    console.log(allSeats)
    }, [seat, selectedUser, time, allSeats])
    
    async function retrieveUsers(){
        const data = await getUsers();
        setAllUsers(data);
    }
    
    useEffect(() =>{
        retrieveUsers();
    }, [])

    const retrieveAllSeats = async () => {
        if (date && time) {
            const data = await retrieveSeats(date, time)
        setAllSeats(data)
        }
        
    }

    useEffect(()=>{
        retrieveAllSeats()
    },[date, time])

    const selectSeat = (event, table, seat) => {
        if (allSeats[table][seat] === "false"){
            setTable(table)
            setSeat(seat)
        }else{
            alert("Seat unavailable");  
        }
    } 
    

    const submit = () => {
       makeBooking(selectedUser, seat, table, date, time);
       alert("Seat booked");
    }
    
  return (
    <>
    <Title title='Make Booking' />

    {/* USER INFO SELECT */}
    <div className="flex justify-around mx-28 gap-10">
        <div className='flex flex-col w-1/2'>
            <div className="flex flex-col h-full bg-gray-200 mt-3 mb-12 px-8 rounded-3xl shadow-lg">
                <h1 className="font-bold py-2 text-xl text-center" >Booking Details</h1>
                <select className="rounded-xl my-2 py-2" onChange={(event)=> setSelectedUser(event.target.value)}>
                <option value="" disabled selected>Enter User</option>
                {allUsers.map(user => <option key={user._id} value={user.name}>{user.name}</option>)}
            </select>
                {/* Booking details table - won't show if default user or user has no bookings */}
                {selectedUser ? (<table className="table-fixed text-left">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Table No</th>
                        <th>Seat No</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01/01/2022</td>
                            <td>AM</td>
                            <td>T1</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>) : null}
            </div>
        </div>

       
       
         <div className="flex w-1/2 h-full bg-gray-200 mt-3 mb-12 px-8 rounded-3xl shadow-lg justify-around">
            <DayPicker 
            mode="single"
            selected={date}
            onSelect={setDate}/>
            <div className="flex flex-col justify-evenly mb-6 text-xl">
                <div className="flex">
                <input type={'radio'} name="time" value="AM" onChange={(event)=> setTime(event.target.value)} />
                <label className='ml-2'>Morning slot (9am -1pm)</label>
            </div>
            <div className="flex">
                <input type={'radio'} name="time" value="PM" onChange={(event)=> setTime(event.target.value)}/>
                <label className='ml-2'>Afternoon slot (1pm - 5pm)</label>
            </div>
            <div className="flex">
                <input type={'radio'} name="time" value="FULLDAY" defaultChecked onChange={(event)=> setTime(event.target.value)}/>
                <label className='ml-2'>Full day slot (9am - 5pm)</label>
            </div>        </div>
            </div>     
        </div>     
   

    {seat ? <h1 className='text-center my-8'><span className='mr-4'>Table: {table}</span> Seat: {seat}</h1> : null}
    
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

        <div className="flex justify-evenly  py-12 ">
           
                {
                    Object.keys(allSeats).map((table)=> {
                        return  <div key={table} className="flex flex-col border-4 border-black items-center justify-between p-6 rounded-3xl w-44 h-44">
                                <div className="grid grid-cols-2 content-between justify-between h-full w-full">
                               { 
                                Object.keys(allSeats[table]).map((tableSeat) =>
                               {
                                return <div key={tableSeat} id={tableSeat} 
                                className={`h-12 w-12 text-center rounded-lg cursor-pointer transition
                                ${ allSeats[table][tableSeat] == "false" ?'bg-green-500' : 'bg-red-500'}
                                ${ seat === tableSeat ?'border-4 border-gray-600 font-bold' : 'border-0 hover:scale-105 hover:shadow-2xl'}`} 
                                onClick={(event)=>selectSeat(event, table, tableSeat)}>{tableSeat}</div>
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