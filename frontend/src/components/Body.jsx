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
    const [table, setTable] = useState();
    const [seat, setSeat] = useState();

    // {
    //     T1: { ‘1’: true, ‘2’: ‘false’, ‘3’: true, ‘4’: ‘false’ },
    //     T2: { ‘5’: ‘false’, ‘6’: ‘false’, ‘7’: ‘false’, ‘8’: ‘false’ },
    //     T3: { ‘9’: ‘false’, ‘10’: ‘false’, ‘11’: true, ‘12’: ‘false’ },
    //     T4: { ‘13’: ‘false’, ‘14’: ‘false’, ‘15’: ‘false’, ‘16’: ‘false’ },
    //     T5: { ‘17’: ‘false’, ‘18’: ‘false’, ‘19’: ‘false’, ‘20’: ‘false’ }
    //   }
    const [allSeats, setAllSeats] = useState({T1: { "1": true, "2": false, "3": true, "4": false }});
    const [selectedUser, setSelectedUser] = useState();
    const [time, setTime] = useState('FULLDAY');

    useEffect(() => {
    console.log(seat) 
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
        if (allSeats[table][seat]){
            setTable(table)
        setSeat(seat)
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
            <select onChange={(event)=> setSelectedUser(event.target.value)}>
                <option value="" disabled selected>Enter User</option>
                {allUsers.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
            </select>
        </div>

        <DayPicker 
        mode="single"
        selected={date}
        onSelect={setDate}/>
        <div className="flex flex-col">
            <div className="flex">
                <input type={'radio'} name="time" value="AM" onChange={(event)=> setTime(event.target.value)} />
                <label className='ml-2'>AM</label>
            </div>
            <div className="flex">
                <input type={'radio'} name="time" value="PM" onChange={(event)=> setTime(event.target.value)}/>
                <label className='ml-2'>PM</label>
            </div>
            <div className="flex">
                <input type={'radio'} name="time" value="FULLDAY" defaultChecked onChange={(event)=> setTime(event.target.value)}/>
                <label className='ml-2'>All Day</label>
            </div>        
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

        <div className="flex justify-center  py-12 ">
           
                {
                    Object.keys(allSeats).map((table)=> {
                        return  <div key={table} className="flex flex-col border-4 border-black items-center justify-between p-6 rounded-3xl w-44 h-44">
                                <div className="grid grid-cols-2 content-between justify-between h-full w-full">
                               { 
                                Object.keys(allSeats[table]).map((tableSeat) =>
                               {
                                return <div key={tableSeat} id={tableSeat} 
                                className={`h-12 w-12 text-center rounded-lg cursor-pointer transition
                                ${ allSeats[table][tableSeat]?'bg-green-500' : 'bg-red-500'}
                                ${ seat === tableSeat ?'border-4 border-gray-600 font-bold' : 'border-0 hover:h-14 hover:w-14 hover:shadow-2xl'}`} 
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