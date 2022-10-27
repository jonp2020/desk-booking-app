import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { getUsers } from '../plugin/Users';
import { makeBooking, retrieveSeats } from '../plugin/Seats';
import { deleteReservation } from '../plugin/Delete';

import Title from './Title'

const Body = () => {

    const [date, setDate] = useState();
    const [allUsers, setAllUsers] = useState([]);
    const [allBookings, setAllBookings] = useState({});
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
    console.log(date)
    }, [seat, selectedUser, time, allSeats, date])
    
    async function retrieveUsers(){
        const data = await getUsers();
        setAllBookings(data.valid_reservation_dict)
        setAllUsers(data.users);
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
    const disabledDays = [
        {
            daysOfWeek: [0, 6]
          },
        { before: new Date() }
      ];


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
        if (selectedUser && seat && table && date && time) {
            makeBooking(selectedUser, seat, table, date, time);
       alert("Seat booked");
        } else {
            alert("Please complete booking information to make a reservation")
        }
        retrieveUsers()
       

    }
    
  return (
    <>
    <Title title='Make Booking' />

    {/* USER INFO SELECT */}
    <div className="flex flex-col xl:flex-row items-center xl:items-start justify-around mx-28 gap-10">
        <div className='flex flex-col w-full xl:w-1/2'>
            <div className="flex py-4 flex-col h-full bg-gray-200 mt-3 mb-12 px-8 rounded-3xl shadow-lg">
                <h1 className="font-bold py-2 text-2xl text-center" >Booking Details</h1>
                <select className="rounded-xl my-2 py-2" onChange={(event)=> setSelectedUser(event.target.value)}>
                <option value="" disabled selected>Enter User</option>
                {allUsers.map(user => <option key={user._id} value={user.name}>{user.name}</option>)}
            </select>
                {/* Booking details table - won't show if default user or user has no bookings */}
                {selectedUser ? (
                    <div className="overflow-scroll h-52 w-full">
                    <table className="text-left relative table-auto w-full">
                    <thead className=''>
                    <tr >
                        <th className='sticky top-0 bg-gray-200'>Date</th>
                        <th className='sticky top-0 bg-gray-200'>Time</th>
                        <th className='sticky top-0 bg-gray-200'>Table No</th>
                        <th className='sticky top-0 bg-gray-200'>Seat No</th>
                
                    </tr>
                    
                    </thead>
                    <tbody className=''>
                        {allBookings[selectedUser] ? allBookings[selectedUser].map((booking, i) => {
                            return (
                                <tr key={i}>
                            <td>{booking.date}</td>
                            <td>{booking.time}</td>
                            <td>{booking.table_no}</td>
                            <td>{booking.seat_no}</td>
                            <button className='h-4 w-4 fill-red-500' onClick={() => {
                                deleteReservation(booking._id)
                                retrieveUsers()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                            </button>
                        </tr>
                        
                            )
                        }) : null}
                        
                    </tbody>
                </table>
                </div>) : <h1>No bookings reserved</h1>}
            </div>
        </div>

       
       
         <div className="flex w-full xl:w-1/2 h-full bg-gray-200 mt-3 mb-12 px-8 rounded-3xl shadow-lg justify-around">
            <DayPicker 
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={disabledDays}
            />
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
    <div className='bg-gray-200 mx-28 rounded-3xl shadow-lg pt-12 pb-1'>
        {date && time ? 
        <>
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
        </>
         : <h1 className='text-center mb-12'>Select a date and time to get more seat information</h1>}
    </div>

    <div className='flex justify-center mt-4'>
        {selectedUser && seat && table && date && time ?
        <button className=' bg-green-500 text-white p-4 font-bold text-2xl rounded-xl shadow-lg cursor-pointer mt-8 mb-20' onClick={submit}>
            <span>Submit</span>
        </button>
        : <h1 className='mt-4 text-xl font-semibold'>Complete all booking information to proceed</h1> }
    </div>
  
    </>
  )
}

export default Body